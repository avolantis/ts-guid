import { Guid, GuidVersion, GuidVariant } from "../src";

const VALIDATOR = /([a-f0-9]{8})[-_]?([a-f0-9]{4})[-_]?([1-5][a-f0-9]{3})[-_]?([89ab][a-f0-9]{3})[-_ ]?([a-f0-9]{12})/i;

describe("Guid.newGuid()", () => {
  // Test each 50 times
  const RUNS = 50;

  it("should generate valid strings", () => {
    for (let i = 0; i < RUNS; i++) {
      const guid = Guid.newGuid();

      expect(guid.isEmpty()).toBeFalsy();
      expect(guid.toString()).toHaveLength(36);
      expect(guid.toString()).toMatch(VALIDATOR);
      expect(guid.toString().substring(14, 15)).toEqual("4");
      expect(guid.toString().substring(19, 20)).toMatch(/[89ab]/);
    }
  });

  it("should generate valid bytes", () => {
    for (let i = 0; i < RUNS; i++) {
      const guid = Guid.newGuid();

      expect(guid.isEmpty()).toBeFalsy();
      expect(guid.toByteArray()).toBeInstanceOf(Array);
      expect(guid.toByteArray()).toHaveLength(16);

      const bytes = guid.toByteArray();
      for (let i = 0; i < 16; i++) {
        expect(bytes[i]).not.toBeNaN();
        expect(bytes[i]).toBeGreaterThanOrEqual(0);
        expect(bytes[i]).toBeLessThanOrEqual(255);
      }

      const variant = bytes[8] >> 5;
      expect(variant).toBeGreaterThanOrEqual(4);
      expect(variant).toBeLessThanOrEqual(5);
      expect(Object.values(GuidVariant)).toContain(variant);

      const version = (bytes[6] & 0b11110000) >> 4;

      expect(version).toEqual(4);
      expect(version).toEqual(GuidVersion.V4);
      expect(Object.values(GuidVersion)).toContain(version);
    }
  });
});

describe("Guid.parse()", () => {
  it("parses valid strings", () => {
    const guid1 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    const guid2 = Guid.parse("a55edab5-c1f8-4eaf-8386-84acee2adb12");

    expect(guid1.isEmpty()).toBeFalsy();
    expect(guid1.toString()).toBe("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    expect(guid2.isEmpty()).toBeFalsy();
    expect(guid2.toString()).toBe("a55edab5-c1f8-4eaf-8386-84acee2adb12");
  });

  it("returns Guid.EMPTY when given an invalid value", () => {
    const guid1 = Guid.parse("splérikgfn");
    const guid2 = Guid.parse("0a72bba3-9be3-4d6a-d9ae-cd3815c08fc9");
    const guid3 = Guid.parse("0a72bba3-9be3-8d6a-a9ae-cd3815c08fc9");

    expect(guid1.isEmpty()).toBeTruthy();
    expect(guid2.isEmpty()).toBeTruthy();
    expect(guid3.isEmpty()).toBeTruthy();
  });

  it("returns Guid.EMPTY when given undefined or null", () => {
    expect(Guid.parse(null).isEmpty()).toBeTruthy();
    expect(Guid.parse(undefined).isEmpty()).toBeTruthy();
  });

  it("throws type error if given a defined non-string", () => {
    expect(() => Guid.parse(123)).toThrow(TypeError);
    expect(() => Guid.parse([123, 111, 55])).toThrow(TypeError);
    expect(() => Guid.parse(true)).toThrow(TypeError);
    expect(() => Guid.parse({})).toThrow(TypeError);
    expect(() => Guid.parse(() => ({}))).toThrow(TypeError);
  });
});
