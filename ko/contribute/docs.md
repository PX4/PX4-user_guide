---
canonicalUrl: https://docs.px4.io/main/ko/contribute/docs
---

# 문서화에 기여

PX4 사용자 가이드에 대한 기여를 매우 환영합니다. 간단한 수정 작업 뿐만 아니라, 철자 및 문법, 새로운 주제 등에서 문서화 작업이 필요합니다.

이 항목에서는 변경 사항을 적용하고 테스트하는 방법을 설명합니다. 마지막에는 기본 스타일 가이드가 있습니다.

:::tip
Note You will need a (free) [Github](https://github.com/) account to contribute to the guides.
:::

<a id="github_changes" ></a>

## Github의 빠른 변경 사항

Simple changes to _existing content_ can be made by clicking the **Edit this page on GitHub** link that appears at the bottom of every page (this opens the page on Github for editing).

![Vuepress: 페이지 편집 버튼](../../assets/vuepress/vuepress_edit_page_on_github_link.png)

기존 페이지를 편집하려면:

1. 해당 페이지를 엽니다.
1. 페이지 콘텐츠 아래에 있는 **GitHub에서 이 페이지 편집** 링크를 클릭합니다.
1. 파일을 편집합니다.
1. Below the Github page editor you'll be prompted to create a separate branch and then guided to submit a _pull request_.

문서 팀은 요청을 검토하고, 병합하거나 업데이트하기 위하여 귀하와 협력할 것입니다.

<a id="big_changes" ></a>

## Git을 사용한 변경(새 페이지 및 이미지)

새 페이지 추가 또는 이미지 추가/수정을 포함하여 보다 실질적인 변경은 Github에서 수행(또는 적절하게 테스트)하는 것처럼 간단하지 않습니다. For these kinds of changes we suggest using the same approach as for _code_:

1. Use the _git_ toolchain to get the documentation source code onto your local computer.
1. 필요한 문서를 수정합니다(추가, 변경, 삭제).
1. _Test_ that it builds properly using Vuepress.
1. 변경 사항에 대한 분기를 만들고 풀 요청을 만들어 문서로 다시 가져옵니다.

다음에는 소스 코드를 가져오고, 로컬에서 빌드(테스트용)하고, 코드를 수정하는 방법을 설명합니다.

### 문서 소스 코드 가져오기/보내기

라이브러리 소스를 로컬 컴퓨터로 가져오려면 git 명령어를 사용하여야 합니다. 아래 지침은 git을 가져와 로컬 컴퓨터에서 사용하는 방법을 설명합니다.

1. [https://git-scm.com/downloads](https://git-scm.com/downloads)에서 git 프로그램을 다운로드합니다.
1. 아직 Github에 [가입](https://github.com/join)하지 않은 경우에는 가입합니다.
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
   For a good commit message, please refer to the [Source Code Management](../contribute//code.md#commits-and-commit-messages) section.
1. 로컬 분기(추가된 커밋 포함)를 Github의 분기된 저장소에 푸시합니다.
   ```sh
   git push origin your_feature_branch_name
   ```
1. 웹 브라우저에서 Github의 분기된 저장소로 이동합니다(예: `https://github.com/<your git name>/px4_user_guide.git`). 새 분기가 분기된 저장소로 푸시되었다는 메시지가 표시되어야 합니다.
1. 풀 요청(PR) 생성:
   - "새 분기 메시지"(앞의 한 단계 참조)의 오른쪽에 "풀 요청 비교 및 생성"이라는 녹색 버튼이 표시되어야 합니다. 클릭합니다.
   - 풀 요청 템플릿이 생성됩니다. 그것은 당신의 커밋을 나열하고 의미 있는 제목(하나의 커밋 PR의 경우 일반적으로 커밋 메시지)과 메시지(<span style="color:orange">어떤 이유에서 수행했는지 설명</span>)를 추가할 수 있습니다(반드시). 비교를 위하여, [기타 풀 요청](https://github.com/PX4/px4_user_guide/pulls)을 확인하십시오.
1. 완료하였습니다. PX4 사용자 가이드 유지 관리자는 이제 귀하의 기여를 검투한 후에, 통합 여부를 결정합니다. 때때로 변경 사항에 대한 질문을 확인하십시오.

### 로컬에서 라이브러리 구축

로컬에서 라이브러리를 빌드하여, 변경 사항이 제대로 반영되었는 지를 테스트합니다.

1. 사전 요구 사항인 [Vuepress](https://vuepress.vuejs.org/guide/getting-started.html#prerequisites)을 설치합니다.

   - [Nodejs 10+](https://nodejs.org/en)

:::note
For recent nodejs versions (after v16.15.0) you need to enable the node legacy OpenSSL provider. On Ubuntu you can do this by running the terminal command:

     ```bash
     export NODE_OPTIONS=--openssl-legacy-provider
     ```

   - [Yarn classic](https://classic.yarnpkg.com/en/docs/install)

1. 로컬 저장소로 이동합니다.

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. 종속성(Vuepress 포함)들을 설치합니다.

   ```sh
   yarn install
   ```

1. 라이브러리 미리보기 및 제공

   ```sh
   yarn docs:dev
   ```

   - 이제 http://localhost:8080/px4_user_guide/에서 가이드를 검색할 수 있습니다.
   - 터미널 프롬프트에서 **CTRL+C**를 사용하여 검색을 중지합니다.

1. 다음을 사용하여 라이브러리를 빌드합니다.

   ```sh
   # Ubuntu
   yarn docs:build

   # Windows
   yarn docs:buildwin
   ```

:::tip
Use `yarn docs:dev` to preview changes _as you make them_ (documents are updated and served very quickly). 풀 요청을 제출전에 `docs:build`를 사용하여 빌드하여야 합니다. 이렇게 하면 `docs:dev`를 사용할 때 표시되지 않는 문제를 강조하여 표시할 수 있습니다.
:::

### 소스 코드 구조

이 가이드는 [Vuepress](https://vuepress.vuejs.org/) 툴체인을 사용합니다. PX4 사용 설명서에는 구성과 설정에 관련된 몇 가지 사소한 차이점들이 있습니다.

개요:

- 페이지는 마크다운을 사용하여 별도의 파일에 작성됩니다.
  - 문법은 Github 위키에서 사용하는 것과 매우 유사합니다.
  - Vuepress는 일부 [마크다운 확장](https://vuepress.vuejs.org/guide/markdown.html)도 지원합니다. 우리는 [tips, warning, 등](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)을 제외하고는 사용하지 않으려고 합니다.
- [다국어](https://vuepress.vuejs.org/guide/i18n.html#default-theme-i18n-config) 책에 관련된 내용입니다.
  - 각 언어의 페이지는 관련 언어 코드의 이름이 지정된 폴더에 저장됩니다(예: 중국어의 경우 "zh", 한국어의 경우 "ko").
  - 파일의 영어(**/en**) 버전만 편집하십시오. 번역을 관리하기 위해 [Crowdin](../contribute/translation.md)을 사용합니다.
- 모든 페이지는 **/en**이라는 적절한 이름의 하위 폴더에 있어야 합니다(예: 이 페이지는 **en/contribute/** 폴더에 있음).
  - 이렇게 하면 다른 페이지와 이미지가 항상 동일한 상대 수준이므로 연결이 더 용이해집니다.
- 책의 _구조_는 **SUMMARY.md**에 정의되어 있습니다.
  - 가이드에 새 페이지를 추가하는 경우 이 파일에도 항목을 추가하여야 합니다. :::tip This is not "standard vuepress" way to define the sidebar (the summary file is imported by [.vuepress/get_sidebar.js](https://github.com/PX4/PX4-user_guide/blob/main/.vuepress/get_sidebar.js)).
:::
- 이미지는 **/assets**의 하위 폴더에 저장하여야 합니다. 이것은 콘텐츠 폴더에서 두 개의 폴더 아래에 있으므로, 이미지를 추가하면 다음과 같이 참조하게 됩니다.

  ```plain
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```

- **package.json**이라는 파일은 빌드의 종속성을 정의합니다.
- 웹 후크는 파일이 이 저장소의 마스터 분기에 병합되어, 책이 다시 빌드될 때마다 추적하는 데 사용됩니다.

### 새 페이지 추가

새 페이지를 추가시에는 **en/SUMMARY.md**에도 추가하여야 합니다.

## 스타일 가이드

1. 파일/파일명

   - **/en/**의 적절한 하위 폴더에 새 파일을 추가합니다. 폴더를 중첩하지 마십시오.
   - 설명이 포함된 이름을 사용합니다. 특히, 이미지 파일명은 포함된 내용을 설명하여야 합니다.
   - 파일명은 소문자를 사용하고, 밑줄 "\_"을 사용하여 단어를 구분합니다.

2. 이미지

   - 이미지는 최대한 가장 작은 크기와 가장 낮은 해상도를 사용합니다(이렇게 하면 대역폭이 좋지 않은 사용자의 다운로드 비용이 줄어듭니다).
   - New images should be created in a sub-folder of **/assets/** by default (so they can be shared between translations).

3. 내용

   - "모양새" \(bold, emphasis, etc\) 를 일관되게 활용하십시오.
     - **Bold** 는 누르는 단추 텍스트와 메뉴 정의에 활용합니다.
     - _Emphasis_는 도구 이름에 사용합니다. - Otherwise use as little as possible.
   - 제목과 페이지 제목은 "첫 글자 대문자"를 사용하여야 합니다.
   - 페이지 제목은 첫 번째 수준 제목 \(\#\)이어야 합니다. 다른 소제목은 h2 \(\#\#\) 또는 그 이하여야 합니다.
   - 제목에는 스타일을 추가하지 마십시오.
   - Don't translate the _first part_ of a note, tip or warning declaration (e.g. `::: tip`) as this precise text is required to render the note properly.

## 어디에서 변경 사항을 추가합니까?

기존 구조에 맞춰 새 문서를 추가하십시오!

주요 범주 중 일부는 다음과 같습니다.

- 개발: 관련 콘텐츠
  - 플랫폼의 진화(새로운 모드, 모듈, 비행 모드, 하드웨어, 소프트웨어 및 하드웨어 아키텍처 및 이식)
  - 재현하기 위해 개발자 전문 지식이 필요한 "실험적" 작업
- 비행: 표준 차량 비행과 관련된 콘텐츠(비행 모드, 무장, 이륙, 착륙)
- 기본 설정: 모든 차량이 수행해야 하는 설정
- Advanced configuration: Configuration that is specific to a vehicle type, or some segment of users.
- 주변 장치: 사용할 수 있는 다양한 하드웨어에 관련된 문서입니다.
  - 여기에는 기본 설정에서 다루지 않는 하드웨어에 대한 설정 및 구성 정보를 포함합니다.
- 기본 조립: 자동 조종 장치 및 주요 주변 장치의 조립
- 기체 빌드: 전체 시스템을 빌드하는 방법의 예입니다.

## 번역

번역에 대한 정보는 [번역](../contribute/translation.md)을 참고하십시오.

## 라이센스

All PX4/Dronecode documentation is free to use and modify under terms of the permissive [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence.
