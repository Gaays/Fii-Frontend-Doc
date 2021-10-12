# VS Code 扩展

[vscode 插件和配置推荐](https://github.com/varHarrie/Dawn-Blossoms/issues/10)这个issue几乎涵盖了前端开发所需各方面的vscode扩展插件，可以依照你的需求和使用习惯选择添加。

除了安装常见的vscode前端开发拓展外，额外推荐2个拓展：

## Todo Tree

Todo Tree：收集代码中的Todo等标记注释，可以快速搜索，并且可以自定义高亮颜色及标识。

![](../../.vuepress/public/images/docImg/Snipaste_2021-09-24_09-44-32.png)

需要添加或修改Todo Tree配置可在vscode `settings.json`中修改。

```json
"todo-tree.highlights.customHighlight": {
  "TODO": {
    "background": "yellow",
    "icon": "check",
    "iconColour": "yellow",
    //  rulerColour-用于设置右侧拖动条中标记的颜色。如果未指定，它将使用前景色(foreground)。
    "rulerColour": "yellow",
    //  rulerLane 用于在右侧拖动条中设置标记的车道。如果未指定，它将默认为右侧车道。使用 left ， center ， right 或 full 之一。您也可以使用 none 禁用标尺标记。
    "rulerLane": "full",
  },
  "BUG": {
    "icon": "bug",
    "background": "red",
  },
  "FIXME": {
    "icon": "flame"
    "background": "#ff33cc",
  },
  "TAG": {
    "icon": "tag",
    "background": "blue",
    "rulerColour": "blue",
    "iconColour": "blue",
  },
  "DONE": {
    "icon": "issue-closed",
    "background": "green",
    "rulerColour": "green",
    "iconColour": "green",
  },
  "NOTE": {
    "icon": "note",
    "background": "#f90",
    "rulerColour": "#f90",
    "iconColour ": "#f90"
  }
}
```

## koroFileHeader

koroFileHeader用来生成文件头部注释和函数注释，在vue-cli项目中我们主要用它来生成函数注释。

下载安装后在vscode `settings.json`中添加以下内容，查看[koroFileHeader文档](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)了解各字段含义

```json
"fileheader.configObj": {
  "createFileTime": true,
  "language": {
    "c/cpp/h/hpp/js/vue": {
    "head": "/**",
    "middle": " * @",
    "end": "*/"
    }
  },
  "autoAdd": false,
  "autoAddLine": 100,
  "autoAlready": true,
  "annotationStr": {
    "head": "/*",
    "middle": " * @",
    "end": " */",
    "use": false
  },
  "headInsertLine": {
    "*": 1
  },
  "switch": {
    "newlineAddAnnotation": true
  },
  "supportAutoLanguage": [],
  "prohibitAutoAdd": [
    "json",
    "*"
  ],
  "moveCursor": true,
  "dateFormat": "YYYY-MM-DD HH:mm",
  "atSymbol": "@",
  "colon": "",
  "showErrorMessage": false,
  "wideSame": true,
  "wideNum": 15,
  "CheckFileChange": false,
  "createHeader": false,
  "useWorker": false,
  "typeParam": false,
  "designAddHead": false,
  "headDesignName": "random",
  "headDesign": false,
  "functionWideNum": 12
},
"fileheader.cursorMode": {
  "description  ": "",
  "param  ": "",
  "return ": ""
},
"fileheader.customMade": {
  "Descripttion": "",
  "version": "",
  "Author": "<YOUR NAME>",
  "Date": "Do not edit",
  "LastEditTime": "Do not Edit",
}
```