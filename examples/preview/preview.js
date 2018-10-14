// import VMarkDown from 'vmarkdown';
const vmarkdown = new VMarkDown();

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    vmarkdown: vmarkdown,
    markdownContainer: '#preview',
    scrollContainer: window //'#preview'
});


// let markdown = '';
//
// const app = new Vue({
//     el: '#preview',
//     render(h) {
//         return vmarkdown.compile(h);
//     }
// });
//
//
// vmarkdown.on('change', function (value) {
//     // markdown = value;
//     app.$forceUpdate();
// });
//
//
//
// vmarkdown.setValue('# h1');






















// preview.setValue();

// window.addEventListener("storage", function(event){
//     const key = event.key;
//     const value = event.newValue;
//     // if(key === 'markdown') {
//     //     vmarkdown.setValue(value);
//     // }
//     // else if (key === 'cursor') {
//     //     let cursor = JSON.parse(value);
//     //     preview.activeTo(cursor);
//     // }
//     // else if (key === 'firstVisibleLine') {
//     //     let line = parseInt(event.newValue, 10);
//     //     preview.scrollToLine(line);
//     // }
//
//
//     switch (key) {
//         case 'change':{
//             break;
//         }
//         case 'cursorChange':{
//             break;
//         }
//         case 'firstVisibleLineChange':{
//             break;
//         }
//     }
// });


