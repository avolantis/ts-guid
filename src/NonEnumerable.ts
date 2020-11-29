/**
 * Decorator that sets the enumerable property of a class field to false.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function NonEnumerable(target: any, key: string): any {
  const descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
  if (descriptor.enumerable != false) {
    descriptor.enumerable = false;
    descriptor.writable = true;
    Object.defineProperty(target, key, descriptor);
  }
}
