<template>
    <div class="detailIndex app" ref="app" v-if="showContent" >
        <div class="content" ref="content" @scroll="onscroll" >
            <div class="topcontent" ref="topcontent">
                <div class="header">
                    <img class="banner" src="https://ohc0dpsgs.qnssl.com/image/deferredTax/headbg.jpg">
                    <h6 class="header-content">
                        {{orgName}}
                    </h6>
                    <div class="shareDiv" v-show="shareShowFlag" @click="_shareFuc">分享</div>
                    <aside class="squire">
                        <div>
                            <h4 class="textblue">投保年龄</h4>
                            <p>
                                16周岁<br/>
                                至<br/>
                                法定退休年龄
                            </p>
                        </div>
                        <div class="tetris-1px-l tetris-1px-r">
                            <h4 class="textblue">投保地区</h4>
                            <p>
                                上海市<br/>
                                福建省<br/>
                                苏州工业园区
                            </p>
                        </div>
                        <div>
                            <h4 class="textblue">保险责任</h4>
                            <p>
                                养老年金<br/>
                                身故保险金<br/>
                                全残保险金
                            </p>
                        </div>
                    </aside>
                </div>
                <stub></stub>
            </div>     
               
            <div class="nav tetris-1px-b" :class="isSticky" ref="nav" >
                <a data-type="0"  :class="{active: tabIndex === 1}"  @click="tabButton(1)">产品说明</a>
                <a data-type="1"  class="tetris-1px-l tetris-1px-r" :class="{active: tabIndex === 2}" @click="tabButton(2)">案例展示</a>
                <a data-type="2" :class="{active: tabIndex === 3}" @click="tabButton(3)">服务与理赔</a>
            </div>
            <stub></stub>
            <div ref="tabcontent" :class="{paddingTop : isAndroid && isFixed}">
                <!-- 产品说明start -->
                <div id="privilege" class="privilege tetris-1px-b" :class="{isBlock: tabIndex === 1}">
                    <div class="bgwhite feature-pa tetris-1px-b">
                        <div class="feature">
                            <img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/feature.png" />
                        </div>
                        <h2 class="insuredtitle">
                            <img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/title1.png" />
                        </h2>
                        <ul class="insuredtable">
                            <li>
                                <div class="head">
                                    养老<br/>年金
                                </div>
                                <div class="desc">
                                    被保险人生存至养老年金开始领取日，可申请领取养老年金，领取方式为保证返还账户价值终身领取、固定期限15或20年领取，领取频率为月领或年领。
                                </div>
                            </li>
                            <li>
                                <div class="head">
                                    身故<br/>保险金
                                </div>
                                <div class="desc">
                                  <!-- 被保险人于开始领取养老年金前身故，且身故发生在60周岁保单生效对应日零时前，本公司向身故保险金受益人给付申请身故保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款，同时按申请身故保险金时的产品账户价值的5-->
                                    <muliple-ellipsis :item-desc='dieDesc' lineCap='4'></muliple-ellipsis>
                                </div>
                            </li>
                            <li>
                                <div class="head">
                                    全残<br/>保险金
                                </div>
                                <div class="desc">
                                    <!-- <muliple-ellipsis :item-desc='physicalDesc' lineCap='4'></muliple-ellipsis> -->
                                    被保险人于开始领取养老年金前身体全残，且身体全残发生在60周岁保单生效对应日零时前，本公司给付申请身体全残保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款，同时按申请身体全残保险金时的产品账户价值的5%额外给付身体全残保险金。<br/>被保险人于开始领取养老年金前身体全残，且身体全残发生在60周岁保单生效对应日零时后，本公司给付申请身体全残保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款。
                                </div>
                            </li>
                        </ul>
                    </div>
                    <stub></stub>
                    <div>
                        <ul class="circle_tuib">
                            <li>
                                <i></i>
                                <span class="bold_tuib">退保条件：被保险人在开始领取养老年金前发生合同所指的重大疾病，可申请退保，除此之外不得申请解除本合同。</span>
                            </li>
                        </ul>
                    </div>
                    <insurance-explain></insurance-explain>
                </div>
                
                <!-- 案例展示start -->
                <div id="safeguard" class="safeguard tetris-1px-b" :class="{isBlock: tabIndex === 2}">
                    <div class="bgwhite pd">
                        <h2 class="title3"><img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/title2.png" /></h2>
                        <div class="insuredtable">
                            <img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/toexample.png" />
                        </div>
                        <h2 class="title3"><img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/titles3.png" /></h2>
                        <div class="insuredtable pa">
                            <p>
                                <strong>基本情况：</strong>某客户，30岁投保税延养老年金保险，选择60周岁开始领取养老年金
                            </p>
                            <p>
                                <strong>情景1：</strong>假设该客户在58周岁时不幸身故，受益人申请理赔时，产品账户价值42万，应纳税款4.8万（以中保信平台试算为准）
                            </p>
                            <p>
                                <strong>理赔金额= </strong>账户价值<span class="textorange">42万</span> - 应纳税款<span class="textorange">4.8万</span> + 额外给付身故保险金<span class="textorange">42万</span> * <span class="textorange">5%</span> = <span class="textorange">39.3万</span>
                            </p>
                            <p>
                                <strong>情景2：</strong>假设该客户在62周岁时不幸身故，受益人申请理赔时，产品账户价值50万，应纳税款5.2万（以中保信平台试算为准）
                            </p>
                            <p>
                                <strong>理赔金额= </strong>账户价值<span class="textorange">50万</span> - 应纳税款<span class="textorange">5.2万</span> = <span class="textorange">44.8万</span>
                            </p>
                        </div>
                        <h2  class="title3"><img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/title4.png" /></h2>
                        <div class="insuredtable pa">
                            <h6>
                                <strong>基本情况：</strong>某客户，男，30岁投保税延养老年金保险，选择60周岁开始领取养老年金
                            </h6>
                            <p>
                                <strong>情景：</strong>假设该客户在60周岁领取时，产品账户价值45万，选择养老年金领取方式为“保证返还账户价值终身月领” <br/>
                                <span class="textblue">
                                    每月养老年金:<br/>
                                    账户价值45万*47.3*(1-75%*10%)=1968.9元
                                </span>
                            </p>
                            
                            <br/>
                            <img src="https://ohc0dpsgs.qnssl.com/image/deferredTax/drawexample.png" alt="">
                            <p>
                                <strong>说明：</strong><br/>1、监管文件规定“对个人达到规定条件时领取的商业养老金收入，其中25%部分予以免税，其余75%部分按照10%的比例税率计算缴纳个人所得税”<br/>
                                2、条款领取金额表约定“男60岁，保证返还账户价值终身月领，每万元账户价值领取金额系数为47.3”
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 服务与理赔start -->
                <div id="service" class="service bgwhite tetris-1px-b" :class="{isBlock: tabIndex === 3}">
                    <h2 class="title">服务须知</h2>
                    <div class="qa">
                        <h6>1. 保险合同的订立形式</h6>
                        <div>保险合同的订立形式为电子保险合同。</div>

                        <h6>2. 电子保单</h6>
                        <div>电子保单是指保险公司借助CA认证技术为客户签发具有保险公司电子签名的电子形式保单。</div>

                        <h6>3. 保险费支付方式</h6>
                        <div>首期保费将从您投保时授权的扣款银行账号扣除，续期保费将于首期保费扣除后的次月15日（月交）或次年12月15日（年交）从您投保时授权的扣款银行账号扣除。每月25日及以后（月交）或每年12月25日及以后（年交）缴纳首期保费的，续期保费顺延一月（月交）或一年（年交）扣除。请确保在续期交费扣除日，您的银行账户处于有效状态且账户余额充足。</div>

                        <h6>4. 电子保单、电子发票的查询及下载</h6>
                        <div>您可通过好福利APP或平安养老险官网（http://yl.pingan.com）等线上渠道查看及下载电子保单和电子发票。</div>

                        <h6>5. 投保及获取税延养老扣除凭证流程</h6>
                        <div>投保流程: 填写投保信息→确认信息和金额→支付→完成投保。<br/> 税延养老扣除凭证：完成投保且保险公司确认承保后，您可根据收到的提示短信，登录保信平台并根据平台操作指引，获取税延养老扣除凭证。</div>
                        <!-- <collapse-transition> -->
                            <div v-show="isfold">
                                <h6>6. 理赔办理流程及理赔金支付方式</h6>
                                <div>出险→客户报案（拨打全国统一报案电话95511转6）→客户准备申请材料及索赔→保险公司受理→保险公司审核→通知理赔结论→支付理赔金（银行转账）。
                                </div>

                                <h6>7. 保全办理流程</h6>
                                <div>提交保全服务申请→保险公司审核处理→保险金支付或保险费交纳→完成保全服务。（注：“保险金支付或保险费交纳”适用于需保险公司支付保险金或客户交纳保险费的保全服务。）常用保全服务可通过好福利APP、平安养老险官网等自助渠道办理，或委托服务人员代为办理、亲访平安养老客服中心办理。
                                    <br/>1、好福利APP办理路径：下载好福利APP→登陆→保障信息→选择投保人保单→选择保单申请办理
                                    <br/>2、平安养老险官网办理路径：平安养老险官网（http://yl.pingan.com/）〉登陆→个人服务→保险服务→选择保单申请办理。
                                </div>

                                <h6>8. 个人信息、投保交易信息和交易安全的保障措施</h6>
                                <div>公司通过密码校验、CA证书、SSL（加密套接字协议）、双重签名验证、动态口令等多种方式来保证客户信息安全。</div>

                                <h6>9. 客户咨询及投诉方式</h6>
                                <div>
                                    1、在线客服：可关注养老险公众号（paylx95511）、电脑端点击平安养老险官网（http://yl.pingan.com）或下载好福利APP，通过在线客服在线解答的方式为您提供咨询服务，一般等待时间不超过30秒。
                                    <br/>(1）机器人服务时间：7×24小时，365天全年无休
                                    <br/>(2）人工在线客服服务时间：周一～周五 9：00-21：00
                                    <br/>2、95511人工热线：养老险电话服务热线95511-6（周一～周日 8:00-22:00 ）
                                </div>
                            </div>
                        <!-- </collapse-transition> -->
                    </div>
                    <div class="showmore" @click="isfold = !isfold">{{ showMore }}
                        <v-icon :name="isfold ? 'circle-up-arrow' : 'circle-down-arrow-copy' " size="30" color="#c1c1c1"></v-icon>
                    </div>

                </div>
            </div>
            
        </div>
        <div class="footer">
            <div class="note tetris-1px-t"> 
                <v-protocal v-model="isAgree" @click.native="clickAgree">我已阅读并同意
                    <span class="protocal" @click="insuranceNotice">《投保须知》</span>及
                    <span class="protocal" @click="importantNotice">《产品说明书》</span>
                </v-protocal>
            </div>
            <div class="tetris-sbtn ">
                <div style="width: 55%">
                    <div class="tetris-calc" @click="gotoCalc">
                        <div class="tetris-calc-border">
                            <v-icon name="calculator" size="60" color="#d7ac62"></v-icon>
                        </div>
                        <div>
                            <div class="tetris-symbol-text">税延</div>
                            <div class="tetris-symbol-text">计算</div>
                        </div>
                    </div>
                </div>
                <div style="width: 45%"><button-group :disabled='isDisabled' size="max" @click.native="next">立即投保</button-group></div>
            </div>
        </div>
        <v-wechatShare  v-model="showWechatShare"  :shareData="shareData" :oldApi="oldApi" @share-config="shareConfig">
        </v-wechatShare>
    </div>
</template>

<script>
import buttonGroup from '@components/basic/button/button-group';
import vTable from '@components/structure/table';
import protocal from '@components/assemble/protocal';
import MulipleEllipsis from '@components/assemble/muliple-ellipsis';
import stub from '@components/structure/stub';
import icon from '@components/basic/icon';
// import CollapseTransition from '@components/structure/collapse-transition/collapse-transition-class'; // todo_ss 
import insuranceExplain from 'src/common/views/insurance.explain.vue';
// import deferredTax from '../vuex';
// import * as _ from 'src/utils/ui.tool'; // todo_ss 移植
import { mapState, mapMutations } from 'vuex';
// import wechatHelper from 'src/utils/wechatHelper';
// import dataCollect from '../utils/dataCollect'; 
// import api from '../api/mock';
import api from '../api';
// import VWechatShare from '@components/business/wechatShare';

export default {
  components: {
    buttonGroup,
    vTable,
    stub,
    // CollapseTransition,
    'v-icon': icon,
    'v-protocal': protocal,
    insuranceExplain,
    // VWechatShare,
    MulipleEllipsis
  },
  props: {

  },
  data() {
    return {
      showContent: false,
      orgName: '',
      tabIndex: 1,
      isfold: false,
      isAgree: false,
      isFixed: false,
      osh: '',
      navh: '',
      isAndroid: false,
      shareData: {
        searchVal: '',    //querystring参数
        isInsureSplit: 0, // 是否为保险拆分产品 0: 非保险拆分产品， 1: 是保险拆分产品
        BusScenario: 1, // 业务场景 1: 保险产品， 2: 活动页面 字段必须是数字
        shareType: 1, //分享类型 注：业务场景为1是不需要传值，业务场景为2时为必传， 1：普通分享，2：业务员和普通分享 3：中介模式和普通用户分享 4：仅业务员分享 5： 仅中介模式分享 字段必须是数字 6 当前地址分享             
        shareTitle: '平安税延养老保险',
        shareDesc: '延迟缴税优惠，账户稳定增值，养老保障无忧',
        shareImage: 'https://ohc0dpsgs.qnssl.com/image/deferredTax/tax-small2.jpg',
        success: function () { }, //分享成功回调函数
        error: function () { }, //分享失败回调函数
        hash: '#/insurance/deferredTax/index', //分享页面哈希值
        idCsspProduct: 'PI000102', //产品ID
        dataStatus: 0  // 参数数据状态，默认为0，所有数据修改完毕后，置为1，表示数据修改完成
      },
      oldApi: true,   //使用老的保险分享接口
      showWechatShare: false,
      shareShowFlag: false,
      dieDesc: '被保险人于开始领取养老年金前身故，且身故发生在60周岁保单生效对应日零时前，本公司向身故保险金受益人给付申请身故保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款，同时按申请身故保险金时的产品账户价值的5%额外给付身故保险金。<br/>被保险人于开始领取养老年金前身故，且身故发生在60周岁保单生效对应日零时后，本公司向身故保险金受益人给付申请身故保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款。',
      physicalDesc: '被保险人于开始领取养老年金前身体全残，且身体全残发生在60周岁保单生效对应日零时前，本公司给付申请身体全残保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款，同时按申请身体全残保险金时的产品账户价值的5%额外给付身体全残保险金。<br/>被保险人于开始领取养老年金前身体全残，且身体全残发生在60周岁保单生效对应日零时后，本公司给付申请身体全残保险金时的产品账户价值，并按税延政策规定扣除对应的应纳税款。',
      isDisabled: false
    }
  },

  computed: {
    ...mapState(['getDataModel']),
    showMore() {
      let text = this.isfold ? '收起' : '查看更多';
      return text;
    },
    isSticky() {
      if (this.isAndroid) {
        if (this.isFixed) return 'fixtop'
      } else {
        return 'sticky'
      }

    }
  },
  created() {
    if (!this.showInfomation()) {
      return;
    }
    // this.isAndroid = this.$device.isAndroid;
    // 重新注册vuex
    // this.$store.registerModule('deferredTax', deferredTax);
    let orgId = ''
    let barCode = ''
    // let orgId = this.$route.query && this.$route.query.orgId; // todo_ss query
    // let barCode = this.$route.query && this.$route.query.barCode;
    let data = {};
    if (orgId) {
      data = { orgId: orgId }
    } else if (barCode) {
      data = { barCode: barCode }
    }
    /* if (!window.isApp) {
      data.weixin = '1';
      if (this.$device.isWechat) {
        setTimeout(() => {
          this.setWechatShareParams();
        })
      }
      this.shareShowFlag = false;
    } */
    setTimeout(() => {
      this.buyNowInfo(data);
    })
  },
  methods: {
    ...mapMutations({
      'getDataModel': 'DATA_MODEL'
    }),

    /**
     * tab切换
     */
    tabButton(index) {
      this.tabIndex = index;
      if (this.isFixed) {
        this.navh = this.$refs.nav.offsetHeight * 1;
        this.$refs.content.scrollTop = this.osh + 1;
      }
    },
    /**
     * 投保须知
     */
    insuranceNotice() {
      // dataCollect('首页-投保须知');
      // this.$router.push('notice');
      wx.navigateTo({
        url: '/insurance/deferredTax/notice/main'
      })
    },
    /**
     * 重要提示
     */
    importantNotice() {
      // dataCollect('首页-产品说明书');
      this.$router.push('importantNotice');
    },
    /**
     * 立即投保
     */
    next() {
      if (this.isDisabled) {
        return
      }
      if (!this.isAgree) {
        // _.alert('请阅读并勾选投保须知');
        return
      }
      // dataCollect('首页-下一步');
      this.$router.push('information');
    },
    /**
     * 滚动固定顶部
     */
    onscroll(e) {
      if (!this.showContent) return;
      const st = e.currentTarget.scrollTop;
      this.$nextTick(() => {
        this.osh = this.$refs.topcontent.offsetHeight * 1;
        if (st > this.osh) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      });
    },
    toAnchor(e) {
      let sbilings = this.$refs.nav.children;
      let t = e.target;
      if (t && t.tagName === 'A') {
        // t = t.parentNode;

        for (var i = 0; i < sbilings.length; i++) {
          sbilings[i].classList.remove('active');
        }

        t.classList.add('active');
        const index = t.dataset.type;
        switch (index) {
          case '0':
            // dataCollect('首页-产品说明');
            break;
          case '1':
            // dataCollect('首页-保障范围');
            break;
          case '2':
            // dataCollect('首页-服务与理赔');
            break;
          default:
            break;
        }

        this.goTop(this.scrollObj[index])
      }
    },
    buyNowInfo(data) {
      this.showContent = true;
      const _data = this.getDataModel;
      if (data.barCode) {
        _data.barCode = data.barCode;
      }
      if (data.orgId) {
        _data.orgId = data.orgId;
      }
      api.buyNow(data).then(buyNowInfo => {
        this.orgName = buyNowInfo.orgName; //企业名称
        _data.orgName = buyNowInfo.orgName;
        _data.userName = buyNowInfo.userName; // 姓名
        _data.idType = buyNowInfo.idType;
        _data.idNo = buyNowInfo.idNo; // 证件号
        _data.gender = buyNowInfo.gender; // 性别
        _data.birthDate = buyNowInfo.birthDateStr; // 出生日期
        _data.mobile = buyNowInfo.mobile; // 手机
        _data.taxBureauName = buyNowInfo.taxBureauName; // 证件类型
        _data.taxRegisterNo = buyNowInfo.taxRegisterNo;
        _data.creditCode = buyNowInfo.creditCode;
        _data.orgId = data.orgId || buyNowInfo.orgId;  //与陶恒沟通 优先传加密的orgId，防止微信公众号串
        _data.barCode = data.barCode || ''
        _data.taxBureauNameFix = _data.taxBureauName ? true : false
        _data.taxRegisterNoFix = _data.taxRegisterNo ? true : false
        _data.creditCodeFix = _data.creditCode ? true : false
        this.setDataModel(_data)
      }).catch(err => {
        //链接失效按钮不可点击
        if (err.returnMsg.indexOf('该投保链接已过期') > -1) {
          this.isDisabled = true;
        }
        //annFlag 1 表示ann报错
        if (err.annFlag === '1') {
          this.isDisabled = true;
        }
      });

    },
    //微信中注册二次分型
    /* setWechatShareParams() {
      let shareParams = {
        title: '平安税延养老保险',
        desc: '延迟缴税优惠，账户稳定增值，养老保障无忧',
        img: 'https://ohc0dpsgs.qnssl.com/image/deferredTax/tax-small2.jpg'
      };
      let wxArr = ['onMenuShareTimeline', 'onMenuShareAppMessage']
      if (sessionStorage.getItem('tetris_wx_from_hfl') == 'Y') {
        wxArr = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem']
      }
      wechatHelper.getToken().then(res => {
        wechatHelper.setConfig(res, wxArr);
        window.wx.ready(() => {
          let m_title = shareParams.title; //shareParams.title;
          let m_lineLink = window.location.href;
          let m_content = shareParams.desc;
          let m_imgUrl = shareParams.img;
          wechatHelper.share(m_title, m_content, m_lineLink, m_imgUrl);
          wechatHelper.hideAllNonBaseMenuItem();
        });
      })
    }, */
    //转到计算器
    gotoCalc() {
      // dataCollect('首页-税延计算器');
      this.$router.push('calc');
    },
    clickAgree() {
      this.isAgree = !this.isAgree
    },
    // 分享事件
    _shareFuc() {
      // dataCollect('首页-分享');
      this.showWechatShare = true;
    },
    changeShow(val) {
      this[val] = !this[val];
      return this[val];
    },
    _hideShare(type) {
      console.log(type);
      this.showWechatShare = type
    },
    /**
     * 根据分享配置返回判断是否显示分享按钮
     */
    shareConfig(res) {
      console.log(res)
      if (JSON.parse(res.idCsspProduct).length > 0) {
        this.shareShowFlag = true;
      }
    },
    showInfomation() {
      let startTime = new Date('2018/06/22 22:00:00').getTime();
      let endTime = new Date('2018/06/23 04:00:00').getTime();
      let currentTime = new Date().getTime();

      //小于6月22日22点 大于6月23日4  不需要弹框
      if ((startTime > currentTime) || endTime < currentTime) {
        return true;
      } else {
        let msg = '尊敬的客户，中国保信平台6月22日22点-6月23日4点暂停服务，该期间我司税延产品投保同步暂停，请您避开该时段进行投保等操作，给您造成不便，敬请谅解。';
        this.$tetris.confirm.show({
          // titleText: '通告',
          content: msg,
          cancelText: '',
          line: '3',
          confirmText: '确定',
          onShow() {
            console.log('plugin show');
          },
          onHide() {
            console.log('plugin hide');
          },
          onCancel() {
            console.log('plugin cancel');
          },
          onConfirm() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              window.WeixinJSBridge && window.WeixinJSBridge.call('closeWindow'); //微信
            } else {
              history.go(-history.length + 2); //普通浏览器
              window.close();
            }
          }
        })
        return false;
      }
    }

  }
}
</script>
<style lang="scss">
.tetris-protocal .tetris-message {
  font-size: 14px !important;
  margin-left: 8px !important;
}
.detailIndex .tetris-icon i {
  font-size: 17px !important;
}
</style>

<style lang="scss" scoped>
@import "src/style/mixin";
@import "src/style/variables";
$f-26: px2rem(26);
.scrollTouch {
  -webkit-overflow-scrolling: auto !important;
}
.detailIndex {
  .content {
    padding-bottom: px2rem(200);
    overflow-y: scroll;
    font-size: $f-26;
  }
  background-color: #efefef;
  color: $c-grey;
  .header {
    position: relative;

    .header-content {
      position: absolute;
      z-index: 5;
      top: px2rem(40);
      bottom: 0;
      color: $c-white;
      padding-left: px2rem(28);
      font-size: px2rem(34);
      width: 70%;
    }
    .shareDiv {
      position: absolute;
      z-index: 5;
      top: px2rem(30);
      right: px2rem(40);
      width: px2rem(72);
      height: px2rem(72);
      line-height: px2rem(72);
      text-align: center;
      border-radius: 50%;
      background-color: #afc3e9;
      color: #000;
      font-size: px2rem(26);
    }
  }
  img {
    width: 100%;
    height: auto;
    display: block; // 解决img下边框有白底
  }

  ul {
    padding: 5px 15px;
    font-size: px2rem(26);
    line-height: 2;
    color: $c-grey;
    background-color: $c-white;
    li {
      padding-left: 13px;
      // display: flex;
      // align-items: center;
      i {
        display: inline-block;
        margin-left: -13px;
        vertical-align: middle;
        margin-right: 9px;
      }
    }
  }
  .squire {
    display: flex;
    position: absolute;
    bottom: 0;
    z-index: 2;
    padding: px2rem(40) 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: $c-white;
    color: $c-grey;
    font-size: $f6;
    width: 92%;
    left: 50%;
    margin-left: -46%;
    & > div {
      flex: 1;
      text-align: center;
    }
    h4 {
      font-size: $f5;
      margin-bottom: px2rem(15);
    }
    p {
      line-height: 1.5;
    }
  }
  .tetris-protocal {
    padding-top: 0;
    .tetris-message {
      font-size: 14px !important;
    }
  }
  h3 {
    color: $c-black;
    font-size: $f5;
    margin: px2rem(20) 15px px2rem(14);
  }

  .bgwhite {
    background-color: $c-white;
  }

  .bgorange {
    background-color: #e9f4fe;
    padding-bottom: 20px;
  }

  .banner {
    width: 100%;
    // height: px2rem(360);
  }

  .nav {
    width: 100%;
    height: px2rem(88);
    line-height: px2rem(88);
    background-color: $c-white;
    a {
      color: $c-black;
      width: 33.33%;
      text-align: center;
      float: left;
      height: 100%;
      font-size: px2rem(30);
    }
    a:nth-of-type(2):before,
    a:nth-of-type(2):after {
      transform: translateY(35%) scale(0.5, 0.3);
    }
    a.active {
      color: $c-high;
    }
  }

  .tetris-calc {
    display: flex;
  }

  .tetris-calc-border {
    /* border: 1px solid $c-high;
        border-radius: 3px; */
    margin-left: 16px; // 0.8rem
    margin-right: 10px; // 0.5rem;
  }

  .tetris-symbol-text {
    font-size: 12px; // $text-size-24px;
  }

  .fixtop {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .paddingTop {
    padding-top: px2rem(96);
  }

  .feature-pa {
    padding-bottom: px2rem(70);
  }

  .privilege,
  .safeguard,
  .service {
    display: none;
  }
  // .feature {
  // padding: 0 14px;
  // background: linear-gradient(top, #e9f4fe, #ffff);
  // }
  .insuredtitle {
    padding-bottom: px2rem(30);
  }
  .protext {
    color: #c78908;
    font-size: $f-26;
    line-height: 1.85;
    padding: px2rem(36) px2rem(60) px2rem(56);
  }

  .isBlock {
    display: block;
  }

  .insuredtable {
    padding: 0;
    width: 94%;
    margin: 0 auto;
    border: 2px solid #a5c7ef;
    border-radius: 5px;
    color: $c-black;

    li {
      display: flex;
      border-bottom: 1px solid #a5c7ef;
      align-items: center;
      padding: 0;
      background-color: #72b8f3;
    }
    li:last-child {
      border: none;
    }
    .head {
      padding: 0 4px;
      color: $c-white;
      width: px2rem(140);
      height: 100%;
      font-size: px2rem(28);
      font-weight: bold;
      text-align: center;
      justify-content: center;
      line-height: 1.5;
    }
    .desc {
      flex: 1;
      border-left: 1px solid #72b8f3;
      padding: px2rem(30) px2rem(30) px2rem(30) px2rem(24);
      background-color: #eef7ff;
    }
  }

  .pa {
    padding: 15px 12px;
    > h6 {
      font-size: $f-26;
      color: $c-black;
    }
    p {
      padding-top: px2rem(30);
    }
  }
  .pd {
    padding-bottom: px2rem(70);
  }
  .importanttips {
    p {
      height: px2rem(80);
      line-height: px2rem(80);
      font-size: px2rem(28);
      color: $c-black;
      text-align: center;
      background-color: #fafafa;
    }
    div {
      padding: 8px 18px 20px;
      color: $c-grey;
      font-size: $f-26;
      line-height: 1.75;
    }
  }
  .title3 {
    padding: px2rem(40) 0;
  }
  .title {
    font-size: px2rem(28);
    text-align: center;
    width: 100%;
    height: px2rem(78);
    line-height: px2rem(78);
    background-color: #fafafa;
  }
  .bold {
    font-weight: bold;
    color: $c-black;
  }
  .bold-nocolor {
    font-weight: bold;
  }
  .textblue {
    color: #4ca2ff;
  }
  .textorange {
    color: $c-high;
  }
  .showmore {
    height: px2rem(80);
    color: #32a3b1;
    background-color: #fafafa;
    line-height: px2rem(80);
    text-align: center;
    font-size: px2rem(28);
  }
  .mt0 {
    margin-top: 0;
  }
  .pd20 {
    padding-bottom: px2rem(20);
  }
  .qa {
    padding: 15px;
    color: $c-grey;
    font-size: px2rem(26);
    line-height: 2;
    h5,
    h6 {
      font-weight: normal;
      font-size: px2rem(24);
    }
    h6 {
      color: $c-high;
      padding-top: px2rem(16);
      font-size: px2rem(26);
    }
  }
  .pr {
    position: relative;
  }
  .footer {
    height: auto;
    .note {
      //height: px2rem(60);
      background: #fafafa;
      height: 36px;
      padding-top: 4px;
      .protocal {
        color: $c-high;
        text-decoration: none;
      }
    }
    .tetris-sbtn {
      justify-content: center;
    }
  }
  .tetris-sbtn {
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(120);
    background-color: rgba(255, 255, 255, 0.9);
    font-size: px2rem(34);

    & > div {
      display: flex;
      align-items: center;
    }
    .choose-all {
      // flex: 3;
      flex: 4;
      padding-left: 15px;
      justify-content: flex-start;
      color: $c-black;
      font-size: px2rem(28);
      height: 100%;
      i {
        margin-right: 6px;
      }
    }
    .flex-sum {
      flex: 5;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #d80000;
      padding-right: px2rem(20);
      .sum {
        font-size: px2rem(24);
        color: #999;
      }
    }
    .flex-sum_hide {
      opacity: 0;
    }
    .commit-btn {
      flex: 4;
      height: 100%;
      background-color: $c-high;
      color: $c-white;
      text-align: center;
      justify-content: center;
      &:not(.tetris-commit-btn_disabled):active {
        background-color: #b38f47;
      }
    }
  }
  // .tuib{
  //             padding: 5px 15px 0 15px;
  //             font-size: 0.6rem;
  //             line-height: 2;
  //             color: #666;
  //             background-color: #fff;
  //             display: -webkit-box;
  //             display: -webkit-flex;
  //             display: flex;
  //             align-items: flex-start;
  //             div{
  //                 font-weight: bold;
  //             }
  //             div:nth-child(2){
  //                 flex: 4;
  //             }
  // }
  .circle_tuib {
    margin-bottom: -5px;
    padding: 5px 15px 0 15px;
    font-size: px2rem(24);
    line-height: 2;
    color: #666;
    background-color: #fff;
    li {
      padding-left: 13px;
      i {
        display: inline-block;
        margin-left: -13px;
        vertical-align: middle;
        margin-right: 6px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: #666;
      }
      .bold_tuib {
        font-weight: bold;
      }
    }
  }
}
</style>

