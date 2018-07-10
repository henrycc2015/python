## annotation

**demo地址:**  http://localhost:8088/#/demo/annotation/annotation

##### 应用场景
> 说明文字

##### 用法
```
<template>
    <!-- 文字默认居中对齐 -->
    <v-annotation>申请理赔时，需有社保和补充医疗先行赔付，否则讲按条款约定降低赔付比例</v-annotation>
    
    <!-- 文字居右对齐 -->
    <v-annotation tl='right'>申请理赔时，需有社保和补充医疗先行赔付，否则讲按条款约定降低赔付比例</v-annotation>
    
    <!-- 文字居左对齐 -->
    <v-annotation tl='left'>申请理赔时，需有社保和补充医疗先行赔付，否则讲按条款约定降低赔付比例</v-annotation>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
tl | String| center | 文字对齐方式
lh | String| normal | 文字行高
positon | String| -- | 文字与相近上模块(top)或下模块(bottom)间距更小（5px）

##### 事件methods
事件名|  描述
---|---

---