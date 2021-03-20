import { GuidVersion } from "./GuidVersion";
import { GuidVariant } from "./GuidVariant";
import { v4_crypto } from "./generator";
import { BYTE_COUNT, EMPTY_BYTES, EMPTY_VALUE, FORMATTER } from "./constants";
import { enumerable } from "./Enumerable";

/**
 * Class representing a GUID.
 * @class
 * @author Avolantis <info@avolantis.net> (https://avolantis.net)
 */
export class Guid {
  @enumerable()
  private static readonly WS_AND_SEP_REGEX = /[\s-_]/g;
  @enumerable()
  private static readonly NORMAL_SEP = "-";

  @enumerable()
  private static _generator: () => number[] | string = v4_crypto;

  @enumerable()
  protected readonly _value: string;

  @enumerable()
  private _variant?: number;
  @enumerable()
  private _version?: number;
  @enumerable()
  private _bytes?: number[];

  /**
   * Constructor
   * @param value
   * @param bytes
   * @param variant
   * @private
   */
  protected constructor(
    value: string,
    bytes?: number[],
    variant?: GuidVariant
  ) {
    this._value = value;
    if (bytes) {
      this._bytes = bytes;
    }
    if (variant) {
      this._variant = variant;
    }
  }

  /**
   * The <tt>clock_seq_hi_and_reserved</tt> field of this {@link Guid} as
   * an 8-bit unsigned integer.
   * @returns {number}
   */
  @enumerable(true)
  public get clock_seq_hi_and_reserved(): number {
    return this.toByteArray()[8];
  }

  /**
   * The <tt>clock_seq_low</tt> field of this {@link Guid} as an 8-bit unsigned
   * integer.
   * @returns {number}
   */
  @enumerable(true)
  public get clock_seq_low(): number {
    return this.toByteArray()[9];
  }

  /**
   * The <tt>node</tt> field of this {@link Guid} as an array of 8-bit unsigned
   * integers representing the 48-bit unsigned integer value specified by the
   * RFC.
   * @returns {number[]}
   */
  @enumerable(true)
  public get node(): number[] {
    return this.toByteArray().slice(11);
  }

  /**
   * The <tt>variant</tt> of this {@link Guid} as a member of the
   * {@link GuidVariant} enum.
   * @returns {GuidVariant}
   */
  @enumerable(true)
  public get variant(): GuidVariant {
    if (!this._variant) {
      if (!this._bytes) {
        this._variant = Guid.detectVariant(this._value);
      } else {
        this._variant = Guid.getVariant(this.clock_seq_hi_and_reserved);
      }
    }
    return this._variant;
  }

  /**
   * The <tt>version</tt> of this {@link Guid} as a number (a member of the
   * {@link GuidVersion} enum).
   * @returns {GuidVersion}
   */
  @enumerable(true)
  public get version(): GuidVersion {
    if (!this._version) {
      if (!this._bytes) {
        this._version = Guid.detectVersion(this._value);
      } else {
        this._version = Guid.getVersion(this.time_high_and_version);
      }
    }
    return this._version;
  }

  /**
   * The <tt>time_low</tt> field of this {@link Guid} as a 32-bit unsigned
   * integer.
   * @returns {number}
   */
  @enumerable(true)
  public get time_low(): number {
    return Guid.toNumber(
      this.toByteArray().slice(0, 4),
      Guid.isBigEndian(this.variant)
    );
  }

  /**
   * The <tt>time_mid</tt> field of this {@link Guid} as a 16-bit unsigned
   * integer.
   * @returns {number}
   */
  @enumerable(true)
  public get time_mid(): number {
    return Guid.toNumber(
      this.toByteArray().slice(4, 6),
      Guid.isBigEndian(this.variant)
    );
  }

  /**
   * The <tt>time_high_and_version</tt> field of this {@link Guid} as a 16-bit
   * unsigned integer.
   * @returns {number}
   */
  @enumerable(true)
  public get time_high_and_version(): number {
    return Guid.toNumber(
      this.toByteArray().slice(6, 8),
      Guid.isBigEndian(this.variant)
    );
  }

  /**
   * Compares this {@link Guid} to another value.
   * @param {Guid} other
   * @returns {number}
   */
  @enumerable(true)
  public compare(other: Guid): -1 | 0 | 1 {
    return this._value.localeCompare(other._value) as -1 | 0 | 1;
  }

  /**
   * Checks if this {@link Guid} equals to another.
   *
   * @remarks
   * This method does a strict type check to see if <tt>other</tt>
   * is an instance of {@link Guid}.
   *
   * @param {Guid} other
   * @returns {boolean}
   */
  @enumerable(true)
  public equals(other: Guid): boolean {
    return Guid.isGuid(other) && this._value === other._value;
  }

  /**
   * Returns true if this {@link Guid} is equals to {@link Guid.EMPTY}.
   * @returns boolean
   */
  @enumerable(true)
  public isEmpty(): boolean {
    return this._value === EMPTY_VALUE;
  }

  /**
   * Returns the 16-byte value of this {@link Guid}.
   * @returns {number[]}
   */
  @enumerable(true)
  public toByteArray(): number[] {
    if (!this._bytes) {
      this._bytes = Guid.stringToBytes(
        this._value,
        Guid.isBigEndian(this.variant)
      );
    }

    return this._bytes;
  }

  /**
   * Returns the JSON representation of this {@link Guid}, which is the same as
   * the string representation. The standard JSON object's <tt>stringify</tt>
   * method looks for this instance method when converting objects with
   * {@link Guid} prototypes.
   * @returns {string}
   */
  @enumerable(true)
  public toJSON(): string {
    return this.toString();
  }

  /**
   * Returns the string representation of this {@link Guid} with surrounding
   * curly braces. This is for logging purposes, when this {@link Guid} is used
   * in a template string argument.
   * @returns {string}
   */
  public [Symbol.toPrimitive](
    hint: "string" | "number" | "default"
  ): string | null {
    switch (hint) {
      case "string":
        return "{" + this.toString() + "}";
      case "number":
      case "default":
        return null;
    }
  }

  /**
   * Returns the string representation of this {@link Guid}. The returned value
   * is always formatted to exclude whitespace and have separator dashes between
   * each group of lowercase hexadecimal numbers.
   * @returns {string}
   */
  @enumerable(true)
  public toString(): string {
    return this._value;
  }

  /**
   * Returns the primitive (string) representation of this {@link Guid}.
   *
   * @remarks
   * Because of this overload, operators that call <tt>valueOf()</tt> can
   * be used with {@link Guid}-s, like <tt>&lt;</tt> or <tt>&gt;=</tt>,
   * but not <tt>==</tt> or <tt>===</tt>.
   */
  @enumerable(true)
  public valueOf(): string {
    return this._value;
  }

  /**
   * Represents an empty GUID.
   */
  @enumerable(true)
  public static readonly EMPTY: Guid = new Guid(EMPTY_VALUE, EMPTY_BYTES);

  /**
   * Gets the generator function
   */
  @enumerable(true)
  public static get generator(): () => number[] | string {
    return this._generator;
  }

  /**
   * Sets the generator function
   * @param value
   * @throws {TypeError} if the function is not valid
   */
  public static set generator(value: () => number[] | string) {
    if (!value) {
      throw new TypeError("The generator function must not coerce null");
    }
    if (Array.isArray(value())) {
      const val1 = value() as number[];
      const val2 = value() as number[];
      if (val1.some((x) => x === null || x === undefined || x < 0 || x > 255)) {
        throw new TypeError(
          "The generator function does not generate valid bytes"
        );
      }
      if (val1.every((x, i) => val2[i] === x)) {
        throw new TypeError(
          "The generator function does not generate unique values"
        );
      }
    } else if (typeof value() === "string") {
      const val1 = value() as string;
      const val2 = value() as string;

      if (val1 !== EMPTY_VALUE) {
        if (
          val1 == null ||
          val2 == null ||
          !FORMATTER.exec(val1) ||
          !FORMATTER.exec(val2)
        ) {
          throw new TypeError(
            "The generator function returns incorrect string values"
          );
        }

        if (val1 === val2) {
          throw new TypeError(
            "The generator function does not generate unique values"
          );
        }
      }
    } else {
      throw new TypeError(
        "The generator function must return a byte array or a string"
      );
    }

    this._generator = value;
  }

  /**
   * Checks if <tt>a</tt> {@link Guid} equals <tt>b</tt> {@link Guid}.
   *
   * @remarks
   * This method does a strict type check to see if <tt>a</tt> and <tt>b</tt>
   * are instances of {@link Guid}.
   *
   * @param {Guid} a
   * @param {Guid} b
   * @returns {boolean}
   */
  @enumerable(true)
  public static equals(a: Guid, b: Guid): boolean {
    return Guid.isGuid(a) && a.equals(b);
  }

  /**
   * Compares two {@link Guid}-s.
   * @param a
   * @param b
   */
  @enumerable(true)
  public static compare(a: Guid, b: Guid): -1 | 0 | 1 {
    return a.compare(b);
  }

  /**
   * Creates a new {@link Guid} from a byte array.
   * @param bytes a 16-length array of 8-bit unsigned integers
   */
  @enumerable(true)
  public static fromByteArray(bytes: number[]): Guid {
    const result = Guid.checkBytes(bytes);

    if (result == null) {
      throw new TypeError("Incorrect bytes received for a GUID!");
    }

    const [bts, variant, version] = result;
    const value = Guid.bytesToString(bytes, Guid.isBigEndian(variant));
    const guid = new Guid(value, bts);
    guid._variant = variant;
    guid._version = version;
    return guid;
  }

  /**
   * Safely deserializes a {@link Guid} object from a JSON string input
   * @param value
   */
  public static fromJSON(value: unknown): Guid {
    if (value === null) {
      return Guid.EMPTY;
    }

    if (typeof value !== "string") {
      throw new TypeError(
        `JSON value '${value as string}' cannot be converted to a valid Guid.`
      );
    }

    return Guid.parse(value);
  }

  /**
   * Determines if given value is a {@link Guid}.
   * @param {*} value the value to be tested
   * @returns {boolean}
   */
  @enumerable(true)
  public static isGuid(value: unknown): value is Guid {
    return value instanceof Guid;
  }

  /**
   * Generates a new GUID.
   * @returns {Guid} a new {@link Guid}
   */
  public static newGuid(): Guid {
    const out = Guid.generator();

    if (!Array.isArray(out)) {
      return new Guid(out);
    }

    const bigEndian = Guid.isBigEndian(Guid.getVariant(out[8]));
    const value = Guid.bytesToString(out, bigEndian);
    return new Guid(value, out);
  }

  /**
   * Tries to parse a {@link Guid} from an input value.
   * @param {*} value the value to be parsed
   * @returns {Guid} the parsed valid {@link Guid} or {@link Guid.EMPTY}
   * @throws {TypeError} if <tt>value</tt> is not a {@link Guid} nor a string (but does not coerce false).
   */
  @enumerable(true)
  public static parse(value: unknown): Guid {
    if (!value) {
      return Guid.EMPTY;
    }

    if (Guid.isGuid(value)) {
      return value;
    }

    if (typeof value !== "string" && !(value instanceof String)) {
      throw new TypeError("The input value is not a string!");
    }

    const result = Guid.checkString(value as string);

    if (result == null) {
      return Guid.EMPTY;
    }

    return new Guid(result[0]);
  }

  /**
   * Determines if given value represents a valid {@link Guid}.
   * @param {*} value the value to be tested
   * @returns {boolean}
   */
  @enumerable(true)
  public static validate(value: unknown): boolean {
    if (!value) {
      return false;
    }

    if (Guid.isGuid(value)) {
      return !value.isEmpty();
    }

    if (typeof value === "string" || value instanceof String) {
      return !!Guid.checkString(value as string);
    }

    if (Array.isArray(value)) {
      return !!Guid.checkBytes(value as number[]);
    }

    return false;
  }

  @enumerable()
  private static checkBytes(
    bytes: number[]
  ): [number[], GuidVariant, GuidVersion] | null {
    if (bytes.length !== BYTE_COUNT) {
      // not the right amount of bytes are in the collection
      return null;
    }

    let variant = GuidVariant.Standard0;

    for (let i = 0; i < BYTE_COUNT; i++) {
      if (typeof bytes[i] !== "number" || bytes[i] < 0 || bytes[i] > 255) {
        // Invalid numbers in the byte array
        return null;
      }

      if (i == 8) {
        variant = Guid.getVariant(bytes[i]);
        if (variant < 0 || variant > 7) {
          // Unknown variant
          return null;
        }
      }
    }

    const version = Guid.getVersion(
      Guid.toNumber(bytes.slice(6, 8), Guid.isBigEndian(variant))
    );
    if (version < 1 || version > 5) {
      // Unknown version
      return null;
    }

    return [bytes, variant, version];
  }

  @enumerable()
  private static checkString(
    value: string
  ): [string, GuidVariant, GuidVersion] | null {
    if (!value) {
      return null;
    }

    // remove all whitespace and separator characters
    while (Guid.WS_AND_SEP_REGEX.exec(value)) {
      value = value.replace(/[\s-_]/g, "");
    }

    // try parse the resulting string
    const sections = FORMATTER.exec(value);

    if (sections == null) {
      // the string is not in the correct format
      return null;
    }

    // the first match in 'sections' is the whole string itself, so skip that
    const result = sections.slice(1).join(Guid.NORMAL_SEP).toLowerCase();
    const variant = Guid.detectVariant(result);
    if (variant < 0 || variant > 7) {
      // Unknown variant
      return null;
    }

    const version = Guid.detectVersion(result);
    if (version < 1 || version > 5) {
      // Unknown version
      return null;
    }
    return [result, variant, version];
  }

  @enumerable()
  private static stringToBytes(value: string, bigEndian: boolean): number[] {
    while (value.indexOf(Guid.NORMAL_SEP) > 0) {
      // remove all separator characters
      value = value.replace(Guid.NORMAL_SEP, "");
    }

    const bytes = new Array<number>(BYTE_COUNT);

    for (let i = 1; i <= 32; i += 2) {
      // 2 hex characters form a single byte
      bytes[i / 2] = parseInt(value.substring(i - 1, i + 1), 16);
    }

    if (!bigEndian) {
      // The string representation is always BigEndian, according to the spec
      return Guid.swapLayout(bytes);
    }

    return bytes;
  }

  @enumerable()
  private static bytesToString(bytes: number[], bigEndian: boolean): string {
    function hex(num: number) {
      // 2 hex characters form a single byte
      return (num + 256).toString(16).substring(1);
    }

    let value = "";

    if (!bigEndian) {
      bytes = Guid.swapLayout(bytes);
    }

    for (let i = 0; i < BYTE_COUNT; i++) {
      value += hex(bytes[i]);

      if (i == 3 || i == 5 || i == 7 || i == 9) {
        // end of a hex section
        value += Guid.NORMAL_SEP;
      }
    }

    return value;
  }

  /**
   * Extract the variant of the GUID from the <tt>clock_seq_hi_and_reserved</tt>
   * number of the GUID.
   * @param {number} variantOctet the octet
   * @private
   */
  @enumerable()
  private static getVariant(variantOctet: number): GuidVariant {
    // Chop of the not-related last 5 bits
    return variantOctet >> 5;
  }

  /**
   * Extracts the version number from the <tt>time_high_and_version</tt> number
   * of the GUID.
   * @param timeHiAndVersion {number} the value as an 16-bit unsigned integer
   * @private
   */
  @enumerable()
  private static getVersion(timeHiAndVersion: number): GuidVersion {
    // Chop of the non-related last 12 bits
    return timeHiAndVersion >> 12;
  }

  /**
   * Detect the variant number from a string representation
   * @param value {string} the input value
   * @private
   */
  @enumerable()
  private static detectVariant(value: string): GuidVariant {
    // Can be read from 8th byte + 3 dashes included
    return Guid.getVariant(parseInt(value.substring(16, 18), 16));
  }

  /**
   * Detect the version number from a string representation
   * @param value {string} the input value
   * @private
   */
  @enumerable()
  private static detectVersion(value: string): GuidVersion {
    // Can be read from 6th and 7th byte + 2 dashes included
    return Guid.getVersion(parseInt(value.substring(14, 18), 16));
  }

  /**
   * Determines if this variant stores all fields in big endian.
   * @param variant {GuidVariant} the variant
   * @private
   */
  @enumerable()
  private static isBigEndian(variant: GuidVariant) {
    return variant !== GuidVariant.MicrosoftReserved;
  }

  /**
   * Returns the number represented by given bytes
   * @param bytes {number[]} the input byte array
   * @param bigEndian {boolean} true if the value has the MSB first
   * @private
   */
  @enumerable()
  private static toNumber(bytes: number[], bigEndian: boolean): number {
    let result = 0;

    for (let i = 0; i < bytes.length; i++) {
      // If the bytes are little-endian the LSB is first, so we need to swap
      // the order before shift
      const index = bigEndian ? i : bytes.length - (i + 1);
      result = result | (bytes[index] << (index * 8));
    }

    return result;
  }

  /**
   * Swap a guid layout from <tt>Standard0</tt> or <tt>Standard1</tt> to
   * <tt>Microsoft Reserved</tt> and vice-versa.
   * @param bytes {number[]} the byte array
   * @private
   */
  @enumerable()
  private static swapLayout(bytes: number[]): number[] {
    const result = bytes.slice();

    // Swap the first group (uint32)
    result[0] = bytes[3];
    result[1] = bytes[2];
    result[2] = bytes[1];
    result[3] = bytes[0];

    // Swap the second group (uint16)
    result[4] = bytes[5];
    result[5] = bytes[4];

    // Swap the third group (uint16)
    result[6] = bytes[7];
    result[7] = bytes[6];

    return result;
  }
}
