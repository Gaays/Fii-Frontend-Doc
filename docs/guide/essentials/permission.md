# 权限验证

 参考教程：[手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac) 。

该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具有的权限可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上。

但其实很多公司的业务逻辑可能不是这样的，举一个例子来说，很多公司的需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的。如：你可以在后台通过一个 tree 控件或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。当用户登录后得到 `roles`，前端根据`roles` 去向后端请求可访问的路由表，从而动态生成可访问页面，之后就是 router.addRoutes 动态挂载到 router 上，你会发现原理是相同的，万变不离其宗。

只是多了一步将后端返回路由表和本地的组件映射到一起。相关[issue](https://github.com/PanJiaChen/vue-element-admin/issues/293)

```js
const map={
 login:require('login/index').default // 同步的方式
 login:()=>import('login/index')      // 异步的方式
}
//你存在服务端的map类似于
const serviceMap=[
 { path: '/login', component: 'login', hidden: true }
]
//之后遍历这个map，动态生成asyncRoutes
并将 component 替换为 map[component]
```

此外，路由页面较多的项目在后台存储完整的`serviceMap`不一定合适，可在后端存储简略的路由信息，如`router-path`，从后台获取权限数据后在前端做匹配拼装`router`数据。

## 逻辑修改

`@/permission.js`负责路由拦截，路由层面权限的控制代码都在 `@/permission.js` 中，如果想修改逻辑，直接在适当的判断逻辑中 `next()` 释放钩子即可。

## 指令权限

封装了一个指令权限，能简单快速的实现按钮级别的权限判断。 [v-permission](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/directive/permission)

**使用**

```html
<template>
  <!-- Admin can see this -->
  <el-tag v-permission="['admin']">admin</el-tag>

  <!-- Editor can see this -->
  <el-tag v-permission="['editor']">editor</el-tag>

  <!-- Editor can see this -->
  <el-tag v-permission="['admin','editor']">Both admin or editor can see this</el-tag>
</template>

<script>
// 当然你也可以为了方便使用，将它注册到全局
import permission from '@/directive/permission/index.js' // 权限判断指令
export default{
  directives: { permission }
}
</script>
```

**局限**

在某些情况下`v-permission`不适用, 如element-ui组件。

可以使用全局权限判断函数，用法和指令 `v-permission` 类似。

```html
<template>
  <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">Admin can see this</el-tab-pane>
  <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">Editor can see this</el-tab-pane>
  <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">Both admin or editor can see this</el-tab-pane>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数

export default{
   methods: {
    checkPermission
   }
}
</script>
```

**此外，若想实现无刷新式动态显隐权限组件，`v-permission`无法实现，可通过`v-if`配合全局权限判断函数实现。**
