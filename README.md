# 📦 Novicell Packager

### Description
Novicell-packager helps to finalize your small javascript project/module. It's a boilerplate webpack setup that bundles, creates a **dist** folder with ready-to-distribute file.

### How to use

* Make sure you have node installed
* Clone this repo to inside your module
* Go to the novicell-packager directory inside your project and write ``npm install``
* Go back to root directory of your project, add a file called "packager.js"

```bash
├── src
│   ├── js
│      ├── file.js
│
├── node_modules
├── novicell-packager (the cloned dir)
├── packager.js
```

* In packager.js file specify the entry and save the file:
```js
module.exports = {
    entry: 'src/js/file.js'
}
```
Output is dist/ by default, however you can change it, just by adding
```js
ouput: 'dirName'
```

* Finally, run ``novicell-packager/index.js`` as a node script:
``node novicell-packager/index.js``

