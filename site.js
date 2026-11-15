const choices=document.querySelector('#choices'),emblem=document.querySelector('#emblem'),title=document.querySelector('#rankName');
const names=['VIP','Emperor','Duke','Marquess','Knight'];
const ranks=document.querySelector('#ranks'),stage=ranks.querySelector('.rank-stage');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let active=0;
function selectRank(index){
 if(index===active)return;
 active=index;
 const name=names[index];
 Array.from(choices.children).forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)));
 emblem.src='media/'+name.toLowerCase()+'.webp';emblem.alt=name+' emblem';title.textContent=name;
 for(const el of [emblem,title]){el.classList.remove('rank-enter');void el.offsetWidth;el.classList.add('rank-enter');}
}
names.forEach((name,index)=>{
 const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('aria-pressed',String(index===0));
 button.onclick=()=>{
 if(document.body.classList.contains('rank-scroll')){
 const span=ranks.offsetHeight-stage.offsetHeight;
 window.scrollTo({top:window.scrollY+ranks.getBoundingClientRect().top+(index+.5)*span/names.length,behavior:'instant'});
 }
 selectRank(index);
 };choices.append(button);
});
function setupRankScroll(){
 document.body.classList.toggle('rank-scroll',!motion.matches && innerHeight>540 && matchMedia('(min-width: 761px)').matches);
 updateRank();
}
function updateRank(){
 if(!document.body.classList.contains('rank-scroll'))return;
 const span=ranks.offsetHeight-stage.offsetHeight;
 const delta=-ranks.getBoundingClientRect().top;
 if(span>0)selectRank(Math.min(names.length-1,Math.max(0,Math.floor(delta/span*names.length))));
}
let frame=0;
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(()=>{updateRank();frame=0;});},{passive:true});
addEventListener('resize',setupRankScroll);motion.addEventListener('change',setupRankScroll);setupRankScroll();
for(let i=1;i<=5;i++){const details=document.createElement('details');details.innerHTML='<summary>Question '+i+'</summary><p>To be confirmed.</p>';document.querySelector('#questions').append(details);}
for(let i=0;i<23;i++){const bar=document.createElement('i');const base=29+18*Math.sin(i*.48)+12*Math.sin(i*1.3);bar.style.cssText='--cc:'+(Math.sin(i*.7)>0?'#26a69a':'#ef5350')+';--base:'+base+'px;--height:'+(8+(i*13)%24)+'px;--delay:'+i*.035+'s';document.querySelector('#candles').append(bar);}
const observer=new IntersectionObserver(entries=>{for(const item of entries)if(item.isIntersecting){item.target.classList.add('seen');observer.unobserve(item.target);}},{threshold:.12});document.querySelectorAll('main>section').forEach(section=>observer.observe(section));

if(!motion.matches){
 const enter=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('reveal-visible');enter.unobserve(entry.target);}}},{threshold:.12});
 for(const el of document.querySelectorAll('.benefits h2,.benefits article,.spread h2,.about p,.strategy-head h2,.monitor,.strategy-head p,.dashboard-note,.rank-stage>h2, .steps>div,.steps li,.referrals h2,.triptych article,.terms p,.faq details,.closing-feature h2')){
 el.classList.add('reveal-pending');el.style.setProperty('--lag',(Array.from(el.parentNode.children).indexOf(el)%3)*70+'ms');enter.observe(el);
 }
}

// Draw one circuit substrate across the terms and the expanding FAQ.
const circuit = document.querySelector('.circuit');
function paintCircuit() {
  const width = circuit.clientWidth;
  const height = circuit.clientHeight;
  const scale = Math.min(devicePixelRatio, 2);
  circuit.width = Math.round(width * scale);
  circuit.height = Math.round(height * scale);
  const pen = circuit.getContext('2d');
  pen.scale(scale, scale);
  const origin = width * .14;
  const mid = height * .48;
  for (let lane = 0; lane < 18; lane++) {
    const x = origin + lane * 7;
    const y = mid - lane * 7;
    pen.strokeStyle = lane % 5 === 0 ? 'rgba(229,181,94,.28)' : 'rgba(171,185,189,.13)';
    pen.beginPath();
    pen.moveTo(-4, y + 110);
    pen.lineTo(x - 110, y + 110);
    pen.lineTo(x, y);
    pen.lineTo(x, y - 80);
    pen.lineTo(x + 55, y - 135);
    pen.stroke();
    pen.beginPath();
    pen.arc(x + 55, y - 138, 3, 0, Math.PI * 2);
    pen.stroke();
  }
}
new ResizeObserver(paintCircuit).observe(circuit.parentElement);

const heroVideo = document.querySelector('.hero-film video');
function syncHeroPlayback() {
  if (motion.matches || document.hidden) {
    heroVideo.pause();
  } else {
    heroVideo.play().catch(() => {});
  }
}
motion.addEventListener('change', syncHeroPlayback);
document.addEventListener('visibilitychange', syncHeroPlayback);
syncHeroPlayback();
