import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import state from './state';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
	state,
	mutations,
	plugins: [createLogger()]
})