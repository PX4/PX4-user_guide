# Керівництво з підтримки плати PX4 від виробника

Команди розробки та тестування PX4 повністю підтримують та обслуговують плати, які відповідають [Стандарту Pixhawk](https://pixhawk.org/standards/). Виробники, які бажають відхилитися від стандарту або створити зовсім нові плати, можуть це зробити, але їм буде потрібно підтримувати будь-які виникаючі різниці в сумісності.

Цей посібник наводить [загальні вимоги](#general_requirements) до підтримки плати, разом з додатковими вимогами для різних [категорій підтримки плат](#board-support-categories).

::: info Плати, які не відповідають вимогам, є [unsupported](#unsupported); вони не будуть включені до списку апаратного забезпечення веб-сайту PX4 і будуть видалені з кодової бази.
:::

<a id="general_requirements"></a>

## Загальні вимоги

Загальні вимоги до всіх підтримуваних бордів:

1. Апаратне забезпечення повинно бути доступним на ринку.
1. Плати не повинні мати апаратні помилки або неприйнятну якість, що робить неможливим або небезпечним використання плати з PX4 на БЛА. Плата повинна пройти критерії прийняття для забезпечення якості деталей та збірки.
1. Чіткий та простий спосіб зв'язатися з службою підтримки клієнтів для клієнтів. Один або декілька з наступних приймається:

   - Присутність сервера PX4 у Discord
   - Електронна пошта підтримки
   - Номер телефону

1. Точка контакту (PoC) для зберігачів PX4 (прямий електронний лист або доступний у Slack/Форумі/Github)
1. Борді потрібно використовувати протокол завантаження PX4 [завантажувача](https://github.com/PX4/PX4-Autopilot/tree/main/platforms/nuttx/src/bootloader). Для отримання додаткової інформації про завантажувачі див.: [Посібник з перенесення PX4 Nuttx > Завантажувач](../hardware/porting_guide_nuttx.md#bootloader).
1. Достатня документація, яка включає, але не обмежується:

   - Повний підключення, яке стало доступним для громадськості, яке відображає PX4 визначення контактів на:
     1. Піни мікроконтролера
     2. Фізичні зовнішні роз'ємники
   - Блок-схема або повна схема основних компонентів (датчики, джерело живлення тощо), яка дозволяє вивести вимоги до програмного забезпечення та порядок завантаження
   - Посібник з використання готового продукту

1. Має бути окрема веб-сторінка для плати з PX4, на якій перераховані функції та обмеження використання з PX4, включаючи або посилання на вищезазначену документацію.

## Board Support Categories

The board support categories are listed below. The autopilot boards in each category are listed at: [https://px4.io/autopilots/.](https://px4.io/autopilots/)

::: info
Manufacturer supported boards may be as well/better supported than Pixhawk boards (for example through economies of scale).
:::

## Pixhawk Standard

A Pixhawk board is one that conforms to the Pixhawk standards. These standards are laid out on [http://pixhawk.org](http://pixhawk.org/), but at high-level require that the board passes electrical tests mandated by the standard and the manufacturer has signed the Pixhawk adopter and trademark agreement.

PX4 generally only supports boards that are commercially available, which typically means that board standards released within the last five years are supported.

<a id="ver_rev_id"></a>

### VER and REV ID (Hardware Revision and Version Sensing)

FMUv5 and onwards have an electrical sensing mechanism. This sensing coupled with optional configuration data will be used to define hardware’s configuration with respect to a mandatory device and power supply configuration. Manufacturers must obtain the VER and REV ID from PX4 board maintainers by issuing a PR to ammend the [DS-018 Pixhawk standard](https://github.com/pixhawk/Pixhawk-Standards) for board versions and revisions.

Because these boards are 100% compliant with the Pixhawk standard, the values assigned for VER and REV ID are the defaults for that FMU Version.

## Manufacturer Supported

These boards are supported by the manufacturer. To qualify for this category the board must work with the latest stable PX4 release within 4 months of that release.

- Manufacture owns the support
- Manufacturer must supply at least 2 boards to the core-dev team (for use on test rack and by test team)

:::tip
While there is no commitment from the PX4 maintainers and the flight test team to support and test boards in this category, we strongly recommended PX4 and manufacturer teams build close working relationships.
This will result in a better result for all parties.
:::

::: info These boards will be assigned [VER and REV ID](#ver_rev_id) based on compatibility. A special assignment will be made by PX4 if the board is a variant of an FMU specification and capable of running the same binary, with minor differences supported by the manufacturer. Contact the PX4 maintainer at [boards@px4.io](mailto:boards@px4.io) to request more information.
:::

## Experimental

These boards are all boards that don't fall in the above categories, or don't fall in those categories _anymore_. The following requirements apply:

- The board must be working with at least one PX4 release for a defined vehicle type, but not necessarily the latest release.

::: info Experimental boards that were _previously_ Pixhawk or Manufacturer supported will have/retain their original IDs. _New_ experimental boards are allocated [VER and REV IDs](#ver_rev_id) based on compatibility, in the same way as Manufacturer Supported boards.
:::

## Unsupported

This category includes all boards that aren't supported by the PX4 project or a manufacturer, and that fall outside the"experimental" support.

- Board is somewhat compatible on paper with something we already support, and it would take minimal effort to raise it to "experimental", but neither the dev-team or the manufacturer are currently pursuing this
- Manufacturer/Owner of hardware violates our [Code of Conduct](https://discuss.px4.io/t/code-of-conduct/13655)
- Closed source, where any of the necessary tools/libs/drivers/etc needed to add support for a board is deemed incompatible due to licensing restrictions
- Board doesn't meet minimum requirements outlined in the General requirements

::: info Unsupported boards will NOT be assigned [VER and REV ID](#ver_rev_id) (and cannot run PX4 FMUvX firmware).
:::

## Release Process

It is assumed that when a manufacturer declares that a board falls in a certain category, that the board is compliant with the requirements for that category and the general requirements.

When a new board is brought to market that falls into the manufacturer supported or experimental category, the manufacturer is responsible for updating the PX4 documentation and doing the board release process in PX4. We recommend the following steps:

Contact PX4 board maintainers at [boards@px4.io](mailto:boards@px4.io) and request the following:

1. The assignment of a _board id_ for bootloader and firmware selection in QGC.
2. The assignment of REV and VER ID resistor values.
3. If the board supports USB: Either request the assignment of a USB VID and PID or provide the USB VID and PID.

Integrate the board according to the board porting release process described in the [porting guide](../hardware/porting_guide.md)

:::warning
The board support process may be changed and improved over time.
Hardware manufacturers are encouraged to contribute to this process through the regular hardware call, the Discuss forum or Discord.
:::

## Support

If parts of the board support guide/process are not clear:

- Ask the community for help on Discord channels under `Hardware` category, or on the discuss forum
- Attend the regular hardware call
- Consultancy options are listed here: [https://px4.io/community/consultants/](https://px4.io/community/consultants/)
