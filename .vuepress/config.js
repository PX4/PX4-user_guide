// .vuepress/config.js

const getSidebar = require("./get_sidebar.js");

module.exports = {
  base: process.env.BRANCH_NAME
    ? "/" + process.env.BRANCH_NAME + "/"
    : "/px4_user_guide/",
  patterns: [
    "README.md",
    "en/**/*.md",
    "zh/**/*.md",
    "ko/**/*.md",
    // 'de/**/*.md',
    // 'ja/**/*.md',
    // 'ru/**/*.md',
    "!**/node_modules",
    "!**/scripts",
  ],
  markdown: {
    // options for markdown-it-toc (youtube video)
    video: {},
    extendMarkdown: (md) => {
      // use more markdown-it plugins!
      md.use(require("markdown-it-video"));
    },
  },
  plugins: [
    "@vuepress/medium-zoom",
    [
      "check-md",
      {
        pattern: "en/**/*.md",
      },
    ],
    [
      "container",
      {
        type: "note",
        defaultTitle: {
          "/zh/": "注解",
          "/en/": "Note",
          "/": "Note",
        },
      },
    ],
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
    [
      "vuepress-plugin-redirect",
      {
        // provide i18n redirection
        // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
        locales: true,
      },
    ],
    "@vuepress/back-to-top",
    [
      "vuepress-plugin-right-anchor",
      {
        expand: {
          default: false,
          trigger: "click",
        },
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-33658859-3",
      },
    ],
  ],
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/en/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "PX4 User Guide (v1.13)",
      description:
        "PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.",
    },
    "/ko/": {
      lang: "ko-KR", // this will be set as the lang attribute on <html>
      title: "PX4 오토파일럿 사용자 설명서 (v1.13)",
      description:
        "PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "PX4 自动驾驶用户指南 (v1.13)",
      description:
        "PX4 is the Professional Autopilot. Developed by world-class developers from industry and academia, and supported by an active world wide community, it powers all kinds of vehicles from racing and cargo drones through to ground vehicles and submersibles.",
    },
  },
  themeConfig: {
    px4_version: "v1.13",
    sidebarDepth: 0, //change to 1 if decide to use vuepress-plugin-right-anchor
    logo: "/px4-logo.svg",
    searchMaxSuggestions: 10,
    // Assumes GitHub. Can also be a full GitLab url.
    //repo: 'PX4/Firmware',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    //repoLabel: 'Contribute!',
    lastUpdated: "Last Updated", // string | boolean
    // lastUpdated: false, // This might be enabled to speed up builds

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: "PX4/PX4-user_guide",
    // if your docs are not at the root of the repo:
    //docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'main'):
    docsBranch: "main",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!",

    locales: {
      //English
      "/en/": {
        // text for the language dropdown
        selectText: "Languages",
        // label for this locale in the language dropdown
        label: "English",
        // Aria Label for locale in the dropdown
        ariaLabel: "Languages",
        // text for the edit-on-github link
        editLinkText: "Edit this page on GitHub",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
        // algolia docsearch options for current locale
        algolia: process.env.BRANCH_NAME
          ? {
              appId: "HHWW7I44JO",
              apiKey: "48919e1dffc6e0ce4c0d6331343d2c0e",
              indexName: "px4",
              algoliaOptions: {
                hitsPerPage: 10,
                facetFilters: [`version:${process.env.BRANCH_NAME}`],
              },
            }
          : {},
        //algolia: process.env.BRANCH_NAME ? {apiKey: 'c944f3489b25a87a95e33d9386025057',indexName: 'px4'} : {} ,
        nav: [
          {
            text: "PX4",
            ariaLabel: "PX4 Menu",
            items: [
              {
                text: "Website",
                link: "https://px4.io/",
                ariaLabel: "PX4 website link",
              },
              {
                text: "Support",
                link: "https://docs.px4.io/main/en/contribute/support.html",
                rel: false,
                target: "_self",
                ariaLabel: "Support information",
              },
              {
                text: "Autopilot Source Code",
                link: "https://github.com/PX4/PX4-Autopilot",
                ariaLabel: "Source code for PX4 autopilot",
              },
              {
                text: "Docs Source Code",
                link: "https://github.com/PX4/PX4-user_guide",
                ariaLabel: "Source code for PX4 user guide documentation",
              },
            ],
          },
          {
            text: "QGroundControl",
            link: "http://qgroundcontrol.com/",
            ariaLabel: "QGC",
          },
          {
            text: "MAVSDK",
            link: "https://mavsdk.mavlink.io/",
            ariaLabel: "MAVSDK",
          },
          {
            text: "MAVLINK",
            link: "https://mavlink.io/en/",
            ariaLabel: "MAVLINK site",
          },
          {
            text: "Docs",
            ariaLabel: "Documentation Menu",
            items: [
              {
                text: "QGroundControl User Guide",
                link: "https://docs.qgroundcontrol.com/en/",
              },
              {
                text: "QGroundControl Developer Guide",
                link: "https://dev.qgroundcontrol.com/en/",
              },
              { text: "MAVLink Guide", link: "https://mavlink.io/en/" },
              { text: "MAVSDK", link: "https://mavsdk.mavlink.io/" },
              {
                text: "Dronecode Camera Manager",
                link: "https://camera-manager.dronecode.org/en/",
              },
            ],
          },

          {
            text: "Support",
            link: "https://docs.px4.io/main/en/contribute/support.html",
            rel: false,
            target: "_self",
            ariaLabel: "Support information",
          },
          {
            text: "Version",
            ariaLabel: "Versions Menu",
            items: [
              { text: "main", link: "https://docs.px4.io/main/en/" },
              { text: "v1.16", link: "https://docs.px4.io/v1.16/en/" },
              { text: "v1.15", link: "https://docs.px4.io/v1.15/en/" },
              { text: "v1.14", link: "https://docs.px4.io/v1.14/en/" },
              { text: "v1.13", link: "https://docs.px4.io/v1.13/en/" },
              { text: "v1.12", link: "https://docs.px4.io/v1.12/en/" },
            ],
          },
        ],
        sidebar: {
          "/en/": getSidebar.sidebar("en"),
        },
      },

      //Korean
      "/ko/": {
        // text for the language dropdown
        selectText: "Languages",
        // label for this locale in the language dropdown
        label: "한국어 (Korean)",
        // Aria Label for locale in the dropdown
        ariaLabel: "Languages",
        // text for the edit-on-github link
        editLinkText: "Edit this page on GitHub",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
        // algolia docsearch options for current locale
        //algolia: process.env.BRANCH_NAME ? {apiKey: 'c944f3489b25a87a95e33d9386025057',indexName: 'px4'} : {} ,
        // algolia docsearch options for current locale
        algolia: process.env.BRANCH_NAME
          ? {
              appId: "HHWW7I44JO",
              apiKey: "48919e1dffc6e0ce4c0d6331343d2c0e",
              indexName: "px4",
              algoliaOptions: {
                hitsPerPage: 10,
                facetFilters: [`version:${process.env.BRANCH_NAME}`],
              },
            }
          : {},
        nav: [
          {
            text: "PX4",
            ariaLabel: "PX4 Menu",
            items: [
              {
                text: "Website",
                link: "https://px4.io/",
                ariaLabel: "PX4 website link",
              },
              {
                text: "Support",
                link: "/contribute/support.md",
                ariaLabel: "Support information",
              },
              {
                text: "Autopilot Source Code",
                link: "https://github.com/PX4/PX4-Autopilot",
                ariaLabel: "Source code for PX4 autopilot",
              },
              {
                text: "Docs Source Code",
                link: "https://github.com/PX4/PX4-user_guide",
                ariaLabel: "Source code for PX4 user guide documentation",
              },
            ],
          },
          {
            text: "QGroundControl",
            link: "http://qgroundcontrol.com/",
            ariaLabel: "QGC",
          },
          {
            text: "MAVSDK",
            link: "https://mavsdk.mavlink.io/",
            ariaLabel: "MAVSDK",
          },
          {
            text: "MAVLINK",
            link: "https://mavlink.io/en/",
            ariaLabel: "MAVLINK site",
          },
          {
            text: "Docs",
            ariaLabel: "Documentation Menu",
            items: [
              {
                text: "QGroundControl User Guide",
                link: "https://docs.qgroundcontrol.com/en/",
              },
              {
                text: "QGroundControl Developer Guide",
                link: "https://dev.qgroundcontrol.com/en/",
              },
              { text: "MAVLink Guide", link: "https://mavlink.io/en/" },
              { text: "MAVSDK", link: "https://mavsdk.mavlink.io/" },
              {
                text: "Dronecode Camera Manager",
                link: "https://camera-manager.dronecode.org/en/",
              },
            ],
          },

          {
            text: "Support",
            link: "/contribute/support.md",
            ariaLabel: "Support information",
          },
          {
            text: "Version",
            ariaLabel: "Versions Menu",
            items: [
              { text: "main", link: "https://docs.px4.io/main/ko/" },
              { text: "v1.15", link: "https://docs.px4.io/v1.15/ko/" },
              { text: "v1.14", link: "https://docs.px4.io/v1.14/ko/" },
              { text: "v1.13", link: "https://docs.px4.io/v1.13/ko/" },
              { text: "v1.12", link: "https://docs.px4.io/v1.12/ko/" },
            ],
          },
        ],
        sidebar: {
          "/ko/": getSidebar.sidebar("ko"),
        },
      },

      //Chinese
      "/zh/": {
        selectText: "选择语言",
        label: "中文 (Chinese)",
        editLinkText: "在 GitHub 上编辑此页",
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
          },
        },
        // algolia docsearch options for current locale
        //algolia: process.env.BRANCH_NAME ? {apiKey: 'c944f3489b25a87a95e33d9386025057',indexName: 'px4'} : {} ,
        algolia: process.env.BRANCH_NAME
          ? {
              appId: "HHWW7I44JO",
              apiKey: "48919e1dffc6e0ce4c0d6331343d2c0e",
              indexName: "px4",
              algoliaOptions: {
                hitsPerPage: 10,
                facetFilters: [`version:${process.env.BRANCH_NAME}`],
              },
            }
          : {},
        nav: [
          {
            text: "PX4",
            ariaLabel: "PX4 Menu",
            items: [
              {
                text: "Website",
                link: "https://px4.io/",
                ariaLabel: "PX4 website link",
              },
              {
                text: "Support",
                link: "/contribute/support.md",
                ariaLabel: "Support information",
              },
              {
                text: "Autopilot Source Code",
                link: "https://github.com/PX4/PX4-Autopilot",
                ariaLabel: "Source code for PX4 autopilot",
              },
              {
                text: "Docs Source Code",
                link: "https://github.com/PX4/PX4-user_guide",
                ariaLabel: "Source code for PX4 user guide documentation",
              },
            ],
          },
          {
            text: "QGroundControl",
            link: "http://qgroundcontrol.com/",
            ariaLabel: "QGC",
          },
          {
            text: "MAVSDK",
            link: "https://mavsdk.mavlink.io/",
            ariaLabel: "MAVSDK",
          },
          {
            text: "MAVLINK",
            link: "https://mavlink.io/en/",
            ariaLabel: "MAVLINK site",
          },
          {
            text: "Docs",
            ariaLabel: "Documentation Menu",
            items: [
              {
                text: "QGroundControl User Guide",
                link: "https://docs.qgroundcontrol.com/en/",
              },
              {
                text: "QGroundControl Developer Guide",
                link: "https://dev.qgroundcontrol.com/en/",
              },
              { text: "MAVLink Guide", link: "https://mavlink.io/en/" },
              { text: "MAVSDK", link: "https://mavsdk.mavlink.io/" },
              {
                text: "Dronecode Camera Manager",
                link: "https://camera-manager.dronecode.org/en/",
              },
            ],
          },
          {
            text: "Support",
            link: "/contribute/support.md",
            ariaLabel: "Support information",
          },
          {
            text: "Version",
            ariaLabel: "Versions Menu",
            items: [
              { text: "main", link: "https://docs.px4.io/main/zh/" },
              { text: "v1.15", link: "https://docs.px4.io/v1.15/zh/" },
              { text: "v1.14", link: "https://docs.px4.io/v1.14/zh/" },
              { text: "v1.13", link: "https://docs.px4.io/v1.13/zh/" },
              { text: "v1.12", link: "https://docs.px4.io/v1.12/zh/" },
            ],
          },
        ],
        sidebar: {
          "/zh/": getSidebar.sidebar("zh"),
        },
      },
    },
  },
};
