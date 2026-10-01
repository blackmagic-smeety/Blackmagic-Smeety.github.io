/* BUILD 9.7 CLEAN · Accessibility enhancement layer. No visual redesign. */
(()=>{
  'use strict';
  const focusable='a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

  // Song carousel: mouse/touch behavior remains; keyboard users can select a cover with Enter/Space.
  document.querySelectorAll('.music-carousel-card').forEach(card=>{
    card.tabIndex=0;
    card.setAttribute('role','button');
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}
    });
  });

  // Helpful structural labels without changing visible copy.
  document.querySelector('.hero-carousel')?.setAttribute('role','region');
  document.querySelector('.hero-carousel')?.setAttribute('aria-label','Blackmagic Smeety Bildergalerie');
  document.querySelector('.music-carousel-stage')?.setAttribute('role','region');
  document.querySelector('.awards-carousel-stage')?.setAttribute('role','region');

  // Robust modal focus management: focus enters the dialog, Tab stays inside,
  // Escape is handled by the existing controllers, and focus returns to the opener.
  const modalDefs=[
    ['release-modal','.release-modal-dialog'],
    ['song-player-modal','.song-player-dialog'],
    ['legal-modal','.legal-dialog']
  ];
  modalDefs.forEach(([id,dialogSel])=>{
    const modal=document.getElementById(id), dialog=modal?.querySelector(dialogSel);
    if(!modal||!dialog)return;
    dialog.tabIndex=-1;
    let opener=null, wasOpen=false;
    document.addEventListener('click',e=>{
      const t=e.target.closest('[data-release-modal],[data-player-open],[data-legal]');
      if(t) opener=t;
    },true);
    const isOpen=()=>modal.classList.contains('is-open')||modal.classList.contains('open')||modal.getAttribute('aria-hidden')==='false';
    const sync=()=>{
      const open=isOpen();
      if(open&&!wasOpen){
        wasOpen=true;
        requestAnimationFrame(()=>{const first=dialog.querySelector(focusable);(first||dialog).focus({preventScroll:true});});
      }else if(!open&&wasOpen){
        wasOpen=false;
        if(opener&&document.contains(opener)) requestAnimationFrame(()=>opener.focus({preventScroll:true}));
      }
    };
    new MutationObserver(sync).observe(modal,{attributes:true,attributeFilter:['class','aria-hidden']});
    modal.addEventListener('keydown',e=>{
      if(e.key!=='Tab'||!isOpen())return;
      const els=[...dialog.querySelectorAll(focusable)].filter(el=>!el.hidden&&el.getClientRects().length);
      if(!els.length){e.preventDefault();dialog.focus();return;}
      const first=els[0],last=els[els.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    });
  });

  // Keep language of the skip link aligned with the current interface.
  const skip=document.querySelector('.skip-link');
  if(skip){
    const update=()=>skip.textContent=document.documentElement.lang==='en'?'Skip to main content':'Direkt zum Hauptinhalt';
    update();
    new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
})();
