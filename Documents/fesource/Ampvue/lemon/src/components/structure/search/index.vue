<template>
    <div class="tetris-search" >
        <div class="tetris-search-input">
            <input ref="input" 
            :placeholder="placeholder" 
            v-model="currentValue" 
            @input="onInput"/>
            <v-icon style="margin-left:5px;" v-show="currentValue" name="round-cross" color="#c1c1c1" size="40" @click.native="clear"></v-icon>
        </div>
        <div class="tetris-search-cancel" v-show="currentValue || showCancel" @click="cancel">
            取消
        </div>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
export default {
    name: 'search',
    components: {
        VIcon: icon,

    },
    props: {
        value: [String, Number],
        placeholder: {
            default: '输入银行名称或首字母'
        },
    },
    computed: {
        
    },
    // directives: {
    //     FocusDom: {
    //         componentUpdated() {
    //             console.log('directive-focusdom')
    //         }
    //     }
    // },
    data () {
        return {
            currentValue: '',
            showCancel: false
        }
    },
    created(){
        this.currentValue = (this.value === undefined || this.value === null) ? '' : this.value
    },
    methods: {
        clear() {
            this.currentValue = '';
            this.showCancel = true;
            this.focus()
        },
        focus() {
            this.$refs.input.focus()
            this.$emit('on-focus', this.currentValue);
        },
        blur() {
            this.$refs.input.blur();
            this.$emit('on-blur', this.currentValue);
        },
        onBlur(){
            this.$emit('on-blur', this.currentValue);
        },
        onInput() {
            this.$emit('on-input', this.currentValue);
        },
        cancel() {
            this.currentValue = '';
            this.showCancel = false;
            this.$emit('on-cancel', this.currentValue);
        }
    },
    watch: {
        // currentValue(newVal) {
        //     this.$emit('input', newVal)
        // },
        value (val) {
            this.currentValue = val
        },
    }

}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-search {
    display: flex;
    align-items: center;
    width: 100%;
    padding: px2rem(14) 10px;  
}
.tetris-search-input {
    flex: 1;
    position: relative;
    height: px2rem(60);
    input {
        width: 100%;
        height: 100%;
        padding: 0 px2rem(20);
        color: $c-black;
        font-size: px2rem(24);
        vertical-align: middle;
        border-radius: 4px;
        &::-webkit-input-placeholder {
            text-align: center;
        }
    }
    i {
        position: absolute;
        right: px2rem(20);
        top: 0;
        height: px2rem(60);
        line-height: px2rem(60);
    }
}
.tetris-search-cancel {
    flex: px2rem(104) 0 0;
    height: 100%;
    justify-content: flex-end;
    font-size: px2rem(34);
    color: $c-high;
    padding-right: px2rem(10);
    text-align: right;
    height: px2rem(60);
    line-height: px2rem(60);
}

</style>
