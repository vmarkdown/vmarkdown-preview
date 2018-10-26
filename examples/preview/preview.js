// require('github-markdown-css');
// var style = require("style/useable!css!./file.css");

// const theme = require('../theme/concise.theme.css');
// theme.use();
// setTimeout(function () {
//     theme.unuse();
// }, 3000);

const $ = require('jquery');

const themes = {
    GitHub: require('../theme/GitHub.theme.css'),
    GitHub2: require('../theme/GitHub2.theme.css'),
    concise: require('../theme/concise.theme.css'),
    kevinburke: require('../theme/kevinburke.theme.css'),
    Clearness: require('../theme/Clearness.theme.css'),
    ClearnessDark: require('../theme/Clearness Dark.theme.css'),
    SolarizedDark: require('../theme/Solarized (Dark).theme.css'),
    SolarizedLight: require('../theme/Solarized (Light).theme.css'),
    marxico: require('../theme/marxico.theme.css')
};

themes.GitHub.use();

const theme = new Vue({
    el: '#theme',
    data: function () {
        const _themes = [];
        Object.keys(themes).forEach(function (name) {
            _themes.push({
                name: name,
                theme: themes[name]
            });
        });
        return {
            theme: 'GitHub',
            themes: _themes
        };
    },
    watch: {
        theme(newVal, oldVal) {
            const oldTheme = themes[oldVal];
            oldTheme.unuse();

            const newTheme = themes[newVal];
            newTheme.use();
        }
    },
    mounted() {

    }
});

// let theme = null;
// $('#theme').on('change', function () {
//     const name = $(this).find("option:selected").text();
//     // debugger
//
//     if(theme) theme.unuse();
//
//     theme = themes[name];
//     theme.use();
//
// });


// setTimeout(function () {
//     theme.use();
//     debugger
//     theme.unuse();
// }, 3000);

const VMarkDown = require('vmarkdown');

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    scrollContainer: window //'#preview'
});

const app = new Vue({
    el: '#preview',
    data: {
        vdom: null
    },
    methods: {
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
            pluginManager: {
                load: function (plugins) {

                    Object.keys(plugins).forEach(function (name) {

                        Vue.component(name, {
                            name: name,
                            props: {
                                'lang': {
                                    type: String,
                                    default: ''
                                },
                                'code': {
                                    type: String,
                                    required: true
                                }
                            },
                            data() {
                                return {
                                    result: this.code || ''
                                }
                            },
                            render(h) {
                                return h('pre', {
                                    'class': [name]
                                }, [
                                    h('code', {
                                        'class': [],
                                        domProps:{
                                            innerHTML: this.result
                                        }
                                    })
                                ]);
                            }
                        });

                    });




                }
            },
            rootClassName: 'markdown-body'
        });
        self.vmarkdown = vmarkdown;


        const md = localStorage.getItem('change');
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





