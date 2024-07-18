# BlueROV2 (UUV)

<Badge type="tip" text="PX4 v1.12" />

[BlueROV2](https://bluerobotics.com/store/rov/bluerov2-upgrade-kits/brov2-heavy-retrofit-r1-rp/BlueROV2) - це доступний високопродуктивний підводний апарат, який ідеально підходить для інспекцій, досліджень та пригод.

PX4 забезпечує [експериментальну підтримку](README.md) восьмипропелерної конфігурації з векторним керуванням, відомої як _BlueROV2 Heavy Configuration_.

![Hero](../../assets/airframes/sub/bluerov/bluerov_hero.jpg)

## Де купити

[BlueROV2](https://bluerobotics.com/store/rov/bluerov2/) + [Комплект модернізації для важкої конфігурації BlueROV2](https://bluerobotics.com/store/rov/bluerov2-upgrade-kits/brov2-heavy-retrofit-r1-rp/)

### Відповідність двигунів/підключення

Мотори повинні бути підключені до контролера польоту відповідно до стандартних інструкцій, наданих BlueRobotics для цього транспортного засобу.

Транспортний засіб буде відповідати конфігурації, описаній в [Довіднику з конструкції літальних апаратів](../airframes/airframe_reference.md#vectored-6-dof-uuv):

<img src="../../assets/airframes/types/Vectored6DofUUV.svg" width="29%" style="max-height: 180px;" />

- **MAIN1:** двигун 1 проти годинникової стрілки, носова праворуч горизонтальна, пропелер проти годинникової стрілки
- **MAIN2:** двигун 2 проти годинникової стрілки, носова ліворуч горизонтальна, пропелер проти годинникової стрілки
- **MAIN3:** двигун 3 проти годинникової стрілки, корма праворуч горизонтальна, пропелер за годинниковою стрілкою
- **MAIN4:** двигун 4 проти годинникової стрілки, корма ліворуч горизонтальна, пропелер за годинниковою стрілкою
- **MAIN5:** двигун 5 проти годинникової стрілки, носова праворуч вертикальна, пропелер проти годинникової стрілки
- **MAIN6:** двигун 6 проти годинникової стрілки, носова ліворуч вертикальна, пропелер за годинниковою стрілкою
- **MAIN7:** двигун 7 проти годинникової стрілки, корма праворуч вертикальна, пропелер за годинниковою стрілкою
- **MAIN8:** двигун 8 проти годинникової стрілки, корма ліворуч вертикальна, пропелер проти годинникової стрілки

## Конфігурація планера

BlueROV2 не йде з предвстановленою версією з PX4. Вам потрібно:

1. [Встановіть прошивку PX4](../config/firmware.md#installing-px4-main-beta-or-custom-firmware)
1. [Налаштуйте планер](../config/airframe.md). Вам потрібно буде вибрати "BlueROV2 Важка конфігурація" як показано: ![QGC - select airframe for BlueROV2 Heay configuration](../../assets/airframes/sub/bluerov/qgc_airframe.jpg)

<!-- what other tuning/testing/ etc? -->

## Відео

<lite-youtube videoid="1sUaURmlmT8" title="PX4 on BlueRov Demo"/>

<!-- @DanielDuecker on github is good person to ask about this frame -->
