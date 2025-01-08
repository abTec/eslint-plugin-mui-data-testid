# eslint-plugin-mui-data-testid

[ESLint](https://eslint.org/docs/user-guide/getting-started) plugin to check data-testid attribute for given list of [MUI](https://mui.com/) components.

## Installation

```bash
npm i eslint-plugin-mui-data-testid -D
```

## Configuration

After installation, do not forget to configure ESLint to use this rule. Here's an example configuration:

```javascript
{
  plugins: ['mui-data-testid'],
  'rules': {
    'react-require-testid/testid-missing': ['error', {
      'includeComponents': [], // You can add custom components to the default list. e.g.: 'OurCompanyComponent'.
      'excludeComponents': [], // You can remove components from the default list if needed.
      'dataTestId': 'data-testid', // You can also override the data test attribute.
    }]
  }
}
```
