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

El script de tests construye el sitio y cubre el contrato público de captura de Leads y el contrato
estático de locale/routing sin tocar red ni credenciales.

## Superficie pública

- `/`: homepage editorial en English (EN-CA), idioma predeterminado.
- `/es`: homepage Spanish; sus páginas usan el prefijo `/es/`.
- `/fr`: homepage French; sus páginas usan el prefijo `/fr/`.
- `/contact`: página dedicada con el formulario de cotización.
- `/gallery`: archivo de eventos realizados.
- `/gallery/[category]`: archivos estáticos derivados de las categorías aprobadas.
- `/events/[slug]`: seis páginas estáticas de detalle de evento.
- `/robots.txt`: directivas de rastreo; incluye el sitemap cuando existe `SITE_URL`.

Los IDs y slugs se mantienen entre idiomas. Los paths históricos `/en/*` deben redirigir de forma
permanente y en un solo salto al equivalente English sin prefijo mediante la configuración de
Vercel; no se generan páginas `/en/*` ni redirects de JavaScript en el build estático.

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

Última verificación local: **2026-09-18**, Node.js `v24.5.0`.

| Comprobación                  | Resultado                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `pnpm build`                  | Correcto; 75 páginas y 1.215 salidas de imagen generadas                        |
| Build temporal con `SITE_URL` | Correcto; canonical, `robots.txt` y sitemap i18n con 72 URLs indexables         |
| `pnpm test`                   | Correcto; 11/11 tests de Leads y contrato i18n/routing                          |
| `pnpm lint`                   | Correcto; 0 errores                                                             |
| `pnpm typecheck`              | Correcto; 166 archivos, 0 errores, 0 warnings, 0 hints                          |
| QA local                      | EN/ES/FR, temas y viewports de 390, 430, 768, 1024, 1280 y 1600 px sin overflow |
| `git diff --check`            | Correcto                                                                        |

La URL pública actual todavía sirve una revisión antigua. No se creó un `.env`, no se fijó un
dominio definitivo y no se ejecutó un despliegue durante esta verificación.

## Documentación

- [`AGENTS.md`](./AGENTS.md): protocolo de trabajo y contratos vigentes.
- [`docs/ROADMAP.md`](./docs/ROADMAP.md): estado de implementación y fase actual.
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md): tokens, tipografía, layout y motion.
- [`docs/PATTERNS.md`](./docs/PATTERNS.md): patrones reutilizables e interacciones.
- [`docs/CONTENT.md`](./docs/CONTENT.md): flujo de contenido de negocio.
- [`docs/MOVRA_REFERENCE.md`](./docs/MOVRA_REFERENCE.md): referencia de composición y comportamiento.
