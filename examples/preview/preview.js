const store = window.top.__store__;

import Preview from '../../src/vmarkdown-preview';

const preview = new Preview({
    el: '#app',
    scrollContainer: window
});

store.$on('change', function (vast) {
    preview.setValue(vast);
});
store.$on('scrollTo', function (options) {
    preview.scrollTo(options);
});
store.$on('cursorChange', function (options) {
    preview.activeTo(options);
});





