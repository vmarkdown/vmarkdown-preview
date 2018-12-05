const store = window.top.__store__;

import Vue from 'vue';
import VMarkdown from 'vmarkdown-render';

import PreviewComponent from '../../src/vmarkdown-preview';

window.onload = init;

function init() {

    const Preview = Vue.extend(PreviewComponent);

    const preview = new Preview({
        el: '#app',
        scrollContainer: window
    });

    const vmarkdown = new VMarkdown({
        h: preview.$createElement
    });

    store.$on('change', async function (vast) {
        const vdom = await vmarkdown.process(vast);
        preview.setValue(vdom);
    });
    store.$on('scrollTo', function (options) {
        preview.scrollTo(options);
    });
    store.$on('cursorChange', function (options) {
        preview.activeTo(options);
    });

}









