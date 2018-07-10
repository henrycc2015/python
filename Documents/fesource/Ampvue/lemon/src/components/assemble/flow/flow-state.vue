<template>
    <div class="tetris-flow_li" :class="{'tetris-flow_li_done': isDone}" >
        <div class="tetris-flow_state" :class="marginPosition"></div>
        <p :class="`tetris-flow_title-${titlePosition}`" > <slot name="desc"></slot> </p>
    </div>
</template>

<script>

export default {
    name: 'flow-state',
    props: {
        state: [String, Number],
        desc: String,
        isDone: Boolean,
        
    },
    data() {
        return {
            margin: ''
        }
    },
    computed: {
        titlePosition () {
            return this.$parent.orientation === 'vertical' ? 'right' : 'bottom';
        },
        marginPosition () {
            if(this.isDone) {
                return this.margin = this.$parent.orientation === 'vertical' ? 'mtb' : 'mlf';
            }
            
        }
    }

}
</script>

<style lang="scss" >
@import 'src/style/mixin.scss';

</style>