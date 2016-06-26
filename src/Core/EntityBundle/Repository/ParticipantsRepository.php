<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Martin Griebel, Marco Hanisch
 * Date: 23.05.2016
 * Time: 13:54
 */

namespace Core\EntityBundle\Repository;

use Core\EntityBundle\Entity\Workshop;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;
/**
 * this class provide the method to get all blacklisted participants
 */
class ParticipantsRepository extends EntityRepository
{
    /**
     * function to get all blacklisted participants
     */
    public function getAllBlacklistedParticipants(){
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();

        $q = $qb->select(array('p'))
            ->from('CoreEntityBundle:Participants', 'p')
            ->where(
                $qb->expr()->eq('p.blacklisted', '1')
            )
            ->orderBy('p.email', 'ASC');

        $result = $q->getQuery()->getResult();
        if (!$result) {
            return false;
        } else {
            return $result;
        }
    }
}
