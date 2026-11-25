(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var root=document.documentElement,bd=document.body,Q=new URLSearchParams(location.search);
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var cl=function(v){return v<0?0:v>1?1:v};
var sm=function(a,b,v){var t=cl((v-a)/(b-a));return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
function store(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
var y$=$('#yr');if(y$)y$.textContent=new Date().getFullYear();

/* menu */
var mbt=$('#mbt');
function closeMenu(){bd.classList.remove('mo');mbt&&mbt.setAttribute('aria-expanded','false')}
mbt&&mbt.addEventListener('click',function(){var o=bd.classList.toggle('mo');mbt.setAttribute('aria-expanded',o)});
$$('.mm a').forEach(function(a){a.addEventListener('click',closeMenu)});

/* smooth in-page links */
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var el=$(a.getAttribute('href'));if(!el)return;e.preventDefault();closeMenu();el.scrollIntoView({behavior:reduce?'auto':'smooth'})})});

/* header: solid after the hero, hides on the way down */
var hd=$('#hd'),mbar=$('#mbar'),lastY=0,tick=false,H=innerHeight;
addEventListener('resize',function(){H=innerHeight},{passive:true});
function onScroll(){tick=false;var y=scrollY;hd.classList.toggle('sc',y>40);
 var down=y>lastY+4,upw=y<lastY-4;if(y>H*.9&&down&&!bd.classList.contains('mo'))hd.classList.add('up');else if(upw||y<H*.9)hd.classList.remove('up');lastY=y;
 if(mbar)mbar.classList.toggle('on',y>H*.6&&(innerHeight+y)<document.documentElement.scrollHeight-260);
 who()}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});

/* reveals and counters */
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add('in');io.unobserve(t);if(t.dataset.to)count(t)})},{rootMargin:'0px 0px -12% 0px'}):null;
$$('.rv,.rimg,.npl,[data-to],.qz').forEach(function(el){if(io)io.observe(el);else el.classList.add('in')});
function count(el){var to=+el.dataset.to,t0=null;if(reduce){el.textContent=to;return}(function f(ts){if(!t0)t0=ts;var k=cl((ts-t0)/1400);k=1-Math.pow(1-k,3);el.textContent=Math.round(to*k);if(k<1)requestAnimationFrame(f)})(performance.now())}

/* hero headline into words */
var h1=$('.hx h1');if(h1){var html=h1.innerHTML.split(/(<[^>]+>)/),out='',inC=false;html.forEach(function(p){if(p.charAt(0)==='<'){out+=p;return}p.split(/(\s+)/).forEach(function(w){out+=/^\s+$/.test(w)||!w?w:'<span class="wd"><i>'+w+'</i></span>'})});h1.innerHTML=out;
 $$('.wd i',h1).forEach(function(i,n){i.style.transitionDelay=(n*.07)+'s'})}

/* loader: the hero photo inside a frame, which opens into the page */
var ld=$('#ld');
function reveal(){root.classList.add('on')}
if(ld){
 var seen=store('fx-seen');
 if(seen||reduce){ld.remove();reveal()}
 else{
  store('fx-seen','1');
  var r=$('#ldr'),n=$('#ldn'),img=$('.hx>img'),t0=performance.now(),pv=0,ready=false;
  function ok(){ready=true}
  if(img&&img.complete)ok();else if(img){img.addEventListener('load',ok);img.addEventListener('error',ok)}
  (function lt(){var el=performance.now()-t0,tg=Math.min(.92,.1+el/2400);if((ready&&el>1300)||el>5000)tg=1;pv+=(tg-pv)*.09;if(tg===1&&pv>.995)pv=1;
   r.style.strokeDashoffset=(1-pv).toFixed(4);n.textContent=Math.round(pv*100)+'%';
   if(pv<1)requestAnimationFrame(lt);else{ld.classList.add('open');setTimeout(reveal,700);setTimeout(function(){ld.classList.add('gone')},1250);setTimeout(function(){ld.remove()},1900)}})();
 }
}else reveal();

/* who we work with: a deck that deals itself as you scroll */
var auS=$('#who'),auC=$$('#auD .aud'),auL=$$('#auN li'),auB=$('#auB'),auA=-1;
function who(){if(!auS)return;var r=auS.getBoundingClientRect();if(r.bottom<0||r.top>H)return;var d=r.height-H,p=d>0?cl(-r.top/d):0,m=innerWidth<761,n=auC.length,seg=.78/(n-1),arr=[],act=0;
 for(var i=0;i<n;i++){var a=.08+(i-1)*seg;arr.push(i===0?1:sm(a,a+seg*.5,p))}
 arr.forEach(function(t,i){if(t>.55)act=i});
 auC.forEach(function(c,i){var t=arr[i],ab=0;for(var j=i+1;j<n;j++)ab+=arr[j];
  c.style.transform='translate3d(0,calc('+((1-t)*118).toFixed(2)+'% + '+(-ab*(m?11:16)).toFixed(1)+'px),0) rotate('+((1-t)*(i%2?6:-6)).toFixed(2)+'deg) scale('+(1-ab*.05).toFixed(4)+')';
  c.style.setProperty('--dim',Math.min(ab,1.5).toFixed(3))});
 if(act!==auA){auA=act;auL.forEach(function(l,i){l.classList.toggle('on',i===act)});auC.forEach(function(c,i){c.classList.toggle('on',i===act)})}
 if(auB)auB.style.transform='scaleX('+cl(p/.86).toFixed(4)+')'}
onScroll();

/* qualifier */
var qz=$('#qz');if(!qz)return;
var PROD={slide:'Sliding or bifold doors',win:'Windows',roof:'Rooflights',front:'Front door',steel:'Steel-look doors'};
var PER={home:'Homeowner',dev:'Developer',arch:'Architect or designer',con:'Builder or contractor',com:'Commercial'};
var Qs={
 home:[['What are you looking for?','prod',['Sliding or bifold doors','Windows','Rooflights','Front door','Steel-look doors','Not sure yet'],1],['Where is the project at?','stage',['Just ideas','Drawings or planning','Builder booked','Ready to go']],['Budget for the glazing','budget',['Under £10k','£10k to £25k','£25k to £50k','£50k+','Not sure yet']]],
 dev:[['What do you need?','prod',['Sliding or bifold doors','Windows','Rooflights','Front doors','Steel-look doors','Full package'],1],['How many units?','units',['1 to 5','6 to 20','21 to 50','50+']],['Where is the scheme at?','stage',['Pre-planning','Planning granted','Tendering now','On site']]],
 arch:[['What are you specifying?','prod',['Sliding or bifold doors','Windows','Rooflights','Entrances','Steel-look screens','Mixed'],1],['Project stage','stage',['Concept','Planning','Technical design','Tender']],['What would help most?','help',['Specification support','Technical details','Thermal data','Samples','A meeting'],1]],
 con:[['What do you need?','prod',['Sliding or bifold doors','Windows','Rooflights','Front doors','Steel-look doors','Full package'],1],['Supply only or fitted?','fit',['Supply only','Supply and fit','Not sure']],['When do you need us on site?','time',['Within 4 weeks','1 to 3 months','3 to 6 months','Later']]],
 com:[['What does the project need?','prod',['Shopfront or curtain wall','Sliding doors','Windows','Rooflights','Entrances','Internal glazing'],1],['Sector','sector',['Office','Retail','Hospitality','Education or public','Other']],['Where is the project at?','stage',['Early design','Tender','On site']]]};
var qss=$$('.qs',qz),qp=$$('#qzp li'),qnx=$('#qnx'),qbk=$('#qbk'),qnote=$('#qnote'),qnav=$('#qnav'),qzc=$('#qzc'),qsq=$('#qsq'),qst=0,QA={p:null,a:{}},pref=null;
function brief(){var h='';if(QA.p)h+='<b>'+PER[QA.p]+'</b>';Object.keys(QA.a).forEach(function(k){var v=QA.a[k];(Array.isArray(v)?v:[v]).forEach(function(x){h+='<span>'+x+'</span>'})});
 if(qzc)qzc.innerHTML=h||'<span class="qzce">Your brief will build here as you choose.</span>'}
function buildQ(){var set=Qs[QA.p];qsq.innerHTML=set.map(function(q){return '<div class="qg" data-k="'+q[1]+'" data-m="'+(q[3]?1:0)+'"><p class="qq">'+q[0]+(q[3]?' <small>Choose any</small>':'')+'</p><div class="qo">'+q[2].map(function(o){return '<button type="button" data-v="'+o+'">'+o+'</button>'}).join('')+'</div></div>'}).join('');
 if(pref&&QA.p!=='com'){var g=$('.qg[data-k="prod"]',qsq),o=g&&$('button[data-v="'+PROD[pref]+'"]',g);if(o){o.classList.add('on');QA.a.prod=[PROD[pref]]}}
 $$('.qg',qsq).forEach(function(g){$$('button',g).forEach(function(bn){bn.addEventListener('click',function(){var k=g.dataset.k;
  if(g.dataset.m==='1'){bn.classList.toggle('on');QA.a[k]=$$('button.on',g).map(function(x){return x.dataset.v});if(!QA.a[k].length)delete QA.a[k]}
  else{$$('button',g).forEach(function(x){x.classList.toggle('on',x===bn)});QA.a[k]=bn.dataset.v}
  brief();check()})})});brief()}
function check(){if(qst===0){qnx.disabled=!QA.p;qnote.textContent='Choose one to continue'}
 else if(qst===1){var need=$$('.qg',qsq).length,got=$$('.qg',qsq).filter(function(g){return QA.a[g.dataset.k]}).length;qnx.disabled=got<need;qnote.textContent=got<need?'Answer each to continue':'Looks good'}
 else if(qst===2){var ok=$('#qn').value.trim().length>1&&($('#qtel').value.replace(/\D/g,'').length>=10||/\S+@\S+\.\S+/.test($('#qe').value));qnx.disabled=!ok;qnote.textContent=ok?'No obligation. No pressure.':'Name and a phone or email'}}
function step(i){qst=i;qss.forEach(function(s){s.classList.toggle('on',+s.dataset.s===i)});qp.forEach(function(l,j){l.classList.toggle('on',j<=Math.min(i,2))});
 qbk.style.visibility=i>0&&i<3?'visible':'hidden';qnav.style.display=i===3?'none':'';$('span',qnx).textContent=i===2?'Request my consultation':'Continue';
 $('.qco',qz).style.display=QA.p&&QA.p!=='home'?'':'none';check()}
function pick(p){var t=$('.qt6[data-p="'+p+'"]',qz);if(!t)return;$$('.qt6',qz).forEach(function(x){x.classList.toggle('on',x===t)});QA.p=p;QA.a={};buildQ();step(1)}
$$('.qt6',qz).forEach(function(t){t.addEventListener('click',function(){$$('.qt6',qz).forEach(function(x){x.classList.toggle('on',x===t)});if(QA.p!==t.dataset.p){QA.p=t.dataset.p;QA.a={};buildQ()}check();setTimeout(function(){if(qst===0)step(1)},380)})});
$$('input,textarea',qz).forEach(function(i){i.addEventListener('input',check);i.addEventListener('blur',function(){i.parentNode.classList.toggle('f',!!i.value)})});
qbk.addEventListener('click',function(){if(qst>0)step(qst-1)});
qz.addEventListener('submit',function(e){e.preventDefault();if(qnx.disabled)return;if(qst<2){step(qst+1);return}
 $('#qdh').textContent='Thank you, '+$('#qn').value.trim().split(' ')[0]+'.';
 window.fenluxLead={persona:PER[QA.p],answers:QA.a,name:$('#qn').value,company:$('#qc').value,phone:$('#qtel').value,email:$('#qe').value,location:$('#qpc').value,message:$('#qm').value};step(3)});
$$('[data-pick]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();pick(a.dataset.pick);$('#start').scrollIntoView({behavior:reduce?'auto':'smooth'})})});
if(Q.get('p')&&PROD[Q.get('p')])pref=Q.get('p');
step(0);
if(Q.get('who')&&PER[Q.get('who')])pick(Q.get('who'));
})();
