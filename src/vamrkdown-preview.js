require('./vamrkdown-preview.scss');

import Preview from './util/preview';

$.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 300
});

function scrollTo(target, options) {
    $(window).stop();
    $(window).scrollTo(target, options);
}

const ACTIVE_CLASS = 'vamrkdown-preview-active';

export default class VMarkDownPreview extends Preview {

    constructor(options) {
        super();
        const self = this;
        self.$scrollContainer = $(options.scrollContainer || window);

        self.vmarkdown = options.vmarkdown;
        self.preview = new Vue({
            el: options.container,
            render(h) {
                return self.vmarkdown.compile(h);
            }
        });

        self.vmarkdown.on('change', function () {
            self.preview.$forceUpdate();
        });

        self.vmarkdown.on('firstVisibleLineChange', function (firstVisibleLine) {
            self.scrollToLine(firstVisibleLine);
        });

        self.vmarkdown.on('cursorChange', function (cursor) {
            self.activeTo(cursor);
        });
    }

    on(type, handler) {

    }

    scrollTo() {

    }

    _scrollTo(target, options) {
        const self = this;
        self.$scrollContainer.stop();
        self.$scrollContainer.scrollTo(target, options);
    }

    scrollToLine(line) {

        const self = this;

        const node = self.vmarkdown.findNodeFromLine(line);
        // const self = this;
        //
        // const node = NodeUtil.findNodeFromLine(self.hast, line);
        //
        // console.log(node);
        //
        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        // dom.scrollIntoView();
        self._scrollTo(dom);
    }

    activeTo(position) {
        const self = this;

        const node = self.vmarkdown.findNode(position);

        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        $(self.preview.$el).find('.'+ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
        $(dom).addClass(ACTIVE_CLASS);

        dom.scrollIntoViewIfNeeded();
        // scrollTo(dom, {
        //     over: 0.5,
        //     offset: -1 * ($(window).height() / 2)
        // });
    }


    activeToLine(line) {
        const self = this;

        const node = self.vmarkdown.findNodeByLine(line);

        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        $(self.preview.$el).find('.active-line').removeClass(ACTIVE_CLASS);
        $(dom).addClass(ACTIVE_CLASS);

        scrollTo(dom, {
            // over: 3,
            offset: -1 * ($(window).height() / 2)
        });


        // scrollTo(dom);

        // const hash = node.hash;
        //
        // const $target = $('[data-hash='+hash+']');
        //
        // $('.active').removeClass('active');
        //
        // $target.addClass('active');
        //
        //
        // if($target.length>0) {
        //     $target[0].scrollIntoViewIfNeeded();
        //     // scrollTo($target[0]);
        // }
    }

}