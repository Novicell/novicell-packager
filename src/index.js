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
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require("rollup-plugin-terser");

// Additional
const { version, description } = require('../package.json');
const cliQuestions = require('./questions');
const spinner = ora();
const separator = '----------------------------------------'

const terminalWrite = (text, color) => {
    console.log(chalk.hex(color)(text));
}

module.exports = () => {
    clear();
    terminalWrite(figlet.textSync('packager'), '#C80046');
    terminalWrite(separator + version, '#C80046');

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
                    terser()
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