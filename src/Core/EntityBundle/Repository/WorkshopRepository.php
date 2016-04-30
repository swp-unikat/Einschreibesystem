<?php
/**
 * Created by IntelliJ IDEA.
 * User: admin
 * Date: 29.04.2016
 * Time: 16:55
 */
namespace Core\EntityBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\Query;

class WorkshopRepository extends EntityRepository
{

    public function getAllActiveWorkshops()
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $oDate = new \DateTime('now');

        $q = $qb->select(array('workshop'))
            ->from('CoreEntityBundle:Workshop', 'workshop')
            ->where(
                $qb->expr()->gt('workshop.start_at', ':now')
            )
            ->orderBy('workshop.start_at', 'ASC');
        $q->setParameter('now', $oDate);
        $result = $q->getQuery()->getResult();
        if (!$result) {
            return false;
        } else {
            return $result;
        }
    }
}