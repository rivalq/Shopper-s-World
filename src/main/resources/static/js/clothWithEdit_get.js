var id = window.location.href.split("/").at(-1);
var cached_cloth = null;


function updatePage(){

    document.getElementById("cloth-heading").innerHTML = cached_cloth["name"];
    document.getElementById("cloth-brand").innerHTML = cached_cloth["brand"];
    document.getElementById("cloth-category").innerHTML = cached_cloth["category"];
    document.getElementById("cloth-short-description").innerHTML = cached_cloth["short_description"];
    document.getElementById("cloth-long-description").innerHTML = cached_cloth["long_description"];
}


function getDetails(id){

        $.ajax({
            url: `/api/clothes/${id}`,
            type: "GET",
            success: function(data){
                cached_cloth = data;
                updatePage();
            },
            error: function(data){
                console.log(data);
            }
        });

}

function getImages(id){
    $.ajax({
        url: `/api/clothes/images/${id}`,
        type: "GET",
        success: function(data){
            var main_image = data[0]
            var location_image = "/images/" + main_image;
            document.getElementById("cloth-main-image").setAttribute("src",location_image);
        },
        error: function(data){
            displayError("Image Not Loaded");
        }
    });
}


getDetails(id)
getImages(id)