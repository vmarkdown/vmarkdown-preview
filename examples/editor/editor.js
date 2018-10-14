const md = require('../md/demo.md');

(async function () {

    // const mdast = processor.parse(md);
    localStorage.setItem("markdown", md);


    const editor = new CodeMirrorEditor(document.getElementById('editor'), {
        value: md,
        lineNumbers: true,
        // firstLineNumber: 0
    });


    editor.on('cursorChange', function (cursor) {

        console.log(cursor);
        localStorage.setItem("cursor", JSON.stringify(cursor));

    });

    function onScroll() {
        console.log(editor.getFirstVisibleLine());
        // localStorage.setItem("cursor", JSON.stringify(cursor));
        // localStorage.setItem("markdown", editor.getValue());
        localStorage.setItem("firstVisibleLine", editor.getFirstVisibleLine());

    }

    editor.on('scroll', _.throttle(onScroll, 300));

    function onChange() {
        localStorage.setItem("markdown", editor.getValue());
    }

    editor.on('change', _.debounce(onChange, 500));


})();