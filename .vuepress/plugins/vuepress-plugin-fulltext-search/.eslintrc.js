module.exports = {
  root: true,
  extends: ['plugin:tyrecheck/recommended'],
  rules: {
    'md/remark': [
      'error',
      {
        plugins: [
          'preset-lint-markdown-style-guide',
          'frontmatter',
          // Disable rules handled by Prettier
          ['lint-maximum-line-length', false],
          ['lint-emphasis-marker', false],
          ['lint-list-item-indent', false],
          ['lint-list-item-spacing', false],
          ['lint-ordered-list-marker-value', false],
          ['lint-no-consecutive-blank-lines', false],
          ['lint-table-cell-padding', false],
          ['lint-link-title-style', false],
          ['lint-no-shortcut-reference-link', false],
          ['lint-no-shortcut-reference-link', false],
          ['lint-no-duplicate-headings', false],
        ],
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', { allow: ['warn', 'error'] }],
  },
}
 