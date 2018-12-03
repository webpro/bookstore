const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const DotEnv = require('dotenv-webpack');
  const withSass = require('@zeit/next-sass');

  return withSass({
    sassLoaderOptions: {
      includePaths: ['node_modules']
    },
    webpack: config => {
      config.plugins.push(new DotEnv());
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      });
      return config;
    }
  });
};
