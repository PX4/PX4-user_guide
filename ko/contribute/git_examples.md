# git 예제

<a id="contributing_code"></a>

## PX4에 코드 기여

PX4 기능 추가 절차는 다음과 같습니다. 다음 예제를 따라 PX4에 기여 결과를 공유할 수 있습니다.

* 아직 Github에 계정이 없으면, 먼저 [가입](https://github.com/join)합니다.
* PX4-Autopilot 저장소를 포크합니다([이곳](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository)을 참고).
* 포크된 저장소를 로컬 컴퓨터에 복제합니다.<br>
  ```sh
  cd ~/wherever/
  git clone https://github.com/<your git name>/PX4-Autopilot.git
  ```
* 복제한 디렉토리로 이동하여, 하위 모듈을 초기화 및 업데이트하고, 원 업스트림 PX4-Autopilot URL을 추가합니다.<br>
  ```sh
  cd PX4-Autopilot
  git submodule update --init --recursive
  git remote add upstream https://github.com/PX4/PX4-Autopilot.git
  ```
* 이제 두 개의 원격 저장소가 있어야 합니다. 하나의 저장소는 PX4/PX4-Autopilot 업스트림이고, 다른 하나는 PX4 분기 저장소입니다.
* 이것은 다음 명령어로 확인할 수 있습니다.
  ```sh
  git remote -v
  ```
* 현재 마스터에 변경 작업을 추가합니다.
* 기능을 나타내는 의미 있는 이름으로 새 분기를 생성합니다.<br>
  ```sh
  git checkout -b <your feature branch name>
  ```
  `git branch` 명령어로 분기를 확인할 수 있습니다.
* 해당 파일을 추가하여 커밋의 변경 사항을 추가합니다.<br>
  ```sh
  git add <file name>
  ```
  GUI로 파일을 추가하려면 [Gitk](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Graphical-Interfaces) 또는 [`git add -p`](http://nuclearsquid.com/writings/git-add/)를 참조하십시오.
* 변경 사항을 설명하는 메시지와 함께 추가된 파일을 커밋합니다.<br>
  ```sh
  git commit -m "<your commit message>"
  ```
적절한 커밋 메시지 예들은 [기여](../contribute/README.md) 섹션을 참고하십시오.
* 시간이 지나서, [업스트림 마스터](https://github.com/PX4/PX4-Autopilot.git)가 변경되었을 수 있습니다. PX4는 선형 커밋 기록을 선호하며, [git rebase](https://git-scm.com/book/de/v1/Git-Branching-Rebasing)를 사용합니다. 업스트림의 최신 변경 사항을 로컬 브랜치에 포함하려면, 마스터 브랜치로 전환합니다.<br>
  ```sh
  git checkout master
  ```
  그런 다음, 업스트림 마스터에서 최신 커밋을 가져옵니다.<br>
  ```sh
  git pull upstream master
  ```
  이제 로컬 마스터 브랜치는 최신입니다. 기능을 추가하는 브랜치로 되돌아 갑니다.<br>
  ```sh
  git checkout <your feature branch name>
  ```
  업데이트된 마스터를 기반으로 리베이스합니다.<br>
  ```sh
  git rebase master
  ```
* 이제 로컬 커밋을 분기된 저장소로 푸시할 수 있습니다.<br>
  ```sh
  git push origin <your feature branch name>
  ```
* 브라우저에서 분기된 저장소로 이동하여 푸시가 성공 여부를 확인할 수 있습니다. `https://github.com/<your git name>/PX4-Autopilot.git`<br> 새 분기가 분기된 저장소로 푸시되었다는 메시지가 표시되어야 합니다.
* 이제 풀 리퀘스트(PR)를 생성합니다. "새 분기 메시지"(앞의 한 단계 참조)의 오른쪽에 "풀 요청 비교 및 생성"이라는 녹색 버튼이 표시되어야 합니다. 그런 다음 변경 사항을 나열하여야 하며, 의미 있는 제목(하나의 커밋 PR의 경우 일반적으로 커밋 메시지)과 메시지(<span style="color:orange">어떤 이유로 작업을 하였는 지 설명</span>)를 추가할 수 있습니다. 비교를 위해 [기타 풀 리퀘스트](https://github.com/PX4/PX4-Autopilot/pulls)를 참고하십시오.
* 완료하였습니다. PX4 담당자가 기여 내용을 검토후, 병합 여부를 결정합니다. 때때로 변경 사항에 대해 질문이 있는 지 확인하십시오.

## 특정 릴리스 가져오기

*특정 이전 릴리스*의 소스 코드를 가져오려면, 다음 단계를 따라 하십시오.
* PX4-Autopilot 저장소를 복제하고, PX4-Autopilot 디렉토리로 이동합니다.
  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git
  cd PX4-Autopilot
  ```
* 모든 릴리스(태그)를 조회합니다.
  ```sh
  git tag -l
  ```
* 해당 태그의 코드를 체크아웃 합니다(예: 태그 1.7.4beta).
  ```sh
  git checkout v1.7.4beta
  ```


## 하위 모듈 업데이트

하위 모듈을 업데이트하는 방법에는 여러 가지가 있습니다. 저장소를 복제하거나 하위 모듈 디렉토리로 이동하여 [PX4에 코드 기여](#contributing_code)와 동일한 방법으로 진행합니다.

## 하위 모듈 업데이트에 대한 PR 수행
이것은 하위 모듈 X 저장소에 대한 PR을 수행하고 버그 수정/기능 추가가 하위 모듈 X의 현재 마스터에에서 요구됩니다. 펌웨어는 업데이트 전에 커밋을 가리키므로, 펌웨어에서 사용하는 하위 모듈이 최신 커밋을 가리키도록 하위 모듈 풀 요청이 필요합니다.
```sh
cd Firmware
```
* Make a new branch that describes the fix / feature for the submodule update:
  ```sh
  git checkout -b pr-some-fix
  ```
* Go to submodule subdirectory
  ```sh
  cd <path to submodule>
  ```
* PX4 submodule might not necessarily point to the newest commit. Therefore, first checkout master and pull the newest upstream code.
  ```sh
  git checkout master
  git pull upstream master
  ```
* Go back to Firmware directory, and as usual add, commit and push the changes.
  ```sh
  cd -
git add <path to submodule>
git commit -m "Update submodule to include ..."
  git push upstream pr-some-fix
  ```

## Checkout pull requests

You can test someone's pull request (changes are not yet merged) even if the branch to merge only exists on the fork from that person. Do the following
```sh
git fetch upstream  pull/<PR ID>/head:<branch name>
```
PR ID is the number right next to the PR's title (without the #) and the ```&lt;branch name&gt;``` can also be found right below the ```PR ID```, e.g. ```&lt;the other persons git name&gt;:&lt;branch name&gt;```. After that you can see the newly created branch locally with
```sh
git branch
```
Then switch to that branch
```sh
git checkout <branch name>
```

## Common pitfalls

### Force push to forked repository

After having done the first PR, people from the PX4 community will review your changes. In most cases this means that you have to fix your local branch according to the review. After changing the files locally, the feature branch needs to be rebased again with the most recent upstream/master. However, after the rebase, it is no longer possible to push the feature branch to your forked repository directly, but instead you need to use a force push:
```sh
git push --force-with-lease origin <your feature branch name>
```

### Rebase merge conflicts

If a conflict occurs during a `git rebase`, please refer to [this guide](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/).

### Pull merge conflicts

If a conflict occurs during a `git pull`, please refer to [this guide](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/#competing-line-change-merge-conflicts).

### Build error due to git tags out of date

The build error `Error: PX4 version too low, expected at least vx.x.x` occurs if git tags are out of date.

This can be solved by fetching the upstream repository tags:
```sh
git fetch upstream --tags
```

