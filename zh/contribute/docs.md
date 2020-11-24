# 投稿指南

非常欢迎大家给Dronecode项目的相关指南积极投稿。 Contributions to the guides for all parts of the Dronecode project are very welcome. This includes the PX4 and QGroundControl developer and user guides, and the MAVLink guide. This article explains how you can make changes, add content, and create translations. 本篇章用来向投稿者们解释如何对项目指南进行更改、添加内容和创建翻译。

> **Note** You will need a (free) [Github](http://github.com) account to contribute to the guide.

## 快速更改

Fixing typos or editing an *existing page* is easy:
1. 点击指南相关页面顶部的工具栏图标**Edit**。

   ![Gitbook: 编辑页面按钮](../../assets/vuepress/vuepress_toolbar_icon_edit.png)

   打开编辑页面(Github)。
1. 进行修改。
1. At the bottom of the page you'll be prompted to create a separate branch and then guided to submit a *pull request*.

The documentation team reviews submitted pull requests and will either merge it or work with you to update it.

> **Note** If you want to add new pages or images, then you will need to work through the git tool rather than github. Often you will want to build the library using the vuepress toolchain to test your changes.

## Adding New Content - Big Changes

If you want to add new pages or images that can't easily be done through the Github interface. In this case you make changes in the same way as you would for *code* changes:
1. The *Developer Guide* is for documentation that is relevant to *software developers*. This includes users who need to:
1. Modify it as needed (add, change, delete).
1. Test that it renders properly using the Gitbook client
1. In order to contribute many changes to the documentation, it is recommended that you follow these steps to add the changes locally and then create a pull request:

更改请求可以使用 [Gitbook 编辑器](https://gitbookio.gitbooks.io/documentation/content/editor/index.html) 在 Gitbook 网站上完成，也可以在本地完成(更灵活，但用户友好度欠佳)。 Most of these instructions cover the local setup.

### What Goes Where?

The guide uses the [Gitbook](https://www.gitbook.com/about) toolchain. Change requests can be either done on the Gitbook website using the [Gitbook editor](https://gitbookio.gitbooks.io/documentation/content/editor/index.html) or locally (more flexible, but less user-friendly).

*开发者指南*是与*软件开发者相关的文档*。 使用者的需求为：
* 添加或修改软件平台功能，如模块、飞行模式等。
* 添加新硬件支持/集成，如飞行控制器、外围、机型等。
* 从外部源与平台通信，例如一个配套的计算机。
* 了解软件架构

The *User Guide*, by contrast, is *primarily* for users who want to:
* 使用 PX4 控制飞行器
* 使用 PX4，基于已支持/现存的机型，构建、修改或配置类似载具。

> **Note** Everything you need to install and build Gitbook locally is also explained in the [toolchain documentation](https://toolchain.gitbook.com/setup.html).

### Gitbook Documentation Toolchain

To get the library(s) sources onto your local computer you will need to use the git toolchain. The instructions below explain how to get git and use it on your local computer.

1. git add &lt;file name&gt; git commit -m "&lt;your commit message&gt;"
1. 如果您还没有注册Github，请先[注册](https://github.com/join) Github 账户
1. Create a copy (Fork) of the desired library on Github ([instructions here](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository)). The library repo URLs are:
   - cd ~/wherever/px4_user_guide git remote add upstream https://github.com/PX4/px4_user_guide.git
   - Fork the PX4 user guide from [here](https://github.com/PX4/px4_user_guide) or Dev guide from [here](https://github.com/PX4/Devguide). For instructions to fork a git repository, see [here](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository).
   - Clone your forked repository to your local computer
   - MAVLink Developer Guide: https://github.com/mavlink/mavlink-devguide
1. Navigate to your local repository and add original upstream:
   ```sh
   cd ~/wherever/
git clone https://github.com/<your git name>/px4_user_guide.git
   ```
   For example, to clone the PX4 userguide fork for a user with github account "john_citizen_smith":
   ```sh
   git clone https://github.com/john_citizen_smith/px4_user_guide.git
   ```
1. Navigate to your local repository (px4_user_guide is used below):
   ```sh
   cd ~/wherever/px4_user_guide   
   ```
1. Add a *remote* called "upstream" to point to the original library. The exmaple below shows how to do this for the user guide (note the URL format - it is the repo URL with extension ".git").
   ```sh
   You can verify that the push was successful by going to your forked repository in your browser: <code>https://github.com/<your git name>/px4_user_guide.git</code><br x-id="2" />
  There you should see the message that a new branch has been pushed to your forked repository.
   ```
  
   There you should see the message that a new branch has been pushed to your forked repository.
   </code>

   > **Tip** A "remote" is a handle to a particular repository. The remote named *origin* is created by default when you clone the repository, and points to your fork of the guide. You want to create a new remote *upstream* that points to the official version of the document.
1. Now you can checkout a new branch and add your changes. To build your book, run:
   ```sh
   git push origin <your feature branch name>
   ```
   This creates a local branch on your computer named `your_feature_branch_name`.
1. Make changes to the documentation as needed (general guidance on this in following sections)
1. Once you are satisfied with your changes after previewing them, you can add and commit them:
   ```sh
   git add <file name>
   git commit -m "<your commit message>"
   ```
   需进一步了解提交信息, 请参阅 [Contributing](../contribute/README.md) 部分。
1. Now you can push your local commits to your forked repository
   ```sh
   git push origin your_feature_branch_name
   ```
1. Go to your forked repository on Github in a web browser, e.g.: `https://github.com/<your git name>/px4_user_guide.git`. 您应该会看到一条告知消息：一个新分支已被推送到您的分支版本库。
1. Create a pull request (PR):
   - Now it's time to create a pull request (PR). On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Then it should list your changes and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/px4_user_guide/pulls) for comparison) Press it.
   - A pull request template will be created. It will list your commits and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. 检查 [其他拉取请求 ](https://github.com/PX4/px4_user_guide/pulls) 进行比较)。
1. 搞定！ You're done! Responsible members of PX4 guides will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while. 每过一段时间，他们会检查你的更改，以确保没有疑义。

### Source Code Structure

指南使用 [旧版Gitbook 工具链](https://legacy.gitbook.com/) Instructions for how this toolchain is setup and used can be found in the [toolchain documentation](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md).

概述：

* 用多个单独文件编写的页面，使用 markdown \(与Github wiki中的语法几乎一致\)。
* The *structure* of the book is defined in a file named **SUMMARY.md**. If you add a new page to the library you must add an entry to this file.
* This is a [multilingual](https://toolchain.gitbook.com/languages.html) book, so there is a **LANGS.md** file in the root directory defining what languages are supported. Pages for each language are stored in the folder named for the associated language code \(e.g. "zh" for Chinese, "en" for English\).
  - 每种语言的页面都存储在用相关语言代码命名的文件夹\(例如，中文的“zh”、 英文的“en”\)。
  - You should only ever edit the ENGLISH version of files. We use translation software to manage the other trees.
* Images must be stored in a sub folder of **/assets**. This is two folders down from content folders, so if you add an image you will reference it like:
  ```
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```
* 一个名为**book.json**的文件定义了此构建的所有依赖关系。
* 网络钩子会被用来跟踪是否有文件合并到此版本库上的主分支，如果有，卷册将重新构建。

### 文档规范指南

1. 文件/文件名

   * 将新文件放入相应的子文件夹
   * 使用描述性名称。 Use descriptive names. In particular, image filename should describe what they contain.
   * 命名中使用小写，并用下划线"\_"分割单词

2. 图片

   * 使用能保证图像使用价值的最小尺寸和最小分辨率。
   * New images should be created in a sub-folder of **/assets/** by default (so they can be shared between translations).

3. 内容:

   * 始终如一地使用 "样式" (如bold, emphasis等) Use "style" \(bold, emphasis, etc\) consistently. **Bold** for button presses and menu definitions. *Emphasis* for tool names. Otherwise use as little as possible. 工具名称，请使用样式_Emphasis_。 其他情况，尽量少用样式。
   * 标题和页面标题应该遵从"第一字母大写"
   * 页面标题应该是一级标题 。 The page title should be a first level heading \(\#\). All other headings should be h2 \(\#\#\) or lower.
   * 不要在标题中添加任何样式。
   * Don't translate the *first part* of a note, tip or warning declaration (e.g. `> **Note**`) as this precise text is required to render the note properly.

### Building the Gitbook Locally

Install gitbook via NPM. At the terminal prompt, simply run the following command to install GitBook:

1. Install nodejs on your computer (version 4-6 recommended).
1. 通过 NPM 安装 gitbook。 在终端提示下，只需运行以下命令即可安装 GitBook：
   ```sh
   npm install gitbook-cli -g
   ```
1. Navigate to your local repository:
   ```sh
   cd ~/wherever/px4_user_guide
   ```
1 Install gitbook dependencies:
  ```sh
  gitbook install
  ```

  > **Note** 如果遇到报错: `/usr/bin/env: node：No such file or directory`, 请运行 `ln -s /usr/bin/nodejs /usr/bin/node`

1. Build your book:
   ```sh
   gitbook build
   ```
1. 要预览并服务您的卷册，请运行：
  ```sh
  gitbook serve
  ```
  * 现在您可以在 http://localhost:4000/ 上浏览您的本地卷册
  * 在终端提示中使用`CTRL+c`退出。
1. 除了端口4000，您也可以在另一个端口上作业：
   ```sh
   gitbook serve --port 4003
   ```
1. 您也可以以 html 、pdf、epub 或 mobi 格式输出：
   ```sh
   gitbook help
   ```

<a id="translation"></a>

## 翻译

We'd love your help to translate *QGroundControl* and our guides for PX4, *QGroundControl* and MAVLink. For more information see: [Translation](../contribute/translation.md). 更多信息请参见：[Translation](../contribute/translation.md)。

## 许可证

All PX4/Dronecode documentation is free to use and modify under terms of the permissive [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence.
