import typescript from "@rollup/plugin-typescript";
import yaml from "@rollup/plugin-yaml";

export default {
  input: "./src/index.ts",
  output: {
    dir: "./dist",
  },
  plugins: [typescript(), yaml()],
};
