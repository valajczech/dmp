const path = require("path");
const buildPath = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    main: "./src/js/main.js",
    index: "./src/js/index.js",
    dashboard: "./src/js/dashboard.js",
    dash_upload: "./src/js/dash-upload.js",
		dash_albums: "./src/js/albums.js",
    dash_allImages: "./src/js/allImages.js"
  },

  devServer: {
    port: 5501,
    contentBase: buildPath,
  },

  module: {
    rules: [
      // load JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      // load CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // load images (base64 < 8192B)
      {
        test: /\.(gif|png|jpe?g|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "src/img",
            },
          },
        ],
      },
      // load icons
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    /* LOGIN*/
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["main", "index"],
      filename: "index.html",
    }),
    /* DASHBOARD - INDEX*/
    new HtmlWebpackPlugin({
      template: "./src/dashboard.html",
      inject: true,
      chunks: ["main", "dashboard"],
      filename: "dashboard",
    }),
    /* DASHBOARD - UPLOAD*/
    new HtmlWebpackPlugin({
      template: "./src/content/upload.html",
      inject: true,
      chunks: ["main", "dashboard", "dash_upload"],
      filename: "photos/upload",
    }),
    /* DASHBOARD - COLLECTIONS */
    new HtmlWebpackPlugin({
      template: "./src/content/albums.html",
      inject: true,
      chunks: ['main', 'dashboard', 'dash_albums'],
			filename: 'collections'
    }),
    /* DASHBOARD - ALL IMAGES */
    new HtmlWebpackPlugin({
      template: "./src/content/allImages.html",
      inject: true,
      chunks: ['main', 'dashboard', 'dash_allImages'],
      filename: 'photos/all'
    })
  ],
};
