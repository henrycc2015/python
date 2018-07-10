## checkbox

**demo地址:**  http://localhost:8088/#/demo/form/form

##### 用法
表示状态切换，常用在同意协议protocol组件中
```
<template>

    <checkbox :value="value" @on-change="allChoose"></checkbox>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
value | Boolean| false | 是否选中

##### 事件methods
事件名|  描述
---|---
on-change | 选中取消值变化时触发

---