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
    	$emailtemplateRepo = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate');
    	$entits = $emailtemplateRepo->getAllEmailTemplates();
        if (!$entits) {
            throw $this->createNotFoundException("No emailtemplate was not found");
        } else {
            $view = $this->view($emailtemplate, 200);
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
     *  }
     * )
     * )
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @Rest\View()
     */
    public function getAction($id)
    {$emailtemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->find($id);
        if (!$emailtemplate) {
            throw $this->createNotFoundException("This emailtemplate was not found");
        } else {
            $view = $this->view($emailtemplate, 200);
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
    public function patchAction($id)
    {
    	$params = $paramFetcher->all();
    	$emailtemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->findById($id);
        if (!$emailtemplate) {
        	throw $this->createNotFoundException("No EmailTemplate found");
        }
        if($params["template_name"] != NULL)
        	$emailtemplate->getTemplate_Name($params["template_name"]);
        if($params["email_subject"] != Null)
        	$emailtemplate->getEmail_Subject($params["email_subject"]);
        if($params["email_body"] != NULL
        	$enailtemplate->getEmail_Body($params["email_body"]);
        $this->getDoctrine()->getManager()->persist($emailtemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($emailtemplate,200);
        return $this->handleView($view);
	    
    }
    
    /**  
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Edit template",
     *  output = "Core\EntityBundle\Entity\",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
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
    public function putAction($id)
    { 	$emailtemplate = new EmailTemplate ();
    	$params = $paramFetcher->all();
    	$emailtemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate')->find($id);
    	$emailtemplate->setTemplate_Name($params["template_name"]);
    	$emailtemplate->setEmail_Subject($params["email_subject"]);
    	$emailtemplate->setEmail_Body($params["email_body"]);
    	$this->getDoctrine()->getManager()->persist($emailtemplate);
        $this->getDoctrine()->getManager()->flush();
        $view = $this->view($emailtemplate,200);
        return $this->handleView($view);
	    
    }
    
    /**	 
     * @ApiDoc(
     *  resource=true,
     *  description="Create a template",
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
        $emailtemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->find($id);
        if (!$emailtemplate) {
            throw $this->createNotFoundException("EmailTemplate not found");
        }
        $this->getDoctrine()->getManager()->remove($emailtemplate);
        $this->getDoctrine()->getManager()->flush($emailtemplate);
        return View::create(null, Codes::HTTP_NO_CONTENT);
	    
    }
}
