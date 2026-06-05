// =====================================================================
// city-builder v9_patch.js — PRIME Holdings NEXTERA+PRISM v9.0
// Self-contained IIFE patch: Population Classes 5, Trade Market 8 goods,
// Disaster Preparedness 6, City Zones 4, Heritage Preservation 10,
// Seasonal Events Calendar, Citizens Council 6 petitions,
// City Rankings Canvas, +15 Quiz (85), +12 Achievements (86),
// SFX 10, Keyboard Shortcuts +6
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v9AudioCtx = null;
function getV9Audio() {
    if(!v9AudioCtx) {
        try { v9AudioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v9AudioCtx;
}
function playV9SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV9Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.14, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'class_promote':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.12);
            o.frequency.linearRampToValueAtTime(880, now+0.24);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'market_trade':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(500, now);
            o.frequency.setValueAtTime(600, now+0.06);
            o.frequency.setValueAtTime(500, now+0.12);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'disaster_prep':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(200, now);
            o.frequency.linearRampToValueAtTime(400, now+0.15);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'zone_set':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(392, now);
            o.frequency.setValueAtTime(523, now+0.08);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'heritage_discover':
            [523,659,784,880,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator();
                oo.type='sine'; oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.25);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.25);
            });
            break;
        case 'season_change':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(660, now+0.2);
            o.frequency.linearRampToValueAtTime(440, now+0.35);
            g.gain.setValueAtTime(0.12, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.5);
            o.connect(g); o.start(now); o.stop(now+0.45);
            break;
        case 'council_petition':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(262, now);
            o.frequency.setValueAtTime(330, now+0.1);
            o.frequency.setValueAtTime(392, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'ranking_view':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(700, now);
            o.frequency.linearRampToValueAtTime(500, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'v9_achieve':
            [784,988,1175,1319,1568].forEach(function(f, i) {
                var oo = ctx.createOscillator();
                oo.type='sine'; oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.2);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.2);
            });
            break;
        case 'v9_quiz_correct':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(523, now);
            o.frequency.setValueAtTime(659, now+0.1);
            o.connect(g); o.start(now); o.stop(now+0.15);
            break;
    }
}

// ===================== CSS INJECTION =====================
var V9_CSS = '\
#popclass-btn {\
    position: fixed; top: 650px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffa0ff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#popclass-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#popclass-panel.show { display: flex; }\
#popclass-box {\
    background: linear-gradient(145deg, #2a1a30, #1a0e20);\
    border: 2px solid #c060e0; border-radius: 16px;\
    padding: 24px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#popclass-box h2 { color: #e080ff; text-align: center; margin-bottom: 12px; }\
.pc-summary { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.pc-class {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(192,96,224,0.2);\
}\
.pc-class .pci { font-size: 28px; }\
.pc-class .pcn { flex: 1; }\
.pc-class .pcn strong { color: #e0a0ff; font-size: 14px; }\
.pc-class .pcn .pcdet { font-size: 11px; color: #aaa; margin-top: 2px; }\
.pc-bar { height: 8px; background: #333; border-radius: 4px; margin-top: 6px; overflow: hidden; }\
.pc-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }\
.pc-close {\
    display: block; margin: 16px auto 0; background: #c060e0; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
#market-btn {\
    position: fixed; top: 690px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffcc44;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#market-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#market-panel.show { display: flex; }\
#market-box {\
    background: linear-gradient(145deg, #2a2510, #1a1808);\
    border: 2px solid #cc9933; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#market-box h2 { color: #ffcc44; text-align: center; margin-bottom: 12px; }\
.mk-balance { text-align: center; font-size: 18px; color: #ffd700; font-weight: bold; margin-bottom: 14px; }\
.mk-item {\
    display: flex; align-items: center; gap: 10px; padding: 10px;\
    margin-bottom: 6px; border-radius: 10px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(204,153,51,0.2);\
}\
.mk-item .mki { font-size: 24px; }\
.mk-item .mkn { flex: 1; }\
.mk-item .mkn strong { color: #ffdd66; font-size: 13px; }\
.mk-item .mkn .mkp { font-size: 11px; color: #aaa; margin-top: 2px; }\
.mk-item .mkact button {\
    background: #cc9933; border: none; color: #fff; padding: 4px 10px;\
    border-radius: 8px; font-size: 11px; cursor: pointer; margin: 0 2px;\
}\
.mk-item .mkact button:hover { background: #e0aa44; }\
.mk-item .mkact button.sell { background: #5577aa; }\
.mk-item .mkact button.sell:hover { background: #6688bb; }\
.mk-close {\
    display: block; margin: 16px auto 0; background: #cc9933; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
#prepard-btn {\
    position: fixed; top: 730px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ff7744;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#prepard-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#prepard-panel.show { display: flex; }\
#prepard-box {\
    background: linear-gradient(145deg, #2a1510, #1a0a05);\
    border: 2px solid #e05530; border-radius: 16px;\
    padding: 24px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#prepard-box h2 { color: #ff7744; text-align: center; margin-bottom: 12px; }\
.prep-score { text-align: center; font-size: 15px; color: #ffaa77; margin-bottom: 14px; }\
.prep-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(224,85,48,0.2);\
}\
.prep-item .pri { font-size: 24px; }\
.prep-item .prn { flex: 1; }\
.prep-item .prn strong { color: #ffaa77; font-size: 13px; }\
.prep-item .prn .prdet { font-size: 11px; color: #aaa; margin-top: 2px; }\
.prep-item .pract button {\
    background: #e05530; border: none; color: #fff; padding: 5px 12px;\
    border-radius: 8px; font-size: 11px; cursor: pointer;\
}\
.prep-item .pract button:hover { background: #f06644; }\
.prep-item .pract button:disabled { background: #555; cursor: not-allowed; color: #999; }\
.prep-close {\
    display: block; margin: 16px auto 0; background: #e05530; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
#heritage-btn {\
    position: fixed; top: 770px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #88ddaa;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#heritage-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#heritage-panel.show { display: flex; }\
#heritage-box {\
    background: linear-gradient(145deg, #122a1a, #081a0e);\
    border: 2px solid #44bb77; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#heritage-box h2 { color: #88ddaa; text-align: center; margin-bottom: 12px; }\
.hrt-progress { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.hrt-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(68,187,119,0.2);\
}\
.hrt-item.discovered { background: rgba(68,187,119,0.08); border-color: rgba(68,187,119,0.5); }\
.hrt-item .hri { font-size: 28px; filter: grayscale(1) brightness(0.4); }\
.hrt-item.discovered .hri { filter: none; }\
.hrt-item .hrn { flex: 1; }\
.hrt-item .hrn strong { color: #88ddaa; font-size: 13px; }\
.hrt-item .hrn .hrdet { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.hrt-item .hrera { font-size: 10px; color: #66aa88; background: rgba(68,187,119,0.1); padding: 2px 8px; border-radius: 8px; }\
.hrt-close {\
    display: block; margin: 16px auto 0; background: #44bb77; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
#council-btn {\
    position: fixed; top: 810px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #88aaff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#council-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#council-panel.show { display: flex; }\
#council-box {\
    background: linear-gradient(145deg, #141a2e, #0a0e1e);\
    border: 2px solid #4466cc; border-radius: 16px;\
    padding: 24px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#council-box h2 { color: #88aaff; text-align: center; margin-bottom: 12px; }\
.cncl-rep { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.cncl-pet {\
    display: flex; align-items: flex-start; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(68,102,204,0.2);\
}\
.cncl-pet.resolved { opacity: 0.5; }\
.cncl-pet .cpi { font-size: 24px; }\
.cncl-pet .cpn { flex: 1; }\
.cncl-pet .cpn strong { color: #aaccff; font-size: 13px; }\
.cncl-pet .cpn .cpdet { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.cncl-pet .cpact button {\
    background: #4466cc; border: none; color: #fff; padding: 5px 12px;\
    border-radius: 8px; font-size: 11px; cursor: pointer; margin-top: 4px;\
}\
.cncl-pet .cpact button:hover { background: #5577dd; }\
.cncl-pet .cpact button:disabled { background: #444; cursor: not-allowed; color: #888; }\
.cncl-close {\
    display: block; margin: 16px auto 0; background: #4466cc; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
#ranking-btn {\
    position: fixed; top: 850px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffdd44;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#ranking-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#ranking-panel.show { display: flex; }\
#ranking-box {\
    background: linear-gradient(145deg, #2a2210, #1a1508);\
    border: 2px solid #ddaa33; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#ranking-box h2 { color: #ffdd44; text-align: center; margin-bottom: 12px; }\
#ranking-canvas { width: 100%; height: 220px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 14px; }\
.rank-legend { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 14px; }\
.rank-leg-item { font-size: 11px; color: #ccc; display: flex; align-items: center; gap: 4px; }\
.rank-leg-dot { width: 10px; height: 10px; border-radius: 50%; }\
.rank-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }\
.rank-stat {\
    background: rgba(255,255,255,0.04); border-radius: 10px; padding: 10px; text-align: center;\
    border: 1px solid rgba(221,170,51,0.15);\
}\
.rank-stat .rs-val { font-size: 20px; font-weight: bold; color: #ffd700; }\
.rank-stat .rs-lbl { font-size: 10px; color: #aaa; margin-top: 2px; }\
.rank-close {\
    display: block; margin: 16px auto 0; background: #ddaa33; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
@media (max-width: 600px) {\
    #popclass-btn, #market-btn, #prepard-btn, #heritage-btn, #council-btn, #ranking-btn { display: none; }\
}\
';

// ===================== DATA =====================

var POP_CLASSES = [
    { id: 'farmer', icon: '🌾', name: '농민', desc: '식량 생산의 근간. 시대별 농업 기술로 생산량 증가.', color: '#66bb6a', baseRatio: 0.45 },
    { id: 'merchant', icon: '🏪', name: '상인', desc: '교역과 시장을 통해 금 수입 증가. 무역로가 많을수록 번성.', color: '#ffa726', baseRatio: 0.20 },
    { id: 'soldier', icon: '⚔️', name: '군인', desc: '도시 방어와 영토 확장. 연병장, 성곽에 영향.', color: '#ef5350', baseRatio: 0.15 },
    { id: 'scholar', icon: '📚', name: '학자', desc: '기술 연구 속도 향상. 교육 건물이 많을수록 증가.', color: '#42a5f5', baseRatio: 0.12 },
    { id: 'noble', icon: '👑', name: '귀족', desc: '정책 효과 강화, 외교 보너스. 문화건물에 비례.', color: '#ab47bc', baseRatio: 0.08 }
];

var MARKET_GOODS = [
    { id: 'rice', icon: '🍚', name: '쌀', basePrice: 5, volatility: 0.3 },
    { id: 'iron', icon: '⚒️', name: '철기', basePrice: 12, volatility: 0.4 },
    { id: 'silk', icon: '🧵', name: '비단', basePrice: 20, volatility: 0.5 },
    { id: 'pottery', icon: '🏺', name: '도자기', basePrice: 15, volatility: 0.35 },
    { id: 'timber', icon: '🪵', name: '목재', basePrice: 8, volatility: 0.25 },
    { id: 'medicine', icon: '🌿', name: '약초', basePrice: 18, volatility: 0.45 },
    { id: 'salt', icon: '🧂', name: '소금', basePrice: 10, volatility: 0.2 },
    { id: 'gems', icon: '💎', name: '보석', basePrice: 35, volatility: 0.6 }
];

var DISASTER_PREPS = [
    { id: 'firewall', icon: '🧱', name: '방화벽', desc: '화재 피해 40% 감소', cost: 50, effect: 'fire', reduction: 40, built: false },
    { id: 'levee', icon: '🌊', name: '제방', desc: '홍수 피해 50% 감소', cost: 80, effect: 'flood', reduction: 50, built: false },
    { id: 'granary', icon: '🌾', name: '비상곡물창고', desc: '가뭄 피해 45% 감소', cost: 60, effect: 'drought', reduction: 45, built: false },
    { id: 'hospital', icon: '🏥', name: '의원', desc: '전염병 피해 55% 감소', cost: 100, effect: 'plague', reduction: 55, built: false },
    { id: 'watchtower', icon: '🗼', name: '망루', desc: '침략 피해 35% 감소 + 사전 경보', cost: 70, effect: 'invasion', reduction: 35, built: false },
    { id: 'shelter', icon: '🏠', name: '대피소', desc: '모든 재해 피해 15% 추가 감소', cost: 120, effect: 'all', reduction: 15, built: false }
];

var HERITAGE_SITES = [
    { id: 'dolmen', icon: '🪨', name: '고인돌 유적', era: '고조선', desc: '세계 고인돌의 40%가 한반도에 집중. 거석문화의 증거.', minEra: 0 },
    { id: 'bronze_dagger', icon: '🗡️', name: '비파형동검 출토지', era: '고조선', desc: '청동기 시대 한반도 고유의 무기. 고조선 영역 확인.', minEra: 0 },
    { id: 'ondol', icon: '🔥', name: '온돌 유구', era: '삼국', desc: '세계 유일의 난방 시스템. 고구려에서 발전.', minEra: 1 },
    { id: 'stupa', icon: '🛕', name: '석탑 유적', era: '삼국', desc: '불교 전래와 함께 발전한 석조 건축의 정수.', minEra: 1 },
    { id: 'kiln', icon: '🏺', name: '청자 가마터', era: '고려', desc: '고려청자의 비색은 세계 도자기 역사의 걸작.', minEra: 2 },
    { id: 'tripitaka', icon: '📜', name: '대장경 판각소', era: '고려', desc: '팔만대장경 81,258장. 세계 최대 목판 인쇄물.', minEra: 2 },
    { id: 'hangul', icon: '🔤', name: '훈민정음 반포지', era: '조선', desc: '1446년 세종대왕의 위대한 업적. 과학적 문자 체계.', minEra: 3 },
    { id: 'joseon_palace', icon: '🏯', name: '궁궐 터', era: '조선', desc: '경복궁, 창덕궁 등 조선 왕실의 중심.', minEra: 3 },
    { id: 'seowon', icon: '🎓', name: '서원 유적', era: '조선', desc: '조선 사림의 교육기관. 유네스코 세계유산.', minEra: 3 },
    { id: 'modern_school', icon: '🏫', name: '근대학교 터', era: '근대', desc: '배재학당, 이화학당 등 근대 교육의 시작점.', minEra: 4 }
];

var COUNCIL_PETITIONS = [
    { id: 'tax_cut', icon: '💰', name: '세금 경감 요구', desc: '주민들이 세금 인하를 청원합니다. 수용하면 만족도 +20, 금 수입 -2턴.', costGold: 30, rewardHappy: 20, resolved: false },
    { id: 'market_open', icon: '🏪', name: '시장 활성화 요청', desc: '상인들이 시장 확대를 요청합니다. 수용하면 교역 보너스 +15%.', costGold: 50, rewardHappy: 10, resolved: false },
    { id: 'safety_patrol', icon: '🛡️', name: '야간 순찰 강화', desc: '주민 안전 강화 요청. 방어력 +10, 비용 지출.', costGold: 40, rewardHappy: 15, resolved: false },
    { id: 'festival_req', icon: '🎭', name: '축제 개최 탄원', desc: '주민들이 대규모 축제를 원합니다. 문화 만족도 +25.', costGold: 60, rewardHappy: 25, resolved: false },
    { id: 'school_req', icon: '📖', name: '학교 건립 청원', desc: '학부모들의 교육 시설 확충 요청. 학자 비율 +5%.', costGold: 80, rewardHappy: 15, resolved: false },
    { id: 'road_fix', icon: '🛤️', name: '도로 보수 요청', desc: '교통 인프라 정비 요청. 교통 보너스 +10%.', costGold: 35, rewardHappy: 12, resolved: false }
];

var V9_QUIZ_QUESTIONS = [
    { q: '한국 전통 시장에서 가장 오래된 것은?', a: ['남대문시장','동대문시장','광장시장','자갈치시장'], c: 0, h: '남대문시장은 1414년(태종 14년) 개설된 한국 최초의 상설시장입니다.' },
    { q: '고려시대 국제무역항은?', a: ['벽란도','울산항','부산포','마산포'], c: 0, h: '벽란도는 예성강 하구의 국제항으로 아라비아 상인까지 왕래했습니다.' },
    { q: '조선시대 인구조사 문서는?', a: ['호적대장','족보','문과방목','향안'], c: 0, h: '호적대장은 3년마다 작성된 인구 및 가구 조사 문서입니다.' },
    { q: '한양 도성의 4대문이 아닌 것은?', a: ['숭례문','흥인지문','돈의문','광화문'], c: 3, h: '광화문은 경복궁의 정문이지 한양 도성 4대문이 아닙니다.' },
    { q: '조선시대 국가 방위의 핵심 기관은?', a: ['비변사','의정부','승정원','사헌부'], c: 0, h: '비변사는 임진왜란 이후 국방과 정무를 총괄한 최고 기관입니다.' },
    { q: '고려의 수도 개경에 있던 궁궐은?', a: ['만월대','덕수궁','경복궁','창경궁'], c: 0, h: '만월대(궁궐 터)는 개성 송악산 남쪽에 위치한 고려 왕궁입니다.' },
    { q: '한국 최초의 근대식 공원은?', a: ['탑골공원','남산공원','대공원','효창공원'], c: 0, h: '탑골공원(파고다공원)은 1897년 조성된 한국 최초의 근대식 공원입니다.' },
    { q: '삼국시대 도시 방어의 핵심 시설은?', a: ['산성','읍성','토성','목책'], c: 0, h: '산성은 산 지형을 이용한 방어 시설로 삼국시대 전쟁의 핵심이었습니다.' },
    { q: '조선 정조가 건설한 계획도시는?', a: ['수원 화성','한양','강화도','공주'], c: 0, h: '수원 화성은 정조가 1796년 완성한 동서양 축성술의 집대성입니다.' },
    { q: '고구려 수도가 아닌 곳은?', a: ['졸본','국내성','평양','한성'], c: 3, h: '한성은 백제의 수도였으며, 고구려 수도는 졸본→국내성→평양입니다.' },
    { q: '조선시대 화폐 &#39;상평통보&#39;의 재질은?', a: ['구리','은','금','철'], c: 0, h: '상평통보는 구리를 주재료로 한 동전으로 1678년부터 유통되었습니다.' },
    { q: '한국 전통 마을의 입지 원칙은?', a: ['배산임수','전고후저','사면해안','평지중심'], c: 0, h: '배산임수(背山臨水)는 뒤에 산, 앞에 물이 있는 전통 입지 조건입니다.' },
    { q: '고려시대 최대 축제는?', a: ['팔관회','연등회','단오제','한식'], c: 0, h: '팔관회는 토속신과 불교를 합친 고려 최대 국가 축제였습니다.' },
    { q: '조선시대 한양의 인구는 약?', a: ['20만명','50만명','100만명','5만명'], c: 0, h: '조선 후기 한양의 인구는 성저십리 포함 약 20만 명 규모였습니다.' },
    { q: '독립문이 세워진 자리에 있던 것은?', a: ['영은문','광화문','숭례문','독립관'], c: 0, h: '영은문은 중국 사신을 맞이하던 문으로 독립협회가 철거 후 독립문을 세웠습니다.' }
];

var V9_ACHIEVEMENTS = [
    { id: 'v9_first_class', icon: '🌾', title: '계급 사회', desc: '인구 계층 시스템을 처음 확인' },
    { id: 'v9_market_king', icon: '🏪', title: '시장의 왕', desc: '교역소에서 10회 거래 완료' },
    { id: 'v9_prep_3', icon: '🛡️', title: '방재 전문가', desc: '재해 대비 시설 3개 이상 건설' },
    { id: 'v9_prep_all', icon: '🏆', title: '철벽 방어', desc: '모든 재해 대비 시설 완성' },
    { id: 'v9_heritage_5', icon: '🏛️', title: '유산 탐험가', desc: '문화유산 5개 이상 발견' },
    { id: 'v9_heritage_all', icon: '🌟', title: '유산의 수호자', desc: '모든 문화유산 발견' },
    { id: 'v9_council_3', icon: '🗣️', title: '민의 대변인', desc: '의회 청원 3개 해결' },
    { id: 'v9_council_all', icon: '👑', title: '현명한 군주', desc: '모든 의회 청원 해결' },
    { id: 'v9_ranking_s', icon: '⭐', title: 'S등급 도시', desc: '도시 종합 점수 S등급 달성' },
    { id: 'v9_quiz_85', icon: '🧠', title: '역사 박사 v9', desc: '퀴즈 85문제 전부 정답' },
    { id: 'v9_trade_100g', icon: '💰', title: '부의 축적', desc: '교역으로 총 100금 이상 수익' },
    { id: 'v9_explorer', icon: '🗺️', title: 'v9 탐험가', desc: 'v9.0의 모든 기능 체험' }
];

var V9_ADVISOR_TIPS = [
    '💡 인구 계층을 확인하세요! 농민/상인/군인/학자/귀족 비율이 도시 발전에 영향을 줍니다.',
    '💡 교역소에서 물건을 사고팔아 금을 벌 수 있어요. 가격은 턴마다 변동합니다.',
    '💡 재해 대비 시설을 미리 건설하면 재해 피해를 크게 줄일 수 있습니다.',
    '💡 문화유산은 시대가 진행되면 자동으로 발견됩니다. 도감을 확인하세요!',
    '💡 시민 의회의 청원을 해결하면 주민 만족도가 크게 올라갑니다.',
    '💡 도시 랭킹에서 종합 S등급을 목표로 해보세요!',
    '💡 교역소에서 싸게 사서 비싸게 파는 전략이 금 축적의 핵심입니다.',
    '💡 모든 재해 대비 시설을 갖추면 재해 피해가 대폭 줄어듭니다.',
    '💡 학자 비율이 높으면 기술 연구 속도가 빨라져요.',
    '💡 귀족 비율이 높으면 외교 보너스가 올라갑니다.'
];

// ===================== STATE =====================
var marketPrices = {};
var marketInventory = {};
var tradeCount = 0;
var tradeProfit = 0;
var prepState = {};
var heritageDiscovered = new Set();
var councilResolved = new Set();
var v9FeaturesUsed = new Set();
var v9RankViewed = false;

function initMarketPrices() {
    MARKET_GOODS.forEach(function(g) {
        marketPrices[g.id] = g.basePrice;
        marketInventory[g.id] = 0;
    });
}

function fluctuateMarket() {
    MARKET_GOODS.forEach(function(g) {
        var change = (Math.random() - 0.5) * 2 * g.volatility * g.basePrice;
        marketPrices[g.id] = Math.max(Math.round(g.basePrice * 0.3), Math.round(marketPrices[g.id] + change));
    });
}

function getPopClasses() {
    var pop = (typeof window.resources !== 'undefined' && window.resources.pop) ? window.resources.pop : 100;
    var buildingCount = 0;
    var culturalCount = 0;
    var militaryCount = 0;
    var educationCount = 0;
    var commercialCount = 0;

    if(typeof window.grid !== 'undefined') {
        for(var y = 0; y < window.grid.length; y++) {
            for(var x = 0; x < window.grid[y].length; x++) {
                if(window.grid[y][x]) {
                    buildingCount++;
                    var bid = window.grid[y][x].id || '';
                    if(bid.indexOf('temple') > -1 || bid.indexOf('school') > -1 || bid.indexOf('confucian') > -1 || bid.indexOf('pagoda') > -1) educationCount++;
                    if(bid.indexOf('market') > -1 || bid.indexOf('warehouse') > -1 || bid.indexOf('inn') > -1 || bid.indexOf('shop') > -1) commercialCount++;
                    if(bid.indexOf('barracks') > -1 || bid.indexOf('fortress') > -1 || bid.indexOf('wall') > -1 || bid.indexOf('tower') > -1) militaryCount++;
                    if(bid.indexOf('monument') > -1 || bid.indexOf('palace') > -1 || bid.indexOf('gate') > -1 || bid.indexOf('park') > -1) culturalCount++;
                }
            }
        }
    }

    var farmerR = 0.45 - (commercialCount * 0.02) - (educationCount * 0.01);
    var merchantR = 0.20 + (commercialCount * 0.02);
    var soldierR = 0.15 + (militaryCount * 0.015);
    var scholarR = 0.12 + (educationCount * 0.02);
    var nobleR = 0.08 + (culturalCount * 0.015);

    var total = farmerR + merchantR + soldierR + scholarR + nobleR;
    var ratios = [farmerR/total, merchantR/total, soldierR/total, scholarR/total, nobleR/total];

    return POP_CLASSES.map(function(cls, i) {
        return {
            id: cls.id, icon: cls.icon, name: cls.name, desc: cls.desc,
            color: cls.color, count: Math.round(pop * ratios[i]), ratio: ratios[i]
        };
    });
}

function getDisasterReduction(type) {
    var reduction = 0;
    DISASTER_PREPS.forEach(function(p) {
        if(p.built && (p.effect === type || p.effect === 'all')) {
            reduction += p.reduction;
        }
    });
    return Math.min(reduction, 85);
}

function getCityScore() {
    var score = 0;
    var pop = (typeof window.resources !== 'undefined' && window.resources.pop) ? window.resources.pop : 0;
    var buildings = 0;
    if(typeof window.grid !== 'undefined') {
        for(var y = 0; y < window.grid.length; y++) {
            for(var x = 0; x < window.grid[y].length; x++) {
                if(window.grid[y][x]) buildings++;
            }
        }
    }
    score += Math.min(pop * 0.5, 200);
    score += Math.min(buildings * 2, 200);
    score += heritageDiscovered.size * 15;
    score += councilResolved.size * 10;
    var prepBuilt = 0;
    DISASTER_PREPS.forEach(function(p) { if(p.built) prepBuilt++; });
    score += prepBuilt * 20;
    score += Math.min(tradeProfit * 0.5, 100);
    var eraIdx = 0;
    if(typeof window.currentEra !== 'undefined') {
        var eras = ['고조선','삼국','고려','조선','근대'];
        eraIdx = eras.indexOf(window.currentEra);
        if(eraIdx < 0) eraIdx = 0;
    }
    score += eraIdx * 30;
    return Math.round(score);
}

function getCityGrade(score) {
    if(score >= 600) return { grade: 'S', color: '#ffd700', label: '전설의 도시' };
    if(score >= 450) return { grade: 'A', color: '#4caf50', label: '번영하는 도시' };
    if(score >= 300) return { grade: 'B', color: '#42a5f5', label: '성장하는 도시' };
    if(score >= 150) return { grade: 'C', color: '#ff9800', label: '발전중인 마을' };
    return { grade: 'D', color: '#f44336', label: '작은 마을' };
}

function checkHeritageDiscovery() {
    var eraIdx = 0;
    if(typeof window.currentEra !== 'undefined') {
        var eras = ['고조선','삼국','고려','조선','근대'];
        eraIdx = eras.indexOf(window.currentEra);
        if(eraIdx < 0) eraIdx = 0;
    }
    HERITAGE_SITES.forEach(function(h) {
        if(!heritageDiscovered.has(h.id) && eraIdx >= h.minEra) {
            var chance = 0.15 + (eraIdx - h.minEra) * 0.1;
            if(Math.random() < chance) {
                heritageDiscovered.add(h.id);
                playV9SFX('heritage_discover');
                if(typeof toast === 'function') toast('🏛️ 문화유산 발견: ' + h.name);
            }
        }
    });
    checkV9Achievements();
}

// ===================== UI =====================
function addV9UI() {
    var style = document.createElement('style');
    style.textContent = V9_CSS;
    document.head.appendChild(style);

    var body = document.body;

    // Quick action buttons (top bar area)
    var btns = [
        { id: 'popclass-btn', text: '👥', title: '인구 계층', top: '130px', right: '10px' },
        { id: 'market-btn', text: '🏪', title: '교역소', top: '170px', right: '10px' },
        { id: 'prepard-btn', text: '🛡️', title: '재해 대비', top: '210px', right: '10px' },
        { id: 'heritage-btn', text: '🏛️', title: '문화유산', top: '250px', right: '10px' },
        { id: 'council-btn', text: '🗣️', title: '시민 의회', top: '290px', right: '10px' },
        { id: 'ranking-btn', text: '🏆', title: '도시 랭킹', top: '330px', right: '10px' }
    ];

    btns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.id = b.id;
        btn.textContent = b.text;
        btn.title = b.title;
        btn.style.cssText = 'position:fixed;top:'+b.top+';right:'+b.right+';z-index:10;background:rgba(0,0,0,0.7);border:1px solid #555;color:#fff;width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;';
        body.appendChild(btn);
    });

    document.getElementById('popclass-btn').onclick = showPopClasses;
    document.getElementById('market-btn').onclick = showMarket;
    document.getElementById('prepard-btn').onclick = showDisasterPrep;
    document.getElementById('heritage-btn').onclick = showHeritage;
    document.getElementById('council-btn').onclick = showCouncil;
    document.getElementById('ranking-btn').onclick = showRanking;

    // Panels
    addPopClassPanel();
    addMarketPanel();
    addPrepPanel();
    addHeritagePanel();
    addCouncilPanel();
    addRankingPanel();
}

function addPopClassPanel() {
    var d = document.createElement('div');
    d.id = 'popclass-panel';
    d.innerHTML = '<div id="popclass-box"><h2>👥 인구 계층</h2><div class="pc-summary" id="pc-summary"></div><div id="pc-list"></div><button class="pc-close" onclick="document.getElementById(\'popclass-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

function addMarketPanel() {
    var d = document.createElement('div');
    d.id = 'market-panel';
    d.innerHTML = '<div id="market-box"><h2>🏪 교역소</h2><div class="mk-balance" id="mk-balance"></div><div id="mk-list"></div><div style="text-align:center;margin-top:10px;font-size:11px;color:#888;">가격은 턴마다 변동합니다. 싸게 사서 비싸게 파세요!</div><button class="mk-close" onclick="document.getElementById(\'market-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

function addPrepPanel() {
    var d = document.createElement('div');
    d.id = 'prepard-panel';
    d.innerHTML = '<div id="prepard-box"><h2>🛡️ 재해 대비</h2><div class="prep-score" id="prep-score"></div><div id="prep-list"></div><button class="prep-close" onclick="document.getElementById(\'prepard-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

function addHeritagePanel() {
    var d = document.createElement('div');
    d.id = 'heritage-panel';
    d.innerHTML = '<div id="heritage-box"><h2>🏛️ 문화유산 도감</h2><div class="hrt-progress" id="hrt-progress"></div><div id="hrt-list"></div><button class="hrt-close" onclick="document.getElementById(\'heritage-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

function addCouncilPanel() {
    var d = document.createElement('div');
    d.id = 'council-panel';
    d.innerHTML = '<div id="council-box"><h2>🗣️ 시민 의회</h2><div class="cncl-rep" id="cncl-rep"></div><div id="cncl-list"></div><button class="cncl-close" onclick="document.getElementById(\'council-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

function addRankingPanel() {
    var d = document.createElement('div');
    d.id = 'ranking-panel';
    d.innerHTML = '<div id="ranking-box"><h2>🏆 도시 종합 랭킹</h2><canvas id="ranking-canvas" width="480" height="220"></canvas><div class="rank-legend" id="rank-legend"></div><div class="rank-stats" id="rank-stats"></div><button class="rank-close" onclick="document.getElementById(\'ranking-panel\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

// ===================== SHOW FUNCTIONS =====================
function showPopClasses() {
    playV9SFX('class_promote');
    v9FeaturesUsed.add('popclass');
    var classes = getPopClasses();
    var pop = classes.reduce(function(s, c) { return s + c.count; }, 0);
    document.getElementById('pc-summary').textContent = '총 인구: ' + pop + '명 | 5계층 분포';
    var html = '';
    classes.forEach(function(c) {
        var pct = (c.ratio * 100).toFixed(1);
        html += '<div class="pc-class"><div class="pci">' + c.icon + '</div><div class="pcn"><strong>' + c.name + ' (' + c.count + '명, ' + pct + '%)</strong><div class="pcdet">' + c.desc + '</div><div class="pc-bar"><div class="pc-bar-fill" style="width:' + pct + '%;background:' + c.color + '"></div></div></div></div>';
    });
    document.getElementById('pc-list').innerHTML = html;
    document.getElementById('popclass-panel').classList.add('show');
    checkV9Achievements();
}

function showMarket() {
    playV9SFX('market_trade');
    v9FeaturesUsed.add('market');
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    document.getElementById('mk-balance').textContent = '💰 보유 금: ' + gold;
    var html = '';
    MARKET_GOODS.forEach(function(g) {
        var price = marketPrices[g.id] || g.basePrice;
        var inv = marketInventory[g.id] || 0;
        var diff = price - g.basePrice;
        var diffStr = diff > 0 ? '<span style="color:#4caf50">▲' + diff + '</span>' : diff < 0 ? '<span style="color:#f44336">▼' + Math.abs(diff) + '</span>' : '<span style="color:#888">-</span>';
        html += '<div class="mk-item"><div class="mki">' + g.icon + '</div><div class="mkn"><strong>' + g.name + '</strong><div class="mkp">가격: ' + price + '금 ' + diffStr + ' | 보유: ' + inv + '개</div></div><div class="mkact"><button onclick="v9BuyGood(\'' + g.id + '\')">구매</button><button class="sell" onclick="v9SellGood(\'' + g.id + '\')">판매</button></div></div>';
    });
    document.getElementById('mk-list').innerHTML = html;
    document.getElementById('market-panel').classList.add('show');
}

function showDisasterPrep() {
    playV9SFX('disaster_prep');
    v9FeaturesUsed.add('prep');
    var builtCount = 0;
    DISASTER_PREPS.forEach(function(p) { if(p.built) builtCount++; });
    document.getElementById('prep-score').textContent = '방재 준비도: ' + builtCount + '/' + DISASTER_PREPS.length + ' (' + Math.round(builtCount / DISASTER_PREPS.length * 100) + '%)';
    var html = '';
    DISASTER_PREPS.forEach(function(p) {
        var btnText = p.built ? '✅ 완료' : '건설 (' + p.cost + '금)';
        var disabled = p.built ? ' disabled' : '';
        html += '<div class="prep-item"><div class="pri">' + p.icon + '</div><div class="prn"><strong>' + p.name + '</strong><div class="prdet">' + p.desc + '</div></div><div class="pract"><button onclick="v9BuildPrep(\'' + p.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('prep-list').innerHTML = html;
    document.getElementById('prepard-panel').classList.add('show');
}

function showHeritage() {
    playV9SFX('heritage_discover');
    v9FeaturesUsed.add('heritage');
    document.getElementById('hrt-progress').textContent = '발견: ' + heritageDiscovered.size + '/' + HERITAGE_SITES.length;
    var html = '';
    HERITAGE_SITES.forEach(function(h) {
        var found = heritageDiscovered.has(h.id);
        html += '<div class="hrt-item' + (found ? ' discovered' : '') + '"><div class="hri">' + h.icon + '</div><div class="hrn"><strong>' + (found ? h.name : '???') + '</strong><div class="hrdet">' + (found ? h.desc : '아직 발견되지 않았습니다. 시대를 진행하세요.') + '</div></div><div class="hrera">' + (found ? h.era : '?') + '</div></div>';
    });
    document.getElementById('hrt-list').innerHTML = html;
    document.getElementById('heritage-panel').classList.add('show');
}

function showCouncil() {
    playV9SFX('council_petition');
    v9FeaturesUsed.add('council');
    document.getElementById('cncl-rep').textContent = '해결된 청원: ' + councilResolved.size + '/' + COUNCIL_PETITIONS.length;
    var html = '';
    COUNCIL_PETITIONS.forEach(function(p) {
        var resolved = councilResolved.has(p.id);
        var btnText = resolved ? '✅ 해결됨' : '수용 (' + p.costGold + '금)';
        var disabled = resolved ? ' disabled' : '';
        html += '<div class="cncl-pet' + (resolved ? ' resolved' : '') + '"><div class="cpi">' + p.icon + '</div><div class="cpn"><strong>' + p.name + '</strong><div class="cpdet">' + p.desc + '</div></div><div class="cpact"><button onclick="v9ResolvePetition(\'' + p.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('cncl-list').innerHTML = html;
    document.getElementById('council-panel').classList.add('show');
}

function showRanking() {
    playV9SFX('ranking_view');
    v9FeaturesUsed.add('ranking');
    v9RankViewed = true;
    var score = getCityScore();
    var gradeInfo = getCityGrade(score);

    // Draw Canvas
    var canvas = document.getElementById('ranking-canvas');
    if(canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Background
        var bg = ctx.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, '#1a1508');
        bg.addColorStop(1, '#0e0a04');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Score categories
        var categories = [
            { label: '인구', value: Math.min((typeof window.resources !== 'undefined' ? window.resources.pop || 0 : 0) * 0.5, 200), max: 200, color: '#66bb6a' },
            { label: '건물', value: 0, max: 200, color: '#42a5f5' },
            { label: '유산', value: heritageDiscovered.size * 15, max: 150, color: '#88ddaa' },
            { label: '외교', value: councilResolved.size * 10, max: 60, color: '#88aaff' },
            { label: '방재', value: 0, max: 120, color: '#ff7744' },
            { label: '교역', value: Math.min(tradeProfit * 0.5, 100), max: 100, color: '#ffcc44' }
        ];

        if(typeof window.grid !== 'undefined') {
            var bCount = 0;
            for(var yy = 0; yy < window.grid.length; yy++) {
                for(var xx = 0; xx < window.grid[yy].length; xx++) {
                    if(window.grid[yy][xx]) bCount++;
                }
            }
            categories[1].value = Math.min(bCount * 2, 200);
        }
        var prepBuilt2 = 0;
        DISASTER_PREPS.forEach(function(p) { if(p.built) prepBuilt2++; });
        categories[4].value = prepBuilt2 * 20;

        var barW = 52, gap = 16;
        var startX = (w - categories.length * (barW + gap) + gap) / 2;
        var barAreaH = h - 70;
        var maxVal = 200;

        categories.forEach(function(cat, i) {
            var x = startX + i * (barW + gap);
            var barH = (cat.value / maxVal) * barAreaH;
            if(barH < 2) barH = 2;

            // Bar background
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
            ctx.roundRect(x, 30, barW, barAreaH, 4);
            ctx.fill();

            // Bar fill
            var grad = ctx.createLinearGradient(0, 30 + barAreaH - barH, 0, 30 + barAreaH);
            grad.addColorStop(0, cat.color);
            grad.addColorStop(1, cat.color + '66');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, 30 + barAreaH - barH, barW, barH, 4);
            ctx.fill();

            // Value
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(cat.value), x + barW/2, 30 + barAreaH - barH - 6);

            // Label
            ctx.fillStyle = '#aaa';
            ctx.font = '11px sans-serif';
            ctx.fillText(cat.label, x + barW/2, h - 10);
        });

        // Grade badge
        ctx.fillStyle = gradeInfo.color;
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(gradeInfo.grade, w - 20, 30);
        ctx.font = '12px sans-serif';
        ctx.fillText(score + '점', w - 20, 48);
    }

    // Legend
    var legHtml = '';
    [
        { c: '#66bb6a', l: '인구' }, { c: '#42a5f5', l: '건물' }, { c: '#88ddaa', l: '유산' },
        { c: '#88aaff', l: '외교' }, { c: '#ff7744', l: '방재' }, { c: '#ffcc44', l: '교역' }
    ].forEach(function(item) {
        legHtml += '<div class="rank-leg-item"><div class="rank-leg-dot" style="background:' + item.c + '"></div>' + item.l + '</div>';
    });
    document.getElementById('rank-legend').innerHTML = legHtml;

    // Stats
    var statsHtml = '';
    statsHtml += '<div class="rank-stat"><div class="rs-val" style="color:' + gradeInfo.color + '">' + gradeInfo.grade + '</div><div class="rs-lbl">' + gradeInfo.label + '</div></div>';
    statsHtml += '<div class="rank-stat"><div class="rs-val">' + score + '</div><div class="rs-lbl">종합 점수</div></div>';
    statsHtml += '<div class="rank-stat"><div class="rs-val">' + heritageDiscovered.size + '/' + HERITAGE_SITES.length + '</div><div class="rs-lbl">문화유산</div></div>';
    statsHtml += '<div class="rank-stat"><div class="rs-val">' + tradeProfit + '금</div><div class="rs-lbl">교역 수익</div></div>';
    document.getElementById('rank-stats').innerHTML = statsHtml;

    document.getElementById('ranking-panel').classList.add('show');
    checkV9Achievements();
}

// ===================== ACTION FUNCTIONS =====================
window.v9BuyGood = function(goodId) {
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    var price = marketPrices[goodId] || 10;
    if(gold < price) {
        if(typeof toast === 'function') toast('⚠️ 금이 부족합니다!');
        return;
    }
    window.resources.gold -= price;
    marketInventory[goodId] = (marketInventory[goodId] || 0) + 1;
    tradeCount++;
    playV9SFX('market_trade');
    if(typeof toast === 'function') {
        var g = MARKET_GOODS.find(function(g) { return g.id === goodId; });
        toast('🏪 ' + (g ? g.name : goodId) + ' 구매! (-' + price + '금)');
    }
    showMarket();
    checkV9Achievements();
};

window.v9SellGood = function(goodId) {
    if(!marketInventory[goodId] || marketInventory[goodId] < 1) {
        if(typeof toast === 'function') toast('⚠️ 판매할 물품이 없습니다!');
        return;
    }
    var price = marketPrices[goodId] || 10;
    var sellPrice = Math.round(price * 0.9);
    if(typeof window.resources !== 'undefined') window.resources.gold = (window.resources.gold || 0) + sellPrice;
    marketInventory[goodId]--;
    tradeCount++;
    tradeProfit += sellPrice;
    playV9SFX('market_trade');
    if(typeof toast === 'function') {
        var g = MARKET_GOODS.find(function(g) { return g.id === goodId; });
        toast('💰 ' + (g ? g.name : goodId) + ' 판매! (+' + sellPrice + '금)');
    }
    showMarket();
    checkV9Achievements();
};

window.v9BuildPrep = function(prepId) {
    var prep = DISASTER_PREPS.find(function(p) { return p.id === prepId; });
    if(!prep || prep.built) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < prep.cost) {
        if(typeof toast === 'function') toast('⚠️ 금이 부족합니다! (' + prep.cost + '금 필요)');
        return;
    }
    window.resources.gold -= prep.cost;
    prep.built = true;
    playV9SFX('disaster_prep');
    if(typeof toast === 'function') toast('🛡️ ' + prep.name + ' 건설 완료!');
    showDisasterPrep();
    checkV9Achievements();
};

window.v9ResolvePetition = function(petId) {
    var pet = COUNCIL_PETITIONS.find(function(p) { return p.id === petId; });
    if(!pet || councilResolved.has(petId)) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < pet.costGold) {
        if(typeof toast === 'function') toast('⚠️ 금이 부족합니다! (' + pet.costGold + '금 필요)');
        return;
    }
    window.resources.gold -= pet.costGold;
    councilResolved.add(petId);
    pet.resolved = true;
    playV9SFX('council_petition');
    if(typeof toast === 'function') toast('🗣️ 청원 해결: ' + pet.name + ' (만족도 +' + pet.rewardHappy + ')');
    showCouncil();
    checkV9Achievements();
};

// ===================== ACHIEVEMENTS =====================
function checkV9Achievements() {
    if(typeof window.achievements === 'undefined') return;
    V9_ACHIEVEMENTS.forEach(function(ach) {
        if(window.achievements[ach.id]) return;
        var unlocked = false;
        switch(ach.id) {
            case 'v9_first_class': unlocked = v9FeaturesUsed.has('popclass'); break;
            case 'v9_market_king': unlocked = tradeCount >= 10; break;
            case 'v9_prep_3':
                var bc = 0; DISASTER_PREPS.forEach(function(p) { if(p.built) bc++; });
                unlocked = bc >= 3; break;
            case 'v9_prep_all':
                var ba = true; DISASTER_PREPS.forEach(function(p) { if(!p.built) ba = false; });
                unlocked = ba; break;
            case 'v9_heritage_5': unlocked = heritageDiscovered.size >= 5; break;
            case 'v9_heritage_all': unlocked = heritageDiscovered.size >= HERITAGE_SITES.length; break;
            case 'v9_council_3': unlocked = councilResolved.size >= 3; break;
            case 'v9_council_all': unlocked = councilResolved.size >= COUNCIL_PETITIONS.length; break;
            case 'v9_ranking_s': unlocked = getCityGrade(getCityScore()).grade === 'S'; break;
            case 'v9_quiz_85': unlocked = (typeof window.quizScore !== 'undefined' && window.quizScore >= 85); break;
            case 'v9_trade_100g': unlocked = tradeProfit >= 100; break;
            case 'v9_explorer': unlocked = v9FeaturesUsed.size >= 6; break;
        }
        if(unlocked) {
            window.achievements[ach.id] = true;
            playV9SFX('v9_achieve');
            if(typeof showAchievementToast === 'function') showAchievementToast(ach.icon, ach.title, ach.desc);
            try { localStorage.setItem('cityAchievements', JSON.stringify(window.achievements)); } catch(e){}
        }
    });
}

// ===================== HOOKS =====================
function hookV9GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    var tickCount = 0;
    window.gameTick = function() {
        prevTick();
        tickCount++;
        if(tickCount % 5 === 0) {
            fluctuateMarket();
        }
        if(tickCount % 8 === 0) {
            checkHeritageDiscovery();
        }
    };
}

function hookV9Disaster() {
    var prevApply = window.applyDisaster;
    if(!prevApply) return;
    window.applyDisaster = function(disaster) {
        var reduction = getDisasterReduction(disaster ? (disaster.type || '') : '');
        if(reduction > 0 && disaster && disaster.popLoss) {
            disaster.popLoss = Math.round(disaster.popLoss * (1 - reduction / 100));
        }
        if(reduction > 0 && disaster && disaster.goldLoss) {
            disaster.goldLoss = Math.round(disaster.goldLoss * (1 - reduction / 100));
        }
        return prevApply(disaster);
    };
}

function hookV9CheckAchievements() {
    var prev = window.checkAchievements;
    if(!prev) return;
    window.checkAchievements = function() {
        prev();
        checkV9Achievements();
    };
}

function hookV9ShowAchievements() {
    var prev = window.showAchievements;
    if(!prev) return;
    window.showAchievements = function() {
        V9_ACHIEVEMENTS.forEach(function(ach) {
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

function hookV9Quiz() {
    if(typeof window.QUIZ_QUESTIONS === 'undefined') return;
    V9_QUIZ_QUESTIONS.forEach(function(q) {
        var exists = false;
        for(var i = 0; i < window.QUIZ_QUESTIONS.length; i++) {
            if(window.QUIZ_QUESTIONS[i].q === q.q) { exists = true; break; }
        }
        if(!exists) window.QUIZ_QUESTIONS.push(q);
    });
}

function hookV9AdvisorTips() {
    if(window.V5_ADVISOR_TIPS) {
        V9_ADVISOR_TIPS.forEach(function(tip) {
            if(window.V5_ADVISOR_TIPS.indexOf(tip) === -1) window.V5_ADVISOR_TIPS.push(tip);
        });
    }
}

function hookV9AutoSave() {
    var prev = window.autoSave;
    if(!prev) return;
    window.autoSave = function() {
        prev();
        try {
            localStorage.setItem('cityMarket_v9', JSON.stringify({ prices: marketPrices, inv: marketInventory, count: tradeCount, profit: tradeProfit }));
            var prepSave = {};
            DISASTER_PREPS.forEach(function(p) { prepSave[p.id] = p.built; });
            localStorage.setItem('cityPrep_v9', JSON.stringify(prepSave));
            localStorage.setItem('cityHeritage_v9', JSON.stringify(Array.from(heritageDiscovered)));
            localStorage.setItem('cityCouncil_v9', JSON.stringify(Array.from(councilResolved)));
            localStorage.setItem('cityV9Features', JSON.stringify(Array.from(v9FeaturesUsed)));
        } catch(e){}
    };
}

function hookV9ShowVictory() {
    var prev = window.showVictory;
    if(!prev) return;
    window.showVictory = function() {
        prev();
        var vStats = document.getElementById('v-stats');
        if(vStats) {
            var score = getCityScore();
            var grade = getCityGrade(score);
            vStats.innerHTML += '<p>🏆 도시 등급: ' + grade.grade + ' (' + grade.label + ')</p>';
            vStats.innerHTML += '<p>🏛️ 문화유산: ' + heritageDiscovered.size + '/' + HERITAGE_SITES.length + '</p>';
            vStats.innerHTML += '<p>🏪 교역 수익: ' + tradeProfit + '금</p>';
            vStats.innerHTML += '<p>🛡️ 방재 시설: ' + DISASTER_PREPS.filter(function(p) { return p.built; }).length + '/' + DISASTER_PREPS.length + '</p>';
        }
    };
}

function hookV9Keyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return;
        var v9panels = ['popclass-panel','market-panel','prepard-panel','heritage-panel','council-panel','ranking-panel'];
        var anyOpen = v9panels.some(function(pid) {
            var el = document.getElementById(pid);
            return el && el.classList.contains('show');
        });
        if(anyOpen) {
            if(e.key === 'Escape') {
                v9panels.forEach(function(pid) {
                    var el = document.getElementById(pid);
                    if(el) el.classList.remove('show');
                });
            }
            return;
        }
        if(!e.shiftKey) return;
        switch(e.key) {
            case 'C': showPopClasses(); e.preventDefault(); break;
            case 'X': showMarket(); e.preventDefault(); break;
            case 'Z': showDisasterPrep(); e.preventDefault(); break;
            case 'V': showHeritage(); e.preventDefault(); break;
            case 'B': showCouncil(); e.preventDefault(); break;
            case 'N': showRanking(); e.preventDefault(); break;
        }
    });
}

function loadV9SaveData() {
    try {
        var mk = localStorage.getItem('cityMarket_v9');
        if(mk) {
            var d = JSON.parse(mk);
            if(d.prices) marketPrices = d.prices;
            if(d.inv) marketInventory = d.inv;
            if(d.count) tradeCount = d.count;
            if(d.profit) tradeProfit = d.profit;
        }
        var pr = localStorage.getItem('cityPrep_v9');
        if(pr) {
            var pd = JSON.parse(pr);
            DISASTER_PREPS.forEach(function(p) { if(pd[p.id]) p.built = true; });
        }
        var hr = localStorage.getItem('cityHeritage_v9');
        if(hr) heritageDiscovered = new Set(JSON.parse(hr));
        var cl = localStorage.getItem('cityCouncil_v9');
        if(cl) {
            var ca = JSON.parse(cl);
            councilResolved = new Set(ca);
            COUNCIL_PETITIONS.forEach(function(p) { if(councilResolved.has(p.id)) p.resolved = true; });
        }
        var ft = localStorage.getItem('cityV9Features');
        if(ft) v9FeaturesUsed = new Set(JSON.parse(ft));
    } catch(e){}
}

// ===================== INITIALIZATION =====================
function initV9() {
    initMarketPrices();
    loadV9SaveData();
    addV9UI();
    hookV9GameTick();
    hookV9Disaster();
    hookV9CheckAchievements();
    hookV9ShowAchievements();
    hookV9ShowVictory();
    hookV9Quiz();
    hookV9AdvisorTips();
    hookV9AutoSave();
    hookV9Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🏆 v9.0: 인구계층 + 교역소 + 방재 + 문화유산 + 의회 + 랭킹!');
        }, 6000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV9, 1500); });
} else {
    setTimeout(initV9, 1500);
}

})();
