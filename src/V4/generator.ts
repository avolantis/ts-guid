import { GuidGenerator } from "../types";
import { bytesToStr, strToBytes } from "../util";
import { randomStr, randomBytes } from "./random";
import { Version } from "../version";
import { ERR_RND_OFF } from "../constants";

function generate(): { bytes: number[]; value: string } {
  const bytes = randomBytes();
  const value = randomStr();

  if (bytes) {
    return {
      bytes,
      value: bytesToStr(bytes)
    };
  }

  if (value) {
    return {
      value,
      bytes: strToBytes(value)
    };
  }

  throw new TypeError(ERR_RND_OFF);
}
generate.version = Version.V4;

export const generator: GuidGenerator = generate;
