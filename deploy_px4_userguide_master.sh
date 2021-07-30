git fetch origin master
git checkout master
git pull origin master
yarn
export BRANCH_NAME='master'
yarn docs:build

rm -rf temp
mkdir temp
cd temp
git clone https://github.com/PX4/docs.px4.io.git
rm -rf docs.px4.io/master
mkdir -p docs.px4.io/master
cp -r ../.vuepress/dist/* docs.px4.io/master/
cd docs.px4.io
git add .
git checkout -b update_master
git commit -a -m "docs build update"
git push origin update_master
