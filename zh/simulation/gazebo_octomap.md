---
canonicalUrl: https://docs.px4.io/main/zh/simulation/gazebo_octomap
---

# 具有 ROS/Gazebo 的 OctoMap 3D 模型

[ OctoMap 库 ](http://octomap.github.io/)是一个开源库，用于根据传感器数据生成体积 3D 环境模型。 然后，该模型数据可由无人机用于导航和避障。

本指南介绍了如何使用 *OctoMap* 与 Gazebo [Rotors Simulato ](https://github.com/ethz-asl/rotors_simulator/wiki/RotorS-Simulator) 和 ROS。

## 安装

安装需要 ROS，Gazebo 和 Rotors Simulator 插件。 按照[ Rotors Simulator instructions ](https://github.com/ethz-asl/rotors_simulator)进行安装。

接下来，安装 *OctoMap* 库：
```sh
sudo apt-get install ros-indigo-octomap ros-indigo-octomap-mapping
rosdep install octomap_mapping
rosmake octomap_mapping
```

现在，打开 ~/catkin_ws/src/rotors_simulator/rotors_gazebo/CMakeLists.txt 并在文件底部添加以下行
```sh
find_package(octomap REQUIRED)
include_directories(${OCTOMAP_INCLUDE_DIRS})
link_libraries(${OCTOMAP_LIBRARIES})
```

打开 ~/catkin_ws/src/rotors_simulator/rotors_gazebo/package.xml 并添加以下行
```sh
<build_depend>octomap</build_depend>
<run_depend>octomap</run_depend>
```

运行以下两行：

:::note
The first line changes your default shell editor to *gedit*. This is recommended for users who have little experience with *vim* (the default editor), but can otherwise be omitted.
:::

```sh
export EDITOR='gedit'
rosed octomap_server octomap_tracking_server.launch
```
到：

```sh
<param name="frame_id" type="string" value="map" />
...
<!--remap from="cloud_in" to="/rgbdslam/batch_clouds" /-->
<!--remap from="cloud_in" to="/rgbdslam/batch_clouds" /-->
```

to:
```sh
<param name="frame_id" type="string" value="world" />
...
<remap from="cloud_in" to="/firefly/vi_sensor/camera_depth/depth/points" />
<remap from="cloud_in" to="/firefly/vi_sensor/camera_depth/depth/points" />
```


## 运行仿真

在* Rviz *中，将“固定帧”字段从“地图”更改为窗口左上角的“世界”。 现在单击左下角的添加按钮，然后选择 MarkerArray。

```sh
roslaunch rotors_gazebo mav_hovering_example_with_vi_sensor.launch  mav_name:=firefly
rviz
roslaunch octomap_server octomap_tracking_server.launch
```

In *Rviz*, change the field 'Fixed Frame' from 'map' to 'world' in the top left of the window. Now click the add button in the bottom left and select MarkerArray. Then double click the MarkerArray and change 'Marker Topic' from '/free_cells_vis_array' to '/occupied_cells_vis_array'

在* Gazebo *窗口中，在红色转子前插入一个立方体，您应该在* Rviz *中看到它。

In the *Gazebo* window, insert a cube in front of the red rotors and you should see it in *Rviz*.

![OctoMap Example in Gazebo](../../assets/simulation/octomap.png)

