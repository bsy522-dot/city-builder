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
    var now = ctx.currentTime;
    function mkOsc(freq, t, dur, wave, vol) {
        var o = ctx.createOscillator(); o.type = wave || 'sine';
        o.frequency.setValueAtTime(freq, now + t);
        var g = ctx.createGain(); g.connect(ctx.destination);
        g.gain.setValueAtTime(vol || 0.09, now + t);
        g.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
        o.connect(g); o.start(now + t); o.stop(now + t + dur);
    }
    switch(type) {
        case 'marriage_bell':
            [523,659,784,1047].forEach(function(f,i){ mkOsc(f,i*0.12,0.3,'sine',0.08); });
            break;
        case 'science_discover':
            [330,392,494,588,784].forEach(function(f,i){ mkOsc(f,i*0.09,0.25,'triangle',0.08); });
            break;
        case 'rebellion_alarm':
            [880,660,880,660,880].forEach(function(f,i){ mkOsc(f,i*0.08,0.1,'square',0.05); });
            break;
        case 'rebellion_calm':
            [494,440,392,330,262].forEach(function(f,i){ mkOsc(f,i*0.1,0.2,'sine',0.07); });
            break;
        case 'treasure_find':
            [262,330,392,494,588,784].forEach(function(f,i){ mkOsc(f,i*0.08,0.2,'sine',0.09); });
            break;
        case 'treasure_display':
            [784,659,523].forEach(function(f,i){ mkOsc(f,i*0.15,0.3,'triangle',0.07); });
            break;
        case 'class_reform':
            [440,494,554,588].forEach(function(f,i){ mkOsc(f,i*0.1,0.2,'sine',0.08); });
            break;
        case 'fengshui_analyze':
            [262,330,392,330,262].forEach(function(f,i){ mkOsc(f,i*0.12,0.25,'sine',0.06); });
            break;
        case 'banquet_toast':
            [523,659,784,659,523,784,1047].forEach(function(f,i){ mkOsc(f,i*0.07,0.15,'sine',0.08); });
            break;
        case 'tomb_discover':
            [220,262,330,392,440].forEach(function(f,i){ mkOsc(f,i*0.14,0.3,'triangle',0.07); });
            break;
        case 'achieve_v17':
            [523,659,784,1047,784,1047].forEach(function(f,i){ mkOsc(f,i*0.08,0.2,'sine',0.09); });
            break;
        case 'nav_v17':
            mkOsc(660,0,0.1,'triangle',0.06);
            break;
    }
}

// ===================== STATE =====================
var v17State = {
    marriages: {},
    scienceUnlocked: {},
    sciencePoints: 50,
    rebellions: {},
    treasures: {},
    classPolicy: [],
    classDist: [5,10,15,30,25,15],
    fengshui: [60,60,60,60,60,60,60,60],
    banquetsHeld: {},
    tombsExplored: {},
    featuresUsed: {}
};

function saveV17State() {
    try { localStorage.setItem('cb_v17_state', JSON.stringify(v17State)); } catch(e){}
}
function loadV17State() {
    try {
        var s = localStorage.getItem('cb_v17_state');
        if(s) {
            var parsed = JSON.parse(s);
            for(var k in parsed) { if(parsed.hasOwnProperty(k)) v17State[k] = parsed[k]; }
        }
    } catch(e){}
}

// ===================== DATA =====================
var HOUSES = [
    {id:'goguryeo',name:'고구려 왕실',icon:'🏔️',power:85,color:'#e74c3c'},
    {id:'baekje',name:'백제 왕실',icon:'🌊',power:75,color:'#3498db'},
    {id:'silla',name:'신라 왕실',icon:'👑',power:80,color:'#f1c40f'},
    {id:'gaya',name:'가야 왕실',icon:'⚔️',power:65,color:'#2ecc71'},
    {id:'tang',name:'당나라',icon:'🐉',power:90,color:'#e67e22'},
    {id:'japan',name:'일본',icon:'🗾',power:70,color:'#9b59b6'},
    {id:'khitan',name:'거란',icon:'🐎',power:80,color:'#1abc9c'},
    {id:'jurchen',name:'여진',icon:'🏹',power:75,color:'#34495e'}
];

var SCIENCES = [
    {id:'chukugi',name:'측우기',icon:'🌧️',era:'조선',cost:30,bonus:'농업 생산+10%',desc:'세종 시대 발명된 세계 최초의 강우 측정기'},
    {id:'honcheonui',name:'혼천의',icon:'🌍',era:'조선',cost:40,bonus:'문화+15',desc:'천체의 운행을 관측하는 천문 기구'},
    {id:'jagyeongnu',name:'자격루',icon:'⏰',era:'조선',cost:35,bonus:'행복+10',desc:'장영실이 만든 자동 물시계'},
    {id:'geobukseon',name:'거북선',icon:'🐢',era:'조선',cost:50,bonus:'군사력+20%',desc:'이순신의 철갑 돌격선'},
    {id:'hwacha',name:'화차',icon:'🎆',era:'조선',cost:45,bonus:'방어력+15%',desc:'신기전을 발사하는 다연장 로켓'},
    {id:'cheomseongdae',name:'첨성대',icon:'🔭',era:'신라',cost:25,bonus:'과학+20',desc:'동아시아 최고(最古)의 천문대'},
    {id:'celadon',name:'고려청자',icon:'🏺',era:'고려',cost:30,bonus:'문화+20',desc:'비색(翡色)의 고려 상감 청자'},
    {id:'jikji',name:'직지심체요절',icon:'📖',era:'고려',cost:35,bonus:'교육+15',desc:'세계 최초의 금속활자 인쇄물'},
    {id:'sundial',name:'해시계(앙부일구)',icon:'☀️',era:'조선',cost:20,bonus:'기술+10',desc:'세종대왕이 제작한 오목해시계'},
    {id:'supyo',name:'수표',icon:'📏',era:'조선',cost:25,bonus:'재해방지+10',desc:'하천 수위 측정 표석'},
    {id:'singijeon',name:'신기전',icon:'🚀',era:'조선',cost:40,bonus:'군사력+15%',desc:'세계 최초의 다단식 로켓 화기'},
    {id:'bigyeok',name:'비격진천뢰',icon:'💣',era:'조선',cost:45,bonus:'방어력+20%',desc:'시한폭탄식 폭발 무기'}
];

var REBELLIONS = [
    {id:'honggeon',name:'홍건적 침입',icon:'🔥',era:'고려 말',year:'1359',severity:90,
     desc:'홍건적 10만 대군이 고려를 침입하여 개경을 함락시킨 사건'},
    {id:'waegu',name:'왜구 약탈',icon:'⛵',era:'고려~조선',year:'1350~',severity:80,
     desc:'일본 해적이 한반도 해안을 지속적으로 약탈한 사건'},
    {id:'imkkukjung',name:'임꺽정의 난',icon:'🗡️',era:'조선 중기',year:'1559',severity:70,
     desc:'황해도 백정 출신 임꺽정이 일으킨 의적 봉기'},
    {id:'honggyeongnae',name:'홍경래의 난',icon:'⚔️',era:'조선 후기',year:'1811',severity:85,
     desc:'평안도 차별에 반발한 홍경래의 대규모 봉기'},
    {id:'donghak',name:'동학농민운동',icon:'🌾',era:'조선 말',year:'1894',severity:95,
     desc:'전봉준이 이끈 반봉건 반외세 농민 혁명'},
    {id:'uibyeong',name:'의병운동',icon:'🏹',era:'구한말',year:'1895~',severity:88,
     desc:'외세 침략에 맞서 자발적으로 일어난 민간 무장 저항'},
    {id:'manse',name:'3.1 만세운동',icon:'🇰🇷',era:'일제강점기',year:'1919',severity:92,
     desc:'전국적 비폭력 독립운동으로 대한민국 임시정부 수립의 계기'},
    {id:'gwangju',name:'광주학생운동',icon:'📚',era:'일제강점기',year:'1929',severity:78,
     desc:'일제의 식민교육에 항거한 전국 학생 항일운동'}
];

var TREASURES = [
    {id:'geumgwan',name:'금관',icon:'👑',era:'신라',value:100,desc:'신라 금관은 세계에서 가장 많이 발굴된 순금 왕관'},
    {id:'cheonmado',name:'천마도',icon:'🐴',era:'신라',value:95,desc:'천마총에서 출토된 하늘을 나는 말 그림'},
    {id:'baekje_burner',name:'백제금동대향로',icon:'🕯️',era:'백제',value:98,desc:'백제 공예의 최고 걸작, 봉래산 형상 향로'},
    {id:'dharani',name:'무구정광대다라니경',icon:'📜',era:'통일신라',value:90,desc:'세계 최고(最古)의 목판 인쇄물'},
    {id:'emille',name:'성덕대왕신종',icon:'🔔',era:'통일신라',value:92,desc:'에밀레종으로 불리는 한국 최대의 범종'},
    {id:'cheomseong',name:'첨성대 모형',icon:'🏛️',era:'신라',value:85,desc:'현존하는 동아시아 최고(最古)의 천문대 축소 모형'},
    {id:'hunmin',name:'훈민정음 해례본',icon:'📖',era:'조선',value:100,desc:'세종대왕이 한글을 반포하며 작성한 해설서'},
    {id:'tripitaka',name:'팔만대장경',icon:'📚',era:'고려',value:97,desc:'81,258장의 목판에 새긴 불교 경전의 집대성'},
    {id:'seokguram',name:'석굴암 본존불',icon:'🧘',era:'통일신라',value:96,desc:'토함산 화강암 석굴에 안치된 본존 여래좌상'},
    {id:'gyeongcheonsa',name:'경천사십층석탑',icon:'🗼',era:'고려',value:88,desc:'고려시대 대리석 10층 석탑, 원나라 영향'}
];

var CLASSES = [
    {id:'royal',name:'왕족',icon:'👑',color:'#ffd700',pct:5},
    {id:'noble',name:'귀족',icon:'🏛️',color:'#e74c3c',pct:10},
    {id:'yangban',name:'양반',icon:'📚',color:'#3498db',pct:15},
    {id:'commoner',name:'평민',icon:'🌾',color:'#2ecc71',pct:30},
    {id:'lowborn',name:'천민',icon:'🔨',color:'#95a5a6',pct:25},
    {id:'slave',name:'노비',icon:'⛓️',color:'#7f8c8d',pct:15}
];

var DIRECTIONS = [
    {id:'e',name:'동(東)',icon:'🌅',angle:0,element:'목(木)',color:'#2ecc71'},
    {id:'se',name:'동남(東南)',icon:'🌤️',angle:45,element:'목(木)',color:'#27ae60'},
    {id:'s',name:'남(南)',icon:'☀️',angle:90,element:'화(火)',color:'#e74c3c'},
    {id:'sw',name:'서남(西南)',icon:'🌄',angle:135,element:'토(土)',color:'#f39c12'},
    {id:'w',name:'서(西)',icon:'🌇',angle:180,element:'금(金)',color:'#f1c40f'},
    {id:'nw',name:'서북(西北)',icon:'🌫️',angle:225,element:'금(金)',color:'#bdc3c7'},
    {id:'n',name:'북(北)',icon:'❄️',angle:270,element:'수(水)',color:'#3498db'},
    {id:'ne',name:'동북(東北)',icon:'🏔️',angle:315,element:'토(土)',color:'#8e44ad'}
];

var BANQUETS = [
    {id:'coronation',name:'즉위연',icon:'👑',morale:20,diplomacy:10,desc:'새 왕의 즉위를 축하하는 대연회'},
    {id:'hwangap',name:'환갑연',icon:'🎂',morale:15,diplomacy:5,desc:'왕의 60세 환갑을 축하하는 잔치'},
    {id:'birthday',name:'탄신연',icon:'🎉',morale:12,diplomacy:3,desc:'왕족의 탄생일을 기념하는 연회'},
    {id:'seasonal',name:'세시연',icon:'🌸',morale:18,diplomacy:0,desc:'설/추석 등 세시풍속 명절 잔치'},
    {id:'gwageo',name:'과거합격연',icon:'📜',morale:10,diplomacy:8,desc:'과거 급제자를 위한 축하 연회'},
    {id:'victory',name:'전승연',icon:'⚔️',morale:25,diplomacy:15,desc:'전쟁 승리를 축하하는 개선 연회'},
    {id:'harvest',name:'풍년연',icon:'🌾',morale:20,diplomacy:0,desc:'풍년을 감사하는 수확 축제'},
    {id:'diplomatic',name:'외교연',icon:'🤝',morale:5,diplomacy:25,desc:'외국 사신을 접대하는 국빈 연회'},
    {id:'wedding',name:'혼례연',icon:'💒',morale:22,diplomacy:12,desc:'왕실 혼인을 축하하는 대규모 잔치'},
    {id:'ritual',name:'제향',icon:'🕯️',morale:8,diplomacy:0,desc:'종묘/사직 제사 후 거행하는 의례 연회'}
];

var TOMBS = [
    {id:'gwanggaeto',name:'광개토대왕릉',icon:'🏔️',era:'고구려',loc:'중국 지안시',size:95,desc:'정복왕 광개토대왕의 거대한 피라미드형 석조 왕릉'},
    {id:'muryeong',name:'무령왕릉',icon:'🌊',era:'백제',loc:'공주 송산리',size:80,desc:'벽돌무덤 양식의 백제 무령왕 부부 합장릉'},
    {id:'cheonma',name:'천마총',icon:'🐴',era:'신라',loc:'경주 대릉원',size:85,desc:'천마도 장니가 출토된 신라 적석목곽분'},
    {id:'hwangnam',name:'황남대총',icon:'👑',era:'신라',loc:'경주 황남동',size:90,desc:'남북 2기의 쌍분으로 된 신라 최대 고분'},
    {id:'wanggeon',name:'왕건 왕릉(현릉)',icon:'🏛️',era:'고려',loc:'개성시',size:82,desc:'고려 태조 왕건의 왕릉'},
    {id:'sejong',name:'세종대왕 영릉',icon:'📖',era:'조선',loc:'여주시',size:88,desc:'한글 창제의 성군 세종과 소헌왕후 합장릉'},
    {id:'jeongjo',name:'정조 건릉',icon:'🎭',era:'조선',loc:'화성시',size:86,desc:'개혁군주 정조와 효의왕후의 합장릉'},
    {id:'seonjeong',name:'선정릉',icon:'🌿',era:'조선',loc:'서울 강남',size:78,desc:'성종과 중종의 왕릉이 있는 도심 속 능역'},
    {id:'donggureung',name:'동구릉',icon:'🌳',era:'조선',loc:'구리시',size:92,desc:'태조 건원릉 등 9기의 왕릉이 모인 최대 왕릉군'},
    {id:'seoreung',name:'서오릉',icon:'🍂',era:'조선',loc:'고양시',size:84,desc:'5기의 왕릉이 모인 조선 왕릉군'},
    {id:'yunggeon',name:'융건릉',icon:'🏯',era:'조선',loc:'화성시',size:87,desc:'사도세자(융릉)와 정조(건릉)의 능역'},
    {id:'daereungwon',name:'경주 대릉원',icon:'🌀',era:'신라',loc:'경주시',size:94,desc:'23기의 신라 고분이 밀집한 대규모 고분공원'}
];

// ===================== UI =====================
function addV17Styles() {
    var css = document.createElement('style');
    css.textContent = '.v17-feature-panel{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:10100;justify-content:center;align-items:center;padding:16px;}' +
        '.v17-feature-panel.show{display:flex;}' +
        '.v17-panel-box{background:linear-gradient(145deg,#2a1a3e,#1a0e2e);border:2px solid #9b59b6;border-radius:16px;padding:20px;max-width:640px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(155,89,182,0.3);}' +
        '.v17-panel-box h2{color:#bb86fc;font-size:20px;text-align:center;margin-bottom:4px;}' +
        '.v17-sub{color:#9b59b6;font-size:13px;text-align:center;margin-bottom:12px;}' +
        '.v17-canvas-wrap{text-align:center;margin:10px 0;}' +
        '.v17-canvas-wrap canvas{max-width:100%;border-radius:8px;background:rgba(0,0,0,0.3);}' +
        '.v17-close{display:block;margin:12px auto 0;background:#9b59b6;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;}' +
        '.v17-close:hover{background:#8e44ad;}' +
        '.v17-btn{background:#3a2a4e;border:1px solid #9b59b6;color:#bb86fc;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;margin:3px;}' +
        '.v17-btn:hover{background:#4a3a5e;}' +
        '.v17-btn.active{background:#9b59b6;color:#fff;}' +
        '.v17-grid{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0;}' +
        '.v17-card{background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.3);border-radius:10px;padding:8px 12px;min-width:120px;text-align:center;cursor:pointer;transition:all 0.2s;}' +
        '.v17-card:hover{background:rgba(155,89,182,0.2);border-color:#bb86fc;}' +
        '.v17-card.unlocked{border-color:#2ecc71;background:rgba(46,204,113,0.1);}' +
        '.v17-card .vc-icon{font-size:28px;display:block;}' +
        '.v17-card .vc-name{font-size:11px;color:#ddd;margin-top:2px;}' +
        '.v17-card .vc-detail{font-size:10px;color:#999;}' +
        '.v17-info{background:rgba(255,255,255,0.05);border-radius:10px;padding:12px;margin:8px 0;font-size:13px;line-height:1.6;color:#ddd;border-left:3px solid #bb86fc;}' +
        '.v17-stat{display:flex;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.06);}' +
        '.v17-stat-label{color:#aaa;}.v17-stat-value{color:#bb86fc;font-weight:bold;}';
    document.head.appendChild(css);
}

function addV17UI() {
    addV17Styles();

    var navBar = document.createElement('div');
    navBar.id = 'v17-nav-bar';
    navBar.style.cssText = 'display:none;position:fixed;bottom:218px;left:10px;z-index:10006;background:rgba(0,0,0,0.85);border:1px solid #9b59b6;border-radius:10px;padding:6px;max-width:340px;overflow-x:auto;white-space:nowrap;';
    var feats = [
        {id:'marriage',icon:'💒',label:'혼인외교'},
        {id:'science',icon:'🔬',label:'과학기술'},
        {id:'rebellion',icon:'🔥',label:'민란관리'},
        {id:'treasury',icon:'💎',label:'보물창고'},
        {id:'class',icon:'👥',label:'계층사회'},
        {id:'fengshui',icon:'🧭',label:'풍수지리'},
        {id:'banquet',icon:'🎊',label:'왕실연회'},
        {id:'tombs',icon:'⛩️',label:'왕릉지도'}
    ];
    feats.forEach(function(f) {
        var btn = document.createElement('button');
        btn.className = 'v17-btn';
        btn.innerHTML = f.icon + ' ' + f.label;
        btn.onclick = function() { playV17SFX('nav_v17'); openV17Feature(f.id); };
        navBar.appendChild(btn);
    });
    document.body.appendChild(navBar);

    var togBtn = document.createElement('button');
    togBtn.id = 'v17-toggle-btn';
    togBtn.style.cssText = 'position:fixed;bottom:180px;left:10px;z-index:10007;background:rgba(0,0,0,0.75);border:1px solid #9b59b6;color:#bb86fc;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;';
    togBtn.textContent = '💒';
    togBtn.title = 'v17 기능 (혼인외교/과학기술/민란관리/보물창고/계층사회/풍수지리/왕실연회/왕릉지도)';
    togBtn.onclick = function() {
        var nb = document.getElementById('v17-nav-bar');
        nb.style.display = nb.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(togBtn);
}

function createV17Panels() {
    var panelDefs = [
        {id:'marriage', title:'💒 왕실혼인외교관', sub:'8개 왕실가문 간 혼인동맹을 체결하여 외교력을 키우세요'},
        {id:'science', title:'🔬 고대과학기술원', sub:'12종 고대과학기술을 연구하여 문명을 발전시키세요'},
        {id:'rebellion', title:'🔥 민란봉기관리소', sub:'8종 봉기 시나리오에 대처하여 사회 안정을 지키세요'},
        {id:'treasury', title:'💎 왕실보물창고', sub:'10종 국보급 보물을 수집하고 전시하세요'},
        {id:'class', title:'👥 계층사회시뮬레이터', sub:'6계층 인구분포를 정책으로 조정하세요'},
        {id:'fengshui', title:'🧭 풍수지리감정관', sub:'8방위 풍수를 분석하여 최적의 도시배치를 찾으세요'},
        {id:'banquet', title:'🎊 왕실연회관', sub:'10종 연회를 개최하여 민심과 외교를 높이세요'},
        {id:'tombs', title:'⛩️ 역대왕릉지도', sub:'12대 왕릉을 탐사하고 역사적 의의를 발견하세요'}
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
    document.querySelectorAll('.v17-feature-panel').forEach(function(p){ p.classList.remove('show'); });
    var panel = document.getElementById('v17-panel-' + id);
    if(panel) {
        panel.classList.add('show');
        v17State.featuresUsed[id] = true;
        saveV17State();
        switch(id) {
            case 'marriage': renderMarriage(); break;
            case 'science': renderScience(); break;
            case 'rebellion': renderRebellion(); break;
            case 'treasury': renderTreasury(); break;
            case 'class': renderClass(); break;
            case 'fengshui': renderFengshui(); break;
            case 'banquet': renderBanquet(); break;
            case 'tombs': renderTombs(); break;
        }
    }
}

// ===================== CANVAS HELPERS =====================
function getCanvas(id, w, h) {
    var c = document.getElementById('v17-canvas-' + id);
    if(!c) return null;
    var dpr = window.devicePixelRatio || 1;
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = w + 'px'; c.style.height = h + 'px';
    var ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
}

// ===================== 1. MARRIAGE DIPLOMACY =====================
function renderMarriage() {
    var ctx = getCanvas('marriage', 580, 380);
    if(!ctx) return;
    ctx.fillStyle = '#0e0a1a'; ctx.fillRect(0,0,580,380);
    ctx.fillStyle = '#bb86fc'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('왕실 혼인 동맹 네트워크', 290, 28);

    var cx = 290, cy = 200, r = 130;
    HOUSES.forEach(function(h, i) {
        var angle = (i / HOUSES.length) * Math.PI * 2 - Math.PI / 2;
        var x = cx + Math.cos(angle) * r;
        var y = cy + Math.sin(angle) * r;
        h._x = x; h._y = y;
    });

    HOUSES.forEach(function(h1, i) {
        HOUSES.forEach(function(h2, j) {
            if(j <= i) return;
            var key = h1.id + '-' + h2.id;
            if(v17State.marriages[key]) {
                ctx.beginPath();
                ctx.moveTo(h1._x, h1._y);
                ctx.lineTo(h2._x, h2._y);
                ctx.strokeStyle = 'rgba(187,134,252,0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
                var mx = (h1._x + h2._x) / 2, my = (h1._y + h2._y) / 2;
                ctx.fillStyle = '#ff69b4'; ctx.font = '14px sans-serif';
                ctx.fillText('💕', mx, my);
            }
        });
    });

    HOUSES.forEach(function(h) {
        ctx.beginPath();
        ctx.arc(h._x, h._y, 28, 0, Math.PI * 2);
        ctx.fillStyle = h.color + '33';
        ctx.fill();
        ctx.strokeStyle = h.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = '22px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(h.icon, h._x, h._y + 4);
        ctx.fillStyle = '#ddd'; ctx.font = '10px sans-serif';
        ctx.fillText(h.name, h._x, h._y + 42);
        ctx.fillStyle = '#ffd700'; ctx.font = '9px sans-serif';
        ctx.fillText('세력:' + h.power, h._x, h._y + 54);
    });

    var allianceCount = Object.keys(v17State.marriages).length;
    ctx.fillStyle = '#bb86fc'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('동맹 수: ' + allianceCount + '/28', 20, 370);
    ctx.fillStyle = '#ffd700';
    ctx.fillText('외교력 보너스: +' + (allianceCount * 5), 200, 370);

    var cont = document.getElementById('v17-content-marriage');
    var html = '<div class="v17-grid">';
    HOUSES.forEach(function(h1, i) {
        HOUSES.forEach(function(h2, j) {
            if(j <= i) return;
            var key = h1.id + '-' + h2.id;
            var allied = v17State.marriages[key];
            html += '<button class="v17-btn' + (allied ? ' active' : '') + '" onclick="window.v17ToggleMarriage(\'' + key + '\')">' +
                h1.icon + '↔' + h2.icon + (allied ? ' ✓' : '') + '</button>';
        });
    });
    html += '</div>';
    cont.innerHTML = html;
}

window.v17ToggleMarriage = function(key) {
    if(v17State.marriages[key]) {
        delete v17State.marriages[key];
    } else {
        v17State.marriages[key] = true;
        playV17SFX('marriage_bell');
        if(typeof addChronicle === 'function') addChronicle('💒', '왕실 혼인동맹이 체결되었습니다!');
    }
    saveV17State();
    renderMarriage();
};

// ===================== 2. SCIENCE ACADEMY =====================
function renderScience() {
    var ctx = getCanvas('science', 560, 360);
    if(!ctx) return;
    ctx.fillStyle = '#0a0e1a'; ctx.fillRect(0,0,560,360);
    ctx.fillStyle = '#bb86fc'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('고대 과학기술 연구트리', 280, 24);

    var cols = 4, rows = 3;
    var cw = 120, ch = 90, gx = 30, gy = 45;
    SCIENCES.forEach(function(s, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = gx + col * (cw + 12), y = gy + row * (ch + 10);
        var unlocked = v17State.scienceUnlocked[s.id];

        ctx.fillStyle = unlocked ? 'rgba(46,204,113,0.15)' : 'rgba(155,89,182,0.1)';
        ctx.strokeStyle = unlocked ? '#2ecc71' : '#9b59b6';
        ctx.lineWidth = unlocked ? 2 : 1;
        ctx.beginPath(); ctx.roundRect(x, y, cw, ch, 8); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s.icon, x + cw/2, y + 28);
        ctx.fillStyle = unlocked ? '#2ecc71' : '#ddd'; ctx.font = 'bold 11px sans-serif';
        ctx.fillText(s.name, x + cw/2, y + 48);
        ctx.fillStyle = '#999'; ctx.font = '9px sans-serif';
        ctx.fillText(s.era + ' | 비용:' + s.cost, x + cw/2, y + 62);
        ctx.fillStyle = unlocked ? '#2ecc71' : '#ffd700'; ctx.font = '9px sans-serif';
        ctx.fillText(unlocked ? '✓ 완료' : s.bonus, x + cw/2, y + 76);

        if(i > 0 && row > 0) {
            var prevIdx = i - cols;
            if(prevIdx >= 0) {
                var px = gx + (prevIdx % cols) * (cw + 12) + cw/2;
                var py = gy + Math.floor(prevIdx / cols) * (ch + 10) + ch;
                ctx.beginPath(); ctx.moveTo(px, py);
                ctx.lineTo(x + cw/2, y);
                ctx.strokeStyle = 'rgba(155,89,182,0.3)'; ctx.lineWidth = 1; ctx.stroke();
            }
        }
    });

    ctx.fillStyle = '#ffd700'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('연구 포인트: ' + v17State.sciencePoints, 20, 350);
    var unlockCount = Object.keys(v17State.scienceUnlocked).length;
    ctx.fillStyle = '#2ecc71';
    ctx.fillText('해금: ' + unlockCount + '/12', 200, 350);

    var acts = document.getElementById('v17-actions-science');
    var html = '<div class="v17-grid">';
    SCIENCES.forEach(function(s) {
        var unlocked = v17State.scienceUnlocked[s.id];
        html += '<button class="v17-btn' + (unlocked ? ' active' : '') + '" ' +
            (unlocked ? 'disabled' : 'onclick="window.v17ResearchScience(\'' + s.id + '\')"') + '>' +
            s.icon + ' ' + s.name + (unlocked ? ' ✓' : ' (' + s.cost + ')') + '</button>';
    });
    html += '</div>';
    acts.innerHTML = html;
}

window.v17ResearchScience = function(id) {
    var sci = SCIENCES.find(function(s){ return s.id === id; });
    if(!sci || v17State.scienceUnlocked[id]) return;
    if(v17State.sciencePoints < sci.cost) {
        if(typeof toast === 'function') toast('연구 포인트가 부족합니다! (필요: ' + sci.cost + ')');
        return;
    }
    v17State.sciencePoints -= sci.cost;
    v17State.scienceUnlocked[id] = true;
    playV17SFX('science_discover');
    if(typeof toast === 'function') toast('🔬 ' + sci.name + ' 연구 완료! ' + sci.bonus);
    if(typeof addChronicle === 'function') addChronicle('🔬', sci.name + '이(가) 발명되어 문명이 진보했습니다.');
    saveV17State();
    renderScience();
};

// ===================== 3. REBELLION MANAGEMENT =====================
function renderRebellion() {
    var ctx = getCanvas('rebellion', 600, 380);
    if(!ctx) return;
    ctx.fillStyle = '#1a0a0a'; ctx.fillRect(0,0,600,380);
    ctx.fillStyle = '#ff6b6b'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('민란 봉기 관리소', 300, 24);

    var bw = 55, gap = 12, startX = 30;
    REBELLIONS.forEach(function(r, i) {
        var x = startX + i * (bw + gap);
        var resolved = v17State.rebellions[r.id];
        var barH = r.severity * 2.5;

        ctx.fillStyle = resolved ? 'rgba(46,204,113,0.6)' : 'rgba(231,76,60,0.6)';
        ctx.fillRect(x, 300 - barH, bw, barH);
        ctx.strokeStyle = resolved ? '#2ecc71' : '#e74c3c';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, 300 - barH, bw, barH);

        ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(r.icon, x + bw/2, 320);
        ctx.fillStyle = '#ddd'; ctx.font = '9px sans-serif';
        ctx.fillText(r.name.substring(0,4), x + bw/2, 338);
        ctx.fillStyle = '#999'; ctx.font = '8px sans-serif';
        ctx.fillText(r.year, x + bw/2, 350);
        ctx.fillStyle = resolved ? '#2ecc71' : '#ff6b6b'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(resolved ? '해결' : r.severity, x + bw/2, 300 - barH - 6);
    });

    ctx.fillStyle = '#aaa'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('심각도 (높을수록 위험)', 20, 370);
    var resolvedCount = Object.keys(v17State.rebellions).length;
    ctx.fillStyle = '#2ecc71'; ctx.textAlign = 'right';
    ctx.fillText('해결: ' + resolvedCount + '/8', 580, 370);

    var cont = document.getElementById('v17-content-rebellion');
    var html = '';
    REBELLIONS.forEach(function(r) {
        var resolved = v17State.rebellions[r.id];
        html += '<div class="v17-info" style="border-left-color:' + (resolved ? '#2ecc71' : '#e74c3c') + ';">' +
            '<strong>' + r.icon + ' ' + r.name + '</strong> (' + r.era + ', ' + r.year + ')<br>' +
            '<span style="color:#aaa;font-size:11px;">' + r.desc + '</span><br>';
        if(!resolved) {
            html += '<button class="v17-btn" onclick="window.v17ResolveRebellion(\'' + r.id + '\',\'suppress\')">⚔️ 진압</button>' +
                '<button class="v17-btn" onclick="window.v17ResolveRebellion(\'' + r.id + '\',\'negotiate\')">🤝 대화</button>' +
                '<button class="v17-btn" onclick="window.v17ResolveRebellion(\'' + r.id + '\',\'accept\')">✅ 수용</button>';
        } else {
            html += '<span style="color:#2ecc71;">✓ ' + v17State.rebellions[r.id] + ' 으로 해결됨</span>';
        }
        html += '</div>';
    });
    cont.innerHTML = html;
}

window.v17ResolveRebellion = function(id, method) {
    var methods = {suppress:'진압',negotiate:'대화',accept:'수용'};
    v17State.rebellions[id] = methods[method] || method;
    playV17SFX('rebellion_calm');
    var reb = REBELLIONS.find(function(r){ return r.id === id; });
    if(typeof toast === 'function') toast('🔥 ' + (reb ? reb.name : '') + ' — ' + methods[method] + '으로 해결!');
    if(typeof addChronicle === 'function') addChronicle('🔥', (reb ? reb.name : '봉기') + '이(가) ' + methods[method] + '으로 해결되었습니다.');
    saveV17State();
    renderRebellion();
};

// ===================== 4. ROYAL TREASURY =====================
function renderTreasury() {
    var ctx = getCanvas('treasury', 560, 340);
    if(!ctx) return;
    ctx.fillStyle = '#1a1a0a'; ctx.fillRect(0,0,560,340);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('왕실 보물창고', 280, 24);

    var cols = 5, cw = 95, ch = 120, gx = 20, gy = 40;
    TREASURES.forEach(function(t, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = gx + col * (cw + 10), y = gy + row * (ch + 10);
        var collected = v17State.treasures[t.id];

        ctx.fillStyle = collected ? 'rgba(255,215,0,0.12)' : 'rgba(100,100,100,0.1)';
        ctx.strokeStyle = collected ? '#ffd700' : '#555';
        ctx.lineWidth = collected ? 2 : 1;
        ctx.beginPath(); ctx.roundRect(x, y, cw, ch, 8); ctx.fill(); ctx.stroke();

        ctx.fillStyle = collected ? '#fff' : '#888'; ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.icon, x + cw/2, y + 38);
        ctx.fillStyle = collected ? '#ffd700' : '#aaa'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(t.name.substring(0,6), x + cw/2, y + 60);
        ctx.fillStyle = '#999'; ctx.font = '8px sans-serif';
        ctx.fillText(t.era, x + cw/2, y + 74);

        if(collected) {
            var valW = (t.value / 100) * (cw - 10);
            ctx.fillStyle = 'rgba(255,215,0,0.3)';
            ctx.fillRect(x + 5, y + 82, cw - 10, 8);
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(x + 5, y + 82, valW, 8);
            ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif';
            ctx.fillText('가치:' + t.value, x + cw/2, y + 102);
        } else {
            ctx.fillStyle = '#666'; ctx.font = '9px sans-serif';
            ctx.fillText('미발견', x + cw/2, y + 96);
        }
    });

    var collected = Object.keys(v17State.treasures).length;
    ctx.fillStyle = '#ffd700'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('수집: ' + collected + '/10', 20, 330);

    var acts = document.getElementById('v17-actions-treasury');
    var html = '<div class="v17-grid">';
    TREASURES.forEach(function(t) {
        var has = v17State.treasures[t.id];
        html += '<button class="v17-btn' + (has ? ' active' : '') + '" ' +
            (has ? '' : 'onclick="window.v17CollectTreasure(\'' + t.id + '\')"') + '>' +
            t.icon + ' ' + t.name.substring(0,5) + (has ? ' ✓' : '') + '</button>';
    });
    html += '</div>';
    acts.innerHTML = html;
}

window.v17CollectTreasure = function(id) {
    if(v17State.treasures[id]) return;
    v17State.treasures[id] = true;
    playV17SFX('treasure_find');
    var tr = TREASURES.find(function(t){ return t.id === id; });
    if(typeof toast === 'function') toast('💎 ' + (tr ? tr.name : '보물') + ' 발견!');
    if(typeof addChronicle === 'function') addChronicle('💎', (tr ? tr.name : '보물') + '이(가) 왕실 보물창고에 입고되었습니다.');
    saveV17State();
    renderTreasury();
};

// ===================== 5. SOCIAL CLASS SIMULATOR =====================
function renderClass() {
    var ctx = getCanvas('class', 580, 360);
    if(!ctx) return;
    ctx.fillStyle = '#0e0e1a'; ctx.fillRect(0,0,580,360);
    ctx.fillStyle = '#bb86fc'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('계층 사회 시뮬레이터', 290, 24);

    var barX = 80, barW = 420, barStartY = 50, barH = 36, gap = 6;
    var total = 0;
    v17State.classDist.forEach(function(v){ total += v; });

    CLASSES.forEach(function(c, i) {
        var y = barStartY + i * (barH + gap);
        var pct = v17State.classDist[i] / total;
        var w = pct * barW;

        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(barX, y, barW, barH);
        ctx.fillStyle = c.color + '99';
        ctx.fillRect(barX, y, w, barH);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, y, barW, barH);

        ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(c.icon, barX - 8, y + barH/2 + 6);
        ctx.fillStyle = '#ddd'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.name, barX + 8, y + barH/2 + 4);
        ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((pct * 100).toFixed(1) + '%', barX + barW - 8, y + barH/2 + 4);
    });

    ctx.fillStyle = '#aaa'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('정책을 적용하면 계층 분포가 변화합니다', 290, 320);

    var policies = [
        {id:'gwageo',name:'과거제 확대',icon:'📜',effect:'양반↑ 평민↓',fn:function(){ v17State.classDist[2]+=3; v17State.classDist[3]-=3; }},
        {id:'liberation',name:'신분해방령',icon:'⛓️',effect:'노비↓ 평민↑',fn:function(){ v17State.classDist[5]-=3; v17State.classDist[3]+=3; if(v17State.classDist[5]<2)v17State.classDist[5]=2; }},
        {id:'tax',name:'조세 개혁',icon:'💰',effect:'귀족↓ 평민↑',fn:function(){ v17State.classDist[1]-=2; v17State.classDist[3]+=2; if(v17State.classDist[1]<3)v17State.classDist[1]=3; }},
        {id:'education',name:'교육 확대',icon:'📚',effect:'천민↓ 양반↑',fn:function(){ v17State.classDist[4]-=3; v17State.classDist[2]+=3; if(v17State.classDist[4]<5)v17State.classDist[4]=5; }},
        {id:'military',name:'군공 신분제',icon:'⚔️',effect:'평민↓ 귀족↑',fn:function(){ v17State.classDist[3]-=2; v17State.classDist[1]+=2; }},
        {id:'trade',name:'상업 진흥',icon:'🏪',effect:'평민↑ 천민↓',fn:function(){ v17State.classDist[3]+=2; v17State.classDist[4]-=2; if(v17State.classDist[4]<3)v17State.classDist[4]=3; }}
    ];

    var acts = document.getElementById('v17-actions-class');
    var html = '<div class="v17-grid">';
    policies.forEach(function(p, idx) {
        html += '<button class="v17-btn" onclick="window.v17ApplyClassPolicy(' + idx + ')">' + p.icon + ' ' + p.name + '<br><span style="font-size:9px;color:#aaa;">' + p.effect + '</span></button>';
    });
    html += '</div>';
    acts.innerHTML = html;

    window._v17ClassPolicies = policies;
}

window.v17ApplyClassPolicy = function(idx) {
    var policies = window._v17ClassPolicies;
    if(!policies || !policies[idx]) return;
    policies[idx].fn();
    v17State.classPolicy.push(policies[idx].id);
    playV17SFX('class_reform');
    if(typeof toast === 'function') toast('👥 ' + policies[idx].name + ' 시행! ' + policies[idx].effect);
    if(typeof addChronicle === 'function') addChronicle('👥', policies[idx].name + ' 정책이 시행되어 계층 분포가 변화했습니다.');
    saveV17State();
    renderClass();
};

// ===================== 6. FENG SHUI ADVISOR =====================
function renderFengshui() {
    var ctx = getCanvas('fengshui', 560, 380);
    if(!ctx) return;
    ctx.fillStyle = '#0a1a0e'; ctx.fillRect(0,0,560,380);
    ctx.fillStyle = '#2ecc71'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('풍수지리 감정 (8방위 Radar)', 280, 24);

    var cx = 280, cy = 200, maxR = 140;

    for(var ring = 1; ring <= 5; ring++) {
        var rr = maxR * ring / 5;
        ctx.beginPath();
        for(var d = 0; d < 8; d++) {
            var a = (d / 8) * Math.PI * 2 - Math.PI / 2;
            var px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            if(d === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(46,204,113,0.15)';
        ctx.lineWidth = 1; ctx.stroke();
    }

    DIRECTIONS.forEach(function(dir, i) {
        var a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.strokeStyle = 'rgba(46,204,113,0.2)'; ctx.lineWidth = 1; ctx.stroke();
        var lx = cx + Math.cos(a) * (maxR + 25);
        var ly = cy + Math.sin(a) * (maxR + 25);
        ctx.fillStyle = dir.color; ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(dir.icon, lx, ly);
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif';
        ctx.fillText(dir.name, lx, ly + 14);
    });

    ctx.beginPath();
    DIRECTIONS.forEach(function(dir, i) {
        var a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        var val = v17State.fengshui[i] / 100;
        var px = cx + Math.cos(a) * maxR * val;
        var py = cy + Math.sin(a) * maxR * val;
        if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(46,204,113,0.2)';
    ctx.fill();
    ctx.strokeStyle = '#2ecc71'; ctx.lineWidth = 2; ctx.stroke();

    DIRECTIONS.forEach(function(dir, i) {
        var a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        var val = v17State.fengshui[i] / 100;
        var px = cx + Math.cos(a) * maxR * val;
        var py = cy + Math.sin(a) * maxR * val;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI*2);
        ctx.fillStyle = '#2ecc71'; ctx.fill();
    });

    var avg = 0;
    v17State.fengshui.forEach(function(v){ avg += v; });
    avg = (avg / 8).toFixed(1);
    var grade = avg >= 90 ? '명당(S)' : avg >= 75 ? '길지(A)' : avg >= 60 ? '보통(B)' : avg >= 40 ? '약지(C)' : '흉지(D)';
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif';
    ctx.fillText('종합 풍수: ' + avg + '점 — ' + grade, 280, 370);

    var acts = document.getElementById('v17-actions-fengshui');
    acts.innerHTML = '<button class="v17-btn" onclick="window.v17AnalyzeFengshui()">🧭 풍수 재감정 (랜덤 변동)</button>' +
        '<button class="v17-btn" onclick="window.v17OptimizeFengshui()">✨ 비보(裨補) 시행 (약점 보강)</button>';
}

window.v17AnalyzeFengshui = function() {
    for(var i = 0; i < 8; i++) {
        v17State.fengshui[i] = Math.max(10, Math.min(100, v17State.fengshui[i] + Math.floor(Math.random() * 30) - 15));
    }
    playV17SFX('fengshui_analyze');
    if(typeof toast === 'function') toast('🧭 풍수 재감정 완료!');
    saveV17State();
    renderFengshui();
};

window.v17OptimizeFengshui = function() {
    var minIdx = 0, minVal = v17State.fengshui[0];
    v17State.fengshui.forEach(function(v, i) { if(v < minVal) { minVal = v; minIdx = i; } });
    v17State.fengshui[minIdx] = Math.min(100, v17State.fengshui[minIdx] + 20);
    playV17SFX('fengshui_analyze');
    if(typeof toast === 'function') toast('✨ ' + DIRECTIONS[minIdx].name + ' 방위 비보 완료! +20');
    if(typeof addChronicle === 'function') addChronicle('🧭', DIRECTIONS[minIdx].name + ' 방위에 비보풍수(裨補風水)를 시행했습니다.');
    saveV17State();
    renderFengshui();
};

// ===================== 7. ROYAL BANQUET =====================
function renderBanquet() {
    var ctx = getCanvas('banquet', 580, 340);
    if(!ctx) return;
    ctx.fillStyle = '#1a0e0a'; ctx.fillRect(0,0,580,340);
    ctx.fillStyle = '#ffa500'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('왕실 연회관', 290, 24);

    var cols = 5, cw = 100, ch = 110, gx = 15, gy = 40;
    BANQUETS.forEach(function(b, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = gx + col * (cw + 8), y = gy + row * (ch + 8);
        var held = v17State.banquetsHeld[b.id];

        ctx.fillStyle = held ? 'rgba(255,165,0,0.15)' : 'rgba(100,100,100,0.08)';
        ctx.strokeStyle = held ? '#ffa500' : '#555';
        ctx.lineWidth = held ? 2 : 1;
        ctx.beginPath(); ctx.roundRect(x, y, cw, ch, 8); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '26px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.icon, x + cw/2, y + 32);
        ctx.fillStyle = held ? '#ffa500' : '#ddd'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(b.name, x + cw/2, y + 52);
        ctx.fillStyle = '#aaa'; ctx.font = '8px sans-serif';
        ctx.fillText('민심+' + b.morale + ' 외교+' + b.diplomacy, x + cw/2, y + 68);

        if(held) {
            ctx.fillStyle = 'rgba(255,165,0,0.7)';
            var mW = (b.morale / 25) * (cw - 16);
            ctx.fillRect(x + 8, y + 78, mW, 6);
            ctx.fillStyle = 'rgba(46,204,113,0.7)';
            var dW = (b.diplomacy / 25) * (cw - 16);
            ctx.fillRect(x + 8, y + 88, dW, 6);
            ctx.fillStyle = '#ffa500'; ctx.font = '8px sans-serif';
            ctx.fillText('개최 완료 ✓', x + cw/2, y + 106);
        }
    });

    var heldCount = Object.keys(v17State.banquetsHeld).length;
    ctx.fillStyle = '#ffa500'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('개최: ' + heldCount + '/10', 20, 330);

    var acts = document.getElementById('v17-actions-banquet');
    var html = '<div class="v17-grid">';
    BANQUETS.forEach(function(b) {
        var held = v17State.banquetsHeld[b.id];
        html += '<button class="v17-btn' + (held ? ' active' : '') + '" onclick="window.v17HoldBanquet(\'' + b.id + '\')">' +
            b.icon + ' ' + b.name + (held ? ' ✓' : '') + '</button>';
    });
    html += '</div>';
    acts.innerHTML = html;
}

window.v17HoldBanquet = function(id) {
    v17State.banquetsHeld[id] = true;
    playV17SFX('banquet_toast');
    var bq = BANQUETS.find(function(b){ return b.id === id; });
    if(typeof toast === 'function') toast('🎊 ' + (bq ? bq.name : '연회') + ' 개최! 민심+' + (bq?bq.morale:0) + ' 외교+' + (bq?bq.diplomacy:0));
    if(typeof addChronicle === 'function') addChronicle('🎊', (bq ? bq.name : '연회') + '이(가) 성대하게 거행되었습니다.');
    saveV17State();
    renderBanquet();
};

// ===================== 8. ROYAL TOMBS MAP =====================
function renderTombs() {
    var ctx = getCanvas('tombs', 600, 400);
    if(!ctx) return;
    ctx.fillStyle = '#0e0e0a'; ctx.fillRect(0,0,600,400);
    ctx.fillStyle = '#c4923a'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('역대 왕릉 지도', 300, 24);

    ctx.strokeStyle = 'rgba(196,146,58,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250,50); ctx.lineTo(200,80); ctx.lineTo(180,140); ctx.lineTo(160,200);
    ctx.lineTo(180,260); ctx.lineTo(220,300); ctx.lineTo(260,340);
    ctx.lineTo(300,360); ctx.lineTo(350,340); ctx.lineTo(380,300);
    ctx.lineTo(400,260); ctx.lineTo(420,200); ctx.lineTo(400,140);
    ctx.lineTo(370,80); ctx.lineTo(330,50); ctx.lineTo(250,50);
    ctx.closePath();
    ctx.fillStyle = 'rgba(196,146,58,0.08)'; ctx.fill();
    ctx.stroke();

    var positions = [
        {x:280,y:65},{x:240,y:260},{x:340,y:290},{x:350,y:285},
        {x:220,y:120},{x:320,y:230},{x:330,y:245},{x:310,y:220},
        {x:295,y:205},{x:280,y:195},{x:325,y:240},{x:345,y:295}
    ];

    TOMBS.forEach(function(t, i) {
        var pos = positions[i] || {x:300,y:200};
        var explored = v17State.tombsExplored[t.id];

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, explored ? 16 : 12, 0, Math.PI * 2);
        ctx.fillStyle = explored ? 'rgba(196,146,58,0.3)' : 'rgba(100,100,100,0.15)';
        ctx.fill();
        ctx.strokeStyle = explored ? '#ffd700' : '#666';
        ctx.lineWidth = explored ? 2 : 1;
        ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = (explored ? '16' : '12') + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.icon, pos.x, pos.y + 5);
    });

    var exploredCount = Object.keys(v17State.tombsExplored).length;
    ctx.fillStyle = '#ffd700'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('탐사: ' + exploredCount + '/12', 20, 390);

    var cont = document.getElementById('v17-content-tombs');
    var html = '<div class="v17-grid">';
    TOMBS.forEach(function(t) {
        var explored = v17State.tombsExplored[t.id];
        html += '<div class="v17-card' + (explored ? ' unlocked' : '') + '" onclick="window.v17ExploreTomb(\'' + t.id + '\')">' +
            '<span class="vc-icon">' + t.icon + '</span>' +
            '<span class="vc-name">' + t.name.substring(0,6) + '</span>' +
            '<span class="vc-detail">' + t.era + ' | ' + t.loc + '</span>' +
            (explored ? '<span style="color:#2ecc71;font-size:9px;">✓ 탐사완료</span>' : '<span style="color:#999;font-size:9px;">미탐사</span>') +
            '</div>';
    });
    html += '</div>';
    cont.innerHTML = html;
}

window.v17ExploreTomb = function(id) {
    if(v17State.tombsExplored[id]) return;
    v17State.tombsExplored[id] = true;
    playV17SFX('tomb_discover');
    var tomb = TOMBS.find(function(t){ return t.id === id; });
    if(typeof toast === 'function') toast('⛩️ ' + (tomb ? tomb.name : '왕릉') + ' 탐사 완료!');
    if(typeof addChronicle === 'function') addChronicle('⛩️', (tomb ? tomb.name : '왕릉') + '을(를) 탐사하여 역사적 의의를 발견했습니다.');
    saveV17State();
    renderTombs();
};

// ===================== QUIZ (+15) =====================
function hookV17Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQ = [
        {q:'고려시대 왕실 혼인 정책으로 원나라 공주와 혼인한 왕은?',a:['충렬왕','충선왕','공민왕','충목왕'],c:0,id:'v17q1'},
        {q:'장영실이 만든 자동 물시계의 이름은?',a:['자격루','앙부일구','혼천의','측우기'],c:0,id:'v17q2'},
        {q:'동학농민운동을 이끈 지도자는?',a:['전봉준','김옥균','안창호','이봉창'],c:0,id:'v17q3'},
        {q:'백제금동대향로가 출토된 곳은?',a:['부여 능산리','공주 송산리','익산 미륵사','서울 풍납토성'],c:0,id:'v17q4'},
        {q:'조선시대 과거 시험의 최종 단계는?',a:['전시','회시','초시','복시'],c:0,id:'v17q5'},
        {q:'풍수지리설에서 배산임수(背山臨水)의 뜻은?',a:['뒤에 산 앞에 물','앞에 산 뒤에 물','좌우에 산','사방에 물'],c:0,id:'v17q6'},
        {q:'조선 왕실의 즉위식이 거행된 장소는?',a:['근정전','인정전','명정전','경회루'],c:0,id:'v17q7'},
        {q:'경주 대릉원에 있는 대표적 고분은?',a:['천마총','무령왕릉','광개토대왕릉','왕건왕릉'],c:0,id:'v17q8'},
        {q:'세계 최초의 금속활자 인쇄물은?',a:['직지심체요절','팔만대장경','훈민정음','무구정광대다라니경'],c:0,id:'v17q9'},
        {q:'홍경래의 난이 일어난 지역은?',a:['평안도','함경도','전라도','경상도'],c:0,id:'v17q10'},
        {q:'조선시대 6계층 중 과거에 응시할 수 있는 최하위 계층은?',a:['양인(평민)','중인','천민','노비'],c:0,id:'v17q11'},
        {q:'신라 금관의 특징적 장식 형태는?',a:['나뭇가지와 사슴뿔','용과 봉황','해와 달','구름과 학'],c:0,id:'v17q12'},
        {q:'세종대왕 영릉이 위치한 도시는?',a:['여주','수원','화성','파주'],c:0,id:'v17q13'},
        {q:'에밀레종(성덕대왕신종)의 제작 시기는?',a:['통일신라','고려','백제','조선'],c:0,id:'v17q14'},
        {q:'조선시대 비보풍수(裨補風水)의 목적은?',a:['지형의 약점을 보완','적을 방어','농사를 개선','건물을 장식'],c:0,id:'v17q15'}
    ];
    newQ.forEach(function(q) {
        var exists = quizQuestions.some(function(eq){ return eq.id === q.id; });
        if(!exists) quizQuestions.push(q);
    });
}

// ===================== ACHIEVEMENTS (+12) =====================
function hookV17Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAch = [
        {id:'marriage_diplomat',icon:'💒',title:'혼인 외교관',desc:'왕실 혼인동맹 5개 이상 체결'},
        {id:'science_pioneer',icon:'🔬',title:'과학 선구자',desc:'고대 과학기술 3개 이상 연구'},
        {id:'rebellion_solver',icon:'🔥',title:'봉기 해결사',desc:'민란 3개 이상 해결'},
        {id:'treasure_collector',icon:'💎',title:'보물 수집가',desc:'왕실 보물 5개 이상 수집'},
        {id:'class_reformer',icon:'👥',title:'계층 개혁자',desc:'사회 정책 3회 이상 시행'},
        {id:'fengshui_master',icon:'🧭',title:'풍수 대가',desc:'풍수 종합 점수 80점 이상 달성'},
        {id:'banquet_host',icon:'🎊',title:'연회 주최자',desc:'왕실 연회 5회 이상 개최'},
        {id:'tomb_explorer',icon:'⛩️',title:'왕릉 탐험가',desc:'왕릉 5곳 이상 탐사'},
        {id:'v17_5features',icon:'🌟',title:'v17 탐험가',desc:'v17의 5개 이상 기능 사용'},
        {id:'v17_all_tombs',icon:'🏛️',title:'왕릉 전문가',desc:'12곳 왕릉 전부 탐사'},
        {id:'v17_all_science',icon:'⚗️',title:'발명왕',desc:'12종 과학기술 전부 연구'},
        {id:'v17_explorer',icon:'🎯',title:'v17 마스터',desc:'v17의 8개 기능 모두 사용'}
    ];
    newAch.forEach(function(a) {
        var exists = achievements.some(function(ea){ return ea.id === a.id; });
        if(!exists) achievements.push(a);
    });
}

function hookV17CheckAchievements() {
    setInterval(function() {
        if(typeof unlockAchievement !== 'function') return;
        if(Object.keys(v17State.marriages).length >= 5) unlockAchievement('marriage_diplomat');
        if(Object.keys(v17State.scienceUnlocked).length >= 3) unlockAchievement('science_pioneer');
        if(Object.keys(v17State.rebellions).length >= 3) unlockAchievement('rebellion_solver');
        if(Object.keys(v17State.treasures).length >= 5) unlockAchievement('treasure_collector');
        if(v17State.classPolicy.length >= 3) unlockAchievement('class_reformer');
        var avg = 0; v17State.fengshui.forEach(function(v){ avg+=v; }); avg /= 8;
        if(avg >= 80) unlockAchievement('fengshui_master');
        if(Object.keys(v17State.banquetsHeld).length >= 5) unlockAchievement('banquet_host');
        if(Object.keys(v17State.tombsExplored).length >= 5) unlockAchievement('tomb_explorer');
        if(Object.keys(v17State.featuresUsed).length >= 5) unlockAchievement('v17_5features');
        if(Object.keys(v17State.tombsExplored).length >= 12) unlockAchievement('v17_all_tombs');
        if(Object.keys(v17State.scienceUnlocked).length >= 12) unlockAchievement('v17_all_science');
        if(Object.keys(v17State.featuresUsed).length >= 8) unlockAchievement('v17_explorer');
    }, 10000);
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV17Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        var map = {
            'KeyZ':'marriage','KeyX':'science','KeyC':'rebellion','KeyV':'treasury',
            'KeyB':'class','KeyN':'fengshui','KeyM':'banquet','Comma':'tombs'
        };
        if(map[e.code]) {
            e.preventDefault();
            playV17SFX('nav_v17');
            openV17Feature(map[e.code]);
        }
    });
}

// ===================== GAME TICK HOOK =====================
function hookV17GameTick() {
    setInterval(function() {
        v17State.sciencePoints += 1;
        saveV17State();
    }, 30000);
}

// ===================== ADVISOR TIPS =====================
function hookV17AdvisorTips() {
    if(typeof advisorTips === 'undefined') return;
    var tips = [
        '💒 왕실 혼인동맹은 외교력의 핵심입니다. 여러 가문과 동맹을 맺어보세요.',
        '🔬 과학기술 연구는 도시 발전의 기반입니다. 연구 포인트를 모아 기술을 해금하세요.',
        '🔥 민란은 즉시 대처하지 않으면 도시 안정이 흔들립니다. 진압, 대화, 수용 중 선택하세요.',
        '💎 왕실 보물은 문화적 가치가 높습니다. 국보급 보물을 수집하여 전시하세요.',
        '👥 계층 정책은 사회 안정에 영향을 미칩니다. 과거제, 신분해방 등을 시행하세요.',
        '🧭 풍수지리의 비보(裨補)를 통해 약한 방위를 보강할 수 있습니다.',
        '🎊 왕실 연회는 민심과 외교를 동시에 높이는 효과적인 수단입니다.',
        '⛩️ 왕릉 탐사를 통해 한국사의 깊은 역사를 발견할 수 있습니다.'
    ];
    tips.forEach(function(t) {
        if(advisorTips.indexOf(t) === -1) advisorTips.push(t);
    });
}

// ===================== AUTO-SAVE =====================
function hookV17AutoSave() {
    setInterval(function() { saveV17State(); }, 60000);
}

// ===================== INIT =====================
function initV17() {
    loadV17State();
    addV17UI();
    createV17Panels();
    hookV17GameTick();
    hookV17Quiz();
    hookV17Achievements();
    hookV17CheckAchievements();
    hookV17AdvisorTips();
    hookV17AutoSave();
    hookV17Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('💒 v17.0: 혼인외교+과학기술+민란관리+보물창고+계층사회+풍수지리+왕실연회+왕릉지도!');
        }, 15000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV17, 5500); });
} else {
    setTimeout(initV17, 5500);
}

})();
