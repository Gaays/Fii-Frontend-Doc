var EcosystemNav = [
  {
    textEN: '项目',
    textES: 'Repositorios',
    textZH: '项目',
    items: [
      {
        text: 'vue-element-admin',
        link: 'https://github.com/PanJiaChen/vue-element-admin'
      },
      {
        text: 'vue-admin-template',
        link: 'https://github.com/PanJiaChen/vue-admin-template'
      },
    ]
  },
  {
    textEN: 'Help',
    textES: 'Ayuda',
    textZH: '帮助',
    items: [
      {
        textZH: '常见问题',
        link: '/guide/other/faq.md',
        type: 'ZH'
      },
      {
        text: 'Changelog',
        textES: 'Registro de cambios',
        textZH: '更新记录',
        link: 'https://github.com/PanJiaChen/vue-element-admin/releases'
      }
    ]
  }
]

var BackendNav = [
  {
    text: 'Backend',
    textES: 'Backend',
    textZH: '后端整合',
    items: [
      {
        text: 'Java backend integration',
        textES: 'Java backend integration',
        textZH: 'Java 后端整合',
        link:
          'https://store.akveo.com/products/vue-java-admin-dashboard-spring?utm_campaign=akveo_store-Vue-Vue_demo%2Fgithub&utm_source=vue_admin&utm_medium=referral&utm_content=vue_featires'
      }
    ]
  }
]

var ComponentNav = [
  {
    text: '组件',
    textES: 'Componente',
    textZH: '组件',
    items: [
      {
        text: '富文本',
        textES: 'Editor de Texto Enriquecido',
        textZH: '富文本',
        link: '/feature/component/rich-editor.md'
      },
      {
        text: 'Markdown 编辑器',
        textES: 'Editor de Markdown',
        textZH: 'Markdown 编辑器',
        link: '/feature/component/markdown-editor.md'
      },
      {
        text: 'Svg Icon 图标',
        textES: 'Icono Svg',
        textZH: 'Svg Icon 图标',
        link: '/feature/component/svg-icon.md'
      },
      {
        text: '复制粘贴',
        textES: 'Portapapeles',
        textZH: '复制粘贴',
        link: '/feature/component/clipboard.md'
      },
      {
        text: 'Excel',
        textZH: 'Excel',
        link: '/feature/component/excel.md'
      },
      {
        text: 'Pagination 分页',
        textES: 'Paginación',
        textZH: 'Pagination 分页',
        link: '/feature/component/pagination.md'
      },
      {
        text: 'Tree Table 树形表格',
        textES: 'Tabla de Árbol',
        textZH: 'Tree Table 树形表格',
        link: '/feature/component/tree-table.md'
      }
    ]
  },
  {
    text: 'Script',
    items: [
      {
        text: 'Svgo',
        link: '/feature/script/svgo.md'
      },
      {
        text: 'New',
        textES: 'Nuevo',
        link: '/feature/script/new.md'
      }
    ]
  }
]

module.exports = {
  EcosystemNav,
  ComponentNav,
  BackendNav
}
