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
class UserController extends FOSRestController implements ClassResourceInterface
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
     * @param $paramFetcher ParamFetcher
     * @Rest\RequestParam(name="email", requirements=".*", description="email")
     * @Rest\View()
     */
    public function postInviteAction(ParamFetcher $paramFetcher)
    {
        $email = $paramFetcher->get("email");
        if($this->get('fos_user.user_manager')->findUserByUsernameOrEmail($email))
            return $this->handleView($this->view(['code' => 404,'message' => "INVITED_ADMINISTRATOR_EMAIL_ERROR"], 404));


        $invitation = new Invitation();
        /* Loading the default E-Mail template*/
        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(['template_name' => 'Invitation']);
        /* Creating Twig template from Database */
        $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());
        /* Sending E-Mail */
        $invitation->setEmail($email);

        $url = $this->generateUrl('core_frontend_default_index',[],TRUE)."#/admin/create/".$invitation->getCode();

        $message = \Swift_Message::newInstance()
            ->setSubject($template->getEmailSubject())
            ->setFrom($this->getParameter('email_sender'))
            ->setTo($email)
            ->setBody($renderTemplate->render(["url" => $url, "email" => $email]), 'text/html');
        $this->get('mailer')->send($message);
        $invitation->setSent(true); //prevents sending invitations twice
        $this->getDoctrine()->getManager()->persist($invitation);
        $this->getDoctrine()->getManager()->flush();

        return View::create(null, Codes::HTTP_ACCEPTED);

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
        $admin = $this->get('fos_user.user_manager')->findUserBy(['id' => $adminID]);
        if (!$admin) {
            return $this->handleView($this->view(['code' => 404, 'message' => "Admin not found"], 404));
        } else {
            $admin->setEnabled(false);
        }
        $this->get('fos_user.user_manager')->updateUser($admin);
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
     *  }
     * 
     * )
     * @param $paramFetcher ParamFetcher
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="oldpassword", requirements=".*", description="old password of a admin")
     * @Rest\RequestParam(name="newpassword", requirements=".*", description="new password of a admin")
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramFetcher)
    {
        //get all params
        $params = $paramFetcher->all();
        //get current user
        $admin = $this->getUser();
        //needed for encoding the current password
        $encoder_service = $this->get('security.encoder_factory');
        $encoder = $encoder_service->getEncoder($admin);
        //check if old password input equals the current password in database
        if ($encoder->isPasswordValid($admin->getPassword(), $params['oldpassword'], $admin->getSalt())) {
            $admin->setPlainPassword($params['newpassword']);
            $this->get('fos_user.user_manager')->updateUser($admin);
        } else {
            return $this->handleView($this->view(['code' => 403,'message' => "Old password is wrong"], 403));
        }
        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->flush();

        return $this->handleView($this->view(['code' => 200,'message' => "Password successful changed"], 200));

    }

    /**
     * Action to change the email
     * @ApiDoc(
     *  resource=true,
     *  description="Action to change the email",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * @param $paramFetcher ParamFetcher
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="oldemail", requirements=".*", description="old email")
     * @Rest\RequestParam(name="newemail", requirements=".*", description="new email")
     * @Rest\View()
     */
    public function patchEmailAction(ParamFetcher $paramFetcher)
    {
        //get all params
        $params = $paramFetcher->all();
        //get current user
        $admin = $this->getUser();
        //check if old password input equals the current password in database
        if ($admin->getEmail() == $params['oldemail'])
            $admin->setEmail($params['newemail']);
        else
            return $this->handleView($this->view(['code' => 403,'message' => "E-Mail not found"], 403));

        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->flush();
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
        $admin = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:User")->findBy(["enabled" => 1]);
        if (!$admin) {
            return $this->handleView($this->view(['code' => 404, 'message' => "No admins found"], 404));
        } else {
            $view = $this->view($admin, 200);
            return $this->handleView($view);
        }

    }

    /**
     * modify legal
     * notice
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
            return $this->handleView($this->view(['code' => 404,'message' => "Could not write the file.", 'content' => $paramFetcher->get('content')], 404));
        }else{
            return View::create(NULL, Codes::HTTP_OK);
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
        $path = $this->get('kernel')->getRootDir() . '/../web/resources/data/contactData';
        if(file_put_contents($path,$paramFetcher->get('content'))){
            return $this->handleView($this->view(['code' => 200,'message' => "saved contact data"], 200));
        }else{
            return $this->handleView($this->view(['code' => 404,'message' => "Could not write the file.", 'content' => $paramFetcher->get('content')], 401));
        }
    }

}
