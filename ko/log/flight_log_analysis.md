# 비행 로그 분석

PX4 비행 로그를 분석 방법과 소프트웨어에 대하여 설명합니다.

## 비행 보고서

[비행 보고서](../getting_started/flight_reporting.md)에서는 로그를 다운로드하여 개발팀과 함께 비행 문제를 보고/토론하는 방법을 설명합니다.

## 구조 분석

비행 로그를 분석하기 전에 상황 파악이 더 중요합니다.

* 오작동 후 분석이 수행되면 로그에 충돌이 캡처 되었습니까 아니면 공중에서 중지 되었습니까?
* 모든 컨트롤러가 사건들을 추적 했습니까? 이를 설정하는 가장 쉬운 방법은 자세의 롤 및 피치 속도를 설정 포인트와 비교하는 것입니다.
* 센서 데이터가 유효합니까? 매우 강한 진동이 있었습니까? (강한 진동에 대한 합리적인 임계 값은 피크 대 피크가 2-3m/s/ s 이상인 모든 것입니다.)
* 근본 원인이 차량에 국한되지 않은 경우 [PX4 문제 추적기 ](https://github.com/PX4/PX4-Autopilot/issues/new)의 로그 파일 \ (존재하는 경우 동영상 포함)\에 대한 링크와 함께 보고해야합니다.

## 정전 방지

로그 파일이 비행중에 중단되는 경우는 두 가지 주요 원인일 수 있습니다. 정전 *또는* 운영 체제의 심각한 오류입니다.

[STM32 시리즈](http://www.st.com/en/microcontrollers/stm32-32-bit-arm-cortex-mcus.html?querycriteria=productId=SC1169) 기반 자동 조종 장치에서는 운영 체제의 하드 오류가 SD 카드에 기록됩니다. 이러한 파일은 SD 카드의 최상위 수준에 있으며 *fault\_date.log*로 이름이 지정됩니다 (예 : **오류\_2017\_04\_03\_00\_26\_05.log**. 비행 로그가 갑자기 종료되는 경우 항상이 파일이 있는지 확인하십시오.

## 분석 도구

### Flight Review (온라인 도구)

[Flight Review](http://logs.px4.io)는 *Log Muncher*의 후속 제품입니다. 새로운 [ULog](../dev_log/ulog_file_format.md) 로깅 형식과 함께 사용됩니다.

주요 기능:

* 웹 기반으로 되어 있어며, 일반 사용자에게 적합합니다.
* 사용자는 보고서를 업로드하고 다른 사람과 공유 할 수 있습니다.
* 대화형 플롯.

![Flight Review Charts](../../assets/flight_log_analysis/flight_review/flight-review-example.png)

입분용 [비행 검토를 사용한 로그 분석 ](flight_review.md)을 참조하세요.

### pyulog

[pyulog](https://github.com/PX4/pyulog)는 ULog 정보를 추출/표시하고 다른 파일 형식으로 변환하는 일련의 명령 줄 스크립트와 함께 ULog 파일을 구문 분석하는 Python 패키지입니다.

주요 기능:

* ULog 파일을 구문 분석하기위한 Python 라이브러리입니다. 다른 여러 ULog 분석 및 시각화 도구에서 사용하는 기본 라이브러리입니다.
* ULog 정보를 추출/표시하는 스크립트 : 
  * *ulog_info* : ULog 파일의 정보를 표시합니다.
  * *ulog_messages* : ULog 파일에서 기록된 메시지를 표시합니다.
  * *ulog_params* : ULog 파일에서 매개 변수를 추출합니다.
* ULog 파일을 다른 포맷으로 변환하는 스크립트 : 
  * *ulog2csv* : ULog를 (여러) CSV 파일로 변환합니다.
  * *ulog2kml* : ULog를 (여러) KML 파일로 변환합니다.

모든 스크립트는 시스템 전체 애플리케이션으로 설치되며 (즉, Python이 설치된 경우 명령 줄에서 호출 됨) 도움말을 `-h` 옵션을 사용하여 볼 수 있습니다. 예:

    $ ulog_info -h
    usage: ulog_info [-h] [-v] file.ulg
    
    ULog 파일의 정보 표시
    
    위치 인수 :
      file.ulg       ULog input file
    
    선택적 인수 :
      -h, --help    이 도움말 메시지를 표시하고 종료
      -v, --verbose 자세한 출력
    

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

[pyFlightAnalysis](https://github.com/Marxlp/pyFlightAnalysis) is a cross-platform PX4 flight log (ULog) visual analysis tool, inspired by [FlightPlot](#flightplot).

Key features:

* Dynamic filter for displaying data
* 3D visualization for attitude and position of drone
* Easily replay with pyqtgraph's ROI (Region Of Interest)
* Python based, cross-platform.

![pyFlightAnalysis 1.0.1b1](../../assets/flight_log_analysis/pyflightanalysis.png)

<span id="flightplot"></span>

### FlightPlot

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

[MAVGCL](https://github.com/ecmnet/MAVGCL) is an in-flight log analyzer for PX4. It can also be used in offline mode with downloaded uLog files.

Key features:

* Realtime data acquisition (50ms sampling, 100ms rolling display) based on MAVLink messages or ULOG data over MAVLink
* Timechart annotated by messages (MAVLink and ULog) and parameter changes (MAVLink only)
* XY Analysis for selected key-figures
* 3D View (vehicle and observer perspective)
* MAVLink inspector (reporting raw MAVLink messages)
* Offline-mode: Import of key-figures from PX4Log/ULog (file or last log from device via WiFi)
* Java based. Known to work on macOS and Ubuntu.
* And many more ...

![MAVGCL](../../assets/flight_log_analysis/mavgcl/time_series.png)

### PlotJuggler

[PlotJuggler](https://github.com/facontidavide/PlotJuggler) is a Qt5 desktop application that allows users to easily visualize and analyze data expressed in the form of time series.

It supports **ULog files** (.ulg) since version 2.1.4.

Key features:

* Intuitive drag&drop interface.
* Arrange your data in multiple plots, tabs or windows.
* Once you arranged your data, save it into a "Layout" file and reload it multiple times.
* Process your data inside PlotJuggler itself, using custom "data transformations".

Source code and downloads are available on [Github](https://github.com/facontidavide/PlotJuggler).

![PlotJuggler](../../assets/flight_log_analysis/plotjuggler.png)

### Data Comets

[Data Comets](https://github.com/dsaffo/DataComets) is a interactive PX4 flight log analysis tool that allows you to encode flight data onto the flight path, filter and brush the data by time - and much more!

You can use the online version of the tool for small log files (< 32Mb), or run it locally in order to analyze longer flights.

![Data Comets](../../assets/flight_log_analysis/data_comets/data_comets_overview.gif)