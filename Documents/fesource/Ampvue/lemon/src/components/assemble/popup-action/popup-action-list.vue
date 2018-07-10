<template>
    <div class="tetris-picker-box">
        <div class="tetris-cell-select" @click="onClick" v-show="showCell" >
            <div class="tetris-cell-hd">
                <label>{{title}}</label>
                <slot name="head"></slot>
            </div>
            <div class="tetris-cell-ft tetris-cell-select-is-link">
            </div>
        </div>
        <div v-transfer-dom>
            <v-popup
            v-model="showValue"
            class="tetris-popup-picker"
            :id="`tetris-popup-picker-${uuid}`"
            @on-hide="onPopupHide"
            @on-show="onPopupShow"
            :popup-stype="popupStyle">
                <div class="tetris-popup-picker-section">
                    <a class="tetris-1px-t" @click="onModify">修改</a>
                    <a class="tetris-1px-t" @click="onDelete">删除</a>
                    <a class="tetris-1px-t" @click="onCancel">取消</a>
                </div>
            </v-popup>
        </div>
    </div>
</template>
<script>
import cellDisplay from '@components/structure/cell/cell-display';
import icon from '@components/basic/icon';
import popup from '@components/structure/popup/popup.vue';
import picker from '@components/structure/picker';
import Flexbox from '@components/structure/flexbox/flexbox';
import FlexboxItem from '@components/structure/flexbox/flexbox-item';
import array2string from '../../../filters/array2String';
import value2name from '../../../filters/value2name';
import TransferDom from 'src/directives/transfer-dom';
const getObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default {
    name: 'popup-picker',
    directives: {
        TransferDom
    },
    components: {
        'cell-display': cellDisplay,
        'v-popup': popup,
        'v-picker': picker,
        'v-flexbox': Flexbox,
        'v-flexbox-item': FlexboxItem,
        'v-icon': icon
    },
    filters: {
        array2string,
        value2name
    },
	data() {
		return {
            onShowProcess: false,
            tempValue: getObject(this.value),
            closeType: false,
            currentData: JSON.stringify(this.data),
            showValue: false,
            currentValue: this.value,
		}
	},
    props:{
        valueTextAlign: {
            type: String,
            default: 'right'
        },
        title: String,
        popTitle: String,
        cancelText: String,
        confirmText: String,
        data: {
            type: Array,
            default () {
                return []
            }
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        columns: {
            type: Number,
            default: 0
        },
        fixedColumns: {
            type: Number,
            default: 0
        },
        columnWidth: Array,
        value: {
            type: Array,
            default () {
                return []
            }
        },
        show: Boolean,
        displayFormat: Function,
        showName: Boolean,
        showCell: {
            type: Boolean,
            default: true
        },
        popupStyle: Object
    },
	created(){
        this.uuid = Math.random().toString(36).substring(3, 8);
	},
    methods: {
        value2name,
        onClick () {
            this.showValue = true;
        },
        onHide (type) {
            this.showValue = false;
            if (type) {
                this.closeType = true;
                this.currentValue = getObject(this.tempValue);
            }
            if (!type) {
                this.closeType = false;
                if (this.value.length > 0) {
                    this.tempValue = getObject(this.currentValue);
                }
            }
        },
        onPopupShow () {
            this.closeType = false;
            this.$emit('on-show');
        },
        onPopupHide (val) {
            if (this.value.length > 0) {
                this.tempValue = getObject(this.currentValue);
            }
        },
        onModify () {
            // console.log('modify')
            this.onHide();
            this.$emit('on-modify');
        },
        onDelete () {
            // console.log('delete')
            this.onHide();
            this.$emit('on-delete');
        },
        onCancel () {
            // console.log('cancel')
            this.onHide();
            this.$emit('on-cancel');
        }
    },
    watch: {
        value (val) {
            if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
                this.tempValue = getObject(val);
                this.currentValue = getObject(val);
            }
        },
        currentValue (val) {
            this.$emit('input', getObject(val));
            this.$emit('on-change', getObject(val));
        },
        show (val) {
            this.showValue = val;
        }
    }
}

</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-picker-box {
    .tetris-cell-select {
        position: relative;
        display: flex;
        align-items: center;
        background-color: #fff;
        height: px2rem(90);
        box-sizing: border-box;
        padding: 0 15px;
        font-size: px2rem(30);
        line-height: 1.5;
        .tetris-cell-bd {
            color: #333;
            text-align: right; // margin-right: 15px;
        }
        .tetris-cell-hd {
            display: flex;
            align-items: center;
            width: 50%;
        }
        label {
            display: inline-block;
            color: #666;
            // width: px2rem(300);
            word-wrap: break-word;
            word-break: break-all;
        }
        .title {
            height: 100%;
        }
        .tetris-cell-primary {
            flex: 1;
        }
        .tetris-cell-ft {
            text-align: right;
        }
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #DCDCDC;
            color: #DCDCDC;
            transform-origin: 0 100%;
            transform: scaleY(0.5);
        }
        &-is-link {
            width: 15px;
            &:after {
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #C8C8CD;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: 15px;
            }
        }
        &-top-border:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #DCDCDC;
            color: #DCDCDC;
            transform-origin: 0 0;
            transform: scaleY(0.5);
        }
        
    }
}
.tetris-popup-picker {
    background-color: transparent;
}
.tetris-popup-picker-section {
    & > a {
        display: block;
        width: 100%;
        padding: px2rem(34) 0;
        font-size: px2rem(34);
        color: #333;
        text-align: center;
        background-color: #fff;
        &:last-child {
            margin-top: px2rem(10);
        }
        &::active {
            background-color: #efefef;
        }
    }
} 

</style>