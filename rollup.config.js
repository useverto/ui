import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import autoprefixer from "autoprefixer";
import stringHash from "string-hash";
import autoExternal from "rollup-plugin-auto-external";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    autoExternal(),
    external(),
    postcss({
      plugins: [autoprefixer],
      modules: {
        generateScopedName(name, filename, css) {
          const path = require("path"),
            file = path.basename(filename, ".css").split(".")[0],
            hash = stringHash(css).toString(36).substr(0, 5);

          return `Verto_${file}_${name}__${hash}_`;
        }
      }
    }),
    url(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs()
  ]
};
