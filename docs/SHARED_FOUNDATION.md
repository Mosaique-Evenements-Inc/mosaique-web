# Shared Foundation Integration

Web consumes `@mosaique-evenements-inc/ui@0.2.0/tokens.css` through the package's
public CSS export. `foundation.css` is not imported: Web retains its existing reset.
`recipes.css` is also not imported because Web's controls, forms, and marketing CTAs
retain product-specific composition and behavior.

## Ownership

The package owns colors/focus, spacing primitives and micro/component/content/page-gutter
aliases, radius primitives, global layers, non-cinematic motion fundamentals, blur
magnitudes, and max-reading. Responsive vocabulary remains documented in the package;
Web retains its Tailwind breakpoint configuration.

The shared sans stack plus body and caption metrics now back Web's equivalent local
roles without changing their rendered values. Quote controls map their existing 60px
geometry to the shared `comfortable` density minimum, and real validation errors use
shared error semantics with an accessible dark-surface foreground adaptation. Web owns
display typography and font delivery, compact label/navigation roles, control padding
and pill geometry, cinematic colors and image overlay, section rhythm,
max-content/grid/sticky geometry, cinematic motion and motion recipes, scene stacking,
marketing CTA recipes, and feature-specific overrides. The unresolved `--space-28`
and `--font-weight-regular` references remain unchanged.

## Loading and Tailwind

`global.css` loads Tailwind, shared package tokens, the local `shared-theme.css`
adapter, and then local primitives, semantic colors, typography, spacing, layout,
and motion. Existing global layers and feature scopes retain their responsibilities.

`shared-theme.css` uses `@theme reference` to register the existing shared color
and easing utility names without emitting runtime definitions or copying values.
The self-references are compiler metadata only, not runtime custom properties.
Fonts, breakpoints, Tailwind's spacing unit, and cinematic easing stay in the local
theme. Contact's descendant overrides remain local and take precedence through
normal custom-property inheritance.

## Historical Tarball Validation (EP-05)

EP-05 installs the real tarball, not a linked source directory. pnpm records:

```text
@mosaique-evenements-inc/ui:
  file:../mosaique-ui/mosaique-evenements-inc-ui-0.1.0.tgz
```

This `file:` specifier refers only to the temporary packed artifact. The lockfile
records the same path, version 0.1.0, and archive integrity. It is not the final
release dependency and is not portable to CI without the sibling archive.

The temporary archive was used only for EP-05/06. Current installs require registry
authentication, not a sibling checkout or locally generated archive.

## Current: GitHub Packages 0.2.0

Web pins exact `@mosaique-evenements-inc/ui@0.2.0`, and its lockfile resolves the
GitHub Packages archive with integrity. The installed public exports are `tokens.css`,
`foundation.css`, and `recipes.css`.
The historical tarball instructions above describe EP-05 only and are not required
for current installs. The versioned `.npmrc` routes the scope without credentials.
The 18 installed package files resolve from the published archive. An isolated
install with an empty store and frozen lockfile downloaded all dependencies without
the sibling archive. Package Actions access for Web is configured as Read.

The registry migration was performed with runtime authentication using:

```sh
pnpm add --save-exact @mosaique-evenements-inc/ui@0.2.0
```

This replaced the previous package version with exact `0.2.0`. pnpm regenerated importer,
resolution/integrity and snapshot records; the old local locator is gone.

The Tailwind reference adapter is unchanged because UI-14 consumes the new roles
through CSS custom properties rather than new utilities. The cinematic success toast
also remains Web-owned; only genuine validation and submission errors adopt shared
error semantics.

Test `pnpm install --frozen-lockfile` in a fresh checkout without the sibling
archive or existing node_modules. Inspect installed version, exports and CSS bytes
against the approved artifact. Run lint, typecheck, build and diff-check, then a
targeted Chrome check of About gutters, Footer timing, Contact overrides, blur,
and unresolved `--space-28`. Repeat the broader visual matrix only if CSS differs.

### Authentication

The package grants this repository Read access in GitHub Packages **Manage
Actions access**, confirmed during EP-07. A consumer workflow needs `contents: read` and
`packages: read`. A future registry-based CI install can use this setup:

```yaml
permissions:
  contents: read
  packages: read
steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
    with:
      version: 10.23.0
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      registry-url: https://npm.pkg.github.com
      scope: "@mosaique-evenements-inc"
  - run: pnpm install --frozen-lockfile
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This is a workflow fragment, not an active Web workflow. Local developers and external build providers need a PAT (classic)
with `read:packages`, appropriate package access, and SSO authorization if required.
Inject it as `NODE_AUTH_TOKEN` through a secret manager. Runtime npm configuration
must map the registry auth key to the literal `${NODE_AUTH_TOKEN}` reference;
setting the environment variable alone does not configure npm authentication.
Use an external ephemeral userconfig via `NPM_CONFIG_USERCONFIG`, as documented
in UI's `docs/RELEASE.md`; never store the credential or modify global config here.

If registry installation or visual checks fail, retain/restore the validated
tarball dependency and matching lockfile with its original archive. Resolve access
or artifact differences before retrying; do not change visual values as a workaround.
