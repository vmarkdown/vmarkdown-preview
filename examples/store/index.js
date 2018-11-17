import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import vmarkdown from './modules/vmarkdown';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        vmarkdown: vmarkdown,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})