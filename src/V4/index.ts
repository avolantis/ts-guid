import { Version } from "../version";

export { detector } from "./detector";
export { generator } from "./generator";
export { validator } from "./validator";
export {
  allowUnsafeRandomGeneration,
  allowUnsafeGuidValidation
} from "./unsafe";
export const version = Version.V4;
