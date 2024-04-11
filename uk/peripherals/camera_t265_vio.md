# Intel®️ RealSenseTM Tracking камери T265 (VIO)

Камера відстеження [Intel® RealSense™ T265](https://www.intelrealsense.com/tracking-camera-t265/) надає інформацію по одометрії, яку можна використовувати для [VIO](../computer_vision/visual_inertial_odometry.md), доповнюючи або замінюючи інші системи позиціонування на PX4.

:::tip
Ця камера рекомендована і використовується в [Візуальній інерціальній одометрії (VIO) > Рекомендована настройка](../computer_vision/visual_inertial_odometry.md#suggested-setup).
:::

![Intel® RealSense™ Tracking Camera T265 - Angled Image](../../assets/peripherals/camera_vio/t265_intel_realsense_tracking_camera_photo_angle.jpg)

## Де купити

[Камера відстеження Intel® RealSense™ T265](https://www.intelrealsense.com/tracking-camera-t265/) (store.intelrealsense.com)

## Інструкції з установки

На загальному рівні:

- Для отримання сирого даних з камери слід використовувати обгортку [`realsense-ros`](https://github.com/IntelRealSense/realsense-ros), надану компанією Intel.
- Камеру слід встановити з об'єктивами, спрямованими вниз (за замовчуванням). Не забудьте вказати орієнтацію камери, опублікувавши статичне перетворення між `base_link` та `camera_pose_frame` у файлі запуску ROS, наприклад:
  ```xml
  <node pkg="tf" type="static_transform_publisher" name="tf_baseLink_cameraPose"
      args="0 0 0 0 1.5708 0 base_link camera_pose_frame 1000"/>
  ```
  This is a static transform that links the camera ROS frame `camera_pose_frame` to the MAVROS drone frame `base_link`.
  - the first three `args` specify _translation_ x,y,z in metres from the center of the flight controller to the camera. For example, if the camera is 10cm in front of the controller and 4cm up, the first three numbers would be : [0.1, 0, 0.04,...]
  - наступні три `args` вказують обертання в радіанах (кут розвороту, тангаж, крен). Так `[... 0, 1.5708, 0]` означає нахил вниз на 90° (обличчям до землі). Обличчям прямо вперед було б [... 0 0 0].
- Камера чутлива до високочастотних вібрацій! Воно повинно бути м'яко монтуватися, наприклад, за допомогою піни для віброізоляції.
