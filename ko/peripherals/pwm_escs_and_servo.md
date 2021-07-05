# PWM 서보 및 ESC (모터 컨트롤러)

PWM 기반 브러시리스 모터 컨트롤러, 서보를 연결 방법과 전원 공급 방법을 설명합니다.

## ESC 연결 개요

각 PWM ESC에는 최소한 다음과 같은 전선들을 가지고 있습니다.

- Power VBAT (일반적으로 두껍고 빨간색)
- Power GND (보통 두껍고 검정색)

그리고 서보 플러그에서:

- PWM 신호 (일반적으로 흰색 또는 노란색)
- GND (일반적으로 검정색 또는 갈색)

서보 플러그에는 +5V 와이어 (일반적으로 빨간색 또는 주황색)도 *있을 수 있습니다*. 이 와이어의 목적과 연결 방법은 ESC와 기체 유형에 따라 달라집니다.

:::tip
일부 경우 (아래 참조) +5V 라인이 필요하지 않습니다. +5V 라인을 절단하는 대신 해당 핀용 서보 커넥터 플라스틱 하우징의 잠금 탭을 부드럽게 들어 올린 다음 (예 : 커터 블레이드 또는 소형 스크루 드라이버 사용) 핀을 빼낼 수 있습니다. 전기 절연 테이프로 분리하고 서보 케이블에 테이프로 붙입니다. 이렇게하면 나중에 필요한 경우 와이어를 쉽게 취소할 수 있습니다.
:::

## 전원 연결

항상 Power VBAT 및 GND를 배터리에 연결하고, PWM 신호 및 GND를 서보 플러그에서 모터로 연결하십시오.

:::tip
신호 접지를 연결할 필요가 없는 **설정은 없습니다**.
:::

The connection to the +5V wire (if present) depends on the ESC/Vehicle.

### Fixed Wing / VTOL

On a fixed wing (or VTOL) ESC, the +5V line usually provides the output of a Battery Elimination Circuit (BEC).

- This can be connected to the Pixhawk servo rail and used to power servos for flaps, ailerons etc.
    
:::note
It is unsafe to power servos or ESCs from the autopilot's avionics power supply. This is why **Pixhawk series** flight controllers do not provide power for the servo rail (the AUX servo rail is unpowered and is limited to 1A).
:::

- As a rule of thumb you should only connect the *output of only one BEC* to the Pixhawk servo rail. (while it may be possible to connect multiple +5V outputs to the rail, this depends on the ESC model).

### Multicopter

On a multicopter, the +5V line might not be present or (if present) may not be connected.

- Multicopters often do not need servos, and hence do not need to power the Pixhawk servo rail (motors are usually separately powered from a power distribution board).
- There is no harm (or benefit) in connecting the wire to the servo rail.
- DJI ESCs typically include this wire, but it is not connected.

### Opto-isolated ESC

On an opto-isolated ESC **without** BEC, the +5V line might need to be connected and powered (in order to provide power to the ESC microcontroller). In this case the wire will normally be connected to the flight controller servo rail, and the servo rail must be powered from an additional BEC.

## PWM Configuration

The PX4 PWM configuration parameters can be found here: [PWM Outputs](../advanced_config/parameter_reference.md#pwm-outputs).

## Troubleshooting

Pixhawk is compatible with all *PWM ESCs* on the market. If a particular ESC is not operational, it is incorrectly wired up or configured.

### Ground Connection

Check that the ground (black wire) of the ESC servo connector is connected to Pixhawk (there is no valid wiring setup that does not have a ground reference).

:::warning
It is unsafe to fly without ground connected. This is because for every positive pulse (the ESC signal) there needs to be an adjacent ground return path for a clean signal shape.

The image below shows how noisy the signal becomes if GND is not connected.

![PWM without ground](../../assets/hardware/pwm_esc/pwm_without_gnd.png)
:::

### Power Connection / Opto-isolated ESCs

If using an opto-isolated ESC that does not provide a BEC / power output, please ensure that the ESC does not need its +5V line powered for the opto-isolator.

See the first section of this page explains for other power connection considerations.

### Invalid Minimum Value

Some ESCs need to see a special low value pulse before switching on (to protect users who have the throttle stick in the middle position on power-up).

PX4 sends a value of [PWM_MAIN_DISARM](../advanced_config/parameter_reference.md#PWM_MAIN_DISARM) pulse when the vehicle is disarmed, which silences the ESCs when they are disarmed and ensures that ESCs initialise correctly.

This value should be set correctly for the ESC (correct values vary between roughly 1200 and 900 us).

### Timeout

Some ESCs may time out (preventing motor activation) if they have not received a valid low pulse within a few seconds of power on.

PX4 flight stack sends the [PWM_MAIN_DISARM](../advanced_config/parameter_reference.md#PWM_MAIN_DISARM) pulse idle/disarmed pulse right after power on. Provided this is configured correctly, ESCs will not time out.

### Valid Pulse Shape, Voltage and Update Rate

:::note
This should not be a problem, but is included for completeness
:::

Pixhawk uses active high pulses, as used by all the major brands (Futaba, Spektrum, FrSky).

PWM interfaces are not formally standardised, however, the normal micro controllers all use TTL or CMOS voltage levels. TTL is defined as low < 0.8V and high > 2.0V with some manufacturers using > 2.4V for additional noise margin. CMOS logic is defined with similar voltage levels. 5V levels are **never** required to successfully switch to an *on* state.

:::tip
Futaba, FrSky and Spektrum receivers output 3.3V or 3.0V voltage levels, as they are well above 2.4V. Pixhawk has adopted this common industry pattern and outputs 3.3V levels on recent boards.
:::