---
canonicalUrl: https://docs.px4.io/main/zh/contribute/code
---

# 源代码管理

## 分支模型

PX4 项目使用三分支 Git 模型：

* [master](https://github.com/PX4/PX4-Autopilot/tree/master) 默认是不稳定版本， 用于快速开发。
* [beta](https://github.com/PX4/PX4-Autopilot/tree/beta) 经过全面测试。 它是供飞行测试人员使用的。
* [stable](https://github.com/PX4/PX4-Autopilot/tree/stable) 是最新发行版本。

我们试着 [通过重置保留线性历史](https://www.atlassian.com/git/tutorials/rewriting-history)，并且避免 [Github flow](https://guides.github.com/introduction/flow/)。 然而，由于全球团队和快速的发展，我们可能有时会进行合并。

要贡献新功能，[注册Github](https://help.github.com/articles/signing-up-for-a-new-github-account/)，然后 [fork](https://help.github.com/articles/fork-a-repo/) 仓库，[创建一个新分支](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/)，添加您的更改，最后 [发送拉取请求](https://help.github.com/articles/using-pull-requests/)。 更改将在通过我们的 [持续整合](https://en.wikipedia.org/wiki/Continuous_integration) 测试时合并。

所有代码贡献都必须在许可的 [BSD 3 条款的许可证 ](https://opensource.org/licenses/BSD-3-Clause) 下进行，不得对其使用施加任何进一步的限制。

## 代码样式格式

PX4 使用 [asty](http://astyle.sourceforge.net/) 进行代码格式化。 有效版本是
* [astyle 2.06](https://sourceforge.net/projects/astyle/files/astyle/astyle%202.06/)（推荐）
* [astyle 3.0](https://sourceforge.net/projects/astyle/files/astyle/astyle%203.0/)
* [astyle 3.01](https://sourceforge.net/projects/astyle/files/) (recommended)

一旦安装完毕，格式化可以使用 `.工具/astyle/check_code_style_all.sh`。 一个干净的 master 分支的输出应该是 `格式检查通过`。 如果做到这一点，`制作格式`将来可以自动检查和格式化所有文件。

## 源文件

鼓励PX4开发者创建适当的源文档。

- C++ source files should be named in CamelCase and match the class name. E.g. A C++ file containing a class named `FooThing` should be named `FooThing.cpp`.
- C++ header files should be named the same as source files except have the suffix `.hpp`.
- C++ header files that are required to be C compatible, should have the suffix `.h`.
- Folder names are `snake_case` for the first level inside `modules`/`drivers`/`systemcmds`/etc. but should be named CamelCase when more deeply nested to match the source and header files.
- Test files must have a `Test` suffix as shown: `FooThingTest.cpp`.

- One exception to the rules above are the MAVLink streams in [src/modules/mavlink/streams](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mavlink/streams) which are ALL_UPPERCASE.hpp matching the MAVLink message name.

## 提交和提交消息

PX4 developers are encouraged to create appropriate in-source documentation.

:::note
Source-code documentation standards are not enforced, and the code is currently inconsistently documented. We'd like to do better!
:::

Currently we have two types of source-based documentation:
- `PRINT_MODULE_*` methods are used for both module run time usage instructions and for the [Modules & Commands Reference](../modules/modules_main.md) in this guide.
  - The API is documented [in the source code here](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381).
  - Good examples of usage include the [Application/Module Template](../modules/module_template.md) and the files linked from the modules reference.
* We encourage other in-source documentation *where it adds value/is not redundant*.

:::tip
Developers should name C++ entities (classes, functions, variables etc.) such that their purpose can be inferred - reducing the need for explicit documentation.
:::

  - Do not add documentation that can trivially be assumed from C++ entity names.
  - Commonly you may want to add information about corner cases and error handling.
  - [Doxgyen](http://www.doxygen.nl/) tags should be used if documentation is needed: `@class`, `@file`, `@param`, `@return`, `@brief`, `@var`, `@see`, `@note`. A good example of usage is [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/events/send_event.h).

## Commits and Commit Messages

Please use descriptive, multi-paragraph commit messages for all non-trivial changes. Structure them well so they make sense in the one-line summary but also provide full detail.

```
组成部分：在一个句子中解释这一更改。 修复 #1234

将软件组件添加到摘要行的开头，或者通过模块名称或它的描述。
(例如，"mc_att_ctrl" 或 "multicopter 姿态控制器")。

如果问题编号作为<Fixes #1234>添加，Github 将在提交合并到主分支时自动关闭问题。

电文正文可以包含几个段落。
详细描述您的变更。 链接问题和飞行日志或与此项提交的测试结果有关联。

描述这个变化以及你为什么做了修改，而不是只有代码更改内容 (很好: "为低质量GPS 接收的车辆添加额外
安全检查"。
坏: "添加 gps_reception_check() 函数").

已上报：名字 <email@px4.io>
```

**Use **`git commit -s`** to sign off on all of your commits.** This will add `signed-off-by:` with your name and email as the last line.

This commit guide is based on best practices for the Linux Kernel and other [projects maintained](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115) by Linus Torvalds.
