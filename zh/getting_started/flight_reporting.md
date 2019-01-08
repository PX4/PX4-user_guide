# 飞行报告

PX4记录详细的飞机性能数据，从系统一开始被解锁直到加锁。 这些飞行日志还可以用来分析性能问题。

> **Tip** 在一些司法管辖区，保留飞行日志是一项法律规定。

## 从飞行控制器下载日志

日志数据可以使用 [QGroundControl](http://qgroundcontrol.com/) (v3.2 or later) 下载：**[Analyze View > Log Download](https://docs.qgroundcontrol.com/en/analyze_view/log_download.html)**.

![Flight Log Download](../../assets/qgc/analyze/log_download.jpg)

## 分析日志

上传日志到 [Flight Review](http://logs.px4.io) (http://logs.px4.io) 在线工具。

[Log Analysis using Flight Review](../log/flight_review.md) 解释了怎样分析图形，这可以帮你确认/排除一些常见的问题：过大的震动、很差的PID调优、控制器饱和、车辆不平衡、GPS 噪声、等等。

> **Note** [Flight Log Analysis](../log/flight_log_analysis.md) 包含很多好用的日志工具。

## 给PX4开发人员共享日志文件

上传日志到 [Flight Review](http://logs.px4.io) 后，这个日志链接可以在 [support forums](../README.md#support) 或者 [Github issue](../README.md#reporting-bugs--issues) 中分享。

## 额外的配置

日志系统默认配置为使用 [Flight Review](http://logs.px4.io) 收集日志。

日志将来可以使用 [SD Logging](../advanced_config/parameter_reference.md#sd-logging) 参数配置。 下面列出了您最可能更改的参数。

| 参数                                                                       | 描述                                                                                                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | 日志模式定义日志何时开始和停止。  
- `0`: 解锁时开始记录直到加锁 (默认)。  
- `1`: 系统启动开始记录直到加锁。  
- `2`: 系统启动时开始记录直到断电。                                                                                      |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | 日志配置文件。 Use this to enable less common logging/analysis (e.g. for EKF2 replay, high rate logging for PID & filter tuning, thermal temperature calibration).                     |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | Create very small additional "Mission Log".  
This log can *not* be used with *Flight Review*, but is useful when you need a small log for geotagging or regulatory compliance. |

> **Note** *Developers* can further configure what information is logged via the [logger](https://dev.px4.io/en/middleware/modules_system.html#logger) module (you would use this, for example, if you want to log your own topics). For more information see: [Logging](https://dev.px4.io/en/log/logging.html) (PX4 Developer Guide).