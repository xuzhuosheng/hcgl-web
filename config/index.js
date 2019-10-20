'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/tbjkfxapi/web": {
        target: "http://127.0.0.1:8877",
        changeOrigin: true,
        cookieDimainRewrite: "",
        pathRewrite: {
          '^/tbjkfxapi/web': ''
        }
      },
      '/tbjkfxapi': {
        // target: 'http://127.0.0.1:17032',
        target: 'http://106.15.92.96:17030/tbjkfxapi/',
        // target: 'http://192.168.2.55:17032',
        // target: 'http://192.168.2.60:17032',
        changeOrigin: true,
        pathRewrite: {
          '^/tbjkfxapi': ''
        }
      },
      '/testapi': {
        target: 'http://localhost:8000', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/testapi': ''
        }
      }, '/hcgl': {
        target: 'http://localhost:10000', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/hcgl': ''
        }
      }, '/user': {
        target: 'http://localhost:9001/user', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/user': '/'
        }
      },
      '/login': {
        target: 'http://192.168.0.106:20210/login', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/login': '/'
        }
      },
      onProxyReq: function (proxyReq, req, res) {

        console.log("原路径：" + req.port + req.originalUrl, "代理路径：" + res.port + req.path)
      }

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8877, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
