const path = require('path'); // модуль Node.js для работы с путями

//const ExtractTextPlugin = require("extract-text-webpack-plugin"); // плагин для выделения CSS в отдельный файл
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // более современный плагин для выделения CSS

// const extractCSS = new ExtractTextPlugin({
//     filename: "bundle.css" // имя итогового CSS-файла
// });

module.exports = { 
    entry: "./App.js", // точка входа — главный JS-файл приложения
    output:{ 
        path: __dirname, // куда складывать собранные файлы (текущая папка)
        filename: "bundle.js"  // имя итогового JS-файла
    }, 
    mode: 'development',
    devtool:'source-map', // генерация source map для удобства отладки
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // обрабатывать все .js и .jsx файлы
                exclude: /node_modules/, // кроме node_modules
                use: { loader: "babel-loader" } // использовать babel-loader для транспиляции
            },
            {
                test: /\.css$/, // обрабатывать все .css файлы
                // use: extractCSS.extract({
                //     use: ["css-loader"] // использовать css-loader для импорта CSS
                // })
                use: [MiniCssExtractPlugin.loader, "css-loader"] // использовать mini-css-extract-plugin и css-loader для импорта CSS
            },
            {
                test: /\.scss$/, // добавляем правило для SCSS
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // порядок важен!
            }
        ]
    },
    plugins: [
        //extractCSS // подключаем плагин для выделения CSS
         new MiniCssExtractPlugin({
            filename: "bundle.css" // имя итогового CSS-файла
        }) // подключаем современный плагин для выделения CSS
    ],
    // по умолчанию ищет public/index.html
    // но у нас в корне лежит
    devServer: {
        static: {
            directory: __dirname, // указываем корень проекта, где лежит index.html
        },
        port: 8080,
    }
}