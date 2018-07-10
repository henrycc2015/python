## 所有cell的组件

**demo地址:**  http://localhost:8088/#/demo/cell/cell
> 目前所有的cell样式都在以下的几个组件中，如果有不能满足设计稿的cell，请尽量UI沟通并尽量采用现有的规范组件

### cell-add
##### 应用场景
> 仅限于整行的cell，且内容为金色并居中显示，并有“+”号`icon`的，多运用于添加某项信息

##### 用法
```
<template>
    <cell-add 
        @click-event="eventHandle" >
        添加受益人
    </cell-add>
    <!-- 亦可如下写法 -->
    <cell-add 
        @click.native="eventHandle" >
        添加受益人
    </cell-add>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框

##### 事件methods
事件名|  描述
---|---
click-event | 触发点击cell的事件

---

### cell-display

##### 应用场景

> 整行cell左右两边都是纯展示信息的，多应用于单页面中，cell的相近模块中无cell-input的地方

##### 用法
```
<template>
    <!-- 默认插槽slot中的内容为cell右边的填充内容 -->
    <cell-display title="switch切换" @click.native="clickHandle">
        <toggle @on-change="getToggerState" v-model="toggerState"></toggle>
    </cell-display>
    <!-- 有指向向下一级的尖头 -->
    <cell-display title="产品详情" is-link>
    <!-- 左边title的前置内容样式 slot为header, title后置icon由iconObject确定 -->
    <cell-display 
        title="前置图标" 
        iconObject="iconObj"
        is-link>
            <i-icon 
                slot="header"
                style="margin-right: 5px;" 
                name="gift" 
                color="#c1c1c1" 
                size="40"  
                class="head-icon">
            </i-icon>
    </cell-display>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
isLink | Boolean| -- | 右边是否显示像右的箭头
iconObject | Object| -- | 左边文字后面显示的icon的信息对象，包含name,color,size
styleObject | Object| -- | 左边内容的自定义样式

##### 事件methods
事件名|  描述
---|---
~~icon-click~~ | ~~$emit出的方法名，用于处理点击左边文字后面的icon的事件~~

#### 使用备注
> 左右两边的内容都是可以自定义的，左边的文字的左边可以自定义内容<slot name="header">，右边的内容完全自定义是默认的slot，但文字颜色默认为#333。

---

### cell-input

#### 应用场景

> 整行cell右边为input输入框的

##### 用法
```
<template>
    <!-- 默认插槽slot中的内容为cell右边的填充内容 -->
    <cell-input 
        shortBottemBorder :icon-object="{'name':'question-round','color':'#d7ac62','size':'40'}" title="姓名" 
        is-need-top-border 
        v-model="value1" 
        input-type="text" 
        @icon-click="iconClick">
        </cell-input>
    <!-- input框右侧自定义内容 -->
    <cell-input title="价格" v-model="value2" input-type="text" :need-clear="false">
        <span style="margin-left: 5px;color:#333">元起</span>
    </cell-input>
    <!-- 开启OCR -->
    <cell-input title="身份证" v-model="value5" input-type="text" :need-clear="false" :id-card="idCard">
    </cell-input>
    <!-- 有指向向下一级的尖头is-link，且input内容为只读态readonly -->
    <cell-input title="有右箭头" v-model="value3" input-type="tel" :max-length="11" readonly is-link>
    <!-- 可清除输入框全部内容 need-clear -->
    <cell-input title="清除全部" v-model="value8" input-type="tel" :max-length="11" need-clear>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
isLink | Boolean| -- | 右边是否显示像右的箭头
iconObject | Object| -- | 左边文字后面显示的icon的信息对象，包含name,color,size
inputType | String| -- | input的type类型（number/tel/text）
placeholder | String| '请输入' | input的提示文字
maxLength | Number| -- | input的type为tel或text时value的最大长度
needClear | Boolean| true | 是否清空value值
readonly | Boolean| -- | input是否为只读
disabled | Boolean| -- | input是否为只读
idCard | Boolean| false | 是否启用身份证的OCR
bankCard | Boolean| false | 是否启用银行卡的OCR

##### 事件methods
事件名|  描述
---|---
icon-click | 用于处理点击左边文字后面的icon的事件
#### 使用备注


---


### cell-radio
#### 应用场景
> 整行cell右边为二选一的单选radio

##### 用法
```
<template>
    <!-- 包含说明文字的单选cell -->
    <cell-radio 
        :icon-object="{'name':'question-round','color':'#d7ac62','size':'40'}"
        title="是否" 
        is-need-top-border 
        v-model="value6" 
        input-type="text" 
        @icon-click="iconClick" 
        @change="radioChange">
    </cell-radio>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
iconObject | Object| -- | 左边文字后面显示的icon的信息对象，包含name,color,size
trueValue | String| '是' | 默认选中的label内容
falseValue | String| '否' | 默认未选中的label内容

##### 事件methods
事件名|  描述
---|---
icon-click | $emit出的方法名，用于处理点击左边文字后面的icon的事件
input | $emit出的方法名，参数为当前选中value值
change | $emit出的方法名，带参数为当前选中value值
#### 使用备注
> 


---



### cell-textarea

#### 应用场景
> 整行cell右边为textarea输入框的

##### 用法
```
<template>
    <!-- textarea文本域 -->
    <cell-textarea 
        title="详细地址" 
        placeholder="请输入详细地址" 
        :rows="2" 
        :cols="30" 
        :max="20">
    </cell-textarea>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
placeholder | String| '请输入' | input的提示文字
readonly | Boolean| -- | textarea是否为只读，不可修改输入框内容
max | Number| -- | textarea的value的最大长度
name | String| -- | textarea的name值
rows | Number| 3 | textarea的行数
cols | Number| 30 | textarea的列数
height | Number| -- | textarea的高度
autocomplete | String| 'off' | 输入字段是否启用自动完成功能
autocapitalize | String| 'off' | 输入字段是否启用首字母大写
autocorrect | String| 'off' | 是否对输入内容进行自动改正
spellcheck | String| 'off' | 是否对输入内容进行拼写和语法检查

#### 事件methods
methods|  备注
---|---
icon-click | $emit出的方法名，用于处理点击左边文字后面的icon的事件
##### 使用备注
> 当title为空时，textarea默认宽度为整行cell，但若想要整行的cell，建议直接使用basic/textarea组件


---


### cell-verification
##### 应用场景
> 整行cell，输入手机验证

##### 用法
```
<template>
    <!-- textarea文本域 -->
    <cell-textarea 
        title="详细地址" 
        placeholder="请输入详细地址" 
        :rows="2" 
        :cols="30" 
        :max="20">
    </cell-textarea>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
notitle | Boolean| -- | 是否没有左边文字，为true则不显示左边文字
time | Number| -- | 验证码倒计时时间
maxLength | Number| -- | 验证码的输入框的最大长度
##### 事件methods
事件名|  描述
---|---
sendCode | 获取验证码请求的方法
##### 使用备注


---


### cell-text
##### 应用场景
> 整行cell左右两边都是纯展示信息的

##### 用法
```
<template>
    <cell-text title="姓名" content="李**">
    </cell-text>
    <cell-text title="秒杀产品" content="境外险">
        <badge slot="head">长险</badge>
        <span slot="content">费用</span>
    </cell-text>
    <cell-text title="证件类型" content="身份证">
    </cell-text>
    </cell-text>
    <cell-text title="证件号" content="****567890987655678" isLink>
    </cell-text>
</template>
```

##### 属性props
属性名| 类型| 默认值| 描述
---|---|---|---
isNeedTopBorder | Boolean| -- | 是否显示上边框
shotleftBottomline | Boolean| -- | 下边框是否是距离左边有15px间距
title | String, Number| -- | 左边显示文字
content | String, Number| -- | 右边显示文字
titleColor | String| -- | 左边文字的字体颜色
contentColor | String| -- | 右边文字的字体颜色
isLink | Boolean| -- | 右边是否显示像右的箭头
ellipsis | Boolean| -- | 右边内容超出时是否显示省略号

##### 事件methods
事件名|  描述
---|---

##### 使用备注

> 左右两边文字的右边都可以自定义内容，左边自定义内容<slot name="header">，右边自定义内容<slot name="content">


---
