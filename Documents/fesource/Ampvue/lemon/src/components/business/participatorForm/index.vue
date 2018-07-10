<template>
    <div>
        <!-- 姓名 -->
        <cell-input v-if="!config.hideName" :title="'姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名'" :required="config.requireName" v-model="value.name"></cell-input>
        <!-- 证件类型 -->
        <popup-picker title="证件类型" :required="config.requireCertificateType" :data="certificateTypeOptionList" :columns="1" show-name
            v-model="selectedIdType"></popup-picker>
        <!-- 证件号码 -->
        <cell-input :title="'证件号码'" :required="config.requireCertificateCode" v-model="value.idNo" :idCard="selectedIdType.length > 0 && selectedIdType[0] == '1'" @blur='getBirthdayAndSex'></cell-input>
        <!-- 性别 -->
        <popup-picker :title="'性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别'" :required="config.requireGender" :data="genderOptionList"
            :columns="1" show-name v-model="selectedGender" :disable="birthdayAndSexReadonly"></popup-picker>
        <!-- 出生日期 -->
        <cell-input title="出生日期" v-if="birthdayAndSexReadonly" placeholder="请选择出生日期" :required="true" v-model="value.birthday" readonly></cell-input>
        <date-time title="出生日期" v-else :startDate="startDateAge" :endDate="endDateAge" :required="config.requireBirthday" :confirmText="'确定'"
            :cancelText="'取消'" placeholder="请选择出生日期" v-model="value.birthday"></date-time>
        <!-- 电话 -->
        <cell-input v-if="!config.hideMobilePhone" :title="'手机号码'" :required="config.requireMobilePhone" v-model="value.mobilePhone"></cell-input>
        <!-- 邮箱 -->
        <cell-input v-if="!config.hideEmail" :title="'邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'" :required="config.requireEmail" v-model="value.email"></cell-input>
    </div>
</template>
<script>
    import cellInput from './cell-input.vue'
    import popupPicker from './popup-picker.vue'
    import certType from 'src/constant/certType'
    import genderType from 'src/constant/genderType'
    import datetime from './datatime.vue'
    import * as commonTool from 'src/utils/common.tool'
    import Validator from 'src/utils/validate'
    // import * as _ from 'src/utils/ui.tool'

    export default {
        name: 'participatorForm',
        props: {
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            value: Object
        },
        components: {
            cellInput,
            popupPicker,
            'date-time': datetime,
        },
        computed: {
            /**
             * 证件类型选项列表
             */
            certificateTypeOptionList: function () {
                let result = []
                if (this.config.certificateTypeOptionList && this.config.certificateTypeOptionList.length > 0) {
                    result = this.config.certificateTypeOptionList
                } else {
                    result = certType
                }
                return result
            },
            /**
             * 性别列表
             */
            genderOptionList: function () {
                let result = []
                if (this.config.genderOptionList && this.config.genderOptionList.length > 0) {
                    result = this.config.genderOptionList
                } else {
                    result = genderType
                }
                return result
            },
            /**
             * 根据最大年龄算开始日期
             */
            startDateAge: function () {
                let result = ''
                //默认最大60岁
                let maxAge = this.config.maxAge || this.config.maxAge === 0 ? this.config.maxAge : 60
                //根据生效时间和最大年龄, 确定最小生日
                // result = commonTool.addDate(new Date(this.userInputInIndex.effDate), 'y', -(maxAge + 1))
                result = commonTool.addDate(new Date(), 'y', -(maxAge + 1))
                result = commonTool.addDate(result, 'd', 1)
                result = commonTool.dateformat(result, 'yyyy-MM-dd')
                return result
            },
            /**
             * 根据最小年龄算结速日期
             */
            endDateAge: function () {
                let result = ''
                //默认0
                let minAge = this.config.minAge || this.config.minAge === 0 ? this.config.minAge : 0
                //小于1 默认为0
                let minAgeTemp = minAge
                if (minAge < 1) {
                    minAgeTemp = 0
                }
                // result = commonTool.addDate(new Date(this.userInputInIndex.effDate), 'y', -(minAgeTemp))
                result = commonTool.addDate(new Date(), 'y', -(minAgeTemp))
                //30天
                if (minAge == 0) {
                    result = commonTool.addDate(result, 'd', -30)
                }
                //6个月
                else if (minAge == 0.5) {
                    result = commonTool.addDate(result, 'm', -6)
                }
                result = commonTool.dateformat(result, 'yyyy-MM-dd')
                return result
            },
            birthdayAndSexReadonly(){
                return this.value && this.value.idType === '1' ? true : false
            }
        },
        watch: {
            /**
             * 选择证件类型
             */
            selectedIdType: {
                handler: function (newValue) {
                    this.value.idType = newValue[0]
                    if(newValue && newValue[0] && newValue[0] === '1' && this.value && this.value.idNo && this.value.idNo.length === 18){
                        this.getBirthdayAndSex()
                    }
                }
            },
            /**
             * 输入证件号
             */
            // 'value.idNo': {
            //     handler: function(newValue){
            //         if(newValue && newValue.length === 18 && this.value && this.value.idType === '1'){
            //             this.getBirthdayAndSex()
            //         }
            //     }
            // },
            /**
             * 选择性别
             */
            selectedGender: {
                handler: function (newValue) {
                    this.value.gender = newValue[0]
                }
            }

        },
        data: function () {
            return {
                selectedIdType: [], //当前证件类型
                selectedGender: [], //当前性别
            }
        },
        created: function () {
            //设置当前证件类型
            if (this.value && this.value.idType) {
                this.selectedIdType = [this.value.idType]
            }
            //设置性别
            if (this.value && this.value.gender) {
                this.selectedGender = [this.value.gender]
            }
        },
        methods: {
            /**
             * 计算出生年月日及性别 
            */
            getBirthdayAndSex(){
                if(this.value && this.value.idType === '1' && this.value.idNo && this.value.idNo.length === 18){
                    // 计算性别
                    let sex = commonTool.getSexByChinaID(this.value.idNo)
                    this.selectedGender.splice(0, 1, sex)

                    // 计算出生年月日
                    let birthday = commonTool.getBirthdayByChinaID(this.value.idNo)
                    this.value.birthday = birthday

                //    let idNo = this.value.idNo

                //     // 计算出生日期前校验身份证号是否正确
                //     let msg = this.check(idNo, 'idCard')
                //     if (msg) {
                //         return _.alert(msg)
                //     }

                //     // 计算性别
                //     let sign = idNo.substring(16, 17)
                //     if (/1|3|5|7|9/.test(sign)) {
                //         this.selectedGender.splice(0, 1, 'M')
                //         // this.selectedGender[0] = 'M'
                //     } else {
                //         this.selectedGender.splice(0, 1, 'F')
                //         // this.selectedGender[0] = 'F'
                //     }

                //     // 计算出生日期
                //     let year = idNo.substring(6, 10)
                //     let month = idNo.substring(10, 12)
                //     let day = idNo.substring(12, 14)
                //     this.value.birthday = `${year}-${month}-${day}`
                }
            },
            /**
             * 校验
             */
            check: function(val, type) {
                let validator = new Validator()
                validator.add(val, [
                    {
                        strategy: type
                    }
                ])
                return validator.start()
            }
        }
    }
</script>
<style scoped src="./main.scss"></style>