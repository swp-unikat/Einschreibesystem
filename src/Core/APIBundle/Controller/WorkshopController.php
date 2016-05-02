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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\Query;
/**
 * Class RestController.
 *
 * @Rest\RouteResource("Workshops")
 */

class WorkshopController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all Workshops that are active",
     *  output = "Core\EntityBundle\Entity\Workshop",
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
        $workshopRepo = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Workshop');
        $entits = $workshopRepo->getAllActiveWorkshops();
        if (!$entits) {
            throw $this->createNotFoundException("No Workshops found");
        }

        $view = $this->view("{'Hallo'}", 200);
        return $this->handleView($view);
    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all Workshops ",
     *  output = "Core\EntityBundle\Entity\Workshop",
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
    public function historyAction()
    {
		
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Returns Details of a Workshop",
     *  output = "Core\EntityBundle\Entity\Workshop",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="which workshop to display"
     *      }
     *  },
     *  parameters={
     *      {"name"="id", "dataType"="integer", "required"=true, "description"="Workshop Id"}
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getAction($id)
    {

    }
    /**
    	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Action to create a new Workshop",
     *  output = "",
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
		return $new;
    }
    
	/**
	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Action to edit a Workshop",
     *  output = "",
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
    public function patchAction($id)
    {

    }
    	/**
    	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="Action to delete a Workshop",
     *  output = "",
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
    public function deleteAction($id)
    {

    }
	/**	
     * @ApiDoc(
     *  resource=true,
     *  description="Action to enroll a Workshop",
     *  output = "",
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
    public function postEnrollAction($id)
    {
		
    }
    
    	/**	
     * @ApiDoc(
     *  resource=true,
     *  description="Action to confirm enrollment to a Workshop",
     *  output = "",
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
    public function getEnrollConfirmAction($id,$token)
    {
		
    }
    
    	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Action to unsubscribe a Workshop",
     *  output = "",
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
    public function getUnsubscribeAction($id,$token)
    {
		
    }
    
    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Returns the waitinglist of a workshop",
     *  output = "",
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
    public function getWaitinglistAction($id)
    {
		
    }
	
	/**
	 * @Security("has_role('ROLE_ADMIN')")
     * @ApiDoc(
     *  resource=true,
     *  description="overbook a woorkshop",
     *  output = "",
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
    public function patchWaitinglistAction($id,$participantsId)
    {
		
    }
}