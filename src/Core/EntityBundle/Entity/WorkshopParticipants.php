<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 03.05.2016
 * Time: 13:25
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * Class EntityController
 * class with all entitys of WorkshopParticipants
 * @ORM\Entity()
 * @ORM\Table(name="workshop_participants")
 */
class WorkshopParticipants
{
    /**
     * id of the workshopparticipant
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * id of a participant
     * @var \Core\EntityBundle\Entity\Participants
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\Participants", cascade={"persist"},fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("participants")
     * @Serializer\Groups({"names"})
     */
    protected $participant;

    /**
     * id of the workshop
     * @var \Core\EntityBundle\Entity\Workshop
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\Workshop", cascade={"persist"},fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="workshop", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("workshop")
     */
    protected $workshop;

    /**
     * date of enrollment
     * @var \DateTime
     * @ORM\Column(name="$enrollment", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("enrollment")
     */
    protected $enrollment;

    /**
     * state of participant if he is an the waitinglist
     * @var boolean
     * @ORM\Column(name="waiting", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("waiting")
     */
    protected $waiting;

    /**
     * state of participant if he is succesfull enroll
     * @var boolean
     * @ORM\Column(name="participated", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("participated")
     */
    protected $participated;

    /**
     * function for construct enrollment
     */
    public function __construct()
    {
        $this->enrollment = new \DateTime('now');
    }

    /**
     * function to get the id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     *function to set the id
     *
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * function to get a participant
     * @return Participants
     */
    public function getParticipant()
    {
        return $this->participant;
    }

    /**
     * fuction to set a participant
     *
     * @param Participants $participant
     */
    public function setParticipant($participant)
    {
        $this->participant = $participant;
    }

    /**
     * function to get a workshop
     * @return Workshop
     */
    public function getWorkshop()
    {
        return $this->workshop;
    }

    /**
     * function to set a workshop
     *
     * @param Workshop $workshop
     */
    public function setWorkshop($workshop)
    {
        $this->workshop = $workshop;
    }

    /**
     * function to get an enrollment
     * @return \DateTime
     */
    public function getEnrollment()
    {
        return $this->enrollment;
    }

    /**
     * function to set an enrollment
     *
     * @param \DateTime $enrollment
     */
    public function setEnrollment($enrollment)
    {
        $this->enrollment = $enrollment;
    }

    /**
     * function to return the state "waiting"
     * @return boolean
     */
    public function isWaiting()
    {
        return $this->waiting;
    }

    /**
     * function to set a state from a participant to "waiting"
     *
     * @param boolean $waiting
     */
    public function setWaiting($waiting)
    {
        $this->waiting = $waiting;
    }

    /**
     * function to return the state "participated"
     * @return boolean
     */
    public function isParticipated()
    {
        return $this->participated;
    }

    /**
     * function to set the state from a participant to "participated"
     *
     * @param boolean $participated
     */
    public function setParticipated($participated)
    {
        $this->participated = $participated;
    }
}
