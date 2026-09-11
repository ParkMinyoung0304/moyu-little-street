// v3: capacity, demand, staff development and persistent franchise projects.
const PRICING=[{name:'薄利多销',short:'平价',margin:.78,demand:1.45},{name:'日常好价',short:'标准',margin:1,demand:1},{name:'精品路线',short:'精品',margin:1.42,demand:.66}];
const STAFF=[
 {name:'阿团',icon:'🧑‍🍳',role:'出品能手',desc:'产能 +18%，每级再 +3%。',cost:0,ideas:0,cap:.18},
 {name:'小鹿',icon:'📣',role:'社交达人',desc:'客流 +25%，每级再 +4%。',cost:900,ideas:4,demand:.25},
 {name:'老麦',icon:'🥇',role:'匠心师傅',desc:'单件净利 +20%，每级再 +3%。',cost:2400,ideas:10,margin:.20},
 {name:'阿眠',icon:'🔬',role:'配方研究员',desc:'全街灵感 +40%，每级再 +5%。',cost:3800,ideas:16,idea:.40},
 {name:'双双',icon:'👯',role:'流水线搭档',desc:'产能 +30%，每级再 +4%；客流 −8%。',cost:6200,ideas:24,cap:.30,demand:-.08},
 {name:'大橘',icon:'🐈',role:'店长兼店猫',desc:'客流 +18%、净利 +10%；每级各 +2%。',cost:8500,ideas:32,demand:.18,margin:.10}
];
const PROJECT_TYPES=[
 {id:'volume',icon:'🥡',name:'社区便民店',desc:'用平价路线服务街坊。该店只有平价订单计入。',unit:800,fee:500,ideas:3,price:0,bonus:'每家永久增加全店产能 2%（最多 50%）'},
 {id:'premium',icon:'🎖️',name:'街角精品店',desc:'靠精品订单建立口碑。该店只有精品订单计入。',unit:420,fee:900,ideas:5,price:2,bonus:'每家永久增加全店单件净利 2%（最多 50%）'},
 {id:'trio',icon:'🥪',name:'三店生活馆',desc:'三家店各完成一份销量目标；三店都开张即可筹建。',unit:210,fee:1600,ideas:8,price:1,bonus:'每家永久增加全街灵感速度 5%（最多 100%）'}
];
const PEAK_WINDOWS=[
 {id:'prep',name:'备货慢档',icon:'🧾',shop:-1,demand:[1,1,1],capacity:[1,1,1],margin:[1,1,1],idea:1.25,desc:'客流平稳，适合研发、调岗和换菜单。'},
 {id:'morning',name:'早八高峰',icon:'🌅',shop:0,demand:[1.22,1.16,1],capacity:[1,1.04,1],margin:[1.04,1.03,1],idea:1,desc:'咖啡和烘焙更吃香，早餐组合会更顺。'},
 {id:'lunch',name:'午休排队',icon:'🍱',shop:2,demand:[1.04,1.08,1.24],capacity:[1,1,1.05],margin:[1,1.02,1.04],idea:1,desc:'茶饮客流上涨，产能跟不上就会白白排队。'},
 {id:'afterwork',name:'下班顺路',icon:'🌆',shop:-1,demand:[1.12,1.12,1.12],capacity:[1,1,1],margin:[1.03,1.03,1.03],idea:1,desc:'三家店一起热闹，适合冲订单和分店项目。'}
];
const RIVAL_PLAYS=[
 {name:'低价截流',shop:0,demand:.08,desc:'正在用低价券抢咖啡客。'},
 {name:'网红排队',shop:2,demand:.10,desc:'拍照队伍挤走了一点茶饮客。'},
 {name:'精品装腔',shop:1,margin:.06,desc:'把烘焙价格锚点抬高了。'},
 {name:'团购轰炸',shop:-1,demand:.05,desc:'全街客流被他抢走一点。'},
 {name:'熟客攀谈',shop:1,demand:.07,desc:'街坊被拉去聊老交情。'},
 {name:'新品试吃',shop:2,margin:.05,desc:'茶饮利润空间被迫收紧。'}
];
function freshManagement(){return {pricing:[1,1,1],staff:[{hired:true,xp:0},...STAFF.slice(1).map(()=>({hired:false,xp:0}))],assignments:[0,-1,-1],served:[0,0,0],mastery:SHOP_DEFS.map(()=>[0,0,0,0]),businessTime:0,branches:[0,0,0],portfolio:[],project:null,projectNotice:null};}
function branchCount(s){return (s.branches||[0,0,0]).reduce((a,b)=>a+b,0);}
function staffLevel(s,id){return 1+Math.min(9,Math.floor(Math.sqrt(Math.max(0,s.staff?.[id]?.xp||0)/30)));}
function masteryLevel(s,i,p=s.products[i]){return Math.min(10,Math.floor(Math.sqrt((s.mastery?.[i]?.[p]||0)/1000)));}
function normalizeManagement(s,raw){
 const f=freshManagement();s.pricing=f.pricing.map((_,i)=>clamp(Math.floor(finite(raw.pricing?.[i],1)),0,2));
 s.staff=STAFF.map((_,i)=>({hired:i===0||raw.staff?.[i]?.hired===true,xp:clamp(finite(raw.staff?.[i]?.xp),0,1e8)}));
 const used=new Set();s.assignments=f.assignments.map((v,i)=>{const id=raw.assignments?.[i]??v;if(!Number.isInteger(id)||!s.staff[id]?.hired||used.has(id)||!s.levels[i])return -1;used.add(id);return id;});
 s.served=f.served.map((_,i)=>clamp(finite(raw.served?.[i]),0,1e15));s.mastery=f.mastery.map((row,i)=>row.map((_,j)=>clamp(finite(raw.mastery?.[i]?.[j]),0,1e15)));
 s.businessTime=clamp(finite(raw.businessTime),0,1e12);s.branches=f.branches.map((_,i)=>clamp(Math.floor(finite(raw.branches?.[i])),0,1e6));
 s.portfolio=Array.isArray(raw.portfolio)?raw.portfolio.filter(p=>p&&Number.isInteger(p.type)&&PROJECT_TYPES[p.type]&&Number.isInteger(p.shop)&&SHOP_DEFS[p.shop]&&Number.isInteger(p.no)&&p.no>0).slice(-12).map(p=>({type:p.type,shop:p.shop,no:p.no})):[];
 s.project=null;const p=raw.project;
 if(p&&Number.isInteger(p.type)&&PROJECT_TYPES[p.type]&&Number.isInteger(p.shop)&&SHOP_DEFS[p.shop]&&s.levels[p.shop]>0&&(p.type!==2||s.levels.every(Boolean))&&p.chapter===branchCount(s)){
  const offer=projectOffer(s,p.type);s.project={...offer,progress:offer.targets.map((target,i)=>clamp(finite(p.progress?.[i]),0,target))};
 }
 s.projectNotice=typeof raw.projectNotice==='string'?raw.projectNotice.slice(0,150):null;
}
function staffEffects(s,i){const id=s.assignments?.[i]??-1,d=STAFF[id],level=id<0?0:staffLevel(s,id)-1;if(!d||!s.staff[id].hired)return {cap:1,demand:1,margin:1,idea:0};return {
 cap:1+(d.cap||0)+(d.cap?level*(id===4?.04:.03):0),
 demand:1+(d.demand||0)+(d.demand>0?level*(id===5?.02:.04):0),
 margin:1+(d.margin||0)+(d.margin?level*(id===5?.02:.03):0),idea:(d.idea||0)+(d.idea?level*.05:0)};}
function trend(s){const n=Math.floor((s.businessTime||0)/14400);return {shop:n%3,left:14400-(s.businessTime||0)%14400};}
function peakWindow(s){const span=300,idx=Math.floor((s.businessTime||0)/span)%PEAK_WINDOWS.length,w=PEAK_WINDOWS[idx];return {...w,left:span-(s.businessTime||0)%span};}
function strategyProfile(s){
 const open=s.levels.filter(Boolean).length,allOpen=open===3,allPremium=allOpen&&s.pricing.every(p=>p===2),allValue=allOpen&&s.pricing.every(p=>p===0),staffed=s.assignments.filter(id=>id>=0).length;
 if(s.levels[0]>0&&s.levels[1]>0&&s.products?.[0]===3&&s.products?.[1]===3)return {id:'breakfast',name:'早餐搭子流',icon:'🥪',demand:[1.12,1.12,1],capacity:[1.04,1.04,1],margin:[1.04,1.04,1],idea:1,desc:'咖啡和烘焙互相带单，早高峰特别舒服。'};
 if(s.district===2&&s.levels[2]>0&&s.pricing[2]===0)return {id:'studentTea',name:'大学城茶饮流',icon:'🎓',demand:[1,1.04,1.18],capacity:[1,1,1.05],margin:[1,1,.98],idea:1,desc:'用低价茶饮吃学生客流，靠产能和熟练度赚钱。'};
 if(allPremium)return {id:'premium',name:'精品少单高利流',icon:'🎖️',demand:[.92,.92,.92],capacity:[1,1,1],margin:[1.13,1.13,1.13],idea:1,desc:'客人少一点，但每单更值钱，适合高熟练员工。'};
 if(allValue)return {id:'volume',name:'薄利多销流',icon:'🥡',demand:[1.14,1.14,1.14],capacity:[1.06,1.06,1.06],margin:[.98,.98,.98],idea:1,desc:'用价格换排队，需要设备和员工接住客流。'};
 if(staffed>=3)return {id:'team',name:'三店排班流',icon:'👥',demand:[1.04,1.04,1.04],capacity:[1.08,1.08,1.08],margin:[1.02,1.02,1.02],idea:1.08,desc:'三家店都有驻店员工，经营更稳，灵感也来得更快。'};
 return {id:'starter',name:'摸鱼稳开流',icon:'🌿',demand:[1,1,1],capacity:[1,1,1],margin:[1,1,1],idea:1,desc:'先补设备、开新店、看短板，再决定路线。'};
}
function rivalPlay(s,i,offline=false){if(offline||s.npc.hp<=0||s.online<180)return {demand:1,margin:1,label:''};const p=RIVAL_PLAYS[s.npc.type%RIVAL_PLAYS.length],weak=s.npc.hp/s.npc.max,scale=weak<.34?.35:weak<.67?.65:1,hit=p.shop<0||p.shop===i;if(!hit)return {demand:1,margin:1,label:p.name};return {demand:1-(p.demand||0)*scale,margin:1-(p.margin||0)*scale,label:p.name};}
function operations(s,i,now=Date.now(),offline=false){
 if(!s.levels[i])return {capacity:0,demand:0,units:0,profit:0,rate:0,bottleneck:'尚未开张'};
 const level=s.levels[i],p=s.products?.[i]||0,price=PRICING[s.pricing?.[i]??1],staff=staffEffects(s,i),master=masteryLevel(s,i,p),peak=peakWindow(s),strategy=strategyProfile(s),rival=rivalPlay(s,i,offline);
 const neighborhood=neighborhoodMultipliers(s,i,now,offline),prep=[1,1.12,.9,1.2][p],capacity=(.13+.025*level)*[1,.90,.78][i]/prep*staff.cap*(1+Math.min(.5,(s.branches?.[0]||0)*.02))*neighborhood.capacity*peak.capacity[i]*strategy.capacity[i];
 const regulars=Math.min(.35,Math.log1p((s.served?.[i]||0)/2000)*.06);
 const demand=(.22+.009*level)*DISTRICTS[s.district||0].mult[i]*price.demand*staff.demand*(1+regulars)*(trend(s).shop===i?1.15:1)*neighborhood.demand*peak.demand[i]*strategy.demand[i]*rival.demand;
 const units=Math.min(capacity,demand),profit=[12,22,36][i]*price.margin*productMultiplier(s,i)*staff.margin*(1+master*.025)*(1+(s.research?.service||0)*.06)*(1+Math.max(0,(s.research?.menu||0)-3)*.04)*(1+Math.min(.5,(s.branches?.[1]||0)*.02))*peak.margin[i]*strategy.margin[i]*rival.margin;
 return {capacity,demand,units,profit,rate:units*profit,peak:peak.name,strategy:strategy.name,rival:rival.label,bottleneck:capacity<demand?'出品跟不上 · 升设备 / 配厨师':'客流不足 · 调价 / 换商圈 / 配揽客员工'};
}
function shopIncome(s,i){return operations(s,i).rate;}
function royalty(s){return branchCount(s)*2.5;}
function normalRate(s,now=Date.now(),offline=false){return s.levels.reduce((sum,_,i)=>sum+operations(s,i,now,offline).rate,0)*(s.defeats>0&&s.style==='cozy'?1.15:1)+royalty(s);}
function ideaRate(s){const staff=s.levels.reduce((sum,l,i)=>sum+(l?staffEffects(s,i).idea:0),0),strategy=strategyProfile(s),peak=peakWindow(s);return (s.products?.[0]===2?1.5:1)*(1+staff)*(1+Math.min(1,(s.branches?.[2]||0)*.05))*strategy.idea*peak.idea/60;}
function projectOffer(s,type){const d=PROJECT_TYPES[type],chapter=branchCount(s),shop=(chapter+type)%3,factor=Math.min(50,1+.6*chapter+.07*chapter*chapter),targets=[0,0,0];if(type===2)targets.fill(Math.ceil(d.unit*factor));else targets[shop]=Math.ceil(d.unit*factor);return {type,chapter,shop,targets,fee:Math.ceil(d.fee*(1+chapter*.5)),ideas:Math.ceil(d.ideas*(1+Math.min(10,chapter)*.2))};}
function projectCanStart(s,type){if(s.project||!PROJECT_TYPES[type])return false;const o=projectOffer(s,type);return s.levels[o.shop]>0&&(type!==2||s.levels.every(Boolean))&&s.cash>=o.fee&&s.ideas+1e-7>=o.ideas;}
function startProject(s,type){if(!projectCanStart(s,type))return false;const o=projectOffer(s,type);s.cash-=o.fee;s.ideas=Math.max(0,s.ideas-o.ideas);s.project={...o,progress:[0,0,0]};s.projectNotice=null;for(let i=0;i<3;i++)if(o.targets[i])s.pricing[i]=PROJECT_TYPES[type].price;return true;}
function assignStaff(s,id,shop){if(!Number.isInteger(id)||!Number.isInteger(shop)||shop<0||shop>2||!s.levels[shop]||id< -1||id>=STAFF.length||id>=0&&!s.staff[id].hired)return false;for(let i=0;i<3;i++)if(id>=0&&s.assignments[i]===id)s.assignments[i]=-1;s.assignments[shop]=id;return true;}
function hireStaff(s,id){const d=STAFF[id];if(!d||s.staff[id].hired||s.cash<d.cost||s.ideas+1e-7<d.ideas)return false;s.cash-=d.cost;s.ideas-=d.ideas;s.staff[id].hired=true;return true;}
function completeProject(s){const p=s.project;if(!p||p.progress.some((v,i)=>v+1e-7<p.targets[i]))return false;s.branches[p.type]++;const no=branchCount(s);s.portfolio.push({type:p.type,shop:p.shop,no});s.portfolio=s.portfolio.slice(-12);s.project=null;s.projectNotice='第 '+no+' 家「'+PROJECT_TYPES[p.type].name+'」开业！永久分红 +¥2.5/秒，下一站由你决定。';s.ideas=Math.min(1e9,s.ideas+12+p.chapter*2);return true;}
function progressManagement(s,dt,ops){
 const p=s.project;s.businessTime=Math.min(1e12,s.businessTime+dt);
 for(let i=0;i<3;i++){if(!s.levels[i])continue;const units=ops[i].units*dt;s.served[i]=Math.min(1e15,s.served[i]+units);s.mastery[i][s.products[i]]=Math.min(1e15,s.mastery[i][s.products[i]]+units);const id=s.assignments[i];if(id>=0)s.staff[id].xp=Math.min(1e8,s.staff[id].xp+dt/60);
  if(p&&p.targets[i]&&s.pricing[i]===PROJECT_TYPES[p.type].price)p.progress[i]=Math.min(p.targets[i],p.progress[i]+units);
 }completeProject(s);
}
// Bounded steps let staff and recipe growth benefit both online and offline play.
// Promotional bonuses affect money only; they cannot manufacture franchise orders.
function advanceBusiness(s,from,to,offline=false){if(to<=from)return 0;let at=from,total=0;while(at<to){let end=Math.min(to,at+60000);const ends=[s.vacancy?.until,...(offline?[]:[...s.boosts.map(b=>b.until),s.slowUntil,...s.nuisances.map(n=>n.until)])];for(const until of ends)if(until>at&&until<end)end=until;
 const dt=(end-at)/1000,mid=(at+end)/2,ops=s.levels.map((_,i)=>operations(s,i,mid,offline)),rate=offline?normalRate(s,mid,true):liveRate(s,mid),gain=rate*dt;addCash(s,gain);advanceExpansion(s,dt,gain,mid,offline);progressManagement(s,dt,ops);total+=gain;at=end;
 }return total;}
function accrue(s,from,to){return advanceBusiness(s,from,to,false);}
function settleOffline(s,now){const elapsed=clamp((now-s.savedAt)/1000,0,MAX_OFFLINE),before=s.cash;advanceBusiness(s,now-elapsed*1000,now,true);s.savedAt=now;return {elapsed,gain:s.cash-before};}
function durationText(sec){if(!Number.isFinite(sec))return '调整经营后继续';return sec<3600?Math.max(1,Math.ceil(sec/60))+' 分钟':sec<86400?(sec/3600).toFixed(1)+' 小时':(sec/86400).toFixed(1)+' 天';}
function projectETA(s,p){let eta=0;for(let i=0;i<3;i++)if(p.targets[i]>p.progress[i]){if(s.pricing[i]!==PROJECT_TYPES[p.type].price)return Infinity;eta=Math.max(eta,(p.targets[i]-p.progress[i])/operations(s,i).units);}return eta;}
function showManagement(){const peak=peakWindow(state),strategy=strategyProfile(state),rival=RIVAL_PLAYS[state.npc.type%RIVAL_PLAYS.length];modal('🎛️','经营台 · 找到每家店的短板',`<p>卖出量取「产能、客流」中较小的一项。当前：${peak.icon} ${peak.name} · ${strategy.icon} ${strategy.name}${state.online>=180&&state.npc.hp>0?' · 隔壁'+rival.name:''}。</p>`+SHOP_DEFS.map((d,i)=>{const o=operations(state,i);return `<section class="ops-card"><div class="ops-title"><b>${d.icon} ${d.name}</b><span>${state.levels[i]?'设备 Lv.'+state.levels[i]:'尚未开张'}</span></div><div class="ops-metrics"><span>产能<b id="cap-${i}">${(o.capacity*60).toFixed(1)}</b>件 / 分钟</span><span>客流<b id="demand-${i}">${(o.demand*60).toFixed(1)}</b>人 / 分钟</span><span>净利<b id="net-${i}">¥${o.rate.toFixed(2)}</b>每秒</span></div><p class="bottleneck" id="bottle-${i}">${o.bottleneck}</p><div class="price-options">${PRICING.map((p,j)=>{const alt=operations({...state,pricing:state.pricing.map((v,k)=>k===i?j:v)},i);return `<button data-price="${j}" data-shop="${i}" class="${state.pricing[i]===j?'selected':''}" ${!state.levels[i]?'disabled':''}><b>${p.name}</b><small>${(alt.units*60).toFixed(1)} 单/分 · ¥${alt.rate.toFixed(2)}/秒</small></button>`;}).join('')}</div><p>驻店：${state.assignments[i]>=0?STAFF[state.assignments[i]].icon+' '+STAFF[state.assignments[i]].name+' Lv.'+staffLevel(state,state.assignments[i]):'基础班组'} · 菜单熟练 Lv.${masteryLevel(state,i)}/10（每级净利 +2.5%）</p></section>`;}).join('')+'<p>高峰、流派和隔壁动作会改变经营短板；吆喝、事件加成只增加收入，不会凭空增加项目订单。</p>');}
function showStaff(){modal('👥','员工休息室 · 三个驻店席位','<p>员工只需招聘一次，自动积累工作经验，离线也成长。调岗免费，同一位员工只能驻一家店。未驻店的员工在这里休息。</p><div class="staff-grid">'+STAFF.map((d,id)=>{const h=state.staff[id].hired,l=staffLevel(state,id),assigned=state.assignments.indexOf(id),next=l>=10?'资深员工':Math.max(0,(l*l*30-state.staff[id].xp)).toFixed(0)+' 分钟工作升下级';return `<article class="staff-card"><div class="staff-face">${d.icon}</div><b>${d.name} <small>${d.role}</small></b><p>${d.desc}</p><span>${h?'Lv.'+l+' · '+next:'¥'+money(d.cost)+' + '+d.ideas+' 灵感'}</span>${h?'<div class="staff-assign">'+SHOP_DEFS.map((s,i)=>`<button data-assign="${id}" data-shop="${i}" ${!state.levels[i]?'disabled':''} class="${assigned===i?'selected':''}">${s.icon} ${assigned===i?'在岗':'调入'}</button>`).join('')+(assigned>=0?`<button data-assign="-1" data-shop="${assigned}">休息</button>`:'')+'</div>':`<button class="secondary" data-hire="${id}" id="hire-${id}" ${state.cash<d.cost||state.ideas<d.ideas?'disabled':''}>招聘 · 一次付清</button>`}</article>`;}).join('')+'</div>');}
function showProjects(){const p=state.project;if(p){modal('🏗️','正在筹建 · '+PROJECT_TYPES[p.type].name,'<p>订单自动推进，没有截止时间。完成后自动开业、开始分红；下一个项目由你挑选。</p><div id="project-detail">'+projectDetail(state)+'</div><p>'+PROJECT_TYPES[p.type].bonus+'，另得 '+(12+p.chapter*2)+' 灵感。</p><p>需要「'+PRICING[PROJECT_TYPES[p.type].price].name+'」定价。可以随时调整；不满足时只暂停相应订单，店铺仍然正常赚钱。</p>',[{text:'打开经营台',primary:true,run:showManagement},{text:'继续营业'}]);return;}
 modal('🧭','分店蓝图 · 第 '+(branchCount(state)+1)+' 站','<p>三选一，每次只筹建一家。选择会自动设置对应店铺的定价。只统计启动之后真实售出的商品，现金不能购买订单。每家分店永久分红 ¥2.5/秒，原店铺与资产全部保留。</p><div class="project-offers">'+PROJECT_TYPES.map((d,type)=>{const o=projectOffer(state,type),p={...o,progress:[0,0,0]},sim={...state,pricing:state.pricing.map((v,i)=>o.targets[i]?d.price:v)},open=state.levels[o.shop]>0&&(type!==2||state.levels.every(Boolean));return `<article class="project-offer"><span>${d.icon}</span><h3>${d.name}</h3><p>${d.desc}</p><b>${o.targets.map((v,i)=>v?SHOP_DEFS[i].icon+' '+v+' 单':'').filter(Boolean).join(' / ')}</b><p>${d.bonus}</p><small>按现有设备与员工约 ${open?durationText(projectETA(sim,p)):'需先开张对应店铺'}<br>后续随员工、菜单成长加快；离线有效</small><button class="primary" data-project="${type}" id="project-start-${type}" ${!projectCanStart(state,type)?'disabled':''}>${open?'筹建并设为'+PRICING[d.price].short:'先开张'+(type===2?'全部店铺':SHOP_DEFS[o.shop].name)}<br><small>¥${money(o.fee)} + ${o.ideas} 灵感</small></button></article>`;}).join('')+'</div><p>下一站将轮换主力店铺、提高订单量。设备满级只是主街建成，员工培养、菜单熟练与分店版图会继续成长。</p>');}
function projectDetail(s){const p=s.project;if(!p)return '<b>已自动开业！关闭窗口，挑选下一站。</b>';return p.targets.map((v,i)=>v?`<div class="project-line"><span>${SHOP_DEFS[i].icon} ${SHOP_DEFS[i].name} <small>${s.pricing[i]===PROJECT_TYPES[p.type].price?'正在接单':'请切换为'+PRICING[PROJECT_TYPES[p.type].price].name}</small></span><b>${Math.floor(p.progress[i])} / ${v}</b><div class="contract-track"><i style="width:${p.progress[i]/v*100}%"></i></div></div>`:'').join('')+'<p>按当前经营预计还需 '+durationText(projectETA(s,p))+'；成长与换商圈会改变速度。</p>';}
function showPortfolio(){const total=branchCount(state);modal('🏙️','我的分店版图 · '+total+' 家','<div class="portfolio-stats">'+PROJECT_TYPES.map((d,i)=>`<span>${d.icon} ${d.name}<b>${state.branches[i]} 家</b></span>`).join('')+'</div><p>分红 ¥'+royalty(state).toFixed(1)+'/秒 · 产能 +'+Math.min(50,state.branches[0]*2)+'% · 单件净利 +'+Math.min(50,state.branches[1]*2)+'% · 灵感 +'+Math.min(100,state.branches[2]*5)+'%</p><div class="portfolio-grid">'+(state.portfolio.length?state.portfolio.map(p=>`<article><span>${PROJECT_TYPES[p.type].icon}</span><b>第 ${p.no} 家分店</b><small>${PROJECT_TYPES[p.type].name}<br>${SHOP_DEFS[p.shop].name}的创业故事</small></article>`).join(''):'<p>第一间分店的钥匙，还在等你。先选一个筹建项目吧。</p>')+'</div><p>展示最近 12 家，全部分店持续分红。每次开业都会出现新蓝图，不会清空主街、员工、研发或现金。</p>');}
function renderManagement(){
 const n=branchCount(state),p=state.project,t=trend(state),peak=peakWindow(state),strategy=strategyProfile(state),rival=RIVAL_PLAYS[state.npc.type%RIVAL_PLAYS.length];$('companyRank').textContent=n===0?'从小店到自己的品牌':n<3?'初出茅庐的街区品牌':n<10?'小有名气的连锁品牌':n<30?'城市里的熟面孔':'慢慢长大的商业版图';
 $('branchCount').textContent=n+' 家分店';$('royalty').textContent='永久分红 ¥'+royalty(state).toFixed(1)+'/秒';$('marketTrend').textContent=peak.icon+' '+peak.name+' · '+peak.desc+' · '+durationText(peak.left)+' 后轮换｜'+strategy.icon+' '+strategy.name+'：'+strategy.desc+(state.online>=180&&state.npc.hp>0?'｜隔壁'+rival.name+'：'+rival.desc:'')+'｜'+SHOP_DEFS[t.shop].icon+' '+SHOP_DEFS[t.shop].name+'长期流行 · 客流 +15%';
 $('companyTitle').textContent=p?'正在筹建 · '+PROJECT_TYPES[p.type].name:'下一站，开什么样的店？';$('companyDescription').textContent=p?'按真实销量推进 · 无期限 · 离线也在经营':'设备满级后，还有员工培养、菜单熟练和持续扩展的分店。';
 $('projectSummary').innerHTML=p?projectDetail(state):'<p>'+(state.projectNotice?esc(state.projectNotice):'先经营主街、积累灵感，再选择第一家分店。每次只做一个项目，不需要来回收菜。')+'</p>';
 $('projectBtn').textContent=p?'查看项目与经营条件':'挑选下一张分店蓝图';
 for(let i=0;i<3;i++){const o=operations(state,i);$('next'+i).textContent=state.levels[i]?(o.units*60).toFixed(1)+' 单/分 · '+PRICING[state.pricing[i]].short:'';$('buy'+i).title=state.levels[i]>=MAX_LEVEL?'设备已齐全，经营台可继续调整定价和员工':o.bottleneck;$('buyLabel'+i).textContent=state.levels[i]>=MAX_LEVEL?'设备齐全 · 继续经营':state.levels[i]?'升级设备'+(state.coupon?' · 券':''):'开张';}
 if($('infoDialog').open){const title=$('dialogTitle').textContent;if(title.startsWith('正在筹建'))$('project-detail').innerHTML=projectDetail(state);if(title.startsWith('分店蓝图'))for(let i=0;i<3;i++)$('project-start-'+i).disabled=!projectCanStart(state,i);if(title.startsWith('员工休息室'))for(let id=0;id<STAFF.length;id++){const b=$('hire-'+id);if(b)b.disabled=state.staff[id].hired||state.cash<STAFF[id].cost||state.ideas<STAFF[id].ideas;}}
 renderCinematic();
}
function bindManagement(){
 $('manageBtn').addEventListener('click',showManagement);$('staffBtn').addEventListener('click',showStaff);$('projectBtn').addEventListener('click',showProjects);$('portfolioBtn').addEventListener('click',showPortfolio);
 $('dialogBody').addEventListener('click',e=>{const b=e.target.closest('[data-price],[data-hire],[data-assign],[data-project]');if(!b)return;settle();if(b.dataset.price!==undefined){const i=Number(b.dataset.shop),p=Number(b.dataset.price);if(SHOP_DEFS[i]&&PRICING[p]&&state.levels[i])state.pricing[i]=p;showManagement();}else if(b.dataset.hire!==undefined){if(hireStaff(state,Number(b.dataset.hire)))toast('新伙伴加入！选择一家店让他驻店工作。');showStaff();}else if(b.dataset.assign!==undefined){assignStaff(state,Number(b.dataset.assign),Number(b.dataset.shop));showStaff();}else if(b.dataset.project!==undefined){if(startProject(state,Number(b.dataset.project))){log('开始筹建「'+PROJECT_TYPES[state.project.type].name+'」，相应店铺已设置定价。');showProjects();}}render();save();});
 setInterval(renderCinematic,50);
}
