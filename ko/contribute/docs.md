# 문서화에 기여

PX4 사용자 가이드에 대한 기여를 매우 환영합니다. 간단한 수정 작업 뿐만 아니라, 철자 및 문법, 새로운 주제 등에서 문서화 작업이 필요합니다.

이 항목에서는 변경 사항을 적용하고 테스트하는 방법을 설명합니다. 마지막에는 기본 스타일 가이드가 있습니다.

::: tip
Note 가이드에 기여하려면 [Github](http://github.com) 계정이 필요합니다.
:::

<a id="github_changes" ></a>

## Github의 빠른 변경 사항

모든 페이지 하단에 표시되는 **GitHub에서 이 페이지 편집** 링크를 클릭하면, *기존 콘텐츠*를 간단하게 변경할 수 있습니다(이렇게 하면 Github에서 편집용 페이지가 열립니다).

![Vuepress: Edit Page button](../../assets/vuepress/vuepress_edit_page_on_github_link.png)

기존 페이지를 편집하려면:
1. 해당 페이지를 엽니다.
1. 페이지 콘텐츠 아래에 있는 **GitHub에서 이 페이지 편집** 링크를 클릭합니다.
1. 파일을 편집합니다.
1. Github 페이지 편집기 아래에 별도의 분기를 생성하라는 메시지가 표시되고 *풀 요청*을 제출하라는 안내가 표시됩니다.

문서 팀은 요청을 검토하고, 병합하거나 업데이트하기 위하여 귀하와 협력할 것입니다.

<a id="big_changes" ></a>

## Git을 사용한 변경(새 페이지 및 이미지)

새 페이지 추가 또는 이미지 추가/수정을 포함하여 보다 실질적인 변경은 Github에서 수행(또는 적절하게 테스트)하는 것처럼 간단하지 않습니다. 이러한 변경 작업은 *코드*와 동일한 접근 방식을 사용하는 것이 좋습니다.
1. *git* 명령어를 사용하여, 문서 소스 코드를 로컬 컴퓨터로 가져옵니다.
1. 필요한 문서를 수정합니다(추가, 변경, 삭제).
1. Vuepress를 사용하여 제대로 빌드되는지 *테스트*합니다.
1. 변경 사항에 대한 분기를 만들고 풀 요청을 만들어 문서로 다시 가져옵니다.

다음에는 소스 코드를 가져오고, 로컬에서 빌드(테스트용)하고, 코드를 수정하는 방법을 설명합니다.


### 문서 소스 코드 가져오기/보내기

라이브러리 소스를 로컬 컴퓨터로 가져오려면 git 명령어를 사용하여야 합니다. 아래 지침은 git을 가져와 로컬 컴퓨터에서 사용하는 방법을 설명합니다.

1. [https://git-scm.com/downloads](https://git-scm.com/downloads)에서 git 프로그램을 다운로드합니다.
1. 아직 Github에 [가입](https://github.com/join)하지 않은 경우에는 가입합니다.
1. Github에서 [PX4 사용자 가이드 저장소](https://github.com/PX4/px4_user_guide)의 복사본(포크)을 만듭니다([지침 참고](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository)).
1. 복사된 저장소를 로컬 컴퓨터에 복제합니다.
   ```sh
   cd ~/wherever/
   git clone https://github.com/<your git name>/px4_user_guide.git
   ```
   예를 들어, Github 계정이 "john_citizen"인 사용자의 PX4 사용자 가이드 포크를 복제합니다.
   ```sh
   git clone https://github.com/john_citizen/px4_user_guide.git
   ```
1. Navigate to your local repository:
   ```sh
   cd ~/wherever/px4_user_guide   
   ```
1. Add a *remote* called "upstream" to point to the PX4 version of the library:
   ```sh
   git remote add upstream https://github.com/PX4/px4_user_guide.git
   ```

:::tip
A "remote" is a handle to a particular repository. The remote named *origin* is created by default when you clone the repository, and points to *your fork* of the guide. Above you create a new remote *upstream* that points to the PX4 project version of the documents.
:::
1. Create a branch for your changes:
   ```sh
   git checkout -b <your_feature_branch_name>
   ```
   This creates a local branch on your computer named `your_feature_branch_name`.
1. Make changes to the documentation as needed (general guidance on this in following sections)
1. Once you are satisfied with your changes, you can add them to your local branch using a "commit":
   ```sh
   git add <file name>
   git commit -m "<your commit message>"
   ```
   For a good commit message, please refer to [Contributing](../contribute/README.md) section.
1. Push your local branch (including commits added to it) to your forked repository on Github.
   ```sh
   git push origin your_feature_branch_name
   ```
1. Go to your forked repository on Github in a web browser, e.g.: `https://github.com/<your git name>/px4_user_guide.git`. There you should see the message that a new branch has been pushed to your forked repository.
1. Create a pull request (PR):
   - On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Press it.
   - A pull request template will be created. It will list your commits and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/px4_user_guide/pulls) for comparison)
1. You're done! Maintainers for the PX4 User Guide will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while.


### Gitbook Documentation Toolchain

Build the library locally to test that any changes you have made have rendered properly:
1. Install the [Vuepress prerequiresites](https://vuepress.vuejs.org/guide/getting-started.html#prerequisites):
   - [Nodejs 10+](https://nodejs.org/en/)
   - [Yarn classic](https://classic.yarnpkg.com/en/docs/install)
1. Navigate to your local repository:
   ```sh
   cd ~/wherever/px4_user_guide
   ```
1. Install dependencies (including Vuepress):
   ```sh
   yarn install
   ```
1. Preview and serve the library:
   ```sh
   yarn docs:dev
   ```
   * Now you can browse the guide on http://localhost:8080/px4_user_guide/
   * Stop serving using **CTRL+C** in the terminal prompt.
1. Build the library using:
   ```sh
   # Ubuntu
   yarn docs:build

   # Windows
   yarn docs:buildwin
   ```

::: tip
Use `yarn docs:dev` to preview changes *as you make them* (documents are updated and served very quickly). Before submitting a PR you should also build it using `docs:build`, as this can highlight issues that are not visible when using `docs:dev`.
:::

### Source Code Structure

The guide uses the [Vuepress](https://vuepress.vuejs.org/) toolchain. The PX4 User Guide has some minor differences, mostly related to configuration and setup.

In overview:

* Pages are written in separate files using markdown.
  - The syntax is almost the same as that used by the Github wiki.
  - Vuepress also supports some [markdown extensions](https://vuepress.vuejs.org/guide/markdown.html). We try and avoid using these, except for [tips, warning, etc.](https://vuepress.vuejs.org/guide/markdown.html#custom-containers).
* This is a [multilingual](https://vuepress.vuejs.org/guide/i18n.html#default-theme-i18n-config) book:
  - Pages for each language are stored in the folder named for the associated language code (e.g. "zh" for Chinese, "ko" for Korean).
  - Only edit the ENGLISH (**/en**) version of files. We use [Crowdin](../contribute/translation.md) to manage the translations.
* All pages must be in an appropriately named sub-folder of **/en** (e.g. this page is in folder **en/contribute/**).
  - This makes linking easier because other pages and images are always as the same relative levels
* The _structure_ of the book is defined in **SUMMARY.md**
  - If you add a new page to the guide you must also add an entry to this file! :::tip This is not "standard vuepress" way to define the sidebar (the summary file is imported by [.vuepress/get_sidebar.js](https://github.com/PX4/PX4-user_guide/blob/master/.vuepress/get_sidebar.js)).
:::
* Images must be stored in a sub folder of **/assets**. This is two folders down from content folders, so if you add an image you will reference it like:
  ```
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```
* A file named **package.json** defines any dependencies of the build.
* A web hook is used to track whenever files are merged into the master branch on this repository, causing the book to rebuild.

### Adding New Pages

All PX4/Dronecode documentation is free to use and modify under terms of the permissive [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence.

## Style Guide

1. Files/file names

   * Put new files in an appropriate sub-folder of **/en/**. Do not further nest folders.
   * The *structure* of the book is defined in a file named **SUMMARY.md**. In particular, image filenames should describe what they contain.
   * This is a [multilingual](https://toolchain.gitbook.com/languages.html) book, so there is a **LANGS.md** file in the root directory defining what languages are supported.

2. Images

   * Use the smallest size and lowest resolution that makes the image still useful (this reduces download cost for users with poor bandwidth).
   * New images should be created in a sub-folder of **/assets/** by default (so they can be shared between translations).

3. Content:

   * Use "style" \(bold, emphasis, etc\) consistently.
     - **Bold** for button presses and menu definitions.
     - _Emphasis_ for tool names.
     - Otherwise use as little as possible.
   * New images should be created in a sub-folder of **/assets/** by default (so they can be shared between translations).
   * The page title should be a first level heading \(\#\). All other headings should be h2 \(\#\#\) or lower.
   * Don't add any style to headings.
   * Don't translate the *first part* of a note, tip or warning declaration (e.g. `::: tip`) as this precise text is required to render the note properly.


## Where Do I Add Changes?

Add new documentation in-line with the existing structure!

Some of the main categories are:
- Development: content related to:
  - Evolving the platform (new modes, modules, flight modes, hardware, software and hardware architecture and porting).
  - "Experimental" work that requires developer expertise to reproduce.
- Flying: content related to flying a standard vehicle (flight modes, arming, taking off, landing)
- Basic configuration: Configuration that every vehicle will need to do
- Advanced configuration: Configration that is specific to a vehicle type, or some segment of users.
- Peripherals: Documentation on different hardware that can be used.
  - This also includes setup and configuration information for hardware that isn't covered in Basic configuration.
- Basic Assembly: Assembly of an autopilot and its main peripherals
- Airframe Builds: Examples of how to build a whole system.


## Translations

For information about translation see: [Translation](../contribute/translation.md).

## Licence

All PX4/Dronecode documentation is free to use and modify under terms of the permissive [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence.
