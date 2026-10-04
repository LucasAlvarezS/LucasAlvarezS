/**
 * Trae las estadisticas desde la API de GitHub y las guarda en stats.json.
 *
 * Datos de GitHub, sin servicios de terceros: no hay ninguna imagen externa
 * en el perfil, asi que nada se rompe cuando a un servicio se le acaba la
 * cuota. La contrapartida es que los numeros son de la ultima vez que se
 * corrio esto, por eso el archivo guarda la fecha.
 *
 *   npm run stats     actualiza stats.json
 *   npm run build     lo dibuja
 */
import { writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.github.com";

async function get(path, headers = {}) {
  const res = await fetch(API + path, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "profile-build", ...headers },
  });
  if (!res.ok) throw new Error(res.status + " " + res.statusText + " en " + path);
  return res.json();
}

async function main() {
  const cfg = JSON.parse(await readFile(join(ROOT, "profile.config.json"), "utf8"));
  const user = cfg.identity.username;

  const [commits, prs, merged, repos] = await Promise.all([
    get("/search/commits?q=author:" + user + "&per_page=1", {
      Accept: "application/vnd.github.cloak-preview+json",
    }),
    get("/search/issues?q=author:" + user + "+type:pr&per_page=1"),
    get("/search/issues?q=author:" + user + "+type:pr+is:merged&per_page=1"),
    get("/users/" + user + "/repos?per_page=100"),
  ]);

  const own = repos.filter((r) => !r.fork);
  const langs = {};
  for (const r of own) if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;

  const stats = {
    _nota: "Generado por scripts/fetch-stats.mjs. No editar a mano: correr npm run stats.",
    updated: new Date().toISOString().slice(0, 10),
    commits: commits.total_count,
    prs: prs.total_count,
    merged: merged.total_count,
    repos: own.length,
    languages: Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  };

  await writeFile(join(ROOT, "stats.json"), JSON.stringify(stats, null, 2) + "\n", "utf8");

  console.log("stats.json actualizado (" + stats.updated + ")");
  console.log("  commits      " + stats.commits);
  console.log("  pull requests " + stats.prs + " (" + stats.merged + " mergeados)");
  console.log("  repositorios  " + stats.repos);
  console.log("  lenguajes     " + stats.languages.map((l) => l.name + " " + l.count).join(" · "));
}

main();
