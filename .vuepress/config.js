// .vuepress/config.js

const getSidebar = require('./get_sidebar.js');


module.exports = {
  base: process.env.BRANCH_NAME ? "/"+process.env.BRANCH_NAME+"/" : '/px4_user_guide/',
  patterns : ['README.md',
      'en/**/*.md',
      'zh/**/*.md',
      'ko/**/*.md',
      // 'de/**/*.md',
      // 'ja/**/*.md',
      // 'ru/**/*.md',
      '!**/node_modules' 
      ], 

  plugins: ['@vuepress/medium-zoom',
      ['vuepress-plugin-redirect', 
      {
        // provide i18n redirection
        // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
        locales: true,
      }],
      '@vuepress/back-to-top',
      [
      'vuepress-plugin-right-anchor',
      {
        expand: {
          default: false,
          trigger: 'click'
        },
      }
      ],
      ['@vuepress/google-analytics',
        {
        'ga': 'UA-33658859-3'
        }
      ]
  ],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/en/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'PX4 User Guide',
      description: 'PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.'
    },
    '/ko/': {
      lang: 'ko-KR', // this will be set as the lang attribute on <html>
      title: 'PX4 오토파일럿 사용자 설명서',
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
    logo: '/logo_pro_small.png',
    
    // Assumes GitHub. Can also be a full GitLab url.
    //repo: 'PX4/Firmware',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    //repoLabel: 'Contribute!',
    lastUpdated: 'Last Updated', // string | boolean
    // lastUpdated: false, // This might be enabled to speed up builds

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
      //English
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
          {
            text: 'PX4',
            ariaLabel: 'PX4 Menu',
            items: [
              { text: 'Website', link: 'http://px4.io/', ariaLabel: 'PX4 website link'  },
              { text: 'Support', link: 'http://discuss.px4.io/' , ariaLabel: 'Support/Discussion link' },
              { text: 'Developer Guide', link: 'https://dev.px4.io/master/en/', ariaLabel: 'PX4 Developer Guide' },
              { text: 'Autopilot Source Code', link: 'https://github.com/PX4/PX4-Autopilot', ariaLabel: 'Source code for PX4 autopilot' },
              { text: 'Docs Source Code', link: 'https://github.com/PX4/PX4-user_guide', ariaLabel: 'Source code for PX4 user guide documentation' },
            ]
          },
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
          {
            text: 'Version',
            ariaLabel: 'Versions Menu',
            items: [
              { text: 'master', link: '/' },
              { text: 'v1.11', link: 'https://docs.px4.io/v1.11/en/' },
              { text: 'v1.10', link: 'https://docs.px4.io/v1.10/en/' },
              { text: 'v1.9', link: 'https://docs.px4.io/v1.9.0/en/' },
              { text: 'v1.8', link: 'https://docs.px4.io/v1.8.2/en/' },
              
            ]
          },
          
        ],
        sidebar: {
          '/en/': getSidebar.sidebar('en')
        }
      },
      
      //Korean
      '/ko/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: '한국어 (Korean)',
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
          {
            text: 'PX4',
            ariaLabel: 'PX4 Menu',
            items: [
              { text: 'Website', link: 'http://px4.io/', ariaLabel: 'PX4 website link'  },
              { text: 'Support', link: 'http://discuss.px4.io/' , ariaLabel: 'Support/Discussion link' },
              { text: 'Developer Guide', link: 'https://dev.px4.io/master/en/', ariaLabel: 'PX4 Developer Guide' },
              { text: 'Autopilot Source Code', link: 'https://github.com/PX4/PX4-Autopilot', ariaLabel: 'Source code for PX4 autopilot' },
              { text: 'Docs Source Code', link: 'https://github.com/PX4/PX4-user_guide', ariaLabel: 'Source code for PX4 user guide documentation' },
            ]
          },
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
          {
            text: 'Version',
            ariaLabel: 'Versions Menu',
            items: [
              { text: 'master', link: '/' },
              { text: 'v1.11', link: 'https://docs.px4.io/v1.11/en/' },
              { text: 'v1.10', link: 'https://docs.px4.io/v1.10/en/' },
              { text: 'v1.9', link: 'https://docs.px4.io/v1.9.0/en/' },
              { text: 'v1.8', link: 'https://docs.px4.io/v1.8.2/en/' },
              
            ]
          },
          
        ],
        sidebar: {
          '/ko/': getSidebar.sidebar('ko')
        }
      },
      
      //Chinese
      '/zh/': {
        selectText: '选择语言',
        label: '中文 (Chinese)',
        editLinkText: '在 GitHub 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        nav: [
          {
            text: 'PX4',
            ariaLabel: 'PX4 Menu',
            items: [
              { text: 'Website', link: 'http://px4.io/', ariaLabel: 'PX4 website link'  },
              { text: 'Support', link: 'http://discuss.px4.io/' , ariaLabel: 'Support/Discussion link' },
              { text: 'Developer Guide', link: 'https://dev.px4.io/master/en/', ariaLabel: 'PX4 Developer Guide' },
              { text: 'Autopilot Source Code', link: 'https://github.com/PX4/PX4-Autopilot', ariaLabel: 'Source code for PX4 autopilot' },
              { text: 'Docs Source Code', link: 'https://github.com/PX4/PX4-user_guide', ariaLabel: 'Source code for PX4 user guide documentation' },
            ]
          },
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
          {
            text: 'Version',
            ariaLabel: 'Versions Menu',
            items: [
              { text: 'master', link: '/' },
              { text: 'v1.11', link: 'https://docs.px4.io/v1.11/zh/' },
              { text: 'v1.10', link: 'https://docs.px4.io/v1.10/zh/' },
              { text: 'v1.9', link: 'https://docs.px4.io/v1.9.0/en/' },
              { text: 'v1.8', link: 'https://docs.px4.io/v1.8.2/en/' },
              
            ]
          },
        ],
        algolia: {},
        sidebar: {
          '/zh/': getSidebar.sidebar('zh')
        }
      }
    }
    
  }
}

