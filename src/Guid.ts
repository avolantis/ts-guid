import { EMPTY_BYTES, EMPTY_VALUE } from "./constants";
import {
  bytesToStr,
  compareString,
  isByteArray,
  parseString,
  strToBytes
} from "./util";
import { VersionHandlers } from "./handlers";
import { Version } from "./version";
import type { GuidLike, VersionHandler } from "./types";

/**
 * Class representing a GUID.
 * @class
 * @author Avolantis <info@avolantis.net> (https://avolantis.net)
 */
export class Guid {
  /**
   * Byte array representation.
   * @private
   * @readonly
   * @type number[]
   */
  private readonly bytes: number[];

  /**
   * String representation.
   * @private
   * @readonly
   * @type string
   */
  private readonly value: string;

  /**
   * True if this {@link Guid} is equals to {@link Guid.EMPTY}.
   * @type boolean
   * @public
   * @readonly
   */
  public readonly empty: boolean;

  /**
   * Signals that this {@link Guid} represents a V4 Guid
   * @type Version
   * @public
   * @readonly
   */
  public readonly version: Version;

  /**
   * {@link VersionHandler} to generate and validate {@link Guid}-s with
   * @type VersionHandler
   * @public
   * @static
   */
  public static handler: VersionHandler = VersionHandlers.V4;

  /**
   * Represents an empty GUID.
   * @type Guid
   * @public
   * @static
   * @readonly
   */
  public static readonly EMPTY = new Guid(
    EMPTY_BYTES,
    EMPTY_VALUE,
    Version.NEUTRAL
  );

  /**
   * Protected constructor to initialize {@link Guid}s.
   * @protected
   * @constructor
   */
  protected constructor(bytes: number[], value: string, version: Version) {
    this.bytes = bytes;
    this.empty = value === EMPTY_VALUE;
    this.value = value;
    this.version = version;
  }

  /**
   * Returns the byte array representation of this {@link Guid}.
   * @returns {number[]}
   * @public
   */
  public asBytes(): number[] {
    return this.bytes;
  }

  /**
   * Returns the JSON representation of this {@link Guid}.
   * @returns {string}
   * @public
   */
  public asJson(): string {
    const { bytes, empty, value, version } = this;
    return JSON.stringify({ bytes, empty, value, version });
  }

  /**
   * Returns the string representation of this {@link Guid}.
   * @returns {string}
   * @public
   */
  public asString(): string {
    return this.value;
  }

  /**
   * Returns the log format string representation of this {@link Guid}.
   * @returns {string}
   * @public
   */
  public get [Symbol.toStringTag](): string {
    return `Guid(${this.value})`;
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
   * @public
   */
  public equals(other: Guid): boolean {
    return Guid.isGuid(other) && this.value === other.value;
  }

  /**
   * Compares this {@link Guid} to another value.
   * @param {GuidLike} other
   * @returns {number}
   * @public
   */
  public compare(other: GuidLike): -1 | 0 | 1 {
    return compareString(this.value, Guid.parse(other).value);
  }

  /**
   * Checks if this {@link Guid} equals to another or a string representation.
   * @param {GuidLike} other
   * @returns {boolean}
   * @public
   */
  public valueEquals(other: GuidLike): boolean {
    return this.value === Guid.parse(other).value;
  }

  /**
   * Tries to parse a {@link Guid} from an input value.
   * @param {*} value the value to be parsed
   * @returns {Guid} the parsed valid {@link Guid} or {@link Guid.EMPTY}
   * @public
   * @static
   */
  public static parse(value: unknown): Guid {
    if (!value) return Guid.EMPTY;
    if (Guid.isGuid(value)) return value;

    if (isByteArray(value) && Guid.handler.validator(value)) {
      return new Guid(value, bytesToStr(value), Guid.handler.version);
    }

    const str = parseString(value);
    return !!str && Guid.handler.validator(str)
      ? new Guid(strToBytes(str), str, Guid.handler.version)
      : Guid.EMPTY;
  }

  /**
   * Tries to parse a {@link Guid} from JSON.
   * @param {string} value the value to be parsed
   * @returns {Guid} the parsed valid {@link Guid} or {@link Guid.EMPTY}
   * @public
   * @static
   */
  public static parseJson(value: string): Guid {
    try {
      const guid = JSON.parse(value) as {
        value?: string;
        version?: Version;
        bytes?: number[];
        empty?: boolean;
      };

      if (
        !guid.value ||
        !isByteArray(guid.bytes) ||
        guid.version == null ||
        guid.empty == null
      ) {
        return Guid.EMPTY;
      }

      return new Guid(guid.bytes, guid.value, guid.version);
    } catch {
      return Guid.EMPTY;
    }
  }

  /**
   * Determines if given value represents a valid {@link Guid}.
   * @param {*} value the value to be tested
   * @returns {boolean}
   * @public
   * @static
   */
  public static validate(value: unknown): boolean {
    if (!value) return false;
    if (Guid.isGuid(value)) return !value.empty;
    if (isByteArray(value) && Guid.handler.validator(value)) return true;

    const str = parseString(value);
    return !!str && Guid.handler.validator(str);
  }

  /**
   * Generates a new GUID.
   * @returns {Guid} a new {@link Guid}
   * @public
   * @static
   */
  public static newGuid(): Guid {
    const gen = Guid.handler.generator();
    return new Guid(gen.bytes, gen.value, Guid.handler.generator.version);
  }

  /**
   * Checks if a {@link Guid} equals to another.
   *
   * @remarks
   * This method does a strict type check to see if <tt>other</tt>
   * is an instance of {@link Guid}.
   *
   * @param {Guid} a
   * @param {Guid} b
   * @returns {boolean}
   * @public
   * @static
   */
  public static equals(a: Guid, b: Guid): boolean {
    return Guid.isGuid(a) && a.equals(b);
  }

  /**
   * Checks if a {@link GuidLike} equals to another.
   * @param {GuidLike} a
   * @param {GuidLike} b
   * @returns {boolean}
   * @public
   * @static
   */
  public static valueEquals(a: GuidLike, b: GuidLike): boolean {
    return Guid.parse(a).value === Guid.parse(b).value;
  }

  /**
   * Compares two {@link Guid} values.
   * @param {Guid} a
   * @param {Guid} b
   * @returns {number} -1, if a < b; 0, if a === b; 1, otherwise
   * @public
   * @static
   */
  public static compare(a: GuidLike, b: GuidLike): -1 | 0 | 1 {
    return compareString(Guid.parse(a).value, Guid.parse(b).value);
  }

  /**
   * Determines if a {@link GuidLike} equals to {@link Guid.EMPTY}.
   * @param {GuidLike} guid
   * @returns {boolean}
   * @public
   * @static
   */
  public static isEmpty(guid: GuidLike): boolean {
    return Guid.parse(guid).empty;
  }

  /**
   * Determines if given value is a {@link Guid}.
   * @param {*} obj the object to be tested
   * @returns {boolean}
   * @public
   * @static
   */
  public static isGuid(obj: unknown): obj is Guid {
    return obj instanceof Guid;
  }
}
