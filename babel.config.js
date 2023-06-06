const moduleResolverConfig = [
  'module-resolver',
  {
    alias: {
      '@': './src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
];

const dotEnvDevelopment = [
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
    plugins: [moduleResolverConfig, dotEnvDevelopment],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
