---
canonicalUrl: https://docs.px4.io/main/ko/companion_computer/video_streaming
---

# 동영상 스트리밍 (보조 컴퓨터/QGroundControl)

PX4 기반의 기체는 보조 컴퓨터에 연결된 카메라를 사용하여 비디오 스트리밍을 제공합니다. GStreamer는인터넷으로 *QGroundControl*에 비디오를 전송합니다.

:::note PX4에 연결된 카메라에서 직접 비디오를 스트리밍 할 수 없습니다.
:::

보조 컴퓨터와 *QGroundControl*을 실행하는 시스템 모두에 *GStreamer* 패키지를 설치하여야 합니다.

*QGroundControl*은 GStreamer 1.14.4와 *QtGstreamer*의 제거 된 버전을 사용하여 UDP RTP 및 RSTP 비디오 스트리밍을 지원합니다.

## 보조 컴퓨터 설정

*GStreamer* 설치 및 보조 컴퓨터에서 스트림 시작에 대한 일반적인 지침은 [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md)에서 제공됩니다.

## QGC 설정

QGC로 비디오 스트리밍을 설정하고 사용하려면 :

1. QGC를 실행하기 전에 GStreamer를 설치하십시오. Ubuntu에서는 아래의 명령어로 설치합니다.
   ```
   sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
   ```
   다른 플랫폼의 경우 [QGroundControl VideoReceiver README](https://github.com/mavlink/qgroundcontrol/blob/master/src/VideoReceiver/README.md)의 지침을 참고하십시오.
1. *Fly View*에서 동영상 설정: [QGroundControl > 일반 설정 (설정보기) > 비디오 ](https://docs.qgroundcontrol.com/master/en/SettingsView/General.html#video)
1. 모든 것이 정상적으로 작동하게 되면, QGC 비디오 스위처 (QGC Fly View 왼쪽 하단 모서리)에 비디오 스트림이 표시됩니다. 아래 스크린 샷과 같이 비디오 스위처를 클릭하여 비디오를 전체 화면으로 전환  수 있습니다.

   ![QGC에서의 실시간 동영상 전송 화면](../../assets/videostreaming/qgc-screenshot.png)



## 가제보 시뮬레이션

Gazebo는 시뮬레이션 환경에서 비디오 스트리밍을 지원합니다. 자세한 내용은 [가제보 시뮬레이션 > 비디오 스트리밍](../simulation/gazebo.md#video-streaming)을 참고하십시오.