
function getDetails(id){

    $.ajax({
        url: `/api/clothes/${id}`,
        type: "GET",
        success: function(data){
            return data;
        },
        error: function(data){
            console.log(data);
        }
    });
}