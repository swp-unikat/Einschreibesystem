<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 05/05/16
 * Time: 12:23
 */
namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\Participants;

class loadParticipantsData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager){
        $participant = new Participants();
        $participant->setName("Max");
        $participant->setSurname("Maier");
        $participant->setEmail("max.maier@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Malte");
        $participant->setSurname("Mayer");
        $participant->setEmail("malte.mayer@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Max");
        $participant->setSurname("Mustermann");
        $participant->setEmail("max.mustermann@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Maximiliane");
        $participant->setSurname("Musterfrau");
        $participant->setEmail("Maximiliane.musterfrau@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Jane");
        $participant->setSurname("Dow");
        $participant->setEmail("jane.doe@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Maximiliane");
        $participant->setSurname("Musterfrau");
        $participant->setEmail("Maximiliane.musterfrau@exampl.de");
        $manager->persist($participant);

        $participant = new Participants();
        $participant->setName("Erika");
        $participant->setSurname("Musterfrau");
        $participant->setEmail("erika.musterfrau@exampl.de");
        $manager->persist($participant);

        $manager->flush();

    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 2;
    }
}