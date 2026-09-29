const menu=document.querySelector('.menu-toggle');
const nav=document.getElementById('navigation');
const menuDialog=document.getElementById('menu-dialog');
const reduceMenuMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let menuClosing=false;
function openMenu(){
 if(menuDialog.open)return;
 menuDialog.showModal();document.body.classList.add('menu-open');menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','إغلاق القائمة');
 requestAnimationFrame(()=>requestAnimationFrame(()=>menuDialog.classList.add('is-open')));
}
function closeMenu(target){
 if(!menuDialog.open||menuClosing)return;
 menuClosing=true;menuDialog.classList.remove('is-open');
 setTimeout(()=>{menuDialog.close();menuClosing=false;document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','فتح القائمة');
 if(target){const section=target==='#'?document.querySelector('.hero'):document.querySelector(target);history.pushState(null,'',target);section?.scrollIntoView({behavior:reduceMenuMotion.matches?'instant':'smooth',block:'start'});const heading=section?.querySelector('h1,h2');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}}
 else menu.focus({preventScroll:true});
 },reduceMenuMotion.matches?0:420);
}
menu.addEventListener('click',openMenu);
menuDialog.querySelector('.menu-close').addEventListener('click',()=>closeMenu());
menuDialog.addEventListener('cancel',event=>{event.preventDefault();closeMenu()});
menuDialog.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();closeMenu(link.getAttribute('href'))}));
const dialog=document.getElementById('company-dialog');
const companies={blue:{name:'بلو وين',description:'بلو وين هي لحظة الانطلاق في أعمال رفاد مساحة تتحرك بخفة وتمنح كل رحلة بداية مختلفة وتترك للناس حرية أن يذهبوا أبعد بإيقاعهم الخاص',bottom:'وجهة تتحرك بخفة وتترك أثراً',url:'https://bluewinrent.cc/'},arcom:{name:'أركوم',description:'أركوم هي الحضور الهادئ في أعمال رفاد قيمة تسكن في التفاصيل وتصنع من المكان تجربة أكثر راحة وانسجاماً واستعداداً لما بعد اليوم',bottom:'حضور هادئ يصنع الفرق',url:'https://arcom.sa/'}};
let dialogTrigger;
document.querySelectorAll('[data-company]').forEach(button=>button.addEventListener('click',()=>{const company=companies[button.dataset.company];dialogTrigger=button;document.getElementById('dialog-title').textContent=company.name;document.getElementById('dialog-description').textContent=company.description;document.getElementById('dialog-bottom').textContent=company.bottom;document.getElementById('company-website').href=company.url;dialog.showModal();document.body.classList.add('dialog-open')}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');dialogTrigger?.focus()});
document.getElementById('year').textContent=new Date().getFullYear();


const video=document.getElementById('hero-video');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const intro=document.getElementById('intro');
const enterButton=document.getElementById('enter-site');
let entered=false;
let introTimer;
let soundEnabled=false;
video.volume=.3;
video.muted=false;
async function startSound(){
 video.muted=false;
 try{await video.play();soundEnabled=true}
 catch{video.muted=true;try{await video.play()}catch{}}
}
function enterSite(){
 if(entered)return;
 entered=true;
 clearTimeout(introTimer);
 startSound();
 intro.classList.add('leaving');
 document.body.classList.add('intro-opening');
 document.body.classList.add('site-entered');
 setTimeout(()=>{
  intro.hidden=true;
  document.body.classList.remove('intro-active','intro-opening');
  document.documentElement.classList.remove('intro-lock');
  document.querySelector('meta[name="theme-color"]').content='#1b1b1b';
  document.querySelector('main').inert=false;
  document.querySelector('header').inert=false;
  const main=document.querySelector('main');
  main.setAttribute('tabindex','-1');
  main.focus({preventScroll:true});
 },reducedMotion.matches?0:1200);
}
enterButton.addEventListener('click',enterSite);
intro.addEventListener('keydown',event=>{if(event.key==='Escape')enterSite();if(event.key==='Tab'){event.preventDefault();enterButton.focus()}});
intro.hidden=false;
document.body.classList.add('intro-active');
document.documentElement.classList.add('intro-lock');
document.querySelector('main').inert=true;document.querySelector('header').inert=true;
intro.focus({preventScroll:true});
// The signature runs once and never holds the visitor behind a loading screen
introTimer=setTimeout(enterSite,reducedMotion.matches?600:2900);
document.addEventListener('pointerdown',()=>{if(!soundEnabled)startSound()},{once:true});
// Audible autoplay is attempted and retried directly inside the entry gesture
if(!reducedMotion.matches)startSound();else{video.autoplay=false;video.pause()}
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(entered){video.muted=!soundEnabled;video.play().catch(()=>{})}});
const headingTargets=document.querySelectorAll('.section h2');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}})},{threshold:.25});
 headingTargets.forEach(target=>{target.classList.add('reveal-heading');observer.observe(target)});
}
let scrollQueued=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform='scaleX('+(max>0?scrollY/max:0)+')';scrollQueued=false}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});
updateProgress();
