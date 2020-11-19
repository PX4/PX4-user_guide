# 飞行报告

PX4 logs detailed aircraft state and sensor data, which can be used to analyze performance issues. This topic explains how you can download and analyse logs, and share them with the development team for review.

> **Tip** 在一些司法管辖区，保留飞行日志是一项法律规定。

## 从飞行控制器下载日志

Logs can be downloaded using [QGroundControl](http://qgroundcontrol.com/): **[Analyze View > Log Download](https://docs.qgroundcontrol.com/en/analyze_view/log_download.html)**.

![飞行日志下载](../../assets/qgc/analyze/log_download.jpg)

## 分析日志

上传日志到 *Flight Review*（http://logs.px4.io）在线工具。 After upload you'll emailed a link to the analysis page for the log.

[Log Analysis using Flight Review](../log/flight_review.md) 解释了怎样分析图形，这可以帮你确认/排除一些常见的问题：过大的震动、很差的PID调优、控制器饱和、车辆不平衡、GPS 噪声、等等。

> **Note** There are many other great tools for visualising and analysing PX4 Logs. For more information see: [Flight Analysis](../log/flight_log_analysis.md).

<span></span>

> **Tip** If you have a constant high-rate MAVLink connection to the vehicle (not just a telemetry link) then you can use *QGroundControl* to automatically upload logs directly to *Flight Review*. For more information see [Settings > MAVLink Settings > MAVLink 2 Logging (PX4 only)](https://docs.qgroundcontrol.com/en/SettingsView/MAVLink.html#logging).

## 给 PX4 开发人员共享日志文件

The [Flight Review](http://logs.px4.io) log file link can be shared for discussion in the [support forums](../contribute/support.md#forums-and-chat) or a [Github issue](../README.md#reporting-bugs--issues).

## Log Configuration

日志系统默认配置为使用 [Flight Review](http://logs.px4.io) 收集日志。

日志将来可以使用 [SD Logging](../advanced_config/parameter_reference.md#sd-logging) 参数配置。 下面列出了您最可能更改的参数。

| 参数                                                                       | 描述                                                                                      |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | 日志模式定义日志何时开始和停止。  
- `0`：解锁时开始记录直到加锁 (默认)。  
- `1`：系统启动开始记录直到加锁。  
- `2`：系统启动时开始记录直到断电。 |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | 日志配置文件。 使用此功能可以进行不太常见的日志/分析 (例如，用于 EKF2 重放、用于 PID 和过滤器调优的高速率日志记录、热温度校准)。                |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | 创建非常小的额外“任务日志”。  
此日志*不* 能使用 *Flight Review*，但当您需要一个用于地理标记或法规遵从性的小日志时，该日志非常有用。          |

> **Note** *Developers* can further configure what information is logged via the [logger](../modules/modules_system.md#logger) module (you would use this, for example, if you want to log your own topics). 更多信息参考： [Logging](../dev_log/logging.md) (PX4 开发者手册)。

## 主链接

- [Flight Review](http://logs.px4.io)
- [使用 Flight Review 进行日志分析](../log/flight_review.md)
- [飞行日志分析](../log/flight_log_analysis.md)