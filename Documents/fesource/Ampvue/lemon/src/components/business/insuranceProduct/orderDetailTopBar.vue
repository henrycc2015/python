<template>
    <div class="xuzhi toggleWrapper">
        <div id="config" class="header toggleBar" v-bind:class="{ hover: hoverClass }" v-on:click="toggle">
            <div class="fl">{{title}}</div>
            <div class="fr mr10"><b class="arrow"></b></div>
            <p class="clear"></p>
        </div>
    </div>
</template>
<script>

    export default {
        components: {},
        props: ['title','hoverClass'],
        data() {
            return {
                hoverClass01: this.hoverClass,
            }
        },
        methods: {
            toggle(){
                this.hoverClass01 = !this.hoverClass01;
                this.$emit('toggleEvent',this.hoverClass01);
            }

        }
    }
</script>
<style lang="scss" scoped>
    .xuzhi .header {
        background: #efefef;
        padding: 10px 0 10px 10px;
        border-radius: 5px;
        color: #555;
        position: relative;
        z-index: 101;
    }

    .hover .arrow {
        border-top: 0;
        border-bottom: 8px solid #ddd;
    }

    .arrow {
        width: 0;
        padding: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid #ddd;
        font-size: 0;
        display: inline-block;
    }

    .clear {
        width: 100%;
        clear: both;
    }


</style>