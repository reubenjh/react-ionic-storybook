#!/usr/bin/env bash

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

git add .

git stash

git fetch

git checkout gh-pages

git rm -rf .

rm -rf node_modules

git stash apply

mv ./tmp/d318f44739dced66793b1a603028133a76ae680e ./

mv tmp/index.html ./

mv tmp/sha1.js ./

git add .

git commit -m "Deploying Storybook"

git push origin gh-pages --force

git checkout $branch
