<template>
    <div class='tetris-stick tetris-1px-b' ref="stick" v-show='showTips'  >
        <div class="tetris-stick-text">
            <slot></slot>
        </div>
        <div class="tetris-stick-icon" ref="angle" >
            <v-icon color='#d7ac62' size='40' @click.native="close" name='cross' v-if='closable'></v-icon>
            <v-icon  v-else-if="showMore"  @click.native="toggle" :name="iconName" size='40' color='#d7ac62' ></v-icon>     
        </div>
    </div>
</template>

<script>
import VIcon from '@components/basic/icon';
    export default {
        /**********
        * props 说明
        * closable: Boolean 默认值为 true，即默认有关闭icon
        * open: Boolean 默认是否展示更多内容
        ***********/
        props: {
            closable: {
                type: Boolean,
                default: true
            },
            // isCollapse: {
            //     type: Boolean,
            //     default: false
            // },
            open: {
                type: Boolean,
                default: false
            },
            hideLoading: {
                type: Boolean,
                default: false
            }
        },
        components: {
            VIcon,
        },
        data: function() {
            return {
                showTips        : true,
                showCloseIcon   : this.closable,
                isOpen          : this.open,
                realHeight      : '',
                showMore        : false,
            };
        },
        computed: {
            iconName() {
                return this.isOpen ? 'angle-down' : 'angle-up';
            },
        },
        watch: {
            hideLoading() {
                this.$nextTick(() => {
                    this._isShowMore();
                });
            }
        },
        created() {
            this.$nextTick(() => {
                this._isShowMore();
            });
            
        },
        methods: {
            close: function () {
                this.showTips = false;
                this.$emit('closeTip');
            },
            _isShowMore () {
                this.realHeight = this.$refs.stick.offsetHeight;
                if(this.realHeight > 42) {
                    this.showMore = true;
                    this.toggle();
                }
            },
            toggle() {
                if(this.isOpen) {
                    this.$refs.stick.style.height = `${this.realHeight}px`;    
                    this.isOpen = false;
                } else {
                    this.$refs.stick.style.height = '1.85rem';    
                    this.isOpen = true;  
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.tetris-stick {
    background-color: #fffce8;
    padding: px2rem(14) 15px px2rem(12);
    font-size: px2rem(24);
    line-height: px2rem(50);
    color: #666;
    overflow: hidden;
    transition: all 400ms; 
    .tetris-stick-text {
        width: 100%;
        padding-right: px2rem(40);     
        // line-height: 2.1; 
    }
    
    .tetris-stick-icon {
        position: absolute;
        right: 15px;
        top: 0;
        right: 0;
        text-align: center;
        line-height: px2rem(74);
        height: px2rem(74);
        text-align: center;
        width: px2rem(74);
        transition: all 400ms;
        transform: rotate(0deg);
    }
}

</style>