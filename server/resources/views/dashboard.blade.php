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
  <link rel="stylesheet" href="{{ asset('plugins/uplot/uPlot.min.css') }}">
  <style> .login-form{background: #235F83;color: white;}.border-radius-10{border-radius: 10px;}</style>
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
                            <h1 class="m-0">Dashboard</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="card card-primary card-outline">
                    <div class="card-body pb-0">
                        <div class="row justify-content-between">
                            <div class="col-lg-3 col-6">
                                <div class="small-box bg-danger">
                                    <div class="inner">
                                        <h3>{{$admins}}</h3>
                                        <p>Admins</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fas fa-user-shield"></i>
                                    </div>
                                    <a href="{{route('users.admin')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="small-box bg-primary">
                                    <div class="inner">
                                        <h3>{{$users}}</h3>
                                        <p>Users</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <a href="{{route('users.admin')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">
                                <div class="small-box bg-warning">
                                    <div class="inner">
                                        <h3>{{$today_reg}}</h3>
                                        <p>Today's registrations</p>
                                    </div>
                                    <div class="icon">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <a href="{{route('users.admin')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @include('Users.info')
            </section>
        </div>
        @include('layouts.footer')
    </div>
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- uPlot -->
<script src="{{ asset('plugins/uplot/uPlot.iife.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
<script src="{{ asset('plugins/flot/jquery.flot.js') }}"></script>
<script src="{{ asset('plugins/flot/plugins/jquery.flot.pie.js') }}"></script>
<script src={{asset("js/dashboardPlots.js")}}></script>
@include('layouts.toastrs')
</body>
</html>