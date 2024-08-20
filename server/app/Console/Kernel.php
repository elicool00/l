<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('mailer:daily')->everyMinute();//##
        $schedule->command('mailer:twiceDaily')->twiceDaily(1, 13);
        $schedule->command('mailer:weekly')->weekly();
        $schedule->command('mailer:monthly')->monthly();
        $schedule->command('mailer:twiceMonthly')->twiceMonthly(1, 16, '13:00');
        $schedule->command('mailer:yearly')->yearly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
