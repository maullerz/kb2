module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global'],
    }],
    'font-family-no-missing-generic-family-keyword': [true, {
      // ignoreFontFamilies: ["Avenir"]
    }],
  },
}
