<?php

namespace App\Console\Commands;

use App\Mail\TempMail;
use App\Models\Email;
use App\Models\EmailSender;
use App\Models\Template;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;


class YearlyEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailer:yearly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is a command for yearly scheduled email senders';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $yearlySenders = EmailSender::where(['frequency' => 'yearly', 'status' => 'running'])->get();
        foreach($yearlySenders as $yearlySender){
            $emails = Email::where('list_id', $yearlySender->list_id)->get();
            foreach($emails as $email){
                $user = User::find($yearlySender->author_id);
                $template = Template::find($yearlySender->template_id);
                $view = $template->path . $template->blade;
                $view = str_replace("/", '.', $view);
                $view = str_replace(".blade.php", '', $view);
                //create mail
                try {
                    $data = [
                        'email' => Crypt::decryptString($email->email),
                        'subject' => $yearlySender->subject,
                        'reply_email' => $yearlySender->reply_email,
                        'user_email' => $user->email,
                        'user_full_name' => $user->full_name
                    ];             
                } catch (DecryptException $e) {
                    return 0;
                }
                Mail::send(new TempMail($view, $data));
            }            
        }
        return 0;
    }
}
