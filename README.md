# PX4 User Guide

This repo contains the source code for the [PX4 User Guide](https://docs.px4.io/en/).
The guide is intended for people who want to:

- Add PX4-powered controllers to their drones
- Learn how to fly and plan missions using PX4

> **Note:** Developers who want to create new code for PX4 should read the [PX4 Dev Guide](https://dev.px4.io/).

## Gitbook

The guide uses the [Gitbook](https://www.gitbook.com/about) toolchain. 

- Pages are written in separate files using markdown (the same syntax used by Github wiki). 
- The *structure* of the book is defined in a file named **SUMMARY.md**.
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
  

### Translation

Translations of this guide are much appreciated!

> **Note** Gitbook supports translation [as described here](https://toolchain.gitbook.com/languages.html). Each language is independent and keeps all its documents in its own directory (named using it's international code - "en" for English, "es" for Spanish, etc.) The **LANGS.md** file in the root directory lists the language folders that Gitbook must build. 

In order to keep all language-versions of the guide up to date and synchronised, we have the following policy/guidelines:

* This is an **English-first** book. 

  * Any *technical* changes should be made in the English tree *first* (including both updates and new pages). After the English change has been accepted in the main repo then submit the translation. This approach ensures that changes will propagate through to all the other translations!
  * Improvements to translations that don't change "technical information" won't need to be made in the English tree.
* The structure and documents should be the same for all languages (i.e. based on the English version).
* All languages share the same images by default (do not duplicate the */image* folder, unless you're changing/translating the image).
* Translation changes are submitted to the repo in the same way as any other changes (fork the repo, make a branch for your changes, and create PRs of the branches to submit them into this repo).
* Translation teams can organise themselves however they like as long as PRs are submitted using the above approach.

The following sections provide some more detailed guidelines.


#### Starting a new language translation

The process straightforward:

1. Fork this repo.
1. Create and checkout a new branch for your language.
  
   ```
   checkout -b add_translation_language_yourlanguagename
   ```
   
1. Copy the whole English folder (/en) and rename it to the appropriate language code (e.g. "es" for Spanish).

   > **Note** This ensures that you keep the same structure and documents as the original version.
   
1. Update **LANGS.md** with your language.
1. Translate the content in your language tree.

   > **Tip** Minimally complete the home page and the SUMMARY.md before submitting any PR request. Ideally do more!

1. Commit the changes and push them back to your own fork repo.

   ```
   git add *
   git commit -m "Created a your_new_language translation"
   git push origin add_translation_language_yourlanguagename
   ```
   
1. On the Github interface, create a PR to submit your branch back to the master repo (a banner appears on Github that you can click when you visit the repo).

  
#### Updating translations

Translations can be updated like any other change to documentation: fork the repo, create a branch for your changes in your fork, then submit them back to the main repo as PRs.

#### Tracking changes

We hope that translation owners will track changes in the English version and propagate them through to their translations. 

Git/Github have excellent mechanisms for tracking changes. We recommend that when you add [document front matter](https://toolchain.gitbook.com/pages.html#front-matter) to your translation with the commit information for the page you translated. This allows anyone to go back later and find out whether the text has changed since it was last translated. For example:

```md
---
translated_commit: https://github.com/PX4/px4_user_guide/blob/e9d8ee6fc72c9d0111c14edaf7c585c0024382aa/book.json
---
```


