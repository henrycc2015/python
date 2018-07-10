## ocr

**demo地址:**  
http://localhost:8088/index.html#/demo/cell/cell

##### 应用场景
> 用户输入银行或者身份证信息时，提供的扫描功能

##### 用法
```
<template>
    <!-- 单独使用OCR时 -->
    <ocr v-if="idCard || bankCard" :id-card="idCard" :bank-card="bankCard" @getCardData="getCardNo"></ocr>

    <!-- 集成到cell-input组件中 -->
    <cell-input title="身份证" v-model="value5" input-type="text" :need-clear="false" :id-card="idCard">
    </cell-input>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
id-card | Boolean| false | 是否调用扫描身份证功能
bankC-card | Boolean| false | 是否调用扫描银行卡功能

##### 事件methods
事件名|  描述
---|---
getCardData | 获取扫描出的数据



> 该组件一般集成在cellInput组件中，且使用时只能在APP中，iosVersion > 841,androidVersion > 187
---