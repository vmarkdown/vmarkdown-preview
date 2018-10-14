const md = require('../md/demo.md');

// import VMarkDown from 'vmarkdown';
const vmarkdown = new VMarkDown();

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    // vmarkdown: vmarkdown,
    // markdownContainer: '#preview',
    scrollContainer: window //'#preview'
});


// let markdown = '';
//
const app = new Vue({
    el: '#preview',
    render(h) {
        return vmarkdown.compile(h);
    }
});
//
//
vmarkdown.on('change', function (value) {
    // markdown = value;
    app.$forceUpdate();
});

vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
    const node = vmarkdown.findNodeFromLine(firstVisibleLine);
    if(!node) return;
    const id = node.properties.id;
    preview.scrollTo('#'+id);
});

vmarkdown.on('cursorChange', function (cursor) {
    // self.activeTo(cursor);
    const node = vmarkdown.findNode(cursor);
    if(!node) return;
    const id = node.properties.id;
    preview.activeTo('#'+id);
});

vmarkdown.setValue(md);

window.addEventListener("storage", function(event){

    // console.log(event);

    const key = event.key;
    const value = event.newValue;
    switch (key) {
        case 'change':{
            vmarkdown.setValue(value);
            break;
        }
        case 'cursorChange':{
            let cursor = JSON.parse(value);
            vmarkdown.emit('cursorChange', cursor);
            break;
        }
        case 'firstVisibleLineChange':{
            let firstVisibleLine = parseInt(value, 10);
            vmarkdown.emit('firstVisibleLineChange', firstVisibleLine);
            break;
        }
    }
});











// setTimeout(function () {
//     // vmarkdown.setValue('# h1===\n## h3\n## h2');
//     // vmarkdown.emit('firstVisibleLineChange', 20);
//
//     vmarkdown.emit('cursorChange', {
//         line: 7,
//         column: 7
//     });
//
//     vmarkdown.emit('cursorChange', {
//         line: 8,
//         column: 7
//     });
//
// }, 3000);





















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


