<div class="preloader flex-column justify-content-center align-items-center" style="background-color: #9fafca;">
    <img class="animation__shake" src="{{asset('assets/logo.png')}}" alt="Logo">
</div>
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="{{route('dashboard')}}" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link" data-toggle="modal" data-target="#notify-users">Notify users</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="{{route('logout.admin')}}">Log out</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
    </ul>
</nav>

<div id="notify-users" class="modal fade">
  <div class="modal-dialog">
      <form class="modal-content" method="POST" action="{{route('users.admin.notify')}}">
          @csrf
          <div class="modal-header bg-primary">
              <h5 class="modal-title">Send notification to users</h5>
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
