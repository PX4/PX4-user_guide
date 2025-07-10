---
canonicalUrl: https://docs.px4.io/main/zh/contribute/git_examples
---

# GIT 示例

<a id="contributing_code"></a>

## 为 PX4 贡献代码

Adding a feature to PX4 follows a defined workflow. In order to share your contributions on PX4, you can follow this example. 为了在 px4 上分享您的贡献, 您可以遵循此示例。

* 如果您还没有注册，请先[Sign up](https://github.com/join) Github 账户
* Fork the PX4-Autopilot re[p (see [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
* 将分支克隆到本地计算机<br>
  ```sh
  cd ~/wherever/
git clone https://github.com/<your git name>/Firmware.git
  ```
* Go into the new directory, initialize and update the submodules, and add the original upstream Firmware<br>
  ```sh
  cd Firmware
git submodule update --init --recursive
git remote add upstream https://github.com/PX4/Firmware.git
  ```
* You should have now two remote repositories: One repository is called upstream that points to the PX4 Firmware, and one repository that points to your forked repository of the PX4 repository.
* 这可以通过以下命令进行检查:
  ```sh
  git remote -v
  ```
* 进行要添加到当前 master 的更改。
* 使用代表您的功能的有意义的名称创建一个新分支<br>
  ```sh
  git checkout -b <your feature branch name>
  ```
  You can verify that the push was successful by going to your forked repository in your browser: `https://github.com/<your git name>/Firmware.git`  
There you should see the message that a new branch has been pushed to your forked repository.
* 通过添加相应的文件添加您希望成为提交的一部分的更改<br>
  ```sh
  git add <file name>
  ```
  If you prefer having a GUI to add your files see [Gitk](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Graphical-Interfaces) or [`git add -p`](http://nuclearsquid.com/writings/git-add/).
* 提交添加的文件, 并顺便记录一条有意义的消息, 解释您的更改<br>
  ```sh
  git commit -m "<your commit message>"
  ```
you can use the command `git branch` to make sure you're on the right branch. * Add your changes that you want to be part of the commit by adding the respective files
* Some time might have passed and the [upstream master](https://github.com/PX4/PX4-Autopilot.git) has changed. PX4 更喜欢线性提交历史记录, 并使用 [git rebase](https://git-scm.com/book/de/v1/Git-Branching-Rebasing)。 要在本地分支中包含上游的最新更改, 请切换到主分支<br>
  ```sh
  git checkout master
  ```
  然后从上游 master 中提取最新的提交<br>
  ```sh
  git pull upstream master
  ```
  Now your local master is up to date. Switch back to your feature branch 切换回您的功能分支<br>
  ```sh
  git checkout <your feature branch name>
  ```
  并根据您更新的母版重新定位<br>
  ```sh
  git rebase master
  ```
* 现在, 您可以将本地提交推送到分支版本库<br>
  ```sh
  git push origin <your feature branch name>
  ```
* For a good commit message, please refer to [Contributing](../contribute/README.md) section. * Some time might have passed and the [upstream master](https://github.com/PX4/Firmware.git) has changed. PX4 prefers a linear commit history and uses [git rebase](https://git-scm.com/book/de/v1/Git-Branching-Rebasing). To include the newest changes from upstream in your local branch, switch to your master branch
* 现在是时候创建一个拉取请求 (PR) 了。 Now it's time to create a pull request (PR). On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Then it should list your changes and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/Firmware/pulls) for comparison) 然后, 它应该列出你的更改，你必须添加一个有意义的标题 (在提交 PR 的情况下, 它通常是提交消息) 和消息 (<span style="color:orange">解释你做了这些更改的原因 </span>， 检查 [其他拉取请求 ](https://github.com/PX4/PX4-Autopilot/pulls) 进行比较)。
* 搞定！ You're done! Responsible members of PX4 will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while. 每过一段时间，他们会检查你的更改，以确保没有疑义。

## 更新子模块

If you prefer having a GUI to add your files see [Gitk](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Graphical-Interfaces) or [
* Clone the PX4-Autopilot repo and navigate into PX4-Autopilot directory:
  ```sh
  git clone https://github.com/PX4/PX4-Autopilot.git
  cd PX4-Autopilot
  ```
* 列出所有发行版本（标签）
  ```sh
  git checkout master
git pull upstream master
  ```
* 迁出特定tag的代码（比如 tag为 1.7.4的beta版本）
  ```sh
  git checkout v1.7.4beta
  ```


## 更新子模块

有几种方法可以更新子模块。 There are several ways to update a submodule. Either you clone the repository or you go in the submodule directory and follow the same procedure as in [Contributing code to PX4](#Contributing-code-to-PX4).

## 为子模块更新执行 PR
这是在您为子模块 x 存储库做了 PR 之后所必需的, 并且错误修复/功能添加在子模块 x 的当前主控件中。由于固件仍指向更新之前的提交, 因此需要一个子模块拉取请求, 以便固件使用的子模块指向最新提交。
```sh
cd Firmware
```
* 创建一个分支，描述子模块更新的 bug 修复/功能：
  ```sh
  git checkout -b pr-some-fix
  ```
* 进入子模块的子目录
  ```sh
  cd <path to submodule>
  ```
* PX4 submodule might not necessarily point to the newest commit. Therefore, first checkout master and pull the newest upstream code. 因此，先 checkout master 并且拉取最新的上游代码。
  ```sh
  cd -
git add <path to submodule>
git commit -m "Update submodule to include ..."
git push upstream pr-some-fix
  ```
* 回到 Firmware 目录，如往常一样添加、提交和上推更改。
  ```sh
  cd -
  git add <path to submodule>
  git commit -m "Update submodule to include ..."
  git push upstream pr-some-fix
  ```

## 查看拉取请求

You can test someone's pull request (changes are not yet merged) even if the branch to merge only exists on the fork from that person. Do the following 执行以下指令：:
```sh
git fetch upstream  pull/<PR ID>/head:<branch name>
```
PR ID is the number right next to the PR's title (without the #) and the ```&lt;branch name&gt;``` can also be found right below the ```PR ID```, e.g. ```&lt;the other persons git name&gt;:&lt;branch name&gt;```. After that you can see the newly created branch locally with 之后, 您可以看到新创建的分支在本地
```sh
git branch
```
然后切换到那个分支
```sh
git checkout <branch name>
```

## 常见错误

### 强制推送到分叉存储库

做完第一个 PR 后, 来自 PX4 社区的人将回顾你的更改。 在大多数情况下, 这意味着您必须根据评审来修复本地分支。 在本地更改文件后, 需要使用最新的 uperecle1 主服务器重新定位功能分支。 但是, 在重新建立基础后, 不再可能将特征分支直接推送到分叉存储库, 而是需要使用强制推送:
```sh
git push --force-with-lease origin <your feature branch name>
```

### 重新建立合并冲突

If a conflict occurs during a `git rebase`, please refer to [this guide](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/).

### 拉取合并冲突

If a conflict occurs during a `git pull`, please refer to [this guide](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/#competing-line-change-merge-conflicts).

### Build error due to git tags out of date

After having done the first PR, people from the PX4 community will review your changes. In most cases this means that you have to fix your local branch according to the review. After changing the files locally, the feature branch needs to be rebased again with the most recent upstream/master. However, after the rebase, it is no longer possible to push the feature branch to your forked repository directly, but instead you need to use a force push:

This can be solved by fetching the upstream repository tags:
```sh
git add -p](http://nuclearsquid.com/writings/git-add/). * Commit the added files with a meaningful message explaining your changes
```

