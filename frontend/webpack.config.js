const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path')

module.exports = {
	devtool: 'eval',
	entry: [path.resolve(__dirname, 'index.js')],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'built'),
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},{
				test: /\.css$/,
				loaders: ['style','css']
			}, {
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass', 'postcss']
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: [__dirname, __dirname+'/public/', __dirname+'/built/', __dirname+'/../node_modules/'],
		port: 8080,
		hot: true,
		inline: true,
		host:'localhost',
		clientLogLevel: "debug",
		proxy: {
			'/api/*': 'http://localhost:3004'
		},
		historyApiFallback: true
	}
};
