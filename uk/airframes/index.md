# Vehicle Types & Setup

PX4 підтримує численні типи транспортних засобів, включаючи різні конфігурації мультикоптерів, літаків, засобів вертикального злету та посадки(VTOL), наземних засобів, тощо.

Цей розділ пояснює, як збирати, конфігурувати та налаштовувати системи автопілотів на основі PX4 для кожного типу (багато з цих налаштувань є спільними для всіх типів).

:::info
[Basic Concepts > Drone Types](../getting_started/px4_basic_concepts.md#drone-types) provides high level information about the types of vehicles and the use cases for which they are best suited.
:::

## Підтримувані транспортні засоби

Типи рам, які мають розробників, добре тестовані та підтримуються:

- [Multicopters](../frames_multicopter/index.md) (tri-, quad-, hexa-, octa-, and even [omnicopter](../frames_multicopter/omnicopter.md) vehicles)
- [Planes (Fixed-Wing)](../frames_plane/index.md)
- [VTOL](../frames_vtol/index.md): [Standard VTOL](../frames_vtol/standardvtol.md), [Tailsitter VTOL](../frames_vtol/tailsitter.md), [Tiltrotor VTOL](../frames_vtol/tiltrotor.md)

## Експериментальні апарати

Експериментальні рами - це ті типи транспортних засобів, які:

- У неї немає технічного обслуговування.
- Не регулярно тестується головною командою розробки.
- Можливо, не тестуються в CI.
- Не має необхідних характеристик для готових до виробництва засобів.
- Може не підтримувати деякі загальні конфігурації для типу транспортного засобу.

Наступні типи транспортних засобів вважаються експериментальними:

- [Airships](../frames_airship/index.md)
- [Autogyros](../frames_autogyro/index.md)
- [Balloons](../frames_balloon/index.md)
- [Helicopter](../frames_helicopter/index.md)
- [Rovers](../frames_rover/index.md)
- [Submarines](../frames_sub/index.md)

:::info
Maintainer volunteers, [contribution](../contribute/index.md) of new features, new frame configurations, or other improvements would all be very welcome!
:::

## Інші транспортні засоби

The complete set of supported vehicle types and their configurations can be found in the [Airframes Reference](../airframes/airframe_reference.md).
