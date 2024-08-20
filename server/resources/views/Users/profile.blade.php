<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{$user->username}} Profile | {{env('APP_NAME')}}</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <style type="text/css">.panel-title {display: inline;font-weight: bold;}.display-table {display: table;}.display-tr {display: table-row;}
    .display-td {display: table-cell;vertical-align: middle;width: 61%;}</style>
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
    @include('layouts.navmenu')
    @include('layouts.sidebar')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$user->username}} - Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">{{$user->username}} Profile</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img id="profile-pic" class="profile-user-img img-fluid img-circle"
                       src="{{$user->profile_picture}}"
                       alt="User profile picture">
                </div>
                <h3 class="profile-username text-center">{{$user->username}}</h3>
                <p class="text-muted text-center">{{$user->full_name}}</p>
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                      <b>Role</b> <a class="float-right">{{App\Models\Role::find($user->role_id)->title}}</a>
                  </li>
                  <li class="list-group-item">
                    <b>Balence</b> <a class="float-right"></a>
                  </li>
                  <form action="{{route('users.update.avatar', $user->id)}}" method="POST" class="form-group row mt-2" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')
                    <div class="d-flex col-12 justify-content-between align-items-center">
                      <label class="btn btn-outline-secondary btn-sm m-0" for="choosefile">Select picture</label>
                      <input id="choosefile" type="file" name="profile_picture" hidden>
                      <button class="btn btn-warning m-0">save</button>
                    </div>                      
                  </form>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <form action="{{route('users.delete.avatar', $user->id)}}" class="" method="POST">
                      @csrf
                      @method('DELETE')
                      <div class="d-flex justify-content-start">
                        <button type="submit" class="btn btn-danger btn-sm">Delete avatar</button>
                      </div> 
                    </form>
                    <button type="submit" class="btn btn-info btn-sm" data-toggle="modal" data-target="#notify-specific-user-{{$user->id}}">Notify user</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card card-primary card-outline">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                    <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Info</a></li>
                    <li class="nav-item"><a class="nav-link" href="#password" data-toggle="tab">password</a></li>            
                    <li class="nav-item"><a class="nav-link" href="#wallet" data-toggle="tab">Wallet</a></li>            
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                    <div class="active tab-pane" id="settings">
                        <form id="infoForm" action="{{route('users.update', $user->id)}}" method="POST" class="form-horizontal" enctype="multipart/form-data">
                            @csrf
                            @method('PATCH')
                            <div class="form-group row">
                                <label for="inputLogin" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="username" id="inputLogin" placeholder="username" value="{{$user->username}}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail" value="{{$user->email}}" readonly>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputfull_name" class="col-sm-2 col-form-label">Full name</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputfull_name" name="full_name" placeholder="Full name" value="{{$user->full_name}}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputRole" class="col-sm-2 col-form-label">Role</label>
                                <div class="col-sm-10">
                                    <select id="inputRole" name="role_id" class="form-control custom-select">
                                        <option selected disabled>Select role</option>
                                        @foreach (App\Models\Role::all() as $role)
                                            <option value="{{$role->id}}" >{{$role->title}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="form-group d-flex justify-content-between">
                            <div class="offset-sm-2">
                            <button id="SubmitInfoForm" type="submit" class="btn btn-success">Save</button>
                            </div>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-delete-user">Delete</button>
                        </div>           
                    </div>
                    <div class="tab-pane" id="password">
                      <form action="{{route('users.password.update', $user->id)}}" method="POST" enctype="multipart/form-data">
                          @csrf
                          @method('PATCH')
                          <div class="form-group row">
                              <label for="inputCurrPass" class="col-sm-3 col-form-label">Current password</label>
                              <div class="col-sm-9">
                                  <input type="password" class="form-control" name="current_password" id="inputCurrPass">
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="inputPass" class="col-sm-3 col-form-label">New password</label>
                              <div class="col-sm-9">
                                  <input type="password" class="form-control" name="password" id="inputPass">
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="inputConfirmPass" class="col-sm-3 col-form-label">Confirm new password</label>
                              <div class="col-sm-9">
                                  <input type="password" class="form-control" name="password_confirmation" id="inputConfirmPass">
                              </div>
                          </div>
                          <div class="form-group d-flex justify-content-start">
                              <button type="submit" class="btn btn-warning mt-3">Save</button>
                          </div> 
                      </form>
                    </div>
                    <div class="tab-pane" id="wallet">
                        
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
    <div class="modal fade" id="modal-delete-user">
        <div class="modal-dialog">
            <form action="{{route('users.delete', $user->id)}}" method="POST" class="modal-content bg-danger">
                @csrf
                @method('DELETE')
                <div class="modal-header">
                    <h4 class="modal-title">Delete account</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>You're about to delete your account. Are you sure ?</p>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-outline-light">Delete</button>
                </div>
            </form>
        </div>
    </div>
    <div id="notify-specific-user-{{$user->id}}" class="modal fade">
      <div class="modal-dialog">
          <form class="modal-content" method="POST" action="{{route('users.admin.notify.single', $user->id)}}">
              @csrf
              <div class="modal-header bg-primary">
                  <h5 class="modal-title">Send notification to {{$user->username}}</h5>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body ">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Subject" name="subject" required>
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Title" name="title">
                </div>
                <div class="input-group mb-3">
                    <textarea class="form-control" placeholder="Text (1)" name="text1"></textarea>
                </div>
                <div class="input-group mb-3">
                  <textarea class="form-control" placeholder="Text (2)" name="text2"></textarea>
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Url" name="url">
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Button text" name="btn_text">
                </div>
                <div class="input-group mb-3">
                  <textarea class="form-control" placeholder="Text (3)" name="text3"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mx-1"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-paper-plane mx-1"></i>Send</button>
              </div>
          </form>
      </div>
    </div>
  </div>
  @include('layouts.footer')
</div>
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js') }}"></script>
<script src="{{asset('js/helper.js')}}"></script>
@include('layouts.toastrs')
</body>
</html>
