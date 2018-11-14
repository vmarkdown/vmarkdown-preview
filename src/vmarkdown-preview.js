require('./vmarkdown-preview.scss');
import Preview from './base/preview';
const $ = require('jquery');
require('jquery.scrollto');

const ACTIVE_CLASS = 'vmarkdown-preview-active';

export default class VMarkDownPreview extends Preview {

    constructor(options) {
        super();
        const self = this;
        self.$scrollContainer = $(options.scrollContainer || window);
        self.activeEl = null;

        $.scrollTo && $.extend($.scrollTo.defaults, {
            axis: 'y',
            duration: 300
        });
    }

    _getId(node) {
        if(node.data && node.data.attrs) {
            if( node.data.attrs.id === 0 ) return '0';
            return node.data.attrs.id;
        }
        return null;
    }

    _getDom(vm, node) {
        if(node.data && node.data.ref) {
            var dom = vm.$refs[node.data.ref];
            if(dom._isVue) {
                dom = dom.$el;
            }
            return dom;
        }
        return null;
    }

    setValue() {

    }

    _scrollTo(target, options) {
        const self = this;
        self.$scrollContainer.stop();
        self.$scrollContainer.scrollTo(target, options);
    }

    goTop(){
        const self = this;
        self.$scrollContainer.scrollTo({
            top: 0
        });
    }

    scrollTo(vm, node, firstVisibleLine) {
        if(!node) return;

        const self = this;

        const target = self._getDom(vm, node);

        if(!target) return;

        const options = {};

        if(node) {

            const position = node.position;
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            const coverageRatio = (currentLine-startLine)/allLine;

            options.over = {
                top: coverageRatio
            }
        }

        self._scrollTo(target, options);
    }

    // at grade
    activeTo(vm, node, cursor) {
        const self = this;

        if(self.activeEl) {
            self.activeEl.removeClass(ACTIVE_CLASS);
        }

        if(!node) return;

        const target = self._getDom(vm, node);
        if(!target) return;

        var $dom = $(target);
        $dom.addClass(ACTIVE_CLASS);
        self.activeEl = $dom;

        if($dom.length === 0) {
            return;
        }

        const options = {};

        if(cursor) {
            Object.assign(options, {
                offset: {
                    top: -1 * cursor.top
                }
            })
        }

        const position = node.position;
        if(
            (
                node.tagName === 'code' ||
                (node.data && node.data.props && node.data.props.code)
            )

            && position && position.start.line < position.end.line) {
            const firstVisibleLine = cursor.line;
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            const coverageRatio = (currentLine-startLine)/allLine;

            Object.assign(options, {
                over: {
                    top: coverageRatio
                }
            });
        }

        self._scrollTo(target, options);
    }

}