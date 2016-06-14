<?php

namespace Core\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
/**
 * This is the default controller which renders the base template an delivers the angularJS app.
 */
class DefaultController extends Controller
{
    /**
     * Default funktion to render the base template
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('CoreFrontendBundle:Default:index.html.twig');
    }
}
