<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 02/05/16
 * Time: 18:33
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
/**
 * this class provides entitys and methods for workshoptemplates
 * @ORM\Entity()
 * @ORM\Table(name="workshop_templates")
 * this class provides the entitys of the workshoptemplates and the methods of the workshoptemplates
 */
class WorkshopTemplates{

    /**
     * id of a workshoptemplate
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * title of a workshoptemplate
     * @var string
     * @ORM\Column(name="title", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("title")
     */
    protected $title;
    /**
     * description of a workshoptemplate
     * @var string
     * @ORM\Column(name="description", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("description")
     */
    protected $description;
    /**
     * cost of a workshoptemplate
     * @var int
     * @ORM\Column(name="cost", type="decimal",precision=4, scale=2, nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("cost")
     */
    protected $cost;
    /**
     * requirements of a workshoptemplate
     * @var string
     * @ORM\Column(name="requirement", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("requirement")
     */
    protected $requirements;
    /**
     * location of a workshoptemplate
     * @var string
     * @ORM\Column(name="location", type="string", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("location")
     */
    protected $location;
    /**
     * starttime and date of a workshoptemplate
     * @var \DateTime
     * @ORM\Column(name="start_at", type="datetime", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("start_at")
     */
    protected $start_at;
    /**
     * endtime and date of a workshoptemplate
     * @var \DateTime
     * @ORM\Column(name="end_at", type="datetime", nullable=true)
     * @Serializer\Expose
     * @Serializer\SerializedName("end_at")
     */
    protected $end_at;
    /**
     * maximum participants of a workshoptemplate
     * @var int
     * @ORM\Column(name="max_participants", type="integer", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("max_participants")
     */
    protected $max_participants;
    /**
     * datetime when workshoptemplate was created
     * @var \DateTime
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("created")
     */
    protected $created;
    /**
     * function to construct a workshoptemplate
     */
    public function __construct()
    {
        $this->created = new \DateTime("now");
    }

    /**
     * function to get the id of a workshoptemplate
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * function to set a workshoptemplate
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * fuction to get the title of a workshoptemplate
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * function to set the title of a workshoptemplate
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }
    /**
     * function to get the description of a workshoptemplate
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * function to set the description of a workshoptemplate
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }
    /**
     * function to get the cost of a workshoptemplate
     * @return int
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * function to set the cost of a workshoptemplate
     * @param int $cost
     */
    public function setCost($cost)
    {
        $this->cost = $cost;
    }

    /**
     * function to get the requirement of a workshoptemplate
     * @return string
     */
    public function getRequirements()
    {
        return $this->requirements;
    }

    /**
     * function to set the requirements of a workshoptemplate
     * @param string $requirements
     */
    public function setRequirements($requirements)
    {
        $this->requirements = $requirements;
    }

    /**
     * function to get the location of a workshoptemplate
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * function to set the location of a workshoptemplate
     * @param string $location
     */
    public function setLocation($location)
    {
        $this->location = $location;
    }

    /**
     * function to get the starttime and date of a workshoptemplate
     * @return \DateTime
     */
    public function getStartAt()
    {
        return $this->start_at;
    }

    /**
     * function to set the starttime and date of a workshoptemplate
     * @param \DateTime $start_at
     */
    public function setStartAt($start_at)
    {
        $this->start_at = $start_at;
    }

    /**
     * function to get the endtime and date of a workshoptemplate
     * @return \DateTime
     */
    public function getEndAt()
    {
        return $this->end_at;
    }

    /**
     * function to set the endtime and date of a workshoptemplate
     * @param \DateTime $end_at
     */
    public function setEndAt($end_at)
    {
        $this->end_at = $end_at;
    }

    /**
     * function to get the maximum participants of a workshoptemplate
     * @return int
     */
    public function getMaxParticipants()
    {
        return $this->max_participants;
    }

    /**
     * function to set the maximum participants of a workshoptemplate
     * @param int $max_participants
     */
    public function setMaxParticipants($max_participants)
    {
        $this->max_participants = $max_participants;
    }

    /**
     * function to get the creatdate of a workshoptemplate
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * function to set the creatdate of a workshoptemplate
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }


}
