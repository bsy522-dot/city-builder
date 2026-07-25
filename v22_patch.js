// =====================================================================
// city-builder v22_patch.js — PRIME Holdings NEXTERA+PRISM v22.0
// Self-contained IIFE patch:
// 1. 도시교육시스템관리기 Canvas 620x400 (8교육기관 학력차트+과거제도 시뮬)
// 2. 왕실연대기편찬소 Canvas 640x380 (6왕조 사건타임라인+연대기 편찬)
// 3. 도시물류허브관리기 Canvas 620x400 (8물자 공급망 산키다이어그램)
// 4. 왕실천재지변기록관 Canvas 620x380 (6재해 히스토리+피해분석 바차트)
// 5. 도시인프라노후도분석기 Canvas 620x400 (8시설 노후도 게이지+보수계획)
// 6. 민심여론조사시뮬레이터 Canvas 600x380 (6계층 여론 폴라차트+지지율)
// 7. 왕실외교전략시뮬레이터 Canvas 640x400 (8국 관계망+외교전략 매트릭스)
// 8. 도시문화다양성지수 Canvas 620x380 (8문화 스택바+다양성 스코어)
// +15 Quiz (265→280), +12 Achievements (230→242),
// SFX 16, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v22Ctx = null;
function getV22Audio() {
    if(!v22Ctx) {
        try { v22Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v22Ctx;
}
function playV22SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV22Audio();
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
        case 'edu_enroll':
            tone(523, 0, 0.12, 'sine', 0.07);
            tone(587, 0.08, 0.12, 'sine', 0.07);
            tone(659, 0.16, 0.18, 'triangle', 0.08);
            break;
        case 'edu_graduate':
            [523,659,784,880,1047].forEach(function(f,i){ tone(f, i*0.07, 0.2, 'sine', 0.08); });
            break;
        case 'chronicle_write':
            tone(330, 0, 0.15, 'triangle', 0.06);
            tone(392, 0.12, 0.15, 'triangle', 0.06);
            tone(494, 0.24, 0.2, 'sine', 0.07);
            break;
        case 'chronicle_compile':
            [262,330,392,494,523,659].forEach(function(f,i){ tone(f, i*0.08, 0.18, 'sine', 0.07); });
            break;
        case 'logistics_ship':
            tone(196, 0, 0.12, 'square', 0.05);
            tone(262, 0.1, 0.12, 'square', 0.05);
            tone(330, 0.2, 0.15, 'sine', 0.06);
            break;
        case 'logistics_arrive':
            [392,440,494,523,587,659].forEach(function(f,i){ tone(f, i*0.06, 0.15, 'sine', 0.07); });
            break;
        case 'disaster_strike':
            tone(147, 0, 0.35, 'sawtooth', 0.06);
            tone(165, 0.2, 0.3, 'sawtooth', 0.05);
            tone(131, 0.4, 0.35, 'square', 0.04);
            break;
        case 'disaster_record':
            tone(440, 0, 0.12, 'triangle', 0.06);
            tone(523, 0.1, 0.15, 'sine', 0.07);
            break;
        case 'infra_inspect':
            tone(294, 0, 0.12, 'square', 0.05);
            tone(330, 0.08, 0.12, 'square', 0.05);
            tone(392, 0.16, 0.18, 'sine', 0.06);
            break;
        case 'infra_repair':
            [349,392,440,494,523].forEach(function(f,i){ tone(f, i*0.07, 0.18, 'sine', 0.07); });
            break;
        case 'poll_conduct':
            tone(392, 0, 0.1, 'sine', 0.06);
            tone(440, 0.08, 0.1, 'sine', 0.06);
            tone(494, 0.16, 0.15, 'triangle', 0.07);
            break;
        case 'poll_result':
            [440,523,587,659,784].forEach(function(f,i){ tone(f, i*0.06, 0.15, 'sine', 0.07); });
            break;
        case 'diplo_send':
            tone(262, 0, 0.15, 'triangle', 0.06);
            tone(330, 0.12, 0.15, 'triangle', 0.06);
            tone(392, 0.24, 0.2, 'sine', 0.07);
            break;
        case 'diplo_treaty':
            [330,392,494,587,659,784,880].forEach(function(f,i){ tone(f, i*0.07, 0.2, 'sine', 0.08); });
            break;
        case 'culture_discover':
            tone(440, 0, 0.12, 'sine', 0.07);
            tone(523, 0.1, 0.12, 'sine', 0.07);
            tone(659, 0.2, 0.18, 'triangle', 0.08);
            break;
        case 'quiz_v22':
            tone(523, 0, 0.12, 'sine', 0.08);
            tone(659, 0.08, 0.12, 'sine', 0.08);
            tone(784, 0.16, 0.2, 'sine', 0.09);
            break;
        case 'quiz_wrong_v22':
            tone(330, 0, 0.2, 'sawtooth', 0.06);
            tone(262, 0.15, 0.3, 'sawtooth', 0.05);
            break;
        case 'achieve_v22':
            [523,659,784,1047,784,1047,1319].forEach(function(f,i){ tone(f, i*0.07, 0.22, 'sine', 0.08); });
            break;
    }
}

// ===================== STATE =====================
var v22State = {
    education: { institutions: {}, totalStudents: 0, examsPassed: 0, literacy: 30, interactions: 0 },
    chronicle: { events: {}, compiled: 0, currentDynasty: 0, viewed: {} },
    logistics: { goods: {}, throughput: 0, deliveries: 0, efficiency: 50 },
    disaster: { records: {}, totalDamage: 0, responses: 0, preparedness: 40 },
    infra: { facilities: {}, avgCondition: 60, repairs: 0, inspections: 0 },
    poll: { opinions: {}, approval: 50, surveys: 0, participation: 0 },
    diplomacy: { relations: {}, treaties: 0, envoys: 0, influence: 40 },
    culture: { indices: {}, diversity: 50, festivals: 0, interactions: 0 },
    quiz: { answered: 0, correct: 0 },
    achievements: {}
};

// ===================== DATA =====================
var EDU_INSTITUTIONS = [
    { id: 'seodang', name: '서당', icon: '📒', color: '#8BC34A', capacity: 30, level: 1 },
    { id: 'hyanggyo', name: '향교', icon: '📖', color: '#4CAF50', capacity: 60, level: 2 },
    { id: 'seowon', name: '서원', icon: '🏫', color: '#2196F3', capacity: 80, level: 3 },
    { id: 'sungkyunkwan', name: '성균관', icon: '🎓', color: '#3F51B5', capacity: 120, level: 4 },
    { id: 'muban', name: '무반학교', icon: '⚔️', color: '#F44336', capacity: 50, level: 2 },
    { id: 'yeokgwan', name: '역관양성소', icon: '🗣️', color: '#FF9800', capacity: 40, level: 3 },
    { id: 'uigam', name: '의감', icon: '💊', color: '#9C27B0', capacity: 35, level: 3 },
    { id: 'gwageo', name: '과거시험장', icon: '👑', color: '#FFD700', capacity: 200, level: 5 }
];

var DYNASTY_EVENTS = [
    { id: 'gojoseon', name: '고조선', period: 'BC2333~108', events: ['단군건국', '8조법금', '위만조선', '한사군 설치'], color: '#795548' },
    { id: 'samguk', name: '삼국시대', period: '57BC~668', events: ['고구려 건국', '백제 건국', '신라 건국', '광개토대왕 정복'], color: '#F44336' },
    { id: 'unified', name: '통일신라', period: '668~935', events: ['삼국통일', '불국사 건립', '장보고 해상왕국', '후삼국 분열'], color: '#FF9800' },
    { id: 'goryeo', name: '고려', period: '918~1392', events: ['고려 건국', '팔만대장경', '몽골 침입', '위화도 회군'], color: '#4CAF50' },
    { id: 'joseon', name: '조선', period: '1392~1897', events: ['한양 천도', '훈민정음', '임진왜란', '병자호란'], color: '#2196F3' },
    { id: 'modern', name: '근대', period: '1897~1945', events: ['대한제국 선포', '을사조약', '3.1운동', '광복'], color: '#9C27B0' }
];

var LOGISTICS_GOODS = [
    { id: 'grain', name: '곡물', icon: '🌾', color: '#8BC34A' },
    { id: 'silk', name: '비단', icon: '🧵', color: '#E91E63' },
    { id: 'iron', name: '철', icon: '⛏️', color: '#607D8B' },
    { id: 'pottery', name: '도자기', icon: '🏺', color: '#00BCD4' },
    { id: 'timber', name: '목재', icon: '🪵', color: '#795548' },
    { id: 'salt', name: '소금', icon: '🧂', color: '#BDBDBD' },
    { id: 'herbs', name: '약재', icon: '🌿', color: '#4CAF50' },
    { id: 'paper', name: '한지', icon: '📜', color: '#FFD700' }
];

var DISASTER_TYPES = [
    { id: 'flood', name: '홍수', icon: '🌊', color: '#2196F3', maxDamage: 90 },
    { id: 'drought', name: '가뭄', icon: '☀️', color: '#FF9800', maxDamage: 75 },
    { id: 'earthquake', name: '지진', icon: '🌋', color: '#F44336', maxDamage: 95 },
    { id: 'typhoon', name: '태풍', icon: '🌀', color: '#00BCD4', maxDamage: 85 },
    { id: 'plague', name: '역병', icon: '☠️', color: '#9C27B0', maxDamage: 80 },
    { id: 'famine', name: '기근', icon: '🍚', color: '#795548', maxDamage: 70 }
];

var INFRA_FACILITIES = [
    { id: 'road', name: '도로', icon: '🛤️', color: '#607D8B' },
    { id: 'bridge', name: '교량', icon: '🌉', color: '#2196F3' },
    { id: 'wall', name: '성벽', icon: '🧱', color: '#795548' },
    { id: 'canal', name: '수로', icon: '💧', color: '#00BCD4' },
    { id: 'granary', name: '곡창', icon: '🏛️', color: '#8BC34A' },
    { id: 'well', name: '우물', icon: '🪣', color: '#4CAF50' },
    { id: 'market_bldg', name: '시장건물', icon: '🏪', color: '#FF9800' },
    { id: 'watchtower', name: '망루', icon: '🗼', color: '#F44336' }
];

var POLL_CLASSES = [
    { id: 'nobility', name: '양반', icon: '👑', color: '#FFD700' },
    { id: 'jungin', name: '중인', icon: '📋', color: '#2196F3' },
    { id: 'sangmin', name: '상민', icon: '👤', color: '#4CAF50' },
    { id: 'cheonmin', name: '천민', icon: '⛓️', color: '#795548' },
    { id: 'merchant', name: '상인', icon: '🏪', color: '#FF9800' },
    { id: 'soldier', name: '군인', icon: '⚔️', color: '#F44336' }
];

var DIPLO_NATIONS = [
    { id: 'china_ming', name: '명', icon: '🏯', color: '#F44336', x: 0.15, y: 0.35 },
    { id: 'china_qing', name: '청', icon: '🐉', color: '#FF9800', x: 0.2, y: 0.2 },
    { id: 'japan', name: '일본', icon: '🗾', color: '#E91E63', x: 0.85, y: 0.65 },
    { id: 'mongol', name: '몽골', icon: '🐎', color: '#795548', x: 0.3, y: 0.1 },
    { id: 'jurchen', name: '여진', icon: '🏹', color: '#4CAF50', x: 0.55, y: 0.12 },
    { id: 'ryukyu', name: '류큐', icon: '🌺', color: '#00BCD4', x: 0.75, y: 0.85 },
    { id: 'siam', name: '시암', icon: '🐘', color: '#9C27B0', x: 0.1, y: 0.8 },
    { id: 'arabia', name: '대식국', icon: '🕌', color: '#607D8B', x: 0.05, y: 0.55 }
];

var CULTURE_TYPES = [
    { id: 'music', name: '음악', icon: '🎵', color: '#E91E63' },
    { id: 'dance', name: '무용', icon: '💃', color: '#9C27B0' },
    { id: 'literature', name: '문학', icon: '📚', color: '#3F51B5' },
    { id: 'painting', name: '회화', icon: '🎨', color: '#2196F3' },
    { id: 'ceramic', name: '도예', icon: '🏺', color: '#00BCD4' },
    { id: 'textile', name: '직조', icon: '🧶', color: '#FF9800' },
    { id: 'cuisine', name: '음식', icon: '🍲', color: '#8BC34A' },
    { id: 'martial', name: '무예', icon: '🥋', color: '#F44336' }
];

var V22_QUIZ = [
    { q: '조선시대 초등교육 기관인 서당에서 가르친 기본 교재는?', options: ['천자문','대학','맹자','논어'], answer: 0 },
    { q: '성균관에 입학하기 위해 필요한 시험은?', options: ['소과(생원/진사시)','대과(문과)','무과','잡과'], answer: 0 },
    { q: '조선왕조실록은 어디에 보관되었는가?', options: ['사고(史庫)','종묘','경복궁','성균관'], answer: 0 },
    { q: '고려시대 국제무역항 벽란도에서 주로 수출한 품목은?', options: ['인삼과 비단','철과 목재','소금과 곡물','도자기와 종이'], answer: 0 },
    { q: '조선시대 &quot;제언사&quot;의 역할은?', options: ['홍수 방비 제방 관리','세금 징수','외교 업무','군사 훈련'], answer: 0 },
    { q: '삼국사기와 삼국유사의 차이점으로 올바른 것은?', options: ['삼국사기는 정사, 삼국유사는 야사','삼국사기가 더 늦게 편찬','삼국유사가 더 공식적','둘 다 같은 시기 편찬'], answer: 0 },
    { q: '조선시대 도로의 등급 분류에서 가장 높은 등급은?', options: ['대로','중로','소로','간로'], answer: 0 },
    { q: '조선시대 역참제도의 주요 기능이 아닌 것은?', options: ['세금 징수','공문서 전달','관리 이동 지원','군사 정보 전달'], answer: 0 },
    { q: '고려시대 몽골 침입 시 강화도로 천도한 기간은 약?', options: ['약 40년','약 10년','약 20년','약 60년'], answer: 0 },
    { q: '조선시대 &quot;균역법&quot;의 목적은?', options: ['군포 부담 경감','토지세 인상','무역 촉진','교육 확대'], answer: 0 },
    { q: '고려시대 최고 교육기관의 이름은?', options: ['국자감','향교','서원','성균관'], answer: 0 },
    { q: '조선시대 민심을 파악하기 위한 제도인 &quot;상소&quot;란?', options: ['왕에게 글을 올리는 제도','시장 조사','인구 조사','세금 감면'], answer: 0 },
    { q: '임진왜란 당시 조선의 대일 외교 실패의 주요 원인은?', options: ['통신사 보고의 분열','군비 과잉','경제적 풍요','외교관 부족'], answer: 0 },
    { q: '조선시대 &quot;잡과&quot;에 포함되지 않는 분야는?', options: ['무예','의학','역학(통역)','율학(법률)'], answer: 0 },
    { q: '고려의 문화 다양성을 보여주는 대표적 사례는?', options: ['개경의 다국적 상인 거주','쇄국 정책','단일 종교 정책','외국어 금지'], answer: 0 }
];

var V22_ACHIEVEMENTS = [
    { id: 'edu_founder', name: '교육 선구자', desc: '첫 교육기관 설립 완료', icon: '📖' },
    { id: 'exam_master', name: '과거 급제자', desc: '과거시험 합격 10회 달성', icon: '🎓' },
    { id: 'chronicle_author', name: '연대기 편찬자', desc: '6왕조 사건 전체 열람', icon: '📜' },
    { id: 'logistics_expert', name: '물류 전문가', desc: '물류 처리량 5000 돌파', icon: '📦' },
    { id: 'disaster_survivor', name: '재해 극복자', desc: '재해 대응 10회 달성', icon: '🛡️' },
    { id: 'infra_engineer', name: '인프라 기술자', desc: '평균 시설 상태 80% 이상', icon: '🏗️' },
    { id: 'poll_analyst', name: '여론 분석가', desc: '여론조사 10회 실시', icon: '📊' },
    { id: 'diplomat_supreme', name: '외교의 달인', desc: '조약 체결 8건 이상', icon: '🤝' },
    { id: 'culture_patron', name: '문화 후원자', desc: '문화 다양성 지수 80 이상', icon: '🎭' },
    { id: 'quiz_v22_master', name: 'v22 퀴즈 마스터', desc: 'v22 퀴즈 전부 정답', icon: '🏆' },
    { id: 'v22_explorer', name: 'v22 탐험가', desc: '4개 이상 섹션 체험', icon: '🧭' },
    { id: 'v22_complete', name: 'v22 완전 정복', desc: '8개 섹션 모두 체험', icon: '🌟' }
];

// ===================== ACHIEVEMENT CHECK =====================
function checkV22Achievement(id) {
    if(v22State.achievements[id]) return;
    v22State.achievements[id] = true;
    var ach = V22_ACHIEVEMENTS.find(function(a){ return a.id === id; });
    if(!ach) return;
    playV22SFX('achieve_v22');
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

// 1. Education System Manager
function renderEducationSystem(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 교육 시스템 관리기', W/2, 24);

    var insts = EDU_INSTITUTIONS;
    var barW = 60, barMaxH = 150, startX = 30, startY = 55;
    var gap = (W - startX * 2) / insts.length;

    // Initialize institutions state
    insts.forEach(function(inst) {
        if(!v22State.education.institutions[inst.id]) {
            v22State.education.institutions[inst.id] = {
                students: Math.floor(Math.random() * inst.capacity * 0.6 + inst.capacity * 0.1),
                graduates: 0
            };
        }
    });

    // Draw enrollment bar chart
    insts.forEach(function(inst, i) {
        var x = startX + i * gap;
        var data = v22State.education.institutions[inst.id];
        var fillRatio = data.students / inst.capacity;
        var barH = fillRatio * barMaxH;

        // Background bar
        ctx.fillStyle = inst.color + '22';
        ctx.fillRect(x, startY, barW, barMaxH);

        // Fill bar with gradient
        var grad = ctx.createLinearGradient(x, startY + barMaxH - barH, x, startY + barMaxH);
        grad.addColorStop(0, inst.color);
        grad.addColorStop(1, inst.color + '88');
        ctx.fillStyle = grad;
        ctx.fillRect(x, startY + barMaxH - barH, barW, barH);

        // Border
        ctx.strokeStyle = inst.color; ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, barW, barMaxH);

        // Student count
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(data.students + '/' + inst.capacity, x + barW / 2, startY + barMaxH - barH - 8);

        // Level indicator
        ctx.fillStyle = '#ffd700'; ctx.font = '8px sans-serif';
        ctx.fillText('Lv.' + inst.level, x + barW / 2, startY - 5);

        // Icon and name
        ctx.font = '16px sans-serif'; ctx.fillStyle = '#fff';
        ctx.fillText(inst.icon, x + barW / 2, startY + barMaxH + 22);
        ctx.font = '9px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(inst.name, x + barW / 2, startY + barMaxH + 38);
    });

    // Literacy rate area chart (bottom section)
    var chartLeft = 40, chartRight = W - 40, chartY = 280, chartH = 60;
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.strokeRect(chartLeft, chartY, chartRight - chartLeft, chartH);

    ctx.fillStyle = '#ffd700'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('식자율: ' + v22State.education.literacy + '%', chartLeft, chartY - 5);
    ctx.fillStyle = '#4CAF50';
    ctx.fillText('과거 합격: ' + v22State.education.examsPassed, chartLeft + 140, chartY - 5);

    // Draw literacy trend line
    ctx.beginPath(); ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
    for(var p = 0; p < 12; p++) {
        var px = chartLeft + p * ((chartRight - chartLeft) / 11);
        var ly = v22State.education.literacy + Math.sin(p * 0.6 + v22State.education.interactions * 0.2) * 15;
        ly = Math.max(5, Math.min(95, ly));
        var py = chartY + chartH - (ly / 100) * chartH;
        p === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Exam pass rate line
    ctx.beginPath(); ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2;
    for(var p2 = 0; p2 < 12; p2++) {
        var px2 = chartLeft + p2 * ((chartRight - chartLeft) / 11);
        var er = 20 + Math.sin(p2 * 0.8 + v22State.education.examsPassed * 0.15) * 18;
        var py2 = chartY + chartH - (er / 100) * chartH;
        p2 === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
    }
    ctx.stroke();

    // Total students
    var totalStu = 0;
    insts.forEach(function(inst){ totalStu += v22State.education.institutions[inst.id].students; });
    v22State.education.totalStudents = totalStu;

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('총 학생: ' + totalStu + ' | 식자율: ' + v22State.education.literacy + '% | 과거합격: ' + v22State.education.examsPassed, W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 학생 모집 + 과거시험 | 상호작용: ' + v22State.education.interactions, W / 2, H - 12);
}

// 2. Dynasty Chronicle Compiler
function renderChronicleCompiler(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 640, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 연대기 편찬소', W/2, 24);

    var dynasties = DYNASTY_EVENTS;
    var timelineY = 70;
    var timelineH = 260;
    var colW = (W - 60) / dynasties.length;
    var startX = 30;

    // Draw timeline columns for each dynasty
    dynasties.forEach(function(dyn, di) {
        var x = startX + di * colW;
        var isViewed = v22State.chronicle.viewed[dyn.id] || false;

        // Column background
        ctx.fillStyle = isViewed ? dyn.color + '22' : '#1e1e34';
        ctx.fillRect(x + 2, timelineY, colW - 4, timelineH);
        ctx.strokeStyle = isViewed ? dyn.color : '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 2, timelineY, colW - 4, timelineH);

        // Dynasty name header
        ctx.fillStyle = isViewed ? dyn.color : '#888';
        ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(dyn.name, x + colW / 2, timelineY - 8);
        ctx.font = '8px sans-serif'; ctx.fillStyle = '#666';
        ctx.fillText(dyn.period, x + colW / 2, timelineY - 0);

        // Draw events as nodes on the timeline
        dyn.events.forEach(function(evt, ei) {
            var ey = timelineY + 25 + ei * (timelineH - 40) / (dyn.events.length);
            var nodeR = 6;

            // Event node
            ctx.beginPath();
            ctx.arc(x + colW / 2, ey, nodeR, 0, Math.PI * 2);
            ctx.fillStyle = isViewed ? dyn.color : '#444';
            ctx.fill();
            ctx.strokeStyle = isViewed ? '#fff' : '#555';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Connecting line between events
            if(ei > 0) {
                var prevY = timelineY + 25 + (ei - 1) * (timelineH - 40) / (dyn.events.length);
                ctx.beginPath();
                ctx.moveTo(x + colW / 2, prevY + nodeR);
                ctx.lineTo(x + colW / 2, ey - nodeR);
                ctx.strokeStyle = isViewed ? dyn.color + '88' : '#33333388';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Event text
            ctx.fillStyle = isViewed ? '#fff' : '#666';
            ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
            var evtText = evt.length > 7 ? evt.substring(0, 6) + '..' : evt;
            ctx.fillText(evtText, x + colW / 2, ey + nodeR + 12);
        });

        // Compiled indicator
        if(isViewed) {
            ctx.fillStyle = '#ffd700'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('✓', x + colW / 2, timelineY + timelineH + 16);
        }
    });

    // Compilation progress bar
    var viewedCount = Object.keys(v22State.chronicle.viewed).length;
    var progW = W - 100;
    var progY = H - 50;
    ctx.fillStyle = '#333';
    ctx.fillRect(50, progY, progW, 12);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(50, progY, progW * (viewedCount / dynasties.length), 12);
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.strokeRect(50, progY, progW, 12);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('편찬 진행: ' + viewedCount + '/' + dynasties.length + ' 왕조 | 편찬 횟수: ' + v22State.chronicle.compiled, W / 2, H - 12);
}

// 3. City Logistics Hub Manager
function renderLogisticsHub(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 물류 허브 관리기', W/2, 24);

    var goods = LOGISTICS_GOODS;

    // Initialize goods state
    goods.forEach(function(g) {
        if(!v22State.logistics.goods[g.id]) {
            v22State.logistics.goods[g.id] = {
                supply: Math.floor(Math.random() * 80 + 20),
                demand: Math.floor(Math.random() * 80 + 20),
                inTransit: Math.floor(Math.random() * 30)
            };
        }
    });

    // Sankey-style flow visualization
    var leftX = 40, rightX = W - 40;
    var flowY = 55, flowH = 250;
    var nodeH = flowH / goods.length - 4;

    // Supply side (left column)
    ctx.fillStyle = '#aaa'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('공급', leftX + 30, flowY - 10);
    ctx.fillText('수송중', W / 2, flowY - 10);
    ctx.fillText('수요', rightX - 30, flowY - 10);

    goods.forEach(function(g, i) {
        var data = v22State.logistics.goods[g.id];
        var y = flowY + i * (nodeH + 4);

        // Supply node (left)
        var supplyW = Math.max(15, (data.supply / 100) * 60);
        ctx.fillStyle = g.color + 'cc';
        ctx.fillRect(leftX, y, supplyW, nodeH);
        ctx.strokeStyle = g.color; ctx.lineWidth = 1;
        ctx.strokeRect(leftX, y, supplyW, nodeH);

        // Supply label
        ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(g.icon + ' ' + data.supply, leftX + supplyW + 5, y + nodeH / 2 + 4);

        // Demand node (right)
        var demandW = Math.max(15, (data.demand / 100) * 60);
        ctx.fillStyle = g.color + '88';
        ctx.fillRect(rightX - demandW, y, demandW, nodeH);
        ctx.strokeStyle = g.color; ctx.lineWidth = 1;
        ctx.strokeRect(rightX - demandW, y, demandW, nodeH);

        // Demand label
        ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(data.demand + ' ' + g.name, rightX - demandW - 5, y + nodeH / 2 + 4);

        // Flow line connecting supply to demand (curved)
        var flowWidth = Math.max(1, Math.min(8, data.inTransit / 10));
        ctx.beginPath();
        var sx = leftX + supplyW;
        var sy = y + nodeH / 2;
        var dx = rightX - demandW;
        var dy = y + nodeH / 2;
        var cp1x = sx + (dx - sx) * 0.35;
        var cp2x = sx + (dx - sx) * 0.65;
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, sy, cp2x, dy, dx, dy);
        ctx.strokeStyle = g.color + '66';
        ctx.lineWidth = flowWidth;
        ctx.stroke();

        // Transit indicator at midpoint
        var midX = (sx + dx) / 2;
        ctx.fillStyle = g.color; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(data.inTransit, midX, sy - 5);
    });

    // Throughput summary
    var totalThroughput = 0;
    goods.forEach(function(g){ totalThroughput += v22State.logistics.goods[g.id].inTransit; });
    v22State.logistics.throughput = totalThroughput;

    var effColor = v22State.logistics.efficiency >= 70 ? '#4CAF50' : v22State.logistics.efficiency >= 40 ? '#FF9800' : '#F44336';
    ctx.fillStyle = effColor; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('물류 효율: ' + v22State.logistics.efficiency + '% | 총 수송량: ' + totalThroughput + ' | 배송: ' + v22State.logistics.deliveries, W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 물류 배송 시뮬레이션 | 공급망 최적화', W / 2, H - 12);
}

// 4. Natural Disaster Historical Archive
function renderDisasterArchive(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 천재지변 기록관', W/2, 24);

    var disasters = DISASTER_TYPES;

    // Initialize disaster records
    disasters.forEach(function(d) {
        if(!v22State.disaster.records[d.id]) {
            v22State.disaster.records[d.id] = {
                occurrences: Math.floor(Math.random() * 8 + 1),
                damage: Math.floor(Math.random() * d.maxDamage * 0.6 + d.maxDamage * 0.1),
                lastYear: '조선 ' + (Math.floor(Math.random() * 500) + 1400) + '년'
            };
        }
    });

    // Left: disaster history timeline (vertical)
    var histX = 30, histY = 55, histH = 230;
    ctx.fillStyle = '#aaa'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('재해 기록', histX, histY - 8);

    disasters.forEach(function(d, i) {
        var rec = v22State.disaster.records[d.id];
        var y = histY + i * (histH / disasters.length);
        var rowH = histH / disasters.length - 4;

        // Icon and name
        ctx.fillStyle = '#fff'; ctx.font = '14px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(d.icon, histX, y + rowH / 2 + 5);
        ctx.font = '10px sans-serif'; ctx.fillStyle = d.color;
        ctx.fillText(d.name, histX + 22, y + rowH / 2 + 1);

        // Occurrence count
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif';
        ctx.fillText(rec.occurrences + '회', histX + 22, y + rowH / 2 + 13);

        // Last occurrence
        ctx.fillStyle = '#888'; ctx.font = '8px sans-serif';
        ctx.fillText(rec.lastYear, histX + 55, y + rowH / 2 + 13);
    });

    // Right: Damage bar chart
    var barX = 200, barY = 55, barW = W - barX - 30, barH = 230;
    ctx.fillStyle = '#aaa'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('피해 규모 분석', barX + barW / 2, barY - 8);

    var eachBarH = barH / disasters.length - 6;
    disasters.forEach(function(d, i) {
        var rec = v22State.disaster.records[d.id];
        var y = barY + i * (barH / disasters.length);
        var fillW = (rec.damage / d.maxDamage) * (barW - 40);

        // Background
        ctx.fillStyle = '#1e1e34';
        ctx.fillRect(barX + 40, y, barW - 40, eachBarH);

        // Damage bar with gradient
        var grad = ctx.createLinearGradient(barX + 40, y, barX + 40 + fillW, y);
        grad.addColorStop(0, d.color + 'cc');
        grad.addColorStop(1, d.color + '44');
        ctx.fillStyle = grad;
        ctx.fillRect(barX + 40, y, fillW, eachBarH);

        // Border
        ctx.strokeStyle = d.color + '66'; ctx.lineWidth = 1;
        ctx.strokeRect(barX + 40, y, barW - 40, eachBarH);

        // Damage value
        ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(rec.damage + '/' + d.maxDamage, barX + 40 + fillW + 5, y + eachBarH / 2 + 4);

        // Severity indicator
        var severity = rec.damage / d.maxDamage;
        var sevLabel = severity >= 0.7 ? '위험' : severity >= 0.4 ? '주의' : '안전';
        var sevColor = severity >= 0.7 ? '#F44336' : severity >= 0.4 ? '#FF9800' : '#4CAF50';
        ctx.fillStyle = sevColor; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(sevLabel, barX + 38, y + eachBarH / 2 + 4);
    });

    // Preparedness gauge at bottom
    var gaugeX = 60, gaugeY = 310, gaugeW = W - 120, gaugeH = 16;
    ctx.fillStyle = '#333';
    ctx.fillRect(gaugeX, gaugeY, gaugeW, gaugeH);
    var prepColor = v22State.disaster.preparedness >= 70 ? '#4CAF50' : v22State.disaster.preparedness >= 40 ? '#FF9800' : '#F44336';
    ctx.fillStyle = prepColor;
    ctx.fillRect(gaugeX, gaugeY, gaugeW * (v22State.disaster.preparedness / 100), gaugeH);
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
    ctx.strokeRect(gaugeX, gaugeY, gaugeW, gaugeH);

    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('방비도: ' + v22State.disaster.preparedness + '%', W / 2, gaugeY + gaugeH / 2 + 4);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('총 피해: ' + v22State.disaster.totalDamage + ' | 대응: ' + v22State.disaster.responses + '회', W / 2, H - 12);
}

// 5. Infrastructure Aging Analyzer
function renderInfraAnalyzer(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 인프라 노후도 분석기', W/2, 24);

    var facilities = INFRA_FACILITIES;

    // Initialize facilities
    facilities.forEach(function(f) {
        if(!v22State.infra.facilities[f.id]) {
            v22State.infra.facilities[f.id] = {
                condition: Math.floor(Math.random() * 60 + 20),
                age: Math.floor(Math.random() * 50 + 5),
                lastRepair: Math.floor(Math.random() * 10)
            };
        }
    });

    // Draw circular gauge for each facility (2 rows x 4 cols)
    var cols = 4, gaugeR = 38;
    var startX = 45, startY = 60;
    var colW = (W - startX * 2) / cols;
    var rowH = 145;

    var totalCondition = 0;
    facilities.forEach(function(fac, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cx = startX + col * colW + colW / 2;
        var cy = startY + row * rowH + gaugeR + 20;
        var data = v22State.infra.facilities[fac.id];
        totalCondition += data.condition;

        // Gauge background (full circle)
        ctx.beginPath();
        ctx.arc(cx, cy, gaugeR, 0, Math.PI * 2);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 8; ctx.stroke();

        // Gauge value arc
        var startAngle = -Math.PI / 2;
        var endAngle = startAngle + (data.condition / 100) * Math.PI * 2;
        var condColor = data.condition >= 70 ? '#4CAF50' : data.condition >= 40 ? '#FF9800' : '#F44336';

        ctx.beginPath();
        ctx.arc(cx, cy, gaugeR, startAngle, endAngle);
        ctx.strokeStyle = condColor; ctx.lineWidth = 8; ctx.stroke();

        // Condition text center
        ctx.fillStyle = condColor; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(data.condition + '%', cx, cy + 4);

        // Age text
        ctx.font = '8px sans-serif'; ctx.fillStyle = '#888';
        ctx.fillText('노후 ' + data.age + '년', cx, cy + 18);

        // Icon above gauge
        ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif';
        ctx.fillText(fac.icon, cx, cy - gaugeR - 10);

        // Name below gauge
        ctx.fillStyle = '#ccc'; ctx.font = '10px sans-serif';
        ctx.fillText(fac.name, cx, cy + gaugeR + 18);

        // Repair status
        var repairStatus = data.lastRepair <= 2 ? '양호' : data.lastRepair <= 5 ? '점검필요' : '긴급보수';
        var repColor = data.lastRepair <= 2 ? '#4CAF50' : data.lastRepair <= 5 ? '#FF9800' : '#F44336';
        ctx.fillStyle = repColor; ctx.font = '8px sans-serif';
        ctx.fillText(repairStatus, cx, cy + gaugeR + 30);
    });

    v22State.infra.avgCondition = Math.round(totalCondition / facilities.length);
    var gradeLabel = v22State.infra.avgCondition >= 80 ? 'S' : v22State.infra.avgCondition >= 65 ? 'A' : v22State.infra.avgCondition >= 50 ? 'B' : v22State.infra.avgCondition >= 30 ? 'C' : 'D';
    var gradeColor = gradeLabel === 'S' ? '#ffd700' : gradeLabel === 'A' ? '#4CAF50' : gradeLabel === 'B' ? '#2196F3' : gradeLabel === 'C' ? '#FF9800' : '#F44336';

    ctx.fillStyle = gradeColor; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('인프라 등급: ' + gradeLabel + ' | 평균 상태: ' + v22State.infra.avgCondition + '% | 점검: ' + v22State.infra.inspections, W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 시설 점검 + 보수 | 보수 횟수: ' + v22State.infra.repairs, W / 2, H - 12);
}

// 6. Public Opinion Poll Simulator
function renderPollSimulator(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 600, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('민심 여론조사 시뮬레이터', W/2, 24);

    var classes = POLL_CLASSES;

    // Initialize opinions
    classes.forEach(function(cls) {
        if(!v22State.poll.opinions[cls.id]) {
            v22State.poll.opinions[cls.id] = {
                approval: Math.floor(Math.random() * 60 + 20),
                concerns: Math.floor(Math.random() * 5),
                participation: Math.floor(Math.random() * 80 + 10)
            };
        }
    });

    // Polar area chart (left side)
    var pcx = 170, pcy = 185, pRadius = 110;
    var axes = classes.length;

    // Draw axis grid rings
    for(var ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for(var a = 0; a <= axes; a++) {
            var angle = (Math.PI * 2 / axes) * a - Math.PI / 2;
            var rx = pcx + (pRadius * ring / 4) * Math.cos(angle);
            var ry = pcy + (pRadius * ring / 4) * Math.sin(angle);
            a === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
        }
        ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Draw axes
    for(var ax = 0; ax < axes; ax++) {
        var angle2 = (Math.PI * 2 / axes) * ax - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(pcx, pcy);
        ctx.lineTo(pcx + pRadius * Math.cos(angle2), pcy + pRadius * Math.sin(angle2));
        ctx.strokeStyle = '#444'; ctx.lineWidth = 1; ctx.stroke();

        // Axis label
        var lx = pcx + (pRadius + 22) * Math.cos(angle2);
        var ly = pcy + (pRadius + 22) * Math.sin(angle2);
        ctx.fillStyle = classes[ax].color; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(classes[ax].icon + classes[ax].name, lx, ly + 4);
    }

    // Filled approval polygon
    ctx.beginPath();
    classes.forEach(function(cls, i) {
        var data = v22State.poll.opinions[cls.id];
        var angle3 = (Math.PI * 2 / axes) * i - Math.PI / 2;
        var px = pcx + (pRadius * data.approval / 100) * Math.cos(angle3);
        var py = pcy + (pRadius * data.approval / 100) * Math.sin(angle3);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,215,0,0.2)'; ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke();

    // Data points
    classes.forEach(function(cls, i) {
        var data = v22State.poll.opinions[cls.id];
        var angle4 = (Math.PI * 2 / axes) * i - Math.PI / 2;
        var px = pcx + (pRadius * data.approval / 100) * Math.cos(angle4);
        var py = pcy + (pRadius * data.approval / 100) * Math.sin(angle4);
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = cls.color; ctx.fill();
    });

    // Approval ratings list (right side)
    var listX = 320, listY = 55;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('계층별 지지율', listX, listY);

    classes.forEach(function(cls, i) {
        var data = v22State.poll.opinions[cls.id];
        var y = listY + 20 + i * 42;

        // Class icon and name
        ctx.fillStyle = '#fff'; ctx.font = '14px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(cls.icon, listX, y + 4);
        ctx.font = '11px sans-serif'; ctx.fillStyle = cls.color;
        ctx.fillText(cls.name, listX + 22, y + 2);

        // Approval bar
        var barX2 = listX + 22, barY2 = y + 10, barW2 = 200, barH2 = 12;
        ctx.fillStyle = '#333';
        ctx.fillRect(barX2, barY2, barW2, barH2);

        var appColor = data.approval >= 60 ? '#4CAF50' : data.approval >= 35 ? '#FF9800' : '#F44336';
        ctx.fillStyle = appColor;
        ctx.fillRect(barX2, barY2, barW2 * (data.approval / 100), barH2);
        ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
        ctx.strokeRect(barX2, barY2, barW2, barH2);

        ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(data.approval + '%', barX2 + barW2 + 25, barY2 + 10);
    });

    // Overall approval
    var totalApp = 0;
    classes.forEach(function(cls){ totalApp += v22State.poll.opinions[cls.id].approval; });
    v22State.poll.approval = Math.round(totalApp / classes.length);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('종합 지지율: ' + v22State.poll.approval + '% | 조사: ' + v22State.poll.surveys + '회', W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 여론조사 실시 | 참여율 분석', W / 2, H - 12);
}

// 7. Royal Diplomacy Strategy Simulator
function renderDiplomacySimulator(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 640, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 외교 전략 시뮬레이터', W/2, 24);

    var nations = DIPLO_NATIONS;
    var padding = 50;
    var mapW = W - padding * 2;
    var mapH = H - 120;
    var mapY = 50;

    // Initialize relations
    nations.forEach(function(n) {
        if(!v22State.diplomacy.relations[n.id]) {
            v22State.diplomacy.relations[n.id] = {
                friendliness: Math.floor(Math.random() * 60 + 10),
                trade: Math.floor(Math.random() * 50),
                treaty: false
            };
        }
    });

    // Draw relationship lines from Korea (center) to each nation
    var koreaX = padding + 0.5 * mapW;
    var koreaY = mapY + 0.4 * mapH;

    nations.forEach(function(nation, i) {
        var rel = v22State.diplomacy.relations[nation.id];
        var nx = padding + nation.x * mapW;
        var ny = mapY + nation.y * mapH;

        // Relation line
        var lineW = Math.max(1, Math.min(5, rel.friendliness / 25));
        var relColor = rel.friendliness >= 60 ? '#4CAF50' : rel.friendliness >= 30 ? '#FF9800' : '#F44336';
        ctx.beginPath();
        ctx.moveTo(koreaX, koreaY);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = relColor + '88';
        ctx.lineWidth = lineW;
        ctx.stroke();

        // Friendliness value at midpoint
        var mx = (koreaX + nx) / 2;
        var my = (koreaY + ny) / 2;
        ctx.fillStyle = relColor; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(rel.friendliness, mx, my - 4);

        // Nation node
        var nodeR = 16;
        ctx.beginPath(); ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = nation.color + '55'; ctx.fill();
        ctx.strokeStyle = rel.treaty ? '#ffd700' : nation.color;
        ctx.lineWidth = rel.treaty ? 3 : 1.5;
        ctx.stroke();

        // Nation icon and name
        ctx.fillStyle = '#fff'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(nation.icon, nx, ny - 2);
        ctx.font = '9px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(nation.name, nx, ny + nodeR + 12);

        // Treaty indicator
        if(rel.treaty) {
            ctx.fillStyle = '#ffd700'; ctx.font = '8px sans-serif';
            ctx.fillText('조약', nx, ny + nodeR + 22);
        }
    });

    // Korea node (center)
    ctx.beginPath(); ctx.arc(koreaX, koreaY, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd70033'; ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🇰🇷', koreaX, koreaY - 2);
    ctx.font = '10px sans-serif';
    ctx.fillText('조선', koreaX, koreaY + 14);

    // Diplomacy strategy matrix (bottom)
    var strategies = ['친선', '교역', '동맹', '견제'];
    var matY = H - 55;
    ctx.fillStyle = '#aaa'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    strategies.forEach(function(s, i) {
        var sx = 100 + i * 130;
        var sColor = i === 0 ? '#4CAF50' : i === 1 ? '#2196F3' : i === 2 ? '#ffd700' : '#F44336';
        ctx.fillStyle = sColor + '44';
        ctx.fillRect(sx, matY, 100, 18);
        ctx.strokeStyle = sColor; ctx.lineWidth = 1;
        ctx.strokeRect(sx, matY, 100, 18);
        ctx.fillStyle = sColor; ctx.font = '10px sans-serif';
        ctx.fillText(s, sx + 50, matY + 13);
    });

    var treatyCount = 0;
    nations.forEach(function(n){ if(v22State.diplomacy.relations[n.id].treaty) treatyCount++; });
    v22State.diplomacy.treaties = treatyCount;

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('조약: ' + treatyCount + '건 | 사절: ' + v22State.diplomacy.envoys + ' | 영향력: ' + v22State.diplomacy.influence, W / 2, H - 12);
}

// 8. Cultural Diversity Index
function renderCultureDiversity(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 문화 다양성 지수', W/2, 24);

    var cultures = CULTURE_TYPES;

    // Initialize culture indices
    cultures.forEach(function(c) {
        if(!v22State.culture.indices[c.id]) {
            v22State.culture.indices[c.id] = {
                local: Math.floor(Math.random() * 60 + 20),
                foreign: Math.floor(Math.random() * 40 + 5),
                fusion: Math.floor(Math.random() * 30)
            };
        }
    });

    // Stacked bar chart
    var barX = 60, barY = 55, barW = W - 120, barH = 220;
    var eachBarW = barW / cultures.length - 8;
    var maxVal = 150;

    // Y-axis labels
    ctx.fillStyle = '#888'; ctx.font = '8px sans-serif'; ctx.textAlign = 'right';
    for(var yl = 0; yl <= 4; yl++) {
        var yv = yl * (maxVal / 4);
        var yp = barY + barH - (yv / maxVal) * barH;
        ctx.fillText(yv + '', barX - 5, yp + 3);
        ctx.beginPath(); ctx.moveTo(barX, yp); ctx.lineTo(barX + barW, yp);
        ctx.strokeStyle = '#2a2a3e'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Legend
    var legends = [
        { name: '전통', color: '#4CAF50' },
        { name: '외래', color: '#2196F3' },
        { name: '융합', color: '#FF9800' }
    ];
    legends.forEach(function(lg, i) {
        var lx = barX + 5 + i * 80;
        ctx.fillStyle = lg.color; ctx.fillRect(lx, barY - 18, 10, 10);
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(lg.name, lx + 14, barY - 9);
    });

    cultures.forEach(function(culture, i) {
        var data = v22State.culture.indices[culture.id];
        var x = barX + i * (eachBarW + 8) + 4;
        var totalVal = data.local + data.foreign + data.fusion;

        // Local (bottom segment)
        var localH = (data.local / maxVal) * barH;
        ctx.fillStyle = '#4CAF50cc';
        ctx.fillRect(x, barY + barH - localH, eachBarW, localH);

        // Foreign (middle segment)
        var foreignH = (data.foreign / maxVal) * barH;
        ctx.fillStyle = '#2196F3cc';
        ctx.fillRect(x, barY + barH - localH - foreignH, eachBarW, foreignH);

        // Fusion (top segment)
        var fusionH = (data.fusion / maxVal) * barH;
        ctx.fillStyle = '#FF9800cc';
        ctx.fillRect(x, barY + barH - localH - foreignH - fusionH, eachBarW, fusionH);

        // Border
        var stackTop = barY + barH - localH - foreignH - fusionH;
        ctx.strokeStyle = culture.color + '88'; ctx.lineWidth = 1;
        ctx.strokeRect(x, stackTop, eachBarW, localH + foreignH + fusionH);

        // Total value at top
        ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(totalVal, x + eachBarW / 2, stackTop - 5);

        // Icon and name below
        ctx.fillStyle = '#fff'; ctx.font = '14px sans-serif';
        ctx.fillText(culture.icon, x + eachBarW / 2, barY + barH + 18);
        ctx.fillStyle = '#ccc'; ctx.font = '9px sans-serif';
        ctx.fillText(culture.name, x + eachBarW / 2, barY + barH + 32);
    });

    // Diversity score calculation
    var totalDiversity = 0;
    cultures.forEach(function(c) {
        var d = v22State.culture.indices[c.id];
        totalDiversity += d.local + d.foreign + d.fusion;
    });
    v22State.culture.diversity = Math.min(100, Math.round(totalDiversity / (cultures.length * 1.5)));

    var divGrade = v22State.culture.diversity >= 80 ? 'S' : v22State.culture.diversity >= 60 ? 'A' : v22State.culture.diversity >= 40 ? 'B' : v22State.culture.diversity >= 20 ? 'C' : 'D';
    var divColor = divGrade === 'S' ? '#ffd700' : divGrade === 'A' ? '#4CAF50' : divGrade === 'B' ? '#2196F3' : divGrade === 'C' ? '#FF9800' : '#F44336';

    ctx.fillStyle = divColor; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('다양성 지수: ' + v22State.culture.diversity + ' [' + divGrade + '등급] | 축제: ' + v22State.culture.festivals, W / 2, H - 30);
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 문화 교류 촉진 | 상호작용: ' + v22State.culture.interactions, W / 2, H - 12);
}

// ===================== NAVIGATION & UI =====================
var v22Sections = [
    { id: 'v22_education', name: '교육시스템', icon: '📖', render: renderEducationSystem },
    { id: 'v22_chronicle', name: '연대기', icon: '📜', render: renderChronicleCompiler },
    { id: 'v22_logistics', name: '물류허브', icon: '📦', render: renderLogisticsHub },
    { id: 'v22_disaster', name: '천재지변', icon: '🌊', render: renderDisasterArchive },
    { id: 'v22_infra', name: '인프라', icon: '🏗️', render: renderInfraAnalyzer },
    { id: 'v22_poll', name: '여론조사', icon: '📊', render: renderPollSimulator },
    { id: 'v22_diplomacy', name: '외교전략', icon: '🤝', render: renderDiplomacySimulator },
    { id: 'v22_culture', name: '문화다양성', icon: '🎭', render: renderCultureDiversity }
];

var v22CurrentSection = -1;
var v22Panel = null;
var v22Canvas = null;

function createV22Panel() {
    if(v22Panel) return;
    v22Panel = document.createElement('div');
    v22Panel.id = 'v22-panel';
    v22Panel.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:192;justify-content:center;align-items:center;padding:10px;';

    var box = document.createElement('div');
    box.style.cssText = 'background:linear-gradient(145deg,#2a2a3e,#1a1a2e);border:2px solid #c4923a;border-radius:16px;padding:14px;max-width:680px;width:100%;max-height:92vh;overflow-y:auto;';

    var header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
    header.innerHTML = '<span style="color:#ffd700;font-size:16px;font-weight:bold;">v22 도시 경영 시스템</span>';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'background:#c4923a;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;';
    closeBtn.onclick = function(){ v22Panel.style.display = 'none'; };
    header.appendChild(closeBtn);
    box.appendChild(header);

    var nav = document.createElement('div');
    nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;';
    v22Sections.forEach(function(sec, i) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:#2a2a4e;border:1px solid #555;color:#ccc;padding:6px 10px;border-radius:8px;font-size:11px;cursor:pointer;flex:1;min-width:70px;text-align:center;';
        btn.innerHTML = sec.icon + '<br>' + sec.name;
        btn.onclick = function(){
            v22CurrentSection = i;
            playV22SFX('edu_enroll');
            sec.render(v22Canvas);
            nav.querySelectorAll('button').forEach(function(b, bi){
                b.style.borderColor = bi === i ? '#ffd700' : '#555';
                b.style.color = bi === i ? '#ffd700' : '#ccc';
            });
        };
        nav.appendChild(btn);
    });
    box.appendChild(nav);

    v22Canvas = document.createElement('canvas');
    v22Canvas.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto;border-radius:8px;cursor:pointer;';
    v22Canvas.onclick = function(e) { handleV22CanvasClick(e); };
    box.appendChild(v22Canvas);

    var quizBtn = document.createElement('button');
    quizBtn.textContent = '📝 v22 퀴즈 (' + V22_QUIZ.length + '문제)';
    quizBtn.style.cssText = 'display:block;margin:10px auto 0;background:#9C27B0;border:none;color:#fff;padding:8px 20px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;';
    quizBtn.onclick = function(){ startV22Quiz(); };
    box.appendChild(quizBtn);

    v22Panel.appendChild(box);
    document.body.appendChild(v22Panel);
}

function openV22Panel() {
    createV22Panel();
    v22Panel.style.display = 'flex';
    if(v22CurrentSection < 0) v22CurrentSection = 0;
    v22Sections[v22CurrentSection].render(v22Canvas);
    var navBtns = v22Panel.querySelectorAll('div > button');
    navBtns.forEach(function(b, i){ if(i < v22Sections.length) { b.style.borderColor = i === v22CurrentSection ? '#ffd700' : '#555'; b.style.color = i === v22CurrentSection ? '#ffd700' : '#ccc'; }});
}

// ===================== CANVAS INTERACTION =====================
function handleV22CanvasClick(e) {
    var rect = v22Canvas.getBoundingClientRect();
    var scaleX = v22Canvas.width / rect.width;
    var x = (e.clientX - rect.left) * scaleX;
    var y = (e.clientY - rect.top) * (v22Canvas.height / rect.height);

    switch(v22CurrentSection) {
        case 0: // Education
            v22State.education.interactions++;
            EDU_INSTITUTIONS.forEach(function(inst) {
                var data = v22State.education.institutions[inst.id];
                data.students = Math.min(inst.capacity, data.students + Math.floor(Math.random() * 8 + 2));
                if(Math.random() < 0.3) { data.graduates++; }
            });
            v22State.education.literacy = Math.min(100, v22State.education.literacy + Math.floor(Math.random() * 4 + 1));
            if(Math.random() < 0.4) v22State.education.examsPassed++;
            playV22SFX('edu_graduate');
            if(v22State.education.interactions === 1) checkV22Achievement('edu_founder');
            if(v22State.education.examsPassed >= 10) checkV22Achievement('exam_master');
            renderEducationSystem(v22Canvas);
            break;

        case 1: // Chronicle
            var dynastyIdx = Math.floor(x / (640 / DYNASTY_EVENTS.length));
            dynastyIdx = Math.max(0, Math.min(DYNASTY_EVENTS.length - 1, dynastyIdx));
            var dyn = DYNASTY_EVENTS[dynastyIdx];
            if(!v22State.chronicle.viewed[dyn.id]) {
                v22State.chronicle.viewed[dyn.id] = true;
                v22State.chronicle.compiled++;
                playV22SFX('chronicle_compile');
            } else {
                playV22SFX('chronicle_write');
            }
            var allDynViewed = DYNASTY_EVENTS.every(function(d){ return v22State.chronicle.viewed[d.id]; });
            if(allDynViewed) checkV22Achievement('chronicle_author');
            renderChronicleCompiler(v22Canvas);
            break;

        case 2: // Logistics
            v22State.logistics.deliveries++;
            LOGISTICS_GOODS.forEach(function(g) {
                var data = v22State.logistics.goods[g.id];
                var shipped = Math.floor(Math.random() * 15 + 5);
                data.inTransit = Math.min(100, data.inTransit + shipped);
                data.supply = Math.max(5, data.supply - Math.floor(Math.random() * 8));
                data.demand = Math.max(5, data.demand + Math.floor(Math.random() * 6 - 3));
                if(data.inTransit >= data.demand) {
                    data.demand = Math.max(5, data.demand - Math.floor(data.inTransit * 0.3));
                    data.inTransit = Math.max(0, data.inTransit - Math.floor(data.inTransit * 0.4));
                    data.supply = Math.min(100, data.supply + Math.floor(Math.random() * 10));
                }
            });
            v22State.logistics.efficiency = Math.min(100, v22State.logistics.efficiency + Math.floor(Math.random() * 6 - 1));
            playV22SFX('logistics_arrive');
            var throughput = 0;
            LOGISTICS_GOODS.forEach(function(g){ throughput += v22State.logistics.goods[g.id].inTransit; });
            v22State.logistics.throughput = throughput;
            if(throughput >= 5000) checkV22Achievement('logistics_expert');
            renderLogisticsHub(v22Canvas);
            break;

        case 3: // Disaster
            v22State.disaster.responses++;
            DISASTER_TYPES.forEach(function(d) {
                var rec = v22State.disaster.records[d.id];
                if(Math.random() < 0.3) {
                    rec.occurrences++;
                    rec.damage = Math.min(d.maxDamage, rec.damage + Math.floor(Math.random() * 15 + 5));
                    v22State.disaster.totalDamage += Math.floor(Math.random() * 10 + 5);
                } else {
                    rec.damage = Math.max(0, rec.damage - Math.floor(Math.random() * 12 + 3));
                }
            });
            v22State.disaster.preparedness = Math.min(100, v22State.disaster.preparedness + Math.floor(Math.random() * 6 + 1));
            playV22SFX(Math.random() < 0.4 ? 'disaster_strike' : 'disaster_record');
            if(v22State.disaster.responses >= 10) checkV22Achievement('disaster_survivor');
            renderDisasterArchive(v22Canvas);
            break;

        case 4: // Infrastructure
            v22State.infra.inspections++;
            INFRA_FACILITIES.forEach(function(f) {
                var data = v22State.infra.facilities[f.id];
                if(Math.random() < 0.5) {
                    data.condition = Math.min(100, data.condition + Math.floor(Math.random() * 12 + 3));
                    data.lastRepair = 0;
                    v22State.infra.repairs++;
                } else {
                    data.condition = Math.max(5, data.condition - Math.floor(Math.random() * 5));
                    data.age++;
                    data.lastRepair++;
                }
            });
            playV22SFX('infra_repair');
            var totalCond = 0;
            INFRA_FACILITIES.forEach(function(f){ totalCond += v22State.infra.facilities[f.id].condition; });
            v22State.infra.avgCondition = Math.round(totalCond / INFRA_FACILITIES.length);
            if(v22State.infra.avgCondition >= 80) checkV22Achievement('infra_engineer');
            renderInfraAnalyzer(v22Canvas);
            break;

        case 5: // Poll
            v22State.poll.surveys++;
            POLL_CLASSES.forEach(function(cls) {
                var data = v22State.poll.opinions[cls.id];
                data.approval = Math.max(5, Math.min(95, data.approval + Math.floor(Math.random() * 16 - 6)));
                data.participation = Math.min(100, data.participation + Math.floor(Math.random() * 5 + 1));
                data.concerns = Math.floor(Math.random() * 5);
            });
            playV22SFX('poll_result');
            if(v22State.poll.surveys >= 10) checkV22Achievement('poll_analyst');
            renderPollSimulator(v22Canvas);
            break;

        case 6: // Diplomacy
            v22State.diplomacy.envoys++;
            var targetIdx = Math.floor(Math.random() * DIPLO_NATIONS.length);
            var targetNation = DIPLO_NATIONS[targetIdx];
            var rel = v22State.diplomacy.relations[targetNation.id];
            rel.friendliness = Math.min(100, rel.friendliness + Math.floor(Math.random() * 12 + 3));
            rel.trade = Math.min(100, rel.trade + Math.floor(Math.random() * 8));
            if(rel.friendliness >= 70 && !rel.treaty) {
                rel.treaty = true;
                playV22SFX('diplo_treaty');
            } else {
                playV22SFX('diplo_send');
            }
            v22State.diplomacy.influence = Math.min(100, v22State.diplomacy.influence + Math.floor(Math.random() * 4 + 1));
            var treatyCount2 = 0;
            DIPLO_NATIONS.forEach(function(n){ if(v22State.diplomacy.relations[n.id].treaty) treatyCount2++; });
            v22State.diplomacy.treaties = treatyCount2;
            if(treatyCount2 >= 8) checkV22Achievement('diplomat_supreme');
            renderDiplomacySimulator(v22Canvas);
            break;

        case 7: // Culture
            v22State.culture.interactions++;
            CULTURE_TYPES.forEach(function(c) {
                var data = v22State.culture.indices[c.id];
                data.local = Math.min(100, data.local + Math.floor(Math.random() * 6 + 1));
                data.foreign = Math.min(80, data.foreign + Math.floor(Math.random() * 4));
                data.fusion = Math.min(60, data.fusion + Math.floor(Math.random() * 3));
            });
            if(Math.random() < 0.3) v22State.culture.festivals++;
            playV22SFX('culture_discover');
            var totalDiv = 0;
            CULTURE_TYPES.forEach(function(c) {
                var d = v22State.culture.indices[c.id];
                totalDiv += d.local + d.foreign + d.fusion;
            });
            v22State.culture.diversity = Math.min(100, Math.round(totalDiv / (CULTURE_TYPES.length * 1.5)));
            if(v22State.culture.diversity >= 80) checkV22Achievement('culture_patron');
            renderCultureDiversity(v22Canvas);
            break;
    }

    // Check visited sections
    var visited = new Set();
    if(v22State.education.interactions > 0) visited.add(0);
    if(Object.keys(v22State.chronicle.viewed).length > 0) visited.add(1);
    if(v22State.logistics.deliveries > 0) visited.add(2);
    if(v22State.disaster.responses > 0) visited.add(3);
    if(v22State.infra.inspections > 0) visited.add(4);
    if(v22State.poll.surveys > 0) visited.add(5);
    if(v22State.diplomacy.envoys > 0) visited.add(6);
    if(v22State.culture.interactions > 0) visited.add(7);
    if(visited.size >= 4) checkV22Achievement('v22_explorer');
    if(visited.size >= 8) checkV22Achievement('v22_complete');
}

// ===================== QUIZ =====================
function startV22Quiz() {
    playV22SFX('quiz_v22');
    var qIdx = 0; var score = 0;
    function showQuestion() {
        if(qIdx >= V22_QUIZ.length) {
            v22State.quiz.answered += V22_QUIZ.length;
            v22State.quiz.correct += score;
            if(score === V22_QUIZ.length) checkV22Achievement('quiz_v22_master');
            alert('퀴즈 완료! ' + score + '/' + V22_QUIZ.length + ' 정답\n' + (score >= 12 ? 'S등급! 탁월합니다!' : score >= 9 ? 'A등급! 훌륭합니다!' : score >= 6 ? 'B등급. 더 공부해보세요!' : 'C등급. 복습이 필요합니다.'));
            return;
        }
        var q = V22_QUIZ[qIdx];
        var ans = prompt('[문제 ' + (qIdx + 1) + '/' + V22_QUIZ.length + '] ' + q.q + '\n\n1. ' + q.options[0] + '\n2. ' + q.options[1] + '\n3. ' + q.options[2] + '\n4. ' + q.options[3] + '\n\n번호를 입력하세요 (1~4):');
        if(ans === null) return;
        var chosen = parseInt(ans) - 1;
        if(chosen === q.answer) { score++; playV22SFX('quiz_v22'); }
        else { playV22SFX('quiz_wrong_v22'); }
        qIdx++;
        showQuestion();
    }
    showQuestion();
}

// ===================== REGISTER NAVIGATION =====================
function addV22Button() {
    var existing = document.getElementById('v22-nav-btn');
    if(existing) return;

    var btn = document.createElement('button');
    btn.id = 'v22-nav-btn';
    btn.textContent = '🏛️';
    btn.title = 'v22 도시 경영 시스템';
    btn.style.cssText = 'position:fixed;top:50px;right:306px;z-index:10;background:rgba(0,0,0,0.7);border:1px solid #c4923a;color:#ffd700;width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;';
    btn.onclick = function(){ playV22SFX('edu_enroll'); openV22Panel(); };
    document.body.appendChild(btn);
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', function(e) {
    if(!e.shiftKey) return;
    if(e.code === 'KeyQ') {
        e.preventDefault(); openV22Panel(); return;
    }
    var keyMap = {
        'Digit1': 0, 'Digit2': 1, 'Digit3': 2, 'Digit4': 3,
        'Digit5': 4, 'Digit6': 5, 'Digit7': 6, 'Digit8': 7
    };
    if(keyMap.hasOwnProperty(e.code) && v22Panel && v22Panel.style.display === 'flex') {
        e.preventDefault();
        var idx = keyMap[e.code];
        if(idx < v22Sections.length) {
            v22CurrentSection = idx;
            v22Sections[idx].render(v22Canvas);
            playV22SFX('edu_enroll');
        }
    }
});

// ===================== INIT =====================
function initV22() {
    addV22Button();
    if(typeof window.v22Loaded === 'undefined') {
        window.v22Loaded = true;
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV22);
} else {
    initV22();
}

})();
