<template>
    <div class="pay-result app">
		<header>
			<i-icon :name="iconObj.name" :color="iconObj.color" :size="iconObj.size"></i-icon>
		</header>
		<h1>{{resultText}}</h1>
		<h4 v-show="!!resultTips">{{resultTips}}</h4>
		<slot></slot>
    </div>
</template>

<script>
import icon from '@components/basic/icon';
export default {
	name: '',
	components: {
		'i-icon': icon
	},
	data() {
		return {

		}
	},
	//resultType 支付类型 success成功 failed失败
	//resultTips 小贴士
	//resultStatus 支付状态描述，若为值，则默认为‘支付成功’ 或‘支付失败’
	props: {
		resultType: {
			type: String,
			default: 'success',
			validator(val){
				if(val == 'success' || val == 'failed'){
					return true;
				}
				else{
					console.error('payResult prop:result-type 必须为 success 或 failed')
				}
			}
		},
		resultStatus: String,
		resultTips: {
			type: String,
			default: ''
		}
	},
	created() {

	},
	computed: {
        iconObj () {
            return this.resultType == 'success' ? {name : 'check-solid-full', color: '#50B15B', size: '160'} : {name : 'lightning-solid-full', color: '#4475ac', size: '160'}
		},
		resultText (){
			return this.resultType == 'success' ? this.resultStatus || '支付成功': this.resultStatus || '支付失败';
		}
    },
}
</script>

<style lang="scss">
@import 'src/style/mixin.scss';
.pay-result{
	background-color: #fff;
	header {
		margin-top: px2rem(200);
		text-align: center;
	}
	h1 {
		margin-top: px2rem(54);
		text-align: center;
		font-size: px2rem(38);
		font-weight: normal;
		color: #666;
	}
	h4 {
		text-align: center;
		font-size: px2rem(28);
		font-weight: normal;
		color: #999;
	}
}
</style>
