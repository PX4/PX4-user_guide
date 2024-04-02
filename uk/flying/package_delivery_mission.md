# Місії з доставки вантажу

Місія з доставки посилки дозволяє планувати та виконувати доставку вантажу за допомогою [захвату](../peripherals/gripper.md).

:::note
Ця функція була додана в PX4 v1.14 з підтримкою захвату (лише). Місії з доставки посилок будуть розширені для підтримки іншого обладнання для випуску вантажу в майбутньому, включаючи лебідки.
:::

## Конфігурація механізму доставки

Місії з доставки посилок вимагають певної конфігурації, яку необхідно виконати перед плануванням і виконанням місії.

Конфігурація значною мірою залежить від апаратного забезпечення, тому вона описана на сторінці налаштування для кожного типу обладнання доставки посилок:

- [Захват > Конфігурація доставки посилок](../peripherals/gripper.md#package-delivery-configuration)

## Планування місії

Місія доставки посилки планується майже так само, як і будь-яка інша [місія з маршрутною точкою](../flying/missions.md), із початковою точкою місії, точкою зльоту, різними маршрутними точками шляху та, можливо, точкою повернення. Єдина відмінність полягає в тому, що місія доставки посилки має включати пункт місії, який вказує, чи потрібно випустити посилку на землі (`Land`) чи в повітрі (`Waypoint`), після чого інший елемент місії для розвантаження посилки (`Механізм захоплення`).

Те, чи ви `приземляєтеся`, залежить від того чи можна безпечно вивантажити посилку під час польоту та чи здатний апарат приземлитися в місці вивантаження. Since a gripper cannot lower packages safely, multicopter and VTOL vehicles will often land to deploy packages when using a gripper.

After the deployment device [indicates completion](#package-release-feedback), the vehicle will proceed to the next waypoint. Note that if landed, the next mission item after deployment should be another `Waypoint` or a `Takeoff` mission item ([it must not be a `RETURN`](#rtl-waypoint-for-package-delivery-with-landing).)

## Creating a Package Delivery Mission

To create a package delivery mission (with a Gripper):

1. Create a normal mission with a `Takeoff` mission item, and additional waypoints for your required flight path.
1. Add a waypoint on the map for where you'd like to release the package.

   - To drop the package while flying set an appropriate altitude for the waypoint (and ensure the waypoint is at a safe location to drop the package).

   - If you'd like to land the vehicle to make the delivery you will need to change the `Waypoint` to a `Land` mission item. Do this by selecting the mission item heading, then selecting `Land` in the popup dialog.

     ![Waypoint to Land mission item](../../assets/flying/package_delivery_land_waypoint.png)

1. Add a waypoint on the map (anywhere) for the gripper release. To change this to a `Gripper Mechanism` select the "Waypoint" heading, and in the popup changing the group to "Advanced", then selecting `Gripper Mechanism`.

   ![Action waypoint](../../assets/flying/qgc_mission_gripper_mechanism_item_example.png)

1. Configure the action for the gripper in the editor.

   ![Gripper action setting](../../assets/flying/qgc_mission_plan_gripper_action_setting.png)

   - Set it to "Release" in order to release the package.
   - The gripper ID does not need to be set for now.

1. Add additional waypoints for the remainder of the path. If you landed, then remember that you must include a waypoint after the `Gripper Mechanism` before adding a `Return` mission item.

### Example Plans

#### Package Drop Mission

This shows a mission plan where the vehicle drops the package while flying. The initial mission item is a waypoint and the action is a `Gripper Release` (shown in mission item list)

![Package drop mission example](../../assets/flying/package_drop_mission_example.png)

Note how the altitude graph shows the pre-waypoint as an in-air waypoint, also on the right panel.

#### Land and Release Mission

This shows a mission plan that where the vehicle lands to deliver the package.

![Land and Release example](../../assets/flying/land_and_release_package_delivery_mission_example.png)

Note how the altitude graph shows the `Land` item.

### Notes

#### RTL Waypoint for Package Delivery with Landing

Do not plan a mission with a delivery like this: `LAND` > `GRIPPER` > `RETURN TO LAUNCH`.

For safety reasons "Return To Launch" is disabled when vehicle is landed ([related issue](https://github.com/PX4/PX4-Autopilot/pull/20044)). So if you land, release the cargo, then have an RTL waypoint, the vehicle will idle at the landing coordinate.

#### Manual Control of Gripper in Missions

A gripper can be [manually controlled using a joystick button](../peripherals/gripper.md#qgc-joystick-configuration) (if configured) in any mode, including during a mission.

Note however that if you manually command the gripper to close while a package delivery mission is opening the gripper, the gripper won't be able to finish the open action. The mission will resume after the payload delivery mission item timeout ([MIS_PD_TO](../advanced_config/parameter_reference.md#MIS_PD_TO) expires, even if it has not released the package.

#### Auto-disarming is Disabled in Missions

Auto disarming is disabled by default when in mission. This means that while landed for package delivery the vehicle will still be armed (and potentially dangerous!)

#### Package Release Feedback

The mission will proceed after a "package release" mission item (e.g. `GRIPPER`) completes.

Grippers and other delivery devices either use sensor feedback or a configurable timeout to indicate completion.
