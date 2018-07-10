import * as types from './types';
export default {
    [types.DATA_MODEL](state, model) {
        state.getDataModel = model;
    },
    [types.INVEST_CHOICE_DATA](state, model) {
        state.investChoiceData = model;
    },
    [types.SET_JOB_INFO](state, model) {
        state.getJobInfo = model;
    },
    [types.ONE_DEATH_BRNI_ARR](state, model) {
        state.oneDeathBeniArr = model;
    },
    [types.TWO_DEATH_BRNI_ARR](state, model) {
        state.twoDeathBeniArr = model;
    },
    [types.THREE_DEATH_BRNI_ARR](state, model) {
        state.threeDeathBeniArr = model;
    },
    [types.RISK_LEVEL](state, model) {
        state.riskLevel = model;
    },
    [types.RISk_RESULT_STR](state, model) {
        state.riskResultStr = model;
    },
    [types.BANK_SELECT_OBJ](state, model) {
        state.bankSelectObj = model;
    },
    [types.VALIDATE_PHONE_OBJ](state, model) {
        state.validatePhoneObj = model;
    },
    [types.PAYMENTINFO](state, model) {
        state.paymentInfo = model;
    }
}