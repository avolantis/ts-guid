import { Guid } from "../src";
import { unsafeRandom, v4_crypto } from "../src";
import mock = jest.mock;
import spyOn = jest.spyOn;
import { randomBytes } from "crypto";

function expectUniqueGuids(guid1: Guid, guid2: Guid) {
  expect(guid1.isEmpty()).toBeFalsy();
  expect(guid2.isEmpty()).toBeFalsy();
  expect(guid1.toString()).not.toBe(guid2.toString());
  expect(guid1.toByteArray()).not.toStrictEqual(guid2.toByteArray());
}

const mockWindowWithCrypto = () => {
  const browserCryptoMock = {
    getRandomValues: function (target: Uint8Array) {
      target.set(new Uint8Array(randomBytes(16).buffer));
      return target;
    }
  };

  Object.defineProperty(global, "crypto", {
    get(): any {
      return undefined;
    },
    configurable: true
  });
  // @ts-ignore
  const spy = spyOn(global, "crypto", "get");
  // @ts-ignore
  spy.mockImplementation(() => browserCryptoMock);
};

/* reset the generator to not affect other test */
afterEach(() => (Guid.generator = v4_crypto));

describe("v4-crypto", () => {
  it("returns an array of size 16", () => {
    const bytes = v4_crypto();
    expect(Array.isArray(bytes)).toBeTruthy();
    expect(bytes.length).toBe(16);
  });

  it("the returned values are between 0 and 255", () => {
    const bytes = v4_crypto() as number[];
    expect(bytes.every((byte) => byte > -1 && byte < 256)).toBeTruthy();
  });

  it("can be used to generate unique Guid-s", () => {
    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();

    expectUniqueGuids(guid1, guid2);
  });

  it("returns Guid.EMPTY when no crypto generator is available", () => {
    mock("crypto", () => undefined);

    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();

    expect(guid1.isEmpty()).toBeTruthy();
    expect(guid2.isEmpty()).toBeTruthy();
  });

  it("can use the browser crypto API", () => {
    mock("crypto", () => undefined);
    mockWindowWithCrypto();

    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();

    expect(guid1.isEmpty()).toBeFalsy();
    expect(guid2.isEmpty()).toBeFalsy();
  });
});

describe("unsafeRandom", () => {
  it("returns an array of size 16", () => {
    const bytes = unsafeRandom();
    expect(Array.isArray(bytes)).toBeTruthy();
    expect(bytes.length).toBe(16);
  });

  it("the returned values are between 0 and 255", () => {
    const bytes = unsafeRandom();
    expect(bytes.every((byte) => byte > -1 && byte < 256)).toBeTruthy();
  });

  it("can be used to generate unique Guid-s", () => {
    Guid.generator = unsafeRandom;
    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();

    expectUniqueGuids(guid1, guid2);
  });
});
