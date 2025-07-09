# vite-plugin-capo

![npm](https://img.shields.io/npm/v/vite-plugin-capo)
![downloads](https://img.shields.io/npm/dm/vite-plugin-capo)
![license](https://img.shields.io/npm/l/vite-plugin-capo)

A lightweight Vite plugin to reorder your `<head>` at build time using [capo.js](https://rviscomi.github.io/capo.js/) rules.

The order of elements in your `<head>` affects how browsers load and render your page. Poor ordering can block rendering or delay resources. Optimizing your `<head>` will increase the perceived performance of your site and can decrease the time of first render by up to 400ms for large, unoptimized pages.

## Features

- Automatically reorders your HTML `<head>` tags at build time.
- Optimizes `<head>` tag order for improved web performance using capo.js best practices.
- Zero configuration required.
- Written in TypeScript with native ESM support.

## Installation

```bash
npm i -D vite-plugin-capo
```

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { capo } from 'vite-plugin-capo';

export default defineConfig({
  plugins: [capo()],
});
```

### Testing

To test the plugin, run `vite build` after including it in your `vite.config.ts` and then run `vite preview` to see your production-ready page. Your `<head>` should now be sorted following the capo.js rules.

> **Note:** This plugin only runs during `vite build`. It does not affect local development when using `vite dev`.

For further testing, it is recommended to install the [capo.js extension](https://rviscomi.github.io/capo.js/user/extension/) to validate your results.

## How It Works

This plugin sorts `<head>` tags into the following order:

1. Pragma Directives (`<meta http-equiv>`, `<meta charset>`, `<meta name="viewport">`, and `<base>`)
2. Title (`<title>`)
3. Preconnect Hints (`<link rel="preconnect">`)
4. Asynchronous Scripts (`<script async>`)
5. Import Styles (`<style>` blocks containing `@import`)
6. Synchronous Scripts (`<script>` without `async` or `defer`)
7. Synchronous Styles (`<link rel="stylesheet">` and other non-`@import` `<style>` blocks)
8. Preload Hints (`<link rel="preload">` and `<link rel="modulepreload">`)
9. Deferred Scripts (`<script defer>` and `<script type="module">`)
10. Prefetch and Prerender Hints (`<link rel="prefetch">`, `<link rel="dns-prefetch">`, and `<link rel="prerender">`)
11. All other elements

## Example

### Before

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + React + TS</title>
  <script type="module" crossorigin src="/assets/index-9_sxcfan.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-D8b4DHJx.css" />
</head>
```

### After (sorted)

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + React + TS</title>
  <link rel="stylesheet" crossorigin="" href="/assets/index-D8b4DHJx.css" />
  <script type="module" crossorigin="" src="/assets/index-9_sxcfan.js"></script>
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
</head>
```

## Compatibility

- Requires Vite v2+
- Supports Vite apps using HTML entry points, such as React, Vue, Preact, or Svelte
- Not compatible with SSR setups, as they bypass `index.html` generation
- Not compatible with Astro — use [`astro-capo`](https://github.com/natemoo-re/astro-capo)

## Why This Is a Vite-Only Plugin

This plugin is Vite-specific because it uses the `transformIndexHtml` hook, which is part of Vite's extended plugin API.

Unlike Rollup, Vite supports transforming HTML files during the build process. The `transformIndexHtml` hook is triggered when Vite processes `index.html`, allowing this plugin to reorder `<head>` tags based on performance best practices defined by capo.js.

## License

MIT

## Credits

This plugin is inspired by [capo.js](https://rviscomi.github.io/capo.js/) by [Rick Viscomi](https://twitter.com/rick_viscomi).
