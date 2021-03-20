# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0-preview.2](https://github.com/avolantis/ts-guid/compare/v0.1.0-preview.1...v0.1.0-preview.2) (2021-03-20)


### Bug Fixes

* fixed byte array conversion bug ([563cc61](https://github.com/avolantis/ts-guid/commit/563cc61b522703c0362cd7224efcade919a2ce84))
* fixed comparison operators not working bug ([53ad9f2](https://github.com/avolantis/ts-guid/commit/53ad9f22f84995f62ccafd9eb8ebe1f0de9241c8))
* fixed enumerable decorator not taking effect bug ([a70780c](https://github.com/avolantis/ts-guid/commit/a70780c79d6e1d6c4411934a3393b112678084c4))
* fixed generator testing fails when should not bug ([1979b99](https://github.com/avolantis/ts-guid/commit/1979b994bd12804d379d31d218ccf5044a745f5f))
* fixed unsafe random generating bad values ([43dab0b](https://github.com/avolantis/ts-guid/commit/43dab0b792971ce19945a1d7e9ec18d13fec6dd6))
* fixed v4 crypto 'require is not defined' bug ([5034523](https://github.com/avolantis/ts-guid/commit/5034523a88128b2f6b8fa66f65d1cd0a0f542c46))


### Build System

* bump @types/node from 14.14.33 to 14.14.35 ([e665f48](https://github.com/avolantis/ts-guid/commit/e665f4818208a19233f4fa8341ccd13b3dfdce3d))
* bump esbuild from 0.9.0 to 0.9.2 ([25d6563](https://github.com/avolantis/ts-guid/commit/25d6563c4dcbab40d073d571509c0e3f90a3695b))
* bump eslint from 7.14.0 to 7.22.0 ([39ae69a](https://github.com/avolantis/ts-guid/commit/39ae69a3f30225fae330bbd10efd0bd6c8a5dd1d))
* bump eslint-plugin-jest from 24.2.1 to 24.3.2 ([8ea7f0c](https://github.com/avolantis/ts-guid/commit/8ea7f0c161f538e7ee4857799369cf1d4d3f1ce3))
* bump eslint-plugin-prettier from 3.1.4 to 3.3.1 ([11cff2b](https://github.com/avolantis/ts-guid/commit/11cff2b419a75c26b469e68e1af992103c23e14f))
* bump lint-staged from 10.5.1 to 10.5.4 ([a3829d0](https://github.com/avolantis/ts-guid/commit/a3829d070f4a32df12d21c066a3bae0b0a3ac24b))
* bump prettier from 2.2.0 to 2.2.1 ([38e6875](https://github.com/avolantis/ts-guid/commit/38e68756c2399fa50af7048b0cd739aa6db9f61a))
* bump rollup from 2.41.0 to 2.41.2 ([5d7f72d](https://github.com/avolantis/ts-guid/commit/5d7f72d480e224e16c3de454091c091cfe8fa7c3))
* bump rollup-plugin-esbuild from 3.0.0 to 3.0.2 ([c6ce50c](https://github.com/avolantis/ts-guid/commit/c6ce50ce285477354bdbe83e27fb67ab29637bc2))
* declaration maps and prepare for tests ([d81a33e](https://github.com/avolantis/ts-guid/commit/d81a33e1fb65b8d493cdb2386916479a8443580c))


### Test-related

* factory methods ([693dd33](https://github.com/avolantis/ts-guid/commit/693dd336eee8b626e87c5ad8b97d7c763af17279))
* fixed missing coverage ([61a7f43](https://github.com/avolantis/ts-guid/commit/61a7f434d5aebaebd52a647ff56898d4aba6baff))
* generator functions ([4aac211](https://github.com/avolantis/ts-guid/commit/4aac211a47aea0a0d184aad652ff473b6307601b))
* instance methods ([c55ce71](https://github.com/avolantis/ts-guid/commit/c55ce71e5ae7f7ff8d9e8f4c1a8bfc23f7c961de))
* static methods ([865bb5c](https://github.com/avolantis/ts-guid/commit/865bb5ca68f35751f0428ee02db634485c8a0b48))


### Code Refactoring

* fixed linter warning and file naming ([cbe3ce0](https://github.com/avolantis/ts-guid/commit/cbe3ce0998b65c5be94f25119cafd2355e0ffd5f))


### Others

* auto bump version number in package.json ([5af646b](https://github.com/avolantis/ts-guid/commit/5af646b3111ac2c864aeabbe21597d5746f612f2))
* publish ([cf37af9](https://github.com/avolantis/ts-guid/commit/cf37af9e7e615c24081db488dfb570b5dfdc216f))
* switch to jsdom-only tests ([cb66e2e](https://github.com/avolantis/ts-guid/commit/cb66e2e9fe3752a35f40f8c5fc0c274d92ab4a83))

## [0.1.0-preview.1](https://github.com/avolantis/ts-guid/compare/v0.1.0-preview.0...v0.1.0-preview.1) (2021-03-10)


### ⚠ BREAKING CHANGES

* new version (#9)

### Features

* new version ([#9](https://github.com/avolantis/ts-guid/issues/9)) ([713f821](https://github.com/avolantis/ts-guid/commit/713f821901b64b2c11a00c8edb727adbff77dacc))
* overload valueOf() to support comparison operators ([7f301a3](https://github.com/avolantis/ts-guid/commit/7f301a3abdccfeb9bd5a395202a7f46e78c526df))


### Continuous Integration

* codeql analysis ([a491c5f](https://github.com/avolantis/ts-guid/commit/a491c5f279285eccc3ff677b529178cbe9300f26))
* created ci pipeline ([18b13f7](https://github.com/avolantis/ts-guid/commit/18b13f7c02a3d942c59b79686cb2c7fe31fde820))
* fix dependabot config and increase pr limit ([1629185](https://github.com/avolantis/ts-guid/commit/1629185656d77b7f180812b659b807bcd2ea8234))
* remove scope from dependabot commit messages ([caf9509](https://github.com/avolantis/ts-guid/commit/caf95093ffc2b1481a57b9989092cc8b1b9ea5fe))


### Test-related

* fixed missing coverage ([#19](https://github.com/avolantis/ts-guid/issues/19)) ([18b9322](https://github.com/avolantis/ts-guid/commit/18b9322199298753760b7e46cdefbdabcd03a8c8))
* tests for the new version ([#9](https://github.com/avolantis/ts-guid/issues/9)) ([7027036](https://github.com/avolantis/ts-guid/commit/7027036f496be3a5917a03d10c4c96512c1cbfd2))
* util.ts ([a3ec3b6](https://github.com/avolantis/ts-guid/commit/a3ec3b6e4b322b03a99b0e5167a594e0044ad230))
* v4 ([004502c](https://github.com/avolantis/ts-guid/commit/004502c8e0a0059cdebaefb508b39a2ca13f32fe))


### Documentation-related

* docs for the new version ([#9](https://github.com/avolantis/ts-guid/issues/9)) ([ca81950](https://github.com/avolantis/ts-guid/commit/ca81950ca20b55ab2f35510a064d114bb37b9690))
* issue templates ([95ac556](https://github.com/avolantis/ts-guid/commit/95ac55605bf934189aded2b91745241ba5b21b83))
* readme example typo ([544232b](https://github.com/avolantis/ts-guid/commit/544232b50783a1f694a518324a08f2536a9fb29e))
* readme update ([7c08f51](https://github.com/avolantis/ts-guid/commit/7c08f51e0d0371935a01e730172e5e259154b265))
* readme update ([1046597](https://github.com/avolantis/ts-guid/commit/1046597965888dbe3c096105b735d984cb627cc4))


### Others

* auto bump version in readme ([#26](https://github.com/avolantis/ts-guid/issues/26)) ([ba74286](https://github.com/avolantis/ts-guid/commit/ba74286812530411889d22c5d75aa46ff28297c4))
* changelog generation & release automation ([#25](https://github.com/avolantis/ts-guid/issues/25)) ([bb751a8](https://github.com/avolantis/ts-guid/commit/bb751a8e4b812a9f3e863435e7f0c02280014d57))
* commitlint configuration ([da276f4](https://github.com/avolantis/ts-guid/commit/da276f4165234bac9af191d1f3e38508bbf9d2ac))


### Build System

* bump @babel/core from 7.12.3 to 7.12.7 ([d4900c6](https://github.com/avolantis/ts-guid/commit/d4900c6d602fd818567608cfa21f60d3a45ebfe9))
* bump @babel/preset-env from 7.12.1 to 7.12.7 ([d056f17](https://github.com/avolantis/ts-guid/commit/d056f1727c44cf840e6ae3f15c82e90e3b7c6886))
* bump @commitlint/config-conventional from 11.0.0 to 12.0.1 ([0452038](https://github.com/avolantis/ts-guid/commit/0452038a1cf3a6e30e5dcbffe9fbc6d0041a0e3a))
* bump @rollup/plugin-commonjs from 15.1.0 to 16.0.0 ([ec47af5](https://github.com/avolantis/ts-guid/commit/ec47af5d5ab5d24f6cbb8286530b093aca804968))
* bump @rollup/plugin-commonjs from 16.0.0 to 17.1.0 ([c57d404](https://github.com/avolantis/ts-guid/commit/c57d4047b6afa3daf9aa8f4d477e5e002f12b8e1))
* bump @rollup/plugin-node-resolve from 10.0.0 to 11.2.0 ([5a671d0](https://github.com/avolantis/ts-guid/commit/5a671d0da7c4609cafa80012905c599f51e2169e))
* bump @types/jest from 26.0.15 to 26.0.20 ([a3566bf](https://github.com/avolantis/ts-guid/commit/a3566bf0d814774fb723f491580a8ff25de80956))
* bump @types/node from 14.14.6 to 14.14.9 ([c962257](https://github.com/avolantis/ts-guid/commit/c9622571ab3c909806b4458085e9161523bccef3))
* bump @types/node from 14.14.9 to 14.14.33 ([03e1267](https://github.com/avolantis/ts-guid/commit/03e12673a539ea3be9db27876c1d65381dec2ec5))
* bump @typescript-eslint/eslint-plugin from 4.6.1 to 4.8.2 ([6789133](https://github.com/avolantis/ts-guid/commit/678913346d2a613860c58172458fbdfc6727482c))
* bump @typescript-eslint/eslint-plugin from 4.8.2 to 4.17.0 ([9b865e6](https://github.com/avolantis/ts-guid/commit/9b865e6377b19e3cd907c670597109afd4360f03))
* bump @typescript-eslint/parser from 4.6.1 to 4.8.2 ([0272f81](https://github.com/avolantis/ts-guid/commit/0272f81e66300fe72ed400df67cedb4232e2dfbf))
* bump @typescript-eslint/parser from 4.8.2 to 4.16.1 ([6022b73](https://github.com/avolantis/ts-guid/commit/6022b739fba5858b5a75f194bd58b46036a2a981))
* bump @typescript-eslint/parser from 4.8.2 to 4.17.0 ([4007af2](https://github.com/avolantis/ts-guid/commit/4007af2a14305ec4db2b88c738d6033209b266f0))
* bump commitlint from 11.0.0 to 12.0.1 ([014bbd5](https://github.com/avolantis/ts-guid/commit/014bbd5ab4dcbc8dc53586a5788d7534d858b873))
* bump commitlint from 9.1.2 to 11.0.0 ([f7e2b27](https://github.com/avolantis/ts-guid/commit/f7e2b27a8773d0e8c55a1acb914426d1ee8f5ad0))
* bump cross-env from 7.0.2 to 7.0.3 ([dd98b1a](https://github.com/avolantis/ts-guid/commit/dd98b1a3e123613ac23c635485d545c7ee679434))
* bump eslint from 7.12.1 to 7.14.0 ([9ab9311](https://github.com/avolantis/ts-guid/commit/9ab9311a1207710720be241abf607aae71c06195))
* bump eslint from 7.14.0 to 7.21.0 ([0c3ad9d](https://github.com/avolantis/ts-guid/commit/0c3ad9d3015195ac5cce0188ff7c3b0cbb552fbb))
* bump eslint-plugin-jest from 24.1.0 to 24.1.3 ([362070b](https://github.com/avolantis/ts-guid/commit/362070b603668c1a2992ef67b154c9a9e33d928f))
* bump eslint-plugin-jest from 24.1.3 to 24.1.5 ([ec3d590](https://github.com/avolantis/ts-guid/commit/ec3d59081d07e1bf9d499d51202b853043dcdce1))
* bump eslint-plugin-jest from 24.1.3 to 24.2.1 ([546ad71](https://github.com/avolantis/ts-guid/commit/546ad715b0969f9bb40cbb7af89b1d6d147be715))
* bump eslint-plugin-prettier from 3.1.4 to 3.3.1 ([dc1ee40](https://github.com/avolantis/ts-guid/commit/dc1ee409436822fdd8129923e4754c741c834162))
* bump ini from 1.3.5 to 1.3.8 ([c011b42](https://github.com/avolantis/ts-guid/commit/c011b423d8e6bf4d02bb4725b04c62e331dc90f9))
* bump ini from 1.3.5 to 1.3.8 ([f3a3c04](https://github.com/avolantis/ts-guid/commit/f3a3c044744349570eec36ee1edce86c6662b3cc))
* bump lint-staged from 10.5.1 to 10.5.4 ([402a3b5](https://github.com/avolantis/ts-guid/commit/402a3b569253e7de58ba0ed0836bce39a7884907))
* bump node-notifier from 8.0.0 to 8.0.1 ([f61e903](https://github.com/avolantis/ts-guid/commit/f61e903838da2aa0f29bdfe2291a46ac460a168f))
* bump node-notifier from 8.0.0 to 8.0.1 ([368701f](https://github.com/avolantis/ts-guid/commit/368701f4a7630976e9bde45db54be022df3d044d))
* bump prettier from 2.1.2 to 2.2.0 ([aec7123](https://github.com/avolantis/ts-guid/commit/aec7123320bf598dbf8ca08af502f68580804a5a))
* bump prettier from 2.2.0 to 2.2.1 ([91dcc8a](https://github.com/avolantis/ts-guid/commit/91dcc8a02b0993350c40014610776802b6187921))
* bump rollup from 2.33.1 to 2.33.3 ([3278221](https://github.com/avolantis/ts-guid/commit/3278221e4f51b38350874e02f5048faa35a7548d))
* bump rollup from 2.33.3 to 2.41.0 ([dc59eeb](https://github.com/avolantis/ts-guid/commit/dc59eeb70ab76b6ab52ce4534a5ee49c4fb6b013))
* bump rollup-plugin-dts from 1.4.13 to 2.0.0 ([811c10c](https://github.com/avolantis/ts-guid/commit/811c10cbd139c62cd1ce32a2371fef1c84f43d7d))
* bump ts-jest from 26.4.3 to 26.4.4 ([fc69a57](https://github.com/avolantis/ts-guid/commit/fc69a57031350a54aecc8293642f765eac58fea6))
* bump ts-jest from 26.4.4 to 26.5.3 ([e096706](https://github.com/avolantis/ts-guid/commit/e09670641140336ac1d61211a37261a5bff6a7aa))
* bump typescript from 4.0.5 to 4.1.2 ([d2bad71](https://github.com/avolantis/ts-guid/commit/d2bad71d204d7859551b32aa976f59537841ea97))
* bump typescript from 4.1.2 to 4.2.2 ([68d174a](https://github.com/avolantis/ts-guid/commit/68d174a9c75e9b75c18920b58737fd31f94aa80f))
* bump typescript from 4.1.2 to 4.2.3 ([80fcd77](https://github.com/avolantis/ts-guid/commit/80fcd77bfb4828601bfe74c82dcf6c0aaae12e8c))
* fixed build pipeline ([#7](https://github.com/avolantis/ts-guid/issues/7)) ([#8](https://github.com/avolantis/ts-guid/issues/8)) ([331325a](https://github.com/avolantis/ts-guid/commit/331325a064ed014c205c5ad2f6d4f62cbaef31b6))
* pipeline for the new version ([#9](https://github.com/avolantis/ts-guid/issues/9)) ([6b0ff4e](https://github.com/avolantis/ts-guid/commit/6b0ff4e0e7e632adcaa3845afb4a1b212d6cec6f))

## [0.1.0-preview.0](https://github.com/avolantis/ts-guid/compare/a23bdc96ae75bacf9fa7c04eca100c688c4660a2...v0.1.0-preview.0) (2020-11-20)


### Features

* first implementation ([a23bdc9](https://github.com/avolantis/ts-guid/commit/a23bdc96ae75bacf9fa7c04eca100c688c4660a2))


### Documentation-related

* first release docs ([3b4098b](https://github.com/avolantis/ts-guid/commit/3b4098b75e451fe0f52910259bb417f06673adf0))
* repo readme ([60aa712](https://github.com/avolantis/ts-guid/commit/60aa712768c924aa79611135a53fc5e79371a307))


### Build System

* deps update ([ddc5d5b](https://github.com/avolantis/ts-guid/commit/ddc5d5b7de4bde82b05ef9b4100d623852a5384f))


### Others

* first preview release ([3e86bd0](https://github.com/avolantis/ts-guid/commit/3e86bd0839e5aa0aacb44491cd28ae3827530eec))
