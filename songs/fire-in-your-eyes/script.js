const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.lyrics-panel').forEach(panel => {
      panel.classList.remove('active');
      panel.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(btn.dataset.tab);
    panel.hidden = false;
    panel.classList.add('active');
  });
});


// PLAYER TEST 2 — direkter Overlay-Player
(()=>{
  const modal=document.getElementById('song-player-modal');
  const frame=document.getElementById('song-player-frame');
  if(!modal||!frame)return;
  const open=()=>{if(!frame.src)frame.src=frame.dataset.src;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('player-open');};
  const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('player-open');frame.src='';};
  document.querySelectorAll('[data-player-open]').forEach(btn=>btn.addEventListener('click',open));
  document.querySelectorAll('[data-player-close]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open'))close();});
})();
