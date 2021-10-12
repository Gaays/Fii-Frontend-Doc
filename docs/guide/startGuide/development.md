# 项目开发

当需要基于本框架进行开发时可以参考这个页面

## 获取模板

::: tip
为了避免本框架代码被覆盖，请在`git clone`后删除项目中的.git 文件，并根据自身项目需求重新执行`git init`指令，指向自身项目仓库。
:::

```bash
# clone the project
git clone http://106.52.211.44:5674/JiapengShu/fii-frontend-template

# install dependency
npm install

# develop
npm run dev
```

## 项目运行

在执行完`npm run dev`指令后，你会看到如下界面：
![](../../.vuepress/public/images/docImg/Snipaste_2021-10-12_11-19-31.png)

本框架网络请求部分封装了`axios`，默认包含一个带 mock api 的登录页面，目的是让用户快速熟悉封装式网络请求写法和格式。

接下来将通过登录功能为你介绍框架设计思想及代码处理逻辑，使对项目有个初步了解。

### 登录页面

:::tip
`@`为`/src`文件夹的指代，具体配置在`vue.config.js`中。
:::

首先打开`@/views/login/index.vue`文件，登录页面的具体页面处理先不看，我们关注输入正确账号密码后点击登录后发生了什么。

通过阅读代码我们得知：点击登录后执行了`handleLogin()`方法，当账号密码输入校验成功后执行了一个 vuex 的 action:`user/login`.

```js{5}
handleLogin() {
  this.$refs.loginForm.validate(valid => {
    if (valid) {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
```

或许你会疑惑为什么这里要使用 vuex 而不是直接调用登录接口，这是一种设计思想：若数据或动作是全局性质的或需要操作多个 vuex 中的变量，我们可以将其放入 vuex 的`action`中处理。

### vuex 组件

接下来打开`@/store/modules/user.js`文件，查看 action 中的`login`方法。

```js{1,2,6,8,9}
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
login({ commit }, userInfo) {
  const { username, password } = userInfo
  return new Promise((resolve, reject) => {
    login({ username: username.trim(), password: password }).then(response => {
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
```

可以看到 Promise 中执行了一个 api 请求：`login`，如果请求成功则设置 token，这里的 token 设置为前端判断用户登录状态的标志，需要全局使用，所以将网络请求放在 vuex 中。

如：在路由拦截`@/permission.js`中，只有检测到 token 才能进行应用内路由跳转，否则路由将会指向登录页面。此处路由逻辑可以根据项目需求修改。

```js
// 简洁版router.beforeEach
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    // other pages that do not have permission to access are redirected to the login page.
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})
```

### 网络请求

接下来我们看看刚刚忽略的`login`api 请求，首先请查看`@/utils/request.js`文件，这里简单封装了`axios`组件。

基础配置如下，若需要更改网络请求地址请到`/public/config/config.js`文件中修改`window.config.baseUrl`，此处`baseUrl`为服务器地址，具体接口地址`apiUrl`将由接口方法提供，网络请求的真正 url 为`baseUrl`和`apiUrl`拼接而成。

```js{3}
// create an axios instance
const service = axios.create({
  baseURL: window.config.baseUrl || '/dev-api', // url = base url + request url
  timeout: 5000 // request timeout
})
export default service
```

然后查看`@/api/user.js`，此处的 url 地址为 mock 地址，具体可查看`/mock/user.js`，如果需要清除 mock 可以参照[移除 mock](/guide/essentials/mock-api.html#移除)来操作

```js{4,5,6}
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
```

传入 request 中的对象内容为 axios 定义的字段，常用的 get、post 方法传递的对象内容如下：

```js
// post请求
export function postRequest(data) {
  return request({
    url: 'url',
    method: 'post',
    data
  })
}

// get请求
export function getRequest(token) {
  return request({
    url: 'url' + queryParams,
    method: 'get'
  })
}
```

你会注意到`@/utils/request.js`文件中还有`service.interceptors.request.use()`和`service.interceptors.response.use()`两个方法，他们分别对应的是请求拦截和响应拦截，若你的项目没有需求可以将其中内容清理。若有需要，具体使用方法可以参考[Axios 官方文档](https://axios-http.com/zh/docs/intro)，此处不再赘述。

## 实际开发

:::tip
在开始之前，请务必查看并熟读[风格指南](/guide/advanced/style-guide.md)和[结构目录](/guide/#目录结构)，统一且规范的代码将为多人协作和维护带来极大的便利！
:::

接下来我们进入实际开发流程，首先我们先了解一下文件目录。

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

### 样式布局配置

::: tip
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

#### 标签栏导航 TagsView

本项目默认开启 TagsView 功能，如不需要可按照 [移除标签栏导航](/guide/essentials/tags-view.md#移除) 方法移除。

TagsView 实现原理：在[`TagsView`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/layout/components/TagsView/index.vue)组件中监听 Vue Router 的变化，在标签栏根据 vuex 中路由数据进行逻辑处理和条件渲染。

#### 浏览器标签 icon

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

配置完成后可以看到页面随着你的修改布局发生变化，接下来我们处理网络请求。

### 网络请求

#### 使用真实数据

若已有后台接口地址，我们需要 [移除项目中的 mock](/guide/essentials/mock-api.html#移除)。

为了方便修改部署环境，统一交付项目代码文件树，项目所有动态配置存放位置： `public/config/config.js`，api baseUrl 请求地址也在其中。

```js
window.config = {
  // api请求地址
  baseUrl: '/dev-api'
}
```

修改完 api 请求地址后`axios`就可以正确工作了，如果需要对`axios`默认行为修改，参考[axios 文档](https://axios-http.com/zh/docs/intro)。

如果项目不能按照你的预期执行，请查看路由拦截 [`@/permission`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/permission.js)行为和 axios [`@/util/request`](http://106.52.211.44:5674/JiapengShu/fii-frontend-template/-/blob/master/src/utils/request.js)行为，确保他们的行为符合你的预期。

除此之外还可以使用[vue-cli 环境变量](/guide/essentials/env.md)控制不同环境下使用不同的 api 接口地址

#### 使用模拟数据

参考[mock](/guide/essentials/mock-api.md)

### 新增页面和路由

本框架设计了一个路由数组，同时维护路由和侧边栏。如果需要新增页面或修改路由只需要修改同一个数组即可。
请查看[路由和侧边栏](/guide/essentials/router-and-nav.md)以及[新增页面](/guide/essentials/new-page.md)，有非常详细的介绍和使用说明。

阅读完以上内容即可进行开发，文档中还有各组件使用方式和设计细节，有需要可以随时查阅。

### git 相关

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

### 项目构建和发布

本框架使用了`UglifyJs`组件来实现打包后混淆代码并取消控制台输出 log 日志。关于`UglifyJs`处理请查看[构建与发布](/guide/essentials/deploy.md)，里面有详细说明。

此外，为了减小包体积请在项目交付时移除不需要的 npm 包，如`husky`、`lint-staged`等，并删除引用及`package.json`中对应脚本。
