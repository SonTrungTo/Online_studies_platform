const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'server',
    target: 'node',
    entry: [
        path.join(CURRENT_WORKING_DIR, "/server/server.js")
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist/"),
        filename: "server.generated.js",
        publicPath: "/dist/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_externals/,
                use: ['babel-loader']
            },
            {
                test: /\.(jpeg|jpg|eot|ttf|gif|svg|png)(\?[\s\S]+)?$/,
                use: ['file-loader']
            }
        ]
    },
    externals: [nodeExternals()]
};

module.exports = config;