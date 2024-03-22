# Приводи та камери

PX4 підтримує широкий спектр приводів та камер.

Приводи підключаються до [виводів Політного Контролера](../getting_started/px4_basic_concepts.md#outputs-motors-servos-actuators) і, як правило, можуть активовуватися автоматично в місіях, або вручну за допомогою пристрою дистанційного керування (RC), маппінгу на джойстик, або командами MAVLink/MAVSDK.

:::note
Приводи (актуатори) можуть бути протестовані в [pre-arm стані](../getting_started/px4_basic_concepts.md#arming-and-disarming), який деактивує мотори, але дозволяє актуаторам рухатися. Це може бути безпечнішим, ніж тестування коли апарат активований.
:::

## Дрони для картографування

Дрони для картографування використовують камери для знімання зображень з інтервалами у часі або відстані під час обстежень.

MAVLink камери які підтримують протокол [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) забезпечують найкращу інтеграцію з PX4 і QGroundControl. MAVSDK надає простий API для використання цього протоколу як в [окремих діях камери](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html) так і в [місіях](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4).

Камери також можуть безпосередньо підключатися до політного контролера за допомогою PWM або GPI виводів. PX4 підтримує наступний набір MAVLink команд/елементів місій для камер, які підключені до політного контролера:

- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - встановити інтервал часу між зніманнями.
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - встановити відстань між зніманнями
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - почати/зупинити знімання (використовуючи відстань або час, як визначено попередніми командами).

Наступні розділи показують як *під'єднати* та налаштувати камеру:

- [Активація Камери](../peripherals/camera.md) через PWM або GPIO виводи політного контролера, або за допомогою MAVLink.
- Результат [Захоплення Камери](../peripherals/camera.md#camera-capture) через вхід hotshoe.


## Вантажні дрони (доставлення посилок)

Вантажні дрони зазвичай використовують захоплювачі, лебідки та інші механізми, щоб розвантажувати пакунки в місцях призначення.

PX4 підтримує _доставлення посилок в місіях_ за допомогою [захоплювача](../peripherals/gripper.md). Захоплювачі також можна активовувати за допомогою MAVLink команди [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) або вручну за допомогою кнопки джойстика.

Встановлення та інформація про використання:

- [Захоплювач](../peripherals/gripper.md)
- [Політ > Планування Місії Доставлення Посилок](../flying/package_delivery_mission.md)

:::note
Також передбачена підтримка для лебідок та інших механізмів розвантаження.

Якщо вам необхідно здійснити доставлення вантажу, використовуючи hardware компоненти, які ще не інтегровані, ви можете використати [Керування Загальним Приводом](#generic-actuator-control).
:::

## Спостереження, Пошук і Порятунок

Дрони Спостереження, Пошуку і Порятунку мають вимоги, подібні до картографічних дронів. Основні відмінності полягають у тому, що, окрім польоту в запланованій зоні огляду, їм зазвичай потрібен хороший автономний контроль над камерою для знімання зображень і відео, і їм може знадобитися можливість працювати вдень і вночі.

Використовуйте камеру, яка підтримує протокол [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html), оскільки він підтримує захоплення зображень і відео, масштабування, керування сховищем, кілька камер на одному апараті та перемикання між ними тощо. Цими камерами можна керувати вручну з QGroundControl або через MAVSDK (як для [окремих дій камери](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html), так і для [місій](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)). Перегляньте розділ [Запуск камери](../peripherals/camera.md), щоб дізнатися, як налаштувати камеру для роботи з MAVLink.

:::note
Камери, підключені безпосередньо до політного контролера, підтримують _тільки_ активацію камери та навряд чи підходять для більшості діяльностей зі спостереження/пошуку.
:::

Пошуково-рятувальному безпілотнику також може знадобитися транспортувати вантажі, наприклад, для екстреної допомоги туристу, що застряг. Перегляньте [Вантажні дрони](#cargo-drones-package-delivery) вище, щоб отримати інформацію про доставлення корисного вантажу.

## Сільськогосподарські дрони/Обприскування насаджень

Сільськогосподарські безпілотні літальні апарати зазвичай використовуються для картографування стану рослин, виявлення шкідників і догляду за тваринами (випасання, відстеження тощо). Ці варіанти використання подібні до [картографування](#mapping-drones) та [спостереження, пошуку & порятунку](#surveillance-search-rescue) наведених вище. Хоча для окремих культур/тварин можуть знадобитися спеціальні камери, інтеграція з PX4 незмінна.

Сільськогосподарський дрон також можна використовувати для обприскування посівів. У цьому випадку обприскувач має керуватися як [загальний привід](#generic-actuator-control):

- У розділі [Керування Загальним Приводом за допомогою MAVLink](#generic-actuator-control-with-mavlink) пояснюється, як можна під'єднати виводи політного контролера до розпилювача, щоб ним можна було керувати за допомогою MAVLink. Більшість розпилювачів мають засоби керування для ввімкнення/вимкнення помпи; деякі також дозволяють контролювати швидкість потоку або поле розпилення (тобто, керуючи формою сопла або використовуючи спінер для розподілу корисного навантаження).
- Ви можете визначити область розпилювання за допомогою [Survey патерну](https://docs.qgroundcontrol.com/master/en/PlanView/pattern_survey.html) або визначити сітку для польоту за допомогою маршрутних точок. У будь-якому випадку важливо переконатися, що траєкторія польоту апарату та його висота забезпечують належне покриття для конкретного спрею, що використовується.
- Щоб увімкнути та вимкнути розпилювач, ви повинні додати [елемент "Set actuator"](#generic-actuator-control-in-missions) до вашої місії до та після survey патерну.


## Керування Загальним Приводом

Ви можете під'єднати будь-яке обладнання до невикористаних виводів PX4 і керувати ним за допомогою [Пульту керування](#generic-actuator-control-with-rc) або [MAVLink](#generic-actuator-control-with-mavlink) (у вигляді команд або в [місії](#generic-actuator-control-in-missions)).

Це корисно, коли вам потрібно використовувати тип корисного навантаження, для якого немає відповідної команди MAVLink, або який не підтримується PX4.

:::note
Якщо це можливо, надавайте перевагу використанню інтегрованого обладнання та MAVLink команд що відповідають конкретному типу обладнання, для керування загальним приводом.
Використання інтегрованого обладнання сприяє оптимізованому плануванню місії та поведінці.
:::

### Керування Загальним Приводом за допомогою MAVLink

[MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) може використовуватися для встановлення значень до 6 приводів (одночасно). Цю команду можна використовувати в [місіях](#generic-actuator-control-in-missions) шляхом створення елемента місії "Set actuator" або як окрему команду.

Виводи, якими потрібно керувати, вказуються на екрані конфігурації [Actuators](../config/actuators.md#actuator-outputs) шляхом призначення функцій `Peripheral via Actuator Set 1` до `Peripheral via Actuator Set 6` до бажаних [виводів приводу](../config/actuators.md#actuator-outputs).

![Налаштування виводу загального приводу в QGC](../../assets/peripherals/qgc_generic_actuator_output_setting_example.png)

`MAV_CMD_DO_SET_ACTUATOR` `param1` до `param6` керують виводами, що замаплені від `Peripheral via Actuator Set 1` до `Peripheral via Actuator Set 6` відповідно.

Наприклад, на зображенні вище вивід `AUX5` призначений функцією `Peripheral via Actuator Set 1`. Щоб керувати приводом, підключеним до `AUX5`, потрібно встановити значення `MAV_CMD_DO_SET_ACTUATOR.param1`.

<!-- PX4 v1.14 bug https://github.com/PX4/PX4-Autopilot/issues/21966 -->

### Керування Загальним Приводом за допомогою пристрою дистанційного керування (RC)

За допомогою каналів RC можна керувати до 6 PWM або CAN виводами автопілота. Виводи, якими потрібно керувати, вказуються на екрані конфігурації [Actuators](../config/actuators.md#actuator-outputs) шляхом призначення функцій від `RC AUX 1` до `RC AUX 6` для потрібних [виводів приводів](../config/actuators.md#actuator-outputs).

Щоб пов'язати певний RC канал із функцією виведення `RC AUX n` (і, отже, з її призначеним виводом), ви використовуєте параметр [RC_MAP_AUXn](../advanced_config/parameter_reference.md#RC_MAP_AUX1), який має той самий `n` номер.

Наприклад, щоб керувати приводом, приєднаним до AUX контакту 3 (скажімо), ви повинні призначити вивідну функцію `RC AUX 3` для виводу `AUX3`. Потім ви можете використовувати RC канал для керування виводом `AUX3` за допомогою `RC_MAP_AUX3`.

### Керування Загальним Приводом в Місіях

Щоб використовувати керування загальним приводом у місії, спочатку необхідно [налаштувати виводи, якими ви хочете керувати за допомогою MAVLink](#generic-actuator-control-with-mavlink).

Потім у *QGroundControl* ви можете встановити значення виводів приводів в місії за допомогою елементу місії **Set actuator** (це додає [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR) до завантаженого плану місії).

Важливо зауважити, що із керуванням загальним приводом ані *QGroundControl*, ані PX4 нічого не знають про обладнання (hardware), яке запускається. Під час обробки елемента місії PX4 просто встановить виводи відповідно до вказаних значень, а потім негайно перейде до наступного елемента місії. Якщо обладнання (hardware) потребує часу для запуску, і вам потрібно зупинитися на поточній точці маршруту, щоб це сталося, тоді вам необхідно спланувати місію з додатковими елементами, щоб досягти бажаної поведінки.

:::note
Це одна з переваг використання інтегрованого обладнання!
Це дозволяє будувати місії в загальному вигляді, з будь-якою поведінкою чи часом, що залежить від обладнання, що керується конфігурацією політного стека.
:::

Для використання загального приводу у місії:

1. Створіть елемент місії waypoint, де вам потрібна команда для приводу.
1. Змініть елемент місії waypoint на "Set actuator":

   ![Встановити елемент місії actuator](../../assets/qgc/plan/mission_item_editors/mission_item_select_set_actuator.png)

   - Виберіть заголовок у редакторі для waypoint місії, щоб відкрити **Select Mission Command** редактор.
   - Виберіть категорію **Advanced**, а потім пункт **Set actuator** (якщо елемента немає, спробуйте новішу версію *QGroundControl* або щоденний білд). Це змінить тип елемента місії на "Set actuator".

1. Виберіть підключені приводи та встановіть їхні значення (вони нормалізовані між -1 і 1).

   ![Встановити елемент місії actuator](../../assets/qgc/plan/mission_item_editors/set_actuator.png)

### MAVSDK (приклад)

Наступний [MAVSDK](https://mavsdk.mavlink.io/main/en/index.html) [приклад коду](https://github.com/mavlink/MAVSDK/blob/main/examples/set_actuator/set_actuator.cpp) показує, як ініціювати випуск корисного навантаження за допомогою методу [`set_actuator()`](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html#classmavsdk_1_1_action_1ad30beac27f05c62dcf6a3d0928b86e4c) плагіну MAVSDK Action.

Значення індексу `set_actuator()` мапляться на виводи корисного навантаження MAVLink, визначені для вашого літального апарату.

:::note MAVSDK
надсилає MAVLink команду [MAV_CMD_DO_SET_ACTUATOR](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_ACTUATOR).
:::

```cpp
#include <mavsdk/mavsdk.h>
#include <mavsdk/plugins/action/action.h>
#include <chrono>
#include <cstdint>
#include <iostream>
#include <future>

using namespace mavsdk;

void usage(const std::string& bin_name)
{
    std::cerr << "Usage :" << bin_name << " <connection_url> <actuator_index> <actuator_value>\n"
              << "Connection URL format should be :\n"
              << " For TCP : tcp://[server_host][:server_port]\n"
              << " For UDP : udp://[bind_host][:bind_port]\n"
              << " For Serial : serial:///path/to/serial/dev[:baudrate]\n"
              << "For example, to connect to the simulator use URL: udp://:14540\n";
}

int main(int argc, char** argv)
{
    if (argc != 4) {
        usage(argv[0]);
        return 1;
    }

    const std::string connection_url = argv[1];
    const int index = std::stod(argv[2]);
    const float value = std::stof(argv[3]);

    Mavsdk mavsdk;
    const ConnectionResult connection_result = mavsdk.add_any_connection(connection_url);

    if (connection_result != ConnectionResult::Success) {
        std::cerr << "Connection failed: " << connection_result << '\n';
        return 1;
    }

    std::cout << "Waiting to discover system...\n";
    auto prom = std::promise<std::shared_ptr<System>>{};
    auto fut = prom.get_future();

    // We wait for new systems to be discovered, once we find one that has an
    // autopilot, we decide to use it.
    mavsdk.subscribe_on_new_system([&mavsdk, &prom]() {
        auto system = mavsdk.systems().back();

        if (system->has_autopilot()) {
            std::cout << "Discovered autopilot\n";

            // Unsubscribe again as we only want to find one system.
            mavsdk.subscribe_on_new_system(nullptr);
            prom.set_value(system);
        }
    });

    // We usually receive heartbeats at 1Hz, therefore we should find a
    // system after around 3 seconds max, surely.
    if (fut.wait_for(std::chrono::seconds(3)) == std::future_status::timeout) {
        std::cerr << "No autopilot found, exiting.\n";
        return 1;
    }

    // Get discovered system now.
    auto system = fut.get();

    // Instantiate plugins.
    auto action = Action{system};

    std::cout << "Setting actuator...\n";
    const Action::Result set_actuator_result = action.set_actuator(index, value);

    if (set_actuator_result != Action::Result::Success) {
        std::cerr << "Setting actuator failed:" << set_actuator_result << '\n';
        return 1;
    }

    return 0;
}
```


