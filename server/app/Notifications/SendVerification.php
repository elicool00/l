<?php

namespace App\Notifications;

use App\Mail\MailNotif;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

class SendVerification extends Notification
{
    use Queueable;
    private $user;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
                'return' => rtrim(request()->get('return'), '/') ?? '',
            ]
        );
        $data = [
            'url' => $url,
            'user' => $this->user,
            'subject' => "Email Verification",
            'title' => 'Welcome ' . $this->user->username . "!",
            'text_1' => 'We are excited to have you get started! First you need to confirm your account.',
            'text_2' => 'If you did not create an account, no further action is required.',
            'btn_text' => 'Confirm your email',
            'text_3'=> 'This verification link will expire in 60 minutes.',
        ];
        return (new MailNotif($data));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
