# Ideas tomadas de perfiles conocidos

Referencias reales, revisadas una por una. Para cada perfil: **qué hace bien
visualmente** y **qué conviene robar** para este proyecto. Al final hay tres rutas
de diseño y una lista de lo que no hay que hacer.

---

## 1. caneco — banner propio hecho a mano

<https://github.com/caneco> · 920+ seguidores

Es el referente del header ilustrado. En vez de badges, abre con una pieza gráfica
propia: tipografía grande, mucho aire, una sola idea. El resto del README es corto.

**Qué robar**
- Un header es una pieza de diseño, no una fila de logos.
- Jerarquía clara: nombre grande → rol → una línea de contexto. Nada más compite.
- Si el header es fuerte, el cuerpo puede ser muy breve.

**Ya aplicado en este proyecto:** `assets/header-{dark,light}.svg` sigue exactamente
ese patrón (nombre 44px, regla de acento, rol, tagline, meta en mono).

---

## 2. tandpfun (Thijs Simonian) — sistema de tarjetas coherente

<https://github.com/tandpfun> · 1.3k seguidores

Todo el perfil se ve como un solo producto: mismo radio de borde, mismo gris de
superficie, mismo color de acento en cada bloque. También mantiene
[`skill-icons`](https://github.com/tandpfun/skill-icons), la librería de íconos de
stack que usan miles de perfiles.

**Qué robar**
- Un sistema, no bloques sueltos: un radio, un borde, un acento, repetidos.
- Íconos de stack renderizados como piezas uniformes, no como logos de tamaños
  distintos pegados uno al lado del otro.

**Aplicado a medias, y a propósito:** el sistema único sí, los chips no. Todos los
bloques salen de las mismas constantes en `scripts/build-assets.mjs`, pero el
perfil terminó sin cajas ni chips de stack: ver `guia-visual.md`. La lección que
queda en pie es la primera, no la segunda.

---

## 3. anuraghazra — datos vivos bien integrados

<https://github.com/anuraghazra> · 15k seguidores

Autor de [`github-readme-stats`](https://github.com/anuraghazra/github-readme-stats),
las tarjetas de estadísticas que se ven en medio GitHub. Su perfil las usa con
colores personalizados, no con el tema por defecto.

**Qué robar**
- Las tarjetas sirven, pero **hay que pasarles tu paleta** (`bg_color`,
  `title_color`, `icon_color`, `text_color`), si no delatan que es una plantilla.
- `hide_border=true` + tu propio fondo las integra con el resto.

**No aplicado, por decisión:** el perfil no lleva tarjetas de estadísticas. Con
pocos commits públicos miden más el tiempo libre que el oficio, y en un perfil
enfocado en una sola cosa competían con el diagrama. Si algún día se suman, la
regla de anuraghazra sigue siendo la correcta: pasarles la paleta y
`hide_border=true`.

---

## 4. simonw (Simon Willison) — el README se actualiza solo

<https://github.com/simonw> · 17k seguidores

Su perfil muestra sus últimas entradas de blog, sus TILs y sus releases recientes.
Nada de eso está escrito a mano: un GitHub Action corre cada día, lee los feeds y
reescribe el README entre marcadores HTML.

**Qué robar**
- El contenido que envejece (proyectos recientes, posts) se genera, no se escribe.
- Técnica concreta: dejar `<!-- repos-recientes:inicio -->` / `<!-- fin -->` en el
  README y que un script reemplace solo ese tramo.

**Cómo encajaría aquí:** `scripts/build-assets.mjs` ya lee `profile.config.json`.
El candidato no son los proyectos — son tres y se eligen a mano — sino el pie del
diagrama: la cantidad de agentes y de herramientas MCP podría leerse del propio
harness en vez de estar escrita.

---

## 5. DenverCoder1 (Jonah Lawrence) — componentes SVG reutilizables

<https://github.com/DenverCoder1> · 5k seguidores

Autor de [`readme-typing-svg`](https://github.com/DenverCoder1/readme-typing-svg) y
[`github-readme-streak-stats`](https://github.com/DenverCoder1/github-readme-streak-stats).
Su aporte real es tratar cada bloque del README como un componente con parámetros.

**Qué robar**
- Parametrizar en vez de copiar y pegar: un archivo de configuración, varios SVG.
- La racha de commits (*streak*) es una métrica honesta y se ve bien.

**Cuidado:** el efecto de texto que se escribe solo está muy visto y distrae.
Si se usa, que sea una sola línea y sin bucle infinito.

---

## 6. Platane — la serpiente de contribuciones

<https://github.com/Platane/snk> · 737 seguidores

La animación donde una serpiente se come el calendario de contribuciones. Se genera
con un Action y se publica en la rama `output`.

**Qué robar**
- Es el único "gráfico animado" que sigue leyéndose bien, porque usa datos reales.
- Admite paleta propia (`color_snake`, `color_dots`), así que se puede alinear al acento.

**Cuándo sí:** si el calendario de contribuciones está lleno. Con poca actividad
subraya justamente lo que no conviene subrayar.

---

## 7. thmsgbrt (Thomas Guibert) — calendario 3D

<https://github.com/thmsgbrt> · 890 seguidores

Renderiza el calendario de contribuciones en isométrico, generado por Action.
Mismo principio que Platane, resultado más llamativo y más pesado.

**Qué robar:** la idea de un único momento visual fuerte por README. Uno, no tres.

---

## 8. gaearon (Dan Abramov) — el perfil que no tiene README

<https://github.com/gaearon> · 93k seguidores

No hay banner, ni stats, ni badges. Bio de una línea y repos fijados. Y funciona.

**Qué robar**
- Los **repos fijados** son la parte más vista del perfil, por encima del README.
- Nombres de repo claros y descripción de una línea valen más que cualquier gráfico.
- Un README recargado sobre repos sin descripción se lee como ruido.

**Acción concreta para este perfil:** hoy `controlfinancierolucas`, `catologo-mobil`
y `checklistpilotoiner` no tienen descripción y `catologo-mobil` tiene una errata.
Arreglar eso rinde más que cualquier SVG. Ver `docs/publicar.md`, paso 4.

---

## 9. kentcdodds — el perfil como puerta de entrada

<https://github.com/kentcdodds> · 35k seguidores

README corto que empuja a un destino: su sitio. El perfil no intenta contarlo todo.

**Qué robar:** cerrar con una sola llamada a la acción clara, no con seis redes.

---

## 10. sindresorhus — orden por volumen

<https://github.com/sindresorhus> · 84k seguidores

Con mil repos, el perfil se organiza por categorías de proyecto, no por cronología.

**Qué robar:** cuando hay muchos repos, agrupar por tema. Con 14 repos todavía no
aplica. La versión extrema de la misma idea es la que terminó usando este perfil:
en vez de agrupar todo, mostrar tres proyectos y dejar el resto a un link.

---

## 11. abhisheknaiidu y rahuldkjain — el catálogo y el generador

<https://github.com/abhisheknaiidu/awesome-github-profile-readme> · 3k seguidores
<https://github.com/rahuldkjain/github-profile-readme-generator> · 2.7k seguidores

Uno recopila miles de perfiles, el otro genera uno por formulario.

**Qué robar:** el catálogo sirve para mirar referencias rápido.
**Qué no robar:** la salida del generador. Produce el README genérico que todo el
mundo reconoce — fila de badges de colores, contador de visitas, "Connect with me".

---

## 12. codeSTACKr y athul — widgets de contexto

<https://github.com/codeSTACKr> · 2.7k seguidores
<https://github.com/athul/waka-readme> · 890 seguidores

Spotify sonando ahora, horas por lenguaje vía WakaTime.

**Qué robar:** un dato personal real humaniza el perfil.
**Cuidado:** dependen de un servicio externo. Cuando se cae, queda una imagen rota
en el perfil. Vale uno, no tres.

---

## 13. tiangolo — un proyecto manda sobre el resto

<https://github.com/tiangolo> · 32k seguidores

Su perfil no lista diez repos en igualdad de condiciones: FastAPI va primero y el
resto queda abajo. La bio empieza por ahí también.

**Qué robar**
- Si hay un proyecto que te distingue, no lo pongas en la grilla con los demás:
  dale un bloque propio, arriba, con más espacio y más contexto.
- La jerarquía se construye sacándole peso a lo otro, no solo agregándoselo a uno.

**Aplicado, con otra forma:** el perfil ya no tiene una tarjeta destacada ni una
grilla. Tiene un índice numerado de tres proyectos, y la jerarquía la da el orden:
soou primero, TourGuard segundo. El principio se cumple sacándole peso al resto,
que es justo lo que recomienda la segunda línea de arriba.

**Por qué ese y no otro:** es lo único del perfil que no puede replicar cualquiera
con un tutorial. Un gestor de gastos en Next.js se ve en mil repos; un proyecto
coordinado entre una universidad federal brasileña y un instituto chileno, con
equipo mixto y entrega pública en una galería, no. La colaboración internacional
es el dato diferenciador y estaba enterrada en un fork sin descripción.

**Pendiente:** la ficha de la galería COIL tiene la descripción duplicada. El
bloque marcado para el español repite el texto en portugués (*"Gerenciador de minas
turísticas"* en los dos). Se arregla con un PR al repo de la organización, igual que
el que ya mergeaste: son dos líneas en
`2024/content/portfolio/group11/index.md`, y queda prolijo para cualquiera que
llegue a esa ficha desde tu perfil.

---

## Tres rutas de diseño

| Ruta | Referencias | Trabajo | Mantención | Se ve |
|---|---|---|---|---|
| **A. Editorial mínima** | gaearon, kentcdodds | Bajo | Ninguna | Senior, sobrio |
| **B. Marca propia en SVG** | caneco, tandpfun | Medio | Baja | Cuidado, distinto |
| **C. Automatizado y vivo** | simonw, Platane, DenverCoder1 | Alto | Media | Técnico, activo |

**Este proyecto implementa la ruta B**, con un toque de C en la sección de actividad.
Es la que mejor rinde con 14 repos y poco historial de contribuciones: el peso
visual lo pone el diseño, no las métricas.

Para moverse a **A**: borrar las secciones *Actividad* y *Stack* del README y dejar
solo el header y los proyectos.
Para sumar **C**: ver el paso de automatización descrito en el punto 4 (simonw).

---

## Lo que no hay que hacer

Patrones que aparecen en casi todos los perfiles generados y que restan:

- **Muro de emojis.** Regla fija de este proyecto: cero emojis y cero glifos
  decorativos. Todo ícono sale de `simple-icons` o `lucide`, versionado en
  `assets/icons/`.
- **Veinte badges de shields en colores distintos.** Compiten entre sí y no dicen
  nada. Si va el stack, que sea un bloque con una sola paleta.
- **Contador de visitas.** Nadie lo mira y marca la plantilla.
- **"Connect with me" con seis redes vacías.** Mejor dos links que sí se usan.
- **Trofeos de GitHub.** Premian actividad, no trabajo.
- **Texto que se escribe solo en bucle.** Distrae en cada carga de la página.
- **Imágenes que solo se ven en un tema.** Un PNG de fondo blanco desaparece en
  modo oscuro. Por eso aquí cada bloque tiene variante `-dark` y `-light` servidas
  con `<picture>`.
