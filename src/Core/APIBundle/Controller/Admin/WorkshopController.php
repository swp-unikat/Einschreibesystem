<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt) 
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
use Core\EntityBundle\Entity\Workshop;
use Core\EntityBundle\Entity\WorkshopParticipants;
use Core\EntityBundle\Entity\EmailToken;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Symfony\Component\HttpFoundation\Request;
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
        $workshopRepo = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Workshop');
        $entities = $workshopRepo->getAllWorkshops();
        if (!$entities) {
            throw $this->createNotFoundException("No Workshops found");
        }

        $view = $this->view($entities, 200);
        return $this->handleView($view);
    }

    /**

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

    }
    
	/**
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
     * @Rest\RequestParam(name="title", requirements=".*", description="json object of workshop")
     * @Rest\RequestParam(name="", requirements=".*", description="json object of workshop")
     * @Rest\View()
     */
    public function patchAction($id,ParamFetcher $paramFetcher)
    {

        $paramFetcher->get('title');

        return $this->handleView($view);
    }

    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Action to delete a Workshop",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Workshop ID"
     *      }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function deleteAction($id)
    {
        $workshop = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->find($id);
        if (!$workshop) {
            throw $this->createNotFoundException("Workshop not found");
        }
        $this->getDoctrine()->getManager()->remove($workshop);
        $this->getDoctrine()->getManager()->flush($workshop);

        return View::create(null, Codes::HTTP_NO_CONTENT);
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
    public function getEnrollConfirmAction($workshopId,$participantsId,$token)
    {
        $workshop = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->find($workshopId);
        $token = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailToken")->findOneBy(['token' => $token]);
        $participant = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Participants")->find($participantsId);

        // Workshop & Token & participant are valid
        if($workshop && $token && $participant){
            // Check if Token is not older then 30 min
            if($token->getValidUntil() <= new \DateTime('now')){
                // Check if this token is dedicated to user
                if($token->getParticipant() != $participant){
                    throw $this->createAccessDeniedException("User does not match");
                }else{
                    $participantWorkshop = new WorkshopParticipants();
                    $participantWorkshop->setWorkshop($workshop);
                    $participantWorkshop->setParticipant($participant);
                    $participantWorkshop->setEnrollment(new \DateTime('now'));
                    // Get Participants
                    $participants = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->getParticipants($workshopId);
                    // Check if a waitinglist ist requiered
                    if($participants > $workshop->getMaxParticipants())
                        $participantWorkshop->setWaiting(true);
                    else
                        $participantWorkshop->setWaiting(false);
                    // save to database
                    $token->setUsedAt(new \DateTime('now'));
                    $this->getDoctrine()->getManager()->persist($token);
                    $this->getDoctrine()->getManager()->persist($participantWorkshop);
                    $this->getDoctrine()->getManager()->flush();
                }
            }else{
                throw $this->createAccessDeniedException("Token ist not valid");
            }
        }else{
            throw $this->createNotFoundException("Workshop or Token not found");
        }
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
	    $workshop = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->find($id);
    }
    
    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Returns the waitinglist of a workshop",
     *  output = "Core\EntityBundle\Entity\WorkshopParticipants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Workshop ID"
     *      }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getWaitinglistAction($id)
    {
        $waitinglist = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopParticipants')->findBy(['workshop' => $id,'waiting' => 1],['enrollment' => "DESC"]);
        if (!$waitinglist) {
            throw $this->createNotFoundException("No waitinglist for workshop");
        }

        $view = $this->view($waitinglist, 200);
        return $this->handleView($view);
    }
	
	/**
	 
     * @ApiDoc(
     *  resource=true,
     *  description="overbook a woorkshop",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Workshop ID"
     *      },{
     *          "name"="participantsId",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Participants ID"
     *     }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function patchWaitinglistAction($id, $participantId)
    {
        $workshopParticipant = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->findById($id,
            $participantId);
        if (!$workshopParticipant) {
            throw $this->createNotFoundException("No participant on waiting list found");
        }
        $workshopParticipant->setWaiting(0);
        $this->getDoctrine()->getManager()->persist($workshopParticipant);
        $this->getDoctrine()->getManager()->flush();

        return View::create(null, Codes::HTTP_NO_CONTENT);
    }
}
