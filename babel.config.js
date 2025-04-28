module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@models': './src/models',
          '@routers': './src/router',
          '@config': './src/config',
          '@services': './src/services',
          '@interfaces': './src/interfaces',
          '@schemas': './src/database/schemas',
          '@controllers': './src/controllers',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
