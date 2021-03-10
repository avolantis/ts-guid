# `@avolantis/ts-guid`
> TypeScript implementation of [RFC 4122](https://tools.ietf.org/html/rfc4122) GUIDs (UUIDs)

[![npm semver](https://img.shields.io/badge/semver-v0.1.0--preview.1-269539.svg?logo=npm)](https://www.npmjs.com/package/@avolantis/ts-guid)
![develop ci](https://github.com/avolantis/ts-guid/workflows/CI/badge.svg?branch=develop)
[![coverage](https://coveralls.io/repos/github/avolantis/ts-guid/badge.svg)](https://coveralls.io/github/avolantis/ts-guid)
[![dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c.svg?logo=dependabot)](https://dependabot.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://github.com/prettier/prettier)

Features:
- Use with JavaScript or TypeScript
- Supports node.js and the browser
- OOP friendly API
- Can generate collision-proof [RFC 4122](https://tools.ietf.org/html/rfc4122) V4 GUIDs
- Zero package.json production dependencies
- Shipped as
    - TypeScript sources (`src/`)
    - Distribution bundles (`dist/`):
      - TypeScript declarations
      - ESNext modules *(esm)* targeting browsers and node
      - ES6 modules *(esm)* targeting browsers and node
      - ES6 self-executing function *(iife)*
      - ES6 [Unpkg](https://unpkg.com) bundle *(umd)*
      - ES6 CommonJs bundle *(cjs)* for `node.js >= v12`
- String comparison rather than number arrays (better performance)

## Usage

### As an npm dependency
Add this module to your `package.json` via yarn, npm or pnpm:
```
yarn add @avolantis/ts-guid
# OR
npm install --save @avolantis/ts-guid
# OR
pnpm install --save @avolantis/ts-guid
```

Then in your program files:
```javascript
// ES Modules OR
import { Guid } from "@avolantis/ts-guid";
// Common Js require for old versions of node.js
const { Guid } = require("@avolantis/ts-guid");

// Simple usage
console.log(Guid.newGuid());
console.log(Guid.EMPTY.toString());
console.log(Guid.parse("c959e321-19df-474c-a2e7-df268dbf3998").toByteArray());
console.log(JSON.stringify(Guid.newGuid()));

// More features
const user = {
  id: Guid.newGuid(),
  name: "John Doe",
  email: "john@doe.com"
};

// Can be converted to JSON when inside an object
console.log(JSON.stringify(user, null, 2));

// Output:
// {
//   "id": "c959e321-19df-474c-a2e7-df268dbf3998",
//   "name": "John Doe",
//   "email": "john@doe.com"
// }

console.log(`User ${user.id} not found!`);

// Output:
// User {c959e321-19df-474c-a2e7-df268dbf3998} not found!
```

> **NOTE**\
> If you are targeting browsers without Crypto API support, you either need to polyfill this feature, or
> [enable unsafe random generation (deprecated)](#the-unsafe-random-generator-function-deprecated).
> Polyfills for the Crypto API are not included in the bundles.

### unpkg usage
This package includes transpiled and polyfilled code for direct usage via [unpkg](https://unpkg.com) or
[skypack](https://www.skypack.dev/) in browsers that support ESM features or satisfies the
`> 0.25%, last 2 versions, not dead` [browserslist](https://github.com/browserslist/browserslist) query. 

```html
<!-- Browsers with ESM support -->
<script type="module" src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.esm.min.js"></script>
<!-- UMD -->
<script src="https://unpkg.com/@avolantis/ts-guid"></script>
<!-- IIFE -->
<script src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.iife.min.js"></script>

<!-- Recommended (target both): -->
<script type="module" src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.esm.min.js"></script>
<script nomodule src="https://unpkg.com/@avolantis/ts-guid"></script>
```

Then in your scripts:
```javascript
const { Guid } = TsGuid;
// ...
```

## API

### Static factory methods
#### `Guid.newGuid()`
Generates a new GUID using [the generator function](#the-generator-function).
If no generator function is available, it always returns `Guid.EMPTY`.

#### `Guid.parse(value)` *(might throw!)*
Parses a string value that represents a GUID.
Returns the parsed `Guid` or `Guid.EMPTY`, if given an invalid value.
**Throws** `TypeError`, if value is not a `string` and does not coerce `null`.

#### `Guid.fromByteArray(array)` *(might throw!)*
Returns the `Guid` composed of the given bytes.\
**Throws** `TypeError`, if value is not an `Array`, it's not of length 16 or any
of the values coerces `null` or not within 0 and 255.

#### `Guid.fromJSON(json)` *(might throw!)*
Parses a json string that represents a GUID state.
Returns the parsed `Guid` or `Guid.EMPTY`, if value is `null` or an invalid
string.\
**Throws** `TypeError`, if value is `undefined` or not a `string`.

### Static methods
#### `Guid.isGuid(value)`
Returns true if `value` is an instance of `Guid`.

#### `Guid.compare(guid1, guid2)`
Compares two `Guid`-s using locale-specific comparison of their string
representations.\
The result table:

| `guid1` < `guid2` | `guid1` === `guid2` | otherwise |
|----|---|---|
| -1 | 0 | 1 |

This is useful when ordering an array of `Guid`-s, like so:
```javascript
const arr = [Guid.newGuid(), Guid.newGuid(), Guid.newGuid()];
console.log(arr);
// Sort alphabetically
console.log(arr.sort(Guid.compare));
// Sort alphabetically in reversed order
console.log(arr.sort(Guid.compare).reverse());
```

#### `Guid.equals(guid1, guid2)`
Returns true, if both
- `guid1` represents the same GUID as `guid2`, and
- `guid1` and `guid2` are instances of `Guid`
```javascript
const a = Guid.newGuid();
const b = Guid.newGuid();
console.log(a.equals(b)); // Prints false

// DO NOT USE THE '==' OR '===' OPERATORS, as they compare objects by reference
const a = Guid.parse("c959e321-19df-474c-a2e7-df268dbf3998");
const b = Guid.parse("c959e321-19df-474c-a2e7-df268dbf3998");
console.log(a == b); // Prints false, which is WRONG
console.log(a === b); // Prints false, which is WRONG
```

#### `Guid.validate(value)`
Determines if a string or bytes array value represents a valid GUID.

### Static properties

#### `Guid.EMPTY` (read-only)
The `Guid` that represents an empty (NIL) GUID.

#### `Guid.generator`
The [the generator function](#the-generator-function) used to generate new
`Guid`-s.

### Instance methods

#### `compare(other)`

| `this` < `other` | `this` === `other` | otherwise |
|----|---|---|
| -1 | 0 | 1 |

#### `equals(other)`
Returns true if `other` is Guid and represents the same GUID as this one.

#### `isEmpty()`
Returns true if the GUID equals to `Guid.EMPTY`, otherwise false.

#### `toByteArray()`
Returns an array of 16 bytes (8-bit unsigned integers) that this GUID is
composed of. If missing *(ie. not created from a byte array)*, the bytes are
computed once then cached for frequent access. Internal computation of some
fields require the byte array value to be computed, these can cause the value
to be already cached upon first direct access.

#### `toJSON()`
Returns the json representation of this GUID (which is its string
representation). This method gets automatically called by the `JSON.stringify()`
method, so usage of the latter is also supported when an object has a field of
type `Guid`. For example: `JSON.stringify(user)`, where `user` has property `id`,
which is of type `Guid`, the JSON string output contains the string
representation of that GUID.

#### `toString()`
Returns the string representation of the GUID. The representation is always
calculated and available from cache.

#### `valueOf()`
Returns the primitive (string) representation of this GUID. This overload allows
the use of comparison operators (`<`, `<=`, `>` and `>=`) with `Guid`-s.
**Note** that javascript compares strings based on character code order,
to preform true alphabetical comparison, use `Guid.copmare(a, b)` or
`a.compare(b)`.

### Instance properties

> The following values are computed once, then cached for frequent access

#### `variant` (read-only)
The RFC variant identifier of this GUID. Example: `GuidVariant.MicrosoftReserved`\
The value of this field determines the layout of the bytes in the byte array of
the components in the GUID.

#### `version` (read-only)
The RFC version number of this GUID. Example: `GuidVersion.V4`

> The following values are computed on demand (from the cached byte array)

#### `clock_seq_low` (read-only)
The `clock_seq_low` field of this GUID, specified by the RFC. It is an 8-bit
unsigned integer.

#### `clock_seq_hi_and_reserved` (read-only)
The `clock_seq_hi_and_reserved` field of this GUID, specified by the RFC. It is
an 8-bit unsigned integer.

#### `time_low` (read-only)
The `time_low` field of this GUID, specified by the RFC. It is a 32-bit unsigned
integer.

#### `time_mid` (read-only)
The `time_mid` field of this GUID, specified by the RFC. It is a 16-bit unsigned
integer.

#### `time_high_and_version` (read-only)
The `time_high_and_version` field of this GUID, specified by the RFC. It is a
16-bit unsigened integer.

#### `node` (read-only)
The `node` field of this GUID. It is an 8-bit unsigned integer array of size 6,
representing the 48-bit unsigned integer specified by the RFC.

### The generator function
> Currently, only one generator for RFC version V4 GUIDs is implemented.
> PR-s are welcome :)

The default implementation for generating new values uses the crypto API to
seed the generation process of V4 GUIDs. However, this can be changed via
setting the `Guid.generator` static property to a different generator function,
for example a function, that generates GUID-s sequentially for use with RDBMS.

```js
// A generator function that returns a byte array
Guid.generator = function() {
  return new Array(16).fill(0);
}

// A generator function that returns a string
Guid.generator = function() {
  return "<here comes a new value>";
}
```

If the default generator function is not available due to the missing
cryptographic random generator, a warning message is printed to the console.
This allows developers to identify this issue on a given platform, and either
supply a polyfill or provide another generator function.

#### The **unsafe** random generator function *(deprecated)*
> **DANGER ZONE**\
> This is only for environments, where the incresaed rate of collisions does not
> affect data safety. Use this only if you know what you are doing.

Only a cryptographic random number generator is recommended to seed the
generation of new GUIDs, however certain JS platforms still does not provide
such API. You can explicitly enable a fallback behavior to `Math.random()`
using the supplied generator function.

```js
import { Guid, unsafeRandom } from "@avolantis/ts-guid";

Guid.generator = unsafeRandom;
```

## Issues and Roadmap
See the [GitHub issues](https://github.com/avolantis/ts-guid/issues) for more information.

## Similar libraries
- [uuid](https://github.com/uuidjs/uuid) \
The industry standard JS implementation of UUIDs. It is an EcmaScript Stage 1 proposal,
but without TS declarations and with a not so OOP-friendly API.
- [ts-guid](https://github.com/willemtoerien/ts-guid) \
No license, improper random generation and validation, no multi-version support.
- [guid-typescript](https://github.com/NicolasDeveloper/guid-typescript) \
No license and breaking bugs, no multi-version support.

## License

MIT
