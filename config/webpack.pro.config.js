var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../apiGo'),
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../apiGo/dist'),
        filename: 'js/[name].[chunkhash:6].js',
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
            ['dist/js/main.*.js','dist/js/manifest.*.js',],　 //匹配删除的文件
            {
                root: path.resolve(__dirname, '../apiGo'),//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        alias: {
            apigo: path.resolve(__dirname, '../apiGo/src')
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
                            ['import', [{ libraryName: "antd", style: 'css' }]]
                        ]
                    }
                },
            ],
            include: path.resolve(__dirname, '../apiGo/src'),
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
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
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
                path.resolve(__dirname, '../apiGo/index.html')
            ]
        },
        {
            test: /\.(jpg|png|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'assets/[name].[hash:5].[ext]',
                    limit: 6000
                }
            }

            ]
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "../apiGo/dist"),
        compress: true,
        disableHostCheck:true,
        host: '0.0.0.0',
        proxy: {
            "/apigo": "http://localhost:3001/apigo"
        },
        port: 9000
    }

}
