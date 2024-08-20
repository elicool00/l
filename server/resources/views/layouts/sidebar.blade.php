<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="{{route('dashboard')}}" class="brand-link">
        <img src="{{asset('assets/icon.png')}}" alt="icon" class="brand-image img-size-50">
        <span class="brand-text font-weight-light">{{env('APP_NAME')}}</span>
    </a>
    <div class="sidebar">
        @if(Auth::user())
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{Auth::user()->profile_picture}}" class="img-circle elevation-2" alt="User-Image">
            </div>
            <div class="info">
                <a href="{{route("users.show", Auth::id())}}" class="d-block">{{Auth::user()->username}}</a>
            </div>
        </div>
        @endif
        <div class="form-inline mt-4">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-sidebar">
                    <i class="fas fa-search fa-fw"></i>
                </button>
            </div>
            </div>
        </div>
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <a href="{{route('dashboard')}}" class="nav-link @if(Request::url() === route('dashboard')) active @endif">
                    <i class="fa fa-home"></i>
                    <p>Home</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('users.admin')}}" class="nav-link @if(Request::url() === route('users.admin')) active @endif">
                    <i class="fa fa-user"></i>
                    <p>Manage Users</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('roles.admin')}}" class="nav-link @if(Request::url() === route('roles.admin')) active @endif">
                    <i class="fa fa-tag"></i>
                    <p>Manage roles</p>
                </a>
            </li>
            <li class="nav-item">
                <a href="{{route('templates.admin')}}" class="nav-link @if(Request::url() === route('templates.admin') || Request::url() === route('templates.create')) active @endif">
                    <i class="fas fa-th-large"></i>
                  <p>Templates</p>
                </a>
              </li>
            <li class="nav-item">
                <a href="" class="nav-link">
                    <i class="fas fa-money-bill"></i>
                    <p>Payment settings</p>
                </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                <i class="fas fa-headset"></i>
                <p>Support tickets</p>
              </a>
            </li>
            </ul>
        </nav>
    </div>
</aside>