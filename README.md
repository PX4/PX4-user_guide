# PX4 User Guide

> **Note:** This Guide is currently "Under Construction". We hope to release it soon.
  The original version is still [on WordPress here](http://px4.io/user-guide/).

This repo contains the source code repository for the 
[PX4 User Guide](https://hamishwillee.gitbooks.io/px4-user-guide/content/en/).
This guide is intended for people who want to:

- Add PX4-powered controllers to their drones
- Learn how to fly and plan missions using PX4

> **Note:** Developers who want to create new code for PX4 should read the [PX4 Dev Guide](https://dev.px4.io/).

## Gitbook

The guide uses the [Gitbook](https://www.gitbook.com/about) toolchain. 

- Pages are written in separate files using markdown (the same syntax used by Github wiki). 
- The *structure* of the book is defined in a file named SUMMARY.md
- This is a [multilingual](https://toolchain.gitbook.com/languages.html) book, 
  so there is a **LANGS.md** file in the root directory defining what languages are supported. 
  Pages for each language are stored in the folder named for the associated language code (e.g. "zh" for Chinese, "en" for English). 
- A file named **book.json** defines any dependencies of the build.
- A web hook is used to track whenever files are merged into the master branch on this repository, causing the book to rebuild.
- There is a [handy book editor](https://gitbookio.gitbooks.io/documentation/content/editor/index.html) you may find useful.

Everything you need to install and build Gitbook locally is explained in its [toolchain documentation](https://toolchain.gitbook.com/).


## Contributing to this guide

Contributions to this guide are very welcome!

If you just want to fix a typo or change a particular existing page you can edit the associated file on this site via the Github web UI.
You'll be prompted to create a separate branch and then guided to submit a pull request with the change.

If you want to add new pages or change the structure then you should use the git tools to clone the repository, 
create a new branches for any changes, then submit a pull request to get the changes merged. You'll want to
install the toolchain and test changes locally before submitting. 

### Style guide 

1. Files 

    * Put new files in an appropriate sub-folder
    * Use descriptive names. In particular, images should describe what the contain.
    * User lower case and separate words using underscores "_"
  
2. Images

    * Use the smallest size and lowest resolution that makes the image still useful.
  
3. Content:

    * Use "style" (bold, emphasis, etc) consistently. Bold for button presses and menu definitions. 
    Emphasis for tool names. Otherwise use as little as possible.
    * Headings and page titles should use "First Letter Capitalisation"
    * The page title should be a first level heading (#). All other headings should be h2 (##) or lower.
    * Don't add any style to headings.
  

### Translation & Localisation

We welcome translations of this content!

> **Note** Right now, there is a lot of change happening. Please wait a few weeks before rushing to translate.

Our translation policy is:

* This is an **English First** book. That means that if you have a technical change you want to make or a new
  page to create you should do so in the English tree first. You would then translate any changes to your version.
* We are very happy for you to maintain your own project for managing the translation work. 
  However when you have a new translation (and/or associated changes to an English document), please submit a pull
  request to merge them back into this master repository.  

Gitbook supports translation [as described here](https://toolchain.gitbook.com/languages.html). 
If you start a new language you can copy the whole English folder (/en) and rename it to the appropriate language code. 
You will also need to update **LANGS.md** with your language once enough of the content has been translated.

> **Note** In order to track which version of the English doc you have translated, you may wish to store the
  document name and changelist in your translated [document front matter](https://toolchain.gitbook.com/pages.html#front-matter).

If you have any further questions, please create them as issues in this wiki, or on the [discussion boards](http://discuss.px4.io/c/site-feedback).

