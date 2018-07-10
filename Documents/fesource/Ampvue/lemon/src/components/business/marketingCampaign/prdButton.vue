<template>
    <div class="footer">
        <button-group @click.native="fucOnly('mid')" v-if="types=='01'||isOnly" size="default" radius>{{messageOnly}}</button-group>
        <button-group @click.native="fucLeft('left')" v-if="types!='01'&&!isOnly" size="mid"  radius>{{messageLeft}}</button-group>
        <button-group @click.native="fucRight('right')" v-if="types!='01'&&!isOnly" size="mid" type="transparent" radius>{{messageRight}}</button-group>
    </div>
</template>
<script>
import buttonGroup from '@components/basic/button/button-group';
export default {
    components: {
        'button-group': buttonGroup,
    },
    data() {
        return {
            
        }
    },
    created() {
    },
    mounted() {

    },
    props: {
        types:{
            type: [String,Number],
            default: '0',
        },
        messageOnly:[String],
        messageLeft:[String],
        messageRight:[String],
        fucOnly: Function,
        fucLeft: Function,
        fucRight: Function,
        isOnly: Boolean,
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>