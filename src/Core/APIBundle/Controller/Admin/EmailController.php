<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Authors: Leon Bergmann 
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
 */

class EmailController extends FOSRestController implements ClassResourceInterface
{
	/**
     * @ApiDoc(
     *  resource=true,
     *  description="Send E-Mail to workshop participants",
     *  output = "Core\EntityBundle\Entity\Participants",
     *  statusCodes = {
     *      200 = "Returned when successful",
     *      404 = "Returned when the data is not found"
     *  },requirements={
     *      {
     *          "name"="workshopId",
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
    public function sendAction($workshopId)
    {
	    $workshopParticipants = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->findBy(['workshop'=> $workshopId]);

    }

    public function notifyAction($workshopId){
        
    }
}
