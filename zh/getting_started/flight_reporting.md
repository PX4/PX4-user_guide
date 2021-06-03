# 飞行报告

PX4 logs detailed aircraft state and sensor data, which can be used to analyze performance issues. This topic explains how you can download and analyse logs, and share them with the development team for review.

:::tip
Keeping flight logs is a legal requirement in some jurisdictions.
:::

## 从飞行控制器下载日志

Logs can be downloaded using [QGroundControl](http://qgroundcontrol.com/): **[Analyze View > Log Download](https://docs.qgroundcontrol.com/en/analyze_view/log_download.html)**.

![Flight Log Download](../../assets/qgc/analyze/log_download.jpg)

## 分析日志

Upload the log file to the online [Flight Review](http://logs.px4.io) tool. After upload you'll emailed a link to the analysis page for the log.

[Log Analysis using Flight Review](../log/flight_review.md) explains how to interpret the plots, and can help you to verify/reject the causes of common problems: excessive vibration, poor PID tuning, saturated controllers, imbalanced vehicles, GPS noise, etc.

:::note
There are many other great tools for visualising and analysing PX4 Logs. For more information see: [Flight Analysis](../dev_log/flight_log_analysis.md).
:::

:::tip
If you have a constant high-rate MAVLink connection to the vehicle (not just a telemetry link) then you can use *QGroundControl* to automatically upload logs directly to *Flight Review*. For more information see [Settings > MAVLink Settings > MAVLink 2 Logging (PX4 only)](https://docs.qgroundcontrol.com/en/SettingsView/MAVLink.html#logging).
:::

## 给 PX4 开发人员共享日志文件

The [Flight Review](http://logs.px4.io) log file link can be shared for discussion in the [support forums](../contribute/support.md#forums-and-chat) or a [Github issue](../README.md#reporting-bugs-issues).

## Log Configuration

The logging system is configured by default to collect sensible logs for use with [Flight Review](http://logs.px4.io).

Logging may further be configured using the [SD Logging](../advanced_config/parameter_reference.md#sd-logging) parameters. The parameters you are most likely to change are listed below.

| 参数                                                                       | 描述                                                                                      |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | 日志模式定义日志何时开始和停止。  
- `0`：解锁时开始记录直到加锁 (默认)。  
- `1`：系统启动开始记录直到加锁。  
- `2`：系统启动时开始记录直到断电。 |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | 日志配置文件。 使用此功能可以进行不太常见的日志/分析 (例如，用于 EKF2 重放、用于 PID 和过滤器调优的高速率日志记录、热温度校准)。                |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | 创建非常小的额外“任务日志”。  
此日志*不* 能使用 *Flight Review*，但当您需要一个用于地理标记或法规遵从性的小日志时，该日志非常有用。          |

:::note
*Developers* can further configure what information is logged via the [logger](../modules/modules_system.md#logger) module (you would use this, for example, if you want to log your own topics). For more information see: [Logging](../dev_log/logging.md).
:::

## 主链接

- [Flight Review](http://logs.px4.io)
- [使用 Flight Review 进行日志分析](../log/flight_review.md)
- [飞行日志分析](../dev_log/flight_log_analysis.md)