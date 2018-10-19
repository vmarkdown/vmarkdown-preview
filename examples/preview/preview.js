const md = require('../md/demo.md');

// import VMarkDown from 'vmarkdown';
const vmarkdown = new VMarkDown();

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    scrollContainer: window //'#preview'
});

const app = new Vue({
    el: '#preview',
    render(h) {
        return vmarkdown.compile(h);
    }
});

vmarkdown.on('change', function (value) {
    app.$forceUpdate();
});

vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
    const node = vmarkdown.findNodeFromLine(firstVisibleLine);
    preview.scrollTo(node);
});

vmarkdown.on('cursorChange', function (cursor) {
    const node = vmarkdown.findNode(cursor);
    preview.activeTo(node, cursor);
});

vmarkdown.setValue(md);

window.addEventListener("storage", function(event){
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





