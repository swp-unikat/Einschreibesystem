<?php
/**
 * Created by IntelliJ IDEA.
 * User: lepm
 * Date: 05/05/16
 * Time: 12:22
 */

namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\Workshop;

class loadWorkshopData implements FixtureInterface
{
    public function load(ObjectManager $manager){
        $workshop = new Workshop();
        $workshop->setTitle("Test Nr. 1");
        $workshop->setCost(45.50);
        $workshop->setLocation("Audimax");
        $workshop->setMaxParticipants(300);
        $workshop->setEndAt(new \DateTime("+10 Day"));
        $workshop->setStartAt(new \DateTime("+9 Day"));
        $workshop->setRequirements("Lötkolben");
        $workshop->setDescription("Workshop für xYz");
        $manager->persist($workshop);
        /*
         * Hier weitere Workshops anlegen
         */
        $manager->flush();

    }
}