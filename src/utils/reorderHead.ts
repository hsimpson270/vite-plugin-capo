import type { DefaultTreeAdapterTypes } from 'parse5';
import { parse, serialize } from 'parse5';
import { isElement } from './isElement';
import { sortHead } from './sortHead';

const reorderHead = (html: string): string => {
  const document = parse(html);

  const htmlNode = document.childNodes.find((node) => {
    return isElement(node) && node.tagName === 'html';
  }) as DefaultTreeAdapterTypes.Element | undefined;

  const headNode = htmlNode?.childNodes.find((node) => {
    return isElement(node) && node.tagName === 'head';
  }) as DefaultTreeAdapterTypes.Element | undefined;

  if (!headNode) {
    return html;
  }

  headNode.childNodes = sortHead(headNode.childNodes);
  return serialize(document);
};

export { reorderHead };
