<template>
    <div class="tetris-textarea">
        <textarea
            class="weui-textarea"
            :placeholder="placeholder"
            :readonly="readonly"
            :name="name"
            :rows="rows"
            :cols="cols"
            v-model="currentValue"
            @focus="$emit('on-focus')"
            @blur="$emit('on-blur')"
            :style="textareaStyle"
            :maxlength="max"
            ref="textarea"></textarea>
        <div class="tetris-textarea-counter" v-show="showCounter && max" @click="focus">
            <span>{{count}}</span>/{{max}}
        </div>
    </div>
</template>
<script>
import Autosize from 'autosize'
export default {
    name: 'v-textarea',
    props: {
        /**********
        * props 说明
        * showCounter Boolean 默认为true，表示是否显示文本框的计算字数
        * max  Number 文本框内容的最大长度
        * value 文本框的值
        * name 文本框的name
        * placeholder 文本框默认提示语
        * readonly Boolean 是否为只读
        * rows 文本框的行数，默认3行
        * height 文本框的高度
        * autosize 文本框的高度是否为自动计算内容高度
        ***********/
        showCounter: {
            type: Boolean,
            default: true
        },
        max: Number,
        value: String,
        name: String,
        placeholder: String,
        readonly: Boolean,
        rows: {
            type: Number,
            default: 3
        },
        cols: {
            type: Number,
            default: 30
        },
        height: Number,
        autosize: Boolean,
    },
    mounted () {
        this.$nextTick(() => {
            if (this.autosize) {
                this.bindAutosize()
            }
        })
    },
    created () {
        this.currentValue = this.value
    },
    watch: {
        autosize (val) {
            this.unbindAutosize()
            if(val) {
                this.bindAutosize()
            }
        },
        value (val) {
            this.currentValue = val
        },
        currentValue (newVal) {
            if (this.max && newVal && newVal.length > this.max) {
                this.currentValue = newVal.slice(0, this.max)
            }
            this.$emit('input', this.currentValue)
            this.$emit('on-change', this.currentValue)
        }
    },
    data () {
        return {
            currentValue: ''
        }
    },
    computed: {
        count () {
            let len = 0
            if (this.currentValue) {
                len = this.currentValue.replace(/\n/g, 'aa').length
            }
            return len > this.max ? this.max : len
        },
        textareaStyle () {
            if (this.height) {
                return {
                height: `${this.height}px`
                }
            }
        },
    },
    methods: {
        updateAutosize () {
            Autosize.update(this.$refs.textarea)
        },
        bindAutosize () {
            Autosize(this.$refs.textarea)
        },
        unbindAutosize () {
            Autosize.destroy(this.$refs.textarea)
        },
        focus () {
            this.$refs.textarea.focus()
        }
    },
    beforeDestroy () {
        this.unbindAutosize()
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-textarea {
    textarea {
        display: block;
        border: 0;
        resize: none;
        width: 100%;
        padding: 10px 15px 0;
        color: inherit;
        font-size: px2rem(30);
        line-height: inherit;
        outline: 0;
        box-sizing: border-box;
        &::-webkit-input-placeholder {
            color: #c1c1c1;
        }
    }
    
}
.tetris-textarea-counter{
    width: 100%;
    background: #fff;
    line-height: px2rem(60);
    padding-right: 15px;
    color: #c1c1c1;
    text-align: right;
    font-size: px2rem(24);
    // span {
    //     font-size: px2rem(24);
    // }
}
</style>