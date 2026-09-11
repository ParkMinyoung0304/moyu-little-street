# 摸鱼小街项目迁移归档

## 项目状态

- 项目名称：摸鱼小街 v4 gameplay build
- 当前状态：已迁移到 Codex Workspace，并完成第一轮本体玩法增强
- 原始位置：`/Users/czh/Desktop/work game`
- 标准位置：`/Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street`
- 迁移日期：2026-09-11

## 目录说明

- `src/index.html`：离线可玩的游戏主入口。
- `src/qa/`：回归检查、预览页面和版本升级辅助脚本。
- `docs/ORIGINAL_README.md`：迁移前项目原始说明。
- `logs/MIGRATION_LOG.md`：本次迁移记录。
- `outputs/`：后续构建产物、导出包、截图等输出文件。
- `references/`：后续参考资料、截图说明或外部资料。

## 运行方式

直接双击 `src/index.html` 可离线游玩。

可选本地预览：

```bash
cd /Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street/src
python -m http.server 8080 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:8080`。

## 验证方式

```bash
cd /Users/czh/Documents/Codex/Workspace/project-004-moyu-little-street/src
node qa/check.cjs
```

当前回归检查为 39 项，覆盖旧存档迁移、经营经济、离线收益、分店项目、店铺进阶、对手整活、动画结算，以及新增的高峰时段和经营流派。

## v4 本体玩法增强

- 新增高峰时段：备货慢档、早八高峰、午休排队、下班顺路。不同窗口影响客流、产能、利润或灵感。
- 新增经营流派识别：早餐搭子流、大学城茶饮流、精品少单高利流、薄利多销流、三店排班流。
- 新增隔壁经营动作：对手会以低价截流、网红排队、精品装腔等方式轻微影响不同店铺，血量越低影响越弱。
- 经营台会显示当前高峰、流派和对手动作，帮助玩家判断短板。
- 店铺场景交互打磨：鼠标悬停或键盘聚焦店铺时会平滑放大、抬起并出现柔和光晕，划到另一家店会自然过渡。
- 保留原老板模式定位：现实摸鱼时一键伪装 Excel，不做游戏内老板玩法。

## 迁移说明

本次迁移采用复制归档方式，未删除原桌面项目。后续维护、输出和记录应优先在本 Workspace 项目目录内进行。
