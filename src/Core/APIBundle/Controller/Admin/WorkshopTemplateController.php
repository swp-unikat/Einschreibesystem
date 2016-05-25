<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Authors: Marco Harnisch,Martin Griebel
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller\Admin;

use Core\EntityBundle\Entity\WorkshopTemplate;
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
 * @Rest\RouteResource("Template")
 */

class WorkshopTemplateController extends FOSRestController implements ClassResourceInterface
{
    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all templates",
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
    public function getListAction()
    {
        $workshops = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopTemplate')->findAll();
	    if(!$workshops) {
            throw $this->createNotFoundException("No WorkshopTemplate found");
        }

	$view = $this->view($entits, 200);
        return $this->handleView($view);
    }

    /**
     
     * @ApiDoc(
     *  resource=true,
     *  description="Load a template",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Workshoptemplate ID"
     *      }
     * }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getAction($id)
    {
        $workshoptemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopTemplate')->find($id);
        if (!$workshoptemplate) {
            throw $this->createNotFoundException("This workshoptemplate was not found");
        } else {
            $view = $this->view($workshop, 200);
            return $this->handleView($view);
        }

    }

    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Edit a template",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * )
     * @REST\QueryParam(name="json", requirements="", default="1", description="json object of workshop")
     * @return \Symfony\Component\HttpFoundation\Response
     * @REST\RequestParam(name="title", requirements=".*", description="title of the Workshop")
     * @REST\RequestParam(name="description", requirements=".*", description="description of the Workshop")
     * @REST\RequestParam(name="cost", requirements=".*", description="cost of the Workshop")
     * @REST\RequestParam(name="requirements", requirements=".*", description="requirements of the Workshop")
     * @REST\RequestParam(name="location", requirements=".*", description="location of the Workshop")
     * @REST\RequestParam(name="start_at", requirements=".*", description="starttime of the Workshop")
     * @REST\RequestParam(name="end_at", requirements=".*", description="endtime of the Workshop")
     * @REST\RequestParam(name="max_participants", requirements=".*", description="maximum number of participants")
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramFetcher,$id)
    {
        $params = $paramFetcher->all();
        $workshoptemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopTemplates")->findById($id);
        if (!$workshoptemplate) {
            throw $this->createNotFoundException("No WorkshopTemplate found");
        }
        if($params["title"] != NULL)
            $workshoptemplate->setTitle($params["title"]);
        if($params["description"] != Null)
            $workshoptemplate->setDescription($params["description"]);
        if($params["cost"] != NULL)
        $workshoptemplate->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshoptemplate->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshoptemplate->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshoptemplate->setStartAt($params["start_at"]);
        if($params["end_at"] != NULL)
            $workshoptemplate->setEndAt($params["end_at"]);
        if($params["max_participants"] != NULL)
            $workshoptemplate->setMaxParticipants($params["max_participants"]);
        $this->getDoctrine()->getManager()->persist($workshoptemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($workshoptemplate,200);
        return $this->handleView($view);
    }

    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Create new template",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @REST\RequestParam(name="title", requirements=".*", description="title of the Workshop")
     * @REST\RequestParam(name="description", requirements=".*", description="description of the Workshop")
     * @REST\RequestParam(name="cost", requirements=".*", description="cost of the Workshop")
     * @REST\RequestParam(name="requirements", requirements=".*", description="requirements of the Workshop")
     * @REST\RequestParam(name="location", requirements=".*", description="location of the Workshop")
     * @REST\RequestParam(name="start_at", requirements=".*", description="starttime of the Workshop")
     * @REST\RequestParam(name="end_at", requirements=".*", description="endtime of the Workshop")
     * @REST\RequestParam(name="max_participants", requirements=".*", description="maximum number of participants")
     * @Rest\View()
     */
    public function putAction(ParamFetcher $paramFetcher)  {
        $workshoptemplate= new WorkshopTemplate();
        $params = $paramFetcher->all();
        if($params["title"] != NULL)
            $workshoptemplate->setTitle($params["title"]);
        if($params["description"] != Null)
            $workshoptemplate->setDescription($params["description"]);
        if($params["cost"] != NULL)
            $workshoptemplate->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshoptemplate->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshoptemplate->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshoptemplate->setStartAt($params["start_at"]);
        if($params["end_at"] != NULL)
            $workshoptemplate->setEndAt($params["end_at"]);
        if($params["max_participants"] != NULL)
            $workshoptemplate->setMaxParticipants($params["max_participants"]);
        $this->getDoctrine()->getManager()->persist($workshoptemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($workshoptemplate,200);
        return $this->handleView($view);
    }

    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Delete a template",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Workshoptemplate ID"
     *      }
     * }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function deleteAction($id)
    {
        $workshopTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopTemplate")->find($id);
        if (!$workshopTemplate) {
            throw $this->createNotFoundException("WorkshopTemplate not found");
        }
        $this->getDoctrine()->getManager()->remove($workshopTemplate);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_NO_CONTENT);
    }
}
