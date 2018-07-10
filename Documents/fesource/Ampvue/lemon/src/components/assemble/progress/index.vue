<template>
    <div class="tetris-progress" :class="{'tetris-progress_vertical': orientation === 'vertical'}" >
        <div class="progress-state" v-for="(item, index) in getData" :key="++index" :class="{'active': currentStep == index}">
            <div class="progress-circle" >{{ index }}</div>
            <span v-if="stepDesc">{{ item }}</span>
        </div>
    </div>
</template>

<script>

export default {
    /**********
    * props 说明
    * stepDesc: Array,流程步骤说明文字数组，最多有4组，最少有两组
    * currentStep: 默认值是‘1’,当前步骤
    * step: 流程步骤总数，Number型，有stepDesc 就无step，最大值为4，最小值为2
    ***********/
    name: 'tetris-progress',
    props: {
        orientation: {
            type: String,
            default: 'horizontal'
        },
        stepDesc: {
            type: Array
        },
        currentStep: {
            type: String,
            default: '1'
        },
        step: {
            type: Number
        }
    },
    computed: {
        getData () {
            return this.stepDesc ? this.stepDesc : this.step;
        }
    },
    data () {
        return {
            progressData: []
        }
    }

}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
$b: #47b2ac;
.tetris-progress {
    text-align: center;
    background-color: #fff;
    font-size: 0;
    .progress-state {
        display: inline-block;
        text-align: center;
        color: #999;
        font-size: 12px;
        padding: px2rem(18) 0 px2rem(16);
        width: px2rem(196);
    }
    .progress-circle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: px2rem(44);
        height: px2rem(44);
        margin: 0 auto px2rem(8);
        border-radius: 50%;
        border: 2px solid #dcdcdc;
        color: #999;
        font-size: 8px;
        text-align: center;
        box-sizing: border-box;
        
    }

    .progress-circle:before,
    .progress-circle:after {
        position: absolute;
        content: '';
        height: 2px;
        width: px2rem(76);
        background: #dcdcdc;
        top: px2rem(16);
    }
    .progress-circle:before {
        left: px2rem(-80);
    }
    .progress-circle:after {
        left: px2rem(40);
    }
    .progress-state:first-child {
        width: px2rem(160);
        .progress-circle:before{
            width: 0;
        }
    } 
    .progress-state:last-child {
        width: px2rem(160);
        .progress-circle:after{
            width: 0;
        }
    }
    .progress-state.active {
        color: $b;
        .progress-circle {
            color: $b;
            border-color: $b;
        }
        .progress-circle:before,
        .progress-circle:after {
            background: $b;
        }
    }
}


</style>
