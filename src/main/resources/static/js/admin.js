
const clothmap = new Map();
const requestmap = new Map();

var accept_current_id  = 0;

function getRow(row,counter){


    const template = `
    <tr id = "request-${row["request_id"]}-${row["cloth_id"]}" >
        <th scope="row">${counter}</th>
        <td>${row["seller"]}</td>
        <td>${clothmap.get(row["cloth_id"])["name"]}</td>
        <td>${row["size"]}</td>
        <td>${row["quantity"]}</td>
        <td>${row["price"]}</td>
        <td>
                <button class = "btn btn-primary" id = "review-${row["request_id"]}-${row["cloth_id"]}">Review Cloth</button>
                <button class = "btn btn-success" id = "accept-${row["request_id"]}-${row["cloth_id"]}" >Accept</button>
                <button class = "btn btn-danger">Reject</button>
        </td>
    </tr>
    `;
    var table = document.getElementById("request-table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = template;
    document.getElementById(`review-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",reviewCloth);
    document.getElementById(`accept-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",acceptCloth);

}


window.onload = () =>{
    

    $.ajax({
        url: "/api/admin/requests",
        type: "GET",
        success: async function(data){
            console.log(data);
            for(var i = 0; i < data.length; i++){
                    var flag = 0;
                    const cloth = await $.ajax({
                        url: `/api/seller/clothes/${data[i]["cloth_id"]}`,
                        type: "GET",
                        success: function(cloth){
                            clothmap.set(data[i]["cloth_id"],cloth);
                        },
                        error: function(data){
                            flag = 1;
                        }
                    });
                    if(!flag){
                        requestmap.set(data[i]["request_id"],data[i]);
                        getRow(data[i],i + 1);
                    }    
            }
        }
    });
};

function reviewCloth(event){
        var modal = $("#review-cloth");
        var id = event.target.id.split("-")[2];
        document.getElementsByTagName("iframe")[0].setAttribute("src",`/seller/clothes/${id}`);
        modal.modal("show");
}
function acceptCloth(event){
    var modal = $("#accept-cloth");
    var id = event.target.id.split("-")[1];
    modal.modal("show");
    accept_current_id = id;
}

function closeacceptModal(){
    var modal = $("#accept-cloth");
    modal.modal("hide");
}


function acceptRequest(){

    var price = document.getElementById("accept-mrp").value;

    if(price == 0){
        displayError("Price should be greater than 0");
        return;
    }
    const request = requestmap.get(Number(accept_current_id));
    request["price"] = price;
    
    $.ajax({
        url : "/api/admin/accept_request",
        type: "POST",
        contentType : 'application/json',
        datatype: "json",
        data: JSON.stringify(request),
        success: function(data){
            displaySuccess("Cloth added to MarketPlace");
            closeacceptModal();
        },
        error: function(data){
            displayError("Some Error Occured");
        }
    });

}
