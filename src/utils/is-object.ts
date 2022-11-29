export function isObject(object: object): boolean {
  if (typeof object !== 'object' || object === null) return false;

  return Object.getPrototypeOf(object) === Object.prototype;
}
