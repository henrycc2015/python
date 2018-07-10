<template>
    <popup-picker v-model="currentValue" show-name :fixed-columns="2" :title="title" :placeholder="placeholder" :data="address"
        :columns="3" :show.sync="showValue" @on-hide="emitHide" @on-change="onChange" @on-show="$emit('on-show')" @on-shadow-change="onShadowChange">
    </popup-picker>
</template>

<script>
    import popupPicker from './popup-picker';
    import address from '@components/assemble/address/hfl_address.json';
    import name2value from 'src/filters/name2value'
    import value2name from 'src/filters/value2name'
    export default {
        name: 'tetris-address',
        components: {
            popupPicker
        },
        data() {
            return {
                address: address,
                currentValue: this.value,
                showValue: false
            }
        },
        props: {
            title: {
                type: String,
                required: true
            },
            value: {
                type: Array,
                default () {
                    return []
                }
            },
            labelWidth: String,
            placeholder: String,
            // hideDistrict: Boolean,
            valueTextAlign: String,
            confirmText: String,
            cancelText: String,
            displayFormat: {
                type: Function,
                default: (val, names) => names
            },
            popupStyle: Object,
            show: Boolean
        },
        watch: {
            currentValue(val) {
                this.$emit('input', val)
            },
            value(val) {
                if (val.length && !/\d+/.test(val[0])) {
                    const id = name2value(val, this.list).split(' ')
                    if (id[0] !== '__' && id[1] !== '__') {
                        this.currentValue = id
                        return
                    }
                }
                this.currentValue = val
            },
            show(val) {
                this.showValue = val
            },
            showValue(val) {
                this.$emit('update:show', val)
            }
        },
        created() {
            if (this.currentValue.length && this.rawValue) {
                const parsedVal = name2value(this.currentValue, this.list)
                if (/__/.test(parsedVal)) {
                    console.error('Vux: Wrong address value', this.currentValue)
                    this.currentValue = []
                } else {
                    this.currentValue = parsedVal.split(' ')
                }
            }
            if (this.show) {
                this.showValue = true
            }
        },
        methods: {
            emitHide(val, names) {
                this.$emit('on-hide', val, names)
            },
            getAddressName() {
                return value2name(this.value, this.list)
            },
            onShadowChange(ids, names) {
                this.$emit('on-shadow-change', ids, names)
            },
            onChange(val, name) {
                this.$emit('on-change', val, name)
            }
        },
    }
</script>
<style scoped src="./main.scss"></style>