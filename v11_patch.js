// =====================================================================
// city-builder v11_patch.js — PRIME Holdings NEXTERA+PRISM v11.0
// Self-contained IIFE patch: Education System 10 institutions,
// Natural Disaster Simulator 8 types Canvas, Law System 12 laws,
// Seasonal Events 12 months, City Comparison Canvas 6-axis,
// Citizen Life Simulator 8 types, Architecture Gallery 10 styles,
// Statistics Dashboard Canvas, +15 Quiz (100→115),
// +12 Achievements (98→110), SFX 12, Keyboard 8
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
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'edu_build':
            [523,659,784,1047].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='sine';
                oo.frequency.setValueAtTime(f,now+i*0.09);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09,now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.09+0.25);
                oo.connect(gg);oo.start(now+i*0.09);oo.stop(now+i*0.09+0.25);
            });
            break;
        case 'disaster_alert':
            [200,150,200,150,100].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='sawtooth';
                oo.frequency.setValueAtTime(f,now+i*0.1);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1,now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.1+0.15);
                oo.connect(gg);oo.start(now+i*0.1);oo.stop(now+i*0.1+0.15);
            });
            break;
        case 'disaster_survive':
            o=ctx.createOscillator();o.type='triangle';
            o.frequency.setValueAtTime(440,now);
            o.frequency.linearRampToValueAtTime(880,now+0.3);
            o.connect(g);o.start(now);o.stop(now+0.35);
            break;
        case 'law_enact':
            [330,440,554,659].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='square';
                oo.frequency.setValueAtTime(f,now+i*0.07);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06,now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.07+0.2);
                oo.connect(gg);oo.start(now+i*0.07);oo.stop(now+i*0.07+0.2);
            });
            break;
        case 'law_repeal':
            o=ctx.createOscillator();o.type='sine';
            o.frequency.setValueAtTime(600,now);
            o.frequency.linearRampToValueAtTime(300,now+0.2);
            o.connect(g);o.start(now);o.stop(now+0.25);
            break;
        case 'season_event':
            [784,880,1047,880,784].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='sine';
                oo.frequency.setValueAtTime(f,now+i*0.08);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08,now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.08+0.2);
                oo.connect(gg);oo.start(now+i*0.08);oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'compare_view':
            o=ctx.createOscillator();o.type='triangle';
            o.frequency.setValueAtTime(500,now);
            o.frequency.linearRampToValueAtTime(800,now+0.15);
            o.frequency.linearRampToValueAtTime(600,now+0.3);
            o.connect(g);o.start(now);o.stop(now+0.35);
            break;
        case 'citizen_story':
            o=ctx.createOscillator();o.type='sine';
            o.frequency.setValueAtTime(659,now);
            o.frequency.setValueAtTime(784,now+0.1);
            o.frequency.setValueAtTime(880,now+0.2);
            o.connect(g);o.start(now);o.stop(now+0.3);
            break;
        case 'arch_discover':
            [262,330,392,523,659].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='triangle';
                oo.frequency.setValueAtTime(f,now+i*0.1);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08,now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.1+0.3);
                oo.connect(gg);oo.start(now+i*0.1);oo.stop(now+i*0.1+0.3);
            });
            break;
        case 'stats_view':
            o=ctx.createOscillator();o.type='sine';
            o.frequency.setValueAtTime(440,now);
            o.frequency.setValueAtTime(554,now+0.08);
            o.frequency.setValueAtTime(659,now+0.16);
            o.connect(g);o.start(now);o.stop(now+0.25);
            break;
        case 'v11_achieve':
            [1047,1175,1319,1397,1568].forEach(function(f,i){
                var oo=ctx.createOscillator();oo.type='sine';
                oo.frequency.setValueAtTime(f,now+i*0.06);
                var gg=ctx.createGain();gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1,now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001,now+i*0.06+0.2);
                oo.connect(gg);oo.start(now+i*0.06);oo.stop(now+i*0.06+0.2);
            });
            break;
        case 'quiz_v11':
            o=ctx.createOscillator();o.type='triangle';
            o.frequency.setValueAtTime(880,now);
            o.frequency.linearRampToValueAtTime(1320,now+0.15);
            o.connect(g);o.start(now);o.stop(now+0.2);
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
#edu-panel .v11-box { background: linear-gradient(145deg, #1a1a30, #0e0e20); border: 2px solid #5577dd; }\
#edu-panel h2 { color: #88aaff; }\
#edu-panel .v11-close { background: #5577dd; }\
#edu-panel .vn strong { color: #99bbff; }\
#edu-panel .vact button { background: #5577dd; }\
#disaster-sim-panel .v11-box { background: linear-gradient(145deg, #2a1010, #1a0505); border: 2px solid #dd4444; }\
#disaster-sim-panel h2 { color: #ff7777; }\
#disaster-sim-panel .v11-close { background: #dd4444; }\
#law-panel .v11-box { background: linear-gradient(145deg, #1a2020, #0e1515); border: 2px solid #44aa88; }\
#law-panel h2 { color: #66ddbb; }\
#law-panel .v11-close { background: #44aa88; }\
#law-panel .vn strong { color: #88eedd; }\
#season-panel .v11-box { background: linear-gradient(145deg, #2a2010, #1a1508); border: 2px solid #ddaa44; }\
#season-panel h2 { color: #ffcc66; }\
#season-panel .v11-close { background: #ddaa44; }\
#compare-panel .v11-box { background: linear-gradient(145deg, #151a2a, #0a0e1a); border: 2px solid #4488dd; }\
#compare-panel h2 { color: #66aaff; }\
#compare-panel .v11-close { background: #4488dd; }\
#citizen-panel .v11-box { background: linear-gradient(145deg, #201a2a, #15101a); border: 2px solid #aa66cc; }\
#citizen-panel h2 { color: #cc88ee; }\
#citizen-panel .v11-close { background: #aa66cc; }\
#arch-panel .v11-box { background: linear-gradient(145deg, #201a10, #151008); border: 2px solid #cc8844; }\
#arch-panel h2 { color: #eeaa66; }\
#arch-panel .v11-close { background: #cc8844; }\
#stats-panel .v11-box { background: linear-gradient(145deg, #101a20, #081015); border: 2px solid #44aacc; }\
#stats-panel h2 { color: #66ccee; }\
#stats-panel .v11-close { background: #44aacc; }\
.v11-canvas { width: 100%; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 14px; }\
.law-tag { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; margin-right: 4px; }\
.law-tag.pro { background: rgba(76,175,80,0.2); color: #4caf50; }\
.law-tag.con { background: rgba(244,67,54,0.2); color: #f44336; }\
.season-banner {\
    text-align: center; padding: 16px; border-radius: 12px; margin-bottom: 14px;\
    background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1));\
    border: 1px solid rgba(255,215,0,0.3);\
}\
.season-banner .sb-icon { font-size: 40px; }\
.season-banner .sb-name { font-size: 18px; font-weight: bold; color: #ffd700; margin: 6px 0; }\
.season-banner .sb-desc { font-size: 12px; color: #ccc; line-height: 1.6; }\
.arch-card {\
    padding: 14px; margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(204,136,68,0.2);\
    cursor: pointer; transition: all 0.2s;\
}\
.arch-card:hover { background: rgba(255,255,255,0.08); }\
.arch-card .ac-header { display: flex; align-items: center; gap: 10px; }\
.arch-card .ac-icon { font-size: 28px; }\
.arch-card .ac-name { font-weight: bold; color: #eeaa66; font-size: 14px; }\
.arch-card .ac-era { font-size: 10px; padding: 2px 8px; border-radius: 10px; background: rgba(204,136,68,0.2); color: #cc8844; }\
.arch-card .ac-desc { font-size: 12px; color: #aaa; margin-top: 8px; line-height: 1.6; display: none; }\
.arch-card.expanded .ac-desc { display: block; }\
.arch-card.locked { opacity: 0.4; }\
.citizen-card {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(170,102,204,0.2);\
}\
.citizen-card .cc-icon { font-size: 28px; }\
.citizen-card .cc-info { flex: 1; }\
.citizen-card .cc-name { font-weight: bold; color: #cc88ee; font-size: 13px; }\
.citizen-card .cc-count { font-size: 11px; color: #aaa; }\
.citizen-card .cc-mood { font-size: 11px; margin-top: 3px; }\
.citizen-card .cc-story { font-size: 11px; color: #999; margin-top: 4px; font-style: italic; line-height: 1.5; }\
@media (max-width: 600px) {\
    .v11-left-btns { display: none !important; }\
}\
';

// ===================== DATA =====================

var EDU_BUILDINGS = [
    { id: 'seodang', icon: '📒', name: '서당', desc: '마을 기초 교육. 문화 +3, 행복 +2.', cost: 40, cultureBonus: 3, era: 0 },
    { id: 'hyanggyo', icon: '🏫', name: '향교', desc: '지방 유교 교육 기관. 문화 +5, 인구 +10.', cost: 70, cultureBonus: 5, era: 1 },
    { id: 'seonggyungwan', icon: '🎓', name: '성균관', desc: '최고 교육 기관. 문화 +10, 기술 +15%.', cost: 150, cultureBonus: 10, era: 2 },
    { id: 'seowon', icon: '📚', name: '서원', desc: '사립 교육+제향 기관. 문화 +8, 행복 +5.', cost: 120, cultureBonus: 8, era: 3 },
    { id: 'gukjagam', icon: '🏛️', name: '국자감', desc: '고려 국립대학. 문화 +7, 인구 +20.', cost: 100, cultureBonus: 7, era: 2 },
    { id: 'taehak', icon: '🎒', name: '태학', desc: '고구려 최초 교육기관(372). 문화 +4.', cost: 50, cultureBonus: 4, era: 1 },
    { id: 'hakdang', icon: '✏️', name: '학당', desc: '백제 교육 기관. 문화 +4, 행복 +3.', cost: 55, cultureBonus: 4, era: 1 },
    { id: 'modern_school', icon: '🏢', name: '근대학교', desc: '배재학당/이화학당 등. 문화 +12, 기술 +20%.', cost: 180, cultureBonus: 12, era: 4 },
    { id: 'library', icon: '📖', name: '도서관', desc: '지식 저장소. 문화 +6, 퀴즈 정답률 +10%.', cost: 80, cultureBonus: 6, era: 2 },
    { id: 'research_lab', icon: '🔬', name: '연구소', desc: '과학 기술 연구. 기술 +25%, 금 -2/틱.', cost: 200, cultureBonus: 15, era: 4 }
];

var DISASTER_TYPES = [
    { id: 'flood', icon: '🌊', name: '홍수', desc: '강물이 범람하여 농경지가 침수됩니다.', damage: { food: -50, pop: -10 }, color: '#4488cc' },
    { id: 'drought', icon: '☀️', name: '가뭄', desc: '오랜 가뭄으로 농작물이 말라갑니다.', damage: { food: -80, happy: -10 }, color: '#dd8800' },
    { id: 'earthquake', icon: '🌍', name: '지진', desc: '땅이 흔들려 건물이 손상됩니다.', damage: { gold: -100, pop: -15 }, color: '#886644' },
    { id: 'volcano', icon: '🌋', name: '화산폭발', desc: '인근 화산이 폭발하여 화산재가 내립니다.', damage: { food: -60, pop: -20, gold: -50 }, color: '#cc3300' },
    { id: 'typhoon', icon: '🌀', name: '태풍', desc: '강력한 태풍이 도시를 강타합니다.', damage: { gold: -80, happy: -15 }, color: '#6666cc' },
    { id: 'plague', icon: '🦠', name: '역병', desc: '전염병이 퍼져 주민들이 쓰러집니다.', damage: { pop: -30, happy: -20 }, color: '#66aa44' },
    { id: 'wildfire', icon: '🔥', name: '산불', desc: '산불이 번져 목재와 식량이 불탑니다.', damage: { food: -40, gold: -60 }, color: '#ee5500' },
    { id: 'locusts', icon: '🦗', name: '메뚜기떼', desc: '메뚜기떼가 농작물을 먹어치웁니다.', damage: { food: -100 }, color: '#88aa22' }
];

var LAWS = [
    { id: 'tax_cut', icon: '💰', name: '세금 감면', cat: '경제', desc: '백성의 세금을 낮춥니다.', pros: '행복 +10', cons: '금 수입 -15%', effect: { happy: 10, goldMult: -0.15 } },
    { id: 'free_trade', icon: '🚢', name: '자유 교역', cat: '경제', desc: '해외 무역을 개방합니다.', pros: '금 +8/틱', cons: '외교 변동 증가', effect: { gold: 8 } },
    { id: 'min_wage', icon: '🪙', name: '최저 임금', cat: '경제', desc: '노동자 최소 급여를 보장합니다.', pros: '행복 +8', cons: '건설 비용 +10%', effect: { happy: 8 } },
    { id: 'land_reform', icon: '🌾', name: '토지 개혁', cat: '경제', desc: '농지를 재분배합니다.', pros: '식량 +20%', cons: '귀족 불만', effect: { foodMult: 0.20 } },
    { id: 'edu_mandatory', icon: '📚', name: '교육 의무화', cat: '사회', desc: '모든 아이에게 교육을 의무화합니다.', pros: '문화 +10', cons: '금 -5/틱', effect: { culture: 10, gold: -5 } },
    { id: 'healthcare', icon: '🏥', name: '의료 보장', cat: '사회', desc: '기초 의료를 무상 제공합니다.', pros: '인구 +20, 역병 피해 -30%', cons: '금 -8/틱', effect: { pop: 20, gold: -8 } },
    { id: 'curfew', icon: '🌙', name: '야간 통행금지', cat: '사회', desc: '밤에 외출을 금지합니다.', pros: '치안 +15', cons: '행복 -5', effect: { happy: -5 } },
    { id: 'religion_free', icon: '🙏', name: '종교 자유', cat: '사회', desc: '모든 종교를 허용합니다.', pros: '행복 +12, 문화 +5', cons: '없음', effect: { happy: 12, culture: 5 } },
    { id: 'conscription', icon: '⚔️', name: '징병제', cat: '군사', desc: '성인 남자 의무 복무.', pros: '방어력 +25', cons: '인구 성장 -10%, 행복 -8', effect: { defense: 25, happy: -8 } },
    { id: 'exemption', icon: '📋', name: '군역 면제', cat: '군사', desc: '학자/장인에게 군역 면제.', pros: '문화 +8, 기술 +10%', cons: '방어력 -10', effect: { culture: 8 } },
    { id: 'wall_duty', icon: '🧱', name: '성곽 의무', cat: '군사', desc: '모든 도시에 성벽 축조 의무화.', pros: '방어력 +20', cons: '금 -10/틱', effect: { defense: 20, gold: -10 } },
    { id: 'arms_ban', icon: '🚫', name: '화기 금지', cat: '군사', desc: '민간 화기 소유를 금지합니다.', pros: '치안 +10', cons: '군사 효율 -10%', effect: {} }
];

var SEASON_EVENTS = [
    { month: 1, icon: '🎊', name: '설날 (정월 초하루)', desc: '새해를 맞아 세배를 올리고 떡국을 먹습니다. 온 가족이 모여 복을 빕니다.', bonus: '행복 +15, 금 +50' },
    { month: 2, icon: '🌕', name: '정월 대보름', desc: '보름달 아래 달집태우기와 쥐불놀이. 오곡밥과 부럼을 먹습니다.', bonus: '식량 +30, 행복 +8' },
    { month: 3, icon: '🦋', name: '삼짇날 (3월 3일)', desc: '봄을 맞아 진달래 화전을 부치고 나들이를 갑니다.', bonus: '행복 +10, 문화 +5' },
    { month: 4, icon: '🍃', name: '한식', desc: '찬 음식을 먹으며 조상에게 제사를 지냅니다. 성묘의 날.', bonus: '문화 +8, 행복 +5' },
    { month: 5, icon: '🎋', name: '단오', desc: '창포물에 머리감고 그네뛰기, 씨름, 수리취떡을 즐깁니다.', bonus: '행복 +12, 인구 +5' },
    { month: 6, icon: '💧', name: '유두', desc: '동쪽 흐르는 물에 머리를 감아 액을 씻습니다. 유두면을 먹습니다.', bonus: '행복 +6, 식량 +15' },
    { month: 7, icon: '🌌', name: '칠석', desc: '견우와 직녀가 만나는 날. 소원을 빌며 밀전병을 먹습니다.', bonus: '문화 +10, 행복 +8' },
    { month: 8, icon: '🥮', name: '추석 (한가위)', desc: '풍년을 감사하며 송편을 빚고 강강술래를 합니다.', bonus: '식량 +50, 행복 +20, 금 +30' },
    { month: 9, icon: '🍁', name: '중양절 (9월 9일)', desc: '국화전과 국화주를 마시며 단풍놀이를 합니다.', bonus: '문화 +8, 행복 +6' },
    { month: 10, icon: '🌾', name: '시월제 (상달)', desc: '한 해 농사를 마무리하며 고사를 지냅니다.', bonus: '식량 +40, 문화 +5' },
    { month: 11, icon: '🥣', name: '동지', desc: '팥죽을 쑤어 먹으며 액을 물리칩니다. 가장 긴 밤.', bonus: '행복 +5, 방어 +5' },
    { month: 12, icon: '🎆', name: '납향 (섣달)', desc: '한 해를 마감하며 제사를 지내고 새해를 준비합니다.', bonus: '금 +40, 문화 +8' }
];

var CITIZEN_TYPES = [
    { id: 'farmer', icon: '👨‍🌾', name: '농부', role: '식량 생산의 핵심. 논밭에서 일합니다.', stories: ['올해 벼가 잘 자라서 기쁩니다!','비가 너무 많이 와서 걱정이에요.','내년엔 종자를 바꿔볼까 합니다.'] },
    { id: 'merchant', icon: '🧑‍💼', name: '상인', role: '물건을 사고팔아 금을 법니다.', stories: ['장사가 잘 되어 금을 많이 벌었소!','외국 상인이 비단을 구하러 왔어요.','시장이 북적거려서 좋습니다.'] },
    { id: 'scholar', icon: '👨‍🎓', name: '학자', role: '학문을 연구하고 가르칩니다.', stories: ['새로운 별자리를 발견했습니다.','서책을 완성하여 왕에게 바쳤습니다.','과거시험 준비에 여념이 없습니다.'] },
    { id: 'soldier', icon: '💂', name: '군인', role: '도시를 지키는 수비대입니다.', stories: ['북방 기마병이 국경에 나타났습니다.','훈련이 힘들지만 보람찹니다.','새 무기가 도입되어 사기가 올랐습니다.'] },
    { id: 'artisan', icon: '👷', name: '장인', role: '도자기, 무기 등을 제작합니다.', stories: ['청자를 구워 중국 상인에게 팔았습니다.','대장간에서 명검을 만들고 있습니다.','궁궐의 단청 작업을 맡았습니다.'] },
    { id: 'monk', icon: '🧘', name: '승려', role: '사찰에서 수행하고 백성을 교화합니다.', stories: ['팔만대장경 인경 작업이 한창입니다.','산사에서 108배를 올립니다.','백성들에게 글을 가르치고 있습니다.'] },
    { id: 'official', icon: '🎩', name: '관리', role: '행정과 사법을 담당합니다.', stories: ['왕의 명을 받아 지방을 순시합니다.','세금 장부를 정리하고 있습니다.','관아에서 소송을 처리했습니다.'] },
    { id: 'noble', icon: '👸', name: '귀족', role: '토지를 소유하고 정치에 참여합니다.', stories: ['왕실 행사에 초대되었습니다.','자녀의 교육에 많은 투자를 합니다.','정원에 연못을 새로 만들었습니다.'] }
];

var ARCH_STYLES = [
    { id: 'dugout', icon: '🕳️', name: '움집 (수혈주거)', era: '선사', eraIdx: 0, desc: '땅을 파고 지붕을 올린 최초의 주거. 중앙에 화덕이 있으며, 빗물 방지를 위해 약간 높은 곳에 지었습니다. 신석기 시대 대표적 주거형태.' },
    { id: 'log_house', icon: '🪵', name: '귀틀집', era: '선사~삼국', eraIdx: 0, desc: '통나무를 우물 정(井)자로 쌓아 벽을 만든 집. 산간 지방에서 주로 사용. 보온성이 뛰어나 추운 지방에 적합했습니다.' },
    { id: 'thatch', icon: '🏠', name: '초가집', era: '삼국~근대', eraIdx: 1, desc: '볏짚으로 지붕을 올린 서민 주택. 매년 가을 이엉을 갈았습니다. 구들(온돌)을 놓아 겨울을 따뜻하게 보냈습니다.' },
    { id: 'tile_house', icon: '🏡', name: '기와집', era: '삼국~조선', eraIdx: 1, desc: '기와로 지붕을 올린 상류층 주택. 수막새와 암키와로 비를 막고, 처마는 여름 해를 차단하는 과학적 설계입니다.' },
    { id: 'hanok', icon: '🏘️', name: '한옥', era: '고려~현대', eraIdx: 2, desc: '마루(여름용)와 온돌(겨울용)을 결합한 한국 전통 주거. 대청마루, 사랑채, 안채로 구분. 배산임수 원칙으로 자연과 조화를 이룹니다.' },
    { id: 'fortress', icon: '🏰', name: '성곽', era: '삼국~조선', eraIdx: 1, desc: '산성과 읍성으로 나뉩니다. 수원화성은 정약용의 거중기로 건설한 세계문화유산. 치(雉), 여장, 옹성 등 과학적 방어 구조를 갖추었습니다.' },
    { id: 'temple', icon: '⛩️', name: '사찰', era: '삼국~현대', eraIdx: 1, desc: '불교 건축의 정수. 일주문→천왕문→대웅전 축선 배치. 다포식/주심포식/익공식 지붕 구조. 불국사, 해인사가 대표적입니다.' },
    { id: 'palace', icon: '🏯', name: '궁궐', era: '삼국~조선', eraIdx: 2, desc: '왕이 거주하며 정치를 행하는 건물군. 경복궁 근정전은 가장 큰 목조건물. 전조후침(앞은 정치, 뒤는 주거) 원칙으로 건설했습니다.' },
    { id: 'western', icon: '🏛️', name: '서양식 건물', era: '개화기', eraIdx: 4, desc: '명동성당(고딕), 덕수궁 석조전(신고전), 서울역(절충). 개화기에 외래 건축양식이 도입되며 한국 건축에 새 장을 열었습니다.' },
    { id: 'modern', icon: '🏙️', name: '근대 건물', era: '근대', eraIdx: 4, desc: '철근콘크리트와 유리를 사용한 근대 건축. 학교, 병원, 관공서 등이 지어졌습니다. 전통과 현대가 공존하는 과도기 건축입니다.' }
];

var V11_QUIZ = [
    { q: '한국 최초의 교육기관 태학을 설립한 나라는?', a: ['고구려','백제','신라','가야'], c: 0, h: '소수림왕 2년(372) 고구려에 최초의 교육기관 태학이 설립되었습니다.' },
    { q: '조선시대 지방 교육기관은?', a: ['향교','서원','성균관','태학'], c: 0, h: '향교는 조선시대 각 고을에 설치된 관립 교육기관입니다.' },
    { q: '홍수 피해를 줄이기 위해 조선시대에 만든 시설은?', a: ['제방','성곽','봉수대','역참'], c: 0, h: '제방을 쌓아 강물의 범람을 막는 것은 고대부터 중요한 치수 정책이었습니다.' },
    { q: '조선시대 형법의 기본이 된 법전은?', a: ['경국대전','삼국사기','동의보감','훈민정음'], c: 0, h: '경국대전(1485)은 조선의 기본 법전으로 이전/호전/예전/병전/형전/공전으로 구성됩니다.' },
    { q: '추석의 대표적인 음식은?', a: ['송편','떡국','수리취떡','팥죽'], c: 0, h: '추석(한가위)에는 햅쌀로 송편을 빚어 먹는 전통이 있습니다.' },
    { q: '동지에 먹는 전통 음식은?', a: ['팥죽','송편','약식','떡국'], c: 0, h: '동지에 팥죽을 쑤어 먹으면 액을 물리친다는 풍습이 있습니다.' },
    { q: '한옥의 여름용 공간은?', a: ['대청마루','온돌방','부엌','광'], c: 0, h: '대청마루는 바닥을 높여 바람이 잘 통하게 한 여름용 공간입니다.' },
    { q: '수원화성 건설에 사용된 기계는?', a: ['거중기','물레방아','수차','자격루'], c: 0, h: '정약용이 설계한 거중기로 무거운 돌을 들어올려 수원화성을 건설했습니다.' },
    { q: '조선 최초의 서원은?', a: ['소수서원','도산서원','병산서원','옥산서원'], c: 0, h: '1543년 풍기군수 주세붕이 세운 백운동서원이 소수서원의 전신입니다.' },
    { q: '삼국시대 백제의 교육기관 이름은?', a: ['오경박사','태학','국학','향교'], c: 0, h: '백제는 오경박사 제도를 두어 유학 교육을 실시했습니다.' },
    { q: '정월 대보름에 먹는 음식이 아닌 것은?', a: ['떡국','부럼','오곡밥','약밥'], c: 0, h: '떡국은 설날(정월 초하루)에 먹는 음식입니다.' },
    { q: '한국 전통 건축에서 배산임수의 의미는?', a: ['뒤에 산, 앞에 물','앞에 산, 뒤에 물','사방이 산','사방이 물'], c: 0, h: '배산임수는 뒤로 산을 등지고 앞으로 물을 바라보는 입지 원칙입니다.' },
    { q: '고려시대 국립 교육기관은?', a: ['국자감','성균관','태학','향교'], c: 0, h: '국자감은 고려 992년(성종 11)에 설치된 최고 교육기관입니다.' },
    { q: '단오에 하지 않는 활동은?', a: ['윷놀이','그네뛰기','씨름','창포물에 머리감기'], c: 0, h: '윷놀이는 설날에 하는 전통 놀이입니다. 단오에는 그네, 씨름을 합니다.' },
    { q: '한국 전통 건축의 지붕 양식이 아닌 것은?', a: ['돔형','맞배','팔작','우진각'], c: 0, h: '돔형은 서양 건축양식입니다. 한국 전통 지붕은 맞배, 팔작, 우진각 등이 있습니다.' }
];

var V11_ACHIEVEMENTS = [
    { id: 'v11_edu_5', icon: '📚', title: '교육 선구자', desc: '교육 기관 5개 이상 건설' },
    { id: 'v11_edu_all', icon: '🎓', title: '교육 대국', desc: '모든 교육 기관 완성' },
    { id: 'v11_disaster_3', icon: '🌊', title: '재해 생존자', desc: '재해 시뮬레이션 3회 생존' },
    { id: 'v11_disaster_all', icon: '🛡️', title: '천재지변 정복', desc: '8종 재해 모두 경험' },
    { id: 'v11_law_3', icon: '⚖️', title: '입법자', desc: '법률 3개 이상 제정' },
    { id: 'v11_law_all', icon: '📜', title: '대법관', desc: '12개 법률 모두 시행 경험' },
    { id: 'v11_season', icon: '🎊', title: '세시풍속 전문가', desc: '계절 이벤트 확인' },
    { id: 'v11_compare_s', icon: '🏆', title: 'S등급 도시', desc: '도시 비교에서 S등급 달성' },
    { id: 'v11_citizen', icon: '👥', title: '민심 수렴자', desc: '시민 생활 시뮬레이터 체험' },
    { id: 'v11_arch_5', icon: '🏘️', title: '건축 탐험가', desc: '건축 양식 5종 이상 확인' },
    { id: 'v11_stats', icon: '📊', title: '데이터 분석가', desc: '통계 대시보드 확인' },
    { id: 'v11_explorer', icon: '🗺️', title: 'v11 탐험가', desc: 'v11.0의 모든 기능 체험' }
];

// ===================== STATE =====================
var eduBuilt = {};
var disasterHistory = [];
var disasterTypesExperienced = new Set();
var lawsActive = {};
var lawsEverEnacted = new Set();
var v11Features = new Set();
var archViewed = new Set();
var statsHistory = [];
var seasonChecked = false;
var disasterSimCount = 0;

function initV11State() {
    EDU_BUILDINGS.forEach(function(b) { eduBuilt[b.id] = false; });
    LAWS.forEach(function(l) { lawsActive[l.id] = false; });
}

// ===================== UI =====================
function addV11UI() {
    var style = document.createElement('style');
    style.textContent = V11_CSS;
    document.head.appendChild(style);

    var leftBtns = [
        { id: 'edu-btn', text: '📚', title: '교육', right: '52px', top: '370px', color: '#88aaff' },
        { id: 'disaster-sim-btn', text: '🌊', title: '재해 시뮬', right: '52px', top: '410px', color: '#ff7777' },
        { id: 'law-btn', text: '⚖️', title: '법률', right: '52px', top: '450px', color: '#66ddbb' },
        { id: 'season-btn', text: '🎊', title: '계절행사', right: '52px', top: '490px', color: '#ffcc66' },
        { id: 'compare-btn', text: '📈', title: '도시비교', right: '52px', top: '530px', color: '#66aaff' },
        { id: 'citizen-btn', text: '👥', title: '시민생활', right: '52px', top: '570px', color: '#cc88ee' },
        { id: 'arch-btn', text: '🏘️', title: '건축갤러리', right: '52px', top: '610px', color: '#eeaa66' },
        { id: 'stats-btn', text: '📊', title: '통계', right: '52px', top: '650px', color: '#66ccee' }
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
        btn.style.cssText = 'position:fixed;right:'+b.right+';top:'+b.top+';color:'+b.color+';';
        wrap.appendChild(btn);
    });
    document.body.appendChild(wrap);

    document.getElementById('edu-btn').onclick = showEducation;
    document.getElementById('disaster-sim-btn').onclick = showDisasterSim;
    document.getElementById('law-btn').onclick = showLaws;
    document.getElementById('season-btn').onclick = showSeason;
    document.getElementById('compare-btn').onclick = showCompare;
    document.getElementById('citizen-btn').onclick = showCitizen;
    document.getElementById('arch-btn').onclick = showArchitecture;
    document.getElementById('stats-btn').onclick = showStats;

    createV11Panel('edu-panel', '📚 교육 시스템', 'edu-content');
    createV11Panel('disaster-sim-panel', '🌊 자연재해 시뮬레이터', 'disaster-sim-content');
    createV11Panel('law-panel', '⚖️ 법률 시스템', 'law-content');
    createV11Panel('season-panel', '🎊 계절 행사', 'season-content');
    createV11Panel('compare-panel', '📈 도시 비교 분석', 'compare-content');
    createV11Panel('citizen-panel', '👥 시민 생활', 'citizen-content');
    createV11Panel('arch-panel', '🏘️ 건축 양식 갤러리', 'arch-content');
    createV11Panel('stats-panel', '📊 통계 대시보드', 'stats-content');
}

function createV11Panel(panelId, title, contentId) {
    var d = document.createElement('div');
    d.id = panelId;
    d.className = 'v11-panel';
    d.innerHTML = '<div class="v11-box"><h2>' + title + '</h2><div id="' + contentId + '"></div><button class="v11-close" onclick="document.getElementById(\'' + panelId + '\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

// ===================== SHOW: EDUCATION =====================
window.v11BuildEdu = function(id) {
    var b = EDU_BUILDINGS.find(function(x) { return x.id === id; });
    if(!b || eduBuilt[id]) return;
    var res = (typeof window.resources !== 'undefined') ? window.resources : null;
    if(!res || res.gold < b.cost) { if(typeof toast === 'function') toast('금이 부족합니다!'); return; }
    res.gold -= b.cost;
    eduBuilt[id] = true;
    if(res.culture !== undefined) res.culture += b.cultureBonus;
    playV11SFX('edu_build');
    if(typeof toast === 'function') toast('📚 ' + b.name + ' 건설 완료!');
    if(typeof updateHUD === 'function') updateHUD();
    showEducation();
    saveV11State();
    checkV11Achievements();
};

function showEducation() {
    playV11SFX('edu_build');
    v11Features.add('education');
    var builtCount = 0;
    var totalCulture = 0;
    EDU_BUILDINGS.forEach(function(b) { if(eduBuilt[b.id]) { builtCount++; totalCulture += b.cultureBonus; } });

    var html = '<div style="text-align:center;color:#99bbff;font-size:13px;margin-bottom:14px;">교육기관: ' + builtCount + '/' + EDU_BUILDINGS.length + ' | 총 문화 보너스: +' + totalCulture + '</div>';
    EDU_BUILDINGS.forEach(function(b) {
        var built = eduBuilt[b.id];
        var eraOk = (typeof window.currentEra !== 'undefined') ? window.currentEra >= b.era : true;
        var btnText = built ? '✅ 완료' : (!eraOk ? '🔒 ' + ['고조선','삼국','고려','조선','근대'][b.era] : '건설 (' + b.cost + '금)');
        var disabled = (built || !eraOk) ? ' disabled' : '';
        html += '<div class="v11-item"><div class="vi">' + b.icon + '</div><div class="vn"><strong>' + b.name + ' (문화+' + b.cultureBonus + ')</strong><div class="vdet">' + b.desc + '</div></div><div class="vact"><button onclick="v11BuildEdu(\'' + b.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('edu-content').innerHTML = html;
    document.getElementById('edu-panel').classList.add('show');
}

// ===================== SHOW: DISASTER SIMULATOR =====================
window.v11SimDisaster = function(id) {
    var d = DISASTER_TYPES.find(function(x) { return x.id === id; });
    if(!d) return;
    playV11SFX('disaster_alert');
    disasterTypesExperienced.add(id);
    disasterSimCount++;

    var res = (typeof window.resources !== 'undefined') ? window.resources : null;
    var prepReduction = 0;
    if(typeof window.disasterPrepBuildings !== 'undefined') {
        prepReduction = Math.min(0.85, window.disasterPrepBuildings * 0.15);
    }
    var actualDmg = {};
    for(var k in d.damage) {
        actualDmg[k] = Math.round(d.damage[k] * (1 - prepReduction));
        if(res && res[k] !== undefined) {
            res[k] = Math.max(0, res[k] + actualDmg[k]);
        }
    }
    if(typeof updateHUD === 'function') updateHUD();
    disasterHistory.push({ type: id, time: Date.now(), damage: actualDmg, prep: Math.round(prepReduction * 100) });

    setTimeout(function() {
        playV11SFX('disaster_survive');
        if(typeof toast === 'function') toast('🛡️ ' + d.name + ' 생존! 방재율: ' + Math.round(prepReduction * 100) + '%');
    }, 800);

    showDisasterSim();
    drawDisasterCanvas(d);
    saveV11State();
    checkV11Achievements();
};

function showDisasterSim() {
    v11Features.add('disaster');
    var html = '<canvas id="disaster-canvas" class="v11-canvas" width="480" height="280"></canvas>';
    html += '<div style="text-align:center;color:#ff9999;font-size:12px;margin-bottom:14px;">시뮬레이션 횟수: ' + disasterSimCount + ' | 경험한 재해: ' + disasterTypesExperienced.size + '/' + DISASTER_TYPES.length + '</div>';
    DISASTER_TYPES.forEach(function(d) {
        var experienced = disasterTypesExperienced.has(d.id);
        var dmgText = [];
        for(var k in d.damage) {
            var label = k === 'food' ? '식량' : k === 'gold' ? '금' : k === 'pop' ? '인구' : k === 'happy' ? '행복' : k;
            dmgText.push(label + ' ' + d.damage[k]);
        }
        html += '<div class="v11-item"><div class="vi">' + d.icon + '</div><div class="vn"><strong style="color:#ff8888">' + d.name + (experienced ? ' ✅' : '') + '</strong><div class="vdet">' + d.desc + '<br>피해: ' + dmgText.join(', ') + '</div></div><div class="vact"><button style="background:#dd4444" onclick="v11SimDisaster(\'' + d.id + '\')">시뮬레이션</button></div></div>';
    });
    if(disasterHistory.length > 0) {
        html += '<div style="margin-top:14px;padding:10px;background:rgba(255,255,255,0.04);border-radius:10px;"><strong style="color:#ff9999;font-size:12px;">최근 기록</strong>';
        disasterHistory.slice(-5).reverse().forEach(function(h) {
            var d = DISASTER_TYPES.find(function(x) { return x.id === h.type; });
            var date = new Date(h.time);
            html += '<div style="font-size:11px;color:#aaa;margin-top:4px;">' + d.icon + ' ' + d.name + ' (방재 ' + h.prep + '%) - ' + date.getHours() + ':' + String(date.getMinutes()).padStart(2,'0') + '</div>';
        });
        html += '</div>';
    }
    document.getElementById('disaster-sim-content').innerHTML = html;
    document.getElementById('disaster-sim-panel').classList.add('show');
}

function drawDisasterCanvas(disaster) {
    var canvas = document.getElementById('disaster-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#1a0505');
    bg.addColorStop(1, '#2a1010');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ff7777';
    ctx.textAlign = 'center';
    ctx.fillText(disaster ? disaster.icon + ' ' + disaster.name + ' 발생!' : '재해를 선택하세요', w/2, 30);

    if(!disaster) return;

    var particles = [];
    for(var i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.7 + 40,
            size: 2 + Math.random() * 4,
            alpha: 0.3 + Math.random() * 0.7
        });
    }
    ctx.fillStyle = disaster.color;
    particles.forEach(function(p) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    var dmgKeys = Object.keys(disaster.damage);
    var barW = Math.min(60, (w - 80) / dmgKeys.length - 10);
    var startX = (w - dmgKeys.length * (barW + 10)) / 2;
    dmgKeys.forEach(function(k, i) {
        var val = Math.abs(disaster.damage[k]);
        var barH = Math.min(80, val * 0.8);
        var x = startX + i * (barW + 10);
        var y = h - 40 - barH;
        ctx.fillStyle = disaster.color;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, y, barW, barH);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = disaster.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barW, barH);
        var label = k === 'food' ? '식량' : k === 'gold' ? '금' : k === 'pop' ? '인구' : '행복';
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#ccc';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barW/2, h - 25);
        ctx.fillStyle = '#ff9999';
        ctx.fillText('-' + val, x + barW/2, y - 5);
    });
}

// ===================== SHOW: LAWS =====================
window.v11ToggleLaw = function(id) {
    var l = LAWS.find(function(x) { return x.id === id; });
    if(!l) return;
    if(lawsActive[id]) {
        lawsActive[id] = false;
        playV11SFX('law_repeal');
        if(typeof toast === 'function') toast('⚖️ ' + l.name + ' 폐지됨');
    } else {
        var activeCount = 0;
        LAWS.forEach(function(ll) { if(lawsActive[ll.id]) activeCount++; });
        if(activeCount >= 4) { if(typeof toast === 'function') toast('최대 4개 법률만 시행 가능합니다!'); return; }
        lawsActive[id] = true;
        lawsEverEnacted.add(id);
        playV11SFX('law_enact');
        if(typeof toast === 'function') toast('⚖️ ' + l.name + ' 제정!');
    }
    showLaws();
    saveV11State();
    checkV11Achievements();
};

function showLaws() {
    v11Features.add('laws');
    var activeCount = 0;
    LAWS.forEach(function(l) { if(lawsActive[l.id]) activeCount++; });

    var html = '<div style="text-align:center;color:#88eedd;font-size:13px;margin-bottom:14px;">시행 중: ' + activeCount + '/4 | 경험: ' + lawsEverEnacted.size + '/' + LAWS.length + '</div>';
    var cats = ['경제', '사회', '군사'];
    cats.forEach(function(cat) {
        html += '<div style="color:#66ddbb;font-size:12px;font-weight:bold;margin:12px 0 6px;border-bottom:1px solid rgba(68,170,136,0.3);padding-bottom:4px;">' + cat + '법</div>';
        LAWS.filter(function(l) { return l.cat === cat; }).forEach(function(l) {
            var active = lawsActive[l.id];
            var btnText = active ? '🟢 시행중 (폐지)' : '제정';
            var btnBg = active ? '#dd4444' : '#44aa88';
            html += '<div class="v11-item" style="' + (active ? 'border-color:rgba(68,170,136,0.5);background:rgba(68,170,136,0.08)' : '') + '"><div class="vi">' + l.icon + '</div><div class="vn"><strong>' + l.name + '</strong><div class="vdet">' + l.desc + '<br><span class="law-tag pro">장점: ' + l.pros + '</span><span class="law-tag con">단점: ' + l.cons + '</span></div></div><div class="vact"><button style="background:' + btnBg + '" onclick="v11ToggleLaw(\'' + l.id + '\')">' + btnText + '</button></div></div>';
        });
    });
    document.getElementById('law-content').innerHTML = html;
    document.getElementById('law-panel').classList.add('show');
}

// ===================== SHOW: SEASONAL EVENTS =====================
function showSeason() {
    playV11SFX('season_event');
    v11Features.add('season');
    seasonChecked = true;
    var now = new Date();
    var month = now.getMonth() + 1;
    var currentEvent = SEASON_EVENTS.find(function(e) { return e.month === month; });

    var html = '';
    if(currentEvent) {
        html += '<div class="season-banner"><div class="sb-icon">' + currentEvent.icon + '</div><div class="sb-name">' + currentEvent.name + '</div><div class="sb-desc">' + currentEvent.desc + '</div><div style="margin-top:8px;color:#ffd700;font-size:12px;font-weight:bold;">보너스: ' + currentEvent.bonus + '</div></div>';
    }
    html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">';
    SEASON_EVENTS.forEach(function(e) {
        var isCurrent = e.month === month;
        html += '<div style="padding:10px;border-radius:10px;text-align:center;background:rgba(255,255,255,' + (isCurrent ? '0.08' : '0.03') + ');border:1px solid ' + (isCurrent ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.06)') + '"><div style="font-size:24px;">' + e.icon + '</div><div style="font-size:11px;color:' + (isCurrent ? '#ffd700' : '#aaa') + ';margin-top:4px;font-weight:' + (isCurrent ? 'bold' : 'normal') + '">' + e.month + '월</div><div style="font-size:10px;color:#888;margin-top:2px;">' + e.name.split('(')[0].trim().substring(0,4) + '</div></div>';
    });
    html += '</div>';
    document.getElementById('season-content').innerHTML = html;
    document.getElementById('season-panel').classList.add('show');
    checkV11Achievements();
    saveV11State();
}

// ===================== SHOW: CITY COMPARISON =====================
function showCompare() {
    playV11SFX('compare_view');
    v11Features.add('compare');
    var html = '<canvas id="compare-canvas" class="v11-canvas" width="520" height="320"></canvas>';
    html += '<div id="compare-result" style="text-align:center;margin-top:8px;"></div>';
    document.getElementById('compare-content').innerHTML = html;
    document.getElementById('compare-panel').classList.add('show');
    setTimeout(drawCompareCanvas, 100);
    checkV11Achievements();
    saveV11State();
}

function drawCompareCanvas() {
    var canvas = document.getElementById('compare-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var cx = w / 2, cy = h / 2 + 10;
    var r = Math.min(cx, cy) - 50;

    ctx.clearRect(0, 0, w, h);
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0a0e1a');
    bg.addColorStop(1, '#151a2a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#66aaff';
    ctx.textAlign = 'center';
    ctx.fillText('도시 비교 분석 (6축 레이더)', cx, 22);

    var axes = ['인구', '경제', '군사', '문화', '교육', '행복'];
    var res = (typeof window.resources !== 'undefined') ? window.resources : { pop: 50, gold: 200, happy: 50, culture: 0, food: 100 };
    var milDef = (typeof calcMilDefense === 'function') ? calcMilDefense() : 0;
    var eduCount = 0;
    EDU_BUILDINGS.forEach(function(b) { if(eduBuilt[b.id]) eduCount++; });

    var playerData = [
        Math.min(100, res.pop / 20),
        Math.min(100, res.gold / 100),
        Math.min(100, milDef * 2),
        Math.min(100, (res.culture || 0) / 2),
        Math.min(100, eduCount * 10),
        Math.min(100, (res.happy || 50) * 1.5)
    ];
    var aiSmall = [30, 25, 20, 35, 30, 40];
    var aiMedium = [55, 50, 45, 50, 55, 60];
    var aiLarge = [80, 75, 70, 65, 70, 75];

    for(var ring = 1; ring <= 5; ring++) {
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(var a = 0; a < 6; a++) {
            var angle = -Math.PI / 2 + (Math.PI * 2 / 6) * a;
            var px = cx + Math.cos(angle) * r * ring / 5;
            var py = cy + Math.sin(angle) * r * ring / 5;
            if(a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    for(var a2 = 0; a2 < 6; a2++) {
        var angle2 = -Math.PI / 2 + (Math.PI * 2 / 6) * a2;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle2) * r, cy + Math.sin(angle2) * r);
        ctx.stroke();
        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        var lx = cx + Math.cos(angle2) * (r + 18);
        var ly = cy + Math.sin(angle2) * (r + 18);
        ctx.fillText(axes[a2], lx, ly + 4);
    }

    function drawRadar(data, color, alpha) {
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        for(var i = 0; i < 6; i++) {
            var ang = -Math.PI / 2 + (Math.PI * 2 / 6) * i;
            var val = data[i] / 100;
            var px2 = cx + Math.cos(ang) * r * val;
            var py2 = cy + Math.sin(ang) * r * val;
            if(i === 0) ctx.moveTo(px2, py2);
            else ctx.lineTo(px2, py2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawRadar(aiLarge, 'rgba(244,67,54,0.15)', 0.15);
    drawRadar(aiMedium, 'rgba(255,152,0,0.15)', 0.15);
    drawRadar(aiSmall, 'rgba(76,175,80,0.15)', 0.15);
    drawRadar(playerData, 'rgba(66,170,255,0.3)', 0.3);

    ctx.font = '10px sans-serif';
    var legend = [
        { label: '내 도시', color: '#42aaff' },
        { label: '소형 AI', color: '#4caf50' },
        { label: '중형 AI', color: '#ff9800' },
        { label: '대형 AI', color: '#f44336' }
    ];
    legend.forEach(function(l, i) {
        ctx.fillStyle = l.color;
        ctx.fillRect(10, h - 60 + i * 14, 8, 8);
        ctx.fillStyle = '#aaa';
        ctx.textAlign = 'left';
        ctx.fillText(l.label, 22, h - 53 + i * 14);
    });

    var totalScore = Math.round(playerData.reduce(function(a2, b) { return a2 + b; }, 0) / 6);
    var grade = totalScore >= 80 ? 'S' : totalScore >= 65 ? 'A' : totalScore >= 50 ? 'B' : totalScore >= 35 ? 'C' : 'D';
    var gradeColor = grade === 'S' ? '#ffd700' : grade === 'A' ? '#4caf50' : grade === 'B' ? '#42a5f5' : grade === 'C' ? '#ff9800' : '#f44336';

    var resultEl = document.getElementById('compare-result');
    if(resultEl) {
        resultEl.innerHTML = '<span style="font-size:36px;font-weight:bold;color:' + gradeColor + '">' + grade + '</span><div style="font-size:13px;color:#aaa;margin-top:4px;">종합 점수: ' + totalScore + '/100</div>';
        if(grade === 'S') {
            v11Features.add('compare_s');
        }
    }
}

// ===================== SHOW: CITIZEN LIFE =====================
function showCitizen() {
    playV11SFX('citizen_story');
    v11Features.add('citizen');
    var res = (typeof window.resources !== 'undefined') ? window.resources : { pop: 100, food: 100, gold: 200, happy: 50, culture: 0 };
    var pop = res.pop || 100;

    var html = '<div style="text-align:center;color:#cc88ee;font-size:13px;margin-bottom:14px;">총 인구: ' + pop + '명</div>';
    CITIZEN_TYPES.forEach(function(c, idx) {
        var count = Math.max(1, Math.round(pop / CITIZEN_TYPES.length + (Math.random() - 0.5) * pop * 0.1));
        if(idx === CITIZEN_TYPES.length - 1) count = Math.max(0, Math.round(pop * 0.05));
        var mood = (res.happy || 50);
        var moodText = mood >= 70 ? '😊 만족' : mood >= 40 ? '😐 보통' : '😟 불만';
        var moodColor = mood >= 70 ? '#4caf50' : mood >= 40 ? '#ff9800' : '#f44336';
        var story = c.stories[Math.floor(Math.random() * c.stories.length)];
        html += '<div class="citizen-card"><div class="cc-icon">' + c.icon + '</div><div class="cc-info"><div class="cc-name">' + c.name + ' <span style="color:#888;font-size:11px;">(' + count + '명)</span></div><div class="cc-count" style="color:#999">' + c.role + '</div><div class="cc-mood" style="color:' + moodColor + '">' + moodText + '</div><div class="cc-story">&quot;' + story + '&quot;</div></div></div>';
    });
    document.getElementById('citizen-content').innerHTML = html;
    document.getElementById('citizen-panel').classList.add('show');
    checkV11Achievements();
    saveV11State();
}

// ===================== SHOW: ARCHITECTURE GALLERY =====================
window.v11ToggleArch = function(id) {
    var card = document.getElementById('arch-' + id);
    if(card) card.classList.toggle('expanded');
    archViewed.add(id);
    playV11SFX('arch_discover');
    checkV11Achievements();
    saveV11State();
};

function showArchitecture() {
    v11Features.add('architecture');
    var currentEra = (typeof window.currentEra !== 'undefined') ? window.currentEra : 4;

    var html = '<div style="text-align:center;color:#eeaa66;font-size:13px;margin-bottom:14px;">발견: ' + archViewed.size + '/' + ARCH_STYLES.length + '</div>';
    ARCH_STYLES.forEach(function(a) {
        var unlocked = currentEra >= a.eraIdx;
        var viewed = archViewed.has(a.id);
        html += '<div id="arch-' + a.id + '" class="arch-card' + (unlocked ? '' : ' locked') + '" onclick="' + (unlocked ? 'v11ToggleArch(\'' + a.id + '\')' : '') + '"><div class="ac-header"><div class="ac-icon">' + a.icon + '</div><div class="ac-name">' + a.name + (viewed ? ' ✅' : '') + '</div><div class="ac-era">' + a.era + '</div></div><div class="ac-desc">' + a.desc + '</div></div>';
    });
    document.getElementById('arch-content').innerHTML = html;
    document.getElementById('arch-panel').classList.add('show');
    checkV11Achievements();
}

// ===================== SHOW: STATISTICS DASHBOARD =====================
function showStats() {
    playV11SFX('stats_view');
    v11Features.add('stats');
    var html = '<canvas id="stats-canvas" class="v11-canvas" width="520" height="300"></canvas>';

    var res = (typeof window.resources !== 'undefined') ? window.resources : { pop: 50, gold: 200, food: 100, happy: 50, culture: 0 };
    var metrics = [
        { label: '인구', value: res.pop || 0, color: '#42a5f5', trend: getTrend('pop') },
        { label: '금', value: res.gold || 0, color: '#ffa726', trend: getTrend('gold') },
        { label: '식량', value: res.food || 0, color: '#66bb6a', trend: getTrend('food') },
        { label: '문화', value: res.culture || 0, color: '#ab47bc', trend: getTrend('culture') },
        { label: '행복', value: res.happy || 0, color: '#ef5350', trend: getTrend('happy') }
    ];
    html += '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px;">';
    metrics.forEach(function(m) {
        var trendIcon = m.trend === 'up' ? '📈' : m.trend === 'down' ? '📉' : '➡️';
        html += '<div style="text-align:center;padding:8px;border-radius:8px;background:rgba(255,255,255,0.04);"><div style="font-size:10px;color:' + m.color + '">' + m.label + '</div><div style="font-size:16px;font-weight:bold;color:#fff;margin:4px 0">' + m.value + '</div><div style="font-size:10px;">' + trendIcon + '</div></div>';
    });
    html += '</div>';

    document.getElementById('stats-content').innerHTML = html;
    document.getElementById('stats-panel').classList.add('show');
    setTimeout(drawStatsCanvas, 100);
    checkV11Achievements();
    saveV11State();
}

function getTrend(key) {
    if(statsHistory.length < 3) return 'stable';
    var last = statsHistory[statsHistory.length - 1];
    var prev = statsHistory[statsHistory.length - 3];
    if(!last || !prev || last[key] === undefined || prev[key] === undefined) return 'stable';
    var diff = last[key] - prev[key];
    if(diff > 5) return 'up';
    if(diff < -5) return 'down';
    return 'stable';
}

function drawStatsCanvas() {
    var canvas = document.getElementById('stats-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#081015');
    bg.addColorStop(1, '#101a20');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if(statsHistory.length < 2) {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('데이터 수집 중... (게임 진행 시 자동 기록)', w/2, h/2);
        return;
    }

    var keys = ['pop', 'gold', 'food', 'culture', 'happy'];
    var colors = ['#42a5f5', '#ffa726', '#66bb6a', '#ab47bc', '#ef5350'];
    var labels = ['인구', '금', '식량', '문화', '행복'];
    var maxVals = {};
    keys.forEach(function(k) {
        var mv = 10;
        statsHistory.forEach(function(s) { if(s[k] > mv) mv = s[k]; });
        maxVals[k] = mv;
    });

    var padL = 40, padR = 10, padT = 30, padB = 30;
    var gw = w - padL - padR;
    var gh = h - padT - padB;
    var n = statsHistory.length;

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for(var gy = 0; gy <= 4; gy++) {
        var yy = padT + gh * gy / 4;
        ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(w - padR, yy); ctx.stroke();
    }

    keys.forEach(function(k, ki) {
        ctx.strokeStyle = colors[ki];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        for(var i = 0; i < n; i++) {
            var x = padL + (gw * i / (n - 1));
            var y = padT + gh - (gh * (statsHistory[i][k] || 0) / maxVals[k]);
            if(i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
    });

    ctx.font = '10px sans-serif';
    labels.forEach(function(l, i) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(padL + i * 90, h - 15, 8, 8);
        ctx.fillStyle = '#aaa';
        ctx.textAlign = 'left';
        ctx.fillText(l, padL + i * 90 + 12, h - 8);
    });

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#66ccee';
    ctx.textAlign = 'center';
    ctx.fillText('자원 추이 (최근 ' + n + '틱)', w/2, 18);
}

// ===================== HOOKS =====================
function hookV11Quiz() {
    if(typeof window.QUIZ_QUESTIONS === 'undefined') return;
    V11_QUIZ.forEach(function(q) {
        if(!window.QUIZ_QUESTIONS.some(function(eq) { return eq.q === q.q; })) {
            window.QUIZ_QUESTIONS.push(q);
        }
    });
}

function hookV11Achievements() {
    var allAch = null;
    ['ACHIEVEMENTS', 'NEW_ACHIEVEMENTS', 'V5_ACHIEVEMENTS'].forEach(function(name) {
        if(typeof window[name] !== 'undefined') allAch = window[name];
    });
    if(!allAch) return;
    var target = (typeof window.V5_ACHIEVEMENTS !== 'undefined') ? window.V5_ACHIEVEMENTS :
                 (typeof window.NEW_ACHIEVEMENTS !== 'undefined') ? window.NEW_ACHIEVEMENTS :
                 (typeof window.ACHIEVEMENTS !== 'undefined') ? window.ACHIEVEMENTS : null;
    if(!target) return;
    V11_ACHIEVEMENTS.forEach(function(a) {
        if(!target.some(function(ea) { return ea.id === a.id; })) {
            target.push(a);
        }
    });
}

function checkV11Achievements() {
    if(typeof window.unlockedAchievements === 'undefined') return;
    var ua = window.unlockedAchievements;

    var eduCount = 0;
    EDU_BUILDINGS.forEach(function(b) { if(eduBuilt[b.id]) eduCount++; });

    var checks = [
        { id: 'v11_edu_5', pass: eduCount >= 5 },
        { id: 'v11_edu_all', pass: eduCount >= EDU_BUILDINGS.length },
        { id: 'v11_disaster_3', pass: disasterSimCount >= 3 },
        { id: 'v11_disaster_all', pass: disasterTypesExperienced.size >= DISASTER_TYPES.length },
        { id: 'v11_law_3', pass: lawsEverEnacted.size >= 3 },
        { id: 'v11_law_all', pass: lawsEverEnacted.size >= LAWS.length },
        { id: 'v11_season', pass: seasonChecked },
        { id: 'v11_compare_s', pass: v11Features.has('compare_s') },
        { id: 'v11_citizen', pass: v11Features.has('citizen') },
        { id: 'v11_arch_5', pass: archViewed.size >= 5 },
        { id: 'v11_stats', pass: v11Features.has('stats') },
        { id: 'v11_explorer', pass: v11Features.size >= 8 }
    ];
    checks.forEach(function(c) {
        if(c.pass && !ua.has(c.id)) {
            ua.add(c.id);
            var ach = V11_ACHIEVEMENTS.find(function(a) { return a.id === c.id; });
            if(ach && typeof showAchievementToast === 'function') {
                playV11SFX('v11_achieve');
                showAchievementToast(ach);
            }
        }
    });
}

function hookV11AdvisorTips() {
    var tips = [
        '💡 교육 기관을 건설하면 문화가 크게 올라갑니다!',
        '💡 재해 시뮬레이터로 도시의 방재 능력을 테스트하세요.',
        '💡 법률은 최대 4개까지 시행할 수 있어요. 신중하게 선택하세요!',
        '💡 계절 행사를 확인하면 보너스를 받을 수 있어요.',
        '💡 도시 비교 분석에서 S등급을 목표로 해보세요!',
        '💡 시민 생활 시뮬레이터에서 백성들의 이야기를 들어보세요.',
        '💡 건축 양식 갤러리에서 한국 건축의 역사를 배울 수 있어요.',
        '💡 통계 대시보드에서 도시의 성장 추이를 확인하세요.',
        '💡 징병제를 시행하면 방어력이 크게 올라가지만 행복이 줄어요.',
        '💡 모든 교육 기관을 건설하면 교육 대국 업적을 얻을 수 있어요.'
    ];
    if(typeof window.V5_ADVISOR_TIPS !== 'undefined') {
        tips.forEach(function(t) {
            if(window.V5_ADVISOR_TIPS.indexOf(t) === -1) window.V5_ADVISOR_TIPS.push(t);
        });
    }
}

function hookV11GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    var v11TickCount = 0;
    window.gameTick = function() {
        prevTick();
        v11TickCount++;
        if(v11TickCount % 5 === 0) {
            var res = (typeof window.resources !== 'undefined') ? window.resources : null;
            if(res) {
                statsHistory.push({
                    pop: res.pop || 0,
                    gold: res.gold || 0,
                    food: res.food || 0,
                    culture: res.culture || 0,
                    happy: res.happy || 0
                });
                if(statsHistory.length > 30) statsHistory.shift();
            }
        }
        if(v11TickCount % 10 === 0) {
            var activeCount = 0;
            LAWS.forEach(function(l) {
                if(lawsActive[l.id] && l.effect) {
                    var res2 = (typeof window.resources !== 'undefined') ? window.resources : null;
                    if(res2) {
                        if(l.effect.gold) res2.gold = Math.max(0, res2.gold + l.effect.gold);
                        if(l.effect.culture) res2.culture = (res2.culture || 0) + l.effect.culture;
                    }
                    activeCount++;
                }
            });
        }
    };
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
        var v11panels = ['edu-panel','disaster-sim-panel','law-panel','season-panel','compare-panel','citizen-panel','arch-panel','stats-panel'];
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
            case 'E': showEducation(); e.preventDefault(); break;
            case 'N': showDisasterSim(); e.preventDefault(); break;
            case 'W': showLaws(); e.preventDefault(); break;
            case 'S': showSeason(); e.preventDefault(); break;
            case 'C': showCompare(); e.preventDefault(); break;
            case 'Z': showCitizen(); e.preventDefault(); break;
            case 'G': showArchitecture(); e.preventDefault(); break;
            case 'X': showStats(); e.preventDefault(); break;
        }
    });
}

// ===================== SAVE/LOAD =====================
function saveV11State() {
    try {
        var state = {
            edu: eduBuilt,
            disasterHist: disasterHistory.slice(-20),
            disasterTypes: Array.from(disasterTypesExperienced),
            disasterCount: disasterSimCount,
            laws: lawsActive,
            lawsEver: Array.from(lawsEverEnacted),
            features: Array.from(v11Features),
            archViewed: Array.from(archViewed),
            seasonChecked: seasonChecked,
            statsHist: statsHistory.slice(-30)
        };
        localStorage.setItem('cityV11State', JSON.stringify(state));
    } catch(e) {}
}

function loadV11State() {
    try {
        var raw = localStorage.getItem('cityV11State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.edu) { for(var k in state.edu) eduBuilt[k] = state.edu[k]; }
        if(state.disasterHist) disasterHistory = state.disasterHist;
        if(state.disasterTypes) disasterTypesExperienced = new Set(state.disasterTypes);
        if(state.disasterCount) disasterSimCount = state.disasterCount;
        if(state.laws) { for(var k2 in state.laws) lawsActive[k2] = state.laws[k2]; }
        if(state.lawsEver) lawsEverEnacted = new Set(state.lawsEver);
        if(state.features) v11Features = new Set(state.features);
        if(state.archViewed) archViewed = new Set(state.archViewed);
        if(state.seasonChecked) seasonChecked = state.seasonChecked;
        if(state.statsHist) statsHistory = state.statsHist;
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
    hookV11AdvisorTips();
    hookV11AutoSave();
    hookV11Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('📚 v11.0: 교육+재해+법률+계절행사+도시비교+시민생활+건축갤러리+통계!');
        }, 8000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV11, 2500); });
} else {
    setTimeout(initV11, 2500);
}

})();
