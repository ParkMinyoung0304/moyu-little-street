from pathlib import Path
root=Path(__file__).resolve().parent.parent
p=root/'qa/check.cjs'
old=p.read_text(encoding='utf-8')
if "require('./check-v3.cjs')" not in old:
    (root/'qa/check-v2.cjs').write_text(old.replace("path.join(__dirname,'..','index.html')","path.join(__dirname,'v2-before-v3.html')"),encoding='utf-8')
    p.write_text("// Current game regression suite. Historical v2 checks use the preserved baseline.\nrequire('./check-v3.cjs');\n",encoding='utf-8')
page=(root/'index.html').read_text(encoding='utf-8')
page=page.replace('设备最高 25 级；','店铺可进阶到五星，设备最高 125 级；').replace('9 项研究、6 个商圈、24 篇街坊故事仍然保留。','研究扩展为每条 15 级，需要分店、销量和累计营业积累；6 个商圈、24 篇街坊故事继续保留。')
page=page.replace('小街有了新故事','慢慢开店，认真整活')
page=page.replace('离线没有反击。</p>','离线没有反击。邻居还会留下引流广告牌、叫卖音箱和宣传气球，最多同时两件，点击道具即可清理并恢复；不处理也会在 20 分钟后消失，离线结算不扣这部分收益。</p>')
page=page.replace('对手信心归零后搬走，新邻居很快入驻。','对手信心归零后搬走，随机 75–240 秒后新邻居搬入。转让期间全街获得随机 1.2–1.8 倍客流；新店入驻时会播放搬家、卸货和剪彩动画。这属于关店后的街区变化，整活仍只抽一种结果。')
(root/'index.html').write_text(page,encoding='utf-8')
print('Updated current test entry and player-facing help.')
