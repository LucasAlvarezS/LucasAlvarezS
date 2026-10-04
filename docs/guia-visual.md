# Guía visual

El perfil no usa tarjetas. Esa es la decisión de la que cuelga todo lo demás.

Un README de GitHub lleno de rectángulos redondeados con borde se lee como
plantilla, porque es exactamente lo que genera cualquier generador de perfiles.
Acá lo que estructura la página son tres cosas: la tipografía, una línea de 1px
y el espacio en blanco. Los valores viven en `profile.config.json` → `theme`.

## Un solo juego de archivos, sin variante por tema

Esta es la corrección más importante del diseño, y vino de un bug real.

El perfil usaba `<picture>` con `prefers-color-scheme` para servir una variante
clara y una oscura. **No funciona en GitHub.** Esa media query la resuelve el
navegador contra el tema del **sistema operativo**, no contra el tema de la cuenta
de GitHub. Con el SO en oscuro y GitHub en claro, el navegador elegía la variante
oscura y la ponía sobre fondo blanco: el nombre quedaba en `#E8E6E3` sobre
blanco, con contraste **1.25:1**. Ilegible.

La solución no es elegir mejor: es que no haya nada que elegir. Una sola paleta,
con contraste suficiente sobre blanco **y** sobre `#0D1117`.

| Rol | Color | Sobre blanco | Sobre oscuro | Para qué |
|---|---|---|---|---|
| Fuerte | `#6A635E` | 5.90 | 3.21 | nombre, títulos, niveles (texto grande) |
| Texto | `#7E7875` | 4.35 | 4.35 | descripciones, reglas de operación |
| Apagado | `#8E8884` | 3.50 | 5.41 | detalle técnico, etiquetas |
| Tenue | `#9A938E` | 3.03 | 6.25 | metadatos, guías punteadas |
| Línea | `#8A8A8A` | 3.45 | 5.48 | reglas de 1px |
| Acento | `#B86E12` | 3.98 | 4.76 | regla del nombre, nodos, etiquetas |

### El techo es 4.28:1

Hay un límite matemático: el color que mejor rinde simultáneamente sobre blanco y
sobre `#0D1117` llega a **4.28:1**, y está cerca de `#787878`. Cualquier color más
oscuro gana sobre blanco y pierde sobre oscuro, y al revés.

Por eso `#7E7875` es casi el óptimo y por eso **la jerarquía no puede descansar en
el contraste**: descansa en tamaño, peso y familia tipográfica. El nombre no se
impone por ser más oscuro, sino por medir 44px en serif.

Y por eso el acento es `#B86E12` y no el `#EF7F1D` del logotipo de soou: el naranja
de marca rinde 2.72 sobre blanco. Es el mismo color quemado hasta que entra en el
rango que sirve en los dos lados.

Beneficio lateral: la mitad de archivos. Diez en `assets/` en vez de veinte.

## Sin caja

Cada SVG es **transparente**: sin fondo, sin borde, sin esquinas redondeadas. Se
apoya sobre el fondo real de GitHub, así que el bloque no parece pegado encima de
la página — parece parte de ella.

## Un solo eje de lectura

Todo arranca en `x = 2`: el nombre, el tronco del diagrama, los números de
proyecto y cada línea divisoria. Un único margen izquierdo en toda la página es
lo que hace que cuatro imágenes separadas se lean como un documento y no como
cuatro imágenes.

Si un bloque nuevo necesita indentación, se indenta **el contenido**, nunca el
borde izquierdo del bloque.

## Tipografía

**Tres familias, un trabajo cada una.** Todas del sistema: un SVG dentro de un
`<img>` no carga fuentes web, así que no se usa ninguna.

| Familia | Stack | Para qué |
|---|---|---|
| Serif | `Georgia`, `Iowan Old Style`, `Palatino Linotype` | nombre y títulos de proyecto |
| Sans | `ui-sans-serif`, `Helvetica Neue`, `Segoe UI` | prosa: descripciones, niveles |
| Mono | `Spline Sans Mono`, `ui-monospace`, `Menlo` | datos: modelos, metadatos, etiquetas |

La serif es la decisión que más se nota. Un perfil compuesto solo con la fuente de
interfaz del sistema se ve como una interfaz del sistema — que es exactamente el
aspecto genérico que había que sacar. Una serif en el nombre y en los títulos lo
mueve a terreno editorial sin costar una sola petición de red.

El reparto entre las otras dos: **sans para lo que se lee, mono para lo que se
consulta**. Un nivel de ruteo es prosa; el modelo al que se enruta es un dato.
La mono arranca por `Spline Sans Mono`, que es la que usa la interfaz de soou: si
el que mira la tiene instalada, el perfil se ve exactamente como el producto.

### Escala

Saltos grandes y pocos pasos, para que cada nivel se distinga sin leerlo.

| Nivel | Familia | Tamaño | Peso | Color |
|---|---|---|---|---|
| Nombre | serif | 52 | 700, tracking −0.6 | texto |
| Título de proyecto | serif | 28 | 700, tracking −0.3 | texto |
| Rol | sans | 17 | 600 | texto |
| Nivel del diagrama | sans | 15.5 | 600 | texto |
| Descripción | sans | 15 | 400 | apagado |
| Regla de operación | sans | 13.5 | 400 | texto 0.9 |
| Tagline | sans | 14 | 400 | apagado |
| Modelo, detalle | mono | 12.5–13 | 400 | tenue / texto 0.9 |
| Etiqueta, metadato | mono | 10.5 | 500, tracking 1.6–1.8 | acento / tenue |

La jerarquía nunca descansa en un solo eje: cada nivel cambia **tamaño, peso y
color a la vez**. Por eso la etiqueta de 10.5 en acento no compite con la
descripción de 15 en apagado, aunque una sea naranja y la otra gris.

## Elegir la forma según el contenido

| El contenido es… | Se dibuja como… | Dónde |
|---|---|---|
| un flujo con decisiones | árbol con ramas | dentro del bloque de soou |
| reglas sueltas | etiqueta y definición, con líneas | debajo del árbol |
| una lista ordenada | bloques numerados | los tres proyectos |
| una lista sin orden | texto plano en el README | stack |
| quién sos | prosa en el README | arriba de todo |

El diagrama es la pieza central porque el contenido lo pide: el ruteo *es* un
árbol de decisión. Dibujarlo como chips obligaría a reconstruir mentalmente un
orden que el árbol muestra de una sola mirada.

Y vive **dentro** del proyecto del que sale, no flotando arriba. Un hilo de
acento de 2px a la izquierda lo ata a soou. Un diagrama suelto obliga a preguntar
de qué sistema es; uno atado se explica solo.

Lo que no se dibuja: quién sos. Eso va en prosa, en el README, porque una persona
no tiene forma de diagrama y cualquier intento de darle una la vuelve una ficha
de personaje.

El corolario importa igual: el stack no es un flujo ni tiene jerarquía, así que
no se gana nada dibujándolo. Va como una línea de texto al final.

## Geometría

- Ancho de composición: **1000**. La columna del perfil mide unos 870, así que la
  reducción de escala es mínima y el texto llega legible.
- Línea divisoria: **1px**, nunca 2, nunca sombra.
- Regla de acento bajo el nombre: **54 × 3**.
- Nodos del diagrama: círculo de **r 3.5**, con opacidad creciente por nivel —
  de 0.35 en lo trivial a 1 en lo riesgoso. La opacidad hace de escala de peso
  sin introducir un segundo color.
- Guía punteada: `stroke-dasharray="1 5"` con punta redonda. Conecta sin competir.
- Medida de lectura: **700px** para las descripciones, no los 1000 del bloque.
  Unos 75 caracteres por línea; más que eso y el ojo pierde el renglón.

## Imágenes

Dos, y las dos son de soou. Ninguna es decorativa.

**El logotipo** titula el bloque de soou en lugar del texto. Viene del archivo
original del proyecto, recortado a su caja útil (de 360×270 a 236×55) y
recoloreado por tema: la tinta pasa al color de texto, el naranja de marca no se
toca. Va **incrustado** como data URI dentro del SVG, no referenciado — un SVG
dentro de un `<img>` no carga recursos externos y una ruta relativa no se vería.

**La captura de la interfaz** va en el README, no dentro de un SVG, porque es un
PNG grande y no necesita tema. Muestra el estado de demo del producto: tres notas
y dos conceptos, nada de datos reales. Esa distinción importa — la misma pantalla
con el cerebro real del autor no es publicable.

La regla general: una imagen entra si prueba que algo existe. El logotipo prueba
que el proyecto tiene identidad; la captura, que tiene producto. Un gráfico de
métricas o un banner ilustrado no prueban nada y no entran.

## Reglas al agregar un bloque

1. Sin fondo, sin borde, sin radio. Si pedís una caja, revisá primero si lo que
   querés es una línea.
2. Dos variantes, `-dark` y `-light`, servidas con `<picture>`.
3. Empezar en `x = 2` como todo lo demás.
4. Un solo acento por bloque.
5. Cero emojis. Los únicos glifos no tipográficos son paths de
   [lucide](https://lucide.dev), versionados en `assets/icons/ui/`.
6. Antes de dibujar: preguntarse si el contenido tiene forma. Si no la tiene,
   probablemente va como texto en el README.
