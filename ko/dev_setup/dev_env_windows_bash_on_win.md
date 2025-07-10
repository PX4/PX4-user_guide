---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_windows_bash_on_win
---

# Windows WSL 기반 개발 환경

:::warning
이 개발 환경은 [지원되지 않습니다](../advanced/dev_env_unsupported.md). See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools we do support!
:::

Windows 사용자는 대안으로 [Bash on Windows](https://github.com/Microsoft/BashOnWindows) 내에 *약간 수정된* Ubuntu Linux PX4 개발 환경을 설치하고 이를 사용하여 다음을 수행할 수 있습니다.
* NuttX/Pixhawk 대상 펌웨어를 빌드합니다.
* PX4 JMAVSim 시뮬레이션 실행(Windows 호스팅 X-Windows 앱을 사용하여 UI 표시)합니다.

:::note
이 방법은 Windows 10에서만 작동합니다. 가상 머신에서 도구 체인을 실행하며, 다른 솔루션에 비해 조금 느립니다.
:::

### 환경 설정

환경을 설정하는 가장 편리한 방법은 <strong><a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh" target="_blank" download>windows_bash_nuttx.sh</a></strong> 스크립트를 사용하는 것입니다(스크립트에 대한 자세한 내용은 [아래 참조](#build_script_details)). <!-- NEED px4_version -->

개발 환경을 설정합니다.
1. [Windows용 Bash](https://github.com/Microsoft/BashOnWindows)를 설치합니다.
1. bash 쉘을 실행합니다.
1. **windows_bash_nuttx.sh** 다운로드:<br> `wget https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh` <!-- NEED px4_version -->
1. 아래 명령을 사용하여 스크립트를 실행합니다(필요에 따라 프롬프트 확인).
  ```sh
  bash windows_bash_nuttx.sh
  ```

### 펌웨어를 빌드합니다.

펌웨어를 빌드합니다(예: px4_fmu-v4용).
1. bash 쉘에서 다음 명령을 실행합니다.
   ```
   cd ~/src/PX4-Autopilot
   make px4_fmu-v4_default
   ```
   성공적으로 완료되면 여기에서 펌웨어를 조회할 수 있습니다. `PX4-Autopilot/build/px4_fmu-v4_default/px4_fmu-v4_default.px4`

:::note
다른 보드용 펌웨어를 빌드하기 위한 `make` 명령은 [코드 빌드](../dev_setup/building_px4.md#nuttx-pixhawk-based-boards)를 참고하십시오.
:::

1. *QGroundControl*이나 *Mission Planner*를 사용하여 Windows에서 사용자 정의 펌웨어를 플래시할 수 있습니다. (`upload` 명령을 사용하여 bash 쉘에서 펌웨어를 직접 플래시할 수 없습니다.)


### 시뮬레이션(JMAVSim)

Windows용 Bash는 UI 라이브러리를 포함하지 않습니다. jMAVSim UI를 표시하려면, [XMing](https://sourceforge.net/projects/xming/)과 같은 X-Window 서버를 Windows에 설치하여야 합니다.

JMAVSim을 실행합니다.
1. Windows에서 [XMing](https://sourceforge.net/projects/xming/)을 설치하고 실행합니다.
1. bash 쉘에서 다음 명령어를 실행합니다.
   ```sh
   export DISPLAY=:0
   ```

:::tip
Bash 세션마다 입력하지 않으려면, 이 줄을 Ubuntu **.bashrc** 파일에 추가합니다.
:::
1. bash 쉘에서 PX4와  jMAVSim을 실행합니다.
   ```sh
   make px4_sitl jmavsim
   ```
   그러면 JMAVSim UI가 아래와 같이 XMing에 표시됩니다.

   ![윈도우 환경의 jMAVSim](../../assets/simulation/jmavsim_on_windows.png)

:::warning
Gazebo는 Windows용 Ubuntu Bash 내에서 실행할되지만, 너무 느려서 유용하지 않습니다. 이를 시도하려면 [ROS kinetic 설치 가이드](http://wiki.ros.org/kinetic/Installation/Ubuntu)를 따라, 다음과 같이 Bash 셸에서 Gazebo를 실행하십시오.
```sh
export DISPLAY=:0
export GAZEBO_IP=127.0.0.1
make px4_sitl gazebo
```
:::

<a id="build_script_details"></a>

### 빌드 스크립트 세부 정보

<a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh">windows_bash_nuttx.sh</a> <!-- NEED px4_version --> 빌드 스크립트는 Ubuntu 빌드 지침을 수정하여 Ubuntu 관련 구성 요소, *Qt Creator* IDE 및 시뮬레이터를 포함하여 UI 종속 구성 요소를 제거합니다.

또한 BashOnWindows는 32비트 ELF 프로그램(및 `https://launchpad.net/gcc-의 기본 컴파일러)을 실행할 수 없으므로, <a href="https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-.git">64비트 arm-none-eabi 컴파일러</a>를 사용합니다. </p>

<p spaces-before="0">이 컴파일러를 환경에 수동으로 추가합니다.</p>

<ol start="1">
<li><p spaces-before="0">컴파일러를 다운로드합니다.
<pre><code class="sh">   wget https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-/raw/master/gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2
`</pre></li>
1
Windows용 Bash 쉘에서 다음 명령어를 실행하여 압축을 해제합니다.
   ```sh
   tar -xvf gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2
   ```
   이것은 arm gcc 크로스 컴파일러의 압축을 해제합니다.
   ```
   gcc-arm-none-eabi-5_4-2017q2/bin
   ```
1
환경에 추가(변경 사항을 영구적으로 만들기 위해 bash 프로필에 행 추가)합니다.
   ```
   export PATH=$HOME/gcc-arm-none-eabi-5_4-2017q2/bin:$PATH
   ```
</ol>
