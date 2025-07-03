# vite-plugin-capo

![npm](https://img.shields.io/npm/v/vite-plugin-capo?color=brightgreen)
![downloads](https://img.shields.io/npm/dw/vite-plugin-capo?color=blue)
![license](https://img.shields.io/npm/l/vite-plugin-capo?color=lightgrey)
![bundle size](https://img.shields.io/bundlephobia/minzip/vite-plugin-capo?color=blueviolet&label=bundle%20size)

A Vite plugin to reorder your head tags at build time using [capo.js](https://rviscomi.github.io/capo.js/) rules — a performance-focused set of best practices for modern web apps.

## Why?

The order of elements in your HTML `<head>` affects how browsers load and render your page. Poor ordering can block rendering or delay critical resources.

## Features

- Automatically reorders your HTML `<head>` tags at build time.
- Optimizes `<head>` tag order for improved web performance using capo.js best practices.
- Zero configuration required.
- Built with TypeScript and strict ESM support.

> **Note:** This plugin only runs during `vite build`. It does not affect local development with `vite dev`.

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

To take it a step further, it is recommended to install the [capo.js extension](https://rviscomi.github.io/capo.js/user/extension/).

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

- Requires Vite v4+
- Supports Vite apps using HTML entry points (not SSR output)

## License

MIT

## Credits

This plugin is inspired by [capo.js](https://rviscomi.github.io/capo.js/) by [Rick Viscomi](https://twitter.com/rick_viscomi).
