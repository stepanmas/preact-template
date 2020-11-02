const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => ({
  name: __dirname,
  mode: env?.production ? 'production' : 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: env?.production ? 'bundle.[hash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  optimization: {
    minimize: env?.production,
    minimizer: [new TerserPlugin()],
  },
  performance: {
    maxEntrypointSize: 100 * 1024, // 100 кб
    maxAssetSize: 100 * 1024,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      img: path.resolve(__dirname, 'src/img'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.s?css$/,
        oneOf: [{
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: env?.production ? '[hash:4]' : '[name]-[local]-[hash:4]',
                },
                importLoaders: 1,
                localsConvention: 'camelCase',
              },
            },
            'sass-loader',
          ],
        }],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
    ],
  },
});