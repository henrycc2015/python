<template>
    <div class="tetris-picker-box">
        <div class="tetris-cell-select tetris-1px-b" :class="{'tetris-1px-b-15': leftShortline}" @click="onClick" v-show="showCell">
            <div class="tetris-cell-hd">
                <label>{{title}}</label>
                <slot name="head"></slot>
            </div>
            <div class="tetris-cell-bd tetris-cell-primary">
                <span class="tetris-popup-picker-value" v-if="currentValue">{{currentValue}}</span>
                <span class="tetris-popup-picker-placeholder" v-if="!currentValue && placeholder" v-text="placeholder"></span>
            </div>
            <div class="tetris-cell-ft tetris-cell-select-is-link">
            </div>
        </div>
        <div v-transfer-dom>
            <v-popup v-model="showValue" class="tetris-popup-picker" :id="`tetris-popup-picker-${uuid}`" @on-hide="onPopupHide" @on-show="onPopupShow" :popup-stype="popupStyle">
                <div class="tetris-popup-picker-section">
                    <div class="tetris-popup-picker-header tetris-1px-b" @touchmove.prevent>
                        <v-flexbox>
                            <v-flexbox-item class="tetris-popup-picker-left" @click.native="onHide(false)" v-if ="icon"><v-icon name="cross" size="44" color="#666"></v-icon></v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-left" @click.native="onHide(false)" v-else>{{ cancelText || '取消'}}</v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-center">{{ popTitle}}</v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-right" @click.native="onHide(true)" v-if ="icon"></v-flexbox-item>
                            <v-flexbox-item class="tetris-popup-picker-right" @click.native="onHide(true)" v-else>{{ confirmText || '确定'}}</v-flexbox-item>
                        </v-flexbox>
                    </div>
                    <div class="tetris-action tetris-1px-b tetris-1px-b-15" 
                    v-for="(item,index) in slotData" 
                    :key="index" :type="item.type" @click="selectType(item,index)">
                        <span>{{ item.info }}</span>
                        <v-icon name="check" :class="{'action-icon-show': index === typeIndex}" size="40" color="#d7ac62"></v-icon>
                    </div>
                </div>
            </v-popup>
        </div>
    </div>
</template>
<script>
import icon from '@components/basic/icon';
import popup from '@components/structure/popup/popup.vue';
import picker from '@components/structure/picker';
import Flexbox from '@components/structure/flexbox/flexbox';
import FlexboxItem from '@components/structure/flexbox/flexbox-item';
// import array2string from 'src/filters/array2String';
// import value2name from 'src/filters/value2name';
import TransferDom from 'src/directives/transfer-dom';
// const getObject = function(obj) {
//     return JSON.parse(JSON.stringify(obj));
// }

export default {
    name: 'popup-picker',
    directives: {
        TransferDom
    },
    components: {
        'v-popup': popup,
        'v-picker': picker,
        'v-flexbox': Flexbox,
        'v-flexbox-item': FlexboxItem,
        'v-icon': icon
    },
    data() {
        return {
            typeIndex: 0,
            onShowProcess: false,
            closeType: false,
            showValue: false,
            currentValue: this.defaultType
        }
    },
    props: {
        defaultType:  {
            type: String,
            default: 'SSN'
        },
        disable: {
            type: Boolean,
            default: false
        },
        valueTextAlign: {
            type: String,
            default: 'right'
        },
        title: String,
        popTitle: String,
        cancelText: String,
        confirmText: String,
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
        value: Object,
        slotData: {
            type: Array,
            default() {
                return []
            }
        },
        icon: Boolean,
        show: Boolean,
        displayFormat: Function,
        showName: Boolean,
        showCell: {
            type: Boolean,
            default: true
        },
        popupStyle: Object,
        leftShortline : Boolean
    },
    created() {
        this.uuid = Math.random().toString(36).substring(3, 8);
    },
    methods: {
        onClick() {
            this.$emit('before-click');
            this.$nextTick(() => {
                if(!this.disable){
                    // this.showValue = true;
                    setTimeout(() => {
                        this.showValue = true;
                        //this.resetZIndex();
                    }, 200)
                }
            })
        },
        selectType (obj, i) {
            this.typeIndex = i;
        },
        onHide(type) {
            this.showValue = false;
            if (type) {
                this.closeType = true;
                this.currentValue = this.slotData[this.typeIndex].type;
                this.$emit('on-slect-type', this.slotData[this.typeIndex]);
            }
            if (!type) {
                this.closeType = false;
            }
        },
        onPopupShow() {
            this.closeType = false;
            this.$emit('on-show');
        },
        onPopupHide(val) {
            this.$emit('on-hide')
        },
        resetZIndex(){
            setTimeout(()=>{
                document.querySelector(`#tetris-popup-picker-${this.uuid} .scroller-mask`).style.zIndex = 0;
                document.querySelector(`#tetris-popup-picker-${this.uuid} .scroller-mask`).style.zIndex = 3;
            },500);
        }
    },
    watch: {
        show(val) {
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
        .tetris-cell-hd {
            min-width: px2rem(240);
            label {
                display: block;
                color: #666;
                word-wrap: break-word;
                word-break: break-all;
            }
        }
        .tetris-cell-bd {
            color: #333;
            text-align: right; 
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
    }
    .tetris-popup-picker-placeholder {
        color: #c1c1c1;
    }
    .shortName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.tetris-popup-picker{
    .tetris-popup-picker-header {
        height: 44px;
        color: $c-high ;
        background-color: #fff;
        font-size: 16px;
        position: relative;
    }
    .tetris-popup-picker-left {
        padding-left: 15px;
    }
    .tetris-popup-picker-right {
        text-align: right;
        padding-right: 15px;
    }
    .tetris-popup-picker-center {
        text-align: center;
        color: #333;
    }
    .tetris-action{
        display: flex;
        align-items: center;
        padding: 14px 15px;
        line-height: 1.5;
        min-height: 3.157895rem;
        width: 100%;
        font-size: px2rem(30);
        color: #666;
        box-sizing: border-box;
        & span {
            display: flex;
            flex: 1;
            align-items: center;
        }
        & i {
            justify-content: flex-end;
            width: 1.5rem;
            margin-left: 1rem;
            opacity: 0; 
        }
        .action-icon-show {
            opacity: 1;
        }
    }
}
</style>