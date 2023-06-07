# Github Pull Request 流程

1. 如果很久以前 fork 过，先在自己仓库的 `Settings` 里，翻到最下面，删除
2. 打开 [Alas 主仓库](https://github.com/LmeSzinc/AzurLaneAutoScript)，点击右上角的 `Fork`，然后点击下面绿色的 `Create fork`
3. 进入自己账号下的 Alas 仓库，并 `clone` 其中的 `dev` 分支到本地

    ```shell
    git clone url -b dev
    ```

4. 阅读 [Alas 开发文档](../develop/index.md)
5. 到这里，你就有机会成为一名 光荣的 伟大的 Alas 贡献者了！
6. 开发过程中，建议完成所有功能/任务后，再提交 `commit`, 别忘了按照下面的 `统一格式` 写上 `message`

    ```shell
    git commit -m 'message'
    ```

    >    message的统一格式例子：
    > 
    >     Upd: [EN] RESEARCH_UNAVAILABLE
    > 
    >     Add: Handle the 6th research project
    > 
    >     Fix: Continuous click in research_queue_add() on slow PCs

7. 完成开发后，推送本地分支到自己的仓库

    ```shell
    git push -u origin
    ```
    > 第一次 `push` 代码需要按照提示设置上传流(`--set-upstream`),之后继续按照第 7 步进行即可

8.  打开 [Alas 仓库](https://github.com/LmeSzinc/AzurLaneAutoScript)。提交一个 `pull request` (会自动携带你 `commit` 的信息)，等待管理员通过。注意：要提交到 `dev` 分支上，别提交到 `master` 分支去了
9.  当 Alas 原仓库出现更改（别人做的），你需要把这些更改同步到你 fork 的仓库
    1. 关联 Alas 原仓库

        ```shell
        git remote add upstream https://github.com/LmeSzinc/AzurLaneAutoScript.git
        ```

    2. 从 Alas 原仓库拉取更新

        ```shell
        git fetch upstream
        ```

    3. 合并修改

        ```shell
        git merge upstream/dev
        ```

    4. 处理分支冲突


    5. 重复上述 5, 6, 7, 8 中的操作
