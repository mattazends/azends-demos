/* Novus page behaviour: runs in the browser after hydration. Returns a cleanup function. */
export function initNovus(opts){
  opts=opts||{};
  var __ac=new AbortController(),__sig=__ac.signal,__dead=false;

  /* NAV */
  var nav=document.getElementById('nav'),mbar=document.getElementById('mbar');
  function onScroll(){
    var y=window.scrollY;
    nav.classList.toggle('solid',y>window.innerHeight*0.75);
    mbar.classList.toggle('show',y>window.innerHeight*0.6);
  }
  window.addEventListener('scroll',onScroll,{passive:true,signal:__sig});onScroll();
  var burger=document.getElementById('burger'),mm=document.getElementById('mmenu');
  burger.addEventListener('click',function(){mm.classList.toggle('open')});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open')})});

  /* word split */
  document.querySelectorAll('[data-words]').forEach(function(el){
    var i=0;
    function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var parts=n.textContent.split(/(\s+)/),frag=document.createDocumentFragment();
          parts.forEach(function(p){
            if(!p)return;
            if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(' '));return;}
            var w=document.createElement('span');w.className='w';
            var s=document.createElement('span');s.textContent=p;s.style.transitionDelay=(i++*0.05)+'s';
            w.appendChild(s);frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag,n);
        }else if(n.nodeType===1){walk(n);}
      });
    }
    walk(el);
  });

  /* reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv,.words').forEach(function(el){io.observe(el)});

  /* marquee duplicate */
  var mq=document.getElementById('marq');mq.innerHTML+=mq.innerHTML;

  /* SNOW */
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function snow(c,density){
    var ctx=c.getContext('2d'),fl=[],W,H,dpr=Math.min(window.devicePixelRatio||1,2),vis=false;
    function size(){W=c.offsetWidth;H=c.offsetHeight;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
    size();window.addEventListener('resize',size,{passive:true,signal:__sig});
    var N=Math.min(160,Math.round(window.innerWidth/density));
    for(var k=0;k<N;k++)fl.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.4,s:Math.random()*.6+.2,d:Math.random()*6.28,o:Math.random()*.5+.25});
    new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
    (function draw(){
      if(vis){ctx.clearRect(0,0,W,H);
        for(var i=0;i<fl.length;i++){var f=fl[i];f.d+=.01;f.y+=f.s*(1+f.r*.35);f.x+=Math.sin(f.d)*.3+.12;
          if(f.y>H+5){f.y=-5;f.x=Math.random()*W}if(f.x>W+5)f.x=-5;
          ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.283);ctx.fillStyle='rgba(255,255,255,'+f.o+')';ctx.fill();}}
      if(!__dead)requestAnimationFrame(draw);
    })();
  }
  if(!reduce){snow(document.getElementById('snow'),11);document.querySelectorAll('.snowc').forEach(function(c){snow(c,14)});}

  /* HERO VIDEO fallback: if it can't play, poster stays */

  document.querySelectorAll('.hero-vid').forEach(function(v){v.muted=true;v.defaultMuted=true;});
  /* HERO VIDEO: seamless crossfade loop between two copies */
  (function(){
    var vs=document.querySelectorAll('.hero-vid');if(vs.length<2||reduce)return;
    var cur=0,FADE=1.4,armed=false;
    function start(i){var v=vs[i];v.currentTime=0;var p=v.play();if(p&&p.catch)p.catch(function(){});v.classList.add('on');}
    vs.forEach(function(v,i){
      v.addEventListener('timeupdate',function(){
        if(i!==cur||!v.duration)return;
        if(v.currentTime>v.duration-FADE&&!armed){armed=true;var n=1-cur;vs[n].style.zIndex=2;v.style.zIndex=1;start(n);
          setTimeout(function(){v.classList.remove('on');v.pause();cur=n;armed=false;},FADE*1000);}
      });
    });
    vs[0].addEventListener('canplay',function once(){vs[0].removeEventListener('canplay',once);start(0);});
  })();

  /* SNOW RAIL */
  var spin=document.getElementById('railSpin'),rail=document.getElementById('rail'),railFill=document.getElementById('railFill'),flake=document.getElementById('railFlake'),lbl=document.getElementById('railLbl'),ticksEl=document.getElementById('railTicks'),mprog=document.getElementById('mprog');
  var secs=[].slice.call(document.querySelectorAll('[data-rail]')),ticks=[],lastIdx=-1,lblT;
  secs.forEach(function(sec,i){
    var t=document.createElement('button');t.className='rail-tick';t.setAttribute('aria-label',sec.dataset.rail);
    t.innerHTML='<span>'+sec.dataset.rail+'</span>';
    t.addEventListener('click',function(){sec.scrollIntoView({behavior:'smooth'})});
    ticksEl.appendChild(t);ticks.push(t);
  });
  function railPos(){
    var first=secs[0].offsetTop,last=secs[secs.length-1].offsetTop,span=last-first;
    secs.forEach(function(sec,i){ticks[i].style.top=((sec.offsetTop-first)/span*100)+'%'});
  }
  railPos();setTimeout(railPos,900);window.addEventListener('resize',railPos,{passive:true,signal:__sig});window.addEventListener('load',railPos,{passive:true,signal:__sig});
  function railScroll(){
    var y=window.scrollY+window.innerHeight*.4,first=secs[0].offsetTop,last=secs[secs.length-1].offsetTop;
    var p=Math.max(0,Math.min(1,(y-first)/(last-first)));
    var h=rail.offsetHeight;
    flake.style.transform='translateY('+(p*h)+'px)';spin.style.transform='rotate('+(window.scrollY*0.25)+'deg)';
    railFill.style.height=(p*100)+'%';
    rail.classList.toggle('show',window.scrollY>window.innerHeight*.55&&window.scrollY<document.body.scrollHeight-window.innerHeight*1.4);
    var idx=0;secs.forEach(function(sec,i){if(sec.offsetTop<=y)idx=i;ticks[i].classList.toggle('past',sec.offsetTop<=y)});
    if(idx!==lastIdx){lastIdx=idx;
      lbl.innerHTML='<em>'+('0'+(idx+1)).slice(-2)+'</em>'+secs[idx].dataset.rail;
      lbl.classList.add('on');clearTimeout(lblT);lblT=setTimeout(function(){lbl.classList.remove('on')},1800);}
    var tp=window.scrollY/(document.body.scrollHeight-window.innerHeight);
    mprog.style.width=(tp*100)+'%';
  }
  window.addEventListener('scroll',railScroll,{passive:true,signal:__sig});railScroll();

  /* TESTIMONIALS */
  var tq=document.querySelectorAll('#tstQ blockquote'),tt=document.querySelectorAll('#tstTabs .tst-tab'),ti=0,tTimer;
  function setT(i){ti=i;tq.forEach(function(q,j){q.classList.toggle('on',j===i)});tt.forEach(function(t,j){t.classList.remove('on');void t.offsetWidth;if(j===i)t.classList.add('on')});clearTimeout(tTimer);tTimer=setTimeout(function(){setT((ti+1)%tq.length)},6000);}
  tt.forEach(function(t,i){t.addEventListener('click',function(){setT(i)})});setT(0);

  /* HERO quick quote */
  var heroSel={type:null,locs:null};
  document.querySelectorAll('[data-hero]').forEach(function(g){
    g.querySelectorAll('.opt').forEach(function(b){
      b.addEventListener('click',function(){
        g.querySelectorAll('.opt').forEach(function(x){x.classList.remove('on')});
        b.classList.add('on');heroSel[g.dataset.hero]=b.textContent.trim();
      });
    });
  });

  /* CLOCK */
  var rng=document.getElementById('ccRange');
  function fmt(m){m=((m%1440)+1440)%1440;var h=Math.floor(m/60),mi=m%60,ap=h>=12?'PM':'AM',hh=h%12||12;return {t:hh+':'+(mi<10?'0':'')+mi,ap:ap};}
  function clock(){
    var t=+rng.value,due,day;
    if(t>=420&&t<1020){due=t+240;}
    else if(t>=1020&&t<1260){due=t+840;}
    else{due=(t>=1260)?(1440+660):660;}
    var win=due-t;day=due>=1440?'tomorrow':'today';
    var a=fmt(t),b=fmt(due);
    document.getElementById('ccTime').innerHTML='<b>'+a.t+'</b> '+a.ap;
    document.getElementById('ccDue').innerHTML='<b>'+b.t+' '+b.ap+'</b> '+day;
    var hrs=Math.round(win/60*10)/10;
    document.getElementById('ccWin').innerHTML='<b>'+(hrs%1===0?hrs:hrs.toFixed(1))+'</b> hrs';
    document.getElementById('ccBar').style.width=Math.max(8,Math.min(100,win/840*100))+'%';
  }
  rng.addEventListener('input',clock);clock();

  /* SERVICES */
  var items=document.querySelectorAll('.svc-item'),imgs=document.querySelectorAll('#svcVis img'),cap=document.getElementById('svcCap');
  var caps=['Lots and roads, <b>pushed clear</b>','Ice stopped <b>before it sets</b>','Frontages <b>safe and passable</b>','Stairs, ramps, <b>every doorway</b>','Piles <b>gone, spaces back</b>'];
  function setSvc(i){
    items.forEach(function(x,j){x.classList.toggle('on',j===i)});
    imgs.forEach(function(x,j){x.classList.toggle('on',j===i)});
    cap.innerHTML=caps[i];
  }
  items.forEach(function(it){it.addEventListener('click',function(){setSvc(+it.dataset.i)})});

  /* STORM */
  var steps=document.querySelectorAll('.step'),cks=document.querySelectorAll('.ck'),prog=document.getElementById('prog'),stepsEl=document.getElementById('steps');
  var S=[
    {pill:'Pre-season',col:['rgba(143,176,255,.14)','#BCD0FF'],title:'Site <b>mapped &amp; planned</b>',depth:'0″',fill:0,clear:0,done:1},
    {pill:'Standby',col:['rgba(250,204,21,.14)','#FDE68A'],title:'Crew <b>on standby</b>',depth:'0″',fill:0,clear:0,done:2},
    {pill:'Storm active',col:['rgba(248,113,113,.15)','#FCA5A5'],title:'Surfaces <b>pre-treated</b>',depth:'3″',fill:38,clear:0,done:3},
    {pill:'Clearing',col:['rgba(143,176,255,.18)','#BCD0FF'],title:'Lot plowed, <b>sidewalks clear</b>',depth:'7″ → 0″',fill:85,clear:85,done:4},
    {pill:'Open on time',col:['rgba(52,211,153,.16)','#6EE7B7'],title:'Safe, treated, <b>open on time</b>',depth:'Clear',fill:100,clear:100,done:5}
  ];
  var pill=document.getElementById('stPill'),stT=document.getElementById('stTitle'),stD=document.getElementById('stDepth'),stF=document.getElementById('stFill'),stC=document.getElementById('stClear'),cur=-1;
  function setStep(i){
    if(i===cur)return;cur=i;var s=S[i];
    steps.forEach(function(x,j){x.classList.toggle('on',j<=i)});
    pill.style.background=s.col[0];pill.style.color=s.col[1];pill.querySelector('span').textContent=s.pill;
    stT.innerHTML=s.title;stD.textContent=s.depth;stF.style.width=s.fill+'%';stC.style.width=s.clear+'%';
    cks.forEach(function(x,j){x.classList.toggle('done',j<s.done)});
  }
  setStep(0);
  function stormScroll(){
    var mid=window.innerHeight*0.55,act=0;
    steps.forEach(function(s,i){if(s.getBoundingClientRect().top<mid)act=i;});
    setStep(act);
    var r=stepsEl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(mid-r.top)/(r.height-40)));
    prog.style.height=(p*(r.height-16))+'px';
  }
  window.addEventListener('scroll',stormScroll,{passive:true,signal:__sig});stormScroll();

  /* QUOTE FORM */
  var fs=document.querySelectorAll('.fs'),fi=0,data={type:[],locs:[],where:[],needs:[]};
  var next=document.getElementById('fNext'),back=document.getElementById('fBack');
  fs.forEach(function(f){
    var key=f.dataset.key,mode=f.dataset.mode;
    f.querySelectorAll('.cardopt').forEach(function(b){
      b.addEventListener('click',function(){
        var v=b.childNodes[0].textContent.trim();
        if(mode==='single'){
          f.querySelectorAll('.cardopt').forEach(function(x){x.classList.remove('on')});
          b.classList.add('on');data[key]=[v];
          setTimeout(function(){go(1)},260);
        }else{
          b.classList.toggle('on');
          var i=data[key].indexOf(v);if(i>-1)data[key].splice(i,1);else data[key].push(v);
        }
      });
    });
  });
  function preselect(key,val){
    if(!val)return;
    var f=document.querySelector('.fs[data-key="'+key+'"]');
    f.querySelectorAll('.cardopt').forEach(function(b){
      var t=b.childNodes[0].textContent.trim();
      var match=key==='locs'?t.indexOf(val)===0:t===val;
      b.classList.toggle('on',match);if(match)data[key]=[t];
    });
  }
  function show(i){
    fi=i;fs.forEach(function(f,j){f.classList.toggle('on',j===i)});
    document.getElementById('fStep').textContent='Step '+(i+1)+' of 5';
    document.getElementById('fBar').style.width=((i+1)/5*100)+'%';
    back.classList.toggle('show',i>0);
    next.innerHTML=i===4?'Get my snow plan <span class="arr">→</span>':'Continue <span class="arr">→</span>';
  }
  function valid(){
    var key=fs[fi].dataset.key;
    if(key!=='contact')return data[key].length>0;
    var ok=true;
    [['fName',function(v){return v.length>1}],['fEmail',function(v){return /.+@.+\..+/.test(v)}],['fPhone',function(v){return v.replace(/\D/g,'').length>=7}]].forEach(function(r){
      var el=document.getElementById(r[0]),good=r[1](el.value.trim());
      el.parentNode.classList.toggle('err',!good);if(!good)ok=false;
    });
    return ok;
  }
  function go(d){
    if(d>0&&!valid()){fs[fi].animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:300});return;}
    if(d>0&&fi===4){finish();return;}
    show(Math.max(0,Math.min(4,fi+d)));
  }
  next.addEventListener('click',function(){go(1)});
  back.addEventListener('click',function(){go(-1)});
  function finish(){
    var hp=document.getElementById('fHp');if(hp&&hp.value)return;
    var val=function(id){var el=document.getElementById(id);return el?el.value.trim():''};
    var payload={name:val('fName'),company:val('fCo'),email:val('fEmail'),phone:val('fPhone'),notes:val('fNotes'),
      property_type:data.type[0]||'',locations:data.locs[0]||'',boroughs:data.where.slice(),services:data.needs.slice(),source_page:location.pathname};
    next.disabled=true;next.innerHTML='Sending&hellip;';
    var hint=fs[4].querySelector('.hint'),hintTxt=hint.textContent;
    Promise.resolve(opts.onSubmit?opts.onSubmit(payload):null).then(function(){
      var name=payload.name.split(' ')[0];
      document.getElementById('fDoneName').textContent=name?', '+name:'';
      var sum=document.getElementById('fSum');sum.innerHTML='';
      [].concat(data.type,data.locs,data.where,data.needs).forEach(function(v){var sp=document.createElement('span');sp.textContent=v;sum.appendChild(sp)});
      document.getElementById('fWrap').hidden=true;document.getElementById('fDone').hidden=false;
    }).catch(function(){
      next.disabled=false;next.innerHTML='Try again <span class="arr">→</span>';
      hint.textContent='That didn\'t send. Please try again, or call (917) 970-2960.';hint.style.color='#E11D48';
      setTimeout(function(){hint.textContent=hintTxt;hint.style.color=''},6000);
    });
  }
  document.getElementById('heroGo').addEventListener('click',function(){
    if(heroSel.type)preselect('type',heroSel.type);
    if(heroSel.locs)preselect('locs',heroSel.locs);
    show(heroSel.type&&heroSel.locs?2:heroSel.type?1:0);
  });

  return function(){__dead=true;__ac.abort();};
}
