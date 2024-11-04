### Git Flow 规范

## 主要分支 (The main branch)

- main
- develop

## 辅助分支 (Supporting branch)

- feature branch (功能分支)
- release branch (预发布分支)
- hotfix branch (热修复分支)

https://www.cnblogs.com/kevin-ying/p/14329768.html#1-git-flow-%E5%8E%9F%E7%90%86%E4%BB%8B%E7%BB%8D

#### main

> 只可以从 release(稳定版) 和 hotfix 中更新
> main 分支的代码永远是稳定的，可以随时发布到生产环境。

#### develop

> 开发主分支

---

- 只可以从 release 和 hotfix 分支合并

---

#### feature

- 分支来源：develop
- 合并到分支：develop
- 分支命名约定：feature-\*

> 从 develop 分支创建 feature 分支
> 完成后 --no-ff 合并到 develop

---

#### hotfix

- 分支来源：main
- 合并到分支：develop，main
- 分支命名约定：hotfix-\*

> 用于对 main 分支的紧急修复, 完成后需要同时 --no-ff 合并到 develop 和 main

---

#### release

- 分支来源：develop
- 合并到分支：develop，main
- 分支命名约定：release-\*

> 预发布分支, 用于在此分支上进行测试, 若有 bug, 直接在此分支修改, 没有问题后
> 如果有修改, 需要 使用 --no-ff 的方式 重新合并到 develop 提示用
> 测试完毕后, 使用 --no-ff 的方式合并到 main 并打上 tag

---
