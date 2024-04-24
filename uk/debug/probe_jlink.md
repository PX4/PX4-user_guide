# JLink Debug Probe

The [J-Link debug probe][jlink] is a closed-source, commercial hardware probe which supports almost all ARM Cortex-M devices. Для роботи цього зонду вам потрібно встановити [драйвери J-Link][drivers]:

```sh
# Ubuntu
wget --post-data "accept_license_agreement=accepted" https://www.segger.com/downloads/jlink/JLink_Linux_x86_64.deb
sudo dpkg -i JLink_Linux_x86_64.deb
# macOS
brew install segger-jlink
```

Після встановлення ви можете запустити сервер за допомогою:

```sh
JLinkGDBServer -if swd -device STM32F765II
```

Можливо, перед вами відобразиться запит на оновлення JLink, що й рекомендується зробити, а потім вказати, з яким пристроєм він взаємодіє. Перевірте документацію вашого автопілота для конкретного пристрою.

Щойно ви це виконаєте, сервер GDB повинен почати слухати порт `2331`, наприклад, так:

```sh
Checking target voltage...
Target voltage: 3.28 V
Listening on TCP/IP port 2331
Connecting to target...
Connected to target
Waiting for GDB connection...
```

Тепер ви можете запустити GDB з точним elf-файлом, який зараз вивантажений на автопілот (у окремому терміналі):

```sh
arm-none-eabi-gdb build/px4_fmu-v5x_default/px4_fmu-v5x_default.elf -ex "target extended-remote :2331"
```

Тепер ви відключилися.

Щоб замість цього використовувати IDE, див. інструкції для [Eclipse](../debug/eclipse_jlink.md) або [VSCode](../dev_setup/vscode.md#hardware-debugging). Дивіться [Embedded Debug Tools][emdbg] для отримання додаткових опцій налагодження.

<a id="segger_jlink_edu_mini"></a>

### Embedded Debug Tools

[Segger JLink EDU Mini](https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/) - це недорогий і популярний SWD зонд для відлагодження. Роз'єм підключення зонду виглядає так, як на зображенні нижче (підключіться до нього за допомогою міні-роз'єму ARM з 10 контактами, наприклад, [FTSH-105-01-F-DV-K](https://www.digikey.com/products/en?keywords=SAM8796-ND)).

![connector_jlink_mini.png](../../assets/debug/connector_jlink_mini.png)

Схема підключення контактів для з'єднання J-Link Edu Mini з [Pixhawk Debug Mini](swd_debug.md#pixhawk-debug-mini) показана нижче.

| Pin | Signal     | JLink |
| ---:|:---------- | -----:|
|   1 | **VREF**   |     1 |
|   2 | Console TX |       |
|   3 | Console RX |       |
|   4 | **SWDIO**  |     2 |
|   5 | **SWDCLK** |     4 |
|   6 | **GND**    |  3, 5 |

Зверніть увагу, що жоден з JLink debug зондів не має вбудованого послідовного з'єднання, тому вам потрібно підключити консоль окремо.

<!-- Image of SWD cable and connector to debug port - proposed? -->

[jlink]: https://www.segger.com/products/debug-probes/j-link/
[drivers]: https://www.segger.com/downloads/jlink/
[emdbg]: https://pypi.org/project/emdbg/
