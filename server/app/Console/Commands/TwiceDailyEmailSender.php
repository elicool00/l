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

class TwiceDailyEmailSender extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailer:twiceDaily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is a command for twice in a day scheduled email senders';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $twiceDailySenders = EmailSender::where(['frequency' => 'twice_daily', 'status' => 'running'])->get();
        foreach($twiceDailySenders as $twicedailySender){
            $emails = Email::where('list_id', $twicedailySender->list_id)->get();
            foreach($emails as $email){
                $user = User::find($twicedailySender->author_id);
                $template = Template::find($twicedailySender->template_id);
                $view = $template->path . $template->blade;
                $view = str_replace("/", '.', $view);
                $view = str_replace(".blade.php", '', $view);
                //create mail
                try {
                    $data = [
                        'email' => Crypt::decryptString($email->email),
                        'subject' => $twicedailySender->subject,
                        'reply_email' => $twicedailySender->reply_email,
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
