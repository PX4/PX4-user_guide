# 系统通知提示音

PX4 定义了一些用于为系统状态和问题提供音频通知的 [标准音符/提示音](../getting_started/tunes.md)（比如系统启动，解锁成功，电池警告等）

提示音使用字符串来指定（[ANSI 音乐通知](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)），并使用 [tunes](https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/tunes) 库播放这些编码。 乐曲库也包含默认系统调节列表——见 [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc)。

PX4还有一个模块可以用于播放（测试）默认或用户自定义音乐。

本主题提供了如何创建您自己的声音并添加/替换系统通知音调/乐曲的通用指导。


## 创建乐曲

提示音字符串使用 [ANSI 音乐提示](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt) 定义。

创建新乐曲的最简单方式是使用音乐编辑器。 这允许您编辑乐曲并在您的电脑上播放， 然后导出为 PX4 可以播放的格式。

ANSI 音乐在 ANSI BBS 系统中很受欢迎，因此最好的编辑工具是 DOS 实用程序。 在 Windows 上，一个选项是在 *Dosbox* 内使用 *Melody Master*。

ANSI music was popular in the days of ANSI BBS systems, and so the best editing tools are DOS utilities. On Windows, one option is to use *Melody Master* within *Dosbox*.

The steps for using the software are:

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
1. 打开文件。 内容应该像这样：

   ![ANSI Output from file](../../assets/tunes/tune_musicmaker_ansi_output.png)

1. 可以在 PX4 中播放的字符串是  `MNT` 和 `P64`: `150L1O3DL16CL32<B>C<AEL16A`


## 测试乐曲

When you're ready to try it out a new tune on PX4, use the [tune_control](../modules/modules_system.md#tunecontrol) library. For example, to test the tune we "created" above you would enter the following command on a console or shell (e.g. the [MAVLink Shell](../debug/mavlink_shell.md)):
```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

:::note
Out of the box, the `tune_control` is only present on real hardware (not the simulator).
:::

## 正在替换已存在的乐曲

待开发

If you just need to replace an existing tune, then you can replace the file in your own fork, and update the tune strings defined in `PX4_DEFINE_TUNE`.


## 添加新乐曲


TBD.


<!-- 

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->