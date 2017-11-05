# PROJECT MOBILE DICTIONARY
[![Build Status](https://travis-ci.org/KrzysztofLen/mobile-dictionary.svg?branch=master)](https://travis-ci.org/KrzysztofLen/mobile-dictionary)
[![Build status](https://ci.appveyor.com/api/projects/status/gauttiq7v97as25a?svg=true)](https://ci.appveyor.com/project/KrzysztofLen/mobile-dictionary)
[![Dependency Status](https://dependencyci.com/github/KrzysztofLen/mobile-dictionary/badge)](https://dependencyci.com/github/KrzysztofLen/mobile-dictionary)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


Create dist folder
// webpack

Start localhost
// firebase serve

Deploy dist folder 
// firebase deploy

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/KrzysztofLen/mobile-dictionary.git
$ cd mobile-dictionary
$ yarn install
```

For develop environments...

```sh
$ yarn build
$ yarn start
```

### Comands

run xo lint
```sh
$ yarn xo
```
run stylelint
```sh
$ yarn lint:scss
```
