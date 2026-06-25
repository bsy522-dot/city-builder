// =====================================================================
// city-builder v13_patch.js — PRIME Holdings NEXTERA+PRISM v13.0
// Self-contained IIFE patch: Dynasty Succession Canvas 6 dynasties,
// Korean Inventions Museum 12 interactive Canvas exhibits,
// Trade Route Visualizer Canvas animated flow,
// Population Demographics Canvas line+pie chart,
// Cultural Influence Map Canvas zone rendering,
// Historical Timeline Canvas 12+ events,
// Archery Mini-game Canvas interactive targeting,
// City Upgrade Tree Canvas 12 node tech tree,
// +15 Quiz (130→145), +12 Achievements (122→134),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v13Ctx = null;
function getV13Audio() {
    if(!v13Ctx) {
        try { v13Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v13Ctx;
}
function playV13SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV13Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'dynasty_open':
            [262,330,392,523].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'dynasty_advance':
            [392,494,588,784,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.11, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'invention_discover':
            [523,659,784,1047,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.2);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.2);
            });
            break;
        case 'trade_route':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(440, now+0.12);
            o.frequency.linearRampToValueAtTime(550, now+0.24);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'population_view':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(400, now);
            o.frequency.linearRampToValueAtTime(520, now+0.15);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'culture_map':
            [349,440,523,659].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.11);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.11);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.11+0.25);
                oo.connect(gg); oo.start(now+i*0.11); oo.stop(now+i*0.11+0.25);
            });
            break;
        case 'timeline_view':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.2);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'archery_shoot':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(800, now);
            o.frequency.exponentialRampToValueAtTime(200, now+0.15);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'archery_hit':
            [660,880,1100].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.12, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.15);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.15);
            });
            break;
        case 'upgrade_unlock':
            [330,392,494,588,660,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'quiz_v13':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(659, now);
            o.frequency.linearRampToValueAtTime(880, now+0.1);
            o.frequency.linearRampToValueAtTime(1047, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'achieve_v13':
            [440,554,659,880,659,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.22);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.22);
            });
            break;
    }
}

// ===================== CSS =====================
var v13Style = document.createElement('style');
v13Style.textContent = '\
.v13-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.78); z-index: 2100; display: flex; justify-content: center; align-items: center; animation: v13fadeIn 0.3s; overflow-y: auto; padding: 16px; }\
@keyframes v13fadeIn { from { opacity: 0; } to { opacity: 1; } }\
.v13-box { background: linear-gradient(145deg, #1c2235, #0e1422); border: 2px solid #6688cc; border-radius: 16px; padding: 20px; width: 94%; max-width: 560px; max-height: 86vh; overflow-y: auto; position: relative; box-shadow: 0 8px 36px rgba(0,0,0,0.65); }\
.v13-box h2 { text-align: center; margin-bottom: 14px; font-size: 18px; }\
.v13-close { position: absolute; top: 10px; right: 14px; background: #6688cc; border: none; color: #fff; font-size: 18px; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; z-index: 5; }\
.v13-close:hover { opacity: 0.8; }\
.v13-section { margin-bottom: 14px; }\
.v13-section h3 { font-size: 14px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.1); }\
.v13-card { padding: 10px 14px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(102,136,204,0.2); cursor: pointer; transition: all 0.2s; }\
.v13-card:hover { background: rgba(102,136,204,0.1); }\
.v13-card-title { font-weight: bold; font-size: 13px; color: #99bbee; }\
.v13-card-desc { font-size: 11px; color: #999; margin-top: 2px; }\
.v13-btn { padding: 7px 16px; background: #6688cc; border: none; color: #fff; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold; transition: background 0.2s; }\
.v13-btn:hover { background: #7799dd; }\
.v13-btn:disabled { opacity: 0.4; cursor: default; }\
.v13-canvas { width: 100%; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; display: block; }\
.v13-grid { display: grid; gap: 6px; }\
.v13-grid-2 { grid-template-columns: 1fr 1fr; }\
.v13-grid-3 { grid-template-columns: 1fr 1fr 1fr; }\
.v13-stat { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }\
.v13-stat-val { color: #ffd700; font-weight: bold; }\
.v13-tag { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; margin: 2px; }\
#dynasty-panel .v13-box { border-color: #cc8844; background: linear-gradient(145deg, #2a1e10, #1a1008); }\
#dynasty-panel h2 { color: #ffcc66; }\
#dynasty-panel .v13-close { background: #cc8844; }\
#invention-panel .v13-box { border-color: #44aa88; background: linear-gradient(145deg, #102820, #082018); }\
#invention-panel h2 { color: #66ddaa; }\
#invention-panel .v13-close { background: #44aa88; }\
#traderoute-panel .v13-box { border-color: #aa6644; background: linear-gradient(145deg, #2a1a12, #1a0e06); }\
#traderoute-panel h2 { color: #dd8866; }\
#traderoute-panel .v13-close { background: #aa6644; }\
#popgraph-panel .v13-box { border-color: #4488aa; background: linear-gradient(145deg, #102030, #081420); }\
#popgraph-panel h2 { color: #66aacc; }\
#popgraph-panel .v13-close { background: #4488aa; }\
#culturemap-panel .v13-box { border-color: #8866aa; background: linear-gradient(145deg, #201828, #140e1e); }\
#culturemap-panel h2 { color: #aa88cc; }\
#culturemap-panel .v13-close { background: #8866aa; }\
#timeline-panel .v13-box { border-color: #aa8844; background: linear-gradient(145deg, #2a2010, #1a1408); }\
#timeline-panel h2 { color: #ddaa66; }\
#timeline-panel .v13-close { background: #aa8844; }\
#archery-panel .v13-box { border-color: #cc4444; background: linear-gradient(145deg, #2a1212, #1a0808); }\
#archery-panel h2 { color: #ff6666; }\
#archery-panel .v13-close { background: #cc4444; }\
#upgrade-panel .v13-box { border-color: #44aa44; background: linear-gradient(145deg, #102810, #082008); }\
#upgrade-panel h2 { color: #66dd66; }\
#upgrade-panel .v13-close { background: #44aa44; }\
.v13-dynasty-card { padding: 12px 14px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(204,136,68,0.3); transition: all 0.2s; }\
.v13-dynasty-card.active { border-color: #ffd700; background: rgba(255,215,0,0.08); box-shadow: 0 0 12px rgba(255,215,0,0.2); }\
.v13-dynasty-card.locked { opacity: 0.5; }\
.v13-inv-card { padding: 14px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(68,170,136,0.3); cursor: pointer; transition: all 0.2s; }\
.v13-inv-card:hover { background: rgba(68,170,136,0.1); }\
.v13-inv-card.discovered { border-color: #66ddaa; background: rgba(102,221,170,0.06); }\
.v13-inv-icon { font-size: 32px; display: inline-block; margin-right: 10px; vertical-align: middle; }\
.v13-inv-name { font-weight: bold; color: #66ddaa; font-size: 14px; }\
.v13-inv-era { font-size: 10px; color: #44aa88; }\
.v13-inv-desc { font-size: 11px; color: #aaa; margin-top: 4px; line-height: 1.5; }\
.v13-archery-canvas { width: 100%; height: 320px; border-radius: 12px; background: #0a1a0a; margin-bottom: 10px; cursor: crosshair; display: block; }\
.v13-score-bar { display: flex; justify-content: space-between; padding: 6px 12px; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 8px; font-size: 13px; }\
.v13-score-val { color: #ffd700; font-weight: bold; }\
.v13-upgrade-node { padding: 10px 12px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(68,170,68,0.2); display: flex; align-items: center; gap: 10px; transition: all 0.2s; }\
.v13-upgrade-node.unlocked { border-color: #66dd66; background: rgba(102,221,102,0.06); }\
.v13-upgrade-node.available { cursor: pointer; border-color: #ffd700; }\
.v13-upgrade-node.available:hover { background: rgba(255,215,0,0.08); }\
.v13-upgrade-icon { font-size: 24px; }\
.v13-upgrade-info { flex: 1; }\
.v13-upgrade-name { font-weight: bold; font-size: 12px; color: #66dd66; }\
.v13-upgrade-cost { font-size: 10px; color: #ffcc66; }\
.v13-upgrade-desc { font-size: 10px; color: #999; margin-top: 2px; }\
.v13-scroll-nav { position: fixed; bottom: 70px; left: 0; right: 0; z-index: 12; display: flex; overflow-x: auto; gap: 4px; padding: 4px 8px; scrollbar-width: none; }\
.v13-scroll-nav::-webkit-scrollbar { display: none; }\
.v13-nav-btn { flex-shrink: 0; padding: 5px 10px; background: rgba(26,34,53,0.92); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; color: #ccc; font-size: 11px; cursor: pointer; white-space: nowrap; transition: all 0.2s; }\
.v13-nav-btn:hover { border-color: #6688cc; color: #fff; background: rgba(102,136,204,0.2); }\
';
document.head.appendChild(v13Style);

// ===================== STATE =====================
var v13State = {
    dynasty: 0,
    inventionsDiscovered: [],
    tradeRoutes: [],
    popHistory: [],
    archeryHighScore: 0,
    upgrades: [],
    featureUsed: {}
};

try {
    var saved = localStorage.getItem('cityV13State');
    if(saved) {
        var parsed = JSON.parse(saved);
        for(var k in parsed) { if(v13State.hasOwnProperty(k)) v13State[k] = parsed[k]; }
    }
} catch(e){}

function saveV13() {
    try { localStorage.setItem('cityV13State', JSON.stringify(v13State)); } catch(e){}
}

function markV13Feature(id) {
    if(!v13State.featureUsed[id]) {
        v13State.featureUsed[id] = true;
        saveV13();
        if(typeof checkAchievements === 'function') checkAchievements();
    }
}

// ===================== DATA =====================

var DYNASTIES = [
    { id: 'gojoseon', icon: '🏛️', name: '고조선 왕조', era: '기원전 2333~108년', leader: '단군왕검', bonus: '식량 생산 +15%', desc: '한민족 최초의 국가. 8조법금으로 사회질서를 세우고 청동기 문명을 꽃피웠습니다.', bonusFn: function(r){ r.foodRate = (r.foodRate||0) + 15; } },
    { id: 'goguryeo', icon: '⚔️', name: '고구려 왕조', era: '기원전 37~668년', leader: '주몽/광개토대왕', bonus: '방어력 +20%, 군사 +10', desc: '동북아의 강대국. 광개토대왕의 정복전쟁과 을지문덕의 살수대첩으로 유명합니다.', bonusFn: function(r){ r.defenseRate = (r.defenseRate||0) + 20; } },
    { id: 'goryeo', icon: '🏺', name: '고려 왕조', era: '918~1392년', leader: '왕건/세종', bonus: '문화 +20%, 교역 +10%', desc: '청자와 팔만대장경의 나라. 국제무역과 문화 융합으로 고려의 이름이 세계에 알려졌습니다.', bonusFn: function(r){ r.cultureRate = (r.cultureRate||0) + 20; } },
    { id: 'joseon_early', icon: '📚', name: '조선 전기 왕조', era: '1392~1592년', leader: '이성계/세종대왕', bonus: '문화 +15%, 행복 +10', desc: '한글 창제, 측우기 발명. 유교 질서 확립과 과학 기술의 황금기.', bonusFn: function(r){ r.cultureRate = (r.cultureRate||0) + 15; } },
    { id: 'joseon_late', icon: '🏯', name: '조선 후기 왕조', era: '1592~1897년', leader: '이순신/정약용', bonus: '방어 +15%, 건설 +10%', desc: '임진왜란의 극복과 실학의 발전. 수원화성 건설과 실용 학문의 시대.', bonusFn: function(r){ r.defenseRate = (r.defenseRate||0) + 15; } },
    { id: 'modern', icon: '🌅', name: '근대 개혁 왕조', era: '1897~현재', leader: '고종/독립운동가', bonus: '모든 수입 +10%', desc: '대한제국 선포와 근대화. 독립운동과 산업화를 거쳐 현대 한국으로.', bonusFn: function(r){ r.allRate = (r.allRate||0) + 10; } }
];

var INVENTIONS = [
    { id: 'inv_bronze', icon: '🗡️', name: '비파형 동검', era: '고조선', year: '기원전 8세기', desc: '한반도 고유의 청동 무기. 만주와 한반도에서만 발견되는 독특한 형태로, 고조선의 세력 범위를 보여줍니다.', reward: { gold: 80, culture: 5 } },
    { id: 'inv_ondol', icon: '🔥', name: '온돌', era: '고구려', year: '1세기경', desc: '바닥 난방 시스템의 원형. 고구려 시대부터 발전하여 한국 건축의 핵심이 된 세계적 발명품입니다.', reward: { gold: 100, happy: 8 } },
    { id: 'inv_celadon', icon: '🏺', name: '상감청자', era: '고려', year: '12세기', desc: '고려만의 독창적 상감기법. 흙을 파내고 다른 색 흙을 채워 문양을 만드는 세계 유일의 도자 기술.', reward: { gold: 120, culture: 12 } },
    { id: 'inv_tripitaka', icon: '📚', name: '팔만대장경', era: '고려', year: '1251년', desc: '8만여 장의 목판에 새긴 불교 경전. 13세기에 만들어져 800년간 보존된 세계기록유산.', reward: { gold: 150, culture: 15 } },
    { id: 'inv_metal_type', icon: '🔤', name: '금속활자', era: '고려', year: '1234년', desc: '세계 최초의 금속활자 인쇄. 구텐베르크보다 200년 앞선 인쇄 혁명의 시작.', reward: { gold: 200, culture: 20 } },
    { id: 'inv_hangul', icon: '🔠', name: '훈민정음(한글)', era: '조선', year: '1443년', desc: '세종대왕이 창제한 과학적 문자 체계. &quot;슬기로운 백성을 가르치는 바른 소리&quot;라는 뜻.', reward: { gold: 250, culture: 25 } },
    { id: 'inv_rain_gauge', icon: '🌧️', name: '측우기', era: '조선', year: '1441년', desc: '세계 최초의 표준화된 강우량 측정기. 서양보다 200년 앞선 기상 관측 장비.', reward: { gold: 120, culture: 10 } },
    { id: 'inv_sundial', icon: '☀️', name: '앙부일구', era: '조선', year: '1434년', desc: '오목한 반구형 해시계. 시간과 절기를 동시에 알 수 있는 정밀 과학 기구.', reward: { gold: 100, culture: 8 } },
    { id: 'inv_turtle_ship', icon: '🐢', name: '거북선', era: '조선', year: '1592년', desc: '이순신 장군의 철갑 전투선. 세계 최초의 장갑함으로 임진왜란의 해전을 승리로 이끌었습니다.', reward: { gold: 180, culture: 12 } },
    { id: 'inv_hwaseong', icon: '🧱', name: '수원화성(거중기)', era: '조선', year: '1796년', desc: '정약용이 설계한 거중기로 건설. 동서양 축성술을 융합한 세계문화유산.', reward: { gold: 160, culture: 15 } },
    { id: 'inv_jikji', icon: '📖', name: '직지심체요절', era: '고려', year: '1377년', desc: '현존 세계 최고의 금속활자 인쇄본. 유네스코 세계기록유산 등재.', reward: { gold: 180, culture: 18 } },
    { id: 'inv_geobukseon', icon: '⚓', name: '판옥선', era: '조선', year: '16세기', desc: '조선 수군의 주력 전함. 이중 갑판 구조로 화포 운용에 최적화된 동아시아 최강 전함.', reward: { gold: 140, culture: 10 } }
];

var TRADE_ROUTES_DATA = [
    { id: 'silk_road', icon: '🐫', name: '비단길(서역로)', from: '고조선/고구려', to: '서역/중앙아시아', goods: '비단, 금, 옥', goldPerTurn: 8 },
    { id: 'sea_japan', icon: '⛵', name: '해상로(왜)', from: '한반도', to: '일본', goods: '도자기, 불경, 철기', goldPerTurn: 6 },
    { id: 'sea_china', icon: '🚢', name: '항로(중국)', from: '한반도', to: '중국 연안', goods: '인삼, 종이, 직물', goldPerTurn: 10 },
    { id: 'north_road', icon: '🐎', name: '북방로', from: '고구려/발해', to: '만주/몽골', goods: '모피, 말, 약재', goldPerTurn: 5 },
    { id: 'east_sea', icon: '🐟', name: '동해안 해로', from: '동해안', to: '울릉도/독도', goods: '해산물, 소금, 목재', goldPerTurn: 4 },
    { id: 'inland', icon: '🛤️', name: '내륙 교역로', from: '한양', to: '전국 시장', goods: '곡물, 직물, 도기', goldPerTurn: 7 },
    { id: 'goryeo_intl', icon: '🌍', name: '고려 국제 항로', from: '벽란도', to: '아라비아/동남아', goods: '고려청자, 인삼, 금', goldPerTurn: 12 },
    { id: 'joseon_envoy', icon: '📜', name: '조선 통신사로', from: '부산', to: '에도(일본)', goods: '학문, 문화, 서적', goldPerTurn: 5 }
];

var UPGRADE_TREE = [
    { id: 'up_irrigation', icon: '💧', name: '관개 수로 확장', desc: '식량 생산 +10%', cost: { gold: 100 }, effect: 'food_10', requires: [] },
    { id: 'up_smithing', icon: '⚒️', name: '제련술 발전', desc: '금 수입 +8%', cost: { gold: 120 }, effect: 'gold_8', requires: [] },
    { id: 'up_masonry', icon: '🧱', name: '석조 건축', desc: '건물 내구도 +15%', cost: { gold: 150 }, effect: 'durability_15', requires: ['up_irrigation'] },
    { id: 'up_education', icon: '📖', name: '교육 제도', desc: '문화 +12%', cost: { gold: 130 }, effect: 'culture_12', requires: ['up_smithing'] },
    { id: 'up_medicine', icon: '🏥', name: '의학 발전', desc: '행복도 +10, 재해피해 -10%', cost: { gold: 180 }, effect: 'happy_10', requires: ['up_education'] },
    { id: 'up_military', icon: '🗡️', name: '군사 훈련소', desc: '방어력 +15', cost: { gold: 200 }, effect: 'defense_15', requires: ['up_masonry'] },
    { id: 'up_trade', icon: '🏪', name: '시장 확대', desc: '교역 수입 +15%', cost: { gold: 160 }, effect: 'trade_15', requires: ['up_smithing'] },
    { id: 'up_printing', icon: '📜', name: '인쇄술', desc: '문화 +15%, 퀴즈 보상 +20%', cost: { gold: 220 }, effect: 'culture_15', requires: ['up_education'] },
    { id: 'up_naval', icon: '⚓', name: '조선술', desc: '해상 교역 +20%', cost: { gold: 250 }, effect: 'naval_20', requires: ['up_trade', 'up_military'] },
    { id: 'up_astronomy', icon: '🔭', name: '천문학', desc: '재해 예측 +25%, 문화 +8', cost: { gold: 200 }, effect: 'astronomy_25', requires: ['up_medicine'] },
    { id: 'up_architecture', icon: '🏯', name: '궁궐 건축', desc: '행복 +15, 문화 +10', cost: { gold: 300 }, effect: 'palace_bonus', requires: ['up_masonry', 'up_printing'] },
    { id: 'up_diplomacy', icon: '🤝', name: '외교 제도', desc: '모든 교역 +10%, 재해 -5%', cost: { gold: 280 }, effect: 'diplomacy_all', requires: ['up_naval', 'up_astronomy'] }
];

// ===================== QUIZ v13 (+15 questions) =====================
var V13_QUIZ = [
    { q: '세계 최초의 금속활자 인쇄물로 알려진 것은?', a: ['직지심체요절','삼국사기','삼국유사','훈민정음'], c: 0 },
    { q: '고조선의 건국 시조는 누구인가?', a: ['주몽','단군왕검','왕건','이성계'], c: 1 },
    { q: '세종대왕이 측우기를 발명한 년도는?', a: ['1392년','1443년','1441년','1592년'], c: 2 },
    { q: '거북선을 만든 장군은?', a: ['을지문덕','강감찬','이순신','김유신'], c: 2 },
    { q: '고려청자의 독특한 기법은?', a: ['분청기법','상감기법','백자기법','채색기법'], c: 1 },
    { q: '수원화성 건설에 사용된 기구는?', a: ['도르래','거중기','크레인','수차'], c: 1 },
    { q: '팔만대장경의 목판 수는 약 몇 장?', a: ['5만','6만','8만','10만'], c: 2 },
    { q: '한글의 원래 이름은?', a: ['훈민정음','언문','한자','정음'], c: 0 },
    { q: '고려의 국제 무역항은?', a: ['부산포','벽란도','제물포','마산포'], c: 1 },
    { q: '온돌이 처음 발전한 나라는?', a: ['신라','백제','고구려','가야'], c: 2 },
    { q: '앙부일구는 어떤 용도의 기구?', a: ['강우량 측정','시간 측정','풍향 측정','온도 측정'], c: 1 },
    { q: '판옥선의 특징으로 맞는 것은?', a: ['단일 갑판','이중 갑판','잠수 기능','범선 전용'], c: 1 },
    { q: '비파형 동검이 발견되는 지역은?', a: ['일본 열도','중국 남부','만주와 한반도','동남아시아'], c: 2 },
    { q: '고려 왕조의 건국자는?', a: ['궁예','왕건','견훤','이의민'], c: 1 },
    { q: '조선 통신사가 파견된 나라는?', a: ['중국','몽골','일본','류큐'], c: 2 }
];

// ===================== ACHIEVEMENTS v13 (+12) =====================
var V13_ACHIEVEMENTS = [
    { id: 'v13_dynasty_first', icon: '👑', title: '왕조의 시작', desc: '왕조 계승 시스템을 열어보았습니다' },
    { id: 'v13_dynasty_advance', icon: '🏰', title: '왕조 계승자', desc: '왕조를 한 단계 진행시켰습니다' },
    { id: 'v13_invention_1', icon: '💡', title: '첫 발명', desc: '발명품 1개를 발견했습니다' },
    { id: 'v13_invention_6', icon: '🔬', title: '발명 수집가', desc: '발명품 6개를 발견했습니다' },
    { id: 'v13_invention_all', icon: '🏆', title: '발명왕', desc: '모든 발명품을 발견했습니다' },
    { id: 'v13_trade_3', icon: '🚢', title: '무역상', desc: '교역로 3개를 개통했습니다' },
    { id: 'v13_trade_all', icon: '🌍', title: '무역 제국', desc: '모든 교역로를 개통했습니다' },
    { id: 'v13_archery_100', icon: '🎯', title: '명궁', desc: '활쏘기 100점 이상 달성' },
    { id: 'v13_archery_200', icon: '🏹', title: '신궁', desc: '활쏘기 200점 이상 달성' },
    { id: 'v13_upgrade_3', icon: '📈', title: '발전의 시작', desc: '업그레이드 3개를 해금했습니다' },
    { id: 'v13_upgrade_all', icon: '🌟', title: '만능 도시', desc: '모든 업그레이드를 해금했습니다' },
    { id: 'v13_explorer', icon: '🗺️', title: 'v13 탐험가', desc: 'v13의 모든 기능을 사용해봤습니다' }
];

// ===================== DYNASTY SUCCESSION =====================
function showDynastyPanel() {
    playV13SFX('dynasty_open');
    markV13Feature('dynasty');
    var el = document.getElementById('dynasty-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'dynasty-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var currentDyn = v13State.dynasty;
    var html = '<button class="v13-close" onclick="document.getElementById(\'dynasty-panel\').remove()">&times;</button>';
    html += '<h2>👑 왕조 계승 시스템</h2>';
    html += '<canvas id="dynasty-canvas" class="v13-canvas" width="520" height="200"></canvas>';
    html += '<div class="v13-section"><h3>왕조 목록 (현재: ' + DYNASTIES[currentDyn].name + ')</h3>';
    for(var i = 0; i < DYNASTIES.length; i++) {
        var d = DYNASTIES[i];
        var cls = i === currentDyn ? 'active' : (i < currentDyn ? '' : 'locked');
        html += '<div class="v13-dynasty-card ' + cls + '">';
        html += '<div style="display:flex;align-items:center;gap:10px;">';
        html += '<span style="font-size:28px;">' + d.icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:' + (i === currentDyn ? '#ffd700' : i < currentDyn ? '#cc8866' : '#666') + ';font-size:14px;">' + d.name + '</div>';
        html += '<div style="font-size:10px;color:#aa8855;">' + d.era + '</div>';
        html += '<div style="font-size:11px;color:#999;margin-top:2px;">' + d.desc + '</div>';
        html += '<div style="font-size:11px;margin-top:4px;"><span class="v13-tag" style="background:rgba(255,215,0,0.2);color:#ffd700;">지도자: ' + d.leader + '</span> <span class="v13-tag" style="background:rgba(76,175,80,0.2);color:#8f8;">' + d.bonus + '</span></div>';
        html += '</div></div></div>';
    }
    if(currentDyn < DYNASTIES.length - 1) {
        html += '<div style="text-align:center;margin-top:10px;"><button class="v13-btn" onclick="advanceDynasty()" style="background:#cc8844;padding:10px 24px;font-size:14px;">다음 왕조로 진행 (금 500 필요)</button></div>';
    } else {
        html += '<div style="text-align:center;margin-top:10px;color:#ffd700;font-size:13px;">🎉 최종 왕조에 도달했습니다!</div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawDynastyCanvas, 50);
}

function drawDynastyCanvas() {
    var c = document.getElementById('dynasty-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    var nodeW = 70, nodeH = 50, gap = (w - nodeW * DYNASTIES.length) / (DYNASTIES.length + 1);
    for(var i = 0; i < DYNASTIES.length; i++) {
        var x = gap + i * (nodeW + gap);
        var y = h/2 - nodeH/2;
        if(i < DYNASTIES.length - 1) {
            ctx.strokeStyle = i < v13State.dynasty ? '#cc8844' : '#333';
            ctx.lineWidth = 2;
            ctx.setLineDash(i < v13State.dynasty ? [] : [4, 4]);
            ctx.beginPath();
            ctx.moveTo(x + nodeW, h/2);
            ctx.lineTo(x + nodeW + gap, h/2);
            ctx.stroke();
            ctx.setLineDash([]);
            if(i < v13State.dynasty) {
                ctx.fillStyle = '#cc8844';
                ctx.beginPath();
                ctx.moveTo(x + nodeW + gap - 6, h/2 - 4);
                ctx.lineTo(x + nodeW + gap, h/2);
                ctx.lineTo(x + nodeW + gap - 6, h/2 + 4);
                ctx.fill();
            }
        }
        var grad = ctx.createLinearGradient(x, y, x, y + nodeH);
        if(i === v13State.dynasty) {
            grad.addColorStop(0, '#4a3520');
            grad.addColorStop(1, '#2a1a0a');
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
        } else if(i < v13State.dynasty) {
            grad.addColorStop(0, '#3a3020');
            grad.addColorStop(1, '#201808');
            ctx.strokeStyle = '#aa7744';
            ctx.lineWidth = 1;
        } else {
            grad.addColorStop(0, '#222');
            grad.addColorStop(1, '#111');
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, nodeW, nodeH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(DYNASTIES[i].icon, x + nodeW/2, y + 24);
        ctx.font = '9px sans-serif';
        ctx.fillStyle = i === v13State.dynasty ? '#ffd700' : i < v13State.dynasty ? '#aa8855' : '#555';
        ctx.fillText(DYNASTIES[i].name.replace(' 왕조',''), x + nodeW/2, y + nodeH - 5);
        if(i === v13State.dynasty) {
            ctx.fillStyle = '#ffd700';
            ctx.font = '10px sans-serif';
            ctx.fillText('▼ 현재', x + nodeW/2, y - 6);
        }
    }
}

function advanceDynasty() {
    if(typeof resources === 'undefined') return;
    if(resources.gold < 500) {
        if(typeof toast === 'function') toast('금이 부족합니다! (500 필요)');
        return;
    }
    if(v13State.dynasty >= DYNASTIES.length - 1) return;
    resources.gold -= 500;
    v13State.dynasty++;
    saveV13();
    playV13SFX('dynasty_advance');
    if(typeof toast === 'function') toast('👑 ' + DYNASTIES[v13State.dynasty].name + '으로 계승!');
    if(typeof addChronicle === 'function') addChronicle('👑', DYNASTIES[v13State.dynasty].name + ' 왕조로 계승되었습니다');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof checkAchievements === 'function') checkAchievements();
    document.getElementById('dynasty-panel').remove();
    showDynastyPanel();
}

// ===================== INVENTIONS MUSEUM =====================
function showInventionPanel() {
    playV13SFX('invention_discover');
    markV13Feature('invention');
    var el = document.getElementById('invention-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'invention-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var html = '<button class="v13-close" onclick="document.getElementById(\'invention-panel\').remove()">&times;</button>';
    html += '<h2>💡 한국 발명품 전시관</h2>';
    html += '<canvas id="invention-canvas" class="v13-canvas" width="520" height="180"></canvas>';
    html += '<div style="text-align:center;margin-bottom:10px;font-size:12px;color:#aaa;">발견: ' + v13State.inventionsDiscovered.length + ' / ' + INVENTIONS.length + '</div>';
    html += '<div class="v13-section">';
    for(var i = 0; i < INVENTIONS.length; i++) {
        var inv = INVENTIONS[i];
        var discovered = v13State.inventionsDiscovered.indexOf(inv.id) >= 0;
        html += '<div class="v13-inv-card ' + (discovered ? 'discovered' : '') + '" onclick="discoverInvention(' + i + ')">';
        html += '<span class="v13-inv-icon">' + (discovered ? inv.icon : '❓') + '</span>';
        html += '<span class="v13-inv-name">' + (discovered ? inv.name : '미발견 발명품') + '</span>';
        html += ' <span class="v13-inv-era">' + inv.era + ' (' + inv.year + ')</span>';
        if(discovered) {
            html += '<div class="v13-inv-desc">' + inv.desc + '</div>';
            html += '<div style="margin-top:4px;"><span class="v13-tag" style="background:rgba(255,215,0,0.2);color:#ffd700;">💰 +' + inv.reward.gold + '</span>';
            if(inv.reward.culture) html += ' <span class="v13-tag" style="background:rgba(136,102,204,0.2);color:#aa88cc;">🏛️ +' + inv.reward.culture + '</span>';
            if(inv.reward.happy) html += ' <span class="v13-tag" style="background:rgba(76,175,80,0.2);color:#8f8;">😊 +' + inv.reward.happy + '</span>';
            html += '</div>';
        } else {
            html += '<div class="v13-inv-desc" style="color:#666;">탭하여 발견하기 (금 50 필요)</div>';
        }
        html += '</div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawInventionCanvas, 50);
}

function drawInventionCanvas() {
    var c = document.getElementById('invention-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    var total = INVENTIONS.length;
    var found = v13State.inventionsDiscovered.length;
    var pct = found / total;
    ctx.fillStyle = '#44aa88';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('발명품 수집 진행률', w/2, 24);
    var barX = 40, barY = 40, barW = w - 80, barH = 24;
    ctx.fillStyle = '#1a3028';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 12);
    ctx.fill();
    if(pct > 0) {
        var grad = ctx.createLinearGradient(barX, 0, barX + barW * pct, 0);
        grad.addColorStop(0, '#44aa88');
        grad.addColorStop(1, '#66ddaa');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW * pct, barH, 12);
        ctx.fill();
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(found + ' / ' + total + ' (' + Math.round(pct * 100) + '%)', w/2, barY + 17);
    var eras = ['고조선', '고구려', '고려', '조선'];
    var eraColors = ['#cc8844', '#cc4444', '#4488cc', '#44aa44'];
    var eraCounts = [0, 0, 0, 0];
    var eraFound = [0, 0, 0, 0];
    for(var i = 0; i < INVENTIONS.length; i++) {
        var eIdx = eras.indexOf(INVENTIONS[i].era);
        if(eIdx < 0) eIdx = 3;
        eraCounts[eIdx]++;
        if(v13State.inventionsDiscovered.indexOf(INVENTIONS[i].id) >= 0) eraFound[eIdx]++;
    }
    var pieX = 100, pieY = 120, pieR = 40;
    var startAngle = -Math.PI / 2;
    for(var j = 0; j < eras.length; j++) {
        var angle = (eraCounts[j] / total) * Math.PI * 2;
        ctx.fillStyle = eraColors[j];
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(pieX, pieY);
        ctx.arc(pieX, pieY, pieR, startAngle, startAngle + angle);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        startAngle += angle;
    }
    var legendX = 200;
    for(var k = 0; k < eras.length; k++) {
        var ly = 85 + k * 20;
        ctx.fillStyle = eraColors[k];
        ctx.fillRect(legendX, ly, 12, 12);
        ctx.fillStyle = '#ccc';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(eras[k] + ': ' + eraFound[k] + '/' + eraCounts[k], legendX + 18, ly + 10);
    }
    ctx.textAlign = 'right';
    ctx.fillStyle = '#66ddaa';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('총 보상 금: ' + v13State.inventionsDiscovered.reduce(function(sum, id) {
        var inv = INVENTIONS.find(function(x) { return x.id === id; });
        return sum + (inv ? inv.reward.gold : 0);
    }, 0), w - 40, 100);
    ctx.fillText('총 보상 문화: ' + v13State.inventionsDiscovered.reduce(function(sum, id) {
        var inv = INVENTIONS.find(function(x) { return x.id === id; });
        return sum + (inv && inv.reward.culture ? inv.reward.culture : 0);
    }, 0), w - 40, 120);
}

function discoverInvention(idx) {
    var inv = INVENTIONS[idx];
    if(v13State.inventionsDiscovered.indexOf(inv.id) >= 0) return;
    if(typeof resources !== 'undefined' && resources.gold < 50) {
        if(typeof toast === 'function') toast('금이 부족합니다! (50 필요)');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= 50;
    v13State.inventionsDiscovered.push(inv.id);
    saveV13();
    playV13SFX('invention_discover');
    if(typeof resources !== 'undefined') {
        resources.gold += inv.reward.gold;
        if(inv.reward.culture && typeof resources.culture !== 'undefined') resources.culture += inv.reward.culture;
        if(inv.reward.happy && typeof resources.happy !== 'undefined') resources.happy = Math.min(100, resources.happy + inv.reward.happy);
    }
    if(typeof toast === 'function') toast('💡 ' + inv.name + ' 발견! +' + inv.reward.gold + '금');
    if(typeof addChronicle === 'function') addChronicle('💡', inv.name + '을(를) 발견했습니다 (' + inv.year + ')');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof checkAchievements === 'function') checkAchievements();
    document.getElementById('invention-panel').remove();
    showInventionPanel();
}

// ===================== TRADE ROUTE VISUALIZER =====================
function showTradeRoutePanel() {
    playV13SFX('trade_route');
    markV13Feature('traderoute');
    var el = document.getElementById('traderoute-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'traderoute-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var activeCount = v13State.tradeRoutes.length;
    var totalGold = v13State.tradeRoutes.reduce(function(s, id) {
        var r = TRADE_ROUTES_DATA.find(function(x) { return x.id === id; });
        return s + (r ? r.goldPerTurn : 0);
    }, 0);
    var html = '<button class="v13-close" onclick="document.getElementById(\'traderoute-panel\').remove()">&times;</button>';
    html += '<h2>🚢 무역로 시각화기</h2>';
    html += '<canvas id="traderoute-canvas" class="v13-canvas" width="520" height="280"></canvas>';
    html += '<div class="v13-score-bar"><span>활성 교역로: <span class="v13-score-val">' + activeCount + '/' + TRADE_ROUTES_DATA.length + '</span></span><span>턴당 수입: <span class="v13-score-val">+' + totalGold + ' 금</span></span></div>';
    html += '<div class="v13-section"><h3>교역로 목록</h3>';
    for(var i = 0; i < TRADE_ROUTES_DATA.length; i++) {
        var tr = TRADE_ROUTES_DATA[i];
        var active = v13State.tradeRoutes.indexOf(tr.id) >= 0;
        html += '<div class="v13-card" style="' + (active ? 'border-color:#dd8866;' : '') + '">';
        html += '<div style="display:flex;align-items:center;gap:10px;">';
        html += '<span style="font-size:24px;">' + tr.icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div class="v13-card-title" style="color:' + (active ? '#dd8866' : '#777') + ';">' + tr.name + (active ? ' ✅' : '') + '</div>';
        html += '<div class="v13-card-desc">' + tr.from + ' → ' + tr.to + ' | 물품: ' + tr.goods + '</div>';
        html += '<div style="font-size:10px;color:#ffcc66;margin-top:2px;">턴당 +' + tr.goldPerTurn + ' 금</div>';
        html += '</div>';
        if(!active) {
            html += '<button class="v13-btn" style="background:#aa6644;" onclick="activateTradeRoute(' + i + ')">개통 (금 80)</button>';
        }
        html += '</div></div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawTradeRouteCanvas, 50);
}

function drawTradeRouteCanvas() {
    var c = document.getElementById('traderoute-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a1420';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1a3a2a';
    ctx.beginPath();
    ctx.ellipse(w/2, h/2, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2a5a3a';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한반도', w/2, h/2 + 4);
    var angleStep = (Math.PI * 2) / TRADE_ROUTES_DATA.length;
    for(var i = 0; i < TRADE_ROUTES_DATA.length; i++) {
        var tr = TRADE_ROUTES_DATA[i];
        var active = v13State.tradeRoutes.indexOf(tr.id) >= 0;
        var angle = -Math.PI/2 + i * angleStep;
        var destX = w/2 + Math.cos(angle) * 180;
        var destY = h/2 + Math.sin(angle) * 110;
        ctx.strokeStyle = active ? '#dd8866' : '#333';
        ctx.lineWidth = active ? 2 : 1;
        ctx.setLineDash(active ? [] : [4, 4]);
        ctx.beginPath();
        ctx.moveTo(w/2 + Math.cos(angle) * 80, h/2 + Math.sin(angle) * 60);
        ctx.lineTo(destX, destY);
        ctx.stroke();
        ctx.setLineDash([]);
        if(active) {
            var dotPos = 0.5 + 0.3 * Math.sin(performance.now() / 600 + i);
            var dx = w/2 + Math.cos(angle) * 80 + (destX - w/2 - Math.cos(angle) * 80) * dotPos;
            var dy = h/2 + Math.sin(angle) * 60 + (destY - h/2 - Math.sin(angle) * 60) * dotPos;
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(dx, dy, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = active ? '#dd8866' : '#555';
        ctx.beginPath();
        ctx.arc(destX, destY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = active ? '#ffaa66' : '#444';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = '14px sans-serif';
        ctx.fillText(tr.icon, destX, destY + 5);
        ctx.font = '9px sans-serif';
        ctx.fillStyle = active ? '#ffcc88' : '#666';
        ctx.fillText(tr.name.split('(')[0].trim(), destX, destY + 28);
    }
}

function activateTradeRoute(idx) {
    var tr = TRADE_ROUTES_DATA[idx];
    if(v13State.tradeRoutes.indexOf(tr.id) >= 0) return;
    if(typeof resources !== 'undefined' && resources.gold < 80) {
        if(typeof toast === 'function') toast('금이 부족합니다! (80 필요)');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= 80;
    v13State.tradeRoutes.push(tr.id);
    saveV13();
    playV13SFX('trade_route');
    if(typeof toast === 'function') toast('🚢 ' + tr.name + ' 개통! 턴당 +' + tr.goldPerTurn + '금');
    if(typeof addChronicle === 'function') addChronicle('🚢', tr.name + ' 교역로를 개통했습니다');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof checkAchievements === 'function') checkAchievements();
    document.getElementById('traderoute-panel').remove();
    showTradeRoutePanel();
}

// ===================== POPULATION DEMOGRAPHICS =====================
function showPopGraphPanel() {
    playV13SFX('population_view');
    markV13Feature('popgraph');
    if(typeof resources !== 'undefined') {
        v13State.popHistory.push({ pop: resources.pop || 0, gold: resources.gold || 0, culture: resources.culture || 0 });
        if(v13State.popHistory.length > 30) v13State.popHistory = v13State.popHistory.slice(-30);
        saveV13();
    }
    var el = document.getElementById('popgraph-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'popgraph-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var pop = (typeof resources !== 'undefined') ? resources.pop : 0;
    var html = '<button class="v13-close" onclick="document.getElementById(\'popgraph-panel\').remove()">&times;</button>';
    html += '<h2>📊 인구 통계 대시보드</h2>';
    html += '<canvas id="popgraph-canvas" class="v13-canvas" width="520" height="280"></canvas>';
    html += '<div class="v13-section"><h3>현재 인구: ' + pop + '명</h3>';
    if(typeof getPopulationTypes === 'function') {
        var types = getPopulationTypes();
        html += '<div class="v13-grid v13-grid-2">';
        html += '<div class="v13-card"><div class="v13-card-title" style="color:#8bc34a;">🌾 농민</div><div class="v13-card-desc">' + types.farmers + '명</div></div>';
        html += '<div class="v13-card"><div class="v13-card-title" style="color:#ffd700;">💰 상인</div><div class="v13-card-desc">' + types.merchants + '명</div></div>';
        html += '<div class="v13-card"><div class="v13-card-title" style="color:#aa88cc;">📚 학자</div><div class="v13-card-desc">' + types.scholars + '명</div></div>';
        html += '<div class="v13-card"><div class="v13-card-title" style="color:#ff6666;">⚔️ 군인</div><div class="v13-card-desc">' + types.warriors + '명</div></div>';
        html += '</div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawPopGraph, 50);
}

function drawPopGraph() {
    var c = document.getElementById('popgraph-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    var data = v13State.popHistory;
    if(data.length < 2) {
        ctx.fillStyle = '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('데이터 수집 중... (이 패널을 여러 번 열어 기록하세요)', w/2, h/2);
        return;
    }
    var maxPop = Math.max.apply(null, data.map(function(d) { return d.pop; }));
    if(maxPop === 0) maxPop = 1;
    var padL = 50, padR = 20, padT = 30, padB = 40;
    var graphW = w - padL - padR, graphH = h - padT - padB;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for(var g = 0; g <= 4; g++) {
        var gy = padT + graphH * (1 - g/4);
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(w - padR, gy);
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxPop * g / 4), padL - 6, gy + 4);
    }
    ctx.fillStyle = '#66aacc';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('인구 변화 추이', w/2, 18);
    var grad = ctx.createLinearGradient(0, padT, 0, padT + graphH);
    grad.addColorStop(0, 'rgba(68,136,170,0.4)');
    grad.addColorStop(1, 'rgba(68,136,170,0.02)');
    ctx.beginPath();
    ctx.moveTo(padL, padT + graphH);
    for(var i = 0; i < data.length; i++) {
        var x = padL + (i / (data.length - 1)) * graphW;
        var y = padT + graphH * (1 - data[i].pop / maxPop);
        ctx.lineTo(x, y);
    }
    ctx.lineTo(padL + graphW, padT + graphH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = '#66aacc';
    ctx.lineWidth = 2;
    for(var j = 0; j < data.length; j++) {
        var px = padL + (j / (data.length - 1)) * graphW;
        var py = padT + graphH * (1 - data[j].pop / maxPop);
        if(j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    for(var k = 0; k < data.length; k++) {
        var dx = padL + (k / (data.length - 1)) * graphW;
        var dy = padT + graphH * (1 - data[k].pop / maxPop);
        ctx.fillStyle = '#66aacc';
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('← 과거', padL + 30, h - 10);
    ctx.fillText('현재 →', w - padR - 30, h - 10);
}

// ===================== CULTURAL INFLUENCE MAP =====================
function showCultureMapPanel() {
    playV13SFX('culture_map');
    markV13Feature('culturemap');
    var el = document.getElementById('culturemap-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'culturemap-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var culture = (typeof resources !== 'undefined') ? resources.culture : 0;
    var cultureLevel = culture < 100 ? '마을' : culture < 300 ? '소도시' : culture < 600 ? '도시국가' : culture < 1000 ? '왕국' : '제국';
    var html = '<button class="v13-close" onclick="document.getElementById(\'culturemap-panel\').remove()">&times;</button>';
    html += '<h2>🎭 문화 영향력 맵</h2>';
    html += '<canvas id="culturemap-canvas" class="v13-canvas" width="520" height="320"></canvas>';
    html += '<div class="v13-section"><h3>문화 등급: ' + cultureLevel + ' (문화 ' + culture + ')</h3>';
    html += '<div class="v13-grid v13-grid-2">';
    var domains = [
        { icon: '🏛️', name: '건축 문화', val: Math.min(100, Math.floor(culture * 0.3)) },
        { icon: '📚', name: '학문 문화', val: Math.min(100, Math.floor(culture * 0.25)) },
        { icon: '🎨', name: '예술 문화', val: Math.min(100, Math.floor(culture * 0.2)) },
        { icon: '🙏', name: '종교 문화', val: Math.min(100, Math.floor(culture * 0.15)) },
        { icon: '⚔️', name: '무예 문화', val: Math.min(100, Math.floor(culture * 0.1)) },
        { icon: '🍚', name: '식문화', val: Math.min(100, Math.floor(culture * 0.18)) }
    ];
    for(var i = 0; i < domains.length; i++) {
        html += '<div class="v13-card"><div class="v13-card-title">' + domains[i].icon + ' ' + domains[i].name + '</div>';
        html += '<div style="margin-top:4px;height:8px;background:#222;border-radius:4px;overflow:hidden;">';
        html += '<div style="height:100%;width:' + domains[i].val + '%;background:linear-gradient(90deg,#8866aa,#aa88cc);border-radius:4px;"></div></div>';
        html += '<div style="font-size:10px;color:#aa88cc;text-align:right;">' + domains[i].val + '%</div></div>';
    }
    html += '</div></div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawCultureMap, 50);
}

function drawCultureMap() {
    var c = document.getElementById('culturemap-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0e18';
    ctx.fillRect(0, 0, w, h);
    var culture = (typeof resources !== 'undefined') ? resources.culture : 0;
    var maxR = Math.min(w, h) * 0.42;
    var radius = maxR * Math.min(1, culture / 1000);
    var cx = w / 2, cy = h / 2;
    for(var ring = 4; ring >= 0; ring--) {
        var r = radius * (ring + 1) / 5;
        var alpha = 0.08 + ring * 0.04;
        ctx.fillStyle = 'rgba(136, 102, 170, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(170, 136, 204, ' + (0.15 + ring * 0.08) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    ctx.fillStyle = '#aa88cc';
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ccaaee';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('수도', cx, cy + 4);
    var labels = ['건축', '학문', '예술', '종교', '무예', '식문화'];
    var labelColors = ['#cc8866', '#66aacc', '#cc66aa', '#aa8844', '#cc4444', '#66aa66'];
    for(var j = 0; j < 6; j++) {
        var angle = -Math.PI / 2 + j * (Math.PI * 2 / 6);
        var lx = cx + Math.cos(angle) * (radius + 20);
        var ly = cy + Math.sin(angle) * (radius + 20);
        ctx.fillStyle = labelColors[j];
        ctx.font = '11px sans-serif';
        ctx.fillText(labels[j], lx, ly + 4);
        ctx.strokeStyle = labelColors[j];
        ctx.globalAlpha = 0.3;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 12, cy + Math.sin(angle) * 12);
        ctx.lineTo(cx + Math.cos(angle) * (radius + 8), cy + Math.sin(angle) * (radius + 8));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
    }
    ctx.fillStyle = '#aa88cc';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('문화 영향력: ' + culture, w/2, 22);
    var lvl = culture < 100 ? '마을' : culture < 300 ? '소도시' : culture < 600 ? '도시국가' : culture < 1000 ? '왕국' : '제국';
    ctx.font = '12px sans-serif';
    ctx.fillText('등급: ' + lvl, w/2, h - 14);
}

// ===================== HISTORICAL TIMELINE =====================
function showTimelinePanel() {
    playV13SFX('timeline_view');
    markV13Feature('timeline');
    var el = document.getElementById('timeline-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'timeline-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var events = [
        { year: '기원전 2333', icon: '🏛️', title: '고조선 건국', desc: '단군왕검이 아사달에 도읍을 정하고 고조선을 세움' },
        { year: '기원전 108', icon: '⚔️', title: '고조선 멸망', desc: '한무제의 침략으로 고조선이 무너짐' },
        { year: '기원전 37', icon: '🐎', title: '고구려 건국', desc: '주몽이 졸본에서 고구려를 세움' },
        { year: '391', icon: '👑', title: '광개토대왕 즉위', desc: '영토를 크게 넓히고 동북아 강대국으로 성장' },
        { year: '612', icon: '🛡️', title: '살수대첩', desc: '을지문덕이 수나라 30만 대군을 물리침' },
        { year: '918', icon: '🏺', title: '고려 건국', desc: '왕건이 송악에서 고려를 건국' },
        { year: '1234', icon: '🔤', title: '금속활자 발명', desc: '세계 최초의 금속활자 인쇄 기술 개발' },
        { year: '1392', icon: '📚', title: '조선 건국', desc: '이성계가 한양에 도읍을 정하고 조선 건국' },
        { year: '1443', icon: '🔠', title: '훈민정음 창제', desc: '세종대왕이 한글을 만들어 반포' },
        { year: '1592', icon: '🐢', title: '임진왜란', desc: '이순신의 거북선이 일본 수군을 격파' },
        { year: '1796', icon: '🧱', title: '수원화성 완공', desc: '정약용의 거중기로 22개월 만에 완성' },
        { year: '1897', icon: '🌅', title: '대한제국 선포', desc: '고종이 황제 즉위, 근대 국가로의 전환' }
    ];
    var html = '<button class="v13-close" onclick="document.getElementById(\'timeline-panel\').remove()">&times;</button>';
    html += '<h2>📜 한국사 연표</h2>';
    html += '<canvas id="timeline-canvas" class="v13-canvas" width="520" height="200"></canvas>';
    html += '<div class="v13-section">';
    for(var i = 0; i < events.length; i++) {
        var ev = events[i];
        html += '<div class="v13-card" style="display:flex;gap:12px;align-items:flex-start;">';
        html += '<div style="text-align:center;min-width:50px;"><div style="font-size:24px;">' + ev.icon + '</div><div style="font-size:9px;color:#aa8844;margin-top:2px;">' + ev.year + '</div></div>';
        html += '<div><div class="v13-card-title" style="color:#ddaa66;">' + ev.title + '</div><div class="v13-card-desc">' + ev.desc + '</div></div>';
        html += '</div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawTimelineCanvas, 50);
}

function drawTimelineCanvas() {
    var c = document.getElementById('timeline-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    var eras = [
        { name: '고조선', start: 0, end: 0.15, color: '#cc8844' },
        { name: '삼국', start: 0.15, end: 0.35, color: '#cc4444' },
        { name: '통일신라', start: 0.35, end: 0.45, color: '#4488cc' },
        { name: '고려', start: 0.45, end: 0.6, color: '#44aa88' },
        { name: '조선', start: 0.6, end: 0.88, color: '#aa6644' },
        { name: '근대', start: 0.88, end: 1, color: '#8866aa' }
    ];
    var padL = 30, padR = 30, lineY = h / 2;
    var lineW = w - padL - padR;
    for(var i = 0; i < eras.length; i++) {
        var era = eras[i];
        var sx = padL + lineW * era.start;
        var ex = padL + lineW * era.end;
        ctx.fillStyle = era.color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(sx, lineY - 20, ex - sx, 40);
        ctx.globalAlpha = 1;
        ctx.fillStyle = era.color;
        ctx.fillRect(sx, lineY - 2, ex - sx, 4);
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(era.name, (sx + ex) / 2, lineY + 35);
    }
    var markers = [
        { pos: 0, label: 'BC2333' },
        { pos: 0.15, label: 'BC108' },
        { pos: 0.35, label: '668' },
        { pos: 0.45, label: '918' },
        { pos: 0.6, label: '1392' },
        { pos: 0.88, label: '1897' },
        { pos: 1, label: '현재' }
    ];
    for(var j = 0; j < markers.length; j++) {
        var mx = padL + lineW * markers[j].pos;
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(mx, lineY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#999';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(markers[j].label, mx, lineY - 28);
    }
    ctx.fillStyle = '#ddaa66';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('한국사 5천년 연표', w/2, 18);
}

// ===================== ARCHERY MINI-GAME =====================
var archeryState = { active: false, score: 0, arrows: 10, targets: [], animFrame: null };

function showArcheryPanel() {
    playV13SFX('archery_shoot');
    markV13Feature('archery');
    var el = document.getElementById('archery-panel');
    if(el) { el.remove(); }
    archeryState = { active: true, score: 0, arrows: 10, targets: [], animFrame: null };
    var overlay = document.createElement('div');
    overlay.id = 'archery-panel';
    overlay.className = 'v13-overlay';
    var box = document.createElement('div');
    box.className = 'v13-box';
    var html = '<button class="v13-close" onclick="closeArchery()">&times;</button>';
    html += '<h2>🏹 활쏘기 대회</h2>';
    html += '<div class="v13-score-bar"><span>점수: <span id="archery-score" class="v13-score-val">0</span></span><span>남은 화살: <span id="archery-arrows" class="v13-score-val">10</span></span></div>';
    html += '<canvas id="archery-canvas" class="v13-archery-canvas" width="520" height="320"></canvas>';
    html += '<div id="archery-result" style="text-align:center;display:none;"></div>';
    html += '<div style="text-align:center;font-size:11px;color:#888;">과녁을 클릭하여 화살을 쏘세요! 중심에 가까울수록 높은 점수.</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    var canvas = document.getElementById('archery-canvas');
    if(canvas) {
        canvas.addEventListener('click', function(e) { archeryShoot(e); });
        drawArcheryCanvas();
    }
}

function drawArcheryCanvas() {
    var c = document.getElementById('archery-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    var grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0a2a0a');
    grad.addColorStop(1, '#1a3a1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#2a5a2a';
    ctx.fillRect(0, h - 40, w, 40);
    var cx = w / 2, cy = h / 2 - 10;
    var rings = [
        { r: 80, color: '#fff', score: 10 },
        { r: 65, color: '#333', score: 20 },
        { r: 50, color: '#4488cc', score: 30 },
        { r: 35, color: '#cc4444', score: 40 },
        { r: 20, color: '#ffd700', score: 50 }
    ];
    for(var i = 0; i < rings.length; i++) {
        ctx.fillStyle = rings[i].color;
        ctx.beginPath();
        ctx.arc(cx, cy, rings[i].r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    ctx.fillStyle = '#cc0000';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    for(var j = 0; j < archeryState.targets.length; j++) {
        var t = archeryState.targets[j];
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(t.x - 1, t.y - 8, 2, 16);
        ctx.fillStyle = '#cc4444';
        ctx.beginPath();
        ctx.moveTo(t.x, t.y - 8);
        ctx.lineTo(t.x + 6, t.y - 4);
        ctx.lineTo(t.x, t.y);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('+' + t.score, t.x, t.y - 14);
    }
}

function archeryShoot(e) {
    if(!archeryState.active || archeryState.arrows <= 0) return;
    var c = document.getElementById('archery-canvas');
    if(!c) return;
    var rect = c.getBoundingClientRect();
    var scaleX = c.width / rect.width;
    var scaleY = c.height / rect.height;
    var clickX = (e.clientX - rect.left) * scaleX;
    var clickY = (e.clientY - rect.top) * scaleY;
    var cx = c.width / 2, cy = c.height / 2 - 10;
    var dist = Math.sqrt((clickX - cx) * (clickX - cx) + (clickY - cy) * (clickY - cy));
    var score = 0;
    if(dist <= 5) score = 50;
    else if(dist <= 20) score = 40;
    else if(dist <= 35) score = 30;
    else if(dist <= 50) score = 20;
    else if(dist <= 65) score = 10;
    else if(dist <= 80) score = 5;
    archeryState.score += score;
    archeryState.arrows--;
    archeryState.targets.push({ x: clickX, y: clickY, score: score });
    playV13SFX(score >= 30 ? 'archery_hit' : 'archery_shoot');
    document.getElementById('archery-score').textContent = archeryState.score;
    document.getElementById('archery-arrows').textContent = archeryState.arrows;
    drawArcheryCanvas();
    if(archeryState.arrows <= 0) {
        archeryState.active = false;
        var resultEl = document.getElementById('archery-result');
        if(resultEl) {
            var grade = archeryState.score >= 300 ? 'S' : archeryState.score >= 200 ? 'A' : archeryState.score >= 100 ? 'B' : archeryState.score >= 50 ? 'C' : 'D';
            var reward = Math.floor(archeryState.score / 2);
            resultEl.style.display = 'block';
            resultEl.innerHTML = '<div style="font-size:36px;margin:8px 0;">🎯</div><div style="font-size:18px;color:#ffd700;font-weight:bold;">최종 점수: ' + archeryState.score + '점 (' + grade + '등급)</div>';
            resultEl.innerHTML += '<div style="font-size:13px;color:#8f8;margin-top:6px;">보상: +' + reward + ' 금</div>';
            resultEl.innerHTML += '<button class="v13-btn" style="margin-top:10px;" onclick="closeArchery()">닫기</button>';
            if(typeof resources !== 'undefined') resources.gold += reward;
            if(archeryState.score > v13State.archeryHighScore) {
                v13State.archeryHighScore = archeryState.score;
                saveV13();
            }
            if(typeof toast === 'function') toast('🏹 활쏘기 ' + grade + '등급! +' + reward + '금');
            if(typeof addChronicle === 'function') addChronicle('🏹', '활쏘기 대회 ' + archeryState.score + '점 (' + grade + '등급)');
            if(typeof updateHUD === 'function') updateHUD();
            if(typeof checkAchievements === 'function') checkAchievements();
        }
    }
}

function closeArchery() {
    archeryState.active = false;
    var el = document.getElementById('archery-panel');
    if(el) el.remove();
}

// ===================== CITY UPGRADE TREE =====================
function showUpgradePanel() {
    playV13SFX('upgrade_unlock');
    markV13Feature('upgrade');
    var el = document.getElementById('upgrade-panel');
    if(el) { el.remove(); }
    var overlay = document.createElement('div');
    overlay.id = 'upgrade-panel';
    overlay.className = 'v13-overlay';
    overlay.onclick = function(e) { if(e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.className = 'v13-box';
    var html = '<button class="v13-close" onclick="document.getElementById(\'upgrade-panel\').remove()">&times;</button>';
    html += '<h2>🌳 도시 업그레이드 트리</h2>';
    html += '<canvas id="upgrade-canvas" class="v13-canvas" width="520" height="220"></canvas>';
    html += '<div style="text-align:center;margin-bottom:8px;font-size:12px;color:#aaa;">해금: ' + v13State.upgrades.length + ' / ' + UPGRADE_TREE.length + '</div>';
    html += '<div class="v13-section">';
    for(var i = 0; i < UPGRADE_TREE.length; i++) {
        var up = UPGRADE_TREE[i];
        var unlocked = v13State.upgrades.indexOf(up.id) >= 0;
        var canUnlock = !unlocked && up.requires.every(function(req) { return v13State.upgrades.indexOf(req) >= 0; });
        var cls = unlocked ? 'unlocked' : (canUnlock ? 'available' : '');
        html += '<div class="v13-upgrade-node ' + cls + '"' + (canUnlock ? ' onclick="unlockUpgrade(' + i + ')"' : '') + '>';
        html += '<div class="v13-upgrade-icon">' + up.icon + '</div>';
        html += '<div class="v13-upgrade-info">';
        html += '<div class="v13-upgrade-name" style="color:' + (unlocked ? '#66dd66' : canUnlock ? '#ffd700' : '#666') + ';">' + up.name + (unlocked ? ' ✅' : '') + '</div>';
        html += '<div class="v13-upgrade-desc">' + up.desc + '</div>';
        if(!unlocked) {
            html += '<div class="v13-upgrade-cost">비용: 금 ' + up.cost.gold;
            if(up.requires.length > 0) {
                html += ' | 필요: ' + up.requires.map(function(r) {
                    var req = UPGRADE_TREE.find(function(x) { return x.id === r; });
                    return req ? req.name : r;
                }).join(', ');
            }
            html += '</div>';
        }
        html += '</div></div>';
    }
    html += '</div>';
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(drawUpgradeCanvas, 50);
}

function drawUpgradeCanvas() {
    var c = document.getElementById('upgrade-canvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, w, h);
    var total = UPGRADE_TREE.length;
    var done = v13State.upgrades.length;
    var pct = done / total;
    ctx.fillStyle = '#66dd66';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('업그레이드 진행률', w/2, 22);
    var barX = 40, barY = 36, barW = w - 80, barH = 20;
    ctx.fillStyle = '#1a2a1a';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 10);
    ctx.fill();
    if(pct > 0) {
        var grad = ctx.createLinearGradient(barX, 0, barX + barW * pct, 0);
        grad.addColorStop(0, '#44aa44');
        grad.addColorStop(1, '#66dd66');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW * pct, barH, 10);
        ctx.fill();
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(done + ' / ' + total + ' (' + Math.round(pct * 100) + '%)', w/2, barY + 15);
    var rows = [
        [0, 1],
        [2, 3, 6],
        [5, 4, 7],
        [10, 9, 8],
        [11]
    ];
    var nodeW = 60, nodeH = 24;
    for(var row = 0; row < rows.length; row++) {
        var cols = rows[row];
        var totalW = cols.length * nodeW + (cols.length - 1) * 20;
        var startX = (w - totalW) / 2;
        var y = 75 + row * 28;
        for(var col = 0; col < cols.length; col++) {
            var idx = cols[col];
            if(idx >= UPGRADE_TREE.length) continue;
            var up = UPGRADE_TREE[idx];
            var unlocked = v13State.upgrades.indexOf(up.id) >= 0;
            var x = startX + col * (nodeW + 20);
            ctx.fillStyle = unlocked ? 'rgba(68,170,68,0.3)' : 'rgba(50,50,50,0.5)';
            ctx.beginPath();
            ctx.roundRect(x, y, nodeW, nodeH, 6);
            ctx.fill();
            ctx.strokeStyle = unlocked ? '#66dd66' : '#444';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText(up.icon, x + 14, y + 17);
            ctx.font = '8px sans-serif';
            ctx.fillStyle = unlocked ? '#66dd66' : '#888';
            ctx.fillText(up.name.substring(0, 6), x + 40, y + 16);
        }
    }
}

function unlockUpgrade(idx) {
    var up = UPGRADE_TREE[idx];
    if(v13State.upgrades.indexOf(up.id) >= 0) return;
    if(!up.requires.every(function(r) { return v13State.upgrades.indexOf(r) >= 0; })) {
        if(typeof toast === 'function') toast('선행 업그레이드를 먼저 해금하세요!');
        return;
    }
    if(typeof resources !== 'undefined' && resources.gold < up.cost.gold) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + up.cost.gold + ' 필요)');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= up.cost.gold;
    v13State.upgrades.push(up.id);
    saveV13();
    playV13SFX('upgrade_unlock');
    if(typeof toast === 'function') toast('📈 ' + up.name + ' 해금! ' + up.desc);
    if(typeof addChronicle === 'function') addChronicle('📈', up.name + '을(를) 연구했습니다');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof checkAchievements === 'function') checkAchievements();
    document.getElementById('upgrade-panel').remove();
    showUpgradePanel();
}

// ===================== QUIZ INJECTION =====================
(function injectV13Quiz() {
    if(typeof quizData === 'undefined') {
        setTimeout(injectV13Quiz, 500);
        return;
    }
    for(var i = 0; i < V13_QUIZ.length; i++) {
        quizData.push(V13_QUIZ[i]);
    }
})();

// ===================== ACHIEVEMENTS INJECTION =====================
(function injectV13Achievements() {
    if(typeof V5_ACHIEVEMENTS === 'undefined') {
        setTimeout(injectV13Achievements, 500);
        return;
    }
    var origCheck = typeof checkAchievements === 'function' ? checkAchievements : null;
    window.checkAchievements = function() {
        if(origCheck) origCheck();
        var achData;
        try { achData = JSON.parse(localStorage.getItem('cityAchievements') || '[]'); } catch(e) { achData = []; }
        var changed = false;
        for(var i = 0; i < V13_ACHIEVEMENTS.length; i++) {
            var a = V13_ACHIEVEMENTS[i];
            if(achData.indexOf(a.id) >= 0) continue;
            var earned = false;
            switch(a.id) {
                case 'v13_dynasty_first': earned = !!v13State.featureUsed.dynasty; break;
                case 'v13_dynasty_advance': earned = v13State.dynasty > 0; break;
                case 'v13_invention_1': earned = v13State.inventionsDiscovered.length >= 1; break;
                case 'v13_invention_6': earned = v13State.inventionsDiscovered.length >= 6; break;
                case 'v13_invention_all': earned = v13State.inventionsDiscovered.length >= INVENTIONS.length; break;
                case 'v13_trade_3': earned = v13State.tradeRoutes.length >= 3; break;
                case 'v13_trade_all': earned = v13State.tradeRoutes.length >= TRADE_ROUTES_DATA.length; break;
                case 'v13_archery_100': earned = v13State.archeryHighScore >= 100; break;
                case 'v13_archery_200': earned = v13State.archeryHighScore >= 200; break;
                case 'v13_upgrade_3': earned = v13State.upgrades.length >= 3; break;
                case 'v13_upgrade_all': earned = v13State.upgrades.length >= UPGRADE_TREE.length; break;
                case 'v13_explorer': earned = Object.keys(v13State.featureUsed).length >= 8; break;
            }
            if(earned) {
                achData.push(a.id);
                changed = true;
                playV13SFX('achieve_v13');
                var toastEl = document.createElement('div');
                toastEl.className = 'ach-toast';
                toastEl.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + a.icon + ' ' + a.title + '</div><div class="a-desc">' + a.desc + '</div>';
                document.body.appendChild(toastEl);
                setTimeout(function(el) { return function() { if(el.parentNode) el.parentNode.removeChild(el); }; }(toastEl), 4500);
            }
        }
        if(changed) {
            try { localStorage.setItem('cityAchievements', JSON.stringify(achData)); } catch(e){}
        }
    };
})();

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', function(e) {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if(!e.shiftKey) return;
    switch(e.key.toUpperCase()) {
        case 'Y': e.preventDefault(); showDynastyPanel(); break;
        case 'I': e.preventDefault(); showInventionPanel(); break;
        case 'U': e.preventDefault(); showTradeRoutePanel(); break;
        case 'P': e.preventDefault(); showPopGraphPanel(); break;
        case 'M': e.preventDefault(); showCultureMapPanel(); break;
        case 'H': e.preventDefault(); showTimelinePanel(); break;
        case 'J': e.preventDefault(); showArcheryPanel(); break;
        case 'E': e.preventDefault(); showUpgradePanel(); break;
    }
});

// ===================== SCROLL NAV BAR =====================
(function() {
    var existingNav = document.querySelector('.v12-scroll-nav');
    if(existingNav) existingNav.remove();
    var nav = document.createElement('div');
    nav.className = 'v13-scroll-nav';
    var btns = [
        { icon: '👑', label: '왕조', fn: 'showDynastyPanel()' },
        { icon: '💡', label: '발명', fn: 'showInventionPanel()' },
        { icon: '🚢', label: '무역', fn: 'showTradeRoutePanel()' },
        { icon: '📊', label: '인구', fn: 'showPopGraphPanel()' },
        { icon: '🎭', label: '문화', fn: 'showCultureMapPanel()' },
        { icon: '📜', label: '연표', fn: 'showTimelinePanel()' },
        { icon: '🏹', label: '활쏘기', fn: 'showArcheryPanel()' },
        { icon: '🌳', label: '업그레이드', fn: 'showUpgradePanel()' }
    ];
    for(var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var btn = document.createElement('button');
        btn.className = 'v13-nav-btn';
        btn.innerHTML = b.icon + ' ' + b.label;
        btn.setAttribute('onclick', b.fn);
        nav.appendChild(btn);
    }
    document.body.appendChild(nav);
})();

// ===================== GLOBAL EXPORTS =====================
window.showDynastyPanel = showDynastyPanel;
window.showInventionPanel = showInventionPanel;
window.showTradeRoutePanel = showTradeRoutePanel;
window.showPopGraphPanel = showPopGraphPanel;
window.showCultureMapPanel = showCultureMapPanel;
window.showTimelinePanel = showTimelinePanel;
window.showArcheryPanel = showArcheryPanel;
window.showUpgradePanel = showUpgradePanel;
window.advanceDynasty = advanceDynasty;
window.discoverInvention = discoverInvention;
window.activateTradeRoute = activateTradeRoute;
window.unlockUpgrade = unlockUpgrade;
window.closeArchery = closeArchery;

})();
