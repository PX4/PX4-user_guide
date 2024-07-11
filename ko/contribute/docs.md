# 문서화에 기여

PX4 사용자 가이드에 대한 기여를 매우 환영합니다. 간단한 수정 작업 뿐만 아니라, 철자 및 문법, 새로운 주제 등에서 문서화 작업이 필요합니다.

이 항목에서는 변경 사항을 적용하고 테스트하는 방법을 설명합니다. 마지막에는 기본 스타일 가이드가 있습니다.

:::tip
Note You will need a (free) [Github](https://github.com/) account to contribute to the guides.
:::

## Github의 빠른 변경 사항

Simple changes to _existing content_ can be made by clicking the **Edit on GitHub** link that appears at the bottom of every page (this opens the page on Github for editing).

![Vuepress: 페이지 편집 버튼](../../assets/vuepress/vuepress_edit_page_on_github_link.png)

기존 페이지를 편집하려면:

1. 해당 페이지를 엽니다.
1. 페이지 콘텐츠 아래에 있는 **GitHub에서 이 페이지 편집** 링크를 클릭합니다.
1. 파일을 편집합니다.
1. Below the Github page editor you'll be prompted to create a separate branch and then guided to submit a _pull request_.

문서 팀은 요청을 검토하고, 병합하거나 업데이트하기 위하여 귀하와 협력할 것입니다.

## Git을 사용한 변경(새 페이지 및 이미지)

새 페이지 추가 또는 이미지 추가/수정을 포함하여 보다 실질적인 변경은 Github에서 수행(또는 적절하게 테스트)하는 것처럼 간단하지 않습니다. For these kinds of changes we suggest using the same approach as for _code_:

1. Use the _git_ toolchain to get the documentation source code onto your local computer.
1. 필요한 문서를 수정합니다(추가, 변경, 삭제).
1. _Test_ that it builds properly using Vitepress.
1. 변경 사항에 대한 분기를 만들고 풀 요청을 만들어 문서로 다시 가져옵니다.

다음에는 소스 코드를 가져오고, 로컬에서 빌드(테스트용)하고, 코드를 수정하는 방법을 설명합니다.

### 문서 소스 코드 가져오기/보내기

라이브러리 소스를 로컬 컴퓨터로 가져오려면 git 명령어를 사용하여야 합니다. 아래 지침은 git을 가져와 로컬 컴퓨터에서 사용하는 방법을 설명합니다.

1. [https://git-scm.com/downloads](https://git-scm.com/downloads)에서 git 프로그램을 다운로드합니다.
1. [Sign up](https://github.com/join) for Github if you haven't already
1. Create a copy (Fork) of the [PX4 User Guide repo](https://github.com/PX4/PX4-user_guide) on Github ([instructions here](https://docs.github.com/en/get-started/quickstart/fork-a-repo)).
1. 복사된 저장소를 로컬 컴퓨터에 복제합니다.

   ```sh
   cd ~/wherever/
   git clone https://github.com/<your git name>/px4_user_guide.git
   ```

   예를 들어, Github 계정이 "john_citizen"인 사용자의 PX4 사용자 가이드 포크를 복제합니다.

   ```sh
   git clone https://github.com/john_citizen/px4_user_guide.git
   ```

1. 로컬 저장소로 이동합니다.

   ```sh
   cd ~/wherever/px4_user_guide
   ```

1. Add a _remote_ called "upstream" to point to the PX4 version of the library:

   ```sh
   git remote add upstream https://github.com/PX4/px4_user_guide.git
   ```

:::tip
"remote"은 특정 저장소에 대한 핸들입니다. The remote named _origin_ is created by default when you clone the repository, and points to _your fork_ of the guide. Above you create a new remote _upstream_ that points to the PX4 project version of the documents.
:::

1. 변경 사항에 대한 브랜치를 생성합니다.

   ```sh
   git checkout -b <your_feature_branch_name>
   ```

   그러면 컴퓨터에 `your_feature_branch_name`이라는 로컬 브랜치가 생성됩니다.

1. 필요에 따라 문서를 변경합니다(다음 섹션에서 이에 대한 일반 지침).
1. 변경 사항에 완료되면 "커밋"을 사용하여, 로컬 브랜치에 추가합니다.

   ```sh
   git add <file name>
   git commit -m "<your commit message>"
   ```

   For a good commit message, please refer to the [Source Code Management](../contribute/code.md#commits-and-commit-messages) section.

1. 로컬 분기(추가된 커밋 포함)를 Github의 분기된 저장소에 푸시합니다.

   ```sh
   git push origin your_feature_branch_name
   ```

1. 웹 브라우저에서 Github의 분기된 저장소로 이동합니다(예: `https://github.com/<your git name>/px4_user_guide.git`). 새 분기가 분기된 저장소로 푸시되었다는 메시지가 표시되어야 합니다.
1. 풀 요청(PR) 생성:
   - "새 분기 메시지"(앞의 한 단계 참조)의 오른쪽에 "풀 요청 비교 및 생성"이라는 녹색 버튼이 표시되어야 합니다. 클릭합니다.
   - 풀 요청 템플릿이 생성됩니다. 그것은 당신의 커밋을 나열하고 의미 있는 제목(하나의 커밋 PR의 경우 일반적으로 커밋 메시지)과 메시지(<span style="color:orange">어떤 이유에서 수행했는지 설명</span>)를 추가할 수 있습니다(반드시). Check [other pull requests](https://github.com/PX4/PX4-user_guide/pulls) for comparison)
1. 완료하였습니다. PX4 사용자 가이드 유지 관리자는 이제 귀하의 기여를 검투한 후에, 통합 여부를 결정합니다. 때때로 변경 사항에 대한 질문을 확인하십시오.

### 로컬에서 라이브러리 구축

로컬에서 라이브러리를 빌드하여, 변경 사항이 제대로 반영되었는 지를 테스트합니다.

1. 사전 요구 사항인 [Vuepress](https://vuepress.vuejs.org/guide/getting-started.html#prerequisites)을 설치합니다.

   - [Nodejs 18+](https://nodejs.org/en)
   - [Yarn classic](https://classic.yarnpkg.com/en/docs/install)

1. 로컬 저장소로 이동합니다.

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. 종속성(Vuepress 포함)들을 설치합니다.

   ```sh
   yarn install
   ```

1. Preview and serve the library:

   ```sh
   yarn docs:dev
   ```

   - Once the development/preview server has built the library (less than a minute for the first time) it will show you the URL you can preview the site on. This will be something like: `http://localhost:5173/px4_user_guide/`.
   - 터미널 프롬프트에서 **CTRL+C**를 사용하여 검색을 중지합니다.

1. 다음을 사용하여 라이브러리를 빌드합니다.

   ```sh
   # Ubuntu
   yarn docs:build

   # Windows
   yarn docs:buildwin
   ```

:::tip
Use `yarn start` to preview changes _as you make them_ (documents are updated and served very quickly). 풀 요청을 제출전에 `docs:build`를 사용하여 빌드하여야 합니다. 이렇게 하면 `docs:dev`를 사용할 때 표시되지 않는 문제를 강조하여 표시할 수 있습니다.
:::

### 소스 코드 구조

The guide uses the [Vitepress](https://vitepress.dev/) toolchain.

개요:

- 페이지는 마크다운을 사용하여 별도의 파일에 작성됩니다.
  - 문법은 Github 위키에서 사용하는 것과 매우 유사합니다.
  - Vuepress는 일부 [마크다운 확장](https://vuepress.vuejs.org/guide/markdown.html)도 지원합니다. 우리는 [tips, warning, 등](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)을 제외하고는 사용하지 않으려고 합니다. This might be revisited - there are some interesting options provided!
- [다국어](https://vuepress.vuejs.org/guide/i18n.html#default-theme-i18n-config) 책에 관련된 내용입니다.
  - 각 언어의 페이지는 관련 언어 코드의 이름이 지정된 폴더에 저장됩니다(예: 중국어의 경우 "zh", 한국어의 경우 "ko").
  - Only edit the ENGLISH (`/en`) version of files. 번역을 관리하기 위해 [Crowdin](../contribute/translation.md)을 사용합니다.
- All pages must be in an appropriately named sub-folder of `/en` (e.g. this page is in folder `en/contribute/`).
  - 이렇게 하면 다른 페이지와 이미지가 항상 동일한 상대 수준이므로 연결이 더 용이해집니다.
- The _structure_ of the book is defined in `SUMMARY.md`.

  - If you add a new page to the guide you must also add an entry to this file!

:::tip
This is not "standard vitepress" way to define the sidebar (the summary file is imported by [.vitepress/get_sidebar.js](https://github.com/PX4/PX4-user_guide/blob/main/.vitepress/get_sidebar.js)).
:::

- Images must be stored in a sub folder of `/assets`. 이것은 콘텐츠 폴더에서 두 개의 폴더 아래에 있으므로, 이미지를 추가하면 다음과 같이 참조하게 됩니다.

  ```plain
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```

- **package.json**이라는 파일은 빌드의 종속성을 정의합니다.
- 웹 후크는 파일이 이 저장소의 마스터 분기에 병합되어, 책이 다시 빌드될 때마다 추적하는 데 사용됩니다.

### 새 페이지 추가

When you add a new page you must also add it to `en/SUMMARY.md`!

## 스타일 가이드

1. 파일/파일명

   - Put new markdown files in an appropriate sub-folder of `/en/`, such as `/en/contribute/`. 폴더를 중첩하지 마십시오.
   - Put new image files in an appropriate nested sub-folder of `/assets/`. Deeper nesting is allowed/encouraged.
   - Use descriptive names for folders and files. In particular, image filenames should describe what they contain (don't name as "image1.png")
   - Use lower case filenames and separate words using underscores (`_`).

2. 이미지

   - 이미지는 최대한 가장 작은 크기와 가장 낮은 해상도를 사용합니다(이렇게 하면 대역폭이 좋지 않은 사용자의 다운로드 비용이 줄어듭니다).
   - New images should be created in a sub-folder of `/assets/` (so they can be shared between translations).
   - SVG files are preferred for diagrams. PNG files are preferred over JPG for screenshots.

3. 내용

   - Use "style" (**bold**, _emphasis_, etc.) consistently and sparingly (as little as possible).
     - **Bold** 는 누르는 단추 텍스트와 메뉴 정의에 활용합니다.
     - _Emphasis_ for tool names such as _QGroundControl_ or _prettier_.
     - `code` for file paths, and code, parameter names that aren't linked, using tools in a command line, such as `prettier`.
   - Headings and page titles should use "First Letter Capitalisation".
   - The page title should be a first level heading (`#`). All other headings should be h2 (`##`) or lower.
   - 제목에는 스타일을 추가하지 마십시오.
   - Don't translate the _first part_ of an `info`, `tip` or `warning` declaration (e.g. `::: tip`) as this precise text is required to render the note properly.
   - Break lines on sentences by preference. Don't break lines based on some arbitrary line length.
   - Format using _prettier_ (_VSCode_ is a has extensions can be used for this).

4. Videos:

   - Youtube videos can be added using the format `@[youtube](https://youtu.be/<youtube-video-id>)` (supported via the [markdown-it-video](https://www.npmjs.com/package/markdown-it-video) plugin).
     - Use instructional videos sparingly as they date badly, and are hard to maintain.
     - Cool videos of airframes in flighyt are always welcome.

## 어디에서 변경 사항을 추가합니까?

Add new files in folders that cover similar topics. Then reference them in the sidebar (`/en/SUMMARY.md`) in line with the existing structure!

## 번역

번역에 대한 정보는 [번역](../contribute/translation.md)을 참고하십시오.

## 라이센스

All PX4/Dronecode documentation is free to use and modify under terms of the permissive [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
