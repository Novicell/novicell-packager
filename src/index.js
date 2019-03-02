// Nodejs imports
const path = require('path');
const fs = require('fs')
const workingDir = process.cwd();

// Terminal helpers
const ora = require('ora');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// Compile imports
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify').uglify;
const commonjs = require('rollup-plugin-commonjs');

// Additional
const { version } = require('../package.json');
const cliQuestions = require('./questions');
const spinner = ora();
const separator = '----------------------------------------'

const terminalWrite = (text, color) => {
    console.log(chalk.hex(color)(text));
}

module.exports = () => {
    clear();
    terminalWrite(figlet.textSync('packager'), '#C80046');
    terminalWrite(version + separator, '#C80046');

    cliQuestions()
    .then(answers => {
        spinner.start();
        const filePath = path.join(workingDir, answers.entryFile);
        const fileName = path.basename(filePath);
        const dist = path.join(workingDir, 'dist');
        const format = getFormat(answers.format);
        let fileExists;

        try {
            fileExists = fs.statSync(filePath).isFile();
        } catch (err) {
            terminalWrite(`File NOT found: ${fileName}`, '#C80046');
            spinner.stop();
            return;
        }

        if (fileExists) {
            terminalWrite(`File found: ${fileName}`, '#75BC7F');
            const inputOptions = {
                input: filePath,
                plugins: [
                    resolve({
                        jsnext: true,
                        module: true,
                        main: true,
                        browser: true
                    }),
                    commonjs(),
                    babel({
                        babelrc: false,
                        presets: [
                            [
                                path.join(__dirname, '../node_modules/@babel/preset-env'),
                                {
                                    modules: false, 
                                }
                            ]
                        ],
                    }),
                    uglify()
                ]
            };

            let prepNameForBundle;
            if (fileName.includes('.')){
                prepNameForBundle = fileName.split('.');
                prepNameForBundle.pop();
            }

            const outputOptions = {
                file: path.join(dist, `${prepNameForBundle}.${format}.js`),
                format,
                name: fileName,
                globals: {
                    'TweenLite': 'gsap/src/minified/TweenLite.min.js',
                    'TweenMax': 'gsap/src/minified/TweenMax.min.js',
                    'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
                    "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
                    "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
                    "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
                    "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
                    "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
                }
            };
            buildBundle(inputOptions, outputOptions)
            .then(() => {
                spinner.text = 'Packaged'
                spinner.succeed()
            })
        } else {
            terminalWrite(`File NOT found: ${fileName}`, '#C80046');
            spinner.stop();
        }
    });
}

async function buildBundle(input_cfg, output_cfg) {
    const bundle = await rollup(input_cfg);
    // generate code
    await bundle.generate(output_cfg);
    // or write the bundle to disk
    await bundle.write(output_cfg).then(e => {
        const pckgExports = e.output[0].exports
        if (pckgExports.length) {
            pckgExports.forEach(fnc => {
                console.log(`${chalk.hex('#25c831')(fnc)} - can now be imported!`)
            });
        }
    });
}

function getFormat(answerFormat) {
    switch(answerFormat) {
        case '(amd) Asynchronous Module Definition':
          return 'amd';
        case '(cjs) CommonJS':
          return 'cjs';
        case '(esm) ES Module':
          return 'esm';
        case '(iife) Self-executing function':
          return 'iife';
        case '(umd) Universal Module Definition amd+cjs+iife':
          return 'umd';
      }
}

// webpack({
//     mode: answers.environment,
//     watch: false,
//     entry: filePath,
//     output: {
//         libraryTarget: 'commonjs2',
//         path: path.join(workingDir, 'dist'),
//         filename: '[name].bundle.js'
//     },
//     optimization: {
//         minimizer: [
//             new UglifyJsPlugin({
//                 uglifyOptions: {
//                     output: {
//                         comments: false
//                     }
//                 }
//             })
//         ],
//     },
//     resolve: {
//         modules: [
//             path.resolve(workingDir, "node_modules"),
//         ],
//         alias: {
//             'TweenLite': 'gsap/src/minified/TweenLite.min.js',
//             'TweenMax': 'gsap/src/minified/TweenMax.min.js',
//             'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
//         }
//     },
//     stats: 'errors-only',
//     module: {
//         rules: [{
//             test: /\.m?js$/,
//             exclude: /(node_modules|bower_components)/,
//             use: {
//                 loader: path.join(__dirname, 'node_modules/babel-loader'),
//                 options: {
//                     presets: [path.join(__dirname, 'node_modules/@babel/preset-env')]
//                 }
//             }
//         }]
//     }
// }, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log(stats.compilation.errors)
//         console.error(err);
//     }
//     spinner.stop()
// });