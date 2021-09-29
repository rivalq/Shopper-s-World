
const clothmap = new Map();
const requestmap = new Map();

var accept_current_id  = 0;
var row_index = 0;
var reject_current_id = 0;
// For pending
function getRow(row,counter){


    const template = `
    <tr id = "request-${row["request_id"]}-${row["cloth_id"]}" >
        <td>${row["seller"]}</td>
        <td>${clothmap.get(row["cloth_id"])["name"]}</td>
        <td>${row["size"]}</td>
        <td>${row["quantity"]}</td>
        <td>${row["price"]}</td>
        <td>
                <button class = "btn btn-primary" id = "review-${row["request_id"]}-${row["cloth_id"]}">Review Cloth</button>
                <button class = "btn btn-success" id = "accept-${row["request_id"]}-${row["cloth_id"]}" >Accept</button>
                <button class = "btn btn-danger" id = "reject-${row["request_id"]}-${row["cloth_id"]}">Reject</button>
        </td>
    </tr>
    `;
    var table = document.getElementById("request-table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = template;
    document.getElementById(`review-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",reviewCloth);
    document.getElementById(`accept-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",acceptCloth);
    document.getElementById(`reject-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",rejectModal);
}

// For older
function getRow2(row,counter){
    var template = `
    <tr id = "request-${row["request_id"]}-${row["cloth_id"]}" >
        <td>${row["seller"]}</td>
        <td>${clothmap.get(row["cloth_id"])["name"]}</td>
        <td>${row["size"]}</td>
        <td>${row["quantity"]}</td>
        <td>${row["price"]}</td>
    `;
    if(row["result"] == 1){
        // accepted
        template += `<td>Accepted
                        <svg class="MuiSvgIcon-root jss312" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                    </td>`;
    }else{
        template += `<td>Rejected
                            <svg  class="MuiSvgIcon-root" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" viewBox="0 0 24 24">
                                <line x1="6" y1="6" x2="20" y2="20" stroke="red" stroke-width="2" />
                                <line x1="20" y1="6" x2="6" y2="20" stroke="red" stroke-width="2" />
                            </svg>
                    </td>`
    }
    template += "</tr>";
    var table = document.getElementById("static-request-table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = template;
}


window.onload = () =>{
    

    $.ajax({
        url: "/api/admin/requests",
        type: "GET",
        success: async function(data){
            console.log(data);
            var counter_1 = 0;
            var counter_2 = 0;
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
                        if(data[i]["status"] == 0){
                            counter_1++;
                            getRow(data[i],counter_1);
                        }else{
                            counter_2++;
                            getRow2(data[i],counter_2);
                        }
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
    row_index = event.target.parentNode.parentNode.rowIndex;
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
            request["result"] = 1;
            document.getElementById("request-table").deleteRow(row_index);
            getRow2(request);
            closeacceptModal();
            displaySuccess("Cloth added to MarketPlace");
        },
        error: function(data){
            displayError("Some Error Occured");
        }
    });

}




function rejectModal(event){
    var modal = $("#reject-request");
    modal.modal("show");
    row_index = event.target.parentNode.parentNode.rowIndex;
    var id = event.target.id.split("-")[1];
    reject_current_id = id;
}

function closerejectModal(){
    var modal = $("#reject-request");
    modal.modal("hide");
}

function rejectRequest(){
    const request = requestmap.get(Number(reject_current_id));
    $.ajax({
        url: `/api/admin/reject_request/${reject_current_id}`,
        type: "POST",
        success: function(data){
            request["result"] = 0;
            document.getElementById("request-table").deleteRow(row_index);
            getRow2(request);
            closerejectModal();
            displayInfo("Request Rejected");
        },
        error: function(data){
            displayError("Some Error Occured");
        }
    })
}