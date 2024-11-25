# Тест MC_02 - Повна автономність

## Створити та завантажити місію

❏ Критерії Місії

&nbsp;&nbsp;&nbsp;&nbsp;❏ Auto take-off

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ First waypoint set to Takeoff

&nbsp;&nbsp;&nbsp;&nbsp;❏ Enable Mission End RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 5 to 6 minutes

❏ Upload mission to vehicle using _QGroundControl_

## Озброєння та зліт

❏ Постановка на охорону в будь-якому ручному режимі

❏ Увімкніть Auto, щоб ініціювати зліт

❏ Спостереження відстеження, поворот і належна продуктивність RTL

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## Очікувані результати

- Зліт повинен бути плавним, коли газ піднято
- Місія має бути завантажена при першій спробі
- Дрон повинен автоматично злетіти після ввімкнення автоматичного режиму
- Після посадки, коптер не повинен підскакувати на землі

<!--
MC_002 - Full autonomous

-	Make sure the auto-disarm is enabled
-	QGC open test1_mission.plan and sync to the vehicle
-	Takeoff from QGC start mission slider
-	Check the vehicle completes the mission
-	Let the vehicle to auto land, take manual control if needed and explain the reason in log description.
-	Check the vehicle disarms by itself.
-->
