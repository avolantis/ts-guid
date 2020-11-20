import { isUnsafeValid } from "./unsafe";
import { Validator } from "../types";
import { Version } from "../version";
import { isByteArray } from "../util";

const UNSAFE_GUID_VALIDATOR = /^[a-f0-9]{8}[-_ ]?[a-f0-9]{4}[-_ ]?[a-f0-9]{4}[-_ ]?[a-f0-9]{4}[-_ ]?[a-f0-9]{12}$/i;
export const SAFE_GUID_VALIDATOR = /^[a-f0-9]{8}[-_ ]?[a-f0-9]{4}[-_ ]?[1-5][a-f0-9]{3}[-_ ]?[89ab][a-f0-9]{3}[-_ ]?[a-f0-9]{12}$/i;

function validate(value: string | number[]): boolean {
  if (isByteArray(value)) {
    // TODO: Also check version bits in byte form
    return true;
  }

  return isUnsafeValid()
    ? UNSAFE_GUID_VALIDATOR.test(value)
    : SAFE_GUID_VALIDATOR.test(value);
}
validate.version = Version.V4;

export const validator: Validator = validate;
