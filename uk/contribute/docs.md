# Доповнення до документації

Внески до Керівництва користувачів PX4 дуже вітаються; від простих виправлень до правопису та граматики, до створення абсолютно нових секцій.

Ця тема пояснює, як зробити та протестувати зміни. В кінці є посібник з базового стилю.

:::tip
Note Вам знадобиться обліковий запис (безкоштовно) [Github](https://github.com/) щоб зробити свій внесок до цього посібника
:::

## Швидкі зміни в Github

Прості зміни до _існуючого вмісту_ можна внести, клацнувши по посиланню **Редагувати цю сторінку на GitHub**, яке з'являється внизу кожної сторінки (це відкриває сторінку на GitHub для редагування).

![Vitepress: Edit Page button](../../assets/vuepress/vuepress_edit_page_on_github_link.png)

Щоб редагувати існуючу сторінку:

1. Відкрийте сторінку
1. Клацніть **Редагувати цю сторінку на GitHub** посилання під вмістом сторінки.
1. Зробіть необхідні зміни.
1. Нижче редактора сторінок GitHub вас запросять створити окрему гілку, після чого вас насамперед попросять подати запит на злиття (_pull request_).

Команда документації перегляне запит і або об'єднає його, або працює з вами, щоб оновити його.

## Зміни за допомогою Git (Нові сторінки та зображення)

Більш суттєві зміни, включаючи додавання нових сторінок або додавання/зміну зображень, не такі прості для внесення (або належним чином протестувати) на Github. Для таких змін ми рекомендуємо використовувати той самий підхід, що й для _коду_:

1. Використовуйте інструменти _git_, щоб отримати вихідний код документації на свій комп'ютер.
1. Внесіть потрібні зміни в документацію (додайте, змініть, видаліть).
1. _Test_ перевірте, що вона будується належним чином за допомогою Vuepress.
1. Створіть гілку для ваших змін і створіть запит на витягнення (PR), щоб втягнути їх назад у документацію.

Нижче пояснено, як отримати вихідний код, побудувати локально (для тестування) та внести зміни в код.

### Get/Push  документація вихідного коду

Щоб отримати джерела бібліотеки(ів) на свій локальний комп'ютер, вам потрібно використовувати інструментарій git. Нижче наведено інструкції, як отримати git і використовувати його на своєму локальному комп'ютері.

1. Завантажте git для свого комп’ютера з [https://git-scm.com/downloads](https://git-scm.com/downloads)
1. [Зареєструватися](https://github.com/join) на Github якщо ви ще не маєте акаунту
1. Створіть копію (форк) [сховища посібника користувача PX4](https://github.com/PX4/PX4-user_guide) на Github ([інструкції тут](https://docs.github.com/en/get-started/quickstart/fork-a-repo)).
1. Клонуйте ваш форкнутий репозиторій на локальний комп'ютер:

   ```sh
   cd ~/wherever/
   git clone https://github.com/<your git name>/PX4-user_guide.git
   ```

   Наприклад, щоб клонувати форк посібника користувача PX4 для користувача з обліковим записом Github "john_citizen":

   ```sh
   git clone https://github.com/john_citizen/PX4-user_guide.git
   ```

1. Перейдіть до свого локального сховища:

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. Додайте _remote_ під назвою "upstream", щоб вказувати на версію бібліотеки PX4:

   ```sh
   git remote add upstream https://github.com/PX4/PX4-user_guide.git
   ```

:::tip
"Віддалений" - це дескриптор певного сховища. Віддалене джерело з іменем _origin_ створюється за замовчуванням, коли ви клонуєте репозиторій, і вказує на вашу _your fork_ розгалуження довідника. Вище ви створюєте новий віддалений _ upstream /вихідний канал_, який вказує на версію документів проекту PX4.
:::

1. Створити гілку для ваших змін:

   ```sh
   git checkout -b <your_feature_branch_name>
   ```

   Це створює локальну гілку на вашому комп’ютері під назвою `your_feature_branch_name`.

1. Внести зміни до документації за необхідною (загальний посібник по цьому в наступних розділах)
1. Коли ви будете задоволені своїми змінами, ви можете додати їх до вашої локальної гілки за допомогою "commit":

   ```sh
   git add <file name>
   git commit -m "<your commit message>"
   ```

   Щоб отримати гарне повідомлення про фіксацію, зверніться до розділу [Керування вихідним кодом](../contribute/code.md#commits-and-commit-messages).

1. Натисніть "Push" вашу локальну гілку (включаючи додані до неї коміти) у вашу репозиторію-форк на Github.

   ```sh
   git push origin your_feature_branch_name
   ```

1. Перейдіть до вашої репозиторії-форку на Github у веб-браузері, наприклад: `https://github.com/<your git name>/PX4-user_guide.git`. Там ви маєте побачити повідомлення, що нова гілка була відправлена у вашу репозиторію-форк.
1. Створіть запит на витягнення (Pull Request, PR):
   - На правому боці "повідомлення про нову гілку" (див. один крок перед цим), ви повинні побачити зелену кнопку з надписом "Compare & Create Pull Request". Натисніть на неї.
   - Буде створено шаблон запиту на витягнення. Він буде перераховувати ваші коміти, і ви можете (маєте) додати значущий заголовок (у випадку одного коміту PR, це зазвичай повідомлення про коміт) та повідомлення (<span style="color:orange">поясніть, що ви зробили і для якої причини. </span>. Перевірте інші [Pr реквести](https://github.com/PX4/PX4-user_guide/pulls) для порівняння)
1. Готово! Редактори PX4 User Guide зараз переглянуть вашу співпрацю і вирішать, чи хочуть вони інтегрувати її. Періодично перевіряйте, чи є у них питання по вашим змінам.

### Побудова бібліотеки локально

Побудуйте бібліотеку локально, щоб перевірити, що будь-які зміни, які ви внесли, відображені належним чином:

1. Встановіть [Vuepress prerequiresites](https://vuepress.vuejs.org/guide/getting-started.html#prerequisites):

   - [Nodejs 18+](https://nodejs.org/en)
   - [Yarn classic](https://classic.yarnpkg.com/en/docs/install)

1. Перейдіть до свого локального сховища:

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. Встановити залежності (включаючи Vuepress):

   ```sh
   yarn install
   ```

1. Попередній перегляд і обслуговування бібліотеки:

   ```sh
   yarn docs:dev
   ```

   - Одного разу, коли сервер розробки / попереднього перегляду побудує бібліотеку (менше хвилини вперше), він покаже вам URL-адресу, за допомогою якої ви можете переглянути сайт. Це буде щось на кшталт: `http://localhost:5173/px4_user_guide/`.
   - Зупиніть обслуговування за допомогою **CTRL+C** у підказці терміналу.

1. Побудуйте бібліотеку за допомогою:

   ```sh
   # Ubuntu
   yarn docs:build

   # Windows
   yarn docs:buildwin
   ```

:::tip
Використовуйте `yarn docs:dev` для попереднього перегляду _як ви їх робите_ внесених змін (документи оновлюються та подаються дуже швидко). Перш ніж подавати PR, ви також повинні створити його за допомогою `docs:build`, оскільки це може висвітлити проблеми, які не видно під час використання `docs:dev`.
:::

### Структура Вихідного Коду

У посібнику використовується ланцюжок інструментів [Vitepress](https://vitepress.dev/).

На огляд:

- Сторінки записуються окремими файлами, використовуючи markdown.
  - Синтаксис майже такий самий, як і Github wiki.
  - Vuepress також підтримує деякі [розширення markdown](https://vuepress.vuejs.org/guide/markdown.html). Ми спробуємо та уникаємо використання цього, окрім [tips, warning, etc.](https://vuepress.vuejs.org/guide/markdown.html#custom-containers). Це можна переглянути – є кілька цікавих варіантів!
- Це [багатомовна](https://vuepress.vuejs.org/guide/i18n.html#default-theme-i18n-config) книга:
  - Сторінки для кожної мови зберігаються в папці з назвою для асоційованого мовного коду (наприклад, "zh" для китайської, "ko" для корейської).
  - Only edit the ENGLISH (`/en`) version of files. Ми використовуємо [Crowdin](../contribute/translation.md) для керування перекладами.
- All pages must be in an appropriately named sub-folder of `/en` (e.g. this page is in folder `en/contribute/`).
  - Це полегшує створення посилань, оскільки інші сторінки і зображення завжди будуть на тому ж рівні
- The _structure_ of the book is defined in `SUMMARY.md`.

  - Якщо ви додаєте нову сторінку до посібника, вам також потрібно додати запис до цього файлу!

:::tip
Це не "стандартний спосіб vuepress" для визначення бічної панелі (файл Summary імпортується в [.vuepress/get_sidebar.js)](https://github.com/PX4/PX4-user_guide/blob/main/.vuepress/get_sidebar.js).
:::

- Images must be stored in a sub folder of `/assets`. Це на два рівні нижче від папок з вмістом, тому якщо ви додаєте зображення, ви посилаєтеся на нього так:

  ```plain
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```

- Файл з назвою **package.json** визначає будь-які залежності збірки.
- Веб-хук використовується для відстеження моменту злиття файлів у головну гілку цього репозиторію, що призводить до перебудови книги.

### Додавання нових сторінок

When you add a new page you must also add it to `en/SUMMARY.md`!

## Інструкція зі стилістичного оформлення

1. Назви файлів/файлів

   - Put new markdown files in an appropriate sub-folder of `/en/`, such as `/en/contribute/`. Не створюйте додаткових вкладених папок.
   - Put new image files in an appropriate nested sub-folder of `/assets/`. Deeper nesting is allowed/encouraged.
   - Use descriptive names for folders and files. In particular, image filenames should describe what they contain (don't name as "image1.png")
   - Use lower case filenames and separate words using underscores (`_`).

2. Зображення

   - Використовуйте найменший розмір і найнижчу роздільну здатність, яка все ще робить зображення корисним (це зменшує вартість завантаження для користувачів із слабким інтернет-з'єднанням).
   - New images should be created in a sub-folder of `/assets/` (so they can be shared between translations).
   - SVG files are preferred for diagrams. PNG files are preferred over JPG for screenshots.

3. Контент

   - Use "style" (**bold**, _emphasis_, etc.) consistently and sparingly (as little as possible).
     - **Жирний** для натискання кнопок і визначень меню.
     - _Emphasis_ for tool names such as _QGroundControl_ or _prettier_.
     - `code` for file paths, and code, parameter names that aren't linked, using tools in a command line, such as `prettier`.
   - Headings and page titles should use "First Letter Capitalisation".
   - The page title should be a first level heading (`#`). All other headings should be h2 (`##`) or lower.
   - Не додавати ніяких стилів до заголовків.
   - Don't translate the _first part_ of an `info`, `tip` or `warning` declaration (e.g. `::: tip`) as this precise text is required to render the note properly.
   - Break lines on sentences by preference. Don't break lines based on some arbitrary line length.
   - Format using _prettier_ (_VSCode_ is a has extensions can be used for this).

4. Videos:

   - Youtube videos can be added using the format `@[youtube](https://youtu.be/<youtube-video-id>)` (supported via the [markdown-it-video](https://www.npmjs.com/package/markdown-it-video) plugin).
     - Use instructional videos sparingly as they date badly, and are hard to maintain.
     - Cool videos of airframes in flighyt are always welcome.

## Де я можу додати зміни?

Add new files in folders that cover similar topics. Then reference them in the sidebar (`/en/SUMMARY.md`) in line with the existing structure!

## Переклади

Для отримання інформації про переклад: [Переклад](../contribute/translation.md).

## Ліцензія

Вся документація PX4/Dronecode вільного  використання  і зміни відбуваються  згідно умов дозволу [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) , присвяченої ліцензії.
