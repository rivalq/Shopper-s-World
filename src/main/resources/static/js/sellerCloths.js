
var cloths_ids = [];
var open_request = null;

async function createCloth(cloth_id){

    const cloth = await $.ajax({
        url : `/api/seller/clothes/${cloth_id}`,
        type: "GET",
    });
    const url = await $.ajax({
        url : `/api/seller/clothes/images/${cloth_id}`,
        type: "GET",
    });
    cloths_ids.push(cloth_id);
    const template = `
        <div id = "seller-cloth-${cloth_id}" class="row mb-4 shadow rounded" style = "background-color:white">
            <div class="col">
                <div class="row">
                    <div class="col-sm-auto  p-2">
                            <img src = "${url}" alt = "Not found" width = "200" height = "200">
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                    <div class="row">
                                        <div class="col-sm-auto pt-3 fs-4 fw-bold text-warp ">${cloth.name}</div>
                                    </div>
                            </div>
                            <div class="col">
                                <div class="row mt-4 float-end">
                                    <div class="col">
                                        <ul id = "${cloth_id}-dots" class = "sellerCloths-drpdwn">
                                            <li class = "sellerCloths-dots"></li>
                                            <li class = "sellerCloths-dots"></li>
                                            <li class = "sellerCloths-dots"></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="row float-end mt-5" style="position: relative;width: 170px;">
                                        <div id = "${cloth_id}-menu" class="col border rounded shadow-lg bg-white py-2 sellerCloths-menu hide">
                                            <div class="row p-2 sellerCloths-dwnmenu">
                                                <div id = "${cloth_id}-open" class="col">Open Cloth</div>
                                            </div>
                                            <div class="row p-2 sellerCloths-dwnmenu">
                                                <div id = "${cloth_id}-delete" class="col">Delete</div>
                                            </div>
                                            <div class="row p-2 sellerCloths-dwnmenu">
                                                <div id = "${cloth_id}-request"  class="col">Sell it to Market</div>
                                            </div>
                                        </div>
                                </div>
                            
                            </div>
                        </div>
                        <div class="row mt-2">
                                <div id = "cloth-brand" class="col-sm-auto text-wrap">${cloth.brand}</div>
                                <div id = "cloth-category" class="col-sm-auto text-wrap">${cloth.category}</div>
                        </div>
                        <div class="row mt-4 mb-4">
                                <div class="col-sm-auto text-wrap">
                                    ${cloth.short_description}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const child = document.createElement("Cloth");
    child.innerHTML = template;
    
    document.getElementById("list-body").appendChild(child);
    document.getElementById(`${cloth_id}-dots`).addEventListener("click",dots);
    document.getElementById(`${cloth_id}-open`).addEventListener("click",openCloth);
    document.getElementById(`${cloth_id}-delete`).addEventListener("click",deleteCloth);
    document.getElementById(`${cloth_id}-request`).addEventListener("click",openModel);

}




window.onload = () => {
       $.ajax({
           url: "/api/seller/clothes",
           type: "GET",
           success: async function(data){
                for(var i = 0; i < data.length; i++){
                    const result = await createCloth(data[i]);
                }
           }
       }) 
};

function manangeMenu(id){
        var elem = document.getElementById(id);
        if(elem.classList.contains("hide")){
            elem.classList.remove("hide");
            open_menu = id.split("-")[0];
        }else{
            elem.classList.add("hide");
            open_menu = null;
        }
}

function dots (event){
        var id = event.target.id.split("-")[0];
        manangeMenu(id + "-menu");
}

function openCloth(event){
    var id = event.target.id.split("-")[0];
    window.location.href = "/seller/clothes/" + id;
}

function deleteCloth(event){
    var id = event.target.id.split("-")[0];
    $.ajax({
        url: "/api/seller/clothes/" + id,
        type: "DELETE",
        success: function(data){
            console.log(data);
            document.getElementById(`seller-cloth-${id}`).remove();
            displaySuccess("Cloth deleted Succefully");
        },
        error: function(data){
            displayError("Some Error Occured");
        }
    });
}


function openModel(event){
    var id = event.target.id.split("-")[0];
    open_request = id;
    var modal = $("#send-request");
    modal.modal("show");
}


function closemodel(event){
    var modal = $("#send-request");
    modal.modal("hide");
    open_request = null;
}


function sendRequest(){
    console.log(open_request);
    var size = document.getElementById("request-size").value;
    var quantity = document.getElementById("request-quantity").value;
    var price = document.getElementById("request-price").value;
    if(size == ""){
            displayError("Please fill Size field");
    }else if(quantity <= 0){
            displayError("Quantity should be greater than 0");
    }else if(price <= 0){
            displayError("Price should be greater than 0")
    }else{
            const data = {
                size: size,
                quantity: quantity,
                price: price,
                cloth_id: open_request,
            };
            $.ajax({
                url : "/api/request",
                type : "POST",
                data: data,
                success: function(data){
                    displaySuccess("Request Sent Succesfully");
                },
                error: function(data){
                    displayError("Some Error Occured");
                }
            })
            closemodel();
    }
}