import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import multi from "@rollup/plugin-multi-entry";
import { resolve as resolvePath } from "path";
import { types as file } from "../package.json";

export const types = {
  input: resolvePath(__dirname, "../lib") + "/**/*.d.ts",
  output: {
    file: resolvePath(__dirname, "../", file),
    format: "es"
  },
  plugins: [
    dts({ compilerOptions: { rootDir: resolvePath(__dirname, "../src") } }),
    multi(),
    copy({
      targets: [
        {
          src: resolvePath(__dirname, "../lib") + "/**/*.d.ts.map",
          dest: resolvePath(__dirname, "../types")
        }
      ]
    })
  ]
};
