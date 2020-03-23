### guild
#### git本地文件和远程分支绑定
1. 先从github克隆到本地
 `git clone https://github.com/项目名.git`  
 `git clone git@github.com:用户名/项目名.git  `
2. `git init`
3.  添加所有文件 `git add .`
4. 提交 `git commit -m " update "`
5. 连接远程仓库 `git remote add origin https://github.com/项目名.git `  
6. 把本地项目推送到远程仓库 `git push -u origin master `
