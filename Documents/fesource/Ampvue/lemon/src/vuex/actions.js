import * as types from './types';

export default {
    setDataModel({ commit }, model) {
        commit(types.DATA_MODEL, model);
    },
    setInvestChoiceData({ commit }, model) {
        commit(types.INVEST_CHOICE_DATA, model);
    },
    setJobInfo({ commit }, model) {
        commit(types.SET_JOB_INFO, model);
    },
    setOneDeathBeniArr({ commit }, model) {
        commit(types.ONE_DEATH_BRNI_ARR, model);
    },
    setTwoDeathBeniArr({ commit }, model) {
        commit(types.TWO_DEATH_BRNI_ARR, model);
    },
    setThreeDeathBeniArr({ commit }, model) {
        commit(types.THREE_DEATH_BRNI_ARR, model);
    },
    setRiskLevel({ commit }, model) {
        commit(types.RISK_LEVEL, model);
    },
    setRiskResultStr({ commit }, model) {
        commit(types.RISk_RESULT_STR, model);
    },
    setBankSelectObj({ commit }, model) {
        commit(types.BANK_SELECT_OBJ, model);
    },
    setValidatePhoneObj({ commit }, model) {
        commit(types.VALIDATE_PHONE_OBJ, model);
    },
    setPaymentInfo({ commit }, model) {
        commit(types.PAYMENTINFO, model);
    }
}