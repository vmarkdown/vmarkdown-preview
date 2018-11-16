require("github-markdown-css");
require('./vmarkdown-preview.scss');

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
// Vue.use(VueScrollTo);
// import Component from './vmarkdown-preview.vue';
// export default Component;
Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});

const VMarkDown = require('vmarkdown');
Vue.use(VMarkDown);

const vmarkdown = new VMarkDown({
    config: {
        root: {
            tagName: 'article',
            className: 'markdown-body'
        }
    }
});


export default Vue.extend({
    // data () {
    //     return {
    //         msg: 'Hello world!'
    //     }
    // },
    beforeMount(){
        const self = this;
        vmarkdown.h = self.$createElement;
    },
    methods: {
        async setValue(md) {
            this.vdom = await vmarkdown.process(md);
            this.$forceUpdate();
        },
        scrollTo() {

            // const options = {
            //     // container: 'document.documentElement',
            //     easing: 'ease-in',
            //     // offset: -60,
            //     force: true,
            //     cancelable: true,
            //     onStart: function(element) {
            //         // scrolling started
            //     },
            //     onDone: function(element) {
            //         // scrolling is done
            //     },
            //     onCancel: function() {
            //         // scrolling has been interrupted
            //     },
            //     x: false,
            //     y: true
            // };

            // const cancelScroll = this.$scrollTo('.language-sequence', 3000, options);

            const cancelScroll = this.$scrollTo('.language-sequence');


        }
    },
    render(h) {
        return this.vdom || h('div', {}, 'loading...');
    },
    mounted() {






    }
});
