---
canonicalUrl: https://docs.px4.io/main/ko/ros/raspberrypi_installation
---

# 라즈베리파이 ROS 설치

Pixhawk 보조 컴퓨터 라즈베리파이에 ROS-indigo를 설치 방법을 설명합니다.

## 준비 사항
* 모니터, 키보드 또는 구성된 SSH 연결가능한 라즈베리파이
* 이 가이드는 라즈베리파이에 Raspbian "JESSIE"가 설치되어 있다고 가정합니다. 그렇지 않은 경우에는 [설치](https://www.raspberrypi.org/downloads/raspbian/)하거나 Raspbian Wheezy를 Jessie로 [업그레이드](http://raspberrypi.stackexchange.com/questions/27858/upgrade-to-raspbian-jessie)합니다.

## 설치
ROS Indigo의 실제 설치는 [이 가이드](http://wiki.ros.org/ROSberryPi/Installing%20ROS%20Indigo%20on%20Raspberry%20Pi)를 참고하십시오. 참고: "ROS-Comm" 변형 버전을 설치하십시오. 데스크탑 변형은 너무 무겁습니다.

### 패키지 설치 중 오류
패키지(예: `sudo apt-get install ros-indigo-ros-tutorials`)를 다운로드하려는 경우, "패키지 ros-indigo-ros-tutorials를 찾을 수 없습니다"라는 오류가 표시될 수 있습니다.

그런 오류가 발생하면, catkin 작업 공간(예: ~/ros_catkin_ws)으로 이동하여 패키지 이름을 변경합니다.

```sh
$ cd ~/ros_catkin_ws

$ rosinstall_generator ros_tutorials --rosdistro indigo --deps --wet-only --exclude roslisp --tar > indigo-custom_ros.rosinstall
```

다음으로 wstool로 작업 공간을 업데이트 합니다.

```sh
$ wstool merge -t src indigo-custom_ros.rosinstall

$ wstool update -t src
```

다음으로(여전히 작업 공간 폴더에 있음) 파일을 소싱하고 빌드합니다.

```sh
$ source /opt/ros/indigo/setup.bash

$ source devel/setup.bash

$ catkin_make
```
