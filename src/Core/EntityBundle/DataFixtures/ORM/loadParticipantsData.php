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
        $participant2 = new Participants();
        $participant2->setName("Hanisch");
        $participant2->setSurname("Marco");
        $participant2->setEmail("marco.hanisch@tu-ilmenau.de");
        $Manager->persist($participant2);
        $participant3 = new Participants();
        $participant3->setName("Griebel");
        $participant3->setSurname("Martin");
        $participant3->setEmail("martin.griebel@tu-ilmenau.de");
        $Manager->persist($participant3);
        $participant4 = new Participants();
        $participant4->setName("Durak");
        $participant4->setSurname("Ahmet");
        $participant4->setEmail("ahmet.durak@tu-ilmenau.de");
        $Manager->persist($participant4);
        $participant5 = new Participants();
        $participant5->setName("Heringklee");
        $participant5->setSurname("Stefan");
        $participant5->setEmail("stefan.heringklee@tu-ilmenau.de");
        $Manager->persist($participant5);
        $participant6 = new Participants();
        $participant6->setName("Schaefer");
        $participant6->setSurname("Valentin");
        $participant6->setEmail("valentin.schaefer@tu-ilmenau.de");
        $Manager->persist($participant6);
        /*
         * Hier weitere Teilneher anlegen
         */
        $manager->flush();

    }
}
