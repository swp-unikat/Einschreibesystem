<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 09.05.2016
 * Time: 11:57
 */

namespace Core\EntityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('CoreEntityBundle:Default:index.html.twig');
    }
}
