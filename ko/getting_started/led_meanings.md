# LED 신호의 의미(Pixhawk 시리즈)

Pixhawk 비행 컨트롤러 시리즈</ 0>는 LED에 기체의 현 상태를 표출합니다.</p> 

* [UI LED](#ui_led)는 *비행 준비*와 관련된 사용자에게 필요한 상태 정보를 제공합니다.
* [상태 LED](#status_led)는 PX4IO 및 FMU SoC에 대한 상태를 제공합니다. 전원, 부트 로더 모드, 활동 및 오류를 나타냅니다.

<span id="ui_led"></span>

## UI LED

RGB *UI LED*는 차량의 현재 *비행 준비* 상태를 나타냅니다. 이것은 일반적으로 비행 컨트롤러 보드에 장착되거나 장착되지 않을 수있는 초 고휘도 I2C 주변 장치입니다 (예 : FMUv4에는 보드에 하나가없고 일반적으로 GPS에 장착 된 LED를 사용함).

아래 이미지는 LED와 차량 상태 간의 관계를 보여줍니다.

:::warning PX4가 아직 [비행 사전 점검을 통과](../flying/pre_flight_checks.md) 하지 않았기 때문에 GPS 잠금 장치 (녹색 LED)가 있어도 기체에 시동을 걸 수 없습니다. **이륙하려면 유효한 전역 위치 추정치가 필요합니다! **
:::

:::tip
오류 (빨간색 깜박임) 또는 차량이 GPS 잠금을 달성 할 수없는 경우 (파란색에서 녹색으로 변경) 보정 상태 및 오류를 포함하여 *QGroundControl*에서 더 자세한 상태 정보를 확인하십시오. [프리 플라이트 확인 (내부)](../flying/pre_flight_checks.md)에서보고 한 메시지입니다. 또한 GPS 모듈이 제대로 연결되어 있는지, Pixhawk가 GPS를 제대로 읽고 있는지, GPS가 적절한 GPS 위치를 전송하는지 확인하십시오.
:::

![LED meanings](../../assets/flight_controller/pixhawk_led_meanings.gif)

* ** [파란색 단색] 무장, GPS 잠금 없음 : ** 차량이 무장되었으며 GPS 장치에서 위치 잠금이 없음을 나타냅니다. 기체의 시동이 걸리면 PX4는 모터를 제어하여 드론을 조종할 수 있습니다. 큰 프로펠러는 고속의 회전으로 인하여 위험하므로 시동시에 항상 조심하여야 합니다. 이 모드에서는 차량이 안내 임무를 수행 할 수 없습니다.

* ** [파란색으로 깜박임] 무장 해제, GPS 잠금 없음 : ** 위와 유사하지만 기체의 시동이 꺼졌습니다. 이는 모터를 제어 할 수 없지만, 다른 하위 시스템들은 작동한다는 것을 의미합니다.

* ** [녹색으로 켜짐] 무장 됨, GPS 잠금 : ** 차량의 시동이 걸렸으며, GPS 장치에서 유효한 위치 정보를 획득하였음을 의미합니다. 기체에 시동이 걸리면, PX4는 모터를 제어하여 드론을 조종 할 수 있습니다. 큰 프로펠러는 고속의 회전으로 인하여 위험하므로 시동시에 항상 조심하여야 합니다. 이 모드에서 기체는 안내 임무를 수행 할 수 있습니다.

* ** [녹색 깜박임] 무장 해제, GPS 잠금 : ** 위와 유사하지만 차량의 시동이 꺼져있습니다. 즉, 모터는 제어 할 수 없지만, GPS 위치 잠금을 포함한 다른 하위 시스템들은 작동합니다.

* ** [진한 보라색] 사고 방지 모드 : **이 모드는 비행중 기체에 문제가 발생할 때 활성화됩니다. During failsafe mode, vehicle will attempt to return to its takeoff location, or may simply descend where it currently is.

* **[Solid Amber] Low Battery Warning:** Indicates your vehicle's battery is running dangerously low. After a certain point, vehicle will go into failsafe mode. However, this mode should signal caution that it's time to end this flight.

* **[Blinking Red] Error / Setup Required:** Indicates that your autopilot needs to be configured or calibrated before flying. Attach your autopilot to a Ground Control Station to verify what the problem is. If you have completed the setup process and autopilot still appears as red and flashing, there may be another error.

<span id="status_led"></span>

## Status LED

Three *Status LEDs* provide status for the FMU SoC, and three more provide status for the PX4IO (if present). They indicate power, bootloader mode and activity, and errors.

![Pixhawk 4](../../assets/flight_controller/pixhawk4/pixhawk4_status_leds.jpg)

From power on, the FMU and PX4IO CPUs first run the bootloader (BL) and then the application (APP). The table below shows how the Bootloader and then APP use the LEDs to indicate condition.

| Color     | Label                       | Bootloader usage                               | APP usage               |
| --------- | --------------------------- | ---------------------------------------------- | ----------------------- |
| Blue      | ACT (Activity)              | Flutters when the bootloader is receiving data | Indication of ARM state |
| Red/Amber | B/E (In Bootloader / Error) | Flutters when in the bootloader                | Indication of an ERROR  |
| Green     | PWR (Power)                 | Not used by bootloader                         | Indication of ARM state |

:::note
The LED labels shown above are commonly used, but might differ on some boards.
:::

More detailed information for how to interpret the LEDs is given below (where "x" means "any state")

| Red/Amber | Blue | Green | Meaning                                                     |
| --------- | ---- | ----- | ----------------------------------------------------------- |
| 10Hz      | x    | x     | Overload CPU load > 80%, or RAM usage > 98%                 |
| OFF       | x    | x     | Overload CPU load <= 80%, or RAM usage <= 98%               |
| NA        | OFF  | 4 Hz  | actuator_armed->armed && failsafe                           |
| NA        | ON   | 4 Hz  | actuator_armed->armed && !failsafe                          |
| NA        | OFF  | 1 Hz  | !actuator_armed-> armed && actuator_armed->ready_to_arm |
| NA        | OFF  | 10 Hz | !actuator_armed->armed && !actuator_armed->ready_to_arm |