# Guía visual

El perfil no usa tarjetas. Esa es la decisión de la que cuelga todo lo demás.

Un README de GitHub lleno de rectángulos redondeados con borde se lee como
plantilla, porque es exactamente lo que genera cualquier generador de perfiles.
Acá lo que estructura la página son tres cosas: la tipografía, una línea de 1px
y el espacio en blanco. Los valores viven en `profile.config.json` → `theme`.

## Sin caja

Cada SVG es **transparente**: sin fondo, sin borde, sin esquinas redondeadas. Se
apoya sobre el fondo real de GitHub, así que el bloque no parece pegado encima de
la página — parece parte de ella.

Consecuencia práctica: no hay color de fondo ni de superficie en la paleta. Solo
hay colores de tinta.

| Rol | Oscuro | Claro | Contraste | Para qué |
|---|---|---|---|---|
| Texto | `#E8E6E3` | `#1E2125` | 15.2 / 16.2 | nombre, niveles, nombres de proyecto |
| Apagado | `#A09C97` | `#595C62` | 6.9 / 6.7 | descripciones, pie del diagrama |
| Tenue | `#74706B` | `#7E8288` | 3.9 / 3.9 | metadatos, guías punteadas, detalle |
| Línea | `#343029` | `#D7D4CE` | — | las reglas de 1px y el árbol |
| Acento | `#EF7F1D` | `#C2410C` | 7.0 / 5.2 | regla del nombre, nodos, etiquetas |

### De dónde sale el color

No está inventado: **sale de soou**. El naranja `#EF7F1D` es el de su logotipo,
medido pixel a pixel sobre el archivo original. Los grises salen de los tokens de
su interfaz (`--text`, `--text-dim`, `--text-faint`, en oklch), convertidos a sRGB.

Eso resuelve dos problemas a la vez. El perfil deja de usar un acento elegido por
gusto — que es lo que hace que un color se vea genérico — y pasa a compartir
identidad con el proyecto que encabeza la página.

El tema claro oscurece el naranja a `#C2410C` porque el de marca rinde 2.7 sobre
blanco, que no alcanza para texto. Sobre el fondo oscuro de GitHub el de marca
rinde 7.0 y se usa tal cual.

Los tres niveles de tinta no son decorativos: con bloques transparentes y sin
cajas, la jerarquía la carga el contraste del texto, no el fondo de un contenedor.

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
