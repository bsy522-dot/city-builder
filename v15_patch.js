// =====================================================================
// city-builder v15_patch.js — PRIME Holdings NEXTERA+PRISM v15.0
// Self-contained IIFE patch: Water Infrastructure Manager 6 types Canvas,
// Epidemic Response System 8 diseases Canvas,
// Education Development Tracker 8 tiers Canvas,
// Night Cityscape Simulator Canvas,
// Tax Policy Simulator 5 types Canvas,
// Population Pyramid Analyzer 6 classes Canvas,
// Civilization Achievement Timeline 12 milestones Canvas,
// War Campaign Simulator 6 battles Canvas,
// +15 Quiz (160→175), +12 Achievements (146→158),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v15Ctx = null;
function getV15Audio() {
    if(!v15Ctx) {
        try { v15Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v15Ctx;
}
function playV15SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV15Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.10, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    switch(type) {
        case 'water_build':
            [330,440,550,660].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'water_flow':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(220, now);
            o.frequency.linearRampToValueAtTime(440, now+0.15);
            o.frequency.linearRampToValueAtTime(330, now+0.3);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'epidemic_alert':
            [880,440,880,440].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.15);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.15);
            });
            break;
        case 'epidemic_cure':
            [392,494,588,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'edu_upgrade':
            [262,330,392,494,588].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'night_lantern':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(600, now);
            o.frequency.linearRampToValueAtTime(800, now+0.1);
            o.frequency.linearRampToValueAtTime(700, now+0.25);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'tax_adjust':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(350, now);
            o.frequency.linearRampToValueAtTime(500, now+0.15);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'tax_collect':
            [440,554,660,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.10, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'pop_analyze':
            [330,392,440,392,330].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.2);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.2);
            });
            break;
        case 'timeline_scroll':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(500, now);
            o.frequency.linearRampToValueAtTime(700, now+0.1);
            o.frequency.linearRampToValueAtTime(600, now+0.2);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'war_attack':
            [220,330,220,440,220].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.15);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.15);
            });
            break;
        case 'war_victory':
            [523,659,784,1047,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.12, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.3);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.3);
            });
            break;
    }
}

// ===================== STYLE =====================
var v15Style = document.createElement('style');
v15Style.textContent = '.v15-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.82);z-index:10000;display:flex;justify-content:center;align-items:center;animation:v15fadeIn 0.3s}' +
'@keyframes v15fadeIn{from{opacity:0}to{opacity:1}}' +
'.v15-box{background:linear-gradient(145deg,#0f0f23,#141428);border:2px solid #4a9;border-radius:16px;padding:20px;max-width:620px;width:94%;max-height:84vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.65);color:#eee;position:relative}' +
'.v15-box h2{text-align:center;color:#7cf;margin-bottom:14px;font-size:20px}' +
'.v15-box h3{color:#da7;font-size:14px;margin:12px 0 6px;border-bottom:1px solid #334;padding-bottom:4px}' +
'.v15-close{position:absolute;top:10px;right:14px;background:none;border:none;color:#aaa;font-size:24px;cursor:pointer}' +
'.v15-close:hover{color:#fff}' +
'.v15-section{margin-bottom:12px}' +
'.v15-item{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.04);border-radius:10px;margin-bottom:6px;cursor:pointer;transition:background 0.2s}' +
'.v15-item:hover{background:rgba(255,255,255,0.1)}' +
'.v15-item-icon{font-size:28px;flex-shrink:0}' +
'.v15-item-info{flex:1;min-width:0}' +
'.v15-item-name{font-weight:bold;color:#dde;font-size:13px}' +
'.v15-item-desc{font-size:11px;color:#999;margin-top:2px}' +
'.v15-item-cost{font-size:10px;color:#fa0;margin-top:2px}' +
'.v15-btn{background:linear-gradient(135deg,#4a9,#387);border:none;color:#fff;padding:5px 14px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;flex-shrink:0}' +
'.v15-btn:hover{filter:brightness(1.2)}' +
'.v15-btn.disabled{opacity:0.4;cursor:not-allowed}' +
'.v15-stat{display:flex;justify-content:space-between;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:8px;margin-top:4px;font-size:12px;color:#aaa}' +
'.v15-stat-val{font-weight:bold;color:#7cf}' +
'.v15-progress{height:8px;background:#222;border-radius:4px;overflow:hidden;margin-top:4px}' +
'.v15-progress-bar{height:100%;border-radius:4px;transition:width 0.4s}' +
'.v15-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}' +
'.v15-canvas-wrap{display:flex;justify-content:center;margin:10px 0}' +
'.v15-tag{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:bold;margin-left:6px}' +
'.v15-tag.green{background:#2a5;color:#fff}' +
'.v15-tag.red{background:#a33;color:#fff}' +
'.v15-tag.gold{background:#a80;color:#fff}' +
'.v15-tag.blue{background:#38a;color:#fff}' +
'.v15-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;overflow-x:auto;gap:4px;padding:6px 8px;background:#16213e;scrollbar-width:none}' +
'.v15-scroll-nav::-webkit-scrollbar{display:none}' +
'.v15-nav-btn{flex-shrink:0;padding:5px 12px;border-radius:16px;border:1px solid #4a9;background:rgba(15,15,35,0.85);color:#ccc;font-size:11px;cursor:pointer;white-space:nowrap}' +
'.v15-nav-btn:hover{background:#4a9;color:#fff}' +
'.v15-slider-wrap{display:flex;align-items:center;gap:8px;margin:4px 0}' +
'.v15-slider-wrap input[type=range]{flex:1;accent-color:#4a9}' +
'.v15-slider-label{font-size:11px;color:#aaa;min-width:50px}' +
'.v15-slider-val{font-size:12px;color:#7cf;font-weight:bold;min-width:36px;text-align:right}';
document.head.appendChild(v15Style);

// ===================== DATA: WATER INFRASTRUCTURE =====================
var WATER_FACILITIES = [
    {id:'well',icon:'🪣',name:'우물',desc:'마을의 기본 급수 시설. 지하수를 끌어올립니다.',cost:30,supply:10},
    {id:'aqueduct',icon:'🌉',name:'수도교',desc:'먼 수원에서 물을 끌어오는 석조 다리.',cost:80,supply:25},
    {id:'reservoir',icon:'💧',name:'저수지',desc:'빗물을 모아 가뭄에 대비하는 대형 저수 시설.',cost:60,supply:20},
    {id:'sewer',icon:'🕳️',name:'하수도',desc:'도시의 오수를 처리하여 위생을 개선합니다.',cost:50,supply:15},
    {id:'bathhouse',icon:'♨️',name:'목욕탕',desc:'시민의 위생과 휴식을 위한 공중목욕 시설.',cost:70,supply:12},
    {id:'watermill',icon:'⚙️',name:'물레방아',desc:'수력을 이용하여 곡식을 빻는 시설.',cost:55,supply:18}
];

// ===================== DATA: EPIDEMICS =====================
var EPIDEMICS = [
    {id:'plague',name:'역병',icon:'☠️',severity:80,containment:10,desc:'치사율이 높은 전염병. 빠른 대응이 필요합니다.'},
    {id:'smallpox',name:'천연두',icon:'🔴',severity:70,containment:15,desc:'피부에 발진이 나타나는 치명적 질병.'},
    {id:'measles',name:'홍역',icon:'🟠',severity:50,containment:20,desc:'어린이에게 특히 위험한 전염병.'},
    {id:'cholera',name:'콜레라',icon:'🟡',severity:65,containment:12,desc:'오염된 물로 전파되는 수인성 질병.'},
    {id:'typhoid',name:'장티푸스',icon:'🟤',severity:60,containment:18,desc:'위생 불량 시 발생하는 장내 감염병.'},
    {id:'malaria',name:'말라리아',icon:'🦟',severity:55,containment:22,desc:'모기가 매개하는 열대성 질병.'},
    {id:'tuberculosis',name:'결핵',icon:'🫁',severity:45,containment:25,desc:'만성적으로 진행되는 폐 질환.'},
    {id:'scarlet',name:'성홍열',icon:'🔺',severity:40,containment:30,desc:'발열과 발진을 동반하는 세균 감염병.'}
];

var EPIDEMIC_ACTIONS = [
    {id:'quarantine',name:'격리',icon:'🚧',cost:20,containBonus:15,desc:'감염자를 격리하여 전파를 차단합니다.'},
    {id:'medicine',name:'약재',icon:'💊',cost:30,containBonus:20,desc:'약초와 한약으로 환자를 치료합니다.'},
    {id:'sanitation',name:'위생',icon:'🧹',cost:15,containBonus:12,desc:'도시 위생을 개선하여 확산을 억제합니다.'},
    {id:'prayer',name:'기도',icon:'🙏',cost:5,containBonus:8,desc:'신에게 기도하여 역병 퇴치를 빕니다.'}
];

// ===================== DATA: EDUCATION TIERS =====================
var EDU_TIERS = [
    {id:'t0',name:'무학',level:0,icon:'❓',cost:0,cultureCost:0,cultureBonus:0,popBonus:0,desc:'교육 체계가 없는 상태'},
    {id:'t1',name:'서당',level:1,icon:'📒',cost:20,cultureCost:5,cultureBonus:5,popBonus:2,desc:'마을의 기초 교육 기관'},
    {id:'t2',name:'향교',level:2,icon:'📕',cost:40,cultureCost:10,cultureBonus:10,popBonus:5,desc:'지방 유학 교육 기관'},
    {id:'t3',name:'서원',level:3,icon:'📗',cost:70,cultureCost:20,cultureBonus:18,popBonus:8,desc:'사립 고등 교육 기관'},
    {id:'t4',name:'성균관',level:4,icon:'📘',cost:100,cultureCost:30,cultureBonus:25,popBonus:12,desc:'최고 국립 교육 기관'},
    {id:'t5',name:'규장각',level:5,icon:'📙',cost:140,cultureCost:45,cultureBonus:35,popBonus:15,desc:'왕실 도서관 겸 학술 기관'},
    {id:'t6',name:'집현전',level:6,icon:'📚',cost:200,cultureCost:60,cultureBonus:50,popBonus:20,desc:'세종대왕의 학술 연구 기관'},
    {id:'t7',name:'근대학교',level:7,icon:'🏫',cost:280,cultureCost:80,cultureBonus:70,popBonus:30,desc:'서양식 근대 교육 기관'}
];

// ===================== DATA: TAX CATEGORIES =====================
var TAX_CATEGORIES = [
    {id:'agriculture',name:'농업세',icon:'🌾',baseRevenue:20,desc:'농산물과 토지에 부과하는 세금'},
    {id:'commerce',name:'상업세',icon:'🏪',baseRevenue:25,desc:'상거래와 시장 활동에 부과하는 세금'},
    {id:'craft',name:'공업세',icon:'🔨',baseRevenue:18,desc:'수공업과 제조업에 부과하는 세금'},
    {id:'luxury',name:'사치세',icon:'💎',baseRevenue:30,desc:'사치품과 고급 물품에 부과하는 세금'},
    {id:'land',name:'토지세',icon:'🏞️',baseRevenue:22,desc:'토지 소유에 부과하는 기본 세금'}
];

// ===================== DATA: POPULATION CLASSES =====================
var POP_CLASSES = [
    {id:'noble',name:'양반',icon:'👑',count:50,color:'#ffd700',desc:'통치 계층. 학문과 관직에 종사'},
    {id:'scholar',name:'선비',icon:'📖',count:80,color:'#7cf',desc:'학문을 연마하는 지식인 계층'},
    {id:'merchant',name:'상인',icon:'💰',count:120,color:'#4a8',desc:'상업 활동을 하는 경제 계층'},
    {id:'farmer',name:'농민',icon:'🌾',count:300,color:'#a80',desc:'농업에 종사하는 가장 큰 계층'},
    {id:'artisan',name:'장인',icon:'🔧',count:100,color:'#c66',desc:'기술과 공예에 종사하는 전문 계층'},
    {id:'slave',name:'노비',icon:'⛓️',count:150,color:'#888',desc:'가장 낮은 신분의 계층'}
];

// ===================== DATA: TIMELINE MILESTONES =====================
var MILESTONES = [
    {id:'ms01',year:'BC2333',name:'단군조선',icon:'🏛️',desc:'단군왕검이 아사달에 고조선을 건국',unlockCost:0},
    {id:'ms02',year:'BC194',name:'위만조선',icon:'⚔️',desc:'위만이 고조선의 왕위를 차지',unlockCost:20},
    {id:'ms03',year:'BC57',name:'신라건국',icon:'👑',desc:'박혁거세가 서라벌에 신라를 건국',unlockCost:30},
    {id:'ms04',year:'BC37',name:'고구려건국',icon:'🏹',desc:'주몽이 졸본에 고구려를 건국',unlockCost:30},
    {id:'ms05',year:'BC18',name:'백제건국',icon:'🛡️',desc:'온조가 위례성에 백제를 건국',unlockCost:30},
    {id:'ms06',year:'676',name:'삼국통일',icon:'🏴',desc:'신라가 당나라 세력을 몰아내고 삼국 통일',unlockCost:50},
    {id:'ms07',year:'918',name:'고려건국',icon:'🏰',desc:'왕건이 고려를 건국하고 후삼국 통일',unlockCost:60},
    {id:'ms08',year:'1234',name:'금속활자',icon:'📰',desc:'세계 최초 금속활자 인쇄술 발명',unlockCost:80},
    {id:'ms09',year:'1392',name:'조선건국',icon:'📜',desc:'이성계가 조선을 건국',unlockCost:70},
    {id:'ms10',year:'1443',name:'한글창제',icon:'🔤',desc:'세종대왕이 훈민정음을 창제',unlockCost:100},
    {id:'ms11',year:'1592',name:'임진왜란',icon:'🔥',desc:'일본의 침략과 이순신의 활약',unlockCost:90},
    {id:'ms12',year:'1897',name:'대한제국',icon:'🌐',desc:'고종이 대한제국을 선포',unlockCost:110}
];

// ===================== DATA: WAR CAMPAIGNS =====================
var WAR_CAMPAIGNS = [
    {id:'salsu',name:'살수대첩',year:612,icon:'🌊',desc:'을지문덕이 수나라 30만 대군을 살수에서 격파',allyBase:150,enemyBase:300,allyBonus:'기습',reward:{gold:60,culture:20}},
    {id:'gwiju',name:'귀주대첩',year:1019,icon:'🏹',desc:'강감찬이 거란 10만 대군을 귀주에서 섬멸',allyBase:120,enemyBase:250,allyBonus:'매복',reward:{gold:50,culture:25}},
    {id:'hansando',name:'한산도대첩',year:1592,icon:'⛵',desc:'이순신이 학익진 전법으로 왜 수군을 대파',allyBase:100,enemyBase:200,allyBonus:'학익진',reward:{gold:70,culture:30}},
    {id:'haengju',name:'행주대첩',year:1593,icon:'🏰',desc:'권율이 행주산성에서 왜군을 격퇴',allyBase:80,enemyBase:180,allyBonus:'성곽방어',reward:{gold:45,culture:20}},
    {id:'hwangsan',name:'황산벌전투',year:660,icon:'⚔️',desc:'계백의 결사대 5천이 신라군 5만과 맞서 싸움',allyBase:50,enemyBase:500,allyBonus:'결사항전',reward:{gold:30,culture:35}},
    {id:'ansi',name:'안시성전투',year:645,icon:'🛡️',desc:'안시성주가 당 태종의 대군을 88일간 방어',allyBase:60,enemyBase:350,allyBonus:'농성전',reward:{gold:55,culture:30}}
];

// ===================== DATA: QUIZ =====================
var V15_QUIZ = [
    {q:'조선시대 한양의 상수도 역할을 한 시설은?',a:['청계천 수로','한강 다리','경복궁 연못','남대문 저수지'],c:0},
    {q:'조선시대 역병 대응 기관은?',a:['활인서','사헌부','의금부','승정원'],c:0},
    {q:'성균관은 어느 시대의 최고 교육 기관인가?',a:['조선','고려','신라','백제'],c:0},
    {q:'집현전을 설치한 왕은?',a:['세종','태종','성종','영조'],c:0},
    {q:'조선시대 야간 통행을 금지한 제도는?',a:['야금 통행금지(인정-파루)','야시제','봉화제','순라제'],c:0},
    {q:'조선시대 세금으로 거둔 쌀을 무엇이라 하는가?',a:['전세','공납','대동미','환곡'],c:0},
    {q:'조선시대 신분 제도에서 가장 큰 비율을 차지한 계층은?',a:['상민(농민)','양반','중인','노비'],c:0},
    {q:'세계 최초의 금속활자가 사용된 나라는?',a:['고려','중국 송나라','독일','일본'],c:0},
    {q:'살수대첩에서 수나라 군대를 격파한 장수는?',a:['을지문덕','강감찬','이순신','계백'],c:0},
    {q:'귀주대첩에서 거란군을 물리친 고려의 장수는?',a:['강감찬','서희','양규','윤관'],c:0},
    {q:'한산도대첩에서 사용된 전술은?',a:['학익진','장사진','어린진','방원진'],c:0},
    {q:'안시성 전투에서 당나라 황제의 이름은?',a:['당 태종(이세민)','당 고종','당 현종','당 덕종'],c:0},
    {q:'문익점이 원나라에서 가져온 것은?',a:['목화씨','인삼','비단','화약'],c:0},
    {q:'조선시대 인구 조사 장부를 무엇이라 하는가?',a:['호적','양전','군적','족보'],c:0},
    {q:'훈민정음이 반포된 해는?',a:['1446년','1443년','1450년','1420년'],c:0}
];

// ===================== DATA: ACHIEVEMENTS =====================
var V15_ACHIEVEMENTS = [
    {id:'v15_water_builder',icon:'🪣',name:'수도 건설자',desc:'수도 시설 3종 이상 건설',check:function(){return countV15WaterBuilt()>=3;}},
    {id:'v15_water_master',icon:'💧',name:'치수의 달인',desc:'수도 시설 전체 6종 건설',check:function(){return countV15WaterBuilt()>=6;}},
    {id:'v15_epidemic_hero',icon:'💊',name:'역병 퇴치자',desc:'전염병 3종 이상 완치',check:function(){return countV15EpidemicsCured()>=3;}},
    {id:'v15_edu_scholar',icon:'📚',name:'대학자',desc:'교육 수준 집현전(6단계) 달성',check:function(){return v15State.eduLevel>=6;}},
    {id:'v15_night_lantern',icon:'🏮',name:'야경꾼',desc:'등불 10개 이상 설치',check:function(){return v15State.lanternCount>=10;}},
    {id:'v15_tax_optimizer',icon:'💰',name:'세금 최적화',desc:'총 세수 100 이상 달성',check:function(){return calcV15TotalRevenue()>=100;}},
    {id:'v15_pop_balanced',icon:'⚖️',name:'균형 잡힌 사회',desc:'모든 계층 인구 50명 이상',check:function(){return checkV15PopBalance();}},
    {id:'v15_timeline_half',icon:'📅',name:'역사 탐험가',desc:'문명 업적 6개 이상 해금',check:function(){return countV15MilestonesUnlocked()>=6;}},
    {id:'v15_timeline_all',icon:'🌟',name:'역사의 증인',desc:'문명 업적 12개 전부 해금',check:function(){return countV15MilestonesUnlocked()>=12;}},
    {id:'v15_war_victor',icon:'⚔️',name:'명장',desc:'전투 3회 이상 승리',check:function(){return v15State.warWins>=3;}},
    {id:'v15_war_legend',icon:'🏆',name:'전설의 영웅',desc:'전투 전체 6회 승리',check:function(){return v15State.warWins>=6;}},
    {id:'v15_all_features',icon:'🎖️',name:'v15 마스터',desc:'v15 기능 8종 모두 사용',check:function(){return countV15Features()>=8;}}
];

// ===================== STATE =====================
var v15State = {
    waterBuilt: {},
    waterSupply: 0,
    epidemicStatus: {},
    epidemicsCured: {},
    eduLevel: 0,
    lanternCount: 0,
    lanternPositions: [],
    taxRates: {agriculture:30,commerce:30,craft:30,luxury:30,land:30},
    popClasses: {noble:50,scholar:80,merchant:120,farmer:300,artisan:100,slave:150},
    milestonesUnlocked: {},
    timelineScroll: 0,
    warResults: {},
    warWins: 0,
    features: {}
};

// ===================== HELPER FUNCTIONS =====================
function countV15WaterBuilt() {
    var c = 0;
    for(var k in v15State.waterBuilt) { if(v15State.waterBuilt[k]) c++; }
    return c;
}
function countV15EpidemicsCured() {
    var c = 0;
    for(var k in v15State.epidemicsCured) { if(v15State.epidemicsCured[k]) c++; }
    return c;
}
function calcV15TotalRevenue() {
    var total = 0;
    TAX_CATEGORIES.forEach(function(tc) {
        var rate = v15State.taxRates[tc.id] || 30;
        total += Math.round(tc.baseRevenue * rate / 100);
    });
    return total;
}
function checkV15PopBalance() {
    for(var k in v15State.popClasses) {
        if(v15State.popClasses[k] < 50) return false;
    }
    return true;
}
function countV15MilestonesUnlocked() {
    var c = 0;
    for(var k in v15State.milestonesUnlocked) { if(v15State.milestonesUnlocked[k]) c++; }
    return c;
}
function countV15Features() {
    var c = 0;
    for(var k in v15State.features) { if(v15State.features[k]) c++; }
    return c;
}
function getV15TotalPop() {
    var t = 0;
    for(var k in v15State.popClasses) { t += v15State.popClasses[k]; }
    return t;
}
function calcV15Happiness() {
    var avgRate = 0;
    var cats = 0;
    for(var k in v15State.taxRates) {
        avgRate += v15State.taxRates[k];
        cats++;
    }
    avgRate = avgRate / cats;
    return Math.max(0, Math.round(100 - avgRate * 0.8));
}

// ===================== FEATURE 1: WATER INFRASTRUCTURE MANAGER =====================
function openWaterPanel() {
    playV15SFX('water_build');
    v15State.features.water = true;
    var html = '<div id="v15-water-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>💧 수도시설 관리자</h2>';
    html += '<div class="v15-stat"><span>건설된 시설</span><span class="v15-stat-val">' + countV15WaterBuilt() + ' / 6</span></div>';
    html += '<div class="v15-stat"><span>총 급수량</span><span class="v15-stat-val">' + v15State.waterSupply + ' 단위</span></div>';

    var canvasId = 'water-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>시설 목록</h3>';
    WATER_FACILITIES.forEach(function(wf) {
        var built = v15State.waterBuilt[wf.id];
        html += '<div class="v15-item">';
        html += '<span class="v15-item-icon">' + wf.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + wf.name;
        if(built) html += '<span class="v15-tag green">건설됨</span>';
        html += '</div>';
        html += '<div class="v15-item-desc">' + wf.desc + '</div>';
        html += '<div class="v15-item-cost">비용: ' + wf.cost + '금 | 급수량: +' + wf.supply + '</div>';
        html += '</div>';
        if(!built) html += '<button class="v15-btn" onclick="event.stopPropagation();buildWaterFacility(\'' + wf.id + '\')">건설</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">&#10003;</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawWaterCanvas(canvasId); }, 100);
}

function drawWaterCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7cf';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('급수량 현황', W/2, 22);

    var barH = 28, gap = 8, startY = 45;
    var maxSupply = 30;
    WATER_FACILITIES.forEach(function(wf, i) {
        var built = v15State.waterBuilt[wf.id];
        var y = startY + i * (barH + gap);
        var barMaxW = W - 120;
        var fillW = built ? (wf.supply / maxSupply) * barMaxW : 0;

        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(wf.name, 60, y + barH/2 + 4);

        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(70, y, barMaxW, barH);

        if(built) {
            var grd = ctx.createLinearGradient(70, y, 70 + fillW, y);
            grd.addColorStop(0, '#1a6aaa');
            grd.addColorStop(1, '#4ac8ff');
            ctx.fillStyle = grd;
            ctx.fillRect(70, y, fillW, barH);

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('+' + wf.supply, 70 + fillW + 6, y + barH/2 + 4);
        } else {
            ctx.fillStyle = '#555';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('미건설', 70 + barMaxW/2, y + barH/2 + 4);
        }
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('총 급수량: ' + v15State.waterSupply + ' 단위', W/2, H - 15);
}

function buildWaterFacility(id) {
    var wf = WATER_FACILITIES.find(function(x){return x.id===id;});
    if(!wf || v15State.waterBuilt[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < wf.cost) {
        if(typeof toast !== 'undefined' && toast) toast('금이 부족합니다! (필요: ' + wf.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= wf.cost;
    v15State.waterBuilt[id] = true;
    v15State.waterSupply += wf.supply;
    playV15SFX('water_flow');
    if(typeof toast !== 'undefined' && toast) toast('💧 ' + wf.name + ' 건설 완료! 급수량 +' + wf.supply);
    if(typeof addChronicle === 'function') addChronicle(wf.icon, wf.name + ' 수도시설이 건설되었습니다.');
    saveV15State();
    var panel = document.getElementById('v15-water-panel');
    if(panel) { panel.remove(); openWaterPanel(); }
}

// ===================== FEATURE 2: EPIDEMIC RESPONSE SYSTEM =====================
function openEpidemicPanel() {
    playV15SFX('epidemic_alert');
    v15State.features.epidemic = true;

    EPIDEMICS.forEach(function(ep) {
        if(!v15State.epidemicStatus[ep.id]) {
            v15State.epidemicStatus[ep.id] = {severity: ep.severity, containment: ep.containment};
        }
    });

    var html = '<div id="v15-epidemic-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>🦠 전염병 대응 시스템</h2>';
    html += '<div class="v15-stat"><span>완치된 질병</span><span class="v15-stat-val">' + countV15EpidemicsCured() + ' / 8</span></div>';

    var canvasId = 'epidemic-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>질병 현황</h3>';
    EPIDEMICS.forEach(function(ep) {
        var status = v15State.epidemicStatus[ep.id] || {severity: ep.severity, containment: ep.containment};
        var cured = v15State.epidemicsCured[ep.id];
        html += '<div class="v15-item">';
        html += '<span class="v15-item-icon">' + ep.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + ep.name;
        if(cured) html += '<span class="v15-tag green">완치</span>';
        else html += '<span class="v15-tag red">활성</span>';
        html += '</div>';
        html += '<div class="v15-item-desc">' + ep.desc + '</div>';
        if(!cured) {
            html += '<div style="display:flex;gap:6px;margin-top:4px">';
            html += '<div style="flex:1"><div style="font-size:9px;color:#f66">심각도: ' + status.severity + '</div>';
            html += '<div class="v15-progress"><div class="v15-progress-bar" style="width:' + status.severity + '%;background:#f44"></div></div></div>';
            html += '<div style="flex:1"><div style="font-size:9px;color:#4a8">억제도: ' + status.containment + '</div>';
            html += '<div class="v15-progress"><div class="v15-progress-bar" style="width:' + status.containment + '%;background:#4a8"></div></div></div>';
            html += '</div>';
        }
        html += '</div></div>';
    });
    html += '</div>';

    html += '<div class="v15-section"><h3>대응 조치</h3>';
    html += '<div class="v15-grid">';
    EPIDEMIC_ACTIONS.forEach(function(act) {
        html += '<div class="v15-item" style="cursor:pointer" onclick="applyEpidemicAction(\'' + act.id + '\')">';
        html += '<span class="v15-item-icon">' + act.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + act.name + '</div>';
        html += '<div class="v15-item-desc">' + act.desc + '</div>';
        html += '<div class="v15-item-cost">비용: ' + act.cost + '금 | 억제 +' + act.containBonus + '</div>';
        html += '</div></div>';
    });
    html += '</div></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawEpidemicCanvas(canvasId); }, 100);
}

function drawEpidemicCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f66';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('전염병 현황', W/2, 22);

    var barH = 22, gap = 6, startY = 40;
    EPIDEMICS.forEach(function(ep, i) {
        var status = v15State.epidemicStatus[ep.id] || {severity: ep.severity, containment: ep.containment};
        var cured = v15State.epidemicsCured[ep.id];
        var y = startY + i * (barH + gap);
        var barMaxW = W - 100;

        ctx.fillStyle = '#aaa';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(ep.name, 50, y + barH/2 + 3);

        ctx.fillStyle = '#1a1a2a';
        ctx.fillRect(58, y, barMaxW, barH);

        if(cured) {
            ctx.fillStyle = '#2a5';
            ctx.fillRect(58, y, barMaxW, barH);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('완치', 58 + barMaxW/2, y + barH/2 + 3);
        } else {
            var sevW = (status.severity / 100) * barMaxW;
            ctx.fillStyle = 'rgba(255,68,68,0.6)';
            ctx.fillRect(58, y, sevW, barH/2);

            var conW = (status.containment / 100) * barMaxW;
            ctx.fillStyle = 'rgba(74,170,136,0.6)';
            ctx.fillRect(58, y + barH/2, conW, barH/2);
        }
    });

    ctx.fillStyle = '#666';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('상단: 심각도(빨강) / 하단: 억제도(초록)', W/2, H - 10);
}

function applyEpidemicAction(actionId) {
    var act = EPIDEMIC_ACTIONS.find(function(x){return x.id===actionId;});
    if(!act) return;
    if(typeof resources !== 'undefined' && resources.gold < act.cost) {
        if(typeof toast !== 'undefined' && toast) toast('금이 부족합니다! (필요: ' + act.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= act.cost;

    var curedAny = false;
    EPIDEMICS.forEach(function(ep) {
        if(v15State.epidemicsCured[ep.id]) return;
        var status = v15State.epidemicStatus[ep.id];
        if(!status) return;
        status.containment = Math.min(100, status.containment + act.containBonus);
        status.severity = Math.max(0, status.severity - Math.floor(act.containBonus * 0.5));
        if(status.containment >= 100 || status.severity <= 0) {
            v15State.epidemicsCured[ep.id] = true;
            curedAny = true;
            if(typeof toast !== 'undefined' && toast) toast('💊 ' + ep.name + ' 완치!');
            if(typeof addChronicle === 'function') addChronicle('💊', ep.name + '이(가) 완치되었습니다!');
        }
    });

    if(curedAny) {
        playV15SFX('epidemic_cure');
    } else {
        playV15SFX('epidemic_alert');
        if(typeof toast !== 'undefined' && toast) toast(act.icon + ' ' + act.name + ' 시행! 억제도 상승');
    }
    saveV15State();
    var panel = document.getElementById('v15-epidemic-panel');
    if(panel) { panel.remove(); openEpidemicPanel(); }
}

// ===================== FEATURE 3: EDUCATION DEVELOPMENT TRACKER =====================
function openEducationPanel() {
    playV15SFX('edu_upgrade');
    v15State.features.education = true;
    var currentTier = EDU_TIERS[v15State.eduLevel];
    var nextTier = v15State.eduLevel < EDU_TIERS.length - 1 ? EDU_TIERS[v15State.eduLevel + 1] : null;

    var html = '<div id="v15-edu-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>📚 교육 체계 트래커</h2>';
    html += '<div class="v15-stat"><span>현재 교육 수준</span><span class="v15-stat-val">' + currentTier.icon + ' ' + currentTier.name + ' (Lv.' + currentTier.level + ')</span></div>';
    html += '<div class="v15-stat"><span>문화 보너스</span><span class="v15-stat-val">+' + currentTier.cultureBonus + '</span></div>';
    html += '<div class="v15-stat"><span>인구 보너스</span><span class="v15-stat-val">+' + currentTier.popBonus + '</span></div>';

    var canvasId = 'edu-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>교육 기관 계보</h3>';
    EDU_TIERS.forEach(function(tier, i) {
        var isCurrent = i === v15State.eduLevel;
        var isPast = i < v15State.eduLevel;
        html += '<div class="v15-item" style="' + (isCurrent ? 'border:1px solid #4a9;background:rgba(74,170,136,0.1)' : '') + '">';
        html += '<span class="v15-item-icon">' + tier.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + tier.name + ' (Lv.' + tier.level + ')';
        if(isCurrent) html += '<span class="v15-tag blue">현재</span>';
        else if(isPast) html += '<span class="v15-tag green">달성</span>';
        html += '</div>';
        html += '<div class="v15-item-desc">' + tier.desc + '</div>';
        if(tier.cost > 0) html += '<div class="v15-item-cost">비용: ' + tier.cost + '금 + 문화 ' + tier.cultureCost + ' | 문화+' + tier.cultureBonus + ' 인구+' + tier.popBonus + '</div>';
        html += '</div></div>';
    });
    html += '</div>';

    if(nextTier) {
        html += '<div style="text-align:center;margin-top:10px">';
        html += '<button class="v15-btn" onclick="upgradeEducation()">교육 수준 향상: ' + nextTier.name + ' (금 ' + nextTier.cost + ' + 문화 ' + nextTier.cultureCost + ')</button>';
        html += '</div>';
    } else {
        html += '<div style="text-align:center;color:#ffd700;padding:12px;font-size:13px">최고 교육 수준에 도달했습니다!</div>';
    }

    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawEducationCanvas(canvasId); }, 100);
}

function drawEducationCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#da7';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('교육 수준 계단', W/2, 22);

    var stepW = (W - 40) / EDU_TIERS.length;
    var maxH = H - 80;

    EDU_TIERS.forEach(function(tier, i) {
        var x = 20 + i * stepW;
        var stepH = ((i + 1) / EDU_TIERS.length) * maxH;
        var y = H - 30 - stepH;
        var isPast = i < v15State.eduLevel;
        var isCurrent = i === v15State.eduLevel;

        var grd = ctx.createLinearGradient(x, y, x, H - 30);
        if(isCurrent) {
            grd.addColorStop(0, '#4a9');
            grd.addColorStop(1, '#2a7');
        } else if(isPast) {
            grd.addColorStop(0, '#387');
            grd.addColorStop(1, '#264');
        } else {
            grd.addColorStop(0, '#2a3a4a');
            grd.addColorStop(1, '#1a2a3a');
        }
        ctx.fillStyle = grd;
        ctx.fillRect(x + 2, y, stepW - 4, stepH);

        if(isCurrent) {
            ctx.strokeStyle = '#7cf';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 2, y, stepW - 4, stepH);
        }

        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(tier.icon, x + stepW/2, y - 8);

        ctx.fillStyle = isCurrent ? '#7cf' : isPast ? '#4a8' : '#666';
        ctx.font = '9px sans-serif';
        ctx.fillText(tier.name, x + stepW/2, H - 18);
    });
}

function upgradeEducation() {
    if(v15State.eduLevel >= EDU_TIERS.length - 1) return;
    var nextTier = EDU_TIERS[v15State.eduLevel + 1];
    if(typeof resources !== 'undefined') {
        if(resources.gold < nextTier.cost) {
            if(typeof toast !== 'undefined' && toast) toast('금이 부족합니다! (필요: ' + nextTier.cost + ')');
            return;
        }
        var culture = resources.culture || 0;
        if(culture < nextTier.cultureCost) {
            if(typeof toast !== 'undefined' && toast) toast('문화가 부족합니다! (필요: ' + nextTier.cultureCost + ')');
            return;
        }
        resources.gold -= nextTier.cost;
        resources.culture -= nextTier.cultureCost;
        resources.culture += nextTier.cultureBonus;
        resources.pop = (resources.pop || 0) + nextTier.popBonus;
    }
    v15State.eduLevel++;
    playV15SFX('edu_upgrade');
    if(typeof toast !== 'undefined' && toast) toast('📚 교육 수준 향상! ' + nextTier.icon + ' ' + nextTier.name + ' 달성!');
    if(typeof addChronicle === 'function') addChronicle(nextTier.icon, '교육 체계가 ' + nextTier.name + '(으)로 발전했습니다!');
    saveV15State();
    var panel = document.getElementById('v15-edu-panel');
    if(panel) { panel.remove(); openEducationPanel(); }
}

// ===================== FEATURE 4: NIGHT CITYSCAPE SIMULATOR =====================
function openNightPanel() {
    playV15SFX('night_lantern');
    v15State.features.night = true;

    var html = '<div id="v15-night-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>🌙 야간 도시 경관</h2>';
    html += '<div class="v15-stat"><span>설치된 등불</span><span class="v15-stat-val">' + v15State.lanternCount + '개</span></div>';
    html += '<div class="v15-stat"><span>문화 보너스</span><span class="v15-stat-val">+' + (v15State.lanternCount * 2) + '</span></div>';

    var canvasId = 'night-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div style="text-align:center;margin-top:10px">';
    html += '<button class="v15-btn" onclick="placeLantern()">🏮 등불 설치 (비용: 10금)</button>';
    html += '</div>';
    html += '<div style="text-align:center;color:#888;font-size:11px;margin-top:6px">등불을 설치하면 야간 경관이 아름다워지고 문화가 올라갑니다.</div>';

    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawNightCanvas(canvasId); }, 100);
}

function drawNightCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;

    var skyGrd = ctx.createLinearGradient(0, 0, 0, H);
    skyGrd.addColorStop(0, '#0a0a2e');
    skyGrd.addColorStop(0.5, '#141440');
    skyGrd.addColorStop(1, '#1a1a3a');
    ctx.fillStyle = skyGrd;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffe';
    ctx.beginPath();
    ctx.arc(W - 50, 40, 20, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#0a0a2e';
    ctx.beginPath();
    ctx.arc(W - 42, 36, 18, 0, Math.PI*2);
    ctx.fill();

    var seed = 42;
    function seededRandom() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    for(var s = 0; s < 60; s++) {
        var sx = seededRandom() * W;
        var sy = seededRandom() * (H * 0.5);
        var sr = seededRandom() * 1.5 + 0.5;
        ctx.fillStyle = 'rgba(255,255,220,' + (seededRandom() * 0.5 + 0.3) + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI*2);
        ctx.fill();
    }

    var buildings = [
        {x:10,w:40,h:100},{x:55,w:35,h:130},{x:95,w:50,h:90},{x:150,w:30,h:150},
        {x:185,w:45,h:110},{x:235,w:35,h:140},{x:275,w:50,h:95},{x:330,w:25,h:120}
    ];
    buildings.forEach(function(b) {
        ctx.fillStyle = '#0d0d25';
        ctx.fillRect(b.x, H - b.h, b.w, b.h);
        ctx.fillStyle = '#1a1a40';
        ctx.fillRect(b.x + 2, H - b.h + 2, b.w - 4, b.h - 2);

        for(var wy = H - b.h + 10; wy < H - 15; wy += 18) {
            for(var wx = b.x + 6; wx < b.x + b.w - 8; wx += 12) {
                ctx.fillStyle = seededRandom() > 0.5 ? 'rgba(255,220,100,0.4)' : 'rgba(100,100,150,0.2)';
                ctx.fillRect(wx, wy, 6, 8);
            }
        }
    });

    var lanternsToDraw = Math.min(v15State.lanternCount, 20);
    for(var li = 0; li < lanternsToDraw; li++) {
        var lx = 20 + (li * 17) % (W - 40);
        var ly = H - 20 - ((li * 37) % 60);
        var lanternGrd = ctx.createRadialGradient(lx, ly, 2, lx, ly, 18);
        lanternGrd.addColorStop(0, 'rgba(255,150,50,0.9)');
        lanternGrd.addColorStop(0.4, 'rgba(255,100,30,0.4)');
        lanternGrd.addColorStop(1, 'rgba(255,80,20,0)');
        ctx.fillStyle = lanternGrd;
        ctx.beginPath();
        ctx.arc(lx, ly, 18, 0, Math.PI*2);
        ctx.fill();

        ctx.fillStyle = '#ff6633';
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI*2);
        ctx.fill();
    }

    ctx.fillStyle = '#aaa';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('등불 ' + v15State.lanternCount + '개 | 야경 도시', W/2, H - 5);
}

function placeLantern() {
    var cost = 10;
    if(typeof resources !== 'undefined' && resources.gold < cost) {
        if(typeof toast !== 'undefined' && toast) toast('금이 부족합니다! (필요: ' + cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') {
        resources.gold -= cost;
        resources.culture = (resources.culture || 0) + 2;
    }
    v15State.lanternCount++;
    playV15SFX('night_lantern');
    if(typeof toast !== 'undefined' && toast) toast('🏮 등불 설치! (' + v15State.lanternCount + '개) 문화 +2');
    if(typeof addChronicle === 'function') addChronicle('🏮', '야간 등불이 설치되어 도시가 밝아졌습니다.');
    saveV15State();
    var panel = document.getElementById('v15-night-panel');
    if(panel) { panel.remove(); openNightPanel(); }
}

// ===================== FEATURE 5: TAX POLICY SIMULATOR =====================
function openTaxPanel() {
    playV15SFX('tax_adjust');
    v15State.features.tax = true;
    var totalRev = calcV15TotalRevenue();
    var happiness = calcV15Happiness();

    var html = '<div id="v15-tax-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>💰 세금 정책 시뮬레이터</h2>';
    html += '<div class="v15-stat"><span>총 세수</span><span class="v15-stat-val">' + totalRev + ' 금/턴</span></div>';
    html += '<div class="v15-stat"><span>민심 행복도</span><span class="v15-stat-val">' + happiness + '%</span></div>';

    var canvasId = 'tax-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>세율 조정</h3>';
    TAX_CATEGORIES.forEach(function(tc) {
        var rate = v15State.taxRates[tc.id] || 30;
        var rev = Math.round(tc.baseRevenue * rate / 100);
        html += '<div style="margin-bottom:8px">';
        html += '<div style="display:flex;align-items:center;gap:8px">';
        html += '<span style="font-size:20px">' + tc.icon + '</span>';
        html += '<span style="font-size:12px;color:#dde;font-weight:bold;min-width:50px">' + tc.name + '</span>';
        html += '<input type="range" min="0" max="100" value="' + rate + '" style="flex:1;accent-color:#4a9" oninput="adjustTaxRate(\'' + tc.id + '\',this.value)" />';
        html += '<span id="tax-val-' + tc.id + '" style="font-size:12px;color:#7cf;font-weight:bold;min-width:36px;text-align:right">' + rate + '%</span>';
        html += '</div>';
        html += '<div style="font-size:10px;color:#888;margin-left:36px">' + tc.desc + ' | 세수: ' + rev + '금</div>';
        html += '</div>';
    });
    html += '</div>';

    html += '<div style="text-align:center;margin-top:8px">';
    html += '<button class="v15-btn" onclick="collectTaxes()">세금 징수</button>';
    html += '</div>';

    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawTaxCanvas(canvasId); }, 100);
}

function drawTaxCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('세금 구성', W/2, 18);

    var cx = W * 0.28, cy = H * 0.55, radius = 80;
    var colors = ['#e57373','#64b5f6','#ffb74d','#ba68c8','#81c784'];
    var total = 0;
    var slices = [];
    TAX_CATEGORIES.forEach(function(tc, i) {
        var rate = v15State.taxRates[tc.id] || 30;
        var rev = Math.round(tc.baseRevenue * rate / 100);
        total += rev;
        slices.push({name: tc.name, value: rev, color: colors[i]});
    });

    if(total > 0) {
        var startAngle = -Math.PI / 2;
        slices.forEach(function(sl) {
            var sliceAngle = (sl.value / total) * Math.PI * 2;
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
            var lx = cx + Math.cos(midAngle) * (radius * 0.65);
            var ly = cy + Math.sin(midAngle) * (radius * 0.65);
            if(sl.value > 0) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(Math.round(sl.value/total*100) + '%', lx, ly);
            }
            startAngle += sliceAngle;
        });
    }

    var barStartX = W * 0.56, barW = W * 0.38;
    var barH = 24, barGap = 8, barStartY = 50;
    ctx.fillStyle = '#aaa';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('항목별 세수', barStartX, barStartY - 8);

    var maxRev = 0;
    TAX_CATEGORIES.forEach(function(tc) {
        var rate = v15State.taxRates[tc.id] || 30;
        var rev = Math.round(tc.baseRevenue * rate / 100);
        if(rev > maxRev) maxRev = rev;
    });
    if(maxRev === 0) maxRev = 1;

    TAX_CATEGORIES.forEach(function(tc, i) {
        var rate = v15State.taxRates[tc.id] || 30;
        var rev = Math.round(tc.baseRevenue * rate / 100);
        var y = barStartY + i * (barH + barGap);
        var fillW = (rev / maxRev) * barW;

        ctx.fillStyle = '#1a2a3a';
        ctx.fillRect(barStartX, y, barW, barH);

        ctx.fillStyle = colors[i];
        ctx.fillRect(barStartX, y, fillW, barH);

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tc.name + ' ' + rev + '금', barStartX + 4, y + barH/2);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('총 세수: ' + total + '금 | 행복도: ' + calcV15Happiness() + '%', W/2, H - 10);
}

function adjustTaxRate(catId, val) {
    v15State.taxRates[catId] = parseInt(val);
    var valEl = document.getElementById('tax-val-' + catId);
    if(valEl) valEl.textContent = val + '%';
    playV15SFX('tax_adjust');
    saveV15State();
}

function collectTaxes() {
    var totalRev = calcV15TotalRevenue();
    if(typeof resources !== 'undefined') {
        resources.gold += totalRev;
    }
    playV15SFX('tax_collect');
    if(typeof toast !== 'undefined' && toast) toast('💰 세금 징수 완료! +' + totalRev + '금');
    if(typeof addChronicle === 'function') addChronicle('💰', '세금 ' + totalRev + '금을 징수했습니다.');
    saveV15State();
    var panel = document.getElementById('v15-tax-panel');
    if(panel) { panel.remove(); openTaxPanel(); }
}

// ===================== FEATURE 6: POPULATION PYRAMID ANALYZER =====================
function openPopulationPanel() {
    playV15SFX('pop_analyze');
    v15State.features.population = true;
    var totalPop = getV15TotalPop();

    var html = '<div id="v15-pop-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>👥 인구 피라미드 분석기</h2>';
    html += '<div class="v15-stat"><span>총 인구</span><span class="v15-stat-val">' + totalPop + '명</span></div>';

    var canvasId = 'pop-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>신분 계층 분포</h3>';
    POP_CLASSES.forEach(function(pc) {
        var count = v15State.popClasses[pc.id] || 0;
        var pct = totalPop > 0 ? Math.round(count / totalPop * 100) : 0;
        html += '<div class="v15-item">';
        html += '<span class="v15-item-icon">' + pc.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + pc.name + ' <span style="color:' + pc.color + ';font-size:11px">' + count + '명 (' + pct + '%)</span></div>';
        html += '<div class="v15-item-desc">' + pc.desc + '</div>';
        html += '<div class="v15-progress"><div class="v15-progress-bar" style="width:' + pct + '%;background:' + pc.color + '"></div></div>';
        html += '</div></div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawPopulationCanvas(canvasId); }, 100);
}

function drawPopulationCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#da7';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('인구 피라미드', W/2, 22);

    var centerX = W / 2;
    var barH = 28, gap = 6, startY = 45;
    var maxCount = 0;
    POP_CLASSES.forEach(function(pc) {
        var count = v15State.popClasses[pc.id] || 0;
        if(count > maxCount) maxCount = count;
    });
    if(maxCount === 0) maxCount = 1;
    var maxBarW = (W / 2) - 50;

    POP_CLASSES.forEach(function(pc, i) {
        var count = v15State.popClasses[pc.id] || 0;
        var y = startY + i * (barH + gap);
        var barW = (count / maxCount) * maxBarW;

        ctx.fillStyle = pc.color;
        ctx.fillRect(centerX - barW, y, barW, barH);

        ctx.fillStyle = pc.color;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(centerX, y, barW, barH);
        ctx.globalAlpha = 1.0;

        ctx.beginPath();
        ctx.moveTo(centerX, startY);
        ctx.lineTo(centerX, startY + POP_CLASSES.length * (barH + gap));
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(pc.name, centerX - barW - 6, y + barH/2);

        ctx.textAlign = 'left';
        ctx.fillText(count + '명', centerX + barW + 6, y + barH/2);
    });

    ctx.fillStyle = '#aaa';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('총 인구: ' + getV15TotalPop() + '명', W/2, H - 10);
}

// ===================== FEATURE 7: CIVILIZATION ACHIEVEMENT TIMELINE =====================
function openTimelinePanel() {
    playV15SFX('timeline_scroll');
    v15State.features.timeline = true;

    var html = '<div id="v15-timeline-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>📅 문명 업적 타임라인</h2>';
    html += '<div class="v15-stat"><span>해금된 업적</span><span class="v15-stat-val">' + countV15MilestonesUnlocked() + ' / 12</span></div>';

    var canvasId = 'timeline-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>역사 업적</h3>';
    MILESTONES.forEach(function(ms) {
        var unlocked = v15State.milestonesUnlocked[ms.id];
        html += '<div class="v15-item">';
        html += '<span class="v15-item-icon">' + ms.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + ms.year + ' ' + ms.name;
        if(unlocked) html += '<span class="v15-tag green">해금</span>';
        html += '</div>';
        html += '<div class="v15-item-desc">' + ms.desc + '</div>';
        if(ms.unlockCost > 0 && !unlocked) html += '<div class="v15-item-cost">해금 비용: ' + ms.unlockCost + '금</div>';
        html += '</div>';
        if(!unlocked && ms.unlockCost > 0) html += '<button class="v15-btn" onclick="event.stopPropagation();unlockMilestone(\'' + ms.id + '\')">해금</button>';
        else if(!unlocked && ms.unlockCost === 0) html += '<button class="v15-btn" onclick="event.stopPropagation();unlockMilestone(\'' + ms.id + '\')">확인</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">&#10003;</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawTimelineCanvas(canvasId); }, 100);
}

function drawTimelineCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한국사 타임라인', W/2, 18);

    var lineY = H / 2;
    ctx.beginPath();
    ctx.moveTo(15, lineY);
    ctx.lineTo(W - 15, lineY);
    ctx.strokeStyle = '#334';
    ctx.lineWidth = 3;
    ctx.stroke();

    var count = MILESTONES.length;
    var segW = (W - 50) / (count - 1);

    MILESTONES.forEach(function(ms, i) {
        var x = 25 + i * segW;
        var unlocked = v15State.milestonesUnlocked[ms.id];

        ctx.beginPath();
        ctx.arc(x, lineY, 10, 0, Math.PI*2);
        ctx.fillStyle = unlocked ? '#ffd700' : '#2a3a4a';
        ctx.fill();
        if(unlocked) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ms.icon, x, lineY);

        ctx.fillStyle = unlocked ? '#ffd700' : '#666';
        ctx.font = '7px sans-serif';
        ctx.textBaseline = 'top';
        var labelY = i % 2 === 0 ? lineY + 16 : lineY - 28;
        ctx.fillText(ms.year, x, labelY);
        ctx.font = '7px sans-serif';
        ctx.fillText(ms.name, x, labelY + 10);

        if(i < count - 1) {
            ctx.beginPath();
            ctx.moveTo(x + 10, lineY);
            ctx.lineTo(x + segW - 10, lineY);
            ctx.strokeStyle = unlocked ? '#ffd700' : '#334';
            ctx.lineWidth = unlocked ? 2 : 1;
            ctx.stroke();
        }
    });
}

function unlockMilestone(id) {
    var ms = MILESTONES.find(function(x){return x.id===id;});
    if(!ms || v15State.milestonesUnlocked[id]) return;
    if(ms.unlockCost > 0) {
        if(typeof resources !== 'undefined' && resources.gold < ms.unlockCost) {
            if(typeof toast !== 'undefined' && toast) toast('금이 부족합니다! (필요: ' + ms.unlockCost + ')');
            return;
        }
        if(typeof resources !== 'undefined') resources.gold -= ms.unlockCost;
    }
    v15State.milestonesUnlocked[id] = true;
    playV15SFX('timeline_scroll');
    if(typeof toast !== 'undefined' && toast) toast('📅 ' + ms.year + ' ' + ms.name + ' 해금!');
    if(typeof addChronicle === 'function') addChronicle(ms.icon, ms.year + ' ' + ms.name + ' 업적을 해금했습니다.');
    if(typeof resources !== 'undefined') {
        resources.culture = (resources.culture || 0) + 10;
    }
    saveV15State();
    var panel = document.getElementById('v15-timeline-panel');
    if(panel) { panel.remove(); openTimelinePanel(); }
}

// ===================== FEATURE 8: WAR CAMPAIGN SIMULATOR =====================
function openWarPanel() {
    playV15SFX('war_attack');
    v15State.features.war = true;

    var html = '<div id="v15-war-panel" class="v15-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v15-box"><button class="v15-close" onclick="this.closest(\'.v15-overlay\').remove()">&times;</button>';
    html += '<h2>⚔️ 전쟁 캠페인 시뮬레이터</h2>';
    html += '<div class="v15-stat"><span>승리 횟수</span><span class="v15-stat-val">' + v15State.warWins + ' / 6</span></div>';

    var canvasId = 'war-canvas-' + Date.now();
    html += '<div class="v15-canvas-wrap"><canvas id="' + canvasId + '" width="360" height="300"></canvas></div>';

    html += '<div class="v15-section"><h3>전투 목록</h3>';
    WAR_CAMPAIGNS.forEach(function(wc) {
        var result = v15State.warResults[wc.id];
        html += '<div class="v15-item">';
        html += '<span class="v15-item-icon">' + wc.icon + '</span>';
        html += '<div class="v15-item-info"><div class="v15-item-name">' + wc.name + ' (' + wc.year + '년)';
        if(result === 'win') html += '<span class="v15-tag green">승리</span>';
        else if(result === 'lose') html += '<span class="v15-tag red">패배</span>';
        html += '</div>';
        html += '<div class="v15-item-desc">' + wc.desc + '</div>';
        html += '<div class="v15-item-cost">아군: ' + wc.allyBase + ' | 적군: ' + wc.enemyBase + ' | 특수: ' + wc.allyBonus + '</div>';
        html += '</div>';
        if(!result) html += '<button class="v15-btn" onclick="event.stopPropagation();simulateBattle(\'' + wc.id + '\')">전투 시작</button>';
        else if(result === 'lose') html += '<button class="v15-btn" style="background:linear-gradient(135deg,#a80,#864)" onclick="event.stopPropagation();simulateBattle(\'' + wc.id + '\')">재도전</button>';
        else html += '<span style="color:#4a8;font-weight:bold;font-size:11px">&#10003;</span>';
        html += '</div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(function(){ drawWarCanvas(canvasId); }, 100);
}

function drawWarCanvas(canvasId) {
    var c = document.getElementById(canvasId);
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.fillStyle = '#0d1520';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f66';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('전투력 비교', W/2, 18);

    var barW = 20, groupGap = 12, startY = 35;
    var groupW = barW * 2 + 4;
    var totalW = WAR_CAMPAIGNS.length * (groupW + groupGap);
    var startX = (W - totalW) / 2;
    var maxStr = 0;
    WAR_CAMPAIGNS.forEach(function(wc) {
        if(wc.allyBase > maxStr) maxStr = wc.allyBase;
        if(wc.enemyBase > maxStr) maxStr = wc.enemyBase;
    });
    if(maxStr === 0) maxStr = 1;
    var maxBarH = H - 90;

    WAR_CAMPAIGNS.forEach(function(wc, i) {
        var x = startX + i * (groupW + groupGap);
        var allyH = (wc.allyBase / maxStr) * maxBarH;
        var enemyH = (wc.enemyBase / maxStr) * maxBarH;
        var result = v15State.warResults[wc.id];

        ctx.fillStyle = '#4488ff';
        ctx.fillRect(x, startY + maxBarH - allyH, barW, allyH);

        ctx.fillStyle = '#ff4444';
        ctx.fillRect(x + barW + 4, startY + maxBarH - enemyH, barW, enemyH);

        if(result === 'win') {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 2, startY + maxBarH - allyH - 2, groupW + 4, allyH + 4);
        }

        ctx.fillStyle = '#aaa';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(wc.name, x + groupW/2, startY + maxBarH + 14);

        if(result) {
            ctx.fillStyle = result === 'win' ? '#4a8' : '#f44';
            ctx.font = 'bold 8px sans-serif';
            ctx.fillText(result === 'win' ? '승' : '패', x + groupW/2, startY + maxBarH + 26);
        }
    });

    ctx.fillStyle = '#4488ff';
    ctx.fillRect(W - 90, H - 18, 10, 10);
    ctx.fillStyle = '#aaa';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('아군', W - 76, H - 9);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(W - 48, H - 18, 10, 10);
    ctx.fillText('적군', W - 34, H - 9);
}

function simulateBattle(id) {
    var wc = WAR_CAMPAIGNS.find(function(x){return x.id===id;});
    if(!wc) return;
    var allyPower = wc.allyBase * (1.5 + Math.random() * 1.0);
    var enemyPower = wc.enemyBase * (0.5 + Math.random() * 0.8);
    var won = allyPower >= enemyPower;

    v15State.warResults[id] = won ? 'win' : 'lose';
    if(won) {
        v15State.warWins++;
        if(typeof resources !== 'undefined') {
            resources.gold += wc.reward.gold;
            resources.culture = (resources.culture || 0) + wc.reward.culture;
        }
        playV15SFX('war_victory');
        if(typeof toast !== 'undefined' && toast) toast('⚔️ ' + wc.name + ' 승리! 금 +' + wc.reward.gold + ', 문화 +' + wc.reward.culture);
        if(typeof addChronicle === 'function') addChronicle(wc.icon, wc.name + '에서 대승을 거두었습니다!');
    } else {
        playV15SFX('war_attack');
        if(typeof toast !== 'undefined' && toast) toast('💀 ' + wc.name + ' 패배... 재도전하세요!');
        if(typeof addChronicle === 'function') addChronicle('💀', wc.name + '에서 패배했습니다. 재정비가 필요합니다.');
    }
    saveV15State();
    var panel = document.getElementById('v15-war-panel');
    if(panel) { panel.remove(); openWarPanel(); }
}

// ===================== GLOBAL EXPOSE =====================
window.openWaterPanel = openWaterPanel;
window.buildWaterFacility = buildWaterFacility;
window.openEpidemicPanel = openEpidemicPanel;
window.applyEpidemicAction = applyEpidemicAction;
window.openEducationPanel = openEducationPanel;
window.upgradeEducation = upgradeEducation;
window.openNightPanel = openNightPanel;
window.placeLantern = placeLantern;
window.openTaxPanel = openTaxPanel;
window.adjustTaxRate = adjustTaxRate;
window.collectTaxes = collectTaxes;
window.openPopulationPanel = openPopulationPanel;
window.openTimelinePanel = openTimelinePanel;
window.unlockMilestone = unlockMilestone;
window.openWarPanel = openWarPanel;
window.simulateBattle = simulateBattle;

// ===================== UI INJECTION =====================
function addV15UI() {
    var scrollNav = document.createElement('div');
    scrollNav.className = 'v15-scroll-nav';
    scrollNav.innerHTML = '<button class="v15-nav-btn" onclick="openWaterPanel()">💧 수도</button>' +
        '<button class="v15-nav-btn" onclick="openEpidemicPanel()">🦠 전염병</button>' +
        '<button class="v15-nav-btn" onclick="openEducationPanel()">📚 교육</button>' +
        '<button class="v15-nav-btn" onclick="openNightPanel()">🌙 야경</button>' +
        '<button class="v15-nav-btn" onclick="openTaxPanel()">💰 세금</button>' +
        '<button class="v15-nav-btn" onclick="openPopulationPanel()">👥 인구</button>' +
        '<button class="v15-nav-btn" onclick="openTimelinePanel()">📅 타임라인</button>' +
        '<button class="v15-nav-btn" onclick="openWarPanel()">⚔️ 전쟁</button>';
    document.body.appendChild(scrollNav);

    var existingV14Nav = document.querySelector('.v14-scroll-nav');
    if(existingV14Nav) {
        existingV14Nav.style.bottom = '40px';
    }
    var existingV13Nav = document.querySelector('.v13-scroll-nav');
    if(existingV13Nav) {
        existingV13Nav.style.bottom = '80px';
    }
}

// ===================== GAME TICK HOOKS =====================
function hookV15GameTick() {
    if(typeof window.nextTurn === 'function') {
        var origNextTurn = window.nextTurn;
        window.nextTurn = function() {
            origNextTurn.apply(this, arguments);

            if(v15State.waterSupply > 0 && typeof resources !== 'undefined') {
                var waterBonus = Math.floor(v15State.waterSupply * 0.3);
                resources.food = (resources.food || 0) + waterBonus;
            }

            if(v15State.eduLevel > 0 && typeof resources !== 'undefined') {
                var eduTier = EDU_TIERS[v15State.eduLevel];
                resources.culture = (resources.culture || 0) + Math.floor(eduTier.cultureBonus * 0.1);
            }

            EPIDEMICS.forEach(function(ep) {
                if(v15State.epidemicsCured[ep.id]) return;
                var status = v15State.epidemicStatus[ep.id];
                if(!status) return;
                if(status.severity > 0 && status.containment < status.severity) {
                    status.severity = Math.min(100, status.severity + 2);
                    if(typeof resources !== 'undefined' && Math.random() < 0.1) {
                        resources.pop = Math.max(0, (resources.pop || 0) - 1);
                    }
                }
            });

            var taxRevenue = calcV15TotalRevenue();
            if(taxRevenue > 0 && typeof resources !== 'undefined') {
                resources.gold += Math.floor(taxRevenue * 0.1);
            }

            saveV15State();
        };
    }
}

// ===================== QUIZ HOOK =====================
function hookV15Quiz() {
    if(typeof quizQuestions !== 'undefined' && Array.isArray(quizQuestions)) {
        V15_QUIZ.forEach(function(q) {
            quizQuestions.push({
                question: q.q,
                answers: q.a,
                correct: q.c
            });
        });
    }
}

// ===================== ACHIEVEMENTS HOOK =====================
function hookV15Achievements() {
    if(typeof achievements !== 'undefined' && Array.isArray(achievements)) {
        V15_ACHIEVEMENTS.forEach(function(a) {
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

function hookV15CheckAchievements() {
    if(typeof window.checkAchievements === 'function') {
        var origCheck = window.checkAchievements;
        window.checkAchievements = function() {
            origCheck.apply(this, arguments);
            V15_ACHIEVEMENTS.forEach(function(a) {
                if(typeof earnedAchievements !== 'undefined' && !earnedAchievements.has(a.id) && a.check()) {
                    earnedAchievements.add(a.id);
                    playV15SFX('war_victory');
                    if(typeof toast !== 'undefined' && toast) toast('🏆 업적 달성: ' + a.icon + ' ' + a.name);
                    if(typeof addChronicle === 'function') addChronicle('🏆', '업적 달성: ' + a.name);
                }
            });
        };
    }
}

// ===================== ADVISOR TIPS =====================
function hookV15AdvisorTips() {
    if(typeof advisorTips !== 'undefined' && Array.isArray(advisorTips)) {
        advisorTips.push(
            '💧 수도시설을 건설하면 급수량이 늘어나 식량 생산이 증가합니다.',
            '🦠 전염병이 퍼지기 전에 격리와 약재로 대응하세요.',
            '📚 교육 수준을 높이면 문화와 인구 보너스가 영구 적용됩니다.',
            '🌙 야간 등불을 설치하면 도시 문화가 올라갑니다.',
            '💰 세율을 조정하여 세수와 민심의 균형을 맞추세요.',
            '👥 인구 피라미드를 분석하여 사회 균형을 유지하세요.',
            '📅 역사 업적을 해금하면 문화 보너스를 얻습니다.',
            '⚔️ 전쟁에서 승리하면 금과 문화를 획득합니다.'
        );
    }
}

// ===================== KEYBOARD =====================
function hookV15Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        if(document.querySelector('.v15-overlay')) return;
        var key = e.key.toUpperCase();
        switch(key) {
            case 'W': e.preventDefault(); openWaterPanel(); break;
            case 'E': e.preventDefault(); openEpidemicPanel(); break;
            case 'D': e.preventDefault(); openEducationPanel(); break;
            case 'N': e.preventDefault(); openNightPanel(); break;
            case 'T': e.preventDefault(); openTaxPanel(); break;
            case 'P': e.preventDefault(); openPopulationPanel(); break;
            case 'L': e.preventDefault(); openTimelinePanel(); break;
            case 'C': e.preventDefault(); openWarPanel(); break;
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV15AutoSave() {
    setInterval(function() { saveV15State(); }, 30000);
}

function saveV15State() {
    try {
        localStorage.setItem('v15WaterState', JSON.stringify(v15State.waterBuilt));
        localStorage.setItem('v15EpidemicState', JSON.stringify({status: v15State.epidemicStatus, cured: v15State.epidemicsCured}));
        localStorage.setItem('v15EduState', JSON.stringify({level: v15State.eduLevel}));
        localStorage.setItem('v15NightState', JSON.stringify({lanternCount: v15State.lanternCount}));
        localStorage.setItem('v15TaxState', JSON.stringify(v15State.taxRates));
        localStorage.setItem('v15PopState', JSON.stringify(v15State.popClasses));
        localStorage.setItem('v15TimelineState', JSON.stringify(v15State.milestonesUnlocked));
        localStorage.setItem('v15WarState', JSON.stringify({results: v15State.warResults, wins: v15State.warWins}));
        localStorage.setItem('cityV15State', JSON.stringify(v15State));
    } catch(e) {}
}

function loadV15State() {
    try {
        var raw = localStorage.getItem('cityV15State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.waterBuilt) v15State.waterBuilt = state.waterBuilt;
        if(typeof state.waterSupply === 'number') v15State.waterSupply = state.waterSupply;
        if(state.epidemicStatus) v15State.epidemicStatus = state.epidemicStatus;
        if(state.epidemicsCured) v15State.epidemicsCured = state.epidemicsCured;
        if(typeof state.eduLevel === 'number') v15State.eduLevel = state.eduLevel;
        if(typeof state.lanternCount === 'number') v15State.lanternCount = state.lanternCount;
        if(state.lanternPositions) v15State.lanternPositions = state.lanternPositions;
        if(state.taxRates) v15State.taxRates = state.taxRates;
        if(state.popClasses) v15State.popClasses = state.popClasses;
        if(state.milestonesUnlocked) v15State.milestonesUnlocked = state.milestonesUnlocked;
        if(typeof state.timelineScroll === 'number') v15State.timelineScroll = state.timelineScroll;
        if(state.warResults) v15State.warResults = state.warResults;
        if(typeof state.warWins === 'number') v15State.warWins = state.warWins;
        if(state.features) v15State.features = state.features;
    } catch(e) {}
}

// ===================== INIT =====================
function initV15() {
    loadV15State();
    addV15UI();
    hookV15GameTick();
    hookV15Quiz();
    hookV15Achievements();
    hookV15CheckAchievements();
    hookV15AdvisorTips();
    hookV15AutoSave();
    hookV15Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('💧 v15.0: 수도+전염병+교육+야경+세금+인구+타임라인+전쟁!');
        }, 13000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV15, 4500); });
} else {
    setTimeout(initV15, 4500);
}

})();
