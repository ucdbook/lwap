const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, '../backend'),
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../backend/dist'),
        filename: 'js/[name]-[chunkhash:6].js',
        // publicPath:'http://www.ehuodi.com/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            minChunks: 2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new CleanWebpackPlugin(
        [
         'dist'   
        ] , {
          root:path.resolve(__dirname,'../backend')
        })
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        axios:'axios'
    },
    resolve: {
        alias: {
            apigo: path.resolve(__dirname, '../backend/src')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react'],
                        plugins: [
                            'syntax-dynamic-import',
                            ["import", { libraryName: "antd", style:true}]
                        ]
                    }
                },
            ],
            include: path.resolve(__dirname, '../backend/src'),
            exclude: path.resolve(__dirname, '../node_modules')

        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer')
                        ]
                    }
                }
            }
            ]
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'

            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer')
                        ]
                    }
                }
            },
            {
                loader: 'less-loader'
            }
            ]
        },
        {
            test: /\.html$/,
            use: 'html-loader',
            exclude: [
                path.resolve(__dirname, '../backend/index.html')
            ]
        },
        {
            test: /\.(jpg|png|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'assets/[name]-[hash:5].[ext]',
                    limit: 6000
                }
            }

            ]
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "../backend/dist"),
        compress: true,
        proxy: {
            "/apigo": "http://localhost:3001/apigo"
        },
        historyApiFallback: true,
        port: 9001
    }

}
