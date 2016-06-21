<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 02/05/16
 * Time: 18:36
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity()
 * @ORM\Table(name="email_token")
 * this class provides all entitys of e-mailtoken and all functions of e-mailtoken
 */
class EmailToken{
    /**
     * id of a e-mail
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
    /**
     * id of a participant
     * @var \Core\EntityBundle\Entity\Participants
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\Participants", cascade={"persist"})
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("participant")
     */
    public $participant;
    /**
     * token of a e-mail
     * @var string
     * @ORM\Column(name="token", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("token")
     */
    public $token;
    /**
     * creattime and date of emailtoken
     * @var \DateTime
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email_subject")
     */
    public $created;
    /**
     * time and date since the token is valid
     * @var \DateTime
     * @ORM\Column(name="valid_until", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("valid_until")
     */
    public $valid_until;
    /**
     * time and date when the token is used
     * @var \DateTime
     * @ORM\Column(name="used_at", type="datetime", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("used_at")
     */
    public $used_at;
    /**
     * function to construct a e-mailtoken
     */
    public function __construct()
    {
        $this->created = new \DateTime("now");
        $this->valid_until = $this->created;
        $this->valid_until->add(new \DateInterval('PT30M'));
        $this->token = hash("sha512",bin2hex(openssl_random_pseudo_bytes(255)));
    }

    /**
     * function to get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * function to set id
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * function to get participant
     * @return Participants
     */
    public function getParticipant()
    {
        return $this->participant;
    }

    /**
     * function to set participant
     * @param Participants $participant
     */
    public function setParticipant($participant)
    {
        $this->participant = $participant;
    }

    /**
     * function to get token
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * function to set token
     * @param string $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * function to get creattime and date of the token
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * function to set creattime and date of a token
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * function to get time and date since the token is valid
     * @return \DateTime
     */
    public function getValidUntil()
    {
        return $this->valid_until;
    }

    /**
     * function to set time and date since the token is valid
     * @param \DateTime $valid_until
     */
    public function setValidUntil($valid_until)
    {
        $this->valid_until = $valid_until;
    }

    /**
     * function to get time and date when the token is used
     * @return \DateTime
     */
    public function getUsedAt()
    {
        return $this->used_at;
    }

    /**
     * function to set the time and date when the token is used
     * @param \DateTime $used_at
     */
    public function setUsedAt($used_at)
    {
        $this->used_at = $used_at;
    }

}
