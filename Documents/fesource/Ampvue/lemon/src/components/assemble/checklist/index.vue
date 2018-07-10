<template>
    <div class="tetris-checklist tetris-1px-b" >
        <div class="tetris-checklist-label"
        :class="{'tetris-checklist-label-left': labelPosition === 'left'}"
        v-for="(item, index) in itemsObj"
        :key="`checklist_${index}`" @click="onclick(index)"> 
            <div class="tetris-checklist-hd" >
                <span class="radio" :class="{active: item.value}"><i></i></span>
            </div>
            <div class="tetris-cell-fd" v-html="item.content">
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'checklist',
	data() {
		return {
            currentValue: [],
            itemsObj: this.items
		}
	},
	props: {
        // value: {
        //     type: Array,
        //     default: () => []
        // },
        labelPosition: String,
        items: {
            type: Array,
            required: true
        }, 
    },
	computed: {

    },
	methods: {
		onclick (n) {
            this.itemsObj.forEach((item) => {
                item.value = false;
            })
            this.itemsObj[n].value = true;
            this.$emit('on-change', this.itemsObj[n], n);
        }
	},
	created() {

	}
}
</script>

<style lang="scss">
@import "src/style/mixin";
.tetris-checklist {
    padding: px2rem(15) 0;
    background-color: $c-white;
    .tetris-checklist-label {
        display: flex;
        align-items: center;
    }
    .radio {
        position: relative;
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid #dcdcdc;
        border-radius: 50%;
        i {
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            margin-left: -7px;
            margin-top: -7px;
        }
    }
    .radio.active i {
        background-color: $c-high;
    }
    .tetris-checklist-hd {
        padding: px2rem(15) px2rem(24) px2rem(15) px2rem(20);
    }
    .tetris-cell-fd {
        font-size: px2rem(26);
        color: $c-black;
    }
}
</style>
