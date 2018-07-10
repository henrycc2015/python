## lead

**demo地址:**  http://localhost:8088/#/demo/lead/leadColumn

##### 应用场景
> 主要运用于理财产品

##### 用法
```
<template>

    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="7">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="5">444433.00</v-lead-item>
    </lead-column>
    <stub></stub>
    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="4">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="4">444433.00</v-lead-item>
        <v-lead-item desc="理财期限" :span="4">灵活存取</v-lead-item>
    </lead-column>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
header | String | '' | 流程条是横行还是纵向展示，还可为值vertical
footer | Array | '' | 流程步骤说明文字数组，最多有4组，最少有两组

##### 事件methods
事件名|  描述
---|---


>  
---
## lead-column

**demo地址:**  http://localhost:8088/#/demo/lead/leadColumn

##### 应用场景
> 主要运用于理财产品

##### 用法
```
<template>

    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="7">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="5">444433.00</v-lead-item>
    </lead-column>
    <stub></stub>
    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="4">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="4">444433.00</v-lead-item>
        <v-lead-item desc="理财期限" :span="4">灵活存取</v-lead-item>
    </lead-column>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
header | String | '' | 流程条是横行还是纵向展示，还可为值vertical
footer | Array | '' | 流程步骤说明文字数组，最多有4组，最少有两组

##### 事件methods
事件名|  描述
---|---


>  
---

## lead-item
> 虚拟空节点

##### 用法
```
<template>

    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="7">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="5">444433.00</v-lead-item>
    </lead-column>
    <stub></stub>
    <lead-column label="账户余额（元）" content="40000.00">
        <v-lead-item desc="入账金额（元）" :span="4">4444.00</v-lead-item>
        <v-lead-item desc="累计收益（元）" :span="4">444433.00</v-lead-item>
        <v-lead-item desc="理财期限" :span="4">灵活存取</v-lead-item>
    </lead-column>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
header | String | '' | 流程条是横行还是纵向展示，还可为值vertical
footer | Array | '' | 流程步骤说明文字数组，最多有4组，最少有两组

##### 事件methods
事件名|  描述
---|---


>  
---