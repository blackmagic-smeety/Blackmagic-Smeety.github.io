const tabs=[...document.querySelectorAll('.reg-tab')];
const panels=[...document.querySelectorAll('.reg-panel')];
function openPanel(name){
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.panel===name));
  panels.forEach(p=>p.classList.toggle('active',p.id===`panel-${name}`));
  if(name==='projects') showProjectsHome();
  history.replaceState(null,'',`#${name}`);
}
tabs.forEach(t=>t.addEventListener('click',()=>openPanel(t.dataset.panel)));
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openPanel(b.dataset.open)));
const projectsHome=document.getElementById('projects-home');
const projectDetails=[...document.querySelectorAll('.project-detail')];
function showProjectsHome(){if(!projectsHome)return;projectsHome.classList.add('active');projectDetails.forEach(x=>x.classList.remove('active'));}
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{showProjectsHome();projectsHome.classList.remove('active');const d=document.getElementById(`project-${b.dataset.project}`);if(d)d.classList.add('active');}));
document.querySelectorAll('.project-back').forEach(b=>b.addEventListener('click',showProjectsHome));
const legalModal=document.getElementById('legal-modal');
const legalContent=document.getElementById('legal-content');
const legalTexts={
  impressum:`<p class="eyebrow">RECHTLICHES</p><h2 id="legal-title">Impressum</h2><p class="legal-note">Vor der öffentlichen Veröffentlichung bitte noch Namen und ladungsfähige Anschrift ergänzen und den finalen Text prüfen.</p><h3>Kontakt</h3><p>E-Mail: <a href="mailto:blackmagic.smeety@gmail.com">blackmagic.smeety@gmail.com</a></p><h3>Verantwortlich für die Inhalte</h3><p>Blackmagic Smeety<br><em>Name und ladungsfähige Anschrift werden vor Veröffentlichung ergänzt.</em></p>`,
  datenschutz:`<p class="eyebrow">RECHTLICHES</p><h2 id="legal-title">Datenschutz</h2><p class="legal-note">Arbeitsfassung – vor dem öffentlichen Start anhand der tatsächlich eingesetzten Dienste final prüfen.</p><p>Diese Website dient der Präsentation von Musik, Projekten und Informationen zu Blackmagic Smeety. Auf der Hauptseite werden derzeit keine eigenen Analyse- oder Trackingdienste eingesetzt.</p><h3>Hosting</h3><p>Für die geplante Veröffentlichung über GitHub Pages können beim Aufruf technisch notwendige Verbindungsdaten durch den Hostinganbieter verarbeitet werden.</p><h3>Externe Plattformen</h3><p>Links führen unter anderem zu Suno, Spotify, Amazon Music und YouTube. Beim Öffnen dieser Dienste gelten deren eigene Datenschutzbestimmungen. Eingebettete Inhalte, etwa ein YouTube-Player auf einzelnen Songseiten, können bereits beim Laden eine Verbindung zum jeweiligen Anbieter herstellen.</p><h3>Kontakt per E-Mail</h3><p>Wenn du uns per E-Mail kontaktierst, werden die übermittelten Angaben ausschließlich zur Bearbeitung der Anfrage verwendet.</p>`,
  links:`<p class="eyebrow">RECHTLICHES</p><h2 id="legal-title">Hinweis zu externen Links</h2><p>Diese Website enthält Verknüpfungen zu externen Websites und Plattformen Dritter. Auf deren aktuelle oder zukünftige Inhalte und Gestaltung hat Blackmagic Smeety keinen unmittelbaren Einfluss.</p><p>Externe Links werden bei ihrer Aufnahme nach bestem Wissen geprüft. Sollten rechtswidrige oder problematische Inhalte bekannt werden, wird der betreffende Link nach Prüfung entfernt.</p><p>Für Inhalte externer Anbieter ist grundsätzlich der jeweilige Betreiber verantwortlich. Dieser Hinweis stellt keinen pauschalen Haftungsausschluss dar, sondern beschreibt die Abgrenzung zu fremden Inhalten.</p>`
};
document.querySelectorAll('[data-legal]').forEach(b=>b.addEventListener('click',()=>{legalContent.innerHTML=legalTexts[b.dataset.legal]||'';legalModal.classList.add('open');legalModal.setAttribute('aria-hidden','false');}));
document.querySelectorAll('[data-legal-close]').forEach(el=>el.addEventListener('click',()=>{legalModal.classList.remove('open');legalModal.setAttribute('aria-hidden','true');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&legalModal.classList.contains('open')){legalModal.classList.remove('open');legalModal.setAttribute('aria-hidden','true');}});
const initial=location.hash.slice(1);if(tabs.some(t=>t.dataset.panel===initial))openPanel(initial);

// Musikbibliothek: 12 Songs pro Ansicht, Suche und Seitenwechsel ohne Dokument-Scrollen.
(() => {
  const grid=document.getElementById('music-grid');
  const pager=document.getElementById('music-pagination');
  const search=document.getElementById('music-search-input');
  const count=document.getElementById('music-count-current');
  if(!grid||!pager)return;
  const cards=[...grid.querySelectorAll('.music-card')];
  const PER_PAGE=12;
  let page=1,query='';
  const normalized=v=>(v||'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function filtered(){const q=normalized(query.trim());return q?cards.filter(c=>normalized(c.dataset.title||c.textContent).includes(q)):cards;}
  function render(){
    const list=filtered(),pages=Math.max(1,Math.ceil(list.length/PER_PAGE));page=Math.min(page,pages);
    cards.forEach(c=>c.hidden=true);
    list.slice((page-1)*PER_PAGE,page*PER_PAGE).forEach(c=>c.hidden=false);
    if(count)count.textContent=String(list.length);
    pager.innerHTML='';
    if(pages>1){
      const make=(txt,target,active=false)=>{const b=document.createElement('button');b.type='button';b.textContent=txt;b.classList.toggle('active',active);b.addEventListener('click',()=>{page=target;render();});return b};
      if(page>1)pager.append(make('‹',page-1));
      for(let i=1;i<=pages;i++)pager.append(make(String(i),i,i===page));
      if(page<pages)pager.append(make('›',page+1));
    }
  }
  search?.addEventListener('input',e=>{query=e.target.value;page=1;render();});
  document.querySelectorAll('[data-music-project]').forEach(card=>card.addEventListener('click',()=>{
    openPanel('projects');
    showProjectsHome();projectsHome.classList.remove('active');
    const d=document.getElementById(`project-${card.dataset.musicProject}`);if(d)d.classList.add('active');
  }));
  render();
})();

/* === HOME 3D CAROUSEL BUILD 1 === */
(() => {
  const root = document.getElementById('hero-carousel');
  if (!root) return;
  const cards = [...root.querySelectorAll('.hero-card')];
  const prev = root.parentElement.querySelector('.hero-prev');
  const next = root.parentElement.querySelector('.hero-next');
  let active = 6, startX = null, dragged = false;
  const norm = n => (n + cards.length) % cards.length;
  function signedDistance(i){ let d=norm(i-active); if(d>cards.length/2)d-=cards.length; return d; }
  function render(){
    cards.forEach((card,i)=>{
      const d=signedDistance(i), a=Math.abs(d);
      const x=d*150, z= a===0?120: a===1?-30:a===2?-130:-220;
      const ry=d===0?0:(d<0?22:-22), s=a===0?1.08:a===1?.82:a===2?.66:.54;
      const op=a===0?1:a===1?.62:a===2?.32:.14, blur=a===0?0:a===1?1.2:a===2?3.2:5.5;
      card.style.setProperty('--x',`${x}px`);card.style.setProperty('--z',`${z}px`);card.style.setProperty('--ry',`${ry}deg`);card.style.setProperty('--s',s);card.style.setProperty('--op',op);card.style.setProperty('--blur',`${blur}px`);card.style.setProperty('--bright',a===0?1:a===1?.62:.4);card.style.zIndex=String(20-a);
      card.classList.toggle('is-front',a===0);card.classList.toggle('is-back',a>2);card.setAttribute('aria-current',a===0?'true':'false');
    });
  }
  function turn(dir){ active=norm(active+dir); render(); }
  prev?.addEventListener('click',()=>turn(-1)); next?.addEventListener('click',()=>turn(1));
  cards.forEach((c,i)=>c.addEventListener('click',()=>{if(!dragged){active=i;render();}}));
  root.parentElement.addEventListener('pointerdown',e=>{startX=e.clientX;dragged=false;});
  root.parentElement.addEventListener('pointermove',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>14)dragged=true;});
  root.parentElement.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;if(Math.abs(dx)>45)turn(dx<0?1:-1);startX=null;setTimeout(()=>dragged=false,0);});
  root.parentElement.addEventListener('pointercancel',()=>{startX=null;dragged=false;});
  root.parentElement.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>20){e.preventDefault();turn(e.deltaX>0?1:-1)}},{passive:false});
  render();
})();
