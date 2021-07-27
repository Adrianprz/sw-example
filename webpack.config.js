'use strict';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require('fs');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// Paths
const NodePath = path.resolve(__dirname, 'node_modules');
const ProjectPath = path.resolve(__dirname, 'src');

// TSconfig
const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8'));

// TSconfig paths
var tsconfigPaths = {};

Object.keys(tsconfig.compilerOptions.paths).forEach((key) => {
    try {
        let parsedKey = key.replace('/*', '');
        let parsedValue = path.resolve(__dirname, tsconfig.compilerOptions.baseUrl, tsconfig.compilerOptions.paths[key][0].replace('/*', ''));

        tsconfigPaths[parsedKey] = parsedValue;
    } catch (err) { };
});

// Plugins
function getPlugins() {
    var plugins = [
        // new BundleAnalyzerPlugin(),
        new ManifestPlugin({
            publicPath: ''
        }),
        new WebpackCleanupPlugin({
            exclude: [
                'scss/**/*',
                '**/*',
                'settings.json',
                'settings.js',
                'settings.scss',
            ],
            quiet: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: "css/[id].css",
        }),
        new webpack.ProvidePlugin({
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                root: NodePath
            }
        }),
        new HappyPack({
            id: 'ts',
            threads: 2,
            loaders: [{
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                    appendTsSuffixTo: [/\.vue$/],
                }
            }]
        }),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		  })
    ];

    return plugins;
}

module.exports = (env) => {
    env === undefined ? env = {} : env;
    var config = {
        performance: {
            maxAssetSize: 1048576
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: env.production ? false : true,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true,
                        }
                    }
                }),
            ],
            splitChunks: {
                name: 'common',
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0
            }
        },
        context: __dirname,
        devtool: env.production ? 'source-map' : 'source-map',
        entry: {
            main: path.resolve(ProjectPath, 'main.ts'),
            styles: path.resolve(ProjectPath, 'scss/_config.scss')
        },
        output: {
            filename: 'js/[name].[contenthash].js',
            chunkFilename: 'js/[name].[contenthash].js',
            sourceMapFilename: "js/[name].[contenthash].js.map",
            path: path.resolve(__dirname, 'dist/'),
            publicPath: '/'
        },
        resolve: {
            alias: tsconfigPaths,
            modules: [NodePath, ProjectPath],
            extensions: ['.json', '.ts', '.tsx', '.js', '.scss'],
        },
        module: {
            rules: [
                {
                    test: /\.twig/,
                    loader: 'twig-loader'
                },
                {
                    test: /\.scss$/,
                    enforce: "pre",
                    use: [
                        'import-glob-loader'
                    ]
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: [
                        env.production
                            ? MiniCssExtractPlugin.loader
                            : 'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                                sourceMap: env.production ? false : true,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: env.production ? false : true,
                            }
                        },
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'happypack/loader?id=ts'
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: '[contenthash].[ext]',
                        outputPath: './assets/',
                        publicPath: env.production ? '../assets/' : 'assets/'
                    }
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2|jpeg)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: '[contenthash]xx.[ext]',
                        outputPath: './assets/',
                        publicPath: env.production ? '../assets/' : 'assets/'
                    }
                },
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
            ]
        },
        plugins: getPlugins()
    }

    return config;
}
