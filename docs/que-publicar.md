# Qué publicar para mostrar más manejo

El perfil hoy muestra cuatro aplicaciones Next.js que resuelven el mismo tipo de
problema. Están bien hechas, pero las cuatro prueban lo mismo. Lo que falta no es
otro proyecto: es evidencia pública de lo que ya sabés hacer y no se ve.

En orden de impacto.

---

## 1. soou — el que más rinde, y ya está terminado

Tu proyecto privado es, por lejos, lo más fuerte que tenés. Lo que demuestra y
ninguno de los repos públicos alcanza a mostrar:

| Señal | Dato |
|---|---|
| Disciplina de pruebas | más de 120 tests, en nueve archivos |
| Integración continua | workflow de CI corriendo en cada push |
| Criterio de dependencias | cero dependencias de terceros, decisión documentada |
| Trabajo de protocolo | servidor MCP sobre stdio, ocho herramientas |
| Arquitectura | clasificador, ruteador y ejecutor separados, con esquema propio |
| Proyecto abierto en serio | licencia MIT, CONTRIBUTING, README en dos idiomas |
| Constancia | 111 commits en un mes, con mensajes descriptivos |

Nada de eso se puede improvisar en una entrevista, y nada de eso aparece hoy en tu
perfil.

### Está limpio para publicar

Revisado contra el repo local:

- **44 archivos rastreados**, ninguno sensible.
- `.gitignore` ya cubre `/sessions/`, `/interno/`, `/soou.config.json`, `.env`,
  `/router-log.jsonl` y `/last-sync.json`.
- **Cero coincidencias** de claves de API en los 111 commits del historial.

Antes de darle a *Public*, igual conviene mirar dos cosas a mano:

1. `AGENTS.md` y los ejemplos de `demo/` y `examples/`, por si quedó alguna ruta
   personal o nombre de cliente.
2. Los mensajes de commit, con `git log --oneline | less`, por lo mismo.

Si querés publicarlo, decime y le armo la tarjeta destacada igual que la de
TourGuard, con los números reales. Hasta entonces el README lo menciona sin link,
que es lo que elegiste.

---

## 2. Un repo propio de YOLO sobre un dataset público

El stack ya dice YOLOv8 y YOLOv11, pero ese trabajo fue del trabajo y no es tuyo
para publicar. Una línea de stack sin nada detrás es justo lo que un revisor
técnico va a buscar y no va a encontrar.

La salida es un repo chico y propio, con un dataset abierto, que demuestre el
mismo ciclo sin tocar una línea de código del cliente. No necesita ser grande:

```
README.md          el problema, el dataset, qué salió y qué no
dataset.yaml       clases y splits (el dataset se baja, no se versiona)
train.py           hiperparámetros explícitos, semilla fija
eval.py            mAP50, mAP50-95, matriz de confusión
runs/metrics.md    la tabla de resultados, v8 contra v11
inferencia/        seis o siete imágenes de salida, no cien
```

Lo que lo hace valer no son los pesos: es el README. Comparar YOLOv8 contra
YOLOv11 sobre el mismo dataset, mostrar dónde cada uno falla y explicar por qué
elegiste uno, vale más que cualquier métrica suelta. Un revisor entiende en dos
minutos que manejás el ciclo completo y no solo el comando de entrenamiento.

Los pesos entrenados no van al repo: pesan demasiado y Git no los maneja bien.
Van como adjunto de un *release*, o directamente no van.

---

## 3. Tests y CI en uno de los proyectos que ya tenés

El salto más barato de todos. Agregarle a `controlfinancierolucas` un puñado de
tests y un workflow de GitHub Actions le pone el check verde visible en la portada
del repo, y cambia cómo se lee: de proyecto personal a proyecto mantenido.

Con uno alcanza. Cuatro repos con tests a medias se leen peor que uno con tests de
verdad.

---

## Lo que no haría

- **Otro CRUD en Next.js.** Ya hay cuatro. El quinto no agrega información.
- **Un clon de algo conocido.** Un Twitter o un Spotify de práctica compite contra
  diez mil repos iguales y no dice nada tuyo.
- **Repos de tutorial sin terminar.** Restan: bajan la señal promedio del perfil.
- **Archivar todo lo viejo.** `fizzbuz`, `PomodoroApp` o `Divisas-python` no
  molestan si tienen descripción. El problema nunca fue que existan, sino que
  estén sin explicar.
