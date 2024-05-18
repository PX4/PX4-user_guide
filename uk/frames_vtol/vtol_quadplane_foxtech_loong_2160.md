# Foxtech Loong 2160 VTOL

Foxtech Loong 2160 VTOL - це легкий у монтажі майже готовий до польоту (ARF) квадрокоптерний ВТОЛ дрон з розмахом крила 2160 мм.
Цей посібник зі збірки показує, як додати систему керування польотом, використовуючи набір оцінки [Auterion Skynode evaluation kit](../companion_computer/auterion_skynode.md) або [Pixhawk 6C](../flight_controller/pixhawk6c.md), і налаштувати PX4.

![Фото Loong VTOL у польоті](../../assets/airframes/vtol/foxtech_loong_2160/01-foxtech-loong.jpg)

## Загальний огляд

Специфікації:

- Розмах крила: 2160 мм
- Довжина фюзеляжу: 1200 мм
- Вага при зльоті: Приблизно 7 кг (без вантажу)
- Максимальний час польоту: До 1 години і 30 хвилин
- Крейсерська швидкість: Приблизно 17 м/с
- Максимальна вага вантажу: Близько 1,5 кг
- Розміри чохла: 125 см х 34 см х 34 см

Основні характеристики:

- Легка збірка: Швидке і просте налаштування
- Переносимість: Компактний дизайн для зручного транспортування у включеному чохлі
- Готовий до польоту: Всі приводи вже встановлені та підключені, що мінімізує час налаштування
- Подовжений час польоту: До 1 години і 30 хвилин в залежності від погодних умов та ваги при зльоті
- Універсальна вантажопідйомність: Просторий фюзеляж вміщує різноманітні вантажі, включаючи варіанти, такі як камера Sony A7R для картографічних застосувань.

## Де купити

- [Foxtech FPV (ARF Combo)](https://www.foxtechfpv.com/foxtech-loong-2160-vtol.html) - рекомендується
- [Alibaba](https://www.alibaba.com/product-detail/Loong-2160-Long-Endurance-VTOL-Mapping_1600280686653.html)

## Політний контролер

Наступна конфігурація протестована:

- [Auterion Skynode evaluation kit](../companion_computer/auterion_skynode.md)
- [Pixhawk 6C](../flight_controller/pixhawk6c.md)

## Додаткові ресурси

- Auterion 12S Power Module
- [Модуль живлення Holybro PM08D (альтернатива Auterion PM)](https://holybro.com/collections/power-modules-pdbs/products/pm08d-digital-power-module-14s-200a)
- [GPS F9P (включено в Skynode оціночний. комплект)](../gps_compass/rtk_gps_holybro_h-rtk-f9p.md)
- [GPS M9N (дешевша альтернатива F9P)](../gps_compass/rtk_gps_holybro_h-rtk-m8p.md)
- [Датчик швидкості (включено в Skynode eval. kit)](https://www.dualrc.com/parts/airspeed-sensor-sdp33) — рекомендований для покращення безпеки та продуктивності
- [Датчик швидкості (дешевший альтернативний варіант)](https://holybro.com/products/digital-air-speed-sensor?pr_prod_strat=use_description\&pr_rec_id=236dfda00\&pr_rec_pid=7150470561981\&pr_ref_pid=7150472462525\&pr_seq=uniform)
- [Lidar Lightware lw20-c (включено в Skynode eval. kit)](../sensor/sfxx_lidar.md) (Необов'язково)
- [Інфрачервоний сенсор вимірювання відстані Seeed Studio PSK-CM8JL65-CC5 (дешевший аналог)](https://www.seeedstudio.com/PSK-CM8JL65-CC5-Infrared-Distance-Measuring-Sensor-p-4028.html) (Опціонально)
- [Радіо (RC) система](../getting_started/rc_transmitter_receiver.md) на ваш вибір
- [Наземна станція та радіо зв'язок](https://holybro.com/collections/rc-radio-transmitter-receiver/products/skydroid-h12?variant=42940989931709)
- [Розширення кабеля USB-C](https://www.digitec.ch/en/s1/product/powerguard-usb-c-usb-c-025-m-usb-cables-22529949?dbq=1\&gclid=Cj0KCQjw2cWgBhDYARIsALggUhrh-z-7DSU0wKfLBVa8filkXLQaxUpi7pC0ffQyRzLng8Ph01h2R1gaAp0mEALw_wcB\&gclsrc=aw.ds)
- [Розгалужувач I2C](https://www.3dxr.co.uk/autopilots-c2/the-cube-aka-pixhawk-2-1-c9/cube-cables-accessories-sensors-c15/cubepilot-i2c-can-splitter-jst-gh-4pin-p2840)
- [Монтажі, виготовлені на 3D-принтері](https://github.com/PX4/PX4-user_guide/raw/main/assets/airframes/vtol/foxtech_loong_2160/loong-3d-prints.zip)
  - 1x Базова плита
  - 1x Stack-fixture
  - 1x Кріплення вентилятора
  - 1x Монтаж радіо
  - 1x Верхня плита
  - 1x Адаптер радіоантени
  - 1x USB-C Holder 1
  - 1x USB-C Holder 2
- [Монтаж вставних гвинтових вкладень](https://cnckitchen.store/products/gewindeeinsatz-threaded-insert-set-standard-200-stk-pcs)
- [XT30 роз'єми](https://www.amazon.com/Connectors-Female-Pieces-Shrink-Battery/dp/B0875MBLNH/ref=sr_1_1?keywords=xt30+connector\&qid=1700643604\&sr=8-1)
- [Div. Screws](https://de.aliexpress.com/item/1005005999729125.html?spm=a2g0o.productlist.main.1.7fe0c7fcvInMsM\&algo_pvid=2e5373e9-747f-4a28-9739-cd59d05d64f1\&aem_p4p_detail=202311220106396068090130108300006423842\&algo_exp_id=2e5373e9-747f-4a28-9739-cd59d05d64f1-0\&pdp_npi=4%40dis%21CHF%2114.42%213.72%21%21%2116.01%21%21%402101f04d17006439995917563eeeb0%2112000035246480339%21sea%21CH%210%21AB\&curPageLogUid=24AixvgVOlG3\&search_p4p_id=202311220106396068090130108300006423842_1)
- [Кабельні стяжки-затискачі](https://www.amazon.com/Superun-Cable-Tie-Kit-Assorted/dp/B07TMKJP5S/ref=sr_1_2?crid=968Z3XJK9N3J\&keywords=zip%2Bties%2Bset\&qid=1700644053\&sprefix=zip%2Bties%2Bset%2Caps%2C155\&sr=8-2\&th=1)
- [Кабель продления антенны - соответствует вашей радиосистеме](https://www.digikey.ch/de/products/detail/amphenol-rf/095-902-536-012/13246174)
- [Рекомендована батарея (12S 22Аг)](https://genstattu.com/tattu-22-2v-30c-6s-22000mah-lipo-battery-with-xt90-s-plug-for-uav.html)

## Інструменти

Наступні інструменти використовувалися для цієї збірки.

- Набір гофроксена
- Набір гаєчних ключів
- [Станція для паяння](https://www.amazon.com/UY-CHAN-Programmable-Pocket-size-Soldering/dp/B07G71CKC4/ref=sr_1_7?crid=2S2XK6363XRDF\&keywords=ts+80+soldering+iron\&qid=1700644208\&sprefix=ts+80%2Caps%2C151\&sr=8-7)
- Клей: гарячий клей, 5 хв епоксидка
- Ізострічка
- Двостороння стрічка 3M ([стрічка 3M VHB](https://www.amazon.in/3M-VHB-Tape-4910-Length/dp/B00GTABM3Y))
- 3D-принтер
- [Синій Loctite](https://www.amazon.com/Loctite-Heavy-Duty-Threadlocker-Single/dp/B000I1RSNS?th=1)

## Інтеграція з обладнанням

У цій документації описано інтеграцію Auterion Skynode.
Встановлення Pixhawk можна виконати аналогічно.

### Підготовка

### Авіонічний блок

![Повна збірка стеку](../../assets/airframes/vtol/foxtech_loong_2160/02-stack.png)

#### Підготуйте деталі, надруковані на 3D-принтері

:::info
Використовуйте паяльник, щоб натиснути різьбові вкладки в надруковані деталі 3D.
:::

1. Вставте 10x різьбових вкладок M3 в піддон, як показано на малюнку:

   ![Основна плита з різбленими вставками](../../assets/airframes/vtol/foxtech_loong_2160/03-baseplate.jpg)

2. Вставте 2x різьбові вставки M3 в пристрій для накладання, як показано на зображенні нижче:

   ![Фіксатор стекла з нарізними вкладками](../../assets/airframes/vtol/foxtech_loong_2160/04-stack-fixture.jpg)

3. Вставте 2x різьбові вкладки M4 в кріплення вентилятора та кріплення радіо, як показано на малюнку нижче.

   ![Кріплення радіо](../../assets/airframes/vtol/foxtech_loong_2160/05-radio-mount.jpg)

   Якщо ви хочете додати 40-мм вентилятор з напругою 5 В на кріплення вентилятора, вставте 4x вставки M3.

   ![Fan-mount](../../assets/airframes/vtol/foxtech_loong_2160/06-fan-mount.jpg)

4. Змініть кабельний роз'єм на роз'єм для сервоприводу, щоб його можна було вставити в шину сервоприводу для живлення.

   ::: info
   Можливо знадобиться вентилятор, якщо використовується потужне радіо.

:::

   ![Кріплення вентилятора](../../assets/airframes/vtol/foxtech_loong_2160/07-fan-mount.jpg)

5. Вилучіть оригінальну кронштейнну пластину з автомобіля.
   Приклейте кабелі до зовнішньої частини фюзеляжу.

   ![Порожнє фюзеляж](../../assets/airframes/vtol/foxtech_loong_2160/08-preparations.jpg)

6. Перемістіть підставку в транспортний засіб.

7. Закрутіть кріплення стопора до основної плити та позначте місце розташування кріплення стопора стрічкою або ручкою.

8. Вилучіть частини з фюзеляжу та склейте кріплення стопки на місце за допомогою гарячого клею.

![Mounting stack fixture](../../assets/airframes/vtol/foxtech_loong_2160/09-stack-fixure.jpg)

### Модуль потужністю 40A

Модуль живлення 40A забезпечує живлення для авіоніки при використанні Skynode (і поставляється із комплектом оцінки Skynode):

1. Вилучіть корпус з 40A PM.
2. Зафіксуйте ПМ з 2x M2x6mm до нижньої пластини.
3. Створіть кабель для подовження роз'єму XT60 до XT30, який закріплений на базовій платі.
   З цим, живлення від акумулятора 6S може бути підключено безпосередньо до роз'єму XT30 за допомогою попередньо налаштованого кабелю, що поставляється з транспортним засобом.

   ![Встановлення модуля живлення 40A](../../assets/airframes/vtol/foxtech_loong_2160/10-40a-power-module.jpg)

Якщо потрібно, вихід 10V з радіопорту на PM також може бути викладений через XT30, який може бути встановлений поруч зі входом батареї 6S XT60.

### Датчики (сенсори)

#### Трубка Піто

1. Датчик може бути встановлений за допомогою 2x винтів M3x16мм в передньому правому куті підставки.
   Піклуйтесь, щоб конектор був звернутий у бік центру фюзеляжу.

   ![Встановлений датчик швидкості повітря](../../assets/airframes/vtol/foxtech_loong_2160/11-airspeed-sensor.jpg)

   Лише передню трубу (не так, як показано на картинці) використовується; іншу трубу можна видалити, оскільки наш досвід показав, що тиск всередині фюзеляжу достатній як статичний тиск.

2. Коли стек встановлено всередині фюзеляжу, труба, що йде з крила, та труба, що йде з датчика швидкості повітря, повинні бути з'єднані разом.
   Використовуйте трохи слини (це найлегший спосіб) щоб з'єднати їх разом, а потім використовуйте термоусадочну трубку, щоб посилити з'єднання.

   :::warning
   Використовуйте джерело тепла обережно, оскільки піна починаєтся танути при високих температурах.

:::

#### Лідар

:::info
Лідар є рекомендованим!
Якщо лідар не встановлено, ви повинні вимкнути використання дії фіксованого крила в режимі утримання для прискорення вперед (встановіть [VT_FWD_THRUST_EN](../advanced_config/parameter_reference.md#VT_FWD_THRUST_EN) на `0` замість `1`).
:::

1. Позначте місце для встановлення лідару за допомогою скотчу або ручки.
   Виріжте отвір всередині оболонки з ПВХ та піни, щоб лідар вміщувався на місце.

   ![Підготоване отвір лідару](../../assets/airframes/vtol/foxtech_loong_2160/12-lidar-01.jpg)

2. Закріпіть лідар з гарячим клеєм.

   ![Встановлений лідар](../../assets/airframes/vtol/foxtech_loong_2160/13-lidar-02.jpg)

#### GPS/компас

1. Використовуйте двосторонній скотч для кріплення GPS на задній частині транспортного засобу під задньою засувкою.

   ![Встановлений GPS](../../assets/airframes//vtol/foxtech_loong_2160/14-gps.jpg)

   Стрілка на GPS для орієнтації може бути проігнорована.
   Орієнтацію буде визначено під час калібрування автопілота.

### Політний контролер

Встановіть на базову платформу або Pixhawk, або Skynode.

#### Pixhawk 6c/6c mini

1. Використовуйте двосторонню стрічку для кріплення контролера польоту до базової платформи.

#### Skynode

1. Використовуйте 4x гвинти M3x8 для кріплення Skynode до підстави.
   Переконайтеся, що верхня частина "A" спрямована вперед транспортного засобу.
2. Вставте 40-амперний модуль живлення в верхній з двох роз'ємів живлення.
3. Вставте один (або якщо потрібно, два) USB адаптери в 4-контактні роз'єми JST-GH на задній частині Skynode та прокладіть їх до передньої панелі.
   Виправте кабелі за допомогою хомутів-ґудзиків на місці.
4. Приклейте розгалужувач I2C до правої передньої сторони підставки (Розгалужувач може бути використаний для підключення пристроїв ETH, таких як радіозв'язок.)
5. Підключіть розгалужувач I2C до порту ETH на задній панелі Skynode.
6. Вставте два 40-контактних кабелі у передню частину Skynode.
7. Підключіть USB-C кабель подовження та згинайте його впереду.
   Згин повинен бути дуже тугим, щоб пластина влізла в дрон.

![Встановлений Skynode](../../assets/airframes/vtol/foxtech_loong_2160/15-skynode.jpg)

#### Плати адаптерів

1. Закрутіть до верхньої пластини плати адаптерів Pixhawk.

### Антени та RC приймач

1. Приклейте антени Skynode LTE до боку фюзеляжу, як показано на зображенні:

   ![Антени LTE](../../assets/airframes/vtol/foxtech_loong_2160/16-lte-antennas.jpg)

2. Якщо ви використовуєте модуль радіотелеметрії, ви можете встановити антени на верх фюзеляжу.
   Зверху ви можете прямо встановити кабель подовження антени.

   ![WIFI-Антени-Фронтальні](../../assets/airframes/vtol/foxtech_loong_2160/17-antenna-front.jpg)

   На задній частині ви можете використовувати адаптер антени з використанням технології 3D-друку.
   Адаптер можна склеювати на місці гарячим клеєм.

   ![Задня WIFI антена](../../assets/airframes/vtol/foxtech_loong_2160/19-rear-antenna.jpg)

### Модуль потужності 12S

Цей модуль живлення 12S є основним модулем живлення для двигунів.
Цей блок може витримувати більше струму, ніж блок живлення потужністю 40A, що використовується для живлення авіоніки, і потрібен, оскільки Loong використовує до 120A у фазі зависання.

Модуль живлення 12S буде встановлено на верхній частині батареї.
Підключіть XT90, який встановлений всередині транспортного засобу, до PM.
Потрібно подовжити кабель живлення для підключення до Skynode.
Це необхідно для отримання показників батареї з блоку живлення.

Модуль живлення може бути використаний як резервна для Skynode на 5В.

![12S-Power-Module](../../assets/airframes/vtol/foxtech_loong_2160/18-12s-power-module.jpg)

### Збірка

Кроки зборки:

1. Перемістіть підставку в транспортний засіб.
2. Вставте LTE-антени в Skynode.
3. Закрутіть кріплення вентилятора та радіо на базову пластину.
4. Зсуньте основну пластину назад і закрутіть її на фіксатор стопки.
5. Поставте верхню плиту на верх стека та прокладіть 40-контактні кабелі від Skynode через дві отвори перед платами адаптерів Pixhawk.
6. Впевніться, що підключите верхній з'єднувач до плати адаптера, на якій є вхід 'GPS1'.

Вставте приводи в адаптерну плату Pixhawk у такій послідовності:

MAIN:

1. Мотор
2. Порожній, або вентилятор, якщо встановлено
3. Правий ельєрон
4. Лівий ейлерон
5. Правий руль висоти
6. Лівий руль висоти
7. Кермо

AUX:

1. Мотор правий передній
2. Мотор лівий задній
3. Мотор лівий передній
4. Мотор правий задній

Якщо ви бажаєте підключити приводи до різних виходів, вам потрібно буде змінити відображення виходів приводу (див. [Конфігурацію приводу](../config/actuators.md)).

## Налаштування програмного забезпечення

### Вибір планера

1. Відкрийте QGC, виберіть значок **Q**, а потім виберіть **Налаштування транспортного засобу**.
2. Виберіть вкладку [Airframe](../config/airframe.md)
3. Виберіть [Generic Standard VTOL](../airframes/airframe_reference.md#vtol_standard_vtol_generic_standard_vtol) з групи _Standard VTOL_ а потім клікніть **Apply and Restart**.

### Завантажте файл параметрів

Далі ми завантажуємо [файл параметрів](https://github.com/PX4/PX4-user_guide/raw/main/assets/airframes/vtol/foxtech_loong_2160/loong.params), який містить параметри, що визначають геометрію каркасу, відображення виводів та значення настройки - тож вам не потрібно!
Якщо ви вже дотримувалися інструкцій щодо підключення моторів, вам, ймовірно, не знадобиться багато подальшої конфігурації, окрім калібрування сенсорів та фіксація обтискань.

Щоб завантажити файл:

1. Завантажте [файл параметрів](https://github.com/PX4/PX4-user_guide/raw/main/assets/airframes/vtol/foxtech_loong_2160/loong.params).
2. Виберіть вкладку [Параметри](../advanced_config/parameters.md#finding-updating-parameters), а потім натисніть на **Tools** в правому верхньому кутку.
3. Виберіть **Завантажити з файлу**, а потім виберіть файл `loong.params`, який ви щойно завантажили.
4. Перезапустіть транспортний засіб.

### Вибір датчика

- Якщо [Lidar Lightware lw20-c (включено в Skynode eval. kit)](../sensor/sfxx_lidar.md) використовується, потрібно встановити [SENS_EN_SF1XX](../advanced_config/parameter_reference.md#SENS_EN_SF1XX) на 6 (SF/LW/20c).
- Впевніться, що обраний правильний датчик швидкості.
  Якщо ви використовуєте рекомендований [датчик швидкості SDP33](https://www.dualrc.com/parts/airspeed-sensor-sdp33), зміни не будуть потрібні, оскільки [SENS_EN_SDP3X](../advanced_config/parameter_reference.md#SENS_EN_SDP3X) увімкнено (встановлено на `1`) в файлі параметрів.

### Калібрування датчика

Спочатку переконайтеся, що встановлено [правильну орієнтацію контролера політної системи](../config/flight_controller_orientation.md).
Це має бути значенням за замовчуванням (`ROTATION_NONE`).

Потім калібруйте основні сенсори:

- [Компас](../config/compass.md)
- [Гіроскоп](../config/gyroscope.md)
- [Акселерометр](../config/accelerometer.md)
- [Швидкість](../config/airspeed.md)

### RC-Установка

[Відкалібруйте ваш RC Controller](../config/radio.md) та налаштуйте [перемикач режиму польоту](../config/flight_mode.md).

Ми рекомендуємо вам призначити RC перемикачі для набору режимів, визначених у [Flight Mode Configuration > What Flight Modes and Switches Should I Set?](../config/flight_mode.md#what-flight-modes-and-switches-should-i-set).
Зокрема, ви повинні призначити _VTOL Transition Switch_, _Kill Switch_ та перемикач для вибору [Режиму стабілізації](../flight_modes_fw/stabilized.md) та [Режиму позиціювання](../flight_modes_fw/position.md).

### Actuator Setup and ESC Calibration

:::warning
Make sure the props are removed!
The motors are easy to start in the actuators tab by accident.
:::

Motors, control surfaces, and other actuators are configured in the QGroundControl [Actuator Configuration & Testing](../config/actuators.md).

The [parameter file](#load-parameters-file) loaded previously means that this screen should already be correctly setup: you just need to adjust the trims for your particular vehicle.
If motors/servos were connected to different outputs than suggested, you will need to change the output to function mappings in the actuator output section.

To calibrate the ESC's power up the vehicle with the wings not connected and go into the **Actuators** tab in QGC.
Enable motor test and side the slider for Motor you would like to calibrate up to the maximum.
Plug the wings into the fuselage and wait until the beeb-sequence if finished (ca. 5s).
Then side the slider to the minimum.

#### Control Surfaces

Check if the actuators need to be reversed using the RC-Controller:

- Switch into [Manual mode](../flight_modes_fw/stabilized.md)
- Roll stick to the right.
  The right aileron should go up, left aileron should go down.
- Pitch stick to the back (fly upwards).
  Both V-tail surfaces should move up.
- Yaw stick to the right.
  Both surfaces should move to the right

Now adjust the trim value so that all the surfaces are in neutral position.

![Servo trim](../../assets/airframes/vtol/omp_hobby_zmo_fpv/servo_trim.png)

#### Motor Direction and Orientation

Arm the vehicle with the propellers still detached in [Stabilized mode](../flight_modes_fw/stabilized.md).
Check that all the quad-motors spin with a similar low idle speed and verify that the direction is correct.
Check the following reactions:

- Roll stick to the right.
  The left two motors should spool up
- Roll stick to the back.
  The front two motors should spool up
- Yaw stick to the right.
  Front right and rear left motor should spool up

:::info
increase the throttle a bit if you can't see a reaction since [Airmode](../config_mc/pid_tuning_guide_multicopter.md#airmode-mixer-saturation) is not enabled for the yaw axis.
:::

## First Flight

- Mount the propellers (use blue Loctite for the screws).
- Check center of gravity (GG).
  To check the CG lift the vehicle with two fingers up at the latches that connect the wing.
  The vehicle should balance horizontally.
  If the vehicle tips to either the tail or to the nose then you need to move the battery into the opposite direction.
  If you are not able to balance the vehicle with this method you will need to reposition some components or add weight to balance the vehicle.
- Check actuator orientations and neutral trim
- Check control surface reactions in [Stabilized mode](../flight_modes_fw/stabilized.md).
  Switch the vehicle into forward flight mode.
  - Roll the vehicle to the right.
    The right aileron should go down.
    The left aileron should go up.
  - Pitch the vehicle up (nose up).
    Both elevons should go down.
  - Yaw the vehicle to the right (nose to the right).
    Both elevons should go to the left.
- If a [kill-switch](../config/safety.md#kill-switch) is used, make sure it's working properly and will not be activated accidentally in flight!
- Arm in [Stabilized mode](../flight_modes_fw/stabilized.md) and check if motors respond to the commands, e.g. roll left increases throttle on the right motor
- Takeoff in [Stabilized mode](../flight_modes_fw/stabilized.md) and make some basic maneuvers
- If everything went without any issue, takeoff in [Position mode](../flight_modes_fw/position.md) and do a transition at around 50m.
  If something goes wrong switch back to multicopter mode as fast as possible (using the transition switch).
