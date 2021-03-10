import { BYTE_COUNT } from "../constants";

/**
 * Unsafe random generator function that uses <tt>Math.random()</tt>.
 * @deprecated
 */
export function unsafeRandom(): number[] {
  const result = new Array<number>(BYTE_COUNT);
  for (let i = 0; i < BYTE_COUNT; i++) {
    const seed = ((1 + Math.random()) * 0x10000) | 0;
    result[i] = parseInt(seed.toString(16).substring(1), 16);
  }
  // Per 4.4, set bits indicating Guid (UUID) version 4 and 'clock_seq_hi_and_reserved'
  result[6] = (result[6] & 0b00001111) | 0b01000000;
  result[8] = (result[8] & 0b00111111) | 0b10000000;
  return result;
}
