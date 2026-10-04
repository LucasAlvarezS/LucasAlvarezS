/**
 * Arma preview.html con todos los bloques en ambos temas y lo abre en el
 * navegador. Sirve para revisar un cambio sin tener que hacer push.
 *
 * Renderiza a 870px, que es el ancho real de la columna del perfil en GitHub:
 * a 1000px todo se ve mas grande de lo que se vera publicado.
 * El archivo esta en .gitignore.
 */
import { writeFile, readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "preview.html");

const panel = (lang, mode, bg, ink, files) => `
  <section style="background:${bg};padding:40px 0">
    <div style="width:870px;margin:0 auto">
      <p style="font:500 11px ui-monospace,monospace;letter-spacing:1.4px;margin:0 0 20px;color:${ink}">
        ${lang.toUpperCase()} &middot; TEMA ${mode.toUpperCase()} &middot; 870px, el ancho real de la columna del perfil</p>
      ${files
        .map((f) => `<img src="assets/${f}" alt="${f}" style="display:block;width:100%;margin-bottom:14px">`)
        .join("\n      ")}
    </div>
  </section>`;

async function main() {
  const cfg = JSON.parse(await readFile(join(ROOT, "profile.config.json"), "utf8"));
  const assets = await readdir(join(ROOT, "assets"));

  // mismo orden que el README: cabecera y despues cada proyecto
  const order = ["header", "stats", ...cfg.projects.map((p) => "project-" + p.id)];
  // una sola variante por idioma; el preview la pone sobre los dos fondos
  // de GitHub para comprobar que se lee en los dos
  const pick = (lang) => order.map((b) => `${b}-${lang}.svg`).filter((f) => assets.includes(f));

  // el idioma primario primero: es el que ve GitHub en el perfil
  const langs = [cfg.primary, ...Object.keys(cfg.i18n).filter((l) => l !== cfg.primary)];
  const panels = langs
    .flatMap((l) => [
      panel(l, "oscuro", "#0D1117", "#8E8884", pick(l)),
      panel(l, "claro", "#FFFFFF", "#8E8884", pick(l)),
    ])
    .join("\n");

  const html = `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><title>Preview del perfil</title><style>body{margin:0}</style></head>
<body>
${panels}
</body>
</html>
`;

  await writeFile(OUT, html, "utf8");
  const url = pathToFileURL(OUT).href;
  console.log("preview  " + url);

  const opener =
    process.platform === "win32"
      ? ["cmd", ["/c", "start", "", url]]
      : process.platform === "darwin"
        ? ["open", [url]]
        : ["xdg-open", [url]];

  spawn(opener[0], opener[1], { detached: true, stdio: "ignore" }).unref();
}

main();
