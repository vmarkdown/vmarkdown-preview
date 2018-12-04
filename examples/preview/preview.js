const store = window.top.__store__;

import Preview from '../../src/vmarkdown-preview';

const app = new Preview({
    el: '#app'
});

store.$on('change', function (vast) {
    app.setValue(vast);
});
store.$on('scrollTo', function (options) {
    app.scrollTo(options);
});
store.$on('cursorChange', function (options) {
    app.activeTo(options);
});





