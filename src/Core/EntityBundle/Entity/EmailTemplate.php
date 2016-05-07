<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 02/05/16
 * Time: 18:29
 */
namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity()
 * @ORM\Table(name="email_template")
 */
class EmailTemplate{
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
    /**
     * @var string
     * @ORM\Column(name="template_name", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("template_name")
     */
    public $template_name;
    /**
     * @var string
     * @ORM\Column(name="email_subject", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email_subject")
     */
    public $email_subject;
    /**
     * @var string
     * @ORM\Column(name="email_body", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email_body")
     */
    public $email_body;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTemplateName()
    {
        return $this->template_name;
    }

    /**
     * @param mixed $template_name
     */
    public function setTemplateName($template_name)
    {
        $this->template_name = $template_name;
    }

    /**
     * @return mixed
     */
    public function getEmailSubject()
    {
        return $this->email_subject;
    }

    /**
     * @param mixed $email_subject
     */
    public function setEmailSubject($email_subject)
    {
        $this->email_subject = $email_subject;
    }

    /**
     * @return mixed
     */
    public function getEmailBody()
    {
        return $this->email_body;
    }

    /**
     * @param mixed $email_body
     */
    public function setEmailBody($email_body)
    {
        $this->email_body = $email_body;
    }


}