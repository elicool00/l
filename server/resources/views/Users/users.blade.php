<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <title>Dashboard - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: #235F83 !important;}</style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
        @include('layouts.navmenu')
        @include('layouts.sidebar')
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Users</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Manage users</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <button class="btn btn-primary active mb-2" data-toggle="modal" data-target="#create-user"><i class="fas fa-plus mr-2"></i>Create user</button>
                <div class="card">
                    <div class="card-header p-3">
                        <ul class="nav nav-pills">
                            @for ($i = 0; $i < count($roles); $i++)
                                <li class="nav-item"><a class="nav-link @if($i == 0) active @endif" href="#{{str_replace(" ", "-", $roles[$i]->title)}}" data-toggle="tab">{{$roles[$i]->title}}</a></li>
                            @endfor
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="tab-content">
                            @for ($i = 0; $i < count($roles); $i++)
                                <div class="tab-pane @if($i == 0) active @endif" id="{{str_replace(" ", "-", $roles[$i]->title)}}">
                                    @include('Users.users-table', ['collection' => ($roles[$i]->title == 'ADMIN') ? ($admins) : ($users), 'role' => $roles[$i]->title])
                                </div>
                            @endfor
                        </div>
                    </div>
                </div>
                <div class="row col-12 justify-content-center">
                    {{ ($users->links()) }}
                </div>
            </section>
        </div>
    </div>
    @include('Users.modals')
    @include('layouts.footer')
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
@include('layouts.toastrs')
</body>
</html>
