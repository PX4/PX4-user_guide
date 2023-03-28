# Scripts

These scripts are worker scripts that speed up the build (see "Copying worker scripts workaround: https://github.com/vuejs/vuepress/issues/2689").
The speed improvement is MASSIVE.

They need to be copied to node_modules/@vuepress/core/lib/node/build/
This is done automatically by `yarn docs:buildfast_ubuntu`

Requires Node 12 and greater.