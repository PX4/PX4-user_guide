---
canonicalUrl: https://docs.px4.io/main/ko/modules/hello_sky
---

# 첫 번째 애플리케이션 튜토리얼(Hello Sky)

첫 번째 온보드 애플리케이션을 만들고 실행하는 방법을 설명합니다. PX4에서 앱 개발에 필요한 기본 개념과 API를 설명합니다.

:::note
시작/중지 기능과 명령줄 인수와 같은 고급 기능에 대한 설명은 생략되었습니다. 이것에 대해서는 [애플리케이션 모듈 템플릿](../modules/module_template.md)에서 설명합니다.
:::

## 준비 사항

다음과 같은 것이 필요합니다.
* [PX4 SITL 시뮬레이터](../simulation/README.md) *또는* [PX4 호환 비행 콘트롤러](../flight_controller/README.md)
* 목표 타켓에 대한 [PX4 개발 툴체인](../dev_setup/dev_env.md)
* Github에서 [PX4 소스 코드 다운로드](../dev_setup/building_px4.md#download-the-px4-source-code)

소스 코드 [PX4-Autopilot/src/examples/px4_simple_app](https://github.com/PX4/PX4-Autopilot/tree/master/src/examples/px4_simple_app) 디렉토리에는 막혔을 때 검토할 수 있는 이 튜토리얼의 완성된 버전이 포함되어 있습니다.
* **px4_simple_app** 디렉토리의 이름을 변경하거나 삭제합니다.

## 간단한 어플리케이션

이 섹션에서는 `Hello Sky!`를 출력하는 *최소한의 애플리케이션*을 제작합니다. 이것은 단일 *C* 파일과 *cmake* 정의(도구 체인에 애플리케이션 빌드 방법을 설명함)로 구성됩니다.

1. 새 디렉토리 **PX4-Autopilot/src/examples/px4_simple_app**을 생성합니다.
1. **px4_simple_app.c**라는 디렉터리에 신규 C 파일을 생성합니다.

   * 기본 헤더를 페이지 상단에 복사합니다. 이것은 기여한 모든 파일에 첨부하여야 합니다.

     ```c
     /****************************************************************************
      *
      *   Copyright (c) 2012-2022 PX4 Development Team. All rights reserved.
      *
      * Redistribution and use in source and binary forms, with or without
      * modification, are permitted provided that the following conditions
      * are met:
      *
      * 1. Redistributions of source code must retain the above copyright
      *    notice, this list of conditions and the following disclaimer.
      * 2. Redistributions in binary form must reproduce the above copyright
      *    notice, this list of conditions and the following disclaimer in
      *    the documentation and/or other materials provided with the
      *    distribution.
      * 3. Neither the name PX4 nor the names of its contributors may be
      *    used to endorse or promote products derived from this software
      *    without specific prior written permission.
      *
      * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
      * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
      * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
      * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
      * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
      * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
      * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
      * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
      * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
      * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
      * POSSIBILITY OF SUCH DAMAGE.
      *
      ****************************************************************************/
     ```

   * 기본 헤더 아래에 다음 코드를 복사합니다. 이것은 기여한 모든 파일에 첨부하여야 합니다.

     ```c
     /**
      * @file px4_simple_app.c
      * Minimal application example for PX4 autopilot
      *
      * @author Example User <mail@example.com>
      */

     #include <px4_platform_common/log.h>

     __EXPORT int px4_simple_app_main(int argc, char *argv[]);

     int px4_simple_app_main(int argc, char *argv[])
     {
        PX4_INFO("Hello Sky!");
        return OK;
     }
     ```

:::tip
기본 함수의 이름은 `<module_name>_main`이어야 하며 표시된 대로 모듈에서 출력하여야 합니다.
:::

:::tip
`PX4_INFO`는 PX4 셸의 `printf`와 동일합니다(**px4_platform_common/log.h**에 포함됨). 다양한 로그 수준이 있습니다: `PX4_INFO`, `PX4_WARN`, `PX4_ERR`, `PX4_DEBUG`. 경고 및 오류는 [ULog](../dev_log/ulog_file_format.md)에 추가로 추가되고 [비행 검토](https://logs.px4.io/)에 표시됩니다.
:::

1. **CMakeLists.txt**라는 새 *cmake* 정의 파일을 만들고 오픈합니다. 아래 텍스트를 복사하십시오.
   ```cmake
   ############################################################################
   #
   #   Copyright (c) 2015 PX4 Development Team. All rights reserved.
   #
   # Redistribution and use in source and binary forms, with or without
   # modification, are permitted provided that the following conditions
   # are met:
   #
   # 1. Redistributions of source code must retain the above copyright
   #    notice, this list of conditions and the following disclaimer.
   # 2. Redistributions in binary form must reproduce the above copyright
   #    notice, this list of conditions and the following disclaimer in
   #    the documentation and/or other materials provided with the
   #    distribution.
   # 3. Neither the name PX4 nor the names of its contributors may be
   #    used to endorse or promote products derived from this software
   #    without specific prior written permission.
   #
   # THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   # "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   # LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
   # FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
   # COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
   # INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   # BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
   # OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
   # AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
   # LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
   # ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   # POSSIBILITY OF SUCH DAMAGE.
   #
   ############################################################################
   px4_add_module(
    MODULE examples__px4_simple_app
    MAIN px4_simple_app
    STACK_MAIN 2000
    SRCS
        px4_simple_app.c
    DEPENDS
    )
   ```
   `px4_add_module()` 메서드는 모듈 설명에서 정적 라이브러리를 빌드합니다.
   - `MODULE` 블록은 모듈의 펌웨어 고유 이름입니다(관례에 따라 모듈 이름은 `src`에 대한 상위 디렉토리 접두어를 사용함).
   - `MAIN` 블록은 PX4 셸 또는 SITL 콘솔에서 호출할 수 있도록 NuttX에 명령을 등록하는 모듈의 진입점을 나열합니다.

:::tip
기본 함수의 이름은 `<module_name>_main`이어야 하며 표시된 대로 모듈에서 출력하여야 합니다. <!-- NEED px4_version -->

:::

:::note
`DYNAMIC`을 `px4_add_module`에 대한 옵션으로 지정하면 POSIX 플랫폼에서 정적 라이브러리 대신 *공유 라이브러리*가 생성됩니다. PX4를 다시 컴파일하고 소스 코드가 아닌 바이너리로 공유함). 앱은 내장 명령이 되지 않지만, `examples__px4_simple_app.px4mod`라는 별도의 파일로 끝이 납니다. 그런 다음 `dyn` 명령을 사용하여 런타임에 파일을 로드하여 명령을 실행할 수 있습니다. `dyn ./examples__px4_simple_app.px4mod`
:::

1. Create and open a new *Kconfig* definition file named **Kconfig** and define your symbol for naming (see [Kconfig naming convention](../hardware/porting_guide_config.md#px4_kconfig_symbol_naming_convention)). Copy in the text below:
   ```menuconfig EXAMPLES_PX4_SIMPLE_APP
    bool "PX4 Simple app"
    default n
    ---help---
        Enable PX4 simple app
   ```

## 애플리케이션/펌웨어 빌드

이제 어플리케이션 제작이 완료되었습니다. 실행하려면 먼저 PX4의 일부로 빌드되었는지 확인합니다. 애플리케이션은 대상에 대한 적절한 보드 수준 *cmake* 파일의 빌드/펌웨어에 추가됩니다.

* PX4 SITL(시뮬레이터): [PX4-Autopilot/boards/px4/sitl/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/sitl/default.cmake)
* Pixhawk v1/2: [PX4-Autopilot/boards/px4/fmu-v2/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v2/default.cmake)
* Pixracer (px4/fmu-v4): [PX4-Autopilot/boards/px4/fmu-v4/default.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/boards/px4/fmu-v4/default.cmake)
* 다른 보드의 *cmake* 파일은 [PX4-Autopilot/boards/](https://github.com/PX4/PX4-Autopilot/tree/master/boards)에서 찾을 수 있습니다.

애플리케이션을 펌웨어로 컴파일하려면 *cmake* 파일에 애플리케이션에 대한 새로운 행을 만드십시오.

```
    examples/px4_simple_app
```

:::note
예제는 기본적으로 펌웨어에 포함되어 있기 때문에, 대부분의 파일에는 이미 해당 줄이 있습니다.
:::

보드별 명령어를 사용하여, 예제를 빌드합니다.

* jMAVSim 시뮬레이터: `make px4_sitl_default jmavsim`
* Pixhawk v1/2: `make px4_fmu-v2_default` (혹은 `make px4_fmu-v2`)
* Pixhawk v3: `make px4_fmu-v4_default`
* 기타 보드: [코드 빌드](../dev_setup/building_px4.md#building-for-nuttx)


## 앱 테스트(하드웨어)

### 보드에 펌웨어 업로드합니다.

업로더를 활성화한 다음 보드를 재설정합니다.

* Pixhawk v1/2: `make px4_fmu-v2_default upload`
* Pixhawk v3: `make px4_fmu-v4_default upload`

보드 재설정전에 컴파일 메시지를 인쇄하고 마지막에 다음을 인쇄합니다.

```sh
Loaded firmware for X,X, waiting for the bootloader...
```

보드가 재설정되고 업로드되면 다음이 인쇄됩니다.

```sh
Erase  : [====================] 100.0%
Program: [====================] 100.0%
Verify : [====================] 100.0%
Rebooting.

[100%] Built target upload
```

### 콘솔을 연결합니다.

이제 직렬 또는 USB로 [시스템 콘솔](../debug/system_console.md)을 연결합니다. **ENTER** 키를 입력하면, 쉘 프롬프트가 나타납니다.

```sh
nsh>
```

'help'을 입력하고 Enter 키를 입력합니다.

```sh
nsh> help
  help usage:  help [-v] [<cmd>]

  [           df          kill        mkfifo      ps          sleep       
  ?           echo        losetup     mkrd        pwd         test        
  cat         exec        ls          mh          rm          umount      
  cd          exit        mb          mount       rmdir       unset       
  cp          free        mkdir       mv          set         usleep      
  dd          help        mkfatfs     mw          sh          xd          

Builtin Apps:
  reboot
  perf
  top
  ..
  px4_simple_app
  ..
  sercon
  serdis
```

이제, `px4_simple_app`은 사용 가능한 명령의 일부입니다. `px4_simple_app`을 입력하고 Enter 키를 입력합니다.

```sh
nsh> px4_simple_app
Hello Sky!
```

이제 어플리케이션이 시스템에 올바르게 등록되었으며, 실제 작업을 수행하도록 확장할 수 있습니다.

## 앱 테스트(SITL)

SITL을 사용하는 경우 *PX4 콘솔*이 자동으로 시작됩니다([코드 빌드 > 첫 번째 빌드(jMAVSim 시뮬레이터 사용)](../dev_setup/building_px4.md#first-build-using-the-jmavsim-simulator) 참조). *nsh 콘솔*(이전 섹션 참조)과 마찬가지로 `help`를 입력하여 내장 앱 목록을 조회합니다.

`px4_simple_app`을 입력하여 앱을 실행합니다.

```sh
pxh> px4_simple_app
INFO  [px4_simple_app] Hello Sky!
```

이제 응용 프로그램을 확장할 수 있습니다.


## 센서 데이터 읽기

유용한 작업을 수행하려면, 애플리케이션이 입력을 구독하고 출력(예: 모터 또는 서보 명령)을 게시해야 합니다.

:::tip
PX4 하드웨어 추상화의 이점이 여기에 있습니다!
센서 드라이버와 어떤 식으로든 상호 작용할 필요가 없으며, 보드 또는 센서가 업데이트된 경우 앱을 업데이트할 필요도 없습니다.
:::

애플리케이션 간의 개별 메시지 채널을 [주제](../middleware/uorb.md)라고 합니다. 이 튜토리얼에서는 전체 시스템의 동기화된 센서 데이터를 보유하는 [sensor_combined](https://github.com/PX4/PX4-Autopilot/blob/master/msg/sensor_combined.msg) 주제를 예로 설명합니다.

주제 구독은 간단합니다.

```cpp
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
```

`sensor_sub_fd`는 주제 핸들이며 새 데이터에 대한 차단 대기를 매우 효율적으로 수행하는 데 사용할 수 있습니다. 현재 스레드는 절전 모드로 전환되고, 새 데이터를 사용할 수 있게 되면 스케줄러에 의해 자동으로 깨어나며 기다리는 동안 CPU 주기를 소비하지 않습니다. 이를 위하여, [poll()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/poll.html) POSIX 시스템 호출을 사용합니다.

구독에 `poll()`을 추가하면 다음과 같습니다(*의사 코드, 아래에서 전체 구현 참조*).

```cpp
#include <poll.h>
#include <uORB/topics/sensor_combined.h>
..
int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));

/* one could wait for multiple topics with this technique, just using one here */
px4_pollfd_struct_t fds[] = {
    { .fd = sensor_sub_fd,   .events = POLLIN },
};

while (true) {
    /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
    int poll_ret = px4_poll(fds, 1, 1000);
    ..
    if (fds[0].revents & POLLIN) {
        /* obtained data for the first file descriptor */
        struct sensor_combined_s raw;
        /* copy sensors raw data into local buffer */
        orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
        PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                    (double)raw.accelerometer_m_s2[0],
                    (double)raw.accelerometer_m_s2[1],
                    (double)raw.accelerometer_m_s2[2]);
    }
}
```

아래의 명령어로 앱을 다시 컴파일합니다.

```sh
make
```

### uORB 구독 테스트

마지막 단계는 nsh 셸에 다음을 입력하여 애플리케이션을 백그라운드 프로세스/작업으로 시작하는 것입니다.

```sh
px4_simple_app &
```

앱은 콘솔에 5개의 센서 값을 출력후 종료합니다.

```sh
[px4_simple_app] Accelerometer:   0.0483          0.0821          0.0332
[px4_simple_app] Accelerometer:   0.0486          0.0820          0.0336
[px4_simple_app] Accelerometer:   0.0487          0.0819          0.0327
[px4_simple_app] Accelerometer:   0.0482          0.0818          0.0323
[px4_simple_app] Accelerometer:   0.0482          0.0827          0.0331
[px4_simple_app] Accelerometer:   0.0489          0.0804          0.0328
```

:::tip
[전체 애플리케이션용 모듈 템플릿](../modules/module_template.md)은 명령줄에서 제어할 수 있는 백그라운드 프로세스를 작성합니다.
:::

## 데이터 게시

계산된 출력을 위한 다음 단계는 결과를 *게시*하는 것입니다. 아래에서는 태도 주제를 게시하는 방법을 설명합니다.

:::note
`attitude`를 선택한 이유는 *mavlink* 앱이 결과를 쉽게 볼 수 있는 지상 관제소로 전달하기 때문입니다.
:::

인터페이스는 매우 간단합니다. 게시할 주제의 `구조체`를 초기화하고 주제를 광고합니다.

```c
#include <uORB/topics/vehicle_attitude.h>
..
/* advertise attitude topic */
struct vehicle_attitude_s att;
memset(&att, 0, sizeof(att));
orb_advert_t att_pub_fd = orb_advertise(ORB_ID(vehicle_attitude), &att);
```

메인 루프에서 정보가 준비시마다 게시합니다.

```c
orb_publish(ORB_ID(vehicle_attitude), att_pub_fd, &att);
```

## 전체 예제 코드

:::tip
`px4_add_module()` 형식은 [PX4-Autopilot/cmake/px4_add_module.cmake](https://github.com/PX4/PX4-Autopilot/blob/master/cmake/px4_add_module.cmake)에 설명되어 있습니다.

```c
/****************************************************************************
 *
 *   Copyright (c) 2012-2019 PX4 Development Team. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 * 3. Neither the name PX4 nor the names of its contributors may be
 *    used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 ****************************************************************************/

/**
 * @file px4_simple_app.c
 * Minimal application example for PX4 autopilot
 *
 * @author Example User <mail@example.com>
 */

#include <px4_platform_common/px4_config.h>
#include <px4_platform_common/tasks.h>
#include <px4_platform_common/posix.h>
#include <unistd.h>
#include <stdio.h>
#include <poll.h>
#include <string.h>
#include <math.h>

#include <uORB/uORB.h>
#include <uORB/topics/sensor_combined.h>
#include <uORB/topics/vehicle_attitude.h>

__EXPORT int px4_simple_app_main(int argc, char *argv[]);

int px4_simple_app_main(int argc, char *argv[])
{
    PX4_INFO("Hello Sky!");

    /* subscribe to sensor_combined topic */
    int sensor_sub_fd = orb_subscribe(ORB_ID(sensor_combined));
    /* limit the update rate to 5 Hz */
    orb_set_interval(sensor_sub_fd, 200);

    /* advertise attitude topic */
    struct vehicle_attitude_s att;
    memset(&att, 0, sizeof(att));
    orb_advert_t att_pub = orb_advertise(ORB_ID(vehicle_attitude), &att);

    /* one could wait for multiple topics with this technique, just using one here */
    px4_pollfd_struct_t fds[] = {
        { .fd = sensor_sub_fd,   .events = POLLIN },
        /* there could be more file descriptors here, in the form like:
         * { .fd = other_sub_fd,   .events = POLLIN },
         */
    };

    int error_counter = 0;

    for (int i = 0; i < 5; i++) {
        /* wait for sensor update of 1 file descriptor for 1000 ms (1 second) */
        int poll_ret = px4_poll(fds, 1, 1000);

        /* handle the poll result */
        if (poll_ret == 0) {
            /* this means none of our providers is giving us data */
            PX4_ERR("Got no data within a second");

        } else if (poll_ret < 0) {
            /* this is seriously bad - should be an emergency */
            if (error_counter < 10 || error_counter % 50 == 0) {
                /* use a counter to prevent flooding (and slowing us down) */
                PX4_ERR("ERROR return value from poll(): %d", poll_ret);
            }

            error_counter++;

        } else {

            if (fds[0].revents & POLLIN) {
                /* obtained data for the first file descriptor */
                struct sensor_combined_s raw;
                /* copy sensors raw data into local buffer */
                orb_copy(ORB_ID(sensor_combined), sensor_sub_fd, &raw);
                PX4_INFO("Accelerometer:\t%8.4f\t%8.4f\t%8.4f",
                     (double)raw.accelerometer_m_s2[0],
                     (double)raw.accelerometer_m_s2[1],
                     (double)raw.accelerometer_m_s2[2]);

                /* set att and publish this information for other apps
                 the following does not have any meaning, it's just an example
                */
                att.q[0] = raw.accelerometer_m_s2[0];
                att.q[1] = raw.accelerometer_m_s2[1];
                att.q[2] = raw.accelerometer_m_s2[2];

                orb_publish(ORB_ID(vehicle_attitude), att_pub, &att);
            }

            /* there could be more file descriptors here, in the form like:
             * if (fds[1..n].revents & POLLIN) {}
             */
        }
    }

    PX4_INFO("exiting");

    return 0;
}
```

## 전체 예제 실행

마지막으로 앱을 실행합니다.

```sh
px4_simple_app
```

*QGroundControl*의 실시간 플롯([Analyze > MAVLink Inspector](https://docs.qgroundcontrol.com/en/analyze_view/mavlink_inspector.html))에서 센서 값을 확인할 수 있습니다.

## 마무리

이 튜토리얼에서는 PX4 자동조종장치를 앱 개발에 필요한 내용들을 설명하였습니다. uORB 메시지/주제의 전체 목록은 [여기](https://github.com/PX4/PX4-Autopilot/tree/master/msg/)에서 볼 수 있으며, 헤더는 잘 문서화되어 있으며 참조용으로 사용됩니다.

추가 정보 및 문제 해결/일반적인 함정은 [uORB](../middleware/uorb.md)을 참고하십시오.

다음 페이지에서는 시작 및 중지 기능이 있는 전체 애플리케이션을 작성하기 위한 템플릿을 제공합니다.
