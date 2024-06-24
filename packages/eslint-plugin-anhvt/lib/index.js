"use strict";

const pkg = require("../package.json");
const noProcessEnv = require("./rules/no-process-env");

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    "no-process-env": noProcessEnv,
  },
}
