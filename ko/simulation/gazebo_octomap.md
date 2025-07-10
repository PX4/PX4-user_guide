---
canonicalUrl: https://docs.px4.io/main/ko/simulation/gazebo_octomap
---

# ROS Gazebo OctoMap 3D 모델

[OctoMap 라이브러리](http://octomap.github.io/)는 센서 데이터에서 체적 3D 환경 모델을 생성하는 오픈 소스 라이브러리입니다. 이 모델 데이터를 드론 탐색 및 장애물 회피에 사용할 수 있습니다.

Gazebo [Rotors Simulator](https://github.com/ethz-asl/rotors_simulator/wiki/RotorS-Simulator)와 ROS에서 *OctoMap* 사용 방법을 설명합니다.

## 설치

설치에는 ROS, Gazebo 및 Rotors Simulator 플러그인이 필요합니다. 설치하려면 [Rotors Simulator 지침](https://github.com/ethz-asl/rotors_simulator)을 참고하십시오.

다음으로, *OctoMap* 라이브러리를 설치합니다.
```sh
sudo apt-get install ros-indigo-octomap ros-indigo-octomap-mapping
rosdep install octomap_mapping
rosmake octomap_mapping
```

~/catkin_ws/src/rotors_simulator/rotors_gazebo/CMakeLists.txt 파일 마지막에 다음 줄들을 추가합니다.
```sh
find_package(octomap REQUIRED)
include_directories(${OCTOMAP_INCLUDE_DIRS})
link_libraries(${OCTOMAP_LIBRARIES})
```

~/catkin_ws/src/rotors_simulator/rotors_gazebo/package.xml 파일에 다음 줄을 추가합니다.
```sh
<build_depend>octomap</build_depend>
<run_depend>octomap</run_depend>
```

다음 두 줄을 실행합니다.

:::note
첫 번째 줄은 기본 셸 편집기를 *gedit*으로 변경합니다. 이것은 *vim*(기본 편집기)에 대한 경험이 없는 사용자에게 권장되지만, 그렇지 않으면 생략할 수 있습니다.
:::

```sh
export EDITOR='gedit'
rosed octomap_server octomap_tracking_server.launch
```
그리고 다음 두 줄의 내용을 변경합니다.

```sh
<param name="frame_id" type="string" value="map" />
...
<!--remap from="cloud_in" to="/rgbdslam/batch_clouds" /-->
```

을 다음과 같이 변경합니다.
```sh
<param name="frame_id" type="string" value="world" />
...
<remap from="cloud_in" to="/firefly/vi_sensor/camera_depth/depth/points" />
```


## 시뮬레이션 실행

*별도의* 터미널 창에서 다음 세 줄을 실행합니다. [Gazebo](../simulation/gazebo.md), *Rviz* 및 옥토맵 서버가 실행됩니다.

```sh
roslaunch rotors_gazebo mav_hovering_example_with_vi_sensor.launch  mav_name:=firefly
rviz
roslaunch octomap_server octomap_tracking_server.launch
```

*Rviz*에서 창 왼쪽 상단의 '고정 프레임' 필드를 '지도'에서 '세계'로 변경합니다. 이제 왼쪽 하단의 추가 버튼을 클릭하고, MarkerArray를 선택합니다. 그런 다음 MarkerArray를 두 번 클릭하고 'Marker Topic'을 '/free_cells_vis_array'에서 '/posed_cells_vis_array'로 변경합니다.

이제 바닥의 일부가 표시되어야 합니다.

*Gazebo* 창에서 빨간색 로터 앞에 큐브를 삽입하면, *Rviz*에서 조회할 수 있습니다.

![Gazebo OctoMap 예제](../../assets/simulation/octomap.png)

