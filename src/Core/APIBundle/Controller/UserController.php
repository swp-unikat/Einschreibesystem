<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Marco Hanisch, Leon Bergmann, Andreas Ifland
 * Date: 09.06.2016
 * Time: 11:13
 */
namespace Core\APIBundle\Controller;


use Core\EntityBundle\Entity\Invitation;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;
use Core\EntityBundle\Entity\User;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Symfony\Component\HttpFoundation\Request;


/**
 * Class AdminController
 * The AdminController provides functions to iniate a password change. The methods of the controller are accessible with out a login.
 */
class UserController extends FOSRestController implements ClassResourceInterface
 {
    /**
     * Action to reset the password
     * @ApiDoc(
     *  resource=true,
     *  description="Action to reset the password",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * @Rest\RequestParam(name="token", requirements=".*", description="token")
     * @Rest\RequestParam(name="password", requirements=".*", description="password")
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function postResetPasswordAction(ParamFetcher $paramFetcher)
     {
         $admin = $this->get('fos_user.user_manager')->findUserByConfirmationToken($paramFetcher->get("token"));

         if(!$admin){
             return $this->handleView($this->view(['code' => 403,'message' => "Used token is not valid."], 403));
         } else {
             $admin->setPlainPassword($paramFetcher->get("password"));
             $admin->setConfirmationToken(NULL);
             $this->get('fos_user.user_manager')->updateUser($admin);
         }
         $this->getDoctrine()->getManager()->persist($admin);
         $this->getDoctrine()->getManager()->flush();
         return View::create(NULL, Codes::HTTP_ACCEPTED);
     }

    /**
     * Action to send a e-mail to identify the user
      * @ApiDoc(
      *  resource=true,
      *  description="Action to send a e-mail to identify the user",
      *  output = "",
      *  statusCodes = {
      *      200 = "Returned when successful",
      *      404 = "Returned when the data is not found"
      *  },requirements={{
      *        "name"="email",
      *        "dataType"="string",
      *        "requirement"=".*",
      *        "description"="email of the admin"
      * }}
      * )
      * @param $email string E-Mail
      * @return \Symfony\Component\HttpFoundation\Response
      * @Rest\RequestParam(name="email", requirements=".*", description="email")
      * @Rest\View()
      */
     public function postSendPasswordForgotEmailAction(ParamFetcher $paramFetcher)
     {
         /** @var $user User */
         $user = $this->get('fos_user.user_manager')->findUserByUsernameOrEmail($paramFetcher->get("email"));
         if (null === $user) {
             $this->createNotFoundException("Username not found");
         }

         if (null === $user->getConfirmationToken()) {
             /** @var $tokenGenerator \FOS\UserBundle\Util\TokenGeneratorInterface */
             $tokenGenerator = $this->get('fos_user.util.token_generator');
             $user->setConfirmationToken($tokenGenerator->generateToken());
             $user->setPasswordRequestedAt(new \DateTime('now'));
             $this->getDoctrine()->getManager()->persist($user);
             $this->getDoctrine()->getManager()->flush();
         }else{
             return $this->handleView($this->view(['code' => 401,'message' => "Password reset already requested."], 401));
         }

         $url = $this->generateUrl('core_frontend_default_index',[],TRUE)."#/password/reset/".$user->getConfirmationToken();
         $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->find(3);
         /* Creating Twig template from Database */
         $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());
         /* Sending E-Mail */
         $message = \Swift_Message::newInstance()
             ->setSubject($template->getEmailSubject())
             ->setFrom($this->getParameter('email_sender'))
             ->setTo($paramFetcher->get("email"))
             ->setBody($renderTemplate->render(['email' => $paramFetcher->get("email"),'url' => $url]), 'text/html');
         $this->get('mailer')->send($message);

         return View::create(NULL, Codes::HTTP_OK);

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
     *  }
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="email", requirements=".*", description="email of the new admin")
     * @Rest\RequestParam(name="password", requirements=".*", description="password of the new admin")
     * @Rest\RequestParam(name="code", requirements=".*", description="token")
     * @Rest\RequestParam(name="username", requirements=".*", description="username",nullable=true)
     * @param $paramFetcher ParamFetcher
     * @Rest\View()
     */

    public function postCreateAdminAction(ParamFetcher $paramFetcher)
    {
        //$params is array with E-Mail Password and Token (Code)
        $params = $paramFetcher->all();
        //find invitation in database
        if($params['username'] === NULL){
            $params['username'] = uniqid();
        }
        $invitation = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Invitation")->findOneBy(['code' => $params['code']]);
        //check if invitation parameter sended is true
        if ($invitation->getSent() && $invitation->getUsed() != true) {
            //FOSUserBundle
            $UserManager = $this->get('fos_user.user_manager');

            /** @var $admin User */
            $admin = $UserManager->createUser();
            $admin->setEmail($params['email']);
            $admin->setUsername($params['username']);
            $admin->setPlainPassword($params["password"]);
            $admin->setEnabled(true);
            $invitation->setUsed(true);
        } else {
            throw $this->createAccessDeniedException("No invitation was sended or the invitation was already used");
        }

        $this->getDoctrine()->getManager()->persist($admin);
        $this->getDoctrine()->getManager()->persist($invitation);
        $this->getDoctrine()->getManager()->flush();

        return View::create(NULL, Codes::HTTP_OK);
    }
 }
