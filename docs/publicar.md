# Publicar el perfil

Para que GitHub muestre este README en tu perfil, el repositorio tiene que llamarse
**igual que tu usuario** y ser **público**: `LucasAlvarezS/LucasAlvarezS`.
Hoy ese repo no existe todavía.

Todos los comandos los corres vos. Este proyecto no hace commits por su cuenta.

## 1. Crear el repositorio

En <https://github.com/new>:

- **Repository name:** `LucasAlvarezS` (GitHub va a mostrar un aviso de que es un
  repo especial de perfil — eso confirma que está bien escrito)
- **Public**
- Sin README, sin `.gitignore`, sin licencia

## 2. Subir el proyecto

```bash
cd C:\Users\lucas\github-profile
git init -b main
git add .
git commit -m "Perfil: cabecera, proyectos y diagrama de ruteo, en dos idiomas"
git remote add origin https://github.com/LucasAlvarezS/LucasAlvarezS.git
git push -u origin main
```

## 3. Revisar en los dos temas

Abrí <https://github.com/LucasAlvarezS> y mirá el perfil en modo claro y en modo
oscuro (Settings → Appearance). Los bloques tienen que cambiar de fondo.

Si una imagen no aparece recién subida, es la caché de imágenes de GitHub (camo):
tarda unos minutos la primera vez.

## 4. Lo que más rinde después del README

El README es la mitad del perfil. La otra mitad son los repos fijados, y hoy están
sin terminar. En orden de impacto:

1. **Descripciones.** `controlfinancierolucas`, `catologo-mobil`, `checklistpilotoiner`,
   `control8financiero`, `bloquitos` y `miningtour-ff` no tienen ninguna. Una línea
   cada uno, en la pestaña del repo → *About*. `miningtour-ff` ahora se linkea desde
   el README como la app móvil de TourGuard, así que conviene que su descripción lo
   diga: *"App móvil de TourGuard — COIL 2024 INACAP/UFSM"*. Aprovechá de ponerle
   también la URL de la galería COIL en el campo *Website*.
2. **La errata.** `catologo-mobil` debería ser `catalogo-movil`. Renombrar un repo
   en GitHub deja una redirección automática, así que no rompe links. Si lo hacés,
   actualizá también el link en el `README.md` de este proyecto.
3. **Repos duplicados.** `controlfinancierolucas` y `control8financiero` parecen el
   mismo proyecto. Archivá el que no sigas usando (*Settings → Archive*): deja de
   contar como repo activo y el perfil se lee más ordenado.
4. **Fijar pocos repos, no muchos.** En tu perfil, *Customize your pins*. El
   README muestra tres proyectos, así que los pins tienen que decir lo mismo:
   `miningtour-ff` y el fork `coil-ufsm-inacap.github.io` respaldan a TourGuard,
   y `asistencia-parque-iner` al tercero. Si publicás `soou`, va primero.
   Seis pins con cuatro proyectos sueltos contradicen el README; tres o cuatro
   alineados lo refuerzan.
5. **Completar la bio.** Está vacía, y es el texto que se ve en buscadores, en tus
   comentarios y al pasar el mouse sobre tu nombre. Entra en 160 caracteres:

   En inglés, que es el idioma del `README.md` del perfil:

   > Full-stack developer. Author of soou. Web and mobile products, Python tooling, systems that coordinate coding agents. Chile.

   En español, si preferís que la bio hable en tu idioma aunque el README esté en
   inglés — es una combinación común y no desentona:

   > Desarrollador full-stack. Autor de soou. Producto web y móvil, herramientas en Python, sistemas que coordinan agentes de código. Chile.

   El registro está tomado de cómo se presentan desarrolladores conocidos:
   *"Creator of the Flask framework"* (mitsuhiko), *"author of @vuejs and
   @vitejs"* (Evan You), *"Makes macOS apps, CLI tools, npm packages"*
   (sindresorhus). Rol, después las cosas por su nombre, después lo que hacés.
   Sustantivos concretos, cero adjetivos, cero frases ingeniosas.

6. **Topics.** En cada repo, tres o cuatro (`nextjs`, `typescript`, `supabase`).
   Es lo que hace que aparezcan en búsquedas. En los dos del COIL conviene
   `coil`, `inacap`, `ufsm`: no los busca nadie por casualidad, pero sirven si
   alguien de la red del programa llega a tu perfil.

## 5. Cada vez que cambies algo

```bash
npm run build
git add -A
git commit -m "Actualiza <lo que sea>"
git push
```

## 6. Las tarjetas de estadísticas: cómo agregarlas y por qué no están

Si querés el perfil con la fila de tarjetas de stats —como el de
[arthurspk](https://github.com/arthurspk)— el bloque está listo para pegar debajo
de la presentación, ya con la paleta del proyecto y fondo transparente para que
no meta una caja:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=LucasAlvarezS&show_icons=true&include_all_commits=true&hide_border=true&bg_color=00000000&title_color=EF7F1D&icon_color=EF7F1D&text_color=A09C97">
  <img src="https://github-readme-stats.vercel.app/api?username=LucasAlvarezS&show_icons=true&include_all_commits=true&hide_border=true&bg_color=00000000&title_color=C2410C&icon_color=C2410C&text_color=595C62" alt="GitHub stats" height="170">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs?username=LucasAlvarezS&layout=compact&langs_count=6&hide_border=true&bg_color=00000000&title_color=EF7F1D&text_color=A09C97">
  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=LucasAlvarezS&layout=compact&langs_count=6&hide_border=true&bg_color=00000000&title_color=C2410C&text_color=595C62" alt="Top languages" height="170">
</picture>
```

**Esto es lo que mostraría hoy**, medido contra la API el 4 de octubre de 2026:

| Métrica | Tu valor |
|---|---|
| Total Stars Earned | 1 |
| Total Commits | 130 |
| Total PRs | 16 |
| Total Issues | 0 |
| Contributed to | 1 |
| Rango | C |

Por eso no están puestas. El perfil que te gustó usa esa fila porque sus números
son 27.700 estrellas y 7.720 contribuciones al año: ahí la tarjeta *es* el
argumento. Con 1 estrella y rango C, la misma tarjeta argumenta en contra, y
queda justo arriba de un diagrama que sí muestra trabajo real.

Cuándo sí ponerlas: cuando `soou` sea público y sus 111 commits y sus tests
cuenten en el total. Ahí la tarjeta pasa a jugar a favor y pegarla toma diez
segundos.

Mientras tanto hay dos cosas del perfil de referencia que **ya tenés gratis** y no
dependen del README, porque las dibuja GitHub solo:

- **Los repos fijados** — la grilla de seis tarjetas. Se configura en
  *Customize your pins*, paso 4 de esta guía.
- **El calendario de contribuciones y el Activity overview** — aparecen solos
  debajo del README, sin hacer nada.
