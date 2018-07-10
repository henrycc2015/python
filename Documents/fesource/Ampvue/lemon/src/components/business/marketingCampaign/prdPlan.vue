
<template>
    <div  class="marketingCampaign-prdPlan">
        <p class="title">{{title}}</p>
        <ul>
           <li  v-for="(item,index) in planList" @click="toggle(index)" :key="index">
               <p class="clear">
                   <span class="left">{{item.planName}} </span>
                    <span class="right">{{item.planPrice}} <i-icon style="font-weight:700;" :name="shows[index] ?'angle-up' : 'angle-down'" color="#c2c2c2" size="30"></i-icon></span>
               </p>
                <collapse-transition>
                    <div v-show="shows[index]">
                        <div class="MC-content">
                            {{item.content}}
                        </div>
                    </div>
                </collapse-transition>
            </li>
        </ul>
    </div>
</template>

<script>
import CollapseTransition from '@components/structure/collapse-transition/collapse-transition-class';
import icon from '@components/basic/icon';

export default {
    props: {
        title: {
            type : [String,Number],
            default : '保障范围'
        },
        planList: Array,
        isOpen: Boolean,
    },
    components : {
        CollapseTransition,
        'i-icon': icon
    },
    data() {
        return {
            shows:[]
        }
    },
    mounted(){
        for(var i=0;i<this.planList;i++){
            this.shows.push(this.isOpen);
        }
    },
    methods: {
        toggle(i) { 
            this.$set(this.shows,i,!this.shows[i]);
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.marketingCampaign-prdPlan {
    padding: px2rem(30) px2rem(30);
    width: 100%;
    background-color: #ffffff;
    .title {
        font-size: px2rem(32);
        color: #333;
        margin-bottom: px2rem(28);
    }
    ul {
        margin-bottom: px2rem(14);
    }
    li {
        font-size: px2rem(30);
        padding: .2rem 0;
        color: #666;
    }
    .btn {
        font-size: px2rem(30);
        color: $c-high ;
    }
    .MC-content {
        width:100%;
        color:#999;
        padding: px2rem(20) 0;
    }
}
    
</style>

