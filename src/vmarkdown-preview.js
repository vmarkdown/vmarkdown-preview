require("github-markdown-css");
require('./vmarkdown-preview.scss');

const $ = require('jquery');
require('jquery.scrollto');
require('jquery.easing');

$.scrollTo && $.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 100,
    interrupt: true,
    // easing: 'easeOutQuart'
});

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const ACTIVE_CLASS = 'vmarkdown-preview-active';
const ACTIVE_CLASS_DURATION = 1000;


export default Vue.extend({
    // data () {
    //     return {
    //         msg: 'Hello world!'
    //     }
    // },
    computed: {
        vdom () {
            return this.$store.state.vmarkdown.value;
        },
        firstVisibleNode() {
            return this.$store.state.vmarkdown.firstVisibleNode;
        },
    },
    // watch: {
    //     firstVisibleNode(node) {
    //         const self = this;
    //         self.scrollTo(node);
    //     }
    // },
    beforeCreate(){
        // this.vmarkdown = this.$options.vmarkdown;
        this.$store._vue = this;
    },
    beforeMount() {
        const self = this;
        // self.vmarkdown.h = self.$createElement;
        self.$store.commit('vmarkdown/h', self.$createElement);
    },
    methods: {
        getDom(node) {
            if(!node) return null;
            const self = this;
            if(node.data && node.data.ref) {
                var dom = self.$refs[node.data.ref];
                if(dom._isVue) {
                    dom = dom.$el;
                }
                return dom;
            }
            return null;
        },
        async setValue(md) {
            this.vdom = await this.vmarkdown.process(md);
            this.$forceUpdate();
        },
        _scrollTo(target, options) {
            if(!target) return;
            // const self = this;
            $( window ).stop( true ).scrollTo(target, options);




            // if(self.cancelScroll){
            //     self.cancelScroll.stop(true);
            // }

            // const _options = {};
            // if(options.coverageRatio) {
            //     _options.over = {
            //         top: options.coverageRatio
            //     }
            // }
            // if(options.coverageRatio) {
            //     _options.over = {
            //         top: options.coverageRatio
            //     }
            // }

            // self.cancelScroll = $.scrollTo(target, options);
        },
        __scrollTo(firstVisibleLine) {
            if(!firstVisibleLine || firstVisibleLine <= 1) {
                $.scrollTo({
                    top: 0
                });
                return;
            }
            const self = this;
            const node = this.vmarkdown.findNodeFromLine(firstVisibleLine);
            const target = self.getDom(node);
            self._scrollTo(target);
        },
        ___scrollTo(firstVisibleLine) {
            const self = this;
            const target = self.getDom(node);
            self._scrollTo(target);



            // if(self.cancelScroll){
            //     self.cancelScroll.stop();
            // }
            // self.cancelScroll = $.scrollTo(target);
        },
        scrollTo(firstVisibleLine) {

            if(!firstVisibleLine || firstVisibleLine <= 1) {
                $.scrollTo({
                    top: 0
                });
                return;
            }

            const self = this;
            const { node, coverageRatio } = self.$store.getters['vmarkdown/firstVisibleNode'](firstVisibleLine);
            const target = self.getDom(node);

            const options = {};
            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                });
            }
            self._scrollTo(target, options);
        },
        activeTo(cursor) {
            const self = this;

            // if(self.activeEl) {
            //     self.activeEl.removeClass(ACTIVE_CLASS);
            // }

            const { node, coverageRatio } = self.$store.getters['vmarkdown/activeNode'](cursor);

            const target = self.getDom(node);
            if(!target) return;

            // var $dom = $(target);
            // $dom.addClass(ACTIVE_CLASS);
            // self.activeEl = $dom;
            // if($dom.length === 0) {
            //     return;
            // }

            // $(target).addClass(ACTIVE_CLASS).delay(1000).queue(function (){
            //     $(target).removeClass(ACTIVE_CLASS);
            // });
            var $target = $(target);
            $target.addClass(ACTIVE_CLASS);
            setTimeout(function () {
                $target.removeClass(ACTIVE_CLASS);
            }, ACTIVE_CLASS_DURATION);

            const options = {};

            if(cursor) {
                Object.assign(options, {
                    offset: {
                        top: -1 * cursor.top
                    }
                })
            }

            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                })
            }

            self._scrollTo(target, options);
        }
    },
    render(h) {
        return this.vdom || h('div', {}, 'loading...');
        // return this.vdom || h('div', {}, ['loading...', this.value]);
    },
    mounted() {
        // const self = this;
        // self.$watch('firstVisibleNode', function (node) {
        //     self.scrollTo(node);
        // });
    }
});
