require("github-markdown-css");
require('./vmarkdown-preview.scss');

const $ = require('jquery');
require('jquery.scrollto');
require('jquery.easing');

$.scrollTo && $.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 200,
    interrupt: true,
    queue : false
    // easing: 'easeOutQuart'
});

import Vue from 'vue';
import VMarkdown from 'vmarkdown-render';

const ACTIVE_CLASS = 'vmarkdown-preview-active';
const ACTIVE_CLASS_DURATION = 1000;

function _scrollTo(target, options) {
    console.log('_scrollTo');
    if(!target) return;
    $( window ).stop();
    $( window ).stop( true ).scrollTo(target, options);
}

export default Vue.extend({
    beforeCreate(){},
    beforeMount() {
        const self = this;
        self.vmarkdown = new VMarkdown({
            h: this.$createElement
        });
    },
    methods: {
        getDom(node) {
            if(!node) return null;
            const self = this;
            if(node.data && node.data.ref) {
                var dom = self.$refs[node.data.ref];
                if(dom && dom._isVue) {
                    dom = dom.$el;
                }
                return dom;
            }
            return null;
        },
        async setValue(vast) {
            this.vdom = await this.vmarkdown.process(vast);
            this.$forceUpdate();
        },
        scrollTo({node, coverageRatio = 0, firstVisibleLine}) {

            if(!firstVisibleLine || firstVisibleLine <= 1) {
                $.scrollTo({
                    top: 0
                });
                return;
            }

            if(!node) {
                return;
            }

            const self = this;
            const target = self.getDom(node);

            const options = {};
            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                });
            }

            _scrollTo(target, options);
        },
        activeTo({node, coverageRatio = 0, cursor}) {
            const self = this;

            if(!node) {
                return;
            }

            const target = self.getDom(node);
            if(!target) return;

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

            _scrollTo(target, options);
        }
    },
    render(h) {
        return this.vdom || h('div', {style:{'text-align':'center'}}, 'loading...');
        // return this.vdom || h('div', {}, ['loading...', this.value]);
    },
    mounted() {
        // const self = this;
        // self.$watch('firstVisibleNode', function (node) {
        //     self.scrollTo(node);
        // });
    }
});
