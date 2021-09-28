window.onload = () =>{
    if(window.location != window.parent.location){
        document.getElementsByClassName("navbar")[0].remove();
        document.getElementById("edit-heading").remove();
    }
}


var id = window.location.href.split("/").at(-1);
var cached_cloth = null;
var stock = null;
var selected_size = null;

const size_map = new Map();

function updatePage(){

    document.getElementById("cloth-heading").innerHTML = cached_cloth["name"];
    document.getElementById("cloth-brand").innerHTML = cached_cloth["brand"];
    document.getElementById("cloth-category").innerHTML = cached_cloth["category"];
    document.getElementById("cloth-short-description").innerHTML = cached_cloth["short_description"];
    document.getElementById("cloth-long-description").innerHTML = cached_cloth["long_description"];
}

function createStock(){
        var parent = document.getElementById("cloth-select-size");
        var default_id = null;
        for(var i = 0; i < stock.length; i++){
                var button = document.createElement("button");
                button.classList.add("btn");
                button.classList.add("btn-outline-primary");
                button.classList.add("shadow-none");
                button.id = "cloth-size-" + stock[i]["size"];
                if(i == 0)default_id = button.id;
                button.innerHTML = stock[i]["size"];
                button.addEventListener("click",detectSize);
                parent.appendChild(button);
                size_map.set(button.id,stock[i]);
        }
        if(default_id != null)selectSize(default_id);       
}

function detectSize(event){

    if(selected_size != null){
        deselectSize(selected_size);
    }
    selectSize(event.target.id);
}

function deselectSize(id){
    var elem = document.getElementById(id);
    elem.classList.remove("btn-primary");
    elem.classList.add("btn-outline-primary");
    selected_size = null;
}

function selectSize(id){
    var elem = document.getElementById(id);
    elem.classList.remove("btn-outline-primary");
    elem.classList.add("btn-primary");
    var price = size_map.get(id)["price"];
    document.getElementById("cloth-price").innerHTML = `Rs ${price}`;
    selected_size = id;
}

function getDetails(id){

        $.ajax({
            url: `/api/seller/clothes/${id}`,
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
        url: `/api/seller/clothes/images/${id}`,
        type: "GET",
        success: function(data){
            console.log(data);
            var main_image = data[0];
            console.log(main_image);
            document.getElementById("cloth-main-image").setAttribute("src",main_image);
        },
        error: function(data){
            displayError("Image Not Loaded");
        }
    });
}

function getStock(id){
        
        $.ajax({
              url: `/api/clothes/stock/${id}`,  
              type: "GET",
              success: function(data){
                  console.log(data);
                  stock = data;
                  createStock();
              }
        })
}








function changeHeading(){
    console.log(1);
    var modal = $("#changeHeading");
    modal.modal("show");
    document.getElementById("new-heading").value = cached_cloth["name"];
    document.getElementById("new-category").value = cached_cloth["category"];
    document.getElementById("new-brand").value = cached_cloth["brand"];
    document.getElementById("new-short_description").value = cached_cloth["short_description"];
    document.getElementById("new-long_description").value = cached_cloth["long_description"];
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
    var new_long_description = document.getElementById("new-long_description").value;


    if(new_heading != cached_cloth["name"])isChanged = true;
    if(new_category != cached_cloth["category"])isChanged = true;
    if(new_brand != cached_cloth["brand"])isChanged = true;
    if(new_short_description != cached_cloth["short_description"])isChanged = true;
    if(new_long_description != cached_cloth["long_description"])isChanged = true;


    if(isChanged){
        const data = {
            heading : new_heading,
            category : new_category,
            brand : new_brand,
            short_description: new_short_description,
            long_description: new_long_description,
        };
        $.ajax({
            url : `/api/seller/clothes/heading/${id}`,
            type: "PUT",
            data: data,
            success: function(data){
                cached_cloth["name"] = new_heading;
                cached_cloth["category"] = new_category;
                cached_cloth["brand"] = new_brand;
                cached_cloth["short_description"] = new_short_description;
                cached_cloth["long_description"] = new_long_description; 
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






getImages(id)
getDetails(id)



