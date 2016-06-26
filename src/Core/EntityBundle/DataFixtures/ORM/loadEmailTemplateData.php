<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Martin Griebel, Leon Bergmann, Marco Hanisch
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
     * this is the protected property manager 
     * @var ObjectManager
     * @param $manager
     */
    protected $manager;
    /**
     * function to load emailtemplate
     * @param $manager
     */
    public function load(ObjectManager $manager){
        $emailTemplate = new EmailTemplate();
        $emailTemplate->setTemplateName("Erinnerungsmail");
        $emailTemplate->setEmailSubject("Erinnerungsmail für {{workshop.title}}");
        $emailTemplate->setEmailBody("Hallo {{participant.surname}},<br> morgen um {{workshop.startAt|date('Y-m-d h:i')}} beginnt der Workshop {{workshop.title}}, für den Sie sich eingeschrieben haben!");
        $emailTemplate->setProtected(true);
        $manager->persist($emailTemplate);
        
        $emailTemplate2 = new EmailTemplate();
        $emailTemplate2->setTemplateName("Bestätigung");
        $emailTemplate2->setEmailSubject("Bestätigung der Anmeldung");
        $emailTemplate2->setEmailBody("Hallo {{participant.surname}},<br> mit folgendem Link <a href='{{url}}'>{{url}} bestätigen Sie ihre Anmeldung.");
        $emailTemplate2->setProtected(true);
        $manager->persist($emailTemplate2);
        
        $emailTemplate3 = new EmailTemplate();
        $emailTemplate3->setTemplateName("Ausfall");
        $emailTemplate3->setEmailSubject("Ausfall eines ausstehenden Workshops");
        $emailTemplate3->setEmailBody("Der Workshop in 2 Tagen kann aufgrund von Krankheit nicht stattfinden! Die Kosten bekommen Sie selbst verständlich erstattet.");
        $emailTemplate3->setProtected(true);
        $manager->persist($emailTemplate3);
        
        $emailTemplate4 = new EmailTemplate();
        $emailTemplate4->setTemplateName("Teilnahmebestätigung");
        $emailTemplate4->setEmailSubject("Teilnahmebestätigung für absolvierten Workshop");
        $emailTemplate4->setEmailBody("Im Anhang dieser Mail finden Sie eine Teilnahmebestätigung, an dem Sie erfolgreich teilgenommen haben!");
        $emailTemplate4->setProtected(true);
        $manager->persist($emailTemplate4);
        /*
             * Hier weiteres EmailTemplate anlegen
             */
            $manager->flush();
    }
}
