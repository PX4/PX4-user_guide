# Тест MC_03 - поєднання автоматичного і ручного керування

## Створити та завантажити місію

❏ Критерії Місії

&nbsp;&nbsp;&nbsp;&nbsp;❏ Changes in Altitude throughout the mission

&nbsp;&nbsp;&nbsp;&nbsp;❏ Mission should end in the air and NOT Land/RTL

&nbsp;&nbsp;&nbsp;&nbsp;❏ Duration of 3 to 4 minutes

❏ Upload mission to vehicle using _QGroundControl_

## Політ

❏ Постановка на озброєння та зліт у режимі позиції

❏ Автозалучення

❏ Слідкуйте за відстеженням і поворотами

❏ Після завершення місії поверніться в режим розташування

&nbsp;&nbsp;&nbsp;&nbsp;❏ Horizontal position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Vertical position should hold current value with stick centered

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

&nbsp;&nbsp;&nbsp;&nbsp;❏ Pitch/Roll/Yaw response set to Pitch/Roll/Yaw rates

❏ Використовуйте RTL

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## Очікувані результати

- Зліт повинен бути плавним, коли газ піднято
- Немає коливання в жодному з перерахованих режимів польоту
- Після посадки, коптер не повинен підскакувати на землі
