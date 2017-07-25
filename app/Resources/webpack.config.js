module.exports = {
    entry: {
        App: __dirname + "/assets/scripts/App.js"
    },
    output: {
        path: __dirname + "/temp/scripts",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['latest']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}