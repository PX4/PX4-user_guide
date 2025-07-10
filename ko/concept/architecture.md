---
canonicalUrl: https://docs.px4.io/main/ko/concept/architecture
---

# PX4 아키텍처 개요

PX4는 두 가지 주요 레이어로 구성됩니다. [비행 스택](#flight-stack)은 추정 및 비행제어시스템이며, [미들웨어](#middleware)는 자율 로봇을 지원할 수 있는 일반 로봇 계층으로 내외부 통신 및 하드웨어 통합을 제공합니다.

모든 PX4 [기체](../airframes/README.md)는 단일 코드베이스를 공유합니다(여기에는 보트, 로버, 잠수함 등과 같은 다른 로봇 시스템이 포함됨). 전체 시스템 디자인은 [반응형](http://www.reactivemanifesto.org)이며 다음과 같습니다.

- 모든 기능은 대체 가능한 구성 요소와 재사용 가능한 구성 요소로 나누어 집니다.
- 통신은 비동기 메시지 전달에 의해 수행됩니다.
- 시스템은 다양한 작업 부하를 처리할 수 있습니다.


<a id="architecture"></a>

## 고급 소프트웨어 아키텍처

아래 다이어그램은 PX4의 빌딩 블록에 대한 개요를 나타냅니다. 다이어그램의 상단에는 미들웨어 블록이 포함되어 있고, 하단에는 플라이트 스택의 구성 요소가 표시되어 있습니다.

![PX4 구조](../../assets/diagrams/PX4_Architecture.svg)


<!-- This diagram can be updated from 
[here](https://drive.google.com/file/d/0B1TDW9ajamYkaGx3R0xGb1NaeU0/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

소스 코드는 독립적인 모듈/프로그램으로 분할됩니다(다이어그램의 `고정 공간` 참조). 일반적으로 빌딩 블록은 하나의 모듈을 나타냅니다.

:::tip
런타임시 쉘에서 `top` 명령으로 실행되는 모듈을 검사할 수 있으며, 각 모듈은 `<module_name> 시작/중지`를 통하여 시작/중지할 수 있습니다. `top` 명령은 NuttX 셸에만 해당되지만, 다른 명령은 SITL 셸(pxh>)에서도 사용할 수 있습니다. 각 모듈에 대한 자세한 내용은 [모듈 & 명령](../modules/modules_main.md)을 참고하십시오.
:::

화살표는 모듈 간의 *가장 중요한* 연결 정보를 나타냅니다. 표시된 것보다 더 많은 연결이 있으며, 일부 데이터(예: 매개변수)는 대부분의 모듈에서 액세스합니다.

모듈은 [uORB](../middleware/uorb.md)라는 게시-구독 메시지 버스로 서로 통신합니다. 발행-구독 체계의 사용은 다음을 의미합니다.

- 시스템은 반응형입니다. 비동기식이며, 새 데이터를 사용할 수 있을 때 즉시 업데이트합니다.
- 모든 작업과 통신은 완전히 병렬화됩니다.
- 시스템 구성 요소는 스레드로부터 안전하며, 어디서나 데이터를 사용할 수 있습니다.

:::note
이 아키텍처를 사용하여, 런타임 시에도 이러한 블록을 모두 빠르고 쉽게 교체할 수 있습니다. It contains the full pipeline from sensors, RC input and autonomous flight control (Navigator), down to the motor or servo control (Actuators).


### 비행 스택

비행 스택은 자율 드론을 위한 안내, 탐색 및 제어 알고리즘의 모음입니다. 여기에는 고정익, 멀티콥터 및 VTOL 콘트롤러와 자세 및 위치 추정기가 포함됩니다.

다음 다이어그램은 비행 스택의 빌딩 블록에 대한 개요를 나타냅니다. 여기에는 센서, RC 입력 및 자율 비행 제어(내비게이터)에서 모터 또는 서보 제어(액추에이터)에 이르는 전체 파이프라인이 포함됩니다.

![PX4 고수준 비행 스택](../../assets/diagrams/PX4_High-Level_Flight-Stack.svg) <!-- This diagram can be updated from 
[here](https://drive.google.com/a/px4.io/file/d/15J0eCL77fHbItA249epT3i2iOx4VwJGI/view?usp=sharing) 
and opened with draw.io Diagrams. You might need to request access if you
don't have a px4.io Google account.
Caution: it can happen that after exporting some of the arrows are wrong. In
that case zoom into the graph until the arrows are correct, and then export
again. -->

**추정기**는 하나 이상의 센서 입력을 받아 결합하고, 차량 상태(예: IMU 센서 데이터의 자세)를 계산합니다.

**콘트롤러**는 설정값과 측정값 또는 추정된 상태(프로세스 변수)를 입력으로 사용합니다. 설정값과 일치하도록 프로세스 변수 값을 조정하는 것이 목표입니다. 출력은 해당 설정점에 도달하기 위한 수정입니다. 예를 들어, 위치 콘트롤러는 위치 설정값을 입력으로 사용하고, 프로세스 변수는 현재 추정된 위치이며, 출력은 차량을 목표 위치로 이동시키는 자세와 추력 설정값입니다.

**믹서**는 강제 명령(예: 우회전)을 받아 개별 모터 명령으로 변환하는 동시에, 일부 제한을 초과하지 않도록 합니다. 이 변환은 차량 유형에 따라 차이가 나며, 무게 중심에 대한 모터 배열 또는 차량의 회전 관성과 같은 다양한 요인에 의해 결정됩니다.


<a id="middleware"></a>

### 미들웨어

[미들웨어](../middleware/README.md)는 주로 내장 센서, 외부 세계(보조 컴퓨터, GCS 등)와의 통신 및 uORB 게시-구독 메시지 버스용 장치 드라이버로 구성됩니다.

또한 미들웨어에는 PX4 비행 코드가 데스크톱 운영 체제에서 실행되며, 시뮬레이션된 "세계"에서 컴퓨터 모델링 기체를 제어하는 [시뮬레이션 레이어](../simulation/README.md)가 포함되어 있습니다.


## 속도 업데이트

모듈은 메시지 업데이트를 기다리므로, 일반적으로 드라이버는 모듈 업데이트 속도를 정의합니다. 대부분의 IMU 드라이버는 1kHz에서 데이터를 샘플링 및 통합하고 250Hz로 게시합니다. `내비게이터`와 같은 시스템의 다른 부분은 높은 업데이트 속도가 필요하지 않으므로, 느리게 실행됩니다.

메시지 업데이트 비율은 `uorb top`을 실행하여 시스템에서 실시간으로 [검사](../middleware/uorb.md)할 수 있습니다.

<a id="runtime-environment"></a>

## 실행 환경

PX4는 POSIX-API(Linux, macOS, NuttX 또는 QuRT 등)를 제공하는 다양한 운영 체제에서 실행됩니다. 또한, 일종의 실시간 스케줄링(예: FIFO)이 있어야 합니다.

모듈간 통신([uORB](../middleware/uorb.md) 사용)은 공유 메모리를 기반으로 합니다. 전체 PX4 미들웨어는 단일 주소 공간에서 실행됩니다. 즉, 메모리는 모든 모듈 간에 공유됩니다.

:::note
시스템은 별도의 주소 공간에서 각 모듈을 간단하게 실행할 수 있도록 설계되었습니다(변경할 부분은 `uORB`, `매개변수 인터페이스`, < 0>데이터맨</code> 및 `성능`).
:::

모듈을 실행 방법은 두 가지가 있습니다.
- **작업**: 모듈은 자체 스택 및 프로세스 우선 순위와 함께 자체 작업에서 실행됩니다.
- **작업 대기열 작업**: 모듈은 공유 작업 대기열에서 실행되며, 대기열의 다른 모듈과 동일한 스택 및 작업 대기열 스레드 우선순위를 공유합니다.
  - 모든 작업은 서로 방해할 수 없으므로, 협력적으로 작동해야 합니다.
  - 여러 *작업 대기열 작업*이 한 대기열에서 실행될 수 있으며, 여러 대기열이 있을 수 있습니다.
  - *작업 대기열 작업*은 미래의 고정 시간을 지정하거나, uORB 주제 업데이트 콜백을 통하여 예약됩니다.

  작업 대기열에서 모듈을 실행할 때의 이점은 RAM을 덜 사용하고 잠재적으로 작업 전환이 더 적은 것입니다. 단점은 *작업 대기열 작업*이 메시지를 잠자기 또는 폴링하거나 차단 IO(예: 파일 읽기)를 수행할 수 없는 것입니다. 장기 실행 작업(과중한 계산 수행)은 잠재적으로 별도의 작업 또는 최소한 별도의 작업 대기열에서 실행되어야 합니다.

:::note
작업 대기열에서 실행 중인 작업은 [`uorb top`](../modules/modules_communication.md#uorb)에 표시되지 않습니다(작업 대기열 자체만 볼 수 있음 - 예: `wq:lp_default`). 모든 활성 작업 대기열 항목을 표시하려면, [`work_queue status`](../modules/modules_system.md#work-queue)를 사용하십시오.
:::

### 백그라운드 작업

`px4_task_spawn_cmd()`는 호출(상위) 작업과 독립적으로 실행되는 새 작업(NuttX) 또는 스레드(POSIX - Linux/macOS)를 시작합니다.

```cpp
independent_task = px4_task_spawn_cmd(
    "commander",                    // Process name
    SCHED_DEFAULT,                  // Scheduling type (RR or FIFO)
    SCHED_PRIORITY_DEFAULT + 40,    // Scheduling priority
    3600,                           // Stack size of the new task or thread
    commander_thread_main,          // Task (or thread) main function
    (char * const *)&argv[0]        // Void pointer to pass to the new task
                                    // (here the commandline arguments).
    );
```


### 운영체제별 정보

#### NuttX

[NuttX](https://nuttx.apache.org//)는 비행 제어 보드에서 PX4를 실행하는 핵심 RTOS입니다. 오픈 소스(BSD 라이선스)이며, 가볍고 효율적이며 매우 안정적입니다.

모듈은 작업으로 실행됩니다. 모듈에는 자체 파일 설명자 목록이 있지만, 단일 주소 공간을 공유합니다. 작업은 여전히 파일 설명자 목록을 공유하는 하나 이상의 스레드를 시작할 수 있습니다.

각 작업/스레드에는 고정된 크기의 스택이 있으며, 모든 스택에는 충분한 여유 공간이 남아 있는 지를 확인하는 주기적 작업이 있습니다(스택 색상 기준).


#### Linux/macOS

Linux 또는 macOS에서 PX4는 단일 프로세스에서 실행되고 모듈은 자체 스레드에서 실행됩니다(NuttX에서와 같이 작업과 스레드간의 구분이 없음).
