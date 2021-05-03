# 동영상 스트리밍 (보조 컴퓨터/QGroundControl)

PX4 기반의 기체는 보조 컴퓨터에 연결된 카메라를 사용하여 비디오 스트리밍을 제공합니다. GStreamer는인터넷으로 *QGroundControl*에 비디오를 전송합니다.

:::note PX4에 연결된 카메라에서 직접 비디오를 스트리밍 할 수 없습니다.
:::

To support streaming use cases you will need to install *GStreamer* development packages on both your companion computer and on the system running *QGroundControl*.

*QGroundControl* uses GStreamer 1.14.4 and a stripped down version of *QtGstreamer* to support UDP RTP and RSTP video streaming.

## Companion Computer Setup

General instructions for installing *GStreamer* and starting the stream on your companion computer are provided in the [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

## QGC Setup

To setup and use video steaming with QGC:

1. Install GStreamer before running QGC. On Ubuntu this is done with the command:
   ```
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```
   For other platforms follow the instructions in [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).
1. Enable video in *Fly View*: [QGroundControl > General Settings (Settings View) > Video](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)
1. If everything works, you should see the video stream displayed in the QGC Video Switcher (QGC Fly View bottom left corner). You can click on the video switcher to toggle the video full-screen, as shown in the screenshot below.

   ![QGC displaying video stream](../../assets/videostreaming/qgc-screenshot.png)



## Gazebo Simulation

Gazebo support video streaming from within the simulated environment. For more information see [Gazebo Simulation > Video Streaming](../simulation/gazebo.md#video-streaming).