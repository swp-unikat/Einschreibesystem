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
    public function load(ObjectManager $manager){
        $workshop = new Workshop();
        $workshop->setTitle("Grundlagen Löten Level 0 - MitarbeiterSpecial ");
        $workshop->setCost(10.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(12);
        $workshop->setEndAt(strtotime("23.05.2016 21:00:00"));
        $workshop->setStartAt(strtotime("23.05.2016 19:00:00"));
        $workshop->setRequirements("");
        $workshop->setDescription("In unserem Level 0 Lötworkshop vermitteln wir alle nötigen Grundlagen zum Umgang mit dem Lötkolben. Dabei erklären wir, worauf es beim Löten ankommt, geben Tipps und helfen die Unsicherheit vieler Anfänger zu nehmen. Dieser Workshop richtet sich an jeden interessierten Mitarbeiter aller Fakultäten und Verwaltungen der TU Ilmenau.");
        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setTitle("Optische Pulsmessung Level 1");
        $workshop->setCost(4.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(5);
        $workshop->setEndAt(strtotime("20.05.2016 21:00:00"));
        $workshop->setStartAt(strtotime("20.05.2016 19:00:00"));
        $workshop->setRequirements("Wenn möglich, bitte eine Wäscheklammer mitbringen!");
        $workshop->setDescription("In diesem Workshop bekommst du die Möglichkeit, dir deinen eigenen optischen Pulsmesser zu bauen. Du lernst, wie man eine typische Signalkette mit Sensorik und Verstärkung aufbaut, grundlegende Filterschaltungen und wie eigentlich Operationsverstärker wirklich aussehen. Am Ende des Workshops hast du deinen eigenen Fitnessclip in der Hand, welcher rein analog mit Hilfe einer LED deinen Puls anzeigt.");
        $manager->persist($workshop);

        $workshop = new Workshop();
        $workshop->setTitle("Optische Pulsmessung Level 2");
        $workshop->setCost(10.00);
        $workshop->setLocation("Haus M, Raum 606");
        $workshop->setMaxParticipants(5);
        $workshop->setEndAt(strtotime("27.05.2016 21:00:00"));
        $workshop->setStartAt(strtotime("27.05.2016 19:00:00"));
        $workshop->setRequirements("Wenn möglich, bitte eine Wäscheklammer mitbringen!");
        $workshop->setDescription("In diesem Workshop bekommst du die Möglichkeit, dir deinen eigenen optischen Pulsmesser zu bauen. Du lernst, wie man eine typische Signalkette mit Sensorik und Verstärkung aufbaut, grundlegende Filterschaltungen und wie eigentlich Operationsverstärker wirklich aussehen. Am Ende des Workshops hast du deinen eigenen Fitnessclip in der Hand, welcher rein analog mit Hilfe einer LED deinen Puls anzeigt.");
        $manager->persist($workshop);

        $manager->flush();

    }
    
    public function getOrder()
    {
        // the order in which fixtures will be loaded
        // the lower the number, the sooner that this fixture is loaded
        return 1;
    }
}