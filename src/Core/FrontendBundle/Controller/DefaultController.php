<?php

namespace Core\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/{angular}")
     */
    public function indexAction()
    {
        return $this->render('CoreFrontendBundle:Default:index.html.twig');
    }
}
