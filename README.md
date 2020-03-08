# hotcssduosheji
基于hotcss的多设计稿的 不同设计稿 不同rem展示

html-webpack-plugin 根据entry入口name 生成html 引入对应的资源 
new htmlPlugin({
            filename: 'index.html', // 生成文件名字
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            title:"index",
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            chunks: ['index'], //生成html文件只引入对应的index.js .css 不然会把多入口的全部引入
            template: './src/index.html' //是要打包的html模版路径和文件名称。
        }),

extract-text-webpack-plugin 引入分离插件
它会将所有 required 的 *.css 模块抽取到分离的 CSS 文件。 所以你的样式将不会内联到 JS bundle，而是在一个单独的 CSS 文件。如果你的样式文件很大，这样会提速，因为 CSS bundle 和 JS bundle 是平行加载的
 优势	                                                                                  劣势
更少的 style tags	                                                                                额外的 http 请求
css SourceMap (通过 devtool: "source-map" 和 extract-text-webpack-plugin?sourceMap)	                 更长的编译时间
css 请求和 js 平行	 
css 拥有自己的 cache	不能使用                                                                      Hot Module Replacement
rumtime 更快 （更少的code 和 dom 操作） 
 
  rules中
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        {loader:"css-loader"},
                        {loader:"postcss-loader"}  // postcss 中有autoprefixer 还有px2rem
                        ]
                    }) 
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
            
 plugins
 上面分拆的资源 打包进html中 对应的entry的name
new extractTextPlugin("css/[name].[chunkhash:8].css")


html-withimg-loader
html中图片打入包 不然会丢失
 {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'] 
  },

 devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        compress: true,
        port: 8888
}


webpack-dev-serve
contentbase
proxy
entry ;;''
output{
path: dirname+
filename:[name]
}
plugins：
[
	new HtmlWebPackPlugin({
		file:
		name：
		hash: true
	})
clean-webpack-plugin

]

expose-loader?$!jquery module下的 ￥ 共享
html-withimg-loader
css提取保存
extract-text-webpack-plugin  ExtractTextWebpackPlugin
devtool:'source-map'
uglifyjs-webpack-plugin 压缩js
resolve:{ // 解析
alia:{
	extension: 'js'
	'bootstarp'： ‘。。。。。’
	modules: ['','./']
}}
output publicPath :'CDN'
definePlugin
optimization  splitchunk minchunk 重复打包提取次数 

