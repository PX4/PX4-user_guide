# 将RC接收器连接到基于PX4 Linux的自动驾驶仪

本主题介绍如何设置基于Linux的PX4自动驾驶仪在任何串行端口上连接和使用[支持的遥控接收器](../getting_started/rc_transmitter_receiver.md)

对于S.Bus以外的遥控类型，您可以将接收器直接连接到串口，或者使用USB转TTY串行线（例如 PL2302 USB转串行TTL转换器）。

::: info 对于S.Bus接收器（或者像来自Futaba、RadioLink等的编码器），您通常需要通过[信号反相器](#signal_inverter_circuit)连接接收器和设备，此外其他设置是相同的。
:::

然后[启动PX4 RC Driver](#start_driver)在设备上，如下图。

<a id="start_driver"></a>

## 启动驱动程序

要在特定的UART上启动遥控接收机驱动程序(例如: `/dev/ttyS2`)：

```sh
linux_sbus start|stop|status -d <device> -c <channel>
```

有关其他驱动程序使用信息，请参见：[rc_input](../modules/modules_driver.md#rc-input)。

<a id="signal_inverter_circuit"></a>

## 信号反相器电路 (仅限S.Bus)

S.Bus 是 _反相的_ UART 通信信号。

虽然一些串行端口/飞行控制器可以读取反转的 UART 信号，但大多数需要在接收器和串行端口之间使用信号反相器电路来反转信号。

:::tip
此电路对于通过串行端口或 USB-to-TTY 串行转换器读取 S.Bus 远程控制信号也是必须的。
:::

本节介绍如何创建合适的电路。

### 所需组件

- 1x NPN 晶体管（例如 NPN S9014 TO92）
- 1x 10K 电阻
- 1x 1K 电阻

::: info
任何类型/型号的晶体管都可以使用，因为电流消耗非常低。
:::

### 电路图/连接

按如下所述（也显示在电路图中）连接组件：

- S.Bus 信号&rarr;1K 电阻&rarr;NPN 晶体管
- NPN晶体管发射极&rarr; GND
- 3.3VCC＆&rarr; 10K电阻&rarr; NPN晶体管集电极&rarr; USB-to-TTY的RXD
- 5.0VCC&rarr;S.Bus VCC
- GND &rarr; S.Bus GND

![信号反相器电路](../../assets/sbus/driver_sbus_signal_inverter_circuit_diagram.png)

下面的图片显示了面包板上的连接。

![信号反相器面包板](../../assets/sbus/driver_sbus_signal_inverter_breadboard.png)
