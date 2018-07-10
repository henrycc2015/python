## stick

**demo地址:**  http://localhost:8088/#/demo/stickAndStub/stickAndStub

##### 应用场景
> 顶部黄色提示说明信息

##### 用法
```
<template>
    <!-- 默认设置 -->
    <v-stick>本案需您补充理赔申请材料原件后支付赔款</v-stick>
    
    <!-- 设置删除该提示信息功能 closable -->
    <v-stick :closable='false'>本案需您补充理赔申请材料原件后支付赔款</v-stick>
    
    <!-- 自行计算内容高度，内容超过一行 有展示更多功能 功能-->
    <v-stick :closable='false' >
        新展示更多的方法 在slot上不用v-show=“show1” 
            1.本案需您补充理赔申请材料原件后支付赔款<br />
            2.本案需您补充理赔申请材料原件后支付赔款<br />
            3.本案需您补充理赔申请材料原件后支付赔款<br />
    </v-stick>

</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
closable | Boolean | true | 是否有关闭功能
is-collapse | Boolean| -- | cell下边框是否是短边框

##### 事件methods
事件名|  描述
---|---


> issues:
    svn1.67.0版本: 
        1.更改只能在确定文案内容时使用显示更多内容的功能，改为自行计算内容高度，自行判断是否用显示更多功能。
        2.去除参数isCollapse 和 open

---