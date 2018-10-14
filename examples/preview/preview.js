import Preview from '../../src/vamrkdown-preview';

import VMarkDown from './vmarkdown';

const vmarkdown = new VMarkDown();





const preview = new Preview('#preview', vmarkdown);

const md = require('../md/demo.md');
preview.setValue(md);

// setTimeout(function () {
//     preview.scrollToLine(28);
// }, 3000);




window.addEventListener("storage", function(event){
    var key = event.key;
    let value = event.newValue;
    if(key === 'markdown') {
        // render(value);
        preview.setValue(value);
    }
    else if (key === 'cursor') {
        let cursor = JSON.parse(value);
        // active(cursor);
        preview.activeTo(cursor);
    }
    else if (key === 'firstVisibleLine') {
        // let cursor = JSON.parse(event.newValue);
        // active(cursor);
        let line = parseInt(event.newValue, 10);
        // scrollIntoView(value)
        preview.scrollToLine(line);
    }
});



// const NodeUtil = require("./node");
//
// setTimeout(function () {
//     // preview.setValue(md.replace('马克飞象','======='));
//
//
//
//     const node = NodeUtil.findNodeFromLine(preview.hast, 10);
//
//
//     console.log(node);
//
//     const id = node.properties.id;
//
//     const dom = document.getElementById(id);
//
//     if(dom) {
//         dom.scrollIntoView();
//     }
//
//
//
//
// }, 3000);

// const vremark = require('vremark');

// vremark('', {})


// const unified = require('unified');
// const parse = require('remark-parse');
// const math = require('remark-math');
// const html = require('remark-html');
// const toHAST = require('mdast-util-to-hast');
//
// const processor = unified()
//     .use(parse, {}).use(math, {}).use(html);
//
// const md = require('../md/test.md');
//
// // const mdast = processor.parse(md);
// // const content = processor.runSync(mdast);
// (function () {
//     const mdast = processor.parse(md);
//     const mdastExt = processor.runSync(mdast);
//
//     console.log(mdastExt);
//
//
//     const hast = toHAST(mdastExt);
//     console.log(hast);
// })();
//
// processor.process(md, function(err, file) {
//     if (err) throw err;
//     // console.log(String(file))
//
//     const html = file.contents;
//
//     document.getElementById('preview').className = 'markdown-body';
//     document.getElementById('preview').innerHTML = html;
//
// });



