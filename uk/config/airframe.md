# Вибір рухомого засобу (корпусу)

After installing firmware you need to select a [vehicle type and frame configuration](../airframes/airframe_reference.md). This applies appropriate initial parameter values for the selected frame, such as the vehicle type, number of motors, relative motor position, and so on. These can later be customised for your vehicle in [Actuator Configuration & Testing](../config/actuators.md).

::: tip
Choose the frame that matches your vehicle brand and model if one exists, and otherwise select the closest "Generic" frame option matching your vehicle.
:::

## Налаштуйте раму

Налаштуйте планер:

1. Запустіть _QGroundControl_ та підключіть транспортний засіб.
1. Виберіть **іконку "Q" >  Налаштування транспортного засобу >  Корпус** (бічна панель), щоб відкрити _Налаштування корпусу_.
1. Виберіть широку групу/тип транспортного засобу, який відповідає вашій конструкції, а потім скористайтеся випадаючим списком всередині групи, щоб вибрати конструкцію, яка найкраще підходить для вашого транспортного засобу.

   ![Вибір загального рамного кадру гексакоптера X в QGroundControl](../../assets/qgc/setup/airframe/airframe_px4.jpg)

   Приклад вище показує геометрію _Загального Гексакоптера X_, вибрану з групи _Гексакоптер X_.

1. Клацніть **Застосувати та перезапустити**. Клацніть **Застосувати** у наступному вікні, щоб зберегти налаштування та перезапустити автомобіль.

   <img src="../../assets/qgc/setup/airframe/airframe_px4_apply_prompt.jpg" width="300px" title="Застосувати запит на вибір корпусу повітряного судна" />

## Наступні кроки

[Налаштування та тестування приводів](../config/actuators.md) показує, як встановити точну геометрію моторів та приводів транспортного засобу, а також їх відображення на виходи контролера польоту. Після відображення приводів на виходи ви повинні виконати [Калібрування ESC](../advanced_config/esc_calibration.md), якщо використовуєте PWM або OneShot ESC.

## Додаткова інформація

- [QGroundControl Посібник користувача > Airframe](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/setup_view/airframe.html)
- [Відео налаштування PX4 - @37s](https://youtu.be/91VGmdSlbo4?t=35s) (Youtube)
