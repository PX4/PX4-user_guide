# Типи транспортних засобів та налаштування

PX4 підтримує численні типи транспортних засобів, включаючи різні конфігурації мультикоптерів, літаків, засобів вертикального злету та посадки(VTOL), наземних засобів, тощо.

Цей розділ пояснює, як збирати, конфігурувати та налаштовувати системи автопілотів на основі PX4 для кожного типу (багато з цих налаштувань є спільними для всіх типів).

:::note
[Vehicle Selection](../getting_started/frame_selection.md) надає високорівневу інформацію про типи транспортних засобів і сценарії використання для яких вони найкраще підходять. :::

## Підтримувані транспортні засоби

Типи рам, які мають розробників, добре тестовані та підтримуються:

- [Multicopters](../frames_multicopter/index.md) (tri-, quad-, hexa-, octa-, and even [omnicopter](../frames_multicopter/omnicopter.md) vehicles)
- [Літаки (Фіксоване крило)](../frames_plane/index.md)
- [VTOL](../frames_vtol/index.md): [Standard VTOL](../frames_vtol/standardvtol.md), [Tailsitter VTOL](../frames_vtol/tailsitter.md), [Tiltrotor VTOL](../frames_vtol/tiltrotor.md)

## Експериментальні транспортні засоби

Експериментальні рами - це ті типи транспортних засобів, які:

- У неї немає технічного обслуговування.
- Не регулярно тестується головною командою розробки.
- Можливо, не тестуються в CI.
- Не має необхідних характеристик для готових до виробництва засобів.
- Може не підтримувати деякі загальні конфігурації для типу транспортного засобу.

Наступні типи транспортних засобів вважаються експериментальними:

- [Дирижаблі](../frames_airship/index.md)
- [Автожири](../frames_autogyro/index.md)
- [Повітряні кулі](../frames_balloon/index.md)
- [Вертоліт](../frames_helicopter/index.md)
- [Марсохід](../frames_rover/index.md)
- [Субмарини](../frames_sub/index.md)

::: info Maintainer volunteers, [contribution](../contribute/index.md) of new features, new frame configurations, or other improvements would all be very welcome! :::

## Інші транспортні засоби

Повний набір підтримуваних типів транспортних засобів і їх конфігурації можна знайти в [Airframes](../airframes/airframe_reference.md).
