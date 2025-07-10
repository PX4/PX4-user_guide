---
canonicalUrl: https://docs.px4.io/main/ko/simulation/gazebo_vehicles
---

# 가제보 기체

PX4 [Gazebo](../simulation/gazebo.md) 시뮬레이션과 이를 실행하는 데 필요한 `make` 명령이 지원하는 차량을 설명합니다(명령은 **PX4- Autopilot** 디렉토리).

지원되는 차량 유형에는 멀티콥터, VTOL, VTOL 테일시터, 고정익, 로보, 잠수함/UUV가 포함됩니다.

:::tip
빌드 대상의 전체 목록을 보려면 `make px4_sitl list_vmd_make_targets`를 실행하십시오(그리고 `gazebo_`로 시작하는 대상에서 필터링).
:::

:::note
[Gazebo](../simulation/gazebo.md)에서는 Gazebo 설치 방법, 비디오를 활성화 방법, 사용자 정의 지도 로드 방법 및 기타 여러 설정 옵션을 설명합니다.
:::

## 멀티콥터
<a id="quadrotor"></a>

### 쿼드콥터 (기본)

```sh
make px4_sitl gazebo
```

<a id="quadrotor_optical_flow"></a>

### 광류센서 장착 쿼드콥터

```sh
make px4_sitl gazebo_iris_opt_flow
```

<a id="3dr_solo"></a>

### 3DR Solo (쿼드콥터)

```sh
make px4_sitl gazebo_solo
```

![가제보 3DR 솔로](../../assets/simulation/gazebo/vehicles/solo.png)


<a id="typhoon_h480"></a>

### Typhoon H480 (헥스로터)

```
make px4_sitl gazebo_typhoon_h480
```

![가제보 Typhoon H480](../../assets/simulation/gazebo/vehicles/typhoon.jpg)

:::note
이 타겟은 [동영상 스트리밍 시뮬레이션](../simulation/gazebo.md#video-streaming)도 지원합니다.
:::

<a id="fixed_wing"></a>

## 비행기/고정익

<a id="standard_plane"></a>

### 표준 비행기

```sh
make px4_sitl gazebo_plane
```

![가제보 비행기](../../assets/simulation/gazebo/vehicles/plane.png)


<a id="standard_plane_catapult"></a>

#### 투석기 발사형 표준 비행기

```sh
make px4_sitl gazebo_plane_catapult
```

이 모델은 위치 모드, 이륙 모드 또는 임무에서 [고정익 이륙](../flying/fixed_wing_takeoff.md#fixed-wing-takeoff)에 사용할 수 있는 손/투석기 발사를 시뮬레이션합니다.

차량이 시동이 걸리는 즉시, 비행기가 자동으로 시작됩니다.


## VTOL

<a id="standard_vtol"></a>

### 표준 VTOL

```sh
make px4_sitl gazebo_standard_vtol
```

![가제보 표준 VTOL](../../assets/simulation/gazebo/vehicles/standard_vtol.png)

<a id="tailsitter_vtol"></a>

### 테일시터 VTOL

```sh
make px4_sitl gazebo_tailsitter
```

![가제보 테일시터 VTOL](../../assets/simulation/gazebo/vehicles/tailsitter.png)


<a id="ugv"></a>

## 무인 지상 차량(UGV/탐사선/자동차)

### Ackermann UGV

```sh
make px4_sitl gazebo_rover
```

![가제보 탐사선](../../assets/simulation/gazebo/vehicles/rover.png)

### 차동 UGV

```sh
make px4_sitl gazebo_r1_rover
```

![가제보 탐사선](../../assets/simulation/gazebo/vehicles/r1_rover.png)


<a id="uuv"></a>

## 무인 수중 차량(UUV/잠수함)

<a id="uuv_hippocampus"></a>

### HippoCampus TUHH UUV

```sh
make px4_sitl gazebo_uuv_hippocampus
```

![잠수함/UUV](../../assets/simulation/gazebo/vehicles/hippocampus.png)

<a id="usv"></a>

## 무인 수면 기체(USV/보트)

<a id="usv_boat"></a>

### 보트

```sh
make px4_sitl gazebo_boat
```

![보트/USV](../../assets/simulation/gazebo/vehicles/boat.png)

<a id="airship"></a>

## 비행선

<a id="cloudship"></a>

### 클라우드쉽

```sh
make px4_sitl gazebo_cloudship
```

![비행선](../../assets/simulation/gazebo/vehicles/airship.png)
