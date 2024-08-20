<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <title>Edit template - {{env('APP_NAME')}}</title>
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
                            <h1 class="m-0" style="color: black;">Edit template</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                                <li class="breadcrumb-item"><a href="{{route("templates.admin")}}">Default templates</a></li>
                                <li class="breadcrumb-item"><a href="#">Edit templates</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="card">
                    <div class="card-header p-3">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link active" href="#preview" data-toggle="tab">Preview</a></li>
                            <li class="nav-item"><a class="nav-link" href="#data" data-toggle="tab">Data</a></li>
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="preview">
                                <div class="col-10 mx-auto border p-0">
                                    {!! $html !!}
                                </div>
                            </div>
                            <div class="tab-pane" id="data">
                                <form action="{{route('templates.update', $template->id)}}" method="POST" class="form-horizontal col-md-10 py-3 mx-auto" enctype="multipart/form-data">
                                    @csrf
                                    @method('PATCH')
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <input type="text" class="form-control" name="name" id="inputName" placeholder="Template name" value="{{$template->name}}">
                                        </div>
                                    </div>
                                    <input type="file" class="form-group form-control" name="thumbnail">
                                    <textarea name="view" id="view" class="col-12" rows="25" placeholder="HTML code...">{{$html}}</textarea>
                                    <div class="assets col-12">
                                    </div>
                                    <div class="row col-12 justify-content-around my-2">
                                        <a href="{{route("templates.admin")}}" class="btn btn-outline-secondary">Cancel</a>
                                        <button type="submit" class="btn btn-outline-info">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    @include('layouts.footer')
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
<script src="{{ asset('js/helper.js')}}"></script>
<script>checkAssests()</script>
@include('layouts.toastrs')
</body>
</html>
