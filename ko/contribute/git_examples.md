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
  and rebase on your updated master<br>
  ```sh
  git rebase master
  ```
* Now you can push your local commits to your forked repository<br>
  ```sh
  git push origin <your feature branch name>
  ```
* You can verify that the push was successful by going to your forked repository in your browser: `https://github.com/<your git name>/PX4-Autopilot.git`<br> There you should see the message that a new branch has been pushed to your forked repository.
* Now it's time to create a pull request (PR). On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Then it should list your changes and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/Firmware/pulls) for comparison)
* You're done! Responsible members of PX4 will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while.

## Get a Specific Release

If you prefer having a GUI to add your files see [Gitk](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Graphical-Interfaces) or [
* Clone the PX4-Autopilot repo and navigate into PX4-Autopilot directory:
  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git
  cd PX4-Autopilot
  ```
* List all releases (tags)
  ```sh
  git checkout master
git pull upstream master
  ```
* Checkout code for particular tag (e.g. for tag 1.7.4beta)
  ```sh
  git checkout v1.7.4beta
  ```


## Update Submodule

There are several ways to update a submodule. Either you clone the repository or you go in the submodule directory and follow the same procedure as in [Contributing code to PX4](#Contributing-code-to-PX4).

## Do a PR for a submodule update
This is required after you have done a PR for a submodule X repository and the bug-fix / feature-add is in the current master of submodule X. Since the Firmware still points to a commit before your update, a submodule pull request is required such that the submodule used by the Firmware points to the newest commit.
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

