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

class Helper{

    /**
     * @var EntityManager
     */
    protected $em;

    /*
     * @param Workshop $workshop
     */
    public function checkParticipantList($workshopID){
        $workshop = $this->em->getRepository("CoreEntityBundle:Workshop")->find($workshopID);
        if($workshop){
            $participant = $this->em->getRepository("CoreEntityBundle:Workshop")->getParticipants($workshopID);
            if($participant) {
                if ($participant < $workshop->getMaxParticipants()) {
                    $nextParticipant = $this->getNextParticipant($workshop->getId());
                    if ($nextParticipant) {
                        $nextParticipant->setWaiting(false);
                        $this->em->persist($nextParticipant);
                        $this->em->flush();
                        return true;
                    }
                }
            }
        }else{
            return false;
        }
    }


    private function getNextParticipant($id)
    {
        $participant = $this->em->getRepository('CoreEntityBundle:WorkshopParticipants')->findOneBy(['workshop' => $id,'waiting' => true],['enrollment' => "ASC"]);
        if($participant){
            return $participant;
        }else{
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

}