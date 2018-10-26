const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function getFile(filepath) {
    return fs.readFileSync(filepath,'utf-8');
}

module.exports = {
    // mode: 'none',
    mode: 'development',
    target: 'web',
    entry: {
        // 'vmarkdown': path.resolve(__dirname, 'vmarkdown/index.js'),
        'example-editor': path.resolve(__dirname, 'editor/editor.js'),
        'example-preview': path.resolve(__dirname, 'preview/preview.js')
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'vmarkdown': path.resolve(__dirname, 'www', 'vmarkdown.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader" }
            //     ]
            // },
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
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     inject: false,
        //     template: 'examples/index.html'
        // }),
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
        hot: false,
        inline: false,
        contentBase: path.join(__dirname, "www"),
        headers: {
            "X-Custom-Foo": "bar"
        }
    }
};

