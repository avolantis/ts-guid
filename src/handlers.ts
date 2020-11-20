import * as V4 from "./V4";
import { Detector, GuidLike } from "./types";
import { Version } from "./version";

export const VersionHandlers = { V4 };

export function detectVersion(value: GuidLike): Version {
  const check = ({ detector }: { detector: Detector }) => detector(value);
  const handler = Object.values(VersionHandlers).find(check);
  return handler?.version || Version.NEUTRAL;
}
