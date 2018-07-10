<template>
    <transition name="popup-animate-bottom">
        <div v-show="show && !initialShow" :style="styles" class="tetris-popup-dialog" :class="[`tetris-popup-${position}`, show ? 'tetris-popup-show' : '']">
        <slot></slot>
        </div>
    </transition>
</template>

<script>
import Popup from './popup'
export default {
    name: 'popup',
    props: {
        value: Boolean,
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: 'auto'
        },
        showMask: {
            type: Boolean,
            default: true
        },
        isTransparent: Boolean,
        hideOnBlur: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'bottom'
        },
        maxHeight: String,
        popupStyle: Object,
        hideOnDeactivated: {
            type: Boolean,
            default: true
        }
    },
    mounted () {
        this.$nextTick(() => {
            const _this = this
            this.popup = new Popup({
                showMask: _this.showMask,
                container: _this.$el,
                hideOnBlur: _this.hideOnBlur,
                onOpen () {
                    //_this.fixSafariOverflowScrolling('auto')
                    _this.show = true
                },
                onClose () {
                    _this.show = false
                    if (window.__$vuxPopups && Object.keys(window.__$vuxPopups).length > 1) return
                    if (document.querySelector('.tetris-popup-dialog.tetris-popup-mask-disabled')) return
                    // setTimeout(() => {
                    //     _this.fixSafariOverflowScrolling('touch')
                    // }, 300)
                }
            })
            if (this.value) {
                this.popup.show()
            }
            this.initialShow = false
        })
    },
    deactivated () {
        if (this.hideOnDeactivated) {
            this.show = false
        }
    },
    methods: {


    },
    data () {
        return {
            initialShow: true,
            hasFirstShow: false,
            show: this.value
        }
    },
    computed: {
        styles () {
            const styles = {}
            if (!this.position || this.position === 'bottom' || this.position === 'top') {
                styles.height = this.height
            } else {
                styles.width = this.width
            }

            if (this.maxHeight) {
                styles['max-height'] = this.maxHeight
            }

            this.isTransparent && (styles['background'] = 'transparent')
            if (this.popupStyle) {
                for (let i in this.popupStyle) {
                    styles[i] = this.popupStyle[i]
                }
            }
            return styles
        }
    },
    watch: {
        value (val) {
            this.show = val
        },
        show (val) {
            this.$emit('input', val)
            if (val) {
                this.popup && this.popup.show()
                this.$emit('on-show')
                //this.fixSafariOverflowScrolling('auto')
                if (!this.hasFirstShow) {
                this.$emit('on-first-show')
                this.hasFirstShow = true
                }
            } else {
                this.$emit('on-hide')
                this.show = false
                this.popup.hide(false)
                // setTimeout(() => {
                //     if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
                //         this.fixSafariOverflowScrolling('touch')
                //     }
                // }, 200)
            }
        }
    },
    beforeDestroy () {
        this.popup.destroy()

    }
}
</script>

<style lang="scss" >
@import 'src/style/mixin';

$radio-prefix-cls: 'tetris-popup';
.#{$radio-prefix-cls}-dialog {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 1001;
    transform: translate3d(0, 0, 0);
    transition-property: all;
    transition-duration: 300ms;
    max-height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

.#{$radio-prefix-cls}-mask {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    z-index: -1;
    transition: opacity 400ms;
}
.#{$radio-prefix-cls}-mask.#{$radio-prefix-cls}-show {
    opacity: 1;
}

.popup-animate-bottom-enter, .popup-animate-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
}

</style>
