// =====================================================================
// city-builder v21_patch.js — PRIME Holdings NEXTERA+PRISM v21.0
// Self-contained IIFE patch:
// 1. 도시범죄율분석기 Canvas 620x400 (8구역 범죄유형 히트맵+치안부대 배치)
// 2. 왕실세금정책시뮬레이터 Canvas 600x380 (6종 세금 세율조절 바차트+듀얼라인)
// 3. 도시성장타임라인 Canvas 640x380 (6시대 인구/면적/건물수 3축 라인차트)
// 4. 전염병확산시뮬레이터 Canvas 620x400 (8x8 SIR모델 확산+방역조치)
// 5. 도시토지이용계획도 Canvas 620x380 (8종 용도 도넛차트+8x8 존닝그리드)
// 6. 왕실군사배치도 Canvas 620x400 (8병종 6축 Radar+방어선 배치)
// 7. 고대무역로네트워크 Canvas 640x400 (8도시 교역량 네트워크그래프)
// 8. 도시발전성적표 Canvas 600x380 (8카테고리 반원게이지+종합점수)
// +15 Quiz (250→265), +12 Achievements (218→230),
// SFX 15, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v21Ctx = null;
function getV21Audio() {
    if(!v21Ctx) {
        try { v21Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v21Ctx;
}
function playV21SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV21Audio();
    if(!ctx) return;
    var now = ctx.currentTime;
    function tone(freq, start, dur, wave, vol) {
        var o = ctx.createOscillator(); o.type = wave || 'sine';
        o.frequency.setValueAtTime(freq, now + start);
        var g = ctx.createGain(); g.connect(ctx.destination);
        g.gain.setValueAtTime(vol || 0.08, now + start);
        g.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
        o.connect(g); o.start(now + start); o.stop(now + start + dur);
    }
    switch(type) {
        case 'crime_scan':
            tone(220, 0, 0.15, 'square', 0.05);
            tone(277, 0.1, 0.15, 'square', 0.05);
            tone(330, 0.2, 0.2, 'sine', 0.06);
            break;
        case 'crime_arrest':
            [440,554,659,784].forEach(function(f,i){ tone(f, i*0.06, 0.15, 'sine', 0.07); });
            break;
        case 'tax_adjust':
            tone(349, 0, 0.12, 'triangle', 0.06);
            tone(392, 0.1, 0.12, 'triangle', 0.06);
            tone(440, 0.2, 0.15, 'sine', 0.07);
            break;
        case 'tax_collect':
            [523,587,659,784,880].forEach(function(f,i){ tone(f, i*0.07, 0.18, 'sine', 0.07); });
            break;
        case 'growth_milestone':
            tone(262, 0, 0.2, 'sine', 0.07);
            tone(330, 0.15, 0.2, 'sine', 0.07);
            tone(392, 0.3, 0.25, 'triangle', 0.08);
            tone(523, 0.5, 0.35, 'sine', 0.09);
            break;
        case 'epidemic_spread':
            tone(165, 0, 0.3, 'sawtooth', 0.05);
            tone(196, 0.15, 0.25, 'sawtooth', 0.04);
            tone(147, 0.35, 0.3, 'square', 0.04);
            break;
        case 'epidemic_cure':
            [392,494,587,659,784].forEach(function(f,i){ tone(f, i*0.08, 0.2, 'sine', 0.08); });
            break;
        case 'zoning_plan':
            tone(330, 0, 0.1, 'square', 0.05);
            tone(392, 0.08, 0.1, 'square', 0.05);
            tone(494, 0.16, 0.15, 'sine', 0.06);
            break;
        case 'military_deploy':
            tone(196, 0, 0.15, 'sawtooth', 0.06);
            tone(262, 0.1, 0.15, 'square', 0.06);
            tone(330, 0.2, 0.2, 'sine', 0.07);
            break;
        case 'military_march':
            [196,220,262,294,330,392].forEach(function(f,i){ tone(f, i*0.1, 0.15, 'square', 0.05); });
            break;
        case 'trade_flow':
            [262,330,392,440,494,523].forEach(function(f,i){ tone(f, i*0.09, 0.22, 'sine', 0.06); });
            break;
        case 'grade_calc':
            tone(523, 0, 0.12, 'triangle', 0.07);
            tone(659, 0.1, 0.12, 'triangle', 0.07);
            tone(784, 0.2, 0.18, 'sine', 0.08);
            break;
        case 'quiz_v21':
            tone(523, 0, 0.12, 'sine', 0.08);
            tone(659, 0.08, 0.12, 'sine', 0.08);
            tone(784, 0.16, 0.2, 'sine', 0.09);
            break;
        case 'quiz_wrong_v21':
            tone(330, 0, 0.2, 'sawtooth', 0.06);
            tone(262, 0.15, 0.3, 'sawtooth', 0.05);
            break;
        case 'achieve_v21':
            [523,659,784,1047,784,1047,1319].forEach(function(f,i){ tone(f, i*0.07, 0.22, 'sine', 0.08); });
            break;
    }
}

// ===================== STATE =====================
var v21State = {
    crime: { grid: [], deployments: 0, totalArrests: 0, avgRate: 50 },
    tax: { rates: {}, revenue: 1000, morale: 60, adjustments: 0 },
    growth: { currentEra: 0, milestones: 0, viewed: {} },
    epidemic: { grid: [], day: 0, measures: 0, infected: 0, cured: 0 },
    zoning: { grid: [], allocations: {}, totalPlanned: 0 },
    military: { units: {}, deployments: 0, defenseLevel: 50 },
    trade: { routes: {}, totalVolume: 0, connections: 0 },
    grade: { scores: {}, totalScore: 0, evaluations: 0 },
    quiz: { answered: 0, correct: 0 },
    achievements: {}
};

// ===================== DATA =====================
var CRIME_ZONES = [
    { id: 'palace', name: '궁궐', icon: '🏯', color: '#F44336' },
    { id: 'market', name: '시장', icon: '🏪', color: '#FF9800' },
    { id: 'residential', name: '주거지', icon: '🏘️', color: '#4CAF50' },
    { id: 'gate', name: '성문', icon: '🚪', color: '#2196F3' },
    { id: 'port', name: '항구', icon: '⚓', color: '#00BCD4' },
    { id: 'fortress', name: '산성', icon: '🏰', color: '#795548' },
    { id: 'farmland', name: '농지', icon: '🌾', color: '#8BC34A' },
    { id: 'temple', name: '사찰', icon: '🛕', color: '#9C27B0' }
];
var CRIME_TYPES = ['절도', '방화', '밀매', '사기', '폭행', '반란'];

var TAX_TYPES = [
    { id: 'land', name: '토지세', icon: '🏞️', color: '#4CAF50', base: 15 },
    { id: 'head', name: '인두세', icon: '👤', color: '#2196F3', base: 12 },
    { id: 'tribute', name: '공납', icon: '🎁', color: '#FF9800', base: 18 },
    { id: 'labor', name: '역', icon: '⛏️', color: '#795548', base: 10 },
    { id: 'customs', name: '관세', icon: '🚢', color: '#00BCD4', base: 20 },
    { id: 'special', name: '특별세', icon: '👑', color: '#9C27B0', base: 8 }
];

var GROWTH_ERAS = [
    { id: 'gojoseon', name: '고조선', period: 'BC 2333~108', pop: 5000, area: 20, buildings: 15, milestone: '단군 건국' },
    { id: 'samguk', name: '삼국시대', period: '57BC~668', pop: 35000, area: 80, buildings: 120, milestone: '삼국 정립' },
    { id: 'unified', name: '통일신라', period: '668~935', pop: 80000, area: 150, buildings: 350, milestone: '삼국 통일' },
    { id: 'goryeo', name: '고려', period: '918~1392', pop: 150000, area: 250, buildings: 800, milestone: '고려 건국' },
    { id: 'joseon', name: '조선', period: '1392~1897', pop: 500000, area: 450, buildings: 2500, milestone: '한양 천도' },
    { id: 'modern', name: '근대', period: '1897~1945', pop: 1200000, area: 700, buildings: 6000, milestone: '근대화 개혁' }
];

var ZONING_TYPES = [
    { id: 'residential', name: '주거', icon: '🏘️', color: '#4CAF50' },
    { id: 'commercial', name: '상업', icon: '🏪', color: '#FF9800' },
    { id: 'agricultural', name: '농업', icon: '🌾', color: '#8BC34A' },
    { id: 'military_z', name: '군사', icon: '⚔️', color: '#F44336' },
    { id: 'religious', name: '종교', icon: '🛕', color: '#9C27B0' },
    { id: 'admin', name: '행정', icon: '🏛️', color: '#3F51B5' },
    { id: 'industrial', name: '공업', icon: '🔨', color: '#607D8B' },
    { id: 'green', name: '녹지', icon: '🌳', color: '#2E7D32' }
];

var MILITARY_UNITS = [
    { id: 'infantry', name: '보병', icon: '🗡️', color: '#F44336' },
    { id: 'archer', name: '궁병', icon: '🏹', color: '#FF9800' },
    { id: 'cavalry', name: '기병', icon: '🐎', color: '#795548' },
    { id: 'navy', name: '수군', icon: '⛵', color: '#2196F3' },
    { id: 'siege', name: '공성', icon: '🪨', color: '#607D8B' },
    { id: 'scout', name: '척후', icon: '👁️', color: '#4CAF50' },
    { id: 'guard', name: '호위', icon: '🛡️', color: '#9C27B0' },
    { id: 'monk', name: '승병', icon: '📿', color: '#FF5722' }
];

var TRADE_CITIES = [
    { id: 'capital', name: '수도', x: 0.5, y: 0.4, color: '#F44336' },
    { id: 'south_sea', name: '남해', x: 0.5, y: 0.85, color: '#FF9800' },
    { id: 'east_sea', name: '동해', x: 0.85, y: 0.35, color: '#4CAF50' },
    { id: 'west_sea', name: '서해', x: 0.15, y: 0.45, color: '#2196F3' },
    { id: 'central', name: '중원', x: 0.5, y: 0.6, color: '#9C27B0' },
    { id: 'north', name: '북방', x: 0.5, y: 0.15, color: '#00BCD4' },
    { id: 'mountain', name: '산간', x: 0.75, y: 0.6, color: '#795548' },
    { id: 'border', name: '변경', x: 0.25, y: 0.2, color: '#607D8B' }
];

var GRADE_CATEGORIES = [
    { id: 'economy', name: '경제', icon: '💰', color: '#FFD700' },
    { id: 'military_g', name: '군사', icon: '⚔️', color: '#F44336' },
    { id: 'culture', name: '문화', icon: '🎭', color: '#9C27B0' },
    { id: 'population', name: '인구', icon: '👥', color: '#4CAF50' },
    { id: 'technology', name: '기술', icon: '⚙️', color: '#2196F3' },
    { id: 'diplomacy', name: '외교', icon: '🤝', color: '#FF9800' },
    { id: 'welfare', name: '복지', icon: '❤️', color: '#E91E63' },
    { id: 'infra', name: '인프라', icon: '🏗️', color: '#607D8B' }
];

var V21_QUIZ = [
    { q: '조선시대 포도청의 주요 임무는?', options: ['범죄 수사와 치안','세금 징수','군사 훈련','외교 업무'], answer: 0 },
    { q: '고려시대 주요 세금 제도인 &quot;조용조&quot;의 &quot;조&quot;는?', options: ['인두세','토지세','공납','역역'], answer: 1 },
    { q: '조선 세종대왕 시기 인구는 약 몇 명으로 추정되는가?', options: ['약 100만','약 500만','약 1000만','약 2000만'], answer: 2 },
    { q: '조선시대 전염병 &quot;온역&quot;에 대한 대응 기관은?', options: ['혜민서','사헌부','의금부','홍문관'], answer: 0 },
    { q: '한양도성의 토지이용에서 종묘는 어떤 용도인가?', options: ['주거','상업','종교/제례','군사'], answer: 2 },
    { q: '조선시대 5군영 체제에 포함되지 않는 것은?', options: ['훈련도감','어영청','금위영','별무반'], answer: 3 },
    { q: '고려시대 벽란도는 어떤 역할을 하였는가?', options: ['군사 요충지','국제 무역항','왕실 별궁','불교 성지'], answer: 1 },
    { q: '조선시대 &quot;환곡&quot; 제도의 원래 목적은?', options: ['곡물 대여 및 구호','세금 징수','무역 촉진','군량 비축'], answer: 0 },
    { q: '삼국시대 화랑도의 기능에 해당하지 않는 것은?', options: ['군사 훈련','인재 양성','세금 징수','심신 수련'], answer: 2 },
    { q: '조선시대 &quot;대동법&quot;은 어떤 세금을 개혁한 것인가?', options: ['토지세','공납','인두세','관세'], answer: 1 },
    { q: '고려시대 몽골 침입 당시 전염병이 확산된 주요 원인은?', options: ['전쟁으로 인한 위생 악화','해외 무역','기후 변화','음식 문화'], answer: 0 },
    { q: '조선 정조의 수원화성은 어떤 도시계획 개념을 반영하는가?', options: ['군사+상업 복합도시','종교 도시','농업 전문 도시','해양 도시'], answer: 0 },
    { q: '신라의 &quot;골품제&quot;가 도시 토지이용에 미친 영향은?', options: ['신분별 거주지 제한','자유 거주','토지 공유','외국인 우대'], answer: 0 },
    { q: '고구려 광개토대왕의 군사적 업적 중 가장 대표적인 것은?', options: ['영토 대확장','해군 창설','화약 발명','성곽 표준화'], answer: 0 },
    { q: '조선시대 &quot;장시&quot;(5일장)의 경제적 역할은?', options: ['지역간 물자 교환','세금 징수','군사 훈련','종교 행사'], answer: 0 }
];

var V21_ACHIEVEMENTS = [
    { id: 'crime_analyst', name: '범죄 분석관', desc: '범죄율 분석 첫 스캔 완료', icon: '🔍' },
    { id: 'tax_optimizer', name: '세금 최적화자', desc: '세수 5000 이상 달성', icon: '💰' },
    { id: 'growth_historian', name: '성장 역사가', desc: '6시대 전체 타임라인 열람', icon: '📜' },
    { id: 'epidemic_controller', name: '전염병 통제자', desc: '감염률 10% 이하 달성', icon: '💊' },
    { id: 'zoning_master', name: '도시계획 전문가', desc: '8종 용도 전부 배치', icon: '🗺️' },
    { id: 'military_commander', name: '군사 총사령관', desc: '8병종 전부 배치 완료', icon: '⚔️' },
    { id: 'trade_networker', name: '무역 네트워크 구축자', desc: '교역량 10000 돌파', icon: '🚢' },
    { id: 'grade_achiever', name: '도시 S등급 달성', desc: '종합 점수 80점 이상', icon: '🏅' },
    { id: 'crime_preventer', name: '치안 유지자', desc: '평균 범죄율 20% 이하', icon: '🛡️' },
    { id: 'quiz_v21_master', name: 'v21 퀴즈 마스터', desc: 'v21 퀴즈 전부 정답', icon: '🏆' },
    { id: 'v21_explorer', name: 'v21 탐험가', desc: '4개 이상 섹션 체험', icon: '🧭' },
    { id: 'v21_complete', name: 'v21 완전 정복', desc: '8개 섹션 모두 체험', icon: '🌟' }
];

// ===================== ACHIEVEMENT CHECK =====================
function checkV21Achievement(id) {
    if(v21State.achievements[id]) return;
    v21State.achievements[id] = true;
    var ach = V21_ACHIEVEMENTS.find(function(a){ return a.id === id; });
    if(!ach) return;
    playV21SFX('achieve_v21');
    if(typeof showAchievementToast === 'function') {
        showAchievementToast(ach.icon + ' ' + ach.name, ach.desc);
    } else {
        var toast = document.createElement('div');
        toast.className = 'ach-toast';
        toast.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + ach.icon + ' ' + ach.name + '</div><div class="a-desc">' + ach.desc + '</div>';
        document.body.appendChild(toast);
        setTimeout(function(){ if(toast.parentNode) toast.parentNode.removeChild(toast); }, 4500);
    }
}

// ===================== CANVAS RENDERERS =====================

// 1. Crime Rate Analyzer
function renderCrimeAnalyzer(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 범죄율 분석기', W/2, 24);

    var zones = CRIME_ZONES;
    var types = CRIME_TYPES;
    var cellW = 68, cellH = 38;
    var startX = (W - types.length * cellW) / 2;
    var startY = 55;

    if(v21State.crime.grid.length === 0) {
        for(var r = 0; r < zones.length; r++) {
            v21State.crime.grid[r] = [];
            for(var c = 0; c < types.length; c++) {
                var base = (r === 1 || r === 4) ? 45 : 20;
                if(c === 0 || c === 4) base += 15;
                v21State.crime.grid[r][c] = Math.min(100, Math.max(5, base + Math.floor(Math.random() * 35)));
            }
        }
    }

    ctx.font = '10px sans-serif'; ctx.fillStyle = '#aaa'; ctx.textAlign = 'center';
    for(var t = 0; t < types.length; t++) {
        ctx.fillText(types[t], startX + t * cellW + cellW / 2, startY - 5);
    }
    ctx.textAlign = 'right';
    for(var z = 0; z < zones.length; z++) {
        ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif';
        ctx.fillText(zones[z].icon, startX - 22, startY + z * cellH + cellH / 2 + 2);
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif';
        ctx.fillText(zones[z].name, startX - 6, startY + z * cellH + cellH / 2 + 4);
    }

    for(var row = 0; row < zones.length; row++) {
        for(var col = 0; col < types.length; col++) {
            var val = v21State.crime.grid[row][col];
            var r2 = Math.min(255, Math.floor(val * 2.55));
            var g2 = Math.min(255, Math.floor((100 - val) * 2.55));
            ctx.fillStyle = 'rgba(' + r2 + ',' + g2 + ',40,0.85)';
            ctx.fillRect(startX + col * cellW + 1, startY + row * cellH + 1, cellW - 2, cellH - 2);
            ctx.fillStyle = val > 55 ? '#fff' : '#ddd';
            ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(val + '%', startX + col * cellW + cellW / 2, startY + row * cellH + cellH / 2 + 4);
        }
    }

    var total = 0, cnt = 0;
    for(var rr = 0; rr < zones.length; rr++) for(var cc = 0; cc < types.length; cc++) { total += v21State.crime.grid[rr][cc]; cnt++; }
    v21State.crime.avgRate = Math.round(total / cnt);
    var grade = v21State.crime.avgRate <= 20 ? 'S' : v21State.crime.avgRate <= 35 ? 'A' : v21State.crime.avgRate <= 50 ? 'B' : v21State.crime.avgRate <= 70 ? 'C' : 'D';
    var gc = grade === 'S' ? '#ffd700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';

    ctx.fillStyle = gc; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('치안등급: ' + grade + ' | 평균범죄율: ' + v21State.crime.avgRate + '%', W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 치안부대 배치 | 체포: ' + v21State.crime.totalArrests + ' | 배치: ' + v21State.crime.deployments, W / 2, H - 12);
}

// 2. Royal Tax Policy Simulator
function renderTaxSimulator(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 600, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 세금정책 시뮬레이터', W/2, 24);

    var taxes = TAX_TYPES;
    var barW = 65, barMaxH = 160, startX = 40, startY = 55;
    var gap = (W - startX * 2) / taxes.length;

    taxes.forEach(function(tax, i) {
        var x = startX + i * gap;
        var rate = v21State.tax.rates[tax.id] || tax.base;
        v21State.tax.rates[tax.id] = rate;
        var barH = (rate / 50) * barMaxH;

        ctx.fillStyle = tax.color + '33';
        ctx.fillRect(x, startY, barW, barMaxH);

        var grad = ctx.createLinearGradient(x, startY + barMaxH - barH, x, startY + barMaxH);
        grad.addColorStop(0, tax.color);
        grad.addColorStop(1, tax.color + '88');
        ctx.fillStyle = grad;
        ctx.fillRect(x, startY + barMaxH - barH, barW, barH);

        ctx.strokeStyle = tax.color; ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, barW, barMaxH);

        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(rate + '%', x + barW / 2, startY + barMaxH - barH - 8);

        ctx.font = '16px sans-serif';
        ctx.fillText(tax.icon, x + barW / 2, startY + barMaxH + 20);
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(tax.name, x + barW / 2, startY + barMaxH + 36);
    });

    // Revenue / Morale dual line
    var lineStartX = 40, lineEndX = W - 40, lineY = 285, lineH = 60;
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.strokeRect(lineStartX, lineY, lineEndX - lineStartX, lineH);

    ctx.fillStyle = '#ffd700'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('세수: ' + v21State.tax.revenue, lineStartX, lineY - 5);
    ctx.fillStyle = '#4CAF50';
    ctx.fillText('민심: ' + v21State.tax.morale + '%', lineStartX + 120, lineY - 5);

    var revPoints = [];
    var morPoints = [];
    for(var p = 0; p < 10; p++) {
        var px = lineStartX + p * ((lineEndX - lineStartX) / 9);
        var rv = 30 + Math.sin(p * 0.7 + v21State.tax.adjustments * 0.3) * 20 + 10;
        var mr = 70 - Math.sin(p * 0.5 + v21State.tax.adjustments * 0.2) * 25;
        revPoints.push({ x: px, y: lineY + lineH - (rv / 100) * lineH });
        morPoints.push({ x: px, y: lineY + lineH - (mr / 100) * lineH });
    }

    ctx.beginPath(); ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
    revPoints.forEach(function(pt, i){ i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y); });
    ctx.stroke();

    ctx.beginPath(); ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2;
    morPoints.forEach(function(pt, i){ i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y); });
    ctx.stroke();

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('클릭: 세율 조절 | 조절 횟수: ' + v21State.tax.adjustments, W / 2, H - 12);
}

// 3. City Growth Timeline
function renderGrowthTimeline(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 640, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 성장 타임라인', W/2, 24);

    var eras = GROWTH_ERAS;
    var chartLeft = 70, chartRight = W - 30, chartTop = 55, chartBottom = H - 70;
    var chartW = chartRight - chartLeft, chartH = chartBottom - chartTop;
    var step = chartW / (eras.length - 1);

    // Axes
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(chartLeft, chartTop); ctx.lineTo(chartLeft, chartBottom); ctx.lineTo(chartRight, chartBottom); ctx.stroke();

    // Legend
    var legends = [
        { name: '인구', color: '#F44336' },
        { name: '면적', color: '#4CAF50' },
        { name: '건물수', color: '#2196F3' }
    ];
    legends.forEach(function(lg, i) {
        var lx = chartLeft + i * 100;
        ctx.fillStyle = lg.color; ctx.fillRect(lx, chartTop - 18, 12, 10);
        ctx.fillStyle = '#ccc'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(lg.name, lx + 16, chartTop - 9);
    });

    var maxPop = 1200000, maxArea = 700, maxBldg = 6000;

    // Draw 3 lines
    var lines = [
        { key: 'pop', max: maxPop, color: '#F44336' },
        { key: 'area', max: maxArea, color: '#4CAF50' },
        { key: 'buildings', max: maxBldg, color: '#2196F3' }
    ];

    lines.forEach(function(line) {
        ctx.beginPath(); ctx.strokeStyle = line.color; ctx.lineWidth = 2.5;
        eras.forEach(function(era, i) {
            var x = chartLeft + i * step;
            var val = era[line.key];
            var y = chartBottom - (val / line.max) * chartH;
            if(i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        eras.forEach(function(era, i) {
            var x = chartLeft + i * step;
            var val = era[line.key];
            var y = chartBottom - (val / line.max) * chartH;
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = line.color; ctx.fill();
        });
    });

    // Era labels + milestones
    eras.forEach(function(era, i) {
        var x = chartLeft + i * step;
        var viewed = v21State.growth.viewed[era.id] || false;
        ctx.fillStyle = viewed ? '#ffd700' : '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(era.name, x, chartBottom + 14);
        ctx.font = '8px sans-serif'; ctx.fillStyle = '#888';
        ctx.fillText(era.period, x, chartBottom + 26);

        if(viewed) {
            ctx.fillStyle = '#ffd70044';
            ctx.beginPath(); ctx.moveTo(x, chartTop); ctx.lineTo(x, chartBottom);
            ctx.strokeStyle = '#ffd70033'; ctx.lineWidth = 1; ctx.stroke();
            ctx.fillStyle = '#ffd700'; ctx.font = '8px sans-serif';
            ctx.fillText('★' + era.milestone, x, chartBottom + 40);
        }
    });

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('클릭: 시대별 성장 분석 | 마일스톤: ' + v21State.growth.milestones, W / 2, H - 8);
}

// 4. Epidemic Spread Simulator
function renderEpidemicSimulator(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('전염병 확산 시뮬레이터', W/2, 24);

    var gridSize = 8;
    var cellSize = 36;
    var startX = 40;
    var startY = 50;

    if(v21State.epidemic.grid.length === 0) {
        for(var r = 0; r < gridSize; r++) {
            v21State.epidemic.grid[r] = [];
            for(var c = 0; c < gridSize; c++) {
                v21State.epidemic.grid[r][c] = 0; // 0=S, 1=I, 2=R
            }
        }
        v21State.epidemic.grid[3][3] = 1;
        v21State.epidemic.grid[4][4] = 1;
    }

    var sCount = 0, iCount = 0, rCount = 0;
    for(var row = 0; row < gridSize; row++) {
        for(var col = 0; col < gridSize; col++) {
            var state = v21State.epidemic.grid[row][col];
            var cx = startX + col * cellSize + cellSize / 2;
            var cy = startY + row * cellSize + cellSize / 2;

            if(state === 0) { ctx.fillStyle = '#4CAF5088'; sCount++; }
            else if(state === 1) { ctx.fillStyle = '#F4433688'; iCount++; }
            else { ctx.fillStyle = '#2196F388'; rCount++; }

            ctx.fillRect(startX + col * cellSize + 1, startY + row * cellSize + 1, cellSize - 2, cellSize - 2);
            ctx.fillStyle = state === 0 ? '#8f8' : state === 1 ? '#f88' : '#88f';
            ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(state === 0 ? 'S' : state === 1 ? 'I' : 'R', cx, cy + 4);
        }
    }

    // SIR chart on the right
    var chartX = startX + gridSize * cellSize + 30;
    var chartW = W - chartX - 20, chartH = 200;
    var chartY = startY + 20;

    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.strokeRect(chartX, chartY, chartW, chartH);

    var total = gridSize * gridSize;
    var rates = [
        { name: 'S(건강)', val: sCount, color: '#4CAF50' },
        { name: 'I(감염)', val: iCount, color: '#F44336' },
        { name: 'R(회복)', val: rCount, color: '#2196F3' }
    ];

    rates.forEach(function(rate, i) {
        var barH = (rate.val / total) * chartH;
        var bx = chartX + 10 + i * (chartW / 3 - 5);
        var bw = chartW / 3 - 15;
        ctx.fillStyle = rate.color + '66';
        ctx.fillRect(bx, chartY + chartH - barH, bw, barH);
        ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(rate.val + '', bx + bw / 2, chartY + chartH - barH - 5);
        ctx.fillStyle = '#ccc'; ctx.font = '8px sans-serif';
        ctx.fillText(rate.name, bx + bw / 2, chartY + chartH + 14);
    });

    // Measures legend
    var mY = startY + gridSize * cellSize + 15;
    var measures = [
        { name: '격리', icon: '🚧', color: '#FF9800' },
        { name: '약초', icon: '🌿', color: '#4CAF50' },
        { name: '의원', icon: '🏥', color: '#2196F3' }
    ];
    ctx.fillStyle = '#ccc'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('방역조치:', 40, mY);
    measures.forEach(function(m, i) {
        ctx.fillText(m.icon + ' ' + m.name, 120 + i * 85, mY);
    });

    v21State.epidemic.infected = iCount;
    var infectRate = Math.round((iCount / total) * 100);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Day ' + v21State.epidemic.day + ' | 감염률: ' + infectRate + '% | 방역: ' + v21State.epidemic.measures + '회', W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 확산 시뮬레이션 (SIR 모델) + 방역 조치', W / 2, H - 12);
}

// 5. Land Use Zoning Plan
function renderZoningPlan(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 토지이용 계획도', W/2, 24);

    var types = ZONING_TYPES;

    // Donut chart
    var dcx = 160, dcy = 180, outerR = 100, innerR = 55;
    var totalAlloc = 0;
    types.forEach(function(zt) {
        var alloc = v21State.zoning.allocations[zt.id] || Math.floor(Math.random() * 15 + 5);
        v21State.zoning.allocations[zt.id] = alloc;
        totalAlloc += alloc;
    });

    var angle = -Math.PI / 2;
    types.forEach(function(zt, i) {
        var alloc = v21State.zoning.allocations[zt.id];
        var sweep = (alloc / totalAlloc) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(dcx, dcy, outerR, angle, angle + sweep);
        ctx.arc(dcx, dcy, innerR, angle + sweep, angle, true);
        ctx.closePath();
        ctx.fillStyle = zt.color + 'cc'; ctx.fill();
        ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 2; ctx.stroke();

        var midAngle = angle + sweep / 2;
        var labelR = outerR + 18;
        var lx = dcx + labelR * Math.cos(midAngle);
        var ly = dcy + labelR * Math.sin(midAngle);
        ctx.fillStyle = '#ccc'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(zt.icon + Math.round(alloc / totalAlloc * 100) + '%', lx, ly + 3);

        angle += sweep;
    });

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('토지배분', dcx, dcy - 4);
    ctx.font = '10px sans-serif'; ctx.fillStyle = '#aaa';
    ctx.fillText(totalAlloc + '필지', dcx, dcy + 12);

    // 8x8 zoning grid
    var gridSize = 8, cellSize = 32;
    var gridX = 310, gridY = 55;

    if(v21State.zoning.grid.length === 0) {
        for(var r = 0; r < gridSize; r++) {
            v21State.zoning.grid[r] = [];
            for(var c = 0; c < gridSize; c++) {
                v21State.zoning.grid[r][c] = Math.floor(Math.random() * types.length);
            }
        }
    }

    for(var row = 0; row < gridSize; row++) {
        for(var col = 0; col < gridSize; col++) {
            var zType = types[v21State.zoning.grid[row][col]];
            ctx.fillStyle = zType.color + '88';
            ctx.fillRect(gridX + col * cellSize + 1, gridY + row * cellSize + 1, cellSize - 2, cellSize - 2);
            ctx.fillStyle = '#fff'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(zType.icon, gridX + col * cellSize + cellSize / 2, gridY + row * cellSize + cellSize / 2 + 4);
        }
    }

    // Legend
    var legY = gridY + gridSize * cellSize + 12;
    ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
    types.forEach(function(zt, i) {
        var lx = gridX + (i % 4) * 66;
        var ly = legY + Math.floor(i / 4) * 16;
        ctx.fillStyle = zt.color; ctx.fillRect(lx, ly, 8, 8);
        ctx.fillStyle = '#ccc';
        ctx.fillText(zt.name, lx + 11, ly + 8);
    });

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('클릭: 용도 변경 | 계획 횟수: ' + v21State.zoning.totalPlanned, W / 2, H - 12);
}

// 6. Royal Military Deployment
function renderMilitaryDeployment(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 군사 배치도', W/2, 24);

    var units = MILITARY_UNITS;
    // 6-axis radar chart
    var rcx = 180, rcy = 210, rRadius = 120;
    var axes = 6;
    var axisLabels = ['공격', '방어', '기동', '사기', '보급', '훈련'];

    for(var ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for(var a = 0; a <= axes; a++) {
            var angle = (Math.PI * 2 / axes) * a - Math.PI / 2;
            var rx = rcx + (rRadius * ring / 4) * Math.cos(angle);
            var ry = rcy + (rRadius * ring / 4) * Math.sin(angle);
            a === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
        }
        ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.stroke();
    }

    for(var ax = 0; ax < axes; ax++) {
        var angle = (Math.PI * 2 / axes) * ax - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(rcx, rcy);
        ctx.lineTo(rcx + rRadius * Math.cos(angle), rcy + rRadius * Math.sin(angle));
        ctx.strokeStyle = '#444'; ctx.lineWidth = 1; ctx.stroke();

        var lx = rcx + (rRadius + 20) * Math.cos(angle);
        var ly = rcy + (rRadius + 20) * Math.sin(angle);
        ctx.fillStyle = '#ccc'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(axisLabels[ax], lx, ly + 4);
    }

    // Radar data
    var radarData = [];
    for(var rd = 0; rd < axes; rd++) {
        radarData.push(30 + Math.floor(Math.random() * 50 + v21State.military.defenseLevel * 0.3));
    }
    ctx.beginPath();
    radarData.forEach(function(val, i) {
        var angle = (Math.PI * 2 / axes) * i - Math.PI / 2;
        var px = rcx + (rRadius * Math.min(100, val) / 100) * Math.cos(angle);
        var py = rcy + (rRadius * Math.min(100, val) / 100) * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(244,67,54,0.25)'; ctx.fill();
    ctx.strokeStyle = '#F44336'; ctx.lineWidth = 2; ctx.stroke();

    // Unit cards on the right
    var cardX = 340, cardY = 50, cardW = 130, cardH = 38;
    units.forEach(function(unit, i) {
        var x = cardX + (i % 2) * (cardW + 8);
        var y = cardY + Math.floor(i / 2) * (cardH + 6);
        var deployed = v21State.military.units[unit.id] || 0;

        ctx.fillStyle = deployed > 0 ? unit.color + '44' : '#1e1e34';
        ctx.strokeStyle = deployed > 0 ? unit.color : '#444';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x, y, cardW, cardH, 6); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '14px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(unit.icon, x + 6, y + 24);
        ctx.font = '11px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(unit.name, x + 28, y + 16);
        ctx.font = '9px sans-serif'; ctx.fillStyle = deployed > 0 ? '#8f8' : '#888';
        ctx.fillText('배치: ' + deployed, x + 28, y + 30);
    });

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('방어력: ' + v21State.military.defenseLevel + ' | 배치: ' + v21State.military.deployments + '회', W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 병력 배치 시뮬레이션', W / 2, H - 12);
}

// 7. Ancient Trade Route Network
function renderTradeNetwork(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 640, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('고대 무역로 네트워크', W/2, 24);

    var cities = TRADE_CITIES;
    var padding = 60;
    var mapW = W - padding * 2, mapH = H - 100;
    var mapY = 45;

    // Draw trade routes (connections)
    var connections = [
        [0,1],[0,2],[0,3],[0,4],[0,5],[0,7],
        [1,4],[2,4],[3,7],[4,6],[5,7],[1,6],[3,5],[2,6]
    ];

    connections.forEach(function(conn) {
        var c1 = cities[conn[0]], c2 = cities[conn[1]];
        var x1 = padding + c1.x * mapW, y1 = mapY + c1.y * mapH;
        var x2 = padding + c2.x * mapW, y2 = mapY + c2.y * mapH;
        var vol = v21State.trade.routes[conn[0] + '-' + conn[1]] || Math.floor(Math.random() * 80 + 20);
        v21State.trade.routes[conn[0] + '-' + conn[1]] = vol;

        var lineW = Math.max(1, Math.min(5, vol / 25));
        ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255,215,0,' + (0.2 + vol / 200) + ')';
        ctx.lineWidth = lineW; ctx.stroke();

        // Flow arrow at midpoint
        var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        ctx.fillStyle = '#ffd70066'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(vol, mx, my - 3);
    });

    // Draw city nodes
    cities.forEach(function(city, i) {
        var x = padding + city.x * mapW;
        var y = mapY + city.y * mapH;
        var nodeR = 18;

        ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = city.color + '66'; ctx.fill();
        ctx.strokeStyle = city.color; ctx.lineWidth = 2.5; ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(city.name, x, y - 2);

        var totalVol = 0;
        connections.forEach(function(conn) {
            if(conn[0] === i || conn[1] === i) {
                totalVol += v21State.trade.routes[conn[0] + '-' + conn[1]] || 0;
            }
        });
        ctx.font = '8px sans-serif'; ctx.fillStyle = '#ffd700';
        ctx.fillText(totalVol, x, y + 12);
    });

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('총 교역량: ' + v21State.trade.totalVolume + ' | 교역로: ' + v21State.trade.connections, W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 교역량 시뮬레이션 | 물자 흐름 분석', W / 2, H - 12);
}

// 8. City Development Report Card
function renderGradeReport(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 600, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 발전 성적표', W/2, 24);

    var categories = GRADE_CATEGORIES;
    var cols = 4, gaugeR = 45;
    var startX = 40, startY = 55;
    var colW = (W - startX * 2) / cols;
    var rowH = 140;

    var totalScore = 0;
    categories.forEach(function(cat, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cx = startX + col * colW + colW / 2;
        var cy = startY + row * rowH + gaugeR + 15;
        var score = v21State.grade.scores[cat.id] || Math.floor(Math.random() * 60 + 30);
        v21State.grade.scores[cat.id] = score;
        totalScore += score;

        // Semi-circle gauge
        var startAngle = Math.PI;
        var endAngle = 0;
        var valAngle = startAngle + (score / 100) * (endAngle - startAngle);

        ctx.beginPath(); ctx.arc(cx, cy, gaugeR, startAngle, endAngle);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 10; ctx.stroke();

        var gaugeGrad = ctx.createLinearGradient(cx - gaugeR, cy, cx + gaugeR, cy);
        gaugeGrad.addColorStop(0, '#F44336');
        gaugeGrad.addColorStop(0.4, '#FF9800');
        gaugeGrad.addColorStop(0.6, '#FFEB3B');
        gaugeGrad.addColorStop(0.8, '#8BC34A');
        gaugeGrad.addColorStop(1, '#4CAF50');
        ctx.beginPath(); ctx.arc(cx, cy, gaugeR, startAngle, valAngle);
        ctx.strokeStyle = gaugeGrad; ctx.lineWidth = 10; ctx.stroke();

        // Score text
        var grade = score >= 90 ? 'S' : score >= 75 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D';
        var gc = grade === 'S' ? '#ffd700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
        ctx.fillStyle = gc; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(score + '', cx, cy + 6);
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(grade, cx, cy + 20);

        // Icon + name
        ctx.fillStyle = '#fff'; ctx.font = '16px sans-serif';
        ctx.fillText(cat.icon, cx, cy - gaugeR - 8);
        ctx.fillStyle = '#ccc'; ctx.font = '10px sans-serif';
        ctx.fillText(cat.name, cx, cy + 35);
    });

    // Overall score
    var avgScore = Math.round(totalScore / categories.length);
    v21State.grade.totalScore = avgScore;
    var overallGrade = avgScore >= 90 ? 'S' : avgScore >= 75 ? 'A' : avgScore >= 60 ? 'B' : avgScore >= 40 ? 'C' : 'D';
    var ogc = overallGrade === 'S' ? '#ffd700' : overallGrade === 'A' ? '#4CAF50' : overallGrade === 'B' ? '#2196F3' : overallGrade === 'C' ? '#FF9800' : '#F44336';

    ctx.fillStyle = ogc; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('종합: ' + avgScore + '점 [' + overallGrade + '등급]', W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 재평가 | 평가횟수: ' + v21State.grade.evaluations, W / 2, H - 12);
}

// ===================== NAVIGATION & UI =====================
var v21Sections = [
    { id: 'v21_crime', name: '범죄분석', icon: '🔍', render: renderCrimeAnalyzer },
    { id: 'v21_tax', name: '세금정책', icon: '💰', render: renderTaxSimulator },
    { id: 'v21_growth', name: '성장타임라인', icon: '📈', render: renderGrowthTimeline },
    { id: 'v21_epidemic', name: '전염병', icon: '🦠', render: renderEpidemicSimulator },
    { id: 'v21_zoning', name: '토지이용', icon: '🗺️', render: renderZoningPlan },
    { id: 'v21_military', name: '군사배치', icon: '⚔️', render: renderMilitaryDeployment },
    { id: 'v21_trade', name: '무역로', icon: '🚢', render: renderTradeNetwork },
    { id: 'v21_grade', name: '성적표', icon: '🏅', render: renderGradeReport }
];

var v21CurrentSection = -1;
var v21Panel = null;
var v21Canvas = null;

function createV21Panel() {
    if(v21Panel) return;
    v21Panel = document.createElement('div');
    v21Panel.id = 'v21-panel';
    v21Panel.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:190;justify-content:center;align-items:center;padding:10px;';

    var box = document.createElement('div');
    box.style.cssText = 'background:linear-gradient(145deg,#2a2a3e,#1a1a2e);border:2px solid #c4923a;border-radius:16px;padding:14px;max-width:680px;width:100%;max-height:92vh;overflow-y:auto;';

    var header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
    header.innerHTML = '<span style="color:#ffd700;font-size:16px;font-weight:bold;">v21 도시 전략 분석시스템</span>';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'background:#c4923a;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;';
    closeBtn.onclick = function(){ v21Panel.style.display = 'none'; };
    header.appendChild(closeBtn);
    box.appendChild(header);

    var nav = document.createElement('div');
    nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;';
    v21Sections.forEach(function(sec, i) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:#2a2a4e;border:1px solid #555;color:#ccc;padding:6px 10px;border-radius:8px;font-size:11px;cursor:pointer;flex:1;min-width:70px;text-align:center;';
        btn.innerHTML = sec.icon + '<br>' + sec.name;
        btn.onclick = function(){
            v21CurrentSection = i;
            playV21SFX('crime_scan');
            sec.render(v21Canvas);
            nav.querySelectorAll('button').forEach(function(b, bi){
                b.style.borderColor = bi === i ? '#ffd700' : '#555';
                b.style.color = bi === i ? '#ffd700' : '#ccc';
            });
        };
        nav.appendChild(btn);
    });
    box.appendChild(nav);

    v21Canvas = document.createElement('canvas');
    v21Canvas.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto;border-radius:8px;cursor:pointer;';
    v21Canvas.onclick = function(e) { handleV21CanvasClick(e); };
    box.appendChild(v21Canvas);

    var quizBtn = document.createElement('button');
    quizBtn.textContent = '📝 v21 퀴즈 (' + V21_QUIZ.length + '문제)';
    quizBtn.style.cssText = 'display:block;margin:10px auto 0;background:#9C27B0;border:none;color:#fff;padding:8px 20px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;';
    quizBtn.onclick = function(){ startV21Quiz(); };
    box.appendChild(quizBtn);

    v21Panel.appendChild(box);
    document.body.appendChild(v21Panel);
}

function openV21Panel() {
    createV21Panel();
    v21Panel.style.display = 'flex';
    if(v21CurrentSection < 0) v21CurrentSection = 0;
    v21Sections[v21CurrentSection].render(v21Canvas);
    var navBtns = v21Panel.querySelectorAll('div > button');
    navBtns.forEach(function(b, i){ if(i < v21Sections.length) { b.style.borderColor = i === v21CurrentSection ? '#ffd700' : '#555'; b.style.color = i === v21CurrentSection ? '#ffd700' : '#ccc'; }});
}

// ===================== CANVAS INTERACTION =====================
function handleV21CanvasClick(e) {
    var rect = v21Canvas.getBoundingClientRect();
    var scaleX = v21Canvas.width / rect.width;
    var x = (e.clientX - rect.left) * scaleX;
    var y = (e.clientY - rect.top) * (v21Canvas.height / rect.height);

    switch(v21CurrentSection) {
        case 0: // Crime
            v21State.crime.deployments++;
            for(var r = 0; r < CRIME_ZONES.length; r++) {
                for(var c = 0; c < CRIME_TYPES.length; c++) {
                    v21State.crime.grid[r][c] = Math.max(5, v21State.crime.grid[r][c] + Math.floor(Math.random() * 16 - 10));
                }
            }
            v21State.crime.totalArrests += Math.floor(Math.random() * 5 + 1);
            playV21SFX('crime_arrest');
            if(v21State.crime.deployments === 1) checkV21Achievement('crime_analyst');
            if(v21State.crime.avgRate <= 20) checkV21Achievement('crime_preventer');
            renderCrimeAnalyzer(v21Canvas);
            break;
        case 1: // Tax
            v21State.tax.adjustments++;
            TAX_TYPES.forEach(function(tax) {
                v21State.tax.rates[tax.id] = Math.max(1, Math.min(50, (v21State.tax.rates[tax.id] || tax.base) + Math.floor(Math.random() * 8 - 3)));
            });
            var totalRate = 0;
            TAX_TYPES.forEach(function(t){ totalRate += (v21State.tax.rates[t.id] || t.base); });
            v21State.tax.revenue += Math.floor(totalRate * 5);
            v21State.tax.morale = Math.max(10, Math.min(100, 100 - Math.floor(totalRate / TAX_TYPES.length * 1.5)));
            playV21SFX('tax_collect');
            if(v21State.tax.revenue >= 5000) checkV21Achievement('tax_optimizer');
            renderTaxSimulator(v21Canvas);
            break;
        case 2: // Growth
            var eraIdx = Math.floor((x - 70) / ((640 - 100) / (GROWTH_ERAS.length - 1) + 0.1));
            eraIdx = Math.max(0, Math.min(GROWTH_ERAS.length - 1, eraIdx));
            var era = GROWTH_ERAS[eraIdx];
            if(!v21State.growth.viewed[era.id]) {
                v21State.growth.viewed[era.id] = true;
                v21State.growth.milestones++;
                playV21SFX('growth_milestone');
            }
            var allViewed = GROWTH_ERAS.every(function(e){ return v21State.growth.viewed[e.id]; });
            if(allViewed) checkV21Achievement('growth_historian');
            renderGrowthTimeline(v21Canvas);
            break;
        case 3: // Epidemic
            v21State.epidemic.day++;
            v21State.epidemic.measures++;
            var grid = v21State.epidemic.grid;
            var newGrid = [];
            for(var er = 0; er < 8; er++) {
                newGrid[er] = [];
                for(var ec = 0; ec < 8; ec++) {
                    var s = grid[er][ec];
                    if(s === 0) {
                        var neighbors = 0;
                        [[-1,0],[1,0],[0,-1],[0,1]].forEach(function(d){
                            var nr = er + d[0], nc = ec + d[1];
                            if(nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && grid[nr][nc] === 1) neighbors++;
                        });
                        newGrid[er][ec] = (Math.random() < neighbors * 0.2) ? 1 : 0;
                    } else if(s === 1) {
                        newGrid[er][ec] = (Math.random() < 0.35) ? 2 : 1;
                        v21State.epidemic.cured += (newGrid[er][ec] === 2) ? 1 : 0;
                    } else {
                        newGrid[er][ec] = 2;
                    }
                }
            }
            v21State.epidemic.grid = newGrid;
            var iCnt = 0;
            for(var ir = 0; ir < 8; ir++) for(var ic = 0; ic < 8; ic++) if(newGrid[ir][ic] === 1) iCnt++;
            playV21SFX(iCnt > 10 ? 'epidemic_spread' : 'epidemic_cure');
            if(Math.round((iCnt / 64) * 100) <= 10) checkV21Achievement('epidemic_controller');
            renderEpidemicSimulator(v21Canvas);
            break;
        case 4: // Zoning
            v21State.zoning.totalPlanned++;
            var gridX = 310, cellSize = 32, gridY = 55;
            var col = Math.floor((x - gridX) / cellSize);
            var row = Math.floor((y - gridY) / cellSize);
            if(col >= 0 && col < 8 && row >= 0 && row < 8) {
                var nextType = (v21State.zoning.grid[row][col] + 1) % ZONING_TYPES.length;
                v21State.zoning.grid[row][col] = nextType;
                var usedTypes = {};
                for(var zr = 0; zr < 8; zr++) for(var zc = 0; zc < 8; zc++) usedTypes[v21State.zoning.grid[zr][zc]] = true;
                if(Object.keys(usedTypes).length >= 8) checkV21Achievement('zoning_master');
            }
            // Recalculate allocations
            var allocCount = {};
            ZONING_TYPES.forEach(function(zt, i){ allocCount[zt.id] = 0; });
            for(var ar = 0; ar < 8; ar++) for(var ac = 0; ac < 8; ac++) {
                allocCount[ZONING_TYPES[v21State.zoning.grid[ar][ac]].id]++;
            }
            ZONING_TYPES.forEach(function(zt){ v21State.zoning.allocations[zt.id] = allocCount[zt.id]; });
            playV21SFX('zoning_plan');
            renderZoningPlan(v21Canvas);
            break;
        case 5: // Military
            v21State.military.deployments++;
            MILITARY_UNITS.forEach(function(unit) {
                v21State.military.units[unit.id] = Math.min(100, (v21State.military.units[unit.id] || 0) + Math.floor(Math.random() * 12 + 3));
            });
            v21State.military.defenseLevel = Math.min(100, v21State.military.defenseLevel + Math.floor(Math.random() * 8 + 2));
            playV21SFX('military_deploy');
            var allDeployed = MILITARY_UNITS.every(function(u){ return (v21State.military.units[u.id] || 0) > 0; });
            if(allDeployed) checkV21Achievement('military_commander');
            renderMilitaryDeployment(v21Canvas);
            break;
        case 6: // Trade
            v21State.trade.connections++;
            var connections = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,7],[1,4],[2,4],[3,7],[4,6],[5,7],[1,6],[3,5],[2,6]];
            connections.forEach(function(conn) {
                var key = conn[0] + '-' + conn[1];
                v21State.trade.routes[key] = Math.min(100, (v21State.trade.routes[key] || 30) + Math.floor(Math.random() * 12 + 2));
            });
            var tVol = 0;
            Object.keys(v21State.trade.routes).forEach(function(k){ tVol += v21State.trade.routes[k]; });
            v21State.trade.totalVolume = tVol;
            playV21SFX('trade_flow');
            if(v21State.trade.totalVolume >= 10000) checkV21Achievement('trade_networker');
            renderTradeNetwork(v21Canvas);
            break;
        case 7: // Grade
            v21State.grade.evaluations++;
            GRADE_CATEGORIES.forEach(function(cat) {
                v21State.grade.scores[cat.id] = Math.min(100, Math.max(10, (v21State.grade.scores[cat.id] || 50) + Math.floor(Math.random() * 16 - 5)));
            });
            playV21SFX('grade_calc');
            var ts = 0;
            GRADE_CATEGORIES.forEach(function(c){ ts += (v21State.grade.scores[c.id] || 50); });
            v21State.grade.totalScore = Math.round(ts / GRADE_CATEGORIES.length);
            if(v21State.grade.totalScore >= 80) checkV21Achievement('grade_achiever');
            renderGradeReport(v21Canvas);
            break;
    }

    // Check visited sections
    var visited = new Set();
    if(v21State.crime.deployments > 0) visited.add(0);
    if(v21State.tax.adjustments > 0) visited.add(1);
    if(v21State.growth.milestones > 0) visited.add(2);
    if(v21State.epidemic.day > 0) visited.add(3);
    if(v21State.zoning.totalPlanned > 0) visited.add(4);
    if(v21State.military.deployments > 0) visited.add(5);
    if(v21State.trade.connections > 0) visited.add(6);
    if(v21State.grade.evaluations > 0) visited.add(7);
    if(visited.size >= 4) checkV21Achievement('v21_explorer');
    if(visited.size >= 8) checkV21Achievement('v21_complete');
}

// ===================== QUIZ =====================
function startV21Quiz() {
    playV21SFX('quiz_v21');
    var qIdx = 0; var score = 0;
    function showQuestion() {
        if(qIdx >= V21_QUIZ.length) {
            v21State.quiz.answered += V21_QUIZ.length;
            v21State.quiz.correct += score;
            if(score === V21_QUIZ.length) checkV21Achievement('quiz_v21_master');
            alert('퀴즈 완료! ' + score + '/' + V21_QUIZ.length + ' 정답\n' + (score >= 12 ? 'S등급! 탁월합니다!' : score >= 9 ? 'A등급! 훌륭합니다!' : score >= 6 ? 'B등급. 더 공부해보세요!' : 'C등급. 복습이 필요합니다.'));
            return;
        }
        var q = V21_QUIZ[qIdx];
        var ans = prompt('[문제 ' + (qIdx + 1) + '/' + V21_QUIZ.length + '] ' + q.q + '\n\n1. ' + q.options[0] + '\n2. ' + q.options[1] + '\n3. ' + q.options[2] + '\n4. ' + q.options[3] + '\n\n번호를 입력하세요 (1~4):');
        if(ans === null) return;
        var chosen = parseInt(ans) - 1;
        if(chosen === q.answer) { score++; playV21SFX('quiz_v21'); }
        else { playV21SFX('quiz_wrong_v21'); }
        qIdx++;
        showQuestion();
    }
    showQuestion();
}

// ===================== REGISTER NAVIGATION =====================
function addV21Button() {
    var existing = document.getElementById('v21-nav-btn');
    if(existing) return;

    var targets = [
        document.querySelector('#v20-nav-btn'),
        document.querySelector('#save-ctrl'),
        document.querySelector('#controls'),
        document.querySelector('#ach-panel-btn')
    ];
    var anchor = null;
    for(var i = 0; i < targets.length; i++) {
        if(targets[i]) { anchor = targets[i]; break; }
    }

    var btn = document.createElement('button');
    btn.id = 'v21-nav-btn';
    btn.textContent = '🔍';
    btn.title = 'v21 도시 전략 분석';
    btn.style.cssText = 'position:fixed;top:50px;right:268px;z-index:10;background:rgba(0,0,0,0.7);border:1px solid #c4923a;color:#ffd700;width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;';
    btn.onclick = function(){ playV21SFX('crime_scan'); openV21Panel(); };
    document.body.appendChild(btn);
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', function(e) {
    if(!e.shiftKey) return;
    var keyMap = {
        'KeyA': 0, 'KeyB': 1, 'KeyC': 2, 'KeyD': 3,
        'KeyE': 4, 'KeyF': 5, 'KeyG': 6, 'KeyH': 7
    };
    if(e.code === 'Digit9') {
        e.preventDefault(); openV21Panel(); return;
    }
    if(keyMap.hasOwnProperty(e.code) && v21Panel && v21Panel.style.display === 'flex') {
        e.preventDefault();
        var idx = keyMap[e.code];
        if(idx < v21Sections.length) {
            v21CurrentSection = idx;
            v21Sections[idx].render(v21Canvas);
            playV21SFX('crime_scan');
        }
    }
});

// ===================== INIT =====================
function initV21() {
    addV21Button();
    if(typeof window.v21Loaded === 'undefined') {
        window.v21Loaded = true;
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV21);
} else {
    initV21();
}

})();
