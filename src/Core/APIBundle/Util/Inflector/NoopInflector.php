<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 09.05.2016
 * Time: 12:25
 */
namespace Core\APIBundle\Util\Inflector;

use FOS\RestBundle\Inflector\InflectorInterface;

/**
 * Inflector class
 *
 */
class NoopInflector implements InflectorInterface
{
    public function pluralize($word)
    {
        // Don't pluralize
        return $word;
    }
}
