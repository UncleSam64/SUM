# Website — Servicios Universales de Montacargas

Static site (HTML + CSS + a little JS). No build step, no dependencies.
Palette and section plan: `../docs/palette-and-layout.md`.

## Run locally
```bash
cd website
python3 -m http.server 8000   # then open http://localhost:8000
```

## Before publishing
Everything editable lives in `CONFIG` at the top of `script.js`:
phone, WhatsApp, email, address, hours, `foundedYear` (1992), `mapQuery`.
Empty values hide their row (address, hours, map, years).

### Example content
Misión/visión/valores, equipo, casos de éxito, noticias y vacantes
are **examples** (marked with the `data-sample` attribute).
- Review mode: `showSamples: true` (default) shows them.
- To publish without them: `showSamples: false`.
- To keep one: replace its text with real content and delete its `data-sample` attribute.

`aviso-de-privacidad.html` and `terminos.html` are drafts; have them reviewed before publishing.
