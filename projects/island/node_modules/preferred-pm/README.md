# preferred-pm

> Returns the preferred package manager of a project

[![npm version](https://img.shields.io/npm/v/preferred-pm.svg)](https://www.npmjs.com/package/preferred-pm) [![Build Status](https://img.shields.io/travis/zkochan/preferred-pm/master.svg)](https://travis-ci.org/zkochan/preferred-pm)

## Installation

```
npm i preferred-pm
```

## Usage

```js
'use strict'
const preferredPM = require('preferred-pm')

preferredPM(process.cwd())
    .then(pm => console.log(pm))
//> {name: "npm", version: ">=5"}
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://kochan.io)
