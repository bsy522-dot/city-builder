(function(){
'use strict';

// ===== v25 city-builder patch: 8 Canvas features =====
// 1. 왕실 세금 정책 최적화기 (Royal Tax Policy Optimizer)
// 2. 고대 군사 진형 시뮬레이터 (Military Formation Simulator)
// 3. 도시 무역 수지 분석기 (Trade Balance Analyzer)
// 4. 왕실 문화재 가치 매트릭스 (Cultural Heritage Value Matrix)
// 5. 도시 치안 범죄 분석도 (Urban Security Crime Map)
// 6. 고대 천문 관측 기록관 (Astronomy Observatory)
// 7. 왕실 연회 외교 시뮬레이터 (Royal Banquet Diplomacy)
// 8. 도시 종합 경쟁력 지수 (City Competitiveness Index)

var V25_SFX_CTX = null;
function v25sfx(type){
  try {
    if(!V25_SFX_CTX) V25_SFX_CTX = new (window.AudioContext||window.webkitAudioContext)();
    var c = V25_SFX_CTX, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    var freqs = {
      nav:[440,0.08],tax_collect:[523,0.14],tax_reform:[392,0.12],
      military_charge:[659,0.16],military_defend:[349,0.12],
      trade_profit:[587,0.14],trade_loss:[294,0.10],
      heritage_discover:[698,0.18],heritage_restore:[523,0.14],
      security_alert:[880,0.10],security_patrol:[440,0.12],
      astro_observe:[494,0.16],astro_discover:[784,0.20],
      banquet_toast:[659,0.14],banquet_diplomacy:[523,0.12],
      compete_rank:[587,0.12],compete_champion:[880,0.20],
      quiz_correct:[659,0.12],quiz_wrong:[262,0.10],
      achieve:[784,0.18],panel_open:[440,0.06],section_flip:[494,0.08]
    };
    var f = freqs[type]||[440,0.1];
    o.frequency.setValueAtTime(f[0],t);
    o.type = type==='military_charge'?'sawtooth':type==='security_alert'?'square':type==='astro_discover'?'triangle':'sine';
    g.gain.setValueAtTime(0.15,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+f[1]);
    o.start(t); o.stop(t+f[1]+0.05);
  } catch(e){}
}

var V25_COLORS = {
  bg:'#0d1117',panel:'#161b22',accent:'#238636',highlight:'#f78166',
  text:'#e6edf3',dim:'#8b949e',grid:'#30363d',
  bars:['#238636','#f78166','#58a6ff','#d2a8ff','#7ee787','#f0883e','#79c0ff','#ff7b72',
        '#3fb950','#bc8cff','#ffa657','#56d4dd']
};

var v25State = {currentSection:0, quizIdx:0, quizScore:0, quizTotal:0, achievements:[],
  sectionViewed:[false,false,false,false,false,false,false,false],
  taxIdx:0, formationIdx:0, tradeIdx:0, heritageHover:-1, crimeIdx:0, astroSeason:0,
  banquetIdx:0, competeIdx:0};

// ===== HELPER: draw 6-axis radar =====
function drawRadar6(ctx,cx,cy,maxR,values,labels,color,fillAlpha){
  for(var ring=1;ring<=5;ring++){
    var r=maxR*(ring/5);
    ctx.beginPath();
    for(var a=0;a<6;a++){
      var ang=(a/6)*Math.PI*2-Math.PI/2;
      var px=cx+Math.cos(ang)*r,py=cy+Math.sin(ang)*r;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=0.5; ctx.stroke();
  }
  for(var a=0;a<6;a++){
    var ang=(a/6)*Math.PI*2-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*maxR,cy+Math.sin(ang)*maxR);
    ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=0.5; ctx.stroke();
    var lx=cx+Math.cos(ang)*(maxR+16),ly=cy+Math.sin(ang)*(maxR+16);
    ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(labels[a],lx,ly+3);
  }
  ctx.beginPath();
  for(var a=0;a<6;a++){
    var ang=(a/6)*Math.PI*2-Math.PI/2;
    var vr=(values[a]/100)*maxR;
    var px=cx+Math.cos(ang)*vr,py=cy+Math.sin(ang)*vr;
    if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
  }
  ctx.closePath();
  ctx.fillStyle=color; ctx.globalAlpha=fillAlpha||0.25; ctx.fill();
  ctx.globalAlpha=1; ctx.strokeStyle=color; ctx.lineWidth=2; ctx.stroke();
  for(var a=0;a<6;a++){
    var ang=(a/6)*Math.PI*2-Math.PI/2;
    var vr=(values[a]/100)*maxR;
    ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*vr,cy+Math.sin(ang)*vr,3,0,Math.PI*2);
    ctx.fillStyle=color; ctx.fill();
  }
}

function gradeFor(score){ return score>=85?'S':score>=70?'A':score>=55?'B':score>=40?'C':'D'; }
function gradeColor(g){ return g==='S'?'#ffd700':g==='A'?'#7ee787':g==='B'?'#58a6ff':g==='C'?'#f0883e':'#ff7b72'; }

// ===== SECTION 1: 왕실 세금 정책 최적화기 =====
function renderTaxOptimizer(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#7ee787'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('왕실 세금 정책 최적화기',W/2,25);

  var sources=[
    {name:'토지세',income:88,fairness:72,morale:60,efficiency:80,sustain:85,growth:65},
    {name:'인두세',income:70,fairness:35,morale:30,efficiency:90,sustain:50,growth:40},
    {name:'상업세',income:82,fairness:68,morale:55,efficiency:75,sustain:78,growth:88},
    {name:'관세',income:75,fairness:70,morale:65,efficiency:60,sustain:70,growth:82},
    {name:'공물',income:60,fairness:45,morale:40,efficiency:55,sustain:45,growth:35},
    {name:'어업세',income:45,fairness:75,morale:70,efficiency:50,sustain:80,growth:55},
    {name:'광업세',income:55,fairness:65,morale:60,efficiency:68,sustain:40,growth:72},
    {name:'특별세',income:92,fairness:30,morale:25,efficiency:85,sustain:35,growth:50}
  ];

  var sel=v25State.taxIdx%sources.length;
  var s=sources[sel];
  var vals=[s.income,s.fairness,s.morale,s.efficiency,s.sustain,s.growth];
  var labels=['수입','공정','민심','효율','지속','성장'];

  drawRadar6(ctx,W/2-80,H/2+15,120,vals,labels,V25_COLORS.bars[sel],0.25);

  var avg=Math.round((s.income+s.fairness+s.morale+s.efficiency+s.sustain+s.growth)/6);
  var grade=gradeFor(avg);

  // Horizontal bars on right side
  var bx=W/2+80,by=70,bw=150,bh=14,bgap=8;
  var axNames=['수입','공정','민심','효율','지속','성장'];
  for(var i=0;i<6;i++){
    var yy=by+i*(bh+bgap);
    ctx.fillStyle=V25_COLORS.grid; ctx.fillRect(bx,yy,bw,bh);
    ctx.fillStyle=V25_COLORS.bars[i]; ctx.globalAlpha=0.8;
    ctx.fillRect(bx,yy,(vals[i]/100)*bw,bh);
    ctx.globalAlpha=1;
    ctx.fillStyle=V25_COLORS.text; ctx.font='9px sans-serif'; ctx.textAlign='right';
    ctx.fillText(axNames[i],bx-4,yy+11);
    ctx.textAlign='left'; ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif';
    ctx.fillText(vals[i],bx+bw+4,yy+11);
  }

  ctx.fillStyle='#fff'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(s.name,W/2-80,45);

  ctx.fillStyle=gradeColor(grade); ctx.font='bold 12px sans-serif';
  ctx.fillText('종합 등급: '+grade+' ('+avg+'점)',W/2,H-30);

  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif';
  var nameList=sources.map(function(src,i){return i===sel?'['+src.name+']':src.name;}).join(' ');
  ctx.fillText(nameList,W/2,H-12);

  canvas.onclick=function(e){
    v25State.taxIdx=(v25State.taxIdx+1)%sources.length;
    v25sfx('tax_collect');
    renderTaxOptimizer(canvas);
  };
}

// ===== SECTION 2: 고대 군사 진형 시뮬레이터 =====
function renderFormation(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#ff7b72'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('고대 군사 진형 시뮬레이터',W/2,25);

  var formations=[
    {name:'학익진',attack:75,defense:85,mobility:60,morale:80,adapt:70,terrain:75,desc:'학의 날개 형태로 펼치는 포위진'},
    {name:'어린진',attack:90,defense:55,mobility:85,morale:70,adapt:80,terrain:60,desc:'비늑 무리처럼 빠르게 공격하는 진형'},
    {name:'봉시진',attack:85,defense:65,mobility:70,morale:85,adapt:65,terrain:55,desc:'봉황 시의 형태로 돌파하는 진형'},
    {name:'장사진',attack:65,defense:90,mobility:50,morale:75,adapt:85,terrain:80,desc:'긴 뱀 형태의 방어 중심 진형'},
    {name:'방원진',attack:70,defense:95,mobility:40,morale:90,adapt:75,terrain:70,desc:'원형 방어로 사방을 방비하는 진형'},
    {name:'예봉진',attack:95,defense:45,mobility:90,morale:65,adapt:60,terrain:50,desc:'뾰족한 봉우리처럼 돌파하는 공격진'}
  ];

  var sel=v25State.formationIdx%formations.length;
  var f=formations[sel];
  var vals=[f.attack,f.defense,f.mobility,f.morale,f.adapt,f.terrain];
  var labels=['공격','방어','기동','사기','적응','지형'];

  drawRadar6(ctx,W/2,H/2+5,120,vals,labels,V25_COLORS.bars[sel],0.25);

  // Horizontal effectiveness bars below
  var barY=H-90,barX=60,barW=W-120;
  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
  ctx.fillText('전투 효율:',barX,barY-5);
  var axArr=['공격','방어','기동','사기','적응','지형'];
  for(var i=0;i<6;i++){
    var bxp=barX+i*(barW/6);
    ctx.fillStyle=V25_COLORS.grid; ctx.fillRect(bxp,barY,barW/6-4,12);
    ctx.fillStyle=V25_COLORS.bars[i]; ctx.globalAlpha=0.8;
    ctx.fillRect(bxp,barY,(vals[i]/100)*(barW/6-4),12);
    ctx.globalAlpha=1;
    ctx.fillStyle=V25_COLORS.dim; ctx.font='7px sans-serif'; ctx.textAlign='center';
    ctx.fillText(axArr[i],bxp+(barW/6-4)/2,barY+22);
  }

  ctx.fillStyle='#fff'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(f.name,W/2,48);
  ctx.fillStyle=V25_COLORS.dim; ctx.font='10px sans-serif';
  ctx.fillText(f.desc,W/2,63);

  var avg=Math.round((f.attack+f.defense+f.mobility+f.morale+f.adapt+f.terrain)/6);
  var grade=gradeFor(avg);
  ctx.fillStyle=gradeColor(grade); ctx.font='bold 12px sans-serif';
  ctx.fillText('전투력 등급: '+grade+' ('+avg+'점)',W/2,H-12);

  canvas.onclick=function(){
    v25State.formationIdx=(v25State.formationIdx+1)%formations.length;
    v25sfx('military_charge');
    renderFormation(canvas);
  };
}

// ===== SECTION 3: 도시 무역 수지 분석기 =====
function renderTradeBalance(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#58a6ff'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('도시 무역 수지 분석기',W/2,25);

  var goods=[
    {name:'곡물',exp:85,imp:40},{name:'철',exp:50,imp:72},
    {name:'비단',exp:90,imp:30},{name:'도자기',exp:95,imp:15},
    {name:'약재',exp:45,imp:68},{name:'목재',exp:60,imp:55},
    {name:'금',exp:30,imp:80},{name:'소금',exp:70,imp:42}
  ];

  var chartX=70,chartY=55,chartW=W-110,chartH=260;
  var barGroupW=chartW/goods.length;
  var barW=(barGroupW-12)/2;

  // Grid lines
  for(var g=0;g<=5;g++){
    var gy=chartY+chartH-(g/5)*chartH;
    ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(chartX,gy); ctx.lineTo(chartX+chartW,gy); ctx.stroke();
    ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif'; ctx.textAlign='right';
    ctx.fillText((g*20)+'',chartX-4,gy+3);
  }

  // Net balance line points
  var netPoints=[];
  for(var i=0;i<goods.length;i++){
    var g=goods[i];
    var gx=chartX+i*barGroupW+barGroupW/2;

    // Export bar
    var expH=(g.exp/100)*chartH;
    ctx.fillStyle='#7ee787'; ctx.globalAlpha=0.8;
    ctx.fillRect(gx-barW-1,chartY+chartH-expH,barW,expH);

    // Import bar
    var impH=(g.imp/100)*chartH;
    ctx.fillStyle='#ff7b72'; ctx.globalAlpha=0.8;
    ctx.fillRect(gx+1,chartY+chartH-impH,barW,impH);
    ctx.globalAlpha=1;

    // Surplus/deficit indicator
    var net=g.exp-g.imp;
    var netColor=net>0?'#7ee787':'#ff7b72';
    ctx.fillStyle=netColor; ctx.font='bold 8px sans-serif'; ctx.textAlign='center';
    ctx.fillText((net>0?'+':'')+net,gx,chartY+chartH-(Math.max(g.exp,g.imp)/100)*chartH-6);

    netPoints.push({x:gx,y:chartY+chartH-((net+100)/200)*chartH});

    // Label
    ctx.fillStyle=V25_COLORS.text; ctx.font='9px sans-serif';
    ctx.fillText(g.name,gx,chartY+chartH+14);
  }

  // Net balance line
  ctx.beginPath(); ctx.strokeStyle='#ffa657'; ctx.lineWidth=2;
  for(var i=0;i<netPoints.length;i++){
    if(i===0) ctx.moveTo(netPoints[i].x,netPoints[i].y);
    else ctx.lineTo(netPoints[i].x,netPoints[i].y);
  }
  ctx.stroke();
  for(var i=0;i<netPoints.length;i++){
    ctx.beginPath(); ctx.arc(netPoints[i].x,netPoints[i].y,3,0,Math.PI*2);
    ctx.fillStyle='#ffa657'; ctx.fill();
  }

  // Legend
  ctx.fillStyle='#7ee787'; ctx.fillRect(chartX,H-32,12,8);
  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='left';
  ctx.fillText('수출',chartX+16,H-25);
  ctx.fillStyle='#ff7b72'; ctx.fillRect(chartX+60,H-32,12,8);
  ctx.fillText('수입',chartX+76,H-25);
  ctx.fillStyle='#ffa657'; ctx.fillRect(chartX+120,H-32,12,8);
  ctx.fillText('순수지',chartX+136,H-25);

  var totalExp=goods.reduce(function(s,g){return s+g.exp;},0);
  var totalImp=goods.reduce(function(s,g){return s+g.imp;},0);
  var totalNet=totalExp-totalImp;
  var grade=totalNet>200?'S':totalNet>100?'A':totalNet>0?'B':totalNet>-100?'C':'D';
  ctx.fillStyle=gradeColor(grade); ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
  ctx.fillText('총 수출: '+totalExp+'  총 수입: '+totalImp+'  순수지: '+(totalNet>0?'+':'')+totalNet+'  등급: '+grade,W/2,H-10);

  canvas.onclick=function(){
    v25sfx('trade_profit');
    renderTradeBalance(canvas);
  };
}

// ===== SECTION 4: 왕실 문화재 가치 매트릭스 =====
function renderHeritageMatrix(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#d2a8ff'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('왕실 문화재 가치 매트릭스',W/2,25);

  var artifacts=[
    {name:'고려청자',history:92,art:95,academic:78,conserve:70,rarity:85},
    {name:'백자',history:88,art:90,academic:75,conserve:72,rarity:80},
    {name:'금관',history:95,art:88,academic:82,conserve:60,rarity:95},
    {name:'첨성대',history:98,art:75,academic:95,conserve:85,rarity:92},
    {name:'석굴암',history:96,art:98,academic:90,conserve:80,rarity:90},
    {name:'팔만대장경',history:98,art:70,academic:98,conserve:75,rarity:98},
    {name:'무령왕릉',history:94,art:85,academic:88,conserve:65,rarity:88},
    {name:'훈민정음',history:99,art:80,academic:99,conserve:90,rarity:99},
    {name:'경주 첨성대',history:90,art:72,academic:85,conserve:82,rarity:78},
    {name:'직지심체요절',history:96,art:82,academic:96,conserve:55,rarity:97}
  ];

  var axes=['역사','예술','학술','보존','희소'];
  var cellW=48,cellH=28;
  var startX=120,startY=55;

  // Column headers
  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  for(var j=0;j<axes.length;j++){
    ctx.fillText(axes[j],startX+j*cellW+cellW/2,startY-6);
  }

  // Rows
  for(var i=0;i<artifacts.length;i++){
    var a=artifacts[i];
    var y=startY+i*cellH;
    ctx.fillStyle=V25_COLORS.text; ctx.font='9px sans-serif'; ctx.textAlign='right';
    ctx.fillText(a.name,startX-6,y+cellH/2+3);

    var vals=[a.history,a.art,a.academic,a.conserve,a.rarity];
    for(var j=0;j<5;j++){
      var x=startX+j*cellW;
      var v=vals[j];
      var intensity=v/100;
      var r=Math.round(35+intensity*200);
      var gv=Math.round(134-intensity*80);
      var b=Math.round(255-intensity*80);
      ctx.fillStyle='rgb('+r+','+gv+','+b+')';
      ctx.globalAlpha=0.7+intensity*0.3;
      ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
      ctx.globalAlpha=1;

      ctx.fillStyle=v>75?'#fff':'#ccc'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
      ctx.fillText(v,x+cellW/2,y+cellH/2+3);
    }

    // Row average
    var rowAvg=Math.round((a.history+a.art+a.academic+a.conserve+a.rarity)/5);
    var rGrade=gradeFor(rowAvg);
    ctx.fillStyle=gradeColor(rGrade); ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(rGrade+' '+rowAvg,startX+5*cellW+8,y+cellH/2+3);
  }

  // Grid lines
  ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=0.5;
  for(var i=0;i<=artifacts.length;i++){
    var y=startY+i*cellH;
    ctx.beginPath(); ctx.moveTo(startX,y); ctx.lineTo(startX+5*cellW,y); ctx.stroke();
  }
  for(var j=0;j<=5;j++){
    var x=startX+j*cellW;
    ctx.beginPath(); ctx.moveTo(x,startY); ctx.lineTo(x,startY+artifacts.length*cellH); ctx.stroke();
  }

  // Color scale legend
  ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif'; ctx.textAlign='center';
  ctx.fillText('낮음 ← 색상 강도 → 높음',W/2,H-12);

  canvas.onclick=function(){
    v25sfx('heritage_discover');
    renderHeritageMatrix(canvas);
  };
}

// ===== SECTION 5: 도시 치안 범죄 분석도 =====
function renderCrimeMap(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#f0883e'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('도시 치안 범죄 분석도',W/2,25);

  var districts=['왕궁','시장','주거지','변방','항구','군영','사찰가','농촌'];
  var crimes=['도적','사기','밀수','폭동','방화','반란'];
  var crimeData=[
    [10,5,3,2,1,1],[30,25,15,8,5,3],[25,20,10,12,8,4],[40,15,35,20,15,10],
    [20,30,40,5,3,2],[5,3,2,15,10,8],[15,10,5,3,2,1],[35,10,8,25,12,5]
  ];

  var cellW=60,cellH=30;
  var startX=80,startY=55;

  // Column headers
  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  for(var j=0;j<crimes.length;j++){
    ctx.fillText(crimes[j],startX+j*cellW+cellW/2,startY-6);
  }

  for(var i=0;i<districts.length;i++){
    var y=startY+i*cellH;
    ctx.fillStyle=V25_COLORS.text; ctx.font='9px sans-serif'; ctx.textAlign='right';
    ctx.fillText(districts[i],startX-6,y+cellH/2+3);

    for(var j=0;j<crimes.length;j++){
      var x=startX+j*cellW;
      var v=crimeData[i][j];
      var intensity=Math.min(v/45,1);
      var r=Math.round(13+intensity*230);
      var gv=Math.round(17-intensity*10);
      var b=Math.round(23-intensity*15);
      ctx.fillStyle='rgb('+r+','+gv+','+b+')';
      ctx.globalAlpha=0.5+intensity*0.5;
      ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
      ctx.globalAlpha=1;

      ctx.fillStyle=v>20?'#fff':'#aaa'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
      ctx.fillText(v,x+cellW/2,y+cellH/2+3);
    }

    // Row safety rating
    var rowSum=crimeData[i].reduce(function(s,v){return s+v;},0);
    var safety=Math.max(0,100-rowSum);
    var sGrade=gradeFor(safety);
    ctx.fillStyle=gradeColor(sGrade); ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(sGrade,startX+6*cellW+8,y+cellH/2+3);
  }

  // Patrol coverage gauge
  var gaugeX=W/2,gaugeY=H-55,gaugeR=25;
  var coverage=68;
  var startAng=Math.PI*0.8, endAng=Math.PI*2.2;
  var valAng=startAng+(coverage/100)*(endAng-startAng);
  ctx.beginPath(); ctx.arc(gaugeX,gaugeY,gaugeR,startAng,endAng);
  ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=6; ctx.lineCap='round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(gaugeX,gaugeY,gaugeR,startAng,valAng);
  ctx.strokeStyle=coverage>70?'#7ee787':'#f0883e'; ctx.lineWidth=6; ctx.lineCap='round'; ctx.stroke();
  ctx.fillStyle='#fff'; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
  ctx.fillText(coverage+'%',gaugeX,gaugeY+4);
  ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif';
  ctx.fillText('순찰 커버리지',gaugeX,gaugeY+gaugeR+12);

  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('셀 값 = 범죄 발생률  |  빨간색 = 위험  |  오른쪽: 안전 등급',W/2,H-10);

  canvas.onclick=function(){
    v25sfx('security_alert');
    renderCrimeMap(canvas);
  };
}

// ===== SECTION 6: 고대 천문 관측 기록관 =====
function renderAstronomy(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#79c0ff'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('고대 천문 관측 기록관',W/2,25);

  var constellations=[
    {name:'각',stars:4,ra:30,dec:70,observed:true,season:'봄'},
    {name:'항',stars:4,ra:60,dec:65,observed:true,season:'봄'},
    {name:'저',stars:4,ra:90,dec:55,observed:false,season:'봄'},
    {name:'방',stars:4,ra:120,dec:50,observed:true,season:'여름'},
    {name:'심',stars:3,ra:150,dec:60,observed:true,season:'여름'},
    {name:'미',stars:6,ra:180,dec:45,observed:false,season:'여름'},
    {name:'기',stars:4,ra:210,dec:55,observed:true,season:'가을'},
    {name:'두',stars:6,ra:240,dec:70,observed:true,season:'가을'},
    {name:'우',stars:6,ra:270,dec:60,observed:false,season:'가을'},
    {name:'여',stars:4,ra:300,dec:50,observed:true,season:'겨울'},
    {name:'허',stars:2,ra:330,dec:65,observed:true,season:'겨울'},
    {name:'위',stars:3,ra:355,dec:58,observed:false,season:'겨울'}
  ];

  var seasons=['봄','여름','가을','겨울'];
  var seasonRotation=v25State.astroSeason%4;
  var cx=W/2-50,cy=H/2+10,maxR=140;

  // Circular chart background
  ctx.beginPath(); ctx.arc(cx,cy,maxR+5,0,Math.PI*2);
  ctx.fillStyle='#0a0e14'; ctx.fill();
  ctx.strokeStyle='#1f2937'; ctx.lineWidth=1; ctx.stroke();

  // Concentric rings
  for(var r=1;r<=4;r++){
    ctx.beginPath(); ctx.arc(cx,cy,maxR*(r/4),0,Math.PI*2);
    ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=0.3; ctx.stroke();
  }

  // Season arcs
  var seasonColors=['#7ee787','#ff7b72','#ffa657','#79c0ff'];
  for(var s=0;s<4;s++){
    var sAng=(s/4)*Math.PI*2-Math.PI/2+(seasonRotation/4)*Math.PI*2;
    ctx.beginPath(); ctx.arc(cx,cy,maxR+12,sAng,sAng+Math.PI/2);
    ctx.strokeStyle=seasonColors[s]; ctx.lineWidth=3; ctx.globalAlpha=0.4; ctx.stroke();
    ctx.globalAlpha=1;
    var labelAng=sAng+Math.PI/4;
    ctx.fillStyle=seasonColors[s]; ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(seasons[s],cx+Math.cos(labelAng)*(maxR+24),cy+Math.sin(labelAng)*(maxR+24));
  }

  // Draw constellations
  for(var i=0;i<constellations.length;i++){
    var c=constellations[i];
    var ang=(c.ra/360)*Math.PI*2-Math.PI/2+(seasonRotation/4)*Math.PI/2;
    var dist=(c.dec/100)*maxR*0.85;
    var sx=cx+Math.cos(ang)*dist, sy=cy+Math.sin(ang)*dist;

    // Draw star points
    for(var st=0;st<c.stars;st++){
      var sAng2=ang+(st-c.stars/2)*0.15;
      var sd=dist+(st%2)*12-6;
      var stx=cx+Math.cos(sAng2)*sd, sty=cy+Math.sin(sAng2)*sd;
      var starR=c.observed?2.5:1.5;
      ctx.beginPath(); ctx.arc(stx,sty,starR,0,Math.PI*2);
      ctx.fillStyle=c.observed?'#ffd700':'#555'; ctx.fill();

      // Connection lines between adjacent stars
      if(st>0){
        var pAng=ang+((st-1)-c.stars/2)*0.15;
        var pd=dist+((st-1)%2)*12-6;
        var ptx=cx+Math.cos(pAng)*pd, pty=cy+Math.sin(pAng)*pd;
        ctx.beginPath(); ctx.moveTo(ptx,pty); ctx.lineTo(stx,sty);
        ctx.strokeStyle=c.observed?'rgba(255,215,0,0.3)':'rgba(85,85,85,0.2)';
        ctx.lineWidth=1; ctx.stroke();
      }
    }

    // Label
    ctx.fillStyle=c.observed?'#e6edf3':'#555'; ctx.font='8px sans-serif'; ctx.textAlign='center';
    ctx.fillText(c.name+'수',sx,sy+16);
  }

  // Progress panel on right
  var px=W/2+110,py=60;
  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 11px sans-serif'; ctx.textAlign='left';
  ctx.fillText('관측 진행도',px,py);

  var observed=constellations.filter(function(c){return c.observed;}).length;
  var total=constellations.length;
  var pct=Math.round((observed/total)*100);

  // Progress bar
  ctx.fillStyle=V25_COLORS.grid; ctx.fillRect(px,py+8,120,12);
  ctx.fillStyle='#79c0ff'; ctx.fillRect(px,py+8,(pct/100)*120,12);
  ctx.fillStyle='#fff'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  ctx.fillText(observed+'/'+total+' ('+pct+'%)',px+60,py+18);

  // Season list
  for(var s=0;s<4;s++){
    var sy2=py+40+s*28;
    var seasonConsts=constellations.filter(function(c){return c.season===seasons[s];});
    var sObs=seasonConsts.filter(function(c){return c.observed;}).length;
    ctx.fillStyle=seasonColors[s]; ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
    ctx.fillText(seasons[s]+': '+sObs+'/'+seasonConsts.length,px,sy2);
    var names=seasonConsts.map(function(c){return (c.observed?'★':'☆')+c.name;}).join(' ');
    ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif';
    ctx.fillText(names,px,sy2+12);
  }

  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('클릭하여 계절 회전  |  28수 체계 중 12수 표시  |  ★=관측완료',W/2,H-10);

  canvas.onclick=function(){
    v25State.astroSeason++;
    v25sfx('astro_observe');
    renderAstronomy(canvas);
  };
}

// ===== SECTION 7: 왕실 연회 외교 시뮬레이터 =====
function renderBanquet(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#ffa657'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('왕실 연회 외교 시뮬레이터',W/2,25);

  var guests=[
    {name:'당나라 사신',satisfaction:78,diplomacy:85,menu:80,seat:72,gift:88},
    {name:'일본 사절',satisfaction:65,diplomacy:60,menu:70,seat:55,gift:62},
    {name:'거란 사절',satisfaction:40,diplomacy:35,menu:50,seat:30,gift:45},
    {name:'발해 사신',satisfaction:82,diplomacy:80,menu:85,seat:78,gift:75},
    {name:'귀족 대표',satisfaction:88,diplomacy:75,menu:90,seat:85,gift:92},
    {name:'무신 장군',satisfaction:72,diplomacy:68,menu:65,seat:70,gift:58},
    {name:'승려 대사',satisfaction:85,diplomacy:90,menu:55,seat:82,gift:70},
    {name:'상단 대표',satisfaction:70,diplomacy:65,menu:88,seat:60,gift:80}
  ];

  var sel=v25State.banquetIdx%guests.length;

  // Seating satisfaction matrix (compact)
  var cellW=55,cellH=22;
  var startX=100,startY=50;
  var axes=['외교','메뉴','좌석','선물'];

  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 8px sans-serif'; ctx.textAlign='center';
  for(var j=0;j<axes.length;j++){
    ctx.fillText(axes[j],startX+j*cellW+cellW/2,startY-5);
  }

  for(var i=0;i<guests.length;i++){
    var g=guests[i];
    var y=startY+i*cellH;
    var isSel=i===sel;

    ctx.fillStyle=isSel?V25_COLORS.text:'#8b949e'; ctx.font=(isSel?'bold ':'')+'8px sans-serif'; ctx.textAlign='right';
    ctx.fillText(g.name,startX-6,y+cellH/2+3);

    var vals=[g.diplomacy,g.menu,g.seat,g.gift];
    for(var j=0;j<4;j++){
      var x=startX+j*cellW;
      var v=vals[j];
      var intensity=v/100;
      ctx.fillStyle='rgba(255,166,87,'+intensity*0.7+')';
      ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
      ctx.fillStyle=v>60?'#fff':'#999'; ctx.font='8px sans-serif'; ctx.textAlign='center';
      ctx.fillText(v,x+cellW/2,y+cellH/2+3);
    }

    // Overall satisfaction
    ctx.fillStyle=g.satisfaction>75?'#7ee787':g.satisfaction>50?'#ffa657':'#ff7b72';
    ctx.font='bold 8px sans-serif'; ctx.textAlign='left';
    ctx.fillText(g.satisfaction,startX+4*cellW+8,y+cellH/2+3);
  }

  // Diplomatic outcome gauge
  var gx=W/2+110,gy=H/2-30,gr=50;
  var selGuest=guests[sel];
  var outcome=Math.round((selGuest.diplomacy+selGuest.menu+selGuest.seat+selGuest.gift)/4);
  var startAng2=Math.PI*0.75, endAng2=Math.PI*2.25;
  var valAng2=startAng2+(outcome/100)*(endAng2-startAng2);

  ctx.beginPath(); ctx.arc(gx,gy,gr,startAng2,endAng2);
  ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(gx,gy,gr,startAng2,valAng2);
  ctx.strokeStyle=outcome>75?'#7ee787':outcome>50?'#ffa657':'#ff7b72';
  ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
  ctx.fillStyle='#fff'; ctx.font='bold 18px sans-serif'; ctx.textAlign='center';
  ctx.fillText(outcome,gx,gy+6);
  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif';
  ctx.fillText('외교 성과',gx,gy+gr+14);

  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 10px sans-serif';
  ctx.fillText(selGuest.name,gx,gy-gr-12);

  // Feast menu impact bars
  var bx=W/2+60,by=H/2+50;
  var menuItems=['음식','악레','선물','의전'];
  var menuVals=[selGuest.menu,selGuest.diplomacy*0.8,selGuest.gift,selGuest.seat*0.9];
  ctx.fillStyle=V25_COLORS.text; ctx.font='bold 9px sans-serif'; ctx.textAlign='left';
  ctx.fillText('연회 요소 영향도:',bx,by-5);
  for(var m=0;m<4;m++){
    var my=by+5+m*18;
    ctx.fillStyle=V25_COLORS.dim; ctx.font='8px sans-serif'; ctx.textAlign='right';
    ctx.fillText(menuItems[m],bx+35,my+10);
    ctx.fillStyle=V25_COLORS.grid; ctx.fillRect(bx+40,my,80,12);
    ctx.fillStyle=V25_COLORS.bars[m]; ctx.globalAlpha=0.8;
    ctx.fillRect(bx+40,my,(menuVals[m]/100)*80,12);
    ctx.globalAlpha=1;
  }

  var grade=gradeFor(outcome);
  ctx.fillStyle=gradeColor(grade); ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
  ctx.fillText('연회 외교 등급: '+grade+'  |  클릭하여 손님 전환',W/2,H-10);

  canvas.onclick=function(){
    v25State.banquetIdx=(v25State.banquetIdx+1)%guests.length;
    v25sfx('banquet_toast');
    renderBanquet(canvas);
  };
}

// ===== SECTION 8: 도시 종합 경쟁력 지수 =====
function renderCompetitiveness(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V25_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#56d4dd'; ctx.font='bold 16px sans-serif';
  ctx.textAlign='center'; ctx.fillText('도시 종합 경쟁력 지수',W/2,25);

  var kpis=[
    {name:'경제',value:78,weight:18,color:'#7ee787'},
    {name:'군사',value:72,weight:15,color:'#ff7b72'},
    {name:'문화',value:85,weight:12,color:'#d2a8ff'},
    {name:'외교',value:65,weight:10,color:'#ffa657'},
    {name:'기술',value:70,weight:14,color:'#58a6ff'},
    {name:'복지',value:62,weight:10,color:'#f0883e'},
    {name:'인프라',value:75,weight:12,color:'#79c0ff'},
    {name:'교육',value:80,weight:9,color:'#bc8cff'}
  ];

  // 4x2 grid of half-circle gauges
  var cols=4,gW=130,gH=90;
  var totalW=cols*gW;
  var sX=(W-totalW)/2, sY=50;

  for(var i=0;i<kpis.length;i++){
    var col=i%cols, row=Math.floor(i/cols);
    var cx2=sX+col*gW+gW/2;
    var cy2=sY+row*(gH+50)+gH/2+15;
    var k=kpis[i];
    var gaugeR=35;

    // Background arc (half circle)
    ctx.beginPath(); ctx.arc(cx2,cy2,gaugeR,Math.PI,0);
    ctx.strokeStyle=V25_COLORS.grid; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();

    // Value arc
    var valAng=Math.PI+(k.value/100)*Math.PI;
    ctx.beginPath(); ctx.arc(cx2,cy2,gaugeR,Math.PI,valAng);
    ctx.strokeStyle=k.color; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();

    // Value text
    ctx.fillStyle='#fff'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
    ctx.fillText(k.value,cx2,cy2-2);
    ctx.fillStyle=V25_COLORS.dim; ctx.font='7px sans-serif';
    ctx.fillText('/100',cx2,cy2+10);

    // KPI name
    ctx.fillStyle=k.color; ctx.font='bold 10px sans-serif';
    ctx.fillText(k.name,cx2,cy2+gaugeR+8);

    // Weight
    ctx.fillStyle=V25_COLORS.dim; ctx.font='7px sans-serif';
    ctx.fillText('가중 '+k.weight+'%',cx2,cy2+gaugeR+20);
  }

  // Weighted composite score
  var weightedSum=kpis.reduce(function(s,k){return s+k.value*k.weight;},0);
  var totalWeight=kpis.reduce(function(s,k){return s+k.weight;},0);
  var composite=Math.round(weightedSum/totalWeight);
  var grade=gradeFor(composite);

  ctx.fillStyle=gradeColor(grade); ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText('종합 경쟁력: '+composite+'점  |  등급: '+grade,W/2,H-30);

  ctx.fillStyle=V25_COLORS.dim; ctx.font='9px sans-serif';
  ctx.fillText('8개 KPI 가중 평균  |  반원 게이지 4×2 그리드',W/2,H-12);

  canvas.onclick=function(){
    v25sfx('compete_rank');
    renderCompetitiveness(canvas);
  };
}

// ===== QUIZ SYSTEM (15 questions, 310->325) =====
var V25_QUIZ = [
  {q:'조선시대 세금 중 토지에 부과하는 전세의 비율은 수확량의 약 몇 분의 1이었나?',a:['약 1/10','약 1/4','약 1/2','약 1/3'],c:0},
  {q:'이순신 장군이 학익진을 펼쳐 대승한 해전은?',a:['명량 해전','한산도 해전','노량진 해전','칠천량 해전'],c:0},
  {q:'고려시대 국제 무역항으로 유명했던 벽란도는 어디에 위치했나?',a:['예성강 하구','남해 연안','한강 하구','동해안'],c:0},
  {q:'고려청자의 비색을 내는 유약의 주성분은?',a:['철분','구리분','코발트분','니켈분'],c:0},
  {q:'조선시대 포도청의 주요 역할은?',a:['도적 및 범죄 단속','세금 징수','군사 훈련','외교 업무'],c:0},
  {q:'첨성대는 어느 시대에 건설되었나?',a:['신라 선덕여왕 시대','고구려 장수왕 시대','백제 무령왕 시대','고려 태조 시대'],c:0},
  {q:'조선시대 통신사의 외교적 역할은?',a:['일본과의 문화 교류','친선 사절','구호 활동','무역 협상'],c:0},
  {q:'조선시대 공납의 문제점으로 대동법을 시행한 왕은?',a:['광해군','영조','정조','태종'],c:0},
  {q:'고려의 별무반 제도를 시행한 왕은?',a:['태조 왕건','광종','성종','경종'],c:1},
  {q:'28수 체계에서 동방의 첫 번째 별자리는?',a:['각수','심수','방수','미수'],c:0},
  {q:'조선시대 한양의 인구는 약 몇 명이었나?',a:['약 20만 명','약 10만 명','약 50만 명','약 5만 명'],c:0},
  {q:'고려시대 국자감의 역할은?',a:['최고 교육 기관','군사 훈련소','외교 사절 접대','세금 관리'],c:0},
  {q:'직지심체요절이 중요한 이유는?',a:['세계 최초의 금속활자 인쇄본','가장 오래된 목판 인쇄','최대 귀모 불경','최고 예술 작품'],c:0},
  {q:'조선시대 상평통보는 어떤 기관에서 발행했나?',a:['호조','사헌부','병조','한성부'],c:0},
  {q:'고려의 대외 무역품 중 가장 유명했던 것은?',a:['청자 도자기','철기','비단','인삼'],c:0}
];

// ===== ACHIEVEMENTS (12 new, 266->278) =====
var V25_ACHIEVEMENTS = [
  {id:'v25_tax',icon:'💰',title:'세금 정책가',desc:'세금 정책 최적화기를 열람했다'},
  {id:'v25_military',icon:'⚔️',title:'병법 전략가',desc:'군사 진형 시뮬레이터를 분석했다'},
  {id:'v25_trade',icon:'⚖️',title:'무역 대군',desc:'무역 수지 분석기를 확인했다'},
  {id:'v25_heritage',icon:'🏛️',title:'문화재 큐레이터',desc:'문화재 가치 매트릭스를 열람했다'},
  {id:'v25_security',icon:'🛡️',title:'치안 총관',desc:'치안 범죄 분석도를 확인했다'},
  {id:'v25_astro',icon:'🔭',title:'천문 관측관',desc:'천문 관측 기록관을 열람했다'},
  {id:'v25_diplomat',icon:'🍽️',title:'연회 외교관',desc:'연회 외교 시뮬레이터를 분석했다'},
  {id:'v25_champion',icon:'🏆',title:'도시 챔피언',desc:'종합 경쟁력 지수를 확인했다'},
  {id:'v25_quiz3',icon:'📝',title:'신입 사관',desc:'퀸즈 3문제를 맞혀다'},
  {id:'v25_quiz7',icon:'🎓',title:'학식 박사',desc:'퀸즈 7문제를 맞혀다'},
  {id:'v25_quiz12',icon:'🏅',title:'역사 대가',desc:'퀸즈 12문제를 맞혀다'},
  {id:'v25_allsect',icon:'⭐',title:'전지전능 통치자',desc:'8개 섹션을 모두 열람했다'}
];

function markSection25(idx){
  if(idx>=0 && idx<8){
    v25State.sectionViewed[idx]=true;
    var achIds=['v25_tax','v25_military','v25_trade','v25_heritage','v25_security','v25_astro','v25_diplomat','v25_champion'];
    unlockAchievement25(achIds[idx]);
    if(v25State.sectionViewed.every(function(v){return v;})){
      unlockAchievement25('v25_allsect');
    }
  }
}

function unlockAchievement25(id){
  if(v25State.achievements.indexOf(id)>=0) return;
  v25State.achievements.push(id);
  var ach=V25_ACHIEVEMENTS.filter(function(a){return a.id===id;})[0];
  if(!ach) return;
  v25sfx('achieve');
  var toast=document.createElement('div');
  toast.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);background:rgba(35,134,54,0.95);color:#e6edf3;padding:10px 20px;border-radius:8px;z-index:9999;font:bold 13px sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.5);';
  toast.textContent=ach.icon+' 업적 해제: '+ach.title;
  document.body.appendChild(toast);
  setTimeout(function(){if(toast.parentNode) toast.parentNode.removeChild(toast);},2500);
}

// ===== PANEL SYSTEM =====
function renderCurrentSection25(){
  var panel=document.getElementById('v25-panel');
  if(!panel) return;
  var content=panel.querySelector('.v25-content');
  if(!content) return;
  content.innerHTML='';

  var idx=v25State.currentSection;
  if(idx===8){
    renderQuiz25();
    return;
  }
  if(idx===9){
    renderAchievements25();
    return;
  }

  var canvas=document.createElement('canvas');
  canvas.style.cssText='display:block;margin:0 auto;max-width:100%;height:auto;cursor:pointer;';
  content.appendChild(canvas);

  var renderers=[renderTaxOptimizer,renderFormation,renderTradeBalance,renderHeritageMatrix,
                 renderCrimeMap,renderAstronomy,renderBanquet,renderCompetitiveness];
  if(renderers[idx]){
    renderers[idx](canvas);
    markSection25(idx);
  }
}

function renderQuiz25(){
  var panel=document.getElementById('v25-panel');
  if(!panel) return;
  var content=panel.querySelector('.v25-content');
  if(!content) return;
  content.innerHTML='';

  var qIdx=v25State.quizIdx%V25_QUIZ.length;
  var q=V25_QUIZ[qIdx];

  var div=document.createElement('div');
  div.style.cssText='padding:12px;color:#e6edf3;font-size:14px;';

  var title=document.createElement('div');
  title.style.cssText='color:#ffa657;font-weight:bold;font-size:15px;margin-bottom:8px;';
  title.textContent='Q'+(qIdx+1)+'/'+V25_QUIZ.length+' (맞힌 수: '+v25State.quizScore+')';
  div.appendChild(title);

  var qText=document.createElement('div');
  qText.style.cssText='margin-bottom:12px;line-height:1.6;';
  qText.textContent=q.q;
  div.appendChild(qText);

  for(var i=0;i<q.a.length;i++){
    (function(ansIdx){
      var btn=document.createElement('button');
      btn.style.cssText='display:block;width:100%;padding:8px 12px;margin:4px 0;background:#161b22;color:#e6edf3;border:1px solid #30363d;border-radius:8px;cursor:pointer;font-size:13px;text-align:left;';
      btn.textContent=(ansIdx+1)+'. '+q.a[ansIdx];
      btn.onmouseenter=function(){this.style.borderColor='#ffa657';};
      btn.onmouseleave=function(){this.style.borderColor='#30363d';};
      btn.onclick=function(){
        var correct=ansIdx===q.c;
        if(correct){
          v25State.quizScore++;
          v25sfx('quiz_correct');
          btn.style.background='#0d2818'; btn.style.borderColor='#7ee787';
          if(v25State.quizScore>=3) unlockAchievement25('v25_quiz3');
          if(v25State.quizScore>=7) unlockAchievement25('v25_quiz7');
          if(v25State.quizScore>=12) unlockAchievement25('v25_quiz12');
        } else {
          v25sfx('quiz_wrong');
          btn.style.background='#2d1117'; btn.style.borderColor='#ff7b72';
        }
        v25State.quizTotal++;
        setTimeout(function(){
          v25State.quizIdx++;
          renderQuiz25();
        },1200);
      };
      div.appendChild(btn);
    })(i);
  }
  content.appendChild(div);
}

function renderAchievements25(){
  var panel=document.getElementById('v25-panel');
  if(!panel) return;
  var content=panel.querySelector('.v25-content');
  if(!content) return;
  content.innerHTML='';

  var div=document.createElement('div');
  div.style.cssText='padding:12px;color:#e6edf3;font-size:13px;';

  var title=document.createElement('div');
  title.style.cssText='color:#ffa657;font-weight:bold;font-size:15px;margin-bottom:10px;';
  title.textContent='업적 ('+v25State.achievements.length+'/'+V25_ACHIEVEMENTS.length+')';
  div.appendChild(title);

  for(var i=0;i<V25_ACHIEVEMENTS.length;i++){
    var a=V25_ACHIEVEMENTS[i];
    var unlocked=v25State.achievements.indexOf(a.id)>=0;
    var row=document.createElement('div');
    row.style.cssText='padding:6px 8px;margin:3px 0;background:'+(unlocked?'rgba(35,134,54,0.2)':'rgba(48,54,61,0.3)')+';border:1px solid '+(unlocked?'#238636':'#30363d')+';border-radius:6px;opacity:'+(unlocked?'1':'0.5')+';';
    row.textContent=a.icon+' '+a.title+' - '+a.desc;
    div.appendChild(row);
  }
  content.appendChild(div);
}

function createV25Panel(){
  if(document.getElementById('v25-panel')) return;

  var panel=document.createElement('div');
  panel.id='v25-panel';
  panel.style.cssText='position:fixed;top:90px;right:10px;width:340px;max-height:calc(100vh - 100px);background:rgba(22,27,34,0.97);border:2px solid #238636;border-radius:12px;z-index:5000;display:none;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.6);';

  var header=document.createElement('div');
  header.style.cssText='padding:8px 10px;background:linear-gradient(135deg,#0d1117,#161b22);display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #238636;';

  var titleEl=document.createElement('span');
  titleEl.style.cssText='color:#238636;font-weight:bold;font-size:13px;';
  titleEl.textContent='v25 도시 전략 센터';
  header.appendChild(titleEl);

  var closeBtn=document.createElement('button');
  closeBtn.textContent='✕';
  closeBtn.style.cssText='background:none;border:none;color:#ff7b72;font-size:16px;cursor:pointer;';
  closeBtn.onclick=function(){panel.style.display='none';};
  header.appendChild(closeBtn);
  panel.appendChild(header);

  var tabs=document.createElement('div');
  tabs.style.cssText='display:flex;flex-wrap:wrap;gap:2px;padding:4px;background:rgba(0,0,0,0.3);';

  var tabNames=['💰세금','⚔️진형','⚖️무역','🏛️문화','🛡️치안','🔭천문','🍽️연회','🏆경쟁','❓퀸즈','🏅업적'];
  for(var i=0;i<tabNames.length;i++){
    (function(idx){
      var tab=document.createElement('button');
      tab.style.cssText='flex:1;min-width:48px;padding:4px 2px;background:'+(idx===v25State.currentSection?'#238636':'#0d1117')+';color:#e6edf3;border:1px solid '+(idx===v25State.currentSection?'#3fb950':'#30363d')+';border-radius:6px;cursor:pointer;font-size:9px;';
      tab.textContent=tabNames[idx];
      tab.onclick=function(){
        v25State.currentSection=idx;
        v25sfx('section_flip');
        if(idx<8) markSection25(idx);
        document.getElementById('v25-panel').remove();
        createV25Panel();
        var p=document.getElementById('v25-panel');
        if(p) p.style.display='block';
        renderCurrentSection25();
      };
      tabs.appendChild(tab);
    })(i);
  }
  panel.appendChild(tabs);

  var content=document.createElement('div');
  content.className='v25-content';
  content.style.cssText='overflow-y:auto;max-height:calc(100vh - 200px);';
  panel.appendChild(content);

  document.body.appendChild(panel);
  renderCurrentSection25();
}

function addV25Button(){
  var existing=document.getElementById('v25-main-btn');
  if(existing) return;
  var btn=document.createElement('button');
  btn.id='v25-main-btn';
  btn.textContent='v25';
  btn.title='v25 도시 전략 센터';
  btn.style.cssText='position:fixed;top:50px;right:426px;z-index:4000;background:#238636;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font:bold 11px sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
  btn.onmouseenter=function(){this.style.background='#2ea043';};
  btn.onmouseleave=function(){this.style.background='#238636';};
  btn.onclick=function(){
    v25sfx('panel_open');
    createV25Panel();
    var panel=document.getElementById('v25-panel');
    if(panel) panel.style.display=panel.style.display==='none'?'block':'none';
  };
  document.body.appendChild(btn);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  if(!e.shiftKey) return;
  var panel=document.getElementById('v25-panel');
  var keyMap={'1':null,'2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'0':8};

  if(e.key==='!'){
    e.preventDefault();
    var btn=document.getElementById('v25-main-btn');
    if(btn) btn.click();
    return;
  }

  if(!panel || panel.style.display==='none') return;

  // Shift+2~9 => sections 0~7, Shift+0 => quiz (8)
  var sectionKeys={'@':0,'#':1,'$':2,'%':3,'^':4,'&':5,'*':6,'(':7,')':8};
  var idx=sectionKeys[e.key];
  if(idx!==undefined){
    e.preventDefault();
    v25State.currentSection=idx;
    v25sfx('nav');
    if(idx<8) markSection25(idx);
    document.getElementById('v25-panel').remove();
    createV25Panel();
    var p=document.getElementById('v25-panel');
    if(p) p.style.display='block';
    renderCurrentSection25();
  }
});

// ===== INIT =====
function initV25(){
  addV25Button();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initV25);
} else {
  initV25();
}

})();
