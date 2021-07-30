# git fetch origin master
# git checkout master
# git pull origin master
yarn
export BRANCH_NAME='test'
yarn docs:build

rm -rf temp
mkdir temp
cd temp
git clone https://github.com/PX4/docs.px4.io.git
rm -rf docs.px4.io/test
mkdir -p docs.px4.io/test
cp -r ../.vuepress/dist/* docs.px4.io/test/
cd docs.px4.io
git add .
git checkout -b update_test
git commit -a -m "docs test update"
git push origin update_test
