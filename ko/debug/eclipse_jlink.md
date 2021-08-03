# PX4용 MCU Eclipse/J-Link 디버깅

NuttX(예: Pixhawk 시리즈 보드)에서 실행되는 PX4를 디버그하기 위하여 *Segger Jlink 어댑터*와 함께 [MCU Eclipse](https://gnu-mcu-eclipse.github.io/)를 설정하고 사용하는 방법을 설명합니다.


## 필요한 하드웨어

- [J-Link EDU Mini](https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/)
- Segger JLink를 Flight Controller [SWD(JTAG) 하드웨어 디버깅 인터페이스](../debug/swd_debug.md)(디버그 포트) 연결용 어댑터입니다.
- Micro USB 케이블

## 설치

### PX4

일반 지침에 따라 PX4를 설정합니다.
- 플랫폼에 대한 [PX4 개발자 환경/도구 체인 설정](../dev_setup/dev_env.md)(예: Linux의 경우 [Ubuntu LTS/Debian Linux의 개발 환경](../dev_setup/dev_env_linux_ubuntu.md) 참조).
- [PX4를 다운로드](../dev_setup/building_px4.md)하고, 선택적으로 명령줄에서 빌드합니다.

### Eclipse

*Eclipse*를 설치하려면:
1. [C/C++ 개발자를 위한 Eclipse CDT](https://github.com/gnu-mcu-eclipse/org.eclipse.epp.packages/releases/)(MCU GitHub)를 다운로드하십시오.
1. Eclipse 폴더의 압축을 풀고 적당한 폴더에 복사합니다(설치 스크립트를 실행할 필요가 없음).
1. *Eclipse*를 실행하고, 초기 워크벤치의 위치를 선택하십시오.

### Segger Jlink 도구

To install the *Segger Jlink* tools:
1. Download and run the [J-Link Software and Documentation Pack](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack) for your OS (Windows and Linux packages available).
   - On Linux the tools are installed in **/usr/bin**.

For more information, see: [https://gnu-mcu-eclipse.github.io/debug/jlink/install/](https://gnu-mcu-eclipse.github.io/debug/jlink/install/).

## First Use

1. Connect the *Segger JLink* to the host computer and the [flight controller debug port](../debug/swd_debug.md) (via an adapter).
1. Power the flight controller.
1. Run *Eclipse*.
1. Add a source by choosing **File > Import > C/C++ > Existing Code as Makefile Project** and click **Next**.
1. Point it to the **PX4-Autopilot** folder and give it a name, then select *ARM Cross GCC* in the *Toolchain for Indexer Settings* and click **Finish**. Import takes a while, wait for it to complete.
1. Set the MCU settings: right-click on the top-level project in the Project Explorer, select *Properties* then under MCU choose *SEGGER J-Link Path*. Set it as shown in the screenshot below. ![Eclipse: Segger J-Link Path](../../assets/debug/eclipse_segger_jlink_path.png)
1. Update packs:
   - Click the small icon on the top right called *Open Perspective* and open the *Packs* perspective. ![Eclipse: Workspace](../../assets/debug/eclipse_workspace_perspective.png)
   - Click the **update all** button.

:::tip
This takes a VERY LONG TIME (10 minutes). Ignore all the errors about missing packages that pop up.
:::

     ![Eclipse: Workspace Packs Perspective](../../assets/debug/eclipse_packs_perspective.jpg)
   - The STM32Fxx devices are found in the Keil folder, install by right-clicking and then selecting **install** on the according device for F4 and F7.
1. Setup debug configuration for target:
   - Right click project and open the *Settings* (menu: **C/C++ Build > Settings**)
   - Choose the *Devices* Tab, *Devices* section (Not *Boards*).
   - Find the FMU chip you wish to debug.

   ![Eclipse: Select FMU in settings](../../assets/debug/eclipse_settings_devices_fmu.png)
1. Select debug configurations with the small drop-down next to the bug symbol: ![Eclipse: Debug config](../../assets/debug/eclipse_settings_debug_config.png)
1. Then select *GDB SEGGER J-Link Debugging* and then the **New config** button on the top left. ![Eclipse: GDB Segger Debug config](../../assets/debug/eclipse_settings_debug_config_gdb_segger.png)
1. Setup build config:
   - Give it a name and set  the *C/C++ Application* to the corresponding **.elf** file.
   - Choose *Disable Auto build* :::note Remember that you must build the target from the command line before starting a debug session.
:::

   ![Eclipse: GDB Segger Debug config](../../assets/debug/eclipse_settings_debug_config_gdb_segger_build_config.png)
1. The *Debugger* and *Startup* tabs shouldn’t need any modifications (just verify your settings with the screenshots below)

   ![Eclipse: GDB Segger Debug config: debugger tab](../../assets/debug/eclipse_settings_debug_config_gdb_segger_build_config_debugger_tab.png) ![Eclipse: GDB Segger Debug config: startup tab](../../assets/debug/eclipse_settings_debug_config_gdb_segger_build_config_startup_tab.png)


## Troubleshooting

### Target CPU not in Package Manager

If the target CPU does not appear in the package manager you may need these steps to get the register view working.

:::tip
This should not generally happen (but anecdotally has been reported when connecting to an STM F7 controller).
:::

Adding missing SVD files for the *Peripheral View*:
1. Find out where MCU Eclipse stores its packages (**Preferences > C/C++ > MCU Packages**): ![Eclipse: MCU Packages](../../assets/debug/eclipse_mcu_packages.png)
2. Download missing packages from: http://www.keil.com/dd2/Pack/
3. Open downloaded pack with a decompression tool, and extract the **.SVD** files from: **/CMSIS/SVD**.
4. Select desired **.SVD** file in: **Debug Options > GDB SEGGER JLink Debugging > SVD Path** ![Eclipse: SVD File path](../../assets/debug/eclipse_svd_file_path.png)
