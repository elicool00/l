@foreach ($templates as $template)
    <div id="delete-template-{{$template->id}}" class="modal fade">
        <div class="modal-dialog">
            <form class="modal-content bg-danger" method="POST" action="{{route('templates.destroy', $template->id)}}">
                @csrf
                @method('DELETE')
                <div class="modal-header">
                    <h5 class="modal-title">Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body ">
                    <p>You're about to delete a default template.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-light" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-outline-light"><i class="fas fa-trash pr-2"></i>Confirm</button>
                </div>
            </form>
        </div>
    </div>    
@endforeach