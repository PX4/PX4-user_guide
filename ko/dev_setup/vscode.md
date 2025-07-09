---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/vscode
---

# 비주얼 스튜디오 코드 IDE(VSCode)

[Visual Studio Code](https://code.visualstudio.com/)는 Ubuntu 18.04 LT, macOS 및 Windows에서 PX4 개발에 사용할 수 있는 강력한 플랫폼 간 소스 코드 편집기/IDE입니다.

PX4 개발에 VSCode를 사용하는 데에는 많은 이유가 있습니다.
- 설치 시간은 *실제* 몇 분 밖에 걸리지 않습니다.
- PX4 개발에 필요한 여러가지 도구를 지원하는 다양한 확장 시스템: C/C++(견고한 *cmake* 통합 포함), *Python*, *Jinja2* , ROS 메시지, 심지어 UAVCAN dsdl.
- 뛰어난 Github 통합 기능

IDE를 설정과 개발 방법에 대하여 설명합니다.

:::note
다른 강력한 IDE가 있지만, 일반적으로 PX4와 통합에는 많은 어려움이 있습니다.
:::note
다른 강력한 IDE가 있지만, 일반적으로 PX4와 통합에는 많은 어려움이 있습니다.
:::

## 선행 조건

플랫폼에 대한 명령줄 [PX4 개발자 환경](../dev_setup/dev_env.md)을 이미 설치하고, *펌웨어* 소스 코드 저장소를 복제하여야 합니다.

## 설치 및 설정

1. [VSCode 다운로드 및 설치](https://code.visualstudio.com/)(사용자의 OS에 맞는 버전이 제공됨).
1. VSCode를 열고 PX4 소스 코드를 추가합니다.
   - 시작 페이지에서 *폴더 열기 ...*를 클릭합니다(또는 메뉴: **파일 > 폴더 열기** 사용): ![폴더 열기](../../assets/toolchain/vscode/welcome_open_folder.jpg)
   - 파일 선택창이 나타납니다. **PX4-Autopilot** 디렉토리를 선택하고, **확인**을 누릅니다.

   그러면 프로젝트 파일과 설정이 *VSCode*에 로드됩니다.
1. *이 작업 공간에는 확장 권장 사항이 있습니다* 프롬프트에서 **모두 설치**를 누릅니다(IDE의 오른쪽 하단에 표시됨). ![확장 기능 설치](../../assets/toolchain/vscode/prompt_install_extensions.jpg)

   VSCode는 설치 진행 상황을 볼 수 있도록 왼쪽에 *확장 프로그램* 패널을 엽니다.

   ![VSCode 탐색기에 로드된 PX4](../../assets/toolchain/vscode/installing_extensions.jpg)
1. 오른쪽 하단에 여러 알림/프롬프트가 나타날 수 있습니다.

   :::tip
메시지가 사라지면, 하단 파란색 막대 오른쪽에 있는 작은 "알람" 아이콘을 클릭합니다.
:::

   - 새 버전의 *cmake*를 설치하라는 메시지가 표시되면:
     - **아니요**라고 말합니다([PX4 개발자 환경](../dev_setup/dev_env.md)과 함께 올바른 버전이 설치됨).
   - *github.com*에 로그인하고 자격 증명을 추가하라는 메시지가 표시되면:
     - 이것은 당신에게 달려 있습니다! Github와 IDE 간의 긴밀한 통합을 제공하여 워크플로를 단순화할 수 있습니다.
   - 다른 프롬프트는 선택 사항이며 유용하다고 생각되면 설치할 수 있습니다. <!-- perhaps add screenshot of these prompts -->


<a id="building"></a>

## PX4 빌드

빌드를 진행하려면:
1. 빌드 대상 선택("cmake build config"):
   - 현재 *cmake 빌드 대상*은 하단의 파란색 *구성* 표시줄에 표시됩니다(이미 원하는 대상인 경우 다음 단계로 건너뛰십시오). ![Cmake 빌드 대상 선택](../../assets/toolchain/vscode/cmake_build_config.jpg)

:::note
선택한 cmake 대상은 [빌드/디버깅](#debugging)시 제공되는 대상에 영향을 줍니다(즉, 하드웨어 디버깅의 경우 `px4_fmu-v5`와 같은 하드웨어 대상을 선택하여야 함).
:::
   - 구성 표시줄에서 대상을 클릭하여 다른 옵션을 표시하고 원하는 옵션을 선택합니다(선택한 대상을 대체함).
   - 그러면, *Cmake*가 프로젝트를 구성합니다(오른쪽 하단의 알림 참조). ![Cmake 설정 프로젝트](../../assets/toolchain/vscode/cmake_configuring_project.jpg)
   - 구성이 완료될 때까지 기다리십시오. 이 작업이 완료되면 알림이 사라지고 빌드 위치가 표시됩니다.
1. 그런 다음 구성 표시줄에서 빌드를 시작할 수 있습니다(**빌드** 또는 **디버그** 선택). ![디버깅 또는 빌드 실행](../../assets/toolchain/vscode/run_debug_build.jpg)

한 번 이상 빌드하면 이제 \[코드 완성\](#코드 완성) 및 기타 *VSCode* 기능을 사용할 수 있습니다.


## 디버깅

<a id="debugging_sitl"></a>

### SITL 디버깅

SITL에서 PX4를 디버깅하려면:
1. 사이드바에서 디버그 아이콘(빨간색으로 표시)을 선택하여 디버그 패널을 표시합니다.![디버깅 실행](../../assets/toolchain/vscode/vscode_debug.jpg)

1. 그런 다음 상단 표시줄 디버그 드롭다운(보라색 상자)에서 디버그 대상(예: *디버그 SITL(Gazebo Iris)*)을 선택합니다.

   :::note
제공되는 디버그 대상(보라색 상자)은 빌드 대상(하단 막대의 노란색 상자)과 일치합니다.
예를 들어, SITL 대상을 디버그하려면 빌드 대상에 SITL이 포함되어야 합니다.
:::
1. 디버그 "재생" 화살표(상단 막대의 디버그 대상 옆 - 분홍색 상자)를 클릭하여 디버깅을 시작합니다.

디버깅하는 동안 중단점을 설정하고, 코드를 건너뛰고, 그렇지 않으면 정상적으로 개발할 수 있습니다.

### 하드웨어 디버깅

The instructions in [SWD Debug Port](../debug/swd_debug.md) explain how to connect to the SWD interface on common flight controllers (for example, using the Dronecode or Blackmagic probes).

SWD 인터페이스에 연결한 후 VSCode의 하드웨어 디버깅은 디버거 유형(및 펌웨어)(예: `jlink (px4_fmu-v5)`)에 적합한 디버그 대상을 선택한다는 점을 제외하고 [SITL 디버깅](#debugging_sitl)과 동일합니다.

:::tip
`jlink` 옵션을 보려면 [펌웨어 빌드를 위한 cmake 대상](#building-px4)을 선택하여야 합니다.
:::

![다양한 프로브에 대한 옵션이 있는 하드웨어 대상을 보여주는 이미지](../../assets/toolchain/vscode/vscode_hardware_debugging_options.png)


<a id="code completion"></a>

## 코드 완성

코드 완성(및 기타 IntelliSense 마법)이 작동하려면 활성화 설정후, [코드를 빌드](#building)하여야 합니다.

이 작업이 완료되면 다른 작업을 수행할 필요가 없습니다. 툴체인은 입력시 자동으로 기호를 제공합니다.

![인텔리센스](../../assets/toolchain/vscode/vscode_intellisense.jpg)

## 문제 해결

이 섹션에는 설정 및 빌드 오류에 대한 지침이 포함되어 있습니다.

### Ubuntu 18.04: "Visual Studio Code는 이 큰 작업 영역에서 파일 변경 사항을 감시할 수 없습니다."

이 오류는 시작시에 나타납니다. 일부 시스템에서는 애플리케이션에 적용되는 파일 핸들의 상한선이 8192개이므로 VSCode가 `/PX4-Autopilot`에서 파일 수정 사항을 감지하지 못할 수 있습니다.

메모리 소비를 희생시키면서 오류를 방지하기 위해 이 제한을 늘릴 수 있습니다. [여기에 있는 지침](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc)을 따르십시오. 값 65536이면 충분합니다.
