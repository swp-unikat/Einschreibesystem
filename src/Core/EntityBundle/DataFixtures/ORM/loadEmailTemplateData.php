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
        $emailTemplate->setTemplateName("Reminder");
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
        $emailTemplate3->setTemplateName("Reset Password");
        $emailTemplate3->setEmailSubject("Reset password instructions");
        $emailTemplate3->setEmailBody("Hello {{email}},<br> pleas follow this <a href=\"{{url}}\">link</a> to reset your password.");
        $emailTemplate3->setProtected(true);
        $manager->persist($emailTemplate3);
        
        $emailTemplate4 = new EmailTemplate();
        $emailTemplate4->setTemplateName("Enrollment");
        $emailTemplate4->setEmailSubject("Confirm your enrollment for {{workshop.title}}");
        $emailTemplate4->setEmailBody("Hello {{participant.surname}},<br>   confirm your enrollment at {{workshop.title}} within 30 Minutes.<br> <a href='{{url}}'>{{url}}</a> <br>");
        $emailTemplate4->setProtected(true);
        $manager->persist($emailTemplate4);

        $emailTemplate5 = new EmailTemplate();
        $emailTemplate5->setTemplateName("Workshop Cancel");
        $emailTemplate5->setEmailSubject("The workshop {{workshop.title}} at {{workshop.start_at}} was canceld");
        $emailTemplate5->setEmailBody("<p>Hello {{participant.surname}},<br/><br/></p><p>regrettably the workshop {{workshop.title}} was canceld.Your Team.</p>");
        $emailTemplate5->setProtected(true);
        $manager->persist($emailTemplate5);

        $emailTemplate6 = new EmailTemplate();
        $emailTemplate6->setTemplateName("Blacklisting");
        $emailTemplate6->setEmailSubject("Your account was closed");
        $emailTemplate6->setEmailBody("<p>Hallo {{participant.name}} {{participant.surname}},</p><p>du wurdest von einem Administrator auf die Blacklist gesetzt und dadurch von allen Workshops abgemeldet.</p><p>Bei Fragen wende dich bitte an die Administratoren.<br/></p>");
        $emailTemplate6->setProtected(true);
        $manager->persist($emailTemplate6);

        $emailTemplate7 = new EmailTemplate();
        $emailTemplate7->setTemplateName("Changed Workshopdetails");
        $emailTemplate7->setEmailSubject("Details of {{workshop.title}} are changed");
        $emailTemplate7->setEmailBody("<p>Hallo {{participant.surname}},</p><p>die Details des Workshop {{workshop.title}} haben sich geändert. <br/></p><p>Bitte informiere dich auf der Website von UNIKAT über die aktuellen Details.<br/><br/><br/></p>");
        $emailTemplate7->setProtected(true);
        $manager->persist($emailTemplate7);

        $emailTemplate8 = new EmailTemplate();
        $emailTemplate8->setTemplateName("Blacklistremoved");
        $emailTemplate8->setEmailSubject("Removed from Blacklist");
        $emailTemplate8->setEmailBody("<p>Hello {{participant.name}} {{participant.surname}},</p><p><!--EndFragment-->you are not longer at the Blacklist. Now you could take part at our Workshops.<br/><br/></p>");
        $emailTemplate8->setProtected(true);
        $manager->persist($emailTemplate8);

        $manager->flush();
    }
}
