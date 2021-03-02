import { compareString, formatString, isByte, isByteArray } from "../src/util";
import { EMPTY_BYTES } from "../src/constants";

it("can identify a byte", () => {
  const numArray: number[] = [];
  for (let i = -1; i < 257; i++) {
    numArray.push(i);
  }
  const stringArray: string[] = [];
  numArray.forEach((i) => stringArray.push(i.toString()));

  numArray.forEach((i) => {
    if (i < 0 || i > 255) expect(isByte(i)).toBeFalsy();
    else expect(isByte(i)).toBeTruthy();
  });
  stringArray.forEach((i) => {
    if (parseInt(i) < 0 || parseInt(i) > 255) expect(isByte(i)).toBeFalsy();
    else expect(isByte(i)).toBeTruthy();
  });
});

it("can identify a byte array", () => {
  const byteArray1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const byteArray2 = [
    120,
    0,
    182,
    225,
    123,
    222,
    1,
    11,
    46,
    40,
    174,
    199,
    12,
    122,
    255,
    0
  ];
  const badByteArray1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const badByteArray2 = [0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0];
  const badByteArray3 = [0, 0, 0, 0, 256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const badByteArray4 = 0;
  const badByteArray5 = "string";
  const badByteArray6 = () => {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  };

  expect(isByteArray(EMPTY_BYTES)).toBeTruthy();
  expect(isByteArray(byteArray1)).toBeTruthy();
  expect(isByteArray(byteArray2)).toBeTruthy();
  expect(isByteArray(badByteArray1)).toBeFalsy();
  expect(isByteArray(badByteArray2)).toBeFalsy();
  expect(isByteArray(badByteArray3)).toBeFalsy();
  expect(isByteArray(badByteArray4)).toBeFalsy();
  expect(isByteArray(badByteArray5)).toBeFalsy();
  expect(isByteArray(badByteArray6)).toBeFalsy();
  expect(isByteArray(undefined)).toBeFalsy();
  expect(isByteArray(null)).toBeFalsy();
});

//TODO strToBytes
//TODO parseString

it("can compare strings", () => {
  const stringOne = "d8878535-78bb-423d-8a07-77ede747f851";
  const stringTwo = "d8878535-78bb-423d-8a07-77ede747f850";

  expect(compareString(stringOne, stringOne)).toBe(0);
  expect(compareString(stringOne, stringTwo)).toBe(1);
  expect(compareString(stringTwo, stringOne)).toBe(-1);
});

it("can format strings", () => {
  const referenceString = "d8878535-78bb-423d-8a07-77ede747f851";
  const string1 = " d8878535-78BB-423d-8a07-77ede747f8512  ";
  const string2 = " d887853578bb423d8a0777edE747F8512  ";
  const string3 = " d8878535_78bb 423d_8A07-77edE747F8512  ";
  const string4 = "      D8878535 78BB 423D 8A07 77EDE747F8512  ";

  expect(formatString(string1)).toBe(referenceString);
  expect(formatString(string2)).toBe(referenceString);
  expect(formatString(string3)).toBe(referenceString);
  expect(formatString(string4)).toBe(referenceString);
});
