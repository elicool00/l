<?php

namespace App\Notifications;

use App\Mail\MailNotif;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordReset extends Notification
{
    use Queueable;
    public $token;
    private $user;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user, $token)
    {
        $this->token = $token;
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
        $data = [
            'url' => env('FRONT_URL') . '/auth/reset-password/' . $this->token . "/" . $this->user->email,
            'user' => $this->user,
            'subject' => "Reset password",
            'title' => 'Hello ' . $this->user->username . "!",
            'text_1' => 'You are receiving this email because we received a password reset request for your account.',
            'text_2' => 'If you did not request a password reset, no further action is required.',
            'btn_text' => 'Reset password',
            'text_3'=> 'This password reset link will expire in 60 minutes.',
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
