const webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "static");
const SRC_DIR  = path.resolve(__dirname, "src");

const config = {
    entry: {
        main: SRC_DIR + "/main/index.js"
    },

    output: {
        path: BUILD_DIR + "/",
        filename: '[name].bundle.js'
    },

    devServer: {
        static: {
            directory: BUILD_DIR
        },
        compress: true,
        port: 9000,
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/env',
                        '@babel/react'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ],
    }
};

module.exports = config;