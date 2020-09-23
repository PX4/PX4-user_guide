// .vuepress/config.js

const englishSidebar = require('./english_sidebar.js');


module.exports = {
  base:'/px4_vuepress/',
  patterns : ['README.md','en/**/*.md','zh/**/*.md', '**/*.vue', '!**/node_modules' ], //only english, chinese at moment
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/en/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'PX4 User Guide',
      description: 'A wonderful descripption'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'PX4 User Guide',
      description: 'PX4 User Guide description'
    }
  },
  themeConfig: {
    px4_version: 'master',
    locales: {
      '/en/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},
        nav: [
          { text: 'Nested', link: '/nested/' , ariaLabel: 'Nested' }
        ],
        sidebar: {
          '/en/': englishSidebar.sidebar()
        }
      },
      
      
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        nav: [
          { text: '嵌套', link: '/zh/nested/' }
        ],
        algolia: {},
        sidebar: {
          '/zh/': 
              [
              ['/zh/','PX4 自动驾驶用户指南']
              ],
        }
      }
    }
    
  }
}



