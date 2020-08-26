### bug
```js
// 本地分支如何绑定远程
git init
git remote add origin URL
git branch --set-upstream-to=origin/<branch> master
git add .
git commit -m ''
git push
```