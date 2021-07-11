# 비주얼 스튜디오 코드 IDE(VSCode)

[Visual Studio Code](https://code.visualstudio.com/)는 Ubuntu 18.04 LT, macOS 및 Windows에서 PX4 개발에 사용할 수 있는 강력한 플랫폼 간 소스 코드 편집기/IDE입니다.

PX4 개발에 VSCode를 사용하는 데에는 많은 이유가 있습니다.
- 설치 시간은 *실제* 몇 분 밖에 걸리지 않습니다.
- PX4 개발에 필요한 여러가지 도구를 지원하는 다양한 확장 시스템: C/C++(견고한 *cmake* 통합 포함), *Python*, *Jinja2* , ROS 메시지, 심지어 UAVCAN dsdl.
- 뛰어난 Github 통합 기능

IDE를 설정과 개발 방법에 대하여 설명합니다.

:::note
다른 강력한 IDE가 있지만, 일반적으로 PX4와 통합에는 많은 어려움이 있습니다. *VScode*를 사용하면 설정이 PX4/PX4-Autopilot 트리([PX4-Autopilot/.vscode](https://github.com/PX4/PX4-Autopilot/tree/master/.vscode))에 저장되므로, 설정 프로세스는 프로젝트 폴더를 추가하는 것만큼 간단합니다.
:::

## 선행 조건

플랫폼에 대한 명령줄 [PX4 개발자 환경](../dev_setup/dev_env.md)을 이미 설치하고, *펌웨어* 소스 코드 저장소를 복제하여야 합니다.

## 설치 및 설정

1. [VSCode 다운로드 및 설치](https://code.visualstudio.com/)(사용자의 OS에 맞는 버전이 제공됨).
1. VSCode를 열고 PX4 소스 코드를 추가합니다.
   - 시작 페이지에서 *폴더 열기 ...*를 클릭합니다(또는 메뉴: **파일 > 폴더 열기** 사용): ![Open Folder](../../assets/toolchain/vscode/welcome_open_folder.jpg)
   - 파일 선택창이 나타납니다. **PX4-Autopilot** 디렉토리를 선택하고, **확인**을 누릅니다.

   그러면 프로젝트 파일과 설정이 *VSCode*에 로드됩니다.
1. *이 작업 공간에는 확장 권장 사항이 있습니다* 프롬프트에서 **모두 설치**를 누릅니다(IDE의 오른쪽 하단에 표시됨). ![Install extensions](../../assets/toolchain/vscode/prompt_install_extensions.jpg)

   VSCode는 설치 진행 상황을 볼 수 있도록 왼쪽에 *확장 프로그램* 패널을 엽니다.

   ![PX4 loaded into VSCode Explorer](../../assets/toolchain/vscode/installing_extensions.jpg)
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
   - The current *cmake build target* is shown on the blue *config* bar at the bottom (if this is already your desired target, skip to next step). ![Select Cmake build target](../../assets/toolchain/vscode/cmake_build_config.jpg)

:::note
The cmake target you select affects the targets offered for when [building/debugging](#debugging) (i.e. for hardware debugging you must select a hardware target like `px4_fmu-v5`).
:::
   - Click the target on the config bar to display other options, and select the one you want (this will replace any selected target).
   - *Cmake* will then configure your project (see notification in bottom right). ![Cmake config project](../../assets/toolchain/vscode/cmake_configuring_project.jpg)
   - Wait until configuration completes. When this is done the notification will disappear and you'll be shown the build location: ![Cmake config project](../../assets/toolchain/vscode/cmake_configuring_project_done.jpg).
1. You can then kick off a build from the config bar (select either **Build** or **Debug**). ![Run debug or build](../../assets/toolchain/vscode/run_debug_build.jpg)

After building at least once you can now use \[code completion\](#code completion) and other *VSCode* features.


## Debugging

<a id="debugging_sitl"></a>

### SITL Debugging

To debug PX4 on SITL:
1. Select the debug icon on the sidebar (marked in red) to display the debug panel. ![Run debug](../../assets/toolchain/vscode/vscode_debug.jpg)

1. Then choose your debug target (e.g. *Debug SITL (Gazebo Iris)*) from the top bar debug dropdown (purple box).

:::note
The debug targets that are offered (purple box) match your build target (yellow box on the bottom bar). For example, to debug SITL targets, your build target must include SITL.
:::
1. Start debugging by clicking the debug "play" arrow (next to the debug target in the top bar - pink box).

While debugging you can set breakpoints, step over code, and otherwise develop as normal.

### Hardware Debugging

The instructions in [SWD (JTAG) Hardware Debugging Interface](../debug/swd_debug.md) explain how to connect to the SWD interface on common flight controllers (for example, using the Dronecode or Blackmagic probes).

After connecting to the SWD interface, hardware debugging in VSCode is then the same as for [SITL Debugging](#debugging_sitl) except that you select a debug target appropriate for your debugger type (and firmware) - e.g. `jlink (px4_fmu-v5)`.

:::tip
To see the `jlink` option you must have selected a [cmake target for building firmware](#building-px4).
:::

![Image showing hardware targets with options for the different probes](../../assets/toolchain/vscode/vscode_hardware_debugging_options.png)

<a id="code completion"></a>

## Code Completion

In order for the code completion to work (and other IntelliSense magic) you need an active configuration and to have [built the code](#building).

Once that is done you don't need to do anything else; the toolchain will automatically offer you symbols as you type.

![IntelliSense](../../assets/toolchain/vscode/vscode_intellisense.jpg)

## Troubleshooting

This section includes guidance on setup and build errors.

### Ubuntu 18.04: "Visual Studio Code is unable to watch for file changes in this large workspace"

This error surfaces on startup. On some systems, there is an upper-limit of 8192 file handles imposed on applications, which means that VSCode might not be able to detect file modifications in `/PX4-Autopilot`.

You can increase this limit to avoid the error, at the expense of memory consumption. Follow the [instructions here](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc). A value of 65536 should be more than sufficient.
