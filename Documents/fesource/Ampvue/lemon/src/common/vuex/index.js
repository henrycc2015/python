import * as fetch from 'fetch-api';
const types = {
    SET_SOLVENCY: 'SET_SOLVENCY'
}

const state = {
    solvencyInfo: ''
}

const actions = {
    fetchSolvencyInfo({ commit }, info) {
        let option = {
            loadingMsg: null
        }
        return fetch.post('/m/solvency/querySolvencyMessage.dox', {}, option).then(res => {
            commit(types.SET_SOLVENCY, res.content);
        })
    },
}

const mutations = {
    [types.SET_SOLVENCY](state, info) {
        state.solvencyInfo = info;
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}