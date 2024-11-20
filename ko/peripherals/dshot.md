# DShot ESC

DShot은 PWM 또는 OneShot에 비해 여러 가지 장점을 가진 ESC 대체 프로토콜입니다.

- 지연 시간 감소
- 체크섬을 통해 안정성이 향상되었습니다.
- 프로토콜이 디지털 인코딩을 사용하므로, ESC 보정이 필요하지 않습니다.
- 텔레메트리 피드백은 일부 ESC에서 사용 가능합니다.
- 필요시 명령어로 모터 회전 방향을 병경할 수 있습니다 (물리적으로 와이어를 이동/재 납땜하는 대신).
- 다른 유용한 명령어들이 지원됩니다.

이 항목에서는 DShot ESC 연결과 설정 방법을 설명합니다.

## Wiring/Connections {#wiring}

DShot ESC are wired the same way as [PWM ESCs](pwm_escs_and_servo.md). The only difference is that they can only be connected to the FMU, and usually only to some subset of pins.

::: info
You may want to check the actuator configuration screen to see what pins are available for DShot on your controller before wiring up!
:::

Pixhawk controllers with both an FMU and an IO board usually label them as `AUX` (FMU) and `MAIN` (IO), respectively. These match the `PWM AUX` and `PWM MAIN` output tabs on the actuator configuration screen. For these controllers connect the DShot ESC to the `AUX` port.

Controllers that don't have an IO board usually label the (single) output port as `MAIN`, and this is where you will connect your DShot ESC. If the controller without IO has its own firmware, the actuator assignment will be to the matching `PWM MAIN` outputs. However if the same firmware is used for hardware with/without the IO board, such as for the Pixhawk 4 and Pixhawk 4 Mini, then actuator assignment tab used is the same in both cases: `PWM AUX` (i.e. not matching the port label `MAIN` in the "mini" case).

## 설정

:::warning
ESC 설정 매개변수를 변경하기 전에 프로펠러를 제거하십시오!
:::

Enable DShot for your required outputs in the [Actuator Configuration](../config/actuators.md).

DShot comes with different speed options: _DShot150_, _DShot300_, _DShot600_ and _DShot1200_, where the number indicates the speed in kilo-bits/second. You should set the parameter to the highest speed supported by your ESC (according to its datasheet).

그런 다음 배터리를 연결하고 기체의 시동을 켭니다. ESC가 초기화되고 모터가 올바른 방향으로 회전하여야 합니다.

- If the motors do not spin in the correct direction (for the [selected airframe](../airframes/airframe_reference.md)) you can reverse them in the UI using the **Set Spin Direction** option (this option appears after you select DShot and assign motors). You can also reverse motors by sending an [ESC Command](#commands).

## ESC Commands {#commands}

명령은 [MAVLink 쉘](../debug/mavlink_shell.md)을 통하여 ESC로 전송됩니다. 지원되는 전체 명령어는 [여기](../modules/modules_driver.md#dshot)를 참고하십시오.

가장 중요한 것은 다음과 같습니다.

- Make a motor connected to to FMU output pin 1 beep (helps with identifying motors)

  ```sh
  dshot beep1 -m 1
  ```

- Retrieve ESC information (requires telemetry, see below):

  ```sh
  nsh> dshot esc_info -m 2
  INFO  [dshot] ESC Type: #TEKKO32_4in1#
  INFO  [dshot] MCU Serial Number: xxxxxx-xxxxxx-xxxxxx-xxxxxx
  INFO  [dshot] Firmware version: 32.60
  INFO  [dshot] Rotation Direction: normal
  INFO  [dshot] 3D Mode: off
  INFO  [dshot] Low voltage Limit: off
  INFO  [dshot] Current Limit: off
  INFO  [dshot] LED 0: unsupported
  INFO  [dshot] LED 1: unsupported
  INFO  [dshot] LED 2: unsupported
  INFO  [dshot] LED 3: unsupported
  ```

- Permanently set the spin direction of a motor connected to FMU output pin 1 (while motors are _not_ spinning):

  - Set spin direction to `reversed`:

    ```sh
    dshot reverse -m 1
    dshot save -m 1
    ```

    Retrieving ESC information will then show:

    ```sh
    Rotation Direction: reversed
    ```

  - Set spin direction to `normal`:

    ```sh
    dshot normal -m 1
    dshot save -m 1
    ```

    Retrieving ESC information will then show:

    ```sh
    Rotation Direction: normal
    ```

  :::note

  - The commands will have no effect if the motors are spinning, or if the ESC is already set to the corresponding direction.
  - The ESC will revert to its last saved direction (normal or reversed) on reboot if `save` is not called after changing the direction.


:::

## 텔레메트리

일부 ESC는 다음을 포함하여 텔레메트리 측정데이터를 비행 콘트롤러로 재전송할 수 있습니다.

- 온도
- 전압
- 전류
- 누적 전류 소비
- RPM 값

이러한 DShot ESC에는 추가 텔레메트리 와이어가 있습니다.

이 기능을 활성화하려면(지원 ESC에서) :

1. 모든 ESC의 모든 원격 측정 와이어를 함께 연결한 다음, 사용하지 않는 비행 콘트롤러 직렬 포트의 RX핀 중 하나에 연결합니다.
1. [DSHOT_TEL_CFG](../advanced_config/parameter_reference.md#DSHOT_TEL_CFG)를 사용하여 해당 직렬 포트에서 텔레메트리를 활성화합니다.

재부팅 후 다음을 사용하여 텔레메트리 작동 여부를 확인할 수 있습니다 (배터리가 연결되어 있는 지 확인).

```sh
dshot esc_info -m 1
```

:::tip
올바른 RPM 값을 얻으려면 [MOT_POLE_COUNT](../advanced_config/parameter_reference.md#MOT_POLE_COUNT)를 설정하여야 합니다.
:::

:::tip
원격 분석이 지원되고 활성화된 경우에도, 모든 DSHOT 가능 ESC가 `[esc_info]` (예 : APD 80F3x)를 지원하지 않을 수도 있습니다. 결과 오류는 다음과 같습니다.

```sh
ERROR [dshot] No data received. 텔레메트리가 올바르게 설정되어 있으면, 다시 시도하십시오.
```

세부 사항은 제조업체 문서를 확인하십시오.
:::
