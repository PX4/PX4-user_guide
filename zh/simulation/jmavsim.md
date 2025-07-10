---
canonicalUrl: https://docs.px4.io/main/zh/simulation/jmavsim
---

# jMAVSim 进行 SITL 仿真

jMAVSim是一个简单的多旋翼/四旋翼仿真软件，它可以允许你在仿真环境中飞行运行着 PX4 的 *旋翼* 无人机。 它很容易设置，可以用来测试您的工具是否可以起飞、飞行、降落、并对各种故障条件 (例如 gps 故障) 做出适当的反应。

<strong>支持机型：</strong>

* 四旋翼

本问主要演示如何设置 jMAVSim 以连接到 SITL 版本的 PX4 。

:::tip
jMAVSim can also be used for HITL Simulation ([as shown here](../simulation/hitl.md#jmavsim_hitl_configuration)).
:::

## 仿真环境

jMAVSim setup is included in our [standard build instructions](../dev_setup/dev_env.md) (for macOS, Ubuntu Linux, Windows).

## 运行 SITL

Software in the Loop Simulation runs the complete system on the host machine and simulates the autopilot. It connects via local network to the simulator. The setup looks like this:

[![Mermaid graph: SITL Simulator](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original graph
graph LR;
  Simulator-- >MAVLink;
  MAVLink-- >SITL;
-->

## 把飞机飞上天

该命令最终将得到如下 PX4 控制台显示界面：

```sh
make px4_sitl_default jmavsim
```

jMAVSim 3d 视图

```sh
[init] shell id: 140735313310464
[init] task name: px4

______  __   __    ___
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

Ready to fly.


pxh>
```


It will also bring up a window showing a 3D view of the [jMAVSim](https://github.com/PX4/jMAVSim) simulator:

![jMAVSim 3d View](../../assets/simulation/jmavsim.jpg)


## 使用/配置选项

The system will start printing status information. You will be able to start flying once you have a position lock (shortly after the console displays the message: *EKF commencing GPS fusion*).

举个例子，使用如下命令设定无人机起飞点的维度、经度和高度：

```sh
pxh> commander takeoff
```

通过 *QGroundControl* 可引入操纵杆或者拇指操纵杆（[如何进行设置看这里](../simulation/README.md#joystickgamepad-integration)）。

## 多飞行器仿真

有一个特殊的平台可以模拟一个通过 Wifi 进行连接的无人机。

### 指定起飞位置

模拟器会跟真实的该类无人机一样在当地网络中广播自己的位置信息等。

### 更改仿真的时间流速

你可以单独启动 JMAVSim 和 PX4:

此举可以缩短测试循环时间（重启 jMAVSim 需要耗费非常多的时间）。
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl_default jmavsim
```

### 模拟一个 Wifi 无人机

JMAVSim 也可用来进行多飞行器仿真： [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md).

```
./Tools/jmavsim_run.sh
make px4_sitl none
```

如果想扩展或者定制仿真接口，你可以编辑 **Tools/jMAVSim** 文件夹下的文件： 源代码可以从 Github 上的 [jMAVSim 软件仓库](https://github.com/px4/jMAVSim) 获取。

<a id="joystick"></a>

### 单独启动 JMAVSim 和 PX4

在仿真中可以使用跟真实飞机一样的方式实现 [与 ROS 的对接交互](../simulation/ros_interface.md) 。


### 分别启动 JMAVSim 和 PX4

此举可以缩短测试循环时间（重启 jMAVSim 需要耗费非常多的时间）。

```sh
make broadcast jmavsim
```

要使用没有jMAVSim图形界面的仿真，请设置如下环境变量 `HEADLESS=1`

### 无航向模式

JMAVSim 也可用来进行多飞行器仿真： [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md).

```
[init] shell id: 140735313310464
[init] task name: px4

______  __   __    ___ 
| ___ \ \ \ / /   /   |
| |_/ /  \ V /   / /| |
|  __/   /   \  / /_| |
| |     / /^\ \ \___  |
\_|     \/   \/     |_/

Ready to fly.


pxh>
```

This allows a faster testing cycle (restarting jMAVSim takes significantly more time).

### java.long.NoClassDefFoundError

To start jMAVSim without the GUI, set the env variable `HEADLESS=1` as shown:
```bash
HEADLESS=1 make px4_sitl jmavsim
```


## 扩展和定制

JMAVSim can be used for multi-vehicle simulation: [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md).

## 与 ROS 对接交互

To extend or customize the simulation interface, edit the files in the **Tools/jMAVSim** folder. The code can be accessed through the[jMAVSim repository](https://github.com/px4/jMAVSim) on Github.

:::note
The build system enforces the correct submodule to be checked out for all dependencies, including the simulator. It will not overwrite changes in files in the directory, however, when these changes are committed the submodule needs to be registered in the Firmware repo with the new commit hash. To do so, `git add Tools/jMAVSim` and commit the change. This will update the GIT hash of the simulator.
:::

## 重要的文件

The simulation can be [interfaced to ROS](../simulation/ros_interface.md) the same way as onboard a real vehicle.

## 值得一看的脚本文件

* 启动脚本位于 [posix-configs/SITL/init](https://github.com/PX4/Firmware/tree/master/posix-configs/SITL/init) 文件夹下，以 `rcS_SIM_AIRFRAME` 的方式进行命名，默认值是 `rcS_jmavsim_iris` 。
* 根文件系统 (相当于 `/`) 位于生成目录内: `build/px4_sitl_default/src/firmware/posix/rootfs/` 。

## 故障处理

### java.long.NoClassDefFoundError

```
Exception in thread "main" java.lang.NoClassDefFoundError: javax/vecmath/Tuple3d
at java.base/java.lang.Class.forName0(Native Method)
at java.base/java.lang.Class.forName(Class.java:374)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:56)
Caused by: java.lang.ClassNotFoundException: javax.vecmath.Tuple3d
at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:466)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:566)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:499)
... 3 more
Exception in thread "main" java.lang.NoClassDefFoundError: javax/vecmath/Tuple3d
at java.base/java.lang.Class.forName0(Native Method)
at java.base/java.lang.Class.forName(Class.java:374)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:56)
Caused by: java.lang.ClassNotFoundException: javax.vecmath.Tuple3d
at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:466)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:566)
at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:499)
```

并注释下面所指示的一行：


### An illegal reflective access operation has occurred

This warning can be ignored (it will probably be displayed but the simulation will still work correctly).

```
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by javax.media.j3d.JoglPipeline (rsrc:j3dcore.jar) to method sun.awt.AppContext.getAppContext()
WARNING: Please consider reporting this to the maintainers of javax.media.j3d.JoglPipeline
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
Inconsistency detected by ld.so: dl-lookup.c: 112: check_match: Assertion version->filename == NULL || ! _dl_name_match_p (version->filename, map)' failed!
```

### java.awt.AWTError: Assistive Technology not found: org.GNOME.Accessibility.AtkWrapper

```
Exception in thread "main" java.lang.reflect.InvocationTargetException
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.lang.reflect.Method.invoke(Method.java:498)
at org.eclipse.jdt.internal.jarinjarloader.JarRsrcLoader.main(JarRsrcLoader.java:58)
Caused by: java.awt.AWTError: Assistive Technology not found: org.GNOME.Accessibility.AtkWrapper
at java.awt.Toolkit.loadAssistiveTechnologies(Toolkit.java:807)
at java.awt.Toolkit.getDefaultToolkit(Toolkit.java:886)
at java.awt.Window.getToolkit(Window.java:1358)
at java.awt.Window.init(Window.java:506)
at java.awt.Window.(Window.java:537)
at java.awt.Frame.(Frame.java:420)
at java.awt.Frame.(Frame.java:385)
at javax.swing.JFrame.(JFrame.java:189)
at me.drton.jmavsim.Visualizer3D.(Visualizer3D.java:104)
at me.drton.jmavsim.Simulator.(Simulator.java:157)
at me.drton.jmavsim.Simulator.main(Simulator.java:678)
```

If you see this error, try this workaround:

Edit the **accessibility.properties** file:
```
sudo gedit /etc/java-8-openjdk/accessibility.properties
```

and comment out the line indicated below:
```
#assistive_technologies=org.GNOME.Acessibility.AtkWrapper
```

For more info, check [this GitHub issue](https://github.com/PX4/PX4-Autopilot/issues/9557). A contributor found the fix in [askubuntu.com](https://askubuntu.com/questions/695560).

### Exception in thread "main" java.lang.UnsupportedClassVersionError:
When compiling jMAVsim, you might encounter the following error:

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: me/drton/jmavsim/Simulator has been compiled by a more recent version of the Java Runtime (class file version 59.0), this version of the Java Runtime only recognizes class file versions up to 58.0
```

This error is telling you, you need a more recent version of Java in your environment. Class file version 58 corresponds to jdk14, version 59 to jdk15, version 60 to jdk 16 etc.

To fix it under macOS, we recommend installing OpenJDK through homebrew
```sh
brew install --cask adoptopenjdk16
```
