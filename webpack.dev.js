const path = require('path');
const htmlPlugin =  require('html-webpack-plugin');
const extractTextPlugin =  require('extract-text-webpack-plugin');
const lessPluginFun = require('less-plugin-functions');
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js', // js 入口
        category: './src/category.js', // js 入口
        dt003: './src/dt003.js', // js 入口
        news2: './src/news2.js', // js 入口
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[{loader:"css-loader"},
                        {
                            loader:"postcss-loader",
                        }]
                    }) 
            },
            {
                test: /\.(png|jpg|gif|jpeg|woff|svg|eot|ttf)/, //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        outputPath: './img',
                        esModule: false,
                        limit: 80000  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'] 
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            plugins: [new lessPluginFun()]
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader",
                    publicPath: '../'
                })
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            filename: 'index.html',
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html' //是要打包的html模版路径和文件名称。
        }),
        new htmlPlugin({
            filename: 'category.html',
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/category.html' //是要打包的html模版路径和文件名称。
        }),
        new htmlPlugin({
            filename: 'dt003.html',
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/dt003.html' //是要打包的html模版路径和文件名称。
        }),
        new htmlPlugin({
            filename: 'news2.html',
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/news2.html' //是要打包的html模版路径和文件名称。
        }),
        new extractTextPlugin("css/[name].[chunkhash:8].css")
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        compress: true,
        port: 8888
    }
}