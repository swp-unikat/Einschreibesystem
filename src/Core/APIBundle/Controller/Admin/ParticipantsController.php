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
       $participants = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Participants')->findAll();
        if (!$participants) {
            throw $this->createNotFoundException("No Participants found");
        } 
        $view = $this->view($participants, 200);
        return $this->handleView($view);	    
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
	    $participantsBlacklist = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Participants');
	     $participant = $participantsBlacklist->getAllBlacklistedParticipants();
	     if (!$participant) {
            throw $this->createNotFoundException("No Participant on Blacklist found");
         }
        $view = $this->view($participant, 200);
        return $this->handleView($view);
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
        $participant = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Participants')->find($id);
        if (!$participant) {
            throw $this->createNotFoundException("No User found");
        } else {
            $participant->setBlacklisted(true);
            $participant->setBlacklistedAt(new \DateTime("now"));
            /* ToDO Add User to Database who blacklisted the participant */

            $this->getDoctrine()->getManager()->persist($participant);
            $this->getDoctrine()->getManager()->flush();

            return View::create(null, Codes:HTTP_NO_CONTENT);
        }
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
       $participantsBlacklist = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Participants")->find($id);
        if (!$participantsBlacklist) {
            throw $this->createNotFoundException("No Participant on Blacklist found");
        }
        $this->getDoctrine()->getManager()->remove($participantsBlacklist);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_NO_CONTENT);
    }
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
        $participantsBlacklist = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Participants')->find($id);
        if (!$participantsBlacklist) {
            throw $this->createNotFoundException("No User found");
         } else {
            $view = $this->view($participantsBlacklist, 200);
            return $this->handleView($view);
         }
    }
