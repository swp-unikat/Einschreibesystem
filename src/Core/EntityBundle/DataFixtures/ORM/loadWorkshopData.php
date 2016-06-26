<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 05/05/16
 * Time: 12:22
 */

namespace Core\EntityBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\Workshop;
/**
 * this class provides method to load workshopdata
 */
class loadWorkshopData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @var ObjectManager
     */
    protected $manager;
    /**
     * function to load workshopdata
     */
    public function load(ObjectManager $manager){
        $workshop = new Workshop();
        $workshop->setTitle("Grundlagen Löten Level 0 - MitarbeiterSpecial ");
        $workshop->setCost(10.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(12);
        $workshop->setEndAt(new \DateTime("+17 Day"));
        $workshop->setStartAt(new \DateTime("19 Day"));
        $workshop->setRequirements("");
        $workshop->setDescription("In unserem Level 0 Lötworkshop vermitteln wir alle nötigen Grundlagen zum Umgang mit dem Lötkolben. Dabei erklären wir, worauf es beim Löten ankommt, geben Tipps und helfen die Unsicherheit vieler Anfänger zu nehmen. Dieser Workshop richtet sich an jeden interessierten Mitarbeiter aller Fakultäten und Verwaltungen der TU Ilmenau.");
        $workshop->setNotified(0);
        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setTitle("Optische Pulsmessung Level 1");
        $workshop->setCost(4.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(5);
        $workshop->setEndAt(new \DateTime("+10 Day"));
        $workshop->setStartAt(new \DateTime("11 Day"));
        $workshop->setRequirements("Wenn möglich, bitte eine Wäscheklammer mitbringen!");
        $workshop->setDescription("In diesem Workshop bekommst du die Möglichkeit, dir deinen eigenen optischen Pulsmesser zu bauen. Du lernst, wie man eine typische Signalkette mit Sensorik und Verstärkung aufbaut, grundlegende Filterschaltungen und wie eigentlich Operationsverstärker wirklich aussehen. Am Ende des Workshops hast du deinen eigenen Fitnessclip in der Hand, welcher rein analog mit Hilfe einer LED deinen Puls anzeigt.");
        $workshop->setNotified(0);
        $manager->persist($workshop);

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
        $workshop3->setNotified(0);
        $manager->persist($workshop3);


        $manager->flush();

    }
    /**
     * function to get order to load
     */
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
}
