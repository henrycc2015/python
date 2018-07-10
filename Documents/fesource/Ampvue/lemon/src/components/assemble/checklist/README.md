## checklist

**demo地址:**  http://localhost:8088/#/demo/checklist/checklist

##### 用法
```
<template>

    <checklist :items="objList" @on-change="choseSale"></checklist>

</template>
<script>
    export default {
        name: 'cell',
        components: {
            stub,
            checklist
        },
        props: [],
        data() {
            return {
                objList: [{
                    value: true,
                    content: '我只接受以<strong>7折</strong>价格参加保障自选'
                },{
                    value: false,
                    content: '我只接受以8折价格参加保障自选'
                },{
                    value: false,
                    content: '我只接受以9折价格参加保障自选'
                }]
            }
        },
    }
</script>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
label-position | String| -- | 单选按钮在左边还是右边，可选值`left`或`right`
items | Array| -- | 必须传值，数据结构必须有`value`和`content`属性

##### 事件methods
事件名|  描述
---|---
on-change | 改变

