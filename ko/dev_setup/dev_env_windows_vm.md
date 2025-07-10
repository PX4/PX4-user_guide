---
canonicalUrl: https://docs.px4.io/main/ko/dev_setup/dev_env_windows_vm
---

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
1. 원하는 버전의 [Ubuntu Desktop ISO Image](https://www.ubuntu.com/download/desktop)를 다운로드합니다. (권장 Ubuntu 버전은 [Linux 지침 페이지](../dev_setup/dev_env_linux.md) 참조).
1. *VMWare 플레이어*를 실행합니다.
1. 가상 머신 설정에서 3D 가속 사용: **VM > 설정 > 하드웨어 > 디스플레이 > 3D 그래픽 가속화**

   :::note
이 옵션은 jMAVSim 및 Gazebo와 같은 3D 시뮬레이션 실행에 필요합니다.
가상 환경에 Linux를 설치하기 전에 이 작업을 수행하는 것이 좋습니다.
:::
1. 새 가상 머신을 생성하는 메뉴를 선택합니다.
1. 가상 머신 생성 마법사에서 다운로드한 Ubuntu ISO 이미지를 설치 매체로 선택하면, 사용하려는 운영 체제가 자동으로 감지됩니다.
1. 마법사에서 실행 중인 가상 머신에 할당할 리소스를 선택합니다. 가상 머신에 최대한 많은 메모리와 CPU 코어를 할당하십시오.
1. 마법사가 종료시 새 가상 머신을 실행하고, 설정 지침에 따라 Ubuntu를 설치합니다. 모든 설정은 호스트 운영 체제에서 사용하기 위한 것이므로, 네트워크 공격의 위험을 증가시키지 않는 화면 보호기 및 로컬 워크스테이션 보안 기능을 비활성화할 수 있습니다.
1. 새 가상 머신이 부팅되면, 게스트 운영체제에 *VMWare 도구 드라이버 및 도구 확장*을 설치하여야 합니다. 이렇게 하면 다음과 같은 VM 사용의 성능과 유용성들이 향상됩니다.
    * 크게 향상된 그래픽 성능
    * Proper support for hardware device usage like USB port allocation (important for target upload), proper mouse wheel scrolling, sound support
    * 창 크기에 따른 게스트 디스플레이 해상도 조정
    * 호스트 시스템 클립보드 공유
    * 호스트 시스템 파일 공유
1. [Linux용 PX4 환경 설정](../dev_setup/dev_env_linux.md)을 계속 진행합니다.
