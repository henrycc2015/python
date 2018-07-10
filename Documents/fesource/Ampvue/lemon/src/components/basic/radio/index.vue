<template>
    <div class="radio_area">
        <div class="radio" :class="{'current': value}"></div>
        <label>
            <slot></slot>
        </label>
    </div>
</template> 

<script>
export default {
    name: 'radio',
    components: {
    },
    data() {
        return {
        }
    },
    /**********
    * props 说明
    * value true选中，false不选中
    ***********/
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.radio_area {
    position: relative;
    display: inline-block;
    .radio {
        margin-top: 1px;
        position: relative;
        display: inline-block;
        border: 1px solid #c1c1c1;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        vertical-align: sub;
    }
    .current:before {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: $c-high; // box-shadow: 0 0 1px 1px $c-high, 0 0 1px 0 #fff inset;
        transition: all 0.3s ease;
        left: 50%;
        top: 50%;
        margin-left: -7px;
        margin-top: -7px;
    }
    label {
        display: inline-block;
        height: 100%;
    }
}

@media screen and (max-width: 320px) {
    .radio_area {
        .radio {
            width: 16px;
            height: 16px;
        }
        .current:before {
            width: 12px;
            height: 12px;
            margin-left: -6px;
            margin-top: -6px;
        }
    }
}
</style>
