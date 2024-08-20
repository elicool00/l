/* 
    Show selected image befor updating
*/
function readImage(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#profile-pic').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
      }
}
$("#choosefile").change(function(){
    readImage(this);
});

/*
    Set onClick event to submit profile form
*/
$('#SubmitInfoForm').click(function(){
    $('#infoForm').submit();
})

/*
    Append choose assets for creating templates
*/
$("#view").keyup(checkAssests)

function checkAssests(){
    var asstes = ($("#view").val().match(/<img/g) || []).length;
    let html = "";
    for (let i = 1; i <= asstes; i++){
        html += 
        '<div class="row justify-content-around text-dark">'+
            '<label class="label">Choose asset number ' + i +'</label>'+
            ' <input type="file" class="input_assets" name="assets[]" id="' + i +'">'+
        '</div>'
    }
    $(".assets").html(html);
}
