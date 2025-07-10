---
canonicalUrl: https://docs.px4.io/main/zh/frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon
---

# E-Flite Convergence 倾转旋翼 （Pixfalcon）

E-Flite Convergence 这种机架可以通过PX4轻松变成具有完全自主飞行能力的垂直起降固定翼机型， 虽然空间受限，但是留给 Pixfalcon、GPS、接收机的空间也足够了

@[youtube](https://youtu.be/E61P2f2WPNU)

## 硬件连接

Convergence 机架需要按照以下方式，与飞控 Pixfalcon 之间连接7路 PWM 信号（与 PX4 中的机身布局相匹配，左右方向是从飞机尾部向机头方向观察来确定的）

| Port   | 接口定义  |
| ------ | ----- |
| MAIN 1 | 右电机   |
| MAIN 2 | 左电机   |
| MAIN 3 | 尾电机   |
| MAIN 4 | 空     |
| MAIN 5 | 右倾转舵机 |
| MAIN 6 | 左倾转舵机 |
| MAIN 7 | 右翼升降舵 |
| MAIN 8 | 左翼升降舵 |

Pixfalcon 硬件可以安装在飞机原始的飞控安装位置

![Mount Pixfalcon](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_pixfalcon_mounting.jpg)

接收机模块安装在飞机原本需要安装 FPV 图传的空间内

![Mount telemetry module](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_telemetry_module.jpg)

对于GPS，我们在驾驶舱内泡沫上切出一块空间， 这样GPS可以放在机身内，良好内置不影响外观

![Mount GPS](../../assets/airframes/vtol/eflite_convergence_pixfalcon/eflight_convergence_gps_mounting.jpg)

## 配置

在飞控校准之前（遥控、传感器、飞行模式），在 QGC 中的机架部分，选择 VTOL Tiltrotor 菜单栏下的 E-Flite Convergence 选项，并在之后重启

如果机架在 QGC 中无法显示，重新设置以下参数并重启

- `SYS_AUTOSTART`: 13012
- `SYS_AUTOCONFIG`: 1

备注：

- 记得为转换到固定翼模式分配一个转换开关
- 默认启用永久稳定， 如果想在手动模式下控制固定翼模式飞行，把 VT_FW_PERM_STAB 设置为 0