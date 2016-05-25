<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon
 * Company: SkyLab UG(haftungsbeschränkt)
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
use Core\EntityBundle\Entity\EmailTemplate;
/**
 * Class RestController.
 *
 * @Rest\RouteResource("Template")
 */

class EmailTemplateController extends FOSRestController implements ClassResourceInterface
{
	/**
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all templates",
     *  output = "Core\EntityBundle\Entity\",
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
    	$emailTemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->findAll();
    	if (!$emailTemplate) {
            throw $this->createNotFoundException("No emailtemplate was not found");
        } else {
            $view = $this->view($emailTemplate, 200);
            return $this->handleView($view);
        }
	    
    }
    
    	/**
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Load a template",
     *  output = "Core\EntityBundle\Entity\",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="EmailTemplate ID"
     *      }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getAction($id)
    {
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->find($id);
        if (!$emailTemplate) {
            throw $this->createNotFoundException("This emailtemplate was not found");
        } else {
            $view = $this->view($emailTemplate, 200);
            return $this->handleView($view);
        }
	    
    }
    
    /**
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Edit a template",
     *  output = "Core\EntityBundle\Entity\",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="EmailTemplate ID"
     *      }
     *  },requirements={
     *      {
     *          "name"="template_name",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="name of the emailtemplate"
     *      }
     *  },requirements={
     *      {
     *          "name"="email_subject",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="subject of the emailtemplate"
     *      }
     *  },requirements={
     *      {
     *          "name"="email_body",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="content of the emailtemplate"
     *      }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="template_name", requirements=".*", description="name of the emailtemplate")
     * @Rest\RequestParam(name="email_subject", requirements=".*", description="subject of the emailtemplate")
     * @Rest\RequestParam(name="email_body", requirements=".*", description="content of the emailtemplate")
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramFetcher,$id)
    {
    	$params = $paramFetcher->all();
        /** @var EmailTemplate $emailTemplate */
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->findById($id);
        if (!$emailTemplate) {
        	throw $this->createNotFoundException("No EmailTemplate found");
        }
        if($params["template_name"] != NULL)
        	$emailTemplate->setTemplateName($params["template_name"]);
        if($params["email_subject"] != Null)
        	$emailTemplate->setEmailSubject($params["email_subject"]);
        if($params["email_body"] != NULL)
        	$emailTemplate->setEmailBody($params["email_body"]);
        $this->getDoctrine()->getManager()->persist($emailTemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($emailTemplate,200);
        return $this->handleView($view);
	    
    }
    
    /**  
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Create a template",
     *  output = "Core\EntityBundle\Entity\",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found",
     *  },requirements={
     *      {
     *          "name"="template_name",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="name of the emailtemplate"
     *      }
     *  },requirements={
     *      {
     *          "name"="email_subject",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="subject of the emailtemplate"
     *      }
     *  },requirements={
     *      {
     *          "name"="email_body",
     *          "dataType"="string",
     *          "requirement"="\w+",
     *          "description"="content of the emailtemplate"
     *      }
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\RequestParam(name="template_name", requirements=".*", description="name of the emailtemplate")
     * @Rest\RequestParam(name="email_subject", requirements=".*", description="subject of the emailtemplate")
     * @Rest\RequestParam(name="email_body", requirements=".*", description="content of the emailtemplate")
     * @Rest\View()
     */
    public function putAction(ParamFetcher $paramFetcher)
    { 	$emailTemplate = new EmailTemplate ();
    	$params = $paramFetcher->all();
    	if($params["template_name"] != NULL)
        	$emailTemplate->setTemplateName($params["template_name"]);
        if($params["email_subject"] != Null)
        	$emailTemplate->setEmailSubject($params["email_subject"]);
        if($params["email_body"] != NULL)
        	$emailTemplate->setEmailBody($params["email_body"]);
    	$this->getDoctrine()->getManager()->persist($emailTemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($emailTemplate,200);
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
     *          "description"="EmailTemplate ID"
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
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->find($id);
        if (!$emailTemplate) {
            throw $this->createNotFoundException("EmailTemplate not found");
        }
        $this->getDoctrine()->getManager()->remove($emailTemplate);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_NO_CONTENT);
	    
    }
}
