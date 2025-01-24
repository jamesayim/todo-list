const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPages = [
    "index.html",
];

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? "production" : "development",
    entry: {
        'main': './src/index.js'
    },
    output: {
        filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/todo-list/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        devtool: isProduction ? false : 'inline-source-map',
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        historyApiFallback: true,
        watchFiles: ['src/client/*.html'],
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
            watch: true,
            publicPath: '/',
        },
    },
    plugins: [
        ...htmlPages.map(page => {
            const name = page.replace('.html', '');
            return new HtmlWebpackPlugin({
              filename: `${name}.html`,
              template: `./src/client/${page}`,
              inject: 'body',
              minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
              },
            });
          }),
        isProduction && new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ].filter(Boolean),
};
}