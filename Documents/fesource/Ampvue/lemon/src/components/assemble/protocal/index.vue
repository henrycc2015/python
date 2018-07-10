<template>
    <div class="tetris-protocal" >
        <div class="tetris-icon" @click='change' :check='currentValue'>  
            <v-icon :name='iconName' size='32' :color='iconColor' ></v-icon>
        </div>
        <div class="tetris-message">
             <slot>
                    
            </slot>
        </div>
    </div>
</template>

<script>
import icon from '@components/basic/icon';

export default {
    name: 'protocal',
    components: {
		'v-icon': icon,
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        iconName () {
            return this.currentValue ? 'checkbox-solid' : 'checkbox-no' ;
        },
        iconColor () {
            return this.currentValue ? '#d7ac62' : '#c1c1c1' ;
        }
    },
    methods: {
        change () {
            return this.currentValue = !this.currentValue;
        }
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value(val) {
            this.currentValue = val
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.tetris-protocal {
    padding-left: 15px;
    display: flex;
    .tetris-icon {
        flex: 0 0 px2rem(32);
        justify-content: flex-start;
        margin-top: 5px;
    }
    .tetris-message {
        flex: 1;
        font-size: px2rem(24);
        color: $c-grey;
        line-height: px2rem(36);
        margin-top: 6px;
        margin-left: px2rem(20);        
    }
}
</style>
