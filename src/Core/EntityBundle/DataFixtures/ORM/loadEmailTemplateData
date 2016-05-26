<?php
/**
 * Created by IntelliJ IDEA.
 * User: Martin Griebel
 * Date: 26/05/16
 * Time: 09:46
 */
namespace Core\EntityBundle\DataFixtures\ORM;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Core\EntityBundle\Entity\EmailTemplate;

class loadEmailTemplate implements FixtureInterface
{
 /**
     * @var ObjectManager
     */
    protected $manager;
    public function load(ObjectManager $manager){
    $emailtemplate = new EmailTemplate();
    $emailtemplate->setName("Erinnerungsmail");
    $emailtemplate->setEmailSubject("Erinnerungsmail für ausstehenden Workshop");
    $emailtemplate->setEmailBody("Zur Erinnerung: Morgen um 15 Uhr beginnt der Workshop Löten, für den Sie sich eingeschrieben haben!");
    $manager->persist($emailtemplate);
    
    $emailtemplate2 = new EmailTemplate();
    $emailtemplate2->setName("Zahlungsaufforderung");
    $emailtemplate2->setEmailSubject("Zahlungsaufforderung für Workshop");
    $emailtemplate2->setEmailBody("Sie haben bislang noch keine Zahlung für den Workshop getätigt! Wir bitten Sie dies innerhalb der nächsten 4 Tage zutun.");
    $manager->persist($emailtemplate2);
    
    $emailtemplate3 = new EmailTemplate();
    $emailtemplate3->setName("Ausfall");
    $emailtemplate3->setEmailSubject("Ausfall eines ausstehenden Workshops");
    $emailtemplate3->setEmailBody("Der Workshop in 2 Tagen kann aufgrund von Krankheit nicht stattfinden! Die Kosten bekommen Sie selbst verständlich erstattet.");
    $manager->persist($emailtemplate3);
    
    $emailtemplate4 = new EmailTemplate();
    $emailtemplate4->setName("Teilnahmebestätigung");
    $emailtemplate4->setEmailSubject("Teilnahmebestätigung für absolvierten Workshop");
    $emailtemplate4->setEmailBody("Im Anhang dieser Mail finden Sie eine Teilnahmebestätigung, an dem Sie erfolgreich teilgenommen haben!");
    $manager->persist($emailtemplate4);
    /*
         * Hier weiteres EmailTemplate anlegen
         */
        $manager->flush();
    }
}
