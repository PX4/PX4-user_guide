# Video Streaming on PX4/QGroundControl

QGroundControl uses GStreamer 1.14.4 and a stripped down version of QtGstreamer to support UDP RTP and RSTP video streaming.

To support streaming use cases you will need to install GStreamer development packages on both your companion computer and on the system running QGroundControl.

> **Note** You can't video stream directly from a camera connected to PX4.
  You will need to stream from a companion computer connected to QGroundControl with an IP link.

## Companion Computer Setup

General instructions for installing *GStreamer* and starting the stream on your companion computer are provided in the [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).

##  QGC Setup

To setup and use video steaming with QGC:

1. Install GStreamer before running QGC.
   On Ubuntu this is done with the command:
   ```
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```
   For other platforms follow the instructions in [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md).
1. Enable video in Fly View: [QGroundControl > General Settings (Settings View) > Video](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)
1. If everything works, you should see the video stream on the bottom left corner in the flight-mode window of *QGroundControl* as shown in the screenshot below. 

   ![QGC displaying video stream](https://github.com/mavlink/qgc-user-guide/raw/master/assets/fly/video_record.jpg)
   <!-- replace ../../assets/videostreaming/qgc-screenshot.png -->

   If you click on the video stream, the satellite map is shown in the left bottom corner and the video is shown in the whole background.
