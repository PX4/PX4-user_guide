// .vuepress/config.js

const getSidebar = require('./get_sidebar.js');


module.exports = {
  base:'/px4_user_guide/',
  patterns : ['README.md','en/**/*.md','zh/**/*.md', '**/*.vue', '!**/node_modules' ], //only english, chinese at moment
  //patterns : ['README.md','en/**/*.md', '**/*.vue', '!**/node_modules' ], //only english
  plugins: ['@vuepress/medium-zoom',
      ['vuepress-plugin-redirect', 
      {
        // provide i18n redirection
        // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
        locales: true,
      }],
      '@vuepress/back-to-top',
      'vuepress-plugin-right-anchor', //This is actually "right side page TOC"
      ],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/en/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'PX4 User Guide',
      description: 'PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'PX4 自动驾驶用户指南',
      description: 'PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.'
    }
  },
  themeConfig: {
    px4_version: 'master',
    sidebarDepth:0,  //change to 1 if decide to use vuepress-plugin-right-anchor
    
    
    // Assumes GitHub. Can also be a full GitLab url.
    //repo: 'PX4/Firmware',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    //repoLabel: 'Contribute!',
    lastUpdated: 'Last Updated', // string | boolean

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'PX4/px4_user_guide',
    // if your docs are not at the root of the repo:
    //docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',

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
          { text: 'PX4', link: 'http://px4.io/' , ariaLabel: 'PX4 Site' },
          { text: 'QGroundControl', link: 'http://qgroundcontrol.com/' , ariaLabel: 'QGC' },
          { text: 'MAVSDK', link: 'https://www.dronecode.org/sdk/' , ariaLabel: 'MAVSDK' },
          { text: 'MAVLINK', link: 'https://mavlink.io/en/' , ariaLabel: 'MAVLINK site' },
          {
            text: 'Docs',
            ariaLabel: 'Documentation Menu',
            items: [
              { text: 'PX4 Developer Guide', link: 'https://dev.px4.io/master/en/' },
              { text: 'QGroundControl User Guide', link: 'https://docs.qgroundcontrol.com/en/' },
              { text: 'QGroundControl Developer Guide', link: 'https://dev.qgroundcontrol.com/en/' },
              { text: 'MAVLink Guide', link: 'https://mavlink.io/en/' },
              { text: 'MAVSDK', link: 'https://mavsdk.mavlink.io/' },
              { text: 'Dronecode Camera Manager', link: 'https://camera-manager.dronecode.org/en/' },    
              
            ]
          },
      
          { text: 'Support', link: 'http://discuss.px4.io/' , ariaLabel: 'Support' },
        ],
        sidebar: {
          '/en/': getSidebar.sidebar('en')
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
          { text: 'PX4', link: 'http://px4.io/' , ariaLabel: 'PX4 Site' },
          { text: 'QGroundControl', link: 'http://qgroundcontrol.com/' , ariaLabel: 'QGC' },
          { text: 'MAVSDK', link: 'https://www.dronecode.org/sdk/' , ariaLabel: 'MAVSDK' },
          { text: 'MAVLINK', link: 'https://mavlink.io/en/' , ariaLabel: 'MAVLINK site' },
          { text: 'Docs', link: 'https://www.dronecode.org/documentation/' , ariaLabel: 'Docs' },
          { text: 'Support', link: 'http://discuss.px4.io/' , ariaLabel: 'Support' },
        ],
        algolia: {},
        sidebar: {
          '/zh/': getSidebar.sidebar('zh')
        }
      }
    }
    
  }
}



