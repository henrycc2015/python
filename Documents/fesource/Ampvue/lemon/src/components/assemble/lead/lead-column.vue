<template>
    <div class="tetris-lead-column">
        <h6>{{ label }}</h6>
        <h2>{{ content }}</h2>
        <div v-if="!isLogin" class="lead-column-btn"><button-group size="sm" type="transparent" radius @click.native="login">点击登录</button-group></div>
        <v-flexbox>
            <v-flexbox-item v-for="item in elements" :key="item.id" :span="item.span" :style="item.padding">
                <span>{{ item.desc }}</span>
                <span>{{ item.text }}</span>
            </v-flexbox-item>
        </v-flexbox>
    </div>
</template>

<script>
import Flexbox from '@components/structure/flexbox/flexbox';
import FlexboxItem from '@components/structure/flexbox/flexbox-item';
import buttonGroup from '@components/basic/button/button-group'
export default {
    name: 'lead-column',
    components: {
        'v-flexbox': Flexbox,
        'v-flexbox-item': FlexboxItem,
        buttonGroup
    },
    props: {
        label: String,
        content: String,
        //是否登录，未登录状态显示立即登录按钮
        isLogin:{
            type:Boolean,
            default:false
        }
    },
    data() {
        
        var slots = this.$slots.default,
            elems = [], options, children;

        if(this.$slots.hasOwnProperty('default') ){
            slots.forEach(function (s) {
                options = s.componentOptions;
                if (options) {
                    children = options.children;
                    if (children.length > 0 && typeof children[0].text !== 'undefined') {
                        elems.push({
                            id: options.propsData.id,
                            text: children[0].text,
                            desc: options.propsData.desc,
                            span: options.propsData.span
                        });
                    }
                    if(elems.length > 2) {
                        elems[0].padding = 'padding-left: 8px';
                    }
                }
            });
        } 
        return {
            elements: elems
        }
    },
    methods:{
        login(){
            this.$emit('on-login')
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';

.tetris-lead-column {
    width: 100%;
    padding: 15px;
    height: auto;
    background: $c-land;
    overflow: hidden;
    & > h6 {
        font-weight: normal;
        font-size: px2rem(24);
        color: #999;
        text-align: center;
    }
    & > h2 {
        font-weight: normal;
        font-size: px2rem(50);
        color: $c-high;
        text-align: center;
        margin-bottom: 10px;
    }
    & > .lead-column-btn{
        text-align:center;
        margin-bottom:10px
    }
    .tetris-flexbox-item:first-child {
        padding-left: px2rem(90);
    } 
    .tetris-flexbox-item > span:first-child {
        display: block;
        font-size: px2rem(24);
        color: #999;
    }
    .tetris-flexbox-item > span:nth-of-type(2) {
        display: block;
        font-size: px2rem(40);
        color: #fff;
    }
}
</style>
