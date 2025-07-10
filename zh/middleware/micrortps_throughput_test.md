---
canonicalUrl: https://docs.px4.io/main/zh/middleware/micrortps_throughput_test
---

# Micro RTPS 吞吐量测试

This a simple test to measure the throughput of the [PX4-FastRTPS Bridge](../middleware/micrortps.md). It sends and receives 256-byte messages (simultaneously) at maximum rate, and then outputs the result. 最大速率下，同时收发 256 字节的报文，并且输出结果。

First create a new uORB message for this test in the folder **/Firmware/msg/**. The message file will be called **throughput_256.msg** and have the following content: 可以命名为 **throughput_256.msg** 并包含如下内容：

## 使用 uORB 报文

First create a new uORB message for this test in the folder **/PX4-Autopilot/msg/**. The message file will be called **throughput_256.msg** and have the following content:

```
uint8[256] data
```

Register the new message adding it to the list of messages in the file: **/Firmware/msg/CMakeLists.txt**:

```sh
cd /path/to/PX4/Firmware/msg
echo uint8[256] data > throughput_256.msg
```

Give the message a topic id by adding a line in the **/Firmware/Tools/message_id.py** script:

```cmake
...
...
wind_estimate.msg
throughput_256.msg
)
...
```

找到对应的目标平台（*cmake/configs/*），通过设置 *.cmake* 文件中的变量 `GENERATE_RTPS_BRIDGE` 来禁用自动桥接代码生成（作为 PX4 构建进程的一部分）：

```python
...
    ...
    'wind_estimate': 94,
    'throughput_256': 95,
}
...
```

## 禁用自动桥接代码生成

使用 *generate_microRTPS_bridge.py* 手动生成桥接代码（代码会发送和接收我们刚刚加入的 `throughput_256` uORB 话题报文）：

```sh
set(GENERATE_RTPS_BRIDGE off)
```


## 生成桥接代码

*Client* 源代码生成在 **src/modules/micrortps_bridge/micrortps_client/**，*Agent* 则在 **src/modules/micrortps_bridge/micrortps_agent/**。

```sh
cd /path/to/PX4/Firmware
python Tools/generate_microRTPS_bridge.py --send msg/throughput_256.msg --receive msg/throughput_256.msg
```

The *Client* source code is generated in **src/modules/micrortps_bridge/micrortps_client/** and the *Agent* in **src/modules/micrortps_bridge/micrortps_agent/**.

### 更改客户端代码

Open the file **src/modules/micrortps_bridge/micrortps_client/microRTPS_client.cpp**. Update the `while` loop in the `send()` function to look like this: 更新 `send()` 函数中的 `while` 循环，使其如下所示:

Open the file **src/modules/micrortps_bridge/micrortps_client/microRTPS_client.cpp**. Update the `while` loop in the `send()` function to look like this:

```cpp
...
...
while (!_should_exit_task)
{
    //bool updated;
    //orb_check(fds[0], &updated);
    //if (updated)
    {
        // obtained data for the file descriptor
        struct throughput_256_s data = {};
        // copy raw data into local buffer
        //orb_copy(ORB_ID(throughput_256), fds[0], &data);
        data.data[0] = loop%256;
        serialize_throughput_256(&data, data_buffer, &length, &microCDRWriter);
        if (0 < (read = transport_node->write((char)95, data_buffer, length)))
        {
            total_sent += read;
            ++sent;
        }
    }
     usleep(_options.sleep_ms*1000);
    ++loop;
}
...
```

The test was executed with PX4 running on Pixracer, connected via a UART to an ordinary PC running Ubuntu 16.04. The default configuration was used for both the Client/Agent. 默认配置用于两个客户/代理。 As the *Agent* is an RTPS publisher and subscriber, it will automatically get notified of the RTPS messages it sends, and will then mirror these back to the client.
:::

吞吐量可以在 shell 窗口中观察到的结果如下：


## 结果

The test was executed with PX4 running on Pixracer, connected via a UART to an ordinary PC running Ubuntu 16.04. The default configuration was used for both the Client/Agent.

The throughput that was observed in the client shell window on completion is shown below:

```sh
SENT:     13255 messages in 13255 LOOPS, 3512575 bytes in 30.994 seconds - 113.33KB/s
RECEIVED: 13251 messages in 10000 LOOPS, 3511515 bytes in 30.994 seconds - 113.30KB/s
```
