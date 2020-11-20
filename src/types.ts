import type { Guid } from "./Guid";
import { Version } from "./version";

export type GuidLike = Guid | string | number[];
export type CryptoFn = ((arr: Uint8Array) => Uint8Array) | undefined;

export type Detector = {
  (val: GuidLike): boolean;
  version: Version;
};
export type GuidGenerator = {
  (): {
    value: string;
    bytes: number[];
  };
  version: Version;
};
export type Validator = {
  (val: string | number[]): boolean;
  version: Version;
};

export type VersionHandler = {
  detector: Detector;
  generator: GuidGenerator;
  validator: Validator;
  version: Version;
};
