<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Authors: Leon Bergmann
 * Date: 09.05.2016
 * Time: 11:22
 */

namespace Core\APIBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertContains('Hello World', $client->getResponse()->getContent());
    }
}
