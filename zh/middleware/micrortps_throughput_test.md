# Micro RTPS 吞吐量测试

This a simple test to measure the throughput of the [PX4-FastRTPS Bridge](../middleware/micrortps.md). It sends and receives 256-byte messages (simultaneously) at maximum rate, and then outputs the result. 最大速率下，同时收发 256 字节的报文，并且输出结果。

> **Tip** 该示例需要你 [手动生成客户端和代理代码](../middleware/micrortps_manual_code_generation.md)。

## 使用 uORB 报文

First create a new uORB message for this test in the folder **/Firmware/msg/**. The message file will be called **throughput_256.msg** and have the following content: 可以命名为 **throughput_256.msg** 并包含如下内容：

```
uint8[256] data
```

可以使用如下命令：

```sh
cd /path/to/PX4/Firmware/msg
echo uint8[256] data > throughput_256.msg
```

Register the new message adding it to the list of messages in the file: **/Firmware/msg/CMakeLists.txt**:

```cmake
...
...
wind_estimate.msg
throughput_256.msg
)
...
```

Give the message a topic id by adding a line in the **/Firmware/Tools/message_id.py** script:

```python
...
    ...
    'wind_estimate': 94,
    'throughput_256': 95,
}
...
```

## 禁用自动桥接代码生成

找到对应的目标平台（*cmake/configs/*），通过设置 *.cmake* 文件中的变量 `GENERATE_RTPS_BRIDGE` 来禁用自动桥接代码生成（作为 PX4 构建进程的一部分）：

```sh
set(GENERATE_RTPS_BRIDGE off)
```


## 生成桥接代码

使用 *generate_microRTPS_bridge.py* 手动生成桥接代码（代码会发送和接收我们刚刚加入的 `throughput_256` uORB 话题报文）：

```sh
cd /path/to/PX4/Firmware
python Tools/generate_microRTPS_bridge.py --send msg/throughput_256.msg --receive msg/throughput_256.msg
```

*Client* 源代码生成在 **src/modules/micrortps_bridge/micrortps_client/**，*Agent* 则在 **src/modules/micrortps_bridge/micrortps_agent/**。

### 更改客户端代码

Next we modify the *Client* to send a *throughput_256* message on every loop. This is required because the topic is not actually being published by PX4, and because we want to ensure that it is sent at the greatest possible rate. 这是必需的，因为 PX4 实际上并没有发布该主题，而且我们希望确保以尽可能高的速率发送该主题。

Open the file **src/modules/micrortps_bridge/micrortps_client/microRTPS_client.cpp**. Update the `while` loop in the `send()` function to look like this: 更新 `send()` 函数中的 `while` 循环，使其如下所示:

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


> **Note** You may recall this is intended to be a *bidirectional* throughput test, where messages must also be sent from the *Agent* to the *Client*. You do not need to modify the Agent code to make this happen. As the *Agent* is an RTPS publisher and subscriber, it will automatically get notified of the RTPS messages it sends, and will then mirror these back to the client. 你不需要修改代理代码就可以实现这一点。 由于 *Agent* 是 RTPS 发布者和订阅者，它将自动收到有关其发送的 RTPS 消息的通知，然后将这些消息镜像回客户端。


[Compileand launch](../middleware/micrortps_manual_code_generation.md#build-and-use-the-code) ： *Client* 和 *Agent*。


## 结果

The test was executed with PX4 running on Pixracer, connected via a UART to an ordinary PC running Ubuntu 16.04. The default configuration was used for both the Client/Agent. 默认配置用于两个客户/代理。

吞吐量可以在 shell 窗口中观察到的结果如下：

```sh
SENT:     13255 messages in 13255 LOOPS, 3512575 bytes in 30.994 seconds - 113.33KB/s
RECEIVED: 13251 messages in 10000 LOOPS, 3511515 bytes in 30.994 seconds - 113.30KB/s
```
