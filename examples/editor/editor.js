const store = window.top.__store__;

const md = require('../md/demo.md');
const _ = require('lodash');


import VMarkdown from 'vmarkdown-parse';
const vmarkdown = new VMarkdown({
    config: {
        root: {
            tagName: 'main',
            className: 'markdown-body'
        }
    }
});



(async function () {

    // const mdast = processor.parse(md);
    // localStorage.setItem("markdown", md);

    const editor = new CodeMirrorEditor(document.getElementById('editor'), {
        // value: md,
        lineNumbers: true,
        // firstLineNumber: 0
    });


    editor.on('cursorChange', function (cursor) {
        console.log(cursor);
        // localStorage.setItem("cursorChange", JSON.stringify(cursor));
        // store.$emit('vmarkdown/activeTo', cursor);
    });

    function onScroll() {
        // console.log(editor.getFirstVisibleLine());
        // localStorage.setItem("cursor", JSON.stringify(cursor));
        // localStorage.setItem("markdown", editor.getValue());
        // localStorage.setItem("firstVisibleLineChange", editor.getFirstVisibleLine());
        const firstVisibleLine = editor.getFirstVisibleLine();
        // store.$emit('vmarkdown/scrollTo', firstVisibleLine);

        const node = vmarkdown.findNode({
            line: firstVisibleLine,
            column: 1
        }, {
            boundary: true,
            next: true
        });

        let coverageRatio = 0;
        if(node) {
            const position = node.position;
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            coverageRatio = (currentLine-startLine)/allLine;
        }

        store.$emit('scrollTo', {
            firstVisibleLine: firstVisibleLine,
            node: node,
            coverageRatio: coverageRatio
        });


    }

    editor.on('scroll', onScroll);
    // editor.on('scroll', _.throttle(onScroll, 300));

    async function onChange() {
        // localStorage.setItem("change", editor.getValue());
        // store.$emit('vmarkdown/parse', editor.getValue());

        const value = editor.getValue();
        const vast = await vmarkdown.process(value);
        store.$emit('change', vast);

    }

    editor.on('change', _.debounce(onChange, 300));

    // window.open('/preview.html')

    editor.setValue(md);

    // localStorage.setItem("refresh", true);

})();
