const $ = require('jquery');
const themes = require('./themes.js');

const theme = new Vue({
    el: '#theme',
    data: function () {
        return {
            theme: null,
            themes: themes
        };
    },
    watch: {
        theme(newTheme, oldTheme) {
            if(oldTheme){
                oldTheme.css.unuse();
                oldTheme.rootClassName && $('#preview').removeClass(oldTheme.rootClassName);
            }

            newTheme.css.use();
            newTheme.rootClassName && $('#preview').addClass(newTheme.rootClassName);
        }
    },
    mounted() {
        this.theme = themes[0];
    }
});

const VMarkDown = require('vmarkdown');

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    scrollContainer: window //'#preview'
});

const app = new Vue({
    el: '#app',
    data: {
        vdom: null
    },
    methods: {
        refresh() {
            const self = this;
            console.time('refresh');
            const vdom = self.vmarkdown.refresh();
            console.timeEnd('refresh');
            self.vdom = vdom;
        },
        async setValue(md) {
            const vdom = await this.vmarkdown.process(md);
            this.vdom = vdom;
        },
        scrollTo(firstVisibleLine) {
            const node = this.vmarkdown.findNodeFromLine(firstVisibleLine);
            preview.scrollTo(node, firstVisibleLine);
        },
        activeTo(cursor) {
            const node = this.vmarkdown.findNode(cursor);
            preview.activeTo(node, cursor);
        }
    },
    render(h) {
        return this.vdom;
    },
    mounted() {
        const self = this;

        const h = this.$createElement;
        const vmarkdown = new VMarkDown({
            h: h,
            pluginManager: null,
            rootClassName: 'markdown-body',
            hashid: true
        });

        // vmarkdown.$on('refresh', function (hast) {
        //     self.refresh(hast);
        // });

        self.vmarkdown = vmarkdown;

        const md = localStorage.getItem('change') || require('../md/test.md');
        self.setValue(md);
    }
});

window.addEventListener("storage", function(event){
    const key = event.key;
    const value = event.newValue;
    switch (key) {
        case 'refresh':{
            const md = localStorage.getItem('change');
            app.setValue(md);
            break;
        }
        case 'change':{
            app.setValue(value);
            break;
        }
        case 'cursorChange':{
            let cursor = JSON.parse(value);
            app.activeTo(cursor);
            break;
        }
        case 'firstVisibleLineChange':{
            let firstVisibleLine = parseInt(value, 10);
            app.scrollTo(firstVisibleLine);
            break;
        }
    }
});





