# Припинено: Falcon Vertigo Hybrid VTOL RTF (Dropix)

:::попередження Виробляється
Каркас для польотів з переглядом на місцевості Falcon Venturi FPV Wing, на якому базується ця транспортний засіб, більше недоступний.
:::

*Falcon Vertigo Hybrid VTOL* - це квадропланний літальний апарат VTOL, що був розроблений для роботи з PX4 та керування польотом Dropix (сумісне з Pixhawk). Він може нести невелику камеру GoPro.

Набір RTF містить все необхідне для повної системи, за винятком приймача RC та телеметричного модуля. Компоненти також можуть бути куплені окремо.

Основна Інформація:

- **Каркас:** Falcon Vertigo Hybrid VTOL
- **Контролер польоту:** Dropix
- **Розмах крил:** 1.3м

![Falcon Vertigo Hybrid VTOL RTF](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_complete.jpg)


## Специфікація матеріалів

Майже все необхідне надається в комплекті RTF (посилання поруч з компонентами нижче надаються у випадку, якщо ви бажаєте придбати будь-який компонент окремо):

* Попередньо ламіновані крила з EPP
* Кінчики крил і повне обладнання
* Контролер польоту Dropix (знято з виробництва) з
  * GPS u-blox M8N
  * Датник живлення
  * [Датчик швидкості](https://store-drotek.com/793-digital-differential-airspeed-sensor-kit-.html)
* Чотирьохмоторний набір потужності [Tiger Motor MT-2216-11 900kv V2](https://www.getfpv.com/tiger-motor-mt-2216-11-900kv-v2.html) (виробництва припинено)
* 4 x пропелер 10”x 5” (квадро-мотори)
* 4 x [ESC 25A](http://www.getfpv.com/tiger-motor-flame-25a-esc.html)
* 1 x пропелер 10” x 5” (двигун-штовхач)
* 1 x ESC 30A
* Система потужності двигуна-штовхача
* Вуглецеві труби та кріплення
* Кронштейни для мотора G10
* 1 x [3700mah 4S 30C Lipo акумулятор](https://www.overlander.co.uk/batteries/lipo-batteries/power-packs/3700mah-4s-14-8v-25c-lipo-battery-overlander-sport.html)
* Плата розподілу живлення Dropix та кабель

Набір не постачається з радіоприймачем або (опціональними) модулями телеметрії. Для цієї конфігурації ми використали наступні компоненти:

- Отримувач: [FrSSKY D4R-II](https://www.frsky-rc.com/product/d4r-ii/)
- Телеметрія: [Модулі Holybro 100 мВт 915МГц](https://www.getfpv.com/holybro-100mw-fpv-transceiver-telemetry-radio-set-915mhz.html) (Припинено)


## Необхідні інструменти

Наступні інструменти використовувалися для збирання корпусу повітряного судна:

* Шуруповерт Phillips
* 5.5 мм шестигранник гайковерт
* Кусачки
* 1x паяльник та припій
* Hobby пінцет з нержавіючої сталі
* Клей Gorilla
* Скловолоконна армована стрічка

![Інструменти для створення ПЗ](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_build_tools.jpg)


## Кроки збірки

Набір RTF потребує наступного монтажу.

### Крок 1: Прикріпіть кріплення двигунів

1. Нанесіть клей Gorilla всередину кронштейнів крила, як показано.

   ![Додайте клей на кріплення крила](../../assets/airframes/vtol/falcon_vertigo/wing_brackets_glue.jpg)

1. Вкріпіть карбонову трубку в держаки. Для вирівнювання піддона та трубки слід використовувати білу позначку (як показано на зображенні).

   ::: info
Це дуже важливо, оскільки біла позначка вказує на центр мас.
:::

   <img src="../../assets/airframes/vtol/falcon_vertigo/carbon_tube_in_brackets.jpg" title="Вуглецева труба в дужках" width="300px" />

1. Наступні зображення показують вирівнювання стержнів з інших точок зору:

   ![вирівнювання стержня рами квадрокоптера знизу](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_9_bottom_view_rod_alignment.jpg) ![схема вирівнювання стержня рами квадрокоптера](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_11_rod_alignment_schamatic.jpg)



### Крок 2: Прикріпіть крила

1. Вставте обидві вуглецеві труби в фюзеляж.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_15_fuselage_tubes.jpg" width="500px" title="Вуглецеві труби фюзеляжу" />

1. Нанесіть клей gorilla між двома білими позначками на кожну трубку (вказано червоними стрілками). Білий знак по центру (синя стрілка) буде розміщений в центрі фюзеляжу, а інші знаки - по боках.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_13_rod_apply_glue.jpg" width="500px" title="Нанести клей на важіль" />

1. Після того, як вуглецеві трубки знаходяться всередині фюзеляжу, розподіліть клей gorilla на решту трубки та прикріпіть крила.

1. Фюзеляж має два отвори для кабелів двигуна та сервоприводів. Пропустіть кабелі через отвори, а потім приєднайте крила до фюзеляжу.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_17_fuselage_holes_cables.jpg" width="500px" title="Отвори фюзеляжу для кабелів" />

1. Усередині фюзеляжу під'єднайте сигнальні кабелі, які ви щойно прокинули з крил до регулятора ESC, використовуючи надані роз'єми. Регулятори швидкості ESC вже підключені до двигунів і налаштовані на обертання в правильному порядку (вам потрібно буде підключити ESC PDB до модуля живлення на пізнішому етапі).

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_19_connect_esc_power_and_signal_cables.jpg" width="500px" title="Підключіть кабелі живлення та сигнальні кабелі ESC" />

1. Так само, як і з ESC, сервопристосування вже встановлені. Підключіть сигнальний кабель з крила (проходить через фюзеляж) до контролера польоту.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_21_connect_servo_cables.jpg" width="500px" title="Підключіть кабелі серводвигунів" />

1. Повторіть ці кроки для іньшого крила.

### Крок 3: Підключіть електроніку

Цей комплект включає контролер польоту Dropix з вже підключеною більшістю необхідної електроніки (якщо ви використовуєте інший контролер польоту, сумісний з Pixhawk, підключення схожі).

<img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_23_dropix_and_other_electronics.jpg" width="500px" title="Електроніка Falcon Vertigo" />

::: info Загальну інформацію про підключення Dropix можна знайти в [Контролері польоту Dropix](../flight_controller/dropix.md). :::

#### Підключіть роз'єм живлення ESC та прокладіть кабелі сигналів до контролера польоту

1. Підключіть ЕСС до модуля живлення за допомогою роз'єму XT60

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_25_aileron_esc_connections.jpg" width="500px" title="" />

1. Передайте кабелі сигналів до контролера польоту

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_27_gps_esc_servo_connections.jpg" width="500px" title="GPS, ESC, Підключення серводвигунів" />


#### Підключення двигуна

Проводка двигуна та сервоприводу практично взагалі залежить від вас, але повинна відповідати конфігурації [Загального стандартного VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_standard_vtol), як показано в посиланні на конструкцію корпусу. Геометрія та призначення виводу можуть бути налаштовані в [Конфігурації приводів](../config/actuators.md#actuator-outputs)

Наприклад, ви можете з’єднати його так, як у цьому прикладі (орієнтація як у "сидячи в літаку"):

| Порт   | Підключення                |
| ------ | -------------------------- |
| MAIN 1 | Передній правий мотор, CCW |
| MAIN 2 | Задній лівий мотор, CCW    |
| MAIN 3 | Передній лівий мотор, CW   |
| MAIN 4 | Задній правий мотор, CW    |
| AUX  1 | Лівий елерон               |
| AUX  2 | Правий елерон              |
| AUX  3 | Elevator                   |
| AUX  4 | Rudder                     |
| AUX  5 | Тяга                       |


<a id="dropix_back"></a>

#### Підключення контролера польоту: Мотори, Сервомеханізми, Приймач RC, датчик струму

Нижче показане зображення задньої плати керування польотом dropix, підкреслюючи вихідні контакти для підключення кабелів квадрокоптерних моторів, кабелів сигналу елерону, мотору, дросельного мотору, а також контактів поточного сенсора та введення радіоприймача (RC IN).

<img id="dropix_outputs" src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_33_dropix_outputs.jpg" width="500px" title="Вихідні мотори/серводвигуни Dropix" />

1. Підключіть сигнальні кабелі квадро моторів.

1. Підключіть кабелі елеронів та мотора керування ручкою газу в допоміжні виходи.

1. Підключіть кабель сигналу двигуна дроселя від ESC до відповідного допоміжного порту контролера польоту. Підключіть ESC до регулятора газу.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_37_connect_throttle_motor.jpg" width="500px" title="Підключити дросельний мотор" />

1. Підключіть приймач (RC IN).


<a id="dropix_front"></a>

#### Підключення контролера польоту: телеметрія, датчик швидкості повітря, GPS, сигналізація та перемикач безпеки

Датчикові входи, телеметрія, сигналізація та безпечний вимикач розташовані з переднього боку керування польотом, як показано на схемі підключення нижче.

<img src="../../assets/flight_controller/dropix/dropix_connectors_front.jpg" width="500px" alt="Роз'єми Dropix спереду" title="Роз'єми Dropix спереду" />

1. Підключіть телеметрію, датчик швидкості, GPS, гудок та безпечний перемикач, як показано.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_39_connect_sensors.jpg" width="500px" title="Підключення датчиків" />


#### Контролер польоту: Підключіть модуль живлення та зовнішній USB

Входи для порту USB, модуля живлення та зовнішнього USB розташовані на правому боці контролера польоту.

1. Підключіть живлення та USB, як показано

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_41_connect_power_module_usb.jpg" width="500px" title="Підключення модулів живлення та USB" />

:::tip
Зовнішній USB є необов'язковим.
Він повинен бути використано, якщо доступ до порту USB ускладнений після закріплення контролера польоту.
:::

#### Встановіть пітотрубку (датчик швидкості)

Труба пітота встановлена спереду літака й підключена до датчика швидкості через трубу.

:::warning
Важливо, щоб ніщо не заважало протіканню повітря до труби Піто. Це критично для фіксованих крил та для переходу від квадрокоптера до літака.
:::

1. Встановіть трубку Піто у передній частині літака

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_43_airspeed_sensor_mounting.jpg" width="500px" title="Монтаж датчика швидкості" />

1. Зафіксуйте з'єднуючі трубки та переконайтеся, що вони не зігнуті / пом'яті.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_45_airspeed_sensor_tubing.jpg" width="500px" title="Монтаж датчика швидкості" />

1. Підключіть трубки до датчика швидкості.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_47_connect_airspeed_sensor_tubing.jpg" width="500px" title="Підключіть датчик швидкості та трубопровід" />


#### Встановлення/підключення приймача та модуля телеметрії

1. Вставте приймач та телеметричний модуль на зовнішню сторону рами транспортного засобу.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_49_receiver_mounting.jpg" width="500px" title="Приймач супутникового зв'язку" />

1. Підключіть приймач до роз'єму RC IN *ззаду* плати dropix, як показано вище (дивіться також [інструкції з пілотажного контролера](#dropix_back)).

1. Підключіть модуль телеметрії до *передньої* частини регулятора польоту, як показано нижче (див. інструкції регулятора польоту за посиланням [Літачний контролер інструкції](#dropix_front) для більш детальної інформації про контакти).

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_51_telemetry_module_mounting.jpg" width="500px" title="Вставте модуль телеметрії" />


<a id="compass_gps"></a>

#### Модуль GPS/Компас

Модуль GPS/Компас вже встановлено на крило в типовому положенні. Вам не потрібно робити щось додаткове для цього!

<img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_gps_compass.jpg" width="500px" title="GPS/компас" />


<a id="flight_controller_orientation"></a>

#### Монтаж та орієнтація політного контролера

1. Встановіть орієнтацію вашого політ контролеру на 270 градусів.

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_53_flight_controller_orientation.jpg" width="500px" title="Орієнтація політного контролера" />

1. Закріпіть контролер на місці за допомогою піни для поглинання вібрації.


### Крок 4: Перевірка остаточної збірки

Останнім етапом збирання є перевірка стійкості дрона та правильності налаштування двигунів.

1. Перевірте, що двигуни обертаються у правильних напрямках (як у діаграмі QuadX нижче).

   <img src="../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_35_quad_motor_directions.png" width="200px" title="Порядок/напрямки руху чотирьох моторів" />

   ::: info За необхідності може бути виправлено напрямок серводіви за допомогою прапорця `Rev Range (для серводів)`, пов'язаного із кожним вихідним серводвигуном в конфігурації QGroundControl [Актуаторний вихід](../config/actuators.md#actuator-outputs) (тільки для серводвигунів) (це встановлює параметр [PWM_AUX_REV](../advanced_config/parameter_reference.md#PWM_AUX_REV) або [PWM_AUX_MAIN](../advanced_config/parameter_reference.md#PWM_MAIN_REV)). :::

1. Перевірте, чи транспортний засіб збалансований навколо очікуваного центру мас

   * Утримуйте транспортний засіб пальцями у центрі ваги та переконайтеся, що транспортний засіб залишається стабільним.

      ![Центр мас рівня](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_57_level_centre_of_gravity.jpg)

   * Якщо транспортний засіб нахиляється вперед або назад, перемістіть двигуни, щоб утримати рівновагу.

      ![Рівень моторів](../../assets/airframes/vtol/falcon_vertigo/falcon_vertigo_55_level_motors.jpg)


## Налаштування

Виконайте звичайну [основну настройку](../config/index.md).

Примітки:

1. Для [Airframe](../config/airframe.md) виберіть групу/тип транспортного засобу як *Standard VTOL* та конкретний транспортний засіб як [Generic Standard VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_standard_vtol), як показано нижче.

   ![QCG - Вибір Загального Стандарту VTOL](../../assets/qgc/setup/airframe/px4_frame_generic_standard_vtol.png)

1. Встановіть [Орієнтацію автопілота](../config/flight_controller_orientation.md) на `ROTATION_YAW_270`, оскільки автопілот встановлений [боком](#flight_controller_orientation) відносно передньої частини транспортного засобу. Компас орієнтований вперед, тому ви можете залишити це на типовому значенні (`ROTATION_NONE`).
1. Налаштуйте виводи та геометрію, дотримуючись інструкцій у [Налаштування приводів](../config/actuators.md)
1. За замовчуванням параметри часто достатні для стабільного польоту. Для отримання докладнішої інформації з настройки дивіться [Стандартна Проводка та Налаштування VTOL](../config_vtol/vtol_quad_configuration.md).

Після завершення калібрування, VTOL готовий до польоту.

## Відео

<lite-youtube videoid="h7OHTigtU0s" title="PX4 Vtol test"/>

## Підтримка

Якщо у вас виникли запитання щодо перетворення або конфігурації VTOL, зайдіть на <https://discuss.px4.io/c/px4/vtol>.
