import { Runtype } from './runtype.ts';
import { LiteralBase } from './types/literal.ts';
import { ConstraintCheck } from './types/constraint.ts';
import { Constructor } from './types/instanceof.ts';

export type Reflect =
  | ({ tag: 'unknown' } & Runtype)
  | ({ tag: 'never' } & Runtype<never>)
  | ({ tag: 'void' } & Runtype<void>)
  | ({ tag: 'boolean' } & Runtype<boolean>)
  | ({ tag: 'number' } & Runtype<number>)
  | ({ tag: 'string' } & Runtype<string>)
  | ({ tag: 'symbol' } & Runtype<symbol>)
  | ({ tag: 'literal'; value: LiteralBase } & Runtype<LiteralBase>)
  | ({ tag: 'array'; element: Reflect; isReadonly: boolean } & Runtype<ReadonlyArray<unknown>>)
  | ({ tag: 'record'; fields: { [_: string]: Reflect }; isReadonly: boolean } & Runtype<
      { readonly [_ in string]: unknown }
    >)
  | ({ tag: 'partial'; fields: { [_: string]: Reflect } } & Runtype<{ [_ in string]?: unknown }>)
  | ({ tag: 'dictionary'; key: 'string' | 'number'; value: Reflect } & Runtype<{
      [_: string]: unknown;
    }>)
  | ({ tag: 'tuple'; components: Reflect[] } & Runtype<unknown[]>)
  | ({ tag: 'union'; alternatives: Reflect[] } & Runtype)
  | ({ tag: 'intersect'; intersectees: Reflect[] } & Runtype)
  | ({ tag: 'function' } & Runtype<(...args: any[]) => any>)
  | ({
      tag: 'constraint';
      underlying: Reflect;
      constraint: ConstraintCheck<Runtype<never>>;
      args?: any;
      name?: string;
    } & Runtype)
  | ({ tag: 'instanceof'; ctor: Constructor<unknown> } & Runtype)
  | ({ tag: 'brand'; brand: string; entity: Reflect } & Runtype);
