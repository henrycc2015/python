<template>
    <div class="v-dialog" @touchmove="onTouchMove">
        <transition :name="maskTransition">
            <div class="tetris-mask" @click="hide" v-show="show">
                <transition :name="dialogTransition">
                    <div :class="dialogClass" :style="dialogStyle" v-show="show">
                        <slot></slot>
                    </div>
                </transition>
            </div>
        </transition>
        
    </div>
</template>

<script>
export default {
    name: 'v-dialog',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        maskTransition: {
            type: String,
            default: 'vt-mask'
        },
        dialogTransition: {
            type: String,
            default: 'vt-dialog'
        },
        dialogClass: {
            type: String,
            default: 'tetris-dialog'
        },
        hideOnBlur: Boolean,
        dialogStyle: Object,
        scroll: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        show (val) {
            this.$emit('update:show', val);
            this.$emit(val ? 'on-show' : 'on-hide');
        }
    },
    methods: {
        onTouchMove (event) {
            !this.scroll && event.preventDefault();
        },
        hide () {
            if (this.hideOnBlur) {
                this.$emit('update:show', false);
                this.$emit('change', false); 
            }
        }
    }
}
</script>

<style lang="scss">
@import 'src/style/tetrisui/ui_dialog/tetris_dialog';
@import 'src/style/tetrisui/ui_dialog/tetris_mask';
@import 'src/style/transition';

</style>