# Migration Log

## 2026-09-11

- 任务类型：已有项目迁移/文件整理。
- 原始目录：`/Users/czh/Desktop/work game`
- 目标目录：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 迁移方式：复制原项目文件，不删除原始目录。
- 文件落点：
  - 游戏主入口复制到 `src/index.html`
  - QA 与构建辅助复制到 `src/qa/`
  - 原始项目说明复制到 `docs/ORIGINAL_README.md`
  - 新建标准根目录说明 `README.md`
- 备份情况：目标目录不存在，无同名覆盖；原始桌面项目保留作为迁移前副本。
- 迁移验证结果：已在 `src/` 目录运行 `node qa/check.cjs`，37 项 v3 回归检查全部通过。

## 2026-09-11

- 任务类型：已有项目维护/本体玩法增强。
- 工作目录：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 备份目录：`logs/backups-20260911-211120/`
- 修改文件：
  - `src/qa/v3-management.js`
  - `src/qa/check-v3.cjs`
  - `src/qa/upgrade-v3.py`
  - `src/index.html`
  - `README.md`
  - `logs/MIGRATION_LOG.md`
- 玩法改动：
  - 新增高峰时段系统：备货慢档、早八高峰、午休排队、下班顺路。
  - 新增经营流派识别与加成：早餐搭子流、大学城茶饮流、精品少单高利流、薄利多销流、三店排班流。
  - 新增对手经营动作：不同邻居会轻微影响客流或利润，随着对手信心降低而减弱。
  - 经营台展示当前高峰、流派和对手动作，让玩家更容易做经营判断。
- 验证结果：已在 `src/` 目录运行 `node qa/check.cjs`，39 项 v3 回归检查全部通过。

## 2026-09-11

- 任务类型：已有项目维护/交互体验打磨。
- 工作目录：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 备份目录：`logs/backups-20260911-212836/`
- 修改文件：
  - `src/qa/upgrade-v3.py`
  - `src/qa/check-v3.cjs`
  - `src/index.html`
  - `README.md`
  - `logs/MIGRATION_LOG.md`
- 交互改动：
  - 场景中的店铺 SVG 增加内层 `store-body`，鼠标悬停/键盘聚焦时平滑抬起并放大。
  - 增加 `store-halo` 光晕，增强指向反馈。
  - 点击或键盘选择店铺时短暂保持激活态，和右侧店铺卡片联动更自然。
  - 尊重 `prefers-reduced-motion`，降低动态效果。

## 2026-09-11

- 任务类型：已有项目维护/GitHub 上传准备。
- 工作目录：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 备份目录：`logs/backups-20260911-213915/`
- 修改文件：
  - `.gitignore`
  - `logs/MIGRATION_LOG.md`
- Git 准备：
  - 初始化本地 Git 仓库。
  - 新增 `.gitignore`，排除 `.DS_Store` 与本地备份目录 `logs/backups-*/`。
  - 提交首个本地快照，提交号：`8020c38`。
- 上传状态：
  - 本机未安装 `gh` 命令，当前无法直接在本机创建 GitHub 仓库。
  - 等待用户提供已有 GitHub 仓库地址，或先在 GitHub 网页端创建空仓库后再推送。

## 2026-09-11

- 任务类型：已有项目维护/GitHub 上传完成。
- 工作目录：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 备份目录：`logs/backups-20260911-224849/`
- GitHub 仓库：`git@github.com:ParkMinyoung0304/moyu-little-street.git`
- 操作记录：
  - 生成并添加本机 SSH key 到 GitHub。
  - `ssh -T git@github.com` 已认证为 `ParkMinyoung0304`。
  - 执行 `git push -u origin main`，成功创建远端 `main` 分支。
- 验证结果：
  - `git ls-remote --heads origin` 返回 `dc6da6f2741c929a3434f4c27e78348769e0be24 refs/heads/main`。
  - 本地分支已跟踪 `origin/main`。
