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
     *
     * @param $manager
     */
    protected $manager;

    /**
     * function to load emailtemplate
     *
     * @param $manager
     */
    public function load(ObjectManager $manager)
    {
        $emailTemplate = new EmailTemplate();
        $emailTemplate->setTemplateName("Reminder");
        $emailTemplate->setEmailSubject("Erinnerungsmail für {{workshop.title}}");
        $emailTemplate->setEmailBody(
            "<p><span style=\"color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);\">Hello {{participant.name}} {{participant.surname}},</span></p><p><span style=\"color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);\">Tomorrow at {{workshop.startAt|date('Y-m-d h:i')}} the Workshop {{workshop.title}}, you have enrolled for </span>will start!</p><p><br/><br/></p><p>Hallo <span style=\"color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);\"> {{participant.name}}</span><!--EndFragment--> {{participant.surname}},</p><p>morgen um {{workshop.startAt|date('Y-m-d h:i')}} beginnt der Workshop {{workshop.title}}, für den Sie sich eingeschrieben haben!</p>"
        );
        $emailTemplate->setProtected(true);
        $manager->persist($emailTemplate);

        $emailTemplate2 = new EmailTemplate();
        $emailTemplate2->setTemplateName("Invitation");
        $emailTemplate2->setEmailSubject("We invite you to be a part of our team");
        $emailTemplate2->setEmailBody(
            "<p>Hello {{email}},</p><p>We would be pleased if you will be a part of our team. Please follow the link below. </p><p><br/> <a href=\"{{url}}\">{{url}}</a></p><p><br/></p><p><br/></p><p>Hello {{email}},</p><p>Wir würden uns sehr freuen, wenn du ein Teil unseres Team wärst. Bitte folge dem Link unten.</p><p><br/></p><p><a href=\"{{url}}\" style=\"color: rgb(51, 122, 183);background-color: rgb(255, 255, 255);\">{{url}}</a></p><p><br/></p>"
        );
        $emailTemplate2->setProtected(true);
        $manager->persist($emailTemplate2);

        $emailTemplate3 = new EmailTemplate();
        $emailTemplate3->setTemplateName("Reset Password");
        $emailTemplate3->setEmailSubject("Reset password instructions");
        $emailTemplate3->setEmailBody(
            "<p>Hello {{email}},</p><p>Please follow this <a href=\"{{url}}\">link</a> to reset your password.</p><p><br/></p><p><br/></p><p>Hallo {{email}},</p><p>bitte klicken Sie auf den folgenden Link <a href=\"{{url}}\">link</a>, um Ihr Passwort zu erneuern.</p>"
        );
        $emailTemplate3->setProtected(true);
        $manager->persist($emailTemplate3);

        $emailTemplate4 = new EmailTemplate();
        $emailTemplate4->setTemplateName("Enrollment");
        $emailTemplate4->setEmailSubject("Confirm your enrollment for {{workshop.title}}");
        $emailTemplate4->setEmailBody(
            "<p>Hello <span style=\"color: rgb(85, 85, 85);float: none;background-color: rgb(255, 255, 255);\">{{participant.name}}</span><!--EndFragment--> {{participant.surname}},</p><p>Confirm your enrollment at {{workshop.title}} within 30 Minutes.</p><p><a href=\"{{url}}\">{{url}}</a> <br/></p><p><br/></p><p><br/></p><p><br/></p><!--StartFragment--><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hallo {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">bestätigen Sie Ihre Einschreibung bei {{workshop.title}} innerhalb der nächsten 30 Minuten.</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><a href=\"{{url}}\" style=\"color: rgb(51, 122, 183);background-color: transparent;\">{{url}}</a><span class=\"Apple-converted-space\"> </span></p><!--EndFragment--><p><br/></p><p><br/></p>"
        );
        $emailTemplate4->setProtected(true);
        $manager->persist($emailTemplate4);

        $emailTemplate5 = new EmailTemplate();
        $emailTemplate5->setTemplateName("Workshop Cancel");
        $emailTemplate5->setEmailSubject("The workshop {{workshop.title}} at {{workshop.start_at}} was canceld");
        $emailTemplate5->setEmailBody(
            "<p>Hello {{participant.name}} {{participant.surname}},</p><p>Regrettably the workshop {{workshop.title}} was canceled.</p><p>We would be pleased to see you soon in another workshop.</p><p><br/><br/><!--StartFragment--></p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hello {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">bedauerlicherweise wurde der Workshop {{workshop.title}} abgesagt.</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Wir würden uns freuen, Sie bald in einem anderen Workshop wiederzusehen.</p><p></p>"
        );
        $emailTemplate5->setProtected(true);
        $manager->persist($emailTemplate5);

        $emailTemplate6 = new EmailTemplate();
        $emailTemplate6->setTemplateName("Blacklisting");
        $emailTemplate6->setEmailSubject("Your account was closed");
        $emailTemplate6->setEmailBody(
            "<p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hallo {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><span>You were blacklisted from an Administrator and thereby you get unsubscribed from all workshops</span>. </p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">When you have any questions, please contact an Administrator. <a href=\"mailto:{{mail}}'\" style=\"color: rgb(51, 122, 183);background-color: rgb(255, 255, 255);\">{{mail}}</a><!--EndFragment--><br/><br/></p><blockquote><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><br/></p></blockquote><p><br/></p><p>Hallo {{participant.name}} {{participant.surname}},</p><p>du wurdest von einem Administrator auf die Blacklist gesetzt und dadurch von allen Workshops abgemeldet.</p><p>Bei Fragen wende dich bitte an die Administratoren. <a href=\"&mailto:{{mail}}\">{{mail}}</a></p>"
        );
        $emailTemplate6->setProtected(true);
        $manager->persist($emailTemplate6);

        $emailTemplate7 = new EmailTemplate();
        $emailTemplate7->setTemplateName("Changed Workshopdetails");
        $emailTemplate7->setEmailSubject("Details of {{workshop.title}} are changed");
        $emailTemplate7->setEmailBody(
            "<p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hello {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">The details of the workshop <a href=\"{{url}}\" style=\"color: rgb(35, 82, 124);text-decoration: underline;background-color: rgb(255, 255, 255);\">{{workshop.title}}</a> have changed.</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Please check out the site of UNIKAT for current details.</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><br/></p><p style=\"background-color: rgb(255, 255, 255);\"><br/></p><p>Hallo {{participant.name}} {{participant.surname}},</p><p>die Details des Workshops <a href=\"{{url}}\" style=\"background-color: rgb(255, 255, 255);\">{{workshop.title}}</a> haben sich geändert. </p><p>Bitte informieren Sie sich auf der Website von UNIKAT über die aktuellen Details.</p><p><br/><br/></p>"
        );
        $emailTemplate7->setProtected(true);
        $manager->persist($emailTemplate7);

        $emailTemplate8 = new EmailTemplate();
        $emailTemplate8->setTemplateName("Blacklistremoved");
        $emailTemplate8->setEmailSubject("Removed from Blacklist");
        $emailTemplate8->setEmailBody(
            "<p>Hello {{participant.name}} {{participant.surname}},</p><p>You are not longer at the Blacklist. Now you may take part at our Workshops.</p><p><br/></p><p><br/></p><p><br/></p><!--StartFragment--><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hallo {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Sie befinden sich nicht mehr auf der Blacklist und können nun wieder an unseren Workshop teilnehmen.</p><!--EndFragment--><p><br/></p><p><br/></p><p><br/><br/></p>"
        );
        $emailTemplate8->setProtected(true);
        $manager->persist($emailTemplate8);

        $emailTemplate9 = new EmailTemplate();
        $emailTemplate9->setTemplateName("Participant");
        $emailTemplate9->setEmailSubject("Welcome to the workshop {{workshop.title}}");
        $emailTemplate9->setEmailBody(
            "<p>Hello {{participant.name}} {{participant.surname}},</p><p>you are now a participant of the workshop {{workshop.title}}, which start as {{workshop.startAt|date('Y-m-d h:i')}}</p><p><br/></p><p><br/><br/><!--StartFragment--></p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">Hallo {{participant.name}} {{participant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><!--StartFragment--><span style=\"color: rgb(51, 51, 51);text-align: left;float: none;background-color: rgb(255, 255, 255);\">Sie sind jetzt ein Teilnehmer des Workshops {{workshop.title}}, er startet um {{workshop.startAt|date('Y-m-d h:i')}}</span></p><p></p>"
        );
        $emailTemplate9->setProtected(true);
        $manager->persist($emailTemplate9);

        $emailTemplate10 = new EmailTemplate();
        $emailTemplate10->setTemplateName("Unsubscribe");
        $emailTemplate10->setEmailSubject("Unsubscribe from workshop {{workshop.title}}");
        $emailTemplate10->setEmailBody(
            "<p>Hello {{participant.name}} {{particpant.surname}},</p><p>with the following link you could unsubscribe from the workshop {{workshop.title}}:</p><p><a href=\"{{url}}\" target=\"\">{{url}} </a><br/></p><p><br/></p><p><br/></p><p>Hallo {{participant.name}} {{particpant.surname}},</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(51, 51, 51);background-color: rgb(255, 255, 255);\">mit dem folgenden Link können Sie von dem Workshop <span style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\">{{workshop.title}}</span> abmelden</span>:</p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><a href=\"{{url}}\" target=\"\" style=\"color: rgb(51, 122, 183);background-color: transparent;\">{{url}}<span class=\"Apple-converted-space\"> </span></a><br/></p><p style=\"color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);\"><br/></p>"
        );
        $emailTemplate10->setProtected(true);
        $manager->persist($emailTemplate10);

        $manager->flush();
    }
}
