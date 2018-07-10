<template>
    <i class='tetris' :class='iconName' :style='fontStyle'></i>
</template>

<script>
export default {
    name: 'icon',
    data() {
        return {
            
        }
    },
    /**********
    * props 说明
    * name  icon的classname
    * color icon的颜色
    * size  icon的fontsize 设计稿测量的px值
    ***********/
    props: {
        name: String,
        color: {
            type: String,
            default: '#c1c1c1'
        },
        size: {
            type: [String, Number],
            default: '16'
        }
    },
    computed: {
        iconName () {
            return 'i-' + this.name;
        },
        fontStyle () {
            // let fontList = {};
            // fontList.color = this.color;
            // fontList.fontSize = this.size / 2 + 'px';
            return `color:${this.color};font-size:${this.size / 2}px`;
        }
    },
    methods: {
        
    }
}
</script>