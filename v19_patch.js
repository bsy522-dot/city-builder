// =====================================================================
// city-builder v19_patch.js — PRIME Holdings NEXTERA+PRISM v19.0
// Self-contained IIFE patch:
// 1. Royal Mint & Currency Museum (왕실조폐국&화폐박물관) Canvas 10 historical currencies
// 2. Ancient Irrigation System (고대수리시설관리) Canvas 8 waterway types
// 3. Royal Archive & Records (왕실기록보관소) Canvas 12 historical documents
// 4. City Defense Fortress Map (도시성곽방어도) Canvas 8 fortress types Radar
// 5. Traditional Market Economy (전통시장경제시뮬) Canvas 10 merchants supply/demand
// 6. Royal Diplomatic Embassy (왕실외교사절관) Canvas 8 nations diplomacy Radar
// 7. Ancient Metallurgy Forge (고대야금제련소) Canvas 10 metals smelting
// 8. Historical Census Bureau (역사인구조사국) Canvas 6 era population pyramid
// +15 Quiz (220→235), +12 Achievements (194→206),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v19Ctx = null;
function getV19Audio() {
    if(!v19Ctx) {
        try { v19Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v19Ctx;
}
function playV19SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV19Audio();
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
        case 'mint_coin':
            [523,659,784,1047].forEach(function(f,i){ tone(f, i*0.06, 0.15, 'triangle', 0.09); });
            break;
        case 'mint_forge':
            tone(220, 0, 0.2, 'sawtooth', 0.06);
            tone(330, 0.1, 0.25, 'square', 0.05);
            tone(440, 0.2, 0.3, 'triangle', 0.07);
            break;
        case 'water_flow':
            [262,294,330,349,392].forEach(function(f,i){ tone(f, i*0.1, 0.35, 'sine', 0.06); });
            break;
        case 'water_build':
            tone(392, 0, 0.15, 'square', 0.06);
            tone(523, 0.15, 0.2, 'square', 0.07);
            break;
        case 'archive_scroll':
            tone(330, 0, 0.3, 'sine', 0.07);
            tone(440, 0.15, 0.3, 'sine', 0.06);
            tone(554, 0.3, 0.4, 'sine', 0.05);
            break;
        case 'fortress_build':
            tone(196, 0, 0.2, 'square', 0.07);
            tone(262, 0.15, 0.2, 'square', 0.06);
            tone(330, 0.3, 0.25, 'sine', 0.08);
            break;
        case 'market_trade':
            [440,554,659,880].forEach(function(f,i){ tone(f, i*0.07, 0.2, 'triangle', 0.07); });
            break;
        case 'embassy_meet':
            [330,392,494,392,330].forEach(function(f,i){ tone(f, i*0.1, 0.25, 'sine', 0.07); });
            break;
        case 'metal_smelt':
            tone(147, 0, 0.3, 'sawtooth', 0.05);
            tone(196, 0.1, 0.3, 'sawtooth', 0.06);
            tone(262, 0.25, 0.35, 'triangle', 0.07);
            break;
        case 'census_count':
            [262,330,392,523].forEach(function(f,i){ tone(f, i*0.08, 0.2, 'sine', 0.08); });
            break;
        case 'quiz_v19':
            tone(523, 0, 0.15, 'sine', 0.08);
            tone(659, 0.1, 0.15, 'sine', 0.08);
            tone(784, 0.2, 0.25, 'sine', 0.09);
            break;
        case 'achieve_v19':
            [523,659,784,1047,784,1047].forEach(function(f,i){ tone(f, i*0.08, 0.25, 'sine', 0.08); });
            break;
        case 'nav_v19':
            tone(660, 0, 0.1, 'sine', 0.06);
            break;
    }
}

// ===================== STATE =====================
var v19State = {
    mint: { minted: {}, totalCoins: 0, exhibitions: 0 },
    irrigation: { built: {}, waterLevel: 50, harvests: 0 },
    archive: { discovered: {}, totalReads: 0 },
    fortress: { built: {}, totalDefense: 0, sieges: 0 },
    market: { trades: 0, merchants: {}, profit: 0 },
    embassy: { meetings: 0, treaties: {}, reputation: 50 },
    metal: { smelted: {}, totalBars: 0, masterworks: 0 },
    census: { surveys: 0, population: {}, lastEra: '' }
};

function loadV19State() {
    try {
        var s = localStorage.getItem('cb_v19_state');
        if(s) {
            var parsed = JSON.parse(s);
            for(var k in parsed) { if(v19State[k] !== undefined) v19State[k] = parsed[k]; }
        }
    } catch(e){}
}
function saveV19State() {
    try { localStorage.setItem('cb_v19_state', JSON.stringify(v19State)); } catch(e){}
}

// ===================== DATA =====================
var CURRENCIES = [
    { id:'grain_money', name:'곡물화폐', era:'고조선', icon:'🌾', desc:'고조선 시대 물물교환 단위', value:1, year:'BC 2333~' },
    { id:'bronze_knife', name:'명도전(明刀錢)', era:'고조선', icon:'🔪', desc:'중국 연나라 영향 칼 모양 화폐', value:5, year:'BC 4C~3C' },
    { id:'half_tael', name:'반량전(半兩錢)', era:'한사군', icon:'🪙', desc:'중국 진나라 원형 방공 동전', value:8, year:'BC 3C~' },
    { id:'iron_money', name:'철전(鐵錢)', era:'삼국', icon:'⚙️', desc:'고구려/백제 철제 화폐', value:10, year:'1C~' },
    { id:'silk_cloth', name:'포화(布貨)', era:'삼국~고려', icon:'🧵', desc:'삼베/명주 직물 화폐', value:15, year:'1C~14C' },
    { id:'silver_bottle', name:'은병(銀甁)', era:'고려', icon:'🫙', desc:'고려 활구 모양 은화폐 1근', value:30, year:'1101' },
    { id:'haedong_coin', name:'해동통보', era:'고려', icon:'💰', desc:'고려 최초 주조 동전', value:25, year:'1102' },
    { id:'joseon_tong', name:'조선통보', era:'조선 초', icon:'🏛️', desc:'태종 시대 동전', value:20, year:'1423' },
    { id:'sangpyeong', name:'상평통보', era:'조선', icon:'🔵', desc:'인조~고종 240년간 통용', value:50, year:'1633' },
    { id:'paekdong', name:'백동화', era:'대한제국', icon:'⚪', desc:'근대식 기계 주조 화폐', value:40, year:'1882' }
];

var WATERWAYS = [
    { id:'reservoir', name:'저수지', icon:'💧', desc:'농업용수 저장', capacity:100, cost:80 },
    { id:'canal', name:'수로(水路)', icon:'🏞️', desc:'농경지 관개 운하', capacity:80, cost:60 },
    { id:'levee', name:'제방(堤防)', icon:'🧱', desc:'홍수 방지 둑', capacity:60, cost:70 },
    { id:'watermill', name:'수차(水車)', icon:'⚙️', desc:'수력 곡물 제분', capacity:40, cost:90 },
    { id:'well', name:'우물(井)', icon:'🪣', desc:'마을 식수 공급', capacity:30, cost:40 },
    { id:'aqueduct', name:'수도교(水道橋)', icon:'🌉', desc:'고지대 물 이송', capacity:70, cost:100 },
    { id:'pond', name:'연못(蓮池)', icon:'🪷', desc:'궁궐/사찰 조경용', capacity:20, cost:50 },
    { id:'dam', name:'보(洑)', icon:'🏗️', desc:'하천 수위 조절', capacity:90, cost:85 }
];

var ARCHIVE_DOCS = [
    { id:'samguk_sagi', name:'삼국사기', era:'고려 1145', icon:'📕', desc:'김부식, 한국 최고 정사', importance:95 },
    { id:'samguk_yusa', name:'삼국유사', era:'고려 1281', icon:'📗', desc:'일연, 단군신화 수록', importance:90 },
    { id:'goryeo_sa', name:'고려사', era:'조선 1451', icon:'📘', desc:'고려 475년 역사 기록', importance:88 },
    { id:'joseon_sillok', name:'조선왕조실록', era:'조선', icon:'📙', desc:'472년간 25대 왕 기록, UNESCO', importance:100 },
    { id:'hunmin', name:'훈민정음해례본', era:'1446', icon:'📜', desc:'한글 창제 원리 해설서', importance:98 },
    { id:'uigwe', name:'의궤(儀軌)', era:'조선', icon:'📓', desc:'왕실 의례 기록, UNESCO', importance:92 },
    { id:'seungjeongwon', name:'승정원일기', era:'조선', icon:'📔', desc:'왕의 비서실 일지 3243책', importance:94 },
    { id:'dongui', name:'동의보감', era:'1613', icon:'💊', desc:'허준, 동아시아 의학백과', importance:91 },
    { id:'jibong', name:'지봉유설', era:'1614', icon:'📖', desc:'이수광, 백과사전적 저술', importance:78 },
    { id:'daedong', name:'대동여지도', era:'1861', icon:'🗺️', desc:'김정호, 22첩 전국 지도', importance:89 },
    { id:'hyang_yak', name:'향약집성방', era:'1433', icon:'🌿', desc:'조선 약재 총정리 85권', importance:82 },
    { id:'gyeongguk', name:'경국대전', era:'1485', icon:'⚖️', desc:'조선 기본 법전 완성', importance:93 }
];

var FORTRESS_TYPES = [
    { id:'sanseong', name:'산성(山城)', icon:'⛰️', desc:'산 지형 활용 방어성', defense:90, terrain:95, visibility:85, durability:80, garrison:70, speed:50 },
    { id:'eupseong', name:'읍성(邑城)', icon:'🏘️', desc:'행정구역 방어 성곽', defense:75, terrain:60, visibility:70, durability:85, garrison:90, speed:80 },
    { id:'jangseong', name:'장성(長城)', icon:'🧱', desc:'국경선 장벽형 성곽', defense:85, terrain:70, visibility:80, durability:90, garrison:60, speed:40 },
    { id:'haemi', name:'해미읍성', icon:'🏯', desc:'서해안 왜구 방어 읍성', defense:80, terrain:55, visibility:75, durability:88, garrison:85, speed:75 },
    { id:'hwaseong', name:'수원화성', icon:'🏰', desc:'정조+정약용 축성, 과학적', defense:95, terrain:65, visibility:90, durability:95, garrison:88, speed:70 },
    { id:'namhan', name:'남한산성', icon:'🗻', desc:'조선 유사시 임시수도', defense:92, terrain:90, visibility:88, durability:85, garrison:80, speed:55 },
    { id:'ganghwa', name:'강화산성', icon:'🌊', desc:'해양+산성 복합 방어', defense:88, terrain:85, visibility:82, durability:78, garrison:75, speed:45 },
    { id:'goguryeo_wall', name:'고구려 천리장성', icon:'🛡️', desc:'요동~동해 방어 장성', defense:90, terrain:80, visibility:85, durability:82, garrison:65, speed:35 }
];

var MARKET_GOODS = [
    { id:'rice', name:'쌀', icon:'🍚', basePrice:10, supply:80, demand:90 },
    { id:'silk', name:'비단', icon:'🧶', basePrice:50, supply:30, demand:70 },
    { id:'pottery_g', name:'도자기', icon:'🏺', basePrice:40, supply:40, demand:60 },
    { id:'iron_g', name:'철', icon:'⚒️', basePrice:30, supply:50, demand:65 },
    { id:'ginseng', name:'인삼', icon:'🌱', basePrice:80, supply:20, demand:85 },
    { id:'paper', name:'한지', icon:'📄', basePrice:25, supply:45, demand:55 },
    { id:'salt', name:'소금', icon:'🧂', basePrice:15, supply:60, demand:75 },
    { id:'medicine', name:'약재', icon:'🌿', basePrice:35, supply:35, demand:70 },
    { id:'horse', name:'말', icon:'🐴', basePrice:100, supply:15, demand:50 },
    { id:'lumber', name:'목재', icon:'🪵', basePrice:20, supply:70, demand:80 }
];

var EMBASSY_NATIONS = [
    { id:'china_tang', name:'당(唐)', icon:'🐉', era:'삼국~통일신라', relation:60, trade:80, culture:90, military:70, diplomacy:75, religion:65 },
    { id:'china_song', name:'송(宋)', icon:'🏮', era:'고려', relation:70, trade:85, culture:88, military:50, diplomacy:80, religion:60 },
    { id:'china_ming', name:'명(明)', icon:'🎎', era:'조선 초', relation:80, trade:75, culture:82, military:65, diplomacy:85, religion:55 },
    { id:'japan', name:'일본', icon:'🗾', era:'삼국~조선', relation:40, trade:60, culture:50, military:80, diplomacy:45, religion:70 },
    { id:'mongol', name:'몽골', icon:'🏇', era:'고려', relation:35, trade:50, culture:40, military:95, diplomacy:30, religion:45 },
    { id:'khitan', name:'거란(요)', icon:'🐎', era:'고려', relation:30, trade:45, culture:35, military:85, diplomacy:25, religion:40 },
    { id:'jurchen', name:'여진(금)', icon:'🏔️', era:'고려~조선', relation:45, trade:55, culture:45, military:90, diplomacy:40, religion:50 },
    { id:'ryukyu', name:'류큐', icon:'🌺', era:'조선', relation:65, trade:70, culture:60, military:30, diplomacy:70, religion:55 }
];

var METALS = [
    { id:'copper', name:'동(銅)', icon:'🟤', temp:1085, hardness:30, rarity:20, uses:'화폐/불상/종' },
    { id:'bronze', name:'청동(靑銅)', icon:'🟫', temp:950, hardness:50, rarity:35, uses:'무기/거울/방울' },
    { id:'iron_m', name:'철(鐵)', icon:'⬛', temp:1538, hardness:80, rarity:40, uses:'농기구/무기/갑옷' },
    { id:'gold', name:'금(金)', icon:'🟡', temp:1064, hardness:25, rarity:90, uses:'왕관/장신구/불상' },
    { id:'silver', name:'은(銀)', icon:'⚪', temp:962, hardness:28, rarity:75, uses:'은병/장신구/식기' },
    { id:'tin', name:'주석(錫)', icon:'🔘', temp:232, hardness:15, rarity:55, uses:'청동합금/도금' },
    { id:'lead', name:'납(鉛)', icon:'⏹️', temp:327, hardness:10, rarity:30, uses:'활자/도료/유약' },
    { id:'steel', name:'강철(鋼鐵)', icon:'🔩', temp:1510, hardness:95, rarity:60, uses:'명검/갑옷/도구' },
    { id:'brass', name:'황동(黃銅)', icon:'🟨', temp:930, hardness:45, rarity:50, uses:'경첩/촛대/솥' },
    { id:'cast_iron', name:'주철(鑄鐵)', icon:'🫧', temp:1200, hardness:70, rarity:45, uses:'솥/범종/대포' }
];

var CENSUS_ERAS = [
    { id:'gojoseon', name:'고조선', year:'BC 2333~108', pop:[15000,12000,8000,5000,3000,2000], labels:['왕족','귀족','관료','평민','노비','유민'] },
    { id:'samguk', name:'삼국시대', year:'57~668', pop:[5000,30000,50000,300000,80000,20000], labels:['왕족','귀족','관료','평민','노비','천민'] },
    { id:'unified_silla', name:'통일신라', year:'668~935', pop:[3000,25000,60000,500000,120000,30000], labels:['왕족','진골','6두품','평민','노비','천민'] },
    { id:'goryeo', name:'고려', year:'918~1392', pop:[2000,35000,80000,800000,200000,50000], labels:['왕족','문반','무반','양민','천민','승려'] },
    { id:'joseon', name:'조선', year:'1392~1897', pop:[1500,50000,120000,3000000,500000,100000], labels:['왕족','양반','중인','상민','천민','승려'] },
    { id:'daehan', name:'대한제국', year:'1897~1910', pop:[500,80000,200000,5000000,300000,150000], labels:['황족','관료','상공인','농민','노동자','기타'] }
];

// ===================== UI =====================
function addV19UI() {
    var style = document.createElement('style');
    style.textContent = '.v19-nav-bar{position:absolute;bottom:42px;left:0;z-index:10006;background:linear-gradient(180deg,rgba(46,26,26,0.95),rgba(25,10,10,0.98));border:1px solid #e08c5e;border-radius:10px;display:none;padding:4px 2px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;max-width:90vw;}.v19-nav-bar::-webkit-scrollbar{display:none;}.v19-nav-btn{display:inline-block;background:rgba(224,140,94,0.15);border:1px solid #555;border-radius:8px;color:#f0c090;padding:6px 8px;margin:0 2px;font-size:11px;cursor:pointer;text-align:center;min-width:52px;vertical-align:top;}.v19-nav-btn:hover{background:rgba(224,140,94,0.35);border-color:#f0c090;}.v19-nav-btn .nb-icon{font-size:18px;display:block;}.v19-nav-btn .nb-label{font-size:9px;color:#ccc;margin-top:2px;}.v19-fp{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:10009;justify-content:center;align-items:center;padding:10px;}.v19-fp.show{display:flex;}.v19-box{background:linear-gradient(145deg,#2e1e1e,#201510);border:2px solid #e08c5e;border-radius:16px;padding:16px;max-width:680px;width:100%;max-height:85vh;overflow-y:auto;}.v19-box h2{color:#f0c090;text-align:center;font-size:18px;margin-bottom:8px;}.v19-box .v19-sub{text-align:center;color:#e08c5e;font-size:12px;margin-bottom:12px;}.v19-cw{text-align:center;margin:8px 0;}.v19-cw canvas{max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;background:#0a0a14;}.v19-btn{background:#e08c5e;border:none;color:#fff;padding:6px 16px;border-radius:14px;font-size:13px;cursor:pointer;margin:4px 2px;font-weight:bold;}.v19-btn:hover{background:#f0ac7e;}.v19-close{display:block;margin:10px auto 0;background:#555;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;cursor:pointer;}.v19-close:hover{background:#777;}.v19-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin:8px 0;}.v19-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:8px;text-align:center;border:1px solid #444;cursor:pointer;transition:all 0.2s;}.v19-card:hover{border-color:#f0c090;background:rgba(224,140,94,0.08);}.v19-card.active{border-color:#4caf50;background:rgba(76,175,80,0.1);}.v19-card .vc-icon{font-size:28px;}.v19-card .vc-name{font-size:11px;color:#eee;margin-top:2px;}.v19-card .vc-info{font-size:9px;color:#aaa;}.v19-stat-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0;}.v19-stat{background:rgba(224,140,94,0.1);border:1px solid #e08c5e;border-radius:8px;padding:6px 12px;text-align:center;min-width:80px;}.v19-stat .st-val{font-size:18px;font-weight:bold;color:#f0c090;}.v19-stat .st-lbl{font-size:10px;color:#aaa;}.v19-tabs{display:flex;gap:2px;margin-bottom:8px;overflow-x:auto;scrollbar-width:none;}.v19-tabs::-webkit-scrollbar{display:none;}.v19-tab{flex-shrink:0;padding:5px 12px;background:rgba(224,140,94,0.1);border:1px solid #555;border-radius:8px;color:#aaa;cursor:pointer;font-size:12px;}.v19-tab:hover{background:rgba(224,140,94,0.2);}.v19-tab.active{background:rgba(224,140,94,0.3);border-color:#e08c5e;color:#f0c090;}';
    document.head.appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.id = 'v19-wrapper';
    wrapper.style.cssText = 'position:fixed;bottom:260px;left:10px;z-index:10007;';

    var navBar = document.createElement('div');
    navBar.id = 'v19-nav-bar';
    navBar.className = 'v19-nav-bar';
    var features = [
        {id:'mint', icon:'🪙', label:'조폐국'},
        {id:'irrigation', icon:'💧', label:'수리시설'},
        {id:'archive', icon:'📜', label:'기록보관'},
        {id:'fortress', icon:'🏰', label:'성곽방어'},
        {id:'market', icon:'🏪', label:'전통시장'},
        {id:'embassy', icon:'🤝', label:'외교사절'},
        {id:'metal', icon:'⚒️', label:'야금제련'},
        {id:'census', icon:'📊', label:'인구조사'}
    ];
    features.forEach(function(f) {
        var btn = document.createElement('div');
        btn.className = 'v19-nav-btn';
        btn.innerHTML = '<span class="nb-icon">' + f.icon + '</span><span class="nb-label">' + f.label + '</span>';
        btn.onclick = function() {
            playV19SFX('nav_v19');
            openV19Feature(f.id);
        };
        navBar.appendChild(btn);
    });
    wrapper.appendChild(navBar);

    var togBtn = document.createElement('button');
    togBtn.id = 'v19-toggle-btn';
    togBtn.style.cssText = 'background:rgba(0,0,0,0.75);border:1px solid #e08c5e;color:#f0c090;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;display:block;';
    togBtn.textContent = '🪙';
    togBtn.title = 'v19 기능 (조폐국/수리시설/기록보관/성곽방어/전통시장/외교사절/야금제련/인구조사)';
    togBtn.onclick = function() {
        var nb = document.getElementById('v19-nav-bar');
        nb.style.display = nb.style.display === 'none' || !nb.style.display ? 'block' : 'none';
    };
    wrapper.appendChild(togBtn);
    document.body.appendChild(wrapper);

    createV19Panels();
}

function openV19Feature(id) {
    var panel = document.getElementById('v19-panel-' + id);
    if(panel) {
        panel.classList.add('show');
        renderV19Canvas(id);
    }
}

function closeV19Panel() {
    document.querySelectorAll('.v19-fp').forEach(function(p){ p.classList.remove('show'); });
}

function createV19Panels() {
    createMintPanel();
    createIrrigationPanel();
    createArchivePanel();
    createFortressPanel();
    createMarketPanel();
    createEmbassyPanel();
    createMetalPanel();
    createCensusPanel();
}

// ===================== 1. ROYAL MINT (왕실조폐국) =====================
function createMintPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-mint';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>🪙 왕실조폐국 &amp; 화폐박물관</h2><div class="v19-sub">한국 역사 화폐 10종 주조 &amp; 전시</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-mint-total">0</div><div class="st-lbl">총 주조</div></div><div class="v19-stat"><div class="st-val" id="v19-mint-types">0</div><div class="st-lbl">화폐 종류</div></div><div class="v19-stat"><div class="st-val" id="v19-mint-exh">0</div><div class="st-lbl">전시 횟수</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-mint" width="620" height="380"></canvas></div>' +
        '<div class="v19-grid" id="v19-mint-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19MintRandom()">🔨 랜덤 주조</button> <button class="v19-btn" onclick="v19MintExhibit()">🏛️ 전시회 개최</button> <button class="v19-btn" onclick="v19MintReset()">🔄 초기화</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-mint-grid');
    CURRENCIES.forEach(function(c) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-mc-' + c.id;
        card.innerHTML = '<div class="vc-icon">' + c.icon + '</div><div class="vc-name">' + c.name + '</div><div class="vc-info">' + c.era + '</div>';
        card.onclick = function() { v19MintCoin(c.id); };
        grid.appendChild(card);
    });
}

window.v19MintCoin = function(id) {
    if(!v19State.mint.minted[id]) v19State.mint.minted[id] = 0;
    v19State.mint.minted[id]++;
    v19State.mint.totalCoins++;
    playV19SFX('mint_coin');
    var card = document.getElementById('v19-mc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateMintStats();
    renderV19Canvas('mint');
};
window.v19MintRandom = function() {
    var idx = Math.floor(Math.random() * CURRENCIES.length);
    v19MintCoin(CURRENCIES[idx].id);
};
window.v19MintExhibit = function() {
    v19State.mint.exhibitions++;
    playV19SFX('mint_forge');
    saveV19State();
    updateMintStats();
    if(typeof toast === 'function') toast('🏛️ 화폐 전시회 개최! (총 ' + v19State.mint.exhibitions + '회)');
};
window.v19MintReset = function() {
    v19State.mint = { minted:{}, totalCoins:0, exhibitions:0 };
    document.querySelectorAll('#v19-mint-grid .v19-card').forEach(function(c){c.classList.remove('active');});
    saveV19State();
    updateMintStats();
    renderV19Canvas('mint');
};

function updateMintStats() {
    var el1 = document.getElementById('v19-mint-total');
    var el2 = document.getElementById('v19-mint-types');
    var el3 = document.getElementById('v19-mint-exh');
    if(el1) el1.textContent = v19State.mint.totalCoins;
    if(el2) el2.textContent = Object.keys(v19State.mint.minted).length;
    if(el3) el3.textContent = v19State.mint.exhibitions;
}

// ===================== 2. IRRIGATION (고대수리시설) =====================
function createIrrigationPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-irrigation';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>💧 고대 수리시설 관리</h2><div class="v19-sub">8종 수리시설 건설 &amp; 관개 시스템</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-irr-level">50</div><div class="st-lbl">수위</div></div><div class="v19-stat"><div class="st-val" id="v19-irr-built">0</div><div class="st-lbl">건설 수</div></div><div class="v19-stat"><div class="st-val" id="v19-irr-harvest">0</div><div class="st-lbl">수확 횟수</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-irrigation" width="600" height="380"></canvas></div>' +
        '<div class="v19-grid" id="v19-irr-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19IrrHarvest()">🌾 관개 수확</button> <button class="v19-btn" onclick="v19IrrRain()">🌧️ 강우 이벤트</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-irr-grid');
    WATERWAYS.forEach(function(w) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-wc-' + w.id;
        card.innerHTML = '<div class="vc-icon">' + w.icon + '</div><div class="vc-name">' + w.name + '</div><div class="vc-info">용량: ' + w.capacity + '</div>';
        card.onclick = function() { v19BuildWaterway(w.id); };
        grid.appendChild(card);
    });
}

window.v19BuildWaterway = function(id) {
    if(!v19State.irrigation.built[id]) v19State.irrigation.built[id] = 0;
    v19State.irrigation.built[id]++;
    var ww = WATERWAYS.find(function(w){return w.id===id;});
    if(ww) v19State.irrigation.waterLevel = Math.min(100, v19State.irrigation.waterLevel + Math.floor(ww.capacity / 10));
    playV19SFX('water_build');
    var card = document.getElementById('v19-wc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateIrrStats();
    renderV19Canvas('irrigation');
};
window.v19IrrHarvest = function() {
    v19State.irrigation.harvests++;
    var bonus = Math.floor(v19State.irrigation.waterLevel / 20);
    if(typeof resources !== 'undefined' && resources.food !== undefined) {
        resources.food += bonus * 5;
    }
    playV19SFX('water_flow');
    saveV19State();
    updateIrrStats();
    if(typeof toast === 'function') toast('🌾 관개 수확! 식량 +' + (bonus*5));
};
window.v19IrrRain = function() {
    v19State.irrigation.waterLevel = Math.min(100, v19State.irrigation.waterLevel + 15);
    playV19SFX('water_flow');
    saveV19State();
    updateIrrStats();
    renderV19Canvas('irrigation');
    if(typeof toast === 'function') toast('🌧️ 강우! 수위 +15');
};

function updateIrrStats() {
    var el1 = document.getElementById('v19-irr-level');
    var el2 = document.getElementById('v19-irr-built');
    var el3 = document.getElementById('v19-irr-harvest');
    if(el1) el1.textContent = v19State.irrigation.waterLevel;
    if(el2) el2.textContent = Object.keys(v19State.irrigation.built).length;
    if(el3) el3.textContent = v19State.irrigation.harvests;
}

// ===================== 3. ARCHIVE (왕실기록보관소) =====================
function createArchivePanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-archive';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>📜 왕실 기록보관소</h2><div class="v19-sub">한국사 12대 문헌 발굴 &amp; 열람</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-arc-found">0</div><div class="st-lbl">발견</div></div><div class="v19-stat"><div class="st-val" id="v19-arc-reads">0</div><div class="st-lbl">열람 횟수</div></div><div class="v19-stat"><div class="st-val" id="v19-arc-grade">-</div><div class="st-lbl">등급</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-archive" width="620" height="400"></canvas></div>' +
        '<div class="v19-grid" id="v19-arc-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19ArcExplore()">🔍 문헌 탐색</button> <button class="v19-btn" onclick="v19ArcDigitize()">💾 디지털 보존</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-arc-grid');
    ARCHIVE_DOCS.forEach(function(d) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-dc-' + d.id;
        card.innerHTML = '<div class="vc-icon">' + d.icon + '</div><div class="vc-name">' + d.name + '</div><div class="vc-info">' + d.era + '</div>';
        card.onclick = function() { v19DiscoverDoc(d.id); };
        grid.appendChild(card);
    });
}

window.v19DiscoverDoc = function(id) {
    v19State.archive.discovered[id] = true;
    v19State.archive.totalReads++;
    playV19SFX('archive_scroll');
    var card = document.getElementById('v19-dc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateArcStats();
    renderV19Canvas('archive');
};
window.v19ArcExplore = function() {
    var undiscovered = ARCHIVE_DOCS.filter(function(d){ return !v19State.archive.discovered[d.id]; });
    if(undiscovered.length > 0) {
        var pick = undiscovered[Math.floor(Math.random() * undiscovered.length)];
        v19DiscoverDoc(pick.id);
        if(typeof toast === 'function') toast('📜 발견: ' + pick.name + ' (' + pick.era + ')');
    } else {
        if(typeof toast === 'function') toast('📚 모든 문헌을 발견했습니다!');
    }
};
window.v19ArcDigitize = function() {
    v19State.archive.totalReads += 3;
    playV19SFX('archive_scroll');
    saveV19State();
    updateArcStats();
    if(typeof toast === 'function') toast('💾 디지털 보존 완료! 열람 +3');
};

function updateArcStats() {
    var el1 = document.getElementById('v19-arc-found');
    var el2 = document.getElementById('v19-arc-reads');
    var el3 = document.getElementById('v19-arc-grade');
    var cnt = Object.keys(v19State.archive.discovered).length;
    if(el1) el1.textContent = cnt + '/12';
    if(el2) el2.textContent = v19State.archive.totalReads;
    var grade = cnt >= 12 ? 'S' : cnt >= 9 ? 'A' : cnt >= 6 ? 'B' : cnt >= 3 ? 'C' : 'D';
    if(el3) el3.textContent = grade;
}

// ===================== 4. FORTRESS (도시성곽방어도) =====================
function createFortressPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-fortress';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>🏰 도시 성곽 방어도</h2><div class="v19-sub">8종 성곽 건설 &amp; 6축 방어력 Radar</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-fort-built">0</div><div class="st-lbl">건설</div></div><div class="v19-stat"><div class="st-val" id="v19-fort-def">0</div><div class="st-lbl">총 방어력</div></div><div class="v19-stat"><div class="st-val" id="v19-fort-siege">0</div><div class="st-lbl">방어 성공</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-fortress" width="600" height="400"></canvas></div>' +
        '<div class="v19-grid" id="v19-fort-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19FortSiege()">⚔️ 공성전 방어</button> <button class="v19-btn" onclick="v19FortRepair()">🔧 성곽 보수</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-fort-grid');
    FORTRESS_TYPES.forEach(function(f) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-fc-' + f.id;
        card.innerHTML = '<div class="vc-icon">' + f.icon + '</div><div class="vc-name">' + f.name + '</div><div class="vc-info">방어: ' + f.defense + '</div>';
        card.onclick = function() { v19BuildFortress(f.id); };
        grid.appendChild(card);
    });
}

window.v19BuildFortress = function(id) {
    if(!v19State.fortress.built[id]) v19State.fortress.built[id] = 0;
    v19State.fortress.built[id]++;
    var ft = FORTRESS_TYPES.find(function(f){return f.id===id;});
    if(ft) v19State.fortress.totalDefense += ft.defense;
    playV19SFX('fortress_build');
    var card = document.getElementById('v19-fc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateFortStats();
    renderV19Canvas('fortress');
};
window.v19FortSiege = function() {
    var def = v19State.fortress.totalDefense;
    var attackPower = 50 + Math.floor(Math.random() * 200);
    if(def >= attackPower) {
        v19State.fortress.sieges++;
        playV19SFX('fortress_build');
        if(typeof toast === 'function') toast('🛡️ 공성전 방어 성공! (적 ' + attackPower + ' vs 아군 ' + def + ')');
    } else {
        if(typeof toast === 'function') toast('💥 공성전 실패... (적 ' + attackPower + ' vs 아군 ' + def + ') 성곽을 더 쌓으세요!');
    }
    saveV19State();
    updateFortStats();
};
window.v19FortRepair = function() {
    v19State.fortress.totalDefense += 20;
    playV19SFX('fortress_build');
    saveV19State();
    updateFortStats();
    if(typeof toast === 'function') toast('🔧 성곽 보수 완료! 방어력 +20');
};

function updateFortStats() {
    var el1 = document.getElementById('v19-fort-built');
    var el2 = document.getElementById('v19-fort-def');
    var el3 = document.getElementById('v19-fort-siege');
    if(el1) el1.textContent = Object.keys(v19State.fortress.built).length;
    if(el2) el2.textContent = v19State.fortress.totalDefense;
    if(el3) el3.textContent = v19State.fortress.sieges;
}

// ===================== 5. MARKET (전통시장경제) =====================
function createMarketPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-market';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>🏪 전통시장 경제 시뮬레이터</h2><div class="v19-sub">10종 상품 수요/공급 시세 변동</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-mkt-trades">0</div><div class="st-lbl">거래 수</div></div><div class="v19-stat"><div class="st-val" id="v19-mkt-profit">0</div><div class="st-lbl">총 수익</div></div><div class="v19-stat"><div class="st-val" id="v19-mkt-merchants">0</div><div class="st-lbl">상인 수</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-market" width="640" height="380"></canvas></div>' +
        '<div class="v19-grid" id="v19-mkt-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19MktFluctuate()">📈 시세 변동</button> <button class="v19-btn" onclick="v19MktFestival()">🎊 장날 축제</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-mkt-grid');
    MARKET_GOODS.forEach(function(g) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-gc-' + g.id;
        card.innerHTML = '<div class="vc-icon">' + g.icon + '</div><div class="vc-name">' + g.name + '</div><div class="vc-info">' + g.basePrice + '냥</div>';
        card.onclick = function() { v19TradeGood(g.id); };
        grid.appendChild(card);
    });
}

window.v19TradeGood = function(id) {
    v19State.market.trades++;
    if(!v19State.market.merchants[id]) v19State.market.merchants[id] = 0;
    v19State.market.merchants[id]++;
    var g = MARKET_GOODS.find(function(x){return x.id===id;});
    var profit = g ? Math.floor(g.basePrice * (g.demand - g.supply) / 100 + (Math.random()*10-5)) : 5;
    v19State.market.profit += Math.max(1, profit);
    playV19SFX('market_trade');
    var card = document.getElementById('v19-gc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateMktStats();
    renderV19Canvas('market');
    if(typeof toast === 'function') toast('💰 거래: ' + (g?g.name:'') + ' 수익 +' + Math.max(1,profit));
};
window.v19MktFluctuate = function() {
    MARKET_GOODS.forEach(function(g) {
        g.supply = Math.max(5, Math.min(95, g.supply + Math.floor(Math.random()*20 - 10)));
        g.demand = Math.max(5, Math.min(95, g.demand + Math.floor(Math.random()*20 - 10)));
    });
    playV19SFX('market_trade');
    renderV19Canvas('market');
    if(typeof toast === 'function') toast('📈 시세 변동! 수요/공급이 변화했습니다.');
};
window.v19MktFestival = function() {
    MARKET_GOODS.forEach(function(g) { g.demand = Math.min(95, g.demand + 10); });
    v19State.market.trades += 5;
    v19State.market.profit += 50;
    playV19SFX('market_trade');
    saveV19State();
    updateMktStats();
    renderV19Canvas('market');
    if(typeof toast === 'function') toast('🎊 장날 축제! 수요 급등, 수익 +50');
};

function updateMktStats() {
    var el1 = document.getElementById('v19-mkt-trades');
    var el2 = document.getElementById('v19-mkt-profit');
    var el3 = document.getElementById('v19-mkt-merchants');
    if(el1) el1.textContent = v19State.market.trades;
    if(el2) el2.textContent = v19State.market.profit;
    if(el3) el3.textContent = Object.keys(v19State.market.merchants).length;
}

// ===================== 6. EMBASSY (왕실외교사절관) =====================
function createEmbassyPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-embassy';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>🤝 왕실 외교사절관</h2><div class="v19-sub">8개국 외교 관계 &amp; 6축 Radar</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-emb-meets">0</div><div class="st-lbl">회담</div></div><div class="v19-stat"><div class="st-val" id="v19-emb-treaties">0</div><div class="st-lbl">조약</div></div><div class="v19-stat"><div class="st-val" id="v19-emb-rep">50</div><div class="st-lbl">명성</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-embassy" width="600" height="400"></canvas></div>' +
        '<div class="v19-grid" id="v19-emb-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19EmbSummit()">👑 정상회담</button> <button class="v19-btn" onclick="v19EmbTribute()">🎁 조공 외교</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-emb-grid');
    EMBASSY_NATIONS.forEach(function(n) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-nc-' + n.id;
        card.innerHTML = '<div class="vc-icon">' + n.icon + '</div><div class="vc-name">' + n.name + '</div><div class="vc-info">우호: ' + n.relation + '</div>';
        card.onclick = function() { v19MeetNation(n.id); };
        grid.appendChild(card);
    });
}

window.v19MeetNation = function(id) {
    v19State.embassy.meetings++;
    v19State.embassy.treaties[id] = true;
    var n = EMBASSY_NATIONS.find(function(x){return x.id===id;});
    if(n) {
        n.relation = Math.min(100, n.relation + 5);
        v19State.embassy.reputation = Math.min(100, v19State.embassy.reputation + 2);
    }
    playV19SFX('embassy_meet');
    var card = document.getElementById('v19-nc-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateEmbStats();
    renderV19Canvas('embassy');
};
window.v19EmbSummit = function() {
    v19State.embassy.meetings += 3;
    v19State.embassy.reputation = Math.min(100, v19State.embassy.reputation + 5);
    EMBASSY_NATIONS.forEach(function(n){ n.relation = Math.min(100, n.relation + 3); });
    playV19SFX('embassy_meet');
    saveV19State();
    updateEmbStats();
    renderV19Canvas('embassy');
    if(typeof toast === 'function') toast('👑 정상회담! 전체 우호도 +3, 명성 +5');
};
window.v19EmbTribute = function() {
    v19State.embassy.meetings++;
    v19State.embassy.reputation = Math.min(100, v19State.embassy.reputation + 3);
    playV19SFX('embassy_meet');
    saveV19State();
    updateEmbStats();
    if(typeof toast === 'function') toast('🎁 조공 외교! 명성 +3');
};

function updateEmbStats() {
    var el1 = document.getElementById('v19-emb-meets');
    var el2 = document.getElementById('v19-emb-treaties');
    var el3 = document.getElementById('v19-emb-rep');
    if(el1) el1.textContent = v19State.embassy.meetings;
    if(el2) el2.textContent = Object.keys(v19State.embassy.treaties).length;
    if(el3) el3.textContent = v19State.embassy.reputation;
}

// ===================== 7. METALLURGY (고대야금제련소) =====================
function createMetalPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-metal';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>⚒️ 고대 야금 제련소</h2><div class="v19-sub">10종 금속 제련 &amp; 온도/경도 비교</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-met-bars">0</div><div class="st-lbl">제련</div></div><div class="v19-stat"><div class="st-val" id="v19-met-types">0</div><div class="st-lbl">금속 종류</div></div><div class="v19-stat"><div class="st-val" id="v19-met-master">0</div><div class="st-lbl">명작</div></div></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-metal" width="640" height="400"></canvas></div>' +
        '<div class="v19-grid" id="v19-met-grid"></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19MetSmelt()">🔥 랜덤 제련</button> <button class="v19-btn" onclick="v19MetMasterwork()">⚔️ 명작 제작</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var grid = panel.querySelector('#v19-met-grid');
    METALS.forEach(function(m) {
        var card = document.createElement('div');
        card.className = 'v19-card';
        card.id = 'v19-mc2-' + m.id;
        card.innerHTML = '<div class="vc-icon">' + m.icon + '</div><div class="vc-name">' + m.name + '</div><div class="vc-info">' + m.temp + '&deg;C</div>';
        card.onclick = function() { v19SmeltMetal(m.id); };
        grid.appendChild(card);
    });
}

window.v19SmeltMetal = function(id) {
    if(!v19State.metal.smelted[id]) v19State.metal.smelted[id] = 0;
    v19State.metal.smelted[id]++;
    v19State.metal.totalBars++;
    playV19SFX('metal_smelt');
    var card = document.getElementById('v19-mc2-' + id);
    if(card) card.classList.add('active');
    saveV19State();
    updateMetStats();
    renderV19Canvas('metal');
};
window.v19MetSmelt = function() {
    var idx = Math.floor(Math.random() * METALS.length);
    v19SmeltMetal(METALS[idx].id);
    if(typeof toast === 'function') toast('🔥 ' + METALS[idx].name + ' 제련!');
};
window.v19MetMasterwork = function() {
    if(v19State.metal.totalBars >= 5) {
        v19State.metal.masterworks++;
        v19State.metal.totalBars -= 5;
        playV19SFX('metal_smelt');
        saveV19State();
        updateMetStats();
        if(typeof toast === 'function') toast('⚔️ 명작 제작! (잉곳 5개 소모)');
    } else {
        if(typeof toast === 'function') toast('❌ 잉곳 5개 필요합니다 (현재: ' + v19State.metal.totalBars + ')');
    }
};

function updateMetStats() {
    var el1 = document.getElementById('v19-met-bars');
    var el2 = document.getElementById('v19-met-types');
    var el3 = document.getElementById('v19-met-master');
    if(el1) el1.textContent = v19State.metal.totalBars;
    if(el2) el2.textContent = Object.keys(v19State.metal.smelted).length;
    if(el3) el3.textContent = v19State.metal.masterworks;
}

// ===================== 8. CENSUS (역사인구조사국) =====================
function createCensusPanel() {
    var panel = document.createElement('div');
    panel.id = 'v19-panel-census';
    panel.className = 'v19-fp';
    panel.innerHTML = '<div class="v19-box"><h2>📊 역사 인구조사국</h2><div class="v19-sub">6시대 인구 피라미드 &amp; 계층 구조</div>' +
        '<div class="v19-stat-row"><div class="v19-stat"><div class="st-val" id="v19-cen-surveys">0</div><div class="st-lbl">조사 횟수</div></div><div class="v19-stat"><div class="st-val" id="v19-cen-era">-</div><div class="st-lbl">현재 시대</div></div></div>' +
        '<div class="v19-tabs" id="v19-cen-tabs"></div>' +
        '<div class="v19-cw"><canvas id="v19-canvas-census" width="620" height="400"></canvas></div>' +
        '<div style="text-align:center;margin:8px 0;"><button class="v19-btn" onclick="v19CenSurvey()">📋 인구 조사</button> <button class="v19-btn" onclick="v19CenCompare()">📊 시대 비교</button></div>' +
        '<button class="v19-close" onclick="closeV19Panel()">닫기</button></div>';
    document.body.appendChild(panel);

    var tabs = panel.querySelector('#v19-cen-tabs');
    CENSUS_ERAS.forEach(function(era, i) {
        var tab = document.createElement('div');
        tab.className = 'v19-tab' + (i === 0 ? ' active' : '');
        tab.textContent = era.name;
        tab.dataset.era = era.id;
        tab.onclick = function() {
            tabs.querySelectorAll('.v19-tab').forEach(function(t){t.classList.remove('active');});
            tab.classList.add('active');
            v19State.census.lastEra = era.id;
            renderV19Canvas('census');
        };
        tabs.appendChild(tab);
    });
    v19State.census.lastEra = 'gojoseon';
}

window.v19CenSurvey = function() {
    v19State.census.surveys++;
    playV19SFX('census_count');
    saveV19State();
    updateCenStats();
    renderV19Canvas('census');
    if(typeof toast === 'function') toast('📋 인구 조사 완료! (총 ' + v19State.census.surveys + '회)');
};
window.v19CenCompare = function() {
    v19State.census.surveys++;
    playV19SFX('census_count');
    saveV19State();
    updateCenStats();
    renderCensusComparison();
    if(typeof toast === 'function') toast('📊 시대별 인구 비교 차트 생성!');
};

function updateCenStats() {
    var el1 = document.getElementById('v19-cen-surveys');
    var el2 = document.getElementById('v19-cen-era');
    if(el1) el1.textContent = v19State.census.surveys;
    var era = CENSUS_ERAS.find(function(e){return e.id === v19State.census.lastEra;});
    if(el2) el2.textContent = era ? era.name : '-';
}

// ===================== CANVAS RENDERING =====================
function renderV19Canvas(id) {
    switch(id) {
        case 'mint': renderMintCanvas(); break;
        case 'irrigation': renderIrrigationCanvas(); break;
        case 'archive': renderArchiveCanvas(); break;
        case 'fortress': renderFortressCanvas(); break;
        case 'market': renderMarketCanvas(); break;
        case 'embassy': renderEmbassyCanvas(); break;
        case 'metal': renderMetalCanvas(); break;
        case 'census': renderCensusCanvas(); break;
    }
}

function renderMintCanvas() {
    var c = document.getElementById('v19-canvas-mint');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한국 역사 화폐 주조 현황', W/2, 22);

    var barW = 45, gap = 10, startX = 30;
    var maxVal = 1;
    CURRENCIES.forEach(function(cc) { maxVal = Math.max(maxVal, v19State.mint.minted[cc.id] || 0); });
    var barH = H - 80;

    CURRENCIES.forEach(function(cc, i) {
        var x = startX + i * (barW + gap);
        var val = v19State.mint.minted[cc.id] || 0;
        var h = maxVal > 0 ? (val / maxVal) * (barH - 20) : 0;

        var grad = ctx.createLinearGradient(x, H - 40 - h, x, H - 40);
        grad.addColorStop(0, '#ffd700');
        grad.addColorStop(1, '#8b6508');
        ctx.fillStyle = grad;
        ctx.fillRect(x, H - 40 - h, barW, h);

        ctx.strokeStyle = '#c4923a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, H - 40 - h, barW, h);

        if(val > 0) {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(val, x + barW/2, H - 44 - h);
        }

        ctx.fillStyle = '#aaa';
        ctx.font = '9px sans-serif';
        ctx.save();
        ctx.translate(x + barW/2, H - 28);
        ctx.rotate(-0.4);
        ctx.fillText(cc.name.substring(0,4), 0, 0);
        ctx.restore();

        ctx.font = '16px sans-serif';
        ctx.fillText(cc.icon, x + barW/2, H - 8);
    });
}

function renderIrrigationCanvas() {
    var c = document.getElementById('v19-canvas-irrigation');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#90caf9';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('수리시설 현황 & 수위 모니터', W/2, 22);

    var level = v19State.irrigation.waterLevel;
    var tankX = 30, tankY = 50, tankW = 100, tankH = H - 100;
    ctx.strokeStyle = '#5e8ce0';
    ctx.lineWidth = 2;
    ctx.strokeRect(tankX, tankY, tankW, tankH);

    var waterH = (level / 100) * tankH;
    var wGrad = ctx.createLinearGradient(tankX, tankY + tankH - waterH, tankX, tankY + tankH);
    wGrad.addColorStop(0, 'rgba(33,150,243,0.6)');
    wGrad.addColorStop(1, 'rgba(13,71,161,0.8)');
    ctx.fillStyle = wGrad;
    ctx.fillRect(tankX + 2, tankY + tankH - waterH, tankW - 4, waterH);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(level + '%', tankX + tankW/2, tankY + tankH/2);

    var barW = 50, startX = 160, gap = 8;
    WATERWAYS.forEach(function(w, i) {
        var x = startX + i * (barW + gap);
        var val = v19State.irrigation.built[w.id] || 0;
        var h = Math.min(val * 30, H - 100);

        var bGrad = ctx.createLinearGradient(x, H - 50 - h, x, H - 50);
        bGrad.addColorStop(0, '#2196f3');
        bGrad.addColorStop(1, '#0d47a1');
        ctx.fillStyle = bGrad;
        ctx.fillRect(x, H - 50 - h, barW, h);

        ctx.fillStyle = '#90caf9';
        ctx.font = '10px sans-serif';
        ctx.fillText(w.icon, x + barW/2, H - 35);
        ctx.fillStyle = '#aaa';
        ctx.font = '8px sans-serif';
        ctx.fillText(w.name.substring(0,3), x + barW/2, H - 22);

        if(val > 0) {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText(val, x + barW/2, H - 54 - h);
        }
    });
}

function renderArchiveCanvas() {
    var c = document.getElementById('v19-canvas-archive');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한국사 12대 문헌 중요도 & 발견 현황', W/2, 22);

    var barW = 40, gap = 8, startX = 25;
    ARCHIVE_DOCS.forEach(function(d, i) {
        var x = startX + i * (barW + gap);
        var discovered = v19State.archive.discovered[d.id];
        var h = (d.importance / 100) * (H - 100);

        var color = discovered ? '#4caf50' : '#555';
        var grad = ctx.createLinearGradient(x, H - 50 - h, x, H - 50);
        grad.addColorStop(0, discovered ? '#66bb6a' : '#666');
        grad.addColorStop(1, discovered ? '#1b5e20' : '#333');
        ctx.fillStyle = grad;
        ctx.fillRect(x, H - 50 - h, barW, h);

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, H - 50 - h, barW, h);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(d.importance, x + barW/2, H - 54 - h);

        ctx.font = '14px sans-serif';
        ctx.fillText(d.icon, x + barW/2, H - 35);

        ctx.fillStyle = '#aaa';
        ctx.font = '8px sans-serif';
        ctx.save();
        ctx.translate(x + barW/2, H - 18);
        ctx.rotate(-0.5);
        ctx.fillText(d.name.substring(0,5), 0, 0);
        ctx.restore();
    });
}

function renderFortressCanvas() {
    var c = document.getElementById('v19-canvas-fortress');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('성곽 방어력 6축 Radar', W/2, 22);

    var cx = W/2, cy = H/2 + 10, r = Math.min(W, H) * 0.32;
    var axes = ['방어력', '지형활용', '가시성', '내구성', '주둔병력', '기동성'];
    var n = axes.length;

    for(var ring = 5; ring >= 1; ring--) {
        var rr = r * ring / 5;
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var angle = -Math.PI/2 + (2 * Math.PI * i / n);
            var px = cx + rr * Math.cos(angle);
            var py = cy + rr * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(224,140,94,0.2)';
        ctx.stroke();
    }

    for(var i = 0; i < n; i++) {
        var angle = -Math.PI/2 + (2 * Math.PI * i / n);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(224,140,94,0.3)';
        ctx.stroke();

        var lx = cx + (r + 20) * Math.cos(angle);
        var ly = cy + (r + 20) * Math.sin(angle);
        ctx.fillStyle = '#f0c090';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(axes[i], lx, ly + 4);
    }

    var builtForts = Object.keys(v19State.fortress.built);
    var colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3','#54a0ff','#5f27cd'];
    builtForts.forEach(function(fid, fi) {
        var ft = FORTRESS_TYPES.find(function(f){return f.id === fid;});
        if(!ft) return;
        var vals = [ft.defense, ft.terrain, ft.visibility, ft.durability, ft.garrison, ft.speed];
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var angle = -Math.PI/2 + (2 * Math.PI * i / n);
            var v = vals[i] / 100;
            var px = cx + r * v * Math.cos(angle);
            var py = cy + r * v * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = colors[fi % colors.length];
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = colors[fi % colors.length].replace(')', ',0.1)').replace('rgb', 'rgba');
        ctx.fill();
    });

    if(builtForts.length === 0) {
        var avgFort = FORTRESS_TYPES[4];
        var vals = [avgFort.defense, avgFort.terrain, avgFort.visibility, avgFort.durability, avgFort.garrison, avgFort.speed];
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var angle = -Math.PI/2 + (2 * Math.PI * i / n);
            var v = vals[i] / 100;
            var px = cx + r * v * Math.cos(angle);
            var py = cy + r * v * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = '#feca57';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'rgba(254,202,87,0.1)';
        ctx.fill();
        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        ctx.fillText('(예시: 수원화성)', W/2, H - 20);
    }
}

function renderMarketCanvas() {
    var c = document.getElementById('v19-canvas-market');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('전통시장 수요/공급 시세 차트', W/2, 22);

    var barW = 24, startX = 40, gap = 16;
    var maxP = 1;
    MARKET_GOODS.forEach(function(g){ maxP = Math.max(maxP, g.supply, g.demand); });

    MARKET_GOODS.forEach(function(g, i) {
        var x = startX + i * (barW * 2 + gap);
        var sH = (g.supply / maxP) * (H - 100);
        var dH = (g.demand / maxP) * (H - 100);

        var sGrad = ctx.createLinearGradient(x, H - 50 - sH, x, H - 50);
        sGrad.addColorStop(0, '#4caf50');
        sGrad.addColorStop(1, '#1b5e20');
        ctx.fillStyle = sGrad;
        ctx.fillRect(x, H - 50 - sH, barW, sH);

        var dGrad = ctx.createLinearGradient(x + barW, H - 50 - dH, x + barW, H - 50);
        dGrad.addColorStop(0, '#f44336');
        dGrad.addColorStop(1, '#b71c1c');
        ctx.fillStyle = dGrad;
        ctx.fillRect(x + barW, H - 50 - dH, barW, dH);

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.fillText(g.supply, x + barW/2, H - 54 - sH);
        ctx.fillText(g.demand, x + barW + barW/2, H - 54 - dH);

        ctx.font = '14px sans-serif';
        ctx.fillText(g.icon, x + barW, H - 35);
        ctx.fillStyle = '#aaa';
        ctx.font = '9px sans-serif';
        ctx.fillText(g.name, x + barW, H - 18);
    });

    ctx.fillStyle = '#4caf50'; ctx.fillRect(W - 120, 12, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('공급', W - 106, 21);
    ctx.fillStyle = '#f44336'; ctx.fillRect(W - 70, 12, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.fillText('수요', W - 56, 21);
}

function renderEmbassyCanvas() {
    var c = document.getElementById('v19-canvas-embassy');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('외교 관계 6축 Radar (8개국)', W/2, 22);

    var cx = W/2, cy = H/2 + 10, r = Math.min(W, H) * 0.3;
    var axes = ['우호도', '교역', '문화', '군사', '외교', '종교'];
    var n = axes.length;

    for(var ring = 5; ring >= 1; ring--) {
        var rr = r * ring / 5;
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var angle = -Math.PI/2 + (2 * Math.PI * i / n);
            if(i === 0) ctx.moveTo(cx + rr * Math.cos(angle), cy + rr * Math.sin(angle));
            else ctx.lineTo(cx + rr * Math.cos(angle), cy + rr * Math.sin(angle));
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(224,140,94,0.2)';
        ctx.stroke();
    }

    for(var i = 0; i < n; i++) {
        var angle = -Math.PI/2 + (2 * Math.PI * i / n);
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = 'rgba(224,140,94,0.3)'; ctx.stroke();
        var lx = cx + (r + 20) * Math.cos(angle);
        var ly = cy + (r + 20) * Math.sin(angle);
        ctx.fillStyle = '#f0c090'; ctx.font = '11px sans-serif';
        ctx.fillText(axes[i], lx, ly + 4);
    }

    var colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#ff6348','#1dd1a1','#5f27cd','#54a0ff'];
    EMBASSY_NATIONS.forEach(function(nat, ni) {
        if(!v19State.embassy.treaties[nat.id] && ni > 1) return;
        var vals = [nat.relation, nat.trade, nat.culture, nat.military, nat.diplomacy, nat.religion];
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var angle = -Math.PI/2 + (2 * Math.PI * i / n);
            var v = vals[i] / 100;
            var px = cx + r * v * Math.cos(angle);
            var py = cy + r * v * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = colors[ni];
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = colors[ni].replace(')', ',0.08)').replace('#', 'rgba(').replace(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, function(m,r,g,b){
            return parseInt(r,16)+','+parseInt(g,16)+','+parseInt(b,16);
        });
        ctx.fill();
    });

    var legendY = 40;
    EMBASSY_NATIONS.forEach(function(nat, ni) {
        if(!v19State.embassy.treaties[nat.id] && ni > 1) return;
        ctx.fillStyle = colors[ni];
        ctx.fillRect(10, legendY + ni * 16, 10, 10);
        ctx.fillStyle = '#ccc'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(nat.icon + ' ' + nat.name, 24, legendY + ni * 16 + 9);
    });
}

function renderMetalCanvas() {
    var c = document.getElementById('v19-canvas-metal');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('금속 제련 온도 & 경도 비교', W/2, 22);

    var barW = 50, gap = 10, startX = 30;
    var maxTemp = 1600;

    METALS.forEach(function(m, i) {
        var x = startX + i * (barW + gap);
        var tH = (m.temp / maxTemp) * (H - 110);
        var smelted = v19State.metal.smelted[m.id] || 0;

        var grad = ctx.createLinearGradient(x, H - 60 - tH, x, H - 60);
        if(m.temp > 1200) { grad.addColorStop(0, '#ff4444'); grad.addColorStop(1, '#880000'); }
        else if(m.temp > 800) { grad.addColorStop(0, '#ff8800'); grad.addColorStop(1, '#884400'); }
        else { grad.addColorStop(0, '#ffcc00'); grad.addColorStop(1, '#886600'); }
        ctx.fillStyle = grad;
        ctx.fillRect(x, H - 60 - tH, barW, tH);

        var hBar = (m.hardness / 100) * barW;
        ctx.fillStyle = 'rgba(76,175,80,0.5)';
        ctx.fillRect(x, H - 58, hBar, 6);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(m.temp + '°', x + barW/2, H - 64 - tH);

        if(smelted > 0) {
            ctx.fillStyle = '#4caf50';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('x' + smelted, x + barW/2, H - 78 - tH);
        }

        ctx.font = '16px sans-serif';
        ctx.fillText(m.icon, x + barW/2, H - 38);
        ctx.fillStyle = '#aaa';
        ctx.font = '9px sans-serif';
        ctx.fillText(m.name.substring(0,3), x + barW/2, H - 22);
    });

    ctx.fillStyle = '#ff8800'; ctx.fillRect(W - 150, 12, 10, 10);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('용융점(°C)', W - 136, 21);
    ctx.fillStyle = 'rgba(76,175,80,0.5)'; ctx.fillRect(W - 150, 26, 10, 6);
    ctx.fillStyle = '#aaa'; ctx.fillText('경도', W - 136, 33);
}

function renderCensusCanvas() {
    var c = document.getElementById('v19-canvas-census');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    var era = CENSUS_ERAS.find(function(e){return e.id === v19State.census.lastEra;}) || CENSUS_ERAS[0];

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(era.name + ' 인구 피라미드 (' + era.year + ')', W/2, 22);

    var total = era.pop.reduce(function(a,b){return a+b;}, 0);
    var maxPop = Math.max.apply(null, era.pop);
    var barH = 35, gap = 8, startY = 50;
    var maxBarW = W - 180;
    var colors = ['#ffd700','#ff6b6b','#54a0ff','#4ecdc4','#ff9ff3','#1dd1a1'];

    era.pop.forEach(function(pop, i) {
        var y = startY + i * (barH + gap);
        var bW = (pop / maxPop) * maxBarW;

        var grad = ctx.createLinearGradient(140, y, 140 + bW, y);
        grad.addColorStop(0, colors[i]);
        grad.addColorStop(1, colors[i] + '66');
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.roundRect(140, y, bW, barH, 4);
        ctx.fill();

        ctx.fillStyle = '#eee';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(era.labels[i], 130, y + barH/2 + 4);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#fff';
        ctx.font = '11px sans-serif';
        var pctStr = (pop / total * 100).toFixed(1) + '%';
        ctx.fillText(pop.toLocaleString() + '  (' + pctStr + ')', 148 + bW, y + barH/2 + 4);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('총 인구: ' + total.toLocaleString() + '명 (추정)', W/2, H - 15);
}

function renderCensusComparison() {
    var c = document.getElementById('v19-canvas-census');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#f0c090';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('시대별 총 인구 비교', W/2, 22);

    var totals = CENSUS_ERAS.map(function(e){ return e.pop.reduce(function(a,b){return a+b;},0); });
    var maxT = Math.max.apply(null, totals);
    var barW = 70, gap = 18, startX = 40;
    var colors = ['#8b6508','#c0392b','#2980b9','#27ae60','#8e44ad','#e67e22'];

    CENSUS_ERAS.forEach(function(era, i) {
        var x = startX + i * (barW + gap);
        var t = totals[i];
        var h = (t / maxT) * (H - 100);

        var grad = ctx.createLinearGradient(x, H - 50 - h, x, H - 50);
        grad.addColorStop(0, colors[i]);
        grad.addColorStop(1, colors[i] + '44');
        ctx.fillStyle = grad;
        ctx.fillRect(x, H - 50 - h, barW, h);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(t.toLocaleString(), x + barW/2, H - 54 - h);

        ctx.fillStyle = '#f0c090';
        ctx.font = '11px sans-serif';
        ctx.fillText(era.name, x + barW/2, H - 35);

        ctx.fillStyle = '#aaa';
        ctx.font = '9px sans-serif';
        ctx.fillText(era.year.substring(0,10), x + barW/2, H - 20);
    });
}

// ===================== QUIZ v19 (+15 → 220→235) =====================
function hookV19Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQ = [
        { q:'고려 시대 최초로 주조된 동전의 이름은?', a:['해동통보','상평통보','조선통보','건원중보'], correct:0 },
        { q:'조선시대 가장 오래 사용된 화폐는?', a:['상평통보','건원중보','해동통보','백동화'], correct:0 },
        { q:'김정호가 제작한 전국 지도의 이름은?', a:['대동여지도','팔도총도','혼일강리','천하도'], correct:0 },
        { q:'조선왕조실록이 UNESCO 세계기록유산에 등재된 해는?', a:['1997년','2001년','1995년','2003년'], correct:0 },
        { q:'수원화성을 설계한 인물은?', a:['정약용','이순신','세종','박지원'], correct:0 },
        { q:'한국 전통 제철법에서 숯(목탄)으로 철을 녹이는 기술은?', a:['제련(製鍊)','단조(鍛造)','주조(鑄造)','압연(壓延)'], correct:0 },
        { q:'고구려 천리장성은 어디에서 어디까지?', a:['요동~동해','평양~서울','백두~한라','압록~두만'], correct:0 },
        { q:'동의보감을 저술한 조선시대 의관은?', a:['허준','이황','이이','정약전'], correct:0 },
        { q:'고대 수리시설 중 물레방아와 같은 원리의 기구는?', a:['수차(水車)','제방(堤防)','보(洑)','수도교'], correct:0 },
        { q:'조선시대 인구 중 가장 큰 비중을 차지한 계층은?', a:['상민(常民)','양반','천민','중인'], correct:0 },
        { q:'고려청자에 사용된 독특한 기법은?', a:['상감기법','분청기법','백자기법','철화기법'], correct:0 },
        { q:'조선시대 관료 선발의 최고 시험은?', a:['문과 대과','무과','잡과','생원시'], correct:0 },
        { q:'삼국사기를 편찬한 고려시대 학자는?', a:['김부식','일연','정도전','최충'], correct:0 },
        { q:'강화도가 몽골 침입 시 수도로 쓰인 기간은 약?', a:['39년','10년','50년','25년'], correct:0 },
        { q:'고대 청동기를 만드는 주재료 두 가지는?', a:['구리+주석','구리+납','철+주석','금+은'], correct:0 }
    ];
    newQ.forEach(function(nq) {
        var exists = quizQuestions.some(function(eq) { return eq.q === nq.q; });
        if(!exists) quizQuestions.push(nq);
    });
}

// ===================== ACHIEVEMENTS v19 (+12 → 194→206) =====================
function hookV19Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAch = [
        { id:'v19_minter', name:'🪙 조폐관', desc:'5종 이상 화폐 주조', check: function(){ return Object.keys(v19State.mint.minted).length >= 5; } },
        { id:'v19_numismatist', name:'💰 화폐수집가', desc:'10종 화폐 전종 주조', check: function(){ return Object.keys(v19State.mint.minted).length >= 10; } },
        { id:'v19_irrigator', name:'💧 치수명인', desc:'5종 이상 수리시설 건설', check: function(){ return Object.keys(v19State.irrigation.built).length >= 5; } },
        { id:'v19_archivist', name:'📜 기록학자', desc:'8개 이상 문헌 발견', check: function(){ return Object.keys(v19State.archive.discovered).length >= 8; } },
        { id:'v19_librarian', name:'📚 만권도서관', desc:'전체 12문헌 발견', check: function(){ return Object.keys(v19State.archive.discovered).length >= 12; } },
        { id:'v19_castellan', name:'🏰 성주', desc:'4종 이상 성곽 건설', check: function(){ return Object.keys(v19State.fortress.built).length >= 4; } },
        { id:'v19_defender', name:'🛡️ 수성장군', desc:'공성전 방어 3회 성공', check: function(){ return v19State.fortress.sieges >= 3; } },
        { id:'v19_merchant', name:'🏪 거상', desc:'거래 20회 이상 달성', check: function(){ return v19State.market.trades >= 20; } },
        { id:'v19_diplomat', name:'🤝 외교대신', desc:'5개국 이상 조약 체결', check: function(){ return Object.keys(v19State.embassy.treaties).length >= 5; } },
        { id:'v19_smith', name:'⚒️ 대장장이', desc:'7종 이상 금속 제련', check: function(){ return Object.keys(v19State.metal.smelted).length >= 7; } },
        { id:'v19_surveyor', name:'📊 인구조사관', desc:'인구 조사 5회 이상', check: function(){ return v19State.census.surveys >= 5; } },
        { id:'v19_complete', name:'🌟 v19 올스타', desc:'8개 기능 모두 1회 이상 사용', check: function(){ return Object.keys(v19State.mint.minted).length>0 && Object.keys(v19State.irrigation.built).length>0 && Object.keys(v19State.archive.discovered).length>0 && Object.keys(v19State.fortress.built).length>0 && v19State.market.trades>0 && Object.keys(v19State.embassy.treaties).length>0 && Object.keys(v19State.metal.smelted).length>0 && v19State.census.surveys>0; } }
    ];
    newAch.forEach(function(a) {
        var exists = achievements.some(function(ea) { return ea.id === a.id; });
        if(!exists) achievements.push(a);
    });
}

function checkV19Achievements() {
    if(typeof achievements === 'undefined' || typeof unlockedAchievements === 'undefined') return;
    achievements.forEach(function(ach) {
        if(ach.id && ach.id.indexOf('v19_') === 0 && !unlockedAchievements.has(ach.id)) {
            if(ach.check && ach.check()) {
                unlockedAchievements.add(ach.id);
                playV19SFX('achieve_v19');
                if(typeof toast === 'function') toast('🏆 업적 달성: ' + ach.name);
                try { localStorage.setItem('cityAchievements', JSON.stringify([...unlockedAchievements])); } catch(e){}
            }
        }
    });
}

// ===================== ADVISOR TIPS =====================
function hookV19AdvisorTips() {
    if(typeof window.gameTickHooks === 'undefined') return;
    var tips = [
        '🪙 화폐를 주조해 경제를 발전시키세요!',
        '💧 수리시설을 건설하면 농업 생산량이 증가합니다.',
        '📜 역사 기록을 발견해 문화 수준을 높이세요.',
        '🏰 성곽을 쌓아 외적의 침략에 대비하세요.',
        '🏪 전통시장에서 거래하면 금 수입이 늘어납니다.',
        '🤝 외교 사절을 파견해 국제 관계를 개선하세요.',
        '⚒️ 금속을 제련해 무기와 도구를 만드세요.',
        '📊 인구 조사로 왕국의 현황을 파악하세요.'
    ];
    var tipIdx = 0;
    setInterval(function() {
        if(typeof toast === 'function' && Math.random() < 0.03) {
            toast(tips[tipIdx % tips.length]);
            tipIdx++;
        }
    }, 60000);
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV19Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        var codeMap = {
            'KeyQ': 'mint',
            'KeyW': 'irrigation',
            'KeyE': 'archive',
            'KeyR': 'fortress',
            'KeyT': 'market',
            'KeyY': 'embassy',
            'KeyU': 'metal',
            'KeyI': 'census'
        };
        var feature = codeMap[e.code];
        if(feature) {
            e.preventDefault();
            var nb = document.getElementById('v19-nav-bar');
            if(nb) nb.style.display = 'block';
            openV19Feature(feature);
        }
    });
}

// ===================== GAME TICK HOOK =====================
function hookV19GameTick() {
    if(typeof window.gameTickHooks === 'undefined') window.gameTickHooks = [];
    window.gameTickHooks.push(function() {
        var trades = v19State.market.trades;
        if(trades > 0 && typeof resources !== 'undefined' && resources.gold !== undefined) {
            resources.gold += Math.floor(trades / 10);
        }

        var forts = Object.keys(v19State.fortress.built).length;
        if(forts >= 3 && typeof resources !== 'undefined' && resources.happiness !== undefined) {
            resources.happiness = Math.min(100, (resources.happiness || 50) + 1);
        }

        if(v19State.irrigation.waterLevel >= 60 && typeof resources !== 'undefined' && resources.food !== undefined) {
            resources.food += 2;
        }

        if(Math.random() < 0.005) {
            checkV19Achievements();
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV19AutoSave() {
    setInterval(function() { saveV19State(); }, 60000);
}

// ===================== INIT =====================
function initV19() {
    loadV19State();
    addV19UI();
    hookV19GameTick();
    hookV19Quiz();
    hookV19Achievements();
    hookV19AdvisorTips();
    hookV19AutoSave();
    hookV19Keyboard();

    setTimeout(function() { checkV19Achievements(); }, 9000);

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🪙 v19.0: 조폐국+수리시설+기록보관+성곽방어+전통시장+외교사절+야금제련+인구조사!');
        }, 18000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV19, 7000); });
} else {
    setTimeout(initV19, 7000);
}

window.closeV19Panel = closeV19Panel;

})();
