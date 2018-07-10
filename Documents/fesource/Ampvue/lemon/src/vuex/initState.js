import {
    extendDeep
} from 'src/utils/function.extension';
export default function() {
    let copy = extendDeep({
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
            organCode1: '', // 税务登记号
            organCode4: '', // 社会信用代码
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
            bankData: [],
            addressData: []
        },
        investChoiceData: {},
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
        paymentInfo: {
            // orderId: '' 
            // amount: 0,
            // encrypId: ''
        }
    }, {});
    return copy;
}