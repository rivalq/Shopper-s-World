function displayError(message){
    iziToast.error({
        title: 'Error',
        message: message,
    });
}
 

function displaySuccess(message){
    iziToast.success({
        title: 'Success',
        message: message,
    });
}

function displayInfo(message){
    iziToast.info({
        title: 'Info',
        message: message,
    });
}
