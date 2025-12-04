import type { DefaultTreeAdapterTypes } from 'parse5';

const isElement = (
  node: DefaultTreeAdapterTypes.ChildNode,
): node is DefaultTreeAdapterTypes.Element => {
  return node.nodeName !== '#text' && 'tagName' in node;
};

export { isElement };
