# Contributing to Documentation

Contributions to the guides for all parts of the Dronecode project are very welcome. 
This includes the PX4 and QGroundControl developer and user guides, and the MAVLink guide. 
This article explains how you can make changes, add content, and create translations.

> **Note** You will need a (free) [Github](http://github.com) account to contribute to the guides.

## Quick Changes

Fixing typos or editing the text an *existing page* is easy:
1. Click the **Edit** toolbar icon at the top of the relevant page in the guide.

   ![Gitbook: Edit Page button](../../assets/gitbook/gitbook_toolbar_icon_edit.png)
   
   This will open the page for editing (in Github).
1. Make the desired change.
1. At the bottom of the page you'll be prompted to create a separate branch and then 
   guided to submit a *pull request*.
   
The documentation team reviews submitted pull requests and will either merge it or work with you to update it.

> **Note** If you want to add new pages or images, then you will need to work through the git tool rather than github.
  Often you will want to build the library using the gitbook toolchain to test your changes.

## Adding New Pages and Images - Big Changes

If you want to add new pages or images that can't easily be done through the Github interface.
In this case you make changes in the same way as you would for *code* changes: 
1. Use the *git* toolchain to get the documentation source code
1. Modify it as needed (add, change, delete).
1. Test that it renders properly using the Gitbook client
1. Create a branch for your changes and create a pull request (PR) to pull it back into the documentation. 

Change requests can be either done on the Gitbook website using the [Gitbook editor](https://gitbookio.gitbooks.io/documentation/content/editor/index.html) or locally (more flexible, but less user-friendly). 
Most of these instructions cover the local setup.

### Developer or User Guide?

There are different types of PX4 users, and it is important that documentation goes into the right place.

The *Developer Guide* is for documentation that is relevant to *software developers*.
This includes users who need to: 
* Add or modify platform features - modules, flight modes, etc.
* Add support/integrate with new hardware - flight controllers, peripherals, airframes, etc.
* Communicate with the platform from an external source - e.g. a companion computer.
* Understand the architecture

The *User Guide*, by contrast, is *primarily* for users who want to:
* Fly a vehicle using PX4
* Build, modify, or configure a vehicle using PX4 on a supported/existing airframe.

> **Tip** For example, detailed information about how to build/configure an existing airframe are in the User Guide, 
> while instructions for defining a *new* airframe are in the Developer Guide.

### Get/Push Documentation Source Code

To get the library(s) sources onto your local computer you will need to use the git toolchain.
The instructions below explain how to get git and use it on your local computer.

1. Download git for your computer from [https://git-scm.com/downloads](https://git-scm.com/downloads)
1. [Sign up](https://github.com/join) for github if you haven't already
1. Create a copy (Fork) of the desired library on Github ([instructions here](https://help.github.com/articles/fork-a-repo/#fork-an-example-repository)).
   The library repo URLs are:
   - PX4 User Guide: https://github.com/PX4/px4_user_guide
   - PX4 Developer Guide: https://github.com/PX4/Devguide
   - QGroundControl User Guide: https://github.com/mavlink/qgc-user-guide
   - QGroundControl Developer Guide: https://github.com/mavlink/qgc-dev-guide
   - MAVLink Developer Guide: https://github.com/mavlink/mavlink-devguide
1. Clone (copy) your forked repository to your local computer:
   ```sh
   cd ~/wherever/
   git clone https://github.com/<your git name>/<repository_name>.git
   ```
   For example, to clone the PX4 userguide fork for a user with github account "john_citizen_smith":
   ```sh
   git clone https://github.com/john_citizen_smith/px4_user_guide.git
   ```
1. Navigate to your local repository (px4_user_guide is used below):
   ```sh
   cd ~/wherever/px4_user_guide   
   ```
1. Add a *remote* called "upstream" to point to the original library.
   The exmaple below shows how to do this for the user guide (note the URL format - it is the repo URL with extension ".git").
   ```sh
   git remote add upstream https://github.com/PX4/px4_user_guide.git
   ``` 
   
   > **Tip** A "remote" is a handle to a particular repository.
     The remote named *origin* is created by default when you clone the repository, and points to your fork of the guide.
     You want to create a new remote *upstream* that points to the official version of the document.
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
   For a good commit message, please refer to [Contributing](../contribute/README.md) section.
1. Push your local branch (including commits added to it) to your forked repository on github
   ```sh
   git push origin your_feature_branch_name
   ```
1. Go to your forked repository on Github in a web browser, e.g.: `https://github.com/<your git name>/px4_user_guide.git`.
  There you should see the message that a new branch has been pushed to your forked repository.
1. Create a pull request (PR):
   - On the right hand side of the "new branch message" (see one step before), you should see a green button saying "Compare & Create Pull Request". Press it.
   - A pull request template will be created. It will list your commits and you can (must) add a meaningful title (in case of a one commit PR, it's usually the commit message) and message (<span style="color:orange">explain what you did for what reason</span>. Check [other pull requests](https://github.com/PX4/px4_user_guide/pulls) for comparison)
1. You're done! Responsible members of PX4 guides will now have a look at your contribution and decide if they want to integrate it. Check if they have questions on your changes every once in a while.

### Source Code Structure

The guide uses the [Legacy Gitbook Toolchain](https://legacy.gitbook.com/) toolchain.
Instructions for how this toolchain is setup and used can be found in the [toolchain documentation](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md).

In overview:

* Pages are written in separate files using markdown \(almost the same syntax used by Github wiki\). 
* The _structure_ of the book is defined in a file named **SUMMARY.md**.
  If you add a new page to the library you must add an entry to this file. 
* This is a [multilingual](https://github.com/GitbookIO/gitbook/blob/master/docs/languages.md) book, 
  so there is a **LANGS.md** file in the root directory defining what languages are supported. 
  - Pages for each language are stored in the folder named for the associated language code \(e.g. "zh" for Chinese, "en" for English\).
  - You should only ever edit the ENGLISH version of files.
    We use translation software to manage the other trees.
* Images must be stored in a sub folder of **/assets**.
  This is two folders down from content folders, so if you add an image you will reference it like:
  ```
  ![Image Description](../../assets/path_to_file/filename.jpg)
  ```
* A file named **book.json** defines any dependencies of the build.
* A web hook is used to track whenever files are merged into the master branch on this repository, causing the book to rebuild.

### Style guide

1. Files/file names

   * Put new files in an appropriate sub-folder
   * Use descriptive names. In particular, image filename should describe what they contain.
   * Use lower case and separate words using underscores "\_"

2. Images

   * Use the smallest size and lowest resolution that makes the image still useful.
   * New images should be created in a sub-folder of **/assets/** by default 
     (so they can be shared between translations).

3. Content:

   * Use "style" \(bold, emphasis, etc\) consistently. **Bold** for button presses and menu definitions. 
     _Emphasis_ for tool names. Otherwise use as little as possible.
   * Headings and page titles should use "First Letter Capitalisation"
   * The page title should be a first level heading \(\#\). All other headings should be h2 \(\#\#\) or lower.
   * Don't add any style to headings.
   * Don't translate the *first part* of a note, tip or warning declaration (e.g. `> **Note**`) 
     as this precise text is required to render the note properly.

### Building the Gitbook Locally

Everything you need to install and build Gitbook locally is also explained in the [toolchain documentation](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md). 

1. Install nodejs on your computer (version 4-6 recommended).
1. Install gitbook via NPM. 
   At the terminal prompt, simply run the following command to install GitBook:
   ```sh
   npm install gitbook-cli -g
   ```
1. Navigate to your local repository:
   ```sh
   cd ~/wherever/px4_user_guide
   ```
1 Install gitbook dependencies:
  ```sh
  gitbook install
  ```
  > **Note** If you run into an error: `/usr/bin/env: node: No such file or directory`, run `ln -s /usr/bin/nodejs /usr/bin/node`

1. Build your book:
   ```sh
   gitbook build
   ```
1. To preview and serve your book, run:
  ```sh
  gitbook serve
  ```
  * Now you can browse your local book on http://localhost:4000/
  * Exit serving using `CTRL+c` in the terminal prompt.
1. You can also serve on a different port instead of 4000:
   ```sh
   gitbook serve --port 4003
   ```
1. You can also output as html, pdf, epub or mobi:
   ```sh
   gitbook help
   ```


<a id="translation"></a>
## Translations

We'd love your help to translate *QGroundControl* and our guides for PX4, *QGroundControl* and MAVLink.
For more information see: [Translation](../contribute/translation.md).

## Licence

All PX4/Dronecode documentation is free to use and modify under terms of the permissive 
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licence.
