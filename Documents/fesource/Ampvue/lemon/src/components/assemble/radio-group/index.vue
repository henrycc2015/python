<template>
    <div class="tetris-radio-group">
        <cell-display title="微信支付">
            <v-radio slot="header" >
                <img
              src="data:image/png;base64,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"
              alt="微信支付">
            </v-radio>
        </cell-display>
        <cell-display title="壹钱包支付" >
            <v-radio slot="header" :value="false">
                 <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAmVBMVEUAAAA5hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu85hu////97rvRspfPy9/7h7f35+/7s8/3g7PypyvimyPg6hu9zWrVFAAAAJ3RSTlMA8A/169AK+2/54FEcFP7Fu7SskoN6RzswKQbayrinZEAi5pyVi15ZU/3EAAABNElEQVRIx+3R13KDMBCF4QOig3vvdtoS4tT3f7gMEzFOwmoFyaX576TRp1FBV9dVtJr6DpkbHs00mIRkad8z2QHZS1Y8HlOTvBNn59Qsf83gETXswGBFXLHjhL/fnMFUNUiZJ83SIek8AU9haKYXKDO+BeDOfI++d7NfAtjpkRlnwDKhWmEEzK0YCBJi6h/Ra4AjYhsBNqyAAY89O3b0hzM1wqQrznnZa/EX/JJ/dW6B1xXOdU8tsFvh5//gN43fG+P+BVPxWFZ86G3tmDSut62WxAKGAU8vN6u3inaxgFVmwFXB/C4x4DAFegLWcdgbLQCkLTAAtyzQ82u/Df5ZMK6O0Rq7DxvS+RJWJDeRsG/BCwnfy3YLqUxJtr+A2EHCM1iKQhONI1hbjh1Gqs3khK6ua+gTmVmtrzi/f6QAAAAASUVORK5CYII="
              alt="壹钱包支付">
            </v-radio>
        </cell-display>
        <cell-display title="银行实时扣款" isLink>
            <v-radio slot="header" :value="false">
                <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAaVBMVEUAAADYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVzYrVwC7P5aAAAAInRSTlMAyVF5VJ/Y9Qyo8OGlcFlORsWrPzAhB/HUvpZ7NuisiisZQTKu2AAAALZJREFUSMft1LcOwzAMRVE5ceKq4riXNP7/R8ZePD1AhIwAHngHDQIONAikkiTprKXOxJ6M/WLrCmLUa2RbYlYD/ObiEeCSiwuAb1x8h3ioIm9VBF9+UKs4UQ/xh4dziBuO7SB+Ucp7OQGXGWl78WZjeh75quHQPwv+Kx7LbKusAvA+MQsP48VjA/A+MS4Euy7d6kwITvJkbT0RPr4AJy6OAF642CiQ5tlJwRo9Xz3N11pJknTSfubddadz+KW6AAAAAElFTkSuQmCC" 
                alt="银行卡实时扣款">
            </v-radio>
            请选择
        </cell-display>
        <cell-display title="平安代扣" isLink>
            <v-radio slot="header" :value="false">
                <svg version="1.1" style="width:1rem;height:1rem;vertical-align:middle;position:relative;top:-3px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44" enable-background="new 0 0 44 44" xml:space="preserve">
                            <path id="XMLID_1_" fill="#F36517" d="M30.875,35.208H7.917c-1.944,0-3.521-1.576-3.521-3.521V8.729
                            c0-1.944,1.576-3.521,3.521-3.521h22.958c1.944,0,3.521,1.576,3.521,3.521v22.958C34.396,33.632,32.82,35.208,30.875,35.208z"/>
                            <path id="XMLID_3_" fill="#FC972A" d="M37,40.812H14.042c-1.944,0-3.521-1.576-3.521-3.521V14.333c0-1.944,1.576-3.521,3.521-3.521
                            H37c1.944,0,3.521,1.576,3.521,3.521v22.958C40.521,39.236,38.945,40.812,37,40.812z"/>
                            <rect id="XMLID_107_" x="20.521" y="24.479" fill="#FFFFFF" width="20" height="3"/>
                            <polygon id="XMLID_109_" fill="#FFFFFF" points="38.351,26.559 30.958,18.333 34.979,18.333 40.521,24.488 "/>
                            <polygon id="XMLID_110_" fill="#FFFFFF" points="35,33.464 40.521,27.494 38.351,25.422 30.958,33.464 "/>
                        </svg>
            </v-radio>
        </cell-display>
    </div>
</template>

<script>
import cellDisplay from '@components/structure/cell/cell-display';
import VIcon from '@components/basic/icon';
import VRadio from '@components/basic/radio';

import { mapState, mapActions } from 'vuex'
export default {
	name: '',
    components: {
        cellDisplay,
        VIcon,
        VRadio,
    },
	data() {
		return {
            
		}
	},
	props: {
        
    },
	computed: mapState([

	]),
	methods: {
		...mapActions([

		]),
	},
	created() {

	}
}
</script>

<style lang="scss">
@import 'src/style/mixin.scss';
.tetris-radio-group {

    img {
        width: px2rem(48);
    }
}
</style>
