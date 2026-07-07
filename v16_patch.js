// =====================================================================
// city-builder v16_patch.js — PRIME Holdings NEXTERA+PRISM v16.0
// Self-contained IIFE patch: Trade Goods Market 8 goods Canvas,
// Disaster Preparedness Plan 6 types Radar Canvas,
// Cultural Heritage Registry 12 items Canvas,
// Military Organization Chart 8 units Canvas,
// Seasonal Weather Impact 4x4 Canvas,
// Citizen Satisfaction Survey 6 categories Canvas,
// Royal Court Faction Map 6 factions Canvas,
// Historical Territory Map 5 eras Canvas,
// +15 Quiz (175→190), +12 Achievements (158→170),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v16Ctx = null;
function getV16Audio() {
    if(!v16Ctx) {
        try { v16Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v16Ctx;
}
function playV16SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV16Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.10, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    switch(type) {
        case 'trade_buy':
            [440,554,659].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'trade_sell':
            [659,554,440].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.18);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.18);
            });
            break;
        case 'disaster_warn':
            [880,660,880,660,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.12);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.12);
            });
            break;
        case 'disaster_safe':
            [330,392,494,588,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'heritage_reg':
            [262,330,392,494].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'military_march':
            [196,247,294,330,392].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.05, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.15);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.15);
            });
            break;
        case 'season_change':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(494, now+0.2);
            o.frequency.linearRampToValueAtTime(392, now+0.4);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.45);
            o.connect(g); o.start(now); o.stop(now+0.45);
            break;
        case 'survey_done':
            [494,588,698,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.2);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.2);
            });
            break;
        case 'faction_shift':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(220, now);
            o.frequency.linearRampToValueAtTime(440, now+0.15);
            o.frequency.linearRampToValueAtTime(330, now+0.3);
            g.gain.setValueAtTime(0.07, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'territory_expand':
            [262,330,392,494,588,698].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.18);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.18);
            });
            break;
        case 'v16_achieve':
            [392,494,588,784,988].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.3);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.3);
            });
            break;
        case 'v16_quiz':
            [440,554,659,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.07, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.15);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.15);
            });
            break;
    }
}

// ===================== STATE =====================
var v16State = {
    tradeGoods: {
        rice: {name:'쌀', icon:'🌾', price:10, owned:0, supply:80, demand:70},
        silk: {name:'비단', icon:'🧵', price:25, owned:0, supply:40, demand:60},
        celadon: {name:'청자', icon:'🫖', price:40, owned:0, supply:30, demand:50},
        hanji: {name:'한지', icon:'📜', price:15, owned:0, supply:60, demand:55},
        ginseng: {name:'인삼', icon:'🌿', price:35, owned:0, supply:25, demand:65},
        iron: {name:'철', icon:'⚒️', price:20, owned:0, supply:50, demand:45},
        salt: {name:'소금', icon:'🧂', price:12, owned:0, supply:70, demand:75},
        wood: {name:'목재', icon:'🪵', price:8, owned:0, supply:90, demand:60}
    },
    tradeProfit: 0,
    tradeHistory: [],
    disasterPrep: {earthquake:20, flood:30, drought:25, typhoon:15, wildfire:10, plague:35},
    disasterInvested: 0,
    disasterScenariosRun: 0,
    disasterLastResult: null,
    heritageRegistered: [],
    heritageItems: [
        {id:'h1', name:'석굴암', era:'삼국시대', icon:'🏛️', desc:'경주 토함산 석굴암. 본존불상과 주변 조각은 동아시아 불교미술의 최고걸작.', unescoYear:1995},
        {id:'h2', name:'해인사 장경판전', era:'고려', icon:'📚', desc:'팔만대장경을 보관하는 건물. 자연 통풍으로 700년간 목판을 보존.', unescoYear:1995},
        {id:'h3', name:'종묘', era:'조선', icon:'⛩️', desc:'조선 왕과 왕비의 신주를 모시는 유교 사당. 정전은 세계 최장 목조건물.', unescoYear:1995},
        {id:'h4', name:'창덕궁', era:'조선', icon:'🏯', desc:'자연 지형에 맞춘 궁궐 건축의 걸작. 후원의 정원은 동양 정원의 정수.', unescoYear:1997},
        {id:'h5', name:'수원화성', era:'조선', icon:'🏰', desc:'정조가 축성한 성곽. 동서양 군사건축 기술을 융합한 18세기 걸작.', unescoYear:1997},
        {id:'h6', name:'경주역사유적지구', era:'삼국시대', icon:'🗿', desc:'신라 천년 수도의 유적. 불국사, 남산, 월성, 대릉원 등 포함.', unescoYear:2000},
        {id:'h7', name:'고인돌유적', era:'고조선', icon:'🪨', desc:'고창, 화순, 강화 고인돌군. 세계 고인돌의 40%가 한국에 집중.', unescoYear:2000},
        {id:'h8', name:'조선왕릉', era:'조선', icon:'👑', desc:'조선 왕실 42기 능. 500년간 일관된 풍수 원칙으로 조성.', unescoYear:2009},
        {id:'h9', name:'한국의 역사마을', era:'조선', icon:'🏘️', desc:'하회와 양동마을. 유교 문화와 전통 건축이 잘 보존된 씨족마을.', unescoYear:2010},
        {id:'h10', name:'남한산성', era:'조선', icon:'🏔️', desc:'병자호란 때 인조가 피신한 산성. 7세기부터 축성된 방어 요새.', unescoYear:2014},
        {id:'h11', name:'백제역사유적지구', era:'삼국시대', icon:'🏛️', desc:'공주, 부여, 익산의 백제 유적. 동아시아 고대 왕국의 문화교류 증거.', unescoYear:2015},
        {id:'h12', name:'산사, 한국의 산지승원', era:'고려', icon:'🛕', desc:'통도사, 부석사, 봉정사, 법주사, 마곡사, 선암사, 대흥사 7개 사찰.', unescoYear:2018}
    ],
    militaryUnits: {
        infantry: {name:'보병', icon:'🗡️', count:100, power:1, era:0},
        cavalry: {name:'기마병', icon:'🐴', count:30, power:3, era:1},
        archer: {name:'궁수', icon:'🏹', count:50, power:2, era:0},
        spear: {name:'창병', icon:'⚔️', count:40, power:2, era:1},
        navy: {name:'수군', icon:'⛵', count:20, power:4, era:2},
        cannon: {name:'화포병', icon:'💥', count:10, power:5, era:2},
        monk: {name:'승병', icon:'📿', count:15, power:3, era:2},
        militia: {name:'의병', icon:'🛡️', count:60, power:1, era:3}
    },
    currentSeason: 0,
    seasonEffects: [
        {name:'봄', icon:'🌸', food:1.2, gold:1.0, happy:1.1, pop:1.05, weather:['맑음','비','안개','꽃샘추위']},
        {name:'여름', icon:'☀️', food:1.0, gold:0.9, happy:0.9, pop:1.0, weather:['폭염','장마','태풍','맑음']},
        {name:'가을', icon:'🍂', food:1.5, gold:1.2, happy:1.2, pop:1.0, weather:['맑음','서리','태풍','가뭄']},
        {name:'겨울', icon:'❄️', food:0.6, gold:0.8, happy:0.8, pop:0.95, weather:['눈','한파','맑음','폭설']}
    ],
    satisfaction: {security:60, food:70, education:50, culture:55, housing:65, health:45},
    factions: {
        military: {name:'무관', icon:'⚔️', power:25, loyalty:60},
        civil: {name:'문관', icon:'📖', power:30, loyalty:70},
        royal: {name:'왕실', icon:'👑', power:20, loyalty:80},
        merchant: {name:'상인', icon:'💰', power:10, loyalty:50},
        monks: {name:'승려', icon:'📿', power:10, loyalty:65},
        commoner: {name:'평민', icon:'👥', power:5, loyalty:40}
    },
    currentEraMap: 0,
    features: {}
};

// ===================== TRADE GOODS DATA =====================
var TRADE_GOODS_KEYS = ['rice','silk','celadon','hanji','ginseng','iron','salt','wood'];
var TRADE_COLORS = ['#4caf50','#e91e63','#00bcd4','#ff9800','#8bc34a','#607d8b','#f5f5f5','#795548'];

// ===================== HERITAGE DATA =====================

// ===================== TERRITORY DATA =====================
var TERRITORY_DATA = [
    {era:'고조선', year:'BC 2333~BC 108', color:'#8B7355', regions:['요동','한반도북부','만주남부'], area:100},
    {era:'삼국시대', year:'BC 57~AD 668', color:'#5B8C5A', regions:['고구려(만주~한반도북부)','백제(한반도서남부)','신라(한반도동남부)','가야(낙동강유역)'], area:150},
    {era:'고려', year:'918~1392', color:'#4A7B9D', regions:['한반도전체','탐라(제주)'], area:110},
    {era:'조선', year:'1392~1897', color:'#8B4513', regions:['한반도전체','간도일부'], area:115},
    {era:'근대', year:'1897~1910', color:'#696969', regions:['대한제국(한반도전체)'], area:105}
];

// ===================== SAVE/LOAD =====================
function saveV16State() {
    try {
        var saveObj = {
            tradeGoods: v16State.tradeGoods,
            tradeProfit: v16State.tradeProfit,
            disasterPrep: v16State.disasterPrep,
            disasterInvested: v16State.disasterInvested,
            disasterScenariosRun: v16State.disasterScenariosRun,
            disasterLastResult: v16State.disasterLastResult,
            heritageRegistered: v16State.heritageRegistered,
            militaryUnits: v16State.militaryUnits,
            currentSeason: v16State.currentSeason,
            satisfaction: v16State.satisfaction,
            factions: v16State.factions,
            currentEraMap: v16State.currentEraMap,
            features: v16State.features
        };
        localStorage.setItem('cb_v16_state', JSON.stringify(saveObj));
    } catch(e) {}
}

function loadV16State() {
    try {
        var raw = localStorage.getItem('cb_v16_state');
        if(!raw) return;
        var s = JSON.parse(raw);
        if(s.tradeGoods) { for(var k in s.tradeGoods) { if(v16State.tradeGoods[k]) { for(var p in s.tradeGoods[k]) { v16State.tradeGoods[k][p] = s.tradeGoods[k][p]; } } } }
        if(typeof s.tradeProfit === 'number') v16State.tradeProfit = s.tradeProfit;
        if(s.disasterPrep) v16State.disasterPrep = s.disasterPrep;
        if(typeof s.disasterInvested === 'number') v16State.disasterInvested = s.disasterInvested;
        if(typeof s.disasterScenariosRun === 'number') v16State.disasterScenariosRun = s.disasterScenariosRun;
        if(typeof s.disasterLastResult === 'string') v16State.disasterLastResult = s.disasterLastResult;
        if(s.heritageRegistered) v16State.heritageRegistered = s.heritageRegistered;
        if(s.militaryUnits) { for(var k in s.militaryUnits) { if(v16State.militaryUnits[k]) { for(var p in s.militaryUnits[k]) { v16State.militaryUnits[k][p] = s.militaryUnits[k][p]; } } } }
        if(typeof s.currentSeason === 'number') v16State.currentSeason = s.currentSeason;
        if(s.satisfaction) v16State.satisfaction = s.satisfaction;
        if(s.factions) { for(var k in s.factions) { if(v16State.factions[k]) { for(var p in s.factions[k]) { v16State.factions[k][p] = s.factions[k][p]; } } } }
        if(typeof s.currentEraMap === 'number') v16State.currentEraMap = s.currentEraMap;
        if(s.features) v16State.features = s.features;
    } catch(e) {}
}

// ===================== UI CREATION =====================
function addV16UI() {
    var style = document.createElement('style');
    style.textContent = '#v16-nav-bar{position:fixed;bottom:0;left:0;right:0;z-index:10008;background:linear-gradient(180deg,rgba(26,26,46,0.95),rgba(10,10,25,0.98));border-top:2px solid #c4923a;display:none;padding:4px 2px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;}#v16-nav-bar::-webkit-scrollbar{display:none;}.v16-nav-btn{display:inline-block;background:rgba(196,146,58,0.15);border:1px solid #555;border-radius:8px;color:#ffd700;padding:6px 8px;margin:0 2px;font-size:11px;cursor:pointer;text-align:center;min-width:52px;vertical-align:top;}.v16-nav-btn:hover{background:rgba(196,146,58,0.35);border-color:#ffd700;}.v16-nav-btn .nb-icon{font-size:18px;display:block;}.v16-nav-btn .nb-label{font-size:9px;color:#ccc;margin-top:2px;}.v16-feature-panel{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:10009;justify-content:center;align-items:center;padding:10px;}.v16-feature-panel.show{display:flex;}.v16-panel-box{background:linear-gradient(145deg,#2a2a3e,#1a1a2e);border:2px solid #c4923a;border-radius:16px;padding:16px;max-width:640px;width:100%;max-height:85vh;overflow-y:auto;}.v16-panel-box h2{color:#ffd700;text-align:center;font-size:18px;margin-bottom:8px;}.v16-panel-box .v16-sub{text-align:center;color:#c4923a;font-size:12px;margin-bottom:12px;}.v16-canvas-wrap{text-align:center;margin:8px 0;}.v16-canvas-wrap canvas{max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;background:#111;}.v16-btn{background:#c4923a;border:none;color:#fff;padding:6px 16px;border-radius:14px;font-size:13px;cursor:pointer;margin:4px 2px;font-weight:bold;}.v16-btn:hover{background:#e0a84a;}.v16-close{display:block;margin:10px auto 0;background:#555;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;cursor:pointer;}.v16-close:hover{background:#777;}.v16-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px;margin:8px 0;}.v16-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:8px;text-align:center;border:1px solid #444;cursor:pointer;transition:all 0.2s;}.v16-card:hover{border-color:#ffd700;background:rgba(255,215,0,0.08);}.v16-card.registered{border-color:#4caf50;background:rgba(76,175,80,0.1);}.v16-card .vc-icon{font-size:28px;}.v16-card .vc-name{font-size:11px;color:#eee;margin-top:2px;}.v16-card .vc-era{font-size:9px;color:#aaa;}';
    document.head.appendChild(style);

    var navBar = document.createElement('div');
    navBar.id = 'v16-nav-bar';
    var features = [
        {id:'trade', icon:'📊', label:'물산교역'},
        {id:'disaster', icon:'🛡️', label:'재해방비'},
        {id:'heritage', icon:'🏛️', label:'문화유산'},
        {id:'military', icon:'⚔️', label:'군사편제'},
        {id:'season', icon:'🌸', label:'계절날씨'},
        {id:'survey', icon:'📋', label:'만족도'},
        {id:'faction', icon:'👑', label:'궁중세력'},
        {id:'territory', icon:'🗺️', label:'역사강역'},
        {id:'v16close', icon:'✖️', label:'닫기'}
    ];
    features.forEach(function(f) {
        var btn = document.createElement('div');
        btn.className = 'v16-nav-btn';
        btn.innerHTML = '<span class="nb-icon">' + f.icon + '</span><span class="nb-label">' + f.label + '</span>';
        btn.onclick = function() {
            if(f.id === 'v16close') { navBar.style.display = 'none'; return; }
            openV16Feature(f.id);
        };
        navBar.appendChild(btn);
    });
    document.body.appendChild(navBar);

    createFeaturePanels();

    var togBtn = document.createElement('button');
    togBtn.id = 'v16-toggle-btn';
    togBtn.style.cssText = 'position:fixed;bottom:140px;left:10px;z-index:10007;background:rgba(0,0,0,0.75);border:1px solid #c4923a;color:#ffd700;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;';
    togBtn.textContent = '🏪';
    togBtn.title = 'v16 기능 (물산교역/재해방비/문화유산/군사편제/계절날씨/만족도/궁중세력/역사강역)';
    togBtn.onclick = function() {
        var nb = document.getElementById('v16-nav-bar');
        nb.style.display = nb.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(togBtn);
}

function createFeaturePanels() {
    var panelDefs = [
        {id:'trade', title:'📊 물산교역시장', sub:'8종 물산의 수요/공급에 따라 매매하여 이익을 남기세요'},
        {id:'disaster', title:'🛡️ 자연재해방비계획', sub:'6종 재해에 대한 방비도를 높여 도시를 보호하세요'},
        {id:'heritage', title:'🏛️ 문화유산등록부', sub:'12종 한국 유네스코 세계유산을 등록하고 관리하세요'},
        {id:'military', title:'⚔️ 군사편제도', sub:'8종 병종의 편제를 관리하고 군사력을 키우세요'},
        {id:'season', title:'🌸 계절날씨영향도', sub:'4계절 x 4날씨가 도시에 미치는 영향을 확인하세요'},
        {id:'survey', title:'📋 백성만족도조사', sub:'6분야 만족도를 조사하고 등급을 확인하세요'},
        {id:'faction', title:'👑 궁중세력도', sub:'6대 세력의 권력 분포와 충성도를 파악하세요'},
        {id:'territory', title:'🗺️ 역사강역지도', sub:'5시대 한국의 영토 변천을 지도로 살펴보세요'}
    ];
    panelDefs.forEach(function(pd) {
        var panel = document.createElement('div');
        panel.id = 'v16-panel-' + pd.id;
        panel.className = 'v16-feature-panel';
        panel.innerHTML = '<div class="v16-panel-box"><h2>' + pd.title + '</h2><div class="v16-sub">' + pd.sub + '</div><div id="v16-content-' + pd.id + '"></div><div class="v16-canvas-wrap"><canvas id="v16-canvas-' + pd.id + '"></canvas></div><div id="v16-actions-' + pd.id + '" style="text-align:center;margin:8px 0;"></div><button class="v16-close" onclick="document.getElementById(\'v16-panel-' + pd.id + '\').classList.remove(\'show\')">닫기</button></div>';
        document.body.appendChild(panel);
    });
}

function openV16Feature(id) {
    document.querySelectorAll('.v16-feature-panel').forEach(function(p) { p.classList.remove('show'); });
    var panel = document.getElementById('v16-panel-' + id);
    if(panel) {
        panel.classList.add('show');
        switch(id) {
            case 'trade': renderTradeMarket(); break;
            case 'disaster': renderDisasterPrep(); break;
            case 'heritage': renderHeritageRegistry(); break;
            case 'military': renderMilitaryOrg(); break;
            case 'season': renderSeasonWeather(); break;
            case 'survey': renderSatisfaction(); break;
            case 'faction': renderFactionMap(); break;
            case 'territory': renderTerritoryMap(); break;
        }
    }
}

// ===================== 1. TRADE GOODS MARKET =====================
function renderTradeMarket() {
    var content = document.getElementById('v16-content-trade');
    var html = '<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:8px;">';
    TRADE_GOODS_KEYS.forEach(function(k) {
        var g = v16State.tradeGoods[k];
        var trend = g.demand > g.supply ? '📈' : g.demand < g.supply ? '📉' : '➡️';
        html += '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:6px 8px;min-width:80px;text-align:center;border:1px solid #444;">';
        html += '<div style="font-size:22px;">' + g.icon + '</div>';
        html += '<div style="font-size:11px;color:#eee;">' + g.name + '</div>';
        html += '<div style="font-size:10px;color:#ffd700;">💰' + g.price + ' ' + trend + '</div>';
        html += '<div style="font-size:9px;color:#aaa;">보유: ' + g.owned + '</div>';
        html += '<button class="v16-btn" style="font-size:10px;padding:3px 8px;margin:2px;" onclick="v16Buy(\'' + k + '\')">매수</button>';
        html += '<button class="v16-btn" style="font-size:10px;padding:3px 8px;margin:2px;background:#e91e63;" onclick="v16Sell(\'' + k + '\')">매도</button>';
        html += '</div>';
    });
    html += '</div>';
    html += '<div style="text-align:center;font-size:13px;color:#8bc34a;">총 이익: 💰' + v16State.tradeProfit + '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-trade');
    canvas.width = 580; canvas.height = 360;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 580, 360);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('물산 수요/공급 차트', 290, 24);

    var barW = 50, gap = 18, startX = 40;
    TRADE_GOODS_KEYS.forEach(function(k, i) {
        var g = v16State.tradeGoods[k];
        var x = startX + i * (barW + gap);
        var maxH = 250;

        var supH = (g.supply / 100) * maxH;
        ctx.fillStyle = 'rgba(76,175,80,0.6)';
        ctx.fillRect(x, 310 - supH, barW / 2 - 2, supH);

        var demH = (g.demand / 100) * maxH;
        ctx.fillStyle = 'rgba(244,67,54,0.6)';
        ctx.fillRect(x + barW / 2 + 2, 310 - demH, barW / 2 - 2, demH);

        ctx.fillStyle = '#ccc';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(g.icon, x + barW / 2, 330);
        ctx.fillText(g.name, x + barW / 2, 345);

        ctx.fillStyle = '#4caf50';
        ctx.font = '9px sans-serif';
        ctx.fillText(g.supply, x + barW / 4, 305 - supH);
        ctx.fillStyle = '#f44336';
        ctx.fillText(g.demand, x + 3 * barW / 4, 305 - demH);
    });

    ctx.fillStyle = '#4caf50'; ctx.fillRect(420, 340, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('공급', 434, 350);
    ctx.fillStyle = '#f44336'; ctx.fillRect(470, 340, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('수요', 484, 350);
}

window.v16Buy = function(key) {
    var g = v16State.tradeGoods[key];
    if(typeof resources !== 'undefined' && resources.gold >= g.price) {
        resources.gold -= g.price;
        g.owned++;
        g.demand = Math.min(100, g.demand + 2);
        g.price = Math.max(1, Math.round(g.price * (1 + (g.demand - g.supply) / 200)));
        playV16SFX('trade_buy');
        if(typeof toast === 'function') toast(g.icon + ' ' + g.name + ' 매수! (💰' + g.price + ')');
        if(typeof addChronicle === 'function') addChronicle(g.icon, g.name + '을(를) 매입했습니다.');
        saveV16State();
        renderTradeMarket();
    } else {
        if(typeof toast === 'function') toast('금이 부족합니다!');
    }
};

window.v16Sell = function(key) {
    var g = v16State.tradeGoods[key];
    if(g.owned > 0) {
        g.owned--;
        var sellPrice = Math.round(g.price * 1.1);
        if(typeof resources !== 'undefined') resources.gold += sellPrice;
        v16State.tradeProfit += sellPrice;
        g.supply = Math.min(100, g.supply + 2);
        g.price = Math.max(1, Math.round(g.price * (1 - (g.supply - g.demand) / 300)));
        playV16SFX('trade_sell');
        if(typeof toast === 'function') toast(g.icon + ' ' + g.name + ' 매도! (+💰' + sellPrice + ')');
        if(typeof addChronicle === 'function') addChronicle(g.icon, g.name + '을(를) ' + sellPrice + '금에 매도했습니다.');
        saveV16State();
        renderTradeMarket();
    } else {
        if(typeof toast === 'function') toast('보유한 ' + g.name + '이(가) 없습니다!');
    }
};

// ===================== 2. DISASTER PREPAREDNESS =====================
var V16_DISASTERS = [
    {key:'earthquake', name:'지진', icon:'🌍', baseRisk:35, tip:'내진 설계 건물을 짓고 대피 훈련을 실시하세요'},
    {key:'flood', name:'홍수', icon:'🌊', baseRisk:55, tip:'제방을 쌓고 배수 시설을 정비하세요'},
    {key:'drought', name:'가뭄', icon:'☀️', baseRisk:50, tip:'저수지(제언)와 관개 수로를 건설하세요'},
    {key:'typhoon', name:'태풍', icon:'🌪️', baseRisk:45, tip:'방풍림을 심고 건물을 보강하세요'},
    {key:'wildfire', name:'산불', icon:'🔥', baseRisk:30, tip:'금화도감처럼 방화선을 만들고 소방대를 조직하세요'},
    {key:'plague', name:'역병', icon:'🦠', baseRisk:60, tip:'활인서처럼 위생 시설을 확충하고 격리 체계를 갖추세요'}
];

function renderDisasterPrep() {
    var disasters = V16_DISASTERS;

    var content = document.getElementById('v16-content-disaster');
    var html = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;">';
    disasters.forEach(function(d) {
        var score = v16State.disasterPrep[d.key];
        var grade = score >= 80 ? 'S' : score >= 60 ? 'A' : score >= 40 ? 'B' : score >= 20 ? 'C' : 'D';
        var gradeColor = score >= 80 ? '#ffd700' : score >= 60 ? '#4caf50' : score >= 40 ? '#2196f3' : score >= 20 ? '#ff9800' : '#f44336';
        html += '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:8px;text-align:center;">';
        html += '<div style="font-size:24px;">' + d.icon + '</div>';
        html += '<div style="font-size:12px;color:#eee;">' + d.name + '</div>';
        html += '<div style="font-size:18px;font-weight:bold;color:' + gradeColor + ';">' + grade + ' (' + score + '%)</div>';
        html += '<div style="font-size:9px;color:#aaa;margin:4px 0;">' + d.tip + '</div>';
        html += '<button class="v16-btn" style="font-size:10px;padding:3px 8px;" onclick="v16InvestDisaster(\'' + d.key + '\')">투자 (💰50)</button>';
        html += '</div>';
    });
    html += '</div>';
    html += '<div style="text-align:center;font-size:12px;color:#aaa;">총 투자액: 💰' + v16State.disasterInvested + '</div>';
    html += '<div style="text-align:center;margin-top:6px;"><button class="v16-btn" style="background:#8b3a3a;" onclick="v16RunDisasterScenario()">⚠️ 재해 시나리오 실행</button></div>';
    if(v16State.disasterLastResult) {
        html += '<div style="text-align:center;font-size:11px;color:#ccc;margin-top:4px;">' + v16State.disasterLastResult + '</div>';
    }
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-disaster');
    canvas.width = 600; canvas.height = 380;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 600, 380);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('재해방비도 레이더 차트', 300, 24);

    var cx = 300, cy = 210, radius = 140;
    var keys = disasters.map(function(d) { return d.key; });
    var labels = disasters.map(function(d) { return d.icon + ' ' + d.name; });

    for(var ring = 1; ring <= 5; ring++) {
        var r = radius * ring / 5;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        for(var j = 0; j < 6; j++) {
            var angle = (Math.PI * 2 * j / 6) - Math.PI / 2;
            var px = cx + r * Math.cos(angle);
            var py = cy + r * Math.sin(angle);
            if(j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.stroke();

        var labelR = radius + 22;
        ctx.fillStyle = '#ccc';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle));
    }

    ctx.beginPath();
    ctx.fillStyle = 'rgba(76,175,80,0.25)';
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        var val = v16State.disasterPrep[keys[i]] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        var val = v16State.disasterPrep[keys[i]] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#4caf50';
        ctx.fill();
    }
}

window.v16InvestDisaster = function(key) {
    var d = V16_DISASTERS.find(function(x) { return x.key === key; }) || {name:key, icon:'🛡️'};
    if(typeof resources !== 'undefined' && resources.gold >= 50) {
        resources.gold -= 50;
        v16State.disasterPrep[key] = Math.min(100, v16State.disasterPrep[key] + 10);
        v16State.disasterInvested += 50;
        playV16SFX('disaster_safe');
        if(typeof toast === 'function') toast('🛡️ ' + d.icon + ' ' + d.name + ' 방비도 강화! (+10%)');
        if(typeof addChronicle === 'function') addChronicle(d.icon, d.name + ' 방비를 위해 투자했습니다.');
        saveV16State();
        renderDisasterPrep();
    } else {
        if(typeof toast === 'function') toast('금이 부족합니다!');
    }
};

window.v16RunDisasterScenario = function() {
    var pick = V16_DISASTERS[Math.floor(Math.random() * V16_DISASTERS.length)];
    var prep = v16State.disasterPrep[pick.key] || 0;
    var risk = Math.max(0, pick.baseRisk - prep * 0.7);
    var damage = Math.round(risk * 0.4);
    v16State.disasterScenariosRun = (v16State.disasterScenariosRun || 0) + 1;

    if(prep >= 80) {
        if(typeof resources !== 'undefined') resources.culture = (resources.culture || 0) + 8;
        v16State.disasterLastResult = pick.icon + ' ' + pick.name + ' 발생! 철저한 방비로 피해 없음 (문화 +8)';
        playV16SFX('disaster_safe');
        if(typeof toast === 'function') toast(v16State.disasterLastResult);
        if(typeof addChronicle === 'function') addChronicle(pick.icon, pick.name + '이(가) 발생했으나 철저한 방비로 피해를 막았습니다.');
    } else {
        if(typeof resources !== 'undefined') {
            resources.gold = Math.max(0, (resources.gold || 0) - damage);
            resources.happy = Math.max(0, (resources.happy || 0) - Math.round(damage * 0.3));
        }
        v16State.disasterLastResult = pick.icon + ' ' + pick.name + ' 발생! 피해 -' + damage + '금 (방비 부족)';
        playV16SFX('disaster_warn');
        if(typeof toast === 'function') toast(v16State.disasterLastResult);
        if(typeof addChronicle === 'function') addChronicle(pick.icon, pick.name + '이(가) 발생하여 ' + damage + '금의 피해를 입었습니다.');
    }
    saveV16State();
    renderDisasterPrep();
};

// ===================== 3. CULTURAL HERITAGE REGISTRY =====================
function renderHeritageRegistry() {
    var content = document.getElementById('v16-content-heritage');
    var regCount = v16State.heritageRegistered.length;
    var html = '<div style="text-align:center;margin-bottom:8px;font-size:13px;color:#8bc34a;">등록 현황: ' + regCount + ' / 12</div>';
    html += '<div class="v16-grid">';
    v16State.heritageItems.forEach(function(item) {
        var isReg = v16State.heritageRegistered.indexOf(item.id) >= 0;
        html += '<div class="v16-card' + (isReg ? ' registered' : '') + '" onclick="v16RegisterHeritage(\'' + item.id + '\')">';
        html += '<div class="vc-icon">' + item.icon + '</div>';
        html += '<div class="vc-name">' + item.name + (isReg ? ' ✅' : '') + '</div>';
        html += '<div class="vc-era">' + item.era + ' | ' + item.unescoYear + '</div>';
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-heritage');
    canvas.width = 560; canvas.height = 340;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 560, 340);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('유네스코 세계유산 등록 현황', 280, 24);

    var eraGroups = {};
    v16State.heritageItems.forEach(function(item) {
        if(!eraGroups[item.era]) eraGroups[item.era] = {total:0, registered:0};
        eraGroups[item.era].total++;
        if(v16State.heritageRegistered.indexOf(item.id) >= 0) eraGroups[item.era].registered++;
    });

    var eras = Object.keys(eraGroups);
    var barW = 80, gap = 20, startX = (560 - eras.length * (barW + gap)) / 2 + gap / 2;
    var eraColors = {'고조선':'#8B7355','삼국시대':'#5B8C5A','고려':'#4A7B9D','조선':'#8B4513','근대':'#696969'};

    eras.forEach(function(era, i) {
        var x = startX + i * (barW + gap);
        var eg = eraGroups[era];
        var totalH = eg.total * 50;
        var regH = eg.registered * 50;
        var baseY = 280;

        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(x, baseY - totalH, barW, totalH);

        ctx.fillStyle = eraColors[era] || '#666';
        ctx.fillRect(x, baseY - regH, barW, regH);

        ctx.fillStyle = '#ccc';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(era, x + barW / 2, baseY + 16);
        ctx.fillText(eg.registered + '/' + eg.total, x + barW / 2, baseY - totalH - 8);
    });

    var totalPct = regCount > 0 ? Math.round(regCount / 12 * 100) : 0;
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('등록률: ' + totalPct + '%', 280, 320);
}

window.v16RegisterHeritage = function(id) {
    if(v16State.heritageRegistered.indexOf(id) >= 0) {
        var item = v16State.heritageItems.find(function(h) { return h.id === id; });
        if(item && typeof toast === 'function') toast(item.icon + ' ' + item.name + ': ' + item.desc);
        return;
    }
    var cost = 100;
    if(typeof resources !== 'undefined' && resources.gold >= cost && resources.culture >= 10) {
        resources.gold -= cost;
        resources.culture -= 10;
        v16State.heritageRegistered.push(id);
        playV16SFX('heritage_reg');
        var item = v16State.heritageItems.find(function(h) { return h.id === id; });
        if(item && typeof toast === 'function') toast('🏛️ ' + item.name + ' 세계유산 등록! (' + item.unescoYear + ')');
        if(item && typeof addChronicle === 'function') addChronicle(item.icon, item.name + '이(가) 문화유산으로 등록되었습니다.');
        saveV16State();
        renderHeritageRegistry();
    } else {
        if(typeof toast === 'function') toast('금 100 + 문화 10이 필요합니다!');
    }
};

// ===================== 4. MILITARY ORGANIZATION =====================
function renderMilitaryOrg() {
    var content = document.getElementById('v16-content-military');
    var totalPower = 0;
    var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;">';
    var unitKeys = Object.keys(v16State.militaryUnits);
    unitKeys.forEach(function(k) {
        var u = v16State.militaryUnits[k];
        var unitPower = u.count * u.power;
        totalPower += unitPower;
        html += '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:6px;text-align:center;border:1px solid #444;">';
        html += '<div style="font-size:22px;">' + u.icon + '</div>';
        html += '<div style="font-size:11px;color:#eee;">' + u.name + '</div>';
        html += '<div style="font-size:10px;color:#ffd700;">' + u.count + '명</div>';
        html += '<div style="font-size:9px;color:#aaa;">전투력: ' + unitPower + '</div>';
        html += '<button class="v16-btn" style="font-size:9px;padding:2px 6px;" onclick="v16RecruitUnit(\'' + k + '\')">징병(💰30)</button>';
        html += '</div>';
    });
    html += '</div>';
    html += '<div style="text-align:center;font-size:14px;color:#ffd700;font-weight:bold;">총 군사력: ⚔️ ' + totalPower + '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-military');
    canvas.width = 600; canvas.height = 380;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 600, 380);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('군사편제 병력 현황', 300, 24);

    var barW = 50, gap = 20, startX = 40;
    var maxCount = 0;
    unitKeys.forEach(function(k) { maxCount = Math.max(maxCount, v16State.militaryUnits[k].count); });
    if(maxCount === 0) maxCount = 1;

    var unitColors = ['#f44336','#e91e63','#ff9800','#ff5722','#2196f3','#9c27b0','#4caf50','#795548'];
    unitKeys.forEach(function(k, i) {
        var u = v16State.militaryUnits[k];
        var x = startX + i * (barW + gap);
        var maxH = 250;
        var h = (u.count / maxCount) * maxH;

        ctx.fillStyle = unitColors[i];
        ctx.fillRect(x, 310 - h, barW, h);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(u.count, x + barW / 2, 305 - h);

        ctx.fillStyle = '#ccc';
        ctx.font = '10px sans-serif';
        ctx.fillText(u.icon, x + barW / 2, 328);
        ctx.fillText(u.name, x + barW / 2, 342);
    });

    var powerGaugeY = 360;
    var gaugeW = 520, gaugeH = 12;
    var gaugeX = 40;
    ctx.fillStyle = '#333';
    ctx.fillRect(gaugeX, powerGaugeY, gaugeW, gaugeH);
    var powerPct = Math.min(1, totalPower / 2000);
    var grd = ctx.createLinearGradient(gaugeX, 0, gaugeX + gaugeW * powerPct, 0);
    grd.addColorStop(0, '#f44336');
    grd.addColorStop(0.5, '#ff9800');
    grd.addColorStop(1, '#4caf50');
    ctx.fillStyle = grd;
    ctx.fillRect(gaugeX, powerGaugeY, gaugeW * powerPct, gaugeH);
    ctx.fillStyle = '#ffd700';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('총 전투력: ' + totalPower, gaugeX + gaugeW, powerGaugeY - 4);
}

window.v16RecruitUnit = function(key) {
    if(typeof resources !== 'undefined' && resources.gold >= 30) {
        resources.gold -= 30;
        v16State.militaryUnits[key].count += 10;
        playV16SFX('military_march');
        if(typeof toast === 'function') toast('⚔️ ' + v16State.militaryUnits[key].name + ' 10명 징병!');
        saveV16State();
        renderMilitaryOrg();
    } else {
        if(typeof toast === 'function') toast('금이 부족합니다!');
    }
};

// ===================== 5. SEASONAL WEATHER IMPACT =====================
function renderSeasonWeather() {
    var content = document.getElementById('v16-content-season');
    var s = v16State.seasonEffects[v16State.currentSeason];
    var html = '<div style="text-align:center;margin-bottom:8px;">';
    html += '<div style="font-size:36px;">' + s.icon + '</div>';
    html += '<div style="font-size:16px;color:#ffd700;font-weight:bold;">' + s.name + '</div>';
    html += '<div style="display:flex;justify-content:center;gap:12px;margin:8px 0;">';
    html += '<span style="color:#4caf50;">🌾 식량 x' + s.food + '</span>';
    html += '<span style="color:#ffd700;">💰 금 x' + s.gold + '</span>';
    html += '<span style="color:#e91e63;">😊 행복 x' + s.happy + '</span>';
    html += '<span style="color:#2196f3;">👥 인구 x' + s.pop + '</span>';
    html += '</div>';
    html += '<div style="font-size:11px;color:#aaa;">날씨 유형: ' + s.weather.join(', ') + '</div>';
    html += '<div style="margin-top:8px;">';
    v16State.seasonEffects.forEach(function(se, i) {
        var isCurrent = i === v16State.currentSeason;
        html += '<button class="v16-btn" style="' + (isCurrent ? 'background:#ffd700;color:#000;' : '') + 'font-size:11px;padding:4px 10px;" onclick="v16ChangeSeason(' + i + ')">' + se.icon + ' ' + se.name + '</button>';
    });
    html += '</div></div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-season');
    canvas.width = 560; canvas.height = 360;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 560, 360);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('계절별 자원 영향도 (배율)', 280, 24);

    var categories = ['식량', '금', '행복', '인구'];
    var catKeys = ['food', 'gold', 'happy', 'pop'];
    var catColors = ['#4caf50', '#ffd700', '#e91e63', '#2196f3'];
    var seasonIcons = ['🌸','☀️','🍂','❄️'];

    var groupW = 100, barW = 18, startX = 60;

    for(var si = 0; si < 4; si++) {
        var se = v16State.seasonEffects[si];
        var gx = startX + si * (groupW + 30);

        ctx.fillStyle = '#ccc';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(seasonIcons[si] + ' ' + se.name, gx + groupW / 2, 50);

        for(var ci = 0; ci < 4; ci++) {
            var val = se[catKeys[ci]];
            var barH = val * 150;
            var baseH = 1.0 * 150;
            var x = gx + ci * (barW + 4);
            var baseY = 300;

            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.fillRect(x, baseY - 225, barW, 225);

            ctx.fillStyle = catColors[ci];
            ctx.globalAlpha = 0.7;
            ctx.fillRect(x, baseY - barH, barW, barH);
            ctx.globalAlpha = 1.0;

            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(x, baseY - baseH);
            ctx.lineTo(x + barW, baseY - baseH);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#fff';
            ctx.font = '8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('x' + val, x + barW / 2, baseY - barH - 4);
        }

        if(si === v16State.currentSeason) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(gx - 4, 38, groupW + 8, 270);
            ctx.lineWidth = 1;
        }
    }

    categories.forEach(function(cat, i) {
        ctx.fillStyle = catColors[i];
        ctx.fillRect(80 + i * 120, 330, 10, 10);
        ctx.fillStyle = '#aaa';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(cat, 94 + i * 120, 340);
    });
}

window.v16ChangeSeason = function(idx) {
    v16State.currentSeason = idx;
    playV16SFX('season_change');
    saveV16State();
    renderSeasonWeather();
};

// ===================== 6. CITIZEN SATISFACTION SURVEY =====================
function renderSatisfaction() {
    var cats = [
        {key:'security', name:'치안', icon:'🛡️'},
        {key:'food', name:'식량', icon:'🌾'},
        {key:'education', name:'교육', icon:'📚'},
        {key:'culture', name:'문화', icon:'🎭'},
        {key:'housing', name:'주거', icon:'🏠'},
        {key:'health', name:'보건', icon:'💊'}
    ];

    var content = document.getElementById('v16-content-survey');
    var total = 0;
    cats.forEach(function(c) { total += v16State.satisfaction[c.key]; });
    var avg = Math.round(total / cats.length);
    var grade = avg >= 80 ? 'S' : avg >= 65 ? 'A' : avg >= 50 ? 'B' : avg >= 35 ? 'C' : 'D';
    var gradeColor = avg >= 80 ? '#ffd700' : avg >= 65 ? '#4caf50' : avg >= 50 ? '#2196f3' : avg >= 35 ? '#ff9800' : '#f44336';

    var html = '<div style="text-align:center;margin-bottom:8px;">';
    html += '<div style="font-size:32px;font-weight:bold;color:' + gradeColor + ';">' + grade + '</div>';
    html += '<div style="font-size:13px;color:#aaa;">종합 만족도: ' + avg + '점</div>';
    html += '<button class="v16-btn" style="margin-top:6px;" onclick="v16RunSurvey()">📊 만족도 조사 실시</button>';
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-survey');
    canvas.width = 580; canvas.height = 360;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 580, 360);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('백성 만족도 조사 결과', 290, 24);

    var barH = 30, gap = 12, startY = 50, maxW = 350, labelW = 90;
    var barColors = ['#f44336','#4caf50','#2196f3','#9c27b0','#ff9800','#00bcd4'];

    cats.forEach(function(c, i) {
        var val = v16State.satisfaction[c.key];
        var y = startY + i * (barH + gap);
        var w = (val / 100) * maxW;

        ctx.fillStyle = '#ccc';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(c.icon + ' ' + c.name, labelW, y + barH / 2 + 4);

        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(labelW + 10, y, maxW, barH);

        ctx.fillStyle = barColors[i];
        ctx.globalAlpha = 0.8;
        ctx.fillRect(labelW + 10, y, w, barH);
        ctx.globalAlpha = 1.0;

        var g = val >= 80 ? 'S' : val >= 65 ? 'A' : val >= 50 ? 'B' : val >= 35 ? 'C' : 'D';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(val + '% (' + g + ')', labelW + 15 + w, y + barH / 2 + 4);
    });

    var gradeY = startY + 6 * (barH + gap) + 20;
    ctx.fillStyle = gradeColor;
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(grade, 480, gradeY + 20);
    ctx.fillStyle = '#aaa';
    ctx.font = '12px sans-serif';
    ctx.fillText('종합 등급', 480, gradeY + 40);
    ctx.fillText(avg + '점', 480, gradeY + 56);
}

window.v16RunSurvey = function() {
    if(typeof resources === 'undefined') return;
    var cats = ['security','food','education','culture','housing','health'];
    cats.forEach(function(key) {
        var base = 40;
        if(key === 'food') base += Math.min(30, resources.food / 5);
        if(key === 'security') base += Math.min(30, resources.happy / 3);
        if(key === 'education') base += Math.min(30, resources.culture / 4);
        if(key === 'culture') base += Math.min(30, resources.culture / 3);
        if(key === 'housing') base += Math.min(30, resources.pop / 10);
        if(key === 'health') base += Math.min(30, resources.happy / 4);
        v16State.satisfaction[key] = Math.min(100, Math.max(0, Math.round(base + (Math.random() * 10 - 5))));
    });
    playV16SFX('survey_done');
    if(typeof toast === 'function') toast('📋 만족도 조사 완료!');
    saveV16State();
    renderSatisfaction();
};

// ===================== 7. ROYAL COURT FACTION MAP =====================
function renderFactionMap() {
    var content = document.getElementById('v16-content-faction');
    var factionKeys = Object.keys(v16State.factions);
    var totalPower = 0;
    factionKeys.forEach(function(k) { totalPower += v16State.factions[k].power; });

    var html = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;">';
    factionKeys.forEach(function(k) {
        var f = v16State.factions[k];
        var pct = totalPower > 0 ? Math.round(f.power / totalPower * 100) : 0;
        html += '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:8px;text-align:center;border:1px solid #444;">';
        html += '<div style="font-size:22px;">' + f.icon + '</div>';
        html += '<div style="font-size:12px;color:#eee;">' + f.name + '</div>';
        html += '<div style="font-size:10px;color:#ffd700;">권력: ' + pct + '%</div>';
        html += '<div style="font-size:9px;color:#aaa;">충성도: ' + f.loyalty + '</div>';
        html += '<button class="v16-btn" style="font-size:9px;padding:2px 6px;" onclick="v16BoostFaction(\'' + k + '\')">후원(💰40)</button>';
        html += '</div>';
    });
    html += '</div>';
    html += '<button class="v16-btn" onclick="v16PoliticalEvent()">🎲 정치 이벤트 발생</button>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-faction');
    canvas.width = 580; canvas.height = 380;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 580, 380);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('궁중 세력 분포도', 290, 24);

    var cx = 180, cy = 200, r = 130;
    var pieColors = ['#f44336','#2196f3','#ffd700','#4caf50','#9c27b0','#ff9800'];
    var startAngle = -Math.PI / 2;

    factionKeys.forEach(function(k, i) {
        var f = v16State.factions[k];
        var pct = totalPower > 0 ? f.power / totalPower : 0;
        var sliceAngle = pct * Math.PI * 2;
        var endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = pieColors[i];
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if(pct > 0.05) {
            var midAngle = startAngle + sliceAngle / 2;
            var labelR = r * 0.65;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(f.icon + ' ' + Math.round(pct * 100) + '%', cx + labelR * Math.cos(midAngle), cy + labelR * Math.sin(midAngle));
        }

        startAngle = endAngle;
    });

    var barX = 370, barY = 50, barW = 180, barH = 22;
    ctx.fillStyle = '#ccc';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('충성도 현황', barX, barY - 8);

    factionKeys.forEach(function(k, i) {
        var f = v16State.factions[k];
        var y = barY + i * (barH + 8);
        ctx.fillStyle = '#ccc';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(f.icon + ' ' + f.name, barX, y + barH / 2 + 3);

        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(barX + 55, y, barW - 55, barH);

        var w = (f.loyalty / 100) * (barW - 55);
        ctx.fillStyle = pieColors[i];
        ctx.globalAlpha = 0.7;
        ctx.fillRect(barX + 55, y, w, barH);
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.fillText(f.loyalty + '%', barX + 58 + w, y + barH / 2 + 3);
    });
}

window.v16BoostFaction = function(key) {
    if(typeof resources !== 'undefined' && resources.gold >= 40) {
        resources.gold -= 40;
        v16State.factions[key].power += 5;
        v16State.factions[key].loyalty = Math.min(100, v16State.factions[key].loyalty + 5);
        playV16SFX('faction_shift');
        if(typeof toast === 'function') toast('👑 ' + v16State.factions[key].name + ' 세력 강화!');
        saveV16State();
        renderFactionMap();
    } else {
        if(typeof toast === 'function') toast('금이 부족합니다!');
    }
};

window.v16PoliticalEvent = function() {
    var events = [
        {name:'문관의 상소', desc:'문관들이 개혁을 요구합니다.', faction:'civil', change:8},
        {name:'무관의 반발', desc:'무관들이 군비 증강을 주장합니다.', faction:'military', change:8},
        {name:'상인의 로비', desc:'상인들이 시장 개방을 요청합니다.', faction:'merchant', change:10},
        {name:'승려의 건의', desc:'승려들이 사찰 보호를 요청합니다.', faction:'monks', change:8},
        {name:'민심 동요', desc:'평민들이 세금 감면을 요구합니다.', faction:'commoner', change:12},
        {name:'왕실 위엄', desc:'왕실이 권위를 강화합니다.', faction:'royal', change:6}
    ];
    var ev = events[Math.floor(Math.random() * events.length)];
    v16State.factions[ev.faction].power += ev.change;
    var otherKeys = Object.keys(v16State.factions).filter(function(k) { return k !== ev.faction; });
    var reduceEach = Math.ceil(ev.change / otherKeys.length);
    otherKeys.forEach(function(k) {
        v16State.factions[k].power = Math.max(1, v16State.factions[k].power - reduceEach);
    });
    playV16SFX('faction_shift');
    if(typeof toast === 'function') toast('👑 ' + ev.name + ': ' + ev.desc);
    saveV16State();
    renderFactionMap();
};

// ===================== 8. HISTORICAL TERRITORY MAP =====================
function renderTerritoryMap() {
    var content = document.getElementById('v16-content-territory');
    var td = TERRITORY_DATA[v16State.currentEraMap];
    var html = '<div style="text-align:center;margin-bottom:8px;">';
    html += '<div style="font-size:16px;color:#ffd700;font-weight:bold;">' + td.era + ' (' + td.year + ')</div>';
    html += '<div style="font-size:12px;color:#aaa;margin:4px 0;">주요 영역: ' + td.regions.join(', ') + '</div>';
    html += '<div style="margin-top:6px;">';
    TERRITORY_DATA.forEach(function(t, i) {
        var isCurrent = i === v16State.currentEraMap;
        html += '<button class="v16-btn" style="' + (isCurrent ? 'background:#ffd700;color:#000;' : '') + 'font-size:11px;padding:4px 10px;" onclick="v16ChangeEraMap(' + i + ')">' + t.era + '</button>';
    });
    html += '</div></div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v16-canvas-territory');
    canvas.width = 620; canvas.height = 400;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 620, 400);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('역사 강역 지도 — ' + td.era, 310, 24);

    var mapX = 60, mapY = 40, mapW = 280, mapH = 320;

    ctx.fillStyle = '#1a3a5a';
    ctx.fillRect(mapX, mapY, mapW, mapH);

    ctx.strokeStyle = '#2a4a6a';
    ctx.lineWidth = 1;
    for(var gx = mapX; gx <= mapX + mapW; gx += 28) {
        ctx.beginPath(); ctx.moveTo(gx, mapY); ctx.lineTo(gx, mapY + mapH); ctx.stroke();
    }
    for(var gy = mapY; gy <= mapY + mapH; gy += 32) {
        ctx.beginPath(); ctx.moveTo(mapX, gy); ctx.lineTo(mapX + mapW, gy); ctx.stroke();
    }

    var eraIdx = v16State.currentEraMap;
    ctx.fillStyle = td.color;
    ctx.globalAlpha = 0.5;

    if(eraIdx === 0) {
        ctx.fillRect(mapX + 20, mapY + 20, 240, 140);
        ctx.fillStyle = '#ffd700'; ctx.globalAlpha = 0.3;
        ctx.fillRect(mapX + 60, mapY + 40, 160, 80);
    } else if(eraIdx === 1) {
        ctx.fillStyle = '#e74c3c'; ctx.globalAlpha = 0.4;
        ctx.fillRect(mapX + 20, mapY + 20, 240, 100);
        ctx.fillStyle = '#3498db'; ctx.globalAlpha = 0.4;
        ctx.fillRect(mapX + 20, mapY + 130, 120, 130);
        ctx.fillStyle = '#2ecc71'; ctx.globalAlpha = 0.4;
        ctx.fillRect(mapX + 150, mapY + 130, 110, 130);
        ctx.fillStyle = '#f39c12'; ctx.globalAlpha = 0.4;
        ctx.fillRect(mapX + 100, mapY + 220, 80, 60);
    } else if(eraIdx === 2) {
        ctx.fillRect(mapX + 40, mapY + 40, 200, 260);
    } else if(eraIdx === 3) {
        ctx.fillRect(mapX + 40, mapY + 40, 200, 260);
        ctx.fillStyle = '#8B4513'; ctx.globalAlpha = 0.3;
        ctx.fillRect(mapX + 30, mapY + 30, 220, 10);
    } else {
        ctx.fillRect(mapX + 40, mapY + 40, 200, 260);
    }
    ctx.globalAlpha = 1.0;

    if(eraIdx === 1) {
        ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('고구려', mapX + 140, mapY + 70);
        ctx.fillText('백제', mapX + 80, mapY + 200);
        ctx.fillText('신라', mapX + 200, mapY + 200);
        ctx.fillText('가야', mapX + 140, mapY + 250);
    } else {
        ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(td.era, mapX + mapW / 2, mapY + mapH / 2);
    }

    var chartX = 380, chartY = 60, chartW = 200, chartH = 200;
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('시대별 영토 비교', chartX + chartW / 2, chartY - 8);

    var maxArea = 0;
    TERRITORY_DATA.forEach(function(t) { maxArea = Math.max(maxArea, t.area); });
    var barH = 28, barGap = 10;

    TERRITORY_DATA.forEach(function(t, i) {
        var y = chartY + i * (barH + barGap);
        var w = (t.area / maxArea) * chartW;
        var isCurrent = i === v16State.currentEraMap;

        ctx.fillStyle = isCurrent ? t.color : 'rgba(255,255,255,0.1)';
        ctx.globalAlpha = isCurrent ? 0.8 : 0.4;
        ctx.fillRect(chartX, y, w, barH);
        ctx.globalAlpha = 1.0;

        if(isCurrent) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(chartX, y, w, barH);
            ctx.lineWidth = 1;
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(t.era, chartX + 4, y + barH / 2 + 3);
        ctx.textAlign = 'right';
        ctx.fillText(t.area + '%', chartX + w - 4, y + barH / 2 + 3);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('(고조선=100% 기준 상대 영토)', chartX + chartW / 2, chartY + 5 * (barH + barGap) + 10);
}

window.v16ChangeEraMap = function(idx) {
    v16State.currentEraMap = idx;
    playV16SFX('territory_expand');
    saveV16State();
    renderTerritoryMap();
};

// ===================== QUIZ +15 (175→190) =====================
function hookV16Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQs = [
        {q:'고려시대 국제무역항 벽란도는 어디에 있었나요?', a:['개성(예성강 하구)','부산','인천','목포'], c:0},
        {q:'한국 고인돌은 세계 고인돌의 약 몇 퍼센트를 차지하나요?', a:['약 40%','약 10%','약 5%','약 70%'], c:0},
        {q:'조선시대 최고 교육기관인 성균관은 현재 어느 대학의 전신인가요?', a:['성균관대학교','서울대학교','고려대학교','연세대학교'], c:0},
        {q:'석굴암이 유네스코 세계유산으로 등재된 해는 언제인가요?', a:['1995년','2000년','1988년','2010년'], c:0},
        {q:'고조선의 건국 연도는 언제로 알려져 있나요?', a:['기원전 2333년','기원전 1000년','기원전 57년','기원전 108년'], c:0},
        {q:'조선시대 수원화성을 축성한 왕은 누구인가요?', a:['정조','세종','영조','순조'], c:0},
        {q:'고려시대 최무선 장군이 왜구를 물리친 전투는?', a:['진포해전','한산도대첩','명량해전','노량해전'], c:0},
        {q:'삼국시대 가야가 유명했던 산업은 무엇인가요?', a:['철 생산','비단 생산','도자기','한지'], c:0},
        {q:'한국 전통 난방 시스템의 이름은 무엇인가요?', a:['온돌','마루','지붕','벽돌'], c:0},
        {q:'조선시대 왕의 어진(초상화)을 보관하는 곳은?', a:['선원전','집현전','규장각','성균관'], c:0},
        {q:'고려 팔만대장경을 보관하는 사찰은 어디인가요?', a:['해인사','불국사','통도사','송광사'], c:0},
        {q:'조선의 기본 법전인 경국대전을 완성한 왕은?', a:['성종','세종','태종','세조'], c:0},
        {q:'한국의 전통 종이인 한지의 주원료는 무엇인가요?', a:['닥나무 껍질','대나무','볏짚','소나무'], c:0},
        {q:'신라의 최고 교육기관은 무엇이었나요?', a:['국학','태학','성균관','향교'], c:0},
        {q:'대한제국이 선포된 해는 언제인가요?', a:['1897년','1876년','1910년','1863년'], c:0}
    ];
    newQs.forEach(function(q) {
        if(!quizQuestions.some(function(existing) { return existing.q === q.q; })) {
            quizQuestions.push(q);
        }
    });
}

// ===================== ACHIEVEMENTS +12 (158→170) =====================
function hookV16Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAchs = [
        {id:'v16_trader', icon:'📊', title:'물산 거상', desc:'교역 이익 1000 달성', check: function(){ return v16State.tradeProfit >= 1000; }},
        {id:'v16_trader5', icon:'💹', title:'초보 상인', desc:'교역 이익 100 달성', check: function(){ return v16State.tradeProfit >= 100; }},
        {id:'v16_prepared', icon:'🛡️', title:'방재 전문가', desc:'모든 재해 방비도 60% 이상', check: function(){ var keys=Object.keys(v16State.disasterPrep); return keys.every(function(k){return v16State.disasterPrep[k]>=60;}); }},
        {id:'v16_heritage3', icon:'🏛️', title:'유산 수호자', desc:'문화유산 3건 등록', check: function(){ return v16State.heritageRegistered.length >= 3; }},
        {id:'v16_heritage_all', icon:'🌍', title:'세계유산 마스터', desc:'문화유산 12건 전부 등록', check: function(){ return v16State.heritageRegistered.length >= 12; }},
        {id:'v16_army500', icon:'⚔️', title:'대군 편성', desc:'총 병력 500명 이상', check: function(){ var t=0; Object.keys(v16State.militaryUnits).forEach(function(k){t+=v16State.militaryUnits[k].count;}); return t>=500; }},
        {id:'v16_seasons', icon:'🌸', title:'사계절 체험', desc:'모든 계절을 한 번씩 경험', check: function(){ return v16State.features.allSeasons; }},
        {id:'v16_happy_s', icon:'📋', title:'태평성대', desc:'만족도 종합 S등급 달성', check: function(){ var t=0,c=Object.keys(v16State.satisfaction); c.forEach(function(k){t+=v16State.satisfaction[k];}); return Math.round(t/c.length)>=80; }},
        {id:'v16_faction_bal', icon:'👑', title:'세력 균형가', desc:'모든 세력 충성도 50 이상', check: function(){ return Object.keys(v16State.factions).every(function(k){return v16State.factions[k].loyalty>=50;}); }},
        {id:'v16_territory', icon:'🗺️', title:'역사 탐험가', desc:'모든 시대 강역 지도 확인', check: function(){ return v16State.features.allMaps; }},
        {id:'v16_invest300', icon:'💰', title:'재해 투자왕', desc:'재해 방비에 300 이상 투자', check: function(){ return v16State.disasterInvested >= 300; }},
        {id:'v16_power1000', icon:'🏴', title:'천하무적', desc:'총 군사력 1000 이상 달성', check: function(){ var t=0; Object.keys(v16State.militaryUnits).forEach(function(k){var u=v16State.militaryUnits[k];t+=u.count*u.power;}); return t>=1000; }}
    ];
    newAchs.forEach(function(a) {
        if(!achievements.some(function(ex) { return ex.id === a.id; })) {
            achievements.push(a);
        }
    });
}

function hookV16CheckAchievements() {
    if(typeof checkAchievements !== 'function') return;
    var origCheck = checkAchievements;
    checkAchievements = function() {
        origCheck();
        if(typeof achievements === 'undefined' || typeof unlockedAchievements === 'undefined') return;
        achievements.forEach(function(a) {
            if(a.id && a.id.indexOf('v16_') === 0 && !unlockedAchievements.has(a.id)) {
                try {
                    if(a.check && a.check()) {
                        unlockedAchievements.add(a.id);
                        playV16SFX('v16_achieve');
                        if(typeof showAchievementToast === 'function') showAchievementToast(a);
                        try { localStorage.setItem('cityAchievements', JSON.stringify([...unlockedAchievements])); } catch(e){}
                    }
                } catch(e){}
            }
        });
    };
}

// ===================== GAME TICK HOOK =====================
function hookV16GameTick() {
    if(typeof window.gameTick !== 'function') return;
    var origTick = window.gameTick;
    window.gameTick = function() {
        origTick();
        v16TickUpdate();
    };
}

function v16TickUpdate() {
    TRADE_GOODS_KEYS.forEach(function(k) {
        var g = v16State.tradeGoods[k];
        var fluct = (Math.random() - 0.5) * 6;
        g.supply = Math.max(10, Math.min(100, Math.round(g.supply + fluct)));
        g.demand = Math.max(10, Math.min(100, Math.round(g.demand + (Math.random() - 0.5) * 6)));
        g.price = Math.max(1, Math.round(g.price * (1 + (g.demand - g.supply) / 500)));
    });
}

// ===================== ADVISOR TIPS =====================
function hookV16AdvisorTips() {
    if(typeof advisorTips === 'undefined') return;
    var newTips = [
        '📊 물산교역시장에서 수요가 높은 물품을 매수하여 이익을 남기세요!',
        '🛡️ 자연재해 방비도를 높여 도시를 안전하게 보호하세요!',
        '🏛️ 한국의 유네스코 세계유산을 등록하여 문화 점수를 올리세요!',
        '⚔️ 다양한 병종을 편성하여 군사력을 키우세요!',
        '🌸 계절에 따라 자원 수급이 변화합니다. 계절별 전략을 세우세요!',
        '📋 백성 만족도를 주기적으로 조사하여 약점을 개선하세요!',
        '👑 궁중 세력 균형을 유지하여 정치 안정을 도모하세요!',
        '🗺️ 역사 강역 지도에서 한국 영토의 변천을 공부하세요!'
    ];
    newTips.forEach(function(tip) {
        if(advisorTips.indexOf(tip) < 0) advisorTips.push(tip);
    });
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV16Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if(!e.shiftKey) return;
        var featureMap = {
            '!':'trade', '@':'disaster', '#':'heritage', '$':'military',
            '%':'season', '^':'survey', '&':'faction', '*':'territory'
        };
        var digitMap = {
            'Digit1':'trade', 'Digit2':'disaster', 'Digit3':'heritage', 'Digit4':'military',
            'Digit5':'season', 'Digit6':'survey', 'Digit7':'faction', 'Digit8':'territory'
        };
        var feature = featureMap[e.key] || digitMap[e.code];
        if(feature) {
            e.preventDefault();
            var navBar = document.getElementById('v16-nav-bar');
            if(navBar) navBar.style.display = 'block';
            openV16Feature(feature);
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV16AutoSave() {
    setInterval(function() {
        saveV16State();
    }, 60000);
}

// ===================== SEASON TRACKING =====================
function trackSeasonVisit() {
    if(!v16State.features.seasonVisits) v16State.features.seasonVisits = {};
    v16State.features.seasonVisits[v16State.currentSeason] = true;
    if(Object.keys(v16State.features.seasonVisits).length >= 4) {
        v16State.features.allSeasons = true;
    }
}

function trackMapVisit() {
    if(!v16State.features.mapVisits) v16State.features.mapVisits = {};
    v16State.features.mapVisits[v16State.currentEraMap] = true;
    if(Object.keys(v16State.features.mapVisits).length >= 5) {
        v16State.features.allMaps = true;
    }
}

var origChangeSeason = window.v16ChangeSeason;
window.v16ChangeSeason = function(idx) {
    v16State.currentSeason = idx;
    trackSeasonVisit();
    playV16SFX('season_change');
    saveV16State();
    renderSeasonWeather();
};

var origChangeMap = window.v16ChangeEraMap;
window.v16ChangeEraMap = function(idx) {
    v16State.currentEraMap = idx;
    trackMapVisit();
    playV16SFX('territory_expand');
    saveV16State();
    renderTerritoryMap();
};

// ===================== INIT =====================
function initV16() {
    loadV16State();
    addV16UI();
    hookV16GameTick();
    hookV16Quiz();
    hookV16Achievements();
    hookV16CheckAchievements();
    hookV16AdvisorTips();
    hookV16AutoSave();
    hookV16Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🏪 v16.0: 물산교역+재해방비+문화유산+군사편제+계절날씨+만족도+궁중세력+역사강역!');
        }, 14000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV16, 5000); });
} else {
    setTimeout(initV16, 5000);
}

})();
