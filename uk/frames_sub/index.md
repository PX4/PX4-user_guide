# Підводні човни (Безпілотна Підводна Техніка- UUV)

<LinkedBadge type="warning" text="Experimental" url="../airframes/#experimental-vehicles"/>

:::warning
Підтримка підводних човнів є [експериментальною](../airframes/README.md#experimental-vehicles). Волонтери та контрибютори, [внесення](../contribute/README.md) нових функцій, нових конфігурацій каркасів або інших вдосконалень дуже вітається!

На момент написання він був протестований лише з використанням ROS у автономному режимі. Наступні функції не були реалізовані:

- Такі режими, як місії, утримання глибини, стабілізоване ручне керування тощо.
- Підтримка BlueRobotics.

:::

PX4 має базову підтримку UUV.

## Підтримувані плати

PX4 підтримує кілька безпілотних підводних апаратів (UUV). The set of supported configurations can be seen in [Airframe Reference > Underwater Robots](../airframes/airframe_reference.md#underwater-robot).

### Сумісний з PX4 (повна збірка)

У цьому розділі перераховані повністю зібрані транспортні засоби, де ви можете оновити програмне забезпечення для роботи з PX4.

- [BlueROV2](../frames_sub/bluerov2.md): Векторизований 6 DOF UUV

### Інші ресурси

- HippoCampus UUV: [Airframe Reference](../airframes/airframe_reference.md#underwater_robot_underwater_robot_hippocampus_uuv_%28unmanned_underwater_vehicle%29), [Класична симуляція Gazebo ](../sim_gazebo_classic/vehicles.md#hippocampus-tuhh-uuv)

## Відео

<lite-youtube videoid="1sUaURmlmT8" title="PX4 on BlueRov Demo"/>

---

<lite-youtube videoid="xSXSoUK-iBM" title="Hippocampus UUV in PX4 SITL Gazebo"/>
