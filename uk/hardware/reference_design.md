# Проектування контролера польоту PX4

Референсний дизайн PX4 - це серія польотних контролерів [Pixhawk](../flight_controller/pixhawk_series.md). Спочатку випущений у 2011 році, цей дизайн зараз на своєму 5-му [поколінні](#reference_design_generations) (десяте покоління дошки знаходиться в процесі розробки).

## Сумісність з бінарним кодом

Всі плати, виготовлені за певним дизайном, мають бути сумісними з двійковим кодом (тобто можуть запускати ту ж саму прошивку). З 2018 року ми будемо надавати набір тестів для перевірки бінарної сумісності, який дозволить нам перевірити та сертифікувати цю сумісність.

Покоління FMU 1-3 були розроблені як відкрите обладнання, тоді як покоління FMU 4 та 5 надали лише специфікації роз'ємів та живлення (схеми були створені окремими виробниками). Для кращої сумісності, починаючи з FMUv6 і пізніше, буде використано повний модельний референтний дизайн.

<a id="reference_design_generations"></a>

## Reference Design Generations

- FMUv1: Development board \(STM32F407, 128 KB RAM, 1MB flash, [schematics](https://github.com/PX4/Hardware/tree/master/FMUv1)\) (no longer supported by PX4)
- FMUv2: Pixhawk \(STM32F427, 168 MHz, 192 KB RAM, 1MB flash, [schematics](https://github.com/PX4/Hardware/tree/master/FMUv2)\)
- FMUv3: Pixhawk variants with 2MB flash \(3DR Pixhawk 2 \(Solo\), Hex Pixhawk 2.1, Holybro Pixfalcon, 3DR Pixhawk Mini, STM32F427, 168 MHz, 256 KB RAM, 2 MB flash, [schematics](https://github.com/PX4/Hardware/tree/master/FMUv3_REV_D)\)
- FMUv4: Pixracer \(STM32F427, 168 MHz, 256 KB RAM, 2 MB flash, [pinout](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\)
- FMUv4 PRO: Drotek Pixhawk 3 PRO \(STM32F469, 180 MHz, 384 KB RAM, 2 MB flash, [pinout](https://docs.google.com/spreadsheets/d/1raRRouNsveQz8cj-EneWG6iW0dqGfRAifI91I2Sr5E0/edit#gid=1585075739)\)
- FMUv5: Holybro Pixhawk 4 \(STM32F765, 216 MHz, 512 KB RAM, 2 MB flash, [pinout](https://docs.google.com/spreadsheets/d/1-n0__BYDedQrc_2NHqBenG1DNepAgnHpSGglke-QQwY/edit#gid=912976165)\)
- FMUv6: work in progress, final name TBD, variant 6s \(STM32H7, 400 MHz, 2 MB RAM, 2 MB flash\) and variant 6i \(i.MX RT1050, 600 MHz, 512 KB RAM, external flash\)

## Розподіл функцій основної / ввід-вивідної функції

Діаграма нижче показує розподіл обов'язків автобуса та функціональних відповідальностей між платами FMU та I/O в контролері польоту серії Pixhawk (плати вбудовані в один фізичний модуль).

![PX4 Main/IO Functional Breakdown](../../assets/diagrams/px4_fmu_io_functions.png)

<!-- Draw.io version of file can be found here: https://drive.google.com/file/d/1H0nK7Ufo979BE9EBjJ_ccVx3fcsilPS3/view?usp=sharing -->

Деякі контролери серії Pixhawk будуються без плати введення-виведення для зменшення розміру або складності, або для кращого вирішення певних сценаріїв використання плати. У цьому випадку І/O драйвер не запущений.

:::info Виробник варіантів польотного контролера без плати введення/виведення часто називають "зменшеною" версією тієї, яка включає плату I/O: наприклад, _Pixhawk 4_ **Міні**_, \_CUAV v5 **нано**_.
:::

Побудовані цілі, які повинні працювати на контролерах польоту з платою вводу/виводу, картують виходи FMU на `AUX`, а виходи введення/виводу на `MAIN` (див. діаграму вище). Якщо ціль запускається на обладнанні, де відсутня або вимкнена плата вводу-виводу, вихідні сигнали головних ШШ не будуть присутні. Можливо, ви побачите це, наприклад, запустивши `px4_fmu-v5_default` на [Pixhawk 4](../flight_controller/pixhawk4.md) (з IO) та [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) (без IO).

:::warning
На [Pixhawk 4 Mini](../flight_controller/pixhawk4_mini.md) це призводить до неспівпадіння між екранованим написом `MAIN` на пульті управління кольорової літальної апаратури та шини `AUX`, яка відображається під час [Конфігурації приводів](../config/actuators.md). :::info якщо ціль збірки призначена виконуватися лише на контролері польоту, який не має вводу/виводу, тоді вихідні FMU відображаються на `MAIN` (наприклад, ціль `px4_fmu-v4_default` для [Pixracer](../flight_controller/pixracer.md)).

Вихідні PWM PX4 відображені на порти `MAIN` або `AUX` у [Конфігурації Приводів](../config/actuators.md).
