/* Novus static site behaviour (all pages). The homepage also loads home.js for its own sections. */
(function () {
  var isHome = !!document.getElementById('heroGo');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;

  /* NAV + MOBILE MENU */
  var nav = document.getElementById('nav'), mm = document.querySelector('.mmenu'), burger = document.querySelector('.burger');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('solid', y > window.innerHeight * (isHome ? 0.75 : 0.5));
    if (!isHome) document.querySelectorAll('.mbar').forEach(function (m) { m.classList.toggle('show', y > window.innerHeight * 0.5); });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    if (!mm) return;
    mm.classList.toggle('open', open); nav.classList.toggle('menu-open', open);
    html.style.overflow = open ? 'hidden' : '';
    if (burger) burger.setAttribute('aria-expanded', open);
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!mm.classList.contains('open')); });
  if (mm) mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  if (isHome) { if (window.initNovus) window.initNovus({}); return; }

  /* REVEAL */
  var els = document.querySelectorAll('.rv,.words');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* SNOW */
  function snow(c, density) {
    var ctx = c.getContext('2d'), fl = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), vis = false;
    function size() { W = c.offsetWidth; H = c.offsetHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size, { passive: true });
    var N = Math.min(140, Math.round(window.innerWidth / density));
    for (var k = 0; k < N; k++) fl.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + .4, s: Math.random() * .6 + .2, d: Math.random() * 6.28, o: Math.random() * .5 + .25 });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(c);
    (function draw() {
      if (vis) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < fl.length; i++) {
          var f = fl[i]; f.d += .01; f.y += f.s * (1 + f.r * .35); f.x += Math.sin(f.d) * .3 + .12;
          if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; } if (f.x > W + 5) f.x = -5;
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,' + f.o + ')'; ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    })();
  }
  if (!reduce) document.querySelectorAll('canvas.snowc').forEach(function (c) { snow(c, c.closest('.storm') ? 22 : 13); });

  /* DEADLINE CALCULATOR */
  function fmt(m) { m = ((m % 1440) + 1440) % 1440; var h = Math.floor(m / 60), mi = m % 60; return { t: (h % 12 || 12) + ':' + (mi < 10 ? '0' : '') + mi, ap: h >= 12 ? 'PM' : 'AM' }; }
  document.querySelectorAll('.clock-card').forEach(function (card) {
    var rng = card.querySelector('input[type=range]'), tm = card.querySelector('.cc-time'), vs = card.querySelectorAll('.cc-out .v'), bar = card.querySelector('.cc-bar i');
    if (!rng) return;
    function calc() {
      var t = +rng.value, due;
      if (t >= 420 && t < 1020) due = t + 240; else if (t >= 1020 && t < 1260) due = t + 840; else due = t >= 1260 ? 1440 + 660 : 660;
      var win = due - t, hrs = Math.round(win / 60 * 10) / 10, a = fmt(t), b = fmt(due);
      tm.innerHTML = '<b>' + a.t + '</b> ' + a.ap;
      vs[0].innerHTML = '<b>' + b.t + ' ' + b.ap + '</b> ' + (due >= 1440 ? 'tomorrow' : 'today');
      vs[1].innerHTML = '<b>' + (hrs % 1 === 0 ? hrs : hrs.toFixed(1)) + '</b> hrs';
      bar.style.width = Math.max(8, Math.min(100, win / 840 * 100)) + '%';
    }
    rng.addEventListener('input', calc); calc();
  });

  /* CHECKLIST */
  document.querySelectorAll('.chk').forEach(function (chk) {
    var items = chk.querySelectorAll('.chk-i'), n = chk.querySelector('.chk-n b'), bar = chk.querySelector('.chk-bar i'), p = chk.querySelector('.chk-meter p');
    function upd() {
      var d = chk.querySelectorAll('.chk-i.on').length, all = items.length;
      n.textContent = d; bar.style.width = Math.round(d / all * 100) + '%';
      p.textContent = d === all ? 'Your site is ready. Want us to make it official?' : d > all / 2 ? 'Getting there. The gaps are usually in the contract.' : "Most sites have gaps here. That's what the plan is for.";
    }
    items.forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('on'); b.setAttribute('aria-pressed', b.classList.contains('on')); upd(); }); });
  });

  /* QUOTE FORM (demo: no backend on this preview link) */
  var fs = document.querySelectorAll('.fs'); if (!fs.length) return;
  var fi = 0, data = { type: [], locs: [], where: [], needs: [] };
  var next = document.getElementById('fNext'), back = document.getElementById('fBack');
  var pre = document.body.getAttribute('data-need'), preW = document.body.getAttribute('data-where');
  fs.forEach(function (f) {
    var key = f.dataset.key, mode = f.dataset.mode;
    f.querySelectorAll('.cardopt').forEach(function (b) {
      var v = b.childNodes[0].textContent.trim();
      if ((key === 'needs' && v === pre) || (key === 'where' && v === preW)) { b.classList.add('on'); data[key].push(v); }
      b.addEventListener('click', function () {
        if (mode === 'single') {
          f.querySelectorAll('.cardopt').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); data[key] = [v]; setTimeout(function () { go(1); }, 260);
        } else {
          b.classList.toggle('on');
          var i = data[key].indexOf(v); if (i > -1) data[key].splice(i, 1); else data[key].push(v);
        }
      });
    });
  });
  function show(i) {
    fi = i; fs.forEach(function (f, j) { f.classList.toggle('on', j === i); });
    document.getElementById('fStep').textContent = 'Step ' + (i + 1) + ' of 5';
    document.getElementById('fBar').style.width = ((i + 1) / 5 * 100) + '%';
    back.classList.toggle('show', i > 0);
    next.innerHTML = i === 4 ? 'Get my snow plan <span class="arr">→</span>' : 'Continue <span class="arr">→</span>';
  }
  function valid() {
    var key = fs[fi].dataset.key;
    if (key !== 'contact') return data[key].length > 0;
    var ok = true;
    [['fName', function (v) { return v.length > 1; }], ['fEmail', function (v) { return /.+@.+\..+/.test(v); }], ['fPhone', function (v) { return v.replace(/\D/g, '').length >= 7; }]].forEach(function (r) {
      var el = document.getElementById(r[0]), good = r[1](el.value.trim());
      el.parentNode.classList.toggle('err', !good); if (!good) ok = false;
    });
    return ok;
  }
  function go(d) {
    if (d > 0 && !valid()) { fs[fi].animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return; }
    if (d > 0 && fi === 4) { finish(); return; }
    show(Math.max(0, Math.min(4, fi + d)));
  }
  next.addEventListener('click', function () { go(1); });
  back.addEventListener('click', function () { go(-1); });
  function finish() {
    var hp = document.getElementById('fHp'); if (hp && hp.value) return;
    var name = document.getElementById('fName').value.trim().split(' ')[0];
    document.getElementById('fDoneName').textContent = name ? ', ' + name : '';
    var sum = document.getElementById('fSum'); sum.innerHTML = '';
    [].concat(data.type, data.locs, data.where, data.needs).forEach(function (v) { var sp = document.createElement('span'); sp.textContent = v; sum.appendChild(sp); });
    document.getElementById('fWrap').hidden = true; document.getElementById('fDone').hidden = false;
  }
})();
