#!/bin/sh
echo "Copying worker scripts workaround: https://github.com/vuejs/vuepress/issues/2689"
cp .vuepress/scripts/updateBuildScript.js node_modules/@vuepress/core/lib/node/build/index.js
cp .vuepress/scripts/addWorkerScript.js node_modules/@vuepress/core/lib/node/build/worker.js

