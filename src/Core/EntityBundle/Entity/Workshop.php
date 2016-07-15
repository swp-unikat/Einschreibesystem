<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 29.04.2016
 * Time: 15:56
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * Class with methods from the entity workshop
 * @ORM\Entity(repositoryClass="Core\EntityBundle\Repository\WorkshopRepository")
 * @ORM\Table(name="Workshop")
 */
class Workshop
{
    /**
     * id of a workshop
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * title of a workshop
     * @var string
     * @ORM\Column(name="title", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("title")
     */
    protected $title;
    /**
     * cost of a workshop
     * @var int
     * @ORM\Column(name="cost", type="decimal",precision=4, scale=2, nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("cost")
     */
    protected $cost;
    /**
     * requirements of a workshop
     * @var string
     * @ORM\Column(name="requirement", type="string", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("requirement")
     */
    protected $requirements;
    /**
     * description of a workshop
     * @var string
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("description")
     */
    protected $description;
    /**
     * location of a workshop
     * @var string
     * @ORM\Column(name="location", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("location")
     */
    protected $location;
    /**
     * starttime and date of a workshop
     * @var \DateTime
     * @ORM\Column(name="start_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("start_at")
     */
    protected $start_at;
    /**
     * endtime and date of a workshop
     * @var \DateTime
     * @ORM\Column(name="end_at", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("end_at")
     */
    protected $end_at;
    /**
     * maximum participants of a workshop
     * @var int
     * @ORM\Column(name="max_participants", type="integer", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("max_participants")
     */
    protected $max_participants;
    /**
     * date and time when workshop created
     * @var \DateTime
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("created")
     */
    protected $created;
    /**
     * state of workshop
     * @var boolean
     * @ORM\Column(name="notified", type="boolean", nullable=false)
     */
    protected $notified;

    /**
     * function to create
     */
    public function __construct()
    {
        $this->created = new \DateTime("now");
    }

    /**
     * function to get the id of a workshop
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * function to set an id to a workshop
     *
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * function to get the title of a workshop
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * function to est a title to a workshop
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * function to get the cost of a workshop
     * @return int
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * function to set the cost of a workshop
     *
     * @param int $cost
     */
    public function setCost($cost)
    {
        $this->cost = $cost;
    }

    /**
     * function to get the requirements of a workshop
     * @return string
     */
    public function getRequirements()
    {
        return $this->requirements;
    }

    /**
     * function to set the requirements of a workshop
     *
     * @param string $requirements
     */
    public function setRequirements($requirements)
    {
        $this->requirements = $requirements;
    }

    /**
     * function to get the location of a workshop
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * function to set the location of a workshop
     *
     * @param string $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }

    /**
     * function to get the starttime and date of a workshop
     * @return \DateTime
     */
    public function getStartAt()
    {
        return $this->start_at;
    }

    /**
     * function to set the starttime and date of a workshop
     *
     * @param \DateTime $start_at
     */
    public function setStartAt($start_at)
    {
        $this->start_at = $start_at;
    }

    /**
     * function to get the endtime and date of a workshop
     * @return \DateTime
     */
    public function getEndAt()
    {
        return $this->end_at;
    }

    /**
     * function to set the endtime and date of a workshop
     *
     * @param \DateTime $end_at
     */
    public function setEndAt($end_at)
    {
        $this->end_at = $end_at;
    }

    /**
     * fucntion to get the maximum participants of a workshop
     * @return int
     */
    public function getMaxParticipants()
    {
        return $this->max_participants;
    }

    /**
     * function to set the maximum participants of a workshop
     *
     * @param int $max_participants
     */
    public function setMaxParticipants($max_participants)
    {
        $this->max_participants = $max_participants;
    }

    /**
     * function to get the createdtime of a workshop
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * function to set the createdtime of a workshop
     *
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * function to get the description of a workshop
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * function to set the description of a workshop
     *
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * function to get notifiedstate of a workshop
     * @return boolean
     */
    public function getNotified()
    {
        return $this->notified;
    }

    /**
     * function to set notifiedstate of a workshop
     *
     * @param boolean $notified
     */
    public function setNotified($notified)
    {
        $this->notified = $notified;
    }


}
