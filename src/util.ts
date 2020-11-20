import { BYTE_COUNT, FORMATTER, STR_VAL_LEN } from "./constants";

export function tryRequire(moduleId: string): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return require(moduleId);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e?.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
    return null;
  }
}

export function isByte(num: unknown): num is number {
  if (typeof num === "number") {
    return -1 < num && num < 256;
  } else if (typeof num === "string") {
    const val = parseInt(num);
    return !isNaN(val) && -1 < val && val < 256;
  } else {
    return false;
  }
}

export function isByteArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === BYTE_COUNT &&
    value.every((val) => isByte(val))
  );
}

export function parseString(value: unknown): string | undefined {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return ("" + value)?.trim?.();
}

const byteToHex: string[] = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

export function bytesToStr(bytes: number[]): string {
  const guid = bytes.reduce((val, byte) => val + byteToHex[byte], "");
  return formatString(guid);
}

export function strToBytes(str: string): number[] {
  const value = str.replace("-", "");
  const bytes = [];
  let section;

  section = parseInt(value.slice(0, 8), 16);
  bytes[0] = section >>> 24;
  bytes[1] = (section >>> 16) & 0xff;
  bytes[2] = (section >>> 8) & 0xff;
  bytes[3] = section & 0xff;

  section = parseInt(value.slice(9, 13), 16);
  bytes[4] = section >>> 8;
  bytes[5] = section & 0xff;

  section = parseInt(value.slice(14, 18), 16);
  bytes[6] = section >>> 8;
  bytes[7] = section & 0xff;

  section = parseInt(value.slice(19, 23), 16);
  bytes[8] = section >>> 8;
  bytes[9] = section & 0xff;

  section = parseInt(value.slice(24, 36), 16);
  bytes[10] = (section / 0x10000000000) & 0xff;
  bytes[11] = (section / 0x100000000) & 0xff;
  bytes[12] = (section >>> 24) & 0xff;
  bytes[13] = (section >>> 16) & 0xff;
  bytes[14] = (section >>> 8) & 0xff;
  bytes[15] = section & 0xff;

  return bytes;
}

export function compareString(a: string, b: string): -1 | 0 | 1 {
  if (a < b) return -1;
  if (a === b) return 0;
  return 1;
}

export function formatString(input: string): string {
  // Prepare a GUID string representation for
  // being passed to the Guid constructor
  const guid = input.trim().toLowerCase();

  if (guid.length == STR_VAL_LEN) {
    return guid;
  }

  const sections = FORMATTER.exec(guid)!;
  sections.shift();
  return sections.join("-");
}
