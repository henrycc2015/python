<template>
    <div class="infoPanel">
        <text-row v-for="(item, index) in dataList" :key="index" :line="false">
            <span slot="title">{{item.title}}</span>
            <span slot="content">{{item.content}}</span>
        </text-row>
    </div>
</template>

<script>
import textRow from '@components/structure/text-row/text-row';
export default {
    components: {
        textRow
    },
    props: {
        dataList: Array,
    }
}
</script>

<style lang="scss" scoped>
.infoPanel{
    padding: 5px 0;
    background: #fff;
}
</style>
