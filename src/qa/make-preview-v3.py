from pathlib import Path
root=Path(__file__).resolve().parent.parent
page=(root/'index.html').read_text(encoding='utf-8').replace("KEY='little-street-save-v1'","KEY='little-street-qa-v3'")
fixture="state=fresh(Date.now());state.cash=500000;state.ideas=500;state.levels=[15,12,10];state.research={menu:3,service:2,prank:3};state.contractsDone=100;state.staff.forEach(x=>x.hired=true);offlineReport=null;"
page=page.replace('initUI();bindExpansion();bindManagement();',fixture+'initUI();bindExpansion();bindManagement();')
(root/'qa/preview-v3.html').write_text(page,encoding='utf-8')
# Deterministic full sequence previews exercise actual handlers, via visible buttons.
# Each page uses its own save key and never reads/writes the playable game's key.
for i in range(6):
    demo=page.replace("KEY='little-street-qa-v3'",f"KEY='little-street-cinema-qa-{i}'")
    demo=demo.replace('const i=Number(b.dataset.prank),now=Date.now(),before=state.npc.hp,result=attemptPrank(state,i,now);', 'const i=Number(b.dataset.prank),now=Date.now(),before=state.npc.hp,result=attemptPrank(state,i,now,()=>.2);')
    demo=demo.replace('state.cash=500000;', 'state.cash=500000;state.npc.hp=20;')
    (root/f'qa/cinema-{i}.html').write_text(demo,encoding='utf-8')
print('Created independent QA pages; live save key untouched.')
extras={
 'nuisance-preview':"state.online=200;placeNuisance(state,Date.now()-3000,()=>0);placeNuisance(state,Date.now()-3000,()=>.99);",
 'promotion-preview':"state.levels=[25,25,25];state.served=[2500,2500,2500];state.branches=[1,0,0];state.businessTime=7200;",
 'arrival-preview':"state.npc.hp=0;state.respawnAt=Date.now()+8000;state.vacancy={mult:1.5,until:state.respawnAt};"
}
for name,seed in extras.items():
    demo=page.replace("KEY='little-street-qa-v3'",f"KEY='little-street-qa-{name}'")
    demo=demo.replace('offlineReport=null;initUI();',seed+'offlineReport=null;initUI();')
    if name=='arrival-preview':
        demo=demo.replace('<div class="stage-tools">','<button class="secondary" id="qaMoveIn" onclick="newRival();render()">QA · 预演新邻居搬家</button><div class="stage-tools">')
    (root/f'qa/{name}.html').write_text(demo,encoding='utf-8')
