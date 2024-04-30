# Зонд налагодження STLink

[STLinkv3-MINIE](https://www.st.com/en/development-tools/stlink-v3minie.html) дешевий, швидкий та високоякісний зонд для налагодження який може працювати як самостійний консольний та налагоджувальний передавач для розробника PX4:

- Тільки єдине USB-C з'єднання для Reset, SWD, SWO та послідовного входу у дуже компактному виконанні!
- З'єднання по протоколах SWD та SWO - до 24 МГц. Послідовне з'єднання - до 16 мега бод. Цільова напруга від 1.65В до 3.6В. З'єднання по високошвидкісному протоколу USB2 до 480 Мбіт/c.
- Керований програмним забезпеченням STLink або OpenOCD із широкою підтримкою пристроїв.
- Набагато дешевше (<15€) ніж адаптер налагодження Pixhawk (~20€) з JLink EDU mini (~55€) або JLink BASE (~400€) при кращих апаратних характеристиках.

Зонд STLink постачається без адаптера для роботи з контролерами польоту Pixhawk. Розділ [Адаптер порту налагодження Pixhawk](#pixhawk-debug-port-adapter) пояснює як можна створити власний (потрібно трохи паяння).

::: info
The [Адаптер налагодження CUAV C-ADB Pixhawk](../debug/swd_debug.md#cuav-c-adb-pixhawk-debug-adapter) (~65€) постачається з STLinkv3-MINIE! Він має роз'єм для [Pixhawk Debug Full](../debug/swd_debug.md#pixhawk-debug-full) SH порту з 10 контактами (але не для порту [Pixhawk Debug Mini](../debug/swd_debug.md#pixhawk-debug-mini)).
:::

## Налаштування налагодження

STLink надає [GDB сервер за допомогою OpenOCD](https://openocd.org/doc-release/html/index.html):

```sh
# Ubuntu
sudo apt install openocd
# macOS
brew install open-ocd
```

Ви можете запустити сервер GDB в новому терміналі:

```sh
openocd -f interface/stlink.cfg -f target/stm32f7x.cfg
```

Файл налаштувань повинен бути:

- FMUv2-v4: `-f target/stm32f4x.cfg`
- FMUv5: `-f target/stm32f7x.cfg`
- FMUv6: `-f target/stm32h7x.cfg`

Потім можна під'єднатися до порту 3333 через GDB:

```sh
arm-none-eabi-gdb build/px4_fmu-v5x_default/px4_fmu-v5x_default.elf -ex "target extended-remote :3333"
```

Дивіться [Вбудовані інструменти налагодження][emdbg] для розширених варіантів налаштування налагодження.

## Адаптер порту налагодження Pixhawk

Для з'єднання з портом налагодження Pixhawk, потрібно спаяти адаптер (якщо не використовуєте [адаптер налагодження CUAV](../debug/swd_debug.md#cuav-c-adb-pixhawk-debug-adapter)).

Для цієї інструкції паяння вам знадобиться:

- 1x [STLinkv3-MINIE](https://www.st.com/en/development-tools/stlink-v3minie.html).
- 1x роз'єм кабелю для сполучення з [JST SM10B (Full)](https://www.digikey.com/products/en?keywords=A10SR10SR30K203A) або [JST SM06B (Mini)](https://www.digikey.com/products/en?keywords=A06SR06SR30K152A).

  Рекомендуємо купувати повністю зібрані кабелі з двома роз'ємами з обох боків.

- 1x паяльник та припій.
- Щипці, плоскогубці та пінцет.

[Порт налагодження Pixhawk стандартизовано у документі DS-009](https://github.com/pixhawk/Pixhawk-Standards/blob/master/DS-009%20Pixhawk%20Connector%20Standard.pdf) та повинен бути з'єднаний з роз'ємом CN2 плати з'єднання STLinkv3-MINIE Board-To-Board (BTB). Зіставлення контактів описано тут:

| № контакту SM10B (Full) | № контакту SM06B (Mini) | Порт Pixhawk       | STLinkv3   | № контакту BTB |
| -----------------------:| -----------------------:|:------------------ |:---------- | --------------:|
|                       1 |                       1 | **VREF**           | VCC        |             10 |
|                       2 |                       2 | TX консолі (вихід) | TX (вхід)  |              8 |
|                       3 |                       3 | RX консолі (вхід)  | RX (вихід) |              7 |
|                       4 |                       4 | **SWDIO**          | TMS        |              3 |
|                       5 |                       5 | **SWCLK**          | CLK        |              4 |
|                       6 |                         | SWO                | TDO        |              5 |
|                       7 |                         | GPIO1              |            |                |
|                       8 |                         | GPIO2              |            |                |
|                       9 |                         | nRST               | RST        |              9 |
|                      10 |                       6 | **GND**            | GND        |              6 |

Контакти GPIO1/2 не підтримуються STLinkv3 та ми рекомендуємо користуватись цифровим ITM профілюванням через SWO що є найбільш гнучким та підтримує точний вимір часу між циклами.

Ви можете спаяти короткий або довгий кабель для BTB роз'єму. Короткий кабель краще підходить для високошвидкісного зв'язку, але його складніше паяти. Ми рекомендуємо спочатку спаяти довгий кабель і перевірити, наскільки швидким буде з'єднання з цільовим об'єктом.

::: info
Ця інструкція написана для 10-контактного порту налагодження. Якщо ви хочете спаяти мініверсію з 6 контактами, просто пропустіть сигнали, яких у вас немає. STLink підтримує будь-який інтерфейс налагодження на основі SWD/JTAG, тому ви можете адаптувати цю інструкцію для будь-якого роз'єму, який у вас є. Зонди налагодження настільки дешеві, що ви можете мати по одному на кожен роз'єм замість використання адаптерів.
:::

STLinkv3-MINIE постачається ось таким чином.

![](../../assets/debug/stlinkv3_minie_p1.jpeg)

Розпакуйте плату і перевірте її на наявність пошкоджень. Під'єднайте її до живлення та переконайтеся, що вона вмикається правильно.

![](../../assets/debug/stlinkv3_minie_p2.jpeg)

### Короткий кабель

Короткий кабель потребує інструмент для обрізання та зачистки кабелю та трохи більше навичок пайки. Однак це робить увесь зонд налагодження ще меншим.

Зберіть 10-контактний роз'єм без GPIO1/2. Якщо у вас вже є зібраний кабель, обережно видаліть два дроти GPIO1/2 за допомогою пінцета, піднімаючи штирі, які утримують їх на місці. Відріжте дроти на невелику довжину у приблизно 2 см (1 дюйм) та зачистить їх.

![](../../assets/debug/stlinkv3_minie_p3.jpeg)

Залудіть як роз'єм BTB на STLink так і кабелі.

![](../../assets/debug/stlinkv3_minie_p4.jpeg)

Спочатку припаяйте сигнальні дроти для GND та VCC, щоб вирівняти роз'єм паралельно до краю. Потім припаяйте контакти TX та RX. Припаяйте з'єднання RST останнім.

![](../../assets/debug/stlinkv3_minie_p5.jpeg)

Переверніть STLink і припаяйте три дроти, що залишились. Почніть з SWDIO->TMS, потім SWCLK->CLK, і нарешті SWO->TDO.

![](../../assets/debug/stlinkv3_minie_p6.jpeg)

### Довгий кабель

Довгий кабель особливо корисний, якщо ви використовуєте вже зібрані кабелі, оскільки він усуває потребу в обрізанні або знятті ізоляції з проводів.

Carefully remove the two GPIO1/2 cables from one connector of the cable. Then remove all cables from the other connector. You are left with a eight crimped connectors at the end of the wires.

![](../../assets/debug/stlinkv3_minie_p7.jpeg)

Tin the crimped cable connectors and BTB connector and solder the crimped connectors directly to the STLinkv3. Be careful to not create shorts between the cables, as the crimped connectors are quite large.

![](../../assets/debug/stlinkv3_minie_p8.jpeg)

### Testing

You should now test your debug probe to ensure you do not have any electrical shorts.

1. Plug the probe into your target via the Pixhawk Debug Port.
2. Test the serial port with a program of your choice.
3. Test the SWD and RST connection via \[OpenOCD\]\[https://openocd.org\] or [STLink](https://www.st.com/en/development-tools/stsw-link004.html) software.
4. Test the SWO connection via \[Orbuculum\]\[https://github.com/orbcode/orbuculum\].

See the [Embedded Debug Tools][emdbg] for more information about software support for the PX4 FMUv5 and FMUv6 flight controllers.

### Make it Smaller

This step removes the 14-pin debug interface on the back of the STLinkv3-MINIE and adds shrink tubing around the entire device to improve handling and prevent shorting the STLink against metal parts or PCBs. This step is strictly optional and requires:

- 1x 20mm shrink tubing about 5cm long.
- 1x flat tongs to hold the STLinkv3 by the USB-C port.
- 1x fine cutting pliers or soldering iron.
- 1x heat gun.

Use the pliers to gently pull off the plastic part of the STDC14 connector. This leaves you with only the connector pins.

![](../../assets/debug/stlinkv3_minie_p9.jpeg)

Using the fine pliers, cut off the connector pins being very careful not to damage the PCB or any components on the PCB. Alternatively, you can solder these connector pin off the PCB, but it can take longer.

![](../../assets/debug/stlinkv3_minie_p10.jpeg)

Rotate the STLinkv3 to cut off the other row, again being very careful to not damage it.

![](../../assets/debug/stlinkv3_minie_p11.jpeg)

Cut a ~5cm (~2in) long piece of shrink tube. It should be flush with the USB-C connector and extend a little beyond the end.

![](../../assets/debug/stlinkv3_minie_p12.jpeg)

Hold both the PCB and the shrink tube with the flat tongs by the **bottom** metal part of the USB-C connector. Be careful not to accidentally squeeze the middle plastic part of the USB-C connector!

![](../../assets/debug/stlinkv3_minie_p13.jpeg)

Use the heat gun to shrink the tubing all around the debug probe. Make sure the tubing is equally shrunk and protects the whole PCB.

![](../../assets/debug/stlinkv3_minie_p14.jpeg)

Optionally, you may add a logo of your choice printed on paper and cut to size. Be aware that the heat can make the ink flow a little, so you may need to experiment with what settings work with your printer.

![](../../assets/debug/stlinkv3_minie_p15.jpeg)

## Дивіться також

- [Міні-зонд для відлагодження/програмування STLINK-V3MINIE для мікроконтролерів STM32](https://www.st.com/resource/en/user_manual/um2910-stlinkv3minie-debuggerprogrammer-tiny-probe-for-stm32-microcontrollers-stmicroelectronics.pdf) (Посібник користувача)

[emdbg]: https://pypi.org/project/emdbg/

[emdbg]: https://pypi.org/project/emdbg/
