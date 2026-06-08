// =====================================================================
// city-builder v10_patch.js — PRIME Holdings NEXTERA+PRISM v10.0
// Self-contained IIFE patch: Military System 10 units, Agriculture
// Revolution 8 techs, Diplomacy Table Canvas 5 nations,
// Infrastructure 6 facilities, History Timeline Canvas,
// Hall of Fame 12 heroes, Public Opinion 6 categories,
// +15 Quiz (85→100), +12 Achievements (86→98),
// SFX 10, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v10Ctx = null;
function getV10Audio() {
    if(!v10Ctx) {
        try { v10Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v10Ctx;
}
function playV10SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV10Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.13, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'military_march':
            [262,330,392,330,262].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.12);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.12);
            });
            break;
        case 'farm_harvest':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(523, now);
            o.frequency.linearRampToValueAtTime(784, now+0.15);
            o.frequency.linearRampToValueAtTime(659, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'diplo_treaty':
            [440,554,659,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.3);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.3);
            });
            break;
        case 'infra_build':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(300, now);
            o.frequency.linearRampToValueAtTime(600, now+0.2);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'timeline_scroll':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(800, now);
            o.frequency.linearRampToValueAtTime(400, now+0.15);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'hero_summon':
            [523,659,784,988,1175].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.25);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.25);
            });
            break;
        case 'opinion_poll':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(440, now);
            o.frequency.setValueAtTime(523, now+0.08);
            o.frequency.setValueAtTime(440, now+0.16);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'v10_achieve':
            [880,1047,1175,1319,1568].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.2);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.2);
            });
            break;
        case 'battle_clash':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(150, now);
            o.frequency.linearRampToValueAtTime(80, now+0.2);
            g.gain.setValueAtTime(0.12, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'tech_unlock':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(659, now);
            o.frequency.setValueAtTime(784, now+0.1);
            o.frequency.setValueAtTime(1047, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
    }
}

// ===================== CSS =====================
var V10_CSS = '\
.v10-btn {\
    position: fixed; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
.v10-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
.v10-panel.show { display: flex; }\
.v10-box {\
    border-radius: 16px; padding: 24px; max-width: 520px; width: 100%;\
    max-height: 85vh; overflow-y: auto;\
}\
.v10-box h2 { text-align: center; margin-bottom: 12px; }\
.v10-close {\
    display: block; margin: 16px auto 0; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
.v10-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);\
}\
.v10-item .vi { font-size: 24px; }\
.v10-item .vn { flex: 1; }\
.v10-item .vn strong { font-size: 13px; }\
.v10-item .vn .vdet { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.v10-item .vact button {\
    border: none; color: #fff; padding: 5px 12px;\
    border-radius: 8px; font-size: 11px; cursor: pointer;\
}\
.v10-item .vact button:disabled { background: #555; cursor: not-allowed; color: #999; }\
#mil-panel .v10-box { background: linear-gradient(145deg, #2a1515, #1a0808); border: 2px solid #cc3333; }\
#mil-panel h2 { color: #ff6666; }\
#mil-panel .v10-close { background: #cc3333; }\
#mil-panel .vn strong { color: #ff8888; }\
#mil-panel .vact button { background: #cc3333; }\
#mil-panel .vact button:hover { background: #dd4444; }\
#agri-panel .v10-box { background: linear-gradient(145deg, #152a15, #081a08); border: 2px solid #33aa33; }\
#agri-panel h2 { color: #66dd66; }\
#agri-panel .v10-close { background: #33aa33; }\
#agri-panel .vn strong { color: #88ee88; }\
#agri-panel .vact button { background: #33aa33; }\
#agri-panel .vact button:hover { background: #44bb44; }\
#diplo-panel .v10-box { background: linear-gradient(145deg, #1a1530, #0e0a20); border: 2px solid #8855cc; }\
#diplo-panel h2 { color: #bb88ff; }\
#diplo-panel .v10-close { background: #8855cc; }\
#infra-panel .v10-box { background: linear-gradient(145deg, #15202a, #081418); border: 2px solid #3388cc; }\
#infra-panel h2 { color: #66bbff; }\
#infra-panel .v10-close { background: #3388cc; }\
#infra-panel .vn strong { color: #88ccff; }\
#infra-panel .vact button { background: #3388cc; }\
#infra-panel .vact button:hover { background: #44aadd; }\
#timeline-panel .v10-box { background: linear-gradient(145deg, #2a2515, #1a1808); border: 2px solid #ccaa33; }\
#timeline-panel h2 { color: #ffdd66; }\
#timeline-panel .v10-close { background: #ccaa33; }\
#fame-panel .v10-box { background: linear-gradient(145deg, #2a1a08, #1a0e04); border: 2px solid #dd8822; }\
#fame-panel h2 { color: #ffaa44; }\
#fame-panel .v10-close { background: #dd8822; }\
#opinion-panel .v10-box { background: linear-gradient(145deg, #152028, #0a1018); border: 2px solid #4488aa; }\
#opinion-panel h2 { color: #66ccdd; }\
#opinion-panel .v10-close { background: #4488aa; }\
#diplo-canvas { width: 100%; height: 260px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 14px; }\
#timeline-canvas { width: 100%; height: 200px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 14px; }\
.diplo-nation {\
    display: flex; align-items: center; gap: 10px; padding: 10px;\
    margin-bottom: 6px; border-radius: 10px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(136,85,204,0.2);\
}\
.diplo-nation .dn-flag { font-size: 28px; }\
.diplo-nation .dn-info { flex: 1; }\
.diplo-nation .dn-name { font-weight: bold; color: #bb88ff; font-size: 13px; }\
.diplo-nation .dn-status { font-size: 11px; margin-top: 2px; }\
.diplo-nation .dn-rel { height: 6px; background: #333; border-radius: 3px; margin-top: 4px; overflow: hidden; }\
.diplo-nation .dn-rel-bar { height: 100%; border-radius: 3px; transition: width 0.5s; }\
.diplo-nation .dn-acts { display: flex; gap: 4px; }\
.diplo-nation .dn-acts button {\
    border: none; color: #fff; padding: 4px 8px; border-radius: 6px;\
    font-size: 10px; cursor: pointer;\
}\
.fame-hero {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(221,136,34,0.2);\
}\
.fame-hero.summoned { background: rgba(221,136,34,0.08); border-color: rgba(221,136,34,0.5); }\
.fame-hero .fh-icon { font-size: 32px; filter: grayscale(0.8) brightness(0.6); }\
.fame-hero.summoned .fh-icon { filter: none; }\
.fame-hero .fh-info { flex: 1; }\
.fame-hero .fh-name { font-weight: bold; color: #ffaa44; font-size: 14px; }\
.fame-hero .fh-era { font-size: 10px; color: #cc8833; }\
.fame-hero .fh-desc { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.fame-hero .fh-buff { font-size: 11px; color: #ffcc66; margin-top: 4px; }\
.opin-cat {\
    padding: 12px; margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(68,136,170,0.2);\
}\
.opin-cat .oc-header { display: flex; justify-content: space-between; align-items: center; }\
.opin-cat .oc-name { font-weight: bold; color: #66ccdd; font-size: 13px; }\
.opin-cat .oc-score { font-weight: bold; font-size: 14px; }\
.opin-cat .oc-bar { height: 8px; background: #333; border-radius: 4px; margin-top: 6px; overflow: hidden; }\
.opin-cat .oc-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }\
.opin-cat .oc-tip { font-size: 10px; color: #999; margin-top: 4px; font-style: italic; }\
@media (max-width: 600px) {\
    .v10-left-btns { display: none !important; }\
}\
';

// ===================== DATA =====================

var MILITARY_UNITS = [
    { id: 'barracks', icon: '🏕️', name: '병영', desc: '기본 보병 훈련소. 도시 방어력 +5.', cost: 60, defense: 5, era: 0 },
    { id: 'archers', icon: '🏹', name: '궁병대', desc: '원거리 공격 부대. 방어력 +8, 침략 피해 -10%.', cost: 80, defense: 8, era: 0 },
    { id: 'cavalry', icon: '🐴', name: '기마대', desc: '고구려 기마병. 방어력 +12, 반격 능력.', cost: 120, defense: 12, era: 1 },
    { id: 'navy', icon: '⛵', name: '수군', desc: '해상 방어 함대. 왜구 피해 -40%.', cost: 150, defense: 10, era: 1 },
    { id: 'shield_wall', icon: '🛡️', name: '방패부대', desc: '중장보병. 모든 피해 -8%.', cost: 100, defense: 15, era: 2 },
    { id: 'general', icon: '🎖️', name: '장군관', desc: '전체 군사 효율 +20%. 전략 지휘소.', cost: 200, defense: 5, era: 2 },
    { id: 'armory_v10', icon: '⚒️', name: '무기제조소', desc: '고급 무기 생산. 전투력 +15%.', cost: 140, defense: 8, era: 3 },
    { id: 'training', icon: '🎯', name: '훈련장', desc: '정예 병사 양성. 방어력 +10.', cost: 110, defense: 10, era: 3 },
    { id: 'spy_office', icon: '🕵️', name: '첩보부', desc: '적 침입 사전 탐지. 재해 경보 확률 +30%.', cost: 160, defense: 3, era: 3 },
    { id: 'fortress_gate', icon: '🏰', name: '성문', desc: '도시 정문 방어. 방어력 +20, 위용.', cost: 250, defense: 20, era: 4 }
];

var AGRI_TECHS = [
    { id: 'irrigation', icon: '💧', name: '관개수로', desc: '논에 물을 효율적으로 공급. 식량 +15%.', cost: 50, foodBonus: 0.15, unlocked: false },
    { id: 'ondol_field', icon: '🔥', name: '구들밭', desc: '겨울에도 작물 재배 가능. 겨울 페널티 제거.', cost: 70, foodBonus: 0.05, unlocked: false },
    { id: 'expansion', icon: '🌾', name: '경작지 확장', desc: '농경지 면적 30% 증가. 식량 +20%.', cost: 90, foodBonus: 0.20, unlocked: false },
    { id: 'harvest_fest', icon: '🎉', name: '수확 축제', desc: '가을 수확 보너스 2배. 행복 +10.', cost: 60, foodBonus: 0.10, unlocked: false },
    { id: 'seeds', icon: '🌱', name: '종자 개량', desc: '우량 종자 개발. 식량 +10%.', cost: 80, foodBonus: 0.10, unlocked: false },
    { id: 'fertilizer', icon: '🧪', name: '비료 공방', desc: '자연 비료 생산. 식량 +12%.', cost: 100, foodBonus: 0.12, unlocked: false },
    { id: 'labor', icon: '👷', name: '노동 편성', desc: '농민 효율적 배치. 식량 +8%, 금 +5%.', cost: 70, foodBonus: 0.08, unlocked: false },
    { id: 'grain_trade', icon: '🚛', name: '곡물 교역', desc: '잉여 식량 자동 판매. 금 +3/틱.', cost: 120, foodBonus: 0.05, unlocked: false }
];

var DIPLO_NATIONS = [
    { id: 'china', flag: '🇨🇳', name: '중국', relation: 50, status: '중립', era: 0, giftCost: 80, treatyBonus: { gold: 5 } },
    { id: 'japan', flag: '🇯🇵', name: '일본', relation: 30, status: '경계', era: 1, giftCost: 100, treatyBonus: { culture: 5 } },
    { id: 'mongol', flag: '🏇', name: '몽골', relation: 20, status: '적대', era: 2, giftCost: 150, treatyBonus: { gold: 8 } },
    { id: 'ryukyu', flag: '🏝️', name: '유구국', relation: 60, status: '우호', era: 2, giftCost: 60, treatyBonus: { food: 5 } },
    { id: 'manchu', flag: '🐎', name: '만주', relation: 35, status: '경계', era: 3, giftCost: 120, treatyBonus: { pop: 3 } }
];

var INFRA_FACILITIES = [
    { id: 'water_supply', icon: '🚰', name: '상수도', desc: '깨끗한 물 공급. 인구 한계 +50, 행복 +5.', cost: 80, popBonus: 50, built: false },
    { id: 'sewage', icon: '🕳️', name: '하수도', desc: '오수 처리. 역병 피해 -30%, 행복 +3.', cost: 100, popBonus: 30, built: false },
    { id: 'paved_road', icon: '🛤️', name: '도로 포장', desc: '교통 개선. 교역 수입 +15%, 이동 효율.', cost: 90, popBonus: 20, built: false },
    { id: 'street_light', icon: '💡', name: '가로등', desc: '야간 치안 강화. 행복 +8, 범죄 감소.', cost: 70, popBonus: 10, built: false },
    { id: 'comm_net', icon: '📡', name: '통신망', desc: '정보 전달 속도 향상. 문화 +5/틱.', cost: 120, popBonus: 15, built: false },
    { id: 'post_office', icon: '📮', name: '우체국', desc: '서신 교류. 외교 관계 +10, 행복 +4.', cost: 60, popBonus: 10, built: false }
];

var FAME_HEROES = [
    { id: 'dangun', icon: '👑', name: '단군왕검', era: '고조선', desc: '고조선을 세운 건국 시조. 홍익인간의 이념으로 백성을 다스렸습니다.', buff: '인구 +10%, 행복 +5', minEra: 0 },
    { id: 'gwanggaeto', icon: '⚔️', name: '광개토대왕', era: '삼국', desc: '고구려 최대 영토를 확장한 정복 군주. 391년~412년 재위.', buff: '방어력 +20, 문화 +10', minEra: 1 },
    { id: 'eulji', icon: '🎖️', name: '을지문덕', era: '삼국', desc: '살수대첩으로 수나라 30만 대군을 물리친 명장.', buff: '군사 효율 +25%', minEra: 1 },
    { id: 'yeonge', icon: '🗡️', name: '연개소문', era: '삼국', desc: '고구려 최고 권력자. 당나라 침입을 막아낸 강력한 장군.', buff: '침략 피해 -20%', minEra: 1 },
    { id: 'wanggeon', icon: '🏛️', name: '왕건', era: '고려', desc: '고려를 세운 태조. 후삼국을 통일하고 민족 통합을 이룬 왕.', buff: '외교 관계 +15, 금 +5', minEra: 2 },
    { id: 'choemuseon', icon: '💥', name: '최무선', era: '고려', desc: '화약을 개발하여 진포해전에서 왜구를 물리친 발명가.', buff: '왜구 피해 -50%', minEra: 2 },
    { id: 'sejong', icon: '📜', name: '세종대왕', era: '조선', desc: '한글을 창제하고 과학 기술을 발전시킨 위대한 성군.', buff: '문화 +20, 기술 연구 +30%', minEra: 3 },
    { id: 'yisunsin', icon: '🐢', name: '이순신', era: '조선', desc: '거북선으로 임진왜란을 승리로 이끈 성웅.', buff: '수군 방어력 2배', minEra: 3 },
    { id: 'jang', icon: '⏰', name: '장영실', era: '조선', desc: '측우기, 자격루, 앙부일구를 발명한 천재 과학자.', buff: '기술 보너스 +15%', minEra: 3 },
    { id: 'jeong', icon: '📐', name: '정약용', era: '조선', desc: '거중기를 발명하고 실학을 집대성한 학자.', buff: '건설 비용 -10%', minEra: 3 },
    { id: 'ahn', icon: '🔫', name: '안중근', era: '근대', desc: '이토 히로부미를 처단한 독립운동가. 동양평화론 저술.', buff: '행복 +15, 문화 +10', minEra: 4 },
    { id: 'yoon', icon: '💣', name: '윤봉길', era: '근대', desc: '상해 홍커우 공원 의거로 독립 의지를 세계에 알린 의사.', buff: '방어력 +10, 행복 +10', minEra: 4 }
];

var OPINION_CATS = [
    { id: 'safety', icon: '🛡️', name: '치안', color: '#ef5350', weight: 'military' },
    { id: 'education', icon: '📚', name: '교육', color: '#42a5f5', weight: 'culture' },
    { id: 'economy', icon: '💰', name: '경제', color: '#ffa726', weight: 'gold' },
    { id: 'environment', icon: '🌿', name: '환경', color: '#66bb6a', weight: 'food' },
    { id: 'culture_op', icon: '🎭', name: '문화', color: '#ab47bc', weight: 'cultureHigh' },
    { id: 'diplomacy', icon: '🤝', name: '외교', color: '#26c6da', weight: 'diplo' }
];

var V10_QUIZ = [
    { q: '고구려의 최대 영토를 확장한 왕은?', a: ['광개토대왕','장수왕','소수림왕','동명성왕'], c: 0, h: '광개토대왕(재위 391~412)은 만주와 한반도 북부를 정복하여 고구려 최대 영토를 이루었습니다.' },
    { q: '살수대첩에서 수나라 군대를 물리친 장군은?', a: ['을지문덕','연개소문','김유신','계백'], c: 0, h: '을지문덕 장군은 612년 살수(청천강)에서 수나라 별동대 30만을 거의 전멸시켰습니다.' },
    { q: '고려를 세운 인물은?', a: ['왕건','견훤','궁예','왕소'], c: 0, h: '왕건(태조)은 918년 고려를 건국하고 936년 후삼국을 통일했습니다.' },
    { q: '세종대왕이 만든 문자 체계는?', a: ['한글','이두','향찰','구결'], c: 0, h: '세종대왕은 1443년 한글(훈민정음)을 창제하여 1446년 반포했습니다.' },
    { q: '임진왜란 때 활약한 의병장이 아닌 사람은?', a: ['곽재우','고경명','조헌','정도전'], c: 3, h: '정도전은 조선 건국 공신이며 임진왜란(1592) 이전 인물입니다.' },
    { q: '조선시대 최초의 백과사전은?', a: ['지봉유설','동의보감','목민심서','경국대전'], c: 0, h: '이수광의 지봉유설(1614)은 조선 최초의 백과사전적 저술입니다.' },
    { q: '고려의 수도는?', a: ['개경(개성)','한양','평양','경주'], c: 0, h: '고려의 수도는 개경(현재 개성)이며 만월대에 왕궁이 있었습니다.' },
    { q: '조선 정조의 개혁 정치 기구는?', a: ['규장각','집현전','성균관','사간원'], c: 0, h: '정조는 규장각을 강화하여 학문 연구와 개혁 정치의 중심으로 만들었습니다.' },
    { q: '한국 최초의 근대 신문은?', a: ['한성순보','독립신문','매일신보','황성신문'], c: 0, h: '한성순보(1883)는 한국 최초의 근대 신문으로 한문으로 발행되었습니다.' },
    { q: '대한제국을 선포한 왕은?', a: ['고종','순종','철종','헌종'], c: 0, h: '고종은 1897년 대한제국을 선포하고 황제에 올라 자주독립을 선언했습니다.' },
    { q: '삼국시대 가야의 특산품은?', a: ['철','비단','도자기','종이'], c: 0, h: '가야는 풍부한 철광 자원으로 철제 무기와 갑옷을 생산하여 수출했습니다.' },
    { q: '고구려의 고분 벽화가 발견된 대표적 무덤은?', a: ['무용총','천마총','석촌동고분','왕릉'], c: 0, h: '무용총은 고구려 고분벽화 중 수렵도와 무용도가 유명한 무덤입니다.' },
    { q: '조선시대 과거시험의 최종 시험은?', a: ['전시','초시','회시','감시'], c: 0, h: '전시는 왕이 직접 주관하는 과거시험의 최종 단계입니다.' },
    { q: '한국 전통 건축에서 처마의 역할은?', a: ['여름 햇빛 차단+겨울 채광','장식용','방수','보온'], c: 0, h: '처마는 여름 높은 태양을 차단하고 겨울 낮은 태양빛을 실내로 들이는 과학적 설계입니다.' },
    { q: '근대화 시기 전화가 처음 설치된 곳은?', a: ['경복궁','덕수궁','창덕궁','경희궁'], c: 1, h: '1896년 덕수궁에 최초로 전화가 설치되어 궁궐과 관청 사이 통화가 가능해졌습니다.' }
];

var V10_ACHIEVEMENTS = [
    { id: 'v10_mil_5', icon: '⚔️', title: '군사 강국', desc: '군사 시설 5개 이상 건설' },
    { id: 'v10_mil_all', icon: '🏰', title: '철벽 요새', desc: '모든 군사 시설 완성' },
    { id: 'v10_agri_5', icon: '🌾', title: '농업 혁명가', desc: '농업 기술 5개 이상 개발' },
    { id: 'v10_agri_all', icon: '🌱', title: '녹색 혁명', desc: '모든 농업 기술 완성' },
    { id: 'v10_diplo_3', icon: '🤝', title: '외교관', desc: '3개국 이상 우호 관계' },
    { id: 'v10_infra_all', icon: '🏗️', title: '인프라 마스터', desc: '모든 인프라 시설 완성' },
    { id: 'v10_hero_5', icon: '👑', title: '역사의 부름', desc: '위인 5명 이상 소환' },
    { id: 'v10_hero_all', icon: '🌟', title: '만신전', desc: '모든 위인 소환' },
    { id: 'v10_opinion_80', icon: '📊', title: '민심 장악', desc: '모든 여론 80점 이상' },
    { id: 'v10_quiz_100', icon: '🧠', title: '역사 대학자', desc: '퀴즈 100문제 전부 정답' },
    { id: 'v10_timeline', icon: '📜', title: '시간여행자', desc: '타임라인 확인' },
    { id: 'v10_explorer', icon: '🗺️', title: 'v10 탐험가', desc: 'v10.0의 모든 기능 체험' }
];

// ===================== STATE =====================
var milBuilt = {};
var agriUnlocked = {};
var diploRelations = {};
var infraBuilt = {};
var heroSummoned = {};
var v10Features = new Set();
var v10TimelineViewed = false;
var milTotalDef = 0;
var agriFoodMult = 1.0;

function initV10State() {
    MILITARY_UNITS.forEach(function(u) { milBuilt[u.id] = false; });
    AGRI_TECHS.forEach(function(t) { agriUnlocked[t.id] = false; });
    DIPLO_NATIONS.forEach(function(n) { diploRelations[n.id] = n.relation; });
    INFRA_FACILITIES.forEach(function(f) { infraBuilt[f.id] = false; });
    FAME_HEROES.forEach(function(h) { heroSummoned[h.id] = false; });
}

function calcMilDefense() {
    var def = 0;
    MILITARY_UNITS.forEach(function(u) { if(milBuilt[u.id]) def += u.defense; });
    var hasGeneral = milBuilt['general'];
    if(hasGeneral) def = Math.round(def * 1.2);
    milTotalDef = def;
    return def;
}

function calcAgriFoodMult() {
    var mult = 1.0;
    AGRI_TECHS.forEach(function(t) { if(agriUnlocked[t.id]) mult += t.foodBonus; });
    agriFoodMult = mult;
    return mult;
}

function getOpinionScores() {
    var res = (typeof window.resources !== 'undefined') ? window.resources : { pop: 50, food: 100, gold: 200, happy: 50, culture: 0 };
    var milDef = calcMilDefense();
    var friendlyNations = 0;
    DIPLO_NATIONS.forEach(function(n) { if(diploRelations[n.id] >= 60) friendlyNations++; });
    var infraCount = 0;
    INFRA_FACILITIES.forEach(function(f) { if(infraBuilt[f.id]) infraCount++; });

    return OPINION_CATS.map(function(cat) {
        var score = 50;
        switch(cat.weight) {
            case 'military': score = Math.min(100, 30 + milDef * 1.5 + infraCount * 5); break;
            case 'culture': score = Math.min(100, 20 + Math.min(res.culture, 200) * 0.3 + infraCount * 3); break;
            case 'gold': score = Math.min(100, 20 + Math.min(res.gold, 1000) * 0.06 + (agriFoodMult - 1) * 80); break;
            case 'food': score = Math.min(100, 30 + Math.min(res.food, 300) * 0.15 + agriFoodMult * 10); break;
            case 'cultureHigh': score = Math.min(100, 20 + Math.min(res.culture, 300) * 0.2 + Object.values(heroSummoned).filter(Boolean).length * 5); break;
            case 'diplo': score = Math.min(100, 20 + friendlyNations * 15 + infraCount * 3); break;
        }
        var tip = '';
        if(score < 40) tip = '즉각적인 개선이 필요합니다.';
        else if(score < 60) tip = '기본 수준입니다. 개선 여지가 있습니다.';
        else if(score < 80) tip = '양호합니다. 조금만 더 노력하세요.';
        else tip = '우수합니다! 현 수준을 유지하세요.';
        return { id: cat.id, icon: cat.icon, name: cat.name, color: cat.color, score: Math.round(score), tip: tip };
    });
}

// ===================== UI CREATION =====================
function addV10UI() {
    var style = document.createElement('style');
    style.textContent = V10_CSS;
    document.head.appendChild(style);

    var leftBtns = [
        { id: 'mil-btn', text: '⚔️', title: '군사', left: '10px', top: '370px', color: '#ff6666' },
        { id: 'agri-btn', text: '🌾', title: '농업혁명', left: '10px', top: '410px', color: '#66dd66' },
        { id: 'diplo-btn', text: '🤝', title: '외교', left: '10px', top: '450px', color: '#bb88ff' },
        { id: 'infra-btn', text: '🏗️', title: '인프라', left: '10px', top: '490px', color: '#66bbff' },
        { id: 'timeline-btn', text: '📜', title: '타임라인', left: '10px', top: '530px', color: '#ffdd66' },
        { id: 'fame-btn', text: '🏆', title: '명예의전당', left: '10px', top: '570px', color: '#ffaa44' },
        { id: 'opinion-btn', text: '📊', title: '여론조사', left: '10px', top: '610px', color: '#66ccdd' }
    ];

    var wrap = document.createElement('div');
    wrap.className = 'v10-left-btns';
    wrap.style.cssText = 'position:fixed;z-index:10;';

    leftBtns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.id = b.id;
        btn.className = 'v10-btn';
        btn.textContent = b.text;
        btn.title = b.title;
        btn.style.cssText = 'position:fixed;left:'+b.left+';top:'+b.top+';color:'+b.color+';';
        wrap.appendChild(btn);
    });
    document.body.appendChild(wrap);

    document.getElementById('mil-btn').onclick = showMilitary;
    document.getElementById('agri-btn').onclick = showAgriculture;
    document.getElementById('diplo-btn').onclick = showDiplomacy;
    document.getElementById('infra-btn').onclick = showInfra;
    document.getElementById('timeline-btn').onclick = showTimeline;
    document.getElementById('fame-btn').onclick = showFame;
    document.getElementById('opinion-btn').onclick = showOpinion;

    createPanel('mil-panel', '⚔️ 군사 시스템', 'mil-content');
    createPanel('agri-panel', '🌾 농업 혁명', 'agri-content');
    createPanel('diplo-panel', '🤝 외교 테이블', 'diplo-content');
    createPanel('infra-panel', '🏗️ 도시 인프라', 'infra-content');
    createPanel('timeline-panel', '📜 역사 타임라인', 'timeline-content');
    createPanel('fame-panel', '🏆 명예의 전당', 'fame-content');
    createPanel('opinion-panel', '📊 주민 여론조사', 'opinion-content');
}

function createPanel(panelId, title, contentId) {
    var d = document.createElement('div');
    d.id = panelId;
    d.className = 'v10-panel';
    d.innerHTML = '<div class="v10-box"><h2>' + title + '</h2><div id="' + contentId + '"></div><button class="v10-close" onclick="document.getElementById(\'' + panelId + '\').classList.remove(\'show\')">닫기</button></div>';
    document.body.appendChild(d);
    d.onclick = function(e) { if(e.target === d) d.classList.remove('show'); };
}

// ===================== SHOW FUNCTIONS =====================
function showMilitary() {
    playV10SFX('military_march');
    v10Features.add('military');
    var def = calcMilDefense();
    var builtCount = 0;
    MILITARY_UNITS.forEach(function(u) { if(milBuilt[u.id]) builtCount++; });

    var html = '<div style="text-align:center;color:#ff8888;font-size:13px;margin-bottom:14px;">총 방어력: ' + def + ' | 건설: ' + builtCount + '/' + MILITARY_UNITS.length + '</div>';
    MILITARY_UNITS.forEach(function(u) {
        var built = milBuilt[u.id];
        var eraOk = (typeof window.currentEra !== 'undefined') ? window.currentEra >= u.era : true;
        var btnText = built ? '✅ 배치됨' : (!eraOk ? '🔒 ' + ['고조선','삼국','고려','조선','근대'][u.era] : '건설 (' + u.cost + '금)');
        var disabled = (built || !eraOk) ? ' disabled' : '';
        html += '<div class="v10-item"><div class="vi">' + u.icon + '</div><div class="vn"><strong>' + u.name + ' (방어+' + u.defense + ')</strong><div class="vdet">' + u.desc + '</div></div><div class="vact"><button onclick="v10BuildMil(\'' + u.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('mil-content').innerHTML = html;
    document.getElementById('mil-panel').classList.add('show');
    checkV10Achievements();
}

function showAgriculture() {
    playV10SFX('farm_harvest');
    v10Features.add('agriculture');
    var mult = calcAgriFoodMult();
    var unlockCount = 0;
    AGRI_TECHS.forEach(function(t) { if(agriUnlocked[t.id]) unlockCount++; });

    var html = '<div style="text-align:center;color:#88ee88;font-size:13px;margin-bottom:14px;">식량 배율: x' + mult.toFixed(2) + ' | 개발: ' + unlockCount + '/' + AGRI_TECHS.length + '</div>';
    AGRI_TECHS.forEach(function(t) {
        var unlocked = agriUnlocked[t.id];
        var btnText = unlocked ? '✅ 완료' : '개발 (' + t.cost + '금)';
        var disabled = unlocked ? ' disabled' : '';
        html += '<div class="v10-item"><div class="vi">' + t.icon + '</div><div class="vn"><strong>' + t.name + ' (+' + Math.round(t.foodBonus*100) + '% 식량)</strong><div class="vdet">' + t.desc + '</div></div><div class="vact"><button onclick="v10UnlockAgri(\'' + t.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('agri-content').innerHTML = html;
    document.getElementById('agri-panel').classList.add('show');
    checkV10Achievements();
}

function showDiplomacy() {
    playV10SFX('diplo_treaty');
    v10Features.add('diplomacy');

    var canvas = document.createElement('canvas');
    canvas.id = 'diplo-canvas';
    canvas.width = 480;
    canvas.height = 260;

    var html = '';
    DIPLO_NATIONS.forEach(function(n) {
        var rel = diploRelations[n.id] || 0;
        var statusColor = rel >= 70 ? '#4caf50' : rel >= 40 ? '#ffaa00' : '#f44336';
        var statusText = rel >= 70 ? '동맹' : rel >= 50 ? '우호' : rel >= 30 ? '중립' : '적대';
        var eraOk = (typeof window.currentEra !== 'undefined') ? window.currentEra >= n.era : true;
        html += '<div class="diplo-nation"><div class="dn-flag">' + n.flag + '</div><div class="dn-info"><div class="dn-name">' + n.name + ' (' + statusText + ')</div><div class="dn-status" style="color:' + statusColor + '">호감도: ' + rel + '/100</div><div class="dn-rel"><div class="dn-rel-bar" style="width:' + rel + '%;background:' + statusColor + '"></div></div></div><div class="dn-acts">' + (eraOk ? '<button style="background:#8855cc" onclick="v10DiploGift(\'' + n.id + '\')">선물(' + n.giftCost + '금)</button><button style="background:' + (rel >= 60 ? '#33aa33' : '#555') + '" onclick="v10DiploTreaty(\'' + n.id + '\')"' + (rel < 60 ? ' disabled' : '') + '>조약</button>' : '<button disabled style="background:#555">🔒</button>') + '</div></div>';
    });

    var contentEl = document.getElementById('diplo-content');
    contentEl.innerHTML = '';
    contentEl.appendChild(canvas);
    var listDiv = document.createElement('div');
    listDiv.innerHTML = html;
    contentEl.appendChild(listDiv);

    drawDiploCanvas(canvas);
    document.getElementById('diplo-panel').classList.add('show');
    checkV10Achievements();
}

function drawDiploCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0e0a20');
    bg.addColorStop(1, '#1a1530');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    var cx = w / 2, cy = h / 2;
    ctx.fillStyle = '#bb88ff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한국', cx, cy + 5);
    ctx.strokeStyle = 'rgba(187,136,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.stroke();

    var angles = [-Math.PI/2, -Math.PI/6, Math.PI/4, 2*Math.PI/3, 7*Math.PI/6];
    DIPLO_NATIONS.forEach(function(n, i) {
        var angle = angles[i];
        var dist = 90;
        var nx = cx + Math.cos(angle) * dist;
        var ny = cy + Math.sin(angle) * dist;
        var rel = diploRelations[n.id] || 0;
        var color = rel >= 70 ? '#4caf50' : rel >= 40 ? '#ffaa00' : '#f44336';

        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1, rel / 25);
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.arc(nx, ny, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '18px sans-serif';
        ctx.fillText(n.flag, nx, ny + 2);
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#ccc';
        ctx.fillText(n.name, nx, ny + 32);
        ctx.fillStyle = color;
        ctx.fillText(rel + '%', nx, ny + 44);
    });
}

function showInfra() {
    playV10SFX('infra_build');
    v10Features.add('infra');
    var builtCount = 0;
    INFRA_FACILITIES.forEach(function(f) { if(infraBuilt[f.id]) builtCount++; });
    var totalPopBonus = 0;
    INFRA_FACILITIES.forEach(function(f) { if(infraBuilt[f.id]) totalPopBonus += f.popBonus; });

    var html = '<div style="text-align:center;color:#88ccff;font-size:13px;margin-bottom:14px;">인프라: ' + builtCount + '/' + INFRA_FACILITIES.length + ' | 인구보너스: +' + totalPopBonus + '</div>';
    INFRA_FACILITIES.forEach(function(f) {
        var built = infraBuilt[f.id];
        var btnText = built ? '✅ 완료' : '건설 (' + f.cost + '금)';
        var disabled = built ? ' disabled' : '';
        html += '<div class="v10-item"><div class="vi">' + f.icon + '</div><div class="vn"><strong>' + f.name + ' (인구+' + f.popBonus + ')</strong><div class="vdet">' + f.desc + '</div></div><div class="vact"><button onclick="v10BuildInfra(\'' + f.id + '\')"' + disabled + '>' + btnText + '</button></div></div>';
    });
    document.getElementById('infra-content').innerHTML = html;
    document.getElementById('infra-panel').classList.add('show');
    checkV10Achievements();
}

function showTimeline() {
    playV10SFX('timeline_scroll');
    v10Features.add('timeline');
    v10TimelineViewed = true;

    var canvas = document.createElement('canvas');
    canvas.id = 'timeline-canvas';
    canvas.width = 480;
    canvas.height = 200;

    var contentEl = document.getElementById('timeline-content');
    contentEl.innerHTML = '';
    contentEl.appendChild(canvas);

    drawTimelineCanvas(canvas);

    var events = [
        { era: '고조선', year: 'BC 2333', event: '단군왕검, 고조선 건국', icon: '👑' },
        { era: '고조선', year: 'BC 194', event: '위만조선 성립', icon: '⚔️' },
        { era: '삼국', year: 'BC 57', event: '신라 건국 (박혁거세)', icon: '🏛️' },
        { era: '삼국', year: '612', event: '살수대첩 (을지문덕)', icon: '⚔️' },
        { era: '삼국', year: '668', event: '삼국통일 (신라)', icon: '🎉' },
        { era: '고려', year: '918', event: '고려 건국 (왕건)', icon: '🏛️' },
        { era: '고려', year: '1234', event: '세계 최초 금속활자', icon: '📚' },
        { era: '조선', year: '1392', event: '조선 건국 (이성계)', icon: '🏛️' },
        { era: '조선', year: '1446', event: '훈민정음 반포', icon: '📜' },
        { era: '조선', year: '1592', event: '임진왜란 (이순신)', icon: '🐢' },
        { era: '근대', year: '1876', event: '강화도 조약 (개항)', icon: '🚢' },
        { era: '근대', year: '1919', event: '3.1 독립운동', icon: '🇰🇷' }
    ];

    var evHtml = '<div style="margin-top:14px;">';
    events.forEach(function(ev) {
        evHtml += '<div style="display:flex;gap:10px;padding:8px;margin-bottom:4px;border-radius:8px;background:rgba(255,255,255,0.03);border-left:3px solid #ccaa33;"><div style="font-size:18px;">' + ev.icon + '</div><div><div style="color:#ffdd66;font-weight:bold;font-size:12px;">' + ev.year + ' | ' + ev.era + '</div><div style="color:#ddd;font-size:12px;">' + ev.event + '</div></div></div>';
    });
    evHtml += '</div>';
    contentEl.innerHTML += evHtml;

    document.getElementById('timeline-panel').classList.add('show');
    checkV10Achievements();
}

function drawTimelineCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var bg = ctx.createLinearGradient(0, 0, w, 0);
    bg.addColorStop(0, '#1a1808');
    bg.addColorStop(1, '#2a2510');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    var eras = [
        { name: '고조선', color: '#8B7355', start: 0, width: 0.2 },
        { name: '삼국', color: '#5B8C5A', start: 0.2, width: 0.2 },
        { name: '고려', color: '#4A7B9D', start: 0.4, width: 0.2 },
        { name: '조선', color: '#8B4513', start: 0.6, width: 0.2 },
        { name: '근대', color: '#696969', start: 0.8, width: 0.2 }
    ];

    var lineY = h * 0.55;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, lineY);
    ctx.lineTo(w - 20, lineY);
    ctx.stroke();

    var curEra = (typeof window.currentEra !== 'undefined') ? window.currentEra : 0;

    eras.forEach(function(era, i) {
        var x = 20 + era.start * (w - 40);
        var ew = era.width * (w - 40);

        ctx.fillStyle = i <= curEra ? era.color + 'aa' : era.color + '33';
        ctx.fillRect(x, lineY - 15, ew, 30);

        if(i === curEra) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, lineY - 15, ew, 30);
        }

        ctx.fillStyle = i <= curEra ? '#fff' : '#888';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(era.name, x + ew / 2, lineY + 4);

        ctx.fillStyle = '#aaa';
        ctx.font = '9px sans-serif';
        var years = ['BC2333', 'BC57', '918', '1392', '1876'];
        ctx.fillText(years[i], x + ew / 2, lineY + 28);
    });

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('한국사 5천년 타임라인', w / 2, 20);

    var progress = (curEra + 1) / 5;
    ctx.fillStyle = 'rgba(255,215,0,0.2)';
    ctx.fillRect(20, h - 20, (w - 40) * progress, 8);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(20, h - 20, (w - 40) * progress, 8);
    ctx.fillStyle = '#aaa';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(progress * 100) + '% 완료', w - 20, h - 8);
}

function showFame() {
    playV10SFX('hero_summon');
    v10Features.add('fame');
    var summonedCount = 0;
    FAME_HEROES.forEach(function(h) { if(heroSummoned[h.id]) summonedCount++; });

    var html = '<div style="text-align:center;color:#ffaa44;font-size:13px;margin-bottom:14px;">소환된 위인: ' + summonedCount + '/' + FAME_HEROES.length + '</div>';
    FAME_HEROES.forEach(function(h) {
        var summoned = heroSummoned[h.id];
        var eraOk = (typeof window.currentEra !== 'undefined') ? window.currentEra >= h.minEra : true;
        var summonCost = 100 + h.minEra * 50;
        html += '<div class="fame-hero' + (summoned ? ' summoned' : '') + '"><div class="fh-icon">' + h.icon + '</div><div class="fh-info"><div class="fh-name">' + (summoned || eraOk ? h.name : '???') + ' <span class="fh-era">' + h.era + '</span></div><div class="fh-desc">' + (summoned || eraOk ? h.desc : '시대를 진행하면 해금됩니다.') + '</div>' + (summoned ? '<div class="fh-buff">효과: ' + h.buff + '</div>' : '') + '</div>' + (!summoned && eraOk ? '<div class="vact"><button style="background:#dd8822" onclick="v10SummonHero(\'' + h.id + '\')">소환(' + summonCost + '금)</button></div>' : '') + '</div>';
    });
    document.getElementById('fame-content').innerHTML = html;
    document.getElementById('fame-panel').classList.add('show');
    checkV10Achievements();
}

function showOpinion() {
    playV10SFX('opinion_poll');
    v10Features.add('opinion');
    var scores = getOpinionScores();
    var avgScore = Math.round(scores.reduce(function(s, c) { return s + c.score; }, 0) / scores.length);

    var html = '<div style="text-align:center;font-size:15px;margin-bottom:14px;"><span style="color:#66ccdd;font-weight:bold;">종합 만족도: ' + avgScore + '/100</span></div>';
    scores.forEach(function(cat) {
        var scoreColor = cat.score >= 80 ? '#4caf50' : cat.score >= 60 ? '#ffaa00' : cat.score >= 40 ? '#ff8800' : '#f44336';
        html += '<div class="opin-cat"><div class="oc-header"><span class="oc-name">' + cat.icon + ' ' + cat.name + '</span><span class="oc-score" style="color:' + scoreColor + '">' + cat.score + '/100</span></div><div class="oc-bar"><div class="oc-bar-fill" style="width:' + cat.score + '%;background:' + cat.color + '"></div></div><div class="oc-tip">' + cat.tip + '</div></div>';
    });
    document.getElementById('opinion-content').innerHTML = html;
    document.getElementById('opinion-panel').classList.add('show');
    checkV10Achievements();
}

// ===================== ACTIONS =====================
window.v10BuildMil = function(unitId) {
    var unit = MILITARY_UNITS.find(function(u) { return u.id === unitId; });
    if(!unit || milBuilt[unitId]) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < unit.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + unit.cost + '금 필요)');
        return;
    }
    window.resources.gold -= unit.cost;
    milBuilt[unitId] = true;
    calcMilDefense();
    playV10SFX('battle_clash');
    if(typeof toast === 'function') toast('⚔️ ' + unit.name + ' 배치 완료! (방어+' + unit.defense + ')');
    showMilitary();
    saveV10State();
    checkV10Achievements();
};

window.v10UnlockAgri = function(techId) {
    var tech = AGRI_TECHS.find(function(t) { return t.id === techId; });
    if(!tech || agriUnlocked[techId]) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < tech.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + tech.cost + '금 필요)');
        return;
    }
    window.resources.gold -= tech.cost;
    agriUnlocked[techId] = true;
    calcAgriFoodMult();
    playV10SFX('tech_unlock');
    if(typeof toast === 'function') toast('🌾 ' + tech.name + ' 개발 완료! (식량 +' + Math.round(tech.foodBonus*100) + '%)');
    showAgriculture();
    saveV10State();
    checkV10Achievements();
};

window.v10DiploGift = function(nationId) {
    var nation = DIPLO_NATIONS.find(function(n) { return n.id === nationId; });
    if(!nation) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < nation.giftCost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + nation.giftCost + '금 필요)');
        return;
    }
    window.resources.gold -= nation.giftCost;
    diploRelations[nationId] = Math.min(100, (diploRelations[nationId] || 0) + 15);
    playV10SFX('diplo_treaty');
    if(typeof toast === 'function') toast('🎁 ' + nation.name + '에 선물! (호감도 +15)');
    showDiplomacy();
    saveV10State();
    checkV10Achievements();
};

window.v10DiploTreaty = function(nationId) {
    var rel = diploRelations[nationId] || 0;
    if(rel < 60) {
        if(typeof toast === 'function') toast('호감도 60 이상이어야 조약 가능합니다.');
        return;
    }
    var nation = DIPLO_NATIONS.find(function(n) { return n.id === nationId; });
    if(!nation) return;
    diploRelations[nationId] = Math.min(100, rel + 10);
    var bonus = nation.treatyBonus;
    if(bonus.gold && typeof window.resources !== 'undefined') window.resources.gold += bonus.gold * 5;
    if(bonus.culture && typeof window.resources !== 'undefined') window.resources.culture += bonus.culture * 3;
    if(bonus.food && typeof window.resources !== 'undefined') window.resources.food += bonus.food * 5;
    if(bonus.pop && typeof window.resources !== 'undefined') window.resources.pop += bonus.pop * 3;
    playV10SFX('diplo_treaty');
    if(typeof toast === 'function') toast('📜 ' + nation.name + '과 조약 체결! 보너스 획득!');
    showDiplomacy();
    saveV10State();
    checkV10Achievements();
};

window.v10BuildInfra = function(facilityId) {
    var f = INFRA_FACILITIES.find(function(f) { return f.id === facilityId; });
    if(!f || infraBuilt[facilityId]) return;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < f.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + f.cost + '금 필요)');
        return;
    }
    window.resources.gold -= f.cost;
    infraBuilt[facilityId] = true;
    playV10SFX('infra_build');
    if(typeof toast === 'function') toast('🏗️ ' + f.name + ' 건설 완료!');
    showInfra();
    saveV10State();
    checkV10Achievements();
};

window.v10SummonHero = function(heroId) {
    if(heroSummoned[heroId]) return;
    var hero = FAME_HEROES.find(function(h) { return h.id === heroId; });
    if(!hero) return;
    var cost = 100 + hero.minEra * 50;
    var gold = (typeof window.resources !== 'undefined') ? (window.resources.gold || 0) : 0;
    if(gold < cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (' + cost + '금 필요)');
        return;
    }
    window.resources.gold -= cost;
    heroSummoned[heroId] = true;
    playV10SFX('hero_summon');
    if(typeof toast === 'function') toast('👑 ' + hero.name + ' 소환! ' + hero.buff);
    showFame();
    saveV10State();
    checkV10Achievements();
};

// ===================== ACHIEVEMENTS =====================
function checkV10Achievements() {
    if(typeof window.achievements === 'undefined') {
        if(typeof window.unlockedAchievements !== 'undefined') {
            window.achievements = {};
            window.unlockedAchievements.forEach(function(id) { window.achievements[id] = true; });
        } else {
            window.achievements = {};
        }
    }

    V10_ACHIEVEMENTS.forEach(function(ach) {
        if(window.achievements[ach.id]) return;
        var unlocked = false;
        var milCount = 0, agriCount = 0, friendlyCount = 0, infraCount = 0, heroCount = 0;
        MILITARY_UNITS.forEach(function(u) { if(milBuilt[u.id]) milCount++; });
        AGRI_TECHS.forEach(function(t) { if(agriUnlocked[t.id]) agriCount++; });
        DIPLO_NATIONS.forEach(function(n) { if((diploRelations[n.id] || 0) >= 60) friendlyCount++; });
        INFRA_FACILITIES.forEach(function(f) { if(infraBuilt[f.id]) infraCount++; });
        FAME_HEROES.forEach(function(h) { if(heroSummoned[h.id]) heroCount++; });

        switch(ach.id) {
            case 'v10_mil_5': unlocked = milCount >= 5; break;
            case 'v10_mil_all': unlocked = milCount >= MILITARY_UNITS.length; break;
            case 'v10_agri_5': unlocked = agriCount >= 5; break;
            case 'v10_agri_all': unlocked = agriCount >= AGRI_TECHS.length; break;
            case 'v10_diplo_3': unlocked = friendlyCount >= 3; break;
            case 'v10_infra_all': unlocked = infraCount >= INFRA_FACILITIES.length; break;
            case 'v10_hero_5': unlocked = heroCount >= 5; break;
            case 'v10_hero_all': unlocked = heroCount >= FAME_HEROES.length; break;
            case 'v10_opinion_80':
                var scores = getOpinionScores();
                unlocked = scores.every(function(s) { return s.score >= 80; });
                break;
            case 'v10_quiz_100': unlocked = (typeof window.quizScore !== 'undefined' && window.quizScore >= 100) || (typeof window.totalQuizCorrect !== 'undefined' && window.totalQuizCorrect >= 100); break;
            case 'v10_timeline': unlocked = v10TimelineViewed; break;
            case 'v10_explorer': unlocked = v10Features.size >= 7; break;
        }
        if(unlocked) {
            window.achievements[ach.id] = true;
            if(typeof window.unlockedAchievements !== 'undefined' && typeof window.unlockedAchievements.add === 'function') {
                window.unlockedAchievements.add(ach.id);
            }
            playV10SFX('v10_achieve');
            if(typeof showAchievementToast === 'function') showAchievementToast({ icon: ach.icon, title: ach.title, desc: ach.desc });
            try { localStorage.setItem('cityAchievements_v10', JSON.stringify(window.achievements)); } catch(e){}
        }
    });
}

// ===================== HOOKS =====================
function hookV10Quiz() {
    if(typeof window.QUIZ_QUESTIONS === 'undefined') return;
    V10_QUIZ.forEach(function(q) {
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

function hookV10Achievements() {
    var prev = window.showAchievements;
    if(!prev) return;
    window.showAchievements = function() {
        V10_ACHIEVEMENTS.forEach(function(ach) {
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

function hookV10CheckAchievements() {
    var prev = window.checkAchievements;
    if(!prev) return;
    window.checkAchievements = function() {
        prev();
        checkV10Achievements();
    };
}

function hookV10AdvisorTips() {
    var tips = [
        '💡 군사 시설을 건설하면 도시 방어력이 올라가 재해 피해가 줄어듭니다!',
        '💡 농업 기술을 개발하면 식량 생산 배율이 올라갑니다.',
        '💡 외교에서 선물을 보내 호감도를 올리고 조약을 맺으세요!',
        '💡 인프라 시설은 인구 한계를 확장해줍니다.',
        '💡 명예의 전당에서 역사 위인을 소환하면 영구 버프를 받아요!',
        '💡 여론조사에서 약한 분야를 파악하고 개선하세요.',
        '💡 타임라인에서 한국사 5천년의 흐름을 한눈에 볼 수 있어요.',
        '💡 3개국 이상과 우호 관계를 맺으면 외교관 업적을 얻을 수 있어요.',
        '💡 모든 농업 기술을 개발하면 식량 배율이 크게 올라갑니다.',
        '💡 장군관을 건설하면 전체 군사 효율이 20% 올라가요.'
    ];
    if(typeof window.V5_ADVISOR_TIPS !== 'undefined') {
        tips.forEach(function(t) {
            if(window.V5_ADVISOR_TIPS.indexOf(t) === -1) window.V5_ADVISOR_TIPS.push(t);
        });
    }
}

function hookV10AutoSave() {
    var prev = window.autoSave;
    if(!prev) return;
    window.autoSave = function() {
        prev();
        saveV10State();
    };
}

function hookV10Keyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return;
        var v10panels = ['mil-panel','agri-panel','diplo-panel','infra-panel','timeline-panel','fame-panel','opinion-panel'];
        var anyOpen = v10panels.some(function(pid) {
            var el = document.getElementById(pid);
            return el && el.classList.contains('show');
        });
        if(anyOpen) {
            if(e.key === 'Escape') {
                v10panels.forEach(function(pid) {
                    var el = document.getElementById(pid);
                    if(el) el.classList.remove('show');
                });
            }
            return;
        }
        if(!e.shiftKey) return;
        switch(e.key) {
            case 'M': showMilitary(); e.preventDefault(); break;
            case 'A': showAgriculture(); e.preventDefault(); break;
            case 'D': showDiplomacy(); e.preventDefault(); break;
            case 'I': showInfra(); e.preventDefault(); break;
            case 'T': showTimeline(); e.preventDefault(); break;
            case 'F': showFame(); e.preventDefault(); break;
            case 'O': showOpinion(); e.preventDefault(); break;
            case 'L': break;
        }
    });
}

function hookV10GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    var v10TickCount = 0;
    window.gameTick = function() {
        prevTick();
        v10TickCount++;
        if(v10TickCount % 10 === 0) {
            DIPLO_NATIONS.forEach(function(n) {
                var drift = (Math.random() - 0.5) * 3;
                diploRelations[n.id] = Math.max(0, Math.min(100, (diploRelations[n.id] || 50) + drift));
            });
        }
    };
}

// ===================== SAVE/LOAD =====================
function saveV10State() {
    try {
        var state = {
            mil: milBuilt,
            agri: agriUnlocked,
            diplo: diploRelations,
            infra: infraBuilt,
            hero: heroSummoned,
            features: Array.from(v10Features),
            timeline: v10TimelineViewed
        };
        localStorage.setItem('cityV10State', JSON.stringify(state));
    } catch(e) {}
}

function loadV10State() {
    try {
        var raw = localStorage.getItem('cityV10State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.mil) { for(var k in state.mil) milBuilt[k] = state.mil[k]; }
        if(state.agri) { for(var k2 in state.agri) agriUnlocked[k2] = state.agri[k2]; }
        if(state.diplo) { for(var k3 in state.diplo) diploRelations[k3] = state.diplo[k3]; }
        if(state.infra) { for(var k4 in state.infra) infraBuilt[k4] = state.infra[k4]; }
        if(state.hero) { for(var k5 in state.hero) heroSummoned[k5] = state.hero[k5]; }
        if(state.features) v10Features = new Set(state.features);
        if(state.timeline) v10TimelineViewed = state.timeline;
        calcMilDefense();
        calcAgriFoodMult();
    } catch(e) {}
}

// ===================== INIT =====================
function initV10() {
    initV10State();
    loadV10State();
    addV10UI();
    hookV10GameTick();
    hookV10Quiz();
    hookV10Achievements();
    hookV10CheckAchievements();
    hookV10AdvisorTips();
    hookV10AutoSave();
    hookV10Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('⚔️ v10.0: 군사+농업혁명+외교+인프라+타임라인+명예의전당+여론!');
        }, 7000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV10, 2000); });
} else {
    setTimeout(initV10, 2000);
}

})();
