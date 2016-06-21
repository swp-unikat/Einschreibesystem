<?php
/**
 * Created by IntelliJ IDEA.
 * Authors: Leon Bergmann, Marco Hanisch
 * Date: 24.05.16
 * Time: 09:16
 */

namespace Core\CronBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\LockHandler;

/**
 * this class provides a new function for the cli to easily implement a cron witch is checks if e-mails notifications are necessary
 */

class MailCommand extends ContainerAwareCommand
{
    /**
     * function to change the description
     */
    protected function configure()
    {
        $this->setName("cron:email")->setDescription("sending a notification to all participants");

    }
    /**
     * function which check if e-mails notifications are already sended or are needed
     *
     */

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $beginn = microtime(true);
        $lock = new LockHandler('cron:email');
        if (!$lock->lock()) {
            $output->writeln('The command is already running in another process.');

            return 0;
        }

        $mail = $this->getContainer()->getParameter("mail");
        $msg = $mail->run();

        $dauer = microtime(true) - $beginn;
        $output->writeln('Verarbeitung von '.$msg." Datensaetzen: $dauer Sek.");
        $output->writeln($msg);
        $lock->release();
    }
}
