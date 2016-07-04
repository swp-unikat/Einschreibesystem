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
use Core\EntityBundle\Entity\EmailTemplate;
/**
 * Class RestController.
 * This class provides get, patch, create and delete actions for e-mailtemplates
 * @Rest\RouteResource("Template")
 */

class EmailTemplateController extends FOSRestController implements ClassResourceInterface
{
	/**
	 * returns list of all e-mailtemplates
     * @ApiDoc(
     *  resource=true,
     *  description="Returns list of all templates",
     *  output = "Core\EntityBundle\Entity\EmailTemplate",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @return array give the list of all emailtemplates
     * @Rest\View()
     */
    public function getListAction()
    {
    	$emailTemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->findAll();
    	if (!$emailTemplate) {
            return $this->handleView($this->view(['code' => 404,'message' => "No EmailTemplate found"], 404));
        } else {
            $view = $this->view($emailTemplate, 200);
            return $this->handleView($view);
        }
	    
    }
    
    	/**
    	 * load a e-mailtemplate
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
     * @param integer $id id of the emailtemplate
     * @return array information of a emailtemplate
     * @var Emailtemplate $emailTemplate 
     * @Rest\View()
     */
    public function getAction($id)
    {
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->find($id);
        if (!$emailTemplate) {
            return $this->handleView($this->view(['code' => 404,'message' => "EmailTemplate not found"], 404));
        } else {
            $view = $this->view($emailTemplate, 200);
            return $this->handleView($view);
        }
	    
    }
    
    /**
     * edit a e-mailtemplate
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
     * @Rest\RequestParam(name="template_name", requirements=".*", description="name of the emailtemplate",default=null,nullable=true)
     * @Rest\RequestParam(name="email_subject", requirements=".*", description="subject of the emailtemplate",default=null,nullable=true)
     * @Rest\RequestParam(name="email_body", requirements=".*", description="content of the emailtemplate",default=null,nullable=true)
     * @param integer  $id id of the emailtemplate
     * @param string  $template_name name of the emailtemplate
     * @param string  $email_subject subject of the emailtemplate
     * @param string  $email_body content of the emailtemplate
     * @Rest\View()
     */
    public function patchAction(ParamFetcher $paramFetcher,$id)
    {
    	$params = $paramFetcher->all();
        /** @var EmailTemplate $emailTemplate */
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->find($id);
        if (!$emailTemplate) {
            return $this->handleView($this->view(['code' => 404,'message' => "No EmailTemplate found."], 404));
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
     * create a email-template
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
     * @var Emailtemplate $emailTemplate
     * @Rest\RequestParam(name="template_name", requirements=".*", description="name of the emailtemplate")
     * @Rest\RequestParam(name="email_subject", requirements=".*", description="subject of the emailtemplate")
     * @Rest\RequestParam(name="email_body", requirements=".*", description="content of the emailtemplate")
     * @param string  $template_name name of the emailtemplate
     * @param string  $email_subject subject of the emailtemplate
     * @param string  $email_body content of the emailtemplate
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
     * delete a e-mailtemplate
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
     * @var Emailtemplate $emailTemplate
     * @param integer[] $id id of a emailtemplate
     * @Rest\View()
     */
    public function deleteAction($id)
    {
        $emailTemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->find($id);
        if (!$emailTemplate) {
            return $this->handleView($this->view(['code' => 404,'message' => "EmailTemplate not found"], 404));
        }

        if($emailTemplate->isProtected()){
            return $this->handleView($this->view(['code' => 403,'message' => "This template ist protected."], 403));
        }

        $this->getDoctrine()->getManager()->remove($emailTemplate);
        $this->getDoctrine()->getManager()->flush();
        return View::create(null, Codes::HTTP_OK);
	    
    }
}
