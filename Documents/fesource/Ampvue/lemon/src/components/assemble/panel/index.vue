<template>
    <div class="tetris-panel" :class="{'tetris-1px-t': isNeedTopBorder}">
        <div class="panel-title tetris-1px-b" @click="toggle" v-show="!!title">
            <div class="panel-title-hd" :style="styleObject">
                <label>{{title}}</label>
                <span class="sub-title" v-show="!!subTitle">{{subTitle}}</span>
            </div>
            <div class="panel-title-ft">
                <v-icon v-if="isCollapse" :name="iconName" size='40' color='#d7ac62'></v-icon>
                <slot name="operator"></slot>
            </div>
        </div>
        <slot name="body">

        </slot>
    </div>
</template> 

<script>
import icon from '@components/basic/icon';
export default {
    name: 'panel',
    components: {
        'v-icon': icon
    },
    data() {
        return {
            isOpen: this.open,
        }
    },
    //isNeedTopBorder  是否需要上边框
    //title  标题 
    //subTitle  子标题
    //styleObject 标题样式可自定义
    //isCollapse  是否有展开功能
    //open icon展开的方向
    props: {
        isNeedTopBorder: Boolean,
        title: [String, Number],
        subTitle: [String, Number],
        styleObject: Object,
        isCollapse: {
            type: Boolean,
            default: false
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconName() {
            return this.isOpen ? 'angle-up' : 'angle-down';
        },
    },
    methods: {
        toggle() {
            if(this.isCollapse) {
                this.isOpen = !this.isOpen;
                this.$emit('update:open', this.isOpen);
                this.$emit('collapse', this.isOpen);
            }
        }
    },
    created() {
        
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-panel{
    background-color: $c-white;
}
.panel-title {
    position: relative;
    display: flex;
    align-items: center;
    height: px2rem(90);
    box-sizing: border-box;
    padding: 0 15px;
    font-size: px2rem(32);
    .panel-title-hd {
        display: flex;
        height: 100%;
        min-width: px2rem(200);
        line-height: px2rem(90);
        label {
            position: relative;
            display: inline-block;
            color: $c-black ;
            word-wrap: break-word;
            word-break: break-all;
        }
        .sub-title {
            color: $c-light;
            font-size: 12px;
            margin-left: 2px;
        }
    }
    .title {
        height: 100%;
    }
    
    .panel-title-ft {
        text-align: right;
        flex: 1;
    }
}

</style>
