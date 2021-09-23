



var id = window.location.href.split("/").at(-1);
var cached_cloth = null;



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

function updatePage(){

    document.getElementById("cloth-heading").innerHTML = cached_cloth["name"];
    document.getElementById("cloth-brand").innerHTML = cached_cloth["brand"];
    document.getElementById("cloth-category").innerHTML = cached_cloth["category"];
    document.getElementById("cloth-short-description").innerHTML = cached_cloth["short_description"];
    
}

function changeHeading(){
    console.log(1);
    var modal = $("#changeHeading");
    modal.modal("show");
    document.getElementById("new-heading").value = cached_cloth["name"];
    document.getElementById("new-category").value = cached_cloth["category"];
    document.getElementById("new-brand").value = cached_cloth["brand"];
    document.getElementById("new-short_description").value = cached_cloth["short_description"];
}

function closeHeading(){
    var modal = $("#changeHeading");
    modal.modal("hide");
}

function saveHeading(){

    var isChanged = false;
    var new_heading = document.getElementById("new-heading").value;
    var new_category= document.getElementById("new-category").value;
    var new_brand = document.getElementById("new-brand").value;
    var new_short_description = document.getElementById("new-short_description").value;


    if(new_heading != cached_cloth["name"])isChanged = true;
    if(new_category != cached_cloth["category"])isChanged = true;
    if(new_brand != cached_cloth["brand"])isChanged = true;
    if(new_short_description != cached_cloth["short_description"])isChanged = true;


    if(isChanged){
        const data = {
            heading : new_heading,
            category : new_category,
            brand : new_brand,
            short_description: new_short_description,
        };
        $.ajax({
            url : `/api/clothes/heading/${id}`,
            type: "PUT",
            data: data,
            success: function(data){
                cached_cloth["name"] = new_heading;
                cached_cloth["category"] = new_category;
                cached_cloth["brand"] = new_brand;
                cached_cloth["short_description"] = new_short_description;
                updatePage();
                displaySuccess("Heading Changed");   
                closeHeading();
            },
            error: function(data){
                displayError("Some Error Occurred");
            }
        });

    }else{
        closeHeading();
    }
}

getDetails(id)
getImages(id)



