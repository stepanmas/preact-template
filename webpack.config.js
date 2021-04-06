const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = () => ({
  name: __dirname,
  mode: isDev ? 'development' : 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  optimization: {
    minimize: !isDev,
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
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
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
                  exportLocalsConvention: 'camelCase',
                  localIdentName: isDev ? '[name]-[local]-[hash:4]' : '[hash:4]',
                },
                importLoaders: 1,
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
