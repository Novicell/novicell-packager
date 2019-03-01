# 📦 Novicell Packager

**Package and prepare your package for distribution - effortlessly**

## Usage

Use it as a CLI tool in your terminal

### Install with npm

Requires NPM version [6.4.0 or higher](https://nodejs.org/en/download/releases/)

Install it globally to run in any directory

```bash
npm install -g novicell-packager
```

## Setup

Simply run 'novicell-packager' terminal command inside root folder of your project

## Example

```bash
# Run command
novicell-packager

# Answer following questions
? File name: src/scripts/app.js
? Does your file have es6 exports?: Y
```

## Options 

```bash
FileName # Either the file in the same directory (file.js) or nested src/js/hello.js
HasExports # Use if you have ES6 Exports, that can be imported in application: import { func } from 'my-package'
```

## Contribution

Looking to contribute something? Here's how you can help. Please take a moment to review our [contribution guidelines](https://github.com/Novicell/novicell-frontend/wiki/Contribution-guidelines) in order to make the contribution process easy and effective for everyone involved.

## License

The Novicell Frontend is licensed under the MIT license. (http://opensource.org/licenses/MIT)

