// =====================================================================
// city-builder v17_patch.js — PRIME Holdings NEXTERA+PRISM v17.0
// Self-contained IIFE patch: Royal Marriage Diplomacy 8 houses Canvas,
// Ancient Science Academy 12 techs Canvas,
// Rebellion Management 8 scenarios Canvas,
// Royal Treasury Vault 10 treasures Canvas,
// Social Class Simulator 6 classes Canvas,
// Feng Shui Advisor 8 directions Radar Canvas,
// Royal Banquet Hall 10 banquets Canvas,
// Royal Tombs Map 12 tombs Canvas,
// +15 Quiz (190→205), +12 Achievements (170→182),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v17Ctx = null;
function getV17Audio() {
    if(!v17Ctx) {
        try { v17Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v17Ctx;
}
function playV17SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV17Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.10, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    switch(type) {
        case 'marriage_bell':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'science_discover':
            [262,330,392,494,588,698].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'rebellion_alarm':
            [880,660,880,660,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.12);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.12);
            });
            break;
        case 'rebellion_calm':
            [330,392,494,588,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'treasure_find':
            [392,494,588,784,988].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.25);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.25);
            });
            break;
        case 'treasure_display':
            [440,554,659].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'class_reform':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(220, now);
            o.frequency.linearRampToValueAtTime(440, now+0.2);
            o.frequency.linearRampToValueAtTime(550, now+0.35);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.4);
            break;
        case 'fengshui_analyze':
            [330,392,440,494,440,392].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.07, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.15);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.15);
            });
            break;
        case 'banquet_toast':
            [262,330,392,494,588,784,988].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.18);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.18);
            });
            break;
        case 'tomb_discover':
            [196,247,294,370,440].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'achieve_v17':
            [392,494,588,784,988,1176].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.3);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.3);
            });
            break;
        case 'nav_v17':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(600, now);
            o.frequency.linearRampToValueAtTime(800, now+0.08);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.15);
            break;
    }
}

// ===================== DATA =====================
var V17_HOUSES = [
    {id:'goguryeo', name:'고구려왕실', icon:'🏯', color:'#e53935', x:120, y:80},
    {id:'baekje', name:'백제왕실', icon:'🏛️', color:'#1e88e5', x:100, y:200},
    {id:'silla', name:'신라왕실', icon:'👑', color:'#fdd835', x:280, y:280},
    {id:'gaya', name:'가야왕실', icon:'⚒️', color:'#43a047', x:200, y:320},
    {id:'tang', name:'당나라', icon:'🏳️', color:'#ff8f00', x:420, y:80},
    {id:'japan', name:'일본', icon:'🎌', color:'#e91e63', x:480, y:200},
    {id:'khitan', name:'거란', icon:'🐎', color:'#7b1fa2', x:380, y:320},
    {id:'jurchen', name:'여진', icon:'🏹', color:'#00897b', x:460, y:320}
];

var V17_SCIENCES = [
    {id:'s1', name:'측우기', icon:'🌧️', era:'조선', year:1441, req:null, desc:'세계 최초의 우량계'},
    {id:'s2', name:'혼천의', icon:'🌌', era:'조선', year:1433, req:null, desc:'천체 관측 기기'},
    {id:'s3', name:'자격루', icon:'⏰', era:'조선', year:1434, req:'s2', desc:'자동 물시계'},
    {id:'s4', name:'거북선', icon:'🐢', era:'조선', year:1592, req:null, desc:'이순신 장군의 철갑선'},
    {id:'s5', name:'화차', icon:'🔥', era:'조선', year:1451, req:'s4', desc:'다연장 로켓 발사기'},
    {id:'s6', name:'첨성대', icon:'🔭', era:'신라', year:632, req:null, desc:'동아시아 최고 천문대'},
    {id:'s7', name:'고려청자', icon:'🫖', era:'고려', year:1100, req:null, desc:'비색 상감 도자기'},
    {id:'s8', name:'직지심체요절', icon:'📕', era:'고려', year:1377, req:'s7', desc:'세계 최초 금속활자본'},
    {id:'s9', name:'해시계', icon:'☀️', era:'조선', year:1434, req:'s2', desc:'앙부일구'},
    {id:'s10', name:'수표', icon:'📏', era:'조선', year:1441, req:'s1', desc:'하천 수위 측정기'},
    {id:'s11', name:'신기전', icon:'🚀', era:'조선', year:1448, req:'s5', desc:'다단 로켓 화기'},
    {id:'s12', name:'비격진천뢰', icon:'💣', era:'조선', year:1592, req:'s11', desc:'시한 폭탄 무기'}
];

var V17_REBELLIONS = [
    {id:'r1', name:'홍건적 침입', era:'고려', year:1359, icon:'⚔️', severity:80, desc:'원나라 말기 홍건적의 고려 침공'},
    {id:'r2', name:'왜구 약탈', era:'고려', year:1350, icon:'🏴‍☠️', severity:70, desc:'고려 말 해안 지역 약탈'},
    {id:'r3', name:'임꺽정의 난', era:'조선', year:1559, icon:'🏹', severity:50, desc:'황해도 의적 임꺽정의 봉기'},
    {id:'r4', name:'홍경래의 난', era:'조선', year:1811, icon:'🔥', severity:65, desc:'평안도 지역 차별에 대한 봉기'},
    {id:'r5', name:'동학농민운동', era:'조선', year:1894, icon:'🌾', severity:90, desc:'전봉준이 이끈 반봉건 반외세 운동'},
    {id:'r6', name:'의병운동', era:'근대', year:1895, icon:'🗡️', severity:75, desc:'을미사변 이후 항일 의병 봉기'},
    {id:'r7', name:'3.1 만세운동', era:'근대', year:1919, icon:'🇰🇷', severity:95, desc:'전국적 독립 만세 시위'},
    {id:'r8', name:'광주학생운동', era:'근대', year:1929, icon:'📢', severity:60, desc:'학생 주도 항일 운동'}
];

var V17_TREASURES = [
    {id:'t1', name:'금관', icon:'👑', era:'신라', value:100, desc:'경주 금관총 출토 신라 금관'},
    {id:'t2', name:'천마도', icon:'🐎', era:'신라', value:90, desc:'천마총 출토 말다래 그림'},
    {id:'t3', name:'백제금동대향로', icon:'🏺', era:'백제', value:95, desc:'부여 능산리 출토 향로'},
    {id:'t4', name:'무구정광대다라니경', icon:'📜', era:'신라', value:85, desc:'세계 최고 목판 인쇄물'},
    {id:'t5', name:'성덕대왕신종', icon:'🔔', era:'신라', value:80, desc:'에밀레종으로 알려진 범종'},
    {id:'t6', name:'첨성대', icon:'🔭', era:'신라', value:75, desc:'동양 최고의 천문 관측대'},
    {id:'t7', name:'훈민정음', icon:'📖', era:'조선', value:100, desc:'한글 창제 해례본'},
    {id:'t8', name:'팔만대장경', icon:'📚', era:'고려', value:95, desc:'8만여 장의 대장경 목판'},
    {id:'t9', name:'석굴암', icon:'🏛️', era:'신라', value:90, desc:'토함산 석굴 본존불'},
    {id:'t10', name:'경천사십층석탑', icon:'🗼', era:'고려', value:70, desc:'대리석 10층 석탑'}
];

var V17_CLASSES = [
    {id:'royal', name:'왕족', icon:'👑', color:'#ffd700'},
    {id:'noble', name:'귀족', icon:'🏛️', color:'#e91e63'},
    {id:'yangban', name:'양반', icon:'📖', color:'#9c27b0'},
    {id:'commoner', name:'평민', icon:'👤', color:'#4caf50'},
    {id:'lowborn', name:'천민', icon:'👥', color:'#ff9800'},
    {id:'slave', name:'노비', icon:'⛓️', color:'#795548'}
];

var V17_BANQUETS = [
    {id:'b1', name:'즉위연', icon:'👑', happy:15, diplo:5, desc:'새 왕의 즉위를 축하하는 대연회'},
    {id:'b2', name:'환갑연', icon:'🎂', happy:10, diplo:0, desc:'왕의 60세 생일을 축하하는 연회'},
    {id:'b3', name:'탄신연', icon:'🎉', happy:8, diplo:2, desc:'왕의 생일 축하 연회'},
    {id:'b4', name:'세시연', icon:'🌙', happy:12, diplo:3, desc:'설날/추석 등 명절 연회'},
    {id:'b5', name:'과거합격연', icon:'📜', happy:10, diplo:0, desc:'과거 합격자 축하 연회'},
    {id:'b6', name:'전승연', icon:'⚔️', happy:15, diplo:8, desc:'전쟁 승리 축하 연회'},
    {id:'b7', name:'풍년연', icon:'🌾', happy:12, diplo:0, desc:'풍년을 축하하는 연회'},
    {id:'b8', name:'외교연', icon:'🤝', happy:5, diplo:15, desc:'외국 사신을 접대하는 연회'},
    {id:'b9', name:'혼례연', icon:'💒', happy:10, diplo:10, desc:'왕실 혼례 축하 연회'},
    {id:'b10', name:'제향', icon:'🕯️', happy:5, diplo:0, desc:'종묘/사직 제사 후 음복 연회'}
];

var V17_TOMBS = [
    {id:'tm1', name:'광개토대왕릉', icon:'🏔️', era:'고구려', x:0.15, y:0.15, desc:'고구려 19대 광개토대왕의 무덤'},
    {id:'tm2', name:'무령왕릉', icon:'🏛️', era:'백제', x:0.25, y:0.55, desc:'백제 25대 무령왕과 왕비의 합장릉'},
    {id:'tm3', name:'천마총', icon:'🐎', era:'신라', x:0.65, y:0.7, desc:'천마도가 출토된 신라 고분'},
    {id:'tm4', name:'황남대총', icon:'👑', era:'신라', x:0.68, y:0.68, desc:'신라 최대 규모 쌍원분'},
    {id:'tm5', name:'왕건왕릉', icon:'🏯', era:'고려', x:0.35, y:0.35, desc:'고려 태조 왕건의 현릉'},
    {id:'tm6', name:'세종대왕릉', icon:'📖', era:'조선', x:0.5, y:0.5, desc:'세종과 소헌왕후의 영릉'},
    {id:'tm7', name:'정조건릉', icon:'🏰', era:'조선', x:0.48, y:0.52, desc:'정조와 효의왕후의 건릉'},
    {id:'tm8', name:'선정릉', icon:'🌳', era:'조선', x:0.52, y:0.45, desc:'성종과 중종의 능'},
    {id:'tm9', name:'동구릉', icon:'🏔️', era:'조선', x:0.55, y:0.4, desc:'조선 왕릉 9기 군집'},
    {id:'tm10', name:'서오릉', icon:'🌲', era:'조선', x:0.45, y:0.4, desc:'조선 왕릉 5기 군집'},
    {id:'tm11', name:'융건릉', icon:'🏯', era:'조선', x:0.47, y:0.55, desc:'사도세자 장조와 헌경왕후의 능'},
    {id:'tm12', name:'경주대릉원', icon:'🗿', era:'신라', x:0.67, y:0.72, desc:'신라 왕릉 23기 군집'}
];

// ===================== STATE =====================
var v17State = {
    marriages: [],
    diplomacyPower: 0,
    sciences: {},
    researchPoints: 100,
    rebellionResults: [],
    rebellionsSolved: 0,
    treasuresCollected: [],
    treasureDisplayed: [],
    classPop: {royal:2, noble:5, yangban:10, commoner:50, lowborn:20, slave:13},
    policiesApplied: [],
    fengshui: {east:50, west:40, south:70, north:30, se:60, ne:45, sw:55, nw:35},
    banquetsHeld: [],
    totalHappy: 0,
    totalDiplo: 0,
    tombsExplored: [],
    tombsExcavated: [],
    featuresUsed: {}
};

// ===================== SAVE/LOAD =====================
function saveV17State() {
    try {
        localStorage.setItem('cb_v17_state', JSON.stringify(v17State));
    } catch(e) {}
}

function loadV17State() {
    try {
        var raw = localStorage.getItem('cb_v17_state');
        if(!raw) return;
        var s = JSON.parse(raw);
        if(s.marriages) v17State.marriages = s.marriages;
        if(typeof s.diplomacyPower === 'number') v17State.diplomacyPower = s.diplomacyPower;
        if(s.sciences) v17State.sciences = s.sciences;
        if(typeof s.researchPoints === 'number') v17State.researchPoints = s.researchPoints;
        if(s.rebellionResults) v17State.rebellionResults = s.rebellionResults;
        if(typeof s.rebellionsSolved === 'number') v17State.rebellionsSolved = s.rebellionsSolved;
        if(s.treasuresCollected) v17State.treasuresCollected = s.treasuresCollected;
        if(s.treasureDisplayed) v17State.treasureDisplayed = s.treasureDisplayed;
        if(s.classPop) v17State.classPop = s.classPop;
        if(s.policiesApplied) v17State.policiesApplied = s.policiesApplied;
        if(s.fengshui) v17State.fengshui = s.fengshui;
        if(s.banquetsHeld) v17State.banquetsHeld = s.banquetsHeld;
        if(typeof s.totalHappy === 'number') v17State.totalHappy = s.totalHappy;
        if(typeof s.totalDiplo === 'number') v17State.totalDiplo = s.totalDiplo;
        if(s.tombsExplored) v17State.tombsExplored = s.tombsExplored;
        if(s.tombsExcavated) v17State.tombsExcavated = s.tombsExcavated;
        if(s.featuresUsed) v17State.featuresUsed = s.featuresUsed;
    } catch(e) {}
}

// ===================== UI CREATION =====================
function addV17UI() {
    var style = document.createElement('style');
    style.textContent = '.v17-nav-bar{position:absolute;bottom:42px;left:0;z-index:10006;background:linear-gradient(180deg,rgba(26,26,46,0.95),rgba(10,10,25,0.98));border:1px solid #c4923a;border-radius:10px;display:none;padding:4px 2px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;max-width:90vw;}.v17-nav-bar::-webkit-scrollbar{display:none;}.v17-nav-btn{display:inline-block;background:rgba(196,146,58,0.15);border:1px solid #555;border-radius:8px;color:#ffd700;padding:6px 8px;margin:0 2px;font-size:11px;cursor:pointer;text-align:center;min-width:52px;vertical-align:top;}.v17-nav-btn:hover{background:rgba(196,146,58,0.35);border-color:#ffd700;}.v17-nav-btn .nb-icon{font-size:18px;display:block;}.v17-nav-btn .nb-label{font-size:9px;color:#ccc;margin-top:2px;}.v17-feature-panel{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:10009;justify-content:center;align-items:center;padding:10px;}.v17-feature-panel.show{display:flex;}.v17-panel-box{background:linear-gradient(145deg,#2a2a3e,#1a1a2e);border:2px solid #c4923a;border-radius:16px;padding:16px;max-width:660px;width:100%;max-height:85vh;overflow-y:auto;}.v17-panel-box h2{color:#ffd700;text-align:center;font-size:18px;margin-bottom:8px;}.v17-panel-box .v17-sub{text-align:center;color:#c4923a;font-size:12px;margin-bottom:12px;}.v17-canvas-wrap{text-align:center;margin:8px 0;}.v17-canvas-wrap canvas{max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;background:#111;}.v17-btn{background:#c4923a;border:none;color:#fff;padding:6px 16px;border-radius:14px;font-size:13px;cursor:pointer;margin:4px 2px;font-weight:bold;}.v17-btn:hover{background:#e0a84a;}.v17-close{display:block;margin:10px auto 0;background:#555;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;cursor:pointer;}.v17-close:hover{background:#777;}.v17-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin:8px 0;}.v17-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:8px;text-align:center;border:1px solid #444;cursor:pointer;transition:all 0.2s;}.v17-card:hover{border-color:#ffd700;background:rgba(255,215,0,0.08);}.v17-card.collected{border-color:#4caf50;background:rgba(76,175,80,0.1);}.v17-card .vc-icon{font-size:28px;}.v17-card .vc-name{font-size:11px;color:#eee;margin-top:2px;}.v17-card .vc-era{font-size:9px;color:#aaa;}';
    document.head.appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.id = 'v17-wrapper';
    wrapper.style.cssText = 'position:fixed;bottom:180px;left:10px;z-index:10007;';

    var navBar = document.createElement('div');
    navBar.id = 'v17-nav-bar';
    navBar.className = 'v17-nav-bar';
    var features = [
        {id:'marriage', icon:'💒', label:'왕실혼인'},
        {id:'science', icon:'🔬', label:'과학기술'},
        {id:'rebellion', icon:'⚔️', label:'봉기관리'},
        {id:'treasure', icon:'💎', label:'보물창고'},
        {id:'class', icon:'👥', label:'계층사회'},
        {id:'fengshui', icon:'🧭', label:'풍수지리'},
        {id:'banquet', icon:'🍽️', label:'왕실연회'},
        {id:'tomb', icon:'🏛️', label:'왕릉지도'}
    ];
    features.forEach(function(f) {
        var btn = document.createElement('div');
        btn.className = 'v17-nav-btn';
        btn.innerHTML = '<span class="nb-icon">' + f.icon + '</span><span class="nb-label">' + f.label + '</span>';
        btn.onclick = function() {
            playV17SFX('nav_v17');
            openV17Feature(f.id);
        };
        navBar.appendChild(btn);
    });
    wrapper.appendChild(navBar);

    var togBtn = document.createElement('button');
    togBtn.id = 'v17-toggle-btn';
    togBtn.style.cssText = 'background:rgba(0,0,0,0.75);border:1px solid #c4923a;color:#ffd700;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;display:block;';
    togBtn.textContent = '🏯';
    togBtn.title = 'v17 기능 (왕실혼인/과학기술/봉기관리/보물창고/계층사회/풍수지리/왕실연회/왕릉지도)';
    togBtn.onclick = function() {
        var nb = document.getElementById('v17-nav-bar');
        nb.style.display = nb.style.display === 'none' || !nb.style.display ? 'block' : 'none';
    };
    wrapper.appendChild(togBtn);
    document.body.appendChild(wrapper);

    createV17Panels();
}

function createV17Panels() {
    var panelDefs = [
        {id:'marriage', title:'💒 왕실혼인외교관', sub:'8개 왕실가문 간 혼인동맹 네트워크를 구축하세요'},
        {id:'science', title:'🔬 고대과학기술원', sub:'12종 고대 과학기술을 연구하고 잠금해제하세요'},
        {id:'rebellion', title:'⚔️ 민란봉기관리소', sub:'8종 봉기 시나리오를 진압/대화/수용으로 해결하세요'},
        {id:'treasure', title:'💎 왕실보물창고', sub:'10종 보물을 수집하고 전시하세요'},
        {id:'class', title:'👥 계층사회시뮬레이터', sub:'6계층 인구분포에 정책을 적용하여 변화를 관찰하세요'},
        {id:'fengshui', title:'🧭 풍수지리감정관', sub:'8방위 풍수를 분석하여 명당을 찾으세요'},
        {id:'banquet', title:'🍽️ 왕실연회관', sub:'10종 연회를 열어 민심과 외교 보너스를 얻으세요'},
        {id:'tomb', title:'🏛️ 역대왕릉지도', sub:'12왕릉을 탐사하고 발굴하세요'}
    ];
    panelDefs.forEach(function(pd) {
        var panel = document.createElement('div');
        panel.id = 'v17-panel-' + pd.id;
        panel.className = 'v17-feature-panel';
        panel.innerHTML = '<div class="v17-panel-box"><h2>' + pd.title + '</h2><div class="v17-sub">' + pd.sub + '</div><div id="v17-content-' + pd.id + '"></div><div class="v17-canvas-wrap"><canvas id="v17-canvas-' + pd.id + '"></canvas></div><div id="v17-actions-' + pd.id + '" style="text-align:center;margin:8px 0;"></div><button class="v17-close" onclick="document.getElementById(\'v17-panel-' + pd.id + '\').classList.remove(\'show\')">닫기</button></div>';
        document.body.appendChild(panel);
    });
}

function openV17Feature(id) {
    document.querySelectorAll('.v17-feature-panel').forEach(function(p) { p.classList.remove('show'); });
    var panel = document.getElementById('v17-panel-' + id);
    if(panel) {
        panel.classList.add('show');
        v17State.featuresUsed[id] = true;
        switch(id) {
            case 'marriage': renderMarriage(); break;
            case 'science': renderScience(); break;
            case 'rebellion': renderRebellion(); break;
            case 'treasure': renderTreasure(); break;
            case 'class': renderClass(); break;
            case 'fengshui': renderFengshui(); break;
            case 'banquet': renderBanquet(); break;
            case 'tomb': renderTomb(); break;
        }
        saveV17State();
    }
}

// ===================== 1. ROYAL MARRIAGE DIPLOMACY =====================
function renderMarriage() {
    var content = document.getElementById('v17-content-marriage');
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">외교력: ' + v17State.diplomacyPower + ' | 동맹: ' + v17State.marriages.length + '건</div>';
    html += '<div style="text-align:center;margin-bottom:6px;">';
    html += '<select id="v17-house-a" style="background:#222;color:#ffd700;border:1px solid #555;padding:4px;border-radius:6px;font-size:12px;">';
    V17_HOUSES.forEach(function(h) { html += '<option value="' + h.id + '">' + h.name + '</option>'; });
    html += '</select> <span style="color:#ccc;">&#x2764;</span> ';
    html += '<select id="v17-house-b" style="background:#222;color:#ffd700;border:1px solid #555;padding:4px;border-radius:6px;font-size:12px;">';
    V17_HOUSES.forEach(function(h) { html += '<option value="' + h.id + '">' + h.name + '</option>'; });
    html += '</select> ';
    html += '<button class="v17-btn" style="font-size:11px;padding:4px 10px;" onclick="v17Marry()">동맹 체결</button>';
    html += '<button class="v17-btn" style="font-size:11px;padding:4px 10px;background:#e91e63;" onclick="v17BreakAlliance()">동맹 파기</button>';
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-marriage');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 580 * dpr; canvas.height = 380 * dpr;
    canvas.style.width = '580px'; canvas.style.height = '380px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 580, 380);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('왕실 혼인동맹 네트워크', 290, 24);

    v17State.marriages.forEach(function(m) {
        var a = V17_HOUSES.find(function(h) { return h.id === m.a; });
        var b = V17_HOUSES.find(function(h) { return h.id === m.b; });
        if(a && b) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(255,215,0,0.5)'; ctx.lineWidth = 2; ctx.stroke();
            var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            ctx.fillStyle = '#ff6b6b'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('❤', mx, my);
        }
    });

    V17_HOUSES.forEach(function(h) {
        ctx.beginPath(); ctx.arc(h.x, h.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = h.color; ctx.globalAlpha = 0.3; ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = h.color; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(h.icon, h.x, h.y + 6);
        ctx.fillStyle = '#ccc'; ctx.font = '11px sans-serif';
        ctx.fillText(h.name, h.x, h.y + 38);
    });
}

window.v17Marry = function() {
    var a = document.getElementById('v17-house-a').value;
    var b = document.getElementById('v17-house-b').value;
    if(a === b) { if(typeof toast === 'function') toast('같은 왕실끼리는 동맹할 수 없습니다!'); return; }
    var exists = v17State.marriages.some(function(m) {
        return (m.a === a && m.b === b) || (m.a === b && m.b === a);
    });
    if(exists) { if(typeof toast === 'function') toast('이미 동맹이 체결되어 있습니다!'); return; }
    v17State.marriages.push({a:a, b:b});
    v17State.diplomacyPower += 10;
    playV17SFX('marriage_bell');
    var ha = V17_HOUSES.find(function(h) { return h.id === a; });
    var hb = V17_HOUSES.find(function(h) { return h.id === b; });
    if(typeof toast === 'function') toast('💒 ' + ha.name + ' ↔ ' + hb.name + ' 혼인동맹 체결!');
    if(typeof addChronicle === 'function') addChronicle('💒', ha.name + '과(와) ' + hb.name + '의 혼인동맹이 체결되었습니다.');
    saveV17State(); renderMarriage();
};

window.v17BreakAlliance = function() {
    var a = document.getElementById('v17-house-a').value;
    var b = document.getElementById('v17-house-b').value;
    var idx = -1;
    v17State.marriages.forEach(function(m, i) {
        if((m.a === a && m.b === b) || (m.a === b && m.b === a)) idx = i;
    });
    if(idx < 0) { if(typeof toast === 'function') toast('해당 동맹이 존재하지 않습니다!'); return; }
    v17State.marriages.splice(idx, 1);
    v17State.diplomacyPower = Math.max(0, v17State.diplomacyPower - 5);
    if(typeof toast === 'function') toast('동맹이 파기되었습니다.');
    saveV17State(); renderMarriage();
};

// ===================== 2. ANCIENT SCIENCE ACADEMY =====================
function renderScience() {
    var content = document.getElementById('v17-content-science');
    var unlocked = 0;
    V17_SCIENCES.forEach(function(s) { if(v17State.sciences[s.id] && v17State.sciences[s.id].unlocked) unlocked++; });
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">연구포인트: ' + v17State.researchPoints + ' | 해제: ' + unlocked + '/12</div>';
    html += '<div class="v17-grid" style="grid-template-columns:repeat(auto-fill,minmax(100px,1fr));">';
    V17_SCIENCES.forEach(function(s) {
        var st = v17State.sciences[s.id] || {points:0, unlocked:false};
        var canResearch = !s.req || (v17State.sciences[s.req] && v17State.sciences[s.req].unlocked);
        var clr = st.unlocked ? '#4caf50' : canResearch ? '#ffd700' : '#555';
        html += '<div class="v17-card' + (st.unlocked ? ' collected' : '') + '" onclick="v17Research(\'' + s.id + '\')" style="border-color:' + clr + ';">';
        html += '<div class="vc-icon">' + s.icon + '</div>';
        html += '<div class="vc-name">' + s.name + (st.unlocked ? ' ✅' : '') + '</div>';
        html += '<div class="vc-era">' + s.era + ' ' + s.year + '년</div>';
        if(!st.unlocked) html += '<div style="font-size:9px;color:#aaa;">' + (st.points || 0) + '/100</div>';
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-science');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 560 * dpr; canvas.height = 360 * dpr;
    canvas.style.width = '560px'; canvas.style.height = '360px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 560, 360);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('과학기술 연구트리', 280, 24);

    var positions = [
        {x:80,y:70},{x:200,y:70},{x:140,y:160},{x:360,y:70},{x:280,y:160},{x:480,y:70},
        {x:80,y:250},{x:200,y:250},{x:320,y:250},{x:140,y:330},{x:400,y:250},{x:480,y:330}
    ];

    V17_SCIENCES.forEach(function(s, i) {
        if(s.req) {
            var ri = -1;
            V17_SCIENCES.forEach(function(x, j) { if(x.id === s.req) ri = j; });
            if(ri >= 0) {
                ctx.beginPath(); ctx.moveTo(positions[ri].x, positions[ri].y);
                ctx.lineTo(positions[i].x, positions[i].y);
                ctx.strokeStyle = 'rgba(255,215,0,0.3)'; ctx.lineWidth = 1; ctx.stroke();
                var ax = positions[i].x, ay = positions[i].y;
                var bx = positions[ri].x, by = positions[ri].y;
                var angle = Math.atan2(ay - by, ax - bx);
                ctx.beginPath();
                ctx.moveTo(ax - 22 * Math.cos(angle), ay - 22 * Math.sin(angle));
                ctx.lineTo(ax - 30 * Math.cos(angle - 0.3), ay - 30 * Math.sin(angle - 0.3));
                ctx.lineTo(ax - 30 * Math.cos(angle + 0.3), ay - 30 * Math.sin(angle + 0.3));
                ctx.closePath(); ctx.fillStyle = 'rgba(255,215,0,0.4)'; ctx.fill();
            }
        }
    });

    V17_SCIENCES.forEach(function(s, i) {
        var st = v17State.sciences[s.id] || {points:0, unlocked:false};
        var px = positions[i].x, py = positions[i].y;
        ctx.beginPath(); ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fillStyle = st.unlocked ? 'rgba(76,175,80,0.4)' : 'rgba(100,100,100,0.3)';
        ctx.fill();
        ctx.strokeStyle = st.unlocked ? '#4caf50' : '#666'; ctx.lineWidth = 2; ctx.stroke();
        if(!st.unlocked && (st.points || 0) > 0) {
            ctx.beginPath(); ctx.arc(px, py, 20, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (st.points || 0) / 100));
            ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.stroke();
        }
        ctx.fillStyle = '#fff'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s.icon, px, py + 5);
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif';
        ctx.fillText(s.name, px, py + 34);
    });
}

window.v17Research = function(id) {
    var s = null;
    V17_SCIENCES.forEach(function(x) { if(x.id === id) s = x; });
    if(!s) return;
    var st = v17State.sciences[id] || {points:0, unlocked:false};
    if(st.unlocked) { if(typeof toast === 'function') toast(s.name + '은(는) 이미 연구 완료!'); return; }
    if(s.req && !(v17State.sciences[s.req] && v17State.sciences[s.req].unlocked)) {
        var reqS = null;
        V17_SCIENCES.forEach(function(x) { if(x.id === s.req) reqS = x; });
        if(typeof toast === 'function') toast('선행 기술 &quot;' + (reqS ? reqS.name : '') + '&quot;을(를) 먼저 연구하세요!');
        return;
    }
    if(v17State.researchPoints < 20) { if(typeof toast === 'function') toast('연구포인트가 부족합니다!'); return; }
    v17State.researchPoints -= 20;
    st.points = (st.points || 0) + 25;
    if(st.points >= 100) {
        st.unlocked = true;
        playV17SFX('science_discover');
        if(typeof toast === 'function') toast('🔬 ' + s.icon + ' ' + s.name + ' 연구 완료!');
        if(typeof addChronicle === 'function') addChronicle(s.icon, s.name + ' 기술을 개발했습니다! (' + s.desc + ')');
    } else {
        if(typeof toast === 'function') toast(s.icon + ' ' + s.name + ' 연구 진행 (' + st.points + '/100)');
    }
    v17State.sciences[id] = st;
    saveV17State(); renderScience();
};

// ===================== 3. REBELLION MANAGEMENT =====================
function renderRebellion() {
    var content = document.getElementById('v17-content-rebellion');
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">해결한 봉기: ' + v17State.rebellionsSolved + '건</div>';
    html += '<div class="v17-grid" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr));">';
    V17_REBELLIONS.forEach(function(r) {
        var result = null;
        v17State.rebellionResults.forEach(function(x) { if(x.id === r.id) result = x; });
        html += '<div class="v17-card' + (result ? ' collected' : '') + '">';
        html += '<div class="vc-icon">' + r.icon + '</div>';
        html += '<div class="vc-name">' + r.name + '</div>';
        html += '<div class="vc-era">' + r.era + ' ' + r.year + '년</div>';
        html += '<div style="font-size:9px;color:#ff9800;">위험도: ' + r.severity + '%</div>';
        if(!result) {
            html += '<div style="margin-top:4px;">';
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 6px;" onclick="v17Rebellion(\'' + r.id + '\',\'suppress\')">진압</button>';
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 6px;background:#2196f3;" onclick="v17Rebellion(\'' + r.id + '\',\'talk\')">대화</button>';
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 6px;background:#4caf50;" onclick="v17Rebellion(\'' + r.id + '\',\'accept\')">수용</button>';
            html += '</div>';
        } else {
            html += '<div style="font-size:9px;color:' + (result.success ? '#4caf50' : '#f44336') + ';">' + result.method + ' ' + (result.success ? '성공' : '실패') + '</div>';
        }
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-rebellion');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr; canvas.height = 380 * dpr;
    canvas.style.width = '600px'; canvas.style.height = '380px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 600, 380);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('봉기 처리 결과 차트', 300, 24);

    var methods = ['진압', '대화', '수용'];
    var mColors = ['#f44336', '#2196f3', '#4caf50'];
    var counts = [0, 0, 0];
    var successes = [0, 0, 0];
    v17State.rebellionResults.forEach(function(r) {
        var mi = r.method === '진압' ? 0 : r.method === '대화' ? 1 : 2;
        counts[mi]++;
        if(r.success) successes[mi]++;
    });

    var barW = 80, startX = 120;
    for(var i = 0; i < 3; i++) {
        var x = startX + i * (barW + 60);
        var maxH = 250;
        var totalH = Math.min(counts[i] * 30, maxH);
        var succH = Math.min(successes[i] * 30, maxH);

        ctx.fillStyle = 'rgba(150,150,150,0.3)';
        ctx.fillRect(x, 330 - totalH, barW, totalH);
        ctx.fillStyle = mColors[i] + '99';
        ctx.fillRect(x, 330 - succH, barW, succH);

        ctx.fillStyle = '#ccc'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(methods[i], x + barW / 2, 355);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif';
        ctx.fillText(successes[i] + '/' + counts[i], x + barW / 2, 325 - totalH);
    }

    ctx.fillStyle = 'rgba(150,150,150,0.3)'; ctx.fillRect(440, 360, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('총 시도', 454, 370);
    ctx.fillStyle = '#4caf50'; ctx.fillRect(440, 345, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('성공', 454, 355);
}

window.v17Rebellion = function(id, method) {
    var r = null;
    V17_REBELLIONS.forEach(function(x) { if(x.id === id) r = x; });
    if(!r) return;
    var already = false;
    v17State.rebellionResults.forEach(function(x) { if(x.id === id) already = true; });
    if(already) { if(typeof toast === 'function') toast('이미 처리한 봉기입니다!'); return; }
    var methodName = method === 'suppress' ? '진압' : method === 'talk' ? '대화' : '수용';
    var successChance;
    if(method === 'suppress') successChance = r.severity < 60 ? 0.7 : 0.4;
    else if(method === 'talk') successChance = r.severity < 70 ? 0.6 : 0.45;
    else successChance = 0.8;
    var success = Math.random() < successChance;
    v17State.rebellionResults.push({id:r.id, method:methodName, success:success});
    if(success) {
        v17State.rebellionsSolved++;
        playV17SFX('rebellion_calm');
        if(typeof toast === 'function') toast(r.icon + ' ' + r.name + ' ' + methodName + ' 성공!');
        if(typeof addChronicle === 'function') addChronicle(r.icon, r.name + '을(를) ' + methodName + '(으)로 해결했습니다.');
        if(typeof resources !== 'undefined') resources.happy = (resources.happy || 0) + 5;
    } else {
        playV17SFX('rebellion_alarm');
        if(typeof toast === 'function') toast(r.icon + ' ' + r.name + ' ' + methodName + ' 실패...');
        if(typeof resources !== 'undefined') resources.happy = Math.max(0, (resources.happy || 0) - 3);
    }
    saveV17State(); renderRebellion();
};

// ===================== 4. ROYAL TREASURY VAULT =====================
function renderTreasure() {
    var content = document.getElementById('v17-content-treasure');
    var cc = v17State.treasuresCollected.length;
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">수집: ' + cc + '/10 | 전시: ' + v17State.treasureDisplayed.length + '</div>';
    html += '<div class="v17-grid">';
    V17_TREASURES.forEach(function(t) {
        var owned = v17State.treasuresCollected.indexOf(t.id) >= 0;
        var displayed = v17State.treasureDisplayed.indexOf(t.id) >= 0;
        html += '<div class="v17-card' + (owned ? ' collected' : '') + '">';
        html += '<div class="vc-icon">' + t.icon + '</div>';
        html += '<div class="vc-name">' + t.name + (displayed ? ' 🎭' : owned ? ' ✅' : '') + '</div>';
        html += '<div class="vc-era">' + t.era + ' | 가치: ' + t.value + '</div>';
        if(!owned) {
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 8px;" onclick="v17CollectTreasure(\'' + t.id + '\')">수집 (50금)</button>';
        } else if(!displayed) {
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 8px;background:#9c27b0;" onclick="v17DisplayTreasure(\'' + t.id + '\')">전시</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-treasure');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 560 * dpr; canvas.height = 340 * dpr;
    canvas.style.width = '560px'; canvas.style.height = '340px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 560, 340);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('보물 가치 및 수집 현황', 280, 24);

    var barW = 40, gap = 12, startX = 30;
    V17_TREASURES.forEach(function(t, i) {
        var x = startX + i * (barW + gap);
        var maxH = 220;
        var h = (t.value / 100) * maxH;
        var owned = v17State.treasuresCollected.indexOf(t.id) >= 0;
        var displayed = v17State.treasureDisplayed.indexOf(t.id) >= 0;

        ctx.fillStyle = displayed ? 'rgba(156,39,176,0.6)' : owned ? 'rgba(76,175,80,0.6)' : 'rgba(100,100,100,0.3)';
        ctx.fillRect(x, 290 - h, barW, h);
        if(owned) {
            ctx.strokeStyle = displayed ? '#9c27b0' : '#4caf50'; ctx.lineWidth = 1;
            ctx.strokeRect(x, 290 - h, barW, h);
        }
        ctx.fillStyle = '#ccc'; ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(t.icon, x + barW / 2, 310);
        ctx.fillStyle = '#aaa'; ctx.font = '8px sans-serif';
        ctx.fillText(t.name, x + barW / 2, 325);
        ctx.fillStyle = '#ffd700'; ctx.font = '9px sans-serif';
        ctx.fillText(t.value, x + barW / 2, 285 - h);
    });

    ctx.fillStyle = 'rgba(100,100,100,0.3)'; ctx.fillRect(30, 332, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('미수집', 44, 342);
    ctx.fillStyle = 'rgba(76,175,80,0.6)'; ctx.fillRect(100, 332, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('수집', 114, 342);
    ctx.fillStyle = 'rgba(156,39,176,0.6)'; ctx.fillRect(160, 332, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('전시중', 174, 342);
}

window.v17CollectTreasure = function(id) {
    if(v17State.treasuresCollected.indexOf(id) >= 0) return;
    if(typeof resources !== 'undefined' && resources.gold < 50) {
        if(typeof toast === 'function') toast('금이 부족합니다!'); return;
    }
    if(typeof resources !== 'undefined') resources.gold -= 50;
    v17State.treasuresCollected.push(id);
    var t = null;
    V17_TREASURES.forEach(function(x) { if(x.id === id) t = x; });
    playV17SFX('treasure_find');
    if(typeof toast === 'function') toast('💎 ' + t.icon + ' ' + t.name + ' 수집!');
    if(typeof addChronicle === 'function') addChronicle(t.icon, t.name + '을(를) 왕실 보물창고에 수집했습니다.');
    saveV17State(); renderTreasure();
};

window.v17DisplayTreasure = function(id) {
    if(v17State.treasureDisplayed.indexOf(id) >= 0) return;
    v17State.treasureDisplayed.push(id);
    var t = null;
    V17_TREASURES.forEach(function(x) { if(x.id === id) t = x; });
    playV17SFX('treasure_display');
    if(typeof resources !== 'undefined') resources.culture = (resources.culture || 0) + 5;
    if(typeof toast === 'function') toast(t.icon + ' ' + t.name + ' 전시 시작! (문화 +5)');
    saveV17State(); renderTreasure();
};

// ===================== 5. SOCIAL CLASS SIMULATOR =====================
function renderClass() {
    var content = document.getElementById('v17-content-class');
    var html = '<div style="text-align:center;margin-bottom:6px;">';
    html += '<button class="v17-btn" style="font-size:11px;" onclick="v17ApplyPolicy(\'exam\')">과거제 실시</button>';
    html += '<button class="v17-btn" style="font-size:11px;background:#4caf50;" onclick="v17ApplyPolicy(\'free\')">신분해방령</button>';
    html += '<button class="v17-btn" style="font-size:11px;background:#2196f3;" onclick="v17ApplyPolicy(\'tax\')">조세개혁</button>';
    html += '</div>';
    html += '<div style="font-size:11px;color:#aaa;text-align:center;margin-bottom:6px;">정책 시행: ' + v17State.policiesApplied.length + '회</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-class');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 580 * dpr; canvas.height = 360 * dpr;
    canvas.style.width = '580px'; canvas.style.height = '360px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 580, 360);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('계층별 인구분포', 290, 24);

    var total = 0;
    V17_CLASSES.forEach(function(c) { total += v17State.classPop[c.id] || 0; });

    // Stacked horizontal bar
    ctx.fillStyle = '#aaa'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('인구 비율 스택 바', 80, 55);
    var barX = 80, barW = 420, barY = 65, barH = 40;
    var cumX = barX;
    V17_CLASSES.forEach(function(c) {
        var pop = v17State.classPop[c.id] || 0;
        var w = total > 0 ? (pop / total) * barW : 0;
        ctx.fillStyle = c.color; ctx.fillRect(cumX, barY, w, barH);
        if(w > 30) {
            ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(c.name, cumX + w / 2, barY + barH / 2 + 4);
        }
        cumX += w;
    });
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.strokeRect(barX, barY, barW, barH);

    // Pie chart
    var pieX = 170, pieY = 230, pieR = 90;
    var startAngle = -Math.PI / 2;
    V17_CLASSES.forEach(function(c) {
        var pop = v17State.classPop[c.id] || 0;
        var angle = total > 0 ? (pop / total) * Math.PI * 2 : 0;
        ctx.beginPath(); ctx.moveTo(pieX, pieY);
        ctx.arc(pieX, pieY, pieR, startAngle, startAngle + angle);
        ctx.closePath(); ctx.fillStyle = c.color; ctx.fill();
        ctx.strokeStyle = '#0a0a1a'; ctx.lineWidth = 1; ctx.stroke();
        if(angle > 0.15) {
            var midAngle = startAngle + angle / 2;
            var lx = pieX + (pieR * 0.65) * Math.cos(midAngle);
            var ly = pieY + (pieR * 0.65) * Math.sin(midAngle);
            ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(Math.round(pop / total * 100) + '%', lx, ly + 4);
        }
        startAngle += angle;
    });

    // Legend
    var legX = 380, legY = 155;
    V17_CLASSES.forEach(function(c, i) {
        var ly = legY + i * 24;
        ctx.fillStyle = c.color; ctx.fillRect(legX, ly, 14, 14);
        ctx.fillStyle = '#ccc'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.icon + ' ' + c.name + ' (' + (v17State.classPop[c.id] || 0) + '%)', legX + 20, ly + 12);
    });
}

window.v17ApplyPolicy = function(type) {
    var policyName;
    if(type === 'exam') {
        policyName = '과거제';
        v17State.classPop.yangban = Math.min(30, v17State.classPop.yangban + 3);
        v17State.classPop.commoner = Math.max(20, v17State.classPop.commoner - 2);
        v17State.classPop.lowborn = Math.max(5, v17State.classPop.lowborn - 1);
    } else if(type === 'free') {
        policyName = '신분해방';
        v17State.classPop.slave = Math.max(0, v17State.classPop.slave - 3);
        v17State.classPop.lowborn = Math.max(3, v17State.classPop.lowborn - 2);
        v17State.classPop.commoner = Math.min(70, v17State.classPop.commoner + 5);
    } else {
        policyName = '조세개혁';
        v17State.classPop.noble = Math.max(2, v17State.classPop.noble - 1);
        v17State.classPop.commoner = Math.min(70, v17State.classPop.commoner + 2);
        v17State.classPop.lowborn = Math.max(3, v17State.classPop.lowborn - 1);
    }
    v17State.policiesApplied.push(type);
    playV17SFX('class_reform');
    if(typeof toast === 'function') toast('📜 ' + policyName + ' 정책 시행!');
    if(typeof addChronicle === 'function') addChronicle('📜', policyName + ' 정책을 시행하여 사회 구조가 변화했습니다.');
    saveV17State(); renderClass();
};

// ===================== 6. FENG SHUI ADVISOR =====================
function renderFengshui() {
    var content = document.getElementById('v17-content-fengshui');
    var keys = ['east','west','south','north','se','ne','sw','nw'];
    var labels = ['동','서','남','북','동남','동북','서남','서북'];
    var total = 0;
    keys.forEach(function(k) { total += v17State.fengshui[k]; });
    var avg = Math.round(total / keys.length);
    var grade = avg >= 75 ? '명당' : avg >= 50 ? '보통' : '흉지';
    var gradeColor = avg >= 75 ? '#ffd700' : avg >= 50 ? '#4caf50' : '#f44336';
    var html = '<div style="text-align:center;font-size:13px;margin-bottom:6px;">';
    html += '<span style="color:' + gradeColor + ';font-weight:bold;font-size:16px;">' + grade + '</span>';
    html += ' <span style="color:#aaa;">(평균: ' + avg + '점)</span>';
    html += '</div>';
    html += '<div style="text-align:center;margin-bottom:6px;">';
    html += '<button class="v17-btn" style="font-size:11px;" onclick="v17AnalyzeFengshui()">🧭 풍수 재분석</button>';
    html += '<button class="v17-btn" style="font-size:11px;background:#4caf50;" onclick="v17ImproveFengshui()">🌿 지기 보강 (30금)</button>';
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-fengshui');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 560 * dpr; canvas.height = 380 * dpr;
    canvas.style.width = '560px'; canvas.style.height = '380px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 560, 380);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('풍수지리 8방위 레이더 차트', 280, 24);

    var cx = 280, cy = 210, radius = 130;
    var n = keys.length;

    for(var ring = 1; ring <= 5; ring++) {
        var r = radius * ring / 5;
        ctx.beginPath();
        for(var j = 0; j < n; j++) {
            var angle = (Math.PI * 2 * j / n) - Math.PI / 2;
            var px = cx + r * Math.cos(angle);
            var py = cy + r * Math.sin(angle);
            if(j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.stroke();
        if(ring === 3) {
            ctx.fillStyle = '#555'; ctx.font = '8px sans-serif'; ctx.textAlign = 'left';
            ctx.fillText(ring * 20 + '', cx + r + 2, cy - 2);
        }
    }

    for(var i = 0; i < n; i++) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.stroke();
        var labelR = radius + 24;
        ctx.fillStyle = '#ccc'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(labels[i] + ' ' + v17State.fengshui[keys[i]], cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle));
    }

    ctx.beginPath(); ctx.fillStyle = 'rgba(76,175,80,0.25)'; ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 2;
    for(var i = 0; i < n; i++) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var val = v17State.fengshui[keys[i]] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();

    for(var i = 0; i < n; i++) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var val = v17State.fengshui[keys[i]] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = v17State.fengshui[keys[i]] >= 70 ? '#ffd700' : '#4caf50'; ctx.fill();
    }
}

window.v17AnalyzeFengshui = function() {
    var keys = ['east','west','south','north','se','ne','sw','nw'];
    keys.forEach(function(k) {
        v17State.fengshui[k] = Math.max(10, Math.min(100, v17State.fengshui[k] + Math.round((Math.random() - 0.4) * 20)));
    });
    playV17SFX('fengshui_analyze');
    var total = 0;
    keys.forEach(function(k) { total += v17State.fengshui[k]; });
    var avg = Math.round(total / keys.length);
    if(typeof toast === 'function') toast('🧭 풍수 재분석 완료! 평균: ' + avg + '점');
    if(typeof addChronicle === 'function') addChronicle('🧭', '풍수지리를 재분석하여 도시 배치를 점검했습니다.');
    saveV17State(); renderFengshui();
};

window.v17ImproveFengshui = function() {
    if(typeof resources !== 'undefined' && resources.gold < 30) {
        if(typeof toast === 'function') toast('금이 부족합니다!'); return;
    }
    if(typeof resources !== 'undefined') resources.gold -= 30;
    var keys = ['east','west','south','north','se','ne','sw','nw'];
    var minK = keys[0], minV = v17State.fengshui[keys[0]];
    keys.forEach(function(k) { if(v17State.fengshui[k] < minV) { minV = v17State.fengshui[k]; minK = k; } });
    v17State.fengshui[minK] = Math.min(100, v17State.fengshui[minK] + 15);
    playV17SFX('fengshui_analyze');
    if(typeof toast === 'function') toast('🌿 가장 약한 방위의 지기를 보강했습니다!');
    saveV17State(); renderFengshui();
};

// ===================== 7. ROYAL BANQUET HALL =====================
function renderBanquet() {
    var content = document.getElementById('v17-content-banquet');
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">개최: ' + v17State.banquetsHeld.length + '회 | 민심+' + v17State.totalHappy + ' | 외교+' + v17State.totalDiplo + '</div>';
    html += '<div class="v17-grid" style="grid-template-columns:repeat(auto-fill,minmax(100px,1fr));">';
    V17_BANQUETS.forEach(function(b) {
        var held = v17State.banquetsHeld.indexOf(b.id) >= 0;
        html += '<div class="v17-card' + (held ? ' collected' : '') + '">';
        html += '<div class="vc-icon">' + b.icon + '</div>';
        html += '<div class="vc-name">' + b.name + (held ? ' ✅' : '') + '</div>';
        html += '<div style="font-size:9px;color:#aaa;">민심+' + b.happy + ' 외교+' + b.diplo + '</div>';
        if(!held) {
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 8px;" onclick="v17HoldBanquet(\'' + b.id + '\')">개최 (30금)</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-banquet');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 580 * dpr; canvas.height = 340 * dpr;
    canvas.style.width = '580px'; canvas.style.height = '340px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 580, 340);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('연회 보너스 차트', 290, 24);

    var barW = 38, gap = 14, startX = 30;
    V17_BANQUETS.forEach(function(b, i) {
        var x = startX + i * (barW + gap);
        var held = v17State.banquetsHeld.indexOf(b.id) >= 0;
        var hH = (b.happy / 20) * 140;
        var dH = (b.diplo / 20) * 140;

        ctx.fillStyle = held ? 'rgba(76,175,80,0.6)' : 'rgba(76,175,80,0.2)';
        ctx.fillRect(x, 280 - hH, barW / 2 - 1, hH);
        ctx.fillStyle = held ? 'rgba(33,150,243,0.6)' : 'rgba(33,150,243,0.2)';
        ctx.fillRect(x + barW / 2 + 1, 280 - dH, barW / 2 - 1, dH);

        ctx.fillStyle = '#ccc'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.icon, x + barW / 2, 300);
        ctx.fillStyle = '#aaa'; ctx.font = '8px sans-serif';
        ctx.fillText(b.name, x + barW / 2, 315);
    });

    ctx.fillStyle = '#4caf50'; ctx.fillRect(430, 320, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('민심', 444, 330);
    ctx.fillStyle = '#2196f3'; ctx.fillRect(480, 320, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('외교', 494, 330);
}

window.v17HoldBanquet = function(id) {
    if(v17State.banquetsHeld.indexOf(id) >= 0) { if(typeof toast === 'function') toast('이미 개최한 연회입니다!'); return; }
    if(typeof resources !== 'undefined' && resources.gold < 30) { if(typeof toast === 'function') toast('금이 부족합니다!'); return; }
    if(typeof resources !== 'undefined') resources.gold -= 30;
    v17State.banquetsHeld.push(id);
    var b = null;
    V17_BANQUETS.forEach(function(x) { if(x.id === id) b = x; });
    v17State.totalHappy += b.happy;
    v17State.totalDiplo += b.diplo;
    if(typeof resources !== 'undefined') {
        resources.happy = (resources.happy || 0) + b.happy;
    }
    playV17SFX('banquet_toast');
    if(typeof toast === 'function') toast('🍽️ ' + b.icon + ' ' + b.name + ' 개최! (민심+' + b.happy + ' 외교+' + b.diplo + ')');
    if(typeof addChronicle === 'function') addChronicle(b.icon, b.name + '을(를) 성대하게 개최했습니다.');
    saveV17State(); renderBanquet();
};

// ===================== 8. ROYAL TOMBS MAP =====================
function renderTomb() {
    var content = document.getElementById('v17-content-tomb');
    var ec = v17State.tombsExplored.length;
    var xc = v17State.tombsExcavated.length;
    var html = '<div style="text-align:center;font-size:13px;color:#8bc34a;margin-bottom:6px;">탐사: ' + ec + '/12 | 발굴: ' + xc + '/12</div>';
    html += '<div class="v17-grid" style="grid-template-columns:repeat(auto-fill,minmax(110px,1fr));">';
    V17_TOMBS.forEach(function(t) {
        var explored = v17State.tombsExplored.indexOf(t.id) >= 0;
        var excavated = v17State.tombsExcavated.indexOf(t.id) >= 0;
        html += '<div class="v17-card' + (explored ? ' collected' : '') + '">';
        html += '<div class="vc-icon">' + t.icon + '</div>';
        html += '<div class="vc-name">' + t.name + (excavated ? ' ⛏️' : explored ? ' ✅' : '') + '</div>';
        html += '<div class="vc-era">' + t.era + '</div>';
        html += '<div style="font-size:8px;color:#888;">' + t.desc + '</div>';
        if(!explored) {
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 8px;" onclick="v17ExploreTomb(\'' + t.id + '\')">탐사</button>';
        } else if(!excavated) {
            html += '<button class="v17-btn" style="font-size:9px;padding:2px 8px;background:#795548;" onclick="v17ExcavateTomb(\'' + t.id + '\')">발굴 (40금)</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    content.innerHTML = html;

    var canvas = document.getElementById('v17-canvas-tomb');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr; canvas.height = 400 * dpr;
    canvas.style.width = '600px'; canvas.style.height = '400px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 600, 400);

    // Map background
    ctx.fillStyle = '#1a3a1a'; ctx.fillRect(30, 40, 540, 330);
    ctx.strokeStyle = '#2a5a2a'; ctx.lineWidth = 2; ctx.strokeRect(30, 40, 540, 330);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('한국 주요 왕릉 위치도', 300, 30);

    // Grid
    for(var gx = 30; gx <= 570; gx += 54) {
        ctx.beginPath(); ctx.moveTo(gx, 40); ctx.lineTo(gx, 370);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1; ctx.stroke();
    }
    for(var gy = 40; gy <= 370; gy += 33) {
        ctx.beginPath(); ctx.moveTo(30, gy); ctx.lineTo(570, gy);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Korean peninsula outline hint
    ctx.beginPath();
    ctx.moveTo(250, 50); ctx.quadraticCurveTo(200, 100, 180, 180);
    ctx.quadraticCurveTo(160, 250, 200, 320);
    ctx.quadraticCurveTo(250, 360, 350, 350);
    ctx.quadraticCurveTo(420, 330, 450, 280);
    ctx.quadraticCurveTo(470, 220, 440, 150);
    ctx.quadraticCurveTo(400, 80, 350, 55);
    ctx.quadraticCurveTo(300, 45, 250, 50);
    ctx.strokeStyle = 'rgba(100,180,100,0.25)'; ctx.lineWidth = 2; ctx.stroke();

    // Tomb markers
    var eraColors = {'고구려':'#e53935','백제':'#1e88e5','신라':'#fdd835','고려':'#4caf50','조선':'#ff9800'};
    V17_TOMBS.forEach(function(t) {
        var px = 30 + t.x * 540;
        var py = 40 + t.y * 330;
        var explored = v17State.tombsExplored.indexOf(t.id) >= 0;
        var excavated = v17State.tombsExcavated.indexOf(t.id) >= 0;
        var color = eraColors[t.era] || '#888';

        if(excavated) {
            ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.globalAlpha = 0.4; ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke();
        } else if(explored) {
            ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.globalAlpha = 0.3; ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
        } else {
            ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100,100,100,0.3)'; ctx.fill();
            ctx.strokeStyle = '#666'; ctx.lineWidth = 1; ctx.stroke();
        }

        ctx.fillStyle = explored ? '#fff' : '#777'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(t.icon, px, py + 4);
        ctx.fillStyle = explored ? '#ccc' : '#555'; ctx.font = '8px sans-serif';
        ctx.fillText(t.name, px, py + 22);
    });

    // Legend
    var eras = Object.keys(eraColors);
    eras.forEach(function(era, i) {
        ctx.fillStyle = eraColors[era]; ctx.fillRect(40 + i * 100, 380, 10, 10);
        ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(era, 54 + i * 100, 390);
    });
}

window.v17ExploreTomb = function(id) {
    if(v17State.tombsExplored.indexOf(id) >= 0) return;
    v17State.tombsExplored.push(id);
    var t = null;
    V17_TOMBS.forEach(function(x) { if(x.id === id) t = x; });
    playV17SFX('tomb_discover');
    if(typeof toast === 'function') toast('🏛️ ' + t.icon + ' ' + t.name + ' 탐사 완료!');
    if(typeof addChronicle === 'function') addChronicle(t.icon, t.name + '을(를) 탐사했습니다. ' + t.desc);
    saveV17State(); renderTomb();
};

window.v17ExcavateTomb = function(id) {
    if(v17State.tombsExcavated.indexOf(id) >= 0) return;
    if(v17State.tombsExplored.indexOf(id) < 0) return;
    if(typeof resources !== 'undefined' && resources.gold < 40) { if(typeof toast === 'function') toast('금이 부족합니다!'); return; }
    if(typeof resources !== 'undefined') resources.gold -= 40;
    v17State.tombsExcavated.push(id);
    var t = null;
    V17_TOMBS.forEach(function(x) { if(x.id === id) t = x; });
    playV17SFX('tomb_discover');
    if(typeof resources !== 'undefined') resources.culture = (resources.culture || 0) + 10;
    if(typeof toast === 'function') toast('⛏️ ' + t.icon + ' ' + t.name + ' 발굴 완료! (문화 +10)');
    if(typeof addChronicle === 'function') addChronicle(t.icon, t.name + '을(를) 발굴하여 귀중한 유물을 발견했습니다.');
    saveV17State(); renderTomb();
};

// ===================== QUIZ +15 (190->205) =====================
function hookV17Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQs = [
        {q:'고구려 장수왕이 남진정책을 위해 수도를 옮긴 곳은?', a:['평양','국내성','한성','서경'], c:0},
        {q:'세계 최초의 우량계인 측우기를 발명한 시대의 왕은?', a:['세종','정조','영조','태종'], c:0},
        {q:'1592년 임진왜란 때 거북선을 이끌고 해전에서 승리한 장군은?', a:['이순신','권율','곽재우','김시민'], c:0},
        {q:'동학농민운동의 지도자는 누구인가요?', a:['전봉준','홍경래','임꺽정','최제우'], c:0},
        {q:'신라 선덕여왕 때 건립된 동양 최고의 천문관측대는?', a:['첨성대','간의대','관천대','서운관'], c:0},
        {q:'고려시대 세계 최초의 금속활자 인쇄본의 이름은?', a:['직지심체요절','무구정광대다라니경','팔만대장경','삼국유사'], c:0},
        {q:'백제 무령왕릉이 발견된 도시는 어디인가요?', a:['공주','부여','익산','서울'], c:0},
        {q:'조선시대 풍수지리에 따라 한양 도성의 남쪽 정문은?', a:['숭례문(남대문)','흥인지문(동대문)','돈의문(서대문)','숙정문(북대문)'], c:0},
        {q:'신라 경주 대릉원에서 출토된 &quot;천마도&quot;는 어디에 그려져 있었나요?', a:['말다래(말안장 가리개)','투구','방패','갑옷'], c:0},
        {q:'고려 태조 왕건의 훈요십조에서 중시한 사상은?', a:['풍수지리','성리학','도교','법가'], c:0},
        {q:'조선시대 왕의 즉위식이 거행된 경복궁의 정전은?', a:['근정전','경회루','교태전','사정전'], c:0},
        {q:'삼국시대 가야 연맹의 중심 국가는?', a:['금관가야','대가야','아라가야','소가야'], c:0},
        {q:'홍경래의 난이 일어난 지역은?', a:['평안도','함경도','경상도','전라도'], c:0},
        {q:'조선시대 자동으로 시간을 알려주는 물시계의 이름은?', a:['자격루','앙부일구','혼천의','측우기'], c:0},
        {q:'백제 금동대향로가 출토된 유적지는?', a:['부여 능산리','공주 무령왕릉','익산 미륵사지','서울 풍납토성'], c:0}
    ];
    newQs.forEach(function(q) {
        if(!quizQuestions.some(function(existing) { return existing.q === q.q; })) {
            quizQuestions.push(q);
        }
    });
}

// ===================== ACHIEVEMENTS +12 (170->182) =====================
function hookV17Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAchs = [
        {id:'marriage_diplomat', icon:'💒', title:'혼인 외교관', desc:'혼인동맹 3건 이상 체결', check: function(){ return v17State.marriages.length >= 3; }},
        {id:'science_pioneer', icon:'🔬', title:'과학 선구자', desc:'과학기술 3종 이상 연구 완료', check: function(){ var c=0; Object.keys(v17State.sciences).forEach(function(k){ if(v17State.sciences[k].unlocked) c++; }); return c>=3; }},
        {id:'rebellion_solver', icon:'⚔️', title:'봉기 해결사', desc:'봉기 5건 이상 성공적 해결', check: function(){ return v17State.rebellionsSolved >= 5; }},
        {id:'treasure_collector', icon:'💎', title:'보물 수집가', desc:'보물 5종 이상 수집', check: function(){ return v17State.treasuresCollected.length >= 5; }},
        {id:'class_reformer', icon:'📜', title:'사회 개혁가', desc:'정책 5회 이상 시행', check: function(){ return v17State.policiesApplied.length >= 5; }},
        {id:'fengshui_master', icon:'🧭', title:'풍수 대가', desc:'모든 방위 점수 60 이상', check: function(){ var keys=['east','west','south','north','se','ne','sw','nw']; return keys.every(function(k){return v17State.fengshui[k]>=60;}); }},
        {id:'banquet_host', icon:'🍽️', title:'연회 주최자', desc:'연회 5회 이상 개최', check: function(){ return v17State.banquetsHeld.length >= 5; }},
        {id:'tomb_explorer', icon:'🏛️', title:'왕릉 탐험가', desc:'왕릉 5곳 이상 탐사', check: function(){ return v17State.tombsExplored.length >= 5; }},
        {id:'v17_5features', icon:'🏯', title:'v17 탐험가', desc:'v17 기능 5개 이상 사용', check: function(){ return Object.keys(v17State.featuresUsed).length >= 5; }},
        {id:'v17_all_tombs', icon:'🗺️', title:'왕릉 완전정복', desc:'12왕릉 모두 탐사', check: function(){ return v17State.tombsExplored.length >= 12; }},
        {id:'v17_all_science', icon:'🔭', title:'과학 마스터', desc:'12종 과학기술 모두 연구 완료', check: function(){ var c=0; Object.keys(v17State.sciences).forEach(function(k){ if(v17State.sciences[k].unlocked) c++; }); return c>=12; }},
        {id:'v17_explorer', icon:'🌟', title:'v17 정복자', desc:'v17 모든 기능 사용', check: function(){ return Object.keys(v17State.featuresUsed).length >= 8; }}
    ];
    newAchs.forEach(function(a) {
        if(!achievements.some(function(ex) { return ex.id === a.id; })) {
            achievements.push(a);
        }
    });
}

function hookV17CheckAchievements() {
    if(typeof checkAchievements !== 'function') return;
    var origCheck = checkAchievements;
    var v17AchIds = ['marriage_diplomat','science_pioneer','rebellion_solver','treasure_collector','class_reformer','fengshui_master','banquet_host','tomb_explorer','v17_5features','v17_all_tombs','v17_all_science','v17_explorer'];
    checkAchievements = function() {
        origCheck();
        if(typeof achievements === 'undefined' || typeof unlockedAchievements === 'undefined') return;
        achievements.forEach(function(a) {
            if(a.id && v17AchIds.indexOf(a.id) >= 0 && !unlockedAchievements.has(a.id)) {
                try {
                    if(a.check && a.check()) {
                        unlockedAchievements.add(a.id);
                        playV17SFX('achieve_v17');
                        if(typeof showAchievementToast === 'function') showAchievementToast(a);
                        try { localStorage.setItem('cityAchievements', JSON.stringify([].concat(Array.from ? Array.from(unlockedAchievements) : []))); } catch(e){}
                    }
                } catch(e){}
            }
        });
    };
}

// ===================== GAME TICK HOOK =====================
function hookV17GameTick() {
    if(typeof window.gameTick !== 'function') return;
    var origTick = window.gameTick;
    window.gameTick = function() {
        origTick();
        v17TickUpdate();
    };
}

function v17TickUpdate() {
    v17State.researchPoints = Math.min(500, v17State.researchPoints + 1);
}

// ===================== ADVISOR TIPS =====================
function hookV17AdvisorTips() {
    if(typeof advisorTips === 'undefined') return;
    var newTips = [
        '💒 왕실혼인외교로 동맹을 맺어 외교력을 높이세요!',
        '🔬 고대과학기술원에서 선행 기술을 먼저 연구해야 다음 기술을 개발할 수 있습니다!',
        '⚔️ 봉기 관리 시 진압보다 수용이 성공률이 높습니다!',
        '💎 보물을 수집한 뒤 전시하면 문화 점수가 올라갑니다!',
        '👥 계층사회 정책을 시행하여 사회 불평등을 줄여보세요!',
        '🧭 풍수지리 점수가 높을수록 도시의 기운이 좋아집니다!',
        '🍽️ 다양한 연회를 열어 민심과 외교 보너스를 얻으세요!',
        '🏛️ 왕릉을 탐사한 후 발굴하면 문화 점수를 크게 올릴 수 있습니다!'
    ];
    newTips.forEach(function(tip) {
        if(advisorTips.indexOf(tip) < 0) advisorTips.push(tip);
    });
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV17Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if(!e.shiftKey) return;
        var codeMap = {
            'KeyZ':'marriage', 'KeyX':'science', 'KeyC':'rebellion', 'KeyV':'treasure',
            'KeyB':'class', 'KeyN':'fengshui', 'KeyM':'banquet', 'Comma':'tomb'
        };
        var feature = codeMap[e.code];
        if(feature) {
            e.preventDefault();
            var nb = document.getElementById('v17-nav-bar');
            if(nb) nb.style.display = 'block';
            openV17Feature(feature);
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV17AutoSave() {
    setInterval(function() {
        saveV17State();
    }, 60000);
}

// ===================== INIT =====================
function initV17() {
    loadV17State();
    addV17UI();
    hookV17GameTick();
    hookV17Quiz();
    hookV17Achievements();
    hookV17CheckAchievements();
    hookV17AdvisorTips();
    hookV17AutoSave();
    hookV17Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🏯 v17.0: 왕실혼인+과학기술+봉기관리+보물창고+계층사회+풍수지리+왕실연회+왕릉지도!');
        }, 15000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV17, 5500); });
} else {
    setTimeout(initV17, 5500);
}

})();
