<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marco Hanisch
 * Authors: Marco Hanisch 
 * Date: 31.05.2016
 * Time: 13:01
 */
namespace Core\APIBundle\Controller\Admin;

/**
 * Class RestController.
 */
 
 class AdminController extends FOSRestController implements ClassResourceInterface
{	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Action to create new Admin",
     *  output = "Core\EntityBundle\Entity\Admin",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     *
     * # app/config/config.yml ?
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */  
     public function putAction()
     {
         /**
          * When sending invitation set this value to 'true'
          *
          * It prevents sending invitations twice
          *
          * protected $sent =false;
          */
         


     }
     	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Action to invite an Admin",
     *  output = "Core\EntityBundle\Entity\Admin",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
              "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     }
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
     public function sendAction ($adminID)
     {
     }
     	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Action to disable an Admin",
     *  output = "Core\EntityBundle\Entity\Admin",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
              "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     }
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
     public function deleteAction ($adminID)
     {

     }
     	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Action to change the password",
     *  output = "Core\EntityBundle\Entity\Admin",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
              "name"="adminId",
     *        "dataType"="integer",
     *        "requirement"="\d+",
     *        "description"="Admin ID"
     }
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
     public function patchAction ($adminID)
     {

     }


     }
