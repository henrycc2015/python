<template>
    <div class="list-selected"> 
        <transition name="slide-ctl">  
            <div class="level-one" v-show="showOne" >
                <cell-display :title="major.name" v-for="(major,index) in majorObj" :key="index" :data-index="index" @click.native="toSecond(major)">
                    <v-icon v-show="major.showIcon" name="check-bold" color="#d7ac62" size="30" ></v-icon>
                </cell-display >
            </div>   
        </transition>  
        <transition :name="transitionName">
            <div class="level-two" v-show="showSecond" >
                <cell-display :title="minor.name" v-for="(minor,index) in minorObj" :key="index" @click.native="toThree(minor)">
                    <v-icon v-show="minor.showIcon" name="check-bold" color="#d7ac62" size="30" ></v-icon>
                </cell-display>
            </div>
        </transition>
        <transition name="slide-rtl">
            <div class="level-three" v-show="showThree">
                <cell-display :title="sub.name" v-for="(sub,index) in subObj" :key="index" @click.native="onThree(sub)">
                    <v-icon v-show="sub.showIcon" name="check-bold" color="#d7ac62" size="30" ></v-icon>
                </cell-display>
            </div>
        </transition>
    </div>
</template>

<script>
import cellDisplay from '@components/structure/cell/cell-display';
import icon from '@components/basic/icon';
export default {
    name: 'listSelected',
    components: {
        cellDisplay,
        'v-icon': icon
    },
    props: {
        majorData: {
            type: Array
        },
        minorData: {
            type: Array
        },
        subData: {
            type: Array
        },
    },
    data() {
        return {
            majorObj: this.majorData,
            minorObj: this.minorData,
            subObj: this.subData,
            showOne: true,
            showSecond: false,
            showThree: false,
            transitionName: 'slide-rtl',
            showIcon: false,
        }
    },
    created() {
        this.majorObj = this.majorData.map( (item, index) => {
            item.showIcon = false;
            return item
        })
        this.minorObj = this.minorData.map( (item, index) => {
            item.showIcon = false;
            return item
        })
        this.subObj = this.subData.map( (item, index) => {
            item.showIcon = false;
            return item
        })
    },
    watch: {
        
    },
    methods: {
        toSecond(obj) {
            this.showOne = false;
            this.showSecond = true;
            obj.showIcon = !obj.showIcon;
            console.log('second'+obj);
            this.$emit('on-major', obj)
        },
        toThree(obj) {
            this.showSecond = false;
            this.showThree = true;
            obj.showIcon = !obj.showIcon;
            console.log('three'+obj);
            this.transitionName = 'slide-ctl';            
            this.$emit('on-minor', obj)
        },
        onThree(obj){
            obj.showIcon = !obj.showIcon;
            console.log(obj)
            this.$emit('on-sub', obj)
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.list-selected {
    position: relative;
    .level-one,
    .level-two,
    .level-three {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 600ms ease;
    }
}
.slide-rtl-enter,
.slide-rtl-leave-active {
    transform: translate3d(100%, 0, 0);
}
.slide-ctl-enter,
.slide-ctl-leave-active {
    transform: translate3d(-100%, 0, 0);
}
</style>
