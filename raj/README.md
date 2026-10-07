# rajvardhan-patil

Personal portfolio of Rajvardhan Patil, presented as a search engine: type a
technology, employer or project and the matching parts of the résumé come back
as results.

Built with Angular (standalone components, signals, zoneless) and plain SCSS.
No UI library and no backend; the whole site is static.

## Develop

```bash
npm install
npm start        # http://localhost:4200
```

## Edit the content

Everything on the site is rendered from one file:

```
src/app/data/profile.ts
```

Add an entry to `ENTRIES` and it is searchable straight away. The matching and
ranking logic lives in `src/app/core/search.service.ts`.

## Build and deploy

```bash
npm run build                      # outputs dist/raj-portfolio/browser
npx firebase-tools deploy --only hosting
```

`firebase.json` is already set up for single-page routing and long-lived
caching of hashed assets.
