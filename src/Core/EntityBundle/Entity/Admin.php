<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marco Hanisch
 * Date: 31.05.2016
 * Time: 15:11
 */
namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="Admin")
 */
class Admin
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
     * @ORM\Column(name="enabled", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("enabled")
     */
    protected $enabled;
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
    public function isEnabled()
    {
        return $this->enabled;
    }
    /**
     * @param boolean $enabled
     */
    public function setenabled($enabled)
    {
        $this->enabled = $enabled;
    }
    }
