---
canonicalUrl: https://docs.px4.io/main/ko/advanced/system_tunes
---

# 시스템 알림음

PX4는 중요한 시스템 상태와 문제(예: 시스템 시작, 준비 성공, 배터리 경고 등)들에 대한 오디오 알림을 위한 다양한 [표준 톤/곡](../getting_started/tunes.md)을 정의합니다.

Tunes are specified using strings (in [ANSI Music notation](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)) and played by code using the [tunes](https://github.com/PX4/PX4-Autopilot/tree/release/1.14/src/lib/tunes) library. The tunes library also contains the list of default system tunes - see [lib/tunes/tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/tunes/tune_definition.desc).

PX4에는 기본 알림음 또는 사용자 정의 알림음을 재생(테스트)하는 모듈이 있습니다.

자체 알림음을 만들고 시스템 알림음을 추가/교체하는 방법을 설명합니다.

## 알림음 만들기

알림음은 [ANSI 음악 표기법](http://artscene.textfiles.com/ansimusic/information/ansimtech.txt)을 사용하여 정의합니다.

:::tip
More information about the format can be found in [QBasic PLAY statement](https://en.wikibooks.org/wiki/QBasic/Appendix#PLAY) (Wikibooks) and has been reproduced in [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/tunes/tune_definition.desc).
:::

새로운 곡을 만드는 가장 쉬운 방법은 음악 편집기를 사용하는 것입니다. 이를 통해 음악을 편집하고 컴퓨터에서 재생한 다음 PX4에서 재생할 수 있는 형식으로 내보낼 수 있습니다.

ANSI 음악은 ANSI BBS 시스템 시대에 인기가 있었고, 최고의 편집 도구는 DOS 유틸리티입니다. On Windows, one option is to use _Melody Master_ within _Dosbox_.

소프트웨어 사용 절차는 다음과 같습니다.

1. [도스박스](http://www.dosbox.com/)를 다운로드하여 설치합니다.
1. [멜로디 마스터](ftp://archives.thebbs.org/ansi_utilities/melody21.zip)를 다운로드하고 새 디렉터리로 압축을 해제합니다.
1. Open the _Dosbox_ console
1. 멜로디 마스터 디렉터리를 아래와 같이 도스박스에서 마운트하십시오.
   ```
   mount c C:\<path_to_directory>\Melody21
   ```
1. Start _Melody Master_ with the following commands
   ```
   c:
   start
   ```
1. You will then have the option to click through a few screens, then press **1** to display _Melody Master_: ![멜로디 마스터 2.1](../../assets/tunes/tunes_melody_master_2_1.jpg)

   화면의 절반 하단부에서 도구 사용에 필요한 키보드 단축키를 안내해줍니다(악보를 움직이고 음표 길이를 선택할 수 있는 등의 작업 가능).

1. 음악을 저장할 준비가 끝나면:
   - Press **F2** to give the tune a name and save it in the _/Music_ sub folder of your Melody Master installation.
   - **F7** 키를 누른 후 우측 화면에서 하단으로 스크롤 이동하여, 출력 형식을 ANSI로 설정하십시오. The file will be exported to the _root_ of the Melody Master directory (with the same name and a file-type specific extension).
1. 파일을 여십시오. 출력 내용은 다음과 같습니다:

   ![파일 내용 안시 출력](../../assets/tunes/tune_musicmaker_ansi_output.png)

1. PX4에서 재생할 수 있는 문자열은 `MNT`와 `P64` 사이의 `150L1O3DL16CL32<B>C<AEL16A` 입니다.

## 알림음 시험

PX4에서 새로운 곡을 연주하려면, [tune_control](../modules/modules_system.md#tune-control) 라이브러리를 사용하십시오. 예를 들어, 우리가 위 과정을 거쳐 "만든" 재생음을 시험하려면 다음 명령을 콘솔 또는 셸(예: [MAVLink 셸](../debug/mavlink_shell.md))에서 입력하십시오:

```sh
tune_control play -m "150L1O3DL16CL32<B>C<AEL16A"
```

:::note
별개로, `tune_control` 이 실제 하드웨어(모의 시험 환경 아님)에 대해 유일하게 나타납니다.
:::

## 기존 알림음 변경

Tunes are defined within [tune_definition.desc](https://github.com/PX4/PX4-Autopilot/blob/release/1.14/src/lib/tunes/tune_definition.desc).

기존 알림음을 바꾸려면, 파일을 별도로 복사한 후, `PX4_DEFINE_TUNE` 에 정의한 알림음 문자열을 변경합니다.

## 새 알림음 추가

곧 추가 예정.


<!--

1. Assumption is that you need to define a new `PX4_DEFINE_TUNE` with its own number in the file.
2. Need to look at how tunes are played. Problem for another day.

-->
