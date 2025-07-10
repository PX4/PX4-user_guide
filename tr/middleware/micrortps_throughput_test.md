---
canonicalUrl: https://docs.px4.io/main/tr/middleware/micrortps_throughput_test
---

# Micro RTPS Throughput Test

This a simple test to measure the throughput of the [PX4-FastRTPS Bridge](../middleware/micrortps.md). It sends and receives 256-byte messages (simultaneously) at maximum rate, and then outputs the result.

:::tip
This example requires that you [Manually Generate Client and Agent Code](../middleware/micrortps_manual_code_generation.md).
:::

## Create the uORB message

First create a new uORB message for this test in the folder **/PX4-Autopilot/msg/**. The message file will be called **throughput_256.msg** and have the following content:

```
uint8[256] data
```

This can be done with the command line below:

```sh
cd /path/to/PX4/PX4-Autopilot/msg
echo uint8[256] data > throughput_256.msg
```

Register the new message adding it to the list of messages in the file: **/PX4-Autopilot/msg/CMakeLists.txt**:

```cmake
...
wind_estimate.msg
throughput_256.msg
)
...
```

Give the message a topic id by adding a line in the **/PX4-Autopilot/Tools/message_id.py** script:

```python
...
    'wind_estimate': 94,
    'throughput_256': 95,
}
...
```

## Disable automatic bridge code generation

Disable automatic generation of bridge code (as part of the PX4 build process) by setting the variable `GENERATE_RTPS_BRIDGE` to `off` in the *.cmake* file for the target platform (*cmake/configs/*):

```sh
set(GENERATE_RTPS_BRIDGE off)
```


## Generate the bridge code

Manually generate bridge code using *generate_microRTPS_bridge.py* (the code will send and receive "just" our `throughput_256` uORB topic):

```sh
cd /path/to/PX4/PX4-Autopilot
python Tools/generate_microRTPS_bridge.py --send msg/throughput_256.msg --receive msg/throughput_256.msg
```

The *Client* source code is generated in **src/modules/micrortps_bridge/micrortps_client/** and the *Agent* in **src/modules/micrortps_bridge/micrortps_agent/**.

### Modify the client code

Next we modify the *Client* to send a *throughput_256* message on every loop. This is required because the topic is not actually being published by PX4, and because we want to ensure that it is sent at the greatest possible rate.

Open the file **src/modules/micrortps_bridge/micrortps_client/microRTPS_client.cpp**. Update the `while` loop in the `send()` function to look like this:

```cpp
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

:::note
You may recall this is intended to be a *bidirectional* throughput test, where messages must also be sent from the *Agent* to the *Client*. You do not need to modify the Agent code to make this happen. As the *Agent* is an RTPS publisher and subscriber, it will automatically get notified of the RTPS messages it sends, and will then mirror these back to the client.
:::

[Compile and launch](../middleware/micrortps_manual_code_generation.md#build-and-use-the-code) both the *Client* and the *Agent*.


## Result

The test was executed with PX4 running on Pixracer, connected via a UART to an ordinary PC running Ubuntu 16.04. The default configuration was used for both the Client/Agent.

The throughput that was observed in the client shell window on completion is shown below:

```sh
SENT:     13255 messages in 13255 LOOPS, 3512575 bytes in 30.994 seconds - 113.33KB/s
RECEIVED: 13251 messages in 10000 LOOPS, 3511515 bytes in 30.994 seconds - 113.30KB/s
```
