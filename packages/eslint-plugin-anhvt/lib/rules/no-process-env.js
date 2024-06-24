//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const querySelector = [
  `MemberExpression`,
  `[object.name="process"]`,
  `[property.name="env"]`,
];

const destructorQuerySelector = [
  `ObjectPattern > Property`,
  `[kind="init"]`,
  `[key.name="env"]`,
];

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow the use of `process.env`",
      recommended: false,
      // TODO: Provide a url for the rule documentation
      url: "",
    },
    fixable: null,
    schema: [],
    messages: {
      unexpectedProcessEnv: "Unexpected use of process.env.",
    },
  },

  create(context) {
    return {
      /** @param {import('estree').MemberExpression} node */
      [querySelector.join("")](node) {
        context.report({ node, messageId: "unexpectedProcessEnv" });
      },
      /** @param {import('estree').Property} node */
      [destructorQuerySelector.join("")](node) {
        if (node.parent.parent.type !== "VariableDeclarator") {
          return;
        }
        if (
          node.parent.parent.init?.type !== "Identifier" ||
          node.parent.parent.init.name !== "process"
        ) {
          return;
        }
        context.report({
          node: node.parent.parent,
          messageId: "unexpectedProcessEnv",
        });
      },
    };
  },
};
