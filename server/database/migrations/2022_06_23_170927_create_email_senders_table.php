<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_senders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('list_id');
            $table->bigInteger('author_id');
            $table->bigInteger('template_id');
            $table->string('subject');
            $table->enum('frequency', ['once', 'daily', 'twice_daily', 'weekly', 'monthly', 'twice_monthly', 'yearly'])->default('daily');
            $table->enum('status', ['running', 'stopped'])->default('running');
            $table->string('reply_email');
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_senders');
    }
};
