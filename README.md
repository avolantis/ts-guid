# `@avolantis/ts-guid`
> TypeScript implementation of GUIDs (v4 RFC 4122 UUIDs)

[![semver: v0.1.0](https://img.shields.io/badge/semver-v0.1.0-269539.svg?style=flat-square&logo=npm)](https://semver.org)
[![dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c.svg?style=flat-square&logo=dependabot)](https://dependabot.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://github.com/prettier/prettier)

Features:
- Use with JS or TS
- OOP friendly
- Three-Shakeable
- Can generate collision-proof [RFC 4122](https://tools.ietf.org/html/rfc4122) V4 GUIDs
- Zero package.json dependencies
- Shipped as
    - es modules (esm)
    - browser code (iife)
    - [unpkg](https://unpkg.com) bundle (umd)
    - common js modules (cjs)
- String comparison rather than number arrays (great performance)
- With a protected constructor to enable extending

## Usage
Add this module to your `package.json` via yarn or npm:
```
yarn add @avolantis/ts-guid
# OR
npm install --save @avolantis/ts-guid
```

Then in your program files:
```javascript
// TypeScript or ES Modules
import { Guid } from "@avolantis/ts-guid";
// Common Js require
const { Guid } = require("Guid");

// ...

console.log(Guid.newGuid());
console.log(Guid.EMPTY.asString());
console.log(Guid.parse("c959e321-19df-474c-a2e7-df268dbf3998").asBytes());
console.log(Guid.newGuid().asJson());
```

**NOTE**
> If you are targeting browsers without Crypto API support, you either need to polyfill this feature,
> or enable unsafe random generation (not recommended, see more below).

## API

### Static methods and properties
#### `Guid.newGuid()`
Generates a new GUID using the version specific generator.

#### `Guid.isGuid(value)`
Returns true if `value` is an instance of `Guid`.

#### `Guid.isEmpty(value)`
Returns true for any value that is or parses as `Guid.EMPTY`.

#### `Guid.compare(guid1, guid2)`

| `guid1` < `guid2` | `guid1` === `guid2` | otherwise |
|----|---|---|
| -1 | 0 | 1 |

#### `Guid.equals(guid1, guid2)`
Return true, if both
 - `guid1` represents the same GUID as `guid2` and
 - `guid1` and `guid2` are instances of `Guid`

#### `Guid.valueEquals(val1, val2)`
Returns true, if `val1` parsed equals to `val2` parsed.

#### `Guid.parse(value)`
Parses a value that represents a GUID.
Returns the parsed `Guid` or `Guid.EMPTY`, if given an invalid value.

#### `Guid.parseJson(json)`
Parses a json string that represents a GUID state.
Returns the parsed `Guid` or `Guid.EMPTY`, if given an invalid value.

#### `Guid.validate(value)`
Determines if a value represents a valid GUID, using the version specific validator.

#### `Guid.handler`
#### `Guid.EMPTY` (read-only)

### Instance methods and properties
#### `asString()`
Returns the string representation of the GUID.

#### `asBytes()`
Returns the byte array representation of the GUID.

#### `asJson()`
Returns the json representation of the GUID state.

#### `compare(other)`

| `this` < `other` | `this` === `other` | otherwise |
|----|---|---|
| -1 | 0 | 1 |
 
#### `equals(other)`
Returns true if `other` is Guid and represents the same GUID as this one.

#### `valueEquals(other)`
Returns true if the Guid represented by `other` is the same represented by this one.

#### `empty` (read-only)
True if the GUID equals to `Guid.EMPTY`, otherwise false.

#### `version` (read-only)
The RFC version number of this GUID.

#### `[Symbol.toStringTag]` (read-only)
Returns a log-friendly format of automatic string representation.

**Example**: `[object Guid(c959e321-19df-474c-a2e7-df268dbf3998)]`

### Change version handler
> Currently, only one handler, for RFC version V4 is implemented.

The default implementation for validation and generation is V4.

```js
import { Guid, VersionHandlers } from "@avolantis/ts-guid";

// To change the default version handler
Guid.handler = VersionHandlers.V4;

// ...
```

### Enabling unsafe random generation

```js
import { Guid, VersionHandlers } from "@avolantis/ts-guid";

VersionHandlers.V4.allowUnsafeRandomGeneration();
// To make unsafely generated GUIDs also validable and parseable
VersionHandlers.V4.allowUnsafeGuidValidation();

// ...
```

## Issues and Roadmap
See the [GitHub issues](https://github.com/avolantis/ts-guid/issues) for more information.

## Similar libraries
- [uuid](https://github.com/uuidjs/uuid) \
The industry standard JS implementation of UUIDs. It is an EcmaScript Stage 1 proposal,
but without TS declarations and with a not OOP friendly API.
- [ts-guid](https://github.com/willemtoerien/ts-guid) \
No license, improper random generation and validation, no multi-version support
- [guid-typescript](https://github.com/NicolasDeveloper/guid-typescript) \
No license and breaking bugs, no multi-version support

## License

MIT
