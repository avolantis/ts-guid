export function mathRandomByte(count: number): string {
  let out = "";
  for (let i = 0; i < count; i++) {
    const seed = ((1 + Math.random()) * 0x10000) | 0;
    out += seed.toString(16).substring(1);
  }
  return out;
}
