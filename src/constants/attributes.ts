export const Attributes = {
  Async: 'async',
  Charset: 'charset',
  Defer: 'defer',
  HttpEquiv: 'http-equiv',
  Name: 'name',
  Rel: 'rel',
  Type: 'type',
} as const;

export type Attribute = (typeof Attributes)[keyof typeof Attributes];
