## addPhoto

**demo地址:**  http://localhost:8088/#/demo/upload/upload

##### 应用场景
> 上传图片

##### 用法
```
<template>

    <v-add-photo ref="part1"
        :img-data="resData1" 
        :param-data="paramDatas1" 
        :upload-url="uploadUrl"
        :editor="isEditor" 
        @on-uploadimg="uploadImg('part1')"
        @listen="showCountMaster" 
        @listencheck="showCheckPart1">
    </v-add-photo>
    
</template>

```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
editor | Boolean | -- | 是否为可编辑态
param-data | Object | {} | 上传图片请求接口入参
img-data | Array| [] | 已上传过的图片数据
upload-url | String | -- | 上传图片接口名称
##### 事件methods
事件名|  描述
---|---
on-uploadimg | H5原生上传图片方式，上传成功时触发，返回上传压缩后的base64的图片URL
listen | H5原生上传图片方式，上传成功时触发，返回上传图片的总张是
listencheck | 编辑上传后的图片，选中图片时触发，返回一个对象，包含选中的图片张数choose和上传图片的总张数count


> 
---
