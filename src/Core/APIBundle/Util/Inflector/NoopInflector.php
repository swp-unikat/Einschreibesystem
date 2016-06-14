<?php
/**
 * Created by IntelliJ IDEA.
 * User: Leon Bergmann
 * Company: SkyLab UG(haftungsbeschränkt)
 * Date: 09.05.2016
 * Time: 12:25
 */
namespace Core\APIBundle\Util\Inflector;

use FOS\RestBundle\Util\Inflector\InflectorInterface as InflectorInterface;

/**
 * Inflector class
 *
 */
class NoopInflector implements InflectorInterface
{
    /**
     * function to pluralize
     * @var string $word 
     */
    public function pluralize($word)
    {
        // Don't pluralize
        return $word;
    }
}
