<table class="table table-striped table-bordered">
    <thead>
        <tr class="text-center">
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Created at</th>
            <th scope="col">Edit/Delete</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($collection as $user)
           
                <tr class="text-center">
                    <td class="row justify-content-between border-0">
                        <img class="profile-user-img img-md img-fluid img-circle mx-auto"src="{{$user->profile_picture}}"alt="User profile picture">
                    </td>
                    <td>{{$user->username}}</td>
                    <td>{{$user->full_name}}</td>
                    <td>{{$user->email}}</td>
                    <td>{{App\Models\Role::find($user->role_id)->title}}</td>
                    <td>{{$user->created_at}}</td>
                    <td>
                        <button class="btn btn-outline-danger" data-toggle="modal" data-target="#delete-user-{{$user->id}}"><i class="fas fa-times"></i></button>
                        <a href="{{route("users.show", $user->id)}}"  class="btn btn-outline-warning"><i class="fas fa-pen"></i></a>
                    </td>
                </tr>
        @endforeach
    </tbody>    
</table>

