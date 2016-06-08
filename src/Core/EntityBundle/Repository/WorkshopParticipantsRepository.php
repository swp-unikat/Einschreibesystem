<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 03.05.2016
 * Time: 14:06
 */

namespace Core\EntityBundle\Repository;


use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class WorkshopParticipantsRepository extends EntityRepository
{
    public function findById($workshopId, $participantId)
    {
        $workshopParticipant = $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->findBy([
            'workshop' => $workshopId,
            'participant' => $participantId
        ]);
        return $this->getDoctrine()->getManager()->getRepository("CoreEntityBundle:WorkshopParticipants")->find($workshopParticipant['id']);
    }
}