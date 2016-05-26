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
    /**
     * @var ObjectManager
     */
    protected $manager;
    
    public function load(ObjectManager $manager){
        $participant = new Participants();
        $participant->setName("Bergmann");
        $participant->setSurname("Leon");
        $participant->setEmail("leon.bergmann@tu-ilmenau.de");
        $participant->setBlacklisted(false);
        $manager->persist($participant);

        $participant2 = new Participants();
        $participant2->setName("Hanisch");
        $participant2->setSurname("Marco");
        $participant2->setEmail("marco.hanisch@tu-ilmenau.de");
        $participant2->setBlacklisted(false);
        $manager->persist($participant2);

        $participant3 = new Participants();
        $participant3->setName("Griebel");
        $participant3->setSurname("Martin");
        $participant3->setEmail("martin.griebel@tu-ilmenau.de");
        $participant3->setBlacklisted(false);
        $manager->persist($participant3);

        $participant4 = new Participants();
        $participant4->setName("Durak");
        $participant4->setSurname("Ahmet");
        $participant4->setEmail("ahmet.durak@tu-ilmenau.de");
        $participant4->setBlacklisted(false);
        $manager->persist($participant4);

        $participant5 = new Participants();
        $participant5->setName("Heringklee");
        $participant5->setSurname("Stefan");
        $participant5->setEmail("stefan.heringklee@tu-ilmenau.de");
        $participant5->setBlacklisted(false);
        $manager->persist($participant5);

        $participant6 = new Participants();
        $participant6->setName("Schaefer");
        $participant6->setSurname("Valentin");
        $participant6->setEmail("valentin.schaefer@tu-ilmenau.de");
        $participant6->setBlacklisted(false);
        $manager->persist($participant6);

        $participant7 = new Participants();
        $participant7->setName("von Sachsen");
        $participant7->setSurname("Albert");
        $participant7->setEmail("albertiner@t-online.de");
        $participant7->setBlacklisted(true);
        $manager->persist($participant7);

        $participant8 = new Participants();
        $participant8->setName("Mustermann");
        $participant8->setSurname("Max");
        $participant8->setEmail("max.mustermann@web.de");
        $participant8->setBlacklisted(true);
        $manager->persist($participant8);

        $participant9 = new Participants();
        $participant9->setName("Melanchthon");
        $participant9->setSurname("Phillip");
        $participant9->setEmail("phil.melanchthon@uni-wittenberg.de");
        $participant9->setBlacklisted(true);
        $manager->persist($participant9);

        $manager->flush();

    }

    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 2;
    }
}