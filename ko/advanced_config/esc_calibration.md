# ESC 캘리브레이션

:::note
이 지침은 [PWM ESC](../peripherals/pwm_escs_and_servo.md)에만 관련됩니다.
:::

전자 속도 컨트롤러 (ESC)는 비행 컨트롤러 (FC)의 PWM 입력 값을 기반으로 모터 속도와 방향을 조절합니다. ESC 입력 범위는 설정 가능하며, 동일한 모델 ESC간에도 응답 범위가 다를 수 있습니다.

비행 컨트롤러에서 입력하는 최대/최소 PWM 입력값으로 ESC를 업데이트합니다. 결과적으로 모든 ESC/모터는 동일한 방식으로 (전체 입력 범위에 걸쳐) 비행 컨트롤러 입력에 반응합니다.

ESC는 특히 저비용 모델은 보정하는 것이 바람직합니다.

## 전제 조건

시스템에는 전원 모듈이 포함되어야합니다. PX4는 측정된 전압으로 배터리 연결 여부를 판별합니다.

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