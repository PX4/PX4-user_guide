# Режим Місії (VTOL)

<img src="../../assets/site/position_fixed.svg" title="Global position fix required (e.g. GPS)" width="30px" />

Режим _Місія_ викликає виконання транспортним засобом заздалегідь визначеної автономної [місії](../flying/missions.md) (плану польоту), яка була завантажена до польотного контролера.
Зазвичай місія створюється та завантажується за допомогою програми земного контролю (GCS), наприклад, [QGroundControl](https://docs.qgroundcontrol.com/master/en/) (QGC).

VTOL-транспортні засоби дотримуються поведінки та параметрів фіксованих крил під час перебування у режимі FW, і багтроторних апаратів у режимі MC.
Для отримання додаткової інформації дивіться конкретні документи для кожного режиму:

- [Режим Місії (MC)](../flight_modes_mc/mission.md)
- [Режим Місії (FW)](../flight_modes_fw/mission.md)

У наступних розділах описується поведінка режиму місії, яка є специфічною для VTOL.

## Команди місій

Наступні команди VTOL відповідають специфікації MAVLink.

- [MAV_CMD_NAV_VTOL_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_TAKEOFF)
  - `MAV_CMD_NAV_VTOL_TAKEOFF.param2` (заголовок переходу) ігнорується.
    Замість цього напрямок до наступної маршрутної точки використовується для переходу. <!-- at LEAST until PX4 v1.13: https://github.com/PX4/PX4-Autopilot/issues/12660 -->
- [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND)
- [MAV_CMD_DO_VTOL_TRANSITION](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_VTOL_TRANSITION)

В іншому випадку PX4 зазвичай "приймає" команди місії для фіксованого крила або мультикоптера у відповідних режимах.

У режимі фіксованого крила є наступні винятки:

- [MAV_CMD_NAV_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_LAND) перетворюється на [MAV_CMD_NAV_VTOL_LAND](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_VTOL_LAND) якщо [NAV_FORCE_VT](../advanced_config/parameter_reference.md#NAV_FORCE_VT) встановлено на `0` (вимкнено).
- [MAV_CMD_NAV_TAKEOFF](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_TAKEOFF) не підтримується.

## Місія зліт

Заплануйте зліт місії VTOL, додавши на карту пункт місії `VTOL Takeoff`.

Під час виконання місії транспортний засіб підніметься вертикально до мінімальної висоти взяття на озброєння, визначеної в параметрі [MIS_TAKEOFF_ALT](../advanced_config/parameter_reference.md#MIS_TAKEOFF_ALT), а потім перейде в режим фіксованих крил з напрямком, визначеним у елементі місії. Після переходу транспортний засіб рухається в напрямку 3D-позиції, визначеної у елементі місії.
Після переходу транспортний засіб рухається в напрямку 3D-позиції, визначеної у елементі місії.

Для взяття на озброєння місії `VTOL Takeoff` необхідно додати елемент місії Взліт VTOL (`MAV_CMD_NAV_VTOL_TAKEOFF`) для взяття на озброєння (або `MAV_CMD_NAV_TAKEOFF`, коли транспортний засіб перебуває у режимі MC); однак, якщо транспортний засіб вже знаходиться у повітрі, коли місія починається, елемент взяття на озброєння буде оброблено як звичайна точка маршруту.

## Дивіться також

- [Режим Місії (MC)](../flight_modes_mc/mission.md)
- [Режим Місії (FW)](../flight_modes_fw/mission.md)
- [Місії](../flying/missions.md)
  - [Місія Доставки пакетів](../flying/package_delivery_mission.md)
