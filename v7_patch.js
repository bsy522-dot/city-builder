// =====================================================================
// city-builder v7_patch.js — PRIME Holdings NEXTERA+PRISM v7.0
// Self-contained patch: Diplomacy System 5 Kingdoms, Policy/Law 12 types,
// Wonder Buildings 8 Korean Wonders, Trade Routes 6, Share Card Canvas,
// Login Streak, +15 Quiz (55), +12 Achievements (62), SFX 6, Shortcuts +5
// =====================================================================
(function(){
'use strict';

// ===================== CSS INJECTION =====================
var V7_CSS = '\
#diplo-btn {\
    position: fixed; top: 410px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #e080ff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#diplo-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#diplo-panel.show { display: flex; }\
#diplo-box {\
    background: linear-gradient(145deg, #1a102e, #0e0820);\
    border: 2px solid #a060e0; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#diplo-box h2 { color: #c080ff; text-align: center; margin-bottom: 12px; }\
.diplo-kingdom {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    transition: all 0.2s;\
}\
.diplo-kingdom:hover { background: rgba(160,96,224,0.1); }\
.dk-icon { font-size: 32px; flex-shrink: 0; }\
.dk-info { flex: 1; }\
.dk-name { font-weight: bold; font-size: 14px; color: #e0c0ff; }\
.dk-status { font-size: 11px; margin-top: 2px; }\
.dk-relation { font-size: 11px; color: #aaa; margin-top: 3px; }\
.dk-bar { width: 100%; height: 6px; background: #333; border-radius: 3px; margin-top: 4px; overflow: hidden; }\
.dk-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }\
.dk-actions { display: flex; gap: 4px; flex-shrink: 0; }\
.dk-actions button {\
    background: rgba(160,96,224,0.3); border: 1px solid rgba(160,96,224,0.5);\
    color: #e0c0ff; padding: 4px 8px; border-radius: 8px; font-size: 10px;\
    cursor: pointer; white-space: nowrap;\
}\
.dk-actions button:hover { background: rgba(160,96,224,0.5); }\
.dk-actions button:disabled { opacity: 0.3; cursor: not-allowed; }\
\
#policy-btn {\
    position: fixed; top: 450px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ff80a0;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#policy-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#policy-panel.show { display: flex; }\
#policy-box {\
    background: linear-gradient(145deg, #2a1020, #1a0818);\
    border: 2px solid #ff6090; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#policy-box h2 { color: #ff80a0; text-align: center; margin-bottom: 6px; }\
.policy-count-text { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.policy-item {\
    display: flex; align-items: center; gap: 10px; padding: 10px;\
    margin-bottom: 6px; border-radius: 10px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    cursor: pointer; transition: all 0.2s;\
}\
.policy-item:hover { background: rgba(255,96,144,0.1); border-color: rgba(255,96,144,0.3); }\
.policy-item.active { border-color: #ff6090; background: rgba(255,96,144,0.15); }\
.policy-item .pi-icon { font-size: 26px; flex-shrink: 0; }\
.policy-item .pi-info { flex: 1; }\
.policy-item .pi-name { font-weight: bold; font-size: 13px; color: #eee; }\
.policy-item .pi-desc { font-size: 11px; color: #aaa; margin-top: 2px; }\
.policy-item .pi-effect { font-size: 10px; color: #80ff80; margin-top: 2px; }\
.policy-item .pi-cost { font-size: 10px; color: #ff80a0; margin-top: 2px; }\
.policy-item.active .pi-name { color: #ff80a0; }\
\
#wonder-btn {\
    position: fixed; top: 490px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffd700;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#wonder-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#wonder-panel.show { display: flex; }\
#wonder-box {\
    background: linear-gradient(145deg, #2a2000, #1a1000);\
    border: 2px solid #ffd700; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#wonder-box h2 { color: #ffd700; text-align: center; margin-bottom: 6px; }\
.wonder-progress-text { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.wonder-item {\
    display: flex; align-items: center; gap: 12px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    cursor: pointer; transition: all 0.3s;\
}\
.wonder-item:hover { background: rgba(255,215,0,0.1); border-color: rgba(255,215,0,0.3); }\
.wonder-item.built { border-color: #ffd700; background: rgba(255,215,0,0.15); box-shadow: 0 0 20px rgba(255,215,0,0.2); }\
.wonder-item.locked { opacity: 0.4; cursor: not-allowed; }\
.wonder-item .wi-icon { font-size: 36px; flex-shrink: 0; }\
.wonder-item .wi-info { flex: 1; }\
.wonder-item .wi-name { font-weight: bold; font-size: 14px; color: #ffe080; }\
.wonder-item .wi-desc { font-size: 11px; color: #ccc; margin-top: 3px; line-height: 1.5; }\
.wonder-item .wi-cost { font-size: 11px; color: #ffd700; margin-top: 4px; }\
.wonder-item .wi-bonus { font-size: 10px; color: #80ff80; margin-top: 2px; }\
.wonder-item.built .wi-name { color: #ffd700; }\
.wonder-item.built .wi-cost { color: #4caf50; }\
\
#trade-btn {\
    position: fixed; top: 530px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #80ffcc;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#trade-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#trade-panel.show { display: flex; }\
#trade-box {\
    background: linear-gradient(145deg, #0a2020, #041414);\
    border: 2px solid #40c0a0; border-radius: 16px;\
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;\
}\
#trade-box h2 { color: #80ffcc; text-align: center; margin-bottom: 6px; }\
.trade-count-text { text-align: center; color: #aaa; font-size: 12px; margin-bottom: 14px; }\
.trade-route {\
    display: flex; align-items: center; gap: 10px; padding: 12px;\
    margin-bottom: 8px; border-radius: 12px;\
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);\
    transition: all 0.2s;\
}\
.trade-route:hover { background: rgba(64,192,160,0.1); }\
.trade-route.active-trade { border-color: #40c0a0; background: rgba(64,192,160,0.15); }\
.trade-route.locked { opacity: 0.4; }\
.tr-icon { font-size: 28px; flex-shrink: 0; }\
.tr-info { flex: 1; }\
.tr-name { font-weight: bold; font-size: 13px; color: #b0ffe0; }\
.tr-desc { font-size: 11px; color: #aaa; margin-top: 2px; }\
.tr-bonus { font-size: 10px; color: #80ff80; margin-top: 2px; }\
.tr-cost { font-size: 10px; color: #80ffcc; margin-top: 2px; }\
.tr-toggle {\
    background: rgba(64,192,160,0.3); border: 1px solid rgba(64,192,160,0.5);\
    color: #b0ffe0; padding: 6px 12px; border-radius: 10px; font-size: 11px;\
    cursor: pointer; flex-shrink: 0;\
}\
.tr-toggle:hover { background: rgba(64,192,160,0.5); }\
.tr-toggle:disabled { opacity: 0.3; cursor: not-allowed; }\
\
#share-btn {\
    position: fixed; top: 570px; right: 10px; z-index: 10;\
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #80c0ff;\
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;\
}\
#share-panel {\
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;\
    background: rgba(0,0,0,0.9); z-index: 200;\
    justify-content: center; align-items: center; padding: 20px;\
}\
#share-panel.show { display: flex; }\
#share-box {\
    background: linear-gradient(145deg, #0a1a2e, #040e1a);\
    border: 2px solid #4090e0; border-radius: 16px;\
    padding: 24px; max-width: 440px; width: 100%; text-align: center;\
}\
#share-box h2 { color: #80c0ff; margin-bottom: 10px; }\
#share-canvas { border-radius: 12px; max-width: 100%; margin-bottom: 14px; }\
.share-actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }\
.share-actions button {\
    background: linear-gradient(135deg, #4090e0, #2070c0); border: none;\
    color: #fff; padding: 10px 20px; border-radius: 14px; font-size: 13px;\
    cursor: pointer; font-weight: bold;\
}\
.share-actions button:hover { filter: brightness(1.15); }\
\
#streak-toast {\
    position: fixed; left: 50%; bottom: 100px; transform: translateX(-50%);\
    z-index: 180; background: linear-gradient(135deg, #ff6000, #ff9000);\
    border: 2px solid #ffd700; border-radius: 14px;\
    padding: 12px 24px; max-width: 320px; text-align: center;\
    display: none; animation: streakSlide 5s forwards;\
}\
#streak-toast.show { display: block; }\
.streak-icon { font-size: 28px; }\
.streak-title { color: #fff; font-weight: bold; font-size: 15px; margin: 4px 0; }\
.streak-desc { color: #ffe0b0; font-size: 12px; }\
@keyframes streakSlide {\
    0% { opacity: 0; bottom: 80px; }\
    10% { opacity: 1; bottom: 100px; }\
    85% { opacity: 1; bottom: 100px; }\
    100% { opacity: 0; bottom: 80px; }\
}\
\
.diplo-event-toast {\
    position: fixed; left: 50%; top: 120px; transform: translateX(-50%);\
    z-index: 170; background: linear-gradient(135deg, #2a1040, #1a0830);\
    border: 2px solid #c060ff; border-radius: 14px;\
    padding: 12px 20px; max-width: 340px; text-align: center;\
    pointer-events: none;\
    animation: diploEvt 5s forwards;\
}\
.diplo-event-toast .de-icon { font-size: 28px; }\
.diplo-event-toast .de-text { color: #e0c0ff; font-size: 12px; margin-top: 4px; }\
@keyframes diploEvt {\
    0% { opacity: 0; top: 100px; }\
    10% { opacity: 1; top: 120px; }\
    85% { opacity: 1; top: 120px; }\
    100% { opacity: 0; top: 100px; }\
}\
\
@media (max-width: 600px) {\
    #diplo-btn { top: 330px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #policy-btn { top: 364px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #wonder-btn { top: 398px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #trade-btn { top: 432px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    #share-btn { top: 466px; right: 6px; width: 30px; height: 30px; font-size: 14px; }\
    .diplo-kingdom { flex-wrap: wrap; }\
    .dk-actions { width: 100%; justify-content: center; margin-top: 6px; }\
}\
@media (max-width: 400px) {\
    #diplo-btn, #policy-btn, #wonder-btn, #trade-btn, #share-btn {\
        width: 26px; height: 26px; font-size: 12px;\
    }\
}\
';

var styleEl7 = document.createElement('style');
styleEl7.textContent = V7_CSS;
document.head.appendChild(styleEl7);

// ===================== UI ELEMENTS =====================
function addV7UI() {
    var btns = [
        { id:'diplo-btn', title:'외교', label:'외교', text:'🤝', onclick: showDiplomacy },
        { id:'policy-btn', title:'정책', label:'정책', text:'📋', onclick: showPolicies },
        { id:'wonder-btn', title:'불가사의', label:'불가사의', text:'🏛', onclick: showWonders },
        { id:'trade-btn', title:'무역로', label:'무역로', text:'🚢', onclick: showTradeRoutes },
        { id:'share-btn', title:'공유 카드', label:'공유 카드', text:'📸', onclick: showShareCard }
    ];
    btns.forEach(function(b) {
        var el = document.createElement('button');
        el.id = b.id;
        el.title = b.title;
        el.setAttribute('aria-label', b.label);
        el.textContent = b.text;
        el.onclick = b.onclick;
        document.body.appendChild(el);
    });

    var panels = [
        { id:'diplo-panel', role:'dialog', label:'외교', inner:'<div id="diplo-box"><h2>🤝 외교</h2><div id="diplo-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#a060e0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'diplo-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'policy-panel', role:'dialog', label:'정책', inner:'<div id="policy-box"><h2>📋 정책 &amp; 법률</h2><div class="policy-count-text" id="policy-count"></div><div id="policy-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#ff6090;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'policy-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'wonder-panel', role:'dialog', label:'불가사의', inner:'<div id="wonder-box"><h2>🏛 불가사의</h2><div class="wonder-progress-text" id="wonder-progress"></div><div id="wonder-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#c4923a;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'wonder-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'trade-panel', role:'dialog', label:'무역로', inner:'<div id="trade-box"><h2>🚢 무역로</h2><div class="trade-count-text" id="trade-count"></div><div id="trade-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#40c0a0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'trade-panel\').classList.remove(\'show\')">닫기</button></div>' },
        { id:'share-panel', role:'dialog', label:'공유 카드', inner:'<div id="share-box"><h2>📸 도시 공유 카드</h2><canvas id="share-canvas" width="600" height="380"></canvas><div class="share-actions"><button onclick="downloadShareCard()">💾 다운로드</button><button onclick="copyShareCard()">📋 클립보드</button></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#4090e0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'share-panel\').classList.remove(\'show\')">닫기</button></div>' }
    ];
    panels.forEach(function(p) {
        var el = document.createElement('div');
        el.id = p.id;
        el.setAttribute('role', p.role);
        el.setAttribute('aria-label', p.label);
        el.innerHTML = p.inner;
        el.onclick = function(e) { if(e.target.id === p.id) el.classList.remove('show'); };
        document.body.appendChild(el);
    });

    var streakToast = document.createElement('div');
    streakToast.id = 'streak-toast';
    streakToast.innerHTML = '<div class="streak-icon" id="streak-icon"></div><div class="streak-title" id="streak-title"></div><div class="streak-desc" id="streak-desc"></div>';
    document.body.appendChild(streakToast);
}

// ===================== DIPLOMACY SYSTEM =====================
var KINGDOMS = [
    { id:'buyeo', icon:'🦌', name:'부여', desc:'만주 평원의 강대국. 농경과 목축이 발달했어요.', personality:'friendly', baseFavor:55, tradeGold:8, tradeCulture:3 },
    { id:'mahan', icon:'🌾', name:'마한', desc:'한반도 남서부의 연맹. 54개 소국이 있었어요.', personality:'neutral', baseFavor:45, tradeGold:5, tradeCulture:5 },
    { id:'okjeo', icon:'🐟', name:'옥저', desc:'동해안의 소국. 어업과 소금이 풍부해요.', personality:'peaceful', baseFavor:60, tradeGold:6, tradeCulture:2 },
    { id:'dongye', icon:'🏔', name:'동예', desc:'강원도 일대의 나라. 단궁과 과하마가 유명해요.', personality:'cautious', baseFavor:40, tradeGold:4, tradeCulture:4 },
    { id:'han_china', icon:'🐉', name:'한사군', desc:'중국이 설치한 군현. 강력한 군사력을 보유해요.', personality:'aggressive', baseFavor:30, tradeGold:12, tradeCulture:8 }
];

var diploState = {};
try {
    var savedDiplo = localStorage.getItem('cityDiplo_v7');
    if(savedDiplo) diploState = JSON.parse(savedDiplo);
} catch(e){}

function initDiploState() {
    KINGDOMS.forEach(function(k) {
        if(!diploState[k.id]) {
            diploState[k.id] = {
                favor: k.baseFavor,
                status: 'neutral',
                tradeActive: false,
                lastGiftTick: 0,
                wars: 0,
                treaties: 0
            };
        }
    });
}

function saveDiploState() {
    try { localStorage.setItem('cityDiplo_v7', JSON.stringify(diploState)); } catch(e){}
}

function showDiplomacy() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('diplo-list');
    list.innerHTML = '';

    KINGDOMS.forEach(function(k) {
        var state = diploState[k.id];
        if(!state) return;
        var favor = Math.max(0, Math.min(100, state.favor));
        var statusText = favor >= 80 ? '동맹' : favor >= 60 ? '우호' : favor >= 40 ? '중립' : favor >= 20 ? '경계' : '적대';
        var statusColor = favor >= 80 ? '#4caf50' : favor >= 60 ? '#8bc34a' : favor >= 40 ? '#ffc107' : favor >= 20 ? '#ff9800' : '#f44336';
        var barColor = favor >= 60 ? 'linear-gradient(90deg, #4caf50, #8bc34a)' : favor >= 40 ? 'linear-gradient(90deg, #ff9800, #ffc107)' : 'linear-gradient(90deg, #f44336, #ff5722)';

        var div = document.createElement('div');
        div.className = 'diplo-kingdom';
        div.innerHTML = '<div class="dk-icon">' + k.icon + '</div>' +
            '<div class="dk-info">' +
                '<div class="dk-name">' + k.name + '</div>' +
                '<div class="dk-status" style="color:' + statusColor + '">' + statusText + ' (호감도: ' + favor + ')</div>' +
                '<div class="dk-relation">' + k.desc + '</div>' +
                (state.tradeActive ? '<div style="color:#80ffcc;font-size:10px;margin-top:2px;">🚢 교역 중: +' + k.tradeGold + ' 💰/턴</div>' : '') +
                '<div class="dk-bar"><div class="dk-bar-fill" style="width:' + favor + '%;background:' + barColor + '"></div></div>' +
            '</div>' +
            '<div class="dk-actions" id="dk-act-' + k.id + '"></div>';

        var actionsEl = div.querySelector('.dk-actions');

        var giftBtn = document.createElement('button');
        giftBtn.textContent = '🎁 선물';
        giftBtn.title = '금 50을 선물하여 호감도 +10';
        giftBtn.disabled = (typeof resources === 'undefined') || resources.gold < 50;
        giftBtn.onclick = function(e) {
            e.stopPropagation();
            sendGift(k.id);
        };
        actionsEl.appendChild(giftBtn);

        var tradeBtn = document.createElement('button');
        tradeBtn.textContent = state.tradeActive ? '❌ 교역중단' : '🤝 교역';
        tradeBtn.disabled = favor < 40 && !state.tradeActive;
        tradeBtn.onclick = function(e) {
            e.stopPropagation();
            toggleTrade(k.id);
        };
        actionsEl.appendChild(tradeBtn);

        if(favor >= 70 && state.status !== 'alliance') {
            var allyBtn = document.createElement('button');
            allyBtn.textContent = '⚔ 동맹';
            allyBtn.title = '금 200으로 동맹 체결. 재해 시 지원 받음';
            allyBtn.disabled = (typeof resources === 'undefined') || resources.gold < 200;
            allyBtn.onclick = function(e) {
                e.stopPropagation();
                formAlliance(k.id);
            };
            actionsEl.appendChild(allyBtn);
        }

        list.appendChild(div);
    });

    document.getElementById('diplo-panel').classList.add('show');
}

function sendGift(kingdomId) {
    if(typeof resources === 'undefined' || resources.gold < 50) return;
    resources.gold -= 50;
    diploState[kingdomId].favor = Math.min(100, diploState[kingdomId].favor + 10);
    saveDiploState();
    if(typeof updateHUD === 'function') updateHUD();
    var k = KINGDOMS.find(function(x) { return x.id === kingdomId; });
    if(typeof toast === 'function') toast('🎁 ' + k.name + '에게 선물! 호감도 +10');
    if(typeof addChronicle === 'function') addChronicle('🎁', k.name + '에게 선물을 보냈습니다.');
    playV7SFX('diplo_gift');
    showDiplomacy();
}

function toggleTrade(kingdomId) {
    var state = diploState[kingdomId];
    state.tradeActive = !state.tradeActive;
    saveDiploState();
    var k = KINGDOMS.find(function(x) { return x.id === kingdomId; });
    if(state.tradeActive) {
        if(typeof toast === 'function') toast('🚢 ' + k.name + '와 교역 시작! +' + k.tradeGold + ' 💰/턴');
        if(typeof addChronicle === 'function') addChronicle('🚢', k.name + '와 교역을 시작했습니다.');
    } else {
        if(typeof toast === 'function') toast('❌ ' + k.name + '와 교역 중단');
    }
    playV7SFX('trade_toggle');
    showDiplomacy();
}

function formAlliance(kingdomId) {
    if(typeof resources === 'undefined' || resources.gold < 200) return;
    resources.gold -= 200;
    diploState[kingdomId].favor = Math.min(100, diploState[kingdomId].favor + 15);
    diploState[kingdomId].status = 'alliance';
    diploState[kingdomId].treaties++;
    saveDiploState();
    if(typeof updateHUD === 'function') updateHUD();
    var k = KINGDOMS.find(function(x) { return x.id === kingdomId; });
    if(typeof toast === 'function') toast('⚔ ' + k.name + '와 동맹 체결!');
    if(typeof addChronicle === 'function') addChronicle('⚔', k.name + '와 동맹을 체결했습니다!');
    playV7SFX('diplo_alliance');
    showDiplomacy();
    if(typeof checkAchievements === 'function') checkAchievements();
}

function tickDiplomacy() {
    var diploGold = 0;
    var diploCulture = 0;
    KINGDOMS.forEach(function(k) {
        var state = diploState[k.id];
        if(!state) return;
        if(state.tradeActive) {
            diploGold += k.tradeGold;
            diploCulture += k.tradeCulture;
        }
        if(Math.random() < 0.0005) {
            var delta = k.personality === 'friendly' ? 2 : k.personality === 'aggressive' ? -2 : (Math.random() < 0.5 ? 1 : -1);
            state.favor = Math.max(0, Math.min(100, state.favor + delta));
        }
    });
    if(diploGold > 0 && typeof resources !== 'undefined') resources.gold += diploGold;
    if(diploCulture > 0 && typeof resources !== 'undefined') resources.culture += diploCulture;
}

var diploCooldown = 3600;
function checkDiploEvent() {
    if(diploCooldown > 0) { diploCooldown--; return; }
    diploCooldown = 6000 + Math.floor(Math.random() * 4800);
    if(Math.random() > 0.4) return;

    var events = [
        { msg:' 사신이 문화교류를 제안합니다.', effect: function(kid) { diploState[kid].favor += 5; if(typeof resources !== 'undefined') resources.culture += 15; } },
        { msg:' 상인이 특산물을 가져왔습니다.', effect: function(kid) { if(typeof resources !== 'undefined') resources.gold += 40; diploState[kid].favor += 3; } },
        { msg:'에서 식량 원조를 보냈습니다.', effect: function(kid) { if(typeof resources !== 'undefined') resources.food += 30; diploState[kid].favor += 5; } },
        { msg:'와 국경 분쟁이 발생했습니다.', effect: function(kid) { diploState[kid].favor -= 8; } },
        { msg:'에서 학자를 파견했습니다.', effect: function(kid) { if(typeof resources !== 'undefined') resources.culture += 20; diploState[kid].favor += 4; } }
    ];

    var kIdx = Math.floor(Math.random() * KINGDOMS.length);
    var k = KINGDOMS[kIdx];
    var evt = events[Math.floor(Math.random() * events.length)];
    evt.effect(k.id);
    diploState[k.id].favor = Math.max(0, Math.min(100, diploState[k.id].favor));
    saveDiploState();

    var el = document.createElement('div');
    el.className = 'diplo-event-toast';
    el.innerHTML = '<div class="de-icon">' + k.icon + '</div><div class="de-text">' + k.name + evt.msg + '</div>';
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 5500);
    playV7SFX('diplo_event');
}

// ===================== POLICY/LAW SYSTEM =====================
var POLICIES = [
    { id:'tax_low', icon:'💰', name:'감세 정책', desc:'세금을 낮춰 백성이 행복해져요.', effect:'행복 +15, 금 수입 -20%', cost:{gold:0}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.min(100, resources.happy + 15); },
      rateEffect: { gold_mult: -0.20, happy_flat: 3 } },
    { id:'tax_high', icon:'💎', name:'증세 정책', desc:'세금을 올려 국고를 채워요.', effect:'금 수입 +25%, 행복 -10', cost:{gold:0}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.max(0, resources.happy - 10); },
      rateEffect: { gold_mult: 0.25, happy_flat: -2 } },
    { id:'edu_priority', icon:'📚', name:'교육 우선', desc:'학교에 더 투자해요.', effect:'문화 +30%, 금 -10%', cost:{gold:80}, active:false,
      apply: function() {},
      rateEffect: { culture_mult: 0.30, gold_mult: -0.10 } },
    { id:'mil_draft', icon:'⚔️', name:'징병제', desc:'군사력을 강화해요.', effect:'재해피해 -20%, 행복 -8', cost:{gold:100}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.max(0, resources.happy - 8); },
      rateEffect: { disaster_reduce: 0.20 } },
    { id:'agri_subsidy', icon:'🌾', name:'농업 보조금', desc:'농민에게 지원금을 줘요.', effect:'식량 +25%, 금 -15%', cost:{gold:60}, active:false,
      apply: function() {},
      rateEffect: { food_mult: 0.25, gold_mult: -0.15 } },
    { id:'free_trade', icon:'🚢', name:'자유 무역', desc:'관세를 없애 교역을 늘려요.', effect:'교역수입 +40%, 문화 +10%', cost:{gold:120}, active:false,
      apply: function() {},
      rateEffect: { trade_mult: 0.40, culture_mult: 0.10 } },
    { id:'culture_fest', icon:'🎭', name:'문화 축제', desc:'정기적으로 축제를 열어요.', effect:'행복 +20, 문화 +15%', cost:{gold:100}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.min(100, resources.happy + 20); },
      rateEffect: { culture_mult: 0.15, happy_flat: 2 } },
    { id:'public_health', icon:'🏥', name:'공중 보건', desc:'의료 시설을 확충해요.', effect:'인구성장 +20%, 금 -10%', cost:{gold:90}, active:false,
      apply: function() {},
      rateEffect: { pop_mult: 0.20, gold_mult: -0.10 } },
    { id:'curfew', icon:'🌙', name:'야간 통행금지', desc:'밤에 외출을 금지해요.', effect:'재해피해 -15%, 행복 -12', cost:{gold:0}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.max(0, resources.happy - 12); },
      rateEffect: { disaster_reduce: 0.15, happy_flat: -3 } },
    { id:'open_borders', icon:'🌍', name:'국경 개방', desc:'외국인의 입국을 허용해요.', effect:'인구 +15%, 문화 +10%', cost:{gold:50}, active:false,
      apply: function() {},
      rateEffect: { pop_mult: 0.15, culture_mult: 0.10 } },
    { id:'merit_system', icon:'📝', name:'과거제', desc:'시험으로 관리를 뽑아요.', effect:'문화 +20%, 행복 +5', cost:{gold:150}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.min(100, resources.happy + 5); },
      rateEffect: { culture_mult: 0.20, happy_flat: 1 } },
    { id:'enviro_protect', icon:'🌳', name:'자연 보존', desc:'산림을 보호해요.', effect:'행복 +10, 식량 +10%', cost:{gold:70}, active:false,
      apply: function() { if(typeof resources !== 'undefined') resources.happy = Math.min(100, resources.happy + 10); },
      rateEffect: { food_mult: 0.10, happy_flat: 2 } }
];

var activePolicies = new Set();
var MAX_POLICIES = 3;
try {
    var savedPolicies = localStorage.getItem('cityPolicies_v7');
    if(savedPolicies) {
        var arr = JSON.parse(savedPolicies);
        activePolicies = new Set(arr);
        POLICIES.forEach(function(p) { p.active = activePolicies.has(p.id); });
    }
} catch(e){}

function showPolicies() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('policy-list');
    list.innerHTML = '';
    document.getElementById('policy-count').textContent = '활성 정책: ' + activePolicies.size + ' / ' + MAX_POLICIES;

    POLICIES.forEach(function(pol) {
        var div = document.createElement('div');
        div.className = 'policy-item' + (pol.active ? ' active' : '');
        var canAfford = pol.cost.gold === 0 || ((typeof resources !== 'undefined') && resources.gold >= pol.cost.gold);
        var canActivate = activePolicies.size < MAX_POLICIES || pol.active;

        div.innerHTML = '<div class="pi-icon">' + pol.icon + '</div>' +
            '<div class="pi-info"><div class="pi-name">' + pol.name + (pol.active ? ' ✅' : '') + '</div>' +
            '<div class="pi-desc">' + pol.desc + '</div>' +
            '<div class="pi-effect">' + pol.effect + '</div>' +
            (pol.cost.gold > 0 ? '<div class="pi-cost">' + (pol.active ? '활성화됨' : '활성화 비용: 💰 ' + pol.cost.gold) + '</div>' : '') +
            '</div>';

        div.onclick = function() {
            if(pol.active) {
                deactivatePolicy(pol);
            } else if(canAfford && canActivate) {
                activatePolicy(pol);
            } else if(!canAfford) {
                if(typeof toast === 'function') toast('금이 부족해요!');
            } else {
                if(typeof toast === 'function') toast('최대 ' + MAX_POLICIES + '개 정책만 활성화할 수 있어요!');
            }
        };

        if(!canAfford && !pol.active) div.style.opacity = '0.5';
        list.appendChild(div);
    });

    document.getElementById('policy-panel').classList.add('show');
}

function activatePolicy(pol) {
    if(activePolicies.size >= MAX_POLICIES) return;
    if(pol.cost.gold > 0) {
        if(typeof resources === 'undefined' || resources.gold < pol.cost.gold) return;
        resources.gold -= pol.cost.gold;
    }
    pol.active = true;
    activePolicies.add(pol.id);
    pol.apply();
    savePolicies();
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof recalcRates === 'function') recalcRates();
    if(typeof toast === 'function') toast('📋 ' + pol.name + ' 시행!');
    if(typeof addChronicle === 'function') addChronicle(pol.icon, pol.name + ' 정책을 시행했습니다.');
    playV7SFX('policy_activate');
    showPolicies();
    if(typeof checkAchievements === 'function') checkAchievements();
}

function deactivatePolicy(pol) {
    pol.active = false;
    activePolicies.delete(pol.id);
    savePolicies();
    if(typeof recalcRates === 'function') recalcRates();
    if(typeof toast === 'function') toast('❌ ' + pol.name + ' 폐지');
    playV7SFX('policy_activate');
    showPolicies();
}

function savePolicies() {
    try { localStorage.setItem('cityPolicies_v7', JSON.stringify(Array.from(activePolicies))); } catch(e){}
}

function getPolicyMultiplier(type) {
    var mult = 0;
    activePolicies.forEach(function(pid) {
        var p = POLICIES.find(function(x) { return x.id === pid; });
        if(!p || !p.rateEffect) return;
        if(p.rateEffect[type]) mult += p.rateEffect[type];
    });
    return mult;
}

// ===================== WONDER SYSTEM =====================
var WONDERS = [
    { id:'dolmen', era:0, icon:'🪨', name:'고인돌', desc:'세계 최대 규모의 고인돌 유적지. 고창, 화순, 강화 고인돌은 유네스코 세계유산이에요. 세계 고인돌의 40%가 한국에 있어요.',
      cost:{gold:200, culture:50}, bonus:'인구 +50, 문화 +30', effect: function(r) { r.pop += 50; r.culture += 30; }, permBonus:'인구 성장 +10%', permEffect:{ pop_mult: 0.10 } },
    { id:'cheomseongdae', era:1, icon:'🌟', name:'첨성대', desc:'현존하는 동아시아 최고(最古)의 천문대. 신라 선덕여왕 때 건립되었어요. 362개의 돌로 1년을 상징해요.',
      cost:{gold:350, culture:80}, bonus:'문화 +60, 재해 경고 강화', effect: function(r) { r.culture += 60; }, permBonus:'재해 예보 +50%', permEffect:{ disaster_warn: 0.50 } },
    { id:'tripitaka', era:2, icon:'📜', name:'팔만대장경', desc:'81,258장의 목판에 새긴 불교 경전. 고려시대 몽골 침입을 물리치기 위해 만들었어요. 유네스코 세계기록유산.',
      cost:{gold:500, culture:120}, bonus:'문화 +100, 행복 +20', effect: function(r) { r.culture += 100; r.happy = Math.min(100, r.happy + 20); }, permBonus:'문화 생산 +20%', permEffect:{ culture_mult: 0.20 } },
    { id:'gyeongbok', era:3, icon:'🏯', name:'경복궁', desc:'조선의 정궁. 1395년 태조가 건립했어요. 근정전, 경회루, 향원정 등이 유명해요.',
      cost:{gold:600, culture:150}, bonus:'행복 +30, 인구 +80', effect: function(r) { r.happy = Math.min(100, r.happy + 30); r.pop += 80; }, permBonus:'행복 감소 -30%', permEffect:{ happy_decay_reduce: 0.30 } },
    { id:'suwon_hwaseong', era:3, icon:'🏰', name:'수원 화성', desc:'정조 대왕이 건설한 성곽. 정약용이 거중기를 설계했어요. 유네스코 세계유산.',
      cost:{gold:550, culture:130}, bonus:'금 +300, 재해피해 -25%', effect: function(r) { r.gold += 300; }, permBonus:'건물 비용 -15%', permEffect:{ cost_reduce: 0.15 } },
    { id:'bulguksa', era:1, icon:'🛕', name:'불국사', desc:'신라 경덕왕 때 건립된 사찰. 석가탑과 다보탑이 유명해요. 유네스코 세계유산.',
      cost:{gold:400, culture:100}, bonus:'문화 +80, 행복 +15', effect: function(r) { r.culture += 80; r.happy = Math.min(100, r.happy + 15); }, permBonus:'문화 생산 +15%', permEffect:{ culture_mult: 0.15 } },
    { id:'jikji', era:2, icon:'📖', name:'직지심체요절', desc:'세계 최초의 금속활자 인쇄본 (1377년). 구텐베르크보다 78년 빨라요! 유네스코 세계기록유산.',
      cost:{gold:450, culture:110}, bonus:'문화 +90, 금 +200', effect: function(r) { r.culture += 90; r.gold += 200; }, permBonus:'연구 비용 -20%', permEffect:{ research_reduce: 0.20 } },
    { id:'independence_gate', era:4, icon:'🏗', name:'독립문', desc:'1897년 독립협회가 건설. 모화관을 허물고 그 자리에 세웠어요. 자주독립의 상징.',
      cost:{gold:400, culture:100}, bonus:'행복 +25, 인구 +60', effect: function(r) { r.happy = Math.min(100, r.happy + 25); r.pop += 60; }, permBonus:'모든 생산 +8%', permEffect:{ all_mult: 0.08 } }
];

var builtWonders = new Set();
try {
    var savedWonders = localStorage.getItem('cityWonders_v7');
    if(savedWonders) builtWonders = new Set(JSON.parse(savedWonders));
} catch(e){}

function showWonders() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('wonder-list');
    list.innerHTML = '';
    document.getElementById('wonder-progress').textContent = builtWonders.size + ' / ' + WONDERS.length + ' 불가사의 건설';

    WONDERS.forEach(function(w) {
        var isBuilt = builtWonders.has(w.id);
        var canAfford = (typeof resources !== 'undefined') && resources.gold >= w.cost.gold && resources.culture >= w.cost.culture;
        var eraOk = (typeof currentEra !== 'undefined') && currentEra >= w.era;
        var isLocked = !isBuilt && (!canAfford || !eraOk);

        var div = document.createElement('div');
        div.className = 'wonder-item' + (isBuilt ? ' built' : '') + (isLocked && !isBuilt ? ' locked' : '');
        div.innerHTML = '<div class="wi-icon">' + w.icon + '</div>' +
            '<div class="wi-info"><div class="wi-name">' + w.name + (isBuilt ? ' ✅' : '') + '</div>' +
            '<div class="wi-desc">' + w.desc + '</div>' +
            '<div class="wi-cost">' + (isBuilt ? '✅ 건설 완료' : '💰 ' + w.cost.gold + ' + 🏛️ ' + w.cost.culture) + '</div>' +
            '<div class="wi-bonus">즉시: ' + w.bonus + '</div>' +
            '<div class="wi-bonus">영구: ' + w.permBonus + '</div></div>';

        if(!isBuilt && !isLocked) {
            div.onclick = function() { buildWonder(w); };
        }
        list.appendChild(div);
    });

    document.getElementById('wonder-panel').classList.add('show');
}

function buildWonder(w) {
    if(builtWonders.has(w.id)) return;
    if(typeof resources === 'undefined') return;
    if(resources.gold < w.cost.gold || resources.culture < w.cost.culture) return;
    if(typeof currentEra !== 'undefined' && currentEra < w.era) return;

    resources.gold -= w.cost.gold;
    resources.culture -= w.cost.culture;
    builtWonders.add(w.id);
    w.effect(resources);

    try { localStorage.setItem('cityWonders_v7', JSON.stringify(Array.from(builtWonders))); } catch(e){}

    if(typeof toast === 'function') toast('🏛 불가사의 ' + w.name + ' 건설 완료!');
    if(typeof addChronicle === 'function') addChronicle(w.icon, '불가사의 ' + w.name + '을(를) 건설했습니다!');
    if(typeof updateHUD === 'function') updateHUD();
    if(typeof recalcRates === 'function') recalcRates();
    playV7SFX('wonder_build');
    showWonders();
    if(typeof checkAchievements === 'function') checkAchievements();
}

function getWonderMultiplier(type) {
    var mult = 0;
    builtWonders.forEach(function(wid) {
        var w = WONDERS.find(function(x) { return x.id === wid; });
        if(!w || !w.permEffect) return;
        if(w.permEffect[type]) mult += w.permEffect[type];
        if(w.permEffect.all_mult && type !== 'all_mult') mult += w.permEffect.all_mult;
    });
    return mult;
}

// ===================== TRADE ROUTE SYSTEM =====================
var TRADE_ROUTES = [
    { id:'silk_road', icon:'🐫', name:'비단길 (서역)', desc:'중앙아시아를 거쳐 서역과 교역합니다.', era:1, cost:{gold:150}, bonus:'금 +12/턴, 문화 +5/턴', goldPerTick:12, culturePerTick:5 },
    { id:'sea_route_japan', icon:'⛵', name:'해상로 (일본)', desc:'대마도를 거쳐 일본과 교역합니다.', era:1, cost:{gold:100}, bonus:'금 +8/턴, 식량 +4/턴', goldPerTick:8, foodPerTick:4 },
    { id:'sea_route_china', icon:'🚢', name:'항로 (중국)', desc:'서해를 건너 중국과 교역합니다.', era:2, cost:{gold:200}, bonus:'금 +15/턴, 문화 +8/턴', goldPerTick:15, culturePerTick:8 },
    { id:'northern_trade', icon:'🦌', name:'북방 교역로', desc:'만주와 시베리아를 거쳐 교역합니다.', era:0, cost:{gold:80}, bonus:'식량 +8/턴, 금 +5/턴', foodPerTick:8, goldPerTick:5 },
    { id:'arabian_route', icon:'🌙', name:'아라비아 항로', desc:'벽란도를 통해 아라비아와 교역합니다.', era:2, cost:{gold:250}, bonus:'금 +20/턴, 문화 +10/턴', goldPerTick:20, culturePerTick:10 },
    { id:'modern_trade', icon:'🚂', name:'근대 무역항', desc:'인천항, 부산항을 통한 근대 무역입니다.', era:4, cost:{gold:300}, bonus:'금 +25/턴, 인구 +3/턴', goldPerTick:25, popPerTick:3 }
];

var v7ActiveTradeRoutes = new Set();
try {
    var savedTrades = localStorage.getItem('cityTrades_v7');
    if(savedTrades) v7ActiveTradeRoutes = new Set(JSON.parse(savedTrades));
} catch(e){}

function showTradeRoutes() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('trade-list');
    list.innerHTML = '';
    document.getElementById('trade-count').textContent = '활성 무역로: ' + v7ActiveTradeRoutes.size + ' / ' + TRADE_ROUTES.length;

    TRADE_ROUTES.forEach(function(tr) {
        var isActive = v7ActiveTradeRoutes.has(tr.id);
        var canAfford = (typeof resources !== 'undefined') && resources.gold >= tr.cost.gold;
        var eraOk = (typeof currentEra !== 'undefined') && currentEra >= tr.era;
        var isLocked = !isActive && (!canAfford || !eraOk);

        var div = document.createElement('div');
        div.className = 'trade-route' + (isActive ? ' active-trade' : '') + (isLocked && !isActive ? ' locked' : '');
        div.innerHTML = '<div class="tr-icon">' + tr.icon + '</div>' +
            '<div class="tr-info"><div class="tr-name">' + tr.name + (isActive ? ' ✅' : '') + '</div>' +
            '<div class="tr-desc">' + tr.desc + '</div>' +
            '<div class="tr-bonus">' + tr.bonus + '</div>' +
            '<div class="tr-cost">' + (isActive ? '✅ 운영 중' : '개설 비용: 💰 ' + tr.cost.gold) + '</div></div>';

        var btn = document.createElement('button');
        btn.className = 'tr-toggle';
        btn.textContent = isActive ? '❌ 폐쇄' : '🚢 개설';
        btn.disabled = isLocked && !isActive;
        btn.onclick = function() {
            if(isActive) {
                v7ActiveTradeRoutes.delete(tr.id);
                if(typeof toast === 'function') toast('❌ ' + tr.name + ' 폐쇄');
            } else {
                if(typeof resources === 'undefined' || resources.gold < tr.cost.gold) return;
                resources.gold -= tr.cost.gold;
                v7ActiveTradeRoutes.add(tr.id);
                if(typeof toast === 'function') toast('🚢 ' + tr.name + ' 개설!');
                if(typeof addChronicle === 'function') addChronicle(tr.icon, tr.name + ' 무역로를 개설했습니다.');
                playV7SFX('trade_toggle');
            }
            try { localStorage.setItem('cityTrades_v7', JSON.stringify(Array.from(v7ActiveTradeRoutes))); } catch(e){}
            if(typeof updateHUD === 'function') updateHUD();
            if(typeof checkAchievements === 'function') checkAchievements();
            showTradeRoutes();
        };
        div.appendChild(btn);
        list.appendChild(div);
    });

    document.getElementById('trade-panel').classList.add('show');
}

function tickTradeRoutes() {
    v7ActiveTradeRoutes.forEach(function(tid) {
        var tr = TRADE_ROUTES.find(function(x) { return x.id === tid; });
        if(!tr || typeof resources === 'undefined') return;
        if(tr.goldPerTick) resources.gold += tr.goldPerTick;
        if(tr.culturePerTick) resources.culture += tr.culturePerTick;
        if(tr.foodPerTick) resources.food += tr.foodPerTick;
        if(tr.popPerTick) resources.pop += tr.popPerTick;
    });
}

// ===================== SHARE CARD =====================
function showShareCard() {
    if(typeof playClickSound === 'function') playClickSound();
    var canvas = document.getElementById('share-canvas');
    var ctx = canvas.getContext('2d');
    var W = 600, H = 380;
    canvas.width = W;
    canvas.height = H;

    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(0.5, '#2a1a3e');
    grad.addColorStop(1, '#0e1a2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,215,0,0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, W - 20, H - 20);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏙 한국사 도시건설', W / 2, 50);

    var eraNames = ['고조선','삼국시대','고려','조선','근대'];
    var eraName = (typeof currentEra !== 'undefined' && eraNames[currentEra]) ? eraNames[currentEra] : '???';

    ctx.fillStyle = '#c4923a';
    ctx.font = '16px sans-serif';
    ctx.fillText('v7.0 Prime Edition | ' + eraName + ' 시대', W / 2, 78);

    var stats = [];
    if(typeof resources !== 'undefined') {
        stats.push({ icon:'👥', label:'인구', value: resources.pop || 0 });
        stats.push({ icon:'🌾', label:'식량', value: resources.food || 0 });
        stats.push({ icon:'💰', label:'금', value: resources.gold || 0 });
        stats.push({ icon:'🏛', label:'문화', value: resources.culture || 0 });
        stats.push({ icon:'😊', label:'행복', value: resources.happy || 0 });
        stats.push({ icon:'🏗', label:'건물', value: (typeof buildCount !== 'undefined') ? buildCount : 0 });
    }

    var startX = 40, startY = 110, colW = 170, rowH = 55;
    stats.forEach(function(s, i) {
        var col = i % 3, row = Math.floor(i / 3);
        var x = startX + col * colW, y = startY + row * rowH;

        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.roundRect(x, y, 150, 44, 10);
        ctx.fill();

        ctx.fillStyle = '#ffd700';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(s.icon, x + 10, y + 30);

        ctx.fillStyle = '#aaa';
        ctx.font = '11px sans-serif';
        ctx.fillText(s.label, x + 38, y + 18);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(String(s.value), x + 38, y + 36);
    });

    var bottomY = 240;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.roundRect(30, bottomY, W - 60, 70, 12);
    ctx.fill();

    var extraStats = [
        '🔬 연구: ' + (typeof researchedTechs !== 'undefined' ? researchedTechs.size : 0) + '/15',
        '🏛 불가사의: ' + builtWonders.size + '/8',
        '⭐ 명예: ' + (typeof prestigeLevel !== 'undefined' ? prestigeLevel : 0) + '단계',
        '📋 정책: ' + activePolicies.size + '/3',
        '😢 무역로: ' + v7ActiveTradeRoutes.size + '/6',
        '🤝 외교: ' + Object.values(diploState).filter(function(d) { return d.status === 'alliance'; }).length + '동맹'
    ];

    ctx.fillStyle = '#ddd';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    extraStats.forEach(function(s, i) {
        var col = i % 3, row = Math.floor(i / 3);
        ctx.fillText(s, 50 + col * 175, bottomY + 22 + row * 22);
    });

    var barY = 328;
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.roundRect(30, barY, W - 60, 12, 6);
    ctx.fill();
    var progress = typeof currentEra !== 'undefined' ? ((currentEra + 1) / 5) : 0.2;
    var barGrad = ctx.createLinearGradient(30, 0, 30 + (W - 60) * progress, 0);
    barGrad.addColorStop(0, '#4caf50');
    barGrad.addColorStop(1, '#ffd700');
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    ctx.roundRect(30, barY, (W - 60) * progress, 12, 6);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PRIME Holdings | ' + new Date().toISOString().slice(0, 10), W / 2, H - 12);

    document.getElementById('share-panel').classList.add('show');
    playV7SFX('share');
}

window.downloadShareCard = function() {
    var canvas = document.getElementById('share-canvas');
    var link = document.createElement('a');
    link.download = 'city-builder-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    if(typeof toast === 'function') toast('💾 다운로드 완료!');
};

window.copyShareCard = function() {
    var canvas = document.getElementById('share-canvas');
    canvas.toBlob(function(blob) {
        if(navigator.clipboard && navigator.clipboard.write) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function() {
                if(typeof toast === 'function') toast('📋 클립보드에 복사됨!');
            });
        } else {
            if(typeof toast === 'function') toast('이 브라우저에서는 클립보드 복사가 지원되지 않아요.');
        }
    }, 'image/png');
};

// ===================== LOGIN STREAK SYSTEM =====================
var streakData = { lastDate: null, streak: 0, totalDays: 0 };
try {
    var savedStreak = localStorage.getItem('cityStreak_v7');
    if(savedStreak) streakData = JSON.parse(savedStreak);
} catch(e){}

function checkLoginStreak() {
    var today = new Date().toISOString().slice(0, 10);
    if(streakData.lastDate === today) return;

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yStr = yesterday.toISOString().slice(0, 10);

    if(streakData.lastDate === yStr) {
        streakData.streak++;
    } else {
        streakData.streak = 1;
    }
    streakData.lastDate = today;
    streakData.totalDays++;
    try { localStorage.setItem('cityStreak_v7', JSON.stringify(streakData)); } catch(e){}

    var reward = Math.min(50, streakData.streak * 10);
    if(typeof resources !== 'undefined') {
        resources.gold += reward;
        resources.food += Math.floor(reward / 2);
    }

    setTimeout(function() {
        var el = document.getElementById('streak-toast');
        document.getElementById('streak-icon').textContent = streakData.streak >= 7 ? '🔥' : '📅';
        document.getElementById('streak-title').textContent = streakData.streak + '일 연속 출석!';
        document.getElementById('streak-desc').textContent = '보상: 💰 +' + reward + ', 🌾 +' + Math.floor(reward / 2) + ' | 총 ' + streakData.totalDays + '일 방문';
        el.classList.remove('show');
        void el.offsetWidth;
        el.classList.add('show');
        setTimeout(function() { el.classList.remove('show'); }, 5500);
    }, 3000);

    if(typeof updateHUD === 'function') updateHUD();
    if(typeof checkAchievements === 'function') checkAchievements();
}

// ===================== v7.0 QUIZ QUESTIONS (+15 = 55 total) =====================
var V7_QUIZ_QUESTIONS = [
    { era:0, q:'고조선의 수도는 어디였나요?', opts:['왕검성','경주','한양','평양'], answer:0, explain:'고조선의 수도는 왕검성(아사달)으로, 현재 평양 근처에 있었던 것으로 추정됩니다.' },
    { era:0, q:'철기 문화의 보급으로 고조선에 어떤 변화가 있었나요?', opts:['무기와 농기구 발달','도자기 제작','한글 창제','불교 전래'], answer:0, explain:'철기 문화의 보급으로 무기와 농기구가 발달했고, 농업 생산력이 크게 증가했습니다.' },
    { era:0, q:'고조선의 제천 행사에서 하늘에 제사 지내는 젯달은?', opts:['10월',' 1월','5월','7월'], answer:0, explain:'고조선에서는 10월에 무천(舞天) 제천 행사를 열었습니다. 부여의 영고와 비슷해요.' },
    { era:1, q:'백제의 무령왕릉에서 발견된 것은?', opts:['금관과 장식품','철기','불경','벽화'], answer:0, explain:'무령왕릉은 1971년 발결되었으며, 금관식 꾸메를 비롯한 4,600여 점의 유물이 발견되었습니다.' },
    { era:1, q:'신라의 골품제도에서 가장 높은 신분은?', opts:['성골','진골','두품','아찬'], answer:0, explain:'성골은 신라 골품제의 최고 신분으로, 왕이 될 수 있는 신분이었습니다.' },
    { era:1, q:'가야의 대표적 유물인 금관은 어디에서 발견되었나요?', opts:['경북 고령','경주','부여','공주'], answer:0, explain:'가야의 금관은 경북 고령 지산동 고분군에서 발견된 5세기 유물입니다.' },
    { era:2, q:'고려청자의 비색을 내는 방법은?', opts:['철분을 이용한 산화번조법','쯤빛 색장','미넥스 혼합','나무재 반할 연소'], answer:0, explain:'고려청자의 비색은 철분을 이용한 산화번조법으로 만들어집니다. 이 기술은 비밀로 전해졌어요.' },
    { era:2, q:'고려시대 최고의 군사 방어 시설은?', opts:['민족 항쟁(삼별초)','수원 화성','경복궁','독립문'], answer:0, explain:'고려시대 삼별초(30만 대군)의 민족 항쟁은 몽골에 맞서 조직된 민중 저항이었습니다.' },
    { era:3, q:'조선의 신분제도에서 양반은 어떤 신분이었나요?', opts:['지배층 사대부','상인','농민','노비'], answer:0, explain:'양반은 조선의 지배층으로, 사(+)대부(+) 즉 학자와 관리 출신의 지배 계층이었습니다.' },
    { era:3, q:'조선 세종 때 발명된 시계는?', opts:['자격루','해시계','모래시계','찼시계'], answer:0, explain:'자격루는 장영실이 발명한 자동 물시계로, 시간을 자동으로 알려주었습니다.' },
    { era:3, q:'임진완란 때 이순신의 유명한 해전은?', opts:['명량해전','진포해전','한산도해전','행주해전'], answer:0, explain:'명량해전(1597년)에서 이순신은 13척으로 133척의 일본 수군을 물리쳤습니다.' },
    { era:4, q:'독립협회를 창립한 인물은?', opts:['서재필','안창호','김구','윤치호'], answer:0, explain:'서재필은 1896년 독립협회를 창립하고 독립신문을 발행하여 국민의 자주 의식을 깨우쳤습니다.' },
    { era:4, q:'근대 한국 최초의 철도는?', opts:['경인선','경부선','호남선','중앙선'], answer:0, explain:'경인선(1899년 개통)은 인천과 노량진을 잇는 한국 최초의 철도입니다.' },
    { era:4, q:'광무군은 어디에 본부를 두었나요?', opts:['중국 충칭','상해','미국','러시아'], answer:0, explain:'대한민국 임시정부 광무군은 중국 충칭에 본부를 두고 항일 무장 투쟁을 벌였습니다.' }
];

// ===================== v7.0 ACHIEVEMENTS (+12 = 62 total) =====================
var V7_ACHIEVEMENTS = [
    { id:'v7_diplo_gift_3', icon:'🎁', title:'외교관', desc:'선물을 3번 보냈어요!',
      check: function() { var c = 0; Object.values(diploState).forEach(function(d) { c += d.treaties; }); return c >= 1 || Object.values(diploState).filter(function(d) { return d.favor >= 60; }).length >= 3; } },
    { id:'v7_alliance_1', icon:'⚔', title:'동맹의 시작', desc:'첫 번째 동맹을 체결했어요!',
      check: function() { return Object.values(diploState).some(function(d) { return d.status === 'alliance'; }); } },
    { id:'v7_alliance_all', icon:'🌍', title:'평화의 왕', desc:'모든 나라와 동맹!',
      check: function() { return Object.values(diploState).filter(function(d) { return d.status === 'alliance'; }).length >= 5; } },
    { id:'v7_policy_3', icon:'📋', title:'정치가', desc:'정책 3개를 활성화했어요!',
      check: function() { return activePolicies.size >= 3; } },
    { id:'v7_wonder_1', icon:'🏛', title:'불가사의 건설자', desc:'첫 불가사의를 건설했어요!',
      check: function() { return builtWonders.size >= 1; } },
    { id:'v7_wonder_all', icon:'🏆', title:'불가사의 마스터', desc:'모든 불가사의를 건설했어요!',
      check: function() { return builtWonders.size >= WONDERS.length; } },
    { id:'v7_trade_3', icon:'😢', title:'무역 왕국', desc:'무역로 3개를 개설했어요!',
      check: function() { return v7ActiveTradeRoutes.size >= 3; } },
    { id:'v7_trade_all', icon:'🌊', title:'해상 제국', desc:'모든 무역로를 개설했어요!',
      check: function() { return v7ActiveTradeRoutes.size >= TRADE_ROUTES.length; } },
    { id:'v7_streak_7', icon:'🔥', title:'7일 연속', desc:'7일 연속 출석!',
      check: function() { return streakData.streak >= 7; } },
    { id:'v7_streak_30', icon:'💪', title:'30일 연속', desc:'30일 연속 출석! 대단해요!',
      check: function() { return streakData.streak >= 30; } },
    { id:'v7_quiz_55', icon:'🧠', title:'한국사 달인', desc:'퀴즈 누적 55문제 정답!',
      check: function() { return (typeof totalQuizCorrect !== 'undefined') && totalQuizCorrect >= 55; } },
    { id:'v7_share_first', icon:'📸', title:'첫 공유', desc:'공유 카드를 처음 생성했어요!',
      check: function() { return v7SharedOnce; } }
];

var v7SharedOnce = false;

// ===================== WEB AUDIO SFX (6 new types) =====================
function playV7SFX(type) {
    if(typeof audioCtx === 'undefined' || !audioCtx || (typeof audioMuted !== 'undefined' && audioMuted)) return;
    try {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        var t = audioCtx.currentTime;

        switch(type) {
            case 'diplo_gift':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, t);
                osc.frequency.linearRampToValueAtTime(660, t + 0.15);
                osc.frequency.linearRampToValueAtTime(880, t + 0.3);
                gain.gain.setValueAtTime(0.07, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.start(t); osc.stop(t + 0.4);
                break;
            case 'diplo_alliance':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(330, t);
                osc.frequency.linearRampToValueAtTime(440, t + 0.2);
                osc.frequency.linearRampToValueAtTime(660, t + 0.4);
                osc.frequency.linearRampToValueAtTime(880, t + 0.6);
                gain.gain.setValueAtTime(0.09, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc.start(t); osc.stop(t + 0.8);
                var osc2 = audioCtx.createOscillator();
                var g2 = audioCtx.createGain();
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(440, t + 0.1);
                osc2.frequency.linearRampToValueAtTime(880, t + 0.5);
                g2.gain.setValueAtTime(0.04, t + 0.1);
                g2.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc2.connect(g2); g2.connect(audioCtx.destination);
                osc2.start(t + 0.1); osc2.stop(t + 0.8);
                break;
            case 'diplo_event':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.linearRampToValueAtTime(392, t + 0.2);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
            case 'policy_activate':
                osc.type = 'square';
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.linearRampToValueAtTime(659, t + 0.1);
                osc.frequency.linearRampToValueAtTime(784, t + 0.2);
                gain.gain.setValueAtTime(0.04, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
            case 'wonder_build':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(262, t);
                osc.frequency.linearRampToValueAtTime(330, t + 0.2);
                osc.frequency.linearRampToValueAtTime(392, t + 0.4);
                osc.frequency.linearRampToValueAtTime(523, t + 0.6);
                osc.frequency.linearRampToValueAtTime(784, t + 0.8);
                osc.frequency.linearRampToValueAtTime(1047, t + 1.0);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
                osc.start(t); osc.stop(t + 1.2);
                var osc3 = audioCtx.createOscillator();
                var g3 = audioCtx.createGain();
                osc3.type = 'triangle';
                osc3.frequency.setValueAtTime(392, t + 0.2);
                osc3.frequency.linearRampToValueAtTime(784, t + 0.8);
                g3.gain.setValueAtTime(0.05, t + 0.2);
                g3.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
                osc3.connect(g3); g3.connect(audioCtx.destination);
                osc3.start(t + 0.2); osc3.stop(t + 1.2);
                break;
            case 'trade_toggle':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587, t);
                osc.frequency.linearRampToValueAtTime(784, t + 0.12);
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                osc.start(t); osc.stop(t + 0.25);
                break;
            case 'share':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(698, t);
                osc.frequency.linearRampToValueAtTime(880, t + 0.08);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.16);
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                v7SharedOnce = true;
                break;
        }
    } catch(e){}
}

// ===================== v7.0 ADVISOR TIPS (+10) =====================
var V7_ADVISOR_TIPS = [
    '💡 외교에서 이웃 나라에 선물을 보내면 호감도가 올라가요! (키보드 D)',
    '💡 정책은 최대 3개까지 활성화할 수 있어요. 상황에 맞게 조합하세요! (키보드 P)',
    '💡 불가사의를 건설하면 영구적인 보너스를 받아요! (키보드 W)',
    '💡 무역로를 개설하면 매 턴 자원이 자동으로 들어와요! (키보드 T)',
    '💡 고인돌은 세계 고인돌의 40%가 한국에 있어요! 유네스코 세계유산이에요.',
    '💡 팔만대장경은 81,258장의 목판으로 만든 불교 경전이에요.',
    '💡 직지심체요절은 구텐베르크보다 78년 빠른 세계 최초 금속활자 인쇄본이에요!',
    '💡 동맹을 체결하면 재해 때 도움을 받을 수 있어요.',
    '💡 경인선(1899년)은 한국 최초의 철도입니다.',
    '💡 매일 접속하면 연속 출석 보상을 받을 수 있어요!'
];

// ===================== HOOK INTO EXISTING SYSTEMS =====================
function hookV7RecalcRates() {
    var prevRecalc = window.recalcRates;
    if(!prevRecalc) return;
    window.recalcRates = function() {
        prevRecalc();

        var wonderFood = getWonderMultiplier('food_mult');
        var wonderGold = getWonderMultiplier('gold_mult');
        var wonderCulture = getWonderMultiplier('culture_mult');
        var wonderPop = getWonderMultiplier('pop_mult');
        var wonderCost = getWonderMultiplier('cost_reduce');

        if(wonderFood > 0 && typeof rates !== 'undefined') rates.food = Math.floor(rates.food * (1 + wonderFood));
        if(wonderGold > 0 && typeof rates !== 'undefined') rates.gold = Math.floor(rates.gold * (1 + wonderGold));
        if(wonderCulture > 0 && typeof rates !== 'undefined') rates.culture = Math.floor(rates.culture * (1 + wonderCulture));
        if(wonderPop > 0 && typeof rates !== 'undefined') rates.pop = Math.floor(rates.pop * (1 + wonderPop));

        var polFood = getPolicyMultiplier('food_mult');
        var polGold = getPolicyMultiplier('gold_mult');
        var polCulture = getPolicyMultiplier('culture_mult');
        var polPop = getPolicyMultiplier('pop_mult');

        if(polFood !== 0 && typeof rates !== 'undefined') rates.food = Math.floor(rates.food * (1 + polFood));
        if(polGold !== 0 && typeof rates !== 'undefined') rates.gold = Math.floor(rates.gold * (1 + polGold));
        if(polCulture !== 0 && typeof rates !== 'undefined') rates.culture = Math.floor(rates.culture * (1 + polCulture));
        if(polPop !== 0 && typeof rates !== 'undefined') rates.pop = Math.floor(rates.pop * (1 + polPop));
    };
}

function hookV7GameTick() {
    var prevTick = window.gameTick;
    if(!prevTick) return;
    window.gameTick = function() {
        prevTick();
        if(typeof speed !== 'undefined' && speed === 0) return;
        tickDiplomacy();
        tickTradeRoutes();
        checkDiploEvent();
    };
}

function hookV7CheckAchievements() {
    var prevCheck = window.checkAchievements;
    if(!prevCheck) return;
    window.checkAchievements = function() {
        prevCheck();
        V7_ACHIEVEMENTS.forEach(function(ach) {
            if(typeof unlockedAchievements !== 'undefined' && !unlockedAchievements.has(ach.id) && ach.check()) {
                unlockedAchievements.add(ach.id);
                var el = document.createElement('div');
                el.className = 'ach-toast';
                el.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + ach.icon + ' ' + ach.title + '</div><div class="a-desc">' + ach.desc + '</div>';
                document.body.appendChild(el);
                setTimeout(function() { el.remove(); }, 4500);
                if(typeof playAchievementSound === 'function') playAchievementSound();
            }
        });
    };
}

function hookV7ShowAchievements() {
    var prevShow = window.showAchievements;
    if(!prevShow) return;
    window.showAchievements = function() {
        prevShow();
        var listEl = document.getElementById('ach-list');
        if(!listEl) return;
        var sep = document.createElement('div');
        sep.style.cssText = 'text-align:center;color:#c080ff;font-size:12px;margin:12px 0 8px;padding-top:8px;border-top:1px solid rgba(192,128,255,0.3);';
        sep.textContent = '— v7.0 🤝 외교·정책·불가사의·무역 —';
        listEl.appendChild(sep);
        V7_ACHIEVEMENTS.forEach(function(ach) {
            var unlocked = (typeof unlockedAchievements !== 'undefined') && unlockedAchievements.has(ach.id);
            var div = document.createElement('div');
            div.className = 'ach-item' + (unlocked ? ' unlocked' : '');
            div.innerHTML = '<div class="ai-icon">' + ach.icon + '</div><div class="ai-info"><div class="ai-title">' + ach.title + '</div><div class="ai-desc">' + ach.desc + '</div></div>';
            listEl.appendChild(div);
        });
    };
}

function hookV7ShowVictory() {
    var prevVictory = window.showVictory;
    if(!prevVictory) return;
    window.showVictory = function() {
        prevVictory();
        var vStats = document.getElementById('v-stats');
        if(vStats) {
            vStats.innerHTML += '<p>🤝 외교 동맹: ' + Object.values(diploState).filter(function(d) { return d.status === 'alliance'; }).length + '/5</p>';
            vStats.innerHTML += '<p>🏛 불가사의: ' + builtWonders.size + '/' + WONDERS.length + '</p>';
            vStats.innerHTML += '<p>😢 무역로: ' + v7ActiveTradeRoutes.size + '/' + TRADE_ROUTES.length + '</p>';
            vStats.innerHTML += '<p>📋 정책: ' + activePolicies.size + '/' + MAX_POLICIES + '</p>';
        }
    };
}

function hookV7Quiz() {
    if(!window.QUIZ_QUESTIONS) return;
    V7_QUIZ_QUESTIONS.forEach(function(q) {
        var exists = false;
        for(var i = 0; i < window.QUIZ_QUESTIONS.length; i++) {
            if(window.QUIZ_QUESTIONS[i].q === q.q) { exists = true; break; }
        }
        if(!exists) window.QUIZ_QUESTIONS.push(q);
    });
}

function hookV7AdvisorTips() {
    if(window.V5_ADVISOR_TIPS) {
        V7_ADVISOR_TIPS.forEach(function(tip) {
            if(window.V5_ADVISOR_TIPS.indexOf(tip) === -1) window.V5_ADVISOR_TIPS.push(tip);
        });
    }
}

function hookV7AutoSave() {
    var prevSave = window.autoSave;
    if(!prevSave) return;
    window.autoSave = function() {
        prevSave();
        try {
            localStorage.setItem('cityDiplo_v7', JSON.stringify(diploState));
            localStorage.setItem('cityPolicies_v7', JSON.stringify(Array.from(activePolicies)));
            localStorage.setItem('cityWonders_v7', JSON.stringify(Array.from(builtWonders)));
            localStorage.setItem('cityTrades_v7', JSON.stringify(Array.from(v7ActiveTradeRoutes)));
            localStorage.setItem('cityStreak_v7', JSON.stringify(streakData));
        } catch(e){}
    };
}

function hookV7Keyboard() {
    window.addEventListener('keydown', function(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return;
        var panels = ['diplo-panel','policy-panel','wonder-panel','trade-panel','share-panel'];
        var anyOpen = panels.some(function(pid) {
            var el = document.getElementById(pid);
            return el && el.classList.contains('show');
        });
        if(anyOpen) return;

        switch(e.key.toLowerCase()) {
            case 'd': showDiplomacy(); break;
            case 'p': showPolicies(); break;
            case 'w': showWonders(); break;
            case 't': showTradeRoutes(); break;
            case 'c': showShareCard(); break;
        }
    });
}

// ===================== INITIALIZATION =====================
function initV7() {
    initDiploState();
    addV7UI();
    hookV7RecalcRates();
    hookV7GameTick();
    hookV7CheckAchievements();
    hookV7ShowAchievements();
    hookV7ShowVictory();
    hookV7Quiz();
    hookV7AdvisorTips();
    hookV7AutoSave();
    hookV7Keyboard();

    checkLoginStreak();

    if(typeof toast === 'function') {
        setTimeout(function() {
            toast('🤝 v7.0: 외교 + 정책 + 불가사의 + 무역로 + 공유카드!');
        }, 4000);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(initV7, 800); });
} else {
    setTimeout(initV7, 800);
}

})();
