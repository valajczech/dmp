const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	entry: {
		main: './src/js/main.js',
		index: './src/js/index.js',
		bio: './src/js/bio.js'
	},

	devServer: {
		port: 5500,
		contentBase: buildPath
	},

	module: {
		rules: [
			// load JS
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
			// load CSS
			{
				test: /\.css$/,
				use: [
				"style-loader",
				"css-loader"
				]
			},
			// load images (base64 < 8192B)
			{
				test: /\.(png|jpg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][hash].[ext]'
				}
			},
			// load icons
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				type: 'asset/resource'
			}
		]
	},

	plugins: [
		/* INDEX */
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true,
			chunks: ['main', 'index'],
			filename: 'index.html'
		}),
		/* BIOGRAPHY */
		new HtmlWebpackPlugin({
			template: './src/bio.html',
			inject: true,
			chunks: ['main', 'bio'],
			filename: 'bio.html'
		})
	]
};