
$("input[type='image']").click(function(event) {
    event.preventDefault();
    $("#cloth-upload").click();
});

function upload_image(data){

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url : "/create/upload",
        data : data,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data){
            console.log(data);
        },
        error: function(data){
            console.log("Error");
        }
    })
}

function validation(form){
    
    return form[0].value != "";
}


$("#form-submit").submit(function(event){
    event.preventDefault();
    var form = document.getElementById('form-submit');
    var data = new FormData(form);
    var image_data = new FormData();
    image_data.append("image_file",data.get("image_file"));
    data.delete("image_file");
    if(!validation(form)){
            displayError("Please Enter all details, and upload image");
            return;
    }

    $.ajax({
        type: "POST",
        url : "/create/submit",
        data : data,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data){
            image_data.append("id",data);
            upload_image(image_data);
            displaySuccess("Cloth Added Successfully");
            window.location.href = `/dashboard/clothes/${data}`;
        },
        error: function(data){
            displayError("Some Error Occured");
        }
    });
}); 





