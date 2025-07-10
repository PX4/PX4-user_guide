---
canonicalUrl: https://docs.px4.io/main/zh/modules/modules_simulation
---

# 模块参考：仿真

## sih
Source: [modules/sih](https://github.com/PX4/PX4-Autopilot/tree/release/1.13/src/modules/sih)


### 说明
本模块为四旋翼提供了一个完全在飞控内部运行的模拟器。

该模拟器订阅了主题 “actuator_outputs”，即混控器给出的控制执行器的 pwm 信号。

模拟器发布了被真实噪声污染的传感器信号以便在环路中加入状态估计器。

### 实现
模拟器运用矩阵代数方法实现了运动方程。 姿态采用四元数表示。 积分计算采用前向欧拉法。 为避免堆栈溢出，大部分变量在 .hpp 文件中声明为全局变量。



<a id="sih_usage"></a>

### 用法
```
sih <command> [arguments...]
 wind_estimator &lt;command&gt; [arguments...]
 Commands:
   start

   stop

   status        打印状态信息
```
