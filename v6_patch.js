// =====================================================================
// city-builder v6_patch.js — PRIME Holdings NEXTERA+PRISM v6.0
// Self-contained patch: Technology Tree, Adjacency Bonus, Demand System,
// Great People, Prestige, +15 Quiz, +6 Choice Events, +10 Achievements,
// +10 Advisor Tips, SFX 6 types
// =====================================================================
(function(){
'use strict';

// ===================== CSS INJECTION =====================
const V6_CSS = `
/* ===== v6.0 Technology Tree ===== */
#tech-btn {
    position: fixed; top: 330px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #80e0ff;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#tech-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#tech-panel.show { display: flex; }
#tech-box {
    background: linear-gradient(145deg, #0a1a2e, #061020);
    border: 2px solid #40a0e0; border-radius: 16px;
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#tech-box h2 { color: #40a0e0; text-align: center; margin-bottom: 6px; }
.tech-progress-text { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }
.tech-era-section { margin-bottom: 14px; }
.tech-era-label { color: #ffd700; font-size: 13px; font-weight: bold; padding-bottom: 4px; border-bottom: 1px solid rgba(255,215,0,0.2); margin-bottom: 8px; }
.tech-item {
    display: flex; align-items: center; gap: 10px; padding: 10px;
    margin-bottom: 6px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);
    cursor: pointer; transition: all 0.2s;
}
.tech-item:hover { background: rgba(64,160,224,0.12); border-color: rgba(64,160,224,0.4); }
.tech-item.researched { border-color: #40a0e0; background: rgba(64,160,224,0.15); }
.tech-item.locked { opacity: 0.4; cursor: not-allowed; }
.tech-item .ti-icon { font-size: 28px; flex-shrink: 0; }
.tech-item .ti-info { flex: 1; }
.tech-item .ti-name { font-weight: bold; font-size: 13px; color: #eee; }
.tech-item .ti-desc { font-size: 11px; color: #aaa; margin-top: 2px; }
.tech-item .ti-cost { font-size: 11px; color: #80e0ff; margin-top: 3px; }
.tech-item .ti-bonus { font-size: 10px; color: #80ff80; margin-top: 2px; }
.tech-item.researched .ti-name { color: #80e0ff; }
.tech-item.researched .ti-cost { color: #4caf50; }

/* ===== v6.0 Great People ===== */
#great-person-toast {
    position: fixed; left: 50%; top: 80px; transform: translateX(-50%);
    z-index: 180; background: linear-gradient(135deg, #4a0a4a, #2a0a3a);
    border: 2px solid #c060ff; border-radius: 14px;
    padding: 14px 22px; max-width: 360px; text-align: center;
    box-shadow: 0 0 30px rgba(192,96,255,0.4);
    display: none; animation: gpSlide 6s forwards;
}
#great-person-toast.show { display: block; }
.gp-icon { font-size: 36px; }
.gp-name { color: #c060ff; font-weight: bold; font-size: 16px; margin: 4px 0; }
.gp-desc { color: #d0a0ff; font-size: 12px; line-height: 1.5; }
.gp-bonus { color: #80ff80; font-size: 11px; margin-top: 6px; }
@keyframes gpSlide {
    0% { opacity: 0; top: 60px; }
    10% { opacity: 1; top: 80px; }
    85% { opacity: 1; top: 80px; }
    100% { opacity: 0; top: 60px; }
}

/* ===== v6.0 Demand Indicator ===== */
#demand-bar {
    position: fixed; top: 42px; left: 10px; z-index: 15;
    display: flex; gap: 4px; font-size: 10px;
}
.demand-item {
    display: flex; flex-direction: column; align-items: center; gap: 1px;
    padding: 2px 6px; border-radius: 6px; background: rgba(0,0,0,0.6);
}
.demand-item .di-label { font-size: 9px; color: #aaa; }
.demand-item .di-bar { width: 24px; height: 40px; background: #222; border-radius: 3px; position: relative; overflow: hidden; }
.demand-item .di-fill { position: absolute; bottom: 0; width: 100%; border-radius: 3px; transition: height 0.5s; }
.demand-housing .di-fill { background: linear-gradient(0deg, #4caf50, #8bc34a); }
.demand-commerce .di-fill { background: linear-gradient(0deg, #2196f3, #64b5f6); }
.demand-culture .di-fill { background: linear-gradient(0deg, #ff9800, #ffb74d); }

/* ===== v6.0 Adjacency Indicator ===== */
.adj-bonus-toast {
    position: fixed; z-index: 55; pointer-events: none;
    background: rgba(64,160,224,0.9); color: #fff; padding: 4px 10px;
    border-radius: 12px; font-size: 11px; font-weight: bold;
    animation: adjPop 2s forwards;
}
@keyframes adjPop {
    0% { opacity: 0; transform: scale(0.6); }
    20% { opacity: 1; transform: scale(1.1); }
    30% { opacity: 1; transform: scale(1); }
    80% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-20px); }
}

/* ===== v6.0 Prestige Panel ===== */
#prestige-btn {
    position: fixed; top: 370px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffaa00;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
    display: none;
}
#prestige-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#prestige-panel.show { display: flex; }
#prestige-box {
    background: linear-gradient(145deg, #2a1a00, #1a0a00);
    border: 2px solid #ffaa00; border-radius: 16px;
    padding: 24px; max-width: 440px; width: 100%; text-align: center;
    box-shadow: 0 0 40px rgba(255,170,0,0.3);
}
#prestige-box h2 { color: #ffaa00; margin-bottom: 8px; }
.prestige-info { color: #ddd; font-size: 13px; line-height: 1.7; margin-bottom: 14px; }
.prestige-bonus { color: #80ff80; font-size: 12px; margin-bottom: 14px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 10px; }
.prestige-start {
    background: linear-gradient(135deg, #ffaa00, #ff6600); border: none;
    color: #1a0a00; padding: 12px 30px; border-radius: 24px;
    font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 8px;
}

/* ===== v6.0 Mobile ===== */
@media (max-width: 600px) {
    #tech-btn { top: 260px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #prestige-btn { top: 294px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #demand-bar { font-size: 9px; }
    .demand-item .di-bar { height: 30px; width: 20px; }
    #great-person-toast { max-width: 280px; padding: 10px 14px; }
}
@media (max-width: 400px) {
    #tech-btn, #prestige-btn { width: 26px; height: 26px; font-size: 12px; }
    #demand-bar { display: none; }
}
`;
const styleEl = document.createElement('style');
styleEl.textContent = V6_CSS;
document.head.appendChild(styleEl);

// ===================== UI ELEMENTS =====================
function addUI() {
    const techBtn = document.createElement('button');
    techBtn.id = 'tech-btn';
    techBtn.title = '기술 연구';
    techBtn.setAttribute('aria-label', '기술 연구');
    techBtn.textContent = '🔬';
    techBtn.onclick = showTechTree;
    document.body.appendChild(techBtn);

    const techPanel = document.createElement('div');
    techPanel.id = 'tech-panel';
    techPanel.setAttribute('role', 'dialog');
    techPanel.setAttribute('aria-label', '기술 연구');
    techPanel.innerHTML = '<div id="tech-box"><h2>🔬 기술 연구</h2><div class="tech-progress-text" id="tech-progress"></div><div id="tech-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#40a0e0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'tech-panel\').classList.remove(\'show\')">닫기</button></div>';
    techPanel.onclick = function(e) { if(e.target.id === 'tech-panel') techPanel.classList.remove('show'); };
    document.body.appendChild(techPanel);

    const gpToast = document.createElement('div');
    gpToast.id = 'great-person-toast';
    gpToast.innerHTML = '<div class="gp-icon" id="gp-icon"></div><div class="gp-name" id="gp-name"></div><div class="gp-desc" id="gp-desc"></div><div class="gp-bonus" id="gp-bonus"></div>';
    document.body.appendChild(gpToast);

    const demandBar = document.createElement('div');
    demandBar.id = 'demand-bar';
    demandBar.innerHTML = '<div class="demand-item demand-housing"><div class="di-label">주거</div><div class="di-bar"><div class="di-fill" id="demand-h" style="height:50%"></div></div></div><div class="demand-item demand-commerce"><div class="di-label">상업</div><div class="di-bar"><div class="di-fill" id="demand-c" style="height:50%"></div></div></div><div class="demand-item demand-culture"><div class="di-label">문화</div><div class="di-bar"><div class="di-fill" id="demand-u" style="height:50%"></div></div></div>';
    document.body.appendChild(demandBar);

    const prestigeBtn = document.createElement('button');
    prestigeBtn.id = 'prestige-btn';
    prestigeBtn.title = '명예 재시작';
    prestigeBtn.setAttribute('aria-label', '명예 재시작');
    prestigeBtn.textContent = '⭐';
    prestigeBtn.onclick = showPrestige;
    document.body.appendChild(prestigeBtn);

    const prestigePanel = document.createElement('div');
    prestigePanel.id = 'prestige-panel';
    prestigePanel.setAttribute('role', 'dialog');
    prestigePanel.setAttribute('aria-label', '명예 재시작');
    prestigePanel.innerHTML = '<div id="prestige-box"><h2>⭐ 명예 재시작</h2><div class="prestige-info" id="prestige-info"></div><div class="prestige-bonus" id="prestige-bonus-display"></div><div id="prestige-actions"></div></div>';
    prestigePanel.onclick = function(e) { if(e.target.id === 'prestige-panel') prestigePanel.classList.remove('show'); };
    document.body.appendChild(prestigePanel);
}

// ===================== TECHNOLOGY TREE =====================
const TECHNOLOGIES = [
    { id:'stone_tools', era:0, icon:'🪨', name:'석기 제작', desc:'돌을 깎아 도구를 만듭니다', cost:{gold:50,culture:10}, bonus:'식량 생산 +15%', effect:'food_mult', value:0.15 },
    { id:'bronze_casting', era:0, icon:'🔥', name:'청동 주조', desc:'구리와 주석을 합금합니다', cost:{gold:80,culture:15}, bonus:'금 생산 +10%', effect:'gold_mult', value:0.10 },
    { id:'farming', era:0, icon:'🌾', name:'농경 기술', desc:'체계적인 농사법을 개발합니다', cost:{gold:60,culture:10}, bonus:'식량 생산 +20%', effect:'food_mult', value:0.20 },
    { id:'iron_working', era:1, icon:'⚔️', name:'제철 기술', desc:'철기를 제작합니다', cost:{gold:120,culture:25}, bonus:'건물 비용 -10%', effect:'cost_reduce', value:0.10 },
    { id:'ship_building', era:1, icon:'⛵', name:'조선술', desc:'배를 건조합니다', cost:{gold:150,culture:30}, bonus:'교역 수입 +25%', effect:'trade_mult', value:0.25 },
    { id:'astronomy', era:1, icon:'🌟', name:'천문학', desc:'별을 관찰하여 계절을 예측합니다', cost:{gold:130,culture:35}, bonus:'재해 경고 확률 +30%', effect:'disaster_warn', value:0.30 },
    { id:'printing', era:2, icon:'📜', name:'인쇄술', desc:'목판과 금속활자를 만듭니다', cost:{gold:180,culture:40}, bonus:'문화 생산 +25%', effect:'culture_mult', value:0.25 },
    { id:'ceramics', era:2, icon:'🏺', name:'도자기 기술', desc:'고려청자를 빚습니다', cost:{gold:160,culture:45}, bonus:'금 생산 +20%', effect:'gold_mult', value:0.20 },
    { id:'gunpowder', era:2, icon:'💥', name:'화약 제조', desc:'최무선의 화약 기술입니다', cost:{gold:200,culture:50}, bonus:'재해 피해 -25%', effect:'disaster_reduce', value:0.25 },
    { id:'hangul', era:3, icon:'📖', name:'훈민정음', desc:'세종대왕의 한글 창제입니다', cost:{gold:250,culture:60}, bonus:'문화 생산 +35%', effect:'culture_mult', value:0.35 },
    { id:'science', era:3, icon:'⚙️', name:'과학 기구', desc:'장영실의 발명품들입니다', cost:{gold:220,culture:55}, bonus:'식량 생산 +25%', effect:'food_mult', value:0.25 },
    { id:'turtle_ship', era:3, icon:'🐢', name:'거북선 설계', desc:'이순신의 철갑선입니다', cost:{gold:280,culture:50}, bonus:'재해 피해 -30%', effect:'disaster_reduce', value:0.30 },
    { id:'electricity', era:4, icon:'⚡', name:'전기 도입', desc:'경복궁에 불이 켜집니다', cost:{gold:300,culture:60}, bonus:'모든 생산 +10%', effect:'all_mult', value:0.10 },
    { id:'railroad', era:4, icon:'🚂', name:'철도 건설', desc:'경인선이 달립니다', cost:{gold:350,culture:70}, bonus:'인구 성장 +30%', effect:'pop_mult', value:0.30 },
    { id:'modern_edu', era:4, icon:'🎓', name:'근대 교육', desc:'신식 학교가 세워집니다', cost:{gold:280,culture:80}, bonus:'문화 +40%, 행복 +10', effect:'culture_mult', value:0.40 },
];

let researchedTechs = new Set();
try {
    const saved = localStorage.getItem('cityTechs_v6');
    if(saved) researchedTechs = new Set(JSON.parse(saved));
} catch(e){}

function showTechTree() {
    if(typeof playClickSound === 'function') playClickSound();
    const list = document.getElementById('tech-list');
    list.innerHTML = '';
    document.getElementById('tech-progress').textContent = researchedTechs.size + ' / ' + TECHNOLOGIES.length + ' 연구 완료';

    const eras = ['고조선','삼국시대','고려','조선','근대'];
    for(let ei=0; ei<5; ei++) {
        const eraTechs = TECHNOLOGIES.filter(function(t){ return t.era === ei; });
        if(eraTechs.length === 0) continue;
        const sec = document.createElement('div');
        sec.className = 'tech-era-section';
        sec.innerHTML = '<div class="tech-era-label">' + eras[ei] + '</div>';
        eraTechs.forEach(function(tech) {
            const isResearched = researchedTechs.has(tech.id);
            const canAfford = (typeof resources !== 'undefined') && resources.gold >= tech.cost.gold && resources.culture >= tech.cost.culture;
            const eraOk = (typeof currentEra !== 'undefined') && currentEra >= tech.era;
            const isLocked = !isResearched && (!canAfford || !eraOk);

            const div = document.createElement('div');
            div.className = 'tech-item' + (isResearched ? ' researched' : '') + (isLocked && !isResearched ? ' locked' : '');
            div.innerHTML = '<div class="ti-icon">' + tech.icon + '</div><div class="ti-info"><div class="ti-name">' + tech.name + (isResearched ? ' ✅' : '') + '</div><div class="ti-desc">' + tech.desc + '</div><div class="ti-cost">' + (isResearched ? '✅ 연구 완료' : '💰 ' + tech.cost.gold + ' + 🏛️ ' + tech.cost.culture) + '</div><div class="ti-bonus">' + tech.bonus + '</div></div>';

            if(!isResearched && !isLocked) {
                div.onclick = function() { researchTech(tech); };
            }
            sec.appendChild(div);
        });
        list.appendChild(sec);
    }
    document.getElementById('tech-panel').classList.add('show');
}

function researchTech(tech) {
    if(researchedTechs.has(tech.id)) return;
    if(resources.gold < tech.cost.gold || resources.culture < tech.cost.culture) return;
    if(currentEra < tech.era) return;

    resources.gold -= tech.cost.gold;
    resources.culture -= tech.cost.culture;
    researchedTechs.add(tech.id);

    try { localStorage.setItem('cityTechs_v6', JSON.stringify(Array.from(researchedTechs))); } catch(e){}

    if(typeof toast === 'function') toast('🔬 ' + tech.name + ' 연구 완료!');
    if(typeof addChronicle === 'function') addChronicle(tech.icon, tech.name + ' 기술을 연구했습니다.');
    if(typeof updateHUD === 'function') updateHUD();
    playV6SFX('research');
    showTechTree();
}

function getTechMultiplier(type) {
    let mult = 0;
    researchedTechs.forEach(function(tid) {
        var t = TECHNOLOGIES.find(function(x){ return x.id === tid; });
        if(!t) return;
        if(t.effect === type) mult += t.value;
        if(t.effect === 'all_mult') mult += t.value;
    });
    return mult;
}

function getTechDisasterReduction() {
    let reduction = 0;
    researchedTechs.forEach(function(tid) {
        var t = TECHNOLOGIES.find(function(x){ return x.id === tid; });
        if(t && t.effect === 'disaster_reduce') reduction += t.value;
    });
    return Math.min(0.6, reduction);
}

function getTechCostReduction() {
    let reduction = 0;
    researchedTechs.forEach(function(tid) {
        var t = TECHNOLOGIES.find(function(x){ return x.id === tid; });
        if(t && t.effect === 'cost_reduce') reduction += t.value;
    });
    return Math.min(0.3, reduction);
}

// ===================== ADJACENCY BONUS SYSTEM =====================
function getAdjacentBuildings(gx, gy) {
    var neighbors = [];
    var dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    for(var i=0; i<dirs.length; i++) {
        var nx = gx + dirs[i][0], ny = gy + dirs[i][1];
        if(nx >= 0 && nx < GRID && ny >= 0 && ny < GRID && grid[ny] && grid[ny][nx] && !grid[ny][nx].isExtra) {
            neighbors.push(grid[ny][nx]);
        }
    }
    return neighbors;
}

function calcAdjacencyBonus(building, gx, gy) {
    var neighbors = getAdjacentBuildings(gx, gy);
    var bonus = { gold: 0, food: 0, culture: 0, happy: 0, pop: 0 };
    if(neighbors.length === 0) return bonus;

    var p = building.provide || {};
    for(var i=0; i<neighbors.length; i++) {
        var np = neighbors[i].provide || {};
        if(p.food > 0 && np.food > 0) bonus.food += 1;
        if(p.gold > 0 && np.gold > 0) bonus.gold += 1;
        if(p.culture > 0 && np.culture > 0) bonus.culture += 1;
        if(p.happy > 0 && np.happy > 0) bonus.happy += 1;
    }
    return bonus;
}

function showAdjacencyToast(gx, gy, bonus) {
    var parts = [];
    if(bonus.gold > 0) parts.push('+' + bonus.gold + ' 💰');
    if(bonus.food > 0) parts.push('+' + bonus.food + ' 🌾');
    if(bonus.culture > 0) parts.push('+' + bonus.culture + ' 🏛️');
    if(bonus.happy > 0) parts.push('+' + bonus.happy + ' 😊');
    if(parts.length === 0) return;

    var iso = isoToScreen(gx, gy);
    var el = document.createElement('div');
    el.className = 'adj-bonus-toast';
    el.textContent = '🔗 ' + parts.join(' ');
    el.style.left = iso[0] + 'px';
    el.style.top = (iso[1] - 30) + 'px';
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 2200);
    playV6SFX('adjacency');
}

// ===================== DEMAND SYSTEM =====================
function updateDemand() {
    if(typeof resources === 'undefined' || typeof buildCount === 'undefined') return;
    var totalPop = resources.pop || 0;
    var housingCap = 0, commerceCap = 0, cultureCap = 0;

    for(var gy2=0; gy2<GRID; gy2++) {
        for(var gx2=0; gx2<GRID; gx2++) {
            var b = grid[gy2][gx2];
            if(!b || b.isExtra) continue;
            var p = b.provide || {};
            if(p.pop && p.pop > 0) housingCap += p.pop;
            if(p.gold && p.gold > 0) commerceCap += p.gold;
            if(p.culture && p.culture > 0) cultureCap += p.culture;
        }
    }

    var hDemand = totalPop > 0 ? Math.min(100, Math.max(5, Math.round((totalPop / Math.max(1, housingCap)) * 60))) : 30;
    var cDemand = totalPop > 0 ? Math.min(100, Math.max(5, Math.round((totalPop / Math.max(1, commerceCap)) * 40))) : 30;
    var uDemand = totalPop > 0 ? Math.min(100, Math.max(5, Math.round((totalPop / Math.max(1, cultureCap)) * 30))) : 30;

    var hEl = document.getElementById('demand-h');
    var cEl = document.getElementById('demand-c');
    var uEl = document.getElementById('demand-u');
    if(hEl) hEl.style.height = hDemand + '%';
    if(cEl) cEl.style.height = cDemand + '%';
    if(uEl) uEl.style.height = uDemand + '%';
}

// ===================== GREAT PEOPLE SYSTEM =====================
const GREAT_PEOPLE = [
    { id:'dangun', era:0, icon:'👑', name:'단군왕검', desc:'고조선을 세운 건국의 아버지입니다. 홍익인간의 이념으로 나라를 다스렸어요.', bonus:'인구 +30, 문화 +20', effect:function(r){ r.pop += 30; r.culture += 20; } },
    { id:'gwanggaeto', era:1, icon:'⚔️', name:'광개토대왕', desc:'고구려의 영토를 크게 넓힌 정복왕입니다. 만주와 한반도 북부를 지배했어요.', bonus:'행복 +20, 금 +200', effect:function(r){ r.happy = Math.min(100, r.happy + 20); r.gold += 200; } },
    { id:'uija', era:1, icon:'🎭', name:'의자왕', desc:'백제의 마지막 왕이지만 초기에는 해동증자로 불릴 만큼 효성이 깊었어요.', bonus:'문화 +30, 식량 +50', effect:function(r){ r.culture += 30; r.food += 50; } },
    { id:'wanggon', era:2, icon:'👑', name:'왕건', desc:'후삼국을 통일하고 고려를 세웠습니다. 호족을 회유하는 정치를 펼쳤어요.', bonus:'인구 +50, 금 +150', effect:function(r){ r.pop += 50; r.gold += 150; } },
    { id:'choemuson', era:2, icon:'💥', name:'최무선', desc:'우리나라 최초로 화약을 만들어 왜구를 물리쳤어요. 진포해전의 영웅입니다.', bonus:'행복 +25, 금 +100', effect:function(r){ r.happy = Math.min(100, r.happy + 25); r.gold += 100; } },
    { id:'sejong', era:3, icon:'📚', name:'세종대왕', desc:'한글을 만들고 과학 기구를 발명했습니다. 한국 역사상 가장 위대한 왕이에요.', bonus:'문화 +50, 인구 +30', effect:function(r){ r.culture += 50; r.pop += 30; } },
    { id:'yisunsin', era:3, icon:'🐢', name:'이순신', desc:'임진왜란에서 23전 23승의 불패 기록을 세운 성웅입니다.', bonus:'행복 +30, 금 +250', effect:function(r){ r.happy = Math.min(100, r.happy + 30); r.gold += 250; } },
    { id:'jangyeongsil2', era:3, icon:'⚙️', name:'장영실', desc:'노비 출신 천재 과학자입니다. 자격루, 앙부일구, 측우기를 발명했어요.', bonus:'문화 +40, 식량 +80', effect:function(r){ r.culture += 40; r.food += 80; } },
    { id:'ahn_changho', era:4, icon:'🏳️', name:'안창호', desc:'독립운동가이자 교육자입니다. 흥사단을 세워 민족의 힘을 키웠어요.', bonus:'문화 +60, 행복 +20', effect:function(r){ r.culture += 60; r.happy = Math.min(100, r.happy + 20); } },
    { id:'yu_gwansun', era:4, icon:'🌸', name:'유관순', desc:'3.1 운동의 영웅입니다. 16세에 독립만세를 외치다 순국한 열사예요.', bonus:'행복 +30, 인구 +40', effect:function(r){ r.happy = Math.min(100, r.happy + 30); r.pop += 40; } },
];

let appearedGreatPeople = new Set();
try {
    var savedGP = localStorage.getItem('cityGreatPeople_v6');
    if(savedGP) appearedGreatPeople = new Set(JSON.parse(savedGP));
} catch(e){}

let greatPersonCooldown = 2400;

function checkGreatPerson() {
    if(greatPersonCooldown > 0) { greatPersonCooldown--; return; }
    greatPersonCooldown = 4800 + Math.floor(Math.random() * 3600);

    var candidates = GREAT_PEOPLE.filter(function(gp) {
        return !appearedGreatPeople.has(gp.id) && currentEra >= gp.era;
    });
    if(candidates.length === 0) return;
    if(Math.random() > 0.35) return;

    var gp = candidates[Math.floor(Math.random() * candidates.length)];
    appearedGreatPeople.add(gp.id);
    gp.effect(resources);
    try { localStorage.setItem('cityGreatPeople_v6', JSON.stringify(Array.from(appearedGreatPeople))); } catch(e){}

    document.getElementById('gp-icon').textContent = gp.icon;
    document.getElementById('gp-name').textContent = gp.name;
    document.getElementById('gp-desc').textContent = gp.desc;
    document.getElementById('gp-bonus').textContent = gp.bonus;
    var gpEl = document.getElementById('great-person-toast');
    gpEl.classList.remove('show');
    void gpEl.offsetWidth;
    gpEl.classList.add('show');
    setTimeout(function(){ gpEl.classList.remove('show'); }, 6500);

    if(typeof toast === 'function') toast('🌟 위인 ' + gp.name + ' 등장!');
    if(typeof addChronicle === 'function') addChronicle(gp.icon, '위인 ' + gp.name + '이(가) 등장했습니다!');
    if(typeof updateHUD === 'function') updateHUD();
    playV6SFX('great_person');
}

// ===================== PRESTIGE SYSTEM =====================
let prestigeLevel = 0;
try {
    var savedPrestige = localStorage.getItem('cityPrestige_v6');
    if(savedPrestige) prestigeLevel = parseInt(savedPrestige) || 0;
} catch(e){}

function showPrestige() {
    if(typeof playClickSound === 'function') playClickSound();
    var totalScore = resources.pop + resources.gold + resources.culture + buildCount * 10;
    var nextBonus = (prestigeLevel + 1) * 5;
    document.getElementById('prestige-info').innerHTML = '한국 5천년 역사를 완성했어요!<br>명예 재시작을 하면 초기 자원이 증가합니다.<br><br>현재 명예 등급: <span style="color:#ffaa00;font-weight:bold;">⭐ ' + prestigeLevel + '단계</span><br>현재 총점: <span style="color:#ffd700;">' + totalScore + '점</span>';
    document.getElementById('prestige-bonus-display').innerHTML = '<strong>다음 재시작 보너스:</strong><br>초기 금 +' + (nextBonus * 10) + ', 초기 식량 +' + (nextBonus * 5) + ', 초기 인구 +' + (nextBonus * 2) + '<br>연구 포인트 ' + Math.min(3, prestigeLevel + 1) + '개 유지';

    var actions = document.getElementById('prestige-actions');
    actions.innerHTML = '';
    var startBtn = document.createElement('button');
    startBtn.className = 'prestige-start';
    startBtn.textContent = '⭐ 명예 재시작 (등급 ' + (prestigeLevel + 1) + ')';
    startBtn.onclick = doPrestige;
    actions.appendChild(startBtn);
    var closeBtn = document.createElement('button');
    closeBtn.className = 'prestige-start';
    closeBtn.style.background = '#555';
    closeBtn.style.color = '#fff';
    closeBtn.style.marginLeft = '8px';
    closeBtn.textContent = '취소';
    closeBtn.onclick = function(){ document.getElementById('prestige-panel').classList.remove('show'); };
    actions.appendChild(closeBtn);

    document.getElementById('prestige-panel').classList.add('show');
}

function doPrestige() {
    prestigeLevel++;
    try { localStorage.setItem('cityPrestige_v6', String(prestigeLevel)); } catch(e){}

    var bonus = prestigeLevel * 5;
    resources.pop = 50 + bonus * 2;
    resources.food = 100 + bonus * 5;
    resources.gold = 200 + bonus * 10;
    resources.happy = 50;
    resources.culture = 0;

    var keepCount = Math.min(3, prestigeLevel);
    var keptTechs = Array.from(researchedTechs).slice(0, keepCount);
    researchedTechs = new Set(keptTechs);
    try { localStorage.setItem('cityTechs_v6', JSON.stringify(keptTechs)); } catch(e){}

    for(var gy3=0; gy3<GRID; gy3++) for(var gx3=0; gx3<GRID; gx3++) grid[gy3][gx3] = null;
    currentEra = 0;
    buildCount = 0;
    gameYear = -2333;
    yearCounter = 0;
    victoryShown = false;
    disastersSurvived = 0;
    completedQuests = new Set();
    claimedQuests = new Set();
    activeTradeRoutes = new Set();
    chronicle = [];
    statsHistory = { pop:[], food:[], gold:[], culture:[] };

    if(typeof buildBuildPanel === 'function') buildBuildPanel();
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof recalcRates === 'function') recalcRates();
    if(typeof drawMinimap === 'function') drawMinimap();
    if(typeof addChronicle === 'function') addChronicle('⭐', '명예 재시작 ' + prestigeLevel + '단계! 보너스 자원으로 시작합니다.');
    if(typeof toast === 'function') toast('⭐ 명예 ' + prestigeLevel + '단계로 재시작!');
    if(typeof restartBGM === 'function') restartBGM();

    document.getElementById('prestige-panel').classList.remove('show');
    playV6SFX('prestige');
}

// ===================== v6.0 ADDITIONAL QUIZ QUESTIONS (+15) =====================
const V6_QUIZ_QUESTIONS = [
    { era:0, q:'고조선의 법률인 8조법 중 현재 전해지는 것은 몇 개인가요?', opts:['3개','5개','8개','2개'], answer:0, explain:'8조법 중 3개만 전해집니다: 살인자는 사형, 상해를 입히면 곡물로 배상, 도둑은 노비가 됩니다.' },
    { era:0, q:'고조선의 건국 이야기에 나오는 동물은?', opts:['호랑이와 곰','토끼와 거북이','용과 봉황','사슴과 학'], answer:0, explain:'단군 신화에서 호랑이와 곰이 사람이 되고 싶어했고, 곰만 참아서 웅녀가 되었습니다.' },
    { era:0, q:'비파형 동검은 어느 나라의 대표적 유물인가요?', opts:['고조선','가야','백제','신라'], answer:0, explain:'비파형 동검은 비파(악기) 모양의 청동 검으로, 고조선의 세력 범위를 알려주는 대표 유물입니다.' },
    { era:1, q:'삼국시대에 가야가 유명했던 것은 무엇인가요?', opts:['철기 생산','도자기','한글','인쇄술'], answer:0, explain:'가야는 풍부한 철 자원으로 철기 생산이 발달했고, 철을 낙랑과 일본에 수출했습니다.' },
    { era:1, q:'고구려 광개토대왕의 업적을 기록한 비석은?', opts:['광개토대왕릉비','첨성대비','무령왕릉비','태왕사신기'], answer:0, explain:'광개토대왕릉비는 중국 지안시에 있으며, 높이 6.39m의 거대한 비석으로 왕의 영토 확장을 기록했습니다.' },
    { era:1, q:'신라의 삼국통일에 도움을 준 나라는?', opts:['당나라','일본','몽골','거란'], answer:0, explain:'신라는 당나라와 연합하여 660년 백제, 668년 고구려를 멸망시키고 삼국을 통일했습니다.' },
    { era:2, q:'고려시대 국제 무역항의 이름은?', opts:['벽란도','인천항','부산항','마산항'], answer:0, explain:'벽란도는 예성강 하구에 있던 국제 무역항으로, 아라비아 상인까지 왕래했습니다. Korea라는 이름도 여기서 유래했어요.' },
    { era:2, q:'고려의 대표적 행사인 연등회는 어떤 종교와 관련있나요?', opts:['불교','유교','도교','기독교'], answer:0, explain:'연등회는 부처님의 탄생을 기념하는 불교 행사로, 등불을 밝히며 기원하는 축제입니다. 2020년 유네스코 무형문화유산이 되었어요.' },
    { era:2, q:'몽골 침입 때 고려가 수도를 옮긴 곳은?', opts:['강화도','제주도','울릉도','거제도'], answer:0, explain:'고려는 1232년 강화도로 천도하여 39년간 몽골에 항쟁했습니다. 바다를 건너기 어려운 몽골군의 약점을 이용한 것이에요.' },
    { era:3, q:'조선시대 과거 시험은 몇 년에 한 번 실시되었나요?', opts:['3년','1년','5년','10년'], answer:0, explain:'정기 과거(식년시)는 3년에 한 번 실시되었습니다. 이외에도 왕의 특별 명령으로 치르는 별시도 있었어요.' },
    { era:3, q:'세종대왕이 측우기를 만든 이유는?', opts:['비의 양을 재기 위해','강물 높이를 재기 위해','바람 세기를 재기 위해','눈 양을 재기 위해'], answer:0, explain:'측우기는 1441년 세종 때 만든 세계 최초의 강우량 측정 기구입니다. 농사에 중요한 강수량을 과학적으로 측정했어요.' },
    { era:3, q:'임진왜란 때 의병을 이끈 승려는?', opts:['서산대사','원효대사','의천','지눌'], answer:0, explain:'서산대사(휴정)는 임진왜란 때 73세의 나이에 승병을 이끌고 평양 탈환에 참여했습니다.' },
    { era:4, q:'우리나라 최초의 근대 신문은?', opts:['한성순보','독립신문','조선일보','동아일보'], answer:0, explain:'한성순보(1883)는 최초의 근대 신문이고, 독립신문(1896)은 최초의 한글 신문입니다.' },
    { era:4, q:'을사늑약(1905)으로 빼앗긴 것은?', opts:['외교권','군사권','경제권','교육권'], answer:0, explain:'을사늑약(을사조약)으로 대한제국은 외교권을 일본에 빼앗기고 통감부가 설치되었습니다.' },
    { era:4, q:'3.1 운동은 몇 년에 일어났나요?', opts:['1919년','1910년','1945년','1895년'], answer:0, explain:'3.1 운동은 1919년 3월 1일에 시작된 전국적 독립만세 운동으로, 약 200만명이 참여했습니다.' },
];

// ===================== v6.0 ADDITIONAL CHOICE EVENTS (+6) =====================
const V6_CHOICE_EVENTS = [
    { id:'ce_scholar_debate', icon:'📚', title:'학자들의 논쟁', desc:'학자들이 유교와 불교 중 어느 것을 더 중시해야 할지 논쟁합니다.',
      eras:[1,2,3], optA:{ label:'유교를 장려한다', effect:'문화 +20, 행복 -5', fn:function(r){ r.culture += 20; r.happy = Math.max(0, r.happy - 5); } },
      optB:{ label:'불교를 장려한다', effect:'행복 +15, 금 -30', fn:function(r){ r.happy = Math.min(100, r.happy + 15); r.gold = Math.max(0, r.gold - 30); } } },
    { id:'ce_foreign_envoy', icon:'🌍', title:'외국 사신의 방문', desc:'외국 사신이 교역을 제안합니다. 큰 선물을 가져왔어요!',
      eras:[1,2,3,4], optA:{ label:'교역을 수락한다', effect:'금 +100, 문화 +10', fn:function(r){ r.gold += 100; r.culture += 10; } },
      optB:{ label:'정중히 거절한다', effect:'행복 +10, 문화 +15', fn:function(r){ r.happy = Math.min(100, r.happy + 10); r.culture += 15; } } },
    { id:'ce_refugee', icon:'🙏', title:'피난민 무리', desc:'전쟁을 피해 피난민들이 몰려왔습니다.',
      eras:[1,2,3], optA:{ label:'모두 받아들인다', effect:'인구 +40, 식량 -40', fn:function(r){ r.pop += 40; r.food = Math.max(0, r.food - 40); } },
      optB:{ label:'일부만 수용한다', effect:'인구 +15, 행복 +5', fn:function(r){ r.pop += 15; r.happy = Math.min(100, r.happy + 5); } } },
    { id:'ce_invention', icon:'⚙️', title:'발명가의 제안', desc:'한 발명가가 새로운 기계를 만들겠다고 합니다. 지원이 필요해요.',
      eras:[2,3,4], optA:{ label:'전폭 지원한다', effect:'금 -80, 문화 +35', fn:function(r){ r.gold = Math.max(0, r.gold - 80); r.culture += 35; } },
      optB:{ label:'소규모 지원만', effect:'금 -30, 문화 +12', fn:function(r){ r.gold = Math.max(0, r.gold - 30); r.culture += 12; } } },
    { id:'ce_epidemic_cure', icon:'🌿', title:'약초 발견', desc:'의원이 전염병을 치료할 수 있는 약초를 발견했습니다!',
      eras:[0,1,2,3], optA:{ label:'대량 재배한다', effect:'인구 +25, 금 -50', fn:function(r){ r.pop += 25; r.gold = Math.max(0, r.gold - 50); } },
      optB:{ label:'비법으로 보관', effect:'행복 +15, 문화 +10', fn:function(r){ r.happy = Math.min(100, r.happy + 15); r.culture += 10; } } },
    { id:'ce_art_patron', icon:'🎨', title:'예술 후원 요청', desc:'유명한 화가가 궁궐 벽화를 그리겠다고 합니다.',
      eras:[2,3,4], optA:{ label:'후원한다', effect:'금 -60, 문화 +30, 행복 +10', fn:function(r){ r.gold = Math.max(0, r.gold - 60); r.culture += 30; r.happy = Math.min(100, r.happy + 10); } },
      optB:{ label:'거절한다', effect:'금 유지', fn:function(r){} } },
];

// ===================== v6.0 ADDITIONAL ACHIEVEMENTS (+10) =====================
const V6_ACHIEVEMENTS = [
    { id:'v6_tech_5', icon:'🔬', title:'연구원', desc:'기술 5개를 연구했어요!',
      check: function(s){ return researchedTechs.size >= 5; } },
    { id:'v6_tech_all', icon:'🧬', title:'기술 마스터', desc:'모든 기술을 연구했어요!',
      check: function(s){ return researchedTechs.size >= TECHNOLOGIES.length; } },
    { id:'v6_great_3', icon:'🌟', title:'위인의 도시', desc:'위인 3명을 만났어요!',
      check: function(s){ return appearedGreatPeople.size >= 3; } },
    { id:'v6_great_all', icon:'👑', title:'위인 컬렉터', desc:'모든 위인을 만났어요!',
      check: function(s){ return appearedGreatPeople.size >= GREAT_PEOPLE.length; } },
    { id:'v6_prestige_1', icon:'⭐', title:'명예 1단계', desc:'첫 번째 명예 재시작!',
      check: function(s){ return prestigeLevel >= 1; } },
    { id:'v6_prestige_3', icon:'🌟', title:'명예 3단계', desc:'명예 재시작 3회 달성!',
      check: function(s){ return prestigeLevel >= 3; } },
    { id:'v6_quiz_40', icon:'🧠', title:'퀴즈 달인', desc:'퀴즈 누적 40문제 정답!',
      check: function(s){ return (typeof totalQuizCorrect !== 'undefined') && totalQuizCorrect >= 40; } },
    { id:'v6_pop_5000', icon:'🌆', title:'초대형 도시', desc:'인구 5000명 달성!',
      check: function(s){ return s.resources.pop >= 5000; } },
    { id:'v6_build_300', icon:'🏗️', title:'건축의 신', desc:'건물 300개를 건설했어요!',
      check: function(s){ return s.buildCount >= 300; } },
    { id:'v6_gold_50000', icon:'💰', title:'경제 대국', desc:'금 50000개를 모았어요!',
      check: function(s){ return s.resources.gold >= 50000; } },
];

// ===================== v6.0 ADDITIONAL ADVISOR TIPS (+10) =====================
const V6_ADVISOR_TIPS = [
    '💡 기술 연구를 하면 자원 생산이 영구적으로 증가해요! (키보드 R)',
    '💡 같은 종류의 건물을 붙여 지으면 인접 보너스를 받아요!',
    '💡 수요 지표를 확인하세요. 주거/상업/문화 수요가 높으면 관련 건물을 지으세요.',
    '💡 위인이 등장하면 큰 보너스를 받을 수 있어요. 문화를 높이면 위인이 잘 나와요!',
    '💡 명예 재시작을 하면 초기 자원이 늘어나서 더 빠르게 성장할 수 있어요.',
    '💡 광개토대왕은 고구려의 영토를 만주까지 넓힌 정복왕이에요.',
    '💡 고려의 벽란도는 아라비아 상인도 오는 국제 무역항이었어요.',
    '💡 거북선 설계 기술을 연구하면 재해 피해가 크게 줄어요.',
    '💡 훈민정음 기술을 연구하면 문화 생산이 35% 증가해요!',
    '💡 3.1 운동에는 약 200만명의 국민이 참여했어요.',
];

// ===================== WEB AUDIO SFX (6 types) =====================
function playV6SFX(type) {
    if(typeof audioCtx === 'undefined' || !audioCtx || audioMuted) return;
    try {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        var t = audioCtx.currentTime;

        switch(type) {
            case 'research':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.linearRampToValueAtTime(784, t + 0.15);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.3);
                gain.gain.setValueAtTime(0.08, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                osc.start(t); osc.stop(t + 0.5);
                break;
            case 'adjacency':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(660, t);
                osc.frequency.linearRampToValueAtTime(880, t + 0.1);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                osc.start(t); osc.stop(t + 0.25);
                break;
            case 'great_person':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(392, t);
                osc.frequency.linearRampToValueAtTime(523, t + 0.2);
                osc.frequency.linearRampToValueAtTime(659, t + 0.4);
                osc.frequency.linearRampToValueAtTime(784, t + 0.6);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc.start(t); osc.stop(t + 0.8);
                var osc2 = audioCtx.createOscillator();
                var gain2 = audioCtx.createGain();
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(523, t + 0.1);
                osc2.frequency.linearRampToValueAtTime(784, t + 0.5);
                gain2.gain.setValueAtTime(0.04, t + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc2.connect(gain2); gain2.connect(audioCtx.destination);
                osc2.start(t + 0.1); osc2.stop(t + 0.8);
                break;
            case 'prestige':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(262, t);
                osc.frequency.linearRampToValueAtTime(392, t + 0.2);
                osc.frequency.linearRampToValueAtTime(523, t + 0.4);
                osc.frequency.linearRampToValueAtTime(784, t + 0.6);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.8);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
                osc.start(t); osc.stop(t + 1.0);
                break;
            case 'demand':
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, t);
                osc.frequency.linearRampToValueAtTime(330, t + 0.15);
                gain.gain.setValueAtTime(0.03, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                osc.start(t); osc.stop(t + 0.2);
                break;
            case 'quiz_bonus':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(659, t);
                osc.frequency.linearRampToValueAtTime(880, t + 0.1);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.2);
                gain.gain.setValueAtTime(0.07, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
                osc.start(t); osc.stop(t + 0.35);
                break;
        }
    } catch(e){}
}

// ===================== HOOK INTO EXISTING SYSTEMS =====================
function hookRecalcRates() {
    var originalRecalcRates = window.recalcRates;
    if(!originalRecalcRates) return;
    window.recalcRates = function() {
        originalRecalcRates();
        var foodMult = getTechMultiplier('food_mult');
        var goldMult = getTechMultiplier('gold_mult');
        var cultureMult = getTechMultiplier('culture_mult');
        var popMult = getTechMultiplier('pop_mult');

        if(foodMult > 0) rates.food = Math.floor(rates.food * (1 + foodMult));
        if(goldMult > 0) rates.gold = Math.floor(rates.gold * (1 + goldMult));
        if(cultureMult > 0) rates.culture = Math.floor(rates.culture * (1 + cultureMult));
        if(popMult > 0) rates.pop = Math.floor(rates.pop * (1 + popMult));

        for(var gy4=0; gy4<GRID; gy4++) {
            for(var gx4=0; gx4<GRID; gx4++) {
                var b = grid[gy4][gx4];
                if(!b || b.isExtra) continue;
                var adj = calcAdjacencyBonus(b, gx4, gy4);
                rates.food += adj.food;
                rates.gold += adj.gold;
                rates.culture += adj.culture;
                rates.happy += adj.happy;
            }
        }

        if(typeof sandboxMode !== 'undefined' && sandboxMode) {
            resources.gold = Math.max(resources.gold, 99999);
            resources.food = Math.max(resources.food, 99999);
        }
    };
}

function hookGameTick() {
    var originalGameTick = window.gameTick;
    if(!originalGameTick) return;
    window.gameTick = function() {
        originalGameTick();
        if(speed === 0) return;
        checkGreatPerson();
        if(tickTimer % 120 === 0) updateDemand();
        if(currentEra >= 4 && buildCount >= 50) {
            document.getElementById('prestige-btn').style.display = 'block';
        }
    };
}

function hookPlaceBuilding() {
    var originalPlaceBuilding = window.placeBuilding;
    if(!originalPlaceBuilding) return;
    window.placeBuilding = function(gx, gy) {
        var prevCount = buildCount;
        originalPlaceBuilding(gx, gy);
        if(buildCount > prevCount && grid[gy] && grid[gy][gx] && !grid[gy][gx].isExtra) {
            var b = grid[gy][gx];
            var adj = calcAdjacencyBonus(b, gx, gy);
            var hasBonus = (adj.gold + adj.food + adj.culture + adj.happy) > 0;
            if(hasBonus) {
                setTimeout(function(){ showAdjacencyToast(gx, gy, adj); }, 400);
            }
        }
    };
}

function hookCheckAchievements() {
    var originalCheckAchievements = window.checkAchievements;
    if(!originalCheckAchievements) return;
    window.checkAchievements = function() {
        originalCheckAchievements();
        var state = {
            resources: resources, buildCount: buildCount, currentEra: currentEra,
            disastersSurvived: disastersSurvived, usedFastSpeed: usedFastSpeed,
            questCount: (typeof claimedQuests !== 'undefined') ? claimedQuests.size : 0,
            seasonsCycled: (typeof seasonsCycled !== 'undefined') ? seasonsCycled : 0
        };
        V6_ACHIEVEMENTS.forEach(function(ach) {
            if(!unlockedAchievements.has(ach.id) && ach.check(state)) {
                unlockedAchievements.add(ach.id);
                showAchToast(ach);
            }
        });
    };
}

function showAchToast(ach) {
    var el = document.createElement('div');
    el.className = 'ach-toast';
    el.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + ach.icon + ' ' + ach.title + '</div><div class="a-desc">' + ach.desc + '</div>';
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 4500);
    if(typeof playAchievementSound === 'function') playAchievementSound();
}

function hookShowAchievements() {
    var originalShowAchievements = window.showAchievements;
    if(!originalShowAchievements) return;
    window.showAchievements = function() {
        originalShowAchievements();
        var listEl = document.getElementById('ach-list');
        if(!listEl) return;
        var sep = document.createElement('div');
        sep.style.cssText = 'text-align:center;color:#40a0e0;font-size:12px;margin:12px 0 8px;padding-top:8px;border-top:1px solid rgba(64,160,224,0.3);';
        sep.textContent = '— v6.0 🔬 연구·위인·명예 —';
        listEl.appendChild(sep);
        V6_ACHIEVEMENTS.forEach(function(ach) {
            var unlocked = unlockedAchievements.has(ach.id);
            var div = document.createElement('div');
            div.className = 'ach-item' + (unlocked ? ' unlocked' : '');
            div.innerHTML = '<div class="ai-icon">' + ach.icon + '</div><div class="ai-info"><div class="ai-title">' + ach.title + '</div><div class="ai-desc">' + ach.desc + '</div></div>';
            listEl.appendChild(div);
        });
    };
}

function hookShowVictory() {
    var originalShowVictory = window.showVictory;
    if(!originalShowVictory) return;
    window.showVictory = function() {
        originalShowVictory();
        var vStats = document.getElementById('v-stats');
        if(vStats) {
            var totalAch = (typeof ACHIEVEMENTS !== 'undefined' ? ACHIEVEMENTS.length : 0) +
                (typeof NEW_ACHIEVEMENTS !== 'undefined' ? NEW_ACHIEVEMENTS.length : 0) +
                (typeof V5_ACHIEVEMENTS !== 'undefined' ? V5_ACHIEVEMENTS.length : 0) +
                V6_ACHIEVEMENTS.length;
            vStats.innerHTML += '<p>🔬 연구: ' + researchedTechs.size + '/' + TECHNOLOGIES.length + '</p>';
            vStats.innerHTML += '<p>🌟 위인: ' + appearedGreatPeople.size + '/' + GREAT_PEOPLE.length + '</p>';
            vStats.innerHTML += '<p>⭐ 명예: ' + prestigeLevel + '단계</p>';
        }
    };
}

function hookShowQuiz() {
    if(typeof V6_QUIZ_QUESTIONS === 'undefined' || !window.QUIZ_QUESTIONS) return;
    V6_QUIZ_QUESTIONS.forEach(function(q) {
        var exists = false;
        for(var i=0; i<window.QUIZ_QUESTIONS.length; i++) {
            if(window.QUIZ_QUESTIONS[i].q === q.q) { exists = true; break; }
        }
        if(!exists) window.QUIZ_QUESTIONS.push(q);
    });
}

function hookChoiceEvents() {
    if(!window.CHOICE_EVENTS) return;
    V6_CHOICE_EVENTS.forEach(function(evt) {
        var exists = false;
        for(var i=0; i<window.CHOICE_EVENTS.length; i++) {
            if(window.CHOICE_EVENTS[i].id === evt.id) { exists = true; break; }
        }
        if(!exists) window.CHOICE_EVENTS.push(evt);
    });
}

function hookAdvisorTips() {
    if(!window.V5_ADVISOR_TIPS) {
        window.V6_EXTRA_TIPS = V6_ADVISOR_TIPS;
    } else {
        V6_ADVISOR_TIPS.forEach(function(tip) {
            if(window.V5_ADVISOR_TIPS.indexOf(tip) === -1) window.V5_ADVISOR_TIPS.push(tip);
        });
    }
}

function hookAutoSave() {
    var originalAutoSave = window.autoSave;
    if(!originalAutoSave) return;
    window.autoSave = function() {
        originalAutoSave();
        try {
            localStorage.setItem('cityTechs_v6', JSON.stringify(Array.from(researchedTechs)));
            localStorage.setItem('cityGreatPeople_v6', JSON.stringify(Array.from(appearedGreatPeople)));
            localStorage.setItem('cityPrestige_v6', String(prestigeLevel));
        } catch(e){}
    };
}

function hookKeyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.key === 'r' && !e.ctrlKey && !e.metaKey) showTechTree();
        else if(e.key === 'v' && !e.ctrlKey && !e.metaKey) {
            if(currentEra >= 4 && buildCount >= 50) showPrestige();
        }
    });
}

// ===================== INITIALIZATION =====================
function initV6() {
    addUI();
    hookRecalcRates();
    hookGameTick();
    hookPlaceBuilding();
    hookCheckAchievements();
    hookShowAchievements();
    hookShowVictory();
    hookShowQuiz();
    hookChoiceEvents();
    hookAdvisorTips();
    hookAutoSave();
    hookKeyboard();
    updateDemand();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🔬 v6.0: 기술 연구 + 위인 + 인접 보너스 + 명예 재시작!');
        }, 2000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(initV6, 500); });
} else {
    setTimeout(initV6, 500);
}

})();
