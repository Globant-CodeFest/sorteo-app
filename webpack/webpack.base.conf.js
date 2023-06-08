const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlVariablesPlugin = require('html-variables-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.ts')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets/images/og'),
          to: 'assets/images/og',
          globOptions: { ignore: ['**/.DS_Store'] }
        },
        {
          from: path.resolve(__dirname, '../src/assets/images/touch-icons'),
          to: 'assets/images/touch-icons',
          globOptions: { ignore: ['**/.DS_Store'] }
        },
        { from: path.resolve(__dirname, '../src/assets/images/favicon.ico'), to: 'assets/images/favicon.ico' },
        { from: path.resolve(__dirname, '../src/manifest.json'), to: 'manifest.json' },
        { from: path.resolve(__dirname, '../src/assets/names.txt'), to: 'names.txt' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.pug'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlVariablesPlugin(process.env)
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@js': path.resolve(__dirname, '../src/assets/js'),
      '@styles': path.resolve(__dirname, '../src/assets/scss'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@fonts': path.resolve(__dirname, '../src/assets/fonts')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug(\?.*)?$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/assets/fonts')
        ],
        options: {
          limit: -1,
          name: 'assets/images/[ext]/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: -1,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/assets/images')
        ],
        options: {
          limit: -1,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};
