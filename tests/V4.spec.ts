import { Guid } from "../src";
import {
  allowUnsafeGuidValidation,
  allowUnsafeRandomGeneration,
  isMathRandomAllowed,
  isUnsafeValid
} from "../src/V4/unsafe";
import { detector, validator } from "../src/V4";

it("can generate a new GUID", () => {
  const guid1 = Guid.newGuid();
  const guid2 = Guid.newGuid();
  expect(guid1).toBeInstanceOf(Guid);
  expect(guid2).toBeInstanceOf(Guid);

  expect(guid1.asString()).toMatch(
    /^[a-f0-9]{8}[-_ ]?[a-f0-9]{4}[-_ ]?[1-5][a-f0-9]{3}[-_ ]?[89ab][a-f0-9]{3}[-_ ]?[a-f0-9]{12}$/
  );
  expect(guid2.asString()).toMatch(
    /^[a-f0-9]{8}[-_ ]?[a-f0-9]{4}[-_ ]?[1-5][a-f0-9]{3}[-_ ]?[89ab][a-f0-9]{3}[-_ ]?[a-f0-9]{12}$/
  );

  expect(guid1.asBytes()).not.toEqual(Guid.EMPTY.asBytes());
  expect(guid2.asBytes()).not.toEqual(Guid.EMPTY.asBytes());

  expect(guid1.asString()).not.toEqual(guid2.asString());
  expect(guid1.asBytes()).not.toStrictEqual(guid2.asBytes());

  expect(guid1.version).toBe(4);
  expect(guid2.version).toBe(4);
  expect(guid1.empty).toBeFalsy();
  expect(guid2.empty).toBeFalsy();
});

it("can validate V4 GuidLikes", () => {
  const map: Record<string, boolean> = {
    "": false,
    "blabla": false,
    "00000000-0000-0000-0000-000000000000": false,
    "d8878535-78bb-423d-8a07-77ede747f851": true,
    "D8878535-78BB-423D-8A07-77EDE747F851": true,
    "d887853578bb423d8a0777ede747f851": true,
    "D887853578BB423D8A0777EDE747F851": true,
    "d8878535 78bb 423d 8a07 77ede747f851": true,
    "D8878535 78BB 423D 8A07 77EDE747F851": true,
    "d8878535_78bb_423d_8a07_77ede747f851": true,
    "D8878535_78BB_423D_8A07_77EDE747F851": true,
    "d8878535_78bb-423d 8a0777ede747f851": true,
    "d8878535_78bB-423d 8a0777EDe747f851": true,
    "d8878535_78bB-423d 8a0777EDe747f851  ": true,
    "  d8878535_78bB-423d 8a0777EDe747f851": true,
    "  d8878535_78bB-423d 8a0777EDe747f851  ": true,
    "d8878535-78bb-823d-8607-77ede747f851": false
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const guid = Object.keys(map)[i];
    const shouldBe = map[guid];
    expect(Guid.validate(guid)).toBe(shouldBe);
  }

  expect(Guid.validate(Guid.newGuid())).toBeTruthy();
  expect(Guid.validate(Guid.newGuid().asBytes())).toBeTruthy();
  expect(Guid.validate(Guid.newGuid().asString())).toBeTruthy();

  expect(Guid.validate(Guid.EMPTY)).toBeFalsy();
  // expect(Guid.validate(Guid.EMPTY.asBytes())).toBeFalsy();
  expect(Guid.validate(Guid.EMPTY.asString())).toBeFalsy();

  expect(Guid.validate(undefined)).toBeFalsy();
  expect(Guid.validate(null)).toBeFalsy();
  expect(Guid.validate([])).toBeFalsy();
  expect(Guid.validate(42)).toBeFalsy();
  expect(Guid.validate(0)).toBeFalsy();
  expect(Guid.validate(/d8878535-78bb-423d-8a07-77ede747f851/)).toBeFalsy();

  expect(
    Guid.validate(() => "d8878535-78bb-423d-8a07-77ede747f851")
  ).toBeFalsy();
  expect(
    Guid.validate(function () {
      return "d8878535-78bb-423d-8a07-77ede747f851";
    })
  ).toBeFalsy();
});

it("is able to get and modify state of 'unsafeRnd' & 'unsafeValid'", () => {
  expect(isMathRandomAllowed()).toBeFalsy();
  expect(isUnsafeValid()).toBeFalsy();

  allowUnsafeRandomGeneration();
  allowUnsafeGuidValidation();

  expect(isMathRandomAllowed()).toBeTruthy();
  expect(isUnsafeValid()).toBeTruthy();
});
const strings = [
  "d8878535-78bb-023d-8a07-77ede747f851",
  "d8878535-78bb-123d-8a07-77ede747f851",
  "d8878535-78bb-223d-8a07-77ede747f851",
  "d8878535-78bb-323d-8a07-77ede747f851",
  "d8878535-78bb-423d-8a07-77ede747f851",
  "d8878535-78bb-523d-8a07-77ede747f851",
  "d8878535-78bb-623d-8a07-77ede747f851"
];

// 13th char is [1|2|3|4|5] & 17th char is [8|9|a|b]
// TODO: test byte array input
it("can detect a V4 Guid", () => {
  // NOTE: if a non-guidlike string is the input the function breaks

  const map: Record<string, boolean> = {
    // 13th char
    "d8878515 78bb_023d-8a07-77ede747f851": false,
    "d8878515_78bb123d 8A07-77ede747f851": true,
    "d8878515-78bb-223d-8a07-77ede747f851": true,
    "d8878515_78bb_323d_8a07_77EDE747f851": true,
    "d8878515-78bb-423d-8a07-77ede747f851": true,
    "d8878515 78bb 523d-8A07 77EDE747f851": true,
    "d8878515-78bb-623d-8a07-77ede747f851": false,
    "d8878515-78bb-723d-8a07-77ede747f851": false,
    "d8878515-78bb-823d-8a07-77ede747f851": false,
    "d8878515-78bb-923d-8a07-77ede747f851": false,
    "d8878515-78bb-a23d-8a07-77ede747f851": false,
    "d8878515-78bb-b23d-8a07-77ede747f851": false,
    "d8878515-78bb-c23d-8a07-77ede747f851": false,
    "d8878515-78bb-d23d-8a07-77ede747f851": false,
    "d8878515-78bb-e23d-8a07-77ede747f851": false,
    "d8878515-78bb-f23d-8a07-77ede747f851": false,
    // 17th char
    "d8878514-78bb-123d-0a07-77ede747f851": false,
    "d8878514-78bb-123d-1a07-77ede747f851": false,
    "d8878514-78bb-123d-2a07-77ede747f851": false,
    "d8878514-78bb-123d-3a07-77ede747f851": false,
    "d8878514-78bb-123d-4a07-77ede747f851": false,
    "d8878514-78bb-123d-5a07-77ede747f851": false,
    "d8878514-78bb-123d-6a07-77ede747f851": false,
    "d8878514-78bb-123d-7a07-77ede747f851": false,
    "  d8878514-78BB-123d-8A0777ede747f851   ": true,
    " D8878514_78bb 123D-9A07 77ede747f851": true,
    "d887851478bb123daa0777ede747f851": true,
    "d8878514_78bb_123D_BA07_77ede747f851": true,
    "d8878514-78bb-123d-ca07-77ede747f851": false,
    "d8878514-78bb-123d-da07-77ede747f851": false,
    "d8878514-78bb-123d-ea07-77ede747f851": false,
    "d8878514-78bb-123d-fa07-77ede747f851": false
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const guid = Object.keys(map)[i];
    const shouldBe = map[guid];
    expect(detector(guid)).toBe(shouldBe);
  }
  expect(detector("")).toBeFalsy();
});

//TODO: test byte array input
it("can validate formatted strings and byte arrays", () => {
  // NOTE: input has to be formatted string, otherwise fails

  const map: Record<string, boolean> = {
    // 13th char
    "d8878515-78bb-023d-8a07-77ede747f851": false,
    "d8878515-78bb123d-8a07-77ede747f851": true,
    "d8878515-78bb-223d-8a07-77ede747f851": true,
    "d8878515-78bb-323d-8a07-77ede747f851": true,
    "d8878515-78bb-423d-8a07-77ede747f851": true,
    "d8878515-78bb-523d-8A07-77ede747f851": true,
    "d8878515-78bb-623d-8a07-77ede747f851": false,
    "d8878515-78bb-723d-8a07-77ede747f851": false,
    "d8878515-78bb-823d-8a07-77ede747f851": false,
    "d8878515-78bb-923d-8a07-77ede747f851": false,
    "d8878515-78bb-a23d-8a07-77ede747f851": false,
    "d8878515-78bb-b23d-8a07-77ede747f851": false,
    "d8878515-78bb-c23d-8a07-77ede747f851": false,
    "d8878515-78bb-d23d-8a07-77ede747f851": false,
    "d8878515-78bb-e23d-8a07-77ede747f851": false,
    "d8878515-78bb-f23d-8a07-77ede747f851": false,
    // 17th char
    "d8878514-78bb-123d-0a07-77ede747f851": false,
    "d8878514-78bb-123d-1a07-77ede747f851": false,
    "d8878514-78bb-123d-2a07-77ede747f851": false,
    "d8878514-78bb-123d-3a07-77ede747f851": false,
    "d8878514-78bb-123d-4a07-77ede747f851": false,
    "d8878514-78bb-123d-5a07-77ede747f851": false,
    "d8878514-78bb-123d-6a07-77ede747f851": false,
    "d8878514-78bb-123d-7a07-77ede747f851": false,
    "d8878514-78bb-123d-8a07-77ede747f851": true,
    "d8878514-78bb-123d-9a07-77ede747f851": true,
    "d8878514-78bb-123d-aa07-77ede747f851": true,
    "d8878514-78bb-123d-ba07-77ede747f851": true,
    "d8878514-78bb-123d-ca07-77ede747f851": false,
    "d8878514-78bb-123d-da07-77ede747f851": false,
    "d8878514-78bb-123d-ea07-77ede747f851": false,
    "d8878514-78bb-123d-fa07-77ede747f851": false
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const guid = Object.keys(map)[i];
    const shouldBe = map[guid];
    expect(validator(guid)).toBe(shouldBe);
  }

  allowUnsafeGuidValidation();

  for (const mapKey in map) {
    expect(validator(mapKey)).toBeTruthy();
  }
});
