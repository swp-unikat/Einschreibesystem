<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt) 
 * Date: 02/05/16
 * Time: 18:36
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * @ORM\Entity()
 * @ORM\Table(name="email_token")
 */
class EmailToken{
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
    /**
     * @var \Core\EntityBundle\Entity\Participants
     * @ORM\OneToOne(targetEntity="\Core\EntityBundle\Entity\Participants", cascade={"persist"})
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("participant")
     */
    public $participant;
    /**
     * @var string
     * @ORM\Column(name="token", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("token")
     */
    public $token;
    /**
     * @var \DateTime
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email_subject")
     */
    public $created;
    /**
     * @var \DateTime
     * @ORM\Column(name="valid_until", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("valid_until")
     */
    public $valid_until;
    /**
     * @var \DateTime
     * @ORM\Column(name="used_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("used_at")
     */
    public $used_at;

    public function __construct()
    {
        $this->created = new \DateTime("now");
        $this->valid_until = $this->created;
        $this->valid_until->add(new \DateInterval('P30i'));
        $this->token = openssl_random_pseudo_bytes(255);
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return Participants
     */
    public function getParticipant()
    {
        return $this->participant;
    }

    /**
     * @param Participants $participant
     */
    public function setParticipant($participant)
    {
        $this->participant = $participant;
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param string $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * @return \DateTime
     */
    public function getValidUntil()
    {
        return $this->valid_until;
    }

    /**
     * @param \DateTime $valid_until
     */
    public function setValidUntil($valid_until)
    {
        $this->valid_until = $valid_until;
    }

    /**
     * @return \DateTime
     */
    public function getUsedAt()
    {
        return $this->used_at;
    }

    /**
     * @param \DateTime $used_at
     */
    public function setUsedAt($used_at)
    {
        $this->used_at = $used_at;
    }

}