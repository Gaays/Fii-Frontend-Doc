# 项目维护

当需要维护基于本框架的项目时可以参考这个页面。

:::tip
在开始之前，请务必查看并熟读[风格指南](/guide/advanced/style-guide.md)和[结构目录](/guide/#目录结构)，方便你高效查找，修改文件，了解项目结构。

请注意指南仅适用于标准情况下，具体项目可能根据实际需求，目录、文件有所变化。
:::

## 文件目录

本项目的文件目录结构如下所示，根据项目的不同部分文件可能会被移除。当需要修改文件树时请参考风格指南中的命名规范，文件保存请参考结构目录进行正确存放。

```bash
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 修改基础样式和布局

### 默认布局

::: tip
`@` 设置为 src 文件路径代称

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

```js
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

本项目默认开启 TagsView 功能，如不需要可按照 [移除标签栏导航](/guide/essentials/tags-view.md#移除) 方法移除。

TagsView 实现原理：在[`TagsView`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/TagsView/index.vue)组件中监听 Vue Router 的变化，在标签栏根据 vuex 中路由数据进行逻辑处理和条件渲染。

### 浏览器标签 icon

本模板提供默认 icon ![默认icon](../../.vuepress/public/images/docImg/20210923094236.jpg)
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

## 修改页面和路由

路由和侧边栏由同一份对象数组维护。

### 添加页面或修改路由

在 `@/router/index.js` 中增加你需要添加的路由，路由的基础格式如下所示。具体请查看[路由和侧边栏](/guide/essentials/router-and-nav.md)和[新增页面](/guide/essentials/new-page.md)

```js
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [
    {
      path: 'export-excel',
      component: ()=>import('excel/exportExcel'),
      name: 'exportExcel',
      meta: { title: 'exportExcel' }
    }
  ]
}
```

### 修改路由行为

当添加了页面和路由但是无法进入该页面或页面跳转出错时，可能是错误的路由行为导致的，你需要检查`@/permission.js`，控制路由行为与你的预期保持一致。

## 修改网络请求

本框架默认使用`Axios`组件实现 http 请求。

### 添加或修改接口

本框架已封装 Axios，在维护接口时只需到`@/api`文件中新增或修改对应的接口即可。请求例子如下，具体请查看[和服务器端进行交互](/guide/essentials/server.md)

```js
// api/article.js
import request from '../utils/request';
export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// views/example/list
import { fetchList } from '@/api/article'
export default {
  data() {
    list: null,
    listLoading: true
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
```

### 修改请求地址

本框架默认为动态配置后台请求地址，请确认`@/utils/request.js`中是否引用`window.config.baseUrl`，如需修改请求地址可修改此处：`/public/config/config.js`。若与描述不符请按实际项目真实情况处理。

### 修改 axios 行为

当修改了接口后并不能发出网络请求，或者网络请求参数错误，可能是错误的 axios 行为导致的，你需要确保接口正确并检查`@/utils/request.js`，控制 axios 行为与你的预期保持一致。

## git 相关

为了统一代码仓库中代码风格，本框架规定了一套代码风格规范，会在`git commit`时检查代码，若不符合代码规范则会报错，控制台显示信息如下：

![git per-commit报错](../../.vuepress/public/images/docImg/Snipaste_2021-09-22_16-02-49.png)

当不能被自动修复时`git commit`动作会被中断，你需要根据提示手动修改错误后 **重新`git add`** 后再次尝试`git commit`。

使用`git pre-commit`来处理代码格式化的优势如下：

1. 在协作开发时提交的代码只会有内容的变更，不会因为不同开发者使用不同本地格式化工具导致代码仓库产生无意义变更记录。
2. 每位开发者可以在本地使用自己习惯的代码风格样式格式化代码，提交到代码仓库时保持框架规定的代码风格。
3. 全自动处理代码格式化，不会出现忘记格式化的情况。

::: danger
**请勿修改 git hook 中关于代码格式化内容，以及`.eslintrc.js`文件**
:::

在某些特殊情况下可以使用 `git commit --no-verify` 跳过 `git per-commit` 代码检查。

## 项目构建和发布

本框架使用了`UglifyJs`组件来实现打包后混淆代码并取消控制台输出 log 日志。关于`UglifyJs`处理请查看[构建与发布](/guide/essentials/deploy.md)，里面有详细说明。

此外，为了减小包体积请在项目交付时移除不需要的 npm 包，如`husky`、`lint-staged`等，并删除引用及`package.json`中对应脚本。
