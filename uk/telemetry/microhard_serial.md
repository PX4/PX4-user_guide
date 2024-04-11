# Microhard Serial Telemetry Radios

[Мікрорадіопередавачі Microhard Pico Serial](http://microhardcorp.com/P900.php) інтегрують модуль радіо [Microhard Pico Serial](http://microhardcorp.com/P900.php) P900 RF.

Це відносно невеликий за розміром та недорогий радіопередавач, який підтримує такі режими як точка-точка, точка-багатоточка та мережеві режими. Він має налаштований вихідну потужність та також може бути налаштований на використання корекції помилок передачі. Радіопередавачі також можна замовити з підтримкою безпечних/шифрованих каналів, хоча це підлягає обмеженням на експорт.

Виробники зазвичай налаштовують радіопередавачі в режимі пір-до-пір та встановлюють таку саму швидкість передачі даних, яка очікується PX4 та _QGroundControl_ (57600 бод). Це дозволяє підключати радіопередавачі до звичайних портів телеметрії на контролерах польоту Pixhawk (`TELEM1` або `TELEM2`) разом із автоматичним виявленням з'єднання в _QGroundControl_.

Кілька виробників пропонують рішення на основі цих радіопродуктів:

- [ARK Electron Microhard Серійний Телеметрійний Радіо](../telemetry/ark_microhard_serial.md)
- [Holybro Microhard P900 Телеметрійне Радіо](../telemetry/holybro_microhard_p900_radio.md)

## Range Tradeoffs

Дальність передачі радіо залежить від кількох факторів, включаючи: швидкість передачі даних, вихідну потужність, режим, включено корекцію помилок передачі, включено шифрування, використання антени тощо.

Вибір цих параметрів є компромісом:

- збільшення швидкості передачі даних зменшує дальність радіопередачі.
- збільшення потужності радіо збільшує дальність, але зменшує час польоту.
- точка-багатоточка означає можливість однієї земної станції, яка спілкується з кількома транспортними засобами, але збільшує пропускну спроможність каналу.
- мережеві конфігурації надають подібний зручність і вартість.

Максимальна заявлена дальність в специфікаціях становить приблизно 60 км. ARK Electron пропонує приблизно 8 км дальності з вихідною потужністю, встановленою на рівні 1 Вт та використанням налаштувань за замовчуванням.

## Конфігурація

For convenience, radios are usually default-configured so that they can be used with PX4 and _QGroundControl_ out of the box.

Developers can modify the configuration. The only "requirement" is that the: ground radio, air radio, PX4, and _QGroundControl_ must all be set to use the **same** baud rate (and of course each MAVLink system must have a unique System ID).

### PX4 Configuration

PX4 is configured to use `TELEM1` for telemetry radios, with a default baud rate of 57600. You can configure PX4 to use any other free serial port a different baud rate, by following the instructions in [MAVLink Peripherals](../peripherals/mavlink_peripherals.md).

### QGroundControl Configuration

QGroundControl autodetects a serial telemetry connection with the baud rate 57600.

For any other rate you will need to add a serial comms link that sets the rate that was used. See [Application Settings > Comms Links](https://docs.qgroundcontrol.com/master/en/qgc-user-guide/settings_view/settings_view.html).

### Radio Configuration

Microhard serial radios are configured using the _PicoConfig_ application (Windows only). This can be downloaded here: [PicoConfig-1.7.zip](https://arkelectron.com/wp-content/uploads/2021/04/PicoConfig-1.7.zip) (ARK Electron) or [picoconfig-1-10](https://docs.holybro.com/telemetry-radio/microhard-radio/download) (Holybro).

In point-to-point operating modes, there must be a master to provide network synchronization for the system, so one radio should be configured to PP master and another should be configured to PP remote.

The screen shots below show the default radio configuration settings for connecting to PX4 and _QGroundControl_.

<img src="../../assets/hardware/telemetry/holybro_pico_config.png" width="400px" title="Holybro Pico Config" />
<img src="../../assets/hardware/telemetry/holybro_pico_config1.png" width="400px" title="Holybro Pico Config" />

The [Pico Series P900.Operating Manual.v1.8.7](https://github.com/PX4/PX4-user_guide/raw/main/assets/hardware/telemetry/Pico-Series-P900.Operating-Manual.v1.8.7.pdf) has additional information on radio configuration (including mesh and multipoint modes).

### Mesh and Multipoint Modes

Mesh and point to multi-point modes are supported, but all vehicles must have a unique Mavlink ID.

Додатково:

- At the highest link rate, with no FEC, we can have 201 drones in one mesh system transmitting 80 bytes once a second.
- You can have multiple networks working together at the same time without mutual interference using "co-located systems". For example, to deploy more than 500 vehicles you would need to deploy three P900 mesh coordinators, each serving up to 201 drones in their respective local networks.
