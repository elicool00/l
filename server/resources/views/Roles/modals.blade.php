@foreach ($roles as $role)
<div id="update-delete-role-{{$role->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('roles.admin.update', $role->id)}}">
            @csrf
            @method('PATCH')
            <div class="modal-header bg-success">
                <h5 class="modal-title">Update {{$role->title}} role</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Role title" name="title" value="{{$role->title}}" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <textarea name="description" placeholder="Role description (optional)" class="form-control" cols="30" rows="6">{{$role->description}}</textarea>
                </div>
            </div>
            <div class="modal-footer row justify-content-around">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="button" class="btn btn-outline-danger"  data-toggle="modal" data-target="#delete-role-{{$role->id}}"><i class="fas fa-times pr-2"></i>Delete</button>
                <button type="submit" class="btn btn-outline-warning"><i class="fas fa-pen pr-2"></i>Save changes</button>
            </div>
        </form>
    </div>
</div>
<div id="delete-role-{{$role->id}}" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content bg-danger" method="POST" action="{{route('roles.admin.delete', $role->id)}}" >
            @csrf
            @method('DELETE')
            <div class="modal-header">
                <h5 class="modal-title">Confirmation</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body ">
                <p>You're about to delete a {{$role->title}} role.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-outline-light"><i class="fas fa-trash pr-2"></i>Confirm</button>
            </div>
        </form>
    </div>
</div>
@endforeach

<div id="create-role" class="modal fade">
    <div class="modal-dialog">
        <form class="modal-content" method="POST" action="{{route('roles.admin.create')}}">
                @csrf
                <div class="modal-header bg-success">
                    <h5 class="modal-title">Create new role</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Role title" name="title" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <i class="fas fa-tag"></i>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <textarea name="description" class="form-control" placeholder="Description about this role (optional)" cols="30" rows="6"></textarea>
                    </div>
                </div>
            <div class="modal-footer row justify-content-around">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times pr-2"></i>Cancel</button>
                <button type="submit" class="btn btn-outline-success"><i class="fas fa-plus pr-2"></i>Create</button>
            </div>
        </form>
    </div>
</div>
