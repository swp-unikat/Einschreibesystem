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
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */  
     public function putAction()
     {
     }
     
