const { exec } = require('child_process');
let packager;

try {
    packager = require('../packager');
    console.log("\x1b[34m", 'Options found... Distributing JS now');
    if (packager != null) {
        child = exec('npm run build', {stdio: 1}, function(err, stdout, stderr) {
            if (err) throw err;
            else console.log('\x1b[0m', stdout);
        }).stderr.pipe(process.stderr);
    }
} catch (e) {
    if (e instanceof SyntaxError || e instanceof TypeError) {
        console.log("\x1b[31m\x1b[40m", 'Either a typing mistake or incorrect syntax of packager.js file');
        console.log('\x1b[0m', '- check Novicell-packager for more information');
    } else {
        console.log("\x1b[31m\x1b[40m", 'Novicell-Packager: Options file NOT found!');
        console.log('\x1b[0m', '- Please make sure that you have options.js file in root directory');
        console.log(' - options.js should export input, output directories');
        console.log(' - check Novicell-packager for more information');
    }
}