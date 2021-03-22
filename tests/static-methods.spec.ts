import { Guid } from "../src";

describe("Guid.compare()", () => {
  it("can compare two Guid-s", () => {
    const guid1 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    const guid2 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    const guid3 = Guid.parse(guid1.toString());
    const guid4 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fd0");

    expect(Guid.compare(guid1, guid2)).toBeGreaterThan(0);
    expect(Guid.compare(guid1, guid3)).toBe(0);
    expect(Guid.compare(guid1, guid4)).toBeLessThan(1);
  });
});

describe("Guid.equals()", () => {
  it("can determine if two Guid-s are equal", () => {
    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();
    const guid3 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    const guid4 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    const guid5 = Guid.parse("00000000-0000-0000-0000-000000000000");

    expect(Guid.equals(guid1, guid2)).toBeFalsy();
    expect(Guid.equals(guid3, guid4)).toBeTruthy();
    expect(Guid.equals(Guid.EMPTY, guid5));
  });

  it("returns false if equating to a non-Guid value", () => {
    const guid = Guid.newGuid();
    const noPrototype = { ...guid };

    // @ts-ignore
    expect(Guid.equals(guid, noPrototype)).toBeFalsy();
    // @ts-ignore
    const longLine = Guid.equals(guid, "0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    expect(longLine).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, "some string")).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, 123)).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, true)).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, { key: "value" })).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, [123, "aa"])).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, null)).toBeFalsy();
    // @ts-ignore
    expect(Guid.equals(guid, undefined)).toBeFalsy();
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(Guid.equals(guid, function () {})).toBeFalsy();
  });
});

describe("Guid.valueEquals()", () => {
  it("returns true if two Guids are the same value-wise", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid4 = Guid.newGuid();
    const guid6 = Guid.parse(guid4.toString());

    expect(Guid.valueEquals(guid1, guid2)).toBeTruthy();
    expect(Guid.valueEquals(guid2, guid1)).toBeTruthy();
    expect(Guid.valueEquals(guid4, guid6)).toBeTruthy();
  });

  it("returns false if two Guids are not the same value-wise", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4129f");
    const guid3 = Guid.newGuid();
    const guid4 = Guid.newGuid();

    expect(Guid.valueEquals(guid1, guid2)).toBeFalsy();
    expect(Guid.valueEquals(guid3, guid4)).toBeFalsy();
  });

  it("returns true if second Guid is equals value-wise but not type-wise", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = "c4f3a98a-f800-49a1-b90a-84b228c4009f";
    const guid3 = {
      toString() {
        return guid2;
      }
    };

    // @ts-ignore
    expect(Guid.valueEquals(guid1, guid2)).toBeTruthy();
    // @ts-ignore
    expect(Guid.valueEquals(guid1, guid3)).toBeTruthy();
    // @ts-ignore
    expect(Guid.valueEquals(Guid.parse(guid2), guid3)).toBeTruthy();
  });

  it("returns false if second Guid is neither equals value-wise nor type-wise", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = "c4f3a98a-f800-49a1-b90a-84b228c4009";
    const guid3 = "c4f3a98a-f800-49a1-b90a-84b228c4009a";

    // @ts-ignore
    expect(Guid.valueEquals(guid1, guid2)).toBeFalsy();
    // @ts-ignore
    expect(Guid.valueEquals(guid1, guid3)).toBeFalsy();
  });
});
