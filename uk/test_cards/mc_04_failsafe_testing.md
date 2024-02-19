# Тест MC_04 - Тестування безаварійності

❏ Verify RC Loss action is Return to Land

❏ Verify Data Link Loss action is Return to Land and the timeout is 10 seconds

Перевірте безвідмовність батареї

&nbsp;&nbsp;&nbsp;&nbsp;Дія повернутися до землі

&nbsp;&nbsp;&nbsp;&nbsp;Рівень попередження про заряд батареї є 25%

&nbsp;&nbsp;&nbsp;&nbsp;❏ Battery Failsafe Level is 20%

&nbsp;&nbsp;&nbsp;&nbsp;Критичний рівень батареї 15%

Зупинка в режимі висоти

Перемістіть принаймні на 20 метрів від домашньої позиції

❏ Втрата RC

&nbsp;&nbsp;&nbsp;&nbsp;❏Turn off RC and check the vehicle returns to home position, wait for the descent and turn on the RC and take over.

## Datalink Loss

❏ Disconnect telemetry, vehicle should return to home position after 10 seconds, wait for the descent and reconnect the telemetry radio

## Перемкнутись у режим висоти

❏ Make sure roll, pitch and yaw sticks respond like in Stabilize mode

❏ Throttle should control altitude, and when the stick is centered it must maintain altitude

## Switch to Position Mode

<unk> коли ручки в центрі, вони повинні утримувати позицію

❏ Move roll, pitch and yaw and check the vehicle is moving according to the inputs

❏ Center the sticks again and check the vehicle maintains position

## Wait for Battery Failsafe to Trigger

Підтвердіть, що отримано попереджувальне повідомлення в QGC

Підтвердьте повернення машини на землю

Підтвердьте приземлення машини
