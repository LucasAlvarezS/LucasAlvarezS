/**
 * Descarga los SVG originales de lucide a assets/icons/ui/.
 *
 * Regla del proyecto: ningun glifo ni emoji. Los pocos iconos que usa el perfil
 * salen de una libreria real (https://lucide.dev) y quedan versionados en el
 * repo, para que el README no dependa de un CDN externo.
 *
 * El diseno actual no usa logos de marca: el stack va como una linea de texto,
 * no como una grilla de chips.
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets", "icons", "ui");
const LUCIDE = "https://cdn.jsdelivr.net/npm/lucide-static@1/icons";

const exists = (p) => access(p).then(() => true, () => false);

async function main() {
  const force = process.argv.includes("--force");
  const config = JSON.parse(await readFile(join(ROOT, "profile.config.json"), "utf8"));
  await mkdir(OUT, { recursive: true });

  let fresh = 0;
  let cached = 0;

  for (const name of config.ui_icons) {
    const dest = join(OUT, name + ".svg");
    if (!force && (await exists(dest))) {
      cached++;
      console.log("cache  " + name);
      continue;
    }
    const res = await fetch(LUCIDE + "/" + name + ".svg");
    if (!res.ok) {
      console.error("fallo  " + name + ": " + res.status + " " + res.statusText);
      process.exitCode = 1;
      continue;
    }
    await writeFile(dest, (await res.text()).trimEnd() + "\n", "utf8");
    fresh++;
    console.log("ok     " + name);
  }

  console.log("\n" + fresh + " descargados, " + cached + " ya presentes.");
}

main();
