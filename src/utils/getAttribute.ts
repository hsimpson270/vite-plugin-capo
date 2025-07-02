import type { Attributes } from '@/enums/attributes.enum';
import type { DefaultTreeAdapterTypes } from 'parse5';

export function getAttribute(
  node: DefaultTreeAdapterTypes.Element,
  name: Attributes,
): string | undefined {
  return node.attrs.find((x) => x.name === name)?.value;
}
