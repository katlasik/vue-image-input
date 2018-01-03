'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const env = process.env.NODE_ENV === 'testing' ?
    require('../config/test.env') :
    config.build.env

const webpackConfig = merge(baseWebpackConfig, {
    externals: {
        mimeMatcher: 'mime-matcher'
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    entry: {
        app: './src/components/VueImageInput.vue'
    },
    output: {
        filename: 'vue-image-input.js',
        library: 'vue-image-input',
        umdNamedDefine: true,
        libraryTarget: 'umd'
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        })
    ]
})

module.exports = webpackConfig