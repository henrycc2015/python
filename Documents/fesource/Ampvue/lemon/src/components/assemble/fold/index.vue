<template>
    <div class="tetris-fold">
        <div @click="foldControl">
            <cell-display :title="titleInf">
                <v-icon :name="iconName" size='40' color='#d7ac62'></v-icon>
            </cell-display>
        </div>
        <collapse-transition>
            <div class="tetris-fold-content" v-show="isfold">
                <slot name="content"></slot>
            </div>
        </collapse-transition>
    </div>
</template>

<script>
import cellDisplay from '@components/structure/cell/cell-display';
import icon from '@components/basic/icon';
import CollapseTransition from '@components/structure/collapse-transition/collapse-transition-class';
export default {
    name: 'fold',
    props: {
        titleInf: {
            type: String,
            default: '自动续保须知'
        },
        isFold: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isfold: this.isFold
        }
    },
    components: {
        'cell-display': cellDisplay,
        'v-icon': icon,
        CollapseTransition
    },
    computed: {
        iconName() {
            return this.isfold ? 'angle-up' : 'angle-down';
        },
    },
    methods: {
        foldControl() {
            return this.isfold = !this.isfold;
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-fold {
    .tetris-fold-content {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: px2rem(20) px2rem(30);
        font-size: px2rem(28);
        line-height: 1.75;
        color: $c-grey;
    }
}
</style>
