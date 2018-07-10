<template>
    <div class="confirm">
        <v-dialog 
        v-model="showValue" 
        :hide-on-blur="hideOnBlur"
        @on-hide="$emit('on-hide')"
        @change="onChange">
            <div class="confirm-wrap" >
                <h2 v-if="!!titleText">{{ titleText }}</h2>
                <div class="confirm-bd" :class="{line0ne: line==='1',lineMore: line==='3'}">
                    <slot><div v-html="content"></div></slot>
                </div>
                <div class="confirm-ft tetris-1px-t">
                    <span class="cancelBtn tetris-1px-r" @click="_onCancel" v-if="!!cancelText">{{ cancelText }}</span>
                    <span @click="_onConfirm">{{ confirmText }}</span>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import dialog from '@components/structure/dialog';
export default {
    name: 'v-confirm',
    components: {
        'v-dialog': dialog
    },
    props: {
        // line: 3  多行 局左边
        line: {
            type: String,
            default: '2'
        },
        titleText: String,
        content: String,
        cancelText: String,
        confirmText: String,        
        value: {
            type: Boolean,
            default: false
        },
        hideOnBlur: Boolean,
        closeOnConfirm: {
            type: Boolean,
            default: true
        },
    },
    created () {
        this.showValue = this.show
        if (this.value) {
            this.showValue = this.value
        }
    },
    watch: {
        value (val) {
            this.showValue = val;
        },
        showValue (val) {
            this.$emit('input', val);
            if (val) {
                this.$emit('on-show');
            }
            
        }
    },
    data () {
        return {
            showValue: false
        }
    },
    methods: {
        onTouchMove (event) {
            !this.scroll && event.preventDefault();
        },
        // hide () {
        //     if (this.hideOnBlur) {
        //         this.$emit('update:show', false);
        //         this.$emit('change', false);
        //     }
        // },
        onChange () {
            this.$emit('on-change', false);
        },
        _onCancel: function(){
            this.showValue = false;
            this.$emit('on-cancel');
        },
        _onConfirm: function() {           
            if (this.closeOnConfirm) {
                this.showValue = false;
            }
            this.$emit('on-confirm');
        }
    }
}
</script>

<style lang="scss">
@import 'src/style/mixin';

.confirm-wrap {
    padding-top: px2rem(40);
    width: 100%;
    background: #fff;
    border-radius: 4px;
    z-index: 1000;

    h2 {
        color: #333;
        font-size: px2rem(34);
        line-height: px2rem(50);
        font-weight: normal;
        margin: 0 px2rem(20) px2rem(15);
    }
}
.confirm-bd{
    text-align: center;
    padding: 0 px2rem(50) px2rem(38);
    font-size: px2rem(30);
    color: #666;
    line-height: 1.8;

    input {
        width: 90%;
        height: px2rem(74);
        line-height: 1.5;
        border: 1px solid #dcdcdc;
        padding: 0 px2rem(20);
        color: #333;
        font-size: px2rem(30);

        &::-webkit-input-placeholder {
            color: #c1c1c1;
        }
    }
}
.confirm-ft{
    width: 100%;
    // border-top: 1px solid #c1c1c1;
    height: px2rem(90);
    line-height: px2rem(90);
    font-size: 0;
    span {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: px2rem(32);
        color: $c-high ;
    }
}
.line0ne {
    font-size: px2rem(40);
    color: #666;
    text-align: center;
}
.lineMore {
    text-align: left;
}

</style>