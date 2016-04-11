var config = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.devtool = 'eval-source-map'

config.plugins = (config.plugins || [])
config.plugins.push(
    new HtmlWebpackPlugin({
        title:'MAIN DEMO PAGE',
        template:'./demo/template.html',
        filename:'./index.html',
        hash:true
    })
)


config.devServer = {
    noInfo: true,
    historyApiFallback:true
}

module.exports = config
