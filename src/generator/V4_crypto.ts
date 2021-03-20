import { BYTE_COUNT, EMPTY_VALUE } from "../constants";

/**
 * The default generator function, which generates unique and valid V4 GUID-s
 * using the crypto API-s.
 */
export function v4_crypto(): number[] | string {
  let bytes: ArrayLike<number> | null = null;

  if (typeof require == "function") {
    /* eslint-disable */
    // Aliasing trick to make bundlers ignore this
    const loadModule = require;
    bytes = loadModule("crypto")?.randomBytes?.(BYTE_COUNT);
    /* eslint-enable */
  }

  if (!bytes) {
    bytes = new Uint8Array(BYTE_COUNT);
    window?.crypto?.getRandomValues?.(bytes as Uint8Array);
    if ((bytes as Uint8Array).every((b) => b === 0)) {
      // No cryptographic random source is available
      return EMPTY_VALUE;
    }
  }

  if (!bytes) {
    // No cryptographic random source is available
    return EMPTY_VALUE;
  }

  const result = new Array<number>(BYTE_COUNT);

  for (let i = 0; i < BYTE_COUNT; i++) {
    // Per 4.4, set bits indicating Guid (UUID) version 4 and 'clock_seq_hi_and_reserved'
    if (i == 6) {
      result[i] = (bytes[i] & 0b00001111) | 0b01000000;
    } else if (i == 8) {
      result[i] = (bytes[i] & 0b00111111) | 0b10000000;
    } else {
      result[i] = bytes[i];
    }
  }

  return result;
}
