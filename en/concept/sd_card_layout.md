---
canonicalUrl: https://docs.px4.io/main/en/concept/sd_card_layout
---

# PX4 SD Card Layout

The PX4 SD Card is used for storing configuration files, flight logs, mission information etc. 

:::tip
The SD card should be FAT32 formatted for use with PX4 (this is the default for SD cards).
We recommend that you reformat cards that are using a different file system.
:::

The directory structure/layout is shown below.

Directory/File(s) | Description
--- | ---
`/etc/` | Extra config (+ mixers). See [System Startup > Replacing the System Startup](../concept/system_startup.md#replacing-the-system-startup).
`/etc/mixers/` | [Mixers](../concept/mixing.md)
`/log/` | Full [flight logs](../dev_log/logging.md)
`/mission_log/` | Reduced flight logs
`/fw/` | [UAVCAN](../uavcan/README.md) firmware
`/uavcan.db/` | UAVCAN DB + logs
`/params` | Parameters (if not in FRAM/FLASH)
`/dataman` | Mission storage file
`/fault_<datetime>.txt` | Hardfault files
`/bootlog.txt` | Boot log file
