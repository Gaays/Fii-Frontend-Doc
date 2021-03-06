## 风格指南

本项目的风格指南主要是参照 `vue` 官方的[风格指南](https://cn.vuejs.org/v2/style-guide/index.html)。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码。当然每个团队都会有所区别。其中大部分规则也都配置在了[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)之中，当没有遵循规则的时候会报错，详细内容见[eslint](./eslint.md)章节。

当然也有一些特殊的规范，是不能被 eslint 校验的。需要人为的自己注意，并且来遵循。最主要的就是文件的命名规则，这里拿`vue-element-admin`来举例。

## Component

所有的`Component`文件都是以大写开头 (PascalCase)，这也是官方所[推荐的](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)。

但除了 `index.vue`。

例子：

- `@/components/BackToTop/index.vue`
- `@/components/Charts/Line.vue`
- `@/views/example/components/Button.vue`

在页面中引用时名称与文件名称相同（PascalCase），而不是实用html常见的kebab-case，这里原因有2个：
1. 与原生标签做区分。
2. 方便维护查询索引。

::: warning
请用可以描述其功能的2-n个单词命名component，防止与html原生标签名及未来可能加入的新的标签名冲突。
:::

``` vue
<template>
  <div>
    <LoginButton></LoginButton>
  </div>
</template>

<script>
import LoginButton from '@/components/LoginBotton'
export default {
  component:{
    LoginButton
  }
}
</script>
```

## JS 文件

所有的`.js`文件都遵循横线连接 (kebab-case)。

例子：

- `@/utils/open-window.js`
- `@/views/svg-icons/require-icons.js`
- `@/components/MarkdownEditor/default-options.js`

在编写全局js方法时，请务必提供注释信息，使用vscode [koroFileHeader扩展](/guide/other/extension.html#korofileheader)可实现快速设置。

对函数使用korofileheader 扩展后会生成这样的注释模板：

![](../../.vuepress/public/images/docImg/Snipaste_2021-09-24_10-12-26.png)

请根据函数实际修改注释模板内容，若函数名称可以清楚说明函数作用可省略description。

![](../../.vuepress/public/images/docImg/Snipaste_2021-09-24_10-14-25.png)

## Views

在`views`文件下，代表路由的`.vue`文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

例子：

- `@/views/svg-icons/index.vue`
- `@/views/svg-icons/require-icons.js`

使用横线连接 (kebab-case)来命名`views`主要是出于以下几个考虑。

- 横线连接 (kebab-case) 也是官方推荐的命名规范之一 [文档](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- `views`下的`.vue`文件代表的是一个路由，所以它需要和`component`进行区分(component 都是大写开头)
- 页面的`url` 也都是横线连接的，比如`https://www.xxx.admin/export-excel`，所以路由对应的`view`应该要保持统一
- 没有大小写敏感问题
