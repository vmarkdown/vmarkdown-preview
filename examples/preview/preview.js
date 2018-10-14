import VMarkDown from 'vmarkdown';
const vmarkdown = new VMarkDown();

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    container: '#preview',
    scrollContainer: '#preview',
    vmarkdown: vmarkdown
});

window.addEventListener("storage", function(event){
    const key = event.key;
    const value = event.newValue;
    if(key === 'markdown') {
        vmarkdown.setValue(value);
    }
    else if (key === 'cursor') {
        let cursor = JSON.parse(value);
        preview.activeTo(cursor);
    }
    else if (key === 'firstVisibleLine') {
        let line = parseInt(event.newValue, 10);
        preview.scrollToLine(line);
    }
});


