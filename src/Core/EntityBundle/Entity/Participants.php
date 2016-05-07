<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 29.04.2016
 * Time: 16:24
 */
namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="Participants")
 */
class Participants
{
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @var string
     * @ORM\Column(name="name", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("name")
     */
    protected $name;
    /**
     * @var string
     * @ORM\Column(name="surname", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("surname")
     */
    protected $surname;
    /**
     * @var string
     * @ORM\Column(name="email", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("email")
     */
    protected $email;
    /**
     * @var bool
     * @ORM\Column(name="blacklisted", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted")
     */
    protected $blacklisted;
    /**
     * @var \DateTime
     * @ORM\Column(name="blacklisted_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted_at")
     */
    protected $blacklisted_at;
    /**
     * @var \Core\EntityBundle\Entity\User
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\User", cascade={"persist"})
     * @ORM\JoinColumn(name="blacklisted_from", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("blacklisted_from")
     */
    protected $blacklisted_from;

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
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * @param string $surname
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return boolean
     */
    public function isBlacklisted()
    {
        return $this->blacklisted;
    }

    /**
     * @param boolean $blacklisted
     */
    public function setBlacklisted($blacklisted)
    {
        $this->blacklisted = $blacklisted;
    }

    /**
     * @return \DateTime
     */
    public function getBlacklistedAt()
    {
        return $this->blacklisted_at;
    }

    /**
     * @param \DateTime $blacklisted_at
     */
    public function setBlacklistedAt($blacklisted_at)
    {
        $this->blacklisted_at = $blacklisted_at;
    }

    /**
     * @return User
     */
    public function getBlacklistedFrom()
    {
        return $this->blacklisted_from;
    }

    /**
     * @param User $blacklisted_from
     */
    public function setBlacklistedFrom($blacklisted_from)
    {
        $this->blacklisted_from = $blacklisted_from;
    }


}