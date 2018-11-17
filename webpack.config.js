const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: 'none',
    // mode: 'development',
    entry: {
        'vmarkdown-preview': path.resolve(__dirname, 'src/vmarkdown-preview.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].js',
        filename: production?'[name].[contenthash].min.js':'[name].js',
        libraryTarget: "umd",
        libraryExport: 'default',
        library: "VMarkDownPreview"
    },
    resolve: {
        alias: {
            'vmarkdown': path.resolve(__dirname, 'examples/www/vmarkdown', 'vmarkdown.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    externals: {
        // 'vmarkdown': 'VMarkDown'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: '[name].css'
            filename: production?'[name].[contenthash].min.css':'[name].css'
        })
    ],
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vmarkdown-preview-vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    }
};

