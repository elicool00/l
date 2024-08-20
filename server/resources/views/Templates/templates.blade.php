<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <title>Manage email templates - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>.nav-item > .active{background-color: #1DA4BA !important;}</style>
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
                            <h1 class="m-0">Templates</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="#">Default templates</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="row mb-3 ml-1">
                    <a href="{{route("templates.create")}}" class="btn btn-info" ><i class="fas fa-plus mr-2"></i> Create template</a>  
                </div>
                <div class="card card-solid">
                    <div class="card-body pb-0">
                        <div class="row justify-content-start">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>thumbnail</th>
                                        <th>name</th>
                                        <th>Author</th>
                                        <th>Created at</th>
                                        <th>Last update</th>
                                        <th>Update/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($templates as $template)
                                        <tr>
                                            <td>{{$template->id}}</td>
                                            <td><img class="img-md" src="{{$template->thumbnail}}" alt="Thumbnail"></td>
                                            <td>{{$template->name}}</td>
                                            <td>
                                                <a href="{{route("users.show", $template->author_id)}}" class="link-muted">
                                                    <img class="profile-user-img img-sm img-fluid img-circle mx-auto"src="{{App\Models\User::find($template->author_id)->profile_picture}}"alt="User profile picture">
                                                    <span class="mx-1">{{App\Models\User::find($template->author_id)->username}}</span>
                                                </a>
                                            </td>
                                            <td>{{$template->created_at}}</td>
                                            <td>{{$template->updated_at}}</td>
                                            <td>
                                                <button class="btn btn-outline-danger" data-toggle="modal" data-target="#delete-template-{{$template->id}}"><i class="fas fa-times"></i></button>
                                                <a href="{{route('templates.edit', $template->id)}}"  class="btn btn-outline-warning"><i class="fas fa-pen"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        @include('Templates.modals')
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