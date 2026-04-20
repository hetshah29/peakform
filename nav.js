// nav.js — inject navbar + AI overlay into every page
document.addEventListener('DOMContentLoaded', function(){

  const navHTML = `
  <nav>
    <a class="nav-brand" href="index.html">PEAK<span>FORM</span></a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="workout.html">Workout</a>
      <a href="diet.html">Diet</a>
      <a href="recovery.html">Recovery</a>
      <a href="challenge.html">Challenge</a>
      <a href="about.html">About Us</a>
    </div>
    <button class="btn-ai" onclick="openAI()">🤖 Ask Professor</button>
  </nav>`;

  const aiHTML = `
  <div id="aiOverlay">
    <div class="ai-box">
      <div class="ai-header">
        <div class="ai-avatar">🎓</div>
        <div class="ai-title">
          <h3>PROFESSOR</h3>
          <p>Your personal AI fitness coach — 24/7</p>
        </div>
        <div class="ai-dot"></div>
        <button class="ai-close" onclick="closeAI()">✕</button>
      </div>
      <div class="ai-messages" id="aiMessages">
        <div class="msg msg-ai">
          <div class="msg-name">Professor</div>
          Welcome to PeakForm! I'm Professor, your elite AI fitness coach. 💪<br><br>
          Ask me anything about:<br>
          • Workout programming &amp; exercise selection<br>
          • Nutrition, macros &amp; meal timing<br>
          • Recovery protocols &amp; injury prevention<br>
          • The 90-Day Challenge guidance<br><br>
          What are you training for?
        </div>
      </div>
      <div class="ai-input-row">
        <input class="ai-input" id="aiInput" type="text" placeholder="Ask Professor anything about fitness…" />
        <button class="ai-send" onclick="sendMessage()">➤</button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', aiHTML);

  // highlight active nav
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });

  // enter key for AI
  document.getElementById('aiInput').addEventListener('keydown', e => {
    if(e.key === 'Enter') sendMessage();
  });
});
