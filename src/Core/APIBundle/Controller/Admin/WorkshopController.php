<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Martin Griebel, Marco Hanisch 
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller\Admin;

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
use Symfony\Component\Debug\Exception\FatalErrorException;
/**
 * Class RestController.
 * This class provides the private actions of a workshop.
 * @Rest\RouteResource("Workshops")
 */

class WorkshopController extends FOSRestController implements ClassResourceInterface
{

    /**
     * returns list of all workshops
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all Workshops ",
     *  output = "Core\EntityBundle\Entity\Workshop",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function historyAction()
    {
        $workshops = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->getAllWorkshops();
        if (!$workshops) {
            return $this->handleView($this->view(['code' => 404,'message' => "No Workshops found"], 404));
        }
        $view = $this->view($workshops, 200);
        return $this->handleView($view);
    }
    
    /**
     * action to create a new workshop
     * @ApiDoc(
     *  resource=true,
     *  description="Action to create a new Workshop",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * @param $paramFetcher ParamFetcher
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="title", requirements=".*", description="title of the workshop")
     * @Rest\RequestParam(name="description", requirements=".*", description="description of the workshop")
     * @Rest\RequestParam(name="cost", requirements=".*", description="cost of the workshop")
     * @Rest\RequestParam(name="requirements", requirements=".*", description="requirements of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="location", requirements=".*", description="location of the workshop")
     * @Rest\RequestParam(name="start_at", requirements=".*", description="starttime of the workshop")
     * @Rest\RequestParam(name="end_at", requirements=".*", description="endtime of the workshop")
     * @Rest\RequestParam(name="max_participants", requirements=".*", description="maximum number of participants")
     * @return action to create a new Workshop
     * @var Workshop $workshop
     * @Rest\View()
     */
    public function putAction(ParamFetcher $paramFetcher)
    {
        $workshop = new Workshop();
        $params = $paramFetcher->all();
        
        if($params["title"] != NULL)
            $workshop->setTitle($params["title"]);
        if($params["description"] != NULL)
            $workshop->setDescription($params["description"]);
        if($params["cost"] != NULL)
            $workshop->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshop->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshop->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshop->setStartAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["start_at"]));
        if($params["end_at"] != NULL)
            $workshop->setEndAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["end_at"]));
        if($params["max_participants"] != NULL)
            $workshop->setMaxParticipants($params["max_participants"]);
        $workshop->setNotified(FALSE);
        $this->getDoctrine()->getManager()->persist($workshop);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($workshop,201);
        return $this->handleView($view);

    }
    
	/**
	 * action to edit a workshop
     * @ApiDoc(
     *  resource=true,
     *  description="Action to edit a Workshop",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * @param $id int id of the workshop
     * @param $paramFetcher ParamFetcher
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="title", requirements=".*", description="title of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="description", requirements=".*", description="description of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="cost", requirements=".*", description="cost of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="requirements", requirements=".*", description="requirements of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="location", requirements=".*", description="location of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="start_at", requirements=".*", description="starttime of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="end_at", requirements=".*", description="endtime of the workshop",default=null,nullable=true)
     * @Rest\RequestParam(name="max_participants", requirements=".*", description="maximum number of participants",default=null,nullable=true )
     * @return array information of a workshop
     * @var Workshop $workshop
     * @Rest\View()
     */
    public function patchAction($id, ParamFetcher $paramFetcher)
    {
        $params = $paramFetcher->all();
        $workshop = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:Workshop')->find($id);
        if (!$workshop) {
            return $this->handleView($this->view(['code' => 404,'message' => "This workshop was not found"], 404));
        }
        if($params["title"] != NULL)
            $workshop->setTitle($params["title"]);
        if($params["description"] != NULL)
            $workshop->setDescription($params["description"]);
        if($params["cost"] != NULL)
            $workshop->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshop->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshop->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshop->setStartAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["start_at"]));
        if($params["end_at"] != NULL)
            $workshop->setEndAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["end_at"]));
        if($params["max_participants"] != NULL)
            $workshop->setMaxParticipants($params["max_participants"]);
        
        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(['template_name' => 'Changed Workshopdetails']);
        if(!$template){
            return $this->handleView($this->view(['code' => 404,'message' => "E-Mail Template not found"], 404));
        }
        /* Creating Twig template from Database */
        $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());

        $url = $this->generateUrl('core_frontend_default_index',[],TRUE)."http://swp.sky-lab.de/#/workshops/details/".$workshop->getId();

        $workshopParticipants = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopParticipants')->findBy(['workshop' => $workshop]);

        foreach($workshopParticipants as $wp)
        {
            $message = \Swift_Message::newInstance()
                ->setSubject($this->get('twig')->createTemplate($template->getEmailSubject())->render(["workshop" => $workshop]))
                ->setFrom($this->getParameter('email_sender'))
                ->setTo($wp->getParticipant()->getEmail())
                ->setBody($renderTemplate->render(["workshop" => $workshop , "participant" => $wp->getParticipant(),'url' => $url]), 'text/html');
            $this->get('mailer')->send($message);
        }
        
        $this->getDoctrine()->getManager()->persist($workshop);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($workshop,201);
        return $this->handleView($view);
    }

    /**
     * action to delete a workshop
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
     *
     * @param $id int id of the workshop
     * @return \Symfony\Component\HttpFoundation\Response
     * @var Workshop $workshop
     * @Rest\View()
     */
    public function deleteAction($id)
    {
        $workshop = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:Workshop")->find($id);
        if (!$workshop) {
            return $this->handleView($this->view(['code' => 404,'message' => "No Workshop found"], 404));
        }

        $workshopParticipants = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopParticipants')->findBy(['workshop' => $workshop]);

        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(['template_name' => 'Workshop Cancel']);
        if(!$template){
            return $this->handleView($this->view(['code' => 404,'message' => "E-Mail Template not found"], 404));
        }
        /* Creating Twig template from Database */
        $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());

        foreach($workshopParticipants as $wp)
        {
            $message = \Swift_Message::newInstance()
                ->setSubject($this->get('twig')->createTemplate($template->getEmailSubject())->render(["workshop" => $workshop]))
                ->setFrom($this->getParameter('email_sender'))
                ->setTo($wp->getParticipant()->getEmail())
                ->setBody($renderTemplate->render(["workshop" => $workshop , "participant" => $wp->getParticipant()]), 'text/html');
            $this->get('mailer')->send($message);
            $this->getDoctrine()->getManager()->remove($wp);

        }

        $this->getDoctrine()->getManager()->remove($workshop);
        $this->getDoctrine()->getManager()->flush();


        return $this->handleView($this->view(['code' => 200,'message' => "Deleted & Mail send"], 200));
    }
    
    
	/**
	 * action to overbook a workshop with participant from waitinglist
     * @ApiDoc(
     *  resource=true,
     *  description="overbook a workshop",
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
     *
     * @param $id int id of the workshop
     * @param $participantId int id of the workshopparticipants
     * @return \Symfony\Component\HttpFoundation\Response
     * @var WorkshopParticipants $workshopParticipant
     * @Rest\View()
     */
    public function patchWaitinglistAction($id, $participantId) /**Workshop ID!, Workshopüberbuchung: von der Warteliste auf die Nichtwarteliste*/
    {
        //relation between workshop and participant
        $workshopParticipant = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->findOneBy([ "workshop"=>$id,"participant"=>$participantId]);
        if (!$workshopParticipant) {
            return $this->handleView($this->view(['code' => 404,'message' => "No Participants on waiting list found"], 404));
        }
        $workshopParticipant->setWaiting(0); /** 0 -> im Workshop, 1-> Waiting */
        $this->getDoctrine()->getManager()->persist($workshopParticipant);
        $this->getDoctrine()->getManager()->flush();

        /* Loading the default E-Mail template*/
        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(['template_name' => 'Participant']);
        /* Creating Twig template from Database */
        $renderTemplate = $this->get("twig")->createTemplate($template->getEmailBody());
        /* Sending E-Mail */

        $message = \Swift_Message::newInstance()
            ->setSubject($this->get('twig')->createTemplate($template->getEmailSubject())->render(["workshop" => $workshopParticipant->getWorkshop()]))
            ->setFrom($this->container->getParameter('email_sender'))
            ->setTo($workshopParticipant->getParticipant()->getEmail())
            ->setBody($renderTemplate->render(['participant' => $workshopParticipant->getParticipant(),'workshop' => $workshopParticipant->getWorkshop()] ), 'text/html');
        $this->get("mailer")->send($message);
        
        return View::create(null, Codes::HTTP_CREATED);
    }

    /**
     * action to confirm participation
     * @ApiDoc(
     *  resource=true,
     *  description="action to confirm participation",
     *  output = "",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="workshopId",
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
     * @param $id int id of the workshop
     * @param $participantId int id of the workshopparticipants
     * @return \Symfony\Component\HttpFoundation\Response

     * 
     * @Rest\View()
     */
    public function postParticipatedAction($id, $participantId)
    {
        $workshopParticipant = $this->getDoctrine()->getRepository("CoreEntityBundle:WorkshopParticipants")->findOneBy(["workshop" => $id,"participant" => $participantId]);

        if(!$workshopParticipant){
            return $this->handleView($this->view(['code' => 404,'message' => "User not found in this workshop"], 404));
        }

        $workshopParticipant->setParticipated(true);
        $this->getDoctrine()->getManager()->persist($workshopParticipant);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_OK);

    }

    /**
     * Returns the waiting list of a workshop
     * @ApiDoc(
     *  resource=true,
     *  description="Returns the waiting list of a workshop",
     *  output = "Core\EntityBundle\Entity\Participants",
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
     * @param $id int id of workshop
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getWaitinglistAction($id)
    {
        $waitingList = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopParticipants')->findBy(['workshop' => $id,'waiting' => true],['enrollment' => "DESC"]);
        if (!$waitingList) {
            return $this->handleView($this->view(['code' => 404,'message' => "No waitinglist for workshop"], 404));
        }
        $list = [];
        foreach($waitingList as $p){
            $list[] =$p->getParticipant();
        }
        $view = $this->view($list, 200);
        return $this->handleView($view);
    }

    /**
     * Returns the list of participants
     * @ApiDoc(
     *  resource=true,
     *  description="Returns the list of participants",
     *  output = "Core\EntityBundle\Entity\Participants",
     *	statusCodes = {
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
     * @param $id int id of workshop
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getParticipantsAction($id)
    {
        $participantsList = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopParticipants')->findBy(['workshop' => $id, 'waiting' => false],['enrollment' => "DESC"]);
        if (!$participantsList) {
            return $this->handleView($this->view(['code' => 404, 'message' => "No Participant in Workshop found"], 404));

        }
        $list = [];
        foreach($participantsList as $p){
            $list[] =$p->getParticipant();
        }
        $view = $this->view($list, 200);
        return $this->handleView($view);
    }
}
