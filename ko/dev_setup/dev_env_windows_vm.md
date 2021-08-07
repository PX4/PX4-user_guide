# Windows 가상 머신 호스팅 도구 모음

:::warning
이 개발 환경은 [지원되지 않습니다](../advanced/dev_env_unsupported.md). See [Toolchain Installation](../dev_setup/dev_env.md) for information about the environments and tools we do support!
:::

Windows 개발자는 Linux를 게스트 운영 체제로 사용하는 가상 머신(VM)에서 PX4 툴체인을 실행할 수 있습니다. 가상 머신을 설정한 후, 가상 머신내의 PX4 설치 및 설정은 일반 Linux 환경에서의 설정과 동일합니다.

:::tip
가상 머신에 가능한 한 많은 CPU 코어와 메모리 리소스를 할당합니다.
:::

가상 머신을 사용하는 것은 펌웨어 구축 환경을 설정과 테스트가 매우 편리하지만, 사용자는 다음 사항에 유의하여야 합니다.
1. 펌웨어 빌드는 Linux에서 빌드하는 것보다 조금 느립니다.
1. JMAVSim 프레임 속도는 기본 Linux보다 훨씬 느립니다. 경우에 따라서, 가상 머신 리소스 부족과 관련된 문제로 차량이 충돌할 수 있습니다.
1. Gazebo와 ROS는 설치할 수 있지만, 사용할 수 없을 정도로 느립니다.

## 사용 설명

시스템에서 PX4 실행을 위한 가상 머신을 설정하는 방법에는 여러 가지가 있습니다. 이 가이드는 VMWare 설정 방법을 설명합니다. VMWare 성능은 기본 사용(펌웨어 구축)에는 적절하지만, ROS 또는 Gazebo를 실행하는 경우에는 적절하지 않습니다.

1. [VMWare 플레이어](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)를 다운로드합니다.
1. 윈도우 시스템에 설치합니다.
1. Download the desired version of [Ubuntu Desktop ISO Image](https://www.ubuntu.com/download/desktop). (see [Linux Instructions Page](../setup/dev_env_linux.md) for recommended Ubuntu version).
1. Open *VMWare Player*.
1. Enable 3D acceleration in the VM's settings: **VM > Settings > Hardware > Display > Accelerate 3D graphics**

:::note
This option is required to properly run 3D simulation environments like jMAVSim and Gazebo. We recommend this is done before installing Linux in the virtual environment.
:::
1. Select the option to create a new virtual machine.
1. In the VM creation wizard choose the downloaded Ubuntu ISO image as your installation medium and will automatically detect the operating system you want to use.
1. Also in the wizard, select the resources you want to allocate to your virtual machine while it is running. Allocate as much memory and as many CPU cores as you can without rendering your host Windows system unusable.
1. Run your new VM at the end of the wizard and let it install Ubuntu following the setup instructions. Remember all settings are only for within your host operating system usage and hence you can disable any screen saver and local workstation security features which do not increase risk of a network attack.
1. Once the new VM is booted up make sure you install *VMWare tools drivers and tools extension* inside your guest system. This will enhance performance and usability of your VM usage:
    * Significantly enhanced graphics performance
    * Proper support for hardware device usage like USB port allocation (important for target upload), proper mouse wheel scrolling, sound suppport
    * Guest display resolution adaption to the window size
    * Clipboard sharing to host system
    * File sharing to host system
1. Continue with [PX4 environment setup for Linux](../dev_setup/dev_env_linux.md)
