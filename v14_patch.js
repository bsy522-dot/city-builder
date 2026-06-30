// =====================================================================
// city-builder v14_patch.js — PRIME Holdings NEXTERA+PRISM v14.0
// Self-contained IIFE patch: Diplomatic Events Bureau 12 events Canvas,
// Public Sentiment Dashboard 6-axis Radar Canvas,
// Ancient Wonders Construction 8 wonders Canvas,
// Four Seasons Agriculture Simulator 8 crops Canvas,
// Historical Scenario Replay 6 scenarios Canvas,
// City Fame System 8 ranks Canvas,
// Royal Advisory Council 6 advisors Canvas,
// Trade Route Visualizer 5 partners Canvas,
// +15 Quiz (145→160), +12 Achievements (134→146),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v14Ctx = null;
function getV14Audio() {
    if(!v14Ctx) {
        try { v14Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v14Ctx;
}
function playV14SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV14Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'diplomacy_event':
            [392,494,588,698].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'sentiment_check':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(550, now+0.2);
            o.frequency.linearRampToValueAtTime(440, now+0.35);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.4);
            break;
        case 'wonder_start':
            [262,330,392,330,262].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.2);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.2);
            });
            break;
        case 'wonder_complete':
            [523,659,784,1047,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.11, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'farm_plant':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(300, now);
            o.frequency.linearRampToValueAtTime(500, now+0.15);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'farm_harvest':
            [440,554,660,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.18);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.18);
            });
            break;
        case 'scenario_start':
            [330,392,494,588,494].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.18);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.18);
            });
            break;
        case 'scenario_complete':
            [523,659,784,880,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'fame_up':
            [440,554,660,880,660,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'advisor_consult':
            [350,440,350,524].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'trade_route':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.1);
            o.frequency.linearRampToValueAtTime(550, now+0.2);
            o.frequency.linearRampToValueAtTime(770, now+0.3);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.4);
            break;
        case 'achieve_v14':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
    }
}

// ===================== STYLE =====================
var v14Style = document.createElement('style');
v14Style.textContent = '.v14-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.82);z-index:200;display:flex;justify-content:center;align-items:center;animation:v14fadeIn 0.3s}' +
'@keyframes v14fadeIn{from{opacity:0}to{opacity:1}}' +
'.v14-box{background:linear-gradient(145deg,#1a2438,#14202e);border:2px solid #d4a;border-radius:16px;padding:20px;max-width:620px;width:94%;max-height:84vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.65);color:#eee;position:relative}' +
'.v14-box h2{text-align:center;color:#f9c;margin-bottom:14px;font-size:20px}' +
'.v14-box h3{color:#da7;font-size:14px;margin:12px 0 6px;border-bottom:1px solid #334;padding-bottom:4px}' +
'.v14-close{position:absolute;top:10px;right:14px;background:none;border:none;color:#aaa;font-size:24px;cursor:pointer}' +
'.v14-close:hover{color:#fff}' +
'.v14-section{margin-bottom:12px}' +
'.v14-item{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.04);border-radius:10px;margin-bottom:6px;cursor:pointer;transition:background 0.2s}' +
'.v14-item:hover{background:rgba(255,255,255,0.1)}' +
'.v14-item-icon{font-size:28px;flex-shrink:0}' +
'.v14-item-info{flex:1;min-width:0}' +
'.v14-item-name{font-weight:bold;color:#dde;font-size:13px}' +
'.v14-item-desc{font-size:11px;color:#999;margin-top:2px}' +
'.v14-item-cost{font-size:10px;color:#fa0;margin-top:2px}' +
'.v14-btn{background:linear-gradient(135deg,#d4a,#a38);border:none;color:#fff;padding:5px 14px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;flex-shrink:0}' +
'.v14-btn:hover{filter:brightness(1.2)}' +
'.v14-btn.disabled{opacity:0.4;cursor:not-allowed}' +
'.v14-stat{display:flex;justify-content:space-between;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:8px;margin-top:4px;font-size:12px;color:#aaa}' +
'.v14-stat-val{font-weight:bold;color:#f9c}' +
'.v14-progress{height:8px;background:#222;border-radius:4px;overflow:hidden;margin-top:4px}' +
'.v14-progress-bar{height:100%;border-radius:4px;transition:width 0.4s}' +
'.v14-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}' +
'.v14-card{background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all 0.2s;border:1px solid transparent}' +
'.v14-card:hover{border-color:#d4a;background:rgba(255,255,255,0.08)}' +
'.v14-card.active{border-color:#ffd700;background:rgba(255,215,0,0.08)}' +
'.v14-canvas-wrap{display:flex;justify-content:center;margin:10px 0}' +
'.v14-scroll-nav{position:fixed;bottom:80px;left:0;right:0;z-index:12;display:flex;overflow-x:auto;gap:4px;padding:4px 8px;scrollbar-width:none}' +
'.v14-scroll-nav::-webkit-scrollbar{display:none}' +
'.v14-nav-btn{flex-shrink:0;padding:5px 12px;border-radius:16px;border:1px solid #d4a;background:rgba(26,26,46,0.85);color:#ccc;font-size:11px;cursor:pointer;white-space:nowrap}' +
'.v14-nav-btn:hover{background:#d4a;color:#fff}' +
'.v14-tag{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:bold;margin-left:6px}' +
'.v14-tag.green{background:#2a5;color:#fff}' +
'.v14-tag.red{background:#a33;color:#fff}' +
'.v14-tag.gold{background:#a80;color:#fff}' +
'.v14-tag.purple{background:#85a;color:#fff}' +
'.v14-choice-btn{display:block;width:100%;text-align:left;padding:10px 14px;margin:6px 0;background:rgba(255,255,255,0.06);border:1px solid #445;border-radius:10px;color:#ddd;cursor:pointer;font-size:12px;transition:all 0.2s}' +
'.v14-choice-btn:hover{border-color:#d4a;background:rgba(212,170,238,0.12)}';
document.head.appendChild(v14Style);

// ===================== DATA: DIPLOMATIC EVENTS =====================
var DIPLOMATIC_EVENTS = [
    {id:'de01',title:'당나라 사신 방문',desc:'당나라에서 대규모 사절단이 도착했습니다. 조공 관계를 맺을지, 대등한 외교를 주장할지 결정해야 합니다.',icon:'🐉',
     choices:[
         {text:'조공 관계 수락 — 안정적 교역 보장',result:{gold:80,culture:10,military:-5},msg:'조공을 통해 풍부한 교역품을 확보했습니다.'},
         {text:'대등 외교 주장 — 자주성 유지',result:{gold:20,culture:30,military:10},msg:'자주 외교를 통해 문화적 자부심이 높아졌습니다.'},
         {text:'사신 거부 — 독자 노선',result:{gold:-10,culture:15,military:20},msg:'독자 노선으로 군사력을 강화했지만 교역이 줄었습니다.'}
     ]},
    {id:'de02',title:'왜구 침입 보고',desc:'남해안에 왜구가 출몰하고 있습니다. 어떻게 대응하시겠습니까?',icon:'⚔️',
     choices:[
         {text:'함대 출격 — 적극 토벌',result:{gold:-40,culture:5,military:25},msg:'함대를 보내 왜구를 소탕했습니다.'},
         {text:'해안 방비 강화 — 수비 전략',result:{gold:-20,culture:0,military:15},msg:'해안 요새를 강화하여 방어력이 올랐습니다.'},
         {text:'외교 교섭 — 평화 해결',result:{gold:10,culture:20,military:-5},msg:'외교로 해결했지만 군사적 위상이 낮아졌습니다.'}
     ]},
    {id:'de03',title:'실크로드 상인 도착',desc:'서역에서 온 상인이 진귀한 물품과 함께 교역을 제안합니다.',icon:'🐫',
     choices:[
         {text:'전면 개방 교역 — 대규모 물물교환',result:{gold:60,culture:25,military:0},msg:'서역 물품이 유입되어 문화가 풍요로워졌습니다.'},
         {text:'제한적 교역 — 선별적 수입',result:{gold:30,culture:15,military:5},msg:'핵심 물품만 수입하여 안정적 이익을 얻었습니다.'},
         {text:'교역 거절 — 자급자족',result:{gold:0,culture:5,military:10},msg:'외부 의존을 줄이고 자급자족 체제를 강화했습니다.'}
     ]},
    {id:'de04',title:'북방 유목민 동맹 제안',desc:'북방 유목민족이 군사 동맹을 제안합니다. 기마 기술을 전수받을 수 있습니다.',icon:'🏇',
     choices:[
         {text:'동맹 수락 — 기마 기술 습득',result:{gold:-30,culture:10,military:30},msg:'기마 기술을 배워 군사력이 크게 향상되었습니다.'},
         {text:'무역 협정만 체결',result:{gold:40,culture:5,military:5},msg:'교역으로 안정적 수입을 확보했습니다.'},
         {text:'경계 유지 — 독립 방어',result:{gold:0,culture:0,military:15},msg:'독자적 방어 체계를 유지했습니다.'}
     ]},
    {id:'de05',title:'불교 경전 전래',desc:'인도에서 불교 경전이 전래되었습니다. 국가 종교 정책을 결정해야 합니다.',icon:'☸️',
     choices:[
         {text:'국교로 채택 — 전면 수용',result:{gold:-50,culture:40,military:-10},msg:'불교를 국교로 삼아 사찰이 번성했습니다.'},
         {text:'학문으로 연구 — 부분 수용',result:{gold:-10,culture:25,military:0},msg:'불교 학문을 연구하여 지식이 확대되었습니다.'},
         {text:'전통 신앙 고수',result:{gold:10,culture:5,military:5},msg:'전통 무속신앙을 유지하여 백성이 안정되었습니다.'}
     ]},
    {id:'de06',title:'일본 조정 사절',desc:'일본 조정에서 선진 문물 전수를 요청하는 사절이 왔습니다.',icon:'🎌',
     choices:[
         {text:'기술 전수 — 문화 외교',result:{gold:50,culture:30,military:0},msg:'기술을 전수하고 대가로 금을 받았습니다.'},
         {text:'조건부 교류 — 상호 학술',result:{gold:20,culture:20,military:5},msg:'상호 학술 교류로 양국 문화가 발전했습니다.'},
         {text:'전수 거부 — 기술 보호',result:{gold:0,culture:5,military:10},msg:'핵심 기술을 보호하여 우위를 유지했습니다.'}
     ]},
    {id:'de07',title:'거란 침공 위협',desc:'거란이 대규모 군사를 국경에 배치했습니다. 전쟁이 임박합니다.',icon:'🏴',
     choices:[
         {text:'선제 공격 — 적극 방어',result:{gold:-60,culture:5,military:35},msg:'선제 공격으로 거란군을 격퇴했습니다.'},
         {text:'외교 담판 — 서희의 지혜',result:{gold:-10,culture:35,military:10},msg:'외교 담판으로 강동 6주를 획득했습니다!'},
         {text:'조공 제안 — 평화 유지',result:{gold:-40,culture:-10,military:-5},msg:'조공으로 전쟁을 피했지만 위상이 떨어졌습니다.'}
     ]},
    {id:'de08',title:'류큐 왕국 교류',desc:'류큐(오키나와)에서 교역선이 도착했습니다. 해상 무역망 확장 기회입니다.',icon:'🏝️',
     choices:[
         {text:'무역항 개설 — 해상 교역 확대',result:{gold:45,culture:15,military:5},msg:'류큐와의 해상 교역로가 열렸습니다.'},
         {text:'문화 교류 — 학술 교환',result:{gold:15,culture:30,military:0},msg:'류큐의 독특한 문화를 학습했습니다.'},
         {text:'방문만 허용 — 제한적 교류',result:{gold:10,culture:5,military:5},msg:'제한적 교류로 안정을 유지했습니다.'}
     ]},
    {id:'de09',title:'명나라 책봉 요구',desc:'명나라가 정식 책봉 의례를 요구합니다. 사대 관계를 재확인해야 합니다.',icon:'📜',
     choices:[
         {text:'책봉 수락 — 실리 외교',result:{gold:70,culture:10,military:-10},msg:'책봉을 받아 교역 특권이 확대되었습니다.'},
         {text:'형식적 수락 — 실질적 자주',result:{gold:30,culture:20,military:5},msg:'형식상 사대하되 실질 독립을 유지했습니다.'},
         {text:'거부 — 자주 독립',result:{gold:-20,culture:25,military:15},msg:'자주 독립을 천명하여 자부심이 높아졌습니다.'}
     ]},
    {id:'de10',title:'여진족 귀화 요청',desc:'여진족 일부가 귀화를 요청합니다. 다문화 포용 정책을 결정하세요.',icon:'🏕️',
     choices:[
         {text:'전면 수용 — 인구 확대',result:{gold:-20,culture:15,military:20},msg:'여진족을 수용하여 인구와 군사력이 늘었습니다.'},
         {text:'국경 지대 정착 — 변경 수비',result:{gold:-10,culture:5,military:15},msg:'국경 수비대로 편성하여 방어력이 올랐습니다.'},
         {text:'거부 — 단일 정책',result:{gold:0,culture:10,military:-5},msg:'순혈주의 정책으로 문화 통합을 유지했습니다.'}
     ]},
    {id:'de11',title:'송나라 학자 망명',desc:'송나라에서 저명한 학자가 망명을 요청합니다.',icon:'📚',
     choices:[
         {text:'환영 — 학술원 초청',result:{gold:-30,culture:40,military:0},msg:'송나라 학자를 초청하여 학문이 크게 발전했습니다.'},
         {text:'조건부 수용 — 기술 전수 조건',result:{gold:10,culture:25,military:5},msg:'기술 전수를 조건으로 수용했습니다.'},
         {text:'거절 — 외교 분쟁 회피',result:{gold:10,culture:0,military:0},msg:'외교 분쟁을 피했지만 학문 기회를 놓쳤습니다.'}
     ]},
    {id:'de12',title:'해상 왕국 건설 제안',desc:'장보고의 후예가 해상 무역 왕국 건설을 제안합니다.',icon:'⛵',
     choices:[
         {text:'전면 지원 — 해상 패권',result:{gold:-50,culture:20,military:15},msg:'해상 무역망이 확장되어 패권을 잡았습니다.'},
         {text:'부분 지원 — 항구만 건설',result:{gold:-20,culture:10,military:5},msg:'주요 항구를 건설하여 교역이 늘었습니다.'},
         {text:'내륙 집중 — 농업 강화',result:{gold:20,culture:5,military:0},msg:'내륙 농업에 집중하여 식량이 풍부해졌습니다.'}
     ]}
];

// ===================== DATA: ANCIENT WONDERS =====================
var ANCIENT_WONDERS = [
    {id:'w_cheomseongdae',icon:'🔭',name:'첨성대',desc:'동양 최고(最古)의 천문 관측대. 별자리를 관측하여 농사 시기를 결정합니다.',cost:100,turns:5,bonus:{culture:30,food:15},era:'신라'},
    {id:'w_seokguram',icon:'🪷',name:'석굴암',desc:'토함산에 세운 석조 석굴 사원. 불교 예술의 극치입니다.',cost:150,turns:7,bonus:{culture:50,happy:20},era:'신라'},
    {id:'w_tripitaka',icon:'📖',name:'팔만대장경',desc:'8만여 장의 목판에 새긴 불교 경전 대전집.',cost:200,turns:10,bonus:{culture:60,happy:15},era:'고려'},
    {id:'w_hwaseong',icon:'🏯',name:'수원화성',desc:'정조대왕이 축성한 근대적 성곽. 군사와 상업의 복합시설.',cost:180,turns:8,bonus:{military:30,gold:25},era:'조선'},
    {id:'w_gyeongbok',icon:'🏛️',name:'경복궁',desc:'조선왕조의 정궁. 왕의 권위와 통치의 중심입니다.',cost:250,turns:12,bonus:{culture:40,gold:30,happy:10},era:'조선'},
    {id:'w_haeinsa',icon:'🛕',name:'해인사',desc:'팔만대장경을 보관한 사찰. 세계문화유산입니다.',cost:130,turns:6,bonus:{culture:45,happy:15},era:'고려'},
    {id:'w_bulguksa',icon:'⛩️',name:'불국사',desc:'석가탑과 다보탑이 있는 신라 불교의 대표 사찰.',cost:140,turns:7,bonus:{culture:40,happy:20},era:'신라'},
    {id:'w_gwanghwamun',icon:'🚪',name:'광화문',desc:'경복궁의 정문. 한양 도성의 상징적 관문입니다.',cost:120,turns:5,bonus:{culture:25,military:15,happy:10},era:'조선'}
];

// ===================== DATA: FOUR SEASONS AGRICULTURE =====================
var FARM_CROPS = [
    {id:'rice',icon:'🌾',name:'쌀',plantSeason:'spring',harvestSeason:'fall',growTime:3,baseYield:30,value:5,desc:'주식 중의 주식. 벼농사의 핵심 작물'},
    {id:'barley',icon:'🌿',name:'보리',plantSeason:'spring',harvestSeason:'summer',growTime:2,baseYield:20,value:3,desc:'겨울을 나는 구황 작물'},
    {id:'bean',icon:'🫘',name:'콩',plantSeason:'spring',harvestSeason:'fall',growTime:3,baseYield:18,value:4,desc:'단백질이 풍부한 필수 곡물'},
    {id:'millet',icon:'🟡',name:'조',plantSeason:'spring',harvestSeason:'fall',growTime:2,baseYield:15,value:2,desc:'척박한 땅에서도 잘 자라는 작물'},
    {id:'sorghum',icon:'🟤',name:'수수',plantSeason:'spring',harvestSeason:'fall',growTime:3,baseYield:16,value:3,desc:'떡과 술의 재료가 되는 곡물'},
    {id:'potato',icon:'🥔',name:'감자',plantSeason:'spring',harvestSeason:'summer',growTime:2,baseYield:25,value:3,desc:'구황 작물의 대표. 산간 지역에서도 재배'},
    {id:'cotton',icon:'🤍',name:'면화',plantSeason:'spring',harvestSeason:'fall',growTime:4,baseYield:10,value:8,desc:'의복 재료. 문익점이 원나라에서 전래'},
    {id:'ginseng',icon:'🌱',name:'인삼',plantSeason:'spring',harvestSeason:'fall',growTime:5,baseYield:5,value:15,desc:'만병통치 약재. 최고급 수출품'}
];

var SEASONS = [
    {id:'spring',name:'봄',icon:'🌸',color:'#f9a',desc:'씨뿌리기 철 — 밭을 갈고 씨앗을 심습니다'},
    {id:'summer',name:'여름',icon:'☀️',color:'#fa0',desc:'관리/성장 철 — 잡초를 뽑고 물을 줍니다'},
    {id:'fall',name:'가을',icon:'🍂',color:'#c73',desc:'수확의 철 — 결실을 거두어들입니다'},
    {id:'winter',name:'겨울',icon:'❄️',color:'#7cf',desc:'저장의 철 — 곡식을 창고에 보관합니다'}
];

// ===================== DATA: HISTORICAL SCENARIOS =====================
var SCENARIOS = [
    {id:'sc_gojoseon',icon:'🏛️',name:'고조선 건국',desc:'단군왕검이 아사달에 나라를 세우다 (BC 2333)',era:'고조선',
     steps:[
         {text:'환웅이 태백산에 내려왔습니다. 곰과 호랑이가 사람이 되고자 합니다.',choices:['둘 다 시험','곰만 선택','호랑이만 선택'],correct:0},
         {text:'곰이 100일 수행을 마치고 웅녀가 되었습니다. 다음 단계는?',choices:['환웅과 혼인','부족 통합','신시 건설'],correct:0},
         {text:'단군왕검이 태어났습니다. 수도를 정해야 합니다.',choices:['아사달에 도읍','평양에 도읍','백두산 기슭'],correct:0},
         {text:'고조선을 건국합니다. 통치 이념은?',choices:['홍익인간','법치주의','군사 통치'],correct:0},
         {text:'팔조법금을 제정합니다. 핵심 조항은?',choices:['살인자 사형','모든 것을 금지','세금 면제'],correct:0}
     ],reward:{gold:100,culture:50}},
    {id:'sc_samguk',icon:'⚔️',name:'삼국통일',desc:'신라가 당나라와 연합하여 삼국을 통일하다 (676)',era:'삼국시대',
     steps:[
         {text:'백제와 고구려가 신라를 압박합니다. 어떻게 대응하시겠습니까?',choices:['당나라와 동맹','독자적 방어','외교 담판'],correct:0},
         {text:'나당연합군이 결성되었습니다. 첫 공격 대상은?',choices:['백제 공격','고구려 공격','가야 정벌'],correct:0},
         {text:'백제가 멸망했습니다. 다음 전략은?',choices:['고구려 공격 계속','내정 안정화','당과 협상'],correct:0},
         {text:'고구려도 멸망했습니다. 당나라가 한반도 지배를 시도합니다.',choices:['당군 격퇴','협상으로 해결','복속 수락'],correct:0},
         {text:'매소성 전투! 당군과의 최종 결전입니다.',choices:['총력전 개시','기습 작전','방어 후 반격'],correct:0}
     ],reward:{gold:120,culture:60}},
    {id:'sc_goryeo',icon:'🏰',name:'고려 건국',desc:'왕건이 후삼국을 통일하고 고려를 세우다 (918)',era:'고려',
     steps:[
         {text:'후삼국 시대. 궁예의 폭정이 심해집니다. 어떻게 하시겠습니까?',choices:['궁예 축출','인내하며 대기','지방으로 피신'],correct:0},
         {text:'왕건이 추대되었습니다. 수도를 정합니다.',choices:['개경(개성)','철원','서경(평양)'],correct:0},
         {text:'후백제 견훤과 대치 중입니다. 전략은?',choices:['포용 정책','무력 정벌','외교 고립'],correct:0},
         {text:'고려가 후삼국을 통일했습니다. 국가 이념은?',choices:['불교 + 유교 병용','불교 국교화','유교 통치'],correct:0},
         {text:'북방 정책을 결정합니다.',choices:['북진 정책','현상 유지','남방 개발'],correct:0}
     ],reward:{gold:110,culture:55}},
    {id:'sc_joseon',icon:'📜',name:'조선 건국',desc:'이성계가 위화도 회군으로 새 왕조를 세우다 (1392)',era:'조선',
     steps:[
         {text:'고려 말, 이성계가 위화도에서 결단을 내려야 합니다.',choices:['회군 결정','요동 공격 계속','주둔하며 관망'],correct:0},
         {text:'개경으로 돌아온 이성계. 다음 행동은?',choices:['정치 개혁','즉시 왕위 찬탈','은퇴 선언'],correct:0},
         {text:'새 왕조의 이름을 정합니다.',choices:['조선','대한','신라'],correct:0},
         {text:'수도를 옮깁니다. 어디로?',choices:['한양(서울)','개경 유지','계룡산'],correct:0},
         {text:'통치 이념을 정합니다.',choices:['성리학(유교)','불교 유지','법가 사상'],correct:0}
     ],reward:{gold:130,culture:60}},
    {id:'sc_imjin',icon:'🔥',name:'임진왜란',desc:'일본 도요토미의 침략에 맞서 싸우다 (1592)',era:'조선',
     steps:[
         {text:'일본군이 부산포에 상륙했습니다! 긴급 대응은?',choices:['이순신에게 출격 명령','육군 총동원','명나라에 원군 요청'],correct:0},
         {text:'한산도 해전! 이순신의 전술은?',choices:['학익진 전법','돌격 전법','매복 작전'],correct:0},
         {text:'의병이 전국에서 일어납니다. 지원 정책은?',choices:['무기와 식량 지원','관군에 편입','자율적 활동 허용'],correct:0},
         {text:'명나라 원군이 도착했습니다. 합동 작전은?',choices:['평양성 탈환','한양 직접 공격','남해안 봉쇄'],correct:0},
         {text:'전쟁 후 재건 정책을 결정합니다.',choices:['농업 복구 우선','군비 강화','외교 재건'],correct:0}
     ],reward:{gold:140,culture:70}},
    {id:'sc_modern',icon:'🌐',name:'근대 개화',desc:'외세의 압력 속에서 근대화를 추진하다 (1876~)',era:'근대',
     steps:[
         {text:'일본이 강화도 조약을 요구합니다. 대응은?',choices:['개항 수락','개항 거부','조건부 수락'],correct:0},
         {text:'개화파와 수구파가 대립합니다. 어느 편을 지지합니까?',choices:['개화파 지지','수구파 지지','중립 유지'],correct:0},
         {text:'갑오개혁을 시행합니다. 핵심 정책은?',choices:['신분제 폐지','군제 개편','교육 개혁'],correct:0},
         {text:'독립협회가 설립됩니다. 활동 방향은?',choices:['자주 독립 운동','의회 설립 청원','언론 자유 확대'],correct:0},
         {text:'대한제국 선포! 국가 방향은?',choices:['광무개혁 추진','열강 외교','군대 강화'],correct:0}
     ],reward:{gold:150,culture:80}}
];

// ===================== DATA: FAME RANKS =====================
var FAME_RANKS = [
    {id:'rank1',name:'무명 마을',minFame:0,icon:'🏕️',color:'#666',reward:'없음'},
    {id:'rank2',name:'작은 읍',minFame:50,icon:'🏘️',color:'#888',reward:'금 +20'},
    {id:'rank3',name:'번영 도시',minFame:150,icon:'🏙️',color:'#4a8',reward:'문화 +30'},
    {id:'rank4',name:'유명 성곽',minFame:300,icon:'🏰',color:'#7cf',reward:'행복 +15'},
    {id:'rank5',name:'왕도',minFame:500,icon:'👑',color:'#ffd700',reward:'금 +50'},
    {id:'rank6',name:'대제국 수도',minFame:800,icon:'🌟',color:'#fa0',reward:'전체 +20'},
    {id:'rank7',name:'동방의 빛',minFame:1200,icon:'🌅',color:'#f66',reward:'문화 +50'},
    {id:'rank8',name:'전설의 수도',minFame:2000,icon:'🏆',color:'#f0f',reward:'전체 +50'}
];

// ===================== DATA: ADVISORS =====================
var ADVISORS = [
    {id:'adv_military',icon:'⚔️',name:'군사 자문관',field:'military',trust:50,
     advices:[
         '성벽을 보강하고 군사 훈련을 강화하십시오.',
         '적의 동태를 파악하기 위해 척후를 보내야 합니다.',
         '신무기 개발에 투자하여 전투력을 높이십시오.'
     ]},
    {id:'adv_economy',icon:'💰',name:'경제 자문관',field:'economy',trust:50,
     advices:[
         '세율을 조정하여 국고를 충실히 하십시오.',
         '상업 시설을 늘려 교역량을 증대시키십시오.',
         '화폐 제도를 정비하여 시장을 활성화하십시오.'
     ]},
    {id:'adv_culture',icon:'🎭',name:'문화 자문관',field:'culture',trust:50,
     advices:[
         '학교와 서원을 세워 인재를 양성하십시오.',
         '궁중 예술을 장려하여 문화 수준을 높이십시오.',
         '역사서 편찬을 통해 문화 자산을 보존하십시오.'
     ]},
    {id:'adv_diplomacy',icon:'🕊️',name:'외교 자문관',field:'diplomacy',trust:50,
     advices:[
         '주변국과 우호 관계를 유지하는 것이 중요합니다.',
         '사신 교환을 통해 정보를 수집하십시오.',
         '국제 교역로를 확보하여 국력을 키우십시오.'
     ]},
    {id:'adv_agriculture',icon:'🌾',name:'농업 자문관',field:'agriculture',trust:50,
     advices:[
         '관개 수로를 정비하여 농업 생산량을 늘리십시오.',
         '새로운 품종을 도입하여 수확량을 개선하십시오.',
         '농한기에 둑과 저수지를 축조하십시오.'
     ]},
    {id:'adv_law',icon:'⚖️',name:'법률 자문관',field:'law',trust:50,
     advices:[
         '공정한 법 집행으로 백성의 신뢰를 얻으십시오.',
         '토지 제도를 개혁하여 불평등을 해소하십시오.',
         '관리 감찰을 강화하여 부정부패를 척결하십시오.'
     ]}
];

// ===================== DATA: TRADE ROUTES =====================
var TRADE_PARTNERS = [
    {id:'tp_tang',icon:'🐉',name:'당(중국)',x:0.75,y:0.35,goods:['비단','도자기','차'],profit:15,risk:2,cost:80,color:'#e44'},
    {id:'tp_japan',icon:'⛩️',name:'일본',x:0.85,y:0.55,goods:['은','칼','해산물'],profit:12,risk:3,cost:60,color:'#f9a'},
    {id:'tp_sea',icon:'🌴',name:'동남아',x:0.6,y:0.8,goods:['향신료','보석','목재'],profit:18,risk:4,cost:100,color:'#4c8'},
    {id:'tp_silk',icon:'🐫',name:'서역',x:0.2,y:0.3,goods:['유리','모직','향료'],profit:22,risk:5,cost:150,color:'#da7'},
    {id:'tp_ryukyu',icon:'🏝️',name:'류큐',x:0.9,y:0.7,goods:['산호','설탕','약재'],profit:10,risk:1,cost:40,color:'#7cf'}
];

// ===================== DATA: QUIZ =====================
var V14_QUIZ = [
    {q:'첨성대는 어느 시대에 건설되었는가?',a:['신라 선덕여왕 시대','고려 광종 시대','백제 성왕 시대','조선 세종 시대'],c:0},
    {q:'팔만대장경이 보관된 사찰은?',a:['해인사','불국사','통도사','송광사'],c:0},
    {q:'수원 화성을 축성한 왕은?',a:['정조','영조','순조','헌종'],c:0},
    {q:'한국에 면화를 처음 들여온 인물은?',a:['문익점','정도전','이성계','최영'],c:0},
    {q:'장보고가 설치한 해상 무역 거점은?',a:['청해진','탐라','대마도','강화도'],c:0},
    {q:'고려시대 주요 수출품이 아닌 것은?',a:['반도체','인삼','고려청자','종이'],c:0},
    {q:'위화도 회군을 단행한 인물은?',a:['이성계','최영','정몽주','정도전'],c:0},
    {q:'서희가 거란과의 외교 담판으로 얻은 영토는?',a:['강동 6주','압록강 이북','요동반도','간도'],c:0},
    {q:'임진왜란 때 이순신이 사용한 진법은?',a:['학익진','어린진','방원진','장사진'],c:0},
    {q:'대한제국을 선포한 왕은?',a:['고종','순종','흥선대원군','명성황후'],c:0},
    {q:'홍익인간 이념으로 건국된 나라는?',a:['고조선','고구려','백제','신라'],c:0},
    {q:'한산도 대첩이 일어난 해는?',a:['1592년','1597년','1636년','1627년'],c:0},
    {q:'독립협회를 창립한 인물은?',a:['서재필','안창호','이승만','김구'],c:0},
    {q:'갑오개혁의 주요 내용이 아닌 것은?',a:['왕정 폐지','신분제 폐지','과거제 폐지','은본위제 실시'],c:0},
    {q:'석굴암이 위치한 산은?',a:['토함산','설악산','지리산','한라산'],c:0}
];

// ===================== DATA: ACHIEVEMENTS =====================
var V14_ACHIEVEMENTS = [
    {id:'v14_diplomat',icon:'🕊️',name:'외교의 달인',desc:'외교 사건 3회 이상 처리',check:function(){return v14State.diplomacyCount>=3;}},
    {id:'v14_sentiment_s',icon:'📊',name:'민심 S등급',desc:'민심 종합 등급 S 달성',check:function(){return calcSentimentGrade()==='S';}},
    {id:'v14_wonder_builder',icon:'🔭',name:'불가사의 건축가',desc:'불가사의 1개 이상 완성',check:function(){return countWondersCompleted()>=1;}},
    {id:'v14_wonder_all',icon:'🏆',name:'건축의 신',desc:'불가사의 전체 8종 완성',check:function(){return countWondersCompleted()>=8;}},
    {id:'v14_farmer',icon:'🌾',name:'농부의 길',desc:'3종 이상 작물 수확',check:function(){return countCropsHarvested()>=3;}},
    {id:'v14_harvest_king',icon:'👨‍🌾',name:'수확의 왕',desc:'총 수확량 100 이상',check:function(){return v14State.totalHarvest>=100;}},
    {id:'v14_scenario_1',icon:'📜',name:'역사 체험자',desc:'시나리오 1개 이상 완료',check:function(){return countScenariosCompleted()>=1;}},
    {id:'v14_scenario_all',icon:'🌟',name:'역사의 주인공',desc:'시나리오 전체 6종 완료',check:function(){return countScenariosCompleted()>=6;}},
    {id:'v14_famous',icon:'🏙️',name:'번영 도시',desc:'명성 150 이상 달성',check:function(){return v14State.fame>=150;}},
    {id:'v14_legendary',icon:'🏆',name:'전설의 수도',desc:'명성 2000 이상 달성',check:function(){return v14State.fame>=2000;}},
    {id:'v14_advisor',icon:'👨‍⚖️',name:'자문단 활용가',desc:'자문관 3명 이상 상담',check:function(){return countAdvisorsConsulted()>=3;}},
    {id:'v14_trade_master',icon:'⛵',name:'교역로의 왕',desc:'교역로 3개 이상 개설',check:function(){return countTradeRoutesOpen()>=3;}}
];

// ===================== STATE =====================
var v14State = {
    diplomacyHistory: [],
    diplomacyCount: 0,
    sentimentAxes: {security:50,economy:50,welfare:50,culture:50,education:50,environment:50},
    wonderProgress: {},
    wonderCompleted: {},
    currentSeason: 0,
    farmPlanted: {},
    farmGrowth: {},
    farmHarvested: {},
    totalHarvest: 0,
    scenarioProgress: {},
    scenarioCompleted: {},
    fame: 0,
    fameRank: 0,
    advisorTrust: {},
    advisorConsulted: {},
    tradeRoutes: {},
    tradeRouteIncome: 0,
    features: {},
    quizCorrect: 0
};

// ===================== HELPER FUNCTIONS =====================
function countWondersCompleted() {
    var c = 0;
    for(var k in v14State.wonderCompleted) { if(v14State.wonderCompleted[k]) c++; }
    return c;
}
function countCropsHarvested() {
    var c = 0;
    for(var k in v14State.farmHarvested) { if(v14State.farmHarvested[k]) c++; }
    return c;
}
function countScenariosCompleted() {
    var c = 0;
    for(var k in v14State.scenarioCompleted) { if(v14State.scenarioCompleted[k]) c++; }
    return c;
}
function countAdvisorsConsulted() {
    var c = 0;
    for(var k in v14State.advisorConsulted) { if(v14State.advisorConsulted[k]) c++; }
    return c;
}
function countTradeRoutesOpen() {
    var c = 0;
    for(var k in v14State.tradeRoutes) { if(v14State.tradeRoutes[k]) c++; }
    return c;
}
function countV14Features() {
    var c = 0;
    for(var k in v14State.features) { if(v14State.features[k]) c++; }
    return c;
}
function calcSentimentGrade() {
    var ax = v14State.sentimentAxes;
    var avg = (ax.security + ax.economy + ax.welfare + ax.culture + ax.education + ax.environment) / 6;
    if(avg >= 85) return 'S';
    if(avg >= 70) return 'A';
    if(avg >= 55) return 'B';
    if(avg >= 40) return 'C';
    return 'D';
}
function calcSentimentAvg() {
    var ax = v14State.sentimentAxes;
    return Math.round((ax.security + ax.economy + ax.welfare + ax.culture + ax.education + ax.environment) / 6);
}
function getCurrentFameRank() {
    var rank = FAME_RANKS[0];
    for(var i = FAME_RANKS.length - 1; i >= 0; i--) {
        if(v14State.fame >= FAME_RANKS[i].minFame) { rank = FAME_RANKS[i]; break; }
    }
    return rank;
}
function addFame(pts) {
    var oldRank = getCurrentFameRank();
    v14State.fame += pts;
    var newRank = getCurrentFameRank();
    if(newRank.id !== oldRank.id) {
        playV14SFX('fame_up');
        if(typeof toast === 'function') toast('🌟 명성 등급 상승! ' + newRank.icon + ' ' + newRank.name);
        if(typeof addChronicle === 'function') addChronicle('🌟', '도시가 ' + newRank.name + ' 등급으로 성장했습니다!');
    }
}
function getCurrentSeason() {
    return SEASONS[v14State.currentSeason % 4];
}

// ===================== FEATURE 1: DIPLOMATIC EVENTS =====================
function openDiplomacyPanel() {
    playV14SFX('diplomacy_event');
    v14State.features.diplomacy = true;
    var html = '<div id="v14-diplo-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>🕊️ 외교 사건부</h2>';
    html += '<div class="v14-stat"><span>처리한 외교 사건</span><span class="v14-stat-val">' + v14State.diplomacyCount + ' / ' + DIPLOMATIC_EVENTS.length + '</span></div>';

    var canvasId = 'diplo-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="600" height="380"></canvas></div>';

    var available = DIPLOMATIC_EVENTS.filter(function(ev) {
        return v14State.diplomacyHistory.indexOf(ev.id) === -1;
    });

    if(available.length > 0) {
        var evt = available[Math.floor(Math.random() * available.length)];
        html += '<div class="v14-section"><h3>' + evt.icon + ' ' + evt.title + '</h3>';
        html += '<div style="padding:8px;color:#ccc;font-size:12px;margin-bottom:8px">' + evt.desc + '</div>';
        evt.choices.forEach(function(ch, ci) {
            html += '<button class="v14-choice-btn" onclick="handleDiplomacyChoice(\'' + evt.id + '\',' + ci + ')">';
            html += '<div style="font-weight:bold;color:#f9c">' + (ci+1) + '. ' + ch.text + '</div>';
            var r = ch.result;
            html += '<div style="font-size:10px;color:#888;margin-top:3px">금' + (r.gold>=0?'+':'') + r.gold + ' | 문화' + (r.culture>=0?'+':'') + r.culture + ' | 군사' + (r.military>=0?'+':'') + r.military + '</div>';
            html += '</button>';
        });
        html += '</div>';
    } else {
        html += '<div style="text-align:center;padding:20px;color:#888">모든 외교 사건을 처리했습니다!</div>';
    }

    html += '<div class="v14-section"><h3>외교 기록</h3>';
    if(v14State.diplomacyHistory.length === 0) {
        html += '<div style="color:#666;font-size:12px;text-align:center;padding:8px">아직 처리한 외교 사건이 없습니다.</div>';
    } else {
        v14State.diplomacyHistory.forEach(function(eid) {
            var ev = DIPLOMATIC_EVENTS.find(function(x){return x.id===eid;});
            if(ev) {
                html += '<div class="v14-item"><span class="v14-item-icon">' + ev.icon + '</span>';
                html += '<div class="v14-item-info"><div class="v14-item-name">' + ev.title + '<span class="v14-tag green">완료</span></div></div></div>';
            }
        });
    }
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawDiplomacyCanvas(canvasId); }, 100);
}

function drawDiplomacyCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f9c';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('외교 사건 현황', W/2, 22);

    var total = DIPLOMATIC_EVENTS.length;
    var done = v14State.diplomacyHistory.length;
    var barW = 40, gap = 6;
    var startX = (W - total * (barW + gap)) / 2;

    DIPLOMATIC_EVENTS.forEach(function(ev, i) {
        var isDone = v14State.diplomacyHistory.indexOf(ev.id) !== -1;
        var x = startX + i * (barW + gap);
        var barH = 200;
        var fillH = isDone ? barH : barH * 0.1;

        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(x, 50, barW, barH);

        var grd = ctx.createLinearGradient(x, 50 + barH - fillH, x, 50 + barH);
        grd.addColorStop(0, isDone ? '#d4a' : '#334');
        grd.addColorStop(1, isDone ? '#f9c' : '#445');
        ctx.fillStyle = grd;
        ctx.fillRect(x, 50 + barH - fillH, barW, fillH);

        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ev.icon, x + barW/2, 50 + barH + 24);

        ctx.fillStyle = isDone ? '#f9c' : '#555';
        ctx.font = '9px sans-serif';
        ctx.fillText(isDone ? '완료' : '미처리', x + barW/2, 50 + barH + 38);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '12px sans-serif';
    ctx.fillText('진행률: ' + done + ' / ' + total + ' (' + Math.round(done/total*100) + '%)', W/2, H - 15);
}

function handleDiplomacyChoice(evtId, choiceIdx) {
    var evt = DIPLOMATIC_EVENTS.find(function(x){return x.id===evtId;});
    if(!evt || v14State.diplomacyHistory.indexOf(evtId) !== -1) return;
    var choice = evt.choices[choiceIdx];
    v14State.diplomacyHistory.push(evtId);
    v14State.diplomacyCount++;
    if(typeof resources !== 'undefined') {
        resources.gold += choice.result.gold;
        resources.culture = (resources.culture||0) + choice.result.culture;
        resources.defense = (resources.defense||0) + choice.result.military;
    }
    v14State.sentimentAxes.security = Math.min(100, Math.max(0, v14State.sentimentAxes.security + choice.result.military));
    v14State.sentimentAxes.economy = Math.min(100, Math.max(0, v14State.sentimentAxes.economy + Math.floor(choice.result.gold / 5)));
    v14State.sentimentAxes.culture = Math.min(100, Math.max(0, v14State.sentimentAxes.culture + choice.result.culture));
    addFame(10);
    playV14SFX('diplomacy_event');
    if(typeof toast === 'function') toast('🕊️ ' + choice.msg);
    if(typeof addChronicle === 'function') addChronicle(evt.icon, evt.title + ': ' + choice.msg);
    saveV14State();
    var panel = document.getElementById('v14-diplo-panel');
    if(panel) { panel.remove(); openDiplomacyPanel(); }
}

// ===================== FEATURE 2: PUBLIC SENTIMENT DASHBOARD =====================
function openSentimentPanel() {
    playV14SFX('sentiment_check');
    v14State.features.sentiment = true;
    var grade = calcSentimentGrade();
    var avg = calcSentimentAvg();
    var axLabels = {security:'안보',economy:'경제',welfare:'복지',culture:'문화',education:'교육',environment:'환경'};

    var html = '<div id="v14-senti-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>📊 민심 지표 대시보드</h2>';
    html += '<div class="v14-stat"><span>종합 등급</span><span class="v14-stat-val" style="font-size:18px">' + grade + ' (' + avg + '점)</span></div>';

    var canvasId = 'senti-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="500" height="400"></canvas></div>';

    html += '<div class="v14-section"><h3>세부 지표</h3>';
    var keys = ['security','economy','welfare','culture','education','environment'];
    var icons = {security:'🛡️',economy:'💰',welfare:'🏥',culture:'🎭',education:'📚',environment:'🌿'};
    keys.forEach(function(k) {
        var val = v14State.sentimentAxes[k];
        var barColor = val >= 70 ? '#4a8' : val >= 40 ? '#fa0' : '#f44';
        html += '<div class="v14-item">';
        html += '<span class="v14-item-icon">' + icons[k] + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + axLabels[k] + ' <span style="color:' + barColor + ';font-size:11px">' + val + '</span></div>';
        html += '<div class="v14-progress"><div class="v14-progress-bar" style="width:' + val + '%;background:' + barColor + '"></div></div>';
        html += '</div></div>';
    });

    html += '</div>';
    html += '<div class="v14-section"><h3>민심 향상 팁</h3>';
    html += '<div style="font-size:11px;color:#888;padding:6px">불가사의 건설, 외교 사건 처리, 농업 수확, 교역로 개설 등으로 민심이 향상됩니다.</div>';
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawSentimentCanvas(canvasId); }, 100);
}

function drawSentimentCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);

    var cx = W/2, cy = H/2 + 10;
    var axes = 6;
    var maxR = 140;
    var angleStep = (Math.PI * 2) / axes;
    var labels = ['안보','경제','복지','문화','교육','환경'];
    var keys = ['security','economy','welfare','culture','education','environment'];
    var icons = ['🛡️','💰','🏥','🎭','📚','🌿'];

    for(var ring = 1; ring <= 5; ring++) {
        var rr = maxR * ring / 5;
        ctx.beginPath();
        for(var a = 0; a < axes; a++) {
            var ang = a * angleStep - Math.PI/2;
            var xx = cx + Math.cos(ang) * rr;
            var yy = cy + Math.sin(ang) * rr;
            if(a === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
        }
        ctx.closePath();
        ctx.strokeStyle = '#1a2a3a';
        ctx.lineWidth = 1;
        ctx.stroke();

        if(ring === 5) {
            ctx.fillStyle = '#1a2a3a';
            ctx.font = '8px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('100', cx - 4, cy - rr + 3);
        }
    }

    for(var a2 = 0; a2 < axes; a2++) {
        var ang2 = a2 * angleStep - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang2) * maxR, cy + Math.sin(ang2) * maxR);
        ctx.strokeStyle = '#1a2a3a';
        ctx.stroke();
    }

    ctx.beginPath();
    keys.forEach(function(k, i) {
        var val = v14State.sentimentAxes[k] / 100;
        var ang = i * angleStep - Math.PI/2;
        var px = cx + Math.cos(ang) * maxR * val;
        var py = cy + Math.sin(ang) * maxR * val;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(212,170,238,0.25)';
    ctx.fill();
    ctx.strokeStyle = '#d4a';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    keys.forEach(function(k, i) {
        var val = v14State.sentimentAxes[k] / 100;
        var ang = i * angleStep - Math.PI/2;
        var px = cx + Math.cos(ang) * maxR * val;
        var py = cy + Math.sin(ang) * maxR * val;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI*2);
        ctx.fillStyle = '#f9c';
        ctx.fill();
    });

    labels.forEach(function(label, i) {
        var ang = i * angleStep - Math.PI/2;
        var lx = cx + Math.cos(ang) * (maxR + 28);
        var ly = cy + Math.sin(ang) * (maxR + 28);
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icons[i], lx, ly - 8);
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#aaa';
        ctx.fillText(label, lx, ly + 8);
    });

    var grade = calcSentimentGrade();
    var gradeColor = grade==='S'?'#ffd700':grade==='A'?'#4a8':grade==='B'?'#7cf':grade==='C'?'#fa0':'#f44';
    ctx.fillStyle = gradeColor;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(grade, cx, cy);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#aaa';
    ctx.fillText('종합 등급', cx, cy + 16);
}

// ===================== FEATURE 3: ANCIENT WONDERS =====================
function openWondersPanel() {
    playV14SFX('wonder_start');
    v14State.features.wonders = true;
    var html = '<div id="v14-wonder-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>🏛️ 고대 불가사의 건설</h2>';
    html += '<div class="v14-stat"><span>완성된 불가사의</span><span class="v14-stat-val">' + countWondersCompleted() + ' / 8</span></div>';

    var canvasId = 'wonder-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="560" height="300"></canvas></div>';

    html += '<div class="v14-section"><h3>불가사의 목록</h3>';
    ANCIENT_WONDERS.forEach(function(w) {
        var completed = v14State.wonderCompleted[w.id];
        var prog = v14State.wonderProgress[w.id] || 0;
        var pct = completed ? 100 : Math.round((prog / w.turns) * 100);
        html += '<div class="v14-item">';
        html += '<span class="v14-item-icon">' + w.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + w.name + ' (' + w.era + ')';
        if(completed) html += '<span class="v14-tag green">완성</span>';
        html += '</div>';
        html += '<div class="v14-item-desc">' + w.desc + '</div>';
        html += '<div class="v14-item-cost">비용: ' + w.cost + '금 | 기간: ' + w.turns + '턴</div>';
        var bonusText = [];
        if(w.bonus.culture) bonusText.push('문화+' + w.bonus.culture);
        if(w.bonus.food) bonusText.push('식량+' + w.bonus.food);
        if(w.bonus.happy) bonusText.push('행복+' + w.bonus.happy);
        if(w.bonus.military) bonusText.push('군사+' + w.bonus.military);
        if(w.bonus.gold) bonusText.push('금+' + w.bonus.gold);
        html += '<div style="font-size:10px;color:#4a8;margin-top:2px">보너스: ' + bonusText.join(', ') + '</div>';
        html += '<div class="v14-progress"><div class="v14-progress-bar" style="width:' + pct + '%;background:linear-gradient(90deg,#d4a,#f9c)"></div></div>';
        html += '</div>';
        if(!completed) html += '<button class="v14-btn" onclick="event.stopPropagation();buildWonder(\'' + w.id + '\')">건설</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">✓</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawWonderCanvas(canvasId); }, 100);
}

function drawWonderCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('불가사의 건설 진행률', W/2, 22);

    var barW = 55, gap = 10;
    var startX = (W - ANCIENT_WONDERS.length * (barW + gap)) / 2;

    ANCIENT_WONDERS.forEach(function(w, i) {
        var completed = v14State.wonderCompleted[w.id];
        var prog = v14State.wonderProgress[w.id] || 0;
        var pct = completed ? 1 : prog / w.turns;
        var x = startX + i * (barW + gap);
        var barH = 160;
        var fillH = barH * pct;

        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(x, 45, barW, barH);

        var grd = ctx.createLinearGradient(x, 45 + barH - fillH, x, 45 + barH);
        grd.addColorStop(0, completed ? '#ffd700' : '#a80');
        grd.addColorStop(1, completed ? '#f9c' : '#d4a');
        ctx.fillStyle = grd;
        ctx.fillRect(x, 45 + barH - fillH, barW, fillH);

        if(completed) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, 45, barW, barH);
        }

        ctx.fillStyle = '#fff';
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(w.icon, x + barW/2, 45 + barH + 24);

        ctx.fillStyle = completed ? '#ffd700' : '#888';
        ctx.font = '8px sans-serif';
        ctx.fillText(w.name, x + barW/2, 45 + barH + 40);

        ctx.fillStyle = completed ? '#4a8' : '#666';
        ctx.font = '9px sans-serif';
        ctx.fillText(Math.round(pct*100) + '%', x + barW/2, 45 + barH + 52);
    });
}

function buildWonder(id) {
    var w = ANCIENT_WONDERS.find(function(x){return x.id===id;});
    if(!w || v14State.wonderCompleted[id]) return;
    if(!v14State.wonderProgress[id]) {
        if(typeof resources !== 'undefined' && resources.gold < w.cost) {
            if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + w.cost + ')');
            return;
        }
        if(typeof resources !== 'undefined') resources.gold -= w.cost;
        v14State.wonderProgress[id] = 0;
        playV14SFX('wonder_start');
        if(typeof toast === 'function') toast('🏛️ ' + w.name + ' 건설 시작!');
        if(typeof addChronicle === 'function') addChronicle(w.icon, w.name + ' 건설이 시작되었습니다.');
    }
    v14State.wonderProgress[id] = (v14State.wonderProgress[id] || 0) + 1;
    if(v14State.wonderProgress[id] >= w.turns) {
        v14State.wonderCompleted[id] = true;
        if(typeof resources !== 'undefined') {
            if(w.bonus.culture) resources.culture = (resources.culture||0) + w.bonus.culture;
            if(w.bonus.food) resources.food += (w.bonus.food || 0);
            if(w.bonus.happy) resources.happy = (resources.happy||0) + w.bonus.happy;
            if(w.bonus.military) resources.defense = (resources.defense||0) + w.bonus.military;
            if(w.bonus.gold) resources.gold += (w.bonus.gold || 0);
        }
        v14State.sentimentAxes.culture = Math.min(100, v14State.sentimentAxes.culture + 8);
        addFame(50);
        playV14SFX('wonder_complete');
        if(typeof toast === 'function') toast('🏆 ' + w.name + ' 완성! 보너스 적용!');
        if(typeof addChronicle === 'function') addChronicle('🏆', w.name + '이(가) 완성되어 영원한 영광을 누립니다!');
    } else {
        playV14SFX('wonder_start');
        if(typeof toast === 'function') toast('🏛️ ' + w.name + ' 건설 중... (' + v14State.wonderProgress[id] + '/' + w.turns + ')');
    }
    saveV14State();
    var panel = document.getElementById('v14-wonder-panel');
    if(panel) { panel.remove(); openWondersPanel(); }
}

// ===================== FEATURE 4: FOUR SEASONS AGRICULTURE =====================
function openFarmPanel() {
    playV14SFX('farm_plant');
    v14State.features.farm = true;
    var season = getCurrentSeason();

    var html = '<div id="v14-farm-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>🌾 사계절 농업 시뮬레이터</h2>';
    html += '<div class="v14-stat"><span>현재 계절</span><span class="v14-stat-val" style="color:' + season.color + '">' + season.icon + ' ' + season.name + '</span></div>';
    html += '<div class="v14-stat"><span>총 수확량</span><span class="v14-stat-val">' + v14State.totalHarvest + '</span></div>';

    var canvasId = 'farm-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="500" height="320"></canvas></div>';

    html += '<div class="v14-section"><h3>계절 안내: ' + season.icon + ' ' + season.desc + '</h3>';
    html += '<div style="display:flex;gap:6px;margin:8px 0;justify-content:center">';
    SEASONS.forEach(function(s, i) {
        var isCurrent = i === (v14State.currentSeason % 4);
        html += '<div style="padding:6px 12px;border-radius:10px;background:' + (isCurrent ? s.color : 'rgba(255,255,255,0.05)') + ';color:' + (isCurrent ? '#000' : '#888') + ';font-size:12px;font-weight:' + (isCurrent ? 'bold' : 'normal') + '">' + s.icon + ' ' + s.name + '</div>';
    });
    html += '</div></div>';

    html += '<div class="v14-section"><h3>작물 목록</h3>';
    FARM_CROPS.forEach(function(crop) {
        var planted = v14State.farmPlanted[crop.id];
        var growth = v14State.farmGrowth[crop.id] || 0;
        var harvested = v14State.farmHarvested[crop.id] || 0;
        var canPlant = season.id === crop.plantSeason && !planted;
        var canHarvest = planted && growth >= crop.growTime;
        html += '<div class="v14-item">';
        html += '<span class="v14-item-icon">' + crop.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + crop.name;
        if(planted && !canHarvest) html += '<span class="v14-tag gold">성장중</span>';
        if(canHarvest) html += '<span class="v14-tag green">수확 가능</span>';
        html += '</div>';
        html += '<div class="v14-item-desc">' + crop.desc + '</div>';
        html += '<div class="v14-item-cost">수확량: ' + crop.baseYield + ' | 가치: ' + crop.value + '금 | 성장: ' + crop.growTime + '턴 | 수확 횟수: ' + harvested + '</div>';
        if(planted) {
            var growPct = Math.min(100, Math.round((growth / crop.growTime) * 100));
            html += '<div class="v14-progress"><div class="v14-progress-bar" style="width:' + growPct + '%;background:linear-gradient(90deg,#4a8,#8f4)"></div></div>';
        }
        html += '</div>';
        if(canPlant) html += '<button class="v14-btn" onclick="event.stopPropagation();plantCrop(\'' + crop.id + '\')">파종</button>';
        else if(canHarvest) html += '<button class="v14-btn" style="background:linear-gradient(135deg,#a80,#c93)" onclick="event.stopPropagation();harvestCrop(\'' + crop.id + '\')">수확</button>';
        html += '</div>';
    });
    html += '</div>';

    html += '<div style="text-align:center;margin-top:10px">';
    html += '<button class="v14-btn" onclick="advanceSeason()">계절 진행 →</button>';
    html += '</div>';

    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawFarmCanvas(canvasId); }, 100);
}

function drawFarmCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);

    var season = getCurrentSeason();
    ctx.fillStyle = season.color;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(season.icon + ' ' + season.name + ' 농장 현황', W/2, 22);

    var cols = 4, rows = 2;
    var cellW = 100, cellH = 100;
    var startX = (W - cols * (cellW + 10)) / 2;
    var startY = 45;

    FARM_CROPS.forEach(function(crop, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var x = startX + col * (cellW + 10);
        var y = startY + row * (cellH + 15);
        var planted = v14State.farmPlanted[crop.id];
        var growth = v14State.farmGrowth[crop.id] || 0;
        var pct = planted ? Math.min(1, growth / crop.growTime) : 0;

        ctx.fillStyle = planted ? 'rgba(74,170,136,0.15)' : 'rgba(255,255,255,0.04)';
        ctx.beginPath();
        ctx.roundRect(x, y, cellW, cellH, 8);
        ctx.fill();

        if(planted) {
            ctx.strokeStyle = pct >= 1 ? '#ffd700' : '#4a8';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(crop.icon, x + cellW/2, y + 35);

        ctx.fillStyle = '#ccc';
        ctx.font = '11px sans-serif';
        ctx.fillText(crop.name, x + cellW/2, y + 65);

        if(planted) {
            ctx.fillStyle = '#222';
            ctx.fillRect(x + 10, y + cellH - 16, cellW - 20, 8);
            ctx.fillStyle = pct >= 1 ? '#ffd700' : '#4a8';
            ctx.fillRect(x + 10, y + cellH - 16, (cellW - 20) * pct, 8);

            ctx.fillStyle = '#aaa';
            ctx.font = '8px sans-serif';
            ctx.fillText(Math.round(pct*100) + '%', x + cellW/2, y + cellH - 4);
        }
    });
}

function plantCrop(id) {
    var crop = FARM_CROPS.find(function(x){return x.id===id;});
    if(!crop) return;
    var season = getCurrentSeason();
    if(season.id !== crop.plantSeason) {
        if(typeof toast === 'function') toast('이 작물은 ' + crop.plantSeason + '에만 파종할 수 있습니다.');
        return;
    }
    v14State.farmPlanted[id] = true;
    v14State.farmGrowth[id] = 0;
    playV14SFX('farm_plant');
    v14State.sentimentAxes.welfare = Math.min(100, v14State.sentimentAxes.welfare + 2);
    if(typeof toast === 'function') toast(crop.icon + ' ' + crop.name + ' 파종 완료!');
    if(typeof addChronicle === 'function') addChronicle(crop.icon, crop.name + ' 씨앗을 뿌렸습니다.');
    saveV14State();
    var panel = document.getElementById('v14-farm-panel');
    if(panel) { panel.remove(); openFarmPanel(); }
}

function harvestCrop(id) {
    var crop = FARM_CROPS.find(function(x){return x.id===id;});
    if(!crop || !v14State.farmPlanted[id]) return;
    var growth = v14State.farmGrowth[id] || 0;
    if(growth < crop.growTime) {
        if(typeof toast === 'function') toast('아직 수확할 수 없습니다. (' + growth + '/' + crop.growTime + ')');
        return;
    }
    var weatherBonus = 1 + (Math.random() * 0.4 - 0.1);
    var yield_ = Math.round(crop.baseYield * weatherBonus);
    var income = yield_ * crop.value;
    v14State.farmPlanted[id] = false;
    v14State.farmGrowth[id] = 0;
    v14State.farmHarvested[id] = (v14State.farmHarvested[id] || 0) + 1;
    v14State.totalHarvest += yield_;
    if(typeof resources !== 'undefined') {
        resources.food += yield_;
        resources.gold += income;
    }
    v14State.sentimentAxes.economy = Math.min(100, v14State.sentimentAxes.economy + 3);
    v14State.sentimentAxes.welfare = Math.min(100, v14State.sentimentAxes.welfare + 2);
    addFame(5);
    playV14SFX('farm_harvest');
    if(typeof toast === 'function') toast('🌾 ' + crop.name + ' 수확! 식량 +' + yield_ + ', 금 +' + income);
    if(typeof addChronicle === 'function') addChronicle(crop.icon, crop.name + ' ' + yield_ + '단위를 수확했습니다!');
    saveV14State();
    var panel = document.getElementById('v14-farm-panel');
    if(panel) { panel.remove(); openFarmPanel(); }
}

function advanceSeason() {
    v14State.currentSeason++;
    var season = getCurrentSeason();
    for(var k in v14State.farmPlanted) {
        if(v14State.farmPlanted[k]) {
            v14State.farmGrowth[k] = (v14State.farmGrowth[k] || 0) + 1;
        }
    }
    if(typeof toast === 'function') toast(season.icon + ' ' + season.name + '이(가) 되었습니다.');
    saveV14State();
    var panel = document.getElementById('v14-farm-panel');
    if(panel) { panel.remove(); openFarmPanel(); }
}

// ===================== FEATURE 5: HISTORICAL SCENARIO REPLAY =====================
function openScenarioPanel() {
    playV14SFX('scenario_start');
    v14State.features.scenario = true;

    var html = '<div id="v14-scenario-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>📜 역사 시나리오 재현</h2>';
    html += '<div class="v14-stat"><span>완료한 시나리오</span><span class="v14-stat-val">' + countScenariosCompleted() + ' / 6</span></div>';

    var canvasId = 'scenario-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="580" height="340"></canvas></div>';

    html += '<div class="v14-section"><h3>시나리오 목록</h3>';
    SCENARIOS.forEach(function(sc) {
        var completed = v14State.scenarioCompleted[sc.id];
        var progress = v14State.scenarioProgress[sc.id] || 0;
        var inProgress = progress > 0 && !completed;
        html += '<div class="v14-item" onclick="playScenario(\'' + sc.id + '\')">';
        html += '<span class="v14-item-icon">' + sc.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + sc.name + ' (' + sc.era + ')';
        if(completed) html += '<span class="v14-tag green">완료</span>';
        else if(inProgress) html += '<span class="v14-tag gold">진행중 ' + progress + '/5</span>';
        html += '</div>';
        html += '<div class="v14-item-desc">' + sc.desc + '</div>';
        html += '<div class="v14-item-cost">보상: 금 +' + sc.reward.gold + ' | 문화 +' + sc.reward.culture + '</div>';
        html += '</div>';
        if(!completed) html += '<button class="v14-btn" onclick="event.stopPropagation();playScenario(\'' + sc.id + '\')">도전</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">✓</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawScenarioCanvas(canvasId); }, 100);
}

function drawScenarioCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#da7';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('역사 시나리오 타임라인', W/2, 22);

    var lineY = H / 2;
    ctx.beginPath();
    ctx.moveTo(40, lineY);
    ctx.lineTo(W - 40, lineY);
    ctx.strokeStyle = '#334';
    ctx.lineWidth = 3;
    ctx.stroke();

    var segW = (W - 80) / (SCENARIOS.length - 1);
    SCENARIOS.forEach(function(sc, i) {
        var x = 40 + i * segW;
        var completed = v14State.scenarioCompleted[sc.id];
        var progress = v14State.scenarioProgress[sc.id] || 0;
        var pct = completed ? 1 : progress / 5;

        ctx.beginPath();
        ctx.arc(x, lineY, 22, 0, Math.PI*2);
        ctx.fillStyle = completed ? '#ffd700' : progress > 0 ? '#d4a' : '#2a3a4a';
        ctx.fill();
        if(completed) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sc.icon, x, lineY);

        ctx.fillStyle = completed ? '#ffd700' : '#aaa';
        ctx.font = '10px sans-serif';
        ctx.textBaseline = 'top';
        var labelY = i % 2 === 0 ? lineY + 30 : lineY - 45;
        ctx.fillText(sc.name, x, labelY);
        ctx.fillStyle = '#666';
        ctx.font = '8px sans-serif';
        ctx.fillText(sc.era, x, labelY + 14);

        if(!completed && progress > 0) {
            ctx.fillStyle = '#888';
            ctx.font = '8px sans-serif';
            ctx.fillText(progress + '/5', x, labelY + 26);
        }

        if(i < SCENARIOS.length - 1) {
            var nextCompleted = v14State.scenarioCompleted[SCENARIOS[i+1].id];
            ctx.beginPath();
            ctx.moveTo(x + 22, lineY);
            ctx.lineTo(x + segW - 22, lineY);
            ctx.strokeStyle = completed ? '#ffd700' : '#334';
            ctx.lineWidth = completed ? 3 : 1;
            ctx.stroke();
        }
    });
}

function playScenario(id) {
    var sc = SCENARIOS.find(function(x){return x.id===id;});
    if(!sc || v14State.scenarioCompleted[id]) return;
    var stepIdx = v14State.scenarioProgress[id] || 0;
    if(stepIdx >= sc.steps.length) return;
    var step = sc.steps[stepIdx];

    var panel = document.getElementById('v14-scenario-panel');
    if(panel) panel.remove();

    var html = '<div id="v14-scenario-play" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>' + sc.icon + ' ' + sc.name + ' (' + (stepIdx+1) + '/5)</h2>';
    html += '<div style="padding:12px;background:rgba(255,255,255,0.05);border-radius:10px;margin:10px 0;color:#ccc;font-size:13px;line-height:1.6">' + step.text + '</div>';
    step.choices.forEach(function(ch, ci) {
        html += '<button class="v14-choice-btn" onclick="handleScenarioChoice(\'' + id + '\',' + ci + ')">';
        html += '<div style="font-weight:bold;color:#da7">' + (ci+1) + '. ' + ch + '</div>';
        html += '</button>';
    });
    html += '<div class="v14-progress" style="margin-top:10px"><div class="v14-progress-bar" style="width:' + (stepIdx/5*100) + '%;background:linear-gradient(90deg,#da7,#ffd700)"></div></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function handleScenarioChoice(id, choiceIdx) {
    var sc = SCENARIOS.find(function(x){return x.id===id;});
    if(!sc) return;
    var stepIdx = v14State.scenarioProgress[id] || 0;
    var step = sc.steps[stepIdx];

    v14State.scenarioProgress[id] = stepIdx + 1;

    if(choiceIdx === step.correct) {
        if(typeof toast === 'function') toast('✅ 올바른 선택입니다!');
    } else {
        if(typeof toast === 'function') toast('❌ 다른 선택이 더 나았을 수도 있습니다.');
    }

    if(v14State.scenarioProgress[id] >= sc.steps.length) {
        v14State.scenarioCompleted[id] = true;
        if(typeof resources !== 'undefined') {
            resources.gold += sc.reward.gold;
            resources.culture = (resources.culture||0) + sc.reward.culture;
        }
        v14State.sentimentAxes.culture = Math.min(100, v14State.sentimentAxes.culture + 5);
        v14State.sentimentAxes.education = Math.min(100, v14State.sentimentAxes.education + 8);
        addFame(30);
        playV14SFX('scenario_complete');
        if(typeof toast === 'function') toast('🌟 시나리오 완료! ' + sc.name + ' — 금 +' + sc.reward.gold + ', 문화 +' + sc.reward.culture);
        if(typeof addChronicle === 'function') addChronicle('🌟', sc.name + ' 시나리오를 완수했습니다!');
        saveV14State();
        var play = document.getElementById('v14-scenario-play');
        if(play) play.remove();
        openScenarioPanel();
    } else {
        saveV14State();
        var play2 = document.getElementById('v14-scenario-play');
        if(play2) play2.remove();
        playScenario(id);
    }
}

// ===================== FEATURE 6: CITY FAME SYSTEM =====================
function openFamePanel() {
    playV14SFX('fame_up');
    v14State.features.fame = true;
    var rank = getCurrentFameRank();

    var html = '<div id="v14-fame-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>🌟 도시 명성 시스템</h2>';
    html += '<div class="v14-stat"><span>현재 명성</span><span class="v14-stat-val" style="color:' + rank.color + '">' + v14State.fame + ' (' + rank.icon + ' ' + rank.name + ')</span></div>';

    var canvasId = 'fame-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="480" height="300"></canvas></div>';

    html += '<div class="v14-section"><h3>명성 등급표</h3>';
    FAME_RANKS.forEach(function(fr) {
        var isActive = rank.id === fr.id;
        var isPast = v14State.fame >= fr.minFame;
        html += '<div class="v14-item" style="' + (isActive ? 'border:1px solid ' + fr.color + ';background:rgba(255,255,255,0.06)' : '') + '">';
        html += '<span class="v14-item-icon">' + fr.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name" style="color:' + fr.color + '">' + fr.name;
        if(isActive) html += '<span class="v14-tag gold">현재</span>';
        else if(isPast) html += '<span class="v14-tag green">달성</span>';
        html += '</div>';
        html += '<div class="v14-item-desc">필요 명성: ' + fr.minFame + ' | 보상: ' + fr.reward + '</div>';
        html += '</div></div>';
    });

    html += '</div>';
    html += '<div class="v14-section"><h3>명성 획득 방법</h3>';
    html += '<div style="font-size:11px;color:#888;padding:6px">';
    html += '외교 사건 처리 (+10), 불가사의 완성 (+50), 시나리오 완료 (+30), 농업 수확 (+5), 교역로 개설 (+20)';
    html += '</div></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawFameCanvas(canvasId); }, 100);
}

function drawFameCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('명성 성장 미터', W/2, 22);

    var meterX = 40, meterY = 50, meterW = W - 80, meterH = 30;
    ctx.fillStyle = '#1a2a3a';
    ctx.beginPath();
    ctx.roundRect(meterX, meterY, meterW, meterH, 8);
    ctx.fill();

    var maxFame = FAME_RANKS[FAME_RANKS.length - 1].minFame;
    var fillPct = Math.min(1, v14State.fame / maxFame);
    var grd = ctx.createLinearGradient(meterX, meterY, meterX + meterW * fillPct, meterY);
    grd.addColorStop(0, '#d4a');
    grd.addColorStop(1, '#ffd700');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.roundRect(meterX, meterY, meterW * fillPct, meterH, 8);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(v14State.fame + ' / ' + maxFame, W/2, meterY + meterH/2);

    var milestoneY = meterY + meterH + 30;
    FAME_RANKS.forEach(function(fr, i) {
        var x = meterX + (fr.minFame / maxFame) * meterW;
        x = Math.max(meterX + 15, Math.min(x, meterX + meterW - 15));
        var reached = v14State.fame >= fr.minFame;

        ctx.beginPath();
        ctx.moveTo(x, meterY + meterH);
        ctx.lineTo(x, milestoneY - 5);
        ctx.strokeStyle = reached ? fr.color : '#334';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, milestoneY + 10, 16, 0, Math.PI*2);
        ctx.fillStyle = reached ? fr.color : '#2a3a4a';
        ctx.fill();
        if(reached) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fr.icon, x, milestoneY + 10);

        ctx.fillStyle = reached ? fr.color : '#666';
        ctx.font = '8px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(fr.name, x, milestoneY + 30);
    });

    var rank = getCurrentFameRank();
    ctx.fillStyle = rank.color;
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rank.icon, W/2, H - 60);
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(rank.name, W/2, H - 30);
}

// ===================== FEATURE 7: ROYAL ADVISORY COUNCIL =====================
function openAdvisorPanel() {
    playV14SFX('advisor_consult');
    v14State.features.advisor = true;

    var html = '<div id="v14-advisor-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>👨‍⚖️ 왕실 자문단</h2>';
    html += '<div class="v14-stat"><span>상담 완료</span><span class="v14-stat-val">' + countAdvisorsConsulted() + ' / 6</span></div>';

    var canvasId = 'advisor-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="560" height="360"></canvas></div>';

    html += '<div class="v14-section"><h3>자문관 목록</h3>';
    ADVISORS.forEach(function(adv) {
        var trust = v14State.advisorTrust[adv.id] || adv.trust;
        var consulted = v14State.advisorConsulted[adv.id] || false;
        var trustGrade = trust >= 80 ? 'S' : trust >= 60 ? 'A' : trust >= 40 ? 'B' : 'C';
        html += '<div class="v14-item">';
        html += '<span class="v14-item-icon">' + adv.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + adv.name + ' <span style="color:#7cf;font-size:10px">(신뢰: ' + trust + ' — ' + trustGrade + ')</span></div>';
        html += '<div class="v14-item-desc">분야: ' + adv.field + '</div>';
        html += '<div class="v14-progress"><div class="v14-progress-bar" style="width:' + trust + '%;background:linear-gradient(90deg,#d4a,#ffd700)"></div></div>';
        html += '</div>';
        html += '<button class="v14-btn" onclick="event.stopPropagation();consultAdvisor(\'' + adv.id + '\')">상담</button>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawAdvisorCanvas(canvasId); }, 100);
}

function drawAdvisorCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#da7';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('자문단 회의실', W/2, 22);

    var tableW = 180, tableH = 100;
    var tableCx = W/2, tableCy = H/2;
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath();
    ctx.ellipse(tableCx, tableCy, tableW/2, tableH/2, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#8b6b3d';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#c4956a';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('자문 회의', tableCx, tableCy);

    var seatPositions = [
        {x: tableCx, y: tableCy - tableH/2 - 45},
        {x: tableCx + tableW/2 + 30, y: tableCy - 25},
        {x: tableCx + tableW/2 + 30, y: tableCy + 25},
        {x: tableCx, y: tableCy + tableH/2 + 45},
        {x: tableCx - tableW/2 - 30, y: tableCy + 25},
        {x: tableCx - tableW/2 - 30, y: tableCy - 25}
    ];

    ADVISORS.forEach(function(adv, i) {
        var pos = seatPositions[i];
        var trust = v14State.advisorTrust[adv.id] || adv.trust;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 24, 0, Math.PI*2);
        var bgColor = trust >= 70 ? '#2a5' : trust >= 40 ? '#a80' : '#a33';
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(adv.icon, pos.x, pos.y);

        ctx.fillStyle = '#ccc';
        ctx.font = '9px sans-serif';
        ctx.fillText(adv.name.replace(' 자문관',''), pos.x, pos.y + 34);
        ctx.fillStyle = bgColor;
        ctx.font = '8px sans-serif';
        ctx.fillText('신뢰: ' + trust, pos.x, pos.y + 46);
    });
}

function consultAdvisor(id) {
    var adv = ADVISORS.find(function(x){return x.id===id;});
    if(!adv) return;
    var trust = v14State.advisorTrust[id] || adv.trust;
    v14State.advisorConsulted[id] = true;
    v14State.advisorTrust[id] = Math.min(100, trust + 5);
    var adviceIdx = Math.floor(Math.random() * adv.advices.length);
    var qualityBonus = trust >= 70 ? 2 : trust >= 40 ? 1 : 0;
    var advice = adv.advices[adviceIdx];

    if(typeof resources !== 'undefined') {
        if(adv.field === 'military') resources.defense = (resources.defense||0) + (3 + qualityBonus);
        else if(adv.field === 'economy') resources.gold += (5 + qualityBonus * 3);
        else if(adv.field === 'culture') resources.culture = (resources.culture||0) + (4 + qualityBonus * 2);
        else if(adv.field === 'diplomacy') { v14State.sentimentAxes.security = Math.min(100, v14State.sentimentAxes.security + 3); }
        else if(adv.field === 'agriculture') resources.food += (5 + qualityBonus * 2);
        else if(adv.field === 'law') resources.happy = (resources.happy||0) + (3 + qualityBonus);
    }
    addFame(3);
    playV14SFX('advisor_consult');
    if(typeof toast === 'function') toast(adv.icon + ' ' + adv.name + ': &#34;' + advice + '&#34;');
    if(typeof addChronicle === 'function') addChronicle(adv.icon, adv.name + '의 자문을 받았습니다.');
    saveV14State();
    var panel = document.getElementById('v14-advisor-panel');
    if(panel) { panel.remove(); openAdvisorPanel(); }
}

// ===================== FEATURE 8: TRADE ROUTE VISUALIZER =====================
function openTradeRoutePanel() {
    playV14SFX('trade_route');
    v14State.features.tradeRoute = true;

    var html = '<div id="v14-traderoute-panel" class="v14-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v14-box"><button class="v14-close" onclick="this.closest(\'.v14-overlay\').remove()">&times;</button>';
    html += '<h2>⛵ 교역로 시각화</h2>';
    html += '<div class="v14-stat"><span>개설된 교역로</span><span class="v14-stat-val">' + countTradeRoutesOpen() + ' / 5</span></div>';
    html += '<div class="v14-stat"><span>교역 수입</span><span class="v14-stat-val">+' + v14State.tradeRouteIncome + ' 금/턴</span></div>';

    var canvasId = 'traderoute-canvas-' + Date.now();
    html += '<div class="v14-canvas-wrap"><canvas id="' + canvasId + '" width="600" height="380"></canvas></div>';

    html += '<div class="v14-section"><h3>교역 파트너</h3>';
    TRADE_PARTNERS.forEach(function(tp) {
        var isOpen = v14State.tradeRoutes[tp.id];
        var riskLabel = tp.risk <= 2 ? '낮음' : tp.risk <= 3 ? '보통' : tp.risk <= 4 ? '높음' : '매우 높음';
        var riskColor = tp.risk <= 2 ? '#4a8' : tp.risk <= 3 ? '#fa0' : '#f44';
        html += '<div class="v14-item">';
        html += '<span class="v14-item-icon">' + tp.icon + '</span>';
        html += '<div class="v14-item-info"><div class="v14-item-name">' + tp.name;
        if(isOpen) html += '<span class="v14-tag green">개설됨</span>';
        html += '</div>';
        html += '<div class="v14-item-desc">교역품: ' + tp.goods.join(', ') + '</div>';
        html += '<div class="v14-item-cost">수익: +' + tp.profit + '금/턴 | 위험도: <span style="color:' + riskColor + '">' + riskLabel + '</span> | 개설비: ' + tp.cost + '금</div>';
        html += '</div>';
        if(!isOpen) html += '<button class="v14-btn" onclick="event.stopPropagation();openTradeRoute(\'' + tp.id + '\')">개설</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">✓</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawTradeRouteCanvas(canvasId); }, 100);
}

function drawTradeRouteCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0a1528';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#0d2a4a';
    ctx.beginPath();
    ctx.ellipse(W*0.3, H*0.35, 80, 40, -0.3, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#0d3a2a';
    ctx.beginPath();
    ctx.ellipse(W*0.5, H*0.6, 60, 30, 0.2, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#0d2a4a';
    ctx.beginPath();
    ctx.ellipse(W*0.7, H*0.4, 70, 35, 0.1, 0, Math.PI*2);
    ctx.fill();

    var homeCx = W * 0.45, homeCy = H * 0.45;
    ctx.beginPath();
    ctx.arc(homeCx, homeCy, 14, 0, Math.PI*2);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('한', homeCx, homeCy);

    TRADE_PARTNERS.forEach(function(tp) {
        var tx = W * tp.x;
        var ty = H * tp.y;
        var isOpen = v14State.tradeRoutes[tp.id];

        if(isOpen) {
            ctx.beginPath();
            ctx.moveTo(homeCx, homeCy);
            var cpx = (homeCx + tx) / 2 + (Math.random() * 20 - 10);
            var cpy = (homeCy + ty) / 2 - 20;
            ctx.quadraticCurveTo(cpx, cpy, tx, ty);
            ctx.strokeStyle = tp.color;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            var midX = (homeCx + tx) / 2;
            var midY = (homeCy + ty) / 2 - 10;
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.beginPath();
            ctx.roundRect(midX - 18, midY - 8, 36, 16, 4);
            ctx.fill();
            ctx.fillStyle = '#ffd700';
            ctx.font = '8px sans-serif';
            ctx.fillText('+' + tp.profit + '금', midX, midY);
        }

        ctx.beginPath();
        ctx.arc(tx, ty, 18, 0, Math.PI*2);
        ctx.fillStyle = isOpen ? tp.color : '#2a3a4a';
        ctx.fill();
        ctx.strokeStyle = isOpen ? '#fff' : '#445';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tp.icon, tx, ty);

        ctx.fillStyle = isOpen ? tp.color : '#666';
        ctx.font = '10px sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(tp.name, tx, ty + 22);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('교역로 지도 — 점선은 활성 교역로', W/2, H - 12);
}

function openTradeRoute(id) {
    var tp = TRADE_PARTNERS.find(function(x){return x.id===id;});
    if(!tp || v14State.tradeRoutes[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < tp.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + tp.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= tp.cost;
    v14State.tradeRoutes[id] = true;
    v14State.tradeRouteIncome += tp.profit;
    v14State.sentimentAxes.economy = Math.min(100, v14State.sentimentAxes.economy + 5);
    addFame(20);
    playV14SFX('trade_route');
    if(typeof toast === 'function') toast('⛵ ' + tp.name + ' 교역로 개설! +' + tp.profit + '금/턴');
    if(typeof addChronicle === 'function') addChronicle(tp.icon, tp.name + '과(와)의 교역로가 개설되었습니다.');
    saveV14State();
    var panel = document.getElementById('v14-traderoute-panel');
    if(panel) { panel.remove(); openTradeRoutePanel(); }
}

// ===================== GLOBAL EXPOSE =====================
window.openDiplomacyPanel = openDiplomacyPanel;
window.handleDiplomacyChoice = handleDiplomacyChoice;
window.openSentimentPanel = openSentimentPanel;
window.openWondersPanel = openWondersPanel;
window.buildWonder = buildWonder;
window.openFarmPanel = openFarmPanel;
window.plantCrop = plantCrop;
window.harvestCrop = harvestCrop;
window.advanceSeason = advanceSeason;
window.openScenarioPanel = openScenarioPanel;
window.playScenario = playScenario;
window.handleScenarioChoice = handleScenarioChoice;
window.openFamePanel = openFamePanel;
window.openAdvisorPanel = openAdvisorPanel;
window.consultAdvisor = consultAdvisor;
window.openTradeRoutePanel = openTradeRoutePanel;
window.openTradeRoute = openTradeRoute;

// ===================== UI INJECTION =====================
function addV14UI() {
    var scrollNav = document.createElement('div');
    scrollNav.className = 'v14-scroll-nav';
    scrollNav.innerHTML = '<button class="v14-nav-btn" onclick="openDiplomacyPanel()">🕊️ 외교</button>' +
        '<button class="v14-nav-btn" onclick="openSentimentPanel()">📊 민심</button>' +
        '<button class="v14-nav-btn" onclick="openWondersPanel()">🏛️ 불가사의</button>' +
        '<button class="v14-nav-btn" onclick="openFarmPanel()">🌾 농업</button>' +
        '<button class="v14-nav-btn" onclick="openScenarioPanel()">📜 시나리오</button>' +
        '<button class="v14-nav-btn" onclick="openFamePanel()">🌟 명성</button>' +
        '<button class="v14-nav-btn" onclick="openAdvisorPanel()">👨‍⚖️ 자문단</button>' +
        '<button class="v14-nav-btn" onclick="openTradeRoutePanel()">⛵ 교역로</button>';
    document.body.appendChild(scrollNav);

    var existingV13Nav = document.querySelector('.v13-scroll-nav');
    if(existingV13Nav) {
        existingV13Nav.style.bottom = '110px';
    }
}

// ===================== GAME TICK HOOKS =====================
function hookV14GameTick() {
    if(typeof window.nextTurn === 'function') {
        var origNextTurn = window.nextTurn;
        window.nextTurn = function() {
            origNextTurn.apply(this, arguments);
            if(v14State.tradeRouteIncome > 0 && typeof resources !== 'undefined') {
                var risk = 0;
                for(var k in v14State.tradeRoutes) {
                    if(v14State.tradeRoutes[k]) {
                        var tp = TRADE_PARTNERS.find(function(x){return x.id===k;});
                        if(tp) risk = Math.max(risk, tp.risk);
                    }
                }
                var riskPenalty = Math.random() < risk * 0.05 ? Math.floor(v14State.tradeRouteIncome * 0.3) : 0;
                resources.gold += v14State.tradeRouteIncome - riskPenalty;
                if(riskPenalty > 0 && typeof toast === 'function') {
                    toast('⚠️ 교역로 위험! 수입 일부 손실 (-' + riskPenalty + '금)');
                }
            }
            for(var cid in v14State.farmPlanted) {
                if(v14State.farmPlanted[cid]) {
                    v14State.farmGrowth[cid] = (v14State.farmGrowth[cid] || 0) + 1;
                }
            }
            if(Math.random() < 0.15 && v14State.diplomacyHistory.length < DIPLOMATIC_EVENTS.length) {
                var available = DIPLOMATIC_EVENTS.filter(function(ev) {
                    return v14State.diplomacyHistory.indexOf(ev.id) === -1;
                });
                if(available.length > 0) {
                    var evt = available[Math.floor(Math.random() * available.length)];
                    if(typeof toast === 'function') toast(evt.icon + ' 외교 사건 발생! ' + evt.title + ' — 외교 사건부를 확인하세요.');
                }
            }
            saveV14State();
        };
    }
}

// ===================== QUIZ HOOK =====================
function hookV14Quiz() {
    if(typeof quizQuestions !== 'undefined' && Array.isArray(quizQuestions)) {
        V14_QUIZ.forEach(function(q) {
            quizQuestions.push({
                question: q.q,
                answers: q.a,
                correct: q.c
            });
        });
    }
}

// ===================== ACHIEVEMENTS HOOK =====================
function hookV14Achievements() {
    if(typeof achievements !== 'undefined' && Array.isArray(achievements)) {
        V14_ACHIEVEMENTS.forEach(function(a) {
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

function hookV14CheckAchievements() {
    if(typeof window.checkAchievements === 'function') {
        var origCheck = window.checkAchievements;
        window.checkAchievements = function() {
            origCheck.apply(this, arguments);
            V14_ACHIEVEMENTS.forEach(function(a) {
                if(typeof earnedAchievements !== 'undefined' && !earnedAchievements.has(a.id) && a.check()) {
                    earnedAchievements.add(a.id);
                    playV14SFX('achieve_v14');
                    if(typeof toast === 'function') toast('🏆 업적 달성: ' + a.icon + ' ' + a.name);
                    if(typeof addChronicle === 'function') addChronicle('🏆', '업적 달성: ' + a.name);
                }
            });
        };
    }
}

// ===================== ADVISOR TIPS =====================
function hookV14AdvisorTips() {
    if(typeof advisorTips !== 'undefined' && Array.isArray(advisorTips)) {
        advisorTips.push(
            '🕊️ 외교 사건부에서 외교 사건을 처리하면 금, 문화, 군사 보너스를 얻습니다.',
            '📊 민심 지표를 확인하여 도시의 6가지 분야 균형을 유지하세요.',
            '🏛️ 불가사의를 건설하면 영구적인 보너스와 높은 명성을 얻습니다.',
            '🌾 사계절에 맞춰 농사를 지으면 안정적인 식량과 수입을 확보합니다.',
            '📜 역사 시나리오를 체험하면 보상과 교육적 가치를 동시에 얻습니다.',
            '🌟 명성을 쌓으면 도시 등급이 올라가며 특별 보상이 주어집니다.',
            '👨‍⚖️ 자문관의 신뢰도가 높을수록 더 좋은 보너스를 받습니다.',
            '⛵ 교역로를 개설하면 매 턴 자동으로 금이 들어옵니다.'
        );
    }
}

// ===================== KEYBOARD =====================
function hookV14Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        if(document.querySelector('.v14-overlay')) return;
        switch(e.key) {
            case '!': case '1': e.preventDefault(); openDiplomacyPanel(); break;
            case '@': case '2': e.preventDefault(); openSentimentPanel(); break;
            case '#': case '3': e.preventDefault(); openWondersPanel(); break;
            case '$': case '4': e.preventDefault(); openFarmPanel(); break;
            case '%': case '5': e.preventDefault(); openScenarioPanel(); break;
            case '^': case '6': e.preventDefault(); openFamePanel(); break;
            case '&': case '7': e.preventDefault(); openAdvisorPanel(); break;
            case '*': case '8': e.preventDefault(); openTradeRoutePanel(); break;
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV14AutoSave() {
    setInterval(function() { saveV14State(); }, 30000);
}

function saveV14State() {
    try {
        localStorage.setItem('cityV14State', JSON.stringify(v14State));
    } catch(e) {}
}

function loadV14State() {
    try {
        var raw = localStorage.getItem('cityV14State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.diplomacyHistory) v14State.diplomacyHistory = state.diplomacyHistory;
        if(typeof state.diplomacyCount === 'number') v14State.diplomacyCount = state.diplomacyCount;
        if(state.sentimentAxes) v14State.sentimentAxes = state.sentimentAxes;
        if(state.wonderProgress) v14State.wonderProgress = state.wonderProgress;
        if(state.wonderCompleted) v14State.wonderCompleted = state.wonderCompleted;
        if(typeof state.currentSeason === 'number') v14State.currentSeason = state.currentSeason;
        if(state.farmPlanted) v14State.farmPlanted = state.farmPlanted;
        if(state.farmGrowth) v14State.farmGrowth = state.farmGrowth;
        if(state.farmHarvested) v14State.farmHarvested = state.farmHarvested;
        if(typeof state.totalHarvest === 'number') v14State.totalHarvest = state.totalHarvest;
        if(state.scenarioProgress) v14State.scenarioProgress = state.scenarioProgress;
        if(state.scenarioCompleted) v14State.scenarioCompleted = state.scenarioCompleted;
        if(typeof state.fame === 'number') v14State.fame = state.fame;
        if(typeof state.fameRank === 'number') v14State.fameRank = state.fameRank;
        if(state.advisorTrust) v14State.advisorTrust = state.advisorTrust;
        if(state.advisorConsulted) v14State.advisorConsulted = state.advisorConsulted;
        if(state.tradeRoutes) v14State.tradeRoutes = state.tradeRoutes;
        if(typeof state.tradeRouteIncome === 'number') v14State.tradeRouteIncome = state.tradeRouteIncome;
        if(state.features) v14State.features = state.features;
        if(typeof state.quizCorrect === 'number') v14State.quizCorrect = state.quizCorrect;
    } catch(e) {}
}

// ===================== INIT =====================
function initV14() {
    loadV14State();
    addV14UI();
    hookV14GameTick();
    hookV14Quiz();
    hookV14Achievements();
    hookV14CheckAchievements();
    hookV14AdvisorTips();
    hookV14AutoSave();
    hookV14Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🕊️ v14.0: 외교+민심+불가사의+농업+시나리오+명성+자문단+교역로!');
        }, 12000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV14, 4000); });
} else {
    setTimeout(initV14, 4000);
}

})();
