import { Guid } from "../src";

describe("Guid.prototype.equals()", () => {
  it("returns true if two Guids are the same", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid3 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4129f");
    const guid4 = Guid.newGuid();
    const guid5 = Guid.newGuid();
    const guid6 = Guid.parse(guid4.toString());

    expect(guid1.equals(guid2)).toBeTruthy();
    expect(guid2.equals(guid1)).toBeTruthy();
    expect(guid1.equals(guid3)).toBeFalsy();
    expect(guid2.equals(guid3)).toBeFalsy();
    expect(guid1.equals(guid4)).toBeFalsy();
    expect(guid4.equals(guid5)).toBeFalsy();
    expect(guid4.equals(guid4)).toBeTruthy();
    expect(guid4.equals(guid6)).toBeTruthy();
  });
});

describe("Guid.prototype.isEmpty()", () => {
  it("returns true if the Guid is empty", () => {
    const guid1 = Guid.parse("00000000-0000-0000-0000-000000000000");
    const guid2 = Guid.EMPTY;
    expect(guid1.isEmpty()).toBeTruthy();
    expect(guid2.isEmpty()).toBeTruthy();
  });

  it("returns false if the Guid is not empty", () => {
    const guid1 = Guid.parse("c4f3a98a-f800-49a1-b90a-84b228c4009f");
    const guid2 = Guid.newGuid();
    expect(guid1.isEmpty()).toBeFalsy();
    expect(guid2.isEmpty()).toBeFalsy();
  });
});

describe("Guid.prototype.compare()", () => {
  it("can compare two Guid-s", () => {
    const guid1 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    const guid2 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    const guid3 = Guid.parse(guid1.toString());
    const guid4 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fd0");

    expect(guid1.compare(guid2)).toBeGreaterThan(0);
    expect(guid1.compare(guid3)).toBe(0);
    expect(guid1.compare(guid4)).toBeLessThan(1);
  });
});

describe("Guid.prototype.valueOf()", () => {
  it("returns the string representation", () => {
    const guid1 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    const guid2 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    const guid3 = Guid.parse(guid1.toString());
    const guid4 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fd0");

    expect(guid1.valueOf()).toBe("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    expect(guid2.valueOf()).toBe("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");
    expect(guid3.valueOf()).toBe("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    expect(guid4.valueOf()).toBe("0a72bba3-9be3-4d6a-a9ae-cd3815c08fd0");
  });

  it("allows the use of operators", () => {
    const guid1 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc9");
    const guid2 = Guid.parse("0a72bba3-9be3-4d6a-a9ae-cd3815c08fc8");

    expect(guid1 < guid2).toBeFalsy();
    expect(guid1 > guid2).toBeTruthy();
    expect(guid1 <= guid2).toBeFalsy();
    expect(guid1 >= guid2).toBeTruthy();
  });
});
