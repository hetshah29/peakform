// ── ACTIVE NAV LINK ──
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── AI PROFESSOR ──
function openAI(){ document.getElementById('aiOverlay').classList.add('open'); }
function closeAI(){ document.getElementById('aiOverlay').classList.remove('open'); }

document.addEventListener('keydown', e => { if(e.key==='Escape') closeAI(); });

async function sendMessage(){
  const input = document.getElementById('aiInput');
  const msg = input.value.trim();
  if(!msg) return;
  input.value = '';

  const msgs = document.getElementById('aiMessages');

  msgs.innerHTML += `<div class="msg msg-user"><div class="msg-name">You</div>${msg}</div>`;

  const tid = 'typing-'+Date.now();
  msgs.innerHTML += `<div class="msg msg-ai" id="${tid}"><div class="msg-name">Professor</div><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;

  const system = `You are Professor — PeakForm's elite AI fitness coach. You have expert knowledge in:
• Exercise science, hypertrophy, strength programming, periodization
• Sports nutrition: macros, meal timing, supplementation, bulking & cutting
• Recovery: sleep protocols, mobility, active recovery, deload weeks
• PeakForm's 90-Day Challenge: Phase 1 Foundation (days 1-30), Phase 2 Intensity (31-60), Phase 3 Peak (61-90)
• All 8 muscle groups: chest, back, shoulders, biceps, triceps, legs, abs, glutes

Tone: Motivating, authoritative, direct — like a world-class PT. Practical advice, no fluff. Use line breaks. Keep answers under 220 words. End major responses with "— Professor 💪"`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system,
        messages:[{role:'user',content:msg}]
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Connection issue — please retry!';
    document.getElementById(tid).innerHTML = `<div class="msg-name">Professor</div>${reply.replace(/\n/g,'<br>')}`;
  } catch(e) {
    document.getElementById(tid).innerHTML = `<div class="msg-name">Professor</div>Having a connection issue right now. Explore the workout, diet, and recovery guides while I recover! 💪`;
  }
  msgs.scrollTop = msgs.scrollHeight;
}

document.addEventListener('DOMContentLoaded',()=>{
  const inp = document.getElementById('aiInput');
  if(inp) inp.addEventListener('keydown', e=>{ if(e.key==='Enter') sendMessage(); });
});
