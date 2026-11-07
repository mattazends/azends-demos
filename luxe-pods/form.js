/* Luxe Pods: copies form submissions on this page into the Luxe Pods lead board.
   Drop-in for the Webflow site (Page settings > Custom code > Before </body>):
   <script src="https://azends-demos.vercel.app/luxe-pods/form.js" data-source="luxepods.ie" defer></script>
   The form keeps working exactly as before; the board just gets a copy. */
(function () {
  var ENDPOINT = 'https://azends-demos.vercel.app/api/luxe-pods';
  var me = document.currentScript || document.querySelector('script[src*="luxe-pods/form.js"]');
  var SOURCE = (me && me.getAttribute('data-source')) || location.hostname;
  var ONLY = me && me.getAttribute('data-form'); // optional CSS selector to limit to one form

  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

  function labelFor(el, form) {
    var t = '';
    if (el.id) { var l = form.querySelector('label[for="' + el.id + '"]'); if (l) t = l.textContent; }
    if (!t && el.closest('label')) t = el.closest('label').textContent;
    if (!t) { var prev = el.previousElementSibling; if (prev && prev.tagName === 'LABEL') t = prev.textContent; }
    return t;
  }

  function keyFor(el, form) {
    var h = norm([el.name, el.id, el.placeholder, labelFor(el, form), el.getAttribute('data-name')].join(' '));
    var type = (el.type || '').toLowerCase();
    if (type === 'email' || /\bemail\b|e mail/.test(h)) return 'email';
    if (type === 'tel' || /phone|mobile|tel\b|number$/.test(h) && !/size|m2|sqm/.test(h)) return 'phone';
    if (/full name|first name|^name|\bname\b/.test(h) && !/company|business/.test(h)) return 'name';
    if (/address|location|eircode|postcode|county/.test(h)) return 'address';
    if (/intended use|use\b|purpose|pod type|type of pod/.test(h)) return 'use';
    if (/size|m2|sqm|square|dimension/.test(h)) return 'size';
    if (/bathroom|toilet|shower/.test(h)) return 'bathroom';
    if (/when|timeline|timeframe|start/.test(h)) return 'when';
    if (/budget|price range/.test(h)) return 'budget';
    if (type === 'textarea' || el.tagName === 'TEXTAREA' || /message|details|comments|notes|tell us|anything else/.test(h)) return 'message';
    return norm(el.name || el.id || labelFor(el, form) || 'field').replace(/ /g, '_');
  }

  function collect(form) {
    var fields = {}, seen = {};
    var els = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], type = (el.type || '').toLowerCase();
      if (!el.name && !el.id) continue;
      if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'password' || type === 'file') continue;
      if ((type === 'radio' || type === 'checkbox') && !el.checked) continue;
      var v = String(el.value || '').trim();
      if (!v) continue;
      var k = keyFor(el, form);
      if (seen[k]) { fields[k] = fields[k] + ', ' + v; } else { fields[k] = v; seen[k] = 1; }
    }
    return fields;
  }

  function attribution() {
    var a = {}, q = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(function (k) { if (q.get(k)) a[k] = q.get(k); });
    if (document.referrer) a.referrer = document.referrer.slice(0, 200);
    return a;
  }

  function send(form) {
    var fields = collect(form);
    if (!fields.name && !fields.email && !fields.phone) return;
    var body = JSON.stringify({ action: 'external', source: SOURCE, page: location.href.slice(0, 400), fields: fields, attribution: attribution() });
    try {
      fetch(ENDPOINT, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: body }).catch(function () {});
    } catch (e) {}
  }

  function wire(form) {
    if (form.__lpBoard) return;
    form.__lpBoard = true;
    form.addEventListener('submit', function () { send(form); }, true);
  }

  function init() {
    var forms = ONLY ? document.querySelectorAll(ONLY) : document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) wire(forms[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  if (window.MutationObserver) new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();
