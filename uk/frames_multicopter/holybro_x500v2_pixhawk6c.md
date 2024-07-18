# Holybro X500 V2 + Pixhawk 6C (PX4 Dev Kit)

Ця тема надає повні інструкції для збирання [Комплекту Holybro X500 V2 ARF](https://holybro.com/collections/x500-kits), також відомого як Holybro PX4 Dev Kit.

![The fully built vehicle with props removed](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/kit_no_props.jpg)


## Збірка

:::info
- Зображення в цьому документі можна вибрати, щоб переглянути відео на youtube крок за кроком.
- Кожний розділ перелічує всі необхідні гвинти у верхній частині.
:::

### Навантаження та тримач батареї

**Саморіз**- Закріпний винт M2.5*6 12шт

1. Вставте резинове кільце підвіски-висувки в кожну з їхніх відповідних підвісок. Не використовуйте гострi предмети для натискання резинок всередині.

   [![Assembly1](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly1.png)](https://www.youtube.com/watch?v=4Tid-FCP_aI)

1. Візьміть плату кріплення батареї і закрутіть її за допомогою затискача зі слайдом за допомогою відвірки винта M2.5*6.

   [![Assembly2](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly2.png)](https://youtu.be/9E-rld6tPWQ)

1. Закрутіть 4 вішалки на дошку платформи, використовуючи поглиблену винт M2.5*6.

   [![Assembly3](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly3.png)](https://youtu.be/4qIBABc9KsY))

1. Візьміть зациклювальну планку та вставте 4 вісця, щоб прикрутити до нижньої плати пізніше.

   [![Assembly4](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly4.png)](https://youtu.be/CFx6Ct7FCIc))

1. Зараз вставте тримач батареї та тримачі навантаження, зібрані на кроці 2 & 3


### Модуль живлення

**Шуруп**- Шуруп з шестигранною головкою M2.5*6 8шт | Гайка M3 4шт | Нейлонова опора M3*5 4шт | Шуруп M3*14 4шт

   [![Assembly5](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly5.png)](https://youtu.be/0knU3Q_opEo))

1. Візьміть нижню пластину і вставте 4 гвинти M3*14 та закрутіть нейлонові заглушки на них.

   [![Assembly6](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly6.png)](https://youtu.be/IfsMXTr3Uy4)

1. Розмістіть Планку розподілу живлення та використовуйте гайки-самостопорювачі для їх збирання. Модуль живлення PM02 (для Pixhawk 6C) буде живити цю плату

   [![Assembly7](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly7.png)](https://youtu.be/Qjs6pqarRIY)

1. Use Socket Cap Screws M2.5*6 and screw the bottom plate on the 4 hangers (that we inserted in the 2 bars on the 3rd step of the payload holder assembly)

### Шасі

1. Для збирання станції шасі відкрутіть заздалегідь складені винти шасі - перекрестна стрічка та вставте шасі - вертикальний стовп і затягніть той же.

   [![Assembly8](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly8.png)](https://youtu.be/mU4vm4zyjcY)

   [![Assembly9](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly9.png)](https://youtu.be/7REaF3YAqLg)

1. Використовуйте Гвинт кришки розетки M3*8, щоб прикрутити посадкові шасі до нижньої пластини

   [![Assembly11](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly11.png)](https://youtu.be/iDxzWeyCN54)

   [![Assembly12](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly12.png)](https://youtu.be/3fNJQraCJx0)


Оскільки важко вставити проводи після того, як верхня плита складена, зробіть проводку заздалегідь. Хоча дизайн добре спроектований таким чином, що ви зможете зробити це пізніше також.

[![Assembly13](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly13.png)](https://youtu.be/3en4DlQF4XU)

### Потужність

Pixhawk 6C запитується за допомогою плати живлення PM02 (у цьому випадку). Цей модуль живлення постачається від батареї (4S 16.8V 5200 мАг)

Двигуни живляться через розподільчу дошку живлення, як показано на наведеній нижче схемі.

![motors_pdb_pixhawk6c](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/motors_pdb_pixhawk6c.png)

Зверніть увагу, що роз'єми ESC мають кольорову кодировку і повинні бути вставлені в PWM out так, що білий кабель зверху.

![esc_connector_pixhawk6c](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/esc_connector.jpg)


### Зброя

**Винт-** болт з гніздовою головкою M3*38 16шт | Фланцева гайка M3 16шт

[![Assembly14](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly14.png)](https://youtu.be/66Hfy6ysOpg)

1. Поставити руки досить просто, оскільки двигуни поставляються вже зібраними.
   - Переконайтесь, що у вас є правильна пронумерована рука з мотором на відповідному боці.

   [![Assembly15](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly15.png)](https://youtu.be/45KCey3WiJ4)

   :::tip
Використовуйте свої ключі аллен / будь-який витягнутий предмет і вставте його на протилежний бік болта, який ви намагаєтеся закрутити.
:::

1. Возьміть одну руку та вставте прямокутний виступ всередину прямокутного порожнини на нижній плиті.

   [![Assembly16](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly16.png)](https://youtu.be/GOTqmjq9_3s)

1. Під час встановлення верхньої пластини поверх цієї 3-шарової конструкції (нижня пластина, верхня пластина і плечі) необхідно закрутити гвинтом з шестигранною головкою M3*38 та гайкою з фланцем M3.
1. Утримуйте одну сторону, використовуючи міні-гайковий ключ, який надається у розробницькому комплекті.

   [![Assembly17](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly17.png)](https://youtu.be/2rcNVekJQd0)

1. Не зав'язуйте жодних болтів, поки всі 3 мотори не будуть на місці, оскільки це може зробити складним збирання 3-го та 4-го моторів.

   [![Assembly18](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly18.png)](https://youtu.be/SlKRuNoE_AY)

### Пропелери

[![Assembly19](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly19.png)](https://youtu.be/yu75VkMaIyc)

- Нижня пластина вказує напрямок двигуна.
- Пропелери, які мають біле/сріблясте покриття, йдуть на відповідний двигун із подібним покриттям.
- Розблокування та блокування пропелера вказано на самому пропелері.
- Використовуйте 4 пропелери та вставте їх у мотори, пам’ятаючи про 3 пункти вище.

Наступні частини можна розмістити, як завжди.

### GPS

**Гвинт-** гайка M3 4 шт | Гвинт М3*10 4шт


1. Зберіть GPS, дотримуючись відео.

   [![Assembly20](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly20.png)](https://youtu.be/aiFxVJFjlos)

   У цьому посібнику використовується місце кріплення GPS, запропоноване в посібнику Holybro.
1. Прикрутіть нижній кінець кріплення GPS до тримача корисного навантаження за допомогою гайки M3 та гвинта М3*10

   [![Assembly21](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly21.png)](https://youtu.be/uG5UKy3FrIc)

### Pixhawk 6C

- Дріт від PM02 йде до POWER1 в Pixhawk
- Телеметрія йде на TELEM1
- GPS до GPS1

[![Assembly22](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/assembly22.png)](https://youtu.be/wFlr_I3jERQ)

### Супутній комп'ютер (необов'язково)

**Гвинт-** Socket Cap Screw M2.5*12 4pcs | Nylon Standoff M2.5*5 4pcs Locknut M2.5 4pcs

Набір X500 забезпечує місце для супутнього комп'ютера, такого як Raspberry Pi або Jetson nano, що можуть бути розміщені тут [TBD].
- Вставте 4 гвинти з головкою M2.5*12 та поставте штифти на те ж саме місце.
- Тепер розмістіть супутній комп'ютер і змонтуйте його, використовуючи гайку з фіксацією M2.5

### Камера

- Камери, такі як камера глибини / відстеження Intel Realsense або Structure Core, можна встановити за допомогою кріплення для Depth Camera
- Просто вставте кріплення всередину 2-х планок і використовуйте гвинти залежно від камери, яку ви використовуєте.

![payloads_x500v2](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk6c/payloads_x500v2.png)


## Встановлення/Налаштування PX4

:::tip
Повні інструкції щодо встановлення та налаштування PX4 можна знайти в [Базова конфігурація](../config/index.md).
:::

*QGroundControl* використовується для встановлення автопілота PX4 та його налаштування / відладки для рами X500. [Завантажте та встановіть](http://qgroundcontrol.com/downloads/) *QGroundControl* для вашої платформи.

Спочатку оновіть прошивку, раму та зіставлення актуаторів:

- [Прошивка](../config/firmware.md)
- [Рама](../config/airframe.md)

  Вам потрібно буде вибрати раму *Holybro X500 V2* (**Квадрокоптер x > Holybro 500 V2**)

  ![QGroundControl - Select HolyBro 500 airframe](../../assets/airframes/multicopter/x500_v2_holybro_pixhawk5x/x500v2_airframe_qgc.png)

- [Актуатори](../config/actuators.md)
  - Вам не потрібно оновлювати геометрію апарту (оскільки це попередньо сконфігурована рама).
  - Призначте функції приводу до актуаторів, щоб відповідати вашому підключенню. Рама попередньо налаштована з моторами на **FMU PWM Out**.
  - Перевірте конфігурацію, використовуючи слайдери.

Потім виконайте обов'язкове налаштування / калібрування:

- [Орієнтація сенсора](../config/flight_controller_orientation.md)
- [Компас](../config/compass.md)
- [Акселерометр](../config/accelerometer.md)
- [Калібрування рівня горизонту](../config/level_horizon_calibration.md)
- [Налаштування радіо](../config/radio.md)
- [Режими польоту](../config/flight_mode.md)

В ідеалі ви також повинні зробити:

- [Калібрування ESC](../advanced_config/esc_calibration.md)
- [Регулювання оцінки заряду акумулятора](../config/battery.md)
- [Загальна безпека](../config/safety.md)


## Вдосконалення

Вибір рами встановлює параметри автопілота *за замовчуванням* для рами. Вони достатньо хороші для польоту, але гарною ідеєю є тюнінг параметрів для конкретної конструкції рами.

For instructions on how, start from [Auto-tune](../config/autotune_mc.md).


## Подяки

Цей журнал збірки був наданий Акшата та Хамішем Віллі з великими подяками компанії Holybro та Dronecode за апаратне забезпечення та технічну підтримку.