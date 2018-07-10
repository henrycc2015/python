<template>
    <div class="tetris-cell tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder, 'tetris-1px-b-15': shortBottemBorder}">
        <div v-if='!notitle' class="tetris-cell-hd">
            <label>{{title}}</label>
        </div>
        <div class="tetris-cell-primary">
            <input v-model="currentValue" :style="{'text-align': textAlign}" placeholder="请输入验证码" type="tel" :maxlength="maxLength" />
        </div>
        <div class="tetris-cell-ft">
            <div class="getCode" @click="getCode">{{codeText}}</div>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'cell-varification',
    components: {
    },
    data() {
        return {
            currentValue: '',
            isSentCode: false,
            codeText: '获取',
            countInterval: ''
        }
    },
    props: {
        isNeedTopBorder: Boolean,
        shortBottemBorder: Boolean,
        title: [String, Number],
        time: Number,
        value: [String, Number],
        maxLength: [Number],
        notitle : Boolean,
        textAlign: {
            type: String,
            default: 'left'
        }
    },
    computed: {

    },
    methods: {
        getCode() {
            if (!this.isSentCode) {
                this.isSentCode = true;
                this.$emit('sendCode');
            }
        },
        reset() {
            this.isSentCode = false;
            this.codeText = '获取';
            clearInterval(this.countInterval);
        },
        countdown() {
            let count = this.time;
            this.codeText = --count + '秒';
            this.countInterval = setInterval(() => {
                this.codeText = --count + '秒';
                if (count == 0) {
                    this.codeText = '获取';
                    this.isSentCode = false;
                    clearInterval(this.countInterval);
                }
            }, 1000);
        }
    },
    created() {
        this.currentValue = (this.value === undefined || this.value === null) ? '' : this.value
    },
    watch: {
        currentValue(newVal) {
            this.$emit('input', newVal);
        },
        value(val) {
            this.currentValue = val
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';
.tetris-cell {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: px2rem(94);
    box-sizing: border-box;
    padding: 0 15px;
    font-size: px2rem(30);
    // line-height: 1.5;
    label {
        display: block;
        color: #666;
        width: px2rem(210);
        word-wrap: break-word;
        word-break: break-all;
    }
    .title {
        height: 100%;
    }
    .tetris-cell-primary {
        flex: 1;
        height: 100%;
        padding-right: px2rem(30);
        input {
            width: 100%;
            height: 100%;
        }
    }
    .tetris-cell-ft {
        text-align: right;
        .getCode {
            color: $c-high;
            margin-right: 5px;
        }
    }
    input {
        height: px2rem(60);
        width: 6rem;
        text-align: left;
        color: #333;
        font-size: px2rem(30);
        &::-webkit-input-placeholder {
            color: #c1c1c1;
        }
    }
}
</style>
