# Інтерфейс навігації PX4 ROS 2

<Badge type="warning" text="main (PX4 v1.15)" /> <Badge type="warning" text="Experimental" />

:::warning
Експериментальні налаштування
На момент написання цієї статті, деякі частини бібліотеки інтерфейсу PX4 ROS 2 є експериментальними і, отже, можуть бути змінені.
:::

[PX4 ROS 2 Interface бібліотека](../ros2/px4_ros2_interface_lib. d) інтерфейс навігації дозволяє розробникам надсилати дані щодо позиції PX4 безпосередньо з ROS 2 додатків, така як система VIO або система відповідності мап.
Цей інтерфейс надає шар абстракції від PX4 та каркасу обміну повідомленнями uORB і вводить деякі перевірки на розумність стану оцінки оновлень, надісланих через інтерфейс.
Ці вимірювання потім об'єднуються в EKF так само, як внутрішні вимірювання PX4.

Бібліотека надає два класи: LocalPositionMeasurementInterface та GlobalPositionMeasurementInterface, які обидва використовують схожий метод оновлення для надання оновлення локальної позиції або глобальної позиції до PX4 відповідно.
Метод `update` очікує від позиції вимірювання `struct` ([`LocalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1__ros2_1_LocalPositionMeasurement.html) або [`GlobalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx__ros2_1_GlobalitionMeasurement.html)), які розробники можуть народитися власними вимірюваннями.

## Установка та перший тест

Для початку роботи необхідно виконати наступні кроки:

1. Переконайтеся, що у вас працює налаштована система ROS 2 з px4_msgs у робочому просторі ROS 2.

2. Клонуйте репозиторій в робочий простір:

   ```sh
   ```

:::note
Для забезпечення сумісності використовуйте останні гілки main для PX4, px4_msgs та бібліотеки.
   Дивіться також тут.

3. Побудуйте робочий простір:

   ```sh
   ```

4. У іншій оболонці запустіть PX4 SITL:

   ```sh
   ```

   (тут ми використовуємо Gazebo-Classic, але ви можете використовувати будь-яку модель або симулятор)

5. У іншій оболонці запустіть агента micro XRCE (ви можете залишити його запущеним після цього):

   ```sh
   ```

6. Back in the ROS 2 terminal, source the workspace you just built (in step 3) and run the [global_navigation](https://github.com/Auterion/px4-ros2-interface-lib/tree/main/examples/cpp/navigation/global_navigation) example, which periodically sends dummy global position updates:

   ```sh
   ```

   Ви повинні отримати вивід, подібний до цього, що показує, що глобальний інтерфейс успішно надсилає оновлення позиції:

   ```sh
   ```

7. У PX4 оболонці можна перевірити, що PX4 отримує глобальні оновлення позиції:

   ```sh
   ```

   Вихід має містити:

   ```sh
   ```

8. Тепер ви готові використовувати навігаційний інтерфейс для надсилання своїх оновлень.

## Як користуватися бібліотекою

Для надсилання вимірювання позиції ви заповнюєте структуру позиції з виміряними значеннями.
Потім викликаєте функцію оновлення інтерфейсу з цією структурою як аргументом.

Для базового прикладу, як користуватися цим інтерфейсом, ознайомтеся з [examples](https://github.com/Auterion/px4-ros2-interface-lib/tree/main/examples/cpp/navigation) в `Auterion/px4-rosface-lib` репозиторію, наприклад [examples/cpp/navigation/local_navigation](https://github.com/Auterion/px4-ros2-interface-lib/b/main/examples/cpp/navigation/local_navigation/inclation/inclde/local_localation.hppation.hpp) або examples/cpps/cppation/globation](https\://github.com/Auter/intertere-face-face-face-facb/mainb/mppation/mppation/example/example/navigation/navigation/navigation/navig/navigation/navigation/navig/navig/navig/navighblob/navig

### Оновлення локальної позиції

Спочатку переконайтеся, що параметр PX4 [`EKF2_EV_CTRL`](../advanced_config/parameter_reference.md#EKF2_EV_CTRL) налаштований належним чином для ефективного використання зовнішніх локальних вимірів, встановивши відповідні біти в `true`:

- 0: Дані горизонтальної позиції
- 1: Дані вертикальної позиції
- 2: Дані швидкості
- 3: Дані кута yaw



1. Створіть [`LocalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4ros2_1_1__ros2_1_1LocalPositionMeasurementInterface.html), надаючи йому речі: ID ROS вузол, а також посилання на швидкість вашого вимірювання.
2. Заповніть [`LocalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1_1_LocalPositionMeasurement.html) `struct` своїми вимірюваннями.
3. Передайте `struct` на `LocalPositionMeasurementInterface` [`update()`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1LocalPositionMeasureInterface.html#a6fd180b944710716d418b2cfe1c0c8e3) метод.

Доступні рамки посилання на положення та швидкість для ваших вимірювань визначаються наступним переліком:

```cpp
```

Структура `LocalPositionMeasment` визначено таким чином:

```cpp
```

Метод `update()` глобального інтерфейсу очікує дотримання наступних умов для `GlobalPositionMeasment`:

- Час відбору вибіркових вимірювань визначений.
- Значення не мають NAN\`\`.
- Якщо надано значення вимірювання, його відповідне значення розбіжності добре визначено (наприклад, якщо `lat_lon` визначено, то необхідно вказати `horizontal_variance`).
- Якщо надано значення вимірювання, його пов'язана рамка посилання не є невідомою (наприклад, якщо визначено `position_xy`, то інтерфейс було ініціалізовано з подовжувачем кадру, відмінного від `PoseFrame:Unknown`).

Наступний фрагмент коду є прикладом вузла ROS 2, який використовує локальний інтерфейс навігації для надсилання оновлень 3D-позиції у рамці посилання Північ-Схід-Дон (NED) до PX4:

```cpp
```

###

Спочатку переконайтеся, що параметр PX4 [`EKF2_EV_CTRL`](../advanced_config/parameter_reference.md#EKF2_EV_CTRL) налаштований належним чином для ефективного використання зовнішніх локальних вимірів, встановивши відповідні біти в `true`:

- 0: Дані вертикальної позиції
- 1: Дані вертикальної позиції

Щоб надіслати глобальне вимірювання на PX4:

1. Створіть [`LocalPositionMeasurementInterface`](https://auterion.github.io/px4-ros2-interface-lib/classpx4ros2_1_1__ros2_1_1LocalPositionMeasurementInterface.html), надаючи йому речі: ID ROS вузол, а також посилання на швидкість вашого вимірювання.
2. Заповніть [`LocalPositionMeasurement`](https://auterion.github.io/px4-ros2-interface-lib/structpx4__ros2_1_1_1_LocalPositionMeasurement.html) `struct` своїми вимірюваннями.
3. Передайте `struct` на `LocalPositionMeasurementInterface` [`update()`](https://auterion.github.io/px4-ros2-interface-lib/classpx4__ros2_1_1LocalPositionMeasureInterface.html#a6fd180b944710716d418b2cfe1c0c8e3) метод.

Структуру `LocalPositionMeasment` визначено таким чином:

```cpp
```

Метод `update()` глобального інтерфейсу очікує дотримання наступних умов для `GlobalPositionMeasment`:

-
- Значення не мають NAN.
- Якщо надано значення вимірювання, його відповідне значення розбіжності добре визначено (наприклад, якщо `lat_lon` визначено, то необхідно вказати `horizontal_variance`).

Наступний фрагмент коду є прикладом вузла ROS 2, який використовує локальний інтерфейс навігації для надсилання оновлень 3D-позиції у рамці посилання Північ-Схід-Дон (NED) до PX4:

```cpp
```

## Кілька екземплярів інтерфейсу

Використання кількох екземплярів одного інтерфейсу (напр. локально та локально) для надсилання повідомлень про розрахунок буде передавати всі оновлення до однієї теми і що призведе до перехресної розмови.
Це не повинно впливати на об'єднання вимірювань в EKF, але різні джерела вимірювань стануть нерозрізненними.
