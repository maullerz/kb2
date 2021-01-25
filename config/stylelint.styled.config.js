module.exports = {
  processors: [
    'stylelint-processor-styled-components',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global'],
    }],
    'font-family-no-missing-generic-family-keyword': [true, {
      // ignoreFontFamilies: ["Avenir"]
    }],
  },
}
