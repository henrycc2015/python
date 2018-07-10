<template>
    <div class="comp-lead">
        <div v-if='type === 0' class="_assetheader" >
            <h3><slot></slot></h3>
            <h6>{{ footer }}</h6>
        </div>
        <div v-else-if='type === 1' class="_assetheader">
            <h6>{{ header }}</h6>
            <h2><slot></slot></h2>
            <button>{{ btn }}</button>
        </div>
        <div v-else-if='type === 2' class="_assetheader">
            <span>{{ header }}</span>
            <div>
                <span><slot></slot></span>
            </div>
            <span>{{ footer }}</span>
        </div>
    </div>   
</template>

<script>

    module.exports = {
        props: {
            header: {
                type: String,
                default: ''
            },

            footer: {
                type: String,
                default: ''
            }
        },
        data: function() {
            let t = 0;
       
            if (this.header === '' && this.footer === '') {
                
                t = 0;
            }

            else if (this.header !== '' && this.footer === '') {
                t = 1;
            }

            else if (this.header === '' && this.footer !== '') {
                t = 0;
            }

            else if (this.header !== '' && this.footer !== '' && this.link === '') {
                t = 2;
            }

            return {
                type: t
            };
        }
    }
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.comp-lead{
    ._assetheader {
        position: relative;
        width: 100%;
        padding: px2rem(20) px2rem(30);
        box-sizing: border-box;
        background: linear-gradient(-135deg, #5c4e27, #423620);
        font-weight : normal;
        h3{
            font-size: px2rem(36);
            color: $c-high;
            line-height:px2rem(60);
            font-weight: normal;
        }
        h6 {
            font-size: px2rem(24);
            color: $c-light;
            line-height:px2rem(50);
            font-weight: normal;
        }
    }
}


</style>