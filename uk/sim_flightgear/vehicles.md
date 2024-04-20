# Літальні апарати FlightGear

:::warning
Цей симулятор [підтримується та утримується спільнотою](../simulation/community_supported_simulators.md). Це можуть працювати або не працювати з поточними версіями PX4.

Дивіться [Встановлення інструментарію](../dev_setup/dev_env.md) для отримання інформації про середовища та інструменти, які підтримуються основною командою розробників.
:::

Цей розділ перераховує/показує рухомі засоби, що підтримуються PX4 симуляцією [FlightGear](../sim_flightgear/index.md), та команди `make` необхідні для того щоб їх запустити (команди запускаються з термінала в директорії **PX4-Autopilot**). Підтримувані типи: літак, автогир та ровер (існують конкретні рамки в межах цих типів).

:::tip
Для повного списку цілей збірки запустіть `make px4_sitl list_vmd_make_targets` (і відфільтруйте ті, що починаються з `flightgear_`).
:::

:::info Сторінка [FlightGear](../sim_flightgear/index.md) показує, як встановити та використовувати FlightGear більш детально (ця сторінка є підсумком функцій, специфічних для транспортних засобів).
:::

## Стандартна форма літака

FlightGear має моделі для багатьох літаків. Наразі найбільш підходящим для розробки БПЛА є [літак Rascal RC](https://github.com/ThunderFly-aerospace/FlightGear-Rascal) (який також існує у кількох варіантах).

![Літак Rascal у FlightGear](../../assets/simulation/flightgear/vehicles/rascal110.jpg)

Варіанти відрізняються в основному за моделлю [FDM](http://wiki.flightgear.org/Flight_Dynamics_Model). Усі варіанти мають загальну таблицю вибору функцій, яку можна активувати, натиснувши клавішу `=` на клавіатурі комп'ютера.

Є спливаюче вікно, яке може бути використане для активації розширених функцій.

![Додаткові параметри польоту літака Rascal у FlightGear](../../assets/simulation/flightgear/vehicles/rascal_options.jpg)

Найбільш відповідна опція:

- Дим - генерує димову смугу для підвищення видимості літака в повітрі (опція диму та частинок повинна бути активована в **FG View > параметри рендерингу > відмітьте Частинки**).
- Маркери траєкторії - відображають ортогональні маркери по траєкторії польоту.

Маркери траєкторії показують абсолютний шлях польоту в світових координатах, а димовий слід показує відносний шлях у повітряній масі.

### Rascal 110 YASim

Основний варіант моделі Rascal має модель згоряння поршневого двигуна. Це призводить до ненульової потужності холостого ходу, що викликає обертання гвинта на холостих обертах двигуна.

Команда запуску:

```sh
make px4_sitl_nolockstep flightgear_rascal
```

### Rascal 110 Електричний YASim

Транспортний засіб Rascal з електричним двигуном.

```sh
make px4_sitl_nolockstep flightgear_rascal-electric
```

:::info
Цей варіант потребує останнього коду FlightGear (джерела принаймні з 26 квітня 2020 року).
В іншому випадку, FlightGear аварійно завершує роботу через неочікуване визначення електричного двигуна.
:::

### Rascal 110 JSBsim

Rascal JSBsim варіант.

Цей варіант не має прямої опції `make`, але може бути вручну вибраний у файлі конфігурації **rascal.json** (частина [PX4-FlightGear-Bridge](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge)). Просто змініть `Rascal110-YASim` на `Rascal110-JSBSim` у [цьому файлі](https://github.com/ThunderFly-aerospace/PX4-FlightGear-Bridge/blob/master/models/rascal.json#L2).

## Автогиро

Єдину модель автогира БПЛА, яку підтримує FlightGear, є [TF-G1 Autogyro](https://github.com/ThunderFly-aerospace/TF-G1).

```sh
make px4_sitl_nolockstep flightgear_tf-g1
```

![TF-G1 in FlightGear](../../assets/simulation/flightgear/vehicles/tf-g1.jpg)

## Автомобіль Акермана (UGV/Rover)

### TF-R1 Ровер наземної підтримки

Цей ровер обладнаний буксирним гачком і може бути використаний для повітряного буксирування інших транспортних засобів.

```sh
make px4_sitl_nolockstep flightgear_tf-r1
```

![TF-R1 rover in FlightGear](../../assets/simulation/flightgear/vehicles/tf-r1_towing.jpg)

## Квадротор

Є лише [неповний модель багатовертольота](https://github.com/ThunderFly-aerospace/FlightGear-TF-Mx1). Це ще не можна використовувати (воно чисельно нестійке і потребує додаткової роботи).

## Додавання нового транспортного засобу

До каталогу [PX4-FlightGear-Bridge/models/](https://github.com/PX4/PX4-FlightGear-Bridge/tree/master/models) потрібно додати нову модель транспортного засобу як підмодуль git. Цей каталог містить визначення керуючого каналу [JSON файлу](https://github.com/PX4/PX4-FlightGear-Bridge/blob/master/models/rascal.json).

```json
{
  "FgModel": "Rascal110-YASim",
  "Url": "https://github.com/ThunderFly-aerospace/FlightGear-Rascal/archive/master.zip",
  "Controls": [
    ["5", "/controls/flight/aileron", "-1"],
    ["7", "/controls/flight/elevator", "-1"],
    ["2", "/controls/flight/rudder", "1"],
    ["4", "/controls/engines/engine/throttle", "1"]
  ]
}
```

Зміст файлу означає наступне:

- `FgModel` - точна чутлива до регістру назва моделі FlightGear, що відповідає "XXXX-set.xml" у каталозі моделей (де XXXX - назва моделі).
- `Url` є необов'язковим і наразі не використовується. Призначено для майбутнього використання для автоматичного завантаження моделей з Інтернету
- `Керування` - найважливіша частина процесу додавання транспортного засобу. Цей розділ містить відповідність між файлом змішувача PX4 та [деревом властивостей FlightGear](http://wiki.flightgear.org/Property_tree).
  - Перше число у списку вибирає вихід змішувача PX4.
  - Рядок шляху - це змінна FlightGear, яка знаходиться в дереві властивостей.
- Останній номер у списку є множником, що дозволяє інвертування або масштабування входу мікшера.

Після підготовки всіх цих файлів до системи PX4 потрібно додати новий транспортний засіб.

Конфігурація PX4 знаходиться в [/platforms/posix/cmake/sitl_target.cmake](https://github.com/PX4/PX4-Autopilot/blob/c5341da8137f460c84f47f0e38293667ea69a6cb/platforms/posix/cmake/sitl_target.cmake#L164-L171). Ім'я нового json-файлу для транспортного засобу повинно бути додане до списку.
