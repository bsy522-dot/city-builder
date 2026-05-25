// =====================================================================
// city-builder v7_patch.js — PRIME Holdings NEXTERA+PRISM v7.0
// Self-contained patch: Diplomacy, Education Level, Landmarks, City Rating,
// Share Card, History Timeline, Daily Challenge, Building Collection Rewards,
// +15 Quiz, +12 Achievements, SFX 6 types, Keyboard Shortcuts +4
// =====================================================================
(function(){
'use strict';

// ===================== CSS INJECTION =====================
const V7_CSS = `
/* ===== v7.0 Diplomacy Panel ===== */
#diplo-btn {
    position: fixed; top: 410px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #80c0ff;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#diplo-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#diplo-panel.show { display: flex; }
#diplo-box {
    background: linear-gradient(145deg, #0a1a2e, #061428);
    border: 2px solid #4080c0; border-radius: 16px;
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#diplo-box h2 { color: #4080c0; text-align: center; margin-bottom: 12px; }
.diplo-nation {
    display: flex; align-items: center; gap: 12px; padding: 12px;
    margin-bottom: 8px; border-radius: 12px;
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);
    transition: all 0.2s;
}
.diplo-nation .dn-icon { font-size: 32px; flex-shrink: 0; }
.diplo-nation .dn-info { flex: 1; }
.diplo-nation .dn-name { font-weight: bold; font-size: 14px; color: #eee; }
.diplo-nation .dn-status { font-size: 11px; margin-top: 2px; }
.diplo-nation .dn-status.friendly { color: #80ff80; }
.diplo-nation .dn-status.neutral { color: #ffcc40; }
.diplo-nation .dn-status.hostile { color: #ff6060; }
.diplo-nation .dn-effect { font-size: 10px; color: #aaa; margin-top: 3px; }
.diplo-nation .dn-bar { width: 100%; height: 6px; background: #222; border-radius: 3px; margin-top: 4px; overflow: hidden; }
.diplo-nation .dn-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
.diplo-actions { display: flex; gap: 4px; margin-top: 6px; }
.diplo-actions button {
    flex: 1; padding: 5px 8px; border-radius: 8px; border: 1px solid #555;
    background: rgba(255,255,255,0.08); color: #ccc; font-size: 10px; cursor: pointer;
    transition: all 0.2s;
}
.diplo-actions button:hover { background: rgba(64,128,192,0.3); border-color: #4080c0; }
.diplo-actions button:disabled { opacity: 0.3; cursor: not-allowed; }

/* ===== v7.0 Education Panel ===== */
#edu-btn {
    position: fixed; top: 450px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #a0d0ff;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#edu-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#edu-panel.show { display: flex; }
#edu-box {
    background: linear-gradient(145deg, #1a1a3e, #0e0e28);
    border: 2px solid #6080ff; border-radius: 16px;
    padding: 24px; max-width: 480px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#edu-box h2 { color: #6080ff; text-align: center; margin-bottom: 12px; }
.edu-level-card {
    padding: 14px; margin-bottom: 10px; border-radius: 12px;
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);
    transition: all 0.2s;
}
.edu-level-card.current { border-color: #6080ff; background: rgba(96,128,255,0.12); }
.edu-level-card.locked { opacity: 0.4; }
.edu-level-card .el-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.edu-level-card .el-icon { font-size: 28px; }
.edu-level-card .el-name { font-weight: bold; font-size: 15px; color: #eee; }
.edu-level-card .el-tag { font-size: 10px; padding: 2px 8px; border-radius: 10px; background: #6080ff; color: #fff; margin-left: auto; }
.edu-level-card .el-desc { font-size: 12px; color: #aaa; margin-bottom: 6px; }
.edu-level-card .el-bonus { font-size: 11px; color: #80ff80; }
.edu-level-card .el-req { font-size: 11px; color: #ffaa40; margin-top: 4px; }
.edu-upgrade-btn {
    display: block; width: 100%; padding: 10px; margin-top: 6px;
    background: linear-gradient(135deg, #6080ff, #4060dd); border: none;
    color: #fff; border-radius: 10px; font-size: 13px; font-weight: bold;
    cursor: pointer; transition: all 0.2s;
}
.edu-upgrade-btn:hover { background: linear-gradient(135deg, #7090ff, #5070ee); }
.edu-upgrade-btn:disabled { background: #333; cursor: not-allowed; color: #666; }

/* ===== v7.0 Landmark Panel ===== */
#landmark-btn {
    position: fixed; top: 490px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ffc040;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#landmark-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#landmark-panel.show { display: flex; }
#landmark-box {
    background: linear-gradient(145deg, #2a1a0a, #1a0a00);
    border: 2px solid #ffc040; border-radius: 16px;
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#landmark-box h2 { color: #ffc040; text-align: center; margin-bottom: 12px; }
.landmark-card {
    display: flex; gap: 12px; padding: 14px; margin-bottom: 8px;
    border-radius: 12px; background: rgba(255,255,255,0.04);
    border: 2px solid rgba(255,255,255,0.08); transition: all 0.2s;
}
.landmark-card.built { border-color: #ffc040; background: rgba(255,192,64,0.1); }
.landmark-card.locked { opacity: 0.4; }
.landmark-card .lm-icon { font-size: 36px; flex-shrink: 0; }
.landmark-card .lm-info { flex: 1; }
.landmark-card .lm-name { font-weight: bold; font-size: 14px; color: #eee; }
.landmark-card .lm-desc { font-size: 11px; color: #aaa; margin-top: 3px; line-height: 1.5; }
.landmark-card .lm-bonus { font-size: 11px; color: #80ff80; margin-top: 4px; }
.landmark-card .lm-cost { font-size: 11px; color: #ffc040; margin-top: 3px; }
.landmark-card.built .lm-name { color: #ffc040; }
.lm-build-btn {
    padding: 6px 14px; margin-top: 6px; border-radius: 8px;
    background: #ffc040; border: none; color: #1a0a00; font-size: 11px;
    font-weight: bold; cursor: pointer;
}
.lm-build-btn:disabled { background: #555; color: #999; cursor: not-allowed; }

/* ===== v7.0 City Rating Panel ===== */
#rating-btn {
    position: fixed; top: 50px; right: 268px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #ff80c0;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#rating-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#rating-panel.show { display: flex; }
#rating-box {
    background: linear-gradient(145deg, #2a0a2a, #1a001a);
    border: 2px solid #ff60a0; border-radius: 16px;
    padding: 24px; max-width: 460px; width: 100%; max-height: 85vh; overflow-y: auto;
    text-align: center;
}
#rating-box h2 { color: #ff60a0; margin-bottom: 14px; }
.rating-grade {
    font-size: 72px; font-weight: 900; margin: 10px 0;
    background: linear-gradient(135deg, #ffd700, #ff60a0);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
}
.rating-score { font-size: 20px; color: #ffd700; margin-bottom: 16px; }
.rating-bars { text-align: left; }
.rating-bar-row {
    display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 12px;
}
.rating-bar-label { width: 70px; color: #aaa; text-align: right; }
.rating-bar-track { flex: 1; height: 10px; background: #222; border-radius: 5px; overflow: hidden; }
.rating-bar-fill { height: 100%; border-radius: 5px; transition: width 0.5s; }
.rating-bar-val { width: 40px; color: #ffd700; font-weight: bold; }

/* ===== v7.0 Share Card ===== */
#share-card-overlay {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 300;
    justify-content: center; align-items: center; padding: 20px;
}
#share-card-overlay.show { display: flex; }
#share-card-box {
    background: #1a1a2e; border: 2px solid #ffd700; border-radius: 16px;
    padding: 20px; max-width: 640px; width: 100%; text-align: center;
}
#share-canvas { max-width: 100%; border-radius: 10px; margin: 10px 0; }
.share-actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.share-actions button {
    padding: 10px 20px; border-radius: 12px; border: none; font-size: 13px;
    font-weight: bold; cursor: pointer; transition: all 0.2s;
}
.share-dl { background: #ffd700; color: #1a0a00; }
.share-copy { background: #4080c0; color: #fff; }
.share-close { background: #555; color: #fff; }

/* ===== v7.0 Timeline Panel ===== */
#timeline-btn {
    position: fixed; top: 530px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #e0a040;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
#timeline-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#timeline-panel.show { display: flex; }
#timeline-box {
    background: linear-gradient(145deg, #2a2010, #1a1008);
    border: 2px solid #e0a040; border-radius: 16px;
    padding: 24px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#timeline-box h2 { color: #e0a040; text-align: center; margin-bottom: 14px; }
.tl-item {
    display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(224,160,64,0.15);
    font-size: 12px; align-items: flex-start;
}
.tl-year { flex-shrink: 0; width: 80px; text-align: right; color: #e0a040; font-weight: bold; font-size: 13px; padding-top: 2px; }
.tl-dot { flex-shrink: 0; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #e0a040; margin-top: 4px; }
.tl-dot.active { background: #e0a040; }
.tl-content { flex: 1; }
.tl-title { font-weight: bold; color: #eee; font-size: 13px; }
.tl-desc { color: #aaa; margin-top: 3px; line-height: 1.5; }

/* ===== v7.0 Daily Challenge ===== */
#daily-btn {
    position: fixed; top: 570px; right: 10px; z-index: 10;
    background: rgba(0,0,0,0.7); border: 1px solid #555; color: #40e080;
    width: 36px; height: 36px; border-radius: 8px; font-size: 18px; cursor: pointer;
}
.daily-badge {
    position: absolute; top: -4px; right: -4px; background: #40e080;
    color: #000; font-size: 8px; width: 14px; height: 14px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-weight: bold;
}
#daily-panel {
    display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9); z-index: 200;
    justify-content: center; align-items: center; padding: 20px;
}
#daily-panel.show { display: flex; }
#daily-box {
    background: linear-gradient(145deg, #0a2a1a, #001a0a);
    border: 2px solid #40e080; border-radius: 16px;
    padding: 24px; max-width: 460px; width: 100%; max-height: 85vh; overflow-y: auto;
}
#daily-box h2 { color: #40e080; text-align: center; margin-bottom: 6px; }
.daily-streak { text-align: center; color: #ffd700; font-size: 13px; margin-bottom: 14px; }
.daily-task {
    display: flex; align-items: center; gap: 10px; padding: 12px;
    margin-bottom: 8px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 2px solid rgba(255,255,255,0.08);
}
.daily-task.completed { border-color: #40e080; background: rgba(64,224,128,0.1); }
.daily-task .dt-check { font-size: 20px; flex-shrink: 0; }
.daily-task .dt-info { flex: 1; }
.daily-task .dt-title { font-weight: bold; font-size: 13px; color: #eee; }
.daily-task .dt-desc { font-size: 11px; color: #aaa; margin-top: 2px; }
.daily-task .dt-reward { font-size: 10px; color: #ffd700; margin-top: 3px; }
.daily-task .dt-progress { margin-top: 4px; height: 5px; background: #222; border-radius: 3px; overflow: hidden; }
.daily-task .dt-progress-bar { height: 100%; background: linear-gradient(90deg, #40e080, #80ff40); border-radius: 3px; transition: width 0.3s; }

/* ===== v7.0 Mobile ===== */
@media (max-width: 600px) {
    #diplo-btn { top: 328px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #edu-btn { top: 362px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #landmark-btn { top: 396px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #timeline-btn { top: 430px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #daily-btn { top: 464px; right: 6px; width: 30px; height: 30px; font-size: 14px; }
    #rating-btn { right: 218px; width: 30px; height: 30px; font-size: 14px; }
    .diplo-nation { padding: 8px; font-size: 11px; }
    .landmark-card { padding: 10px; }
    .tl-year { width: 65px; font-size: 11px; }
}
@media (max-width: 400px) {
    #diplo-btn, #edu-btn, #landmark-btn, #timeline-btn, #daily-btn {
        width: 26px; height: 26px; font-size: 12px;
    }
    #rating-btn { width: 26px; height: 26px; font-size: 12px; }
}
`;
const v7Style = document.createElement('style');
v7Style.textContent = V7_CSS;
document.head.appendChild(v7Style);

// ===================== UTILITY =====================
function v7Toast(msg) { if(typeof toast === 'function') toast(msg); }
function v7Chronicle(icon, text) { if(typeof addChronicle === 'function') addChronicle(icon, text); }

// ===================== UI ELEMENTS =====================
function addV7UI() {
    // Diplomacy Button
    var diploBtn = document.createElement('button');
    diploBtn.id = 'diplo-btn';
    diploBtn.title = '외교';
    diploBtn.setAttribute('aria-label', '외교');
    diploBtn.textContent = '🌍';
    diploBtn.onclick = showDiplomacy;
    document.body.appendChild(diploBtn);

    // Diplomacy Panel
    var diploPanel = document.createElement('div');
    diploPanel.id = 'diplo-panel';
    diploPanel.setAttribute('role', 'dialog');
    diploPanel.setAttribute('aria-label', '외교');
    diploPanel.innerHTML = '<div id="diplo-box"><h2>🌍 외교 관계</h2><div style="text-align:center;color:#aaa;font-size:12px;margin-bottom:12px;">주변국과 관계를 관리하세요</div><div id="diplo-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#4080c0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'diplo-panel\').classList.remove(\'show\');">닫기</button></div>';
    diploPanel.onclick = function(e) { if(e.target.id === 'diplo-panel') diploPanel.classList.remove('show'); };
    document.body.appendChild(diploPanel);

    // Education Button
    var eduBtn = document.createElement('button');
    eduBtn.id = 'edu-btn';
    eduBtn.title = '교육';
    eduBtn.setAttribute('aria-label', '교육');
    eduBtn.textContent = '🎓';
    eduBtn.onclick = showEducation;
    document.body.appendChild(eduBtn);

    // Education Panel
    var eduPanel = document.createElement('div');
    eduPanel.id = 'edu-panel';
    eduPanel.setAttribute('role', 'dialog');
    eduPanel.setAttribute('aria-label', '교육');
    eduPanel.innerHTML = '<div id="edu-box"><h2>🎓 교육 수준</h2><div id="edu-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#6080ff;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'edu-panel\').classList.remove(\'show\');">닫기</button></div>';
    eduPanel.onclick = function(e) { if(e.target.id === 'edu-panel') eduPanel.classList.remove('show'); };
    document.body.appendChild(eduPanel);

    // Landmark Button
    var lmBtn = document.createElement('button');
    lmBtn.id = 'landmark-btn';
    lmBtn.title = '랜드마크';
    lmBtn.setAttribute('aria-label', '랜드마크');
    lmBtn.textContent = '🏛️';
    lmBtn.onclick = showLandmarks;
    document.body.appendChild(lmBtn);

    // Landmark Panel
    var lmPanel = document.createElement('div');
    lmPanel.id = 'landmark-panel';
    lmPanel.setAttribute('role', 'dialog');
    lmPanel.setAttribute('aria-label', '랜드마크');
    lmPanel.innerHTML = '<div id="landmark-box"><h2>🏛️ 세계문화유산 랜드마크</h2><div style="text-align:center;color:#aaa;font-size:12px;margin-bottom:12px;">특별한 건축물을 건설하여 도시를 빛내세요</div><div id="landmark-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#ffc040;color:#1a0a00;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'landmark-panel\').classList.remove(\'show\');">닫기</button></div>';
    lmPanel.onclick = function(e) { if(e.target.id === 'landmark-panel') lmPanel.classList.remove('show'); };
    document.body.appendChild(lmPanel);

    // City Rating Button
    var ratingBtn = document.createElement('button');
    ratingBtn.id = 'rating-btn';
    ratingBtn.title = '도시 평가';
    ratingBtn.setAttribute('aria-label', '도시 평가');
    ratingBtn.textContent = '🏅';
    ratingBtn.onclick = showCityRating;
    document.body.appendChild(ratingBtn);

    // Rating Panel
    var ratingPanel = document.createElement('div');
    ratingPanel.id = 'rating-panel';
    ratingPanel.setAttribute('role', 'dialog');
    ratingPanel.setAttribute('aria-label', '도시 평가');
    ratingPanel.innerHTML = '<div id="rating-box"><h2>🏅 도시 평가</h2><div id="rating-content"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#ff60a0;color:#fff;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'rating-panel\').classList.remove(\'show\');">닫기</button></div>';
    ratingPanel.onclick = function(e) { if(e.target.id === 'rating-panel') ratingPanel.classList.remove('show'); };
    document.body.appendChild(ratingPanel);

    // Share Card Overlay
    var shareOverlay = document.createElement('div');
    shareOverlay.id = 'share-card-overlay';
    shareOverlay.innerHTML = '<div id="share-card-box"><h2 style="color:#ffd700;margin-bottom:10px;">📷 도시 성적표</h2><canvas id="share-canvas" width="600" height="380"></canvas><div class="share-actions"><button class="share-dl" onclick="downloadShareCard()">📥 다운로드</button><button class="share-copy" onclick="copyShareCard()">📋 복사</button><button class="share-close" onclick="document.getElementById(\'share-card-overlay\').classList.remove(\'show\');">닫기</button></div></div>';
    shareOverlay.onclick = function(e) { if(e.target.id === 'share-card-overlay') shareOverlay.classList.remove('show'); };
    document.body.appendChild(shareOverlay);

    // Timeline Button
    var tlBtn = document.createElement('button');
    tlBtn.id = 'timeline-btn';
    tlBtn.title = '역사 연표';
    tlBtn.setAttribute('aria-label', '역사 연표');
    tlBtn.textContent = '📅';
    tlBtn.onclick = showTimeline;
    document.body.appendChild(tlBtn);

    // Timeline Panel
    var tlPanel = document.createElement('div');
    tlPanel.id = 'timeline-panel';
    tlPanel.setAttribute('role', 'dialog');
    tlPanel.setAttribute('aria-label', '역사 연표');
    tlPanel.innerHTML = '<div id="timeline-box"><h2>📅 한국사 연표</h2><div id="timeline-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#e0a040;color:#1a0a00;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'timeline-panel\').classList.remove(\'show\');">닫기</button></div>';
    tlPanel.onclick = function(e) { if(e.target.id === 'timeline-panel') tlPanel.classList.remove('show'); };
    document.body.appendChild(tlPanel);

    // Daily Challenge Button
    var dailyBtn = document.createElement('button');
    dailyBtn.id = 'daily-btn';
    dailyBtn.title = '일일 도전';
    dailyBtn.setAttribute('aria-label', '일일 도전');
    dailyBtn.style.position = 'relative';
    dailyBtn.innerHTML = '🎯<span class="daily-badge" id="daily-badge" style="display:none;">!</span>';
    dailyBtn.onclick = showDailyChallenge;
    document.body.appendChild(dailyBtn);

    // Daily Panel
    var dailyPanel = document.createElement('div');
    dailyPanel.id = 'daily-panel';
    dailyPanel.setAttribute('role', 'dialog');
    dailyPanel.setAttribute('aria-label', '일일 도전');
    dailyPanel.innerHTML = '<div id="daily-box"><h2>🎯 일일 도전</h2><div class="daily-streak" id="daily-streak"></div><div id="daily-list"></div><button class="t-btn" style="display:block;margin:14px auto 0;background:#40e080;color:#000;border:none;padding:10px 28px;border-radius:20px;font-size:14px;font-weight:bold;cursor:pointer;" onclick="document.getElementById(\'daily-panel\').classList.remove(\'show\');">닫기</button></div>';
    dailyPanel.onclick = function(e) { if(e.target.id === 'daily-panel') dailyPanel.classList.remove('show'); };
    document.body.appendChild(dailyPanel);
}

// ===================== DIPLOMACY SYSTEM =====================
var NATIONS = [
    { id:'china', icon:'🇨🇳', name:'중국 (한/수/당)', desc:'대륙의 강대한 나라', eras:[0,1,2,3,4], tradeBonus:{ gold:8 }, warPenalty:{ happy:-10, gold:-20 } },
    { id:'japan', icon:'🇯🇵', name:'일본 (야마토/와)', desc:'바다 건너 동쪽 섬나라', eras:[1,2,3,4], tradeBonus:{ gold:6, culture:3 }, warPenalty:{ happy:-15, food:-10 } },
    { id:'mongol', icon:'🇲🇳', name:'몬골 제국', desc:'초원의 기마 민족', eras:[2,3], tradeBonus:{ food:5, gold:5 }, warPenalty:{ pop:-20, happy:-20 } },
    { id:'khitan', icon:'🏯', name:'거란 (요)', desc:'북방의 유목 민족', eras:[2], tradeBonus:{ food:4, gold:4 }, warPenalty:{ happy:-12, gold:-15 } },
    { id:'western', icon:'🇬🇧', name:'서양 열강', desc:'근대 문물을 가져온 나라들', eras:[4], tradeBonus:{ culture:10, gold:10 }, warPenalty:{ happy:-15, culture:-10 } },
];

var diploRelations = {};
try {
    var savedDiplo = localStorage.getItem('cityDiplo_v7');
    if(savedDiplo) diploRelations = JSON.parse(savedDiplo);
} catch(e){}

function getDiploLevel(nationId) {
    return diploRelations[nationId] || 50;
}

function setDiploLevel(nationId, val) {
    diploRelations[nationId] = Math.max(0, Math.min(100, val));
    try { localStorage.setItem('cityDiplo_v7', JSON.stringify(diploRelations)); } catch(e){}
}

function getDiploStatus(level) {
    if(level >= 70) return { text:'우호적', cls:'friendly' };
    if(level >= 40) return { text:'중립', cls:'neutral' };
    return { text:'적대적', cls:'hostile' };
}

function getDiploTradeBonus() {
    var bonus = { gold:0, food:0, culture:0 };
    NATIONS.forEach(function(n) {
        if(typeof currentEra === 'undefined' || !n.eras.includes(currentEra)) return;
        var level = getDiploLevel(n.id);
        if(level >= 70) {
            var tb = n.tradeBonus;
            if(tb.gold) bonus.gold += tb.gold;
            if(tb.food) bonus.food += tb.food;
            if(tb.culture) bonus.culture += tb.culture;
        }
    });
    return bonus;
}

function showDiplomacy() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('diplo-list');
    list.innerHTML = '';
    NATIONS.forEach(function(n) {
        if(typeof currentEra === 'undefined' || !n.eras.includes(currentEra)) return;
        var level = getDiploLevel(n.id);
        var status = getDiploStatus(level);
        var fillColor = level >= 70 ? '#4caf50' : level >= 40 ? '#ffcc40' : '#ff4040';
        var div = document.createElement('div');
        div.className = 'diplo-nation';
        div.innerHTML = '<div class="dn-icon">' + n.icon + '</div>' +
            '<div class="dn-info"><div class="dn-name">' + n.name + '</div>' +
            '<div class="dn-status ' + status.cls + '">' + status.text + ' (호감도 ' + level + ')</div>' +
            '<div class="dn-effect">' + n.desc + '</div>' +
            '<div class="dn-bar"><div class="dn-fill" style="width:' + level + '%;background:' + fillColor + ';"></div></div>' +
            '<div class="diplo-actions">' +
            '<button id="diplo-gift-' + n.id + '">🎁 선물 (💰 50)</button>' +
            '<button id="diplo-trade-' + n.id + '">🤝 교역 제안</button>' +
            '<button id="diplo-threat-' + n.id + '">⚔️ 위협</button>' +
            '</div></div>';
        list.appendChild(div);

        document.getElementById('diplo-gift-' + n.id).onclick = function() {
            if(typeof resources === 'undefined' || resources.gold < 50) { v7Toast('💰 금이 부족해요!'); return; }
            resources.gold -= 50;
            setDiploLevel(n.id, getDiploLevel(n.id) + 15);
            v7Toast('🎁 ' + n.name + '에 선물을 보냈어요! 호감도 +15');
            v7Chronicle('🌍', n.name + '에 선물 외교');
            if(typeof updateHUD === 'function') updateHUD();
            playV7SFX('diplomacy');
            showDiplomacy();
        };
        document.getElementById('diplo-trade-' + n.id).onclick = function() {
            var lv = getDiploLevel(n.id);
            if(lv < 40) { v7Toast('호감도가 너무 낮아요!'); return; }
            setDiploLevel(n.id, lv + 8);
            var tb = n.tradeBonus;
            if(tb.gold) resources.gold += tb.gold * 3;
            if(tb.food) resources.food += tb.food * 3;
            if(tb.culture) resources.culture += tb.culture * 2;
            v7Toast('🤝 ' + n.name + '과 교역 성공!');
            v7Chronicle('🤝', n.name + '과 교역');
            if(typeof updateHUD === 'function') updateHUD();
            playV7SFX('diplomacy');
            showDiplomacy();
        };
        document.getElementById('diplo-threat-' + n.id).onclick = function() {
            setDiploLevel(n.id, getDiploLevel(n.id) - 20);
            var wp = n.warPenalty;
            if(Math.random() < 0.4) {
                resources.gold += 80;
                v7Toast('⚔️ ' + n.name + '이 공물을 바쳤어요! 💰+80');
            } else {
                if(wp.happy) resources.happy = Math.max(0, resources.happy + wp.happy);
                if(wp.gold) resources.gold = Math.max(0, resources.gold + wp.gold);
                if(wp.pop) resources.pop = Math.max(10, resources.pop + wp.pop);
                if(wp.food) resources.food = Math.max(0, resources.food + wp.food);
                v7Toast('⚔️ ' + n.name + '이 보복했어요...');
            }
            v7Chronicle('⚔️', n.name + '에 위협 외교');
            if(typeof updateHUD === 'function') updateHUD();
            playV7SFX('diplomacy');
            showDiplomacy();
        };
    });
    document.getElementById('diplo-panel').classList.add('show');
}

// ===================== EDUCATION SYSTEM =====================
var EDU_LEVELS = [
    { id:'illiterate', level:0, icon:'📝', name:'문맹 (기본)', desc:'글을 모르는 백성이 대부분이에요.', bonus:'생산 보너스 없음', effect:{ culture:0, gold:0 }, req:{ culture:0, pop:0, buildings:0 } },
    { id:'basic', level:1, icon:'📚', name:'초등 교육', desc:'서당과 향교에서 글을 배워요.', bonus:'문화 +15%, 금 +10%', effect:{ culture:0.15, gold:0.10 }, req:{ culture:50, pop:100, buildings:10 } },
    { id:'intermediate', level:2, icon:'🏫', name:'중등 교육', desc:'서원과 성균관에서 학문을 익혀요.', bonus:'문화 +30%, 금 +20%, 식량 +10%', effect:{ culture:0.30, gold:0.20, food:0.10 }, req:{ culture:150, pop:300, buildings:30 } },
    { id:'advanced', level:3, icon:'🎓', name:'고등 교육', desc:'근대 학교와 대학에서 과학을 배워요.', bonus:'문화 +50%, 금 +35%, 식량 +20%, 행복 +5', effect:{ culture:0.50, gold:0.35, food:0.20, happy:5 }, req:{ culture:300, pop:800, buildings:60 } },
];

var educationLevel = 0;
try {
    var savedEdu = localStorage.getItem('cityEdu_v7');
    if(savedEdu) educationLevel = parseInt(savedEdu) || 0;
} catch(e){}

function getEduBonus(type) {
    var lv = EDU_LEVELS[educationLevel];
    if(!lv || !lv.effect[type]) return 0;
    return lv.effect[type];
}

function showEducation() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('edu-list');
    list.innerHTML = '';
    EDU_LEVELS.forEach(function(edu) {
        var isCurrent = (edu.level === educationLevel);
        var isLocked = (edu.level > educationLevel + 1);
        var isNext = (edu.level === educationLevel + 1);
        var canUpgrade = isNext && typeof resources !== 'undefined' &&
            resources.culture >= edu.req.culture &&
            resources.pop >= edu.req.pop &&
            (typeof buildCount !== 'undefined' && buildCount >= edu.req.buildings);

        var card = document.createElement('div');
        card.className = 'edu-level-card' + (isCurrent ? ' current' : '') + (isLocked ? ' locked' : '');
        var html = '<div class="el-header"><div class="el-icon">' + edu.icon + '</div>' +
            '<div class="el-name">' + edu.name + '</div>';
        if(isCurrent) html += '<div class="el-tag">현재</div>';
        else if(edu.level < educationLevel) html += '<div class="el-tag" style="background:#4caf50;">완료</div>';
        html += '</div><div class="el-desc">' + edu.desc + '</div>' +
            '<div class="el-bonus">📈 ' + edu.bonus + '</div>';
        if(isNext) {
            html += '<div class="el-req">필요: 🏛️ ' + edu.req.culture + ' + 👥 ' + edu.req.pop + ' + 🏗️ ' + edu.req.buildings + '개</div>';
            html += '<button class="edu-upgrade-btn" ' + (canUpgrade ? '' : 'disabled') + ' id="edu-up-' + edu.level + '">⬆️ 교육 수준 승급</button>';
        }
        card.innerHTML = html;
        list.appendChild(card);

        if(isNext && canUpgrade) {
            setTimeout(function() {
                var btn = document.getElementById('edu-up-' + edu.level);
                if(btn) btn.onclick = function() { upgradeEducation(edu); };
            }, 50);
        }
    });
    document.getElementById('edu-panel').classList.add('show');
}

function upgradeEducation(edu) {
    if(typeof resources === 'undefined') return;
    if(resources.culture < edu.req.culture || resources.pop < edu.req.pop) return;
    if(typeof buildCount !== 'undefined' && buildCount < edu.req.buildings) return;
    resources.culture -= Math.floor(edu.req.culture * 0.3);
    educationLevel = edu.level;
    try { localStorage.setItem('cityEdu_v7', String(educationLevel)); } catch(e){}
    v7Toast('🎓 교육 수준이 ' + edu.name + '으로 승급되었어요!');
    v7Chronicle('🎓', '교육 수준 승급: ' + edu.name);
    if(typeof updateHUD === 'function') updateHUD();
    playV7SFX('education');
    showEducation();
}

// ===================== LANDMARKS SYSTEM =====================
var LANDMARKS = [
    { id:'lm_goindol_world', era:0, icon:'🪨', name:'고창 고인돌 유적', desc:'세계문화유산. 전 세계 고인돌의 40%가 한국에 있어요.', cost:{ gold:300, culture:50 }, bonus:'문화 +10/틱, 행복 +8' },
    { id:'lm_cheomseong', era:1, icon:'🔭', name:'경주 첨성대', desc:'동양 최고(古) 천문대. 돌 362개로 쌓았어요.', cost:{ gold:400, culture:80 }, bonus:'문화 +15/틱, 재해 경고 +20%' },
    { id:'lm_bulguksa', era:1, icon:'⛩️', name:'불국사와 석굴암', desc:'세계문화유산. 신라 불교 예술의 걸작.', cost:{ gold:500, culture:100 }, bonus:'문화 +20/틱, 행복 +12' },
    { id:'lm_tripitaka', era:2, icon:'📜', name:'해인사 팔만대장경', desc:'세계기록유산. 81,258장의 목판.', cost:{ gold:600, culture:120 }, bonus:'문화 +25/틱, 금 +10/틱' },
    { id:'lm_jikji', era:2, icon:'📰', name:'직지심체요절', desc:'세계 최고(古) 금속활자본. 구텐베르크보다 200년 빨라요.', cost:{ gold:550, culture:110 }, bonus:'문화 +22/틱, 교육 보너스 x1.5' },
    { id:'lm_gyeongbok', era:3, icon:'🏯', name:'경복궁', desc:'조선 제1의 궁궐. 태조가 1395년에 창건.', cost:{ gold:800, culture:150 }, bonus:'문화 +30/틱, 행복 +15, 인구 +20' },
    { id:'lm_hwaseong', era:3, icon:'🏰', name:'수원화성', desc:'세계문화유산. 정조와 정약용의 과학 성곽.', cost:{ gold:700, culture:130 }, bonus:'문화 +25/틱, 금 +15/틱, 재해 피해 -20%' },
    { id:'lm_independence', era:4, icon:'🗽', name:'독립문과 서대문', desc:'대한제국의 자주독립 상징물.', cost:{ gold:500, culture:100 }, bonus:'문화 +20/틱, 행복 +20, 인구 +30' },
];

var builtLandmarks = new Set();
try {
    var savedLM = localStorage.getItem('cityLandmarks_v7');
    if(savedLM) builtLandmarks = new Set(JSON.parse(savedLM));
} catch(e){}

function getLandmarkBonus(type) {
    var bonus = 0;
    builtLandmarks.forEach(function(lmId) {
        var lm = LANDMARKS.find(function(x){ return x.id === lmId; });
        if(!lm) return;
        var b = lm.bonus;
        if(type === 'culture' && b.indexOf('문화') >= 0) {
            var m = b.match(/문화 \+(\d+)/);
            if(m) bonus += parseInt(m[1]);
        }
        if(type === 'gold' && b.indexOf('금') >= 0) {
            var m2 = b.match(/금 \+(\d+)/);
            if(m2) bonus += parseInt(m2[1]);
        }
        if(type === 'happy' && b.indexOf('행복') >= 0) {
            var m3 = b.match(/행복 \+(\d+)/);
            if(m3) bonus += parseInt(m3[1]);
        }
        if(type === 'pop' && b.indexOf('인구') >= 0) {
            var m4 = b.match(/인구 \+(\d+)/);
            if(m4) bonus += parseInt(m4[1]);
        }
    });
    return bonus;
}

function showLandmarks() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('landmark-list');
    list.innerHTML = '';
    LANDMARKS.forEach(function(lm) {
        var isBuilt = builtLandmarks.has(lm.id);
        var eraOk = typeof currentEra !== 'undefined' && currentEra >= lm.era;
        var canAfford = typeof resources !== 'undefined' && resources.gold >= lm.cost.gold && resources.culture >= lm.cost.culture;
        var card = document.createElement('div');
        card.className = 'landmark-card' + (isBuilt ? ' built' : '') + (!eraOk && !isBuilt ? ' locked' : '');
        var html = '<div class="lm-icon">' + lm.icon + '</div><div class="lm-info">' +
            '<div class="lm-name">' + lm.name + (isBuilt ? ' ✅' : '') + '</div>' +
            '<div class="lm-desc">' + lm.desc + '</div>' +
            '<div class="lm-bonus">📈 ' + lm.bonus + '</div>';
        if(!isBuilt) {
            html += '<div class="lm-cost">💰 ' + lm.cost.gold + ' + 🏛️ ' + lm.cost.culture + '</div>';
            html += '<button class="lm-build-btn" id="lm-build-' + lm.id + '" ' + (eraOk && canAfford ? '' : 'disabled') + '>🏗️ 건설</button>';
        }
        html += '</div>';
        card.innerHTML = html;
        list.appendChild(card);

        if(!isBuilt && eraOk && canAfford) {
            setTimeout(function() {
                var btn = document.getElementById('lm-build-' + lm.id);
                if(btn) btn.onclick = function() { buildLandmark(lm); };
            }, 50);
        }
    });
    document.getElementById('landmark-panel').classList.add('show');
}

function buildLandmark(lm) {
    if(builtLandmarks.has(lm.id)) return;
    if(typeof resources === 'undefined') return;
    if(resources.gold < lm.cost.gold || resources.culture < lm.cost.culture) return;
    resources.gold -= lm.cost.gold;
    resources.culture -= Math.floor(lm.cost.culture * 0.5);
    builtLandmarks.add(lm.id);
    try { localStorage.setItem('cityLandmarks_v7', JSON.stringify(Array.from(builtLandmarks))); } catch(e){}
    v7Toast('🏛️ ' + lm.name + ' 건설 완료!');
    v7Chronicle('🏛️', '랜드마크 ' + lm.name + ' 건설');
    if(typeof updateHUD === 'function') updateHUD();
    playV7SFX('landmark');
    showLandmarks();
}

// ===================== CITY RATING SYSTEM =====================
function calcCityRating() {
    var r = typeof resources !== 'undefined' ? resources : { pop:0, food:0, gold:0, happy:50, culture:0 };
    var bc = typeof buildCount !== 'undefined' ? buildCount : 0;
    var era = typeof currentEra !== 'undefined' ? currentEra : 0;

    var popScore = Math.min(100, Math.floor(r.pop / 50));
    var wealthScore = Math.min(100, Math.floor(r.gold / 500));
    var cultureScore = Math.min(100, Math.floor(r.culture / 30));
    var happyScore = r.happy;
    var buildScore = Math.min(100, Math.floor(bc / 3));
    var eraScore = era * 20;
    var landmarkScore = builtLandmarks.size * 12;
    var eduScore = educationLevel * 25;
    var diploScore = 0;
    NATIONS.forEach(function(n) {
        if(n.eras.includes(era)) {
            var lv = getDiploLevel(n.id);
            if(lv >= 70) diploScore += 10;
            else if(lv >= 40) diploScore += 5;
        }
    });

    var total = Math.floor((popScore * 0.15 + wealthScore * 0.15 + cultureScore * 0.15 +
        happyScore * 0.15 + buildScore * 0.1 + eraScore * 0.1 +
        landmarkScore * 0.08 + eduScore * 0.07 + diploScore * 0.05) * 10) / 10;

    var grade = 'D';
    if(total >= 90) grade = 'S';
    else if(total >= 75) grade = 'A';
    else if(total >= 55) grade = 'B';
    else if(total >= 35) grade = 'C';

    return {
        total: total, grade: grade,
        categories: [
            { name:'인구', score:popScore, color:'#4caf50' },
            { name:'경제', score:wealthScore, color:'#ffd700' },
            { name:'문화', score:cultureScore, color:'#c060ff' },
            { name:'행복', score:happyScore, color:'#ff80c0' },
            { name:'건설', score:buildScore, color:'#40c0ff' },
            { name:'시대', score:eraScore, color:'#ff9040' },
            { name:'랜드마크', score:landmarkScore, color:'#ffc040' },
            { name:'교육', score:eduScore, color:'#6080ff' },
        ]
    };
}

function showCityRating() {
    if(typeof playClickSound === 'function') playClickSound();
    var rating = calcCityRating();
    var content = document.getElementById('rating-content');
    var html = '<div class="rating-grade">' + rating.grade + '</div>' +
        '<div class="rating-score">총점: ' + rating.total.toFixed(1) + ' / 100</div>' +
        '<div class="rating-bars">';
    rating.categories.forEach(function(cat) {
        html += '<div class="rating-bar-row">' +
            '<div class="rating-bar-label">' + cat.name + '</div>' +
            '<div class="rating-bar-track"><div class="rating-bar-fill" style="width:' + Math.min(100, cat.score) + '%;background:' + cat.color + ';"></div></div>' +
            '<div class="rating-bar-val">' + Math.min(100, cat.score) + '</div></div>';
    });
    html += '</div><div style="margin-top:14px;"><button class="t-btn" style="background:#ffd700;color:#1a0a00;border:none;padding:10px 24px;border-radius:16px;font-size:13px;font-weight:bold;cursor:pointer;" onclick="showShareCard()">📷 공유 카드 만들기</button></div>';
    content.innerHTML = html;
    playV7SFX('rating');
    document.getElementById('rating-panel').classList.add('show');
}

// ===================== SHARE CARD =====================
function showShareCard() {
    var canvas = document.getElementById('share-canvas');
    var cx = canvas.getContext('2d');
    var w = 600, h = 380;
    canvas.width = w; canvas.height = h;

    var grd = cx.createLinearGradient(0, 0, w, h);
    grd.addColorStop(0, '#1a1a2e');
    grd.addColorStop(0.5, '#2a1a3e');
    grd.addColorStop(1, '#0a1a2e');
    cx.fillStyle = grd;
    cx.fillRect(0, 0, w, h);

    cx.strokeStyle = 'rgba(255,215,0,0.3)';
    cx.lineWidth = 3;
    cx.strokeRect(10, 10, w - 20, h - 20);

    cx.fillStyle = '#ffd700';
    cx.font = 'bold 24px sans-serif';
    cx.textAlign = 'center';
    cx.fillText('🏛️ 한국사 도시건설 v7.0', w / 2, 50);

    var rating = calcCityRating();
    cx.font = 'bold 60px sans-serif';
    cx.fillStyle = rating.grade === 'S' ? '#ffd700' : rating.grade === 'A' ? '#4caf50' : rating.grade === 'B' ? '#40c0ff' : '#ff9040';
    cx.fillText(rating.grade, w / 2, 120);

    cx.font = '16px sans-serif';
    cx.fillStyle = '#ffd700';
    cx.fillText('총점: ' + rating.total.toFixed(1) + ' / 100', w / 2, 148);

    var r = typeof resources !== 'undefined' ? resources : { pop:0, food:0, gold:0, happy:50, culture:0 };
    var bc = typeof buildCount !== 'undefined' ? buildCount : 0;
    var era = typeof currentEra !== 'undefined' ? currentEra : 0;
    var ERAS_LOCAL = ['고조선','삼국시대','고려','조선','근대'];

    var stats = [
        { icon:'👥', label:'인구', val:r.pop },
        { icon:'🌾', label:'식량', val:r.food },
        { icon:'💰', label:'금', val:r.gold },
        { icon:'😊', label:'행복', val:r.happy },
        { icon:'🏛️', label:'문화', val:r.culture },
        { icon:'🏗️', label:'건물', val:bc },
    ];

    cx.textAlign = 'left';
    cx.font = '14px sans-serif';
    var startY = 180;
    for(var i = 0; i < stats.length; i++) {
        var col = i < 3 ? 0 : 1;
        var row = i % 3;
        var sx = 60 + col * 280;
        var sy = startY + row * 32;
        cx.fillStyle = '#aaa';
        cx.fillText(stats[i].icon + ' ' + stats[i].label, sx, sy);
        cx.fillStyle = '#ffd700';
        cx.font = 'bold 14px sans-serif';
        cx.fillText(String(stats[i].val), sx + 120, sy);
        cx.font = '14px sans-serif';
    }

    cx.textAlign = 'center';
    cx.fillStyle = '#c4923a';
    cx.font = '13px sans-serif';
    cx.fillText('시대: ' + (ERAS_LOCAL[era] || '고조선') + ' | 교육: ' + EDU_LEVELS[educationLevel].name + ' | 랜드마크: ' + builtLandmarks.size + '개', w / 2, 300);

    var barY = 320;
    var barW = 460;
    var barH = 14;
    var barX = (w - barW) / 2;
    cx.fillStyle = '#222';
    cx.fillRect(barX, barY, barW, barH);
    var fillW = barW * (rating.total / 100);
    var barGrd = cx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrd.addColorStop(0, '#ff4040');
    barGrd.addColorStop(0.35, '#ffaa40');
    barGrd.addColorStop(0.55, '#ffd700');
    barGrd.addColorStop(0.75, '#4caf50');
    barGrd.addColorStop(1, '#40c0ff');
    cx.fillStyle = barGrd;
    cx.fillRect(barX, barY, fillW, barH);

    cx.fillStyle = 'rgba(255,255,255,0.3)';
    cx.font = '10px sans-serif';
    cx.fillText('PRIME Holdings | NEXTERA+PRISM', w / 2, h - 15);

    playV7SFX('share');
    document.getElementById('rating-panel').classList.remove('show');
    document.getElementById('share-card-overlay').classList.add('show');
}

window.downloadShareCard = function() {
    var canvas = document.getElementById('share-canvas');
    var link = document.createElement('a');
    link.download = 'city-builder-v7-score.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    v7Toast('📥 성적표 다운로드 완료!');
};

window.copyShareCard = function() {
    var canvas = document.getElementById('share-canvas');
    canvas.toBlob(function(blob) {
        if(navigator.clipboard && navigator.clipboard.write) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function() {
                v7Toast('📋 클립보드에 복사됨!');
            }).catch(function() { v7Toast('복사 실패 - 다운로드를 이용해주세요'); });
        } else {
            v7Toast('클립보드 API 미지원 - 다운로드를 이용해주세요');
        }
    });
};

// ===================== HISTORY TIMELINE =====================
var TIMELINE_EVENTS = [
    { year:'BC 2333', title:'고조선 건국', desc:'단군왕검이 고조선을 세웠어요. 홍익인간 이념으로 나라를 다스렸어요.', era:0 },
    { year:'BC 108', title:'고조선 멸망', desc:'한무제의 침입으로 고조선이 무너졌어요.', era:0 },
    { year:'BC 57', title:'신라 건국', desc:'박혁거세가 신라를 세웠어요. 경주가 수도였어요.', era:1 },
    { year:'BC 37', title:'고구려 건국', desc:'주몽이 고구려를 세웠어요. 북쪽의 강대한 나라였어요.', era:1 },
    { year:'BC 18', title:'백제 건국', desc:'온조가 백제를 세웠어요. 위례성(서울)이 첫 수도였어요.', era:1 },
    { year:'391', title:'광개토대왕 즉위', desc:'고구려의 영토를 크게 넓힌 정복왕. 만주까지 지배했어요.', era:1 },
    { year:'632', title:'선덕여왕 첨성대 건설', desc:'동양 최고의 천문대를 세웠어요.', era:1 },
    { year:'660', title:'백제 멸망', desc:'신라-당 연합군에 의해 백제가 멸망했어요.', era:1 },
    { year:'668', title:'고구려 멸망', desc:'신라-당 연합군에 의해 고구려가 멸망했어요.', era:1 },
    { year:'676', title:'신라 삼국통일', desc:'신라가 당군을 몰아내고 삼국을 통일했어요.', era:1 },
    { year:'918', title:'고려 건국', desc:'왕건이 고려를 세웠어요. 개성이 수도였어요.', era:2 },
    { year:'1234', title:'세계 최초 금속활자', desc:'고려에서 세계 최초로 금속활자를 만들었어요.', era:2 },
    { year:'1236', title:'팔만대장경 제작 시작', desc:'몽골 침입을 불력으로 막고자 16년간 만들었어요.', era:2 },
    { year:'1380', title:'최무선 진포해전', desc:'화약으로 왜구 500척의 배를 물리쳤어요.', era:2 },
    { year:'1392', title:'조선 건국', desc:'이성계가 조선을 세웠어요. 한양(서울)이 수도였어요.', era:3 },
    { year:'1443', title:'훈민정음 창제', desc:'세종대왕이 한글을 만들었어요. 백성이 글을 쓸 수 있게 되었어요.', era:3 },
    { year:'1592', title:'임진왜란', desc:'일본이 침입했지만 이순신 장군이 나라를 지켰어요.', era:3 },
    { year:'1796', title:'수원화성 완성', desc:'정조와 정약용이 과학 기술로 성을 지었어요.', era:3 },
    { year:'1876', title:'강화도 조약', desc:'조선이 문호를 개방했어요. 근대화가 시작되었어요.', era:4 },
    { year:'1897', title:'대한제국 선포', desc:'고종이 황제로 즉위하고 대한제국을 선포했어요.', era:4 },
    { year:'1919', title:'3.1 운동', desc:'전국적 독립만세 운동. 약 200만명이 참여했어요.', era:4 },
    { year:'1945', title:'광복', desc:'일본으로부터 해방되었어요. 독립을 되찾았어요!', era:4 },
];

function showTimeline() {
    if(typeof playClickSound === 'function') playClickSound();
    var list = document.getElementById('timeline-list');
    list.innerHTML = '';
    var era = typeof currentEra !== 'undefined' ? currentEra : 0;
    TIMELINE_EVENTS.forEach(function(evt) {
        var active = evt.era <= era;
        var div = document.createElement('div');
        div.className = 'tl-item';
        div.innerHTML = '<div class="tl-year">' + evt.year + '</div>' +
            '<div class="tl-dot' + (active ? ' active' : '') + '"></div>' +
            '<div class="tl-content"><div class="tl-title">' + (active ? evt.title : '???') + '</div>' +
            '<div class="tl-desc">' + (active ? evt.desc : '시대를 발전시켜 해금하세요') + '</div></div>';
        list.appendChild(div);
    });
    playV7SFX('timeline');
    document.getElementById('timeline-panel').classList.add('show');
}

// ===================== DAILY CHALLENGE =====================
var DAILY_TASKS = [
    { id:'build_5', title:'건설의 날', desc:'건물 5개 건설하기', reward:'💰 100 + 🏛️ 20', check:function(s){ return s.buildCount >= s.startBuild + 5; }, fn:function(r){ r.gold += 100; r.culture += 20; } },
    { id:'earn_gold', title:'부의 길', desc:'금 500 모으기', reward:'🌾 80 + 😊 +10', check:function(s){ return s.resources.gold >= 500; }, fn:function(r){ r.food += 80; r.happy = Math.min(100, r.happy + 10); } },
    { id:'culture_50', title:'문화 융성', desc:'문화 50 달성하기', reward:'💰 80 + 👥 +20', check:function(s){ return s.resources.culture >= 50; }, fn:function(r){ r.gold += 80; r.pop += 20; } },
    { id:'quiz_play', title:'학습의 하루', desc:'퀴즈 1회 풀기', reward:'🏛️ 30 + 💰 60', check:function(s){ return (typeof totalQuizPlayed !== 'undefined') && totalQuizPlayed > s.startQuiz; }, fn:function(r){ r.culture += 30; r.gold += 60; } },
    { id:'happy_80', title:'행복한 도시', desc:'행복도 80 이상 유지', reward:'💰 120 + 🌾 50', check:function(s){ return s.resources.happy >= 80; }, fn:function(r){ r.gold += 120; r.food += 50; } },
    { id:'pop_200', title:'인구 성장', desc:'인구 200명 달성', reward:'💰 150 + 🏛️ 30', check:function(s){ return s.resources.pop >= 200; }, fn:function(r){ r.gold += 150; r.culture += 30; } },
    { id:'build_10', title:'대건설 시대', desc:'건물 10개 건설하기', reward:'💰 200 + 😊 +15', check:function(s){ return s.buildCount >= s.startBuild + 10; }, fn:function(r){ r.gold += 200; r.happy = Math.min(100, r.happy + 15); } },
    { id:'food_300', title:'식량 비축', desc:'식량 300 확보하기', reward:'💰 100 + 🏛️ 25', check:function(s){ return s.resources.food >= 300; }, fn:function(r){ r.gold += 100; r.culture += 25; } },
    { id:'research_1', title:'기술 혁신', desc:'기술 1개 연구하기', reward:'💰 150 + 🌾 60', check:function(s){ return (typeof researchedTechs !== 'undefined') && researchedTechs.size > s.startTech; }, fn:function(r){ r.gold += 150; r.food += 60; } },
    { id:'diplo_gift', title:'외교관', desc:'외교 선물 1회 보내기', reward:'🏛️ 40 + 😊 +10', check:function(s){ return s.diploGifts > 0; }, fn:function(r){ r.culture += 40; r.happy = Math.min(100, r.happy + 10); } },
    { id:'landmark_1', title:'랜드마크', desc:'랜드마크 1개 건설하기', reward:'💰 200 + 😊 +15', check:function(s){ return builtLandmarks.size > s.startLandmarks; }, fn:function(r){ r.gold += 200; r.happy = Math.min(100, r.happy + 15); } },
    { id:'survive_disaster', title:'재해 극복', desc:'재해 1회 극복하기', reward:'💰 180 + 🏛️ 35', check:function(s){ return (typeof disastersSurvived !== 'undefined') && disastersSurvived > s.startDisasters; }, fn:function(r){ r.gold += 180; r.culture += 35; } },
    { id:'gold_1000', title:'부자의 꿈', desc:'금 1000 모으기', reward:'🌾 100 + 😊 +12', check:function(s){ return s.resources.gold >= 1000; }, fn:function(r){ r.food += 100; r.happy = Math.min(100, r.happy + 12); } },
    { id:'era_advance', title:'시대 발전', desc:'다음 시대로 진입하기', reward:'💰 300 + 🏛️ 50', check:function(s){ return (typeof currentEra !== 'undefined') && currentEra > s.startEra; }, fn:function(r){ r.gold += 300; r.culture += 50; } },
];

var dailyState = { date:'', tasks:[], streak:0, completed:[], diploGifts:0 };
try {
    var savedDaily = localStorage.getItem('cityDaily_v7');
    if(savedDaily) dailyState = JSON.parse(savedDaily);
} catch(e){}

function getDailyDate() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
}

function initDailyTasks() {
    var today = getDailyDate();
    if(dailyState.date === today) return;

    var yesterday = dailyState.date;
    var d1 = new Date(); d1.setDate(d1.getDate() - 1);
    var yStr = d1.getFullYear() + '-' + (d1.getMonth()+1) + '-' + d1.getDate();
    if(yesterday === yStr && dailyState.completed.length >= 2) {
        dailyState.streak = (dailyState.streak || 0) + 1;
    } else if(yesterday !== yStr) {
        dailyState.streak = 0;
    }

    var seed = 0;
    for(var ci=0; ci<today.length; ci++) seed += today.charCodeAt(ci);
    var shuffled = DAILY_TASKS.slice();
    for(var si=shuffled.length-1; si>0; si--) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        var sj = seed % (si + 1);
        var tmp = shuffled[si]; shuffled[si] = shuffled[sj]; shuffled[sj] = tmp;
    }

    dailyState.date = today;
    dailyState.tasks = shuffled.slice(0, 3).map(function(t){ return t.id; });
    dailyState.completed = [];
    dailyState.diploGifts = 0;
    dailyState.startBuild = typeof buildCount !== 'undefined' ? buildCount : 0;
    dailyState.startQuiz = typeof totalQuizPlayed !== 'undefined' ? totalQuizPlayed : 0;
    dailyState.startTech = typeof researchedTechs !== 'undefined' ? researchedTechs.size : 0;
    dailyState.startLandmarks = builtLandmarks.size;
    dailyState.startDisasters = typeof disastersSurvived !== 'undefined' ? disastersSurvived : 0;
    dailyState.startEra = typeof currentEra !== 'undefined' ? currentEra : 0;
    saveDailyState();
    updateDailyBadge();
}

function saveDailyState() {
    try { localStorage.setItem('cityDaily_v7', JSON.stringify(dailyState)); } catch(e){}
}

function updateDailyBadge() {
    var badge = document.getElementById('daily-badge');
    if(!badge) return;
    var uncompleted = dailyState.tasks.filter(function(tid) { return dailyState.completed.indexOf(tid) < 0; });
    if(uncompleted.length > 0) {
        badge.textContent = uncompleted.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function checkDailyTasks() {
    if(!dailyState.tasks || dailyState.tasks.length === 0) return;
    var r = typeof resources !== 'undefined' ? resources : { pop:0, food:0, gold:0, happy:50, culture:0 };
    var state = {
        resources: r,
        buildCount: typeof buildCount !== 'undefined' ? buildCount : 0,
        startBuild: dailyState.startBuild || 0,
        startQuiz: dailyState.startQuiz || 0,
        startTech: dailyState.startTech || 0,
        startLandmarks: dailyState.startLandmarks || 0,
        startDisasters: dailyState.startDisasters || 0,
        startEra: dailyState.startEra || 0,
        diploGifts: dailyState.diploGifts || 0,
    };
    dailyState.tasks.forEach(function(tid) {
        if(dailyState.completed.indexOf(tid) >= 0) return;
        var task = DAILY_TASKS.find(function(t){ return t.id === tid; });
        if(task && task.check(state)) {
            dailyState.completed.push(tid);
            task.fn(r);
            v7Toast('🎯 일일 도전 완료: ' + task.title + '!');
            v7Chronicle('🎯', '일일 도전 완료: ' + task.title);
            if(typeof updateHUD === 'function') updateHUD();
            playV7SFX('daily');
        }
    });
    saveDailyState();
    updateDailyBadge();
}

function showDailyChallenge() {
    if(typeof playClickSound === 'function') playClickSound();
    initDailyTasks();
    var list = document.getElementById('daily-list');
    list.innerHTML = '';
    document.getElementById('daily-streak').textContent = '🔥 연속 ' + (dailyState.streak || 0) + '일 | 오늘 ' + dailyState.completed.length + '/' + dailyState.tasks.length + ' 완료';

    var r = typeof resources !== 'undefined' ? resources : { pop:0, food:0, gold:0, happy:50, culture:0 };
    var state = {
        resources: r,
        buildCount: typeof buildCount !== 'undefined' ? buildCount : 0,
        startBuild: dailyState.startBuild || 0,
        startQuiz: dailyState.startQuiz || 0,
        startTech: dailyState.startTech || 0,
        startLandmarks: dailyState.startLandmarks || 0,
        startDisasters: dailyState.startDisasters || 0,
        startEra: dailyState.startEra || 0,
        diploGifts: dailyState.diploGifts || 0,
    };

    dailyState.tasks.forEach(function(tid) {
        var task = DAILY_TASKS.find(function(t){ return t.id === tid; });
        if(!task) return;
        var done = dailyState.completed.indexOf(tid) >= 0;
        var div = document.createElement('div');
        div.className = 'daily-task' + (done ? ' completed' : '');
        div.innerHTML = '<div class="dt-check">' + (done ? '✅' : '⬜') + '</div>' +
            '<div class="dt-info"><div class="dt-title">' + task.title + '</div>' +
            '<div class="dt-desc">' + task.desc + '</div>' +
            '<div class="dt-reward">보상: ' + task.reward + '</div></div>';
        list.appendChild(div);
    });
    document.getElementById('daily-panel').classList.add('show');
}

// ===================== v7.0 ADDITIONAL QUIZ QUESTIONS (+15) =====================
var V7_QUIZ_QUESTIONS = [
    { era:0, q:'고조선의 수도는 어디였나요?', opts:['왕검성(평양)','경주','개성','한양'], answer:0, explain:'고조선의 수도는 왕검성으로 현재 평양 지역으로 추정됩니다.' },
    { era:0, q:'단군신화에서 곰이 100일 동안 먹은 것은?', opts:['순과 마늘','쇠과 보리','도토리와 밤','버섯과 과일'], answer:0, explain:'곰은 순(100수)과 마늘 20족을 먹으며 100일을 참아 웅녀가 되었습니다.' },
    { era:1, q:'신라의 화랑도의 5계 규칙을 뭐라고 하나요?', opts:['세속오계','삼강오률','팔조법','철학'], answer:0, explain:'세속오계는 사군이충/사친이효/교우이신/임전무퇴/살생유택의 5가지입니다.' },
    { era:1, q:'백제의 무령왕릉에서 발견된 것은?', opts:['금관과 금귀걸이','청자','철갑옷','팔만대장경'], answer:0, explain:'무령왕릉에서는 금관, 금귀걸이, 환두대도 등 화려한 부장품이 발견되었습니다.' },
    { era:2, q:'고려의 수도는 어디였나요?', opts:['개성','경주','한양','평양'], answer:0, explain:'고려의 수도는 개성(현재 북한 개성시)이었습니다.' },
    { era:2, q:'고려에서 과거 시험을 시작한 왕은?', opts:['광종','성종','예종','태조'], answer:0, explain:'고려 광종 9년(958)에 과거 제도를 처음 실시했습니다. 쌍기가 처음 시험관이었어요.' },
    { era:3, q:'조선시대 양반 여성의 생활을 기록한 책은?', opts:['규합총서','동의보감','농사직설','학익편'], answer:0, explain:'규합총서는 빙허각 이씨가 지은 조선 여성의 생활 백과사전입니다.' },
    { era:3, q:'임진왜란 때 이순신의 전적은?', opts:['23전 23승','20전 18승','15전 15승','30전 28승'], answer:0, explain:'이순신 장군은 23번 싸워 23번 모두 이긴 불패의 기록을 세웠습니다.' },
    { era:3, q:'조선의 신분 제도에서 가장 높은 계층은?', opts:['양반','중인','상민','천민'], answer:0, explain:'조선은 양반-중인-상민-천민의 4계층 신분 제도였습니다.' },
    { era:4, q:'대한제국의 첫 황제는 누구인가요?', opts:['고종','순종','헌종','영조'], answer:0, explain:'고종이 1897년 환구단에서 황제 즉위식을 거행했습니다.' },
    { era:4, q:'우리나라 최초의 철도는?', opts:['경인선','경부선','호남선','경전선'], answer:0, explain:'경인선(1899)은 노량진-인천 구간으로 우리나라 최초의 철도입니다.' },
    { era:4, q:'유관순 열사가 만세 운동을 벌인 곳은?', opts:['충청남도 천안','서울 탑골공원','부산 해운대','광주 금남로'], answer:0, explain:'유관순 열사는 충청남도 천안의 아우내 장터에서 독립만세 운동을 이끌었습니다.' },
    { era:1, q:'가야의 대표적인 유물인 철제 갑옷의 이름은?', opts:['판갑','창갑','투구','법구'], answer:0, explain:'가야의 판갑(板甲)은 철판을 엮어 만든 갑옷으로, 동아시아 최고 수준의 철기 기술입니다.' },
    { era:2, q:'고려 성종 때 세운 교육기관의 이름은?', opts:['국자감','성균관','서원','향교'], answer:0, explain:'국자감은 고려 성종(992년)이 세운 최고 교육기관으로, 유교 경전과 역사를 가르쳤습니다.' },
];

// ===================== v7.0 ADDITIONAL ACHIEVEMENTS (+12) =====================
var V7_ACHIEVEMENTS = [
    { id:'v7_diplo_friendly', icon:'🌍', title:'외교관', desc:'우호국 1개 달성!', check:function(s) {
        var found = false; NATIONS.forEach(function(n){ if(getDiploLevel(n.id) >= 70) found = true; }); return found;
    }},
    { id:'v7_diplo_all', icon:'🤝', title:'평화의 왕', desc:'모든 나라와 우호!', check:function(s) {
        var all = true; NATIONS.forEach(function(n){ if(n.eras.includes(typeof currentEra !== 'undefined' ? currentEra : 0) && getDiploLevel(n.id) < 70) all = false; }); return all;
    }},
    { id:'v7_edu_basic', icon:'📚', title:'교육 개혁', desc:'초등 교육 달성!', check:function(){ return educationLevel >= 1; } },
    { id:'v7_edu_max', icon:'🎓', title:'교육 강국', desc:'고등 교육 달성!', check:function(){ return educationLevel >= 3; } },
    { id:'v7_landmark_1', icon:'🏛️', title:'첫 랜드마크', desc:'랜드마크 1개 건설!', check:function(){ return builtLandmarks.size >= 1; } },
    { id:'v7_landmark_5', icon:'🏆', title:'문화유산 수집가', desc:'랜드마크 5개 건설!', check:function(){ return builtLandmarks.size >= 5; } },
    { id:'v7_rating_a', icon:'🏅', title:'도시 등급 A', desc:'도시 평가 A등급 달성!', check:function(){ return calcCityRating().grade === 'A' || calcCityRating().grade === 'S'; } },
    { id:'v7_rating_s', icon:'👑', title:'도시 등급 S', desc:'도시 평가 S등급 달성!', check:function(){ return calcCityRating().grade === 'S'; } },
    { id:'v7_daily_7', icon:'🔥', title:'7일 연속 도전', desc:'일일 도전 7일 연속!', check:function(){ return (dailyState.streak || 0) >= 7; } },
    { id:'v7_daily_30', icon:'🌟', title:'30일 연속 도전', desc:'일일 도전 30일 연속!', check:function(){ return (dailyState.streak || 0) >= 30; } },
    { id:'v7_timeline', icon:'📅', title:'역사 탐험가', desc:'연표에서 모든 시대 해금!', check:function(){ return typeof currentEra !== 'undefined' && currentEra >= 4; } },
    { id:'v7_share', icon:'📷', title:'공유의 기쁨', desc:'공유 카드를 만들었어요!', check:function(){ return v7ShareCreated; } },
];

var v7ShareCreated = false;
var origShowShareCard = showShareCard;
showShareCard = function() {
    v7ShareCreated = true;
    origShowShareCard();
};

// ===================== v7.0 ADVISOR TIPS (+10) =====================
var V7_ADVISOR_TIPS = [
    '💡 외교 관계를 통해 무역 보너스를 받을 수 있어요! (키보드 D)',
    '💡 교육 수준을 올리면 모든 생산이 증가해요! (키보드 U)',
    '💡 랜드마크를 건설하면 영구적 보너스를 받아요! (키보드 W)',
    '💡 도시 평가에서 S등급을 받아보세요! (키보드 G)',
    '💡 일일 도전을 완료하면 추가 보상을 받을 수 있어요!',
    '💡 고창 고인돌은 유네스코 세계문화유산이에요.',
    '💡 근대에는 서양 열강과 외교를 할 수 있어요.',
    '💡 경복궁 랜드마크는 문화+30, 행복+15, 인구+20을 줘요!',
    '💡 공유 카드를 만들어 친구에게 자랑해보세요!',
    '💡 단군신화에서 곰은 순과 마늘을 먹으며 100일을 참았어요.',
];

// ===================== WEB AUDIO SFX (6 types) =====================
function playV7SFX(type) {
    if(typeof audioCtx === 'undefined' || !audioCtx || (typeof audioMuted !== 'undefined' && audioMuted)) return;
    try {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        var t = audioCtx.currentTime;

        switch(type) {
            case 'diplomacy':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, t);
                osc.frequency.linearRampToValueAtTime(660, t + 0.1);
                osc.frequency.linearRampToValueAtTime(880, t + 0.2);
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.start(t); osc.stop(t + 0.4);
                break;
            case 'education':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.linearRampToValueAtTime(659, t + 0.12);
                osc.frequency.linearRampToValueAtTime(784, t + 0.24);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.36);
                gain.gain.setValueAtTime(0.07, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                osc.start(t); osc.stop(t + 0.5);
                break;
            case 'landmark':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(392, t);
                osc.frequency.linearRampToValueAtTime(523, t + 0.15);
                osc.frequency.linearRampToValueAtTime(784, t + 0.3);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.45);
                gain.gain.setValueAtTime(0.08, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
                osc.start(t); osc.stop(t + 0.6);
                break;
            case 'rating':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(660, t);
                osc.frequency.linearRampToValueAtTime(880, t + 0.08);
                osc.frequency.linearRampToValueAtTime(660, t + 0.16);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
            case 'daily':
                osc.type = 'square';
                osc.frequency.setValueAtTime(587, t);
                osc.frequency.linearRampToValueAtTime(880, t + 0.15);
                gain.gain.setValueAtTime(0.04, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
            case 'share':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(784, t);
                osc.frequency.linearRampToValueAtTime(1047, t + 0.1);
                osc.frequency.linearRampToValueAtTime(1319, t + 0.2);
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
                osc.start(t); osc.stop(t + 0.35);
                break;
            case 'timeline':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(330, t);
                osc.frequency.linearRampToValueAtTime(440, t + 0.15);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
        }
    } catch(e){}
}

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', function(e) {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    var key = e.key.toUpperCase();
    if(key === 'D' && !e.ctrlKey) { showDiplomacy(); e.preventDefault(); }
    else if(key === 'U') { showEducation(); e.preventDefault(); }
    else if(key === 'W' && !e.ctrlKey) { showLandmarks(); e.preventDefault(); }
    else if(key === 'G') { showCityRating(); e.preventDefault(); }
    else if(key === 'Y') { showTimeline(); e.preventDefault(); }
    else if(key === 'J') { showDailyChallenge(); e.preventDefault(); }
});

// ===================== HOOK INTO GAME LOOP =====================
var v7TickCounter = 0;
var origGameLoop = null;

function v7GameTick() {
    v7TickCounter++;
    if(v7TickCounter % 120 === 0) {
        checkDailyTasks();
    }
    if(v7TickCounter % 600 === 0) {
        updateDailyBadge();
    }
}

function hookGameLoop() {
    if(typeof window.gameLoop === 'function' && !origGameLoop) {
        origGameLoop = window.gameLoop;
        window.gameLoop = function() {
            origGameLoop();
            v7GameTick();
        };
    } else {
        setInterval(v7GameTick, 500);
    }
}

// ===================== HOOK INTO QUIZ =====================
function injectV7Quizzes() {
    if(typeof QUIZ_QUESTIONS !== 'undefined' && Array.isArray(QUIZ_QUESTIONS)) {
        V7_QUIZ_QUESTIONS.forEach(function(q) {
            var eraNames = ['고조선','삼국시대','고려','조선','근대'];
            q.era_name = eraNames[q.era] || '고조선';
            QUIZ_QUESTIONS.push({ q:q.q, opts:q.opts, ans:q.answer, era:q.era_name, explain:q.explain });
        });
    }
}

// ===================== HOOK INTO ACHIEVEMENTS =====================
function injectV7Achievements() {
    if(typeof checkAchievements === 'function') {
        var origCheck = checkAchievements;
        window.checkAchievements = function() {
            origCheck();
            V7_ACHIEVEMENTS.forEach(function(ach) {
                if(typeof unlockedAchievements !== 'undefined' && unlockedAchievements.has(ach.id)) return;
                try {
                    if(ach.check()) {
                        if(typeof unlockedAchievements !== 'undefined') unlockedAchievements.add(ach.id);
                        var toastEl = document.createElement('div');
                        toastEl.className = 'ach-toast';
                        toastEl.innerHTML = '<div class="a-header">🏆 업적 달성!</div><div class="a-title">' + ach.icon + ' ' + ach.title + '</div><div class="a-desc">' + ach.desc + '</div>';
                        document.body.appendChild(toastEl);
                        setTimeout(function(){ toastEl.remove(); }, 4500);
                        v7Chronicle(ach.icon, '업적 달성: ' + ach.title);
                    }
                } catch(e){}
            });
        };
    }
}

// ===================== HOOK INTO ADVISOR =====================
function injectV7Advisor() {
    if(typeof ADVISOR_TIPS !== 'undefined' && Array.isArray(ADVISOR_TIPS)) {
        V7_ADVISOR_TIPS.forEach(function(tip) { ADVISOR_TIPS.push(tip); });
    }
    if(typeof V5_ADVISOR_TIPS !== 'undefined' && typeof ADVISOR_TIPS !== 'undefined') {
        // already injected by main
    }
}

// ===================== HOOK INTO RESOURCE CALC (Education + Diplomacy + Landmark bonuses) =====================
function hookResourceCalc() {
    if(typeof recalcRates === 'function') {
        var origRecalc = window.recalcRates;
        window.recalcRates = function() {
            origRecalc();
            if(typeof rates === 'undefined') return;
            var eduCulture = getEduBonus('culture');
            var eduGold = getEduBonus('gold');
            var eduFood = getEduBonus('food');
            if(eduCulture > 0 && rates.culture) rates.culture = Math.floor(rates.culture * (1 + eduCulture));
            if(eduGold > 0 && rates.gold) rates.gold = Math.floor(rates.gold * (1 + eduGold));
            if(eduFood > 0 && rates.food) rates.food = Math.floor(rates.food * (1 + eduFood));

            var diploBonus = getDiploTradeBonus();
            rates.gold += diploBonus.gold;
            rates.food += diploBonus.food;
            rates.culture += diploBonus.culture;
        };
    }
}

// ===================== INIT =====================
function initV7() {
    addV7UI();
    initDailyTasks();
    updateDailyBadge();
    injectV7Quizzes();
    injectV7Achievements();
    injectV7Advisor();
    hookResourceCalc();
    setTimeout(hookGameLoop, 1000);
    v7Toast('한국사 도시건설 v7.0 로드 완료!');
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(initV7, 500); });
} else {
    setTimeout(initV7, 500);
}

})();
