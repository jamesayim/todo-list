const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const htmlPages = [
    "index.html"
];

module.exports = (_env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/client/index.js',
        output: {
            filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][hash][ext]',
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ]
        },
        optimization: {
            minimizer: [
                '...',
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: [
                                ['mozjpeg', { quality: 60 }],
                                ['pngquant', { quality: [0.5, 0.65] }],
                                ['webp', { quality: 60 }],
                            ],
                        },
                    },
                }),
            ],
        },
        resolve: {
            extensions: ['.js', '.css'],
        },
        devtool: isProduction ? false : 'eval-source-map',
        devServer: {
            compress: true,
            port: 8080,
            hot: true,
            historyApiFallback: false,
            watchFiles: [
                'src/client/index.html'
            ],
            static: {
                directory: path.join(__dirname, 'dist'),
                serveIndex: true,
                watch: true,
                publicPath: '/',
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/client/' + htmlPages[0],
                    inject: 'body',
                    scriptLoading: 'blocking',
                    minify: {
                        removeComments: true,
                        collapseWhitespace: false,
                        useShortDoctype: false,
                    },
                }),
            isProduction && new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets'
                },
            ],
            }),
        ].filter(Boolean),
    };
}