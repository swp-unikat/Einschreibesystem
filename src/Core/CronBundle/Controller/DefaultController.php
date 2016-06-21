<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 09.05.2016
 * Time: 11:20
 */

namespace Core\CronBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
/**
 * class for default
 */
class DefaultController extends Controller
{
    /**
     * function of defaultcontroller
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('CoreCronBundle:Default:index.html.twig');
    }
}
