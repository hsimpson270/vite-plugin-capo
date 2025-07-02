import { META_HTTP_EQUIV_KEYWORDS } from '@/constants/meta-http-equiv-keywords';
import { Attributes } from '@/enums/attributes.enum';
import { LinkRelKeywords } from '@/enums/link-rel-keywords.enum';
import { Tags } from '@/enums/tags.enum';
import type { DefaultTreeAdapterTypes } from 'parse5';
import { getAttribute } from './getAttribute';
import { isElement } from './isElement';

export function sortHead(
  nodes: DefaultTreeAdapterTypes.ChildNode[],
): DefaultTreeAdapterTypes.ChildNode[] {
  const pragmaDirectives: DefaultTreeAdapterTypes.ChildNode[] = [];
  const title: DefaultTreeAdapterTypes.ChildNode[] = [];
  const preconnectHints: DefaultTreeAdapterTypes.ChildNode[] = [];
  const asyncScripts: DefaultTreeAdapterTypes.ChildNode[] = [];
  const importStyles: DefaultTreeAdapterTypes.ChildNode[] = [];
  const synchronousScripts: DefaultTreeAdapterTypes.ChildNode[] = [];
  const synchronousStyles: DefaultTreeAdapterTypes.ChildNode[] = [];
  const preloadHints: DefaultTreeAdapterTypes.ChildNode[] = [];
  const deferredScripts: DefaultTreeAdapterTypes.ChildNode[] = [];
  const prefetchAndPrerenderHints: DefaultTreeAdapterTypes.ChildNode[] = [];
  const others: DefaultTreeAdapterTypes.ChildNode[] = [];

  for (const node of nodes) {
    if (!isElement(node)) {
      others.push(node);
      continue;
    }

    switch (node.tagName) {
      case Tags.Base: {
        pragmaDirectives.push(node);
        break;
      }

      case Tags.Link: {
        switch (getAttribute(node, Attributes.Rel)) {
          case LinkRelKeywords.DnsPrefetch:
          case LinkRelKeywords.Prefetch:
          case LinkRelKeywords.Prerender:
            prefetchAndPrerenderHints.push(node);
            break;
          case LinkRelKeywords.ModulePreload:
          case LinkRelKeywords.Preload:
            preloadHints.push(node);
            break;
          case LinkRelKeywords.Preconnect:
            preconnectHints.push(node);
            break;
          case LinkRelKeywords.Stylesheet:
            synchronousStyles.push(node);
            break;
          default:
            others.push(node);
            break;
        }

        break;
      }

      case Tags.Meta: {
        const httpEquiv = getAttribute(node, Attributes.HttpEquiv);

        if (
          (httpEquiv && META_HTTP_EQUIV_KEYWORDS.includes(httpEquiv)) ||
          getAttribute(node, Attributes.Charset) ||
          getAttribute(node, Attributes.Name) === 'viewport'
        ) {
          pragmaDirectives.push(node);
        } else {
          others.push(node);
        }

        break;
      }

      case Tags.Script: {
        if (getAttribute(node, Attributes.Async)) {
          asyncScripts.push(node);
        } else if (
          getAttribute(node, Attributes.Defer) ||
          getAttribute(node, Attributes.Type) === 'module'
        ) {
          deferredScripts.push(node);
        } else {
          synchronousScripts.push(node);
        }

        break;
      }

      case Tags.Style: {
        if (
          node.childNodes.some((child) => {
            return (
              child.nodeName === '#text' &&
              'value' in child &&
              child.value.includes('@import')
            );
          })
        ) {
          importStyles.push(node);
        } else {
          synchronousStyles.push(node);
        }

        break;
      }

      case Tags.Title: {
        title.push(node);
        break;
      }

      default: {
        others.push(node);
        break;
      }
    }
  }

  return [
    ...pragmaDirectives,
    ...title,
    ...preconnectHints,
    ...asyncScripts,
    ...importStyles,
    ...synchronousScripts,
    ...synchronousStyles,
    ...preloadHints,
    ...deferredScripts,
    ...prefetchAndPrerenderHints,
    ...others,
  ];
}
