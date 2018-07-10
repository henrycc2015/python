<template>
    <div class="tetris-upload">
        <div class="tetris-upload_title tetris-1px-b" >
            <v-icon name="circle-question" size="32" color="#d7ac62"></v-icon>
            <span>{{ titleInf }}</span>
            <span ref="del" v-show="showEditor" @click="del" class="tetris-upload_editorbtn" >编辑</span>
        </div>
        <annotation tl="left" >主被保险人{{countmaster}}/{{ total }}<span class="c-high">（必传）</span></annotation>
        <v-add-photo ref="part1"
        :img-data="resData1" 
        :param-data="paramDatas1" 
        :upload-url="uploadUrl"
        :editor="isEditor" 
        @on-uploadimg="uploadImg('part1')"
        @listen="showCountMaster" 
        @listencheck="showCheckPart1"></v-add-photo>
        <annotation tl="left" >连带被保险人{{count}}/{{ total }}<span class="c-high">（必传）</span></annotation>
        <v-add-photo ref="part2" 
        :img-data="resData2" 
        :param-data="paramDatas2"
        @on-uploadimg="uploadImg('part2')"
        :editor="isEditor" 
        @listen="showCount" @listencheck="showCheckPart2"></v-add-photo>
        <stub></stub>
        <annotation tl="left" lh="1.8">
            <strong>特别提示：</strong><br/>
            请您在30天内提供最近6个月体检报告影像，我们尽快为您承保，感谢您的配合<br/>
            超过30天未提交则需要您重新投保
        </annotation>
        <div class="footer tetris-1px-t">
            <button-group v-if="!isEditor" radius :disabled="!showEditor" @click.native="onNext">下一步</button-group>
            <button-sum 
                @choose-all="chooseAll"
                v-else
                :value.sync="ischecked" 
                hascheckbox 
                :show-total="false"
                :disabled="!(ischecked || canDel1 || canDel2)" 
                @on-commit="onDeleteAll()" >删除</button-sum>
        </div>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
import stub from '@components/structure/stub';
import AddPhoto from '@components/assemble/upload/add-photo.vue';
import cellDisplay from '@components/structure/cell/cell-display';
import annotation from '@components/assemble/annotation';
import buttonSum from '@components/basic/button/button-sum';
import buttonGroup from '@components/basic/button/button-group';
import * as _ from 'src/utils/ui.tool';
export default {
    name: 'upload',
    components: {
        'v-icon': icon,
        'button-group': buttonGroup,
        'button-sum': buttonSum,
        'v-add-photo': AddPhoto,
        'cell-display': cellDisplay,
        annotation,
        stub,
    },
    props: {
        titleInf: {
            type: String,
            default: '上传须知'
        },
        iseditor: Boolean,
        total: {
            type: Number,
            default: 50
        },
        uploadUrl: String
    },
    data() {
        return {
            isEditor: false,
            countmaster: 0,
            count: 0,
            ischecked: false,
            canDel1: false,
            canDel2: false,
            allC1: false,
            allC2: false,
            ableDel: false,
            resData1: [],
            resData2: [],
            paramDatas1: {},
            paramDatas2: {},
        }
    },
    computed: {
        showEditor() {
            return (this.countmaster >0 || this.count >0) ? true : false;
        },
    },
    methods: {
        uploadImg (obj, val) {
            let resId = Math.ceil( Math.random()*100000)
            this.$refs[obj].pushData(resId);          
            _.alert('上传成功');
            setTimeout(function(){
                this.showBtn = true;
            },1000);
        },
        showCountMaster (data) {
            this.countmaster = data;
        },  
        showCount (data) {
            this.count = data;
        },
        showCheckPart1 (val) {
            this.canDel1 = val.choose != 0;
            this.allC1 = val.choose == val.count;
        },
        showCheckPart2 (val) {
            this.canDel2 = val.choose != 0;
            this.allC2 = val.choose == val.count;
        },
        /*
        * 是否编辑状态
        */
        del () {
            this.isEditor = !this.isEditor;
            if(this.isEditor) {
                this.$refs.del.innerHTML = '取消';
            }else {
                this.$refs.del.innerHTML = '编辑';
            }
            this.$refs['part1'].chooseAll(false);
            this.$refs['part2'].chooseAll(false);
            this.ischecked = this.canDel1 = this.canDel2 = false;
        },
        onNext () {

            this.$emit('on-nextstep','next');
        },
        onDeleteAll () {

            this.$emit('on-delall','delall');
        },
        /*
        * 全选radio
        */
        chooseAll (){
            this.$refs['part1'].chooseAll(this.ischecked);
            this.canDel1 = this.ischecked;
            this.ischecked1 = this.ischecked;
            this.$refs['part2'].chooseAll(this.ischecked);
            this.ischecked2 = this.ischecked;
            this.canDel2 = this.ischecked
        }
    },
    watch: {
        allC1(val){
            this.ischecked = this.allC1 && this.allC2;
        },
        allC2(val){
            this.ischecked = this.allC1 && this.allC2;
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-upload {
    position: relative;
    height: 100%;
    .tetris-upload_title {
        background-color: #fff;
        height: px2rem(90);
        line-height: px2rem(50);
        box-sizing: border-box;
        padding: px2rem(20) 15px;
        font-size: px2rem(30);
        color: $c-high ;
    }
    .c-high {
        color: $c-high ;
    }
    .tetris-upload_editorbtn {
        float: right;
        font-size: px2rem(34);
    }
    .footer {
        text-align: center;
        line-height: px2rem(120);
    }
}
</style>
