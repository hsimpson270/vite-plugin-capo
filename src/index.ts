import type { Plugin } from 'vite';
import { reorderHead } from './utils/reorderHead';

export function capo(): Plugin {
  return {
    name: 'vite-plugin-capo',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html: string) {
      return reorderHead(html);
    },
  };
}
