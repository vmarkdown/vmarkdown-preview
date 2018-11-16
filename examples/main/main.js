require('./css/photon.css');

require('./main.scss');

setTimeout(function () {


}, 3000);

let status = false;

function enterPreview() {
    document.getElementById('editor-panel').style.display = 'none';
    document.getElementById('preview-panel').style.width = '100%';
    localStorage.setItem('enterPreview', 'true'+new Date().getTime());
}

function leavePreview() {
    document.getElementById('editor-panel').style.display = 'block';
    document.getElementById('preview-panel').style.width = '50%';
    localStorage.setItem('leavePreview', 'true'+new Date().getTime());
}

document.getElementById('desktop').addEventListener('click', function () {

    if(status) {
        leavePreview();
    }
    else{
        enterPreview();
    }
    status = !status;

}, false);