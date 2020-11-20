import { Guid } from "../src";

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
