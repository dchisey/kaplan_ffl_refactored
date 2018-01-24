const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/views/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: __dirname + '/views/index.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader']
			}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [HTMLWebpackPluginConfig]
}