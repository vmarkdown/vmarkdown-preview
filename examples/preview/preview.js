const store = window.top.__store__;


// import store from '../store'
// const $ = require('jquery');
// import Vue from 'vue';
// Vue.use(VMarkDown);




import Preview from '../../src/vmarkdown-preview';
// import Vue from "vue";

const app = new Preview({
    el: '#app'
});

store.$on('change', function (vast) {
    app.setValue(vast);
});
store.$on('scrollTo', function (options) {
    app.scrollTo(options);
});





// __store__.$on('vmarkdown/parse', function (md) {
//     store.dispatch('vmarkdown/parse', md);
// });
//
// __store__.$on('vmarkdown/scrollTo', function (firstVisibleLine) {
//     store.commit('vmarkdown/scrollTo', firstVisibleLine);
// });
//
// __store__.$on('vmarkdown/activeTo', function (cursor) {
//     store.commit('vmarkdown/activeTo', cursor);
// });

//
// const md = require('../md/demo.md');
// store.dispatch('vmarkdown/parse', md);
//
//
//
// function sleep(time){
//
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve();
//         }, time || 1000);
//     });
//
// }
//
// (async() => {
//
//     for(var i=0;i<100;i++){
//
//         store.commit('vmarkdown/activeTo', {
//             line: Math.floor(Math.random()*100),
//             column: 1,
//             top: Math.floor(Math.random()*200)
//         });
//
//
//         await sleep(3000);
//     }
//
// })();
//
//
// setTimeout(function () {
//
//     // store.commit('vmarkdown/activeTo', {
//     //     line: 28,
//     //     column: 6,
//     //     top: 0
//     // });
//
//
//     // store.commit('vmarkdown/scrollTo', 26);
//     // app.scrollTo(106);
// }, 1000);
//
// setTimeout(function () {
//     // store.commit('vmarkdown/scrollTo', 20);
//     // app.scrollTo(20);
// }, 3000);

// setTimeout(function () {
//     store.commit('vmarkdown/scrollTo', 90);
// }, 3000);






// const md = require('../md/demo.md');
//
// store.commit('vmarkdown/h', app.$createElement);
//
// // store.commit('vmarkdown/setValue', md);
// store.dispatch('vmarkdown/parse', md);
//
// setTimeout(function () {
//     store.commit('vmarkdown/scrollTo', 106);
// }, 3000);











// app.setValue(md);


// setTimeout(function () {
//     app.scrollTo(106);
// }, 1000);
//
// setTimeout(function () {
//     app.scrollTo();
// }, 1200);


