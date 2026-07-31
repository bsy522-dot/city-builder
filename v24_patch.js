(function(){
'use strict';

// ===== v24 city-builder patch: 8 Canvas features =====
// 1. 왕실 외교 동맹 분석기 (Diplomatic Alliance Analyzer)
// 2. 도시 인구 이동 추적기 (Population Migration Tracker)
// 3. 고대 산업 생산성 지표 (Industry Productivity Index)
// 4. 도시 행복 지수 대시보드 (City Happiness Dashboard)
// 5. 왕실 계보 가계도 (Royal Genealogy Tree)
// 6. 도시 계절 경제 순환 (Seasonal Economic Cycle)
// 7. 고대 건축 양식 비교기 (Architecture Style Comparator)
// 8. 도시 종합 발전 보고서 (Comprehensive Development Report)

var V24_SFX_CTX = null;
function v24sfx(type){
  try {
    if(!V24_SFX_CTX) V24_SFX_CTX = new (window.AudioContext||window.webkitAudioContext)();
    var c = V24_SFX_CTX, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    var freqs = {
      nav:[440,0.08],diplo_ally:[523,0.15],diplo_war:[330,0.1],diplo_trade:[494,0.12],
      pop_grow:[587,0.12],pop_decline:[294,0.1],industry_up:[659,0.15],industry_craft:[440,0.1],
      happy_high:[698,0.15],happy_low:[262,0.1],royal_crown:[784,0.18],royal_heir:[587,0.12],
      econ_boom:[659,0.12],econ_bust:[330,0.1],arch_build:[523,0.12],arch_master:[698,0.15],
      report_gen:[440,0.1],report_grade:[784,0.15],quiz_correct:[659,0.12],quiz_wrong:[262,0.1],
      achieve:[784,0.18],panel_open:[440,0.06]
    };
    var f = freqs[type]||[440,0.1];
    o.frequency.setValueAtTime(f[0],t);
    o.type = type==='diplo_war'?'sawtooth':type==='royal_crown'?'triangle':'sine';
    g.gain.setValueAtTime(0.15,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+f[1]);
    o.start(t); o.stop(t+f[1]+0.05);
  } catch(e){}
}

var V24_COLORS = {
  bg:'#1a1a2e',panel:'#16213e',accent:'#0f3460',highlight:'#e94560',
  text:'#eee',dim:'#999',grid:'#333',
  bars:['#e94560','#0f3460','#e9a045','#45e980','#4590e9','#e945c0','#90e945','#4545e9',
        '#e96045','#45e9c0','#c045e9','#e9e045']
};

var v24State = {currentSection:0, quizIdx:0, quizScore:0, quizTotal:0, achievements:[], sectionViewed:[false,false,false,false,false,false,false,false]};

// ===== SECTION 1: 왕실 외교 동맹 분석기 =====
function renderDiplomacy(canvas){
  var ctx = canvas.getContext('2d');
  var W = 640, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e9a045'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('왕실 외교 동맹 분석기',W/2,25);

  var nations = [
    {name:'고구려',power:92,diplomacy:78,military:95,economy:70,culture:85,relation:'경쟁',color:'#e94560'},
    {name:'백제',power:75,diplomacy:88,military:72,economy:82,culture:90,relation:'동맹',color:'#4590e9'},
    {name:'신라',power:80,diplomacy:82,military:78,economy:85,culture:88,relation:'교류',color:'#45e980'},
    {name:'가야',power:55,diplomacy:65,military:50,economy:78,culture:72,relation:'속국',color:'#e9a045'},
    {name:'당나라',power:98,diplomacy:90,military:96,economy:95,culture:92,relation:'조공',color:'#c045e9'},
    {name:'일본',power:60,diplomacy:55,military:58,economy:62,culture:68,relation:'교역',color:'#e96045'},
    {name:'거란',power:70,diplomacy:45,military:82,economy:50,culture:40,relation:'적대',color:'#e945c0'},
    {name:'발해',power:72,diplomacy:70,military:75,economy:65,culture:78,relation:'형제',color:'#90e945'}
  ];

  var cx = W/2, cy = H/2+15;
  var positions = [];
  for(var i=0;i<nations.length;i++){
    var ang = (i/nations.length)*Math.PI*2 - Math.PI/2;
    positions.push({x:cx+Math.cos(ang)*150, y:cy+Math.sin(ang)*130});
  }

  var relColors = {'동맹':'#45e980','교류':'#4590e9','교역':'#e9a045','조공':'#c045e9',
                   '형제':'#90e945','경쟁':'#e94560','적대':'#e945c0','속국':'#e9e045'};

  for(var i=0;i<nations.length;i++){
    for(var j=i+1;j<nations.length;j++){
      var strength = Math.min(nations[i].diplomacy,nations[j].diplomacy)/100;
      ctx.strokeStyle = V24_COLORS.grid;
      ctx.lineWidth = strength*3;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(positions[i].x,positions[i].y);
      ctx.lineTo(positions[j].x,positions[j].y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  for(var i=0;i<nations.length;i++){
    ctx.strokeStyle = nations[i].color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(positions[i].x,positions[i].y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.beginPath(); ctx.arc(cx,cy,24,0,Math.PI*2);
  ctx.fillStyle = '#0f3460'; ctx.fill();
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 10px sans-serif';
  ctx.fillText('우리',cx,cy-3); ctx.fillText('왕국',cx,cy+9);

  for(var i=0;i<nations.length;i++){
    var p = positions[i], n = nations[i];
    var nodeR = 26 + (n.power/100)*8;

    ctx.beginPath(); ctx.arc(p.x,p.y,nodeR,0,Math.PI*2);
    ctx.fillStyle = V24_COLORS.panel; ctx.fill();
    ctx.strokeStyle = n.color; ctx.lineWidth = 2.5; ctx.stroke();

    var powerArc = (n.power/100)*Math.PI*2;
    ctx.beginPath(); ctx.arc(p.x,p.y,nodeR+4,-Math.PI/2,-Math.PI/2+powerArc);
    ctx.strokeStyle = n.color; ctx.lineWidth = 3; ctx.stroke();

    ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(n.name,p.x,p.y-6);
    ctx.fillStyle = relColors[n.relation]||'#999'; ctx.font = '8px sans-serif';
    ctx.fillText(n.relation,p.x,p.y+5);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '7px sans-serif';
    ctx.fillText('국력 '+n.power,p.x,p.y+16);
  }

  var allyCount = nations.filter(function(n){return n.relation==='동맹'||n.relation==='교류'||n.relation==='형제';}).length;
  var hostileCount = nations.filter(function(n){return n.relation==='적대'||n.relation==='경쟁';}).length;
  var grade = allyCount>=4?'S':allyCount>=3?'A':allyCount>=2?'B':allyCount>=1?'C':'D';

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('동맹/우호 '+allyCount+'국  |  적대/경쟁 '+hostileCount+'국  |  외교 등급: '+grade,W/2,H-12);
}

// ===== SECTION 2: 도시 인구 이동 추적기 =====
function renderMigration(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#4590e9'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 인구 이동 추적기',W/2,25);

  var regions = [
    {name:'왕도(수도)',pop:45000,inflow:3200,outflow:1800,growth:3.1,density:95,attract:92},
    {name:'동부 농촌',pop:28000,inflow:800,outflow:2100,growth:-4.6,density:35,attract:40},
    {name:'서부 항구',pop:22000,inflow:2500,outflow:1200,growth:5.9,density:72,attract:78},
    {name:'남부 곡창',pop:32000,inflow:1200,outflow:1500,growth:-0.9,density:45,attract:55},
    {name:'북부 변경',pop:15000,inflow:600,outflow:1800,growth:-8.0,density:20,attract:25},
    {name:'중부 교역',pop:25000,inflow:2800,outflow:900,growth:7.6,density:68,attract:85}
  ];

  var barH = 42, startY = 55, startX = 100, barArea = W - startX - 40;
  var maxPop = 50000;

  for(var i=0;i<regions.length;i++){
    var y = startY + i*55;
    var r = regions[i];

    ctx.fillStyle = V24_COLORS.dim; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(r.name, startX-8, y+14);

    var popW = (r.pop/maxPop)*barArea*0.6;
    ctx.fillStyle = V24_COLORS.bars[i]; ctx.globalAlpha = 0.7;
    ctx.fillRect(startX, y, popW, 18);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(r.pop.toLocaleString()+'명', startX+popW+4, y+13);

    var inflowW = (r.inflow/3500)*barArea*0.3;
    var outflowW = (r.outflow/3500)*barArea*0.3;
    ctx.fillStyle = '#45e980'; ctx.fillRect(startX, y+20, inflowW, 8);
    ctx.fillStyle = '#e94560'; ctx.fillRect(startX+inflowW+2, y+20, outflowW, 8);

    ctx.fillStyle = V24_COLORS.dim; ctx.font = '7px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('유입 '+r.inflow, startX+inflowW+outflowW+8, y+27);

    var growthColor = r.growth>0?'#45e980':'#e94560';
    ctx.fillStyle = growthColor; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText((r.growth>0?'+':'')+r.growth.toFixed(1)+'%', W-15, y+14);

    var densBar = (r.density/100)*40;
    ctx.fillStyle = r.density>70?'#e9a045':r.density>40?'#4590e9':'#45e980';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(W-60, y+18, densBar, 8);
    ctx.globalAlpha = 1;
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '6px sans-serif';
    ctx.fillText('밀도'+r.density+'%',W-58,y+36);
  }

  var totalPop = regions.reduce(function(s,r){return s+r.pop;},0);
  var totalIn = regions.reduce(function(s,r){return s+r.inflow;},0);
  var totalOut = regions.reduce(function(s,r){return s+r.outflow;},0);
  var netGrowth = ((totalIn-totalOut)/totalPop*100).toFixed(1);

  ctx.fillStyle = '#4590e9'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('총 인구: '+totalPop.toLocaleString()+'명  |  순유입: '+(totalIn-totalOut>0?'+':'')+(totalIn-totalOut)+'명  |  성장률: '+netGrowth+'%',W/2,H-30);

  var grade = parseFloat(netGrowth)>5?'S':parseFloat(netGrowth)>2?'A':parseFloat(netGrowth)>0?'B':parseFloat(netGrowth)>-2?'C':'D';
  ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':grade==='B'?'#4590e9':'#e94560';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('인구 성장 등급: '+grade,W/2,H-12);
}

// ===== SECTION 3: 고대 산업 생산성 지표 =====
function renderIndustry(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e9a045'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('고대 산업 생산성 지표',W/2,25);

  var industries = [
    {name:'농업',output:95,workers:40,efficiency:72,tech:55,trade:60,growth:3.2},
    {name:'어업',output:65,workers:15,efficiency:68,tech:45,trade:55,growth:2.1},
    {name:'광업',output:50,workers:12,efficiency:58,tech:60,trade:70,growth:4.5},
    {name:'도자기',output:78,workers:8,efficiency:85,tech:80,trade:90,growth:5.8},
    {name:'직물',output:72,workers:20,efficiency:75,tech:65,trade:78,growth:3.9},
    {name:'제철',output:60,workers:10,efficiency:62,tech:72,trade:65,growth:4.2},
    {name:'조선',output:45,workers:6,efficiency:70,tech:78,trade:82,growth:6.1},
    {name:'건축',output:55,workers:18,efficiency:65,tech:58,trade:30,growth:2.8},
    {name:'양조',output:40,workers:5,efficiency:80,tech:50,trade:72,growth:3.5},
    {name:'의약',output:35,workers:4,efficiency:88,tech:82,trade:68,growth:5.2}
  ];

  var axes = ['생산량','인력비','효율성','기술력','교역성','성장률'];
  var cx = W/2, cy = H/2+15, maxR = 140;
  var selected = v24State.industryIdx || 0;
  var ind = industries[selected];

  for(var ring=1;ring<=5;ring++){
    var r = maxR*(ring/5);
    ctx.beginPath();
    for(var a=0;a<6;a++){
      var ang = (a/6)*Math.PI*2 - Math.PI/2;
      var px = cx+Math.cos(ang)*r, py = cy+Math.sin(ang)*r;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle = V24_COLORS.grid; ctx.lineWidth = 0.5; ctx.stroke();
  }

  for(var a=0;a<6;a++){
    var ang = (a/6)*Math.PI*2 - Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*maxR,cy+Math.sin(ang)*maxR);
    ctx.strokeStyle = V24_COLORS.grid; ctx.lineWidth = 0.5; ctx.stroke();

    var lx = cx+Math.cos(ang)*(maxR+18), ly = cy+Math.sin(ang)*(maxR+18);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(axes[a],lx,ly+3);
  }

  var vals = [ind.output,ind.workers*2.5,ind.efficiency,ind.tech,ind.trade,ind.growth*16.5];
  ctx.beginPath();
  for(var a=0;a<6;a++){
    var ang = (a/6)*Math.PI*2 - Math.PI/2;
    var vr = (vals[a]/100)*maxR;
    var px = cx+Math.cos(ang)*vr, py = cy+Math.sin(ang)*vr;
    if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
  }
  ctx.closePath();
  ctx.fillStyle = V24_COLORS.bars[selected]; ctx.globalAlpha = 0.3; ctx.fill();
  ctx.globalAlpha = 1; ctx.strokeStyle = V24_COLORS.bars[selected]; ctx.lineWidth = 2; ctx.stroke();

  for(var a=0;a<6;a++){
    var ang = (a/6)*Math.PI*2 - Math.PI/2;
    var vr = (vals[a]/100)*maxR;
    ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*vr,cy+Math.sin(ang)*vr,3,0,Math.PI*2);
    ctx.fillStyle = V24_COLORS.bars[selected]; ctx.fill();
  }

  ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(ind.name+' 산업',cx,cy-maxR-28);

  var total = Math.round((ind.output+ind.efficiency+ind.tech+ind.trade)/4);
  var grade = total>80?'S':total>65?'A':total>50?'B':total>35?'C':'D';
  ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':'#e9a045';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('생산성 등급: '+grade+' ('+total+'점)',W/2,H-30);

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '9px sans-serif';
  var nameList = industries.map(function(ind,i){return (i===selected?'['+ind.name+']':ind.name);}).join(' ');
  ctx.fillText(nameList,W/2,H-12);
}

// ===== SECTION 4: 도시 행복 지수 대시보드 =====
function renderHappiness(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#45e980'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 행복 지수 대시보드',W/2,25);

  var factors = [
    {name:'식량 안정',value:82,icon:'🌾',weight:20},
    {name:'치안 수준',value:68,icon:'🛡️',weight:15},
    {name:'주거 환경',value:75,icon:'🏠',weight:15},
    {name:'의료 접근',value:58,icon:'🏥',weight:12},
    {name:'교육 기회',value:72,icon:'📚',weight:12},
    {name:'종교 자유',value:85,icon:'🙏',weight:8},
    {name:'오락 여가',value:62,icon:'🎭',weight:10},
    {name:'세금 공정',value:55,icon:'💰',weight:8}
  ];

  var cols = 4, rows = 2;
  var gW = 130, gH = 140, gapX = 12, gapY = 20;
  var totalW = cols*gW + (cols-1)*gapX;
  var startX = (W-totalW)/2, startY = 50;

  for(var i=0;i<factors.length;i++){
    var col = i%cols, row = Math.floor(i/cols);
    var x = startX + col*(gW+gapX) + gW/2;
    var y = startY + row*(gH+gapY) + 40;
    var f = factors[i];

    var gaugeR = 42;
    var startAng = Math.PI*0.8;
    var endAng = Math.PI*2.2;
    var valAng = startAng + (f.value/100)*(endAng-startAng);

    ctx.beginPath(); ctx.arc(x,y,gaugeR,startAng,endAng);
    ctx.strokeStyle = V24_COLORS.grid; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();

    var gColor = f.value>75?'#45e980':f.value>50?'#e9a045':'#e94560';
    ctx.beginPath(); ctx.arc(x,y,gaugeR,startAng,valAng);
    ctx.strokeStyle = gColor; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();

    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(f.value,x,y+5);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif';
    ctx.fillText('/100',x,y+16);

    ctx.font = '18px sans-serif';
    ctx.fillText(f.icon,x,y-gaugeR-8);

    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif';
    ctx.fillText(f.name,x,y+gaugeR+10);

    ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif';
    ctx.fillText('가중 '+f.weight+'%',x,y+gaugeR+22);
  }

  var weightedSum = factors.reduce(function(s,f){return s+f.value*f.weight;},0);
  var totalWeight = factors.reduce(function(s,f){return s+f.weight;},0);
  var overall = Math.round(weightedSum/totalWeight);
  var grade = overall>80?'S':overall>70?'A':overall>60?'B':overall>45?'C':'D';

  ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':grade==='B'?'#4590e9':'#e94560';
  ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('종합 행복 지수: '+overall+'점  |  등급: '+grade,W/2,H-12);
}

// ===== SECTION 5: 왕실 계보 가계도 =====
function renderGenealogy(canvas){
  var ctx = canvas.getContext('2d');
  var W = 640, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#ffd700'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('왕실 계보 가계도',W/2,25);

  var royals = [
    {name:'태조 왕건',reign:'918-943',gen:1,x:320,y:60,children:[1,2],achievement:'고려 건국',power:95},
    {name:'혜종',reign:'943-945',gen:2,x:220,y:130,children:[3],achievement:'왕위 계승',power:45},
    {name:'정종',reign:'945-949',gen:2,x:420,y:130,children:[4],achievement:'서경 천도론',power:55},
    {name:'광종',reign:'949-975',gen:3,x:160,y:200,children:[5],achievement:'노비안검법',power:88},
    {name:'경종',reign:'975-981',gen:3,x:360,y:200,children:[6],achievement:'전시과 시행',power:60},
    {name:'성종',reign:'981-997',gen:4,x:260,y:270,children:[7,8],achievement:'유교 정치 확립',power:82},
    {name:'목종',reign:'997-1009',gen:5,x:180,y:340,children:[],achievement:'천추태후 섭정',power:35},
    {name:'현종',reign:'1009-1031',gen:5,x:340,y:340,children:[],achievement:'거란 격퇴',power:78},
    {name:'덕종',reign:'1031-1034',gen:6,x:480,y:270,children:[9],achievement:'천리장성',power:52},
    {name:'정종(11대)',reign:'1034-1046',gen:6,x:520,y:340,children:[],achievement:'불교 흥성',power:58}
  ];

  for(var i=0;i<royals.length;i++){
    var r = royals[i];
    if(r.children){
      for(var j=0;j<r.children.length;j++){
        var child = royals[r.children[j]];
        if(child){
          ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(r.x,r.y+18);
          ctx.quadraticCurveTo((r.x+child.x)/2,r.y+40,child.x,child.y-18);
          ctx.stroke();
        }
      }
    }
  }
  ctx.globalAlpha = 1;

  for(var i=0;i<royals.length;i++){
    var r = royals[i];
    var nodeW = 90, nodeH = 34;

    var pAlpha = r.power/100;
    ctx.fillStyle = r.power>80?'#2a1a00':r.power>60?'#1a2a1a':r.power>40?'#1a1a2a':'#2a1a1a';
    ctx.strokeStyle = r.power>80?'#ffd700':r.power>60?'#45e980':r.power>40?'#4590e9':'#e94560';
    ctx.lineWidth = 2;

    var rx = r.x-nodeW/2, ry = r.y-nodeH/2;
    ctx.beginPath();
    ctx.moveTo(rx+6,ry);
    ctx.lineTo(rx+nodeW-6,ry);
    ctx.quadraticCurveTo(rx+nodeW,ry,rx+nodeW,ry+6);
    ctx.lineTo(rx+nodeW,ry+nodeH-6);
    ctx.quadraticCurveTo(rx+nodeW,ry+nodeH,rx+nodeW-6,ry+nodeH);
    ctx.lineTo(rx+6,ry+nodeH);
    ctx.quadraticCurveTo(rx,ry+nodeH,rx,ry+nodeH-6);
    ctx.lineTo(rx,ry+6);
    ctx.quadraticCurveTo(rx,ry,rx+6,ry);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(r.name,r.x,r.y-3);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '7px sans-serif';
    ctx.fillText(r.reign,r.x,r.y+9);

    var pwBar = (r.power/100)*nodeW*0.8;
    ctx.fillStyle = r.power>80?'#ffd700':r.power>60?'#45e980':'#4590e9';
    ctx.globalAlpha = 0.4;
    ctx.fillRect(r.x-nodeW*0.4, r.y+nodeH/2-4, pwBar, 3);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('고려 왕조 초기 10대 왕 계보  |  연결선: 부자/계승 관계  |  바: 왕권 강도',W/2,H-12);
}

// ===== SECTION 6: 도시 계절 경제 순환 =====
function renderSeasonalEconomy(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e9e045'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 계절 경제 순환',W/2,25);

  var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  var metrics = [
    {name:'농업 수익',data:[15,20,45,65,80,90,95,85,70,55,30,18],color:'#45e980'},
    {name:'교역량',data:[40,35,50,60,65,55,45,50,70,80,75,55],color:'#4590e9'},
    {name:'세금 수입',data:[60,55,58,65,70,68,62,60,72,78,80,70],color:'#e9a045'},
    {name:'건설 활동',data:[10,15,40,70,85,90,88,82,65,45,20,8],color:'#c045e9'},
    {name:'군사 지출',data:[50,45,48,55,52,60,65,70,68,55,50,48],color:'#e94560'}
  ];

  var chartX = 65, chartY = 55, chartW = W-90, chartH = 260;

  ctx.strokeStyle = V24_COLORS.grid; ctx.lineWidth = 0.5;
  for(var g=0;g<=5;g++){
    var gy = chartY + chartH - (g/5)*chartH;
    ctx.beginPath(); ctx.moveTo(chartX,gy); ctx.lineTo(chartX+chartW,gy); ctx.stroke();
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText((g*20)+'',chartX-4,gy+3);
  }

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
  for(var m=0;m<12;m++){
    var mx = chartX + (m/11)*chartW;
    ctx.fillText(months[m],mx,chartY+chartH+14);

    var season = m<2||m===11?'#4590e9':m<5?'#90e945':m<8?'#e94560':'#e9a045';
    ctx.fillStyle = season; ctx.globalAlpha = 0.08;
    var sw = chartW/12;
    ctx.fillRect(chartX+m*sw, chartY, sw, chartH);
    ctx.globalAlpha = 1;
    ctx.fillStyle = V24_COLORS.dim;
  }

  ctx.font = '8px sans-serif';
  var seasonLabels = [{text:'겨울',x:chartX+chartW*0.04},{text:'봄',x:chartX+chartW*0.25},
                      {text:'여름',x:chartX+chartW*0.54},{text:'가을',x:chartX+chartW*0.79}];
  for(var s=0;s<seasonLabels.length;s++){
    ctx.fillStyle = V24_COLORS.dim; ctx.textAlign = 'center';
    ctx.fillText(seasonLabels[s].text,seasonLabels[s].x,chartY-5);
  }

  for(var mi=0;mi<metrics.length;mi++){
    var met = metrics[mi];
    ctx.beginPath();
    ctx.strokeStyle = met.color; ctx.lineWidth = 2;
    for(var m=0;m<12;m++){
      var mx = chartX + (m/11)*chartW;
      var my = chartY + chartH - (met.data[m]/100)*chartH;
      if(m===0) ctx.moveTo(mx,my); else ctx.lineTo(mx,my);
    }
    ctx.stroke();

    ctx.beginPath();
    for(var m=0;m<12;m++){
      var mx = chartX + (m/11)*chartW;
      var my = chartY + chartH - (met.data[m]/100)*chartH;
      if(m===0){ ctx.moveTo(mx,my); } else { ctx.lineTo(mx,my); }
    }
    ctx.lineTo(chartX+chartW,chartY+chartH);
    ctx.lineTo(chartX,chartY+chartH);
    ctx.closePath();
    ctx.fillStyle = met.color; ctx.globalAlpha = 0.08; ctx.fill();
    ctx.globalAlpha = 1;

    for(var m=0;m<12;m++){
      var mx = chartX + (m/11)*chartW;
      var my = chartY + chartH - (met.data[m]/100)*chartH;
      ctx.beginPath(); ctx.arc(mx,my,2.5,0,Math.PI*2);
      ctx.fillStyle = met.color; ctx.fill();
    }
  }

  var legendY = H-30;
  var legendStartX = W/2 - (metrics.length*70)/2;
  for(var mi=0;mi<metrics.length;mi++){
    var lx = legendStartX + mi*72;
    ctx.fillStyle = metrics[mi].color;
    ctx.fillRect(lx,legendY,12,8);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(metrics[mi].name,lx+15,legendY+7);
  }

  var avgRevenue = Math.round(metrics[0].data.reduce(function(s,v){return s+v;},0)/12);
  ctx.fillStyle = '#e9e045'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('연평균 농업수익: '+avgRevenue+'  |  최고: 9월(추수)  |  최저: 1월(동절기)',W/2,H-10);
}

// ===== SECTION 7: 고대 건축 양식 비교기 =====
function renderArchitecture(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#c045e9'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('고대 건축 양식 비교기',W/2,25);

  var styles = [
    {name:'초가집',durability:25,beauty:30,cost:15,tech:20,capacity:35,era:'삼한'},
    {name:'귀틀집',durability:40,beauty:45,cost:30,tech:35,capacity:40,era:'삼국'},
    {name:'기와집',durability:70,beauty:75,cost:65,tech:60,capacity:55,era:'통일신라'},
    {name:'한옥(양반)',durability:80,beauty:90,cost:80,tech:75,capacity:65,era:'조선'},
    {name:'궁궐',durability:95,beauty:98,cost:98,tech:92,capacity:90,era:'고려~조선'},
    {name:'성곽',durability:98,beauty:60,cost:90,tech:85,capacity:30,era:'삼국~조선'},
    {name:'사찰',durability:85,beauty:92,cost:85,tech:88,capacity:45,era:'삼국~조선'},
    {name:'관아',durability:75,beauty:65,cost:70,tech:68,capacity:70,era:'고려~조선'}
  ];

  var barW = 55, gap = 8;
  var totalBarW = styles.length*barW + (styles.length-1)*gap;
  var startX = (W-totalBarW)/2;
  var chartBottom = H-60, chartTop = 55, chartH = chartBottom-chartTop;

  var axes5 = ['내구성','미관','비용','기술','수용력'];
  var axisColors = ['#e94560','#4590e9','#e9a045','#45e980','#c045e9'];

  for(var g=0;g<=5;g++){
    var gy = chartBottom - (g/5)*chartH;
    ctx.strokeStyle = V24_COLORS.grid; ctx.lineWidth = 0.3;
    ctx.beginPath(); ctx.moveTo(startX-5,gy); ctx.lineTo(startX+totalBarW+5,gy); ctx.stroke();
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '7px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText((g*20)+'',startX-8,gy+3);
  }

  for(var i=0;i<styles.length;i++){
    var s = styles[i];
    var bx = startX + i*(barW+gap);
    var vals = [s.durability,s.beauty,s.cost,s.tech,s.capacity];
    var subW = barW/5;

    for(var v=0;v<5;v++){
      var bh = (vals[v]/100)*chartH;
      ctx.fillStyle = axisColors[v];
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bx+v*subW, chartBottom-bh, subW-1, bh);
    }
    ctx.globalAlpha = 1;

    var avg = Math.round((s.durability+s.beauty+s.cost+s.tech+s.capacity)/5);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(avg,bx+barW/2,chartTop-5);

    ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif';
    ctx.save(); ctx.translate(bx+barW/2,chartBottom+10); ctx.rotate(0);
    ctx.fillText(s.name,0,0);
    ctx.restore();

    ctx.fillStyle = V24_COLORS.dim; ctx.font = '6px sans-serif';
    ctx.fillText(s.era,bx+barW/2,chartBottom+22);
  }

  var legendY = H-35;
  var legendStartX = W/2 - (5*65)/2;
  for(var v=0;v<5;v++){
    var lx = legendStartX + v*65;
    ctx.fillStyle = axisColors[v];
    ctx.fillRect(lx,legendY,10,7);
    ctx.fillStyle = V24_COLORS.dim; ctx.font = '8px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(axes5[v],lx+13,legendY+7);
  }

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('8종 건축양식 5축(내구성/미관/비용/기술/수용력) 스택바 비교',W/2,H-10);
}

// ===== SECTION 8: 도시 종합 발전 보고서 =====
function renderDevReport(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V24_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#4545e9'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 종합 발전 보고서',W/2,25);

  var categories = [
    {name:'경제',current:72,target:85,prev:65,icon:'💰'},
    {name:'군사',current:78,target:90,prev:70,icon:'⚔️'},
    {name:'문화',current:85,target:92,prev:80,icon:'🎭'},
    {name:'외교',current:65,target:80,prev:58,icon:'🤝'},
    {name:'인구',current:70,target:82,prev:62,icon:'👥'},
    {name:'기술',current:68,target:88,prev:55,icon:'⚙️'},
    {name:'복지',current:62,target:78,prev:50,icon:'🏠'},
    {name:'인프라',current:75,target:85,prev:68,icon:'🏗️'}
  ];

  var barH = 32, gap = 8;
  var startY = 50, startX = 80, barArea = W - startX - 60;

  for(var i=0;i<categories.length;i++){
    var y = startY + i*(barH+gap);
    var c = categories[i];

    ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(c.icon, 22, y+20);

    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(c.name, startX-6, y+14);

    var curW = (c.current/100)*barArea;
    var targW = (c.target/100)*barArea;
    var prevW = (c.prev/100)*barArea;

    ctx.fillStyle = V24_COLORS.grid; ctx.globalAlpha = 0.3;
    ctx.fillRect(startX, y, barArea, barH);
    ctx.globalAlpha = 1;

    ctx.setLineDash([4,3]);
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(startX+targW,y); ctx.lineTo(startX+targW,y+barH); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = V24_COLORS.bars[i]; ctx.globalAlpha = 0.3;
    ctx.fillRect(startX, y, prevW, barH);
    ctx.globalAlpha = 0.8;
    ctx.fillRect(startX, y, curW, barH);
    ctx.globalAlpha = 1;

    var diff = c.current - c.prev;
    var diffColor = diff>0?'#45e980':'#e94560';
    ctx.fillStyle = diffColor; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText((diff>0?'+':'')+diff,startX+curW+4,y+13);

    ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif';
    ctx.fillText(c.current+'/'+c.target,startX+curW+4,y+24);

    var pct = Math.round((c.current/c.target)*100);
    var pctColor = pct>90?'#45e980':pct>70?'#e9a045':'#e94560';
    ctx.fillStyle = pctColor; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(pct+'%',W-15,y+18);
  }

  var overallCur = Math.round(categories.reduce(function(s,c){return s+c.current;},0)/categories.length);
  var overallTarg = Math.round(categories.reduce(function(s,c){return s+c.target;},0)/categories.length);
  var overallGrowth = Math.round(categories.reduce(function(s,c){return s+(c.current-c.prev);},0)/categories.length);
  var grade = overallCur>80?'S':overallCur>70?'A':overallCur>60?'B':overallCur>45?'C':'D';

  ctx.fillStyle = '#4545e9'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('종합: '+overallCur+'/'+overallTarg+'  |  성장: +'+overallGrowth+'  |  등급: '+grade,W/2,H-30);

  ctx.fillStyle = V24_COLORS.dim; ctx.font = '9px sans-serif';
  ctx.fillText('━━ 전기 실적 (반투명)  ━━ 현재 실적 (진한)  ┊ 목표선 (금색 점선)',W/2,H-12);
}

// ===== QUIZ SYSTEM (15 questions) =====
var V24_QUIZ = [
  {q:'조선시대 과거제에서 문과 대과의 합격률은 약 몇 %였나?',a:['약 3%','약 15%','약 30%','약 50%'],c:0},
  {q:'고려 태조 왕건이 건국한 해는?',a:['918년','935년','956년','900년'],c:0},
  {q:'조선시대 한양의 4대문이 아닌 것은?',a:['광화문','숭례문','흥인지문','돈의문'],c:0},
  {q:'SimCity에서 도시 행복도에 가장 큰 영향을 주는 요소는?',a:['공공서비스 접근성','건물 밀도','도로 연결','세금율'],c:0},
  {q:'고려시대 최고 교육기관은?',a:['국자감','성균관','향교','서당'],c:0},
  {q:'조선시대 봉수 제도에서 평상시 올리는 봉수 횃불 수는?',a:['1개','2개','3개','5개'],c:0},
  {q:'TheoTown에서 도시 인구 성장의 핵심 요소는?',a:['주거 수요 충족','군사력 강화','종교 시설','광업 개발'],c:0},
  {q:'고대 한국의 주요 관개 시설인 벽골제가 위치한 곳은?',a:['김제','공주','경주','평양'],c:0},
  {q:'조선시대 수공업에서 관청 수공업과 민간 수공업 중 먼저 발달한 것은?',a:['관청 수공업','민간 수공업','동시 발달','해당없음'],c:0},
  {q:'SimCity에서 도시 예산 적자 시 가장 먼저 해야 할 것은?',a:['세금 조정','도로 삭제','건물 철거','게임 재시작'],c:0},
  {q:'고려시대 봉수대 네트워크의 최종 도착지는?',a:['개성(송악산)','한양(남산)','평양','경주'],c:0},
  {q:'한옥 건축에서 온돌의 열효율이 가장 높은 구조는?',a:['ㄱ자형','ㅁ자형','一자형','ㄴ자형'],c:0},
  {q:'조선시대 세금 중 토지에 부과한 세금은?',a:['전세','공납','역','환곡'],c:0},
  {q:'TheoTown에서 재해 발생 시 복구 속도에 영향을 주는 것은?',a:['소방서 배치','경찰서 수','도로 길이','학교 수'],c:0},
  {q:'고대 도시에서 성곽의 주요 목적이 아닌 것은?',a:['미관 향상','방어','행정 경계','교역 관리'],c:0}
];

// ===== ACHIEVEMENTS =====
var V24_ACHIEVEMENTS = [
  {id:'v24_diplo',name:'외교관',desc:'외교 동맹 분석기를 열람했다',icon:'🤝'},
  {id:'v24_migration',name:'인구학자',desc:'인구 이동 추적기를 분석했다',icon:'📊'},
  {id:'v24_industry',name:'산업 감독관',desc:'산업 생산성 지표를 확인했다',icon:'⚙️'},
  {id:'v24_happy',name:'행복 관리자',desc:'행복 지수 대시보드를 확인했다',icon:'😊'},
  {id:'v24_genealogy',name:'왕실 사관',desc:'왕실 계보 가계도를 열람했다',icon:'👑'},
  {id:'v24_economy',name:'경제 고문',desc:'계절 경제 순환을 분석했다',icon:'💹'},
  {id:'v24_architect',name:'건축 감정사',desc:'건축 양식 비교기를 확인했다',icon:'🏛️'},
  {id:'v24_reporter',name:'발전 보고관',desc:'종합 발전 보고서를 작성했다',icon:'📋'},
  {id:'v24_quiz3',name:'행정 수습생',desc:'퀴즈 3문제를 맞혔다',icon:'📝'},
  {id:'v24_quiz7',name:'행정 실무관',desc:'퀴즈 7문제를 맞혔다',icon:'🎓'},
  {id:'v24_quiz12',name:'행정 총괄관',desc:'퀴즈 12문제를 맞혔다',icon:'🏆'},
  {id:'v24_allsect',name:'도시 총독',desc:'8개 섹션을 모두 열람했다',icon:'🌟'}
];

function markSection(idx){
  if(idx>=0 && idx<8){
    v24State.sectionViewed[idx] = true;
    var achIds = ['v24_diplo','v24_migration','v24_industry','v24_happy','v24_genealogy','v24_economy','v24_architect','v24_reporter'];
    unlockAchievement(achIds[idx]);
    if(v24State.sectionViewed.every(function(v){return v;})){
      unlockAchievement('v24_allsect');
    }
  }
}

function unlockAchievement(id){
  if(v24State.achievements.indexOf(id)>=0) return;
  v24State.achievements.push(id);
  var ach = V24_ACHIEVEMENTS.filter(function(a){return a.id===id;})[0];
  if(!ach) return;
  v24sfx('achieve');
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = ach.icon+' 업적 해제: '+ach.name;
  document.body.appendChild(toast);
  setTimeout(function(){if(toast.parentNode) toast.parentNode.removeChild(toast);},2500);
}

// ===== PANEL SYSTEM =====
function renderCurrentSection(){
  var panel = document.getElementById('v24-panel');
  if(!panel) return;
  var content = panel.querySelector('.v24-content');
  if(!content) return;
  content.innerHTML = '';

  var idx = v24State.currentSection;
  if(idx===8){
    renderQuiz();
    return;
  }

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;margin:0 auto;max-width:100%;height:auto;';
  content.appendChild(canvas);

  var renderers = [renderDiplomacy,renderMigration,renderIndustry,renderHappiness,
                   renderGenealogy,renderSeasonalEconomy,renderArchitecture,renderDevReport];
  if(renderers[idx]){
    renderers[idx](canvas);
    markSection(idx);
  }
}

function renderQuiz(){
  var panel = document.getElementById('v24-panel');
  if(!panel) return;
  var content = panel.querySelector('.v24-content');
  if(!content) return;
  content.innerHTML = '';

  var qIdx = v24State.quizIdx % V24_QUIZ.length;
  var q = V24_QUIZ[qIdx];

  var div = document.createElement('div');
  div.style.cssText = 'padding:12px;color:#eee;font-size:14px;';

  var title = document.createElement('div');
  title.style.cssText = 'color:#ffd700;font-weight:bold;font-size:15px;margin-bottom:8px;';
  title.textContent = 'Q'+(qIdx+1)+'/'+V24_QUIZ.length+' (맞힌 수: '+v24State.quizScore+')';
  div.appendChild(title);

  var qText = document.createElement('div');
  qText.style.cssText = 'margin-bottom:12px;line-height:1.6;';
  qText.textContent = q.q;
  div.appendChild(qText);

  for(var i=0;i<q.a.length;i++){
    (function(ansIdx){
      var btn = document.createElement('button');
      btn.style.cssText = 'display:block;width:100%;padding:8px 12px;margin:4px 0;background:#16213e;color:#eee;border:1px solid #444;border-radius:8px;cursor:pointer;font-size:13px;text-align:left;';
      btn.textContent = (ansIdx+1)+'. '+q.a[ansIdx];
      btn.onmouseenter = function(){this.style.borderColor='#ffd700';};
      btn.onmouseleave = function(){this.style.borderColor='#444';};
      btn.onclick = function(){
        var correct = ansIdx === q.c;
        if(correct){
          v24State.quizScore++;
          v24sfx('quiz_correct');
          btn.style.background = '#1a3a1a'; btn.style.borderColor = '#45e980';
          if(v24State.quizScore>=3) unlockAchievement('v24_quiz3');
          if(v24State.quizScore>=7) unlockAchievement('v24_quiz7');
          if(v24State.quizScore>=12) unlockAchievement('v24_quiz12');
        } else {
          v24sfx('quiz_wrong');
          btn.style.background = '#3a1a1a'; btn.style.borderColor = '#e94560';
        }
        v24State.quizTotal++;
        setTimeout(function(){
          v24State.quizIdx++;
          renderQuiz();
        },1200);
      };
      div.appendChild(btn);
    })(i);
  }
  content.appendChild(div);
}

function createV24Panel(){
  if(document.getElementById('v24-panel')) return;

  var panel = document.createElement('div');
  panel.id = 'v24-panel';
  panel.style.cssText = 'position:fixed;top:90px;right:10px;width:340px;max-height:calc(100vh - 100px);background:rgba(22,33,62,0.97);border:2px solid #4545e9;border-radius:12px;z-index:5000;display:none;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.6);';

  var header = document.createElement('div');
  header.style.cssText = 'padding:8px 10px;background:linear-gradient(135deg,#0f3460,#16213e);display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #4545e9;';

  var titleEl = document.createElement('span');
  titleEl.style.cssText = 'color:#4545e9;font-weight:bold;font-size:13px;';
  titleEl.textContent = 'v24 도시 전략 센터';
  header.appendChild(titleEl);

  var closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'background:none;border:none;color:#e94560;font-size:16px;cursor:pointer;';
  closeBtn.onclick = function(){panel.style.display='none';};
  header.appendChild(closeBtn);
  panel.appendChild(header);

  var tabs = document.createElement('div');
  tabs.style.cssText = 'display:flex;flex-wrap:wrap;gap:2px;padding:4px;background:rgba(0,0,0,0.3);';

  var tabNames = ['🤝외교','📊인구','⚙️산업','😊행복','👑계보','💹경제','🏛️건축','📋보고','❓퀴즈'];
  for(var i=0;i<tabNames.length;i++){
    (function(idx){
      var tab = document.createElement('button');
      tab.style.cssText = 'flex:1;min-width:50px;padding:4px 2px;background:'+(idx===v24State.currentSection?'#4545e9':'#1a1a2e')+';color:#eee;border:1px solid '+(idx===v24State.currentSection?'#6565ff':'#333')+';border-radius:6px;cursor:pointer;font-size:10px;';
      tab.textContent = tabNames[idx];
      tab.onclick = function(){
        v24State.currentSection = idx;
        v24sfx('nav');
        if(idx<8) markSection(idx);
        document.getElementById('v24-panel').remove();
        createV24Panel();
        var p = document.getElementById('v24-panel');
        if(p) p.style.display='block';
        renderCurrentSection();
      };
      tabs.appendChild(tab);
    })(i);
  }
  panel.appendChild(tabs);

  var content = document.createElement('div');
  content.className = 'v24-content';
  content.style.cssText = 'overflow-y:auto;max-height:calc(100vh - 200px);';
  panel.appendChild(content);

  document.body.appendChild(panel);
  renderCurrentSection();
}

function addV24Button(){
  var existing = document.getElementById('v24-main-btn');
  if(existing) return;
  var btn = document.createElement('button');
  btn.id = 'v24-main-btn';
  btn.textContent = 'v24';
  btn.title = 'v24 도시 전략 센터';
  btn.style.cssText = 'position:fixed;top:50px;right:386px;z-index:4000;background:#4545e9;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font:bold 11px sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
  btn.onmouseenter = function(){this.style.background='#6565ff';};
  btn.onmouseleave = function(){this.style.background='#4545e9';};
  btn.onclick = function(){
    v24sfx('panel_open');
    createV24Panel();
    var panel = document.getElementById('v24-panel');
    if(panel) panel.style.display = panel.style.display==='none'?'block':'none';
  };
  document.body.appendChild(btn);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  if(!e.shiftKey) return;
  var panel = document.getElementById('v24-panel');
  if(!panel || panel.style.display==='none'){
    if(e.key==='Z'||e.key==='z'){
      e.preventDefault();
      var btn = document.getElementById('v24-main-btn');
      if(btn) btn.click();
    }
    return;
  }
  var keyMap = {
    'X':0,'x':0,'C':1,'c':1,'V':2,'v':2,'B':3,'b':3,
    'N':4,'n':4,'M':5,'m':5,',':6,'<':6,'.':7,'>':7,'/':8,'?':8
  };
  var idx = keyMap[e.key];
  if(idx!==undefined){
    e.preventDefault();
    v24State.currentSection = idx;
    v24sfx('nav');
    if(idx<8) markSection(idx);
    renderCurrentSection();
  }
});

// ===== INIT =====
function initV24(){
  addV24Button();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initV24);
} else {
  initV24();
}

})();
