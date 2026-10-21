# next/font preload missing on Windows (webpack, App Router)

Minimal reproduction: one App Router page with a `next/font/local` font and `preload: true`.

On Windows (native, not WSL), a webpack build writes an empty App Router font manifest, so the page has no `<link rel="preload" as="font">`. A Turbopack build of the same app on the same machine preloads the font.

## Steps

```sh
npm install

npm run build:webpack
cat .next/server/next-font-manifest.json
#   {"pages":{},"app":{},"appUsingSizeAdjust":false,"pagesUsingSizeAdjust":false}
npm start   # then view http://localhost:3999/ source: no font preload

rm -rf .next
npm run build:turbopack
cat .next/server/next-font-manifest.json
#   "app": { "[project]/app/page": ["static/media/test-s.p.<hash>.woff2"], ... }
npm start   # <link rel="preload" href="/_next/static/media/test-s.p.<hash>.woff2" as="font" ...>
```

Tested with `next@16.5.0-canary.21`, Node 22.18.0, Windows 11 Pro.

The font in `app/fonts/test.woff2` is Instrument Sans, under the SIL Open Font License (`app/fonts/LICENSE-InstrumentSans-OFL.txt`).
