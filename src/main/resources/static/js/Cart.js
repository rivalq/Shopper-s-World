

var username = window.location.href.split("/").at(-1);

function createCartCard(cloth){

    var id = cloth["id"];
    var url = cloth["url"];
    var name = cloth["name"];
    var brand = cloth["brand"];
    var category = cloth["category"];
    var size = cloth["size"];
    var price = cloth["price"];
    const template = `
    <div class="row">
    <div class="col-sm-auto bg-primary p-2">
            <img id = "cloth-image-${id}-${size}" src = "${url}" alt = "Not found" width = "200" height = "200">
    </div>
    <div class="col bg-info">
           <div class="row">
               <div class="col bg-primary">
                    <div class="row">
                        <div id = "cloth-name-${id}-${size}" class="col-sm-auto pt-3 fs-4 fw-bold text-warp "> ${name} </div>
                    </div>
               </div>
               <div id = "cloth-quantity-${id}-${size}"  class="col-sm-auto offset-sm-3 bg-white">Button</div>
           </div>
           <div class="row mt-2">
                <div id = "cloth-brand-${id}-${size}" class="col-sm-auto text-wrap">${brand}</div>
                <div id = "cloth-category-${id}-${category}" class="col-sm-auto text-wrap">${category}</div>
           </div>
           <div class="row mt-2">
               <div class="col-sm-auto">
                    Size
               </div>
           </div>
           <div class="row mt-5 mb-3 align-items-end">
                <div class="col-sm-3">
                    Remove item
                </div>
                <div class="col-sm-auto offset-sm-6">
                    ${price}
                </div>
            </div>
    </div>
    </div>
    `;
    return template;
}

function getCart(username){

        $.ajax({
            url : `/api/cart/${username}`,
            type: "GET",
            success: function(data){
                console.log(data);
            }
        });

}

cloth = new Object();
cloth["name"] = "Tuxedo";
cloth["id"] = 1;
cloth["url"] = "/images/1_1.jpg";
cloth["brand"] = "black-lapel";
cloth["category"] = "Suit";
cloth["size"] = "X";
cloth["price"] = 4000;


var child = document.createElement("card-card");
child.innerHTML = createCartCard(cloth);
var elem = document.getElementById("cart-body");
elem.appendChild(child);
