# 飞行报告

PX4 logs detailed aircraft performance data once the system has been armed until it is disarmed. These flight logs can also be used to analyze performance issues.

> **Tip** Keeping flight logs is a legal requirement in some jurisdictions.

## 从飞行控制器下载日志

Logs can be downloaded using [QGroundControl](http://qgroundcontrol.com/) (v3.2 or later): **[Analyze View > Log Download](https://docs.qgroundcontrol.com/en/analyze_view/log_download.html)**.

![Flight Log Download](../../assets/qgc/analyze/log_download.jpg)

## 分析日志

Upload the log file to the online [Flight Review](http://logs.px4.io) tool (http://logs.px4.io).

[Log Analysis using Flight Review](../log/flight_review.md) explains how to interpret the plots, and can help you to verify/reject the causes of common problems: excessive vibration, poor PID tuning, saturated controllers, imbalanced vehicles, GPS noise, etc.

> **Note** [Flight Log Analysis](../log/flight_log_analysis.md) contains links to information about many other useful logging tools.

## 给PX4开发人员共享日志文件

After uploading a file to [Flight Review](http://logs.px4.io), the log file link can be shared for discussion in the [support forums](../README.md#support) or a [Github issue](../README.md#reporting-bugs--issues).

## 额外的配置

The logging system is configured by default to collect sensible logs for use with [Flight Review](http://logs.px4.io).

Logging may further be configured using the [SD Logging](../advanced_config/parameter_reference.md#sd-logging) parameters. The parameters you are most likely to change are listed below.

| 参数                                                                       | 描述                                                                                                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SDLOG_MODE](../advanced_config/parameter_reference.md#SDLOG_MODE)       | Logging Mode defines when logging starts and stops.  
- `0`: log when armed until disarm (default).  
- `1`: log from boot until disarm.  
- `2`: log from boot until shutdown. |
| [SDLOG_PROFILE](../advanced_config/parameter_reference.md#SDLOG_PROFILE) | Logging profile. Use this to enable less common logging/analysis (e.g. for EKF2 replay, high rate logging for PID & filter tuning, thermal temperature calibration).            |
| [SDLOG_MISSION](../advanced_config/parameter_reference.md#SDLOG_MISSION) | Create very small additional "Mission Log".  
This log can *not* be used with *Flight Review*, but is useful when you need a small log for geotagging or regulatory compliance. |

> **Note** *Developers* can further configure what information is logged via the [logger](https://dev.px4.io/en/middleware/modules_system.html#logger) module (you would use this, for example, if you want to log your own topics). For more information see: [Logging](https://dev.px4.io/en/log/logging.html) (PX4 Developer Guide).