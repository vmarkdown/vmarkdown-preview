const VMarkDown = require('../www/vmarkdown.30476d468b942c0bdb31.min');
const vmarkdown = new VMarkDown({
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
    }
});

import Preview from '../../src/vamrkdown-preview';
const preview = new Preview({
    scrollContainer: window //'#preview'
});

function scrollTo(firstVisibleLine) {
    const node = vmarkdown.findNodeFromLine(firstVisibleLine);
    preview.scrollTo(node, firstVisibleLine);
}

function activeTo(cursor) {
    const node = vmarkdown.findNode(cursor);
    preview.activeTo(node, cursor);
}

const app = new Vue({
    el: '#preview',
    data: {
        vdom: null
    },
    methods: {
        async setValue(md) {
            const h = this.$createElement;
            const vdom = await vmarkdown.render(md, {h: h});
            this.vdom = vdom;
        },

    },
    render(h) {
        return this.vdom;
    },
    mounted() {
        const self = this;
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
            activeTo(cursor);
            break;
        }
        case 'firstVisibleLineChange':{
            let firstVisibleLine = parseInt(value, 10);
            scrollTo(firstVisibleLine);
            break;
        }
    }
});





