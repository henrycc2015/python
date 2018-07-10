<template>
    <pay-result result-type="success">
        <div class="body-panel">
            <!-- <button-group size="sm" type="transparent" @click.native="viewOrder">查看订单</button-group> -->
        </div>
    </pay-result>
</template>

<script>
import payResult from '@components/assemble/payResult'
import buttonGroup from '@components/basic/button/button-group'
export default {
    components: {
        payResult,
        buttonGroup
    },
    props: [],
    data() {
        return {

        }
    },
    beforeCreate(){
		let routerPath = window.routerList.pop();
		window.routerList = [routerPath];
    },
    
    created() {

    },
    mounted() {

    },
    methods: {
        viewOrder(){
			// let orderId = this.$route.params.orderId;
            // if(orderId){
            //     this.$router.push(`/orders/insuranceDetail/orderDetail/${orderId}`);
            // }
		}
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.body-panel{
    text-align: center;
    margin-top: px2rem(70);
}
</style>
