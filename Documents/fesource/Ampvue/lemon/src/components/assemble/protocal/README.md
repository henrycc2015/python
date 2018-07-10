## protocal

**demo地址:**  http://localhost:8088/#/demo/form/form

##### 应用场景
> 提示同意相关协议

##### 用法
```
<template>

    <protocal @on-change="showCheckValue">我已阅读并同意
        <a class="font-tap" @click="insuranceNotice">《投保须知》</a>及
        <a class="font-tap" @click="importantNotice">《重要提示》</a>
    </protocal>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
value | Boolean| false | 默认是否同意协议

##### 事件methods
事件名|  描述
---|---
on-change | 是否同意协议的值改变时触发
input | 勾选是否同意协议时触发



> 
---