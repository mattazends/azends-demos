/* Novus static site behaviour (all pages). The homepage also loads home.js for its own sections. */
(function () {
  var isHome = !!document.getElementById('plow');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;

  /* NAV + MOBILE MENU */
  var nav = document.getElementById('nav'), mm = document.querySelector('.mmenu'), burger = document.querySelector('.burger');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('solid', y > window.innerHeight * (isHome ? 0.75 : 0.5));
    if (!isHome) { var q = document.getElementById('quote'), r = q ? q.getBoundingClientRect() : null, inForm = r && r.top < window.innerHeight * 0.8 && r.bottom > 0; document.querySelectorAll('.mbar').forEach(function (m) { m.classList.toggle('show', y > window.innerHeight * 0.5 && !inForm); }); }
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

  if (isHome) { if (window.initNovus) window.initNovus({}); initForm(); return; }

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

  initForm();

  function initForm() {
    document.querySelectorAll('[data-qf]').forEach(mount);
    /* pricing section: read more */
    document.querySelectorAll('.plan .pc-rm').forEach(function (b) {
      b.addEventListener('click', function () { var m = b.previousElementSibling, o = !m.classList.contains('open'); m.classList.toggle('open', o); b.setAttribute('aria-expanded', o); b.firstChild.textContent = o ? 'Show less' : 'Read more'; });
    });
    document.querySelectorAll('.plans .btn').forEach(function (b) {
      b.addEventListener('click', function (e) {
        var q = document.getElementById('quote'); if (!q) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('novus:prefill', { detail: { plan: /per-visit/i.test(b.textContent) ? 'Per-visit pricing' : 'Seasonal pricing' } }));
        q.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function mount(host) {
    var hero = host.getAttribute('data-qf') === 'hero';
  /* QUOTE FORM (demo port of the React form; no backend on this preview link) */
  var SVGP = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v1.5a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 10.5z"/><path d="M5 12v8h14v-8M10 20v-5h4v5"/>',
    mall:'<path d="M3 20h18M5 20V8l7-4 7 4v12"/><path d="M9 20v-6h6v6M9 10h.01M15 10h.01"/>',
    hotel:'<path d="M4 20V4h11v16M15 9h5v11M2 20h20"/><path d="M7.5 8h.01M11.5 8h.01M7.5 12h.01M11.5 12h.01M8 20v-4h3v4"/>',
    health:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
    office:'<path d="M5 20V3h10v17M15 8h4v12M3 20h18"/><path d="M8 7h4M8 11h4M8 15h4"/>',
    warehouse:'<path d="M2 20V9l10-5 10 5v11"/><path d="M6 20v-8h12v8M6 15h12"/>',
    factory:'<path d="M3 20V10l5 3V10l5 3V6h3l1 14M3 20h18"/><path d="M17 6h2l1 14"/>',
    apartment:'<rect x="5" y="3" width="14" height="17" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 20v-4h4v4M3 20h18"/>',
    lot:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    crane:'<path d="M6 21V4h1l13 4H7M6 8H3M17 8v5M15 13h4M4 21h6"/>',
    gym:'<path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/>',
    more:'<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>'
  };
  var TYPES = [['Retail / storefront','store'],['Shopping center','mall'],['Hotel','hotel'],['Hospital / healthcare','health'],['Office / bank','office'],['Warehouse / distribution','warehouse'],['Industrial site','factory'],['Apartment building','apartment'],['Parking lot','lot'],['Construction site','crane'],['Gym / fitness','gym'],['Something else','more']];
  var LOCS = ['1 location','2–5 locations','6–20 locations','20+ locations'];
  var WHERE = ['Manhattan','Brooklyn','Queens','The Bronx','Staten Island','Outside NYC'];
  var PLANS = {
    included: ['Pre-storm anti-icing','Plowing for lots and access roads','Sidewalk and entrance clearing','De-icing and re-treating against refreeze','Hand crews for stairs, ramps and doorways'],
    s: ['Seasonal pricing','One fixed price for the whole season, split into five monthly payments.',['Every storm covered, however many there are','A budget you know in November','Crews assigned to your site before the first flake'],[['How you pay','One price for the whole season, paid in five equal monthly payments. A heavy winter costs you the same as a quiet one.'],["What's covered",'Every storm, start to finish: pre-treatment before it, plowing and sidewalks during it, re-treating against refreeze after it.'],['Why we recommend it','Your crew is booked for your site before the season starts, so nothing waits on a call or a sign-off mid-storm.'],['Best for','Hotels, hospitals, retail chains, warehouses and anyone with several sites who needs every storm handled.']]],
    v: ['Per-visit pricing','You sign up for the season and pay for each visit as it snows.',['Same crews and same site plan','Billed per storm, by the visit','Suits sites that only need the big storms'],[['How you pay','You sign up for the season, then each visit is billed as it happens. A quiet winter costs less, a heavy one costs more.'],["What's covered",'The same site plan and the same crews. We go out as it snows, at the depths agreed in your plan.'],['Good to know','You still sign up before the season, so your site is walked, planned and on the route before the first storm.'],['Best for','Sites that only need clearing on the bigger storms, or owners who prefer to pay as they go.']]]
  };
  var NOUN = {'Retail / storefront':'storefronts','Shopping center':'shopping centers','Hotel':'hotels','Hospital / healthcare':'hospitals and care sites','Office / bank':'offices and banks','Warehouse / distribution':'warehouses','Industrial site':'industrial sites','Apartment building':'apartment buildings','Parking lot':'parking lots','Construction site':'construction sites','Gym / fitness':'gyms and studios'};
  function rec(type, locs) {
    var why = "You open on a schedule. One fixed price means a crew is booked for your site before every storm, not called in after it.";
    if (['Hotel','Hospital / healthcare','Apartment building'].indexOf(type) > -1) why = "Your site needs clearing at every hour. One fixed price means every storm is covered, with nobody waiting on a sign-off at 3 AM.";
    if (['Warehouse / distribution','Industrial site','Parking lot','Construction site','Shopping center'].indexOf(type) > -1) why = "Big surfaces need plows on every storm. One fixed price keeps the cost the same, even in a heavy winter.";
    if (locs && !/^1 /.test(locs)) why += ' Across ' + locs.replace(' locations', ' sites') + ', it also keeps every location on one standard and one budget.';
    return { tag: 'Recommended for ' + (NOUN[type] || 'sites like yours'), why: why };
  }
  var TICK = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 6 3 3 5-6"/></svg>';
  var STEPS = [['Property','What are we ','clearing?','Commercial and multi-unit properties only.'],['Locations','How many ','locations?','Multi-site contracts are welcome.'],['Boroughs','Where are your ','sites?','Select all that apply.'],['Plan','How do you want to ','cover the season?',''],['Details','Where should we ','send your plan?','Add each site so we can price it accurately.']];
  var preW = document.body.getAttribute('data-where');
  var more = {};
  var st = { i: 0, type: '', locs: '', where: preW ? [preW] : [], plan: 'Seasonal pricing', haul: false, addrs: [{ label: '', picked: false }], f: { name: '', co: '', email: '', phone: '', notes: '' }, err: {}, done: false };
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render() {
    if (st.done) {
      var first = st.f.name.trim().split(' ')[0];
      host.innerHTML = '<div class="f-done"><div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg></div><h3 class="h2" style="font-size:clamp(28px,3vw,40px)">Thanks' + (first ? ', ' + esc(first) : '') + '. <b>Your quote is being prepared.</b></h3><p class="lead" style="margin:14px auto 0">A Novus snow specialist is pricing your ' + (st.addrs.filter(function (a) { return a.label; }).length > 1 ? 'sites' : 'site') + ' now and will be in touch shortly. Need us now? Call (917) 970-2960, any time.</p><div class="f-sum">' + [st.type, st.locs].concat(st.where, [st.plan], st.haul ? ['Snow hauling'] : [], st.addrs.filter(function (a) { return a.label; }).map(function (a) { return a.street || a.label; })).filter(Boolean).map(function (v) { return '<span>' + esc(v) + '</span>'; }).join('') + '</div></div>';
      return;
    }
    var s = STEPS[st.i], h = hero ? '<div class="hf-h">Price your site in <b>60 seconds</b></div>' : '';
    h += '<div class="f-prog"><span>Step ' + (st.i + 1) + ' of 5 · ' + s[0] + '</span><span class="f-comm">Commercial properties only</span></div>';
    h += '<div class="f-dots">' + STEPS.map(function (_, k) { return '<i class="' + (k < st.i ? 'done' : k === st.i ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    h += '<div class="fs on"><h3>' + s[1] + '<b>' + s[2] + '</b></h3>' + (s[3] ? '<p class="hint">' + s[3] + '</p>' : '');
    if (st.i === 0) h += '<div class="tiles">' + TYPES.map(function (t) { return '<button type="button" class="tile' + (st.type === t[0] ? ' on' : '') + '" data-type="' + t[0] + '"><svg ' + SVGP + '>' + ICON[t[1]] + '</svg><span>' + t[0] + '</span></button>'; }).join('') + '</div>';
    if (st.i === 1) h += '<div class="cards">' + LOCS.map(function (o) { return '<button type="button" class="cardopt' + (st.locs === o ? ' on' : '') + '" data-locs="' + o + '">' + o + '<span class="tick">' + TICK + '</span></button>'; }).join('') + '</div>';
    if (st.i === 2) h += '<div class="cards c3">' + WHERE.map(function (o) { return '<button type="button" class="cardopt' + (st.where.indexOf(o) > -1 ? ' on' : '') + '" data-where="' + o + '">' + o + '<span class="tick">' + TICK + '</span></button>'; }).join('') + '</div>';
    if (st.i === 3) {
      var r = rec(st.type, st.locs);
      var CHEV = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m3 4.5 3 3 3-3"/></svg>';
      h += '<div class="pcards" role="radiogroup">' + [[PLANS.s, true], [PLANS.v, false]].map(function (x) { var p = x[0], op = !!more[p[0]]; return '<div role="radio" tabindex="0" aria-checked="' + (st.plan === p[0]) + '" class="pcard' + (x[1] ? ' rec' : '') + (st.plan === p[0] ? ' on' : '') + (op ? ' open' : '') + '" data-plan="' + p[0] + '">' + (x[1] ? '<span class="pc-tag">' + r.tag + '</span>' : '') + '<span class="pc-top"><b>' + p[0] + '</b><span class="pc-radio">' + TICK + '</span></span><span class="pc-line">' + p[1] + '</span><span class="pc-pts">' + p[2].map(function (t) { return '<span>' + TICK + t + '</span>'; }).join('') + '</span><div class="pc-more"><div>' + p[3].map(function (m) { return '<p><b>' + m[0] + '</b>' + m[1] + '</p>'; }).join('') + '</div></div><button type="button" class="pc-rm" data-rmore="' + p[0] + '" aria-expanded="' + op + '">' + (op ? 'Show less' : 'Read more') + CHEV + '</button></div>'; }).join('') + '</div>';
      h += '<p class="pc-why"><b>Why we suggest seasonal:</b> ' + r.why + '</p>';
      h += '<div class="pc-inc"><span>Both include</span>' + PLANS.included.map(function (t) { return '<em>' + t + '</em>'; }).join('') + '</div>';
      h += '<button type="button" class="addon' + (st.haul ? ' on' : '') + '" data-haul="1"><span class="sw"><i></i></span><span><b>Add snow hauling</b><small>Optional. For sites with nowhere to stack.</small></span></button>';
    }
    if (st.i === 4) {
      var F = function (k, id, lab, ph, type, ac, err) { return '<div class="fld' + (err ? ' err' : '') + '"><label for="' + id + '">' + lab + '</label><input id="' + id + '" data-f="' + k + '" type="' + type + '" autocomplete="' + ac + '" placeholder="' + ph + '" value="' + esc(st.f[k]) + '"/></div>'; };
      h += '<div class="fields">' + F('name', 'qName', 'Your name', 'Jane Smith', 'text', 'name', st.err.name) + F('co', 'qCo', 'Company', 'Company name', 'text', 'organization') + F('email', 'qEmail', 'Work email', 'jane@company.com', 'email', 'email', st.err.email) + F('phone', 'qPhone', 'Phone', '(212) 555-0123', 'tel', 'tel', st.err.phone);
      h += '<div class="fld full"><label>Site ' + (st.addrs.length > 1 ? 'addresses' : 'address') + '</label><div class="addrs">' + st.addrs.map(function (a, k) { return '<div class="addr' + (k === 0 && st.err.addr ? ' err' : '') + (a.picked ? ' ok' : '') + '" data-k="' + k + '"><span class="addr-pin">' + (k + 1) + '</span><input data-addr="' + k + '" autocomplete="off" placeholder="' + (k ? 'Next site address' : 'Start typing the site address') + '" value="' + esc(a.label) + '"/>' + (a.picked ? '<span class="addr-ok">' + TICK + '</span>' : '') + (k ? '<button type="button" class="addr-x" data-rm="' + k + '">×</button>' : '') + '</div>'; }).join('') + '</div><button type="button" class="addr-add" data-add="1">+ Add another location</button></div>';
      h += '<div class="fld full"><label for="qNotes">Anything we should know? (optional)</label><textarea id="qNotes" data-f="notes" rows="2" placeholder="e.g. loading bay at the back, opens at 6 AM">' + esc(st.f.notes) + '</textarea></div></div>';
    }
    h += '</div><div class="f-nav' + (st.i === 0 ? ' f-nav-0' : '') + '"><button type="button" class="f-back' + (st.i > 0 ? ' show' : '') + '" data-back="1">← Back</button>' + (st.i > 0 ? '<button type="button" class="btn btn-ice" data-next="1">' + (st.i === 4 ? 'Get my quote' : 'Continue') + ' <span class="arr">→</span></button>' : '') + '</div>';
    var stepChanged = host.getAttribute('data-step') !== String(st.i);
    host.innerHTML = h; host.setAttribute('data-step', st.i);
    if (hero && stepChanged && host.parentElement && host.parentElement.scrollTop) host.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function shake() { var f = host.querySelector('.fs'); if (f && f.animate) f.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
  function next() {
    if (st.i === 0 && !st.type || st.i === 1 && !st.locs || st.i === 2 && !st.where.length) return shake();
    if (st.i === 4) {
      st.err = { name: st.f.name.trim().length < 2, email: !/.+@.+\..+/.test(st.f.email.trim()), phone: st.f.phone.replace(/\D/g, '').length < 7, addr: st.addrs[0].label.trim().length < 5 };
      if (st.err.name || st.err.email || st.err.phone || st.err.addr) { render(); return shake(); }
      st.done = true; render(); return;
    }
    st.i++; render();
  }
  function auto() { setTimeout(function () { st.i++; render(); }, 260); }
  host.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-rmore]');
    if (rm) { var k0 = rm.dataset.rmore, card = rm.closest('.pcard'), o = !more[k0]; more[k0] = o; card.classList.toggle('open', o); rm.setAttribute('aria-expanded', o); rm.firstChild.textContent = o ? 'Show less' : 'Read more'; return; }
    var pc = e.target.closest('.pcard');
    if (pc) { var k1 = pc.dataset.plan; st.plan = k1; host.querySelectorAll('.pcard').forEach(function (c) { var on = c === pc; c.classList.toggle('on', on); c.setAttribute('aria-checked', on); }); if (!more[k1]) { more[k1] = true; pc.classList.add('open'); var bb = pc.querySelector('.pc-rm'); bb.setAttribute('aria-expanded', true); bb.firstChild.textContent = 'Show less'; } return; }
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.type) { st.type = b.dataset.type; render(); auto(); }
    else if (b.dataset.locs) { st.locs = b.dataset.locs; render(); auto(); }
    else if (b.dataset.where) { var w = b.dataset.where, k = st.where.indexOf(w); if (k > -1) st.where.splice(k, 1); else st.where.push(w); render(); }
    else if (b.dataset.haul) { st.haul = !st.haul; render(); }
    else if (b.dataset.add) { st.addrs.push({ label: '', picked: false }); render(); var ins = host.querySelectorAll('[data-addr]'); ins[ins.length - 1].focus(); }
    else if (b.dataset.rm) { st.addrs.splice(+b.dataset.rm, 1); render(); }
    else if (b.dataset.back) { st.i = Math.max(0, st.i - 1); render(); }
    else if (b.dataset.next) next();
  });
  /* address search (Photon / OpenStreetMap) */
  var COUNTY = { 'Kings County': 'Brooklyn', 'New York County': 'Manhattan', 'Queens County': 'Queens', 'Bronx County': 'The Bronx', 'Richmond County': 'Staten Island' };
  function toAddr(f) {
    var p = f.properties || {}, c = (f.geometry && f.geometry.coordinates) || [];
    var street = [p.housenumber, p.street || (p.housenumber ? '' : p.name)].filter(Boolean).join(' ');
    var borough = COUNTY[p.county] || p.district || p.city || '';
    var stt = p.state === 'New York' ? 'NY' : p.state === 'New Jersey' ? 'NJ' : p.state;
    return { label: [street || p.name, borough, [stt, p.postcode].filter(Boolean).join(' ')].filter(Boolean).join(', '), street: street || p.name || '', borough: borough, zip: p.postcode || '', lat: c[1], lon: c[0], picked: true };
  }
  var tmr, dd = null, list = [], hi = 0, activeK = -1;
  function closeDd() { if (dd) { dd.remove(); dd = null; } }
  function pick(a) { st.addrs[activeK] = a; closeDd(); render(); }
  function showDd(box) {
    closeDd(); if (!list.length) return;
    dd = document.createElement('div'); dd.className = 'addr-dd';
    dd.innerHTML = list.map(function (a, k) { return '<button type="button" class="' + (k === hi ? 'on' : '') + '" data-pick="' + k + '"><svg ' + SVGP + '><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><span><b>' + esc(a.street) + '</b><small>' + esc([a.borough, a.zip].filter(Boolean).join(' · ')) + '</small></span></button>'; }).join('');
    dd.addEventListener('mousedown', function (e) { var b = e.target.closest('[data-pick]'); if (b) { e.preventDefault(); pick(list[+b.dataset.pick]); } });
    box.appendChild(dd);
  }
  host.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset.f) { st.f[t.dataset.f] = t.value; return; }
    if (t.dataset.addr == null) return;
    var k = +t.dataset.addr, v = t.value, box = t.parentNode; activeK = k;
    st.addrs[k] = { label: v, picked: false };
    box.classList.remove('ok'); var okEl = box.querySelector('.addr-ok'); if (okEl) okEl.remove();
    clearTimeout(tmr); if (v.trim().length < 3) { closeDd(); return; }
    tmr = setTimeout(function () {
      fetch('https://photon.komoot.io/api/?limit=6&lang=en&lat=40.73&lon=-73.95&bbox=-75.6,39.6,-72.6,41.4&q=' + encodeURIComponent(v)).then(function (r) { return r.json(); }).then(function (j) {
        list = (j.features || []).filter(function (f) { return f.properties && f.properties.countrycode === 'US'; }).map(toAddr).filter(function (a) { return a.street; });
        hi = 0; if (document.activeElement === t) showDd(box);
      }).catch(function () {});
    }, 220);
  });
  host.addEventListener('keydown', function (e) {
    if (!dd || e.target.dataset.addr == null) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); hi = (hi + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length; showDd(e.target.parentNode); }
    if (e.key === 'Enter') { e.preventDefault(); pick(list[hi]); }
  });
  host.addEventListener('keydown', function (e) { var pc = e.target.closest && e.target.closest('.pcard'); if (pc && e.target === pc && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pc.click(); } });
  host.addEventListener('focusout', function (e) { if (e.target.dataset.addr != null) setTimeout(closeDd, 160); });
  /* prefill from the pricing section (bottom form only) */
  if (!hero) window.addEventListener('novus:prefill', function (e) {
    var d = e.detail || {};
    if (d.plan) st.plan = d.plan;
    st.done = false; render();
  });
  render();
  }
})();
