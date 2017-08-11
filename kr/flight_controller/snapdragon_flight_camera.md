# Snapdragon Flight에서 카메라 사용하기

아래 방향을 향하는 gray-scale 카메라는 optical flow기반의 positioin stabilization에 사용되고 정면을 향하는 RGB 카메라가 있습니다. [snap_cam](https://github.com/PX4/snap_cam) repo는 카메라 실행 및 스트리밍 및 optical flow를 계산하는 방법을 제공합니다.

카메라 뿐만 아니라, optical flow는 아래 방향으로 거리 센서가 필요합니다. 여기서는 TeraRanger One을 사용하는 방법에 대해서 논의해 봅니다.

## Optical Flow
optical flow는 어플리케이션 프로세서에서 계산하며 Mavlink를 통해 PX4로 전달됩니다.
readme에 있는 지시에 따라 [snap_cam](https://github.com/PX4/snap_cam) repo를 clone하고 컴파일합니다.

root 권한으로 optical flow 어플리케이션을 실행:
```
optical_flow -n 50 -f 30
```

optical flow 어플리케이션은 PX4에게 IMU Mavlink 메시지를 요청합니다. 추가적인 Mavlink 인스턴스를 PX4에 추가하기 위해서는 다음을 `mainapp.config`에 추가해야할 수도 있습니다 :
```
mavlink start -u 14557 -r 1000000 -t 127.0.0.1 -o 14558
mavlink stream -u 14557 -s HIGHRES_IMU -r 250
```

### TeraRanger One 셋업
TeraRanger One (TROne)을 Snapdragon Flight에 연결하기 위해서, TROne I2C 아답터를 반드시 사용해야만 합니다. TROne는 반드시 벤더가 제공하는 I2C 펌웨어로 플래쉬해야만 합니다.

TROne은 커스텀 DF13 4-to-6 핀 케이블을 통해서 Snapdragon Flight에 연결합니다. J15 커넥터(USB 옆)를 사용하는 것을 추천하며 다른 것들은(RC, ESC, GPS) 이미 사용 중입니다. 연결은 다음과 같습니다 :

| 4 pin | <-> | 6 pin |
| -- | -- | -- |
| 1 |  | 1 |
| 2 |  | 6 |
| 3 |  | 4 |
| 4 |  | 5 |

TROne은 반드시 10 - 20V 전압을 사용해야 합니다.

## QGroundControl에서 카메라 스트리밍

카메라의 라이브 스트림을 보기 위해서 `qcamvid`를 사용합니다. 720p 해상도 레코딩 없이 10분동안 카메라 스트림을 위해서 Snapdragon Flight에 다음 명령을 실행합니다.
```
qcamvid -c hires -r 720p -s -t 600
```
`qcamvid -h`을 사용하면 모든 옵션을 볼 수 있습니다.

라이브 스트림을 QGroundControl에서 보기 위해서는 gstreamer로 빌드해야만 합니다. ([여기](https://github.com/mavlink/qgroundcontrol/tree/master/src/VideoStreaming)를 참고하세요)

일단 Snapdragon Flight의 네트워크에 설치하고 연결되면, QGroundControl은 다음과 같이 변경됩니다.

![](../../assets/videostreaming/QGC_snapdragon_streaming_settings.png)
