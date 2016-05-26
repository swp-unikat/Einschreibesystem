<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 05/05/16
 * Time: 12:22
 */

namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\Workshop;

class loadWorkshopData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @var ObjectManager
     */
    protected $manager;

    public function load(ObjectManager $manager){
        $workshop = new Workshop();
        $workshop->setTitle("Grundlagen Löten Level 0 - MitarbeiterSpecial ");
        $workshop->setCost(10.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(12);
        $workshop->setEndAt(new \DateTime("23.05.2016 21:00:00"));
        $workshop->setStartAt(new \DateTime("23.05.2016 19:00:00"));
        $workshop->setRequirements("");
        $workshop->setDescription("In unserem Level 0 Lötworkshop vermitteln wir alle nötigen Grundlagen zum Umgang mit dem Lötkolben. Dabei erklären wir, worauf es beim Löten ankommt, geben Tipps und helfen die Unsicherheit vieler Anfänger zu nehmen. Dieser Workshop richtet sich an jeden interessierten Mitarbeiter aller Fakultäten und Verwaltungen der TU Ilmenau.");
        $workshop->setNotified(0);
        $manager->persist($workshop);

        $workshop2 = new Workshop();
        $workshop2->setTitle("Optische Pulsmessung Level 1");
        $workshop2->setCost(4.00);
        $workshop2->setLocation("Haus M, Raum 606");
        $workshop2->setMaxParticipants(5);
        $workshop2->setEndAt(new \DateTime("20.05.2016 21:00:00"));
        $workshop2->setStartAt(new \DateTime("20.05.2016 19:00:00"));
        $workshop2->setRequirements("Wenn möglich, bitte eine Wäscheklammer mitbringen!");
        $workshop2->setDescription("In diesem Workshop bekommst du die Möglichkeit, dir deinen eigenen optischen Pulsmesser zu bauen. Du lernst, wie man eine typische Signalkette mit Sensorik und Verstärkung aufbaut, grundlegende Filterschaltungen und wie eigentlich Operationsverstärker wirklich aussehen. Am Ende des Workshops hast du deinen eigenen Fitnessclip in der Hand, welcher rein analog mit Hilfe einer LED deinen Puls anzeigt.");
        $workshop2->setNotified(0);
        $manager->persist($workshop2);

        $workshop3 = new Workshop();
        $workshop3->setTitle("Test Pneumatiksysteme");
        $workshop3->setCost(0);
        $workshop3->setLocation("Haus M 606");
        $workshop3->setMaxParticipants(10);
        $workshop3->setEndAt(new \DateTime("+6 Day"));
        $workshop3->setStartAt(new \DateTime("+4 Day"));
        $workshop3->setRequirements("keine");
        $workshop3->setDescription("Inhalte:
    Einführung in die pneumatischen Komponenten (Funktion und Aufbau)
    Erstellung pneumatischer Schaltpläne
    Praktische Umsetzung der erstellten Schaltpläne
    Experimenteller Teil zur Untersuchung der Effizienz von pneumatischen Schaltplänen");
        $workshop->setNotified(0);
        $manager->persist($workshop3);


        $manager->flush();

    }
    
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
}
