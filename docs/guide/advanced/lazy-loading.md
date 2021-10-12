# 路由懒加载

当打包构建应用时，Javascript 包会变得非常大，影响页面加载速度。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)和 Webpack 的[代码分割功能](https://www.webpackjs.com/guides/code-splitting/)，轻松实现路由组件的懒加载。如：

```js
const Foo = () => import('./Foo.vue')
```

<br>

**当你觉得你的页面热更新速度慢的时候，才需要往下看 ↓**

## 方案

使用`babel` 的 `plugins` [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node)。它只做一件事就是将所有的`import()`转化为`require()`，这样就可以用这个插件将所有异步组件都用同步的方式引入，并结合 [BABEL_ENV](https://babeljs.io/docs/usage/babelrc/#env-option) 这个`babel`环境变量，让它只作用于开发环境下，在开发环境中将所有`import()`转化为`require()`，这种方案解决了之前重复打包的问题，同时对代码的侵入性也很小，你平时写路由的时候只需要按照官方[文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)路由懒加载的方式就可以了，其它的都交给`babel`来处理，当你不想用这个方案的时候，也只要将它从`babel` 的 `plugins`中移除就可以了。

**具体代码：**

首先在`package.json`中增加`BABEL_ENV`

```json
"dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```

接着在`.babelrc`只能加入`babel-plugin-dynamic-import-node`这个`plugins`，并让它只有在`development`模式中才生效。

```json
{
  "env": {
    "development": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

之后就大功告成了，路由只要像平时一样写就可以了。

```js
 { path: '/login', component: () => import('@/views/login/index')}
```

## vue-cli@4

1. 在 `.env.development`文件中不在需要配置`VUE_CLI_BABEL_TRANSPILE_MODULES = true`，删除即可。

2. 在命令行执行 `npm install babel-plugin-dynamic-import-node -S -D`

3. 在`babel.config.js` 中添加插件

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}
```

## 改进

`webpack5` 即将发布，大幅提高了打包和编译速度，之后可能完全不需要搞这么复杂了，再多的页面热更新，都能很快，完全就不需要前面提到的解决方案了。
