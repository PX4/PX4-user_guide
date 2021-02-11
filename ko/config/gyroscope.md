# 자이로스코프 보정

기체를 평평한 곳에 움직이지 않도록 놓아둔 체로 *QGroundControl*을 사용하여 보정을 시작합니다.

## 보정 방법

보정 절차는 다음과 같습니다:

1. **자이로스코프** 센서 버튼 클릭
    
    ![자이로스코프 보정 PX4 선택](../../assets/qgc/setup/sensor/gyroscope_calibrate_px4.jpg)

2. 기체을 평평한 곳에 놓고 가만히 둡니다.

3. **확인**을 눌러 보정작업을 시작하십시오.
    
    상단의 Progressive Bar에서 진행 상황을 보여줍니다.
    
    ![PX4에서 자이로스코프 보정 진행 중](../../assets/qgc/setup/sensor/gyroscope_calibrate_progress_px4.jpg)

4. 완료되면 *QGroundControl*에 *캘리브레이션 완료* 메시지가 나타납니다. ![PX4에서 자이로스코프 보정 완료](../../assets/qgc/setup/sensor/gyroscope_calibrate_complete_px4.jpg)

:::note
차량을 이동하면 *QGroundControl*이 자동으로 자이로스코프 보정을 다시 시작합니다.
:::

## 추가 정보

* [QGroundControl 사용 설명서 > 자이로스코프](https://docs.qgroundcontrol.com/en/SetupView/sensors_px4.html#gyroscope)