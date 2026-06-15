// =====================================================================
// city-builder v11_patch.js — PRIME Holdings NEXTERA+PRISM v11.0
// Self-contained IIFE patch: Legal System 12 laws, Academy 8 disciplines,
// Market Economy Simulator 6 goods, Disaster Response 8 types,
// Festival Planner 12 festivals, City Comparison Analyzer 5 cities,
// Voice of the People 10 petitions, History Figure Quiz Battle 5 opponents,
// +15 Quiz (100→115), +12 Achievements (98→110),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v11Ctx = null;
function getV11Audio() {
    if(!v11Ctx) {
        try { v11Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v11Ctx;
}
function playV11SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV11Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.13, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'law_enact':
            [392,494,588,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'academy_study':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.2);
            o.frequency.linearRampToValueAtTime(880, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.45);
            break;
        case 'market_trade':
            [523,659,784,659,523].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.12);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.12);
            });
            break;
        case 'disaster_drill':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(200, now);
            o.frequency.linearRampToValueAtTime(400, now+0.1);
            o.frequency.linearRampToValueAtTime(200, now+0.2);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'festival_start':
            [523,659,784,988,1175,988].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.18);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.18);
            });
            break;
        case 'compare_view':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(600, now);
            o.frequency.linearRampToValueAtTime(900, now+0.15);
            g.gain.setValueAtTime(0.07, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'petition_resolve':
            [440,554,659].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'quiz_battle':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(330, now);
            o.frequency.setValueAtTime(440, now+0.1);
            o.frequency.setValueAtTime(554, now+0.2);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'quiz_win':
            [784,988,1175,1568].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.25);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.25);
            });
            break;
        case 'quiz_lose':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(300, now);
            o.frequency.linearRampToValueAtTime(100, now+0.4);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.5);
            o.connect(g); o.start(now); o.stop(now+0.45);
            break;
        case 'achievement_v11':
            [880,1047,1175,1319,1568].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.2);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.2);
            });
            break;
        case 'feature_open':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(698, now);
            o.frequency.setValueAtTime(880, now+0.08);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.18);
            break;
    }
}

// ===================== CSS =====================
var V11_CSS = '\
.v11-btn {\
    position: fixed; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
.v11-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
.v11-panel.show { display: flex; }\
.v11-box {\
    border-radius: 16px; padding: 24px; max-width: 560px; width: 100%;\
    max-height: 85vh; overflow-y: auto;\
}\
.v11-box h2 { text-align: center; margin-bottom: 12px; }\
.v11-close {\
    display: block; margin: 16px auto 0; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
.v11-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);\
}\
.v11-item .vi { font-size: 24px; }\
.v11-item .vn { flex: 1; }\
.v11-item .vn strong { font-size: 13px; }\
.v11-item .vn .vdet { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.v11-item .vact button {\
    border: none; color: #fff; padding: 5px 12px;\
    border-radius: 8px; font-size: 11px; cursor: pointer;\
}\
.v11-item .vact button:disabled { background: #555; cursor: not-allowed; color: #999; }\
#law-panel .v11-box { background: linear-gradient(145deg, #2a2020, #1a1010); border: 2px solid #cc6633; }\
#law-panel h2 { color: #ff9966; }\
#law-panel .v11-close { background: #cc6633; }\
#law-panel .vn strong { color: #ffaa77; }\
#law-panel .vact button { background: #cc6633; }\
#law-panel .vact button:hover { background: #dd7744; }\
#academy-panel .v11-box { background: linear-gradient(145deg, #1a2030, #0a1020); border: 2px solid #3377cc; }\
#academy-panel h2 { color: #66aaff; }\
#academy-panel .v11-close { background: #3377cc; }\
#academy-panel .vn strong { color: #88ccff; }\
#academy-panel .vact button { background: #3377cc; }\
#academy-panel .vact button:hover { background: #4488dd; }\
#market-panel .v11-box { background: linear-gradient(145deg, #2a2a15, #1a1a08); border: 2px solid #ccaa33; }\
#market-panel h2 { color: #ffdd66; }\
#market-panel .v11-close { background: #ccaa33; }\
#market-panel .vn strong { color: #ffee88; }\
#market-panel .vact button { background: #ccaa33; }\
#market-panel .vact button:hover { background: #ddbb44; }\
#disaster-panel .v11-box { background: linear-gradient(145deg, #2a1520, #1a0810); border: 2px solid #cc3366; }\
#disaster-panel h2 { color: #ff6699; }\
#disaster-panel .v11-close { background: #cc3366; }\
#disaster-panel .vn strong { color: #ff88aa; }\
#disaster-panel .vact button { background: #cc3366; }\
#disaster-panel .vact button:hover { background: #dd4477; }\
#festival-panel .v11-box { background: linear-gradient(145deg, #201530, #100820); border: 2px solid #aa44cc; }\
#festival-panel h2 { color: #cc77ff; }\
#festival-panel .v11-close { background: #aa44cc; }\
#festival-panel .vn strong { color: #dd99ff; }\
#festival-panel .vact button { background: #aa44cc; }\
#festival-panel .vact button:hover { background: #bb55dd; }\
#compare-panel .v11-box { background: linear-gradient(145deg, #152520, #081a10); border: 2px solid #33aa77; max-width: 580px; }\
#compare-panel h2 { color: #66ddaa; }\
#compare-panel .v11-close { background: #33aa77; }\
#petition-panel .v11-box { background: linear-gradient(145deg, #202520, #101a10); border: 2px solid #77aa33; }\
#petition-panel h2 { color: #aadd66; }\
#petition-panel .v11-close { background: #77aa33; }\
#petition-panel .vn strong { color: #bbee77; }\
#petition-panel .vact button { background: #77aa33; }\
#petition-panel .vact button:hover { background: #88bb44; }\
#quizbattle-panel .v11-box { background: linear-gradient(145deg, #2a1a2a, #1a0a1a); border: 2px solid #cc44aa; max-width: 580px; }\
#quizbattle-panel h2 { color: #ff77cc; }\
#quizbattle-panel .v11-close { background: #cc44aa; }\
#academy-canvas { width: 100%; height: 400px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
#market-canvas { width: 100%; height: 220px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
#compare-canvas { width: 100%; height: 360px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
.v11-cat-label {\
    font-size: 12px; font-weight: bold; padding: 6px 0 4px; margin-top: 8px;\
    border-bottom: 1px solid rgba(255,255,255,0.1);\
}\
.v11-festival-season {\
    font-size: 12px; font-weight: bold; padding: 6px 0 4px; margin-top: 8px;\
    border-bottom: 1px solid rgba(255,255,255,0.1);\
}\
.v11-petition-card {\
    padding: 10px 14px; margin-bottom: 6px; border-radius: 10px;\
    background: rgba(255,255,255,0.05); border: 1px solid rgba(119,170,51,0.2);\
    display: flex; align-items: center; gap: 10px;\
}\
.v11-petition-card .pp-icon { font-size: 22px; }\
.v11-petition-card .pp-info { flex: 1; }\
.v11-petition-card .pp-title { font-weight: bold; color: #bbee77; font-size: 13px; }\
.v11-petition-card .pp-desc { font-size: 11px; color: #aaa; margin-top: 2px; }\
.v11-petition-card .pp-priority { font-size: 10px; margin-top: 2px; }\
.v11-qb-opponent {\
    display: flex; align-items: center; gap: 14px; padding: 14px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(204,68,170,0.2);\
    cursor: pointer; transition: background 0.2s;\
}\
.v11-qb-opponent:hover { background: rgba(204,68,170,0.1); }\
.v11-qb-opponent .qo-icon { font-size: 32px; }\
.v11-qb-opponent .qo-info { flex: 1; }\
.v11-qb-opponent .qo-name { font-weight: bold; color: #ff77cc; font-size: 14px; }\
.v11-qb-opponent .qo-era { font-size: 10px; color: #cc5599; }\
.v11-qb-opponent .qo-desc { font-size: 11px; color: #aaa; margin-top: 3px; }\
.v11-qb-opponent .qo-record { font-size: 11px; color: #ffaadd; margin-top: 4px; }\
@media (max-width: 600px) {\
    .v11-left-btns { display: none !important; }\
}\
';

// ===================== DATA =====================

var LAWS = [
    { id: 'criminal_1', cat: '형법', icon: '⚖️', name: '도적 처벌법', desc: '도적 및 강도 엄벌. 치안 +10, 행복 +3.', cost: 80, effect: { safety: 10, happy: 3 } },
    { id: 'criminal_2', cat: '형법', icon: '🔒', name: '반역죄법', desc: '반역 행위 엄단. 방어력 +5, 치안 +8.', cost: 100, effect: { safety: 8, defense: 5 } },
    { id: 'criminal_3', cat: '형법', icon: '🛡️', name: '치안유지법', desc: '야간 순찰 강화. 치안 +15, 범죄 감소.', cost: 120, effect: { safety: 15 } },
    { id: 'criminal_4', cat: '형법', icon: '📋', name: '형률 통일법', desc: '전국 형벌 통일. 치안 +5, 문화 +5.', cost: 90, effect: { safety: 5, culture: 5 } },
    { id: 'civil_1', cat: '민법', icon: '🏠', name: '토지소유법', desc: '토지 소유권 보장. 행복 +8, 금 수입 +5%.', cost: 100, effect: { happy: 8, goldPct: 5 } },
    { id: 'civil_2', cat: '민법', icon: '👨‍👩‍👧', name: '가족보호법', desc: '가족 제도 보호. 인구 성장 +10%.', cost: 80, effect: { popGrowth: 10 } },
    { id: 'civil_3', cat: '민법', icon: '📜', name: '계약이행법', desc: '상거래 계약 보호. 교역 수입 +10%.', cost: 110, effect: { tradePct: 10 } },
    { id: 'trade_1', cat: '상법', icon: '🏪', name: '시장규제법', desc: '공정 거래 보장. 물가 안정, 행복 +5.', cost: 90, effect: { happy: 5, marketStable: 10 } },
    { id: 'trade_2', cat: '상법', icon: '🚢', name: '해상교역법', desc: '해상 무역 장려. 교역 수입 +15%.', cost: 130, effect: { tradePct: 15 } },
    { id: 'trade_3', cat: '상법', icon: '💱', name: '화폐통일법', desc: '전국 화폐 통일. 금 수입 +10%, 교역 효율 증가.', cost: 150, effect: { goldPct: 10 } },
    { id: 'military_1', cat: '군법', icon: '🎖️', name: '징병법', desc: '병력 충원 체계화. 방어력 +10.', cost: 100, effect: { defense: 10 } },
    { id: 'military_2', cat: '군법', icon: '⚔️', name: '군율법', desc: '군기 확립. 방어력 +8, 군사 효율 +10%.', cost: 120, effect: { defense: 8, milEff: 10 } }
];

var ACADEMY_DISCIPLINES = [
    { id: 'confucian', icon: '📖', name: '유학', desc: '인의예지 연구. 문화와 행복 증가.', costFood: 30, costGold: 40, bonus: { culture: 5, happy: 3 } },
    { id: 'buddhism', icon: '🙏', name: '불학', desc: '불교 사상 연구. 행복과 인구 성장.', costFood: 25, costGold: 45, bonus: { happy: 5, popGrowth: 3 } },
    { id: 'astronomy', icon: '🌟', name: '천문학', desc: '천체 관측 연구. 재해 예측 및 농업 효율.', costFood: 35, costGold: 50, bonus: { foodPct: 5, disasterReduce: 5 } },
    { id: 'medicine', icon: '💊', name: '의학', desc: '의술 연구. 인구 성장과 역병 대응.', costFood: 40, costGold: 35, bonus: { popGrowth: 5, plagueReduce: 10 } },
    { id: 'agriculture', icon: '🌾', name: '농학', desc: '농법 연구. 식량 생산 크게 증가.', costFood: 20, costGold: 30, bonus: { foodPct: 10 } },
    { id: 'military_study', icon: '🗡️', name: '병학', desc: '병법 연구. 방어력과 군사 효율 증가.', costFood: 30, costGold: 55, bonus: { defense: 5, milEff: 5 } },
    { id: 'mathematics', icon: '🔢', name: '수학', desc: '산학 연구. 건설 비용 감소, 금 효율 증가.', costFood: 25, costGold: 40, bonus: { buildDiscount: 5, goldPct: 3 } },
    { id: 'arts', icon: '🎨', name: '예학', desc: '예술 및 예법 연구. 문화와 외교 관계 증진.', costFood: 20, costGold: 35, bonus: { culture: 8, diploPct: 5 } }
];

var MARKET_GOODS = [
    { id: 'rice', icon: '🍚', name: '쌀', basePrice: 10, volatility: 3 },
    { id: 'iron', icon: '⛏️', name: '철', basePrice: 25, volatility: 5 },
    { id: 'silk', icon: '🧵', name: '비단', basePrice: 40, volatility: 8 },
    { id: 'pottery', icon: '🏺', name: '도자기', basePrice: 35, volatility: 6 },
    { id: 'herbs', icon: '🌿', name: '약초', basePrice: 20, volatility: 4 },
    { id: 'salt', icon: '🧂', name: '소금', basePrice: 15, volatility: 3 }
];

var DISASTERS = [
    { id: 'earthquake', icon: '🌋', name: '지진', desc: '건물 파괴 및 인명 피해. 기본 피해: 인구 -10, 금 -50.', baseDmg: { pop: 10, gold: 50 } },
    { id: 'flood', icon: '🌊', name: '홍수', desc: '농경지 침수 및 식량 손실. 기본 피해: 식량 -80, 금 -30.', baseDmg: { food: 80, gold: 30 } },
    { id: 'drought', icon: '☀️', name: '가뭄', desc: '장기 건조로 작물 고사. 기본 피해: 식량 -100.', baseDmg: { food: 100 } },
    { id: 'plague', icon: '🦠', name: '역병', desc: '전염병 확산. 기본 피해: 인구 -20, 행복 -15.', baseDmg: { pop: 20, happy: 15 } },
    { id: 'fire', icon: '🔥', name: '화재', desc: '대규모 화재. 기본 피해: 금 -80, 건물 손상.', baseDmg: { gold: 80 } },
    { id: 'typhoon', icon: '🌀', name: '태풍', desc: '강풍과 폭우. 기본 피해: 식량 -60, 금 -40.', baseDmg: { food: 60, gold: 40 } },
    { id: 'landslide', icon: '⛰️', name: '산사태', desc: '산지 붕괴. 기본 피해: 인구 -8, 금 -30.', baseDmg: { pop: 8, gold: 30 } },
    { id: 'locusts', icon: '🦗', name: '메뚜기떼', desc: '농작물 전멸. 기본 피해: 식량 -120.', baseDmg: { food: 120 } }
];

var FESTIVALS = [
    { id: 'spring_1', season: '봄', icon: '🌸', name: '화전놀이', desc: '꽃을 보며 즐기는 봄 잔치.', cost: 40, duration: 3, buff: { happy: 10, culture: 5 } },
    { id: 'spring_2', season: '봄', icon: '🌿', name: '단오제', desc: '액막이와 풍년 기원.', cost: 50, duration: 3, buff: { happy: 8, food: 20 } },
    { id: 'spring_3', season: '봄', icon: '🎋', name: '삼짇날', desc: '봄 제비를 맞이하는 절기 축제.', cost: 35, duration: 2, buff: { happy: 6, culture: 3 } },
    { id: 'summer_1', season: '여름', icon: '🎆', name: '유두절', desc: '동쪽 흐르는 물에 머리 감는 풍습.', cost: 45, duration: 3, buff: { happy: 12, pop: 5 } },
    { id: 'summer_2', season: '여름', icon: '🏊', name: '천렵놀이', desc: '강에서 물고기 잡고 음식 나누기.', cost: 30, duration: 2, buff: { food: 30, happy: 5 } },
    { id: 'summer_3', season: '여름', icon: '🥁', name: '백중놀이', desc: '농번기 중 쉬어가는 백성의 축제.', cost: 40, duration: 3, buff: { happy: 15 } },
    { id: 'autumn_1', season: '가을', icon: '🌕', name: '한가위(추석)', desc: '풍성한 수확을 감사하는 명절.', cost: 60, duration: 4, buff: { happy: 20, food: 40, culture: 10 } },
    { id: 'autumn_2', season: '가을', icon: '🍂', name: '중양절', desc: '국화주를 마시며 장수를 기원.', cost: 35, duration: 2, buff: { happy: 8, culture: 5 } },
    { id: 'autumn_3', season: '가을', icon: '🎑', name: '풍년제', desc: '수확 감사 제사. 다음 해 풍년 기원.', cost: 50, duration: 3, buff: { food: 50, happy: 10 } },
    { id: 'winter_1', season: '겨울', icon: '🎍', name: '설날', desc: '새해를 맞이하는 최대 명절.', cost: 70, duration: 4, buff: { happy: 25, culture: 15, gold: 20 } },
    { id: 'winter_2', season: '겨울', icon: '🥣', name: '동지', desc: '팥죽으로 잡귀를 쫓는 절기.', cost: 25, duration: 2, buff: { happy: 8, pop: 3 } },
    { id: 'winter_3', season: '겨울', icon: '🏮', name: '정월대보름', desc: '달맞이와 오곡밥. 부럼 깨기.', cost: 40, duration: 3, buff: { happy: 12, food: 20, culture: 5 } }
];

var AI_CITIES = [
    { id: 'gyeongju', name: '경주', era: '신라 수도', stats: { pop: 85, mil: 70, culture: 95, economy: 75, infra: 60, diplo: 65 } },
    { id: 'gaegyeong', name: '개경', era: '고려 수도', stats: { pop: 80, mil: 65, culture: 80, economy: 85, infra: 70, diplo: 80 } },
    { id: 'hanyang', name: '한양', era: '조선 수도', stats: { pop: 90, mil: 75, culture: 90, economy: 80, infra: 85, diplo: 70 } },
    { id: 'pyongyang', name: '평양', era: '고구려 수도', stats: { pop: 70, mil: 90, culture: 60, economy: 65, infra: 55, diplo: 50 } },
    { id: 'buyeo', name: '부여', era: '백제 수도', stats: { pop: 65, mil: 60, culture: 85, economy: 70, infra: 50, diplo: 75 } }
];

var PETITION_TYPES = [
    { id: 'tax_reduce', icon: '💰', name: '세금 감면 청원', desc: '세금이 너무 높습니다! 감면을 요청합니다.', cost: 30, reward: { happy: 8 }, priority: '높음' },
    { id: 'road_repair', icon: '🛤️', name: '도로 보수 청원', desc: '도로가 파손되어 통행이 불편합니다.', cost: 25, reward: { happy: 5, tradePct: 3 }, priority: '보통' },
    { id: 'school_build', icon: '🏫', name: '학교 설립 청원', desc: '마을에 학교를 세워주십시오.', cost: 50, reward: { culture: 8, happy: 6 }, priority: '높음' },
    { id: 'well_dig', icon: '💧', name: '우물 개설 청원', desc: '깨끗한 물이 부족합니다.', cost: 20, reward: { pop: 5, happy: 4 }, priority: '보통' },
    { id: 'market_open', icon: '🏪', name: '장터 개설 청원', desc: '가까운 곳에 장터를 열어주세요.', cost: 35, reward: { gold: 10, happy: 5 }, priority: '보통' },
    { id: 'guard_patrol', icon: '🛡️', name: '순찰 강화 청원', desc: '밤에 도적이 출몰합니다. 순찰을 늘려주세요.', cost: 30, reward: { happy: 7, safety: 5 }, priority: '높음' },
    { id: 'temple_build', icon: '🛕', name: '사찰 건립 청원', desc: '마을에 기도할 곳이 필요합니다.', cost: 45, reward: { culture: 10, happy: 4 }, priority: '낮음' },
    { id: 'bridge_build', icon: '🌉', name: '다리 건설 청원', desc: '강을 건너기 어렵습니다. 다리를 놓아주세요.', cost: 40, reward: { tradePct: 5, happy: 5 }, priority: '보통' },
    { id: 'medicine_supply', icon: '💊', name: '약재 공급 청원', desc: '병자가 많은데 약이 부족합니다.', cost: 35, reward: { pop: 8, happy: 6 }, priority: '높음' },
    { id: 'festival_request', icon: '🎉', name: '축제 개최 청원', desc: '백성들이 즐길 축제를 열어주세요.', cost: 25, reward: { happy: 12 }, priority: '낮음' }
];

var QUIZ_OPPONENTS = [
    { id: 'sejong_qb', icon: '📜', name: '세종대왕', era: '조선', desc: '학문을 사랑한 성군. 정답률 80%.', accuracy: 0.80, personality: '어려운 문제도 침착하게 풀어내신다.' },
    { id: 'yisunsin_qb', icon: '🐢', name: '이순신', era: '조선', desc: '불패의 명장. 정답률 70%.', accuracy: 0.70, personality: '전략적으로 접근하시는 모습이다.' },
    { id: 'eulji_qb', icon: '🎖️', name: '을지문덕', era: '고구려', desc: '살수대첩의 영웅. 정답률 65%.', accuracy: 0.65, personality: '적을 속이듯 예상 밖의 답을 고르신다.' },
    { id: 'gangamchan_qb', icon: '⚔️', name: '강감찬', era: '고려', desc: '귀주대첩의 명장. 정답률 75%.', accuracy: 0.75, personality: '신중하게 답을 고르시는 모습이다.' },
    { id: 'gwanggaeto_qb', icon: '👑', name: '광개토대왕', era: '고구려', desc: '대륙의 정복자. 정답률 60%.', accuracy: 0.60, personality: '과감하게 답을 정하시는 모습이다.' }
];

var QB_QUESTIONS = [
    { q: '한글(훈민정음)이 반포된 해는?', a: ['1443년','1446년','1420년','1450년'], c: 1 },
    { q: '거북선을 처음 사용한 해전은?', a: ['사천해전','한산도대첩','명량해전','노량해전'], c: 0 },
    { q: '고려 시대 금속활자로 인쇄된 최초의 책은?', a: ['직지심체요절','팔만대장경','삼국사기','삼국유사'], c: 0 },
    { q: '삼국사기를 편찬한 사람은?', a: ['김부식','일연','정도전','이이'], c: 0 },
    { q: '조선의 건국 연도는?', a: ['1392년','1388년','1398년','1400년'], c: 0 },
    { q: '고구려의 수도가 아닌 것은?', a: ['졸본','국내성','평양','한양'], c: 3 },
    { q: '신라의 골품제에서 최고 등급은?', a: ['성골','진골','6두품','5두품'], c: 0 },
    { q: '조선 시대 사림파가 주도한 정치 형태는?', a: ['붕당정치','세도정치','훈구정치','환관정치'], c: 0 },
    { q: '임진왜란이 일어난 해는?', a: ['1592년','1597년','1588년','1600년'], c: 0 },
    { q: '대한민국 임시정부가 수립된 도시는?', a: ['상하이','난징','베이징','충칭'], c: 0 }
];

var V11_QUIZ = [
    { q: '조선시대 형법의 기본 법전은?', a: ['경국대전','대명률','대전통편','속대전'], c: 0, h: '경국대전(1485)은 조선의 기본 법전으로, 이전/호전/예전/병전/형전/공전의 6전 체계입니다.' },
    { q: '고려 시대 최고 교육기관은?', a: ['국자감','성균관','향교','서원'], c: 0, h: '국자감은 고려 시대 최고 교육기관으로, 조선 시대의 성균관에 해당합니다.' },
    { q: '조선시대 시장을 여는 날의 간격은?', a: ['5일','3일','7일','10일'], c: 0, h: '조선시대 장시(場市)는 5일마다 열려 &quot;5일장&quot;이라 불렸습니다.' },
    { q: '조선 시대 전국적으로 유행한 역병으로 올바른 것은?', a: ['두창(천연두)','콜레라','말라리아','결핵'], c: 0, h: '두창(천연두)은 조선시대 가장 무서운 전염병으로 많은 인명을 앗아갔습니다.' },
    { q: '추석의 원래 이름은?', a: ['한가위','가배','추석절','중추절'], c: 0, h: '한가위는 &quot;한&quot;(큰)+&quot;가위&quot;(가운데)로, 가을의 한가운데 큰 날이라는 뜻입니다.' },
    { q: '조선 시대 최초의 사설 교육기관은?', a: ['백운동서원','도산서원','소수서원','옥산서원'], c: 0, h: '백운동서원(1543)은 주세붕이 세운 최초의 서원으로, 후에 소수서원으로 사액 받았습니다.' },
    { q: '고려 시대 국제 무역항은?', a: ['벽란도','울산항','부산포','제물포'], c: 0, h: '벽란도는 고려의 국제 무역항으로, 아라비아 상인도 내왕한 국제 교역의 중심지였습니다.' },
    { q: '조선왕조실록이 보관된 장소를 무엇이라 하는가?', a: ['사고','문묘','종묘','사직'], c: 0, h: '사고(史庫)는 실록을 보관하는 곳으로, 전주·태백·정족산·오대산 등에 설치되었습니다.' },
    { q: '조선 시대 홍수 대비 시설은?', a: ['수표','측우기','자격루','혼천의'], c: 0, h: '수표는 하천 수위를 측정하는 도구로, 세종 때 청계천에 설치되었습니다.' },
    { q: '신라의 대표적인 축제 문화는?', a: ['팔관회','연등회','수릿날','한식'], c: 0, h: '팔관회는 신라·고려의 대표적 국가 축제로, 토속신앙과 불교 행사가 결합되었습니다.' },
    { q: '조선 시대 과거 시험의 종류가 아닌 것은?', a: ['문과','무과','잡과','법과'], c: 3, h: '조선의 과거는 문과·무과·잡과의 3종류이며, &quot;법과&quot;는 존재하지 않았습니다.' },
    { q: '고려 시대 최대 자연재해로 기록된 것은?', a: ['1231년 가뭄','1274년 태풍','1304년 지진','1362년 홍수'], c: 2, h: '1304년 개경 일대에 큰 지진이 발생해 건물 피해와 인명 손실이 기록되었습니다.' },
    { q: '조선 시대 장시에서 거래된 대표 상품이 아닌 것은?', a: ['쌀','소금','비단','석유'], c: 3, h: '석유는 근대 이후 사용된 자원으로, 조선 시대 장시에서는 거래되지 않았습니다.' },
    { q: '고려의 국자감에서 가르친 과목이 아닌 것은?', a: ['유학','율학','서학','전산학'], c: 3, h: '국자감에서는 유학·율학·서학(서예)·산학 등을 가르쳤으나, 전산학은 현대 학문입니다.' },
    { q: '세종대왕이 설치한 학문 연구 기관은?', a: ['집현전','규장각','성균관','예문관'], c: 0, h: '집현전은 세종이 학자들을 모아 한글 창제 등 학문 연구를 수행하게 한 기관입니다.' }
];

var V11_ACHIEVEMENTS = [
    { id: 'v11_law_6', icon: '⚖️', title: '입법자', desc: '법률 6개 이상 제정' },
    { id: 'v11_law_all', icon: '📜', title: '법전 완성', desc: '모든 법률 제정' },
    { id: 'v11_academy_master', icon: '🎓', title: '학문의 달인', desc: '학문 분야 4개 이상 3단계 달성' },
    { id: 'v11_market_profit', icon: '💰', title: '거상', desc: '시장에서 총 500금 이상 수익' },
    { id: 'v11_disaster_all', icon: '🛡️', title: '재해 대비 완료', desc: '모든 재해 훈련 완료' },
    { id: 'v11_festival_6', icon: '🎉', title: '축제의 왕', desc: '축제 6개 이상 개최' },
    { id: 'v11_compare', icon: '📊', title: '도시 분석가', desc: '도시 비교 분석기 사용' },
    { id: 'v11_petition_5', icon: '📋', title: '민심 수렴', desc: '청원 5개 이상 해결' },
    { id: 'v11_qb_win', icon: '🏆', title: '퀴즈 챔피언', desc: '퀴즈 대결에서 승리' },
    { id: 'v11_qb_allwin', icon: '👑', title: '역사 박사', desc: '모든 상대에게 승리' },
    { id: 'v11_all_systems', icon: '🌟', title: 'v11 정복자', desc: 'v11.0의 모든 기능 체험' },
    { id: 'v11_quiz_115', icon: '🧠', title: '퀴즈 마스터', desc: '퀴즈 115문제 전부 정답' }
];

// ===================== STATE =====================
var lawEnacted = {};
var academyLevels = {};
var marketPrices = {};
var marketHistory = {};
var marketInventory = {};
var marketTotalProfit = 0;
var drillCompletion = {};
var festivalActive = {};
var festivalCount = 0;
var petitionQueue = [];
var petitionResolved = 0;
var qbWins = {};
var v11Features = {};
var v11TickCount = 0;

function initV11State() {
    LAWS.forEach(function(l) { lawEnacted[l.id] = false; });
    ACADEMY_DISCIPLINES.forEach(function(d) { academyLevels[d.id] = 0; });
    MARKET_GOODS.forEach(function(g) {
        marketPrices[g.id] = g.basePrice;
        marketHistory[g.id] = [g.basePrice];
        marketInventory[g.id] = 0;
    });
    DISASTERS.forEach(function(d) { drillCompletion[d.id] = 0; });
    FESTIVALS.forEach(function(f) { festivalActive[f.id] = 0; });
    QUIZ_OPPONENTS.forEach(function(o) { qbWins[o.id] = false; });
    generatePetitions();
}

function generatePetitions() {
    if(petitionQueue.length >= 5) return;
    var available = PETITION_TYPES.filter(function(p) {
        return !petitionQueue.some(function(q) { return q.id === p.id; });
    });
    var count = Math.min(3, available.length);
    for(var i = 0; i < count; i++) {
        var idx = Math.floor(Math.random() * available.length);
        petitionQueue.push(JSON.parse(JSON.stringify(available[idx])));
        available.splice(idx, 1);
    }
}

// ===================== UI CREATION =====================
function addV11UI() {
    var style = document.createElement('style');
    style.textContent = V11_CSS;
    document.head.appendChild(style);

    var leftBtns = [
        { id: 'law-btn', text: '⚖️', title: '법률제도', top: '370px', color: '#ff9966' },
        { id: 'academy-btn', text: '🎓', title: '학문아카데미', top: '410px', color: '#66aaff' },
        { id: 'market-btn', text: '📈', title: '시장경제', top: '450px', color: '#ffdd66' },
        { id: 'disaster-btn', text: '🌋', title: '재해대응', top: '490px', color: '#ff6699' },
        { id: 'festival-btn', text: '🎉', title: '축제', top: '530px', color: '#cc77ff' },
        { id: 'compare-btn', text: '📊', title: '도시비교', top: '570px', color: '#66ddaa' },
        { id: 'petition-btn', text: '📋', title: '백성의소리', top: '610px', color: '#aadd66' },
        { id: 'quizbattle-btn', text: '🧠', title: '퀴즈대결', top: '650px', color: '#ff77cc' }
    ];

    var wrap = document.createElement('div');
    wrap.className = 'v11-left-btns';
    wrap.style.cssText = 'position:fixed;z-index:10;';

    leftBtns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.id = b.id;
        btn.className = 'v11-btn';
        btn.textContent = b.text;
        btn.title = b.title;
        btn.style.cssText = 'position:fixed;right:10px;top:'+b.top+';color:'+b.color+';';
        wrap.appendChild(btn);
    });
    document.body.appendChild(wrap);

    document.getElementById('law-btn').onclick = showLaw;
    document.getElementById('academy-btn').onclick = showAcademy;
    document.getElementById('market-btn').onclick = showMarket;
    document.getElementById('disaster-btn').onclick = showDisaster;
    document.getElementById('festival-btn').onclick = showFestival;
    document.getElementById('compare-btn').onclick = showCompare;
    document.getElementById('petition-btn').onclick = showPetition;
    document.getElementById('quizbattle-btn').onclick = showQuizBattle;

    createV11Panel('law-panel', '⚖️ 법률 제도', 'law-content');
    createV11Panel('academy-panel', '🎓 학문 아카데미', 'academy-content');
    createV11Panel('market-panel', '📈 시장 경제 시뮬레이터', 'market-content');
    createV11Panel('disaster-panel', '🌋 자연재해 대응 센터', 'disaster-content');
    createV11Panel('festival-panel', '🎉 문화 축제 플래너', 'festival-content');
    createV11Panel('compare-panel', '📊 도시 비교 분석기', 'compare-content');
    createV11Panel('petition-panel', '📋 백성의 소리', 'petition-content');
    createV11Panel('quizbattle-panel', '🧠 역사 인물 퀴즈 대결', 'quizbattle-content');
}

function createV11Panel(panelId, title, contentId) {
    var d = document.createElement('div');
    d.id = panelId;
    d.className = 'v11-panel';
    d.innerHTML = '<div class="v11-box"><h2>' + title + '</h2><div id="' + contentId + '"></div><button class="v11-close" onclick="document.getElementById(\'' + panelId + '\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

// ===================== SHOW FUNCTIONS =====================

function showLaw() {
    playV11SFX('law_enact');
    v11Features['law'] = true;
    var enacted = 0;
    LAWS.forEach(function(l) { if(lawEnacted[l.id]) enacted++; });

    var html = '<div style="text-align:center;color:#ffaa77;font-size:13px;margin-bottom:14px;">제정된 법률: ' + enacted + '/' + LAWS.length + '</div>';
    var cats = ['형법','민법','상법','군법'];
    var catIcons = { '형법': '🔒', '민법': '🏠', '상법': '🏪', '군법': '🎖️' };
    cats.forEach(function(cat) {
        html += '<div class="v11-cat-label" style="color:#ffaa77;">' + catIcons[cat] + ' ' + cat + '</div>';
        LAWS.forEach(function(l) {
            if(l.cat !== cat) return;
            var done = lawEnacted[l.id];
            var btnText = done ? '✅ 시행중' : '제정 (' + l.cost + '금)';
            var disabled = done ? ' disabled' : '';
            var effectStr = [];
            if(l.effect.safety) effectStr.push('치안+' + l.effect.safety);
            if(l.effect.happy) effectStr.push('행복+' + l.effect.happy);
            if(l.effect.defense) effectStr.push('방어+' + l.effect.defense);
            if(l.effect.culture) effectStr.push('문화+' + l.effect.culture);
            if(l.effect.goldPct) effectStr.push('금+' + l.effect.goldPct + '%');
            if(l.effect.popGrowth) effectStr.push('인구성장+' + l.effect.popGrowth + '%');
            if(l.effect.tradePct) effectStr.push('교역+' + l.effect.tradePct + '%');
            if(l.effect.marketStable) effectStr.push('물가안정');
            if(l.effect.milEff) effectStr.push('군사효율+' + l.effect.milEff + '%');
            html += '<div class="v11-item"><div class="vi">' + l.icon + '</div><div class="vn"><strong>' + l.name + '</strong><div class="vdet">' + l.desc + '</div><div class="vdet" style="color:#ffcc88;">효과: ' + effectStr.join(', ') + '</div></div><div class="vact"><button onclick="v11EnactLaw(\'' + l.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
        });
    });
    document.getElementById('law-content').innerHTML = html;
    document.getElementById('law-panel').classList.add('show');
    checkV11Achievements();
}

function showAcademy() {
    playV11SFX('academy_study');
    v11Features['academy'] = true;

    var canvas = document.createElement('canvas');
    canvas.id = 'academy-canvas';
    canvas.width = 400;
    canvas.height = 400;

    var html = '';
    ACADEMY_DISCIPLINES.forEach(function(d) {
        var lvl = academyLevels[d.id] || 0;
        var maxed = lvl >= 3;
        var costMult = lvl + 1;
        var foodCost = d.costFood * costMult;
        var goldCost = d.costGold * costMult;
        var btnText = maxed ? '✅ 마스터' : '연구 Lv' + (lvl+1) + ' (식량' + foodCost + '+금' + goldCost + ')';
        var disabled = maxed ? ' disabled' : '';
        var lvlStars = '';
        for(var s = 0; s < 3; s++) lvlStars += s < lvl ? '★' : '☆';
        html += '<div class="v11-item"><div class="vi">' + d.icon + '</div><div class="vn"><strong>' + d.name + ' ' + lvlStars + '</strong><div class="vdet">' + d.desc + '</div></div><div class="vact"><button onclick="v11StudyAcademy(\'' + d.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });

    var contentEl = document.getElementById('academy-content');
    contentEl.innerHTML = '';
    contentEl.appendChild(canvas);
    var listDiv = document.createElement('div');
    listDiv.innerHTML = html;
    contentEl.appendChild(listDiv);
    drawAcademyCanvas(canvas);
    document.getElementById('academy-panel').classList.add('show');
    checkV11Achievements();
}

function drawAcademyCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0a1020');
    bg.addColorStop(1, '#1a2030');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    var cx = w / 2, cy = h / 2;
    var maxR = 150;

    ctx.fillStyle = '#66aaff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('학문 진도 현황', cx, 24);

    for(var ring = 1; ring <= 3; ring++) {
        var r = maxR * (ring / 3);
        ctx.strokeStyle = 'rgba(102,170,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(102,170,255,0.3)';
        ctx.font = '9px sans-serif';
        ctx.fillText('Lv' + ring, cx + r + 8, cy + 3);
    }

    var count = ACADEMY_DISCIPLINES.length;
    ACADEMY_DISCIPLINES.forEach(function(d, i) {
        var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
        var lvl = academyLevels[d.id] || 0;
        var dist = maxR * (lvl / 3);

        var ex = cx + Math.cos(angle) * maxR;
        var ey = cy + Math.sin(angle) * maxR;
        ctx.strokeStyle = 'rgba(102,170,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        if(lvl > 0) {
            var px = cx + Math.cos(angle) * dist;
            var py = cy + Math.sin(angle) * dist;
            ctx.fillStyle = 'rgba(102,170,255,' + (0.2 + lvl * 0.2) + ')';
            ctx.beginPath();
            ctx.arc(px, py, 6 + lvl * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        var labelDist = maxR + 25;
        var lx = cx + Math.cos(angle) * labelDist;
        var ly = cy + Math.sin(angle) * labelDist;
        ctx.fillStyle = lvl >= 3 ? '#ffdd66' : lvl > 0 ? '#88ccff' : '#666';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.icon + d.name, lx, ly + 4);
    });

    if(ACADEMY_DISCIPLINES.some(function(d) { return (academyLevels[d.id] || 0) > 0; })) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(102,170,255,0.1)';
        var first = true;
        ACADEMY_DISCIPLINES.forEach(function(d, i) {
            var angle = (Math.PI * 2 * i / count) - Math.PI / 2;
            var lvl = academyLevels[d.id] || 0;
            var dist = maxR * (lvl / 3);
            var px = cx + Math.cos(angle) * dist;
            var py = cy + Math.sin(angle) * dist;
            if(first) { ctx.moveTo(px, py); first = false; }
            else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(102,170,255,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function showMarket() {
    playV11SFX('market_trade');
    v11Features['market'] = true;

    var canvas = document.createElement('canvas');
    canvas.id = 'market-canvas';
    canvas.width = 520;
    canvas.height = 220;

    var html = '<div style="text-align:center;color:#ffee88;font-size:13px;margin-bottom:14px;">총 수익: ' + marketTotalProfit + '금</div>';
    MARKET_GOODS.forEach(function(g) {
        var price = Math.round(marketPrices[g.id]);
        var inv = marketInventory[g.id] || 0;
        var diff = price - g.basePrice;
        var diffColor = diff > 0 ? '#ff6666' : diff < 0 ? '#66ff66' : '#aaa';
        var diffStr = diff > 0 ? '+' + diff : '' + diff;
        html += '<div class="v11-item"><div class="vi">' + g.icon + '</div><div class="vn"><strong>' + g.name + ' — ' + price + '금</strong> <span style="color:' + diffColor + ';font-size:11px;">(' + diffStr + ')</span><div class="vdet">기본가: ' + g.basePrice + '금 | 보유: ' + inv + '개</div></div><div class="vact" style="display:flex;gap:4px;"><button onclick="v11MarketBuy(\'' + g.id + '\')">구매</button><button onclick="v11MarketSell(\'' + g.id + '\')"' + (inv <= 0 ? ' disabled' : '') + '>판매</button></div></div>';
    });

    var contentEl = document.getElementById('market-content');
    contentEl.innerHTML = '';
    contentEl.appendChild(canvas);
    var listDiv = document.createElement('div');
    listDiv.innerHTML = html;
    contentEl.appendChild(listDiv);
    drawMarketCanvas(canvas);
    document.getElementById('market-panel').classList.add('show');
    checkV11Achievements();
}

function drawMarketCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#1a1a08');
    bg.addColorStop(1, '#2a2a15');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#ffdd66';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('시세 변동 그래프', w / 2, 18);

    var colors = ['#ff6666','#66aaff','#ffaa44','#aa88ff','#66dd66','#dddd66'];
    var padL = 50, padR = 20, padT = 35, padB = 30;
    var gw = w - padL - padR, gh = h - padT - padB;

    var allPrices = [];
    MARKET_GOODS.forEach(function(g) {
        (marketHistory[g.id] || []).forEach(function(p) { allPrices.push(p); });
    });
    var minP = Math.min.apply(null, allPrices.length > 0 ? allPrices : [0]);
    var maxP = Math.max.apply(null, allPrices.length > 0 ? allPrices : [50]);
    if(maxP === minP) maxP = minP + 10;

    for(var gi = 0; gi < 5; gi++) {
        var gy = padT + gh * gi / 4;
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(padL + gw, gy);
        ctx.stroke();
        ctx.fillStyle = '#888';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxP - (maxP - minP) * gi / 4), padL - 5, gy + 3);
    }

    MARKET_GOODS.forEach(function(g, idx) {
        var history = marketHistory[g.id] || [];
        if(history.length < 2) return;
        ctx.strokeStyle = colors[idx];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        var maxPts = Math.min(history.length, 20);
        var startIdx = history.length - maxPts;
        for(var i = 0; i < maxPts; i++) {
            var x = padL + gw * i / (maxPts - 1);
            var y = padT + gh * (1 - (history[startIdx + i] - minP) / (maxP - minP));
            if(i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
    });

    var legendX = padL + 5;
    MARKET_GOODS.forEach(function(g, idx) {
        ctx.fillStyle = colors[idx];
        ctx.fillRect(legendX, h - 15, 8, 8);
        ctx.fillStyle = '#ccc';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(g.name, legendX + 10, h - 8);
        legendX += 70;
    });
}

function showDisaster() {
    playV11SFX('disaster_drill');
    v11Features['disaster'] = true;
    var allDone = true;
    DISASTERS.forEach(function(d) { if(drillCompletion[d.id] < 100) allDone = false; });

    var html = '<div style="text-align:center;color:#ff88aa;font-size:13px;margin-bottom:14px;">훈련 상태: ' + (allDone ? '✅ 모든 훈련 완료!' : '진행 중') + '</div>';
    DISASTERS.forEach(function(d) {
        var comp = drillCompletion[d.id] || 0;
        var dmgReduce = Math.round(comp * 0.8);
        var done = comp >= 100;
        var btnText = done ? '✅ 완료 (-' + dmgReduce + '% 피해)' : '훈련 (' + comp + '% → +25%)';
        var disabled = done ? ' disabled' : '';
        var dmgStr = [];
        if(d.baseDmg.pop) dmgStr.push('인구-' + d.baseDmg.pop);
        if(d.baseDmg.food) dmgStr.push('식량-' + d.baseDmg.food);
        if(d.baseDmg.gold) dmgStr.push('금-' + d.baseDmg.gold);
        if(d.baseDmg.happy) dmgStr.push('행복-' + d.baseDmg.happy);
        html += '<div class="v11-item"><div class="vi">' + d.icon + '</div><div class="vn"><strong>' + d.name + ' (피해감소: ' + dmgReduce + '%)</strong><div class="vdet">' + d.desc + '</div><div class="vdet" style="color:#ff8888;">기본 피해: ' + dmgStr.join(', ') + '</div><div style="height:6px;background:#333;border-radius:3px;margin-top:4px;overflow:hidden;"><div style="height:100%;width:' + comp + '%;background:#cc3366;border-radius:3px;transition:width 0.5s;"></div></div></div><div class="vact"><button onclick="v11DrillDisaster(\'' + d.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('disaster-content').innerHTML = html;
    document.getElementById('disaster-panel').classList.add('show');
    checkV11Achievements();
}

function showFestival() {
    playV11SFX('festival_start');
    v11Features['festival'] = true;

    var html = '<div style="text-align:center;color:#dd99ff;font-size:13px;margin-bottom:14px;">개최한 축제: ' + festivalCount + '회</div>';
    var seasons = ['봄','여름','가을','겨울'];
    var seasonIcons = { '봄': '🌸', '여름': '☀️', '가을': '🍂', '겨울': '❄️' };
    seasons.forEach(function(season) {
        html += '<div class="v11-festival-season" style="color:#dd99ff;">' + seasonIcons[season] + ' ' + season + '</div>';
        FESTIVALS.forEach(function(f) {
            if(f.season !== season) return;
            var active = (festivalActive[f.id] || 0) > 0;
            var buffStr = [];
            if(f.buff.happy) buffStr.push('행복+' + f.buff.happy);
            if(f.buff.culture) buffStr.push('문화+' + f.buff.culture);
            if(f.buff.food) buffStr.push('식량+' + f.buff.food);
            if(f.buff.gold) buffStr.push('금+' + f.buff.gold);
            if(f.buff.pop) buffStr.push('인구+' + f.buff.pop);
            var btnText = active ? '🎊 진행중 (' + festivalActive[f.id] + '턴 남음)' : '개최 (' + f.cost + '금, ' + f.duration + '턴)';
            var disabled = active ? ' disabled' : '';
            html += '<div class="v11-item"><div class="vi">' + f.icon + '</div><div class="vn"><strong>' + f.name + '</strong><div class="vdet">' + f.desc + '</div><div class="vdet" style="color:#dd99ff;">효과: ' + buffStr.join(', ') + ' (' + f.duration + '턴간)</div></div><div class="vact"><button onclick="v11StartFestival(\'' + f.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
        });
    });
    document.getElementById('festival-content').innerHTML = html;
    document.getElementById('festival-panel').classList.add('show');
    checkV11Achievements();
}

function showCompare() {
    playV11SFX('compare_view');
    v11Features['compare'] = true;

    var canvas = document.createElement('canvas');
    canvas.id = 'compare-canvas';
    canvas.width = 520;
    canvas.height = 360;

    var html = '';
    var playerStats = getPlayerStats();
    html += '<div style="text-align:center;color:#66ddaa;font-size:13px;margin-bottom:10px;">내 도시 vs 역사 도시</div>';
    AI_CITIES.forEach(function(city) {
        var totalPlayer = playerStats.pop + playerStats.mil + playerStats.culture + playerStats.economy + playerStats.infra + playerStats.diplo;
        var totalAI = city.stats.pop + city.stats.mil + city.stats.culture + city.stats.economy + city.stats.infra + city.stats.diplo;
        var comparison = totalPlayer >= totalAI ? '우세 ✅' : '열세 ⚠️';
        var compColor = totalPlayer >= totalAI ? '#66ddaa' : '#ff8888';
        html += '<div class="v11-item"><div class="vi" style="font-size:20px;">🏛️</div><div class="vn"><strong>' + city.name + ' (' + city.era + ')</strong><div class="vdet">인구:' + city.stats.pop + ' 군사:' + city.stats.mil + ' 문화:' + city.stats.culture + ' 경제:' + city.stats.economy + ' 인프라:' + city.stats.infra + ' 외교:' + city.stats.diplo + '</div></div><div style="color:' + compColor + ';font-size:12px;font-weight:bold;">' + comparison + '</div></div>';
    });

    var contentEl = document.getElementById('compare-content');
    contentEl.innerHTML = '';
    contentEl.appendChild(canvas);
    var listDiv = document.createElement('div');
    listDiv.innerHTML = html;
    contentEl.appendChild(listDiv);
    drawCompareCanvas(canvas, playerStats);
    document.getElementById('compare-panel').classList.add('show');
    checkV11Achievements();
}

function getPlayerStats() {
    var res = (typeof window.resources !== 'undefined') ? window.resources : { pop: 50, food: 100, gold: 200, happy: 50, culture: 0 };
    var lawCount = 0; LAWS.forEach(function(l) { if(lawEnacted[l.id]) lawCount++; });
    var acadTotal = 0; ACADEMY_DISCIPLINES.forEach(function(d) { acadTotal += (academyLevels[d.id] || 0); });

    return {
        pop: Math.min(100, 20 + Math.min(res.pop, 300) * 0.2 + acadTotal * 2),
        mil: Math.min(100, 20 + lawCount * 3 + (typeof window.milTotalDef !== 'undefined' ? window.milTotalDef : 0) * 0.5),
        culture: Math.min(100, 15 + Math.min(res.culture || 0, 300) * 0.2 + acadTotal * 3),
        economy: Math.min(100, 20 + Math.min(res.gold, 500) * 0.1 + marketTotalProfit * 0.05),
        infra: Math.min(100, 15 + lawCount * 4 + petitionResolved * 3),
        diplo: Math.min(100, 20 + festivalCount * 3 + acadTotal * 2)
    };
}

function drawCompareCanvas(canvas, playerStats) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#081a10');
    bg.addColorStop(1, '#152520');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#66ddaa';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('6축 레이더 차트', w / 2, 22);

    var cx = w / 2, cy = h / 2 + 10;
    var maxR = 130;
    var axes = ['인구','군사','문화','경제','인프라','외교'];
    var axCount = axes.length;

    for(var ring = 1; ring <= 5; ring++) {
        var r = maxR * ring / 5;
        ctx.strokeStyle = 'rgba(102,221,170,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(var ai = 0; ai <= axCount; ai++) {
            var angle = (Math.PI * 2 * ai / axCount) - Math.PI / 2;
            var px = cx + Math.cos(angle) * r;
            var py = cy + Math.sin(angle) * r;
            if(ai === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    axes.forEach(function(ax, i) {
        var angle = (Math.PI * 2 * i / axCount) - Math.PI / 2;
        ctx.strokeStyle = 'rgba(102,221,170,0.15)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.stroke();

        var lx = cx + Math.cos(angle) * (maxR + 20);
        var ly = cy + Math.sin(angle) * (maxR + 20);
        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ax, lx, ly + 4);
    });

    var pVals = [playerStats.pop, playerStats.mil, playerStats.culture, playerStats.economy, playerStats.infra, playerStats.diplo];
    ctx.beginPath();
    ctx.fillStyle = 'rgba(102,221,170,0.2)';
    pVals.forEach(function(v, i) {
        var angle = (Math.PI * 2 * i / axCount) - Math.PI / 2;
        var dist = maxR * Math.min(v, 100) / 100;
        var px = cx + Math.cos(angle) * dist;
        var py = cy + Math.sin(angle) * dist;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#66ddaa';
    ctx.lineWidth = 2;
    ctx.stroke();

    var hanyang = AI_CITIES[2].stats;
    var hVals = [hanyang.pop, hanyang.mil, hanyang.culture, hanyang.economy, hanyang.infra, hanyang.diplo];
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,170,68,0.1)';
    hVals.forEach(function(v, i) {
        var angle = (Math.PI * 2 * i / axCount) - Math.PI / 2;
        var dist = maxR * Math.min(v, 100) / 100;
        var px = cx + Math.cos(angle) * dist;
        var py = cy + Math.sin(angle) * dist;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffaa44';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#66ddaa';
    ctx.fillRect(w - 140, h - 40, 10, 10);
    ctx.fillStyle = '#ccc';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('내 도시', w - 126, h - 31);
    ctx.fillStyle = '#ffaa44';
    ctx.fillRect(w - 140, h - 25, 10, 10);
    ctx.fillStyle = '#ccc';
    ctx.fillText('한양(조선)', w - 126, h - 16);
}

function showPetition() {
    playV11SFX('feature_open');
    v11Features['petition'] = true;

    if(petitionQueue.length < 3) generatePetitions();

    var html = '<div style="text-align:center;color:#bbee77;font-size:13px;margin-bottom:14px;">해결한 청원: ' + petitionResolved + '건 | 대기중: ' + petitionQueue.length + '건</div>';
    if(petitionQueue.length === 0) {
        html += '<div style="text-align:center;color:#999;padding:30px;">현재 접수된 청원이 없습니다.</div>';
    } else {
        petitionQueue.forEach(function(p, idx) {
            var prColor = p.priority === '높음' ? '#ff6666' : p.priority === '보통' ? '#ffaa44' : '#66aaff';
            html += '<div class="v11-petition-card"><div class="pp-icon">' + p.icon + '</div><div class="pp-info"><div class="pp-title">' + p.name + '</div><div class="pp-desc">' + p.desc + '</div><div class="pp-priority" style="color:' + prColor + ';">긴급도: ' + p.priority + '</div></div><div class="vact"><button style="background:#77aa33;border:none;color:#fff;padding:5px 12px;border-radius:8px;font-size:11px;cursor:pointer;" onclick="v11ResolvePetition(' + idx + ')">해결 (' + p.cost + '금)</button></div></div>';
        });
    }
    document.getElementById('petition-content').innerHTML = html;
    document.getElementById('petition-panel').classList.add('show');
    checkV11Achievements();
}

function showQuizBattle() {
    playV11SFX('quiz_battle');
    v11Features['quizbattle'] = true;

    var wins = 0;
    QUIZ_OPPONENTS.forEach(function(o) { if(qbWins[o.id]) wins++; });

    var html = '<div style="text-align:center;color:#ff77cc;font-size:13px;margin-bottom:14px;">승리: ' + wins + '/' + QUIZ_OPPONENTS.length + '</div>';
    html += '<div style="text-align:center;color:#aaa;font-size:11px;margin-bottom:14px;">역사 인물과 1대1 퀴즈 대결! 5문제 중 더 많이 맞히면 승리합니다.</div>';
    QUIZ_OPPONENTS.forEach(function(o) {
        var won = qbWins[o.id];
        html += '<div class="v11-qb-opponent" onclick="v11StartQuizBattle(\'' + o.id + '\')"><div class="qo-icon">' + o.icon + '</div><div class="qo-info"><div class="qo-name">' + o.name + ' <span class="qo-era">' + o.era + '</span></div><div class="qo-desc">' + o.desc + '</div><div class="qo-record">' + (won ? '✅ 승리함' : '⚔️ 도전하기') + '</div></div></div>';
    });
    document.getElementById('quizbattle-content').innerHTML = html;
    document.getElementById('quizbattle-panel').classList.add('show');
    checkV11Achievements();
}

// ===================== ACTIONS =====================

window.v11EnactLaw = function(lawId) {
    var law = LAWS.find(function(l) { return l.id === lawId; });
    if(!law || lawEnacted[lawId]) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < law.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + law.cost + '금 필요)');
        return;
    }
    window.resources.gold -= law.cost;
    lawEnacted[lawId] = true;
    playV11SFX('law_enact');
    if(typeof toast === 'function') toast('⚖️ ' + law.name + ' 제정 완료!');
    showLaw();
    saveV11State();
    checkV11Achievements();
};

window.v11StudyAcademy = function(discId) {
    var disc = ACADEMY_DISCIPLINES.find(function(d) { return d.id === discId; });
    if(!disc) return;
    var lvl = academyLevels[discId] || 0;
    if(lvl >= 3) return;
    var costMult = lvl + 1;
    var foodCost = disc.costFood * costMult;
    var goldCost = disc.costGold * costMult;
    var res = (typeof window.resources !== 'undefined') ? window.resources : null;
    if(!res) return;
    if((res.food || 0) < foodCost || (res.gold || 0) < goldCost) {
        if(typeof toast === 'function') toast('자원이 부족합니다! (식량 ' + foodCost + ' + 금 ' + goldCost + ' 필요)');
        return;
    }
    res.food -= foodCost;
    res.gold -= goldCost;
    academyLevels[discId] = lvl + 1;
    playV11SFX('academy_study');
    var stars = '';
    for(var s = 0; s < 3; s++) stars += s < lvl + 1 ? '★' : '☆';
    if(typeof toast === 'function') toast('🎓 ' + disc.name + ' ' + stars + ' 달성!');
    showAcademy();
    saveV11State();
    checkV11Achievements();
};

window.v11MarketBuy = function(goodId) {
    var good = MARKET_GOODS.find(function(g) { return g.id === goodId; });
    if(!good) return;
    var price = Math.round(marketPrices[goodId]);
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < price) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + price + '금 필요)');
        return;
    }
    window.resources.gold -= price;
    marketInventory[goodId] = (marketInventory[goodId] || 0) + 1;
    playV11SFX('market_trade');
    if(typeof toast === 'function') toast('📈 ' + good.name + ' 1개 구매! (' + price + '금)');
    showMarket();
    saveV11State();
};

window.v11MarketSell = function(goodId) {
    var good = MARKET_GOODS.find(function(g) { return g.id === goodId; });
    if(!good) return;
    if((marketInventory[goodId] || 0) <= 0) {
        if(typeof toast === 'function') toast('보유한 ' + good.name + '이(가) 없습니다!');
        return;
    }
    var price = Math.round(marketPrices[goodId]);
    if(typeof window.resources !== 'undefined') window.resources.gold += price;
    marketInventory[goodId] -= 1;
    marketTotalProfit += price;
    playV11SFX('market_trade');
    if(typeof toast === 'function') toast('💰 ' + good.name + ' 1개 판매! (' + price + '금)');
    showMarket();
    saveV11State();
    checkV11Achievements();
};

window.v11DrillDisaster = function(disId) {
    var dis = DISASTERS.find(function(d) { return d.id === disId; });
    if(!dis) return;
    if((drillCompletion[disId] || 0) >= 100) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < 20) {
        if(typeof toast === 'function') toast('금이 부족합니다! (20금 필요)');
        return;
    }
    window.resources.gold -= 20;
    drillCompletion[disId] = Math.min(100, (drillCompletion[disId] || 0) + 25);
    playV11SFX('disaster_drill');
    if(typeof toast === 'function') toast('🌋 ' + dis.name + ' 대응 훈련! (' + drillCompletion[disId] + '%)');
    showDisaster();
    saveV11State();
    checkV11Achievements();
};

window.v11StartFestival = function(festId) {
    var fest = FESTIVALS.find(function(f) { return f.id === festId; });
    if(!fest) return;
    if((festivalActive[festId] || 0) > 0) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < fest.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + fest.cost + '금 필요)');
        return;
    }
    window.resources.gold -= fest.cost;
    festivalActive[festId] = fest.duration;
    festivalCount++;
    if(typeof window.resources !== 'undefined') {
        if(fest.buff.happy) window.resources.happy = (window.resources.happy || 0) + fest.buff.happy;
        if(fest.buff.culture) window.resources.culture = (window.resources.culture || 0) + fest.buff.culture;
        if(fest.buff.food) window.resources.food = (window.resources.food || 0) + fest.buff.food;
        if(fest.buff.gold) window.resources.gold = (window.resources.gold || 0) + fest.buff.gold;
        if(fest.buff.pop) window.resources.pop = (window.resources.pop || 0) + fest.buff.pop;
    }
    playV11SFX('festival_start');
    if(typeof toast === 'function') toast('🎉 ' + fest.name + ' 축제 시작! (' + fest.duration + '턴간)');
    showFestival();
    saveV11State();
    checkV11Achievements();
};

window.v11ResolvePetition = function(idx) {
    if(idx < 0 || idx >= petitionQueue.length) return;
    var p = petitionQueue[idx];
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < p.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + p.cost + '금 필요)');
        return;
    }
    window.resources.gold -= p.cost;
    if(typeof window.resources !== 'undefined') {
        if(p.reward.happy) window.resources.happy = (window.resources.happy || 0) + p.reward.happy;
        if(p.reward.culture) window.resources.culture = (window.resources.culture || 0) + p.reward.culture;
        if(p.reward.gold) window.resources.gold = (window.resources.gold || 0) + p.reward.gold;
        if(p.reward.pop) window.resources.pop = (window.resources.pop || 0) + p.reward.pop;
    }
    petitionQueue.splice(idx, 1);
    petitionResolved++;
    playV11SFX('petition_resolve');
    if(typeof toast === 'function') toast('📋 ' + p.name + ' 해결! 백성이 기뻐합니다!');
    showPetition();
    saveV11State();
    checkV11Achievements();
};

window.v11StartQuizBattle = function(oppId) {
    var opp = QUIZ_OPPONENTS.find(function(o) { return o.id === oppId; });
    if(!opp) return;
    playV11SFX('quiz_battle');

    var shuffled = QB_QUESTIONS.slice().sort(function() { return Math.random() - 0.5; });
    var battleQs = shuffled.slice(0, 5);
    var playerScore = 0;
    var oppScore = 0;
    var roundIdx = 0;

    function showBattleRound() {
        if(roundIdx >= 5) {
            var won = playerScore > oppScore;
            if(won) {
                qbWins[oppId] = true;
                playV11SFX('quiz_win');
            } else {
                playV11SFX('quiz_lose');
            }
            var resultColor = won ? '#66ddaa' : (playerScore === oppScore ? '#ffaa44' : '#ff6666');
            var resultText = won ? '🏆 승리!' : (playerScore === oppScore ? '🤝 무승부' : '😔 패배');
            if(won && typeof window.resources !== 'undefined') {
                window.resources.gold = (window.resources.gold || 0) + 50;
                window.resources.culture = (window.resources.culture || 0) + 20;
            }
            var resultHtml = '<div style="text-align:center;padding:30px;"><div style="font-size:48px;margin-bottom:16px;">' + (won ? '🏆' : (playerScore === oppScore ? '🤝' : '😔')) + '</div><div style="font-size:20px;color:' + resultColor + ';font-weight:bold;margin-bottom:12px;">' + resultText + '</div><div style="color:#ccc;font-size:14px;margin-bottom:8px;">나: ' + playerScore + '점 vs ' + opp.name + ': ' + oppScore + '점</div>' + (won ? '<div style="color:#ffdd66;font-size:12px;">보상: 금 +50, 문화 +20</div>' : '') + '<button class="v11-close" style="background:#cc44aa;margin-top:20px;" onclick="v11ShowQuizBattleList()">돌아가기</button></div>';
            document.getElementById('quizbattle-content').innerHTML = resultHtml;
            saveV11State();
            checkV11Achievements();
            return;
        }

        var q = battleQs[roundIdx];
        var oppAnswered = Math.random() < opp.accuracy;
        if(oppAnswered) oppScore++;

        var qHtml = '<div style="text-align:center;margin-bottom:16px;"><span style="color:#ff77cc;font-size:12px;">라운드 ' + (roundIdx + 1) + '/5</span><span style="color:#aaa;font-size:12px;margin-left:16px;">나: ' + playerScore + ' vs ' + opp.name + ': ' + oppScore + '</span></div>';
        qHtml += '<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:16px;margin-bottom:16px;"><div style="color:#fff;font-size:14px;font-weight:bold;text-align:center;margin-bottom:14px;">' + q.q + '</div>';
        q.a.forEach(function(opt, oi) {
            qHtml += '<button style="display:block;width:100%;text-align:left;padding:10px 14px;margin-bottom:6px;background:rgba(204,68,170,0.1);border:1px solid rgba(204,68,170,0.3);border-radius:8px;color:#fff;font-size:13px;cursor:pointer;" onclick="v11AnswerBattle(' + oi + ',' + q.c + ')">' + String.fromCharCode(9312 + oi) + ' ' + opt + '</button>';
        });
        qHtml += '</div>';
        qHtml += '<div style="text-align:center;color:#aaa;font-size:11px;font-style:italic;">' + opp.personality + '</div>';
        document.getElementById('quizbattle-content').innerHTML = qHtml;
    }

    window.v11AnswerBattle = function(chosen, correct) {
        if(chosen === correct) playerScore++;
        roundIdx++;
        showBattleRound();
    };

    window.v11ShowQuizBattleList = function() {
        showQuizBattle();
    };

    showBattleRound();
};

// ===================== ACHIEVEMENTS =====================
function checkV11Achievements() {
    if(typeof window.achievements === 'undefined') {
        if(typeof window.unlockedAchievements !== 'undefined') {
            window.achievements = {};
            window.unlockedAchievements.forEach(function(id) { window.achievements[id] = true; });
        } else {
            window.achievements = {};
        }
    }

    V11_ACHIEVEMENTS.forEach(function(ach) {
        if(window.achievements[ach.id]) return;
        var unlocked = false;
        var lawCount = 0, acadMastered = 0, drillsDone = 0, winsCount = 0, featureCount = 0;
        LAWS.forEach(function(l) { if(lawEnacted[l.id]) lawCount++; });
        ACADEMY_DISCIPLINES.forEach(function(d) { if((academyLevels[d.id] || 0) >= 3) acadMastered++; });
        DISASTERS.forEach(function(d) { if((drillCompletion[d.id] || 0) >= 100) drillsDone++; });
        QUIZ_OPPONENTS.forEach(function(o) { if(qbWins[o.id]) winsCount++; });
        for(var fk in v11Features) { if(v11Features[fk]) featureCount++; }

        switch(ach.id) {
            case 'v11_law_6': unlocked = lawCount >= 6; break;
            case 'v11_law_all': unlocked = lawCount >= LAWS.length; break;
            case 'v11_academy_master': unlocked = acadMastered >= 4; break;
            case 'v11_market_profit': unlocked = marketTotalProfit >= 500; break;
            case 'v11_disaster_all': unlocked = drillsDone >= DISASTERS.length; break;
            case 'v11_festival_6': unlocked = festivalCount >= 6; break;
            case 'v11_compare': unlocked = !!v11Features['compare']; break;
            case 'v11_petition_5': unlocked = petitionResolved >= 5; break;
            case 'v11_qb_win': unlocked = winsCount >= 1; break;
            case 'v11_qb_allwin': unlocked = winsCount >= QUIZ_OPPONENTS.length; break;
            case 'v11_all_systems': unlocked = featureCount >= 8; break;
            case 'v11_quiz_115': unlocked = (typeof window.quizScore !== 'undefined' && window.quizScore >= 115) || (typeof window.totalQuizCorrect !== 'undefined' && window.totalQuizCorrect >= 115); break;
        }
        if(unlocked) {
            window.achievements[ach.id] = true;
            if(typeof window.unlockedAchievements !== 'undefined' && typeof window.unlockedAchievements.add === 'function') {
                window.unlockedAchievements.add(ach.id);
            }
            playV11SFX('achievement_v11');
            if(typeof showAchievementToast === 'function') showAchievementToast({ icon: ach.icon, title: ach.title, desc: ach.desc });
            try { localStorage.setItem('cityAchievements_v11', JSON.stringify(window.achievements)); } catch(e){}
        }
    });
}

// ===================== HOOKS =====================

function hookV11Quiz() {
    if(typeof window.QUIZ_QUESTIONS === 'undefined') return;
    V11_QUIZ.forEach(function(q) {
        var exists = false;
        for(var i = 0; i < window.QUIZ_QUESTIONS.length; i++) {
            if(window.QUIZ_QUESTIONS[i].q === q.q) { exists = true; break; }
        }
        if(!exists) {
            window.QUIZ_QUESTIONS.push({
                q: q.q, opts: q.a, ans: q.c, era: '역사일반', explain: q.h
            });
        }
    });
}

function hookV11Achievements() {
    var prev = window.showAchievements;
    if(!prev) return;
    window.showAchievements = function() {
        V11_ACHIEVEMENTS.forEach(function(ach) {
            if(typeof window.ACHIEVEMENTS !== 'undefined') {
                var exists = false;
                for(var i = 0; i < window.ACHIEVEMENTS.length; i++) {
                    if(window.ACHIEVEMENTS[i].id === ach.id) { exists = true; break; }
                }
                if(!exists) window.ACHIEVEMENTS.push(ach);
            }
        });
        prev();
    };
}

function hookV11CheckAchievements() {
    var prev = window.checkAchievements;
    if(!prev) return;
    window.checkAchievements = function() {
        prev();
        checkV11Achievements();
    };
}

function hookV11AdvisorTips() {
    var tips = [
        '💡 법률을 제정하면 도시 전체에 영구 버프가 적용됩니다!',
        '💡 학문 아카데미에서 각 분야를 3단계까지 연구하세요.',
        '💡 시장에서 가격이 낮을 때 사서 높을 때 팔면 수익을 올릴 수 있어요!',
        '💡 재해 대응 훈련을 완료하면 재해 피해가 크게 줄어듭니다.',
        '💡 문화 축제를 열면 일정 턴간 다양한 보너스를 받아요.',
        '💡 도시 비교 분석기로 역사 도시들과 나의 실력을 비교해보세요!',
        '💡 백성의 청원을 해결하면 만족도가 크게 올라갑니다.',
        '💡 역사 인물과 퀴즈 대결에서 이기면 금과 문화를 얻어요!',
        '💡 모든 법률을 제정하면 법전 완성 업적을 달성할 수 있어요.',
        '💡 시장 가격은 매 턴마다 변동하니 시세를 잘 살펴보세요.'
    ];
    if(typeof window.V5_ADVISOR_TIPS !== 'undefined') {
        tips.forEach(function(t) {
            if(window.V5_ADVISOR_TIPS.indexOf(t) === -1) window.V5_ADVISOR_TIPS.push(t);
        });
    }
}

function hookV11AutoSave() {
    var prev = window.autoSave;
    if(!prev) return;
    window.autoSave = function() {
        prev();
        saveV11State();
    };
}

function hookV11Keyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return;
        var v11panels = ['law-panel','academy-panel','market-panel','disaster-panel','festival-panel','compare-panel','petition-panel','quizbattle-panel'];
        var anyOpen = v11panels.some(function(pid) {
            var el = document.getElementById(pid);
            return el && el.classList.contains('show');
        });
        if(anyOpen) {
            if(e.key === 'Escape') {
                v11panels.forEach(function(pid) {
                    var el = document.getElementById(pid);
                    if(el) el.classList.remove('show');
                });
            }
            return;
        }
        if(!e.shiftKey) return;
        switch(e.key) {
            case 'L': showLaw(); e.preventDefault(); break;
            case 'A': showAcademy(); e.preventDefault(); break;
            case 'K': showMarket(); e.preventDefault(); break;
            case 'R': showDisaster(); e.preventDefault(); break;
            case 'F': showFestival(); e.preventDefault(); break;
            case 'V': showCompare(); e.preventDefault(); break;
            case 'P': showPetition(); e.preventDefault(); break;
            case 'Q': showQuizBattle(); e.preventDefault(); break;
        }
    });
}

function hookV11GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    window.gameTick = function() {
        prevTick();
        v11TickCount++;

        // Fluctuate market prices every 3 ticks
        if(v11TickCount % 3 === 0) {
            MARKET_GOODS.forEach(function(g) {
                var vol = g.volatility;
                var hasStable = lawEnacted['trade_1'];
                if(hasStable) vol = Math.max(1, vol - 2);
                var change = (Math.random() - 0.5) * 2 * vol;
                marketPrices[g.id] = Math.max(Math.round(g.basePrice * 0.3), Math.min(Math.round(g.basePrice * 2.5), marketPrices[g.id] + change));
                var hist = marketHistory[g.id];
                hist.push(Math.round(marketPrices[g.id]));
                if(hist.length > 30) hist.shift();
            });
        }

        // Decrement festival durations every 5 ticks
        if(v11TickCount % 5 === 0) {
            FESTIVALS.forEach(function(f) {
                if((festivalActive[f.id] || 0) > 0) {
                    festivalActive[f.id]--;
                    if(festivalActive[f.id] <= 0) {
                        festivalActive[f.id] = 0;
                        if(typeof toast === 'function') toast('🎉 ' + f.name + ' 축제가 종료되었습니다.');
                    }
                }
            });
        }

        // Generate new petitions every 20 ticks
        if(v11TickCount % 20 === 0) {
            generatePetitions();
        }

        // Random disaster events every 30 ticks
        if(v11TickCount % 30 === 0 && Math.random() < 0.3) {
            var disIdx = Math.floor(Math.random() * DISASTERS.length);
            var dis = DISASTERS[disIdx];
            var comp = drillCompletion[dis.id] || 0;
            var reduction = comp * 0.8 / 100;
            var res = (typeof window.resources !== 'undefined') ? window.resources : null;
            if(res) {
                if(dis.baseDmg.pop) res.pop = Math.max(10, (res.pop || 50) - Math.round(dis.baseDmg.pop * (1 - reduction)));
                if(dis.baseDmg.food) res.food = Math.max(0, (res.food || 100) - Math.round(dis.baseDmg.food * (1 - reduction)));
                if(dis.baseDmg.gold) res.gold = Math.max(0, (res.gold || 100) - Math.round(dis.baseDmg.gold * (1 - reduction)));
                if(dis.baseDmg.happy) res.happy = Math.max(0, (res.happy || 50) - Math.round(dis.baseDmg.happy * (1 - reduction)));
                if(typeof toast === 'function') {
                    var dmgPct = Math.round((1 - reduction) * 100);
                    toast(dis.icon + ' ' + dis.name + ' 발생! (피해 ' + dmgPct + '%)');
                }
            }
        }
    };
}

// ===================== SAVE/LOAD =====================
function saveV11State() {
    try {
        var state = {
            law: lawEnacted,
            academy: academyLevels,
            prices: marketPrices,
            history: marketHistory,
            inventory: marketInventory,
            profit: marketTotalProfit,
            drill: drillCompletion,
            festActive: festivalActive,
            festCount: festivalCount,
            petitions: petitionQueue,
            petResolved: petitionResolved,
            qbWins: qbWins,
            features: v11Features
        };
        localStorage.setItem('cityV11State', JSON.stringify(state));
    } catch(e) {}
}

function loadV11State() {
    try {
        var raw = localStorage.getItem('cityV11State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.law) { for(var k in state.law) lawEnacted[k] = state.law[k]; }
        if(state.academy) { for(var k2 in state.academy) academyLevels[k2] = state.academy[k2]; }
        if(state.prices) { for(var k3 in state.prices) marketPrices[k3] = state.prices[k3]; }
        if(state.history) { for(var k4 in state.history) marketHistory[k4] = state.history[k4]; }
        if(state.inventory) { for(var k5 in state.inventory) marketInventory[k5] = state.inventory[k5]; }
        if(typeof state.profit === 'number') marketTotalProfit = state.profit;
        if(state.drill) { for(var k6 in state.drill) drillCompletion[k6] = state.drill[k6]; }
        if(state.festActive) { for(var k7 in state.festActive) festivalActive[k7] = state.festActive[k7]; }
        if(typeof state.festCount === 'number') festivalCount = state.festCount;
        if(state.petitions) petitionQueue = state.petitions;
        if(typeof state.petResolved === 'number') petitionResolved = state.petResolved;
        if(state.qbWins) { for(var k8 in state.qbWins) qbWins[k8] = state.qbWins[k8]; }
        if(state.features) v11Features = state.features;
    } catch(e) {}
}

// ===================== INIT =====================
function initV11() {
    initV11State();
    loadV11State();
    addV11UI();
    hookV11GameTick();
    hookV11Quiz();
    hookV11Achievements();
    hookV11CheckAchievements();
    hookV11AdvisorTips();
    hookV11AutoSave();
    hookV11Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('⚖️ v11.0: 법률+학문+시장+재해대응+축제+도시비교+백성의소리+퀴즈대결!');
        }, 8000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV11, 2500); });
} else {
    setTimeout(initV11, 2500);
}

})();
