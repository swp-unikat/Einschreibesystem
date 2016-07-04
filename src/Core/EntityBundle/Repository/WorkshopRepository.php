<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Ahmet Durak, Marco Hanisch
 * Date: 29.04.2016
 * Time: 16:55
 */
namespace Core\EntityBundle\Repository;

use Core\EntityBundle\Entity\Workshop;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Internal\Hydration\ArrayHydrator;
use Doctrine\ORM\Query\Expr\Join;
/**
 * this class provides get functions of the workshops
 */
class WorkshopRepository extends EntityRepository
{
    /**
     * function to get all activ workshops
     */
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
        $result = $q->getQuery()->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
        if (!$result) {
            return false;
        } else {
            foreach ($result as $key=>$workshop){
                $result[$key]['numParticipants'] = $this->getParticipants($workshop['id']);
            }
            return $result;
        }
    }

    /**
     * function to get participants of a workshop
     * @param $workshopID int id of a workshop
     */
    public function getParticipants($workshopId)
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();
        $q = $qb->select(["count(wt.id)"])->from("CoreEntityBundle:WorkshopParticipants",
            "wt")->where("wt.workshop = ?1");
        $q->setParameter(1, $workshopId);
        $result = $q->getQuery()->getSingleScalarResult();
        return $result;

    }

    /**
     * function to get all workshops
     */
    public function getAllWorkshops()
    {
        $em = $this->getEntityManager();
        $qb = $em->createQueryBuilder();

        $q = $qb->select(array('workshop'))
            ->from('CoreEntityBundle:Workshop', 'workshop')
            ->orderBy('workshop.start_at', 'ASC');
        $result = $q->getQuery()->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
        if (!$result) {
            return false;
        } else {
            foreach ($result as $key => $workshop) {
                $result[$key]['numParticipants'] = $this->getParticipants($workshop['id']);
            }
            return $result;
        }
    }

    /**
     * function to find workshops where a notification e-mail is needed
     */
    public function getWorkshopsForNotificationEmail(){
        $now = new \DateTime("now");
        $then = new \DateTime("+24 hour");
        $qb = $this->getEntityManager()->createQueryBuilder();
        $q  = $qb->select(["workshop.id"])
                 ->from("CoreEntityBundle:Workshop","workshop")
            ->where("workshop.notified = 0 and date_sub(workshop.start_at,24,'hour') < ?1 and workshop.end_at > ?1");
        $q->setParameter(1,$now);
        $result = $q->getQuery()->getResult();

        return $result;
    }

}
