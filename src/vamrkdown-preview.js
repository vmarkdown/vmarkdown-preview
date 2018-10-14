require('./vamrkdown-preview.scss');
import Preview from './base/preview';
const ACTIVE_CLASS = 'vamrkdown-preview-active';

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

    scrollTo(target) {
        const self = this;
        self._scrollTo(target, {
            axis: 'y',
            duration: 300
        });
    }

    activeTo(target) {
        const self = this;

        if(self.activeEl) {
            self.activeEl.removeClass(ACTIVE_CLASS);
        }

        var $dom = $(target);
        $dom.addClass(ACTIVE_CLASS);
        self.activeEl = $dom;

        if($dom.length === 0) {
            return;
        }

        var dom = $dom[0];

        dom.scrollIntoViewIfNeeded();
    }

}