## radio

**demo地址:**  http://localhost:8088/#/demo/form/form

##### 应用场景
> 两级联动的城市选择，多用于填写用户的开户城市信息

##### 用法
```
<template>

    <radio :value="!currentValue" @click.native="changeRadio(false)">否</radio>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
value | Boolean| true | 默认选中

##### 事件methods
事件名|  描述
---|---

---