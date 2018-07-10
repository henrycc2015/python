<template>
    <div class="muliple-ellipsis">
        <div class='mui-ellipsis' id="ellipsis-text" ref='text' v-text="content"  :style='campStyle'></div>
        <div v-if="isShowBtn" class="btn" @click="tapFuc">
            {{toggleName}}
        </div>
    </div>
</template>

<script>
import VIcon from '@components/basic/icon';
export default {
    components: {
        VIcon
    },
    props: {
        itemDesc: [String],
        // showMore: [String,Number],
        lineCap: [String, Number],
    },
    data() {
        return {
            isShowAll: false,
            campStyle: '',
            // tempMsg: this.btnMsg,
            iconName: 'angle-down',
            isShowBtn: false,
            time: true,
            toggleName: '展开',
        }
    },
    computed: {
        content() {
            this.$nextTick(() => {
                this.judgeHeight();
            })
            return this.itemDesc.split('\r\n').join('</br>')
        },
    },
    methods: {
        judgeHeight() {
            if (!this.time) {
                return;
            }
            // wx.createSelectorQuery().select('#ellipsis-text').fields({
            //     computedStyle: ['lineHeight']
            // },  function(res){
            //     let aaa = res.lineHeight;
            //     console.log(aaa);
            // }).exec();

            // let lineHeight = window.getComputedStyle(this.$refs.text).lineHeight;
            // let height = window.getComputedStyle(this.$refs.text).height;
            // if (lineHeight.slice(0, lineHeight.indexOf('px')) * this.lineCap < height.slice(0, height.indexOf('px'))) {
            //     this.campStyle = 'height:' + 1.2 * this.lineCap + 'rem;'
            //     this.isShowBtn = true;
            // }
            // this.time = !this.time
        },
        tapFuc() {
            if (this.campStyle == 'height:auto;') {
                this.campStyle = 'height:' + 1.2 * this.lineCap + 'rem;'
                this.toggleName = '展开'
            } else {
                this.campStyle = 'height:auto;'

                this.toggleName = '收起'
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import "src/style/mixin.scss";
.muliple-ellipsis {
  width: 100%;
    .mui-ellipsis {
        position: relative;
        color: #333;
        font-size: px2rem(26);
        padding-top: 4px;
        line-height: 1.2rem;
        overflow: hidden;
        word-break: break-all;
    }
    .btn {
        color: $c-high;
    }
}

</style>