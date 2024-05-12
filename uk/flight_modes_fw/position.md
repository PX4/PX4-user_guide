# Режим позиції (фіксоване крило)

<img src="../../assets/site/difficulty_easy.png" title="Easy to fly" width="30px" />&nbsp;<img src="../../assets/site/remote_control.svg" title="Manual/Remote control required" width="30px" />&nbsp;<img src="../../assets/site/position_fixed.svg" title="Position fix required (e.g. GPS)" width="30px" />

_Режим позиції_ є найлегшим і найбезпечнішим ручним режимом. Підтримується на транспортних засобах, які мають прогноз позиціонування (наприклад, GPS). Це полегшує пілотам контроль висоти транспортного засобу, і зокрема досягати і підтримувати фіксовану висоту. Режим буде утримувати курс транспортного засобу від вітру. Швидкість активно контролюється, якщо встановлений датчик швидкості.

Транспортний засіб виконує [координований поворот](https://en.wikipedia.org/wiki/Coordinated_flight), якщо рулі не нульові, тоді як pitch -стік контролює швидкість підйому/спуску. Засувка визначає швидкість — при 50% засувки літак буде утримувати свою поточну висоту з заданою крейсерською швидкістю.

Коли всі стіки управління відпущені/центровані (без крену, тангажу, курсу та близько 50% керування газом), літак повернеться до прямого, рівного польоту та збереже свою поточну висоту та траєкторію польоту не залежно від вітру. This makes it easy to recover from any problems when flying. Крен та тангаж - кутово-керовані (тому неможливо перевалюватися або робити петлю транспортному засобу).

Стік повороту може бути використана для збільшення/зменшення кута рискання при поворотах. Якщо контролер фіксований у центрі, то він самостійно здійснює координацію повороту, що означає, що він застосовує необхідну швидкість розвороту для поточного кута крену, щоб виконати плавний поворот. Діаграма нижче візуально показує поведінку режиму (для [передавача режиму 2](../getting_started/rc_transmitter_receiver.md#transmitter_modes)).

![FW Position Mode](../../assets/flight_modes/position_fw.png)

## Технічний опис

Режим позиції, як [Режим стабілізації](../flight_modes_fw/altitude.md), але зі стабілізацією курсу. Швидкість також стабілізується, якщо встановлений датчик швидкості.

- Центровані вхідні показники крену/тангажу/рискання (в межах дедбенду):
  - Autopilot levels vehicle and maintains altitude, airspeed and course over ground.
- Outside center:
  - Pitch stick controls altitude.
  - Throttle stick controls the airspeed of the aircraft if an airspeed sensor is connected. Without an airspeed sensor the vehicle will fly level at trim throttle ([FW_THR_TRIM](../advanced_config/parameter_reference.md#FW_THR_TRIM)), increasing or decreasing throttle as needed to climb or descend.
  - Roll stick controls roll angle. Autopilot will maintain [coordinated flight](https://en.wikipedia.org/wiki/Coordinated_flight).
  - Yaw stick adds an additional yaw rate setpoint (added to the one calculated by the autopilot to maintain coordinated flight). Can be used to manually change the side slip of the vehicle.
- Manual control input is required (such as RC control, joystick).
- An altitude measurement source is required (usually barometer or GPS)

## Параметри

The mode is affected by the following parameters:

| Параметр                                                                                                    | Опис                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <a id="FW_AIRSPD_MIN"></a>[FW_AIRSPD_MIN](../advanced_config/parameter_reference.md#FW_AIRSPD_MIN)         | Min airspeed. Default: 10 m/s.                                       |
| <a id="FW_AIRSPD_MAX"></a>[FW_AIRSPD_MAX](../advanced_config/parameter_reference.md#FW_AIRSPD_MAX)         | Max airspeed. Default: 20 m/s.                                       |
| <a id="FW_AIRSPD_TRIM"></a>[FW_AIRSPD_TRIM](../advanced_config/parameter_reference.md#FW_AIRSPD_TRIM)       | Cruise speed. Default: 15 m/s.                                       |
| <a id="FW_MAN_P_MAX"></a>[FW_MAN_P_MAX](../advanced_config/parameter_reference.md#FW_MAN_P_MAX)           | Max pitch setpoint in attitude stabilized mode. Default: 45 degrees. |
| <a id="FW_MAN_R_MAX"></a>[FW_MAN_R_MAX](../advanced_config/parameter_reference.md#FW_MAN_R_MAX)           | Max roll setpoint in attitude stabilized mode. Default: 45 degrees.  |
| <a id="FW_T_CLMB_R_SP"></a>[FW_T_CLMB_R_SP](../advanced_config/parameter_reference.md#FW_T_CLMB_R_SP)     | Max climb rate setpoint. Default: 3 m/s.                             |
| <a id="FW_T_SINK_R_SP"></a>[FW_T_SINK_R_SP](../advanced_config/parameter_reference.md#FW_T_SINK_R_SP)     | Max sink rate setpoint. Default: 2 m/s.                              |
| <a id="FW_PN_R_SLEW_MAX"></a>[FW_PN_R_SLEW_MAX](../advanced_config/parameter_reference.md#FW_PN_R_SLEW_MAX) | Roll setpoint slew rate limit. Default: 90 °/s.                      |
