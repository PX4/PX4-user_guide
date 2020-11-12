# jMAVSim 进行 SITL 仿真

jMAVSim是一个简单的多旋翼/四旋翼仿真软件，它可以允许你在仿真环境中飞行运行着 PX4 的 *旋翼* 无人机。 它很容易设置，可以用来测试您的工具是否可以起飞、飞行、降落、并对各种故障条件 (例如 gps 故障) 做出适当的反应。

<strong>支持机型：</strong>

* 四旋翼

本问主要演示如何设置 jMAVSim 以连接到 SITL 版本的 PX4 。

> **Tip** jMAVSim 也可以用来进行 HITL 仿真 ([看这里](../simulation/hitl.md#using-jmavsim-quadrotor)).

## 仿真环境

jMAVSim setup is included in our [standard build instructions](../setup/dev_env.md) (for macOS, Ubuntu Linux, Windows).

## 运行 SITL

软件在环仿真在主机上运行仿真系统的全部组件，使用软件来模拟真实飞控， 并通过当地网络实现与仿真软件的连接。 It connects via local network to the simulator. The setup looks like this:

[![{% mermaid %} graph LR; Simulator-->MAVLink; MAVLink-->SITL; {% endmermaid %}](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFI7XG4gIFNpbXVsYXRvci0tPk1BVkxpbms7XG4gIE1BVkxpbmstLT5TSVRMOyIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)


<!-- original graph
graph LR;
  Simulator-- >MAVLink;
  MAVLink-- >SITL;
-->

## 把飞机飞上天

此外，它还会唤起一个显示 [jMAVSim](https://github.com/PX4/jMAVSim) 模拟器的3D视图的窗口。

```sh
make px4_sitl_default jmavsim
```

该命令最终将得到如下 PX4 控制台显示界面：

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


jMAVSim 3d 视图

![jMAVSim 3d View](../../assets/simulation/jmavsim.jpg)


## 使用/配置选项

系统将开始输出状态信息。 飞机完成位置锁定之后（控制台提示： *EKF commencing GPS fusion* 信息之后不久）你就可以开始飞行了。

通过设定环境变量可以覆盖默认的起飞地点设定： `PX4_HOME_LAT`, `PX4_HOME_LON`, 以及 `PX4_HOME_ALT` 。

```sh
pxh> commander takeoff
```

举个例子，使用如下命令设定无人机起飞点的维度、经度和高度：

## 多飞行器仿真

### 指定起飞位置

通过 *QGroundControl* 可引入操纵杆或者拇指操纵杆（[如何进行设置看这里](../simulation/README.md#joystickgamepad-integration)）。

有一个特殊的平台可以模拟一个通过 Wifi 进行连接的无人机。
```
export PX4_HOME_LAT=28.452386
export PX4_HOME_LON=-13.867138
export PX4_HOME_ALT=28.5
make px4_sitl_default jmavsim
```

### Change Simulation Speed

模拟器会跟真实的该类无人机一样在当地网络中广播自己的位置信息等。

```
./Tools/jmavsim_run.sh
make px4_sitl none
```

你可以单独启动 JMAVSim 和 PX4:

<a id="joystick"></a>

### 模拟一个 Wifi 无人机

此举可以缩短测试循环时间（重启 jMAVSim 需要耗费非常多的时间）。


### 单独启动 JMAVSim 和 PX4

JMAVSim 也可用来进行多飞行器仿真： [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md).

```sh
make broadcast jmavsim
```

如果想扩展或者定制仿真接口，你可以编辑 **Tools/jMAVSim** 文件夹下的文件： 源代码可以从 Github 上的 [jMAVSim 软件仓库](https://github.com/px4/jMAVSim) 获取。

### Start JMAVSim and PX4 Separately

在仿真中可以使用跟真实飞机一样的方式实现 [与 ROS 的对接交互](../simulation/ros_interface.md) 。

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

### Headless Mode

To start jMAVSim without the GUI, set the env variable `HEADLESS=1` as shown:
```bash
HEADLESS=1 make px4_sitl jmavsim
```

## 扩展和定制

JMAVSim can be used for multi-vehicle simulation: [Multi-Vehicle Sim with JMAVSim](../simulation/multi_vehicle_jmavsim.md).

## 与 ROS 对接交互

To extend or customize the simulation interface, edit the files in the **Tools/jMAVSim** folder. The code can be accessed through the[jMAVSim repository](https://github.com/px4/jMAVSim) on Github.

> **Info** 编译系统会强制检查所有依赖项的子模块正确无误，其中就包括了模拟器。 但是，它不会直接覆盖你对目录中文件所做的更改， 当提交这些更改时你需要在固件 repo 中重新为子模块注册新的哈希值。 为此,，使用 `git add Tools/jMAVSim` 灵敏提交你的更改。 这将更新模拟器的 GIT 哈希值。

## 重要的文件

The simulation can be [interfaced to ROS](../simulation/ros_interface.md) the same way as onboard a real vehicle.

## Important Files

* 启动脚本位于 [posix-configs/SITL/init](https://github.com/PX4/Firmware/tree/master/posix-configs/SITL/init) 文件夹下，以 `rcS_SIM_AIRFRAME` 的方式进行命名，默认值是 `rcS_jmavsim_iris` 。
* 根文件系统 (相当于 `/`) 位于生成目录内: `build/px4_sitl_default/src/firmware/posix/rootfs/` 。

## Troubleshooting

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

This error should no longer occur once the jMAVSim submodule is [updated to newer jar libs](https://github.com/PX4/jMAVSim/pull/119) and Java 11 or Java 14 should work fine.


### An illegal reflective access operation has occured

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

For more info check [this GitHub issue](https://github.com/PX4/PX4-Autopilot/issues/9557). The fix was found in [askubuntu.com](https://askubuntu.com/questions/695560).
