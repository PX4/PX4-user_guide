# 手动生成客户端和代理端代码

本主题演示如何手动生成客户端和代理的代码（而不是编译 PX4 时[自动生成](../middleware/micrortps.md)的）。

代码是使用 python 脚本生成的：**/Tools/generate_microRTPS_bridge.py**。


## 禁用自动桥接代码生成

首先禁用桥接代码的自动生成。 First disable automatic generation of bridge code. Set the variable `GENERATE_RTPS_BRIDGE` to *off* in the **.cmake** file for the target platform:

```sh
set(GENERATE_RTPS_BRIDGE off)
```

## 使用 generate_microRTPS_bridge. py

*generate_microRTPS_bridge* 工具的命令语法如下所示:

```sh
$ cd /path/to/PX4/Firmware/msg/tools
$ python generate_microRTPS_bridge.py -h
usage: generate_microRTPS_bridge.py [-h] [-s *.msg [*.msg ...]]
                                    [-r *.msg [*.msg ...]] [-a] [-c]
                                    [-t MSGDIR] [-o AGENTDIR] [-u CLIENTDIR]
                                    [-f FASTRTPSGEN]

optional arguments:
  -h, --help            显示这个帮助信息并退出
  -s *.msg [*.msg ...], --send *.msg [*.msg ...]
                        要发送的 Topic
  -r *.msg [*.msg ...], --receive *.msg [*.msg ...]
                        要接收的 Topic
  -a, --agent           生成 agent 的参数。
                                    [-r *.msg [*.msg ...]] [-a] [-c]
                                    [-t MSGDIR] [-o AGENTDIR] [-u CLIENTDIR]
                                    [-f FASTRTPSGEN]

optional arguments:
  -h, --help            show this help message and exit
  -s *.msg [*.msg ...], --send *.msg [*.msg ...]
                        Topics to be sent
  -r *.msg [*.msg ...], --receive *.msg [*.msg ...]
                        Topics to be received
  -a, --agent           Flag to generate the agent. 默认值为 true。
  -c, --client          Flag to generate the client. 默认值为 true。 默认值为 true。
  -t MSGDIR, --topic-msg-dir MSGDIR
                        主题消息目录。 -t MSGDIR, --topic-msg-dir MSGDIR
                        Topics message dir. 默认为： msg/
  -o AGENTDIR, --agent-outdir AGENTDIR
                        Agent 输出目录。 Src/modules/micrortps_bridge/micrortps_agent
  -u CLIENTDIR, --client-outdir CLIENTDIR
                        客户端输出目录。 Default is:
                        src/modules/micrortps_bridge/micrortps_agent
  -u CLIENTDIR, --client-outdir CLIENTDIR
                        Client output dir. Default is:
                        src/modules/micrortps_bridge/micrortps_client
  -f FASTRTPSGEN, --fastrtpsgen-dir FASTRTPSGEN
                        fastrtpsgen installation dir. Default is: /bin
  --delete-tree         Delete dir tree output dir(s) 默认是： /bin
  --delete-tree         删除目录树
```

> **Caution** 在创建新文件和文件夹之前，使用 `--delete-tree` 选项会删除 `CLIENTDIR` 和 `AGENTDIR` 的内容。

- The arguments `--send/-s` and `--receive/-r` specify the uORB topics that can be sent/received from PX4. Code will only be generated for specified messages. 将仅为指定的消息生成代码。
- 输出显示在 `CLIENTDIR` (默认情况下 ` src/modules/micrortps_bridge/micrortps_client</0 >) 和 <code>AGENTDIR` (默认情况下 `-u src/modules/micrortps_bridge/micrortps_agent</0 >) 中。</li>
<li>如果未指定标志 <code>-a` 或 `-c`，则将生成并安装客户端和代理。
- 如果未在默认位置（`-f /path/to/fastrtps/installation/bin`）安装 *Fast rtps*，则可能需要 `-f` 选项。

下面的示例演示如何生成桥接代码以发布/订阅 `sensor_baro` 单个 uORB 主题。

```sh
$ cd /path/to/PX4/Firmware
$ python Tools/generate_microRTPS_bridge.py -s msg/sensor_baro.msg -r msg/sensor_combined.msg
```

## 生成代码

为 *Client*、*Agent*、*CDR serialization/deserialization* 的 uORB 消息以及关联的 RTPS 报文 (IDL 文件) 的定义生成代码。

可以在此处找到网桥的手动生成的代码（默认情况下）：

- *客户端*: **src/modules/micrortps_bridge/micrortps_client/**
- *代理端*: **src/modules/micrortps_bridge/micrortps_agent/**


### uORB 序列化代码

Serialization functions are generated for all the uORB topics as part of the normal PX4 compilation process (and also for manual generation). For example, the following functions would be generated for the *sensor_combined.msg*: 例如，将为 *sensor_combined.msg* 生成以下函数：

```sh
void serialize_sensor_combined(const struct sensor_combined_s *input, char *output, uint32_t *length, struct microCDR *microCDRWriter);
void deserialize_sensor_combined(struct sensor_combined_s *output, char *input, struct microCDR *microCDRReader);
```

### RTPS 报文 IDL 文件

IDL files are generated from the uORB **.msg** files ([for selected uORB topics](../middleware/micrortps.md#supported-uorb-messages)) in the generation of the bridge. These can be found in: **src/modules/micrortps_bridge/micrortps_agent/idl/** 这些可以在 **src/modules/micrortps_bridge/micrortps_agent/idl/** 中找到。

*FastRTSP* 使用 IDL 文件来定义 RTPS 消息的结构（在本例中，映射到 uORB 主题的 RTPS 消息）。 *FastRTSP* uses IDL files to define the structure of RTPS messages (in this case, RTPS messages that map to uORB topics). They are used to generate code for the *Agent*, and *FastRTSP* applications that need to publish/subscribe to uORB topics.

> **Note** IDL 文件由 *fastrtpsgen* 工具编译到 c++。


## 代码生成验证

可以通过检查输出目录是否与下面显示的列表匹配来验证成功的代码生成（在 Linux 上，`tree` 命令可用于列出文件结构）。

代理目录:
```sh
$ tree src/modules/micrortps_bridge/micrortps_agent
src/modules/micrortps_bridge/micrortps_agent
├── build
├── CMakeLists.txt
├── idl
│   ├── sensor_baro_.idl
│   └── sensor_combined_.idl
├── microRTPS_agent.cpp
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

客户端目录：
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

## 构建并使用代码

The manually generated *Client* code is built and used in *exactly* the same way as [automatically generated Client code](../middleware/micrortps.md#client-px4-firmware).

Specifically, once manually generated, the *Client* source code is compiled and built into the PX4 firmware as part of the normal build process. For example, to compile the code and include it in firmware for NuttX/Pixhawk targets: 例如，编译代码，将其加入 NuttX/Pixhawk 固件：

```sh
make px4_fmu-v4_default upload
```

> **Note** You must first [disable automatic bridge code generation](#disable-automatic-bridge-code-generation) so that the toolchain uses the manually generated source code (and does not attempt to regenerate it).

The manually generated *Agent* code is also compiled and used in the same way as the [automatically generated code](../middleware/micrortps.md#agent-off-board-fastrtps-interface). The only difference is that the manually source code is created in **src/modules/micrortps_bridge/micrortps_agent** instead of **<emphasis>build/BUILDPLATFORM</emphasis>****/src/modules/micrortps_bridge/micrortps_agent/**. The only difference is that the manually source code is created in **src/modules/micrortps_bridge/micrortps_agent** instead of <strong><emphasis>build/BUILDPLATFORM</emphasis></strong>**/src/modules/micrortps_bridge/micrortps_agent/**.
