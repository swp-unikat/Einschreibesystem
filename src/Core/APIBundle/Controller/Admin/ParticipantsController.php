<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Martin Griebel, Marco Hanisch
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller\Admin;

use Doctrine\Common\Collections\Criteria;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;

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
 * this class provides the actions to get the participants and to get the blacklisted participants, to put a participant to the blacklist and to remove a participant from the blacklist
 * @Rest\RouteResource("Participants")
 */

class ParticipantsController extends FOSRestController implements ClassResourceInterface
{
	/**
	 * returns list of all participants
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
     * @return give the list of all participants
     * @var Participants $participants
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
    	 * returns list of all participants that are blacklisted
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
     * @return list of all participants that are blacklisted
     * @var Participants $participantsBlacklist
     * @Rest\View()
     */
    public function getBlacklistAllAction()
    {
        $participantsBlacklist = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Participants')->findBy(['blacklisted' => TRUE]);
        if (!$participantsBlacklist) {
            throw $this->createNotFoundException("No Participant on Blacklist found");
        }
        $view = $this->view($participantsBlacklist, 200);
        return $this->handleView($view);
    }
    	/**
    	 * add participant to blacklist
     * @ApiDoc(
     *  resource=true,
     *  description="Add participants to blacklist ",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Participants ID"
     *      }
     * }
     * )
     * )
     *
     * @param $id int id of the participants
     * @return \Symfony\Component\HttpFoundation\Response
     * @var Participants $participant
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
            $participant->setBlacklistedFrom($this->getUser());
            $this->getDoctrine()->getManager()->persist($participant);
            $this->getDoctrine()->getManager()->flush();

            return View::create(null, Codes::HTTP_NO_CONTENT);
        }
    }
    
    /**
     * remove participant from blacklist
     * @ApiDoc(
     *  resource=true,
     *  description="Remove participants from Blacklist",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Blacklist ID"
     *      }
     * }
     * )
     * )
     *
     * @param $id int id of the participants
     * @return \Symfony\Component\HttpFoundation\Response
     * @return Email that the Participants removed from Blacklist
     * @var Participants $participantsBlacklist
     * @Rest\View()
     */
    public function deleteBlacklistAction($id)
    {
       $participantsBlacklist = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Participants")->find($id);
        if (!$participantsBlacklist) {
            throw $this->createNotFoundException("No Participant on Blacklist found");
        }
        $participantsBlacklist->setBlacklisted(false);
        $this->getDoctrine()->getManager()->persist($participantsBlacklist);
        $this->getDoctrine()->getManager()->flush();
        return View::create($participantsBlacklist->getEmail()." remove from Blacklist", Codes::HTTP_OK);
    }
    
    /**
     * get detail view of blacklisted user
     * @ApiDoc(
     *  resource=true,
     *  description="Get detail view of blacklisted user",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Blacklist ID"
     *      }
     * }
     * )
     * )
     * @param $id int id of the participants
     * @return \Symfony\Component\HttpFoundation\Response
     * @return detail view of the user that are blacklisted
     * @var Participants $participantsBlacklist
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


    /**
     * delete user from participants list
     * @ApiDoc(
     *  resource=true,
     *  description="",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * @param $participant int id of participant
     * @param  $workshop int id of workshop
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function deleteRemoveAction($participant,$workshop)
    {
        $participantAtWorkshop = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->findOneBy(['participant'=>$participant,'workshop' => $workshop]);
        if (!$participantAtWorkshop){
            return $this->handleView($this->view(['code' => 404,'message' => "Participant at Workshop not found"], 404));
        }else{
            $this->getDoctrine()->getManager()->remove($participantAtWorkshop);
            $this->getDoctrine()->getManager()->flush();
            return $this->handleView($this->view(['code' => 200,'message' => "Remove participant from workshop"], 200));

        }
    }
}


