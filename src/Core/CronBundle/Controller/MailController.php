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

/**
 * Class to load E-Mail Template and send E-Mail
 */
class MailController extends Controller{

    protected $em;
    protected $twig;
    protected $logger;
    protected $mailer;

    public function __construct(EntityManager $em,\Twig_Extension $twig,MonologBundle $logger,\Swift_Mailer $mailer)
    {
        $this->em		= $em;
        $this->twig		= $twig;
        $this->logger	= $logger;
        $this->mailer  	= $mailer;
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
            return 0;
        }
        foreach ($workshops as $id) {
            /* Load Workshop object */
            $workshop = $this->em->getRepository("CoreEntityBundle:Workshop")->find($id['id']);
            /* Load Workshop Participants*/
            $participants = $this->em->getRepository("CoreEntityBundle:Workshop")->getParticipants($workshop->getId());
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
        $template = $this->em->getRepository("CoreEntityBundle:EmailTemplate")->find(1);
        /* Creating Twig template from Database */
        $renderTemplate = $this->twig->createTemplate($template->getEmailBody());
        foreach ($participants as $participant){
            /* Sending E-Mail */
            $message = \Swift_Message::newInstance()
                ->setSubject($template->getEmailSubject())
                ->setFrom($this->getParameter('email_sender'))
                ->setTo($participant['email'])
                ->setBody($renderTemplate->render(["workshop" => $workshop,"participant" => $participant]),'text/html');
            $this->mailer->send($message);
            $counter++;
        }
        return $counter;
    }
}
