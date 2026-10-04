# Cómo funciona este proyecto

El `README.md` de la raíz es el perfil público de GitHub. Hay una segunda versión
en español, y los bloques visuales se generan desde un único archivo de
configuración.

**GitHub solo renderiza `README.md` en el perfil**, así que el idioma primario es
uno solo: el inglés, la misma convención que ya usás en soou. El español vive en
`README.es.md` y los dos se enlazan entre sí en la primera línea.

```
profile.config.json      fuente de verdad: identidad, paleta y los textos
                         de los dos idiomas, bajo i18n.en e i18n.es
scripts/fetch-icons.mjs  baja los íconos de lucide
scripts/build-assets.mjs genera los SVG del README
scripts/preview.mjs      arma una página local con todos los bloques
assets/icons/ui/         íconos sin tocar (lucide)
README.es.md             el mismo perfil en español
assets/header-*.svg      nombre, rol y ubicación
assets/project-*.svg     un bloque por proyecto; el de soou lleva adentro
                         el diagrama de ruteo y las reglas de operación
assets/soou-mark-*.png   logotipo de soou recoloreado por tema
assets/soou-ui.png       captura de la interfaz de soou
README.md                el perfil
docs/                    esta documentación y las referencias
```

Los SVG se nombran `<bloque>-<idioma>-<tema>.svg`: el texto va **dentro** del SVG,
así que cada combinación de idioma y tema es un archivo propio. Dos idiomas por dos
temas por cuatro bloques son dieciséis archivos, más los dos PNG de soou.

No hay dependencias de npm: todo corre con Node 18 o superior.

El diagrama no es un bloque suelto: vive dentro del bloque de soou, que es de
donde sale. Un hilo de acento a la izquierda lo ata visualmente al proyecto, y
así nadie tiene que adivinar de qué sistema es ese flujo.

## Comandos

```bash
npm run icons    # baja los íconos faltantes (usa caché)
npm run build    # regenera los SVG de assets/
npm run preview  # abre los bloques en ambos temas, al ancho real de GitHub
```

## Para cambiar algo

| Quiero… | Edito | Después |
|---|---|---|
| Nombre, ubicación, zona horaria | `profile.config.json` → `identity` | `npm run build` |
| Rol y bajada, por idioma | `profile.config.json` → `i18n.<lang>` | `npm run build` |
| Colores | `profile.config.json` → `theme` | `npm run build` |
| Los niveles de ruteo o sus modelos | `i18n.<lang>.pipeline` | `npm run build` |
| Las reglas de operación | `i18n.<lang>.method` | `npm run build` |
| El texto de un proyecto | `i18n.<lang>.projects.<id>` | `npm run build` |
| El orden de los proyectos | `profile.config.json` → `projects` | `npm run build` |
| Agregar un tercer idioma | una clave más en `i18n` | `npm run build` |
| Qué proyecto lleva el diagrama | `projects[].flow: true` | `npm run build` |
| Quién soy, el texto de arriba | `README.md` y `README.es.md` | — |
| La línea de stack del cierre | `README.md` y `README.es.md` | — |
| Los links de cada proyecto | `README.md` y `README.es.md` | — |

Lo que está en el config se traduce solo al construir; lo que está en los README
hay que tocarlo en los dos archivos. Es a propósito: la prosa de presentación se
escribe mejor a mano en cada idioma que traducida desde una sola fuente.

Para invertir los idiomas —español en el perfil, inglés al lado— se intercambia el
contenido de los dos archivos y se cambia `primary` en el config, que es lo que
define el orden del preview.

Los links van en el README y no en los SVG porque **un SVG servido como `<img>`
no puede contener enlaces clickeables**. Por eso cada proyecto es su propio
bloque en vez de un índice único: la parte visual la dibuja el script, y los
links quedan en markdown justo debajo del proyecto al que pertenecen.

## Por qué SVG generado

- **Una petición por bloque**, sin depender de ningún servicio externo.
- **Control de tipografía y espaciado** que el markdown no da.
- **Funciona en ambos temas** con `<picture>` y `prefers-color-scheme`.
- **Sin emojis**: los únicos glifos no tipográficos son paths de lucide,
  versionados en el repo.

## Detalles que importan

- Los SVG son **transparentes**, sin caja. La razón está en `guia-visual.md`.
- El logotipo va **incrustado** en el SVG como data URI, no referenciado. Por eso
  `project-soou-*.svg` pesa 16 kB y los otros menos de 2 kB.
- Los dos PNG de `assets/` no se generan en cada build: se produjeron una vez
  desde el repo de soou y quedaron versionados acá. Si cambia el logotipo, hay
  que volver a recortarlo y recolorearlo; el procedimiento está en
  `guia-visual.md`, sección *Imágenes*.
- Las fuentes son stacks del sistema. Un SVG dentro de un `<img>` no carga
  fuentes externas, así que no se usa ninguna tipografía web.
- El texto se mide con una aproximación por carácter (`textWidth`), que es lo que
  posiciona las guías punteadas del diagrama y lo que reparte las descripciones en
  líneas (`wrapText`). SVG no corta texto solo: si una descripción crece, el
  bloque se reacomoda porque el alto se calcula desde las líneas resultantes.
- Las descripciones se cortan a 700px de ancho, no a los 1000 de la composición.
  Una línea de 75 caracteres se lee; una de 110 obliga a volver a buscar el
  principio del renglón.
- El alto de cada bloque se calcula desde el contenido, así que agregar una fila
  no requiere tocar ninguna medida.
