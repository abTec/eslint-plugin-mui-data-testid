'use strict';

const muiComponentNames = [
  'Autocomplete',
  'Button',
  'Checkbox',
  'FormControlLabel',
  'IconButton',
  'ListItemButton',
  'MenuItem',
  'MenuList',
  'Radio',
  'Select',
  'Switch',
  'TextField',
];

const plugin = {
  meta: {
    name: 'eslint-plugin-mui-data-testid',
    version: '1.0.0',
  },
  rules: {
    'testid-missing': {
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
                });
              }
            }
          },
        };
      },
    },
  },
};

module.exports = plugin;
