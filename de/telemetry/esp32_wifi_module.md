# ESP32 WiFi Modul

Das ESP32 ist über viele Shops in DACH Raum verfügbar. Es bietet WLAN, UART, SPI und I2C Verbindungen für wenige Euro. Es stellt damit eine der günstigsten Möglichkeiten dar Telemetrie von einem UAV zu senden.
Das ESP32 kann mit allen PX4 oder iNAV kompatiblen flight controllern betrieben werden.

## DroneBridge für ESP32

**DroneBridge für ESP32 ist eine transparente und bi-direktionale WLAN/UART Brücke.**  
Im gegensatz zum original DroneBridge (für das Raspberry Pi) 
nutzten wir hier übliche WLAN Verbindungen und unterstützen keine Videoübertragung.
Die typische WLAN Reichweite ist in etwa ~50m-200m abhängig von den Antennen. Größere und direktionale Antennen können die Reichweite deutlich erhöhen.

![DroneBridge für ESP32 Verbindungskonzept](https://raw.githubusercontent.com/DroneBridge/ESP32/master/wiki/db_ESP32_setup.png)

## Empfohlene Hardware

Beinahe jedes ESP32 Entwicklungskit ist mit DroneBridge für ESP32 kompatibel. Bevorzugt sollten Kits mit einem externen Antennenanschluss verwendet werden. Diese bieten eine höhere Reichweite.

**Die meisten ESP32 Entwicklungskits unterstützen nur 3.3V UART Spannung. Manche flight controller (z.B. Pixhawk 4) geben aber 5V aus. In diesem Fall muss die Spannung mit einem Spannungsregler angepasst werden.**

Module und DevKits mit 3.3V Toleranz:
* ESP32-WROOM-32UE
* ESP32-WROOM-32E
* AZDelivery DevKit C
* NodeMCU style DevKit

Entwicklungskits mit einem IPEX Anschluss für eine externe Antenne besitzen meistens auch eine PCB Antenne. Diese ist üblicherweise aktiviert. Um den IPEX Anschluss nutzen zu können, muss meistens ein Wiederstand umgelötet werden.

## Download und Flash der Firmware

[Lade die Firmware aus dem GitHub repository](https://github.com/DroneBridge/ESP32/releases) und [folge den Anweisungen zum flashen des ESP32](https://github.com/DroneBridge/ESP32#installationflashing-using-precompiled-binaries). Die Anweisungen auf der GitHub Seite sind immer aktuell. 

:::tip
[Folge den Anweisungen zum flashen der Firmware im GitHub Repository.](https://github.com/DroneBridge/ESP32#installationflashing-using-precompiled-binaries) Die genauen Parameter zum flashen können sich von Version zu Version unterscheiden.
:::
 
Der einfachheitshalber wird im folgenden eine Kurzanleitung gegeben:
* [Lade die vorkompilierte Firmware herunter.](https://github.com/DroneBridge/ESP32/releases)
* Verbinde dein ESP32 mit dem Computer über eine USB/Serielle Schnittstelle (Die meisten Entwicklungskits besitzen bereits einen derartigen USB Ein/Ausgang).
* Lösche den Flashspeicher und flashe die DroneBridge für ESP32 firmware auf das ESP32:
  * Mit [Espressif Flash Download Tool](https://www.espressif.com/en/support/download/other-tools) (nur Windows)  
  * Mit esp-idf/esptool (alle Betriebssysteme)  
* Schalte das ESP32 aus und wieder ein.
* [Verbinde dich mit dem WLAN "DroneBridge for ESP32" und konfiguriere das ESP32 für einen Anwendungsfall](#configuring-dronebridge-for-esp32)

## Konfiguration von DroneBridge für ESP32

### Standard Konfiguration
* SSID: `DroneBridge for ESP32`
* Passwort: `dronebridge`
* Transparent/MAVLink
* UART baud rate `115200`
* UART TX pin `17`
* UART RX pin `16`
* Gateway IP: `192.168.2.1`

### Konfigurationsmöglichkeiten & Weboberfläche

Das ESP32 kann über eine Weboberfläche konfiguriert werden.  
Verbinde dich mit dem ESP32 via WLAN. In der Adresszeile des Browsers gebe folgende Adresse ein: `dronebridge.local`, `http://dronebridge.local` oder `192.168.2.1`. HTTPS wird nicht unterstützt.  
Bei Verbindungsproblemen stelle sicher, dass du nur mit dem ESP32 verbunden bist und nicht noch zusätzlich mit anderen Netzwerken (Mobilfunk, LAN, anderes WLAN etc.).

![DroneBridge für ESP32 Weboberfläche](https://raw.githubusercontent.com/DroneBridge/ESP32/master/wiki/dbesp32_webinterface.png)

:::tip
Für manche Einstellungen muss das ESP32 neu gestartet werden, damit sie übernommen werden.
:::

## Verkabelung/Anschluss an einen Flight Controller
Der Anschluss an einen Flight Controller erfolgt über UART (z.B. an TELEM1/2). Dies unterscheidet sich nicht von anderen Peripherie-Komponenten. Daher wird hier nicht im Detail darauf eingegangen. Im Internet finden sich genügend Anleitungen zu diesem Thema.

* Verbinde den UART des ESP32 mit dem UART deines flight controllers (z.B. TELEM 1 oder TELEM 2). Stelle sicher, dass beide Geräte mit dem selben Spannungslevel am UART arbeiten. Die meisten ESP32 DevKits unterstützen nur 3.3V!
  * TX an RX
  * RX an TX
  * GND an GND
  * Stabile 3.3V oder 5V Stromversorgung für das ESP32 (abhängig davon was das Entwicklingsboard unterstützt)
* Konfiguriere deinen flight controller so, dass er auf dem verbundenen Anschluss das entsprechende Protokol ausgibt.

:::tip
Bei manchen ESP32 DevKits sind die Pins falsch beschriftet. Stelle sicher, dass du die richtigen Pins verwendest und konfiguriert hast.
:::

## Verbindung mit Bodenstationen wie QGroundControl

Die folgenden Verbindungsoptionen sind verfügbar:
* UDP unicast an Port `14550` zu allen mit dem ESP32 verbundenen Geräten.
* TCP auf Port `5760`

:::tip
DroneBridge für ESP32 leitet alle Daten automatisch an alle verbundenen Geräte weiter. Dabei wird UDP an Port 14550 genutzt. QGroundControl sollte die Verbindung automatisch erkennen und eine Konfiguration überflüssig machen. Alternativ kann sich über TCP verbunden werden.
:::

## Problembehandlung

* Vor dem flashen eines neuen Release sollte der Flashspeicher immer zuerst gelöscht werden (`idf.py erase_flash`)
* Überprüfe, ob die UART Pins auf dem Board richtig beschriftet wurden.
* Verwende die IP-Adresse in der Adresszeile des Browsers: `http://192.168.2.1`. Kein HTTPS! In manchen Fällen muss man sich von allen anderen Netzwerken trennen, um die Weboberfläche erreichen zu können. Z.B. bei Handys oder bei einer zweiten WLAN/LAN Verbindung.
* Wenn dein Router den selben Adressbereich wie DB für ESP32 nutzt, musst du die Gateway IP Adresse in der Weboberfläche ändern. Z.b. zu `192.168.5.1`.

## API
DroneBridge für ESP32 bietet eine REST:API über die Einstellungen und der Status gelesen und gesetzt werden können. Dabei ist man nicht an die Optionen aus dem Webinterface (e.g. baud rate) gebunden. Die API kann also verwendet werden, um beliebige baud rates zu setzen und DB für ESP32 in dein System zu integrieren.

**Abfrage der Einstellungen**
```http request
http://dronebridge.local/api/settings/request
```

**Abfrage des Status**
```http request
http://dronebridge.local/api/system/stats
```

**Neustart initiieren**
```http request
http://dronebridge.local/api/system/reboot
```

**Einstellungen ändern:** Ein gültiges JSON mit den neuen Einstellungen an das ESP32 senden
```json
{
  "wifi_ssid": "DroneBridge ESP32",
  "wifi_pass": "dronebridge",
  "ap_channel": 6,
  "tx_pin": 17,
  "rx_pin": 16,
  "telem_proto": 4,
  "baud": 115200,
  "msp_ltm_port": 0,
  "ltm_pp": 2,
  "trans_pack_size": 64,
  "ap_ip": "192.168.2.1"
}
```
an
```http request
http://dronebridge.local/api/settings/change
``` 