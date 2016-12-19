var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/index.js',
        jquery : ['jquery']
    },
    //入口文件输出配置
    output: {
        path: './dist/js',
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/wz/xiaozhitiao/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }/*,
     plugins: [
     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
     new webpack.DefinePlugin({
     'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
     }),
     new webpack.optimize.UglifyJsPlugin()
     ]*/,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.optimize.CommonsChunkPlugin({name: ["jquery"],minChunks:Infinity}),
        //new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename:"../index.html",
            template:"./src/index.html",
            inject:true,
            chunks:['jquery','index'],
            chunksSortMode:function(a,b)
            {
                var index = {'jquery':2,'index':1},
                    aI = index[a.origins[0].name],
                    bI = index[b.origins[0].name];
                return aI&&bI ? bI - aI : -1;
            }
        })
        //,new webpack.optimize.UglifyJsPlugin()
    ]
};
//config.addVendor('jquery.touchSwipe', 'js/jquery.touchSwipe.min.js');

module.exports = config;