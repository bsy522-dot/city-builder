// =====================================================================
// city-builder v13_patch.js — PRIME Holdings NEXTERA+PRISM v13.0
// Self-contained IIFE patch: Royal Library 12 scrolls Canvas,
// Occupation System 8 jobs Canvas Pie, Spy Network 6 nations Canvas,
// International Trade Port 8 goods Canvas Line, City Beautification
// 10 parks Canvas Environment Index, Royal Succession Canvas Tree,
// Rebellion System event-driven, Religion System 6 temples Canvas,
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
        case 'library_study':
            [523,587,659,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'occupation_assign':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'spy_dispatch':
            [220,330,220,440].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.14);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.14);
            });
            break;
        case 'trade_deal':
            [392,494,588,494,392].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.16);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.16);
            });
            break;
        case 'park_build':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(350, now);
            o.frequency.linearRampToValueAtTime(550, now+0.2);
            o.frequency.linearRampToValueAtTime(700, now+0.35);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.4);
            break;
        case 'succession_event':
            [262,330,392,523].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.25);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.25);
            });
            break;
        case 'rebellion_alert':
            [440,220,440,220,550].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.05, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.12);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.12);
            });
            break;
        case 'temple_prayer':
            [262,330,392,330,262].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.15);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.07, now+i*0.15);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.15+0.3);
                oo.connect(gg); oo.start(now+i*0.15); oo.stop(now+i*0.15+0.3);
            });
            break;
        case 'rebellion_suppress':
            [660,550,440,330,220].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.05);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.05);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.05+0.12);
                oo.connect(gg); oo.start(now+i*0.05); oo.stop(now+i*0.05+0.12);
            });
            break;
        case 'spy_report':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(600, now);
            o.frequency.linearRampToValueAtTime(400, now+0.15);
            o.frequency.linearRampToValueAtTime(700, now+0.3);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'achieve_v13':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'feature_open13':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(500, now);
            o.frequency.linearRampToValueAtTime(700, now+0.12);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
    }
}

// ===================== STYLE =====================
var v13Style = document.createElement('style');
v13Style.textContent = '.v13-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:200;display:flex;justify-content:center;align-items:center;animation:v13fadeIn 0.3s}' +
'@keyframes v13fadeIn{from{opacity:0}to{opacity:1}}' +
'.v13-box{background:linear-gradient(145deg,#1e2a3a,#162030);border:2px solid #4a8;border-radius:16px;padding:20px;max-width:520px;width:92%;max-height:82vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.6);color:#eee}' +
'.v13-box h2{text-align:center;color:#7cf;margin-bottom:14px;font-size:20px}' +
'.v13-box h3{color:#5da;font-size:14px;margin:12px 0 6px;border-bottom:1px solid #334;padding-bottom:4px}' +
'.v13-close{position:absolute;top:10px;right:14px;background:none;border:none;color:#aaa;font-size:24px;cursor:pointer}' +
'.v13-close:hover{color:#fff}' +
'.v13-box{position:relative}' +
'.v13-section{margin-bottom:12px}' +
'.v13-item{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.04);border-radius:10px;margin-bottom:6px;cursor:pointer;transition:background 0.2s}' +
'.v13-item:hover{background:rgba(255,255,255,0.1)}' +
'.v13-item-icon{font-size:28px;flex-shrink:0}' +
'.v13-item-info{flex:1;min-width:0}' +
'.v13-item-name{font-weight:bold;color:#dde;font-size:13px}' +
'.v13-item-desc{font-size:11px;color:#999;margin-top:2px}' +
'.v13-item-cost{font-size:10px;color:#fa0;margin-top:2px}' +
'.v13-btn{background:linear-gradient(135deg,#4a8,#385);border:none;color:#fff;padding:5px 14px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;flex-shrink:0}' +
'.v13-btn:hover{filter:brightness(1.2)}' +
'.v13-btn.disabled{opacity:0.4;cursor:not-allowed}' +
'.v13-stat{display:flex;justify-content:space-between;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:8px;margin-top:4px;font-size:12px;color:#aaa}' +
'.v13-stat-val{font-weight:bold;color:#7cf}' +
'.v13-progress{height:8px;background:#222;border-radius:4px;overflow:hidden;margin-top:4px}' +
'.v13-progress-bar{height:100%;border-radius:4px;transition:width 0.4s}' +
'.v13-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}' +
'.v13-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all 0.2s;border:1px solid transparent}' +
'.v13-card:hover{border-color:#4a8;background:rgba(255,255,255,0.08)}' +
'.v13-card.active{border-color:#ffd700;background:rgba(255,215,0,0.08)}' +
'.v13-canvas-wrap{display:flex;justify-content:center;margin:10px 0}' +
'.v13-left-btns{position:fixed;left:4px;top:50%;transform:translateY(-50%);z-index:15;display:flex;flex-direction:column;gap:4px}' +
'.v13-left-btn{width:36px;height:36px;border-radius:10px;border:1.5px solid #4a8;background:rgba(26,26,46,0.85);color:#eee;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}' +
'.v13-left-btn:hover{background:#4a8;color:#fff;transform:scale(1.12)}' +
'.v13-scroll-nav{position:fixed;bottom:80px;left:0;right:0;z-index:12;display:flex;overflow-x:auto;gap:4px;padding:4px 8px;scrollbar-width:none}' +
'.v13-scroll-nav::-webkit-scrollbar{display:none}' +
'.v13-nav-btn{flex-shrink:0;padding:5px 12px;border-radius:16px;border:1px solid #4a8;background:rgba(26,26,46,0.85);color:#ccc;font-size:11px;cursor:pointer;white-space:nowrap}' +
'.v13-nav-btn:hover{background:#4a8;color:#fff}' +
'.v13-tag{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:bold;margin-left:6px}' +
'.v13-tag.green{background:#2a5;color:#fff}' +
'.v13-tag.red{background:#a33;color:#fff}' +
'.v13-tag.gold{background:#a80;color:#fff}';
document.head.appendChild(v13Style);

// ===================== DATA: ROYAL LIBRARY =====================
var LIBRARY_SCROLLS = [
    {id:'scroll_agriculture',icon:'🌾',name:'농업경전',desc:'관개수로와 이앙법의 비밀이 담긴 고문서',field:'agriculture',researchTime:3,bonus:{food:15},culture:10},
    {id:'scroll_warfare',icon:'⚔️',name:'병법서',desc:'손자병법을 참고한 한국식 전술 교본',field:'warfare',researchTime:4,bonus:{defense:20},culture:12},
    {id:'scroll_astronomy',icon:'🔭',name:'천문학서',desc:'첨성대의 관측 기록과 별자리 해석',field:'astronomy',researchTime:5,bonus:{culture:25},culture:15},
    {id:'scroll_medicine',icon:'💊',name:'의학서',desc:'동의보감에 기초한 전통 의학 지식',field:'medicine',researchTime:3,bonus:{happy:10},culture:10},
    {id:'scroll_engineering',icon:'🏗️',name:'건축공학서',desc:'수원 화성 축성의 기술적 비밀',field:'engineering',researchTime:4,bonus:{build:15},culture:12},
    {id:'scroll_literature',icon:'📝',name:'문학전집',desc:'향가부터 시조까지 한국 문학의 정수',field:'literature',researchTime:3,bonus:{culture:20},culture:14},
    {id:'scroll_law',icon:'⚖️',name:'법전',desc:'경국대전의 법률 체계와 통치 원리',field:'law',researchTime:4,bonus:{order:15},culture:11},
    {id:'scroll_trade',icon:'🧮',name:'상업서',desc:'개성상인의 복식부기와 교역 기술',field:'trade',researchTime:3,bonus:{gold:20},culture:10},
    {id:'scroll_philosophy',icon:'🧘',name:'철학서',desc:'율곡 이이의 성리학과 실학 사상',field:'philosophy',researchTime:5,bonus:{happy:15,culture:15},culture:18},
    {id:'scroll_navigation',icon:'🧭',name:'항해서',desc:'장보고의 해상 무역로와 항해 기술',field:'navigation',researchTime:4,bonus:{trade:20},culture:13},
    {id:'scroll_music',icon:'🎵',name:'악학궤범',desc:'조선 궁중음악과 아악의 악보 체계',field:'music',researchTime:3,bonus:{happy:12,culture:10},culture:12},
    {id:'scroll_geography',icon:'🗺️',name:'지리지',desc:'대동여지도의 측량법과 지리 정보',field:'geography',researchTime:4,bonus:{explore:15},culture:14}
];

// ===================== DATA: OCCUPATION SYSTEM =====================
var OCCUPATIONS = [
    {id:'farmer',icon:'👨‍🌾',name:'농부',desc:'식량을 생산하는 백성의 기본 직업',output:'food',rate:5,color:'#4caf50'},
    {id:'merchant',icon:'🧑‍💼',name:'상인',desc:'물자를 교역하여 금을 벌어들이는 상인',output:'gold',rate:3,color:'#ffd700'},
    {id:'soldier',icon:'⚔️',name:'군인',desc:'도시를 방어하고 치안을 유지하는 무인',output:'defense',rate:4,color:'#f44336'},
    {id:'scholar',icon:'📚',name:'학자',desc:'학문을 연구하고 기술을 발전시키는 선비',output:'culture',rate:3,color:'#2196f3'},
    {id:'artisan',icon:'🔨',name:'장인',desc:'건축과 공예품을 제작하는 숙련공',output:'build',rate:4,color:'#ff9800'},
    {id:'monk',icon:'🙏',name:'승려',desc:'사찰에서 기도하고 백성의 마음을 달래는 수도자',output:'happy',rate:3,color:'#9c27b0'},
    {id:'spy',icon:'🕵️',name:'첩자',desc:'적국에 잠입하여 정보를 수집하는 밀정',output:'intel',rate:2,color:'#607d8b'},
    {id:'healer',icon:'💉',name:'의원',desc:'백성의 질병을 치료하고 역병을 예방',output:'health',rate:3,color:'#00bcd4'}
];

// ===================== DATA: SPY NETWORK =====================
var SPY_NATIONS = [
    {id:'buyeo',name:'부여',icon:'🦌',difficulty:2,intel:'기마군단 훈련 동향',reward:{gold:30,intel:15}},
    {id:'han',name:'한나라',icon:'🐉',difficulty:4,intel:'한사군 군사 배치도',reward:{gold:50,intel:25}},
    {id:'ye',name:'예맥',icon:'🏔️',difficulty:2,intel:'철기 제조 기술 비밀',reward:{gold:25,intel:12}},
    {id:'okjeo',name:'옥저',icon:'🐟',difficulty:1,intel:'해산물 교역로 정보',reward:{gold:20,intel:10}},
    {id:'samhan',name:'삼한',icon:'🌾',difficulty:3,intel:'벼농사 신기술 정보',reward:{gold:35,intel:18}},
    {id:'wae',name:'왜',icon:'⛩️',difficulty:3,intel:'대마도 해적 동향 파악',reward:{gold:40,intel:20}}
];

// ===================== DATA: TRADE PORT =====================
var TRADE_GOODS = [
    {id:'silk',icon:'🧵',name:'비단',buyPrice:30,sellPrice:45,volatility:0.3},
    {id:'porcelain',icon:'🏺',name:'도자기',buyPrice:40,sellPrice:60,volatility:0.25},
    {id:'iron',icon:'⛏️',name:'철기',buyPrice:25,sellPrice:38,volatility:0.2},
    {id:'tea',icon:'🍵',name:'차',buyPrice:15,sellPrice:25,volatility:0.35},
    {id:'ginseng',icon:'🌿',name:'인삼',buyPrice:50,sellPrice:80,volatility:0.4},
    {id:'paper',icon:'📄',name:'한지',buyPrice:20,sellPrice:32,volatility:0.2},
    {id:'salt',icon:'🧂',name:'소금',buyPrice:10,sellPrice:18,volatility:0.15},
    {id:'jewelry',icon:'💎',name:'보석',buyPrice:80,sellPrice:120,volatility:0.5}
];

// ===================== DATA: PARKS/BEAUTIFICATION =====================
var PARKS = [
    {id:'garden_royal',icon:'🌺',name:'궁궐 정원',desc:'왕실 전용 아름다운 정원',cost:60,envBonus:15,happyBonus:10},
    {id:'park_bamboo',icon:'🎋',name:'대나무 숲',desc:'바람에 흔들리는 대나무 산책로',cost:35,envBonus:12,happyBonus:8},
    {id:'pond_lotus',icon:'🪷',name:'연꽃 연못',desc:'여름이면 연꽃이 만발하는 연못',cost:45,envBonus:14,happyBonus:9},
    {id:'park_pine',icon:'🌲',name:'소나무 공원',desc:'사계절 푸른 소나무 숲 산책로',cost:30,envBonus:10,happyBonus:7},
    {id:'garden_herb',icon:'🌱',name:'약초원',desc:'다양한 약초를 재배하는 치유의 정원',cost:40,envBonus:11,happyBonus:8},
    {id:'waterfall',icon:'🌊',name:'인공 폭포',desc:'시원한 물소리가 울려퍼지는 폭포',cost:55,envBonus:16,happyBonus:12},
    {id:'rock_garden',icon:'🪨',name:'석정원',desc:'자연석을 배치한 명상의 정원',cost:35,envBonus:10,happyBonus:9},
    {id:'cherry_road',icon:'🌸',name:'벚꽃길',desc:'봄이면 벚꽃이 흩날리는 산책길',cost:45,envBonus:13,happyBonus:11},
    {id:'moon_garden',icon:'🌙',name:'월하정원',desc:'달빛 아래 거니는 야간 정원',cost:50,envBonus:12,happyBonus:10},
    {id:'bird_sanctuary',icon:'🦢',name:'새 보호구역',desc:'학과 두루미가 찾아오는 습지 보호구',cost:40,envBonus:18,happyBonus:8}
];

// ===================== DATA: SUCCESSION =====================
var DYNASTY_KINGS = [
    {id:'king1',name:'환인',era:'건국이전',icon:'👑',trait:'개국시조',years:'BC 2333~'},
    {id:'king2',name:'환웅',era:'건국이전',icon:'🌤️',trait:'풍백우사운사',years:'천부인 시대'},
    {id:'king3',name:'단군왕검',era:'고조선',icon:'🏛️',trait:'건국왕',years:'BC 2333'},
    {id:'king4',name:'부루',era:'고조선',icon:'📜',trait:'법제정비',years:'BC 2200~'},
    {id:'king5',name:'구을',era:'고조선',icon:'⚔️',trait:'영토확장',years:'BC 2100~'},
    {id:'king6',name:'해모수',era:'부여',icon:'☀️',trait:'천제의아들',years:'BC 59'},
    {id:'king7',name:'금와왕',era:'부여',icon:'🐸',trait:'양자왕',years:'BC 48~'},
    {id:'king8',name:'주몽',era:'고구려',icon:'🏹',trait:'활의명수',years:'BC 37'},
    {id:'king9',name:'온조',era:'백제',icon:'🛡️',trait:'위례성건국',years:'BC 18'},
    {id:'king10',name:'혁거세',era:'신라',icon:'🥚',trait:'알에서탄생',years:'BC 57'},
    {id:'king11',name:'수로왕',era:'가야',icon:'🐢',trait:'김해건국',years:'AD 42'},
    {id:'king12',name:'근초고왕',era:'백제',icon:'🗡️',trait:'전성기',years:'AD 346~375'}
];

// ===================== DATA: RELIGION =====================
var RELIGIONS = [
    {id:'shamanism',icon:'🔮',name:'무속신앙',desc:'산신과 천신에게 제사를 올리는 토착 신앙',faithBonus:8,happyBonus:5,cost:25},
    {id:'buddhism',icon:'☸️',name:'불교',desc:'석가모니의 가르침을 따르는 수행의 길',faithBonus:15,happyBonus:10,cost:50},
    {id:'confucianism',icon:'📖',name:'유교',desc:'공자의 가르침에 따른 예와 인의 도덕',faithBonus:12,happyBonus:8,cost:40},
    {id:'taoism',icon:'☯️',name:'도교',desc:'노자와 장자의 자연과 조화의 사상',faithBonus:10,happyBonus:7,cost:35},
    {id:'ancestor',icon:'🕯️',name:'조상숭배',desc:'선조의 영혼을 모시고 제사를 올리는 전통',faithBonus:6,happyBonus:6,cost:20},
    {id:'nature',icon:'🌳',name:'자연숭배',desc:'산천초목과 바위에 깃든 영의 숭배',faithBonus:7,happyBonus:5,cost:15}
];

// ===================== DATA: QUIZ =====================
var V13_QUIZ = [
    {q:'고조선의 팔조법금 중 현재 전해지는 조항은 몇 개인가?',a:['3개','5개','8개','2개'],c:0},
    {q:'개성상인이 사용한 회계 기법의 이름은?',a:['사개송도치부법','삼식부기','오행회계법','팔도장부법'],c:0},
    {q:'첨성대가 위치한 도시는?',a:['경주','공주','부여','평양'],c:0},
    {q:'동의보감을 저술한 인물은?',a:['허준','이제마','장중경','이천'],c:0},
    {q:'경국대전을 완성한 왕은?',a:['성종','세종','태종','세조'],c:0},
    {q:'대동여지도를 제작한 인물은?',a:['김정호','정상기','양성지','이회'],c:0},
    {q:'장보고가 세운 해상 무역 기지의 이름은?',a:['청해진','탐라진','한산진','삼별초진'],c:0},
    {q:'한국 최초의 금속활자 인쇄본은?',a:['직지심체요절','무구정광대다라니경','팔만대장경','삼국사기'],c:0},
    {q:'조선시대 과거시험의 최종 단계는?',a:['전시','회시','향시','별시'],c:0},
    {q:'수원 화성 축성에 사용된 건설 장비는?',a:['거중기','수차','돌확','도르래'],c:0},
    {q:'악학궤범은 어떤 분야의 서적인가?',a:['음악','의학','농업','천문학'],c:0},
    {q:'고려시대 국제 무역항은?',a:['벽란도','강화도','울산항','당항성'],c:0},
    {q:'삼국시대 불교를 최초로 수용한 나라는?',a:['고구려','백제','신라','가야'],c:0},
    {q:'조선 성리학의 대표적 논쟁인 사단칠정론의 주요 학자는?',a:['이황과 기대승','이이와 성혼','정약용과 정약전','이제마와 허준'],c:0},
    {q:'고조선의 수도는?',a:['왕검성','위례성','금성','평양성'],c:0}
];

// ===================== DATA: ACHIEVEMENTS =====================
var V13_ACHIEVEMENTS = [
    {id:'v13_librarian',icon:'📚',name:'왕실 도서관장',desc:'3개 이상의 고문서를 연구 완료',check:function(){return countResearched()>=3;}},
    {id:'v13_library_master',icon:'🏛️',name:'학문의 대가',desc:'모든 고문서 12종을 연구 완료',check:function(){return countResearched()>=12;}},
    {id:'v13_employer',icon:'👥',name:'인사 관리관',desc:'직업 3종 이상에 인원 배치',check:function(){return countAssignedJobs()>=3;}},
    {id:'v13_spy_master',icon:'🕵️',name:'첩보 총사령관',desc:'3국 이상에 첩보원 파견 완료',check:function(){return countSpySent()>=3;}},
    {id:'v13_trader',icon:'💰',name:'국제 무역왕',desc:'교역으로 총 200골드 이상 수익',check:function(){return v13State.tradeProfit>=200;}},
    {id:'v13_green_city',icon:'🌿',name:'녹색 도시',desc:'공원/정원 5곳 이상 건설',check:function(){return countParksBuilt()>=5;}},
    {id:'v13_env_master',icon:'🌍',name:'환경 수호자',desc:'환경지수 80 이상 달성',check:function(){return calcEnvIndex()>=80;}},
    {id:'v13_dynasty',icon:'👑',name:'왕조 계승',desc:'2대 이상 왕위 계승 진행',check:function(){return v13State.successionCount>=2;}},
    {id:'v13_rebel_suppress',icon:'🛡️',name:'반란 진압관',desc:'반란 2회 이상 성공적으로 진압',check:function(){return v13State.rebellionsSuppressed>=2;}},
    {id:'v13_devout',icon:'🙏',name:'독실한 신앙인',desc:'종교 시설 3곳 이상 건립',check:function(){return countTemplesBuilt()>=3;}},
    {id:'v13_quiz_v13',icon:'❓',name:'v13 퀴즈 도전자',desc:'v13 퀴즈 문제를 1회 이상 정답',check:function(){return v13State.quizCorrect>=1;}},
    {id:'v13_explorer',icon:'🌟',name:'v13 탐험가',desc:'v13의 8개 기능 모두 1회 이상 열기',check:function(){return countV13Features()>=8;}}
];

// ===================== STATE =====================
var v13State = {
    scrollResearch: {},
    scrollProgress: {},
    occupations: {},
    spySent: {},
    spyCooldown: {},
    tradeHistory: [],
    tradeProfit: 0,
    parksBuilt: {},
    envIndex: 50,
    successionIndex: 0,
    successionCount: 0,
    rebellionsSuppressed: 0,
    rebellionActive: false,
    temples: {},
    faithLevel: 0,
    features: {},
    quizCorrect: 0
};

function countResearched() {
    var c = 0;
    for(var k in v13State.scrollResearch) { if(v13State.scrollResearch[k]) c++; }
    return c;
}
function countAssignedJobs() {
    var c = 0;
    for(var k in v13State.occupations) { if(v13State.occupations[k] > 0) c++; }
    return c;
}
function countSpySent() {
    var c = 0;
    for(var k in v13State.spySent) { if(v13State.spySent[k]) c++; }
    return c;
}
function countParksBuilt() {
    var c = 0;
    for(var k in v13State.parksBuilt) { if(v13State.parksBuilt[k]) c++; }
    return c;
}
function countTemplesBuilt() {
    var c = 0;
    for(var k in v13State.temples) { if(v13State.temples[k]) c++; }
    return c;
}
function countV13Features() {
    var c = 0;
    for(var k in v13State.features) { if(v13State.features[k]) c++; }
    return c;
}
function calcEnvIndex() {
    var base = 50;
    for(var k in v13State.parksBuilt) {
        if(v13State.parksBuilt[k]) {
            var p = PARKS.find(function(x){return x.id===k;});
            if(p) base += p.envBonus;
        }
    }
    return Math.min(100, base);
}

// ===================== ROYAL LIBRARY PANEL =====================
function openLibraryPanel() {
    playV13SFX('feature_open13');
    v13State.features.library = true;
    var html = '<div id="library-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>📚 왕실 도서관</h2>';
    html += '<div class="v13-stat"><span>연구 완료</span><span class="v13-stat-val">' + countResearched() + ' / 12</span></div>';

    var canvasId = 'lib-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="460" height="200"></canvas></div>';

    html += '<div class="v13-section"><h3>고문서 목록</h3>';
    LIBRARY_SCROLLS.forEach(function(s) {
        var done = v13State.scrollResearch[s.id];
        var prog = v13State.scrollProgress[s.id] || 0;
        var pct = done ? 100 : Math.round((prog / s.researchTime) * 100);
        html += '<div class="v13-item" onclick="researchScroll(\'' + s.id + '\')">';
        html += '<span class="v13-item-icon">' + s.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + s.name;
        if(done) html += '<span class="v13-tag green">완료</span>';
        html += '</div>';
        html += '<div class="v13-item-desc">' + s.desc + '</div>';
        html += '<div class="v13-item-cost">연구 기간: ' + s.researchTime + '턴 | 문화 +' + s.culture + '</div>';
        html += '<div class="v13-progress"><div class="v13-progress-bar" style="width:' + pct + '%;background:linear-gradient(90deg,#4a8,#7cf)"></div></div>';
        html += '</div>';
        if(!done) html += '<button class="v13-btn" onclick="event.stopPropagation();researchScroll(\'' + s.id + '\')">연구</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px;">✓</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawLibraryCanvas(canvasId); }, 100);
}

function drawLibraryCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('고문서 연구 진행률', W/2, 18);

    var barW = 30, gap = 6;
    var startX = (W - (LIBRARY_SCROLLS.length * (barW + gap))) / 2;
    LIBRARY_SCROLLS.forEach(function(s, i) {
        var done = v13State.scrollResearch[s.id];
        var prog = v13State.scrollProgress[s.id] || 0;
        var pct = done ? 1 : prog / s.researchTime;
        var x = startX + i * (barW + gap);
        var barH = 120;
        var fillH = barH * pct;

        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(x, 40, barW, barH);

        var grd = ctx.createLinearGradient(x, 40 + barH - fillH, x, 40 + barH);
        grd.addColorStop(0, done ? '#4a8' : '#385');
        grd.addColorStop(1, done ? '#7cf' : '#4a8');
        ctx.fillStyle = grd;
        ctx.fillRect(x, 40 + barH - fillH, barW, fillH);

        ctx.fillStyle = '#aaa';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.icon, x + barW/2, 40 + barH + 18);

        ctx.fillStyle = done ? '#4a8' : '#888';
        ctx.font = '9px sans-serif';
        ctx.fillText(Math.round(pct*100) + '%', x + barW/2, 40 + barH + 32);
    });
}

function researchScroll(id) {
    var s = LIBRARY_SCROLLS.find(function(x){return x.id===id;});
    if(!s || v13State.scrollResearch[id]) return;
    if(!v13State.scrollProgress[id]) v13State.scrollProgress[id] = 0;
    v13State.scrollProgress[id]++;
    if(v13State.scrollProgress[id] >= s.researchTime) {
        v13State.scrollResearch[id] = true;
        if(typeof resources !== 'undefined') {
            if(s.bonus.food) resources.food += s.bonus.food;
            if(s.bonus.gold) resources.gold += s.bonus.gold;
            if(s.bonus.culture) resources.culture = (resources.culture||0) + s.bonus.culture;
            if(s.bonus.happy) resources.happy = (resources.happy||0) + s.bonus.happy;
        }
        playV13SFX('library_study');
        if(typeof toast === 'function') toast('📚 ' + s.name + ' 연구 완료! 문화 +' + s.culture);
        if(typeof addChronicle === 'function') addChronicle(s.icon, s.name + '의 연구가 완료되었습니다!');
    } else {
        playV13SFX('feature_open13');
        if(typeof toast === 'function') toast('📚 ' + s.name + ' 연구 중... (' + v13State.scrollProgress[id] + '/' + s.researchTime + ')');
    }
    saveV13State();
    var panel = document.getElementById('library-panel');
    if(panel) { panel.remove(); openLibraryPanel(); }
}

// ===================== OCCUPATION SYSTEM =====================
function openOccupationPanel() {
    playV13SFX('feature_open13');
    v13State.features.occupation = true;
    var totalPop = typeof resources !== 'undefined' ? (resources.pop || 100) : 100;
    var assigned = 0;
    for(var k in v13State.occupations) assigned += (v13State.occupations[k] || 0);
    var unassigned = Math.max(0, totalPop - assigned);

    var html = '<div id="occ-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>👥 직업 배분 시스템</h2>';
    html += '<div class="v13-stat"><span>총 인구</span><span class="v13-stat-val">' + totalPop + '</span></div>';
    html += '<div class="v13-stat"><span>미배치 인원</span><span class="v13-stat-val">' + unassigned + '</span></div>';

    var canvasId = 'occ-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="300" height="300"></canvas></div>';

    html += '<div class="v13-section"><h3>직업 목록</h3>';
    OCCUPATIONS.forEach(function(occ) {
        var count = v13State.occupations[occ.id] || 0;
        html += '<div class="v13-item">';
        html += '<span class="v13-item-icon">' + occ.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + occ.name + ' <span style="color:#7cf;font-size:11px;">(' + count + '명)</span></div>';
        html += '<div class="v13-item-desc">' + occ.desc + '</div>';
        html += '<div class="v13-item-cost">생산: ' + occ.output + ' +' + occ.rate + '/턴/인</div></div>';
        html += '<div style="display:flex;gap:4px">';
        html += '<button class="v13-btn" onclick="assignOccupation(\'' + occ.id + '\',-5)">-5</button>';
        html += '<button class="v13-btn" onclick="assignOccupation(\'' + occ.id + '\',5)">+5</button>';
        html += '</div></div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawOccupationPie(canvasId); }, 100);
}

function drawOccupationPie(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    var cx = W/2, cy = H/2, radius = 100;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);

    var totalPop = typeof resources !== 'undefined' ? (resources.pop || 100) : 100;
    var assigned = 0;
    var slices = [];
    OCCUPATIONS.forEach(function(occ) {
        var count = v13State.occupations[occ.id] || 0;
        assigned += count;
        if(count > 0) slices.push({name:occ.name, count:count, color:occ.color, icon:occ.icon});
    });
    var unassigned = Math.max(0, totalPop - assigned);
    if(unassigned > 0) slices.push({name:'미배치', count:unassigned, color:'#555', icon:'❓'});

    var total = slices.reduce(function(s,x){return s+x.count;},0);
    if(total === 0) {
        ctx.fillStyle = '#888';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('인구를 직업에 배치하세요', cx, cy);
        return;
    }

    var startAngle = -Math.PI/2;
    slices.forEach(function(sl) {
        var sliceAngle = (sl.count / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = sl.color;
        ctx.fill();
        ctx.strokeStyle = '#0d1520';
        ctx.lineWidth = 2;
        ctx.stroke();

        var midAngle = startAngle + sliceAngle / 2;
        var labelR = radius * 0.65;
        var lx = cx + Math.cos(midAngle) * labelR;
        var ly = cy + Math.sin(midAngle) * labelR;
        if(sliceAngle > 0.3) {
            ctx.fillStyle = '#fff';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sl.icon, lx, ly - 6);
            ctx.font = '9px sans-serif';
            ctx.fillText(Math.round(sl.count/total*100) + '%', lx, ly + 8);
        }
        startAngle += sliceAngle;
    });

    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('직업 분포도', cx, 8);
}

function assignOccupation(id, delta) {
    var totalPop = typeof resources !== 'undefined' ? (resources.pop || 100) : 100;
    var cur = v13State.occupations[id] || 0;
    var newVal = cur + delta;
    if(newVal < 0) newVal = 0;
    var assigned = 0;
    for(var k in v13State.occupations) { if(k !== id) assigned += (v13State.occupations[k] || 0); }
    if(assigned + newVal > totalPop) {
        newVal = totalPop - assigned;
    }
    v13State.occupations[id] = newVal;
    playV13SFX('occupation_assign');
    saveV13State();
    var panel = document.getElementById('occ-panel');
    if(panel) { panel.remove(); openOccupationPanel(); }
}

// ===================== SPY NETWORK =====================
function openSpyPanel() {
    playV13SFX('feature_open13');
    v13State.features.spy = true;
    var html = '<div id="spy-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>🕵️ 첩보원 네트워크</h2>';
    html += '<div class="v13-stat"><span>파견 완료</span><span class="v13-stat-val">' + countSpySent() + ' / 6</span></div>';

    var canvasId = 'spy-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="460" height="260"></canvas></div>';

    html += '<div class="v13-section"><h3>파견 가능 대상국</h3>';
    SPY_NATIONS.forEach(function(n) {
        var sent = v13State.spySent[n.id];
        var cd = v13State.spyCooldown[n.id] || 0;
        html += '<div class="v13-item">';
        html += '<span class="v13-item-icon">' + n.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + n.name;
        if(sent) html += '<span class="v13-tag green">정보 획득</span>';
        else if(cd > 0) html += '<span class="v13-tag red">쿨다운 ' + cd + '턴</span>';
        html += '</div>';
        html += '<div class="v13-item-desc">' + n.intel + '</div>';
        html += '<div class="v13-item-cost">난이도: ★' + n.difficulty + ' | 보상: 금 ' + n.reward.gold + '</div></div>';
        if(!sent && cd <= 0) html += '<button class="v13-btn" onclick="event.stopPropagation();dispatchSpy(\'' + n.id + '\')">파견</button>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawSpyCanvas(canvasId); }, 100);
}

function drawSpyCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0a0f18';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('첩보 네트워크 현황', W/2, 18);

    var cx = W/2, cy = H/2 + 10, r = 80;
    ctx.beginPath();
    ctx.arc(cx, cy, r+5, 0, Math.PI*2);
    ctx.strokeStyle = '#2a3a4a';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd700';
    ctx.font = '20px sans-serif';
    ctx.fillText('🏛️', cx, cy + 6);
    ctx.fillStyle = '#aaa';
    ctx.font = '9px sans-serif';
    ctx.fillText('고조선', cx, cy + 22);

    SPY_NATIONS.forEach(function(n, i) {
        var angle = (i / SPY_NATIONS.length) * Math.PI * 2 - Math.PI/2;
        var nx = cx + Math.cos(angle) * (r + 30);
        var ny = cy + Math.sin(angle) * (r + 30);
        var sent = v13State.spySent[n.id];

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = sent ? '#4a8' : '#334';
        ctx.lineWidth = sent ? 2 : 1;
        if(!sent) ctx.setLineDash([4,4]);
        else ctx.setLineDash([]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = sent ? '#4a8' : '#445';
        ctx.beginPath();
        ctx.arc(nx, ny, 18, 0, Math.PI*2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.icon, nx, ny);

        ctx.fillStyle = '#ccc';
        ctx.font = '9px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(n.name, nx, ny + 22);
    });
}

function dispatchSpy(id) {
    var n = SPY_NATIONS.find(function(x){return x.id===id;});
    if(!n || v13State.spySent[id]) return;
    if(v13State.spyCooldown[id] && v13State.spyCooldown[id] > 0) {
        if(typeof toast === 'function') toast('쿨다운 중입니다. ' + v13State.spyCooldown[id] + '턴 남음');
        return;
    }
    var successRate = Math.max(0.3, 1 - n.difficulty * 0.15);
    var success = Math.random() < successRate;
    if(success) {
        v13State.spySent[id] = true;
        if(typeof resources !== 'undefined') resources.gold += n.reward.gold;
        playV13SFX('spy_report');
        if(typeof toast === 'function') toast('🕵️ ' + n.name + ' 첩보 성공! 금 +' + n.reward.gold);
        if(typeof addChronicle === 'function') addChronicle('🕵️', n.name + '에서 귀중한 정보를 입수했습니다: ' + n.intel);
    } else {
        v13State.spyCooldown[id] = 3;
        playV13SFX('spy_dispatch');
        if(typeof toast === 'function') toast('🕵️ ' + n.name + ' 첩보 실패... 3턴 후 재시도');
    }
    saveV13State();
    var panel = document.getElementById('spy-panel');
    if(panel) { panel.remove(); openSpyPanel(); }
}

// ===================== TRADE PORT =====================
function openTradePanel() {
    playV13SFX('feature_open13');
    v13State.features.trade = true;
    var html = '<div id="trade-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>⚓ 국제 교역항</h2>';
    html += '<div class="v13-stat"><span>총 교역 수익</span><span class="v13-stat-val">' + v13State.tradeProfit + ' 금</span></div>';

    var canvasId = 'trade-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="460" height="200"></canvas></div>';

    html += '<div class="v13-section"><h3>교역품 시세</h3>';
    html += '<div class="v13-grid">';
    TRADE_GOODS.forEach(function(g) {
        var priceVar = Math.round((Math.random() - 0.5) * 2 * g.volatility * g.buyPrice);
        var curBuy = g.buyPrice + priceVar;
        var curSell = Math.round(g.sellPrice + priceVar * 0.8);
        html += '<div class="v13-card">';
        html += '<div style="font-size:28px">' + g.icon + '</div>';
        html += '<div style="font-weight:bold;font-size:12px;color:#dde">' + g.name + '</div>';
        html += '<div style="font-size:10px;color:#f88">매입: ' + curBuy + '금</div>';
        html += '<div style="font-size:10px;color:#8f8">매출: ' + curSell + '금</div>';
        html += '<div style="display:flex;gap:4px;justify-content:center;margin-top:4px">';
        html += '<button class="v13-btn" style="font-size:10px;padding:3px 8px" onclick="executeTrade(\'' + g.id + '\',\'buy\',' + curBuy + ')">매입</button>';
        html += '<button class="v13-btn" style="font-size:10px;padding:3px 8px;background:linear-gradient(135deg,#a54,#854)" onclick="executeTrade(\'' + g.id + '\',\'sell\',' + curSell + ')">매출</button>';
        html += '</div></div>';
    });
    html += '</div></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawTradeCanvas(canvasId); }, 100);
}

function drawTradeCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('교역 수익 추이', W/2, 18);

    var history = v13State.tradeHistory.slice(-20);
    if(history.length < 2) {
        ctx.fillStyle = '#888';
        ctx.font = '12px sans-serif';
        ctx.fillText('교역을 시작하면 그래프가 표시됩니다', W/2, H/2);
        return;
    }

    var maxVal = Math.max.apply(null, history.map(function(h){return Math.abs(h);}));
    if(maxVal === 0) maxVal = 1;
    var graphX = 40, graphW = W - 60, graphY = 35, graphH = H - 55;
    var zeroY = graphY + graphH / 2;

    ctx.strokeStyle = '#334';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(graphX, zeroY);
    ctx.lineTo(graphX + graphW, zeroY);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#4a8';
    ctx.lineWidth = 2;
    history.forEach(function(val, i) {
        var x = graphX + (i / (history.length - 1)) * graphW;
        var y = zeroY - (val / maxVal) * (graphH / 2);
        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    history.forEach(function(val, i) {
        var x = graphX + (i / (history.length - 1)) * graphW;
        var y = zeroY - (val / maxVal) * (graphH / 2);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2);
        ctx.fillStyle = val >= 0 ? '#4a8' : '#f55';
        ctx.fill();
    });

    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('+' + maxVal, graphX - 35, graphY + 10);
    ctx.fillText('-' + maxVal, graphX - 35, graphY + graphH - 2);
    ctx.fillText('0', graphX - 15, zeroY + 3);
}

function executeTrade(goodId, action, price) {
    if(typeof resources === 'undefined') return;
    if(action === 'buy') {
        if(resources.gold < price) {
            if(typeof toast === 'function') toast('금이 부족합니다!');
            return;
        }
        resources.gold -= price;
        v13State.tradeHistory.push(-price);
        playV13SFX('trade_deal');
        if(typeof toast === 'function') toast('⚓ 매입 완료! -' + price + '금');
    } else {
        resources.gold += price;
        v13State.tradeProfit += price;
        v13State.tradeHistory.push(price);
        playV13SFX('trade_deal');
        if(typeof toast === 'function') toast('⚓ 매출 완료! +' + price + '금');
    }
    if(v13State.tradeHistory.length > 50) v13State.tradeHistory = v13State.tradeHistory.slice(-50);
    saveV13State();
    var panel = document.getElementById('trade-panel');
    if(panel) { panel.remove(); openTradePanel(); }
}

// ===================== BEAUTIFICATION / PARKS =====================
function openParkPanel() {
    playV13SFX('feature_open13');
    v13State.features.park = true;
    var envIdx = calcEnvIndex();
    var grade = envIdx >= 90 ? 'S' : envIdx >= 75 ? 'A' : envIdx >= 60 ? 'B' : envIdx >= 40 ? 'C' : 'D';

    var html = '<div id="park-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>🌿 도시 미화 & 환경</h2>';
    html += '<div class="v13-stat"><span>환경지수</span><span class="v13-stat-val">' + envIdx + '/100 (' + grade + '등급)</span></div>';
    html += '<div class="v13-stat"><span>건설 완료</span><span class="v13-stat-val">' + countParksBuilt() + ' / 10</span></div>';

    var canvasId = 'park-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="460" height="180"></canvas></div>';

    html += '<div class="v13-section"><h3>건설 가능 공원/정원</h3>';
    PARKS.forEach(function(p) {
        var built = v13State.parksBuilt[p.id];
        html += '<div class="v13-item">';
        html += '<span class="v13-item-icon">' + p.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + p.name;
        if(built) html += '<span class="v13-tag green">건설됨</span>';
        html += '</div>';
        html += '<div class="v13-item-desc">' + p.desc + '</div>';
        html += '<div class="v13-item-cost">비용: ' + p.cost + '금 | 환경 +' + p.envBonus + ' | 행복 +' + p.happyBonus + '</div></div>';
        if(!built) html += '<button class="v13-btn" onclick="event.stopPropagation();buildPark(\'' + p.id + '\')">건설</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px;">✓</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawParkCanvas(canvasId, envIdx, grade); }, 100);
}

function drawParkCanvas(canvasId, envIdx, grade) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('환경지수 대시보드', W/2, 18);

    var cx = 100, cy = H/2 + 10, r = 55;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = '#1a2a3a';
    ctx.lineWidth = 12;
    ctx.stroke();

    var endAngle = -Math.PI/2 + (envIdx/100) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI/2, endAngle);
    var gColor = envIdx >= 75 ? '#4a8' : envIdx >= 50 ? '#fa0' : '#f55';
    ctx.strokeStyle = gColor;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.lineCap = 'butt';

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(envIdx, cx, cy + 2);
    ctx.fillStyle = gColor;
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(grade + '등급', cx, cy + 22);

    var startX = 200;
    PARKS.forEach(function(p, i) {
        var built = v13State.parksBuilt[p.id];
        var x = startX + (i % 5) * 50;
        var y = 40 + Math.floor(i / 5) * 70;
        ctx.fillStyle = built ? 'rgba(74,170,136,0.3)' : 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI*2);
        ctx.fill();
        if(built) {
            ctx.strokeStyle = '#4a8';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.icon, x, y);
    });
}

function buildPark(id) {
    var p = PARKS.find(function(x){return x.id===id;});
    if(!p || v13State.parksBuilt[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < p.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + p.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') {
        resources.gold -= p.cost;
        resources.happy = (resources.happy || 0) + p.happyBonus;
    }
    v13State.parksBuilt[id] = true;
    playV13SFX('park_build');
    if(typeof toast === 'function') toast('🌿 ' + p.name + ' 건설 완료! 환경 +' + p.envBonus);
    if(typeof addChronicle === 'function') addChronicle(p.icon, p.name + '이(가) 건설되어 도시 환경이 개선되었습니다.');
    saveV13State();
    var panel = document.getElementById('park-panel');
    if(panel) { panel.remove(); openParkPanel(); }
}

// ===================== ROYAL SUCCESSION =====================
function openSuccessionPanel() {
    playV13SFX('feature_open13');
    v13State.features.succession = true;
    var curIdx = v13State.successionIndex;
    var curKing = DYNASTY_KINGS[curIdx] || DYNASTY_KINGS[0];

    var html = '<div id="succ-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>👑 왕위 계승 시스템</h2>';
    html += '<div class="v13-stat"><span>현재 왕</span><span class="v13-stat-val">' + curKing.icon + ' ' + curKing.name + '</span></div>';
    html += '<div class="v13-stat"><span>계승 횟수</span><span class="v13-stat-val">' + v13State.successionCount + '대</span></div>';

    var canvasId = 'succ-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="460" height="250"></canvas></div>';

    html += '<div class="v13-section"><h3>왕조 계보</h3>';
    DYNASTY_KINGS.forEach(function(king, i) {
        var isCurrent = i === curIdx;
        var isPast = i < curIdx;
        html += '<div class="v13-item" style="' + (isCurrent ? 'border:1px solid #ffd700;background:rgba(255,215,0,0.08)' : '') + '">';
        html += '<span class="v13-item-icon">' + king.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + king.name;
        if(isCurrent) html += '<span class="v13-tag gold">현재</span>';
        else if(isPast) html += '<span class="v13-tag green">지남</span>';
        html += '</div>';
        html += '<div class="v13-item-desc">' + king.era + ' | ' + king.trait + ' | ' + king.years + '</div></div>';
        if(isCurrent && i < DYNASTY_KINGS.length - 1) {
            html += '<button class="v13-btn" onclick="event.stopPropagation();succeedThrone()">계승</button>';
        }
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawSuccessionCanvas(canvasId, curIdx); }, 100);
}

function drawSuccessionCanvas(canvasId, curIdx) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('왕조 계보 트리', W/2, 18);

    var nodeR = 18;
    var cols = 4;
    var rows = Math.ceil(DYNASTY_KINGS.length / cols);
    var gapX = (W - 40) / cols;
    var gapY = (H - 50) / rows;
    var startX = 40 + gapX / 2;
    var startY = 45;

    DYNASTY_KINGS.forEach(function(king, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var x = startX + col * gapX;
        var y = startY + row * gapY;
        var isCurrent = i === curIdx;
        var isPast = i < curIdx;

        if(i > 0) {
            var prevCol = (i-1) % cols;
            var prevRow = Math.floor((i-1) / cols);
            var px = startX + prevCol * gapX;
            var py = startY + prevRow * gapY;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isPast ? '#4a8' : '#334';
            ctx.lineWidth = isPast ? 2 : 1;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI*2);
        ctx.fillStyle = isCurrent ? '#ffd700' : isPast ? '#4a8' : '#2a3a4a';
        ctx.fill();
        if(isCurrent) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(king.icon, x, y);

        ctx.fillStyle = isCurrent ? '#ffd700' : '#aaa';
        ctx.font = '8px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(king.name, x, y + nodeR + 3);
    });
}

function succeedThrone() {
    if(v13State.successionIndex >= DYNASTY_KINGS.length - 1) {
        if(typeof toast === 'function') toast('마지막 왕입니다.');
        return;
    }
    v13State.successionIndex++;
    v13State.successionCount++;
    var newKing = DYNASTY_KINGS[v13State.successionIndex];
    playV13SFX('succession_event');
    if(typeof toast === 'function') toast('👑 ' + newKing.name + ' 즉위! ' + newKing.era + ' 시대');
    if(typeof addChronicle === 'function') addChronicle('👑', newKing.name + '이(가) 새 왕으로 즉위했습니다. ' + newKing.trait);
    if(typeof resources !== 'undefined') {
        resources.happy = (resources.happy || 0) + 10;
        resources.gold += 30;
    }
    saveV13State();
    var panel = document.getElementById('succ-panel');
    if(panel) { panel.remove(); openSuccessionPanel(); }
}

// ===================== REBELLION SYSTEM =====================
function openRebellionPanel() {
    playV13SFX('feature_open13');
    v13State.features.rebellion = true;
    var morale = typeof resources !== 'undefined' ? Math.min(100, Math.max(0, (resources.happy || 50))) : 50;
    var riskLevel = morale < 20 ? '위험' : morale < 40 ? '경고' : morale < 60 ? '주의' : '안전';
    var riskColor = morale < 20 ? '#f33' : morale < 40 ? '#fa0' : morale < 60 ? '#ff0' : '#4a8';

    var html = '<div id="rebel-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>⚡ 민란 & 반란 관리</h2>';
    html += '<div class="v13-stat"><span>민심 수준</span><span class="v13-stat-val" style="color:' + riskColor + '">' + morale + ' (' + riskLevel + ')</span></div>';
    html += '<div class="v13-stat"><span>진압 횟수</span><span class="v13-stat-val">' + v13State.rebellionsSuppressed + '</span></div>';

    html += '<div class="v13-progress" style="margin:10px 0"><div class="v13-progress-bar" style="width:' + morale + '%;background:linear-gradient(90deg,' + riskColor + ',#4a8)"></div></div>';

    if(v13State.rebellionActive) {
        html += '<div style="text-align:center;padding:15px;background:rgba(255,50,50,0.15);border-radius:10px;margin:10px 0">';
        html += '<div style="font-size:36px">⚔️</div>';
        html += '<div style="color:#f88;font-weight:bold;font-size:16px">반란 발생!</div>';
        html += '<div style="color:#aaa;font-size:12px;margin:6px 0">백성이 불만을 품고 봉기했습니다.</div>';
        html += '<button class="v13-btn" style="margin-top:8px" onclick="suppressRebellion()">진압 (금 50)</button>';
        html += '<button class="v13-btn" style="margin-top:8px;margin-left:8px;background:linear-gradient(135deg,#85a,#548)" onclick="negotiateRebellion()">협상 (식량 30)</button>';
        html += '</div>';
    } else {
        html += '<div style="text-align:center;padding:10px;color:#888;font-size:12px">현재 반란 없음. 민심이 20 이하로 떨어지면 반란 위험!</div>';
    }

    html += '<div class="v13-section"><h3>민심 향상 방법</h3>';
    var tips = [
        {icon:'🌾',text:'식량 공급 안정화 — 농업 투자',effect:'+5 민심'},
        {icon:'🎉',text:'축제 개최 — 백성의 기쁨',effect:'+10 민심'},
        {icon:'📜',text:'세금 감면 칙서 발포',effect:'+8 민심'},
        {icon:'🌿',text:'공원/정원 건설 — 환경 개선',effect:'+7 민심'},
        {icon:'🙏',text:'종교 시설 건립 — 신앙의 힘',effect:'+6 민심'}
    ];
    tips.forEach(function(t) {
        html += '<div class="v13-item"><span class="v13-item-icon">' + t.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + t.text + '</div>';
        html += '<div class="v13-item-cost">' + t.effect + '</div></div></div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function suppressRebellion() {
    if(!v13State.rebellionActive) return;
    if(typeof resources !== 'undefined' && resources.gold < 50) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: 50)');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= 50;
    v13State.rebellionActive = false;
    v13State.rebellionsSuppressed++;
    if(typeof resources !== 'undefined') resources.happy = (resources.happy || 0) + 15;
    playV13SFX('rebellion_suppress');
    if(typeof toast === 'function') toast('🛡️ 반란 진압 완료! 민심 회복');
    if(typeof addChronicle === 'function') addChronicle('⚔️', '반란이 무력으로 진압되었습니다.');
    saveV13State();
    var panel = document.getElementById('rebel-panel');
    if(panel) { panel.remove(); openRebellionPanel(); }
}

function negotiateRebellion() {
    if(!v13State.rebellionActive) return;
    if(typeof resources !== 'undefined' && resources.food < 30) {
        if(typeof toast === 'function') toast('식량이 부족합니다! (필요: 30)');
        return;
    }
    if(typeof resources !== 'undefined') resources.food -= 30;
    v13State.rebellionActive = false;
    v13State.rebellionsSuppressed++;
    if(typeof resources !== 'undefined') resources.happy = (resources.happy || 0) + 25;
    playV13SFX('succession_event');
    if(typeof toast === 'function') toast('🤝 협상 성공! 민심 대폭 회복');
    if(typeof addChronicle === 'function') addChronicle('🤝', '백성과 협상하여 반란이 평화롭게 해결되었습니다.');
    saveV13State();
    var panel = document.getElementById('rebel-panel');
    if(panel) { panel.remove(); openRebellionPanel(); }
}

// ===================== RELIGION SYSTEM =====================
function openReligionPanel() {
    playV13SFX('feature_open13');
    v13State.features.religion = true;
    var faithLvl = v13State.faithLevel;
    var grade = faithLvl >= 50 ? 'S' : faithLvl >= 35 ? 'A' : faithLvl >= 20 ? 'B' : faithLvl >= 10 ? 'C' : 'D';

    var html = '<div id="relig-panel" class="v13-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v13-box"><button class="v13-close" onclick="this.closest(\'.v13-overlay\').remove()">&times;</button>';
    html += '<h2>🙏 종교 & 신앙 시스템</h2>';
    html += '<div class="v13-stat"><span>신앙 수준</span><span class="v13-stat-val">' + faithLvl + ' (' + grade + '등급)</span></div>';
    html += '<div class="v13-stat"><span>건립 완료</span><span class="v13-stat-val">' + countTemplesBuilt() + ' / 6</span></div>';

    var canvasId = 'relig-canvas-' + Date.now();
    html += '<div class="v13-canvas-wrap"><canvas id="' + canvasId + '" width="400" height="280"></canvas></div>';

    html += '<div class="v13-section"><h3>종교 시설</h3>';
    RELIGIONS.forEach(function(r) {
        var built = v13State.temples[r.id];
        html += '<div class="v13-item">';
        html += '<span class="v13-item-icon">' + r.icon + '</span>';
        html += '<div class="v13-item-info"><div class="v13-item-name">' + r.name;
        if(built) html += '<span class="v13-tag green">건립됨</span>';
        html += '</div>';
        html += '<div class="v13-item-desc">' + r.desc + '</div>';
        html += '<div class="v13-item-cost">비용: ' + r.cost + '금 | 신앙 +' + r.faithBonus + ' | 행복 +' + r.happyBonus + '</div></div>';
        if(!built) html += '<button class="v13-btn" onclick="event.stopPropagation();buildTemple(\'' + r.id + '\')">건립</button>';
        else html += '<button class="v13-btn" style="background:linear-gradient(135deg,#85a,#548)" onclick="event.stopPropagation();prayTemple(\'' + r.id + '\')">기도</button>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    setTimeout(function(){ drawReligionCanvas(canvasId); }, 100);
}

function drawReligionCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#da7';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('신앙 분포도', W/2, 18);

    var cx = W/2, cy = H/2 + 10;
    var axes = RELIGIONS.length;
    var maxR = 90;
    var angleStep = (Math.PI * 2) / axes;

    for(var ring = 1; ring <= 4; ring++) {
        var rr = maxR * ring / 4;
        ctx.beginPath();
        for(var a2 = 0; a2 < axes; a2++) {
            var ang = a2 * angleStep - Math.PI/2;
            var xx = cx + Math.cos(ang) * rr;
            var yy = cy + Math.sin(ang) * rr;
            if(a2 === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
        }
        ctx.closePath();
        ctx.strokeStyle = '#1a2a3a';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    for(var a3 = 0; a3 < axes; a3++) {
        var ang3 = a3 * angleStep - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang3) * maxR, cy + Math.sin(ang3) * maxR);
        ctx.strokeStyle = '#1a2a3a';
        ctx.stroke();
    }

    ctx.beginPath();
    RELIGIONS.forEach(function(r, i) {
        var built = v13State.temples[r.id];
        var val = built ? r.faithBonus : 0;
        var pct = val / 20;
        var ang = i * angleStep - Math.PI/2;
        var px = cx + Math.cos(ang) * maxR * pct;
        var py = cy + Math.sin(ang) * maxR * pct;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(218,170,120,0.25)';
    ctx.fill();
    ctx.strokeStyle = '#da7';
    ctx.lineWidth = 2;
    ctx.stroke();

    RELIGIONS.forEach(function(r, i) {
        var ang = i * angleStep - Math.PI/2;
        var lx = cx + Math.cos(ang) * (maxR + 22);
        var ly = cy + Math.sin(ang) * (maxR + 22);
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(r.icon, lx, ly);
    });
}

function buildTemple(id) {
    var r = RELIGIONS.find(function(x){return x.id===id;});
    if(!r || v13State.temples[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < r.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + r.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') {
        resources.gold -= r.cost;
        resources.happy = (resources.happy || 0) + r.happyBonus;
    }
    v13State.temples[id] = true;
    v13State.faithLevel += r.faithBonus;
    playV13SFX('temple_prayer');
    if(typeof toast === 'function') toast(r.icon + ' ' + r.name + ' 건립! 신앙 +' + r.faithBonus);
    if(typeof addChronicle === 'function') addChronicle(r.icon, r.name + ' 시설이 건립되었습니다.');
    saveV13State();
    var panel = document.getElementById('relig-panel');
    if(panel) { panel.remove(); openReligionPanel(); }
}

function prayTemple(id) {
    var r = RELIGIONS.find(function(x){return x.id===id;});
    if(!r || !v13State.temples[id]) return;
    if(typeof resources !== 'undefined') resources.happy = (resources.happy || 0) + 3;
    playV13SFX('temple_prayer');
    if(typeof toast === 'function') toast(r.icon + ' 기도 완료! 행복 +3');
    saveV13State();
}

// ===================== GLOBAL EXPOSE =====================
window.openLibraryPanel = openLibraryPanel;
window.researchScroll = researchScroll;
window.openOccupationPanel = openOccupationPanel;
window.assignOccupation = assignOccupation;
window.openSpyPanel = openSpyPanel;
window.dispatchSpy = dispatchSpy;
window.openTradePanel = openTradePanel;
window.executeTrade = executeTrade;
window.openParkPanel = openParkPanel;
window.buildPark = buildPark;
window.openSuccessionPanel = openSuccessionPanel;
window.succeedThrone = succeedThrone;
window.openRebellionPanel = openRebellionPanel;
window.suppressRebellion = suppressRebellion;
window.negotiateRebellion = negotiateRebellion;
window.openReligionPanel = openReligionPanel;
window.buildTemple = buildTemple;
window.prayTemple = prayTemple;

// ===================== UI INJECTION =====================
function addV13UI() {
    var leftBtns = document.createElement('div');
    leftBtns.className = 'v13-left-btns';
    leftBtns.innerHTML = '<button class="v13-left-btn" onclick="openLibraryPanel()" title="왕실 도서관 (Shift+B)">📚</button>' +
        '<button class="v13-left-btn" onclick="openOccupationPanel()" title="직업 시스템 (Shift+J)">👥</button>' +
        '<button class="v13-left-btn" onclick="openSpyPanel()" title="첩보 네트워크 (Shift+I)">🕵️</button>' +
        '<button class="v13-left-btn" onclick="openTradePanel()" title="국제 교역항 (Shift+P)">⚓</button>' +
        '<button class="v13-left-btn" onclick="openParkPanel()" title="도시 미화 (Shift+E)">🌿</button>' +
        '<button class="v13-left-btn" onclick="openSuccessionPanel()" title="왕위 계승 (Shift+K)">👑</button>' +
        '<button class="v13-left-btn" onclick="openRebellionPanel()" title="반란 관리 (Shift+Q)">⚡</button>' +
        '<button class="v13-left-btn" onclick="openReligionPanel()" title="종교 신앙 (Shift+U)">🙏</button>';
    document.body.appendChild(leftBtns);

    var scrollNav = document.createElement('div');
    scrollNav.className = 'v13-scroll-nav';
    scrollNav.innerHTML = '<button class="v13-nav-btn" onclick="openLibraryPanel()">📚 도서관</button>' +
        '<button class="v13-nav-btn" onclick="openOccupationPanel()">👥 직업</button>' +
        '<button class="v13-nav-btn" onclick="openSpyPanel()">🕵️ 첩보</button>' +
        '<button class="v13-nav-btn" onclick="openTradePanel()">⚓ 교역</button>' +
        '<button class="v13-nav-btn" onclick="openParkPanel()">🌿 미화</button>' +
        '<button class="v13-nav-btn" onclick="openSuccessionPanel()">👑 계승</button>' +
        '<button class="v13-nav-btn" onclick="openRebellionPanel()">⚡ 반란</button>' +
        '<button class="v13-nav-btn" onclick="openReligionPanel()">🙏 종교</button>';
    document.body.appendChild(scrollNav);
}

// ===================== GAME TICK HOOKS =====================
function hookV13GameTick() {
    if(typeof window.nextTurn === 'function') {
        var origNextTurn = window.nextTurn;
        window.nextTurn = function() {
            origNextTurn.apply(this, arguments);
            OCCUPATIONS.forEach(function(occ) {
                var count = v13State.occupations[occ.id] || 0;
                if(count > 0 && typeof resources !== 'undefined') {
                    var prod = count * occ.rate;
                    if(occ.output === 'food') resources.food += prod;
                    else if(occ.output === 'gold') resources.gold += prod;
                    else if(occ.output === 'culture') resources.culture = (resources.culture||0) + prod;
                    else if(occ.output === 'happy') resources.happy = (resources.happy||0) + Math.min(prod, 15);
                    else if(occ.output === 'defense') resources.defense = (resources.defense||0) + prod;
                }
            });
            for(var sid in v13State.spyCooldown) {
                if(v13State.spyCooldown[sid] > 0) v13State.spyCooldown[sid]--;
            }
            var morale = typeof resources !== 'undefined' ? (resources.happy || 50) : 50;
            if(morale < 20 && !v13State.rebellionActive && Math.random() < 0.3) {
                v13State.rebellionActive = true;
                playV13SFX('rebellion_alert');
                if(typeof toast === 'function') toast('⚡ 반란 발생! 백성이 봉기했습니다!');
                if(typeof addChronicle === 'function') addChronicle('⚡', '민심 폭락으로 반란이 일어났습니다!');
            }
            saveV13State();
        };
    }
}

// ===================== QUIZ HOOK =====================
function hookV13Quiz() {
    if(typeof quizQuestions !== 'undefined' && Array.isArray(quizQuestions)) {
        V13_QUIZ.forEach(function(q) {
            quizQuestions.push({
                question: q.q,
                answers: q.a,
                correct: q.c
            });
        });
    }
}

// ===================== ACHIEVEMENTS HOOK =====================
function hookV13Achievements() {
    if(typeof achievements !== 'undefined' && Array.isArray(achievements)) {
        V13_ACHIEVEMENTS.forEach(function(a) {
            achievements.push({
                id: a.id,
                icon: a.icon,
                name: a.name,
                desc: a.desc,
                check: a.check
            });
        });
    }
}

function hookV13CheckAchievements() {
    if(typeof window.checkAchievements === 'function') {
        var origCheck = window.checkAchievements;
        window.checkAchievements = function() {
            origCheck.apply(this, arguments);
            V13_ACHIEVEMENTS.forEach(function(a) {
                if(typeof earnedAchievements !== 'undefined' && !earnedAchievements.has(a.id) && a.check()) {
                    earnedAchievements.add(a.id);
                    playV13SFX('achieve_v13');
                    if(typeof toast === 'function') toast('🏆 업적 달성: ' + a.icon + ' ' + a.name);
                    if(typeof addChronicle === 'function') addChronicle('🏆', '업적 달성: ' + a.name);
                }
            });
        };
    }
}

// ===================== ADVISOR TIPS =====================
function hookV13AdvisorTips() {
    if(typeof advisorTips !== 'undefined' && Array.isArray(advisorTips)) {
        advisorTips.push(
            '📚 왕실 도서관에서 고문서를 연구하면 다양한 보너스를 얻습니다.',
            '👥 직업 배분으로 백성의 생산력을 극대화하세요.',
            '🕵️ 적국에 첩보원을 파견하여 정보를 수집하세요.',
            '⚓ 국제 교역항에서 물건을 사고팔아 이익을 챙기세요.',
            '🌿 공원과 정원을 건설하면 환경지수와 행복이 올라갑니다.',
            '👑 왕위를 계승하면 새로운 시대가 열립니다.',
            '⚡ 민심이 낮으면 반란이 일어날 수 있습니다. 민심 관리에 유의하세요.',
            '🙏 종교 시설을 건립하면 백성의 신앙과 행복이 올라갑니다.'
        );
    }
}

// ===================== KEYBOARD =====================
function hookV13Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        if(document.querySelector('.v13-overlay')) return;
        switch(e.key.toUpperCase()) {
            case 'B': e.preventDefault(); openLibraryPanel(); break;
            case 'J': e.preventDefault(); openOccupationPanel(); break;
            case 'I': e.preventDefault(); openSpyPanel(); break;
            case 'P': e.preventDefault(); openTradePanel(); break;
            case 'E': e.preventDefault(); openParkPanel(); break;
            case 'K': e.preventDefault(); openSuccessionPanel(); break;
            case 'Q': e.preventDefault(); openRebellionPanel(); break;
            case 'U': e.preventDefault(); openReligionPanel(); break;
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV13AutoSave() {
    setInterval(function() { saveV13State(); }, 30000);
}

function saveV13State() {
    try {
        localStorage.setItem('cityV13State', JSON.stringify(v13State));
    } catch(e) {}
}

function loadV13State() {
    try {
        var raw = localStorage.getItem('cityV13State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.scrollResearch) v13State.scrollResearch = state.scrollResearch;
        if(state.scrollProgress) v13State.scrollProgress = state.scrollProgress;
        if(state.occupations) v13State.occupations = state.occupations;
        if(state.spySent) v13State.spySent = state.spySent;
        if(state.spyCooldown) v13State.spyCooldown = state.spyCooldown;
        if(state.tradeHistory) v13State.tradeHistory = state.tradeHistory;
        if(typeof state.tradeProfit === 'number') v13State.tradeProfit = state.tradeProfit;
        if(state.parksBuilt) v13State.parksBuilt = state.parksBuilt;
        if(typeof state.envIndex === 'number') v13State.envIndex = state.envIndex;
        if(typeof state.successionIndex === 'number') v13State.successionIndex = state.successionIndex;
        if(typeof state.successionCount === 'number') v13State.successionCount = state.successionCount;
        if(typeof state.rebellionsSuppressed === 'number') v13State.rebellionsSuppressed = state.rebellionsSuppressed;
        if(typeof state.rebellionActive === 'boolean') v13State.rebellionActive = state.rebellionActive;
        if(state.temples) v13State.temples = state.temples;
        if(typeof state.faithLevel === 'number') v13State.faithLevel = state.faithLevel;
        if(state.features) v13State.features = state.features;
        if(typeof state.quizCorrect === 'number') v13State.quizCorrect = state.quizCorrect;
    } catch(e) {}
}

// ===================== INIT =====================
function initV13() {
    loadV13State();
    addV13UI();
    hookV13GameTick();
    hookV13Quiz();
    hookV13Achievements();
    hookV13CheckAchievements();
    hookV13AdvisorTips();
    hookV13AutoSave();
    hookV13Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('📚 v13.0: 도서관+직업+첩보+교역항+미화+계승+반란+종교!');
        }, 10000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV13, 3500); });
} else {
    setTimeout(initV13, 3500);
}

})();
