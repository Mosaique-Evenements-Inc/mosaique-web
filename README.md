# Mosaïque Web 🎭

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
pnpm test
pnpm typecheck
git diff --check
```

El script de tests cubre el contrato público de captura de Leads sin tocar red ni credenciales.

## Superficie pública

- `/`: homepage editorial.
- `/contact`: página dedicada con el formulario de cotización.
- `/gallery`: archivo de eventos realizados.
- `/gallery/[category]`: archivos estáticos derivados de las categorías aprobadas.
- `/events/[slug]`: seis páginas estáticas de detalle de evento.
- `/robots.txt`: directivas de rastreo; incluye el sitemap cuando existe `SITE_URL`.

## Captura pública de Leads

El formulario público de `/contact` consume el contrato V1 de Leads mediante el adapter Fetch de
la feature Quote. El browser habla únicamente con el endpoint público configurado por
`SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`; no hay acceso directo a tablas ni credenciales
server-role.

La solicitud pública contiene exactamente:

```json
{
  "fullName": "Patricia Romero",
  "email": "patricia@example.com",
  "phone": "+15145550100",
  "service": "bodas",
  "eventType": "boda",
  "eventDate": "2028-02-29",
  "guestRange": "51-100",
  "preferredLanguage": "es"
}
```

`eventDate` puede ser `null`. `status`, `source`, `code`, `id`, assignees, history, notes,
campos normalizados, Venue y Budget no se envían desde Web; `status = NEW`, `source = WEBSITE` y
el código público `LEA-########` son propiedad del backend.

La respuesta exitosa canónica es:

```json
{
  "status": "created",
  "lead": {
    "code": "LEA-00000013",
    "status": "NEW",
    "createdAt": "2026-09-05T12:00:00.000Z"
  }
}
```

Web ya no consume los aliases temporales `lead.id` ni `lead.created_at`. Los errores del API se
leen desde el envelope sanitizado `error.code`, `error.message`, `error.details` y
`error.requestId`, pero la UI muestra mensajes seguros propios del sitio. La validación del cliente
es sólo una ayuda de UX; el backend conserva la autoridad. El teléfono mantiene el alcance actual
canadiense/norteamericano `+1`; la selección internacional de país queda como decisión futura de
producto. El endurecimiento anti-abuse queda para `WEB/API-LEAD-ANTIABUSE-01` con Turnstile o
equivalente, honeypot, verificación backend, rate limiting, protección de reintentos/idempotencia
y métricas seguras antes de campañas públicas relevantes.

## Evidencia de ejecución

Última verificación local: **2026-08-28**, Node.js `v22.22.3`.

| Comprobación                                      | Resultado                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm build`                                      | Correcto; 14 páginas y 407 variantes de imagen generadas             |
| Build temporal con `SITE_URL`                     | Correcto; canonical, `robots.txt` y sitemap generados                |
| Canonical de `/`, `/contact`, `/gallery` y evento | Correctos con la URL temporal usada exclusivamente para el preflight |
| `pnpm lint`                                       | Correcto; 0 errores                                                  |
| `pnpm typecheck`                                  | Correcto; 87 archivos, 0 errores, 0 warnings, 0 hints                |
| `git diff --check`                                | Correcto                                                             |

La URL pública actual todavía sirve una revisión antigua. No se creó un `.env`, no se fijó un
dominio definitivo y no se ejecutó un despliegue durante esta verificación.

## Documentación

- [`AGENTS.md`](./AGENTS.md): protocolo de trabajo y contratos vigentes.
- [`docs/ROADMAP.md`](./docs/ROADMAP.md): estado de implementación y fase actual.
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md): tokens, tipografía, layout y motion.
- [`docs/PATTERNS.md`](./docs/PATTERNS.md): patrones reutilizables e interacciones.
- [`docs/CONTENT.md`](./docs/CONTENT.md): flujo de contenido de negocio.
- [`docs/MOVRA_REFERENCE.md`](./docs/MOVRA_REFERENCE.md): referencia de composición y comportamiento.
