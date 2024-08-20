<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TempMail extends Mailable
{
    use Queueable, SerializesModels;
    private $data;
    public $view;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($view, $data)
    {
        $this->view = $view;
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view($this->view)
        ->to($this->data['email'])
        ->subject($this->data['subject'])
        ->replyTo($this->data['reply_email'])
        ->from($this->data['user_email'], $this->data['user_full_name']);
    }
}
