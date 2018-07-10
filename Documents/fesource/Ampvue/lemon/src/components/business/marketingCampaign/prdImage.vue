<template>
    <div class="prdImg" >
        <img :src="imgUrl" alt="img">
    </div>
</template>

<script>


export default {
    props:{
        imgUrl: String,
    },
    components: {
        
    },
    data(){
        return {

        }
    },
    mounted(){

    },

}
</script>

<style lang="scss" scoped>
.prdImg {
    position: relative;
    img {
        width:100%;
    }
    
}
    
</style>
