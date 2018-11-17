require('./css/photon.css');

require('./main.scss');

const store = require('./store');
window.__store__ = store;

const editorIFrame = document.getElementById('editor-iframe');
const previewIFrame = document.getElementById('preview-iframe');

editorIFrame.src = 'editor.html';
previewIFrame.src = 'preview.html';

editorIFrame.onload = function () {

};
previewIFrame.onload = function () {
    // const md = require('../md/demo.md');
    // store.dispatch('vmarkdown/parse', md);
    // store.$emit('vmarkdown/parse', md);
};


let status = 'all';

document.getElementById('btn-preview').addEventListener('click', function () {

    if(status === 'all'){
        document.getElementById('editor-panel').style.display = 'none';
        document.getElementById('preview-panel').style.width = '100%';
        status = 'preview';
    }
    else{
        document.getElementById('editor-panel').style.display = 'block';
        document.getElementById('preview-panel').style.width = '50%';
        status = 'all';
    }

});


// setTimeout(function () {
//
//
// }, 3000);
//
// let status = false;
//
// function enterPreview() {
//     document.getElementById('editor-panel').style.display = 'none';
//     document.getElementById('preview-panel').style.width = '100%';
//     localStorage.setItem('enterPreview', 'true'+new Date().getTime());
// }
//
// function leavePreview() {
//     document.getElementById('editor-panel').style.display = 'block';
//     document.getElementById('preview-panel').style.width = '50%';
//     localStorage.setItem('leavePreview', 'true'+new Date().getTime());
// }
//
// document.getElementById('desktop').addEventListener('click', function () {
//
//     if(status) {
//         leavePreview();
//     }
//     else{
//         enterPreview();
//     }
//     status = !status;
//
// }, false);