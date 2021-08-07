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

   ![jMAVSimOnWindows](../../assets/simulation/jmavsim_on_windows.png)

:::warning
Gazebo can similarly be run within Ubuntu Bash for Windows, but too slow to be useful. To try this, follow the [ROS kinetic install guide](http://wiki.ros.org/kinetic/Installation/Ubuntu) and run Gazebo in the Bash shell as shown:
```sh
export DISPLAY=:0
export GAZEBO_IP=127.0.0.1
make px4_sitl gazebo
```
:::

<a id="build_script_details"></a>

### Build Script Details

The <a href="https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/windows_bash_nuttx.sh">windows_bash_nuttx.sh</a> <!-- NEED px4_version --> build script modifies the Ubuntu build instructions to remove Ubuntu-specific and UI-dependent components, including the *Qt Creator* IDE and the simulators.

In addition, it uses a [64 bit arm-none-eabi compiler](https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-.git) since BashOnWindows doesn't run 32 bit ELF programs (and the default compiler from `https://launchpad.net/gcc-arm-embedded` is 32 bit).

To add this compiler to your environment manually:

1. Download the compiler:
   ```sh
   Download the compiler: 
     sh
     wget https://github.com/SolinGuo/arm-none-eabi-bash-on-win10-/raw/master/gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2
   ```
1. Unpack it using this command line in the Bash On Windows console: sh tar -xvf gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2 This will unpack the arm gcc cross-compiler to: `gcc-arm-none-eabi-5_4-2017q2/bin`
   ```sh
   tar -xvf gcc-arm-none-eabi-5_4-2017q2-20170512-linux.tar.bz2
   ```
   This will unpack the arm gcc cross-compiler to:
   ```
   gcc-arm-none-eabi-5_4-2017q2/bin
   ```
1. Add the to the environment (add the line to your bash profile to make the change permanent) `export PATH=$HOME/gcc-arm-none-eabi-5_4-2017q2/bin:\$PATH`
   ```
   export PATH=$HOME/gcc-arm-none-eabi-5_4-2017q2/bin:$PATH
   ```
