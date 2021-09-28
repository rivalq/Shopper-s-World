
clothmap = new Map();

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
            <button class = "btn btn-primary" id = "modal-${row["request_id"]}-${row["cloth_id"]}"  >Review Cloth</button>
        </td>
    </tr>
    `;
    var table = document.getElementById("request-table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = template;
    document.getElementById(`modal-${row["request_id"]}-${row["cloth_id"]}`).addEventListener("click",reviewCloth);
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
                            console.log(1);
                            flag = 1;
                        }
                    });
                    if(!flag)getRow(data[i],i + 1);
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