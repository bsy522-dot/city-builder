// =====================================================================
// city-builder v13_patch.js — PRIME Holdings NEXTERA+PRISM v13.0
// Self-contained IIFE patch: Dynasty Succession 12 Kings Canvas,
// Trade Route Manager Canvas 5 Partners, Population Class Simulator
// Canvas Pyramid, Diplomatic Summit 5 Nations, Era BGM Jukebox 8 Tracks,
// City Reputation 6-Axis Radar Canvas, Blueprint Planner Canvas Grid,
// History Yearbook Dashboard Canvas, +15 Quiz (130→145),
// +12 Achievements (122→134), SFX 12, Keyboard Shortcuts +8
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
        case 'dynasty_crown':
            [523,659,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.25);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.25);
            });
            break;
        case 'trade_deal':
            [262,330,392,523].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='triangle';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'population_grow':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(330, now);
            o.frequency.linearRampToValueAtTime(660, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.3);
            break;
        case 'diplomacy_treaty':
            [440,554,659,880].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.12);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.12);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.12+0.3);
                oo.connect(gg); oo.start(now+i*0.12); oo.stop(now+i*0.12+0.3);
            });
            break;
        case 'bgm_play':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(392, now);
            o.frequency.linearRampToValueAtTime(523, now+0.15);
            g.gain.setValueAtTime(0.08, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.25);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'reputation_up':
            [523,659,784].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.1);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.1);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.1+0.2);
                oo.connect(gg); oo.start(now+i*0.1); oo.stop(now+i*0.1+0.2);
            });
            break;
        case 'blueprint_place':
            o = ctx.createOscillator(); o.type='square';
            o.frequency.setValueAtTime(440, now);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.12);
            o.connect(g); o.start(now); o.stop(now+0.1);
            break;
        case 'yearbook_open':
            [349,440,523,659].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.09);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.08, now+i*0.09);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.09+0.22);
                oo.connect(gg); oo.start(now+i*0.09); oo.stop(now+i*0.09+0.22);
            });
            break;
        case 'tax_collect':
            o = ctx.createOscillator(); o.type='triangle';
            o.frequency.setValueAtTime(262, now);
            o.frequency.linearRampToValueAtTime(523, now+0.15);
            o.connect(g); o.start(now); o.stop(now+0.2);
            break;
        case 'upgrade_complete':
            [440,554,659,880,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.07);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.09, now+i*0.07);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.07+0.18);
                oo.connect(gg); oo.start(now+i*0.07); oo.stop(now+i*0.07+0.18);
            });
            break;
        case 'achieve_v13':
            [523,659,784,1047,784,1047].forEach(function(f, i) {
                var oo = ctx.createOscillator(); oo.type='sine';
                oo.frequency.setValueAtTime(f, now+i*0.08);
                var gg = ctx.createGain(); gg.connect(ctx.destination);
                gg.gain.setValueAtTime(0.1, now+i*0.08);
                gg.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.2);
                oo.connect(gg); oo.start(now+i*0.08); oo.stop(now+i*0.08+0.2);
            });
            break;
        case 'feature_open':
            o = ctx.createOscillator(); o.type='sine';
            o.frequency.setValueAtTime(440, now);
            o.frequency.linearRampToValueAtTime(660, now+0.12);
            g.gain.setValueAtTime(0.09, now);
            g.gain.exponentialRampToValueAtTime(0.001, now+0.2);
            o.connect(g); o.start(now); o.stop(now+0.15);
            break;
    }
}

// ===================== STATE =====================
var dynastyKings = [
    {name:'단군왕검', era:'고조선', years:'B.C.2333~', trait:'건국의 아버지', buff:'문화+30%', icon:'👑'},
    {name:'해모수', era:'북부여', years:'B.C.239~', trait:'천제의 자손', buff:'군사+20%', icon:'⚔️'},
    {name:'주몽', era:'고구려', years:'B.C.37~', trait:'신궁(神弓)', buff:'방어+25%', icon:'🏹'},
    {name:'온조', era:'백제', years:'B.C.18~', trait:'남진의 개척자', buff:'무역+30%', icon:'🚢'},
    {name:'혁거세', era:'신라', years:'B.C.57~', trait:'알에서 태어난 왕', buff:'인구+20%', icon:'🥚'},
    {name:'대조영', era:'발해', years:'698~', trait:'해동성국의 왕', buff:'영토+25%', icon:'🐉'},
    {name:'왕건', era:'고려', years:'918~', trait:'삼한통일의 왕', buff:'외교+30%', icon:'🤝'},
    {name:'세종대왕', era:'조선 전기', years:'1418~', trait:'성군(聖君)', buff:'기술+40%', icon:'📖'},
    {name:'이순신', era:'조선 중기', years:'1545~', trait:'불패의 명장', buff:'방어+40%', icon:'🛡️'},
    {name:'정조', era:'조선 후기', years:'1776~', trait:'개혁의 군주', buff:'문화+35%', icon:'🏯'},
    {name:'흥선대원군', era:'구한말', years:'1863~', trait:'쇄국의 결단', buff:'방어+30%', icon:'🚪'},
    {name:'고종', era:'대한제국', years:'1897~', trait:'근대화의 꿈', buff:'기술+25%', icon:'🏭'}
];
var currentKingIdx = 0;
var dynastyHistory = [];

var tradeRoutes = [
    {name:'중국 (명/청)', icon:'🇨🇳', goods:['비단','도자기','약재','서적'], importGoods:['인삼','금','은','모피'], relation:50, active:false},
    {name:'일본', icon:'🇯🇵', goods:['은','칼','부채','옻칠기'], importGoods:['면포','쌀','인삼','호피'], relation:40, active:false},
    {name:'류큐 왕국', icon:'🏝️', goods:['향신료','산호','유리','설탕'], importGoods:['쌀','면포','도자기','칠기'], relation:60, active:false},
    {name:'여진/만주', icon:'🐎', goods:['말','모피','약초','사냥감'], importGoods:['철기','곡물','면포','소금'], relation:35, active:false},
    {name:'아라비아 상인', icon:'🐪', goods:['향료','보석','유리','카펫'], importGoods:['비단','도자기','금','차'], relation:30, active:false}
];
var tradeIncome = 0;

var popClasses = {farmer:80, merchant:15, noble:5};
var popSatisfaction = {farmer:70, merchant:65, noble:75};
var popTotal = 1000;

var diplomacyNations = [
    {name:'명나라', icon:'🏯', relation:50, treaty:'없음', events:[]},
    {name:'일본', icon:'⛩️', relation:30, treaty:'없음', events:[]},
    {name:'여진', icon:'🏔️', relation:40, treaty:'없음', events:[]},
    {name:'몽골', icon:'🐎', relation:35, treaty:'없음', events:[]},
    {name:'류큐', icon:'🌊', relation:55, treaty:'없음', events:[]}
];

var bgmTracks = [
    {name:'궁중아악', bpm:60, notes:[262,294,330,349,392,349,330,294], wave:'sine', era:'고조선~삼국'},
    {name:'전쟁행진곡', bpm:120, notes:[330,330,392,392,440,440,392,0], wave:'sawtooth', era:'고구려'},
    {name:'마을평화', bpm:80, notes:[392,440,523,440,392,349,330,349], wave:'triangle', era:'백제'},
    {name:'축제풍류', bpm:100, notes:[523,587,659,784,659,587,523,440], wave:'sine', era:'신라'},
    {name:'고려가요', bpm:72, notes:[349,392,440,523,440,392,349,330], wave:'sine', era:'고려'},
    {name:'세종의 아침', bpm:66, notes:[262,330,392,523,392,330,262,330], wave:'triangle', era:'조선 전기'},
    {name:'이순신 출정', bpm:110, notes:[220,262,330,392,440,392,330,262], wave:'square', era:'조선 중기'},
    {name:'근대여명', bpm:90, notes:[440,523,587,659,587,523,440,523], wave:'sine', era:'근대'}
];
var bgmPlaying = false;
var bgmCurrentTrack = -1;
var bgmTimers = [];

var reputationAxes = {military:50, economy:50, culture:50, diplomacy:50, welfare:50, tech:50};

var blueprintGrid = [];
var bpSize = 8;
for(var bi=0; bi<bpSize*bpSize; bi++) blueprintGrid.push(0);
var bpBrush = 1;
var bpTypes = [
    {id:0, name:'빈칸', icon:'⬜', color:'#333'},
    {id:1, name:'주거', icon:'🏠', color:'#4a6fa5'},
    {id:2, name:'상업', icon:'🏪', color:'#c4923a'},
    {id:3, name:'군사', icon:'⚔️', color:'#a03030'},
    {id:4, name:'문화', icon:'🏛️', color:'#6a5acd'},
    {id:5, name:'농업', icon:'🌾', color:'#2d6b2d'},
    {id:6, name:'도로', icon:'🛤️', color:'#666'},
    {id:7, name:'수로', icon:'💧', color:'#1e90ff'},
    {id:8, name:'성벽', icon:'🧱', color:'#8b4513'}
];

var yearbookData = [];
var taxRate = {farmer:10, merchant:15, noble:20};
var cityUpgrades = {
    wall_lv:1, market_lv:1, academy_lv:1, barracks_lv:1,
    port_lv:1, temple_lv:1, farm_lv:1, forge_lv:1
};

var v13Features = {};

// ===================== 1. DYNASTY SUCCESSION =====================
function openDynastyPanel() {
    playV13SFX('dynasty_crown');
    var king = dynastyKings[currentKingIdx];
    var html = '<div style="max-width:520px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#2a1a0e,#1a0e05);border:2px solid #ffd700;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#ffd700;margin-bottom:4px;">👑 왕조 계승</h2>';
    html += '<p style="text-align:center;color:#c4923a;font-size:13px;margin-bottom:14px;">현 왕: ' + king.icon + ' ' + king.name + ' (' + king.era + ')</p>';

    // Canvas for dynasty tree
    html += '<canvas id="dynastyCanvas" width="480" height="280" style="width:100%;border-radius:10px;background:#111;margin-bottom:12px;"></canvas>';

    // Current king info
    html += '<div style="background:rgba(255,215,0,0.08);border-radius:12px;padding:14px;margin-bottom:10px;border-left:3px solid #ffd700;">';
    html += '<div style="font-size:36px;text-align:center;">' + king.icon + '</div>';
    html += '<div style="text-align:center;font-size:18px;font-weight:bold;color:#ffd700;">' + king.name + '</div>';
    html += '<div style="text-align:center;color:#c4923a;font-size:12px;">' + king.era + ' | ' + king.years + '</div>';
    html += '<div style="text-align:center;margin-top:6px;">';
    html += '<span style="background:#2d6b2d;padding:3px 10px;border-radius:10px;font-size:11px;color:#8f8;">특성: ' + king.trait + '</span> ';
    html += '<span style="background:#4a2a10;padding:3px 10px;border-radius:10px;font-size:11px;color:#fa0;">버프: ' + king.buff + '</span>';
    html += '</div></div>';

    // King list
    html += '<div style="font-size:13px;font-weight:bold;color:#ffd700;margin-bottom:6px;">📜 역대 왕 목록</div>';
    dynastyKings.forEach(function(k, idx) {
        var isCurrent = idx === currentKingIdx;
        var isUnlocked = idx <= currentKingIdx;
        html += '<div onclick="selectKing(' + idx + ')" style="display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:4px;border-radius:8px;cursor:pointer;';
        html += 'background:' + (isCurrent ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.03)') + ';';
        html += 'border-left:3px solid ' + (isCurrent ? '#ffd700' : isUnlocked ? '#555' : '#222') + ';';
        html += 'opacity:' + (isUnlocked ? '1' : '0.4') + ';">';
        html += '<span style="font-size:24px;">' + k.icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-size:13px;font-weight:bold;color:' + (isCurrent ? '#ffd700' : '#ccc') + ';">' + k.name + '</div>';
        html += '<div style="font-size:10px;color:#888;">' + k.era + ' | ' + k.trait + '</div>';
        html += '</div>';
        if(isCurrent) html += '<span style="font-size:10px;color:#ffd700;background:#4a3a10;padding:2px 8px;border-radius:8px;">현재</span>';
        html += '</div>';
    });

    // Dynasty history log
    if(dynastyHistory.length > 0) {
        html += '<div style="font-size:13px;font-weight:bold;color:#ffd700;margin:12px 0 6px;">📋 왕조 연대기</div>';
        dynastyHistory.slice(-8).reverse().forEach(function(h) {
            html += '<div style="font-size:11px;color:#aaa;padding:4px 8px;border-left:2px solid #555;margin-bottom:3px;">' + h + '</div>';
        });
    }

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#c4923a;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawDynastyCanvas(); });
}

function drawDynastyCanvas() {
    var c = document.getElementById('dynastyCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0,0,W,H);

    var cols = 4;
    var rows = Math.ceil(dynastyKings.length / cols);
    var cellW = (W - 40) / cols;
    var cellH = (H - 40) / rows;

    dynastyKings.forEach(function(k, idx) {
        var col = idx % cols;
        var row = Math.floor(idx / cols);
        var cx = 20 + col * cellW + cellW / 2;
        var cy = 20 + row * cellH + cellH / 2;
        var isActive = idx <= currentKingIdx;
        var isCurrent = idx === currentKingIdx;

        // Connection line to next
        if(idx < dynastyKings.length - 1) {
            var ncol = (idx+1) % cols;
            var nrow = Math.floor((idx+1) / cols);
            var nx = 20 + ncol * cellW + cellW / 2;
            var ny = 20 + nrow * cellH + cellH / 2;
            ctx.strokeStyle = isActive ? '#ffd700' : '#333';
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.setLineDash(isActive ? [] : [4,4]);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(nx, ny);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Node circle
        var r = isCurrent ? 22 : 18;
        if(isCurrent) {
            ctx.beginPath();
            ctx.arc(cx, cy, r+4, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255,215,0,0.2)';
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI*2);
        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        if(isCurrent) { grad.addColorStop(0,'#ffd700'); grad.addColorStop(1,'#8b6914'); }
        else if(isActive) { grad.addColorStop(0,'#555'); grad.addColorStop(1,'#333'); }
        else { grad.addColorStop(0,'#222'); grad.addColorStop(1,'#111'); }
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = isCurrent ? '#ffd700' : isActive ? '#666' : '#333';
        ctx.lineWidth = isCurrent ? 2 : 1;
        ctx.stroke();

        // Name text
        ctx.fillStyle = isCurrent ? '#ffd700' : isActive ? '#ccc' : '#555';
        ctx.font = (isCurrent ? 'bold ' : '') + '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(k.name, cx, cy + r + 14);

        // Era
        ctx.fillStyle = isCurrent ? '#c4923a' : '#666';
        ctx.font = '8px sans-serif';
        ctx.fillText(k.era, cx, cy + r + 24);
    });
}

function selectKing(idx) {
    if(idx > currentKingIdx) {
        if(typeof toast === 'function') toast('⚠️ 아직 해금되지 않은 왕입니다!');
        return;
    }
    currentKingIdx = idx;
    dynastyHistory.push('👑 ' + dynastyKings[idx].name + ' 즉위 (' + dynastyKings[idx].era + ')');
    playV13SFX('dynasty_crown');
    saveV13State();
    openDynastyPanel();
}

// ===================== 2. TRADE ROUTE MANAGER =====================
function openTradePanel() {
    playV13SFX('trade_deal');
    var html = '<div style="max-width:540px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#1a2a1a,#0e1e0e);border:2px solid #4caf50;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#4caf50;margin-bottom:4px;">🚢 무역로 관리</h2>';
    html += '<p style="text-align:center;color:#8bc34a;font-size:13px;margin-bottom:12px;">교역 수입: 💰 +' + tradeIncome + '/턴</p>';

    html += '<canvas id="tradeCanvas" width="500" height="260" style="width:100%;border-radius:10px;background:#0a0a14;margin-bottom:12px;"></canvas>';

    tradeRoutes.forEach(function(route, idx) {
        html += '<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;margin-bottom:8px;border-left:3px solid ' + (route.active ? '#4caf50' : '#333') + ';">';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">';
        html += '<div><span style="font-size:20px;">' + route.icon + '</span> <strong style="color:' + (route.active ? '#4caf50' : '#ccc') + ';">' + route.name + '</strong></div>';
        html += '<button onclick="toggleTrade(' + idx + ')" style="background:' + (route.active ? '#c0392b' : '#27ae60') + ';border:none;color:#fff;padding:4px 14px;border-radius:10px;font-size:12px;cursor:pointer;">' + (route.active ? '중단' : '개통') + '</button>';
        html += '</div>';

        // Relation bar
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
        html += '<span style="font-size:11px;color:#aaa;min-width:40px;">관계:</span>';
        var relGrad1 = route.relation>60 ? '#4caf50' : (route.relation>30 ? '#ff9800' : '#f44336');
        var relGrad2 = route.relation>60 ? '#8bc34a' : (route.relation>30 ? '#ffb74d' : '#e57373');
        html += '<div style="flex:1;height:8px;background:#222;border-radius:4px;overflow:hidden;"><div style="width:' + route.relation + '%;height:100%;background:linear-gradient(90deg,' + relGrad1 + ',' + relGrad2 + ');border-radius:4px;"></div></div>';
        html += '<span style="font-size:11px;color:#ffd700;min-width:30px;">' + route.relation + '%</span>';
        html += '</div>';

        html += '<div style="font-size:11px;color:#888;">수출: ' + route.importGoods.join(', ') + '</div>';
        html += '<div style="font-size:11px;color:#888;">수입: ' + route.goods.join(', ') + '</div>';
        html += '</div>';
    });

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#4caf50;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawTradeCanvas(); });
}

function drawTradeCanvas() {
    var c = document.getElementById('tradeCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    // Center = our city
    var centerX = W/2, centerY = H/2;

    // Draw trade network
    ctx.fillStyle = '#1a3a1a';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#4caf50';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('내 도시', centerX, centerY+4);

    var angles = [-Math.PI/2, -Math.PI/6, Math.PI/4, Math.PI*2/3, Math.PI*7/6];
    tradeRoutes.forEach(function(route, idx) {
        var angle = angles[idx];
        var dist = 100;
        var px = centerX + Math.cos(angle) * dist;
        var py = centerY + Math.sin(angle) * dist;

        // Trade route line
        if(route.active) {
            ctx.strokeStyle = '#4caf50';
            ctx.lineWidth = 2;
            ctx.setLineDash([6,3]);
        } else {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.setLineDash([4,8]);
        }
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Partner node
        ctx.beginPath();
        ctx.arc(px, py, 22, 0, Math.PI*2);
        ctx.fillStyle = route.active ? 'rgba(76,175,80,0.2)' : 'rgba(51,51,51,0.3)';
        ctx.fill();
        ctx.strokeStyle = route.active ? '#4caf50' : '#555';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = route.active ? '#fff' : '#888';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(route.name.split('(')[0].split('/')[0].trim(), px, py+4);

        ctx.fillStyle = route.active ? '#8bc34a' : '#555';
        ctx.font = '8px sans-serif';
        ctx.fillText(route.relation + '%', px, py+16);
    });
}

function toggleTrade(idx) {
    tradeRoutes[idx].active = !tradeRoutes[idx].active;
    recalcTradeIncome();
    playV13SFX('trade_deal');
    saveV13State();
    openTradePanel();
}

function recalcTradeIncome() {
    tradeIncome = 0;
    tradeRoutes.forEach(function(r) {
        if(r.active) tradeIncome += Math.floor(r.relation * 0.8);
    });
}

// ===================== 3. POPULATION CLASS SIMULATOR =====================
function openPopulationPanel() {
    playV13SFX('population_grow');
    var html = '<div style="max-width:500px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#1a1a3e,#0e0e2e);border:2px solid #9c27b0;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#9c27b0;margin-bottom:4px;">👥 인구 계층 시뮬레이터</h2>';
    html += '<p style="text-align:center;color:#ce93d8;font-size:13px;margin-bottom:12px;">총 인구: ' + popTotal.toLocaleString() + '명</p>';

    html += '<canvas id="popCanvas" width="460" height="300" style="width:100%;border-radius:10px;background:#0a0a14;margin-bottom:12px;"></canvas>';

    var classes = [
        {key:'noble', name:'귀족/양반', icon:'👑', color:'#ffd700', pct:popClasses.noble},
        {key:'merchant', name:'상인/중인', icon:'🏪', color:'#4caf50', pct:popClasses.merchant},
        {key:'farmer', name:'농민/천민', icon:'🌾', color:'#8b6914', pct:popClasses.farmer}
    ];

    classes.forEach(function(cls) {
        var count = Math.floor(popTotal * cls.pct / 100);
        var sat = popSatisfaction[cls.key];
        html += '<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;margin-bottom:8px;border-left:3px solid ' + cls.color + ';">';
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
        html += '<span style="font-size:22px;">' + cls.icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:' + cls.color + ';">' + cls.name + ' (' + cls.pct + '%)</div>';
        html += '<div style="font-size:11px;color:#aaa;">' + count.toLocaleString() + '명 | 세율: ' + taxRate[cls.key] + '%</div>';
        html += '</div>';
        html += '<div style="text-align:right;">';
        html += '<button onclick="adjustTax(&quot;' + cls.key + '&quot;,-5)" style="background:#333;border:1px solid #555;color:#fff;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:12px;">-</button> ';
        html += '<button onclick="adjustTax(&quot;' + cls.key + '&quot;,5)" style="background:#333;border:1px solid #555;color:#fff;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:12px;">+</button>';
        html += '</div></div>';

        // Satisfaction bar
        html += '<div style="display:flex;align-items:center;gap:6px;">';
        html += '<span style="font-size:10px;color:#aaa;min-width:36px;">만족:</span>';
        html += '<div style="flex:1;height:8px;background:#222;border-radius:4px;overflow:hidden;"><div style="width:' + sat + '%;height:100%;background:' + (sat>70?'#4caf50':sat>40?'#ff9800':'#f44336') + ';border-radius:4px;"></div></div>';
        html += '<span style="font-size:10px;color:' + (sat>70?'#4caf50':sat>40?'#ff9800':'#f44336') + ';">' + sat + '%</span>';
        html += '</div></div>';
    });

    html += '<div style="text-align:center;margin-top:8px;">';
    html += '<button onclick="simulatePopGrowth()" style="background:#9c27b0;border:none;color:#fff;padding:6px 18px;border-radius:10px;font-size:12px;cursor:pointer;">📈 인구 성장 시뮬레이션</button>';
    html += '</div>';

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#9c27b0;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawPopCanvas(); });
}

function drawPopCanvas() {
    var c = document.getElementById('popCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    // Population pyramid
    var centerX = W/2;
    var pyramidH = H - 60;
    var maxW = W * 0.35;

    // Noble (top, small)
    var nobleH = pyramidH * popClasses.noble / 100;
    var nobleW = maxW * 0.4;
    ctx.fillStyle = 'rgba(255,215,0,0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX - nobleW, 30 + (pyramidH - nobleH));
    ctx.lineTo(centerX + nobleW, 30 + (pyramidH - nobleH));
    ctx.lineTo(centerX + nobleW * 0.3, 30);
    ctx.lineTo(centerX - nobleW * 0.3, 30);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Merchant (mid)
    var merchantH = pyramidH * popClasses.merchant / 100;
    var merchantW = maxW * 0.7;
    ctx.fillStyle = 'rgba(76,175,80,0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX - merchantW, 30 + pyramidH - nobleH);
    ctx.lineTo(centerX + merchantW, 30 + pyramidH - nobleH);
    ctx.lineTo(centerX + nobleW, 30 + pyramidH - nobleH - merchantH);
    ctx.lineTo(centerX - nobleW, 30 + pyramidH - nobleH - merchantH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Farmer (base, large)
    var farmerH = pyramidH * popClasses.farmer / 100;
    ctx.fillStyle = 'rgba(139,105,20,0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX - maxW, 30 + pyramidH);
    ctx.lineTo(centerX + maxW, 30 + pyramidH);
    ctx.lineTo(centerX + merchantW, 30 + pyramidH - farmerH);
    ctx.lineTo(centerX - merchantW, 30 + pyramidH - farmerH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Labels
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.fillText('👑 귀족 ' + popClasses.noble + '%', centerX, 30 + pyramidH * 0.15);
    ctx.fillStyle = '#4caf50';
    ctx.fillText('🏪 상인 ' + popClasses.merchant + '%', centerX, 30 + pyramidH * 0.45);
    ctx.fillStyle = '#c4923a';
    ctx.fillText('🌾 농민 ' + popClasses.farmer + '%', centerX, 30 + pyramidH * 0.8);

    // Total
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('총 인구: ' + popTotal.toLocaleString() + '명', centerX, H - 10);

    // Side stats: satisfaction bars
    ctx.textAlign = 'left';
    ctx.font = '10px sans-serif';
    var statX = W - 120;
    [{name:'귀족', sat:popSatisfaction.noble, color:'#ffd700'},
     {name:'상인', sat:popSatisfaction.merchant, color:'#4caf50'},
     {name:'농민', sat:popSatisfaction.farmer, color:'#c4923a'}].forEach(function(s, i) {
        var sy = 40 + i * 28;
        ctx.fillStyle = '#888';
        ctx.fillText(s.name + ' 만족도', statX, sy);
        ctx.fillStyle = '#222';
        ctx.fillRect(statX, sy+4, 100, 8);
        ctx.fillStyle = s.sat>70?'#4caf50':s.sat>40?'#ff9800':'#f44336';
        ctx.fillRect(statX, sy+4, s.sat, 8);
        ctx.fillStyle = '#fff';
        ctx.fillText(s.sat+'%', statX+104, sy+12);
    });
}

function adjustTax(cls, delta) {
    taxRate[cls] = Math.max(0, Math.min(50, taxRate[cls] + delta));
    // Satisfaction inversely proportional to tax
    popSatisfaction[cls] = Math.max(10, Math.min(100, 100 - taxRate[cls] * 2 + Math.floor(Math.random()*10)));
    playV13SFX('tax_collect');
    saveV13State();
    openPopulationPanel();
}

function simulatePopGrowth() {
    var avgSat = (popSatisfaction.farmer + popSatisfaction.merchant + popSatisfaction.noble) / 3;
    var growth = Math.floor(popTotal * (avgSat - 40) / 1000);
    if(growth < 0) growth = Math.max(growth, -50);
    popTotal = Math.max(100, popTotal + growth);

    // Class shifts based on prosperity
    if(avgSat > 60 && popClasses.merchant < 30) {
        popClasses.merchant = Math.min(30, popClasses.merchant + 1);
        popClasses.farmer = Math.max(50, popClasses.farmer - 1);
    }
    if(avgSat > 75 && popClasses.noble < 15) {
        popClasses.noble = Math.min(15, popClasses.noble + 1);
        popClasses.merchant = Math.max(10, popClasses.merchant - 1);
    }

    playV13SFX('population_grow');
    if(typeof toast === 'function') toast('📈 인구 ' + (growth>=0?'+':'') + growth + '명 → ' + popTotal.toLocaleString() + '명');
    saveV13State();
    openPopulationPanel();
}

// ===================== 4. DIPLOMATIC SUMMIT =====================
function openDiplomacyPanel() {
    playV13SFX('diplomacy_treaty');
    var html = '<div style="max-width:520px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#1a1a3e,#0e0e20);border:2px solid #2196f3;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#2196f3;margin-bottom:4px;">🤝 외교 회담실</h2>';
    html += '<p style="text-align:center;color:#64b5f6;font-size:13px;margin-bottom:12px;">국제 관계를 관리하고 조약을 체결하세요</p>';

    html += '<canvas id="diplomacyCanvas" width="480" height="240" style="width:100%;border-radius:10px;background:#0a0a14;margin-bottom:12px;"></canvas>';

    diplomacyNations.forEach(function(nation, idx) {
        var relColor = nation.relation > 70 ? '#4caf50' : nation.relation > 40 ? '#ff9800' : '#f44336';
        html += '<div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;margin-bottom:8px;border-left:3px solid ' + relColor + ';">';
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
        html += '<span style="font-size:24px;">' + nation.icon + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:#fff;">' + nation.name + '</div>';
        html += '<div style="font-size:11px;color:#aaa;">조약: ' + nation.treaty + ' | 관계: ' + nation.relation + '%</div>';
        html += '</div></div>';

        // Relation bar
        html += '<div style="height:6px;background:#222;border-radius:3px;overflow:hidden;margin-bottom:8px;"><div style="width:' + nation.relation + '%;height:100%;background:' + relColor + ';border-radius:3px;"></div></div>';

        // Actions
        html += '<div style="display:flex;gap:4px;flex-wrap:wrap;">';
        html += '<button onclick="diplomacyAction(' + idx + ',&quot;gift&quot;)" style="background:#27ae60;border:none;color:#fff;padding:3px 10px;border-radius:8px;font-size:11px;cursor:pointer;">🎁 선물</button>';
        html += '<button onclick="diplomacyAction(' + idx + ',&quot;trade&quot;)" style="background:#2196f3;border:none;color:#fff;padding:3px 10px;border-radius:8px;font-size:11px;cursor:pointer;">📦 교역</button>';
        html += '<button onclick="diplomacyAction(' + idx + ',&quot;alliance&quot;)" style="background:#9c27b0;border:none;color:#fff;padding:3px 10px;border-radius:8px;font-size:11px;cursor:pointer;">🤝 동맹</button>';
        html += '<button onclick="diplomacyAction(' + idx + ',&quot;threat&quot;)" style="background:#c0392b;border:none;color:#fff;padding:3px 10px;border-radius:8px;font-size:11px;cursor:pointer;">⚔️ 위협</button>';
        html += '</div></div>';
    });

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#2196f3;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawDiplomacyCanvas(); });
}

function drawDiplomacyCanvas() {
    var c = document.getElementById('diplomacyCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    var centerX = W/2, centerY = H/2;

    // Our nation at center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(33,150,243,0.2)';
    ctx.fill();
    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#2196f3';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('내 나라', centerX, centerY + 4);

    var angles = [-Math.PI/2, -Math.PI/8, Math.PI/3, Math.PI*3/4, Math.PI*6/5];
    diplomacyNations.forEach(function(n, idx) {
        var a = angles[idx];
        var dist = 90;
        var px = centerX + Math.cos(a) * dist;
        var py = centerY + Math.sin(a) * dist;
        var relColor = n.relation > 70 ? '#4caf50' : n.relation > 40 ? '#ff9800' : '#f44336';

        // Line
        ctx.strokeStyle = relColor;
        ctx.lineWidth = Math.max(1, n.relation / 30);
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Node
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fill();
        ctx.strokeStyle = relColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.name, px, py - 2);
        ctx.fillStyle = relColor;
        ctx.font = '9px sans-serif';
        ctx.fillText(n.relation + '%', px, py + 10);

        if(n.treaty !== '없음') {
            ctx.fillStyle = '#ffd700';
            ctx.font = '8px sans-serif';
            ctx.fillText(n.treaty, px, py + 20);
        }
    });
}

function diplomacyAction(idx, action) {
    var n = diplomacyNations[idx];
    switch(action) {
        case 'gift':
            n.relation = Math.min(100, n.relation + 10);
            if(typeof toast === 'function') toast('🎁 ' + n.name + '에 선물을 보냈습니다! 관계 +10');
            break;
        case 'trade':
            n.relation = Math.min(100, n.relation + 5);
            if(typeof toast === 'function') toast('📦 ' + n.name + '와 교역을 시작했습니다! 관계 +5');
            break;
        case 'alliance':
            if(n.relation >= 60) {
                n.treaty = '동맹';
                n.relation = Math.min(100, n.relation + 15);
                if(typeof toast === 'function') toast('🤝 ' + n.name + '와 동맹을 체결했습니다!');
            } else {
                if(typeof toast === 'function') toast('⚠️ 관계 60% 이상이어야 동맹이 가능합니다!');
            }
            break;
        case 'threat':
            n.relation = Math.max(0, n.relation - 20);
            n.treaty = n.relation < 20 ? '적대' : '없음';
            if(typeof toast === 'function') toast('⚔️ ' + n.name + '를 위협했습니다! 관계 -20');
            break;
    }
    playV13SFX('diplomacy_treaty');
    saveV13State();
    openDiplomacyPanel();
}

// ===================== 5. ERA BGM JUKEBOX =====================
function openBGMPanel() {
    playV13SFX('bgm_play');
    var html = '<div style="max-width:460px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#2a1a2e,#1a0e1e);border:2px solid #e91e63;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#e91e63;margin-bottom:4px;">🎵 시대별 BGM 주크박스</h2>';
    html += '<p style="text-align:center;color:#f48fb1;font-size:13px;margin-bottom:12px;">' + (bgmPlaying ? '🔊 재생 중: ' + bgmTracks[bgmCurrentTrack].name : '🔇 정지됨') + '</p>';

    bgmTracks.forEach(function(track, idx) {
        var isPlaying = bgmPlaying && bgmCurrentTrack === idx;
        html += '<div onclick="playBGM(' + idx + ')" style="display:flex;align-items:center;gap:12px;padding:10px 12px;margin-bottom:4px;border-radius:10px;cursor:pointer;';
        html += 'background:' + (isPlaying ? 'rgba(233,30,99,0.15)' : 'rgba(255,255,255,0.03)') + ';';
        html += 'border-left:3px solid ' + (isPlaying ? '#e91e63' : '#333') + ';">';
        html += '<span style="font-size:24px;">' + (isPlaying ? '🔊' : '🎵') + '</span>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:bold;color:' + (isPlaying ? '#e91e63' : '#ccc') + ';">' + track.name + '</div>';
        html += '<div style="font-size:10px;color:#888;">' + track.era + ' | ' + track.bpm + ' BPM | ' + track.wave + '</div>';
        html += '</div>';
        if(isPlaying) html += '<span style="font-size:10px;color:#e91e63;background:#3a1020;padding:2px 8px;border-radius:8px;">재생중</span>';
        html += '</div>';
    });

    html += '<div style="text-align:center;margin-top:10px;">';
    html += '<button onclick="stopBGM()" style="background:#333;border:1px solid #555;color:#fff;padding:6px 18px;border-radius:10px;font-size:12px;cursor:pointer;">⏹ 정지</button>';
    html += '</div>';

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#e91e63;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html);
}

function playBGM(idx) {
    stopBGM();
    bgmPlaying = true;
    bgmCurrentTrack = idx;
    var track = bgmTracks[idx];
    var ctx = getV13Audio();
    if(!ctx) return;

    var noteIdx = 0;
    var interval = 60000 / track.bpm;

    function playNote() {
        if(!bgmPlaying || bgmCurrentTrack !== idx) return;
        var freq = track.notes[noteIdx % track.notes.length];
        if(freq > 0) {
            var now = ctx.currentTime;
            var o = ctx.createOscillator();
            o.type = track.wave;
            o.frequency.setValueAtTime(freq, now);
            var g = ctx.createGain();
            g.connect(ctx.destination);
            g.gain.setValueAtTime(0.06, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + interval/1000 * 0.9);
            o.connect(g);
            o.start(now);
            o.stop(now + interval/1000);
        }
        noteIdx++;
        bgmTimers.push(setTimeout(playNote, interval));
    }
    playNote();
    playV13SFX('bgm_play');
    openBGMPanel();
}

function stopBGM() {
    bgmPlaying = false;
    bgmCurrentTrack = -1;
    bgmTimers.forEach(function(t) { clearTimeout(t); });
    bgmTimers = [];
}

// ===================== 6. CITY REPUTATION =====================
function openReputationPanel() {
    playV13SFX('reputation_up');
    var total = 0, count = 0;
    for(var k in reputationAxes) { total += reputationAxes[k]; count++; }
    var avg = Math.round(total / count);
    var grade = avg >= 90 ? 'S' : avg >= 75 ? 'A' : avg >= 60 ? 'B' : avg >= 40 ? 'C' : 'D';
    var gradeColor = grade==='S' ? '#ffd700' : grade==='A' ? '#4caf50' : grade==='B' ? '#2196f3' : grade==='C' ? '#ff9800' : '#f44336';

    var html = '<div style="max-width:500px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#1e1e30,#12122a);border:2px solid ' + gradeColor + ';border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:' + gradeColor + ';margin-bottom:4px;">🏆 도시 명성</h2>';
    html += '<p style="text-align:center;font-size:36px;margin:8px 0;"><span style="color:' + gradeColor + ';font-weight:bold;">' + grade + '</span></p>';
    html += '<p style="text-align:center;color:#aaa;font-size:13px;margin-bottom:12px;">종합 점수: ' + avg + '/100</p>';

    html += '<canvas id="reputationCanvas" width="400" height="360" style="width:100%;border-radius:10px;background:#0a0a14;margin-bottom:12px;"></canvas>';

    var axisLabels = {military:'군사력', economy:'경제력', culture:'문화력', diplomacy:'외교력', welfare:'복지', tech:'기술력'};
    var axisIcons = {military:'⚔️', economy:'💰', culture:'🏛️', diplomacy:'🤝', welfare:'❤️', tech:'🔧'};

    for(var key in reputationAxes) {
        var val = reputationAxes[key];
        var axGrade = val >= 90 ? 'S' : val >= 75 ? 'A' : val >= 60 ? 'B' : val >= 40 ? 'C' : 'D';
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:8px;">';
        html += '<span style="font-size:18px;">' + axisIcons[key] + '</span>';
        html += '<span style="min-width:50px;font-size:13px;color:#ccc;">' + axisLabels[key] + '</span>';
        html += '<div style="flex:1;height:8px;background:#222;border-radius:4px;overflow:hidden;"><div style="width:' + val + '%;height:100%;background:' + (val>=75?'#4caf50':val>=50?'#ff9800':'#f44336') + ';border-radius:4px;"></div></div>';
        html += '<span style="min-width:30px;text-align:right;font-size:12px;color:' + (val>=75?'#4caf50':val>=50?'#ff9800':'#f44336') + ';">' + val + '</span>';
        html += '<span style="font-size:11px;color:' + gradeColor + ';min-width:16px;">' + axGrade + '</span>';
        html += '</div>';
    }

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:' + gradeColor + ';border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawReputationCanvas(); });
}

function drawReputationCanvas() {
    var c = document.getElementById('reputationCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    var cx = W/2, cy = H/2;
    var maxR = Math.min(W,H)/2 - 40;
    var axes = Object.keys(reputationAxes);
    var n = axes.length;
    var labels = {military:'군사', economy:'경제', culture:'문화', diplomacy:'외교', welfare:'복지', tech:'기술'};

    // Grid circles
    [0.25, 0.5, 0.75, 1.0].forEach(function(pct) {
        ctx.beginPath();
        for(var i=0; i<=n; i++) {
            var angle = (Math.PI*2/n) * i - Math.PI/2;
            var x = cx + Math.cos(angle) * maxR * pct;
            var y = cy + Math.sin(angle) * maxR * pct;
            if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,' + (pct===1?0.2:0.08) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    // Axis lines + labels
    axes.forEach(function(key, i) {
        var angle = (Math.PI*2/n) * i - Math.PI/2;
        var x = cx + Math.cos(angle) * maxR;
        var y = cy + Math.sin(angle) * maxR;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();

        var lx = cx + Math.cos(angle) * (maxR + 22);
        var ly = cy + Math.sin(angle) * (maxR + 22);
        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[key], lx, ly);
    });

    // Data polygon
    ctx.beginPath();
    axes.forEach(function(key, i) {
        var angle = (Math.PI*2/n) * i - Math.PI/2;
        var val = reputationAxes[key] / 100;
        var x = cx + Math.cos(angle) * maxR * val;
        var y = cy + Math.sin(angle) * maxR * val;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(76,175,80,0.25)';
    ctx.fill();
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    axes.forEach(function(key, i) {
        var angle = (Math.PI*2/n) * i - Math.PI/2;
        var val = reputationAxes[key] / 100;
        var x = cx + Math.cos(angle) * maxR * val;
        var y = cy + Math.sin(angle) * maxR * val;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2);
        ctx.fillStyle = '#4caf50';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}

// ===================== 7. BLUEPRINT PLANNER =====================
function openBlueprintPanel() {
    playV13SFX('blueprint_place');
    var html = '<div style="max-width:520px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#0e1e3e,#081428);border:2px solid #1e90ff;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#1e90ff;margin-bottom:4px;">📐 건축 설계도 플래너</h2>';
    html += '<p style="text-align:center;color:#64b5f6;font-size:13px;margin-bottom:12px;">' + bpSize + 'x' + bpSize + ' 그리드에 도시 배치를 계획하세요</p>';

    // Brush selector
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;justify-content:center;">';
    bpTypes.forEach(function(t) {
        html += '<button onclick="setBpBrush(' + t.id + ')" style="background:' + (bpBrush===t.id ? t.color : '#222') + ';border:1px solid ' + t.color + ';color:#fff;padding:4px 8px;border-radius:6px;font-size:11px;cursor:pointer;">' + t.icon + ' ' + t.name + '</button>';
    });
    html += '</div>';

    html += '<canvas id="blueprintCanvas" width="480" height="480" style="width:100%;border-radius:10px;background:#0a0e1e;margin-bottom:10px;cursor:pointer;"></canvas>';

    // Stats
    var counts = {};
    bpTypes.forEach(function(t) { counts[t.id] = 0; });
    blueprintGrid.forEach(function(v) { counts[v]++; });

    html += '<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:10px;">';
    bpTypes.forEach(function(t) {
        if(t.id === 0) return;
        html += '<span style="font-size:11px;color:' + t.color + ';background:rgba(255,255,255,0.05);padding:2px 8px;border-radius:8px;">' + t.icon + ' ' + counts[t.id] + '</span>';
    });
    html += '</div>';

    html += '<div style="text-align:center;margin-bottom:10px;">';
    html += '<button onclick="clearBlueprint()" style="background:#333;border:1px solid #555;color:#fff;padding:4px 14px;border-radius:8px;font-size:12px;cursor:pointer;">🗑️ 초기화</button> ';
    html += '<button onclick="randomBlueprint()" style="background:#1e90ff;border:none;color:#fff;padding:4px 14px;border-radius:8px;font-size:12px;cursor:pointer;">🎲 랜덤 배치</button>';
    html += '</div>';

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#1e90ff;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawBlueprintCanvas(); setupBlueprintClick(); });
}

function drawBlueprintCanvas() {
    var c = document.getElementById('blueprintCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    var cellW = (W - 20) / bpSize;
    var cellH = (H - 20) / bpSize;
    var ox = 10, oy = 10;

    for(var row=0; row<bpSize; row++) {
        for(var col=0; col<bpSize; col++) {
            var val = blueprintGrid[row * bpSize + col];
            var t = bpTypes[val];
            var x = ox + col * cellW;
            var y = oy + row * cellH;

            // Cell fill
            ctx.fillStyle = val === 0 ? '#111822' : t.color + '44';
            ctx.fillRect(x+1, y+1, cellW-2, cellH-2);

            // Border
            ctx.strokeStyle = val === 0 ? '#1e3050' : t.color;
            ctx.lineWidth = val === 0 ? 0.5 : 1.5;
            ctx.strokeRect(x+1, y+1, cellW-2, cellH-2);

            // Label
            if(val > 0) {
                ctx.fillStyle = '#fff';
                ctx.font = '22px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(t.icon, x + cellW/2, y + cellH/2);
            }
        }
    }

    // Grid coordinates
    ctx.fillStyle = '#556';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    for(var i=0; i<bpSize; i++) {
        ctx.fillText(String.fromCharCode(65+i), ox + i*cellW + cellW/2, 8);
        ctx.textAlign = 'right';
        ctx.fillText(''+(i+1), ox - 2, oy + i*cellH + cellH/2 + 3);
        ctx.textAlign = 'center';
    }
}

function setupBlueprintClick() {
    var c = document.getElementById('blueprintCanvas');
    if(!c) return;
    c.onclick = function(e) {
        var rect = c.getBoundingClientRect();
        var scaleX = c.width / rect.width;
        var scaleY = c.height / rect.height;
        var mx = (e.clientX - rect.left) * scaleX;
        var my = (e.clientY - rect.top) * scaleY;
        var cellW = (c.width - 20) / bpSize;
        var cellH = (c.height - 20) / bpSize;
        var col = Math.floor((mx - 10) / cellW);
        var row = Math.floor((my - 10) / cellH);
        if(col >= 0 && col < bpSize && row >= 0 && row < bpSize) {
            blueprintGrid[row * bpSize + col] = bpBrush;
            playV13SFX('blueprint_place');
            drawBlueprintCanvas();
            saveV13State();
        }
    };
}

function setBpBrush(id) {
    bpBrush = id;
    openBlueprintPanel();
}

function clearBlueprint() {
    for(var i=0; i<bpSize*bpSize; i++) blueprintGrid[i] = 0;
    saveV13State();
    openBlueprintPanel();
}

function randomBlueprint() {
    for(var i=0; i<bpSize*bpSize; i++) {
        var r = ((i*73+37)*131) % 100;
        if(r < 25) blueprintGrid[i] = 1;
        else if(r < 35) blueprintGrid[i] = 2;
        else if(r < 42) blueprintGrid[i] = 3;
        else if(r < 50) blueprintGrid[i] = 4;
        else if(r < 60) blueprintGrid[i] = 5;
        else if(r < 70) blueprintGrid[i] = 6;
        else if(r < 75) blueprintGrid[i] = 7;
        else if(r < 80) blueprintGrid[i] = 8;
        else blueprintGrid[i] = 0;
    }
    playV13SFX('blueprint_place');
    saveV13State();
    openBlueprintPanel();
}

// ===================== 8. HISTORY YEARBOOK DASHBOARD =====================
function openYearbookPanel() {
    playV13SFX('yearbook_open');
    var currentEra = typeof era !== 'undefined' ? era : 0;
    var eraNames = ['고조선','삼국','통일신라','고려','조선 전기','조선 후기','근대'];
    var currentEraName = eraNames[Math.min(currentEra, eraNames.length-1)] || '고조선';

    var goldVal = typeof resources !== 'undefined' ? (resources.gold || 0) : 0;
    var popVal = typeof resources !== 'undefined' ? (resources.pop || 0) : 0;
    var cultureVal = typeof resources !== 'undefined' ? (resources.culture || 0) : 0;
    var buildCount = 0;
    if(typeof grid !== 'undefined') {
        for(var gy=0; gy<(typeof GRID !== 'undefined' ? GRID : 26); gy++) {
            for(var gx=0; gx<(typeof GRID !== 'undefined' ? GRID : 26); gx++) {
                if(grid[gy] && grid[gy][gx] && grid[gy][gx].building) buildCount++;
            }
        }
    }

    // Record yearbook entry
    yearbookData.push({
        era: currentEraName,
        gold: goldVal,
        pop: popVal,
        culture: cultureVal,
        buildings: buildCount,
        trade: tradeIncome,
        reputation: Math.round((reputationAxes.military+reputationAxes.economy+reputationAxes.culture+reputationAxes.diplomacy+reputationAxes.welfare+reputationAxes.tech)/6)
    });
    if(yearbookData.length > 20) yearbookData = yearbookData.slice(-20);

    var html = '<div style="max-width:540px;width:95%;max-height:82vh;overflow-y:auto;background:linear-gradient(145deg,#2a2010,#1a1408);border:2px solid #c4923a;border-radius:16px;padding:20px;color:#eee;">';
    html += '<h2 style="text-align:center;color:#c4923a;margin-bottom:4px;">📊 역사 연감</h2>';
    html += '<p style="text-align:center;color:#d4a84a;font-size:13px;margin-bottom:12px;">현재 시대: ' + currentEraName + '</p>';

    html += '<canvas id="yearbookCanvas" width="500" height="320" style="width:100%;border-radius:10px;background:#0a0a14;margin-bottom:12px;"></canvas>';

    // Current stats summary
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px;">';
    var statCards = [
        {icon:'💰', label:'금화', val:goldVal, color:'#ffd700'},
        {icon:'👥', label:'인구', val:popVal, color:'#4caf50'},
        {icon:'🏛️', label:'문화', val:cultureVal, color:'#9c27b0'},
        {icon:'🏗️', label:'건물', val:buildCount, color:'#2196f3'},
        {icon:'🚢', label:'교역수입', val:tradeIncome, color:'#ff9800'},
        {icon:'🏆', label:'명성', val:yearbookData[yearbookData.length-1].reputation, color:'#e91e63'}
    ];
    statCards.forEach(function(s) {
        html += '<div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px;text-align:center;">';
        html += '<div style="font-size:22px;">' + s.icon + '</div>';
        html += '<div style="font-size:16px;font-weight:bold;color:' + s.color + ';">' + s.val + '</div>';
        html += '<div style="font-size:10px;color:#888;">' + s.label + '</div>';
        html += '</div>';
    });
    html += '</div>';

    // History log
    if(yearbookData.length > 1) {
        html += '<div style="font-size:13px;font-weight:bold;color:#c4923a;margin-bottom:6px;">📜 기록 추이</div>';
        yearbookData.slice(-5).reverse().forEach(function(entry, i) {
            html += '<div style="font-size:11px;color:#aaa;padding:4px 8px;border-left:2px solid #555;margin-bottom:3px;">';
            html += entry.era + ' | 💰' + entry.gold + ' 👥' + entry.pop + ' 🏛️' + entry.culture + ' 🏗️' + entry.buildings + ' 🏆' + entry.reputation;
            html += '</div>';
        });
    }

    html += '<button onclick="this.closest(&quot;.v13-overlay&quot;).classList.remove(&quot;show&quot;)" style="display:block;margin:14px auto 0;background:#c4923a;border:none;color:#fff;padding:8px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">닫기</button>';
    html += '</div>';
    showV13Overlay(html, function() { drawYearbookCanvas(); });
}

function drawYearbookCanvas() {
    var c = document.getElementById('yearbookCanvas');
    if(!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    if(yearbookData.length < 2) {
        ctx.fillStyle = '#555';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('연감을 더 기록하면 추이 차트가 표시됩니다', W/2, H/2);
        return;
    }

    var data = yearbookData.slice(-10);
    var metrics = [
        {key:'gold', label:'금화', color:'#ffd700'},
        {key:'pop', label:'인구', color:'#4caf50'},
        {key:'culture', label:'문화', color:'#9c27b0'},
        {key:'reputation', label:'명성', color:'#e91e63'}
    ];

    var chartX = 50, chartY = 30, chartW = W - 80, chartH = H - 80;

    // Find max for each metric for normalization
    metrics.forEach(function(m) {
        var max = 1;
        data.forEach(function(d) { if(d[m.key] > max) max = d[m.key]; });
        m.max = max;
    });

    // Grid
    for(var gi=0; gi<=4; gi++) {
        var gy = chartY + chartH - (chartH * gi / 4);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
        ctx.fillStyle = '#555';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((gi * 25) + '%', chartX - 4, gy + 3);
    }

    // Lines
    metrics.forEach(function(m) {
        ctx.beginPath();
        data.forEach(function(d, i) {
            var x = chartX + (chartW / (data.length - 1)) * i;
            var y = chartY + chartH - (chartH * d[m.key] / m.max);
            if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Points
        data.forEach(function(d, i) {
            var x = chartX + (chartW / (data.length - 1)) * i;
            var y = chartY + chartH - (chartH * d[m.key] / m.max);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI*2);
            ctx.fillStyle = m.color;
            ctx.fill();
        });
    });

    // X labels
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    data.forEach(function(d, i) {
        var x = chartX + (chartW / (data.length - 1)) * i;
        ctx.fillText(d.era.substring(0,3), x, chartY + chartH + 16);
    });

    // Legend
    var legX = chartX;
    metrics.forEach(function(m, i) {
        var lx = legX + i * 90;
        ctx.fillStyle = m.color;
        ctx.fillRect(lx, H - 16, 12, 8);
        ctx.fillStyle = '#aaa';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(m.label, lx + 16, H - 8);
    });
}

// ===================== QUIZ +15 (130→145) =====================
function hookV13Quiz() {
    if(typeof quizQuestions === 'undefined') return;
    var newQ = [
        {q:'조선시대 세금을 거두는 기관은?', a:['호조','이조','병조','형조'], c:0, cat:'세금'},
        {q:'고려시대 국제 무역항은?', a:['벽란도','합포','김해','나주'], c:0, cat:'무역'},
        {q:'조선의 인구 중 가장 많은 계층은?', a:['농민','양반','중인','천민'], c:0, cat:'인구'},
        {q:'삼국시대 외교에서 &quot;조공&quot;의 의미는?', a:['공물을 바침','전쟁 선포','영토 교환','혼인 동맹'], c:0, cat:'외교'},
        {q:'조선시대 음악을 담당한 기관은?', a:['장악원','승문원','교서관','사역원'], c:0, cat:'음악'},
        {q:'고구려의 수도 평양성의 다른 이름은?', a:['장안성','한성','웅진','금성'], c:0, cat:'도시'},
        {q:'조선 세종 때 만든 측우기의 용도는?', a:['강우량 측정','풍속 측정','온도 측정','습도 측정'], c:0, cat:'기술'},
        {q:'신라의 골품제에서 최고 등급은?', a:['성골','진골','6두품','5두품'], c:0, cat:'계층'},
        {q:'고려시대 최초의 금속활자 인쇄물은?', a:['직지심체요절','무구정광대다라니경','팔만대장경','삼국사기'], c:0, cat:'기술'},
        {q:'조선시대 한양의 4대문 중 남쪽 문은?', a:['숭례문','흥인지문','돈의문','숙정문'], c:0, cat:'건축'},
        {q:'백제의 해상무역 주요 교역국은?', a:['중국 남조','일본','신라','가야'], c:0, cat:'무역'},
        {q:'조선시대 왕위 계승 순서를 기록한 것은?', a:['왕세자 책봉','과거 시험','추대','선양'], c:0, cat:'왕조'},
        {q:'고조선의 건국 이념 &quot;홍익인간&quot;의 뜻은?', a:['널리 인간을 이롭게','하늘의 뜻을 따름','강한 나라','평화통일'], c:0, cat:'이념'},
        {q:'조선 정조가 건설한 수원의 성은?', a:['화성','남한산성','북한산성','공산성'], c:0, cat:'건축'},
        {q:'삼국시대 철기 생산의 중심지는?', a:['가야','백제','신라','고구려'], c:0, cat:'경제'}
    ];
    if(Array.prototype.shuffle) {
        newQ.forEach(function(q) { q.a.shuffle(); });
    }
    newQ.forEach(function(q) { quizQuestions.push(q); });
}

// ===================== ACHIEVEMENTS +12 (122→134) =====================
function hookV13Achievements() {
    if(typeof achievements === 'undefined') return;
    var newAch = [
        {id:'dynasty_first', icon:'👑', title:'왕조의 시작', desc:'첫 번째 왕을 확인하세요', check:function(){ return currentKingIdx >= 0; }},
        {id:'dynasty_5kings', icon:'🏰', title:'다섯 왕의 시대', desc:'5명의 왕을 해금하세요', check:function(){ return currentKingIdx >= 4; }},
        {id:'trade_first', icon:'🚢', title:'첫 교역', desc:'첫 무역로를 개통하세요', check:function(){ return tradeRoutes.some(function(r){return r.active;}); }},
        {id:'trade_all', icon:'🌍', title:'실크로드의 왕', desc:'모든 무역로를 개통하세요', check:function(){ return tradeRoutes.every(function(r){return r.active;}); }},
        {id:'pop_5000', icon:'👥', title:'번영하는 도시', desc:'인구 5,000명 달성', check:function(){ return popTotal >= 5000; }},
        {id:'diplomacy_ally', icon:'🤝', title:'외교의 달인', desc:'동맹을 체결하세요', check:function(){ return diplomacyNations.some(function(n){return n.treaty==='동맹';}); }},
        {id:'diplomacy_3ally', icon:'🕊️', title:'평화의 사도', desc:'3국 이상과 동맹하세요', check:function(){ return diplomacyNations.filter(function(n){return n.treaty==='동맹';}).length >= 3; }},
        {id:'bgm_listener', icon:'🎵', title:'음악 감상가', desc:'BGM을 재생하세요', check:function(){ return bgmPlaying; }},
        {id:'reputation_B', icon:'🏆', title:'명성의 도시', desc:'도시 명성 B등급 이상', check:function(){ var t=0,c=0; for(var k in reputationAxes){t+=reputationAxes[k];c++;} return (t/c)>=60; }},
        {id:'blueprint_fill', icon:'📐', title:'건축 설계사', desc:'설계도를 절반 이상 채우세요', check:function(){ var f=0; blueprintGrid.forEach(function(v){if(v>0)f++;}); return f >= bpSize*bpSize/2; }},
        {id:'yearbook_5', icon:'📊', title:'역사 기록관', desc:'연감을 5회 이상 기록하세요', check:function(){ return yearbookData.length >= 5; }},
        {id:'v13_explorer', icon:'🌟', title:'v13 탐험가', desc:'v13의 모든 기능을 열어보세요', check:function(){ return v13Features && Object.keys(v13Features).length >= 8; }}
    ];
    newAch.forEach(function(a) {
        var exists = false;
        achievements.forEach(function(e) { if(e.id === a.id) exists = true; });
        if(!exists) achievements.push(a);
    });
}

function hookV13CheckAchievements() {
    if(typeof checkAchievements !== 'function') return;
    var origCheck = checkAchievements;
    checkAchievements = function() {
        origCheck();
        if(typeof achievements === 'undefined' || typeof unlockedAch === 'undefined') return;
        achievements.forEach(function(a) {
            if(!unlockedAch.has(a.id) && a.check && a.check()) {
                unlockedAch.add(a.id);
                if(typeof showAchievementToast === 'function') showAchievementToast(a);
                playV13SFX('achieve_v13');
            }
        });
    };
}

// ===================== ADVISOR TIPS =====================
function hookV13AdvisorTips() {
    if(typeof advisorTips === 'undefined') return;
    var newTips = [
        '👑 왕조 계승에서 역대 왕의 버프를 확인하세요!',
        '🚢 무역로를 개통하면 매 턴 추가 금화를 얻습니다.',
        '👥 세율을 조절하여 계층별 만족도를 관리하세요.',
        '🤝 관계 60% 이상이면 동맹을 체결할 수 있습니다.',
        '🎵 주크박스에서 시대별 BGM을 감상하세요.',
        '🏆 6가지 명성 축을 고르게 발전시키면 S등급!',
        '📐 설계도에서 도시 배치를 미리 계획하세요.',
        '📊 연감을 자주 기록하면 발전 추이를 확인할 수 있습니다.'
    ];
    newTips.forEach(function(t) { advisorTips.push(t); });
}

// ===================== GAME TICK HOOK =====================
function hookV13GameTick() {
    if(typeof window.gameTick !== 'function') return;
    var origTick = window.gameTick;
    window.gameTick = function() {
        origTick();
        // Add trade income
        if(typeof resources !== 'undefined' && tradeIncome > 0) {
            resources.gold = (resources.gold || 0) + tradeIncome;
        }

        // Population passive growth
        if(typeof resources !== 'undefined') {
            var avgSat = (popSatisfaction.farmer + popSatisfaction.merchant + popSatisfaction.noble) / 3;
            if(avgSat > 50) {
                popTotal += Math.floor((avgSat - 50) / 10);
            }
        }

        // Dynasty auto-advance with era
        if(typeof era !== 'undefined') {
            var targetKing = Math.min(era * 2, dynastyKings.length - 1);
            if(targetKing > currentKingIdx) {
                currentKingIdx = targetKing;
                dynastyHistory.push('👑 ' + dynastyKings[targetKing].name + ' 자동 즉위 (' + dynastyKings[targetKing].era + ')');
                if(typeof toast === 'function') toast('👑 새로운 왕 ' + dynastyKings[targetKing].name + ' 즉위!');
                playV13SFX('dynasty_crown');
            }
        }

        // Reputation auto-update
        if(typeof resources !== 'undefined') {
            reputationAxes.economy = Math.min(100, Math.max(10, Math.floor((resources.gold || 0) / 50)));
            reputationAxes.culture = Math.min(100, Math.max(10, Math.floor((resources.culture || 0) / 30)));
            reputationAxes.welfare = Math.min(100, Math.max(10, Math.floor(((popSatisfaction.farmer + popSatisfaction.merchant + popSatisfaction.noble) / 3))));
        }
        var activeAlliances = diplomacyNations.filter(function(n){return n.treaty==='동맹';}).length;
        reputationAxes.diplomacy = Math.min(100, 30 + activeAlliances * 15);
        var activeTrades = tradeRoutes.filter(function(r){return r.active;}).length;
        reputationAxes.tech = Math.min(100, 30 + activeTrades * 10 + (typeof era !== 'undefined' ? era * 8 : 0));
        if(typeof grid !== 'undefined') {
            var milBuildings = 0;
            for(var my=0; my<(typeof GRID !== 'undefined'?GRID:26); my++) {
                for(var mx=0; mx<(typeof GRID !== 'undefined'?GRID:26); mx++) {
                    if(grid[my] && grid[my][mx] && grid[my][mx].building) {
                        var b = grid[my][mx].building;
                        if(b.cat === 'military' || b.name === '성벽' || b.name === '봉수대' || b.name === '병영') milBuildings++;
                    }
                }
            }
            reputationAxes.military = Math.min(100, 20 + milBuildings * 5);
        }
    };
}

// ===================== UI =====================
function addV13UI() {
    // Bottom scroll nav bar
    var navBar = document.createElement('div');
    navBar.id = 'v13-nav';
    navBar.style.cssText = 'position:fixed;bottom:90px;left:0;right:0;z-index:15;display:flex;overflow-x:auto;gap:4px;padding:4px 8px;scrollbar-width:none;';
    navBar.innerHTML = '<style>#v13-nav::-webkit-scrollbar{display:none}</style>';

    var btns = [
        {icon:'👑', label:'왕조', fn:'openDynastyPanel'},
        {icon:'🚢', label:'무역', fn:'openTradePanel'},
        {icon:'👥', label:'인구', fn:'openPopulationPanel'},
        {icon:'🤝', label:'외교', fn:'openDiplomacyPanel'},
        {icon:'🎵', label:'BGM', fn:'openBGMPanel'},
        {icon:'🏆', label:'명성', fn:'openReputationPanel'},
        {icon:'📐', label:'설계', fn:'openBlueprintPanel'},
        {icon:'📊', label:'연감', fn:'openYearbookPanel'}
    ];

    btns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.style.cssText = 'flex-shrink:0;background:rgba(0,0,0,0.8);border:1px solid #555;color:#fff;padding:4px 10px;border-radius:8px;font-size:11px;cursor:pointer;white-space:nowrap;';
        btn.innerHTML = b.icon + ' ' + b.label;
        btn.onclick = function() {
            v13Features[b.fn] = true;
            window[b.fn]();
        };
        navBar.appendChild(btn);
    });
    document.body.appendChild(navBar);

    // Overlay container
    var overlay = document.createElement('div');
    overlay.className = 'v13-overlay';
    overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:200;justify-content:center;align-items:center;padding:10px;';
    overlay.id = 'v13-overlay';
    document.body.appendChild(overlay);
}

function showV13Overlay(html, afterRender) {
    var overlay = document.getElementById('v13-overlay');
    if(!overlay) return;
    overlay.innerHTML = html;
    overlay.style.display = 'flex';
    overlay.classList.add('show');
    overlay.onclick = function(e) {
        if(e.target === overlay) overlay.classList.remove('show');
    };
    if(afterRender) setTimeout(afterRender, 50);

    // Close on overlay hide
    var obs = new MutationObserver(function() {
        if(!overlay.classList.contains('show')) {
            overlay.style.display = 'none';
            obs.disconnect();
        }
    });
    obs.observe(overlay, {attributes:true, attributeFilter:['class']});
}

// ===================== KEYBOARD SHORTCUTS =====================
function hookV13Keyboard() {
    document.addEventListener('keydown', function(e) {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if(!e.shiftKey) return;
        switch(e.key.toUpperCase()) {
            case 'Z': v13Features.openDynastyPanel=true; openDynastyPanel(); break;
            case 'X': v13Features.openTradePanel=true; openTradePanel(); break;
            case 'N': v13Features.openPopulationPanel=true; openPopulationPanel(); break;
            case 'H': v13Features.openDiplomacyPanel=true; openDiplomacyPanel(); break;
            case 'J': v13Features.openBGMPanel=true; openBGMPanel(); break;
            case 'U': v13Features.openReputationPanel=true; openReputationPanel(); break;
            case 'B': v13Features.openBlueprintPanel=true; openBlueprintPanel(); break;
            case 'I': v13Features.openYearbookPanel=true; openYearbookPanel(); break;
        }
    });
}

// ===================== AUTO SAVE =====================
function hookV13AutoSave() {
    setInterval(function() { saveV13State(); }, 30000);
}

// ===================== STATE MANAGEMENT =====================
function initV13State() {
    v13Features = {};
}

function saveV13State() {
    try {
        var state = {
            king: currentKingIdx,
            dynastyHistory: dynastyHistory.slice(-20),
            trade: tradeRoutes.map(function(r){ return {active:r.active, relation:r.relation}; }),
            tradeIncome: tradeIncome,
            popClasses: popClasses,
            popSatisfaction: popSatisfaction,
            popTotal: popTotal,
            diplomacy: diplomacyNations.map(function(n){ return {relation:n.relation, treaty:n.treaty}; }),
            reputation: reputationAxes,
            blueprint: blueprintGrid,
            yearbook: yearbookData.slice(-20),
            taxRate: taxRate,
            upgrades: cityUpgrades,
            features: v13Features
        };
        localStorage.setItem('cityV13State', JSON.stringify(state));
    } catch(e) {}
}

function loadV13State() {
    try {
        var raw = localStorage.getItem('cityV13State');
        if(!raw) return;
        var state = JSON.parse(raw);
        if(typeof state.king === 'number') currentKingIdx = state.king;
        if(state.dynastyHistory) dynastyHistory = state.dynastyHistory;
        if(state.trade) {
            state.trade.forEach(function(t, i) {
                if(tradeRoutes[i]) {
                    tradeRoutes[i].active = t.active;
                    tradeRoutes[i].relation = t.relation;
                }
            });
        }
        if(typeof state.tradeIncome === 'number') tradeIncome = state.tradeIncome;
        if(state.popClasses) popClasses = state.popClasses;
        if(state.popSatisfaction) popSatisfaction = state.popSatisfaction;
        if(typeof state.popTotal === 'number') popTotal = state.popTotal;
        if(state.diplomacy) {
            state.diplomacy.forEach(function(d, i) {
                if(diplomacyNations[i]) {
                    diplomacyNations[i].relation = d.relation;
                    diplomacyNations[i].treaty = d.treaty;
                }
            });
        }
        if(state.reputation) { for(var k in state.reputation) reputationAxes[k] = state.reputation[k]; }
        if(state.blueprint) blueprintGrid = state.blueprint;
        if(state.yearbook) yearbookData = state.yearbook;
        if(state.taxRate) taxRate = state.taxRate;
        if(state.upgrades) cityUpgrades = state.upgrades;
        if(state.features) v13Features = state.features;
        recalcTradeIncome();
    } catch(e) {}
}

// ===================== GLOBAL EXPOSE =====================
window.openDynastyPanel = openDynastyPanel;
window.selectKing = selectKing;
window.openTradePanel = openTradePanel;
window.toggleTrade = toggleTrade;
window.openPopulationPanel = openPopulationPanel;
window.adjustTax = adjustTax;
window.simulatePopGrowth = simulatePopGrowth;
window.openDiplomacyPanel = openDiplomacyPanel;
window.diplomacyAction = diplomacyAction;
window.openBGMPanel = openBGMPanel;
window.playBGM = playBGM;
window.stopBGM = stopBGM;
window.openReputationPanel = openReputationPanel;
window.openBlueprintPanel = openBlueprintPanel;
window.setBpBrush = setBpBrush;
window.clearBlueprint = clearBlueprint;
window.randomBlueprint = randomBlueprint;
window.openYearbookPanel = openYearbookPanel;

// ===================== INIT =====================
function initV13() {
    initV13State();
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
            toast('👑 v13.0: 왕조계승+무역로+인구계층+외교회담+BGM주크박스+도시명성+설계도+연감!');
        }, 10000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV13, 3500); });
} else {
    setTimeout(initV13, 3500);
}

})();
