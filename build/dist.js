import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { resolve as resolvePath } from "path";
import { main, module as mod, unpkg, browser } from "../package.json";
import commonjs from "@rollup/plugin-commonjs";

const terse = terser({
  output: {
    comments: function (node, comment) {
      const text = comment.value;
      const type = comment.type;
      if (type === "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text);
      }
    }
  }
});

const babel1 = babel({
  configFile: resolvePath(__dirname, "../config/babel.node.js"),
  babelHelpers: "bundled"
});

const babel2 = babel({
  configFile: resolvePath(__dirname, "../config/babel.esm.js"),
  exclude: ["core-js", "regenerator-runtime"],
  babelHelpers: "bundled"
});

const babel3 = babel({
  configFile: resolvePath(__dirname, "../config/babel.browser.js"),
  babelHelpers: "bundled"
});

const targets = [
  {
    file: main,
    format: "cjs",
    input: resolvePath(__dirname, "../lib/polyfilled.js"),
    plugins: [
      commonjs(),
      babel1,
      externals({
        exclude: ["core-js", "regenerator-runtime"],
        packagePath: resolvePath(__dirname, "../package.json")
      }),
      resolve()
    ]
  },
  {
    file: mod,
    format: "esm",
    esModule: true,
    input: resolvePath(__dirname, "../lib/polyfilled.js"),
    plugins: [
      commonjs(),
      terse,
      babel2,
      externals({
        exclude: ["core-js", "regenerator-runtime"],
        packagePath: resolvePath(__dirname, "../package.json")
      }),
      resolve({
        browser: true
      })
    ]
  },
  {
    file: unpkg,
    format: "umd",
    name: "TsGuid",
    input: resolvePath(__dirname, "../lib/polyfilled.js"),
    plugins: [
      commonjs(),
      terse,
      babel3,
      externals({
        exclude: ["core-js", "regenerator-runtime"],
        packagePath: resolvePath(__dirname, "../package.json")
      }),
      resolve({
        browser: true
      })
    ]
  },
  {
    file: browser,
    format: "iife",
    name: "TsGuid",
    input: resolvePath(__dirname, "../lib/polyfilled.js"),
    plugins: [
      commonjs(),
      terse,
      babel3,
      externals({
        exclude: ["core-js", "regenerator-runtime"],
        packagePath: resolvePath(__dirname, "../package.json")
      }),
      resolve({
        browser: true
      })
    ]
  }
];

function build() {
  return targets.map((ctx) => {
    const { plugins, input, ...target } = ctx;
    return {
      input,
      output: {
        ...target,
        sourcemap: true
      },
      external: "crypto",
      plugins
    };
  });
}

export const dist = build();
