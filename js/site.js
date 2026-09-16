/* Carrier Companion — site behavior. Built by hand at Champion Digital Media. */
(function(){
  const nav=document.querySelector('.nav');
  const toggle=document.querySelector('.nav-toggle');
  if(toggle){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'));});}
  const onScroll=()=>{if(!nav)return;nav.classList.toggle('is-scrolled',window.scrollY>8);};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  // Mark the current page in the nav
  const seg=(location.pathname.split('/').pop()||'index').replace(/\.html$/,'');
  document.querySelectorAll('.nav-links a').forEach(a=>{const href=a.getAttribute('href').replace(/\.html$/,'').replace(/^\.\//,'');if(href===seg)a.setAttribute('aria-current','page');});

  // Reveal on scroll
  const els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -10% 0px',threshold:.1});
    els.forEach(el=>io.observe(el));
  }else{els.forEach(el=>el.classList.add('in'));}

  // FAQ: only one open at a time
  const faqs=document.querySelectorAll('.faq details');
  faqs.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)faqs.forEach(o=>{if(o!==d)o.open=false;});}));

  // Demo form (front-end only; wire to HubSpot form endpoint when ready)
  const form=document.querySelector('#demo-form');
  if(form){form.addEventListener('submit',(e)=>{e.preventDefault();form.style.display='none';document.querySelector('#form-done').classList.add('show');window.scrollTo({top:form.getBoundingClientRect().top+window.scrollY-120,behavior:'smooth'});});}
})();
