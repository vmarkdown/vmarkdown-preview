import Preview from './util/preview';

$.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 300
});

function scrollTo(target, options) {
    $(window).stop();
    $(window).scrollTo(target, options);
}

export default class VMarkDownPreview extends Preview {

    constructor(options) {
        super();
        const self = this;

        // self.container = document.getElementById(el);
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
    }

    on(type, handler) {

    }

    // getValue() {
    //
    // }
    //
    // setValue(md) {
    //     const self = this;
    //     self.vmarkdown.setValue(md);
    //     self.preview.$forceUpdate();
    // }

    scrollTo() {

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
        scrollTo(dom);
    }

    activeTo(position) {
        const self = this;

        const node = self.vmarkdown.findNode(position);

        if(!node) return;

        const id = node.properties.id;

        const dom = document.getElementById(id);

        console.log(dom);

        if(!dom) return;

        $(self.preview.$el).find('.active-line').removeClass('active-line');
        $(dom).addClass('active-line');

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

        $(self.preview.$el).find('.active-line').removeClass('active-line');
        $(dom).addClass('active-line');

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