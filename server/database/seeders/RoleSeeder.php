<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'title' => 'ADMIN',
            'description' => 'Admin can manage every model with CRUD operations.'
        ]);
        Role::create([
            'title' => 'USER',
            'description' => 'User can authenticate and create schedulers, and email lists with different templates.'
        ]);
    }
}
