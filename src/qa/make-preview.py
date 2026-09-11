from pathlib import Path

root=Path(__file__).resolve().parent.parent
page=(root/'index.html').read_text(encoding='utf-8')
page=page.replace("KEY='little-street-save-v1'", "KEY='little-street-qa-v2'")
page=page.replace('initUI();bindExpansion();', "state=fresh(Date.now());state.cash=500000;state.ideas=200;state.levels=[8,5,3];state.contractsDone=100;offlineReport=null;initUI();bindExpansion();")
(root/'qa/preview-v2.html').write_text(page,encoding='utf-8')
print('Created isolated browser QA page with separate save key.')
