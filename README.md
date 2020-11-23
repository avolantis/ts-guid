# `@avolantis/ts-guid`
> TypeScript implementation of [RFC 4122](https://tools.ietf.org/html/rfc4122) GUIDs (UUIDs)

[![npm semver](https://img.shields.io/badge/semver-v0.1.0--preview.0-269539.svg?logo=npm)](https://www.npmjs.com/package/@avolantis/ts-guid)
![develop ci](https://github.com/avolantis/ts-guid/workflows/CI/badge.svg?branch=develop)
[![coverage](https://coveralls.io/repos/github/avolantis/ts-guid/badge.svg)](https://coveralls.io/github/avolantis/ts-guid)
[![dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c.svg?logo=dependabot)](https://dependabot.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://github.com/prettier/prettier)

Features:
- Use with JavaScript or TypeScript
- Supports node.js and the browser
- OOP friendly API
- Tree-shakeable
- Can generate collision-proof [RFC 4122](https://tools.ietf.org/html/rfc4122) V4 GUIDs
- Zero package.json production dependencies
- Shipped as
    - TypeScript sources (`src/`)
    - Also, compiled to ES Next modules (`lib/`)
    - Polyfilled distribution bundles (`dist/`):
      - ES modules *(esm)* targeting browsers
      - Browser code as self-executing function *(iife)*
      - [Unpkg](https://unpkg.com) bundle *(umd)*
      - CommonJs bundle *(cjs)* targeting node.js > v12
- String comparison rather than number arrays (higher performance)
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
// TypeScript or ES Modules (transpilation needed)
import { Guid } from "@avolantis/ts-guid/lib";
// ES Modules for browsers, pretranspiled
import { Guid } from "@avolantis/ts-guid";
// Common Js require for node.js
const { Guid } = require("@avolantis/ts-guid");

// ...

console.log(Guid.newGuid());
console.log(Guid.EMPTY.asString());
console.log(Guid.parse("c959e321-19df-474c-a2e7-df268dbf3998").asBytes());
console.log(Guid.newGuid().asJson());
```

**NOTE**
> If you are targeting browsers without Crypto API support, you either need to polyfill this feature, or
> enable unsafe random generation (not recommended, see more below). Polyfills for Crypto API are not
> included in the distribution bundles.

### unpkg usage
This package includes transpiled and polyfilled code for direct usage via [unpkg](https://unpkg.com) or
[skypack](https://www.skypack.dev/) in browsers that support ESM features or satisfies the
`> 0.25%, last 2 versions, not dead` [browserslist](https://github.com/browserslist/browserslist) query. 

```html
// Browsers with ESM support
<script type="module" src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.esm.min.js"></script>
// UMD
<script src="https://unpkg.com/@avolantis/ts-guid"></script>
// IIFE
<script src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.iife.min.js"></script>

// Recommended (target both):
<script type="module" src="https://unpkg.com/@avolantis/ts-guid/dist/ts-guid.esm.min.js"></script>
<script nomodule src="https://unpkg.com/@avolantis/ts-guid"></script>
```

Then in your scripts:
```javascript
const { Guid } = TsGuid;
// ...
```

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
The current version handler. Default: `VersionHandlers.V4`

#### `Guid.EMPTY` (read-only)
The `Guid` that represents an empty (NIL) GUID.

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
Only a cryptographic random number generator is recommended to seed the
generation of new GUIDs, however certain JS platforms still does not provide
such API. You can explicitly enable fallback behavior to `Math.random()`, like so:

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
but without TS declarations and with a not so OOP-friendly API.
- [ts-guid](https://github.com/willemtoerien/ts-guid) \
No license, improper random generation and validation, no multi-version support.
- [guid-typescript](https://github.com/NicolasDeveloper/guid-typescript) \
No license and breaking bugs, no multi-version support.

## License

MIT
