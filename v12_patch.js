// =====================================================================
// city-builder v12_patch.js — PRIME Holdings NEXTERA+PRISM v12.0
// Self-contained IIFE patch: Transport Infrastructure Canvas 6x6,
// Royal Treasury Dashboard Canvas Pie+Bar, City Defense Simulator Canvas,
// Daily Life Observer Canvas 24h Timeline, Architecture Gallery 12 styles,
// Weather System 4 seasons 8 types, Relic Excavation 10 sites,
// Royal Decree 12 edicts, +15 Quiz (115→130), +12 Achievements (110→122),
// SFX 12, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v12Ctx = null;
function getV12Audio() {
    if(!v12Ctx) {
        try { v12Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v12Ctx;
}
function playV12SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV12Audio();
    if(!ctx) return;
    var o, g, now = ctx.currentTime;
    g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.13, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    switch(type) {
        case 'transport_build':
            [330,440,550,660].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.18);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.18);
            });
            break;
        case 'treasury_open':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(523, now);
            o.frequency.linearRampToValueAtTime(784, now+0.15);
            o.frequency.linearRampToValueAtTime(1047, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'defense_build':
            [220,330,440,550,440].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sawtooth';
                oo.frequency.setValueAtTime(f, now+i*0.06);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.07, now+i*0.06);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.06+0.15);
                oo.connect(gg); oo.start(now+i*0.06); oo.stop(now+i*0.06+0.15);
            });
            break;
        case 'daily_observe':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(400, now);
            o.frequency.linearRampToValueAtTime(600, now+0.2);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.3);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'architecture_view':
            [392,494,588].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.25);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.25);
            });
            break;
        case 'weather_change':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(300, now);
            o.frequency.linearRampToValueAtTime(500, now+0.1);
            o.frequency.linearRampToValueAtTime(350, now+0.2);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.4);
            o.connect(g); o.start(now); o.stop(now+0.35);
            break;
        case 'relic_discover':
            [262,330,392,523,659,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.2);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.2);
            });
            break;
        case 'decree_issue':
            [392,494,588,784,588,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='square';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.06, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.15);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.15);
            });
            break;
        case 'quiz_v12':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(659, now);
            o.frequency.linearRampToValueAtTime(880, now+0.1);
            o.frequency.linearRampToValueAtTime(1047, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.25);
            break;
        case 'quiz_correct12':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'achieve_v12':
            [440,554,659,880,659,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.22);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.22);
            });
            break;
        case 'feature_open12':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.12);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
    }
}

// ===================== CSS =====================
var v12Style = document.createElement('style');
v12Style.textContent = '\
.v12-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); z-index: 2000; display: flex; justify-content: center; align-items: center; animation: v12fadeIn 0.3s; overflow-y: auto; padding: 16px; }\
@keyframes v12fadeIn { from { opacity: 0; } to { opacity: 1; } }\
.v12-box { background: linear-gradient(145deg, #1a2030, #0c1420); border: 2px solid #4488cc; border-radius: 16px; padding: 20px; width: 92%; max-width: 540px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 8px 32px rgba(0,0,0,0.6); }\
.v12-box h2 { text-align: center; margin-bottom: 14px; font-size: 18px; }\
.v12-close { position: absolute; top: 10px; right: 14px; background: #4488cc; border: none; color: #fff; font-size: 18px; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; }\
.v12-close:hover { opacity: 0.8; }\
.v12-section { margin-bottom: 14px; }\
.v12-section h3 { font-size: 14px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.1); }\
.v12-card { padding: 10px 14px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(68,136,204,0.2); }\
.v12-card:hover { background: rgba(68,136,204,0.08); }\
.v12-card-title { font-weight: bold; font-size: 13px; color: #88bbee; }\
.v12-card-desc { font-size: 11px; color: #999; margin-top: 2px; }\
.v12-btn { padding: 6px 14px; background: #4488cc; border: none; color: #fff; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold; transition: background 0.2s; }\
.v12-btn:hover { background: #5599dd; }\
.v12-btn:disabled { opacity: 0.4; cursor: default; }\
.v12-grid { display: grid; gap: 6px; }\
.v12-grid-2 { grid-template-columns: 1fr 1fr; }\
.v12-grid-3 { grid-template-columns: 1fr 1fr 1fr; }\
.v12-stat { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }\
.v12-stat-val { color: #ffd700; font-weight: bold; }\
#transport-panel .v12-box { border-color: #44aa88; }\
#transport-panel h2 { color: #66ddbb; }\
#transport-panel .v12-close { background: #44aa88; }\
#transport-panel .v12-card-title { color: #66ddbb; }\
#transport-panel .v12-btn { background: #44aa88; }\
#treasury-panel .v12-box { border-color: #cc9944; background: linear-gradient(145deg, #2a2010, #1a1408); }\
#treasury-panel h2 { color: #ffcc66; }\
#treasury-panel .v12-close { background: #cc9944; }\
#treasury-panel .v12-card-title { color: #ffcc66; }\
#treasury-panel .v12-btn { background: #cc9944; }\
#defense-panel .v12-box { border-color: #cc4444; background: linear-gradient(145deg, #2a1515, #1a0808); }\
#defense-panel h2 { color: #ff7766; }\
#defense-panel .v12-close { background: #cc4444; }\
#defense-panel .v12-card-title { color: #ff7766; }\
#defense-panel .v12-btn { background: #cc4444; }\
#dailylife-panel .v12-box { border-color: #88aa44; background: linear-gradient(145deg, #1a2510, #0c1a08); }\
#dailylife-panel h2 { color: #aadd66; }\
#dailylife-panel .v12-close { background: #88aa44; }\
#architecture-panel .v12-box { border-color: #aa6644; background: linear-gradient(145deg, #2a1a10, #1a0c04); }\
#architecture-panel h2 { color: #cc8866; }\
#architecture-panel .v12-close { background: #aa6644; }\
#weather-panel .v12-box { border-color: #4488aa; background: linear-gradient(145deg, #102030, #081420); }\
#weather-panel h2 { color: #66aacc; }\
#weather-panel .v12-close { background: #4488aa; }\
#relic-panel .v12-box { border-color: #aa8844; background: linear-gradient(145deg, #2a2010, #1a1208); }\
#relic-panel h2 { color: #ddaa66; }\
#relic-panel .v12-close { background: #aa8844; }\
#relic-panel .v12-btn { background: #aa8844; }\
#decree-panel .v12-box { border-color: #cc6688; background: linear-gradient(145deg, #2a1020, #1a0810); }\
#decree-panel h2 { color: #ff88aa; }\
#decree-panel .v12-close { background: #cc6688; }\
#decree-panel .v12-btn { background: #cc6688; }\
.v12-transport-canvas { width: 100%; height: 320px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
.v12-treasury-canvas { width: 100%; height: 280px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
.v12-defense-canvas { width: 100%; height: 300px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
.v12-daily-canvas { width: 100%; height: 260px; border-radius: 10px; background: rgba(0,0,0,0.4); margin-bottom: 14px; }\
.v12-weather-icon { font-size: 48px; text-align: center; margin: 10px 0; }\
.v12-arch-card { padding: 14px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(170,102,68,0.3); cursor: pointer; transition: background 0.2s; }\
.v12-arch-card:hover { background: rgba(170,102,68,0.1); }\
.v12-arch-icon { font-size: 28px; display: inline-block; margin-right: 8px; }\
.v12-arch-name { font-weight: bold; color: #cc8866; font-size: 14px; }\
.v12-arch-era { font-size: 10px; color: #aa7755; }\
.v12-arch-desc { font-size: 11px; color: #999; margin-top: 4px; }\
.v12-relic-item { display: flex; align-items: center; gap: 10px; padding: 10px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(170,136,68,0.2); }\
.v12-relic-icon { font-size: 28px; }\
.v12-relic-info { flex: 1; }\
.v12-relic-name { font-weight: bold; color: #ddaa66; font-size: 13px; }\
.v12-relic-desc { font-size: 11px; color: #999; margin-top: 2px; }\
.v12-relic-status { font-size: 10px; margin-top: 2px; }\
.v12-decree-item { display: flex; align-items: center; gap: 10px; padding: 12px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(204,102,136,0.2); cursor: pointer; transition: background 0.2s; }\
.v12-decree-item:hover { background: rgba(204,102,136,0.08); }\
.v12-decree-icon { font-size: 26px; }\
.v12-decree-info { flex: 1; }\
.v12-decree-name { font-weight: bold; color: #ff88aa; font-size: 13px; }\
.v12-decree-desc { font-size: 11px; color: #999; margin-top: 2px; }\
.v12-decree-cost { font-size: 10px; color: #ffcc66; margin-top: 2px; }\
.v12-left-btns { position: fixed; left: 6px; top: 50%; transform: translateY(-50%); z-index: 15; display: flex; flex-direction: column; gap: 4px; }\
.v12-left-btn { width: 40px; height: 40px; border-radius: 10px; border: 2px solid rgba(255,255,255,0.15); background: rgba(26,32,48,0.9); color: #fff; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }\
.v12-left-btn:hover { border-color: #4488cc; background: rgba(68,136,204,0.2); transform: scale(1.1); }\
.v12-scroll-nav { position: fixed; bottom: 70px; left: 0; right: 0; z-index: 12; display: flex; overflow-x: auto; gap: 4px; padding: 4px 8px; scrollbar-width: none; }\
.v12-scroll-nav::-webkit-scrollbar { display: none; }\
.v12-nav-btn { flex-shrink: 0; padding: 5px 10px; background: rgba(26,32,48,0.9); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; color: #ccc; font-size: 11px; cursor: pointer; white-space: nowrap; transition: all 0.2s; }\
.v12-nav-btn:hover { border-color: #4488cc; color: #fff; background: rgba(68,136,204,0.2); }\
@media (max-width: 600px) {\
    .v12-left-btns { display: none !important; }\
}\
';
document.head.appendChild(v12Style);

// ===================== DATA =====================

var TRANSPORT_TYPES = [
    { id: 'road', icon: '🛤️', name: '관도', desc: '주요 도로망. 교역 속도 +10%', cost: 30, bonus: { tradePct: 10 } },
    { id: 'waterway', icon: '🚢', name: '수로', desc: '하천 수운. 식량 운송 +15%', cost: 45, bonus: { foodPct: 15 } },
    { id: 'relay', icon: '🐎', name: '역참', desc: '파발 통신. 방어 반응 +10', cost: 50, bonus: { defense: 10 } },
    { id: 'bridge', icon: '🌉', name: '교량', desc: '하천 횡단. 이동 효율 +8%', cost: 40, bonus: { movePct: 8 } },
    { id: 'port', icon: '⚓', name: '항구', desc: '해상 무역 거점. 금 수입 +12%', cost: 60, bonus: { goldPct: 12 } },
    { id: 'market_road', icon: '🏪', name: '시장길', desc: '상업 도로. 교역 수입 +8%', cost: 35, bonus: { tradePct: 8 } }
];

var DEFENSE_STRUCTURES = [
    { id: 'wall', icon: '🏰', name: '성벽', desc: '기본 방어 시설. 방어력 +15', cost: 80, defense: 15 },
    { id: 'moat', icon: '💧', name: '해자', desc: '성 주위 수로. 방어력 +10, 공성 지연', cost: 60, defense: 10 },
    { id: 'tower', icon: '🗼', name: '망루', desc: '적 감시. 조기 경보 +20%', cost: 50, defense: 8, warning: 20 },
    { id: 'beacon', icon: '🔥', name: '봉화대', desc: '원거리 통신. 원군 도착 -2턴', cost: 45, defense: 5, beacon: true },
    { id: 'gate', icon: '🚪', name: '성문', desc: '강화 성문. 돌파 저항 +12', cost: 55, defense: 12 },
    { id: 'arsenal', icon: '🏹', name: '무기고', desc: '무기 보관. 병력 효율 +15%', cost: 70, defense: 8, milEff: 15 },
    { id: 'barracks', icon: '⛺', name: '병영', desc: '병사 훈련소. 방어력 +10, 병력 +20', cost: 65, defense: 10, troops: 20 },
    { id: 'fortress', icon: '🏯', name: '산성', desc: '최종 방어선. 방어력 +25', cost: 120, defense: 25 }
];

var ARCHITECTURE_STYLES = [
    { id: 'dolmen', icon: '🪨', era: '선사시대', name: '고인돌 양식', desc: '거석을 쌓아 만든 원시 건축. 무덤과 제단 용도. 세계문화유산 등재.' },
    { id: 'log_house', icon: '🏚️', era: '고조선', name: '귀틀집', desc: '통나무를 쌓아 만든 주거. 온돌의 원형이 시작된 시기.' },
    { id: 'hanok_early', icon: '🏛️', era: '삼국시대', name: '초기 한옥', desc: '기와지붕과 온돌이 결합된 한국 고유 건축 양식의 시작.' },
    { id: 'pagoda', icon: '🗼', era: '삼국시대', name: '석탑/목탑', desc: '불교 전래와 함께 발전. 백제 미륵사지석탑, 신라 황룡사목탑.' },
    { id: 'palace_silla', icon: '🏰', era: '통일신라', name: '궁궐 건축', desc: '안압지(월지), 석굴암, 불국사. 통일신라 전성기의 화려한 건축.' },
    { id: 'goryeo_temple', icon: '🙏', era: '고려', name: '사찰 건축', desc: '부석사 무량수전 등. 배흘림기둥과 주심포 양식.' },
    { id: 'goryeo_celadon', icon: '🏺', era: '고려', name: '청자 가마', desc: '세계적 수준의 고려청자 생산 시설. 상감기법의 극치.' },
    { id: 'joseon_palace', icon: '🏯', era: '조선 전기', name: '궁궐 대전', desc: '경복궁 근정전. 다포 양식, 유교적 질서 반영.' },
    { id: 'seowon', icon: '📚', era: '조선 중기', name: '서원 건축', desc: '교육과 제향의 공간. 소수서원, 도산서원. 자연과의 조화.' },
    { id: 'fortress_joseon', icon: '🧱', era: '조선 후기', name: '화성 축성', desc: '수원 화성. 정약용 거중기 활용. 동서양 축성술 융합.' },
    { id: 'modern_brick', icon: '🏢', era: '개화기', name: '근대 벽돌 건축', desc: '독립문, 덕수궁 석조전. 서양 건축 양식의 수용.' },
    { id: 'hanok_modern', icon: '🏡', era: '현대', name: '현대 한옥', desc: '전통과 현대의 융합. 북촌 한옥마을. 지속 가능한 건축.' }
];

var WEATHER_TYPES = [
    { id: 'sunny', icon: '☀️', name: '맑음', effect: '농업 +10%, 건설 +5%', foodMod: 10, buildMod: 5 },
    { id: 'cloudy', icon: '⛅', name: '흐림', effect: '영향 없음', foodMod: 0, buildMod: 0 },
    { id: 'rainy', icon: '🌧️', name: '비', effect: '농업 +5%, 건설 -10%', foodMod: 5, buildMod: -10 },
    { id: 'storm', icon: '⛈️', name: '폭풍', effect: '농업 -15%, 건설 -20%, 피해 위험', foodMod: -15, buildMod: -20 },
    { id: 'snowy', icon: '❄️', name: '눈', effect: '이동 -15%, 교역 -10%', foodMod: -5, buildMod: -15 },
    { id: 'foggy', icon: '🌫️', name: '안개', effect: '방어 -5%, 교역 -5%', foodMod: 0, buildMod: -5 },
    { id: 'windy', icon: '💨', name: '강풍', effect: '건설 -10%, 봉화 효율 +20%', foodMod: -5, buildMod: -10 },
    { id: 'drought', icon: '🔥', name: '가뭄', effect: '농업 -25%, 화재 위험 +30%', foodMod: -25, buildMod: 0 }
];

var SEASONS = [
    { id: 'spring', name: '봄', icon: '🌸', weathers: ['sunny','cloudy','rainy','windy'], color: '#88cc88' },
    { id: 'summer', name: '여름', icon: '☀️', weathers: ['sunny','rainy','storm','drought'], color: '#cc8844' },
    { id: 'autumn', name: '가을', icon: '🍂', weathers: ['sunny','cloudy','windy','foggy'], color: '#cc7744' },
    { id: 'winter', name: '겨울', icon: '❄️', weathers: ['cloudy','snowy','windy','foggy'], color: '#6688aa' }
];

var RELIC_SITES = [
    { id: 'site_1', icon: '🏺', name: '고인돌 유적지', desc: '선사시대 거석 무덤. 청동기 유물 기대.', reward: { gold: 100, culture: 10 }, difficulty: 1 },
    { id: 'site_2', icon: '⚔️', name: '고조선 무기 매장지', desc: '비파형 동검이 묻힌 곳.', reward: { gold: 150, defense: 8 }, difficulty: 2 },
    { id: 'site_3', icon: '📜', name: '고분벽화 유적', desc: '고구려 고분 벽화. 역사적 가치 매우 높음.', reward: { gold: 200, culture: 15 }, difficulty: 3 },
    { id: 'site_4', icon: '🏛️', name: '백제 왕궁터', desc: '부여 관북리 유적. 왕궁의 흔적.', reward: { gold: 250, happy: 10 }, difficulty: 3 },
    { id: 'site_5', icon: '🔔', name: '신라 범종 터', desc: '성덕대왕신종 주조 흔적.', reward: { gold: 180, culture: 20 }, difficulty: 2 },
    { id: 'site_6', icon: '💎', name: '금관 매장지', desc: '신라 금관총. 황금 보물.', reward: { gold: 400, culture: 25 }, difficulty: 4 },
    { id: 'site_7', icon: '📚', name: '팔만대장경 보관터', desc: '고려 대장경 제작지.', reward: { gold: 300, culture: 30 }, difficulty: 4 },
    { id: 'site_8', icon: '🗡️', name: '거북선 조선소 터', desc: '이순신 거북선 건조지.', reward: { gold: 350, defense: 15 }, difficulty: 5 },
    { id: 'site_9', icon: '🎨', name: '고려청자 가마터', desc: '강진 청자 가마. 상감청자 유물.', reward: { gold: 280, culture: 18 }, difficulty: 3 },
    { id: 'site_10', icon: '👑', name: '왕릉 비밀 통로', desc: '조선 왕릉의 숨겨진 보물.', reward: { gold: 500, culture: 35, happy: 15 }, difficulty: 5 }
];

var DECREES = [
    { id: 'tax_relief', icon: '💰', name: '세금 감면령', desc: '3턴간 세금 50% 감면. 행복 +20.', cost: 100, turns: 3, effect: { happy: 20, goldPct: -50 } },
    { id: 'military_draft', icon: '⚔️', name: '징병령', desc: '즉시 병력 확충. 방어력 +20, 행복 -5.', cost: 80, turns: 1, effect: { defense: 20, happy: -5 } },
    { id: 'harvest_festival', icon: '🌾', name: '풍년 축제령', desc: '3턴간 식량 +30%. 행복 +10.', cost: 60, turns: 3, effect: { foodPct: 30, happy: 10 } },
    { id: 'trade_boost', icon: '🚢', name: '교역 장려령', desc: '5턴간 교역 수입 +25%.', cost: 120, turns: 5, effect: { tradePct: 25 } },
    { id: 'education_push', icon: '📚', name: '교육 진흥령', desc: '3턴간 문화 +15, 연구 속도 +20%.', cost: 90, turns: 3, effect: { culture: 15, researchPct: 20 } },
    { id: 'construction_rush', icon: '🏗️', name: '토목 동원령', desc: '3턴간 건설 비용 -30%. 행복 -8.', cost: 70, turns: 3, effect: { buildDiscount: 30, happy: -8 } },
    { id: 'curfew', icon: '🌙', name: '야간 통행금지령', desc: '5턴간 치안 +25. 행복 -10.', cost: 50, turns: 5, effect: { safety: 25, happy: -10 } },
    { id: 'amnesty', icon: '🕊️', name: '대사면령', desc: '죄수 석방. 인구 +30, 행복 +15. 치안 -10.', cost: 40, turns: 1, effect: { popAdd: 30, happy: 15, safety: -10 } },
    { id: 'land_reform', icon: '🗺️', name: '토지 개혁령', desc: '5턴간 식량 +20%, 금 +10%.', cost: 150, turns: 5, effect: { foodPct: 20, goldPct: 10 } },
    { id: 'cultural_promotion', icon: '🎭', name: '문화 진흥령', desc: '3턴간 문화 +25, 관광 수입 +15%.', cost: 100, turns: 3, effect: { culture: 25, tourismPct: 15 } },
    { id: 'disaster_prep', icon: '🛡️', name: '재해 대비령', desc: '5턴간 재해 피해 -40%.', cost: 80, turns: 5, effect: { disasterReduce: 40 } },
    { id: 'royal_feast', icon: '🍽️', name: '어전 대연령', desc: '즉시 행복 +30, 식량 -50, 금 -80.', cost: 0, turns: 1, effect: { happy: 30, foodCost: 50, goldCost: 80 } }
];

var DAILY_ACTIVITIES = [
    { hour: 5, icon: '🌅', name: '새벽닭 울음', desc: '농민들이 일어나 하루를 시작합니다.' },
    { hour: 6, icon: '🌾', name: '아침 농사', desc: '논밭에 나가 새벽 이슬을 맞으며 일합니다.' },
    { hour: 7, icon: '🍚', name: '아침 식사', desc: '온 가족이 모여 아침밥을 먹습니다.' },
    { hour: 8, icon: '📚', name: '서당 수업', desc: '아이들이 서당에서 천자문을 배웁니다.' },
    { hour: 9, icon: '🏪', name: '시장 개장', desc: '상인들이 물건을 진열하고 장사를 시작합니다.' },
    { hour: 10, icon: '🔨', name: '장인 작업', desc: '대장장이, 도공이 공방에서 물건을 만듭니다.' },
    { hour: 11, icon: '⚔️', name: '군사 훈련', desc: '병사들이 훈련장에서 무예를 연마합니다.' },
    { hour: 12, icon: '🍜', name: '점심 식사', desc: '시장 주막에서 국밥 한 그릇으로 허기를 채웁니다.' },
    { hour: 13, icon: '🏛️', name: '관아 업무', desc: '관리들이 민원을 처리하고 정사를 봅니다.' },
    { hour: 14, icon: '🧵', name: '직조/바느질', desc: '여인들이 베를 짜고 옷을 만듭니다.' },
    { hour: 15, icon: '🎨', name: '예술 활동', desc: '화가가 그림을 그리고 서예가가 붓을 잡습니다.' },
    { hour: 16, icon: '🐂', name: '귀가 준비', desc: '농민들이 소를 끌고 논에서 돌아옵니다.' },
    { hour: 17, icon: '🏘️', name: '마을 모임', desc: '마을 어른들이 정자에서 회의를 합니다.' },
    { hour: 18, icon: '🌅', name: '해질녘', desc: '봉화대에 불을 올리고 성문을 닫습니다.' },
    { hour: 19, icon: '🍲', name: '저녁 식사', desc: '온 가족이 둘러앉아 저녁밥을 먹습니다.' },
    { hour: 20, icon: '🎵', name: '저녁 풍류', desc: '가야금 소리가 마을에 울려 퍼집니다.' },
    { hour: 21, icon: '📖', name: '야학/독서', desc: '양반은 서재에서, 백성은 야학에서 공부합니다.' },
    { hour: 22, icon: '🔥', name: '화롯가 이야기', desc: '할머니가 옛날이야기를 들려줍니다.' },
    { hour: 23, icon: '🌙', name: '야간 순찰', desc: '포졸이 딱딱이를 치며 순찰을 돕니다.' },
    { hour: 0, icon: '💤', name: '깊은 잠', desc: '온 마을이 고요한 잠에 빠집니다.' }
];

// ===================== STATE =====================
var transportBuilt = {};
var treasuryHistory = [];
var defenseBuilt = {};
var totalDefenseScore = 0;
var currentSeason = 0;
var currentWeather = 'sunny';
var weatherTurnCounter = 0;
var relicExcavated = {};
var relicInProgress = null;
var relicProgress = 0;
var decreeActive = {};
var decreeCooldowns = {};
var archViewed = {};
var dailyHour = 8;
var v12Features = {};

// ===================== QUIZ DATA =====================
var V12_QUIZ = [
    { q: '조선시대 전국을 연결한 통신 시설은?', a: ['봉화대', '역참', '관아', '향교'], c: 0 },
    { q: '수원 화성을 설계할 때 사용한 기구는?', a: ['거중기', '물레방아', '해시계', '측우기'], c: 0 },
    { q: '고려시대를 대표하는 도자기는?', a: ['청자', '백자', '분청사기', '옹기'], c: 0 },
    { q: '삼국시대 불교 전래와 함께 지어진 건축물은?', a: ['사찰', '서원', '향교', '객사'], c: 0 },
    { q: '조선시대 왕의 명령서를 무엇이라 하는가?', a: ['교지', '상소', '격문', '방문'], c: 0 },
    { q: '한국 전통 가옥의 바닥 난방 시스템은?', a: ['온돌', '벽난로', '화로', '아궁이'], c: 0 },
    { q: '고구려 고분벽화의 주제로 가장 많은 것은?', a: ['사신도', '풍속도', '산수화', '초상화'], c: 0 },
    { q: '경복궁의 정전(正殿)의 이름은?', a: ['근정전', '인정전', '명정전', '교태전'], c: 0 },
    { q: '팔만대장경이 보관된 곳은?', a: ['해인사', '불국사', '통도사', '송광사'], c: 0 },
    { q: '조선 후기 상업 도시로 유명한 곳은?', a: ['의주', '한양', '개경', '평양'], c: 0 },
    { q: '신라 금관의 특징적 장식 형태는?', a: ['나뭇가지 모양', '용 모양', '구름 모양', '별 모양'], c: 0 },
    { q: '백제의 수도가 아닌 곳은?', a: ['평양', '위례성', '웅진', '사비'], c: 0 },
    { q: '조선시대 과거 시험의 최종 단계는?', a: ['전시', '초시', '복시', '향시'], c: 0 },
    { q: '한국 전통 건축에서 처마의 곡선미를 뜻하는 말은?', a: ['추녀', '기둥', '대들보', '서까래'], c: 0 },
    { q: '도시 건설에서 배산임수란?', a: ['뒤에 산, 앞에 물', '산 위에 성', '물 위에 다리', '평지에 성'], c: 0 }
];

// ===================== ACHIEVEMENTS =====================
var V12_ACHIEVEMENTS = [
    { id: 'transport_first', icon: '🛤️', name: '첫 번째 도로', desc: '교통 시설 1개 건설', check: function() { return Object.keys(transportBuilt).length >= 1; } },
    { id: 'transport_all', icon: '🚢', name: '사통팔달', desc: '교통 시설 6종 전부 건설', check: function() { return Object.keys(transportBuilt).length >= 6; } },
    { id: 'treasury_check', icon: '💰', name: '재정 관리자', desc: '왕실 재정 대시보드 확인', check: function() { return v12Features.treasury_viewed; } },
    { id: 'defense_3', icon: '🏰', name: '성벽 건설자', desc: '방어 시설 3개 이상 건설', check: function() { return Object.keys(defenseBuilt).length >= 3; } },
    { id: 'defense_all', icon: '🏯', name: '철벽 방어', desc: '방어 시설 8종 전부 건설', check: function() { return Object.keys(defenseBuilt).length >= 8; } },
    { id: 'daily_viewer', icon: '👁️', name: '생활 관찰자', desc: '주민 생활 관찰기 열람', check: function() { return v12Features.daily_viewed; } },
    { id: 'arch_5', icon: '🏛️', name: '건축 애호가', desc: '건축 양식 5종 이상 열람', check: function() { return Object.keys(archViewed).length >= 5; } },
    { id: 'arch_all', icon: '🏡', name: '건축 박사', desc: '건축 양식 12종 전부 열람', check: function() { return Object.keys(archViewed).length >= 12; } },
    { id: 'relic_3', icon: '🏺', name: '유적 탐험가', desc: '유적 3곳 발굴 완료', check: function() { return Object.keys(relicExcavated).filter(function(k){ return relicExcavated[k]; }).length >= 3; } },
    { id: 'relic_all', icon: '👑', name: '고고학 대가', desc: '유적 10곳 전부 발굴', check: function() { return Object.keys(relicExcavated).filter(function(k){ return relicExcavated[k]; }).length >= 10; } },
    { id: 'decree_5', icon: '📜', name: '결단의 왕', desc: '칙서 5종 이상 발포', check: function() { return Object.keys(v12Features).filter(function(k){ return k.startsWith('decree_') && v12Features[k]; }).length >= 5; } },
    { id: 'v12_explorer', icon: '🌟', name: 'v12 탐험가', desc: 'v12 기능 5종 이상 사용', check: function() { var c = 0; if(Object.keys(transportBuilt).length > 0) c++; if(v12Features.treasury_viewed) c++; if(Object.keys(defenseBuilt).length > 0) c++; if(v12Features.daily_viewed) c++; if(Object.keys(archViewed).length > 0) c++; if(Object.keys(relicExcavated).length > 0) c++; if(Object.keys(v12Features).filter(function(k){ return k.startsWith('decree_'); }).length > 0) c++; if(v12Features.weather_viewed) c++; return c >= 5; } }
];

// ===================== STATE INIT =====================
function initV12State() {
    TRANSPORT_TYPES.forEach(function(t) { transportBuilt[t.id] = false; });
    DEFENSE_STRUCTURES.forEach(function(d) { defenseBuilt[d.id] = false; });
    RELIC_SITES.forEach(function(r) { relicExcavated[r.id] = false; });
    currentSeason = Math.floor(Math.random() * 4);
    changeWeather();
}

function changeWeather() {
    var season = SEASONS[currentSeason];
    var options = season.weathers;
    currentWeather = options[Math.floor(Math.random() * options.length)];
}

// ===================== TRANSPORT UI =====================
function openTransportPanel() {
    playV12SFX('feature_open12');
    var html = '<div id="transport-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>🛤️ 교통 인프라 관리</h2>';
    html += '<canvas id="transport-canvas" class="v12-transport-canvas" width="520" height="320"></canvas>';
    html += '<div class="v12-section"><h3>교통 시설 건설</h3>';
    TRANSPORT_TYPES.forEach(function(t) {
        var built = transportBuilt[t.id];
        html += '<div class="v12-card" style="display:flex;align-items:center;gap:10px;">';
        html += '<span style="font-size:24px;">' + t.icon + '</span>';
        html += '<div style="flex:1;"><div class="v12-card-title">' + t.name + '</div>';
        html += '<div class="v12-card-desc">' + t.desc + '</div>';
        html += '<div style="font-size:10px;color:#ffcc66;margin-top:2px;">비용: 금 ' + t.cost + '</div></div>';
        if(built) {
            html += '<span style="color:#4caf50;font-weight:bold;font-size:12px;">건설 완료</span>';
        } else {
            html += '<button class="v12-btn" onclick="buildTransport(\'' + t.id + '\')">건설</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    var builtCount = Object.keys(transportBuilt).filter(function(k){ return transportBuilt[k]; }).length;
    html += '<div class="v12-stat"><span>건설 완료</span><span class="v12-stat-val">' + builtCount + ' / 6</span></div>';
    html += '<div class="v12-stat"><span>연결도</span><span class="v12-stat-val">' + Math.round(builtCount/6*100) + '%</span></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    drawTransportCanvas();
}

function buildTransport(id) {
    var t = TRANSPORT_TYPES.find(function(x) { return x.id === id; });
    if(!t || transportBuilt[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < t.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + t.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= t.cost;
    transportBuilt[id] = true;
    playV12SFX('transport_build');
    if(typeof toast === 'function') toast('🛤️ ' + t.name + ' 건설 완료!');
    if(typeof addChronicle === 'function') addChronicle(t.icon, t.name + '을(를) 건설했습니다.');
    saveV12State();
    var panel = document.getElementById('transport-panel');
    if(panel) { panel.remove(); openTransportPanel(); }
}

function drawTransportCanvas() {
    var canvas = document.getElementById('transport-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#66ddbb';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('교통 네트워크 현황', 20, 25);
    var gridSize = 6;
    var cellW = 70, cellH = 40;
    var startX = 40, startY = 50;
    TRANSPORT_TYPES.forEach(function(t, i) {
        var row = Math.floor(i / 3);
        var col = i % 3;
        var x = startX + col * (cellW + 60);
        var y = startY + row * (cellH + 80);
        var built = transportBuilt[t.id];
        ctx.fillStyle = built ? 'rgba(68,170,136,0.3)' : 'rgba(255,255,255,0.05)';
        ctx.strokeStyle = built ? '#44aa88' : '#444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, cellW, cellH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = built ? '#66ddbb' : '#888';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.icon + ' ' + t.name, x + cellW/2, y + cellH/2 + 4);
        if(built && i < TRANSPORT_TYPES.length - 1) {
            var nextRow = Math.floor((i+1) / 3);
            var nextCol = (i+1) % 3;
            var nx = startX + nextCol * (cellW + 60);
            var ny = startY + nextRow * (cellH + 80);
            ctx.strokeStyle = '#44aa88';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(x + cellW, y + cellH/2);
            ctx.lineTo(nx, ny + cellH/2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    });
    ctx.textAlign = 'left';
    var builtCount = Object.keys(transportBuilt).filter(function(k){ return transportBuilt[k]; }).length;
    var barY = H - 40;
    ctx.fillStyle = '#333';
    ctx.fillRect(startX, barY, W - 80, 16);
    ctx.fillStyle = '#44aa88';
    ctx.fillRect(startX, barY, (W - 80) * builtCount / 6, 16);
    ctx.fillStyle = '#fff';
    ctx.font = '11px sans-serif';
    ctx.fillText('연결도: ' + Math.round(builtCount/6*100) + '%', startX + 4, barY + 12);
}

// ===================== TREASURY UI =====================
function openTreasuryPanel() {
    playV12SFX('treasury_open');
    v12Features.treasury_viewed = true;
    saveV12State();
    var gold = typeof resources !== 'undefined' ? resources.gold : 0;
    var food = typeof resources !== 'undefined' ? resources.food : 0;
    var pop = typeof resources !== 'undefined' ? resources.pop : 0;
    var income = Math.floor(pop * 0.3 + 20);
    var expense = Math.floor(pop * 0.15 + 10);
    var milCost = Object.keys(defenseBuilt).filter(function(k){ return defenseBuilt[k]; }).length * 5;
    var transportCost = Object.keys(transportBuilt).filter(function(k){ return transportBuilt[k]; }).length * 3;
    var html = '<div id="treasury-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>💰 왕실 재정 대시보드</h2>';
    html += '<canvas id="treasury-canvas" class="v12-treasury-canvas" width="500" height="280"></canvas>';
    html += '<div class="v12-section"><h3>재정 요약</h3>';
    html += '<div class="v12-stat"><span>보유 금</span><span class="v12-stat-val">' + gold + '</span></div>';
    html += '<div class="v12-stat"><span>보유 식량</span><span class="v12-stat-val">' + food + '</span></div>';
    html += '<div class="v12-stat"><span>인구</span><span class="v12-stat-val">' + pop + '</span></div>';
    html += '<div class="v12-stat"><span>턴당 수입</span><span class="v12-stat-val" style="color:#4caf50;">+' + income + '</span></div>';
    html += '<div class="v12-stat"><span>턴당 지출</span><span class="v12-stat-val" style="color:#f44336;">-' + (expense + milCost + transportCost) + '</span></div>';
    html += '<div class="v12-stat"><span>군사 유지비</span><span class="v12-stat-val" style="color:#ff9800;">-' + milCost + '</span></div>';
    html += '<div class="v12-stat"><span>교통 유지비</span><span class="v12-stat-val" style="color:#ff9800;">-' + transportCost + '</span></div>';
    html += '<div class="v12-stat"><span>순이익</span><span class="v12-stat-val" style="color:' + (income - expense - milCost - transportCost >= 0 ? '#4caf50' : '#f44336') + ';">' + (income - expense - milCost - transportCost) + '</span></div>';
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    drawTreasuryCanvas(income, expense, milCost, transportCost);
}

function drawTreasuryCanvas(income, expense, milCost, transportCost) {
    var canvas = document.getElementById('treasury-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffcc66';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('세입/세출 분석', 20, 20);
    var cx = 120, cy = 140, r = 80;
    var total = income + expense + milCost + transportCost;
    var slices = [
        { label: '세입', val: income, color: '#4caf50' },
        { label: '민생지출', val: expense, color: '#ff9800' },
        { label: '군사비', val: milCost || 1, color: '#f44336' },
        { label: '교통비', val: transportCost || 1, color: '#2196f3' }
    ];
    var angle = -Math.PI / 2;
    slices.forEach(function(s) {
        var sliceAngle = (s.val / (total || 1)) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, angle, angle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.strokeStyle = '#1a2010';
        ctx.lineWidth = 2;
        ctx.stroke();
        var midAngle = angle + sliceAngle / 2;
        var lx = cx + Math.cos(midAngle) * (r + 20);
        var ly = cy + Math.sin(midAngle) * (r + 20);
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.label, lx, ly);
        ctx.fillText(Math.round(s.val / (total || 1) * 100) + '%', lx, ly + 12);
        angle += sliceAngle;
    });
    ctx.textAlign = 'left';
    var barX = 260, barW = 200, barH = 20, barGap = 35;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('분기별 수지', barX, 30);
    var quarters = ['1분기', '2분기', '3분기', '4분기'];
    quarters.forEach(function(q, i) {
        var y = 50 + i * barGap;
        var net = income - expense - milCost - transportCost + Math.floor(Math.random() * 20 - 10);
        var maxVal = Math.max(Math.abs(net), 50);
        ctx.fillStyle = '#555';
        ctx.fillRect(barX, y, barW, barH);
        if(net >= 0) {
            ctx.fillStyle = '#4caf50';
            ctx.fillRect(barX, y, barW * Math.min(net / maxVal, 1), barH);
        } else {
            ctx.fillStyle = '#f44336';
            ctx.fillRect(barX, y, barW * Math.min(Math.abs(net) / maxVal, 1), barH);
        }
        ctx.fillStyle = '#ddd';
        ctx.font = '10px sans-serif';
        ctx.fillText(q + ': ' + (net >= 0 ? '+' : '') + net, barX + 4, y + 14);
    });
    var legendY = 210;
    slices.forEach(function(s, i) {
        ctx.fillStyle = s.color;
        ctx.fillRect(barX + (i % 2) * 100, legendY + Math.floor(i / 2) * 18, 10, 10);
        ctx.fillStyle = '#ddd';
        ctx.font = '10px sans-serif';
        ctx.fillText(s.label, barX + 14 + (i % 2) * 100, legendY + 9 + Math.floor(i / 2) * 18);
    });
}

// ===================== DEFENSE UI =====================
function openDefensePanel() {
    playV12SFX('feature_open12');
    var html = '<div id="defense-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>🏰 도시 방어 시뮬레이터</h2>';
    html += '<canvas id="defense-canvas" class="v12-defense-canvas" width="500" height="300"></canvas>';
    html += '<div class="v12-section"><h3>방어 시설 건설</h3>';
    DEFENSE_STRUCTURES.forEach(function(d) {
        var built = defenseBuilt[d.id];
        html += '<div class="v12-card" style="display:flex;align-items:center;gap:10px;">';
        html += '<span style="font-size:22px;">' + d.icon + '</span>';
        html += '<div style="flex:1;"><div class="v12-card-title">' + d.name + '</div>';
        html += '<div class="v12-card-desc">' + d.desc + '</div>';
        html += '<div style="font-size:10px;color:#ffcc66;margin-top:2px;">비용: 금 ' + d.cost + ' | 방어력 +' + d.defense + '</div></div>';
        if(built) {
            html += '<span style="color:#4caf50;font-weight:bold;font-size:12px;">건설됨</span>';
        } else {
            html += '<button class="v12-btn" onclick="buildDefense(\'' + d.id + '\')">건설</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    totalDefenseScore = 0;
    DEFENSE_STRUCTURES.forEach(function(d) { if(defenseBuilt[d.id]) totalDefenseScore += d.defense; });
    var grade = totalDefenseScore >= 90 ? 'S' : totalDefenseScore >= 70 ? 'A' : totalDefenseScore >= 50 ? 'B' : totalDefenseScore >= 30 ? 'C' : 'D';
    html += '<div class="v12-stat"><span>총 방어력</span><span class="v12-stat-val">' + totalDefenseScore + '</span></div>';
    html += '<div class="v12-stat"><span>방어 등급</span><span class="v12-stat-val">' + grade + '</span></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    drawDefenseCanvas();
}

function buildDefense(id) {
    var d = DEFENSE_STRUCTURES.find(function(x) { return x.id === id; });
    if(!d || defenseBuilt[id]) return;
    if(typeof resources !== 'undefined' && resources.gold < d.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + d.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= d.cost;
    defenseBuilt[id] = true;
    playV12SFX('defense_build');
    if(typeof toast === 'function') toast('🏰 ' + d.name + ' 건설 완료! 방어력 +' + d.defense);
    if(typeof addChronicle === 'function') addChronicle(d.icon, d.name + '을(를) 건설했습니다.');
    saveV12State();
    var panel = document.getElementById('defense-panel');
    if(panel) { panel.remove(); openDefensePanel(); }
}

function drawDefenseCanvas() {
    var canvas = document.getElementById('defense-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ff7766';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('방어 시설 배치도', 20, 20);
    var cx = W / 2, cy = H / 2 + 10;
    ctx.strokeStyle = '#443333';
    ctx.lineWidth = 2;
    [100, 70, 40].forEach(function(r) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
    });
    DEFENSE_STRUCTURES.forEach(function(d, i) {
        var angle = (i / DEFENSE_STRUCTURES.length) * Math.PI * 2 - Math.PI / 2;
        var dist = 60 + (i % 2) * 30;
        var x = cx + Math.cos(angle) * dist;
        var y = cy + Math.sin(angle) * dist;
        var built = defenseBuilt[d.id];
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = built ? 'rgba(204,68,68,0.3)' : 'rgba(255,255,255,0.05)';
        ctx.fill();
        ctx.strokeStyle = built ? '#cc4444' : '#555';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = built ? '#fff' : '#888';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.icon, x, y + 5);
        ctx.fillStyle = built ? '#ff7766' : '#666';
        ctx.font = '9px sans-serif';
        ctx.fillText(d.name, x, y + 26);
    });
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cc4444';
    ctx.font = '10px sans-serif';
    ctx.fillText('🏯 성 중심부', cx - 20, cy + 4);
}

// ===================== DAILY LIFE =====================
function openDailyLifePanel() {
    playV12SFX('daily_observe');
    v12Features.daily_viewed = true;
    saveV12State();
    var html = '<div id="dailylife-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>👁️ 주민 생활 관찰기</h2>';
    html += '<canvas id="daily-canvas" class="v12-daily-canvas" width="500" height="260"></canvas>';
    html += '<div class="v12-section"><h3>시간별 활동 (현재: ' + dailyHour + '시)</h3>';
    html += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px;">';
    for(var h = 0; h < 24; h++) {
        var active = DAILY_ACTIVITIES.find(function(a) { return a.hour === h; });
        var isCurrent = h === dailyHour;
        html += '<button onclick="setDailyHour(' + h + ')" style="width:28px;height:28px;border-radius:6px;border:1px solid ' + (isCurrent ? '#88aa44' : '#444') + ';background:' + (isCurrent ? 'rgba(136,170,68,0.3)' : (active ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)')) + ';color:' + (isCurrent ? '#aadd66' : '#888') + ';cursor:pointer;font-size:10px;">' + h + '</button>';
    }
    html += '</div>';
    DAILY_ACTIVITIES.forEach(function(a) {
        var isCurrent = a.hour === dailyHour;
        html += '<div class="v12-card" style="' + (isCurrent ? 'border-color:#88aa44;background:rgba(136,170,68,0.1);' : '') + '">';
        html += '<div style="display:flex;align-items:center;gap:8px;">';
        html += '<span style="font-size:20px;">' + a.icon + '</span>';
        html += '<div><div class="v12-card-title" style="' + (isCurrent ? 'color:#aadd66;' : '') + '">' + a.hour + '시 - ' + a.name + '</div>';
        html += '<div class="v12-card-desc">' + a.desc + '</div></div></div></div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    drawDailyCanvas();
}

function setDailyHour(h) {
    dailyHour = h;
    var panel = document.getElementById('dailylife-panel');
    if(panel) { panel.remove(); openDailyLifePanel(); }
}

function drawDailyCanvas() {
    var canvas = document.getElementById('daily-canvas');
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#aadd66';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('24시간 활동 타임라인', 20, 20);
    var barY = 50, barH = 30, startX = 30, totalW = W - 60;
    for(var h = 0; h < 24; h++) {
        var x = startX + (h / 24) * totalW;
        var w = totalW / 24;
        var isDaytime = h >= 6 && h < 18;
        var isCurrent = h === dailyHour;
        ctx.fillStyle = isCurrent ? 'rgba(136,170,68,0.5)' : (isDaytime ? 'rgba(255,200,50,0.15)' : 'rgba(50,50,100,0.3)');
        ctx.fillRect(x, barY, w, barH);
        ctx.strokeStyle = isCurrent ? '#88aa44' : '#444';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, barY, w, barH);
        if(h % 3 === 0) {
            ctx.fillStyle = '#888';
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(h + '시', x + w/2, barY + barH + 14);
        }
    }
    ctx.textAlign = 'left';
    var activity = DAILY_ACTIVITIES.find(function(a) { return a.hour === dailyHour; });
    if(activity) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(activity.icon + ' ' + activity.name, 30, 120);
        ctx.fillStyle = '#ccc';
        ctx.font = '12px sans-serif';
        ctx.fillText(activity.desc, 30, 145);
    }
    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    var seasonInfo = SEASONS[currentSeason];
    var weatherInfo = WEATHER_TYPES.find(function(w) { return w.id === currentWeather; });
    ctx.fillText('계절: ' + seasonInfo.icon + ' ' + seasonInfo.name + '  |  날씨: ' + (weatherInfo ? weatherInfo.icon + ' ' + weatherInfo.name : ''), 30, 180);
    var pop = typeof resources !== 'undefined' ? resources.pop : 100;
    var activities = ['농업', '상업', '공예', '학문', '군사', '여가'];
    var activityPcts = [30, 20, 15, 10, 15, 10];
    var pieX = 380, pieY = 180, pieR = 50;
    var angle = -Math.PI / 2;
    var colors = ['#4caf50', '#ff9800', '#2196f3', '#9c27b0', '#f44336', '#00bcd4'];
    activities.forEach(function(a, i) {
        var sliceAngle = (activityPcts[i] / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(pieX, pieY);
        ctx.arc(pieX, pieY, pieR, angle, angle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        angle += sliceAngle;
    });
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('인구 분포', pieX, pieY + pieR + 16);
    ctx.textAlign = 'left';
}

// ===================== ARCHITECTURE GALLERY =====================
function openArchitecturePanel() {
    playV12SFX('architecture_view');
    var html = '<div id="architecture-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>🏛️ 건축 양식 갤러리</h2>';
    html += '<div class="v12-section"><h3>한국 건축 5천년 변천사</h3>';
    ARCHITECTURE_STYLES.forEach(function(a) {
        archViewed[a.id] = true;
        html += '<div class="v12-arch-card">';
        html += '<span class="v12-arch-icon">' + a.icon + '</span>';
        html += '<span class="v12-arch-name">' + a.name + '</span>';
        html += '<span class="v12-arch-era" style="margin-left:8px;">[' + a.era + ']</span>';
        html += '<div class="v12-arch-desc">' + a.desc + '</div>';
        html += '</div>';
    });
    html += '</div>';
    html += '<div class="v12-stat"><span>열람</span><span class="v12-stat-val">' + Object.keys(archViewed).length + ' / 12</span></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
    saveV12State();
}

// ===================== WEATHER SYSTEM =====================
function openWeatherPanel() {
    playV12SFX('weather_change');
    v12Features.weather_viewed = true;
    saveV12State();
    var season = SEASONS[currentSeason];
    var weather = WEATHER_TYPES.find(function(w) { return w.id === currentWeather; });
    var html = '<div id="weather-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>🌤️ 날씨 시스템</h2>';
    html += '<div style="text-align:center;margin:16px 0;">';
    html += '<div style="font-size:60px;">' + (weather ? weather.icon : '☀️') + '</div>';
    html += '<div style="font-size:20px;font-weight:bold;color:#66aacc;margin-top:8px;">' + (weather ? weather.name : '맑음') + '</div>';
    html += '<div style="font-size:12px;color:#999;margin-top:4px;">' + (weather ? weather.effect : '') + '</div>';
    html += '</div>';
    html += '<div class="v12-section"><h3>' + season.icon + ' 현재 계절: ' + season.name + '</h3>';
    html += '<div class="v12-grid v12-grid-2">';
    SEASONS.forEach(function(s) {
        var isCurrent = s.id === season.id;
        html += '<div class="v12-card" style="text-align:center;' + (isCurrent ? 'border-color:' + s.color + ';background:rgba(255,255,255,0.08);' : '') + '">';
        html += '<div style="font-size:28px;">' + s.icon + '</div>';
        html += '<div class="v12-card-title" style="' + (isCurrent ? 'color:' + s.color + ';' : '') + '">' + s.name + '</div>';
        html += '<div class="v12-card-desc">날씨: ' + s.weathers.map(function(wid) { var wt = WEATHER_TYPES.find(function(x){return x.id===wid;}); return wt ? wt.icon : ''; }).join(' ') + '</div>';
        html += '</div>';
    });
    html += '</div></div>';
    html += '<div class="v12-section"><h3>날씨별 효과</h3>';
    WEATHER_TYPES.forEach(function(w) {
        var isCurrent = w.id === currentWeather;
        html += '<div class="v12-card" style="display:flex;align-items:center;gap:8px;' + (isCurrent ? 'border-color:#4488aa;background:rgba(68,136,170,0.1);' : '') + '">';
        html += '<span style="font-size:22px;">' + w.icon + '</span>';
        html += '<div><div class="v12-card-title" style="' + (isCurrent ? 'color:#66aacc;' : '') + '">' + w.name + (isCurrent ? ' (현재)' : '') + '</div>';
        html += '<div class="v12-card-desc">' + w.effect + '</div></div></div>';
    });
    html += '</div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// ===================== RELIC EXCAVATION =====================
function openRelicPanel() {
    playV12SFX('feature_open12');
    var html = '<div id="relic-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>🏺 유적 발굴 탐험</h2>';
    html += '<div class="v12-section"><h3>발굴 가능 유적</h3>';
    RELIC_SITES.forEach(function(r) {
        var excavated = relicExcavated[r.id];
        var stars = '';
        for(var s = 0; s < 5; s++) stars += s < r.difficulty ? '★' : '☆';
        html += '<div class="v12-relic-item">';
        html += '<span class="v12-relic-icon">' + r.icon + '</span>';
        html += '<div class="v12-relic-info"><div class="v12-relic-name">' + r.name + '</div>';
        html += '<div class="v12-relic-desc">' + r.desc + '</div>';
        html += '<div class="v12-relic-status" style="color:#ffcc66;">난이도: ' + stars + ' | 보상: 금 +' + r.reward.gold + '</div></div>';
        if(excavated) {
            html += '<span style="color:#4caf50;font-weight:bold;font-size:11px;">발굴완료</span>';
        } else {
            var cost = r.difficulty * 20;
            html += '<button class="v12-btn" onclick="excavateRelic(\'' + r.id + '\')">발굴 (금 ' + cost + ')</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    var excavCount = Object.keys(relicExcavated).filter(function(k){ return relicExcavated[k]; }).length;
    html += '<div class="v12-stat"><span>발굴 완료</span><span class="v12-stat-val">' + excavCount + ' / 10</span></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function excavateRelic(id) {
    var r = RELIC_SITES.find(function(x) { return x.id === id; });
    if(!r || relicExcavated[id]) return;
    var cost = r.difficulty * 20;
    if(typeof resources !== 'undefined' && resources.gold < cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= cost;
    var success = Math.random() > (r.difficulty * 0.1);
    if(success) {
        relicExcavated[id] = true;
        if(typeof resources !== 'undefined') {
            resources.gold += r.reward.gold;
            if(r.reward.culture && typeof resources.culture !== 'undefined') resources.culture = (resources.culture || 0) + r.reward.culture;
        }
        playV12SFX('relic_discover');
        if(typeof toast === 'function') toast('🏺 ' + r.name + ' 발굴 성공! 금 +' + r.reward.gold);
        if(typeof addChronicle === 'function') addChronicle(r.icon, r.name + '에서 귀중한 유물을 발굴했습니다!');
    } else {
        playV12SFX('feature_open12');
        if(typeof toast === 'function') toast('발굴 실패... 다시 시도해 보세요.');
    }
    saveV12State();
    var panel = document.getElementById('relic-panel');
    if(panel) { panel.remove(); openRelicPanel(); }
}

// ===================== DECREE SYSTEM =====================
function openDecreePanel() {
    playV12SFX('feature_open12');
    var html = '<div id="decree-panel" class="v12-overlay" onclick="if(event.target===this)this.remove()">';
    html += '<div class="v12-box"><button class="v12-close" onclick="this.closest(\'.v12-overlay\').remove()">&times;</button>';
    html += '<h2>📜 왕명 칙서</h2>';
    html += '<div class="v12-section"><h3>발포 가능 칙서</h3>';
    DECREES.forEach(function(d) {
        var isActive = decreeActive[d.id] && decreeActive[d.id] > 0;
        var issued = v12Features['decree_' + d.id];
        html += '<div class="v12-decree-item" onclick="' + (isActive ? '' : 'issueDecree(\'' + d.id + '\')') + '">';
        html += '<span class="v12-decree-icon">' + d.icon + '</span>';
        html += '<div class="v12-decree-info"><div class="v12-decree-name">' + d.name + '</div>';
        html += '<div class="v12-decree-desc">' + d.desc + '</div>';
        html += '<div class="v12-decree-cost">비용: 금 ' + d.cost + ' | 지속: ' + d.turns + '턴</div></div>';
        if(isActive) {
            html += '<span style="color:#ff88aa;font-weight:bold;font-size:11px;">시행중 (' + decreeActive[d.id] + '턴)</span>';
        } else {
            html += '<button class="v12-btn" onclick="event.stopPropagation();issueDecree(\'' + d.id + '\')">발포</button>';
        }
        html += '</div>';
    });
    html += '</div>';
    var activeCount = Object.keys(decreeActive).filter(function(k){ return decreeActive[k] > 0; }).length;
    html += '<div class="v12-stat"><span>시행 중 칙서</span><span class="v12-stat-val">' + activeCount + '</span></div>';
    html += '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

function issueDecree(id) {
    var d = DECREES.find(function(x) { return x.id === id; });
    if(!d) return;
    if(decreeActive[id] && decreeActive[id] > 0) {
        if(typeof toast === 'function') toast('이미 시행 중인 칙서입니다.');
        return;
    }
    if(typeof resources !== 'undefined' && resources.gold < d.cost) {
        if(typeof toast === 'function') toast('금이 부족합니다! (필요: ' + d.cost + ')');
        return;
    }
    if(typeof resources !== 'undefined') resources.gold -= d.cost;
    decreeActive[id] = d.turns;
    v12Features['decree_' + id] = true;
    if(d.effect.happy && typeof resources !== 'undefined') {
        resources.happy = (resources.happy || 0) + d.effect.happy;
    }
    if(d.effect.popAdd && typeof resources !== 'undefined') {
        resources.pop += d.effect.popAdd;
    }
    if(d.effect.foodCost && typeof resources !== 'undefined') {
        resources.food -= d.effect.foodCost;
    }
    if(d.effect.goldCost && typeof resources !== 'undefined') {
        resources.gold -= d.effect.goldCost;
    }
    playV12SFX('decree_issue');
    if(typeof toast === 'function') toast('📜 ' + d.name + ' 발포! (' + d.turns + '턴 유효)');
    if(typeof addChronicle === 'function') addChronicle(d.icon, '왕명 칙서: ' + d.name + '이(가) 발포되었습니다!');
    saveV12State();
    var panel = document.getElementById('decree-panel');
    if(panel) { panel.remove(); openDecreePanel(); }
}

// ===================== UI INJECTION =====================
function addV12UI() {
    var leftBtns = document.createElement('div');
    leftBtns.className = 'v12-left-btns';
    leftBtns.innerHTML = '<button class="v12-left-btn" onclick="openTransportPanel()" title="교통 인프라 (Shift+T)">🛤️</button>' +
        '<button class="v12-left-btn" onclick="openTreasuryPanel()" title="왕실 재정 (Shift+Y)">💰</button>' +
        '<button class="v12-left-btn" onclick="openDefensePanel()" title="도시 방어 (Shift+D)">🏰</button>' +
        '<button class="v12-left-btn" onclick="openDailyLifePanel()" title="주민 생활 (Shift+O)">👁️</button>' +
        '<button class="v12-left-btn" onclick="openArchitecturePanel()" title="건축 양식 (Shift+G)">🏛️</button>' +
        '<button class="v12-left-btn" onclick="openWeatherPanel()" title="날씨 (Shift+W)">🌤️</button>' +
        '<button class="v12-left-btn" onclick="openRelicPanel()" title="유적 발굴 (Shift+R)">🏺</button>' +
        '<button class="v12-left-btn" onclick="openDecreePanel()" title="왕명 칙서 (Shift+X)">📜</button>';
    document.body.appendChild(leftBtns);

    var scrollNav = document.createElement('div');
    scrollNav.className = 'v12-scroll-nav';
    scrollNav.innerHTML = '<button class="v12-nav-btn" onclick="openTransportPanel()">🛤️ 교통</button>' +
        '<button class="v12-nav-btn" onclick="openTreasuryPanel()">💰 재정</button>' +
        '<button class="v12-nav-btn" onclick="openDefensePanel()">🏰 방어</button>' +
        '<button class="v12-nav-btn" onclick="openDailyLifePanel()">👁️ 생활</button>' +
        '<button class="v12-nav-btn" onclick="openArchitecturePanel()">🏛️ 건축</button>' +
        '<button class="v12-nav-btn" onclick="openWeatherPanel()">🌤️ 날씨</button>' +
        '<button class="v12-nav-btn" onclick="openRelicPanel()">🏺 유적</button>' +
        '<button class="v12-nav-btn" onclick="openDecreePanel()">📜 칙서</button>';
    document.body.appendChild(scrollNav);
}

// ===================== GAME TICK HOOKS =====================
function hookV12GameTick() {
    if(typeof window.nextTurn === 'function') {
        var origNextTurn = window.nextTurn;
        window.nextTurn = function() {
            origNextTurn.apply(this, arguments);
            weatherTurnCounter++;
            if(weatherTurnCounter >= 5) {
                weatherTurnCounter = 0;
                currentSeason = (currentSeason + 1) % 4;
                changeWeather();
                if(typeof toast === 'function') toast(SEASONS[currentSeason].icon + ' 계절이 ' + SEASONS[currentSeason].name + '(으)로 바뀌었습니다. 날씨: ' + WEATHER_TYPES.find(function(w){return w.id===currentWeather;}).icon);
            } else {
                if(Math.random() < 0.4) changeWeather();
            }
            for(var dId in decreeActive) {
                if(decreeActive[dId] > 0) {
                    decreeActive[dId]--;
                    if(decreeActive[dId] <= 0) {
                        var decree = DECREES.find(function(x){ return x.id === dId; });
                        if(decree && typeof toast === 'function') toast('📜 ' + decree.name + ' 효력 만료');
                    }
                }
            }
            dailyHour = (dailyHour + 1) % 24;
            saveV12State();
        };
    }
}

// ===================== QUIZ HOOK =====================
function hookV12Quiz() {
    if(typeof quizQuestions !== 'undefined' && Array.isArray(quizQuestions)) {
        V12_QUIZ.forEach(function(q) {
            quizQuestions.push({
                question: q.q,
                answers: q.a,
                correct: q.c
            });
        });
    }
}

// ===================== ACHIEVEMENTS HOOK =====================
function hookV12Achievements() {
    if(typeof achievements !== 'undefined' && Array.isArray(achievements)) {
        V12_ACHIEVEMENTS.forEach(function(a) {
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

function hookV12CheckAchievements() {
    if(typeof window.checkAchievements === 'function') {
        var origCheck = window.checkAchievements;
        window.checkAchievements = function() {
            origCheck.apply(this, arguments);
            V12_ACHIEVEMENTS.forEach(function(a) {
                if(typeof earnedAchievements !== 'undefined' && !earnedAchievements.has(a.id) && a.check()) {
                    earnedAchievements.add(a.id);
                    playV12SFX('achieve_v12');
                    if(typeof toast === 'function') toast('🏆 업적 달성: ' + a.icon + ' ' + a.name);
                    if(typeof addChronicle === 'function') addChronicle('🏆', '업적 달성: ' + a.name);
                }
            });
        };
    }
}

// ===================== ADVISOR TIPS =====================
function hookV12AdvisorTips() {
    if(typeof advisorTips !== 'undefined' && Array.isArray(advisorTips)) {
        advisorTips.push(
            '🛤️ 교통 인프라를 건설하면 교역과 방어가 효율적이 됩니다.',
            '💰 왕실 재정 대시보드에서 세입/세출을 확인하세요.',
            '🏰 성벽과 망루를 세워 도시를 적의 침략에서 보호하세요.',
            '👁️ 주민의 하루를 관찰해보세요. 서당에서 시장까지!',
            '🏛️ 한국 건축 5천년의 양식을 갤러리에서 감상하세요.',
            '🌤️ 날씨가 농업과 건설에 영향을 미칩니다.',
            '🏺 유적을 발굴하면 금과 문화를 획득합니다.',
            '📜 왕명 칙서를 발포하면 즉각적인 효과를 볼 수 있습니다.'
        );
    }
}

// ===================== KEYBOARD =====================
function hookV12Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(!e.shiftKey) return;
        if(document.querySelector('.v12-overlay')) return;
        switch(e.key.toUpperCase()) {
            case 'T': e.preventDefault(); openTransportPanel(); break;
            case 'Y': e.preventDefault(); openTreasuryPanel(); break;
            case 'D': e.preventDefault(); openDefensePanel(); break;
            case 'O': e.preventDefault(); openDailyLifePanel(); break;
            case 'G': e.preventDefault(); openArchitecturePanel(); break;
            case 'W': e.preventDefault(); openWeatherPanel(); break;
            case 'R': e.preventDefault(); openRelicPanel(); break;
            case 'X': e.preventDefault(); openDecreePanel(); break;
        }
    });
}

// ===================== AUTO-SAVE =====================
function hookV12AutoSave() {
    setInterval(function() { saveV12State(); }, 30000);
}

function saveV12State() {
    try {
        localStorage.setItem('cityV12State', JSON.stringify({
            transport: transportBuilt,
            defense: defenseBuilt,
            relic: relicExcavated,
            decree: decreeActive,
            arch: archViewed,
            season: currentSeason,
            weather: currentWeather,
            weatherTurn: weatherTurnCounter,
            dailyHour: dailyHour,
            features: v12Features
        }));
    } catch(e) {}
}

function loadV12State() {
    try {
        var raw = localStorage.getItem('cityV12State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(state.transport) { for(var k in state.transport) transportBuilt[k] = state.transport[k]; }
        if(state.defense) { for(var k2 in state.defense) defenseBuilt[k2] = state.defense[k2]; }
        if(state.relic) { for(var k3 in state.relic) relicExcavated[k3] = state.relic[k3]; }
        if(state.decree) { for(var k4 in state.decree) decreeActive[k4] = state.decree[k4]; }
        if(state.arch) { for(var k5 in state.arch) archViewed[k5] = state.arch[k5]; }
        if(typeof state.season === 'number') currentSeason = state.season;
        if(state.weather) currentWeather = state.weather;
        if(typeof state.weatherTurn === 'number') weatherTurnCounter = state.weatherTurn;
        if(typeof state.dailyHour === 'number') dailyHour = state.dailyHour;
        if(state.features) v12Features = state.features;
    } catch(e) {}
}

// ===================== GLOBAL EXPOSE =====================
window.openTransportPanel = openTransportPanel;
window.buildTransport = buildTransport;
window.openTreasuryPanel = openTreasuryPanel;
window.openDefensePanel = openDefensePanel;
window.buildDefense = buildDefense;
window.openDailyLifePanel = openDailyLifePanel;
window.setDailyHour = setDailyHour;
window.openArchitecturePanel = openArchitecturePanel;
window.openWeatherPanel = openWeatherPanel;
window.openRelicPanel = openRelicPanel;
window.excavateRelic = excavateRelic;
window.openDecreePanel = openDecreePanel;
window.issueDecree = issueDecree;

// ===================== INIT =====================
function initV12() {
    initV12State();
    loadV12State();
    addV12UI();
    hookV12GameTick();
    hookV12Quiz();
    hookV12Achievements();
    hookV12CheckAchievements();
    hookV12AdvisorTips();
    hookV12AutoSave();
    hookV12Keyboard();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🛤️ v12.0: 교통인프라+왕실재정+도시방어+주민생활+건축갤러리+날씨+유적발굴+칙서!');
        }, 9000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV12, 3000); });
} else {
    setTimeout(initV12, 3000);
}

})();
