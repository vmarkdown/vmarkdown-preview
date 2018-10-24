require('./vamrkdown-preview.scss');
import Preview from './base/preview';
const ACTIVE_CLASS = 'vamrkdown-preview-active';

function getDisplay(obj){
    if (obj.currentStyle) {
        return obj.currentStyle.display;
    }
    else {
        return getComputedStyle(obj, false).display;
    }
}

function isBlock(obj) {
    return getDisplay(obj) === 'block';
}

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

    // on(type, handler) {
    //
    // }

    _getId(node) {
        if(node.data && node.data.attrs) {
            if( node.data.attrs.id === 0 ) return '0';
            return node.data.attrs.id;
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

    scrollTo(node) {
        if(!node) return;

        const self = this;
        const id = self._getId(node);
        if(!id) return;

        // const id = node.properties.id;
        // preview.scrollTo('#'+id);
        const target = '#'+id;
        // self._scrollTo(target, {
        //     axis: 'y',
        //     duration: 300
        // });
        self._scrollTo(target);
    }

    // at grade
    activeTo(node, cursor) {
        const self = this;

        if(self.activeEl) {
            self.activeEl.removeClass(ACTIVE_CLASS);
        }

        if(!node) return;

        const id = self._getId(node);
        if(!id) return;
        // const id = node.properties.id;
        const target = '#'+id;

        var $dom = $(target);
        $dom.addClass(ACTIVE_CLASS);
        self.activeEl = $dom;

        if($dom.length === 0) {
            return;
        }

        // var dom = $dom[0];
        //
        // if(!isBlock(dom)) {
        //     dom = dom.parentElement;
        // }
        // dom.scrollIntoViewIfNeeded(); //scrollIntoView
        // dom.scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        // console.log(cursor);

        var options = {};

        if(cursor) {
            Object.assign(options, {
                offset: {
                    top: -1 * cursor.top
                }
            })
        }

        // self._scrollTo(target, {
        //     axis: 'y',
        //     duration: 300,
        //     offset: {
        //         top: -1 * cursor.top
        //     }
        // });

        self._scrollTo(target, options);


    }

}