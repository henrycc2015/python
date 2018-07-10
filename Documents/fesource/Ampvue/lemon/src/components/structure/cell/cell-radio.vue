<template>
    <div class="tetris-cell tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder, 'tetris-1px-b-15': shortBottemBorder}">
        <div class="tetris-cell-hd">
            <label class="">{{title}}</label>
            <div v-if="iconObject" class="labelIcon">
                <i-icon :name="iconObject.name" :color="iconObject.color" :size="iconObject.size" @click.native="iconClick"></i-icon>
            </div>
        </div>
        <div class="tetris-cell-primary">
            <radio :value="currentValue" @click.native="changeRadio(true)" style="margin-right:10px;">{{trueValue}}</radio>
            <radio :value="!currentValue" @click.native="changeRadio(false)">{{falseValue}}</radio>
        </div>
    </div>
</template> 

<script>
import icon from '@components/basic/icon';
import radio from '@components/basic/radio';
export default {
    name: 'cell-radio',
    components: {
        'i-icon': icon,
        radio
    },
    data() {
        return {
            currentValue: false
        }
    },
    props: {
        value: {
            type: Boolean,
            default: true
        },
        isNeedTopBorder: Boolean,
        shortBottemBorder: Boolean,
        title: [String, Number],
        iconObject: Object,
        trueValue: {
            type: String,
            default: '是'
        },
        falseValue: {
            type: String,
            default: '否'
        }
    },
    created() {
        this.currentValue = (this.value === undefined || this.value === null) ? '' : this.value
    },
    methods: {
        iconClick() {
            this.$emit('icon-click');
        },
        changeRadio(flag){
            if(this.currentValue != flag){
                this.currentValue = flag;
                this.$emit('input', this.currentValue);
                this.$emit('change', this.currentValue);
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-cell {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: px2rem(94);
    box-sizing: border-box;
    padding: px2rem(20) 15px;
    font-size: px2rem(30);
    .tetris-cell-hd {
        display: flex;
        height: 100%;
        line-height: px2rem(50);
        label {
            position: relative;
            display: inline-block;
            color: #666;
            word-wrap: break-word;
            word-break: break-all;
        }
        .labelIcon {
            display: inline-block;
            margin-left: 5px;
        }
    }
    .title {
        height: 100%;
    }
    .tetris-cell-primary {
        flex: 1;
        text-align: right;
        height: 100%;
        line-height: 1.25rem;
        color: #333;
    }
}
</style>
