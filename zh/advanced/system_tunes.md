---
canonicalUrl: https://docs.px4.io/main/zh/advanced/system_tunes
---

# 系统通知提示音

PX4 定义了一些用于为系统状态和问题提供音频通知的 [标准音符/提示音](../getting_started/tunes.md)（比如系统启动，解锁成功，电池警告等）

Tunes are specified using strings (in [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)) and played by code using the [tunes](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/lib/tunes) library. The tunes library also contains the list of default system tunes - see [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/tunes/tune_definition.desc).

PX4 还有一个模块可以用于播放（测试）默认或用户自定义音乐。

本主题提供了如何创建您自己的声音并添加/替换系统通知音调/乐曲的通用指导。


## 创建乐曲

提示音字符串使用 [ANSI 音乐提示](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt) 定义。

:::tip
More information about the format can be found in [QBasic PLAY statement](https://en.wikibooks.org/wiki/QBasic/Appendix#PLAY) (Wikibooks) and has been reproduced in [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/tunes/tune_definition.desc). 这允许您编辑乐曲并在您的电脑上播放， 然后导出为 PX4 可以播放的格式。

创建新调节的最简单方式是使用音乐编辑器。 这允许您编辑音乐并在您的电脑上播放， 然后导出为 PX4 可以播放的格式。

ANSI 音乐在 ANSI BBS 系统中很受欢迎，因此最好的编辑工具是 DOS 实用程序。 在 Windows 上，一个选择是在 *Dosbox* 内使用 *Melody Master*。

使用软件的步骤是：

1. 下载 [DosBox](http://www.dosbox.com/) 并安装应用程序
1. 下载 [Melody Master](ftp://archives.thebbs.org/ansi_utilities/melody21.zip) 并解压缩到新目录
1. 打开 *Dosbox* 控制台
1. 将 Melody 主目录挂载到 DosBox，如下：
   ```
   mount c C:\<path_to_directory\Melody21
   ```
1. 使用以下命令启动 *Melody Master*
   ```
   c:
   start
   ```
1. 您可以选择点击略过几个画面，然后按 **1** 显示*Melody Master*： ![Melody Master 2.1](../../assets/tunes/tunes_melody_master_2_1.jpg)

   屏幕的下半部分提供了关于键盘快捷键的实用工具（箭头用于移动， 和选择笔记长度的数字等）。
1. 当您准备好时保存音乐：
   - 按 **F2** 以在您的 Melody 安装目录 */Music* 子文件夹中给乐曲命名并保存。
   - 按 **F7**, 向右滚动旋钮，在输出列表选择格式，获取 ANSI。 文件将导出到 Melody 主目录的 *root*（具有相同名称和文件类型特定扩展名）。
1. 打开文件。 输出可能看起来像这样：

   ![来自文件的 ANSI 输出](../../assets/tunes/tune_musicmaker_ansi_output.png)

1. 可以在 PX4 中播放的字符串是  `MNT` 和 `P64`: `150L1O3DL16CL32<B>C<AEL16A`


## 测试乐曲

当您准备好在 PX4 上尝试新的乐曲时，请使用 [tune_control](../modules/modules_system.md#tunecontrol) 库。 例如，要测试我们在上面“创建的”乐曲，您应在控制台或 shell（例如 [MAVLink Shell](../debug/mavlink_shell.md)）上输入以下命令 ：
```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

:::note
开箱即用产品中，tune_control 只存在于实际硬件上（而不是模拟器）。
:::

## 正在替换已存在的乐曲

Tunes are defined within [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.13/src/lib/tunes/tune_definition.desc).

如果你只需要替换现有的乐曲，可以在自己的 fork 中替换文件， 并更新 `PX4_DEFINE_TUNE` 中定义的乐曲字符串。


## 添加新乐曲


待开发


<!-- 

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->