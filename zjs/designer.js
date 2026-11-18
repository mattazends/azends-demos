// ZJS 3D project designer. Parametric house + extension generator.
import * as THREE from 'three';
import { RoomEnvironment } from './js/RoomEnvironment.js';

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const rnd = (a, b) => a + Math.random() * (b - a);

// ---------------- options ----------------
const TYPES = {
  newbuild: { n: 'New build', r: [120, 450, 240] },
  country: { n: 'Country house', r: [250, 900, 460] },
  rear: { n: 'Rear extension', r: [15, 80, 36] },
  side: { n: 'Side extension', r: [12, 60, 26] },
};
const ROOFS = { gable: 'Pitched', hip: 'Hipped', crown: 'Crown', flat: 'Flat' };
const WALLS = { brick: 'Brick', stone: 'Stone', render: 'Render', cedar: 'Cedar', larch: 'Silver larch', charred: 'Charred timber' };
const FIN = { clay: 'Clay tile', slate: 'Slate', seam: 'Standing seam', sedum: 'Sedum', membrane: 'Single-ply' };
const DOORS = { oak: 'Oak plank', panel: 'Painted panel', pivot: 'Pivot' };
const GDOORS = { bifold: 'Bifold', sliding: 'Sliding', crittall: 'Crittall' };
const FRAMES = { alu: 'Black aluminium', timber: 'Painted timber', oak: 'Oak' };

const S = {
  type: 'newbuild', area: 240, roof: 'gable', fin: 'clay', wall: 'brick', door: 'oak', gdoor: 'sliding', frame: 'alu',
  glaze: .6, pergola: true, lantern: true, chimney: true, ggable: true, mode: 'materials', time: 'day', spin: true,
};
const pitched = () => S.roof === 'gable' || S.roof === 'hip';
function fixFinish() {
  if (S.roof === 'flat') { if (!['sedum', 'membrane'].includes(S.fin)) S.fin = 'sedum'; }
  else if (!['clay', 'slate', 'seam'].includes(S.fin)) S.fin = 'clay';
}

// ---------------- textures ----------------
const TEX = {};
function canvas(n = 512) { const c = document.createElement('canvas'); c.width = c.height = n; return [c, c.getContext('2d')]; }
function paint(key) {
  if (TEX[key]) return TEX[key];
  const [c, g] = canvas(512); const N = 512;
  const hsl = (h, s, l, a = 1) => `hsla(${h},${s}%,${l}%,${a})`;
  const noise = (n, a, col) => { for (let i = 0; i < n; i++) { g.fillStyle = col ? col() : `rgba(0,0,0,${rnd(0, a)})`; g.fillRect(rnd(0, N), rnd(0, N), rnd(1, 3), rnd(1, 3)); } };
  switch (key) {
    case 'brick': {
      g.fillStyle = '#cdbfa8'; g.fillRect(0, 0, N, N);
      for (let r = 0; r < 32; r++) { const off = (r % 2) * 24; for (let x = -48; x < N + 48; x += 48) {
        g.fillStyle = hsl(rnd(8, 22), rnd(38, 55), rnd(36, 50)); g.fillRect(x + off + 1, r * 16 + 1, 46, 14);
        g.fillStyle = `rgba(255,220,190,${rnd(0, .08)})`; g.fillRect(x + off + 1, r * 16 + 1, 46, 4); } }
      noise(4000, .12); break; }
    case 'stone': {
      g.fillStyle = '#8f8574'; g.fillRect(0, 0, N, N); let y = 0;
      while (y < N) { const h = Math.round(rnd(9, 22)); let x = -rnd(0, 60);
        while (x < N) { const w = rnd(34, 120); const l = rnd(52, 72); g.fillStyle = hsl(rnd(30, 45), rnd(10, 22), l); g.fillRect(x + 1, y + 1, w - 2, h - 2); x += w; } y += h; }
      noise(5000, .14); break; }
    case 'render': g.fillStyle = '#ece6da'; g.fillRect(0, 0, N, N); noise(9000, .035); break;
    case 'cedar': case 'larch': case 'charred': {
      const base = key === 'cedar' ? [28, 45, 48] : key === 'larch' ? [38, 6, 63] : [30, 6, 13];
      for (let x = 0; x < N; x += 32) { g.fillStyle = hsl(base[0] + rnd(-4, 4), base[1] + rnd(-6, 6), base[2] + rnd(-6, 6)); g.fillRect(x, 0, 31, N);
        for (let k = 0; k < 7; k++) { g.strokeStyle = `rgba(0,0,0,${rnd(.04, .12)})`; g.beginPath(); const xx = x + rnd(3, 28); g.moveTo(xx, 0); g.bezierCurveTo(xx + rnd(-4, 4), 170, xx + rnd(-4, 4), 340, xx, N); g.stroke(); }
        g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(x + 31, 0, 1, N); }
      if (key === 'charred') noise(6000, .2, () => `rgba(255,255,255,${rnd(0, .05)})`); break; }
    case 'clay': {
      g.fillStyle = '#5a2c1e'; g.fillRect(0, 0, N, N);
      for (let r = 0; r < 24; r++) { const off = (r % 2) * 18; for (let x = -36; x < N + 36; x += 36) {
        g.fillStyle = hsl(rnd(10, 20), rnd(45, 60), rnd(30, 44)); g.fillRect(x + off + 1, r * 21.33, 34, 20);
        g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(x + off + 1, r * 21.33 + 17, 34, 3); } }
      noise(3000, .15); break; }
    case 'slate': {
      g.fillStyle = '#25282c'; g.fillRect(0, 0, N, N);
      for (let r = 0; r < 22; r++) { const off = (r % 2) * 21; for (let x = -42; x < N + 42; x += 42) {
        const l = rnd(22, 32); g.fillStyle = hsl(215, rnd(6, 12), l); g.fillRect(x + off + 1, r * 23.3, 40, 22);
        g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(x + off + 1, r * 23.3 + 20, 40, 2); } } break; }
    case 'seam': g.fillStyle = '#4a4f54'; g.fillRect(0, 0, N, N); for (let x = 0; x < N; x += 102) { g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(x, 0, 3, N); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x + 3, 0, 3, N); } noise(2000, .05); break;
    case 'sedum': g.fillStyle = '#6d7a45'; g.fillRect(0, 0, N, N);
      for (let i = 0; i < 16000; i++) { const v = Math.random(); g.fillStyle = v < .55 ? hsl(rnd(70, 95), rnd(28, 45), rnd(28, 42)) : v < .82 ? hsl(rnd(10, 25), rnd(35, 55), rnd(35, 48)) : hsl(rnd(40, 52), rnd(40, 60), rnd(50, 60)); g.beginPath(); g.arc(rnd(0, N), rnd(0, N), rnd(1, 3.2), 0, 7); g.fill(); } break;
    case 'membrane': g.fillStyle = '#5b5f62'; g.fillRect(0, 0, N, N); noise(5000, .06); break;
    case 'grass': g.fillStyle = '#6b7a46'; g.fillRect(0, 0, N, N);
      for (let i = 0; i < 26000; i++) { g.strokeStyle = hsl(rnd(68, 95), rnd(25, 45), rnd(26, 46), .6); g.beginPath(); const x = rnd(0, N), y = rnd(0, N); g.moveTo(x, y); g.lineTo(x + rnd(-1.5, 1.5), y - rnd(2, 6)); g.stroke(); } break;
    case 'gravel': g.fillStyle = '#b8a98d'; g.fillRect(0, 0, N, N); noise(22000, 0, () => hsl(rnd(30, 45), rnd(10, 25), rnd(45, 80), .8)); break;
    case 'paving': g.fillStyle = '#b9b3a7'; g.fillRect(0, 0, N, N);
      for (let y = 0; y < N; y += 128) for (let x = 0; x < N; x += 192) { g.fillStyle = hsl(40, 6, rnd(66, 74)); g.fillRect(x + 2, y + 2, 188, 124); } noise(4000, .05); break;
    case 'oak': g.fillStyle = '#b4874f'; g.fillRect(0, 0, N, N);
      for (let k = 0; k < 90; k++) { g.strokeStyle = `rgba(80,45,15,${rnd(.05, .18)})`; g.lineWidth = rnd(.5, 2); g.beginPath(); const y = rnd(0, N); g.moveTo(0, y); g.bezierCurveTo(170, y + rnd(-10, 10), 340, y + rnd(-10, 10), N, y); g.stroke(); } break;
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  TEX[key] = t; return t;
}
export function swatchURL(key) { paint(key); return TEX[key].image.toDataURL('image/jpeg', .7); }

// ---------------- materials ----------------
const MC = {};
const std = (o) => new THREE.MeshStandardMaterial(o);
function mat(key) {
  const id = S.mode + ':' + key; if (MC[id]) return MC[id];
  let m;
  if (S.mode === 'card') {
    if (key === 'glass') m = std({ color: 0xc9cdcb, roughness: .35 });
    else if (key === 'ground') m = std({ color: 0xe6e1d5, roughness: 1 });
    else if (key === 'paving' || key === 'gravel') m = std({ color: 0xdcd6c9, roughness: 1 });
    else if (/leaf|hedge/.test(key)) m = std({ color: 0xeeebe3, roughness: 1 });
    else m = std({ color: key === 'existing' || key === 'existingRoof' ? 0xe2ddd2 : 0xf6f3ec, roughness: .92, side: THREE.DoubleSide });
  } else {
    const T = k => paint(k);
    switch (key) {
      case 'existing': m = std({ map: T('render'), color: 0xf0ece4, roughness: .95 }); break;
      case 'existingRoof': m = std({ map: T('slate'), roughness: .8, side: THREE.DoubleSide }); break;
      case 'ground': m = std({ map: T('grass'), color: 0xb9c0a4, roughness: 1 }); break;
      case 'gravel': case 'paving': m = std({ map: T(key), roughness: .95 }); break;
      case 'glass': m = new THREE.MeshPhysicalMaterial({ color: 0x8ea1a6, roughness: .06, metalness: .05, clearcoat: 1, clearcoatRoughness: .05, envMapIntensity: 1.4 }); break;
      case 'alu': m = std({ color: 0x232527, roughness: .45, metalness: .5 }); break;
      case 'timber': m = std({ color: 0xf1ede3, roughness: .6 }); break;
      case 'oak': m = std({ map: T('oak'), roughness: .7 }); break;
      case 'fascia': m = std({ color: 0x2b2d2e, roughness: .5, metalness: .4 }); break;
      case 'soffit': m = std({ color: 0xe9e3d6, roughness: .8 }); break;
      case 'sill': m = std({ color: 0xd8d0bf, roughness: .8 }); break;
      case 'plinth': m = std({ color: 0x4f4a44, roughness: .9 }); break;
      case 'sage': m = std({ color: 0x5c6b55, roughness: .55 }); break;
      case 'bronze': m = std({ color: 0x3a342d, roughness: .4, metalness: .6 }); break;
      case 'brass': m = std({ color: 0xc9a25b, roughness: .3, metalness: 1 }); break;
      case 'trunk': m = std({ color: 0x5a4a39, roughness: 1 }); break;
      case 'hedge': m = std({ color: 0x34472b, roughness: 1 }); break;
      case 'leaf1': m = std({ color: 0x5b6e3c, roughness: 1 }); break;
      case 'leaf2': m = std({ color: 0x4c6136, roughness: 1 }); break;
      case 'leaf3': m = std({ color: 0x6d7d44, roughness: 1 }); break;
      case 'pot': m = std({ color: 0x9c6b4c, roughness: 1 }); break;
      default:
        if (key.startsWith('wall:')) { const k = key.slice(5); m = std({ map: T(k), roughness: .92 }); }
        else if (key.startsWith('roof:')) { const k = key.slice(5); m = std({ map: T(k), roughness: k === 'seam' ? .45 : .85, metalness: k === 'seam' ? .45 : 0, side: THREE.DoubleSide }); }
        else m = std({ color: 0xff00ff });
    }
  }
  MC[id] = m; return m;
}
const wallM = () => mat('wall:' + S.wall);
const roofM = () => mat('roof:' + S.fin);
const frameM = () => mat(S.frame);

// ---------------- geometry helpers ----------------
let G; // current build group
function worldUV(geo, w, h, d, tile = 2.4) {
  const uv = geo.attributes.uv; const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) { const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] / tile, uv.getY(i) * dims[f][1] / tile); }
  uv.needsUpdate = true;
}
function box(w, h, d, m, x, y, z, parent = G, o = {}) {
  const g = new THREE.BoxGeometry(w, h, d); worldUV(g, w, h, d, o.tile || 2.4);
  const me = new THREE.Mesh(g, m); me.position.set(x, y + h / 2, z); me.castShadow = o.cs !== false; me.receiveShadow = true; parent.add(me); return me;
}
// planar polygon (3 or 4 pts), outward-facing relative to `inside` point, world-scale UVs
function poly(pts, m, inside, parent = G, tile = 2.4) {
  let p = pts.slice(); const n = new THREE.Vector3().subVectors(p[1], p[0]).cross(new THREE.Vector3().subVectors(p[2], p[0])).normalize();
  const c = p.reduce((a, b) => a.clone().add(b)).multiplyScalar(1 / p.length);
  if (n.dot(c.clone().sub(inside)) < 0) { p.reverse(); n.negate(); }
  const u = new THREE.Vector3().subVectors(p[1], p[0]).normalize(); const v = new THREE.Vector3().crossVectors(n, u);
  const tri = p.length === 4 ? [0, 1, 2, 0, 2, 3] : [0, 1, 2];
  const pos = [], uvs = [];
  tri.forEach(i => { pos.push(p[i].x, p[i].y, p[i].z); const q = p[i].clone().sub(p[0]); uvs.push(q.dot(u) / tile, q.dot(v) / tile); });
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); g.computeVertexNormals();
  const me = new THREE.Mesh(g, m); me.castShadow = true; me.receiveShadow = true; parent.add(me); return me;
}

// a building body: walls + plinth. returns descriptor for openings & roofs
function body(w, d, h, x, z, m = wallM()) {
  box(w, h, d, m, x, 0, z);
  box(w + .04, .28, d + .04, mat('plinth'), x, 0, z, G, { cs: false });
  return { w, d, h, x, z };
}

// ---------------- roofs (local group, ridge along local x) ----------------
const OH = .38;
function roofGroup(b, alongX) {
  const g = new THREE.Group(); g.position.set(b.x, b.h, b.z); if (!alongX) g.rotation.y = Math.PI / 2; G.add(g);
  const L = alongX ? b.w : b.d, Sp = alongX ? b.d : b.w; return { g, L, Sp };
}
function soffitAndFascia(g, W, Dd, y0) {
  box(W, .06, Dd, mat('soffit'), 0, y0 - .06, 0, g, { cs: false });
  const fm = mat('fascia');
  box(W, .2, .05, fm, 0, y0 - .2, Dd / 2, g); box(W, .2, .05, fm, 0, y0 - .2, -Dd / 2, g);
  box(.05, .2, Dd, fm, W / 2, y0 - .2, 0, g); box(.05, .2, Dd, fm, -W / 2, y0 - .2, 0, g);
}
function hipRoof(b, pitch, t, rm, topM, opts = {}) {
  const alongX = b.w >= b.d; const { g, L, Sp } = roofGroup(b, alongX);
  const W = L + 2 * OH, Dd = Sp + 2 * OH, tp = Math.tan(pitch), y0 = -OH * tp, rise = tp * Dd / 2, yt = y0 + t * rise;
  const hx = Math.max(.02, W / 2 - t * Dd / 2), hz = Math.max(0, Dd / 2 - t * Dd / 2);
  const A = V(-W / 2, y0, Dd / 2), B = V(W / 2, y0, Dd / 2), C = V(W / 2, y0, -Dd / 2), D = V(-W / 2, y0, -Dd / 2);
  const a = V(-hx, yt, hz), bb = V(hx, yt, hz), c = V(hx, yt, -hz), d = V(-hx, yt, -hz);
  const inside = V(0, y0 - 1, 0);
  if (hz > .01) { poly([A, B, bb, a], rm, inside, g); poly([C, D, d, c], rm, inside, g); poly([B, C, c, bb], rm, inside, g); poly([D, A, a, d], rm, inside, g); }
  else { poly([A, B, bb, a], rm, inside, g); poly([C, D, a, bb], rm, inside, g); poly([B, C, bb], rm, inside, g); poly([D, A, a], rm, inside, g); }
  soffitAndFascia(g, W, Dd, y0);
  if (hz > .01) { // crown: flat top with upstand
    box(hx * 2, .06, hz * 2, topM, 0, yt - .02, 0, g); const fm = mat('fascia');
    box(hx * 2 + .06, .1, .06, fm, 0, yt - .02, hz, g); box(hx * 2 + .06, .1, .06, fm, 0, yt - .02, -hz, g);
    box(.06, .1, hz * 2, fm, hx, yt - .02, 0, g); box(.06, .1, hz * 2, fm, -hx, yt - .02, 0, g);
    if (opts.lantern) lantern(g, Math.min(hx * 2 * .55, 4), Math.min(hz * 2 * .6, 2.4), yt + .04);
  }
  else { box(Math.max(.05, hx * 2), .1, .14, rm, 0, yt - .05, 0, g); }
  return b.h + yt;
}
function gableRoof(b, pitch, rm, opts = {}) {
  const alongX = opts.alongX ?? (b.w >= b.d); const { g, L, Sp } = roofGroup(b, alongX);
  const tp = Math.tan(pitch), rise = tp * Sp / 2, oG = .28, yE = -OH * tp, zE = Sp / 2 + OH;
  const inside = V(0, -1, 0);
  for (const s of [1, -1]) poly([V(-L / 2 - oG, yE, s * zE), V(L / 2 + oG, yE, s * zE), V(L / 2 + oG, rise, 0), V(-L / 2 - oG, rise, 0)], rm, inside, g);
  // underside of slopes (so it reads solid from below)
  for (const s of [1, -1]) { const m2 = poly([V(-L / 2 - oG, yE - .12, s * zE), V(L / 2 + oG, yE - .12, s * zE), V(L / 2 + oG, rise - .12, 0), V(-L / 2 - oG, rise - .12, 0)], mat('soffit'), V(0, rise + 5, 0), g); m2.castShadow = false; }
  // gable ends
  const wm = opts.wallMat || wallM();
  for (const s of [1, -1]) {
    const glazed = opts.glazedGable && s === 1;
    const tri = [V(s * L / 2, 0, Sp / 2), V(s * L / 2, 0, -Sp / 2), V(s * L / 2, rise, 0)];
    if (glazed) {
      poly(tri.map(p => p.clone().add(V(s * .01, 0, 0))), mat('glass'), V(0, rise / 2, 0), g).userData.glass = true;
      const om = mat('oak'), ft = .12; // oak frame
      const edge = (p, q) => { const len = p.distanceTo(q), mid = p.clone().add(q).multiplyScalar(.5); const m = new THREE.Mesh(new THREE.BoxGeometry(ft, ft, len), om); m.position.copy(mid).add(V(s * .05, 0, 0)); m.lookAt(q.clone().add(V(s * .05, 0, 0))); m.castShadow = true; g.add(m); };
      edge(tri[0], tri[2]); edge(tri[1], tri[2]); edge(tri[0], tri[1]); edge(V(s * L / 2, 0, 0), tri[2]);
      edge(V(s * L / 2, rise * .45, Sp / 2 * .55), V(s * L / 2, rise * .45, -Sp / 2 * .55));
    } else poly(tri, wm, V(0, rise / 3, 0), g);
  }
  // eave fascia + ridge
  const fm = mat('fascia');
  for (const s of [1, -1]) box(L + 2 * oG, .18, .05, fm, 0, yE - .18, s * zE, g);
  box(L + 2 * oG, .12, .2, rm, 0, rise - .06, 0, g);
  // bargeboards
  for (const sx of [1, -1]) for (const s of [1, -1]) {
    const p = V(sx * (L / 2 + oG), yE, s * zE), q = V(sx * (L / 2 + oG), rise, 0); const len = p.distanceTo(q);
    const m = new THREE.Mesh(new THREE.BoxGeometry(.05, .2, len), fm); m.position.copy(p.clone().add(q).multiplyScalar(.5)).add(V(0, -.08, 0)); m.lookAt(q.clone().add(V(0, -.08, 0))); m.castShadow = true; g.add(m);
  }
  return b.h + rise;
}
function flatRoof(b, finKey, opts = {}) {
  const W = b.w + .3, Dd = b.d + .3, fm = mat('fascia'), top = mat('roof:' + finKey);
  const g = new THREE.BoxGeometry(W, .34, Dd); worldUV(g, W, .34, Dd);
  const me = new THREE.Mesh(g, [fm, fm, top, mat('soffit'), fm, fm]); me.position.set(b.x, b.h + .17, b.z); me.castShadow = me.receiveShadow = true; G.add(me);
  if (opts.lantern) { const lg = new THREE.Group(); lg.position.set(b.x + (opts.lx || 0), b.h, b.z + (opts.lz || 0)); G.add(lg); lantern(lg, Math.min(b.w * .45, 4.2), Math.min(b.d * .4, 2.4), .34); }
  return b.h + .34;
}
function lantern(g, lw, ld, y) {
  if (lw < 1 || ld < .8) return;
  box(lw + .2, .22, ld + .2, mat('fascia'), 0, y, 0, g);
  const yb = y + .22, h = Math.min(lw, ld) * .32, gm = mat('glass');
  const A = V(-lw / 2, yb, ld / 2), B = V(lw / 2, yb, ld / 2), C = V(lw / 2, yb, -ld / 2), D = V(-lw / 2, yb, -ld / 2);
  const rx = Math.max(.05, lw / 2 - ld / 2 * .9); const a = V(-rx, yb + h, 0), b = V(rx, yb + h, 0);
  const inside = V(0, yb - 1, 0);
  [[A, B, b, a], [C, D, a, b], [B, C, b], [D, A, a]].forEach(p => { poly(p, gm, inside, g).userData.glass = true; });
  const fm = mat('fascia'); const bar = (p, q) => { const m = new THREE.Mesh(new THREE.BoxGeometry(.05, .05, p.distanceTo(q)), fm); m.position.copy(p.clone().add(q).multiplyScalar(.5)); m.lookAt(q); g.add(m); };
  bar(a, b); bar(A, a); bar(B, b); bar(C, b); bar(D, a);
  const n = Math.max(2, Math.round(lw / .7)); for (let i = 1; i < n; i++) { const x = -lw / 2 + lw * i / n; const top = Math.min(Math.abs(x), rx) * Math.sign(x); bar(V(x, yb, ld / 2), V(Math.abs(x) <= rx ? x : top, yb + h, 0)); bar(V(x, yb, -ld / 2), V(Math.abs(x) <= rx ? x : top, yb + h, 0)); }
}
function roofFor(b, opts = {}) {
  const r = opts.roof || S.roof; const rm = opts.roofMat || roofM();
  if (r === 'flat') return flatRoof(b, opts.fin || S.fin, { lantern: opts.lantern, lx: opts.lx, lz: opts.lz });
  if (r === 'gable') return gableRoof(b, opts.pitch || .72, rm, opts);
  if (r === 'hip') return hipRoof(b, opts.pitch || .68, 1, rm, null);
  return hipRoof(b, opts.pitch || .62, .55, rm, mat('roof:membrane'), { lantern: opts.lantern });
}

// ---------------- openings ----------------
function faceInfo(b, f) {
  if (f === 'f') return { o: V(b.x, 0, b.z + b.d / 2), t: V(1, 0, 0), n: V(0, 0, 1), len: b.w };
  if (f === 'b') return { o: V(b.x, 0, b.z - b.d / 2), t: V(-1, 0, 0), n: V(0, 0, -1), len: b.w };
  if (f === 'r') return { o: V(b.x + b.w / 2, 0, b.z), t: V(0, 0, -1), n: V(1, 0, 0), len: b.d };
  return { o: V(b.x - b.w / 2, 0, b.z), t: V(0, 0, 1), n: V(-1, 0, 0), len: b.d };
}
function at(b, f, u, y) { const fi = faceInfo(b, f); const g = new THREE.Group(); g.position.copy(fi.o.clone().add(fi.t.clone().multiplyScalar(u))).setY(y); g.rotation.y = Math.atan2(fi.n.x, fi.n.z); G.add(g); return g; }
function glassPane(g, w, h, x = 0, y = 0, z = .012) { const m = box(w, h, .02, mat('glass'), x, y, z, g, { cs: false }); m.userData.glass = true; return m; }
function frameRect(g, w, h, ft, fm, x = 0, y = 0, dz = .07) {
  box(w, ft, dz, fm, x, y, dz / 2, g); box(w, ft, dz, fm, x, y + h - ft, dz / 2, g);
  box(ft, h, dz, fm, x - w / 2 + ft / 2, y, dz / 2, g); box(ft, h, dz, fm, x + w / 2 - ft / 2, y, dz / 2, g);
}
function windowAt(b, f, u, y, w, h, opts = {}) {
  const g = at(b, f, u, y); const style = opts.style || S.frame; const fm = mat(style), ft = style === 'alu' ? .055 : style === 'timber' ? .08 : .11;
  box(w + .02, h + .02, .03, mat('plinth'), 0, -.01, -.01, g, { cs: false });
  glassPane(g, w - .02, h - .02, 0, .01);
  frameRect(g, w, h, ft, fm);
  const n = Math.max(1, Math.round(w / (style === 'timber' ? .7 : 1.15)));
  for (let i = 1; i < n; i++) box(ft * .8, h, .06, fm, -w / 2 + w * i / n, 0, .03, g);
  if (style === 'timber' && h > 1) box(w, ft * .7, .06, fm, 0, h * .62, .03, g);
  if (!opts.nosill) box(w + .14, .05, .14, mat('sill'), 0, -.05, .07, g);
  return g;
}
function frontDoor(b, f, u) {
  const t = S.door;
  if (t === 'oak') {
    const g = at(b, f, u, 0); const w = 1.05, h = 2.3;
    box(w + .2, h + .1, .03, mat('plinth'), 0, 0, -.01, g, { cs: false });
    box(w, h, .06, mat('oak'), 0, 0, .03, g);
    for (let i = 1; i < 6; i++) box(.012, h - .1, .07, mat('trunk'), -w / 2 + w * i / 6, .05, .035, g, { cs: false });
    glassPane(g, .12, 1.5, w / 2 - .22, .45, .065);
    box(.03, .7, .04, mat('alu'), -w / 2 + .14, .8, .1, g);
    frameRect(g, w + .2, h + .1, .1, mat('oak'), 0, 0, .1);
    porch(g, 'oak');
  } else if (t === 'panel') {
    const g = at(b, f, u, 0); const w = 1.0, h = 2.15;
    box(w + .2, h + .5, .03, mat('plinth'), 0, 0, -.01, g, { cs: false });
    box(w, h, .06, mat('sage'), 0, 0, .03, g);
    for (const yy of [.2, 1.2]) for (const xx of [-.22, .22]) box(.34, .78, .03, mat('sage'), xx, yy, .07, g);
    glassPane(g, w, .32, 0, h + .06, .03); box(.06, .06, .05, mat('brass'), w / 2 - .14, 1.05, .1, g);
    frameRect(g, w + .2, h + .5, .09, mat('timber'), 0, 0, .1);
    box(w + .9, .16, .5, mat('sill'), 0, 0, .25, g);
    porch(g, 'canopy', 2.95);
  } else {
    const g = at(b, f, u, 0); const w = 1.4, h = 2.6;
    box(w + .9, h + .1, .03, mat('plinth'), .3, 0, -.01, g, { cs: false });
    box(w, h, .07, mat('bronze'), -.25, 0, .035, g);
    box(.05, 1.9, .05, mat('brass'), -.25 + w / 2 - .18, .35, .11, g);
    glassPane(g, .62, h, .25 + w / 2 - .05 + .02, 0, .02);
    frameRect(g, w + .9, h + .1, .06, mat('alu'), .3, 0, .09);
    box(3.2, .2, 1.5, mat('fascia'), .3, h + .15, .75, g);
  }
}
function porch(g, kind, hTop = 2.75) {
  if (kind === 'oak') {
    const om = mat('oak'), px = 1.05, pz = 1.35;
    for (const s of [1, -1]) { box(.18, hTop, .18, om, s * px, 0, pz, g); box(.12, .12, pz, om, s * px, hTop - .12, pz / 2, g); }
    box(2 * px + .18, .16, .16, om, 0, hTop - .16, pz, g);
    const sub = { w: 2 * px + .2, d: pz + .1, h: hTop, x: 0, z: pz / 2 };
    const G0 = G; G = g; const rm = S.roof === 'flat' ? mat('roof:clay') : roofM();
    gableRoof(sub, .8, rm, { alongX: false, wallMat: mat('oak') }); G = G0;
  } else box(1.8, .14, .7, mat('fascia'), 0, hTop, .35, g);
}
function gardenDoors(b, f, u, w, h) {
  const g = at(b, f, u, 0); const t = S.gdoor, fm = mat(S.frame === 'oak' ? 'oak' : 'alu');
  box(w + .06, h + .06, .03, mat('plinth'), 0, 0, -.01, g, { cs: false });
  box(w + .1, .05, .25, fm, 0, 0, .1, g);
  if (t === 'bifold') { const n = Math.max(3, Math.round(w / .95)); const pw = w / n;
    for (let i = 0; i < n; i++) { const x = -w / 2 + pw * (i + .5); glassPane(g, pw - .06, h - .1, x, .05); frameRect(g, pw, h, .06, fm, x, 0, .07); } }
  else if (t === 'sliding') { const n = Math.max(2, Math.round(w / 2.4)); const pw = w / n;
    for (let i = 0; i < n; i++) { const x = -w / 2 + pw * (i + .5), dz = i % 2 ? .07 : 0; glassPane(g, pw - .04, h - .06, x, .03, .012 + dz); frameRect(g, pw, h, .045, fm, x, 0, .06 + dz); } }
  else { const n = Math.max(2, Math.round(w / .9)); const pw = w / n; const cm = mat('alu');
    for (let i = 0; i < n; i++) { const x = -w / 2 + pw * (i + .5); glassPane(g, pw - .04, h - .04, x, .02); frameRect(g, pw, h, .05, cm, x, 0, .06);
      box(.025, h, .05, cm, x, 0, .03, g); for (let k = 1; k < 4; k++) box(pw, .025, .05, cm, x, h * k / 4, .03, g); } }
  return g;
}
function windowsRow(b, f, n, w, h, y, skip = null) {
  const fi = faceInfo(b, f); const len = fi.len;
  for (let i = 0; i < n; i++) { const u = -len / 2 + len * (i + .5) / n; if (skip && Math.abs(u - skip[0]) < skip[1]) continue; windowAt(b, f, u, y, Math.min(w, len / n - .5), h); }
}

// ---------------- landscape ----------------
function tree(x, z, s) {
  const tm = mat('trunk'); const tr = new THREE.Mesh(new THREE.CylinderGeometry(.16 * s, .26 * s, 3 * s, 8), tm); tr.position.set(x, 1.5 * s, z); tr.castShadow = true; G.add(tr);
  const n = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) { const r = rnd(1.4, 2.2) * s; const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 2), mat('leaf' + (1 + i % 3)));
    m.position.set(x + rnd(-1.2, 1.2) * s, (3.4 + rnd(-.3, 1.4)) * s, z + rnd(-1.2, 1.2) * s); m.scale.y = rnd(.85, 1.05); m.castShadow = true; m.receiveShadow = true; G.add(m); }
}
function hedge(x, z, w, d, h = .9) { const m = box(w, h, d, mat('hedge'), x, 0, z); m.geometry.dispose(); m.geometry = new THREE.BoxGeometry(w, h, d, 1, 1, 1); }
function pergola(x, z, w, d, h = 2.7) {
  const om = mat('oak');
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(.16, h, .16, om, x + sx * (w / 2 - .08), 0, z + sz * (d / 2 - .08));
  for (const sz of [-1, 1]) box(w + .3, .22, .14, om, x, h - .22, z + sz * (d / 2 - .08));
  const n = Math.max(3, Math.round(w / .45)); for (let i = 0; i <= n; i++) box(.08, .18, d + .4, om, x - w / 2 + w * i / n, h, z);
  for (let i = 0; i < 5; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(rnd(.25, .45), 1), mat('leaf' + (1 + i % 3))); m.position.set(x - w / 2 + rnd(0, w), h + .25, z + rnd(-d / 2, d / 2)); m.castShadow = true; G.add(m); }
}
function chimney(x, z, top) { box(.9, top + .9, .62, mat('wall:brick'), x, 0, z); const p = new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, .4, 12), mat('pot')); p.position.set(x, top + 1.1, z); p.castShadow = true; G.add(p); }

// ---------------- labels ----------------
let LS = 1;
function label(text, x, y, z) {
  const c = document.createElement('canvas'); c.width = 320; c.height = 88; const g = c.getContext('2d');
  g.fillStyle = 'rgba(20,33,26,.9)'; g.beginPath(); g.roundRect(6, 10, 308, 68, 34); g.fill();
  g.fillStyle = '#EFE9DC'; g.font = '500 34px Inter, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 160, 45);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false })); sp.scale.set(2.9 * LS, .8 * LS, 1); sp.position.set(x, y, z); sp.renderOrder = 10; G.add(sp);
}
function dim(a, b) {
  const m = new THREE.LineDashedMaterial({ color: S.mode === 'card' ? 0x5a5a52 : 0xffffff, dashSize: .3 * LS, gapSize: .18 * LS, depthTest: false, transparent: true, opacity: .9 });
  const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), m); l.computeLineDistances(); l.renderOrder = 9; G.add(l);
}

// ---------------- model ----------------
function calc() {
  const a = S.area; let w, d, h, st;
  if (S.type === 'newbuild') { const fp = a / 2; w = Math.sqrt(fp * 1.75); d = fp / w; h = 5.6; st = 2; }
  else if (S.type === 'country') { const main = a * .64 / 2; w = Math.sqrt(main * 1.9); d = main / w; h = 5.8; st = 2; }
  else if (S.type === 'rear') { w = Math.min(10.5, Math.max(3.6, Math.sqrt(a * 1.7))); d = a / w; h = S.roof === 'flat' ? 3.0 : 2.8; st = 1; }
  else { d = Math.min(8.5, Math.max(4, Math.sqrt(a * 2))); w = a / d; h = S.roof === 'flat' ? 3.0 : 2.8; st = 1; }
  return { w, d, h, st };
}
function existingHouse() {
  const b = body(10.5, 8.5, 5.4, 0, 0, mat('existing'));
  gableRoof(b, .72, mat('existingRoof'), { wallMat: mat('existing'), alongX: true });
  const f = S.frame; S.frame = 'timber';
  windowsRow(b, 'f', 3, 1.2, 1.35, 3.2); windowAt(b, 'f', -3.2, .9, 1.4, 1.35); windowAt(b, 'f', 3.2, .9, 1.4, 1.35);
  const g = at(b, 'f', 0, 0); box(1, 2.1, .06, mat('sage'), 0, 0, .03, g); frameRect(g, 1.2, 2.2, .08, mat('timber'), 0, 0, .09);
  windowsRow(b, 'b', 3, 1.1, 1.3, 3.2);
  S.frame = f; return b;
}

let renderer, scene, camera, envRT, sun, hemi, ground, sky;
let theta = .7, phi = 1.12, dist = 40, cd = 40, tgt = V(0, 2.5, 0), tgtS = V(0, 2.5, 0), minD = 12, maxD = 120, lastUser = 0;

function rebuild() {
  if (!scene) return;
  if (G) { G.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.map && o.isSprite) { o.material.map.dispose(); o.material.dispose(); } }); scene.remove(G); }
  G = new THREE.Group(); scene.add(G);
  const dmn = calc(); const gl = S.glaze; let span, top, cz = 0, cx = 0;
  ground.material = mat('ground');
  if (S.type === 'newbuild' || S.type === 'country') {
    const b = body(dmn.w, dmn.d, dmn.h, 0, 0);
    const lan = S.lantern && (S.roof === 'flat' || S.roof === 'crown');
    top = roofFor(b, { lantern: lan, glazedGable: S.ggable && S.roof === 'gable' });
    // front: door + windows
    const du = -b.w * .12;
    frontDoor(b, 'f', du);
    const nw = Math.max(2, Math.round(b.w / 3.4));
    windowsRow(b, 'f', nw, 1.1 + gl * .9, 1.3 + gl * .6, 3.1);
    windowsRow(b, 'f', nw, 1.1 + gl * 1.1, 1.4 + gl * .7, .45, [du, 1.6]);
    // rear: big garden doors + first floor
    const gw = Math.min(b.w * .7, 3 + gl * b.w * .5);
    gardenDoors(b, 'b', -b.w * .12, gw, 2.4);
    windowsRow(b, 'b', nw, 1.1 + gl * .8, 1.3 + gl * .6, 3.1);
    for (const f of ['l', 'r']) { if (f === 'r' && S.ggable && S.roof === 'gable') continue; windowAt(b, f, 0, 3.1, 1 + gl * .6, 1.3 + gl * .5); windowAt(b, f, b.d * .2, .45, 1 + gl * .8, 1.4 + gl * .6); }
    if (S.chimney && pitched()) chimney(b.w * .28, -b.d * .18, top - .3);
    // terrace + pergola at rear
    box(b.w + 2, .08, 4.2, mat('paving'), 0, 0, -b.d / 2 - 2.1, G, { cs: false, tile: 3 });
    if (S.pergola) pergola(b.w * .26, -b.d / 2 - 2, Math.min(5, b.w * .38), 3.4);
    span = Math.max(b.w, b.d);
    if (S.type === 'country') { // single-storey wing to the left
      const wd = b.d * .78, wl = Math.min(b.w * .9, Math.max(6, (S.area * .3) / wd));
      const wb = body(wl, wd, 3.2, -b.w / 2 - wl / 2 + .01, -(b.d - wd) / 2);
      roofFor(wb, { lantern: S.lantern && S.roof !== 'gable' && S.roof !== 'hip', pitch: .62, glazedGable: false });
      windowsRow(wb, 'f', Math.max(2, Math.round(wl / 3.2)), 1.2 + gl, 1.5 + gl * .5, .5);
      gardenDoors(wb, 'b', 0, Math.min(wl * .75, 3 + gl * wl * .5), 2.4);
      box(wl, .08, 4, mat('paving'), wb.x, 0, wb.z - wd / 2 - 2, G, { cs: false, tile: 3 });
      cx = -wl / 2; span = Math.max(b.w + wl, b.d);
      dim(V(wb.x - wl / 2, .2, b.d / 2 + 1.6), V(b.w / 2, .2, b.d / 2 + 1.6)); label((b.w + wl).toFixed(1) + ' m', cx, 1.2, b.d / 2 + 2.2);
    } else { dim(V(-b.w / 2, .2, b.d / 2 + 1.6), V(b.w / 2, .2, b.d / 2 + 1.6)); label(b.w.toFixed(1) + ' m', 0, 1.2, b.d / 2 + 2.2); }
    dim(V(b.w / 2 + 1.6, .2, -b.d / 2), V(b.w / 2 + 1.6, .2, b.d / 2)); label(b.d.toFixed(1) + ' m', b.w / 2 + 2.6, 1.2, 0);
    // gravel drive + hedges
    box(5, .04, 18, mat('gravel'), b.w * .1, 0, b.d / 2 + 10, G, { cs: false, tile: 3 });
    hedge(b.w * .1 - 3.2, b.d / 2 + 9, .8, 14); hedge(b.w * .1 + 3.2, b.d / 2 + 9, .8, 14);
    hedge(-b.w / 2 + 1.5, b.d / 2 + 1.4, 2.6, .7, .7); hedge(b.w / 2 - 1.5, b.d / 2 + 1.4, 2.6, .7, .7);
  } else {
    const H = existingHouse();
    let e;
    if (S.type === 'rear') { const ex = dmn.w < H.w ? -(H.w - dmn.w) / 2 : 0; e = body(dmn.w, dmn.d, dmn.h, ex, -H.d / 2 - dmn.d / 2 + .01); }
    else { e = body(dmn.w, dmn.d, dmn.h, H.w / 2 + dmn.w / 2 - .01, -(H.d - dmn.d) / 2); }
    const lan = S.lantern && (S.roof === 'flat' || S.roof === 'crown');
    roofFor(e, { lantern: lan, pitch: .58, alongX: false, glazedGable: S.ggable && S.roof === 'gable' });
    const gw = Math.min(e.w - .8, 2.2 + gl * e.w * .7);
    if (S.type === 'rear') {
      gardenDoors(e, 'b', 0, Math.max(1.8, gw), 2.3);
      windowAt(e, e.x < 0 ? 'l' : 'r', 0, .9, Math.min(e.d * .5, 1 + gl * 1.2), 1.3);
      box(e.w + 1.6, .08, 4, mat('paving'), e.x, 0, e.z - e.d / 2 - 2, G, { cs: false, tile: 3 });
      if (S.pergola) pergola(e.x + e.w / 2 + 2.2, e.z - e.d / 2 + 1.2, 3.6, 3.2);
      dim(V(e.x - e.w / 2, .2, e.z - e.d / 2 - 4.4), V(e.x + e.w / 2, .2, e.z - e.d / 2 - 4.4)); label(e.w.toFixed(1) + ' m', e.x, 1.2, e.z - e.d / 2 - 4.9);
      dim(V(e.x - e.w / 2 - 1.3, .2, e.z - e.d / 2), V(e.x - e.w / 2 - 1.3, .2, e.z + e.d / 2)); label(e.d.toFixed(1) + ' m', e.x - e.w / 2 - 2.4, 1.2, e.z);
      cz = -e.d / 2;
    } else {
      gardenDoors(e, 'b', 0, Math.max(1.8, Math.min(e.w - .6, gw)), 2.3);
      windowAt(e, 'f', 0, .9, Math.min(e.w - 1, 1 + gl * 1.4), 1.3);
      windowAt(e, 'r', 0, .9, Math.min(e.d - 1, 1.2 + gl * 1.6), 1.3);
      box(e.w + 1.5, .08, 3.6, mat('paving'), e.x, 0, e.z - e.d / 2 - 1.8, G, { cs: false, tile: 3 });
      if (S.pergola) pergola(e.x + e.w / 2 - 1.6, e.z - e.d / 2 - 1.8, 3.2, 3);
      dim(V(e.x - e.w / 2, .2, e.z + e.d / 2 + 1.4), V(e.x + e.w / 2, .2, e.z + e.d / 2 + 1.4)); label(e.w.toFixed(1) + ' m', e.x, 1.2, e.z + e.d / 2 + 2);
      dim(V(e.x + e.w / 2 + 1.3, .2, e.z - e.d / 2), V(e.x + e.w / 2 + 1.3, .2, e.z + e.d / 2)); label(e.d.toFixed(1) + ' m', e.x + e.w / 2 + 2.4, 1.2, e.z);
      cx = dmn.w / 2;
    }
    if (S.chimney) chimney(-H.w / 2 - .45, -1.5, 7.2);
    label('Existing', -H.w * .25, 8.6, 0);
    box(5, .04, 14, mat('gravel'), 2, 0, H.d / 2 + 8, G, { cs: false, tile: 3 });
    hedge(-H.w / 2 + 2, H.d / 2 + 1.4, 3, .7, .7);
    span = Math.max(H.w + (S.type === 'side' ? dmn.w : 0), H.d + (S.type === 'rear' ? dmn.d : 0));
  }
  // trees around
  const R0 = Math.max(16, span * 1.15);
  [[-1.05, .35, 1.2], [1.1, .55, 1], [-.9, -.95, 1.3], [.95, -.85, 1], [.15, -1.25, 1.15], [-1.3, -.2, .9], [1.3, -.15, 1.1]]
    .forEach(([a, b, s]) => tree(cx + a * R0, cz + b * R0, s * (.8 + span / 45)));
  LS = Math.max(1, span / 11);
  G.traverse(o => { if (o.isSprite) o.scale.set(2.9 * LS, .8 * LS, 1); });
  // camera framing
  tgtS.set(cx, Math.min(4, dmn.h * .5 + 1), cz);
  const asp = camera.aspect; dist = span * (asp < 1 ? 3.6 : 2.35) + 8; minD = span * .9 + 4; maxD = span * 5 + 30;
  const sc = sun.shadow.camera; const ext = span * 1.7 + 8; sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.updateProjectionMatrix();
  setTime();
  brief(dmn);
}

// ---------------- scene ----------------
function skyTex(day) {
  const [c, g] = canvas(256); const gr = g.createLinearGradient(0, 0, 0, 256);
  if (S.mode === 'card') { gr.addColorStop(0, '#e9e4d8'); gr.addColorStop(1, '#d9d2c3'); }
  else if (day) { gr.addColorStop(0, '#9fb4ae'); gr.addColorStop(.55, '#d7dccb'); gr.addColorStop(1, '#efe5cf'); }
  else { gr.addColorStop(0, '#1c2537'); gr.addColorStop(.6, '#5d4d5c'); gr.addColorStop(1, '#d58f62'); }
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function setTime() {
  const day = S.time === 'day';
  if (scene.background) scene.background.dispose(); scene.background = skyTex(day);
  const fogc = S.mode === 'card' ? 0xdcd5c7 : day ? 0xe3e1cf : 0x6a5560; scene.fog.color.set(fogc);
  hemi.color.set(day ? 0xeef1e6 : 0x7f8db4); hemi.groundColor.set(day ? 0x6b6a52 : 0x2a2328); hemi.intensity = day ? .75 : .35;
  sun.color.set(day ? 0xfff1dc : 0xff9a5c); sun.intensity = day ? 2.6 : 1.3;
  const sp = Math.max(30, dist); sun.position.set(day ? sp * .55 : -sp * .8, day ? sp * .8 : sp * .22, day ? sp * .6 : sp * .35);
  scene.environmentIntensity = day ? .38 : .14;
  const gm = MC['materials:glass']; if (gm) { gm.emissive.set(day ? 0x000000 : 0xffb066); gm.emissiveIntensity = day ? 0 : .95; }
  renderer.toneMappingExposure = day ? 1.0 : 1.05;
}
function resize() {
  if (!renderer) return; const cvs = renderer.domElement; const w = cvs.clientWidth, h = cvs.clientHeight; if (!w || !h) return;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
function setup() {
  const cvs = $('#cv');
  try { renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { $('#view').classList.add('nogl'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.fog = new THREE.Fog(0xe3e1cf, 90, 260);
  const pm = new THREE.PMREMGenerator(renderer); envRT = pm.fromScene(new RoomEnvironment(), .04); scene.environment = envRT.texture;
  camera = new THREE.PerspectiveCamera(30, 1, .5, 800);
  hemi = new THREE.HemisphereLight(0xeef1e6, 0x6b6a52, .75); scene.add(hemi);
  sun = new THREE.DirectionalLight(0xffffff, 2.6); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.0003; sun.shadow.normalBias = .03; sun.shadow.radius = 4; scene.add(sun, sun.target);
  const gg = new THREE.CircleGeometry(160, 72); const uv = gg.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 320 / 5, uv.getY(i) * 320 / 5);
  ground = new THREE.Mesh(gg, mat('ground')); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  // controls
  let drag = false, px = 0, py = 0, pinch = 0;
  const user = () => { lastUser = performance.now(); };
  cvs.addEventListener('pointerdown', e => { drag = true; px = e.clientX; py = e.clientY; cvs.setPointerCapture(e.pointerId); user(); });
  cvs.addEventListener('pointermove', e => { if (!drag) return; theta -= (e.clientX - px) * .007; phi = Math.min(1.36, Math.max(.28, phi - (e.clientY - py) * .005)); px = e.clientX; py = e.clientY; user(); });
  const up = () => drag = false; cvs.addEventListener('pointerup', up); cvs.addEventListener('pointercancel', up);
  cvs.addEventListener('wheel', e => { e.preventDefault(); dist = Math.min(maxD, Math.max(minD, dist * (1 + e.deltaY * .0011))); user(); }, { passive: false });
  cvs.addEventListener('touchmove', e => { if (e.touches.length === 2) { const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); if (pinch) dist = Math.min(maxD, Math.max(minD, dist * pinch / d)); pinch = d; e.preventDefault(); } }, { passive: false });
  cvs.addEventListener('touchend', () => pinch = 0);
  new ResizeObserver(() => { resize(); }).observe(cvs); resize();
  rebuild(); view(S.type === 'rear' ? 'rear' : 'front', true); loop();
}
function view(v, instant) {
  const front = Math.PI * 0 + .62, rear = Math.PI + .55;
  if (v === 'front') { theta = front; phi = 1.12; } else if (v === 'rear') { theta = rear; phi = 1.1; } else if (v === 'side') { theta = Math.PI / 2 + .25; phi = 1.18; } else { phi = .42; }
  lastUser = performance.now(); if (instant) cd = dist;
}
let visible = true;
function loop() {
  requestAnimationFrame(loop);
  if (!visible || document.body.dataset.route !== 'design') return;
  if (S.spin && performance.now() - lastUser > 5000) theta += .0012;
  cd += (dist - cd) * .08; tgt.lerp(tgtS, .08);
  camera.position.set(tgt.x + cd * Math.sin(phi) * Math.sin(theta), tgt.y + cd * Math.cos(phi), tgt.z + cd * Math.sin(phi) * Math.cos(theta));
  if (camera.position.y < 1.2) camera.position.y = 1.2;
  camera.lookAt(tgt); renderer.render(scene, camera);
}

// ---------------- UI ----------------
const CONSENT = d => S.type === 'rear' ? (d.d <= 4 && d.h <= 4 ? 'Possibly permitted development (we\'d check)' : 'Householder planning application')
  : S.type === 'side' ? 'Usually householder planning, sometimes permitted development'
  : S.type === 'newbuild' ? 'Full planning application' : 'Full planning, with pre-application advice';
const STEPS = {
  newbuild: ['Site appraisal and measured survey', 'Design workshop at the studio', 'Concept design and 3D visuals', 'Planning application', 'Technical design and build partners'],
  country: ['Site and land appraisal', 'Design workshops at the studio', 'Pre-application advice', 'Concept, 3D visuals and planning', 'Technical design, design and build'],
  rear: ['Measured survey of the house', 'Design workshop at the studio', 'Planning or permitted development check', 'Building regs and structural calcs'],
  side: ['Measured survey of the house', 'Design workshop at the studio', 'Planning application', 'Building regs and structural calcs'],
};
function brief(d) {
  const fp = S.type === 'country' ? null : d.w.toFixed(1) + ' × ' + d.d.toFixed(1);
  $('#bA').textContent = S.area + ' m²'; $('#bS').textContent = d.st; $('#bF').textContent = fp || 'House + wing';
  $('#bR').textContent = CONSENT(d); $('#bRoof').textContent = ROOFS[S.roof] + ', ' + FIN[S.fin].toLowerCase();
  $('#bSteps').innerHTML = STEPS[S.type].map(s => `<li>${s}</li>`).join('');
  $('#dims').textContent = S.type === 'country' ? `Main house ${d.w.toFixed(1)} × ${d.d.toFixed(1)} m + wing` : `${d.w.toFixed(1)} × ${d.d.toFixed(1)} m · ${d.h.toFixed(1)} m high`;
}
function swatches(el, set, key, texKey) {
  el.innerHTML = Object.entries(set).map(([k, n]) => `<button type="button" data-sw="${key}" data-v="${k}"><i style="background-image:url(${swatchURL(texKey ? texKey(k) : k)})"></i><span>${n}</span></button>`).join('');
}
function sync() {
  fixFinish();
  $$('[data-k]').forEach(b => b.classList.toggle('on', String(S[b.dataset.k]) === b.dataset.v));
  $$('[data-sw]').forEach(b => { b.classList.toggle('on', S[b.dataset.sw] === b.dataset.v); });
  $$('[data-sw="fin"]').forEach(b => { const flatOnly = ['sedum', 'membrane'].includes(b.dataset.v); b.hidden = S.roof === 'flat' ? !flatOnly : flatOnly; });
  $$('[data-tg]').forEach(b => { b.classList.toggle('on', !!S[b.dataset.tg]); });
  $('[data-tg="lantern"]').disabled = !(S.roof === 'flat' || S.roof === 'crown');
  $('[data-tg="chimney"]').disabled = !pitched();
  $('[data-tg="ggable"]').disabled = S.roof !== 'gable';
  $('#doorStep').classList.toggle('dim', S.type === 'rear' || S.type === 'side');
  const a = $('#area'), [mn, mx] = TYPES[S.type].r; a.min = mn; a.max = mx; a.value = S.area; a.style.setProperty('--v', ((S.area - mn) / (mx - mn) * 100) + '%');
  $('#aMin').textContent = mn + ' m²'; $('#aMax').textContent = mx + ' m²'; $('#aTxt').textContent = S.area + ' m²';
  const gz = $('#glaze'); gz.value = S.glaze * 100; gz.style.setProperty('--v', (S.glaze * 100) + '%');
  $('#gTxt').textContent = S.glaze < .3 ? 'Cosy' : S.glaze < .6 ? 'Balanced' : S.glaze < .85 ? 'Generous' : 'Floor-to-ceiling';
  $('#tTxt').textContent = TYPES[S.type].n; $('#rTxt').textContent = ROOFS[S.roof]; $('#fTxt').textContent = FIN[S.fin]; $('#wTxt').textContent = WALLS[S.wall];
  $('#dTxt').textContent = DOORS[S.door]; $('#gdTxt').textContent = GDOORS[S.gdoor]; $('#frTxt').textContent = FRAMES[S.frame];
}
let rbT; function change(rebuildNow = true) { sync(); if (!scene) { brief(calc()); return; } clearTimeout(rbT); rbT = setTimeout(rebuild, rebuildNow ? 0 : 60); }
export function setType(t) { if (!TYPES[t]) return; S.type = t; S.area = TYPES[t].r[2]; if ((t === 'rear' || t === 'side') && S.roof === 'gable') { S.roof = 'flat'; } change(); if (scene) view(t === 'rear' ? 'rear' : 'front'); }

function initUI() {
  swatches($('#walls'), WALLS, 'wall'); swatches($('#fins'), FIN, 'fin');
  $$('[data-k]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k, v = b.dataset.v;
    if (k === 'type') return setType(v);
    S[k] = v; change(); if (k === 'mode') { setTime(); }
  }));
  document.addEventListener('click', e => { const b = e.target.closest('[data-sw]'); if (!b) return; S[b.dataset.sw] = b.dataset.v; change(); });
  $$('[data-tg]').forEach(b => b.addEventListener('click', () => { S[b.dataset.tg] = !S[b.dataset.tg]; change(); }));
  $('#area').addEventListener('input', e => { S.area = +e.target.value; change(false); });
  $('#glaze').addEventListener('input', e => { S.glaze = e.target.value / 100; change(false); });
  $$('[data-view]').forEach(b => b.addEventListener('click', () => view(b.dataset.view)));
  $$('[data-time]').forEach(b => b.addEventListener('click', () => { S.time = b.dataset.time; $$('[data-time]').forEach(x => x.classList.toggle('on', x === b)); if (scene) setTime(); }));
  $$('[data-mode]').forEach(b => b.addEventListener('click', () => { S.mode = b.dataset.mode; $$('[data-mode]').forEach(x => x.classList.toggle('on', x === b)); if (scene) rebuild(); }));
  $('#spin').addEventListener('click', () => { S.spin = !S.spin; $('#spin').classList.toggle('on', S.spin); });
  $('#bForm').addEventListener('submit', e => {
    e.preventDefault(); const f = new FormData(e.target);
    const body = `3D designer brief\n\nProject: ${TYPES[S.type].n}\nFloor area: ${S.area} m2\nRoof: ${ROOFS[S.roof]} (${FIN[S.fin]})\nWalls: ${WALLS[S.wall]}\nFront door: ${DOORS[S.door]}\nGarden doors: ${GDOORS[S.gdoor]}\nWindow frames: ${FRAMES[S.frame]}\nGlazing: ${$('#gTxt').textContent}\nExtras: ${['pergola', 'lantern', 'chimney', 'ggable'].filter(k => S[k]).join(', ')}\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')}\nPostcode: ${f.get('postcode')}`;
    location.href = 'mailto:zjsarchitecturaldesign@gmail.com?subject=' + encodeURIComponent('3D brief: ' + TYPES[S.type].n + ', ' + S.area + ' m2') + '&body=' + encodeURIComponent(body);
  });
  sync(); brief(calc());
  new IntersectionObserver(e => visible = e[0].isIntersecting).observe($('#view'));
}

let started = false;
window.ZJS3D = {
  show() { if (!started) { started = true; setup(); } else resize(); },
  setType,
};
initUI();
if (document.body.dataset.route === 'design') window.ZJS3D.show();
window.dispatchEvent(new Event('zjs3d-ready'));
