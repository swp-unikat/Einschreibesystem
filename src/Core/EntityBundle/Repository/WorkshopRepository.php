<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 29.04.2016
 * Time: 16:55
 */
namespace Core\EntityBundle\Repository;

use Core\EntityBundle\Entity\Workshop;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;

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

    public function getAllWorkshops()
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $oDate = new \DateTime('now');

        $q = $qb->select(array('workshop'))
            ->from('CoreEntityBundle:Workshop', 'workshop')
            ->orderBy('workshop.start_at', 'ASC');
        $q->setParameter('now', $oDate);
        $result = $q->getQuery()->getResult();
        if (!$result) {
            return false;
        } else {
            return $result;
        }
    }

    public function getParticipants($workshopId){
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $q = $qb->select(["count(wt.id)"])->from("CoreEntityBundle:WorkshopParticipants","wt")->where("wt.workshop = ?1");
        $q->setParameter(1,$workshopId);
        $result = $q->getQuery()->getResult();
        return $result;

    }

    public function getWorkshopsForNotificationEmail(){
        $now = new \DateTime("now");
        $qb = $this->getEntityManager()->createQueryBuilder();
        $q  = $qb->select(["workshop.id"])
                 ->from("CoreEntityBundle:Workshop","workshop")
                 ->where("workshop.notified = 0 and workshop.start_at < ?1");
        $q->setParameter(1,$now);
        $result = $q->getQuery()->getResult();
        return $result;
    }

}
