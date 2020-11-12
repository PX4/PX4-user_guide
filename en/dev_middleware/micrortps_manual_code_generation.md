# Manually Generate Client and Agent Code

This topic shows how to manually generate the code for the client and the agent (instead of [automatically generating](../middleware/micrortps.md) it when the PX4 Firmware is compiled). 

The code is generated using the python script: **/Tools/generate_microRTPS_bridge.py**.


## Disable automatic bridge code generation

First disable automatic generation of bridge code. Set the variable `GENERATE_RTPS_BRIDGE` to *off* in the **.cmake** file for the target platform:

```sh
set(GENERATE_RTPS_BRIDGE off)
```

## Using generate_microRTPS_bridge.py

The *generate_microRTPS_bridge* tool's command syntax is shown below:

```sh
$ cd /path/to/PX4/PX4-Autopilot/msg/tools
$ python generate_microRTPS_bridge.py -h
usage: generate_microRTPS_bridge.py [-h] [-s *.msg [*.msg ...]]
                                    [-r *.msg [*.msg ...]] [-a] [-c]
                                    [-t MSGDIR] [-o AGENTDIR] [-u CLIENTDIR]
                                    [-f FASTRTPSGEN]

optional arguments:
  -h, --help            show this help message and exit
  -s *.msg [*.msg ...], --send *.msg [*.msg ...]
                        Topics to be sent
  -r *.msg [*.msg ...], --receive *.msg [*.msg ...]
                        Topics to be received
  -a, --agent           Flag to generate the agent. Default is true.
  -c, --client          Flag to generate the client. Default is true.
  -t MSGDIR, --topic-msg-dir MSGDIR
                        Topics message dir. Default is: msg/
  -o AGENTDIR, --agent-outdir AGENTDIR
                        Agent output dir. Default is:
                        src/modules/micrortps_bridge/micrortps_agent
  -u CLIENTDIR, --client-outdir CLIENTDIR
                        Client output dir. Default is:
                        src/modules/micrortps_bridge/micrortps_client
  -f FASTRTPSGEN, --fastrtpsgen-dir FASTRTPSGEN
                        fastrtpsgen installation dir. Default is: /bin
  --delete-tree         Delete dir tree output dir(s)
```

> **Caution** Using with `--delete-tree` option erases the content of the `CLIENTDIR` and the `AGENTDIR` before creating new files and folders.

- The arguments `--send/-s` and `--receive/-r` specify the uORB topics that can be sent/received from PX4. Code will only be generated for specified messages.
- The output appears in `CLIENTDIR` (`-o src/modules/micrortps_bridge/micrortps_client`, by default) and in the `AGENTDIR` (`-u src/modules/micrortps_bridge/micrortps_agent`, by default).
- If no flag `-a` or `-c` is specified, both the client and the agent will be generated and installed.
- The `-f` option may be needed if *Fast RTPS* was not installed in the default location (`-f /path/to/fastrtps/installation/bin`).

The example below shows how you can generate bridge code to publish/subscribe just the `sensor_baro` single uORB topic.

```sh
$ cd /path/to/PX4/PX4-Autopilot
$ python Tools/generate_microRTPS_bridge.py -s msg/sensor_baro.msg -r msg/sensor_combined.msg
```

## Generated code

Code is generated for the *Client*, *Agent*, *CDR serialization/deserialization* of uORB messages, and the definition of the associated RTPS messages (IDL files). 

Manually generated code for the bridge can be found here (by default):

- *Client*: **src/modules/micrortps_bridge/micrortps_client/**
- *Agent*: **src/modules/micrortps_bridge/micrortps_agent/**


### uORB serialization code

Serialization functions are generated for all the uORB topics as part of the normal PX4 compilation process (and also for manual generation). For example, the following functions would be generated for the *sensor_combined.msg*:

```sh
void serialize_sensor_combined(const struct sensor_combined_s *input, char *output, uint32_t *length, struct microCDR *microCDRWriter);
void deserialize_sensor_combined(struct sensor_combined_s *output, char *input, struct microCDR *microCDRReader);
```

### RTPS message IDL files

IDL files are generated from the uORB **.msg** files ([for selected uORB topics](../middleware/micrortps.md#supported-uorb-messages)) in the generation of the bridge. These can be found in: **src/modules/micrortps_bridge/micrortps_agent/idl/**

*FastRTSP* uses IDL files to define the structure of RTPS messages (in this case, RTPS messages that map to uORB topics). They are used to generate code for the *Agent*, and *FastRTSP* applications that need to publish/subscribe to uORB topics.

> **Note** IDL files are compiled to C++ by the *fastrtpsgen* tool.


## Verify code generation

You can verify successful code generation by checking that the output directories match the listing shown below (On Linux, the `tree` command can be used for listing the file structure).

Agent directory:
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

Client directory:
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

## Build and use the code

The manually generated *Client* code is built and used in *exactly* the same way as [automatically generated Client code](../middleware/micrortps.md#client_firmware).

Specifically, once manually generated, the *Client* source code is compiled and built into the PX4 firmware as part of the normal build process. For example, to compile the code and include it in firmware for NuttX/Pixhawk targets: 

```sh
make px4_fmu-v4_default upload
```

> **Note** You must first [disable automatic bridge code generation](#disable-automatic-bridge-code-generation) so that the toolchain uses the manually generated source code (and does not attempt to regenerate it).

The manually generated *Agent* code is also compiled and used in the same way as the [automatically generated code](../middleware/micrortps.md#agent-in-a-ros-independent-offboard-fast-rtps-interface).
The only difference is that the manually source code is created in **src/modules/micrortps_bridge/micrortps_agent** instead of <strong><emphasis>build/BUILDPLATFORM</emphasis></strong>**/src/modules/micrortps_bridge/micrortps_agent/**.
