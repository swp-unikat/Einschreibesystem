<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt) 
 * Date: 29.04.2016
 * Time: 15:56
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="Core\EntityBundle\Repository\WorkshopRepository")
 * @ORM\Table(name="Workshop")
 */
class Workshop
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
     * @ORM\Column(name="title", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("title")
     */
    protected $title;
    /**
     * @var int
     * @ORM\Column(name="cost", type="decimal",precision=4, scale=2, nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("cost")
     */
    protected $cost;
    /**
     * @var string
     * @ORM\Column(name="requirement", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("requirement")
     */
    protected $requirements;
    /**
     * @var string
     * @ORM\Column(name="description", type="text", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("description")
     */
    protected $description;
    /**
     * @var string
     * @ORM\Column(name="location", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("location")
     */
    protected $location;
    /**
     * @var \DateTime
     * @ORM\Column(name="start_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("start_at")
     */
    protected $start_at;
    /**
     * @var \DateTime
     * @ORM\Column(name="end_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("end_at")
     */
    protected $end_at;
    /**
     * @var int
     * @ORM\Column(name="max_participants", type="integer", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("max_participants")
     */
    protected $max_participants;
    /**
     * @var \DateTime
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("created")
     */
    protected $created;
    /**
     * @var bool
     * @ORM\Column(name="notified", type="boolean", nullable=false)
     */
    protected $notified;

    public function __construct()
    {
        $this->created = new \DateTime("now");
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
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return int
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * @param int $cost
     */
    public function setCost($cost)
    {
        $this->cost = $cost;
    }

    /**
     * @return string
     */
    public function getRequirements()
    {
        return $this->requirements;
    }

    /**
     * @param string $requirements
     */
    public function setRequirements($requirements)
    {
        $this->requirements = $requirements;
    }

    /**
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }

    /**
     * @return \DateTime
     */
    public function getStartAt()
    {
        return $this->start_at;
    }

    /**
     * @param \DateTime $start_at
     */
    public function setStartAt($start_at)
    {
        $this->start_at = $start_at;
    }

    /**
     * @return \DateTime
     */
    public function getEndAt()
    {
        return $this->end_at;
    }

    /**
     * @param \DateTime $end_at
     */
    public function setEndAt($end_at)
    {
        $this->end_at = $end_at;
    }

    /**
     * @return int
     */
    public function getMaxParticipants()
    {
        return $this->max_participants;
    }

    /**
     * @param int $max_participants
     */
    public function setMaxParticipants($max_participants)
    {
        $this->max_participants = $max_participants;
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
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return \DateTime
     */
    public function getNotified()
    {
        return $this->notified;
    }

    /**
     * @param \DateTime $notified
     */
    public function setNotified($notified)
    {
        $this->notified = $notified;
    }


}