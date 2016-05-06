<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Date: 05/05/16
 * Time: 12:23
 */
namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\Participants;

class loadParticipantsData implements FixtureInterface
{
    public function load(ObjectManager $manager){
        $participant = new Participants();
        $participant->setName("Bergmann");
        $participant->setSurname("Leon");
        $participant->setEmail("leon.bergmann@tu-ilmenau.de");
        $manager->persist($participant);
        /*
         * Hier weitere Teilneher anlegen
         */
        $manager->flush();

    }
}