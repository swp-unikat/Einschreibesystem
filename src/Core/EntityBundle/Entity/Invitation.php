<?php
/**
 * Created by IntelliJ IDEA.
 * User: Andreas Ifland
 * Authors: Andreas Ifland
 * Date: 02.06.2016
 * Time: 10:27
 */
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Invitation
{
    /** @ORM\Id @ORM\Column(type="string", length=6) */
    protected $code;

    /** @ORM\Column(type="string", length=256) */
    protected $email;

    /**
     * When sending invitation set this value to 'true'
     *
     * It prevents sending invitations twice
     *
     * @ORM\Column(type="boolean")
     */
    protected $sent =false;

    public function __construct()
    {
        //generate identifier only once, here a 6 characters length code
        $this->code = substr(md5(uniqid(rand(), true)), 0, 6);
    }

    public function  getCode()
    {
        return $this->code;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function isSent()
    {
        return $this->sent;
    }

    public function send()
    {
        $this->sent = true;
    }

}
