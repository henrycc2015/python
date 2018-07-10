<template>
    <div class="multiple-cell tetris-1px-b">
        <div class="hd">
            <h4><slot name="title"></slot><span class="sub-title"><slot name="subTitle"></slot></span></h4>
            <p><slot name="date"></slot></p>
        </div>
        <div class="fd" :style="{color: amountColor}">
            <slot name="amount"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'multipleCell',
    components: {
        
    },
    props: {
        amountColor: {
            type: String,
            default: '#333'
        }
    },
    data: function() {
        return {
            show: false,
            showClear: false,
            showErr: false,
        }
    },
    computed: {
        
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import "src/style/mixin";

.multiple-cell {
    display: flex;
    align-items: center;
    background-color: $c-white;
    padding: px2rem(20) 0;
    .hd {
        width: px2rem(400);
        padding-left: 15px;
        h4 {
            font-size: px2rem(30);
            width: 100%;
            color: $c-light;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            & >span:first-child {
                color: $c-black;
            }
            .sub-title {
                vertical-align: middle;
                font-size: px2rem(24);
                color: $c-light;
            }
        }
        
        p {
            font-size: px2rem(22);
            color: $c-light;
            line-height: 1.5;
        }
    }
    .fd {
        flex: 1;
        padding-right: 15px;
        font-size: px2rem(34);
        color: $c-black;
        text-align: right;
    }
    .orange {
        color: #ED7242;
    }
}
</style>
