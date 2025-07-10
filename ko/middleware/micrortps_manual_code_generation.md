---
canonicalUrl: https://docs.px4.io/main/ko/middleware/micrortps_manual_code_generation
---

# 클라이언트 및 에이전트 코드 수동 생성

클라이언트와 에이전트 코드를 수동으로 생성하는 방법을 설명합니다(PX4 펌웨어가 컴파일될 때 코드를 [자동으로 생성](../middleware/micrortps.md)하는 대신).

코드는 Python 스크립트 **/Tools/generate_microRTPS_bridge.py**를 사용하여 생성합니다.

:::note
이 방법은 새 메시지를 만들거나 PX4 도메인 외부에서 생성된 코드를 사용하려는 경우에 디버깅 목적으로 사용하여야 합니다. 그렇지 않으면, PX4-Autopilot 빌드 시스템을 사용하는 [PX4-Fast RTPS(DDS) Bridge](../middleware/micrortps.md)에 설명된 *일반* 방법을 사용하십시오.
:::

## 자동 브리지 코드 생성 비활성화

먼저, 브리지 코드 자동 생성을 비활성화합니다. 대상 플랫폼의 **.cmake** 파일에서 `GENERATE_RTPS_BRIDGE` 변수를 *off*로 설정합니다.

```sh
set(GENERATE_RTPS_BRIDGE off)
```

## generate_microRTPS_bridge.py 사용

*generate_microRTPS_bridge* 스크립트의 명령 구문은 다음과 같습니다.

```sh
$ cd /path/to/PX4/PX4-Autopilot/msg/tools
$ python generate_microRTPS_bridge.py -h
usage: generate_microRTPS_bridge.py [-h] [-a] [-c] [-i] [-j IDL_DIR] [-m] [-l]
                                    [-t MSGDIR] [-b UORB_TEMPLATES]
                                    [-q URTPS_TEMPLATES] [-y YAML_FILE]
                                    [-p PACKAGE] [-o AGENTDIR] [-u CLIENTDIR]
                                    [-f [FASTRTPSGEN]]
                                    [-g FASTRTPSGEN_INCLUDE]
                                    [-r [ROS2_DISTRO]] [--delete-tree]

optional arguments:
  -h, --help            show this help message and exit
  -a, --agent           Flag for generate the agent, by default is true if -c
                        is not specified
  -c, --client          Flag for generate the client, by default is true if -a
                        is not specified
  -i, --generate-idl    Flag for generate idl files for each msg
  -j IDL_DIR, --idl-dir IDL_DIR
                        IDL files dir
  -m, --mkdir-build     Flag to create 'build' dir
  -l, --generate-cmakelists
                        Flag to generate a CMakeLists.txt file for the micro-
                        RTPS agent
  -t MSGDIR, --topic-msg-dir MSGDIR
                        Topics message, by default using relative path 'msg/'
  -b UORB_TEMPLATES, --uorb-templates-dir UORB_TEMPLATES
                        uORB templates, by default using relative path to
                        msgdir 'templates/uorb_microcdr'
  -q URTPS_TEMPLATES, --urtps-templates-dir URTPS_TEMPLATES
                        uRTPS templates, by default using relative path to
                        msgdir 'templates/urtps'
  -y YAML_FILE, --rtps-ids-file YAML_FILE
                        RTPS msg IDs definition path, by default using
                        relative path to msgdir
                        'tools/uorb_rtps_message_ids.yaml'
  -p PACKAGE, --package PACKAGE
                        Msg package naming, by default px4
  -o AGENTDIR, --agent-outdir AGENTDIR
                        Agent output dir, by default using relative path
                        'src/modules/micrortps_bridge/micrortps_agent'
  -u CLIENTDIR, --client-outdir CLIENTDIR
                        Client output dir, by default using relative path
                        'src/modules/micrortps_bridge/micrortps_client'
  -f [FASTRTPSGEN], --fastrtpsgen-dir [FASTRTPSGEN]
                        fastrtpsgen installation dir, only needed if
                        fastrtpsgen is not in PATH, by default empty
  -g FASTRTPSGEN_INCLUDE, --fastrtpsgen-include FASTRTPSGEN_INCLUDE
                        directory(ies) to add to preprocessor include paths of
                        fastrtpsgen, by default empty
  -r [ROS2_DISTRO], --ros2-distro [ROS2_DISTRO]
                        ROS 2 distro, only required if generating the agent for
                        usage with ROS 2 nodes, by default empty
  --delete-tree         Delete dir tree output dir(s)
```

:::caution
`--delete-tree` 옵션과 함께 사용하면 새 파일과 폴더를 만들기 전에 `CLIENTDIR` 및 `AGENTDIR`의 내용이 지워집니다.
:::

- 인수 `--send/-s` 및 `--receive/-r`은 PX4에서 송수신하는 uORB 주제를 지정합니다. 코드는 지정된 메시지에 대해서만 생성됩니다.
- 출력은 `CLIENTDIR`(기본적으로 `-o src/modules/micrortps_bridge/micrortps_client`) 및 `AGENTDIR`(`-u src/modules/micrortps_bridge/micrortps_agent` 기본값)에 표시됩니다.
- 플래그 `-a` 또는 `-c`를 지정하지 않으면 클라이언트와 에이전트가 모두 생성되고 설치됩니다.
- *Fast DDS*가 기본 위치(`-f /path/to/fastdds/installation/bin</0)에 설치되지 않은 경우 <code>-f` 옵션이 필요할 수 있습니다.

아래 예는 `sensor_baro` 단일 uORB 주제만 게시/구독하는 브리지 코드를 생성하는 방법을 보여줍니다.

```sh
$ cd /path/to/PX4/Firmware
$ python Tools/generate_microRTPS_bridge.py -s msg/sensor_baro.msg -r msg/sensor_combined.msg
```

## 생성된 코드

uORB 메시지의 *클라이언트*, *에이전트*, *CDR 직렬화/역직렬화* 및 관련 RTPS 메시지(IDL 파일)를 정의하는 코드가 생성됩니다.

브리지에 대해 수동으로 생성된 코드는 여기(기본값)에서 찾을 수 있습니다.

- *클라이언트*: **src/modules/micrortps_bridge/micrortps_client/**
- *에이전트*: **src/modules/micrortps_bridge/micrortps_agent/**


### uORB 직렬화 코드

직렬화 함수는 일반 PX4 컴파일 프로세스의 일부로 모든 uORB 주제에 대하여 생성됩니다(또한 수동 생성을 위하여). 예를 들어 *sensor_combined.msg*에 대해 다음 함수가 생성됩니다.

```sh
void serialize_sensor_combined(const struct sensor_combined_s *input, char *output, uint32_t *length, struct microCDR *microCDRWriter);
void deserialize_sensor_combined(struct sensor_combined_s *output, char *input, struct microCDR *microCDRReader);
```

### RTPS 메시지 IDL 파일

IDL 파일은 브리지 생성 시 uORB **.msg** 파일([선택한 uORB 주제에 대하여](../middleware/micrortps.md#supported-uorb-messages))에서 생성됩니다. 생성된 파일은**src/modules/micrortps_bridge/micrortps_agent/idl/** 에서 찾을 수 있습니다.

*Fast DDS*는 IDL 파일을 사용하여 RTPS/DDS 메시지(이 경우 uORB 주제에 매핑되는 RTPS/DDS 메시지)의 구조를 정의합니다. They are used to generate code for the *Agent*, and *Fast DDS* applications that need to publish/subscribe to uORB topics.

:::note IDL
파일은 *fastrtpsgen* 도구에 의해 C++로 컴파일됩니다.
:::

## 코드 생성 검증

출력 디렉토리가 아래 표시된 목록과 일치하는지 확인하여, 성공적인 코드 생성을 확인할 수 있습니다(Linux에서는 `tree` 명령을 사용하여 파일 구조를 나열할 수 있음).

에이전트 디렉터리:
```sh
$ tree src/modules/micrortps_bridge/micrortps_agent
src/modules/micrortps_bridge/micrortps_agent
├── build
├── CMakeLists.txt
├── idl
│   ├── sensor_baro_.idl
│   └── sensor_combined_.idl
├── microRTPS_agent.cpp
├── microRTPS_timesync.cpp
├── microRTPS_timesync.h
├── microRTPS_transport.cpp
├── microRTPS_transport.h
├── RtpsTopics.cpp
├── RtpsTopics.h
├── sensor_baro_.cpp
├── sensor_baro_.h
├── sensor_baro_Publisher.cpp
├── sensor_baro_Publisher.h
├── sensor_baro_PubSubTypes.cpp
├── sensor_baro_PubSubTypes.h
├── sensor_combined_.cpp
├── sensor_combined_.h
├── sensor_combined_PubSubTypes.cpp
├── sensor_combined_PubSubTypes.h
├── sensor_combined_Subscriber.cpp
└── sensor_combined_Subscriber.h
 2 directories, 20 files
```

클라이언트 디렉토리:
```sh
$ tree src/modules/micrortps_bridge/micrortps_client
src/modules/micrortps_bridge/micrortps_client
├── CMakeLists.txt
├── microRTPS_client.cpp
├── microRTPS_client_dummy.cpp
├── microRTPS_client_main.cpp
├── microRTPS_transport.cpp
└── microRTPS_transport.h
 0 directories, 4 files
```

## 코드 빌드 및 사용

수동으로 생성된 *클라이언트* 코드는 [자동으로 생성된 클라이언트 코드](../middleware/micrortps.md#client_firmware)와 같은 방식으로 *정확히* 빌드되고 사용됩니다.

특히, 수동으로 생성된 *클라이언트* 소스 코드는 컴파일되어 일반 빌드 프로세스의 일부로 PX4 펌웨어에 빌드됩니다. For example, to compile the code and include it in Firmware for NuttX/Pixhawk targets:

```sh
make px4_fmu-v4_rtps upload
```

:::note
도구 체인이 수동으로 생성된 소스 코드를 사용하고, 다시 생성을 시도하지 않도록 먼저 [자동 브리지 코드 생성을 비활성화](#disable-automatic-bridge-code-generation)하여야 합니다.
:::

수동으로 생성된 *에이전트* 코드도 [자동으로 생성된 코드](../middleware/micrortps.md#agent-in-an-offboard-fast-dds-interface-ros-independent)와 동일한 방식으로 컴파일되어 사용됩니다. 유일한 차이점은 수동 소스 코드가 <strong>build/BUILDPLATFORM</strong>**/src/modules/micrortps_bridge/micrortps_agent/ 대신 **src/modules/micrortps_bridge/micrortps_agent**에서 생성되는 점입니다.</p>
