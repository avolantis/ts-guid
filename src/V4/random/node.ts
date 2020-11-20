import { tryRequire } from "../../util";
import { CryptoFn } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
export const nodeCrypto: CryptoFn = tryRequire("crypto")?.randomFillSync;
