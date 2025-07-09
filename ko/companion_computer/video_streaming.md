---
canonicalUrl: https://docs.px4.io/main/ko/companion_computer/video_streaming
---

# 동영상 스트리밍 (보조 컴퓨터/QGroundControl)

PX4-based vehicles support video streaming using a camera connected to a [companion computer](../companion_computer/README.md).

:::note
PX4에 연결된 카메라에서 직접 비디오를 스트리밍 할 수 없습니다.
:::

GStreamer is used to send the video to _QGroundControl_ over an IP link. To support streaming use cases you will need to install _GStreamer_ development packages on both your companion computer and on the system running _QGroundControl_. _QGroundControl_ uses GStreamer 1.14.4 and a stripped down version of _QtGstreamer_ to support UDP RTP and RSTP video streaming.

## 보조 컴퓨터 설정

General instructions for installing _GStreamer_ and starting the stream on a companion computer are provided in the [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

The setup of cameras and data links depends on many factors. Examples in this library are listed below (note, these are options, not "recommended"):

- [Video Streaming using WFB-ng Wifi](../companion_computer/video_streaming_wfb_ng_wifi.md) (Tutorial): Using RaPi and WiFi module in unconnected (broadcast) mode to stream video and as a bidirectional telemetry link.

## QGC 설정

QGC로 비디오 스트리밍을 설정하고 사용하려면 :

1. QGC를 실행하기 전에 GStreamer를 설치하십시오. Ubuntu에서는 아래의 명령어로 설치합니다.

   ```sh
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```

   다른 플랫폼의 경우 [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md)의 지침을 참고하십시오.

1. Enable video in _Fly View_: [QGroundControl > General Settings (Settings View) > Video](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)
1. 모든 것이 정상적으로 작동하게 되면, QGC 비디오 스위처 (QGC Fly View 왼쪽 하단 모서리)에 비디오 스트림이 표시됩니다. 아래 스크린 샷과 같이 비디오 스위처를 클릭하여 비디오를 전체 화면으로 전환  수 있습니다.

   ![QGC에서의 실시간 동영상 전송 화면](../../assets/videostreaming/qgc-screenshot.png)

## Gazebo Classic Simulation

[Gazebo Classic](../sim_gazebo_classic/README.md) supports video streaming from within the simulated environment. For more information see [Gazebo Classic Simulation > Video Streaming](../sim_gazebo_classic/README.md#video-streaming).
