// =====================================================================
// city-builder v11_patch.js — PRIME Holdings NEXTERA+PRISM v11.0
// Self-contained IIFE patch: Laws/Edicts 10, City Analytics Canvas,
// Weather System 8 types, Architecture Gallery 12 styles,
// Era Victory Conditions 5x3, City Reputation vs AI 5 cities,
// Citizen Stories 10, Zoning Districts 4,
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
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'law_enact':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'law_repeal':
            o = ctx.createOscillator(); o.type='sawtooth';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(220, now+0.25);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'analytics_open':
            [880,1047,1319].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.07, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.2);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.2);
            });
            break;
        case 'weather_change':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(600, now);
            o.frequency.linearRampToValueAtTime(300, now+0.3);
            o.frequency.linearRampToValueAtTime(500, now+0.5);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.55);
            o.connect(g); o.start(now); o.stop(now+0.5);
            break;
        case 'arch_discover':
            [659,784,988].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'victory_check':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(523, now);
            o.frequency.setValueAtTime(659, now+0.1);
            o.frequency.setValueAtTime(784, now+0.2);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.35);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'victory_complete':
            [523,659,784,1047,1319].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.3);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.3);
            });
            break;
        case 'reputation_up':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(880, now+0.2);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'citizen_story':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(392, now);
            o.frequency.setValueAtTime(494, now+0.15);
            g.gain.setValueAtTime(0.07, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'zone_set':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(550, now+0.15);
            g.gain.setValueAtTime(0.07, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'v11_achieve':
            [1047,1175,1319,1568,1760].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.05);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.05);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.05+0.15);
                oo.connect(gg); oo.start(now+i*0.05); oo.stop(now+i*0.05+0.15);
            });
            break;
        case 'quiz_v11':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(784, now);
            o.frequency.setValueAtTime(988, now+0.08);
            o.frequency.setValueAtTime(784, now+0.16);
            g.gain.setValueAtTime(0.07, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
    }
}

// ===================== CSS =====================
var V11_CSS = '\
.v11-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.92); z-index: 200;\
    justify-content: center; align-items: center; padding: 16px;\
}\
.v11-panel.show { display: flex; }\
.v11-box {\
    border-radius: 16px; padding: 22px; max-width: 540px; width: 100%;\
    max-height: 85vh; overflow-y: auto;\
}\
.v11-box h2 { text-align: center; margin-bottom: 12px; font-size: 18px; }\
.v11-close {\
    display: block; margin: 16px auto 0; border: none;\
    color: #fff; padding: 8px 24px; border-radius: 20px; font-size: 14px;\
    cursor: pointer; font-weight: bold;\
}\
.v11-close:hover { filter: brightness(1.2); }\
.v11-card {\
    padding: 12px; margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);\
    transition: all 0.2s;\
}\
.v11-card:hover { background: rgba(255,255,255,0.07); }\
.v11-card .vc-head { display: flex; align-items: center; gap: 10px; }\
.v11-card .vc-icon { font-size: 24px; }\
.v11-card .vc-info { flex: 1; }\
.v11-card .vc-name { font-weight: bold; font-size: 13px; }\
.v11-card .vc-desc { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.v11-card .vc-act button {\
    border: none; color: #fff; padding: 5px 12px;\
    border-radius: 8px; font-size: 11px; cursor: pointer; margin-left: 4px;\
}\
.v11-card .vc-act button:disabled { background: #555; cursor: not-allowed; color: #999; }\
.v11-card .vc-effect { font-size: 10px; margin-top: 4px; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.03); }\
#law-panel .v11-box { background: linear-gradient(145deg, #1a1a30, #0e0e20); border: 2px solid #6655cc; }\
#law-panel h2 { color: #9988ff; }\
#law-panel .v11-close { background: #6655cc; }\
#law-panel .vc-name { color: #bbaaff; }\
#law-panel .vc-act button { background: #6655cc; }\
#law-panel .vc-act button:hover { background: #7766dd; }\
.law-enacted { border-color: rgba(102,85,204,0.5) !important; background: rgba(102,85,204,0.1) !important; }\
.law-enacted .vc-name::after { content: " ✅"; }\
#analytics-panel .v11-box { background: linear-gradient(145deg, #0a1a2a, #061018); border: 2px solid #2288bb; }\
#analytics-panel h2 { color: #44bbee; }\
#analytics-panel .v11-close { background: #2288bb; }\
#analytics-canvas { width: 100%; height: 300px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 10px; }\
.analytics-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; }\
.analytics-stat { text-align: center; padding: 8px; border-radius: 10px; background: rgba(255,255,255,0.04); }\
.analytics-stat .as-val { font-size: 18px; font-weight: bold; color: #44bbee; }\
.analytics-stat .as-label { font-size: 10px; color: #888; margin-top: 2px; }\
#weather-panel .v11-box { background: linear-gradient(145deg, #151a28, #0a0e18); border: 2px solid #5588aa; }\
#weather-panel h2 { color: #77bbdd; }\
#weather-panel .v11-close { background: #5588aa; }\
#weather-canvas { width: 100%; height: 200px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 10px; }\
.weather-current { text-align: center; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.05); margin-bottom: 10px; }\
.weather-current .wc-icon { font-size: 48px; }\
.weather-current .wc-name { font-size: 16px; font-weight: bold; margin-top: 4px; }\
.weather-current .wc-effect { font-size: 12px; color: #aaa; margin-top: 4px; }\
.weather-forecast { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }\
.weather-day { flex-shrink: 0; text-align: center; padding: 8px; border-radius: 10px; background: rgba(255,255,255,0.04); min-width: 60px; }\
.weather-day .wd-icon { font-size: 20px; }\
.weather-day .wd-name { font-size: 9px; color: #aaa; margin-top: 2px; }\
.weather-day.active { border: 1px solid #77bbdd; background: rgba(119,187,221,0.1); }\
#arch-panel .v11-box { background: linear-gradient(145deg, #2a1a10, #1a0e08); border: 2px solid #cc8844; }\
#arch-panel h2 { color: #ffaa66; }\
#arch-panel .v11-close { background: #cc8844; }\
.arch-style { display: flex; align-items: flex-start; gap: 12px; padding: 12px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(204,136,68,0.15); }\
.arch-style .as-icon { font-size: 32px; flex-shrink: 0; }\
.arch-style .as-info { flex: 1; }\
.arch-style .as-name { font-weight: bold; color: #ffaa66; font-size: 13px; }\
.arch-style .as-era { font-size: 10px; color: #cc8844; }\
.arch-style .as-desc { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }\
.arch-style .as-features { font-size: 10px; color: #cc9966; margin-top: 4px; }\
.arch-style.discovered { border-color: rgba(204,136,68,0.4); background: rgba(204,136,68,0.08); }\
#victory-panel .v11-box { background: linear-gradient(145deg, #1a2a15, #0e1a08); border: 2px solid #55aa33; }\
#victory-panel h2 { color: #88dd55; }\
#victory-panel .v11-close { background: #55aa33; }\
.victory-era { margin-bottom: 14px; }\
.victory-era-title { font-size: 14px; font-weight: bold; color: #ffd700; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,215,0,0.2); }\
.victory-goal { display: flex; align-items: center; gap: 10px; padding: 8px; margin-bottom: 4px; border-radius: 8px; background: rgba(255,255,255,0.03); }\
.victory-goal .vg-check { font-size: 18px; }\
.victory-goal .vg-info { flex: 1; }\
.victory-goal .vg-title { font-size: 12px; font-weight: bold; color: #88dd55; }\
.victory-goal .vg-desc { font-size: 10px; color: #aaa; }\
.victory-goal .vg-bar { height: 5px; background: #333; border-radius: 3px; margin-top: 4px; overflow: hidden; }\
.victory-goal .vg-bar-fill { height: 100%; background: linear-gradient(90deg, #55aa33, #88dd55); border-radius: 3px; transition: width 0.5s; }\
.victory-goal.completed { background: rgba(85,170,51,0.1); }\
.victory-goal.completed .vg-title { color: #bbff88; }\
#reputation-panel .v11-box { background: linear-gradient(145deg, #2a2015, #1a1508); border: 2px solid #bb8833; }\
#reputation-panel h2 { color: #ddaa55; }\
#reputation-panel .v11-close { background: #bb8833; }\
#reputation-canvas { width: 100%; height: 220px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 10px; }\
.rep-city { display: flex; align-items: center; gap: 10px; padding: 10px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.04); }\
.rep-city .rc-rank { font-size: 18px; font-weight: bold; color: #ddaa55; min-width: 28px; }\
.rep-city .rc-info { flex: 1; }\
.rep-city .rc-name { font-weight: bold; font-size: 13px; }\
.rep-city .rc-score { font-size: 11px; color: #aaa; }\
.rep-city .rc-bar { height: 6px; background: #333; border-radius: 3px; margin-top: 4px; overflow: hidden; }\
.rep-city .rc-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }\
.rep-city.player { border: 1px solid #ddaa55; background: rgba(221,170,85,0.08); }\
#citizen-panel .v11-box { background: linear-gradient(145deg, #1a2020, #0e1414); border: 2px solid #44aa88; }\
#citizen-panel h2 { color: #66ddaa; }\
#citizen-panel .v11-close { background: #44aa88; }\
.citizen-card { padding: 12px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(68,170,136,0.15); }\
.citizen-card .cc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }\
.citizen-card .cc-avatar { font-size: 28px; }\
.citizen-card .cc-name { font-weight: bold; color: #66ddaa; font-size: 13px; }\
.citizen-card .cc-role { font-size: 10px; color: #44aa88; }\
.citizen-card .cc-diary { font-size: 11px; color: #bbb; line-height: 1.6; padding: 8px; border-radius: 8px; background: rgba(255,255,255,0.03); border-left: 3px solid #44aa88; }\
.citizen-card .cc-mood { display: flex; gap: 8px; margin-top: 6px; }\
.citizen-card .cc-mood span { font-size: 10px; padding: 2px 8px; border-radius: 10px; background: rgba(255,255,255,0.05); }\
#zone-panel .v11-box { background: linear-gradient(145deg, #1a1520, #0e0a14); border: 2px solid #aa55cc; }\
#zone-panel h2 { color: #cc88ee; }\
#zone-panel .v11-close { background: #aa55cc; }\
.zone-type { display: flex; align-items: center; gap: 12px; padding: 14px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(170,85,204,0.15); cursor: pointer; }\
.zone-type:hover { background: rgba(170,85,204,0.1); }\
.zone-type.active { border-color: rgba(170,85,204,0.5); background: rgba(170,85,204,0.12); }\
.zone-type .zt-icon { font-size: 28px; }\
.zone-type .zt-info { flex: 1; }\
.zone-type .zt-name { font-weight: bold; color: #cc88ee; font-size: 14px; }\
.zone-type .zt-desc { font-size: 11px; color: #aaa; margin-top: 3px; }\
.zone-type .zt-count { font-size: 12px; color: #cc88ee; font-weight: bold; }\
.zone-type .zt-bonus { font-size: 10px; color: #aa88cc; margin-top: 4px; }\
#zone-canvas { width: 100%; height: 200px; border-radius: 10px; background: rgba(0,0,0,0.3); margin-bottom: 10px; }\
@media (max-width: 600px) {\
    .v11-left-btns { display: none !important; }\
    .analytics-stats { grid-template-columns: repeat(2, 1fr); }\
}\
';

// ===================== DATA =====================

var LAWS = [
    { id: 'land_equal', icon: '🏠', name: '토지균등법', desc: '모든 백성에게 토지를 공평하게 분배합니다.', effect: '식량 +10%, 행복 +8, 금 -3/틱', cost: 100, foodMult: 0.10, happyAdd: 8, goldTick: -3 },
    { id: 'equal_service', icon: '⚖️', name: '균역법', desc: '군역 부담을 공평하게 조정합니다.', effect: '행복 +12, 방어력 +8, 식량 -5%', cost: 120, happyAdd: 12, defenseAdd: 8, foodMult: -0.05 },
    { id: 'daedong', icon: '📦', name: '대동법', desc: '공물을 쌌으로 통일합니다. 세금 간소화.', effect: '금 +8/틱, 행복 +5, 문화 -2/틱', cost: 150, goldTick: 8, happyAdd: 5, cultureTick: -2 },
    { id: 'gwageo', icon: '📜', name: '과거제 강화', desc: '시험으로 관리를 등용하여 능력 중심 정치.', effect: '문화 +10/틱, 인구 한계 +30, 금 -5/틱', cost: 130, cultureTick: 10, popBonus: 30, goldTick: -5 },
    { id: 'market_expand', icon: '🏪', name: '시전 확대', desc: '상점가를 확장하여 교역을 활성화합니다.', effect: '금 +12/틱, 행복 +3, 환경 -5', cost: 100, goldTick: 12, happyAdd: 3 },
    { id: 'fortress_law', icon: '🏰', name: '성고 강화령', desc: '도시 방비를 강화합니다.', effect: '방어력 +20, 금 -8/틱, 행복 -3', cost: 180, defenseAdd: 20, goldTick: -8, happyAdd: -3 },
    { id: 'slave_free', icon: '🔗', name: '천민 해방령', desc: '천민 신분을 해방하여 인구를 늘립니다.', effect: '인구 +20%, 행복 +15, 금 -10/틱', cost: 200, popMult: 0.20, happyAdd: 15, goldTick: -10 },
    { id: 'sea_ban', icon: '⛵', name: '해금 정책', desc: '해상 무역을 제한하여 외부 위협을 차단합니다.', effect: '방어력 +15, 외교 -10, 금 -5/틱', cost: 90, defenseAdd: 15, goldTick: -5 },
    { id: 'school_law', icon: '🏫', name: '학당 설립령', desc: '각 마을에 학당을 설립합니다.', effect: '문화 +15/틱, 행복 +8, 금 -6/틱', cost: 140, cultureTick: 15, happyAdd: 8, goldTick: -6 },
    { id: 'hwangok', icon: '🌾', name: '환곡제', desc: '봄에 곡식을 빌려주고 가을에 받는 제도.', effect: '식량 +15%, 행복 +5, 금 -4/틱', cost: 110, foodMult: 0.15, happyAdd: 5, goldTick: -4 }
];

var WEATHER_TYPES = [
    { id: 'clear', icon: '☀️', name: '맑음', desc: '좋은 날씨. 모든 생산 정상.', color: '#FFD700', foodEffect: 0, goldEffect: 0, happyEffect: 2 },
    { id: 'rain', icon: '🌧️', name: '비', desc: '농작물에 좋은 비. 식량 +10%.', color: '#4488CC', foodEffect: 10, goldEffect: -2, happyEffect: -3 },
    { id: 'snow', icon: '❄️', name: '눈', desc: '한겨울 눈. 금 -5, 행복 -5.', color: '#AADDFF', foodEffect: -5, goldEffect: -5, happyEffect: -5 },
    { id: 'fog', icon: '🌫️', name: '안개', desc: '짓은 안개. 방어력 -10.', color: '#888888', foodEffect: -2, goldEffect: 0, happyEffect: -2 },
    { id: 'drought', icon: '🌵', name: '가뮄', desc: '심한 가뮄. 식량 -15%.', color: '#CC6633', foodEffect: -15, goldEffect: 0, happyEffect: -8 },
    { id: 'storm', icon: '⛈️', name: '폭풍', desc: '거친 폭풍. 건물 피해 위험.', color: '#445566', foodEffect: -10, goldEffect: -8, happyEffect: -10 },
    { id: 'cherry', icon: '🌸', name: '벚꽃', desc: '아름다운 벚꽃. 문화 +10, 행복 +10.', color: '#FFB0C0', foodEffect: 0, goldEffect: 0, happyEffect: 10, cultureEffect: 10 },
    { id: 'autumn_leaves', icon: '🍁', name: '단풍', desc: '붉은 단풍. 식량 +10%, 행복 +5.', color: '#DD6622', foodEffect: 10, goldEffect: 0, happyEffect: 5 }
];

var ARCH_STYLES = [
    { id: 'choga', icon: '🏡', name: '초가집', era: '선사시대~조선', desc: '벼나 갈대로 지붕을 엇은 서민의 집. 한국 전통 주거의 기본.', features: '구들장, 마루, 부엌, 창호지' },
    { id: 'giwa', icon: '🏯', name: '기와집', era: '삼국~조선', desc: '기와로 지붕을 엇은 양반 가옥. 권위와 부의 상징.', features: '기와지붕, 대청마루, 사랑채, 안채' },
    { id: 'seongkwak', icon: '🏰', name: '성고', era: '고구려~조선', desc: '도시를 방어하는 돌로 쌓은 성벽. 한국 축성술의 정수.', features: '치성, 성문, 치, 여장, 보수대' },
    { id: 'tap', icon: '🗼', name: '석탑/전탑', era: '삼국~고려', desc: '불교 사리이나 경전을 보관하는 탑. 한국 석조 건축의 걸작.', features: '다층구조, 기단, 창문, 반전' },
    { id: 'jeongja', icon: '🏛️', name: '정자', era: '고려~조선', desc: '자연 속에 짓는 팔각지붕 휴식처. 풍류 문화의 상징.', features: '팔각/육각지붕, 개방구조, 난간, 치밀어' },
    { id: 'seowon', icon: '📚', name: '서원', era: '조선', desc: '유학자를 배출하는 사설 교육기관. 자연경관과 조화.', features: '강당, 동재/서재, 사당, 정원' },
    { id: 'gungkwol', icon: '🏛️', name: '궁곰', era: '고려~조선', desc: '왕이 사는 웅장한 궁전 건축. 한국 건축의 최고봉.', features: '전전, 후전, 회랑, 담장, 전각' },
    { id: 'sachal', icon: '⛩️', name: '사찰', era: '삼국~조선', desc: '불교 수행처. 산지에 자연과 조화롭게 배치.', features: '대웅전, 탑, 일주문, 요사채, 범종' },
    { id: 'jongmyo', icon: '🙏', name: '종묘', era: '조선', desc: '왕실 조상의 위패를 모신 사당. 유교 제례 건축.', features: '정전, 영녕전, 월대, 기단, 제수' },
    { id: 'market_arch', icon: '🏪', name: '시장/점포', era: '고려~조선', desc: '물건을 사고파는 상업 건축물. 번화한 상업 문화.', features: '상포방, 점포간판, 창고, 행랑' },
    { id: 'hanok_modern', icon: '🏠', name: '근대 한옥', era: '근대', desc: '전통과 서양식이 융합된 근대 한옥.', features: '유리창, 벽돌구조, 확장처마, 발코니' },
    { id: 'western', icon: '🏛️', name: '서양식 건축', era: '근대', desc: '개항기에 유입된 서양 건축양식. 근대화의 상징.', features: '아치, 코린트식기둥, 벽돌, 발코니' }
];

var ERA_VICTORIES = [
    { era: '고조선', goals: [
        { id: 'gj_pop', title: '부족 번영', desc: '인구 200명 달성', check: function() { return typeof resources !== 'undefined' && resources.pop >= 200; }, target: 200, getCurrent: function() { return typeof resources !== 'undefined' ? resources.pop : 0; } },
        { id: 'gj_build', title: '마을 건설', desc: '건물 30개 건설', check: function() { return typeof buildCount !== 'undefined' && buildCount >= 30; }, target: 30, getCurrent: function() { return typeof buildCount !== 'undefined' ? buildCount : 0; } },
        { id: 'gj_culture', title: '고조선 문화', desc: '문화 100 달성', check: function() { return typeof resources !== 'undefined' && resources.culture >= 100; }, target: 100, getCurrent: function() { return typeof resources !== 'undefined' ? resources.culture : 0; } }
    ]},
    { era: '삼국시대', goals: [
        { id: 'sk_pop', title: '왕국 번영', desc: '인구 500명 달성', check: function() { return typeof resources !== 'undefined' && resources.pop >= 500; }, target: 500, getCurrent: function() { return typeof resources !== 'undefined' ? resources.pop : 0; } },
        { id: 'sk_gold', title: '부국강병', desc: '금 5000 보유', check: function() { return typeof resources !== 'undefined' && resources.gold >= 5000; }, target: 5000, getCurrent: function() { return typeof resources !== 'undefined' ? resources.gold : 0; } },
        { id: 'sk_mil', title: '군사 강국', desc: '군사 유닛 5종 훈련', check: function() { var c = 0; for(var k in milBuilt) if(milBuilt[k]) c++; return c >= 5; }, target: 5, getCurrent: function() { var c = 0; for(var k in milBuilt) if(milBuilt[k]) c++; return c; } }
    ]},
    { era: '고려', goals: [
        { id: 'gr_culture', title: '문화 번영', desc: '문화 500 달성', check: function() { return typeof resources !== 'undefined' && resources.culture >= 500; }, target: 500, getCurrent: function() { return typeof resources !== 'undefined' ? resources.culture : 0; } },
        { id: 'gr_diplo', title: '외교 선진국', desc: '외교관계 3국 우호 달성', check: function() { var c = 0; for(var k in diploRelations) if(diploRelations[k] >= 60) c++; return c >= 3; }, target: 3, getCurrent: function() { var c = 0; for(var k in diploRelations) if(diploRelations[k] >= 60) c++; return c; } },
        { id: 'gr_pop', title: '대도시', desc: '인구 1000명 달성', check: function() { return typeof resources !== 'undefined' && resources.pop >= 1000; }, target: 1000, getCurrent: function() { return typeof resources !== 'undefined' ? resources.pop : 0; } }
    ]},
    { era: '조선', goals: [
        { id: 'js_culture', title: '예의지국', desc: '문화 1500 달성', check: function() { return typeof resources !== 'undefined' && resources.culture >= 1500; }, target: 1500, getCurrent: function() { return typeof resources !== 'undefined' ? resources.culture : 0; } },
        { id: 'js_law', title: '법치국가', desc: '법률 5개 시행', check: function() { var c = 0; for(var k in lawEnacted) if(lawEnacted[k]) c++; return c >= 5; }, target: 5, getCurrent: function() { var c = 0; for(var k in lawEnacted) if(lawEnacted[k]) c++; return c; } },
        { id: 'js_build', title: '건축 강국', desc: '건물 100개 건설', check: function() { return typeof buildCount !== 'undefined' && buildCount >= 100; }, target: 100, getCurrent: function() { return typeof buildCount !== 'undefined' ? buildCount : 0; } }
    ]},
    { era: '근대', goals: [
        { id: 'gd_pop', title: '근대화 성공', desc: '인구 2000명 달성', check: function() { return typeof resources !== 'undefined' && resources.pop >= 2000; }, target: 2000, getCurrent: function() { return typeof resources !== 'undefined' ? resources.pop : 0; } },
        { id: 'gd_gold', title: '경제 대국', desc: '금 20000 보유', check: function() { return typeof resources !== 'undefined' && resources.gold >= 20000; }, target: 20000, getCurrent: function() { return typeof resources !== 'undefined' ? resources.gold : 0; } },
        { id: 'gd_all', title: '완전 독립', desc: '모든 시대 승리조건 달성', check: function() { return victoryCompleted >= 12; }, target: 12, getCurrent: function() { return victoryCompleted; } }
    ]}
];

var AI_CITIES = [
    { id: 'seorabeol', name: '서라벌 (신라)', color: '#E8A040', baseScore: 300, growth: 2.5 },
    { id: 'gaegyeong', name: '개경 (고려)', color: '#60A0E0', baseScore: 350, growth: 2.0 },
    { id: 'hanyang', name: '한양 (조선)', color: '#E06060', baseScore: 400, growth: 1.8 },
    { id: 'pyongyang', name: '평양 (고구려)', color: '#60C080', baseScore: 280, growth: 3.0 },
    { id: 'buyeo', name: '부여 (백제)', color: '#C080E0', baseScore: 260, growth: 2.8 }
];

var CITIZENS = [
    { id: 'farmer_kim', avatar: '👨‍🌾', name: '김동수', role: '농부', moods: ['오늘 밤새 논에 물을 대고 와서 미역삼햇은 못 했지만, 변비 찾아오는 소리를 들으니 봉이 가깜구나.', '금년 수확이 풍성하여 아이들한테 새 옷 사줄 수 있겠어. 감사한 날이야.', '마름이 계속되니 걸정이야. 하늘에 비를 빌어보네.'] },
    { id: 'merchant_park', avatar: '👩‍💼', name: '박연화', role: '상인', moods: ['오늘 베단을 펼었는데 손님이 많아서 비단이 다 팔렸어! 내일은 두 배로 준비해야지.', '요즘 외국 상인들이 자주 오네. 새로운 물건을 구해와야겠어.', '시장이 커져서 좋지만, 경쟁도 심해졌어.'] },
    { id: 'scholar_lee', avatar: '👨‍🎓', name: '이문헌', role: '유생', moods: ['오늘 배운 논어 구절이 정말 흥미롭구나. 스승님께 질문을 준비해야지.', '과거시험이 다가오니 밤을 새워 공부해야해.', '오늘 붓들과 시문 짓기를 했어. 아름다운 한 편이 나왔지!'] },
    { id: 'soldier_choi', avatar: '⚔️', name: '최무강', role: '병사', moods: ['오늘도 훈련을 마쳤다. 백성들을 지키는 게 내 임무이니까.', '성벽 위에서 내려다보니 마을이 평화롭구나. 이 평화를 지켜야지.', '적이 침입한다는 소문이 있어. 경계를 강화해야겠어.'] },
    { id: 'artisan_jung', avatar: '👩‍🎨', name: '정미영', role: '장인', moods: ['오늘 청자 화병을 묙이에 넣었어. 어떤 색이 나올지 기대돼.', '스승님이 가르쳐주신 상감기법을 드디어 성공했어!', '오늘 만든 목각인형을 아이들이 좋아해졌어.'] },
    { id: 'doctor_han', avatar: '👨‍⚕️', name: '한의원', role: '의원', moods: ['오늘 환자가 많았어. 계절변화에 감기 환자가 늘었구나.', '새로운 약초를 발견했어. 백성들의 건강에 도움이 될 거야.', '역병이 돌고 있다는 소문이... 미리 대비해야겠어.'] },
    { id: 'child_yoon', avatar: '👦', name: '윤서준', role: '어린이', moods: ['오늘 친구들과 연날리기를 날렸어! 하늘 높이 날아갔지!', '학당에서 천자문을 배우고 있어. 어려운데 재미있어!', '아버지가 시장에서 엿 사오셨어. 오늘은 좋은 날!'] },
    { id: 'elder_song', avatar: '👴', name: '송대감', role: '장로', moods: ['예전에는 이 마을이 작았는데... 많이 발전했구나. 흐뭇해.', '젠은이들이 열심히 일하는 걸 보니 희망이 보여.', '오늘 손주들에게 옛날이야기를 해줬어. 잘 들어주더구나.'] },
    { id: 'monk_won', avatar: '🧘', name: '원해스님', role: '승려', moods: ['오늘 새벽 예불을 드렸어. 마음이 평안해지는 시간이야.', '절에 불가를 느끼려 오는 사람들이 많아졌어.', '오늘 학당에서 아이들에게 글을 가르쳤어.'] },
    { id: 'queen_min', avatar: '👸', name: '민씨부인', role: '귀족', moods: ['오늘 백성들에게 음식을 나눠줬어. 많이 기빠하더구나.', '새로운 법령이 발표되었어. 백성들이 잘 따를지 걱정이야.', '오늘 정원에서 차를 마시며 모임을 했어. 평화로운 하루였어.'] }
];

var ZONE_TYPES = [
    { id: 'residential', icon: '🏠', name: '주거 구역', desc: '백성이 사는 거주 구역. 인구 보너스.', color: '#4CAF50', bonus: '인구 +15%, 행복 +5' },
    { id: 'commercial', icon: '🏪', name: '상업 구역', desc: '상점과 시장이 모인 구역. 금 보너스.', color: '#FF9800', bonus: '금 +20%, 문화 +3' },
    { id: 'cultural', icon: '🏛️', name: '문화 구역', desc: '학당, 서원, 절 등 문화시설 구역.', color: '#9C27B0', bonus: '문화 +25%, 행복 +8' },
    { id: 'military', icon: '🏰', name: '군사 구역', desc: '병영과 방어시설 구역.', color: '#F44336', bonus: '방어력 +30%, 행복 -3' }
];

var V11_QUIZ = [
    { q: '대동법은 공물을 무엇으로 통일했나요?', opts: ['쇼', '비단', '필', '철'], ans: 0, era: '조선',
      explain: '대동법은 공물을 쌌으로 통일하여 백성의 부담을 줄인 혁신적인 세금 제도예요.' },
    { q: '균역법을 실시한 왕은?', opts: ['영조', '정조', '세종', '성종'], ans: 0, era: '조선',
      explain: '영조가 균역법을 실시하여 군포 대신 군포세를 내게 하여 백성 부담을 줄였어요.' },
    { q: '한옥에서 &quot;대청&quot;은 어떤 용도인가요?', opts: ['요리하는 곳', '가족이 모이는 거실', '창고', '화장실'], ans: 1, era: '조선',
      explain: '대청마루는 한옥의 중심 공간으로, 가족이 모여 생활하는 넓은 마루방이에요.' },
    { q: '경복궁의 정문은?', opts: ['인정문', '광화문', '흥례문', '홍화문'], ans: 1, era: '조선',
      explain: '광화문은 경복궁의 정문으로, &quot;빛으로 교화하다&quot;라는 뜻이에요.' },
    { q: '조선시대 주요 세금이 아닌 것은?', opts: ['전세', '공물', '군포', '상업세'], ans: 3, era: '조선',
      explain: '조선시대 주요 세금은 전세(토지세), 공물(특산물), 군포(군역대납금)이었어요.' },
    { q: '고려청자의 비색을 만드는 재료는?', opts: ['철', '구리', '유약', '코발트'], ans: 2, era: '고려',
      explain: '고려청자의 아름다운 비색은 유약을 사용하여 만든 고려만의 독특한 기술이에요.' },
    { q: '수원화성을 설계한 사람은?', opts: ['이순신', '세종대왕', '정약용', '장영실'], ans: 2, era: '조선',
      explain: '정약용은 수원화성 축성을 설계하고, 거중기를 발명하여 건설에 활용했어요.' },
    { q: '한국 전통 난방 시스템은?', opts: ['난로', '구들장', '벽난로', '페치카'], ans: 1, era: '고조선',
      explain: '구들장은 바닥 밑으로 뜨거운 공기가 지나가며 방을 데우는 한국 고유의 난방 방식이에요.' },
    { q: '백제의 수도가 아닌 곳은?', opts: ['위례성', '웅진', '사비성', '개경'], ans: 3, era: '삼국시대',
      explain: '백제 수도는 위례성(한성)→웅진(공주)→사비성(부여)이었어요. 개경은 고려의 수도예요.' },
    { q: '조선 성균관의 학생은 몇 명이었나요?', opts: ['100명', '200명', '300명', '500명'], ans: 1, era: '조선',
      explain: '성균관은 대학(성균관)에 200명의 유생이 공부했어요.' },
    { q: '고려의 국제 무역항은?', opts: ['부산항', '벽란도', '인천항', '목포'], ans: 1, era: '고려',
      explain: '벽란도는 고려의 국제 무역항으로 아라비아 상인들도 오갔어요!' },
    { q: '조선의 신분제에서 가장 높은 계급은?', opts: ['양반', '상민', '중인', '왕족'], ans: 3, era: '조선',
      explain: '조선 신분제는 왕족-양반-중인-상민-천민 순으로 나뉘어져 있었어요.' },
    { q: '&quot;배산임수&quot;는 무엇을 뜻하나요?', opts: ['산을 등지는 것', '물가에 집을 짓는 것', '뒤는 산, 앞은 물', '석탑을 세우는 것'], ans: 2, era: '고조선',
      explain: '배산임수는 뒤에는 산을, 앞에는 물을 두고 집을 짓는 한국 전통 풍수 원리예요.' },
    { q: '고구려 미천왕의 업적이 아닌 것은?', opts: ['중국 리어동반도 지배', '남좍으로 한강 이남 백제 정복', '한글 창제', '신라 영토 공격'], ans: 2, era: '삼국시대',
      explain: '미천왕은 리어동반도 지배, 백제 정복, 신라 공격 등 활발한 정복활동을 했어요. 한글은 세종대왕이 만들었어요!' },
    { q: '한국 전통 시장에서 5일마다 열리는 시장은?', opts: ['상설시장', '장날시장', '야시장', '주말시장'], ans: 1, era: '조선',
      explain: '조선시대 장날시장은 5일마다 열렸어요. 1일과 6일, 2일과 7일 식으로 돌아가며 열렸죠!' }
];

var V11_ACHIEVEMENTS = [
    { id: 'v11_law_first', icon: '⚖️', title: '입법자', desc: '첫 번째 법률을 제정했어요!', check: function() { var c = 0; for(var k in lawEnacted) if(lawEnacted[k]) c++; return c >= 1; } },
    { id: 'v11_law_master', icon: '📜', title: '법치국가', desc: '법률 5개 이상 제정!', check: function() { var c = 0; for(var k in lawEnacted) if(lawEnacted[k]) c++; return c >= 5; } },
    { id: 'v11_analytics', icon: '📊', title: '데이터 분석가', desc: '도시 통계를 확인했어요!', check: function() { return v11Features.has('analytics'); } },
    { id: 'v11_weather', icon: '🌤️', title: '기상 관측관', desc: '날씨 시스템을 확인했어요!', check: function() { return v11Features.has('weather'); } },
    { id: 'v11_arch', icon: '🏛️', title: '건축 학자', desc: '건축 양식 6종 이상 발견!', check: function() { return archDiscovered.size >= 6; } },
    { id: 'v11_arch_master', icon: '🏛️', title: '건축 대가', desc: '모든 건축 양식 발견!', check: function() { return archDiscovered.size >= 12; } },
    { id: 'v11_victory', icon: '🏆', title: '첫 승리', desc: '시대별 승리조건 1개 달성!', check: function() { return victoryCompleted >= 1; } },
    { id: 'v11_victory_all', icon: '👑', title: '완전 승리', desc: '모든 승리조건 달성!', check: function() { return victoryCompleted >= 15; } },
    { id: 'v11_reputation', icon: '🌟', title: '명성 1위', desc: '도시 명성 순위 1위 달성!', check: function() { return playerRepRank <= 1; } },
    { id: 'v11_citizen', icon: '👥', title: '백성의 소리', desc: '주민 스토리를 확인했어요!', check: function() { return v11Features.has('citizen'); } },
    { id: 'v11_zone', icon: '🗺️', title: '도시 계획가', desc: '구역을 설정했어요!', check: function() { var c = 0; for(var k in zoneActive) if(zoneActive[k]) c++; return c >= 1; } },
    { id: 'v11_explorer', icon: '🚀', title: 'v11 탐험가', desc: 'v11의 모든 기능을 탐험했어요!', check: function() { return v11Features.size >= 8; } }
];

// ===================== STATE =====================
var lawEnacted = {};
var currentWeather = WEATHER_TYPES[0];
var weatherForecast = [];
var archDiscovered = new Set();
var victoryCompleted = 0;
var aiCityScores = {};
var playerRepRank = 6;
var zoneActive = {};
var v11Features = new Set();
var v11TickCount = 0;

// ===================== FUNCTIONS =====================

function showLaws() {
    playV11SFX('law_enact');
    v11Features.add('law');
    var html = '<h2>⚖️ 법률/칙령 제도</h2>';
    html += '<div style="text-align:center;font-size:12px;color:#aaa;margin-bottom:12px;">법률을 제정하여 도시에 효과를 줄 수 있어요</div>';
    LAWS.forEach(function(law) {
        var enacted = lawEnacted[law.id];
        html += '<div class="v11-card ' + (enacted ? 'law-enacted' : '') + '">';
        html += '<div class="vc-head"><span class="vc-icon">' + law.icon + '</span>';
        html += '<div class="vc-info"><div class="vc-name">' + law.name + '</div>';
        html += '<div class="vc-desc">' + law.desc + '</div></div>';
        html += '<div class="vc-act">';
        if(enacted) {
            html += '<button onclick="repealLaw(\'' + law.id + '\')" style="background:#993333;">폐지</button>';
        } else {
            html += '<button onclick="enactLaw(\'' + law.id + '\')" style="background:#6655cc;"' + (typeof resources !== 'undefined' && resources.gold < law.cost ? ' disabled' : '') + '>제정 (' + law.cost + '금)</button>';
        }
        html += '</div></div>';
        html += '<div class="vc-effect" style="color:#bbaaff;">효과: ' + law.effect + '</div>';
        html += '</div>';
    });
    html += '<button class="v11-close" onclick="closeLawPanel()">닫기</button>';
    document.getElementById('law-box').innerHTML = html;
    document.getElementById('law-panel').classList.add('show');
    saveV11State();
}

function enactLaw(id) {
    var law = LAWS.find(function(l) { return l.id === id; });
    if(!law || lawEnacted[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < law.cost) { if(typeof toast === 'function') toast('금이 부족해요!'); return; }
    if(typeof resources !== 'undefined') resources.gold -= law.cost;
    lawEnacted[id] = true;
    playV11SFX('law_enact');
    if(typeof toast === 'function') toast('⚖️ ' + law.name + ' 제정!');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof addChronicle === 'function') addChronicle('⚖️', law.name + ' 법률 제정');
    showLaws();
    checkV11Achievements();
}
window.enactLaw = enactLaw;

function repealLaw(id) {
    if(!lawEnacted[id]) return;
    lawEnacted[id] = false;
    playV11SFX('law_repeal');
    if(typeof toast === 'function') toast('❌ 법률 폐지됨');
    showLaws();
}
window.repealLaw = repealLaw;

function closeLawPanel() { document.getElementById('law-panel').classList.remove('show'); }
window.closeLawPanel = closeLawPanel;

function showAnalytics() {
    playV11SFX('analytics_open');
    v11Features.add('analytics');
    document.getElementById('analytics-panel').classList.add('show');
    setTimeout(drawAnalyticsCanvas, 100);
    saveV11State();
    checkV11Achievements();
}

function drawAnalyticsCanvas() {
    var canvas = document.getElementById('analytics-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width = canvas.offsetWidth * 2;
    var H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    var w = W / 2, h = H / 2;
    ctx.clearRect(0, 0, w, h);

    var pop = typeof resources !== 'undefined' ? Math.min(resources.pop / 2000, 1) : 0;
    var gold = typeof resources !== 'undefined' ? Math.min(resources.gold / 20000, 1) : 0;
    var food = typeof resources !== 'undefined' ? Math.min(resources.food / 500, 1) : 0;
    var culture = typeof resources !== 'undefined' ? Math.min(resources.culture / 1500, 1) : 0;
    var happy = typeof resources !== 'undefined' ? resources.happy / 100 : 0;
    var milC = 0; if(typeof milBuilt !== 'undefined') for(var k in milBuilt) if(milBuilt[k]) milC++;
    var mil = milC / 10;

    var labels = ['인구', '경제', '식량', '문화', '행복', '군사'];
    var values = [pop, gold, food, culture, happy, mil];
    var colors = ['#4CAF50', '#FF9800', '#8BC34A', '#9C27B0', '#E91E63', '#F44336'];

    var cx = w * 0.5, cy = h * 0.48;
    var maxR = Math.min(w, h) * 0.35;

    for(var ring = 5; ring >= 1; ring--) {
        var r = maxR * ring / 5;
        ctx.beginPath();
        for(var i = 0; i < 6; i++) {
            var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
            var px = cx + r * Math.cos(angle);
            var py = cy + r * Math.sin(angle);
            if(i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,' + (ring === 5 ? 0.2 : 0.08) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();

        var lx = cx + (maxR + 16) * Math.cos(angle);
        var ly = cy + (maxR + 16) * Math.sin(angle);
        ctx.fillStyle = colors[i];
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], lx, ly);
    }

    ctx.beginPath();
    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        var r = maxR * Math.max(0.05, values[i]);
        var px = cx + r * Math.cos(angle);
        var py = cy + r * Math.sin(angle);
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(68,187,238,0.2)';
    ctx.fill();
    ctx.strokeStyle = '#44BBEE';
    ctx.lineWidth = 2;
    ctx.stroke();

    for(var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 * i / 6) - Math.PI / 2;
        var r = maxR * Math.max(0.05, values[i]);
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();
    }

    var statsHtml = '';
    var statData = [
        { label: '인구', val: typeof resources !== 'undefined' ? resources.pop : 0, icon: '👥' },
        { label: '금', val: typeof resources !== 'undefined' ? resources.gold : 0, icon: '💰' },
        { label: '식량', val: typeof resources !== 'undefined' ? resources.food : 0, icon: '🌾' },
        { label: '문화', val: typeof resources !== 'undefined' ? resources.culture : 0, icon: '🏛️' },
        { label: '행복', val: typeof resources !== 'undefined' ? resources.happy : 0, icon: '😊' },
        { label: '군사', val: milC + '종', icon: '⚔️' }
    ];
    statData.forEach(function(s) {
        statsHtml += '<div class="analytics-stat"><div class="as-val">' + s.icon + ' ' + s.val + '</div><div class="as-label">' + s.label + '</div></div>';
    });
    var statsEl = document.getElementById('analytics-stats');
    if(statsEl) statsEl.innerHTML = statsHtml;
}

function closeAnalytics() { document.getElementById('analytics-panel').classList.remove('show'); }
window.closeAnalytics = closeAnalytics;

function initWeather() {
    weatherForecast = [];
    for(var i = 0; i < 7; i++) {
        var season = typeof currentSeason !== 'undefined' ? currentSeason : 0;
        var pool;
        if(season === 0) pool = [0, 1, 6, 0, 0, 1];
        else if(season === 1) pool = [0, 0, 1, 4, 0, 5];
        else if(season === 2) pool = [0, 7, 0, 3, 7, 0];
        else pool = [2, 2, 3, 0, 2, 2];
        weatherForecast.push(WEATHER_TYPES[pool[Math.floor(Math.random() * pool.length)]]);
    }
    currentWeather = weatherForecast[0];
}

function showWeather() {
    playV11SFX('weather_change');
    v11Features.add('weather');
    var html = '<h2>⛅ 날씨 시스템</h2>';
    html += '<div class="weather-current"><div class="wc-icon">' + currentWeather.icon + '</div>';
    html += '<div class="wc-name" style="color:' + currentWeather.color + ';">' + currentWeather.name + '</div>';
    html += '<div class="wc-effect">' + currentWeather.desc + '</div></div>';
    html += '<canvas id="weather-canvas"></canvas>';
    html += '<div style="font-size:12px;color:#aaa;margin-bottom:8px;">7일 예보:</div>';
    html += '<div class="weather-forecast">';
    weatherForecast.forEach(function(w, i) {
        html += '<div class="weather-day' + (i === 0 ? ' active' : '') + '"><div class="wd-icon">' + w.icon + '</div><div class="wd-name">' + w.name + '</div></div>';
    });
    html += '</div>';
    html += '<button class="v11-close" onclick="closeWeather()">닫기</button>';
    document.getElementById('weather-box').innerHTML = html;
    document.getElementById('weather-panel').classList.add('show');
    setTimeout(drawWeatherCanvas, 100);
    saveV11State();
    checkV11Achievements();
}

function drawWeatherCanvas() {
    var canvas = document.getElementById('weather-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width = canvas.offsetWidth * 2;
    var H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    var w = W / 2, h = H / 2;
    ctx.clearRect(0, 0, w, h);

    var barW = (w - 40) / 7;
    weatherForecast.forEach(function(wf, i) {
        var x = 20 + i * barW;
        var effects = [
            { label: '식량', val: wf.foodEffect, color: '#8BC34A' },
            { label: '금', val: wf.goldEffect || 0, color: '#FF9800' },
            { label: '행복', val: wf.happyEffect, color: '#E91E63' }
        ];
        effects.forEach(function(ef, j) {
            var barH = Math.abs(ef.val) * 3;
            var y = ef.val >= 0 ? h * 0.5 - barH : h * 0.5;
            ctx.fillStyle = ef.val >= 0 ? ef.color : '#555';
            ctx.globalAlpha = i === 0 ? 0.9 : 0.5;
            ctx.fillRect(x + j * (barW / 3 - 1), y, barW / 3 - 2, barH);
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#666';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(wf.icon, x + barW / 2, h - 5);
    });

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(20, h * 0.5);
    ctx.lineTo(w - 20, h * 0.5);
    ctx.stroke();
}

function closeWeather() { document.getElementById('weather-panel').classList.remove('show'); }
window.closeWeather = closeWeather;

function showArchGallery() {
    playV11SFX('arch_discover');
    v11Features.add('arch');
    var html = '<h2>🏛️ 건축 양식 도감</h2>';
    html += '<div style="text-align:center;font-size:12px;color:#aaa;margin-bottom:12px;">발견: ' + archDiscovered.size + ' / ' + ARCH_STYLES.length + '</div>';
    ARCH_STYLES.forEach(function(arch) {
        var disc = archDiscovered.has(arch.id);
        html += '<div class="arch-style' + (disc ? ' discovered' : '') + '">';
        html += '<div class="as-icon">' + (disc ? arch.icon : '❓') + '</div>';
        html += '<div class="as-info"><div class="as-name">' + (disc ? arch.name : '???') + '</div>';
        html += '<div class="as-era">' + (disc ? arch.era : '') + '</div>';
        html += '<div class="as-desc">' + (disc ? arch.desc : '건물을 건설하면 발견할 수 있어요!') + '</div>';
        if(disc) html += '<div class="as-features">특징: ' + arch.features + '</div>';
        html += '</div></div>';
    });
    html += '<button class="v11-close" onclick="closeArchGallery()">닫기</button>';
    document.getElementById('arch-box').innerHTML = html;
    document.getElementById('arch-panel').classList.add('show');
    saveV11State();
    checkV11Achievements();
}

function closeArchGallery() { document.getElementById('arch-panel').classList.remove('show'); }
window.closeArchGallery = closeArchGallery;

function discoverArch(eraIdx) {
    var eraMap = { 0: ['choga'], 1: ['giwa', 'seongkwak', 'tap', 'sachal'], 2: ['jeongja', 'gungkwol', 'market_arch'], 3: ['seowon', 'jongmyo'], 4: ['hanok_modern', 'western'] };
    var possible = eraMap[eraIdx] || [];
    possible.forEach(function(id) {
        if(!archDiscovered.has(id)) {
            archDiscovered.add(id);
            var arch = ARCH_STYLES.find(function(a) { return a.id === id; });
            if(arch && typeof toast === 'function') toast('🏛️ 건축 양식 발견: ' + arch.name);
        }
    });
    saveV11State();
}

function showVictoryConditions() {
    playV11SFX('victory_check');
    v11Features.add('victory');
    var completed = 0;
    var html = '<h2>🏆 시대별 승리 조건</h2>';
    ERA_VICTORIES.forEach(function(ev) {
        html += '<div class="victory-era"><div class="victory-era-title">' + ev.era + '</div>';
        ev.goals.forEach(function(goal) {
            var done = goal.check();
            if(done) completed++;
            var current = goal.getCurrent();
            var pct = Math.min(100, Math.round(current / goal.target * 100));
            html += '<div class="victory-goal' + (done ? ' completed' : '') + '">';
            html += '<div class="vg-check">' + (done ? '✅' : '⬜') + '</div>';
            html += '<div class="vg-info"><div class="vg-title">' + goal.title + '</div>';
            html += '<div class="vg-desc">' + goal.desc + ' (' + current + '/' + goal.target + ')</div>';
            html += '<div class="vg-bar"><div class="vg-bar-fill" style="width:' + pct + '%;"></div></div>';
            html += '</div></div>';
        });
        html += '</div>';
    });
    victoryCompleted = completed;
    html += '<div style="text-align:center;font-size:14px;color:#ffd700;margin:10px 0;">달성: ' + completed + ' / 15</div>';
    html += '<button class="v11-close" onclick="closeVictory()">닫기</button>';
    document.getElementById('victory-box').innerHTML = html;
    document.getElementById('victory-panel').classList.add('show');
    saveV11State();
    checkV11Achievements();
}

function closeVictory() { document.getElementById('victory-panel').classList.remove('show'); }
window.closeVictory = closeVictory;

function calcPlayerScore() {
    var score = 0;
    if(typeof resources !== 'undefined') {
        score += resources.pop * 2;
        score += Math.floor(resources.gold / 10);
        score += resources.culture * 3;
        score += Math.floor(resources.happy * 5);
    }
    if(typeof buildCount !== 'undefined') score += buildCount * 10;
    var milC = 0; if(typeof milBuilt !== 'undefined') for(var k in milBuilt) if(milBuilt[k]) milC++;
    score += milC * 50;
    var lawC = 0; for(var k in lawEnacted) if(lawEnacted[k]) lawC++;
    score += lawC * 30;
    return score;
}

function showReputation() {
    playV11SFX('reputation_up');
    v11Features.add('reputation');
    var playerScore = calcPlayerScore();
    var cities = AI_CITIES.map(function(c) {
        var s = aiCityScores[c.id] || c.baseScore;
        return { name: c.name, score: Math.round(s), color: c.color, isPlayer: false };
    });
    cities.push({ name: '내 도시', score: playerScore, color: '#FFD700', isPlayer: true });
    cities.sort(function(a, b) { return b.score - a.score; });
    playerRepRank = cities.findIndex(function(c) { return c.isPlayer; }) + 1;

    var maxScore = Math.max.apply(null, cities.map(function(c) { return c.score; }));

    var html = '<h2>🏅 도시 명성 랭킹</h2>';
    html += '<canvas id="reputation-canvas"></canvas>';
    cities.forEach(function(c, i) {
        var pct = maxScore > 0 ? Math.round(c.score / maxScore * 100) : 0;
        html += '<div class="rep-city' + (c.isPlayer ? ' player' : '') + '">';
        html += '<div class="rc-rank">' + (i + 1) + '</div>';
        html += '<div class="rc-info"><div class="rc-name" style="color:' + c.color + ';">' + c.name + '</div>';
        html += '<div class="rc-score">명성: ' + c.score + '점</div>';
        html += '<div class="rc-bar"><div class="rc-bar-fill" style="width:' + pct + '%;background:' + c.color + ';"></div></div>';
        html += '</div></div>';
    });
    html += '<button class="v11-close" onclick="closeReputation()">닫기</button>';
    document.getElementById('reputation-box').innerHTML = html;
    document.getElementById('reputation-panel').classList.add('show');
    setTimeout(drawReputationCanvas, 100);
    saveV11State();
    checkV11Achievements();
}

function drawReputationCanvas() {
    var canvas = document.getElementById('reputation-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width = canvas.offsetWidth * 2;
    var H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    var w = W / 2, h = H / 2;
    ctx.clearRect(0, 0, w, h);

    var playerScore = calcPlayerScore();
    var cities = AI_CITIES.map(function(c) {
        return { name: c.name.split(' ')[0], score: aiCityScores[c.id] || c.baseScore, color: c.color };
    });
    cities.push({ name: '내도시', score: playerScore, color: '#FFD700' });
    cities.sort(function(a, b) { return b.score - a.score; });

    var maxScore = Math.max.apply(null, cities.map(function(c) { return c.score; }));
    var barH = (h - 30) / cities.length;

    cities.forEach(function(c, i) {
        var barW = maxScore > 0 ? (c.score / maxScore) * (w - 80) : 0;
        var y = 10 + i * barH;
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(60, y, barW, barH - 4);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ddd';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(c.name, 56, y + barH / 2);
        ctx.textAlign = 'left';
        ctx.fillText(c.score + '', 64 + barW, y + barH / 2);
    });
}

function closeReputation() { document.getElementById('reputation-panel').classList.remove('show'); }
window.closeReputation = closeReputation;

function showCitizenStories() {
    playV11SFX('citizen_story');
    v11Features.add('citizen');
    var html = '<h2>👥 주민 스토리</h2>';
    html += '<div style="text-align:center;font-size:12px;color:#aaa;margin-bottom:12px;">가상 주민들의 일상 이야기</div>';
    CITIZENS.forEach(function(c) {
        var mood = c.moods[Math.floor(Math.random() * c.moods.length)];
        var happyLevel = typeof resources !== 'undefined' ? (resources.happy >= 70 ? '😄 행복' : resources.happy >= 40 ? '😐 보통' : '😞 불만') : '😐 보통';
        html += '<div class="citizen-card">';
        html += '<div class="cc-header"><span class="cc-avatar">' + c.avatar + '</span>';
        html += '<div><div class="cc-name">' + c.name + '</div><div class="cc-role">' + c.role + '</div></div></div>';
        html += '<div class="cc-diary">' + mood + '</div>';
        html += '<div class="cc-mood"><span>' + happyLevel + '</span></div>';
        html += '</div>';
    });
    html += '<button class="v11-close" onclick="closeCitizen()">닫기</button>';
    document.getElementById('citizen-box').innerHTML = html;
    document.getElementById('citizen-panel').classList.add('show');
    saveV11State();
    checkV11Achievements();
}

function closeCitizen() { document.getElementById('citizen-panel').classList.remove('show'); }
window.closeCitizen = closeCitizen;

function showZoning() {
    playV11SFX('zone_set');
    v11Features.add('zone');
    var html = '<h2>🗺️ 구역 설정</h2>';
    html += '<div style="text-align:center;font-size:12px;color:#aaa;margin-bottom:12px;">구역을 설정하여 도시에 보너스를 주세요</div>';
    html += '<canvas id="zone-canvas"></canvas>';
    ZONE_TYPES.forEach(function(z) {
        var active = zoneActive[z.id];
        html += '<div class="zone-type' + (active ? ' active' : '') + '" onclick="toggleZone(\'' + z.id + '\')">';
        html += '<div class="zt-icon">' + z.icon + '</div>';
        html += '<div class="zt-info"><div class="zt-name">' + z.name + '</div>';
        html += '<div class="zt-desc">' + z.desc + '</div>';
        html += '<div class="zt-bonus">보너스: ' + z.bonus + '</div></div>';
        html += '<div class="zt-count">' + (active ? '✅' : '⬜') + '</div>';
        html += '</div>';
    });
    html += '<button class="v11-close" onclick="closeZoning()">닫기</button>';
    document.getElementById('zone-box').innerHTML = html;
    document.getElementById('zone-panel').classList.add('show');
    setTimeout(drawZoneCanvas, 100);
    saveV11State();
    checkV11Achievements();
}

function toggleZone(id) {
    zoneActive[id] = !zoneActive[id];
    playV11SFX('zone_set');
    if(typeof toast === 'function') {
        var z = ZONE_TYPES.find(function(zt) { return zt.id === id; });
        toast((zoneActive[id] ? '✅ ' : '❌ ') + (z ? z.name : '') + (zoneActive[id] ? ' 활성화' : ' 비활성화'));
    }
    showZoning();
}
window.toggleZone = toggleZone;

function drawZoneCanvas() {
    var canvas = document.getElementById('zone-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width = canvas.offsetWidth * 2;
    var H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    var w = W / 2, h = H / 2;
    ctx.clearRect(0, 0, w, h);

    var activeZones = ZONE_TYPES.filter(function(z) { return zoneActive[z.id]; });
    var total = activeZones.length || 1;
    var startAngle = -Math.PI / 2;
    var cx = w * 0.5, cy = h * 0.5, radius = Math.min(w, h) * 0.38;

    if(activeZones.length === 0) {
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#888';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('구역을 선택해주세요', cx, cy);
        return;
    }

    var sliceAngle = (Math.PI * 2) / total;
    activeZones.forEach(function(z, i) {
        var a1 = startAngle + i * sliceAngle;
        var a2 = a1 + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, a1, a2);
        ctx.closePath();
        ctx.fillStyle = z.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.stroke();

        var midAngle = (a1 + a2) / 2;
        var lx = cx + radius * 0.6 * Math.cos(midAngle);
        var ly = cy + radius * 0.6 * Math.sin(midAngle);
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(z.icon, lx, ly);
    });
}

function closeZoning() { document.getElementById('zone-panel').classList.remove('show'); }
window.closeZoning = closeZoning;

// ===================== UI =====================
function addV11UI() {
    var style = document.createElement('style');
    style.textContent = V11_CSS;
    document.head.appendChild(style);

    var panels = '';

    panels += '<div id="law-panel" class="v11-panel" onclick="if(event.target===this)closeLawPanel()"><div class="v11-box" id="law-box"></div></div>';
    panels += '<div id="analytics-panel" class="v11-panel" onclick="if(event.target===this)closeAnalytics()"><div class="v11-box"><h2>📊 도시 통계 대시보드</h2><canvas id="analytics-canvas"></canvas><div class="analytics-stats" id="analytics-stats"></div><button class="v11-close" onclick="closeAnalytics()">닫기</button></div></div>';
    panels += '<div id="weather-panel" class="v11-panel" onclick="if(event.target===this)closeWeather()"><div class="v11-box" id="weather-box"></div></div>';
    panels += '<div id="arch-panel" class="v11-panel" onclick="if(event.target===this)closeArchGallery()"><div class="v11-box" id="arch-box"></div></div>';
    panels += '<div id="victory-panel" class="v11-panel" onclick="if(event.target===this)closeVictory()"><div class="v11-box" id="victory-box"></div></div>';
    panels += '<div id="reputation-panel" class="v11-panel" onclick="if(event.target===this)closeReputation()"><div class="v11-box" id="reputation-box"></div></div>';
    panels += '<div id="citizen-panel" class="v11-panel" onclick="if(event.target===this)closeCitizen()"><div class="v11-box" id="citizen-box"></div></div>';
    panels += '<div id="zone-panel" class="v11-panel" onclick="if(event.target===this)closeZoning()"><div class="v11-box" id="zone-box"></div></div>';

    var fabBtns = '<div class="v11-left-btns" style="position:fixed;left:8px;top:50%;transform:translateY(-50%);z-index:10;display:flex;flex-direction:column;gap:4px;">';
    var btns = [
        { icon: '⚖️', fn: 'showLaws()', title: '법률' },
        { icon: '📊', fn: 'showAnalytics()', title: '통계' },
        { icon: '⛅', fn: 'showWeather()', title: '날씨' },
        { icon: '🏛️', fn: 'showArchGallery()', title: '건축' },
        { icon: '🏆', fn: 'showVictoryConditions()', title: '승리' },
        { icon: '🏅', fn: 'showReputation()', title: '명성' },
        { icon: '👥', fn: 'showCitizenStories()', title: '주민' },
        { icon: '🗺️', fn: 'showZoning()', title: '구역' }
    ];
    btns.forEach(function(b) {
        fabBtns += '<button onclick="' + b.fn + '" title="' + b.title + '" style="background:rgba(0,0,0,0.7);border:1px solid #555;color:#fff;width:36px;height:36px;border-radius:8px;font-size:16px;cursor:pointer;">' + b.icon + '</button>';
    });
    fabBtns += '</div>';

    var container = document.createElement('div');
    container.innerHTML = panels + fabBtns;
    while(container.firstChild) document.body.appendChild(container.firstChild);
}

// ===================== QUIZ HOOK =====================
function hookV11Quiz() {
    if(typeof QUIZ_QUESTIONS === 'undefined') return;
    V11_QUIZ.forEach(function(q) {
        var exists = QUIZ_QUESTIONS.some(function(eq) { return eq.q === q.q; });
        if(!exists) QUIZ_QUESTIONS.push(q);
    });
}

// ===================== ACHIEVEMENTS HOOK =====================
function hookV11Achievements() {
    if(typeof V5_ACHIEVEMENTS === 'undefined') return;
    V11_ACHIEVEMENTS.forEach(function(a) {
        var exists = V5_ACHIEVEMENTS.some(function(ea) { return ea.id === a.id; });
        if(!exists) V5_ACHIEVEMENTS.push(a);
    });
}

function checkV11Achievements() {
    if(typeof checkAchievements === 'function') checkAchievements();
}

// ===================== ADVISOR TIPS =====================
function hookV11AdvisorTips() {
    if(typeof V5_ADVISOR_TIPS === 'undefined') return;
    var tips = [
        '💡 법률을 제정하면 도시에 다양한 효과를 줄 수 있어요! (Shift+L)',
        '💡 도시 통계에서 각 분야의 발전 상태를 확인해보세요! (Shift+A)',
        '💡 날씨에 따라 식량과 행복이 변해요. 7일 예보를 확인하세요! (Shift+W)',
        '💡 건물을 지으면 건축 양식 도감이 채워져요! (Shift+G)',
        '💡 시대별 승리 조건을 달성해보세요! (Shift+V)',
        '💡 다른 도시와 명성을 경쟁해보세요! (Shift+R)',
        '💡 주민들의 스토리를 통해 도시 분위기를 느껴보세요! (Shift+C)',
        '💡 구역을 설정하면 해당 분야에 보너스가 적용돼요! (Shift+Z)',
    ];
    tips.forEach(function(t) { V5_ADVISOR_TIPS.push(t); });
}

// ===================== AUTOSAVE =====================
function hookV11AutoSave() {
    setInterval(function() { saveV11State(); }, 30000);
}

// ===================== KEYBOARD =====================
function hookV11Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        switch(e.key) {
            case 'L': showLaws(); e.preventDefault(); break;
            case 'A': showAnalytics(); e.preventDefault(); break;
            case 'W': showWeather(); e.preventDefault(); break;
            case 'G': showArchGallery(); e.preventDefault(); break;
            case 'V': showVictoryConditions(); e.preventDefault(); break;
            case 'R': showReputation(); e.preventDefault(); break;
            case 'C': showCitizenStories(); e.preventDefault(); break;
            case 'Z': showZoning(); e.preventDefault(); break;
        }
    });
}

// ===================== GAME TICK HOOK =====================
function hookV11GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    window.gameTick = function() {
        prevTick();
        v11TickCount++;

        // Law effects every tick
        LAWS.forEach(function(law) {
            if(!lawEnacted[law.id]) return;
            if(typeof resources === 'undefined') return;
            if(law.goldTick) resources.gold += law.goldTick;
            if(law.cultureTick) resources.culture += law.cultureTick;
        });

        // Weather cycle every 50 ticks
        if(v11TickCount % 50 === 0) {
            weatherForecast.shift();
            var season = typeof currentSeason !== 'undefined' ? currentSeason : 0;
            var pool;
            if(season === 0) pool = [0, 1, 6, 0, 0, 1];
            else if(season === 1) pool = [0, 0, 1, 4, 0, 5];
            else if(season === 2) pool = [0, 7, 0, 3, 7, 0];
            else pool = [2, 2, 3, 0, 2, 2];
            weatherForecast.push(WEATHER_TYPES[pool[Math.floor(Math.random() * pool.length)]]);
            currentWeather = weatherForecast[0];

            if(typeof resources !== 'undefined') {
                if(currentWeather.foodEffect) resources.food += currentWeather.foodEffect;
                if(currentWeather.goldEffect) resources.gold += currentWeather.goldEffect;
                if(currentWeather.happyEffect) resources.happy = Math.max(0, Math.min(100, resources.happy + currentWeather.happyEffect));
                if(currentWeather.cultureEffect && typeof resources.culture !== 'undefined') resources.culture += currentWeather.cultureEffect;
            }
        }

        // AI city scores grow
        if(v11TickCount % 20 === 0) {
            AI_CITIES.forEach(function(c) {
                if(!aiCityScores[c.id]) aiCityScores[c.id] = c.baseScore;
                aiCityScores[c.id] += c.growth + (Math.random() - 0.3) * 2;
            });
        }

        // Zone bonuses every 10 ticks
        if(v11TickCount % 10 === 0 && typeof resources !== 'undefined') {
            if(zoneActive.residential) { resources.happy = Math.min(100, resources.happy + 1); }
            if(zoneActive.commercial) { resources.gold += 2; }
            if(zoneActive.cultural) { resources.culture += 2; }
        }

        // Auto discover architecture based on era
        if(v11TickCount % 100 === 0 && typeof currentEra !== 'undefined') {
            discoverArch(currentEra);
        }

        // Update HUD
        if(v11TickCount % 10 === 0 && typeof updateHUD === 'function') updateHUD();
    };
}

// ===================== SAVE/LOAD =====================
function saveV11State() {
    try {
        var state = {
            laws: lawEnacted,
            weather: { current: currentWeather.id, forecast: weatherForecast.map(function(w) { return w.id; }) },
            arch: Array.from(archDiscovered),
            aiScores: aiCityScores,
            zones: zoneActive,
            features: Array.from(v11Features)
        };
        localStorage.setItem('cityV11State', JSON.stringify(state));
    } catch(e) {}
}

function loadV11State() {
    try {
        var raw = localStorage.getItem('cityV11State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.laws) { for(var k in state.laws) lawEnacted[k] = state.laws[k]; }
        if(state.arch) archDiscovered = new Set(state.arch);
        if(state.aiScores) { for(var k2 in state.aiScores) aiCityScores[k2] = state.aiScores[k2]; }
        if(state.zones) { for(var k3 in state.zones) zoneActive[k3] = state.zones[k3]; }
        if(state.features) v11Features = new Set(state.features);
        if(state.weather && state.weather.forecast) {
            weatherForecast = state.weather.forecast.map(function(id) {
                return WEATHER_TYPES.find(function(w) { return w.id === id; }) || WEATHER_TYPES[0];
            });
            currentWeather = weatherForecast[0] || WEATHER_TYPES[0];
        }
    } catch(e) {}
}

// ===================== INIT =====================
function initV11() {
    loadV11State();
    if(weatherForecast.length === 0) initWeather();
    addV11UI();
    hookV11GameTick();
    hookV11Quiz();
    hookV11Achievements();
    hookV11AdvisorTips();
    hookV11AutoSave();
    hookV11Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('⚖️ v11.0: 법률+통계+날씨+건축도감+승리조건+명성+주민+구역!');
        }, 8000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV11, 2500); });
} else {
    setTimeout(initV11, 2500);
}

})();
