# Використання корисного навантаження

Цей розділ містить кілька загальних випадків використання "корисного навантаження дронів" та те, як вони підтримуються PX4.

## Дрони для картографування

Дрони для картографування використовують камери для знімання зображень з інтервалами у часі або відстані під час обстежень.

MAVLink камери які підтримують [протокол MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html) забезпечують найкращу інтеграцію з PX4 і QGroundControl.
MAVSDK надає прості API для використання цього протоколу як для [операцій автономної камери](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html), так і для використання в [місіях](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4).

Камери також можуть безпосередньо підключатися до політного контролера за допомогою PWM або GPI виводів.
PX4 підтримує наступний набір MAVLink команд/елементів місій для камер, які підключені до політного контролера:

- [MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL) - встановити проміжок часу між знімками.
- [MAV_CMD_DO_SET_CAM_TRIGG_DIST](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_CAM_TRIGG_DIST) - встановити відстань між знімками
- [MAV_CMD_DO_TRIGGER_CONTROL](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_TRIGGER_CONTROL) - почати / зупинити знімання (використовуючи відстань або час, як визначено командами вище).

Наступні розділи показують як _під'єднати_ та налаштувати камеру:

- [Активація Камери](../peripherals/camera.md) через PWM або GPIO виводи політного контролера, або за допомогою MAVLink.
- Зворотний зв'язок від [Знімання камерою](../peripherals/camera.md#camera-capture) через hotshoe input.

## Вантажні дрони (доставлення посилок)

Вантажні дрони зазвичай використовують захоплювачі, лебідки та інші механізми, щоб розвантажувати пакунки в місцях призначення.

PX4 підтримує _доставку посилок у місіях_ за допомогою [захвату](../peripherals/gripper.md).
Захоплювачі також можна активувати за допомогою [MAV_CMD_DO_GRIPPER](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_GRIPPER) команди MAVLink, або вручну за допомогою кнопки джойстика.

Встановлення та інформація про використання:

- [Захоплювач](../peripherals/gripper.md)
- [Політ > Планування місії доставки посилок](../flying/package_delivery_mission.md)

:::note
Support for winches and other release mechanisms is also intended.

Якщо вам необхідно здійснити доставлення вантажу, використовуючи апаратне забезпечення, яке ще не інтегроване, ви можете використати [Керування Загальним Приводом](../payloads/generic_actuator_control.md).
:::

## Спостереження, Пошук & Порятунок

Дрони Спостереження, Пошуку & Порятунку мають вимоги, подібні до картографічних дронів.
Основні відмінності полягають у тому, що, окрім польоту в запланованій зоні огляду, їм зазвичай потрібен хороший автономний контроль над камерою для знімання зображень і відео, і їм може знадобитися можливість працювати вдень і вночі

Використовуйте камеру, яка підтримує [MAVLink Camera Protocol](https://mavlink.io/en/services/camera.html), оскільки він підтримує знімання зображень і відео, масштабування, керування сховищем, кілька камер на одному апараті та перемикання між ними тощо.
Ці камери можна контролювати як вручну з QGroundControl, так і через MAVSDK (як для [операцій автономної камери](https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html), так і в [місіях](https://mavsdk.mavlink.io/main/en/cpp/api_reference/structmavsdk_1_1_mission_1_1_mission_item.html#structmavsdk_1_1_mission_1_1_mission_item_1a0299fbbe7c7b03bc43eb116f96b48df4)).
Перегляньте [Запуск камери](../peripherals/camera.md), щоб дізнатися, як налаштувати камеру для роботи з MAVLink.

:::note
Камери, підключені безпосередньо до політного контролера підтримують _тільки_ активацію камери та навряд чи підходять для більшості діяльностей зі спостереження/пошуку.
:::

Пошуково-рятувальному безпілотнику також може знадобитися транспортувати вантажі, наприклад, для екстреної допомоги туристу, що застряг.
Перегляньте [Вантажні дрони](#cargo-drones-package-delivery) вище, щоб отримати інформацію про доставлення корисного вантажу.

## Сільськогосподарські дрони/Обприскування насаджень

Сільськогосподарські безпілотні літальні апарати зазвичай використовуються для картографування стану рослин, виявлення шкідників і догляду за тваринами (випасання, відстеження тощо).
Ці варіанти використання подібні до [картографування](#mapping-drones) та [спостереження, пошуку & порятунку](#surveillance-search-rescue) наведених вище.
Хоча для окремих культур/тварин можуть знадобитися спеціальні камери, інтеграція з PX4 залишається такою ж.

Сільськогосподарський дрон також можна використовувати для обприскування посівів.
У цьому випадку розпилювачем необхідно керувати як [загальним приводом](../payloads/generic_actuator_control.md):

- [Generic Actuator Control](../payloads/generic_actuator_control.md#generic-actuator-control-with-mavlink) explains how you can connect flight controller outputs to your sprayer so that they can be controlled using MAVLink.
  Most sprayers provide controls to activate/deactivate a pump; some also allow control over the rate of flow or the spray field (i.e. by controlling the nozzle shape, or using a spinner to distribute the payload).
- You can define the area to spray using a [Survey pattern](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/plan_view/pattern_survey.html), or you can define the grid to fly using waypoints.
  In either case, it is important to ensure that the vehicle flight path and altitude provide adequate coverage for your particular spray being used.
- You should add a ["Set actuator" mission item](../payloads/generic_actuator_control.md#generic-actuator-control-in-missions) to your mission before and after the survey pattern in order to enable and disable the sprayer.
