# git 예제

<a id="contributing_code"></a>

## PX4에 코드 기여

PX4 기능 추가 절차는 다음과 같습니다. 다음 예제를 따라 PX4에 기여 결과를 공유할 수 있습니다.

* 아직 Github에 계정이 없으면, 먼저 [가입](https://github.com/join)합니다.
* Fork the PX4-Autopilot repo (see [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
* 포크된 저장소를 로컬 컴퓨터에 복제합니다.

  ```sh
  cd ~/wherever/
  git clone https://github.com/<your git name>/PX4-Autopilot.git
  ```
* 복제한 디렉토리로 이동하여, 하위 모듈을 초기화 및 업데이트하고, 원 업스트림 PX4-Autopilot URL을 추가합니다.

  ```sh
  cd PX4-Autopilot
  git submodule update --init --recursive
  git remote add upstream https://github.com/PX4/PX4-Autopilot.git
  ```
* You should have now two remote repositories: One repository is called `upstream` that points to PX4/PX4-Autopilot, and one repository `origin` that points to your forked copy of the PX4 repository.
* 이것은 다음 명령어로 확인할 수 있습니다.
  ```sh
  git remote -v
  ```
* Make the changes that you want to add to the current main.
* 기능을 나타내는 의미 있는 이름으로 새 분기를 생성합니다.

  ```sh
  git checkout -b <your feature branch name>
  ```

  `git branch` 명령어로 분기를 확인할 수 있습니다.
* 해당 파일을 추가하여 커밋의 변경 사항을 추가합니다.

  ```sh
  git add <file name>
  ```
  GUI로 파일을 추가하려면 [Gitk](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Graphical-Interfaces) 또는 [`git add -p`](http://nuclearsquid.com/writings/git-add/)를 참조하십시오.
* 변경 사항을 설명하는 메시지와 함께 추가된 파일을 커밋합니다.

  ```sh
  git commit -m "<your commit message>"
  ```

  적절한 커밋 메시지 예들은 [기여](../contribute/README.md) 섹션을 참고하십시오.
* Some time might have passed and the [upstream main](https://github.com/PX4/PX4-Autopilot.git) has changed. PX4는 선형 커밋 기록을 선호하며, [git rebase](https://git-scm.com/book/de/v1/Git-Branching-Rebasing)를 사용합니다. To include the newest changes from upstream in your local branch, switch to your main branch

  ```sh
  git checkout main
  ```

  Then pull the newest commits from upstream main

  ```sh
  git pull upstream main
  ```
  Now your local main is up to date. Switch back to your feature branch and rebase on your updated main

  ```sh
  git checkout <your feature branch name>
  git rebase main
  ```
* 이제 로컬 커밋을 분기된 저장소로 푸시할 수 있습니다.

  ```sh
  git push origin <your feature branch name>
  ```
* You can verify that the push was successful by going to your forked repository in your browser: `https://github.com/<your git name>/PX4-Autopilot.git`

  There you should see the message that a new branch has been pushed to your forked repository.
* 이제 풀 리퀘스트(PR)를 생성합니다. "새 분기 메시지"(앞의 한 단계 참조)의 오른쪽에 "풀 요청 비교 및 생성"이라는 녹색 버튼이 표시되어야 합니다. 그런 다음 변경 사항을 나열하여야 하며, 의미 있는 제목(하나의 커밋 PR의 경우 일반적으로 커밋 메시지)과 메시지(<span style="color:orange">어떤 이유로 작업을 하였는 지 설명</span>)를 추가할 수 있습니다. 비교를 위해 [기타 풀 리퀘스트](https://github.com/PX4/PX4-Autopilot/pulls)를 참고하십시오.
* 완료하였습니다. PX4 담당자가 기여 내용을 검토후, 병합 여부를 결정합니다. 때때로 변경 사항에 대해 질문이 있는 지 확인하십시오.


## Changing Source Trees

We recommend using PX4 `make` commands to switch between source code branches. This saves you having to remember the commands to update submodules and clean up build artifacts (build files that are not removed will result in "untracked files" errors after the switch).

To switch between branches:

1. Clean up the current branch, de-initializing submodule and removing all build artifacts:

   ```sh
   make clean
   make distclean
   ```
1. Switch to a new branch or tag (here we first fetch the fictional branch "PR_test_branch" from the `upstream` remote):

   ```sh
   git fetch upstream PR_test_branch
   git checkout PR_test_branch
   ```
1. Get the submodules for the new branch:

   ```sh
   make submodulesclean
   ```

<!-- FYI: Cleaning commands in https://github.com/PX4/PX4-Autopilot/blob/main/Makefile#L494 -->


## 특정 릴리스 가져오기

Specific PX4 point releases are made as tags of the [release branches](#get-a-release-branch), and are named using the format `v<release>`. These are [listed on Github here](https://github.com/PX4/PX4-Autopilot/releases?q=release&expanded=true) (or you can query all tags using `git tag -l`).

To get the source code for a *specific older release* (tag):

1. Clone the PX4-Autopilot repo and navigate into _PX4-Autopilot_ directory:

   ```sh
   git clone https://github.com/PX4/PX4-Autopilot.git
   cd PX4-Autopilot
   ```

:::note
You can reuse an existing repo rather than cloning a new one. In this case clean the build environment (see [changing source trees](#changing-source-trees)):

   ```sh
   make clean
   make distclean
   ```

:::

1. Checkout code for particular tag (e.g. for tag v1.13.0-beta2)

   ```sh
   git checkout v1.13.0-beta2
   ```

1. Update submodules:

   ```sh
   make submodulesclean
   ```

## Get a Release Branch

Releases branches are branched of `main`, and used to backport necessary changes from main into a release. The branches are named using the format `release/<release_number>` (e.g. `release/v1.13`). The are [listed here](https://github.com/PX4/PX4-Autopilot/branches/all?query=release).

To get a release branch:

- Clone the PX4-Autopilot repo and navigate into _PX4-Autopilot_ directory:

  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git
  cd PX4-Autopilot
  ```
:::note
You can reuse an existing repo rather than cloning a new one. In this case clean the build environment (see [changing source trees](#changing-source-trees)):

  ```sh
  make clean
  make distclean
  ```

:::


- Fetch the desired release branch. For example, assuming you want the source for PX4 v1.13:

  ```sh
  git fetch origin release/1.13
  ```

- Checkout the code for the branch

  ```sh
  git checkout release/1.13
  ```

- Update submodules:

  ```sh
  make submodulesclean
  ```

## 하위 모듈 업데이트

하위 모듈을 업데이트하는 방법에는 여러 가지가 있습니다. 저장소를 복제하거나 하위 모듈 디렉토리로 이동하여 [PX4에 코드 기여](#contributing_code)와 동일한 방법으로 진행합니다.

## 하위 모듈 업데이트에 대한 풀 요청 실행

This is required after you have done a PR for a submodule X repository and the bug-fix / feature-add is in the current main of submodule X. Since the Firmware still points to a commit before your update, a submodule pull request is required such that the submodule used by the Firmware points to the newest commit.
```sh
cd Firmware
```
* 하위 모듈 업데이트에 대한 수정 사항/기능을 설명하는 새로운 분기를 만듭니다.
  ```sh
  git checkout -b pr-some-fix
  ```
* 하위 모듈 하위 디렉토리로 이동합니다.
  ```sh
  cd <path to submodule>
  ```
* PX4 하위 모듈이 반드시 최신 커밋을 가리킬 필요는 없습니다. Therefore, first checkout main and pull the newest upstream code.
  ```sh
  git checkout main
  git pull upstream main
  ```
* Firmware 디렉토리로 돌아가서, 평소처럼 변경 사항을 추가, 커밋 및 푸시합니다.
  ```sh
  cd -
git add <path to submodule>
git commit -m "Update submodule to include ..."
  git push upstream pr-some-fix
  ```

## 풀 요청 체크아웃

병합할 분기가 해당 사람의 포크에만 존재하더라도, 누군가의 풀 요청(변경 사항이 아직 병합되지 않음)을 테스트할 수 있습니다. 다음 과정을 수행합니다.
```sh
git fetch upstream  pull/<PR ID>/head:<branch name>
```
`PR ID`는 풀 요청 제목 바로 옆에 있는 숫자(# 제외)이며 `<branch name>`은 `PR ID` 바로 아래에서도 찾을 수 있습니다. 예: `<the other persons git name>:<branch name>`. 그 후 다음을 사용하여 로컬에서 새로 생성된 분기를 조회할 수 있습니다.
```sh
git branch
```
그런 다음 해당 분기로 전환합니다.
```sh
git checkout <branch name>
```

## 일반적인 함정

### 분기된 저장소로 강제 푸시

첫 번째 풀 요청후에, PX4 커뮤니티의 사람들이 변경 사항을 검토합니다. 대부분의 경우 검토에 따라 로컬 지점을 수정하여야 함을 의미합니다. After changing the files locally, the feature branch needs to be rebased again with the most recent upstream/main. 그러나, 리베이스 후에는 더 이상 기능 분기를 분기된 저장소에 직접 푸시할 수 없지만, 대신 강제 푸시를 사용하여야 합니다.
```sh
git push --force-with-lease origin <your feature branch name>
```

### 리베이스 병합 충돌

If a conflict occurs during a `git rebase`, please refer to [this guide](https://docs.github.com/en/get-started/using-git/resolving-merge-conflicts-after-a-git-rebase).

### 풀 병합 충돌

`git pull` 중 충돌이 발생하면 [이 가이드](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/#competing-line-change-merge-conflicts)를 참고하십시오.

### 오래된 git 태그로 인한 빌드 오류

빌드 오류 `오류: PX4 버전이 너무 낮음, 최소 vx.x.x가 필요합니다.` git 태그가 오래된 경우 발생합니다.

이것은 업스트림 리포지토리 태그를 가져와서 해결할 수 있습니다.
```sh
git fetch upstream --tags
```

