/**
 * Genera los SVG del README a partir de profile.config.json.
 *
  * Salidas (una sola variante: la paleta sirve en los dos temas de GitHub):
 *   assets/header-<tema>.svg
 *   assets/project-<id>-<tema>.svg   (uno por proyecto)
 *
 * Dos decisiones de estructura:
 *
 * 1. Ningun bloque tiene caja. Sin fondo, sin borde, sin esquinas redondeadas.
 *    Lo que estructura la pagina es la tipografia y una linea de 1px. Un SVG
 *    transparente se apoya sobre el fondo real de GitHub, asi que el perfil se
 *    lee como una pagina compuesta y no como una grilla de tarjetas.
 *
 * 2. Un SVG por proyecto, no uno con los tres. Asi el diagrama de ruteo vive
 *    dentro del bloque de soou — que es de donde sale — y cada proyecto puede
 *    llevar sus links en markdown justo debajo, que es la unica forma de que
 *    sean clickeables: un SVG servido como <img> no admite enlaces.
 *
 * Y no hay emojis: los unicos glifos no tipograficos son paths de lucide.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "assets");

// Tres familias con un trabajo cada una, todas del sistema: un SVG dentro de un
// <img> no carga fuentes web. La serif es la que saca al perfil del aspecto de
// interfaz por defecto — es la unica decision tipografica que se nota de lejos.
const SERIF = "Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua','Times New Roman',serif";
const SANS = "ui-sans-serif,'Helvetica Neue',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";
const MONO = "'Spline Sans Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

const FAMILY = { serif: SERIF, sans: SANS, mono: MONO };

const W = 1000;   // ancho de composicion
const EDGE = 2;   // margen minimo para que ningun trazo quede cortado
const COL = 54;   // columna de texto de los proyectos
const MEASURE = 700; // ancho de lectura comodo: ~75 caracteres por linea
const XML = '<?xml version="1.0" encoding="UTF-8"?>\n';

/* ---------- texto ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const NARROW = new Set(["i", "j", "l", "t", "f", "r", "I", ".", ",", ":", ";", "'", "|", "!", "(", ")", "[", "]", "{", "}", "/", "\\", "-"]);
const WIDE = new Set(["m", "w", "M", "W", "@"]);

function textWidth(str, fontSize, options = {}) {
  const { mono = false, serif = false, tracking = 0 } = options;
  if (mono) return str.length * fontSize * 0.6 + tracking * str.length;
  const k = serif ? 1.05 : 1; // Georgia pisa algo mas ancho que una grotesca
  let w = 0;
  for (const ch of str) {
    if (NARROW.has(ch)) w += 0.3;
    else if (WIDE.has(ch)) w += 0.88;
    else if (ch === " ") w += 0.27;
    else if (ch >= "A" && ch <= "Z") w += 0.67;
    else if (ch >= "0" && ch <= "9") w += 0.56;
    else w += 0.53;
  }
  return w * fontSize * k + tracking * str.length;
}

/** Corta en lineas que entren en `maxWidth`. SVG no reparte texto solo. */
function wrapText(str, maxWidth, fontSize, options = {}) {
  const lines = [];
  let line = "";
  for (const word of String(str).split(/\s+/)) {
    const probe = line ? line + " " + word : word;
    if (line && textWidth(probe, fontSize, options) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = probe;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(str, x, y, opts = {}) {
  const {
    font = "sans", size = 14, weight = null, fill = "#000",
    opacity = null, tracking = null, anchor = null,
  } = opts;
  return (
    '<text x="' + x + '" y="' + y + '" font-family="' + (FAMILY[font] || SANS) +
    '" font-size="' + size + '" fill="' + fill + '"' +
    (weight ? ' font-weight="' + weight + '"' : "") +
    (opacity ? ' opacity="' + opacity + '"' : "") +
    (tracking ? ' letter-spacing="' + tracking + '"' : "") +
    (anchor ? ' text-anchor="' + anchor + '"' : "") +
    ">" + esc(str) + "</text>"
  );
}

const rule = (x1, y, x2, color, opacity = 1) =>
  '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y +
  '" stroke="' + color + '" stroke-width="1"' + (opacity !== 1 ? ' opacity="' + opacity + '"' : "") + "/>";

const svg = (height, label, body) =>
  XML +
  '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + height +
  '" viewBox="0 0 ' + W + " " + height + '" role="img" aria-label="' + esc(label) + '">\n  ' +
  body + "\n</svg>\n";

/* ---------- iconos de interfaz (lucide) ---------- */

async function uiBody(name) {
  const raw = await readFile(join(ASSETS, "icons", "ui", name + ".svg"), "utf8");
  const body = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!body) throw new Error("sin contenido en ui/" + name + ".svg");
  return body[1].replace(/\s*\n\s*/g, " ").trim();
}

const uiIcon = (body, x, y, size, color, strokeWidth = 1.7) =>
  '<g transform="translate(' + x + " " + y + ") scale(" + (size / 24).toFixed(4) + ')" ' +
  'fill="none" stroke="' + color + '" stroke-width="' + strokeWidth + '" ' +
  'stroke-linecap="round" stroke-linejoin="round">' + body + "</g>";

/* ---------- cabecera ---------- */

async function buildHeader(cfg, lang) {
  const t = cfg.palette;
  const id = cfg.identity;
  const L = cfg.i18n[lang];
  const parts = [];

  // Dos columnas: retrato a la izquierda, identidad a la derecha. Va todo
  // dentro del mismo SVG y no en una <table> de markdown porque GitHub le
  // dibuja borde a cada celda, que es justo la caja que este diseno evita.
  const AV = 148;
  const COLX = 184;

  const av = await embedPng("avatar.png", AV);
  parts.push('<clipPath id="av"><rect x="' + EDGE + '" y="14" width="' + av.width +
    '" height="' + AV + '" rx="5"/></clipPath>');
  parts.push('<image x="' + EDGE + '" y="14" width="' + av.width + '" height="' + AV +
    '" href="' + av.href + '" clip-path="url(#av)"/>');

  parts.push(text(id.name, COLX, 56, { font: "serif", size: 44, weight: 700, fill: t.strong, tracking: -0.5 }));
  parts.push('<rect x="' + (COLX + 1) + '" y="70" width="52" height="3" fill="' + t.accent + '"/>');
  parts.push(text(L.role, COLX, 102, { size: 17, weight: 600, fill: t.strong }));

  let y = 126;
  for (const line of wrapText(L.tagline, W - COLX - EDGE - 30, 14)) {
    parts.push(text(line, COLX, y, { size: 14, fill: t.text }));
    y += 20;
  }

  const locW = textWidth(id.location, 12, { mono: true });
  const clockX = COLX + 14 + 7 + locW + 24;
  parts.push(uiIcon(await uiBody("map-pin"), COLX, y - 4, 13, t.faint));
  parts.push(text(id.location, COLX + 19, y + 6, { font: "mono", size: 12, fill: t.faint }));
  parts.push(uiIcon(await uiBody("clock"), clockX, y - 4, 13, t.faint));
  parts.push(text(id.timezone, clockX + 19, y + 6, { font: "mono", size: 12, fill: t.faint }));

  const bottom = Math.max(14 + AV, y + 12) + 20;
  parts.push(rule(EDGE, bottom, W - EDGE, t.rule));

  return svg(bottom + 10, id.name + " - " + L.role, parts.join("\n  "));
}

/* ---------- el arbol de ruteo ---------- */

/**
 * Dibuja el flujo a partir de `y`, indentado en la columna del proyecto.
 * El contenido es un arbol de decision, asi que se dibuja como arbol:
 * cualquier otra forma obligaria a reconstruir el orden en vez de verlo.
 * Devuelve el markup y la `y` donde termina.
 */
function renderFlow(cfg, lang, t, y0) {
  const p = cfg.i18n[lang].pipeline;
  const method = cfg.i18n[lang].method;
  const SPINE = COL + 6;
  const NODE = COL + 52;
  const LABEL = COL + 70;
  const MODEL = COL + 468;
  const ROW_GAP = 48;

  const parts = [];
  const row0 = y0 + 54;
  const lastY = row0 + (p.levels.length - 1) * ROW_GAP;

  parts.push(text(p.caption.toUpperCase(), COL, y0 + 10, {
    font: "mono", size: 10.5, weight: 500, fill: t.accent, tracking: 1.8,
  }));

  parts.push('<circle cx="' + SPINE + '" cy="' + (y0 + 34) + '" r="4.5" fill="' + t.accent + '"/>');
  parts.push(text(p.entry.toUpperCase(), SPINE + 16, y0 + 39, {
    font: "mono", size: 10.5, weight: 500, fill: t.muted, tracking: 1.6,
  }));
  parts.push('<line x1="' + SPINE + '" y1="' + (y0 + 43) + '" x2="' + SPINE + '" y2="' + lastY +
    '" stroke="' + t.rule + '" stroke-width="1.5"/>');

  p.levels.forEach((lvl, i) => {
    const y = row0 + i * ROW_GAP;

    parts.push('<line x1="' + SPINE + '" y1="' + y + '" x2="' + (NODE - 5) + '" y2="' + y +
      '" stroke="' + t.rule + '" stroke-width="1.5"/>');
    parts.push('<circle cx="' + NODE + '" cy="' + y + '" r="3.5" fill="' + t.accent +
      '" opacity="' + lvl.weight + '"/>');
    parts.push(text(lvl.name, LABEL, y + 5, { size: 15.5, weight: 600, fill: t.strong }));

    const from = LABEL + textWidth(lvl.name, 15.5) + 16;
    parts.push('<line x1="' + from.toFixed(1) + '" y1="' + y + '" x2="' + (MODEL - 22) + '" y2="' + y +
      '" stroke="' + t.faint + '" stroke-width="1" stroke-dasharray="1 5" ' +
      'stroke-linecap="round" opacity="0.75"/>');
    parts.push('<path d="M ' + (MODEL - 16) + " " + (y - 4) + ' l 5 4 l -5 4" fill="none" stroke="' +
      t.faint + '" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>');
    parts.push(text(lvl.model, MODEL, y + 5, { font: "mono", size: 13, fill: t.text }));

    if (lvl.note) {
      parts.push('<path d="M ' + (MODEL + 6) + " " + (y + 14) + ' v 10 q 0 5 5 5 h 6" fill="none" stroke="' +
        t.rule + '" stroke-width="1.2"/>');
      parts.push(text(lvl.note, MODEL + 24, y + 33, { size: 12.5, fill: t.faint }));
    }
  });

  let y = lastY + 54;
  parts.push(rule(COL, y, W - EDGE, t.rule, 0.8));
  y += 22;
  parts.push(text(p.footer, COL, y, { font: "mono", size: 12, fill: t.muted }));
  y += 30;

  // reglas de operacion
  const LABEL_COL = COL + 142;
  method.forEach(([label, value], i) => {
    parts.push(text(label.toUpperCase(), COL, y + 12, {
      font: "mono", size: 10.5, weight: 500, fill: t.accent, tracking: 1.6,
    }));
    parts.push(text(value, LABEL_COL, y + 12, { size: 13.5, fill: t.text }));
    if (i < method.length - 1) parts.push(rule(COL, y + 23, W - EDGE, t.rule, 0.55));
    y += 32;
  });

  // hilo de acento que ata todo el flujo al proyecto
  parts.unshift('<rect x="' + (COL - 20) + '" y="' + (y0 - 4) + '" width="2" height="' +
    (y - y0 - 8) + '" fill="' + t.accent + '" opacity="0.45"/>');

  return { markup: parts.join("\n  "), y: y + 2 };
}

/* ---------- logotipo incrustado ---------- */

/** Alto y ancho reales desde la cabecera IHDR del PNG. */
const pngSize = (buf) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });

/**
 * Devuelve el logotipo del proyecto como data URI, escalado a `height`.
 * Va incrustado y no referenciado: un SVG dentro de un <img> no carga
 * recursos externos, asi que una ruta relativa no se veria.
 */
async function embedPng(file, height) {
  const buf = await readFile(join(ASSETS, file));
  const { w, h } = pngSize(buf);
  return {
    href: "data:image/png;base64," + buf.toString("base64"),
    width: Math.round((w * height) / h),
    height,
  };
}

/* ---------- un proyecto ---------- */

async function buildProject(cfg, lang, index) {
  const t = cfg.palette;
  const spec = cfg.projects[index];
  const pr = { ...spec, ...cfg.i18n[lang].projects[spec.id] };
  const isLast = index === cfg.projects.length - 1;
  const parts = [];
  let y = 12;

  parts.push(text(String(index + 1).padStart(2, "0"), EDGE, y + 20, {
    font: "mono", size: 12, weight: 500, fill: t.accent,
  }));

  if (pr.mark) {
    // El proyecto que tiene marca propia se titula con ella, no con texto.
    const m = await embedPng(pr.mark + ".png", 32);
    parts.push('<image x="' + COL + '" y="' + (y + 1) + '" width="' + m.width +
      '" height="' + m.height + '" href="' + m.href + '"/>');
  } else {
    parts.push(text(pr.name, COL, y + 26, {
      font: "serif", size: 28, weight: 700, fill: t.strong, tracking: -0.3,
    }));
  }

  parts.push(text(pr.meta.toUpperCase(), W - EDGE, y + 19, {
    font: "mono", size: 10.5, fill: t.faint, tracking: 1.6, anchor: "end",
  }));

  y += 58;
  for (const line of wrapText(pr.summary, MEASURE, 15)) {
    parts.push(text(line, COL, y, { size: 15, fill: t.text }));
    y += 24;
  }

  y += 5;
  parts.push(text(pr.detail, COL, y, { font: "mono", size: 12.5, fill: t.muted }));
  y += 14;

  if (pr.flow) {
    const flow = renderFlow(cfg, lang, t, y + 26);
    parts.push(flow.markup);
    y = flow.y;
  }

  if (!isLast) {
    y += 22;
    parts.push(rule(EDGE, y, W - EDGE, t.rule, 0.8));
    y += 4;
  }

  const label = pr.name + " (" + pr.meta + "): " + pr.summary +
    (pr.flow
      ? " " + cfg.i18n[lang].pipeline.caption + ": " +
        cfg.i18n[lang].pipeline.levels.map((l) => l.name + " -> " + l.model).join("; ") + "."
      : "");

  return svg(y + 8, label, parts.join("\n  "));
}

/* ---------- main ---------- */

/* ---------- estadisticas ---------- */

/**
 * Numeros reales de la API de GitHub, dibujados por nosotros.
 *
 * No se usa ninguna tarjeta de terceros: esas son imagenes alojadas fuera y
 * cuando al servicio se le acaba la cuota el perfil queda con un hueco. Los
 * datos salen de stats.json, que actualiza `npm run stats`.
 */
async function buildStats(cfg, lang) {
  const t = cfg.palette;
  const L = cfg.i18n[lang].stats;
  const d = JSON.parse(await readFile(join(ROOT, "stats.json"), "utf8"));
  const parts = [];

  parts.push(text(L.caption.toUpperCase(), EDGE, 12, {
    font: "mono", size: 10.5, weight: 500, fill: t.accent, tracking: 1.8,
  }));
  parts.push(text(L.asof + " " + d.updated, W - EDGE, 12, {
    font: "mono", size: 10.5, fill: t.faint, tracking: 0.6, anchor: "end",
  }));
  parts.push(rule(EDGE, 26, W - EDGE, t.rule, 0.7));

  const figures = [
    [String(d.commits), L.commits, null],
    [String(d.prs), L.prs, d.merged + " " + L.merged],
    [String(d.repos), L.repos, null],
  ];

  let x = EDGE;
  for (const [value, label, note] of figures) {
    parts.push(text(value, x, 72, { font: "serif", size: 38, weight: 700, fill: t.strong, tracking: -0.5 }));
    parts.push(text(label, x + 2, 94, { font: "mono", size: 11, fill: t.muted, tracking: 0.8 }));
    if (note) parts.push(text(note, x + 2, 111, { font: "mono", size: 10.5, fill: t.faint, tracking: 0.4 }));
    x += 232;
  }

  // los lenguajes, por cantidad de repos, en la cuarta columna
  parts.push(text(L.languages.toUpperCase(), x + 2, 50, {
    font: "mono", size: 10.5, fill: t.faint, tracking: 1.6,
  }));
  let ly = 72;
  for (const l of d.languages.slice(0, 5)) {
    parts.push(text(l.name, x + 2, ly, { size: 13, fill: t.text }));
    parts.push(text(String(l.count), W - EDGE, ly, { font: "mono", size: 12, fill: t.faint, anchor: "end" }));
    ly += 19;
  }

  const H = Math.max(ly + 6, 128);
  const label = L.caption + ": " + d.commits + " " + L.commits + ", " + d.prs + " " + L.prs +
    " (" + d.merged + " " + L.merged + "), " + d.repos + " " + L.repos + ".";
  return svg(H, label, parts.join("\n  "));
}

async function main() {
  const cfg = JSON.parse(await readFile(join(ROOT, "profile.config.json"), "utf8"));
  await mkdir(ASSETS, { recursive: true });

  // Un solo juego de archivos por idioma: la paleta sirve en tema claro y
  // oscuro, asi que no hay variante que GitHub pueda elegir mal.
  let n = 0;
  for (const lang of Object.keys(cfg.i18n)) {
    const outputs = [
      ["header-" + lang + ".svg", await buildHeader(cfg, lang)],
      ["stats-" + lang + ".svg", await buildStats(cfg, lang)],
    ];
    for (let i = 0; i < cfg.projects.length; i++) {
      outputs.push(["project-" + cfg.projects[i].id + "-" + lang + ".svg", await buildProject(cfg, lang, i)]);
    }
    for (const [file, out] of outputs) {
      await writeFile(join(ASSETS, file), out, "utf8");
      n++;
    }
    console.log("generado  " + lang + "  (" + outputs.length + " bloques)");
  }
  console.log(n + " archivos en assets/");
}

main();
