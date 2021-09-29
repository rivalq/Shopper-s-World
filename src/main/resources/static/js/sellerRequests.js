
const clothmap = new Map();

function getRow(row){
    var template = `
    <tr id = "request-${row["request_id"]}-${row["cloth_id"]}" >
        <td>${clothmap.get(row["cloth_id"])["name"]}</td>
        <td>${row["size"]}</td>
        <td>${row["quantity"]}</td>
        <td>${row["price"]}</td>
    `;
    if(row["status"] == 0){
        template += "</tr>";
        var table = document.getElementById("pending-table").getElementsByTagName("tbody")[0];
        var newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = template;
        return;
    }else{
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
        var table = document.getElementById("older-table").getElementsByTagName("tbody")[0];
        var newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = template;
    }
   
}


window.onload = () =>{
    

    $.ajax({
        url: "/api/seller/requests",
        type: "GET",
        success: async function(data){
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
                    getRow(data[i]);
                }
            }   
        }
    });
};
