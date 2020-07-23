import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * This is where you define your additional webpack configuration items to be appended to
 * the end of the webpack config.
 */
export default {
  node : {global: true},
  plugins: [new HtmlWebpackPlugin()]
} as webpack.Configuration;
