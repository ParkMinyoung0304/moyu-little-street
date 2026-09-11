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
