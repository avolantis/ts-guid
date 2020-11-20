import { bytesToStr, formatString, isByteArray, parseString } from "../util";
import { Detector, GuidLike } from "../types";
import { SAFE_GUID_VALIDATOR } from "./validator";
import { Version } from "../version";
import { Guid } from "../Guid";

function match(num: string) {
  return SAFE_GUID_VALIDATOR.test(num);
}

function detect(val: GuidLike): boolean {
  if (val instanceof Guid) {
    return val.version === Version.V4;
  }
  if (isByteArray(val)) {
    return match(bytesToStr(val));
  }
  const str = parseString(val);
  return str ? match(formatString(str)) : false;
}
detect.version = Version.V4;

export const detector: Detector = detect;
