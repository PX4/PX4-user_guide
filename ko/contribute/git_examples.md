---
canonicalUrl: https://docs.px4.io/main/ko/contribute/git_examples
---

# git 예제

<a id="contributing_code"></a>

## PX4에 코드 기여

PX4 기능 추가 절차는 다음과 같습니다. 다음 예제를 따라 PX4에 기여 결과를 공유할 수 있습니다.

* 아직 Github에 계정이 없으면, 먼저 [가입](https://github.com/join)합니다.
* Fork the PX4-Autopilot re[p (see [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
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

## 하위 모듈 업데이트에 대한 풀 요청 실행
이것은 하위 모듈 X 저장소에 대한 풀 요청을 실행하고, 버그 수정/기능 추가가 하위 모듈 X의 현재 마스터에에서 요구됩니다. 펌웨어는 업데이트 전에 커밋을 가리키므로, 펌웨어에서 사용하는 하위 모듈이 최신 커밋을 가리키도록 하위 모듈에 대한 풀 요청이 필요합니다.
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
* PX4 하위 모듈이 반드시 최신 커밋을 가리킬 필요는 없습니다. 따라서, 먼저 마스터를 체크아웃하고 최신 업스트림 코드를 가져옵니다.
  ```sh
  git checkout master
  git pull upstream master
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

첫 번째 풀 요청후에, PX4 커뮤니티의 사람들이 변경 사항을 검토합니다. 대부분의 경우 검토에 따라 로컬 지점을 수정하여야 함을 의미합니다. 파일을 로컬로 변경한 후 기능 분기를 가장 최근의 업스트림/마스터로 다시 기반으로 지정하여야 합니다. 그러나, 리베이스 후에는 더 이상 기능 분기를 분기된 저장소에 직접 푸시할 수 없지만, 대신 강제 푸시를 사용하여야 합니다.
```sh
git push --force-with-lease origin <your feature branch name>
```

### 리베이스 병합 충돌

`git rebase` 실행 중 충돌이 발생하면 [이 가이드](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/)를 참고하십시오.

### 풀 병합 충돌

`git pull` 중 충돌이 발생하면 [이 가이드](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/#competing-line-change-merge-conflicts)를 참고하십시오.

### 오래된 git 태그로 인한 빌드 오류

빌드 오류 `오류: PX4 버전이 너무 낮음, 최소 vx.x.x가 필요합니다.` git 태그가 오래된 경우 발생합니다.

이것은 업스트림 리포지토리 태그를 가져와서 해결할 수 있습니다.
```sh
git fetch upstream --tags
```

