<template>
    <div class="info-content">
        <div class="div-name">
            <div class="div-check" @click="clickRadio(contact.localId)"><check-box :value="contact.selectedFlag == 'Y'" style="margin-right: 0;"></check-box></div>
            <div class="div-insured-name">{{contact.insurerName}}</div>
            <div class="div-insured-edit" v-show="contact.editFlag == 'Y'" @click="clickEdit(contact.localId)">编辑</div>
        </div>
        <text-row :line="false" class="div-text-row">
            <span slot="title">证件类型:</span>
            <span slot="content">{{idCardTypeName}}</span>
        </text-row>
        <text-row :line="false" class="div-text-row">
            <span slot="title">证件号码:</span>
            <span slot="content">{{contact.insurerIdCard}}</span>
        </text-row>
        <text-row :line="false" class="div-text-row">
            <span slot="title">出生日期:</span>
            <span slot="content">{{contact.insurerBirthday}}</span>
        </text-row>
        <text-row :line="false" class="div-text-row" :class="{'div-last-item': !showOccupation}">
            <span slot="title">性别:</span>
            <span slot="content">{{contact.insurerSex == 'M' ? '男' : '女'}}</span>
        </text-row>
        <text-row :line="false" class="div-text-row div-occupation" :class="{'tetris-1px-b': !isLast, 'div-last-item': showOccupation}" v-if="showOccupation">
            <span slot="title">职业类别:</span>
            <div slot="content" @click="selectOccupation(contact.localId)" class="div-right-content div-right-arrow">
                <div class="div_occupation" :class="{'sp-blank-select-text': contact.occupation_code_name == ''}">{{contact.occupation_code_name ? contact.occupation_code_name : '请选择'}}</div>
            </div>
        </text-row>
    </div>
</template>
<script>
    import checkBox from '@components/basic/checkbox/index'
    import textRow from '@components/structure/text-row/text-row'
    // import icon from '@components/basic/icon'

    export default {
        props: {
            contact: Object,
            idCardTypeList: Array,
            isLast: Boolean,
            showOccupation: Boolean
        },
        computed: {
            idCardTypeName: function(){
                let result = ''
                for (let idCardType of this.idCardTypeList) {
                    if (idCardType.code == this.contact.insurerIdType) {
                        result = idCardType.text
                        break
                    }
                }
                return result
            }
        },
        components: {
            'check-box': checkBox,
            'text-row': textRow,
            // 'i-icon': icon
        },
        methods: {
            //点击选择项
            clickRadio(localId) {
                this.$emit('clickRadio', localId)
            },
            //选择职业
            selectOccupation(localId){
                this.$emit('selectOccupation', localId)
            },
            //点击编辑
            clickEdit(localId) {
                this.$emit('clickEdit', localId)
            }
        }
    }
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
    .div-check{
        width: 2rem;
        height: 2rem;
        line-height: 2.3rem;
        text-align: center;
    }
    .info-content {
        background-color: #FFF;
    }
    .div-name {
        background-color: #fff;
        display: flex;
        height: 2rem;
        align-items: center;
    }
    .div-insured-name {
        font-size: 0.75rem;
        flex-grow: 1;
    }
    .div-insured-edit {
        color: $c-high ;
        font-size: 0.8rem;
        padding-right: 0.5rem;
    }
    .div-text-row {
        padding-left: 1.5rem !important;
        margin-left: 0.5rem;
        padding-right: calc(15px + 0.5rem) !important;
    }
    .div-last-item {
        height: 1.8rem;
    } 
    .div-occupation-1px-b:after{
        left: 0;
    }
    .sp-blank-select-text {
        color: #C1C1C1;
    }
    .tetris-1px-b-15:after{
        left: 0 !important;
    }
    .div-right-content{
        display: flex;
        justify-content: flex-end;
    }
    .div-right-arrow:after{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c1c1c1;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: 0.46rem;
        margin-left: 9px;
    }
    .div_occupation{
        width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex-grow: 10;
    }
</style>
<style lang="scss">
    .div-occupation>.row-ft {
        text-align: right;
        display: block;
    }
</style>