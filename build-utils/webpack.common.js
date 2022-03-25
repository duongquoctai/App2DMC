const path = require('path');
const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;
const devDeps = require('../package.json').devDependencies;

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  output: {
    path: paths.appBuild,
    publicPath: 'auto'
  },
  devServer: {
    contentBase: paths.appBuild
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js'],
    modules: [paths.appSrc, 'node_modules'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      buffer: false,
      util: false,
      assert: false
    },
    alias: {
      '~': paths.appSrc
    }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      remotes: {
        dmc: 'dmc@http://localhost:3000/remoteEntry.js'
      },
      exposes: {
        './theme': './src/theme',
        './App': './src/App',
        './routes': './src/routes/index'
      },
      shared: {
        ...devDeps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom']
        },
        'react-redux': {
          singleton: true,
          requiredVersion: deps['react-redux']
        }
        // '@mui/styles': {
        //   singleton: true
        // },
        // '@mui/material': {
        //   singleton: true
        // }
        // '@mui/icons-material': {
        //   singleton: true
        // },
        // '@mui/lab': {
        //   singleton: true
        // },
        // '@mui/styled-engine': {
        //   singleton: true
        // },
        // '@mui/x-data-grid': {
        //   singleton: true
        // }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/static',
          to: 'static'
        },
        {
          from: './src/assets/favicon',
          to: 'favicon'
        },
        {
          from: './src/assets/fonts',
          to: 'fonts'
        },
        {
          from: './src/assets/locales',
          to: 'locales'
        }
      ]
    })
  ]
};
