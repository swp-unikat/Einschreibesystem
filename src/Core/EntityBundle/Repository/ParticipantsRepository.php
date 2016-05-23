<?php
/**
 * Created by IntelliJ IDEA.
 * User: Martin Griebel
 * Date: 23.05.2016
 * Time: 13:54
 */

namespace Core\EntityBundle\Repository;

use Core\EntityBundle\Entity\Workshop;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;

class ParticipantsRepository extends EntityRepository
{

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