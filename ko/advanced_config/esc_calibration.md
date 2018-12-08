# ESC Calibration

> 참고 이 지침은 PWM 입력을 사용하는 ESC에만 관련됩니다.

전자 속도 컨트롤러 (ESC)는 비행 컨트롤러 (FC)의 PWM 입력 값을 기반으로 모터 속도 (및 방향)를 조절합니다. ESC가 응답 할 입력 범위는 구성 가능하며 동일한 모델의 ESC간에 기본 범위가 다를 수 있습니다.

이 보정은 모든 ESC를 비행 컨트롤러가 제공하는 최대 및 최소 PWM 입력 값으로 업데이트합니다. 결과적으로 모든 ESC / 모터는 (전체 입력 범위에서) 동일한 방식으로 비행 컨트롤러 입력에 응답합니다.

모든 ESC, 특히 저비용 모델의 경우 보정이 권장됩니다.

## 전제 조건

시스템에는 전원 모듈이 있어야합니다 (PX4는 측정 된 전압을 사용하여 배터리 연결 여부를 결정합니다).

## 단계 

ESC를 보정하려면 다음을 수행하십시오.

1. 프로펠러를 분리하십시오.
    
    > **Warning** Never attempt ESC calibration with props on.
    > 
    > The motors should not spin during ESC calibration. However if an ESC doesn't properly support/detect the calibration sequence then it will respond to the PWM input by running the motor at maximum speed.

2. 배터리를 분리하고 USB를 통해 비행 컨트롤러를 연결하십시오 (전용).

3. QGroundControl 설정> 전원을 연 다음 보정 버튼을 누릅니다.
    
    ![ESC 교정 단계 1](../../images/qgc_esc_calibration.png)

4. 메시지가 나타나면 배터리를 연결하십시오.
    
    ![ESC 교정 단계 2](../../images/esc_calibration_step_2.png)
    
    보정이 자동으로 시작됩니다.
    
    ![ESC 교정 단계 3](../../images/esc_calibration_step_3.png)

5. 보정이 완료되면 배터리를 분리하라는 메시지가 표시됩니다. 
    
    ![ESC 교정 단계 4](../../images/esc_calibration_step_4.png)

> 참고 고품질 컨트롤러는 출고시 캘리브레이션과 함께 제공됩니다. 이론적으로 이는 PWM_MIN 및 PWM_MAX 매개 변수를 ESC 기술 사양에서 제공된 값으로 설정하여 구성 할 수 있음을 의미합니다. 실제로 입력 범위는 고품질 컨트롤러에서도 다를 수 있으므로 교정이 권장되는 이유입니다.