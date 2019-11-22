# Connector Types

Drones (and RC vehicles in general) use many different cables and connector types.

This topic identifies some of the more common connectors used, in particular those used in Pixhawk series flight controllers.

> **Note** There are far more connector types that we can cover here, but if you encounter any on your drone equipment, feel free to add them.


## Flight Controller Connectors

Pixhawk flight controllers commonly use [JST connectors](#jst_overview) from the series: [SH](http://www.jst-mfg.com/product/detail_e.php?series=231), [GH](http://www.jst-mfg.com/product/detail_e.php?series=105), [SUR](http://www.jst-mfg.com/product/detail_e.php?series=246).
Older Pixhawk controllers (FMUv2/3DR Pixhawk 1) used the [Hirose DF13 Series](https://www.digikey.com.au/en/product-highlight/h/hirose/df13-series).

![Connector Types - GH, SH, SUR, DF13](../../assets/hardware/connector_types/connectors_gh_sh.jpg)

The table below shows some specific examples:

Connector | Cable |  Part | Description
--- | --- | --- | ---
<span id="jst_sh_10"></span>10-pin SH ![10-pin JST SH](../../assets/hardware/connector_types/sh_10pin.jpg) | ![cable 10-pin JST SH](../../assets/hardware/connector_types/cable_sh_10pin.jpg) | [SM10B-SRSS-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SM10B-SRSS-TB-LF-SN/455-1810-2-ND/926716) | NXP RT, Modal AI 
<span id="arm_10"></span>10-pin ARM ![10-pin ARM](../../assets/hardware/connector_types/arm10pin.jpg)    | ? | ? | FMUv2 (3DR Pixhawk 1) 
<span id="jst_sur_6"></span>6-pin SUR ![6-pin JST SUR](../../assets/hardware/connector_types/sur_6pin.jpg) | ![6 pin SUR cable](../../assets/hardware/connector_types/cable_sur_6pin.jpg) | ? [SM06B-SURS-TF(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SM06B-SURS-TF-LF-SN/455-3591-1-ND/9921998) | Cube
<span id="jst_sh_6"></span>6-pin SH ![6-pin JST SH](../../assets/hardware/connector_types/sh_6pin.jpg)   | ![6-pin SH cable](../../assets/hardware/connector_types/cable_sh_6pin.jpg) | [SM06B-SRSS-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/455-1806-1-ND/926877) |[Pixhawk mini debug connector (DCD-Mini)](https://pixhawk.org/pixhawk-connector-standard/#dronecode_debug). Used in debug port for FMUv4/FMUv5.
<span id="jst_gh_6"></span>6-pin GH ![6-pin JST GH](../../assets/hardware/connector_types/gh_6pin.jpg)   | ![6-pin cable JST GH](../../assets/hardware/connector_types/cable_gh_6pin.jpg) | [SM06B-GHS-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SM06B-GHS-TB-LF-SN/455-1568-2-ND/807790) | [Pixhawk Mini (DCM) connector standard](https://pixhawk.org/pixhawk-connector-standard/#dronecode_mini). Also (mis)used as debug port for early FMUv4 devices.
<span id="jst_gh_7"></span>7-pin GH ![7-pin JST GH](../../assets/hardware/connector_types/gh_7pin_nxp.jpg) | ![7 pin GH cable](../../assets/hardware/connector_types/cable_gh_7pin.jpg) | [SM07B-GHS-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SM07B-GHS-TB-LF-SN/455-1569-2-ND/807791) | NXP Debug port
<span id="jst_sur_10"></span>10-pin SUR ![10-pin JST SUR](../../assets/hardware/connector_types/sur_10pin.jpg) | ![10 pin SUR cable](../../assets/hardware/connector_types/cable_sur_10pin.jpg) | [SM10B-SURS-TF(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SM10B-SURS-TF-LF-SN/455-2041-6-ND/1963588) | FMUv5x Debug port
<span id="hirose_df13_6"></span>6-pin DF13 ![6-pin Hirose DF13](../../assets/hardware/connector_types/hirose_df13_6pin.jpg) | ![5 pin DF13 cable](../../assets/hardware/connector_types/cable_df13_5pin.jpg) | [DF13-6P-1.25DSA](https://www.digikey.com.au/product-detail/en/hirose-electric-co-ltd/DF13-6P-1.25DSA/H2195-ND/241769) | Pixhawk 1 connectors.

## Finding Compatible Cables/Connectors {#compatible_cables}

The easiest way to find a compatible connector is to search on the manufacturer part number in [Digi-Key](https://www.digikey.com/) (e.g. *SM10B-SRSS-TB(LF)(SN)*).
DigiKey usually shows compatible *Mating Products* and *Associated Product*.
For example, the [JST SH 6-pin connector](#jst_sh_6) has two compatible connectors:
- [SHR-06V-S-B](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/SHR-06V-S-B/455-1381-ND/759870): Has little handles (easier to get out). Use on open boards. 
- [SHR-06V-S](https://www.digikey.com.au/product-detail/en/jst-sales-america-inc/SHR-06V-S/455-1396-ND/759885): More space efficient. Use if the hole in the case is very narrow.

Once you have the part number you can search for the connector more widely (e.g. on Ebay).

Other ways to search are on manufacturer, series, pin number and/or pitch (e.g. "JST SH 6pin" and "JST 1.0mm 6 pin").

## Background

### JST Connectors {#jst_overview}

JST ("Japanese Solderless Terminal") connectors are categorized by "series" (there are a [many different JST connector series](http://www.jst-mfg.com/product/search_e.php?type=1&id=1&page=1)).
All connectors in a series share the same pin shape/size, inter-pin spacing ("pitch"), maximum current/voltage, and wire-size range.
The connectors within a series vary by number of pins, and in the size, shape, orientation, of the housing.

The table below show the JST series most commonly used on Pixhawk-based drones (all of these have just one row of pins).

JST Series | Pitch (mm) | Pin Shape | Wire Size (AWG) | Max current (A) | Max Voltage (V) | Lock | Description
--- | --- | --- | --- | --- | ---
[SH](http://www.jst-mfg.com/product/detail_e.php?series=231) | 1.0  | blade (rectangle) | 32 - 28 | 1 | 50 | N | Crimp style connector. Compact type.
[GH](http://www.jst-mfg.com/product/detail_e.php?series=105) | 1.25 | ? | 30 - 26  | 1 | 50 | Y | Crimp style connectors with secure locking device. 
[SUR](http://www.jst-mfg.com/product/detail_e.php?series=246) | 0.9 | ? | 32 - 36 | 0.5 | 30 | ? | Disconnectable type. IDC style, Compact type. Low-profile type.
