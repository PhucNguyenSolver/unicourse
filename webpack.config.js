module.exports = {
    module: {
        rules: [
            {
                test: /\.pegjs$/i,
                use: [
                    {
                        loader: "raw-loader",
                        options: {
                            esModule: true,
                        },
                    },
                ],
            },
        ],
    },
}
