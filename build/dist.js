import babel from "@rollup/plugin-babel";
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { resolve as resolvePath } from "path";
import { main, module as mod, unpkg, browser } from "../package.json";

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
  configFile: resolvePath(__dirname, "../config/babel.node.js")
});

const babel2 = babel({
  configFile: resolvePath(__dirname, "../config/babel.esm.js")
});

const babel3 = babel({
  configFile: resolvePath(__dirname, "../config/babel.browser.js")
});

const targets = [
  { file: main, format: "cjs", plugins: [babel1] },
  { file: mod, format: "esm", esModule: true, plugins: [terse, babel2] },
  { file: unpkg, format: "umd", name: "TsGuid", plugins: [terse, babel3] },
  { file: browser, format: "iife", name: "TsGuid", plugins: [terse, babel3] }
];

function build() {
  return targets.map((ctx) => {
    const { plugins, ...target } = ctx;
    return {
      input: resolvePath(__dirname, "../lib/index.js"),
      output: {
        ...target,
        sourcemap: true
      },
      plugins: [
        ...plugins,
        externals({
          devDeps: false,
          packagePath: resolvePath(__dirname, "../package.json")
        }),
        resolve()
      ]
    };
  });
}

export const dist = build();
