@foreach (App\Models\User::all() as $account)
    <div id="delete-user-{{$account->id}}" class="modal fade">
        <div class="modal-dialog">
            <form class="modal-content bg-danger" method="POST" action="{{route('users.delete', $account->id)}}">
                @csrf
                @method('DELETE')
                <div class="modal-header">
                    <h5 class="modal-title">Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body ">
                    <p>You're about to delete a user account.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-outline-light"><i class="fas fa-trash pr-2"></i>Confirm</button>
                </div>
            </form>
        </div>
    </div>    
@endforeach
<div id="create-user" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('users.admin.store')}}">
            @csrf
            <div class="modal-header bg-primary">
                <h5 class="modal-title">Create new user</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body ">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Username" name="username" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="email" name="email" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-envelope"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Full name" name="full_name" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-address-card"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" name="password" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Confirm password" name="password_confirmation" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <select id="inputRole" name="role_id" class="form-control custom-select">
                        <option selected disabled>Select role</option>
                        @foreach ($roles as $role)
                            <option value="{{$role->id}}" >{{$role->title}}</option>
                        @endforeach
                    </select>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-plus pr-2"></i>Create</button>
            </div>
        </form>
    </div>
</div>
