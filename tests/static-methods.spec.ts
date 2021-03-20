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
