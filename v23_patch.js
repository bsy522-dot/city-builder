(function(){
'use strict';

// ===== v23 city-builder patch: 8 Canvas features =====
// 1. 왕실 과거시험 시뮬레이터 (Royal Civil Service Exam)
// 2. 도시 수로 관개 관리기 (Irrigation & Water Channel)
// 3. 고대 농업 계절 플래너 (Agricultural Season Planner)
// 4. 도시 화재방비 시뮬레이터 (Fire Prevention Simulator)
// 5. 왕실 축제 이벤트 플래너 (Festival Event Planner)
// 6. 도시 수공업 길드 관리기 (Artisan Guild Manager)
// 7. 고대 통신 봉수 네트워크 (Beacon Signal Network)
// 8. 도시 민생 복지 대시보드 (Public Welfare Dashboard)

var V23_SFX_CTX = null;
function v23sfx(type){
  try {
    if(!V23_SFX_CTX) V23_SFX_CTX = new (window.AudioContext||window.webkitAudioContext)();
    var c = V23_SFX_CTX, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    var freqs = {
      nav:[440,0.08],exam_start:[523,0.12],exam_pass:[659,0.15],exam_fail:[330,0.1],
      water_flow:[392,0.12],water_build:[494,0.1],farm_plant:[349,0.1],farm_harvest:[587,0.15],
      fire_alert:[880,0.08],fire_fight:[440,0.12],fest_cheer:[698,0.15],fest_plan:[466,0.1],
      guild_craft:[523,0.12],guild_master:[659,0.15],beacon_signal:[784,0.1],beacon_relay:[587,0.08],
      welfare_up:[698,0.12],welfare_down:[294,0.1],quiz_correct:[659,0.12],quiz_wrong:[262,0.1],
      achieve:[784,0.18],panel_open:[440,0.06]
    };
    var f = freqs[type]||[440,0.1];
    o.frequency.setValueAtTime(f[0],t);
    o.type = type==='fire_alert'?'sawtooth':type==='beacon_signal'?'triangle':'sine';
    g.gain.setValueAtTime(0.15,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+f[1]);
    o.start(t); o.stop(t+f[1]+0.05);
  } catch(e){}
}

var V23_COLORS = {
  bg:'#1a1a2e',panel:'#16213e',accent:'#0f3460',highlight:'#e94560',
  text:'#eee',dim:'#999',grid:'#333',
  bars:['#e94560','#0f3460','#e9a045','#45e980','#4590e9','#e945c0','#90e945','#4545e9',
        '#e96045','#45e9c0','#c045e9','#e9e045']
};

// ===== SECTION 1: 왕실 과거시험 시뮬레이터 =====
function renderExamSystem(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = V23_COLORS.highlight; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('왕실 과거시험 시뮬레이터',W/2,25);

  var exams = [
    {name:'문과(대과)',applicants:3000,passRate:3.3,prestige:95,difficulty:98,reward:90,desc:'문관 선발 최고 시험'},
    {name:'무과',applicants:2000,passRate:14,prestige:70,difficulty:75,reward:72,desc:'무관 선발 시험'},
    {name:'잡과',applicants:1500,passRate:20,prestige:45,difficulty:55,reward:50,desc:'기술관 선발 시험'},
    {name:'생원시',applicants:2500,passRate:8,prestige:60,difficulty:70,reward:55,desc:'소과 - 유학 시험'},
    {name:'진사시',applicants:2200,passRate:9,prestige:58,difficulty:68,reward:53,desc:'소과 - 문학 시험'},
    {name:'음서제',applicants:500,passRate:80,prestige:40,difficulty:20,reward:65,desc:'관료 자제 특혜 입관'},
    {name:'천거제',applicants:200,passRate:50,prestige:55,difficulty:40,reward:60,desc:'지방관 추천 선발'},
    {name:'취재시',applicants:800,passRate:25,prestige:35,difficulty:50,reward:40,desc:'하급관리 선발'}
  ];

  var bW = 50, gap = 12, startX = 60, bArea = W - startX - 30;
  var maxApp = 3200;

  ctx.font = '10px sans-serif'; ctx.textAlign = 'right'; ctx.fillStyle = V23_COLORS.dim;
  for(var i=0;i<exams.length;i++){
    var y = 50 + i*42;
    ctx.fillStyle = V23_COLORS.dim; ctx.textAlign = 'right';
    ctx.fillText(exams[i].name, startX-5, y+14);

    var appW = (exams[i].applicants/maxApp)*(bArea*0.5);
    ctx.fillStyle = V23_COLORS.bars[i%12];
    ctx.globalAlpha = 0.8;
    ctx.fillRect(startX, y, appW, 16);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.font = '9px sans-serif';
    ctx.fillText(exams[i].applicants+'명', startX+appW+4, y+12);

    var prW = (exams[i].passRate/100)*(bArea*0.3);
    ctx.fillStyle = exams[i].passRate>30?'#45e980':exams[i].passRate>10?'#e9a045':'#e94560';
    ctx.fillRect(startX, y+18, prW, 8);
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '8px sans-serif';
    ctx.fillText('합격률 '+exams[i].passRate+'%', startX+prW+3, y+26);

    var pBar = (exams[i].prestige/100)*60;
    ctx.fillStyle = '#4590e9'; ctx.globalAlpha = 0.6;
    ctx.fillRect(W-80, y, pBar, 10);
    ctx.globalAlpha = 1;
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '7px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('위상'+exams[i].prestige, W-5, y+9);
  }

  ctx.fillStyle = V23_COLORS.dim; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('■ 응시자 수 (수평 바)  ■ 합격률 (하단 바)  ■ 위상 (우측)',W/2,H-15);

  var total = exams.reduce(function(s,e){return s+Math.round(e.applicants*e.passRate/100);},0);
  ctx.fillStyle = '#45e980'; ctx.font = 'bold 12px sans-serif';
  ctx.fillText('총 선발 인원: '+total+'명',W/2,H-35);

  var grade = total>600?'S':total>400?'A':total>250?'B':total>100?'C':'D';
  ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':'#e9a045';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('인재 확보 등급: '+grade,W/2,H-55);
}

// ===== SECTION 2: 도시 수로 관개 관리기 =====
function renderIrrigation(canvas){
  var ctx = canvas.getContext('2d');
  var W = 640, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#4590e9'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 수로 관개 관리기',W/2,25);

  var channels = [
    {name:'왕궁 수로',capacity:95,flow:88,age:120,condition:72,coverage:90,type:'주수로'},
    {name:'시장 급수로',capacity:80,flow:75,condition:65,age:80,coverage:85,type:'지선'},
    {name:'농지 관개수로',capacity:100,flow:92,condition:80,age:200,coverage:95,type:'관개'},
    {name:'성곽 해자',capacity:70,flow:45,condition:55,age:300,coverage:60,type:'방어'},
    {name:'사찰 연못수로',capacity:40,flow:35,condition:85,age:150,coverage:40,type:'경관'},
    {name:'주거지 우물망',capacity:60,flow:50,condition:70,age:100,coverage:75,type:'생활'},
    {name:'배수 하수로',capacity:85,flow:80,condition:60,age:90,coverage:88,type:'배수'},
    {name:'저수지 수문',capacity:120,flow:100,condition:78,age:250,coverage:92,type:'저수'}
  ];

  var nodeR = 28, cx = W/2, cy = H/2+10;
  var positions = [];
  for(var i=0;i<channels.length;i++){
    var ang = (i/channels.length)*Math.PI*2 - Math.PI/2;
    positions.push({x:cx+Math.cos(ang)*140, y:cy+Math.sin(ang)*130});
  }

  ctx.strokeStyle = '#4590e9'; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.4;
  for(var i=0;i<channels.length;i++){
    for(var j=i+1;j<channels.length;j++){
      if(Math.abs(i-j)<=2 || (i===0&&j===channels.length-1)){
        ctx.beginPath();
        ctx.moveTo(positions[i].x,positions[i].y);
        ctx.lineTo(positions[j].x,positions[j].y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.moveTo(cx,cy); ctx.lineTo(positions[i].x,positions[i].y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2);
  ctx.fillStyle = '#0f3460'; ctx.fill();
  ctx.strokeStyle = '#4590e9'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif';
  ctx.fillText('중앙',cx,cy-3); ctx.fillText('수원지',cx,cy+8);

  for(var i=0;i<channels.length;i++){
    var p = positions[i], ch = channels[i];
    var cond = ch.condition;
    var col = cond>75?'#45e980':cond>50?'#e9a045':'#e94560';

    ctx.beginPath(); ctx.arc(p.x,p.y,nodeR,0,Math.PI*2);
    ctx.fillStyle = V23_COLORS.panel; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();

    var flowArc = (ch.flow/ch.capacity)*Math.PI*2;
    ctx.beginPath(); ctx.arc(p.x,p.y,nodeR+3,-Math.PI/2,-Math.PI/2+flowArc);
    ctx.strokeStyle = '#4590e9'; ctx.lineWidth = 3; ctx.stroke();

    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(ch.name,p.x,p.y-8);
    ctx.fillStyle = col; ctx.font = '8px sans-serif';
    ctx.fillText('상태 '+cond+'%',p.x,p.y+4);
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '7px sans-serif';
    ctx.fillText(ch.type+' | '+ch.flow+'/'+ch.capacity,p.x,p.y+14);
  }

  var totalCov = Math.round(channels.reduce(function(s,c){return s+c.coverage;},0)/channels.length);
  ctx.fillStyle = '#4590e9'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('관개 커버리지: '+totalCov+'%  |  수로 8개소 네트워크',W/2,H-15);
}

// ===== SECTION 3: 고대 농업 계절 플래너 =====
function renderFarmPlanner(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 380;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#45e980'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('고대 농업 계절 플래너',W/2,25);

  var crops = ['벼','보리','콩','조','수수','기장','밀','삼(마)'];
  var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  var data = [
    [0,0,1,2,3,4,5,5,4,3,0,0],
    [2,3,3,4,5,5,3,0,0,1,2,2],
    [0,0,0,1,2,3,4,5,5,4,0,0],
    [0,0,1,2,3,4,5,5,4,2,0,0],
    [0,0,0,1,2,3,4,5,5,3,0,0],
    [0,0,1,2,3,4,5,4,3,1,0,0],
    [1,2,3,4,5,4,0,0,0,1,2,2],
    [0,0,1,2,3,4,5,5,4,3,0,0]
  ];

  var cellW = 38, cellH = 30, startX = 75, startY = 50;

  ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  for(var m=0;m<12;m++){
    ctx.fillText(months[m],startX+m*cellW+cellW/2,startY-5);
  }
  ctx.textAlign = 'right';
  for(var c=0;c<crops.length;c++){
    ctx.fillText(crops[c],startX-5,startY+c*cellH+cellH/2+3);
  }

  var heatColors = ['#1a1a2e','#0f3460','#1a6b3a','#45e980','#e9e045','#e94560'];
  for(var c=0;c<crops.length;c++){
    for(var m=0;m<12;m++){
      var v = data[c][m];
      ctx.fillStyle = heatColors[v];
      ctx.fillRect(startX+m*cellW,startY+c*cellH,cellW-2,cellH-2);
      if(v>0){
        ctx.fillStyle = v>3?'#000':'#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        var labels = ['','파종','성장','성장','수확기','최적'];
        ctx.fillText(labels[v],startX+m*cellW+cellW/2-1,startY+c*cellH+cellH/2+3);
      }
    }
  }

  ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  var legendY = startY + crops.length*cellH + 25;
  var legendLabels = ['휴경','파종','성장','성장','수확기','최적'];
  for(var i=0;i<6;i++){
    ctx.fillStyle = heatColors[i];
    ctx.fillRect(startX+i*80,legendY,14,14);
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif';
    ctx.fillText(legendLabels[i],startX+i*80+18,legendY+11);
  }

  var yieldData = [85,72,68,55,50,45,70,60];
  var yieldY = legendY + 35;
  ctx.fillStyle = '#45e980'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('작물별 예상 수확량 (석/결)',W/2,yieldY);
  var maxY = 90;
  for(var i=0;i<crops.length;i++){
    var bw = 50, bx = startX+10+i*(bw+12);
    var bh = (yieldData[i]/maxY)*50;
    ctx.fillStyle = V23_COLORS.bars[i];
    ctx.fillRect(bx,yieldY+60-bh,bw,bh);
    ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(yieldData[i],bx+bw/2,yieldY+60-bh-4);
    ctx.fillStyle = V23_COLORS.dim;
    ctx.fillText(crops[i],bx+bw/2,yieldY+72);
  }
}

// ===== SECTION 4: 도시 화재방비 시뮬레이터 =====
function renderFirePrevention(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e94560'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 화재방비 시뮬레이터',W/2,25);

  var districts = ['궁궐','시장','주거','사찰','관아','창고','성문','항구'];
  var riskLevels = [
    [2,3,4,5,3,2,1,2],
    [3,5,4,3,4,5,3,2],
    [1,2,3,4,5,4,3,2],
    [2,3,4,3,2,3,4,3],
    [1,1,2,3,4,3,2,1],
    [3,4,5,4,3,4,5,4],
    [2,3,3,2,1,2,3,2],
    [1,2,2,3,3,2,1,1]
  ];

  var cellSize = 42, startX = 90, startY = 55;
  var riskColors = ['#1a6b3a','#45e980','#e9e045','#e9a045','#e94560'];

  ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  for(var j=0;j<8;j++){
    ctx.fillText(districts[j],startX+j*cellSize+cellSize/2,startY-5);
  }
  var timeSlots = ['새벽','아침','오전','정오','오후','저녁','초저녁','밤'];
  ctx.textAlign = 'right';
  for(var i=0;i<8;i++){
    ctx.fillText(timeSlots[i],startX-5,startY+i*cellSize+cellSize/2+3);
  }

  for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
      var v = riskLevels[i][j];
      ctx.fillStyle = riskColors[v-1];
      ctx.globalAlpha = 0.8;
      ctx.fillRect(startX+j*cellSize,startY+i*cellSize,cellSize-2,cellSize-2);
      ctx.globalAlpha = 1;
      ctx.fillStyle = v>=4?'#fff':'#ddd'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(v,startX+j*cellSize+cellSize/2-1,startY+i*cellSize+cellSize/2+4);
    }
  }

  var legendY = startY+8*cellSize+15;
  ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  var rLabels = ['1-안전','2-주의','3-경계','4-위험','5-긴급'];
  for(var i=0;i<5;i++){
    ctx.fillStyle = riskColors[i];
    ctx.fillRect(startX+i*90,legendY,14,14);
    ctx.fillStyle = V23_COLORS.dim;
    ctx.fillText(rLabels[i],startX+i*90+18,legendY+11);
  }

  var brigades = [
    {name:'금화도감',strength:85,speed:90,coverage:75},
    {name:'멸화군',strength:78,speed:85,coverage:80},
    {name:'수성군',strength:70,speed:70,coverage:65}
  ];
  var brY = legendY + 30;
  ctx.fillStyle = '#e94560'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('소방 병력 배치 현황',W/2,brY);
  for(var b=0;b<brigades.length;b++){
    var bx = 90+b*190;
    ctx.fillStyle = V23_COLORS.panel;
    ctx.fillRect(bx,brY+8,170,40);
    ctx.strokeStyle = '#e94560'; ctx.lineWidth = 1; ctx.strokeRect(bx,brY+8,170,40);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(brigades[b].name,bx+85,brY+22);
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '8px sans-serif';
    ctx.fillText('화력'+brigades[b].strength+' 속도'+brigades[b].speed+' 범위'+brigades[b].coverage+'%',bx+85,brY+40);
  }
}

// ===== SECTION 5: 왕실 축제 이벤트 플래너 =====
function renderFestivalPlanner(canvas){
  var ctx = canvas.getContext('2d');
  var W = 600, H = 380;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e9a045'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('왕실 축제 이벤트 플래너',W/2,25);

  var festivals = [
    {name:'정월대보름',pop:92,cost:65,morale:88,culture:85,participation:90},
    {name:'한식(寒食)',pop:70,cost:40,morale:72,culture:80,participation:65},
    {name:'단오',pop:95,cost:80,morale:92,culture:90,participation:95},
    {name:'추석',pop:98,cost:90,morale:95,culture:92,participation:98},
    {name:'동지',pop:60,cost:35,morale:65,culture:70,participation:55},
    {name:'왕실연회',pop:45,cost:95,morale:50,culture:88,participation:30},
    {name:'과거급제연',pop:55,cost:70,morale:75,culture:82,participation:40},
    {name:'풍년제',pop:85,cost:55,morale:90,culture:78,participation:88},
    {name:'군사열병식',pop:72,cost:85,morale:80,culture:65,participation:60},
    {name:'수확감사제',pop:88,cost:50,morale:85,culture:75,participation:85}
  ];

  var cx = W/2, cy = 185, R = 110;
  var axes = ['인기도','비용','사기','문화','참여율'];
  var axisCount = 5;

  for(var level=5;level>=1;level--){
    var r = R*(level/5);
    ctx.beginPath();
    for(var a=0;a<axisCount;a++){
      var ang = (a/axisCount)*Math.PI*2 - Math.PI/2;
      var px = cx+Math.cos(ang)*r, py = cy+Math.sin(ang)*r;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle = V23_COLORS.grid; ctx.lineWidth = 0.5; ctx.stroke();
  }

  for(var a=0;a<axisCount;a++){
    var ang = (a/axisCount)*Math.PI*2 - Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
    ctx.strokeStyle = V23_COLORS.grid; ctx.lineWidth = 0.5; ctx.stroke();
    ctx.fillStyle = V23_COLORS.text; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(axes[a],cx+Math.cos(ang)*(R+18),cy+Math.sin(ang)*(R+18)+4);
  }

  var topFests = [festivals[3],festivals[2],festivals[0]];
  var festColors = ['#e94560','#4590e9','#45e980'];
  for(var f=0;f<topFests.length;f++){
    var fest = topFests[f];
    var vals = [fest.pop,fest.cost,fest.morale,fest.culture,fest.participation];
    ctx.beginPath();
    for(var a=0;a<axisCount;a++){
      var ang = (a/axisCount)*Math.PI*2 - Math.PI/2;
      var vr = (vals[a]/100)*R;
      var px = cx+Math.cos(ang)*vr, py = cy+Math.sin(ang)*vr;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle = festColors[f]; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = festColors[f]; ctx.globalAlpha = 0.1; ctx.fill(); ctx.globalAlpha = 1;
  }

  ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  for(var f=0;f<topFests.length;f++){
    ctx.fillStyle = festColors[f];
    ctx.fillRect(W-140,50+f*18,10,10);
    ctx.fillStyle = V23_COLORS.text;
    ctx.fillText(topFests[f].name,W-125,50+f*18+9);
  }

  var tableY = 310;
  ctx.fillStyle = V23_COLORS.dim; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
  for(var i=0;i<festivals.length;i++){
    var tx = 30+i*58;
    ctx.fillStyle = V23_COLORS.bars[i%12]; ctx.globalAlpha = 0.6;
    var bh = (festivals[i].pop/100)*40;
    ctx.fillRect(tx,tableY-bh,50,bh);
    ctx.globalAlpha = 1;
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '7px sans-serif';
    ctx.fillText(festivals[i].name.substring(0,4),tx+25,tableY+12);
  }
  ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif';
  ctx.fillText('10대 축제 인기도 비교',W/2,H-8);
}

// ===== SECTION 6: 도시 수공업 길드 관리기 =====
function renderGuildManager(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 380;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#c045e9'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 수공업 길드 관리기',W/2,25);

  var guilds = [
    {name:'도자기공방',skill:90,production:85,revenue:88,members:45,quality:92,reputation:87},
    {name:'철기대장간',skill:88,production:90,revenue:82,members:38,quality:85,reputation:80},
    {name:'비단직조소',skill:85,production:75,revenue:95,members:52,quality:90,reputation:92},
    {name:'목공작업장',skill:82,production:88,revenue:70,members:40,quality:78,reputation:75},
    {name:'금은세공소',skill:95,production:60,revenue:98,members:20,quality:96,reputation:95},
    {name:'염색공방',skill:78,production:80,revenue:72,members:35,quality:80,reputation:70},
    {name:'제지공방',skill:80,production:85,revenue:68,members:30,quality:82,reputation:78},
    {name:'칠기공방',skill:88,production:65,revenue:85,members:25,quality:90,reputation:88},
    {name:'석공작업장',skill:75,production:70,revenue:60,members:42,quality:72,reputation:65},
    {name:'가죽공방',skill:70,production:82,revenue:65,members:28,quality:68,reputation:62}
  ];

  var axes6 = ['기술력','생산량','수익성','인원','품질','명성'];
  var cx = 180, cy = 195, R = 100;

  for(var lv=5;lv>=1;lv--){
    var r = R*(lv/5);
    ctx.beginPath();
    for(var a=0;a<6;a++){
      var ang = (a/6)*Math.PI*2 - Math.PI/2;
      var px = cx+Math.cos(ang)*r, py = cy+Math.sin(ang)*r;
      if(a===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle = V23_COLORS.grid; ctx.lineWidth = 0.5; ctx.stroke();
  }
  for(var a=0;a<6;a++){
    var ang = (a/6)*Math.PI*2 - Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
    ctx.strokeStyle = V23_COLORS.grid; ctx.stroke();
    ctx.fillStyle = V23_COLORS.text; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(axes6[a],cx+Math.cos(ang)*(R+16),cy+Math.sin(ang)*(R+16)+3);
  }

  var topGuilds = [guilds[4],guilds[0],guilds[2]];
  var gColors = ['#ffd700','#e94560','#4590e9'];
  for(var g=0;g<topGuilds.length;g++){
    var gd = topGuilds[g];
    var vals = [gd.skill,gd.production,gd.revenue,gd.members*2,gd.quality,gd.reputation];
    ctx.beginPath();
    for(var a=0;a<6;a++){
      var ang = (a/6)*Math.PI*2 - Math.PI/2;
      var vr = (vals[a]/100)*R;
      if(a===0) ctx.moveTo(cx+Math.cos(ang)*vr,cy+Math.sin(ang)*vr);
      else ctx.lineTo(cx+Math.cos(ang)*vr,cy+Math.sin(ang)*vr);
    }
    ctx.closePath();
    ctx.strokeStyle = gColors[g]; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = gColors[g]; ctx.globalAlpha = 0.08; ctx.fill(); ctx.globalAlpha = 1;
  }

  ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  for(var g=0;g<3;g++){
    ctx.fillStyle = gColors[g]; ctx.fillRect(20,330+g*16,10,10);
    ctx.fillStyle = V23_COLORS.text; ctx.fillText(topGuilds[g].name,35,330+g*16+9);
  }

  var listX = 330, listY = 50;
  ctx.fillStyle = '#c045e9'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('전체 길드 순위 (종합 점수)',listX,listY);

  guilds.sort(function(a,b){
    var sa = (a.skill+a.production+a.revenue+a.quality+a.reputation)/5;
    var sb = (b.skill+b.production+b.revenue+b.quality+b.reputation)/5;
    return sb-sa;
  });

  for(var i=0;i<guilds.length;i++){
    var gy = listY+18+i*28;
    var score = Math.round((guilds[i].skill+guilds[i].production+guilds[i].revenue+guilds[i].quality+guilds[i].reputation)/5);
    var grade = score>=90?'S':score>=80?'A':score>=70?'B':score>=60?'C':'D';
    var gcol = grade==='S'?'#ffd700':grade==='A'?'#45e980':grade==='B'?'#4590e9':grade==='C'?'#e9a045':'#e94560';

    ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif';
    ctx.fillText((i+1)+'. '+guilds[i].name,listX,gy);

    var barW = (score/100)*120;
    ctx.fillStyle = gcol; ctx.globalAlpha = 0.7;
    ctx.fillRect(listX,gy+3,barW,10);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText(score+' ('+grade+')',listX+barW+5,gy+12);
  }
}

// ===== SECTION 7: 고대 통신 봉수 네트워크 =====
function renderBeaconNetwork(canvas){
  var ctx = canvas.getContext('2d');
  var W = 640, H = 400;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#e9a045'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('고대 통신 봉수 네트워크',W/2,25);

  var beacons = [
    {name:'도성 봉수대',x:320,y:200,type:'중앙',signal:100,range:50,status:'정상'},
    {name:'북방 1봉',x:280,y:80,type:'변경',signal:85,range:40,status:'정상'},
    {name:'북방 2봉',x:380,y:90,type:'변경',signal:78,range:38,status:'주의'},
    {name:'동해 봉수',x:520,y:140,type:'해안',signal:82,range:45,status:'정상'},
    {name:'남해 봉수',x:450,y:320,type:'해안',signal:75,range:42,status:'정상'},
    {name:'서해 봉수',x:130,y:250,type:'해안',signal:70,range:35,status:'주의'},
    {name:'내륙 중계',x:220,y:160,type:'중계',signal:90,range:48,status:'정상'},
    {name:'산성 봉수',x:460,y:220,type:'산성',signal:88,range:50,status:'정상'}
  ];

  var connections = [
    [0,1],[0,2],[0,6],[0,7],[1,6],[2,3],[3,7],[4,7],[5,6],[1,2],[4,5]
  ];

  ctx.lineWidth = 1.5;
  for(var c=0;c<connections.length;c++){
    var a = beacons[connections[c][0]], b = beacons[connections[c][1]];
    var grad = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
    grad.addColorStop(0,'#e9a045'); grad.addColorStop(1,'#e94560');
    ctx.strokeStyle = grad; ctx.globalAlpha = 0.4;
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();

    ctx.globalAlpha = 0.6;
    var mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
    var dist = Math.round(Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))/3);
    ctx.fillStyle = V23_COLORS.dim; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(dist+'리',mx,my-3);
  }
  ctx.globalAlpha = 1;

  for(var i=0;i<beacons.length;i++){
    var bk = beacons[i];
    var statusCol = bk.status==='정상'?'#45e980':'#e9a045';

    ctx.beginPath(); ctx.arc(bk.x,bk.y,bk.range/3,0,Math.PI*2);
    ctx.fillStyle = statusCol; ctx.globalAlpha = 0.08; ctx.fill(); ctx.globalAlpha = 1;

    var r = bk.type==='중앙'?16:12;
    if(bk.type==='중앙'){
      ctx.beginPath();
      ctx.moveTo(bk.x,bk.y-r); ctx.lineTo(bk.x+r,bk.y+r); ctx.lineTo(bk.x-r,bk.y+r);
      ctx.closePath();
      ctx.fillStyle = '#e94560'; ctx.fill();
      ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(bk.x,bk.y,r,0,Math.PI*2);
      ctx.fillStyle = V23_COLORS.panel; ctx.fill();
      ctx.strokeStyle = statusCol; ctx.lineWidth = 2; ctx.stroke();
    }

    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(bk.name,bk.x,bk.y-r-6);
    ctx.fillStyle = statusCol; ctx.font = '7px sans-serif';
    ctx.fillText(bk.type+' | 신호'+bk.signal+'%',bk.x,bk.y+r+12);
  }

  ctx.fillStyle = V23_COLORS.dim; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  var statY = H-60;
  ctx.fillStyle = V23_COLORS.panel;
  ctx.fillRect(20,statY,W-40,50);
  ctx.strokeStyle = '#e9a045'; ctx.lineWidth = 1; ctx.strokeRect(20,statY,W-40,50);

  ctx.fillStyle = '#e9a045'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('네트워크 현황',W/2,statY+14);

  var totalSignal = Math.round(beacons.reduce(function(s,b){return s+b.signal;},0)/beacons.length);
  var normalCount = beacons.filter(function(b){return b.status==='정상';}).length;

  ctx.fillStyle = V23_COLORS.text; ctx.font = '9px sans-serif';
  ctx.fillText('봉수대: '+beacons.length+'개소  |  연결: '+connections.length+'개  |  평균 신호: '+totalSignal+'%  |  정상: '+normalCount+'/'+beacons.length,W/2,statY+32);

  var grade = totalSignal>85?'S':totalSignal>75?'A':totalSignal>65?'B':totalSignal>50?'C':'D';
  ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':'#e9a045';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('통신망 등급: '+grade,W/2,statY+46);
}

// ===== SECTION 8: 도시 민생 복지 대시보드 =====
function renderWelfareDashboard(canvas){
  var ctx = canvas.getContext('2d');
  var W = 620, H = 380;
  canvas.width = W; canvas.height = H;
  ctx.fillStyle = V23_COLORS.bg; ctx.fillRect(0,0,W,H);

  ctx.fillStyle = '#45e9c0'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('도시 민생 복지 대시보드',W/2,25);

  var metrics = [
    {name:'식량 안보',value:82,icon:'食',desc:'곡물 비축량, 배급 효율'},
    {name:'의료 접근',value:68,icon:'醫',desc:'의원 수, 약재 보급'},
    {name:'주거 안정',value:75,icon:'住',desc:'주택 보급률, 주거 질'},
    {name:'교육 기회',value:78,icon:'學',desc:'서당/향교 접근성'},
    {name:'치안 안전',value:85,icon:'安',desc:'순찰 빈도, 범죄율'},
    {name:'세금 공정',value:62,icon:'稅',desc:'조세 부담, 공정성'},
    {name:'재해 대비',value:70,icon:'災',desc:'방재 시설, 구호 체계'},
    {name:'문화 향유',value:72,icon:'文',desc:'축제, 공연, 교류'}
  ];

  var cols = 4, rows = 2;
  var gW = 120, gH = 120, gapX = 20, gapY = 20;
  var startX = (W - cols*(gW+gapX) + gapX)/2;
  var startY = 50;

  for(var i=0;i<metrics.length;i++){
    var row = Math.floor(i/cols), col = i%cols;
    var gx = startX + col*(gW+gapX), gy = startY + row*(gH+gapY);
    var m = metrics[i];

    ctx.fillStyle = V23_COLORS.panel;
    ctx.fillRect(gx,gy,gW,gH);
    ctx.strokeStyle = V23_COLORS.accent; ctx.lineWidth = 1; ctx.strokeRect(gx,gy,gW,gH);

    var gcx = gx+gW/2, gcy = gy+45, gR = 35;
    var startAng = Math.PI*0.8, endAng = Math.PI*2.2;
    var totalArc = endAng - startAng;

    ctx.beginPath(); ctx.arc(gcx,gcy,gR,startAng,endAng);
    ctx.strokeStyle = V23_COLORS.grid; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();

    var valAng = startAng + (m.value/100)*totalArc;
    var col2 = m.value>=80?'#45e980':m.value>=65?'#e9a045':m.value>=50?'#e9e045':'#e94560';
    ctx.beginPath(); ctx.arc(gcx,gcy,gR,startAng,valAng);
    ctx.strokeStyle = col2; ctx.lineWidth = 8; ctx.stroke();
    ctx.lineCap = 'butt';

    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(m.value+'%',gcx,gcy+6);

    ctx.fillStyle = col2; ctx.font = 'bold 10px sans-serif';
    ctx.fillText(m.name,gcx,gy+14);

    ctx.fillStyle = V23_COLORS.dim; ctx.font = '7px sans-serif';
    ctx.fillText(m.desc,gcx,gy+gH-6);

    var grade = m.value>=85?'S':m.value>=75?'A':m.value>=65?'B':m.value>=50?'C':'D';
    ctx.fillStyle = grade==='S'?'#ffd700':grade==='A'?'#45e980':grade==='B'?'#4590e9':'#e9a045';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(grade,gcx,gcy+22);
  }

  var overall = Math.round(metrics.reduce(function(s,m){return s+m.value;},0)/metrics.length);
  var oGrade = overall>=85?'S':overall>=75?'A':overall>=65?'B':overall>=50?'C':'D';
  var oCol = oGrade==='S'?'#ffd700':oGrade==='A'?'#45e980':'#e9a045';

  ctx.fillStyle = oCol; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('종합 민생 복지 지수: '+overall+'% ('+oGrade+'등급)',W/2,H-18);
}

// ===== QUIZ v23: 15 questions =====
var V23_QUIZ = [
  {q:'조선시대 문과 대과의 최종 합격자 수는 보통 몇 명이었나?',a:['33명','100명','10명','50명'],c:0},
  {q:'봉수제도에서 평시에 올리는 봉화의 수는?',a:['1거','2거','3거','5거'],c:0},
  {q:'조선시대 금화도감의 주요 역할은?',a:['화재 예방/진압','세금 징수','외교 업무','군사 훈련'],c:0},
  {q:'고대 관개 수리시설 중 김제 벽골제는 언제 축조되었나?',a:['백제 비류왕 때','고구려 광개토왕 때','신라 법흥왕 때','고조선 시대'],c:0},
  {q:'조선시대 잡과에 해당하지 않는 것은?',a:['문과','역과','의과','율과'],c:0},
  {q:'전통 농업에서 이앙법(모내기법)이 널리 보급된 시기는?',a:['조선 후기','고려 시대','삼국 시대','고조선'],c:0},
  {q:'조선시대 5일장이 열리는 시장을 무엇이라 했나?',a:['장시','난전','시전','육의전'],c:0},
  {q:'봉수 통신에서 적이 국경에 나타났을 때 올리는 봉화 수는?',a:['2거','1거','3거','5거'],c:0},
  {q:'SimCity에서 도시 행복도에 영향을 주지 않는 요소는?',a:['날씨','교육','의료','치안'],c:0},
  {q:'조선시대 과거시험 중 무과의 시험 과목이 아닌 것은?',a:['서예','무예','병서','기사'],c:0},
  {q:'TheoTown에서 도시 건설 시 가장 먼저 배치해야 하는 것은?',a:['도로','공원','상업지구','관공서'],c:0},
  {q:'고대 도시에서 화재에 가장 취약했던 구역은?',a:['시장 구역','성곽','석조 관아','사찰'],c:0},
  {q:'조선시대 향약의 주요 기능으로 옳지 않은 것은?',a:['군사 훈련','덕업상권','과실상규','환난상휼'],c:0},
  {q:'전통 수공업에서 고려청자의 주요 생산지는?',a:['강진/부안','경주','개성','한양'],c:0},
  {q:'조선시대 봉수 네트워크의 최종 도달지는 어디인가?',a:['남산 목멱산','경복궁','한양 성곽','종묘'],c:0}
];

// ===== ACHIEVEMENTS v23: 12 achievements =====
var V23_ACHIEVEMENTS = [
  {id:'exam_admin',name:'과거 시험관',desc:'과거시험 시뮬레이터 실행'},
  {id:'water_master',name:'수리 달인',desc:'관개 시스템 분석 완료'},
  {id:'farm_planner',name:'농업 전략가',desc:'농업 계절 플래너 확인'},
  {id:'fire_chief',name:'금화도감장',desc:'화재방비 히트맵 분석'},
  {id:'festival_host',name:'축제 주관자',desc:'축제 이벤트 플래너 실행'},
  {id:'guild_master_v23',name:'장인의 스승',desc:'길드 관리기 확인'},
  {id:'beacon_commander',name:'봉수 지휘관',desc:'봉수 네트워크 분석'},
  {id:'welfare_minister',name:'민생 장관',desc:'복지 대시보드 확인'},
  {id:'quiz_v23_master',name:'퀴즈 마스터 v23',desc:'v23 퀴즈 전문 달성'},
  {id:'v23_explorer',name:'v23 탐험가',desc:'v23 기능 4개 이상 확인'},
  {id:'v23_complete',name:'v23 정복자',desc:'v23 전체 기능 완료'},
  {id:'civil_service',name:'인재 등용관',desc:'과거+길드+복지 모두 확인'}
];

// ===== PANEL & UI =====
var v23State = {
  currentSection: 0,
  quizIndex: 0,
  quizScore: 0,
  quizActive: false,
  achievements: {},
  sectionsVisited: {}
};

function unlockAchievement(id){
  if(v23State.achievements[id]) return;
  v23State.achievements[id] = true;
  v23sfx('achieve');
  var ach = V23_ACHIEVEMENTS.find(function(a){return a.id===id;});
  if(!ach) return;
  var toast = document.createElement('div');
  toast.textContent = '업적 해금: '+ach.name;
  toast.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#ffd700;color:#000;padding:8px 18px;border-radius:8px;font:bold 13px sans-serif;z-index:99999;pointer-events:none;';
  document.body.appendChild(toast);
  setTimeout(function(){toast.remove();},2500);
}

function markSection(idx){
  v23State.sectionsVisited[idx] = true;
  var visited = Object.keys(v23State.sectionsVisited).length;
  var achMap = [
    'exam_admin','water_master','farm_planner','fire_chief',
    'festival_host','guild_master_v23','beacon_commander','welfare_minister'
  ];
  if(achMap[idx]) unlockAchievement(achMap[idx]);
  if(visited>=4) unlockAchievement('v23_explorer');
  if(visited>=8) unlockAchievement('v23_complete');
  if(v23State.sectionsVisited[0]&&v23State.sectionsVisited[5]&&v23State.sectionsVisited[7])
    unlockAchievement('civil_service');
}

function createV23Panel(){
  if(document.getElementById('v23-panel')) return;
  var overlay = document.createElement('div');
  overlay.id = 'v23-panel';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:none;overflow-y:auto;';

  var container = document.createElement('div');
  container.style.cssText = 'max-width:680px;margin:20px auto;padding:20px;';

  var header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;';

  var title = document.createElement('h2');
  title.textContent = 'v23 도시 행정 관리 허브';
  title.style.cssText = 'color:#45e9c0;margin:0;font-size:18px;';

  var closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.style.cssText = 'background:#e94560;color:#fff;border:none;padding:6px 14px;border-radius:4px;cursor:pointer;font-weight:bold;';
  closeBtn.onclick = function(){ overlay.style.display='none'; };

  header.appendChild(title);
  header.appendChild(closeBtn);
  container.appendChild(header);

  var tabBar = document.createElement('div');
  tabBar.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;';
  var sectionNames = [
    '과거시험','수로관개','농업계절','화재방비',
    '축제이벤트','수공업길드','봉수네트워크','민생복지'
  ];
  var sectionColors = ['#e94560','#4590e9','#45e980','#e94560','#e9a045','#c045e9','#e9a045','#45e9c0'];

  for(var i=0;i<8;i++){
    (function(idx){
      var tab = document.createElement('button');
      tab.textContent = (idx+1)+'.'+sectionNames[idx];
      tab.className = 'v23-tab';
      tab.style.cssText = 'background:'+sectionColors[idx]+'22;color:'+sectionColors[idx]+';border:1px solid '+sectionColors[idx]+'55;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;';
      tab.onmouseenter = function(){this.style.background=sectionColors[idx]+'44';};
      tab.onmouseleave = function(){this.style.background=sectionColors[idx]+'22';};
      tab.onclick = function(){
        v23State.currentSection = idx;
        v23sfx('nav');
        renderCurrentSection();
        markSection(idx);
      };
      tabBar.appendChild(tab);
    })(i);
  }

  var quizTab = document.createElement('button');
  quizTab.textContent = 'Q.퀴즈';
  quizTab.style.cssText = 'background:#ffd70022;color:#ffd700;border:1px solid #ffd70055;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:bold;';
  quizTab.onclick = function(){
    v23State.currentSection = 8;
    v23sfx('nav');
    renderCurrentSection();
  };
  tabBar.appendChild(quizTab);
  container.appendChild(tabBar);

  var canvasWrap = document.createElement('div');
  canvasWrap.id = 'v23-canvas-wrap';
  canvasWrap.style.cssText = 'text-align:center;overflow-x:auto;';

  var canvas = document.createElement('canvas');
  canvas.id = 'v23-canvas';
  canvas.style.cssText = 'max-width:100%;border:1px solid #333;border-radius:8px;';
  canvasWrap.appendChild(canvas);
  container.appendChild(canvasWrap);

  var quizDiv = document.createElement('div');
  quizDiv.id = 'v23-quiz-area';
  quizDiv.style.cssText = 'display:none;background:#16213e;padding:15px;border-radius:8px;margin-top:10px;';
  container.appendChild(quizDiv);

  var achDiv = document.createElement('div');
  achDiv.id = 'v23-ach-area';
  achDiv.style.cssText = 'margin-top:12px;background:#16213e;padding:10px;border-radius:8px;';

  var achTitle = document.createElement('div');
  achTitle.style.cssText = 'color:#ffd700;font:bold 12px sans-serif;margin-bottom:8px;';
  achTitle.textContent = 'v23 업적 ('+V23_ACHIEVEMENTS.length+'개)';
  achDiv.appendChild(achTitle);

  var achGrid = document.createElement('div');
  achGrid.id = 'v23-ach-grid';
  achGrid.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
  achDiv.appendChild(achGrid);
  container.appendChild(achDiv);

  overlay.appendChild(container);
  document.body.appendChild(overlay);

  renderCurrentSection();
  updateAchievementGrid();
}

function updateAchievementGrid(){
  var grid = document.getElementById('v23-ach-grid');
  if(!grid) return;
  grid.innerHTML = '';
  for(var i=0;i<V23_ACHIEVEMENTS.length;i++){
    var a = V23_ACHIEVEMENTS[i];
    var unlocked = v23State.achievements[a.id];
    var badge = document.createElement('div');
    badge.style.cssText = 'padding:4px 8px;border-radius:4px;font-size:10px;' +
      (unlocked?'background:#ffd70033;color:#ffd700;border:1px solid #ffd700;':'background:#33333366;color:#666;border:1px solid #444;');
    badge.textContent = (unlocked?'':'?? ')+a.name;
    badge.title = a.desc;
    grid.appendChild(badge);
  }
}

function renderCurrentSection(){
  var canvas = document.getElementById('v23-canvas');
  var quizArea = document.getElementById('v23-quiz-area');
  if(!canvas || !quizArea) return;

  if(v23State.currentSection === 8){
    canvas.style.display = 'none';
    quizArea.style.display = 'block';
    renderQuiz();
    return;
  }

  canvas.style.display = 'block';
  quizArea.style.display = 'none';

  var renderers = [
    renderExamSystem, renderIrrigation, renderFarmPlanner, renderFirePrevention,
    renderFestivalPlanner, renderGuildManager, renderBeaconNetwork, renderWelfareDashboard
  ];
  renderers[v23State.currentSection](canvas);
  updateAchievementGrid();
}

function renderQuiz(){
  var area = document.getElementById('v23-quiz-area');
  if(!area) return;

  if(v23State.quizIndex >= V23_QUIZ.length){
    var pct = Math.round((v23State.quizScore/V23_QUIZ.length)*100);
    var grade = pct>=90?'S':pct>=75?'A':pct>=60?'B':pct>=40?'C':'D';
    area.innerHTML = '<div style="text-align:center;color:#ffd700;font:bold 16px sans-serif;">퀴즈 완료!</div>' +
      '<div style="text-align:center;color:#eee;font:14px sans-serif;margin-top:10px;">'+v23State.quizScore+'/'+V23_QUIZ.length+' ('+pct+'%) - '+grade+'등급</div>' +
      '<button onclick="document.getElementById(\'v23-quiz-area\').__v23Reset()" style="display:block;margin:15px auto;padding:8px 20px;background:#e94560;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">다시 도전</button>';
    area.__v23Reset = function(){
      v23State.quizIndex = 0; v23State.quizScore = 0; v23State.quizActive = false;
      renderQuiz();
    };
    if(pct>=80) unlockAchievement('quiz_v23_master');
    return;
  }

  var q = V23_QUIZ[v23State.quizIndex];
  var html = '<div style="color:#ffd700;font:bold 13px sans-serif;margin-bottom:8px;">Q'+(v23State.quizIndex+1)+'/'+V23_QUIZ.length+'</div>';
  html += '<div style="color:#eee;font:13px sans-serif;margin-bottom:12px;">'+q.q+'</div>';
  for(var i=0;i<q.a.length;i++){
    html += '<button class="v23-quiz-opt" data-idx="'+i+'" style="display:block;width:100%;text-align:left;padding:8px 12px;margin:4px 0;background:#0f346033;color:#eee;border:1px solid #0f3460;border-radius:4px;cursor:pointer;font-size:12px;">'+q.a[i]+'</button>';
  }
  html += '<div style="color:#999;font-size:10px;margin-top:8px;">현재 점수: '+v23State.quizScore+'/'+v23State.quizIndex+'</div>';
  area.innerHTML = html;

  var opts = area.querySelectorAll('.v23-quiz-opt');
  for(var j=0;j<opts.length;j++){
    opts[j].addEventListener('click',function(){
      var idx = parseInt(this.getAttribute('data-idx'));
      if(idx === q.c){
        v23State.quizScore++;
        v23sfx('quiz_correct');
        this.style.background = '#45e98044';
        this.style.borderColor = '#45e980';
      } else {
        v23sfx('quiz_wrong');
        this.style.background = '#e9456044';
        this.style.borderColor = '#e94560';
        opts[q.c].style.background = '#45e98044';
        opts[q.c].style.borderColor = '#45e980';
      }
      for(var k=0;k<opts.length;k++) opts[k].style.pointerEvents = 'none';
      setTimeout(function(){
        v23State.quizIndex++;
        renderQuiz();
      },1200);
    });
  }
}

function addV23Button(){
  var existing = document.getElementById('v23-main-btn');
  if(existing) return;
  var btn = document.createElement('button');
  btn.id = 'v23-main-btn';
  btn.textContent = 'v23';
  btn.title = 'v23 도시 행정 관리 허브';
  btn.style.cssText = 'position:fixed;top:50px;right:346px;z-index:4000;background:#45e9c0;color:#000;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;font:bold 11px sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
  btn.onmouseenter = function(){this.style.background='#6ef5d8';};
  btn.onmouseleave = function(){this.style.background='#45e9c0';};
  btn.onclick = function(){
    v23sfx('panel_open');
    createV23Panel();
    var panel = document.getElementById('v23-panel');
    if(panel) panel.style.display = panel.style.display==='none'?'block':'none';
  };
  document.body.appendChild(btn);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  if(!e.shiftKey) return;
  var panel = document.getElementById('v23-panel');
  if(!panel || panel.style.display==='none'){
    if(e.key==='Q'||e.key==='q'){
      e.preventDefault();
      var btn = document.getElementById('v23-main-btn');
      if(btn) btn.click();
    }
    return;
  }
  var map = {'1':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7,'9':8};
  var keyMap = {
    'A':0,'a':0,'S':1,'s':1,'D':2,'d':2,'F':3,'f':3,
    'G':4,'g':4,'H':5,'h':5,'J':6,'j':6,'K':7,'k':7,'0':8
  };
  var idx = keyMap[e.key];
  if(idx!==undefined){
    e.preventDefault();
    v23State.currentSection = idx;
    v23sfx('nav');
    if(idx<8) markSection(idx);
    renderCurrentSection();
  }
});

// ===== INIT =====
function initV23(){
  addV23Button();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initV23);
} else {
  initV23();
}

})();
