# MavlinkTunnel (повідомлення UORB)

MAV_TUNNEL_PAYLOAD_TYPE enum

[вихідний файл](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/msg/MavlinkTunnel.msg)

```c
# MAV_TUNNEL_PAYLOAD_TYPE enum

uint8 MAV_TUNNEL_PAYLOAD_TYPE_UNKNOWN = 0                # Encoding of payload unknown
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED0 = 200    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED1 = 201    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED2 = 202    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED3 = 203    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED4 = 204    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED5 = 205    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED6 = 206    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED7 = 207    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED8 = 208    # Registered for STorM32 gimbal controller
uint8 MAV_TUNNEL_PAYLOAD_TYPE_STORM32_RESERVED9 = 209    # Registered for STorM32 gimbal controller

uint64 timestamp         # Time since system start (microseconds)
uint16 payload_type      # A code that identifies the content of the payload (0 for unknown, which is the default). Якщо цей код менший за 32768, це «зареєстрований» тип корисного навантаження, і відповідний код слід додати до переліку MAV_TUNNEL_PAYLOAD_TYPE. Розробники програмного забезпечення можуть реєструвати блоки типів за потребою. Коди, більші за 32767, вважаються локальними експериментами і не повинні перевірятися у будь-якій широко розповсюдженій кодовій базі.
uint8 target_system      # System ID (can be 0 for broadcast, but this is discouraged)
uint8 target_component   # Component ID (can be 0 for broadcast, but this is discouraged)
uint8 payload_length     # Length of the data transported in payload
uint8[128] payload       # Data itself

```
