/**
 * Decorator that sets the enumerable property of a class field to false.
 */
export function enumerable(value = false, readonly = false) {
  return function (
    target: any,
    name: keyof typeof target,
    desc?: PropertyDescriptor
  ): any {
    let descriptor = desc || Object.getOwnPropertyDescriptor(target, name);
    if (descriptor) {
      descriptor.enumerable = value;
      return descriptor;
    }
    descriptor = {} as PropertyDescriptor;
    descriptor.configurable = true;
    descriptor.enumerable = value;
    descriptor.writable = !readonly;
    Object.defineProperty(target, name, {
      set(v: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        Object.defineProperty(target, name, { ...descriptor, value: v });
      },
      configurable: true,
      enumerable: value
    });
  };
}
