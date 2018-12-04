const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');

function getFile(filepath) {
    return fs.readFileSync(filepath,'utf-8');
}

const production = false;

module.exports = {
    mode: 'none',
    // mode: 'development',
    target: 'web',
    entry: {
        // 'vmarkdown': path.resolve(__dirname, 'vmarkdown/index.js'),
        'example-main': path.resolve(__dirname, 'main/main.js'),
        'example-editor': path.resolve(__dirname, 'editor/editor.js'),
        'example-preview': path.resolve(__dirname, 'preview/preview.js')
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            // 'vmarkdown': path.resolve(__dirname, 'www/vmarkdown', 'vmarkdown.js'),
            'vmarkdown-parse': path.resolve(__dirname, 'www/vmarkdown', 'vmarkdown-parse.js'),
            'vmarkdown-render': path.resolve(__dirname, 'www/vmarkdown', 'vmarkdown-render.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader:'file-loader',
                    options: {
                        // name: '[path][name].[ext]',
                        // name: production?'fonts/[name].[hash].[ext]':'[path][name].[ext]',
                        name: 'fonts/[name].[hash].[ext]',
                        context: 'src'
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader:'file-loader',
                    options: {
                        name: production?'images/[name].[hash].[ext]':'[path][name].[ext]',
                        context:'src'
                    }
                }
            },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.(md|html|svg)$/,
                use: 'text-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.theme\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable',
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     modules: true,
                        //     // localIdentName: '[name].[local]_[hash:7]',
                        //     sourceMap: false,
                        // },
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    externals: {
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false,
            template: 'examples/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'editor.html',
            template: 'examples/editor/editor.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'preview.html',
            template: 'examples/preview/preview.html',
            inject: false
        })
    ],
    devServer: {
        // open: 'http://127.0.0.1:8080/preview.html',
        host: '0.0.0.0',
        hot: false,
        inline: false,
        contentBase: path.join(__dirname, "www"),
        headers: {
            "X-Custom-Foo": "bar"
        }
    }
};

