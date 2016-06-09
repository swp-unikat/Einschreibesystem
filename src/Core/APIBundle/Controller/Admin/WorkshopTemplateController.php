<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Authors: Marco Harnisch,Martin Griebel
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller\Admin;

use Core\EntityBundle\Entity\WorkshopTemplates;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;
use JMS\Serializer\SerializationContext;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
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
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getListAction()
    {
        $workshopTemplates = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopTemplates')->findAll();
	    if(!$workshopTemplates) {
            throw $this->createNotFoundException("No WorkshopTemplate found");
        }

	    $view = $this->view($workshopTemplates, 200);
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
     *    }
     * )
     * @param $id int Id of the Workshop Template
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getAction($id)
    {
        $workshopTemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:WorkshopTemplates')->find($id);
        if (!$workshopTemplate) {
            throw $this->createNotFoundException("This workshop template was not found");
        } else {
            $view = $this->view($workshopTemplate, 200);
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
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="WorkshopTemplate ID"
     *      }
     *  },requirements={
     *      {
     *          "name"="title",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="title of the workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="description",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="description of the workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="cost",
     *          "dataType"="float",
     *          "requirement"="[0-9\.]+",
     *          "description"="cost of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="requirements",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="requirements of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="location",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="location of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="start_at",
     *          "dataType"="DateTime",
     *          "requirement"=".*",
     *          "description"="starttime of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="end_at",
     *          "dataType"="DateTime",
     *          "requirement"="",
     *          "description"="endtime of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="max_participants",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="maximum number of participants"
     *      }
     *   }
     * )
     * @param $paramFetcher ParamFetcher
     * @param $id int id of the workshop template
     * @return \Symfony\Component\HttpFoundation\Response
     * @REST\RequestParam(name="title", requirements=".*", description="title of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="description", requirements=".*", description="description of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="cost", requirements=".*", description="cost of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="requirements", requirements=".*", description="requirements of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="location", requirements=".*", description="location of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="start_at", requirements=".*", description="starttime of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="end_at", requirements=".*", description="endtime of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="max_participants", requirements=".*", description="maximum number of participants",default=null,nullable=true)
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramFetcher,$id)
    {

         /* load all parameters */
        $params = $paramFetcher->all();
        /* load the workshopTemplate from the database*/
        $workshopTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopTemplates")->find($id);
        /* check if the workshopTemplate exist */
        if (!$workshopTemplate) {
            throw $this->createNotFoundException("No WorkshopTemplate found");
        }
        /* check the parameters */
        if($params["title"] != NULL)
            $workshopTemplate->setTitle($params["title"]);
        if($params["description"] != Null)
            $workshopTemplate->setDescription($params["description"]);
        if($params["cost"] != NULL)
            $workshopTemplate->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshopTemplate->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshopTemplate->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshopTemplate->setStartAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["start_at"]));
        if($params["end_at"] != NULL)
            $workshopTemplate->setEndAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["end_at"]));
        if($params["max_participants"] != NULL)
            $workshopTemplate->setMaxParticipants($params["max_participants"]);
        /* save the edited template to the database*/
        $this->getDoctrine()->getManager()->persist($workshopTemplate);
        $this->getDoctrine()->getManager()->flush();
        /* return empty view with http ok*/
        return View::create(null, Codes::HTTP_OK);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Create new template",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="title",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="title of the workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="description",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="description of the workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="cost",
     *          "dataType"="float",
     *          "requirement"="[0-9\.]+",
     *          "description"="cost of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="requirements",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="requirements of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="location",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="location of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="start_at",
     *          "dataType"="date",
     *          "requirement"=".*",
     *          "description"="starttime of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="end_at",
     *          "dataType"="date",
     *          "requirement"=".*",
     *          "description"="endtime of the Workshop"
     *      }
     *  },requirements={
     *      {
     *          "name"="max_participants",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="maximum number of participants"
     *      }
     *  }
     * )
     *
     * @param $paramFetcher ParamFetcher
     * @return \Symfony\Component\HttpFoundation\Response
     * @REST\RequestParam(name="title", requirements=".*", description="title of the Workshop")
     * @REST\RequestParam(name="description", requirements=".*", description="description of the Workshop")
     * @REST\RequestParam(name="cost", requirements=".*", description="cost of the Workshop")
     * @REST\RequestParam(name="requirements", requirements=".*", description="requirements of the Workshop")
     * @REST\RequestParam(name="location", requirements=".*", description="location of the Workshop")
     * @REST\RequestParam(name="start_at", requirements=".*", description="starttime of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="end_at", requirements=".*", description="endtime of the Workshop",default=null,nullable=true)
     * @REST\RequestParam(name="max_participants", requirements="\d+", description="maximum number of participants")
     * @Rest\View()
     */
    public function putAction(ParamFetcher $paramFetcher)  {
        $workshopTemplate= new WorkshopTemplates();
        $params = $paramFetcher->all();
        if($params["title"] != NULL)
            $workshopTemplate->setTitle($params["title"]);
        if($params["description"] != Null)
            $workshopTemplate->setDescription($params["description"]);
        if($params["cost"] != NULL)
            $workshopTemplate->setCost($params["cost"]);
        if($params["requirements"] != NULL)
            $workshopTemplate->setRequirements($params["requirements"]);
        if($params["location"] != NULL)
            $workshopTemplate->setLocation($params["location"]);
        if($params["start_at"] != NULL)
            $workshopTemplate->setStartAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["start_at"]));
        if($params["end_at"] != NULL)
            $workshopTemplate->setEndAt(\DateTime::createFromFormat('Y-m-d H:i:s',$params["end_at"]));
        if($params["max_participants"] != NULL)
            $workshopTemplate->setMaxParticipants($params["max_participants"]);
        $this->getDoctrine()->getManager()->persist($workshopTemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($workshopTemplate,200);
        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Delete a template",
     *  output = "",
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
     * @param $id int id of the workshop template
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function deleteAction($id)
    {
        $workshopTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopTemplates")->find($id);
        if (!$workshopTemplate) {
            throw $this->createNotFoundException("WorkshopTemplate not found");
        }
        $this->getDoctrine()->getManager()->remove($workshopTemplate);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_OK);
    }
}
