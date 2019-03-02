const inquirer = require('inquirer');
inquirer.registerPrompt('filePath', require('inquirer-file-path'));

module.exports = () => {
    const questions = [
        {
            type: 'filePath',
            name: 'entryFile',
            message: 'File name:',
            basePath: '.'
        },
        {
            type: 'rawlist',
            name: 'format',
            message: 'Select bundle format: ',
            choices: [
                "(amd) Asynchronous Module Definition",
                "(cjs) CommonJS",
                "(esm) ES Module",
                "(iife) Self-executing function",
                "(umd) Universal Module Definition amd+cjs+iife",
            ]
        }
    ]
    return inquirer.prompt(questions);
}