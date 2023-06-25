# Github Pull Request steps

1. If you forked a long time ago, first go to the bottom of `Settings` in your repository and delete it.
2. Open [Alas origin repository](https://github.com/LmeSzinc/AzurLaneAutoScript), click `Fork` in the upper right corner, then click `Create fork` in green below
3. Go to your own Alas repository and `clone` the `dev` branch to local

    ```shell
    git clone url -b dev
    ```

4. Read the [Alas development documentation](../develop/index.m)
5. Here's your chance to become an honorable Alas contributor!
6. During development, it is recommended to submit `commit` after completing all functions/tasks, and don't forget to write `message` in the following `uniform format`

    ```shell
    git commit -m 'message'
    ```

    >    Example of uniform format for message.
    > 
    >     Upd: [EN] RESEARCH_UNAVAILABLE
    > 
    >     Add: Handle the 6th research project
    > 
    >     Fix: Continuous click in research_queue_add() on slow PCs

7. Push the local branch to your own repository after you finish development

    ```shell
    git push -u origin
    ```
    > For the first time the `push` needs to set the upload stream (`--set-upstream`) follow the tips, then continue with step 7

8. Open the [Alas repository](https://github.com/LmeSzinc/AzurLaneAutoScript). Submit a `pull request` (which will automatically carry your `commit` message) and wait for the administrator to approve it. Note: Commit to the `dev` branch, not to the `master` branch!


9.  When there are changes to the original Alas repository (made by someone else), you need to fetch and merge changes to your onw repository first
    1. Add upstream of the original Alas repository

        ```shell
        git remote add upstream https://github.com/LmeSzinc/AzurLaneAutoScript.git
        ```

    2. Fetch updates from the original Alas repository

        ```shell
        git fetch upstream
        ```

    3. Merge the changes

        ```shell
        git merge upstream/dev
        ```

    4. Handle branch conflicts


    5. Repeat the actions in steps 5, 6, 7, and 8