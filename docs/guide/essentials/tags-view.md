# 快捷导航(标签栏导航)

目前的方案大致为：
运用 `keep-alive` 和 `router-view` 的结合。

代码: `@/layout/components/AppMain.vue`

```html
<keep-alive :include="cachedViews">
  <router-view></router-view>
</keep-alive>
```

顶部标签栏导航实际作用相当于 nav 的另一种展现形式，其实说白了都是一个个 router-link，点击跳转到相应的页面。然后我们再来监听路由 `$route` 的变化，来判断当前页面是否需要重新加载或者已被缓存。

## visitedViews && cachedViews

目前 tags-view 维护了两个数组。

- visitedViews : 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
- cachedViews : 实际 keep-alive 的路由。可以在配置路由的时候通过 `meta.noCache` 来设置是否需要缓存这个路由 默认都缓存。[配置文档](router-and-nav.md)

## 注意事项

::: warning
由于目前 `keep-alive` 和 `router-view` 是强耦合的，而且查看文档和源码不难发现 `keep-alive` 的 [include](https://cn.vuejs.org/v2/api/#keep-alive) 默认是优先匹配组件的 **name** ，所以在编写路由 router 和路由对应的 view component 的时候一定要确保 两者的 name 是完全一致的。(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了，不然会递归引用最后内存溢出等问题)
:::

**DEMO:**

```js
//router 路由声明
{
  path: 'create-form',
  component: ()=>import('@/views/form/create'),
  name: 'createForm',
  meta: { title: 'createForm', icon: 'table' }
}
```

```js
//路由对应的view  form/create
export default {
  name: 'createForm'
}
```

一定要保证两者的名字相同，切记写重或者写错。默认如果不写 name 就不会被缓存，详情见[issue](https://github.com/vuejs/vue/issues/6938#issuecomment-345728620)。

## 缓存不适合场景

目前缓存的方案对于某些业务是不适合的，比如文章详情页这种 `/article/1` `/article/2`，他们的路由不同但对应的组件却是一样的，所以他们的组件 name 就是一样的，就如前面提到的，`keep-alive`的 include 只能根据组件名来进行缓存，所以这样就出问题了。目前有两种解决方案：

- 不使用 keep-alive 的 include 功能 ，直接是用 keep-alive 缓存所有组件，这样子是支持前面所说的业务情况的。
  前往[@/layout/components/AppMain.vue](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/AppMain.vue)文件下，移除`include`相关代码即可。当然直接使用 keep-alive 也是有弊端的，他并不能动态的删除缓存，你最多只能帮它设置一个最大缓存实例的个数 limit。[相关 issue](https://github.com/vuejs/vue/issues/6509)

- 使用 localStorage 等浏览器缓存方案，自己进行缓存处理

## Affix 固钉

当在声明路由是 添加了 Affix 属性，则当前`tag`会被固定在 `tags-view`中（不可被删除）。

![](../../.vuepress/public/images/docImg/52840303-cd5c9280-3133-11e9-928f-e2825eaab51b.png)

```js {14}
 {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  }
```
## 右键菜单

鼠标在`tag`上点击右键则会出现快捷操作菜单。

![](../../.vuepress/public/images/docImg/Snipaste_2021-09-16_16-22-41.png)

通过修改方法自定义右键事件及右键菜单，代码：`@/layout/TagsView/index.vue`

```html {11}
<!--右键事件-->
<router-link
  v-for="tag in visitedViews"
  ref="tag"
  :key="tag.path"
  :class="isActive(tag)?'active':''"
  :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
  tag="span"
  class="tags-view-item"
  @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
  @contextmenu.prevent.native="openMenu(tag,$event)"
>
  {{ tag.title }}
  <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
</router-link>
```

```html
<!--右键菜单-->
<ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
  <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
  <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
  <li @click="closeOthersTags">Close Others</li>
  <li @click="closeAllTags(selectedTag)">Close All</li>
</ul>
```

## 关闭`tag`

除了点击`tag`右侧x关闭外，还可通过鼠标中键关闭

```html {9}
<router-link
  v-for="tag in visitedViews"
  ref="tag"
  :key="tag.path"
  :class="isActive(tag)?'active':''"
  :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
  tag="span"
  class="tags-view-item"
  @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
  @contextmenu.prevent.native="openMenu(tag,$event)"
>
  {{ tag.title }}
  <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
</router-link>
```

## 移除

如果项目没有标签导航栏需求，建议移除此功能。

首先找到 `@/layout/components/AppMain.vue` 然后移除 `keep-alive`

```html
<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>
```

然后移除整个 `@/layout/components/TagsView.vue` 文件，并在`@/layout/components/index` 和 `@/layout/Layout.vue` 移除相应的依赖。最后把 `@/store/modules/tagsView` 相关的代码删除即可。
