---
canonicalUrl: https://docs.px4.io/main/ko/modules/modules_communication
---

# 모듈 참조: 통신

## frsky_telemetry
소스: [drivers/telemetry/frsky_telemetry](https://github.com/PX4/PX4-Autopilot/tree/master/src/drivers/telemetry/frsky_telemetry)

FrSky 텔레메트리를 지원합니다. D 또는 S.PORT 프로토콜을 자동으로 감지합니다.
<a id="frsky_telemetry_usage"></a>

### 사용법
```
frsky_telemetry <command> [arguments...]
 Commands:
   start
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyS6
     [-t <val>]  Scanning timeout [s] (default: no timeout)
                 default: 0
     [-m <val>]  Select protocol (default: auto-detect)
                 values: sport|sport_single|sport_single_invert|dtype, default:
                 auto
```
## mavlink
소스: [modules/mavlink](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/mavlink)


### 설명
이 모듈은 직렬 링크 또는 UDP 네트워크에서 사용할 수 있는 MAVLink 프로토콜을 구현합니다. uORB로 시스템과 통신합니다. 일부 메시지는 모듈에서 직접 처리되고(예: 임무 프로토콜), 다른 메시지는 uORB를 통하여 게시됩니다(예: vehicle_command).

스트림은 차량 자세와 같은 특정 속도로 주기적 메시지를 전송합니다. mavlink 인스턴스를 시작시에 활성화된 스트림 세트를 속도와 함께 정의하는 모드를 지정할 수 있습니다. 실행 중인 인스턴스의 경우 `mavlink stream` 명령어를 통하여 스트림을 설정할 수 있습니다.

하나의 직렬 장치 또는 네트워크 포트에 각각 연결된 모듈의 여러 독립 인스턴스가 있을 수 있습니다.

### 구현
구현은 송신 및 수신 스레드의 2개 스레드를 사용합니다. 전송자는 고정된 속도로 실행되며, 결합된 대역폭이 설정된 속도(`-r`)보다 높거나 물리적 링크가 포화된 경우 스트림의 속도를 동적으로 줄입니다. 이것은 `mavlink status`로 확인할 수 있습니다. `rate mult`가 1보다 작은 지 확인하십시오.

**주의**: 일부 데이터는 두 스레드에서 모두 액세스 및 수정되므로 코드를 변경하거나, 기능을 확장시에 경쟁 조건과 데이터 손상을 방지하기 위하여 이를 고려하여야 합니다.

### 예
전송 속도가 921600이고, 최대 전송 속도가 80kB/s인 ttyS1 직렬 포트에서 mavlink를 시작합니다.
```
mavlink start -d /dev/ttyS1 -b 921600 -m onboard -r 80000
```

UDP 포트 14556에서 mavlink를 시작하고, 50Hz로 HIGHRES_IMU 메시지를 활성화합니다.
```
mavlink start -u 14556 -r 1000000
mavlink stream -u 14556 -s HIGHRES_IMU -r 50
```

<a id="mavlink_usage"></a>

### 사용법
```
mavlink <command> [arguments...]
 Commands:
   start         Start a new instance
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyS1
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 57600
     [-r <val>]  Maximum sending data rate in B/s (if 0, use baudrate / 20)
                 default: 0
     [-p]        Enable Broadcast
     [-u <val>]  Select UDP Network Port (local)
                 default: 14556
     [-o <val>]  Select UDP Network Port (remote)
                 default: 14550
     [-t <val>]  Partner IP (broadcasting can be enabled via -p flag)
                 default: 127.0.0.1
     [-m <val>]  Mode: sets default streams and rates
                 values: custom|camera|onboard|osd|magic|config|iridium|minimal|
                 extvision|extvisionmin|gimbal, default: normal
     [-n <val>]  wifi/ethernet interface name
                 values: <interface_name>
     [-c <val>]  Multicast address (multicasting can be enabled via
                 MAV_{i}_BROADCAST param)
                 values: Multicast address in the range
                 [239.0.0.0,239.255.255.255]
     [-f]        Enable message forwarding to other Mavlink instances
     [-w]        Wait to send, until first message received
     [-x]        Enable FTP
     [-z]        Force hardware flow control always on
     [-Z]        Force hardware flow control always off

   stop-all      Stop all instances

   status        Print status for all instances
     [streams]   Print all enabled streams

   stream        Configure the sending rate of a stream for a running instance
     [-u <val>]  Select Mavlink instance via local Network Port
     [-d <val>]  Select Mavlink instance via Serial Device
                 values: <file:dev>
     -s <val>    Mavlink stream to configure
     -r <val>    Rate in Hz (0 = turn off, -1 = set to default)

   boot_complete Enable sending of messages. (Must be) called as last step in
                 startup script.
```
## micrortps_client
소스: [modules/micrortps_bridge/micrortps_client](https://github.com/PX4/PX4-Autopilot/tree/master/src/modules/micrortps_bridge/micrortps_client)

<a id="micrortps_client_usage"></a>

### 사용법
```
micrortps_client <command> [arguments...]
 Commands:
   start
     [-t <val>]  Transport protocol
                 values: UART|UDP, default: UART
     [-d <val>]  Select Serial Device
                 values: <file:dev>, default: /dev/ttyACM0
     [-b <val>]  Baudrate (can also be p:<param_name>)
                 default: 460800
     [-m <val>]  Maximum sending data rate in B/s
                 default: 0
     [-p <val>]  Poll timeout for UART in ms
     [-l <val>]  Limit number of iterations until the program exits
                 (-1=infinite)
                 default: 10000
     [-w <val>]  Time in us for which each read from the link iteration sleeps
                 default: 1
     [-r <val>]  Select UDP Network Port for receiving (local)
                 default: 2019
     [-s <val>]  Select UDP Network Port for sending (remote)
                 default: 2020
     [-i <val>]  Select IP address (remote)
                 values: <x.x.x.x>, default: 127.0.0.1
     [-f]        Activate UART link SW flow control
     [-h]        Activate UART link HW flow control
     [-v]        Add more verbosity

   stop

   status
```
## uorb
소스: [systemcmds/uorb](https://github.com/PX4/PX4-Autopilot/tree/master/src/systemcmds/uorb)


### 설명
uORB는 모듈 간의 통신에 사용되는 내부 pub-sub 메시징 시스템입니다.

### 구현
구현은 비동기식이며 잠금이 없습니다. 게시자는 구독자를 기다리지 않으며, 그 반대도 마찬가지입니다. 이것은 발행자와 구독자 사이에 별도의 버퍼를 가짐으로써 달성됩니다.

코드는 메모리 공간과 메시지 교환 대기 시간을 최소화하도록 최적화되었습니다.

메시지는 `/msg` 디렉토리에 정의됩니다. 빌드 타임에 C/C++ 코드로 변환됩니다.

ORB_USE_PUBLISHER_RULES로 컴파일하면, uORB 게시 규칙이 있는 파일을 사용하여, 어떤 모듈이 어떤 주제를 게시할 수 있는 지 설정할 수 있습니다. 이것은 시스템 전체 재생에 사용됩니다.

### 예
주제 게시 비율을 모니터링합니다. `top` 외에 일반 시스템 검사를 위한 중요한 명령어입니다.
```
uorb top
```

<a id="uorb_usage"></a>

### 사용법
```
uorb <command> [arguments...]
 Commands:
   status        Print topic statistics

   top           Monitor topic publication rates
     [-a]        print all instead of only currently publishing topics with
                 subscribers
     [-1]        run only once, then exit
     [<filter1> [<filter2>]] topic(s) to match (implies -a)
```
