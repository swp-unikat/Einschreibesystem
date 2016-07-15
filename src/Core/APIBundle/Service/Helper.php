<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Date: 04.07.16
 * Time: 11:58
 */

namespace Core\APIBundle\Service;

use Doctrine\ORM\EntityManager;
use Core\EntityBundle\Entity\Workshop;
use Core\EntityBundle\Entity\Participants;
use Doctrine\ORM\Query;

class Helper
{

    /**
     * @var EntityManager
     */
    protected $em;
    /*
     * @var logger
     */
    protected $logger;
    /*
     * @var twig
     */
    protected $twig;
    /*
     * @var container
     */
    protected $container;
    /*
     *@var mailer 
     */
    protected $mailer;

    /*
     * @param Workshop $workshop
     */
    public function checkParticipantList($workshopID)
    {
        $workshop = $this->em->getRepository("CoreEntityBundle:Workshop")->find($workshopID);
        if ($workshop) {
            $this->logger->info("Workshop found");
            $participants = $this->em->getRepository("CoreEntityBundle:Workshop")->getParticipants($workshopID);
            if ($participants) {
                $this->logger->info("Workshop has participants");
                $nextParticipant = $this->getNextParticipant($workshop->getId());
                if ($nextParticipant) {
                    $this->logger->info("Workshop has participants on waiting list");
                    $nextParticipant->setWaiting(false);
                    /* Loading the default E-Mail template*/
                    $template = $this->em->getRepository("CoreEntityBundle:EmailTemplate")->findOneBy(
                        ['template_name' => 'Participant']
                    );
                    /* Creating Twig template from Database */
                    $renderTemplate = $this->twig->createTemplate($template->getEmailBody());
                    /* Sending E-Mail */

                    $message = \Swift_Message::newInstance()
                        ->setSubject(
                            $this->twig->createTemplate($template->getEmailSubject())->render(
                                ["workshop" => $nextParticipant->getWorkshop()]
                            )
                        )
                        ->setFrom($this->container->getParameter('email_sender'))
                        ->setTo($nextParticipant->getParticipant()->getEmail())
                        ->setBody(
                            $renderTemplate->render(
                                [
                                    'participant' => $nextParticipant->getParticipant(),
                                    'workshop'    => $nextParticipant->getWorkshop()
                                ]
                            ),
                            'text/html'
                        );
                    $this->mailer->send($message);

                    $this->em->persist($nextParticipant);
                    $this->em->flush();
                    $this->logger->info(
                        "moved " . $nextParticipant->getParticipant()->getEmail() . " to participant list"
                    );
                    return true;
                }
            }
        } else {
            $this->logger->info("Workshop not found");
            return false;
        }
    }


    private function getNextParticipant($id)
    {
        $participant = $this->em->getRepository('CoreEntityBundle:WorkshopParticipants')->findOneBy(
            ['workshop' => $id, 'waiting' => true],
            ['enrollment' => "ASC"]
        );
        if ($participant) {
            return $participant;
        } else {
            return false;
        }
    }

    /**
     * @param $entitymanager
     */
    public function setEntityManager($entitymanager)
    {
        $this->em = $entitymanager;
    }

    public function setLogger($logger)
    {
        $this->logger = $logger;
    }

    public function setTwig($twig)
    {
        $this->twig = $twig;
    }

    public function setContainer($container)
    {
        $this->container = $container;
    }

    public function setMailer($mailer)
    {
        $this->mailer = $mailer;
    }
}