<template>
    <div>
        <div class="tetris-add-photo tetris-1px-b">
            <div class="tetris-add-photo_img" v-for="item in imgObj" :key="item.id" @click="change(item)" v-show="imgData.length>0">
                <img ref="image" :src="item.url" :id="item.id"/>
                <div class="tetris-add-photo_mask" v-show="editor && !item.mask"></div>
                <v-icon name="radio-checked" :color="getColor(item)" size="40" v-show="editor"></v-icon>
            </div>
            <div id="add" class="tetris-add-photo_btn" @click="add" v-if="isApp" v-show="!editor">
                <v-icon name="plus-thin" size="100" color="#c1c1c1"></v-icon>
                <div class="upload-click"></div>
            </div>
            <div id="add" class="tetris-add-photo_btn" @change="add" v-else v-show="!editor">
                <v-icon name="plus-thin" size="100" color="#c1c1c1"></v-icon>
                <input type="file" accept="image/*" />
            </div>
        </div>
        <div class="tetris-show-image" v-show="imageShow" @click="close">
            <span :style="styleObj"></span>
            <!--<div class="delete-image" >
                <span >1/{{count}}</span>
                <span class="del-text" @click="deleteImg">删除</span>
            </div>-->
        </div>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
import js_upload_file from 'src/hybrids/cellb/js_upload_file';
import * as _ from 'src/utils/ui.tool';

export default {
    name: 'add-photo',
    components: {
        'v-icon': icon
    },
    props: {
        previewImg: {
            type: Boolean,
            default: false
        },
        maxImgLen: {
            type: Number,
            default: 50
        },
        editor: Boolean,
        paramData: {
            type: [Object, String]
            // default: function () {
            //     return {}
            // }
        },
        imgData: {
            type: Array,
            default: function () {
                return []
            }
        },
        uploadUrl: String,
        refKey: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isApp: true,
            count: 0,
            imgObj: this.imgData,
            mask: false,
            dataUrl: '',
            newImg: {},
            temUrl: '',
            styleObj: {},
            temStyle: {},
            imageShow: false,
        }
    },
    created() {
        this.isApp = window.isApp;
    },
    watch: {
        imgData() {
            this.imgObj = this.imgData;
            this.count = this.imgObj.length;
        },
    },
    methods: {
        // icon 是否选中
        getColor(item) {
            return item.mask ? '#d7ac62' : '#c1c1c1';
        },
        // 是否选中图片 或 浏览大图
        change(item) {
            if (this.editor) {
                item.mask = !item.mask;
                let list = this.imgObj.filter((item) => { return item.mask });
                // emit 上传图片的总数 和 选中图片总数
                // emit 上传图片的总数 和 选中图片总数
                this.$emit('listencheck', {
                    count: this.imgObj.length,
                    choose: list.length,
                    mask: item.mask,
                    imageId: item.id
                });
            } else {
                if(this.previewImg) {
                    // 跳转路由 展示大图
                    this.$emit('show-preview', item);
                } else {
                    // 当前页面里展示大图
                    this.showImage(item);
                }
            }
        },
        /**
        * 浏览大图
        */
        showImage(ele) {
            this.styleObj = {
                backgroundImage: `url(${ele.url})`
            };

            this.imageShow = true;
        },
        add(e) {
            if(this.count > (this.maxImgLen - 1) || this.imgObj.length > (this.maxImgLen - 1)) {
                _.alert(`最多上传${this.maxImgLen}张`);
                return;
            }
            if (window.isApp) {
                this.appUpload();
            } else {
                this.wxUpload(e);
            }
        },
        /**
        * APP端上传
        */
        appUpload() {
            let that = this;
            let params = {
                width: 200,
                height: 200,
                size: 200,
                quality: 0.7,
                url: this.uploadUrl,
                param: JSON.stringify(that.paramData),
                uploadCallback: 'uploadCallback'
            };

            window.uploadCallback = that.uploadCallback;
            js_upload_file(params, that.fnBack, that.fnFail);

            // that.fnBack({
            //     thumb: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 59 62"> <defs><radialGradient r="0.5" cy="0.34375" cx="0.60156" id="svg_g"><stop offset="0" stop-color="#ffffaa"/><stop offset="1" stop-color="#' +
            //         Math.random().toString(16).match(/.{6}$/)[0] +
            //         '"/></radialGradient></defs><path stroke="blue" d="m1.3,60.6l11.4,-21.6l0,0c-12.1,-6.5 -15.5,-18.8 -7.9,-28.3c7.5,-9.5 23.7,-13.3 37.2,-8.6c13.5,4.6 20.1,16.2 15.1,26.7c-4.9,10.4 -19.8,16.4 -34.3,13.7l-21.4,18.1z" fill="url(#svg_g)"/></svg>'
            // });
            // that.uploadCallback({
            //     returnFlag: 200,
            //     fileId: 'fileid',
            //     fileName: 'fileName',
            //     imageId: String(+new Date()),
            //     imagePath: '/imagePath/12212/'
            // });            
        },
        /**
        * 微信端上传
        */
        wxUpload(e) {
            let _self = e.target;
            let that = this;
            let filereader = new FileReader();
            filereader.readAsDataURL(_self.files[0]);
            filereader.onload = function () {
                that.temUrl = this.result;
                that.compress(this.result);
                _self.value = '';
            };
        },
        fnBack(info) {
            if (this.$device.isAndroid) {
                _.showLoading('正在上传...')
            }
            this.temUrl = info.thumb; //app上传返回的图片字符串
        },
        fnFail(msg) {
            _.alert(msg)
        },
        /**
        * native 请求图片后回调
        */
        uploadCallback(res) {
            if (typeof res === 'string' && res.indexOf('取消') > -1) {
                res = {
                    returnMsg: res
                };
            }
            if (res) {
                if (res.returnFlag && res.returnFlag === '200') {
                    this.$emit('on-appupload', res, this.refKey);
                    // this.pushData(res.id) 修改 父组件实现此功能
                    this.count++;
                    // emit 上传图片的总数
                    this.$emit('listen', this.count);
                } else {
                    _.alert(res.returnMsg);
                }
            }

            if (this.$device.isAndroid) {
                _.hideLoading()
            }
        },
        /**
        * 压缩图片并上传
        */
        compress(imgData) {
            let that = this;
            const IMG = new Image(),
                MAXH = 600,
                MAXW = 600;
            const ISIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            IMG.src = imgData;
            IMG.onload = function () {
                let cvs = document.createElement('canvas');
                let ctx = cvs.getContext('2d');
                let rate = 1;
                if (IMG.height > MAXH) {
                    rate = MAXH / IMG.height;
                }
                if (IMG.width * rate > MAXW) {
                    rate = MAXW / IMG.width;
                }
                if (ISIOS) {
                    cvs.width = IMG.height * rate;
                    cvs.height = IMG.width * rate;
                    ctx.translate(cvs.width / 2, cvs.height / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(IMG, -cvs.height / 2, -cvs.width / 2, cvs.height, cvs.width);
                } else {
                    cvs.width = IMG.width * rate;
                    cvs.heigh = IMG.height * rate;
                    ctx.clearRect(0, 0, cvs.width, cvs.height);
                    ctx.drawImage(IMG, 0, 0, cvs.width, cvs.height);
                }

                that.dataUrl = cvs.toDataURL('image/png', rate);
                that.count++;
                // emit 上传图片的总数
                that.$emit('listen', that.count);
                // emit 出压缩后图片信息
                that.$emit('on-uploadimg', that.dataUrl, that.refKey);

            }
        },
        /**
        * 给图片添加id ，mask和 url属性
        */
        pushData(imgId) {
            this.imgObj.push({
                url: this.temUrl,
                mask: false,
                id: imgId
            });
        },
        /**
        * 选择所有图片
        */
        chooseAll(flag) {
            this.imgObj.forEach((img) => {
                img.mask = flag;
            });
        },
        /**
        * 获取所有图片ID
        */
        getImgId() {
            const idList = [];
            let that = this;
            for (let i = 0; i < that.imgObj.length; i++) {
                idList.push(that.imgObj[i].id);
            }

            return idList;
        },
        /**
        * 获取选中图片ID
        */
        getChooseImg() {
            const idList = [];
            let that = this;
            let i = that.imgObj.length;
            while (i--) {
                if (that.imgObj[i].mask == true) {
                    idList.push(that.imgObj[i].id);
                }
            }
            return idList;
        },
        close() {
            this.styleObj = {
                backgroundImage: ''
            };

            this.imageShow = false;
        },
        deleteImg() {
            console.log('删除图片')
        }
    }
}
</script>

<style lang="scss" >
@import "src/style/mixin.scss";
.tetris-add-photo {
  padding: 0 15px;
  background-color: #fff;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  & > div {
    flex: px2rem(148) 0 0;
    height: px2rem(148);
    margin: 10px px2rem(28) 10px 0;
  }
  & > div:nth-of-type(4n) {
    margin-right: 0;
  }
}

.tetris-add-photo_img {
    position: relative;
    width: px2rem(148);
    height: px2rem(148);
    border: 1px solid $c-high ;
    padding: 2px;
    .tetris {
        position: absolute;
        bottom: 4px;
        right: 4px;
    }
    img {
        width: 99%;
        margin: 0.5% auto;
        height: 99%;
    }
}

.tetris-show-image {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #999;
  z-index: 1000;
  > span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
    background: center center no-repeat;
    background-size: contain;
  }
  .delete-image {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    line-height: px2rem(120);
    text-align: center;
    color: #666;
    font-size: px2rem(30);
    text-align: center;
    .del-text {
      position: absolute;
      width: px2rem(80);
      height: 100%;
      right: 15px;
      color: $c-high;
      font-size: px2rem(34);
    }
  }
}

.tetris-add-photo_mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
}

.tetris-add-photo_btn {
  position: relative;
  width: px2rem(148);
  height: px2rem(148);
  border: 1px dashed #dcdcdc;
  line-height: px2rem(148);
  text-align: center;

  & input,
  & .upload-click {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.c-high {
    color: $c-high ;
}
</style>
