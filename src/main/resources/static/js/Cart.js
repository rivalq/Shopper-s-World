

var username = window.location.href.split("/").at(-1);




async function getCartCard(cart){
    var id = cart["cloth_id"];

    const cloth = await $.ajax({
            url: `/api/clothes/${id}`,
            type: "GET",
    });
    const url = await $.ajax({
        url: `/api/clothes/images/${id}`,
        type: "GET",
    })

    var name = cloth["name"];
    var brand = cloth["brand"];
    var category = cloth["category"];
    var size = cart["size"];
    var price = cart["price"];

    const template = `
    <div class="row border-bottom">
    <div class="col-sm-auto p-2">
            <img id = "cloth-image-${id}-${size}" src = "/images/${url}" alt = "Not found" width = "200" height = "200">
    </div>
    <div class="col">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div id = "cloth-name-${id}-${size}" class="col-sm-auto pt-3 fs-4 fw-bold text-warp "> ${name} </div>
                    </div>
                </div>
                <div id = "cloth-quantity-${id}-${size}"  class="col-sm-auto offset-sm-3">Button</div>
            </div>
            <div class="row mt-2">
                <div id = "cloth-brand-${id}-${size}" class="col-sm-auto text-wrap">${brand}</div>
                <div id = "cloth-category-${id}-${category}" class="col-sm-auto text-wrap">${category}</div>
            </div>
            <div class="row mt-2">
                <div class="col-sm-auto">
                    Size: ${size}
                </div>
            </div>
            <div class="row mt-5 mb-3 align-items-end">
                <div class="col-sm-3">
                    Remove item
                </div>
                <div class="col-sm-auto offset-sm-6">
                    Rs ${price}
                </div>
            </div>
    </div>
    </div>
    `;
    var child = document.createElement("cart-card");
    child.innerHTML = template;
    console.log(child);

    
    document.getElementById("cart-body").appendChild(child);
       
   
}

function getCart(username){

        

        $.ajax({
            url : `/api/cart/${username}`,
            type: "GET",
            success: function(data){
                var n = data.length;
                for(var i = 0; i < n; i++){
                    getCartCard(data[i]);
                }
            }
        });
}
getCart(username);

