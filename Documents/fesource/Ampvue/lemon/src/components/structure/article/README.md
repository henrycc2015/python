## article

**demo地址:**  http://localhost:8088/#/common/authorizationDeclare/index

##### 应用场景
> 展示正文信息的组件

##### 用法
```
<template>
    <v-article :title="文章标题>                
        文字正文内容文字正文内容文字正文内容文字正文内容文字正文内容
        文字正文内容文字正文内容文字正文内容文字正文内容文字正文内容
    </v-article>
    <!-- 亦可如下写法 自定义内容参数content -->
    <v-article :title="文章标题>                
        <div v-html="content"></div>
    </v-article>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
title | String| -- | 文章标题

##### 事件methods
事件名|  描述
---|---

---