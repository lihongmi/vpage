var path = require('path')
var webpack = require('webpack')
var extractTextPlugin = require('extract-text-webpack-plugin')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')


var definePlugin = new webpack.DefinePlugin({
    __DEV__:JSON.stringify( JSON.parse(process.env.APP_ENV || 'false') )
})


module.exports = {
    entry:'./src/index.js',
    output:{
        path:'./dist',
        publicPath:'',
        filename:'[name].js',
        libraryTarget:'umd'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                loader:extractTextPlugin.extract('style-loader','css-loader!less-loader!postcss-loader')
                // loader:'style-loader!css-loader!postcss-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url',
                query:{
                    limit:10000,
                    name:'[name].[ext]?[hash]'
                }
            }
        ]
    },
    postcss:function(){
        return [precss,autoprefixer]
    },
    resolve:{
        root:path.resolve('./')
    },
    plugins:[definePlugin , new extractTextPlugin("vpage.css")]

}
