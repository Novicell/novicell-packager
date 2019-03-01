const path = require('path');
const fs = require('fs')
const workingDir = process.cwd();
const webpack = require("webpack");
const {
    version
} = require('./package.json')
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = () => {

    clear();
    console.log(
        chalk.hex('#C80046')(
            figlet.textSync(`packager`)
        ),
        chalk.hex('#C80046')(version)
    )
    inquirer.prompt([{
                type: 'input',
                name: 'entryFile',
                message: 'File name:'
            },
            {
                type: 'confirm',
                name: 'hasExports',
                message: 'Does your file have es6 exports?:'
            }
        ])
        .then(answers => {
            const spinner = ora().start()
            const filePath = path.join(workingDir, answers.entryFile);
            const fileName = path.basename(filePath);
            let fileExists;
            fs.statSync(filePath, (err, stats) => {
                fileExists = stats.isFile(filePath);
                console.log(stats.isFile(filePath));
                if (err) {
                    console.log(err);
                    return
                }
            });
            if (fileExists) {
                console.log(chalk.hex('#75BC7F')('file found: ' + fileName));
                webpack({
                    mode: 'production',
                    watch: false,
                    entry: filePath,
                    output: {
                        library: 'app',
                        libraryTarget: 'commonjs2',
                        path: path.join(workingDir, 'dist'),
                        filename: 'app.bundle.js'
                    },
                    module: {
                        rules: [{
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: path.join(__dirname, 'node_modules/babel-loader'),
                                options: {
                                    presets: [path.join(__dirname, 'node_modules/@babel/preset-env')]
                                }
                            }
                        }]
                    }
                }, (err, stats) => {
                    if (err || stats.hasErrors()) {
                        console.error(err);
                    }
                    spinner.stop()
                });
            } else {
                console.log(chalk.hex('#C80046')('File NOT found: ' + filePath));
                spinner.stop();
            }
        });
}