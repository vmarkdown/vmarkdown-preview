const NodeUtil = require("./util/node");
const vremark = require('vremark');
const Event = require('./util/event');
export default class VMarkDown {

    constructor() {
        const self = this;
        self.value = '';
        self.hast = {};
    }

    setValue(value) {
        this.value = value;
        this.emit('change', value);
    }

    compile(h) {
        const self = this;

        console.time('all');

        const hast = vremark.parse(self.value, {
            breaks: true
        });

        self.hast = hast;

        const vdom = vremark.render(hast, {
            h: h,
            mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body'
        });

        console.timeEnd('all');

        console.log(hast);


        return vdom;
    }

    findNodeFromLine(line) {
        const self = this;
        const node = NodeUtil.findNodeFromLine(self.hast, line);
        return node;
    }

    findNodeByLine(line) {
        const self = this;
        const node = NodeUtil.findNodeByLine(self.hast, line);
        return node;
    }

    findNode(position) {
        const self = this;
        const node = NodeUtil.findNode(self.hast, position);
        return node;
    }
}

Event.mixin(VMarkDown);