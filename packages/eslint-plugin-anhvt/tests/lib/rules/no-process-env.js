"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-process-env.js");

new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "commonjs",
  },
}).run("no-process-env", rule, {
  valid: ["Process.env", "process.nextTick", "process.execArgv"],

  invalid: [
    {
      code: "process.env",
      errors: [
        {
          messageId: "unexpectedProcessEnv",
          type: "MemberExpression",
        },
      ],
    },
    {
      code: "const {env} = process",
      errors: [
        {
          messageId: "unexpectedProcessEnv",
          type: "VariableDeclarator",
        },
      ],
    },
    {
      code: "process[env]",
      errors: [
        {
          messageId: "unexpectedProcessEnv",
          type: "MemberExpression",
        },
      ],
    },
    {
      code: "process.env.ENV",
      errors: [
        {
          messageId: "unexpectedProcessEnv",
          type: "MemberExpression",
        },
      ],
    },
    {
      code: "f(process.env)",
      errors: [
        {
          messageId: "unexpectedProcessEnv",
          type: "MemberExpression",
        },
      ],
    },
  ],
});
