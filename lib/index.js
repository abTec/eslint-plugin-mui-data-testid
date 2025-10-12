/**
 * @fileoverview Rule to enforce that interactive MUI components has data-testid attribute.
 * @author abTec
 */

'use strict';

const muiComponentNames = [
  'Autocomplete',
  'Button',
  'Checkbox',
  'IconButton',
  'ListItemButton',
  'MenuItem',
  'MenuList',
  'Radio',
  'Select',
  'Switch',
  'TextField',
];

module.exports = {
  rules: {
    'testid-missing': {
        meta: {
        type: 'problem',
        fixable: 'code',
        name: 'eslint-plugin-mui-data-testid',
        version: '1.1.0',
      },
      create(context) {
        const options = context.options[0] || {};
        const {
          excludeComponents = [],
          includeComponents = [],
          dataTestId = 'data-testid',
        } = options;

        return {
          JSXOpeningElement(node) {
            const { name, attributes } = node;

            if (!name || !name.name) {
              return;
            }

            const componentName = name.name;

            const filteredComponents = muiComponentNames.filter(
              component => !excludeComponents.includes(component)
            );
            const allComponents = [...filteredComponents, ...includeComponents];
            if (allComponents.includes(componentName)) {
              const hasDataTestIdAttribute = attributes.some(
                attribute => attribute.name && attribute.name.name === dataTestId
              );

              if (!hasDataTestIdAttribute) {
                context.report({
                  node: name,
                  message: `<${componentName}> is missing a ${dataTestId} attribute.`,
                  fix(fixer) {
                    return fixer.insertTextAfter(name, ` ${dataTestId}="" `);
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};
