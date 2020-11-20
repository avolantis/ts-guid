import { lib } from "./lib";
import { types } from "./types";
import { dist } from "./dist";

// Lib build (ts -> js) first, everything else after
export default [lib, types, ...dist];
