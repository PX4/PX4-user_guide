# Камери

Cameras are important for many [payload use cases](../payloads/use_cases.md), including mapping and surveying, surveillance, search & rescue, crop health and pest detection, and so on.
They are commonly mounted on a [gimbal](../advanced/gimbal_control.md) that can provide camera stabilisation, point tracking, and movement independent of the hosting vehicle.

## Типи камер

PX4 інтегрується з трьома типами камер:

- [Камери MAVLink](../camera/mavlink_v2_camera.md), які підтримують [Протокол камери v2](https://mavlink.io/en/services/camera.html) (**РЕКОМЕНДОВАНО**).
- [Прості камери MAVLink](../camera/mavlink_v1_camera.md), які підтримують старі протоколи [Протокол Камери v1](https://mavlink.io/en/services/camera.html).
- [Cameras attached to flight controller outputs](../camera/fc_connected_camera.md), which are controlled using the [Camera Protocol v1](https://mavlink.io/en/services/camera.html).

[Камери MAVLink](../camera/mavlink_v2_camera.md) рекомендовані, оскільки вони забезпечують широкий доступ до функцій камери, використовуючи простий та послідовний набір команд/повідомлень.
If a camera does not support this prototol, a [camera manager](../camera/mavlink_v2_camera.md#camera-managers) running on a companion computer can be used to interface between MAVLink and the camera's native protocol.

## Дивіться також

- [Gimbal (кріплення для камери)](../advanced/gimbal_control.md)
- [Інтеграція/Архітектура камери](../camera/camera_architecture.md) (Розробники PX4)
