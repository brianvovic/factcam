// Proof verifier. Everything runs in this browser: files are read with the
// File API, hashed with WebCrypto, ZIPs are unpacked with
// DecompressionStream. Nothing is uploaded; this script makes no requests.
(() => {
  const $ = (id) => document.getElementById(id);
  const T = (k, en) => (window.siteT ? window.siteT(k, en) : en);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { items: [], index: new Map() }; // index: sha/id -> expected record

  // ---------- hashing ----------
  async function sha256(buf) {
    const d = await crypto.subtle.digest('SHA-256', buf);
    return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // ---------- EXIF (tags written by the app) ----------
  function readExif(buf) {
    const v = new DataView(buf);
    if (v.byteLength < 4 || v.getUint16(0) !== 0xFFD8) return null;
    let p = 2;
    while (p + 4 < v.byteLength) {
      const marker = v.getUint16(p);
      const len = v.getUint16(p + 2);
      if (marker === 0xFFE1 && v.getUint32(p + 4) === 0x45786966) return parseTiff(v, p + 10);
      if ((marker & 0xFF00) !== 0xFF00 || marker === 0xFFDA) break;
      p += 2 + len;
    }
    return null;
  }

  function parseTiff(v, t) {
    const le = v.getUint16(t) === 0x4949;
    const u16 = (o) => v.getUint16(t + o, le);
    const u32 = (o) => v.getUint32(t + o, le);
    const out = {};
    const str = (off, n) => {
      let s = '';
      for (let i = 0; i < n && t + off + i < v.byteLength; i++) {
        const c = v.getUint8(t + off + i);
        if (!c) break;
        s += String.fromCharCode(c);
      }
      try { return decodeURIComponent(escape(s)); } catch (_) { return s; } // UTF-8 bytes -> text
    };
    function ifd(off, tags) {
      if (!off || t + off + 2 > v.byteLength) return;
      const n = u16(off);
      for (let i = 0; i < n; i++) {
        const e = off + 2 + i * 12;
        const tag = u16(e), type = u16(e + 2), count = u32(e + 4);
        const name = tags[tag];
        if (!name) continue;
        const size = ({ 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 })[type] || 1;
        const valOff = size * count > 4 ? u32(e + 8) : e + 8;
        if (type === 2) out[name] = str(valOff, count);
        else if (type === 3) out[name] = u16(valOff);
        else if (type === 4) out[name] = u32(valOff);
        else if (type === 5) {
          const r = [];
          for (let k = 0; k < count; k++) r.push(u32(valOff + k * 8) / (u32(valOff + k * 8 + 4) || 1));
          out[name] = r;
        } else if (type === 7) out[name] = str(valOff + 8, Math.max(0, count - 8));
      }
    }
    ifd(u32(4), { 0x010E: 'description', 0x0110: 'model', 0x0131: 'software', 0x0132: 'modified', 0x8769: 'exifPtr', 0x8825: 'gpsPtr' });
    if (out.exifPtr) ifd(out.exifPtr, { 0x9003: 'taken', 0x9011: 'offset', 0xA420: 'proofId' });
    if (out.gpsPtr) ifd(out.gpsPtr, { 1: 'latRef', 2: 'lat', 3: 'lngRef', 4: 'lng', 0x1F: 'hErr' });
    const dms = (a) => (a && a.length === 3 ? a[0] + a[1] / 60 + a[2] / 3600 : null);
    let lat = dms(out.lat), lng = dms(out.lng);
    if (lat != null && out.latRef === 'S') lat = -lat;
    if (lng != null && out.lngRef === 'W') lng = -lng;
    return {
      taken: out.taken || '',
      offset: out.offset || '',
      lat, lng,
      accuracy: Array.isArray(out.hErr) ? out.hErr[0] : null,
      proofId: out.proofId || '',
      description: out.description || '',
      software: out.software || '',
    };
  }

  // ---------- ZIP (store + deflate, as exported by the app) ----------
  async function unzip(buf) {
    const v = new DataView(buf);
    let eocd = -1;
    for (let i = v.byteLength - 22; i >= Math.max(0, v.byteLength - 65557); i--) {
      if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Not a ZIP file');
    const count = v.getUint16(eocd + 10, true);
    let p = v.getUint32(eocd + 16, true);
    const files = [];
    const dec = new TextDecoder();
    for (let i = 0; i < count; i++) {
      if (v.getUint32(p, true) !== 0x02014b50) break;
      const method = v.getUint16(p + 10, true);
      const csize = v.getUint32(p + 20, true);
      const nlen = v.getUint16(p + 28, true), xlen = v.getUint16(p + 30, true), clen = v.getUint16(p + 32, true);
      const local = v.getUint32(p + 42, true);
      const name = dec.decode(new Uint8Array(buf, p + 46, nlen));
      p += 46 + nlen + xlen + clen;
      if (name.endsWith('/')) continue;
      const lnlen = v.getUint16(local + 26, true), lxlen = v.getUint16(local + 28, true);
      const start = local + 30 + lnlen + lxlen;
      const raw = buf.slice(start, start + csize);
      files.push({ name, method, raw });
    }
    for (const f of files) {
      if (f.method === 0) f.data = f.raw;
      else if (f.method === 8) {
        if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot unzip; please update it.');
        const ds = new Blob([f.raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        f.data = await new Response(ds).arrayBuffer();
      } else f.data = null;
    }
    return files;
  }

  // ---------- proof text parsing ----------
  function parseText(text) {
    const blocks = [];
    const hashes = [...text.matchAll(/\b[0-9a-fA-F]{64}\b/g)].map((m) => m[0].toLowerCase());
    // Each hash keeps the ID/time/GPS written in the same paragraph.
    for (const h of hashes) {
      const at = text.toLowerCase().indexOf(h);
      const from = Math.max(0, text.lastIndexOf('\n\n', at));
      const to = text.indexOf('\n\n', at + 64);
      const chunk = text.slice(from, to < 0 ? undefined : to);
      blocks.push({ sha: h, ...fields(chunk.length > 40 ? chunk : text) });
    }
    if (!hashes.length && text.trim()) blocks.push({ sha: '', ...fields(text) });
    return blocks;
  }

  function fields(chunk) {
    const id = (chunk.match(/(?:Proof\s*ID|ID)\s*[:#]?\s*([0-9A-F]{8})\b/i) || [])[1] || '';
    const gps = chunk.match(/(-?\d{1,2}\.\d{4,})\s*,\s*(-?\d{1,3}\.\d{4,})/);
    const time = (chunk.match(/(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2})/) || [])[1] || '';
    return { id: id.toUpperCase(), lat: gps ? +gps[1] : null, lng: gps ? +gps[2] : null, time };
  }

  function metersBetween(a, b, c, d) {
    const R = 6371000, toR = Math.PI / 180;
    const dLat = (c - a) * toR, dLng = (d - b) * toR;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a * toR) * Math.cos(c * toR) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }

  // ---------- checks ----------
  function expectedFor(item, blocks) {
    const byHash = blocks.find((b) => b.sha && b.sha === item.hash) || state.index.get(item.hash);
    if (byHash) return { ...byHash, matchedBy: 'hash' };
    const id = (item.exif && item.exif.proofId) || idFromName(item.name);
    if (id) {
      const byId = blocks.find((b) => b.id === id) || state.index.get('id:' + id);
      if (byId) return { ...byId, matchedBy: 'id' };
    }
    if (blocks.length === 1 && state.items.length === 1) return { ...blocks[0], matchedBy: 'only' };
    return null;
  }

  function idFromName(name) {
    const m = String(name).match(/_([0-9A-F]{8})(?:_original)?\.(jpe?g|png|mp4)$/i);
    return m ? m[1].toUpperCase() : '';
  }

  function evaluate(item, blocks) {
    const exp = expectedFor(item, blocks);
    const checks = [];
    let verdict = 'info';
    if (exp && exp.sha) {
      const same = exp.sha === item.hash;
      checks.push([same ? 'ok' : 'bad', same ? T('c.hashok', 'Fingerprint matches the proof') : T('c.hashbad', 'Fingerprint is different – the file was changed or re-compressed')]);
      verdict = same ? 'ok' : 'bad';
    } else {
      checks.push(['warn', T('c.nohash', 'No fingerprint to compare – paste the proof text or add the backup ZIP')]);
    }
    const e = item.exif;
    if (e) {
      if (exp && exp.id && e.proofId) {
        checks.push(exp.id === e.proofId ? ['ok', T('c.idok', 'Proof ID in the file matches') + ` (${esc(e.proofId)})`] : ['bad', T('c.idbad', 'Proof ID in the file is different')]);
      }
      if (exp && exp.lat != null && e.lat != null) {
        const d = metersBetween(exp.lat, exp.lng, e.lat, e.lng);
        checks.push(d <= 50 ? ['ok', T('c.gpsok', 'GPS in the file matches the proof') + ` (${Math.round(d)} m)`] : ['bad', T('c.gpsbad', 'GPS in the file is far from the proof') + ` (${Math.round(d)} m)`]);
      }
      if (exp && exp.time && e.taken) {
        const a = exp.time.replace('T', ' ').slice(0, 16);
        const b = e.taken.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3').slice(0, 16);
        checks.push(a === b ? ['ok', T('c.timeok', 'Capture time in the file matches the proof')] : ['warn', T('c.timediff', 'Capture time differs from the proof text') + ` (${esc(b)})`]);
      }
      if (/factcam/i.test(e.software)) checks.push(['ok', T('c.sw', 'Made with the app (metadata present)')]);
      else if (e.software) checks.push(['warn', T('c.swother', 'Last saved by another program') + `: ${esc(e.software)}`]);
    } else if (item.kind === 'image') {
      checks.push(['warn', T('c.noexif', 'No metadata found – the photo may have been re-saved or sent through a chat app')]);
    }
    return { exp, checks, verdict };
  }

  // ---------- rendering ----------
  function render() {
    const out = $('results');
    const blocks = parseText($('expected').value);
    if (!state.items.length) {
      out.innerHTML = `<div class="empty-state">${esc(T('v.empty', 'Results will appear here.'))}</div>`;
      $('summary').innerHTML = '';
      return;
    }
    let ok = 0, bad = 0;
    out.innerHTML = state.items.map((it) => {
      if (it.pending) return `<div class="res"><div class="thumb empty">…</div><div><h4>${esc(it.name)}</h4><p class="muted">${esc(T('v.checking', 'Checking…'))}</p></div></div>`;
      if (it.error) return `<div class="res bad"><div class="thumb empty">!</div><div><h4>${esc(it.name)}</h4><p>${esc(it.error)}</p></div></div>`;
      const r = evaluate(it, blocks);
      if (r.verdict === 'ok') ok++;
      if (r.verdict === 'bad') bad++;
      const chip = r.verdict === 'ok'
        ? `<span class="chip ok">✓ ${esc(T('v.match', 'Match – file unchanged'))}</span>`
        : r.verdict === 'bad'
          ? `<span class="chip bad">✕ ${esc(T('v.nomatch', 'Does not match the proof'))}</span>`
          : `<span class="chip info">${esc(T('v.nohash', 'Fingerprint calculated'))}</span>`;
      const e = it.exif || {};
      const rows = [
        [T('r.file', 'File'), `${esc(it.name)} · ${(it.size / 1048576).toFixed(2)} MB${it.from ? ' · ' + esc(it.from) : ''}`],
        ['SHA-256', `<span class="mono">${it.hash}</span>`],
      ];
      if (e.taken) rows.push([T('r.taken', 'Taken'), esc(e.taken.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3') + (e.offset ? ' ' + e.offset : ''))]);
      if (e.lat != null && e.lng != null) {
        rows.push(['GPS', `${e.lat.toFixed(6)}, ${e.lng.toFixed(6)}${e.accuracy ? ' ±' + Math.round(e.accuracy) + ' m' : ''} · <a href="https://www.openstreetmap.org/?mlat=${e.lat}&mlon=${e.lng}#map=18/${e.lat}/${e.lng}" target="_blank" rel="noopener">${esc(T('r.map', 'map'))}</a>`]);
      }
      if (e.proofId) rows.push([T('r.id', 'Proof ID'), esc(e.proofId)]);
      if (e.description) rows.push([T('r.details', 'Details'), esc(e.description)]);
      const thumb = it.url ? `<img class="thumb" src="${it.url}" alt="">` : `<div class="thumb empty">${it.kind === 'video' ? '▶ MP4' : '—'}</div>`;
      return `<div class="res ${r.verdict}">${thumb}<div><h4>${chip}</h4>
        <ul class="checklist">${r.checks.map(([s, txt]) => `<li><span class="s ${s}">${s === 'ok' ? '✓' : s === 'bad' ? '✕' : '!'}</span><span>${txt}</span></li>`).join('')}</ul>
        <table class="kv">${rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${v}</td></tr>`).join('')}</table></div></div>`;
    }).join('');
    const total = state.items.filter((i) => !i.pending && !i.error).length;
    $('summary').innerHTML = `<span class="chip info">${total} ${esc(T('s.files', 'files'))}</span>`
      + (ok ? ` <span class="chip ok">✓ ${ok} ${esc(T('s.ok', 'matched'))}</span>` : '')
      + (bad ? ` <span class="chip bad">✕ ${bad} ${esc(T('s.bad', 'not matching'))}</span>` : '');
  }

  async function addFile(file, from) {
    const item = { name: file.name, size: file.size, pending: true, from };
    state.items.push(item);
    render();
    try {
      const buf = await file.arrayBuffer();
      item.hash = await sha256(buf);
      const type = file.type || '';
      item.kind = type.startsWith('video') || /\.mp4$/i.test(file.name) ? 'video' : 'image';
      if (item.kind === 'image') {
        try { item.exif = readExif(buf); } catch (_) { item.exif = null; }
        item.url = URL.createObjectURL(new Blob([buf], { type: type || 'image/jpeg' }));
      }
    } catch (e) {
      item.error = String(e.message || e);
    }
    item.pending = false;
    render();
  }

  function loadIndex(records, label) {
    for (const r of records) {
      const rec = { sha: (r.sha256 || '').toLowerCase(), id: (r.id || '').toUpperCase(), lat: r.lat ?? null, lng: r.lng ?? null, time: '', file: r.file, from: label };
      if (rec.sha) state.index.set(rec.sha, rec);
      if (rec.id) state.index.set('id:' + rec.id, rec);
    }
  }

  async function handleFiles(list) {
    for (const file of list) {
      if (/\.zip$/i.test(file.name) || file.type === 'application/zip') {
        try {
          const entries = await unzip(await file.arrayBuffer());
          const index = entries.find((f) => /(^|\/)index\.json$/i.test(f.name));
          if (index && index.data) loadIndex(JSON.parse(new TextDecoder().decode(index.data)), file.name);
          for (const f of entries) {
            if (!/^photos\//i.test(f.name) || !f.data) continue;
            const base = f.name.split('/').pop();
            const type = /\.mp4$/i.test(base) ? 'video/mp4' : /\.png$/i.test(base) ? 'image/png' : 'image/jpeg';
            await addFile(new File([f.data], base, { type }), file.name);
          }
        } catch (e) {
          state.items.push({ name: file.name, size: file.size, error: String(e.message || e) });
          render();
        }
      } else if (/\.json$/i.test(file.name)) {
        try { loadIndex(JSON.parse(await file.text()), file.name); render(); } catch (_) {}
      } else if (/\.(txt|csv)$/i.test(file.name)) {
        $('expected').value += (($('expected').value ? '\n\n' : '') + await file.text());
        render();
      } else {
        await addFile(file);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const drop = $('drop'), input = $('file');
    input.addEventListener('change', () => { handleFiles([...input.files]); input.value = ''; });
    ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', (e) => handleFiles([...e.dataTransfer.files]));
    $('expected').addEventListener('input', render);
    $('clear').addEventListener('click', () => {
      state.items.forEach((i) => i.url && URL.revokeObjectURL(i.url));
      state.items = [];
      state.index.clear();
      $('expected').value = '';
      render();
    });
    $('print').addEventListener('click', () => window.print());
    document.addEventListener('langchange', render);
    render();
  });

  // Test hook for automated checks (no effect for visitors).
  window.__verifier = { handleFiles, state, parseText };
})();
