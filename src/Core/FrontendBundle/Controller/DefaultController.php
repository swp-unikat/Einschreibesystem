<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 09.05.2016
 * Time: 11:47
 */

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
