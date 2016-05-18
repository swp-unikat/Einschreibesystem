<?php
namespace Core\APIBundle\Util\Inflector;

use FOS\RestBundle\Util\Inflector\InflectorInterface as InflectorInterface;

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