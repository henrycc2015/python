## picker

**demo地址:**  http://localhost:8088/index.html#/demo/popupPicker/popupPicker

##### 应用场景
> 滚轮式选择，iOS原生版样式

##### 用法
```
<template>
    <v-picker 
        v-model="tempValue" 
        :data="data" 
        @on-change="onPickerChange" 
        :columns="columns" 
        :fixed-columns="fixedColumns" 
        :column-width="columnWidth" >
    </v-picker>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
data | Array | -- | picker展示的数据
columns | String | -- | 指定联动模式下的列数，当不指定时表示非联动
fixed-columns | Number | 0 | 指定显示多少列，隐藏多余的
column-width | Array | -- | 定义每一列宽度，只需要定义除最后一列宽度，最后一列自动宽度， 比如对于3列选择，可以这样：[1/2, 1/5]
value | Array | -- | 表单值，使用`v-model`绑定

##### 事件methods
事件名|  描述
---|---
on-change | 值变化时触发

##### 使用备注
> 该组件中使用了子组件flexbox和flexbox-item来渲染出滚轮的效果，所以在使用时，主要就是data的数据格式，必须时数组形式的



---