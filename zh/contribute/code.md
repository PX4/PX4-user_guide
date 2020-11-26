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
* [astyle 3.01](https://sourceforge.net/projects/astyle/files/)

一旦安装完毕，格式化可以使用 `.工具/astyle/check_code_style_all.sh`。 一个干净的 master 分支的输出应该是 `格式检查通过`。 如果做到这一点，`制作格式`将来可以自动检查和格式化所有文件。

## 源文件

鼓励PX4开发者创建适当的源文档。

> **Note** 源代码文件标准没有得到执行，目前该代码的文件记录不一致。 我们想做得更好！

目前，我们有两种基于来源的文件：
- `PRINT_MODULE_*` methods are used for both module run time usage instructions and for the [Modules & Commands Reference](../modules/modules_main.md) in this guide.
  - API 记录在 [源代码](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381)。
  - 使用的良好例子包括在 [应用程序/模块模板](../apps/module_template.md) 以及从模块引用链接的文件。
* 我们鼓励其它源文档 *添加必要的值*。

  > **Tip** 开发者应命名C++ 实体 (类、函数、变量等)，从而可以推断其目的――减少对明确文档的需求。

  - 不要添加可以从 C++ 实体名称零碎地推断出的文档。
  - 通常您可能想要添加关于 corner cases 和错误处理的信息。
  - [Doxgyen](http://www.doxygen.nl/)如果需要文件，应使用标签：`@class`，`@file`，`@param`，`@return`，`@var`，`@see`，`@note`，`@note`。 一个很好的用法例子是 [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/master/src/modules/events/send_event.h)。

## 提交和提交消息

请对所有详细的更改使用描述、多段提交消息。 即使结构安排得很好，从一行摘要中看得出，但也提供了详尽的细节。

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

**使用** `git commit -s` ** 来登录您的所有提交。** 这将添加 `签名-退出：`，您的姓名和电子邮件作为最后一行。

本提交指南基于 Linux Kernel 和 Linus Torvald 维护的 [项目的最佳做法](https://github.com/torvalds/subsurface/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115)。
