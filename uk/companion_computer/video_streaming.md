# Відеотрансляція (Супутній комп'ютер/QGroundControl)

PX4-based vehicles support video streaming using a camera connected to a [companion computer](../companion_computer/index.md).

:::info
You can't video stream directly from a camera connected to PX4.
:::

GStreamer is used to send the video to _QGroundControl_ over an IP link.
To support streaming use cases you will need to install _GStreamer_ development packages on both your companion computer and on the system running _QGroundControl_.
_QGroundControl_ uses GStreamer 1.14.4 and a stripped down version of _QtGstreamer_ to support UDP RTP and RSTP video streaming.

## Налаштування Компаньйонного Комп'ютера

General instructions for installing _GStreamer_ and starting the stream on a companion computer are provided in the [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/index.md).

Налаштування камер та даних залежить від багатьох факторів.
Нижче наведено приклади з цієї бібліотеки (зауважте, що це варіанти, а не "рекомендації"):

- [Video Streaming using WFB-ng Wifi](../companion_computer/video_streaming_wfb_ng_wifi.md) (Tutorial): Using RPi and WiFi module in unconnected (broadcast) mode to stream video and as a bidirectional telemetry link.

## Налаштування QGC

Для налаштування та використання відеотрансляції з QGC:

1. Встановіть GStreamer перед запуском QGC.
   У Ubuntu це можна зробити за допомогою команди:

   ```sh
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```

   For other platforms follow the instructions in [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/index.md).

2. Enable video in _Fly View_: [QGroundControl > General Settings (Settings View) > Video](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/settings_view/general.html#video)

3. Якщо все працює, ви повинні побачити відеопотік, відображений у перемикачі відео QGC (лівий нижній кут режиму Fly View QGC).
   Ви можете клацнути на перемикач відео, щоб перемикати відео на повний екран, як показано на знімку екрану нижче.

   ![QGC displaying video stream](../../assets/videostreaming/qgc-screenshot.png)

## Симуляція Gazebo Classic

[Gazebo Classic](../sim_gazebo_classic/index.md) supports video streaming from within the simulated environment.
For more information see [Gazebo Classic Simulation > Video Streaming](../sim_gazebo_classic/index.md#video-streaming).
