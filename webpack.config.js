/* 引入操作路径模块和webpack */
var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin') //抽离css
var htmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var glob = require('glob')
var prod = process.env.NODE_ENV === 'production' ? true : false //是否是生产环境

var eslintConfigDir = prod ? './webpack-config/.eslintrc.js' : './webpack-config/.eslintrc.dev.js'
var postcssConfigDir = './webpack-config/postcss.config.js'

var entries = getEntry('./src/**/*.js') // 获得入口js文件
entries.vendors = ['vue','axios']

console.log(entries)
console.log('__dirname:'+__dirname)

module.exports = {
    /* 输入文件 */
	resolve: require('./webpack-config/resolve.config.js'),
	entry: entries,
	output: {
        /* 输出目录，没有则新建 */
		path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
		publicPath: '../../dist/',
        /* 文件名 */
		filename: 'js/[name]-[chunkhash:6].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-loader'
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				include: path.resolve(__dirname, './src/js/**/*.js'),
				exclude: ['node_modules','./src/js/lib'],
				options: {
					fix: true
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{   test: /\.css$/, 
				  use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract(['css-loader','postcss-loader','less-loader'])
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=5120&name=img/[name]-[hash:6].[ext]'
			},
			{
				test: /\.html$/,
				use: [ {
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}],
			}
		]
	},
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['./'] }
		}),

		new ExtractTextPlugin('css/[name]-[contenthash:6].css'),
    
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: require( eslintConfigDir ),
				postcss: require( postcssConfigDir )
			},
		}),

    // 提取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			names:  ['vendors', 'manifest'], // 公共模块的名称
      //filename: 'js/vendors-[hash:6].js', // 公共模块的名称
			chunks: 'vendors',  // chunks是需要提取的模块
			minChunks: Infinity  //公共模块最小被引用的次数
		})
	]
}




/***** 生成组合后的html *****/

var pages = getEntry('./html/src/**/*.ejs')
for (var pathname in pages) {
	var conf = {
		filename: '../html/dist/' + pathname + '.html', // html文件输出路径
		template: path.resolve(__dirname, './html/src/' + pathname + '/' + pathname + '.js'), // 模板路径
		inject: true, 
		minify: {
			removeComments: true,
			collapseWhitespace: false
		}
	}
	if (pathname in module.exports.entry) {
		conf.chunks = [pathname, 'vendors', 'manifest']
	}

	module.exports.plugins.push(new htmlWebpackPlugin(conf))
}




/***** 获取文件列表：输出正确的js和html路径 *****/

function getEntry(globPath) {
	var entries = {}, basename

	glob.sync(globPath).forEach(function (entry) {
    //排出layouts内的公共文件
		if(entry.indexOf('layouts') == -1){
			basename = path.basename(entry, path.extname(entry))
			entries[basename] = entry
		}
	})
	return entries
}




/***** 区分开发环境和生产环境 *****/

if (prod) {
	console.log('production')

	module.exports.devtool = 'source-map'
	module.exports.plugins = module.exports.plugins.concat([
		new CleanWebpackPlugin(['dist']),
    //压缩css代码
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true } },
			canPrint: true
		}),
    //压缩JS代码
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false, // 去掉注释内容
			}
		})
	])
} else {  
	console.log('dev')

	module.exports.devtool = 'cheap-module-source-map'
}