<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 29.04.2016
 * Time: 16:24
 */
namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * this class provides the entitys and methods of the participants
 * @ORM\Entity
 * @ORM\Table(name="Participants")
 */
class Participants
{
    /**
     * id of the participant
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * name of the participant
     * @var string
     * @ORM\Column(name="name", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("name")
     */
    protected $name;
    /**
     * surname of a participant
     * @var string
     * @ORM\Column(name="surname", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("surname")
     */
    protected $surname;
    /**
     * e-mail of a participant
     * @var string
     * @ORM\Column(name="email", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email")
     */
    protected $email;
    /**
     * state of a participant, if he is blacklisted
     * @var bool
     * @ORM\Column(name="blacklisted", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted")
     */
    protected $blacklisted;
    /**
     * time and date since a participant is blacklisted
     * @var \DateTime
     * @ORM\Column(name="blacklisted_at", type="datetime", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted_at")
     */
    protected $blacklisted_at;
    /**
     * administrator which blacklisted a participant
     * @var \Core\EntityBundle\Entity\User
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\User", cascade={"persist"})
     * @ORM\JoinColumn(name="blacklisted_from", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted_from")
     */
    protected $blacklisted_from;

    /**
     * function to get the id of a participant
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * function to set the id of a participant
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * function to get name of a participant
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * function to set name of a participant
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * function to get surname of participant
     * @return string
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * function to set surname of participant
     * @param string $surname
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;
    }

    /**
     * function to get e-mail of participant
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * function to set e-mail of participant
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * function to get blacklistedstate 
     * @return boolean
     */
    public function isBlacklisted()
    {
        return $this->blacklisted;
    }

    /**
     * function to set participant to state blacklisted
     * @param boolean $blacklisted
     */
    public function setBlacklisted($blacklisted)
    {
        $this->blacklisted = $blacklisted;
    }

    /**
     * function to get time and date since participant is blacklisted
     * @return \DateTime
     */
    public function getBlacklistedAt()
    {
        return $this->blacklisted_at;
    }

    /**
     * function to set time and date since participant is blacklisted
     * @param \DateTime $blacklisted_at
     */
    public function setBlacklistedAt($blacklisted_at)
    {
        $this->blacklisted_at = $blacklisted_at;
    }

    /**
     * function to get administrator which blacklisted participant
     * @return User
     */
    public function getBlacklistedFrom()
    {
        return $this->blacklisted_from;
    }

    /**
     * function to set administrator which blacklisted participant
     * @param User $blacklisted_from
     */
    public function setBlacklistedFrom($blacklisted_from)
    {
        $this->blacklisted_from = $blacklisted_from;
    }


}
