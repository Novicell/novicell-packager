# 📦 Novicell Packager

**Package and prepare your module for distribution - effortlessly**

## Usage

Use it as a CLI tool in your terminal. It will compile and minify your JavaScript module. Supports ES2015 tree shaking.

### Install with npm

Requires NPM version [6.4.0 or higher](https://nodejs.org/en/download/releases/)

Install novicell-packager globally

```bash
npm install -g novicell-packager
```

## Setup

Simply run 'novicell-packager' terminal command inside root folder of your project.
Then follow the interface options.

## Example

```bash
# Run command
novicell-packager

# Answer following questions
? File name: src/scripts/app.js
```

## Options 

Output formats:
* amd – Asynchronous Module Definition. [More about amd..](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
* cjs – CommonJS, often uses ***module.exports*** syntax. Suitable for Nodejs. [Article about cjs](https://flaviocopes.com/commonjs/)
* esm – ES module. Often uses ***import {} export {}*** syntax. [github page](https://github.com/standard-things/esm)
* iife – A self-executing ***!function(){...}()*** [Article about iife's](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
* umd – Universal Module Definition, works as amd, cjs and iife all in one

## Contribution

Looking to contribute something? Here's how you can help. Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License

The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)

