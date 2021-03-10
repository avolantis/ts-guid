import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/ts-guid.esnext.esm.js",
      format: "esm",
      sourcemap: true
    },
    plugins: [
      externals({
        exclude: ["crypto"],
        packagePath: "package.json"
      }),
      esbuild({
        include: /\.ts?$/,
        exclude: /node_modules|tests/,
        sourceMap: true,
        minify: false,
        target: "esnext",
        tsconfig: "tsconfig.json"
      })
    ]
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/ts-guid.es6.esm.js",
        format: "esm",
        sourcemap: true
      },
      {
        file: "dist/ts-guid.es6.umd.js",
        format: "umd",
        name: "TsGuid",
        sourcemap: true
      },
      {
        file: "dist/ts-guid.es6.cjs.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/ts-guid.es6.iife.js",
        format: "iife",
        name: "TsGuid",
        sourcemap: true
      }
    ],
    plugins: [
      commonjs(),
      resolve(),
      externals({
        exclude: ["crypto"],
        packagePath: "package.json"
      }),
      esbuild({
        include: /\.ts?$/,
        exclude: /node_modules|tests/,
        sourceMap: true,
        minify: true,
        target: "es6",
        tsconfig: "tsconfig.json"
      })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/ts-guid.d.ts",
      format: "es"
    },
    plugins: [dts({ compilerOptions: { rootDir: "src" } })]
  }
];
