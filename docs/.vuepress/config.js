var nav = require('./nav.js')
var { EcosystemNav, ComponentNav, BackendNav } = nav

var utils = require('./utils.js')
var { genNav, getComponentSidebar, deepClone } = utils

module.exports = {
  title: 'Fii-Frontend-Doc',
  description: 'A magical vue admin',
  base: '/fii-frontend-doc/',
  dest: './public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  cache:false,
  themeConfig: {
    docsDir: 'docs',
    sidebarDepth: 3,
    search: true,
    searchMaxSuggestions: 10,
    nav: [
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '功能',
        items: genNav([...deepClone(ComponentNav)])
      },
      {
        text: '生态系统',
        items: genNav(deepClone(EcosystemNav))
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: genEssentialsSidebar()
        },
        {
          title: '进阶',
          collapsable: false,
          children: genAdvancedSidebar()
        },
        {
          title: '其它',
          collapsable: false,
          children: [
            '/guide/other/feature.md',
            '/guide/other/faq.md',
            '/guide/other/release-notes.md'
          ]
        }
      ],
      '/feature/component/': getComponentSidebar(
        deepClone(ComponentNav)
      ),
      '/feature/script/': [
        '/feature/script/svgo.md',
        '/feature/script/new.md'
      ]
    }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      description: 'A magical vue admin'
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  },
  ga: 'UA-109340118-1'
}

function genEssentialsSidebar(type = '') {
  const mapArr = [
    '/guide/',
    '/guide/essentials/quick-start.md',
    '/guide/essentials/layout.md',
    '/guide/essentials/router-and-nav.md',
    '/guide/essentials/permission.md',
    '/guide/essentials/tags-view.md',
    '/guide/essentials/new-page.md',
    '/guide/essentials/style.md',
    '/guide/essentials/server.md',
    '/guide/essentials/mock-api.md',
    '/guide/essentials/import.md',
    '/guide/essentials/deploy.md',
    '/guide/essentials/env.md',
  ]
  return mapArr.map(i => {
    return type + i
  })
}

function genAdvancedSidebar(type = '') {
  const mapArr = [
    '/guide/advanced/cors.md',
    '/guide/advanced/eslint.md',
    '/guide/advanced/git-hook.md',
    '/guide/advanced/style-guide.md',
    '/guide/advanced/lazy-loading.md',
    '/guide/advanced/chart.md',
    '/guide/advanced/icon.md',
    '/guide/advanced/cdn.md',
    '/guide/advanced/theme.md',
    '/guide/advanced/i18n.md',
    '/guide/advanced/error.md',
    '/guide/advanced/webpack.md',
    '/guide/advanced/sass.md'
  ]
  return mapArr.map(i => {
    return type + i
  })
}