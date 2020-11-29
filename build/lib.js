import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import multi from "rollup-plugin-multi-input";
import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";
import typescript from "typescript";
import { resolve as resolvePath } from "path";

export const lib = {
  input: "src/**/*.ts",
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true
  },
  plugins: [
    commonjs(),
    multi(),
    externals({
      include: ["core-js", "regenerator-runtime"],
      exclude: ["crypto"],
      packagePath: resolvePath(__dirname, "../package.json")
    }),
    resolve(),
    ts({
      typescript: typescript,
      tsconfig: resolvePath(__dirname, "../tsconfig.json"),
      tsconfigOverride: {
        compilerOptions: {
          watch: false,
          rootDir: "src"
        },
        exclude: ["node_modules", "tests"]
      }
    })
  ]
};
