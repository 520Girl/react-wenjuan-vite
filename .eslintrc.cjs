module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    "./.eslintrc-auto-import.json",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','mock_server'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: { //运行any 属性
    "@typescript-eslint/no-explicit-any": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "off",
  },
  
}
