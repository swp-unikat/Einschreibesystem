<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 25.05.16
 * Time: 09:24
 */

namespace Core\CronBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Core\EntityBundle\Entity\Workshop;
use Core\EntityBundle\Repository\WorkshopRepository;
use Core\EntityBundle\Entity\EmailTemplate;

class MailController extends Controller{
    /**
     *
     */
    public function run(){
        $count = 0;
        /* Load Workshops to get notified*/
        $workshops = $this->getDoctrine()->getRepository("CoreEntityBundle:Workshop")->getWorkshopsForNotificationEmail();
        foreach ($workshops as $id) {
            /* Load Workshop object */
            $workshop = $this->getDoctrine()->getRepository("CoreEntityBundle:Workshop")->find($id['id']);
            /* Load Workshop Participants*/
            $participants = $this->getDoctrine()->getRepository("CoreEntityBundle:Workshop")->getParticipants($workshop->getId());
            $count += $this->sendMail($participants,$workshop);
            $workshop->setNotified(true);
        }

        return $count;
    }

    protected function sendMail($participants,$workshop){
        $counter = 0;
        /* Loading the default E-Mail template*/
        $template = $this->getDoctrine()->getRepository("CoreEntityBundle:EmailTemplate")->find(1);
        /* Creating Twig template from Database */
        $renderTemplate = $this->get('twig')->createTemplate($template->getEmailBody());
        foreach ($participants as $participant){
            /* Sending E-Mail */
            $message = \Swift_Message::newInstance()
                ->setSubject($template->getEmailSubject())
                ->setFrom('send@example.com')
                ->setTo($participant['email'])
                ->setBody($renderTemplate->render(["workshop" => $workshop,"participant" => $participant]),'text/html');
            $this->get('mailer')->send($message);
            $counter++;
        }
        return $counter;
    }
}