<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marco Hanisch
 * Authors: Marco Hanisch
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
class AdminController extends FOSRestController implements ClassResourceInterface
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
      *  },requirements={{
      *        "name"="token",
      *        "dataType"="string",
      *        "requirement"=".*",
      *        "description"="email of the admin"
      * }}
      * )
      * @param  $token string the token identifies the user
      * @param $request Request
      * @return \Symfony\Component\HttpFoundation\Response
      * @Rest\View()
      */
     public function postResetPasswordAction($token,Request $request)
     {
         $password = $request->get("password");
         $UserManager = $this->get('fos_user.user_manager');
         $admin = $UserManager->findUserByConfirmationToken($token);
         if(!$admin){
             throw $this->createNotFoundException("Admin not found");
         } else {
             $admin->setPlainPassword($password);
         }
         $this->getDoctrine()->getManager()->persist($admin);
         $this->getDoctrine()->getManager()->flush();
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
      * @Rest\View()
      */
     public function postSendPasswordForgotEmailAction($email)
     {
         /** @var $user User */
         $user = $this->get('fos_user.user_manager')->findUserByUsernameOrEmail($email);
         if (null === $user) {
             $this->createNotFoundException("Username not found");
         }
         if ($user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {
             return $this->createAccessDeniedException("Password already requested");
         }
         if (null === $user->getConfirmationToken()) {
             /** @var $tokenGenerator \FOS\UserBundle\Util\TokenGeneratorInterface */
             $tokenGenerator = $this->get('fos_user.util.token_generator');
             $user->setConfirmationToken($tokenGenerator->generateToken());
         }

         /*
          *@ToDO Send an E-Mail
          */
     }
 }
