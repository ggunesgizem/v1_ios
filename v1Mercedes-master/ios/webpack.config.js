const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

const configPoints = require(process.env.CONFIG_TYPE)

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  return {
    entry: './src/index.js',
    context: __dirname,
    output: {
      path: resolve(__dirname, './phonegap-app/www/'),
      filename: 'bundle.js',
      publicPath: '',
      pathinfo: ifNotProd(),
    },
    devtool: ifNotProd('eval'),
    devServer: {
      port: 3001,
      historyApiFallback: true
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   enforce: 'pre',
        //   loader: 'eslint-loader',
        // },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
            }
          ]
        },
        {
          test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg|\.png|\.jpg|\.gif|\.otf)/,
          loader: 'file-loader',
        },
        { test: /\.ya?ml$/, loader: 'json-loader!yaml-loader' }
      ],
    },
    plugins: removeEmpty([
      ifNotProd(new webpack.DefinePlugin({
        'configs': configPoints
      })),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
        'configs': configPoints
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: true,
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false,
          drop_console: true,
        },
      })),
    ])
  }
}
