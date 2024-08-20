<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <title>Manage roles - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: #28A745 !important;}</style>
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
                            <h1 class="m-0">Roles</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Roles list</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="row mb-3 ml-1">
                    <button class="btn btn-success" data-toggle="modal" data-target="#create-role"><i class="fas fa-plus mr-2"></i> Create role</button>  
                </div>
                <div class="card card-solid">
                    <div class="card-body pb-0">
                        <div class="row justify-content-start">
                            @foreach ($roles as $role)
                                <div class="col-lg-3 col-6">
                                    <div class="small-box bg-success">
                                        <div class="inner">
                                            <h3>{{$role->title}}</h3>
                                            <p>{{($role->description) ? ($role->description) : ("No description specified!")}}</p>
                                        </div>
                                        <div class="icon">
                                            <i class="fas fa-tag"></i>
                                        </div>
                                        <a href="#" class="small-box-footer" data-toggle="modal" data-target="#update-delete-role-{{$role->id}}">Edit/Delete <i class="fas fa-arrow-circle-right"></i></a>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </section>
        </div>
        @include('Roles.modals')
        @include('layouts.footer')
    </div>
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
<script src="{{ asset('js/helper.js')}}"></script>
@include('layouts.toastrs')
</body>
</html>