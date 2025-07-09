---
canonicalUrl: https://docs.px4.io/main/ko/debug/binary_size_profiling
---

# 이진 크기 프로파일링

`bloaty_compare_master` 빌드 타겟을 사용하면, 변경 사항이 코드 크기에 미치는 영향을 더 잘 이해할 수 있습니다. 사용할 때 도구 체인은 특정 펌웨어의 성공적인 최신 마스터 빌드를 다운로드하고, 이를 로컬 빌드와 비교합니다(바이너리용 [bloaty](https://github.com/google/bloaty) 크기 프로파일러 사용).

:::tip
`px4_fmu-v2_default`가 1MB 플래시 제한에 도달할 수 있는 변경 사항을 분석합니다.
:::

*Bloaty*는 경로에 있어야 하며, *cmake* 구성시 발견되어야 합니다. PX4 [도커 파일](https://github.com/PX4/containers/blob/master/docker/Dockerfile_nuttx-bionic)은 다음과 같이 *bloaty*를 설치합니다.
```
git clone --recursive https://github.com/google/bloaty.git /tmp/bloaty \
    && cd /tmp/bloaty && cmake -GNinja . && ninja bloaty && cp bloaty /usr/local/bin/ \
    && rm -rf /tmp/*
```

아래 예는 `px4_fmu-v2_default`에서 *mpu9250* 드라이버를 제거할 때의 영향을 확인할 수 있는 방법을 보여줍니다. 먼저 드라이버없이 로컬로 빌드를 설정합니다.
```sh
 % git diff
diff --git a/boards/px4/fmu-v2/default.cmake b/boards/px4/fmu-v2/default.cmake
index 40d7778..2ce7972 100644
--- a/boards/px4/fmu-v2/default.cmake
+++ b/boards/px4/fmu-v2/default.cmake
@@ -36,7 +36,7 @@ px4_add_board(
                imu/l3gd20
                imu/lsm303d
                imu/mpu6000
-               imu/mpu9250
+               #imu/mpu9250
                #iridiumsbd
                #irlock
                #magnetometer # all available magnetometer drivers
```
그런 다음, 비교할 대상 빌드를 지정하여 make 대상을 사용합니다(이 경우 `px4_fmu-v2_default`).
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
이것은 `px4_fmu-v2_default`에서 *mpu9250*을 제거하면 10.3kB의 플래시를 절약할 수 있음을 보여줍니다. 또한 *mpu9250* 드라이버의 여러 조각 크기를 보여줍니다.
