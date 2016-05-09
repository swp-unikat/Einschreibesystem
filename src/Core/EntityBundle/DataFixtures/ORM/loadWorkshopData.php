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
        $workshop2 = new Workshop();
        $workshop2->setTitle("Test Ardunio Lv0");
        $workshop2->setCost(1);
        $workshop2->setLocation("Haus M 608");
        $workshop2->setMaxParticipants(20);
        $workshop2->setEndAt(new \DateTime("+4 Day"));
        $workshop2->setStartAt(new \DateTime("+3 Day"));
        $workshop2->setRequirements("Laptop");
        $workshop2->setDescription("Arduino ist einfacher aber leistungsstarker Microcontroller. Für Studenten, Künstler, Designer und Hobbyisten entworfen, ist dieses OpenSource Projekt eine super Möglichkeit in die Hardwareprogrammierung einzusteigen!");
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
        $manager->persist($workshop3);
        /*
         * Hier weitere Workshops anlegen
         */
        $manager->flush();

    }
}
