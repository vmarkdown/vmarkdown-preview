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
    }

    // on(type, handler) {
    //
    // }


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
        const id = node.properties.id;
        // preview.scrollTo('#'+id);
        const target = '#'+id;
        self._scrollTo(target, {
            axis: 'y',
            duration: 300
        });
    }

    activeTo(node) {
        if(!node) return;

        const self = this;

        if(self.activeEl) {
            self.activeEl.removeClass(ACTIVE_CLASS);
        }

        const id = node.properties.id;
        const target = '#'+id;

        var $dom = $(target);
        $dom.addClass(ACTIVE_CLASS);
        self.activeEl = $dom;

        if($dom.length === 0) {
            return;
        }

        var dom = $dom[0];

        if(!isBlock(dom)) {
            dom = dom.parentElement;
        }

        // dom.scrollIntoViewIfNeeded(); //scrollIntoView
        dom.scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'nearest', inline: 'start' });

    }

}