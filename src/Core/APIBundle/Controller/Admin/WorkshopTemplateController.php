<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Authors: Marco Harnisch,Martin Griebel
 * Date: 29.04.2016
 * Time: 16:44
 */
namespace Core\APIBundle\Controller\Admin;

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
     * @Rest\View()
     */
    public function patchAction($id)
    {

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
     * @Rest\View()
     */
    public function putAction($id)
    {

    }

    /**

     * @ApiDoc(
     *  resource=true,
     *  description="Delete a template",
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
