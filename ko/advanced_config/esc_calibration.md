# ESC 캘리브레이션

:::note
These instructions are only relevant to [PWM ESCs](../peripherals/pwm_escs_and_servo.md).
:::

Electronic Speed Controllers (ESCs) regulate motor speed (and direction) based on the PWM input value from the flight controller (FC). The range of inputs to which an ESC will respond is configurable, and the default range can differ even between ESCs of the same model.

This calibration updates all the ESCs with the maximum and minimum PWM input values that will be supplied by the flight controller. Subsequently all the ESCs/motors will respond to flight controller input in the same way (across the whole input range).

Calibration is recommended for all ESCs, and in particular for low cost models.

## 전제 조건

The system must include a power module (PX4 uses the measured voltage to determine whether or not a battery is connected).

## 단계 

To calibrate the ESCs:

1. 프로펠러를 분리하십시오.
    
:::warning
Never attempt ESC calibration with props on.
    
    The motors should not spin during ESC calibration. However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed.
:::

2. 배터리를 분리하고 USB만을 사용하여 비행 컨트롤러를 연결하십시오.(그 외 다른 연결 방법을 사용하지 마십시오.)

3. *QGroundControl* **설정 > 전원**을 연 다음 **캘리브레이션 시작** 버튼을 누릅니다.
    
    ![ESC 캘리브레이션 단계 1](../../assets/qgc/setup/esc/qgc_esc_calibration.png)

4. 다음 메시지가 나타나면 배터리를 연결하십시오.
    
    ![ESC 캘리브레이션 단계 2](../../assets/qgc/setup/esc/esc_calibration_step_2.png)
    
    캘리브레이션이 자동으로 시작됩니다.
    
    ![ESC 캘리브레이션 단계 3](../../assets/qgc/setup/esc/esc_calibration_step_3.png)

5. 캘리브레이션이 완료되면 배터리를 분리하라는 메시지가 표시됩니다. 
    
    ![ESC 캘리브레이션 단계 4](../../assets/qgc/setup/esc/esc_calibration_step_4.png)

:::note
High-quality controllers come with a factory calibration. In *theory* this means that they can be configured by just setting the [PWM_MIN](../advanced_config/parameter_reference.md#PWM_MIN) and [PWM_MAX](../advanced_config/parameter_reference.md#PWM_MAX) parameters to the values provided in the ESC technical specification. In practice the input range may differ even on high quality controllers, which is why calibration is recommended.
:::