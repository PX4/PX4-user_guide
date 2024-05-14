# Прошивка Sapog ESC

Фірмварне [Sapog](https://github.com/PX4/sapog#px4-sapog) є передовим відкритим джерелом фірмварного засобу управління бездатчиковими моторами PMSM/BLDC, призначеним для використання в системах приводу електричних безпілотних транспортних засобів.

Хоча його можна контролювати за допомогою традиційного введення ШІМ, він призначений для роботи через шину CAN за допомогою [DroneCAN](index.md).

## Де купити

Декілька постачальників продають апаратне забезпечення ESC, яке працює на прошивці sapog:

- [Zubax Orel 20](https://zubax.com/products/orel_20)
- [Holybro Kotleta20](https://holybro.com/products/kotleta20)

<style>
#image_container {
  height: 100%;
  width: 100%;
  display: flex;
}
.image_column {
  width: 33%;
  text-align: center;
}

</style>

<div id="image_container">
  <div class="image_column">
  <img src="../../assets/peripherals/esc_uavcan_zubax_orel20/orel20_top.jpg" alt="Orel20 - Top"/><br><a href="https://zubax.com/products/orel_20">Zubax Orel 20</a>
  </div>
  <div class="image_column">
    <img src="../../assets/peripherals/esc_uavcan_holybro_kotleta20/kotleta20_top.jpg" alt="Holybro Kotleta20 top" /><br><a href="https://holybro.com/products/kotleta20">Holybro Kotleta20</a>
  </div>
</div>

## Встановлення обладнання

ESCs підключені до шини CAN за допомогою стандартного кабелю Pixhawk 4 pin JST GH. Для отримання додаткової інформації, зверніться до інструкцій з [проводки CAN](../can/index.md#wiring). Порядок ESC не має значення.

## Встановлення прошивки

ESCs поставляються з встановленою заздалегідь ​​сбіркою Sapog. Якщо ви хочете оновити:

Збірка прошивки:

```sh
git clone --recursive https://github.com/PX4/sapog
cd sapog/firmware
make RELEASE=1
```

Це створить файл `*.application.bin`. в `build/`. Цей бінарний файл може бути прошитий через автопілот по DroneCAN через завантажувальник sapog. Див. [Оновлення програмного забезпечення DroneCAN](index.md#firmware-update).

Звертайтеся до [сторінки проекту](https://github.com/PX4/sapog), щоб дізнатися більше, включаючи як прошивати без використання загрузчика DroneCAN (тобто на ще не програмованому пристрої) або для розробки.

## Налаштування польотного контролера

### Увімкнення DroneCAN

Підключіть ESC до шини CAN Pixhawk. Увімкніть весь транспортний засіб за допомогою акумулятора або джерела живлення (не лише контролера польоту через USB) та увімкніть драйвер DroneCAN, встановивши параметр [UAVCAN_ENABLE](../advanced_config/parameter_reference.md#UAVCAN_ENABLE) на '3', щоб увімкнути як динамічне призначення ідентифікатора вузла, так і вивід ESC DroneCAN.

### Автоматичне перерахування кодів ESC за допомогою QGroundControl

Цей розділ показує, як перелічити будь-які [Sapog-основані](https://github.com/PX4/sapog#px4-sapog) ESCs "автоматично" за допомогою _QGroundControl_.

:::tip
Ви можете пропустити цей розділ, якщо в вашій настройці є лише один регулятор ESC, оскільки індекс ESC вже встановлений за замовчуванням на нуль.
:::

Для переліку ESC:

1. Увімкніть пристрій за допомогою батареї й підключіть до _QGroundControl_
2. Перейдіть в **Налаштування транспортного засобу > Енергія** у QGC.
3. Почніть процес автоматичного переліку ESC, натиснувши кнопку **Почати призначення**, як показано на знімку екрану нижче.

   ![QGC - DroneCAN ESC auto-enumeration](../../assets/peripherals/esc_qgc/qgc_uavcan_settings.jpg)

   Ви почуєте звук, що вказує на те, що керування польотом увійшло в режим переліку ESC.

4. Вручну поверніть кожен двигун у правильному напрямку його обертання (як вказано у [Посилання на корпус ](../airframes/airframe_reference.md)), починаючи з першого двигуна й закінчуючи останнім двигуном. Кожного разу, коли ви ввімкнете мотор, ви повинні почути підтвердний сигнал.

   :::info
Переконайтеся, що кожен з моторів обертається у правильному напрямку, оскільки ESC автоматично навчиться і запам'ятає напрямок (тобто мотори, які обертаються за годинниковою стрілкою під час звичайної роботи, також повинні обертатися за годинниковою стрілкою під час перелічення).
:::

5. Після того, як останній двигун перелічено, звук підтвердження повинен змінитися, щоб показати, що процедура переліку завершена.
6. Перезавантажте PX4 та Sapog ESC, щоб застосувати нові ідентифікатори переліку.

Наступне відео демонструє процес:

@[youtube](https://www.youtube.com/watch?v=4nSa8tvpbgQ)

### Ручне перерахування ESC за допомогою Sapog

:::tip
Ми рекомендуємо автоматизоване [перерахунок Sapog ESC за допомогою QGroundControl](#automatic-esc-enumeration-using-qgroundcontrol), показаний вище, аніж ручний перерахунок (це простіше та безпечніше).
:::

Ви можете вручну налаштувати індекс ESC та напрямок, використовуючи [DroneCAN GUI Tool](https://dronecan.github.io/GUI_Tool/Overview/). Це надає наступні параметри конфігурації Sapog для кожного переліченого ESC:

- `esc_index`
- `ctl_dir`

:::info Див. [посібник з посиланням на Sapog](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf) для отримання додаткової інформації про параметри.
:::

### Конфігурація PX4

Назначте двигуни на виходи, використовуючи екран конфігурації [Acutator](../config/actuators.md#actuator-testing).

## Вирішення проблем

Див. [Усунення несправностей DroneCAN](index.md#troubleshooting)

## Детальна інформація

- [PX4/Sapog](https://github.com/PX4/sapog#px4-sapog) (Github)
- [Довідник з посиланням на Sapog v2](https://files.zubax.com/products/io.px4.sapog/Sapog_v2_Reference_Manual.pdf)
- [Використання Sapog засноване ESC з PX4](https://kb.zubax.com/display/MAINKB/Using+Sapog-based+ESC+with+PX4) (Zubax KB)
