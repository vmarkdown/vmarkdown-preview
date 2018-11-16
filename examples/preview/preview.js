require("github-markdown-css");

const $ = require('jquery');

const Vue = require('vue').default;
// const themes = require('./themes.js');
// const theme = new Vue({
//     el: '#theme',
//     data: function () {
//         return {
//             theme: null,
//             themes: themes
//         };
//     },
//     watch: {
//         theme(newTheme, oldTheme) {
//             if(oldTheme){
//                 oldTheme.css.unuse();
//                 oldTheme.rootClassName && $('#preview').removeClass(oldTheme.rootClassName);
//             }
//
//             newTheme.css.use();
//             newTheme.rootClassName && $('#preview').addClass(newTheme.rootClassName);
//         }
//     },
//     mounted() {
//         this.theme = themes[0];
//     }
// });

import Preview from '../../src/vmarkdown-preview';
const preview = new Preview({
    scrollContainer: window //'#preview'
});

const VMarkDown = require('vmarkdown');
Vue.use(VMarkDown);

const vmarkdown = new VMarkDown({
    config: {
        root: {
            tagName: 'main',
            className: 'markdown-body'
        }
    }
});

// requirejs([
//     'vremark-plugin-highlight'
// ], function () {
//     Array.prototype.slice.call(arguments).forEach(function (plugin) {
//         vmarkdown.registerPlugin(plugin);
//     });
//     setTimeout(function () {
//         app.refresh();
//     }, 2000);
// });

const app = new Vue({
    el: '#app',
    data: {
        vdom: null
    },
    methods: {
        refresh(value) {
            const self = this;
            // console.time('refresh');
            // const vdom = self.vmarkdown.refresh();
            // console.timeEnd('refresh');
            // self.vdom = vdom;
            self.setValue(value || this.value);
        },
        async setValue(md) {
            this.value = md;
            const vdom = await this.vmarkdown.process(md);
            this.vdom = vdom;
        },
        scrollTo(firstVisibleLine) {
            const self = this;
            const node = this.vmarkdown.findNodeFromLine(firstVisibleLine);
            preview.scrollTo(self, node, firstVisibleLine);
        },
        activeTo(cursor) {
            const self = this;
            const node = this.vmarkdown.findNode(cursor);
            preview.activeTo(self, node, cursor);
        }
    },
    render(h) {
        return this.vdom;
    },
    beforeMount(){
        const self = this;
        const h = self.$createElement;
        vmarkdown.h = h;
        self.vmarkdown = vmarkdown;
        // vmarkdown.$on('refresh', function (value) {
        //     self.refresh(value);
        // });
    },
    mounted() {
        const self = this;

        // const h = this.$createElement;
        // const vmarkdown = new VMarkDown({
        //     // h: h,
        //     // pluginManager: null,
        //     // rootClassName: 'markdown-body',
        //     // hashid: true
        //     config: {
        //         root: {
        //             tagName: 'main',
        //             className: 'markdown-body'
        //         }
        //     }
        // });
        // vmarkdown.h = h;

        // vmarkdown.$on('refresh', function (hast) {
        //     self.refresh(hast);
        // });

        // self.vmarkdown = vmarkdown;

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

// setTimeout(function () {
//     app.scrollTo(163);
// }, 3000);










// import * as VueMenu from '@hscmap/vue-menu'
// Vue.use(VueMenu);
// import Sample1 from './menu.vue';
// Vue.component('mymenu', Sample1);
// const tools = new Vue({
//     el: '#tools',
//     computed: {
//         window() { return window },
//     },
//     data() {
//         return {
//             checked: true,
//             selected: ['A'],
//         }
//     },
//     template: require('./menu.html')
// });


(function () {


    // const tools = new Vue({
    //     el: '#tools',
    //     render(h) {
    //         return h('mymenu',{},'=======')
    //     }
    // });



})();










