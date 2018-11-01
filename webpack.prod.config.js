var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js');
var SlackPlugin = require('webpack-slack-notifier');

module.exports = merge(baseConfig, {});
