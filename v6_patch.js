// =====================================================================
// city-builder v6_patch.js — PRIME Holdings NEXTERA+PRISM Auto Agent
// Self-contained patch module (v6.0)
// =====================================================================
(function(){
'use strict';

// ===================== 1. TECHNOLOGY TREE =====================
const TECHNOLOGIES = [
  { id:'agriculture', icon:'🌱', name:'농업 혁명', era:0, cost:{gold:80,culture:10},
    desc:'관개 기술로 식량 생산이 20% 증가합니다.',
    effect:'식량 생산 +20%', fn:()=>{ window._v6TechBonuses.foodMult = 1.2; } },
  { id:'bronze_work', icon:'🔩', name:'청동기 기술', era:0, cost:{gold:100,culture:15},
    desc:'청동 도구로 건설 비용이 10% 감소합니다.',
    effect:'건설 비용 -10%', fn:()=>{ window._v6TechBonuses.buildDiscount = 0.9; } },
  { id:'ironwork', icon:'⚒️', name:'철기 문화', era:1, cost:{gold:150,culture:25},
    desc:'철제 무기로 재해 피해가 30% 감소합니다.',
    effect:'재해 피해 -30%', fn:()=>{ window._v6TechBonuses.disasterReduction = 0.7; } },
  { id:'navigation', icon:'⛵', name:'항해술', era:1, cost:{gold:180,culture:30},
    desc:'교역 수입이 50% 증가합니다.',
    effect:'교역 수입 +50%', fn:()=>{ window._v6TechBonuses.tradeMult = 1.5; } },
  { id:'printing_tech', icon:'📖', name:'인쇄술', era:2, cost:{gold:200,culture:40},
    desc:'문화 생산이 30% 증가합니다.',
    effect:'문화 생산 +30%', fn:()=>{ window._v6TechBonuses.cultureMult = 1.3; } },
  { id:'gunpowder', icon:'💣', name:'화약 기술', era:2, cost:{gold:250,culture:50},
    desc:'군사력 강화로 재해 피해 추가 20% 감소.',
    effect:'재해 피해 추가 -20%', fn:()=>{ window._v6TechBonuses.disasterReduction *= 0.8; } },
  { id:'hangul_tech', icon:'🔤', name:'훈민정음', era:3, cost:{gold:300,culture:60},
    desc:'교육 효과로 인구 성장 30% 가속.',
    effect:'인구 성장 +30%', fn:()=>{ window._v6TechBonuses.popMult = 1.3; } },
  { id:'science', icon:'🔬', name:'과학 기술', era:3, cost:{gold:350,culture:80},
    desc:'건물 업그레이드 비용이 30% 감소.',
    effect:'업그레이드 비용 -30%', fn:()=>{ window._v6TechBonuses.upgradeDiscount = 0.7; } },
  { id:'electricity', icon:'💡', name:'전기 도입', era:4, cost:{gold:400,culture:100},
    desc:'모든 생산이 15% 증가합니다.',
    effect:'전체 생산 +15%', fn:()=>{ window._v6TechBonuses.globalMult = 1.15; } },
  { id:'railroad', icon:'🛤️', name:'철도 건설', era:4, cost:{gold:450,culture:120},
    desc:'금 수입이 25% 증가합니다.',
    effect:'금 수입 +25%', fn:()=>{ window._v6TechBonuses.goldMult = 1.25; } },
];

window._v6TechBonuses = {
  foodMult:1, buildDiscount:1, disasterReduction:1, tradeMult:1,
  cultureMult:1, popMult:1, upgradeDiscount:1, globalMult:1, goldMult:1
};
window._v6ResearchedTechs = new Set();

function researchTech(techId) {
  if(window._v6ResearchedTechs.has(techId)) return;
  const tech = TECHNOLOGIES.find(t=>t.id===techId);
  if(!tech) return;
  if(tech.era > window.currentEra) { window.toast('이 시대에는 연구할 수 없어요!'); return; }
  if(window.resources.gold < tech.cost.gold) { window.toast('금이 부족해요!'); return; }
  if(window.resources.culture < tech.cost.culture) { window.toast('문화가 부족해요!'); return; }
  window.resources.gold -= tech.cost.gold;
  window.resources.culture -= tech.cost.culture;
  window._v6ResearchedTechs.add(techId);
  tech.fn();
  window.updateHUD();
  window.playAchSound();
  window.toast('🔬 ' + tech.name + ' 연구 완료!');
  window.addChronicle(tech.icon, tech.name + ' 기술을 연구했습니다.');
  window.checkAchievements();
}

// ===================== 2. HISTORICAL FIGURES =====================
const FIGURES = [
  { id:'dangun', name:'단군왕검', icon:'👑', era:0, buff:'문화 +5/틱',
    desc:'고조선의 건국자. 하늘의 뜻을 받아 나라를 세웠어요.',
    effect:()=>{ window.rates.culture += 5; } },
  { id:'gwanggaeto', name:'광개토대왕', icon:'⚔️', era:1, buff:'인구 +3/틱, 행복 +2',
    desc:'고구려 19대왕. 만주와 한반도 북부를 정복한 위대한 정복왕.',
    effect:()=>{ window.rates.pop += 3; window.rates.happy += 2; } },
  { id:'jangbogo', name:'장보고', icon:'🚢', era:1, buff:'금 +8/틱',
    desc:'해상왕 장보고. 청해진을 세워 동아시아 해상 무역을 장악했어요.',
    effect:()=>{ window.rates.gold += 8; } },
  { id:'wanggon', name:'왕건', icon:'🏛️', era:2, buff:'행복 +4, 문화 +3',
    desc:'고려 태조. 삼국을 통합하고 고려를 세운 현명한 군주.',
    effect:()=>{ window.rates.happy += 4; window.rates.culture += 3; } },
  { id:'choe_museon', name:'최무선', icon:'💥', era:2, buff:'재해 피해 감소',
    desc:'고려의 과학자. 화약을 개발하여 왜구를 물리쳤어요.',
    effect:()=>{ /* handled in disaster check */ } },
  { id:'sejong', name:'세종대왕', icon:'📚', era:3, buff:'문화 +8/틱, 금 +3',
    desc:'조선 4대왕. 한글 창제, 과학 발전에 크게 기여한 성군.',
    effect:()=>{ window.rates.culture += 8; window.rates.gold += 3; } },
  { id:'yisunshin', name:'이순신', icon:'🐢', era:3, buff:'재해 피해 대폭 감소',
    desc:'조선의 명장. 거북선으로 임진왜란을 승리로 이끌었어요.',
    effect:()=>{ /* handled in disaster check */ } },
  { id:'jeong_yakyong', name:'정약용', icon:'🏗️', era:3, buff:'건설 비용 -15%',
    desc:'조선 후기 실학자. 거중기를 발명하고 수원화성을 설계했어요.',
    effect:()=>{ window._v6TechBonuses.buildDiscount *= 0.85; } },
  { id:'seo_jaepil', name:'서재필', icon:'📰', era:4, buff:'문화 +6, 행복 +3',
    desc:'독립신문 창간자. 독립협회를 설립하고 근대 계몽을 이끌었어요.',
    effect:()=>{ window.rates.culture += 6; window.rates.happy += 3; } },
  { id:'ahn_changho', name:'안창호', icon:'🎓', era:4, buff:'인구 +4, 문화 +4',
    desc:'독립운동가이자 교육자. 흥사단을 세워 민족 역량을 길렀어요.',
    effect:()=>{ window.rates.pop += 4; window.rates.culture += 4; } },
];

window._v6ActiveFigure = null;

function selectFigure(figId) {
  const fig = FIGURES.find(f=>f.id===figId);
  if(!fig) return;
  if(fig.era > window.currentEra) { window.toast('이 시대의 인물은 아직 등장하지 않았어요!'); return; }
  window._v6ActiveFigure = fig;
  window.toast(fig.icon + ' ' + fig.name + ' 임명!');
  window.addChronicle(fig.icon, fig.name + '을(를) 고문으로 임명했습니다.');
  window.playAchSound();
  showFigures();
}

// ===================== 3. ADJACENCY BONUS SYSTEM =====================
const ADJACENCY_RULES = {
  'market3': { bonus: 'gold', amount: 3, neighbors: ['giwa','hanok','brick','goryeo_house'], desc:'주거지 인접시 금+3' },
  'sijeon': { bonus: 'gold', amount: 4, neighbors: ['hanok','palace','hwaseong'], desc:'조선 건물 인접시 금+4' },
  'seowon': { bonus: 'culture', amount: 5, neighbors: ['hangeul','printing','gukjagam'], desc:'학문 건물 인접시 문화+5' },
  'temple': { bonus: 'culture', amount: 4, neighbors: ['pagoda','tripitaka','baekje_temple'], desc:'불교 건물 인접시 문화+4' },
  'factory': { bonus: 'gold', amount: 5, neighbors: ['station','tram','electric'], desc:'인프라 인접시 금+5' },
  'rice_paddy': { bonus: 'food', amount: 4, neighbors: ['rice_field_old','granary','well','irrigation'], desc:'농업 건물 인접시 식량+4' },
  'hospital_j': { bonus: 'happy', amount: 3, neighbors: ['hanok','seowon','sijeon'], desc:'주거/학문 인접시 행복+3' },
  'armory': { bonus: 'happy', amount: 3, neighbors: ['wall','fortress','hwarang'], desc:'군사 건물 인접시 행복+3' },
};

function calcAdjacencyBonuses() {
  let bonuses = { pop:0, food:0, gold:0, happy:0, culture:0 };
  const G = window.GRID || 26;
  const g = window.grid;
  for(let gy=0;gy<G;gy++) for(let gx=0;gx<G;gx++) {
    const b = g[gy][gx];
    if(!b || b.isExtra) continue;
    const rule = ADJACENCY_RULES[b.id];
    if(!rule) continue;
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
    for(const [dx,dy] of dirs) {
      const nx=gx+dx, ny=gy+dy;
      if(nx<0||ny<0||nx>=G||ny>=G) continue;
      const nb = g[ny][nx];
      if(nb && !nb.isExtra && rule.neighbors.includes(nb.id)) {
        bonuses[rule.bonus] += rule.amount;
        break;
      }
    }
  }
  return bonuses;
}

// ===================== 4. DIPLOMACY SYSTEM =====================
const KINGDOMS = [
  { id:'china', name:'중국 (당/송/명)', icon:'🏯', relation:50,
    trade:'금 +5/틱', war:'식량 -10/틱',
    gifts:[{cost:{gold:200},gain:20},{cost:{gold:500},gain:40}] },
  { id:'japan', name:'일본', icon:'🗾', relation:30,
    trade:'문화 +3/틱', war:'행복 -8',
    gifts:[{cost:{gold:150},gain:15},{cost:{gold:400},gain:35}] },
  { id:'mongol', name:'몽골/유목민', icon:'🐎', relation:20,
    trade:'인구 +2/틱', war:'건물 파괴 위험',
    gifts:[{cost:{gold:300},gain:25},{cost:{gold:600},gain:50}] },
  { id:'southeast', name:'동남아/아라비아', icon:'🌴', relation:40,
    trade:'금 +3, 문화 +2/틱', war:'교역 차단',
    gifts:[{cost:{gold:250},gain:30},{cost:{gold:500},gain:45}] },
];

window._v6Diplomacy = KINGDOMS.map(k=>({...k}));

function sendGift(kingdomIdx, giftIdx) {
  const k = window._v6Diplomacy[kingdomIdx];
  const gift = KINGDOMS[kingdomIdx].gifts[giftIdx];
  if(!gift) return;
  if(window.resources.gold < gift.cost.gold) { window.toast('금이 부족해요!'); return; }
  window.resources.gold -= gift.cost.gold;
  k.relation = Math.min(100, k.relation + gift.gain);
  window.updateHUD();
  window.playBuildSound();
  window.toast('🤝 ' + k.name + '에 선물! 호감도 +' + gift.gain);
  window.addChronicle(k.icon, k.name + '에 외교 선물을 보냈습니다.');
  showDiplomacy();
}

function getDiplomacyBonuses() {
  let bonuses = { gold:0, culture:0, pop:0, happy:0 };
  for(const k of window._v6Diplomacy) {
    if(k.relation >= 70) {
      if(k.id==='china') bonuses.gold += 5;
      else if(k.id==='japan') bonuses.culture += 3;
      else if(k.id==='mongol') bonuses.pop += 2;
      else if(k.id==='southeast') { bonuses.gold += 3; bonuses.culture += 2; }
    } else if(k.relation < 20) {
      if(k.id==='china') bonuses.gold -= 3;
      else if(k.id==='japan') bonuses.happy -= 5;
      else if(k.id==='mongol') bonuses.happy -= 3;
    }
  }
  return bonuses;
}

// ===================== 5. MAP RESOURCE DEPOSITS =====================
window._v6ResourceTiles = [];

function generateResourceDeposits() {
  const G = window.GRID || 26;
  const types = [
    {type:'iron', icon:'⛏️', bonus:{gold:3}, color:'#8a8a9a'},
    {type:'goldore', icon:'💎', bonus:{gold:5}, color:'#ffd700'},
    {type:'fertile', icon:'🌿', bonus:{food:4}, color:'#4a8a4a'},
    {type:'marble', icon:'🪨', bonus:{culture:3}, color:'#d0d0d0'},
    {type:'hotspring', icon:'♨️', bonus:{happy:3}, color:'#ff9090'},
  ];
  const deposits = [];
  for(let i=0; i<15; i++) {
    const gx = 2 + Math.floor(Math.random() * (G-4));
    const gy = 2 + Math.floor(Math.random() * (G-4));
    if(deposits.some(d=>d.gx===gx&&d.gy===gy)) continue;
    const t = types[Math.floor(Math.random()*types.length)];
    deposits.push({gx, gy, ...t});
  }
  window._v6ResourceTiles = deposits;
}

function getResourceTileBonus(gx, gy) {
  const deposit = window._v6ResourceTiles.find(d=>d.gx===gx&&d.gy===gy);
  if(!deposit) return null;
  return deposit;
}

function calcResourceTileBonuses() {
  let bonuses = { pop:0, food:0, gold:0, happy:0, culture:0 };
  const g = window.grid;
  for(const dep of window._v6ResourceTiles) {
    if(g[dep.gy] && g[dep.gy][dep.gx] && !g[dep.gy][dep.gx].isExtra) {
      for(const [key,val] of Object.entries(dep.bonus)) {
        bonuses[key] += val;
      }
    }
  }
  return bonuses;
}

// ===================== 6. WEATHER AMBIENT SOUNDS =====================
function playWeatherAmbient() {
  if(!window.audioCtx || window.audioMuted) return;
  const wt = window.weatherType;
  if(wt === 'rain') {
    const bufSize = window.audioCtx.sampleRate * 0.5;
    const buf = window.audioCtx.createBuffer(1, bufSize, window.audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0;i<bufSize;i++) data[i] = (Math.random()*2-1)*0.015;
    const src = window.audioCtx.createBufferSource();
    src.buffer = buf;
    const filt = window.audioCtx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 800;
    const gain = window.audioCtx.createGain();
    gain.gain.value = 0.08;
    src.connect(filt);
    filt.connect(gain);
    gain.connect(window.audioCtx.destination);
    src.start();
  } else if(wt === 'snow') {
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 200 + Math.random()*100;
    gain.gain.setValueAtTime(0.02, window.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, window.audioCtx.currentTime + 2);
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.start();
    osc.stop(window.audioCtx.currentTime + 2);
  }
}

// ===================== 7. NEW SFX =====================
function playSFX(type) {
  if(!window.audioCtx || window.audioMuted) return;
  const ctx = window.audioCtx;
  const now = ctx.currentTime;
  if(type === 'research') {
    [523,659,784,1047].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='triangle'; o.frequency.value=f;
      g.gain.setValueAtTime(0.12,now+i*0.12);
      g.gain.exponentialRampToValueAtTime(0.001,now+i*0.12+0.3);
      o.connect(g); g.connect(ctx.destination);
      o.start(now+i*0.12); o.stop(now+i*0.12+0.3);
    });
  } else if(type === 'diplomacy') {
    [392,494,587].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(0.1,now+i*0.15);
      g.gain.exponentialRampToValueAtTime(0.001,now+i*0.15+0.4);
      o.connect(g); g.connect(ctx.destination);
      o.start(now+i*0.15); o.stop(now+i*0.15+0.4);
    });
  } else if(type === 'adjacency') {
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type='triangle'; o.frequency.value=880;
    g.gain.setValueAtTime(0.08,now);
    g.gain.exponentialRampToValueAtTime(0.001,now+0.15);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(now+0.15);
  } else if(type === 'figure') {
    [440,554,659,880].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type='square'; o.frequency.value=f;
      g.gain.setValueAtTime(0.08,now+i*0.1);
      g.gain.exponentialRampToValueAtTime(0.001,now+i*0.1+0.25);
      o.connect(g); g.connect(ctx.destination);
      o.start(now+i*0.1); o.stop(now+i*0.1+0.25);
    });
  }
}

// ===================== 8. 15 NEW QUIZ QUESTIONS (25→40) =====================
const V6_QUIZ_QUESTIONS = [
  { q:'고조선의 법으로 알려진 것은?', opts:['8조법','5조법','3조법','12조법'], ans:0, era:'고조선',
    explain:'고조선에는 8조법이 있었는데, 현재 3개 조항만 전해져요. 사람을 죽이면 즉시 사형에 처했어요.' },
  { q:'가야에서 특히 유명한 금속은?', opts:['금','은','철','구리'], ans:2, era:'삼국시대',
    explain:'가야는 철의 나라로 불렸어요. 철을 화폐처럼 사용하고 일본에도 수출했답니다!' },
  { q:'신라의 골품제도에서 최고 등급은?', opts:['6두품','진골','성골','1두품'], ans:2, era:'삼국시대',
    explain:'성골은 부모 모두 왕족인 최고 신분이에요. 선덕여왕은 성골 출신이었답니다.' },
  { q:'고구려의 수도가 아닌 것은?', opts:['국내성','평양','졸본','경주'], ans:3, era:'삼국시대',
    explain:'경주는 신라의 수도예요. 고구려는 졸본→국내성→평양 순으로 수도를 옮겼어요.' },
  { q:'고려의 수도는 어디였나요?', opts:['서울','평양','개성','부여'], ans:2, era:'고려',
    explain:'고려의 수도는 개성(개경)이었어요. 지금은 북한에 있는 도시랍니다.' },
  { q:'고려시대 국제 무역항의 이름은?', opts:['인천','벽란도','부산','울산'], ans:1, era:'고려',
    explain:'벽란도는 고려의 국제 무역항으로 아라비아 상인들도 찾아왔어요!' },
  { q:'직지심체요절이 만들어진 나라는?', opts:['조선','중국','고려','일본'], ans:2, era:'고려',
    explain:'직지심체요절은 1377년 고려에서 만든 현존 세계 최고(最古)의 금속활자본이에요.' },
  { q:'조선의 신분 제도에서 가장 높은 계층은?', opts:['중인','양반','상민','천민'], ans:1, era:'조선',
    explain:'양반은 문반(문관)과 무반(무관)을 합쳐 부르는 말로 조선의 지배 계층이었어요.' },
  { q:'임진왜란이 일어난 해는?', opts:['1392년','1492년','1592년','1692년'], ans:2, era:'조선',
    explain:'1592년 일본의 도요토미 히데요시가 20만 대군을 이끌고 조선을 침략했어요.' },
  { q:'조선의 국교는?', opts:['불교','도교','유교','기독교'], ans:2, era:'조선',
    explain:'조선은 성리학(유교)을 국가의 기본 이념으로 삼았어요. 숭유억불 정책을 폈답니다.' },
  { q:'동학농민운동이 일어난 해는?', opts:['1876년','1884년','1894년','1904년'], ans:2, era:'근대',
    explain:'1894년 전봉준이 이끈 동학농민운동은 부패한 관리와 외세에 맞선 민중 운동이에요.' },
  { q:'대한제국을 선포한 해는?', opts:['1895년','1897년','1899년','1901년'], ans:1, era:'근대',
    explain:'1897년 고종은 국호를 대한제국으로 바꾸고 황제에 즉위하여 자주독립을 선언했어요.' },
  { q:'을사조약이 체결된 해는?', opts:['1904년','1905년','1907년','1910년'], ans:1, era:'근대',
    explain:'1905년 을사조약으로 일본이 대한제국의 외교권을 빼앗았어요. 을사오적이 유명해요.' },
  { q:'3·1 운동이 일어난 해는?', opts:['1910년','1915년','1919년','1920년'], ans:2, era:'근대',
    explain:'1919년 3월 1일, 전국에서 만세 운동이 일어났어요. 유관순 열사가 유명하답니다.' },
  { q:'대한민국 임시정부가 세워진 곳은?', opts:['서울','도쿄','상하이','워싱턴'], ans:2, era:'근대',
    explain:'1919년 중국 상하이에 대한민국 임시정부가 수립되었어요. 김구 선생이 이끌었답니다.' },
];

// ===================== 9. 10 NEW ACHIEVEMENTS (40→50) =====================
const V6_ACHIEVEMENTS = [
  { id:'tech_first', icon:'🔬', title:'연구자', desc:'첫 기술을 연구했어요!',
    check:()=> window._v6ResearchedTechs.size >= 1 },
  { id:'tech_5', icon:'🧪', title:'과학자', desc:'기술 5개를 연구했어요!',
    check:()=> window._v6ResearchedTechs.size >= 5 },
  { id:'tech_all', icon:'🏆', title:'기술 마스터', desc:'모든 기술을 연구했어요!',
    check:()=> window._v6ResearchedTechs.size >= 10 },
  { id:'figure_first', icon:'👤', title:'역사의 조언자', desc:'첫 역사 인물을 임명했어요!',
    check:()=> window._v6ActiveFigure !== null },
  { id:'diplomat', icon:'🤝', title:'외교관', desc:'외교 호감도 70 이상 달성!',
    check:()=> window._v6Diplomacy.some(k=>k.relation>=70) },
  { id:'peace_maker', icon:'🕊️', title:'평화주의자', desc:'모든 나라 호감도 50 이상!',
    check:()=> window._v6Diplomacy.every(k=>k.relation>=50) },
  { id:'resource_finder', icon:'⛏️', title:'자원 탐험가', desc:'자원 타일 위에 건물 5개!',
    check:()=> {
      let c=0;
      for(const d of window._v6ResourceTiles) {
        if(window.grid[d.gy]&&window.grid[d.gy][d.gx]&&!window.grid[d.gy][d.gx].isExtra) c++;
      }
      return c>=5;
    } },
  { id:'quiz_40', icon:'🧠', title:'역사 학자', desc:'퀴즈 누적 40문제 정답!',
    check:()=> window.totalQuizCorrect >= 40 },
  { id:'builder_200', icon:'🌆', title:'도시의 전설', desc:'건물 200개를 건설했어요!',
    check:(s)=> s.buildCount >= 200 },
  { id:'gold_50000', icon:'💰', title:'전설의 부자', desc:'금 50000개를 모았어요!',
    check:(s)=> s.resources.gold >= 50000 },
];

// ===================== 10. NEW ADVISOR TIPS =====================
const V6_ADVISOR_TIPS = [
  '💡 기술 연구(R키)로 생산 보너스를 얻을 수 있어요!',
  '💡 역사 인물(F키)을 임명하면 특별한 버프를 받아요.',
  '💡 외교(D키)로 이웃 나라와 관계를 개선하면 추가 수입이 생겨요.',
  '💡 건물을 인접하게 배치하면 시너지 보너스가 생겨요!',
  '💡 지도의 반짝이는 타일은 자원 매장지예요. 건물을 지으면 보너스!',
  '💡 세종대왕을 임명하면 문화와 금 수입이 크게 늘어나요.',
  '💡 항해술을 연구하면 교역 수입이 50% 증가해요.',
  '💡 외교 호감도가 70 이상이면 무역 보너스가 생겨요.',
  '💡 가야는 철의 나라로, 일본에 철을 수출했어요.',
  '💡 벽란도는 고려의 국제 무역항으로 &quot;Korea&quot; 이름의 유래가 되었어요.',
];

// ===================== CSS INJECTION =====================
const v6CSS = document.createElement('style');
v6CSS.textContent = `
/* v6.0 Tech Button */
#v6-tech-btn {
  position:fixed;top:50px;right:268px;z-index:10;
  background:rgba(0,0,0,0.7);border:1px solid #555;color:#80ff80;
  width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;
}
/* v6.0 Figure Button */
#v6-figure-btn {
  position:fixed;top:330px;right:10px;z-index:10;
  background:rgba(0,0,0,0.7);border:1px solid #555;color:#ffcc80;
  width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;
}
/* v6.0 Diplomacy Button */
#v6-diplo-btn {
  position:fixed;top:370px;right:10px;z-index:10;
  background:rgba(0,0,0,0.7);border:1px solid #555;color:#80c0ff;
  width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;
}

/* v6 Panel (shared) */
.v6-panel {
  display:none;position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(0,0,0,0.85);z-index:150;
  justify-content:center;align-items:center;padding:20px;
}
.v6-panel.show { display:flex; }
.v6-panel-box {
  background:linear-gradient(145deg,#1a2a1a,#0a1a0a);
  border:2px solid #60e060;border-radius:16px;
  padding:20px;max-width:500px;width:100%;max-height:80vh;overflow-y:auto;
}
.v6-panel-box h2 { text-align:center;margin-bottom:12px; }
.v6-panel-box .v6-close {
  display:block;margin:14px auto 0;background:#60e060;color:#0a1a0a;border:none;
  padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;
}

/* Tech Panel */
#v6-tech-panel .v6-panel-box { background:linear-gradient(145deg,#0a2a1a,#001a0a);border-color:#40c060; }
#v6-tech-panel .v6-panel-box h2 { color:#40c060; }
.v6-tech-item {
  display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:8px;
  border-radius:10px;background:rgba(255,255,255,0.05);border:2px solid transparent;
  cursor:pointer;transition:all 0.2s;
}
.v6-tech-item:hover { background:rgba(64,192,96,0.15); }
.v6-tech-item.researched { border-color:#40c060;background:rgba(64,192,96,0.2);cursor:default; }
.v6-tech-item.locked { opacity:0.4;cursor:not-allowed; }
.v6-tech-item .vt-icon { font-size:28px; }
.v6-tech-item .vt-name { font-weight:bold;font-size:14px;color:#eee; }
.v6-tech-item .vt-desc { font-size:11px;color:#aaa;margin-top:2px; }
.v6-tech-item .vt-cost { font-size:11px;color:#ffd700;margin-top:4px; }
.v6-tech-item .vt-effect { font-size:11px;color:#80ff80;margin-top:2px; }

/* Figure Panel */
#v6-figure-panel .v6-panel-box { background:linear-gradient(145deg,#2a1a0a,#1a0a00);border-color:#ffaa40; }
#v6-figure-panel .v6-panel-box h2 { color:#ffaa40; }
.v6-fig-item {
  display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:8px;
  border-radius:10px;background:rgba(255,255,255,0.05);border:2px solid transparent;
  cursor:pointer;transition:all 0.2s;
}
.v6-fig-item:hover { background:rgba(255,170,64,0.15); }
.v6-fig-item.active { border-color:#ffaa40;background:rgba(255,170,64,0.2); }
.v6-fig-item.locked { opacity:0.4;cursor:not-allowed; }
.v6-fig-item .vf-icon { font-size:32px; }
.v6-fig-item .vf-name { font-weight:bold;font-size:14px;color:#eee; }
.v6-fig-item .vf-desc { font-size:11px;color:#aaa;margin-top:2px; }
.v6-fig-item .vf-buff { font-size:11px;color:#ffd700;margin-top:4px; }

/* Diplomacy Panel */
#v6-diplo-panel .v6-panel-box { background:linear-gradient(145deg,#0a1a2a,#000a1a);border-color:#60a0ff; }
#v6-diplo-panel .v6-panel-box h2 { color:#60a0ff; }
.v6-diplo-item {
  padding:14px;margin-bottom:8px;border-radius:10px;background:rgba(255,255,255,0.05);
}
.v6-diplo-item .vd-header { display:flex;align-items:center;gap:10px;margin-bottom:6px; }
.v6-diplo-item .vd-icon { font-size:28px; }
.v6-diplo-item .vd-name { font-weight:bold;font-size:14px;color:#eee; }
.v6-diplo-item .vd-bar { height:8px;background:#333;border-radius:4px;overflow:hidden;margin:6px 0; }
.v6-diplo-item .vd-bar-fill { height:100%;border-radius:4px;transition:width 0.4s; }
.v6-diplo-item .vd-status { font-size:11px;margin-bottom:6px; }
.v6-diplo-item .vd-gifts { display:flex;gap:6px; }
.v6-diplo-item .vd-gift-btn {
  background:rgba(96,160,255,0.2);border:1px solid rgba(96,160,255,0.4);
  color:#eee;padding:6px 12px;border-radius:8px;font-size:11px;cursor:pointer;
}
.v6-diplo-item .vd-gift-btn:hover { background:rgba(96,160,255,0.4); }

/* Resource deposit indicator */
.v6-deposit-glow {
  position:absolute;pointer-events:none;border-radius:50%;
  animation:v6DepositPulse 2s infinite;
}
@keyframes v6DepositPulse {
  0%,100%{box-shadow:0 0 8px rgba(255,215,0,0.3);}
  50%{box-shadow:0 0 16px rgba(255,215,0,0.6);}
}

/* Adjacency indicator */
.v6-adj-badge {
  position:absolute;font-size:10px;color:#80ff80;
  background:rgba(0,0,0,0.6);padding:1px 4px;border-radius:4px;
  pointer-events:none;white-space:nowrap;
}

/* v6 mobile */
@media(max-width:600px){
  #v6-tech-btn{right:218px;width:30px;height:30px;font-size:14px;}
  #v6-figure-btn{top:260px;right:6px;width:30px;height:30px;font-size:14px;}
  #v6-diplo-btn{top:294px;right:6px;width:30px;height:30px;font-size:14px;}
}
@media(max-width:400px){
  #v6-tech-btn,#v6-figure-btn,#v6-diplo-btn{width:26px;height:26px;font-size:12px;}
}

/* Light mode compat */
body.light-mode #v6-tech-btn,body.light-mode #v6-figure-btn,body.light-mode #v6-diplo-btn {
  background:rgba(255,255,255,0.85);border-color:#bbb;
}
`;
document.head.appendChild(v6CSS);

// ===================== HTML INJECTION =====================

// Tech button
const techBtn = document.createElement('button');
techBtn.id = 'v6-tech-btn';
techBtn.title = '기술 연구';
techBtn.setAttribute('aria-label','기술 연구');
techBtn.textContent = '🔬';
techBtn.onclick = function(){ window.playClickSound(); showTechTree(); };
document.body.appendChild(techBtn);

// Figure button
const figBtn = document.createElement('button');
figBtn.id = 'v6-figure-btn';
figBtn.title = '역사 인물';
figBtn.setAttribute('aria-label','역사 인물');
figBtn.textContent = '👤';
figBtn.onclick = function(){ window.playClickSound(); showFigures(); };
document.body.appendChild(figBtn);

// Diplomacy button
const diploBtn = document.createElement('button');
diploBtn.id = 'v6-diplo-btn';
diploBtn.title = '외교';
diploBtn.setAttribute('aria-label','외교');
diploBtn.textContent = '🌐';
diploBtn.onclick = function(){ window.playClickSound(); showDiplomacy(); };
document.body.appendChild(diploBtn);

// Tech panel
const techPanel = document.createElement('div');
techPanel.id = 'v6-tech-panel';
techPanel.className = 'v6-panel';
techPanel.onclick = function(e){ if(e.target===techPanel) techPanel.classList.remove('show'); };
techPanel.innerHTML = '<div class="v6-panel-box"><h2>🔬 기술 연구</h2><p style="color:#aaa;text-align:center;font-size:12px;margin-bottom:12px;">기술을 연구하여 도시를 발전시키세요</p><div id="v6-tech-list"></div><button class="v6-close" onclick="document.getElementById(\'v6-tech-panel\').classList.remove(\'show\')">닫기</button></div>';
document.body.appendChild(techPanel);

// Figure panel
const figPanel = document.createElement('div');
figPanel.id = 'v6-figure-panel';
figPanel.className = 'v6-panel';
figPanel.onclick = function(e){ if(e.target===figPanel) figPanel.classList.remove('show'); };
figPanel.innerHTML = '<div class="v6-panel-box"><h2>👤 역사 인물</h2><p style="color:#aaa;text-align:center;font-size:12px;margin-bottom:12px;">위대한 인물을 고문으로 임명하세요</p><div id="v6-fig-active" style="text-align:center;color:#ffd700;font-size:13px;margin-bottom:10px;"></div><div id="v6-fig-list"></div><button class="v6-close" style="background:#ffaa40;" onclick="document.getElementById(\'v6-figure-panel\').classList.remove(\'show\')">닫기</button></div>';
document.body.appendChild(figPanel);

// Diplomacy panel
const diploPanel = document.createElement('div');
diploPanel.id = 'v6-diplo-panel';
diploPanel.className = 'v6-panel';
diploPanel.onclick = function(e){ if(e.target===diploPanel) diploPanel.classList.remove('show'); };
diploPanel.innerHTML = '<div class="v6-panel-box"><h2>🌐 외교</h2><p style="color:#aaa;text-align:center;font-size:12px;margin-bottom:12px;">이웃 나라와 관계를 발전시키세요</p><div id="v6-diplo-list"></div><button class="v6-close" style="background:#60a0ff;" onclick="document.getElementById(\'v6-diplo-panel\').classList.remove(\'show\')">닫기</button></div>';
document.body.appendChild(diploPanel);

// ===================== PANEL RENDERERS =====================

function showTechTree() {
  playSFX('research');
  const list = document.getElementById('v6-tech-list');
  list.innerHTML = '';
  let researchedCount = window._v6ResearchedTechs.size;
  let html = '<div style="text-align:center;color:#40c060;font-size:13px;margin-bottom:10px;">연구 완료: ' + researchedCount + '/' + TECHNOLOGIES.length + '</div>';
  for(const tech of TECHNOLOGIES) {
    const researched = window._v6ResearchedTechs.has(tech.id);
    const locked = tech.era > window.currentEra;
    const cls = researched ? 'researched' : locked ? 'locked' : '';
    html += '<div class="v6-tech-item ' + cls + '" ' + (!researched && !locked ? 'onclick="window._v6ResearchTech(\'' + tech.id + '\')"' : '') + '>';
    html += '<div class="vt-icon">' + tech.icon + '</div>';
    html += '<div style="flex:1;"><div class="vt-name">' + tech.name + (researched ? ' ✓' : locked ? ' 🔒 ' + window.ERAS[tech.era] : '') + '</div>';
    html += '<div class="vt-desc">' + tech.desc + '</div>';
    html += '<div class="vt-effect">' + tech.effect + '</div>';
    if(!researched && !locked) html += '<div class="vt-cost">비용: 💰' + tech.cost.gold + ' 🏛️' + tech.cost.culture + '</div>';
    html += '</div></div>';
  }
  list.innerHTML = html;
  document.getElementById('v6-tech-panel').classList.add('show');
}

function showFigures() {
  playSFX('figure');
  const list = document.getElementById('v6-fig-list');
  const active = document.getElementById('v6-fig-active');
  active.textContent = window._v6ActiveFigure ? '현재 고문: ' + window._v6ActiveFigure.icon + ' ' + window._v6ActiveFigure.name + ' (' + window._v6ActiveFigure.buff + ')' : '고문을 임명하지 않았어요';
  let html = '';
  for(const fig of FIGURES) {
    const isActive = window._v6ActiveFigure && window._v6ActiveFigure.id === fig.id;
    const locked = fig.era > window.currentEra;
    const cls = isActive ? 'active' : locked ? 'locked' : '';
    html += '<div class="v6-fig-item ' + cls + '" ' + (!locked ? 'onclick="window._v6SelectFigure(\'' + fig.id + '\')"' : '') + '>';
    html += '<div class="vf-icon">' + fig.icon + '</div>';
    html += '<div style="flex:1;"><div class="vf-name">' + fig.name + (isActive ? ' ⭐ 활동중' : locked ? ' 🔒 ' + window.ERAS[fig.era] : '') + '</div>';
    html += '<div class="vf-desc">' + fig.desc + '</div>';
    html += '<div class="vf-buff">효과: ' + fig.buff + '</div>';
    html += '</div></div>';
  }
  list.innerHTML = html;
  document.getElementById('v6-figure-panel').classList.add('show');
}

function showDiplomacy() {
  playSFX('diplomacy');
  const list = document.getElementById('v6-diplo-list');
  let html = '';
  window._v6Diplomacy.forEach((k, idx) => {
    const rel = k.relation;
    const status = rel >= 70 ? '🟢 우호' : rel >= 40 ? '🟡 보통' : '🔴 적대';
    const barColor = rel >= 70 ? '#40c060' : rel >= 40 ? '#ffc040' : '#ff4040';
    html += '<div class="v6-diplo-item">';
    html += '<div class="vd-header"><span class="vd-icon">' + k.icon + '</span><span class="vd-name">' + k.name + '</span></div>';
    html += '<div class="vd-bar"><div class="vd-bar-fill" style="width:' + rel + '%;background:' + barColor + ';"></div></div>';
    html += '<div class="vd-status">' + status + ' (호감도: ' + rel + '/100)</div>';
    html += '<div style="font-size:11px;color:#aaa;margin-bottom:6px;">우호시: ' + k.trade + ' | 적대시: ' + k.war + '</div>';
    html += '<div class="vd-gifts">';
    KINGDOMS[idx].gifts.forEach((gift, gi) => {
      html += '<button class="vd-gift-btn" onclick="window._v6SendGift(' + idx + ',' + gi + ')">🎁 선물 (💰' + gift.cost.gold + ', +' + gift.gain + ')</button>';
    });
    html += '</div></div>';
  });
  list.innerHTML = html;
  document.getElementById('v6-diplo-panel').classList.add('show');
}

// ===================== HOOK INTO GAME SYSTEMS =====================

// Hook recalcRates to add v6 bonuses
const origRecalcRates = window.recalcRates;
window.recalcRates = function() {
  origRecalcRates.call(this);
  // Tech bonuses
  const tb = window._v6TechBonuses;
  window.rates.food = Math.floor(window.rates.food * tb.foodMult * tb.globalMult);
  window.rates.gold = Math.floor(window.rates.gold * tb.goldMult * tb.globalMult);
  window.rates.culture = Math.floor(window.rates.culture * tb.cultureMult * tb.globalMult);
  window.rates.pop = Math.floor(window.rates.pop * tb.popMult);
  // Trade bonus from tech
  if(tb.tradeMult > 1) {
    const tradeInc = window.getTradeIncome();
    window.rates.gold += Math.floor(tradeInc * (tb.tradeMult - 1));
  }
  // Adjacency bonuses
  const adj = calcAdjacencyBonuses();
  window.rates.food += adj.food;
  window.rates.gold += adj.gold;
  window.rates.culture += adj.culture;
  window.rates.happy += adj.happy;
  // Diplomacy bonuses
  const diplo = getDiplomacyBonuses();
  window.rates.gold += diplo.gold;
  window.rates.culture += diplo.culture;
  window.rates.pop += diplo.pop;
  window.rates.happy += diplo.happy;
  // Resource tile bonuses
  const resTile = calcResourceTileBonuses();
  window.rates.food += resTile.food;
  window.rates.gold += resTile.gold;
  window.rates.culture += resTile.culture;
  window.rates.happy += resTile.happy;
  // Historical figure effect
  if(window._v6ActiveFigure && window._v6ActiveFigure.effect) {
    window._v6ActiveFigure.effect();
  }
};

// Hook checkAchievements to include v6 achievements
const origCheckAch = window.checkAchievements;
window.checkAchievements = function() {
  origCheckAch.call(this);
  const state = {
    buildCount: window.buildCount,
    currentEra: window.currentEra,
    resources: window.resources,
    disastersSurvived: window.disastersSurvived,
  };
  for(const ach of V6_ACHIEVEMENTS) {
    if(!window.unlockedAchievements.has(ach.id) && ach.check(state)) {
      window.unlockedAchievements.add(ach.id);
      window.showAchievementToast(ach);
      window.playAchSound();
    }
  }
};

// Hook showAchievements to include v6 achievements
const origShowAch = window.showAchievements;
window.showAchievements = function() {
  origShowAch.call(this);
  const list = document.getElementById('ach-list');
  for(const ach of V6_ACHIEVEMENTS) {
    const unlocked = window.unlockedAchievements.has(ach.id);
    const div = document.createElement('div');
    div.className = 'ach-item' + (unlocked ? ' unlocked' : '');
    div.innerHTML = '<div class="ai-icon">' + ach.icon + '</div><div class="ai-info"><div class="ai-title">' + (unlocked ? ach.title : '???') + '</div><div class="ai-desc">' + (unlocked ? ach.desc : '잠겨있음') + '</div></div>';
    list.appendChild(div);
  }
};

// Hook showStats to include v6 stats
const origShowStats = window.showStats;
window.showStats = function() {
  origShowStats.call(this);
  const details = document.getElementById('stats-details');
  const adjB = calcAdjacencyBonuses();
  const adjTotal = adjB.food + adjB.gold + adjB.culture + adjB.happy;
  const diploB = getDiplomacyBonuses();
  let resOnTile = 0;
  for(const d of window._v6ResourceTiles) {
    if(window.grid[d.gy]&&window.grid[d.gy][d.gx]&&!window.grid[d.gy][d.gx].isExtra) resOnTile++;
  }
  details.innerHTML += [
    '<div class="stat-row"><span class="stat-label">기술 연구</span><span class="stat-value">' + window._v6ResearchedTechs.size + '/' + TECHNOLOGIES.length + '</span></div>',
    '<div class="stat-row"><span class="stat-label">역사 인물</span><span class="stat-value">' + (window._v6ActiveFigure ? window._v6ActiveFigure.name : '없음') + '</span></div>',
    '<div class="stat-row"><span class="stat-label">인접 보너스</span><span class="stat-value">+' + adjTotal + ' 총합</span></div>',
    '<div class="stat-row"><span class="stat-label">외교</span><span class="stat-value">' + window._v6Diplomacy.map(k=>k.icon+k.relation).join(' ') + '</span></div>',
    '<div class="stat-row"><span class="stat-label">자원 타일</span><span class="stat-value">' + resOnTile + '/' + window._v6ResourceTiles.length + ' 활용</span></div>',
  ].join('');
};

// Hook showQuiz to add v6 questions
const origQuizQs = window.QUIZ_QUESTIONS;
if(origQuizQs && Array.isArray(origQuizQs)) {
  for(const q of V6_QUIZ_QUESTIONS) origQuizQs.push(q);
}

// Add v6 advisor tips
if(window.V5_ADVISOR_TIPS && Array.isArray(window.V5_ADVISOR_TIPS)) {
  for(const tip of V6_ADVISOR_TIPS) window.V5_ADVISOR_TIPS.push(tip);
} else if(window.NEW_ADVISOR_TIPS && Array.isArray(window.NEW_ADVISOR_TIPS)) {
  for(const tip of V6_ADVISOR_TIPS) window.NEW_ADVISOR_TIPS.push(tip);
}

// Hook render to draw resource deposits
const origRender = window.render;
window.render = function() {
  origRender.call(this);
  const canvas = window.canvas || document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  for(const dep of window._v6ResourceTiles) {
    const [sx, sy] = window.isoToScreen(dep.gx, dep.gy);
    if(sx < -50 || sx > canvas.width+50 || sy < -50 || sy > canvas.height+50) continue;
    const z = window.zoom || 1;
    if(!window.grid[dep.gy] || !window.grid[dep.gy][dep.gx]) {
      ctx.globalAlpha = 0.5 + 0.2 * Math.sin(window.tickTimer * 0.05);
      ctx.font = Math.round(14*z) + 'px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dep.icon, sx, sy - 4*z);
      ctx.globalAlpha = 1;
    }
  }
};

// Hook saveGame/autoSave for v6 data
const origSaveGame = window.saveGame;
window.saveGame = function() {
  origSaveGame.call(this);
  try {
    const v6data = {
      researchedTechs: Array.from(window._v6ResearchedTechs),
      activeFigure: window._v6ActiveFigure ? window._v6ActiveFigure.id : null,
      diplomacy: window._v6Diplomacy.map(k=>({id:k.id,relation:k.relation})),
      resourceTiles: window._v6ResourceTiles,
      techBonuses: window._v6TechBonuses,
    };
    localStorage.setItem('cityBuilder_v6data', JSON.stringify(v6data));
  } catch(e){}
};

const origAutoSave = window.autoSave;
window.autoSave = function() {
  origAutoSave.call(this);
  try {
    const v6data = {
      researchedTechs: Array.from(window._v6ResearchedTechs),
      activeFigure: window._v6ActiveFigure ? window._v6ActiveFigure.id : null,
      diplomacy: window._v6Diplomacy.map(k=>({id:k.id,relation:k.relation})),
      resourceTiles: window._v6ResourceTiles,
      techBonuses: window._v6TechBonuses,
    };
    localStorage.setItem('cityBuilder_v6data', JSON.stringify(v6data));
  } catch(e){}
};

// Hook into keyboard shortcuts
window.addEventListener('keydown', function(e) {
  if(e.key === 'r' && !e.ctrlKey) showTechTree();
  else if(e.key === 'f' && !e.ctrlKey) { window.playClickSound(); showFigures(); }
  else if(e.key === 'd' && !e.ctrlKey) { window.playClickSound(); showDiplomacy(); }
});

// Weather ambient sound hook
let weatherAmbientTimer = 0;
const origGameTick = window.gameTick;
window.gameTick = function() {
  origGameTick.call(this);
  weatherAmbientTimer++;
  if(weatherAmbientTimer >= 300) {
    weatherAmbientTimer = 0;
    if(window.weatherType !== 'clear' && window.speed > 0) playWeatherAmbient();
  }
  // Diplomacy relation decay (very slow)
  if(window.tickTimer % 6000 === 0) {
    for(const k of window._v6Diplomacy) {
      k.relation = Math.max(10, k.relation - 2);
    }
  }
};

// Expose functions
window._v6ResearchTech = researchTech;
window._v6SelectFigure = selectFigure;
window._v6SendGift = sendGift;

// ===================== INITIALIZATION =====================
function v6Init() {
  generateResourceDeposits();
  // Load saved v6 data
  try {
    const saved = localStorage.getItem('cityBuilder_v6data');
    if(saved) {
      const data = JSON.parse(saved);
      if(data.researchedTechs) {
        for(const tid of data.researchedTechs) {
          const tech = TECHNOLOGIES.find(t=>t.id===tid);
          if(tech) { window._v6ResearchedTechs.add(tid); tech.fn(); }
        }
      }
      if(data.activeFigure) {
        window._v6ActiveFigure = FIGURES.find(f=>f.id===data.activeFigure) || null;
      }
      if(data.diplomacy) {
        for(const d of data.diplomacy) {
          const k = window._v6Diplomacy.find(x=>x.id===d.id);
          if(k) k.relation = d.relation;
        }
      }
      if(data.resourceTiles && data.resourceTiles.length > 0) {
        window._v6ResourceTiles = data.resourceTiles;
      }
    }
  } catch(e){}

  // Update tutorial step
  const tutBox = document.getElementById('tutorial-box');
  if(tutBox) {
    const lastStep = tutBox.querySelector('.t-step:last-of-type');
    if(lastStep) {
      const newSteps = [
        '<div class="t-step"><strong>8. 기술 연구</strong> — 🔬 버튼(또는 R키)으로 기술을 연구하면 생산이 증가해요!</div>',
        '<div class="t-step"><strong>9. 역사 인물</strong> — 👤 버튼(또는 F키)으로 위인을 고문으로 임명하세요.</div>',
        '<div class="t-step"><strong>10. 외교</strong> — 🌐 버튼(또는 D키)으로 이웃 나라와 관계를 개선하세요.</div>',
      ];
      lastStep.insertAdjacentHTML('afterend', newSteps.join(''));
    }
  }

  // Welcome toast
  setTimeout(function(){
    window.toast('한국사 도시건설 v6.0 — 기술연구+역사인물+외교+인접보너스!');
  }, 1500);
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', v6Init);
} else {
  setTimeout(v6Init, 100);
}

})();
