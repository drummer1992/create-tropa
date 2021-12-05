#!/usr/bin/env node

const {existsSync, mkdirSync} = require('fs')
const path = require('path')
const argv = require('yargs-parser')
const cliPkg = require('./package')
const generate = require('./generate')

const template = {
    dir: 'tropa-app',
    main: './lib/index.js',
    description: "Tropa App",
    scripts: {
        build: 'npx babel ./src --out-dir lib',
        start: 'node ./lib/index.js --out-dir lib',
        debug: "nodemon --exec babel-node ./src/index.js"
    },
    dependencies: {
        tropa: cliPkg.devDependencies.tropa,
    },
    devDependencies: {
        "@babel/cli": cliPkg.devDependencies["@babel/cli"],
        "@babel/core": cliPkg.devDependencies["@babel/core"],
        "@babel/eslint-parser": cliPkg.devDependencies["@babel/eslint-parser"],
        "@babel/node": cliPkg.devDependencies["@babel/node"],
        "@babel/plugin-proposal-decorators": cliPkg.devDependencies["@babel/plugin-proposal-decorators"],
        "@babel/plugin-transform-runtime": cliPkg.devDependencies["@babel/plugin-transform-runtime"],
        "@babel/preset-env": cliPkg.devDependencies["@babel/preset-env"],
        "@babel/register": cliPkg.devDependencies["@babel/register"],
        "babel-plugin-parameter-decorator": cliPkg.devDependencies["babel-plugin-parameter-decorator"],
        "eslint": cliPkg.devDependencies.eslint,
        "nodemon": cliPkg.devDependencies.nodemon,
    },
    logInstructions: function (pkg) {
        console.log('debug', 'saved package.json')
        console.log('info', `project ${pkg.name} generated successfully`)
        console.log('debug', `run 'npm install' to install the dependencies`)
        console.log('debug', `run 'npm run build' to build the application`)
        console.log('debug', `run 'npm run debug' to start the application in debug mode`)
        console.log('debug', `run 'npm start' to start the application`)
    }
}

const run = async args => {
    const opts = argv(args)
    const dir = opts._[0]

    if (dir && existsSync(dir)) {
        if (dir !== '.' && dir !== './') {
            throw new Error('directory ' + opts._[0] + ' already exists')
        }
    }
    if (dir === undefined) {
        throw new Error('directory is not set')
    }

    mkdirSync(dir)

    if (existsSync(path.join(dir, 'package.json'))) {
        throw new Error('a package.json file already exists in target directory')
    }

    return generate(dir, template)
}

run(process.argv.slice(2))
    .catch(e => {
        console.error(e.message)

        process.exit(1)
    })
