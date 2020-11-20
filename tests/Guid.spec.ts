import { Guid } from "../src";

// prettier-ignore
const btr = [53,133,135,216,187,120,61,66,138,7,119,237,231,71,248,81];
const str = "d8878535-78bb-423d-8a07-77ede747f851";

function expectValidParsed(guid: Guid) {
  expect(guid).toBeInstanceOf(Guid);
  expect(guid.empty).toBeFalsy();
  expect(guid.version).toBe(4);

  expect(guid.asString()).toHaveLength(str.length);
  expect(guid.asString()).toEqual(str);
  expect(Guid.validate(guid.asString())).toBeTruthy();
  expect(guid.asBytes()).toHaveLength(btr.length);
  expect(guid.asBytes()).toStrictEqual(btr);
  expect(Guid.validate(guid.asBytes())).toBeTruthy();
}

function expectByteArray(numbers: number[] | Uint8Array) {
  return numbers.forEach((num: number) => {
    expect(num).toBeLessThanOrEqual(255);
    expect(num).toBeGreaterThanOrEqual(0);
  });
}

it("can parse a valid GUID string", () => {
  const guid = Guid.parse(str);
  expectValidParsed(guid);
});

it("can parse a valid GUID number array", () => {
  const guid = Guid.parse(btr);
  expectValidParsed(guid);
});

it("can convert to string representation", () => {
  const guid = Guid.newGuid();
  expect(guid.asString()).toHaveLength(36);
  expect(guid.asString()).toMatch(/^[a-f0-9-]*$/);
  expect(guid.asString()).not.toEqual(Guid.EMPTY.asString());
});

it("can convert to byte array representation", () => {
  const guid = Guid.newGuid();
  expect(guid.asBytes()).toHaveLength(16);
  expect(guid.asBytes()).not.toStrictEqual(Guid.EMPTY.asBytes());
  expectByteArray(guid.asBytes());
});
