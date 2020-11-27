# 시스템 알림음

PX4는 중요한 시스템 상태와 문제를 음성으로 알리는 여러가지 [표준 알림음](../getting_started/tunes.md)을 지정해두었습니다(예시: 시스템 시작, 이륙 준비 완료, 배터리 경고 등)

알림음은 문자열([안시 악보 표기](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt))로 정의하며 [튠즈](https://github.com/PX4/PX4-Autopilot/tree/master/src/lib/tunes) 라이브러리를 통해 코드로 재생합니다. 튠즈 라이브러리에는 기본 시스템 음 목록이 들어있습니다. 해당 내용은 [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc) 파일을 참고하십시오.

PX4에는 기본음 또는 사용자 지정음을 재생(시험)할 때 활용할 모듈이 있습니다.

이 주제에서는 알림음을 만들고 시스템 알림 음으로 추가하는 일반 과정을 안내해드리겠습니다.


## 알림음 만들기

음 문자열은 [안시 악보 표기 방식](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)으로 정의합니다.

> **Tip** 형식에 대한 자세한 정보는 [QBasic PLAY 구문](https://en.wikibooks.org/wiki/QBasic/Appendix#PLAY)(위키북스)에서 찾아볼 수 있으며, [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc) 파일로 확인할 수 있습니다.

The easiest way to create a new tune is to use a music editor. This allows you to edit the music and play it back on your computer, then export it to a format that can be played by PX4.

ANSI music was popular in the days of ANSI BBS systems, and so the best editing tools are DOS utilities. On Windows, one option is to use *Melody Master* within *Dosbox*.

The steps for using the software are:

1. Download [DosBox](http://www.dosbox.com/) and install the app
1. Download [Melody Master](ftp://archives.thebbs.org/ansi_utilities/melody21.zip) and unzip into a new directory
1. Open the *Dosbox* console
1. Mount the melody master directory in Dosbox as shown below:
   ```
   mount c C:\<path_to_directory\Melody21
   ```
1. Start *Melody Master* with the following commands
   ```
   c:
   start
   ```
1. You will then have the option to click through a few screens, then press **1** to display *Melody Master*: ![Melody Master 2.1](../../assets/tunes/tunes_melody_master_2_1.jpg)

   The lower half of the screen provides helpful advice on keyboard shortcuts for using the tool (arrows for moving in stave, and numbers for selecting the note length, etc.).
1. When you're ready to save the music:
   - Press **F2** to give the tune a name and save it in the */Music* sub folder of your Melody Master installation.
   - Press **F7**, the scroll down the list of output formats on the right to get to ANSI. The file will be exported to the *root* of the Melody Master directory (with the same name and a file-type specific extension).
1. Open the file. The output might look like this:

   ![ANSI Output from file](../../assets/tunes/tune_musicmaker_ansi_output.png)

1. The string that can be played in PX4 is the bit between `MNT` and `P64`: `150L1O3DL16CL32<B>C<AEL16A`


## Testing Tunes

When you're ready to try it out a new tune on PX4, use the [tune_control](../modules/modules_system.md#tunecontrol) library. For example, to test the tune we "created" above you would enter the following command on a console or shell (e.g. the [MAVLink Shell](../debug/mavlink_shell.md)):
```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

> **Note** Out of the box, the tune_control is only present on real hardware (not the simulator).


## Replacing Existing Tunes

Tunes are defined within [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/master/src/lib/tunes/tune_definition.desc).

If you just need to replace an existing tune, then you can replace the file in your own fork, and update the tune strings defined in `PX4_DEFINE_TUNE`.


## Adding a New Tune


TBD.


<!-- 

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->