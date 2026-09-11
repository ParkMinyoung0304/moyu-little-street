from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
code = (root / 'qa/v1-backup.html').read_text(encoding='utf-8')

def replace(old, new, count=1):
    global code
    actual = code.count(old)
    if actual != count:
        raise RuntimeError(f'Expected {count} matches, got {actual}: {old[:110]}')
    code = code.replace(old, new)

replace('</style>', (root / 'qa/v2-additions.css').read_text(encoding='utf-8') + '\n</style>')
replace('我的摸鱼街区 <small>NO. 001</small>', '<span id="sceneTitle">我的摸鱼街区</span> <small>NO. 002</small>')
replace('</span></div><div class="scene" id="scene"', '</span></div><div class="stage-tools"><div class="view-tabs"><button class="view-tab" id="homeView" aria-pressed="true">🏡 我的小街</button><button class="view-tab" id="rivalView" aria-pressed="false">🏪 看看隔壁</button></div><span class="pill" id="districtLabel">摸鱼老街</span></div><p class="scene-caption" id="sceneCaption" style="padding:0 22px;margin:10px 0 0">顾客进店 → 等待制作 → 拿着商品离开</p><div class="scene" id="scene"')
replace('<section class="shop-grid"', '<div class="stage-receipt panel" id="lastResult">每次整活只随机结算一个结果。</div>\n   <section class="shop-grid"')
replace('<section class="panel event-card">', '''<section class="panel long-panel"><div class="long-head"><h2>小街成长计划 <small style="font-size:9px;color:#9aa88a">SLOW BUSINESS</small></h2><span id="ideaCount">0 灵感</span></div><div class="long-actions"><button class="long-action" id="researchBtn"><b>🧪 研究室</b><small id="researchSummary">研发 0/3 · 服务 0/3 · 整活 0/3</small></button><button class="long-action" id="districtBtn"><b>🗺️ 换个商圈</b><small>6 个商圈，各有客群偏好</small></button><button class="long-action" id="journalBtn"><b>📒 街区图鉴</b><small>故事、老板和整活结果</small></button></div><div class="contract-head"><b id="contractName">街区拼单 · 全店营业额</b><span id="contractProgress">0 / 240</span></div><div class="contract-track"><i id="contractFill"></i></div><div class="contract-foot"><span id="contractNote">自动结算，无需领取</span><span>无期限 · 离线也计入</span></div><p class="next-district" id="nextDistrict"></p></section>
   <section class="panel event-card">''')
replace('<strong>去隔壁整点活</strong><span id="prankStatus">', '<strong>去隔壁整点活</strong><button id="oddsBtn">查看效果概率</button><span id="prankStatus">')
replace('v1.0 · 不上班也能开店', 'v2.0 · 小街有了新故事')
replace('return {version:1,cash:88', 'return {version:2,cash:88')
replace('savedAt:now,sound:false};}', 'savedAt:now,sound:false,...freshExpansion()};}')
replace('raw.version!==1', '![1,2].includes(raw.version)')
replace('if(s.npc.hp<=0&&!s.respawnAt)', 'normalizeExpansion(s,raw);if(s.npc.hp<=0&&!s.respawnAt)')
replace('return SHOP_DEFS[i].income*l*Math.pow(1.5,Math.floor(l/10));', 'return SHOP_DEFS[i].income*l*Math.pow(1.5,Math.floor(l/10))*productMultiplier(s,i)*DISTRICTS[s.district||0].mult[i]*(1+(s.research?.service||0)*.06);')
replace("*(s.defeats>0&&s.style==='social'?.9:1));}", "*(s.defeats>0&&s.style==='social'?.9:1)*(s.levels[1]>0&&s.products?.[1]===2?.85:1));}")
replace('return addCash(s,gain);}', 'addCash(s,gain);advanceExpansion(s,(to-from)/1000,gain);return gain;}')
replace('function settleOffline(s,now){const elapsed=clamp((now-s.savedAt)/1000,0,MAX_OFFLINE),gain=addCash(s,normalRate(s)*elapsed);s.savedAt=now;return {elapsed,gain};}', 'function settleOffline(s,now){const elapsed=clamp((now-s.savedAt)/1000,0,MAX_OFFLINE),before=s.cash,gain=addCash(s,normalRate(s)*elapsed);advanceExpansion(s,elapsed,gain);s.savedAt=now;return {elapsed,gain:s.cash-before};}')
replace('let state=fresh(Date.now()),lastTick=Date.now()', (root / 'qa/v2-additions.js').read_text(encoding='utf-8') + '\nlet state=fresh(Date.now()),lastTick=Date.now()')
replace('if(stored){state=normalize(JSON.parse(stored),lastTick);', "if(stored){const raw=JSON.parse(stored);if(raw.version===1&&!localStorage.getItem(KEY+'-before-v2')){try{localStorage.setItem(KEY+'-before-v2',stored);}catch(e){}}state=normalize(raw,lastTick);")

start = code.index('function damageRival(')
end = code.index('function newRival(', start)
code = code[:start] + '''function finishRival(now){if(state.npc.hp>0||state.respawnAt)return false;const rival=RIVALS[state.npc.type],reward=Math.max(150,normalRate(state)*90);state.defeats++;addCash(state,reward);state.respawnAt=now+8000;state.npc.quote=rival.bye;log('【关店结算】'+rival.name+'宣布撤退，奖励 ¥'+money(reward));toast('隔壁宣布“战略撤退”！关店奖励 ¥'+money(reward)+(state.defeats===1?'，经营风格已解锁。':''));celebrate();play();return true;}
function damageRival(amount,quote,now){if(state.npc.hp<=0)return false;state.npc.hp=Math.max(0,state.npc.hp-amount);state.npc.quote=quote;if(state.npc.hp===0)finishRival(now);return true;}
''' + code[end:]
replace("state.npc={type,hp:max,max,quote:RIVALS[type].hello};", "state.npc={type,hp:max,max,quote:RIVALS[type].hello};if(!state.rivalsSeen.includes(type))state.rivalsSeen.push(type);")
replace("case 'music':buff", "case 'insight':state.ideas=Math.min(1e9,state.ideas+3);result='聊天聊出了新点子，获得 3 点研发灵感。';break;\n  case 'music':buff")
replace('state.eventId=null;state.eventIn=145', 'if(!state.eventsSeen.includes(id))state.eventsSeen.push(id);state.eventId=null;state.eventIn=145')
replace('if(dt>30){const report=settleOffline({...state,savedAt:lastTick},now);addCash(state,report.gain);lastTick=now;return;}', 'if(dt>30){state.savedAt=lastTick;settleOffline(state,now);lastTick=now;return;}')
replace("function storeSvg(i,x,y){const def=SHOP_DEFS[i],level=state.levels[i],open=level>0;const roof=['#da947b','#b9bf81','#91bdb7'][i]", "function storeSvg(i,x,y,options={}){const def=options.def||SHOP_DEFS[i],level=options.level??state.levels[i],open=level>0;const roof=options.roof||['#da947b','#b9bf81','#91bdb7'][i]")
replace("function renderScene(){const sig=state.levels.join(',');if(sig===lastScene)return;lastScene=sig;$('scene').innerHTML=", 'function buildHomeScene(){return ')
start=code.index('<g transform="translate(0 282)">',code.index('function buildHomeScene'))
end=code.index('<g fill="#a8be86">',start)
code=code[:start]+code[end:]
replace('<div class="progress"><i id="progress${i}"></i></div><button class="buy"', '<div class="progress"><i id="progress${i}"></i></div><button class="menu-btn" id="menu${i}" data-menu="${i}"><span id="productLabel${i}"></span><small>换招牌 ↗</small></button><button class="buy"')
replace("$('prank'+i).disabled=closed||truce>0||wait>0||state.cash<prankCost(state,i);$('prankEffect'+i).textContent=(rival.weak===i?'✦ 弱点！ ':'')+p.desc;", "$('prank'+i).disabled=closed||truce>0||wait>0||state.cash<prankCost(state,i)||(p.unlock||0)>state.research.prank;$('prankEffect'+i).textContent=(p.unlock||0)>state.research.prank?'整活工坊 Lv.'+p.unlock+' 解锁':(rival.weak===i%3?'✦ 弱点！ ':'')+p.desc;")
replace('renderEvent(now);\n const logs=', 'renderEvent(now);renderLong();\n const logs=')
replace('initUI();if(!state.logs.length)', 'initUI();bindExpansion();if(!state.rivalsSeen.includes(state.npc.type))state.rivalsSeen.push(state.npc.type);if(!state.logs.length)')
replace("$('shops').addEventListener('click',e=>{const b=e.target.closest('[data-buy]');", "$('shops').addEventListener('click',e=>{const m=e.target.closest('[data-menu]');if(m){showProducts(Number(m.dataset.menu));return;}const b=e.target.closest('[data-buy]');")
start=code.index("$('pranks').addEventListener('click',e=>")
end=code.index("$('styles').addEventListener",start)
code=code[:start]+"$('pranks').addEventListener('click',handlePrankClick);\n"+code[end:]
replace("function selectShop(e){const g=", "function selectShop(e){if(stageView==='rival')return;const g=")
replace("const elapsed=clamp((now-hiddenAt)/1000,0,MAX_OFFLINE),gain=addCash(state,normalRate(state)*elapsed);lastTick=now;hiddenAt=null;", "state.savedAt=hiddenAt;const {elapsed,gain}=settleOffline(state,now);lastTick=now;hiddenAt=null;")
code=re.sub(r"setInterval\(\(\)=>\{if\(!document.hidden&&!bossMode\)\{const open=state.levels.*?\},3500\);\n",'',code)
replace('街角偶尔有人找你聊天，选个喜欢的回答就好，不处理也没损失。隔壁老板可以随便整活：瞄准他的弱点，效果更好。', '顾客会走到店前，等待制作，拿到商品后离开。可用场景上方的按钮看隔壁店铺，整活时会自动切过去。每次从七类结果中只抽一种，具体概率可查看。')
replace('店铺最高 25 级，邻居会一直换新。', '店铺最高 25 级，邻居会一直换新。现在还可研究 9 项技术、切换 12 款产品、解锁 6 个商圈、收集 24 篇街坊故事与整活图鉴。')
replace('进度每 5 秒自动保存，离线收益最多累计 7 天。', '委托无期限，收入达标后自动结算并接下一单，离线也能积累委托和研发灵感。进度每 5 秒自动保存，离线收益最多累计 7 天。')
(root / 'index.html').write_text(code,encoding='utf-8')
print('Built standalone v2:',len(code),'characters')
