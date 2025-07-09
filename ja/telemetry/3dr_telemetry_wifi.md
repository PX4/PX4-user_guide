---
canonicalUrl: https://docs.px4.io/main/ja/telemetry/3dr_telemetry_wifi
---

# 3DR WiFi Telemetry (Discontinued)

:::note
This product is no longer manufactured or available from 3DR.
:::

The *3DR WiFi Telemetry Radio* is supported by PX4. Simply connect it to the flight controller's `TELEM1` port to create a WiFi "hotspot" for the vehicle with the details below:

```sh
essid: APM_PIX
password: 12345678
```

Connect your ground control station to the above WiFi SSID. After connecting the vehicle should automatically be detected and connect to *QGroundControl*.

![3DR Wifi Telemetry Radio 1](../../assets/hardware/telemetry/3dr_telemetry_wifi_1.jpg) ![3DR Wifi Telemetry Radio 2](../../assets/hardware/telemetry/3dr_telemetry_wifi_2.jpg)
