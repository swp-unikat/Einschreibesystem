<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Andreas Ifland, Leon Bergmann, Marco Hanisch
 * Date: 02.06.2016
 * Time: 10:27
 */
namespace Core\EntityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * this class provides the entitys and methods for the invitation
 * @ORM\Entity 
*/
class Invitation
{
    /** 
     * token to identify a user
     *@ORM\Id @ORM\Column(type="string", length=64) 
     */
    protected $code;

    /**
     * e-mail of invitation
     * @ORM\Column(type="string", length=256) 
    */
    protected $email;

    /**
     * When sending invitation set this value to 'true'
     *
     * It prevents sending invitations twice
     *
     * @ORM\Column(type="boolean")
     */
    protected $sent =false;
    /**
     * function to construct an invitation
     */
    public function __construct()
    {
        //generate identifier only once, here a 64 characters length code
        $this->code = substr(hash('sha512',bin2hex(openssl_random_pseudo_bytes(64))), 0, 64);
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param mixed $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getSent()
    {
        return $this->sent;
    }

    /**
     * @param mixed $sent
     */
    public function setSent($sent)
    {
        $this->sent = $sent;
    }



}
