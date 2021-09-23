# 快速入门

:::tip
在开始之前，请务必查看并熟读[风格指南](/guide/advanced/style-guide.md)和[结构目录](/guide/#目录结构)，统一且规范的代码将为多人协作和维护带来极大的便利！
:::

## 获取模板

```bash
# clone the project
git clone http://106.52.211.44:5674/JiapengShu/fii-frontend-template

# install dependency
npm install

# develop
npm run dev
```

## 默认布局

::: tip
`@` 设置为src文件路径代称

页面布局文件统一存放位置：[`@/layout`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/tree/master/src/layout)
:::

Fii-Frontend-Template 默认提供布局组件：
- 侧边栏 [`Sidebar`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/Sidebar/index.vue)
- 导航栏 [`Navbar`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/Navbar.vue)
  - 侧边栏收放按钮 [`hamburger`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/Hamburger/index.vue)
  - 面包屑 [`breadcrumb`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/Breadcrumb/index.vue)
  - 右侧下拉菜单 [`el-dropdown`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/Navbar.vue)
- 标签栏导航 [`TagsView`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/TagsView/index.vue)

根据项目业务不同的需求，你可以在[`@/setting`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/settings.js)中配置布局组件

布局组件可配置项：
``` js
// 浏览器标签名称
title: 'Fii FrontEnd Template',

// 是否固定header
fixedHeader: true,

// 是否显示标签栏导航
tagsView: true,

// 侧边栏是否显示logo
sidebarLogo: true

// 侧边栏显示logo时显示的标题和logo
sidebarConfig: {
  title: 'Fii FrontEnd Template',
  logo: 'sidebarLogo.png'
}
```

::: tip
需要注意的是：只有在`sidebarLogo: true`时才需要配置`sidebarConfig`

`sidebarConfig.logo`存放在`@/assets/sidebar_logo`文件夹。
:::

### 标签栏导航 TagsView
本项目默认开启TagsView功能，如不需要可按照 [移除标签栏导航](tags-view.md#移除) 方法移除。

TagsView实现原理：在[`TagsView`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/TagsView/index.vue)组件中监听Vue Router的变化，在标签栏根据vuex中路由数据进行逻辑处理和条件渲染。

### 浏览器标签 icon

本模板提供默认icon ![默认icon](../../.vuepress/public/images/docImg/20210923094236.jpg)
若需要修改请替换`public/favicon.ico`文件

```html {9}
<!-- publick/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script type="text/javascript" src="./config/config.js"></script>
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= webpackConfig.name %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= webpackConfig.name %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

配置完成后可以看到页面随着你的修改布局发生变化，接下来我们处理网络请求。

## 网络请求

### 使用真实数据

若已有后台接口地址，我们需要 [移除项目中的mock](/guide/essentials/mock-api.html#移除)。

为了方便修改部署环境，统一交付项目代码文件树，项目所有动态配置存放位置： `public/config/config.js`，api请求地址也在其中。

``` js
window.config = {
    // api请求地址
    apiUrl: '/dev-api',
}
```

修改完api请求地址后`axios`就可以正确工作了，如果需要对`axios`默认行为修改，参考[axios文档](https://axios-http.com/zh/docs/intro)。

如果项目不能按照你的预期执行，请查看路由拦截 [`@/permission`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/permission.js)行为和axios [`@/util/request`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/utils/request.js)行为，确保他们的行为符合你的预期。

除此之外还可以使用[vue-cli环境变量](env.md)控制不同环境下使用不同的api接口地址

### 使用模拟数据

参考[mock](mock-api.md)

## 新增页面&维护路由

`vue-element-admin`中已有详细文档，详见 [新增页面](new-page.md) 和 [路由和侧边栏](router-and-nav.md)

## git相关

本模板规定了一套代码风格规范，会在`git commit`时检查代码，若不符合代码规范则会报错，控制台显示信息如下：

![git per-commit报错](../../.vuepress/public/images/docImg/Snipaste_2021-09-22_16-02-49.png)

当不能被自动修复时`git commit`动作会被中断，你需要根据提示手动修改错误后 **重新`git add`** 后再次尝试`git commit`。

::: danger
**请勿修改git hook中关于代码格式化内容，以及`.eslintrc.js`文件**
:::

在某些特殊情况下可以使用 `git commit --no-verify` 跳过 `git per-commit` 代码检查。

## 项目交付

::: tip
项目交付时请移除不需要的npm包，如`husky`、`lint-staged`等，并删除引用及`package.json`中对应脚本。
:::