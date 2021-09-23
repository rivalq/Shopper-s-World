

function getPermissions(){
    $.ajax({
        url: "/api/permission",
        type: "GET",
        success: function(data){
            return data;
        },
        error: function(data){
            window.location.href = "/login";
        }
    })
}