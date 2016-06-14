<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 28/04/16
 * Time: 10:47
 */

namespace Core\EntityBundle\Entity;




use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Core\EntityBundle\Entity\Invitation;
/**
 * this class provides entitys and methods from the user
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * id of the user
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * invitation of user 
     * @ORM\OneToOne(targetEntity="Invitation")
     * @ORM\JoinColumn(referencedColumnName="code")
     * @Assert\NotNull(message="Your invitation is wrong", groups={"Registration"})
     */
    protected $invitation;
    /**
     * function to construct user
     */
    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
    /**
     * function to set invitation
     */
    public function setInvitation(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }
    /**
     * function to get invitation
     */
    public function getInvitation()
    {
        return $this->invitation;
    }




}
