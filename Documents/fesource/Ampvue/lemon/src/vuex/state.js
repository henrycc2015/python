export default {
    getDataModel: {
        userName: '',
        mobile: '',
        idType: '',
        idNo: '',
        gender: '',
        birthday: '',
        nationality: '',
        nationalityCode: '',
        cityCode: '',
        provinceCode: '',
        addressDetail: '',
        bankName: '',
        bankNo: '',
        cardNo: '',
        occupationData: {
            code: '',
            name: ''
        },
        endPeriod: '',
        endYear: '',
        payPeriod: '',
        payYear: '',
        planFreq: '',
        taxBureauName: '', // 纳税分局名称
        taxRegisterNo: '', // 税务登记号
        creditCode: '', // 社会信用代码
        organCode2: '', // 组织机构代码
        isInsideToInner: 'N', // 是否是外部转入标志 Y-外部 N-内部
        policyNo: '',
        beneficiaryType: '1', // 受益人类型

        // 处理返回时，直接调用这个数组
        genderData: [],
        idTypeData: [],
        nationalityData: [],
        endPeriodData: [],
        payPeriodData: [],
        payYearArr: [],
        bankData: [],
        addressData: [],
        orgId: '',
        planFreqArr: [],
        endYearArr: [],
        bankDataTotal: [],
        elecReceipt: {},
    },
    investChoiceData: {
        bankListTotal: [],
        bankListSub: [],
        encrypId: '',
    },
    getJobInfo: [],
    oneDeathBeniArr: [
        // {
        //     beneficiaryName: '', 
        //     nationalityData: [],
        //     idNo: '',
        //     genderData: [],
        //     birthday: '',
        //     idInsureRelationship: '',
        //     idInsureRelationshipData: [],
        //     beneficiaryRatio: '',
        //     idTypeData: [],
        //     show: true
        // }
    ],
    twoDeathBeniArr: [
        // {
        //     beneficiaryName: '', 
        //     nationalityData: [],
        //     idNo: '',
        //     genderData: [],
        //     birthday: '',
        //     idInsureRelationship: '',
        //     idInsureRelationshipData: [],
        //     beneficiaryRatio: '',
        //     idTypeData: [],
        //     show: true
        // }
    ],
    threeDeathBeniArr: [
        // {
        //     beneficiaryName: '', 
        //     nationalityData: [],
        //     idNo: '',
        //     genderData: [],
        //     birthday: '',
        //     idInsureRelationship: '',
        //     idInsureRelationshipData: [],
        //     beneficiaryRatio: '',
        //     idTypeData: [],
        //     show: true
        // }
    ],
    riskLevel: '', //风险承受等级: 01保守型, 02稳健保守型, 03稳健型, 04积极稳健型, 05积极型
    riskResultStr: '', //分线测评结果的字符串, 用来二次传给后台
    bankSelectObj: {}, //选择的银行的数据
    validatePhoneObj: {
        timing: 0
    }, //验证手机的数据
    paymentInfo: { // 跳转收银台支付信息
        // orderId: '' 
        // amount: 0,
        // encrypId: ''
    }
}