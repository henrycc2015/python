<template>
    <div class="digital-flip" ref="flip">
        <div class="num top" ref="top" >{{topTime}}</div>
        <div class="num bottom">
            <div class="bottom-container" ref="bottom">
                {{bottomTime}}
            </div>
        </div>
        <div class="swappter">
            <div class="num-anim top-anim" :class="{'visible': isVisiable,'up': anim}">
                <div class="top-half-num" ref="tophalf">{{previousTime}}</div>
            </div>
            <div class="num-anim bottom-anim" :class="{'visible': isVisiable,'down': anim}">
                <div class="bottom-half-num" >
                    <div class="dropper" ref="dropper">{{newTime}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    //组件名字，可选
    name: 'digitalFlip',

    //混合对象
    mixins: [],

    //注册组件
    components: {

    },

    //组件入参
    props: {
        countTime: {
            type: String,
            default: '0'
        }
    },

    //组件响应式数据
    data() {
        return {
            topTime: this.countTime,
            bottomTime: this.countTime,
            previousTime: this.countTime,
            newTime: this.countTime,
            isVisiable: false,
            anim: false,
            isShow: false,
        }
    },

    //完成了 data 数据的初始化，el没有
    created() {
         
    },
    watch: {
        countTime(val){
            this.topTime = val;
            this.bottomTime = val;
            this.previousTime = val;
            this.newTime = val;
        }
    },
    //组件内部方法
    methods: {
        initTime() {
            let currentTime = new Date();
            currentTime = currentTime.getSeconds() + '';
            this.newTime = currentTime.slice(1,2);
            this.setTime(this.previousTime, this.newTime);
            setTimeout(() => {
                this.initTime();
            },1000)
        },
        setTime(previousTime, newTime, type) {
            if (previousTime == newTime) {
                return;
            }
            setTimeout(() => {
                this.topTime = newTime;
            }, 150);
            setTimeout(() => {
                this.bottomTime = newTime;
            }, 365);
            this.animateTime(previousTime, newTime, type)
        },
        animateTime(previousTime, newTime, type) {
            this.previousTime = previousTime;
            this.newTime = newTime;

            this.isShow = true;
            this.isVisiable = true;
            this.animateNumSwap(type);
            setTimeout(() => {
                this.hideNumSwap(type);
            }, 365);
        },
        animateNumSwap(type) {
            this.anim = true;
        },
        hideNumSwap(type) {
            this.anim = false;
            this.isVisiable = false;
        }

    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.digital-flip {
    display: inline-block;
    position: relative;
    width: px2rem(50);
    height: px2rem(84);
    line-height: px2rem(84);
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
    text-align: center;
    background: linear-gradient(top, #ececec, #dedede);  
    overflow: hidden;
    perspective-origin: 50% 50%;

    .num {
        display: inline-block;
        position: absolute;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 50%;
        overflow: hidden;
        font-size: px2rem(60);
        font-weight: bold;
    }
    .top {
        top: 0;
        background: linear-gradient(top, #dbdbdb, #bbbbbb);  
        
    }     

    .bottom {
        top: 50%;
        height: 50%;
        background: linear-gradient(top, #ececec, #dedede);  
    }
    .bottom-container {
        margin-top: -85%;
        font-weight: bold;
    }

    .swappter {
        position: relative;
        z-index: 20;
    }
    .num-anim {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: px2rem(84);
        width: px2rem(50);
        font-size: px2rem(60); 
        font-weight: bold;
    }

    .top-half-num,
    .bottom-half-num {
        text-align: center;
        overflow: hidden;
        padding-top: 0;
    }

    .top-half-num {
        height: 50%;
    }

    .bottom-half-num {
        height: 50%;
        margin-top: 65px;
        background: linear-gradient(top, #ececec, #dedede);  
    }

    .dropper {
        margin-top: -65px;
    }

    .show {
        display: block;
    }

    .top-anim {
        visibility: hidden;
        // background: linear-gradient(top, #dbdbdb, #bbbbbb); 
        transform: perspective(80px) rotateX(0deg) rotateY(0deg);
    }

    .bottom-anim {
        visibility: hidden;
        top: 0;
        left: 0;
        transform: perspective(80px) rotateX(90deg) rotateY(0deg);
    }

    .visible {
        visibility: visible;
    }

    .up {
        visibility: visible;
        transform: perspective(80px) rotateX(-90deg) rotateY(0deg);
        transition: all 10s;
    }

    .down {
        visibility: visible;
        transform: perspective(80px) rotateX(0deg) rotateY(0deg);
        transition: all 10s;
        transition-delay: 10s;
    }
}


</style>
