module.exports = function getConfig(api) {
  api.cache.using(() => process.env.NODE_ENV)

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
    '@babel/preset-react',
  ]

  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
    'date-fns',
  ]

  if (process.env.NODE_ENV === 'development') {
    // plugins.push('react-hot-loader/babel')

    // https://styled-components.com/docs/tooling
    plugins.unshift([
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: false,
        minify: false,
        transpileTemplateLiterals: false,
      }
    ])
  } else {
    plugins.unshift([
      'babel-plugin-styled-components',
      {
        displayName: false,
        fileName: false,
        minify: true,
        transpileTemplateLiterals: true,
      }
    ])
  }

  const env = {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: true,
          },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        'lodash',
        'date-fns',
      ],
    },
  }

  return {
    presets,
    plugins,
    env,
  }
}
