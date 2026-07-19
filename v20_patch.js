// =====================================================================
// city-builder v20_patch.js — PRIME Holdings NEXTERA+PRISM v20.0
// Self-contained IIFE patch:
// 1. 도시경제순환시뮬레이터 Canvas 620x400 (8산업부문 순환흐름 애니메이션)
// 2. 교통혼잡도히트맵 Canvas 620x400 (8x8격자 시간대별 혼잡 시뮬레이션)
// 3. 왕실건축양식진화도 Canvas 640x380 (6시대 건축양식 타임라인 비교)
// 4. 공공서비스커버리지맵 Canvas 620x380 (6종 공공서비스 커버리지 분석)
// 5. 인구이동시뮬레이터 Canvas 620x400 (6지역 인구유입유출 Sankey흐름)
// 6. 도시행복지수대시보드 Canvas 600x380 (8요소 반원게이지+종합등급)
// 7. 왕실예술후원관 Canvas 620x400 (10종 예술분야 후원/명성 매트릭스)
// 8. 자원순환생태계 Canvas 620x380 (8자원 순환다이어그램 애니메이션)
// +15 Quiz (235→250), +12 Achievements (206→218),
// SFX 14, Keyboard Shortcuts +8
// =====================================================================
(function(){
'use strict';

// ===================== SFX ENGINE =====================
var v20Ctx = null;
function getV20Audio() {
    if(!v20Ctx) {
        try { v20Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    }
    return v20Ctx;
}
function playV20SFX(type) {
    if(typeof audioMuted !== 'undefined' && audioMuted) return;
    var ctx = getV20Audio();
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
        case 'economy_flow':
            [392,494,587,659,784].forEach(function(f,i){ tone(f, i*0.08, 0.2, 'sine', 0.07); });
            break;
        case 'economy_cycle':
            tone(330, 0, 0.15, 'triangle', 0.08);
            tone(440, 0.12, 0.15, 'triangle', 0.08);
            tone(554, 0.24, 0.2, 'sine', 0.09);
            break;
        case 'traffic_jam':
            tone(196, 0, 0.3, 'sawtooth', 0.05);
            tone(220, 0.1, 0.2, 'square', 0.04);
            break;
        case 'traffic_clear':
            [330,392,494,587].forEach(function(f,i){ tone(f, i*0.06, 0.15, 'sine', 0.07); });
            break;
        case 'arch_evolve':
            tone(262, 0, 0.2, 'sine', 0.07);
            tone(330, 0.15, 0.2, 'sine', 0.07);
            tone(392, 0.3, 0.25, 'triangle', 0.08);
            tone(523, 0.5, 0.3, 'sine', 0.09);
            break;
        case 'service_expand':
            tone(440, 0, 0.15, 'square', 0.06);
            tone(554, 0.1, 0.15, 'square', 0.06);
            tone(659, 0.2, 0.2, 'sine', 0.07);
            break;
        case 'migration_flow':
            [262,294,330,349,392,440].forEach(function(f,i){ tone(f, i*0.09, 0.25, 'sine', 0.06); });
            break;
        case 'happiness_up':
            [523,659,784,1047].forEach(function(f,i){ tone(f, i*0.07, 0.2, 'sine', 0.08); });
            break;
        case 'happiness_down':
            tone(392, 0, 0.2, 'sawtooth', 0.05);
            tone(330, 0.15, 0.25, 'sawtooth', 0.04);
            break;
        case 'art_patron':
            [330,392,494,587,659,784].forEach(function(f,i){ tone(f, i*0.1, 0.3, 'sine', 0.07); });
            break;
        case 'resource_cycle':
            tone(262, 0, 0.15, 'triangle', 0.07);
            tone(330, 0.1, 0.15, 'triangle', 0.07);
            tone(392, 0.2, 0.2, 'sine', 0.08);
            break;
        case 'quiz_v20':
            tone(523, 0, 0.12, 'sine', 0.08);
            tone(659, 0.08, 0.12, 'sine', 0.08);
            tone(784, 0.16, 0.2, 'sine', 0.09);
            break;
        case 'quiz_wrong_v20':
            tone(330, 0, 0.2, 'sawtooth', 0.06);
            tone(262, 0.15, 0.3, 'sawtooth', 0.05);
            break;
        case 'achieve_v20':
            [523,659,784,1047,784,1047,1319].forEach(function(f,i){ tone(f, i*0.07, 0.22, 'sine', 0.08); });
            break;
    }
}

// ===================== STATE =====================
var v20State = {
    economy: { sectors: {}, cycles: 0, totalFlow: 0, gdp: 1000 },
    traffic: { grid: [], simCount: 0, avgCongestion: 0, improvements: 0 },
    architecture: { studied: {}, currentEra: 0, restorations: 0 },
    service: { coverage: {}, totalCoverage: 0, upgrades: 0 },
    migration: { flows: [], totalMigrants: 0, netGrowth: 0 },
    happiness: { factors: {}, index: 50, surveys: 0 },
    art: { patronage: {}, totalFunding: 0, prestige: 0 },
    resource: { cycles: {}, efficiency: 50, totalRecycled: 0 },
    quiz: { answered: 0, correct: 0 },
    achievements: {}
};

// ===================== DATA =====================
var ECONOMY_SECTORS = [
    { id: 'agriculture', name: '농업', icon: '🌾', color: '#4CAF50', output: 120, input: '자원' },
    { id: 'mining', name: '광업', icon: '⛏️', color: '#795548', output: 80, input: '노동' },
    { id: 'crafts', name: '수공업', icon: '🎨', color: '#FF9800', output: 150, input: '광업' },
    { id: 'trade', name: '상업', icon: '💰', color: '#FFC107', output: 200, input: '수공업' },
    { id: 'construction', name: '건설업', icon: '🏗️', color: '#607D8B', output: 100, input: '광업' },
    { id: 'military', name: '군사', icon: '⚔️', color: '#F44336', output: 60, input: '제조업' },
    { id: 'education', name: '교육', icon: '📚', color: '#9C27B0', output: 90, input: '상업' },
    { id: 'governance', name: '행정', icon: '🏛️', color: '#3F51B5', output: 70, input: '교육' }
];

var TRAFFIC_ZONES = [
    '궁괐가', '시장통', '주거지', '성문앞',
    '항구길', '산성로', '농지길', '사찰길'
];

var ARCHITECTURE_ERAS = [
    { id: 'gojoseon', name: '고조선', period: 'BC 2333~108', style: '토성/목책', icon: '🏚️', features: ['환호식 주거','고인돌','토성벽','달철이물형'], color: '#8D6E63' },
    { id: 'samguk', name: '삼국시대', period: '57BC~668', style: '성곽/불탑', icon: '🏯', features: ['석축산성','불국사','분황사비','첨성대'], color: '#5D4037' },
    { id: 'unified', name: '통일신라', period: '668~935', style: '불교건축', icon: '🕉️', features: ['석굴암','불국사','다보탑','안압지'], color: '#7B1FA2' },
    { id: 'goryeo', name: '고려', period: '918~1392', style: '청자/궁괐', icon: '🏠', features: ['만월대','경천사지','고려청자','팔만대장경'], color: '#1565C0' },
    { id: 'joseon', name: '조선', period: '1392~1897', style: '유교건축', icon: '🏯', features: ['경복궁','수원화성','창덕궁','종묘'], color: '#C62828' },
    { id: 'modern', name: '근대', period: '1897~1945', style: '근대건축', icon: '🏢', features: ['덕수궁','명동성당','서울역','조선은행'], color: '#37474F' }
];

var SERVICE_TYPES = [
    { id: 'security', name: '치안/방범', icon: '🛡️', color: '#F44336', base: 40 },
    { id: 'health', name: '의료/보건', icon: '🏥', color: '#E91E63', base: 35 },
    { id: 'education_svc', name: '교육/학문', icon: '🏫', color: '#9C27B0', base: 30 },
    { id: 'water_supply', name: '수도/상하수', icon: '🚰', color: '#2196F3', base: 45 },
    { id: 'fire', name: '소방/방재', icon: '🚒', color: '#FF5722', base: 25 },
    { id: 'welfare', name: '복지/구호', icon: '🫂', color: '#4CAF50', base: 20 }
];

var MIGRATION_REGIONS = [
    { id: 'capital', name: '수도권', pop: 50000, color: '#F44336' },
    { id: 'south', name: '남부지방', pop: 35000, color: '#FF9800' },
    { id: 'north', name: '북부지방', pop: 28000, color: '#2196F3' },
    { id: 'coastal', name: '해안지역', pop: 22000, color: '#00BCD4' },
    { id: 'mountain', name: '산간지역', pop: 15000, color: '#4CAF50' },
    { id: 'border', name: '변경지역', pop: 10000, color: '#9C27B0' }
];

var HAPPINESS_FACTORS = [
    { id: 'food', name: '식량', icon: '🍚', weight: 15 },
    { id: 'safety', name: '안전', icon: '🛡️', weight: 15 },
    { id: 'housing', name: '주거', icon: '🏠', weight: 12 },
    { id: 'culture', name: '문화', icon: '🎭', weight: 10 },
    { id: 'health_h', name: '건강', icon: '💚', weight: 13 },
    { id: 'edu_h', name: '교육', icon: '📚', weight: 10 },
    { id: 'tax', name: '세금', icon: '💸', weight: 12 },
    { id: 'nature', name: '환경', icon: '🌿', weight: 13 }
];

var ART_FORMS = [
    { id: 'calligraphy', name: '서예', icon: '✍️', era: '고려~조선', prestige: 8 },
    { id: 'painting', name: '회화', icon: '🖼️', era: '삼국~조선', prestige: 9 },
    { id: 'pottery', name: '도예', icon: '🏺', era: '신석기~조선', prestige: 10 },
    { id: 'music', name: '궁중음악', icon: '🎶', era: '삼국~조선', prestige: 7 },
    { id: 'dance', name: '궁중무용', icon: '💃', era: '통일신라~조선', prestige: 7 },
    { id: 'architecture_art', name: '건축예술', icon: '🏛️', era: '고조선~근대', prestige: 9 },
    { id: 'textile', name: '직물/자수', icon: '🧵', era: '삼국~조선', prestige: 6 },
    { id: 'metalwork', name: '금속공예', icon: '✨', era: '청동기~조선', prestige: 8 },
    { id: 'literature', name: '문학', icon: '📖', era: '통일신라~근대', prestige: 8 },
    { id: 'garden', name: '조경/정원', icon: '🌻', era: '고려~조선', prestige: 7 }
];

var RESOURCE_TYPES = [
    { id: 'wood', name: '목재', icon: '🪵', color: '#8D6E63', produces: '건축자재' },
    { id: 'stone', name: '석재', icon: '🪨', color: '#78909C', produces: '성곽/건물' },
    { id: 'iron', name: '철', icon: '⚙️', color: '#455A64', produces: '무기/농기구' },
    { id: 'grain', name: '곡물', icon: '🌾', color: '#CDDC39', produces: '식량/술' },
    { id: 'clay', name: '점토', icon: '🪫', color: '#D7CCC8', produces: '도자기/기와' },
    { id: 'silk', name: '비단', icon: '🧵', color: '#CE93D8', produces: '의복/교역품' },
    { id: 'gold', name: '금', icon: '🪙', color: '#FFD700', produces: '화폐/장식품' },
    { id: 'herbs', name: '약초', icon: '🌿', color: '#66BB6A', produces: '의약품/향료' }
];

var V20_QUIZ = [
    { q: '심시티 게임에서 도시 경제의 순환구조를 부르는 용어는?', a: ['순환경제','평행경제','선형경제','복합경제'], c: 0 },
    { q: '조선시대 한양도성의 주요 교통로는?', a: ['운종가','종로','돈화문통','태평로'], c: 1 },
    { q: '경복궁은 어떤 건축양식을 대표하는가?', a: ['불교건축','유교건축','근대건축','민간건축'], c: 1 },
    { q: '도시 공공서비스 커버리지율 100%란 무엇을 의미하는가?', a: ['모든 주민이 서비스 범위 내','모든 건물이 신축','범죄율 0%','세금 면제'], c: 0 },
    { q: '조선시대 인구이동의 주요 원인이 아닌 것은?', a: ['전쟁','흙년','인터넷 보급','과거 응시'], c: 2 },
    { q: '도시 행복지수에 가장 큰 영향을 미치는 요소는?', a: ['식량+안전','문화+예술','자연환경','관광산업'], c: 0 },
    { q: '고려청자는 어떤 예술 분야에 속하는가?', a: ['회화','도예','건축','문학'], c: 1 },
    { q: '순환경제에서 "재화"란 무엇을 의미하는가?', a: ['사용한 자원을 다시 활용','새 자원 발굴','외국 수입','세금 부과'], c: 0 },
    { q: 'TheoTown에서 교통 혼잡도를 낮추는 방법이 아닌 것은?', a: ['도로 확장','대중교통 건설','인구 강제이주','우회도로 설치'], c: 2 },
    { q: '조선시대 5관의 역할 중 공공서비스와 관련된 것은?', a: ['이조','호조','형조','병조'], c: 1 },
    { q: '심시티에서 주민 행복도가 떨어지면 발생하는 현상은?', a: ['인구 유출','건물 붕괴','자연재해','외국 침략'], c: 0 },
    { q: '한국 전통 건축에서 "배흘림"이란?', a: ['기둥의 불록한 형태','지붕의 곡선','담장의 문양','벽화의 틀'], c: 0 },
    { q: '조선시대 주요 자원순환 체계에서 "환곡"이란?', a: ['곡물을 세금으로 납부','곡물 수출','고리대금','곡물 보관'], c: 0 },
    { q: '도시경영 게임에서 "존닝(Zoning)"이란?', a: ['토지 용도 구분','건물 철거','세금 부과','인구 제한'], c: 0 },
    { q: '경복궁의 근정전은 어떤 용도의 건물인가?', a: ['왕의 업무 공간','왕비의 침전','불교 사원','구금 보관소'], c: 0 }
];

var V20_ACHIEVEMENTS = [
    { id: 'economy_starter', name: '경제 입문자', desc: '경제순환 첫 시뮬레이션 실행', icon: '💱' },
    { id: 'economy_master', name: '경제 대신', desc: 'GDP 5000 돌파', icon: '💰' },
    { id: 'traffic_analyst', name: '교통 분석가', desc: '교통혼잡도 10회 시뮬레이션', icon: '🚗' },
    { id: 'traffic_optimizer', name: '교통 최적화자', desc: '혼잡도 20% 이하 달성', icon: '🛣️' },
    { id: 'arch_historian', name: '건축 역사가', desc: '6시대 건축양식 전부 연구', icon: '🏛️' },
    { id: 'service_complete', name: '복지 국가', desc: '6종 공공서비스 80% 이상 달성', icon: '🏥' },
    { id: 'migration_expert', name: '인구 전문가', desc: '인구이동 15회 시뮬레이션', icon: '👨‍👩‍👧‍👦' },
    { id: 'happy_city', name: '행복 도시', desc: '행복지수 80 이상 달성', icon: '😊' },
    { id: 'art_collector', name: '예술 후원자', desc: '10종 예술 전부 후원', icon: '🎨' },
    { id: 'resource_recycler', name: '자원 순환가', desc: '자원효율 80% 이상', icon: '♻️' },
    { id: 'quiz_v20_master', name: 'v20 퀴즈 마스터', desc: 'v20 퀴즈 전부 정답', icon: '🏆' },
    { id: 'v20_complete', name: 'v20 완전 정복', desc: '8개 섹션 모두 체험', icon: '🌟' }
];

// ===================== ACHIEVEMENT CHECK =====================
function checkV20Achievement(id) {
    if(v20State.achievements[id]) return;
    v20State.achievements[id] = true;
    var ach = V20_ACHIEVEMENTS.find(function(a){ return a.id === id; });
    if(!ach) return;
    playV20SFX('achieve_v20');
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

// 1. Economy Cycle Simulator
function renderEconomyCycle(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 경제 순환 시뮬레이터', W/2, 24);

    var cx = W/2, cy = H/2 + 10, radius = 140;
    var sectors = ECONOMY_SECTORS;
    var angleStep = (Math.PI * 2) / sectors.length;

    sectors.forEach(function(s, i) {
        var angle = angleStep * i - Math.PI / 2;
        var x = cx + radius * Math.cos(angle);
        var y = cy + radius * Math.sin(angle);
        var val = v20State.economy.sectors[s.id] || Math.floor(Math.random() * 50 + 30);
        v20State.economy.sectors[s.id] = val;

        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fillStyle = s.color + '44'; ctx.fill();
        ctx.strokeStyle = s.color; ctx.lineWidth = 2.5; ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif';
        ctx.textAlign = 'center'; ctx.fillText(s.icon, x, y - 4);
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(s.name, x, y + 14);
        ctx.font = '9px sans-serif'; ctx.fillStyle = s.color;
        ctx.fillText(val + '%', x, y + 25);

        var nextAngle = angleStep * ((i + 1) % sectors.length) - Math.PI / 2;
        var nx = cx + radius * Math.cos(nextAngle);
        var ny = cy + radius * Math.sin(nextAngle);
        var mx = cx + (radius * 0.7) * Math.cos(angle + angleStep / 2);
        var my = cy + (radius * 0.7) * Math.sin(angle + angleStep / 2);

        ctx.beginPath();
        ctx.moveTo(x + 20 * Math.cos(angle + angleStep * 0.3), y + 20 * Math.sin(angle + angleStep * 0.3));
        ctx.quadraticCurveTo(mx, my, nx - 20 * Math.cos(nextAngle + angleStep * 0.3), ny - 20 * Math.sin(nextAngle + angleStep * 0.3));
        ctx.strokeStyle = s.color + '88'; ctx.lineWidth = 1.5; ctx.stroke();

        var arrowAngle = Math.atan2(ny - my, nx - mx);
        ctx.beginPath();
        var ax = nx - 24 * Math.cos(nextAngle + angleStep * 0.3);
        var ay = ny - 24 * Math.sin(nextAngle + angleStep * 0.3);
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 6 * Math.cos(arrowAngle - 0.4), ay - 6 * Math.sin(arrowAngle - 0.4));
        ctx.lineTo(ax - 6 * Math.cos(arrowAngle + 0.4), ay - 6 * Math.sin(arrowAngle + 0.4));
        ctx.closePath(); ctx.fillStyle = s.color; ctx.fill();
    });

    var gdp = v20State.economy.gdp;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GDP: ' + gdp.toLocaleString(), cx, cy - 10);
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#8f8';
    ctx.fillText('순환횟수: ' + v20State.economy.cycles, cx, cy + 8);

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 경제순환 시뮬레이션 | 8부문 순환흐름', cx, H - 12);
}

// 2. Traffic Congestion Heatmap
function renderTrafficHeatmap(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('교통 혼잡도 히트맵', W/2, 24);

    var gridSize = 8;
    var cellW = 56, cellH = 38;
    var startX = (W - gridSize * cellW) / 2;
    var startY = 50;
    var times = ['인시(5)', '조조(7)', '오전(9)', '점심(12)', '오후(3)', '퇴근(6)', '야간(9)', '심야(12)'];

    if(v20State.traffic.grid.length === 0) {
        for(var r = 0; r < gridSize; r++) {
            v20State.traffic.grid[r] = [];
            for(var c = 0; c < gridSize; c++) {
                var base = (r === 0 || r === 3) ? 40 : 20;
                if(c >= 2 && c <= 5) base += 20;
                v20State.traffic.grid[r][c] = Math.min(100, Math.max(5, base + Math.floor(Math.random() * 40)));
            }
        }
    }

    ctx.font = '9px sans-serif'; ctx.fillStyle = '#aaa'; ctx.textAlign = 'center';
    for(var t = 0; t < gridSize; t++) {
        ctx.fillText(times[t], startX + t * cellW + cellW / 2, startY - 4);
    }
    ctx.textAlign = 'right';
    for(var z = 0; z < gridSize; z++) {
        ctx.fillText(TRAFFIC_ZONES[z], startX - 6, startY + z * cellH + cellH / 2 + 3);
    }

    for(var row = 0; row < gridSize; row++) {
        for(var col = 0; col < gridSize; col++) {
            var val = v20State.traffic.grid[row][col];
            var r2 = Math.min(255, Math.floor(val * 2.55));
            var g2 = Math.min(255, Math.floor((100 - val) * 2.55));
            ctx.fillStyle = 'rgba(' + r2 + ',' + g2 + ',50,0.85)';
            ctx.fillRect(startX + col * cellW + 1, startY + row * cellH + 1, cellW - 2, cellH - 2);
            ctx.fillStyle = val > 60 ? '#fff' : '#ddd';
            ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(val + '%', startX + col * cellW + cellW / 2, startY + row * cellH + cellH / 2 + 4);
        }
    }

    var legendY = startY + gridSize * cellH + 20;
    ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
    var legendColors = [
        { label: '0~30% 원활', color: 'rgba(0,180,50,0.85)' },
        { label: '31~60% 보통', color: 'rgba(180,140,50,0.85)' },
        { label: '61~80% 혼잡', color: 'rgba(220,80,50,0.85)' },
        { label: '81~100% 마비', color: 'rgba(255,20,50,0.85)' }
    ];
    legendColors.forEach(function(lc, i) {
        var lx = startX + i * 140;
        ctx.fillStyle = lc.color; ctx.fillRect(lx, legendY, 14, 14);
        ctx.fillStyle = '#ccc'; ctx.fillText(lc.label, lx + 18, legendY + 11);
    });

    var total = 0, cnt = 0;
    for(var rr = 0; rr < gridSize; rr++) for(var cc = 0; cc < gridSize; cc++) { total += v20State.traffic.grid[rr][cc]; cnt++; }
    v20State.traffic.avgCongestion = Math.round(total / cnt);
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('평균 혼잡도: ' + v20State.traffic.avgCongestion + '% | 시뮬레이션: ' + v20State.traffic.simCount + '회', W / 2, H - 12);
}

// 3. Architecture Evolution
function renderArchitectureEvolution(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 640, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 건축양식 진화도', W/2, 24);

    var eras = ARCHITECTURE_ERAS;
    var colW = (W - 40) / eras.length;
    var baseY = 60;

    eras.forEach(function(era, i) {
        var x = 20 + i * colW;
        var studied = v20State.architecture.studied[era.id] || false;

        ctx.fillStyle = studied ? era.color + 'cc' : era.color + '44';
        ctx.strokeStyle = era.color; ctx.lineWidth = studied ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x + 4, baseY, colW - 8, 280, 8);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '20px sans-serif';
        ctx.textAlign = 'center'; ctx.fillText(era.icon, x + colW / 2, baseY + 28);

        ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = '#ffd700';
        ctx.fillText(era.name, x + colW / 2, baseY + 48);

        ctx.font = '9px sans-serif'; ctx.fillStyle = '#aaa';
        ctx.fillText(era.period, x + colW / 2, baseY + 62);

        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(era.style, x + colW / 2, baseY + 80);

        era.features.forEach(function(f, fi) {
            ctx.font = '9px sans-serif'; ctx.fillStyle = studied ? '#fff' : '#888';
            ctx.fillText(f, x + colW / 2, baseY + 100 + fi * 16);
        });

        if(studied) {
            ctx.fillStyle = '#4CAF50'; ctx.font = '10px sans-serif';
            ctx.fillText('✓ 연구완료', x + colW / 2, baseY + 185);
        } else {
            ctx.fillStyle = '#f88'; ctx.font = '10px sans-serif';
            ctx.fillText('클릭하여 연구', x + colW / 2, baseY + 185);
        }

        if(i < eras.length - 1) {
            ctx.beginPath();
            ctx.moveTo(x + colW - 4, baseY + 140);
            ctx.lineTo(x + colW + 4, baseY + 140);
            ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + colW + 1, baseY + 137);
            ctx.lineTo(x + colW + 5, baseY + 140);
            ctx.lineTo(x + colW + 1, baseY + 143);
            ctx.fillStyle = '#ffd700'; ctx.fill();
        }
    });

    var studiedCount = Object.keys(v20State.architecture.studied).filter(function(k){ return v20State.architecture.studied[k]; }).length;
    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('연구 진도: ' + studiedCount + '/' + eras.length + ' | 복원 횟수: ' + v20State.architecture.restorations, W / 2, H - 12);
}

// 4. Public Service Coverage Map
function renderServiceCoverage(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('공공서비스 커버리지 분석', W/2, 24);

    var services = SERVICE_TYPES;
    var barW = 80, barMaxH = 220, startX = 45, startY = 60;
    var gap = (W - startX * 2) / services.length;

    services.forEach(function(svc, i) {
        var x = startX + i * gap;
        var coverage = v20State.service.coverage[svc.id] || svc.base;
        v20State.service.coverage[svc.id] = coverage;
        var barH = (coverage / 100) * barMaxH;

        ctx.fillStyle = svc.color + '33';
        ctx.fillRect(x, startY, barW, barMaxH);

        var grad = ctx.createLinearGradient(x, startY + barMaxH - barH, x, startY + barMaxH);
        grad.addColorStop(0, svc.color);
        grad.addColorStop(1, svc.color + '88');
        ctx.fillStyle = grad;
        ctx.fillRect(x, startY + barMaxH - barH, barW, barH);

        ctx.strokeStyle = svc.color; ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, barW, barMaxH);

        [25, 50, 75].forEach(function(pct) {
            var ly = startY + barMaxH - (pct / 100) * barMaxH;
            ctx.beginPath(); ctx.setLineDash([3, 3]);
            ctx.moveTo(x, ly); ctx.lineTo(x + barW, ly);
            ctx.strokeStyle = '#555'; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.setLineDash([]);
        });

        ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(coverage + '%', x + barW / 2, startY + barMaxH - barH - 8);

        ctx.font = '18px sans-serif';
        ctx.fillText(svc.icon, x + barW / 2, startY + barMaxH + 22);
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(svc.name, x + barW / 2, startY + barMaxH + 38);

        var grade = coverage >= 80 ? 'S' : coverage >= 60 ? 'A' : coverage >= 40 ? 'B' : coverage >= 20 ? 'C' : 'D';
        var gc = grade === 'S' ? '#ffd700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
        ctx.font = 'bold 11px sans-serif'; ctx.fillStyle = gc;
        ctx.fillText(grade + '등급', x + barW / 2, startY + barMaxH + 52);
    });

    var totalCov = 0;
    services.forEach(function(s){ totalCov += (v20State.service.coverage[s.id] || s.base); });
    var avgCov = Math.round(totalCov / services.length);
    v20State.service.totalCoverage = avgCov;
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('종합 커버리지: ' + avgCov + '% | 업그레이드: ' + v20State.service.upgrades + '회', W / 2, H - 12);
}

// 5. Population Migration Simulator
function renderMigrationFlow(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('인구 이동 시뮬레이터', W/2, 24);

    var regions = MIGRATION_REGIONS;
    var leftX = 80, rightX = W - 80;
    var nodeH = 50, startY = 55;
    var totalGap = (H - 60 - startY - regions.length * nodeH) / (regions.length - 1);

    regions.forEach(function(reg, i) {
        var y = startY + i * (nodeH + totalGap);
        var pop = reg.pop + Math.floor(Math.random() * 5000 - 2500);

        ctx.fillStyle = reg.color + '44';
        ctx.strokeStyle = reg.color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(leftX - 60, y, 120, nodeH - 4, 6); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(reg.name, leftX, y + 18);
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(pop.toLocaleString() + '명', leftX, y + 34);

        ctx.fillStyle = reg.color + '44';
        ctx.strokeStyle = reg.color;
        ctx.beginPath(); ctx.roundRect(rightX - 60, y, 120, nodeH - 4, 6); ctx.fill(); ctx.stroke();

        var inflow = Math.floor(Math.random() * 3000 + 500);
        var outflow = Math.floor(Math.random() * 2500 + 300);
        var net = inflow - outflow;
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(reg.name, rightX, y + 18);
        ctx.font = '10px sans-serif'; ctx.fillStyle = net > 0 ? '#8f8' : '#f88';
        ctx.fillText((net > 0 ? '+' : '') + net.toLocaleString(), rightX, y + 34);

        if(i < regions.length - 1) {
            var nextY = startY + (i + 1) * (nodeH + totalGap);
            var flowWidth = Math.max(1, Math.min(6, Math.abs(net) / 500));
            ctx.beginPath();
            ctx.moveTo(leftX + 60, y + nodeH / 2);
            ctx.bezierCurveTo(W / 2, y + nodeH / 2, W / 2, nextY + nodeH / 2, rightX - 60, nextY + nodeH / 2);
            ctx.strokeStyle = reg.color + '66'; ctx.lineWidth = flowWidth; ctx.stroke();
        }
    });

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('총 이동인구: ' + v20State.migration.totalMigrants.toLocaleString() + ' | 순증가: ' + (v20State.migration.netGrowth > 0 ? '+' : '') + v20State.migration.netGrowth.toLocaleString(), W / 2, H - 12);
}

// 6. Happiness Index Dashboard
function renderHappinessDashboard(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 600, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('도시 행복지수 대시보드', W/2, 24);

    var factors = HAPPINESS_FACTORS;
    var cx = W / 2, cy = 160, gaugeR = 100;
    var idx = v20State.happiness.index;
    var startAngle = Math.PI;
    var endAngle = 0;
    var valAngle = startAngle + (idx / 100) * (endAngle - startAngle);

    ctx.beginPath(); ctx.arc(cx, cy, gaugeR, startAngle, endAngle);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 20; ctx.stroke();

    var gaugeGrad = ctx.createLinearGradient(cx - gaugeR, cy, cx + gaugeR, cy);
    gaugeGrad.addColorStop(0, '#F44336');
    gaugeGrad.addColorStop(0.3, '#FF9800');
    gaugeGrad.addColorStop(0.5, '#FFEB3B');
    gaugeGrad.addColorStop(0.7, '#8BC34A');
    gaugeGrad.addColorStop(1, '#4CAF50');
    ctx.beginPath(); ctx.arc(cx, cy, gaugeR, startAngle, valAngle);
    ctx.strokeStyle = gaugeGrad; ctx.lineWidth = 20; ctx.stroke();

    var needleX = cx + (gaugeR - 10) * Math.cos(valAngle);
    var needleY = cy + (gaugeR - 10) * Math.sin(valAngle);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700'; ctx.fill();

    var grade = idx >= 90 ? 'S' : idx >= 75 ? 'A' : idx >= 60 ? 'B' : idx >= 40 ? 'C' : 'D';
    var gc = grade === 'S' ? '#ffd700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
    ctx.fillStyle = gc; ctx.font = 'bold 28px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(idx + '점', cx, cy + 14);
    ctx.font = 'bold 16px sans-serif'; ctx.fillText(grade + ' 등급', cx, cy + 38);

    var barStartY = 210;
    var barW = 60, barH = 12;
    var cols = 4;
    factors.forEach(function(f, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var x = 40 + col * 145;
        var y = barStartY + row * 65;
        var val = v20State.happiness.factors[f.id] || (40 + Math.floor(Math.random() * 40));
        v20State.happiness.factors[f.id] = val;

        ctx.fillStyle = '#fff'; ctx.font = '16px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(f.icon, x, y + 14);
        ctx.font = '11px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(f.name, x + 22, y + 13);

        ctx.fillStyle = '#333'; ctx.fillRect(x, y + 22, barW + 40, barH);
        var pct = val / 100;
        var barColor = val >= 70 ? '#4CAF50' : val >= 40 ? '#FF9800' : '#F44336';
        ctx.fillStyle = barColor; ctx.fillRect(x, y + 22, (barW + 40) * pct, barH);
        ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif';
        ctx.fillText(val + '%', x + barW + 45, y + 31);
    });

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('조사횟수: ' + v20State.happiness.surveys + ' | 클릭하여 요소별 개선', W / 2, H - 12);
}

// 7. Royal Art Patronage Hall
function renderArtPatronage(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 400;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('왕실 예술 후원관', W/2, 24);

    var arts = ART_FORMS;
    var colW = (W - 40) / 5;
    var rowH = 155;

    arts.forEach(function(art, i) {
        var col = i % 5;
        var row = Math.floor(i / 5);
        var x = 20 + col * colW;
        var y = 45 + row * rowH;
        var funded = v20State.art.patronage[art.id] || 0;

        ctx.fillStyle = funded > 0 ? '#2a2a4e' : '#1e1e34';
        ctx.strokeStyle = funded > 50 ? '#ffd700' : '#555';
        ctx.lineWidth = funded > 50 ? 2 : 1;
        ctx.beginPath(); ctx.roundRect(x + 3, y, colW - 6, rowH - 10, 8); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(art.icon, x + colW / 2, y + 30);

        ctx.font = 'bold 11px sans-serif'; ctx.fillStyle = '#ffd700';
        ctx.fillText(art.name, x + colW / 2, y + 50);

        ctx.font = '8px sans-serif'; ctx.fillStyle = '#aaa';
        ctx.fillText(art.era, x + colW / 2, y + 63);

        ctx.fillStyle = '#333'; ctx.fillRect(x + 10, y + 72, colW - 26, 8);
        var pct = funded / 100;
        var barColor = funded >= 80 ? '#ffd700' : funded >= 50 ? '#4CAF50' : funded >= 20 ? '#2196F3' : '#666';
        ctx.fillStyle = barColor; ctx.fillRect(x + 10, y + 72, (colW - 26) * pct, 8);

        ctx.font = '9px sans-serif'; ctx.fillStyle = '#ccc'; ctx.textAlign = 'center';
        ctx.fillText('후원: ' + funded + '%', x + colW / 2, y + 96);

        var stars = Math.floor(art.prestige * funded / 100 / 2);
        ctx.font = '10px sans-serif'; ctx.fillStyle = '#ffd700';
        ctx.fillText('★'.repeat(Math.min(5, stars)) + '☆'.repeat(Math.max(0, 5 - stars)), x + colW / 2, y + 112);

        ctx.font = '8px sans-serif'; ctx.fillStyle = '#8f8';
        ctx.fillText('명성+' + Math.floor(art.prestige * funded / 100), x + colW / 2, y + 128);
    });

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('총 후원금: ' + v20State.art.totalFunding + ' | 총 명성: ' + v20State.art.prestige + ' | 클릭하여 후원', W / 2, H - 12);
}

// 8. Resource Circulation Ecosystem
function renderResourceCycle(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 620, H = 380;
    canvas.width = W; canvas.height = H;
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('자원 순환 생태계', W/2, 24);

    var resources = RESOURCE_TYPES;
    var cx = W / 2, cy = H / 2 + 5, radius = 130;
    var angleStep = (Math.PI * 2) / resources.length;

    resources.forEach(function(res, i) {
        var angle = angleStep * i - Math.PI / 2;
        var x = cx + radius * Math.cos(angle);
        var y = cy + radius * Math.sin(angle);
        var efficiency = v20State.resource.cycles[res.id] || Math.floor(Math.random() * 60 + 20);
        v20State.resource.cycles[res.id] = efficiency;

        ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2);
        ctx.fillStyle = res.color + '44'; ctx.fill();
        ctx.strokeStyle = res.color; ctx.lineWidth = 2; ctx.stroke();

        ctx.beginPath(); ctx.arc(x, y, 26, -Math.PI / 2, -Math.PI / 2 + (efficiency / 100) * Math.PI * 2);
        ctx.strokeStyle = res.color; ctx.lineWidth = 3; ctx.stroke();

        ctx.fillStyle = '#fff'; ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(res.icon, x, y - 2);
        ctx.font = '9px sans-serif'; ctx.fillStyle = '#ccc';
        ctx.fillText(res.name, x, y + 15);
        ctx.font = '8px sans-serif'; ctx.fillStyle = efficiency >= 70 ? '#8f8' : efficiency >= 40 ? '#ff8' : '#f88';
        ctx.fillText(efficiency + '%', x, y + 26);

        var nextAngle = angleStep * ((i + 1) % resources.length) - Math.PI / 2;
        var nx = cx + radius * Math.cos(nextAngle);
        var ny = cy + radius * Math.sin(nextAngle);
        var midAngle = angle + angleStep / 2;
        var mx = cx + (radius * 0.65) * Math.cos(midAngle);
        var my = cy + (radius * 0.65) * Math.sin(midAngle);

        ctx.beginPath();
        ctx.moveTo(x + 22 * Math.cos(angle + 0.5), y + 22 * Math.sin(angle + 0.5));
        ctx.quadraticCurveTo(mx, my, nx - 22 * Math.cos(nextAngle - 0.5), ny - 22 * Math.sin(nextAngle - 0.5));
        ctx.strokeStyle = res.color + '55'; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.font = '7px sans-serif'; ctx.fillStyle = '#888'; ctx.textAlign = 'center';
        ctx.fillText('→' + res.produces, mx, my + 4);
    });

    var totalEff = 0;
    resources.forEach(function(r){ totalEff += (v20State.resource.cycles[r.id] || 40); });
    var avgEff = Math.round(totalEff / resources.length);
    v20State.resource.efficiency = avgEff;

    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('♻️ ' + avgEff + '%', cx, cy - 8);
    ctx.font = '10px sans-serif'; ctx.fillStyle = '#aaa';
    ctx.fillText('순환효율', cx, cy + 8);

    ctx.fillStyle = '#aaa'; ctx.font = '10px sans-serif';
    ctx.fillText('클릭: 자원효율 개선 | 총 재활용: ' + v20State.resource.totalRecycled, W / 2, H - 12);
}

// ===================== NAVIGATION & UI =====================
var v20Sections = [
    { id: 'v20_economy', name: '경제순환', icon: '💱', render: renderEconomyCycle },
    { id: 'v20_traffic', name: '교통혼잡도', icon: '🚗', render: renderTrafficHeatmap },
    { id: 'v20_arch', name: '건축진화', icon: '🏛️', render: renderArchitectureEvolution },
    { id: 'v20_service', name: '공공서비스', icon: '🏥', render: renderServiceCoverage },
    { id: 'v20_migration', name: '인구이동', icon: '👨‍👩‍👧', render: renderMigrationFlow },
    { id: 'v20_happiness', name: '행복지수', icon: '😊', render: renderHappinessDashboard },
    { id: 'v20_art', name: '예술후원', icon: '🎨', render: renderArtPatronage },
    { id: 'v20_resource', name: '자원순환', icon: '♻️', render: renderResourceCycle }
];

var v20CurrentSection = -1;
var v20Panel = null;
var v20Canvas = null;

function createV20Panel() {
    if(v20Panel) return;
    v20Panel = document.createElement('div');
    v20Panel.id = 'v20-panel';
    v20Panel.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:180;justify-content:center;align-items:center;padding:10px;';

    var box = document.createElement('div');
    box.style.cssText = 'background:linear-gradient(145deg,#2a2a3e,#1a1a2e);border:2px solid #c4923a;border-radius:16px;padding:14px;max-width:680px;width:100%;max-height:92vh;overflow-y:auto;';

    var header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
    header.innerHTML = '<span style="color:#ffd700;font-size:16px;font-weight:bold;">v20 도시경영 분석시스템</span>';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'background:#c4923a;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;';
    closeBtn.onclick = function(){ v20Panel.style.display = 'none'; };
    header.appendChild(closeBtn);
    box.appendChild(header);

    var nav = document.createElement('div');
    nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;';
    v20Sections.forEach(function(sec, i) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:#2a2a4e;border:1px solid #555;color:#ccc;padding:6px 10px;border-radius:8px;font-size:11px;cursor:pointer;flex:1;min-width:70px;text-align:center;';
        btn.innerHTML = sec.icon + '<br>' + sec.name;
        btn.onclick = function(){
            v20CurrentSection = i;
            playV20SFX('economy_flow');
            sec.render(v20Canvas);
            nav.querySelectorAll('button').forEach(function(b, bi){
                b.style.borderColor = bi === i ? '#ffd700' : '#555';
                b.style.color = bi === i ? '#ffd700' : '#ccc';
            });
        };
        nav.appendChild(btn);
    });
    box.appendChild(nav);

    v20Canvas = document.createElement('canvas');
    v20Canvas.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto;border-radius:8px;cursor:pointer;';
    v20Canvas.onclick = function(e) { handleV20CanvasClick(e); };
    box.appendChild(v20Canvas);

    var quizBtn = document.createElement('button');
    quizBtn.textContent = '📝 v20 퀴즈 (' + V20_QUIZ.length + '문제)';
    quizBtn.style.cssText = 'display:block;margin:10px auto 0;background:#9C27B0;border:none;color:#fff;padding:8px 20px;border-radius:12px;font-size:12px;cursor:pointer;font-weight:bold;';
    quizBtn.onclick = function(){ startV20Quiz(); };
    box.appendChild(quizBtn);

    v20Panel.appendChild(box);
    document.body.appendChild(v20Panel);
}

function openV20Panel() {
    createV20Panel();
    v20Panel.style.display = 'flex';
    if(v20CurrentSection < 0) v20CurrentSection = 0;
    v20Sections[v20CurrentSection].render(v20Canvas);
    var navBtns = v20Panel.querySelectorAll('div > button');
    navBtns.forEach(function(b, i){ if(i < v20Sections.length) { b.style.borderColor = i === v20CurrentSection ? '#ffd700' : '#555'; b.style.color = i === v20CurrentSection ? '#ffd700' : '#ccc'; }});
}

// ===================== CANVAS INTERACTION =====================
function handleV20CanvasClick(e) {
    var rect = v20Canvas.getBoundingClientRect();
    var scaleX = v20Canvas.width / rect.width;
    var x = (e.clientX - rect.left) * scaleX;
    var y = (e.clientY - rect.top) * (v20Canvas.height / rect.height);

    switch(v20CurrentSection) {
        case 0: // Economy
            v20State.economy.cycles++;
            v20State.economy.gdp += Math.floor(Math.random() * 200 + 50);
            ECONOMY_SECTORS.forEach(function(s){
                v20State.economy.sectors[s.id] = Math.min(100, (v20State.economy.sectors[s.id] || 50) + Math.floor(Math.random() * 10 - 3));
            });
            v20State.economy.totalFlow += 100;
            playV20SFX('economy_cycle');
            if(v20State.economy.cycles === 1) checkV20Achievement('economy_starter');
            if(v20State.economy.gdp >= 5000) checkV20Achievement('economy_master');
            renderEconomyCycle(v20Canvas);
            break;
        case 1: // Traffic
            v20State.traffic.simCount++;
            for(var r = 0; r < 8; r++) for(var c = 0; c < 8; c++) {
                v20State.traffic.grid[r][c] = Math.max(5, Math.min(100, v20State.traffic.grid[r][c] + Math.floor(Math.random() * 20 - 12)));
            }
            v20State.traffic.improvements++;
            playV20SFX(v20State.traffic.avgCongestion > 50 ? 'traffic_jam' : 'traffic_clear');
            if(v20State.traffic.simCount >= 10) checkV20Achievement('traffic_analyst');
            if(v20State.traffic.avgCongestion <= 20) checkV20Achievement('traffic_optimizer');
            renderTrafficHeatmap(v20Canvas);
            break;
        case 2: // Architecture
            var eraIdx = Math.floor(x / (640 / ARCHITECTURE_ERAS.length));
            if(eraIdx >= 0 && eraIdx < ARCHITECTURE_ERAS.length) {
                var era = ARCHITECTURE_ERAS[eraIdx];
                v20State.architecture.studied[era.id] = true;
                v20State.architecture.restorations++;
                playV20SFX('arch_evolve');
                var allStudied = ARCHITECTURE_ERAS.every(function(e){ return v20State.architecture.studied[e.id]; });
                if(allStudied) checkV20Achievement('arch_historian');
            }
            renderArchitectureEvolution(v20Canvas);
            break;
        case 3: // Service
            var svcIdx = Math.floor((x - 45) / ((620 - 90) / SERVICE_TYPES.length));
            if(svcIdx >= 0 && svcIdx < SERVICE_TYPES.length) {
                var svc = SERVICE_TYPES[svcIdx];
                v20State.service.coverage[svc.id] = Math.min(100, (v20State.service.coverage[svc.id] || svc.base) + Math.floor(Math.random() * 10 + 3));
                v20State.service.upgrades++;
                playV20SFX('service_expand');
                var all80 = SERVICE_TYPES.every(function(s){ return (v20State.service.coverage[s.id] || 0) >= 80; });
                if(all80) checkV20Achievement('service_complete');
            }
            renderServiceCoverage(v20Canvas);
            break;
        case 4: // Migration
            v20State.migration.totalMigrants += Math.floor(Math.random() * 5000 + 1000);
            v20State.migration.netGrowth += Math.floor(Math.random() * 2000 - 500);
            playV20SFX('migration_flow');
            var migSim = (v20State.migration.totalMigrants / 5000);
            if(migSim >= 15) checkV20Achievement('migration_expert');
            renderMigrationFlow(v20Canvas);
            break;
        case 5: // Happiness
            v20State.happiness.surveys++;
            HAPPINESS_FACTORS.forEach(function(f) {
                v20State.happiness.factors[f.id] = Math.min(100, Math.max(10, (v20State.happiness.factors[f.id] || 50) + Math.floor(Math.random() * 12 - 4)));
            });
            var totalH = 0;
            HAPPINESS_FACTORS.forEach(function(f){ totalH += (v20State.happiness.factors[f.id] || 50) * f.weight; });
            v20State.happiness.index = Math.round(totalH / 100);
            playV20SFX(v20State.happiness.index >= 50 ? 'happiness_up' : 'happiness_down');
            if(v20State.happiness.index >= 80) checkV20Achievement('happy_city');
            renderHappinessDashboard(v20Canvas);
            break;
        case 6: // Art
            var artCol = Math.floor((x - 20) / ((620 - 40) / 5));
            var artRow = Math.floor((y - 45) / 155);
            var artIdx = artRow * 5 + artCol;
            if(artIdx >= 0 && artIdx < ART_FORMS.length) {
                var art = ART_FORMS[artIdx];
                v20State.art.patronage[art.id] = Math.min(100, (v20State.art.patronage[art.id] || 0) + Math.floor(Math.random() * 15 + 5));
                v20State.art.totalFunding += 10;
                v20State.art.prestige += Math.floor(art.prestige * 0.5);
                playV20SFX('art_patron');
                var allFunded = ART_FORMS.every(function(a){ return (v20State.art.patronage[a.id] || 0) > 0; });
                if(allFunded) checkV20Achievement('art_collector');
            }
            renderArtPatronage(v20Canvas);
            break;
        case 7: // Resource
            RESOURCE_TYPES.forEach(function(res) {
                v20State.resource.cycles[res.id] = Math.min(100, (v20State.resource.cycles[res.id] || 40) + Math.floor(Math.random() * 8 + 1));
            });
            v20State.resource.totalRecycled += Math.floor(Math.random() * 50 + 20);
            playV20SFX('resource_cycle');
            var totalR = 0;
            RESOURCE_TYPES.forEach(function(r){ totalR += (v20State.resource.cycles[r.id] || 40); });
            v20State.resource.efficiency = Math.round(totalR / RESOURCE_TYPES.length);
            if(v20State.resource.efficiency >= 80) checkV20Achievement('resource_recycler');
            renderResourceCycle(v20Canvas);
            break;
    }

    var visited = new Set();
    v20Sections.forEach(function(sec, i) {
        if(i === 0 && v20State.economy.cycles > 0) visited.add(i);
        if(i === 1 && v20State.traffic.simCount > 0) visited.add(i);
        if(i === 2 && v20State.architecture.restorations > 0) visited.add(i);
        if(i === 3 && v20State.service.upgrades > 0) visited.add(i);
        if(i === 4 && v20State.migration.totalMigrants > 0) visited.add(i);
        if(i === 5 && v20State.happiness.surveys > 0) visited.add(i);
        if(i === 6 && v20State.art.totalFunding > 0) visited.add(i);
        if(i === 7 && v20State.resource.totalRecycled > 0) visited.add(i);
    });
    if(visited.size >= 8) checkV20Achievement('v20_complete');
}

// ===================== QUIZ =====================
function startV20Quiz() {
    playV20SFX('quiz_v20');
    var qIdx = 0; var score = 0;
    function showQuestion() {
        if(qIdx >= V20_QUIZ.length) {
            v20State.quiz.answered += V20_QUIZ.length;
            v20State.quiz.correct += score;
            if(score === V20_QUIZ.length) checkV20Achievement('quiz_v20_master');
            alert('퀴즈 완료! ' + score + '/' + V20_QUIZ.length + ' 정답\n' + (score >= 12 ? 'S등급! 탁월합니다!' : score >= 9 ? 'A등급! 훌륭합니다!' : score >= 6 ? 'B등급. 더 공부해보세요!' : 'C등급. 복습이 필요합니다.'));
            return;
        }
        var q = V20_QUIZ[qIdx];
        var ans = prompt('[문제 ' + (qIdx + 1) + '/' + V20_QUIZ.length + '] ' + q.q + '\n\n1. ' + q.a[0] + '\n2. ' + q.a[1] + '\n3. ' + q.a[2] + '\n4. ' + q.a[3] + '\n\n번호를 입력하세요 (1~4):');
        if(ans === null) return;
        var chosen = parseInt(ans) - 1;
        if(chosen === q.c) { score++; playV20SFX('quiz_v20'); }
        else { playV20SFX('quiz_wrong_v20'); }
        qIdx++;
        showQuestion();
    }
    showQuestion();
}

// ===================== REGISTER NAVIGATION =====================
function addV20Button() {
    var existing = document.getElementById('v20-nav-btn');
    if(existing) return;

    var targets = [
        document.querySelector('#save-ctrl'),
        document.querySelector('#controls'),
        document.querySelector('#ach-panel-btn')
    ];
    var anchor = null;
    for(var i = 0; i < targets.length; i++) {
        if(targets[i]) { anchor = targets[i]; break; }
    }

    var btn = document.createElement('button');
    btn.id = 'v20-nav-btn';
    btn.textContent = '💱';
    btn.title = 'v20 도시경영 분석';
    btn.style.cssText = 'position:fixed;top:50px;right:228px;z-index:10;background:rgba(0,0,0,0.7);border:1px solid #c4923a;color:#ffd700;width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;';
    btn.onclick = function(){ playV20SFX('economy_flow'); openV20Panel(); };
    document.body.appendChild(btn);
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', function(e) {
    if(!e.shiftKey) return;
    var keyMap = {
        'Digit1': 0, 'Digit2': 1, 'Digit3': 2, 'Digit4': 3,
        'Digit5': 4, 'Digit6': 5, 'Digit7': 6, 'Digit8': 7
    };
    if(e.code === 'KeyQ') {
        e.preventDefault(); openV20Panel(); return;
    }
    if(keyMap.hasOwnProperty(e.code) && v20Panel && v20Panel.style.display === 'flex') {
        e.preventDefault();
        var idx = keyMap[e.code];
        if(idx < v20Sections.length) {
            v20CurrentSection = idx;
            v20Sections[idx].render(v20Canvas);
            playV20SFX('economy_flow');
        }
    }
});

// ===================== INIT =====================
function initV20() {
    addV20Button();
    if(typeof window.v20Loaded === 'undefined') {
        window.v20Loaded = true;
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV20);
} else {
    initV20();
}

})();
