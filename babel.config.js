const moduleResolverConfig = [
  'module-resolver',
  {
    alias: {
      '@': './src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
];

const dotEnv = [
  'module:react-native-dotenv',
  {
    moduleName: '@env',
    path: '.env',
    blacklist: null,
    whitelist: null,
    safe: false,
    allowUndefined: true,
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [moduleResolverConfig, dotEnv, 'react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
