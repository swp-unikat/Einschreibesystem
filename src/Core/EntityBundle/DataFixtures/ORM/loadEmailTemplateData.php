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
/**
 * Class to load Emailtemplate
 */
class loadEmailTemplate implements FixtureInterface
{
    /**
     * 
     * @var ObjectManager
     * @param $manager
     */
    protected $manager;
    /**
     * function to load emailtemplate
     */
    public function load(ObjectManager $manager){
    $emailtemplate = new EmailTemplate();
    $emailtemplate->setTemplateName("Erinnerungsmail");
    $emailtemplate->setEmailSubject("Erinnerungsmail für {{workshop.title}}");
    $emailtemplate->setEmailBody("Hallo {{participant.surname}},<br> morgen um {{workshop.startAt|date('Y-m-d h:i')}} beginnt der Workshop {{workshop.title}}, für den Sie sich eingeschrieben haben!");
    $manager->persist($emailtemplate);
    
    $emailtemplate2 = new EmailTemplate();
    $emailtemplate2->setTemplateName("Bestätigung");
    $emailtemplate2->setEmailSubject("Bestätigung der Anmeldung");
    $emailtemplate2->setEmailBody("Hallo {{participant.surname}},<br> mit folgendem Link <a href='{{url}}'>{{url}} bestätigen Sie ihre Anmeldung.");
    $manager->persist($emailtemplate2);
    
    $emailtemplate3 = new EmailTemplate();
    $emailtemplate3->setTemplateName("Ausfall");
    $emailtemplate3->setEmailSubject("Ausfall eines ausstehenden Workshops");
    $emailtemplate3->setEmailBody("Der Workshop in 2 Tagen kann aufgrund von Krankheit nicht stattfinden! Die Kosten bekommen Sie selbst verständlich erstattet.");
    $manager->persist($emailtemplate3);
    
    $emailtemplate4 = new EmailTemplate();
    $emailtemplate4->setTemplateName("Teilnahmebestätigung");
    $emailtemplate4->setEmailSubject("Teilnahmebestätigung für absolvierten Workshop");
    $emailtemplate4->setEmailBody("Im Anhang dieser Mail finden Sie eine Teilnahmebestätigung, an dem Sie erfolgreich teilgenommen haben!");
    $manager->persist($emailtemplate4);
    /*
         * Hier weiteres EmailTemplate anlegen
         */
        $manager->flush();
    }
}
