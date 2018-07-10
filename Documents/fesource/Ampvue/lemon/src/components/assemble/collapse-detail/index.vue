<template>
    <div class="tetris-collapse-detail tetris-1px-b" :class="{'tetris-1px-t': isNeedTopBorder}">
        <aside class="detail-aside" v-if="title">{{ title }}</aside>
        <div class="detail-content" ref="detail">
            <slot></slot>
        </div>
        <label ref="angle">
            <v-icon  v-if="showMore"  @click.native="toggle" name="angle-down" size='40' color='#c1c1c1' ></v-icon>  
        </label>
    </div>
</template> 

<script>
import VIcon from '@components/basic/icon';
export default {
    name: 'collapseDetail',
    components: {
        VIcon
    },
    data() {
        return {
            isOpen: false,
            realHeight: '',
            showMore: false
        }
    },
    //isNeedTopBorder  是否需要上边框
    //title  标题 
    //isCollapse  是否有展开功能
    props: {
        isNeedTopBorder: Boolean,
        title: [String, Number],
        isCollapse: {
            type: Boolean,
            default: true
        },

    },
    created() {
        this.$nextTick(() => {
            // this.realHeight = this.$refs.detail.offsetHeight;
            this._isShowMore();
        });
        
    },
    computed: {
        iconName() {
            return this.isOpen ? 'angle-up' : 'angle-down';
        },
    },
    methods: {
         _isShowMore () {
            this.realHeight = this.$refs.detail.offsetHeight;
            // console.log(this.realHeight);
            if(this.realHeight > 20 && this.isCollapse) {
                this.showMore = true;
                this.toggle();
            }
        },
        toggle() {
            if(this.isOpen) {
                this.$refs.detail.style.height = `${this.realHeight}px`;    
                
                this.$refs.angle.style.WebkitTransform='rotate(-180deg)'; 
                this.isOpen = false;
            } else {
                this.$refs.detail.style.height = '1rem';    

                this.$refs.angle.style.WebkitTransform='rotate(0deg)';
                this.isOpen = true;  
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-collapse-detail{
    display: flex;
    align-items: flex-start;
    font-size: px2rem(28);
    padding: 15px;
    background-color: $c-white;
    aside {
        width: px2rem(200);
        color: $c-light;
        
    }
    .detail-content {
        flex: 1;
        color: #666;
        overflow: hidden;
        transition: all 400ms; 
    }
    label {
        text-align: right;
        line-height: px2rem(44);
        height: px2rem(44);
        text-align: center;
        width: px2rem(44);
        transition: all 400ms;
        transform: rotate(0deg);
    }
}

</style>
