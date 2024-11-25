# Аналіз журналу польотів

Ця тема містить огляд інструментів і методів, які можна використовувати для аналізу бортових журналів PX4 (у деяких випадках нижче є посилання на більш детальні теми).

:::info INFO
[Flight Reporting](../getting_started/flight_reporting.md) explains how to download a log and report/discuss issues about a flight with the development team.
:::

## Структурований аналіз

Перш ніж аналізувати бортовий журнал, важливо визначити його контекст:

- Якщо аналіз проводиться після несправності, чи зафіксував бортовий журнал збій, чи він зупинився в польоті?
- Чи всі контролери відстежували свої посилання?
  Найпростіший спосіб визначити це - порівняти показники крену і тангажу з їхніми заданими значеннями.
- Чи виглядають дані датчика достовірними? Чи була дуже сильна вібрація (розумним порогом для сильної вібрації є будь-яка вібрація з піковою швидкістю понад 2-3 м/с/с).
- If the root cause is not specific to the vehicle make sure to report it with a link to the log file (and video if one exists) on the [PX4 issue tracker](https://github.com/PX4/PX4-Autopilot/issues/new).

## Виключення перебоїв з живленням

If a log file ends mid-air, two main causes are possible: a power failure _or_ a hard fault of the operating system.

On autopilots based on the [STM32 series](http://www.st.com/en/microcontrollers/stm32-32-bit-arm-cortex-mcus.html), hard faults are logged to the SD card.
These are located on the top level of the SD card and named _fault_date.log_, e.g. **fault_2017_04_03_00_26_05.log**.
Ви повинні перевірити наявність цього файлу, якщо журнал польоту раптово закінчується.

## Інструменти аналізу

### Flight Review (Онлайн інструмент)

[Flight Review](http://logs.px4.io) is the successor of _Log Muncher_.
It is used in combination with the new [ULog](../dev_log/ulog_file_format.md) logging format.

Основні функції:

- Веб-орієнтований, відмінно підходить для кінцевих користувачів.
- Users can upload logs through the web interface, and then share report with others (bulk upload is supported using the [upload_log.py](https://github.com/PX4/PX4-Autopilot/blob/main/Tools/upload_log.py) script)
- Інтерактивні графіки.

![Flight Review Charts](../../assets/flight_log_analysis/flight_review/flight-review-example.png)

See [Log Analysis using Flight Review](../log/flight_review.md) for an introduction.

### PlotJuggler

[PlotJuggler](https://github.com/facontidavide/PlotJuggler) is a desktop application that allows users to easily visualize and analyze data expressed in the form of time series.
This is one of the best ULog analysis tools as it exposes all information in the log ([Flight Review](#flight-review-online-tool), by comparison, only shows a small subset of the data).

Підтримує файли ULog (.ulg) починаючи з версії 2.1.4.

Основні функції:

- Intuitive drag & drop interface.
- Розташовуйте дані на кількох графіках, вкладках або вікнах.
- Всі теми uORB показані і можуть бути відображені на графіку.
- Після того, як ви впорядкували свої дані, збережіть їх у файл "Layout" й завантажуйте багато разів.
- Process your data inside _PlotJuggler_ itself, using custom "data transformations".

Source code and downloads are available on [Github](https://github.com/facontidavide/PlotJuggler).

![PlotJuggler](../../assets/flight_log_analysis/plot_juggler/plotjuggler_example_view.png)

See [Log Analysis using Plot Juggler](../log/plotjuggler_log_analysis.md) for an introduction.

### pyulog

[pyulog](https://github.com/PX4/pyulog) is a python package to parse ULog files, along with a set of command-line scripts to extract/display ULog information and convert them to other file formats.

Основні функції:

- Бібліотека Python для розбору файлів ULog. Базова бібліотека, що використовується рядом інших інструментів аналізу та візуалізації ULog.
- Скрипти для вилучення/відображення інформації ULog:
  - _ulog_info_: display information from an ULog file.
  - _ulog_messages_: display logged messages from an ULog file.
  - _ulog_params_: extract parameters from an ULog file.
- Скрипти для конвертації ULog файлів в інші формати:
  - _ulog2csv_: convert ULog to (several) CSV files.
  - _ulog2kml_: convert ULog to (several) KML files.

All scripts are installed as system-wide applications (i.e. they be called on the command line - provided Python is installed), and support the `-h` flag for getting usage instructions. Наприклад:

```sh
$ ulog_info -h
usage: ulog_info [-h] [-v] file.ulg

Display information from an ULog file

positional arguments:
  file.ulg       ULog input file

optional arguments:
  -h, --help     show this help message and exit
  -v, --verbose  Verbose output
```

Below we see the kind of information exported from a sample file using _ulog_info_.

```sh
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
```

### FlightPlot

[FlightPlot](https://github.com/PX4/FlightPlot) is a desktop based tool for log analysis. It can be downloaded from [FlightPlot Downloads](https://github.com/PX4/FlightPlot/releases) (Linux, MacOS, Windows).

Основні функції:

- На основі Java, кросплатформенний.
- Інтуїтивний GUI, не потрібні знання програмування.
- Підтримує як нові, так і старі формати журналів PX4 (.ulg, .px4log, .bin)
- Дозволяє зберігати графіки як зображення.

![FlightPlot Charts](../../assets/flight_log_analysis/flightplot_0.2.16.png)

### PX4Tools

[PX4Tools](https://github.com/dronecrew/px4tools) is a log analysis toolbox for the PX4 autopilot written in Python.
The recommended installation procedure is to use [anaconda3](https://conda.io/docs/index.html). See [px4tools github page](https://github.com/dronecrew/px4tools) for details.

Основні функції:

- Easy to share, users can view notebooks on Github (e.g. [15-09-30 Kabir Log.ipynb](https://github.com/jgoppert/lpe-analysis/blob/master/15-09-30%20Kabir%20Log.ipynb))
- На основі Python, кросплатформенний, працює з anaconda 2 та anaconda3
- Блокноти iPython/jupyter можна використовувати для легкого обміну аналізом
- Розширені можливості графіків для детального аналізу

![PX4Tools-based analysis](../../assets/flight_log_analysis/px4tools.png)

### MAVGCL

[MAVGCL](https://github.com/ecmnet/MAVGCL) is an in-flight log analyzer for PX4.
Його також можна використовувати в офлайн режимі із завантаженими файлами uLog.

Основні функції:

- Збір даних в реальному часі (вибірка 50 мс, відображення 100 мс) на основі повідомлень MAVLink або даних ULOG через MAVLink
- Часова діаграма, анотована повідомленнями (MAVLink та ULog) та змінами параметрів (тільки MAVLink)
- XY-аналіз для обраних ключових фігур
- 3D-вигляд (перспектива транспортного засобу та спостерігача)
- Інспектор MAVLink (звітування про необроблені повідомлення MAVLink)
- Офлайн-режим: Імпорт ключових показників з PX4Log/ULog (файл або останній лог з пристрою через WiFi)
- На основі Java. Відомо, що працює в macOS та Ubuntu.
- Та багато іншого...

![MAVGCL](../../assets/flight_log_analysis/mavgcl/time_series.png)

### Data Comets

[Data Comets](https://github.com/dsaffo/DataComets) is a interactive PX4 flight log analysis tool that allows you to encode flight data onto the flight path, filter and brush the data by time - and much more!

You can use the online version of the tool for small log files (< 32Mb), or run it locally in order to analyze longer flights.

![Data Comets](../../assets/flight_log_analysis/data_comets/data_comets_overview.gif)
