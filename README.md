# Mosaïque Web

Sitio público de **MOSAÏQUE ÉVÉNEMENTS**, empresa de planificación, producción, logística, alquiler y alianzas con venues en Montréal.

La experiencia está construida con Astro como base estática, React únicamente para la escena interactiva de Services, Motion para la orquestación establecida y Tailwind/CSS sobre el Design System del proyecto.

## Requisitos

- Node.js `>=22.12.0`
- pnpm

## Instalación

```sh
pnpm install
```

Para producción, `SITE_URL` habilita canonical, `og:url`, la URL del JSON-LD y la generación del sitemap:

```sh
cp .env.example .env
```

No se debe completar `SITE_URL` hasta confirmar el dominio público definitivo.

## Desarrollo

```sh
pnpm dev
```

Astro inicia el servidor en background y selecciona el primer puerto disponible. La terminal informa la URL final; normalmente comienza en `http://localhost:4321`.

```sh
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

## Validación

```sh
pnpm build
pnpm lint
pnpm typecheck
git diff --check
```

El repositorio no tiene actualmente un script de tests automatizados.

## Superficie pública

- `/`: homepage editorial.
- `/events/[slug]`: seis páginas estáticas de detalle de evento.
- `/robots.txt`: directivas de rastreo; incluye el sitemap cuando existe `SITE_URL`.

## Evidencia de ejecución

Última verificación local: **2026-08-27**, Node.js `v22.22.3`.

| Comprobación                 | Resultado                                                            |
| ---------------------------- | -------------------------------------------------------------------- |
| Servidor Astro               | Background activo en `http://localhost:4322` durante la verificación |
| Homepage `/`                 | HTTP `200`; título `MOSAÏQUE EVENTS — Eventos en Montréal`           |
| Evento `/events/nossa-copa/` | HTTP `200`; título `Nossa Copa — MOSAÏQUE EVENTS`                    |
| `/robots.txt`                | HTTP `200`; `User-agent: *` y `Allow: /`                             |
| `pnpm build`                 | Correcto; 7 páginas estáticas generadas                              |
| `pnpm lint`                  | Correcto; 0 errores                                                  |
| `pnpm typecheck`             | Correcto; 67 archivos, 0 errores, 0 warnings, 0 hints                |
| `git diff --check`           | Correcto                                                             |

El servidor background de esta verificación permanece disponible en `http://localhost:4322`.

## Documentación

- [`AGENTS.md`](./AGENTS.md): protocolo de trabajo y contratos vigentes.
- [`docs/ROADMAP.md`](./docs/ROADMAP.md): estado de implementación y fase actual.
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md): tokens, tipografía, layout y motion.
- [`docs/PATTERNS.md`](./docs/PATTERNS.md): patrones reutilizables e interacciones.
- [`docs/CONTENT.md`](./docs/CONTENT.md): flujo de contenido de negocio.
- [`docs/MOVRA_REFERENCE.md`](./docs/MOVRA_REFERENCE.md): referencia de composición y comportamiento.
