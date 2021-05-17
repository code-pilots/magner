/**
 * A proxy that accepts anything and returns something different
 */
export type ProxyFunc<T = any, U = any> = (data: T) => U;
