# Casos de Uso — Mosaïque Web

## Propósito

Documentar la línea base observable de `mosaique-web` para revisión de producto y QA. Los casos describen la experiencia editorial pública, las rutas localizadas, la exploración de servicios y eventos, y la captura de oportunidades comerciales mediante `mosaique-api`.

## Alcance Actual

`mosaique-web` es un sitio Astro estático y público para MOSAÏQUE ÉVÉNEMENTS. Genera 72 páginas en español, inglés canadiense y francés canadiense; presenta inicio, Nosotros, servicios, galería, eventos, contacto y página de recurso no encontrado. La única mutación remota es la creación pública de una oportunidad comercial. El contenido canónico, medios y relaciones se compilan desde módulos tipados del repositorio.

## Actores

- Visitante público: navega el contenido editorial y consulta servicios/eventos.
- Visitante interesado: completa y envía la solicitud de contacto/cotización.
- Visitante que usa teclado o tecnología de asistencia: opera menús, filtros, formularios y visores mediante contratos accesibles.
- Motor de búsqueda: consume metadatos, rutas, `robots.txt` y, cuando existe `SITE_URL`, el mapa del sitio.
- `mosaique-api`: valida y persiste oportunidades comerciales públicas.

## Módulos

### Módulo: Navegación, Idiomas y SEO

#### Resumen de Capacidades

| Capacidad                           | Actor                | Permiso | Estado       | Dependencia principal   |
| ----------------------------------- | -------------------- | ------- | ------------ | ----------------------- |
| Navegar el sitio                    | Visitante público    | Ninguno | IMPLEMENTADO | Astro y marco del sitio |
| Usar navegación adaptable           | Visitante público    | Ninguno | IMPLEMENTADO | `Navigation.astro`      |
| Cambiar idioma                      | Visitante público    | Ninguno | IMPLEMENTADO | Núcleo i18n             |
| Consumir pie y contacto global      | Visitante público    | Ninguno | IMPLEMENTADO | `Footer.astro`          |
| Resolver metadatos y rutas ausentes | Visitante o buscador | Ninguno | IMPLEMENTADO | `BaseLayout.astro`      |

#### Casos de Uso

## WEB-SHELL-UC-001 — Navegar entre las superficies públicas

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Acceder a inicio, Nosotros, servicios, galería y contacto desde una navegación persistente.

**Precondiciones:** Una página pública generada está disponible.

**Disparador:** El visitante activa el logotipo o un enlace principal.

**Flujo principal:** 1. La navegación deriva enlaces localizados. 2. El visitante abre una ruta o ancla. 3. La página conserva el idioma actual. 4. El enlace de la página activa expone `aria-current`.

**Comportamiento del sistema:** El logotipo vuelve al inicio; el menú de servicios deriva ocho rutas del catálogo canónico; las anclas de inicio se resuelven mediante `anchorPrefix` desde páginas internas.

**Resultado exitoso:** Destino correcto en el mismo idioma y con contenido accesible desde `#main-content`.

**Resultados alternativos / errores:** Un destino desconocido muestra la página localizada de recurso no encontrado; enlaces externos conservan su URL.

**Interacción entre repositorios:** Consume estilos de `@mosaique-evenements-inc/ui@0.2.0`; no consulta `mosaique-api`.

**Identificadores de negocio:** Slugs de servicios/eventos y anclas editoriales.

**Evidencia:** `navigation.ts`, `Navigation.astro`, `ServicesDropdown.astro`, `paths.ts`, rutas bajo `src/pages/`.

**Limitaciones conocidas:** No existe búsqueda global, cuenta de usuario ni navegación hacia módulos administrativos.

## WEB-SHELL-UC-002 — Operar el menú adaptable y el catálogo de servicios

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante en escritorio, tableta o móvil.

**Acceso requerido:** Ninguno.

**Objetivo:** Navegar con puntero, tacto o teclado en cualquier tamaño compatible.

**Precondiciones:** Cabecera del sitio visible.

**Disparador:** Apertura del desplegable de servicios o del menú de pantalla completa.

**Flujo principal:** 1. Escritorio abre el desplegable de servicios. 2. Tableta/móvil abre un `dialog` modal. 3. El acordeón muestra las ocho rutas. 4. El visitante elige un enlace o cierra con botón/Escape.

**Comportamiento del sistema:** Bloquea y restaura el desplazamiento, mantiene contenido cerrado inerte, devuelve el foco al activador y cierra el diálogo al navegar.

**Resultado exitoso:** Navegación seleccionada sin pérdida de foco ni desplazamiento residual.

**Resultados alternativos / errores:** Clic exterior, Escape o acción de cierre descartan el menú; movimiento reducido elimina transiciones no esenciales.

**Interacción entre repositorios:** Sólo composición local Astro/CSS y símbolos de interfaz.

**Identificadores de negocio:** `service-01` a `service-08` y slugs canónicos.

**Evidencia:** `FullscreenNavigation.astro`, `NavigationDropdown.astro`, `ServicesDropdown.astro`, `navigation-menu.css`.

**Limitaciones conocidas:** No hay navegación dinámica desde un CMS; el catálogo cambia únicamente con una nueva compilación.

## WEB-SHELL-UC-003 — Cambiar el idioma conservando el destino

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Ver la misma superficie en español, inglés canadiense o francés canadiense.

**Precondiciones:** La ruta existe en la matriz localizada.

**Disparador:** Selección de `ES`, `EN` o `FR`.

**Flujo principal:** 1. Detecta idioma desde la URL. 2. Elimina el prefijo actual. 3. Agrega el prefijo objetivo (`/en` o `/fr`, ninguno para español). 4. Conserva consulta y fragmento. 5. Navega a la traducción.

**Comportamiento del sistema:** Usa `es`, `en-CA` y `fr-CA` como etiquetas; mantiene IDs, slugs y relaciones invariantes; los diccionarios pertenecen a cada funcionalidad.

**Resultado exitoso:** Página equivalente con textos, controles, metadatos y atributos accesibles localizados.

**Resultados alternativos / errores:** Una traducción ausente falla en desarrollo; en producción no expone una clave técnica y usa español cuando el diccionario aplicable lo permite.

**Interacción entre repositorios:** No hay traducción remota ni interacción con otros repositorios.

**Identificadores de negocio:** Locales `es`, `en`, `fr`; etiquetas `es`, `en-CA`, `fr-CA`.

**Evidencia:** `astro.config.mjs`, `src/core/i18n/`, `LanguageSwitcher.astro`, carpetas `i18n` de cada funcionalidad, rutas `[locale]`.

**Limitaciones conocidas:** Los slugs no se traducen; sólo los tres idiomas declarados están disponibles.

## WEB-SHELL-UC-004 — Consultar el pie global y los datos de contacto

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Acceder a enlaces corporativos, servicios, colaboradores y contacto verificado.

**Precondiciones:** Página que compone `Footer.astro`.

**Disparador:** El visitante alcanza el final de la página o activa un enlace del pie.

**Flujo principal:** 1. Presenta grupos de empresa, recursos y servicios. 2. Escritorio los mantiene abiertos. 3. Móvil permite expandirlos. 4. Expone teléfono, correo, ubicación y colaboradores. 5. Navega de forma localizada.

**Comportamiento del sistema:** Las anclas en la misma página actualizan URL y posición inmediatamente; colaboradores externos abren una pestaña segura; los datos provienen de fuentes tipadas.

**Resultado exitoso:** Contacto o destino seleccionado accesible sin duplicar datos en componentes.

**Resultados alternativos / errores:** Un enlace sin destino aprobado no se inventa; no existen boletín ni enlaces legales ficticios.

**Interacción entre repositorios:** Usa recursos locales y estilos compartidos; no crea registros externos.

**Identificadores de negocio:** No aplica.

**Evidencia:** `footer.ts`, `collaborators.ts`, `Footer.astro`, `footer.css`.

**Limitaciones conocidas:** No hay boletín, redes sociales ni rutas legales dedicadas.

## WEB-SHELL-UC-005 — Publicar metadatos y recuperarse de una ruta ausente

**Estado:** IMPLEMENTADO

**Actor(es):** Motor de búsqueda y visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Interpretar cada página y volver al inicio ante una URL desconocida.

**Precondiciones:** Compilación Astro; `SITE_URL` opcional.

**Disparador:** Solicitud de una página, `robots.txt` o ruta inexistente.

**Flujo principal:** 1. `BaseLayout` emite idioma, título, descripción, URL canónica, Open Graph, Twitter, alternos y JSON-LD. 2. `robots.txt` permite rastreo. 3. Con `SITE_URL`, el mapa del sitio y las referencias son absolutos. 4. Una ruta ausente muestra 404 localizada con acción al inicio.

**Comportamiento del sistema:** La página 404 usa `noindex, nofollow`; el mapa del sitio sólo se integra cuando existe `SITE_URL`; no publica una imagen social sin recurso aprobado.

**Resultado exitoso:** Metadatos coherentes por idioma o recuperación clara desde 404.

**Resultados alternativos / errores:** Sin `SITE_URL`, no se anuncia un mapa del sitio absoluto y las URL de metadatos quedan relativas a la ruta.

**Interacción entre repositorios:** No consulta servicios; la publicación depende de la configuración de despliegue.

**Identificadores de negocio:** `hreflang`, `x-default`, `es_CA`, `en_CA`, `fr_CA`.

**Evidencia:** `BaseLayout.astro`, `language.ts`, `robots.txt.ts`, `NotFoundPage.astro`, `astro.config.mjs`.

**Limitaciones conocidas:** Dominio público definitivo y `SITE_URL` no están confirmados; no hay imagen social aprobada.

### Módulo: Página de Inicio

#### Resumen de Capacidades

| Capacidad                       | Actor                | Permiso | Estado       | Dependencia principal |
| ------------------------------- | -------------------- | ------- | ------------ | --------------------- |
| Explorar propuesta y proceso    | Visitante público    | Ninguno | IMPLEMENTADO | Contenido de inicio   |
| Explorar eventos destacados     | Visitante público    | Ninguno | IMPLEMENTADO | Catálogo de eventos   |
| Consultar preguntas y contactar | Visitante interesado | Ninguno | IMPLEMENTADO | FAQ y CTA final       |

#### Casos de Uso

## WEB-HOME-UC-001 — Explorar la propuesta, servicios y proceso

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Comprender la propuesta de MOSAÏQUE, sus servicios y su proceso operativo.

**Precondiciones:** Ruta de inicio localizada.

**Disparador:** El visitante abre `/`, `/en/` o `/fr/` y desplaza la página.

**Flujo principal:** 1. La portada presenta video, mensaje y acción de contacto. 2. El panel revela eventos y ocho escenas de servicios. 3. El visitante abre detalle o cotización. 4. Consulta las cinco etapas del proceso y la banda editorial.

**Comportamiento del sistema:** Renderiza Astro estático; conserva desplazamiento nativo; escenas adhesivas reducen animación sin ocultar contenido cuando se solicita movimiento reducido.

**Resultado exitoso:** Propuesta, catálogo resumido y proceso visibles con acciones localizadas.

**Resultados alternativos / errores:** Si un medio aprobado no carga, su contrato mantiene dimensiones; no se crea contenido de negocio en ejecución.

**Interacción entre repositorios:** Consume variables de diseño públicas de `mosaique-ui`; no consulta la API.

**Identificadores de negocio:** `service-01` a `service-08`, slugs de servicio.

**Evidencia:** `HomePage.astro`, `Hero.astro`, `HomeServicesShowcase.astro`, `Process.astro`, contenidos e i18n de inicio.

**Limitaciones conocidas:** La sección Nosotros del inicio y los testimonios no están renderizados; el contenido cambia sólo mediante compilación.

## WEB-HOME-UC-002 — Recorrer experiencias destacadas

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Descubrir eventos realizados y abrir su detalle.

**Precondiciones:** Inicio cargado y catálogo de seis eventos válido.

**Disparador:** El visitante llega a la sección de proyectos/experiencias.

**Flujo principal:** 1. Visualiza eventos en pares en escritorio o uno por vez en tamaños compactos. 2. Avanza con controles, teclado o tacto. 3. El estado accesible anuncia la posición. 4. Abre la ruta del evento o la galería completa.

**Comportamiento del sistema:** Usa la misma colección canónica que galería y detalles; conserva orden, IDs, categorías e imágenes aprobadas.

**Resultado exitoso:** Evento seleccionado abierto en su ruta localizada.

**Resultados alternativos / errores:** El primer/último control respeta sus límites; movimiento reducido conserva acceso sin transiciones decorativas.

**Interacción entre repositorios:** Navegación interna únicamente.

**Identificadores de negocio:** `event-slot-01` a `event-slot-06` y slugs de evento.

**Evidencia:** `ProjectsExperiences.astro`, `archive.ts`, `events.ts`, contenido traducido de inicio/eventos.

**Limitaciones conocidas:** No carga eventos desde CMS ni permite búsqueda desde la sección.

## WEB-HOME-UC-003 — Consultar preguntas frecuentes e iniciar contacto

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante interesado.

**Acceso requerido:** Ninguno.

**Objetivo:** Resolver preguntas frecuentes y avanzar a una solicitud.

**Precondiciones:** Inicio cargado.

**Disparador:** El visitante abre una pregunta o activa una acción final.

**Flujo principal:** 1. Expande una pregunta nativa. 2. Lee la respuesta localizada. 3. Activa “Hablemos” o la acción final. 4. Navega a `/contact` en el idioma actual.

**Comportamiento del sistema:** Usa `details`/`summary`, contenido localizado y enlaces reales; no abre el formulario como diálogo global.

**Resultado exitoso:** Respuesta visible o página de contacto abierta.

**Resultados alternativos / errores:** El visitante puede cerrar la pregunta sin perder posición; sin JavaScript los detalles y enlaces siguen siendo operables.

**Interacción entre repositorios:** No interactúa con la API hasta el envío del formulario de contacto.

**Identificadores de negocio:** No aplica.

**Evidencia:** `Faq.astro`, `FinalCta.astro`, contenidos `faq.ts` y traducciones de inicio.

**Limitaciones conocidas:** No existe búsqueda en FAQ ni atención conversacional en tiempo real.

### Módulo: Nosotros

#### Resumen de Capacidades

| Capacidad                       | Actor             | Permiso | Estado       | Dependencia principal       |
| ------------------------------- | ----------------- | ------- | ------------ | --------------------------- |
| Conocer la empresa y su trabajo | Visitante público | Ninguno | IMPLEMENTADO | Contenido y medios de About |

#### Casos de Uso

## WEB-ABOUT-UC-001 — Conocer la empresa mediante una composición editorial

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Comprender el posicionamiento de MOSAÏQUE y observar una selección visual de experiencias.

**Precondiciones:** Ruta `/about`, `/en/about` o `/fr/about`.

**Disparador:** El visitante abre Nosotros y desplaza la página.

**Flujo principal:** 1. Lee el mensaje principal localizado. 2. La entrada revela caracteres al entrar en vista. 3. Recorre un mosaico de 31 medios seleccionados. 4. Continúa al pie global.

**Comportamiento del sistema:** Los medios se derivan de activos aprobados de eventos; son decorativos dentro del mosaico y las etiquetas editoriales se localizan cuando corresponde; movimiento reducido revela el texto inmediatamente.

**Resultado exitoso:** Narrativa y mosaico completos sin navegación de negocio adicional.

**Resultados alternativos / errores:** Sin soporte de observador o con movimiento reducido, el contenido permanece disponible sin depender de animación.

**Interacción entre repositorios:** Recursos locales y estilos compartidos; sin API.

**Identificadores de negocio:** IDs técnicos de medios y eventos de origen.

**Evidencia:** `AboutPage.astro`, `AboutHero.astro`, `AboutMediaMosaic.astro`, `about.ts`, i18n de About.

**Limitaciones conocidas:** No incluye hitos, métricas, equipo, biografías ni contenido administrable remotamente.

### Módulo: Servicios

#### Resumen de Capacidades

| Capacidad                              | Actor             | Permiso | Estado       | Dependencia principal            |
| -------------------------------------- | ----------------- | ------- | ------------ | -------------------------------- |
| Consultar un servicio                  | Visitante público | Ninguno | IMPLEMENTADO | Catálogo de ocho servicios       |
| Explorar medios y eventos relacionados | Visitante público | Ninguno | IMPLEMENTADO | Galerías y relaciones de eventos |

#### Casos de Uso

## WEB-SVC-UC-001 — Consultar el detalle de un servicio

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Conocer alcance, público ideal y medios de un servicio concreto.

**Precondiciones:** Uno de los ocho slugs canónicos.

**Disparador:** El visitante abre `/services/[slug]` o su ruta localizada.

**Flujo principal:** 1. Astro genera la ruta desde el catálogo. 2. Localiza título, descripción, público ideal y acción. 3. Presenta medio destacado y galería. 4. La acción comercial abre contacto con `?service=[slug]`.

**Comportamiento del sistema:** Valida unicidad de IDs/slugs al compilar; cada registro conserva `featuredMedia`, galería y relación estable.

**Resultado exitoso:** Servicio completo visible y cotización preseleccionable.

**Resultados alternativos / errores:** Slug no generado muestra 404; una galería vacía mantiene el detalle sin inventar imágenes.

**Interacción entre repositorios:** Navegación a contacto local; no consulta la API hasta un envío posterior.

**Identificadores de negocio:** `service-01` a `service-08` y ocho slugs canónicos.

**Evidencia:** `services.ts`, `ServiceDetailPage.astro`, rutas `services/[slug].astro`, selectores e i18n de servicios.

**Limitaciones conocidas:** No presenta precios, disponibilidad, paquetes de `Inventory` ni contratación directa.

## WEB-SVC-UC-002 — Explorar la galería y eventos relacionados de un servicio

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Examinar fotografías y ejemplos vinculados al servicio.

**Precondiciones:** Servicio con medios o eventos relacionados.

**Disparador:** Activación de una imagen o un evento relacionado.

**Flujo principal:** 1. Abre el visor modal desde una imagen. 2. Avanza con botones o flechas. 3. Cierra con botón, Escape o fondo. 4. El foco vuelve a la miniatura. 5. Puede abrir un evento relacionado o contactar.

**Comportamiento del sistema:** El visor bloquea/restaura desplazamiento, anuncia posición y limita anterior/siguiente; las relaciones usan `serviceId` compartido.

**Resultado exitoso:** Imagen examinada o evento relacionado abierto en el idioma actual.

**Resultados alternativos / errores:** Sin galería no muestra controles vacíos; primer y último elemento deshabilitan la dirección inválida.

**Interacción entre repositorios:** Sólo contenido local; contacto posterior puede crear una oportunidad en `mosaique-api`.

**Identificadores de negocio:** `ServiceId`, IDs/slugs de eventos vinculados.

**Evidencia:** `ServiceGallery.astro`, `ServiceLightbox.astro`, `ServiceRelatedEvents.astro`, `getEventsByServiceId`.

**Limitaciones conocidas:** No hay descarga, favoritos, compartir ni consulta dinámica de disponibilidad.

### Módulo: Galería y Eventos

#### Resumen de Capacidades

| Capacidad                              | Actor             | Permiso | Estado       | Dependencia principal       |
| -------------------------------------- | ----------------- | ------- | ------------ | --------------------------- |
| Filtrar el archivo de eventos          | Visitante público | Ninguno | IMPLEMENTADO | Categorías estáticas        |
| Consultar un evento                    | Visitante público | Ninguno | IMPLEMENTADO | Catálogo de seis eventos    |
| Examinar imágenes y otras experiencias | Visitante público | Ninguno | IMPLEMENTADO | Visor y secuencia editorial |

#### Casos de Uso

## WEB-GAL-UC-001 — Filtrar el archivo de eventos por categoría

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Encontrar eventos de una categoría o ver el archivo completo.

**Precondiciones:** Ruta `/gallery` o categoría generada.

**Disparador:** El visitante selecciona Todos, Boda, Celebración, Celebración privada, Cumpleaños o Festival.

**Flujo principal:** 1. La categoría abre una ruta estática. 2. Filtra la colección canónica. 3. Marca el filtro actual. 4. Muestra número y filas visibles. 5. Cada fila enlaza al evento localizado.

**Comportamiento del sistema:** Las categorías se derivan de eventos, conservan slugs estables y usan desplazamiento natural; títulos se revelan al entrar en vista o inmediatamente con movimiento reducido.

**Resultado exitoso:** Lista correcta para la categoría y evento seleccionable.

**Resultados alternativos / errores:** Activar el filtro actual no navega; una categoría inexistente no se genera y termina en 404.

**Interacción entre repositorios:** Sin interacción externa.

**Identificadores de negocio:** `wedding`, `celebration`, `privateCelebration`, `birthday`, `festival`; slugs de categoría.

**Evidencia:** `categories.ts`, `archive.ts`, `GalleryArchive.astro`, rutas `gallery/[category].astro`.

**Limitaciones conocidas:** No hay búsqueda, combinación de filtros, orden configurable ni carga de eventos desde servidor.

## WEB-EVT-UC-001 — Consultar el detalle de un evento realizado

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Revisar descripción, medio destacado y galería de una experiencia.

**Precondiciones:** Uno de los seis slugs canónicos de evento.

**Disparador:** Apertura desde inicio, galería, servicio relacionado o URL directa.

**Flujo principal:** 1. Astro obtiene el registro. 2. Localiza título/descripcion y etiqueta de colaboración cuando aplica. 3. Presenta encabezado, medio destacado y galería aprobada. 4. Ofrece otras cinco experiencias y contacto.

**Comportamiento del sistema:** Valida IDs/slugs únicos, categoría existente y `serviceId` válido durante compilación; genera todas las rutas para los tres idiomas.

**Resultado exitoso:** Evento completo visible con medios optimizados y metadatos propios.

**Resultados alternativos / errores:** Slug ausente muestra 404; medios preservan proporción y texto alternativo aprobado.

**Interacción entre repositorios:** No consulta `mosaique-api`; la acción de contacto navega al formulario local.

**Identificadores de negocio:** `event-slot-01` a `event-slot-06`, categorías, slugs y `ServiceId`.

**Evidencia:** `events.ts`, archivos bajo `features/events/data`, `EventDetailPage.astro`, rutas `events/[slug].astro`.

**Limitaciones conocidas:** No hay fechas, sedes, clientes, entradas ni datos operativos conectados a `Activities`.

## WEB-EVT-UC-002 — Examinar imágenes y continuar a otras experiencias

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante público.

**Acceso requerido:** Ninguno.

**Objetivo:** Ampliar fotografías de un evento y continuar explorando el catálogo.

**Precondiciones:** Evento con galería aprobada.

**Disparador:** Activación de una imagen o de la secuencia “Más experiencias”.

**Flujo principal:** 1. Abre imagen en `dialog`. 2. Navega con botones o flechas. 3. El estado anuncia imagen y posición. 4. Cierra y recupera el foco. 5. Selecciona otra experiencia de la secuencia ordenada.

**Comportamiento del sistema:** No cicla fuera de límites; bloquea desplazamiento durante el visor; la secuencia rota desde el evento actual sin duplicarlo.

**Resultado exitoso:** Imagen ampliada o siguiente evento abierto.

**Resultados alternativos / errores:** Escape, botón o fondo cierran; movimiento reducido conserva controles y elimina desplazamiento artificial.

**Interacción entre repositorios:** Navegación local únicamente.

**Identificadores de negocio:** IDs/slugs de eventos e índices de imagen.

**Evidencia:** `EventGallery.astro`, `EventLightbox.astro`, `EventMoreGalleries.astro`, generadores de rutas.

**Limitaciones conocidas:** No hay zoom, descarga, comentarios ni actualización dinámica de fotografías.

### Módulo: Contacto y Oportunidades Comerciales

#### Resumen de Capacidades

| Capacidad                     | Actor                | Permiso | Estado       | Dependencia principal      |
| ----------------------------- | -------------------- | ------- | ------------ | -------------------------- |
| Preparar una solicitud        | Visitante interesado | Ninguno | IMPLEMENTADO | Formulario de cotización   |
| Revisar y corregir datos      | Visitante interesado | Ninguno | IMPLEMENTADO | Validación local           |
| Crear una oportunidad pública | Visitante interesado | Ninguno | IMPLEMENTADO | `POST /functions/v1/leads` |

#### Casos de Uso

## WEB-LEAD-UC-001 — Preparar una solicitud de contacto o cotización

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante interesado.

**Acceso requerido:** Ninguno; endpoint público.

**Objetivo:** Proporcionar datos mínimos de contacto y del evento.

**Precondiciones:** Ruta `/contact` localizada.

**Disparador:** El visitante abre contacto directamente o desde `?service=[slug]`.

**Flujo principal:** 1. Un slug válido preselecciona su `service-##`. 2. Ingresa nombre, correo y teléfono canadiense. 3. Selecciona idioma, servicio, tipo y rango de invitados. 4. Elige fecha futura o la marca como desconocida. 5. Solicita revisión.

**Comportamiento del sistema:** El teléfono muestra `+1` fijo y acepta 7–10 dígitos; los selectores personalizados conservan controles nativos; el calendario impide periodos pasados y admite teclado/Escape.

**Resultado exitoso:** Los ocho campos del contrato quedan preparados para revisión.

**Resultados alternativos / errores:** Slug desconocido no preselecciona; campos ausentes o inválidos muestran todos los errores y enfocan el primero.

**Interacción entre repositorios:** Aún no consulta `mosaique-api`; servicios provienen del catálogo local.

**Identificadores de negocio:** `service-01` a `service-08`; campos `fullName`, `email`, `phone`, `service`, `eventType`, `eventDate`, `guestRange`, `preferredLanguage`.

**Evidencia:** `QuoteForm.astro`, `QuoteContactStep.astro`, `QuoteEventStep.astro`, `CustomSelect.astro`, `EventDatePicker.astro`.

**Limitaciones conocidas:** Alcance telefónico fijo `+1`; no captura presupuesto, sede, mensaje libre ni archivos.

## WEB-LEAD-UC-002 — Revisar y corregir una solicitud antes de enviarla

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante interesado.

**Acceso requerido:** Ninguno.

**Objetivo:** Confirmar la información exacta antes de crear la oportunidad.

**Precondiciones:** Campos locales válidos.

**Disparador:** Activación de la acción de revisión.

**Flujo principal:** 1. Valida el formulario completo. 2. Muestra resumen de contacto y evento. 3. El visitante elige editar. 4. Conserva todos los valores. 5. Regresa a revisión y confirma el envío.

**Comportamiento del sistema:** La revisión es un estado separado, no otro formulario; la fecha se presenta localizada; durante la solicitud deshabilita la acción para impedir dobles clics.

**Resultado exitoso:** Cuerpo normalizado listo para transporte o valores corregidos sin pérdida.

**Resultados alternativos / errores:** Si un valor se invalida antes de confirmar, vuelve a los campos, presenta errores y enfoca el primer control inválido.

**Interacción entre repositorios:** Ninguna hasta la confirmación final.

**Identificadores de negocio:** Los ocho nombres de campo del contrato público.

**Evidencia:** `QuoteReview.astro`, lógica de `QuoteForm.astro`, `validators/leads.ts`, traducciones de cotización.

**Limitaciones conocidas:** No guarda borradores ni permite retomar la revisión desde otro dispositivo o después de recargar.

## WEB-LEAD-UC-003 — Enviar una oportunidad comercial pública

**Estado:** IMPLEMENTADO

**Actor(es):** Visitante interesado y `mosaique-api`.

**Acceso requerido:** Ninguno; requiere configuración pública `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`.

**Objetivo:** Registrar una oportunidad para seguimiento comercial.

**Precondiciones:** Ocho campos validados; cuerpo menor o igual al límite de la API.

**Disparador:** Confirmación desde la revisión.

**Flujo principal:** 1. Normaliza espacios, correo, teléfono `+1`, fecha e idioma. 2. Emite `quote:submit-request`. 3. Envía `POST /functions/v1/leads` con clave pública y plazo de 12 segundos. 4. Exige `201`. 5. Valida `LEA-########`, `NEW` y `createdAt`. 6. Reinicia el formulario y muestra confirmación accesible.

**Comportamiento del sistema:** Envía exclusivamente los ocho campos; `mosaique-api` fija `source: WEBSITE` y `status: NEW`; no devuelve PII en la confirmación canónica.

**Resultado exitoso:** Oportunidad `LEA-########` persistida y aviso de éxito visible durante 5,5 segundos o hasta cierre manual.

**Resultados alternativos / errores:** `400`, `413`, `422`, `500`, tiempo agotado, red o respuesta incompatible conservan los valores y muestran información segura, incluso por campo cuando la API lo indica.

**Interacción entre repositorios:** `mosaique-web` → `mosaique-api` → PostgreSQL; la gestión posterior requiere un consumidor administrativo futuro.

**Identificadores de negocio:** `LEA-########`, `NEW`, `WEBSITE`, `createdAt`.

**Evidencia:** `public-lead-capture.ts`, `LeadSubmissionTransport.tsx`, `useLeadSubmission.ts`, `leads.service.ts`, `http-leads.transport.ts`, pruebas `public-lead-capture.test.ts`.

**Limitaciones conocidas:** Sin CAPTCHA/honeypot, limitación de frecuencia, idempotencia, protección por `DO_NOT_CONTACT`, archivos, asignación o conversión automática; `mosaique-admin` no gestiona oportunidades todavía.

## Interacciones entre Repositorios

- Captura comercial: `mosaique-web` → `mosaique-api` `POST /functions/v1/leads` → `Lead` `NEW` con origen `WEBSITE` → persistencia PostgreSQL.
- Gestión posterior: la API admite operaciones protegidas de oportunidades, pero `mosaique-admin` no implementa esa superficie; Web no consulta ni modifica una oportunidad después de crearla.
- Interfaz compartida: Web consume `@mosaique-evenements-inc/ui@0.2.0` para variables de diseño públicas y conserva localmente sus composiciones cinematográficas.
- `mosaique-sdk` no participa en ejecución; Web mantiene el contrato público de oportunidades dentro de su funcionalidad.
- Eventos y servicios de Web son contenido editorial estático y no equivalen automáticamente a `Activities`, `Entities`, `Packages` o `Inventory` de la API.

## Responsabilidades Explícitamente Excluidas

- Autenticación, cuentas de clientes, portales privados o administración interna.
- Gestionar oportunidades después de su creación, asignarlas, agregar notas o convertirlas en entidades/actividades.
- Crear Activities, Reservations, Movements, pagos, contratos o facturas desde el sitio.
- Publicar precios, disponibilidad de Inventory o contratación transaccional.
- CMS, edición en vivo, búsqueda global, comentarios, favoritos o contenido aportado por usuarios.
- Cargar archivos de sede, documentos o medios desde el formulario.
- Protección antiabuso completa, analítica segura de abuso o deduplicación/idempotencia.

## Limitaciones Actuales

- `SITE_URL` y el dominio definitivo no están confirmados; el mapa del sitio y los metadatos absolutos dependen de esa configuración.
- La captura pública carece de CAPTCHA/honeypot, limitación de frecuencia e idempotencia; no se recomienda tráfico significativo de campaña antes del endurecimiento previsto.
- El formulario telefónico está limitado a Canadá/Norteamérica con prefijo `+1`.
- El contenido se compila desde módulos locales; no existe CMS ni actualización en tiempo real.
- Testimonios y otras fuentes preparatorias no se renderizan; no deben tratarse como capacidades públicas.
- `docs/I18N.md` y la sección R3 de `docs/ROADMAP.md` describen rutas/selector/SEO como pendientes aunque el código y la compilación de 72 páginas ya los implementan.
- `AGENTS.md` afirma que no existe script de pruebas, pero `package.json` contiene `pnpm test` con ocho pruebas de captura pública.
- No se detectaron contradicciones `SYSTEM_CONTRACT_GAP` frente a la línea base aprobada de `mosaique-api`; el contrato Web/API de oportunidades coincide.

## Notas de QA y Evidencia

- Evidencia primaria: rutas Astro, composiciones, catálogos tipados, selectores, i18n, scripts accesibles, transporte de oportunidades y pruebas bajo `src/`.
- Validar las 72 rutas generadas, las tres etiquetas de idioma, la URL canónica/`hreflang` y las rutas de servicio/evento/categoría sin traducir slugs.
- Probar navegación de escritorio y `dialog` adaptable con teclado, Escape, retorno de foco, bloqueo de desplazamiento y movimiento reducido.
- Probar visores de servicios/eventos, límites anterior/siguiente, textos alternativos, imágenes optimizadas y secuencias relacionadas.
- Probar contacto con preselección válida/inválida, calendario, los ocho campos, revisión/edición, errores API y éxito; no enviar pruebas contra producción sin autorización.
- Comparar el cuerpo Web con `API-LEAD-UC-001`: sólo ocho campos, respuesta `LEA-########`/`NEW`/`createdAt`, sin PII retornada.
- Línea base inspeccionada: rama `temp/pre-library`, HEAD `93142c95af90db91445b027b2193e306c7d6715d`.
- El repositorio estaba limpio antes de esta iniciativa.

## Regla de Mantenimiento

Cualquier cambio que agregue, elimine, modifique o extienda materialmente
un comportamiento observable del producto o del sistema debe actualizar
este documento en el mismo cambio.

Los refactors internos que preserven el comportamiento observable no
requieren modificar los casos de uso.
