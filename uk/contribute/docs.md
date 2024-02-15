# Contributing to Documentation

Внески до Керівництва користувачів PX4 дуже вітаються; від простих виправлень до правопису та граматики, до створення абсолютно нових секцій.

Ця тема пояснює, як зробити та протестувати зміни. В кінці є посібник з базового стилю.

:::tip
Note Вам знадобиться обліковий запис (безкоштовно) [Github](https://github.com/) щоб зробити свій внесок до цього посібника
:::

<a id="github_changes" ></a>

## Швидкі зміни в Github

Simple changes to _existing content_ can be made by clicking the **Edit this page on GitHub** link that appears at the bottom of every page (this opens the page on Github for editing).

![Vuepress: Edit Page button](../../assets/vuepress/vuepress_edit_page_on_github_link.png)

Щоб редагувати існуючу сторінку:

1. Відкрийте сторінку
1. Клацніть **Редагувати цю сторінку на GitHub** посилання під вмістом сторінки.
1. Зробіть необхідні зміни.
1. Below the Github page editor you'll be prompted to create a separate branch and then guided to submit a _pull request_.

Команда документації перегляне запит і або об'єднає його, або працює з вами, щоб оновити його.

<a id="big_changes" ></a>

## Зміни за допомогою Git (Нові сторінки та зображення)

More substantial changes, including adding new pages or adding/modifying images, aren't as easy to make (or properly test) on Github. For these kinds of changes we suggest using the same approach as for _code_:

1. Use the _git_ toolchain to get the documentation source code onto your local computer.
1. Modify the documentation as needed (add, change, delete).
1. _Test_ that it builds properly using Vuepress.
1. Create a branch for your changes and create a pull request (PR) to pull it back into the documentation.

The following explain how to get the source code, build locally (to test), and modify the code.

### Get/Push  документація вихідного коду

To get the library(s) sources onto your local computer you will need to use the git toolchain. The instructions below explain how to get git and use it on your local computer.

1. Download git for your computer from [https://git-scm.com/downloads](https://git-scm.com/downloads)
1. [Sign up](https://github.com/join) for Github if you haven't already
1. Create a copy (Fork) of the [PX4 User Guide repo](https://github.com/PX4/PX4-user_guide) on Github ([instructions here](https://docs.github.com/en/get-started/quickstart/fork-a-repo)).
1. Clone (copy) your forked repository to your local computer:

   ```sh
   cd ~/wherever/
   git clone https://github.com/<your git name>/PX4-user_guide.git
   ```

   For example, to clone the PX4 userguide fork for a user with Github account "john_citizen":

   ```sh
   git clone https://github.com/john_citizen/PX4-user_guide.git
   ```

1. Navigate to your local repository:

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. Add a _remote_ called "upstream" to point to the PX4 version of the library:

   ```sh
   git remote add upstream https://github.com/PX4/PX4-user_guide.git
   ```

:::tip
A "remote" is a handle to a particular repository. The remote named _origin_ is created by default when you clone the repository, and points to _your fork_ of the guide. Above you create a new remote _upstream_ that points to the PX4 project version of the documents.
:::

1. Create a branch for your changes:

   ```sh
   git checkout -b <your_feature_branch_name>
   ```

   This creates a local branch on your computer named `your_feature_branch_name`.

1. Make changes to the documentation as needed (general guidance on this in following sections)
1. Once you are satisfied with your changes, you can add them to your local branch using a "commit":

   ```sh
   git add <file name>
   git commit -m "<your commit message>"
   ```

   For a good commit message, please refer to the [Source Code Management](../contribute//code.md#commits-and-commit-messages) section.

1. Push your local branch (including commits added to it) to your forked repository on Github.

   ```sh
   git push origin your_feature_branch_name
   ```

1. Go to your forked repository on Github in a web browser, e.g.: `https://github.com/<your git name>/PX4-user_guide.git`. There you should see the message that a new branch has been pushed to your forked repository.
1. Create a pull request (PR):
   - On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Press it.
   - A pull request template will be created. It will list your commits and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/PX4-user_guide/pulls) for comparison)
1. You're done! Maintainers for the PX4 User Guide will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while.

### Побудова бібліотеки локально

Build the library locally to test that any changes you have made have rendered properly:

1. Install the [Vuepress prerequiresites](https://vuepress.vuejs.org/guide/getting-started.html#prerequisites):

   - [Nodejs 10+](https://nodejs.org/en)

:::note
For recent nodejs versions (after v16.15.0) you need to enable the node legacy OpenSSL provider. On Ubuntu you can do this by running the terminal command:

     ```sh
     export NODE_OPTIONS=--openssl-legacy-provider
     ```

   - [Yarn classic](https://classic.yarnpkg.com/en/docs/install)

1. Navigate to your local repository:

   ```sh
   cd ~/wherever/PX4-user_guide
   ```

1. Install dependencies (including Vuepress):

   ```sh
   yarn install
   ```

1. Preview and serve the library:

   ```sh
   yarn docs:dev
   ```

   - Now you can browse the guide on http://localhost:8080/px4_user_guide/
   - Stop serving using **CTRL+C** in the terminal prompt.

1. Побудуйте бібліотеку за допомогою:

   ```sh
   # Ubuntu
   yarn docs:build

   # Windows
   yarn docs:buildwin
   ```

:::tip
Use `yarn docs:dev` to preview changes _as you make them_ (documents are updated and served very quickly). Before submitting a PR you should also build it using `docs:build`, as this can highlight issues that are not visible when using `docs:dev`.
:::

### Структура Вихідного Коду

Посібник використовує інструментальний ланцюжок [Vuepress](https://vuepress.vuejs.org/). Керівництво користувача PX4 має деякі дрібні відмінності, в основному пов'язані з конфігурацією і налаштуваннями.

На огляд:

- Сторінки записуються окремими файлами, використовуючи markdown.
  - Синтаксис майже такий самий, як і Github wiki.
  - Vuepress також підтримує деякі [розширення markdown](https://vuepress.vuejs.org/guide/markdown.html). Ми спробуємо та уникаємо використання цього, окрім [tips, warning, etc.](https://vuepress.vuejs.org/guide/markdown.html#custom-containers).
- This is a [multilingual](https://vuepress.vuejs.org/guide/i18n.html#default-theme-i18n-config) book:
  - Сторінки для кожної мови зберігаються в папці з назвою для асоційованого мовного коду (наприклад, "zh" для китайської, "ko" для корейської).
  - Редагувати лише версію файлів ENGLISH (**/en**). We use [Crowdin](../contribute/translation.md) to manage the translations.
- All pages must be in an appropriately named sub-folder of **/en** (e.g. this page is in folder **en/contribute/**).
  - This makes linking easier because other pages and images are always as the same relative levels
- The _structure_ of the book is defined in **SUMMARY.md**

  - If you add a new page to the guide you must also add an entry to this file!

:::tip
This is not "standard vuepress" way to define the sidebar (the summary file is imported by [.vuepress/get_sidebar.js](https://github.com/PX4/PX4-user_guide/blob/main/.vuepress/get_sidebar.js)).
:::

- Images must be stored in a sub folder of **/assets**. This is two folders down from content folders, so if you add an image you will reference it like:

  ```plain
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```

- A file named **package.json** defines any dependencies of the build.
- A web hook is used to track whenever files are merged into the master branch on this repository, causing the book to rebuild.

### Додавання нових сторінок

Коли ви додаєте нову сторінку, ви також повинні додати її до **/ SUMMARY.md**!

## Інструкція зі стилістичного оформлення

1. Назви файлів/файлів

   - Do not further nest folders.
   - Use descriptive names. In particular, image filenames should describe what they contain.
   - Use lower case filenames and separate words using underscores "\_"

2. Зображення

   - Use the smallest size and lowest resolution that makes the image still useful (this reduces download cost for users with poor bandwidth).
   - New images should be created in a sub-folder of **/assets/** by default (so they can be shared between translations).

3. Контент

   - Use "style" \(bold, emphasis, etc\) consistently.
     - **Bold** for button presses and menu definitions.
     - _Emphasis_ for tool names. - Otherwise use as little as possible.
   - Headings and page titles should use "First Letter Capitalisation"
   - The page title should be a first level heading \(\#\). All other headings should be h2 \(\#\#\) or lower.
   - Не додавати ніяких стилів до заголовків.
   - Don't translate the _first part_ of a note, tip or warning declaration (e.g. `::: tip`) as this precise text is required to render the note properly.

## Де я можу додати зміни?

Додати нову документацію в рядку з існуючою структурою!

Деякі з основних категорій:

- Development: content related to:
  - Evolving the platform (new modes, modules, flight modes, hardware, software and hardware architecture and porting).
  - "Experimental" work that requires developer expertise to reproduce.
- Flying: content related to flying a standard vehicle (flight modes, arming, taking off, landing)
- Basic configuration: Configuration that every vehicle will need to do
- Advanced configuration: Configuration that is specific to a vehicle type, or some segment of users.
- Peripherals: Documentation on different hardware that can be used.
  - This also includes setup and configuration information for hardware that isn't covered in Basic configuration.
- Basic Assembly: Assembly of an autopilot and its main peripherals
- Airframe Builds: Examples of how to build a whole system.

## Переклади

Для отримання інформації про переклад: [Переклад](../contribute/translation.md).

## Ліцензія

Вся документація PX4/Dronecode вільного  використання  і зміни відбуваються  згідно умов дозволу [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) , присвяченої ліцензії.
