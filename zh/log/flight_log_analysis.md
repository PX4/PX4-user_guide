# 飞行日志分析

本主题概述了用于 PX4 飞行日志分析的方法和软件包。

## 飞行报告

[飞行报告](../getting_started/flight_reporting.md) 说明了如何下载日志并与开发团队报告/讨论有关飞行的问题。

## 结构化分析

在分析飞行日志之前，重要的是建立它的上下文：

* 如果分析是在故障发生之后进行的，那么日志是捕捉到了这次故障还是在半空中停止了记录呢？
* 所有的控制器都跟踪到了它的设定值吗？ 最简单的方法是将的横滚和俯仰的角速度与它们的设定值进行比较。
* 传感器数据看起来有效吗？ 是否有非常强的震动（一个合理的判断强烈震动的阈值是所有的峰峰值是否超过 2-3m/s/s）。
* 如果根本原因不针对于特定车辆，请确保在 [PX4问题跟踪器](https://github.com/px4/firmware/issues/new) 的报告中有日志文件的链接（以及视频如果有的话）。

## 排除电力故障

如果日志文件在半空中结束了，可能有两个主要原因：电源故障 *或* 操作系统的硬故障。

在基于 [STM32系列](http://www.st.com/en/microcontrollers/stm32-32-bit-arm-cortex-mcus.html?querycriteria=productId=SC1169) 的自动驾驶仪上，会将操作系统的硬故障记录到SD卡上。 它位于SD卡的顶层目录且被命名为 *fault\_date.log* 比如 **fault\_2017\_04\_03\_00\_26\_05.log**。 如果飞行日志突然终止，请一直检查此文件是否存在。

## 分析工具

### Flight Review（在线工具）

[Flight Review](http://logs.px4.io) is the successor of *Log Muncher*. It is used in combination with the new [ULog](http://dev.px4.io/en/log/ulog_file_format.html) logging format.

主要特性：

* Web based, great for end-users.
* User can upload, load and then share report with others.
* Interactive plots.

![Flight Review Charts](../../assets/flight_log_analysis/flight_review/flight-review-example.png)

See [Log Analysis using Flight Review](flight_review.md) for an introduction.

### pyulog

[pyulog](https://github.com/PX4/pyulog) is a python package to parse ULog files, along with a set of command-line scripts to extract/display ULog information and convert them to other file formats.

Key features:

* Python library for parsing ULog files. Base library used by a number of other ULog analysis and visualisation tools.
* Scripts to extract/display ULog information: 
  * *ulog_info*: display information from an ULog file.
  * *ulog_messages*: display logged messages from an ULog file.
  * *ulog_params*: extract parameters from an ULog file.
* Scripts to convert ULog files to other formats: 
  * *ulog2csv*: convert ULog to (several) CSV files.
  * *ulog2kml*: convert ULog to (several) KML files.

All scripts are installed as system-wide applications (i.e. they be called on the command line - provided Python is installed), and support the `-h` flag for getting usage instructions. 例如：

    $ ulog_info -h
    usage: ulog_info [-h] [-v] file.ulg
    
    Display information from an ULog file
    
    positional arguments:
      file.ulg       ULog 输入文件
    
    optional arguments:
      -h, --help     显示这个帮助信息然后退出
      -v, --verbose  详细输出
    

Below we see the kind of information exported from a sample file using *ulog_info*.

    $ ulog_info sample.ulg
    Logging start time: 0:01:52, duration: 0:01:08
    Dropouts: count: 4, total duration: 0.1 s, max: 62 ms, mean: 29 ms
    Info Messages:
     sys_name: PX4
     time_ref_utc: 0
     ver_hw: AUAV_X21
     ver_sw: fd483321a5cf50ead91164356d15aa474643aa73
    
    Name (multi id, message size in bytes)    number of data points, total bytes
     actuator_controls_0 (0, 48)                 3269     156912
     actuator_outputs (0, 76)                    1311      99636
     commander_state (0, 9)                       678       6102
     control_state (0, 122)                      3268     398696
     cpuload (0, 16)                               69       1104
     ekf2_innovations (0, 140)                   3271     457940
     estimator_status (0, 309)                   1311     405099
     sensor_combined (0, 72)                    17070    1229040
     sensor_preflight (0, 16)                   17072     273152
     telemetry_status (0, 36)                      70       2520
     vehicle_attitude (0, 36)                    6461     232596
     vehicle_attitude_setpoint (0, 55)           3272     179960
     vehicle_local_position (0, 123)              678      83394
     vehicle_rates_setpoint (0, 24)              6448     154752
     vehicle_status (0, 45)                       294      13230
    

### pyFlightAnalysis

[pyFlightAnalysis](https://github.com/Marxlp/pyFlightAnalysis) is a cross-platform PX4 flight log (ULog) visual analysis tool, inspired by [FlightPlot](https://github.com/DrTon/FlightPlot).

Key features:

* Dynamic filter for displaying data
* 3D visualization for attitude and position of drone
* Easily replay with pyqtgraph's ROI (Region Of Interest)
* Python based, cross-platform.

![pyFlightAnalysis 1.0.1b1](../../assets/flight_log_analysis/pyflightanalysis.png)

### FlightPlot（桌面）

[FlightPlot](https://github.com/PX4/FlightPlot) is a desktop based tool for log analysis. It can be downloaded from [FlightPlot Downloads](https://github.com/PX4/FlightPlot/releases) (Linux, MacOS, Windows).

Key features:

* Java based, cross-platform.
* Intuitive GUI, no programming knowledge required.
* Supports both new and old PX4 log formats (.ulg, .px4log, .bin)
* Allows saving plots as images.

![FlightPlot Charts](../../assets/flight_log_analysis/flightplot_0.2.16.png)

### PX4Tools

[PX4Tools](https://github.com/dronecrew/px4tools) is a log analysis toolbox for the PX4 autopilot written in Python. The recommended installation procedure is to use [anaconda3](https://conda.io/docs/index.html). See [px4tools github page](https://github.com/dronecrew/px4tools) for details.

Key features:

* Easy to share, users can view notebooks on Github \(e.g. [https://github.com/jgoppert/lpe-analysis/blob/master/15-09-30%20Kabir%20Log.ipynb](https://github.com/jgoppert/lpe-analysis/blob/master/15-09-30 Kabir Log.ipynb)\)
* Python based, cross platform, works witn anaconda 2 and anaconda3
* iPython/ jupyter notebooks can be used to share analysis easily
* Advanced plotting capabilities to allow detailed analysis

![PX4Tools-based analysis](../../assets/flight_log_analysis/px4tools.png)

### MAVGCL

[ MAVGCL ](https://github.com/ecmnet/MAVGCL)是 PX4 在飞行中的日志分析器。 它还可以与下载的 uLog 文件一起在离线模式下使用。

关键特性：

* 基于 MAVLink 消息或 MAVLink 上 ULOG 数据的实时数据采集( 50 ms 采样，100 ms 滚动显示)
* 由消息( MAVLink 和 ULog) 和参数更改(仅 MAVLink) 注释的时间图
* 选定的关键指标的 XY 分析
* 3D 视图 (飞行器和观察者视角)
* MAVLink inspector 面板(报告原始 MAVLink 消息)
* 离线模式：从 PX4Log/ULog 导入关键指标(通过 WiFi 从设备上获取文件或最后一次日志)
* 基于 Java 在 MacOS 和 Ubuntu 上运行。
* 更多……

![MAVGCL](../../assets/flight_log_analysis/mavgcl/time_series.png)