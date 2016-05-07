<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 03.05.2016
 * Time: 13:25
 */

namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity()
 * @ORM\Table(name="workshop_participants")
 */
class WorkshopParticipants
{
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @var \Core\EntityBundle\Entity\Participants
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\Participants", cascade={"persist"})
     * @ORM\JoinColumn(name="participant", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("participants")
     */
    protected $participant;
    /**
     * @var \Core\EntityBundle\Entity\Workshop
     * @ORM\ManyToOne(targetEntity="\Core\EntityBundle\Entity\Workshop", cascade={"persist"})
     * @ORM\JoinColumn(name="workshop", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Expose
     * @Serializer\SerializedName("workshop")
     */
    protected $workshop;
    /**
     * @var \DateTime
     * @ORM\Column(name="$enrollment", type="datetime", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("enrollment")
     */
    protected $enrollment;
    /**
     * @var boolean
     * @ORM\Column(name="waiting", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("waiting")
     */
    protected $waiting;
    /**
     * @var boolean
     * @ORM\Column(name="participated", type="boolean", nullable=false)
     * @Serializer\Expose
     * @Serializer\SerializedName("participated")
     */
    protected $participated;

    public function __construct()
    {
        $this->enrollment = new \DateTime('now');
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
     * @return Workshps
     */
    public function getWorkshop()
    {
        return $this->workshop;
    }

    /**
     * @param Workshps $workshop
     */
    public function setWorkshop($workshop)
    {
        $this->workshop = $workshop;
    }

    /**
     * @return \DateTime
     */
    public function getEnrollment()
    {
        return $this->enrollment;
    }

    /**
     * @param \DateTime $enrollment
     */
    public function setEnrollment($enrollment)
    {
        $this->enrollment = $enrollment;
    }

    /**
     * @return boolean
     */
    public function isWaiting()
    {
        return $this->waiting;
    }

    /**
     * @param boolean $waiting
     */
    public function setWaiting($waiting)
    {
        $this->waiting = $waiting;
    }

    /**
     * @return boolean
     */
    public function isParticipated()
    {
        return $this->participated;
    }

    /**
     * @param boolean $participated
     */
    public function setParticipated($participated)
    {
        $this->participated = $participated;
    }


}