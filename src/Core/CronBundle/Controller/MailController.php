<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Marco Hanisch
 * Date: 25.05.16
 * Time: 09:24
 */

namespace Core\CronBundle\Controller;

use Symfony\Bridge\Monolog\Handler\SwiftMailerHandler;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Core\EntityBundle\Entity\Workshop;
use Core\EntityBundle\Repository\WorkshopRepository;
use Core\EntityBundle\Entity\EmailTemplate;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\MonologBundle\MonologBundle;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class to load E-Mail Template and send E-Mail
 */
class MailController extends Controller{

    protected $em;
    protected $twig;
    protected $logger;
    protected $mailer;
    protected $container;

    public function __construct(EntityManager $em, $twig, $logger, $mailer,$container)
    {
        $this->em		    = $em;
        $this->twig		    = $twig;
        $this->logger	    = $logger;
        $this->mailer  	    = $mailer;
        $this->container    = $container;
    }

    /**
     * function to load participants of a workshop
     */
    public function run(){
        $count = 0;
        /* Load Workshops to get notified*/
        $workshops = $this->em->getRepository("CoreEntityBundle:Workshop")->getWorkshopsForNotificationEmail();
        if(!$workshops){
            $this->logger->info("No Workshops to notify.");
            return $count;
        }

        foreach ($workshops as $id) {
            /* Load Workshop object */
            $workshop = $this->em->getRepository("CoreEntityBundle:Workshop")->find($id['id']);
            /* Load Workshop Participants*/
            $participants = $this->em->getRepository("CoreEntityBundle:WorkshopParticipants")->findBy(['workshop' => $workshop, "waiting" => false]);
            if($participants){
                $count += $this->sendMail($participants,$workshop);
                $workshop->setNotified(true);
                $this->em->persist($workshop);
                $this->logger->info("Notified ".$count." participants of workshop: ".$workshop->getTitle());
            }else{
                $this->logger->info("No participants to notify for workshop: ".$workshop->getTitle());
            }
        }
        $this->em->flush();
        return $count;
    }
    /**
     * function to send a E-Mail to participants of a workshop
     * @param $participants array participant
     * @param $workshop Workshop workshop
     * @return int
     */
    protected function sendMail($participants,$workshop){
        $counter = 0;
        /* Loading the default E-Mail template*/
        $template = $this->em->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(['template_name' => 'Reminder']);
        if(!$template){
            $this->logger->error("E-Mail Template not found");
            return 0;
        }
        /* Creating Twig template from Database */
        $renderTemplate = $this->twig->createTemplate($template->getEmailBody());
        foreach ($participants as $wp){
            /* Sending E-Mail */
            $message = \Swift_Message::newInstance()
                ->setSubject($this->get('twig')->createTemplate($template->getEmailSubject())->render(["workshop" => $workshop]))
                ->setFrom($this->container->getParameter('email_sender'))
                ->setTo($wp->getParticipant()->getEmail())
                ->setBody($renderTemplate->render(["workshop" => $workshop,"participant" => $wp->getParticipant()]),'text/html');
            $this->mailer->send($message);
            $counter++;
        }
        return $counter;
    }
}
