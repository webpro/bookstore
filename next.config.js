const DotEnv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');

const config = {
  target: 'serverless',
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
}

module.exports = withSass(config);
