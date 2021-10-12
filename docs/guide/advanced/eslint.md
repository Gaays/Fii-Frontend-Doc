# ESLint

不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。

## 配置项

所有的配置文件都在 [.eslintrc.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js) 中。
本项目基本规范是依托于 vue 官方的 eslint 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 做了少许的修改。

## 取消 ESLint 校验

如果你不想使用 ESLint 校验（不推荐取消），只要找到 [vue.config.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js) 文件。
进行如下设置 `lintOnSave: false` 即可。

## vscode 配置 ESLint

这所谓工欲善其事，必先利其器，个人推荐 eslint+vscode 来写 vue，绝对有种飞一般的感觉。效果如图：
![eslintGif.gif](../../.vuepress/public/images/docImg/e94a76df-6dc0-4c15-9785-28b553a163e9.png)

<br/>

每次保存，vscode 就能标红不符合 eslint 规则的地方，同时还会做一些简单的自我修正。安装步骤如下：

首先安装 eslint 插件
![eslint1.png](../../.vuepress/public/images/docImg/72f126cb-09eb-4b27-b02e-65e79eb76220.png)

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件,添加如下配置

```json
{
  "files.autoSave": "off",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.run": "onSave",
  "eslint.autoFixOnSave": true
}
```

这样每次保存的时候就可以根据根目录下.eslintrc.js 你配置的 eslint 规则来检查和做一些简单的 fix。

## 更多配置

由于本项目是基于`vue-cli`进行构建，所以更多配置可参考官方[文档](https://cli.vuejs.org/zh/config/#lintonsave)

## 自动修复

```bash
npm run lint -- --fix
```

运行如上命令，eslint 会自动修复一些简单的错误。
