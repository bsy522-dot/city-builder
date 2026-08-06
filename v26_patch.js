(function(){
'use strict';

var V26_SFX_CTX = null;
function v26sfx(type){
  try {
    if(!V26_SFX_CTX) V26_SFX_CTX = new (window.AudioContext||window.webkitAudioContext)();
    var c = V26_SFX_CTX, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    var freqs = {
      nav:[440,0.08],panel_open:[440,0.06],section_flip:[494,0.08],
      water_flow:[349,0.16],water_flood:[220,0.20],
      scholar_teach:[587,0.14],scholar_graduate:[784,0.18],
      enviro_clean:[523,0.12],enviro_pollute:[262,0.10],
      spy_infiltrate:[659,0.14],spy_caught:[330,0.12],
      ritual_chant:[440,0.20],ritual_complete:[698,0.22],
      market_trade:[523,0.12],market_boom:[659,0.16],
      wall_build:[392,0.14],wall_defend:[880,0.18],
      summary_rank:[587,0.12],summary_champion:[880,0.20],
      quiz_correct:[659,0.12],quiz_wrong:[262,0.10],
      achieve:[784,0.18]
    };
    var f = freqs[type]||[440,0.1];
    o.frequency.setValueAtTime(f[0],t);
    o.type = type==='wall_defend'?'sawtooth':type==='spy_infiltrate'?'square':type==='ritual_chant'?'triangle':'sine';
    g.gain.setValueAtTime(0.15,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+f[1]);
    o.start(t); o.stop(t+f[1]+0.05);
  } catch(e){}
}

var V26_COLORS = {
  bg:'#0d1117',panel:'#161b22',accent:'#da3633',highlight:'#58a6ff',
  text:'#e6edf3',dim:'#8b949e',grid:'#30363d',
  bars:['#da3633','#58a6ff','#3fb950','#d2a8ff','#f0883e','#79c0ff','#ff7b72','#7ee787',
        '#ffa657','#bc8cff','#56d4dd','#238636']
};

var v26State = {currentSection:0, quizIdx:0, quizScore:0, quizTotal:0, achievements:[],
  sectionViewed:[false,false,false,false,false,false,false,false],
  waterIdx:0, scholarIdx:0, enviroIdx:0, spyIdx:0, ritualSeason:0,
  marketIdx:0, wallIdx:0, summaryIdx:0};

function gradeFor(score){ return score>=85?'S':score>=70?'A':score>=55?'B':score>=40?'C':'D'; }
function gradeColor(g){ return g==='S'?'#ffd700':g==='A'?'#7ee787':g==='B'?'#58a6ff':g==='C'?'#f0883e':'#ff7b72'; }

function drawRadar6v26(ctx,cx,cy,maxR,values,labels,color,fillAlpha){
  for(var ring=1;ring<=5;ring++){
    var r=maxR*(ring/5);
    ctx.beginPath();
    for(var a=0;a<6;a++){
      var ang=(a/6)*Math.PI*2-Math.PI/2;
      var px=cx+Math.cos(ang)*r,py=cy+Math.sin(ang)*r;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=0.5; ctx.stroke();
  }
  for(var a=0;a<6;a++){
    var ang=(a/6)*Math.PI*2-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*maxR,cy+Math.sin(ang)*maxR);
    ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=0.5; ctx.stroke();
    var lx=cx+Math.cos(ang)*(maxR+16),ly=cy+Math.sin(ang)*(maxR+16);
    ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
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

function drawHalfGauge(ctx,cx,cy,r,value,maxVal,label,color){
  ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI,0); ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=8; ctx.stroke();
  var pct=Math.min(value/maxVal,1);
  ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI,-Math.PI+Math.PI*pct); ctx.strokeStyle=color; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke(); ctx.lineCap='butt';
  var g=gradeFor(pct*100);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 18px sans-serif'; ctx.textAlign='center'; ctx.fillText(g,cx,cy-4);
  ctx.fillStyle=V26_COLORS.text; ctx.font='10px sans-serif'; ctx.fillText(Math.round(pct*100)+'%',cx,cy+12);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.fillText(label,cx,cy+r+14);
}

function renderWaterSystem(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🌊 수자원 관리 시스템',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('수로/저수지/상수도/관개 효율 분석',W/2,46);

  var sources = [
    {name:'산곡수로',supply:85,quality:92,cost:45,coverage:78,durability:88,efficiency:80},
    {name:'저수지',supply:72,quality:68,cost:60,coverage:65,durability:75,efficiency:70},
    {name:'우물',supply:40,quality:95,cost:30,coverage:25,durability:90,efficiency:55},
    {name:'물레방아',supply:90,quality:70,cost:80,coverage:88,durability:65,efficiency:82},
    {name:'수차',supply:55,quality:88,cost:55,coverage:45,durability:92,efficiency:60},
    {name:'빗물저장',supply:35,quality:60,cost:20,coverage:30,durability:50,efficiency:40},
    {name:'관개수로',supply:80,quality:75,cost:70,coverage:82,durability:70,efficiency:85},
    {name:'상수도',supply:95,quality:90,cost:90,coverage:95,durability:80,efficiency:90}
  ];

  var idx = v26State.waterIdx % sources.length;
  var s = sources[idx];

  drawRadar6v26(ctx,180,220,110,
    [s.supply,s.quality,s.cost,s.coverage,s.durability,s.efficiency],
    ['공급량','수질','비용','커버리지','내구성','효율'],
    V26_COLORS.bars[idx],0.25);

  var avg = Math.round((s.supply+s.quality+s.cost+s.coverage+s.durability+s.efficiency)/6);
  var g = gradeFor(avg);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(s.name+' ('+g+'등급)',180,355);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif';
  ctx.fillText('클릭으로 수원 전환 ('+(idx+1)+'/'+sources.length+')',180,375);

  var barX=360,barW=240,barH=16,barGap=36;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
  ctx.fillText('수원별 비교',barX,78);
  for(var i=0;i<sources.length;i++){
    var by=95+i*barGap;
    ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(sources[i].name,barX-4,by+12);
    var avg2=(sources[i].supply+sources[i].quality+sources[i].coverage+sources[i].efficiency)/4;
    ctx.fillStyle=V26_COLORS.grid; ctx.fillRect(barX,by,barW,barH);
    ctx.fillStyle=i===idx?V26_COLORS.accent:V26_COLORS.bars[i%V26_COLORS.bars.length];
    ctx.fillRect(barX,by,barW*(avg2/100),barH);
    var g2=gradeFor(avg2);
    ctx.fillStyle=gradeColor(g2); ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(g2+' '+Math.round(avg2),barX+barW+6,by+12);
  }

  canvas.onclick=function(){
    v26State.waterIdx++;
    v26sfx('water_flow');
    renderWaterSystem(canvas);
  };
}

function renderScholarSystem(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('📚 고대 학당 교육 체계',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('6학당 유형 학문 깊이 \xB7 인재 양성 \xB7 속도 분석',W/2,46);

  var academies = [
    {name:'향교',values:[70,65,80,55,75,60],desc:'지방 유학 교육 기관'},
    {name:'성균관',values:[95,90,70,85,95,80],desc:'최고 학부, 유교 중심'},
    {name:'서당',values:[60,70,50,90,55,75],desc:'민간 학문 연구 공간'},
    {name:'국자감',values:[88,85,75,70,85,70],desc:'고려 최고 교육 기관'},
    {name:'서원',values:[55,60,45,80,50,85],desc:'조선 사립 교육 기관'},
    {name:'화랑도',values:[75,80,90,45,70,50],desc:'신라 엘리트 무사 양성'}
  ];
  var idx = v26State.scholarIdx % academies.length;
  var a = academies[idx];

  drawRadar6v26(ctx,170,220,110,a.values,
    ['학문','인재','속도','접근성','명성','사회영향'],
    V26_COLORS.bars[idx+2],0.25);

  var avg=0; for(var i=0;i<6;i++) avg+=a.values[i]; avg=Math.round(avg/6);
  var g=gradeFor(avg);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(a.name+' ('+g+'등급)',170,360);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif';
  ctx.fillText(a.desc,170,378);

  var rx=340,rw=250;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
  ctx.fillText('학당별 종합 성적표',rx,78);
  for(var i=0;i<academies.length;i++){
    var by=95+i*45;
    var ac=academies[i];
    var av=0; for(var j=0;j<6;j++) av+=ac.values[j]; av=Math.round(av/6);
    ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(ac.name,rx-4,by+12);
    ctx.fillStyle=V26_COLORS.grid; ctx.fillRect(rx,by,rw,16);
    ctx.fillStyle=i===idx?V26_COLORS.highlight:V26_COLORS.bars[(i+2)%V26_COLORS.bars.length];
    ctx.fillRect(rx,by,rw*(av/100),16);
    var g2=gradeFor(av);
    ctx.fillStyle=gradeColor(g2); ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(g2+' '+av,rx+rw+6,by+12);
  }

  canvas.onclick=function(){
    v26State.scholarIdx++;
    v26sfx('scholar_teach');
    renderScholarSystem(canvas);
  };
}

function renderEnviroAnalyzer(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🌿 도시 환경 오염도 분석기',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('8구역 \xD7 6오염원 히트맵 + 정화 등급',W/2,46);

  var zones = ['왕궁','시장가','주거지','공방가','농경지','군영','항구','외골'];
  var pollutants = ['수질','대기','토양','소음','악취','폐기물'];
  var data = [
    [15,10,8,20,5,12],[40,55,25,70,45,60],[30,35,20,50,15,25],
    [65,80,45,85,70,75],[10,5,15,8,3,5],[50,40,30,60,20,35],
    [55,60,40,45,50,65],[35,25,18,30,22,28]
  ];

  var cellW=60,cellH=34,startX=140,startY=80;
  ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
  for(var c=0;c<pollutants.length;c++){
    ctx.fillText(pollutants[c],startX+c*cellW+cellW/2,startY-6);
  }
  for(var r=0;r<zones.length;r++){
    ctx.textAlign='right';
    ctx.fillText(zones[r],startX-8,startY+r*cellH+cellH/2+3);
    for(var c=0;c<pollutants.length;c++){
      var v=data[r][c];
      var hue=v<30?120:v<50?60:v<70?30:0;
      ctx.fillStyle='hsla('+hue+',70%,40%,0.8)';
      ctx.fillRect(startX+c*cellW,startY+r*cellH,cellW-2,cellH-2);
      ctx.fillStyle=v>60?'#fff':'#e6edf3';
      ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
      ctx.fillText(v,startX+c*cellW+cellW/2-1,startY+r*cellH+cellH/2+4);
    }
  }

  var gaugeY = startY + zones.length*cellH + 30;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
  ctx.fillText('구역별 종합 정화 등급',W/2,gaugeY);
  for(var i=0;i<zones.length;i++){
    var avg=0; for(var j=0;j<6;j++) avg+=data[i][j]; avg/=6;
    var clean=100-avg;
    var gx=40+i*75;
    drawHalfGauge(ctx,gx+30,gaugeY+50,22,clean,100,zones[i],clean>=70?'#3fb950':clean>=40?'#f0883e':'#da3633');
  }
}

function renderSpyNetwork(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🕵️ 첩보 정보망 운영도',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('8경쟁국 첩보 네트워크 + 정보 신뢰도',W/2,46);

  var nations = [
    {name:'고구려',x:160,y:120,infiltrate:85,detect:70,info:78,speed:82,cost:60,trust:75},
    {name:'백제',x:120,y:220,infiltrate:70,detect:65,info:72,speed:75,cost:50,trust:80},
    {name:'신라',x:200,y:260,infiltrate:75,detect:80,info:80,speed:70,cost:55,trust:70},
    {name:'당',x:400,y:100,infiltrate:60,detect:90,info:90,speed:60,cost:85,trust:55},
    {name:'일본',x:500,y:200,infiltrate:55,detect:60,info:65,speed:50,cost:45,trust:60},
    {name:'거란',x:350,y:160,infiltrate:50,detect:85,info:75,speed:55,cost:70,trust:45},
    {name:'발해',x:280,y:100,infiltrate:80,detect:55,info:70,speed:78,cost:40,trust:82},
    {name:'가야',x:180,y:300,infiltrate:88,detect:50,info:60,speed:85,cost:35,trust:90}
  ];

  var center = {x:260,y:200};
  for(var i=0;i<nations.length;i++){
    var n=nations[i];
    ctx.beginPath(); ctx.moveTo(center.x,center.y); ctx.lineTo(n.x,n.y);
    var strength=(n.infiltrate+n.info)/200;
    ctx.strokeStyle='rgba(218,54,51,'+(0.3+strength*0.7)+')';
    ctx.lineWidth=1+strength*3; ctx.stroke();
  }

  ctx.beginPath(); ctx.arc(center.x,center.y,18,0,Math.PI*2);
  ctx.fillStyle='#ffd700'; ctx.fill();
  ctx.fillStyle='#0d1117'; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
  ctx.fillText('본국',center.x,center.y+4);

  var idx = v26State.spyIdx % nations.length;
  for(var i=0;i<nations.length;i++){
    var n=nations[i];
    var r = i===idx?14:10;
    ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
    ctx.fillStyle=i===idx?V26_COLORS.accent:'#30363d'; ctx.fill();
    ctx.strokeStyle=i===idx?'#ff7b72':'#555'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle=V26_COLORS.text; ctx.font=(i===idx?'bold ':'')+('10px sans-serif');
    ctx.textAlign='center'; ctx.fillText(n.name,n.x,n.y-r-6);
  }

  var sel=nations[idx];
  var rx=440,ry=70;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 13px sans-serif'; ctx.textAlign='left';
  ctx.fillText(sel.name+' 첩보 상세',rx,ry);
  var metrics=[
    ['침투력',sel.infiltrate],['탐지력',sel.detect],['정보력',sel.info],
    ['속도',sel.speed],['비용',sel.cost],['신뢰도',sel.trust]
  ];
  for(var i=0;i<metrics.length;i++){
    var my=ry+25+i*38;
    ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(metrics[i][0],rx,my);
    ctx.fillStyle=V26_COLORS.grid; ctx.fillRect(rx+50,my-10,130,14);
    var pct=metrics[i][1]/100;
    ctx.fillStyle=pct>0.7?'#3fb950':pct>0.4?'#f0883e':'#da3633';
    ctx.fillRect(rx+50,my-10,130*pct,14);
    ctx.fillStyle=V26_COLORS.text; ctx.font='bold 10px sans-serif';
    ctx.fillText(metrics[i][1],rx+50+130+6,my);
  }
  var avg2=Math.round((sel.infiltrate+sel.detect+sel.info+sel.speed+sel.trust)/5);
  var g=gradeFor(avg2);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 14px sans-serif'; ctx.textAlign='left';
  ctx.fillText('종합: '+g+' ('+avg2+'점)',rx,ry+25+6*38+10);

  canvas.onclick=function(){
    v26State.spyIdx++;
    v26sfx('spy_infiltrate');
    renderSpyNetwork(canvas);
  };
}

function renderRitualSimulator(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🎭 왕실 제례 의식 시뮬레이터',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('8종 제례 4계절 효과 분석',W/2,46);

  var rituals = [
    {name:'종묘제',effect:[90,85,70,80,95,75],season:'신년',desc:'왕실 조상 제사'},
    {name:'사직제',effect:[60,70,90,85,50,80],season:'춘추',desc:'토지신 풍요 기원'},
    {name:'대보단',effect:[95,90,80,70,85,90],season:'동지',desc:'하늘과 땅 합제'},
    {name:'국사므제',effect:[70,80,95,90,75,85],season:'사계',desc:'국가 수호신 제사'},
    {name:'우사제',effect:[50,60,85,95,45,70],season:'가문',desc:'비를 비는 기우제'},
    {name:'풍어제',effect:[55,65,75,80,40,60],season:'고기잡이',desc:'풍어 안전 기원'},
    {name:'무로대제',effect:[80,75,60,55,90,65],season:'군사',desc:'군사 승리 기원'},
    {name:'연등회',effect:[65,80,50,60,70,95],season:'봄',desc:'민관 합동 연회'}
  ];
  var idx = v26State.ritualSeason % rituals.length;
  var r = rituals[idx];

  drawRadar6v26(ctx,170,220,110,r.effect,
    ['영향력','민심','풍요','기후','권위','사회적'],
    V26_COLORS.bars[idx],0.25);

  var avg=0; for(var i=0;i<6;i++) avg+=r.effect[i]; avg=Math.round(avg/6);
  var g=gradeFor(avg);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(r.name+' ('+g+'등급)',170,358);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif';
  ctx.fillText(r.season+' | '+r.desc,170,376);

  var rx=340;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
  ctx.fillText('제례별 종합 효과',rx,78);
  for(var i=0;i<rituals.length;i++){
    var by=95+i*35;
    var ri=rituals[i];
    var av=0; for(var j=0;j<6;j++) av+=ri.effect[j]; av=Math.round(av/6);
    ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(ri.name,rx-4,by+12);
    ctx.fillStyle=V26_COLORS.grid; ctx.fillRect(rx,by,220,16);
    ctx.fillStyle=i===idx?V26_COLORS.accent:V26_COLORS.bars[i%V26_COLORS.bars.length];
    ctx.fillRect(rx,by,220*(av/100),16);
    var g2=gradeFor(av);
    ctx.fillStyle=gradeColor(g2); ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(g2+' '+av,rx+226,by+12);
  }

  canvas.onclick=function(){
    v26State.ritualSeason++;
    v26sfx('ritual_chant');
    renderRitualSimulator(canvas);
  };
}

function renderMarketEconomy(canvas){
  var ctx=canvas.getContext('2d');
  var W=640,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('💰 시장 경제 물가 지수',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('10품목 12월 물가 변동 라인차트',W/2,46);

  var items = ['쌀','보리','비단','소금','철','목재','약재','도자기','붓','술'];
  var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  var prices = [
    [100,105,110,95,90,88,92,100,108,112,105,100],
    [100,98,95,100,105,110,108,102,98,95,100,103],
    [100,110,120,130,125,115,105,100,110,120,130,125],
    [100,100,102,105,108,110,112,110,108,105,103,100],
    [100,95,90,85,88,92,95,100,105,110,108,102],
    [100,102,105,108,106,100,95,90,92,98,104,108],
    [100,108,115,120,118,110,105,100,95,98,105,112],
    [100,100,98,95,92,90,88,90,95,100,105,108],
    [100,105,108,105,100,95,92,90,95,100,108,112],
    [100,115,120,110,105,100,98,95,100,110,118,125]
  ];

  var chartX=80,chartY=70,chartW=500,chartH=240;
  ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=1;
  ctx.strokeRect(chartX,chartY,chartW,chartH);

  for(var i=1;i<12;i++){
    var x=chartX+(chartW/11)*i;
    ctx.beginPath(); ctx.moveTo(x,chartY); ctx.lineTo(x,chartY+chartH);
    ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=0.3; ctx.stroke();
  }
  ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
  for(var i=0;i<12;i++){
    ctx.fillText(months[i],chartX+(chartW/11)*i,chartY+chartH+14);
  }

  for(var g=0;g<=4;g++){
    var gy=chartY+chartH-(chartH/4)*g;
    ctx.beginPath(); ctx.moveTo(chartX,gy); ctx.lineTo(chartX+chartW,gy);
    ctx.strokeStyle=V26_COLORS.grid; ctx.lineWidth=0.3; ctx.stroke();
    ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='right';
    ctx.fillText((80+g*15)+'',chartX-4,gy+3);
  }

  var idx = v26State.marketIdx % items.length;
  for(var p=0;p<items.length;p++){
    ctx.beginPath();
    for(var m=0;m<12;m++){
      var x=chartX+(chartW/11)*m;
      var y=chartY+chartH-((prices[p][m]-80)/(140-80))*chartH;
      if(m===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.strokeStyle=p===idx?V26_COLORS.bars[p]:('rgba('+
      (p<5?'88,166,255':'255,123,114')+','+(p===idx?'1':'0.15')+')');
    ctx.lineWidth=p===idx?3:1; ctx.stroke();
  }

  ctx.fillStyle=V26_COLORS.bars[idx]; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
  ctx.fillText('● '+items[idx],chartX,chartY+chartH+34);

  ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif'; ctx.textAlign='center';
  ctx.fillText('클릭으로 품목 전환 ('+(idx+1)+'/'+items.length+')',W/2,H-10);

  canvas.onclick=function(){
    v26State.marketIdx++;
    v26sfx('market_trade');
    renderMarketEconomy(canvas);
  };
}

function renderWallDefense(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🏰 도성 방어 축성 시뮬레이터',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('10성벽 유형 6축 방어력 분석',W/2,46);

  var walls = [
    {name:'토성',values:[40,50,30,90,35,45],desc:'흙을 쌍아 만든 기본 성벽'},
    {name:'목책',values:[30,35,25,95,20,50],desc:'나무 말뚝으로 세운 방벽'},
    {name:'석성',values:[85,90,75,50,80,70],desc:'돌로 쌍은 견고한 성벽'},
    {name:'산성',values:[90,80,85,40,90,65],desc:'산지 지형 활용 방어'},
    {name:'수성',values:[70,85,90,55,75,80],desc:'물을 활용한 방어 시스템'},
    {name:'옹성',values:[60,70,55,60,65,55],desc:'보강 축성 방식'},
    {name:'복합성',values:[80,85,70,45,85,75],desc:'토석 복합 축성 방식'},
    {name:'이중성벽',values:[95,90,80,35,95,85],desc:'내성+외성 이중 방어'},
    {name:'치성',values:[75,65,60,70,60,90],desc:'기존 지형 활용 성벽'},
    {name:'성골성',values:[88,95,90,30,92,80],desc:'산골짜기 활용 천험 요새'}
  ];
  var idx = v26State.wallIdx % walls.length;
  var w = walls[idx];

  drawRadar6v26(ctx,170,220,110,w.values,
    ['방어력','내구성','공격저항','건설속도','유지보수','전략적'],
    V26_COLORS.bars[idx%V26_COLORS.bars.length],0.25);

  var avg=0; for(var i=0;i<6;i++) avg+=w.values[i]; avg=Math.round(avg/6);
  var g=gradeFor(avg);
  ctx.fillStyle=gradeColor(g); ctx.font='bold 14px sans-serif'; ctx.textAlign='center';
  ctx.fillText(w.name+' ('+g+'등급)',170,358);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='10px sans-serif';
  ctx.fillText(w.desc,170,376);

  var rx=340;
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
  ctx.fillText('성벽 유형별 방어력 순위',rx,78);
  var sorted = walls.map(function(wl,i){
    var a=0; for(var j=0;j<6;j++) a+=wl.values[j]; return {name:wl.name,avg:Math.round(a/6),idx:i};
  }).sort(function(a,b){return b.avg-a.avg;});
  for(var i=0;i<sorted.length;i++){
    var by=95+i*28;
    var sw=sorted[i];
    ctx.fillStyle=sw.idx===idx?V26_COLORS.text:V26_COLORS.dim;
    ctx.font='10px sans-serif'; ctx.textAlign='right';
    ctx.fillText((i+1)+'. '+sw.name,rx+50,by+10);
    ctx.fillStyle=V26_COLORS.grid; ctx.fillRect(rx+56,by,180,14);
    ctx.fillStyle=sw.idx===idx?V26_COLORS.accent:V26_COLORS.bars[sw.idx%V26_COLORS.bars.length];
    ctx.fillRect(rx+56,by,180*(sw.avg/100),14);
    var g2=gradeFor(sw.avg);
    ctx.fillStyle=gradeColor(g2); ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(g2,rx+56+186,by+10);
  }

  canvas.onclick=function(){
    v26State.wallIdx++;
    v26sfx('wall_build');
    renderWallDefense(canvas);
  };
}

function renderCivilizationIndex(canvas){
  var ctx=canvas.getContext('2d');
  var W=620,H=400; canvas.width=W; canvas.height=H;
  ctx.fillStyle=V26_COLORS.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle=V26_COLORS.text; ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🏛️ 도시 종합 문명 지수',W/2,28);
  ctx.fillStyle=V26_COLORS.dim; ctx.font='11px sans-serif';
  ctx.fillText('8KPI 반원게이지 가중 종합 S~D 등급',W/2,46);

  var kpis = [
    {name:'수자원',value:78,weight:12},
    {name:'교육',value:82,weight:15},
    {name:'환경',value:65,weight:13},
    {name:'첩보',value:72,weight:10},
    {name:'제례',value:85,weight:8},
    {name:'경제',value:70,weight:18},
    {name:'방어',value:88,weight:14},
    {name:'문화',value:75,weight:10}
  ];

  var positions = [
    {x:90,y:120},{x:230,y:120},{x:370,y:120},{x:510,y:120},
    {x:90,y:270},{x:230,y:270},{x:370,y:270},{x:510,y:270}
  ];

  for(var i=0;i<kpis.length;i++){
    var k=kpis[i], p=positions[i];
    drawHalfGauge(ctx,p.x,p.y,38,k.value,100,k.name,
      k.value>=80?'#3fb950':k.value>=60?'#f0883e':'#da3633');
    ctx.fillStyle=V26_COLORS.dim; ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText('가중치:'+k.weight+'%',p.x,p.y+38+28);
  }

  var weighted=0,totalW=0;
  for(var i=0;i<kpis.length;i++){ weighted+=kpis[i].value*kpis[i].weight; totalW+=kpis[i].weight; }
  var overall=Math.round(weighted/totalW);
  var og=gradeFor(overall);

  ctx.fillStyle=gradeColor(og); ctx.font='bold 28px sans-serif'; ctx.textAlign='center';
  ctx.fillText(og,W/2,H-30);
  ctx.fillStyle=V26_COLORS.text; ctx.font='12px sans-serif';
  ctx.fillText('종합 문명 지수: '+overall+'점',W/2,H-10);
}

var V26_QUIZZES = [
  {q:'고려시대 수도인 개경의 주요 수원은?',
   o:['빗물저장','물레방아','산골수로','상수도'],c:2,
   e:'고려 개경은 산골수로를 통해 산에서 물을 끌어와 도시에 공급했습니다.'},
  {q:'조선시대 최고 교육기관은?',
   o:['향교','서원','성균관','국자감'],c:2,
   e:'성균관은 조선시대 최고 학부로 유교 중심 교육을 담당했습니다.'},
  {q:'고려 시대 경전을 가미하는 제례는?',
   o:['종므제','우사제','풍어제','사직제'],c:0,
   e:'종므제는 왕실 조상에게 지내는 제사로 경전을 가미하는 의미가 있었습니다.'},
  {q:'고대 한국의 대표적인 성골 요새는?',
   o:['남한산성','삼년산성','하다산성','부소산성'],c:1,
   e:'삼년산성은 산골짜기를 활용한 대표적인 천험 요새입니다.'},
  {q:'조선 시장에서 가장 중요한 교역품은?',
   o:['비단','쌀','도자기','보리'],c:1,
   e:'쌀은 조선시대 가장 중요한 교역품으로 물가 기준이 되기도 했습니다.'},
  {q:'고구려의 대표적인 첩보 기관은?',
   o:['사복시','어사대','무영소','탐정대'],c:0,
   e:'고구려에는 사복시 등의 첩보 기관이 있어 적국의 동태를 파악했습니다.'},
  {q:'고려의 국자감에서 가르친 주요 과목은?',
   o:['유교 경전','불교 경전','무술','복식부기'],c:0,
   e:'고려 국자감은 유교 경전을 중심으로 관리 양성 교육을 했습니다.'},
  {q:'조선시대 환경 보전을 위해 시행한 정책은?',
   o:['금벌법','송금정책','사창제도','봉산제도'],c:1,
   e:'송금정책은 산림을 보호하기 위해 소나무 벌채를 금지하는 환경 보전 정책입니다.'},
  {q:'대보단제는 언제 지내는 제사인가?',
   o:['춘분','추분','동지','하지'],c:2,
   e:'대보단제는 동지에 지내는 하늘과 땅에 대한 합제입니다.'},
  {q:'고려 시대 고급 비단의 주요 수출국은?',
   o:['일본','당','거란','아라비아'],c:3,
   e:'고려 비단은 실크로드를 통해 아라비아까지 수출되었습니다.'},
  {q:'조선 시대 도성 방어의 핵심 시설은?',
   o:['봉수대','처성대','문루','성벽'],c:3,
   e:'성벽은 조선 시대 도성 방어의 가장 핵심적인 시설이었습니다.'},
  {q:'신라 화랑도에서 배운 주요 능력은?',
   o:['문학','무술','음악','무술+문학+음악'],c:3,
   e:'화랑도는 무술, 문학, 음악 등 다양한 능력을 종합적으로 배우는 엘리트 교육 기관이었습니다.'},
  {q:'고대 수차(수레)의 주요 용도는?',
   o:['관개 용수','음용수 저장','방어용','제조용 동력'],c:0,
   e:'수차는 물을 끌어올리는 장치로 주로 관개 용수에 사용되었습니다.'},
  {q:'고려 시대 물가 안정을 위한 제도는?',
   o:['상평창','경시서','화통도감','시전감사관'],c:0,
   e:'고려의 상평창은 물가 안정을 위해 물자를 저장하고 풀어놓는 제도입니다.'},
  {q:'조선의 연등회는 어떤 성격의 행사인가?',
   o:['군사 훈련','민관 합동 연회','왕실 제사','과거 시험'],c:1,
   e:'연등회는 민관이 함께 즐기는 봄철 연회로 사회적 결속을 강화했습니다.'}
];

var V26_ACHIEVEMENTS = [
  {id:'v26_water_master',icon:'🌊',title:'수자원 대가',desc:'수자원 관리 시스템 전체 확인',condition:function(){return v26State.sectionViewed[0];}},
  {id:'v26_scholar',icon:'📚',title:'학당 학장',desc:'고대 학당 6종 전체 확인',condition:function(){return v26State.scholarIdx>=6;}},
  {id:'v26_eco_warrior',icon:'🌿',title:'환경 수호자',desc:'환경 오염도 분석 완료',condition:function(){return v26State.sectionViewed[2];}},
  {id:'v26_spymaster',icon:'🕵️',title:'첩보 수장',desc:'첩보망 8국 전체 조사',condition:function(){return v26State.spyIdx>=8;}},
  {id:'v26_ritual_keeper',icon:'🎭',title:'제례 수호자',desc:'왕실 제례 8종 전체 확인',condition:function(){return v26State.ritualSeason>=8;}},
  {id:'v26_merchant',icon:'💰',title:'시장 물가 전문가',desc:'물가 지수 10품목 전체 분석',condition:function(){return v26State.marketIdx>=10;}},
  {id:'v26_fortress',icon:'🏰',title:'축성 대장',desc:'성벽 10종 전체 확인',condition:function(){return v26State.wallIdx>=10;}},
  {id:'v26_civ_index',icon:'🏛️',title:'문명 지수 분석가',desc:'종합 문명 지수 확인',condition:function(){return v26State.sectionViewed[7];}},
  {id:'v26_quiz_10',icon:'🏆',title:'퍼즐 마스터 v26',desc:'v26 퀴즈 10문제 이상 도전',condition:function(){return v26State.quizTotal>=10;}},
  {id:'v26_quiz_perfect',icon:'👑',title:'퀴즈 퍼펙트 v26',desc:'v26 퀴즈 전문 정답',condition:function(){return v26State.quizTotal>=15&&v26State.quizScore>=15;}},
  {id:'v26_all_sections',icon:'🌟',title:'v26 완전 정복',desc:'v26 8섹션 전체 확인',condition:function(){var c=0;for(var i=0;i<8;i++)if(v26State.sectionViewed[i])c++;return c>=8;}},
  {id:'v26_explorer',icon:'🗺️',title:'탐험가 v26',desc:'v26 툴 5개 이상 열람',condition:function(){var c=0;for(var i=0;i<8;i++)if(v26State.sectionViewed[i])c++;return c>=5;}}
];

function markSection26(idx){
  v26State.sectionViewed[idx]=true;
  checkV26Achievements();
}

function checkV26Achievements(){
  for(var i=0;i<V26_ACHIEVEMENTS.length;i++){
    var a=V26_ACHIEVEMENTS[i];
    if(v26State.achievements.indexOf(a.id)===-1 && a.condition()){
      v26State.achievements.push(a.id);
      v26sfx('achieve');
      var toast=document.createElement('div');
      toast.className='ach-toast';
      toast.innerHTML='<div class="a-header">🏅 업적 해제!</div><div class="a-title">'+a.icon+' '+a.title+'</div><div class="a-desc">'+a.desc+'</div>';
      document.body.appendChild(toast);
      setTimeout(function(){toast.remove();},4000);
    }
  }
}

function renderCurrentSection26(){
  var content=document.querySelector('.v26-content');
  if(!content) return;
  content.innerHTML='';
  var canvas=document.createElement('canvas');
  canvas.style.cssText='width:100%;height:auto;display:block;cursor:pointer;';
  content.appendChild(canvas);

  var idx=v26State.currentSection;
  if(idx<8) markSection26(idx);

  switch(idx){
    case 0: renderWaterSystem(canvas); break;
    case 1: renderScholarSystem(canvas); break;
    case 2: renderEnviroAnalyzer(canvas); break;
    case 3: renderSpyNetwork(canvas); break;
    case 4: renderRitualSimulator(canvas); break;
    case 5: renderMarketEconomy(canvas); break;
    case 6: renderWallDefense(canvas); break;
    case 7: renderCivilizationIndex(canvas); break;
    case 8: renderV26Quiz(content); return;
  }
}

function renderV26Quiz(container){
  container.innerHTML='';
  if(v26State.quizIdx>=V26_QUIZZES.length){
    container.innerHTML='<div style="text-align:center;padding:30px;"><div style="font-size:48px;">🏆</div><div style="font-size:20px;color:#ffd700;margin:10px 0;font-weight:bold;">퀴즈 완료!</div><div style="font-size:16px;color:#e6edf3;">'+v26State.quizScore+'/'+v26State.quizTotal+' 정답</div><div style="font-size:14px;color:#8b949e;margin-top:8px;">'+Math.round(v26State.quizScore/v26State.quizTotal*100)+'% 정답률</div><button onclick="v26State.quizIdx=0;v26State.quizScore=0;v26State.quizTotal=0;renderCurrentSection26();" style="margin-top:16px;background:#da3633;color:#fff;border:none;padding:10px 24px;border-radius:20px;font-size:14px;cursor:pointer;font-weight:bold;">다시 풀기</button></div>';
    checkV26Achievements();
    return;
  }
  var q=V26_QUIZZES[v26State.quizIdx];
  var html='<div style="padding:10px;"><div style="font-size:12px;color:#8b949e;margin-bottom:8px;">문제 '+(v26State.quizIdx+1)+'/'+V26_QUIZZES.length+'</div>';
  html+='<div class="quiz-question">'+q.q+'</div>';
  for(var i=0;i<q.o.length;i++){
    html+='<button class="quiz-option" data-idx="'+i+'" style="display:block;width:100%;padding:10px 14px;margin-bottom:6px;background:rgba(255,255,255,0.08);border:2px solid rgba(255,255,255,0.15);border-radius:10px;color:#eee;font-size:14px;cursor:pointer;text-align:left;">'+q.o[i]+'</button>';
  }
  html+='<div class="quiz-explain" id="v26-quiz-explain" style="display:none;margin-top:10px;padding:10px;background:rgba(218,54,51,0.1);border-radius:8px;font-size:13px;color:#ff9999;line-height:1.6;">'+q.e+'</div>';
  html+='</div>';
  container.innerHTML=html;

  var btns=container.querySelectorAll('.quiz-option');
  for(var i=0;i<btns.length;i++){
    btns[i].onclick=function(){
      var sel=parseInt(this.getAttribute('data-idx'));
      var correct=sel===q.c;
      v26State.quizTotal++;
      if(correct) v26State.quizScore++;
      v26sfx(correct?'quiz_correct':'quiz_wrong');
      for(var j=0;j<btns.length;j++){
        btns[j].disabled=true;
        btns[j].style.cursor='default';
        if(j===q.c) btns[j].style.cssText+='background:rgba(76,175,80,0.3);border-color:#4caf50;color:#80ff80;';
        else if(j===sel&&!correct) btns[j].style.cssText+='background:rgba(255,64,64,0.3);border-color:#ff4040;color:#ff8080;';
      }
      var exp=document.getElementById('v26-quiz-explain');
      if(exp) exp.style.display='block';
      checkV26Achievements();
      setTimeout(function(){
        v26State.quizIdx++;
        renderCurrentSection26();
      },2500);
    };
  }
}

var V26_SECTIONS = [
  {icon:'🌊',name:'수자원'},
  {icon:'📚',name:'학당'},
  {icon:'🌿',name:'환경'},
  {icon:'🕵️',name:'첩보'},
  {icon:'🎭',name:'제례'},
  {icon:'💰',name:'경제'},
  {icon:'🏰',name:'방어'},
  {icon:'🏛️',name:'문명'},
  {icon:'❓',name:'퀴즈'}
];

function createV26Panel(){
  var existing=document.getElementById('v26-panel');
  if(existing) existing.remove();

  var panel=document.createElement('div');
  panel.id='v26-panel';
  panel.style.cssText='position:fixed;top:90px;right:10px;width:340px;max-height:calc(100vh - 100px);background:rgba(22,27,34,0.97);border:2px solid #da3633;border-radius:12px;z-index:5000;display:none;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.6);';

  var header=document.createElement('div');
  header.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-bottom:1px solid #30363d;';
  header.innerHTML='<span style="color:#da3633;font-weight:bold;font-size:13px;">🏛️ v26 문명 전략 센터</span>';
  var closeBtn=document.createElement('button');
  closeBtn.textContent='✕';
  closeBtn.style.cssText='background:none;border:none;color:#8b949e;font-size:16px;cursor:pointer;';
  closeBtn.onclick=function(){panel.style.display='none';};
  header.appendChild(closeBtn);
  panel.appendChild(header);

  var tabs=document.createElement('div');
  tabs.style.cssText='display:flex;overflow-x:auto;gap:2px;padding:4px;scrollbar-width:none;';
  for(var i=0;i<V26_SECTIONS.length;i++){
    (function(i){
      var tab=document.createElement('div');
      tab.style.cssText='flex-shrink:0;padding:4px 8px;background:'+(i===v26State.currentSection?'#da3633':'#21262d')+';border-radius:6px;cursor:pointer;text-align:center;min-width:44px;font-size:10px;color:#e6edf3;';
      tab.innerHTML='<div style="font-size:16px;">'+V26_SECTIONS[i].icon+'</div><div>'+V26_SECTIONS[i].name+'</div>';
      tab.onclick=function(){
        v26State.currentSection=i;
        v26sfx('section_flip');
        if(i<8) markSection26(i);
        document.getElementById('v26-panel').remove();
        createV26Panel();
        var p=document.getElementById('v26-panel');
        if(p) p.style.display='block';
        renderCurrentSection26();
      };
      tabs.appendChild(tab);
    })(i);
  }
  panel.appendChild(tabs);

  var content=document.createElement('div');
  content.className='v26-content';
  content.style.cssText='overflow-y:auto;max-height:calc(100vh - 200px);';
  panel.appendChild(content);

  document.body.appendChild(panel);
  renderCurrentSection26();
}

function addV26Button(){
  var existing=document.getElementById('v26-main-btn');
  if(existing) return;
  var btn=document.createElement('button');
  btn.id='v26-main-btn';
  btn.textContent='v26';
  btn.title='v26 문명 전략 센터';
  btn.style.cssText='position:fixed;top:50px;right:466px;z-index:4000;background:#da3633;color:#fff;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font:bold 11px sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
  btn.onmouseenter=function(){this.style.background='#f85149';};
  btn.onmouseleave=function(){this.style.background='#da3633';};
  btn.onclick=function(){
    v26sfx('panel_open');
    createV26Panel();
    var panel=document.getElementById('v26-panel');
    if(panel) panel.style.display=panel.style.display==='none'?'block':'none';
  };
  document.body.appendChild(btn);
}

document.addEventListener('keydown',function(e){
  if(!e.shiftKey) return;
  var panel=document.getElementById('v26-panel');

  if(e.key==='Q'){
    e.preventDefault();
    var btn=document.getElementById('v26-main-btn');
    if(btn) btn.click();
    return;
  }

  if(!panel || panel.style.display==='none') return;

  var sectionKeys={'W':0,'E':1,'R':2,'T':3,'Y':4,'U':5,'I':6,'O':7,'P':8};
  var idx=sectionKeys[e.key];
  if(idx!==undefined){
    e.preventDefault();
    v26State.currentSection=idx;
    v26sfx('nav');
    if(idx<8) markSection26(idx);
    document.getElementById('v26-panel').remove();
    createV26Panel();
    var p=document.getElementById('v26-panel');
    if(p) p.style.display='block';
    renderCurrentSection26();
  }
});

function initV26(){
  addV26Button();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initV26);
} else {
  initV26();
}

})();
