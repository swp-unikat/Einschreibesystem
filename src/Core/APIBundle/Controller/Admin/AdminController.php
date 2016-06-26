<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marco Hanisch
 * Authors: Marco Hanisch, Andreas Ifland,Leon Bergmann
 * Date: 31.05.2016
 * Time: 13:01
 */
namespace Core\APIBundle\Controller\Admin;

use Core\EntityBundle\Entity\Invitation;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Core\EntityBundle\Entity\User;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;


/**
 * Class RestController.
 * This Controller provides methods for the private part. The functions to invite, create, delete and patch an administrator, to get a list of all administrator and to put and patch the legalnotice and the contactdata are provided.
 */
class AdminController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Action to invite new Admin
     * @ApiDoc(
     *  resource=true,
     *  description="Action to invite new Admin",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     *
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @param $email string email as the username of administrator
     * @Rest\View()
     */
    public function inviteAdminAction($email)
    {
        $invitation = new Invitation();
        /* Loading the default E-Mail template*/
        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->find(1);
        /* Creating Twig template from Database */
        $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());
        /* Sending E-Mail */
        $message = \Swift_Message::newInstance()
            ->setSubject($template->getEmailSubject())
            ->setFrom($this->getParameter('email_sender'))
            ->setTo($email)
            ->setBody($renderTemplate->render(["code" => $invitation->getCode(), "email" => $email]), 'text/html');
        $this->get('mailer')->send($message);
        $invitation->send(); //prevents sending invitations twice
        $this->getDoctrine()->getManager()->persist($invitation);
        $this->getDoctrine()->getManager()->flush();

        return View::create(null, Codes::HTTP_OK);

    }

    /**
     * Action to create an Admin
     * @ApiDoc(
     *  resource=true,
     *  description="Action to create an Admin",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={{
     *        "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     * }}
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="email", requirements=".*", description="json object of workshop")
     * @Rest\RequestParam(name="password", requirements=".*", description="json object of workshop")
     * @Rest\RequestParam(name="code", requirements=".*", description="json object of workshop")
     * @param $paramFetcher ParamFetcher 
     * @Rest\View()
     */

    public function createAdminAction(ParamFetcher $paramFetcher)
    {
        //$params is array with E-Mail Password and Token (Code)
        $params = $paramFetcher->all();
        //find invitation in database
        $invitation = $this->getDoctrine()->getManager()->getRepository("invitation")->findOneBy(['code' => $params['code']]);
        //check if invitation parameter sended is true
        if ($invitation->isSend()) {
            //FOSUserBundle
            $UserManager = $this->get('fos_user.user_manager');
            $admin = $UserManager->create();
            $admin->setName($params['email']);
            $admin->setPlainPassword($params["password"]);
        } else {
            throw $this->createAccessDeniedException("No invitation was sended!");
        }

        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->flush();
    }


    /**
     * Action to disable an Admin
     * @ApiDoc(
     *  resource=true,
     *  description="Action to disable an Admin",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={{
     *        "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     * }}
     * )
     * @param $adminID integer adminID
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function deleteAction($adminID)
    {
        $admin = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle')->find($adminID);
        if (!$admin) {
            throw $this->createNotFoundException("Admin not found");
        } else {
            $admin->setEnabled(false);
        }
        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_OK);
    }

    /**
     * Action to change the password
     * @ApiDoc(
     *  resource=true,
     *  description="Action to change the password",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={{
     *        "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     *}}
     * )
     * @param $paramfetcher params of admin
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="oldpassword", requirements=".*", description="json object of workshop")
     * @Rest\RequestParam(name="newpassword", requirements=".*", description="json object of workshop")
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramfetcher)
    {
        //get all params
        $params = $paramfetcher->all();
        //get current user
        $admin = $this->getUser();
        //needed for encoding the current password
        $encoder_service = $this->get('security.encoder_factory');
        $encoder = $encoder_service->getEncoder($admin);
        //check if old password input equals the current password in database
        if ($encoder->isPasswordValid($admin->getPassword(), $params['oldpassword'], $admin->getSalt())) {
            //set new password
            $admin->setPlainPassword($params['newpassword']);
        } else {
            //old password is wrong
            throw $this->createAccessDeniedException("The old password is incorrect");
        }
        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->fluch();

        return View::create(null, Codes::HTTP_OK);
    }


    /**
     * Returns list of all admins
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all admins",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     *)
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @return array give the list of all admins
     * @Rest\View()
     */
    public function getListAction()
    {
        $admin = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:User")->findAll();
        if (!$admin) {
            throw $this->createNotFoundException("No admin was found");
        } else {
            $view = $this->view($admin, 200);
            return $this->handleView($view);
        }

    }


    /**
     * load the content of legal notice
     * @ApiDoc(
     *  resource=true,
     *  description="load the content of legal notice",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     *)
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @return array give the list of all admins
     * @Rest\View()
     */
    public function getLegalNoticeAction()
    {
        $path = $this->get('kernel')->getRootDir() . '/../web/resources/data/legalNotice';
        $content = ['content' => file_get_contents($path)];
        if($content){
            $view = $this->view($content,200);
            return $this->handleView($view);
        }else{
            return $this->handleView($this->view(['code' => 404,'message' => "Could not read the file."], 404));
        }
    }

    /**
     * modify legal notice
     * @ApiDoc(
     *  resource=true,
     *  description="modify legal notice",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     *)
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="content", requirements=".*", description="content of contact data",default=null,nullable=true )
     * @param $paramFetcher ParamFetcher
     * @Rest\View()
     */
    public function putLegalNoticeAction(ParamFetcher $paramFetcher)
    {
        $paramFetcher->get('content');
        $path = $this->get('kernel')->getRootDir() . '/../web/resources/data/legalNotice';
        if(file_put_contents($path,$paramFetcher->get('content'))){
            return $this->handleView($this->view(['code' => 401,'message' => "Could not write the file.", 'content' => $paramFetcher->get('content')], 401));
        }else{
            return View::create(NULL, Codes::HTTP_OK);
        }
    }

    /**
     * load the content of contact data
     * @ApiDoc(
     *  resource=true,
     *  description="load the content of contact data",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     *)
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @return array give the list of all admins
     * @Rest\View()
     */
    public function getContactDataAction()
    {
        $path = $this->get('kernel')->getRootDir() . '/../web/resources/data/contactData';
        $content = ['content' => file_get_contents($path)];
        if($content){
            $view = $this->view($content,200);
            return $this->handleView($view);
        }else{
            return $this->handleView($this->view(['code' => 404,'message' => "Could not read the file."], 404));
        }
    }

    /**
     * modify contact data
     * @ApiDoc(
     *  resource=true,
     *  description="modify contact",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     *)
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="content", requirements=".*", description="content of contact data",default=null,nullable=true )
     * @param $paramFetcher ParamFetcher
     * @Rest\View()
     */
    public function putContactDataAction(ParamFetcher $paramFetcher)
    {
        $paramFetcher->get('content');
        $path = $this->get('kernel')->getRootDir() . '/../web/resources/data/contactData';
        if(file_put_contents($path,$paramFetcher->get('content'))){
            return $this->handleView($this->view(['code' => 404,'message' => "Could not write the file.", 'content' => $paramFetcher->get('content')], 401));
        }else{
            return View::create(NULL, Codes::HTTP_OK);
        }
    }

}
