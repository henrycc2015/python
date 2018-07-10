## toggle

**demo地址:**  http://localhost:8088/#/demo/form/form

##### 应用场景
> 相互对立的状态切换，多数包含在单元格cellDisplay中使用

##### 用法
```
<template>

    <cell-display title="switch切换">
        <toggle @on-change="getToggerState" v-model="toggerState"></toggle>
    </cell-display>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
value | Boolean| false | 默认是关闭状态

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发

---