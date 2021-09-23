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



getImages(id)
getDetails(id)
getStock(id)



