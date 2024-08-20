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


class TwiceMonthlyEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailer:twiceMonthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is a command for twice in a month scheduled email senders';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $twiceMonthlySenders = EmailSender::where(['frequency' => 'twice_monthly', 'status' => 'running'])->get();
        foreach($twiceMonthlySenders as $twiceMonthlySender){
            $emails = Email::where('list_id', $twiceMonthlySender->list_id)->get();
            foreach($emails as $email){
                $user = User::find($twiceMonthlySender->author_id);
                $template = Template::find($twiceMonthlySender->template_id);
                $view = $template->path . $template->blade;
                $view = str_replace("/", '.', $view);
                $view = str_replace(".blade.php", '', $view);
                //create mail
                try {
                    $data = [
                        'email' => Crypt::decryptString($email->email),
                        'subject' => $twiceMonthlySender->subject,
                        'reply_email' => $twiceMonthlySender->reply_email,
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
