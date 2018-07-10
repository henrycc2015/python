<template>
    <div v-show="currentShareFlag" class="wechatShare">
        <!--选择分享类型  业务员分享和普通用户-->
        <v-confirm
                v-model="agentTypeFlag"
                title-text="选择分享类型"
                cancelText="业务员"
                confirmText="普通用户"
                @on-cancel="channelShare()"
                @on-confirm="normalShare()">
        </v-confirm>
        <!--选择分享类型 中介模式分享和普通用户-->
        <v-confirm
                v-model="agencyTypeFlag"
                title-text="选择分享类型"
                cancelText="中介模式"
                confirmText="普通用户"
                @on-cancel="channelShare()"
                @on-confirm="normalShare()">
        </v-confirm>
        <!--业务员分享 ---输入业务员代码-->
        <v-confirm
                v-model="agentInputFlag"
                title-text="业务员分享"
                cancelText="取消"
                confirmText="确认"
                :closeOnConfirm="false"
                @on-cancel="cancelShare('agentInputFlag')"
                @on-confirm="rightShare()">
            <input type="text" placeholder="请输入业务员代码" v-model="channelNo">
            <input v-if="isRemark" type="text" placeholder="例：备注示例" v-model="shareRemarkFieldValue">
        </v-confirm>
        <!--业务员分享 ---是否输入手机号-->
        <v-confirm
                v-model="isShareFlag"
                title-text="业务员分享"
                cancelText="取消"
                confirmText="确认"
                :closeOnConfirm="false"
                @on-cancel="cancelShare('isShareFlag')"
                @on-confirm="againAffirm()">
            <input type="text" disabled placeholder="请输入业务员代码" v-model="channelNo">
            <input v-if="isRemark" disabled type="text" placeholder="例：备注示例" v-model="shareRemarkFieldValue">
            <input class="inputPosition" disabled type="text" v-model="agentName">
            <v-protocal id="inputRadio" v-model="isChecked">姓名在投保页面显示</v-protocal>
            <input v-if="isChecked" type="text" placeholder="请输入服务手机号" v-model="agentMobile">
        </v-confirm>
        <!--中介模式分享 ---输入中介公司名称-->
        <v-confirm
                v-model="agencyInputFlag"
                title-text="中介模式"
                cancelText="取消"
                confirmText="确认"
                :closeOnConfirm="false"
                @on-cancel="cancelShare('agencyInputFlag')"
                @on-confirm="rightShare()">
            <input class="inputPosition" type="text" placeholder="请输入中介公司名称" v-model="orgName">
            <input class="inputPosition" v-if="isRemark" type="text" placeholder="例：备注示例"
                   v-model="shareRemarkFieldValue">
            <input class="inputPosition" type="text" placeholder="请输入中介人员姓名" v-model="agentName">
            <input class="inputPosition" type="text" placeholder="请输入中介人员手机号" v-model="agentMobile">
        </v-confirm>
        <!--分享页面弹出框-->
        <div v-transfer-dom>
            <v-popup
                    v-model="wechatViewFlag"
                    @on-hide="$emit('input',false)"
                    :popupStyle="{bottom:'-2rem'}"
            >
                <div class="shareIcon tetris-1px-b">
                <span @click="shareToFriend" class="wechatShare" id="weiFriends"> <img
                        src="https://ohc0dpsgs.qnssl.com/shareFriends.png"><br>微信好友 </span>
                    <span @click="shareToTimeline" class="wechatShare" id="circleFiends"><img
                            src="https://ohc0dpsgs.qnssl.com/shareTimeline.png"><br> 微信朋友圈 </span>
                </div>
                <div @click="cancelShare('wechatViewFlag')" class="cancelShare">
                    取消
                </div>
				<div class="hackIphoneX"></div>
            </v-popup>
        </div>
    </div>
</template>

<script>
import TransferDom from 'src/directives/transfer-dom';
import popup from '@components/structure/popup/popup.vue';
import confirm from '@components/structure/confirm';
import protocal from '@components/assemble/protocal';
import api from './api/api';
import * as _ from 'src/utils/ui.tool';
import wechatShareFriend from 'src/hybrids/cell/js_wechat_share_friend';
import wechatShareTimeline from 'src/hybrids/cell/js_wechat_share_timeline';
import getUserInfo from 'src/hybrids/cell/js_get_user_info_to_h5';
import wechatHelper from 'src/utils/wechatHelper';
import Validator from 'src/utils/validate';
export default {
	name: 'wechatShare',
	components: {
		VConfirm: confirm,
		VProtocal: protocal,
		VPopup: popup
	},
	directives: {
		TransferDom
	},
	data() {
		return {
			channelNo: '', //用户输入业务员代码 E代码或G代码 1070110347  1070123981 1070123981
			agentMobile: '', //用户输入手机号
			isChecked: false, //是否显示姓名
			isShareFlag: false, // 是否能分享此产品
			agentNos: '', //G代码转换成E代码
			agentName: '', // 业务员姓名
			shareRemarkFieldValue: '', //用户输入备注字段
			orgName: '', //用户输入中介公司名称
			isRemark: false, //是否需要填写备注
			agentTypeFlag: false, //业务员类型显示状态
			agencyTypeFlag: false, //业务员输入框显示状态
			agentInputFlag: false, //中介模式类型显示状态
			agencyInputFlag: false, //中介模式输入框显示状态
			wechatViewFlag: false, //分享页面显示状态
			shareLink: '', // 分享链接
			shareType: 1, //分享类型
			businessInfo: [], // 保险产品分享信息
			userInfo: '', //用户信息
			shareImageUrl:
				'https://home.pingan.com.cn/m/insurance_unlogin/assets/images/logo.png', //分享默认图片
			params: {},
			currentShareFlag: false
		};
	},
	props: {
		shareData: {
			type: Object
		},
		value: {
			type: Boolean,
			default: false
		},
		oldApi: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		//监听背景隐藏
		onChange(type) {
			this.$emit('on-change', type);
		},
		//取消按钮
		cancelShare(val) {
			this[val] = false;
			this.$emit('input', false);
		},
		//计算分享类型
		checkShareType() {
			let type;
			type =
				this.sharetype === 4 || this.shareData.shareType === 4
					? (this.sharetype = 2)
					: this.sharetype === 5 || this.shareData.shareType === 5
						? (this.sharetype = 3)
						: this.sharetype || this.shareData.shareType;
			return type;
		},
		//初始化分享类型
		initializeFlag() {
			if (this.shareData.BusScenario === 1) {
				let agentRemark = this.businessInfo.findIndex(val => {
					return val.sharePattern === '2' && val.inputShareRemarkField === 'Y';
				});
				let anscyRemark = this.businessInfo.findIndex(val => {
					return val.sharePattern === '3' && val.inputShareRemarkField === 'Y';
				});
				if (agentRemark > -1 || anscyRemark > -1) {
					this.isRemark = true;
				}
				if (this.businessInfo && this.businessInfo.length > 1) {
					let ayns = this.businessInfo.findIndex(val => {
						return val.sharePattern === '3';
					});
					let atns = this.businessInfo.findIndex(val => {
						return val.sharePattern === '2';
					});
					if (atns > -1) {
						//业务员和普通用户分享
						this.shareType = 4;
						this.showFlag('agentTypeFlag');
					} else if (ayns > -1) {
						//中介模式和普通用户分享
						this.shareType = 5;
						this.showFlag('agencyTypeFlag');
						getUserInfo(res => {
							this.UserInfo = res;
						});
						console.log('用户信息' + this.UserInfo);
					}
				} else {
					let ns = this.businessInfo.findIndex(val => {
						return val.sharePattern === '1';
					});
					let ats = this.businessInfo.findIndex(val => {
						return val.sharePattern === '2';
					});
					let ays = this.businessInfo.findIndex(val => {
						return val.sharePattern === '3';
					});
					if (ns > -1) {
						//仅普通用户分享
						if(this.currentShareFlag){
							this.showFlag('wechatViewFlag');
						}						
						this.shareType = 1;
					} else if (ays > -1) {
						//仅中介模式分享
						this.shareType = 3;
						this.showFlag('agencyInputFlag');
						getUserInfo(res => {
							this.UserInfo = res;
						});
						console.log('用户信息' + this.UserInfo);
					}
					if (ats > -1) {
						//仅业务员分享
						this.shareType = 2;
						this.showFlag('agentInputFlag');
					}
				}
			} else {
				/*if (this.shareData.shareType === 1) {
                     this.shareType = 1;
                     this.wechatViewFlag = this.shareFlag;
                     //this.showFlag('wechatViewFlag');
                     } else if (this.shareData.shareType === 2) {
                     this.shareType = 2;
                     this.showFlag('agentTypeFlag');
                     } else if (this.shareData.shareType === 3) {
                     this.shareType = 3;
                     this.showFlag('agencyTypeFlag');
                     } else if (this.shareData.shareType === 4) {
                     this.shareType = 4;
                     this.showFlag('agentInputFlag');
                     } else if (this.shareData.shareType === 5) {
                     this.shareType = 5;
                     this.showFlag('agencyInputFlag');
                     }*/
				switch (this.shareData.shareType) {
					case 1:
						this.shareType = 1;
						this.wechatViewFlag = this.currentShareFlag;
						break;
					case 2:
						this.shareType = 2;
						this.showFlag('agentTypeFlag');
						break;
					case 3:
						this.shareType = 3;
						this.showFlag('agencyTypeFlag');
						break;
					case 4:
						this.shareType = 4;
						this.showFlag('agentInputFlag');
						break;
					case 5:
						this.shareType = 5;
						this.showFlag('agencyInputFlag');
						break;
					case 6:
						this.shareType = 6;
						this.shareLink =
							location.origin +
							location.pathname.replace('index-app.html', 'index-wechat.html');
							if(this.shareData.searchVal){
								this.shareLink = this.shareLink + '?' + this.shareData.searchVal + this.shareData.hash;
							} else {
								this.shareLink = this.shareLink + this.shareData.hash;
							}
						this.wechatViewFlag = this.currentShareFlag;
						break;
					default:
						this.shareType = 6;
						this.wechatViewFlag = this.currentShareFlag;
				}
			}
		},
		//显示状态
		showFlag(val) {
			this[val] = true;
		},
		//隐藏状态
		hideFlag(val) {
			if (typeof val === 'object') {
				for (let i = 0; i < val.length; i++) {
					this[val[i]] = false;
				}
			} else {
				this[val] = false;
			}
		},
		//检查业务员是否能够分享此保险产品（业务场景为1时）
		checkAgentType(res) {
			let life = this.businessInfo.findIndex(val => {
				return val.sharePattern === '2' && val.lifeSalesmanPermit === '1';
			});
			let property = this.businessInfo.findIndex(val => {
				return val.sharePattern === '2' && val.propertySalesmanPermit === '1';
			});
			let pension = this.businessInfo.findIndex(val => {
				return val.sharePattern === '2' && val.pensionSalesmanPermit === '1';
			});
			if (res.agentType === 'L' && this.businessInfo && life > -1) {
				_.alert('该业务员无法参与此产品销售！');
				return;
			} else if (res.agentType === 'P' && this.businessInfo && property > -1) {
				_.alert('该业务员无法参与此产品销售！');
				return;
			} else if (res.agentType === 'G' && this.businessInfo && pension > -1) {
				_.alert('该业务员无法参与此产品销售！');
				return;
			} else if (res.agentType === 'X') {
				_.alert('该业务员无法参与此产品销售！');
				return;
			}
		},
		//选择分享类型按钮
		channelShare() {
			if (this.shareType === 2 || this.shareType === 4) {
				// this.agentInputFlag = true;
				this.showFlag('agentInputFlag');
			} else if (this.shareType === 3 || this.shareType === 5) {
				// this.agencyInputFlag = true
				this.orgName = this.userInfo.orgName || '';
				this.agentName = this.userInfo.userName || '';
				this.agentMobile = this.userInfo.mobile || '';
				this.showFlag('agencyInputFlag');
			}
			this.hideFlag(['agencyTypeFlag', 'agentTypeFlag']);
		},
		//普通分享按钮
		normalShare() {
			let SData = {
				hash: this.shareData.hash,
				insureProductId: this.shareData.idCsspProduct || ''
			};
			api.saveInsureShareNote(SData, this.oldApi).then(
				res => {
					if (res.returnFlag === '200') {
						if (this.shareData.searchVal !== '') {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								'&' +
								this.shareData.searchVal +
								this.shareData.hash;
						} else {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								this.shareData.hash;
						}
						this.showFlag('wechatViewFlag');
						this.hideFlag([
							'agencyTypeFlag',
							'agentTypeFlag',
							'agencyInputFlag',
							'agentInputFlag'
						]);
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		//类型确认分享按钮
		rightShare() {
			if (this.shareType === 2 || this.shareType === 4) {
				this.agentShare();
			} else if (this.shareType === 3 || this.shareType === 5) {
				this.agencyShare();
			}
		},
		//业务员分享确认按钮-检查业务员
		agentShare() {
			if (this.channelNo.trim() === '') {
				_.alert('业务员代码不能为空');
				return;
			} else if (this.channelNo.length < 6) {
				_.alert('业务员代码长度小于6位数字');
				return;
			}
			let GData = {
				agentNo: this.channelNo
				// orgId: this.UserInfo.csspOrgId
			};
			//checkInsureGCodeAction
			api.checkInsureGCodeAction(GData).then(
				res => {
					if (res.returnFlag === '200') {
						this.isChecked = false;
						if (this.shareData.BusScenario === 1) {
							this.checkAgentType(res);
							this.agentName = res.agentName;
							this.hideFlag('agentInputFlag');
							this.showFlag('isShareFlag');
						} else {
							this.agentName = res.agentName;
							this.hideFlag('agentInputFlag');
							this.showFlag('isShareFlag');
						}
					} else {
						_.alert(res.returnMsg);
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		//业务员分享确认按钮-生成shareId
		againAffirm() {
			let SData = {
				hash: this.shareData.hash || '',
				agentNo: this.channelNo || '',
				agentName: this.agentName || '',
				// insureOrgId: this.UserInfo.csspOrgId || '',
				insureProductId: this.shareData.idCsspProduct
			};
			if (this.isChecked) {
				let validator = new Validator();
				validator.add(this.agentMobile, [
					{
						strategy: 'telMobile'
					}
				]);
				let msg = validator.start();
				console.log(msg);
				if (msg && msg !== 'undefined') {
					_.alert(msg);
					return;
				}
				SData.agentMobile = this.agentMobile;
			}
			if (this.isRemark) {
				if (!this.shareRemarkFieldValue) {
					_.alert('备注字段不能为空');
					return;
				}
				SData.shareRemarkFieldValue = this.shareRemarkFieldValue;
			}
			api.saveInsureShareNote(SData, this.oldApi).then(
				res => {
					if (res.returnFlag === '200') {
						let agentPt = -2;
						if (this.shareData.searchVal !== '') {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								'&' +
								this.shareData.searchVal +
								this.shareData.hash;
						} else {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								this.shareData.hash;
						}
						if (this.businessInfo && this.businessInfo.length > 1) {
							agentPt = this.businessInfo.findIndex(val => {
								return (
									val.sharePattern === '2' &&
									val.wechartContinueShareable === '1'
								);
							});
						}
						if (agentPt > -1 && this.$device.isWechat) {
							this.setWechatShareParams();
						} else {
							if (this.$device.isWechat) {
								this.hideFlag('isShareFlag');
							} else {
								this.hideFlag('isShareFlag');
								this.showFlag('wechatViewFlag');
							}
						}
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		//中介模式分享确认按钮
		agencyShare() {
			let saveData = {
				agentMobile: this.agentMobile,
				orgName: this.orgName,
				agentName: this.agentName,
				insureOrgId: this.UserInfo.inputOrgIdentify || '',
				insureProductId: this.shareData.idCsspProduct || '',
				hash: this.shareData.hash
			};
			if (this.isRemark) {
				if (!this.shareRemarkFieldValue) {
					_.alert('备注字段不能为空');
					return;
				}
				saveData.shareRemarkFieldValue = this.shareRemarkFieldValue;
			}
			api.saveInsureShareNote(saveData, this.oldApi).then(
				res => {
					if (res.returnFlag === '200') {
						if (this.$device.isWechat) {
							this.hideFlag('agencyInputFlag');
						} else {
							this.hideFlag('agencyInputFlag');
							this.showFlag('wechatViewFlag');
						}
						if (this.shareData.searchVal !== '') {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								'&' +
								this.shareData.searchVal +
								this.shareData.hash;
						} else {
							this.shareLink =
								location.origin +
								location.pathname.replace(
									'index-app.html',
									'index-wechat.html'
								) +
								'?insureShareId=' +
								res.idInsureShare +
								this.shareData.hash;
						}
						// this.shareLink = location.origin + location.pathname.replace('index-app.html', 'index-wechat.html') + '?insureShareId=' + res.idInsureShare + this.shareData.hash;
					} else {
						_.alert(res.returnMsg);
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		//分享给朋友
		shareToFriend() {
			let fParams = {
				imageUrl: this.shareData.shareImage || this.shareImageUrl,
				title: this.shareData.shareTitle,
				description: this.shareData.shareDesc
			};
			if (this.shareType === 1) {
				let SData = {
					hash: this.shareData.hash,
					insureProductId: this.shareData.idCsspProduct || ''
				};
				api.saveInsureShareNote(SData, this.oldApi).then(
					res => {
						if (res.returnFlag === '200') {
							fParams.shareUrl = location.origin +
									location.pathname.replace(
										'index-app.html',
										'index-wechat.html'
									) ;
							if (this.shareData.searchVal !== '') {
								//老保险
								if(this.oldApi){
									fParams.shareUrl = fParams.shareUrl + '?idSmtsShare=' + res.idSmtsShare + '&' + this.shareData.searchVal + this.shareData.hash;
								}else{
									//保险拆分
									fParams.shareUrl = fParams.shareUrl + '?insureShareId=' + res.idInsureShare + '&' + this.shareData.searchVal + this.shareData.hash;
								}
								
							} else {
								if(this.oldApi){
									fParams.shareUrl = fParams.shareUrl + '?idSmtsShare=' + res.idSmtsShare +  this.shareData.hash;
								}else{
									fParams.shareUrl = fParams.shareUrl + '?insureShareId=' + res.idInsureShare  + this.shareData.hash;
								}
							}
							// fParams.shareUrl = location.origin + location.pathname.replace('index-app.html', 'index-wechat.html') + '?insureShareId=' + res.idInsureShare + this.shareData.hash;
							console.log(fParams);
							wechatShareFriend(
								fParams,
								() => {
									console.log('share success');
									this.hideFlag('wechatViewFlag');
									this.shareData.success && this.shareData.success();
								},
								() => {
									console.log('share error');
									this.hideFlag('wechatViewFlag');
									this.shareData.error && this.shareData.error();
								}
							);
						}
					},
					err => {
						console.log(err);
					}
				);
			} else {
				fParams.shareUrl = this.shareLink;
				console.log(fParams);
				wechatShareFriend(
					fParams,
					() => {
						console.log('share success');
						this.hideFlag('wechatViewFlag');
						this.shareData.success && this.shareData.success();
					},
					() => {
						console.log('share error');
						this.hideFlag('wechatViewFlag');
						this.shareData.error && this.shareData.error();
					}
				);
			}
		},
		//分享到朋友圈
		shareToTimeline() {
			let tParams = {
				imageUrl: this.shareData.shareImage || this.shareImageUrl,
				title: this.shareData.shareTitle
			};
			if (this.shareType === 1) {
				let SData = {
					hash: this.shareData.hash,
					insureProductId: this.shareData.idCsspProduct || ''
				};
				api.saveInsureShareNote(SData, this.oldApi).then(
					res => {
						if (res.returnFlag === '200') {
							if (this.shareData.searchVal !== '') {
								tParams.shareUrl =
									location.origin +
									location.pathname.replace(
										'index-app.html',
										'index-wechat.html'
									) +
									'?insureShareId=' +
									res.idInsureShare +
									'&' +
									this.shareData.searchVal +
									this.shareData.hash;
							} else {
								tParams.shareUrl =
									location.origin +
									location.pathname.replace(
										'index-app.html',
										'index-wechat.html'
									) +
									'?insureShareId=' +
									res.idInsureShare +
									this.shareData.hash;
							}
							// tParams.shareUrl = location.origin + location.pathname.replace('index-app.html', 'index-wechat.html') + '?insureShareId=' + res.idInsureShare + this.shareData.hash;
							console.log(tParams);
							wechatShareTimeline(
								tParams,
								() => {
									console.log('share success');
									this.hideFlag('wechatViewFlag');
									this.shareData.success && this.shareData.success();
								},
								() => {
									console.log('share error');
									this.hideFlag('wechatViewFlag');
									this.shareData.error && this.shareData.error();
								}
							);
						}
					},
					err => {
						console.log(err);
					}
				);
			} else {
				tParams.shareUrl = this.shareLink;
				console.log(tParams);
				wechatShareTimeline(
					tParams,
					() => {
						console.log('share success');
						this.hideFlag('wechatViewFlag');
						this.shareData.success && this.shareData.success();
					},
					() => {
						console.log('share error');
						this.hideFlag('wechatViewFlag');
						this.shareData.error && this.shareData.error();
					}
				);
			}
		},
		//微信中注册二次分型
		setWechatShareParams() {
			if (!this.$device.isWechat) {
				return;
			}
			const _this = this;
			wechatHelper.getToken().then(res => {
				wechatHelper.setConfig(res, [
					'onMenuShareTimeline',
					'onMenuShareAppMessage'
				]);
				window.wx.ready(() => {
					let m_title = _this.shareData.shareTitle;
					let m_lineLink = _this.shareLink || window.location.href;
					let m_content = _this.shareData.shareDesc;
					let m_imgUrl = _this.shareData.shareImage || _this.shareImageUrl;
					/*"https://home.pingan.com.cn/m/insurance_unlogin/assets/images/logo.png"*/
					// 重写分享好友
					wechatHelper.share(m_title, m_content, m_lineLink, m_imgUrl);
				});
			});
		}
	},
	watch: {
		//监听分享组件隐藏/显示状态
		value(val) {
			this.currentShareFlag = val;
			if (val) {
				this.initializeFlag();
				this.channelNo = '';
				this.agentName = '';
				this.agentMobile = '';
			}
		},
		shareData() {
			if (this.$device.isWechat && this.shareData.dataStatus === 1) {
				this.setWechatShareParams();
			}
		},
		shareLink() {
			if (this.$device.isWechat) {
				this.setWechatShareParams();
			}
		}
	},
	mounted() {
		if (this.$device.isWechat) {
			this.setWechatShareParams();
		}
	},
	created() {
		//初始化保险产品分享模版数据
		switch (this.shareData.BusScenario) {
			case 1: {
				switch (this.shareData.isInsureSplit) {
					case 0: {
						let data = {
							idCsspProduct: this.shareData.idCsspProduct
						};
						api.getSharePattem(data).then(
							res => {
								if (
									res.returnFlag === '200' &&
									JSON.parse(res.idCsspProduct).length > 0
								) {
									this.businessInfo = JSON.parse(res.idCsspProduct);
									this.$emit('share-config',res);
									this.initializeFlag();
								} else {									
									_.alert(res.returnMsg);
								}
							},
							err => {
								console.log(err);
							}
						);
						break;
					}
					case 1: {
						let data = {
							idInsureProduct: this.shareData.idCsspProduct
						};
						api.getInsureSharePattem(data).then(
							res => {
								if (res.returnFlag === '200' && res.shareParams.length > 0) {
									this.businessInfo = res.shareParams;
									this.$emit('share-config',res);
									this.initializeFlag();
								} else {
									this.$emit('share-config',res);
									_.alert(res.returnMsg);
								}
							},
							err => {
								console.log(err);
							}
						);
						break;
					}
					default: {
						this.shareType = 1;
						this.wechatViewFlag = this.currentShareFlag;
					}
				}
				break;
			}
			case 2: {
				this.initializeFlag();
				break;
			}
			default: {
				this.shareType = 1;
				this.wechatViewFlag = this.currentShareFlag;
			}
		}
	}
};
</script>

<style lang="scss">
    @import "src/style/mixin";

    .wechatShare {
        width: 100%;
        input {
            margin-bottom: px2rem(24);
            &:last-child {
                margin: 0;
            }
        }
    }

    #inputRadio {
        padding-top: 0;
        padding-bottom: px2rem(24);
        text-align: left;
    }

    input:disabled {
        background-color: #ffffff;
        color: #333333;
    }

    .shareIcon {
        width: 100%;
        span {
            background-color: #ffffff;
            width: 28%;
            margin: px2rem(40) 0 px2rem(40) 15%;
            display: inline-block;
            text-align: center;
            line-height: px2rem(40);
            font-size: px2rem(24);
            img {
                width: px2rem(100);
                height: px2rem(100);
                display: inherit;
            }
        }
    }

    .cancelShare {
        width: 100%;
        text-align: center;
        color: #d6ab67;
        font-size: px2rem(34);
        line-height: px2rem(114);
    }

    .hackIphoneX{
      height: 2rem;
      background-color: #fff;
    }
</style>
