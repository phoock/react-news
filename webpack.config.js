const path = require('path');

module.exports = {
    entry: __dirname + "/js/root.js",
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.js$/,
                use: "babel-loader",
                exclude: (/node_modules/)
            }
        ]
    }
};
