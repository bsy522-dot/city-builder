// =====================================================================
// city-builder v8_patch.js — PRIME Holdings NEXTERA+PRISM v8.0
// Self-contained patch: Transportation Infrastructure 3 types,
// Military Defense System, Festival System 4 seasons,
// Citizen Happiness Dashboard 5 indicators, Campaign Scenarios 8,
// City Analytics Dashboard Canvas, +15 Quiz (70), +12 Achievements (74),
// SFX 6, Keyboard Shortcuts +5
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v8AudioCtx = null;
function getV8Audio() {
    if(!v8AudioCtx) {
        try { v8AudioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v8AudioCtx;
}
function playV8SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV8Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'road_build':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(550, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'military_march':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(220, now);
            o.frequency.setValueAtTime(330, now+0.1);
            o.frequency.setValueAtTime(440, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'festival_start':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(523, now);
            o.frequency.setValueAtTime(659, now+0.08);
            o.frequency.setValueAtTime(784, now+0.16);
            o.frequency.setValueAtTime(1047, now+0.24);
            g.gain.setValueAtTime(0.18, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.6);
            o.connect(g); o.start(now); o.stop(now+0.5);
            break;
        case 'happiness_up':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(880, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'campaign_complete':
            [523,659,784,1047,1319].forEach(function(f, i) {
                var oo = ctx.createOscillator();
                oo.type='sine'; oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.12, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.3);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.3);
            });
            break;
        case 'analytics_open':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(660, now);
            o.frequency.linearRampToValueAtTime(440, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
    }
}

// ===================== CSS INJECTION =====================
var V8_CSS = '\
#transport-btn {\
    position: fixed; top: 610px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #80d0ff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#transport-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#transport-panel.show { display: flex; }\
#transport-box {\
    background: linear-gradient(145deg, #0a1a2e, #041020);\
    border: 2px solid #4090e0; border-radius: 16px;\
    padding: 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#transport-box h2 { color: #80d0ff; text-align: center; margin-bottom: 10px; }\
.road-stat { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 12px; }\
.road-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    cursor: pointer; transition: all 0.2s;\
}\
.road-item:hover { background: rgba(64,144,224,0.15); border-color: rgba(64,144,224,0.4); }\
.road-item.locked { opacity: 0.4; cursor: not-allowed; }\
.road-item .ri-icon { font-size: 28px; flex-shrink: 0; }\
.road-item .ri-info { flex: 1; }\
.road-item .ri-name { font-weight: bold; font-size: 13px; color: #b0d8ff; }\
.road-item .ri-desc { font-size: 11px; color: #aaa; margin-top: 2px; }\
.road-item .ri-effect { font-size: 10px; color: #80ff80; margin-top: 2px; }\
.road-item .ri-cost { font-size: 10px; color: #80d0ff; margin-top: 2px; }\
\
#military-btn {\
    position: fixed; top: 650px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ff8060;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#military-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#military-panel.show { display: flex; }\
#military-box {\
    background: linear-gradient(145deg, #2a0a0a, #1a0404);\
    border: 2px solid #e06040; border-radius: 16px;\
    padding: 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#military-box h2 { color: #ff8060; text-align: center; margin-bottom: 10px; }\
.mil-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }\
.mil-stat-card {\
    background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px; text-align: center;\
}\
.mil-stat-card .msc-val { font-size: 24px; font-weight: bold; color: #ff8060; }\
.mil-stat-card .msc-label { font-size: 11px; color: #aaa; margin-top: 4px; }\
.mil-unit {\
    display: flex; align-items: center; gap: 10px; padding: 8px;\
    margin-bottom: 4px; border-radius: 8px; background: rgba(255,255,255,0.04);\
}\
.mil-unit .mu-icon { font-size: 20px; }\
.mil-unit .mu-name { flex: 1; font-size: 12px; color: #ddd; }\
.mil-unit .mu-def { color: #ff8060; font-weight: bold; font-size: 12px; }\
\
#festival-btn {\
    position: fixed; top: 690px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffcc00;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#festival-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#festival-panel.show { display: flex; }\
#festival-box {\
    background: linear-gradient(145deg, #2a2000, #1a1400);\
    border: 2px solid #e0a000; border-radius: 16px;\
    padding: 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#festival-box h2 { color: #ffcc00; text-align: center; margin-bottom: 10px; }\
.fest-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    transition: all 0.2s;\
}\
.fest-item.active-fest { border-color: #e0a000; background: rgba(224,160,0,0.15); box-shadow: 0 0 15px rgba(224,160,0,0.2); }\
.fest-item .fi-icon { font-size: 32px; flex-shrink: 0; }\
.fest-item .fi-info { flex: 1; }\
.fest-item .fi-name { font-weight: bold; font-size: 14px; color: #ffe080; }\
.fest-item .fi-desc { font-size: 11px; color: #ccc; margin-top: 2px; }\
.fest-item .fi-effect { font-size: 10px; color: #80ff80; margin-top: 2px; }\
.fest-item .fi-status { font-size: 10px; margin-top: 4px; }\
.fest-history { margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,204,0,0.2); }\
.fest-history-title { color: #ffe080; font-size: 12px; margin-bottom: 6px; }\
.fest-log { font-size: 11px; color: #aaa; padding: 3px 0; }\
\
#happy-btn {\
    position: fixed; top: 730px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #60ff90;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#happy-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#happy-panel.show { display: flex; }\
#happy-box {\
    background: linear-gradient(145deg, #0a2a1a, #041a0a);\
    border: 2px solid #40c070; border-radius: 16px;\
    padding: 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#happy-box h2 { color: #60ff90; text-align: center; margin-bottom: 14px; }\
.happy-bar-wrap { margin-bottom: 10px; }\
.happy-bar-label { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }\
.happy-bar-label .hbl-name { color: #ddd; }\
.happy-bar-label .hbl-val { color: #60ff90; font-weight: bold; }\
.happy-bar { height: 10px; background: #222; border-radius: 5px; overflow: hidden; }\
.happy-bar-fill { height: 100%; border-radius: 5px; transition: width 0.4s, background 0.4s; }\
.happy-summary { text-align: center; margin-top: 14px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; }\
.happy-summary .hs-grade { font-size: 28px; font-weight: bold; }\
.happy-summary .hs-label { color: #aaa; font-size: 12px; margin-top: 4px; }\
\
#campaign-btn {\
    position: fixed; top: 770px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #c0a0ff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#campaign-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#campaign-panel.show { display: flex; }\
#campaign-box {\
    background: linear-gradient(145deg, #1a0a2e, #0e041a);\
    border: 2px solid #8060c0; border-radius: 16px;\
    padding: 24px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#campaign-box h2 { color: #c0a0ff; text-align: center; margin-bottom: 10px; }\
.campaign-progress-text { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.camp-item {\
    padding: 12px; margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    transition: all 0.2s;\
}\
.camp-item.completed { border-color: #4caf50; background: rgba(76,175,80,0.1); }\
.camp-item .ci-header { display: flex; align-items: center; gap: 8px; }\
.camp-item .ci-icon { font-size: 24px; }\
.camp-item .ci-name { font-weight: bold; font-size: 13px; color: #d0b8ff; flex: 1; }\
.camp-item .ci-badge { font-size: 18px; }\
.camp-item .ci-desc { font-size: 11px; color: #aaa; margin-top: 4px; }\
.camp-item .ci-goal { font-size: 11px; color: #c0a0ff; margin-top: 4px; }\
.camp-item .ci-progress { margin-top: 6px; height: 6px; background: #333; border-radius: 3px; overflow: hidden; }\
.camp-item .ci-progress-fill { height: 100%; background: linear-gradient(90deg, #8060c0, #c0a0ff); transition: width 0.3s; border-radius: 3px; }\
.camp-item .ci-reward { font-size: 10px; color: #ffd700; margin-top: 4px; }\
.camp-item.completed .ci-name { color: #4caf50; }\
\
.fest-toast {\
    position: fixed; left: 50%; top: 100px; transform: translateX(-50%);\
    z-index: 175; background: linear-gradient(135deg, #e0a000, #c08000);\
    border: 2px solid #ffd700; border-radius: 14px;\
    padding: 14px 24px; max-width: 360px; text-align: center;\
    pointer-events: none; animation: festToast 6s forwards;\
}\
.fest-toast .ft-icon { font-size: 36px; }\
.fest-toast .ft-title { color: #fff; font-weight: bold; font-size: 16px; margin: 4px 0; }\
.fest-toast .ft-desc { color: #ffe0a0; font-size: 12px; }\
@keyframes festToast {\
    0% { opacity: 0; top: 80px; }\
    10% { opacity: 1; top: 100px; }\
    80% { opacity: 1; top: 100px; }\
    100% { opacity: 0; top: 80px; }\
}\
\
@media (max-width: 600px) {\
    #transport-btn { top: 500px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #military-btn { top: 534px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #festival-btn { top: 568px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #happy-btn { top: 602px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #campaign-btn { top: 636px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    .mil-stat-grid { grid-template-columns: 1fr; }\
}\
@media (max-width: 400px) {\
    #transport-btn, #military-btn, #festival-btn, #happy-btn, #campaign-btn {\
        width: 26px; height: 26px; font-size: 12px;\
    }\
}\
';

var styleEl8 = document.createElement('style');
styleEl8.textContent = V8_CSS;
document.head.appendChild(styleEl8);

// ===================== TRANSPORTATION SYSTEM =====================
var ROAD_TYPES = [
    { id:'dirt_road', icon:'🛤', name:'흙길', desc:'마을을 잇는 가장 기본적인 길이에요.', effect:'인접 건물 생산 +5%', cost:15, era:0, bonus:0.05 },
    { id:'stone_road', icon:'🧱', name:'돌길', desc:'돌을 깔아 만든 튼튼한 길이에요.', effect:'인접 건물 생산 +10%, 교역 +5%', cost:35, era:1, bonus:0.10 },
    { id:'paved_road', icon:'🛣', name:'포장도로', desc:'근대식 포장도로예요. 빠르고 편해요!', effect:'인접 건물 생산 +15%, 교역 +10%', cost:60, era:3, bonus:0.15 }
];

var roadCount = 0;
var roadGrid = [];
try {
    var savedRoads = localStorage.getItem('cityRoads_v8');
    if(savedRoads) {
        var rd = JSON.parse(savedRoads);
        roadCount = rd.count || 0;
        roadGrid = rd.grid || [];
    }
} catch(e){}

function saveRoads() {
    try { localStorage.setItem('cityRoads_v8', JSON.stringify({ count: roadCount, grid: roadGrid })); } catch(e){}
}

function buildRoad(roadType) {
    if(typeof resources === 'undefined' || resources.gold < roadType.cost) {
        if(typeof toast === 'function') toast('금이 부족해요!');
        return;
    }
    if(typeof currentEra !== 'undefined' && currentEra < roadType.era) {
        if(typeof toast === 'function') toast('이 시대에는 건설할 수 없어요!');
        return;
    }
    resources.gold -= roadType.cost;
    roadCount++;
    roadGrid.push({ type: roadType.id, tick: Date.now() });
    saveRoads();
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof recalcRates === 'function') recalcRates();
    if(typeof toast === 'function') toast('🛤 ' + roadType.name + ' 건설! (총 ' + roadCount + '개)');
    if(typeof addChronicle === 'function') addChronicle(roadType.icon, roadType.name + '을 건설했습니다.');
    playV8SFX('road_build');
    if(typeof checkAchievements === 'function') checkAchievements();
    showTransport();
}

function getRoadBonus() {
    if(roadCount <= 0) return 0;
    var totalBonus = 0;
    ROAD_TYPES.forEach(function(rt) {
        var c = roadGrid.filter(function(r) { return r.type === rt.id; }).length;
        totalBonus += c * rt.bonus;
    });
    return Math.min(totalBonus, 0.5);
}

function showTransport() {
    if(typeof playClickSound === 'function') playClickSound();
    var box = document.getElementById('transport-list');
    if(!box) return;
    box.innerHTML = '';
    document.getElementById('road-stat').textContent = '도로 수: ' + roadCount + '개 | 생산 보너스: +' + Math.round(getRoadBonus() * 100) + '%';

    ROAD_TYPES.forEach(function(rt) {
        var locked = typeof currentEra !== 'undefined' && currentEra < rt.era;
        var count = roadGrid.filter(function(r) { return r.type === rt.id; }).length;
        var div = document.createElement('div');
        div.className = 'road-item' + (locked ? ' locked' : '');
        div.innerHTML = '<div class="ri-icon">' + rt.icon + '</div>' +
            '<div class="ri-info"><div class="ri-name">' + rt.name + (count > 0 ? ' (' + count + '개)' : '') + '</div>' +
            '<div class="ri-desc">' + rt.desc + '</div>' +
            '<div class="ri-effect">' + rt.effect + '</div>' +
            '<div class="ri-cost">건설비: 💰 ' + rt.cost + '</div></div>';
        if(!locked) {
            div.onclick = function() { buildRoad(rt); };
        }
        box.appendChild(div);
    });

    document.getElementById('transport-panel').classList.add('show');
}

// ===================== MILITARY DEFENSE SYSTEM =====================
var DEFENSE_BUILDINGS = {
    'mokchaek': { name:'목책', def: 2, icon:'🏗️' },
    'wall': { name:'성벽', def: 5, icon:'🏰' },
    'armory': { name:'무기고', def: 3, icon:'⚔️' },
    'fortress': { name:'성곽', def: 8, icon:'🏯' },
    'hwarang': { name:'화랑도', def: 4, icon:'⚔️' },
    'gun_powder': { name:'화약 공방', def: 6, icon:'💥' },
    'mongol_wall': { name:'강화도 성', def: 7, icon:'🗺️' },
    'hwaseong': { name:'수원화성', def: 10, icon:'🏰' },
    'turtle': { name:'거북선', def: 5, icon:'🐢' },
    'stable': { name:'말구간', def: 2, icon:'🐴' }
};

function getDefenseRating() {
    if(typeof grid === 'undefined') return 0;
    var total = 0;
    for(var y = 0; y < grid.length; y++) {
        for(var x = 0; x < grid[y].length; x++) {
            if(grid[y][x] && grid[y][x].id && DEFENSE_BUILDINGS[grid[y][x].id]) {
                total += DEFENSE_BUILDINGS[grid[y][x].id].def;
            }
        }
    }
    return total;
}

function getDefenseReduction() {
    var def = getDefenseRating();
    return Math.min(0.5, def * 0.01);
}

function getGarrisonUnits() {
    if(typeof grid === 'undefined') return [];
    var units = {};
    for(var y = 0; y < grid.length; y++) {
        for(var x = 0; x < grid[y].length; x++) {
            if(grid[y][x] && grid[y][x].id && DEFENSE_BUILDINGS[grid[y][x].id]) {
                var bid = grid[y][x].id;
                if(!units[bid]) units[bid] = { count: 0, info: DEFENSE_BUILDINGS[bid] };
                units[bid].count++;
            }
        }
    }
    return Object.values(units);
}

function showMilitary() {
    if(typeof playClickSound === 'function') playClickSound();
    var def = getDefenseRating();
    var reduction = Math.round(getDefenseReduction() * 100);
    var units = getGarrisonUnits();

    var statsGrid = document.getElementById('mil-stats');
    if(statsGrid) {
        statsGrid.innerHTML = '<div class="mil-stat-card"><div class="msc-val">🛡 ' + def + '</div><div class="msc-label">총 방어력</div></div>' +
            '<div class="mil-stat-card"><div class="msc-val">📉 ' + reduction + '%</div><div class="msc-label">재해 피해 경감</div></div>' +
            '<div class="mil-stat-card"><div class="msc-val">🏰 ' + units.length + '</div><div class="msc-label">방어 건물 종류</div></div>' +
            '<div class="mil-stat-card"><div class="msc-val">⚔ ' + (def >= 50 ? '요새' : def >= 30 ? '견고' : def >= 15 ? '보통' : '취약') + '</div><div class="msc-label">방어 등급</div></div>';
    }

    var unitList = document.getElementById('mil-units');
    if(unitList) {
        unitList.innerHTML = '';
        if(units.length === 0) {
            unitList.innerHTML = '<div style="text-align:center;color:#888;font-size:12px;padding:12px;">방어 건물이 없어요. 성벽, 무기고 등을 건설하세요!</div>';
        } else {
            units.forEach(function(u) {
                var div = document.createElement('div');
                div.className = 'mil-unit';
                div.innerHTML = '<div class="mu-icon">' + u.info.icon + '</div><div class="mu-name">' + u.info.name + ' x' + u.count + '</div><div class="mu-def">+' + (u.info.def * u.count) + ' 🛡</div>';
                unitList.appendChild(div);
            });
        }
    }

    playV8SFX('military_march');
    document.getElementById('military-panel').classList.add('show');
}

// ===================== FESTIVAL SYSTEM =====================
var FESTIVALS = [
    { id:'gwandeung', season:'spring', icon:'🏮', name:'관등회', desc:'봄에 연등을 밝히며 부처님오신날을 축하해요.', effect:'문화 +20, 행복 +10', applyFn: function() { if(typeof resources !== 'undefined') { resources.culture += 20; resources.happy = Math.min(100, resources.happy + 10); } } },
    { id:'dano', season:'summer', icon:'🎋', name:'단오', desc:'여름 단오에 창포물에 머리 감고 그네를 뛰어요!', effect:'행복 +15, 인구 +5', applyFn: function() { if(typeof resources !== 'undefined') { resources.happy = Math.min(100, resources.happy + 15); resources.pop += 5; } } },
    { id:'chuseok', season:'autumn', icon:'🌾', name:'추석 수확제', desc:'가을 풍성한 수확을 감사하는 명절이에요.', effect:'식량 +30, 금 +20', applyFn: function() { if(typeof resources !== 'undefined') { resources.food += 30; resources.gold += 20; } } },
    { id:'palgwan', season:'winter', icon:'❄️', name:'팔관회', desc:'겨울에 하늘과 산천 신에게 제사지내며 외교연회를 열어요.', effect:'문화 +15, 외교 호감 +5', applyFn: function() { if(typeof resources !== 'undefined') resources.culture += 15; boostDiplomacy(5); } }
];

var festivalState = { history: [], activeId: null, turnsLeft: 0, count: 0 };
try {
    var savedFest = localStorage.getItem('cityFest_v8');
    if(savedFest) festivalState = JSON.parse(savedFest);
} catch(e){}

function saveFestival() {
    try { localStorage.setItem('cityFest_v8', JSON.stringify(festivalState)); } catch(e){}
}

function boostDiplomacy(amount) {
    if(typeof window.diploState !== 'undefined') {
        for(var kid in window.diploState) {
            if(window.diploState.hasOwnProperty(kid)) {
                window.diploState[kid].favor = Math.min(100, window.diploState[kid].favor + amount);
            }
        }
    }
}

function getCurrentSeason() {
    var seasonEl = document.getElementById('season-ind');
    if(!seasonEl) return 'spring';
    if(seasonEl.classList.contains('spring')) return 'spring';
    if(seasonEl.classList.contains('summer')) return 'summer';
    if(seasonEl.classList.contains('autumn')) return 'autumn';
    if(seasonEl.classList.contains('winter')) return 'winter';
    return 'spring';
}

var festivalCooldown = 2400;
function tickFestival() {
    if(festivalState.turnsLeft > 0) {
        festivalState.turnsLeft--;
        if(festivalState.turnsLeft === 0) {
            festivalState.activeId = null;
            saveFestival();
        }
        return;
    }

    if(festivalCooldown > 0) { festivalCooldown--; return; }
    festivalCooldown = 3600 + Math.floor(Math.random() * 2400);

    var season = getCurrentSeason();
    var fest = FESTIVALS.find(function(f) { return f.season === season; });
    if(!fest) return;
    if(Math.random() > 0.35) return;

    fest.applyFn();
    festivalState.activeId = fest.id;
    festivalState.turnsLeft = 30;
    festivalState.count++;
    festivalState.history.push({ id: fest.id, name: fest.name, time: Date.now() });
    if(festivalState.history.length > 20) festivalState.history = festivalState.history.slice(-20);
    saveFestival();

    var el = document.createElement('div');
    el.className = 'fest-toast';
    el.innerHTML = '<div class="ft-icon">' + fest.icon + '</div><div class="ft-title">' + fest.name + ' 개최!</div><div class="ft-desc">' + fest.effect + '</div>';
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 6500);

    if(typeof addChronicle === 'function') addChronicle(fest.icon, fest.name + '이 열렸습니다! ' + fest.effect);
    if(typeof updateHUD === 'function') updateHUD();
    playV8SFX('festival_start');
    if(typeof checkAchievements === 'function') checkAchievements();
}

function showFestival() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('festival-list');
    if(!list) return;
    list.innerHTML = '';
    var season = getCurrentSeason();

    FESTIVALS.forEach(function(fest) {
        var isActive = festivalState.activeId === fest.id;
        var isSeason = fest.season === season;
        var div = document.createElement('div');
        div.className = 'fest-item' + (isActive ? ' active-fest' : '');
        div.innerHTML = '<div class="fi-icon">' + fest.icon + '</div>' +
            '<div class="fi-info"><div class="fi-name">' + fest.name + (isActive ? ' 🎉 진행중!' : '') + '</div>' +
            '<div class="fi-desc">' + fest.desc + '</div>' +
            '<div class="fi-effect">' + fest.effect + '</div>' +
            '<div class="fi-status" style="color:' + (isSeason ? '#80ff80' : '#888') + '">' +
            (isActive ? '남은 턴: ' + festivalState.turnsLeft : (isSeason ? '현재 계절 축제' : '계절: ' + fest.season)) + '</div></div>';
        list.appendChild(div);
    });

    var historyDiv = document.getElementById('fest-history');
    if(historyDiv) {
        historyDiv.innerHTML = '<div class="fest-history-title">축제 기록 (총 ' + festivalState.count + '회)</div>';
        festivalState.history.slice().reverse().slice(0, 8).forEach(function(h) {
            var d = new Date(h.time);
            var dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
            historyDiv.innerHTML += '<div class="fest-log">' + h.name + ' — ' + dateStr + '</div>';
        });
    }

    document.getElementById('festival-panel').classList.add('show');
}

// ===================== CITIZEN HAPPINESS DASHBOARD =====================
function calcHappinessIndicators() {
    var r = (typeof resources !== 'undefined') ? resources : { pop:0, food:0, gold:0, happy:0, culture:0 };
    var bc = (typeof buildCount !== 'undefined') ? buildCount : 0;

    var foodSat = Math.min(100, r.food > 0 ? Math.min(100, (r.food / Math.max(1, r.pop * 0.5)) * 100) : 0);
    var safety = Math.min(100, getDefenseRating() * 2.5);
    var cultureLevel = Math.min(100, r.culture * 0.8);
    var education = Math.min(100, bc * 1.5);
    var health = Math.min(100, r.happy * 1.2);

    return [
        { name:'식량 충족', icon:'🌾', val: Math.round(foodSat), color: foodSat > 60 ? '#4caf50' : foodSat > 30 ? '#ff9800' : '#f44336' },
        { name:'안전', icon:'🛡', val: Math.round(safety), color: safety > 60 ? '#4caf50' : safety > 30 ? '#ff9800' : '#f44336' },
        { name:'문화', icon:'🎭', val: Math.round(cultureLevel), color: cultureLevel > 60 ? '#4caf50' : cultureLevel > 30 ? '#ff9800' : '#f44336' },
        { name:'교육', icon:'📚', val: Math.round(education), color: education > 60 ? '#4caf50' : education > 30 ? '#ff9800' : '#f44336' },
        { name:'건강', icon:'💊', val: Math.round(health), color: health > 60 ? '#4caf50' : health > 30 ? '#ff9800' : '#f44336' }
    ];
}

var happyWarnCooldown = 0;
function checkHappinessWarning() {
    if(happyWarnCooldown > 0) { happyWarnCooldown--; return; }
    var inds = calcHappinessIndicators();
    var low = inds.find(function(i) { return i.val < 20; });
    if(low) {
        happyWarnCooldown = 6000;
        if(typeof toast === 'function') toast('⚠️ ' + low.icon + ' ' + low.name + ' 만족도가 낮아요! (' + low.val + '%)');
    }
}

function showHappiness() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('happy-list');
    if(!list) return;
    list.innerHTML = '';

    var indicators = calcHappinessIndicators();
    var avg = Math.round(indicators.reduce(function(s, i) { return s + i.val; }, 0) / indicators.length);

    indicators.forEach(function(ind) {
        var wrap = document.createElement('div');
        wrap.className = 'happy-bar-wrap';
        wrap.innerHTML = '<div class="happy-bar-label"><span class="hbl-name">' + ind.icon + ' ' + ind.name + '</span><span class="hbl-val">' + ind.val + '%</span></div>' +
            '<div class="happy-bar"><div class="happy-bar-fill" style="width:' + ind.val + '%;background:' + ind.color + '"></div></div>';
        list.appendChild(wrap);
    });

    var grade = avg >= 80 ? 'S' : avg >= 60 ? 'A' : avg >= 40 ? 'B' : avg >= 20 ? 'C' : 'D';
    var gradeColor = avg >= 80 ? '#ffd700' : avg >= 60 ? '#4caf50' : avg >= 40 ? '#ff9800' : avg >= 20 ? '#ff5722' : '#f44336';

    var summary = document.getElementById('happy-summary');
    if(summary) {
        summary.innerHTML = '<div class="hs-grade" style="color:' + gradeColor + '">' + grade + ' 등급</div>' +
            '<div class="hs-label">평균 만족도: ' + avg + '%</div>';
    }

    playV8SFX('happiness_up');
    document.getElementById('happy-panel').classList.add('show');
}

// ===================== CAMPAIGN SCENARIOS =====================
var CAMPAIGNS = [
    { id:'camp_village', icon:'🏕', name:'마을 세우기', desc:'작은 마을을 건설해보세요!', goal:'건물 5개 건설', checkFn: function() { return (typeof buildCount !== 'undefined') && buildCount >= 5; }, reward:'금 +50' },
    { id:'camp_food', icon:'🌾', name:'식량 확보', desc:'백성들을 먹여 살리세요!', goal:'식량 200 달성', checkFn: function() { return (typeof resources !== 'undefined') && resources.food >= 200; }, reward:'문화 +30' },
    { id:'camp_culture', icon:'🎭', name:'문화 도시', desc:'문화가 꽃피는 도시를 만드세요!', goal:'문화 150 달성', checkFn: function() { return (typeof resources !== 'undefined') && resources.culture >= 150; }, reward:'금 +100' },
    { id:'camp_defense', icon:'🛡', name:'철벽 방어', desc:'도시를 철통같이 지키세요!', goal:'방어력 30 이상', checkFn: function() { return getDefenseRating() >= 30; }, reward:'행복 +20' },
    { id:'camp_trade', icon:'🚢', name:'무역의 왕', desc:'교역로를 넓히세요!', goal:'교역 3개 활성화', checkFn: function() { return typeof window.v7ActiveTradeRoutes !== 'undefined' && window.v7ActiveTradeRoutes.size >= 3; }, reward:'금 +150' },
    { id:'camp_pop', icon:'👥', name:'인구 대국', desc:'많은 백성이 사는 도시를 만드세요!', goal:'인구 300 달성', checkFn: function() { return (typeof resources !== 'undefined') && resources.pop >= 300; }, reward:'문화 +50' },
    { id:'camp_era', icon:'🚂', name:'시대 정복', desc:'근대까지 발전시키세요!', goal:'근대 시대 도달', checkFn: function() { return (typeof currentEra !== 'undefined') && currentEra >= 4; }, reward:'금 +200' },
    { id:'camp_ultimate', icon:'👑', name:'최종 도전', desc:'모든 것을 갖춘 위대한 도시!', goal:'인구500+문화300+금3000', checkFn: function() { var r = (typeof resources !== 'undefined') ? resources : {}; return (r.pop >= 500) && (r.culture >= 300) && (r.gold >= 3000); }, reward:'전설의 도시주!' }
];

var completedCampaigns = new Set();
try {
    var savedCamp = localStorage.getItem('cityCamp_v8');
    if(savedCamp) completedCampaigns = new Set(JSON.parse(savedCamp));
} catch(e){}

function saveCampaigns() {
    try { localStorage.setItem('cityCamp_v8', JSON.stringify(Array.from(completedCampaigns))); } catch(e){}
}

function checkCampaigns() {
    var newlyCompleted = false;
    CAMPAIGNS.forEach(function(c) {
        if(!completedCampaigns.has(c.id) && c.checkFn()) {
            completedCampaigns.add(c.id);
            newlyCompleted = true;
            if(typeof toast === 'function') toast('🏆 시나리오 완료: ' + c.name + '! (' + c.reward + ')');
            if(typeof addChronicle === 'function') addChronicle(c.icon, '시나리오 "' + c.name + '" 완료! ' + c.reward);
            playV8SFX('campaign_complete');

            if(c.reward.indexOf('금') >= 0) {
                var goldMatch = c.reward.match(/금 \+(\d+)/);
                if(goldMatch && typeof resources !== 'undefined') resources.gold += parseInt(goldMatch[1]);
            }
            if(c.reward.indexOf('문화') >= 0) {
                var culMatch = c.reward.match(/문화 \+(\d+)/);
                if(culMatch && typeof resources !== 'undefined') resources.culture += parseInt(culMatch[1]);
            }
            if(c.reward.indexOf('행복') >= 0) {
                var hapMatch = c.reward.match(/행복 \+(\d+)/);
                if(hapMatch && typeof resources !== 'undefined') resources.happy = Math.min(100, resources.happy + parseInt(hapMatch[1]));
            }
        }
    });
    if(newlyCompleted) {
        saveCampaigns();
        if(typeof updateHUD === 'function') updateHUD();
        if(typeof checkAchievements === 'function') checkAchievements();
    }
}

function getCampaignProgress(c) {
    if(completedCampaigns.has(c.id)) return 100;
    switch(c.id) {
        case 'camp_village': return Math.min(100, ((typeof buildCount !== 'undefined' ? buildCount : 0) / 5) * 100);
        case 'camp_food': return Math.min(100, ((typeof resources !== 'undefined' ? resources.food : 0) / 200) * 100);
        case 'camp_culture': return Math.min(100, ((typeof resources !== 'undefined' ? resources.culture : 0) / 150) * 100);
        case 'camp_defense': return Math.min(100, (getDefenseRating() / 30) * 100);
        case 'camp_trade': return Math.min(100, ((typeof window.v7ActiveTradeRoutes !== 'undefined' ? window.v7ActiveTradeRoutes.size : 0) / 3) * 100);
        case 'camp_pop': return Math.min(100, ((typeof resources !== 'undefined' ? resources.pop : 0) / 300) * 100);
        case 'camp_era': return Math.min(100, ((typeof currentEra !== 'undefined' ? currentEra : 0) / 4) * 100);
        case 'camp_ultimate':
            var r = typeof resources !== 'undefined' ? resources : { pop:0, culture:0, gold:0 };
            return Math.min(100, ((Math.min(r.pop, 500) / 500 + Math.min(r.culture, 300) / 300 + Math.min(r.gold, 3000) / 3000) / 3) * 100);
        default: return 0;
    }
}

function showCampaign() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('campaign-list');
    if(!list) return;
    list.innerHTML = '';
    document.getElementById('campaign-progress').textContent = '완료: ' + completedCampaigns.size + ' / ' + CAMPAIGNS.length;

    CAMPAIGNS.forEach(function(c) {
        var done = completedCampaigns.has(c.id);
        var prog = Math.round(getCampaignProgress(c));
        var div = document.createElement('div');
        div.className = 'camp-item' + (done ? ' completed' : '');
        div.innerHTML = '<div class="ci-header"><div class="ci-icon">' + c.icon + '</div><div class="ci-name">' + c.name + '</div><div class="ci-badge">' + (done ? '✅' : '') + '</div></div>' +
            '<div class="ci-desc">' + c.desc + '</div>' +
            '<div class="ci-goal">목표: ' + c.goal + '</div>' +
            (done ? '' : '<div class="ci-progress"><div class="ci-progress-fill" style="width:' + prog + '%"></div></div>') +
            '<div class="ci-reward">보상: ' + c.reward + '</div>';
        list.appendChild(div);
    });

    playV8SFX('analytics_open');
    document.getElementById('campaign-panel').classList.add('show');
}

// ===================== QUIZ +15 (55→70) =====================
var V8_QUIZ_QUESTIONS = [
    { q:'고조선의 주요 교통수단은?', o:['말','소달구지','도보','배'], a:0, e:'고조선에서는 말이 주요 교통수단이었어요. 단군 설화에도 말이 등장하며, 북방 유목 문화의 영향을 받았어요.' },
    { q:'삼국시대 성벽을 쌓는 방법을 뭐라 할까요?', o:['축성술','관개술','야금술','목축술'], a:0, e:'축성술은 성벽을 쌓는 기술이에요. 고구려의 산성, 백제의 토성, 신라의 석성 등 다양한 축성 기법이 있었어요.' },
    { q:'고려시대 가장 유명한 축제는?', o:['연등회','풍년제','단오','백중'], a:0, e:'연등회(관등회)는 고려시대 가장 큰 축제 중 하나로, 음력 4월에 연등을 밝히며 부처님을 기렸어요.' },
    { q:'조선시대 과거 시험의 최고 등급은?', o:['장원','을과','병과','진사'], a:0, e:'장원급제는 과거 시험에서 1등을 하는 것이에요. 장원급제하면 왕이 직접 어사화(꽃)를 주었답니다.' },
    { q:'거북선의 가장 큰 특징은?', o:['철갑 지붕','돛 3개','바퀴','잠수 기능'], a:0, e:'거북선은 지붕을 철판이나 쇠못으로 덮어 적이 올라타지 못하게 한 것이 가장 큰 특징이에요.' },
    { q:'한국 최초의 철도는?', o:['경인선','경부선','호남선','경의선'], a:0, e:'1899년 개통된 경인선(서울~인천)이 한국 최초의 철도예요. 노량진~제물포(인천) 구간이었어요.' },
    { q:'고려시대 몽골 침입에 대항한 방법은?', o:['강화도 천도','해전','화약 공격','기병 돌격'], a:0, e:'고려는 몽골 침입 시 수도를 강화도로 옮겨 39년간 항전했어요. 바다를 건널 수 없는 몽골군의 약점을 이용한 거예요.' },
    { q:'팔관회는 어느 나라의 축제일까요?', o:['고려','고조선','신라','조선'], a:0, e:'팔관회는 고려의 대표적 축제로, 토속 신앙과 불교가 합쳐진 국가적 행사였어요. 외국 사신도 초대했답니다.' },
    { q:'수원화성을 설계한 학자는?', o:['정약용','이황','이이','허준'], a:0, e:'정약용은 거중기를 발명해 수원화성 건설을 도왔어요. 과학 기술을 활용한 혁신적인 성곽이었죠.' },
    { q:'고구려의 군사 특기는?', o:['기마전','해전','공성전','화약전'], a:0, e:'고구려는 기마민족으로 말 위에서 활을 쏘는 기마전이 특기였어요. 광개토대왕도 기마군을 이끌고 영토를 넓혔죠.' },
    { q:'조선시대 봉수대의 역할은?', o:['적의 침입을 알림','날씨 관측','시간 알림','제사'], a:0, e:'봉수대는 낮에는 연기, 밤에는 불빛으로 적의 침입을 알리는 통신 시설이에요. 전국에 봉수 네트워크가 있었어요.' },
    { q:'신라의 화랑은 무엇을 했나요?', o:['무예 수련과 학문','농사','무역','건축'], a:0, e:'화랑은 젊은 남자들이 무예, 노래, 춤, 유교·불교를 배우며 호국 정신을 기르는 단체였어요. 세속오계를 지켰답니다.' },
    { q:'고려시대 벽란도는 어떤 곳이었나요?', o:['국제 무역항','궁궐','사원','학교'], a:0, e:'벽란도는 고려의 국제 무역항이에요. 아라비아, 중국, 일본 상인들이 와서 교역했고, Korea라는 이름도 여기서 시작됐어요.' },
    { q:'임진왜란에서 이순신 장군의 유명한 전투는?', o:['한산도대첩','살수대첩','황산벌전투','행주대첩'], a:0, e:'한산도대첩에서 이순신 장군은 학익진 전법으로 일본 수군을 크게 무찔렀어요. 임진왜란의 전세를 바꾼 전투예요.' },
    { q:'근대 한국 최초의 서양식 병원은?', o:['광혜원','세브란스','서울대병원','적십자병원'], a:0, e:'1885년 미국 의사 알렌이 세운 광혜원이 한국 최초의 서양식 병원이에요. 이후 세브란스 병원으로 이름이 바뀌었어요.' }
];

// ===================== ACHIEVEMENTS +12 (62→74) =====================
var V8_ACHIEVEMENTS = [
    { id:'road_builder', icon:'🛤', title:'도로 건설가', desc:'도로 5개를 건설했어요!',
      check: function() { return roadCount >= 5; } },
    { id:'road_master', icon:'🛣', title:'도로의 왕', desc:'도로 15개를 건설했어요!',
      check: function() { return roadCount >= 15; } },
    { id:'defender', icon:'🛡', title:'수비대장', desc:'방어력 20 이상 달성!',
      check: function() { return getDefenseRating() >= 20; } },
    { id:'fortress_city', icon:'🏰', title:'난공불락', desc:'방어력 50 이상 달성!',
      check: function() { return getDefenseRating() >= 50; } },
    { id:'festival_host', icon:'🏮', title:'축제 주최자', desc:'첫 축제를 열었어요!',
      check: function() { return festivalState.count >= 1; } },
    { id:'festival_veteran', icon:'🎋', title:'축제의 달인', desc:'축제 5회 이상 참여!',
      check: function() { return festivalState.count >= 5; } },
    { id:'campaign_first', icon:'📋', title:'첫 시나리오', desc:'시나리오 1개를 완료했어요!',
      check: function() { return completedCampaigns.size >= 1; } },
    { id:'campaign_master', icon:'👑', title:'시나리오 마스터', desc:'시나리오 5개 이상 완료!',
      check: function() { return completedCampaigns.size >= 5; } },
    { id:'happy_citizens', icon:'😊', title:'행복한 백성', desc:'만족도 전부 50% 이상!',
      check: function() { return calcHappinessIndicators().every(function(i) { return i.val >= 50; }); } },
    { id:'analytics_viewer', icon:'📊', title:'통계 분석가', desc:'도시 통계를 확인했어요!',
      check: function() { return v8AnalyticsViewed; } },
    { id:'transport_king', icon:'🚂', title:'교통왕', desc:'도로 20개+교역 3개 달성!',
      check: function() { return roadCount >= 20 && (typeof window.v7ActiveTradeRoutes !== 'undefined' ? window.v7ActiveTradeRoutes.size >= 3 : false); } },
    { id:'ultimate_city', icon:'🌟', title:'전설의 도시', desc:'인구500+문화300+금3000!',
      check: function() { var r = typeof resources !== 'undefined' ? resources : {}; return (r.pop >= 500) && (r.culture >= 300) && (r.gold >= 3000); } }
];

var v8AnalyticsViewed = false;
try {
    if(localStorage.getItem('cityAnalytics_v8') === '1') v8AnalyticsViewed = true;
} catch(e){}

// ===================== ADVISOR TIPS =====================
var V8_ADVISOR_TIPS = [
    '💡 도로를 건설하면 주변 건물의 생산량이 올라가요! (키보드 O)',
    '💡 방어 건물을 지으면 재해 피해를 줄일 수 있어요! (키보드 M)',
    '💡 축제가 열리면 자원 보너스를 받아요. 계절을 잘 활용하세요! (키보드 F)',
    '💡 주민 만족도가 낮아지지 않도록 균형있게 도시를 발전시키세요! (키보드 H)',
    '💡 시나리오를 완료하면 보상을 받을 수 있어요! (키보드 N)',
    '💡 관등회(봄), 단오(여름), 추석(가을), 팔관회(겨울) — 4계절 축제를 만나보세요!',
    '💡 수원화성은 방어력 +10으로 가장 강력한 방어 건물이에요.',
    '💡 포장도로는 인접 건물 생산을 15%나 올려줘요!',
    '💡 모든 시나리오를 완료하면 시나리오 마스터 업적을 달성해요.',
    '💡 도로 건설은 비용이 적지만 효과는 아주 커요. 많이 지어보세요!'
];

// ===================== UI CREATION =====================
function addV8UI() {
    var btns = [
        { id:'transport-btn', title:'교통 인프라', text:'🛤', onclick: showTransport },
        { id:'military-btn', title:'군사 방어', text:'🛡', onclick: showMilitary },
        { id:'festival-btn', title:'축제', text:'🎪', onclick: showFestival },
        { id:'happy-btn', title:'주민 만족도', text:'😊', onclick: showHappiness },
        { id:'campaign-btn', title:'시나리오 캠페인', text:'📋', onclick: showCampaign }
    ];
    btns.forEach(function(b) {
        var el = document.createElement('button');
        el.id = b.id;
        el.title = b.title;
        el.setAttribute('aria-label', b.title);
        el.textContent = b.text;
        el.onclick = b.onclick;
        document.body.appendChild(el);
    });

    var panels = [
        { id:'transport-panel', label:'교통 인프라', inner:'<div id="transport-box"><h2>🛤 교통 인프라</h2><div class="road-stat" id="road-stat"></div><div id="transport-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#4090e0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'transport-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'military-panel', label:'군사 방어', inner:'<div id="military-box"><h2>🛡 군사 방어</h2><div class="mil-stat-grid" id="mil-stats"></div><div id="mil-units"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#e06040;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'military-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'festival-panel', label:'축제', inner:'<div id="festival-box"><h2>🎪 축제</h2><div id="festival-list"></div><div class="fest-history" id="fest-history"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#e0a000;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'festival-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'happy-panel', label:'주민 만족도', inner:'<div id="happy-box"><h2>😊 주민 만족도</h2><div id="happy-list"></div><div class="happy-summary" id="happy-summary"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#40c070;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'happy-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'campaign-panel', label:'시나리오 캠페인', inner:'<div id="campaign-box"><h2>📋 시나리오 캠페인</h2><div class="campaign-progress-text" id="campaign-progress"></div><div id="campaign-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#8060c0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'campaign-panel\').classList.remove(\'show\')">닫기</button></div>' }
    ];
    panels.forEach(function(p) {
        var el = document.createElement('div');
        el.id = p.id;
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', p.label);
        el.innerHTML = p.inner;
        el.onclick = function(e) { if(e.target.id === p.id) el.classList.remove('show'); };
        document.body.appendChild(el);
    });
}

// ===================== HOOKS =====================
function hookV8RecalcRates() {
    var prev = window.recalcRates;
    if(!prev) return;
    window.recalcRates = function() {
        prev();
        var rb = getRoadBonus();
        if(rb > 0 && typeof rates !== 'undefined') {
            rates.food = Math.floor(rates.food * (1 + rb));
            rates.gold = Math.floor(rates.gold * (1 + rb));
            rates.culture = Math.floor(rates.culture * (1 + rb));
        }
    };
}

function hookV8GameTick() {
    var prev = window.gameTick;
    if(!prev) return;
    window.gameTick = function() {
        prev();
        if(typeof speed !== 'undefined' && speed === 0) return;
        tickFestival();
        checkCampaigns();
        checkHappinessWarning();
    };
}

function hookV8Disaster() {
    var prevTrigger = window.triggerDisaster;
    if(!prevTrigger) return;
    window.triggerDisaster = function() {
        var reduction = getDefenseReduction();
        if(reduction > 0 && typeof resources !== 'undefined') {
            var savedFood = Math.floor(resources.food * reduction);
            var savedGold = Math.floor(resources.gold * reduction);
            var savedPop = Math.floor(resources.pop * reduction * 0.3);

            prevTrigger();

            resources.food = Math.max(0, resources.food + savedFood);
            resources.gold = Math.max(0, resources.gold + savedGold);
            resources.pop = Math.max(10, resources.pop + savedPop);

            if(reduction > 0.1) {
                if(typeof toast === 'function') toast('🛡 방어력으로 피해 ' + Math.round(reduction * 100) + '% 경감!');
            }
        } else {
            prevTrigger();
        }
    };
}

function hookV8CheckAchievements() {
    var prev = window.checkAchievements;
    if(!prev) return;
    window.checkAchievements = function() {
        prev();
        V8_ACHIEVEMENTS.forEach(function(ach) {
            if(typeof unlockedAchievements !== 'undefined' && !unlockedAchievements.has(ach.id) && ach.check()) {
                unlockedAchievements.add(ach.id);
                var el = document.createElement('div');
                el.className = 'ach-toast';
                el.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + ach.icon + ' ' + ach.title + '</div><div class="a-desc">' + ach.desc + '</div>';
                document.body.appendChild(el);
                setTimeout(function() { el.remove(); }, 4500);
                if(typeof playAchSound === 'function') playAchSound();
                else if(typeof playAchievementSound === 'function') playAchievementSound();
            }
        });
    };
}

function hookV8ShowAchievements() {
    var prev = window.showAchievements;
    if(!prev) return;
    window.showAchievements = function() {
        prev();
        var listEl = document.getElementById('ach-list');
        if(!listEl) return;
        var sep = document.createElement('div');
        sep.style.cssText = 'text-align:center;color:#80d0ff;font-size:12px;margin:12px 0 8px;padding-top:8px;border-top:1px solid rgba(128,208,255,0.3);';
        sep.textContent = '— v8.0 🛤 교통·군사·축제·시나리오 —';
        listEl.appendChild(sep);
        V8_ACHIEVEMENTS.forEach(function(ach) {
            var unlocked = (typeof unlockedAchievements !== 'undefined') && unlockedAchievements.has(ach.id);
            var div = document.createElement('div');
            div.className = 'ach-item' + (unlocked ? ' unlocked' : '');
            div.innerHTML = '<div class="ai-icon">' + ach.icon + '</div><div class="ai-info"><div class="ai-title">' + ach.title + '</div><div class="ai-desc">' + ach.desc + '</div></div>';
            listEl.appendChild(div);
        });
    };
}

function hookV8Quiz() {
    if(!window.QUIZ_QUESTIONS) return;
    V8_QUIZ_QUESTIONS.forEach(function(q) {
        var exists = false;
        for(var i = 0; i < window.QUIZ_QUESTIONS.length; i++) {
            if(window.QUIZ_QUESTIONS[i].q === q.q) { exists = true; break; }
        }
        if(!exists) window.QUIZ_QUESTIONS.push(q);
    });
}

function hookV8AdvisorTips() {
    if(window.V5_ADVISOR_TIPS) {
        V8_ADVISOR_TIPS.forEach(function(tip) {
            if(window.V5_ADVISOR_TIPS.indexOf(tip) === -1) window.V5_ADVISOR_TIPS.push(tip);
        });
    }
}

function hookV8AutoSave() {
    var prev = window.autoSave;
    if(!prev) return;
    window.autoSave = function() {
        prev();
        try {
            localStorage.setItem('cityRoads_v8', JSON.stringify({ count: roadCount, grid: roadGrid }));
            localStorage.setItem('cityFest_v8', JSON.stringify(festivalState));
            localStorage.setItem('cityCamp_v8', JSON.stringify(Array.from(completedCampaigns)));
            if(v8AnalyticsViewed) localStorage.setItem('cityAnalytics_v8', '1');
        } catch(e){}
    };
}

function hookV8ShowVictory() {
    var prev = window.showVictory;
    if(!prev) return;
    window.showVictory = function() {
        prev();
        var vStats = document.getElementById('v-stats');
        if(vStats) {
            vStats.innerHTML += '<p>🛤 도로: ' + roadCount + '개</p>';
            vStats.innerHTML += '<p>🛡 방어력: ' + getDefenseRating() + '</p>';
            vStats.innerHTML += '<p>🎪 축제: ' + festivalState.count + '회</p>';
            vStats.innerHTML += '<p>📋 시나리오: ' + completedCampaigns.size + '/' + CAMPAIGNS.length + '</p>';
        }
    };
}

function hookV8Keyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return;
        var panels = ['transport-panel','military-panel','festival-panel','happy-panel','campaign-panel',
                       'diplo-panel','policy-panel','wonder-panel','trade-panel','share-panel'];
        var anyOpen = panels.some(function(pid) {
            var el = document.getElementById(pid);
            return el && el.classList.contains('show');
        });
        if(anyOpen) return;

        switch(e.key.toLowerCase()) {
            case 'o': showTransport(); break;
            case 'm': showMilitary(); break;
            case 'f': showFestival(); break;
            case 'h': showHappiness(); break;
            case 'n': showCampaign(); break;
        }
    });
}

// ===================== INITIALIZATION =====================
function initV8() {
    addV8UI();
    hookV8RecalcRates();
    hookV8GameTick();
    hookV8Disaster();
    hookV8CheckAchievements();
    hookV8ShowAchievements();
    hookV8ShowVictory();
    hookV8Quiz();
    hookV8AdvisorTips();
    hookV8AutoSave();
    hookV8Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🛤 v8.0: 교통 + 군사 + 축제 + 만족도 + 캠페인!');
        }, 5000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV8, 1200); });
} else {
    setTimeout(initV8, 1200);
}

})();
