<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller;

use Doctrine\Common\Collections\Criteria;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Doctrine\ORM\Query;
/**
 * Class RestController.
 *
 * @Rest\RouteResource("Participants")
 */

class ParticipantsController extends FOSRestController implements ClassResourceInterface
{
	/**
	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all participants",
     *  output = "Core\EntityBundle\Entity\Participants",
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
    public function getAllAction()
    {
	    
    }
    
    	/**
    	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all participants that are blacklisted",
     *  output = "Core\EntityBundle\Entity\Participants",
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
    public function getBlacklistAllAction()
    {
	    
    }
    
    	/**
    	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Add participants to blacklist ",
     *  output = "Core\EntityBundle\Entity\Participants",
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
    public function putBlacklistAction($id)
    {
	    
    }
    
    /**
     * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Remove participants from Blacklist",
     *  output = "Core\EntityBundle\Entity\Participants",
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
    public function deleteBlacklistAction($id)
    {
	    
    }
    
    /**
     * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Get detail view of blacklisted user",
     *  output = "Core\EntityBundle\Entity\Participants",
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
    public function getBlacklistAction($id)
    {
	    
    }
}
