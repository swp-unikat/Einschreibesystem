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
    {$emailtemplate = $this->getDoctrine()->getManager()->getRepository('CoreEntityBundle:EmailTemplate');
        if (!$emailtemplate) {
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
     * @Rest\View()
     */
    public function patchAction($id)
    {$emailtemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->findById($id);
        if (!$emailtemplate) {
            throw $this->createNotFoundException("No EmailTemplate found");
        }
	    
    }
    
    /**
	 
     * @ApiDoc(
     *  resource=true,
     *  description="Create new template",
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
        $emailtemplate = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:EmailTemplate")->find($id);
        if (!$emailtemplate) {
            throw $this->createNotFoundException("EmailTemplate not found");
        }
        $this->getDoctrine()->getManager()->remove($emailtemplate);
        $this->getDoctrine()->getManager()->flush($emailtemplate);
        return View::create(null, Codes::HTTP_NO_CONTENT);
	    
    }
}
