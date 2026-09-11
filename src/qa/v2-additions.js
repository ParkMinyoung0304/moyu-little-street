// v2 content and systems, embedded into the standalone index.html by upgrade-v2.py.
const PRODUCTS=[
 [{name:'经典拿铁',icon:'☕',mult:1,desc:'熟悉的味道，稳定营业。'},{name:'冰滴咖啡',icon:'🧊',mult:1.25,desc:'咖啡收入 +25%。'},{name:'灵感特调',icon:'💡',mult:1.1,desc:'咖啡收入 +10%，灵感产出 +50%。'},{name:'早八套餐',icon:'🥪',mult:1.15,desc:'搭配烘焙套餐时，咖啡收入 +70%。'}],
 [{name:'黄油可颂',icon:'🥐',mult:1,desc:'外酥里软的基础款。'},{name:'蜂蜜吐司',icon:'🍞',mult:1.25,desc:'烘焙收入 +25%。'},{name:'招财猫饼干',icon:'🐱',mult:1.1,desc:'烘焙收入 +10%，整活费用 −15%。'},{name:'早餐搭子',icon:'🥯',mult:1.15,desc:'搭配早八咖啡时，烘焙收入 +70%。'}],
 [{name:'珍珠奶茶',icon:'🧋',mult:1,desc:'全糖加冰，快乐标配。'},{name:'满杯果茶',icon:'🍋',mult:1.25,desc:'茶饮收入 +25%。'},{name:'整活气泡水',icon:'🫧',mult:1.1,desc:'茶饮收入 +10%，整活冷却 −5 秒。'},{name:'海盐冰沙',icon:'🍧',mult:1.35,desc:'茶饮收入 +35%；海边商圈提升至 +90%。'}]
];
const RESEARCH=[
 {id:'menu',name:'招牌研发',icon:'🧪',desc:['解锁三店第 2 款产品','解锁三店第 3 款策略产品','解锁三店第 4 款联动产品']},
 {id:'service',name:'贴心服务',icon:'🛎️',desc:['全店收入 +6%','全店收入累计 +12%','全店收入累计 +18%']},
 {id:'prank',name:'整活工坊',icon:'🦆',desc:['解锁「纸箱迷宫」','解锁「即兴喇叭秀」','解锁「泡泡轰炸」']}
];
const DISTRICTS=[
 {name:'摸鱼老街',icon:'🏡',need:0,mult:[1,1,1],ground:'#e6edda',desc:'三种生意都能安稳经营。'},
 {name:'写字楼下',icon:'🏢',need:3,mult:[1.5,1.2,.85],ground:'#e0e9df',desc:'咖啡 ×1.5，烘焙 ×1.2，茶饮 ×0.85。'},
 {name:'大学城',icon:'🎓',need:10,mult:[.9,1.15,1.5],ground:'#e9ebcf',desc:'咖啡 ×0.9，烘焙 ×1.15，茶饮 ×1.5。'},
 {name:'雨巷社区',icon:'🌦️',need:25,mult:[1.15,1.55,.9],ground:'#dfe8e5',desc:'咖啡 ×1.15，烘焙 ×1.55，茶饮 ×0.9。'},
 {name:'不夜小街',icon:'🌙',need:50,mult:[1.45,.9,1.5],ground:'#e3e0ed',desc:'咖啡 ×1.45，烘焙 ×0.9，茶饮 ×1.5。'},
 {name:'海风集市',icon:'🏖️',need:90,mult:[1.1,1.25,1.6],ground:'#d9ede8',desc:'咖啡 ×1.1，烘焙 ×1.25，茶饮 ×1.6；海盐冰沙额外增收。'}
];
const EXTRA_PRANKS=[
 {name:'纸箱迷宫',icon:'📦',desc:'让老板先找到自己的店门',damage:34,min:80,seconds:18,unlock:1,weights:[58,10,10,6,6,6,4]},
 {name:'即兴喇叭秀',icon:'📯',desc:'开演唱会，观众随机买账',damage:38,min:95,seconds:20,unlock:2,weights:[50,18,12,6,5,4,5]},
 {name:'泡泡轰炸',icon:'🫧',desc:'招牌、老板和街道全是泡泡',damage:43,min:110,seconds:24,unlock:3,weights:[63,10,8,5,5,4,5]}
];
PRANKS[0].desc='50% 削弱对手，其余随机奇遇';PRANKS[0].weights=[50,20,10,6,4,4,6];
PRANKS[1].desc='65% 削弱对手，其余随机奇遇';PRANKS[1].weights=[65,8,7,5,5,4,6];
PRANKS[2].desc='60% 削弱对手，其余随机奇遇';PRANKS[2].weights=[60,10,10,6,4,4,6];
PRANKS.push(...EXTRA_PRANKS);
const OUTCOME_TYPES=['damage','boost','cash','loss','slow','heal','miss'];
const OUTCOME_NAMES={damage:'隔壁受损',boost:'意外爆火',cash:'意外小费',loss:'小小破费',slow:'忙中出错',heal:'帮了倒忙',miss:'无事发生'};
EVENTS.push(
 {icon:'🎬',who:'电影社 · 小周',title:'借你的门头拍一部大片',text:'“预算只有三十，但片名已经想好了：《拿铁危机》。”',choices:[['提供友情场地','60 秒收入 +30%','music'],['给剧本提点建议','获得 3 点研发灵感','insight']]},
 {icon:'🛸',who:'顾客 · 神秘来客',title:'这杯奶茶支持星际配送吗？',text:'他认真问你能不能送到仙女座。看起来不像在开玩笑。',choices:[['先收地球段配送费','获得 30 秒正常收入','cashback'],['听听他的星际创业故事','获得 3 点研发灵感','insight']]},
 {icon:'🧓',who:'街坊 · 赵阿姨',title:'阿姨要给你介绍对象',text:'“隔壁老板人是卷了点，但店里有空调。你考虑一下？”',choices:[['阿姨，买杯咖啡吧','获得 20 秒正常收入','smallTip'],['转移话题，问做生意的经验','获得 3 点研发灵感','insight']]},
 {icon:'🪴',who:'园艺师 · 阿绿',title:'门口那盆草想换工作',text:'“它说当盆栽很无聊，想去做圣诞树。我觉得很有理想。”',choices:[['帮它打扮打扮','90 秒收入 +30%','cat'],['让它帮忙看设备折扣','获得一张设备七五折券','coupon']]},
 {icon:'🏃',who:'跑团 · 老队长',title:'终点可以设在你家店吗？',text:'“五公里，跑完一人一杯。我们不追求配速，只追求全糖。”',choices:[['安排饮料补给','90 秒收入 +30%','rain'],['赞助一个好听的队名','获得 30 秒正常收入','cashback']]},
 {icon:'🎨',who:'画手 · 小墨',title:'想给你画一幅老板肖像',text:'“我画画比较抽象，你不要提前对自己的五官抱有期待。”',choices:[['画完直接挂店里','60 秒收入 +30%','music'],['把灵感用到新产品上','获得 3 点研发灵感','insight']]},
 {icon:'🎤',who:'员工 · 小夏',title:'店员想办一场辞职主题开放麦',text:'“老板放心，全是创作，完全没有个人情绪在里面。”',choices:[['安排一个麦克风','60 秒收入 +50%','machine'],['一起写几个段子','获得 3 点研发灵感','insight']]},
 {icon:'🐶',who:'带狗的客人',title:'它只想来店里上班',text:'一只柯基叼着简历。工作经验写的是：门铃响一次，叫三次。',choices:[['聘为气氛组','90 秒收入 +30%','cat'],['给它发一份优秀员工奖','获得 20 秒正常收入','smallTip']]},
 {icon:'📚',who:'读书会 · 小林',title:'这周读《如何优雅地不努力》',text:'“我们想包几个座位，不过可能读两页就睡着。”',choices:[['睡吧，茶水管够','90 秒收入 +30%','rain'],['借本书来研究一下','获得 3 点研发灵感','insight']]},
 {icon:'🕹️',who:'复古玩家',title:'门口放台街机怎么样？',text:'“我负责机器，你负责提醒我回家。提醒就行，不一定听。”',choices:[['给游戏区开张','60 秒收入 +50%','machine'],['研究他的投币装置','获得 3 点研发灵感','insight']]},
 {icon:'🍄',who:'供货商 · 老陈',title:'这批蘑菇形状有点可爱',text:'“不是蘑菇，是面包。真的，蘑菇不会有奶油夹心。”',choices:[['搞个限量盲盒','70% 获得 50 秒收入，30% 获得 5 秒','weirdDrink'],['走稳妥路线','获得 20 秒正常收入','smallTip']]},
 {icon:'📮',who:'街区管理员',title:'有人给你投了一封感谢信',text:'信里只有一句话：“谢谢你开店，我终于有地方合理发呆了。”',choices:[['装裱起来','90 秒收入 +30%','cat'],['回一封信','获得 3 点研发灵感','insight']]},
 {icon:'💃',who:'广场舞团',title:'今晚来一场年轻人的养生局',text:'“就跳一首。真的就一首。加上返场、安可和合影。”',choices:[['门口欢迎大家','60 秒收入 +50%','machine'],['顺便推销热饮','获得 30 秒正常收入','cashback']]},
 {icon:'🧊',who:'制冰机',title:'它今天只肯吐爱心形的冰',text:'维修师傅说机器没坏，只是在热恋期，过几天可能就好了。',choices:[['推出限定情侣杯','90 秒收入 +30%','cat'],['研究它的浪漫算法','获得 3 点研发灵感','insight']]},
 {icon:'🎁',who:'旧同事 · 阿陆',title:'同事送来一个神秘纸箱',text:'里面是你以前留在公司的马克杯，还有一张写着“快跑”的便签。',choices:[['马克杯加入营业','获得 30 秒正常收入','cashback'],['把便签写进创业笔记','获得 3 点研发灵感','insight']]},
 {icon:'🌈',who:'街头摄影师',title:'雨后的小街长出了一道彩虹',text:'“老板，能不能笑一下？不是营业微笑，是发工资那种。”',choices:[['笑到客人也笑了','90 秒收入 +30%','rain'],['这张留作新菜单封面','获得 3 点研发灵感','insight']]}
);
function freshExpansion(){return {products:[0,0,0],research:{menu:0,service:0,prank:0},ideas:0,district:0,contractsDone:0,contract:{shop:-1,progress:0,target:240},outcomesSeen:[],rivalsSeen:[],eventsSeen:[],pranksUsed:0,lastPrank:null};}
function normalizeExpansion(s,raw){
 const x=freshExpansion();s.research={};for(const r of RESEARCH)s.research[r.id]=clamp(Math.floor(finite(raw.research?.[r.id])),0,3);
 s.products=SHOP_DEFS.map((_,i)=>clamp(Math.floor(finite(raw.products?.[i])),0,s.research.menu));
 s.ideas=clamp(finite(raw.ideas),0,1e9);s.contractsDone=clamp(Math.floor(finite(raw.contractsDone)),0,1e9);
 s.district=clamp(Math.floor(finite(raw.district)),0,DISTRICTS.length-1);if(s.contractsDone<DISTRICTS[s.district].need)s.district=0;
 s.contract={...x.contract};if(raw.contract){const i=raw.contract.shop;s.contract.shop=Number.isInteger(i)&&i>=0&&i<3&&s.levels[i]>0?i:-1;s.contract.target=clamp(finite(raw.contract.target,240),1,1e12);s.contract.progress=clamp(finite(raw.contract.progress),0,s.contract.target);}
 for(const k of ['outcomesSeen','rivalsSeen','eventsSeen'])s[k]=Array.isArray(raw[k])?[...new Set(raw[k])].filter(v=>k==='outcomesSeen'?typeof v==='string'&&/^([0-5]):(damage|boost|cash|loss|slow|heal|miss)$/.test(v):Number.isInteger(v)&&v>=0&&v<(k==='rivalsSeen'?RIVALS.length:EVENTS.length)):[];
 s.pranksUsed=clamp(Math.floor(finite(raw.pranksUsed)),0,1e9);
 s.lastPrank=raw.lastPrank&&typeof raw.lastPrank.text==='string'?{text:raw.lastPrank.text.slice(0,180),kind:OUTCOME_TYPES.includes(raw.lastPrank.kind)?raw.lastPrank.kind:'miss',at:clamp(finite(raw.lastPrank.at),0,Date.now())}:null;
}
function productMultiplier(s,i){const p=s.products?.[i]||0;let m=PRODUCTS[i][p].mult;if(i<2&&s.products?.[0]===3&&s.products?.[1]===3&&s.levels[0]>0&&s.levels[1]>0)m=1.7;if(i===2&&p===3&&s.district===5)m=1.9;return m;}
function ideaRate(s){return (s.products?.[0]===2?1.5:1)/60;}
function nextContract(s){const open=s.levels.map((l,i)=>l?i:-1).filter(i=>i>=0),sequence=s.contractsDone%(open.length+1),shop=sequence===0?-1:open[sequence-1],rate=shop<0?normalRate(s):shopIncome(s,shop)*(s.defeats>0&&s.style==='cozy'?1.15:1);return {shop,progress:0,target:Math.max(120,rate*(120+Math.min(240,s.contractsDone*4)))};}
function advanceExpansion(s,dt,gain){
 s.ideas=Math.min(1e9,s.ideas+Math.max(0,dt)*ideaRate(s));if(gain<=0)return;
 // Production money advances commissions; tips and commission rewards never recurse.
 const rates=s.levels.map((_,i)=>shopIncome(s,i)),sum=rates.reduce((a,b)=>a+b,0);let remaining=gain,completed=0;
 while(remaining>1e-8&&completed<10000){const c=s.contract,share=c.shop<0?1:(sum?rates[c.shop]/sum:0);if(share<=0)break;const needed=Math.max(0,c.target-c.progress)/share;
  if(remaining+1e-7<needed){c.progress+=remaining*share;break;}
  remaining=Math.max(0,remaining-needed);s.contractsDone++;completed++;s.ideas=Math.min(1e9,s.ideas+1);addCash(s,Math.max(20,normalRate(s)*15));s.contract=nextContract(s);
 }
}
function researchCost(s,id){const l=s.research[id];return {cash:[600,3200,15000][l]||0,ideas:[5,14,32][l]||0};}
function buyResearch(s,id){if(!RESEARCH.some(r=>r.id===id)||s.research[id]>=3)return false;const c=researchCost(s,id);if(s.cash<c.cash||s.ideas+1e-7<c.ideas)return false;s.cash-=c.cash;s.ideas=Math.max(0,s.ideas-c.ideas);s.research[id]++;return true;}
function prankCooldown(s){return Math.max(20,(s.defeats>0&&s.style==='social'?30:45)-(s.levels[2]>0&&s.products?.[2]===2?5:0));}
function rollOutcome(i,random=Math.random){const weights=PRANKS[i].weights,total=weights.reduce((a,b)=>a+b,0);let n=clamp(random(),0,.999999999)*total;for(let j=0;j<weights.length;j++){n-=weights[j];if(n<0)return OUTCOME_TYPES[j];}return 'miss';}
function attemptPrank(s,i,now,random=Math.random){
 const p=PRANKS[i];if(!p||(p.unlock||0)>s.research.prank||s.npc.hp<=0||now<s.prankReady||now<s.truceUntil)return null;
 const cost=prankCost(s,i);if(s.cash<cost)return null;const kind=rollOutcome(i,random);s.cash-=cost;s.prankReady=now+prankCooldown(s)*1000;s.pranksUsed++;
 const r={kind,cost,amount:0,text:'',effectCount:kind==='miss'?0:1};
 switch(kind){
  case 'damage':r.amount=Math.round(p.damage*(.8+clamp(random(),0,1)*.4)*(RIVALS[s.npc.type].weak===i%3?1.25:1)*(s.defeats>0&&s.style==='chaos'?1.3:1));s.npc.hp=Math.max(0,s.npc.hp-r.amount);r.text=p.name+'成功！隔壁信心 −'+r.amount+'。';break;
  case 'boost':{const until=now+45000,old=s.boosts.find(b=>b.factor===1.3&&b.until>now);if(old)old.until=Math.max(old.until,until);else s.boosts.push({factor:1.3,until});r.text='整活视频意外火了！你的收入 +30%，持续 45 秒。';break;}
  case 'cash':r.amount=normalRate(s)*(15+Math.floor(clamp(random(),0,1)*15));addCash(s,r.amount);r.text='围观群众笑出了小费！获得 ¥'+money(r.amount)+'。';break;
  case 'loss':r.amount=Math.min(s.cash*.01,normalRate(s)*10);s.cash=Math.max(0,s.cash-r.amount);r.text='道具买错了，额外小小破费 ¥'+money(r.amount)+'。';break;
  case 'slow':if(now<s.slowUntil){r.kind='miss';r.effectCount=0;r.text='员工已经在收拾上次的残局，本次没有新增损失。';}else{s.slowUntil=now+15000;r.text='员工笑得忘记接单：15 秒收入 −10%，自动恢复。';}break;
  case 'heal':r.amount=Math.min(8,s.npc.max-s.npc.hp);s.npc.hp+=r.amount;r.text='意外帮隔壁吸引了观众，对手信心 +'+r.amount+'。';break;
  default:r.text='老板正好去午睡了，整活扑了个空。';
 }
 const seen=i+':'+r.kind;if(!s.outcomesSeen.includes(seen))s.outcomesSeen.push(seen);s.lastPrank={kind:r.kind,text:r.text,at:now};return r;
}
let stageView='home',visualKey='',visitorNodes=[],lastLongState='',effectSerial=0;
function switchStage(view){stageView=view;lastScene='';visualKey='';render();}
function showResearch(){
 const body='<p>挂机每分钟积累灵感，委托也会奖励灵感。不需要签到或守着收取。</p>'+RESEARCH.map(r=>{const l=state.research[r.id],c=researchCost(state,r.id);return `<div class="research-row"><span class="research-icon">${r.icon}</span><div><b>${r.name} <small>Lv.${l}/3</small></b><p>${l>=3?'该路线已全部研究完成':r.desc[l]}</p><small>${l>=3?'已完成':`¥${money(c.cash)} + ${c.ideas} 灵感`}</small></div><button class="secondary" id="research-${r.id}" data-research="${r.id}" ${l>=3||state.cash<c.cash||state.ideas<c.ideas?'disabled':''}>${l>=3?'完成':'研究'}</button></div>`;}).join('');
 modal('🧪','小街研究室 · '+Math.floor(state.ideas)+' 灵感',body);
}
function showProducts(i){const l=state.research.menu;modal(SHOP_DEFS[i].icon,SHOP_DEFS[i].name+' · 招牌菜单','<p>免费换招牌，等级保留。不同产品会改变经营打法；在研究室解锁新菜单。</p><div class="menu-grid">'+PRODUCTS[i].map((p,j)=>`<button class="menu-item ${state.products[i]===j?'chosen':''}" data-product-shop="${i}" data-product="${j}" ${j>l?'disabled':''}><span>${p.icon}</span><b>${p.name}</b><small>${j>l?'需要招牌研发 Lv.'+j:p.desc}</small>${state.products[i]===j?'<em>当前招牌</em>':''}</button>`).join('')+'</div>');}
function showDistricts(){modal('🗺️','去不同的商圈做生意','<p>换商圈免费，店铺、等级和现金全部保留。委托自动完成后会持续解锁新商圈。</p><div class="menu-grid">'+DISTRICTS.map((d,i)=>`<button class="menu-item ${state.district===i?'chosen':''}" data-district="${i}" ${state.contractsDone<d.need?'disabled':''}><span>${d.icon}</span><b>${d.name}</b><small>${d.desc}</small><em>${state.contractsDone<d.need?'完成 '+d.need+' 张委托解锁':state.district===i?'当前商圈':'点击搬到这里'}</em></button>`).join('')+'</div>');}
function showJournal(){const total=PRANKS.length*OUTCOME_TYPES.length+RIVALS.length+EVENTS.length,have=state.outcomesSeen.length+state.rivalsSeen.length+state.eventsSeen.length;modal('📒','街区图鉴 · '+have+'/'+total,'<p>遇见不同老板、处理街坊故事、发现整活结果。不会掉落重复材料，也没有限时收集。</p><h3 class="journal-title">老板档案 · '+state.rivalsSeen.length+'/'+RIVALS.length+'</h3><div class="journal-grid">'+RIVALS.map((r,i)=>`<span class="journal-item ${state.rivalsSeen.includes(i)?'found':''}">${state.rivalsSeen.includes(i)?'✓ '+r.name:'? '+r.trait}</span>`).join('')+'</div><h3 class="journal-title">整活发现 · '+state.outcomesSeen.length+'/'+(PRANKS.length*7)+'</h3>'+PRANKS.map((p,i)=>`<p class="journal-prank">${p.icon} ${p.name}<br>${OUTCOME_TYPES.map(k=>`<span class="journal-dot ${state.outcomesSeen.includes(i+':'+k)?'found':''}" title="${OUTCOME_NAMES[k]}">${state.outcomesSeen.includes(i+':'+k)?'●':'○'} ${OUTCOME_NAMES[k]}</span>`).join(' ')}</p>`).join('')+'<p>街坊故事：已处理 '+state.eventsSeen.length+'/'+EVENTS.length+' 篇。新故事会自动来找你。</p>');}
function showOdds(){modal('🎲','一次整活，只抽一种结果','<p>每种招数有不同概率。行动费用与冷却固定；下面七种结果只会抽中一个。对手退场奖励属于单独的关店结算。</p><div class="odds-scroll"><table class="odds-table"><tr><th>招数</th>'+OUTCOME_TYPES.map(k=>'<th>'+OUTCOME_NAMES[k]+'</th>').join('')+'</tr>'+PRANKS.map(p=>'<tr><th>'+p.name+'</th>'+p.weights.map(w=>'<td>'+w+'%</td>').join('')+'</tr>').join('')+'</table></div><p>负面结果最多额外扣当前现金 1% 且不超过 10 秒收入，或使收入降低 10%、持续 15 秒。不会毁店或降低等级。</p>');}
function renderLong(){
 const c=state.contract,ratio=clamp(c.progress/c.target,0,1),next=DISTRICTS.find(d=>d.need>state.contractsDone);
 $('ideaCount').textContent=Math.floor(state.ideas)+' 灵感';$('districtLabel').textContent=DISTRICTS[state.district].icon+' '+DISTRICTS[state.district].name;
 $('contractName').textContent=c.shop<0?'街区拼单 · 全店营业额':SHOP_DEFS[c.shop].name+' · 专属团购';$('contractProgress').textContent='¥'+money(c.progress)+' / '+money(c.target);$('contractFill').style.width=ratio*100+'%';
 $('contractNote').textContent='完成 '+state.contractsDone+' 单 · 自动结算：15 秒正常收入 + 1 灵感';$('nextDistrict').textContent=next?'再完成 '+(next.need-state.contractsDone)+' 单，解锁「'+next.name+'」':'所有商圈已解锁 · 换招牌、换商圈，继续接单';
 $('homeView').setAttribute('aria-pressed',String(stageView==='home'));$('rivalView').setAttribute('aria-pressed',String(stageView==='rival'));$('sceneTitle').textContent=stageView==='home'?'我的摸鱼街区':'隔壁 · '+RIVALS[state.npc.type].name;
 $('sceneCaption').textContent=stageView==='home'?'顾客进店 → 等待制作 → 拿着商品离开':'隔壁也在营业 · 招牌和店面会随经营状态变化';
 $('lastResult').textContent=state.lastPrank?OUTCOME_NAMES[state.lastPrank.kind]+' · '+state.lastPrank.text:'每次整活只随机结算一个结果，运气也是生意的一部分。';
 SHOP_DEFS.forEach((_,i)=>{$('productLabel'+i).textContent=PRODUCTS[i][state.products[i]].icon+' '+PRODUCTS[i][state.products[i]].name;$('menu'+i).disabled=state.levels[i]===0;});
 const sig=JSON.stringify([state.research,state.cash>=600,state.cash>=3200,state.cash>=15000,Math.floor(state.ideas)]);if(sig!==lastLongState){lastLongState=sig;$('researchSummary').textContent='研发 '+state.research.menu+'/3 · 服务 '+state.research.service+'/3 · 整活 '+state.research.prank+'/3';}
 if($('infoDialog').open&&$('dialogTitle').textContent.startsWith('小街研究室')){$('dialogTitle').textContent='小街研究室 · '+Math.floor(state.ideas)+' 灵感';for(const r of RESEARCH){const b=$('research-'+r.id),cost=researchCost(state,r.id);if(b)b.disabled=state.research[r.id]>=3||state.cash<cost.cash||state.ideas+1e-7<cost.ideas;}}
}
function carrySvg(i,productOverride){const p=productOverride??state.products[i],icon=PRODUCTS[i][p].icon;if(p!==0)return `<text x="8" y="21" font-size="18">${icon}</text>`;
 if(i===0)return '<g transform="translate(10 11)"><rect width="10" height="12" rx="2" fill="#fff5dd" stroke="#bfa47c"/><path d="M10 3q7-1 5 6h-5" fill="none" stroke="#bfa47c" stroke-width="2"/><path d="M1 2h8" stroke="#8b5e3f" stroke-width="2"/></g>';
 if(i===1)return '<g transform="translate(9 8)"><path d="M0 7h16l-1 18H1Z" fill="#ebd4a3" stroke="#c2aa7e"/><path d="M2 8q-1-12 6-8 7-6 7 8" fill="#d9a164"/><path d="m5 1 2 7m4-8 1 8" stroke="#f4cb85" stroke-width="2"/></g>';
 return '<g transform="translate(10 8)"><path d="M0 3h13l-2 19H2Z" fill="#e5c897" stroke="#aa976f"/><path d="m7-5-1 10" stroke="#6b7056" stroke-width="2"/><circle cx="5" cy="17" r="1.5" fill="#6c6250"/><circle cx="9" cy="15" r="1.5" fill="#6c6250"/></g>';
}
function visitPose(t,shop=0,reverse=false,rival=false){
 const xs=rival?[456]:[193,436,679],ys=rival?[224]:[218,205,220],tx=xs[rival?0:shop],ty=ys[rival?0:shop],start=reverse?942:-42,end=reverse?-42:942,lane=275+(shop%2)*13;
 const mix=(a,b,v)=>a+(b-a)*v;let x=start,y=lane,phase='路过',carrying=false,visible=true;
 if(t<4){x=mix(start,tx,t/4);phase='走向店铺';}
 else if(t<5.2){x=tx;y=mix(lane,ty,(t-4)/1.2);phase='进店';}
 else if(t<7.4){x=tx;y=ty;phase='等待制作';}
 else if(t<8){x=tx;y=ty;phase='取到商品';carrying=true;}
 else if(t<9.2){x=tx;y=mix(ty,lane,(t-8)/1.2);phase='出店';carrying=true;}
 else if(t<15.2){x=mix(tx,end,(t-9.2)/6);carrying=true;phase='购物后离开';}
 else visible=false;
 if(!['等待制作','取到商品'].includes(phase))y+=Math.sin(t*12)*1.1;
 return {x,y,phase,carrying,visible};
}
function visitorMarkup(){const shops=stageView==='home'?state.levels.map((l,i)=>l?i:-1).filter(i=>i>=0):[state.npc.type%3];visitorNodes=Array.from({length:stageView==='rival'&&state.npc.hp<=0?0:6},(_,j)=>({id:j,shop:shops[j%shops.length],offset:j*3.1,reverse:j%2===1}));return visitorNodes.map(v=>`<g id="visitor${v.id}" data-customer="${v.id}" aria-label="正在逛街的顾客"><g>${person(['#ce9d86','#9bab81','#93aaa4','#b6a4a1','#c6b574','#9baec0'][v.id])}</g><g id="carried${v.id}" opacity="0">${carrySvg(v.shop,stageView==='rival'?0:undefined)}</g><g id="waiting${v.id}" opacity="0"><rect x="-15" y="-32" width="30" height="17" rx="8" fill="#fffdf3" stroke="#d6dcbf"/><text x="0" y="-20" text-anchor="middle" font-size="13" fill="#879470">···</text></g></g>`).join('');}
function animateVisitors(now=Date.now()){
 if(document.hidden||bossMode)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 for(const v of visitorNodes){const node=$('visitor'+v.id);if(!node)continue;const t=reduced?10+(v.id*.5):(now/1000+v.offset)%19.6,p=visitPose(t,v.shop,v.reverse,stageView==='rival');node.setAttribute('transform',`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);node.setAttribute('opacity',p.visible?'1':'0');node.setAttribute('data-phase',p.phase);node.setAttribute('aria-label',p.phase+' · '+SHOP_DEFS[v.shop].name);$('carried'+v.id)?.setAttribute('opacity',p.carrying?'1':'0');$('waiting'+v.id)?.setAttribute('opacity',p.phase==='等待制作'?'1':'0');}
}
function buildRivalScene(){const r=RIVALS[state.npc.type],hp=state.npc.hp/state.npc.max,closed=hp<=0,damage=hp<.34?2:hp<.67?1:0;
 const building=storeSvg(state.npc.type%3,0,0,{def:{...SHOP_DEFS[state.npc.type%3],name:r.name,sign:r.name},level:10,roof:r.color});
 return `<svg viewBox="0 0 900 352" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="rivalDots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#ccb899"/></pattern></defs><rect width="900" height="352" fill="url(#rivalDots)" opacity=".22"/><path d="M66 180Q35 80 165 87l504-15q146 8 161 102l-14 91q-57 54-285 43L157 299Q51 294 66 180Z" fill="#eee5d5"/><path d="M79 278Q297 267 453 286t363-15" fill="none" stroke="#fff8e5" stroke-width="51" stroke-linecap="round"/>${tree(162,165,1.2)}${tree(731,175,1.1)}${tree(671,87,.55)}<path d="M228 92v-27h-82v84h63" fill="#e2d8bf"/><path d="M737 105v-34h65v114h-34" fill="#ddd7c4"/><text x="450" y="31" text-anchor="middle" font-size="11" letter-spacing="3" fill="#ac9477">THE NEIGHBOURHOOD RIVAL</text><g transform="translate(341 78) scale(1.3)"><g id="rivalBuilding" style="transform-origin:90px 150px">${building}${damage>0?'<path d="m38 2-3 17 11 8-8 16m84 78-16 8 7 10-10 6" fill="none" stroke="#826f60" stroke-width="3"/>':''}${damage>1?'<path d="M64 130h31l-7 15H67Z" fill="#bbaa93"/><path d="m21 33 10 12-10 8m104-12-9 12 15 3" fill="none" stroke="#92745e" stroke-width="3"/>':''}${closed?'<g><rect x="12" y="59" width="128" height="87" fill="#b6aa97"/><path d="M14 68h123m-123 13h123m-123 13h123m-123 13h123m-123 13h123m-123 13h123" stroke="#958c7c" stroke-width="2"/><rect x="36" y="86" width="84" height="35" rx="3" fill="#fff7df" transform="rotate(-8 75 100)"/><text x="76" y="109" text-anchor="middle" font-size="20" font-weight="bold" fill="#c0785b">旺铺招租</text></g>':''}</g></g><g transform="translate(658 263)">${person(r.color)}<text x="0" y="-22" text-anchor="middle" font-size="24">${closed?'💼':damage>1?'💢':damage?'😤':'💬'}</text></g><g transform="translate(242 219)"><path d="M0 0h55v48H0Z" fill="#fcf8e7" stroke="#bba17c" stroke-width="3"/><text x="27" y="18" text-anchor="middle" font-size="10" fill="#8d7d61">${closed?'暂停营业':'今日营业'}</text><text x="27" y="36" text-anchor="middle" font-size="11" fill="#ba8562">${closed?'老板跑路':'全街最低？'}</text></g><text x="450" y="338" text-anchor="middle" font-size="10" fill="#aa967a">${esc(r.boss)}的店 · ${closed?'正在搬家，新对手稍后入驻':damage>1?'门面狼狈，老板开始怀疑人生':damage?'招牌摇摇欲坠，生意有点冷清':'看起来信心满满，正适合打个招呼'}</text></svg>`;
}
function renderScene(){const d=DISTRICTS[state.district],zone=state.npc.hp<=0?0:Math.ceil(state.npc.hp/state.npc.max*3),sig=JSON.stringify([stageView,state.levels,state.products,state.district,state.npc.type,stageView==='rival'?zone:0]);if(sig===lastScene)return;lastScene=sig;let svg=stageView==='home'?buildHomeScene().replace('fill="#e6edda"','fill="'+d.ground+'"'):buildRivalScene();svg=svg.replace('</svg>','<g id="visitorLayer">'+visitorMarkup()+'</g><g id="impactLayer" aria-hidden="true"></g></svg>');$('scene').innerHTML=svg;$('scene').setAttribute('aria-label',stageView==='home'?'顾客进店购买商品的商业街':'竞争对手 '+RIVALS[state.npc.type].name+' 的店铺');animateVisitors();}
function animatePrank(i,result){
 if(bossMode||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const layer=$('impactLayer');if(!layer)return;const serial=++effectSerial,good=result.kind==='damage',bad=['loss','slow'].includes(result.kind),closed=state.npc.hp<=0;
 const actor=PRANKS[i].icon;let art='';
 if(result.kind==='heal')art='<text x="449" y="181" text-anchor="middle" font-size="54" fill="#83ae77">＋</text>';
 else if(result.kind==='cash'||result.kind==='boost')art='<text x="240" y="186" font-size="30">'+(result.kind==='cash'?'💰 ✨ 💰':'📈 💛 📈')+'</text><text x="253" y="230" font-size="15" fill="#6d985d">← 好运飞回我的店</text>';
 else if(result.kind==='miss')art='<text x="450" y="205" text-anchor="middle" font-size="45">💤</text><text x="450" y="245" text-anchor="middle" font-size="15" fill="#9b8c79">老板不在，整了个寂寞</text>';
 else if(bad)art='<text x="320" y="245" font-size="35">'+actor+' 💫 😵</text><text x="360" y="205" text-anchor="middle" font-size="15" fill="#b77e66">哎呀，翻车了</text>';
 else if(i===3)art=Array.from({length:9},(_,n)=>'<text x="'+(367+n%3*48)+'" y="'+(210+Math.floor(n/3)*27)+'" font-size="40">📦</text>').join('');
 else if(i===5)art=Array.from({length:16},(_,n)=>'<circle cx="'+(340+(n*41)%210)+'" cy="'+(110+(n*31)%155)+'" r="'+(9+n%5*3)+'" fill="#d2eef466" stroke="#8bbbcaaa" stroke-width="2"/>').join('');
 else if(i===4)art='<text x="308" y="239" font-size="55">📯</text><path d="M375 170q70 50 0 100m25-120q95 70 0 140m30-160q115 90 0 180" fill="none" stroke="#d9ac61" stroke-width="5" opacity=".65"/>';
 else art='<text x="245" y="266" font-size="36">'+(i===0?'🎟️ 🎟️ 🎟️ ✨':i===1?'🦆 🦆 🦆 🦆 🦆':'🐱 💼 🐾')+'</text>';
 layer.innerHTML='<g id="prankActors">'+art+'</g>';const actors=$('prankActors');actors?.animate([{opacity:0,transform:'translate(-60px, 12px)'},{opacity:1,transform:'translate(0,0)',offset:.18},{opacity:1,transform:'translate(20px,0)',offset:.82},{opacity:0,transform:bad?'translate(-100px,10px)':'translate(55px,-18px)'}],{duration:4800,easing:'ease-in-out'});
 if(good&&!closed)$('rivalBuilding')?.animate([{transform:'rotate(0deg)'},{transform:'rotate(-3deg)'},{transform:'rotate(3deg)'},{transform:'rotate(-2deg)'},{transform:'rotate(0deg)'}],{duration:600,iterations:4});
 setTimeout(()=>{if(effectSerial===serial&&$('impactLayer'))$('impactLayer').innerHTML='';},4900);
}
function handlePrankClick(e){const b=e.target.closest('[data-prank]');if(!b)return;settle();const i=Number(b.dataset.prank),now=Date.now(),r=attemptPrank(state,i,now);if(!r)return;state.npc.quote=r.kind==='damage'?(RIVALS[state.npc.type].hit[i%3]):r.kind==='heal'?'你这算是来捣乱，还是来帮忙的？':r.kind==='miss'?'刚才有什么事吗？我睡得挺好。':['loss','slow'].includes(r.kind)?'哎哟，怎么把自己绊了一跤？':'你整活怎么还能把生意整红火了？';log('【'+OUTCOME_NAMES[r.kind]+'】'+r.text);toast(r.text);if(state.npc.hp===0)finishRival(now);play('prank');stageView='rival';render();animatePrank(i,r);if(innerWidth<850)$('scene').scrollIntoView({behavior:'smooth',block:'center'});save();}
function bindExpansion(){
 $('homeView').addEventListener('click',()=>switchStage('home'));$('rivalView').addEventListener('click',()=>switchStage('rival'));$('researchBtn').addEventListener('click',showResearch);$('districtBtn').addEventListener('click',showDistricts);$('journalBtn').addEventListener('click',showJournal);$('oddsBtn').addEventListener('click',showOdds);
 $('dialogBody').addEventListener('click',e=>{const r=e.target.closest('[data-research]'),p=e.target.closest('[data-product]'),d=e.target.closest('[data-district]');if(!r&&!p&&!d)return;settle();if(r){if(!buyResearch(state,r.dataset.research))return;log(RESEARCH.find(x=>x.id===r.dataset.research).name+'研究完成，新的经营选择已解锁。');showResearch();}else if(p){const i=Number(p.dataset.productShop),j=Number(p.dataset.product);if(!PRODUCTS[i]?.[j]||j>state.research.menu||state.levels[i]<=0)return;state.products[i]=j;$('infoDialog').close();toast('招牌换成「'+PRODUCTS[i][j].name+'」，等级全部保留。');}else{const i=Number(d.dataset.district);if(!DISTRICTS[i]||state.contractsDone<DISTRICTS[i].need)return;state.district=i;stageView='home';$('infoDialog').close();log('搬到「'+DISTRICTS[i].name+'」，店铺与等级全部保留。');}render();save();});
 setInterval(()=>animateVisitors(),50);
}
