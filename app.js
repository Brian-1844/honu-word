/* =========================================================
   Word Pas à Pas — moteur de l'application
   ========================================================= */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const SPEED = /[?&]fast/.test(location.search) ? 0.05 : 1;
const CANCEL = Symbol('cancel');

/* ---------- Sauvegarde de la progression ---------- */
const KEY = 'word-pas-a-pas-v1';
function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
let S = Object.assign({ done: {}, prac: {}, qok: {}, exam: {}, unlock: {} }, load());
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

/* ---------- Icônes du ruban (SVG) ---------- */
const T = (ch, st = '') => `<text x="12" y="17.5" text-anchor="middle" font-size="15" fill="currentColor" stroke="none" font-family="Georgia,serif" ${st}>${ch}</text>`;
const IC = {
  paste: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3.5" rx="1" fill="#fff"/><path d="M8.5 11h7M8.5 15h5"/>',
  cut: '<circle cx="6.5" cy="18" r="2.6"/><circle cx="17.5" cy="18" r="2.6"/><path d="M8.3 16 18 3.5M15.7 16 6 3.5"/>',
  copy: '<rect x="8" y="7" width="11" height="14" rx="2"/><path d="M5 17V5a2 2 0 0 1 2-2h9"/>',
  bold: T('G', 'font-weight="900" font-family="Arial,sans-serif"'),
  italic: T('I', 'font-style="italic" font-weight="700"'),
  underline: T('S', 'font-weight="700" font-family="Arial,sans-serif" text-decoration="underline"') + '<path d="M7 20.5h10"/>',
  color: T('A', 'font-weight="700" font-family="Arial,sans-serif" y="16"') + '<rect x="5" y="18.5" width="14" height="3" fill="#d32f2f" stroke="none"/>',
  highlight: '<path d="M14 4l6 6-8 8H6v-6z"/><rect x="4" y="19" width="16" height="3" fill="#ffeb3b" stroke="none"/>',
  bullets: '<circle cx="5" cy="6" r="1.4" fill="currentColor"/><circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="5" cy="18" r="1.4" fill="currentColor"/><path d="M9 6h11M9 12h11M9 18h11"/>',
  numbering: '<text x="2.5" y="8" font-size="6.5" fill="currentColor" stroke="none">1</text><text x="2.5" y="14" font-size="6.5" fill="currentColor" stroke="none">2</text><text x="2.5" y="20" font-size="6.5" fill="currentColor" stroke="none">3</text><path d="M9 6h11M9 12h11M9 18h11"/>',
  alignL: '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
  alignC: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
  alignR: '<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
  alignJ: '<path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
  spacing: '<path d="M3.5 7 6 4l2.5 3M6 4v16M3.5 17 6 20l2.5-3M11 6h9M11 12h9M11 18h9"/>',
  marks: T('¶', 'font-weight="700"'),
  find: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 20 20"/>',
  replace: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  pagebreak: '<path d="M6 3h12v6H6zM6 15h12v6H6z"/><path d="M3 12h2M8 12h2M14 12h2M19 12h2"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9.5h18M3 15h18M9 4v16M15 4v16"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="2"/><path d="M3 18l5-5 4 4 3-3 6 6"/>',
  shapes: '<circle cx="8.5" cy="9" r="5"/><rect x="11" y="12" width="9" height="9" rx="1"/>',
  link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
  header: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 7h8" stroke-width="3"/>',
  footer: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 17h8" stroke-width="3"/>',
  pagenum: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><text x="12" y="17" font-size="7" text-anchor="middle" fill="currentColor" stroke="none">#</text>',
  symbol: T('Ω'),
  margins: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 3v18M16 3v18M4 7h16M4 17h16" stroke-dasharray="2 2"/>',
  orientation: '<rect x="3" y="9" width="14" height="10" rx="1"/><rect x="12" y="3" width="9" height="12" rx="1" fill="#fff"/>',
  psize: '<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  columns: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M12 4v16M6 8h4M6 11h4M6 14h4M14 8h4M14 11h4M14 14h4"/>',
  breaks: '<path d="M6 3h12v7H6zM6 14h12v7H6z"/><path d="M2 12h20" stroke-dasharray="2 2"/>',
  toc: '<path d="M4 6h9M4 10h12M4 14h9M4 18h12"/><path d="M17 6h3M18 14h2" stroke-dasharray="1 1.5"/>',
  updtoc: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',
  footnote: '<path d="M4 7h10M4 11h10M4 19h8"/><text x="18" y="11" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">1</text>',
  caption: '<rect x="4" y="3" width="16" height="11" rx="1"/><path d="M5 18h14M7 21h10"/>',
  startmerge: '<rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 6 9-6"/>',
  recipients: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.5A5 5 0 0 1 21 20"/>',
  field: T('«»'),
  preview: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  finish: '<rect x="3" y="4" width="13" height="16" rx="1.5"/><path d="M11 14l3 3 7-8"/>',
  spell: '<text x="1.5" y="12" font-size="8" font-weight="700" fill="currentColor" stroke="none" font-family="Arial">ABC</text><path d="M7 17l3 3 7-7"/>',
  track: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  newcomment: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 7.5v6M9 10.5h6"/>',
  accept: '<rect x="3" y="3" width="13" height="17" rx="1.5"/><path d="M11 16l3 3 7-7"/>',
  reject: '<rect x="3" y="3" width="13" height="17" rx="1.5"/><path d="M14 13l6 6M20 13l-6 6"/>',
  wordcount: '<text x="12" y="16" font-size="9" text-anchor="middle" font-weight="700" fill="currentColor" stroke="none" font-family="Arial">123</text><rect x="3" y="5" width="18" height="14" rx="2"/>',
  navpane: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M9 4v16M5 8h2M5 11h2M5 14h2"/>',
  zoom: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 20 20M10 7v6M7 10h6"/>',
  readmode: '<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/>'
};
const icon = id => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${IC[id] || ''}</svg>`;

const TABS = ['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Références', 'Publipostage', 'Révision', 'Affichage'];
const RIBBON = {
  'Accueil': [['paste', 'Coller'], ['cut', 'Couper'], ['copy', 'Copier'], '|', ['font', 'Calibri', 'box'], ['size', '11', 'box'], ['bold', 'Gras'], ['italic', 'Italique'], ['underline', 'Souligné'], ['color', 'Couleur'], ['highlight', 'Surligner'], '|', ['bullets', 'Puces'], ['numbering', 'Numéros'], ['alignL', 'Gauche'], ['alignC', 'Centrer'], ['alignR', 'Droite'], ['alignJ', 'Justifier'], ['spacing', 'Interligne'], ['marks', 'Afficher tout'], '|', ['styleNormal', 'Normal', 'style'], ['styleT1', 'Titre 1', 'style'], ['styleT2', 'Titre 2', 'style'], '|', ['find', 'Rechercher'], ['replace', 'Remplacer']],
  'Insertion': [['pagebreak', 'Saut de page'], '|', ['table', 'Tableau'], '|', ['image', 'Images'], ['shapes', 'Formes'], '|', ['link', 'Lien'], '|', ['header', 'En-tête'], ['footer', 'Pied de page'], ['pagenum', 'N° de page'], '|', ['symbol', 'Symbole']],
  'Mise en page': [['margins', 'Marges'], ['orientation', 'Orientation'], ['psize', 'Taille'], ['columns', 'Colonnes'], ['breaks', 'Sauts']],
  'Références': [['toc', 'Table des matières'], ['updtoc', 'Mettre à jour la table'], '|', ['footnote', 'Note de bas de page'], '|', ['caption', 'Insérer une légende']],
  'Publipostage': [['startmerge', 'Démarrer la fusion'], ['recipients', 'Destinataires'], '|', ['field', 'Insérer un champ'], '|', ['preview', 'Aperçu des résultats'], '|', ['finish', 'Terminer et fusionner']],
  'Révision': [['spell', 'Orthographe'], ['wordcount', 'Statistiques'], '|', ['newcomment', 'Nouveau commentaire'], '|', ['track', 'Suivi des modifs'], ['accept', 'Accepter'], ['reject', 'Refuser']],
  'Affichage': [['readmode', 'Mode Lecture'], '|', ['navpane', 'Volet de navigation'], ['zoom', 'Zoom']]
};
function tabOf(id) { for (const t in RIBBON) if (RIBBON[t].some(d => d[0] === id)) return t; return 'Accueil'; }
function labelOf(id) { for (const t in RIBBON) { const d = RIBBON[t].find(x => x[0] === id); if (d) return d[2] === 'box' ? (id === 'font' ? 'Police' : 'Taille de police') : d[1]; } return id; }
function rbtn(d) {
  if (d === '|') return '<span class="rsep"></span>';
  const [id, label, kind] = d;
  if (kind === 'box') return `<button class="rb box" data-id="${id}"><span class="bx ${id}"><span class="bxl">${label}</span><span class="car">▾</span></span><span class="lb">${id === 'font' ? 'Police' : 'Taille'}</span></button>`;
  if (kind === 'style') return `<button class="rb sty" data-id="${id}"><span class="sw ${id}">AaBbCc</span><span class="lb">${label}</span></button>`;
  return `<button class="rb" data-id="${id}">${icon(id)}<span class="lb">${label}</span></button>`;
}
const PTR = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 2l14 11.2-6.4 1 3.7 7.1-2.7 1.4-3.6-7.2L5 20.3z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
const SAVE_IC = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="1.8"><path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/></svg>';

/* ---------- Le Word simulé ---------- */
class Mock {
  constructor(host, scene, cap) {
    this.host = host; this.scene = scene; this.cap = cap; this.run = 0; this.want = null; this.active = {};
    host.addEventListener('click', e => this.onTap(e), true);
    host.addEventListener('contextmenu', e => e.preventDefault());
    this.reset();
  }
  reset() {
    const sc = this.scene; this.active = {}; this.want = null;
    this.host.innerHTML = `<div class="wm">
      <div class="wm-title">${SAVE_IC}<span class="wm-docname">${sc.name || 'Document1'}</span><span class="wm-win">—&nbsp;&nbsp;▢&nbsp;&nbsp;✕</span></div>
      <div class="wm-tabs">${TABS.map(t => `<button class="wm-tab${t === 'Fichier' ? ' file' : ''}" data-tab="${t}">${t}</button>`).join('')}</div>
      <div class="wm-ribbon"></div>
      <div class="wm-body"><div class="wm-nav"></div><div class="wm-scroll"><div class="wm-page"><div class="hdr"></div><div class="content">${sc.doc}</div><div class="notes" id="notes"></div><div class="ftr"></div></div></div></div>
      <div class="wm-status"><span>Page 1 sur 1</span><span class="wc"></span><span class="zm">100 %</span></div>
      <div class="wm-ptr">${PTR}</div>
    </div>`;
    this.root = $('.wm', this.host); this.ptr = $('.wm-ptr', this.root);
    this.setTab(sc.tab || 'Accueil'); this.wc(); this.ptrHome();
  }
  q(s) { return this.root.querySelector(s); }
  setTab(name) {
    if (name === 'Fichier') return;
    this.tab = name;
    $$('.wm-tab', this.root).forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    const rb = $('.wm-ribbon', this.root);
    rb.innerHTML = RIBBON[name].map(rbtn).join(''); rb.scrollLeft = 0;
    for (const id in this.active) { const e = this.q(`.rb[data-id="${id}"]`); if (e) e.classList.toggle('on', this.active[id]); }
    if (this.labels) for (const id in this.labels) { const e = this.q(`.rb[data-id="${id}"] .bxl`); if (e) e.textContent = this.labels[id]; }
  }
  wc() { const t = ($('.content', this.root).textContent || '').trim(); const n = t ? t.split(/\s+/).length : 0; $('.wc', this.root).textContent = n + (n > 1 ? ' mots' : ' mot'); }
  sleep(ms) { const id = this.run; return new Promise((res, rej) => setTimeout(() => id === this.run ? res() : rej(CANCEL), ms * SPEED)); }
  rel(el) { const a = el.getBoundingClientRect(), b = this.root.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; }
  ptrHome() { const w = this.root.clientWidth, h = this.root.clientHeight; this.ptr.style.transform = `translate(${w - 40}px, ${h - 50}px)`; }
  ptrTo(el) { const r = this.rel(el); const x = r.x + Math.min(r.w / 2, r.w > 120 ? 60 : r.w / 2), y = r.y + Math.min(r.h / 2, 24); this.px = x; this.py = y; this.ptr.style.transform = `translate(${x - 5}px, ${y - 2}px)`; }
  ripple(el) {
    let x = this.px, y = this.py;
    if (el && this.practice) { const r = this.rel(el); x = r.x + r.w / 2; y = r.y + Math.min(r.h / 2, 24); }
    const d = document.createElement('span'); d.className = 'rip'; d.style.left = x + 'px'; d.style.top = y + 'px';
    this.root.appendChild(d); setTimeout(() => d.remove(), 600);
    if (el) { el.classList.add('press'); setTimeout(() => el.classList.remove('press'), 220); }
    if (navigator.vibrate && this.practice) try { navigator.vibrate(12); } catch (e) { }
  }
  async vis(el) {
    let moved = false, p = el.parentElement;
    while (p && p !== this.root) {
      const cs = getComputedStyle(p);
      if (/(auto|scroll)/.test(cs.overflowX) && p.scrollWidth > p.clientWidth + 2) {
        const a = el.getBoundingClientRect(), b = p.getBoundingClientRect();
        if (a.left < b.left + 4 || a.right > b.right - 4) { p.scrollTo({ left: p.scrollLeft + (a.left - b.left) - b.width / 2 + a.width / 2, behavior: 'smooth' }); moved = true; }
      }
      if (/(auto|scroll)/.test(cs.overflowY) && p.scrollHeight > p.clientHeight + 2) {
        const a = el.getBoundingClientRect(), b = p.getBoundingClientRect();
        if (a.top < b.top + 4 || a.bottom > b.bottom - 4) { p.scrollTo({ top: p.scrollTop + (a.top - b.top) - 30, behavior: 'smooth' }); moved = true; }
      }
      p = p.parentElement;
    }
    if (moved) await this.sleep(420);
  }
  async hit(el, id) {
    if (!el) return;
    await this.vis(el);
    if (this.practice) {
      el.classList.add('tgt'); this.wrong = 0;
      await new Promise(res => { this.want = { el, res }; });
      if (id !== this.run) throw CANCEL;
      this.want = null; el.classList.remove('tgt'); this.ptr.classList.remove('show');
      this.ripple(el); await this.sleep(200);
    } else {
      this.ptrTo(el); await this.sleep(750); this.ripple(el); await this.sleep(260);
    }
  }
  onTap(e) {
    if (!this.want) return;
    e.preventDefault(); e.stopPropagation();
    if (this.want.el.contains(e.target)) { this.want.res(); return; }
    this.wrong++;
    const hint = $('.cap-hint', this.cap); if (hint) { hint.classList.remove('shake'); void hint.offsetWidth; hint.classList.add('shake'); }
    if (this.wrong >= 2) { this.ptr.classList.add('show'); this.ptrTo(this.want.el); }
  }
  async type(el, text) {
    $$('.caret', this.root).forEach(c => c.remove());
    const c = document.createElement('span'); c.className = 'caret'; el.appendChild(c);
    for (const ch of text) { c.before(document.createTextNode(ch)); await this.sleep(this.practice ? 30 : 55); }
    this.wc();
  }
  menu(anchor, items, atPtr) {
    const m = document.createElement('div'); m.className = 'wm-menu';
    m.innerHTML = items.map((t, i) => `<div class="mi" data-i="${i}">${t}</div>`).join('');
    this.root.appendChild(m);
    const r = this.rel(anchor), W = this.root.clientWidth, Hh = this.root.clientHeight;
    let left = atPtr ? r.x + Math.min(r.w / 2, 60) : r.x, top = atPtr ? r.y + Math.min(r.h / 2, 24) + 6 : r.y + r.h + 2;
    left = Math.max(6, Math.min(left, W - m.offsetWidth - 6));
    if (top + m.offsetHeight > Hh - 4) top = Math.max(4, (atPtr ? r.y : r.y) - m.offsetHeight - 2);
    m.style.left = left + 'px'; m.style.top = top + 'px';
    return m;
  }
  grid(anchor) {
    const g = document.createElement('div'); g.className = 'wm-menu wm-grid';
    let cells = ''; for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) cells += `<i data-r="${r}" data-c="${c}"></i>`;
    g.innerHTML = `<div class="gl">Insérer un tableau</div><div class="gg">${cells}</div>`;
    this.root.appendChild(g);
    const r = this.rel(anchor), W = this.root.clientWidth;
    g.style.left = Math.max(6, Math.min(r.x, W - g.offsetWidth - 6)) + 'px'; g.style.top = (r.y + r.h + 2) + 'px';
    return g;
  }
  hover(g, R, C) { $$('i', g).forEach(i => i.classList.toggle('on', +i.dataset.r < R && +i.dataset.c < C)); $('.gl', g).textContent = R && C ? `Tableau ${C} × ${R}` : 'Insérer un tableau'; }
  dialog(s) {
    const w = document.createElement('div'); w.className = 'wm-dlgw';
    w.innerHTML = `<div class="wm-dlg"><div class="dh"><span>${s.title}</span><span>✕</span></div><div class="db">${s.html || ''}</div><div class="df"><button class="dbtn ok">${s.ok || 'OK'}</button><button class="dbtn">Annuler</button></div></div>`;
    this.root.appendChild(w); return w;
  }
  backstage() {
    const items = ['Accueil', 'Nouveau', 'Ouvrir', 'Enregistrer', 'Enregistrer sous', 'Imprimer', 'Partager', 'Exporter', 'Fermer'];
    const b = document.createElement('div'); b.className = 'wm-bs';
    b.innerHTML = `<div class="bsl"><div class="bsback">←</div>${items.map(t => `<div class="bsi" data-t="${t}">${t}</div>`).join('')}</div><div class="bsr"><div class="bsh">Bonjour</div><div class="bsr-sub">Documents récents</div></div>`;
    this.root.appendChild(b); return b;
  }
  keys(arr) {
    const k = document.createElement('div'); k.className = 'wm-keys';
    k.innerHTML = arr.map(x => `<kbd>${x}</kbd>`).join('<b>+</b>');
    this.root.appendChild(k); return k;
  }
  caption(i, n, s) {
    const instr = this.practice ? `<div class="cap-hint">👉 ${this.instr(s)}</div>` : '';
    this.cap.innerHTML = `<div class="cap-row"><span class="cap-n">${i + 1}/${n}</span><span class="cap-t">${s.say}</span></div>${instr}`;
    this.cap.classList.remove('in'); void this.cap.offsetWidth; this.cap.classList.add('in');
  }
  instr(s) {
    switch (s.t) {
      case 'tab': return `Touchez l’onglet « ${s.name} »`;
      case 'btn': return `Touchez le bouton « ${labelOf(s.id)} »`;
      case 'sel': return 'Touchez le texte encadré pour le sélectionner';
      case 'type': return 'Touchez l’endroit encadré pour écrire';
      case 'key': return 'Touchez les touches du clavier';
      case 'menu': return `Touchez « ${labelOf(s.from)} », puis le bon choix`;
      case 'ctx': return 'Touchez l’élément (clic droit), puis le bon choix';
      case 'grid': return 'Touchez « Tableau », puis la case encadrée';
      case 'dialog': return `Touchez « ${s.ok || 'OK'} »`;
      case 'file': return 'Touchez « Fichier », puis les choix encadrés';
      default: return 'Touchez la zone encadrée';
    }
  }
  h() {
    const R = this.root, Q = s => R.querySelector(s), QA = s => [...R.querySelectorAll(s)], m = this;
    const api = {
      q: Q,
      st: (s, o) => QA(s).forEach(e => Object.assign(e.style, o)),
      cls: (s, c) => QA(s).forEach(e => e.classList.add(...c.split(' '))),
      rm: (s, c) => QA(s).forEach(e => e.classList.remove(...c.split(' '))),
      html: (s, h) => QA(s).forEach(e => { e.innerHTML = h; }),
      text: (s, t) => QA(s).forEach(e => { e.textContent = t; }),
      after: (s, h) => { const e = Q(s); if (e) e.insertAdjacentHTML('afterend', h); },
      before: (s, h) => { const e = Q(s); if (e) e.insertAdjacentHTML('beforebegin', h); },
      lbl: (id, t) => { m.labels = m.labels || {}; m.labels[id] = t; const e = Q(`.rb[data-id="${id}"] .bxl`); if (e) e.textContent = t; },
      title: t => { Q('.wm-docname').textContent = t; },
      act: (id, on = true) => { m.active[id] = on; const e = Q(`.rb[data-id="${id}"]`); if (e) e.classList.toggle('on', on); },
      unsel: () => QA('.sel').forEach(e => e.classList.remove('sel')),
      flash: s => QA(s).forEach(e => { e.classList.remove('flash'); void e.offsetWidth; e.classList.add('flash'); }),
      chop: s => { const e = Q(s); if (!e) return; const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let last = null, n; while ((n = w.nextNode())) if (n.nodeValue.length) last = n; if (last) last.nodeValue = last.nodeValue.slice(0, -1); },
      list: (s, tag) => { const e = Q(s); const it = $$('p', e).map(p => `<li>${p.innerHTML}</li>`).join(''); e.innerHTML = `<${tag}>${it}</${tag}>`; },
      table: (s, r, c) => { let t = '<table class="tbl">'; for (let i = 0; i < r; i++) { t += '<tr>'; for (let j = 0; j < c; j++) t += `<td id="c${i}${j}"></td>`; t += '</tr>'; } Q(s).innerHTML = t + '</table>'; },
      toc: s => {
        const hs = QA('.content .h1, .content .h2').filter(h => h.textContent.trim() && !h.closest('#toc'));
        let pg = 1; const e = Q(s); e.classList.remove('tocph');
        e.innerHTML = '<div class="toct">Table des matières</div>' + hs.map((h, i) => { if (i > 0 && h.classList.contains('h1')) pg++; return `<div class="tl${h.classList.contains('h2') ? ' l2' : ''}"><span>${h.textContent}</span><i></i><span>${pg}</span></div>`; }).join('');
        api.flash(s);
      },
      nav: () => {
        const hs = QA('.content .h1, .content .h2').filter(h => h.textContent.trim());
        Q('.wm-nav').innerHTML = '<div class="nvh">Navigation</div>' + hs.map((h, i) => `<div class="ni${h.classList.contains('h2') ? ' l2' : ''}" data-i="${i}">${h.textContent}</div>`).join('');
        Q('.wm-body').classList.add('nav-on');
      },
      go: i => {
        const hs = QA('.content .h1, .content .h2').filter(h => h.textContent.trim()); const h = hs[i]; if (!h) return;
        QA('.ni').forEach(n => n.classList.toggle('on', +n.dataset.i === i));
        const sc = Q('.wm-scroll'); sc.scrollTo({ top: sc.scrollTop + h.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8, behavior: 'smooth' });
        h.classList.remove('flash'); void h.offsetWidth; h.classList.add('flash');
      }
    };
    return api;
  }
  async step(s, id) {
    const pr = this.practice;
    if (s.pre) s.pre(this.h());
    switch (s.t) {
      case 'point': await this.hit(this.q(s.el), id); break;
      case 'tab': { await this.hit(this.q(`.wm-tab[data-tab="${s.name}"]`), id); this.setTab(s.name); break; }
      case 'btn': {
        if (!this.q(`.rb[data-id="${s.id}"]`)) this.setTab(tabOf(s.id));
        const b = this.q(`.rb[data-id="${s.id}"]`); await this.hit(b, id);
        b.classList.add('on'); if (!this.active[s.id]) setTimeout(() => b.classList.remove('on'), 500);
        break;
      }
      case 'sel': { const el = this.q(s.el); await this.hit(el, id); if (!s.add) this.h().unsel(); el.classList.add('sel'); break; }
      case 'type': { const el = this.q(s.el); await this.hit(el, id); await this.type(el, s.text); break; }
      case 'key': {
        const k = this.keys(s.keys); await this.sleep(pr ? 100 : 350);
        await this.hit(k, id); k.classList.add('down'); await this.sleep(320); k.remove(); break;
      }
      case 'menu': {
        if (!this.q(`.rb[data-id="${s.from}"]`)) this.setTab(tabOf(s.from));
        const b = this.q(`.rb[data-id="${s.from}"]`); await this.hit(b, id); b.classList.add('on');
        const m = this.menu(b, s.items); await this.sleep(pr ? 120 : 380);
        await this.hit($$('.mi', m)[s.pick], id); m.remove(); b.classList.remove('on'); break;
      }
      case 'ctx': {
        const el = this.q(s.el); await this.hit(el, id);
        const m = this.menu(el, s.items, true); await this.sleep(pr ? 120 : 380);
        await this.hit($$('.mi', m)[s.pick], id); m.remove(); break;
      }
      case 'grid': {
        if (!this.q(`.rb[data-id="${s.from}"]`)) this.setTab(tabOf(s.from));
        const b = this.q(`.rb[data-id="${s.from}"]`); await this.hit(b, id);
        const g = this.grid(b); const target = $(`i[data-r="${s.r - 1}"][data-c="${s.c - 1}"]`, g);
        if (!pr) { for (let k = 1; k <= Math.max(s.r, s.c); k++) { const R = Math.min(k, s.r), C = Math.min(k, s.c); this.hover(g, R, C); this.ptrTo($(`i[data-r="${R - 1}"][data-c="${C - 1}"]`, g)); await this.sleep(260); } }
        await this.hit(target, id); this.hover(g, s.r, s.c); await this.sleep(250); g.remove(); break;
      }
      case 'dialog': { const d = this.dialog(s); await this.sleep(pr ? 150 : 700); await this.hit($('.ok', d), id); d.remove(); break; }
      case 'file': {
        await this.hit(this.q('.wm-tab[data-tab="Fichier"]'), id);
        const b = this.backstage(); await this.sleep(pr ? 120 : 350);
        const it = $(`.bsi[data-t="${s.pick}"]`, b); await this.hit(it, id);
        $$('.bsi', b).forEach(x => x.classList.toggle('on', x === it));
        $('.bsr', b).innerHTML = `<div class="bsh">${s.pick}</div>` + (s.tiles || [s.then]).map(t => `<div class="bst" data-t="${t}"><span class="bsti">${t === 'Document vierge' ? '📄' : t === 'Imprimer' ? '🖨️' : t.includes('PDF') ? '📕' : t === 'OneDrive' ? '☁️' : t === 'Ce PC' ? '💻' : t === 'Parcourir' ? '📁' : '📄'}</span>${t}</div>`).join('');
        await this.sleep(pr ? 120 : 400);
        if (s.then) await this.hit($(`.bst[data-t="${s.then}"]`, b), id);
        b.remove(); break;
      }
    }
    if (s.fx) { s.fx(this.h()); this.wc(); }
    await this.sleep(pr ? 350 : 1150);
  }
  async play(mode, onDone) {
    this.run++; const id = this.run; this.labels = {};
    this.reset();
    this.practice = mode === 'prac';
    this.root.classList.toggle('prac', this.practice);
    if (!this.practice) this.ptr.classList.add('show');
    const steps = this.scene.steps;
    try {
      await this.sleep(450);
      for (let i = 0; i < steps.length; i++) { this.caption(i, steps.length, steps[i]); await this.step(steps[i], id); }
      this.ptrHome();
      this.cap.innerHTML = this.practice
        ? '<div class="cap-row done"><span class="cap-n">🎉</span><span class="cap-t"><b>Bravo, vous avez réussi !</b> Vous pouvez recommencer quand vous voulez.</span></div>'
        : '<div class="cap-row done"><span class="cap-n">✓</span><span class="cap-t"><b>C’est fini !</b> Touchez « À vous ! » pour essayer vous-même.</span></div>';
      if (onDone) onDone(mode);
    } catch (e) { if (e !== CANCEL) console.error(e); }
  }
  stop() { this.run++; this.want = null; }
}

/* ---------- Illustrations ---------- */
const LV_ART = {
  d: `<svg viewBox="0 0 120 120" class="lvart"><circle cx="60" cy="62" r="50" fill="#d9f5f1"/><rect x="30" y="26" width="54" height="70" rx="6" fill="#fff" stroke="#9fd8cf" stroke-width="2"/><path d="M40 42h34M40 52h28M40 62h34M40 72h20" stroke="#bfe6df" stroke-width="4" stroke-linecap="round"/><rect class="blink" x="62" y="68" width="2.5" height="9" fill="#14A396"/><g class="sprout"><path d="M88 98c0-14 0-20 0-26" stroke="#2e9e56" stroke-width="3" fill="none"/><path d="M88 80c-10-2-14-9-14-14 8 0 13 5 14 14z" fill="#4cc274"/><path d="M88 74c8-3 14-10 14-16-9 1-14 7-14 16z" fill="#5fd486"/></g><ellipse cx="88" cy="100" rx="12" ry="4" fill="#b98a5a"/></svg>`,
  i: `<svg viewBox="0 0 120 120" class="lvart"><circle cx="60" cy="62" r="50" fill="#dde9fb"/><rect x="26" y="22" width="60" height="78" rx="6" fill="#fff" stroke="#a8c3ee" stroke-width="2"/><rect x="34" y="30" width="44" height="24" rx="3" fill="#8fd3f4"/><path d="M34 54l12-12 9 9 7-6 16 9z" fill="#3c8d5a"/><circle cx="68" cy="37" r="4" fill="#fff3b0"/><g stroke="#a8c3ee" stroke-width="1.6"><rect x="34" y="62" width="44" height="24" fill="#f4f8ff"/><path d="M34 70h44M34 78h44M49 62v24M63 62v24"/></g><g class="floaty"><circle cx="94" cy="30" r="12" fill="#2F6FD0"/><path d="M89 30h10M94 25v10" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g></svg>`,
  a: `<svg viewBox="0 0 120 120" class="lvart"><circle cx="60" cy="62" r="50" fill="#efe2f8"/><rect x="38" y="20" width="54" height="72" rx="6" fill="#f7f0fc" stroke="#cdb1e6" stroke-width="2"/><rect x="30" y="28" width="54" height="72" rx="6" fill="#fff" stroke="#cdb1e6" stroke-width="2"/><text x="38" y="42" font-size="7" font-weight="700" fill="#8A3FC2" font-family="Arial">Sommaire</text><g stroke="#d9c6ec" stroke-width="2" stroke-dasharray="2 2"><path d="M38 52h38M38 60h38M42 68h34M38 76h38M42 84h34"/></g><g class="spin"><circle cx="92" cy="88" r="13" fill="#8A3FC2"/><path d="M92 79l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6-4.5-4.1 6-.7z" fill="#ffd54a"/></g></svg>`
};
const HERO = `<svg viewBox="0 0 340 210" class="hero-svg" aria-hidden="true">
  <defs><linearGradient id="hgr" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>
  <circle cx="280" cy="48" r="26" fill="#FFD27A" class="sun"/>
  <path d="M0 180 Q85 160 170 178 T340 172 V210 H0Z" fill="#ffffff" opacity=".18"/>
  <g class="pg"><rect x="92" y="22" width="156" height="170" rx="12" fill="#fff"/><rect x="92" y="22" width="156" height="26" rx="12" fill="#163f7a"/><rect x="92" y="38" width="156" height="10" fill="#163f7a"/>
  <circle cx="104" cy="35" r="3" fill="#ff7a59"/><circle cx="114" cy="35" r="3" fill="#ffd27a"/><circle cx="124" cy="35" r="3" fill="#5fd486"/>
  <rect x="108" y="58" width="80" height="10" rx="3" fill="#2F6FD0" class="wl w1"/>
  <rect x="108" y="78" width="124" height="6" rx="3" fill="#cfd8e6" class="wl w2"/><rect x="108" y="92" width="110" height="6" rx="3" fill="#cfd8e6" class="wl w3"/><rect x="108" y="106" width="118" height="6" rx="3" fill="#cfd8e6" class="wl w4"/>
  <rect x="108" y="124" width="54" height="40" rx="4" fill="#8fd3f4"/><path d="M108 164l16-16 12 10 8-6 18 12z" fill="#3c8d5a"/>
  <rect x="170" y="126" width="62" height="6" rx="3" fill="#cfd8e6" class="wl w5"/><rect x="170" y="140" width="50" height="6" rx="3" fill="#cfd8e6" class="wl w6"/>
  <rect x="221" y="138" width="2.5" height="10" fill="#163f7a" class="blink"/></g>
  <g class="fl f1"><circle cx="52" cy="70" r="22" fill="#ff7a59"/><text x="52" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" font-family="Arial">G</text></g>
  <g class="fl f2"><circle cx="38" cy="140" r="18" fill="#14A396"/><text x="38" y="147" text-anchor="middle" font-size="19" font-style="italic" font-weight="700" fill="#fff" font-family="Georgia">I</text></g>
  <g class="fl f3"><circle cx="294" cy="130" r="20" fill="#8A3FC2"/><text x="294" y="137" text-anchor="middle" font-size="20" font-weight="700" fill="#fff" font-family="Arial" text-decoration="underline">S</text></g>
</svg>`;

/* ---------- Utilitaires de progression ---------- */
const LV = window.LEVELS;
const allLessons = LV.flatMap(l => l.lessons.map(x => Object.assign(x, { lv: l.id })));
const findLesson = id => allLessons.find(l => l.id === id);
const findLevel = id => LV.find(l => l.id === id);
const stars = id => (S.done[id] ? 1 : 0) + (S.prac[id] ? 1 : 0) + (S.qok[id] ? 1 : 0);
const totalStars = () => allLessons.reduce((a, l) => a + stars(l.id), 0) + Object.values(S.exam).filter(v => v >= 70).length * 5;
const maxStars = allLessons.length * 3 + LV.length * 5;
const unlocked = lv => lv === 'd' || S.unlock[lv] || (lv === 'i' && S.exam.d >= 70) || (lv === 'a' && S.exam.i >= 70);
const starStr = n => '<span class="stars">' + [0, 1, 2].map(i => `<i class="${i < n ? 'on' : ''}">★</i>`).join('') + '</span>';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Vues ---------- */
const app = $('#app');
let currentMock = null;
function setHeader() { $('#hstars').textContent = totalStars(); }

function viewHome() {
  const doneCount = allLessons.filter(l => S.done[l.id]).length;
  app.innerHTML = `
  <section class="hero">
    ${HERO}
    <h1>Apprenez Word<br><span>pas à pas</span></h1>
    <p>Des leçons courtes, illustrées et animées. Regardez, puis essayez vous-même !</p>
    <div class="hero-prog"><div class="bar"><i style="width:${Math.round(doneCount / allLessons.length * 100)}%"></i></div><span>${doneCount} / ${allLessons.length} leçons</span></div>
  </section>
  <h2 class="sec">Choisissez votre niveau</h2>
  <div class="levels">${LV.map((l, i) => {
    const n = l.lessons.filter(x => S.done[x.id]).length, open = unlocked(l.id), ex = S.exam[l.id];
    return `<a class="lvcard${open ? '' : ' locked'}" href="#/n/${l.id}" style="--lc:${l.color}">
      ${LV_ART[l.id]}
      <div class="lvinfo"><div class="lvtag">Niveau ${i + 1}</div><h3>${l.emoji} ${l.name}</h3><p>${l.sub}</p>
      <div class="bar"><i style="width:${Math.round(n / l.lessons.length * 100)}%"></i></div>
      <div class="lvmeta">${open ? `${n}/${l.lessons.length} leçons${ex != null ? ` · Examen : ${ex} %` : ''}` : '🔒 Réussissez l’examen du niveau précédent'}</div></div>
    </a>`;
  }).join('')}</div>
  <div class="install" id="installBox" hidden><div><b>📲 Installer l’application</b><br><span>Ajoutez-la à l’écran d’accueil : elle marche même sans Internet.</span></div><button class="btn pri" id="installBtn">Installer</button></div>
  <div class="about">
    <p><b>Comment ça marche ?</b> Chaque leçon montre une animation de Word (▶ Regarder), puis vous propose de refaire les gestes vous-même (✋ À vous !). Gagnez jusqu’à 3 étoiles par leçon, puis passez l’examen du niveau.</p>
    <p class="small">Application éducative indépendante, non affiliée à Microsoft. Word est une marque de Microsoft Corporation. Les écrans sont des simulations simplifiées de Word pour ordinateur (Microsoft 365, en français) ; l’apparence peut varier selon votre version.</p>
    <button class="btn ghost small" id="resetBtn">Réinitialiser ma progression</button>
  </div>`;
  if (deferredPrompt) $('#installBox').hidden = false;
  $('#installBtn').onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) { } deferredPrompt = null; $('#installBox').hidden = true; };
  const rb = $('#resetBtn'); let armed = false;
  rb.onclick = () => { if (!armed) { armed = true; rb.textContent = 'Touchez encore pour confirmer'; rb.classList.add('warn'); setTimeout(() => { armed = false; rb.textContent = 'Réinitialiser ma progression'; rb.classList.remove('warn'); }, 3500); return; } S = { done: {}, prac: {}, qok: {}, exam: {}, unlock: {} }; save(); setHeader(); viewHome(); };
}

function viewLevel(id) {
  const l = findLevel(id); if (!l) return go('#/');
  const open = unlocked(id), idx = LV.indexOf(l);
  app.innerHTML = `
  <a class="back" href="#/">‹ Niveaux</a>
  <section class="lvhero" style="--lc:${l.color}">${LV_ART[id]}<div><div class="lvtag">Niveau ${idx + 1}</div><h1>${l.emoji} ${l.name}</h1><p>${l.sub}</p></div></section>
  ${open ? '' : `<div class="lockbox">🔒 Ce niveau s’ouvre quand vous réussissez l’examen « ${LV[idx - 1].name} » (70 % ou plus).<br><button class="btn ghost small" id="forceUnlock">Je connais déjà les bases : débloquer</button></div>`}
  <ol class="lessons${open ? '' : ' dim'}">${l.lessons.map((x, i) => `
    <li><a href="${open ? `#/l/${x.id}` : 'javascript:void 0'}" class="lsn${S.done[x.id] ? ' done' : ''}">
      <span class="lnum">${S.done[x.id] ? '✓' : i + 1}</span><span class="lemo">${x.e}</span>
      <span class="ltit">${x.t}</span>${starStr(stars(x.id))}</a></li>`).join('')}
  </ol>
  <a class="exam${open ? '' : ' dim'}" href="${open ? `#/q/${id}` : 'javascript:void 0'}" style="--lc:${l.color}">
    <span class="exi">🎓</span><span><b>Examen du niveau ${l.name}</b><br><small>${l.lessons.length} questions · réussite à 70 %${S.exam[id] != null ? ` · meilleur score : ${S.exam[id]} %` : ''}</small></span><span class="arr">›</span></a>`;
  const fu = $('#forceUnlock'); if (fu) fu.onclick = () => { S.unlock[id] = true; save(); viewLevel(id); };
}

function viewLesson(id) {
  const x = findLesson(id); if (!x) return go('#/');
  const l = findLevel(x.lv), i = l.lessons.indexOf(x), prev = l.lessons[i - 1], next = l.lessons[i + 1];
  app.innerHTML = `
  <a class="back" href="#/n/${l.id}">‹ ${l.name}</a>
  <div class="lhead" style="--lc:${l.color}"><span class="lbig">${x.e}</span><div><div class="lvtag">Leçon ${i + 1} / ${l.lessons.length}</div><h1>${x.t}</h1></div></div>
  <p class="intro">${x.intro}</p>
  <div class="stagecard">
    <div class="stage" id="stage"></div>
    <div class="cap" id="cap"><div class="cap-row"><span class="cap-n">▶</span><span class="cap-t">Touchez <b>Regarder</b> pour voir l’animation.</span></div></div>
    <div class="ctrls"><button class="btn pri" id="bDemo">▶ Regarder</button><button class="btn acc" id="bPrac">✋ À vous !</button></div>
  </div>
  <h2 class="sec">Comment faire</h2>
  <ol class="how">${x.how.map(h => `<li>${h}</li>`).join('')}</ol>
  <div class="box tip"><b>💡 Astuce</b><p>${x.tip}</p></div>
  <div class="box droid"><b>📱 Sur Android</b><p>${x.android}</p></div>
  <h2 class="sec">Vérifiez vos connaissances</h2>
  <div class="qcard" id="qc"></div>
  <div class="lnav">
    ${prev ? `<a class="btn ghost" href="#/l/${prev.id}">‹ Précédente</a>` : '<span></span>'}
    <button class="btn pri" id="bDone">${next ? 'Terminer et continuer ›' : 'Terminer le niveau ✓'}</button>
  </div>`;
  const mock = new Mock($('#stage'), x.scene, $('#cap')); currentMock = mock;
  const done = mode => { if (mode === 'prac' && !S.prac[id]) { S.prac[id] = true; save(); setHeader(); toast('⭐ +1 étoile : exercice réussi !'); } };
  $('#bDemo').onclick = () => mock.play('demo', done);
  $('#bPrac').onclick = () => mock.play('prac', done);
  renderQ($('#qc'), x.q, ok => { if (ok && !S.qok[id]) { S.qok[id] = true; save(); setHeader(); toast('⭐ +1 étoile : bonne réponse !'); } });
  $('#bDone').onclick = () => {
    if (!S.done[id]) { S.done[id] = true; save(); setHeader(); }
    go(next ? `#/l/${next.id}` : `#/n/${l.id}`);
    if (!next) toast('🎓 Toutes les leçons sont faites : passez l’examen !');
  };
}

function renderQ(el, q, cb) {
  el.innerHTML = `<p class="qq">${q.q}</p><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div><div class="fb" hidden></div>`;
  $$('.opt', el).forEach(b => b.onclick = () => {
    const i = +b.dataset.i, ok = i === q.a;
    $$('.opt', el).forEach(x => { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add('good'); });
    if (!ok) b.classList.add('bad');
    const fb = $('.fb', el); fb.hidden = false; fb.className = 'fb ' + (ok ? 'ok' : 'ko');
    fb.innerHTML = `<b>${ok ? '✅ Bravo !' : '❌ Pas tout à fait.'}</b> ${q.why}` + (ok ? '' : ' <button class="btn ghost small retry">Réessayer</button>');
    const r = $('.retry', fb); if (r) r.onclick = () => renderQ(el, q, cb);
    cb(ok);
  });
}

function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function viewQuiz(id) {
  const l = findLevel(id); if (!l) return go('#/');
  if (!unlocked(id)) return go(`#/n/${id}`);
  const qs = shuffle(l.lessons.map(x => x.q)); let k = 0, score = 0;
  const show = () => {
    if (k >= qs.length) return result();
    const q = qs[k];
    app.innerHTML = `<a class="back" href="#/n/${id}">‹ ${l.name}</a>
    <div class="quizhead" style="--lc:${l.color}"><span>🎓 Examen ${l.name}</span><span>${k + 1} / ${qs.length}</span></div>
    <div class="dots">${qs.map((_, i) => `<i class="${i < k ? 'p' : i === k ? 'c' : ''}"></i>`).join('')}</div>
    <div class="qcard big"><p class="qq">${q.q}</p><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('')}</div><div class="fb" hidden></div></div>
    <div class="lnav"><span></span><button class="btn pri" id="nx" hidden>${k + 1 < qs.length ? 'Question suivante ›' : 'Voir mon score ›'}</button></div>`;
    $$('.opt').forEach(b => b.onclick = () => {
      const ok = +b.dataset.i === q.a; if (ok) score++;
      $$('.opt').forEach(x => { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add('good'); });
      if (!ok) b.classList.add('bad');
      const fb = $('.fb'); fb.hidden = false; fb.className = 'fb ' + (ok ? 'ok' : 'ko'); fb.innerHTML = `<b>${ok ? '✅ Exact !' : '❌ Non.'}</b> ${q.why}`;
      $('#nx').hidden = false; $('#nx').onclick = () => { k++; show(); };
    });
  };
  const result = () => {
    const pct = Math.round(score / qs.length * 100), pass = pct >= 70, nextLv = LV[LV.indexOf(l) + 1];
    const first = !(S.exam[id] >= 70) && pass;
    S.exam[id] = Math.max(S.exam[id] || 0, pct); save(); setHeader();
    app.innerHTML = `<div class="result ${pass ? 'pass' : ''}" style="--lc:${l.color}">
      <div class="medal">${pass ? '🏅' : '💪'}</div>
      <h1>${pct} %</h1><p>${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${qs.length}</p>
      <p class="rmsg">${pass ? (nextLv ? `Félicitations ! Le niveau <b>${nextLv.name}</b> est débloqué.` : 'Félicitations ! Vous maîtrisez Word comme un pro. 🏆') : 'Presque ! Revoyez les leçons puis retentez l’examen : il faut 70 %.'}</p>
      <div class="rbtns">${pass && nextLv ? `<a class="btn pri" href="#/n/${nextLv.id}">Niveau ${nextLv.name} ›</a>` : ''}<a class="btn ghost" href="#/q/${id}" id="again">Recommencer</a><a class="btn ghost" href="#/n/${id}">Revoir les leçons</a></div>
    </div>`;
    $('#again').onclick = e => { e.preventDefault(); viewQuiz(id); };
    if (pass) confetti(first ? 90 : 40);
  };
  show();
}

/* ---------- Petits effets ---------- */
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.classList.add('show'), 10); setTimeout(() => { d.classList.remove('show'); setTimeout(() => d.remove(), 400); }, 2400); }
function confetti(n) {
  const c = ['#ff7a59', '#14A396', '#2F6FD0', '#8A3FC2', '#ffd27a', '#5fd486'];
  for (let i = 0; i < n; i++) { const s = document.createElement('i'); s.className = 'conf'; s.style.left = Math.random() * 100 + 'vw'; s.style.background = c[i % c.length]; s.style.animationDelay = Math.random() * 0.8 + 's'; s.style.animationDuration = 2 + Math.random() * 1.8 + 's'; s.style.transform = `rotate(${Math.random() * 360}deg)`; document.body.appendChild(s); setTimeout(() => s.remove(), 5000); }
}

/* ---------- Routeur ---------- */
function go(h) { if (location.hash === h) route(); else location.hash = h; }
function route() {
  if (currentMock) { currentMock.stop(); currentMock = null; }
  const h = location.hash.replace(/^#\/?/, '').split('/');
  if (h[0] === 'n') viewLevel(h[1]);
  else if (h[0] === 'l') viewLesson(h[1]);
  else if (h[0] === 'q') viewQuiz(h[1]);
  else viewHome();
  window.scrollTo(0, 0); setHeader();
}
window.addEventListener('hashchange', route);

/* ---------- Installation (PWA) ---------- */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b = $('#installBox'); if (b) b.hidden = false; });
if ('serviceWorker' in navigator && location.protocol !== 'file:') { window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { })); }

route();
})();
