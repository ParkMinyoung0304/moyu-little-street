from pathlib import Path
root=Path(__file__).resolve().parent.parent
page=(root/'qa/v2-before-v3.html').read_text(encoding='utf-8')
def swap(old,new,count=1):
    global page
    assert page.count(old)==count, (old[:100],page.count(old),count)
    page=page.replace(old,new)
swap('version:2,cash:88','version:3,cash:88')
swap('MAX_LEVEL=25','MAX_LEVEL=125')
swap('...freshExpansion()};','...freshExpansion(),...freshManagement(),...freshNeighborhood()};')
swap('![1,2].includes(raw.version)','![1,2,3].includes(raw.version)')
swap('normalizeExpansion(s,raw);if(s.npc.hp','normalizeExpansion(s,raw);normalizeManagement(s,raw);normalizeNeighborhood(s,raw,now);if(s.npc.hp')
swap("if(raw.version===1&&!localStorage.getItem(KEY+'-before-v2'))", "if(raw.version<3&&!localStorage.getItem(KEY+'-before-v3'))")
swap("localStorage.setItem(KEY+'-before-v2',stored)","localStorage.setItem(KEY+'-before-v3',stored)")
swap('state.respawnAt=now+8000','beginVacancy(state,now)')
swap('renderEvent(now);renderLong();','renderEvent(now);renderLong();renderManagement();renderNeighborhood();')
swap('initUI();bindExpansion();','initUI();bindExpansion();bindManagement();bindNeighborhood();')
swap('function purchase(s,i)','function purchaseBase(s,i)')
swap('function counterEffect(s,now,kind)','function counterEffectBase(s,now,kind)')
swap('function newRival()','function newRivalBase()')
swap('return normalRate(s)*activeBoost(s,now).factor','return normalRate(s,now)*activeBoost(s,now).factor')
swap("Math.random()<.5?'cash':'slow'", "Math.random()<.7?'nuisance':Math.random()<.5?'cash':'slow'")
swap("const msg=effect.kind==='cash'?", "const msg=effect.kind==='nuisance'?NUISANCES[effect.nuisance.type].name+'\u88ab\u5077\u5077\u653e\u5230\u4e86'+SHOP_DEFS[effect.nuisance.shop].name+'\u95e8\u524d\uff0c\u70b9\u5b83\u5c31\u80fd\u6e05\u8d70\u3002':effect.kind==='cash'?")
swap("*(s.levels[1]>0&&s.products?.[1]===2?.85:1));", "*(s.levels[1]>0&&s.products?.[1]===2?.85:1)*(1-Math.max(0,s.research.prank-3)*.02));")
swap('<g id="impactLayer" aria-hidden="true"></g>', '<g id="nuisanceLayer"></g><g id="impactLayer" aria-hidden="true"></g>')
swap('<section class="shop-grid"', '<div class="street-status panel" id="streetStatus" hidden></div><section class="shop-grid"')
swap('v2.0', 'v4.0')
swap('toast(wasOpen?\'\u8bbe\u5907\u5347\u7ea7\uff01\u81ea\u52a8\u6536\u5165\u63d0\u9ad8\u4e86\u3002\'','toast(wasOpen?\'\u8bbe\u5907\u5347\u7ea7\uff01\u4ea7\u80fd\u63d0\u9ad8\uff1b\u5ba2\u6d41\u4e0d\u8db3\u65f6\u53bb\u7ecf\u8425\u53f0\u8c03\u6574\u3002\'')
swap('<small>NO. 002</small>','<small>NO. 003</small>')
swap('\u5e97\u94fa\u4f1a\u81ea\u52a8\u8d5a\u94b1\uff0c\u70b9\u51fb\u300c\u5347\u7ea7\u300d\u589e\u52a0\u6536\u5165\u3002\u6bcf\u5230 10 \u7ea7\u8fd8\u6709\u989d\u5916\u4ea7\u80fd\u5956\u52b1\u3002','\u5e97\u94fa\u81ea\u52a8\u5236\u4f5c\u5e76\u51fa\u552e\u5546\u54c1\u3002\u8bbe\u5907\u63d0\u9ad8\u4ea7\u80fd\uff0c\u5b9a\u4ef7\u4e0e\u5546\u5708\u6539\u53d8\u5ba2\u6d41\uff1b\u5356\u51fa\u91cf\u53d6\u4e8c\u8005\u8f83\u5c0f\u503c\u3002\u70b9\u51fb\u300c\u5b9a\u4ef7\u4e0e\u4ea7\u80fd\u300d\u67e5\u770b\u77ed\u677f\uff0c\u6309\u9700\u8981\u5347\u7ea7\u6216\u8c03\u5c97\u3002')
swap('\u5e97\u94fa\u6700\u9ad8 25 \u7ea7\uff0c\u90bb\u5c45\u4f1a\u4e00\u76f4\u6362\u65b0\u3002\u73b0\u5728\u8fd8\u53ef\u7814\u7a76 9 \u9879\u6280\u672f\u3001\u5207\u6362 12 \u6b3e\u4ea7\u54c1\u3001\u89e3\u9501 6 \u4e2a\u5546\u5708\u3001\u6536\u96c6 24 \u7bc7\u8857\u574a\u6545\u4e8b\u4e0e\u6574\u6d3b\u56fe\u9274\u3002','\u8bbe\u5907\u6700\u9ad8 25 \u7ea7\uff1b6 \u4f4d\u5458\u5de5\u9760\u5de5\u4f5c\u6210\u957f\uff0c12 \u6b3e\u83dc\u5355\u9760\u5b9e\u9645\u9500\u91cf\u63d0\u9ad8\u719f\u7ec3\u5ea6\u3002\u9009\u62e9\u5206\u5e97\u84dd\u56fe\uff0c\u7528\u771f\u5b9e\u8ba2\u5355\u7b79\u5efa\u4fbf\u6c11\u5e97\u3001\u7cbe\u54c1\u5e97\u6216\u4e09\u5e97\u751f\u6d3b\u9986\u3002\u5b8c\u6210\u540e\u81ea\u52a8\u5f00\u4e1a\u3001\u6c38\u4e45\u5206\u7ea2\uff0c\u518d\u7531\u4f60\u9009\u62e9\u4e0b\u4e00\u7ad9\uff0c\u8d44\u4ea7\u5168\u90e8\u4fdd\u7559\u3002\u6bcf\u56db\u5c0f\u65f6\u8f6e\u6362\u6d41\u884c\u54c1\u7c7b\uff0c\u8bbe\u5907\u3001\u5b9a\u4ef7\u3001\u5458\u5de5\u4e0e\u5546\u5708\u53ef\u4ee5\u914d\u5408\u8c03\u6574\u30029 \u9879\u7814\u7a76\u30016 \u4e2a\u5546\u5708\u300124 \u7bc7\u8857\u574a\u6545\u4e8b\u4ecd\u7136\u4fdd\u7559\u3002')
swap('\u79bb\u7ebf\u6536\u76ca\u6309\u6b63\u5e38\u4ea7\u80fd\u7ed3\u7b97\uff0c\u6700\u591a\u7d2f\u8ba1 7 \u5929\u3002','\u79bb\u7ebf\u6536\u76ca\u6309\u6b63\u5e38\u7ecf\u8425\u7ed3\u7b97\uff0c\u6700\u591a\u7d2f\u8ba1 7 \u5929\uff1b\u5458\u5de5\u3001\u83dc\u5355\u4e0e\u5f53\u524d\u5206\u5e97\u9879\u76ee\u540c\u6b65\u6210\u957f\u3002\u65b0\u5206\u5e97\u5f00\u4e1a\u540e\uff0c\u4e0b\u4e00\u5f20\u84dd\u56fe\u7b49\u4f60\u56de\u6765\u518d\u9009\u3002')
# Clear a presentation-only sequence when replacing the entire saved world.
swap('state=normalize(parsed,lastTick);const report','state=normalize(parsed,lastTick);cinema=null;arrival=null;cleanup=null;const report')
swap("state=fresh(lastTick);lastScene=''", "state=fresh(lastTick);cinema=null;arrival=null;cleanup=null;lastScene=''")
# District bonuses now describe demand, while menu multipliers are per-item profit.
for name in ['\u5496\u5561','\u70d8\u7119','\u8336\u996e']:
    page=page.replace(name+' \xd7',name+'\u5ba2\u6d41 \xd7')
page=page.replace('\u5168\u5e97\u6536\u5165 +6%','\u5168\u5e97\u5355\u4ef6\u51c0\u5229 +6%').replace('\u5168\u5e97\u6536\u5165\u7d2f\u8ba1','\u5168\u5e97\u5355\u4ef6\u51c0\u5229\u7d2f\u8ba1')
page=page.replace('\u5496\u5561\u6536\u5165 +','\u5496\u5561\u5355\u4ef6\u51c0\u5229 +').replace('\u70d8\u7119\u6536\u5165 +','\u70d8\u7119\u5355\u4ef6\u51c0\u5229 +').replace('\u8336\u996e\u6536\u5165 +','\u8336\u996e\u5355\u4ef6\u51c0\u5229 +')
page=page.replace(".store-touch{cursor:pointer}.store-touch:hover .shop-roof{filter:brightness(1.035)}", ".store-touch{cursor:pointer;outline:none}.store-body{transform-box:fill-box;transform-origin:50% 82%;transition:transform .28s cubic-bezier(.2,.8,.2,1),filter .28s cubic-bezier(.2,.8,.2,1),opacity .2s}.store-touch:hover .store-body,.store-touch:focus-visible .store-body,.store-touch.active-store .store-body{transform:translateY(-8px) scale(1.075);filter:drop-shadow(0 14px 12px #5c6d4a26) brightness(1.025)}.store-touch:hover .shop-roof,.store-touch:focus-visible .shop-roof,.store-touch.active-store .shop-roof{filter:brightness(1.05)}.store-touch .store-halo{opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity .24s,transform .28s}.store-touch:hover .store-halo,.store-touch:focus-visible .store-halo,.store-touch.active-store .store-halo{opacity:1;transform:scale(1.05)}")
page=page.replace("@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.customer{display:none}.float-coin,.confetti{display:none}}", "@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.customer{display:none}.float-coin,.confetti{display:none}.store-body{transition:none!important}.store-touch:hover .store-body,.store-touch:focus-visible .store-body,.store-touch.active-store .store-body{transform:none}}")
page=page.replace('<g opacity="${open?1:.43}"><ellipse cx="94" cy="158" rx="111" ry="15" fill="#87967f1c"/>', '<ellipse class="store-halo" cx="94" cy="158" rx="120" ry="20" fill="#6f8f5e22"/><g class="store-body" opacity="${open?1:.43}"><ellipse cx="94" cy="158" rx="111" ry="15" fill="#87967f1c"/>')
page=page.replace("function selectShop(e){if(stageView==='rival')return;const g=e.target.closest('[data-store]');if(!g)return;const i=Number(g.dataset.store);$('shop'+i).classList.add('selected');$('buy'+i).focus({preventScroll:true});if(innerWidth<580)$('shop'+i).scrollIntoView({behavior:'smooth',block:'nearest'});setTimeout(()=>$('shop'+i).classList.remove('selected'),1600);}", "function pulseStore(i){const root=$('scene'),store=root?.querySelector('[data-store=\"'+i+'\"]');if(!store)return;root.querySelectorAll('.active-store').forEach(n=>n.classList.remove('active-store'));store.classList.add('active-store');clearTimeout(store._pulseTimer);store._pulseTimer=setTimeout(()=>store.classList.remove('active-store'),850);}function selectShop(e){if(stageView==='rival')return;const g=e.target.closest('[data-store]');if(!g)return;const i=Number(g.dataset.store);pulseStore(i);$('shop'+i).classList.add('selected');$('buy'+i).focus({preventScroll:true});if(innerWidth<580)$('shop'+i).scrollIntoView({behavior:'smooth',block:'nearest'});setTimeout(()=>$('shop'+i).classList.remove('selected'),1600);}")
swap('</style>',(root/'qa/v3.css').read_text(encoding='utf-8')+'\n'+(root/'qa/v3-neighborhood.css').read_text(encoding='utf-8')+'\n</style>')
panel='''<section class="panel company-panel"><div class="company-top"><div><span class="company-kicker">A BRAND THAT GROWS WITH YOU</span><h2 id="companyRank">\u4ece\u5c0f\u5e97\u5230\u81ea\u5df1\u7684\u54c1\u724c</h2></div><div class="company-number"><span id="branchCount">0 \u5bb6\u5206\u5e97</span><small id="royalty">\u6c38\u4e45\u5206\u7ea2 \xa50/\u79d2</small></div></div><div class="company-tools"><button id="manageBtn">\U0001f39b\ufe0f \u5b9a\u4ef7\u4e0e\u4ea7\u80fd</button><button id="staffBtn">\U0001f465 \u5458\u5de5\u4e0e\u8c03\u5c97</button><button id="portfolioBtn">\U0001f3d9\ufe0f \u5206\u5e97\u7248\u56fe</button></div><div class="company-project"><h3 id="companyTitle">\u4e0b\u4e00\u7ad9\uff0c\u5f00\u4ec0\u4e48\u6837\u7684\u5e97\uff1f</h3><p id="companyDescription"></p><div id="projectSummary"></div><button class="primary" id="projectBtn">\u6311\u9009\u4e0b\u4e00\u5f20\u5206\u5e97\u84dd\u56fe</button></div><p class="market-trend" id="marketTrend"></p></section>'''
swap('   <section class="panel long-panel">','   '+panel+'\n   <section class="panel long-panel">')
extra='\n'.join((root/f'qa/{name}.js').read_text(encoding='utf-8') for name in ['v3-management','v3-cinema','v3-neighborhood'])
swap('let state=fresh(Date.now()),lastTick=',extra+'\nlet state=fresh(Date.now()),lastTick=')
# Remove superseded declarations, keeping one definition per name in the artifact.
names=['shopIncome','normalRate','ideaRate','accrue','settleOffline','buildRivalScene','animatePrank','handlePrankClick','upgradeCost','researchCost','buyResearch','showResearch','nextContract','advanceExpansion']
for name in names:
    marker='function '+name+'('
    first=page.index(marker); second=page.index(marker,first+len(marker))
    # All superseded declarations end immediately before the next top-level declaration.
    end=page.find('\nfunction ',first+len(marker))
    assert end>first and end<=second,name
    page=page[:first]+page[end+1:]
(root/'index.html').write_text(page,encoding='utf-8')
print('Built standalone v4 gameplay build from preserved v2 baseline.')
