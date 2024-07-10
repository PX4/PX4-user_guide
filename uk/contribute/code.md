# Керування вихідним кодом

##

Проект PX4 використовує модель розгалуження Git із трьома гілками:

- [основна](https://github.com/PX4/PX4-Autopilot/tree/main) за замовчуванням нестабільна і бачить швидкий розвиток.
- [beta](https://github.com/PX4/PX4-Autopilot/tree/beta) було успішно протестовано. Він призначений для тестерів на польоти.
- [stable](https://github.com/PX4/PX4-Autopilot/tree/stable) вказує на останній стабільний реліз.

Ми намагаємося зберегти [лінійну історію через перебазування](https://www.atlassian.com/git/tutorials/rewriting-history) та уникаємо [потоку Github](https://docs.github.com/en/get-started/quickstart/github-flow). Однак через глобальну команду і швидкий розвиток ми можемо одночасно вдаватися до збоїв.

Щоб додати нові функції, [зареєструйтеся на Github](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account), потім [розгалужте](https://docs.github.com/en/get-started/quickstart/fork-a-repo) репозиторій, [створіть нову гілку](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository), додайте свої [зміни як коміти](#commits-and-commit-messages) і, нарешті, [надішліть запит на отримання даних](#pull-requests). Зміни будуть об'єднані, коли вони пройдуть перевірку нашої [безперервної інтеграції](https://en.wikipedia.org/wiki/Continuous_integration).

:::note
Усі доповнення по коду мають здійснюватися відповідно до дозвільної [3-clause ліцензії BSD](https://opensource.org/licenses/BSD-3-Clause) і не повинні накладати жодних додаткових обмежень на його використання.

## Стиль Коду

PX4 використовує [Google C++ посібник стилю ](https://google.github.io/styleguide/cppguide.html)з наступними (мінімальними) модифікаціями:

:::note

Не весь вихідний код PX4 відповідає посібнику зі стилю, але будь-який _новий код_, який ви пишете, має відповідати цьому — як у нових, так і в існуючих файлах. Якщо ви оновлюєте існуючий файл, від вас не вимагається, щоб весь файл відповідав інструкції зі стилю, а лише код, який ви змінили.

:::

### Вкладки

- Вкладки використовуються для відступу (еквівалентно 8 пробілу).
- Пробіли використовуються для вирівнювання.

### Довжина рядка

- Максимальна довжина рядка становить 120 символів.

### Розширення файлів

- Вихідні файли використовують розширення `*.cpp` замість `*.cc`.

### Іменування  функцій та методів

- `lowerCamelCase()` використовується для функцій і методів, щоб _візуально_ відрізняти їх від `ClassConstructors()` і `ClassNames`.

### Імена змінних членів приватного класу

- `_underscore_prefixed_snake_case` використовується для імен змінних членів приватного класу, на відміну від `underscore_postfixed_`.

### Ключові слова класу

- _zero_ пробілів перед ключовими словами `public:`, `private:` або `protected:`

### Приклад сніпета коду

```cpp
class MyClass {
public:

        /**
         * @brief Description of what this function does.
         *
         * @param[in] input_param Clear description of the input [units]
         * @return Whatever we are returning [units]
         */
        float doSomething(const float input_param) const {
                const float in_scope_variable = input_param + kConstantFloat;
                return in_scope_variable * _private_member_variable;
        }

        void setPrivateMember(const float private_member_variable) { _private_member_variable = private_member_variable; }

        /**
         * @return Whatever we are "getting" [units]
         */
        float getPrivateMember() const { return _private_member_variable; }

private:

        // Clear description of the constant if not completely obvious from the name [units]
        static constexpr float kConstantFloat = ...;

        // Clear description of the variable if not completely obvious from the name [units]
        float _private_member_variable{...};
};
```

## Вбудована документація

PX4 розробників заохочують до створення відповідної документації через джерело.

::: info

Стандарти документації вихідного коду не застосовуються, і код в даний час непослідовно документований. Ми б хотіли зробити краще!

:::

В даний час у нас є два типи базової документації:

- Методи `PRINT_MODULE_*` використовуються як для інструкцій щодо використання модуля, так і для [Modules & Довідник команд](../modules/modules_main.md) у цьому посібнику.
  - API задокументований [у вихідному коді тут](https://github.com/PX4/PX4-Autopilot/blob/v1.8.0/src/platforms/px4_module.h#L381).
  - Хороші приклади використання включають [шаблон програми/модуля](../modules/module_template.md) та файли, посилання на які наведено в довідці модулів.
- Ми заохочуємо іншу документацію у вихідному коді _де вона додає цінність/не є зайвою_.

  :::tip

  Розробники повинні називати об’єкти C++ (класи, функції, змінні тощо) так, щоб можна було зрозуміти їхню мету – зменшуючи потребу в явній документації.


:::

  - Не додавати документацію, яку тривіально можна вивести з імен об'єктів С++.
  - ЗАВЖДИ вказуйте одиниці змінних, констант і параметрів введення/повернення там, де вони визначені.
  - ЗАВЖДИ вказуйте одиниці змінних, постійних і параметрів введення/повернення там, де вони визначені.
  - Теги [Doxgyen](http://www.doxygen.nl/) слід використовувати, якщо потрібна документація: `@class`, `@file`, `@param`, ` @return`, `@brief`, `@var`, `@see`, `@note`. Хороший приклад використання це [src/modules/events/send_event.h](https://github.com/PX4/PX4-Autopilot/blob/release/1.15/src/modules/events/send_event.h).

Будь ласка, уникайте "магічних чисел", наприклад, звідки прийшло це число? А як щодо множника при введенні ручки повороту?

```cpp
if (fabsf(yaw_stick_normalized_input) < 0.1f) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = 0.52f * yaw_stick_normalized_input;
}
```

Натомість визначте цифри як константи з відповідним контекстом у заголовку:

```cpp
// Порогове значення мертвої зони для нормалізованого введення повороту
static constexpr float kYawStickDeadzone = 0.1f;

// [рад/с] Порогове значення мертвої зони для нормалізованого введення повороту
static constexpr float kMaxYawRate = math::radians(30.0f);
```

і оновіть реалізацію вихідного коду.

```cpp
if (fabsf(yaw_stick_normalized_input) < kYawStickDeadzone) {
        yaw_rate_setpoint = 0.0f;
}
else {
        yaw_rate_setpoint = kMaxYawRate * yaw_stick_normalized_input;
}
```

## Коміти та повідомлення комітів

Використовуйте описові повідомлення з кількома абзацами для всіх нетривіальних змін. Добре структуруйте їх, щоб вони мали сенс у підсумку в один рядок, але також надавали повну деталізацію.

```plain
Компонент: Поясни зміни в одному реченні. Виправлення #1234

Підготуйте програмний компонент до початку підсумкового огляду
або за назвою модуля, або описом його.
(e.g. "mc_att_ctrl" or "multicopter attitude controller").

Якщо номер задачі додається як <Fixes #1234>, Github
автоматично закриє проблему, коли буде зроблено 
об’єднання коміту з виправленням  з головною гілкою(master branch).

Тіло повідомлення може містити кілька абзаців.
Детально опишіть те, що ви змінили. Зв’язати помилки і 
журнали польотів, які пов'язані з цим виправленням або з результатами тесту
даного коміту.

Опишіть зміни та чому ви їх змінили, уникайте
перефразуйте зміну коду (Добре: «Додає додаткову
перевірку безпеки для транспортних засобів із низькою якістю прийому GPS».
Погано: "Додано gps_reception_check() function").

Повідомив: Ім'я <email@px4.io>
```

**Використовуйте **`git commit -s`**, щоб підписати всі свої коміти.** Це додасть `signed-off-by:` до вашого ім'я та електронну пошту в останньому рядку.

Цей посібник із фіксації базується на найкращих практиках щодо ядра Linux та інших [проектів, які підтримує](https://github.com/torvalds/subsurface-for-dirk/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88-L115) Лінус Торвальдс.

## Запити на злиття

Github [запити на злиття (PRs)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) - це основний механізм, який використовується для надсилання нових функціональних можливостей і виправлень до PX4.

Вони містять новий набір [комітів](#commits-and-commit-messages) у вашій гілці (щодо основної гілки) та опис змін.

Опис повинен включати:

- Огляд того, що доставляють  дані зміни; достатньо для розуміння широкої мети коду
- Посилання на пов'язані з питаннями або підтримка інформації.
- Інформація про те як було виконано тестування PR функціональності з посиланнями на журнали польотів.
- Якщо це можливо, результати загальних [тестових польотів](../test_and_ci/test_flights.md) як до, так і після зміни.
