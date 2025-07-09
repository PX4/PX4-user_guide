---
canonicalUrl: https://docs.px4.io/main/ru/companion_computer/video_streaming
---

# Video Streaming (Companion Computer/QGroundControl)

PX4-based vehicles support video streaming using a camera connected to a [companion computer](../companion_computer/README.md).

:::note
You can't video stream directly from a camera connected to PX4.
:::

GStreamer is used to send the video to _QGroundControl_ over an IP link. To support streaming use cases you will need to install _GStreamer_ development packages on both your companion computer and on the system running _QGroundControl_. _QGroundControl_ uses GStreamer 1.14.4 and a stripped down version of _QtGstreamer_ to support UDP RTP and RSTP video streaming.

## Companion Computer Setup

General instructions for installing _GStreamer_ and starting the stream on a companion computer are provided in the [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

The setup of cameras and data links depends on many factors. Examples in this library are listed below (note, these are options, not "recommended"):

- [Video Streaming using WFB-ng Wifi](../companion_computer/video_streaming_wfb_ng_wifi.md) (Tutorial): Using RaPi and WiFi module in unconnected (broadcast) mode to stream video and as a bidirectional telemetry link.

## QGC Setup

To setup and use video steaming with QGC:

1. Install GStreamer before running QGC. On Ubuntu this is done with the command:

   ```sh
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```

   For other platforms follow the instructions in [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

1. Enable video in _Fly View_: [QGroundControl > General Settings (Settings View) > Video](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)
1. If everything works, you should see the video stream displayed in the QGC Video Switcher (QGC Fly View bottom left corner). You can click on the video switcher to toggle the video full-screen, as shown in the screenshot below.

   ![QGC displaying video stream](../../assets/videostreaming/qgc-screenshot.png)

## Gazebo Classic Simulation

[Gazebo Classic](../sim_gazebo_classic/README.md) supports video streaming from within the simulated environment. For more information see [Gazebo Classic Simulation > Video Streaming](../sim_gazebo_classic/README.md#video-streaming).
