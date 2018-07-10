<template>
    <div  class="marketingCampaign-prdAbout">
        <p class="title">{{title}}</p>
        <div class='mui-ellipsis' ref='text' v-html="content"  :style='campStyle'></div>
        <p v-if="isShowBtn" class="btn" @click="tapFuc">{{tempMsg}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: [String,Number],
        contentList: [String],
        btnMsg: [String,Number],
        lineCap: [String,Number],
    },
    data() {
        return {
            // content: '',
            isShowAll: false,
            campStyle: '',   
            tempMsg: this.btnMsg,
            isShowBtn: false,
            time:true,
        }
    },
    computed: {
        content () {
            return this.contentList.split('\r\n').join('</br>')
        },
    },
    // watch: {
    //     contentList(curVal,oldVal){
    //         debugger;
    //         console.log(curVal + ' ' + oldVal)
    //         this.content = curVal.split('\r\n').join('</br>')
    //     }
    // },
    updated(){
        this.judgeHeight()
    },
    methods: {
        judgeHeight(){
            if(!this.time){
                return
            }
            let lineHeight = window.getComputedStyle(this.$refs.text).lineHeight;
            let height = window.getComputedStyle(this.$refs.text).height;
            if(lineHeight.slice(0,lineHeight.indexOf('px'))*this.lineCap < height.slice(0,height.indexOf('px'))){
                this.campStyle='height:'+ 1.1*this.lineCap + 'rem;'
                this.isShowBtn=true;
            }
            this.time = !this.time
        },
        tapFuc(){
            if(this.campStyle == 'height:auto;'){
                this.campStyle = 'height:' + 1.1*this.lineCap + 'rem;'
                this.tempMsg = this.btnMsg
            }else {
                this.campStyle = 'height:auto;'
                this.tempMsg = '收起'
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
@import 'src/style/variables.scss';

.marketingCampaign-prdAbout {
    padding: px2rem(30) px2rem(30);
    width: 100%;
    background-color: #ffffff;
    .title {
        font-size: px2rem(32);;
        color: #333;
        margin-bottom: px2rem(30);
    }
    .btn {
        font-size: px2rem(30);
        color: $c-high ;
    }
}

.mui-ellipsis {
    position:relative;
    font-size: px2rem(30);
    color: #666;
    margin-bottom: px2rem(14);
    line-height:1.1rem;
    /* 3 times the line-height to show 3 lines */
    overflow:hidden;
}

</style>

