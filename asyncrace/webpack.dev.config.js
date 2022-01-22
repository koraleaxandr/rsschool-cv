/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'test'),
                publicPath: '/serve-public-path-url',
            },
        ],
    },
};
