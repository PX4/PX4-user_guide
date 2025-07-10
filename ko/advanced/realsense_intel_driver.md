---
canonicalUrl: https://docs.px4.io/main/ko/advanced/realsense_intel_driver
---

# 우분투에 인텔 리얼센스 R200 드라이버 설치

이 지침서에서는 리눅스 운영체제에서 인텔 리얼센스 R200 카메라 헤드로 가져온 이미지를 로봇 운영체제(ROS)에서 접근할 수 있도록 카메라 드라이버를 설치하는 절차를 제시합니다. 인텔 리얼센스 R200 카메라 헤드 설명은 다음과 같습니다:

![인텔 리얼센스 카메라 전면](../../assets/hardware/sensors/realsense/intel_realsense.png)

버추어 박스의 게스트 운영체제로 동작하는 우분투 운영체제(OS)에서 드라이버 꾸러미 설치를 실행합니다. 버추어 박스를 실행하는 호스트 컴퓨터, 버추어 박스, 게스트 시스템의 사양(예시)은 다음과 같습니다:

- 호스트 운영체제: 윈도우 8
- 프로세서: Intel(R) Core(TM) i7-4702MQ CPU @ 2.20GHz
- 버추어박스: 오라클 가상 머신. 버전 5.0.14 r105127
- 확장 기능: 버추어 박스 확장 꾸러미 설치 (USB3 지원에 필요)
- 게스트 운영체제: 리눅스 - 우분투 14.04.3 LTS

지침서의 순서는 다음 방식을 따릅니다. 첫 부분에서는 버추어박스에 게스트 운영체제로 우분투 14.04를 선택하여 설치하는 방법을 알려줍니다. 두번째 부분에서는 ROS 인디고와 카메라 드라이버 설치 방법을 알려줍니다. 다음과 같이 흔하게 나타나는 표기의 의미를 정리해두었습니다:
- 버추어 박스(VB): 서로 다른 가상 머신을 실행하는 프로그램. 이 경우 오라클 가상 머신입니다.
- 가상 머신(VM): 버추어 박스에서 게스트 시스템으로 실행하는 운영체제. 이 경우 우분투를 지칭합니다.

## 버추어 박스에 우분투 14.04.3 LTS 설치

- 64비트 리눅스를 설치할 새 가상 머신(VM)을 만드십시오.
- 우분투 14.04.3 LTS ISO 파일([ubuntu-14.04.3-desktop-amd64.iso](http://www.ubuntu.com/download/desktop))을 다운로드하십시오.
- 우분투를 설치하십시오:
  - 설치 과정에서 다음 두가지 옵션을 끄십시오:
    - 설치 중 업데이트 다운로드
    - 서드파티 소프트웨어 설치
- 설치 후, 전체 데스크톱(화면)에 우분투 화면이 뜨도록 버추어 박스를 활성화해야합니다:
  -  우분투 가상 머신을 시작하고, 로그인한 다음, 버추어 박스 메뉴 표시줄의 **장치->게스트 추가 CD 이미지 설치**를 누르십시오.
  -  우분투에서 창이 떴을 경우 **실행**을 누르고 암호를 입력하십시오.
  -  설치가 끝나기 전까지 기다린 후 가상머신을 다시 시작하십시오. 이제, 전체 데스크톱 화면에 가상 머신 화면이 떠야 합니다.
  -  업데이트 설치 여부를 묻는 창이 우분투에 뜰 경우, 거절하십시오.
- 버추어 박스 USB 3 컨트롤러 활성:
  - 가상 머신을 끄십시오.
  - 메뉴 선택 과정을 통해 가상 머신의 설정으로 이동하고 "USB 3.0(xHCI)"를 선택하십시오. 버추어 박스 확장 꾸러미를 설치했을 때만 나타납니다.
  - 가상 머신을 다시 시작하십시오.

## ROS 인디고 설치

- [ROS 인디고 설치 안내서](http://wiki.ros.org/indigo/Installation/Ubuntu)에 주어진 절차를 따르십시오:
  - 데스크톱 전체 버전을 설치하십시오.
  - "Initialize rosdep"과 "Environment setup" 부분에 설명한 단계를 실행하십시오.

## 카메라 드라이버 설치

- git을 설치하십시오:
```bash
sudo apt-get install git
```
- 드라이버를 다운로드하고 설치하십시오
  - [RealSense_ROS 저장소](https://github.com/bestmodule/RealSense_ROS)를 복제하십시오:
    ```bash
    git clone https://github.com/bestmodule/RealSense_ROS.git
    ```
- [이곳](https://github.com/bestmodule/RealSense_ROS/tree/master/r200_install)의 절차를 따르십시오.
  - 다음 설치 꾸러미를 설치할 지 여부를 물어보면 엔터키를 누르십시오:
    ```
    Intel Low Power Subsystem support in ACPI mode (MFD_INTEL_LPSS_ACPI) [N/m/y/?] (NEW)
    ```
    ```
    Intel Low Power Subsystem support in PCI mode (MFD_INTEL_LPSS_PCI) [N/m/y/?] (NEW)

    ```
    ```
    Dell Airplane Mode Switch driver (DELL_RBTN) [N/m/y/?] (NEW)
    ```
  - 설치 과정 마지막에 다음 오류메시지가 나타날 수 있으나, 이 때문에 드라이버의 오동작이 나타나선 안됩니다:
    ```
    rmmod: ERROR: Module uvcvideo is not currently loaded
    ```

- 설치 과정이 끝나면 가상 머신을 다시 시작하십시오.

- 카메라 드라이버 시험:
  - 인텔 리얼센스 카메라 헤드를 USB3 케이블로 USB3 방식을 따르는 컴퓨터의 포트에 연결하십시오.
  - 버추어 박스의 메뉴 표시줄에서 장치->USB->Intel Corp Intel RealSense 3D Camera R200를 눌러 가상 머신에 USB 카메라를 연결하십시오.
  - [패키지 해제 폴더]/Bin/DSReadCameraInfo 파일을 실행하십시오:
    - 다음 오류 메시지가 나타나면 카메라 연결을 해제하십시오(컴퓨터에서 물리적으로 USB 케이블을 뽑아내십시오). 다시 연결한 후, 버추어 박스의 메뉴표시줄에서 장치->USB->Intel Corp Intel RealSense 3D Camera R200를 다시 누르고,  [언팩 폴더]/Bin/DSReadCameraInfo 파일을 다시 실행하십시오
      ```
      DSAPI call failed at ReadCameraInfo.cpp:134!
      ```
    - 카메라 드라이버가 동작하고 Intel RealSense R200을 인식하면 Intel RealSense R200 카메라 헤드 정보를 살펴보아야 합니다.

- ROS 노들릿(nodlet) 설치 및 시험:
  - [이곳](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md)의 "설치" 부분에 언급한 설치 절차를 따라 ROS 노들릿을 설치하십시오.
  - [이곳](https://github.com/bestmodule/RealSense_ROS/blob/master/realsense_dist/2.3/doc/RealSense-ROS-R200-nodelet.md)의 "Running the R200 nodelet"  부분에 언급한 절차를 따라 ROS 노들릿과 Intel RealSense R200 카메라 헤드를 시험하십시오.
    - 모든 기능이 동작하면 ROS 토픽에 Intel RealSense R200 카메라로부터 제각기 다른 데이터 스트림이 나옵니다.

