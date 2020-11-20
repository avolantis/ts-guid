import { CryptoFn } from "../../types";

declare const global: {
  crypto?: {
    getRandomValues?: CryptoFn;
  };
  msCrypto?: {
    getRandomValues?: CryptoFn;
  };
};

export const webCrypto: CryptoFn =
  global.crypto?.getRandomValues?.bind?.(global.crypto) ||
  global.msCrypto?.getRandomValues?.bind?.(global.msCrypto);
