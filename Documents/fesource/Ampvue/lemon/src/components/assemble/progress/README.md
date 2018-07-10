## progress

**demo地址:**  http://localhost:8088/#/demo/progress/progress

##### 应用场景
> 展示业务流程进度

##### 用法
```
<template>

    <v-progress :stepDesc="progressData" current-step="1"></v-progress>
    <stub></stub>
    <v-progress :stepDesc="progressData1" current-step="2"></v-progress>
    <stub></stub>
    <v-progress :stepDesc="progressData1" current-step="4"></v-progress>
    <stub></stub>
    <v-progress :step="4" current-step="4"></v-progress>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
orientation | String | horizontal | 流程条是横行还是纵向展示，还可为值vertical
step-desc | Array | -- | 流程步骤说明文字数组，最多有4组，最少有两组
current-step | String | 1 | 当前所在步骤
step | Number | -- | 流程步骤总数，有stepDesc，就无step，最大值为4，最小值为2
##### 事件methods
事件名|  描述
---|---


> 
---