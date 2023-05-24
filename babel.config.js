const moduleResolverConfig = [
  'module-resolver',
  {
    alias: {
      '@': './src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
];

const transformInlineEnviromentVariables = 'transform-inline-environment-variables';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [moduleResolverConfig, transformInlineEnviromentVariables],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
