# Тест MC_05 - Політ у приміщенні (ручні режими)

## Коли використовувати цю тестову картку

- New build maiden flight
- Коли необхідно повторити проблему в обмеженій області
- Експериментальні збірки, які можуть мати проблеми стабільності
- Testing hardware that has been replaced and/or modified

## Arm and Take-off

❏ Set flight mode to stabilize and Arm

❏ Take-off by raising the throttle

## Політ

❏ Stabilized

&nbsp;&nbsp;&nbsp;&nbsp;Pitch/Roll/Yaw відповідь 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response 1:1

Висота

&nbsp;&nbsp;&nbsp;&nbsp;Вертикальна позиція повинна містити поточне значення з ручкою в центрі

&nbsp;&nbsp;&nbsp;&nbsp;Pitch/Roll/Yaw відповідь 1:1

&nbsp;&nbsp;&nbsp;&nbsp;❏ Throttle response set to Climbs/Descend rate

## Посадка

❏ Land in either Stabilized or Altitude mode with the throttle below 40%

❏ Upon touching ground, copter should disarm automatically within 2 seconds (disarm time set by parameter: [COM_DISARM_LAND](../advanced_config/parameter_reference.md#COM_DISARM_LAND))

## Очікувані результати

- Take-off should be smooth as throttle is raised
- Немає коливання в жодному з перерахованих режимів польоту
- Після посадки, коптер не повинен підскакувати на землі
