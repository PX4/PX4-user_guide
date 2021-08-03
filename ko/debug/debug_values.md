# 디버그 값 송수신

소프트웨어 개발시에 개별 중요 숫자를 출력하는 경우가 종종 있습니다. 이 때가 보통 MAVLink 패킷이 들어올 때 `NAMED_VALUE_FLOAT`, `DEBUG`, `DEBUG_VECT` 패킷을 활용할 수 있는 경우입니다.

## MAVLink 디버그 메시지와 uORB 주제 간의 매핑

MAVLink 디버그 메시지는 uORB 주제로/에서 번역됩니다. MAVLink 디버그 메시지를 보내거나 받으려면, 해당 주제를 각각 게시하거나 구독해야 합니다. 다음은 MAVLink 디버그 메시지와 uORB 주제 간의 매핑을 요약한 표입니다.

| MAVLink 메시지         | uORB 주제           |
| ------------------- | ----------------- |
| NAMED_VALUE_FLOAT | debug_key_value |
| DEBUG               | debug_value       |
| DEBUG_VECT          | debug_vect        |

## 튜토리얼: 문자열 / 부동 소수점 쌍 보내기

이 튜토리얼은 관련 uORB 주제 `debug_key_value`를 사용하여 MAVLink 메시지 `NAMED_VALUE_FLOAT`를 전송하는 방법을 설명합니다.

이 자습서의 코드는 다음에서 사용할 수 있습니다.

* [튜토리얼 코드 디버그](https://github.com/PX4/PX4-Autopilot/blob/master/src/examples/px4_mavlink_debug/px4_mavlink_debug.cpp)
* 보드 구성에서 MAVLink 디버그 앱(**px4_mavlink_debug**)의 주석 처리를 제거하여 [튜토리얼 앱을 활성화](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v5/default.cmake)합니다.

디버그 게시를 설정에 필요한 것은 아래의 코드입니다. 먼저 헤더 파일을 추가합니다.

```C
#include <uORB/uORB.h>
#include <uORB/topics/debug_key_value.h>
```

Then advertise the debug value topic (one advertisement for different published names is sufficient). Put this in front of your main loop:

```C
/* advertise debug value */
struct debug_key_value_s dbg = { .key = "velx", .value = 0.0f };
orb_advert_t pub_dbg = orb_advertise(ORB_ID(debug_key_value), &dbg);
```

And sending in the main loop is even simpler:

```C
dbg.value = position[0];
orb_publish(ORB_ID(debug_key_value), pub_dbg, &dbg);
```

:::caution
Multiple debug messages must have enough time between their respective publishings for Mavlink to process them. This means that either the code must wait between publishing multiple debug messages, or alternate the messages on each function call iteration.
:::

The result in QGroundControl then looks like this on the real-time plot:

![QGC debugvalue plot](../../assets/gcs/qgc-debugval-plot.jpg)


## Tutorial: Receive String / Float Pairs

The following code snippets show how to receive the `velx` debug variable that was sent in the previous tutorial.

First, subscribe to the topic `debug_key_value`:

```C
#include <poll.h>
#include <uORB/topics/debug_key_value.h>

int debug_sub_fd = orb_subscribe(ORB_ID(debug_key_value));
[...]
```

Then poll on the topic:

```C
[...]
/* one could wait for multiple topics with this technique, just using one here */
px4_pollfd_struct_t fds[] = {
    { .fd = debug_sub_fd,   .events = POLLIN },
};

while (true) {
    /* wait for debug_key_value for 1000 ms (1 second) */
    int poll_ret = px4_poll(fds, 1, 1000);

    [...]
```

When a new message is available on the `debug_key_value` topic, do not forget to filter it based on its key attribute in order to discard the messages with key different than `velx`:

```C
    [...]
    if (fds[0].revents & POLLIN) {
        /* obtained data for the first file descriptor */
        struct debug_key_value_s dbg;

        /* copy data into local buffer */
        orb_copy(ORB_ID(debug_key_value), debug_sub_fd, &dbg);

        /* filter message based on its key attribute */
        if (strcmp(_sub_debug_vect.get().key, "velx") == 0) {
            PX4_INFO("velx:\t%8.4f", dbg.value);
        }
    }
}

```
