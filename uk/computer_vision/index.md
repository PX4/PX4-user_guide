# Комп'ютерний зір (оптичний потік, MoCap, VIO, уникання)

Техніки [комп'ютерного зору](https://en.wikipedia.org/wiki/Computer_vision) дозволяють комп'ютерам використовувати візуальні дані для розуміння їх оточення.

PX4 використовує системи комп'ютерного зору (переважно запущені на [супутніх комп'ютерах](../companion_computer/README.md)) для підтримки наступних функцій:

- Оцінка положення/швидкості:
  - [Оптичний потік](../sensor/optical_flow.md) забезпечує оцінку швидкості у двох вимірах (з використанням камери, спрямованої вниз, та датчика відстані, спрямованого вниз).
  - [Motion Capture](../computer_vision/motion_capture.md) provides 3D pose estimation using a vision system that is _external_ to the vehicle.
    Це переважно використовується для внутрішньої навігації.
  - [Visual Inertial Odometry (VIO)](../computer_vision/visual_inertial_odometry.md) provides 3D pose and velocity estimation using an onboard vision system and IMU.
    Використовується для навігації, коли інформація про глобальне місцезнаходження відсутня або ненадійна.
- Уникнення/планування шляху:
  - [Collision Prevention](../computer_vision/collision_prevention.md) is used to stop MC vehicles before they can crash into an obstacle (primarily when flying in manual modes).

:::tip
[Набір для розвитку автономності візійної системи PX4](../complete_vehicles_mc/px4_vision_kit.md) (від Holybro) - це надійний та доступний набір для розробників, які працюють з комп'ютерним зором на PX4.
:::

## Додаткові ресурси

- [XTDrone](https://github.com/robin-shaun/XTDrone/blob/master/README.en.md) - ROS + PX4 v1.9 simulation environment for computer vision.
  The [XTDrone Manual](https://www.yuque.com/xtdrone/manual_en) has everything you need to get started!
