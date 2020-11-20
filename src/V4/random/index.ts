import { isMathRandomAllowed } from "../unsafe";
import { mathRandomByte } from "./math";
import { nodeCrypto } from "./node";
import { webCrypto } from "./web";

export function randomStr(): string | undefined {
  if (!isMathRandomAllowed()) return undefined;
  const guid = [
    mathRandomByte(2),
    mathRandomByte(1),
    mathRandomByte(1),
    mathRandomByte(1),
    mathRandomByte(3)
  ];
  return guid.join("-").toLowerCase();
}

export function randomBytes(): number[] | undefined {
  const getRandomValues = nodeCrypto || webCrypto;
  const bytes = Uint8Array ? getRandomValues?.(new Uint8Array(16)) : undefined;

  if (bytes) {
    // UUIDs are standardized under RFC 4122, see https://tools.ietf.org/html/rfc4122
    // Per 4.4, set bits indicating Guid (UUID) version 4 and 'clock_seq_hi_and_reserved'
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
  }

  return bytes ? [...bytes] : bytes;
}
