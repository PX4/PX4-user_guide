# Профілювання двійкового розміру

Ціль збірки `bloaty_compare_master` дозволяє вам краще зрозуміти вплив змін на розмір коду. Коли використовується, інструментарій завантажує останню успішну майстер-збірку певного прошивкового ПЗ та порівнює її з локальною збіркою (використовуючи [bloaty](https://github.com/google/bloaty) розмір профілювальника для бінарних файлів).

:::tip
Це може допомогти проаналізувати зміни, які (можливо) призводять до того, що `px4_fmu-v2_default` досягає обмеження 1 МБ для флешу.
:::

_Bloaty_ повинен бути у вашому шляху та бути знайденим у час налаштування _cmake_. The PX4 [docker files](https://github.com/PX4/containers/blob/master/docker/Dockerfile_nuttx-bionic) install _bloaty_ as shown:

```sh
git clone --recursive https://github.com/google/bloaty.git /tmp/bloaty \
    && cd /tmp/bloaty && cmake -GNinja . && ninja bloaty && cp bloaty /usr/local/bin/ \
    && rm -rf /tmp/*
```

Приклад нижче показує, як ви можете побачити вплив видалення драйвера _mpu9250_ з `px4_fmu-v2_default`. Спочатку локально налаштовує збірку без драйвера:

```sh
 % git diff
diff --git a/boards/px4/fmu-v2/default.px4board b/boards/px4/fmu-v2/default.px4board
index 40d7778..2ce7972 100644
--- a/boards/px4/fmu-v2/default.px4board
+++ b/boards/px4/fmu-v2/default.px4board
@@ -36,7 +36,7 @@
-               CONFIG_DRIVERS_IMU_INVENSENSE_MPU9250=y
+               CONFIG_DRIVERS_IMU_INVENSENSE_MPU9250=n
```

Потім використовуйте ціль створення, вказавши ціль для порівняння (`px4_fmu-v2_default` у цьому випадку):

```sh
% make px4_fmu-v2_default bloaty_compare_master
...
...
...
     VM SIZE                                                                                        FILE SIZE
 --------------                                                                                  --------------
  [DEL]     -52 MPU9250::check_null_data(unsigned int*, unsigned char)                               -52  [DEL]
  [DEL]     -52 MPU9250::test_error()                                                                -52  [DEL]
  [DEL]     -52 MPU9250_gyro::MPU9250_gyro(MPU9250*, char const*)                                    -52  [DEL]
  [DEL]     -56 mpu9250::info(MPU9250_BUS)                                                           -56  [DEL]
  [DEL]     -56 mpu9250::regdump(MPU9250_BUS)                                                        -56  [DEL]
...                                        -336  [DEL]
  [DEL]    -344 MPU9250_mag::_measure(ak8963_regs)                                                  -344  [DEL]
  [DEL]    -684 MPU9250::MPU9250(device::Device*, device::Device*, char const*, char const*, cha    -684  [DEL]
  [DEL]    -684 MPU9250::init()                                                                     -684  [DEL]
  [DEL]   -1000 MPU9250::measure()                                                                 -1000  [DEL]
 -41.3%   -1011 [43 Others]                                                                        -1011 -41.3%
  -1.0% -1.05Ki [Unmapped]                                                                       +24.2Ki  +0.2%
  -1.0% -10.3Ki TOTAL                                                                            +14.9Ki  +0.1%
```

Це показує, що видалення _mpu9250_ з `px4_fmu-v2_default` заощадило б 10,3 кБ флешу. Це також показує розміри різних частин драйвера _mpu9250_.
