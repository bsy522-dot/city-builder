// =====================================================================
// city-builder v18_patch.js — PRIME Holdings NEXTERA+PRISM v18.0
// Self-contained IIFE patch:
// 1. Royal Court Music Hall (궁중음악공연관) Canvas 12 instruments
// 2. Historical Figure Network (역사인물관계도) Canvas 10 figures
// 3. City Environmental Agency (도시환경관리청) 6 pollutants Radar Canvas
// 4. Royal Medical Academy (왕실의학원) 8 treatments Canvas
// 5. Ancient Astronomical Observatory (고대천문관측소) 12 constellations Canvas
// 6. City Transportation Network (도시교통망계획) 8 routes Canvas
// 7. Royal Pottery Workshop (왕실도예공방) 10 pottery Canvas
// 8. Historical Law Codex (역사법전편찬소) 12 laws Canvas
// +15 Quiz (205→220), +12 Achievements (182→194),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v18Ctx = null;
function getV18Audio() {
    if(!v18Ctx) {
        try { v18Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v18Ctx;
}
function playV18SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV18Audio();
    if(!ctx) return;
    var now = ctx.currentTime;
    function tone(freq, start, dur, wave, vol) {
        var o = ctx.createOscillator(); o.type = wave || 'sine';
        o.frequency.setValueAtTime(freq, now + start);
        var g = ctx.createGain(); g.connect(ctx.destination);
        g.gain.setValueAtTime(vol || 0.08, now + start);
        g.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
        o.connect(g); o.start(now + start); o.stop(now + start + dur);
    }
    switch(type) {
        case 'music_play':
            [523,659,784,880,784,659].forEach(function(f,i){ tone(f, i*0.08, 0.25, 'sine', 0.07); });
            break;
        case 'music_instrument':
            tone(440, 0, 0.3, 'triangle', 0.09);
            tone(554, 0.1, 0.3, 'triangle', 0.07);
            tone(659, 0.2, 0.3, 'triangle', 0.06);
            break;
        case 'figure_connect':
            [330,440,554].forEach(function(f,i){ tone(f, i*0.1, 0.2, 'sine', 0.08); });
            break;
        case 'env_alert':
            tone(880, 0, 0.15, 'sawtooth', 0.05);
            tone(660, 0.15, 0.15, 'sawtooth', 0.05);
            break;
        case 'env_clean':
            [262,330,392,523].forEach(function(f,i){ tone(f, i*0.09, 0.2, 'sine', 0.08); });
            break;
        case 'medical_cure':
            [392,494,588,784].forEach(function(f,i){ tone(f, i*0.08, 0.25, 'sine', 0.09); });
            break;
        case 'astro_observe':
            tone(220, 0, 0.5, 'sine', 0.06);
            tone(330, 0.15, 0.5, 'sine', 0.05);
            tone(440, 0.3, 0.5, 'sine', 0.04);
            break;
        case 'transport_build':
            tone(330, 0, 0.12, 'square', 0.05);
            tone(440, 0.12, 0.12, 'square', 0.05);
            tone(554, 0.24, 0.18, 'square', 0.06);
            break;
        case 'pottery_create':
            [294,370,440,554,659].forEach(function(f,i){ tone(f, i*0.1, 0.3, 'triangle', 0.07); });
            break;
        case 'law_enact':
            tone(262, 0, 0.2, 'square', 0.06);
            tone(330, 0.2, 0.2, 'square', 0.06);
            tone(392, 0.4, 0.3, 'sine', 0.08);
            break;
        case 'quiz_v18':
            tone(523, 0, 0.15, 'sine', 0.08);
            tone(659, 0.12, 0.15, 'sine', 0.08);
            tone(784, 0.24, 0.2, 'sine', 0.09);
            break;
        case 'achieve_v18':
            [523,659,784,1047].forEach(function(f,i){ tone(f, i*0.1, 0.3, 'sine', 0.09); });
            break;
        case 'nav_v18':
            tone(880, 0, 0.1, 'sine', 0.06);
            break;
    }
}

// ===================== STATE =====================
var v18State = {
    music: { performances: 0, instruments: {} },
    figures: { discovered: {} },
    env: { scores: { air: 50, water: 50, soil: 50, noise: 50, waste: 50, greenery: 50 }, actions: 0 },
    medical: { treatments: {}, cured: 0 },
    astro: { observed: {}, sessions: 0 },
    transport: { routes: {}, built: 0 },
    pottery: { created: {}, fired: 0 },
    law: { enacted: {}, cases: 0 }
};

function saveV18State() {
    try { localStorage.setItem('cb_v18_state', JSON.stringify(v18State)); } catch(e){}
}
function loadV18State() {
    try {
        var s = localStorage.getItem('cb_v18_state');
        if(s) {
            var parsed = JSON.parse(s);
            for(var k in parsed) {
                if(v18State.hasOwnProperty(k)) v18State[k] = parsed[k];
            }
        }
    } catch(e){}
}

// ===================== DATA =====================
var INSTRUMENTS = [
    { id:'gayageum', name:'가야금', icon:'🎵', era:'가야', strings:12, desc:'12현 가야금. 산조와 병창에 사용' },
    { id:'geomungo', name:'거문고', icon:'🎸', era:'고구려', strings:6, desc:'6현 거문고. 풍류와 정악에 사용' },
    { id:'daegeum', name:'대금', icon:'🎶', era:'삼국', strings:0, desc:'대나무 횡적. 정악과 산조의 핵심' },
    { id:'haegeum', name:'해금', icon:'🎻', era:'고려', strings:2, desc:'2현 찰현악기. 오케스트라의 핵심' },
    { id:'piri', name:'피리', icon:'🎺', era:'삼국', strings:0, desc:'대나무 관악기. 향피리/세피리/당피리' },
    { id:'janggu', name:'장구', icon:'🥁', era:'삼국', strings:0, desc:'모래시계형 양면북. 장단의 핵심' },
    { id:'buk', name:'북', icon:'🪘', era:'고조선', strings:0, desc:'원형 타악기. 농악과 풍물의 기반' },
    { id:'sogeum', name:'소금', icon:'🪈', era:'삼국', strings:0, desc:'소형 횡적. 맑고 높은 음색' },
    { id:'ajaeng', name:'아쟁', icon:'🎵', era:'고려', strings:7, desc:'7현 찰현악기. 깊고 낮은 음색' },
    { id:'danso', name:'단소', icon:'🪈', era:'조선', strings:0, desc:'수직관악기. 교육용으로 널리 보급' },
    { id:'taepyeongso', name:'태평소', icon:'🎺', era:'고려', strings:0, desc:'금속관악기. 군악과 농악에 사용' },
    { id:'pyeongyeong', name:'편경', icon:'🔔', era:'고려', strings:0, desc:'16매 돌 타악기. 아악의 핵심' }
];

var FIGURES = [
    { id:'dangun', name:'단군왕검', era:'고조선', role:'건국시조', icon:'👑' },
    { id:'gwanggaeto', name:'광개토대왕', era:'고구려', role:'정복군주', icon:'⚔️' },
    { id:'seondeok', name:'선덕여왕', era:'신라', role:'여왕/과학', icon:'👸' },
    { id:'eulji', name:'을지문덕', era:'고구려', role:'명장', icon:'🛡️' },
    { id:'sejong', name:'세종대왕', era:'조선', role:'학문군주', icon:'📖' },
    { id:'yisunshin', name:'이순신', era:'조선', role:'수군명장', icon:'⚓' },
    { id:'jumong', name:'주몽', era:'고구려', role:'건국시조', icon:'🏹' },
    { id:'geunchogo', name:'근초고왕', era:'백제', role:'전성기군주', icon:'🗡️' },
    { id:'wanggeon', name:'왕건', era:'고려', role:'통일군주', icon:'🏰' },
    { id:'jeongyagyong', name:'정약용', era:'조선', role:'실학자', icon:'📐' }
];
var FIGURE_RELATIONS = [
    { from:'dangun', to:'jumong', type:'계승', desc:'고조선→고구려 정신 계승' },
    { from:'jumong', to:'gwanggaeto', type:'혈통', desc:'고구려 왕실 직계' },
    { from:'jumong', to:'eulji', type:'국가', desc:'고구려의 명장' },
    { from:'gwanggaeto', to:'eulji', type:'동시대', desc:'고구려 전성기 동지' },
    { from:'geunchogo', to:'gwanggaeto', type:'라이벌', desc:'백제-고구려 패권 경쟁' },
    { from:'seondeok', to:'wanggeon', type:'계승', desc:'신라→고려 통일 의지' },
    { from:'wanggeon', to:'sejong', type:'계승', desc:'고려→조선 문화 발전' },
    { from:'sejong', to:'yisunshin', type:'국가', desc:'조선의 문무 쌍벽' },
    { from:'sejong', to:'jeongyagyong', type:'학문', desc:'실학 정신 계승' },
    { from:'yisunshin', to:'jeongyagyong', type:'국가', desc:'조선 충신의 계보' }
];

var ENV_FACTORS = [
    { id:'air', name:'대기질', icon:'💨', max:100 },
    { id:'water', name:'수질', icon:'💧', max:100 },
    { id:'soil', name:'토양', icon:'🌱', max:100 },
    { id:'noise', name:'소음', icon:'🔊', max:100 },
    { id:'waste', name:'폐기물', icon:'🗑️', max:100 },
    { id:'greenery', name:'녹지율', icon:'🌳', max:100 }
];
var ENV_ACTIONS = [
    { name:'나무 심기', cost:30, effects:{air:+8, greenery:+12, noise:+5, soil:+3} },
    { name:'수로 정비', cost:50, effects:{water:+15, soil:+5} },
    { name:'폐기물 처리장', cost:80, effects:{waste:+20, soil:+8, air:+5} },
    { name:'방음벽 설치', cost:40, effects:{noise:+18} },
    { name:'친환경 규제', cost:60, effects:{air:+10, water:+8, waste:+10, greenery:+5} },
    { name:'공원 조성', cost:100, effects:{greenery:+20, noise:+10, air:+8} }
];

var TREATMENTS = [
    { id:'acupuncture', name:'침술', icon:'📍', era:'고조선', desc:'경혈 자극 치료. 두통/관절통/내장질환', success:75 },
    { id:'herbal', name:'약초요법', icon:'🌿', era:'삼국', desc:'인삼/당귀/감초 등 약재 조합', success:80 },
    { id:'moxibustion', name:'뜸', icon:'🔥', era:'고조선', desc:'쑥뜸으로 혈자리 온열 자극', success:70 },
    { id:'cupping', name:'부항', icon:'🫙', era:'고려', desc:'음압으로 혈액순환 촉진', success:65 },
    { id:'massage', name:'추나요법', icon:'🤲', era:'조선', desc:'근골격계 교정 도수치료', success:72 },
    { id:'meditation', name:'명상요법', icon:'🧘', era:'삼국', desc:'심신안정과 스트레스 해소', success:60 },
    { id:'diet', name:'식이요법', icon:'🍲', era:'조선', desc:'약선음식으로 체질 개선', success:78 },
    { id:'bath', name:'온천요법', icon:'♨️', era:'삼국', desc:'온천수 입욕으로 피부/관절 치료', success:68 }
];

var CONSTELLATIONS = [
    { id:'dragon', name:'청룡(동방)', icon:'🐉', stars:7, season:'봄', desc:'동방 7수. 각/항/저/방/심/미/기' },
    { id:'tiger', name:'백호(서방)', icon:'🐅', stars:7, season:'가을', desc:'서방 7수. 규/루/위/묘/필/자/삼' },
    { id:'turtle', name:'현무(북방)', icon:'🐢', stars:7, season:'겨울', desc:'북방 7수. 두/우/녀/허/위/실/벽' },
    { id:'phoenix', name:'주작(남방)', icon:'🐦', stars:7, season:'여름', desc:'남방 7수. 정/귀/류/성/장/익/진' },
    { id:'polaris', name:'북극성', icon:'⭐', stars:1, season:'사계', desc:'천추. 왕의 별. 만세의 중심' },
    { id:'bigdipper', name:'북두칠성', icon:'🌟', stars:7, season:'사계', desc:'천강. 방향과 시간의 기준' },
    { id:'pleiades', name:'묘성(좀생이)', icon:'✨', stars:6, season:'겨울', desc:'28수 묘. 농사시기 판단 기준' },
    { id:'vega', name:'직녀성', icon:'💫', stars:1, season:'여름', desc:'견우직녀 설화. 칠석의 별' },
    { id:'altair', name:'견우성', icon:'🌠', stars:1, season:'여름', desc:'견우직녀 설화. 은하수 건너편' },
    { id:'sirius', name:'천랑성', icon:'🔆', stars:1, season:'겨울', desc:'가장 밝은 별. 풍흉 점술 기준' },
    { id:'mars', name:'형혹(화성)', icon:'🔴', stars:1, season:'사계', desc:'재앙의 별. 심성 침범시 흉조' },
    { id:'jupiter', name:'세성(목성)', icon:'🟡', stars:1, season:'사계', desc:'12년 주기. 세차 기준 행성' }
];

var TRANSPORT_ROUTES = [
    { id:'road', name:'관도(관로)', icon:'🛤️', era:'삼국', speed:1, capacity:100, desc:'수도↔지방 간선도로. 역참 배치' },
    { id:'river', name:'수로(하천)', icon:'🚣', era:'고조선', speed:2, capacity:200, desc:'한강/금강/낙동강 물자 수송' },
    { id:'sea', name:'해로(항로)', icon:'⛵', era:'백제', speed:3, capacity:500, desc:'서해/남해 연안 교역로' },
    { id:'mountain', name:'산길(산도)', icon:'🏔️', era:'고조선', speed:0.5, capacity:30, desc:'지름길이나 험난한 산악로' },
    { id:'horse', name:'파발마(급행)', icon:'🐎', era:'조선', speed:5, capacity:10, desc:'긴급 문서 전달 급행 체계' },
    { id:'canal', name:'운하(수로)', icon:'🌊', era:'고려', speed:2, capacity:300, desc:'인공 수로 물자 대량 수송' },
    { id:'bridge', name:'교량(다리)', icon:'🌉', era:'삼국', speed:1.5, capacity:150, desc:'하천 횡단 핵심 인프라' },
    { id:'tunnel', name:'산성수도(수도)', icon:'🕳️', era:'삼국', speed:1, capacity:50, desc:'산성 내 급수용 수도 시설' }
];

var POTTERY_TYPES = [
    { id:'bitsalmunui', name:'빗살무늬토기', icon:'🏺', era:'신석기', temp:700, desc:'기하학 문양. 저장/조리 용도' },
    { id:'mumunui', name:'민무늬토기', icon:'🫙', era:'청동기', temp:800, desc:'무문양. 대형 저장 용기' },
    { id:'gaya', name:'가야토기', icon:'🍶', era:'가야', temp:1000, desc:'경질토기. 높은 온도 소성' },
    { id:'silla', name:'신라토기', icon:'🏺', era:'신라', temp:1100, desc:'회청색 경질토기. 정교한 형태' },
    { id:'celadon', name:'고려청자', icon:'🍵', era:'고려', temp:1250, desc:'비색 청자. 세계적 걸작' },
    { id:'buncheong', name:'분청사기', icon:'🫖', era:'조선초', temp:1200, desc:'분장회청사기. 자유로운 문양' },
    { id:'baekja', name:'백자', icon:'🥛', era:'조선', temp:1300, desc:'순백 자기. 선비 정신의 상징' },
    { id:'cheolhwa', name:'철화백자', icon:'🍵', era:'조선', temp:1300, desc:'철사안료 문양 백자' },
    { id:'cheonghwa', name:'청화백자', icon:'💙', era:'조선', temp:1350, desc:'코발트 문양. 왕실 최고급 자기' },
    { id:'onggi', name:'옹기', icon:'🪣', era:'전시대', temp:900, desc:'숨쉬는 그릇. 장독 발효 용기' }
];

var LAWS = [
    { id:'8geum', name:'8조법금', era:'고조선', icon:'📜', year:'BC 2333~', desc:'살인/상해/절도 처벌. 최초 성문법', effect:'치안+15' },
    { id:'yulguk', name:'율국관', era:'삼국', icon:'⚖️', year:'1~600', desc:'중국 율령 수용 체계적 법전', effect:'질서+12' },
    { id:'gwageo', name:'과거제도', era:'고려', icon:'📝', year:'958~', desc:'시험으로 관리 선발. 공정성 확보', effect:'교육+18' },
    { id:'nobi', name:'노비환천법', era:'고려', icon:'⛓️', year:'987~', desc:'노비 신분 귀속 규정', effect:'인구+10' },
    { id:'gyeongguk', name:'경국대전', era:'조선', icon:'📕', year:'1485', desc:'조선 기본 법전. 6전 체제', effect:'통치+20' },
    { id:'sokdaejeon', name:'속대전', era:'조선', icon:'📗', year:'1746', desc:'경국대전 보완 법전', effect:'통치+15' },
    { id:'daejeon', name:'대전통편', era:'조선', icon:'📘', year:'1785', desc:'법전 통합 정리. 정조 치세', effect:'질서+18' },
    { id:'hyeongbeop', name:'형법대전', era:'조선', icon:'⚔️', year:'1395~', desc:'형사법 체계. 5형 제도', effect:'치안+12' },
    { id:'hojeok', name:'호적법', era:'조선', icon:'📋', year:'1413~', desc:'호구 등록 제도. 인구 관리', effect:'인구+15' },
    { id:'gunjeonje', name:'균전제', era:'신라', icon:'🌾', year:'722~', desc:'정전 지급. 토지 균등 분배', effect:'식량+18' },
    { id:'siganhwa', name:'시장규제법', era:'고려', icon:'🏪', year:'918~', desc:'도시 시장 거래 규범', effect:'금+12' },
    { id:'oegyobeop', name:'외교규범', era:'삼국', icon:'🤝', year:'1~', desc:'사신 접대/조공 절차 규정', effect:'외교+15' }
];

// ===================== UI BUILDER =====================
function addV18UI() {
    var style = document.createElement('style');
    style.textContent = '.v18-nav-bar{position:absolute;bottom:42px;left:0;z-index:10006;background:linear-gradient(180deg,rgba(26,26,46,0.95),rgba(10,10,25,0.98));border:1px solid #5e8ce0;border-radius:10px;display:none;padding:4px 2px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;max-width:90vw;}.v18-nav-bar::-webkit-scrollbar{display:none;}.v18-nav-btn{display:inline-block;background:rgba(94,140,224,0.15);border:1px solid #555;border-radius:8px;color:#90caf9;padding:6px 8px;margin:0 2px;font-size:11px;cursor:pointer;text-align:center;min-width:52px;vertical-align:top;}.v18-nav-btn:hover{background:rgba(94,140,224,0.35);border-color:#90caf9;}.v18-nav-btn .nb-icon{font-size:18px;display:block;}.v18-nav-btn .nb-label{font-size:9px;color:#ccc;margin-top:2px;}.v18-fp{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:10009;justify-content:center;align-items:center;padding:10px;}.v18-fp.show{display:flex;}.v18-box{background:linear-gradient(145deg,#1e2a3e,#152030);border:2px solid #5e8ce0;border-radius:16px;padding:16px;max-width:660px;width:100%;max-height:85vh;overflow-y:auto;}.v18-box h2{color:#90caf9;text-align:center;font-size:18px;margin-bottom:8px;}.v18-box .v18-sub{text-align:center;color:#5e8ce0;font-size:12px;margin-bottom:12px;}.v18-cw{text-align:center;margin:8px 0;}.v18-cw canvas{max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;background:#0a1020;}.v18-btn{background:#5e8ce0;border:none;color:#fff;padding:6px 16px;border-radius:14px;font-size:13px;cursor:pointer;margin:4px 2px;font-weight:bold;}.v18-btn:hover{background:#7eace0;}.v18-close{display:block;margin:10px auto 0;background:#555;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;cursor:pointer;}.v18-close:hover{background:#777;}.v18-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin:8px 0;}.v18-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:8px;text-align:center;border:1px solid #444;cursor:pointer;transition:all 0.2s;}.v18-card:hover{border-color:#90caf9;background:rgba(94,140,224,0.08);}.v18-card.active{border-color:#4caf50;background:rgba(76,175,80,0.1);}.v18-card .vc-icon{font-size:28px;}.v18-card .vc-name{font-size:11px;color:#eee;margin-top:2px;}.v18-card .vc-info{font-size:9px;color:#aaa;}.v18-stat-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0;}.v18-stat{background:rgba(94,140,224,0.1);border:1px solid #5e8ce0;border-radius:8px;padding:6px 12px;text-align:center;min-width:80px;}.v18-stat .st-val{font-size:18px;font-weight:bold;color:#90caf9;}.v18-stat .st-lbl{font-size:10px;color:#aaa;}';
    document.head.appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.id = 'v18-wrapper';
    wrapper.style.cssText = 'position:fixed;bottom:220px;left:10px;z-index:10007;';

    var navBar = document.createElement('div');
    navBar.id = 'v18-nav-bar';
    navBar.className = 'v18-nav-bar';
    var features = [
        {id:'music', icon:'🎵', label:'궁중음악'},
        {id:'figures', icon:'👑', label:'인물관계'},
        {id:'env', icon:'🌿', label:'환경관리'},
        {id:'medical', icon:'🏥', label:'의학원'},
        {id:'astro', icon:'🔭', label:'천문관측'},
        {id:'transport', icon:'🛤️', label:'교통망'},
        {id:'pottery', icon:'🏺', label:'도예공방'},
        {id:'law', icon:'⚖️', label:'법전편찬'}
    ];
    features.forEach(function(f) {
        var btn = document.createElement('div');
        btn.className = 'v18-nav-btn';
        btn.innerHTML = '<span class="nb-icon">' + f.icon + '</span><span class="nb-label">' + f.label + '</span>';
        btn.onclick = function() {
            playV18SFX('nav_v18');
            openV18Feature(f.id);
        };
        navBar.appendChild(btn);
    });
    wrapper.appendChild(navBar);

    var togBtn = document.createElement('button');
    togBtn.id = 'v18-toggle-btn';
    togBtn.style.cssText = 'background:rgba(0,0,0,0.75);border:1px solid #5e8ce0;color:#90caf9;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;display:block;';
    togBtn.textContent = '🎵';
    togBtn.title = 'v18 기능 (궁중음악/인물관계/환경관리/의학원/천문관측/교통망/도예공방/법전편찬)';
    togBtn.onclick = function() {
        var nb = document.getElementById('v18-nav-bar');
        nb.style.display = nb.style.display === 'none' || !nb.style.display ? 'block' : 'none';
    };
    wrapper.appendChild(togBtn);
    document.body.appendChild(wrapper);

    createV18Panels();
}

function openV18Feature(id) {
    var panels = ['music','figures','env','medical','astro','transport','pottery','law'];
    panels.forEach(function(p) {
        var el = document.getElementById('v18-panel-' + p);
        if(el) el.classList.toggle('show', p === id);
    });
    if(id === 'music') drawMusicCanvas();
    if(id === 'figures') drawFiguresCanvas();
    if(id === 'env') drawEnvCanvas();
    if(id === 'medical') drawMedicalCanvas();
    if(id === 'astro') drawAstroCanvas();
    if(id === 'transport') drawTransportCanvas();
    if(id === 'pottery') drawPotteryCanvas();
    if(id === 'law') drawLawCanvas();
}

function closeV18Panel(id) {
    var el = document.getElementById('v18-panel-' + id);
    if(el) el.classList.remove('show');
}

function createV18Panels() {
    createMusicPanel();
    createFiguresPanel();
    createEnvPanel();
    createMedicalPanel();
    createAstroPanel();
    createTransportPanel();
    createPotteryPanel();
    createLawPanel();
}

// ===================== 1. ROYAL COURT MUSIC HALL =====================
function createMusicPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-music';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🎵 궁중음악공연관</h2><div class="v18-sub">전통 악기 12종 연주와 합주 체험</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-music-perf">0</div><div class="st-lbl">공연 횟수</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-music-inst">0</div><div class="st-lbl">연주 악기</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-music-grade">-</div><div class="st-lbl">등급</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-music-cv" width="600" height="380"></canvas></div>' +
        '<div class="v18-grid" id="v18-music-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v18-btn" onclick="v18PerformConcert()">🎶 합주 공연</button></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'music\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-music-grid');
    INSTRUMENTS.forEach(function(inst) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.music.instruments[inst.id] ? ' active' : '');
        card.id = 'v18-inst-' + inst.id;
        card.innerHTML = '<div class="vc-icon">' + inst.icon + '</div><div class="vc-name">' + inst.name + '</div><div class="vc-info">' + inst.era + '</div>';
        card.onclick = function() { v18PlayInstrument(inst.id); };
        grid.appendChild(card);
    });
}

function v18PlayInstrument(id) {
    v18State.music.instruments[id] = (v18State.music.instruments[id] || 0) + 1;
    playV18SFX('music_instrument');
    var card = document.getElementById('v18-inst-' + id);
    if(card) card.classList.add('active');
    document.getElementById('v18-music-inst').textContent = Object.keys(v18State.music.instruments).length;
    drawMusicCanvas();
    saveV18State();
    if(typeof addChronicle === 'function') {
        var inst = INSTRUMENTS.find(function(i){ return i.id === id; });
        if(inst) addChronicle('🎵', inst.name + ' 연주가 궁중에 울려 퍼졌습니다!');
    }
    checkV18Achievements();
}
window.v18PlayInstrument = v18PlayInstrument;

function v18PerformConcert() {
    var instCount = Object.keys(v18State.music.instruments).length;
    if(instCount < 3) {
        if(typeof toast === 'function') toast('최소 3종 악기를 연주해야 합주가 가능합니다!');
        return;
    }
    v18State.music.performances++;
    playV18SFX('music_play');
    document.getElementById('v18-music-perf').textContent = v18State.music.performances;
    var grades = ['D','C','B','A','S'];
    var gi = Math.min(4, Math.floor(v18State.music.performances / 3));
    document.getElementById('v18-music-grade').textContent = grades[gi];

    if(typeof resources !== 'undefined' && resources.culture !== undefined) {
        resources.culture += 8;
        if(typeof toast === 'function') toast('🎶 합주 공연 성공! 문화 +8');
    }
    drawMusicCanvas();
    saveV18State();
    checkV18Achievements();
}
window.v18PerformConcert = v18PerformConcert;

function drawMusicCanvas() {
    var cv = document.getElementById('v18-music-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);

    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('악기별 연주 횟수', W/2, 24);

    var data = INSTRUMENTS.map(function(inst) {
        return { name: inst.name, count: v18State.music.instruments[inst.id] || 0 };
    });
    var maxVal = Math.max(1, Math.max.apply(null, data.map(function(d){ return d.count; })));
    var barW = Math.floor((W - 80) / data.length);
    var baseY = H - 50;

    data.forEach(function(d, i) {
        var x = 50 + i * barW;
        var barH = (d.count / maxVal) * (H - 100);
        var grad = c.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, '#5e8ce0');
        grad.addColorStop(1, '#1a3a6e');
        c.fillStyle = grad;
        c.beginPath();
        c.roundRect(x + 2, baseY - barH, barW - 4, barH, [4,4,0,0]);
        c.fill();

        if(d.count > 0) {
            c.fillStyle = '#fff';
            c.font = '10px sans-serif';
            c.textAlign = 'center';
            c.fillText(d.count, x + barW/2, baseY - barH - 4);
        }

        c.save();
        c.translate(x + barW/2, baseY + 8);
        c.rotate(-Math.PI/4);
        c.fillStyle = '#aaa';
        c.font = '9px sans-serif';
        c.textAlign = 'right';
        c.fillText(d.name, 0, 0);
        c.restore();
    });

    c.strokeStyle = '#333';
    c.beginPath();
    c.moveTo(45, 30);
    c.lineTo(45, baseY);
    c.lineTo(W - 10, baseY);
    c.stroke();

    var perfGrade = v18State.music.performances >= 15 ? 'S' : v18State.music.performances >= 12 ? 'A' : v18State.music.performances >= 9 ? 'B' : v18State.music.performances >= 6 ? 'C' : 'D';
    document.getElementById('v18-music-perf').textContent = v18State.music.performances;
    document.getElementById('v18-music-inst').textContent = Object.keys(v18State.music.instruments).length;
    document.getElementById('v18-music-grade').textContent = perfGrade;
}

// ===================== 2. HISTORICAL FIGURE NETWORK =====================
function createFiguresPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-figures';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>👑 역사인물관계도</h2><div class="v18-sub">한국사 10대 인물 네트워크</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-fig-disc">0</div><div class="st-lbl">발견 인물</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-fig-rel">0</div><div class="st-lbl">관계 수</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-fig-cv" width="620" height="400"></canvas></div>' +
        '<div class="v18-grid" id="v18-fig-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'figures\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-fig-grid');
    FIGURES.forEach(function(fig) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.figures.discovered[fig.id] ? ' active' : '');
        card.id = 'v18-fig-' + fig.id;
        card.innerHTML = '<div class="vc-icon">' + fig.icon + '</div><div class="vc-name">' + fig.name + '</div><div class="vc-info">' + fig.era + ' · ' + fig.role + '</div>';
        card.onclick = function() { v18DiscoverFigure(fig.id); };
        grid.appendChild(card);
    });
}

function v18DiscoverFigure(id) {
    if(!v18State.figures.discovered[id]) {
        v18State.figures.discovered[id] = true;
        playV18SFX('figure_connect');
        var card = document.getElementById('v18-fig-' + id);
        if(card) card.classList.add('active');
        var fig = FIGURES.find(function(f){ return f.id === id; });
        if(fig && typeof addChronicle === 'function') {
            addChronicle(fig.icon, fig.name + '의 업적을 발견했습니다!');
        }
        if(typeof resources !== 'undefined' && resources.culture !== undefined) {
            resources.culture += 5;
            if(typeof toast === 'function') toast(fig.icon + ' ' + fig.name + ' 발견! 문화 +5');
        }
        drawFiguresCanvas();
        saveV18State();
        checkV18Achievements();
    }
}
window.v18DiscoverFigure = v18DiscoverFigure;

function drawFiguresCanvas() {
    var cv = document.getElementById('v18-fig-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('한국사 인물 관계 네트워크', W/2, 24);

    var positions = [];
    var cx = W/2, cy = H/2 + 10;
    FIGURES.forEach(function(fig, i) {
        var angle = (i / FIGURES.length) * Math.PI * 2 - Math.PI/2;
        var rx = 220, ry = 150;
        positions.push({ x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry, fig: fig });
    });

    FIGURE_RELATIONS.forEach(function(rel) {
        var fromIdx = FIGURES.findIndex(function(f){ return f.id === rel.from; });
        var toIdx = FIGURES.findIndex(function(f){ return f.id === rel.to; });
        if(fromIdx < 0 || toIdx < 0) return;
        var p1 = positions[fromIdx], p2 = positions[toIdx];
        var discovered = v18State.figures.discovered[rel.from] && v18State.figures.discovered[rel.to];
        c.strokeStyle = discovered ? (rel.type === '라이벌' ? '#ff6b6b' : rel.type === '혈통' ? '#ffd700' : '#5e8ce0') : '#333';
        c.lineWidth = discovered ? 2 : 1;
        c.setLineDash(discovered ? [] : [4,4]);
        c.beginPath();
        c.moveTo(p1.x, p1.y);
        var mx = (p1.x + p2.x)/2, my = (p1.y + p2.y)/2 - 20;
        c.quadraticCurveTo(mx, my, p2.x, p2.y);
        c.stroke();
        c.setLineDash([]);

        if(discovered) {
            c.fillStyle = '#aaa';
            c.font = '9px sans-serif';
            c.textAlign = 'center';
            c.fillText(rel.type, (p1.x+p2.x)/2, (p1.y+p2.y)/2 - 5);
        }
    });

    positions.forEach(function(p) {
        var disc = v18State.figures.discovered[p.fig.id];
        c.beginPath();
        c.arc(p.x, p.y, 22, 0, Math.PI*2);
        c.fillStyle = disc ? 'rgba(94,140,224,0.3)' : 'rgba(50,50,70,0.5)';
        c.fill();
        c.strokeStyle = disc ? '#90caf9' : '#555';
        c.lineWidth = disc ? 2 : 1;
        c.stroke();

        c.fillStyle = '#fff';
        c.font = '18px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(p.fig.icon, p.x, p.y - 2);

        c.fillStyle = disc ? '#eee' : '#666';
        c.font = '10px sans-serif';
        c.textBaseline = 'top';
        c.fillText(p.fig.name, p.x, p.y + 20);
    });

    var discCount = Object.keys(v18State.figures.discovered).length;
    var relCount = FIGURE_RELATIONS.filter(function(r){ return v18State.figures.discovered[r.from] && v18State.figures.discovered[r.to]; }).length;
    document.getElementById('v18-fig-disc').textContent = discCount;
    document.getElementById('v18-fig-rel').textContent = relCount;
}

// ===================== 3. CITY ENVIRONMENTAL AGENCY =====================
function createEnvPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-env';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🌿 도시환경관리청</h2><div class="v18-sub">6종 환경 지표 모니터링 및 개선</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-env-avg">50</div><div class="st-lbl">환경 평균</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-env-grade">C</div><div class="st-lbl">등급</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-env-act">0</div><div class="st-lbl">조치 횟수</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-env-cv" width="560" height="360"></canvas></div>' +
        '<div style="text-align:center;margin:8px 0;" id="v18-env-actions"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'env\')">닫기</button></div>';
    document.body.appendChild(panel);

    var actDiv = panel.querySelector('#v18-env-actions');
    ENV_ACTIONS.forEach(function(act, idx) {
        var btn = document.createElement('button');
        btn.className = 'v18-btn';
        btn.textContent = act.name + ' (금' + act.cost + ')';
        btn.onclick = function() { v18EnvAction(idx); };
        actDiv.appendChild(btn);
    });
}

function v18EnvAction(idx) {
    var act = ENV_ACTIONS[idx];
    if(typeof resources !== 'undefined' && resources.gold !== undefined) {
        if(resources.gold < act.cost) {
            if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + act.cost + ')');
            return;
        }
        resources.gold -= act.cost;
    }
    for(var k in act.effects) {
        if(v18State.env.scores[k] !== undefined) {
            v18State.env.scores[k] = Math.min(100, v18State.env.scores[k] + act.effects[k]);
        }
    }
    v18State.env.actions++;
    playV18SFX('env_clean');
    if(typeof toast === 'function') toast('🌿 ' + act.name + ' 완료!');
    drawEnvCanvas();
    saveV18State();
    checkV18Achievements();
}
window.v18EnvAction = v18EnvAction;

function drawEnvCanvas() {
    var cv = document.getElementById('v18-env-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('도시 환경 지표 레이더', W/2, 24);

    var cx = W/2, cy = H/2 + 15, R = 130;
    var scores = ENV_FACTORS.map(function(f){ return v18State.env.scores[f.id] || 50; });

    for(var ring = 1; ring <= 5; ring++) {
        var rr = R * ring / 5;
        c.beginPath();
        for(var j = 0; j < 6; j++) {
            var a = (j / 6) * Math.PI * 2 - Math.PI/2;
            var px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            j === 0 ? c.moveTo(px, py) : c.lineTo(px, py);
        }
        c.closePath();
        c.strokeStyle = ring === 5 ? '#444' : '#222';
        c.lineWidth = 1;
        c.stroke();
    }

    for(var i = 0; i < 6; i++) {
        var a = (i / 6) * Math.PI * 2 - Math.PI/2;
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        c.strokeStyle = '#333';
        c.stroke();
    }

    c.beginPath();
    scores.forEach(function(s, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI/2;
        var r = (s / 100) * R;
        var px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
        i === 0 ? c.moveTo(px, py) : c.lineTo(px, py);
    });
    c.closePath();
    c.fillStyle = 'rgba(76,175,80,0.25)';
    c.fill();
    c.strokeStyle = '#4caf50';
    c.lineWidth = 2;
    c.stroke();

    scores.forEach(function(s, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI/2;
        var r = (s / 100) * R;
        c.beginPath();
        c.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 4, 0, Math.PI*2);
        c.fillStyle = s >= 70 ? '#4caf50' : s >= 40 ? '#ff9800' : '#f44336';
        c.fill();
    });

    ENV_FACTORS.forEach(function(f, i) {
        var a = (i / 6) * Math.PI * 2 - Math.PI/2;
        var lx = cx + Math.cos(a) * (R + 30), ly = cy + Math.sin(a) * (R + 22);
        c.fillStyle = '#ccc';
        c.font = '11px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(f.icon + ' ' + f.name, lx, ly - 6);
        c.fillStyle = scores[i] >= 70 ? '#4caf50' : scores[i] >= 40 ? '#ff9800' : '#f44336';
        c.font = 'bold 12px sans-serif';
        c.fillText(scores[i], lx, ly + 8);
    });

    var avg = Math.round(scores.reduce(function(a,b){return a+b;}, 0) / 6);
    var grade = avg >= 85 ? 'S' : avg >= 70 ? 'A' : avg >= 55 ? 'B' : avg >= 40 ? 'C' : 'D';
    document.getElementById('v18-env-avg').textContent = avg;
    document.getElementById('v18-env-grade').textContent = grade;
    document.getElementById('v18-env-act').textContent = v18State.env.actions;
}

// ===================== 4. ROYAL MEDICAL ACADEMY =====================
function createMedicalPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-medical';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🏥 왕실의학원</h2><div class="v18-sub">전통 한의학 8종 치료법 체험</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-med-cured">0</div><div class="st-lbl">치료 횟수</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-med-types">0</div><div class="st-lbl">습득 치료</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-med-grade">-</div><div class="st-lbl">의원 등급</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-med-cv" width="580" height="360"></canvas></div>' +
        '<div class="v18-grid" id="v18-med-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'medical\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-med-grid');
    TREATMENTS.forEach(function(t) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.medical.treatments[t.id] ? ' active' : '');
        card.id = 'v18-med-' + t.id;
        card.innerHTML = '<div class="vc-icon">' + t.icon + '</div><div class="vc-name">' + t.name + '</div><div class="vc-info">' + t.era + ' · 성공률 ' + t.success + '%</div>';
        card.onclick = function() { v18TreatPatient(t.id); };
        grid.appendChild(card);
    });
}

function v18TreatPatient(id) {
    var treatment = TREATMENTS.find(function(t){ return t.id === id; });
    if(!treatment) return;
    var roll = Math.random() * 100;
    var success = roll < treatment.success;
    v18State.medical.treatments[id] = (v18State.medical.treatments[id] || 0) + 1;
    if(success) {
        v18State.medical.cured++;
        playV18SFX('medical_cure');
        if(typeof resources !== 'undefined' && resources.pop !== undefined) resources.pop += 2;
        if(typeof toast === 'function') toast('💊 ' + treatment.name + ' 치료 성공! 인구 +2');
    } else {
        playV18SFX('env_alert');
        if(typeof toast === 'function') toast('😓 ' + treatment.name + ' 치료 실패...');
    }
    var card = document.getElementById('v18-med-' + id);
    if(card) card.classList.add('active');
    drawMedicalCanvas();
    saveV18State();
    checkV18Achievements();
}
window.v18TreatPatient = v18TreatPatient;

function drawMedicalCanvas() {
    var cv = document.getElementById('v18-med-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('치료법별 시술 통계', W/2, 24);

    var data = TREATMENTS.map(function(t) {
        return { name: t.name, count: v18State.medical.treatments[t.id] || 0, success: t.success };
    });
    var maxVal = Math.max(1, Math.max.apply(null, data.map(function(d){return d.count;})));
    var barW = Math.floor((W - 80) / data.length);
    var baseY = H - 60;

    data.forEach(function(d, i) {
        var x = 50 + i * barW;
        var barH = (d.count / maxVal) * (H - 110);
        var grad = c.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, '#4caf50');
        grad.addColorStop(1, '#1b5e20');
        c.fillStyle = grad;
        c.beginPath();
        c.roundRect(x + 2, baseY - barH, barW - 4, barH, [4,4,0,0]);
        c.fill();

        if(d.count > 0) {
            c.fillStyle = '#fff';
            c.font = '10px sans-serif';
            c.textAlign = 'center';
            c.fillText(d.count + '회', x + barW/2, baseY - barH - 4);
        }

        c.fillStyle = '#aaa';
        c.font = '9px sans-serif';
        c.textAlign = 'center';
        c.fillText(d.success + '%', x + barW/2, baseY - barH - 16);

        c.save();
        c.translate(x + barW/2, baseY + 8);
        c.rotate(-Math.PI/4);
        c.fillStyle = '#aaa';
        c.font = '9px sans-serif';
        c.textAlign = 'right';
        c.fillText(d.name, 0, 0);
        c.restore();
    });

    c.strokeStyle = '#333';
    c.beginPath();
    c.moveTo(45, 30); c.lineTo(45, baseY); c.lineTo(W - 10, baseY);
    c.stroke();

    var types = Object.keys(v18State.medical.treatments).length;
    var grade = v18State.medical.cured >= 40 ? 'S' : v18State.medical.cured >= 30 ? 'A' : v18State.medical.cured >= 20 ? 'B' : v18State.medical.cured >= 10 ? 'C' : 'D';
    document.getElementById('v18-med-cured').textContent = v18State.medical.cured;
    document.getElementById('v18-med-types').textContent = types;
    document.getElementById('v18-med-grade').textContent = grade;
}

// ===================== 5. ANCIENT ASTRONOMICAL OBSERVATORY =====================
function createAstroPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-astro';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🔭 고대천문관측소</h2><div class="v18-sub">28수와 12성좌 관측 체험 (첨성대)</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-astro-obs">0</div><div class="st-lbl">관측 성좌</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-astro-sess">0</div><div class="st-lbl">관측 세션</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-astro-cv" width="580" height="380"></canvas></div>' +
        '<div class="v18-grid" id="v18-astro-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'astro\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-astro-grid');
    CONSTELLATIONS.forEach(function(con) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.astro.observed[con.id] ? ' active' : '');
        card.id = 'v18-astro-' + con.id;
        card.innerHTML = '<div class="vc-icon">' + con.icon + '</div><div class="vc-name">' + con.name + '</div><div class="vc-info">' + con.season + ' · ' + con.stars + '성</div>';
        card.onclick = function() { v18ObserveConstellation(con.id); };
        grid.appendChild(card);
    });
}

function v18ObserveConstellation(id) {
    if(!v18State.astro.observed[id]) {
        v18State.astro.observed[id] = true;
        v18State.astro.sessions++;
        playV18SFX('astro_observe');
        var card = document.getElementById('v18-astro-' + id);
        if(card) card.classList.add('active');
        var con = CONSTELLATIONS.find(function(c){ return c.id === id; });
        if(con) {
            if(typeof resources !== 'undefined' && resources.culture !== undefined) resources.culture += 4;
            if(typeof toast === 'function') toast('🔭 ' + con.name + ' 관측 성공! 문화 +4');
            if(typeof addChronicle === 'function') addChronicle('🔭', con.name + '이(가) 첨성대에서 관측되었습니다!');
        }
        drawAstroCanvas();
        saveV18State();
        checkV18Achievements();
    }
}
window.v18ObserveConstellation = v18ObserveConstellation;

function drawAstroCanvas() {
    var cv = document.getElementById('v18-astro-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);

    var grad = c.createRadialGradient(W/2, H/2, 0, W/2, H/2, W/2);
    grad.addColorStop(0, '#0a0a20');
    grad.addColorStop(1, '#000010');
    c.fillStyle = grad;
    c.fillRect(0,0,W,H);

    for(var i = 0; i < 80; i++) {
        var sx = ((i * 73 + 31) % W);
        var sy = ((i * 47 + 19) % H);
        var sz = 0.5 + ((i * 17) % 10) / 10;
        c.beginPath();
        c.arc(sx, sy, sz, 0, Math.PI*2);
        c.fillStyle = 'rgba(255,255,255,' + (0.3 + ((i * 13) % 7) / 10) + ')';
        c.fill();
    }

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('천문 성좌도', W/2, 24);

    var cx = W/2, cy = H/2 + 10;
    CONSTELLATIONS.forEach(function(con, i) {
        var angle = (i / CONSTELLATIONS.length) * Math.PI * 2 - Math.PI/2;
        var rx = 200, ry = 140;
        var px = cx + Math.cos(angle) * rx;
        var py = cy + Math.sin(angle) * ry;
        var observed = v18State.astro.observed[con.id];

        if(observed) {
            c.beginPath();
            c.arc(px, py, 24, 0, Math.PI*2);
            c.fillStyle = 'rgba(255,215,0,0.1)';
            c.fill();
            c.strokeStyle = 'rgba(255,215,0,0.5)';
            c.lineWidth = 1;
            c.stroke();

            for(var s = 0; s < Math.min(con.stars, 7); s++) {
                var sa = (s / Math.max(con.stars, 1)) * Math.PI * 2;
                var sr = 8 + s * 2;
                var stx = px + Math.cos(sa) * sr;
                var sty = py + Math.sin(sa) * sr;
                c.beginPath();
                c.arc(stx, sty, 1.5, 0, Math.PI*2);
                c.fillStyle = '#ffd700';
                c.fill();
            }
        }

        c.fillStyle = '#fff';
        c.font = '16px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(con.icon, px, py);

        c.fillStyle = observed ? '#eee' : '#555';
        c.font = '9px sans-serif';
        c.textBaseline = 'top';
        c.fillText(con.name, px, py + 18);
    });

    var obsCount = Object.keys(v18State.astro.observed).length;
    document.getElementById('v18-astro-obs').textContent = obsCount;
    document.getElementById('v18-astro-sess').textContent = v18State.astro.sessions;
}

// ===================== 6. CITY TRANSPORTATION NETWORK =====================
function createTransportPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-transport';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🛤️ 도시교통망계획</h2><div class="v18-sub">8종 교통로 건설 및 물자 수송 시뮬레이션</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-trans-built">0</div><div class="st-lbl">건설 노선</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-trans-cap">0</div><div class="st-lbl">총 수송량</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-trans-cv" width="600" height="360"></canvas></div>' +
        '<div class="v18-grid" id="v18-trans-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'transport\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-trans-grid');
    TRANSPORT_ROUTES.forEach(function(rt) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.transport.routes[rt.id] ? ' active' : '');
        card.id = 'v18-trans-' + rt.id;
        card.innerHTML = '<div class="vc-icon">' + rt.icon + '</div><div class="vc-name">' + rt.name + '</div><div class="vc-info">속도 x' + rt.speed + ' · 수송 ' + rt.capacity + '</div>';
        card.onclick = function() { v18BuildRoute(rt.id); };
        grid.appendChild(card);
    });
}

function v18BuildRoute(id) {
    var rt = TRANSPORT_ROUTES.find(function(r){ return r.id === id; });
    if(!rt) return;
    var cost = 40 + Math.floor(rt.capacity / 5);
    if(typeof resources !== 'undefined' && resources.gold !== undefined) {
        if(resources.gold < cost) {
            if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + cost + ')');
            return;
        }
        resources.gold -= cost;
    }
    v18State.transport.routes[id] = (v18State.transport.routes[id] || 0) + 1;
    v18State.transport.built++;
    playV18SFX('transport_build');
    var card = document.getElementById('v18-trans-' + id);
    if(card) card.classList.add('active');
    if(typeof toast === 'function') toast('🛤️ ' + rt.name + ' 건설 완료! (금 -' + cost + ')');
    if(typeof addChronicle === 'function') addChronicle('🛤️', rt.name + '이(가) 새로 건설되었습니다!');
    drawTransportCanvas();
    saveV18State();
    checkV18Achievements();
}
window.v18BuildRoute = v18BuildRoute;

function drawTransportCanvas() {
    var cv = document.getElementById('v18-trans-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('교통로 수송 용량 비교', W/2, 24);

    var data = TRANSPORT_ROUTES.map(function(rt) {
        return { name: rt.name.split('(')[0], capacity: rt.capacity, speed: rt.speed, built: v18State.transport.routes[rt.id] || 0 };
    });
    var maxCap = Math.max.apply(null, data.map(function(d){return d.capacity;}));
    var barH = Math.floor((H - 100) / data.length);
    var maxBarW = W - 160;

    data.forEach(function(d, i) {
        var y = 50 + i * barH;
        var bw = (d.capacity / maxCap) * maxBarW;
        var col = d.built > 0 ? '#5e8ce0' : '#333';
        var grad = c.createLinearGradient(120, y, 120 + bw, y);
        grad.addColorStop(0, d.built > 0 ? '#1a3a6e' : '#222');
        grad.addColorStop(1, col);
        c.fillStyle = grad;
        c.beginPath();
        c.roundRect(120, y + 2, bw, barH - 6, [0,6,6,0]);
        c.fill();

        c.fillStyle = d.built > 0 ? '#eee' : '#666';
        c.font = '11px sans-serif';
        c.textAlign = 'right';
        c.textBaseline = 'middle';
        c.fillText(d.name, 115, y + barH/2);

        c.fillStyle = '#fff';
        c.font = '10px sans-serif';
        c.textAlign = 'left';
        c.fillText(d.capacity + ' (x' + d.speed + ')', 125 + bw, y + barH/2);
    });

    var totalCap = 0;
    var builtCount = 0;
    for(var k in v18State.transport.routes) {
        var rr = TRANSPORT_ROUTES.find(function(r){return r.id===k;});
        if(rr) totalCap += rr.capacity * v18State.transport.routes[k];
        builtCount++;
    }
    document.getElementById('v18-trans-built').textContent = builtCount;
    document.getElementById('v18-trans-cap').textContent = totalCap;
}

// ===================== 7. ROYAL POTTERY WORKSHOP =====================
function createPotteryPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-pottery';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>🏺 왕실도예공방</h2><div class="v18-sub">한국 도자기 10종 제작 체험</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-pot-types">0</div><div class="st-lbl">제작 종류</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-pot-fired">0</div><div class="st-lbl">소성 횟수</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-pot-grade">-</div><div class="st-lbl">도공 등급</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-pot-cv" width="600" height="380"></canvas></div>' +
        '<div class="v18-grid" id="v18-pot-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'pottery\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-pot-grid');
    POTTERY_TYPES.forEach(function(pot) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.pottery.created[pot.id] ? ' active' : '');
        card.id = 'v18-pot-' + pot.id;
        card.innerHTML = '<div class="vc-icon">' + pot.icon + '</div><div class="vc-name">' + pot.name + '</div><div class="vc-info">' + pot.era + ' · ' + pot.temp + '°C</div>';
        card.onclick = function() { v18CreatePottery(pot.id); };
        grid.appendChild(card);
    });
}

function v18CreatePottery(id) {
    var pot = POTTERY_TYPES.find(function(p){ return p.id === id; });
    if(!pot) return;
    v18State.pottery.created[id] = (v18State.pottery.created[id] || 0) + 1;
    v18State.pottery.fired++;
    playV18SFX('pottery_create');
    var card = document.getElementById('v18-pot-' + id);
    if(card) card.classList.add('active');
    if(typeof resources !== 'undefined' && resources.culture !== undefined) {
        resources.culture += 6;
    }
    if(typeof toast === 'function') toast('🏺 ' + pot.name + ' 제작 완료! 문화 +6');
    if(typeof addChronicle === 'function') addChronicle('🏺', pot.name + '이(가) 왕실 도예공방에서 완성되었습니다!');
    drawPotteryCanvas();
    saveV18State();
    checkV18Achievements();
}
window.v18CreatePottery = v18CreatePottery;

function drawPotteryCanvas() {
    var cv = document.getElementById('v18-pot-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('도자기 시대별 소성 온도 및 제작 현황', W/2, 24);

    var data = POTTERY_TYPES.map(function(p) {
        return { name: p.name, temp: p.temp, era: p.era, count: v18State.pottery.created[p.id] || 0 };
    });
    var maxTemp = 1400;
    var barW = Math.floor((W - 80) / data.length);
    var baseY = H - 60;

    data.forEach(function(d, i) {
        var x = 50 + i * barW;
        var barH = (d.temp / maxTemp) * (H - 110);
        var tempRatio = d.temp / maxTemp;
        var r = Math.round(100 + tempRatio * 155);
        var g = Math.round(60 + (1 - tempRatio) * 100);
        var b = Math.round(30);
        var grad = c.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, 'rgb(' + r + ',' + g + ',' + b + ')');
        grad.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0.3)');
        c.fillStyle = d.count > 0 ? grad : '#222';
        c.beginPath();
        c.roundRect(x + 2, baseY - barH, barW - 4, barH, [4,4,0,0]);
        c.fill();

        if(d.count > 0) {
            c.strokeStyle = '#ffd700';
            c.lineWidth = 1;
            c.beginPath();
            c.roundRect(x + 2, baseY - barH, barW - 4, barH, [4,4,0,0]);
            c.stroke();
        }

        c.fillStyle = '#fff';
        c.font = '9px sans-serif';
        c.textAlign = 'center';
        c.fillText(d.temp + '°', x + barW/2, baseY - barH - 14);
        if(d.count > 0) {
            c.fillStyle = '#ffd700';
            c.fillText(d.count + '점', x + barW/2, baseY - barH - 4);
        }

        c.save();
        c.translate(x + barW/2, baseY + 8);
        c.rotate(-Math.PI/4);
        c.fillStyle = d.count > 0 ? '#eee' : '#666';
        c.font = '8px sans-serif';
        c.textAlign = 'right';
        c.fillText(d.name, 0, 0);
        c.restore();
    });

    c.strokeStyle = '#333';
    c.beginPath();
    c.moveTo(45, 30); c.lineTo(45, baseY); c.lineTo(W - 10, baseY);
    c.stroke();

    var types = Object.keys(v18State.pottery.created).length;
    var grade = types >= 10 ? 'S' : types >= 8 ? 'A' : types >= 6 ? 'B' : types >= 3 ? 'C' : 'D';
    document.getElementById('v18-pot-types').textContent = types;
    document.getElementById('v18-pot-fired').textContent = v18State.pottery.fired;
    document.getElementById('v18-pot-grade').textContent = grade;
}

// ===================== 8. HISTORICAL LAW CODEX =====================
function createLawPanel() {
    var panel = document.createElement('div');
    panel.id = 'v18-panel-law';
    panel.className = 'v18-fp';
    panel.innerHTML = '<div class="v18-box"><h2>⚖️ 역사법전편찬소</h2><div class="v18-sub">한국사 12대 법률 제정 및 시행</div>' +
        '<div class="v18-stat-row"><div class="v18-stat"><div class="st-val" id="v18-law-enacted">0</div><div class="st-lbl">제정 법률</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-law-cases">0</div><div class="st-lbl">적용 사례</div></div>' +
        '<div class="v18-stat"><div class="st-val" id="v18-law-grade">-</div><div class="st-lbl">법치 등급</div></div></div>' +
        '<div class="v18-cw"><canvas id="v18-law-cv" width="600" height="380"></canvas></div>' +
        '<div class="v18-grid" id="v18-law-grid"></div>' +
        '<button class="v18-close" onclick="closeV18Panel(\'law\')">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v18-law-grid');
    LAWS.forEach(function(law) {
        var card = document.createElement('div');
        card.className = 'v18-card' + (v18State.law.enacted[law.id] ? ' active' : '');
        card.id = 'v18-law-' + law.id;
        card.innerHTML = '<div class="vc-icon">' + law.icon + '</div><div class="vc-name">' + law.name + '</div><div class="vc-info">' + law.era + ' · ' + law.effect + '</div>';
        card.onclick = function() { v18EnactLaw(law.id); };
        grid.appendChild(card);
    });
}

function v18EnactLaw(id) {
    var law = LAWS.find(function(l){ return l.id === id; });
    if(!law) return;
    if(!v18State.law.enacted[id]) {
        v18State.law.enacted[id] = true;
        playV18SFX('law_enact');
        var card = document.getElementById('v18-law-' + id);
        if(card) card.classList.add('active');

        var effectMatch = law.effect.match(/(\S+)\+(\d+)/);
        if(effectMatch && typeof resources !== 'undefined') {
            var resMap = { '치안':'military', '질서':'culture', '교육':'culture', '인구':'pop', '통치':'culture', '식량':'food', '금':'gold', '외교':'culture' };
            var resKey = resMap[effectMatch[1]];
            var val = parseInt(effectMatch[2]);
            if(resKey && resources[resKey] !== undefined) resources[resKey] += val;
        }
        v18State.law.cases++;
        if(typeof toast === 'function') toast('⚖️ ' + law.name + ' 제정! ' + law.effect);
        if(typeof addChronicle === 'function') addChronicle('⚖️', law.name + '이(가) 공포되었습니다! (' + law.era + ')');
        drawLawCanvas();
        saveV18State();
        checkV18Achievements();
    } else {
        if(typeof toast === 'function') toast('이미 제정된 법률입니다.');
    }
}
window.v18EnactLaw = v18EnactLaw;

function drawLawCanvas() {
    var cv = document.getElementById('v18-law-cv');
    if(!cv) return;
    var c = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    c.clearRect(0,0,W,H);
    c.fillStyle = '#0a1020';
    c.fillRect(0,0,W,H);

    c.fillStyle = '#90caf9';
    c.font = 'bold 14px sans-serif';
    c.textAlign = 'center';
    c.fillText('법률 제정 타임라인', W/2, 24);

    var eras = ['고조선','삼국','신라','고려','조선초','조선'];
    var eraX = {};
    var eraW = (W - 60) / eras.length;
    eras.forEach(function(era, i) {
        eraX[era] = 30 + i * eraW + eraW/2;
        c.fillStyle = i % 2 === 0 ? 'rgba(94,140,224,0.05)' : 'rgba(94,140,224,0.02)';
        c.fillRect(30 + i * eraW, 40, eraW, H - 80);
        c.fillStyle = '#666';
        c.font = '10px sans-serif';
        c.textAlign = 'center';
        c.fillText(era, eraX[era], H - 20);
    });

    c.strokeStyle = '#5e8ce0';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(30, H/2);
    c.lineTo(W - 30, H/2);
    c.stroke();

    LAWS.forEach(function(law, i) {
        var era = law.era;
        if(era === '조선초') era = '조선초';
        var x = eraX[era] || W/2;
        var yOff = (i % 2 === 0 ? -1 : 1) * (40 + (i % 3) * 30);
        var y = H/2 + yOff;
        var enacted = v18State.law.enacted[law.id];

        c.beginPath();
        c.moveTo(x, H/2);
        c.lineTo(x, y);
        c.strokeStyle = enacted ? '#5e8ce0' : '#333';
        c.lineWidth = 1;
        c.stroke();

        c.beginPath();
        c.arc(x, y, 16, 0, Math.PI*2);
        c.fillStyle = enacted ? 'rgba(94,140,224,0.3)' : 'rgba(50,50,70,0.3)';
        c.fill();
        c.strokeStyle = enacted ? '#90caf9' : '#444';
        c.lineWidth = enacted ? 2 : 1;
        c.stroke();

        c.fillStyle = '#fff';
        c.font = '12px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(law.icon, x, y);

        c.fillStyle = enacted ? '#eee' : '#555';
        c.font = '8px sans-serif';
        c.textBaseline = 'top';
        c.fillText(law.name, x, y + 18);

        c.beginPath();
        c.arc(x, H/2, 4, 0, Math.PI*2);
        c.fillStyle = enacted ? '#5e8ce0' : '#444';
        c.fill();
    });

    var enactedCount = Object.keys(v18State.law.enacted).length;
    var grade = enactedCount >= 12 ? 'S' : enactedCount >= 9 ? 'A' : enactedCount >= 6 ? 'B' : enactedCount >= 3 ? 'C' : 'D';
    document.getElementById('v18-law-enacted').textContent = enactedCount;
    document.getElementById('v18-law-cases').textContent = v18State.law.cases;
    document.getElementById('v18-law-grade').textContent = grade;
}

// ===================== QUIZ v18 (+15 → 205→220) =====================
function hookV18Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQ = [
        { q:'한국 전통 12현 현악기로 가야에서 유래한 악기는?', a:['가야금','거문고','해금','아쟁'], correct:0 },
        { q:'경주 첨성대는 어느 시대에 건축되었나?', a:['삼국(신라)','고려','조선','고조선'], correct:0 },
        { q:'고려청자의 특유한 색은?', a:['비색(翡色)','백색','흑색','적색'], correct:0 },
        { q:'조선 기본 법전인 경국대전은 몇 년에 완성?', a:['1485년','1392년','1592년','1636년'], correct:0 },
        { q:'고조선의 최초 성문법 이름은?', a:['8조법금','경국대전','대전통편','속대전'], correct:0 },
        { q:'한국 전통 양면 타악기로 모래시계 형태인 것은?', a:['장구','북','편경','꽹과리'], correct:0 },
        { q:'세종대왕이 만든 문자 체계는?', a:['훈민정음','이두','향찰','구결'], correct:0 },
        { q:'이순신 장군의 대표 해전은?', a:['한산도대첩','살수대첩','귀주대첩','황산벌전투'], correct:0 },
        { q:'28수(宿)에서 동방 7수를 대표하는 신수는?', a:['청룡','백호','현무','주작'], correct:0 },
        { q:'조선시대 관리 선발 시험 제도는?', a:['과거제','천거제','세습제','추첨제'], correct:0 },
        { q:'고구려를 건국한 인물은?', a:['주몽','온조','박혁거세','왕건'], correct:0 },
        { q:'빗살무늬토기가 사용된 시대는?', a:['신석기','구석기','청동기','철기'], correct:0 },
        { q:'고려 시대 수입된 2현 찰현악기 이름은?', a:['해금','거문고','가야금','아쟁'], correct:0 },
        { q:'정약용이 설계한 수원의 건축물은?', a:['화성','경복궁','창덕궁','종묘'], correct:0 },
        { q:'한국 전통 발효 용기의 이름은?', a:['옹기','백자','청자','토기'], correct:0 }
    ];
    newQ.forEach(function(nq) {
        var exists = quizQuestions.some(function(eq) { return eq.q === nq.q; });
        if(!exists) quizQuestions.push(nq);
    });
}

// ===================== ACHIEVEMENTS v18 (+12 → 182→194) =====================
function hookV18Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAch = [
        { id:'v18_musician', name:'🎵 궁중악사', desc:'3종 이상 악기 연주', check: function(){ return Object.keys(v18State.music.instruments).length >= 3; } },
        { id:'v18_concert', name:'🎶 합주대사', desc:'합주 공연 5회 달성', check: function(){ return v18State.music.performances >= 5; } },
        { id:'v18_historian', name:'👑 역사가', desc:'5명 이상 인물 발견', check: function(){ return Object.keys(v18State.figures.discovered).length >= 5; } },
        { id:'v18_ecologist', name:'🌿 환경수호자', desc:'환경 평균 70 이상 달성', check: function(){ var s=v18State.env.scores; var avg=(s.air+s.water+s.soil+s.noise+s.waste+s.greenery)/6; return avg >= 70; } },
        { id:'v18_doctor', name:'🏥 명의', desc:'치료 20회 이상 성공', check: function(){ return v18State.medical.cured >= 20; } },
        { id:'v18_astronomer', name:'🔭 천문학자', desc:'8개 이상 성좌 관측', check: function(){ return Object.keys(v18State.astro.observed).length >= 8; } },
        { id:'v18_engineer', name:'🛤️ 토목공학자', desc:'교통로 5종 이상 건설', check: function(){ return Object.keys(v18State.transport.routes).length >= 5; } },
        { id:'v18_potter', name:'🏺 도예명장', desc:'도자기 7종 이상 제작', check: function(){ return Object.keys(v18State.pottery.created).length >= 7; } },
        { id:'v18_lawmaker', name:'⚖️ 입법자', desc:'법률 6개 이상 제정', check: function(){ return Object.keys(v18State.law.enacted).length >= 6; } },
        { id:'v18_allstar', name:'🌟 v18 올스타', desc:'8개 기능 모두 1회 이상 사용', check: function(){ return Object.keys(v18State.music.instruments).length>0 && Object.keys(v18State.figures.discovered).length>0 && v18State.env.actions>0 && v18State.medical.cured>0 && Object.keys(v18State.astro.observed).length>0 && v18State.transport.built>0 && v18State.pottery.fired>0 && Object.keys(v18State.law.enacted).length>0; } },
        { id:'v18_celadon', name:'💚 고려청자 마스터', desc:'고려청자 제작', check: function(){ return v18State.pottery.created['celadon'] > 0; } },
        { id:'v18_sejong', name:'📖 세종대왕 발견', desc:'세종대왕 인물 발견', check: function(){ return v18State.figures.discovered['sejong']; } }
    ];
    newAch.forEach(function(a) {
        var exists = achievements.some(function(ea) { return ea.id === a.id; });
        if(!exists) achievements.push(a);
    });
}

function checkV18Achievements() {
    if(typeof achievements === 'undefined' || typeof unlockedAchievements === 'undefined') return;
    achievements.forEach(function(ach) {
        if(ach.id && ach.id.indexOf('v18_') === 0 && !unlockedAchievements.has(ach.id)) {
            if(ach.check && ach.check()) {
                unlockedAchievements.add(ach.id);
                playV18SFX('achieve_v18');
                if(typeof toast === 'function') toast('🏆 업적 달성: ' + ach.name);
                try { localStorage.setItem('cityAchievements', JSON.stringify([...unlockedAchievements])); } catch(e){}
            }
        }
    });
}

// ===================== GAME TICK HOOK =====================
function hookV18GameTick() {
    if(typeof window.gameTickHooks === 'undefined') window.gameTickHooks = [];
    window.gameTickHooks.push(function() {
        var routes = v18State.transport.routes;
        var bonusGold = 0;
        for(var k in routes) {
            var rt = TRANSPORT_ROUTES.find(function(r){return r.id===k;});
            if(rt) bonusGold += Math.floor(rt.capacity * rt.speed * routes[k] / 500);
        }
        if(bonusGold > 0 && typeof resources !== 'undefined' && resources.gold !== undefined) {
            resources.gold += bonusGold;
        }

        if(v18State.env.scores.greenery >= 70 && typeof resources !== 'undefined' && resources.happiness !== undefined) {
            resources.happiness = Math.min(100, (resources.happiness || 50) + 1);
        }
    });
}

// ===================== ADVISOR TIPS =====================
function hookV18AdvisorTips() {
    if(typeof advisorTips === 'undefined') return;
    var newTips = [
        '🎵 궁중음악공연관에서 12종 전통 악기를 연주해보세요!',
        '👑 역사인물관계도에서 10대 인물의 관계를 발견하세요!',
        '🌿 환경관리청에서 녹지율을 높이면 백성 행복도가 올라갑니다!',
        '🏥 왕실의학원에서 다양한 치료법을 체험하세요!',
        '🔭 첨성대에서 28수와 별자리를 관측하면 문화가 올라갑니다!',
        '🛤️ 교통망을 건설하면 금 수입이 증가합니다!',
        '🏺 도예공방에서 고려청자를 만들면 특별 업적을 달성합니다!',
        '⚖️ 법전을 제정하면 도시 통치력이 크게 향상됩니다!'
    ];
    newTips.forEach(function(tip) {
        if(advisorTips.indexOf(tip) < 0) advisorTips.push(tip);
    });
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV18Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if(!e.shiftKey) return;
        var codeMap = {
            'Digit1':'music', 'Digit2':'figures', 'Digit3':'env', 'Digit4':'medical',
            'Digit5':'astro', 'Digit6':'transport', 'Digit7':'pottery', 'Digit8':'law'
        };
        var feature = codeMap[e.code];
        if(feature) {
            e.preventDefault();
            var nb = document.getElementById('v18-nav-bar');
            if(nb) nb.style.display = 'block';
            openV18Feature(feature);
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV18AutoSave() {
    setInterval(function() { saveV18State(); }, 60000);
}

// ===================== INIT =====================
function initV18() {
    loadV18State();
    addV18UI();
    hookV18GameTick();
    hookV18Quiz();
    hookV18Achievements();
    hookV18AdvisorTips();
    hookV18AutoSave();
    hookV18Keyboard();

    setTimeout(function() { checkV18Achievements(); }, 8000);

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🎵 v18.0: 궁중음악+인물관계+환경관리+의학원+천문관측+교통망+도예공방+법전편찬!');
        }, 16000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV18, 6000); });
} else {
    setTimeout(initV18, 6000);
}

// Expose close function globally
window.closeV18Panel = closeV18Panel;
window.v18PerformConcert = v18PerformConcert;

})();
