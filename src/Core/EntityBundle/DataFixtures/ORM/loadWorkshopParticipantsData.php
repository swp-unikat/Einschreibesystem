<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 07.05.16
 * Time: 19:51
 */

namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\WorkshopParticipants;


class loadWorkshopParticipantsData extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * @var ObjectManager
     */
    protected $manager;

    public function load(ObjectManager $manager){
        $this->loadDataForWorkshop1($manager);
        $this->loadDataForWorkshop2($manager);
    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 99;
    }

    private function loadDataForWorkshop1(ObjectManager $manager){
        $wp = new WorkshopParticipants();
        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(1));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(1));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $wp = new WorkshopParticipants();
        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(2));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(1));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(3));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(1));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $manager->flush();
    }

    private function loadDataForWorkshop2(ObjectManager $manager){
        $wp = new WorkshopParticipants();
        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(4));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(2));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $wp = new WorkshopParticipants();
        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(5));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(2));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $wp->setParticipant($manager->getRepository("CoreEntityBundle:Participants")->find(6));
        $wp->setWorkshop($manager->getRepository("CoreEntityBundle:Workshop")->find(2));
        $wp->setEnrollment(new \DateTime("now"));
        $wp->setWaiting(false);
        $wp->setParticipated(false);
        $manager->persist($wp);

        $manager->flush();
    }

}