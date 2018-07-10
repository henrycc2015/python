## textarea

**demo地址:**  http://localhost:8088/#/demo/cell/cell

##### 应用场景
> 输入多行内容，多集成在单元格cellTextarea组件中使用

##### 用法
```
<template>

    <textarea ref="textarea" v-model="currentValue" :placeholder="placeholder" :readonly="readonly" :name="name" :rows="rows" :cols="cols" :style="textareaStyle" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck">
            </textarea>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
title | String| -- | cell的标题
cancel-text | String| -- | 弹框头部的取消文字
confirm-text | String| -- | 弹框头部的确认文字
data | Array| [] | 弹框主体picker的数据
placeholder | String| 请输入 | 提示文字

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发
on-show | 弹窗出现时触发
on-hide | 弹窗关闭时触发
on-shadow-change | picker 值变化时触发，即滑动 picker 时触发



> 该组件实质上是运用了popup-picker组件，只是对data数据进行了过滤包装
---