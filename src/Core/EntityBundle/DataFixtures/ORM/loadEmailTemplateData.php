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
        $emailTemplate->setEmailBody("Hallo {{participant.surname}},<br> morgen um {{workshop.startAt|date('Y-m-d h:i')}} beginnt der Workshop {{workshop.title}}, für welchen Sie sich eingeschrieben haben! <br> <br> Hello{{participant.surname}},<br>  the workshop {{workshop.title}} ,you enrolled for, will start tomorrow at {{workshop.startAt|date('Y-m-d h:i')}}! ");
        $emailTemplate->setProtected(true);
        $manager->persist($emailTemplate);
        
        $emailTemplate2 = new EmailTemplate();
        $emailTemplate2->setTemplateName("Invitation");
        $emailTemplate2->setEmailSubject("We invite you to be a part of our team");
        $emailTemplate2->setEmailBody("Hello {{email},<br> we would be pleas it you be a part of our team pleas follow the link below. <br> <a href='{{url}}'>{{url}}</a> <br> <br> Hallo {{email},<br> wir würden uns freuen, wenn du Teil unseres Team wirst, folge dafür den nachfolgenden Link. <br> <a href='{{url}}'>{{url}}</a>");
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
