require("github-markdown-css");
require('./vmarkdown-preview.scss');

require("./loading/loading.css");

const $ = require('jquery');
require('jquery.scrollto');
require('jquery.easing');

$.scrollTo && $.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 300,
    interrupt: true,
    queue : false,
    easing: 'easeOutQuad'
    // easing: 'easeOutQuart'
});

// import Vue from 'vue';
// import VMarkdown from 'vmarkdown-render';

const ACTIVE_CLASS = 'vmarkdown-preview-active';
const ACTIVE_CLASS_DURATION = 2000;

function _scrollTo(scrollContainer, target, options) {
    if(!target) return;
    scrollContainer = scrollContainer || window;
    $( scrollContainer ).stop();
    $( scrollContainer ).stop( true ).scrollTo(target, options);
}

export default {
    beforeCreate(){},
    beforeMount() {
        const self = this;
        // const settings = self.$options.settings;
        // const plugins = self.$options.plugins;
        // self.vmarkdown = new VMarkdown(Object.assign({}, settings, {
        //     h: this.$createElement
        // }));

        // self.vmarkdown = new VMarkdown({
        //     h: this.$createElement,
        //     plugins: plugins
        // });

        // self.vmarkdown = self.$options.vmarkdown;
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

        setValue(vdom) {
            this.vdom = vdom;
            this.$forceUpdate();
        },

        // async setValue(vast) {
        //     this.vdom = await this.vmarkdown.process(vast);
        //     this.$forceUpdate();
        // },
        scrollTo({node, coverageRatio = 0, firstVisibleLine}) {
            const self = this;
            if(!firstVisibleLine || firstVisibleLine <= 1) {
                // $.scrollTo({
                //     top: 0
                // });
                const scrollContainer = self.$options.scrollContainer;
                $(scrollContainer).scrollTo({
                    top: 0
                });
                return;
            }

            if(!node) {
                return;
            }


            const target = self.getDom(node);

            const options = {};
            if(coverageRatio) {
                Object.assign(options, {
                    over: {
                        top: coverageRatio
                    }
                });
            }

            const scrollContainer = self.$options.scrollContainer;
            _scrollTo(scrollContainer, target, options);
        },
        activeTo({node, coverageRatio = 0, cursor}) {
            const self = this;

            if(self._$target){
                self._$target.removeClass(ACTIVE_CLASS);
                self._$target = null;
            }

            if(!node) {
                return;
            }

            const target = self.getDom(node);
            if(!target) return;

            var $target = $(target);
            self._$target = $target;
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

            const scrollContainer = self.$options.scrollContainer;
            _scrollTo(scrollContainer, target, options);
        }
    },
    render(h) {

        return h('div', {
            class: ['vmarkdown-preview']
        }, [
            this.vdom || h('div', {
                style:{
                    'text-align':'center',
                    'max-width': '150px',
                    'margin': '100px auto'
                },
                domProps:{
                    innerHTML: require('./loading/loading.svg')
                }
            })
        ]);

    }
};
