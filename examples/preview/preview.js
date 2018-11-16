// const $ = require('jquery');
// import Vue from 'vue';

import Preview from '../../src/vmarkdown-preview';

const app = new Preview({
    el: '#app'
});



const md = require('../md/demo.md');


app.setValue(md);


setTimeout(function () {
    app.scrollTo();
}, 3000);